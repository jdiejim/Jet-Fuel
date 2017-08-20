import $ from 'jquery';
// import * as Collections from './components/Collections';
import ShortenForm from './views/ShortenForm';
import './index.scss';

ShortenForm.initialMount();

const toggleTab = (e) => {
  const tab = $(e.target).prop('id');

  handleTabClass(tab);
  renderView(tab);
}

const handleTabClass = (tab) => {
  $('.tab').removeClass('active-tab');
  $(`#${tab}`).addClass('active-tab');
}

const renderView = (tab) => {
  switch (tab) {
    case 'tab-1':
      ShortenForm.mount();
      return;
    case 'tab-2':
      ShortenForm.unMount();
      return;
  }
}

$('.nav').on('click', '.tab', toggleTab);
