//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Login to let us serve you better.',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  //事件处理函数
  bindViewTap: function() {
    wx.reLaunch({
      url: '../home/home'
    });
  },

  onLoad: function () {
    if (app.globalData.userInfo && app.globalData.userInfo.openId) {
      console.log('Already has openId.')
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
        motto: 'Welcome to PastPapers!'
      })
      setTimeout(function() {
        wx.reLaunch({
          url: '../home/home'
        });
      }, 3000)
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.login(res.userInfo)
        setTimeout(function () {
          wx.reLaunch({
            url: '../home/home'
          });
        }, 3000)
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          this.login(res.userInfo)
          setTimeout(function () {
            wx.reLaunch({
              url: '../home/home'
            });
          }, 3000)
        }
      })
    }
  },

  getUserInfo: function(e) {
    console.log(e)
    if (e.detail.userInfo) {
      this.login(e.detail.userInfo)
      wx.reLaunch({
        url: '../home/home'
      });
    }
  },

  login: function(userInfo) {
    // 登录
    var that = this
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: app.globalData.authUrl,
          data: {
            code: res.code,
            name: userInfo.nickName
          },
          method: 'GET',
          success: function (res) {
            console.log(res.data)
            userInfo['openId'] = '123456'//res.data.openId
            app.globalData.userInfo = userInfo
            that.setData({
              userInfo: userInfo,
              hasUserInfo: true,
              motto: 'Welcome to PastPapers!'
            })
          }
        })
      }
    })
  }
})
