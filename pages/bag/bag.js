// pages/bag/bag.js
Page({
  data: {
    money: "--",
    avatar: '../../images/mine/default.png'
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    // 页面渲染完成
    var pg = this
    wx.getStorage({
      key: 'session',
      success: function (res) {
        wx.request({
          url: 'https://www.sharedumbrella.top/index.php/api/amount',
          data: {
            id: res.data
          },
          success: function (res) {
            if (res.data.code == 200) {
              pg.setData({ money: res.data.msg })
            }
          }
        })
      },
    })
    wx.getStorage({
      key: 'avatar',
      success: function (res) {
        pg.setData({ avatar: res.data })
      },
    })
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  jnyj: function () {
    wx.showModal({
      title: '提示',
      content: '功能暂未开放',
      showCancel: false
    })
  },
  thyj: function () {
    wx.showModal({
      title: '提示',
      content: '功能暂未开放',
      showCancel: false
    })
  }


  // cz: function(){
  //   wx.request({
  //     url: 'https://www.sharedumbrella.top/index.php/api/pay',
  //     data: {
  //       id: res.data
  //     },
  //     success: function(res){
  //       if(res.data.code==200){
  //         wx.requestPayment({
  //           'timeStamp': '',
  //           'nonceStr': '',
  //           'package': '',
  //           'signType': 'MD5',
  //           'paySign': '',
  //           'success': function (res) {
  //           },
  //           'fail': function (res) {
  //           }
  //         })
  //       }
  //     }
  //   })
  // }
})