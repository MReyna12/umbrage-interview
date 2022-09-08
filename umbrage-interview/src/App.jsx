import { Routes, Route } from "react-router-dom";
import DetailedView from "../components/DetailedView";
import Avatars from "../components/Avatars";
import Login from "../components/Login";
import ProtectedRoute from "../components/ProtectedRoute";
import { AuthProvider } from "../hooks/auth";

// AuthProvider allows for the data passed via context to be accessible to all of its children
// ProtectedRoute is a component that checks to see if the user has been authenticated (received a bearer token), if not, the avatars and detailedview routes will be inaccessible
function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="avatars"
          element={
            <ProtectedRoute>
              <Avatars />
            </ProtectedRoute>
          }
        />
        <Route
          path="detailedview"
          element={
            <ProtectedRoute>
              <DetailedView />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
