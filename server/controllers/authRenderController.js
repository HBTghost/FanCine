import passport from 'passport';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import sendEmail from '../helpers/sendEmail.js';
import config from '../config.json';

// ------------ User Model ------------//
import User from '../models/user.js';

// ------------ Register Handle ------------//
function registerHandle(req, res) {
  const { name, email, password, password2, phone, DoB, sex, address, city, town } = req.body;
  const errors = [];

  // ------------ Checking required fields ------------//
  if (!name || !email || !password || !password2 || !phone) {
    errors.push({ msg: 'Vui lòng điền tất cả các trường.' });
  }

  // ------------ Checking password mismatch ------------//
  if (password !== password2) {
    errors.push({ msg: 'Mật khẩu không khớp.' });
  }

  // ------------ Checking password length ------------//
  if (password.length < 8) {
    errors.push({ msg: 'Mật khẩu phải có ít nhất 8 ký tự.' });
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
    User.findOne({ email }).then(async (user) => {
      if (user) {
        // ------------ User already exists ------------//
        errors.push({ msg: 'Địa chỉ email đã được đăng ký bởi một ai khác.' });
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2,
        });
      } else {
        const token = jwt.sign(
          { name, email, password, phone, DoB, sex, address, city, town },
          config.secret,
          { expiresIn: '30m' },
        );
        const CLIENT_URL = req.headers.origin;

        const output = `
                <h2>Vui lòng nhấn vào link bên dưới để kích hoạt tài khoản.</h2>
                <p>${CLIENT_URL}/render/activate/${token}</p>
                <p><b>CHÚ Ý: </b> Link kích hoạt trên sẽ hết hạn trong vòng 30 phút.</p>
                `;

        const mailOptions = {
          to: email, // list of receivers
          subject: 'Xác thực tài khoản FanCine ✔', // Subject line
          generateTextFromHTML: true,
          html: output, // html body
        };

        try {
          await sendEmail(mailOptions);
          req.flash(
            'success_msg',
            'Link kích hoạt tài khoản đã được gởi đến email của bạn. Vui lòng kiểm tra hòm thư và kích hoạt tài khoản để đăng nhập. (Chú ý: Link kích hoạt sẽ hết hạn trong 30 phút)',
          );
        } catch (error) {
          req.flash('error_msg', 'Một số lỗi không mong muốn đã xảy ra. Vui lòng đăng ký lại.');
        }
        res.redirect('/render/login');
      }
    });
  }
}

// ------------ Activate Account Handle ------------//
function activateHandle(req, res) {
  const { token } = req.params;
  const errors = [];
  if (token) {
    jwt.verify(token, config.secret, (err, decodedToken) => {
      if (err) {
        req.flash(
          'error_msg',
          'Link kích hoạt không hợp lệ hoặc đã hết hạn. Bạn vui lòng đăng ký lại.',
        );
        res.redirect('/render/register');
      } else {
        const { name, email, password, phone, DoB, sex, address, city, town } = decodedToken;
        User.findOne({ email }).then((user) => {
          if (user) {
            // ------------ User already exists ------------//
            req.flash('error_msg', 'Địa chỉ email đã tồn đại. Vui lòng đăng nhập.');
            res.redirect('/render/login');
          } else {
            const newUser = new User({
              name,
              email,
              password,
              phone,
              DoB,
              sex,
              address,
              city,
              town,
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
                      'Tài khoản được kích hoạt thành công. Bạn có thể đăng nhập ngay',
                    );
                    res.redirect('/render/login');
                  })
                  .catch((err3) => console.log(err3));
              });
            });
          }
        });
      }
    });
  } else {
    console.log('Lỗi khi kích hoạt tài khoản!');
  }
}

