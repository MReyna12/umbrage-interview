import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  if (!localStorage.getItem("token")) {
    // token has not been generated--user is not authenticated; useEffect used so this component doesn't only run upon the application loading
    useEffect(() => {
      return navigate("/");
    }, []);
  } else {
    // user is authenticated, so display the protected components (Avatars and DetailedView)
    return children;
  }
};

export default ProtectedRoute;
