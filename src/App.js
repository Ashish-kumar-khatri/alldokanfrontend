import './App.css';
import {
  Routes,
  Route
} from 'react-router-dom';

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
  return (
    <div className="App">
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
