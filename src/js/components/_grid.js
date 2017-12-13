import { TweenMax } from 'gsap';

// eslint-disable-next-line no-unused-vars
import ScrollToPlugin from 'gsap/ScrollToPlugin';

import {
  addClass,
  hasClass,
  removeClass,
  addClick,
  extractSvg
} from 'common_';

import { matchHeight } from '../utils';

import '../../scss/components/_grid.scss';

// import createRectOverlay from '../global/_createRectOverlay';
import createCircOverlay from '../global/_createCircOverlay';

const currentSelector = document.getElementsByClassName('grid');

export default () => {
  if (currentSelector.length) {
    const gridItems = document.querySelectorAll('.grid__item--wrapper');
    const gridContent = document.querySelector('.grid__content');
    const contentFull = gridContent.querySelector('.grid__content__copy');
    const closeButton = document.querySelectorAll('.grid__content__close');
    const svgs = document.querySelectorAll('img[src$=".svg"]:not([data-no-extract])');

    // const gridContentWrapper = document.querySelector('.grid__content__intro--wrapper');
    // const gridImage = document.querySelector('.grid__content__intro-image');
    // const gridText = document.querySelector('.grid__content__intro-text');

    extractSvg(svgs);

    setTimeout(() => {
      matchHeight('[data-logo]');
    }, 1000);

    // const closeIntro = () => {
    //   gridImage.innerHTML = '';
    //   gridText.innerHTML = '';
    //
    //   TweenMax.set(gridImage, { clearProps: 'all' });
    //   TweenMax.set(gridContentWrapper, { clearProps: 'all' });
    // };

    // const copyIntro = (currentItem, currentImage, currentText) => {
    //   const elWidth = currentItem.offsetWidth;
    //   const elHeight = currentItem.offsetHeight;
    //   const gridContentIntro = document.querySelector('.grid__content__intro');
    //   const introOffsetLeft = offset.left - parent.left - 90;
    //   const introOffsetTop = offset.top - parent.top - 90;
    //   const intro = document.querySelector('.grid__content__intro--wrapper');
    //   const currentImageHTML = currentImage.innerHTML;
    //   const currentImageWidth = currentImage.offsetWidth;
    //   const currentImageHeight = currentImage.offsetHeight;
    //   const gridTimeline = new TimelineMax();
    //
    //   gridImage.innerHTML = '';
    //   gridText.innerHTML = '';
    //   gridImage.innerHTML = currentImageHTML;
    //   gridText.innerHTML = currentText;
    //
    //   addClass(gridContentIntro, 'grid__content__intro--open');
    //
    //   TweenMax.set(intro, { width: elWidth, height: elHeight, x: introOffsetLeft, y: introOffsetTop });
    //   TweenMax.set(gridImage, { width: currentImageWidth, height: currentImageHeight });
    //
    //   gridTimeline.add('moveContent');
    //   gridTimeline.to(gridImage, 0.6, { scale: 1, x: 0, left: 0 }, 'moveContent');
    //   gridTimeline.to(gridContentWrapper, 0.6, { x: 0, y: 0, }, 'moveContent');
    //   gridTimeline.to(gridContentWrapper, 0.6, { height: 'auto', width: '100%' }, 'moveContent+=0.3');
    //   gridTimeline.to(gridContentIntro, 0.6, { padding: 0 }, 'moveContent+=0.3');
    // };

    const copyContent = (content) => {
      const gridTop = currentSelector;

      contentFull.innerHTML = '';
      contentFull.innerHTML = content.innerHTML;

      const fade = contentFull.querySelectorAll('[data-fade]');

      const fadeIn = () => {
        addClass(gridContent, 'grid__content--open');

        TweenMax.staggerFromTo(fade, 0.55, {
          opacity: 0,
          y: 25
        }, {
          y: 0,
          opacity: 1
        }, 0.055);
      };

      TweenMax.to(window, 0.6, { scrollTo: { y: gridTop, offsetY: 20 }, onComplete: fadeIn });
    };

    // open svg
    addClick(gridItems, () => {
      const currentItem = document.querySelector('[data-current-scope]');
      const currentContent = currentItem.querySelector('.grid__item__content--full');
      // const currentItemImage = currentItem.querySelector('.grid__item__content-image');
      // const currentItemText = currentItem.querySelector('.grid__item__content-text').innerHTML;

      if (hasClass(gridContent, 'grid__content--open')) {
        removeClass(gridContent, 'grid__content--open');
      }

      // create the base svg overlay
      // createRectOverlay(currentSelector, currentItem);
      createCircOverlay(currentSelector, currentItem);

      // copyIntro(currentSelector, currentItemImage, currentItemText);
      copyContent(currentContent);
    });

    const closeOverlay = () => {
      removeClass(gridContent, 'grid__content--open');

      const SVGGroupEl = document.querySelector('.grid svg > g');
      // const SVGEl = SVGRectGroupEl.querySelector('rect');
      const SVGEl = SVGGroupEl.querySelector('circle');

      const resetSVG = () => {
        const overlay = document.querySelector('.grid__overlay');
        overlay.remove();
      };

      contentFull.innerHTML = '';

      // closeIntro();

      // apply transform to the svg overlay
      TweenMax.to(SVGEl, 0.3, { opacity: 0, onComplete: resetSVG });
    };

    addClick(closeButton, () => {
      closeOverlay();
    });

    document.addEventListener('keyup', (ev) => {
      if (ev.keyCode === 27 || ev.keyCode === 13) {
        closeOverlay();
      }
    });
  }
};
