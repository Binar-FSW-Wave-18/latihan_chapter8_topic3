const { User } = require('../models');
const encryptPassword = require('../helper/encryptPassword');
const checkPassword = require('../helper/checkPassword');


class UserController {

    static openRegister(req, res) {
        res.render('register')
    };

    static openLogin(req, res) {
        res.render('login')
    };

    static async register(req, res) {
        const { username, password } = req.body

        try {
            const user = await User.findOne({
                where: {
                    username
                }
            })
            if(user) {
                throw {
                    error: 400,
                    message: "username already exists!"
                }
            }else {
                let passwordEncrypt = encryptPassword(password)

                const user = await User.create({
                    username,
                    password: passwordEncrypt
                })
                res.redirect('/login')
                res.status(201).json(user)
            }
        }catch (error) {
            res.status(500).json(error)
        }
    };

    static async login(req, res) {
        try {
            const { username, password } = req.body
            let user = await User.findOne({
                where: {
                    username
                }
            })

            if(user) {

                const isPassword = checkPassword(password, user.password)

                if(isPassword) {
                    res.render('home')
                }else {
                    throw {
                        error: 400,
                        message: "username and password wrong"
                    }
                }
            }else {
                throw {
                    error: 402,
                    message: "username Not Found"
                }
            }

        }catch (error) {
            res.status(500).json(error)
        }
    };

};


module.exports = UserController;