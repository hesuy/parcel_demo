(function(factory) {
  window.ux = typeof window.ux !== 'undefined' ? window.ux : {};
  window.ux.wechat = typeof window.ux.wechat !== 'undefined' ? window.ux.wechat : {};
  factory(window.ux.wechat);
}(function(wechat) {
  wechat.shareTitle = typeof wechat.shareTitle !== 'undefined' ? wechat.shareTitle : document.title;
  wechat.shareDesc = typeof wechat.shareDesc !== 'undefined' ? wechat.shareDesc : '';
  wechat.shareLink = typeof wechat.shareLink !== 'undefined' ? wechat.shareLink : location.href;
  wechat.shareCover = typeof wechat.shareCover !== 'undefined' ? wechat.shareCover : (document.images.length > 0
      ? document.images[0].src
      : '');
  wechat.shareType = typeof wechat.shareType !== 'undefined' ? wechat.shareType : 'link';
  wechat.shareDataUrl = typeof wechat.shareDataUrl !== 'undefined' ? wechat.shareDataUrl : '';
  wechat.timeLineCallback = function() {};
  // 出错
  wechat.error = function(res) {
    console.log(res);
  };
  // 成功分享
  wechat.shareSuccess = function(type, res) {
    console.log(type, res);
  };
  // 取消分享
  wechat.shareCancel = function(type, res) {
    console.log(type);
    console.log(res);
  };
  let shareConfig = function(type) {
    let success = function(res) {
      let shareType = type;
      wechat.shareSuccess && wechat.shareSuccess(shareType, res);
    };
    let cancel = function(res) {
      var shareType = type;
      wechat.shareCancel && wechat.shareCancel(shareType, res);
    };
    let base = {
      title: wechat.shareTitle,
      desc: wechat.shareDesc,
      link: wechat.shareLink,
      imgUrl: wechat.shareCover,
      trigger: function(res) {
        this.title = wechat.shareTitle;
        this.desc = wechat.shareDesc ? wechat.shareDesc : wechat.shareTitle;
        this.link = wechat.shareLink;
        this.imgUrl = wechat.shareCover;
      }
    };
    let micro = {
      title: wechat.shareDesc,
      link: wechat.shareLink,
      imgUrl: wechat.shareCover,
      trigger: function(res) {
        this.title = wechat.shareDesc ? wechat.shareDesc : wechat.shareTitle;
        this.link = wechat.shareLink;
        this.imgUrl = wechat.shareCover;
        wechat.timeLineCallback(this);
      }
    };
    let dataConfig = {
      title: wechat.shareTitle,
      desc: wechat.shareDesc,
      link: wechat.shareLink,
      imgUrl: wechat.shareCover,
      type: wechat.shareType,
      dataUrl: wechat.shareDataUrl,
      trigger: function(res) {
        this.title = wechat.shareTitle;
        this.desc = wechat.shareDesc ? wechat.shareDesc : wechat.shareTitle;
        this.link = wechat.shareLink;
        this.imgUrl = wechat.shareCover;
        this.type = wechat.shareType;
        this.dataUrl = wechat.shareDataUrl;
      }
    };
    base.success = success;
    base.cancel = cancel;
    micro.success = success;
    micro.cancel = cancel;
    dataConfig.success = success;
    dataConfig.cancel = cancel;

    if (type == 'timeLine') {
      return micro;
    }
    if (type == 'appMessage') {
      return dataConfig;
    }
    return base;
  };
  wechat.init = function() {
    wx.error(wechat.error);
    wx.ready(function() {
      wx.onMenuShareTimeline(shareConfig('timeLine'));
      wx.onMenuShareAppMessage(shareConfig('appMessage'));
      wx.onMenuShareQQ(shareConfig('qq'));
      wx.onMenuShareWeibo(shareConfig('weibo'));
      wx.onMenuShareQZone(shareConfig('qzone'));
    });
  };
}));