const http = require('http')
const fs = require('fs')
const url = require('url')


const myServer = http.createServer((req, res) => {
    // console.log(req);
    // console.log("new request")

    if(req.url === '/favicon.ico') return res.end()
    const msg = `${Date.now()}: New Request on : ${req.url}\n`
    const myUrl = url.parse(req.url, true)
    console.log(myUrl);
    fs.appendFile('./test.txt', msg, (err, data) => {
        switch (myUrl.pathname) {
            case '/':
                res.end("Welcome to Home Page")
                break;
            case '/login':
                res.end("Welcome to Login Page")
                break;
            case '/about':
                const username = myUrl.query.user
                res.end(`Welcome to About Page, User: ${username}`)
                break;
        
            default:
                res.end("404 not found")
                break;
        }
    })
})


myServer.listen(4000, () => console.log("server started on port: 4000"))
