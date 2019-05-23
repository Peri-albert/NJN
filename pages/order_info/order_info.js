// pages/order_info/order_info.js
var timeout = ""
Page({
  data:{
    time1: '../../images/serve/time/0.png',
    time2: '../../images/serve/time/0.png',
    maohao: '../../images/serve/time/maohao.png',
    time3: '../../images/serve/time/0.png',
    time4: '../../images/serve/time/0.png',
    orderheight: '200rpx',
    animation: '',
    image: '../../images/order/echelon_up.png',
    money: '--',
    umbrella_id: '--',
    out_time: '0mins',
    start_time: '--',
    end_time: '--',
    url: ''
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var pg = this
    var bid = options.id
    var time = "00:00"
    var status = ""
    var url = ""
    wx.getStorage({
      key: 'session',
      success: function (res) {
        wx.request({
          url: 'https://www.sharedumbrella.top/index.php/api/time_left',
          data: {
            id: res.data,
            bid: bid
          },
          success: function (res) {
            if (res.data.code == 200) {
              time = res.data.msg.time
              status = res.data.msg.status
              url = status == 1 ? "../../images/serve/out-time/" : "../../images/serve/time/"
              pg.setData({ time1: url + time.substr(0, 1) + ".png" })
              pg.setData({ time2: url + time.substr(1, 1) + ".png" })
              pg.setData({ time3: url + time.substr(3, 1) + ".png" })
              pg.setData({ time4: url + time.substr(4, 1) + ".png" })
              pg.setData({ maohao: url + "maohao.png" })
            }
          }
        }),
        wx.request({
          url: 'https://www.sharedumbrella.top/index.php/api/get_detail',
          data: {
            id: res.data,
            bid: bid
          },
          success: function(res){
            var data = res.data.msg
            if(res.data.code==200){
              pg.setData({
                money: data.money,
                umbrella_id: data.umbrella_id,
                out_time: data.out+"mins",
                start_time: data.start,
                end_time: data.end,
                url: "?id="+data.id
              })
            }
          }
        })
      },
    })
    timeout = setInterval(function () {
      if(status!=-1){
        var shi = parseInt(time.substr(0, 2))
        var fen = parseInt(time.substr(3, 2))
        if (fen == 0 && shi == 0) {
          status = 1
          url = status == 0 ? "../../images/serve/time/" : "../../images/serve/out-time/"
          pg.setData({ maohao: url + "maohao.png" })
        }
        if (status == 0) {
          fen = fen - 1
        } else {
          fen = fen + 1
        }
        if (fen < 0) {
          fen = 59
          shi = shi - 1
        }
        if (shi < 10) {
          shi = "0" + shi
        }
        if (fen < 10) {
          fen = "0" + fen
        }
        time = shi + ":" + fen
        pg.setData({ time1: url + time.substr(0, 1) + ".png" })
        pg.setData({ time2: url + time.substr(1, 1) + ".png" })
        pg.setData({ time3: url + time.substr(3, 1) + ".png" })
        pg.setData({ time4: url + time.substr(4, 1) + ".png" })
        console.log("round")
      }
    }, 1000*60)
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
    console.log("close")
    timeout = clearInterval(timeout)
  },
  changeHeight: function() {
    var orderheight = this.data.orderheight == '200rpx' ? '420rpx' : '200rpx';
    var anotherImage = this.data.image == '../../images/order/echelon_up.png' ? '../../images/order/echelon_down.png' : '../../images/order/echelon_up.png'
    var animation = this.data.animation == 'up 0.5s'?'down 0.5s':'up 0.5s'
    this.setData({
      orderheight: orderheight,
      image: anotherImage,
      animation: animation
    });

  }


})