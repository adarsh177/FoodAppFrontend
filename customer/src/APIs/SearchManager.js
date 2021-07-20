import axios from 'axios';
import GetAuthToken from './AuthManager';
const BASE_URL = "https://a1e46b7431f6.ngrok.io/customer/"

export async function SearchNearMe(page = 0){
    try{
        const response = await axios.get(`${BASE_URL}nearme/${page}`, {
            method: "GET",
            headers: {
                "authorization": await GetAuthToken()
            }
        })
        return Promise.resolve(response.data);
    }catch(ex){
        console.log("Error getting search results", ex);
        return Promise.reject("Server Error");
    }
}