import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'

const Header = () => {
    return (
        <nav className='w-50 mx-auto'>
            <Link to="/">home</Link>
            <Link to="/login">login</Link>
            <Link to="/register">register</Link>
            <Link to="/register-bs">registerBS</Link>
        </nav>
    );
};

export default Header;