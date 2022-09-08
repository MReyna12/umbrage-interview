import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/auth";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user.username && !user.password) {
    // user is not authenticated; useEffect used so this component doesn't only run upon the application loading
    useEffect(() => {
      return navigate("/");
    }, []);
  } else {
    // user is authenticated, so display the protected components (Avatars and DetailedView)
    return children;
  }
};

export default ProtectedRoute;
