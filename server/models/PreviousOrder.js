module.exports = (sequelize, DataTypes) => {
  const PreviousOrders = sequelize.define("PreviousOrder", {
    previousOrderDetails: {
      type: DataTypes.JSON,
      allowNull: true,
      // validate: {
      //   isJSON: true,
      // },
    },
  });

  return PreviousOrders;
};
