/**
 * Created by sanchitgupta001 on 12/06/18.
 */
module.exports = (req, res, next) => {
  if (req.user.credits < 1 ) {
    return res.status(403).send({error: 'Not Enough Credits!'}); // Forbidden
  }

  next();
};
