const { Sequelize } = require('sequelize');
const sequelize = require('../config/database');

// Import models
const Repositories = require('./repositories');
const Topics = require('./topics');

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

module.exports = {
  sequelize,
  Repositories,
  Topics,
};