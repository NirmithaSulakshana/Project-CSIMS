module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    mobileNo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    status: {
      type: DataTypes.ENUM("approved", "pending"),
      allowNull: false,
      defaultValue: "pending", // You can set a default value if needed
      validate: {
        notEmpty: true,
        isIn: [["approved", "pending"]],
      },
    },
  });

  Users.associate = (models) => {
    Users.belongsToMany(models.Products, {
      through: "ProductExports",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    Users.belongsToMany(models.Items, {
      through: "UserItems",
      foreignKey: "UserId",
      otherKey: "ItemId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  // Users.addHook("afterUpdate", async (user, options) => {
  //   // Update related products or perform other actions as needed
  //   await models.Products.update(
  //     {
  //       /* update fields for Products based on user changes */
  //     },
  //     {
  //       where: {
  //         /* condition based on user changes */
  //       },
  //       transaction: options.transaction,
  //     }
  //   );
  // });

  // Users.addHook("beforeDestroy", async (user, options) => {
  //   // Delete related records in ProductExports
  //   await models.ProductExports.destroy({
  //     where: { userId: user.id },
  //     transaction: options.transaction,
  //   });
  // });

  return Users;
};
