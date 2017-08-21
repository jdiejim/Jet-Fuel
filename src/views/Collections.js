import $ from 'jquery';
import moment from 'moment';
import { getId, renderArray } from '../utils/helpers';
import './styles/Collections.scss';

class Collections {
  constructor() {
    this.loadUrls = this.loadUrls.bind(this);
    this.folders = [];
  }

  mount() {
    if (!this.folders.length) {
      this.fetchFolders();
    }

    $('#collections-wrapper').addClass('show');
    $('#collections-folders').addClass('show');
  }

  unMount() {
    $('#collections-wrapper').removeClass('show');
    $('#collections-folders').removeClass('show');
    $('#collections-paths').removeClass('show');
  }

  loadEvents() {
    $('#collections-folders').on('click', '.folder-cell', this.loadUrls);
  }

  loadUrls({ target, target: { className } }) {
    const cell = className === 'folder-title' ? $(target).parent() : $(target);
    const id = getId(cell.prop('id'));

    $('#collections-paths').addClass('show');
    this.fetchPaths(id);
  }

  handleAnimation(el) {
    if (el.hasClass('collections-expand')) {
      el.removeClass('collections-expand');
      setTimeout(() => el.addClass('collections-expand'), 300);
    } else {
      el.addClass('collections-expand');
    }
  }

  fetchPaths(id) {
    fetch(`api/v1/folders/${id}/paths`)
      .then(res => res.json())
      .then(paths => {
        renderArray(paths, 'collections-paths', this.pathCell);
        this.handleAnimation($('#collections-wrapper'));
      })
      .catch(error => console.log(error))
  }

  fetchFolders() {
    fetch('api/v1/folders')
      .then(res => res.json())
      .then(folders => {
        renderArray(folders, 'collections-folders', this.folderCell);
        this.folders = folders;
      })
      .catch(error => console.log(error))
  }

  folderCell({ id, name }) {
    return `
      <article id="folder-${id}" class="folder-cell">
        <div class="collection-icon"></div>
        <h3 class="folder-title">${name}</h3>
      </article>
    `
  }

  pathCell({ id, title, short, path, created_at }) {
    const link = `${window.location.href}${short}`;

    return `
      <article id="path-${id}" class="path-cell">
        <section class="path-info-wrapper">
          <h3 class="path-title">${title}:</h3>
          <a class="path-link" href="${link}" target="_blank">${link}</a>
        </section>
        <p class="path-date">${moment(created_at).format('MMM DD YY, h:mm a')}</p>
      </article>
    `
  }
}

export default new Collections();
