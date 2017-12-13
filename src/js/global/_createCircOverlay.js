import { TweenMax } from 'gsap';

let i;

export default (cont, elem) => {
  for (i = 0; i < cont.length; i += 1) {
    const dummy = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

    const width = elem.offsetWidth;
    const height = elem.offsetHeight;
    const offset = elem.getBoundingClientRect();
    const parent = cont[i].getBoundingClientRect();
    const parentOffsetLeft = parent.left + 10;
    const parentOffsetTop = parent.top + 10;
    const offsetLeft = offset.left;
    const offsetTop = offset.top;
    const halfWidth = width / 2;
    const halfHeight = height / 2;

    const container = {
      width: cont[i].offsetWidth,
      height: cont[i].offsetHeight
    };

    dummy.setAttributeNS(null, 'version', '1.1');
    dummy.setAttributeNS(null, 'width', '100%');
    dummy.setAttributeNS(null, 'height', '100%');
    dummy.setAttributeNS(null, 'class', 'grid__overlay');

    dummy.appendChild(g);
    g.appendChild(circle);
    cont[i].appendChild(dummy);

    // svg
    const SVGCircleGroupEl = cont[i].querySelector('svg > g');
    const SVGCircleEl = SVGCircleGroupEl.querySelector('circle');

    SVGCircleEl.setAttributeNS(null, 'cx', (offsetLeft - parentOffsetLeft) + halfWidth);
    SVGCircleEl.setAttributeNS(null, 'cy', (offsetTop - parentOffsetTop) + halfHeight);
    SVGCircleEl.setAttributeNS(null, 'r', 0);

    // eslint-disable-next-line no-restricted-properties
    const containerSize = Math.sqrt(Math.pow(container.width, 2) + Math.pow(container.height, 2));

    // apply transform to the svg overlay
    TweenMax.set(SVGCircleEl, { opacity: 1, scale: 0 });
    TweenMax.to(SVGCircleEl, 0.6, { attr: { r: containerSize } });
    TweenMax.to(SVGCircleEl, 0.6, { scale: 1 }, '-=0.3');
  }
};
