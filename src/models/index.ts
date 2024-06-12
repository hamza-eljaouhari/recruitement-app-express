import User from './user';
import sequelize from '../config/sequelize';

const models = { User };

export const initializeModels = async () => {
  await sequelize.sync();
};

export default models;
