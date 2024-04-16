const http = require('http')
const fs = require('fs')


const myServer = http.createServer((req, res) => {
    // console.log(req);
    // console.log("new request")
    const msg = `${Date.now()}: New Request on : ${req.url}\n`
    fs.appendFile('./test.txt', msg, (err, data) => {
        switch (req.url) {
            case '/':
                res.end("Welcome to Home Page")
                break;
            case '/login':
                res.end("Welcome to Login Page")
                break;
            case '/about':
                res.end("Welcome to About Page")
                break;
        
            default:
                res.end("404 not found")
                break;
        }
    })
})


myServer.listen(4000, () => console.log("server started on port: 4000"))
