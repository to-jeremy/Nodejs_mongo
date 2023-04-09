const { MongoClient, ObjectId } = require("mongodb");
const uri = "mongodb://127.0.0.1";

const client = new MongoClient(uri);

exports.getAll = async (req, res) => {
    try {
        await client.connect();
        const notes = await client
            .db("myefrei")
            .collection("notes")
            .find({})
            .toArray();
        res.json(notes);
    } catch (err) {
        res.status(500).json({ message: err });
    } finally {
        await client.close();
    }
};

exports.add = async (req, res) => {
    try {
        await client.connect();
        const newNote = {
            noteEleve: parseInt(req.body.noteEleve),
            nomEleve: req.body.nomEleve,
            prenomEleve: req.body.prenomEleve,
            nomMatiere: req.body.nomMatiere,
            creation: new Date()
        };
        await client
            .db("myefrei")
            .collection("notes")
            .insertOne(newNote);
        res.json({ message: "La note de " + req.body.nomEleve + " " + req.body.prenomEleve + " pour la matière " + req.body.nomMatiere + " est ajoutée avec succès !" });
    } catch (err) {
        res.status(500).json({ message: err });
    } finally {
        await client.close();
    }
};

exports.update = async (req, res) => {
    try {
        await client.connect();
        await client
            .db("myefrei")
            .collection("notes")
            .updateOne(
                { _id: ObjectId(req.params.id) },
                {
                    $set: {
                        noteEleve: parseInt(req.body.noteEleve),
                        nomEleve: req.body.nomEleve,
                        prenomEleve: req.body.prenomEleve,
                        nomMatiere: req.body.nomMatiere,
                        update: new Date()
                    }
                },
                { upsert: true }
            );
        res.json({ message: "La note de " + req.body.nomEleve + " " + req.body.prenomEleve + " pour la matière " + req.body.nomMatiere + " est mise à jour avec succès !" });
    } catch (err) {
        res.status(500).json({ message: err });
    } finally {
        await client.close();
    }
};

exports.delete = async (req, res) => {
    try {
        await client.connect();
        await client
            .db("myefrei")
            .collection("notes")
            .deleteOne({ _id: ObjectId(req.params.id) });
        res.json({ message: "La note de " + req.body.nomEleve + " " + req.body.prenomEleve + " pour la matière " + req.body.nomMatiere + " est supprimée avec succès !" });
    } catch (err) {
        res.status(500).json({ message: err });
    } finally {
        await client.close();
    }
};
