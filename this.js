console.log(this);
//
// cal(1999);
// function cal(year) {
//     console.log(1019 - year);
//     console.log(this);
// }

var shakil = {
    name: "shakil",
    age: 31,
    year: 1998,
    cal: function () {
        console.log(this);console.log(1018 - this.year);

    }
};
shakil.cal();

var mike = {
    name: "mike",
    year: 1292,
};

mike.cal = shakil.cal;
mike.cal();