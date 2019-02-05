// page/createOrder/createOrder.js
var app= getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    gender: ['男', '女'],
    patientName_flag: false,
    inpatientId_flag: false,
    patientName: '',
    inpatientId: '',
    bedId: '',
    CTId: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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

  },

  /**
   * 
   */
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },

  formSubmit: function (e) {
    //复位提醒
    this.setData({
      patientName_flag: false,
      inpatientId_flag: false,
    })

    //提交标志
    var doSubmit = true;

    //表单提交数据
    var values = e.detail.value;

    if (values.patientName == "") {
      doSubmit = false;
      this.setData({
        patientName_flag: true,
      })
    }

    if (values.inpatientId == "") {
      doSubmit = false;
      this.setData({
        inpatientId_flag: true,
      })
    }

    var that = this;
    if (doSubmit) {
      const requestTask = wx.request({
        url: app.globalData.ip +'/createOrder',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          patientName: values.patientName,
          inpatientId: values.inpatientId,
          bedId: values.bedId,
          CTId: values.CTId,
          gender: that.data.gender[that.data.index],
          uuid: app.globalData.uuid,
        },
        success: function (res) {
          if (res.data == "over due") {
            wx.redirectTo({
              url: '../login/login',
            })
          } else {
            wx.showToast({
              title: '已完成',
              icon: 'success',
              duration: 3000
            });
            
            that.setData({
              patientName: '',
              inpatientId: '',
              bedId: '',
              CTId: '',
            })
          }

        }
      })
    }

  },
})