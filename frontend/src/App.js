import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from './pages/Dashboard'

import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Login from './pages/Login'
import Register from './pages/Register'
import Header from './components/Header'
import GoalState from "./context/goal/GoalState";
import AuthState from "./context/auth/AuthState";

function App() {
  return (
    <AuthState>
      <GoalState>
        <Router>
          <Header toast={toast}/>
          <Routes>
            <Route exact path="/" element={<Dashboard toast={toast}/>} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
          </Routes>
        </Router>
        <ToastContainer />
      </GoalState>
    </AuthState>
  );
}

export default App;
