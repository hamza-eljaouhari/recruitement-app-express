import { Sequelize } from 'sequelize';

console.log("process.env.MYSQL_DATABASE", process.env.MYSQL_DATABASE)
console.log("process.env.MYSQL_USER", process.env.MYSQL_USER)
console.log("process.env.MYSQL_PASSWORD", process.env.MYSQL_PASSWORD)
console.log("process.env.MYSQL_HOST", process.env.MYSQL_HOST)

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

export default sequelize;
