import { Sequelize } from 'sequelize';

const {
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_HOST,
  MYSQL_ALLOW_EMPTY_PASSWORD,
} = process.env;

console.log("process.env.MYSQL_DATABASE", MYSQL_DATABASE);
console.log("process.env.MYSQL_USER", MYSQL_USER);
console.log("process.env.MYSQL_PASSWORD", MYSQL_PASSWORD);
console.log("process.env.MYSQL_HOST", MYSQL_HOST);
console.log("process.env.MYSQL_ALLOW_EMPTY_PASSWORD", MYSQL_ALLOW_EMPTY_PASSWORD);

const sequelize = new Sequelize(
  MYSQL_DATABASE!,
  MYSQL_USER!,
  MYSQL_ALLOW_EMPTY_PASSWORD === 'true' ? '' : MYSQL_PASSWORD!,
  {
    host: MYSQL_HOST!,
    dialect: 'mysql',
    logging: true,
  }
);

export default sequelize;
