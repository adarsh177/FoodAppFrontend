import axios from 'axios';

const API_KEY = "GFxS-WeBnjy4Oq-OjIGRnc5iw7uZRLZ80vhyn8_e9oY";

export default async function ReverseGeocode(lat, lon){
    const url = `https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?prox=${lat}%2C${lon}%2C250&mode=retrieveAddresses&maxresults=1&gen=9&apiKey=${API_KEY}`;

    try{
        const response = await axios.get(url, {
            method: "GET"
        })
        const address = response.data.Response.View[0].Result[0].Location.Address;
        const data = {};
        address.AdditionalData.forEach(element => {
            if(element.key === "CountryName") data.country = element.value;
            if(element.key === "StateName") data.state = element.value;
            if(element.key === "CountyName") data.city = element.value;
        });
        data.label = address.Label;
        console.log('Loccation', data);
        return Promise.resolve(data);
    }catch(ex){
        console.log("Error getting HERE location", ex);
        return Promise.reject("Server Error");
    }
}