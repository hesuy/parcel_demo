import cookie from 'js-cookie';

const KEY_OPENID = 'openid_or_guid';

console.log(cookie.get(KEY_OPENID));

let _openid;

// cookie.set(KEY_OPENID, 'openid-test');

export let getOpenid = () => {
  if (_openid == null) {
    _openid = cookie.get(KEY_OPENID);
  }
  return _openid;
};