import { Routes, Route } from "react-router-dom";
import DetailedView from "../components/DetailedView";
import Avatars from "../components/Avatars";
import Login from "../components/Login";
import ProtectedRoute from "../components/ProtectedRoute";
import { AuthProvider } from "../hooks/auth";

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
