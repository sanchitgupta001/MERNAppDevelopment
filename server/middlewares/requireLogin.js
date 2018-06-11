/**
 * Created by sanchitgupta001 on 12/06/18.
 */
module.exports = (req, res, next) => { // 'next' func is called when our middleware is complete
  if (!req.user) {
    return res.status(401).send({error: 'You must be Logged In!'});
  }

  next();
};
