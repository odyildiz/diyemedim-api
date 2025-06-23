const success = (res, message, data, statusCode = 200) => {
    res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  };
  
  const error = (res, message, statusCode = 500, details = null) => {
    res.status(statusCode).json({
      success: false,
      message,
      details,
    });
  };
  
  module.exports = { success, error };