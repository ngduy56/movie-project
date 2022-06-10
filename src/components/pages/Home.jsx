import React from 'react';
import HeroSlide from '../heroSlide/HeroSlide';
import MovieList from '../movieList/MovieList';
import Viewers from '../viewers/Viewers';

import { Link } from 'react-router-dom';
import { OutlineButton } from '../button/Button';

import { category, movieType} from '../../apis/tmdbApi';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import {selectUserId } from '../../store/userReducer';
import { useSelector } from 'react-redux';

function Home() {
    
    // const userId = useSelector(selectUserId);
    // console.log(userId)
    return (
        <>
            <Header showNav={true}/>
            <div>
                <HeroSlide />
                <Viewers />
                <div className="container-small">
                    <div className="section mb-3">
                        <div className="section__header mb-1">
                            <h2>Trending Movies</h2>
                            <Link to="/movie">
                                <OutlineButton className="small">
                                    View more
                                </OutlineButton>
                            </Link>
                        </div>
                        <MovieList category={category.movie} type={movieType.popular} />
                    </div>

                    <div className="section mb-3">
                        <div className="section__header mb-1">
                            <h2>Top Rated Movies</h2>
                            <Link to="/movie">
                                <OutlineButton className="small">
                                    View more
                                </OutlineButton>
                            </Link>
                        </div>
                        <MovieList category={category.movie} type={movieType.top_rated} />
                    </div>

                    <div className="section mb-3">
                        <div className="section__header mb-1">
                            <h2>Trending TV</h2>
                            <Link to="/tv">
                                <OutlineButton className="small">
                                    View more
                                </OutlineButton>
                            </Link>
                        </div>
                        <MovieList category={category.tv} type={movieType.popular} />
                    </div>

                    <div className="section mb-3">
                        <div className="section__header mb-1">
                            <h2>Top Rated TV</h2>
                            <Link to="/tv">
                                <OutlineButton className="small">
                                    View more
                                </OutlineButton>
                            </Link>
                        </div>
                        <MovieList category={category.tv} type={movieType.top_rated} />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Home;