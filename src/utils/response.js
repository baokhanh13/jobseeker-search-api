const omitEmpty = require('omit-empty');

module.exports = ({ message = 'ok', data }) => omitEmpty({ message, data });
