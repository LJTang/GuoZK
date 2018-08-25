import GCMAPI from '/script/gzk_MsgApi/gcm_api.js';
import GZK_Coder from '/script/gzk_MsgApi/gzk_script_coder.js';

import {Region} from './components/gzk_dialog_city/city'
App({
    data:{
        ifRefresh:false,
        gzk_PhoneNumber:'4009982860',
        // imgURL:"http://192.168.80.138:8084/GZK-SA-Service/SA-DL-Dir/images",// 图片路径
        imgURL:"https://bca.guozk.com/SA-DL-Dir/images",
        // imgURL:"https://wsa.guozk.com/SA-DL-Dir/images",
        carORGoods_Bool:false,
        payDesGoods:'',
        intUsePayReason:100,//支付编号
        serial_Number:0,
        intsPolicyRepairStatus:0,//保险购买状态
        strInsurance_Company:'中国人寿财产保险股份有限公司',
        strInsurance_Products:'果蔬冷藏险',
        insuType:3,
        ins_pages:'',   //保险页面名
        strOrderNo:'',   //保单系统
        floatMoneyPay:0,   //费用
        copy_Bool:false,   //复制保单
        floatRate:0,   //复制保单
        doublePriceDiscount:0,
        driverName:'',
        driverPhone:'',
        floatRSPremium:0,
        floattTransporMonery:'',
        premium:0,
        cityText:'',
        cityTextID:0,
        holderLinkName:'',
        insuEndTime:0,
        insuPrice:0,
        insurantCertNo:'',
        insurantName:'',
        insurantPhone:'',
        insurantType:0,
        insurantTypeDes:'',
        insuStartTime:0,
        intContractStatus:0,
        intContractType:0,
        intPolicyStatus:'',
        itemName:'',
        itemType:'',
        itemTypeCode:0,
        itemValue:0,
        packType:'',//包装类型
        packTypeCode:0,
        strCarPlateNumber:'',
        strHolderLinkTel:'',
        strOrderNo:'',
        strPolicyNo:'',
        strUserSysID:'',
        cityText2:'',
        cityText2ID:0,
        strHangingPlate:'', //挂车牌号
        transitAddress:'', //
        weight:0,
        strLoaderTel:'',
        quantity:0
    },
    Region,
    onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || [];
    var self = this;
    logs.unshift(Date.now());
    wx.setStorageSync('logs',logs);
      wx.showLoading({
          title: '加载中...'
      });
      wx.login({
          success: function (res) {
              if(res.code){
                  var strMsgSend = GCMAPI.doCreate_gcmMsg_102_GetConnect(res.code);
                  GZK_Coder.doSendMsgWXSMA(strMsgSend, self.onMsgCallBack_102);
              }else{
                  wx.showToast({
                      title: '登录失败！',
                      icon: 'none',
                      duration: 3000
                  });
              }
          }
      })
  },
    onMsgCallBack_102:function(jsonBack){
        wx.hideLoading();
        var that=this;
        if(jsonBack.intStatus==1){
            wx.setStorage({
                key: 'strWXOpenID',
                data: jsonBack.strWXOpenID
            });
        }else{
            wx.showToast({
                title: '获取用户登录状态失败！',
                icon: 'none',
                duration: 2000
            });
        }
    },
      getUserInfo:function(cb){
        var that = this;
        if(this.globalData.userInfo){
          typeof cb == "function" && cb(this.globalData.userInfo)
        }else{
          //调用登录接口
          wx.login({
            success: function (res) {
                var strMsgSend = GCMAPI.doCreate_gcmMsg_1060_GetConnect(res.code);
                GZK_Coder.doSendMsgWXSMA(strMsgSend, this.onMsgCallBack);
              wx.getUserInfo({
                success: function (res) {
                  that.globalData.userInfo = res.userInfo;
                  typeof cb == "function" && cb(that.globalData.userInfo);

                }
              })
            }
          })
        }
      },
      globalData:{
        userInfo:null
      },
    onMsgCallBack:function(jsonBack){}
});
