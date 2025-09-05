import {query, getClient} from "../config/db.js";


export async function checkModel(email){
    try{
          const user = await query("SELECT id,password_hash,role,access,avatarUrl, COALESCE(username,email) AS display_name FROM users WHERE email = $1", [email]);
          return user;
         } catch (error){
            throw error
         }
        
       
}

export async function addUserModel (email,hash){
    try{
        let data;
        const user = await query("INSERT INTO users (email,password_hash,user_balance) VALUES ($1,$2,$3) RETURNING id,role,access", [email,hash,10]);
        data = user.rows;
        return data;
    } catch (error){
        throw error;
    }
    }

export async function getDeserializeInfo(userId){
    try{
        const {rows} = await query("SELECT id,role,access,avatarUrl FROM users WHERE id = $1", [userId]);
        return rows;
    } catch (error){
        throw error;  
    }
}


export async function cronJobFunction (){
    
    function newBalance (roi , subscription_amount , user_balance) {
        // CHECKS IF USER BALANCE IS NOT UP TO 30 TO STOP SUBSCRIPTION
        if (user_balance < 30) return null;
        const interest = (roi /100) * subscription_amount;
        const newBalance = interest + user_balance;
        return newBalance
            }
    const client = await getClient();
  
    try {
        console.log("Cron job started");

        // START A TRANSACTION
          client.query("BEGIN");
        const {rows : getUsers} = await client.query(`SELECT id, user_balance, subscription_plan , subscription_amount FROM users WHERE last_updated <= NOW() - INTERVAL '24 hours'`);
        
        for (const user of getUsers) {
            const {subscription_plan , subscription_amount , id, user_balance} = user;
            let roi;
            let balance;
            
            switch (subscription_plan) {
                case "Regular":
                    roi = 2;
                    balance = newBalance(roi , subscription_amount, user_balance );
                    break;
                case "Bronze":
                    roi = 2.5;
                    balance = newBalance(roi , subscription_amount , user_balance);
                    break;
                case "Silver":
                    roi = 3;
                    balance = newBalance(roi , subscription_amount , user_balance);
                    break;
                case "Gold":
                    roi = 3.5;
                    balance = newBalance(roi , subscription_amount , user_balance);
                    break;
                case "Platinum":
                    roi = 4;
                    balance = newBalance(roi , subscription_amount , user_balance);
                    break;
            
                default:
                    console.log("No plan available");
                    break;
            }
        if (!balance) continue;
        const {rows : updateBalance} = await client.query("UPDATE users SET user_balance = $1 , last_updated = NOW() WHERE id = $2 RETURNING last_updated , user_balance", [balance , id]);
        console.log(`User with ID ${id} has been updated with new balance: ${updateBalance[0].user_balance} , last update time: ${updateBalance[0].last_updated}`);
        };
        await client.query("COMMIT");
        console.log("Cron job completed successfully");

    } catch (error) {

        console.error("Error in cron job:", error);
        await client.query("ROLLBACK");
    }
}