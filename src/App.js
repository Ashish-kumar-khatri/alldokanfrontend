import './App.css';
import {
  Routes,
  Route
} from 'react-router-dom';

import { useRef } from 'react';


import {
  HomePage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProductDetailPage,
} from './pages/'

import './styles/auth.css';

function App() {


  useEffect(() => {
    return () => {
      second
    }
  }, [third])
  

  return (
    <div className="App" ref = {bodyRef}>
      <Routes>
        <Route path = "/" element = {<HomePage />} />
        <Route path = "/login" element = {<LoginPage />}/>
        <Route path = "/register/*" element = {<RegisterPage />} />
        <Route path = "/forgot-password" element = {<ForgotPasswordPage />} />
        <Route path = "/reset-password/:resetToken" element = {<ResetPasswordPage />} />
        
        <Route path = "/category/productId" element = {<ProductDetailPage />}/>
      </Routes>
    </div>  
  );
}

export default App;
