/**
 * 入口
 */

import '../scss/app.scss';

import $ from 'zepto-modules/zepto';
import {loading, close as layerClose} from './layer_msg';
import * as dao from './dao';
import layerSorry from './layer/sorry';
import newUserPage from './pages/new_user';
import oldUserPage from './pages/old_user';
import './wechat_jssdk';

// 初始化
let init = function() {
  let pageTag = $('[ux-page=loading]');
  // 提示加载中
  let loadingIndex = loading();
  // 关闭load页面
  let closeLoadingPage = () => {
    layerClose(loadingIndex);
    pageTag.addClass('hide');
  };
  // 活动参与资格判定接口
  dao.getUserQualify(1).then(function(qualify) {
    switch (qualify) {
      case dao.USER_QUALIFY.new:
        // 新客
        newUserPage().then(closeLoadingPage);
        break;
      case dao.USER_QUALIFY.exist:
        // 老客
        oldUserPage().then(closeLoadingPage);
        break;
      default:
        // 没有资格
        layerClose(loadingIndex);
        layerSorry();
        break;
    }
  });
  // 所有规则页面点击处理
  $('.btn-rule').on('click', showRuleLayer);
  $('.btn-share').on('click', showShareLayer);
  $('[ux-layer=share]').on('click', hideShareLayer);
};

let showRuleLayer = function() {
/// TODO 显示规则层
  console.log(+new Date, 'btn rule click...');
};

let showShareLayer = () => {
  $('[ux-layer=share]').removeClass('hide');
};

let hideShareLayer = () => {
  $('[ux-layer=share]').addClass('hide');
};
init();