// ------------ Forgot Password Handle ------------//
function forgotPassword(req, res) {
  const { email } = req.body;

  const errors = [];

  // ------------ Checking required fields ------------//
  if (!email) {
    errors.push({ msg: 'Vui lòng nhập địa chỉ email' });
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
        errors.push({ msg: 'Không tìm thấy tài khoản với email tương ứng!' });
        res.render('forgot', {
          errors,
          email,
        });
      } else {
        const token = jwt.sign({ _id: user._id }, config.secret, { expiresIn: '30m' });
        const CLIENT_URL = req.headers.origin;

        const output = `
                <h2>Đây là mã xác thực để cài lại mật khẩu cho tài khoản của bạn:</h2>
                <b style="color: green">${token}</b>
                <h2>Hoặc vui lòng nhấn vào link bên dưới để cài lại mật khẩu mới cho tài khoản của bạn:</h2>
                <p>${CLIENT_URL}/render/forgot/${token}</p>
                <p><b>CHÚ Ý: </b> Mã xác thực và link cài đặt lại mật khẩu trên sẽ hết hạn trong 30 phút.</p>
                `;

        User.updateOne({ resetLink: token }, async (err, success) => {
          if (err) {
            errors.push({ msg: 'Lỗi khi cài đặt lại mật khẩu!' });
            res.render('forgot', {
              errors,
              email,
            });
          } else {
            const mailOptions = {
              to: email, // list of receivers
              subject: 'Cài đặt lại mật khẩu tài khoản FanCine ✔', // Subject line
              html: output, // html body
            };

            try {
              await sendEmail(mailOptions);
              req.flash(
                'success_msg',
                'Link cài đặt lại mật khẩu đã được gởi đến email của bạn. Vui lòng kiểm tra hòm thư và làm theo hướng dẫn. (Chú ý: Link cài đặt lại mật khẩu sẽ hết hạn trong 30 phút)',
              );
              res.redirect('/render/login');
            } catch (error) {
              req.flash(
                'error_msg',
                'Một số lỗi không mong muốn đã xảy ra. Vui lòng thử lại vào lúc khác.',
              );
              res.redirect('/render/forgot');
            }
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
    jwt.verify(token, config.secret, (err, decodedToken) => {
      if (err) {
        req.flash(
          'error_msg',
          'Link cài đặt lại mật khẩu không hợp lệ hoặc đã hết hạn! Vui lòng thử lại.',
        );
        res.redirect('/render/login');
      } else {
        const { _id } = decodedToken;
        User.findById(_id, (err1, user) => {
          if (err1) {
            req.flash('error_msg', 'Không tìm thấy tài khoản ứng với email này. Vui lòng thử lại');
            res.redirect('/render/login');
          } else {
            res.redirect(`/reset/${_id}`);
          }
        });
      }
    });
  } else {
    console.log('Lỗi khi cài đặt lại mật khẩu!');
  }
}

function resetPassword(req, res) {
  let { password, password2 } = req.body;
  const { id } = req.params;

  // ------------ Checking required fields ------------//
  if (!password || !password2) {
    req.flash('error_msg', 'Vui lòng điền đầy đủ tất cả các trường.');
    res.redirect(`/reset/${id}`);
  } else if (password.length < 8) {
    req.flash('error_msg', 'Mật khẩu phải có ít nhất 8 kí tự.');
    res.redirect(`/reset/${id}`);
  } else if (password !== password2) {
    req.flash('error_msg', 'Mật khẩu không trùng khớp.');
    res.redirect(`/reset/${id}`);
  } else {
    bcryptjs.genSalt(10, (err, salt) => {
      bcryptjs.hash(password, salt, (err1, hash) => {
        if (err1) throw err1;
        password = hash;

        User.findByIdAndUpdate({ _id: id }, { password }, (err2, result) => {
          if (err2) {
            req.flash('error_msg', 'Lỗi khi cài đặt lại mật khẩu!');
            res.redirect(`/reset/${id}`);
          } else {
            req.flash(
              'success_msg',
              'Cài đặt lại mật khẩu thành công! Vui lòng đăng nhập với mật khẩu mới',
            );
            res.redirect('/render/login');
          }
        });
      });
    });
  }
}

// ------------ Login Handle ------------//
function loginHandle(req, res, next) {
  console.log(req.headers);
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
  })(req, res, next);
}

// ------------ Logout Handle ------------//
function logoutHandle(req, res) {
  req.logout();
  req.flash('success_msg', 'Đăng xuất thành công');
  res.redirect('/render/login');
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
