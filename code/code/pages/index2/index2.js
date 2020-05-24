

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
    scorer:0,
    height: 0,
    weight: 0,
    physicalCondition: '未知',
    weightStandard: 0,
    danger: '未知',
<<<<<<< HEAD
    charLt: '<'
  },
  onLoad: function () {
    
  },
=======
    charLt: '<',
    gender:0,
  },
  //gender性别映射
  onLoad: function () {
    var that = this
    const db = wx.cloud.database() 
    db.collection('user').where({
      "_openid":app.globalData._openid
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
<<<<<<< HEAD
=======

>>>>>>> b76cadb2ceb4edc5782f1aa7ce0b6c9825b61bc3
>>>>>>> 1dbd9dd7c421a23b37d73e8bf4036711d5cc3f76
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
      return scorer==0;
    }else{     
    this.calculate();
    this.weightStandardCalculate();
    this.physicalConditionCalculate();
<<<<<<< HEAD
    this.bfrcalculate();
    }
    
=======
    var time = util.formatTime(new Date());
    this.setData({
      time: time
    });
    var that = this
    const db = wx.cloud.database()  
    db.collection('data').add({
      data: {
        height:this.data.height,
        time:time,
<<<<<<< HEAD
        weight:this.data.weight,
        bmi: this.data.weight
=======
        weight:this.data.weight
>>>>>>> b76cadb2ceb4edc5782f1aa7ce0b6c9825b61bc3
      },
      success: res => {
        console.log("插入成功");
      }
    })
>>>>>>> 1dbd9dd7c421a23b37d73e8bf4036711d5cc3f76
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