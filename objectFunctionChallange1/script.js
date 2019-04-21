(function () {
    function Question(question, answer, correct) {
        this.question = question;
        this.answer = answer;
        this.correct = correct;
    }

    Question.prototype.checkAnswer = function(ans) {
        if (ans === this.correct) {
            console.log('Correct answer!');

        } else {
            console.log('Wrong answer. Try again :)')
        }
    };

    Question.prototype.displayQuestion =function () {
        console.log(this.question);
        for (let i = 0; i < this.answer.length; i++) {
            console.log(i + ': ' + this.answer[i]);
        }
    };

    let q1 = new Question('Is JavaScript the coolest programming language in the world?',
        ['Yes', 'No'],
        0);

    let q2 = new Question('What is the name of this course\'s teacher?',
        ['John', 'Micheal', 'Jonas'],
        2);

    let q3 = new Question('What does best describe coding?',
        ['Boring', 'Hard', 'Fun', 'Tediuos'],
        2);
    let question = [q1, q2, q3];
    let n = Math.floor(Math.random()*question.length);
    question[n].displayQuestion();

    let answer = parseInt(prompt("Write the correct answer."));

    question[n].checkAnswer(answer);
})();

