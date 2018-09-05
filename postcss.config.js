// var path = require('path');

module.exports = {
  plugins: {
    'autoprefixer': {
      'remove': false,
      'browsers': [
        'last 1 version',
        '> 1%',
        'Android >= 3.0',
        'iOS 7'
      ]
    },
    'postcss-px2rem': {remUnit: 100},
    'cssnano': {
      preset: 'default'
    }
  }
};