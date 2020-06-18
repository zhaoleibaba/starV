var util = {};

util.request = function (option) {
  var app = getApp();
  var token = wx.getStorageSync('token') ? wx.getStorageSync('token') : ''
	var BASE_URL = app.siteInfo.siteroot;
  var option = option ? option : {};
  option.cachetime = option.cachetime ? option.cachetime : 0;
	option.showLoading = typeof option.showLoading != 'undefined' ? option.showLoading : true;
	
	var url = option.url;
  
  wx.showNavigationBarLoading();
  if (option.showLoading) {
    util.showLoading();
  }
  wx.request({
    'url': BASE_URL+url,
    'data': option.data ? option.data : {},
    'header': option.header ? option.header : {},
    'method': option.method ? option.method : 'GET',
    'header': {
      'xhc-Token': token ? token : '',
      'content-type': 'application/x-www-form-urlencoded'
    },
    'success': function (response) {
      wx.hideNavigationBarLoading();
      wx.hideLoading();
			if (response.data.code == 0) {
				if (option.success && typeof option.success == 'function') {
          option.success(response.data.data);
          //写入缓存，减少HTTP请求，并且如果网络异常可以读取缓存数据
          if (option.cachetime) {
            var cachedata = { 'data': response.data, 'expire': timestamp + option.cachetime * 1000 };
            wx.setStorageSync(cachekey, cachedata);
          }
				}
			}else if(response.data.code == 40000){
        option.fail(response.data);
        getApp().toRedirect()
        // if (option.fail && typeof option.fail == 'function') {
        //   console.log(response.data)
        //   option.fail(response);
        // }
			}else{
        if (option.fail && typeof option.fail == 'function') {
          option.fail(response);
        }
      }
      // if (response.data.errno) {
      //   if (response.data.errno == '41009') {
      //     wx.setStorageSync('userInfo', '');
      //     util.getUserInfo(function () {
      //       util.request(option)
      //     });
      //     return;
      //   } else {
      //     if (option.fail && typeof option.fail == 'function') {
      //       option.fail(response);
      //     } else {
      //       if (response.data.message) {
      //         if (response.data.data != null && response.data.data.redirect) {
      //           var redirect = response.data.data.redirect;
      //         } else {
      //           var redirect = '';
      //         }
      //         app.util.message(response.data.message, redirect, 'error');
      //       }
      //     }
      //     return;
      //   }
      // } else {
      //   if (option.success && typeof option.success == 'function') {
      //     option.success(response);
      //   }
      //   //写入缓存，减少HTTP请求，并且如果网络异常可以读取缓存数据
      //   if (option.cachetime) {
      //     var cachedata = { 'data': response.data, 'expire': timestamp + option.cachetime * 1000 };
      //     wx.setStorageSync(cachekey, cachedata);
      //   }
      // }
    },
    'fail': function (response) {
      option.fail(response);
      wx.hideNavigationBarLoading();
      wx.hideLoading();
    },
    'complete': function (response) {
      // wx.hideNavigationBarLoading();
      // wx.hideLoading();
      if (option.complete && typeof option.complete == 'function') {
        option.complete(response);
      }
    }
  });
}
//封装微信等待提示，防止ajax过多时，show多次
util.showLoading = function () {
  var isShowLoading = wx.getStorageSync('isShowLoading');
  if (isShowLoading) {
    wx.hideLoading();
    wx.setStorageSync('isShowLoading', false);
  }

  wx.showLoading({
    title: '加载中',
    complete: function () {
      wx.setStorageSync('isShowLoading', true);
    },
    fail: function () {
      wx.setStorageSync('isShowLoading', false);
    }
  });
}
util.date = {
  getTimestamp: function (timestamp) {
    if (timestamp) {
      var date = new Date(timestamp); //时间戳为10位需*1000(为秒)，时间戳为13位的话不需乘1000(毫秒)
      var Y = date.getFullYear();
      var M =
        date.getMonth() + 1 < 10 ?
        "0" + (date.getMonth() + 1) :
        date.getMonth() + 1;
      var D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      var m =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      var s = date.getSeconds();
      return Y + "-" + M + "-" + D;
    }
  }
};
/*
** 判断数组是否连续
*/
util.isContinuationInteger = function(array){
  if(!array){
      return false;
  }
  if(array.length==0){
      return true;
  }
  var len=array.length;
  var n0=array[0];
  var sortDirection=1;
  if(array[0]>array[len-1]){
      sortDirection=-1;
  }
  if((n0*1+(len-1)*sortDirection)!==array[len-1]){
      return false;
  }
  var isContinuation=true;
  for(var i=0;i<len;i++){
      if(array[i]!==(i+n0*sortDirection)){
          isContinuation=false;
          break;
      }
  }
  return isContinuation;
}


module.exports = util;