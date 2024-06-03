const express = require('express');
const userRouter = require('./user.route');
const publicationRouter = require('./publication.router');

const router = express.Router();


router.use(userRouter)
router.use(publicationRouter)


module.exports = router;
