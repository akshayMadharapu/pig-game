'use strict';
//selecting elements
let score0El = document.querySelector('#score--0');
let score1El = document.querySelector('#score--1');
let diceEl = document.querySelector('.dice');
let holdEl = document.querySelector('.btn--hold');
let newEl = document.querySelector('.btn--new');
let rollEl = document.querySelector('.btn--roll');
let curr0El = document.querySelector('#current--0');
let curr1El = document.querySelector('#current--1');
// setting up initial values
score0El.textContent = 0;
score1El.textContent = 0;
// create hidden class in css and remove dice at begining of game
diceEl.classList.add('hidden');
// rolling dice
let currScore = 0;
let scores = [0, 0];
let player = 0;
let ply = true;
rollEl.addEventListener('click', function () {
  if (ply) {
    //generate random dice
    const rollDice = Math.trunc(Math.random() * 6) + 1;
    //display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${rollDice}.png`;
    //check for 1 : if 1 then make current score zero and move to other player
    if (rollDice !== 1) {
      currScore += rollDice;
      document.querySelector(`#current--${player}`).textContent = currScore;
    } else {
      currScore = 0;
      document.querySelector(`#current--${player}`).textContent = currScore;
      document
        .querySelector(`.player--${player}`)
        .classList.remove('player--active');
      player = player === 0 ? 1 : 0;
      document
        .querySelector(`.player--${player}`)
        .classList.add('player--active');
    }
  }
});
// hold click hndling
holdEl.addEventListener('click', function () {
  if (ply) {
    scores[player] += currScore;
    document.querySelector(`#score--${player}`).textContent = scores[player];
    currScore = 0;
    document.querySelector(`#current--${player}`).textContent = currScore;
    if (scores[player] >= 10) {
      ply = false;
      document
        .querySelector(`.player--${player}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${player}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    }
    document
      .querySelector(`.player--${player}`)
      .classList.remove('player--active');
    player = player === 0 ? 1 : 0;
    document
      .querySelector(`.player--${player}`)
      .classList.add('player--active');
  }
});
//new game click handling
newEl.addEventListener('click', function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  curr0El.textContent = 0;
  curr1El.textContent = 0;
  currScore = 0;
  scores = [0, 0];
  player = 0;
  ply = true;
  document.querySelector(`.player--${0}`).classList.remove('player--winner');
  document.querySelector(`.player--${1}`).classList.remove('player--winner');
  document.querySelector(`.player--${0}`).classList.add('player--active');
  document.querySelector(`.player--${1}`).classList.remove('player--active');
  document.querySelector(`#score--${0}`).textContent = scores[0];
  document.querySelector(`#score--${1}`).textContent = scores[1];
  diceEl.classList.add('hidden');
});
