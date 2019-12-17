'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Book extends Sequelize.Model {}
  Book.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: {
              msg: 'Please provide a value for "Title"',
            },
            notEmpty: {
            msg: 'Please provide a value for "Title"',
            }
        },
    },
    author: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: {
              msg: 'Please provide a value for "Author"',
            },
            notEmpty: {
            msg: 'Please provide a value for "Author"',
            }
        },
    },
    genre: Sequelize.STRING,
    year: {
        type: Sequelize.INTEGER,
        validate: {
            min: {
                args: 1888,
                msg: 'Please provide a value greater than "1888" for "year"',
            },
        },
    }, 

  }, { sequelize });

  return Book;
};