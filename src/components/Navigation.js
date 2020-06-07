import React from 'react';
 
import { NavLink } from 'react-router-dom';
 
const Navigation = () => {
    return (
       <div>
          <NavLink to="/">Главная</NavLink>        
          <NavLink to="/about">О сервисе</NavLink>
          {/* <NavLink to="/contact">Contact</NavLink> */}
       </div>
    );
}
 
export default Navigation;