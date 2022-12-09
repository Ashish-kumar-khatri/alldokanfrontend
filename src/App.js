import './App.css';
import {
  Routes,
  Route
} from 'react-router-dom';

import Subscriptions from  './pages/SubscriptionPage/Subscriptions'
import SellerSubscription from './pages/SubscriptionPage/SellerSubscription'
import CompanySubscription from './pages/SubscriptionPage/CompanySubscription';

import {
  HomePage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProductDetailPage,
  SubscriptionPage
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
        
        <Route path = "/category/productId/*" element = {<ProductDetailPage />}/>
        <Route path = "/subscription/*" element = {<SubscriptionPage />}>
          <Route path = "" element = {<Subscriptions />} />
          <Route path = "seller" element = {<SellerSubscription />} />
          <Route path = "company" element = {<CompanySubscription />} />
        </Route>
      </Routes>
    </div>  
  );
}

export default App;
