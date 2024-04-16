const fs = require('fs')

// This is a synchronous
// fs.writeFileSync('./test.txt', 'Hii file')


// This is asynchronous
// fs.writeFile('./test2.txt', 'welcome', (err) => {})



// const data = fs.readFileSync('./dummy.txt', 'utf-8')
// console.log(data);



// fs.readFile('./dummy.txt', 'utf-8', (err, data) => {
//     if (err) {
//         console.log('error:', err);
//     }
//     else{
//         console.log(data);
//     }
// })


// const currTime = new Date().getTime()
// fs.appendFileSync('./test.txt', `\nTime Is: ${currTime}`)



// fs.cpSync('./test.txt', './copy.txt');


// fs.unlinkSync('./copy.txt')

// const stat = fs.statSync('./test.txt')
// console.log(stat);


fs.mkdirSync('my-docs')