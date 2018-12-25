import mongoose from 'mongoose';
import log from './logger';

export default async (nconf) => {
  try {
    await mongoose.connect(nconf.get('database:mongoUrl'), { useNewUrlParser: true });
  } catch (error) {
    log.error(error);
  }
};
