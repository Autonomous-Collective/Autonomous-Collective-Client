const URL = "https://autonomous-collective.onrender.com";

const makeHeaders = (token) => {
  return {
    "Content-Type" : "application/json",
    "Authorization" : `Bearer ${token}`,
  }
}

export const registerNewUserCall = async (name, email, password) => {
  try {
    const response = await fetch(`${URL}/api/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
  throw error;
};

export const userLoginCall = async (email, password) => {
  try {
    const response = await fetch(`${URL}/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log();
  }
  throw error;
};

export const guestLoginCall = async (email, password) => {
  try {
    const response = await fetch(`${URL}/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log();
  }
  throw error;
};

export const getAllProductsCall = async () => {
  try {
    const response = await fetch(`${URL}/api/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    console.log(result, "from getAllProductsCall in api-adapter");
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getProductByIdCall = async (productId) => {
  try {
    const response = await fetch(`${URL}/api/products/${productId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        
      },
    });

    const result = await response.json();
    console.log(result, "from get product by id api-adapter");
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getReviewsForProductCall = async (productId) => {
  try {
    const response = await fetch(`${URL}/api/products/reviews/${productId}`, 
    {
      "method": "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })

    const result = await response.json();
    console.log(result, "result from get reviews by product API call")
    return result;
  } catch (error) {
    console.error
    throw error;
  }
} 

export const createReviewCall = async(productId, token, score, title, content) => {
  try{
    const response = await fetch(`${URL}/api/products/${productId}/reviews`, {
      method: "POST", 
      headers: makeHeaders(token),
      body: JSON.stringify({
        score: score,
        title: title,
        content: content
      })
    });

    const result = await response.json();
    console.log(result, "result from create review api call!!!");
    return result;
  }catch(error){
    console.error(error);
    throw error;
  }
}
