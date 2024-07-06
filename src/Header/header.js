import React, { useEffect } from 'react';
import logo from '../assets/images/logo.svg';
import  styles from './header.module.css';
function Header(){
      return (
        <header className={styles.header}>   
            <img src={logo} alt="" />
        </header>
      );
}
export default Header;