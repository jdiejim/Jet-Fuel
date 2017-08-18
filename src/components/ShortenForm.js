import $ from 'jquery';
import { renderArray, renderToParent } from '../utils/helpers';
import ShortenFolderCell from './ShortenFolderCell';
import './styles/ShortenForm.scss';

export const mount = () => {
  viewDidMount();
}

export const loadEvents = () => {
  $('#save-folder').on('click', saveFolder);
  $('#shorten-folders').on('click', '.save-btn', savePath);
}

const viewDidMount = () => {
  fetchFolders();
}

const fetchFolders = () => {
  console.log('fetching');
  fetch('api/v1/folders')
    .then(res => res.json())
    .then(folders => renderArray(folders, 'shorten-folders', ShortenFolderCell))
    .catch(error => console.log(error))
}

const postPath = (id, body) => {
  fetch(`api/v1/folders/${id}/paths`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type' : 'application/json' }
  })
  .then(res => res.json())
  .then(path => {
    console.log(path);
    appendShort(path);
  })
  .catch(error => console.log(error))
}

const postFolder = (body) => {
  fetch(`api/v1/folders`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type' : 'application/json' }
  })
  .then(res => res.json())
  .then(() => fetchFolders())
  .catch(error => console.log(error))
}

const getId = (raw) => raw.split('-')[1];

const getInputs = () => {
  const title = $('#input-title').val();
  const path = $('#input-path').val();

  return { title, path };
}

const clearInputs = () => {
$('#input-title').val('');
$('#input-path').val('');
}

const savePath = (e) => {
  const parent = $(e.target).parent();
  const id = getId(parent.prop('id'));
  const body = getInputs();

  postPath(id, body);
  clearInputs()
}

const saveFolder = () => {
  const name = $('#input-folder').val();

  postFolder({ name });
}

const appendShort = ({ short }) => {
  const link = `${window.location.href}${short}`;
  const component = `<a class="path-link" href="${link}" target="_blank">${link}</a>`;

  $('.shorten-wrapper').append(component);
}
