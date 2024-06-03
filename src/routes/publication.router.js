const express = require('express')
const { createPublication, getAll,  removePublication, getPublication } = require('../controllers/publication.controller.js')


const publicationRouter = express.Router()

publicationRouter.route('/publications')
.get(getAll)
.post(createPublication)

publicationRouter.route('/publications/:id')
.get(getPublication)
.delete( removePublication)

module.exports = publicationRouter
