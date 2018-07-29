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
    seasonMap: {},
    years: [],
    seasons: [],
    year: date.getFullYear(),
    season: "Summer",
    seasonId: 0,
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
    var cid = options.cid
    var pid = options.pid
    var pname = options.pname
    var category = app.globalData.categories[cid]
    var project = {'id':pid, 'name':pname}
    this.setData({
      currentCategory: category,
      currentProject: project
    })
    wx.setNavigationBarTitle({
      title: this.data.currentCategory.name
    })
    this.initialize()
  },

  initialize: function () {
    var that = this
    var cname = this.data.currentCategory.name
    var pid = this.data.currentProject.id
    // get seasons with cname and pid
    wx.request({
      url: app.globalData.seasonUrl,
      data: {
        title: cname,
        subject: pid,
        token: 'alevel66'
      },
      method: 'GET',
      success: function (res) {
        var ret = res.data.season
        var seasonMap = {}
        var years = []
        var seasons = []
        for(var i=0;i<ret.length;i++) {
          var seasonYear = ret[i].year
          var seasonName = ret[i].season
          var seasonId = ret[i].id
          if (!seasonMap[seasonYear]) {
            seasonMap[seasonYear] = {}
          }
          seasonMap[seasonYear][seasonName] = seasonId
          
          if(years.indexOf(seasonYear) === -1) {
            years.push(seasonYear)
          }
          if (seasons.indexOf(seasonName) === -1) {
            seasons.push(seasonName)
          }
        }

        years.sort(function(a, b) {
          return b - a
        })
        var year = years[0]

        seasons.sort()
        var season = seasons[0]

        var seasonId = seasonMap[year][season]
        
        that.setData({
          seasonMap: seasonMap,
          years: years,
          seasons: seasons,
          year: year,
          season: season,
          seasonId: seasonId
        })
        that.getPaperList()
      }
    })
  },

  getPaperList: function() {
    // get paper with cid, pid, year, season
    var that = this
    wx.request({
      url: app.globalData.paperUrl,
      data: {
        season: this.data.seasonId,
        token: 'alevel66'
      },
      method: 'GET',
      success: function (res) {
        var papers = res.data.paper
        console.log(papers)
        var hasInsert = false
        for(var index in papers) {
          if(papers[index].hasInsert) {
            hasInsert = true
            break
          }
        }
        that.setData({
          papers: res.data.paper,
          hasInsert: hasInsert
        })
      }
    })
  },

  bindChange: function (e) {
    const val = e.detail.value
    var year = this.data.years[val[0]]
    var season = this.data.seasons[val[1]]
    var seasonId = this.data.seasonMap[year][season]
    this.setData({
      year: year,
      season: season,
      seasonId: seasonId
    })
    this.getPaperList()
  },
  
  onOpenPaper: util.throttle(function(event) {
    wx.showToast({
      title: 'Downloading',
      icon: 'loading',
      duration: 10000
    })
    var id = event.target.dataset.id
    var type = event.target.dataset.type

    wx.downloadFile({
      url: app.globalData.downloadUrl + type,
      data: {
        id: id,
        token: 'alevel66'
      },
      success: function (res) {
        console.log(res)
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