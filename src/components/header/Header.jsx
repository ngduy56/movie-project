import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logopng3.png';
import avatar from '../../assets/images/avatar.jpg';
import {
    selectUserName, selectUserId,
    selectUserPhoto, setSignOutState, setUserLoginDetails
} from '../../store/userReducer';

import axios from "axios";
import './header.scss';

const headerNavs = [
    {
        display: 'HOME',
        path: '/home',
        icon:'https://firebasestorage.googleapis.com/v0/b/disneyplus-clone-project.appspot.com/o/home-icon.svg?alt=media&token=be1c5c04-4b54-4c69-b58f-3bc2e65d6e29',
    },
    {
        display: 'MOVIES',
        path: '/movie',
        icon:'https://firebasestorage.googleapis.com/v0/b/disneyplus-clone-project.appspot.com/o/movie-icon.svg?alt=media&token=42be1408-b87d-4690-8839-eae89f05bab4'
    },
    {
        display: 'TV SERIES',
        path: '/tv',
        icon:'https://firebasestorage.googleapis.com/v0/b/disneyplus-clone-project.appspot.com/o/series-icon.svg?alt=media&token=030f6067-83a3-4513-a4a6-c233418793a7'
    },
    {
        display: 'WATCHLIST',
        path: '/watchlist',
        icon:'https://firebasestorage.googleapis.com/v0/b/disneyplus-clone-project.appspot.com/o/watchlist-icon.svg?alt=media&token=8d10e17d-24b3-428f-8685-9c250ac11b42',
    },
    {
        display: 'ORIGINALS',
        path: '/original',
        icon:'https://firebasestorage.googleapis.com/v0/b/disneyplus-clone-project.appspot.com/o/original-icon.svg?alt=media&token=b2a82f3f-ac8b-4ade-bcd5-d633233d837e'
    },
    {
        display: 'FAVOURITE',
        path: '/favourite',
        icon:'https://firebasestorage.googleapis.com/v0/b/disneyplus-clone-project.appspot.com/o/heart.png?alt=media&token=b136ef3e-1805-4152-a726-b6ae282b789f'
    }
];
function Header(props) {
    const {showNav, authToken, setShowModal, setIsSignUp} = props;
    const pathname = useLocation();
    const headerRef = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const userName = useSelector(selectUserName);
    const userPhoto = useSelector(selectUserPhoto);
    const userId = useSelector(selectUserId);

    const active = headerNavs.findIndex(e => e.path === pathname.state);
    // to top when change path
     useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    // header shrink
    useEffect(() => {
        const shrinkHeader = () => {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                headerRef.current.classList.add('shrink');
            } else {
                headerRef.current.classList.remove('shrink');
            }
        }
        window.addEventListener('scroll', shrinkHeader);
        return () => {
            window.removeEventListener('scroll', shrinkHeader);
        };
    }, []);
    //setuser when on change
    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await axios.get("http://localhost:8000/user", { 
                    params: {userId},
                })
                const user = response.data;
                if(user){
                    setUser(user);
                } else {
                    navigate('/');
                }
            } catch (error) {
                console.log(error)
            }
        }
        getUser();
    }, []);
    
    const setUser = (user) => {
        dispatch(
            setUserLoginDetails({
                userId: user.user_id,
                name: user.name,
                email: user.email,
                photo: user.photo,
            })
        )
    }
    const handleAuth = () => {
        if(!userId) {
            setShowModal(true);
            setIsSignUp(false);
        }
        else {
            dispatch(setSignOutState());
            navigate('/');
        }
    }

    return (
        <div ref={headerRef} className="header">
            <div className="header__wrap container-small">

                <div className="logo">
                    <Link to="/home">
                         <img src={logo} alt="Movies+" /> 
                    </Link>

                </div>
                    { !userId && ( <a className='login-user' onClick={handleAuth}>Login</a> )}
                    { showNav && userId &&
                        (<> 
                            <div className="header__nav">
                                {headerNavs.map((item, index) => (
                                    <NavLink 
                                        key={index} className={`header__nav-link ${index === active ? 'active' : ''}`}
                                        to={item.path} state={item.path}
                                    >
                                        <img src ={item.icon}/>
                                        <span>{item.display}</span>
                                    </NavLink>
                                ))}
                            </div>
                            {/* log out block */}
                            <a className='logout-user'>
                                { userPhoto ? <img src={userPhoto} alt={userName} /> : <img src={avatar} alt={userName} /> }
                                <div className='drop-down'>
                                    <span onClick={() => navigate('/onboarding')}>My Account</span>
                                    <span onClick={handleAuth}>Log out</span>
                                </div>
                            </a>
                        </>)
                    }

                {
                    // (!userId) ? ( <a className='login-user' onClick={handleAuth}>Login</a> ) : 
                    // (<> 
                    //     <div className="header__nav">
                    //         {
                    //             headerNavs.map((item, index) => (
                    //                 <NavLink 
                    //                     key={index} className={`header__nav-link ${index === active ? 'active' : ''}`}
                    //                     to={item.path} state={item.path}
                    //                 >
                    //                     <img src ={item.icon}/>
                    //                     <span>{item.display}</span>
                    //                 </NavLink>
                    //             ))
                    //         }
                    //     </div>
                    //     {/* log out block */}
                    //     <a className='logout-user'>
                    //         { userPhoto && <img src={userPhoto} alt={userName} /> }
                    //         <div className='drop-down'>
                    //             <span onClick={handleAuth}>Log out</span>
                    //         </div>
                    //     </a>
                    // </>)
                }
            </div>

        </div>
    );
}
export default Header;