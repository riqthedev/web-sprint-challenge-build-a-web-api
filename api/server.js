const express = require('express');
const server = express();
server.use(logger)
server.use(express.json())
const projectRouter = require('./projects/projects-router')
const actionRouter = require('./actions/actions-router')



server.use('/api/projects', projectRouter)
server.use ('/api/actions', actionRouter)

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

module.exports = server;
function logger(req,res, next) {
    console.log(`making a ${req.method} request to ${req.path}`)
    next()
}
