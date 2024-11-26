let numbers = [23,56,84,29,467]
for (i in numbers) {
    console.log(numbers [i])
}


let x = 0;
while (x < 10) {
console.log("The number is " + x );
x=x+1;
}


for (let y = 0; y < 10; y++) {
    if (y === 3) { break; }
    console.log("The number is " + y );
}


for (let z = 0; z < 10; z++) {
    if (z === 3) { continue; }
    console.log("The number is " + z );
}