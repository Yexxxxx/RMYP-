

//index.js
//获取应用实例
var app = getApp();
Page({
  STANDARD: 22,
  rules: [
    [18.5, 24, 28],
    [18.5, 25, 30, 35, 40],
    [18.5, 23, 25, 30]
  ],
  ruleConfig: ['偏瘦', '正常', '偏胖', '肥胖', '重度肥胖', '极重度肥胖'],
  dangerConfig: ['低（但其它疾病危险性增加）', '平均水平', '增加', '中度增加', '严重增加', '非常严重增加'],
  data: {
    array: ['中国标准', '国际标准', '亚洲标准'],
    index: 0,
    score: 0,
    scorer: 0,
    height: 0,
    weight: 0,
    physicalCondition: '未知',
    weightStandard: 0,
    danger: '未知',
    charLt: '<',
    gender:0,
    time:"",
    status:"",
    _openid:null,
  },
  //gender性别映射
  onLoad: function () {
    var that = this
    that.get_data();
    
  },
  get_openid:function(){
    let that = this
      that.setData({
        _openid:app.globalData._openid
      })
      that.status()
  },
  get_gender:function() {
    var that = this
    const db = wx.cloud.database() 
    db.collection('user').where({
      _openid:this.data._openid
      }).get({
        success:res=>{
          if (res.data[0].gender==2){
            that.setData({gender:0})
          }
          else{
            that.setData({gender:res.data[0].gender})
          }
          
        }
      })
  },
  get_data:function(){
    var that = this
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    //获取年份  
    var Y =date.getFullYear();
    //获取月份  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //获取当日日期 
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(); 
    this.setData({
      time: Y + '-'  + M+ '-' + D
    })
    that.get_openid();
  },
  status:function(){
    var that = this
    const db = wx.cloud.database()  
    db.collection('data').where({
      _openid:that.data._openid,
      time:that.data.time
    }).get({
      success:res=>{
        if(res.data.length>0){
          that.setData({status:1})
          console.log("设"+that.data.status)
        }else{
          that.setData({status:0})
          console.log("设"+that.data.status)
        }
        that.get_gender()
      }
    })
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  bindKeyHightInput: function (e) {
    this.setData({
      height: e.detail.value
    })
  },
  bindKeyWeightInput: function (e) {
    this.setData({
      weight: e.detail.value
    })
  },
  bindKeyAgeInput: function (e) {
    this.setData({
      age: e.detail.value
    })
  },
  calculateBtn: function (e) {
    if (!this.data.height) {
      wx.showToast({
        title: '请输入身高'
      })
      return false;
    }

    if (!this.data.weight) {
      wx.showToast({
        title: '请输入体重'
      })
      return false;
    }
    
    if (!this.data.age) {   
      this.calculate();
      this.weightStandardCalculate();
      this.physicalConditionCalculate();
      scorer:0;
    }else{  
      this.calculate();
      this.weightStandardCalculate();
      this.physicalConditionCalculate();
      this.bfrcalculate();
    }
    console.log(this.data.time);
    console.log("查"+this.data.status)
    const db = wx.cloud.database()
    if(this.data.status==1){
      db.collection('data').where({
        "_openid":this.data._openid,
        time:this.data.time
      }).update({
      data: {
        height: this.data.height,
        weight: this.data.weight,
        age:this.data.age,
        bmi:this.data.score,
        bfr:this.data.scorer,
      },
      success: res => {
          console.log("更新成功");
     } 
  })
}else{
  db.collection('data').add({
    data: {
        time:this.data.time,
        height: this.data.height,
        weight: this.data.weight,
        age:this.data.age,
        bmi:this.data.score,
        bfr:this.data.scorer,
      },
      success: res => {
        console.log("插入成功");
        this.status();
      }
  })
}
},

  //计算IBM值
  calculate: function () {
    let score = 0;
    let height = this.data.height / 100;
    score = (this.data.weight / (height * height)).toFixed(1);
    this.setData({
      score: score
    })
  },

  //计算BFR值
  bfrcalculate: function () {
    let scorer = 0;
    let score = this.data.score;
    scorer = (1.2*score+0.23*this.data.age-5.4-10.8*this.data.gender).toFixed(1);
    this.setData({
      scorer: scorer
    })
  },
  //计算标准体重
  weightStandardCalculate: function () {
    let weight = 0;
    let height = this.data.height / 100;
    weight = (this.STANDARD * (height * height)).toFixed(1);
    this.setData({
      weightStandard: weight
    })
  },
  //身体状况计算
  physicalConditionCalculate: function () {
    let rule = this.rules[this.data.index];
    let value = 0;
    let score = + this.data.score;
    let length = rule.length;
    if (score >= rule[length - 1]) {
      value = length;
    } else {
      for (let length = rule.length, i = length; i >= 1; --i) {
        if (score < rule[i] && score >= rule[i - 1])
          value = i;
      }
    }

    this.setData({
      physicalCondition: this.ruleConfig[value]
    })

    this.setData({
      danger: this.dangerConfig[value]
    })
  }
})