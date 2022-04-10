function checkPassword(password, encryptPassword) {
    let passwordCheck = bcrypt.compareSync(password, encryptPassword);
    return passwordCheck
};

module.exports = checkPassword;