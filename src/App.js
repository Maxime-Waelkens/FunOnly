import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Loading from './pages/Loading';
import Home from './pages/Home';
import GamePage from './pages/GamePage';
import GameForm from './pages/GameForm';
import { useState } from 'react';

const App = () => {
  const [nomJeu, setNomJeu] = useState('');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Loading apiUrl={'http://localhost:3001/api/affiches'} successRoute={'/Home'} />} />
        <Route path="/Home" element={<Home setNomJeu={setNomJeu} />} />
        <Route path={`/Chargement/${nomJeu}`} element={<Loading apiUrl={`http://localhost:3001/api/${nomJeu}`} successRoute={`/${nomJeu}`} />}/>
        <Route path={`/${nomJeu}`} element={<GamePage />} />
        <Route path={`/AjouterJeu`} element={<GameForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
