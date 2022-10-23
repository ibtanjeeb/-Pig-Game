'use strict';
//Select Elemements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const score1El = document.getElementById('score--1');
const DiceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//Starting Condition
score0El.textContent = 0;
score1El.textContent = 0;
DiceEl.classList.add('hidden');
let CurrentScore, ActivePlayer, scores, playing;

const ResetGame = function () {
  CurrentScore = 0;
  ActivePlayer = 0;
  scores = [0, 0];
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  DiceEl.classList.add('hidden');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
ResetGame();
const switchPlayer = function () {
  document.getElementById(`current--${ActivePlayer}`).textContent = 0;
  CurrentScore = 0;
  ActivePlayer = ActivePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Rolling Functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1.Generation the dice Roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    //Display Dice
    DiceEl.classList.remove('hidden');
    DiceEl.src = `dice-${dice}.png`;
    //Checking Logic
    if (dice !== 1) {
      //Add Dice To Cuurrent Score
      CurrentScore += dice;

      document.getElementById(`current--${ActivePlayer}`).textContent =
        CurrentScore;
    } else {
      //Switch to next player
      switchPlayer();
    }
  }
});
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[ActivePlayer] += CurrentScore;
    console.log(scores[ActivePlayer]);
    document.getElementById(`score--${ActivePlayer}`).textContent =
      scores[ActivePlayer];
    if (scores[ActivePlayer] >= 100) {
      playing = false;
      DiceEl.classList.add('hidden');
      document
        .querySelector(`.player--${ActivePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${ActivePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});
btnNew.addEventListener('click', ResetGame);
