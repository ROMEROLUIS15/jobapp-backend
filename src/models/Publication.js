const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection')

const Publication = sequelize.define('publication',{
    latitude: {
        type: DataTypes.FLOAT,
        allowNull:false
    },

    longitude: {
        type: DataTypes.FLOAT,
        allowNull:false
    },

    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
    zone: {
        type: DataTypes.STRING,
        allowNull: false
    },
  
})


module.exports = Publication
