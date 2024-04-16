const fs = require('fs')
const os = require('os')

// This is a synchronous : Blocking
fs.writeFileSync('./test.txt', 'Hii file')


// This is asynchronous : Non-Blocking
fs.writeFile('./test2.txt', 'welcome', (err) => {})



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


// fs.mkdirSync('my-docs')


// Blocking Code
// console.log(1);
// const result = fs.readFileSync('./dummy.txt', 'utf-8')
// console.log(result);
// console.log(2);

// Non-Blocking 
// console.log(1);
// fs.readFile('./dummy.txt', 'utf-8', (err, data) => {
//     console.log(data);
// })
// console.log(2);


// Default thread poolsize: 4
// Max Thread : depends on machine to machine

console.log(os.cpus());
console.log(os.cpus().length);