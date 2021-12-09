/* eslint-disable no-unused-vars */
/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useState } from 'react';
import Tmdb from './Tmdb';
import MovieRow from './componentes/MovieRow';
import './App.css';
import FeaturedMovie from './componentes/FeaturedMovie';
import Header from './componentes/Header';

export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      //Pegando a lista total
      let list = await Tmdb.getHomeList();
      setMovieList(list);
      //pegando o filme em destaque
      let originals = list.filter(i=>i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');

     setFeaturedData(chosenInfo);
    }

    loadAll();
  }, []);

  useEffect(()=>{
     const scrollListener = () => {
      if(window.scrollY > 10){
        setBlackHeader(true);
      }else{
        setBlackHeader(false);
      }
     }

     window.addEventListener('scroll', scrollListener);

     return () => {
       window.removeEventListener('scroll', scrollListener);
     }
  }, []);


  return (
    <div className="page">

    <Header black={blackHeader}/>

      {featuredData &&
        <FeaturedMovie item={featuredData} />
      }
      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>

          <footer>
            Direitos de Imagem para Netflix <br/>
            Dados retirados do site Themoviedb.org <br/>
            Desenvolvido por Ana Laura Oliveira com base no conteúdo disponibilizado pela B7Web.
          </footer>
{movieList.length <= 0 &&
          <div className="loading">
            <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" height="250" width="500"></img>
          </div>}
    </div>
  )
}
