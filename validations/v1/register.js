import Joi from 'joi';

export default {
  body: {
    name: Joi.string().required(),
    description: Joi.string().required(),
  },
};
