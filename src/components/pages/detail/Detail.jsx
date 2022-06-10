import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiConfig from '../../../apis/apiConfig';
import tmdbApi, { category as CATE } from '../../../apis/tmdbApi';
import Button from '../../button/Button';
import Header from '../../header/Header';
import Footer from '../../footer/Footer';
import Modal, { ModalContent } from '../../modal/Modal';
import MovieList from '../../movieList/MovieList';
import CastList from './CastList';
import './detail.scss';
import VideoList from './VideoList';

function Detail() {
    const { category, id } = useParams();
    const [item, setItem] = useState(null);

    useEffect(() => {
        const getDetail = async () => {
            const response = await tmdbApi.getDetail(category, id, { params: {} });
            setItem(response);
            console.log(response)
            window.scrollTo(0, 0);
        }
        getDetail();
    }, [id, category]);
    const setModalActive = async () => {

        const modal = document.getElementById(`modal_${id}`);
        const videos = await tmdbApi.getVideos(category, id);
        let videoSrc;
        if (videos.results.length > 0) {
            if(category === CATE.movie){
                videoSrc = 'https://www.2embed.ru/embed/tmdb/movie?id=' + id;
            }
            else {
                // videoSrc = 'https://www.2embed.ru/embed/tmdb/tv?id=99966&s=1&e=1';
                videoSrc = `https://www.2embed.ru/embed/tmdb/tv?id=${id}&s=1&e=1`;
            }
            modal.querySelector('#video-trailer').setAttribute('src', videoSrc);
        } else {
            modal.querySelector('.modal__content').innerHTML = 'Sorry we got some problem';
        }
        modal.classList.toggle('active');
    }
    return (
        <>
        <Header showNav />
        { item && (
            <>
                <div className="banner" style={{ backgroundImage: `url(${apiConfig.originalImage(item.backdrop_path || item.poster_path)})` }}></div>
                <div className="mb-3 movie-content container">
                    <div className="movie-content__poster">
                        <div className="movie-content__poster__img" style={{ backgroundImage: `url(${apiConfig.originalImage(item.poster_path || item.backdrop_path)})` }}></div>
                    </div>
                    <div className="movie-content__info">
                        <h1 className="title">
                            {item.title || item.name}
                        </h1>
                        <div className="genres">
                            {item.genres && item.genres.slice(0, 5).map((genre, index) => (
                                <span key={index} className="genres__item">{genre.name}</span>
                            ))}
                        </div>
                        <p className="overview">{item.overview}</p>
                        <div className="cast">
                            <div className="section__header">
                                <h2>Casts</h2>
                            </div>
                            <CastList id={item.id} />
                        </div>
                        <div className="container__block">
                            <Button onClick={setModalActive}>
                                Watch now
                            </Button>
                            <img 
                                className = "favourite__img"
                                src="https://firebasestorage.googleapis.com/v0/b/disneyplus-clone-project.appspot.com/o/heart.png?alt=media&token=b136ef3e-1805-4152-a726-b6ae282b789f"
                            /> 
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="section mb-3">
                        <VideoList id={item.id} />
                    </div>
                    <div className="section mb-3">
                        <div className="section__header mb-2">
                            <h2>Similar</h2>
                        </div>
                        <MovieList category={category} id={item.id} type="similar" />
                    </div>
                </div>
                
                {<MovieModal item={item}></MovieModal>}
            </>
        )}
        <Footer />
        </>
    );
}
const MovieModal = (props) => {
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
export default Detail;