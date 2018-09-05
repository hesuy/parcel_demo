import './layer_mobile/layer.css';
import layer from './layer_mobile/layer';

export var open = layer.open;

/**
 * 加载提示
 * @return {*}
 */
export let loading = (msg) => {
  let options = {type: 2, shadeClose: false};
  if (msg) {
    options.content = msg;
  }
  return layer.open(options);
};

/**
 * 关闭
 * @param index
 */
export let close = (index) => {
  layer.close(index);
};

/**
 * 关闭所有
 */
export let closeAll = () => {
  layer.closeAll();
};

/**
 * alert
 * @param msg
 * @param btn
 * @param options
 */
export let alert = (msg, btn, options) => {
  options = options ? options : {};
  options.content = msg;
  options.btn = btn ? btn : '我知道了';
  layer.open(options);
};

/**
 * msg
 * @param msg
 * @param skin
 * @param time
 * @param options
 */
export let msg = (msg, skin, time, options) => {
  options = options ? options : {};
  options.content = msg;
  options.skin = skin ? skin : 'msg';
  options.time = time ? time : 2;
  layer.open(options);
};

/**
 * 询问框
 * @param msg
 * @param btn
 * @param options
 */
export let confirm = (msg, btn, options) => {
  options = options ? options : {};
  options.content = msg;
  options.btn = btn ? btn : ['确定', '取消'];
  layer.open(options);
};