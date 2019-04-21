let scores, roundScore, activePlayer, gameOver, over=0, turn;
init();
let diceDom = document.querySelector(".dice");
diceDom.style.display = "none";

document.querySelector('.btn-roll').addEventListener('click', function () {
    if (!gameOver) {
        let dice = Math.floor(Math.random()*6)+1;
        diceDom.style.display = "block";
        diceDom.src = 'dice-'+ dice+'.png';

        if (dice !== 1){
            roundScore += dice;
            if (dice===6){
                over += 1;
                console.log(over);
               if (over===2){

                    scores[activePlayer]=0;
                    console.log(scores[activePlayer]);
                    roundScore=0;
                    over=0;
                    console.log("over"+over);
                   document.getElementById("score-"+activePlayer).textContent = scores[activePlayer];
                   nextPlayer();
                   console.log("you got two six");
                }
            }
            document.querySelector("#current-"+activePlayer).textContent = roundScore;
        }else {
            nextPlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
  if (!gameOver){
      over=0;
      scores[activePlayer]+=roundScore;
      document.getElementById("score-"+activePlayer).textContent = scores[activePlayer];
        let input = document.querySelector('.final-score').value;
        if (input){
            turn=input;
        } else {
            turn=100;
        }
      if (scores[activePlayer]>=turn){
          document.querySelector('#name-'+activePlayer).textContent = "winner";
          diceDom.style.display='none';
          document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
          document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
            gameOver = true;
      }else {
          nextPlayer();
      }
  }
});

function nextPlayer() {
    activePlayer === 0? activePlayer = 1: activePlayer = 0;
    roundScore = 0;

    document.getElementById("current-0").innerText="0";
    document.getElementById("current-1").innerText="0";

    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");
    diceDom.style.display = "none";
}

document.querySelector('.new-button').addEventListener('click', init);

function init() {
    gameOver = false;
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    document.querySelector(".dice").style.display = 'none';
    document.getElementById("score-0").innerText="0";
    document.getElementById("score-1").innerText="0";
    document.getElementById("current-0").innerText="0";
    document.getElementById("current-1").innerText="0";
    document.getElementById('name-0').textContent='Player 1';
    document.getElementById('name-1').textContent='Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.add("active");
}