// pages/err-zdj/err-zdj.js
var reason = ""
var id = ""
Page({
  data: {
    checked: "",
    text: ""
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    id = options.id
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

  selection: function (e) {
    var pg = this
    pg.setData({ checked: "" })
    reason = e.currentTarget.dataset.text
  },

  other: function (e) {
    var pg = this
    reason = pg.data.text
  },

  get_text: function (e) {
    var pg = this
    e.currentTarget.dataset.text = e.detail.value
    pg.setData({
      text: e.currentTarget.dataset.text
    })
    reason = e.currentTarget.dataset.text
  },

  atfocus: function (e) {
    this.setData({
      checked: "checked",
    })
    reason = this.data.text
  },

  ok: function (e) {
    var pg = this
    console.log("reason:" + reason)
    wx.request({
      url: 'https://www.sharedumbrella.top/index.php/api/wrong',
      data: {
        id: id,
        reason: reason,
        kind: "umbrella"
      },
      success: function (res) {
        if (res.data.code == 200) {
          wx.showToast({
            title: '成功'
          })
        } else {
          wx.showToast({
            title: res.data.msg
          })
        }
      }
    })
  }
})