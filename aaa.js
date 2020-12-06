  onShow: function () {
    var _ = this;
    _.ReqData();
  },
    ReqData(){
      wx.showLoading({
        title:'...',
      })
      var that = this;
      console.log(that.data)
      var len = that.data.wayBill.length;
      console.log(len)
      console.log(1)
      that.QueryWayLists(len).then(res => {
        console.log(1)
        console.log(res)
        if(res.data != 'reauest fail'){
          that.setData({
            wayBill: that.data.wayBill
          })
        }
        console.log(that.data.wayBill);
        wx.stopPullDownRefresh();
        wx.hideLoading();
      })
    
  },
  QueryWayLists:function(skipstep){
    var that = this;
    if(usecloud){
      return new Promise(function(resolve,reject){
        // .skip(skipstep)作用加在数组过程接载数组长度
        db.collection('way_list').skip(skipstep).where({scheduling:"等待接单"}).orderBy('create_time','desc').get({
          success(res){
            console.log(res.data)
            that.setData({
              wayBill: that.data. wayBill.concat(res.data)
            })
            console.log(that.wayBill)
            console.log(res)
            resolve(res)
          },fail(res){
            reject('request fail')
          }
        })
      })
    }
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
    var _ = this;
    _.setData({
      wayBill: []
    },() => {
      _.ReqData();
    })
    console.log(_data.wayBill)
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('触底函数')
    var _ =this;
    _.ReqData()
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  }
})
