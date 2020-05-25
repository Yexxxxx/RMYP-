wx.cloud.init() 
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    height:"",
    time:"",
    weight:"",
    list:[{time:"",BMI:""}]
  },
  onLoad:function() {
    var that = this
    var timestamp = Date.parse(new Date());
  var date = new Date(timestamp);
//获取年份  
  var Y =date.getFullYear();
//获取月份  
var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
//获取当日日期 
var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(); 
console.log("当前时间：" + Y + '年'  + M+ '月' + D+ '日' ); 

    const db = wx.cloud.database()
    db.collection('data').where({"_openid":"oKGUL45j6BATXCzol6NWegrIiAkk"}).get({
    success:function(res){
     for(let i=0;i<res.data.length;i++){
      var dsf=res.data[i].time //25 20
      var bm=res.data[i].bmi
      var newlist = [{time:dsf,BMI:bm}]
      console.log(newlist)
      newlist.concat(this.data.list)
   } 
  }
})
},
})