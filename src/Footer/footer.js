import React, { useEffect } from 'react';
import styles from './footer.module.css';
function Footer(){
      return (
       <footer>
          <p className={styles.copyright}>Copyright 2024 Noventiq | Powered by Noventiq</p>
       </footer>
      );
}
export default Footer;