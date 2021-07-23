import axios from 'axios';
import GetAuthToken from './AuthManager';
const BASE_URL = "https://404f1c2c6b61.ngrok.io/customer/"

export async function GetMerchantInfo(id){
    try{
        const response = await axios.get(`${BASE_URL}merchant/${id}`, {
            method: "GET",
            headers: {
                "authorization": await GetAuthToken(),
                "timestamp": new Date().getTime()
            }
        })
        return Promise.resolve(response.data);
    }catch(ex){
        if(ex.response.status === 404){
            return Promise.resolve(null);
        }
        console.log("Error getting merchant info", ex);
        return Promise.reject("Server Error");
    }
}

export async function GetFavourites(){
    try{
        const response = await axios.get(`${BASE_URL}favourite`, {
            method: "GET",
            headers: {
                "authorization": await GetAuthToken(),
                "timestamp": new Date().getTime()
            }
        })
        return Promise.resolve(response.data.favourites);
    }catch(ex){
        console.log("Error getting favs", ex);
        return Promise.reject("Server Error");
    }
}

export async function SetFavourite(id){
    try{
        const response = await axios.post(`${BASE_URL}favourite/${id}`, {}, {
            method: "POST",
            headers: {
                "authorization": await GetAuthToken(),
                "timestamp": new Date().getTime()
            }
        })
        return Promise.resolve();
    }catch(ex){
        console.log("Error setting fav", ex);
        return Promise.reject("Server Error");
    }
}

export async function UnsetFavourite(id){
    try{
        const response = await axios.delete(`${BASE_URL}favourite/${id}`, {
            method: "DELETE",
            headers: {
                "authorization": await GetAuthToken(),
                "timestamp": new Date().getTime()
            }
        })
        return Promise.resolve();
    }catch(ex){
        console.log("Error unsetting fav", ex);
        return Promise.reject("Server Error");
    }
}

