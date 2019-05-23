// pages/mine/mine.js
Page({
  data:{
    checked: "checked",
    status: "0",
    avatar: '../../images/mine/default.png'
  },
  onLoad:function(options){
    var pg = this
    // 页面初始化 options为页面跳转所带来的参数
    wx.getStorage({
      key: 'session',
      success: function(res) {
        wx.request({
          url: 'https://www.sharedumbrella.top/index.php/api/msg_cf',
          data:{
            id: res.data
          },
          success: function(res){
            if(res.data.code==200){
              var status = parseInt(res.data.msg)==0?"checked":""
              console.log(status)
              pg.setData({checked: status})
              pg.setData({status: res.data.msg})
            }
          }
        })
      },
    })
    wx.getStorage({
      key: 'avatar',
      success: function(res) {
        pg.setData({avatar: res.data})
      },
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  xxts: function(event){
    var status = event.target.dataset.status
    var push_status = parseInt(status)==0?1:0
    this.setData({ status: push_status })
    wx.getStorage({
      key: 'session',
      success: function (res) {
        wx.request({
          url: 'https://www.sharedumbrella.top/index.php/api/msg_set',
          data: {
            id: res.data,
            co: push_status
          },
          success: function (res) {
            console.log(res.data)
          }
        })
      },
    })
  }
})