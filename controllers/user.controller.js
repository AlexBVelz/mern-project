const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;

// Récupérer tous les utilisateurs
module.exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find().select("-password");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Récupérer les informations d'un utilisateur par ID
module.exports.userInfo = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown: " + req.params.id);

  try {
    const user = await UserModel.findById(req.params.id).select("-password");
    if (!user) return res.status(404).send("User not found");
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Mettre à jour un utilisateur
module.exports.updateUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown: " + req.params.id);

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      { $set: { bio: req.body.bio } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Supprimer un utilisateur
module.exports.deleteUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown: " + req.params.id);

  try {
    await UserModel.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Successfully deleted." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Suivre un utilisateur
module.exports.follow = async (req, res) => {
  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.idToFollow)
  )
    return res.status(400).send("ID unknown: " + req.params.id);

  try {
    // Ajouter dans la liste "following"
    const userFollowing = await UserModel.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { following: req.body.idToFollow } },
      { new: true, upsert: true }
    );

    // Ajouter dans la liste "followers"
    await UserModel.findByIdAndUpdate(
      req.body.idToFollow,
      { $addToSet: { followers: req.params.id } },
      { new: true, upsert: true }
    );

    res.status(201).json(userFollowing);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Ne plus suivre un utilisateur
module.exports.unfollow = async (req, res) => {
  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.idToUnfollow)
  )
    return res.status(400).send("ID unknown: " + req.params.id);

  try {
    // Retirer de la liste "following"
    const userUnfollowing = await UserModel.findByIdAndUpdate(
      req.params.id,
      { $pull: { following: req.body.idToUnfollow } },
      { new: true, upsert: true }
    );

    // Retirer de la liste "followers"
    await UserModel.findByIdAndUpdate(
      req.body.idToUnfollow,
      { $pull: { followers: req.params.id } },
      { new: true, upsert: true }
    );

    res.status(201).json(userUnfollowing);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
