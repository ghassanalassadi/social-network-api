const {User,Thought} = require('../models');

module.exports = {
    getAllUsers(req, res) {
        User.find()
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    getOneUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) => 
                !user 
                    ? res.status(404).json({message: 'Error: User not found'})
                    : Thought.deleteMany({_id: {$in: user.thought}})
            )
            .then(() => res.json({message: 'User and Thoughts deleted!'}))
            .catch((err) => res.status(500).json(err))
    },
    updateUser(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$set: req.body},
            { runValidators: true, new: true }
        )
        .then((user) => 
            !user
                ? res.status(404).json({message: 'No user with this id!'})
                : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    addFriend(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$addToSet: {thought: req.body}},
            { runValidators: true, new: true }
        )
        .then((user) => 
            !user
                ? res.status(404).json({message: 'No user with this id!'})
                : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    removeFriend(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$pull: {friend: {friendId: req.params.friendId}}},
            { runValidators: true, new: true }
        )
        .then((user) =>
            !user
                ? res.status(404).json({message: 'No user with this id!'})
                : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    }
};