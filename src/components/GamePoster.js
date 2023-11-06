import React from 'react';
import "../styles/components/GamePoster.css"
import { useNavigate } from 'react-router-dom';

const GamePoster = ({ data, setNomJeu }) => {
    const navigate = useNavigate();
    console.log('Données reçues dans AfficheJeu:', data);

    const onImageClick = (Name) => {
        setNomJeu(Name);
        navigate(`/Chargement/${Name}`);
    };

    const onAddClick = (Name) => {
        navigate("/AjouterJeu");
    };

    return (
        <div className="ComponentPoster">
            <img id="add" src={"http://localhost:3001/resources/Add.png"} alt="ajouter un jeu" onClick={() => onAddClick()}/>
            <div className="grid-container">
                {data.map(item => (
                    <div key={item.id} className="grid-item">
                        <img id="Poster" src={process.env.PUBLIC_URL + item.image} alt="Affiche du jeu" onClick={() => onImageClick(item.title)} />
                        <p id="Description">{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GamePoster;