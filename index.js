const express = require("express")
const app = express()
const port = 3000
const routes = require("./routers")

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.set("view engine", "ejs")
app.use(routes)









app.listen(port, () =>{
    console.log(`Example app listening on port ${port}`)

})