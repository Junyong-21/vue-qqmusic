const CompressionPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;

/** 开发环境 */
const DEV = process.env.NODE_ENV !== 'production';


module.exports = {
 /* vue.config.js支持webpack-chain写法 */
 chainWebpack: config =>{
  /* *******************************************
   *  
   * 开启GZIP压缩
   * 压缩前：4.4MB
   * 压缩后：1.7MB
   * @Author: mingyong.g
   * @Date: 2020-09-02 19:55:13
   * 
   ********************************************/
   if(!DEV){
    config.plugin('compressionPlugin')
    .use( new CompressionPlugin({
     filename: "[path].gz[query]",
    algorithm:"gzip",
     test:productionGzipExtensions,  //所有匹配此{RegExp}的资产都会被处理
     threshold:512,   // 只处理大于此大小的资产。以字节为单位
     minRatio:0.8,    //只有压缩好这个比率的资产才能被处理
    deleteOriginalAssets:false //是否删除原资源
    }))
   }
}