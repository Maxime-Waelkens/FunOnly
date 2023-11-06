const express = require('express');
const cors = require('cors'); // Importez cors pour permettre à l'application d'accéder à l'API.
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3001;
const gameData = require('./games.json'); // Importez les données du fichier JSON.
const multer = require('multer'); // Importez multer
const storage = multer.diskStorage({
    destination: './resources', // Répertoire de destination des fichiers
    filename: function (req, file, cb) {
        // Utilisez le nom d'origine du fichier comme nom de fichier
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

app.use(cors()); // Utilisez cors pour permettre à l'application d'accéder à l'API.
app.use(express.json());
app.use('/resources', express.static(path.join(__dirname, 'resources')));

app.get('/api/affiches', (req, res) => {

    const affichejeuData = gameData.map(item => { // Utilisez la méthode map pour itérer sur les données et renvoyer un objet contenant les données que nous voulons.
        return {
            id: item.id,
            title: item.title,
            description: item.description,
            image: item.image
        };
    });


    res.json(affichejeuData); // Renvoie les données au format JSON.
});

app.get('/api/:nomJeu', (req, res) => {
    const nomJeu = req.params.nomJeu;
    const jeu = gameData.find(item => item.title === nomJeu);

    if (jeu) {
        const jeuData = {
            id: jeu.id,
            title: jeu.title,
            description: jeu.description,
            image: jeu.image,
            banniere: jeu.banniere,
            video: jeu.video
        };

        res.json(jeuData); // Renvoie les données au format JSON.
    } else {
        res.status(404).json({ message: 'Jeu non trouvé' });
    }
});

app.post('/api/newGame', upload.fields([
    { name: 'imageFile', maxCount: 1 },
    { name: 'bannerFile', maxCount: 1 }
]), (req, res) => {
    // Gérez les fichiers téléchargés comme vous l'avez déjà fait
    const imageFile = req.files['imageFile'][0];
    const bannerFile = req.files['bannerFile'][0];

    if (imageFile && bannerFile) {
        // Les deux fichiers ont été correctement téléchargés
        console.log('Fichier image téléchargé :', imageFile);
        console.log('Fichier bannière téléchargé :', bannerFile);
    } else {
        // Certains fichiers n'ont pas été téléchargés
        if (!imageFile) {
            console.log('Aucun fichier image téléchargé');
        }
        if (!bannerFile) {
            console.log('Aucun fichier bannière téléchargé');
        }
    }

    try {
        // Chargez le contenu actuel du fichier JSON
        const jsonData = JSON.parse(fs.readFileSync('games.json', 'utf-8'));

        // Générez un nouvel ID pour la nouvelle entrée (par exemple, en incrémentant l'ID du dernier élément)
        const nextId = jsonData.length > 0 ? jsonData[jsonData.length - 1].id + 1 : 1;

        // Récupérez les données du formulaire à partir de req.body
        const formData = req.body;
        console.log(req.body);

        // Construisez la structure des données
        let newGameData = {
            id: nextId,
            title: formData.title,
            description: formData.description,
            dev: formData.dev,
            ed: formData.ed,
            type: formData.type, // Assurez-vous que ce champ est correctement renseigné dans le formulaire
            genre: formData.genre, // Assurez-vous que ce champ est correctement renseigné dans le formulaire
            platform: formData.platform, // Assurez-vous que ce champ est correctement renseigné dans le formulaire
            pegi: formData.pegi,
            date: formData.date,
            image: formData.image,
            banniere: formData.banniere,
            video: formData.video,
            commentary: []
        };

        // Ajoutez les nouvelles données au tableau JSON
        jsonData.push(newGameData);

        // Écrivez le tableau mis à jour dans le fichier JSON
        fs.writeFileSync('games.json', JSON.stringify(jsonData));

        // Répondez avec un statut de succès (200 OK)
        res.status(200).send('Données enregistrées avec succès');
    } catch (error) {
        console.error('Erreur lors de la mise à jour du fichier JSON :', error);
        res.status(500).send('Erreur lors de la mise à jour du fichier JSON');
    }
});

app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur le port ${port}`);
});