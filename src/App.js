import React, { useEffect, useState } from "react";
import Tmdb from "./Tmdb";
import ConjuntoFilmes from "./components/ConjuntoFilmes";
import "./App.css";
import FilmeDestaque from "./components/FilmeDestaque";
import Header from "./components/Header.jsx";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    const [movieList, setMovieList] = useState([]);
    const [DestaqueDados, setDestaqueDados] = useState(null);
    const [blackHeader, setBlackHeader] = useState(false)

    useEffect(() => {
        const carregarTudo = async () => {

            let list = await Tmdb.getHomeList();
            // Ele ta pegandos as listas de filmes e depois mudará o estado(MovieList)
            setMovieList(list);

            // Pegando o filme em destaque (Pegando filmes dos originais da neftlix)
            let originais = list.filter(item => item.slug ==='originals')

            // retorna o menor número inteiro e multiplica ele pelo tamanho da minha lista
            let filmeAleatorio = Math.floor(Math.random() * (originais[0].items.results.length - 1));
            let filmeEscolhido = originais[0].items.results[filmeAleatorio]
            let destaqueInfo = await Tmdb.getMovieInfo(filmeEscolhido.id, 'tv');
            setDestaqueDados(destaqueInfo)
        };

        carregarTudo();
    }, []);

    // Adicionando efeito quando escrolar o mouse
    useEffect(() => {
        const scrollListener = () => {
            if(window.scrollY > 10) {
                setBlackHeader(true)
            } else {
                setBlackHeader(false)
            }
        }

        window.addEventListener('scroll', scrollListener)

        return(() => {
            window.removeEventListener('scroll', scrollListener)
        })

    }, [])

    return (
        <div className="page">
            <Header black={blackHeader}/>

            {/* Quando os dados do filme vier para a tela, criaremos ele */}
            {DestaqueDados && <FilmeDestaque item={DestaqueDados}/>}

            <section className="lists">
                {movieList.map((item, key) => (
                    <ConjuntoFilmes
                        key={key}
                        title={item.title}
                        items={item.items}
                    />
                ))}
            </section>
            <footer>
                Feito com <span role="img" aria-label="coração">♥</span> por João Gabriel<br/>
                Direito de imagens pela Netflix<br/>
                Dados pegos do site Themoviedb.org
            </footer>

            {/* Quando nao carregar os filmes, ele ira ativar o loading */}
            {/* {movieList.length <= 0 &&
            <div className="loading">
                <img src="https://www.rchandru.com/images/portfolio/loading.gif" alt="carregando"/>
            </div>
            } */}
        </div>

    );
};
