const express = require('express');
const router = express.Router();
const { Topic } = require('../models'); // Import Topic model

// GET all topics
router.get('/', async (req, res) => {
  try {
    const topics = await Topic.findAll(); // Retrieve all topics
    res.status(200).json(topics);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch topics' });
  }
});

// GET a single topic by ID
router.get('/:id', async (req, res) => {
  try {
    const topic = await Topic.findByPk(req.params.id); // Find topic by primary key
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
router.post('/', async (req, res) => {
  const { repository_url, existing_tags, selected_tags } = req.body;
  try {
    const newTopic = await Topic.create({
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
router.put('/:id', async (req, res) => {
  try {
    const topic = await Topic.findByPk(req.params.id);
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
router.delete('/:id', async (req, res) => {
  try {
    const topic = await Topic.findByPk(req.params.id);
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

module.exports = router;
