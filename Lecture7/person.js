class Person{
    name;
    constructor(name){
        this.name = name;
    }

    greet() {
        console.log('Hello ${this.name}');
    
    }

}

let rory = new Person("Rory");
rory.greet();

console.log("name", rory.name);