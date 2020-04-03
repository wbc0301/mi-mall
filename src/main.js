import Vue from 'vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLazyLoad from 'vue-lazyload'
import VueCookie from 'vue-cookie'
import { Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import App from './App.vue'
import env from './env'
// mock开关
const mock = false;
if(mock){   // require 是动态加载  同步加载, false时不会加载,  import是静态 异步加载 不能写在 if 语句中.
  console.log(1) // 同步加载 打印顺序：1  2  3 
  require('./mock/api');  // mock.js根本就没有发网络请求,是在代码层面进行的拦截.
  console.log(3)
}
// 根据前端的跨域方式做调整 /a/b : /api/a/b => /a/b
// axios.defaults.baseURL = 'https://www.easy-mock.com/mock/5dc7afee2b69d9223b633cbb/mimall';
// axios.defaults.baseURL = env.baseURL; // 根据环境变量获取不同的请求地址
axios.defaults.baseURL = '/api';
axios.defaults.timeout = 8000; 
// 根据环境变量获取不同的请求地址
// axios.defaults.baseURL = env.baseURL;
// 接口错误拦截   后台管理系统因为有大量的表单提交所以需要 intercepters.requrest.use(fn);
axios.interceptors.response.use(function(response){
  let res = response.data;
  if(res.status == 0){ // 成功拦截
    return res.data;
  }else if(res.status == 10){ // 未登录拦截
    window.location.href = '/#/login';
    return Promise.reject(res);
  }else{ 
    Message.warning(res.msg); // 其他错误弹框
    return Promise.reject(res);
  }
},(error)=>{
  let res = error.response;
  Message.error(res.data.message);
  return Promise.reject(error);
});

Vue.use(VueAxios,axios);
Vue.use(VueCookie);
Vue.use(VueLazyLoad,{
  loading:'/imgs/loading-svg/loading-bars.svg'
})
Vue.prototype.$message = Message;
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')


// 测试 tag
// 添加tag后