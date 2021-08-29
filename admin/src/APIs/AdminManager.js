import axios from "axios";
import GetAuthToken from "./AuthManager";
// const BASE_URL = "https://5f90d782eb10.ngrok.io/admin/";
const BASE_URL = "https://food.adarshshrivastava.in/admin/";

export async function CheckAdmin() {
  try {
    const response = await axios.get(`${BASE_URL}`, {
      method: "GET",
      headers: {
        authorization: await GetAuthToken(),
        timestamp: new Date().getTime(),
      },
    });
    return Promise.resolve(response.data);
  } catch (ex) {
    console.log("Admin error", ex.response);
    if (ex.response.status === 403) {
      return Promise.reject("UNAUTH");
    }
    console.log("Error checking admin", ex);
    return Promise.reject("Server Error");
  }
}

export async function GetStats() {
  try {
    const response = await axios.get(`${BASE_URL}stats`, {
      method: "GET",
      headers: {
        authorization: await GetAuthToken(),
        timestamp: new Date().getTime(),
      },
    });
    return Promise.resolve(response.data);
  } catch (ex) {
    if (ex.response.status === 403) {
      return Promise.reject("UNAUTH");
    }
    console.log("Error getting stats", ex);
    return Promise.reject("Server Error");
  }
}

export async function GetFeedbacks(page) {
  try {
    const response = await axios.get(`${BASE_URL}feedback/${page}`, {
      method: "GET",
      headers: {
        authorization: await GetAuthToken(),
        timestamp: new Date().getTime(),
      },
    });
    return Promise.resolve(response.data);
  } catch (ex) {
    if (ex.response.status === 403) {
      return Promise.reject("UNAUTH");
    }
    console.log("Error getting feedbacks", ex);
    return Promise.reject("Server Error");
  }
}

export async function GetIngredients() {
  try {
    const response = await axios.get(`${BASE_URL}ingredients`, {
      method: "GET",
      headers: {
        authorization: await GetAuthToken(),
        timestamp: new Date().getTime(),
      },
    });
    return Promise.resolve(response.data.ingredients);
  } catch (ex) {
    if (ex.response.status === 403) {
      return Promise.reject("UNAUTH");
    }
    console.log("Error getting ingredients", ex);
    return Promise.reject("Server Error");
  }
}

export async function AddIngredient(ingredient) {
  try {
    const response = await axios.post(
      `${BASE_URL}ingredients`,
      {
        ingredient: ingredient,
      },
      {
        method: "POST",
        headers: {
          authorization: await GetAuthToken(),
          timestamp: new Date().getTime(),
        },
      }
    );
    return Promise.resolve();
  } catch (ex) {
    if (ex.response.status === 403) {
      return Promise.reject("UNAUTH");
    }
    console.log("Error adding ingredients", ex);
    return Promise.reject("Server Error");
  }
}

export async function DeleteIngredient(ingredient) {
  try {
    const response = await axios.delete(
      `${BASE_URL}ingredients/${encodeURI(ingredient)}`,
      {
        method: "DELETE",
        headers: {
          authorization: await GetAuthToken(),
          timestamp: new Date().getTime(),
        },
      }
    );
    return Promise.resolve();
  } catch (ex) {
    if (ex.response.status === 403) {
      return Promise.reject("UNAUTH");
    }
    console.log("Error deleting ingredients", ex);
    return Promise.reject("Server Error");
  }
}

export async function GetTags() {
  try {
    const response = await axios.get(`${BASE_URL}tags`, {
      method: "GET",
      headers: {
        authorization: await GetAuthToken(),
        timestamp: new Date().getTime(),
      },
    });
    return Promise.resolve(response.data.tags);
  } catch (ex) {
    if (ex.response.status === 403) {
      return Promise.reject("UNAUTH");
    }
    console.log("Error getting tags", ex);
    return Promise.reject("Server Error");
  }
}

export async function AddTag(tag) {
  try {
    const response = await axios.post(
      `${BASE_URL}tags`,
      {
        tag: tag,
      },
      {
        method: "POST",
        headers: {
          authorization: await GetAuthToken(),
          timestamp: new Date().getTime(),
        },
      }
    );
    return Promise.resolve();
  } catch (ex) {
    if (ex.response.status === 403) {
      return Promise.reject("UNAUTH");
    }
    console.log("Error adding tags", ex);
    return Promise.reject("Server Error");
  }
}

