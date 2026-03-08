const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const ApiError = require('../utils/ApiError');

class UserService {
  async registerUser(userData) {
    const existingUser = await userModel.findUserByEmail(userData.email);
    if (existingUser) {
      throw new ApiError(400, 'User already exists with this email');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    const newUser = await userModel.createUser({
      ...userData,
      password: hashedPassword,
    });

    const token = this.generateToken(newUser.id, newUser.role);
    
    // remove password from response
    delete newUser.password;

    return { user: newUser, token };
  }

  async loginUser(email, password) {
    const user = await userModel.findUserByEmail(email);
    if (!user) {
      throw new ApiError(401, 'Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new ApiError(401, 'Invalid credentials');
    }

    const token = this.generateToken(user.id, user.role);

    delete user.password;

    return { user, token };
  }

  async getUserProfile(userId) {
    const user = await userModel.findUserById(userId);
    if (!user) {
      throw new ApiError(404, 'User not found');
    }
    return user;
  }

  async getAllUsers(skip, take) {
    return userModel.getUsers(skip, take);
  }

  generateToken(id, role) {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
  }
}

module.exports = new UserService();
