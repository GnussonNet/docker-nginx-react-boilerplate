// Imports
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Scrollspy from 'react-scrollspy';
import { Menu, X } from 'react-feather';
import Logo from '../../assets/svgs/logo.svg';

// Styles
import styles from './Header.module.scss';

function Header() {
  // Used for detecting url changes and removing the #anchor
  const location = useLocation();

  // Open, close state for the mobile menu
  const [menuOpen, setMenuOpen] = useState(false);

  // Size of the current window is used to know if the menu should be accessible or not
  const [size, setSize] = useState({
    width: '',
    height: '',
  });

  // Update the size state to current window size
  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close menu if screen size larger then 992px (md breakpoint) or the user clicks on a link or close button
  useEffect(() => {
    if (size.width > 992 && menuOpen) {
      setMenuOpen(false);
    }
  }, [size.width, menuOpen]);

  // Toggle menu (if open: close; if closed: open)
  const menuToggleHandler = () => {
    setMenuOpen(false);
  };

  // Remove #anchor from URL
  useEffect(() => {
    window.history.replaceState(null, '', '/');
  }, [location]);

  return (
    // Animates from the top with opacity
    <motion.header initial="hidden" animate="visible" variants={{ visible: { opacity: 1, translateY: 0, transition: { delay: 0.3 } }, hidden: { opacity: 0, translateY: -64 } }} className={styles.header}>
      <div className={styles.header__content}>
        {/* Logo with text */}
        <Link to="/" replace={true} className={styles.header__content__logo}>
          <img src={Logo} alt="" />
          <p>Gnusson.net</p>
        </Link>

        <nav className={`${styles.header__content__nav} ${menuOpen && size.width < 992 ? styles.isMenu : ''}`}>
          {/* Scrollspy (ul) is used for highlighting the current page in navigation  */}
          <Scrollspy items={['home', 'about', 'services', 'portfolio', 'contact']} offset={-80} currentClassName={styles.active}>
            <li>
              <Link to="/" onClick={menuToggleHandler} replace={true}>
                Home
              </Link>
            </li>
            <li>
              <Link to="#about" onClick={menuToggleHandler} replace={true}>
                About
              </Link>
            </li>
            <li>
              <Link to="#services" onClick={menuToggleHandler} replace={true}>
                Service
              </Link>
            </li>
            <li>
              <Link to="#portfolio" onClick={menuToggleHandler} replace={true}>
                Portfolio
              </Link>
            </li>
          </Scrollspy>

          {/* Contact button link */}
          <Link to="#contact" className={styles.header__content__nav__button} onClick={menuToggleHandler} replace={true}>
            Contact Me
          </Link>
        </nav>

        {/* Menu- or close button only visible on small screens  */}
        <div className={styles.header__content__toggle}>{!menuOpen ? <Menu onClick={() => setMenuOpen(true)} /> : <X onClick={() => setMenuOpen(false)} />}</div>
      </div>
    </motion.header>
  );
}

export default Header;
