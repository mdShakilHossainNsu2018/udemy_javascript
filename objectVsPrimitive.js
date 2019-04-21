let a = 23;
let b = a;

a=46;
console.log(a);
console.log(b);
let obj1 ={
    name: 'shakil',
    age: 26
};
let obj2 = obj1;
console.log(obj1);
console.log(obj2);
console.log(obj1.age);

//functions
let age = 27;
let obj = {
    name: "shakil",
    city: "dhaka"
};

function change(a, b) {
    a = 30;
    b.city = "bang";
}
change(age, obj);
console.log(age);
console.log(obj.city);