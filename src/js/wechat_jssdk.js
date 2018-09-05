/**
 * 微信jssdk
 */

import $ from 'zepto-modules/zepto';
import {msg} from './layer_msg';
import './wechat';

const DEBUG = true;
const JS_API_LIST = [
  'onMenuShareTimeline',
  'onMenuShareAppMessage',
  'onMenuShareQQ',
  'onMenuShareWeibo',
  'onMenuShareQZone',
  'startRecord',
  'stopRecord',
  'onVoiceRecordEnd',
  'playVoice',
  'pauseVoice',
  'stopVoice',
  'onVoicePlayEnd',
  'uploadVoice',
  'downloadVoice',
  'chooseImage',
  'previewImage',
  'uploadImage',
  'downloadImage',
  'translateVoice',
  'getNetworkType',
  'openLocation',
  'getLocation',
  'hideOptionMenu',
  'showOptionMenu',
  'hideMenuItems',
  'showMenuItems',
  'hideAllNonBaseMenuItem',
  'showAllNonBaseMenuItem',
  'closeWindow',
  'scanQRCode',
  'chooseWXPay',
  'openProductSpecificView',
  'addCard',
  'chooseCard',
  'openCard'];

const URL = 'https://bi.arvatobi.com/mgm/wxconfig?url=' + encodeURIComponent(location.href);

let init = () => {
  $.get(URL, function(result) {
    if (result.code != 0) {
      msg(result.message);
      return;
    }
    let conf = result.config;
    conf.debug = DEBUG;
    conf.jsApiList = JS_API_LIST;
    wx.config(conf);
    ux.wechat.init();
  }, 'json');
};

init();