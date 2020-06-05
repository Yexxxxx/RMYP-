//wx.cloud.init() 
var app = getApp();
Page({  
  /**   * 页面的初始数据   */  
  data: {     
    canIUse:true,
    name:"",
    src:"",
    src_1:"../../images/coach/app图标.jpg",
    gender:"",
    // isHide:false,
    _openid:null,
    status:1,
  },  
onLoad:function(options) {
    //查看是否授权
    
  },
  onShow:function(){
    var that = this;
    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          console.log("用户授权了");
        } else {
          //用户没有授权
          console.log("用户没有授权");
        }
      }
    });
    
  },
  getOpenid() {
    let that = this;
    wx.cloud.callFunction({
     name:'getOpenid',
     success: res => {
      var openid = res.result.openid;
      app.globalData._openid=openid;//全局变量
      app.globalData.login_flag = true
      console.log(app.globalData.login_flag)
      that.setData({
       _openid:openid
      })
      that.status();
     },
     
    })
  },
  status:function(){
    var that = this
    const db = wx.cloud.database()  
    db.collection('user').where({_openid:that.data._openid}).get({
      success:res=>{
        console.log(res.data.length)
        if(res.data.length>0){
          that.setData({status:1})
          console.log(that.data.status)
        }else{
          that.setData({status:0})
          console.log(that.data.status)
        }
      }
    })
  },
  bindGetUserInfo: function(res) {
    if (res.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      that.getOpenid();
      // 获取到用户的信息了，打印到控制台上看下
      console.log("用户的信息如下：");
      console.log(res.detail.userInfo);
      let info = res.detail.userInfo.nickName;
      that.setData({
        name:info,
        src:res.detail.userInfo.avatarUrl,
        gender:res.detail.userInfo.gender,
      });
      const db = wx.cloud.database()  
      console.log(that.data.status)
      if (that.data.status==1){
          db.collection('user').where({
              "_openid":that.data.openid
          }).update({
          data: {
              name:info,
              src:res.detail.userInfo.avatarUrl,
              gender:res.detail.userInfo.gender,
          },
          success: res => {
              console.log("更新成功");
              that.goto_student()
          }
      })
  }else{
    db.collection('user').add({
        data: {
          name:info,
          src:res.detail.userInfo.avatarUrl,
          gender:res.detail.userInfo.gender,
        },
        success: res => {
          console.log("插入成功");
          that.goto_student()
        }
      })
      }} 
      else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function(res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }
 },
 goto_student:function(){
  wx.switchTab({
    url: '../index2/index2',
  })
},
})
