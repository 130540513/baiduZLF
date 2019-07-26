// pages/login/login.js
let app = getApp();
const sit = app.siteInfo;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      url: options.url
    });
    app.setBackColor();
  },
  onGotUserInfo(res) {
    let that = this;
    let user = res.detail.userInfo;
    if (res.detail.userInfo) {
      swan.login({
        success(res) {
          let code = res.code;
          let data = {
            code: code,
            nickName: user.nickName,
            avatarUrl: user.avatarUrl
          };
          if (app.globalData.share) {
            data.reco_id = app.globalData.share;
          }
          //  console.log(code)
          app.util.request({
            url: sit.siteroot + '?i=' + sit.uniacid + '&c=entry&do=openid&a=baiduapp&m=wisebear_pcbaiduapp',
            data: data,
            method: "post",
            success(res) {
              if (res.data.errno == 0) {
                app.globalData.userInfo['uid'] = res.data.data;
                app.globalData.userInfo['nickName'] = user.nickName;
                app.globalData.userInfo['avatarUrl'] = user.avatarUrl;
                console.log(that.data.url);
                swan.switchTab({
                  url: '/wisebear_pcbaiduapp/pages/index/index'
                });
              }
            }
          });
        }
      });
    } else {
      console.log("登录失败");
    }
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