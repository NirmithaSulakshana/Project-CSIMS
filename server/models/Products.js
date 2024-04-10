module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define("Products", {
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });

  Products.associate = (models) => {
    Products.belongsToMany(models.Items, {
      through: "ProductItems",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    Products.belongsToMany(models.Users, {
      through: "ProductExports",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Products;
};
