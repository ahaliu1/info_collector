// page/login/login.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_not_exist_flag: false,
    wrong_password_flag: false,
    phone_num_flag: false,
    password_flag: false,
    isAdmin:false,
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  formSubmit: function(e) {
    var doSubmit = true;

    //提醒归位
    this.setData({
      user_not_exist_flag: false,
      wrong_password_flag: false,
      phone_num_flag: false,
      password_flag: false,
    })

    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!myreg.test(e.detail.value.phoneNum)) {
      doSubmit = false;
      this.setData({
        phone_num_flag: true,
      })
    }

    if (e.detail.value.password == "") {
      doSubmit = false;
      this.setData({
        password_flag: true,
      })
    }

    var that=this;
    //发送请求

    if (doSubmit) {
      const requestTask = wx.request({
        url: app.globalData.ip+'/login',
        method: 'POST',
        //https://mp.weixin.qq.com/debug/wxadoc/dev/api/network-request.html#wxrequestobject data数据说明
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          phoneNum: e.detail.value.phoneNum,
          password: e.detail.value.password,
          isAdmin: false,
          
        },
        success: function(res) {
          if (res.data == "user not exist") {
            that.setData({
              user_not_exist_flag: true,
            })
          } else if (res.data == "wrong password") {
            that.setData({
              wrong_password_flag: true,
            })
          }else{
            app.globalData.uuid = res.data;
            wx.switchTab({
              url: '../createOrder/createOrder'
            })
          }
        }
      })
    }
  },


  sign_up: function(e) {
    wx.navigateTo({
      url: "../register/register"
    })
  }
})