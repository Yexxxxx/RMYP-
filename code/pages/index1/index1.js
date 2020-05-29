Page({

  data: {
    step:null,
  },
  onLoad:function(){
    wx.login({
      complete: (res) => {},
    })
  },
  onShow:function(){
    var that = this
    that.gotweRun()
  },
  //获取微信步数
  gotweRun:function(){
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
  })
  },
})