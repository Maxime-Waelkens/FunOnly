import React from "react";
import "../styles/components/Game.css";
import { useNavigate } from "react-router-dom";

const Game = ({ data }) => {
    const navigate = useNavigate();

    const onBackClick = () => {
        navigate("/");
    };

    return (

        <div className="ComponentGame">
            <img id="back" src={"http://localhost:3001/resources/Back.png"} alt="bouton retour" onClick={() => onBackClick()} />

            <div className="GameBanner">
                <img id="bannerImage" src={data.banniere} alt="bannière" />
            </div>

            <div className="Game">

                <div className="TitleImage">
                    <img id="image" src={data.image} alt="image automatique si pas d'image pour le jeu" />
                    <h1>{data.title}</h1>
                </div>

                <div className="DescAboutTitles">
                    <h2 id="DescTitle">Description</h2>
                    <h2 id="AboutTitle">Informations</h2>
                </div>

                <div className="DescAboutTexts">
                    <p id="DescText">{data.description}</p>
                    <p id="AboutText">A faire</p>
                </div>

                <div className="Video">
                    <h2>Vidéo de présentation</h2>
                    <iframe
                        src={`https://www.youtube.com/embed/${data.video}`}
                        title="Vidéo de présentation du jeu"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen>
                    </iframe>
                </div>

            </div>

        </div>

    );
};

export default Game;