(function() {
  window.ux = typeof window.ux !== 'undefined' ? window.ux : {};
  // 获取参数，设计稿的宽度
  let getDesignWidth = function() {
    let ss = document.scripts,
        obj = ss[ss.length - 1],
        url = obj.src;
    let index = url.indexOf('#');
    url = index > -1 ? url.substring(index + 1) : url ;
    let items = url.split('&');
    for (let i = 0; i < items.length; i++) {
      let item = items[i].split('=');
      if (item[0] == 'width') {
        return item[1];
      }
    }
    return 750;
  };
  let width = getDesignWidth();
  let rate = 1;
  let docEl = document.documentElement,
      resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
  let isPC = ux.isPC = function() {
    //平台、设备和操作系统
    let system = {
      win: false,
      mac: false,
      xll: false,
    };
    //检测平台
    let p = navigator.platform;
    system.win = p.indexOf('Win') === 0;
    system.mac = p.indexOf('Mac') === 0;
    system.x11 = (p === 'X11') || (p.indexOf('Linux') === 0);
    if (system.win || system.mac || system.xll) {
      return true;
    } else {
      return false;
    }
  };
  let initRem = ux.initRem = function() {
    let clientWidth = docEl.clientWidth;
    if (!clientWidth) return;
    if (clientWidth > width && isPC()) {
      clientWidth = width;
    }
    rate = clientWidth / width * 100;
    docEl.style.fontSize = rate + 'px';
  };
  let init = function() {
    if (!document.addEventListener) return;
    document.addEventListener('DOMContentLoaded', function() {
      initRem();
      window.addEventListener(resizeEvt, initRem, false);
    }, false);
    initRem();
  };
  init();
  ux.rate = rate;
  ux.designWidth = width;
})();