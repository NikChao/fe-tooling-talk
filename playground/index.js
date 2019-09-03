function renderCount (count) {
  document.getElementById('count').innerHTML = count;
}

let count = 0;
document.getElementById('increment').onclick = function (e) {
  e.preventDefault();
  renderCount(++count);
}

renderCount(count);