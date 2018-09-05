/**
 * 制作
 */

import $ from 'zepto-modules/zepto';
import {saveBagMake} from '../app_api_1';
import * as layerMsg from '../layer_msg';
import resultTagPage from './result_tag';

const aniEndEvent = 'animationend webkitAnimationEnd';

let deferred;
let selected = false;
let lastClickTag;
let pageGiftbox = $('[ux-page=giftbox]')
    , pageMaking = $('[ux-page=making]')
    , layerMain = pageMaking.find('.layer')
    , layerEnvelopeText = layerMain.find('.envelope-text')
    , btnGo = pageMaking.find('.tag-container .ani .btn-go')
    , selectedTagId = 0;
;
// 显示礼盒打开动画
let showGiftBox = () => {
  let box = pageGiftbox.find('.box');
  box.on('click', () => {
    showMakingUI();
    pageGiftbox.addClass('hide');
  });
  box.on(aniEndEvent, () => {
    setTimeout(() => {
      showMakingUI();
      pageGiftbox.addClass('hide');
    }, 2000);
  });
  // 动画
  box.removeClass('ani');
  setTimeout(() => {
    box.addClass('ani');
  }, 300);
  pageGiftbox.removeClass('hide');
  deferred.resolve(1);
};
// 显示制作界面
let showMakingUI = () => {
  pageMaking.removeClass('hide');
  // 绑定事件
  pageMaking.find('.tag').on('click', onClickTag);
  layerMain.find('.btn-ok').on('click', onClickLayerBtnOk);
  layerMain.find('.envelope-text .close').on('click', onClickLayerBtnClose);
  btnGo.on('click', onClickBtnGo);
  // 显示层
  let envelope1 = pageMaking.find('.envelope1');
  envelope1.removeClass('ani');
  envelope1.on(aniEndEvent, () => {
    envelope1.removeClass('ani');
    envelope1.addClass('hide');
    layerMain.addClass('hide');
  });
  setTimeout(() => {
    envelope1.addClass('ani');
  }, 1);
};
// 关闭选择提示的文字层
let closeLayerText = () => {
  layerMain.addClass('hide');
  layerEnvelopeText.addClass('hide');
};
let playWaterPipeAni = () => {
  //tag-container ani
  let aniTag = pageMaking.find('.tag-container .ani');
  aniTag.removeClass('run');
  aniTag.on(aniEndEvent, () => {
    // 显示可点击的按钮
    btnGo.removeClass('hide');
  });
  setTimeout(() => {
    aniTag.addClass('run');
  }, 1);
};
// 处理点击tag
let onClickTag = function() {
  if (selected) return;
  let btn = $(this);
  let oldTagId = selectedTagId;
  selectedTagId = btn.data('id');
  console.log(+new Date, 'btn tag click...', selectedTagId);
  // 设置显示内容
  let text = layerEnvelopeText.find('.text');
  text.removeClass('t' + oldTagId);
  text.addClass('t' + selectedTagId);
  // 显示确认层
  layerMain.removeClass('hide');
  layerEnvelopeText.removeClass('hide');
  lastClickTag = btn;
};
// 点击确认选择按钮
let onClickLayerBtnOk = function() {
  console.log(+new Date, 'btn layer btn ok click...');
  closeLayerText();
  playWaterPipeAni();
  lastClickTag.addClass('active');
  selected = true;
};
// 点击关闭按钮
let onClickLayerBtnClose = function() {
  // console.log(+new Date, 'btn layer btn close click...');
  closeLayerText();
};
// 显示结果
let onClickBtnGo = function() {
  let index = layerMsg.loading();
  saveBagMake(selectedTagId).then((succ) => {
    if (succ == 1) {
      // 查看结果
      resultTagPage(selectedTagId).then(function() {
        // 隐藏当前界面
        pageMaking.addClass('hide');
        // 外层框架隐藏
        $('#page_container').addClass('hide');
        layerMsg.close(index);
      });
    } else {
      layerMsg.close(index);
      layerMsg.alert('制作失败，请重新制作！');
    }
  });

};
export default () => {
  deferred = $.Deferred();
  showGiftBox();
  // init();
  // def.resolve(1);
  return deferred.promise();
}