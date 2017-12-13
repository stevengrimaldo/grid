export default (elem) => {
  const cols = document.querySelectorAll(elem);
  const group = [];
  let i;
  let set;

  for (set = 0; set < cols.length; set += 1) {
    cols[set].style.height = 'auto';

    group.push(cols[set].scrollHeight);

    for (i = 0; i < cols.length; i += 1) {
      // eslint-disable-next-line prefer-spread
      cols[i].style.height = Math.max.apply(Math, group) + 'px';
    }
  }
};
