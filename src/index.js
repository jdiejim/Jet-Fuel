import $ from 'jquery';
import * as Collections from './components/Collections';
import * as ShortenForm from './components/ShortenForm';
import './index.scss';

$('.nav').on('click', '.tab', toggleTab);

ShortenForm.mount();

function toggleTab(e) {
  const tab = $(e.target).prop('id');

  handleTabClass(tab);
  renderView(tab);
}

function renderView(tab) {
  switch (tab) {
    case 'tab-1':
      ShortenForm.unMount();
      return Collections.unMount();
    case 'tab-2':
      Collections.unMount();
      return ShortenForm.mount();
    case 'tab-3':
      ShortenForm.unMount();
      return Collections.mount();
  }
}

function handleTabClass(tab) {
  $('.tab').removeClass('active-tab');
  $(`#${tab}`).addClass('active-tab');
}
