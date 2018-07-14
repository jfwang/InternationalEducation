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
    // get project list with cid
    console.log("Initializing project list of " + this.data.currentCategory.name)
    
    var project_list = this.data.projects
    project_list[cid] = [
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
        name: "Maths",
        iconUrl: "../../images/projects/maths.png"
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
      }
    ]
    this.setData({
      projects: project_list
    })
  },

  /**
   * 选中课程
   */
  onSelectProject: function(event) {
    var pid = event.currentTarget.dataset.projectId
    var project = app.globalData.allProjects[pid]
    if(this.data.currentProject.id === pid) {
      this.setData({
        currentProject: {}
      })
    } else {
      this.setData({
        currentProject: project
      })
      wx.navigateTo({
        url: '../papers/papers?categoryId=' + this.data.currentCategory.id + '&projectId=' + pid
      })
    }
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
    var cid = this.data.currentCategory.id
    var pid = this.data.currentProject.id
    var project = app.globalData.allProjects[pid]
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
      projects: newProjects
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