import { celebrate } from 'celebrate';
import uuidv4 from 'uuid/v4';

import Application from '../../models/Application';
import registerValidation from '../../validations/v1/register';

const register = async (req, res) => {
  const apiKey = uuidv4();
  const { name, description } = req.body;

  const application = await Application.create({
    name,
    description,
    apiKey,
  });

  res.json({
    apiKey: application.get('apiKey'),
  });
};

export const autoroute = {
  postAsync: {
    '/register': [celebrate(registerValidation), register],
  },
};
