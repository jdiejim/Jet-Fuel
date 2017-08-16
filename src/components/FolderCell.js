import './styles/FolderCell.scss';

const FolderCell = ({ id, name }) => {
  return `
    <article id="folder-${id}" class="folder-cell">
      <h3 class="folder-title">${name}</h3>
    </article>
  `
}


export default FolderCell;
