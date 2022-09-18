const router = require("express").Router();

const {
    getAllThoughts,
    getOneThought,
    createThought,
    editThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtController');

router.route('/')
    .get(getAllThoughts)
    .post(createThought);

router.route('/:thoughtId')
    .get(getOneThought)
    .put(editThought)
    .delete(deleteThought);

router.route('/:thoughtId/reactions')
    .post(createReaction);

router.route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);

module.exports = router;