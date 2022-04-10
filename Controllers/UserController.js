const bcrypt = require("bcrypt")
const { User } = require("../models")

function encryptPassword(pass){
    const hash = bcrypt.hashSync(pass, 10);
    return hash

}

function checkPassword(password,encryptPassword){
    let reportPassword = bcrypt.compareSync(password, encryptPassword);
    return reportPassword
}

class UserController {
    
    
    static viewregister (req,res){
        res.render("register")
    }

    static viewlogin (req,res){
        res.render("login")
    }
    static home (req,res){
        res.render("home")
    }

    static async register (req,res){
        const {username,password}  = req.body
    
    try {
           const user = await User.findOne({ where:{
               username
           }})
           if (user){
               throw{
                   error: 400,
                   message: "username has already"
               }
           }else{
               let passwordEncrypt = encryptPassword(password)

               const user = await User.create({
                   username,
                   password: passwordEncrypt
               })
               res.redirect("/login")
           }
       } catch (error) {
           res.status(500).json(error)
       }
   }

    static async login (req,res){
        try {
            const {username,password} = req.body
            let user = await User.findOne({where: {
                username
            }})

            if (user) {
                console.log(user, "==> Username ada");

                const isPassword = checkPassword(password,user.password)

                if (isPassword) {
                    res.redirect("http://localhost:3000/home")
                } else {
                    throw{
                        error: 400,
                       message: "username and password wrong"

                    }
                    
                }
            }else {
                throw{
                    error: 402,
                    message: "username Not Found"
                }
            }

            
        } catch (error) {
            res.status(500).json(error)
        }
    }





}


module.exports = UserController