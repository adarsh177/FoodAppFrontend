import axios from 'axios';
import GetAuthToken from './AuthManager';
const BASE_URL = "https://food.adarshshrivastava.in/customer/"

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

async function SendFeedback(feedback){
    try{
        const response = await axios.post(`${BASE_URL}feedback`, {feedback: feedback}, {
            method: "POST",
            headers: {
                "authorization": await GetAuthToken(),
                "timestamp": new Date().getTime()
            }
        })
        return Promise.resolve();
    }catch(ex){
        console.log("Error adding feedback", ex);
        return Promise.reject("Server Error");
    }
}

async function GetWalletBalance(){
    try{
        const response = await axios.get(`${BASE_URL}wallet`, {
            method: "GET",
            headers: {
                "authorization": await GetAuthToken(),
                "timestamp": new Date().getTime()
            }
        })
        return Promise.resolve(response.data.walletBalance);
    }catch(ex){
        console.log("Error getting wallet balance", ex);
        return Promise.reject("Server Error");
    }
}

async function AddWalletBalance(data){
    try{
        const response = await axios.post(`${BASE_URL}wallet`, {balance: data}, {
            method: "POST",
            headers: {
                "authorization": await GetAuthToken(),
                "timestamp": new Date().getTime()
            }
        })
        return Promise.resolve(response.data.orderInfo);
    }catch(ex){
        console.log("Error ADDING wallet balance", ex);
        return Promise.reject("Server Error");
    }
}

async function PostOrder(order){
    try{
        const response = await axios.post(`${BASE_URL}order`, order, {
            method: "POST",
            headers: {
                "authorization": await GetAuthToken(),
                "timestamp": new Date().getTime()
            }
        })
        return Promise.resolve(response.data);
    }catch(ex){
        console.log("Error posting order", ex);
        return Promise.reject("Server Error");
    }
}

async function GetOrderDetails(id){
    try{
        const response = await axios.get(`${BASE_URL}order/detail/${id}`, {
            method: "GET",
            headers: {
                "authorization": await GetAuthToken(),
                "timestamp": new Date().getTime()
            }
        })
        return Promise.resolve(response.data.orderDetails);
    }catch(ex){
        console.log("Error getting order", ex);
        return Promise.reject("Server Error");
    }
}

async function GetOrders(){
    try{
        const response = await axios.get(`${BASE_URL}order`, {
            method: "GET",
            headers: {
                "authorization": await GetAuthToken(),
                "timestamp": new Date().getTime()
            }
        })
        return Promise.resolve(response.data);
    }catch(ex){
        console.log("Error getting order list", ex);
        return Promise.reject("Server Error");
    }
}

async function RateOrder(orderId, rating){
    try{
        const response = await axios.post(`${BASE_URL}order/rating/${orderId}`, {rating: rating}, {
            method: "POST",
            headers: {
                "authorization": await GetAuthToken(),
                "timestamp": new Date().getTime()
            }
        })
        return Promise.resolve();
    }catch(ex){
        console.log("Error rating order", ex);
        return Promise.reject("Server Error");
    }
}


export {
    GetProfile,
    UpdateProfile,
    CreateProfile,
    GetTaxes,
    CheckPromo,
    SendFeedback,
    GetWalletBalance,
    AddWalletBalance,
    PostOrder,
    GetOrderDetails,
    GetOrders,
    RateOrder
}