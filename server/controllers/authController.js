import passport from 'passport';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import sendEmail from '../helpers/sendEmail.js';
import config from '../config.json';

// ------------ User Model ------------//
import User from '../models/user.js';

function getClientOrigin(req) {
  const url = new URL(req.headers.origin);
  return url.origin;
}

// ------------ Register Handle ------------//
function registerHandle(req, res) {
  const { name, email, password, password2, phone, DoB, sex, address, city, town } = req.body;
  console.log(req.body);

  if (!name || !email || !password || !password2 || !phone) {
    res.json({ message: 'Vui lòng điền tất cả các trường bắt buộc.' });
  } else if (password !== password2) {
    res.json({ message: 'Mật khẩu không khớp.' });
  } else if (password.length < 8) {
    res.json({ message: 'Mật khẩu phải có ít nhất 8 ký tự.' });
  } else {
    User.findOne({ email }).then(async (user) => {
      if (user) {
      // ------------ User already exists ------------//
        res.json({ message: `Địa chỉ email <b>${email}</b> đã được đăng ký bởi một ai khác.` });
      } else {
        const token = jwt.sign(
          { name, email, password, phone, DoB, sex, address, city, town },
          config.secret,
          { expiresIn: '30m' },
        );

        const output = `
              <h2>Đây là mã kích hoạt tài khoản của bạn:</h2>
              <b style="color: green">${token}</b>
              <h2>Hoặc vui lòng nhấn vào link bên dưới để kích hoạt tài khoản của bạn:</h2>
              <p>${getClientOrigin(req)}/render/activate/${token}</p>
              <p><b>CHÚ Ý: </b> Mã xác thực và link kích hoạt trên sẽ hết hạn trong vòng 30 phút.</p>
              `;

        const mailOptions = {
          to: email, // list of receivers
          subject: 'Xác thực tài khoản FanCine ✔', // Subject line
          generateTextFromHTML: true,
          html: output, // html body
        };

        try {
          await sendEmail(mailOptions);
          res.json({
            success_msg: `<p>Mã / Link kích hoạt tài khoản đã được gởi đến email <b>${email}.</b></p><p>Vui lòng kiểm tra hòm thư và kích hoạt tài khoản để đăng nhập.</p><p style='color: red'>(Hết hạn trong 30 phút)</p>`,
          });
        } catch (error) {
          console.log(error);
          res.json({
            message: '<p>Một số lỗi không mong muốn đã xảy ra.</p><p>Vui lòng đăng ký lại.</p>',
          });
        }
      // res.redirect('/login');
      }
    });
  }
}

// ------------ Activate Account Handle ------------//
function activateHandle(req, res) {
  const { token } = req.params;
  if (token) {
    jwt.verify(token, config.secret, (err, decodedToken) => {
      if (err) {
        res.json({
          message:
            '<p>Mã kích hoạt không hợp lệ hoặc đã hết hạn.</p><p>Bạn vui lòng đăng ký lại.</p>',
        });
      } else {
        const { name, email, password, phone, DoB, sex, address, city, town } = decodedToken;
        User.findOne({ email }).then((user) => {
          if (user) {
            // ------------ User already exists ------------//
            res.json({ message: `Địa chỉ email <b>${email}</b> đã tồn đại. Vui lòng đăng nhập.` });
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
                    res.json({
                      success_msg:
                        '<p>Tài khoản được kích hoạt thành công.</p><p>Bạn có thể đăng nhập ngay</p>',
                    });
                  })
                  .catch((err3) => console.log(err3));
              });
            });
          }
        });
      }
    });
  } else {
    res.json({ message: 'Lỗi khi kích hoạt tài khoản! Vui lòng thử lại!' });
  }
}

