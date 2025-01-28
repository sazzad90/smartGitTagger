const express = require('express');
const router = express.Router();
const { Repository } = require('../models'); // Import Repository model

// GET all repositories
router.get('/', async (req, res) => {
  try {
    const repositories = await Repository.findAll(); // Retrieve all repositories
    res.status(200).json({"repositories": "nothing found"});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch repositories' });
  }
});

// GET a single repository by URL
router.get('/:url', async (req, res) => {
  try {
    const repository = await Repository.findOne({
      where: { url: req.params.url },
    }); // Find repository by URL
    if (repository) {
      res.status(200).json(repository);
    } else {
      res.status(404).json({ error: 'Repository not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch repository' });
  }
});

// POST a new repository
router.post('/', async (req, res) => {
  const { url, readme } = req.body;
  try {
    const newRepository = await Repository.create({
      url,
      readme,
    }); // Create a new repository record
    res.status(201).json(newRepository);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create repository' });
  }
});

// PUT (update) an existing repository
router.put('/:url', async (req, res) => {
  try {
    const repository = await Repository.findOne({
      where: { url: req.params.url },
    });
    if (repository) {
      await repository.update(req.body); // Update the repository
      res.status(200).json(repository);
    } else {
      res.status(404).json({ error: 'Repository not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update repository' });
  }
});

// DELETE a repository by URL
router.delete('/:url', async (req, res) => {
  try {
    const repository = await Repository.findOne({
      where: { url: req.params.url },
    });
    if (repository) {
      await repository.destroy(); // Delete the repository
      res.status(200).json({ message: 'Repository deleted successfully' });
    } else {
      res.status(404).json({ error: 'Repository not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete repository' });
  }
});

module.exports = router;
