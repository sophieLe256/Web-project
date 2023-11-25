import axios from "axios";
import MySecurity from "./security";
class ApiHelper{
    getEndpoint(){
        return "http://127.0.0.1:3000/";
    }
    
    async post(action,data){
        
        const encode_data = MySecurity.encode({
            action: action,
            data: data
        })       
            
        return await axios.post(this.getEndpoint(), encode_data);
        
    }
    

}

const apiHelper = new ApiHelper();
export default apiHelper;