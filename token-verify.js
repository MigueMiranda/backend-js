const jwt = require('jsonwebtoken');

const secret = 'myCat';
const token = 'kññknljbjlbljbj'

function verifyToken(token, secret) {
  return jwt.sign(token, secret);
}

const payload = verifyToken(token, secret);
console.log(payload);
