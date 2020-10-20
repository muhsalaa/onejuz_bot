const mongoose = require('mongoose');

//mongodb+srv://onejuz:<password>@cluster0.hpwr0.mongodb.net/<dbname>?retryWrites=true&w=majority

const connectDB = () => {
  mongoose
    .connect(
      // `mongodb://${'botadmin'}:${'asdEQWE#aSD'}@${'127.0.0.1:27017'}/${'onejuz_bot'}`,
      process.env.MONGO_URI,
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
