const URL = "https://autonomous-collective.onrender.com";
// const URL = "http://localhost:4000";

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

export const guestLoginCall = async () => {
  try {
    const response = await fetch(`${URL}/api/users/guest-login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      })
    ;
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

export const addProductToCartCall = async (token, userId, productId, quantity) => {

  try {
    const response = await fetch(`${URL}/api/users/${userId}/add-product/${productId}`, {
      method: "POST",
      headers: makeHeaders(token),
      body: {
        quantity: quantity,
      }
    
  
    })
    const result = await response.json();
    console.log(result,"result from addProductToCartCall ")
    return result;
    
  } catch (error) {
    console.error(error)
  }

} 

export const getAllUsersCall = async (token) => {

  try {
    const response = await fetch(`${URL}/api/users/all`, {
      method: "GET",
      headers: makeHeaders(token)
    })
  
    const result = await response.json();
    console.log(result, " result from get all users ")
    return result;
    
  } catch (error) {
    console.error(error)
  }

}

export const editProductCall = async(token, productId, title, author, isbn, description, price, imageUrl, inventory ) => {
  try {
      const response = await fetch(`${URL}/api/products/${productId}`, {
        method: "PATCH",
        headers: makeHeaders(token),
        body: JSON.stringify( {
          title: title,
          author: author,
          isbn: isbn,
          description: description,
          price: price,
          imageUrl: imageUrl,
          inventory: inventory

        })
      })
      const result = await response.json();
      console.log (result, "result from editProductCall")
      return result;

  } catch (error) {
    console.error(error)
  }
}

export const deactivateProductCall = async (token, productId) => {

  try {
    const response = await fetch(`${URL}/api/products/${productId}/delete`, {
      method: "PATCH",
      headers: makeHeaders(token)
    })
  
    const result = await response.json();
    console.log(result, "result from deactivateProductCall")
    return result; 
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const activateProductCall = async(token, productId) => {
  try {
    const response = await fetch(`${URL}/api/products/${productId}/restore`, {
      method: "PATCH",
      headers: makeHeaders(token),
    });
  
    const result = await response.json();
    console.log(result, "result from activatePRoduct call");
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
  
}

export const adminEditUserCall = async(token, userId, name, email, isAdmin, isActive) => {
  console.log(token, userId, name, email, isAdmin, isActive, "from admin edit user call")
  try {
    const response = await fetch(`${URL}/api/users/admin/edit-user/${userId}`, {
      method: "PATCH",
      headers: makeHeaders(token),
      body: JSON.stringify({
        name: name, 
        email: email,
        isAdmin: isAdmin,
        isActive: isActive
      })
    });

    const result = await response.json();
    console.log(result, "result from admin edit user call");
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const getAllTagsCall = async () => {
  try{
  const response = await fetch(`${URL}/api/products/tags`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
  const result = await response.json();
  console.log(result, "This is result from get all tags");
  return result;
} catch (error) {
  console.error(error)
  throw error
}
}

export const deactivateUserCall = async (token, userId) => {

  try {
    const response = await fetch(`${URL}/api/users/delete/${userId}`, {
      method: "PATCH",
      headers: makeHeaders(token)
    })
  
    const result = await response.json();
    console.log(result, "result from deactivateUserCall")
    return result; 
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const addAProductCall = async (token, title, author, isbn, description, price, img, inventory) => {

  try {
    const response = await fetch(`${URL}/api/products/`, {
      method: "POST",
      headers: makeHeaders(token),
      body: JSON.stringify({
        title: title,
        author: author,
        isbn: isbn,
        description: description,
        price: price,
        imageUrl: img,
        inventory: inventory
      })
    })
  
    const result = await response.json();
    console.log(result, "result from addProductCall")
    return result; 
  } catch (error) {
    console.error(error)
    throw error
  }  
}

export const addTagToProductCall = async (token, name, productId) => {

  try {
    const response = await fetch(`${URL}/api/products/${productId}/add-tag`, {
        method: "POST",
        headers: makeHeaders(token),
        body: JSON.stringify({
          name: name,
        })
      })
    
      const result = await response.json();
      console.log(result, "result from addProductToTag call")
      return result;

    } catch (error) {
    console.error(error)
    throw error;
  }
}

export const getCartByUserIdCall = async (token, userId) => {
  try {
    const response = await fetch(`${URL}/api/users/${userId}/cart`, {
      method: "GET",
      headers: makeHeaders(token)
    })

    const result = await response.json();
    console.log(result, "result from getCartByUserIdCall")
    return result;

  } catch (error) {
    console.error(error)
    throw error
  }
}