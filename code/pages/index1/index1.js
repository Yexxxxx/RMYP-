Page({

  data: {

    swiperCurrent: 0,

    indicatorDots: true,

    autoplay: true,

    interval: 3000,

    duration: 800,

    circular:true,

    imgUrls: [

      'https://p3.pstatp.com/large/43700001e49d85d3ab52',

      'https://p3.pstatp.com/large/39f600038907bf3b9c96',

      'https://p3.pstatp.com/large/31fa0003ed7228adf421'

    ],

    links:[

      '../user/user',

      '../user/user',

      '../user/user'

    ]

    

  },

  //轮播图的切换事件

  swiperChange: function (e) {

    this.setData({

      swiperCurrent: e.detail.current

    })

  },

  //点击指示点切换

  chuangEvent: function (e) {

    this.setData({

      swiperCurrent: e.currentTarget.id

    })

  },

  //点击图片触发事件

  swipclick: function (e) {

    console.log(this.data.swiperCurrent);

    wx.switchTab({

      url: this.data.links[this.data.swiperCurrent]

    })

  }

})