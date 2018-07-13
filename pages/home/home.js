// pages/home/home.js
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
    currentProject: -1
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
    if (this.data.currentCategory !== cid) {
      this.setData({ 
        currentCategory: cid,
        currentProject: -1
      })
      this.getProjectList()
    }
  },
  
  /**
   * 
   */
  getProjectList: function () {
    var cid = this.data.currentCategory
    // get project list with cid
    console.log("Try to get project list of " + this.data.categories[cid].name)
    var project_list = [
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
        name: "Biology",
        iconUrl: "../../images/projects/biology.png"
      },
      {
        id: 6,
        name: "Computer Science",
        iconUrl: "../../images/projects/computer-science.png"
      },
      {
        id: 7,
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
    if(this.data.currentProject === pid) {
      this.setData({
        currentProject: -1 
      })
    } else {
      this.setData({
        currentProject: pid
      })
      wx.navigateTo({
        url: '../papers/papers?categoryId=' + this.data.currentCategory + '&projectId=' + pid
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