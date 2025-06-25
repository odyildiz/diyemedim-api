const fs = require('fs');
const path = require('path');
const emailMessages = {};

const readHtmlTemplate = (templatePath) => {
  const fullPath = path.join(__dirname, '../assets/html', templatePath);
  try {
    return fs.readFileSync(fullPath, 'utf8');
  } catch (error) {
    console.error(`Error reading template file ${templatePath}:`, error);
    return '';
  }
};


// Define email messages directly
emailMessages.agiz_kokusu = {
  subject: 'Bir Nefes Kadar Yakın Olmak İstiyoruz ama Bir Sorun Var!',
  html: readHtmlTemplate('agiz_kokusu.html')
};

emailMessages.password_reset = {
  subject: 'Password Reset Request',
  html: '<h1>Password Reset</h1><p>Click <a href="#">here</a> to reset your password.</p>'
};

module.exports = emailMessages;