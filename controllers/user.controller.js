const UserModel = require('../models/user.model');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
    const users = await UserModel.find().select('-password');
    res.status(200).json({users});
}

module.exports.userInfo = (req, res) => {
    console.log(req.params);
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).json({message: "L'id n'est pas valide"});
        ;
    }
    UserModel.findById(req.params.id, (err, docs) => {
        if(!err) res.send(docs);
        else console.log('Id unknow : ' + err);
    }).select('-password');
};


module.exports.updateUser = async (req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).json("L'id n'est pas valide");

    try {
        await UserModel.findOneAndUpdate(
            {_id: req.params.id},
            {
                $set: {
                    bio: req.body.bio,
                }
            },
            {new: true, upsert: true, setDefaultsOnInsert: true},
            (err, docs) => {
                if(!err) return res.send(docs);
                if(err) return res.status(500).send({message: err});
            }
        )
    } catch (err) {
        res.status(500).json({message: err});       
    }
}