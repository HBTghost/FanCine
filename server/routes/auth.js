import express from 'express';

// ------------ Importing Controllers ------------//
import authController from '../controllers/authController.js';
import { forwardAuthenticated, ensureAuthenticated } from '../config/checkAuth.js';
import { ensureCaptchaClicked } from '../helpers/captcha.js';

const authRouter = express.Router();

// ------------ Login Route ------------//
// authRouter.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// ------------ Forgot Password Route ------------//
// authRouter.get('/forgot', forwardAuthenticated, (req, res) => res.render('forgot'));

// ------------ Reset Password Route ------------//
// authRouter.get('/reset/:id', forwardAuthenticated, (req, res) => {
//   res.render('reset', { id: req.params.id });
// });

// ------------ Register Route ------------//
// authRouter.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

// ------------ Register POST Handle ------------//
authRouter.post('/register', ensureCaptchaClicked, authController.registerHandle);

// ------------ Email ACTIVATE Handle ------------//
authRouter.post(
  '/activate/:token',
  ensureCaptchaClicked,
  forwardAuthenticated,
  authController.activateHandle,
);

// ------------ Forgot Password Handle ------------//
authRouter.post('/forgot', ensureCaptchaClicked, authController.forgotPassword);

// ------------ Reset Password Handle ------------//
authRouter.post('/reset/:id', authController.resetPassword);

// ------------ Reset Password Handle ------------//
authRouter.post(
  '/forgot/:token',
  ensureCaptchaClicked,
  forwardAuthenticated,
  authController.gotoReset,
);

// ------------ Login POST Handle ------------//
authRouter.post('/login', ensureCaptchaClicked, authController.loginHandle);
authRouter.post('/loginAdmin', authController.loginHandle);

// ------------ Logout GET Handle ------------//
authRouter.get('/logout', ensureAuthenticated, authController.logoutHandle);

export default authRouter;
