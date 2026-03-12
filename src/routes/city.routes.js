const express = require('express');
const cityController = require('../controllers/city.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/', cityController.getCityByState); // Filter via ?stateId=1

module.exports = router;
