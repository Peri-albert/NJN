// pages/gzbx/gzbx.js
Page({
  data: {
    array: ['请选择', '雨伞', '终端机'],
    objectArray: [
      {
        id: 0,
        name: '请选择'
      },
      {
        id: 1,
        name: '雨伞'
      },
      {
        id: 2,
        name: '终端机'
      }
    ],
    index: 0,
    uri: ''
  },

  onLoad: function(option){
    console.log(option)
    var pg = this
    pg.setData({uri: "?id=" + option.id})
  },

  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  }
})