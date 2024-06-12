// const { DataTypes } = require('sequelize');
// const sequelize = require('../utils/connection');

// const User = sequelize.define('user', {
//     name: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },

//     email: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true
//     },

//     phone: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },

//     availability: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
    
//     img: {
//         type: DataTypes.TEXT,
//         allowNull: false
//     },

//     rating: {
//         type: DataTypes.ARRAY(DataTypes.INTEGER),
//         allowNull: false
//     },

//     description: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },

//     password: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
    
// });


//  User.prototype.toJSON = function () {
//      const values = Object.assign({}, this.get());
//      delete values.password;
//      return values;
//  }

// module.exports = User;


const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const User = sequelize.define('user', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    availability: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rating: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    img: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    imgPublicId: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

User.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    delete values.password;
    return values;
}

module.exports = User;
