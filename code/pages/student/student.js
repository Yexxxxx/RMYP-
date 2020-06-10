// pages/student/student.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    age:"",
    name:"",
    src:"",
    phone:"",
    gender:'',
    height:'',
    weight:'',
    step:"请开通微信步数",
    isHide_2:true,
    login_flag:false,
  },

  //注销
  goto_into:function(){
    var that = this
    wx.navigateTo({
      url: '../index/index',
    })
  },
  
  get_login_flag:function(){
    var that = this
    var login = app.globalData.login_flag
    console.log(login)
    if (login == true ){
      that.setData({
        login_flag:login,
        isHide_2:false
      })
  }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    var that = this
    const db = wx.cloud.database() 
    that.get_login_flag()
    if(that.data.login_flag){
    db.collection('data').where({
      "_openid":app.globalData._openid
      }).get({
        success:res=>{
          let x = res.data.length-1
          this.setData({
            age:res.data[x].age,
            height:res.data[x].height,
            weight:res.data[x].weight,
          })
        }
      }) ,
      db.collection('user').where({
        "_openid":app.globalData._openid
        }).get({
          success:res=>{
            console.log(res.data[0])
            console.log(res.data[0].name)
            if(res.data[0].gender==1){
             that.setData({
              gender:"男",
             })
            }
             if(res.data[0].gender==2){
              that.setData({
                gender:"女",
              })
             }
             if(res.data[0].gender==0){
              that.setData({
                gender:"未知",
              })
             }
          }
        })
      }     
  },
  goto_info:function(){
    wx.navigateTo({
      url: '../index1/index1',
    })
  },
  getweRun_permit:function(){
    wx.getSetting({
      success: function(res) {
        if (!res.authSetting['scope.werun']) {
          that.setData({
            step:"请在设置中授权微信步数"
          })
        } else {
          console.log("微信步数授权");
        }
      }
    })
  },
  gotweRun:function(){
    var that = this
    wx.getSetting({
      success: function(res) {
        if (!res.authSetting['scope.werun']) {
          that.setData({
            step:"请在设置中授权微信步数"
          })
        } else {
          console.log("微信步数授权");
          wx.getWeRunData({
        success:res=> {
        //console.log("cloudID:"+res.cloudID)    
        wx.cloud.callFunction({
          name: 'weRun',
          data: {
            weRunData: wx.cloud.CloudID(res.cloudID)
          },
        }).then(resData=>{    
          that.setData({
            step:resData.result.event.weRunData.data.stepInfoList[30].step
          })
          console.log(resData) //注意这里
           console.log(resData.result.event.weRunData.data.stepInfoList[30])//今天的步数
          })
       },
       fail:function(){
  
       }
    })
  }
  }
})
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