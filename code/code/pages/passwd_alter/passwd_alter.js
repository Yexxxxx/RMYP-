// pages/passwd_alter/passwd_alter.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled:false,
    pwd_new:"",
    pwd_second:"",
    pwd_input:false,
    pwd_sc_input:false,
    num:wx.getStorageSync('num')
  },
  pwdinput:function(e){
    this.setData({pwd_new:e.detail.value});
    this.setData({pwdinput:true});
    if(this.data.pwdinput==true && this.data.pwd_sc_input==true){
      this.setData({ disabled: false });
    }
  },
  pwd_sc_input: function (e) {
    this.setData({pwd_second:e.detail.value});
    this.setData({pwd_sc_input:true});
    if(this.data.pwdinput==true && this.data.pwd_sc_input==true){
      this.setData({ disabled: false });
  }
  },
  formSubmit: function (e) {
    wx:if(this.data.pwd_new != this.data.pwd_second){
      wx.showToast({
        title: '两次密码不一致',
        icon: 'none',
        duration: 1500
      })
    }
    else{
    this.setData({ disabled: true});
    wx.request({
      url: "http://localhost/passwd_alter.php", //示例，非真实接口地址
      data: {
        num:wx.getStorageSync('num'),
        pwd_new: e.detail.value.pwd_new,
      },
      method: 'POST',
      header: {
        "content-type": "application/x-www-form-urlencoded" // POST硬性要求
      },
      success: function (res) {
        //console.log(res.data);
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
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      disabled:false,
    });
    var student = wx.getStorageSync('student');
    if (typeof (student) == 'object' && student.no != '' && student.classid != '') {
      wx.switchTab({
        url: '../student/student',
      })
    }
  },
  goto_login:function(){
    wx.navigateTo({
      url: '../login/login',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      disabled:false,
      num:options.passwd_num
    });
    var student = wx.getStorageSync('student');
    if (typeof (student) == 'object' && student.no != '' && student.classid != '') {
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
    if(this.data.pwd_new=='' || this.data.pwd_second==''){
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