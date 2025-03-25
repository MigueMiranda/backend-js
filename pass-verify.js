const bcrypt = require('bcrypt');

async function varifyPassword() {
  const myPassword = 'admin 123 .202';
  const hash = 'admin 123 .202';
  const isMatch = await bcrypt.compare(myPassword, hash);
  console.log(isMatch)
}

varifyPassword();
