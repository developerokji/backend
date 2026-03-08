const express = require('express');
const userController = require('../controllers/user.controller');
const { validate } = require('../middlewares/validation.middleware');
const { authMiddleware } = require('../middlewares/auth.middleware');
const { registerSchema, loginSchema } = require('../validators/user.validator');

const router = express.Router();

router.post('/register', validate(registerSchema), userController.register);
router.post('/login', validate(loginSchema), userController.login);
router.get('/profile', authMiddleware, userController.getProfile);
router.get('/', authMiddleware, userController.getUsers);

module.exports = router;
