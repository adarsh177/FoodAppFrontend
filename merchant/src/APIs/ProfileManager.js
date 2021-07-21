import axios from 'axios';
import GetAuthToken from './AuthManager';
const BASE_URL = "https://f13022f49868.ngrok.io/merchant/"

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

async function SendFeedback(feedback){
    try{
        const response = await axios.post(`${BASE_URL}feedback`, {feedback: feedback}, {
            method: "POST",
            headers: {
                "authorization": await GetAuthToken(),
                "timestamp": new Date().getTime()
            },
        })
        return Promise.resolve();
    }catch(ex){
        console.log("Error sending feedback", ex);
        return Promise.reject("Server Error");
    }
}

export {
    GetProfile,
    UpdateProfile,
    CreateProfile,
    SendFeedback
}