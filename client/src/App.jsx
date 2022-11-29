import Reat from "react";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import Login from "./Views/Login";
import Register from "./Views/Register";
import Home from "./Views/Home";
import Logout from "./Views/Logout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
