import { TweenMax, TimelineMax } from 'gsap';

import {
  addClass,
  hasClass,
  wrap,
  getIndex
} from 'common_';

import {
  snappy,
  smoothInOut
} from '../easing';

import SplitText from '../vendors/gsap/src/bonus-files-for-npm-users/SplitText';

const getToggleItemMove = function (el) {
  return () => {
    el.classList.add('sfx-visible');

    if (el.hasAttribute('data-sfx-headline')) {
      let textType;
      TweenMax.set(el, {
        width: el.offsetWidth
      });
      const headlineText = el.textContent || el.innerText;
      if (headlineText.indexOf(' ') < 0) {
        textType = 'words';
      } else {
        textType = 'lines';
      }
      const mySplitText = new SplitText(el, {
        type: textType,
        linesClass: 'line',
        wordsClass: 'line'
      });
      const lines = el.querySelectorAll('.line');
      const lineWrapper = document.createElement('div');
      addClass(lineWrapper, 'line-wrapper');
      wrap(lines, lineWrapper);
      const headlineSplit = mySplitText;
      const findLine = el.querySelectorAll('.line');
      TweenMax.set(findLine, {
        y: '100%',
        force3D: true
      });
      const revert = () => {
        headlineSplit.revert();
        TweenMax.set(el, {
          clearProps: 'width'
        });
      };
      TweenMax.staggerFromTo(findLine, 0.75, {
        y: '100%'
      }, {
        y: '0%',
        ease: snappy,
        delay: el.getAttribute('data-sfx-delay'),
        onComplete: revert
      }, 0.055);
    } else if (el.hasAttribute('data-sfx-mask')) {
      const maskOverlay = document.createElement('div');
      addClass(maskOverlay, 'sfx-mask');
      el.appendChild(maskOverlay);
      const maskCover = maskOverlay;
      const media = el.childNodes[1];
      const unHide = () => {
        addClass(maskCover, 'hidden');
        maskCover.parentNode.removeChild(maskCover);
      };
      const maskTimeline = new TimelineMax({
        onComplete: unHide
      });
      const clearProps = () => {
        TweenMax.set(media, {
          clearProps: 'opacity'
        });
      };
      TweenMax.set(media, {
        opacity: 0,
        scale: 1.075,
        force3D: true
      });
      TweenMax.set(maskCover, {
        y: '100%',
        force3D: true
      });
      maskTimeline.to(maskCover, 0.5, {
        y: '0%',
        ease: snappy,
        onComplete: clearProps
      });
      maskTimeline.to(maskCover, 0.55, {
        y: '-101%',
        ease: snappy
      }, '+=0.1');
      maskTimeline.to(media, 1.5, {
        scale: 1,
        ease: smoothInOut,
        clearProps: 'scale'
      }, 0.55);
    }
  };
};

export default (selector) => {
  const sections = document.querySelectorAll(selector);
  const winHeightOffset = 0.75;
  const pageTopOffset = 0;
  const delay = 75;
  const vpHeight = window.innerHeight * winHeightOffset;

  // Don't run the rest of the code if every section is already visible
  if (document.querySelectorAll(selector + ':not(.visible)').length === 0) return;

  // eslint-disable-next-line no-restricted-syntax
  for (const section of sections) {
    const index = getIndex(section);
    const toggleItemMove = getToggleItemMove(section);
    const secOffsetTop = section.getBoundingClientRect().top;

    if (secOffsetTop <= vpHeight && secOffsetTop > pageTopOffset) {
      if (!hasClass(section, 'sfx-visible')) {
        setTimeout(toggleItemMove, index * delay);
      }
    }
  }
};
