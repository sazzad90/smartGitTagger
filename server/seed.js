import dotenv from 'dotenv';
dotenv.config();
import * as models from './models/index.js'; // Import the entire models object
import seedTopics from './seed/topics-seed.js';
import seedRepositories from './seed/repositories-seed.js';


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