// pages/feedback/feedback.js
let app = getApp();
const sit = app.siteInfo;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    texts: "至少需要15个字",
    min: 15, //最少字数
    max: 520, //最多字数 (根据自己需求改变) 
    currentWordNumber: 0,
    feebackImg: []
  },
  //字数限制  
  inputs: function (e) {
    // 获取输入框的内容
    var value = e.detail.value;
    // 获取输入框内容的长度
    var len = parseInt(value.length);
    // console.log(len)
    //最少字数限制
    if (len <= this.data.min) this.setData({
      texts: "至少还需要",
      textss: "字",
      num: this.data.min - len
    });else if (len > this.data.min) this.setData({
      texts: " ",
      textss: " ",
      num: ''
    });

    this.setData({
      currentWordNumber: len //当前字数  
    });
    //最多字数限制
    if (len > this.data.max) return;
    // 当输入框内容的长度大于最大长度限制（max)时，终止setData()的执行

    // console.log(this.data)
  },
  formSubmit(e) {

    let name = e.detail.value.name,
        phone = e.detail.value.phone,
        message = e.detail.value.message;
    if (name.length == "" || phone.length == "" || message == "") {
      swan.showToast({
        title: '请输入信息'
      });
      return;
    }
    if (!/^1(3|4|5|7|8)\d{9}$/.test(phone)) {
      swan.showToast({
        title: '电话号码有误'
      });
      return;
    }
    app.util.request({
      url: sit.siteroot + '?i=' + sit.uniacid + '&c=entry&do=message&from=wxapp&a=baiduapp&m=wisebear_pcbaiduapp',
      data: {
        name: name,
        phone: phone,
        message: message,
        uid: app.globalData.userInfo.uid
      },
      dataType: 'json',
      method: "post",
      success: res => {
        // console.log(res)
        swan.showToast({
          title: '提交成功'
        });
        swan.switchTab({
          url: '/wisebear_pcbaiduapp/pages/index/index'
        });
      }
    });
  },
  getFeebackImg() {
    let that = this;
    app.util.request({
      url: sit.siteroot + '?i=' + sit.uniacid + '&c=entry&do=message_banner&from=wxapp&a=baiduapp&m=wisebear_pcbaiduapp',
      success: res => {
        // console.log(res)
        that.setData({
          feebackImg: res.data.data
        });
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!app.globalData.userInfo.uid) {
      swan.redirectTo({
        url: "/wisebear_pcbaiduapp/pages/login/login?url=/wisebear_pcbaiduapp/pages/feedback/feedback"
      });
      return;
    }
    swan.setNavigationBarTitle({
      title: '留言反馈'
    });
    this.getFeebackImg();
    app.setBackColor();
    app.setFooter(this);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {}
});