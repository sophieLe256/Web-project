{/*

Mission encrypted/decrypted data
Package Struct:
req_encrypted.body = {
    key: partOfKey,
    data: encryptedData ={
        userID: userID,
        action: action,
        entry: data
    }
}
Behavior:
use tokenS key
*/}
import Cookies from 'js-cookie';

export default class MySecurity {
    static getUserToken(){
        {/* connect the databse at server, client use cookie or location storage*/}
        const accessToken = Cookies.get('access_token');
        if (accessToken == null) return "createNewAccount";        
        return accessToken;        
    }
    static encryptedData(jsonData){        
        secretKey = getUserToken();
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
    static encryptedPackage(action, data, selectedImage) {
        partOfKey = "createNewAccount"
        secretKey = getUserToken();
        if (secretKey != "createNewAccount")
            partOfKey = secretKey.substring(0, Math.floor(Math.random() * (20 - 10 + 1) + 10));
        
        jsonData = {
            userID: Cookies.get("userID"),
            action: action,
            entry: data
        };
        const encrytedD = encryptedData(jsonData);
        const formData = new FormData();
        if (selectedImage) {
            formData.append('image',selectedImage);
        }
        formData.append('key', partOfKey);
        formData.append('data', encrytedD);
        return formData;
    }
    static decryptedData(jsonData) {    
        secretKey = getUserToken();   
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
}