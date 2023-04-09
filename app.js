const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
const uri = "mongodb://127.0.0.1";
const client = new MongoClient(uri);

const cors = require('cors');
app.use(cors({origin: 'http://localhost:3000'}));

app.use(express.json());

// Connexion à la base de données mongodb myefrei
async function run(){
    try {
        await client.connect();
        await client.db("myefrei").command({ping : 1});
        console.log("OK !");
    } finally {
        await client.close();
    }
}

run();

// Déclaration des routes vers les controleurs respectifs
app.use("/classes", require('./routes/classes'));
app.use("/eleves", require('./routes/eleves'));
app.use("/matieres", require('./routes/matieres'));
app.use("/notes", require('./routes/notes'));
app.use("/intervenants", require('./routes/intervenants'));
app.use("/administration", require('./routes/administration'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

app.listen(3001, () => {
    console.log("Server started on port 3001");
});