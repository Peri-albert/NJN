// pages/map/map.js
function location(pg){
  wx.getLocation({
    success: function (res) {
      console.log(res)
      pg.setData({ lon: res.longitude })
      pg.setData({ lat: res.latitude })
      wx.request({
        url: 'https://www.sharedumbrella.top/index.php/api/get_terminal_position',
        data: {
          lon: res.longitude,
          lat: res.latitude
        },
        success: function (res) {
          if (res.data.code == 200) {
            pg.setData({ marks: res.data.msg })
          }
        }
      })
    },
  })
}

Page({
  data:{
    scale: 16,
    lon: '',
    lat: '',
    marks: []
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var pg = this
    location(pg);
    setInterval(function(){
      location(pg);
    },1000*60)
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
  }
})