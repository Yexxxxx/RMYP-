wx.cloud.init() 
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    height:"",
    time:"",
    weight:""
  },
  onLoad:function() {
    var that = this
    //var test = res.data.time
    const db = wx.cloud.database()  
    db.collection('data').where({"_openid":"oKGUL4_f55SAlzzcw1VWUVbyosgU"}).get({
      success:function(res){
       for(let i=0;i<res.data.length;i++){
        console.log(res.data[i].time.substring(5, 10))
       }
        
      }
    })
  },

 // res.data[2].time.substring(5, 10)
      //.substring(0, 10)
   
 
  
   
  //   var that = this;
  //   var formData = e.detail.value.id; //获取表单所有name=id的值  
  //   wx.request({
  //     url: 'http://localhost/2018-5-24/search.php?id=' + formData,
  //     data: formData,
  //     header: { 'Content-Type': 'application/json' },
  //     success: function (res) {
  //       console.log(res.data)
  //       that.setData({
  //         re: res.data,
  //       })
  //       wx.showToast({
  //         title: '已提交',
  //         icon: 'success',
  //         duration: 2000
  //       })
  //     }
  //   })
  
})
