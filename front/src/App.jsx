import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

//Hooks
import { useAuth } from './hooks/useAuth';

//Components
import Footer from './components/Footer';
import Navbar from './components/Navbar';

//Pages
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ForgotPassword from './pages/Auth/ForgotPassword';
import ResetPassword from './pages/Auth/ResetPassword';
import CriarFilme from './pages/CriarFilme/CriarFilme';


function App() {

  const { auth, loading } = useAuth();

  if (loading) {
    return <p>Carregando...</p>
  }

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
          <Route 
            path="/" 
            element={auth ? <Home /> : <Navigate to="/auth/login"/>}
          />
          <Route 
            path="/criar-filme" 
            element={auth ? <CriarFilme /> : <Navigate to="/auth/login"/>}
          />
          <Route 
            path="/auth/login" 
            element={!auth ? <Login /> : <Navigate to="/"/>}
          />
          <Route 
            path="/auth/register" 
            element={!auth ? <Register /> : <Navigate to="/"/>}
          />
          <Route 
            path="/auth/forgot-password" 
            element={!auth ? <ForgotPassword /> : <Navigate to="/"/>}
          />
          <Route 
            path="/auth/reset-password" 
            element={!auth ? <ResetPassword /> : <Navigate to="/"/>}
          />
        </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
