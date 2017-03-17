const express = require('express')
const server = express()
const conf = require('../config/production.json')

server.use('/', express.static('dist'))
  .listen(conf.port, ()=> {
    console.log(`🌎  Server is listening on: ${conf.port}`)
  })
