import './styles/ShortenFolderCell.scss';

const ShortenFolderCell = ({ id, name }) => {
  return `
    <article id="folder-${id}" class="shorten-folder-cell">
      <h3 class="shorten-folder-title">${name}</h3>
      <button class="save-btn">Save</button>
    </article>
  `
}


export default ShortenFolderCell;
