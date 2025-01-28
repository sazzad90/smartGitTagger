const { DataTypes, Model } = require('sequelize');

class Topics extends Model {
  static initialize(sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        repository_url: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        existing_tags: {
          type: DataTypes.TEXT('long'),
          allowNull: true,
        },
        selected_tags: {
          type: DataTypes.TEXT('long'),
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: 'Topics',
        tableName: 'topics',
        timestamps: true,
        indexes: [
          {
            unique: false,
            fields: ['repository_url'],
          },
        ],
      }
    );
  }
}

module.exports = Topics;