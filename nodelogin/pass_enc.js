const bcrypt = require('bcrypt');

const hash = bcrypt.hashSync("pass@123", 10);
console.log(hash);