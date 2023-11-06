import React from 'react';
import { useLocation } from 'react-router-dom';
import GamePoster from '../components/GamePoster';
import Banner from '../components/Banner';
import '../styles/pages/Home.css';

const Home = ({ setNomJeu }) => {
    const location = useLocation();
    const data = location.state.data;
    
    console.log('Données reçues dans Home :', data);

    return (
        <div className= "HomePage">
            <Banner />
            <GamePoster data={data} setNomJeu={setNomJeu}/>
        </div>
    );
};

export default Home;