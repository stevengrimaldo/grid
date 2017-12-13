import '../scss/app.scss';

import grid from './components/_grid';

import {
  scroll,
  inView
} from './utils';

window.addEventListener('load', () => {
  grid();

  inView('[data-sfx]');

  scroll(() => {
    inView('[data-sfx]');
  });
});
