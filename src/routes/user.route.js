const { getAll, createUser, getOne, removeUser, updateUser, login, getLoggedUser, logout, updateUserProfileImage } = require('../controllers/user.controller');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT')
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const userRouter = express.Router();

userRouter.route('/users')
    .get(getAll)
    .post(createUser);

userRouter.route('/users/login')
    .post(login)

userRouter.route('/users/:id/profile-image')
    .put(verifyJWT,upload.single('profileImage'), updateUserProfileImage)

userRouter.route('/users/me')
    .get(verifyJWT, getLoggedUser)

userRouter.route('/users/logout')
    .post(logout)

userRouter.route('/users/:id')
    .get(verifyJWT, getOne)
    .delete(verifyJWT, removeUser)
    .put(verifyJWT, updateUser);

module.exports = userRouter;
