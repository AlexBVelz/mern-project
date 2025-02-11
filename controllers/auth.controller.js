const UserModel = require('../models/user.model');

module.exports.signUp = async (req, res) => {
    console.log(req.body);
    const { pseudo, email, password } = req.body;
    try {
        // Validation des champs requis
        if (!email || !password) {
            return res.status(400).json({ message: 'Email et mot de passe sont requis.' });
        }
        // Création de l'utilisateur
        const user = await UserModel.create({ pseudo, email, password });
        res.status(201).json({ user: user._id });

    } catch (err) {
        console.error(err); // Affiche l'erreur dans la console pour le débogage
        // Envoi d'une réponse avec un code HTTP approprié (500 pour une erreur serveur)
        res.status(500).json({ error: err.message || 'Erreur lors de la création de l’utilisateur.' });
    }
};

