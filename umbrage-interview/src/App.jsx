import { Routes, Route } from "react-router-dom";

import DetailedView from "../components/DetailedView";
import Avatars from "../components/Avatars";
import Login from "../components/Login";
import { AuthProvider } from "../hooks/auth";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="avatars" element={<Avatars />} />
        <Route path="detailedview" element={<DetailedView />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
