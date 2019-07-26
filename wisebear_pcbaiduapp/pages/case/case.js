// pages/case/case.js
let app = getApp();
const sit = app.siteInfo;
const adv = app.adv;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    caseList: [],
    currentTab: '',
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 600,
    sliders: [],
    casenav: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCasenav();
    this.getBanner();
    app.setBackColor();
    app.setFooter(this);
    app.setFontColor(this);
    app.getadvappid(adv.classicid,this)
  },
  getBanner() {
    let that = this;
    app.util.request({
      url: sit.siteroot + '?i=' + sit.uniacid + '&c=entry&do=case_banner&from=wxapp&a=baiduapp&m=wisebear_pcbaiduapp',
      success: res => {
        that.setData({
          sliders: res.data.data
        });
      }
    });
  },
  getCase() {
    let that = this;
    // console.log(that.data.currentTab)
    app.util.request({
      url: sit.siteroot + '?i=' + sit.uniacid + '&c=entry&do=case_list&from=wxapp&a=baiduapp&m=wisebear_pcbaiduapp&id=' + that.data.currentTab,
      success: res => {
        // console.log(res)
        that.setData({
          caseList: res.data.data
        });
      }
    });
  },
  getCasenav() {
    let that = this;
    app.util.request({
      url: sit.siteroot + "?i=" + sit.uniacid + "&c=entry&do=case_cate&from=wxapp&a=baiduapp&m=wisebear_pcbaiduapp",
      success: res => {
        // console.log(res)
        that.setData({
          casenav: res.data.data,
          currentTab: res.data.data[0].id
        });
        that.getCase();
      }
    });
  },
  //点击切换
  clickTab: function (e) {
    var that = this;
    if (that.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      });
      that.getCase();
    }
  },
  onShareAppMessage() {},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
   
  },

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