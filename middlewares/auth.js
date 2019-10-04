const AUTH_TOKEN = 'vertusa_auth_token';

/**
 * @param {object} req
 * @param {object} res
 * @param {Function} next
 * @description Auth middleware to do the authrorization
 */
module.exports = (req, res, next) => {
  if (req.headers && req.headers.token
    && req.headers.token === AUTH_TOKEN) {
    console.log('Authorization successfully done');
    next();
  } else {
    res.status(401);
    res.send({
      errorMessage: 'Access is denied. User is unauthorized.',
    });
  }
};