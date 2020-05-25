// pages/student/student.js
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
  //体测档案
  goto_bodydata_select:function(){
    wx.navigateTo({
      url: "../bodydata_select/bodydata_select",
    })
  },   
  //查看教练
  goto_check:function(){
    wx.navigateTo({
      url: '../sutdent_select_trainer/sutdent_select_trainer',
    })
  },
  //注销
  goto_logout:function(){
    wx.navigateTo({
      url: '../unsign/unsign',
    })
  },
  //密码修改
  goto_passwd_alter:function(){
    wx.navigateTo({
      url: '../passwd_alter/passwd_alter',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const db = wx.cloud.database() 
    db.collection('data').where({
      "_openid":"oKGUL4_f55SAlzzcw1VWUVbyosgU"
      }).get({
        success:res=>{
          this.setData({
            age:res.data[0].age,
            height:res.data[0].height,
            weight:res.data[0].weight,
          })
          
        }
      }) ,
      db.collection('user').where({
        "_openid":"oKGUL4_f55SAlzzcw1VWUVbyosgU"
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