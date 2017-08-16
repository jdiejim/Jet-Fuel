import $ from 'jquery';
import * as Collections from './components/Collections';
import './index.scss';

$('.nav').on('click', '.tab', toggleTab);

function toggleTab(e) {
  const tab = $(e.target).prop('id');

  handleTabClass(tab);
  renderView(tab);
}

function renderView(tab) {
  switch (tab) {
    case 'tab-1':
      return Collections.unMount();
    case 'tab-2':
      return Collections.unMount();
    case 'tab-3':
      return Collections.mount();
  }
}

function handleTabClass(tab) {
  $('.tab').removeClass('active-tab');
  $(`#${tab}`).addClass('active-tab');
}
