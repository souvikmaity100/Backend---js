const cluster = require('cluster')
const os = require('os')
const express = require('express')

const totalCPU = os.cpus().length



if (cluster.isPrimary) {

    // Fork workers.
    for (let i = 0; i < totalCPU; i++) {
        cluster.fork();
    }

} else {
    const app = express()
    const PORT = 8000

    app.get('/', (req, res) => {
        return res.json({ message: `Hello World ${process.pid}` })
    })


    app.listen(PORT, () => {
        console.log(`Worker ${process.pid} started`);
        console.log(`server started on http://localhost:${PORT}`)
    })
}