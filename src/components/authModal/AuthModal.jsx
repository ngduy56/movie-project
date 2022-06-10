import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoginImage from "../../assets/images/login-img.jpg";
import logo from "../../assets/images/logopng3.png";
import { setUserLoginDetails } from '../../store/userReducer';
import './authModal.scss';

function AuthModal(props) {
    const {setShowModal, isSignUp} = props;
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [error, setError] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClick = () => {
        setShowModal(false);
    }
    const setUser = (user) => {
        dispatch(
            setUserLoginDetails({
                userId: user.userId,
                name: user.name,
                email: user.email,
                photo: user.photo,
            })
        )
    }
    const handleSubmit = async (e) => {
        let response = null;
        e.preventDefault();
        try {
            if ((!email || /^\s*$/.test(email)) || (!password || /^\s*$/.test(password))) {
                setError("Email and password are required");
                return;
            }
            else if(isSignUp && password !== confirmPassword){
                setError("Password need to match");
                return;
            }
            else {
                setError("");
                response = await axios.post(`http://localhost:8000/${isSignUp ? 'signup' : 'login'}`, 
                    {email, password}
                );
                const success = response.status === 201;
                const user = response.data;
                setUser(user);
                if(success && isSignUp) {
                    navigate('/onboarding');
                } else {
                    navigate('/home');
                }
            }
        } catch (e) {
            console.log(e.response.data);
            setError(e.response.data);
        }
    }
    return (
            <div className="auth__modal">
                <p className="auth__modal-close" onClick={handleClick}>X</p>
                <div className="auth__modal-img">
                    <img src={LoginImage} alt=""/>
                </div>
                <div className="auth__modal-info">
                    <img src={logo} alt="" />
                    <p>Welcome to The Movies</p>
                    <form onSubmit={handleSubmit}>
                        <input 
                            type="email"
                            id="email"
                            placeholder="Your email"
                            required={true}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input 
                            type="password"
                            id="password"
                            placeholder="Your password"
                            required={true}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {isSignUp &&   
                        <input 
                            type="password"
                            id="repassword"
                            placeholder="Confirm password"
                            required={true}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />}
                    </form>
                    <button type="submit" onClick={handleSubmit} className="auth__modal-register">{isSignUp ? 'Sign Up' : 'Login'}</button>
                    <p className="error">{error}</p>
                </div> 
            </div>
    );
}

export default AuthModal;