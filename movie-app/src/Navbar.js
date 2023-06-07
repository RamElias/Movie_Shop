import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import logo from './images/tmdb-logo.png';

const Navbar = () => {
    const [isNavbarOpen, setNavbarOpen] = useState(false);

    const toggleNavbar = () => {
        setNavbarOpen(!isNavbarOpen);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#e3f2fd' }}>
            <div className="container">
                <div className="navbar-brand">
                    <Link to="/">
                        <img src={logo} alt="Navbar Icon" className="navbar-logo" />
                    </Link>
                </div>

                <button className="navbar-toggler" type="button" onClick={toggleNavbar}>
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className={`navbar-collapse ${isNavbarOpen ? 'show' : ''}`}>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                <span style={{ fontSize: '30px' }}>Search</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/cart">
                                <span style={{ fontSize: '30px' }}>Cart</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/checkout">
                                <span style={{ fontSize: '30px' }}>Checkout</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );

};

export default Navbar;
