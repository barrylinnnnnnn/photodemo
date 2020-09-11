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
    msg:{
      _id:"",
      address:"",
      kinds:"",
      time:"",
      fullurl:"",
      url:"",
      direction:"",
      focallength:"",
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

  //全屏
  showimage(e){
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
  //搜索
  searchclick(e){

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
  markertap(e) {

   
    this.setData({
      showmodel:true
    })

    //获取数据
    wx.cloud.callFunction({
      name:"getinfo",
      success: res => {

        
        this.setData({
          msg:{
            _id:res.result.data[e.markerId]._id,
            address:res.result.data[e.markerId].address,
            kinds:res.result.data[e.markerId].kinds,
            time:res.result.data[e.markerId].time,
            fullurl:res.result.data[e.markerId].fullurl,
            url:res.result.data[e.markerId].url,
            direction:res.result.data[e.markerId].direction,
            focallength:res.result.data[e.markerId].focallength,
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

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name:"getinfo",

        
      success: res => {
        var that=this;
        var datalists = res.result.data;
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
          
          alldata.push(datas)
          
          
          that.setData({

          })
         
        
        }
        this.setData({
          markers:alldata
        })
        
        
      },
      fail: err => {
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