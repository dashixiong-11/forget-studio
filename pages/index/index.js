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
    time:'',
    date:''
  },
  onLoad: function () {
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
    console.log(e)
    app.globalData.nickName = e.detail.userInfo.nickName
    console.log(app.globalData.openID)
    var query = new app.globalData.AV.Query('All');
    query.contains('openid', app.globalData.openID);
    query.find().then(function (res) {
      if(!res.length){
        var TestObject = app.globalData.AV.Object.extend('All');
        var testObject = new TestObject();
        testObject.set('openid', app.globalData.openID);
        testObject.set('name',app.globalData.nickName);
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
})
