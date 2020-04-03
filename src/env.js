let baseURL;
switch (process.env.NODE_ENV) { // 根据环境不同输出不同的URL地址.
  case 'development':
    baseURL = 'http://dev-mall-pre.springboot.cn/api';
    break;
  case 'test':
    baseURL = 'http://test-mall-pre.springboot.cn/api';
    break;
  case 'prev':
    baseURL = 'http://prev-mall-pre.springboot.cn/api';
    break;
  case 'prod':
    baseURL = 'http://mall-pre.springboot.cn/api';
    break;
  default:
    baseURL = 'http://mall-pre.springboot.cn/api';
    break;
}
// vue cli3 可以利用执行npm script时传递 mode 参数，webpack会根据参数加载相应的 .env 文件，相关的环境变量可以写在里边。
// "test2": "vue-cli-service serve --mode=test2"   加载 .env.test2文件，执行里边的环境配置
// 只有以 VUE_APP_ 开头的变量会被 webpack.DefinePlugin 静态嵌入到客户端侧的包中。
// 可以在应用的代码中这样访问它们  console.log(process.env.VUE_APP_BASE_UUU)
console.log( process.env)

export default {
  baseURL
}