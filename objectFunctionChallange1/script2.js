(function () {
    function Question(question, answer, correct) {
        this.question = question;
        this.answer = answer;
        this.correct = correct;
    }

    Question.prototype.checkAnswer = function(ans, callback) {
        let sc;
        if (ans === this.correct) {
            console.log('Correct answer!');
            sc = callback(true);
        } else {
            console.log('Wrong answer. Try again :)');
            sc = callback(false);
        }
        this.displayScore(sc);
    };
    Question.prototype.displayScore = function(score){
        console.log("Your current score : "+ score);
        console.log("-------------------------------");
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

    function score() {
        let scr = 0;
        return function (correct) {
            if (correct){
                scr++;
            }
            return scr;
        }
    }

    let keepScr = score();


    function nextQuestion(){
        let n = Math.floor(Math.random()*question.length);
        question[n].displayQuestion();

        let answer = prompt("Write the correct answer.");


        if (answer !== 'exit'){
            question[n].checkAnswer(parseInt(answer), keepScr);
            nextQuestion();
        }

    }
    nextQuestion();

})();
