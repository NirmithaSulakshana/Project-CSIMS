module.exports = (sequelize, DataTypes) => {
  const UserItems = sequelize.define("UserItems", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false,
    },
    ItemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  });

  return UserItems;
};
