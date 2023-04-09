const { MongoClient, ObjectId } = require("mongodb");
const uri = "mongodb://127.0.0.1";

const client = new MongoClient(uri);

exports.getAll = async (req, res) => {
    try {
        await client.connect();
        const administration = await client
            .db("myefrei")
            .collection("administration")
            .find({})
            .toArray();
        res.json(administration);
    } catch (err) {
        res.status(500).json({ message: err });
    } finally {
        await client.close();
    }
};

exports.add = async (req, res) => {
    try {
        await client.connect();
        const newPersonnel = {
            genrePerson: req.body.genrePerson,
            nomPerson: req.body.nomPerson,
            prenomPerson: req.body.prenomPerson,
            poste: req.body.poste,
            gereCursus: req.body.gereCursus,
            creation: new Date(),
            status: "active"
        };
        await client
            .db("myefrei")
            .collection("administration")
            .insertOne(newPersonnel);

        res.json({ message: "La personne " + req.body.nomPerson + " " + req.body.prenomPerson + " est ajoutée avec succès !" });

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
            .collection("administration")
            .updateOne(
                { _id: ObjectId(req.params.id) },
                {
                    $set: {
                        nomPerson: req.body.nomPerson,
                        prenomPerson: req.body.prenomPerson,
                        poste: req.body.poste,
                        gereCursus: req.body.gereCursus,
                        update: new Date()
                    }
                },
                { upsert: true }
            );

        res.json({ message: "La personne " + req.body.nomPerson + " " + req.body.prenomPerson + " est mise à jour avec succès !" });

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
            .collection("administration")
            .deleteOne({ _id: ObjectId(req.params.id) });

        res.json({ message: "La personne " + req.body.nomPerson + " " + req.body.prenomPerson + " est supprimée avec succès !" });

    } catch (err) {
        res.status(500).json({ message: err });
    } finally {
        await client.close();
    }
};