import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  if (!localStorage.getItem("token")) {
    // If a user tries to access a protected route prior to obtaining a bearer token, then will be sent back to the login page
    useEffect(() => {
      return navigate("/");
    }, []);
  } else {
    // user is authenticated, so display the protected components (Avatars and DetailedView)
    return children;
  }
};

export default ProtectedRoute;
