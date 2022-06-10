import React from 'react';
import './footer.scss';
import { Link } from 'react-router-dom';

import bg from '../../assets/images/footer-bg.jpg';
import logo from '../../assets/images/logopng3.png';

function Footer() {
    return (
        <div className="footer" style={{ backgroundImage: `url(${bg})` }}>
            <div className="footer__content container">
                <div className="footer__content__logo">
                    <div className="logo">
                        <Link to="/home">
                            <img src={logo} alt="" />
                        </Link>
                    </div>
                </div>
                <div className="footer__content__menu">
                    <div className="footer__content__item">
                        <Link to="/">Home</Link>
                        <Link to="/">Contact us</Link>
                        <Link to="/">Services</Link>
                        <Link to="/">About us</Link>
                    </div>
                    <div className="footer__content__item">
                        <Link to="/">Live</Link>
                        <Link to="/">FAQ</Link>
                        <Link to="/">Premium</Link>
                        <Link to="/">Pravacy Policy</Link>
                    </div>

                    <div className="footer__content__item">
                        <Link to="/">You should watch</Link>
                        <Link to="/">Recent release</Link>
                        <Link to="/">Top movies</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;