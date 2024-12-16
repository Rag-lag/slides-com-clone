import { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route,} from "react-router-dom";
import Landing from './pages/Landing.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Presentation from './pages/Presentation.jsx'
import Slideshow from './pages/Slideshow.jsx';

function App() {
  const [token, setToken] = useState(null);
  useEffect(() => {
    setToken(localStorage.getItem('userToken'));
  },[]);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing token={token}/>} />
          <Route path="/login" element={<Login setTokenFn={setToken}/>} />
          <Route path="/register" element={<Register  setTokenFn={setToken}/>} />
          <Route path="/dashboard" element={<Dashboard setTokenFn={setToken}/>} />
          <Route path="/slides/:id/:num" element={<Presentation token={token}/>} />
          <Route path="/slideshow/:token/:id/:num" element={<Slideshow token={token}/>} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
