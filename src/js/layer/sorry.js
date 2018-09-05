/**
 * 没有资格层
 */

import $ from 'zepto-modules/zepto';

let tagLayer,
    inited = false
;

let init = () => {
  if (inited) return;
  tagLayer = $('[ux-layer=sorry]');
  inited = true;
};

export default () => {
  init();
  tagLayer.removeClass('hide');
}