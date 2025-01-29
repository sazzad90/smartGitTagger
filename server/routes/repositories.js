import express from 'express';
import axios from 'axios';
import { Repositories } from '../models/index.js';  // Import Repositories model

const repositoriesRouter = express.Router();

// GET all repositories
repositoriesRouter.get('/', async (req, res) => {
  try {
    try {
      const repositories = await Repositories.findAll();
      res.status(200).send(repositories);
    } catch (error) {
      console.error('Error calling FastAPI POST:', error);
      res.status(500).send('Error calling FastAPI server');
    }
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch repositories' });
  }
});

// GET a single Repositories by URL
repositoriesRouter.get('/:url', async (req, res) => {
  try {
    const repositories = await Repositories.findOne({
      where: { url: req.params.url },
    }); // Find Repositories by URL
    if (repositories) {
      res.status(200).json(repositories);
    } else {
      res.status(404).json({ error: 'Repositories not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch Repositories' });
  }
});

// POST a new Repositories
repositoriesRouter.post('/', async (req, res) => {
  console.log('rq.body: ', req.body);
  
  const { url, readme, existing_topics, selected_topics } = req.body;
  
  try {
    const newRepositories = await Repositories.create({
      url : url,
      readme : readme,
    });

    console.log('newRepositories: ', newRepositories);

    const topicsApiResponse = await axios.post('http://localhost:5001/api/topics/', {
      url: url,
      existing_topics: existing_topics,
      selected_Topics: selected_topics
    });
    console.log('topicsApiResponse: ', topicsApiResponse);

    res.status(201).json(newRepositories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create Repositories' });
  }
});

// PUT (update) an existing Repositories
repositoriesRouter.put('/:url', async (req, res) => {
  try {
    const repositories = await Repositories.findOne({
      where: { url: req.params.url },
    });
    if (repositories) {
      await Repositories.update(req.body); // Update the Repositories
      res.status(200).json(repositories);
    } else {
      res.status(404).json({ error: 'Repositories not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update Repositories' });
  }
});

// DELETE a Repositories by URL
repositoriesRouter.delete('/:url', async (req, res) => {
  try {
    const repositories = await Repositories.findOne({
      where: { url: req.params.url },
    });
    if (repositories) {
      await Repositories.destroy(); // Delete the Repositories
      res.status(200).json({ message: 'Repositories deleted successfully' });
    } else {
      res.status(404).json({ error: 'Repositories not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete Repositories' });
  }
});

export default repositoriesRouter; 