require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { sequelize, Repositories, Topics } = require('./models'); // Import models

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
const repositoriesRoutes = require('./routes/repositories');
const topicsRoutes = require('./routes/topics');

app.use('/api/topics', topicsRoutes);
app.use('/api/repositories', repositoriesRoutes);

// Test Route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// db connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to the database!');
    // Sync the models with the database
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    console.log('Database synced successfully!');
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.error('Unable to connect to the database', error));