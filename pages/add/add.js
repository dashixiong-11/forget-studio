// pages/add/add.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sm:app.globalData.sm,
    gh:app.globalData.gh,
    sf:app.globalData.sf,
    cq:app.globalData.cq,
    sc:app.globalData.sc,
    yh:app.globalData.yh,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  formSubmit(e){
    let evalue = e.detail.value
    app.globalData.truename = evalue.truename
    app.globalData.myphone = evalue.phone
    app.globalData.sm = evalue.sm
    app.globalData.gh = evalue.gh
    app.globalData.sf = evalue.sf
    app.globalData.cq = evalue.cq
    app.globalData.sc = evalue.sc
    app.globalData.yh = evalue.yh
    // 声明类型
    var TodoFolder = app.globalData.AV.Object.extend('All');
    // 新建对象
    var todoFolder = new TodoFolder();
    // 设置名称
    todoFolder.set('sm',evalue.sm);
    todoFolder.set('gh',evalue.gh);
    todoFolder.set('sf',evalue.sf);
    todoFolder.set('cq',evalue.cq);
    todoFolder.set('sc',evalue.sc);
    todoFolder.set('yh',evalue.yh);
    todoFolder.set('phone',evalue.phone);
    todoFolder.set('name',evalue.truename);
    // 设置优先级
    todoFolder.save().then(function (todo) {
      console.log('objectId is ' + todo.id);
    }, function (error) {
      console.error(error);
    });
    console.log(e.detail.value)
    wx.navigateBack({
      delta:1
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})