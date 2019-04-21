let Person = function (name, year, job) {
    this.name = name;
    this.year = year;
    this.job = job;
};

Person.prototype.calAge = function () {
    console.log(2019- this.year);
};
let shakil = new Person('shakil', 1988, 'student');
let sh = new Person('sh', 1990, 'student');

shakil.calAge();
sh.calAge();

Person.prototype.lastName = 'Hossain';
console.log(shakil.lastName);