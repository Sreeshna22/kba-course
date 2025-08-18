

import jwt from 'jsonwebtoken';

function authenticate(req, res, next) {
  const cookie = req.headers.cookie;
  console.log( cookie);

  if (cookie) {
    const cookies = cookie.split(';').map(c => c.trim());
    const tokenPair = cookies.find(c => c.startsWith('authtoken='));

    if (tokenPair) {
      const token = tokenPair.split('=')[1];
      console.log("Token:", token);

      try {
        const decoded = jwt.verify(token, process.env.secret_key);
        console.log("Decoded Token:", decoded);

        req.name = decoded.UserName;   
        req.role = decoded.UserRole;
        next();
      } catch (err) {
        console.error("Invalid token:", err.message);
        res.status(401).json({ msg: 'Invalid or expired token' });
      }
    } else {
      res.status(401).json({ msg: 'Unauthorized access: Token not found' });
    }
  } else {
    res.status(404).json({ msg: 'Cookie not found' });
  }
}

export { authenticate };
