import express from 'express';

// ------------ Importing Controllers ------------//
import authController from '../controllers/authRenderController.js';
import { forwardAuthenticated, ensureAuthenticated } from '../config/checkAuth.js';

const renderAuthRouter = express.Router();

// ------------ Login Route ------------//
renderAuthRouter.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// ------------ Forgot Password Route ------------//
renderAuthRouter.get('/forgot', forwardAuthenticated, (req, res) => res.render('forgot'));

// ------------ Reset Password Route ------------//
renderAuthRouter.get('/reset/:id', forwardAuthenticated, (req, res) => {
  res.render('reset', { id: req.params.id });
});

// ------------ Register Route ------------//
renderAuthRouter.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

// ------------ Register POST Handle ------------//
renderAuthRouter.post('/register', authController.registerHandle);

// ------------ Email ACTIVATE Handle ------------//
renderAuthRouter.get('/activate/:token', forwardAuthenticated, authController.activateHandle);

// ------------ Forgot Password Handle ------------//
renderAuthRouter.post('/forgot', authController.forgotPassword);

// ------------ Reset Password Handle ------------//
renderAuthRouter.post('/reset/:id', authController.resetPassword);

// ------------ Reset Password Handle ------------//
renderAuthRouter.get('/forgot/:token', forwardAuthenticated, authController.gotoReset);

// ------------ Login POST Handle ------------//
renderAuthRouter.post('/login', authController.loginHandle);
renderAuthRouter.post('/loginAdmin', authController.loginHandle);

// ------------ Logout GET Handle ------------//
renderAuthRouter.get('/logout', ensureAuthenticated, authController.logoutHandle);

export default renderAuthRouter;
