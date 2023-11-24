import { db } from "../db.js"
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"
import crypto from "crypto";

{/*
Using Table: 
User(userID, email, password, fullname, isAdmin)
UserToken(userID,tokenKey,createdDate,status)

Function:
register() 
login()
isAdmin()
isLogin()
logout()

Behavior:
+ register: check exist user, if not create. 
+ login:   
    + create tokenkey with random sercet string
+ isAdmin: // is needed ?
+ logout:
    + remove tokenkey

Package Struct:
req_encrypted.body = {
    key: partOfKey,
    data: encryptedData={
        userID: userID, //verify when decrypted data
        action: action, // use for swtich
        entry: data // json data from client
    }
}
register_data = {
    email: email,
    password: password,
    fullname: fullname,
}
login_data = {
    email: email,
    password: password,
}
Good luck, Ac Nhon.
*/}

export default class Authentication {
    static register(req, res) {
        const q = "SELECT * FROM users WHERE email= ?"
        db.query(q, [req.email], async (err, data) => {
            if (err) return res.json(err);
            if (data.length) return res.status(409).json("User already exists!");

            // encrypt password          
            const hash = await bcrypt.hash(req.password, 10);
            const q = "INSERT INTO users(email, password, fullname) VALUES (?)"          
            const values = [
                req.email,
                hash,
                req.fullName,
            ]
            db.query(q, values, (err, data) => {
                // console.log(data);
                if (err) return res.status(500).json(err);
                return res.status(200).json("User has been created.");

            })
        });
    }
    static login(req, res) {
        const q = "SELECT * FROM users WHERE email= ?"
        db.query(q, [req.body.email], (err, data) => {
            if (err) return res.json(err);
            if (data.length === 0) return res.status(401).json("email or password is incorrect...");

            // check password       
            var isPasswordTrue = bcrypt.compareSync(req.body.password, data[0].password)
            if (!isPasswordTrue) return res.status(401).json("Unauthorized");
            
            // random key 
            const secretKey = generateRandomKey(8);  
            // password is correct, store information as Json Token
            const token = jwt.sign({ id: data[0].id, email: data[0].email, fullname: data[0].fullname }, secretKey);
            const { password, ...other } = data[0];
            const tokenS = secretKey + token;
            const currentDate = new Date();
            // insert token key to Table ?            
            const query = 'INSERT INTO UserToken (userID, tokenKey, createdDate) VALUES (?)';
            db.query(q, [data[0].id, tokenS, currentDate], (err, data) => {
                if (err) return res.json(err);
                // put to client cookie ???
                res.cookie("access_token", tokenS, {
                    httpOnly: true
                }).status(200).json(other);
            });                        
        });
    }
    static logout(req, res) {       
        db.query("DELETE FROM UserToken WHERE tokenKey LIKE '?%'", [req.key], async (err, data) => {
            if (err) return res.json(err);           
            return res.status(200).json("Log out");
        });        
    }
  
    generateRandomKey(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const randomBytes = crypto.randomBytes(length);
    let randomKey = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = randomBytes[i] % characters.length;
        randomKey += characters.charAt(randomIndex);
    }

    return randomKey;
    }


}



