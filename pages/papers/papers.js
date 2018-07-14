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
    var cid = 2//options.categoryId
    var pid = 1//options.projectId
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
        id: 0,
        name: 11,
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
    this.setData({
      year: this.data.years[val[2]],
      season: this.data.seasons[val[3]]
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