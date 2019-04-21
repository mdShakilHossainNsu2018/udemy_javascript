//object.create()

let Person =  {
   calAge: function () {
       console.log(2019-this.year);
   }
};

let shakil = Object.create(Person);
shakil.year=1998;
Person.calAge();

let s = Object.create(Person, {
    name: {value: "sh"},
    year: {value: 1999}
});
s.calAge();
