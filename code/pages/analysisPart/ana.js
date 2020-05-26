const app = getApp()
import * as echarts from '../ec-canvas/echarts';

Page({
  data: {
    // 默认数据
    date01:'2020-5-15',
    date02: '2020-5-21',
    //折现属性
    series:[{
      data: ([55, 55.5, 53, 57, 56.5, 57.5, 60]).reverse(),
      name:'体重(kg)',
      smooth:false,
      type:'line',
      yAxisIndex:0
    }, {
        data: ([15, 16, 15, 17.5, 19, 16, 18]).reverse(),
        name: 'BMI值(%)',
        smooth: false,
        type: 'line',
        yAxisIndex:1
      }, {
        data: ([11, 11.5, 9, 17, 15, 14, 13]).reverse(),
        name: 'BRF值(%)',
        smooth: false,
        type: 'line',
        yAxisIndex:1
      }],
    // 默认7天
    ascissaData:(['5-15','5-16','5-17','5-18','5-19','5-20','5-21','5-22']).reverse(),
    ec: {
      lazyLoad: true
    }
  },
  get_data:function(){
    var that = this
    var time_list = []
    var bmi_list = []
    var bfr_list =[]
    var weight_list=[]
   const db = wx.cloud.database()
   db.collection('data').where({"_openid":"oKGUL4_f55SAlzzcw1VWUVbyosgU"}).get({
   success:(res)=>{
     wx:for(let i = 0 ; i < res.data.length ; ++i){
       time_list[i]= res.data[i].time.substring(5,10)
       bmi_list[i]=res.data[i].bmi
       bfr_list[i]=res.data[i].bfr
       weight_list[i]=res.data[i].weight
      
   }
   that.setData({
    ascissaData:[(time_list).reverse()],
    series:[{
    data:(weight_list).reverse(), 
    name:'体重(kg)',
    smooth:false,
    type:'line',
    yAxisIndex:0},{ 
      data:(bmi_list).reverse(),
      name: 'BMI值(%)',
      smooth: false,
      type: 'line',
      yAxisIndex:1
    },{
      data:(bfr_list).reverse(), 
      name: 'BRF值(%)',
      smooth: false,
      type: 'line',
      yAxisIndex:1
    }]
  })
  this.echartsComponnet = this.selectComponent('#mychart');
  that.init_echarts()
  // db.setOption(this.getOption());
  // return db;
 } 
})
// that.setData({
//   ascissaData:[(time_list).reverse()],
//   series:[{
//   data:(weight_list).reverse(), 
//   name:'体重(kg)',
//   smooth:false,
//   type:'line',
//   yAxisIndex:0},{ 
//     data:(bmi_list).reverse(),
//     name: 'BMI值(%)',
//     smooth: false,
//     type: 'line',
//     yAxisIndex:1
//   },{
//     data:(bfr_list).reverse(), 
//     name: 'BRF值(%)',
//     smooth: false,
//     type: 'line',
//     yAxisIndex:1
//   }]
// })
// db.setOption(this.getOption());
// return db;
},
  onLoad: function () {
    var that = this
    that.get_data()
    
    // this.echartsComponnet = this.selectComponent('#mychart');
    // that.init_echarts()
  },

  // 日期选择器
  bindDateChange01: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date01: e.detail.value
    })
  },
  bindDateChange02: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date02: e.detail.value
    })
  },

  //初始化图表
  init_echarts: function () {
    var that = this

    this.echartsComponnet.init((canvas, width, height) => {  
      const Chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      Chart.setOption(that.getOption());
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return Chart;
    });
  },

  // 获取数据
  getOption: function () {
    var that = this
    
    console.log(that.data.series)
    console.log(that.data.ascissaData)
    console.log(that.data.ascissaData[0])
    var legendList = []
    for (var i in that.data.series) {
      var obj = {
        name: that.data.series[i].name,
        icon: 'circle',
        textStyle: {
          color: '#000000',
        }
      }
      legendList.push(obj)
      that.data.series[i].data.reverse()
    }
    var option = {
      title: {
        text: '体态分析',
        left: 'center',
        top:-5,
      },
      // z
      color: ["#D0505D", "#A6BFC3", "#006699"],
      // 折线图的线条代表意义
      legend: {
        itemWidth: 5, //小圆点的宽度
        itemGap: 25,
        selectedModel: 'single', //折线可多选
        inactiveColor: '#87CEEB',
        data: legendList,
        top: 30,
        left: 85,
        z: 100
      },
      // 刻度
      grid: {
        containLabel: true
      },
      // 悬浮图标
      tooltip: {
        show: true,
        trigger: 'axis',
        position: function (pos, params, dom, rect, size) {
          var obj = {
            top: 60
          };
          obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
          return obj;
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: that.data.ascissaData[0],
        // show: false
      },
      dataZoom: [
        {
            type: 'slider',
            start: 1,
            end:70
        },
        {   // 这个dataZoom组件，也控制x轴。
          type: 'inside', // 这个 dataZoom 组件是 inside 型 dataZoom 组件
          start: 10,      // 左边在 10% 的位置。
          end: 60         // 右边在 60% 的位置。
      }
    ],
      yAxis: [{
        name: '体重kg',
        type: 'value',
        min: 0,
        // max: 40,
        //y标轴名称的文字样式
        nameTextStyle: {
        color: '#D0505D'
        },
        //网格线
        splitLine: {
        show: true,
        lineStyle: {
        color: ['#DDDDDD']
        }
        },
        //去掉刻度
        axisTick: {
        show: false
        },
        //去掉y轴线
        axisLine: {
        show: false
        },
        },
        {
        name: '百分比%',
        type: 'value',
        // max: 4,
        min: 0,
        nameTextStyle: {
        color: '#006699'
        },
        //去掉刻度
        axisTick: {
        show: false
        },
        //去掉y轴线
        axisLine: {
        show: false
        },
         
        }
        ],
      series: that.data.series
    }
    return option
  },

  // 获取折线图数据
})