import $ from 'jquery';
import './styles/index.scss';

function func() {
  console.log(this);
}

$('button').on('click', func);
