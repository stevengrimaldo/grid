import { TweenMax } from 'gsap';

let i;

export default (cont, elem) => {
  for (i = 0; i < cont.length; i += 1) {
    const elWidth = elem.offsetWidth;
    const elHeight = elem.offsetHeight;
    const parent = cont[i].getBoundingClientRect();
    const offset = elem.getBoundingClientRect();
    const offsetLeft = offset.left - parent.left - 10;
    const offsetTop = offset.top - parent.top - 10;

    const dummy = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

    const container = {
      width: cont[i].clientWidth,
      height: cont[i].clientHeight
    };

    const contWidth = container.width - 20;
    const contHeight = container.height - 20;

    dummy.setAttributeNS(null, 'version', '1.1');
    dummy.setAttributeNS(null, 'width', '100%');
    dummy.setAttributeNS(null, 'height', '100%');
    dummy.setAttributeNS(null, 'class', 'grid__overlay');

    rect.setAttributeNS(null, 'x', offsetLeft); // position left
    rect.setAttributeNS(null, 'y', offsetTop); // position top
    // eslint-disable-next-line no-restricted-properties
    rect.setAttributeNS(null, 'width', elWidth);
    // eslint-disable-next-line no-restricted-properties
    rect.setAttributeNS(null, 'height', elHeight);

    dummy.appendChild(g);
    g.appendChild(rect);
    cont[i].appendChild(dummy);

    // set initial svg state
    TweenMax.set(rect, { opacity: 0 });

    const SVGRectGroupEl = cont[i].querySelector('svg > g');
    const SVGRectEl = SVGRectGroupEl.querySelector('rect');

    // apply transform to the svg overlay
    TweenMax.to(SVGRectEl, 0.6, { attr: { x: 0, y: 0, width: contWidth, height: contHeight } });
    TweenMax.to(SVGRectEl, 0.6, { opacity: 1 }, '-=0.6');
  }
};
