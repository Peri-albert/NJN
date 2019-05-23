// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    text_display: 'none',
    loading: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var pg = this;
    wx.getStorage({
      key: 'session',
      success: function(res) {
        wx.request({
          url: 'https://www.sharedumbrella.top/index.php/api/get_list',
          data:{
            id: res.data
          },
          success: function(res){
            pg.setData({loading: 'none'})
            if(res.data.code==200){
              if(res.data.msg!='no-data'){
                pg.setData({ list: res.data.msg })
              }else{
                pg.setData({ text_display: '' })
              }
            }
          }
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var pg = this
    wx.getStorage({
      key: 'session',
      success: function (res) {
        wx.request({
          url: 'https://www.sharedumbrella.top/index.php/api/get_list',
          data: {
            id: res.data
          },
          success: function (res) {
            pg.setData({ loading: 'none' })
            if (res.data.code == 200) {
              if (res.data.msg != 'no-data') {
                pg.setData({ 
                  list: res.data.msg,
                  text_display: 'none'
                })
              } else {
                pg.setData({ text_display: '' })
              }
            }
          }
        })
      },
    })
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  refresh: function(){
    var pg = this
    wx.getStorage({
      key: 'session',
      success: function (res) {
        wx.request({
          url: 'https://www.sharedumbrella.top/index.php/api/get_list',
          data: {
            id: res.data,
            bd: "1"
          },
          success: function (res) {
            pg.setData({ loading: 'none' })
            if (res.data.code == 200) {
              if (res.data.msg != 'no-data') {
                pg.setData({
                  list: res.data.msg,
                  text_display: 'none'
                })
              } else {
                pg.setData({ text_display: '' })
              }
            }
          }
        })
      },
    })
  }
})