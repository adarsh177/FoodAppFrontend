import axios from 'axios';
import GetAuthToken from './AuthManager';
const BASE_URL = "https://4ad85fc453a8.ngrok.io/customer/"

export async function SearchNearMe(page = 0){
    console.log('Token', await GetAuthToken());
    try{
        const response = await axios.get(`${BASE_URL}nearme/${page}`, {
            method: "GET",
            headers: {
                "authorization": await GetAuthToken(),
                "timestamp": new Date().getTime()
            }
        })
        return Promise.resolve(response.data);
    }catch(ex){
        console.log("Error getting search results", ex);
        return Promise.reject("Server Error");
    }
}