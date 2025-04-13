let currentPlayer = 'circle';

const playFieldEl = document.querySelectorAll('.play-field');

/* const circleWhite = {
  class: 'player__symbol player__symbol--circle',
  src: 'images/circle--white.svg',
  alt: 'circle',
};

const crossWhite = {
  class: 'player__symbol player__symbol--cross',
  src: 'images/cross--white.svg',
  alt: 'cross',
}; */

const addcircle = (e) => {
  if (currentPlayer === 'circle') {
    e.target.classList.add('board__field--circle');

    currentPlayer = 'cross';
  } else if (currentPlayer === 'cross') {
    e.target.classList.add('board__field--cross');
    currentPlayer = 'circle';
  }
  e.target.disabled = true;
};

playFieldEl.forEach((addclick) => {
  addclick.addEventListener('click', addcircle);
});
