const { User, Thought } = require('../models');

module.exports = {
    // thoughts
    getAllThoughts(req, res) {
        Thought.find()
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },
    getOneThought(req, res) {
        Thought.findOne({_id: req.params.thoughtId})
            .then((thought) => 
                !thought
                    ? res.status(404).json({message: 'No thought found with that id!'})
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    createThought(req, res) {
        Thought.create(req.body)
            .then(({_id}) => {
                return User.findOneAndUpdate(
                    {_id: req.params.userId},
                    {$push: {thoughts: _id}},
                    {new: true}
                )
            })
            .then((thought) => 
                !thought
                    ? res.status(404).json({message: 'No thought found with that id!'})
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    editThought(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$set: req.body},
            {runValidators: true, new: true}
            )
            .then((user) => 
                !user
                    ? res.status(404).json({message: 'No thought found with that id!'})
                    : res.json(user)
            )
            .catch((err) => res.status.json(err));
    },
    deleteThought(req, res) {
        Thought.findOneAndDelete({_id: req.params.thoughtId})
            .then((thought) => {
                !thought
                    ? res.status(404).json({message: 'No thought found with this id!'})
                    : User.findOneAndUpdate(
                        {thought: req.params.thoughtId},
                        {$pull: {thought: req.params.thoughtId}},
                        {new: true}
                    )
                }
            )
            .then((user) => 
                !user
                    ? res.status(404).json({message: 'Thought deleted but user not found!'})
                    : res.json({message: 'Thought deleted successfully!'})
            )
            .catch((err) => res.status(500).json(err));
    },
    // reactions
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$addToSet: {reactions: req.body}},
            {runValidators: true, new: true}
        )
            .then((thought) => 
                !thought
                    ? res.status(404).json({message: 'No thought found with this id!'})
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    deleteReaction(req, res) {
        Thought.findOneAndDelete(
            {_id: req.params.thoughtId},
            {$pull: {reactions: {reactionId: req.params.reactionId}}},
            {runValidators: true, new: true}
        )
            .then((thought) => 
                !thought
                    ? res.status(404).json({message: 'No thought found with this id!'})
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    }
}
