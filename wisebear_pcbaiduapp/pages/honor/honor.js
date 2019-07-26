// pages/honor/honor.js
let app = getApp();
const sit = app.siteInfo;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    honorList: []

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    swan.setNavigationBarTitle({
      title: '荣誉资质'
    });
    this.gethonorList();
    app.setBackColor();
  },
  gethonorList() {
    let that = this;
    app.util.request({
      url: sit.siteroot + '?i=' + sit.uniacid + '&c=entry&do=honor&from=baiduapp&a=wxapp&m=wisebear_pcbaiduapp',
      success: res => {
        that.setData({
          honorList: res.data.data
        });
      }
    });
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