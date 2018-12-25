import faker from 'faker';

export default {
  name: faker.random.words(),
  description: faker.random.words(),
  apiKey: faker.random.uuid(),
  createdAt: faker.date.past(),
  updatedAt: faker.date.past(),
};
