module.exports = (sequelize, DataTypes) => {
  const Items = sequelize.define("Items", {
    itemName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    unitPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        notEmpty: true,
        isDecimal: true,
      },
    },
    supplierPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        notEmpty: true,
        isDecimal: true,
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    botnicalName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    barcodeNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    cooled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    crushed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    reacted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

  Items.associate = (models) => {
    Items.belongsToMany(models.Products, {
      through: "ProductItems",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    Items.belongsToMany(models.Users, {
      through: "UserItems",
      foreignKey: "ItemId",
      otherKey: "UserId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  // // Hook to update the related product and productExports when an item is updated
  // Items.addHook("afterUpdate", async (item, options) => {
  //   // Update the related product
  //   await models.Products.update(
  //     { productName: "Updated Product Name" }, // Update with the new values as needed
  //     { where: { id: item.productId }, transaction: options.transaction }
  //   );

  //   // Update the related records in ProductExports
  //   await models.ProductExports.update(
  //     {
  //       /* update fields for ProductExports */
  //     },
  //     { where: { itemId: item.id }, transaction: options.transaction }
  //   );
  // });

  // // Hook to update the related product and productExports when an item is deleted
  // Items.addHook("beforeDestroy", async (item, options) => {
  //   // Update the related product
  //   await models.Products.update(
  //     { productName: "Updated Product Name" }, // Update with the new values as needed
  //     { where: { id: item.productId }, transaction: options.transaction }
  //   );

  //   // Delete the related records in ProductExports
  //   await models.ProductExports.destroy({
  //     where: { itemId: item.id },
  //     transaction: options.transaction,
  //   });
  // });

  return Items;
};
