// pages/student/student.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    age:"",
    phone:"",
    gender:'',
    height:'',
    weight:'',
    step:"请开通微信步数",
  },

  //注销
  goto_logout:function(){
    wx.navigateTo({
      url: '../unsign/unsign',
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this
    that.gotweRun()
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
            if(res.data[0].gender==1){
             this.setData({
               gender:"男",
             })
            }
             if(res.data[0].gender==2){
              this.setData({
                gender:"女",
              })
             }
             if(res.data[0].gender==0){
              this.setData({
                gender:"未知",
              })
             }
          }
        })     
     
  },
  goto_info:function(){
    wx.navigateTo({
      url: '../index1/index1',
    })
  },
  gotweRun:function(){
    var that = this
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