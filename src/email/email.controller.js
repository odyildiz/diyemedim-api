const emailService = require('./email.service');
const { success, error } = require('../utils/responseHandler');
const logger = require('../utils/logger');
const emailMessages = require('./email.messages');

const sendEmail = async (req, res) => {
  const { to, messageId } = req.body;

  if (!to || !messageId) {
    logger.warn('Missing required email parameters', { to, messageId });
    return error(res, 'Missing required email parameters: email adress or mail type', 400);
  }

  try {
    const message = emailMessages[messageId];

    if (!message) {
      logger.warn(`Invalid messageId: ${messageId}`);
      return error(res, 'Invalid message ID', 400);
    }

    const { subject, html } = message;
    await emailService.sendEmail(to, subject, html);
    success(res, 'Email sent successfully!');
  } catch (err) {
    logger.error('Failed to send email in controller', { error: err.message, stack: err.stack });
    error(res, 'Failed to send email', 500, err.message);
  }
};

module.exports = { sendEmail };