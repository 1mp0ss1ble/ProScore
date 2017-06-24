import jwt from 'jsonwebtoken';
import config from '../config';
import User from '../routes/user/model';

export default role => (req, res, next) => {

  const authorizationHeader = req.headers['authorization'];
  let token;

  if (authorizationHeader) {
    token = authorizationHeader.split(' ')[1];
  }

  if (token) {
    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'failed to authenticate' });
      }

      User.get({ _id: decoded._id }, (dbErr, user) => {
        if (!user) {
          return res.status(404).json({ error: 'no such user' });
        }
        req.currentUser = user;
        next();
      });
    });
  }
  return res.status(403).json({ error: 'no token provided' });
};
