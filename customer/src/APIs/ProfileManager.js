import axios from 'axios';
import GetAuthToken from './AuthManager';
const BASE_URL = "https://a1e46b7431f6.ngrok.io/customer/"

async function GetProfile(){
    try{
        const response = await axios.get(BASE_URL, {
            method: "GET",
            headers: {
                "authorization": await GetAuthToken()
            }
        })
        return Promise.resolve(response.data);
    }catch(ex){
        if(ex.response.status === 404){
            return Promise.resolve(null);
        }
        console.log("Error getting profile", ex);
        return Promise.reject("Server Error");
    }
}

async function UpdateProfile(dataToUpdate){
    try{
        const response = await axios.put(BASE_URL, {
            ...dataToUpdate
        }, {
            method: "PUT",
            headers: {
                "authorization": await GetAuthToken()
            },
        })
        return Promise.resolve();
    }catch(ex){
        console.log("Error updating profile", ex);
        return Promise.reject("Server Error");
    }
}

async function CreateProfile(dataToUpdate){
    try{
        const response = await axios.post(BASE_URL, {
            ...dataToUpdate
        }, {
            method: "POST",
            headers: {
                "authorization": await GetAuthToken()
            },
        })
        return Promise.resolve();
    }catch(ex){
        console.log("Error creating profile", ex);
        return Promise.reject("Server Error");
    }
}

export {
    GetProfile,
    UpdateProfile,
    CreateProfile
}