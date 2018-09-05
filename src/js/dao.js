/**
 * 数据访问处理
 */

import * as api from './app_api_1';
import $ from 'zepto-modules/zepto';
import 'zepto-modules/deferred';

// 用户资格
let _userQualify;

let _offers;

export const USER_QUALIFY = {
  none: 'none',
  new: 'new',
  exist: 'exist'
};

/**
 * 用户活动参与资格
 * @param refresh
 * @return {*}
 */
export let getUserQualify = (refresh) => {
  let def = $.Deferred();
  if (_userQualify == null || refresh) {
    api.userQualify().then(function(qualify) {
      _userQualify = qualify;
      def.resolve(_userQualify);
      /// TODO TEST
      // def.resolve(USER_QUALIFY.none);
      // def.resolve(USER_QUALIFY.new);
      // def.resolve(USER_QUALIFY.exist);
    });
  } else {
    def.resolve(_userQualify);
  }
  return def.promise();
};

/**
 * 礼物领取状态
 * @param offer 礼物id ,可为数组，多个查询
 * @return {*}
 */
export let getOfferStatus = (offer) => {
  let def = $.Deferred();
  let getStatus = () => {
    let offerIds = $.isArray(offer) ? offer : [offer];
    // 全初始化为0
    let status = new Array(offerIds.length + 1).join('0').split('');
    for (let i in _offers) {
      let d = _offers[i];
      for (let ii in offerIds) {
        let oid = offerIds[ii];
        if (d.offerid == oid) {
          status[ii] = d.offerstatus;
        }
      }
    }
    // def.resolve([1,0,1])
    def.resolve(status.length > 1 ? status : status[0]);
  };
  if (_offers == null) {
    api.offerStatus().then((result) => {
      _offers = result;
      // {"code":"0","message":"OK","data":"[{\"offerid\":1,\"offername\":\"优雅回柜礼\",\"offerstatus\":0},{\"offerid\":2,\"offername\":\"尊享买赠礼\",\"offerstatus\":0},{\"offerid\":3,\"offername\":\"赠友礼遇\",\"offerstatus\":0}]"}
      // {"code":"0","message":"OK","data":"[{\"offerid\":4,\"offername\":\"新客香遇礼遇\",\"offerstatus\":0}]"}
      getStatus();
    });
  } else {
    getStatus();
  }
  return def.promise();
};
/**
 * 获取用户选择的标签ID
 * @param id
 * @return {*}
 */
export let getBagid = (id) => {
  for (let i in _offers) {
    let d = _offers[i];
    if (d.offerid == id) {
      return d.bagid;
    }
  }
};

/**
 * 设置领取状态
 * @param offerId
 * @param status
 */
export let setOfferStatus = (offerId, status) => {
  // TODO 设置领取状态
  let def = $.Deferred();
  for (let i in _offers) {
    if (_offers[i].offerid == offerId) {
      _offers[i].offerstatus = status;
    }
  }
  // TODO 是否需要发送到服务端
  def.resolve(1);
  return def.promise();
};