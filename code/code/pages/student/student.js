// pages/student/student.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  goto_check:function(){
    wx.navigateTo({
      url: '../sutdent_select_trainer/sutdent_select_trainer',
    })
  },
  goto_alter:function(){
    wx.navigateTo({
      url: '../student_alter/student_alter',
    })
  },
  goto_logout:function(){
    wx.navigateTo({
      url: '../unsign/unsign',
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