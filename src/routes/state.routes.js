const express = require('express');
const stateController = require('../controllers/state.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/', stateController.getState);

module.exports = router;
