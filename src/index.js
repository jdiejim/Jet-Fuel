import $ from 'jquery';
import Collections from './views/Collections';
import ShortenForm from './views/ShortenForm';
import './index.scss';

ShortenForm.initialMount();
Collections.loadEvents();

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
      return Collections.unMount();
    case 'tab-2':
      ShortenForm.unMount();
      return Collections.mount();
  }
}

$('.nav').on('click', '.tab', toggleTab);
