import $ from 'jquery';

export const renderArray = (array, parent, component) => {
  $(`#${parent}`).html('');

  array.forEach(e => {
    $(`#${parent}`).append(component(e))
  });
}

export const renderToParent = (parent, component) => {
  $(`#${parent}`).append(component())
}

export const getId = (raw) => raw.split('-')[1];
