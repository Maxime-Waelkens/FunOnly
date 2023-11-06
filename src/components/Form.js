import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../styles/components/Form.css';

const Form = () => {
    const [genres, setGenres] = useState(['FPS']);
    const [plats, setPlats] = useState(['PC']);
    const [videoId, setVideoId] = useState('');
    const [error, setError] = useState('');
    const [imagePath, setImagePath] = useState('');
    const [bannerPath, setBannerPath] = useState('');
    const maxGenres = 28;
    const maxPlats = 5;

    const addGenreSelect = () => {
        if (genres.length >= maxGenres) return;
        setGenres([...genres, '']); // Ajouter un select vide au tableau
    };

    const addPlatSelect = () => {
        if (plats.length >= maxPlats) return;
        setPlats(prevPlats => [...plats, '']);
    };

    const handleGenreChange = (event) => {
        const updatedGenres = [...genres];
        const genreName = event.target.name;
        const genreValue = event.target.value;
    
        const index = Number(genreName.match(/\d+/));
    
        updatedGenres[index] = genreValue;
    
        setGenres(updatedGenres);
    };

    const handlePlatChange = (event) => {
        const updatedPlats = [...plats];
        const platName = event.target.name;
        const platValue = event.target.value;
    
        const index = Number(platName.match(/\d+/));
    
        updatedPlats[index] = platValue;
    
        setPlats(updatedPlats);
    };


    const navigate = useNavigate();

    const onBackClick = () => {
        navigate("/");
    }


    const handleVideoLinkChange = (event) => {
        const link = event.target.value;

        // Appel de la fonction pour extraire l'identifiant vidéo
        const id = extractYouTubeVideoId(link);

        if (id) {
            setVideoId(id);
            setError('');
        } else {
            setVideoId('');
            setError('Lien YouTube invalide. Veuillez entrer un lien valide.');
        }
    };

    const makeImagePath = (event) => {
        const imageName = event.target.files[0];
        setImagePath("http://localhost:3001/resources/" + imageName.name);
    };

    const makeBannerPath = (event) => {
        const bannerName = event.target.files[0];
        setBannerPath("http://localhost:3001/resources/" + bannerName.name);
    }

    function extractYouTubeVideoId(link) {
        const regex = /(?:\?v=|\/embed\/|\/\d\/|\/vi\/|\/e\/|watch\?v=|youtu.be\/|\/v\/|\/e\/|embed\/|user\/[a-zA-Z0-9]*)+([a-zA-Z0-9_-]{11})/;
        const match = link.match(regex);
        return match ? match[1] : null;
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const imageFileInput = document.querySelector('#ImageGameFile');
        const bannerFileInput = document.querySelector('#BannerGameFile');

        // Construction du jeu à partir des données du formulaire
        const formData = new FormData();
        formData.append('title', event.target.elements.title.value);
        formData.append('description', event.target.elements.description.value);
        formData.append('dev', event.target.elements.dev.value);
        formData.append('ed', event.target.elements.ed.value);
        formData.append('type', event.target.elements.type.value);
        formData.append('genre', genres);
        formData.append('platform', plats);
        formData.append('pegi', event.target.elements.pegi.value);
        formData.append('date', event.target.elements.date.value);
        formData.append('image', imagePath);
        formData.append('banniere', bannerPath);
        formData.append('video', videoId);
        formData.append('commentary', []);
        formData.append('imageFile', imageFileInput.files[0]);
        formData.append('bannerFile', bannerFileInput.files[0]);

        console.log('Données du formulaire :', formData)

        // Envoyer les données 
        try {
            const response = await fetch('http://localhost:3001/api/newGame', {
                method: 'POST',
                body: formData,
            });
    
            if (response.ok) {
                setTimeout(() => {
                    navigate('/');
                  }, 1000);
            } else {
                console.error('Erreur lors de l\'envoi du formulaire');
            }
        } catch (error) {
            console.error('Erreur lors de la communication avec le serveur :', error);    
        }
    };



    return (
        <div className="ComponentForm">
            <img id="back" src={"http://localhost:3001/resources/Back.png"} alt="bouton retour" onClick={() => onBackClick()} />

            <form className="Form" onSubmit={handleSubmit}>
                <div className="TitleFormConteneur">
                    <h1>Ajouter un jeu</h1>
                </div>

                <div className="TitleDescConteneur">
                    <div className="TitleConteneur">
                        <h2 id="TitleGameTitle">Titre du jeu</h2>
                        <input id="TitleGameText" type="text" name="title" placeholder="Titre du jeu" required />
                    </div>

                    <div className="DescConteneur">
                        <h2 id="DescGameTitle">Description du jeu</h2>
                        <textarea id="DescGameText" name="description" placeholder="Description du jeu" required />
                    </div>
                </div>

                <div className="AboutConteneur">
                    <h2 id="AboutGameTitle">Informations sur le jeu</h2>

                    <h3 id="AboutGameDevTitle"> Développeur : </h3>
                    <input id="AboutGameDevText" type="text" name="dev" placeholder="Développeur" required />

                    <h3 id="AboutGameEdTitle"> Editeur : </h3>
                    <input id="AboutGameEdText" type="text" name="ed" placeholder="Editeur" required />


                    <h3 id="AboutTypeTitle">Type :</h3>

                    <select id="AboutGameType" name={"type"} required>
                        <option value="Solo">Solo</option>
                        <option value="Multi">Multi</option>
                        <option value="Solo/Multi">Solo/Multi</option>
                    </select>

                    <h3 id="AboutGenderTitle">Genre : </h3>
                    {genres.map((genre, index) => (
                        <select id="AboutGameGenre" key={index} name={`genre${index}`} value={genre} onChange={(event) => handleGenreChange(event, index)} required>
                            <option value="FPS">FPS</option>
                            <option value="MMORPG">MMORPG</option>
                            <option value="MOBA">MOBA</option>
                            <option value="RPG">RPG</option>
                            <option value="STR">STR</option>
                            <option value="TPS">TPS</option>
                            <option value="Sport">Sport</option>
                            <option value="Course">Course</option>
                            <option value="Simulation">Simulation</option>
                            <option value="Action">Action</option>
                            <option value="Aventure">Aventure</option>
                            <option value="Plateforme">Plateforme</option>
                            <option value="Combat">Combat</option>
                            <option value="Horreur">Horreur</option>
                            <option value="Survie">Survie</option>
                            <option value="Party Game">Party Game</option>
                            <option value="Gestion">Gestion</option>
                            <option value="Construction">Construction</option>
                            <option value="Battle Royale">Battle Royale</option>
                            <option value="Rogue-like">Rogue-like</option>
                            <option value="Rogue-lite">Rogue-lite</option>
                            <option value="Beat'em all">Beat'em all</option>
                            <option value="Tactical">Tactical</option>
                            <option value="Visual Novel">Visual Novel</option>
                            <option value="Point & Click">Point & Click</option>
                            <option value="Puzzle">Puzzle</option>
                            <option value="Musical">Musical</option>
                            <option value="Rythme">Rythme</option>
                        </select>
                    ))}
                    <button type="button" id="AboutButton" onClick={addGenreSelect}>+</button>

                    <h3 id="AboutPlatTitle">Plateforme : </h3>
                    {plats.map((plat, index) => (
                        <select id="AboutGamePlatform" key={index} name={`plat${index}`} value={plat} onChange={(event) => handlePlatChange(event, index)} required>
                            <option value="PC">PC</option>
                            <option value="PS4">PS4</option>
                            <option value="PS5">PS5</option>
                            <option value="XBOX">XBOX</option>
                            <option value="SWITCH">SWITCH</option>
                        </select>
                    ))}
                    <button type="button" id="PlatButton" onClick={addPlatSelect}>+</button>

                    <h3 id="AboutPegiTitle">PEGI : </h3>
                    <select id="AboutGamePegi" name="pegi" required>
                        <option value="3">3</option>
                        <option value="7">7</option>
                        <option value="12">12</option>
                        <option value="16">16</option>
                        <option value="18">18</option>
                    </select>

                    <h3 id="AboutDateTitle">Date de sortie : </h3>
                    <input id="AboutGameDate" type="date" name="date" required />
                </div>

                <div className="ImageBannerConteneur">
                    <div className="ImageConteneur">
                        <h2 id="ImageGameTitle">Image du jeu</h2>
                        <input id="ImageGameFile" type="file" name="imageFile" accept="image/png, image/jpg, image/jpeg" onChange={makeImagePath} required />
                        <input type="text" id="image" name="image" hidden />
                    </div>

                    <div className="BannerConteneur">
                        <h2 id="BannerGameTitle">Bannière du jeu</h2>
                        <input id="BannerGameFile" type="file" name="bannerFile" accept="image/png, image/jpg, image/jpeg" onChange={makeBannerPath} required />
                        <input type="text" id="banner" name="banner" hidden />
                    </div>
                </div>

                <div className="VideoValidButtonConteneur">
                    <div className="VideoConteneur">
                        <h2 id="VideoGameTitle">Vidéo du jeu</h2>
                        <input id="VideoGameText" type="text" name="video" placeholder="Lien vers une vidéo youtube" onChange={handleVideoLinkChange} required />
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                    </div>

                    <div className="ValidButtonConteneur">
                        <button id="ValidButton" type="submit">Valider</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Form;