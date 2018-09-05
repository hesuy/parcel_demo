import $ from 'zepto-modules/zepto';
import {getOpenid} from '../cookies';

/**
 * 第一种结果页
 */

let pageTag = $('[ux-page=result]');

export default (id) => {
  let def = $.Deferred();
  pageTag.removeClass('hide');
  pageTag.find('.result').addClass('r' + id);
  // 设置分享链接、文字、图片
  ux.wechat.shareLink = 'https://bi.arvatobi.com/mgm/new.html?uid=' + getOpenid();
  def.resolve(1);
  return def.promise();
}