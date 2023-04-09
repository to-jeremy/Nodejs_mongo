const { MongoClient, ObjectId } = require("mongodb");
const uri = "mongodb://127.0.0.1";

const client = new MongoClient(uri);

exports.getAll = async (req, res) => {
    try {
        await client.connect();
        const eleves = await client
            .db("myefrei")
            .collection("eleves")
            .find({})
            .toArray();
        res.json(eleves);
    } catch (err) {
        res.status(500).json({ message: err });
    } finally {
        await client.close();
    }
};

exports.add = async (req, res) => {
    try {
        await client.connect();
        const newEleve = {
            genreEleve: req.body.genreEleve,
            nomEleve: req.body.nomEleve,
            prenomEleve: req.body.prenomEleve,
            cursus: req.body.cursus,
            nomClasse: req.body.nomClasse,
            creation: new Date(),
            status: "active"
        };
        await client
            .db("myefrei")
            .collection("eleves")
            .insertOne(newEleve);

        res.json({ message: "L'élève " + req.body.nomEleve + " " + req.body.prenomEleve + " est ajouté(e) avec succès !" });

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
            .collection("eleves")
            .updateOne(
                { _id: ObjectId(req.params.id) },
                {
                    $set: {
                        nomEleve: req.body.nomEleve,
                        prenomEleve: req.body.prenomEleve,
                        cursus: req.body.cursus,
                        nomClasse: req.body.nomClasse,
                        update: new Date()
                    }
                },
                { upsert: true }
            );

        res.json({ message: "L'élève " + req.body.nomEleve + " " + req.body.prenomEleve + " est mis(e) à jour avec succès !" });

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
            .collection("eleves")
            .deleteOne({ _id: ObjectId(req.params.id) });

        res.json({ message: "L'élève " + req.body.nomEleve + " " + req.body.prenomEleve + " est supprimé(e) avec succès !" });

    } catch (err) {
        res.status(500).json({ message: err });
    } finally {
        await client.close();
    }
};
