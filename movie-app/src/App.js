import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './Navbar';
import SearchPage from './pages/search/SearchPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import bg from './images/bg.png';

const App = () => {
    return (
        <div style={{backgroundImage: `url(${bg})`,backgroundSize:"contain" }}>
            <Router>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<SearchPage/>}/>
                    <Route path="/cart" element={<CartPage/>}/>
                    <Route path="/checkout" element={<CheckoutPage/>}/>
                </Routes>
            </Router>
        </div>
    );
};

export default App;
