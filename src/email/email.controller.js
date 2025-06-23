const emailService = require('./email.service');
const { success, error } = require('../utils/responseHandler');
const logger = require('../utils/logger');

const sendEmail = async (req, res) => {
  const { to, subject, text, html } = req.body;

  if (!to || !subject || (!text && !html)) {
    logger.warn('Missing required email parameters', { to, subject });
    return error(res, 'Missing required email parameters: to, subject, text or html', 400);
  }

  try {
    await emailService.sendEmail(to, subject, text, html);
    success(res, 'Email sent successfully!');
  } catch (err) {
    logger.error('Failed to send email in controller', { error: err.message, stack: err.stack });
    error(res, 'Failed to send email', 500, err.message);
  }
};

module.exports = { sendEmail };