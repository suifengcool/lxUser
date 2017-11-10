var path = require('path')
var fs = require('fs')
var argv = require('optimist').argv;
var express = require('express')
var webpack = require('webpack')
var config = require('../config')
var opn = require('opn')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = process.env.NODE_ENV === 'testing'
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
})

var hotMiddleware = require('webpack-hot-middleware')(compiler)
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
// Object.keys(proxyTable).forEach(function (context) {
//   var options = proxyTable[context]
//   if (typeof options === 'string') {
//     options = { target: options }
//   }
//   app.use(proxyMiddleware(context, options))
// });

// mock/proxy api requests
var mockDir = path.resolve(__dirname, '../mock');
(function setMock(mockDir) {
  fs.readdirSync(mockDir).forEach(function (file) {
    var filePath = path.resolve(mockDir, file);
    var mock;
    if (fs.statSync(filePath).isDirectory()) {
      setMock(filePath);
    }
    else {
      mock = require(filePath);
      app.use(mock.api, argv.proxy ? proxyMiddleware({target: 'http://' + argv.proxy}) : mock.response);
    }
  });
})(mockDir);;

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')({
  index: '/index2.html'
}))

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static2'))

// 原本是locahost：XXXX，这样并不利于开发(移动端手机扫码测试)

// module.exports = app.listen(port, function (err) {
//   if (err) {
//     console.log(err)
//     return
//   }
//   var uri = 'http://localhost:' + port
//   console.log('Dev server listening at ' + uri + '\n')
//   // opn(uri)
// })

// 获取本机 ip 地址，用于 broswer 打开 server 后，真机扫码测试
var os = require('os')
var IPv4
os.networkInterfaces().en0.forEach(function(item, index){
  if (item.family == 'IPv4') IPv4 = item.address
})
// 获取 port
var port = process.env.PORT || config.dev.port
// 拼接 URI
var uri = 'http://' + IPv4 + ':' + port

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Server listening at ' + uri + '\n')

  // when env is testing, don't need open it
  if (process.env.NODE_ENV !== 'testing') opn(uri)
})
