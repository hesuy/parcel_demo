#!/usr/bin/env node

const config = require('./.build.json');

const shell = require('shelljs');
const path = require('path');
const replace = require('replace-in-file');

const PUBLIC_URL = config.path.publicURL;
const TMP_DIR = path.join(__dirname, config.path.tmp);
const OUT_DIR = path.join(__dirname, config.path.out);
const PARAM_OUT_DIR = '--out-dir ' + TMP_DIR;
const PARAM_PUBLIC_URL = '--public-url ' + PUBLIC_URL;
const PARAM_OTHER = '--detailed-report --no-source-maps';
const PARAM_LOG = '--log-level 3';

// 生成页面
let build = (pages) => {
  Object.keys(pages).map((val) => {
    console.log(`build ${val} starting...`);
    let page = pages[val];
    let command = `parcel build ${page} --out-file ${val}.html ${PARAM_PUBLIC_URL} ${PARAM_OUT_DIR} ${PARAM_OTHER} ${PARAM_LOG}`;
    if (shell.exec(command).code !== 0) {
      console.log(`Error: build${val} failed`);
      shell.exit(1);
    } else {
      console.log(`build ${val} complete...`);
    }
  });
};
// 移动静态文件
let staticMove = (type, conf) => {
  let dir = path.join(TMP_DIR, conf.dir);
  shell.mkdir(dir);
  conf.exts.forEach((ext) => {
    shell.ls(`${TMP_DIR}/*.${ext}`).forEach((file) => {
      shell.mv(file, `${dir}/`);
      console.log(`${type} ${ext} move: ${file}`);
    });
  });
};
// html内容路径替换
let replaceHtmlStaticUrl = (type, conf) => {
  let dir = conf.dir;
  let reConf = []; //new RegExp(file, 'g'),
  conf.exts.forEach((ext) => {
    reConf.push(new RegExp(`([^"'=]+\.${ext}["'\#\?]+?)`, 'ig'));
  });
  let changes = replace.sync({
    encoding: 'utf8',
    files: `${TMP_DIR}/*.html`,
    from: reConf,
    to: (...args) => {
      let source = args[0].toLowerCase();
      if (source.startsWith('http://') || source.startsWith('https://') || source.startsWith('//')) {
        return args[0];
      }
      let arr = source.split('/');
      arr.splice(arr.length - 1, 0, dir);
      return arr.join('/');
    }
  });
  console.log(`html replace ${type}`, changes);
};
// css 背景图URL替换
let replaceCssBGUrl = (type, conf) => {
  let dir = conf.dir;
  let reConf = []; //new RegExp(file, 'g'),
  conf.exts.forEach((ext) => {
    reConf.push(new RegExp(`([\("']{1})([^\("']+\.${ext}[\)"'\?\#]+?)`, 'ig'));
  });
  let changes = replace.sync({
    encoding: 'utf8',
    files: `${TMP_DIR}/*.css`,
    from: reConf,
    to: (...args) => {
      let source = args[0].toLowerCase();
      if (source.startsWith('http://') || source.startsWith('https://') || source.startsWith('//')) {
        return args[0];
      }
      return `${args[1]}../${dir}/${args[2]}`;
    }
  });
  console.log(`css bg replace ${type}`, changes);
};

// 清空临时文件夹
console.log('======== 清空临时文件夹 ========');
shell.rm('-rf', TMP_DIR);

// 编译
console.log('======== 编译页面 ========');
build(config.pages);

// 替换静态资源路径
console.log('======== 替换静态资源路径 ========');
Object.keys(config.static).map((val) => {
  replaceHtmlStaticUrl(val, config.static[val]);
  replaceCssBGUrl(val, config.static[val]);
});
console.log('======== 归类静态资源 ========');
// 归类静态资源
Object.keys(config.static).map((val) => {
  staticMove(val, config.static[val]);
});

// 清空目标文件夹
console.log('======== 清空目标文件夹 ========');
shell.rm('-rf', `${OUT_DIR}*`);

// 移动内容到发布文件夹
shell.cp('-Rf', `${TMP_DIR}/*`, OUT_DIR);
console.log('======== 打包完成 ========');
