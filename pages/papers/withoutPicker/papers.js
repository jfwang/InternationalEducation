// pages/papers/papers.js
const date = new Date();

//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentCategory: {},
    currentProject: {},
    papers: [],
    projectIconPath: '../../../images/projects/',
    otherIconPath: '../../../images/'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var cid = options.categoryId
    var pid = options.projectId
    this.setData({
      currentCategory: app.globalData.categories[cid],
      currentProject: app.globalData.allProjects[pid]
    })
    wx.setNavigationBarTitle({
      title: this.data.currentCategory.name
    })
    this.getPaperList()
  },

  getPaperList: function() {
    var cid = this.data.currentCategory.id
    var pid = this.data.currentProject.id
    // get paper with cid, pid
    var papers = []
    for(var i = 0; i < 50; i ++) {
      papers.push({
        id: i,
        name: 11,
        opened: false,
        checked: false
      })
    }
    this.setData({
      papers: papers
    }) 
  },

  onOpenQP: function(event) {
    var paperId = event.target.dataset.paperId
    console.log(paperId) 

    var url = "https://cs.nju.edu.cn/zhouzh/zhouzh.files/publication/tec17ksub.pdf"
    wx.downloadFile({
      url: url,
      success: function (res) {
        var filePath = res.tempFilePath
        wx.openDocument({
          filePath: filePath,
          success: function (res) {
            console.log('打开文档成功')
          }
        })
      }
    })
  },

  onOpenMS: function(event) {
    var paperId = event.target.dataset.paperId
    console.log(paperId)

    var url = "https://cs.nju.edu.cn/zhouzh/zhouzh.files/publication/tec17ksub.pdf"
    wx.downloadFile({
      url: url,
      success: function (res) {
        var filePath = res.tempFilePath
        wx.openDocument({
          filePath: filePath,
          success: function (res) {
            console.log('打开文档成功')
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