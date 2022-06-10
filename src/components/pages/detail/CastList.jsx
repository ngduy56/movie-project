import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import tmdbApi from '../../../apis/tmdbApi';
import apiConfig from '../../../apis/apiConfig';



function CartList(props) {
    const { category } = useParams();

    const [casts, setCasts] = useState([]);

    useEffect(() => {
        const getCastList = async () => {
            const respone = await tmdbApi.credits(category, props.id);
            setCasts(respone.cast.slice(0, 5));
        }
        getCastList();
    }, [category, props.id]);
    
    return (
        <div className="casts">
            {casts.map((item, index) => (
                <div className="casts__item" key={index}>
                    <div
                        className="casts__item__img"
                        style={{ backgroundImage: `url(${apiConfig.w500Image(item.profile_path)})` }}
                    >
                    </div>
                    <p className="casts__item__name">{item.name}</p>
                </div>
            ))}
        </div>
    );
}

export default CartList;