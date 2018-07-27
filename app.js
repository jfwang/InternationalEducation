//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // wx.request({
        //   url: 'https://api.weixin.qq.com/sns/jscode2session',
        //   data: {
        //     js_code: res.code,
        //   },
        //   method: 'GET',
        //   success: function(res) {
        //     console.log(res.data.openid)
        //   }
        // })
        console.log(res.code)
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

    // 获取所有课程
    var all_project_list = [
      {
        id: 0,
        name: "Physics"
      },
      {
        id: 1,
        name: "Chemistry"
      },
      {
        id: 2,
        name: "Comparative Government"
      },
      {
        id: 3,
        name: "Chinese-Second Language"
      },
      {
        id: 4,
        name: "Geography"
      },
      {
        id: 5,
        name: "Computer Science"
      },
      {
        id: 6,
        name: "Mathematics-Additional"
      },
      {
        id: 7,
        name: "English-Second Language"
      }
    ]
    this.globalData.allProjects = all_project_list
  },

  globalData: {
    userInfo: null,
    categories: [
      {
        id: 0,
        name: "IGCSE"
      },
      {
        id: 1,
        name: "AS"
      },
      {
        id: 2,
        name: "Alevel"
      },
      {
        id: 3,
        name: "Edexcel"
      }],
    allProjects: []
  }
})