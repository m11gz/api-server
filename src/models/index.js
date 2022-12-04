'use strict';
const foodSchema = require('./food.js');

const Collection = require('./collection-class.js');

const { Sequelize, DataTypes } = require('sequelize');

const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite::memory:' : process.env.DATABASE_URL;



const sequelizeOptions =
  process.env.NODE_ENV === 'production'
    ? {
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      }
    : {};

let sequelize = new Sequelize(DATABASE_URL, sequelizeOptions);

const FoodModel = foodSchema(sequelize, DataTypes);


module.exports = {
  db: sequelize,
  Food: new Collection(FoodModel),
};
