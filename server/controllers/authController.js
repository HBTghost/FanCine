import passport from 'passport';
import bcryptjs from 'bcryptjs';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import jwt from 'jsonwebtoken';

// ------------ User Model ------------//
import User from '../models/User.js';

const { OAuth2 } = google.auth;
const JWT_KEY = 'jwtactive987';
const JWT_RESET_KEY = 'jwtreset987';

// ------------ Register Handle ------------//
function registerHandle(req, res) {
  const {
    name, email, password, password2,
  } = req.body;
  const errors = [];

  // ------------ Checking required fields ------------//
  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  // ------------ Checking password mismatch ------------//
  if (password !== password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  // ------------ Checking password length ------------//
  if (password.length < 8) {
    errors.push({ msg: 'Password must be at least 8 characters' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2,
    });
  } else {
    // ------------ Validation passed ------------//
    User.findOne({ email }).then((user) => {
      if (user) {
        // ------------ User already exists ------------//
        errors.push({ msg: 'Email ID already registered' });
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2,
        });
      } else {
        const oauth2Client = new OAuth2(
          '173872994719-pvsnau5mbj47h0c6ea6ojrl7gjqq1908.apps.googleusercontent.com', // ClientID
          'OKXIYR14wBB_zumf30EC__iJ', // Client Secret
          'https://developers.google.com/oauthplayground', // Redirect URL
        );

        oauth2Client.setCredentials({
          refresh_token: '1//04T_nqlj9UVrVCgYIARAAGAQSNwF-L9IrGm-NOdEKBOakzMn1cbbCHgg2ivkad3Q_hMyBkSQen0b5ABfR8kPR18aOoqhRrSlPm9w',
        });
        const accessToken = oauth2Client.getAccessToken();

        const token = jwt.sign({ name, email, password }, JWT_KEY, { expiresIn: '30m' });
        const CLIENT_URL = `https://${req.headers.host}`;

        const output = `
                <h2>Please click on below link to activate your account</h2>
                <p>${CLIENT_URL}/activate/${token}</p>
                <p><b>NOTE: </b> The above activation link expires in 30 minutes.</p>
                `;

        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            type: 'OAuth2',
            user: 'nodejsa@gmail.com',
            clientId: '173872994719-pvsnau5mbj47h0c6ea6ojrl7gjqq1908.apps.googleusercontent.com',
            clientSecret: 'OKXIYR14wBB_zumf30EC__iJ',
            refreshToken: '1//04T_nqlj9UVrVCgYIARAAGAQSNwF-L9IrGm-NOdEKBOakzMn1cbbCHgg2ivkad3Q_hMyBkSQen0b5ABfR8kPR18aOoqhRrSlPm9w',
            accessToken,
          },
        });

        // send mail with defined transport object
        const mailOptions = {
          from: '"Auth Admin" <fancine@gmail.com>', // sender address
          to: email, // list of receivers
          subject: 'Account Verification: NodeJS Auth ✔', // Subject line
          generateTextFromHTML: true,
          html: output, // html body
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
            req.flash(
              'error_msg',
              'Something went wrong on our end. Please register again.',
            );
            res.redirect('/login');
          } else {
            console.log('Mail sent : %s', info.response);
            req.flash(
              'success_msg',
              'Activation link sent to email ID. Please activate to log in.',
            );
            res.redirect('/login');
          }
        });
      }
    });
  }
}

// ------------ Activate Account Handle ------------//
function activateHandle(req, res) {
  const { token } = req.params;
  const errors = [];
  if (token) {
    jwt.verify(token, JWT_KEY, (err, decodedToken) => {
      if (err) {
        req.flash(
          'error_msg',
          'Incorrect or expired link! Please register again.',
        );
        res.redirect('/register');
      } else {
        const { name, email, password } = decodedToken;
        User.findOne({ email }).then((user) => {
          if (user) {
            // ------------ User already exists ------------//
            req.flash(
              'error_msg',
              'Email ID already registered! Please log in.',
            );
            res.redirect('/login');
          } else {
            const newUser = new User({
              name,
              email,
              password,
            });

            bcryptjs.genSalt(10, (err1, salt) => {
              bcryptjs.hash(newUser.password, salt, (err2, hash) => {
                if (err2) throw err2;
                newUser.password = hash;
                newUser
                  .save()
                  .then((user1) => {
                    req.flash(
                      'success_msg',
                      'Account activated. You can now log in.',
                    );
                    res.redirect('/login');
                  })
                  .catch((err3) => console.log(err3));
              });
            });
          }
        });
      }
    });
  } else {
    console.log('Account activation error!');
  }
}

