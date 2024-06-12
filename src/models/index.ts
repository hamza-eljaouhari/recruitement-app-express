import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import User from './User';

dotenv.config();

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE!,
  process.env.MYSQL_USER!,
  process.env.MYSQL_PASSWORD!,
  {
    host: process.env.MYSQL_HOST!,
    dialect: 'mysql',
    logging: false,
  }
);

// Initialize the User model
User.initialize(sequelize);

// Export the models and the sequelize instance
const models = {
  User,
};

export { sequelize };
export default models;
