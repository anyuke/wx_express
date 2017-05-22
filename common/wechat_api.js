/*
 *微信相关操作api
 */
var wechatApi = {};
var config = require('./config');
var appID = config.weixin.appId;
var appSecret = config.weixin.appSecret;
var utils = require('./utils');
var api = {
    accessToken : `${config.weixin.prefix}token?grant_type=client_credential`,
    upload : `${config.weixin.prefix}media/upload?`,
    createMenu: `${config.weixin.prefix}menu/create?access_token=`
}

//获取access_token
wechatApi.updateAccessToken = function(){
    var url = `${api.accessToken}&appid=${appID}&secret=${appSecret}`;
    var option = {
        url : url,
        json : true
    };
    return utils.request(option).then(function(data){

        return Promise.resolve(data);
    })
}

wechatApi.createMenu = function(menu, access_token){
  return new Promise(function(resolve,reject){
      var url = `${api.createMenu}${access_token}`;
      utils.request({url:url,method:'POST',body:menu,json:true}).then(function(body){
        if(body.errcode === 0){
            resolve(body.errmsg);
        }else{
            reject(body.errmsg);
        }
      });
  });
}

module.exports = wechatApi;