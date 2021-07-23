import axios from 'axios';
import GetAuthToken from './AuthManager';
const BASE_URL = "https://404f1c2c6b61.ngrok.io/customer/"

export async function SearchNearMe(query, tags, page = 0){
    console.log('Token', await GetAuthToken());
    try{
        const response = await axios.get(`${BASE_URL}search/`, {
            method: "GET",
            headers: {
                "authorization": await GetAuthToken(),
                "timestamp": new Date().getTime()
            },
            params: {
                q: query,
                tags: tags,
                page: page
            }
        })
        return Promise.resolve(response.data);
    }catch(ex){
        console.log("Error getting search results", ex);
        return Promise.reject("Server Error");
    }
}