import React from 'react';
import { Link } from 'react-router-dom';
import viewerDisney from '../../assets/images/viewers-disney.png';
import viewerMarvel from '../../assets/images/viewers-marvel.png';
import viewerNational from '../../assets/images/viewers-national.png';
import viewerPixar from '../../assets/images/viewers-pixar.png';
import viewerStarwar from '../../assets/images/viewers-starwars.png';
import disneyVideo from '../../assets/videos/disney.mp4';
import marvelVideo from '../../assets/videos/marvel.mp4';
import nationalVideo from '../../assets/videos/national.mp4';
import pixarVideo from '../../assets/videos/pixar.mp4';
import starwarVideo from '../../assets/videos/starwar.mp4';
import './viewers.scss';


const viewers = [
    {
        viewer: viewerDisney,
        video: disneyVideo,
        title: 'disney',
    },
    {
        viewer: viewerPixar,
        video: pixarVideo,
        title: 'pixar',

    },
    {
        viewer: viewerMarvel,
        video: marvelVideo,
        title: 'marvel',
    },
    {
        viewer: viewerStarwar,
        video: starwarVideo,
        title: 'starwar',
    },
    {
        viewer: viewerNational,
        video: nationalVideo,
        title: 'national',
        
    }
]

function Viewers(props) {
    // const link = '/movie/search/disney';
    return (
        <div className="container-small content">
            {
                viewers.map((item,index) => (
                <Link to={`/movie/search/${item.title}`} key={index}>
                    <div className="content__item">
                        <img src={item.viewer} alt="" />
                        <video autoPlay={true} muted loop={true} playsInline={true}>
                            <source src={item.video} type="video/mp4" />
                        </video>
                    </div>
                </Link>
                ))
            }
            {/* <Link to={'/movie/search/disney'}>
                <div className="content__item">
                    <img src={viewerDisney} alt="" />
                    <video autoPlay={true} muted loop={true} playsInline={true}>
                        <source src={disneyVideo} type="video/mp4" />
                    </video>
                </div>
            </Link>
            <Link to={'/movie/search/pixar'}>
                <div className="content__item">
                    <img src={viewerPixar} alt="" />
                    <video autoPlay={true} muted loop={true} playsInline={true}>
                        <source src={pixarVideo} type="video/mp4" />
                    </video>
                </div>
            </Link>
            <Link to={'/movie/search/marvel'}>
                <div className="content__item">
                    <img src={viewerMarvel} alt="" />
                    <video autoPlay={true} muted loop={true} playsInline={true}>
                        <source src={marvelVideo} type="video/mp4" />
                    </video>
                </div>
            </Link>
             <Link to={'/movie/search/starwar'}>
                <div className="content__item">
                    <img src={viewerStarwar} alt="" />
                    <video autoPlay={true} muted loop={true} playsInline={true}>
                        <source src={starwarVideo} type="video/mp4" />
                    </video>
                </div>
            </Link>
            <Link to={'/movie/search/national'}>
                <div className="content__item">
                    <img src={viewerNational} alt="" />
                    <video autoPlay={true} muted loop={true} playsInline={true}>
                        <source src={nationalVideo} type="video/mp4" />
                    </video>
                </div>
            </Link> */}
            {/* <div className="content__item">
                <img src={viewerPixar} alt="" />
                <video autoPlay={true} muted loop={true} playsInline={true}>
                    <source src={pixarVideo} type="video/mp4" />
                </video>
            </div>
            <div className="content__item">
                <img src={viewerMarvel} alt="" />
                <video autoPlay={true} muted loop={true} playsInline={true}>
                    <source src={marvelVideo} type="video/mp4" />
                </video>
            </div>
            <div className="content__item">
                <img src={viewerStarwar} alt="" />
                <video autoPlay={true} muted loop={true} playsInline={true}>
                    <source src={starwarVideo} type="video/mp4" />
                </video>
            </div>
            <div className="content__item">
                <img src={viewerNational} alt="" />
                <video autoPlay={true} muted loop={true} playsInline={true}>
                    <source src={nationalVideo} type="video/mp4" />
                </video>
            </div> */}
        </div>
    );
}

export default Viewers;