export async function DeleteTag(tag) {
  try {
    const response = await axios.delete(`${BASE_URL}tags/${encodeURI(tag)}`, {
      method: "DELETE",
      headers: {
        authorization: await GetAuthToken(),
        timestamp: new Date().getTime(),
      },
    });
    return Promise.resolve();
  } catch (ex) {
    if (ex.response.status === 403) {
      return Promise.reject("UNAUTH");
    }
    console.log("Error deleting tags", ex);
    return Promise.reject("Server Error");
  }
}

export async function GetAdmins() {
  try {
    const response = await axios.get(`${BASE_URL}admins`, {
      method: "GET",
      headers: {
        authorization: await GetAuthToken(),
        timestamp: new Date().getTime(),
      },
    });
    return Promise.resolve(response.data.admins);
  } catch (ex) {
    if (ex.response.status === 403) {
      return Promise.reject("UNAUTH");
    }
    console.log("Error getting admins", ex);
    return Promise.reject("Server Error");
  }
}

export async function AddAdmin(admin) {
  try {
    const response = await axios.post(
      `${BASE_URL}admins`,
      {
        admin: admin,
      },
      {
        method: "POST",
        headers: {
          authorization: await GetAuthToken(),
          timestamp: new Date().getTime(),
        },
      }
    );
    return Promise.resolve();
  } catch (ex) {
    if (ex.response.status === 403) {
      return Promise.reject("UNAUTH");
    }
    console.log("Error adding admins", ex);
    return Promise.reject("Server Error");
  }
}

export async function DeleteAdmin(admin) {
  try {
    const response = await axios.delete(
      `${BASE_URL}admins/${encodeURI(admin)}`,
      {
        method: "DELETE",
        headers: {
          authorization: await GetAuthToken(),
          timestamp: new Date().getTime(),
        },
      }
    );
    return Promise.resolve();
  } catch (ex) {
    if (ex.response.status === 403) {
      return Promise.reject("UNAUTH");
    }
    console.log("Error deleting admin", ex);
    return Promise.reject("Server Error");
  }
}

export async function GetCommision() {
  try {
    const response = await axios.get(`${BASE_URL}commision`, {
      method: "GET",
      headers: {
        authorization: await GetAuthToken(),
        timestamp: new Date().getTime(),
      },
    });
    return Promise.resolve(response.data.commisionPercent);
  } catch (ex) {
    if (ex.response.status === 403) {
      return Promise.reject("UNAUTH");
    }
    console.log("Error getting commision", ex);
    return Promise.reject("Server Error");
  }
}

export async function UpdateCommision(newCommision) {
  try {
    const response = await axios.put(
      `${BASE_URL}commision`,
      {
        commisionPercent: newCommision,
      },
      {
        method: "PUT",
        headers: {
          authorization: await GetAuthToken(),
          timestamp: new Date().getTime(),
        },
      }
    );
    return Promise.resolve();
  } catch (ex) {
    console.log("Error updating commision", ex);
    if (ex.response.status === 403) {
      return Promise.reject("UNAUTH");
    }
    return Promise.reject("Server Error");
  }
}

export async function GetCustomerDetails(identifier) {
  try {
    const response = await axios.get(
      `${BASE_URL}customer/${encodeURI(identifier)}`,
      {
        method: "GET",
        headers: {
          authorization: await GetAuthToken(),
          timestamp: new Date().getTime(),
        },
      }
    );
    return Promise.resolve(response.data.customer);
  } catch (ex) {
    console.log("Error getting merchant", ex);
    if (ex.response.status === 403) {
      return Promise.reject("UNAUTH");
    }
    return Promise.reject("Server Error");
  }
}

export async function GetMerchantDetails(identifier) {
  try {
    const response = await axios.get(
      `${BASE_URL}merchant/${encodeURI(identifier)}`,
      {
        method: "GET",
        headers: {
          authorization: await GetAuthToken(),
          timestamp: new Date().getTime(),
        },
      }
    );
    return Promise.resolve(response.data.merchant);
  } catch (ex) {
    console.log("Error getting merchant", ex);
    if (ex.response.status === 403) {
      return Promise.reject("UNAUTH");
    }
    return Promise.reject("Server Error");
  }
}

