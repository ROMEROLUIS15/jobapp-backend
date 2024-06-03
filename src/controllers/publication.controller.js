const catchError = require('../utils/catchError')
const Publication = require('../models/Publication')
const User = require('../models/User')

const getAll =  catchError(async(req,res) => {
    const publication = await Publication.findAll()
    return res.json(publication)
})

const createPublication = catchError(async(req,res) => {
    const { description, category, zone, latitude, longitude, userId } = req.body
    const publication = await Publication.create({description, category, zone, latitude, longitude, userId})
    return res.status(201).json(publication)
})

const getPublication = catchError(async(req,res) => {
    const {id} = req.params
    const publication = await Publication.findByPk(id, {include: [{
        model: User,
        attributes: ['name', 'email', 'phone', 'availability', 'img']
    }]})
    return res.json(publication)
})

const  removePublication = catchError(async(req,res) => {
    const { id } = req.params
    await Publication.destroy({where: {id}})
    return res.sendStatus(204)
})

module.exports = {
    getAll,
    createPublication,
    getPublication,
    removePublication
}
