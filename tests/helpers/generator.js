/* eslint-disable no-param-reassign */
import faker from 'faker';

export const fakeRecord = schema => Object.keys(schema).reduce((entity, key) => {
  entity[key] = faker.fake(schema[key]);
  return entity;
}, {});

export default (schema, min = 1, max) => {
  max = max || min;

  if (min > 1) {
    return Array.from({
      length: faker.random.number({ min, max }),
    }).map(() => fakeRecord(schema));
  }

  return fakeRecord(schema);
};
