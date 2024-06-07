const catchError = require('../utils/catchError');
const User = require('../models/User');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const Publication = require('../models/Publication');

const blacklist = new Set()

const getAll = catchError(async(req, res) => {
    const users = await User.findAll({include: [Publication]});
    return res.json(users);
});

const createUser = catchError(async (req, res) => {
    const { name, email, phone, password, availability, rating, img, description } = req.body;

    const registeredUser = await User.findOne({ where: { email } });
    if (registeredUser) {
        return res.status(400).json({ message: 'Email is already registered.' });
    }

    const encriptedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await User.create({
            name,
            email,
            phone,
            password: encriptedPassword,
            availability,
            rating,
            img,
            description,
        });

        return res.status(201).json(user);
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ message: 'Email is already registered.' });
        }
        return res.status(500).json({ message: 'Internal Server Error.' });
    }
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const user = await User.findByPk( id,
        { include: [{
            model: Publication
        }],
           where: { userId: id }  
        });
    if(!user) return res.sendStatus(404);
    return res.json(user);
});

const removeUser = catchError(async(req, res) => {
    const { id } = req.params;
    await User.destroy({ where: {id} });
    return res.sendStatus(204);
});

const updateUser = catchError(async(req, res) => {
    const { id } = req.params;
    const { name, phone, availability, rating, img, description } = req.body
    const user = await User.update(
        {name, phone, availability, rating, img, description},
        { where: {id}, returning: true }
    );
    if(user[0] === 0) return res.sendStatus(404);
    return res.json(user[1][0]);
});

const login = catchError(async(req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: {email} });
    if(!user) return res.status(401).json({ error: "Invalid email"})

    const isValid = await bcrypt.compare(password, user.password)
    if(!isValid) return res.status(401).json({ error: "Invalid password"});

    const token = jwt.sign(
        {user},
        process.env.TOKEN_SECRET,
         { expiresIn: '1h' }
)

    return res.json({ user, token });
})

const getLoggedUser = catchError(async (req, res) => {
    const userId = req.user.id;

    const user = await User.findOne({include: [Publication]});

    if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    return res.json(user);
})


const logout = catchError(async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(400).json({ message: "Token not provided" });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(400).json({ message: "Invalid token" });
    }
    blacklist.add(token);
    return res.status(200).json({ message: "Successful logout" });
});


module.exports = {
    getAll,
    createUser,
    getOne,
    removeUser,
    updateUser,
    login,
    getLoggedUser,
    logout
}
