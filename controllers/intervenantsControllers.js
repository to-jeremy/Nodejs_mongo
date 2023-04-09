const { MongoClient, ObjectId } = require("mongodb");
const uri = "mongodb://127.0.0.1";

const client = new MongoClient(uri);

exports.getAll = async (req, res) => {
    try {
        await client.connect();
        const intervenants = await client
            .db("myefrei")
            .collection("intervenants")
            .find({})
            .toArray();
        res.json(intervenants);
    } catch (err) {
        res.status(500).json({ message: err });
    } finally {
        await client.close();
    }
};

exports.add = async (req, res) => {
    try {
        await client.connect();
        const newIntervenant = {
            genreInterv: req.body.genreInterv,
            nomInterv: req.body.nomInterv,
            prenomInterv: req.body.prenomInterv,
            gereCursus: req.body.gereCursus,
            creation: new Date(),
            status: "active"
        };
        await client
            .db("myefrei")
            .collection("intervenants")
            .insertOne(newIntervenant);

        res.json({ message: "L'intervenant(e) " + req.body.nomInterv + " " + req.body.prenomInterv + " est ajouté(e) avec succès !" });

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
            .collection("intervenants")
            .updateOne(
                { _id: ObjectId(req.params.id) },
                {
                    $set: {
                        nomInterv: req.body.nomInterv,
                        prenomInterv: req.body.prenomInterv,
                        gereCursus: req.body.gereCursus,
                        update: new Date()
                    }
                },
                { upsert: true }
            );

        res.json({ message: "L'intervenant(e) " + req.body.nomInterv + " " + req.body.prenomInterv + " est mis(e) avec succès !" });

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
            .collection("intervenants")
            .deleteOne({ _id: ObjectId(req.params.id) });

        res.json({ message: "L'intervenant(e) " + req.body.nomInterv + " " + req.body.prenomInterv + " est supprimé(e) avec succès !" });

    } catch (err) {
        res.status(500).json({ message: err });
    } finally {
        await client.close();
    }
};