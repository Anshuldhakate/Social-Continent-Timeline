
import React from 'react';
import './Navbar.css';
import logo from '../images/SOCON.png';
import messageIcon from '../images/messages.png';
import notificationIcon from '../images/notification.png';

const Navbar = () => {
  return (
    <div className="navbar">
      <img src={logo} alt="SoCon Logo" className="navbar-logo" />
      <div className="navbar-icons">
        <img src={messageIcon} alt="Messages" className="navbar-icon" />
        <img src={notificationIcon} alt="Notifications" className="navbar-icon" />
      </div>
    </div>
  );
};

export default Navbar;
