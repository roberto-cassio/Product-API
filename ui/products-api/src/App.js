import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Navigation } from "./components/layout"
import { ToastContainer } from 'react-toastify';

import Home from './apps/Home';
import Login from './apps/Login';
import Register from './apps/Register';
import Products from './apps/Products';
import AddProduct from './apps/AddProduct';
import NotFound from './apps/NotFound';

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/products/create" element={<AddProduct />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover/>
    </Router>
  );
}

export default App;
