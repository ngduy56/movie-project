import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import tmdbApi, { category } from '../../apis/tmdbApi';
import MovieCard from '../movieCard/MovieCard';
import './movieList.scss';
import axios from 'axios';
import { useParams } from 'react-router-dom';

MovieList.propTypes = {
    category: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
};

function MovieList(props) {

    const [itemMovies, setItemMovies] = useState([]);
    const params = useParams();
    console.log(params);
    let detailId = props.id;
    let data_movies = null;

    useEffect(() => {
        const getListMovies = async () => {
            let response = null;
            const params = {};
            if (props.type !== 'similar') {
                switch (props.category) {
                    case category.movie:
                        response = await tmdbApi.getMovieList(props.type, { params })
                        break;
                    default: response = await tmdbApi.getTvList(props.type, { params })
                }
                data_movies = response.results;
            }
            else if(detailId !== params.id && props.type === 'similar') {
                console.log(detailId)
                response = await axios.post("http://localhost:8000/similar", {detailId});
                if(response.data)
                    data_movies = response.data;
            }
            setItemMovies(data_movies);
            console.log(itemMovies);
        }
        getListMovies();
    }, [detailId]);

    return (
        <div className="movie-list">
            <Swiper
                grabCursor={true}
                spaceBetween={10}
                slidesPerView={'auto'}
            >
                {itemMovies.map((itemMovie, index) => (
                    <SwiperSlide key={index}>
                        <MovieCard item={itemMovie} category={props.category} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}


export default MovieList;