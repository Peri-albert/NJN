// pages/huansan/huansan.js
var info = ""
function scanCode() {
  wx.scanCode({
    success: (res) => {
      wx.showLoading({
        title: '正在识别',
      })
      info = res.result
      wx.getStorage({
        key: 'session',
        success: function (res) {
          wx.request({
            url: 'https://www.sharedumbrella.top/index.php/api/borrow_umbrella',
            data: {
              id: res.data,
              info: info
            },
            success: function (res) {
              console.log(res.data.code == 200)
              if (res.data.code == 200) {
                wx.showModal({
                  title: '成功',
                  content: res.data.msg,
                  showCancel: false,
                  success: function (res) {
                    // code...
                  }
                })
              } else {
                wx.showModal({
                  title: '提示',
                  content: res.data.msg,
                  showCancel: false,
                  success: function (res) {
                    // code...
                  }
                })
              }
            },
            complete: function(){
              wx.hideLoading()
            }
          })
        },
      })
    }
  })
}
Page({
  data: {},
  onLoad: function (options) {
    // 页面加载
  },
  onReady: function () {
    // 页面渲染完成
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
  saoma: function () {
    scanCode()
  }
})