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

  if (!name || !email || !password || !password2 || !phone) {
    res.json({ msg: 'Vui lòng điền tất cả các trường bắt buộc.' });
  }

  if (password !== password2) {
    res.json({ msg: 'Mật khẩu không khớp.' });
  }

  if (password.length < 8) {
    res.json({ msg: 'Mật khẩu phải có ít nhất 8 ký tự.' });
  }

  User.findOne({ email }).then(async (user) => {
    if (user) {
      // ------------ User already exists ------------//
      res.json({ msg: `Địa chỉ email ${email} đã được đăng ký bởi một ai khác.` });
    } else {
      const token = jwt.sign(
        { name, email, password, phone, DoB, sex, address, city, town },
        config.secret,
        { expiresIn: '30m' },
      );
      const CLIENT_URL = req.headers.origin;

      const output = `
              <h2>Đây là mã kích hoạt tài khoản của bạn:</h2>
              <b style="color: green">${token}</b>
              <h2>Hoặc vui lòng nhấn vào link bên dưới để kích hoạt tài khoản của bạn:</h2>
              <p>${CLIENT_URL}/render/activate/${token}</p>
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
          success_msg: `Mã / Link kích hoạt tài khoản đã được gởi đến email ${email}. Vui lòng kiểm tra hòm thư và kích hoạt tài khoản để đăng nhập. (Hết hạn trong 30 phút)`,
        });
      } catch (error) {
        res.json({ msg: 'Một số lỗi không mong muốn đã xảy ra. Vui lòng đăng ký lại.' });
      }
      // res.redirect('/login');
    }
  });
}

// ------------ Activate Account Handle ------------//
function activateHandle(req, res) {
  const { token } = req.params;
  if (token) {
    jwt.verify(token, config.secret, (err, decodedToken) => {
      if (err) {
        res.json({
          msg: 'Mã kích hoạt không hợp lệ hoặc đã hết hạn. Bạn vui lòng đăng ký lại.',
        });
      } else {
        const { name, email, password, phone, DoB, sex, address, city, town } = decodedToken;
        User.findOne({ email }).then((user) => {
          if (user) {
            // ------------ User already exists ------------//
            res.json({ msg: `Địa chỉ email ${email} đã tồn đại. Vui lòng đăng nhập.` });
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
                      success_msg: 'Tài khoản được kích hoạt thành công. Bạn có thể đăng nhập ngay',
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
    res.json({ msg: 'Lỗi khi kích hoạt tài khoản! Vui lòng thử lại!' });
  }
}

// ------------ Forgot Password Handle ------------//
function forgotPassword(req, res) {
  const { email } = req.body;

  const errors = [];

  // ------------ Checking required fields ------------//
  if (!email) {
    res.json({ msg: 'Vui lòng nhập địa chỉ email' });
  }

  User.findOne({ email }).then((user) => {
    if (!user) {
      res.json({ msg: `Không tìm thấy tài khoản với email ${email}!` });
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
          res.json({ msg: 'Lỗi khi cài đặt lại mật khẩu!' });
        } else {
          const mailOptions = {
            to: email, // list of receivers
            subject: 'Cài đặt lại mật khẩu tài khoản FanCine ✔', // Subject line
            html: output, // html body
          };

          try {
            await sendEmail(mailOptions);
            res.json({
              success_msg: ` Mã xác thực / Link cài đặt lại mật khẩu đã được gởi đến email ${email}. Vui lòng kiểm tra hòm thư và làm theo hướng dẫn. (Hết hạn trong 30 phút)`,
            });
          } catch (error) {
            res.json({
              msg: 'Một số lỗi không mong muốn đã xảy ra. Vui lòng thử lại vào lúc khác.',
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
          msg:
            'Mã xác thực để cài đặt lại mật khẩu không hợp lệ hoặc đã hết hạn! Vui lòng thử lại.',
        });
      } else {
        const { _id } = decodedToken;
        User.findById(_id, (err1, user) => {
          if (err1) {
            res.json({ msg: `Không tìm thấy tài khoản ứng với email ${email}. Vui lòng thử lại` });
          } else {
            res.json({ id: _id });
          }
        });
      }
    });
  } else {
    res.json({ msg: 'Lỗi khi cài đặt lại mật khẩu! Vui lòng thử lại!' });
  }
}

function resetPassword(req, res) {
  let { password, password2 } = req.body;
  const { id } = req.params;

  console.log(`reset${id}`);

  // ------------ Checking required fields ------------//
  if (!password || !password2) {
    res.json({ msg: 'Vui lòng điền đầy đủ tất cả các trường.' });
  } else if (password.length < 8) {
    res.json({ msg: 'Mật khẩu phải có ít nhất 8 kí tự.' });
  } else if (password !== password2) {
    res.json({ msg: 'Mật khẩu không trùng khớp.' });
  } else {
    bcryptjs.genSalt(10, (err, salt) => {
      bcryptjs.hash(password, salt, (err1, hash) => {
        if (err1) throw err1;
        password = hash;

        User.findByIdAndUpdate({ _id: id }, { password }, (err2, result) => {
          if (err2) {
            res.json({ msg: 'Lỗi khi cài đặt lại mật khẩu!' });
          } else {
            res.json({
              success_msg: 'Cài đặt lại mật khẩu thành công! Vui lòng đăng nhập với mật khẩu mới',
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
