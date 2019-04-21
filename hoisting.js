function calculateAge(year) {
    let date =new Date();
    let n = date.getFullYear();
    console.log(n-year);
}
calculateAge(1998);

//retiremant(2322);

var retiremant = function (year) {
    let date =new Date();
    let n = date.getFullYear();
    console.log(65-(n-year));
};
retiremant(2322);

let age = 43;
function foo() {
    // console.log(age);
    let age = 24;
    console.log(age);
}
foo();