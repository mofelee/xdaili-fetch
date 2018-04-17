# xdaili-fetch

## Install
```bash
yarn add xdaili-fetch
```

## Example
```javascript
const Xfetch = require('xdaili-fetch');
const fetch = Xfetch(require('node-fetch'), {
  orderno: '??',
  secret: '??'
});

fetch('https://www.baidu.com')
  .then(d=>d.text())
  .then(console.log)
  .catch(console.error)
```
