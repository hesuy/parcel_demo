/**
 * 新客
 */

import $ from 'zepto-modules/zepto';
import 'zepto-modules/event';
import * as dao from '../dao';
import {Card} from '../wx_add_card';

let inited = false
    , pageTag
    , btnGet
    , _offerId = 4
;

let init = () => {
  if (inited) return;
  pageTag = $('[ux-page=new]');
  btnGet = pageTag.find('[ux-btn=get]');
  btnGet.on('click', onClickGet);
  inited = true;
};
/**
 * 点击get按钮
 */
let onClickGet = function() {
  let btn = $(this);
  console.log(+new Date, 'btn get click...', btn.data('id'));
  let status = parseInt(btn.data('status'));
  if(status < 1) {
    (new Card(_offerId)).then((id, succ) => {
      dao.setOfferStatus(id, succ);
      // 更新界面
      setBtnStatus(btnGet, succ);
    });
  }
};
/**
 * 设置按钮的状态
 * @param btn
 * @param status
 */
let setBtnStatus = (btn, status) => {
  let btnParent = btn.parent();
  btn.data('status', status);
  if (status > 0) {
    btnParent.addClass('already');
  } else {
    btnParent.removeClass('already');
  }
};

export default () => {
  let def = $.Deferred();
  init();
  dao.getOfferStatus(_offerId).then((status) => {
    status = parseInt(status);
    setBtnStatus(btnGet, status);
    // 显示界面
    pageTag.removeClass('hide');
    def.resolve(1);
  });
  return def.promise();
}