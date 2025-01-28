import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import {sequelize} from './models/index.js';
import repositoriesRouter from './routes/repositories.js';
import topicsRouter from './routes/topics.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
// const repositoriesRouter = require('./routes/repositories');
// const topicsRouter = require('./routes/topics');

app.use('/api/topics', topicsRouter);
app.use('/api/repositories', repositoriesRouter);

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