{/*
Using Table: 
UserToken(userID,tokenKey,createdDate,status)
Mission encrypted/decrypted data
Package Struct:
req_encrypted.body = {
    key: partOfKey,
    data: encryptedData
}
decryptedData ={
    userID: userID,
    action: action,
    entry: data
}
Behavior:
use partOfkey to find full key in table
then compare userID is correct or not, 
if correct return decryptedData else return null
*/}

export default class MySecurity {
    static getUserToken(key){
        {/* connect the databse at server, client use cookie or location storage*/}
        if(key == null) return null;
        if(key == "newAccount") return "createNewAccount";
        const q = "SELECT * FROM UserToken WHERE tokenKey LIKE '?%'"
        db.query(q, [key], async (err, data) => {
            if (err) return null;
            if (data.length) return null;

            // got the record, return it
            return data[0];
        });
    }
    static encryptedData(secretKey, jsonData){        
        if (secretKey == null) return null;
        // Create a JSON Web Key (JWK) from the secret key
        const jwk = JWK.asKey({ k: secretKey, alg: 'dir' });

        // Encrypt the JSON data using JWE
        JWE.createEncrypt({ format: 'compact', contentAlg: 'A256GCM' }, jwk)
            .update(JSON.stringify(jsonData), 'utf8')
            .final()
            .then((result) => {
                return result;
            })
            .catch((error) => console.error('Encryption Error:', error));
        return null;
    }
    static encryptedPackage(partOfKey,userID,action,data) {
        const serectData = getUserToken(partOfKey);
        if(serectData==null) return null;
        if(serectData.userID!=userID) return null;
        jsonData = {
            userID: userID,
            action: action,
            entry: data
        };
        const encrytedD = encryptedData(serectData.tokenKey, jsonData);
        if(encrytedD == null) return null;        
        ouput = {
            key: partOfKey,
            data: encrytedD
        }
        return ouput;
    }
    static decryptedData(secretKey, jsonData) {       
        if (secretKey == null) return null;
        // try Decrypt the encrypted data using JWE
        const jwk = JWK.asKey({ k: secretKey, alg: 'dir' });

        JWE.createDecrypt(jwk)
            .decrypt(jsonData, 'utf8')
            .then((result) => {
                const decryptedData = JSON.parse(result.payload.toString('utf8'));             
                return decryptedData;
            })
            .catch((error) => console.error('Decryption Error:', error));
        return null;
    }
    static decryptedPackage(input) {
        const serectData = getUserToken(input.body.key);
        if (serectData == null) return null;   
        
        const decryptedD = decryptedData(serectData.tokenKey, input.body.data);
        if(decryptedD == null) return null;

        if (decryptedD.userID != serectData.userID) return null;
        input.body.data = decryptedD;
        return input;
    }
}