
let app = getApp();
const sit = app.siteInfo;
Page({
  onReady(res) {
    this.videoContext = swan.createVideoContext('myVideo');
  },
  inputValue: '',
  data: {
    src: '',
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.setBackColor();
    swan.setNavigationBarTitle({
      title: '视频'
    });
    this.getVideo();
  },
  getVideo() {
    let that = this;
    app.util.request({
      url: sit.siteroot + '?i=' + sit.uniacid + '&c=entry&do=video&from=wxapp&a=baiduapp&m=wisebear_pcbaiduapp',
      success: res => {
        // console.log(res.data.data)
        that.setData({
          list: res.data.data
        });
      }
    });
  },
  // 点击cover播放，其它视频结束
  videoPlay: function (e) {
    var length = this.data.list.length;
    var id = e.currentTarget.id;
    if (!this.data.playIndex) {
      // 没有播放时播放视频
      this.setData({
        playIndex: id
      });
      var videoContext = swan.createVideoContext(['index', id].join(''));
      videoContext.play();
    } else {
      // 有播放时先将prev暂停到0s，再播放当前点击的current
      var videoContextPrev = swan.createVideoContext(['index', this.data.playIndex].join(''));
      videoContextPrev.seek(0);
      videoContextPrev.pause();
      this.setData({
        playIndex: id
      });
      var videoContextCurrent = swan.createVideoContext(['index', this.data.playIndex].join(''));
      videoContextCurrent.play();
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