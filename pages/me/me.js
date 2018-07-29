// pages/mine/mine.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    finishedCount: 20
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    if (app.globalData.userInfo && app.globalData.userInfo.openId) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
        motto: 'Welcome to PastPapers!'
      })
    } else if (!this.data.canIUse) {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          this.login(res.userInfo)
        }
      })
    }
  },

  getUserInfo: function (e) {
    console.log(e)
    if (e.detail.userInfo) {
      this.login(e.detail.userInfo)
    }
  },

  login: function (userInfo) {
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
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})