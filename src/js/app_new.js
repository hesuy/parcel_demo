import './layer_mobile/layer.css';
import '../scss/app_new.scss';

$.get('https://bi.arvatobi.com/mgm', function(result) {
  console.log(result);
}, 'text');