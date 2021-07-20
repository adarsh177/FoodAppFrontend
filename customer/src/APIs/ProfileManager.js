import axios from 'axios';
import GetAuthToken from './AuthManager';
const BASE_URL = "https://f75784ceb3d0.ngrok.io/customer/"

async function GetProfile(){
    try{
        const response = await axios.get(BASE_URL, {
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
                "authorization": await GetAuthToken(),
                "timestamp": new Date().getTime()
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
                "authorization": await GetAuthToken(),
                "timestamp": new Date().getTime()
            },
        })
        return Promise.resolve();
    }catch(ex){
        console.log("Error creating profile", ex);
        return Promise.reject("Server Error");
    }
}

async function GetTaxes(){
    try{
        const response = await axios.get(`${BASE_URL}taxes`, {
            method: "GET",
            headers: {
                "authorization": await GetAuthToken(),
                "timestamp": new Date().getTime()
            }
        })
        return Promise.resolve(response.data.taxes);
    }catch(ex){
        console.log("Error getting taxes", ex);
        return Promise.reject("Server Error");
    }
}

async function CheckPromo(promoCode){
    try{
        const response = await axios.get(`${BASE_URL}promo/${promoCode}`, {
            method: "GET",
            headers: {
                "authorization": await GetAuthToken(),
                "timestamp": new Date().getTime()
            }
        })
        return Promise.resolve(response.data.promo);
    }catch(ex){
        console.log("Error getting promo", ex);
        return Promise.reject("Server Error");
    }
}

export {
    GetProfile,
    UpdateProfile,
    CreateProfile,
    GetTaxes,
    CheckPromo
}