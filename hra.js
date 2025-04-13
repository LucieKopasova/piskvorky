let currentPlayer = 'circle';

const playFieldsEl = document.querySelectorAll('.play-field'); // pojmenoval bych
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
