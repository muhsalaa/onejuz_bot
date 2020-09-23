const mongoose = require('mongoose');

const connectDB = () => {
  mongoose
    .connect(
      `mongodb://${'botadmin'}:${'asdEQWE#aSD'}@${'127.0.0.1:27017'}/${'onejuz_bot'}`,
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      }
    )
    .then(() => {
      console.log('connected to mongo');
    })
    .catch((err) => {
      throw err;
    });
};

module.exports = connectDB;
