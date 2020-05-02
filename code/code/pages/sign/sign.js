// pages/sign/sign.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  
  switchChange: function (e) {
    if (e.detail.value) {
      this.setData({ sex: '男' })
    } else {
      this.setData({ sex: '女' })
    }
  },
  onLoad: function (options) {
 
  },
  //表单
  formSubmit: function (e) {
    wx.request({
      url: '域名信息',
      data: e.detail.value,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: (res) => {
        console.log(res);
        if (res.error) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
        } else {
          wx.showToast({
            title: '添加成功',
            icon: 'success',
            duration: 2000
          })
          wx.navigateTo({
            url: "../add/add"
          })
        }
      }
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
