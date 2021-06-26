import './App.css';
import React, { useEffect, useState } from 'react';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import FeatureMovie from './components/FeatureMovie';
import Header from './components/Header';

function App() {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      //Pegar toda a lista
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      //Pegar o featured movie
      let originals = list.filter(i => i.slug === 'originals');
      let randomNumber = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let movie = originals[0].items.results[randomNumber];
      let movieInfo = await Tmdb.getMovieInfo(movie.id, 'tv');
      console.log(movieInfo);
      setFeaturedData(movieInfo);
    }

    loadAll();

  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 30) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener)
    }
  }, [])

  return (
    <div className="page">

      <Header black={blackHeader} />

      {featuredData &&
        <FeatureMovie item={featuredData} />
      }

      <section className="lists">
        {movieList.map((item, index) => (
          <MovieRow key={index} title={item.title} items={item.items} />
        ))}
      </section>

      <footer>
        Feito por Renan Rodrigues <br />
        Direitos de imagem para Netflix <br />
        Dados obtidos atráves da API do site Themoviedb.org
      </footer>

      {movieList.length <= 0 &&
        <div className="loading">
          <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" />
        </div>
      }

    </div>
  );
}

export default App;
