const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "users",
    {
      user_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      user_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      user_password: {
        type: DataTypes.STRING,
      },
      user_image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      total_orders: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      last_logged_in: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      hooks: {
        beforeCreate: (user) => {
          user.user_id = uuidv4(); // Generate UUIDv4 for user_id before creating
        },
      },
    }
  );

  return User;
};