// ------------ Forgot Password Handle ------------//
function forgotPassword(req, res) {
  const { email } = req.body;

  const errors = [];

  // ------------ Checking required fields ------------//
  if (!email) {
    errors.push({ msg: 'Please enter an email ID' });
  }

  if (errors.length > 0) {
    res.render('forgot', {
      errors,
      email,
    });
  } else {
    User.findOne({ email }).then((user) => {
      if (!user) {
        // ------------ User already exists ------------//
        errors.push({ msg: 'User with Email ID does not exist!' });
        res.render('forgot', {
          errors,
          email,
        });
      } else {
        const oauth2Client = new OAuth2(
          '173872994719-pvsnau5mbj47h0c6ea6ojrl7gjqq1908.apps.googleusercontent.com', // ClientID
          'OKXIYR14wBB_zumf30EC__iJ', // Client Secret
          'https://developers.google.com/oauthplayground', // Redirect URL
        );

        oauth2Client.setCredentials({
          refresh_token: '1//04T_nqlj9UVrVCgYIARAAGAQSNwF-L9IrGm-NOdEKBOakzMn1cbbCHgg2ivkad3Q_hMyBkSQen0b5ABfR8kPR18aOoqhRrSlPm9w',
        });
        const accessToken = oauth2Client.getAccessToken();

        const token = jwt.sign({ _id: user._id }, JWT_RESET_KEY, { expiresIn: '30m' });
        const CLIENT_URL = `http://${req.headers.host}`;
        const output = `
                <h2>Please click on below link to reset your account password</h2>
                <p>${CLIENT_URL}/forgot/${token}</p>
                <p><b>NOTE: </b> The activation link expires in 30 minutes.</p>
                `;

        User.updateOne({ resetLink: token }, (err, success) => {
          if (err) {
            errors.push({ msg: 'Error resetting password!' });
            res.render('forgot', {
              errors,
              email,
            });
          } else {
            const transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                type: 'OAuth2',
                user: 'nodejsa@gmail.com',
                clientId: '173872994719-pvsnau5mbj47h0c6ea6ojrl7gjqq1908.apps.googleusercontent.com',
                clientSecret: 'OKXIYR14wBB_zumf30EC__iJ',
                refreshToken: '1//04T_nqlj9UVrVCgYIARAAGAQSNwF-L9IrGm-NOdEKBOakzMn1cbbCHgg2ivkad3Q_hMyBkSQen0b5ABfR8kPR18aOoqhRrSlPm9w',
                accessToken,
              },
            });

            // send mail with defined transport object
            const mailOptions = {
              from: '"Auth Admin" <fancine@gmail.com>', // sender address
              to: email, // list of receivers
              subject: 'Account Password Reset: NodeJS Auth ✔', // Subject line
              html: output, // html body
            };

            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.log(error);
                req.flash(
                  'error_msg',
                  'Something went wrong on our end. Please try again later.',
                );
                res.redirect('/forgot');
              } else {
                console.log('Mail sent : %s', info.response);
                req.flash(
                  'success_msg',
                  'Password reset link sent to email ID. Please follow the instructions.',
                );
                res.redirect('/login');
              }
            });
          }
        });
      }
    });
  }
}

// ------------ Redirect to Reset Handle ------------//
function gotoReset(req, res) {
  const { token } = req.params;

  if (token) {
    jwt.verify(token, JWT_RESET_KEY, (err, decodedToken) => {
      if (err) {
        req.flash(
          'error_msg',
          'Incorrect or expired link! Please try again.',
        );
        res.redirect('/login');
      } else {
        const { _id } = decodedToken;
        User.findById(_id, (err1, user) => {
          if (err1) {
            req.flash(
              'error_msg',
              'User with email ID does not exist! Please try again.',
            );
            res.redirect('/login');
          } else {
            res.redirect(`/reset/${_id}`);
          }
        });
      }
    });
  } else {
    console.log('Password reset error!');
  }
}

function resetPassword(req, res) {
  let { password, password2 } = req.body;
  const { id } = req.params;
  const errors = [];

  // ------------ Checking required fields ------------//
  if (!password || !password2) {
    req.flash(
      'error_msg',
      'Please enter all fields.',
    );
    res.redirect(`/reset/${id}`);
  } else if (password.length < 8) {
    req.flash(
      'error_msg',
      'Password must be at least 8 characters.',
    );
    res.redirect(`/reset/${id}`);
  } else if (password !== password2) {
    req.flash(
      'error_msg',
      'Passwords do not match.',
    );
    res.redirect(`/reset/${id}`);
  } else {
    bcryptjs.genSalt(10, (err, salt) => {
      bcryptjs.hash(password, salt, (err1, hash) => {
        if (err1) throw err1;
        password = hash;

        User.findByIdAndUpdate(
          { _id: id },
          { password },
          (err2, result) => {
            if (err2) {
              req.flash(
                'error_msg',
                'Error resetting password!',
              );
              res.redirect(`/reset/${id}`);
            } else {
              req.flash(
                'success_msg',
                'Password reset successfully!',
              );
              res.redirect('/login');
            }
          },
        );
      });
    });
  }
}

// ------------ Login Handle ------------//
function loginHandle(req, res, next) {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
  })(req, res, next);
}

// ------------ Logout Handle ------------//
function logoutHandle(req, res) {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/login');
}

export default {
  registerHandle,
  activateHandle,
  forgotPassword,
  gotoReset,
  resetPassword,
  loginHandle,
  logoutHandle,
};
