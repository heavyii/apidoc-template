## apidoc template

```
apidoc --private true -e app/public -i app/ -o app/public/apidoc -t node_modules/@heavy/apidoc-template --markdown node_modules/@heavy/apidoc-template/tools/markitdown.js
```


or in js:

```
/**
 * 
 * 生成apidoc
 * ajax请求自动添加签名信息，签名的key在console设置key=xxxx
 * 
 */
const path = require('path');
const { createDoc } = require('apidoc');


const option = {
    src: 'app',
    dest: 'app/public/apidoc',
    excludeFilters: ['app/public'],
    markdown: 'node_modules/@heavy/apidoc-template/tools/markitdown.js',
    template: 'node_modules/@heavy/apidoc-template'
    // debug: true
  };
const doc = createDoc(option)

```