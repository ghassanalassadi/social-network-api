const {ObjectId} = require('mongoose').Types;
const {User,Thought} = require('../models');

module.exports = {
    getAllUsers(req, res) {
        User.find()
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },
    getOneUser(req, res) {
        User.findOne({_id: ObjectId(userId)})
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },
    createUser(req, res) {
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    }
}