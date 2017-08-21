import $ from 'jquery';

export const renderArray = (array, parent, component) => {
  $(`#${parent}`).html('');

  array.forEach(e => {
    $(`#${parent}`).prepend(component(e))
  });
}

export const renderToParent = (parent, component) => {
  $(`#${parent}`).prepend(component())
}

export const getId = (raw) => raw.split('-')[1];
