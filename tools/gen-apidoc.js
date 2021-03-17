/**
 * 
 * 生成apidoc
 * ajax请求自动添加签名信息，签名的key在console设置key=xxxx
 * 
 */
const path = require('path');
const { createDoc } = require('apidoc');


// apidoc --private true -e app/public -i app/ -o app/public/apidoc

const option = {
    src: 'app',
    dest: 'app/public/apidoc',
    excludeFilters: ['app/public'],
    markdown: path.resolve(__dirname, 'tools/markitdown.js'),
    template: path.resolve(__dirname, '/..')
    // debug: true
  };
createDoc(option)
