const express = require('express');
const router = express.Router();
const { postFeedback, fetchFeedbacks, deleteFeedback } = require('../controllers//feedbackController');

router.get('/', fetchFeedbacks);

router.post('/', postFeedback);

router.delete('/:id', deleteFeedback);

module.exports = router;
