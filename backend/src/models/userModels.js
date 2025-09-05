import {query, getClient} from "../config/db.js";
import {ErrorHandling} from "../middleware/errorHandMiddleware.js";

export async function dashboardModel(id){
     const client = await getClient();
    try{
       
        // INITIATE A DB TRANSACTION
        await client.query('BEGIN');

        const result = await client.query('SELECT user_balance, subscription_plan, COALESCE (username,email) AS display_name FROM users WHERE id = $1',[id]);
        const resultTwo = await client.query('SELECT * FROM pending_requests WHERE user_id = $1', [id]);
        const resultThree = await client.query('SELECT * FROM transactions WHERE user_id = $1', [id]);
        const resultFour = await client.query('SELECT * FROM wallet WHERE admin_id = $1', [id]);
        // IF ALL QUERY WAS SUCCESSFUL
        await client.query('COMMIT');

        const{rows:[user]} = result;
        const {rows : pendingData} = resultTwo;
        const {rows : transactionData} = resultThree;
        const {rows : walletData} = resultFour;

        return [user , pendingData, transactionData , walletData];
    } 
    catch (err){
        // IF QUERY/ONE TRANSACTION WASN'T COMPLETED, IT GOES BACK TO REDO IT
        await client.query('ROLLBACK');
        console.log(err.message);
        throw err;
    } finally {
        // CLOSES THE TRANSACTION 
        client.release();
    }
}

export async function updateUserRequestModel(value){
    try{
        // INSERT INTO THE REQUESTS TABLE VALUES TO FORM pending 
        const result = await query(`INSERT INTO pending_requests (user_id ,amount ,txn_type ,wallet_address , subscription_plan) VALUES ($1,$2,$3,$4 ,$5) RETURNING pending_id,user_id,amount`, value);
        return result;
    } catch (error){
        throw error;
    }
}

// SETTING AVATAR/PROFILE PICTURE
export async function setAvatarModel(input){
    try{
        const {rows} = await query ("UPDATE users  SET avatarUrl = $1 WHERE id = $2 RETURNING avatarUrl", input);
        return rows;
    }catch(error){
        throw error;
    }
}

// SETTING USERNAME
export async function setUsernameModel(input){
try {
    const {rows} = await query("UPDATE users SET username = $1 WHERE id = $2 RETURNING id , username", input);
    return rows;
} catch (error) {
    throw error;
}
}