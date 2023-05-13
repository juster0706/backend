"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Users, {
        targetKey: "user_id",
        foreignKey: "user_id",
      });

      this.hasMany(models.Likes, {
        sourceKey: "post_id",
        foreignKey: "post_id",
      });

      this.hasMany(models.Comments, {
        sourceKey: "post_id",
        foreignKey: "post_id",
      });
    }
  }
  Posts.init(
    {
      post_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      user_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "Users", // Users 모델을 참조합니다.
          key: "user_id", // Users 모델의 userId를 참조합니다.
        },
        onDelete: "CASCADE",
      },
      nickname: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      content: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      photo_url: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      likes: {
        allowNull: false,
        defaultValue: 0,
        type: DataTypes.INTEGER,
      },
      views: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      price: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      location: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        defaultValue: DataTypes.NOW,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        defaultValue: DataTypes.NOW,
        type: DataTypes.DATE,
      },
      current_status: {
        allowNull: false,
        defaultValue: false,
        type: DataTypes.BOOLEAN,
      },

    },
    {
      sequelize,
      modelName: "Posts",
    }
  );
  return Posts;
};
