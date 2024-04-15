age = 10;


(() => {
    val = 150;
    console.log('one', age);
    var val = 200
    age = 50
    console.log('two', age);

})()

console.log(val);
console.log('three', age);

var age = 100