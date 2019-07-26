// pages/contact/contact.js
let app = getApp();
const sit = app.siteInfo;
const adv = app.adv;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    companyname: [],
    serviceswitch:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getContact();
    app.setBackColor();
    app.setFooter(this);
    this.serviceswitch();
            app.getadvappid(adv.memberid,this)
  },
  getContact() {
    let that = this;
    app.util.request({
      url: sit.siteroot + '?i=' + sit.uniacid + '&c=entry&do=setting&from=wxapp&a=baiduapp&m=wisebear_pcbaiduapp',
      success: res => {
        console.log(res)
        that.setData({
          companyname: res.data.data
        });
      }
    });
  },
  getPhoneNumber() {
    swan.makePhoneCall({
      phoneNumber: this.data.companyname.phone //仅为示例，并非真实的电话号码
    });
  },
  onShareAppMessage() {},
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
  onShareAppMessage: function () {},
  tomap() {
    // console.log(res)
    // wx.getLocation({
    //   type: 'wgs84',
    //   success(res) {
    //     const latitude = res.latitude
    //     const longitude = res.longitude
    //     console.log(latitude, longitude)

    //   }
    // })
    console.log(parseFloat(this.data.companyname.latitude))
    console.log(parseFloat(this.data.companyname.longitude))
    // return
    const latitude = parseFloat(this.data.companyname.latitude);
    const longitude = parseFloat(this.data.companyname.longitude);
    swan.openLocation({
      latitude,
      longitude,
      scale: 18
    });
  },
  serviceswitch() {
    let that = this;
    app.util.request({
      url: sit.siteroot + '?i=' + sit.uniacid + '&c=entry&do=serviceswitch&from=wxapp&a=baiduapp&m=wisebear_pcbaiduapp',
      success: res => {
        that.setData({
          serviceswitch:res.data.data
        });
      }
    });
  }
});