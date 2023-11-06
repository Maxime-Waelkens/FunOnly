import React from 'react';
import Game from '../components/Game';
import Banner from '../components/Banner';
import { useLocation } from 'react-router-dom';
import '../styles/pages/GamePage.css';

const GamePage = () => {
    const location = useLocation();
    const data = location.state.data;
    
    return (
        <div className="GamePagePage">
            <Banner />
            <Game data={data}/>
        </div>
    );
};

export default GamePage;