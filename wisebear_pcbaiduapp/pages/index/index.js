
const app = getApp();
const sit = app.siteInfo;
const adv = app.adv;
Page({
    
  data: {
    imgUrls: [],
    noticeUrls: [],
    menuList: [],
    newList: [],
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 600,
    vertical: true,
    currentTab: '',
    newContent: [],
    backgroundColor: null,
    page: 1,
    pzize: 2,
    isHaveData: true,
    isGetData: false,
    serviceswitch:0,
    appid:'',
    apid:'',
    appids:'',
    apids:'',
  },

  onLoad: function () {
    this.getTitleBg();
    this.getcommon();
    this.getBan();
    this.getNew();
    this.getNotice();
    this.getKey()
    swan.getSystemInfo({
      success: res => {
        this.setData({
          height: res.windowHeight
        });
      }
    });
    this.serviceswitch();
    app.getadvappid(adv.navigationid,this)
    app.getadvappid(adv.footerid,this,2)
  },
  // 轮播图
  getBan(){
        app.util.request({
      url: sit.siteroot + '?i=' + sit.uniacid + '&c=entry&do=index&from=wxapp&a=baiduapp&m=wisebear_pcbaiduapp',
      success: res => {
        console.log(res)
        this.setData({
          imgUrls: res.data.data
        });
      }    
    });
  },
  // 新闻资讯
  getNew() {
    let that = this;
    app.util.request({
      url: sit.siteroot + '?i=' + sit.uniacid + '&c=entry&do=home_new_cate&from=wxapp&a=baiduapp&m=wisebear_pcbaiduapp',
      success: res => {
        that.setData({
          newList: res.data.data,
          currentTab: res.data.data[0].id
        });
        that.getNewPage(true);
      }
    });
  },
  //  公告
  getNotice() {
    let that = this;
    app.util.request({
      url: sit.siteroot + '?i=' + sit.uniacid + '&c=entry&do=notice&from=wxapp&a=baiduapp&m=wisebear_pcbaiduapp',
      success: res => {
        // console.log(res)
        that.setData({
          noticeUrls: res.data.data
        });
      }
    });
  },
   getKey() {
    let that = this;
    app.util.request({
      url: sit.siteroot + '?i=' + sit.uniacid + '&c=entry&do=web_title&from=wxapp&a=baiduapp&m=wisebear_pcbaiduapp',
      success: res => {
        console.log(res.data.data,"aaaaaaa")
        console.log(that.data.newContent)
        let title=res.data.data.webtitle,desc=res.data.data.description,keywords=res.data.data.keywords;
          swan.setPageInfo({
              title: title,
              keywords: keywords,
              description:desc,
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
  //点击切换
  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
        newContent: [],
        page: 1,
        isHaveData: true,
        isGetData: false
      });
      that.getNewPage(true);
    }
  },
  onReachBottom: function () {
    //  新闻资讯
    this.getNewPage(true);
  },
  //标题背景
  getTitleBg() {
    let that = this;
    app.util.request({
      url: sit.siteroot + '?i=' + sit.uniacid + '&c=entry&do=background&from=wxapp&a=baiduapp&m=wisebear_pcbaiduapp',
      success: res => {
        app.globalData.navigationColor = res.data.data;
        app.setBackColor();
        app.setFontColor(that);
      }
    });
  },
  //公共底部
  getcommon() {
    let that = this;
    app.util.request({
      url: sit.siteroot + '?i=' + sit.uniacid + '&c=entry&do=copyright&from=wxapp&a=baiduapp&m=wisebear_pcbaiduapp',
      success: res => {
        app.globalData.footer = res.data.data;
        app.setFooter(that);
      }
    });
  },
  // 新闻内容
  getNewPage(isTrue = false) {
    let that = this;
    if (!that.data.isHaveData) {
      return;
    }
    if (that.data.isGetData) {
      return;
    }
    that.setData({
      isGetData: true
    });
    let page = that.data.page;
    if (isTrue) {
      that.data.page++;
    }
    app.util.request({
      url: sit.siteroot + '?i=' + sit.uniacid + '&c=entry&do=home_news&from=wxapp&a=baiduapp&m=wisebear_pcbaiduapp&page=' + page + '&pzize=' + that.data.pzize + '&id=' + that.data.currentTab,
      success: res => {
        console.log(res)
        that.setData({
          isGetData: false
        });
        if (res.data.data.length == that.data.pzize) {
          that.setData({
            newContent: that.data.newContent.concat(res.data.data)
          });
        } else {
          that.setData({
            newContent: that.data.newContent.concat(res.data.data)
          });
          that.setData({
            isHaveData: false
          });
        }
      }
    });
  },
  onShareAppMessage() {},
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
  },
   onShow: function () {
    
  }
});