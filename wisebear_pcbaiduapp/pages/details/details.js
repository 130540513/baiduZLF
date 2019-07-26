var WxParse = require('../../wxParse/wxParse.js');
let app = getApp();
const sit = app.siteInfo;
const adv = app.adv;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailsContent: [],
    keywords:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.setBackColor();
    app.setFooter(this);
    this.getNewDetails();
        app.getadvappid(adv.newsid,this)
  },

  getNewDetails() {
    let that = this;
    app.util.request({
      url: sit.siteroot + '?i=' + sit.uniacid + '&c=entry&do=new&from=wxapp&a=baiduapp&m=wisebear_pcbaiduapp&id=' + that.options.id,
      method: "get",
      success: res => {
        let sub=res.data.data.keyword.split(',')
         let newsub = [];
          for (var i = 0; i < sub.length; i++) {
            if (sub[i]) {
              newsub[i] = sub[i].substring(0,8);
            }
          }
        WxParse.wxParse('article', 'html', res.data.data.content, that, 5);
        that.setData({
          detailsContent: res.data.data,
          keywords:newsub
        });
        
        let title=that.data.detailsContent.title,desc=that.data.detailsContent.outline,keywords=that.data.detailsContent.keyword;
        swan.setPageInfo({
            title: title,
            keywords: keywords,
            description: desc,
            success: function () {
                console.log('setPageInfo success');
            },
            fail: function (err) {
                console.log('setPageInfo fail', err);
            }
        })
      }
      
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