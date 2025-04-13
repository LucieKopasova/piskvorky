let currentPlayer = 'circle';

const playFieldEl = document.querySelectorAll('.play-field');
let playSymbolEl = document.querySelector('#player__symbol');

const addcircle = (e) => {
  if (currentPlayer === 'circle') {
    e.target.classList.add('board__field--circle');
    setTimeout(() => {
      e.target.classList.add('expand');
    }, 10);

    currentPlayer = 'cross';
    setTimeout(() => {
      playSymbolEl.src = 'images/cross--white.svg';
    }, 300);
  } else if (currentPlayer === 'cross') {
    e.target.classList.add('board__field--cross');
    setTimeout(() => {
      e.target.classList.add('expand');
    }, 10);
    currentPlayer = 'circle';
    setTimeout(() => {
      playSymbolEl.src = 'images/circle--white.svg';
    }, 300);
  }
  e.target.disabled = true;
};

playFieldEl.forEach((addclick) => {
  addclick.addEventListener('click', addcircle);
});

document.querySelector('.play-again').addEventListener('click', () => {
  const userConfirm = confirm('Opravdu chceš začít znovu?');
  if (userConfirm === true) {
    window.location.reload();
  } else if (userConfirm === false) {
    event.preventDefault();
  }
});
