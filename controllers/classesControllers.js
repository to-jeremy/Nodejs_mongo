const { MongoClient, ObjectId } = require("mongodb");
const uri = "mongodb://127.0.0.1";

const client = new MongoClient(uri);

exports.getAll = async (req, res) => {
    try {
        await client.connect();
        const classes = await client
            .db("myefrei")
            .collection("classes")
            .find({})
            .toArray();
        res.json(classes);
    } catch (err) {
        res.status(500).json({ message: err });
    } finally {
        await client.close();
    }
};

exports.add = async (req, res) => {
    try {
        await client.connect();
        const newClass = {
            nomClasse: req.body.nomClasse,
            cursus: req.body.cursus,
            nbEleve: parseInt(req.body.nbEleve),
            creation: new Date(),
            status: "active"
        };
        await client
            .db("myefrei")
            .collection("classes")
            .insertOne(newClass);
        res.json({ message: "La classe " + req.body.nomClasse + " est ajoutée avec succès !" });
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
            .collection("classes")
            .updateOne(
                { _id: ObjectId(req.params.id) },
                {
                    $set: {
                        nomClasse: req.body.nomClasse,
                        cursus: req.body.cursus,
                        nbEleve: parseInt(req.body.nbEleve),
                        update: new Date()
                    }
                },
                { upsert: true }
            );
        res.json({ message: "La classe " + req.body.nomClasse + " est mise à jour avec succès !" });
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
            .collection("classes")
            .deleteOne({ _id: ObjectId(req.params.id) });
        res.json({ message: "La classe " + req.body.nomClasse + " est supprimée avec succès !" });
    } catch (err) {
        res.status(500).json({ message: err });
    } finally {
        await client.close();
    }
};
