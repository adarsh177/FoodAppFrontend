import axios from 'axios';
import GetAuthToken from './AuthManager';

// const BASE_URL = "https://5165-42-106-17-0.ngrok.io/merchant/";
const BASE_URL = 'https://food.adarshshrivastava.in/merchant/';


async function GetCompleteOrders() {
  try {
    const response = await axios.get(`${BASE_URL}orders/history`, {
      method: 'GET',
      headers: {
        authorization: await GetAuthToken(),
        timestamp: new Date().getTime(),
      },
    });
    return Promise.resolve(response.data.orders);
  } catch (ex) {
    console.log('Error getting complete orders', ex);
    return Promise.reject('Server Error');
  }
}

async function GetOrderDetails(id) {
  try {
    const response = await axios.get(`${BASE_URL}order/${id}`, {
      method: 'GET',
      headers: {
        authorization: await GetAuthToken(),
        timestamp: new Date().getTime(),
      },
    });
    return Promise.resolve(response.data.orderDetails);
  } catch (ex) {
    console.log('Error getting  order details', ex);
    return Promise.reject('Server Error');
  }
}
// review contains : {orderId, customerName, customerPhone, review, rating}
async function GetReviews() {
  try {
    const response = await axios.get(`${BASE_URL}order/reviews`, {
      method: 'GET',
      headers: {
        authorization: await GetAuthToken(),
        timestamp: new Date().getTime(),
      },
    });
    return response.data;
  } catch (ex) {
    console.log('Error rejecting pending  order', ex);
    return Promise.reject('Server Error');
  }
}


export {
  GetOrderDetails,
  GetReviews
};
