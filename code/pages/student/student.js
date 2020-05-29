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