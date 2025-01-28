import express from 'express';
import axios from 'axios';
import { Topics } from '../models/index.js';  // Import Repositories model
const topicsRouter = express.Router();

// generate topics
topicsRouter.post('/topic-generation', async (req, res) => {
  try {
    const test_readme = req.body.test_readme;
    console.log("at backend: ", test_readme);
    
    const response = await axios.post('http://localhost:8000/topic-generation', {test_readme: test_readme});
    console.log('rd: ', response.data);
        res.status(201).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate topic' });
  }
});

// GET all topics
topicsRouter.get('/', async (req, res) => {
  try {
    const topics = await Topics.findAll(); // Retrieve all topics
    res.status(200).json(topics);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch topics' });
  }
});

// GET a single topic by ID
topicsRouter.get('/:id', async (req, res) => {
  try {
    const topic = await Topics.findByPk(req.params.id); // Find topic by primary key
    if (topic) {
      res.status(200).json(topic);
    } else {
      res.status(404).json({ error: 'Topic not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch topic' });
  }
});

// POST a new topic
topicsRouter.post('/', async (req, res) => {
  const { repository_url, existing_tags, selected_tags } = req.body;
  try {
    const newTopic = await Topics.create({
      repository_url,
      existing_tags,
      selected_tags,
    }); // Create a new topic record
    res.status(201).json(newTopic);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create topic' });
  }
});

// PUT (update) an existing topic
topicsRouter.put('/:id', async (req, res) => {
  try {
    const topic = await Topics.findByPk(req.params.id);
    if (topic) {
      await topic.update(req.body); // Update the topic
      res.status(200).json(topic);
    } else {
      res.status(404).json({ error: 'Topic not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update topic' });
  }
});

// DELETE a topic by ID
topicsRouter.delete('/:id', async (req, res) => {
  try {
    const topic = await Topics.findByPk(req.params.id);
    if (topic) {
      await topic.destroy(); // Delete the topic
      res.status(200).json({ message: 'Topic deleted successfully' });
    } else {
      res.status(404).json({ error: 'Topic not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete topic' });
  }
});

export default topicsRouter; 