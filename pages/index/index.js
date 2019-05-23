//获取应用实例
var app = getApp()

function get_weather(pg){
  wx.getLocation({
    success: function (res) {
      var lat = res.latitude
      var lon = res.longitude
      wx.request({
        url: 'https://www.sharedumbrella.top/index.php/api/get_weather',
        data: {
          lon: lon,
          lat: lat
        },
        success: function (res) {
          if (res.data.code == 200) {
            pg.setData({ loading: 'display: none'})
            var url = "https://www.sharedumbrella.top/asset/wx_app/images/home/weather/" + res.data.msg.weather_code + ".png"

            pg.setData({ temp: res.data.msg.temperature + '°' })
            pg.setData({ location: res.data.msg.area })
            pg.setData({ weather: res.data.msg.weather })
            pg.setData({ date: res.data.msg.time })
            pg.setData({ w_code: "background-image: url(" + url + ")" })
          } else {
            console.log('error' + res.data.msg)
          }
        }
      })
    },
  })
}

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    temp: '',
    date: '',
    weather: '',
    location: '',
    w_code: '',
    loading: ''
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onLoad: function () {
    var pg = this
    // wx.checkSession({
    //   success: function(){
    //     console.log('checksession')
    //     wx.request({
    //       url: 'https://www.sharedumbrella.top/index.php/api/get_session',
    //     })
    //     wx.getLocation({
    //       success: function(res) {
    //         var lat = res.latitude
    //         var lon = res.longitude
    //         wx.request({
    //           url: 'https://www.sharedumbrella.top/index.php/api/get_weather',
    //           data:{
    //             lon:lon,
    //             lat:lat
    //           },
    //           success: function(res){
    //             if(res.data.code == 200){
    //               var url = "https://www.sharedumbrella.top/asset/wx_app/images/home/weather/"+res.data.msg.weather_code+".png"

    //               pg.setData({temp: res.data.msg.temperature})
    //               pg.setData({location: res.data.msg.area})
    //               pg.setData({weather: res.data.msg.weather})
    //               pg.setData({date: res.data.msg.time})
    //               pg.setData({w_code: "background-image: url("+url+")"})
    //             }else{
    //               console.log('error' + res.data.msg)
    //             }
    //           }
    //         })
    //       },
    //     })
    //   },
      // fail:function(){
      //   console.log('login')
        wx.login({
          success: function(res){
            if(res.code){
              wx.getUserInfo({
                success: function(res){
                  var avatar = res.userInfo.avatarUrl
                  var nickName = res.userInfo.nickName
                  wx.setStorage({
                    key: 'avatar',
                    data: avatar,
                  })
                  wx.setStorage({
                    key: 'nickName',
                    data: nickName,
                  })
                }
              })
              wx.request({
                url: 'https://www.sharedumbrella.top/index.php/api/log_uid_session',
                data:{
                  code: res.code
                },
                success: function(res){
                  if(res.data.code==200){
                    console.log('weather success')
                    wx.setStorage({
                      key: 'session',
                      data: res.data.msg,
                    })
                    get_weather(pg)
                    setInterval(function(){
                      get_weather(pg)
                    },1000*60*10)
                  }else{
                    console.log('error:' + res.data.msg)
                  }
                }
              })
            }else{
              console.log('获取用户信息失败!' + res.errMsg)
            }
          }
        })
    //   }
    // })
    console.log('onLoad')
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      pg.setData({
        userInfo: userInfo
      })
    })
  },
  onShareAppMessage: function(){
    
  }
})