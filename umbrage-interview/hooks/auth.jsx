import { useState, useContext, createContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ username: null, password: null });
  const navigate = useNavigate();

  const login = async (user) => {
    setUser(user);

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

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
