import React from "react";

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false };
      case "REGISTER_SUCCESS":
        return { ...state, isAuthenticated: true };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem("id_token"),
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}


// ###########################################################



async function loginUser(dispatch, login, password, history, setIsLoading, setError, setErrorText) {
  setError(false);
  setIsLoading(true);


  if (!!login && !!password ) {
    try {
      // Call the loginFun function to perform the login request

      const responseData = await loginFun(login, password);
      // localStorage.setItem('id_token', 1);
      localStorage.setItem('id_token', responseData.token);

      setError(null);
      setIsLoading(false);
      dispatch({ type: 'LOGIN_SUCCESS' });

      history.push('/app/dashboard');
    } catch (error) {
      console.error("Error logging in:", error);
      setError(true);
      // console.log(error)
      // if (error.responseData && error.responseData.error && error.responseData.error.message) {
      //   setErrorText(error.responseData.error.message);
      //   // console.error("Error logging in:", error);
      // } else {
      //   setErrorText("An error occurred while logging in.");
      // }
      setIsLoading(false);
    }
  } else {
    dispatch({ type: "LOGIN_FAILURE" });
    setError(true);
    setIsLoading(false);
  }
}



// Define the function that performs the actual login request
async function loginFun(emailOrMobileNumber, password) {
  const url = "http://localhost:8000/users/login";
  const data = {
    email: emailOrMobileNumber,
    password,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
}

function signOut(dispatch, history) {
  localStorage.removeItem("id_token");
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/login");
}


//////REGISTER USER/ SIGNUP /////////
async function registerUser(dispatch, firstname, lastname, mobileNo, email, password, history, setIsLoading, setError) {
  setError(false);
  setIsLoading(true);

  if (!!firstname && !!lastname && !!mobileNo && !!email && !!password) {
    try {
      // Call the registerFun function to perform the registration request
      const responseData = await registerFun(firstname, lastname, mobileNo, email, password);
      // console.log("response after SIGNUP,", responseData)
      localStorage.setItem('id_token', responseData.token);
      setError(null);
      setIsLoading(false);
      dispatch({ type: 'REGISTER_SUCCESS' }); // Dispatch a registration success action
      
      history.push('/login'); // Redirect to the login page after successful registration
    } catch (error) {
      console.error("Error registering user:", error);
      setError(true);
      setIsLoading(false);
    }
  } else {
    dispatch({ type: "REGISTER_FAILURE" });
    setError(true);
    setIsLoading(false);
  }
}

// Define the function that performs the actual registration request
async function registerFun(firstname, lastname, mobileNo, email, password) {
  const url = "http://localhost:8000/users/register";
  const data = {
    firstName:firstname,
    lastName: lastname,
    mobileNumber:mobileNo,
    email,
    password,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Registration failed");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
}


export { UserProvider, useUserState, useUserDispatch, loginUser, signOut, registerUser };
