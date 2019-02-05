// page/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name_flag: false,
    department_flag: false,
    password_flag: false,
    not_same_flag: false,
    repetitive_registration_flag: false,
    phone_num_flag: false,
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
    this.setData({
      name_flag: false,
      department_flag: false,
      password_flag: false,
      not_same_flag: false,
      repetitive_registration_flag: false,
      phone_num_flag: false,
    })

    var values = e.detail.value;

    var doSubmit = true;

    //姓名不为空
    if (values.userName == "") {
      doSubmit = false;
      this.setData({
        name_flag: true,
      })
    }

    //科室不为空
    if (values.department == "") {
      doSubmit = false;
      this.setData({
        department_flag: true,
      })
    }

    //手机号验证
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if(!myreg.test(values.phoneNum)){
      doSubmit = false;
      this.setData({
        phone_num_flag: true,
      })
    }

    //密码不为空
    if (values.password1 == "") {
      doSubmit = false;
      this.setData({
        password_flag: true,
      })
    }

    //两次输入密码相同验证
    if (values.password1 != values.password2) {
      doSubmit = false;
      this.setData({
        not_same_flag: true,
      })
    }

    var that = this;
    //满足前置条件
    if (doSubmit == true) {
      //发送请求
      const requestTask = wx.request({
        url: 'http://193.112.77.221:8080/register',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          userName: values.userName,
          department: values.department,
          phoneNum:values.phoneNum,
          password: values.password1,
        },
        success: function(res) {
          if (res.data =="repetitive registration"){
            that.setData({
              repetitive_registration_flag: true,
            })
          }else{
            wx.navigateBack({
              url: "../login/login"
            })
          }
        }
      })
    }




  }

})