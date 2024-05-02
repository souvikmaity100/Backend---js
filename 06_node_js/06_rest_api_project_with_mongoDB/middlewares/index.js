const fs = require('fs')

function logReqRes(fileName) {
    return (req, res, next) => {
        fs.appendFile(fileName, `Req Type: ${req.method} | Req Time: ${Date.now()} | Req Path: ${req.path} | User IP: ${req.ip} \n`, (err, data) =>{
            next();
        })
    }
}

module.exports = { logReqRes }