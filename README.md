# mall

### login
调用接口：`/user/login`     `使用 post 方式`
通过proxy代理: `target: 'http://mall-pre.springboot.cn'`

### 支付
```js
  paySubmit(payType) {
    if (payType === 1) { // 支付宝
      window.open('/#/order/alipay?orderId=' + this.orderId, '_blank'); // 新开页面    规避浏览器禁止异步开启新窗口 @@@
    } else if(payType === 2) { // 微信
      this.axios.post('/pay', {
        orderId: this.orderId,
        orderName: 'Vue高仿小米商城',
        amount: 0.01, // 元
        payType
      }).then((res) => {
        QRCode.toDataURL(res.content)
          .then(url => {
            this.showPay = true;
            this.payImg = url;
            this.loopOrderState(); // 微信弹窗二维码，需要轮询
          })
          .catch(() => {
            this.$message.error('微信二维码生成失败，请稍后重试');
          })
      })
    }
  },

  // 轮询当前订单支付状态
  loopOrderState() {
    this.T = setInterval(() => {
      this.axios.get(`/orders/${this.orderId}`).then((res) => {
        if (res.status == 20) {
          clearInterval(this.T);
          this.goOrderList();
        }
      })
    }, 1000);
  }
```

#### /#/order/alipay 页面
```js
  mounted() {
    this.paySubmit();
  },
  methods: {
    paySubmit() {
      this.axios.post('/pay', {
        orderId: this.orderId,
        orderName: 'Vue高仿小米商城',
        amount: 0.01,//元
        payType: 1 //1支付宝，2微信
      }).then((res) => {
        this.content = res.content;
        setTimeout(() => {
          // document.forms[0].submit();
        }, 100)
      })
    }
  }
```