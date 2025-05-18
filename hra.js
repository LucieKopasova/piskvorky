import { findWinner } from 'https://unpkg.com/piskvorky@0.1.4';

let currentPlayer = 'circle';

const playFieldsEl = document.querySelectorAll('.play-field');
let playSymbolEl = document.querySelector('#player__symbol');

const addcircle = async (e) => {
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

  const playAreaStatus = Array.from(
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

  console.log(playAreaStatus);

  const winner = findWinner(playAreaStatus);
  if (winner === 'o' || winner === 'x') {
    playFieldsEl.forEach((field) => {
      field.classList.add('game-over');
    });
    setTimeout(() => {
      alert(`Vyhrál hráč se symbolem ${winner}.`);
      window.location.reload();
    }, 400);
  } else if (!playAreaStatus.includes('_')) {
    setTimeout(() => {
      alert(`Hra skončila nerozhodně.`);
      window.location.reload();
    }, 400);
  } else if (currentPlayer === 'cross') {
    playFieldsEl.forEach((field) => {
      field.disabled = true;
    });
    const response = await fetch(
      'https://piskvorky.czechitas-podklady.cz/api/suggest-next-move',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          board: playAreaStatus,
          player: 'x',
        }),
      },
    );

    const data = await response.json();
    const { x, y } = data.position;
    const field = playFieldsEl[x + y * 10];

    playFieldsEl.forEach((field) => {
      if (
        !field.classList.contains('board__field--circle') &&
        !field.classList.contains('board__field--cross')
      ) {
        field.disabled = false;
      }
    });
    field.click();
  }
};

playFieldsEl.forEach((field) => {
  field.addEventListener('click', addcircle);
});

document.querySelector('.play-again').addEventListener('click', (e) => {
  const userConfirm = confirm('Opravdu chceš začít znovu?');
  if (userConfirm === true) {
    window.location.reload();
  } else if (userConfirm === false) {
    e.preventDefault();
  }
});
