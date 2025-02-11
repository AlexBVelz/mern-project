const UserModel = require('../models/user.model');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find().select('-password');
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs.' });
    }
};

module.exports.userInfo = async (req, res) => {
    try {
        // Vérifiez si l'ID est valide
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "L'id n'est pas valide" });
        }

        // Cherchez l'utilisateur par son ID
        const user = await UserModel.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: "Utilisateur introuvable" });
        }

        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur lors de la récupération de l'utilisateur.", error: err });
    }
};

module.exports.updateUser = async (req, res) => {
    try {
        // Vérifiez si l'ID est valide
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "L'id n'est pas valide" });
        }

        // Mettez à jour la bio de l'utilisateur
        const updatedUser = await UserModel.findByIdAndUpdate(
            req.params.id,
            { $set: { bio: req.body.bio } },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "Utilisateur introuvable pour la mise à jour." });
        }

        res.status(200).json(updatedUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur lors de la mise à jour de l'utilisateur.", error: err });
    }
};
