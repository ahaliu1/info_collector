var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: null,
    count: null,
    isAdimin: false,
    idArray: null,
    isChecked: false,
    page: 1,
    totalPage: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //请求数据
    this.data.idArray = new Array();
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
    this.setData({
      page: 1,
    })
    this.getMyOrders();
    this.setData({
      isChecked: false,
    })
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

  },

  formSubmit: function (e) {
    var that = this;

    this.setData({
      flag: "false",
    })
    //删除数据
    const requestTask = wx.request({
      url: app.globalData.ip + '/deleteOrders',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        idArray: this.data.idArray,
        uuid: app.globalData.uuid,
      },
      success: function (res) {
        if (res.data == "over due") {
          wx.redirectT({
            url: '../login/login',
          })
        } else if (res.data == "success") {
          wx.showToast({
            title: '已删除',
            icon: 'success',
            duration: 1000
          });
          //清空删除数组
          that.data.idArray.splice(0, that.data.idArray.length);

          //重新获取数据
          that.getMyOrders();

          //归位
          that.setData({
            totalPage: null,
            page: 1,
            isChecked: false,
          })
        }

      }
    })
  },
  getMyOrders: function () {
    var that = this;

    const requestTask = wx.request({
      url: app.globalData.ip + '/getTodayOrders',
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        uuid: app.globalData.uuid,

      },
      success: function (res) {
        that.setData({
          orderList: res.data.list,
          totalPage: res.data.pages,
        })
      }
    })
  },
  checkboxChange: function (e) {
    var id = e.currentTarget.id;
    var isChecked = e.detail.value;
    if (isChecked) {
      this.data.idArray.push(id);
    } else {
      for (var i = 0; i < this.idArray.length; i++) {
        if (id == this.idArray[i]) {
          this.data.idArray.splice(i, 1);
        }
      }
    }
  },

  /**
   * 下拉触底加载下一页
   */
  nextPage: function () {
    console.log("触底");
    var that = this;
    if (that.data.page < that.data.totalPage) {
      const requestTask = wx.request({
        url: app.globalData.ip + '/getTodayOrders',
        method: 'GET',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          uuid: app.globalData.uuid,
          requestPageNum: that.data.page + 1
        },
        success: function (res) {

          var newList = that.data.orderList.concat(res.data.list);
          that.setData({
            page: that.data.page + 1,
            orderList: newList,
          })
        }
      })
    }
  },
})