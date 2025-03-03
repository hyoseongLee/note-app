require('dotenv').config();
const jwt = require('jsonwebtoken');

const jwtPrivateKey = process.env.JWT_PRIVATE_KEY;

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  
  if (!token) {
    return res.status(401).json({
      message: '로그인이 필요합니다.'
    });
  }

  try {
    const decoded = jwt.verify(token, jwtPrivateKey);
    req.member = decoded;
    console.log(decoded);
    next();
  } catch (err) {
    return res.status(403).json({
      message: '유효하지 않은 토큰입니다.'
    });
  }
};

module.exports = { verifyToken };