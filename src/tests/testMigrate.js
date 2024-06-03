const sequelize = require('../utils/connection');
const app = require('../app')
const request = require('supertest')

const main = async() => {
    try{
        sequelize.sync();
        const newUser = {
            firstName: 'test user',
            lastName: 'test',
            email: 'test@gmail.com',
            password: 'test1234'
        }
        await request(app).post('/users').send(newUser)
        
        process.exit();
    } catch(error){
        console.log(error);
    }
}

main();