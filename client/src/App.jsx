import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ResumeUpload from "./pages/ResumeUpload";
import Interview from "./pages/Interview";
import Report from "./pages/Report";
import ForgotPassword from "./pages/ForgotPassword";
import History from "./pages/History";
function App() {
  return (
    <BrowserRouter>
      <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/forgot-password" element={<ForgotPassword />} />
  <Route element={<Layout />}>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/resume" element={<ResumeUpload />} />
    <Route path="/interview" element={<Interview />} />
    <Route path="/report" element={<Report />} />
    <Route path="/history" element={<History />} />
  </Route>
  
</Routes>
    </BrowserRouter>
  );
}

export default App;