// pages/trainer/trainer.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  //体测档案
  goto_bodydata_select:function(){
    wx.navigateTo({
      url: "../bodydata_select/bodydata_select",
    })
  },
  //注销
  goto_logout:function(){
    wx.navigateTo({
      url: '../unsign/unsign',
    })
  },
  //查看学员
  goto_lookstudent:function(){
    wx.navigateTo({
      url: '../trainer_lookstudent/trainer_lookstudent',
    })
  },
  //密码修改
  goto_passwd_alter:function(){
    wx.navigateTo({
      url: '../passwd_alter/passwd_alter',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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