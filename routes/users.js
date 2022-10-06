const express = require('express');
const { patchUserValidator } = require('../middlewares/validation');

const userRouter = express.Router();
const {
  getCurrentUser,
  patchUser
} = require('../controllers/users');

userRouter.get('/users/me', getCurrentUser);
userRouter.patch('/users/me', patchUserValidator, patchUser);

module.exports = {
  userRouter,
};
