Page({
  data: {
    message: [],
    inputMsg: "",
    scrollTop: 0
  },
  onLoad: function (options) {
    var message = wx.getStorageSync('message');
    var top = message.length * 100;
    this.setData({
      message: message || [],
      scrollTop: top
    })

  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onUnload: function () {
    wx.setStorageSync('message', this.data.message);
  },
  inputMsg: function (e) {
    this.setData({
      inputMsg: e.detail.value
    })
  },
  sendMessage: function (e) {
    this.setData({
      inputMsg: e.detail.value.input
    })
    var that = this;
    if (this.data.inputMsg != "") {
      var msg = { type: 0, content: this.data.inputMsg };
      //发送信息
      this.setMessage(msg);
      //回复
      wx.request({
        url: "http://123.57.23.46:8080/hengji/question/query?question=" + msg.content,
        method: "get",
        header: { "Content-type": "application/json" },
        data: { info: msg.content },
        success: function (data) {
          console.log(data)
          var reply = { type: 1, content: data.data };
          that.setMessage(reply);
          that.setData({
            scrollTop: that.data.scrollTop + 300
          })
        }
      })
    }
  },
  setMessage: function (msg) {
    var msgList = this.data.message;
    msgList.push(msg);
    this.setData({
      message: msgList,
      inputMsg: "",
    })
  }
})