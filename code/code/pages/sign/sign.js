// pages/sign/sign.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      no:'',
      name:'',
      sex:'',
      age:'',
      noinput:false,
      nameinput:false,

  },
  noinput:function(e){
    this.setData({no:e.detail.value});
    this.setData({noinput:true});
    if(this.data.noinput==true){
      this.setData({ disabled: false });
    }
 
  },
  nameinput:function(e){
    this.setData({name:e.detail.value});
    this.setData({nameinput:true});
    if(this.data.nameinput==true){
      this.setData({ disabled: false });
    }
 
  },
  
  switchChange: function (e) {
    if (e.detail.value) {
      this.setData({ sex: '男' })
    } else {
      this.setData({ sex: '女' })
    }
  },
  // onLoad: function (options) {
 
  // },
  //表单
  formSubmit: function (e) {
    var that = this;
    //console.log(e);
    this.setData({ disabled: true});
    wx.request({
      url: 'http://localhost/GitHub/RMYP-/code/code/pages/sign/sign_up.php',
      no: e.detail.value.no,
      name: e.detail.value.name,
      sex: e.detail.value.sex,
      age: e.detail.value.age,
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded" // POST硬性要求
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

  },
  create_sign: function (e) {
    console.log(e.detail.value)
    wx.request({
      url: "http://localhost:8080/..." + e.detail.value["username"] + "&password1=" + e.detail.value["password1"] + "&password2=" + e.detail.value["password2"],
      data: e.detail.value,
      success: this.getResult.bind(this)
    })

  },
  getResult: function (res) {
    console.log(res.data);
    if (res.data == "true") {
      wx.showToast({
        title: "注册成功",
        duration: 2000
      })
      wx.switchTab({
        url: '../login/login',
      })
      setTimeout(function () {
        wx.navigateBack({
          delta: 2
        })
      }, 2000)
    }

    if (res.data == "-1") {
      wx.showToast({
        title: "用户名已存在",
        icon: 'none',
        duration: 2000
      })
      setTimeout(function () {
        wx.navigateBack({
          delta: 2
        })
      }, 2000)
    }

    if (res.data == "1") {
      wx.showToast({
        title: "注册信息不为空",
        icon: 'none',
        duration: 2000
      })
      setTimeout(function () {
        wx.navigateBack({
          delta: 2
        })
      }, 2000)
    }

    if ((res.data == "false") || (res.data == "0")) {
      wx.showToast({
        title: "前后密码不一致",
        icon: 'none',
        duration: 3000
      })
      setTimeout(function () {
        wx.navigateBack({
          delta: 2
        })
      }, 2000)
    }
  },
})
