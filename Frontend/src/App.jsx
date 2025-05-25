import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UploadFile from './pages/upload'; // ✅ adjust the path as needed


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/upload" element={<UploadFile />} />
      </Routes>
    </Router>
  );
}

export default App;

