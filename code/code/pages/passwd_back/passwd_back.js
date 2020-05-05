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
    var that = this;
    //console.log(e);
    this.setData({ disabled: true});
    wx.request({
      url:"http://localhost/passwd_back.php", //示例，非真实接口地址
      data: {
        num: e.detail.value.num,
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded" // POST硬性要求
      },
      success: function (res) {
        //console.log(res.data);
        if (res.statusCode == 200) {
          if (res.data == that.data.num) {
            wx.showToast({
              title: "验证成功",
              icon: 'success',
              duration: 2000
             })
            wx.setStorage({
              key: "num",
              data: res.data
             })
             wx.redirectTo({
              url: '../passwd_alter/passwd_alter',
            })//成功页面跳转
          } else {
            wx.showToast({
              title: res.data,
              icon: 'none',
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