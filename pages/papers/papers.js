// pages/papers/papers.js
const date = new Date();

//获取应用实例
const app = getApp()

const util = require('../../utils/util.js')

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
    value: [],
    papers: [],
    hasInsert: false,
    projectIconPath: '../../images/projects/',
    otherIconPath: '../../images/'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var cid = options.categoryId
    var pid = options.projectId
    var category = app.globalData.categories[cid]
    var project = app.globalData.allProjects[pid]
    var hasInsert = (category.name == 'AS' || category.name == 'Alevel') && project.name == 'Geography'
    this.setData({
      currentCategory: category,
      currentProject: project,
      hasInsert: hasInsert
    })
    wx.setNavigationBarTitle({
      title: this.data.currentCategory.name
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
        checked: false
      })
    }
    this.setData({
      papers: papers
    }) 
  },

  bindChange: function (e) {
    const val = e.detail.value
    var year = this.data.years[val[0]]
    var season = this.data.seasons[val[1]]
    // 根据年份和季节获取试卷列表
    var paper_list = []
    for (var i = 0; i < 50; i++) {
      paper_list.push({
        id: 1,
        name: 1232424,
        opened: false,
        checked: false,
        liked: true
      })
    }
    this.setData({
      year: year,
      season: season,
      papers: paper_list
    })
    console.log(year + season)
  },
  
  onOpenPaper: util.throttle(function(event) {
    wx.showToast({
      title: 'Downloading',
      icon: 'loading'
    })
    var id = event.target.dataset.id
    var type = event.target.dataset.type
    
    console.log(id + type)

    var url = "https://cs.nju.edu.cn/zhouzh/zhouzh.files/publication/tec17ksub.pdf"
    
    if(type == 'Insert') {
      url = "https://cs.nju.cn/zhouzh/zhouzh.files/publication/tec17ksub.pdf"
    }
    wx.downloadFile({
      url: url,
      success: function (res) {
        var now = new Date();
        var exitTime = now.getTime() + 5000;
        while (true) {
          now = new Date();
          if (now.getTime() < exitTime) {

          } else {
            break;
          }
        } 
        wx.hideToast()
        var filePath = res.tempFilePath
        wx.openDocument({
          filePath: filePath,
          success: function (res) {
            console.log('打开文档成功')
          }
        })
      },
      fail: function (res) {
        wx.showToast({
          title: 'Failed',
          icon: 'loading',
          duration: 1000
        })
      }
    })
  }, 2000),

  onLikePaper: function (e) {

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