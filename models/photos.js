const { DataTypes } = require('sequelize');
const sequelize = require('../database/db.sqlite'); // Assuming you have a Sequelize instance set up

const Images = sequelize.define('images', {
    title: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    date: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    path: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
});

module.exports = Images;
