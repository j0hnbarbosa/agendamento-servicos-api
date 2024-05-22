'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AvailableHour extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AvailableHour.belongsTo(models.User, { as: "users", foreignKey: "UserId" });
      models.User.hasMany(AvailableHour);

      AvailableHour.belongsTo(models.WorkType, { as: "workTypes", foreignKey: "WorkTypeId" });
      models.WorkType.hasMany(AvailableHour);
    }
  }
  AvailableHour.init({
    start_hour: DataTypes.STRING,
    end_hour: DataTypes.STRING,
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'AvailableHour',
  });
  return AvailableHour;
};