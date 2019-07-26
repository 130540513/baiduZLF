//app.js
App({
  siteInfo: require('siteinfo.js'),
    adv: require('advinfo.js'),
  util: require('we7/resource/js/util.js'),
  onLaunch: function () {
    let that = this;
    swan.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          swan.getUserInfo({
            success: res => {
              let user = res.userInfo;
              swan.login({
                success(res) {
                  let code = res.code;
                  // console.log(code+"code值")
                  that.util.request({
                    url: that.siteInfo.siteroot + '?i=' + that.siteInfo.uniacid + '&c=entry&do=openid&a=baiduapp&m=wisebear_pcbaiduapp',
                    data: {
                      code: code,
                      nickName: user.nickName,
                      avatarUrl: user.avatarUrl
                    },
                    method: "post",
                    success(res) {
                      if (res.data.errno == 0) {
                        that.globalData.userInfo['uid'] = res.data.data;
                        that.globalData.userInfo['nickName'] = user.nickName;
                        that.globalData.userInfo['avatarUrl'] = user.avatarUrl;
                      }
                    }
                  });
                }
              });
            }
          });
        }
      }
    });
  },
  globalData: {
    userInfo: {},
    navigationColor: null,
    footer: null
  },
  getadvappid:function(id,adc,status = 1){
      var that = this 
      swan.request({
          url:that.siteInfo.siteroot + '?i=' + that.siteInfo.uniacid + '&c=entry&do=adv_config&a=baiduapp&m=wisebear_pcbaiduapp',
          data:{
              id:id
          },
          success(res){
              console.log(res.data.data.apid,12312312321)
              if(status == 1){
                  adc.setData({
                apid:res.data.data.apid,
                appid:res.data.data.appid
              })
              }else{
                  adc.setData({
                apids:res.data.data.apid,
                appids:res.data.data.appid
              })
              }
              
          }
      })
  },
  setBackColor() {
    swan.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: this.globalData.navigationColor ? this.globalData.navigationColor : '#338bf9'
    });
  },
  setFooter(that) {
    that.setData({
      footer: this.globalData.footer
    });
  },
  setFontColor(that) {
    that.setData({
      fontColor: this.globalData.navigationColor ? this.globalData.navigationColor : '#338bf9'
    });
  }
});