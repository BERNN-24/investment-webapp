import {getClient,query} from "../config/db.js";
import { convert } from "../middleware/conversion.js";

export async function getBalanceModel(){
    try{
        const result = await query('SELECT  id ,user_balance ,access , COALESCE (username,email) AS display_name FROM users');     
         return result;
} catch(error){
    throw error;
}

}

export async function editUserBalanceModel(userId,amount){
    try{
        const {rows} = await query("UPDATE users SET user_balance = $1 WHERE id = $2 RETURNING id , user_balance ", [amount , userId]);
        return rows;

    } catch(error){
        throw error;
    }
}   

// ALL REQUEST SERVICES 
export async function getRequestsModel() {
    try {
        const {rows} = await query("SELECT * FROM pending_requests");
        return rows;
    } catch (error) {
        throw error;
    }
}

export async function editUserRequestsModel(status , pend_id) {
    const client = await getClient();
    try {
        await client.query("BEGIN")
        console.log("Txn started");
        switch (status) {
            
            case "approve": 
                // GET REQUEST USING PENDING ID
                 const {rows:[resultPending]} = await client.query ("SELECT  pending_id ,user_id ,amount ,txn_type, date , pr.subscription_plan, user_balance FROM pending_requests pr INNER JOIN users ON pr.user_id = users.id  WHERE pending_id = $1", [pend_id]);
                 
                //  DESTRUCTURE TO GET DETAILS TO PUSH TO THE TRANSACTIONS;
                 const {pending_id :pendingId , user_id ,amount ,txn_type ,date , subscription_plan, user_balance: balance } = resultPending;
                
                 //  INSERTING INTO TRANSACTION TABLE
                 const {rows: [resultTransaction]} = await client.query("INSERT INTO transactions (pending_id ,user_id ,amount ,txn_type ,date ,status ,subscription_plan) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING user_id, amount , pending_id , txn_type",
                    [pendingId ,user_id ,amount ,txn_type ,date ,status , subscription_plan]
                 );
                
                 //  DESTRUCTURE TO GET DETAILS TO UPDATE USER BALANCE
                 const {user_id :txnUserId , amount:txnResultAmt , txn_type:txnResultType , pending_id : txnPendingId} = resultTransaction;
                  let switchResult;
                  let newBalance;
                 switch (txnResultType) {
                    
                    case "deposit":
                       newBalance = `£${convert(balance) + convert(txnResultAmt)}`;
                       console.log(newBalance);
                        switchResult = await client.query("UPDATE users SET user_balance = $1 WHERE id = $2 RETURNING id , user_balance ", [newBalance , txnUserId])
                        console.log(switchResult);
                        break;
                    case "withdraw":
                       newBalance = `£${convert(balance) - convert(txnResultAmt)}`;
                       console.log(newBalance);
                        switchResult = await client.query("UPDATE users SET user_balance = $1 WHERE id = $2 RETURNING id, user_balance", [newBalance,txnUserId])
                        console.log(switchResult);
                        break;
                    case "subscription":
                        newBalance = `£${convert(balance) + convert(txnResultAmt)}`;
                        console.log(newBalance);
                        switchResult = await client.query("UPDATE users SET user_balance = $1, subscription_plan = $2, subscription_amount = $3 , last_updated = NOW() WHERE id = $4 RETURNING id, user_balance", [newBalance,subscription_plan, txnResultAmt, txnUserId])
                        console.log(switchResult);
                    default:
                        console.log("none");
                        break;
                 }
                //  DELETING TXN FROM PENDING COS IT HAS BEEN VALIDATED
                 const approveDeletePend = await client.query("DELETE FROM pending_requests WHERE pending_id = $1",[txnPendingId]);
                
                 break;


                //  REJECT CASE FOR THE TRANSACTION
                case "reject":

                const {rows:[rejectResultPending]} = await client.query ("SELECT * FROM pending_requests  WHERE pending_id = $1", [pend_id]);
                     //  DESTRUCTURE TO GET DETAILS TO PUSH TO THE PENDING REQUEST;
                 const {pending_id : rejectPendingId , user_id : rejectUserId ,amount: rejectAmount ,txn_type:rejectTxnType ,date:rejectDate , subscription_plan :plan } = rejectResultPending;
                 
                 const {rows: [rejeResultTransaction]} = await client.query("INSERT INTO transactions (pending_id ,user_id ,amount ,txn_type ,date ,status , subscription_plan) VALUES ($1,$2,$3,$4,$5,$6) RETURNING user_id,amount , pending_id",
                    [rejectPendingId ,rejectUserId ,rejectAmount ,rejectTxnType ,rejectDate ,status , plan]
                 );
                //  DELETE TRX FROM PENDING
                const {pending_id : rejectTxnPendingId} = rejeResultTransaction;
                  const rejectDeletePend = await client.query("DELETE FROM pending_requests WHERE pending_id = $1",[rejectTxnPendingId]);
                
                  break;   
        
            default:
                console.log("No transaction done."); 
                break;
        }

        await client.query("COMMIT");
        console.log("Successful result");
        return {message : `${status} status updated`};
         
    } catch (error) {
        await client.query("ROLLBACK");
        throw error;
    }finally {
        client.release();
    }
}


export async function getUserTransactionModel (userId){
    try {
        const {rows} = await query("SELECT * FROM transactions WHERE user_id = $1", [userId]);
        return rows;
    } catch (error) {
        throw error;
    }
}

export async function deleteUserTransactionModel(txnId){
    try {
        const {rowCount} = await query("DELETE FROM transactions WHERE txn_id = $1",[txnId]);
        return rowCount;
    } catch (error) {
        throw error;
    }
}

export async function restrictAccessModel(userId,userAccess){
    try {
        const {rows} = await query("UPDATE users SET access = $1 WHERE id =$2 RETURNING user_balance, access",[userAccess, userId]);
        return rows;       
    } catch (error) {
        throw error;
    }
}
// wallet address format {crypto : btc , address : address }
export async function editWalletModel(adminId ,walletDetails){

 const walletValues = walletDetails.map((_x , i)=> `($1 , $${i *2 + 2}), $${i * 2 + 3})`).join(", ");
 const walletInputs =[ adminId, 
    ... walletDetails.flatMap ((wallet) => [wallet.crypto, wallet.address])
 ];
// USAGE OF UPSERT IS TO INSERT OR UPDATE THE WALLET ADDRESS IF EITHER DOES'T WORK
    try{
        const {rows} = await query(`INSERT INTO wallet admin_id , crypto, wallet_address VALUES ${walletValues} ON CONFLICT (admin_id, crypto) DO UPDATE SET wallet_address = EXCLUDED.wallet_address RETURNING admin_id, crypto, wallet_address`, walletInputs);
        return rows;
    } catch(error){
        throw error;
    }
} 

export async function newAdminModel(email, hash, role){
    try{
        const {rows : [admin]} = await query("SELECT COUNT * FROM users WHERE role = admin");
        let {count} = admin;
        let value = parseInt(count)

        if(value > 3){
            throw new Error("No of set Admins cannot exceed 2");
        }

        const {rows} = await query("INSERT INTO users (email,password_hash, role) VALUES ($1,$2,$3) RETURNING id,role,access", [email,hash,role]);
        return rows;
    } catch(error){
        throw error;
    }
}
