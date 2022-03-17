const app = require('./app');
const sequelize = require('./utils/db');
const logger = require('./utils/logger');

async function run() {
  await sequelize.authenticate();
  logger.info('Db connect sucessfuly');
  const port = process.env.PORT || 3000;
  app.listen(port, () => logger.info(`App listening on port ${port}`));
}

run().catch((e) => {
  logger.error(e);
  process.exit(0);
});
