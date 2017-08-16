import $ from 'jquery';
import './styles/index.scss';

$('.nav').on('click', '.tab', toggleTab);
$('.nav').on('animationend', removeRippleAnimation);

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
