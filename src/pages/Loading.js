import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/Loading.css';

const Loading = ({ apiUrl, successRoute }) => {
    const navigate = useNavigate();

    useEffect(() => {
        fetch(apiUrl)
          .then(response => {
            if (!response.ok) {
              throw new Error(`La requête a échoué avec un statut : ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            console.log('Données chargées avec succès:', data);
            navigate(successRoute, { state: { data } });
          })
          .catch(error => {
            console.error(error);
          });
      }, [navigate]);



    return (
        <div className="LoadingPage">
            <h1>Chargement...</h1>
        </div>
    );
};

export default Loading;