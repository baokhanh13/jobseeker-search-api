require('dotenv').config();
const { Joi } = require('express-validation');

const envVarsSchema = Joi.object()
  .keys({
    PORT: Joi.number().positive(),
    DIALECT: Joi.string().valid('mysql'),
    DATABASE_NAME: Joi.string().required(),
    DATABASE_USER: Joi.string().required(),
    DATABASE_PASS: Joi.string().required(),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: process.env.NODE_ENV,
  port: envVars.PORT,
  db: {
    dialect: envVars.DIALECT || 'mysql',
    database: envVars.DATABASE_NAME,
    username: envVars.DATABASE_USER,
    password: envVars.DATABASE_PASS,
  },
};
