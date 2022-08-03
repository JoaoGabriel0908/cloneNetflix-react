const API_KEY = '81f72cd7de2cd731ddef95ea54a80ec5';
const API_BASE = 'https://api.themoviedb.org/3';

// Pegar Listas:
// Originais
// Recomendados (trending)
// Em alta(top rated)
// Terror
// Romance
// Documentários

const basicFetch = async(endpoint) => {
    const requisicao = await fetch (`${API_BASE}${endpoint}`);
    const json = await requisicao.json();
    return json;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getHomeList: async() => {
        return[
            {
                slug: 'originals',
                title: 'Originais da Netflix',
                // Trazendo filmes da NetFlix
                items: await basicFetch(`/discover/tv?with_network=213&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'trending',
                title: 'Recomendados para você',
                items: await basicFetch(`/trending/all/week?language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'toprated',
                title: 'Em Alta',
                items: await basicFetch(`/movie/top_rated/?language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'action',
                title: 'Ação',
                items: await basicFetch(`/discover/movie?with_genres=28&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'comedy',
                title: 'Comédia',
                items: await basicFetch(`/discover/movie?with_genres=35&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'horror',
                title: 'Terror',
                items: await basicFetch(`/discover/movie?with_genres=27&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'romance',
                title: 'Romance',
                items: await basicFetch(`/discover/movie?with_genres=10749&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'documentary',
                title: 'Documentário',
                items: await basicFetch(`/discover/movie?with_genres=99&language=pt-BR&api_key=${API_KEY}`)
            },
        ];
    },
    getMovieInfo: async(movieId, type) => {
        let info = {};

        if(movieId) {
            // eslint-disable-next-line default-case
            switch(type){
                case 'movie':
                    info = await basicFetch(`/movie/${movieId}?language=pt-BR&api_key=${API_KEY}`);
                break;
                case 'tv':
                    info = await basicFetch(`/tv/${movieId}?language=pt-BR&api_key=${API_KEY}`);
                break;
                default:
                    info = null
                break;
            }
        }

        return info;
    }
}