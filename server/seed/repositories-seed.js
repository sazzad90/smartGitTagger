import Repositories from '../models/repositories.js';

async function seedRepositories() {
  try {
    // Insert dummy repositories
    const repo1 = await Repositories.create({
      url: 'https://github.com/user/repo1',
      readme: 'This is the README for repo1.',
    });

    const repo2 = await Repositories.create({
      url: 'https://github.com/user/repo2',
      readme: 'This is the README for repo2.',
    });

    console.log('Repositories created:', repo1.toJSON(), repo2.toJSON());
  } catch (error) {
    console.error('Error seeding repositories:', error);
  }
}
export default seedRepositories
