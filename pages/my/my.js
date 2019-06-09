//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    active:'true',
    min:'false',
    telphone:'',
    code:''
  },
  //事件处理函数
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
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
  },
  bindViewTap(){
      this.setData({
        active:false
      })
  },
  close(){
    this.setData({
      active:true
    })
  },
  getphone(e){
      this.setData({
        telphone:e.detail.value
      })
  },
  bangding(){
    console.log(this.data.telphone)
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
  manage(){
    wx.navigateTo({
      url: '../logs/logs'
    })
  }
})
