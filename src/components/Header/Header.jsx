import React from 'react';
import classes from './Header.module.css';
import {NavLink} from "react-router-dom";


const Header = (props) => {
    return <header className={classes.header}>
        <img src="https://image.shutterstock.com/image-vector/vector-design-elements-your-company-260nw-709133980.jpg"/>
        <div className={classes.loginBlock}>
         {props.isAuth ? props.login :  <NavLink to={'/login'}>Login</NavLink>}
        </div>
    </header>
};


export default Header;