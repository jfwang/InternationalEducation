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
    years: [],
    year: date.getFullYear(),
    seasons: [],
    season: "Summer",
    value: [9999, 1],
    papers: []
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
    this.getYearsAndSeasons()
    this.getPaperList()
  },

  getYearsAndSeasons: function () {
    var cid = this.data.currentCategory.id
    var pid = this.data.currentProject.id
    // get years and seasons with cid and pid
    var year_list = [2017, 2016, 2015, 2014]
    var season_list = ["Summer", "Winter"]
    this.setData({
      years: year_list,
      seasons: season_list,
      year: year_list[0],
      season: season_list[0]
    })
  },

  getPaperList: function() {
    var cid = this.data.currentCategory.id
    var pid = this.data.currentProject.id
    var year = this.data.year
    var season = this.data.season
    // get paper with cid, pid, year, season
    var papers = []
    for(var i = 0; i < 50; i ++) {
      papers.push({
        id: i,
        name: 11,
        opened: false,
        checked: false,
        qpPath: "../../papers/qp11.pdf",
        msPath: "../../papers/ms11.pdf"
      })
    }
    this.setData({
      papers: papers
    }) 
  },

  bindChange: function (e) {
    const val = e.detail.value
    var year = this.data.years[val[2]]
    var season = this.data.seasons[val[3]]
    // 根据年份和季节获取试卷列表
    var paper_list = []
    for (var i = 0; i < 50; i++) {
      paper_list.push({
        id: 1,
        name: 12,
        qpPath: "../../papers/qp12.pdf",
        msPath: "../../papers/ms12.pdf"
      })
    }
    this.setData({
      year: year,
      season: season,
      papers: paper_list
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