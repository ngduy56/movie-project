import React, { useState } from 'react';
import backgroundOne from "../../assets/images/cta-logo-one.svg";
import backgroundTwo from "../../assets/images/cta-logo-two.png";
import bg from "../../assets/images/login-background.jpg";
import AuthModal from '../authModal/AuthModal';
import Header from '../header/Header';
import './welcome.scss';

function Login(props) {
    const authToken = false;
    const [showModal, setShowModal] = useState(false);
    const [isSignUp, setIsSignUp] = useState(true);
    const handleClick = (e) => {
        e.preventDefault();
        setShowModal(true);
        setIsSignUp(true);
    }
    return (
        <div>
        <section className='section-container'>
            <Header showNav ={false} authToken={authToken} setShowModal={setShowModal} setIsSignUp={setIsSignUp}/>
            <div className='wrap-content'>
                <div className='wrap-content__block'>
                    <img className='content__logo-one' src={backgroundOne} alt="logo one"/>
                    <button onClick={handleClick} className='content__sign-up'>SIGN UP NOW!</button>
                    <p className ='content__description'>
                        Get Premier Access to Raya and the Last Dragon for an additional fee
                        with a Movies+ subscription. As of 03/26/21, the price of Movies+
                        and The Movies Bundle will increase by $1.
                    </p>
                    <img className='content__logo-two' src={backgroundTwo} alt="logo two"/>
                </div>
                <div className='bg__image' style={{ backgroundImage: `url(${bg})` }}></div>
                {
                    showModal && <AuthModal setShowModal={setShowModal} isSignUp={isSignUp}/>
                }
            </div>
           
        </section>
        </div>
    );
}

export default Login;