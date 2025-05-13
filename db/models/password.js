'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Password extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Password.belongsTo(models.User, { as: "users", foreignKey: "UserId", onDelete: 'CASCADE' });
      models.User.hasOne(Password);
    }
  }
  Password.init({
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    salt: DataTypes.STRING,
    passwordHash: DataTypes.STRING,
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Password',
  });
  return Password;
};