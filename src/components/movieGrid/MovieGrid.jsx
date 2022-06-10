import React, { useCallback, useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import tmdbApi, { category, movieType, tvType } from '../../apis/tmdbApi';
import Button, { OutlineButton } from '../button/Button';
import Input from '../input/Input';
import MovieCard from '../movieCard/MovieCard';
import './movieGrid.scss';


function MovieGrid(props) {
    const [itemMovies, setItemMovies] = useState([]);
    const [page, setPage] = useState(1);

    const [totalPage, setTotalPage] = useState(0);
    const { keyword } = useParams();

    useEffect(() => {
        const getListMovie = async () => {
            let response = null;
            if (keyword === undefined) {
                const params = {};
                switch (props.category) {
                    case category.movie:
                        response = await tmdbApi.getMovieList(movieType.upcoming, { params })
                        break;
                    case category.tv:
                        response = await tmdbApi.getTvList(tvType.popular, { params })
                        break;
                    case category.watchlist: 
                        response = await tmdbApi.getMovieList(movieType.popular, { params })
                        break;
                    case category.original: 
                        response = await tmdbApi.getMovieList(movieType.top_rated, { params })
                        break;
                    default:
                        throw new Error();
                }
            }
            else {
                const params = {
                    query: keyword,
                }
                response = await tmdbApi.search(props.category, { params })
            }
            setItemMovies(response.results);
            setTotalPage(response.total_pages);
        }
        getListMovie();

    }, [props.category, keyword]);


    const handleLoadMore = async () => {
        let response = null;
        if (keyword === undefined) {
            const params = {
                page: page + 1
            };
            switch (props.category) {
                case category.movie:
                    response = await tmdbApi.getMovieList(movieType.upcoming, { params });
                    break;
                case category.watchlist: 
                    response = await tmdbApi.getMovieList(movieType.popular, { params })
                    break;
                case category.original: 
                    response = await tmdbApi.getMovieList(movieType.top_rated, { params })
                    break;
                default:
                    response = await tmdbApi.getTvList(tvType.popular, { params });
            }
        } else {
            const params = {
                page: page + 1,
                query: keyword
            }
            response = await tmdbApi.search(props.category, { params });
        }
        setItemMovies([...itemMovies, ...response.results]);
        setPage(page + 1);
    }

    return (
        <>
            <div className="mb-3">
                <MovieSearch category={props.category} keyword={keyword} />
            </div>
            <div className="movie-grid">
                {itemMovies.map((item, index) => (
                    <MovieCard key={index} item={item} category={props.category} />
                ))}
            </div>
            {page < totalPage ? (
                <div className="movie-grid__next">
                    <OutlineButton
                        className="small"
                        onClick={handleLoadMore}
                    >
                        Load more
                    </OutlineButton>
                </div>
                ) : null}
        </>

    );
}

function MovieSearch(props) {

    const [keyword, setKeyword] = useState(props.keyword ? props.keyword : '');
    const navigate = useNavigate();
    const typeKeyRef = useRef('movie');
    let typeKey;

    const goToSearch = useCallback(() => {
        if (keyword.trim().length > 0) {
            if(category[props.category] === 'watchlist')
            {
                typeKey = typeKeyRef.current;
                navigate(`/${category[typeKey]}/search/${keyword}`);

            }
            else if(category[props.category] === 'original')
            {
                typeKey = typeKeyRef.current;
                navigate(`/${category[typeKey]}/search/${keyword}`);
            }
            navigate(`/${category[props.category]}/search/${keyword}`);
        }

    }, [keyword, props.category, navigate])

    useEffect(() => {
        const enterEvent = (e) => {
            e.preventDefault();
            if (e.keyCode === 13) {
                goToSearch();
            }
        }
        document.addEventListener('keyup', enterEvent);
        return () => {
            document.removeEventListener('keyup', enterEvent);
        };
    }, [keyword, goToSearch]);
    return (
        <div className="movie-search">
            <Input
                type="text"
                placeholder="Search"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />
            <Button className="small" onClick={goToSearch}>Search</Button>

        </div>
    )
}

export default MovieGrid;