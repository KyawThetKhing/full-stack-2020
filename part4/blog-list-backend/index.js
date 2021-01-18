var app = require('./app')
var http = require('http')
var config = require('./utils/config')
var logger = require('./utils/logger')

const server = http.createServer(app);
server.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
})