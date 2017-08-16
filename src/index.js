import $ from 'jquery';
import './styles/index.scss';

$('.nav').on('click', '.tab', toggleTab);
$('.nav').on('animationend', removeRippleAnimation);

didMount()

function toggleTab(e) {
  if ($(e.target).prop('class') === 'ripple') {
    return;
  }

  const id = $(e.target).prop('id');
  const length = $(`#${id}`).children().length;
  const { top } = this.getBoundingClientRect();

  $('.tab').removeClass('active-tab');
  $(`#${id}`).addClass('active-tab');
  $(`#${id}`).addClass('animate-tab');

  if (!length) {
    $(`#${id}`).append('<div class="ripple"></div>');
  }

  $('.ripple').css({
    top: `${e.clientY - 1 - top}px`,
    left: `${e.clientX - 1}px`
  })
}

function addRippleAnimation(e) {

}

function removeRippleAnimation(e) {
  $(e.target).parent().removeClass('animate-tab');
}

function didMount() {
  fetch('api/v1/folders/3/paths')
    .then(res => res.json())
    .then(data => getLinks(data))
    .catch(error => console.log(error))
}

function getLinks(data) {
  data.forEach(e => {
    $('.folder-wrapper').append(LinkCell(e))
  })
}

function LinkCell(cell) {
  return `
    <article class="link-cell">
      <h3>${cell.title}: </h3>
      <a href="/${cell.short}">http://localhost:3000/${cell.short}</a>
    </article>
  `;
}
