// pages/passwd_back/passwd_back.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled:false,
    num:'',
    numinput:false,
  },
  numinput:function(e){
    this.setData({num:e.detail.value});
    this.setData({numinput:true});
    if(this.data.numinput==true){
      this.setData({ disabled: false });
    }
 
  },
  goto_alter_passwd:function(){
    wx.navigateTo({
      url: '../passwd_alter/passwd_alter',
    })
  },
  formSubmit: function (e) {
    console.log(e);
    this.setData({ disabled: true});
    wx.request({
      url:"http://localhost/login.php", //示例，非真实接口地址
      data: {
        num: e.detail.value.no,
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded" // POST硬性要求
      },
      success: function (res) {
        console.log(res);
        if (res.statusCode == 200) {
          if (res.data.error == true) {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 2000
            })
          } else {
            wx.setStorageSync('student', res.data.data);
            wx.showToast({
              title: res.data.msg,
              icon: 'success',
              duration: 2000
            })
           
            setTimeout(function(){
              wx.switchTab({
                url: '../student/student',
              })
            },2000)
            goto_alter_passwd()
          }
        }else{
          wx.showToast({
            title: '服务器出现错误',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({disabled:false});
    var student = wx.getStorageSync('student');
    if (typeof (student) == 'object' && student.num != '' && student.classid != '') {
      wx.switchTab({
        url: '../student/student',
      })
    }
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
    if(this.data.num==''){
      this.setData({ disabled: true });
    }else{
      this.setData({ disabled: false });
    }
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