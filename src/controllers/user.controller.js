const userService = require('../services/user.service');
const { sendSuccess } = require('../utils/responseFormatter');
const { getPaginationOptions, formatPaginatedResponse } = require('../utils/pagination');

class UserController {
  async register(req, res, next) {
    try {
      const result = await userService.registerUser(req.body);
      sendSuccess(res, 201, 'User registered successfully', result);
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = await userService.loginUser(email, password);
      sendSuccess(res, 200, 'User logged in successfully', result);
    } catch (error) {
      next(error);
    }
  }

  async getProfile(req, res, next) {
    try {
      const user = await userService.getUserProfile(req.user.id);
      sendSuccess(res, 200, 'User profile fetched successfully', user);
    } catch (error) {
      next(error);
    }
  }

  async getUsers(req, res, next) {
    try {
      const { page, limit } = req.query;
      const { skip, take, page: pageNum, limit: limitNum } = getPaginationOptions(page, limit);
      
      const { users, total } = await userService.getAllUsers(skip, take);
      
      const paginatedData = formatPaginatedResponse(users, total, pageNum, limitNum);
      sendSuccess(res, 200, 'Users fetched successfully', paginatedData);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
