/**
 * 老客
 */

import $ from 'zepto-modules/zepto';
import 'zepto-modules/event';
import {getOfferStatus} from '../dao';
import {Card} from '../wx_add_card';
import * as dao from '../dao';
import marking from './marking';
import resultTagPage from './result_tag';

let inited = false
    , pageTag
    , btnGets
    , _offerIds = [1, 2, 3]
;

let init = () => {
  if (inited) return;
  pageTag = $('[ux-page=old]');
  btnGets = pageTag.find('[ux-btn=get]');
  btnGets.on('click', onClickGet);
  inited = true;
};
/**
 * 点击get按钮
 */
let onClickGet = function() {
  let btn = $(this);
  console.log(+new Date, 'btn get click...', btn.data('id'));
  let id = parseInt(btn.data('id'));
  let status = parseInt(btn.data('status'));
  if ([1, 2].indexOf(id) > -1) {
    if (status < 1) {
      // 发卡券
      (new Card(id)).then((id, succ) => {
        dao.setOfferStatus(id, succ);
        // 更新界面
        setBtnStatus(btn, succ);
      });
    }
  } else if (id == 3) {
    if (status < 1) {
      // 制作流程
      marking().then(function() {
        // 隐藏当前界面
        pageTag.addClass('hide');
      });
    } else {
      // 查看结果
      resultTagPage(dao.getBagid(3)).then(function() {
        // 隐藏当前界面
        pageTag.addClass('hide');
      });
    }
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
  getOfferStatus(_offerIds).then((status) => {
    for (let i in status) {
      let oid = _offerIds[i];
      btnGets.each(function() {
        let btn = $(this);
        if (oid == btn.data('id')) {
          let s = parseInt(status[i]);
          setBtnStatus(btn, s);
        }
      });
    }
    // 显示界面
    pageTag.removeClass('hide');
    def.resolve(1);
  });
  return def.promise();
}