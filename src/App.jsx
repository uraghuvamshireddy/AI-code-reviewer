import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard";
import History from "./pages/HIstory"
import ViewFile from "./pages/ViewFile";
import './App.css'

function App() {
  const token = localStorage.getItem("token");

  return (
      <Routes>
        <Route path="/" element={!token ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="/history" element={token ? <History /> : <Navigate to="/" />}/>
        <Route path="/file/:id" element={token ? <ViewFile /> : <Navigate to="/" />}/>
      </Routes>
  );
}

export default App;
