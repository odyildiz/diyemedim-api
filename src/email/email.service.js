const formData = require('form-data');
const logger = require('../utils/logger');
const Mailgun = require('mailgun.js');

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY,
  url: process.env.MAILGUN_API_BASE_URL || 'https://api.mailgun.net'
});

const sendEmail = async (to, subject, html) => {
  const mailgunDomain = process.env.MAILGUN_DOMAIN;
  const mailgunDomainPrefix = process.env.MAILGUN_DOMAIN_PREFIX;
  if (!mailgunDomain) {
    throw new Error('MAILGUN_DOMAIN is not defined in environment variables.');
  }

  try {
    const msg = await mg.messages.create(mailgunDomain, {
      //from: `Excited User <mailgun@${mailgunDomain}>`,
      from: `${mailgunDomainPrefix}@${mailgunDomain}>`,
      to: [to],
      subject: subject,
      html: html,
    });
    logger.info('Email sent successfully', { messageId: msg.id, to, subject });
    return msg;
  } catch (error) {
    logger.error('Error sending email', { to, subject, error: error.message, stack: error.stack });
    throw error;
  }
};

module.exports = { sendEmail };