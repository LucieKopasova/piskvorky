import { findWinner } from 'https://unpkg.com/piskvorky@0.1.4';

let currentPlayer = 'circle';

const playFieldsEl = document.querySelectorAll('.play-field');
let playSymbolEl = document.querySelector('#player__symbol');

const addcircle = (e) => {
  if (currentPlayer === 'circle') {
    e.target.classList.add('board__field--circle');
    currentPlayer = 'cross';
    setTimeout(() => {
      playSymbolEl.src = 'images/cross--white.svg';
    }, 300);
  } else if (currentPlayer === 'cross') {
    e.target.classList.add('board__field--cross');
    currentPlayer = 'circle';
    setTimeout(() => {
      playSymbolEl.src = 'images/circle--white.svg';
    }, 300);
  }

  setTimeout(() => {
    e.target.classList.add('expand');
  }, 10);
  e.target.disabled = true;

  const playAreaStatuts = Array.from(
    document.querySelectorAll('.play-field'),
  ).map((field) => {
    if (field.classList.contains('board__field--circle')) {
      return 'o';
    } else if (field.classList.contains('board__field--cross')) {
      return 'x';
    } else {
      return '_';
    }
  });

  console.log(playAreaStatuts);

  const winner = findWinner(playAreaStatuts);
  if (winner === 'o' || winner === 'x') {
    playFieldsEl.forEach((field) => {
      field.classList.add('game-over');
    });
    setTimeout(() => {
      alert(`Vyhrál hráč se symbolem ${winner}.`);
      window.location.reload();
    }, 400);
  } else if (!playAreaStatuts.includes('_')) {
    setTimeout(() => {
      alert(`Hra skončila nerozhodně.`);
      window.location.reload();
    }, 400);
  }
};

playFieldsEl.forEach((field) => {
  field.addEventListener('click', addcircle);
});

document.querySelector('.play-again').addEventListener('click', () => {
  const userConfirm = confirm('Opravdu chceš začít znovu?');
  if (userConfirm === true) {
    window.location.reload();
  } else if (userConfirm === false) {
    event.preventDefault();
  }
});
