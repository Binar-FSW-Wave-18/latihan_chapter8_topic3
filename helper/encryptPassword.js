const bcrypt = require('bcrypt');

function encryptPassword(pass) {
    const hash = bcrypt.hashSync(pass, 10);
    return hash
};

module.exports = encryptPassword;