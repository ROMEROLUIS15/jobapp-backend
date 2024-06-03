const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const User = sequelize.define('user', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },

    availability: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
    img: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    rating: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
});


 User.prototype.toJSON = function () {
     const values = Object.assign({}, this.get());
     delete values.password;
     return values;
 }

module.exports = User;
