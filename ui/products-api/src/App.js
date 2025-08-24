import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navigation from "./components/Navigation"


import Home from './pages/Home';
import Login from './pages/Login';
// import Register from './pages/Register';
import Products from './pages/Products';
// import AddProduct from './pages/AddProduct';

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<Login />} />
        {/* 
        <Route path="/register" element={<Register />} />
        <Route path="/products/create" element={<AddProduct />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
