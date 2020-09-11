// pages/map/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude:"",
    longitude:"",
    markers:[],
    showmodel:false,
    // showmodel:true,
    msg:{
      _id:"",
      address:"",
      ambitus:"",
      recommend:"",
      fullurl:"",
      url:"",
      photographer:""
    }
    

  },

  
//隐藏
  hiddeninfo(){
    this.setData({
      showmodel:false
    })
  },
  //切换
  navigatormale(){
    wx.navigateTo({
      url:'../map/index'
    })
  },
  navigatorfemale(){
    wx.navigateTo({
      url:'../female/index'
    })
  },
  //搜索
  searchclick(e){
    // console.log("!!!!!!!!!!!");

      wx.chooseLocation({
        success:res=>{
          console.log(res);
          console.log(res.latitude);
          console.log(res.longitude);
          this.setData({
            latitude:res.latitude,
            longitude:res.longitude,
            // chooselocationname:res.name
          })
        }
      })
    
  },
  //重新定位
  returnlocation(){
    wx.getLocation({
      type:"wgs84",
      success:res=>{
        var latitude = res.latitude;
        var longitude = res.longitude;
        
        this.setData({
          latitude:res.latitude,
          longitude:res.longitude
        })
      }
    })
  },

  //全屏
  showimage(e){
    // console.log("______",e);
    // console.log("______",e.currentTarget.dataset.id);
    const pl =[]
    pl.push(e.currentTarget.dataset.title)
    wx.previewImage({
      current: pl[0], // 当前显示图片的http链接
      urls: pl // 需要预览的图片http链接列表
    })
  },

  
  showtips(){
    // console.log("this is tips");
    wx.navigateTo({
      url:'../tips/index'
    })
    
  },
  markertap(e) {
    // console.log(e);
    
    // console.log(e.markerId)
   
    this.setData({
      showmodel:true
    })

    //获取数据
    wx.cloud.callFunction({
      name:"getfemaleinfo",
      success: res => {
        // console.log(res);
        
        
        // console.log("获取成功",res.result.data[e.markerId].fullurl);
        
        this.setData({
          msg:{
            _id:res.result.data[e.markerId]._id,
            address:res.result.data[e.markerId].address,
            ambitus:res.result.data[e.markerId].ambitus,
            recommend:res.result.data[e.markerId].recommend,
            fullurl:res.result.data[e.markerId].fullurl,
            url:res.result.data[e.markerId].url,
            photographer:res.result.data[e.markerId].photographer
          }
          
        })
      },
      fail: err => {
        // handle error
      }
    })
    
    
  },

  
  controltap(e) {
    // console.log(e.detail.controlId)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name:"getfemaleinfo",

        
      success: res => {
        var that=this;
        // console.log(res);
        var datalists = res.result.data;
        // console.log(datalists);
        var alldata=[];
        for(var i=0;i<datalists.length;i++){
          var datas={
            iconPath: "./地址.png",
            id:datalists[i]._id,
            latitude:datalists[i].latitude,
            longitude:datalists[i].longitude,
            width: 20,
            height: 20
          }
          // console.log(datas);
          
          alldata.push(datas)
          // console.log(alldata);
          
          
          that.setData({

          })
         
        
        }
        this.setData({
          markers:alldata
        })
        
        
      },
      fail: err => {
        // handle error
      }
    })

    wx.getLocation({
      type:"wgs84",
      success:res=>{
        var latitude = res.latitude;
        var longitude = res.longitude;
        
        this.setData({
          latitude:res.latitude,
          longitude:res.longitude
        })
      }
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