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
        name: "Physics",
        iconUrl: "../../images/projects/physics.png"
      },
      {
        id: 1,
        name: "Chemistry",
        iconUrl: "../../images/projects/chemistry.png"
      },
      {
        id: 2,
        name: "Biology",
        iconUrl: "../../images/projects/biology.png"
      },
      {
        id: 3,
        name: "Economics",
        iconUrl: "../../images/projects/economics.png"
      },
      {
        id: 4,
        name: "PureMath1",
        iconUrl: "../../images/projects/maths-1.png"
      },
      {
        id: 5,
        name: "Computer Science",
        iconUrl: "../../images/projects/computer-science.png"
      },
      {
        id: 6,
        name: "Geography",
        iconUrl: "../../images/projects/geography.png"
      },
      {
        id: 7,
        name: "PureMath2",
        iconUrl: "../../images/projects/maths-2.png"
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
        name: "AP"
      }],
    allProjects: []
  }
})