// pages/home/home.js

//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    categories: app.globalData.categories,
    currentCategory: app.globalData.categories[2],
    projects: [],
    projectIconPath: '../../images/projects/',
    currentProject: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getProjectList()
  },

  /**
   * 切换类别
   */
  onChangeCategory: function (event) {
    var cid = event.target.dataset.id
    // 判断是否需要切换类别
    if (this.data.currentCategory.id !== cid) {
      this.setData({ 
        currentCategory: app.globalData.categories[cid],
        currentProject: {}
      })
      if (!this.data.projects[cid]) {
        this.getProjectList()
      }
    }
  },
  
  /**
   * 
   */
  getProjectList: function () {
    var cid = this.data.currentCategory.id
    var cname = this.data.currentCategory.name
    // get project list of current category
    console.log("Initializing project list of " + cname)
    
    var project_list = this.data.projects
    var that = this
    wx.request({
      url: 'http://118.25.47.218/subject/all',
      data: {
        title: cname,
        token: 'alevel66'
      },
      method: 'GET',
      success: function (res) {
        project_list[cid] = res.data.subject
        that.setData({
          projects: project_list
        })}
    })
  },

  /**
   * 选中课程
   */
  onSelectProject: function(event) {
    var category = this.data.currentCategory
    var project = event.currentTarget.dataset.project
    var cid = category.id
    var pid = project.id
    var newProjects = this.data.projects
    // 删除pid对应的课程
    for (var i = 0; i < newProjects[cid].length; i++) {
      if (newProjects[cid][i].id === pid) {
        newProjects[cid].splice(i, 1);
        break;
      }
    }
    // 加入头部
    newProjects[cid].unshift(project)

    this.setData({
      currentProject: project,
      projects: newProjects
    })
    var url = '../papers/papers?cid=' + this.data.currentCategory.id + '&pid=' + this.data.currentProject.id + '&pname=' + this.data.currentProject.name
    wx.navigateTo({
      url: url
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
    this.setData({
      currentProject: {}
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    // TODO: 永久化当前课程顺序  
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