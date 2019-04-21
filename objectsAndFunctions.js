let year = [1990, 1965, 1937, 2005, 1998];

function arrayCalc(arr, fn) {
    let arrRes = [];
    for (let i=0;i<arr.length;i++){
        arrRes.push(fn(arr[i]));
    }
    return arrRes;
}

function isAdult(el) {
    return 18<= el;
}
function fn(el) {
    return 2019 - el;
}
let ages = arrayCalc(year, fn);
console.log(arrayCalc(year, fn));
console.log(arrayCalc(ages, isAdult));