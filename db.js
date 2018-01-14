const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/crud-forum', {useMongoClient: true}, () => {
  console.log('Database connection established');
});
module.exports = mongoose;
