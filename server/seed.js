const models = require('./models'); // Import the entire models object
const seedRepositories = require('./seed/repositories-seed');
const seedTopics = require('./seed/topics-seed');

const { sequelize, Repositories, Topics } = models; // Destructure from the models object

async function seed() {
  try {
    // Sync the database (optional, ensures tables exist)
    await sequelize.sync({ alter: true });
    console.log('Database synced!');

    // Seed repositories
    await seedRepositories();

    // Seed topics
    await seedTopics();

    console.log('Dummy data inserted successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    // Close the database connection
    await sequelize.close();
  }
}

// Run the seed function
seed();