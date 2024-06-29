require('dotenv').config()
const express = require('express')
const cors = require('cors')
const routes = require('./router')
require('./connection')


const globomartServer = express()

globomartServer.use(cors())
globomartServer.use(express.json())
globomartServer.use(routes)

const port = 3000 || process.env.PORT

globomartServer.listen(port,()=>{
    console.log(`Globomart server running successfully at port : ${port}`);

})

