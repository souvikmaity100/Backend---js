myFun();

var myFun = function (){
    console.log('first function');
}

myFun();

function myFun(){
    console.log('second function');
}

myFun();

/* Hoisting is the default behavior in JavaScript where declarations of variables and functions are moved to the top of their respective scopes during the compilation phase. This ensures that regardless of where variables and functions are declared within a scope, they are accessible throughout that scope. */