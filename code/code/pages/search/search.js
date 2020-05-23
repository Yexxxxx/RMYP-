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
    const db = wx.cloud.database()  
    db.collection('data').where({"_openid":"oKGUL4_f55SAlzzcw1VWUVbyosgU"}).get({
      success:function(res){
       for(let i=0;i<res.data.length;i++){
        console.log(res.data[i].time.substring(5, 10))
       }
        
      }
    })
  },

  
})
