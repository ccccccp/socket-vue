//  module.exports = {
//     configureWebpack: config => {
//         // 为生产环境修改配置...
//         config.entry = {
//             app: [ './src/main.js' ],
//             // vendor: [
//             //     "vue",
//             //     "vue-router",
//             //     "vuex"
//             // ]
//         };
//         config.optimization = {
//             // webpack4.* chunks分离
//             splitChunks: {
//                 // chunks: "all", // 所有的 chunks 代码公共的部分分离出来成为一个单独的文件
//                 cacheGroups: {
//                     vendor: {
//                         chunks: "initial",
//                         test: "vendor",
//                         name: "vendor", // 使用 vendor 入口作为公共部分
//                         enforce: true,
//                     },
//                 }
//             }
//         }
//     }
// }
module.exports = {
    css: {
      loaderOptions: { // 向 CSS 相关的 loader 传递选项
        less: {
          javascriptEnabled: true
        }
      }
    }
  }