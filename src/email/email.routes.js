const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const emailController = require('./email.controller');

const sendEmailSchema = Joi.object({
  to: Joi.string().email().required(),
  messageId: Joi.string().required()
});

router.post('/send', validator.body(sendEmailSchema), emailController.sendEmail);

module.exports = router;