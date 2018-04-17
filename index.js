const crypto = require('crypto');
const HttpProxyAgent = require('./http-proxy-agent');

const Xfetch = (f, opts) => (...args) => {
  let {
    orderno,
    secret
  } = opts || {};

  orderno = orderno || process.env.XDAILI_ORDERNO;
  secret = secret || process.env.XDAILI_SECRET;
  if(!orderno || !secret){
    throw new Error('must supply orderno and secret')
  }

  const timestamp = parseInt(new Date().getTime()/1000);

  let plantext = 'orderno='+orderno+',secret='+secret+',timestamp='+timestamp;
  const sign = crypto.createHash('md5')
    .update(plantext)
    .digest('hex')
    .toUpperCase();


  args[1] = args[1] || {}
  args[1].headers = {
    ...args[1].headers,
    'Proxy-Authorization': 'sign='+sign+'&orderno='+orderno+"&timestamp="+timestamp
  }

  args[1] = {
    ...args[1],
    agent: new HttpProxyAgent('http://forward.xdaili.cn:80')
  }

  return f(...args)
}

module.exports = Xfetch;
