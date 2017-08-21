import $ from 'jquery';
import { getId, renderArray } from '../utils/helpers';
import './styles/ShortenForm.scss';

class ShortenForm {
  constructor() {
    this.saveFolder = this.saveFolder.bind(this);
    this.savePath = this.savePath.bind(this);
    this.folders = [];
  }

  initialMount() {
    this.loadEvents();
    this.mount();
  }

  mount() {
    if (!this.folders.length) {
      this.fetchFolders();
    }

    $('#shorten-wrapper').addClass('show');
    $('.input-form').removeClass('show-short');
    $('.short-link-wrapper').html('');
  }

  unMount() {
    $('#shorten-wrapper').removeClass('show');
  }

  loadEvents() {
    $('#save-folder').on('click', this.saveFolder);
    $('#shorten-folders').on('click', '.save-btn', this.savePath);
  }

  savePath(e) {
    const id = getId($(e.target).parent().prop('id'));
    const title = $('#input-title');
    const path = $('#input-path');

    this.postPath(id, this.getInputs());
    this.clearInputs(title, path);
  }

  postPath(id, body) {
    fetch(`api/v1/folders/${id}/paths`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type' : 'application/json' }
    })
    .then(res => res.json())
    .then(path => this.appendShort(path))
    .catch(error => console.log(error))
  }

  saveFolder() {
    const input = $('#input-folder');
    const name = input.val();

    this.postFolder({ name });
    this.clearInputs(input);
  }

  postFolder(body) {
    fetch(`api/v1/folders`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type' : 'application/json' }
    })
    .then(res => res.json())
    .then(() => this.fetchFolders())
    .catch(error => console.log(error))
  }

  fetchFolders() {
    fetch('api/v1/folders')
      .then(res => res.json())
      .then(folders => {
        renderArray(folders, 'shorten-folders', this.folderCell);
        this.folders = folders;
      })
      .catch(error => console.log(error))
  }

  appendShort({ short }) {
    const link = `${window.location.href}${short}`;
    const component = `<a class="short-link" href="${link}" target="_blank">${link}</a>`;

    $('.input-form').addClass('show-short');
    $('.short-link-wrapper').append(component);
  }

  getInputs() {
    const title = $('#input-title').val();
    const path = $('#input-path').val();

    return { title, path };
  }

  clearInputs(...inputs) {
    inputs.forEach(input => {
      input.val('');
    })
  }

  folderCell({ id, name }) {
    return `
      <article id="folder-${id}" class="shorten-folder-cell">
        <section class="shorten-cell-info">
          <div class="shorten-icon"></div>
          <h3 class="shorten-folder-title">${name}</h3>
        </section>
        <button class="save-btn">Save</button>
      </article>
    `
  }
}

export default new ShortenForm();
