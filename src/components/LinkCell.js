import './styles/LinkCell.scss';

const LinkCell = ({ title, short }) => {
  const link = `http://localhost:3000/${short}`;

  return `
    <article class="link-cell">
      <h3 class="link-title">${title}</h3>
      <a class="link" href="/${short}">${link}</a>
    </article>
  `
}

export default LinkCell;
