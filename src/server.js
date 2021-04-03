const express = require("express")
const { get } = require("./routes")
const server = express()
const routes = require("./routes")

server.set('view engine', 'ejs')
server.use(express.static("public"))
server.use(express.urlencoded({extended: true})) //para usar req.body, habilita-lo
server.use(routes)
server.listen(3000, () => console.log('Server listening on port 3000'))