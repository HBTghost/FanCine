import mongoose from 'mongoose';
import dotenv from 'dotenv';
import config from '../config.json';

import Account from '../accounts/account.model.js';
import RefreshToken from '../accounts/refresh-token.model.js';

dotenv.config();

const connectionOptions = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

mongoose.connect(process.env.MONGODB_URI || config.connectionString, connectionOptions);

const db = mongoose.connection;
db.on('error', (err) => console.error(err));
db.once('open', () => console.log('Connected to Database'));

mongoose.Promise = global.Promise;

function isValidId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

export default {
  Account,
  RefreshToken,
  isValidId,
};
