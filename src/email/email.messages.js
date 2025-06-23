const fs = require('fs');
const path = require('path');

const emailMessages = {};

const htmlTemplatesDir = path.join(__dirname, '../assets/html');

fs.readdirSync(htmlTemplatesDir).forEach(file => {
  if (file.endsWith('.html')) {
    const messageId = file.replace('.html', '').replace(/-/g, '_');
    const htmlContent = fs.readFileSync(path.join(htmlTemplatesDir, file), 'utf8');
    emailMessages[messageId] = {
      subject: `Subject for ${messageId.replace(/_/g, ' ')}`,
      html: htmlContent
    };
  }
});

module.exports = emailMessages;