export async function ToggleBlockMerchant(userId) {
  try {
    const response = await axios.put(
      `${BASE_URL}block/merchant/${encodeURI(userId)}`,
      {},
      {
        method: "PUT",
        headers: {
          authorization: await GetAuthToken(),
          timestamp: new Date().getTime(),
        },
      }
    );
    return Promise.resolve();
  } catch (ex) {
    console.log("Error blocking merchant", ex);
    if (ex.response.status === 403) {
      return Promise.reject("UNAUTH");
    }
    return Promise.reject("Server Error");
  }
}

export async function ToggleBlockCustomer(userId) {
  try {
    const response = await axios.put(
      `${BASE_URL}block/customer/${encodeURI(userId)}`,
      {},
      {
        method: "PUT",
        headers: {
          authorization: await GetAuthToken(),
          timestamp: new Date().getTime(),
        },
      }
    );
    return Promise.resolve();
  } catch (ex) {
    console.log("Error blocking customer", ex);
    if (ex.response.status === 403) {
      return Promise.reject("UNAUTH");
    }
    return Promise.reject("Server Error");
  }
}

export async function UpdateMerchantCommision(userId, commision) {
  try {
    const response = await axios.put(
      `${BASE_URL}merchant/updateCommision/${encodeURI(userId)}`,
      {
        commision: commision,
      },
      {
        method: "PUT",
        headers: {
          authorization: await GetAuthToken(),
          timestamp: new Date().getTime(),
        },
      }
    );
    return Promise.resolve();
  } catch (ex) {
    console.log("Error updating merchant commision", ex);
    if (ex.response.status === 403) {
      return Promise.reject("UNAUTH");
    }
    return Promise.reject("Server Error");
  }
}

export async function SendNotification(data) {
  try {
    const response = await axios.post(`${BASE_URL}notifications`, data, {
      method: "POST",
      headers: {
        authorization: await GetAuthToken(),
        timestamp: new Date().getTime(),
      },
    });
    return Promise.resolve();
  } catch (ex) {
    console.log("Error sending notification", ex, ex.response);
    if (ex.response.status === 403) {
      return Promise.reject("UNAUTH");
    }
    return Promise.reject("Server Error");
  }
}

export async function GetTaxInfo() {
  try {
    const response = await axios.get(`${BASE_URL}tax`, {
      method: "GET",
      headers: {
        authorization: await GetAuthToken(),
        timestamp: new Date().getTime(),
      },
    });
    return Promise.resolve(response.data);
  } catch (ex) {
    console.log("Error getting tax information", ex);
    if (ex.response.status === 403) {
      return Promise.reject("UNAUTH");
    }
    return Promise.reject("Server Error");
  }
}

export async function PutTaxInfo(data) {
  try {
    const response = await axios.put(
      `${BASE_URL}tax`,
      { Taxes: data },
      {
        method: "PUT",
        headers: {
          authorization: await GetAuthToken(),
          timestamp: new Date().getTime(),
        },
      }
    );
    return Promise.resolve();
  } catch (ex) {
    console.log("Error putting tax information", ex);
    if (ex.response.status === 403) {
      return Promise.reject("UNAUTH");
    }
    return Promise.reject("Server Error");
  }
}

export async function GetPayoutEstimateStripe() {
  try {
    const response = await axios.get(`${BASE_URL}stripe/payoutestimate`, {
      method: "GET",
      headers: {
        authorization: await GetAuthToken(),
        timestamp: new Date().getTime(),
      },
    });
    return Promise.resolve(response.data.estimate);
  } catch (ex) {
    console.log("Error getting payout information stripe", ex);
    if (ex.response.status === 403) {
      return Promise.reject("UNAUTH");
    }
    return Promise.reject("Server Error");
  }
}

export async function GetPayoutEstimateRazorpay() {
  try {
    const response = await axios.get(`${BASE_URL}razorpay/payoutestimate`, {
      method: "GET",
      headers: {
        authorization: await GetAuthToken(),
        timestamp: new Date().getTime(),
      },
    });
    return Promise.resolve(response.data.estimate);
  } catch (ex) {
    console.log("Error getting payout information razorpay", ex);
    if (ex.response.status === 403) {
      return Promise.reject("UNAUTH");
    }
    return Promise.reject("Server Error");
  }
}
