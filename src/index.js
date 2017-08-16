import $ from 'jquery';
import LinkCell from './components/LinkCell';
import './index.scss';

$('.nav').on('click', '.tab', toggleTab);
$('.nav').on('animationend', removeRippleAnimation);

didMount(1)

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

function didMount(id) {
  fetch(`api/v1/folders/${id}/paths`)
    .then(res => res.json())
    .then(data => getLinks(data))
    .catch(error => console.log(error))
}

function getLinks(data) {
  renderArray(data, 'folder-wrapper', LinkCell)
}


const renderArray = (array, parent, component) => {
  array.forEach(e => {
    $(`#${parent}`).append(component(e))
  });
}
