import React from 'react';
import './Navigation.css';
import { NavLink } from 'react-router-dom';
 
const Navigation = () => {
    return (
       <div className = "Nav-text">
          <b className = "Nav-text"><NavLink to="/">Главная</NavLink></b>
         <span className = "Nav-text"><NavLink to="/about">О сервисе</NavLink> </span>
          {/* <NavLink to="/contact">Contact</NavLink> */}
       </div>
    );
}
 
export default Navigation;