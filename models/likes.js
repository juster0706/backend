"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Likes extends Model {
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

      this.belongsTo(models.Posts, {
        targetKey: "post_id",
        foreignKey: "post_id",
      });

      this.belongsTo(models.Comments, {
        targetKey: "comment_id",
        foreignKey: "comment_id",
      });
    }
  }
  Likes.init(
    {
      like_id: {
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
        onDelete: "CASCADE", // 만약 Users 모델의 userId가 삭제되면, Posts 모델의 데이터가 삭제됩니다.
      },
      post_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "Posts",
          key: "post_id",
        },
        onDelete: "CASCADE",
      },
      comment_id: {
        allowNull: true,
        type: DataTypes.INTEGER,
        references: {
          model: "Comments",
          key: "comment_id",
        },
        onDelete: "CASCADE",
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
    },
    {
      sequelize,
      modelName: "Likes",
    }
  );
  return Likes;
};
