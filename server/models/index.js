import Repositories from './repositories.js';
import Topics from './topics.js';
import sequelize from '../config/database.js'


// Initialize models
Repositories.initialize(sequelize);
Topics.initialize(sequelize);

// Define associations
Repositories.hasMany(Topics, {
  foreignKey: 'repository_url', // Foreign key in the Topics table
  sourceKey: 'url', // Primary key in the Repositories table
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Topics.belongsTo(Repositories, {
  foreignKey: 'repository_url', // Foreign key in the Topics table
  targetKey: 'url', // Primary key in the Repositories table
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

export { sequelize, Repositories, Topics };
