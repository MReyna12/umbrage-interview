import { useContext, createContext } from "react";
import { useNavigate } from "react-router-dom";

// createContext allows the passing down and use of data in any component within the React app without using props
// Helps to reduce props driling, which is passing props down multiple level of nested components that don't need the props
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  // This function runs when the user submits their username/password; however, if the incorrect username/password are entered, no bearer token is generated and the user must try again.
  // If the correct username/password are entered, then the bearer token returned as a response from the fetch is put in localStorage and the user is then routed to /avatars (which displays the Avatars component).
  const login = async (user) => {
    const loginUrl = "https://umbrage-interview-api.herokuapp.com/login";
    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: user.username,
        password: user.password,
      }),
    };

    try {
      const fetchToken = await fetch(loginUrl, settings);
      const data = await fetchToken.json();
      if (!data.error) {
        localStorage.setItem("token", data.access_token);
        navigate("/avatars");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // When a user logouts localstorage is cleared and the user is sent back to the login page.
  // Setting the property "replace" to true does not allow the user to go back to a previously protected route by clicking the back button
  const logout = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };

  // In App.jsx, AuthProvider will wrap all of the components (the children value in the return value below), thus allowing for global access of login/logout
  return (
    <AuthContext.Provider value={{ login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Whenever useAuth is called throughout the code base, the values(login, logout) from the context object (AuthContext) will be accessible
export const useAuth = () => {
  return useContext(AuthContext);
};
