import React, { useState, useEffect, useRef } from 'react';

import { useParams } from 'react-router-dom';

import tmdbApi from '../../../apis/tmdbApi';
const VideoList = props => {
    const { id } = props;

    const { category } = useParams();
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const getVideos = async () => {
            const res = await tmdbApi.getVideos(category, id);
            setVideos(res.results.slice(0, 5));
        }
        getVideos();
    }, [category, id]);

    return (
        <>
            {videos.map((item, index) => (
                <Video key={index} item={item} />
            ))}
        </>
    );
}
const Video = props => {
    const item = props.item;
    const iframeRef = useRef();

    useEffect(() => {
        const height = iframeRef.current.offsetWidth * 9 / 16 + 'px';
        iframeRef.current.setAttribute('height', height);
    }, [])
    return (
        <div className="video">
            <div className="video__title">
                <h2>{item.name}</h2>
            </div>
            <iframe
                ref={iframeRef}
                width="100%"
                title="video"
                src={`https://www.youtube.com/embed/${item.key}`}>
            </iframe>
        </div>
    )
}
export default VideoList;