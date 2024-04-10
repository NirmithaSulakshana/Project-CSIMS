module.exports = (sequelize, DataTypes) => {
  const Orders = sequelize.define("Orders", {
    orderDetails: {
      type: DataTypes.JSON,
      allowNull: true,
      // validate: {
      //   isJSON: true,
      // },
    },
  });

  Orders.associate = (models) => {
    Orders.belongsTo(models.Users, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Orders;
};
