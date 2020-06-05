//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    banner: ["https://pic.downk.cc/item/5ed3623ac2a9a83be519e873.jpg", "http://www.tianyue.com.cn/repository/image/K4EBlCrbSbSjSNEUpM9guA.png", "http://img.zcool.cn/community/0118cf5837d75ea801219c77f35e67.jpg", "http://picapi.zhituad.com/photo/61/85/24FCE.jpg"],

    xindex: 0,
    currentIndex: 0,
    height: '',
    res: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    "firstList": [{
        "id": "1",
        "imageUrl": "https://pic.downk.cc/item/5ed3aa49c2a9a83be583dd4d.gif",
        "content": "标准俯卧撑"
      },
      {

        "id": "2",
        "imageUrl": "https://pic.downk.cc/item/5ed3aaa3c2a9a83be584adab.gif",
        "content": "单手俯卧撑"
      },
      {
        "id": "3",
        "imageUrl": "https://pic.downk.cc/item/5ed3aae3c2a9a83be5852e54.gif",
        "content": "倒立俯卧撑"
      },
      {
        "id": "4",
        "imageUrl": "https://pic.downk.cc/item/5ed3aae3c2a9a83be5852e5e.gif",
        "content": "跪姿俯卧撑"
      },
      {
        "id": "5",
        "imageUrl": "https://pic.downk.cc/item/5ed3aae3c2a9a83be5852e62.gif",
        "content": "军体俯卧撑"
      },
      {

        "id": "6",
        "imageUrl": "https://pic.downk.cc/item/5ed3aae3c2a9a83be5852e77.gif",
        "content": "跳跃俯卧撑"
      },
      {
        "id": "7",
        "imageUrl": "https://pic.downk.cc/item/5ed3aae3c2a9a83be5852e7b.gif",
        "content": "钻石俯卧撑"
      },
      {
        "id": "8",
        "imageUrl": "https://pic.downk.cc/item/5ed3abc1c2a9a83be586ed93.gif",
        "content": "宽距俯卧撑"
      },
      {
        "id": "8",
        "imageUrl": "https://pic.downk.cc/item/5ed3abc1c2a9a83be586ed91.gif",
        "content": "上斜俯卧撑"
      }
    ],
    "secondList": [{
        "id": "1",
        "imageUrl": "https://pic.downk.cc/item/5ed3ad63c2a9a83be58a56be.gif",
        "content": "箭步蹲"
      },
      {

        "id": "2",
        "imageUrl": "https://pic.downk.cc/item/5ed3ad63c2a9a83be58a56ca.gif",
        "content": "交叉箭步蹲跳"
      },
      {
        "id": "3",
        "imageUrl": "https://pic.downk.cc/item/5ed3ae28c2a9a83be58c00af.gif",
        "content": "向前箭步蹲走"
      },
      {
        "id": "4",
        "imageUrl": "https://pic.downk.cc/item/5ed3ad63c2a9a83be58a56d4.gif",
        "content": "收腹跳"
      },
      {
        "id": "5",
        "imageUrl": "https://pic.downk.cc/item/5ed3ae28c2a9a83be58c00c1.gif",
        "content": "鸭子走"
      },
      {
        "id": "6",
        "imageUrl": "https://pic.downk.cc/item/5ed3ae28c2a9a83be58c0097.gif",
        "content": "靠墙支撑"
      },
      {
        "id": "7",
        "imageUrl": "https://pic.downk.cc/item/5ed3ae28c2a9a83be58c00a1.gif",
        "content": "枪式深蹲"
      },
      {
        "id": "8",
        "imageUrl": "https://pic.downk.cc/item/5ed3ad63c2a9a83be58a56cf.gif",
        "content": "深蹲跳"
      },
      {
        "id": "9",
        "imageUrl": "https://pic.downk.cc/item/5ed3ae28c2a9a83be58c00a8.gif",
        "content": "深蹲"
      },
    ],
    "thirdList": [{
        "id": "1",
        "imageUrl": "https://pic.downk.cc/item/5ed3b01ac2a9a83be5903161.gif",
        "content": "V字起身"
      },
      {

        "id": "2",
        "imageUrl": "https://pic.downk.cc/item/5ed3b01ac2a9a83be5903163.gif",
        "content": "侧支撑"
      },
      {
        "id": "3",
        "imageUrl": "https://pic.downk.cc/item/5ed3b01ac2a9a83be5903165.gif",
        "content": "平板支撑"
      },
      {
        "id": "4",
        "imageUrl": "https://pic.downk.cc/item/5ed3b01ac2a9a83be590316d.gif",
        "content": "墙上行走"
      },
      {
        "id": "5",
        "imageUrl": "https://pic.downk.cc/item/5ed3b10ac2a9a83be592479e.gif",
        "content": "倒立支撑"
      },
      {
        "id": "6",
        "imageUrl": "https://pic.downk.cc/item/5ed3b10ac2a9a83be59247a2.gif",
        "content": "腹背滚动"
      },
      {
        "id": "7",
        "imageUrl": "https://pic.downk.cc/item/5ed3b10ac2a9a83be59247a9.gif",
        "content": "四点支撑"
      },
      {
        "id": "8",
        "imageUrl": "https://pic.downk.cc/item/5ed3b10ac2a9a83be59247b3.gif",
        "content": "向前爬行"
      },
      {
        "id": "9",
        "imageUrl": "https://pic.downk.cc/item/5ed3b10ac2a9a83be592479e.gif",
        "content": "靠墙倒立"
      },
      {
        "id": "10",
        "imageUrl": "https://pic.downk.cc/item/5ed3b1a8c2a9a83be593c257.gif",
        "content": "仰卧风车"
      },
      {
        "id": "11",
        "imageUrl": "https://pic.downk.cc/item/5ed3b22fc2a9a83be594ebb0.gif",
        "content": "仰卧抬腿"
      },
      {
        "id": "12",
        "imageUrl": "https://pic.downk.cc/item/5ed3b22fc2a9a83be594ebb7.gif",
        "content": "原地爬行"
      },
      {
        "id": "13",
        "imageUrl": "https://pic.downk.cc/item/5ed3b22fc2a9a83be594ebbc.gif",
        "content": "蜘蛛步"
      },
      {
        "id": "14",
        "imageUrl": "https://pic.downk.cc/item/5ed3b22fc2a9a83be594ebc1.gif",
        "content": "仰卧起坐"
      },
    ],
    fourthList:[{
        "id": "1",
        "imageUrl": "https://pic.downk.cc/item/5ed3b32bc2a9a83be5974521.gif",
        "content": "波比+跳远"
    },{
      "id": "2",
      "imageUrl": "https://pic.downk.cc/item/5ed3b32bc2a9a83be5974529.gif",
      "content": "波比跳"
  },{
    "id": "3",
    "imageUrl": "https://pic.downk.cc/item/5ed3b32bc2a9a83be597452d.gif",
    "content": "登山跑"
},{
  "id": "4",
  "imageUrl": "https://pic.downk.cc/item/5ed3b32bc2a9a83be5974532.gif",
  "content": "熊爬"
}

    ]
  },

  onLoad: function () {
    wx.showShareMenu()
  },
  //swiper切换时会调用
  pagechange: function (e) {
    if ("touch" === e.detail.source) {
      let currentPageIndex = this.data.currentIndex
      currentPageIndex = (currentPageIndex + 1) % 4
      this.setData({
        currentIndex: currentPageIndex
      })
    }
  },
  //用户点击tab时调用
  titleClick: function (e) {
    let currentPageIndex =
      this.setData({
        //拿到当前索引并动态改变
        currentIndex: e.currentTarget.dataset.idx
      })
  },

  //banner切换时候替换角标
  onChange: function (e) {
    this.setData({
      xindex: e.detail.current
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          height: res.windowHeight
        })
      }
    })

  }

})