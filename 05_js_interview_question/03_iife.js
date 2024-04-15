var age = 15;

(() => {
    console.log('one', age);

    age = 20;

    console.log('two', age);
})();

console.log('three', age);

var age = 50;