// ------------ Forgot Password Handle ------------//
function forgotPassword(req, res) {
  const { email } = req.body;

  // ------------ Checking required fields ------------//
  if (!email) {
    res.json({ message: 'Vui lòng nhập địa chỉ email' });
  }

  User.findOne({ email }).then((user) => {
    if (!user) {
      res.json({ message: `Không tìm thấy tài khoản với email <b>${email}!</b>` });
    } else {
      const token = jwt.sign({ _id: user._id }, config.secret, { expiresIn: '30m' });

      const output = `
              <h2>Đây là mã xác thực để cài lại mật khẩu cho tài khoản của bạn:</h2>
              <b style="color: green">${token}</b>
              <h2>Hoặc vui lòng nhấn vào link bên dưới để cài lại mật khẩu mới cho tài khoản của bạn:</h2>
              <p>${getClientOrigin(req)}/render/forgot/${token}</p>
              <p><b>CHÚ Ý: </b> Mã xác thực và link cài đặt lại mật khẩu trên sẽ hết hạn trong 30 phút.</p>
              `;

      User.updateOne({ resetLink: token }, async (err, success) => {
        if (err) {
          res.json({ message: 'Lỗi khi cài đặt lại mật khẩu!' });
        } else {
          const mailOptions = {
            to: email, // list of receivers
            subject: 'Cài đặt lại mật khẩu tài khoản FanCine ✔', // Subject line
            html: output, // html body
          };

          try {
            await sendEmail(mailOptions);
            res.json({
              success_msg: `<p>Mã xác thực / Link cài đặt lại mật khẩu đã được gởi đến email <b>${email}.</b></p><p>Vui lòng kiểm tra hòm thư và làm theo hướng dẫn.</p><p style='color: red'>(Hết hạn trong 30 phút)</p>`,
            });
          } catch (error) {
            res.json({
              message: 'Một số lỗi không mong muốn đã xảy ra. Vui lòng thử lại vào lúc khác.',
            });
          }
        }
      });
    }
  });
}

// ------------ Redirect to Reset Handle ------------//
function gotoReset(req, res) {
  const { token } = req.params;
  console.log(`goto reset${token}`);

  if (token) {
    jwt.verify(token, config.secret, (err, decodedToken) => {
      if (err) {
        res.json({
          message:
            'Mã xác thực để cài đặt lại mật khẩu không hợp lệ hoặc đã hết hạn! Vui lòng thử lại.',
        });
      } else {
        const { _id } = decodedToken;
        User.findById(_id, (err1, user) => {
          if (err1) {
            res.json({
              message: `Không tìm thấy tài khoản ứng với email <b>${email}.</b> Vui lòng thử lại`,
            });
          } else {
            res.json({ id: _id });
          }
        });
      }
    });
  } else {
    res.json({ message: 'Lỗi khi cài đặt lại mật khẩu! Vui lòng thử lại!' });
  }
}

function resetPassword(req, res) {
  let { password, password2 } = req.body;
  const { id } = req.params;

  console.log(`reset${id}`);

  // ------------ Checking required fields ------------//
  if (!password || !password2) {
    res.json({ message: 'Vui lòng điền đầy đủ tất cả các trường.' });
  } else if (password.length < 8) {
    res.json({ message: 'Mật khẩu phải có ít nhất 8 kí tự.' });
  } else if (password !== password2) {
    res.json({ message: 'Mật khẩu không trùng khớp.' });
  } else {
    bcryptjs.genSalt(10, (err, salt) => {
      bcryptjs.hash(password, salt, (err1, hash) => {
        if (err1) throw err1;
        password = hash;

        User.findByIdAndUpdate({ _id: id }, { password }, (err2, result) => {
          if (err2) {
            res.json({ message: 'Lỗi khi cài đặt lại mật khẩu!' });
          } else {
            res.json({
              success_msg:
                '<p>Cài đặt lại mật khẩu thành công!</p><p>Vui lòng đăng nhập với mật khẩu mới</p>',
            });
          }
        });
      });
    });
  }
}

// ------------ Login Handle ------------//
function loginHandle(req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.json(info);
    }
    if (!user) {
      return res.json(info);
    }
    req.logIn(user, (err1) => {
      if (err1) {
        return res.json(info);
      }
      return res.json({});
    });
  })(req, res, next);
}

// ------------ Logout Handle ------------//
function logoutHandle(req, res) {
  req.logout();
  req.flash('success_msg', 'Đăng xuất thành công');
  const url = new URL(req.headers.referer);
  res.json({ curTab: url.pathname });
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
