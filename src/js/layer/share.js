/**
 * 分享层
 */

import $ from 'zepto-modules/zepto';
import 'zepto-modules/event';

let tagLayer,
    inited = false
;
/**
 * 初始化
 */
let init = () => {
  if (inited) return;
  tagLayer = $('[ux-layer=share]');
  tagLayer.on('click', close);
  inited = true;
};

/**
 * 关闭
 */
export let close = () => {
  tagLayer.addClass('hide');
};

export default () => {
  init();
  tagLayer.removeClass('hide');
}

/*
微信分享会根据分享的不同,为原始链接拼接如下参数:

朋友圈 from=timeline&isappinstalled=0
微信群 from=groupmessage&isappinstalled=0
好友分享 from=singlemessage&isappinstalled=0
*/