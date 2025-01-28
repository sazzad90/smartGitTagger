const { Topics } = require('../models'); // Destructure Topics from models

async function seedTopics() {
  try {
    // Insert dummy topics
    const topic1 = await Topics.create({
      repository_url: 'https://github.com/user/repo1',
      existing_tags: 'tag1,tag2',
      selected_tags: 'tag1',
    });

    const topic2 = await Topics.create({
      repository_url: 'https://github.com/user/repo1',
      existing_tags: 'tag3,tag4',
      selected_tags: 'tag3',
    });

    const topic3 = await Topics.create({
      repository_url: 'https://github.com/user/repo2',
      existing_tags: 'tag5,tag6',
      selected_tags: 'tag5',
    });

    console.log('Topics created:', topic1.toJSON(), topic2.toJSON(), topic3.toJSON());
  } catch (error) {
    console.error('Error seeding topics:', error);
  }
}

module.exports = seedTopics;