import React from 'react';
import { Link } from 'react-router-dom';
import apiConfig from '../../apis/apiConfig';
import { category } from '../../apis/tmdbApi';
import Button from '../button/Button';
import './movieCard.scss';
import loginBackground from '../../assets/images/login-background.jpg';


function MovieCard(props) {
    const item = props.item;
    let cate = category[props.category];
    let bg;
    if(cate ==='watchlist' || cate ==='original'){
        cate = 'movie';
    }
    const link = '/' + cate + '/' + item.id;
    if(item.poster_path == null && item.backdrop_path == null){
        bg = loginBackground;
    }
    else bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);
    
    return (
        <Link to={link}>
            <div className="movie-card" style={{ backgroundImage: `url(${bg})` }}>
                <Button>
                    <i className="bx bx-play"></i>
                </Button>
            </div>
            <h3 className="movie-title">{item.title || item.name}</h3>
        </Link>
    );
}

export default MovieCard;