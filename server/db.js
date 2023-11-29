import mysql from "mysql2"
import fs from "fs"

const dbConfig = {
    host: "localhost",
    user: "root",
    // password: "Nhi04031080.",
    password: "admin",
    database: "badrabbit"
}

export const db = mysql.createConnection(dbConfig)
/*
product(productID, versionDate, name, features, image, size, price, categoriesID, status)
categories(categoriesID, type)
order(orderID, transactionDate, totalPrice, note, cardID, userID, contactID, status )
orderItem(orderItemID, orderID, productID, versionDate, selectedSize, quantity)
card(cardID, acc_name, acc_number, expireDate, cvc, type, timeStamp)
contact(contactID, address, city, zipcode, state, phone, userID, timeStamp)
user(userID, email, password, isAdmin)
UserToken(userID,tokenKey,createdDate)
*/
export const checkDatabase = async () => {   
    let db3 = mysql.createConnection({
        host: dbConfig.host,
        user: dbConfig.user,
        password: dbConfig.password,
    });
    // check if database exist
    db3.execute(`SHOW DATABASES LIKE "badrabbit"`, async (err, results) => {    
        if (err || results.length <= 0) {            
            console.log('Database does not exist.');   
            //create
            await db3.execute(`CREATE DATABASE badrabbit`, (err, results) => {
                if (err) return console.error('Created database error:', err);
                console.log("created database");
                // insert
                fs.readFile("initial_DB.sql", 'utf8', (err, data) => {
                    if (err) return console.error('Error reading file:', err);
                    console.log('Readed File initial_DB.sql');
                    db3.execute(data, (err, results) => {
                        if (err) {
                            console.error('Insert Table fail', err);
                            return console.error("Please manual insert in workbench");
                        } 
                        console.log('Initial Database sucessful');
                    });
                });
            });
        }
        else {
            console.log('Found Database');
            // count table
            await db3.execute(`SELECT COUNT(*) AS tableCount FROM information_schema.tables WHERE table_schema = "badrabbit"`, async (err, results) => {
                if (err) return console.error('Error counting tables:', err);
                const tableCount = results[0].tableCount;
                if (tableCount < 8) {
                    //drop
                    await db3.execute(`DROP DATABASE IF EXISTS badrabbit`, async (err, results) => {
                        if (err) return console.error('Drop database error:', err);
                        console.log('Dropped Database');   
                        // create
                        await db3.execute(`CREATE DATABASE badrabbit`, (err, results) => {
                            if (err) return console.error('Created database error:', err);
                            console.log("created database");
                            // insert
                            fs.readFile("initial_DB.sql", 'utf8', (err, data) => {
                                if (err) return console.error('Error reading file:', err);
                                console.log('Readed File initial_DB.sql');
                                db3.execute(data, (err, results) => {
                                    if (err){
                                        console.error('Insert Table fail', err);
                                        return console.error("Please manual insert in workbench");
                                    } 
                                    console.log('Initial Database sucessful');
                                });
                            });
                        });
                    });
                }
                else {
                    // pass
                    return console.log('Database maybe ok');
                }             
            });
        } 
    });
}
