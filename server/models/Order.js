module.exports = (sequelize, DataTypes) => {
  const Orders = sequelize.define("Orders", {
    orderDetails: {
      type: DataTypes.JSON,
      allowNull: true,
      // validate: {
      //   isJSON: true,
      // },
    },
    message: {
      type: DataTypes.STRING,
      allowNull: true,
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
