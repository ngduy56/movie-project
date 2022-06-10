import React, { useEffect, useState, useRef } from 'react';
import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate } from 'react-router-dom';

import Button, { OutlineButton } from '../button/Button';
import Modal, { ModalContent } from '../modal/Modal';
import tmdbApi, { category, movieType } from '../../apis/tmdbApi';
import apiConfig from '../../apis/apiConfig';


import './heroSlide.scss';

function HeroSlide() {
    SwiperCore.use([Autoplay]);

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const getMovies = async () => {
            const params = { page: 1 }
            try {
                const response = await tmdbApi.getMovieList(movieType.popular, { params });
                setMovies(response.results.slice(0, 5));
            } catch {
                console.log('error');
            }
        }
        getMovies();
    }, []);
    return (
        <div className="hero-slide">
            <Swiper
                modules={[Autoplay]}
                grabCursor={true}
                spaceBetween={0}
                slidesPerView={1}
            >
                {movies.map((item, index) => (
                    <SwiperSlide key={index}>
                        {({ isActive }) => (
                            <HeroSlideItem item={item} className={`${isActive ? 'active' : ''}`} />
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>

            {movies.map((item, index) => (
                <TrailerModal key={index} item={item}>

                </TrailerModal>
            ))}
        </div>
    );
}
const HeroSlideItem = props => {
    let navigate = useNavigate();
    const item = props.item;
    const background = apiConfig.originalImage
        (item.backdrop_path ? item.backdrop_path : item.poster_path);

    const setModalActive = async () => {
        const modal = document.getElementById(`modal_${item.id}`);

        const videos = await tmdbApi.getVideos(category.movie, item.id);
        console.log(videos);

        if (videos.results.length > 0) {
            const videoSrc = 'https://www.youtube.com/embed/' + videos.results[0].key;
            modal.querySelector('#video-trailer').setAttribute('src', videoSrc);
        } else {
            modal.querySelector('.modal__content').innerHTML = 'No trailer';
        }

        modal.classList.toggle('active');
    }
    return (
        <div
            className={`hero-slide__item ${props.className}`}
            style={{ backgroundImage: `url(${background})` }}
        >
            <div className="hero-slide__item__content container">
                <div className="hero-slide__item__content__info">
                    <h2 className="title">{item.title}</h2>
                    <div className="overview">{item.overview}</div>
                    <div className="btns">
                        <Button onClick={() => navigate('/movie/' + item.id)}>Watch now</Button>
                        <OutlineButton onClick={setModalActive}>Watch trailer</OutlineButton>
                    </div>
                </div>
                <div className="hero-slide__item__content__poster">
                    <img src={apiConfig.w500Image(item.poster_path)} alt="" />
                </div>
            </div>
        </div>
    )
}
const TrailerModal = props => {
    const item = props.item;

    const iframeRef = useRef();

    const onClose = () => iframeRef.current.setAttribute('src', '');

    return (
        <Modal active={false} id={`modal_${item.id}`}>
            <ModalContent onClose={onClose}>
                <iframe id="video-trailer" ref={iframeRef} allow='fullscreen' width="100%" height="100%" title="trailer"></iframe>
            </ModalContent>
        </Modal>
    )
}
export default HeroSlide;