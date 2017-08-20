// import $ from 'jquery';
// import { renderArray, renderToParent } from '../utils/helpers';
// import FolderCell from './FolderCell';
// import PathCell from './PathCell';
// import './styles/Collections.scss';
//
// export const mount = () => {
//   renderToParent('app', component);
//   viewDidMount();
// }
//
// export const unMount = () => {
//   $('#collections').off('click')
//   $('.collections-wrapper').remove();
// }
//
// const viewDidMount = () => {
//   fetchFolders();
//   $('#collections').on('click', '.folder-cell', handleClick);
// }
//
// const component = () => {
//   return `
//     <section class="collections-wrapper">
//       <section id="collections" class="collections-folders"></section>
//       <section id="collections-paths" class="collections-paths"></section>
//     </section>
//     `
// }
//
// const fetchFolders = () => {
//   fetch('api/v1/folders')
//     .then(res => res.json())
//     .then(folders => renderArray(folders, 'collections', FolderCell))
//     .catch(error => console.log(error))
// }
//
// const fetchPaths = (id) => {
//   fetch(`api/v1/folders/${id}/paths`)
//     .then(res => res.json())
//     .then(paths => {
//       renderArray(paths, 'collections-paths', PathCell);
//       handleAnimation($('.collections-wrapper'));
//     })
//     .catch(error => console.log(error))
// }
//
// const getId = (raw) => raw.split('-')[1];
//
// const handleClick = ({ target, target: { className } }) => {
//   const cell = className === 'folder-title' ? $(target).parent() : $(target);
//   const id = getId(cell.prop('id'));
//
//   fetchPaths(id);
// }
//
// const handleAnimation = (el) => {
//   if (el.hasClass('collections-expand')) {
//     el.removeClass('collections-expand');
//     setTimeout(() => el.addClass('collections-expand'), 300);
//   } else {
//     el.addClass('collections-expand');
//   }
// }
