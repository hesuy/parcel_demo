/**
 * API接口
 */

import $ from 'zepto-modules/zepto';
import 'zepto-modules/event';
import 'zepto-modules/callbacks';
import 'zepto-modules/deferred';
import 'zepto-modules/ajax';
import {msg} from './layer_msg';

const URL = 'https://bi.arvatobi.com/mgm/open';

/**
 * 获取请求参数数据
 * @param name
 * @param params
 * @return {{name: *, ps: string}}
 */
let getParams = (name, params) => {
//name=g$mgm_user_qualify&ps={openid:""}
  return {
    name: name,
    ps: JSON.stringify(params)
  };
};
/**
 * 请求接口
 * @param name
 * @param params
 * @param callback
 */
let _request = (name, params, callback) => {
  let options = {
    type: 'POST',
    url: URL,
    data: getParams(name, params),
    dataType: 'json',
    error: function(xhr, errorType, error) {
      msg('请求接口异常：<br/>&nbsp;&nbsp;Type: ' + errorType + '<br/>&nbsp;&nbsp;Error: ' + error);
    }
  };
  if (callback) {
    options.success = callback;
  }
  return $.ajax(options);
};
/*
xhr.done(function(data, status, xhr){ ... })
xhr.fail(function(xhr, errorType, error){ ... })
xhr.always(function(){ ... })
xhr.then(function(){ ... })
这些方法取代了 success, error, 和 complete 回调选项.
 */

export let request = _request;

/**
 * 活动参与资格判定接口
 *  new:新客
 *  exist:老客
 *  none:不符合参与资格
 * @return {*}
 */
export let userQualify = () => {
  let def = $.Deferred();
  _request('g$mgm_user_qualify', {openid: ''}).done(function(result) {
    //{"code":"0","message":"OK","data":"[{\"qualify\":\"exist\"}]"}
    if (result.code !== '0') {
      msg(result.message);
      def.reject(result);
      return;
    }
    let data = JSON.parse(result.data);
    if (data.length > 0 && data[0].qualify) {
      def.resolve(data[0].qualify);
    } else {
      def.resolve('none');
    }
  });
  return def.promise();
};

/**
 *  礼物领取状态接口
 *  0:未领取
 *  1:已领取
 * @return {*}
 */
export let offerStatus = () => {
  let def = $.Deferred();
  _request('g$mgm_offer_status', {openid: ''}).done(function(result) {
    // {"code":"0","message":"OK","data":"[{\"offerid\":1,\"offername\":\"优雅回柜礼\",\"offerstatus\":0},{\"offerid\":2,\"offername\":\"尊享买赠礼\",\"offerstatus\":0},{\"offerid\":3,\"offername\":\"赠友礼遇\",\"offerstatus\":0}]"}
    // {"code":"0","message":"OK","data":"[{\"offerid\":4,\"offername\":\"新客香遇礼遇\",\"offerstatus\":0}]"}
    if (result.code !== '0') {
      msg(result.message);
      def.reject(result);
      return;
    }
    let data = JSON.parse(result.data);
    def.resolve(data);
  });
  return def.promise();
};
/**
 * 礼品领取接口
 * @param id
 * @return {*}
 */
export let saveOfferApply = (id) => {
  let def = $.Deferred();
  _request('i$mgm_offer_apply', {openid: '', offerid: id}).done(function(result) {
    // {"code":"0","message":"OK","data":"[{\"applyid\":1,\"errmsg\":\"success\"}]"}
    if (result.code !== '0') {
      msg(result.message);
      def.reject(result);
      return;
    }
    let data = JSON.parse(result.data);
    def.resolve(data[0].applyid);
  });
  return def.promise();
};
/**
 * 制作锦囊
 * @param id
 * @return {*}
 */
export let saveBagMake = (id) => {
  let def = $.Deferred();
  _request('i$mgm_bag_make', {openid: '', bagid: id}).done(function(result) {
    // {"code":"0","message":"OK","data":"[{\"succ\":1}]"}
    if (result.code !== '0') {
      msg(result.message);
      def.reject(result);
      return;
    }
    let data = JSON.parse(result.data);
    def.resolve(data[0].succ);
  });
  return def.promise();

};

// i$mgm_bag_make