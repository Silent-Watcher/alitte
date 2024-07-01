let toggle = document.querySelector('#toggleReadMore'),
  more = document.querySelector('#more'),
  dots = document.querySelector('#dots'),
  isExpanded = false;

toggle.onclick = toggleReadMore;

function toggleReadMore() {
  more.classList.toggle('hidden');
  dots.classList.toggle('hidden');
  toggle.innerText = isExpanded ? 'Read more' : 'Read less';
  isExpanded = !isExpanded;
}

