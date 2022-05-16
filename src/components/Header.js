import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../images/SpaceX-Logo.svg';
import './Header.css';


const Header = () => (
  <header>
    <div className="logo-div">
      <Logo />
    </div>
    <div className="route-div">
      <Link to="/"><p>MISSIONS</p></Link>
      <Link to="/about"><p>ABOUT</p></Link>

    </div>
  </header>
);

export default Header;
