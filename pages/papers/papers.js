// pages/papers/papers.js
const date = new Date();
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    currentCategory: 2,
    projects: [],
    currentProject: -1,
    years: [],
    year: date.getFullYear(),
    seasons: [],
    season: "Summer",
    value: [9999, 1]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var cid = options.categoryId
    var pid = options.projectId
    //this.setData({
      // currentCategory: options.categoryId,
      // currentProject: options.projectId
    //})
    this.getYearsAndSeasons();
    this.getPaperList();
  },

  getYearsAndSeasons() {
    var cid = this.data.currentCategory
    var pid = this.data.currentProject
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
    var cid = this.data.currentCategory
    var pid = this.data.currentProject
    var year = this.data.year
    var season = this.data.season
    console.log(cid + pid + year + season)
    // get paper with
  },

  bindChange: function (e) {
    const val = e.detail.value;
    this.setData({
      year: this.data.years[val[0]],
      season: this.data.seasons[val[1]]
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