const { MongoClient, ObjectId } = require("mongodb");
const uri = "mongodb://127.0.0.1";

const client = new MongoClient(uri);

exports.getAll = async (req, res) => {
    try {
        await client.connect();
        const matieres = await client
            .db("myefrei")
            .collection("matieres")
            .find({})
            .toArray();
        res.json(matieres);
    } catch (err) {
        res.status(500).json({ message: err });
    } finally {
        await client.close();
    }
};

exports.add = async (req, res) => {
    try {
        await client.connect();
        const newMatiere = {
            nomMatiere: req.body.nomMatiere,
            nomClasse: req.body.nomClasse,
            nomInterv: req.body.nomInterv,
            prenomInterv: req.body.prenomInterv,
            creation: new Date()
        };
        await client
            .db("myefrei")
            .collection("matieres")
            .insertOne(newMatiere);
        res.json({ message: "La matière " + req.body.nomMatiere + " pour la classe " + req.body.nomClasse + " dont intervient " + req.body.nomInterv + " " + req.body.prenomInterv + " est ajoutée avec succès !" });
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
            .collection("matieres")
            .updateOne(
                { _id: ObjectId(req.params.id) },
                {
                    $set: {
                        nomMatiere: req.body.nomMatiere,
                        nomClasse: req.body.nomClasse,
                        nomInterv: req.body.nomInterv,
                        prenomInterv: req.body.prenomInterv,
                        update: new Date()
                    }
                },
                { upsert: true }
            );
        res.json({ message: "La matière " + req.body.nomMatiere + " pour la classe " + req.body.nomClasse + " dont intervient " + req.body.nomInterv + " " + req.body.prenomInterv + " est mise à jour avec succès !" });
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
            .collection("matieres")
            .deleteOne({ _id: ObjectId(req.params.id) });
        res.json({ message: "La matière " + req.body.nomMatiere + " pour la classe " + req.body.nomClasse + " dont intervient " + req.body.nomInterv + " " + req.body.prenomInterv + " est supprimée avec succès !" });
    } catch (err) {
        res.status(500).json({ message: err });
    } finally {
        await client.close();
    }
};