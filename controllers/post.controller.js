const PostModel = require('../models/post.model');
const UserModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;

module.exports.readPost = (req,res) => {
    PostModel.find((err, docs) => {
        if(!err) res.send(docs);
        else console.log('Error to get data : ' + err);
    })
}


module.exports.readPost = async (req, res) => {
    const newPost = new postModel({
        posterId: req.body.posterId,
        message: req.body.message,
        picture: req.body.picture,
        video: req.body.video,
        likers: [],
        comments: [],
    });

    try{
        const post = await newPost.save();
        return res.status(201).json(post);
    }catch(err){
        return res.status(400).send(err);
    }
};


module.exports.updatePost = async (req, res) => {
    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send('Invalid ID :' + req.params.id);

    const updatedRecord = {
        message:  req.body.message
    }

    PostModel.findByIdAndUpdate(
        req.params.id,
        { $set: updatedRecord },
        { new: true},
        (err, docs) => {
            if(!err) res.send(docs);
            else console.log("Update error : " + err);
        }
    )


module.exports.deletePost = (req,res) => {
        if(!ObjectID.isValid(req.params.id))
            return res.status(400).send('ID unknown :' + req.params.id);

        PostModel.findByIdAndRemove(
            req.params.id, 
            (err, docs) => {
            if(!err) res.send(docs);
            else console.log('Error to delete data : ' + err);
        })
    }

    module.exports.likePost =  async (req,res) => {
        if(!ObjectID.isValid(req.params.id))
            return res.status(400).send('ID unknown :' + req.params.id);

        try {
            await PostModel.findByIdAndUpdate(
                req.params.id,
                {
                    $addToSet: {likers: req.body.id}
                },
                { new: true},
                (err, docs) => {
                    if(!err) return res.status(400).send(err);
                }
            );
            await UserModel.findByIdAndUpdate(
                req.body.id,
                {
                    $addToSet: {likes: req.params.id}
                },
                { new: true},
                (err, docs) => {
                    if(!err)  res.status(400).send(docs);
                    else return res.status(400).send(err);
                }
            )
        }catch(error){
            return res.status(400).send(error);
        }
    }

    module.exports.unlikePost =  async (req,res) => {
        if(!ObjectID.isValid(req.params.id))
            return res.status(400).send('ID unknown :' + req.params.id);
    }

}