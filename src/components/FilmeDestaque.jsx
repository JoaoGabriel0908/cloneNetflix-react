import React from "react";
import "./FilmeDestaque.css";

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ item }) => {
    let ultimoAno = new Date(item.first_air_date);
    let generos = [];
    for (let i in item.genres) {
        generos.push(item.genres[i].name);
    }

    // Diminuindo tamanho da descricao do filme
    let descricao = item.overview;
    if(descricao.length > 200){
        descricao = descricao.substring(0, 200)+'...'
    }

    return (
        <section
            className="destaque"
            style={{
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`,
            }}
        >
            <div className="destaque--vertical">
                <div className="destaque--horizontal">
                    <div className="destaque--nome">{item.original_name}</div>
                    <div className="destaque--info">
                        <div className="destaque--pontos">
                            {item.vote_average} Pontos
                        </div>
                        <div className="destaque--ano">
                            {ultimoAno.getFullYear()}
                        </div>
                        <div className="destaque--temporadas">
                            {item.number_of_seasons} Temporada
                            {item.number_of_seasons !== 1 ? "s" : ""}
                        </div>
                    </div>
                    <div className="destaque--descricao">{descricao}</div>
                    <div className="destaque--botoes">
                        <a className="destaque--botaoAssistir" href={`/watch/${item.id}`}>► Assistir</a>
                        <a className="destaque--botaoLista" href={`/watch/${item.id}`}>+ Minha Lista</a>
                    </div>
                    <div className="destaque--generos">
                        <strong>Genêros: </strong>{generos.join(", ")}
                    </div>
                </div>
            </div>
        </section>
    );
};
