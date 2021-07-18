import axios from 'axios';
import GetAuthToken from './AuthManager';
const BASE_URL = "https://8b7984068343.ngrok.io/merchant/"

async function GetCommodities(){
    try{
        const response = await axios.get(`${BASE_URL}commodity`, {
            method: "GET",
            headers: {
                "authorization": await GetAuthToken()
            }
        })
        return Promise.resolve(response.data);
    }catch(ex){
        console.log("Error getting commodities", ex);
        return Promise.reject("Server Error");
    }
}

async function DeleteCommodity(id){
    try{
        const response = await axios.delete(`${BASE_URL}commodity/${id}`, {
            method: "DELETE",
            headers: {
                "authorization": await GetAuthToken()
            }
        })
        return Promise.resolve();
    }catch(ex){
        console.log("Error deleting commodity", ex);
        return Promise.reject("Server Error");
    }
}

// data to be {name, description, image}
async function AddCommodity(data){
    try{
        const response = await axios.post(`${BASE_URL}commodity`, data, {
            method: "POST",
            headers: {
                "authorization": await GetAuthToken()
            }
        })
        return Promise.resolve();
    }catch(ex){
        console.log("Error ADDING commodity", ex);
        return Promise.reject("Server Error");
    }   
}

async function GetListings(){
    try{
        const response = await axios.get(`${BASE_URL}listing`, {
            method: "GET",
            headers: {
                "authorization": await GetAuthToken()
            }
        })
        return Promise.resolve(response.data);
    }catch(ex){
        console.log("Error ADDING listing", ex);
        return Promise.reject("Server Error");
    }
}

async function ListItem(data){
    try{
        const response = await axios.post(`${BASE_URL}listing`, data, {
            method: "POST",
            headers: {
                "authorization": await GetAuthToken()
            }
        })
        return Promise.resolve();
    }catch(ex){
        console.log("Error ADDING listing", ex);
        return Promise.reject("Server Error");
    }
}

async function UnlistItem(commodityId){
    try{
        const response = await axios.delete(`${BASE_URL}listing/${commodityId}`, {
            method: "DELETE",
            headers: {
                "authorization": await GetAuthToken()
            }
        })
        return Promise.resolve();
    }catch(ex){
        console.log("Error deleting listing", ex);
        return Promise.reject("Server Error");
    }
}

async function UpdateStoreStatus(time){
    try{
        const response = await axios.put(`${BASE_URL}status`, {
            openTill: time
        }, {
            method: "PUT",
            headers: {
                "authorization": await GetAuthToken()
            }
        })
        return Promise.resolve();
    }catch(ex){
        console.log("Error updating store status", ex);
        return Promise.reject("Server Error");
    }
}

async function GetOrderSummary(){
    try{
        const response = await axios.get(`${BASE_URL}summary`, {
            method: "GET",
            headers: {
                "authorization": await GetAuthToken()
            }
        })
        return Promise.resolve(response.data);
    }catch(ex){
        console.log("Error getting order summary", ex);
        return Promise.reject("Server Error");
    }
}

export {
    GetCommodities,
    DeleteCommodity,
    AddCommodity,
    GetListings,
    ListItem,
    UnlistItem,
    UpdateStoreStatus,
    GetOrderSummary
}