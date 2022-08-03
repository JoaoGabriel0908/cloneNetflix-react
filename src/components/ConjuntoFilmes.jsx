import React, {useState} from "react";
import "./ConjuntoFilmes.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {AiOutlineArrowLeft, AiOutlineArrowRight} from 'react-icons/ai'

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ title, items }) => {

    const[scrollX, setScrollX] = useState(-400)

    const handleLeftArrow = () => {
        let x = scrollX + Math.round(window.innerWidth /2 )
        if(x > 0){
            x=0;
        } 
        setScrollX(x)
    }

    const handleRightArrow = () => {
        let x = scrollX - Math.round(window.innerWidth /2 )
        let larguraLista = items.results.length * 150
        if(window.innerWidth - larguraLista > x){
            x = (window.innerWidth - larguraLista) - 60;
        }
        setScrollX(x)
    }

    return (
        <div className="conjuntoFilmes">
            <h2>{title}</h2>

            <div className="movieLeft" onClick={handleLeftArrow}>
                <AiOutlineArrowLeft icon="fa-solid fa-angle-left" style={{fontSize: 50}}/>
            </div>

            <div className="movieRight" onClick={handleRightArrow}>
                <AiOutlineArrowRight icon="fa-solid fa-angle-right" style={{fontSize: 50}}/>
            </div>

            <div className="conjuntoFilmes--listarea">
                <div className="conjuntoFilmes--list" style={{
                    marginLeft: scrollX,
                    width: items.results.length * 150
                }}>
                    {items.results.length > 0 && items.results.map((item, key) => (
                        <div key={key} className="conjuntoFilmes--item">
                            <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.original_title}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
