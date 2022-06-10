import React from 'react';
import { useParams } from 'react-router-dom';
import { category as cate } from '../../apis/tmdbApi';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import MovieGrid from '../movieGrid/MovieGrid';
import PageHeader from '../pageHeader/PageHeader';

function Catalog() {
    const { category } = useParams();
    let child;
    if(category === cate.movie) { 
        child = 'Movies';
    }
    else if(category === cate.tv) { 
        child = 'TV Series';
    }
    else if(category === cate.watchlist) { 
        child = 'WatchList';
    }
    else if(category === cate.original) { 
        child = 'Originals';
    }
    return (
        <>
            <Header showNav />
            <PageHeader>
                {child}
            </PageHeader>
            <div className="container">
                <div className="section mb-3">
                    <MovieGrid category={category} />
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Catalog;