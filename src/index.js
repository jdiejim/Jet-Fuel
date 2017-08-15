import $ from 'jquery';
import './styles/index.scss';

$('.nav').on('click', '.tab', toggleTab);

function toggleTab(e) {
  const id = $(e.target).prop('id');

  $('.tab').removeClass('active-tab');
  $(`#${id}`).addClass('active-tab');
}
