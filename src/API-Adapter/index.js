const URL = "https://autonomous-collective.onrender.com";

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
    return result.token;
  } catch (error) {
    console.log(error);
  }
  throw error;
};

export const loginUserCall = async (email, password) => {
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
    return result.token;
  } catch (error) {
    console.log();
  }
  throw error;
};
