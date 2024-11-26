function greet(theTime) {
    let greeting;
    if (theTime<=12) {
        greeting="good morning";
    } else if (theTime>12 && theTime<=18) {
        greeting="good evening";
    } else if (theTime>18 && theTime<=24) {
        greeting="good night";
    }
    return greeting;
}

console.log(greet(10))
console.log(greet(15))
console.log(greet(22))

