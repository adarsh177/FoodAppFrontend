import axios from 'axios';
import GetAuthToken from './AuthManager';
const BASE_URL = "https://404f1c2c6b61.ngrok.io/"

export async function GetIngredientsAndTags(){
    try{
        const response = await axios.get(`${BASE_URL}ingredientsAndTags`, {
            method: "GET",
            headers: {
                "authorization": await GetAuthToken(),
                "timestamp": new Date().getTime()
            }
        })
        return Promise.resolve(response.data);
    }catch(ex){
        console.log("Error getting ingredients info", ex);
        return Promise.reject("Server Error");
    }
}