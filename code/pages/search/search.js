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
    time:[],
    bmi:[],
    bfr:[],
    weight:[]
  },
  onLoad:function() {
    let that = this
    this.get_list()
    console.log(that.data.bmi)
  },
  get_list:function() {
    var that = this
    var time = []
    var bmi = []
    var bfr =[]
    var weight=[]
    const db = wx.cloud.database()
    db.collection('data').where({"_openid":"oKGUL4_f55SAlzzcw1VWUVbyosgU"}).get({
    success:function(res){
      for(let i = 0 ; i < res.data.length ; ++i){ 
        time.push(res.data[i].time)
        bmi.push(res.data[i].bmi)
        bfr.push(res.data[i].bfr)
        weight.push(res.data[i].weight)
    }
    that.setData({
      time:time,
      bmi:bmi,
      bfr:bfr,
      weight:weight
    })
  } 
  })
},
})
