function retiriment(retirimentAge) {
    let a=' year left until retirement.';
    return function (yearOfBirth) {
        let age = 2019-yearOfBirth;
        console.log((retirimentAge-age)+a);
    }
}

let reirementUs = retiriment(66);
reirementUs(1990);
let reirementBn = retiriment(60);
reirementBn(1990);

function interVewQuestions(job) {
    return function (name) {
        if (job=='teacher'){
            console.log(name+" which subject ?");
        }else if (job=='deginer'){
            console.log(name+"which ui ?")
        } else {
            console.log(`${name} what do you know about ${job} ?`);
        }
    } 
}
interVewQuestions("teacher")("fjad");
interVewQuestions("tear")("fewewjad");
