/**
 * 发放微信卡券
 */

import $ from 'zepto-modules/zepto';
import 'zepto-modules/deferred';
import * as api from './app_api_1';
import {loading, close as layerClose} from './layer_msg';

/**
 * 发卡处理
 */
export class Card {

  constructor(id) {
    this.deferred = $.Deferred();
    this.id = id;
    //alert('TODO：实现发券流程...');
    //this.deferred.resolve(id, 1);
    // TODO 再次实现领取卡券
    this.save();
    return this.deferred.promise();
  }

  save() {
    let index = loading();
    api.saveOfferApply(this.id).then((appleId) => {
      this.deferred.resolve(this.id, appleId);
      layerClose(index);
    });
  }
}

/*
wx.addCard({
  cardList: JSON.parse(cardList), // 需要添加的卡券列表
  success: function (res) {
    alertOpen('领卡成功！');
    $('#btn_confirm').addClass('hide');
    $('#btn_have').removeClass('hide');
    let url = API_URL.redeemSuccess + '&ps=null';
    $.ajax({url:url,dataType:'JSON'})
  },
  fail: function (res, errMsg) {
    alertOpen('领卡失败！');
  }
});
*/