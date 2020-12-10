import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';

// ------------ Local User Model ------------//
import User from '../models/user.js';

export default function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      // ------------ User Matching ------------//
      User.findOne({
        email,
      }).then((user) => {
        if (!user) {
          return done(null, false, { message: 'Địa chỉ email này chưa được đăng ký' });
        }

        // ------------ Password Matching ------------//
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          }
          return done(null, false, { message: 'Mật khẩu không đúng. Vui lòng thử lại.' });
        });
      });
    }),
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
}
