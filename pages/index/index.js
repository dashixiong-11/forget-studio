//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    date:'',
    active:true,
    telphone:'',
    myphone:app.globalData.myphone,
    bindphone:true,
    min:false,
    time:'',
    date:'',
    code:'',
    mycode:''
  },
  onLoad: function () {
    console.log(this.data.myphone)
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    wx.login({
      success:function(res){
        
      }
    })
     let year = new Date().getFullYear()
    let month = new Date().getMonth()+1
    let day = new Date().getDate()
    this.setData({
      date:`${year}.${month}.${day}`
    })
  },
  getUserInfo: function(e) {
    app.globalData.nickName = e.detail.userInfo.nickName
    console.log(app.globalData.openID)
    let query = new app.globalData.AV.Query('All');
    query.contains('openid', app.globalData.openID);
    query.find().then(function (res) {
        console.log('1')
      console.log(res)
      if(!res.length){
        let TestObject = app.globalData.AV.Object.extend('All');
        let testObject = new TestObject();
        testObject.set('openid', app.globalData.openID);
        testObject.save().then(function (res) {
        }, function (error) {
          // 失败
        })
      }
    }, function (error) {
    });
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  baoming(){
    this.setData({
      active:false
    })
  },
  close(){
    this.setData({
      active:true
    })
  },
  closebind(){
    this.setData({
      myphone: '123'
    })
  },
  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  getphone(e){
    this.setData({
      telphone:e.detail.value
    })
  },
  getcode(e){
    this.setData({
      mycode:e.detail.value
    })
  },
  bangding(){

    console.log(this.data.code,this.data.telphone,this.data.mycode)
    if(this.data.code == this.data.mycode){
      this.setData({
        myphone: this.data.telphone
      })
      app.globalData.myphone = this.data.telphone
let query = new app.globalData.AV.Query('All');
    query.contains('phone', this.data.telphone);
    query.find().then((res)=>{
        console.log(res)
      let TestObject = app.globalData.AV.Object.extend('All');
      let testObject = new TestObject();
      testObject.set('openid', app.globalData.openID);
      testObject.save().then(function (res) {
      }, function (error) {
        // 失败
      })

    })
    }
  },
  postcode(){
    let str = /^1\d{10}$/
    if (str.test(this.data.telphone)) {
      wx.request({
        url: 'https://zjw.llilu.com/News.php?',
        data: {
          tel: this.data.telphone
        },
        method: 'GET',
        header: {
          'content-type': 'application/json'
        },
        success:  (res)=> {
          console.log(res)
          this.data.code = res.data.code
          wx.showToast({
            title: '验证码已发送',
            icon:'none'
          })
        }
      })
    } else {
      wx.showToast({
        title: '手机号不正确',
      })
      return false
    }
  },
})
