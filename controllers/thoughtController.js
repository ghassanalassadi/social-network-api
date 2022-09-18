const { User, Thought } = require('../models');

module.exports = {
    // thoughts
    getThought(req, res) {
        Thought.find()
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },
    getSingleThought(req, res) {
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
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },
    editThought(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$set: req.body},
            {runValidators: true, new: true}
        )
            .then((thought) => 
                !thought
                    ? res.status(404).json({message: 'No thought found with that id!'})
                    : res.json(thought)
            )
            .catch((err) => res.status.json(err));
    },
    deleteThought(req, res) {
        Thought.findOneAndDelete({_id: req.params.thoughtId})
            .then((thought) => {
                !thought
                    ? res.status(404).json({message: 'No thought found with this id!'})
                    : res.status(200).json({message: 'Thought deleted successfully!'})
                }
            )
            .catch((err) => res.status(500).json(err));
    },
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
