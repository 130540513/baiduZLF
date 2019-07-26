let app = getApp();
const sit = app.siteInfo;
const adv = app.adv;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picList: [],
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 600,
    sliders: [],
    currentTab: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.setBackColor();
    app.setFooter(this);
    app.setFontColor(this);
    this.getPronav();
    this.getBanner();
            app.getadvappid(adv.productcenterid,this)
  },
  getBanner() {
    let that = this;
    app.util.request({
      url: sit.siteroot + '?i=' + sit.uniacid + '&c=entry&do=product_banner&from=wxapp&a=baiduapp&m=wisebear_pcbaiduapp',
      success: res => {
        // console.log(res)
        that.setData({
          sliders: res.data.data
        });
      }
    });
  },
  getPronav() {
    let that = this;
    app.util.request({
      url: sit.siteroot + "?i=" + sit.uniacid + "&c=entry&do=product_cate&from=wxapp&a=baiduapp&m=wisebear_pcbaiduapp",
      success: res => {
        // console.log(res)
        that.setData({
          proList: res.data.data,
          currentTab: res.data.data[0].id
        });
        that.getProduct();
      }
    });
  },
  getProduct() {
    let that = this;
    // console.log(that.data.currentTab)
    app.util.request({
      url: sit.siteroot + '?i=' + sit.uniacid + '&c=entry&do=product_list&from=wxapp&a=baiduapp&m=wisebear_pcbaiduapp&id=' + that.data.currentTab,
      success: res => {
        // console.log(res).
        that.setData({
          picList: res.data.data
        });
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
      that.getProduct();
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