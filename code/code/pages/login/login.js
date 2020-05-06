// pages/login/login.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    disabled:false,
    no:'',
    pwd:'',
    noinput:false,
    pwdinput:false,
  },
  noinput:function(e){
    this.setData({no:e.detail.value});
    this.setData({noinput:true});
    if(this.data.noinput==true && this.data.pwdinput==true){
      this.setData({ disabled: false });
    }
 
  },
  pwdinput: function (e) {
    this.setData({ pwd: e.detail.value });
    this.setData({ pwdinput: true });
    if (this.data.noinput == true && this.data.pwdinput == true) {
      this.setData({ disabled: false });
    }
  },
  formSubmit: function (e) {
    // wx.showLoading({
    //   title: '登录中...',
    // })
    //console.log(e);//事件日志显示
    var that = this;
    this.setData({ disabled: true});
    wx.request({
      url:"http://localhost/login.php", //本地php地址
      data: {
        no:e.detail.value.no,
        pwd:e.detail.value.pwd,
        info:'',
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded" // POST硬性要求
      },
      success: function (res) {
        // console.log(res);//事件日志显示
        console.log(that.data.no.charAt(0));
        if (res.statusCode == 200) {
          if(res.data==="登入成功") {
            wx.showToast({
             title: res.data,
             icon: 'success',
             duration: 2000
            });
            //教练和学员账号跳转到不同页面
            if(that.data.no.charAt(0)=='1'){
            wx.reLaunch({
              url: '../student/student',
            })//成功页面跳转
          }else{
            if(that.data.no.charAt(0)=='2'){
              wx.reLaunch({
                url: '../trainer/trainer',
              })//成功页面跳转
          }}
          } else {
            wx.showToast({
              title: res.data,
             icon: 'none',
             duration: 2000
            })
            
            setTimeout(function(){
              wx.switchTab({
                url: '../index/index',
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
    if (typeof (student) == 'object' && student.no != '' && student.classid != '') {
      wx.switchTab({
        url: '../student/student',
      })
    }
  },
  goto_sign:function(){
    wx.navigateTo({
      url: '../sign/sign',
    })
  },
  goto_passwd_back:function(){
    wx.navigateTo({
      url: '../passwd_back/passwd_back',
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
    if(this.data.no=='' || this.data.pwd==''){
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