import { DataTypes, Model } from 'sequelize';

class Repositories extends Model {
  static initialize(sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        url: {
          type: DataTypes.STRING(255),
          // unique: true,
          allowNull: false,
        },
        readme: {
          type: DataTypes.TEXT('long'),
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: 'Repositories',
        tableName: 'repositories',
        timestamps: true,
      }
    );
  }
}
export default Repositories
