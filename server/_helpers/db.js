import mongoose from 'mongoose';
import Account from '../accounts/account.model.js';
import RefreshToken from '../accounts/refresh-token.model.js';

function isValidId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

export default {
  Account,
  RefreshToken,
  isValidId,
};
