import React from 'react';
import Form from '../components/Form'
import Banner from '../components/Banner'
import '../styles/pages/GameForm.css';

const GameForm = () => {
    return (
        <div className="GameFormPage">
            <Banner />
            <Form />
        </div>
    );
};

export default GameForm;