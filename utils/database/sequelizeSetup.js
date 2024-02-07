// Reference: The following code has been referenced from the link https://sequelize.org/docs/v6/getting-started/
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER_NAME,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST_URL,
    dialect: "postgres",
  }
);

export default sequelize;
