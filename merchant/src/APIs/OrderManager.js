import axios from 'axios';
import GetAuthToken from './AuthManager';
const BASE_URL = 'https://404bc94a36fa.ngrok.io/merchant/';

async function GetPendingOrders() {
  try {
    const response = await axios.get(`${BASE_URL}orders/pending`, {
      method: 'GET',
      headers: {
        authorization: await GetAuthToken(),
        timestamp: new Date().getTime(),
      },
    });
    return Promise.resolve(response.data.orders);
  } catch (ex) {
    console.log('Error getting pending orders', ex);
    return Promise.reject('Server Error');
  }
}

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

async function AcceptOrder(id) {
  try {
    const response = await axios.put(
      `${BASE_URL}order/pending/confirm/${id}`,
      {},
      {
        method: 'PUT',
        headers: {
          authorization: await GetAuthToken(),
          timestamp: new Date().getTime(),
        },
      },
    );
    return Promise.resolve();
  } catch (ex) {
    console.log('Error accepting pending  order', ex);
    return Promise.reject('Server Error');
  }
}

async function RejectOrder(id) {
  try {
    const response = await axios.put(
      `${BASE_URL}order/pending/reject/${id}`,
      {},
      {
        method: 'PUT',
        headers: {
          authorization: await GetAuthToken(),
          timestamp: new Date().getTime(),
        },
      },
    );
    return Promise.resolve();
  } catch (ex) {
    console.log('Error rejecting pending  order', ex);
    return Promise.reject('Server Error');
  }
}

export {
  GetPendingOrders,
  GetCompleteOrders,
  GetOrderDetails,
  AcceptOrder,
  RejectOrder,
};
