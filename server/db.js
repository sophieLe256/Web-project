import mysql from "mysql2/promise"

const dbConfig = {
    host: "localhost",
    user: "root",
    password: "admin",
    database: "badrabbit"
}

export const db = mysql.createConnection(dbConfig)
/*
product(productID, versionDate, name, features, image, size, price, categoriesID, status)
order(orderID, transactionDate, totalPrice, note, cardID, userID, contactID, status )
orderItem(orderItemID, orderID, productID, versionDate, selectedSize, quantity)
card(cardID, acc_name, acc_number, expireDate, cvc, type, timeStamp)
contact(contactID, address, city, zipcode, state, phone, userID, timeStamp)
user(userID, email, password, isAdmin)
UserToken(userID,tokenKey,createdDate)
*/
export const checkDatabase = () => {
    // check if database exist
    db.query(`SHOW DATABASES LIKE '${dbConfig.database}'`, async (err, results) => {
        if (err) return console.error('Error checking database existence:', err);
        if (results.length > 0) {
            await db.query("SELECT COUNT(*) AS tableCount FROM information_schema.tables WHERE table_schema = '?'",[databaseName], async (err, results) => {
                if (err) return console.error('Error counting tables:', err);
                const tableCount = results[0].tableCount;
                if (tableCount < 7) {
                    await db.query("DROP DATABASE IF EXISTS '?'",[databaseName], (err, results) => {
                    });
                }
                else {
                    return console.log('Database maybe ok');
                }
            });
        } else {
            console.log('Database does not exist.');
            await db.query("CREATE DATABASE ?;", [databaseName], (err, results) => {
            });
        }
        createTables();

    });
}
const createTables = () => {

}
