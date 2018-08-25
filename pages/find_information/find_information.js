import DATE from '../../utils/util.js';
import GCMAPI from '../../script/gzk_MsgApi/gcm_api.js';
import GZK_Coder from '../../script/gzk_MsgApi/gzk_script_coder.js';
var app = getApp();
Page({
    data:{
        hide:true,
        oneself_Hide:false,
        other_Hide:false,
        repeat_Hide:false,
        goodsHide:false,
        otherToArea_Hide:false,
        timeDesc_Hide:false,
        goodsDesc_Hide:false,
        companyName_Hide:false,
        remark_Hide:false,
        similar_Hide:true,
        freight_Hide:false,
        find_strOtherToAreaDesc:'',
        find_strToAreaDesc:'',
        find_strTimeDesc:'',
        find_strGoodsDesc:'',
        find_strGoodsName:'',
        find_strCarDesc:'',
        find_strUserName:'',
        find_strContactPhone:'',
        find_strCompanyName:'',
        find_strRemark:'',
        find_FreightPrice:0,

        strOtherToAreaDesc:'',
        strFromAreaDesc:'',
        intFromAreaID:100000,
        intToAreaID:100000,
        intGoodsWeight:0,
        intGoodsCubic:0,
        strToAreaDesc:'',
        timeText:'',
        strTimeDesc:'',
        strGoodsDesc:'',
        strGoodsName:'',
        floatCarLength:'',
        intCarType:'',
        strCarDesc:'',
        strUserName:'',
        strContactPhone:'',
        strCompanyName:'',
        strRemark:'',
        strCallDesc:'',
        strReadDesc:'',
        strBtnText:'',
        list:[],
        carText:'',
        goodsORCar:'',
        userID:'',
        strInfoSysID:'',
        intCarORGoods:null,
        intHistory:null,
        intList:null,  //跳转页面
        strContactUserSysID:'',
        share:null,
        binding:null,
        page:1
    },
    onLoad:function (options){
        var pages = getCurrentPages();
        // console.log(pages);
        wx.setNavigationBarTitle({
            title:(options.type==1?'货源详情':'车源详情')
        });
        wx.showLoading({
            title: '加载中...'
        });
        this.setData({
            page:pages.length,
            userID:options.id,
            share:parseInt(options.share),
            strInfoSysID:options.sysID,
            intCarORGoods:options.type,
            intHistory:options.intHistory,
            intList:options.intList,
            hide:true,
            goodsHide:(options.type==1?true:false),
            strBtnText:(options.type==1?'联系货主':'联系车主'),
            goodsORCar:(options.type==1?'货源':'车源'),
            shelvesText:(options.type==1?'下架货源':'下架车源'),
            resendText:(options.type==1?'重发货源':'重发车源'),
            carText:(options.type==1?'所需车型':'车型'),
            repeat_Hide:(options.type==1?true:false)
        });
        var strMsgSend_124 = GCMAPI.doCreate_gcmMsg_124_GetConnect(0,options.sysID);
        GZK_Coder.doSendMsgWXSMA(strMsgSend_124,this.onMsgCallBack_124);
    },
    onShow: function() {
        var strMsgSend = GCMAPI.doCreate_gcmMsg_104_GetConnect(wx.getStorageSync('strWXOpenID'));
        GZK_Coder.doSendMsgWXSMA(strMsgSend,this.onMsgCallBack_105);
        if(this.data.intCarORGoods==1){
            var strMsgSend_Goods = GCMAPI.doCreate_gcmMsg_120_GetConnect(this.data.strInfoSysID,wx.getStorageSync('strWXOpenID'));
            GZK_Coder.doSendMsgWXSMA(strMsgSend_Goods,this.onMsgCallBack_120);
        }else{
            var strMsgSend_Car = GCMAPI.doCreate_gcmMsg_118_GetConnect(this.data.strInfoSysID,wx.getStorageSync('strWXOpenID'));
            GZK_Coder.doSendMsgWXSMA(strMsgSend_Car,this.onMsgCallBack_118);
        }
    },
    onMsgCallBack_105:function (jsonBack) {
        this.setData({
            binding:jsonBack.intStatus
        });
    },
    onShareInformation:function () {
        var that=this;
        wx.showModal({
            title: '温馨提示',
            content: '分享'+that.data.goodsORCar+'需要绑定果真快账号',
            cancelText:'取消',
            confirmText:'确定',
            success: function(res) {
                if (res.confirm) {
                    wx.navigateTo({
                        url: '/pages/gzk_login/gzk_login?id=' + wx.getStorageSync('strWXOpenID') + '&sysID=' + that.data.strInfoSysID + '&type=' + that.data.intCarORGoods + '&intHistory=' + that.data.intHistory + '&intList=' + that.data.intList + '&share='+that.data.share+'&page=find_information'
                    });
                } else if (res.cancel) {
                }
            }
        })
    },

    onShareAppMessage: function (rest) {
        var that = this;

        if (rest.from === 'button') {}
        return {
            title:DATE.formatTime(new Date().getTime(), 'Y年M月D日')+' '+ that.data.find_strUserName,
            path: '/pages/find_information/find_information?id=' + wx.getStorageSync('strWXOpenID') + '&sysID=' + that.data.strInfoSysID + '&type=' + that.data.intCarORGoods + '&intHistory=' + that.data.intHistory + '&intList=' + that.data.intList + '&share=1',
            success: function (rest) {
                // 转发成功
            },
            fail: function (rest) {
                // 转发失败
            }
        }
    },
    // 车源详情
    onMsgCallBack_118:function (jsonBack){
        var that=this;
        if(this.data.intHistory==1){
            this.setData({
                hide:false,
                oneself_Hide:(jsonBack.intOwnerStatus==1?true:false),
                other_Hide:(jsonBack.intOwnerStatus==0?true:false),
                repeat_Hide:false
            });
        }else{
            this.setData({
                hide:false,
                oneself_Hide:false,
                other_Hide:false,
                repeat_Hide:true
            })
        }
        var myList=[];
        for(var i=0;i<jsonBack.arrayInfotomCar.length;i++){
            myList.push(jsonBack.arrayInfotomCar[i]);
        }
        this.setData({
            hide:false,
            similar_Hide:(myList.length==0?true:false),
            strContactUserSysID:jsonBack.strContactUserSysID,
            list:myList,
            find_strCarDesc:(jsonBack.strCarDesc==""?'--':jsonBack.strCarDesc),
            find_strUserName:(jsonBack.strUserName==""?'--':jsonBack.strUserName),
            find_strContactPhone:(jsonBack.strContactPhone==""?'--':jsonBack.strContactPhone),
            find_strRemark:(jsonBack.strRemark==""?'--':jsonBack.strRemark),
            remark_Hide:(jsonBack.strRemark==""?true:false),
            strFromAreaDesc:jsonBack.strFromAreaDesc,
            strToAreaDesc:jsonBack.strToAreaDesc,
            intFromAreaID:jsonBack.intFromAreaID,
            intToAreaID:jsonBack.intToAreaID,
            floatCarLength:jsonBack.floatCarLength,
            intCarType:jsonBack.intCarType,
            strCarDesc:jsonBack.strCarDesc,
            strUserName:jsonBack.strUserName,
            strContactPhone:(that.data.binding==0?jsonBack.strContactPhone.substring(0,3)+"****"+jsonBack.strContactPhone.substring(8,11):jsonBack.strContactPhone),
            strRemark:jsonBack.strRemark,
            strCallDesc:jsonBack.strCallDesc,
            strReadDesc:jsonBack.strReadDesc,
            timeText:'发布日期',
            strTimeDesc:jsonBack.strDateCreate
        });
        setTimeout(function (){
            wx.hideLoading();
        },1000);

    },
    // 货源详情
    onMsgCallBack_120:function (jsonBack){
        if(this.data.intHistory==1){
            this.setData({
                hide:false,
                oneself_Hide:(jsonBack.intOwnerStatus==1?true:false),
                other_Hide:(jsonBack.intOwnerStatus==0?true:false),
                repeat_Hide:false
            })
        }else{
            this.setData({
                hide:false,
                oneself_Hide:false,
                other_Hide:false,
                repeat_Hide:true
            })
        }
        var myList=[];
        for(var i=0;i<jsonBack.arrayInfotomGoods.length;i++){
            myList.push(jsonBack.arrayInfotomGoods[i]);
        }
        this.setData({
            hide:false,
            similar_Hide:(myList.length==0?true:false),
            strContactUserSysID:jsonBack.strContactUserSysID,
            list:myList,
            find_strOtherToAreaDesc:(jsonBack.strOtherToAreaDesc==""?'--':jsonBack.strOtherToAreaDesc),
            find_strGoodsDesc:(jsonBack.strGoodsDesc==""?'--':jsonBack.strGoodsDesc),
            find_strCarDesc:(jsonBack.strCarDesc==''?'--':jsonBack.strCarDesc),
            find_strUserName:(jsonBack.strUserName==""?'--':jsonBack.strUserName),
            find_strContactPhone:(jsonBack.strContactPhone==""?'--':jsonBack.strContactPhone),
            // find_strCompanyName:(jsonBack.strCompanyName==""?'--':jsonBack.strCompanyName),
            find_strCompanyName:jsonBack.strCompanyName,
            find_strRemark:(jsonBack.strRemark==""?'--':jsonBack.strRemark),
            find_FreightPrice:(jsonBack.intFreightPrice==0?'':jsonBack.intFreightPrice),

            otherToArea_Hide:(jsonBack.strOtherToAreaDesc==""?true:false),
            timeDesc_Hide:(jsonBack.dateLoadingTime==0?true:false),
            goodsDesc_Hide:(jsonBack.strGoodsDesc==""?true:false),
            companyName_Hide:(jsonBack.strCompanyName==""?true:false),
            remark_Hide:(jsonBack.strRemark==""?true:false),

            freight_Hide:(jsonBack.intFreightPrice==0?true:false),

            strFromAreaDesc:jsonBack.strFromAreaDesc,
            strToAreaDesc:jsonBack.strToAreaDesc,
            intFromAreaID:jsonBack.intFromAreaID,
            intToAreaID:jsonBack.intToAreaID,
            intGoodsWeight:jsonBack.intGoodsWeight,
            intGoodsCubic:jsonBack.intGoodsCubic,
            strGoodsName:jsonBack.strGoodsName,
            strOtherToAreaDesc:jsonBack.strOtherToAreaDesc,
            timeText:'装货日期',
            strTimeDesc:(jsonBack.dateLoadingTime==0?'--':DATE.formatTime(jsonBack.dateLoadingTime,'Y年M月D日')),
            dateLoadingTime:(jsonBack.dateLoadingTime==0?'':DATE.formatTime(jsonBack.dateLoadingTime,'Y-M-D')),
            strGoodsDesc:jsonBack.strGoodsDesc,
            floatCarLength:jsonBack.floatCarLength,
            intCarType:jsonBack.intCarType,
            strCarDesc:jsonBack.strCarDesc,
            strUserName:jsonBack.strUserName,
            strContactPhone:jsonBack.strContactPhone,
            strCompanyName:jsonBack.strCompanyName,
            strRemark:jsonBack.strRemark,
            strCallDesc:jsonBack.strCallDesc,
            strReadDesc:jsonBack.strReadDesc
        });
        setTimeout(function (){
            wx.hideLoading();
        },1000);
    },
    //重发
    resend_Goods:function (){
        wx.setStorage({
            key: 'strInformation',
            data:'strInformation'
        });
        var that=this;
        if(that.data.intCarORGoods==1){
            wx.setStorage({
                key: 'publishGoods',
                data:{
                    strFromAreaDesc:that.data.strFromAreaDesc,
                    strToAreaDesc:that.data.strToAreaDesc,
                    intFromAreaID:that.data.intFromAreaID,
                    intToAreaID:that.data.intToAreaID,
                    intGoodsWeight:that.data.intGoodsWeight,
                    intGoodsCubic:that.data.intGoodsCubic,
                    strGoodsName:that.data.strGoodsName,
                    strOtherToAreaDesc:that.data.strOtherToAreaDesc,
                    strTimeDesc:that.data.strTimeDesc,
                    dateLoadingTime:that.data.dateLoadingTime,
                    strGoodsDesc:that.data.strGoodsDesc,
                    floatCarLength:that.data.floatCarLength,
                    intCarType:that.data.intCarType,
                    strCarDesc:that.data.strCarDesc,
                    strUserName:that.data.strUserName,
                    strContactPhone:that.data.strContactPhone,
                    strCompanyName:that.data.strCompanyName,
                    strRemark:that.data.strRemark,
                    intFreightPrice:that.data.find_FreightPrice
                }
            });
            wx.navigateTo({
                url: '/pages/publish_goods/publish_goods'
            });
        }else{
            wx.setStorage({
                key: 'publishCar',
                data:{
                    strFromAreaDesc:that.data.strFromAreaDesc,
                    strToAreaDesc:that.data.strToAreaDesc,
                    intFromAreaID:that.data.intFromAreaID,
                    intToAreaID:that.data.intToAreaID,
                    floatCarLength:that.data.floatCarLength,
                    intCarType:that.data.intCarType,
                    strCarDesc:that.data.strCarDesc,
                    strUserName:that.data.strUserName,
                    strContactPhone:that.data.strContactPhone,
                    strRemark:that.data.strRemark
                }
            });
            wx.navigateTo({
                url: '/pages/publish_car/publish_car'
            });
        }
    },
    //拨打电话
    onMakePhoneCall:function (){
        var that=this;
        if(that.data.binding==0){
            wx.showModal({
                title: '温馨提示',
                content: '请绑定手机号码',
                cancelText:'取消',
                confirmText:'确定',
                success: function(res) {
                    if (res.confirm) {
                        wx.navigateTo({
                            url: '/pages/gzk_login/gzk_login?id=' + wx.getStorageSync('strWXOpenID') + '&sysID=' + that.data.strInfoSysID + '&type=' + that.data.intCarORGoods + '&intHistory=' + that.data.intHistory + '&intList=' + that.data.intList + '&share='+that.data.share+'&page=find_information'
                        });
                    } else if (res.cancel) {
                    }
                }
            })
        }else{
            wx.showModal({
                title: '温馨提示',
                content: '网络信息需仔细甄别,果真快不承担任何责任,请谨慎联系',
                confirmText:'拨打',
                success: function(res) {
                    if (res.confirm) {
                        var strMsgSend_124 = GCMAPI.doCreate_gcmMsg_124_GetConnect(1,that.data.strInfoSysID);
                        GZK_Coder.doSendMsgWXSMA(strMsgSend_124, that.onMsgCallBack_124);
                        wx.makePhoneCall({
                            phoneNumber: that.data.strContactPhone
                        })
                    }
                }
            }) ;
        }
    },
    /** 下架 **/
    shelves_Goods:function (){
        var that=this;
        wx.showModal({
            title: '温馨提示',
            content: '确定下架'+(that.data.intCarORGoods==1?'货源':'车源')+'吗？',
            cancelText:'取消',
            confirmText:'确定',
            success: function(res) {
                if (res.confirm) {
                    wx.showLoading({
                    title: '加载中...'
                });
                    var strMsgSend=GCMAPI.doCreate_gcmMsg_122_GetConnect(that.data.strInfoSysID,wx.getStorageSync('strUserSysID'));
                    // console.log(strMsgSend);
                    GZK_Coder.doSendMsgWXSMA(strMsgSend,that.onMsgCallBack_122);
                }
            }
        });
    },
    onMsgCallBack_122:function (jsonBack) {
        wx.hideLoading();
        var that=this;
        if(jsonBack.intUpdateStatus==1){
            wx.showToast({
                title: (that.data.intCarORGoods==1?'货源':'车源')+'下架成功',
                icon: 'none',
                duration: 3000
            });
            if(that.data.share==0){
                if(that.data.intList==1){
                    app.data.carORGoods_Bool=true;
                    wx.navigateBack({
                        delta:1
                    });
                    // wx.redirectTo({
                    //     url: '/pages/find_goods/find_goods'
                    // });

                }else if(that.data.intList==2){
                    app.data.carORGoods_Bool=true;
                    wx.navigateBack({
                        delta:1
                    });

                }else if(that.data.intList==3){
                    app.data.carORGoods_Bool=true;
                    wx.navigateBack({
                        delta:1
                    });
                    // wx.redirectTo({
                    //     url:'/pages/my_publish_goods/my_publish_goods?id=' + that.data.userID + '&name=' + that.data.strUserAlias + '&number=' + that.data.strPhoneNumber + '&companyName=' + that.data.strCompanyName + '&share='+getApp().data.serial_Number
                    // })
                }else if(that.data.intList==4){
                    app.data.carORGoods_Bool=true;
                    wx.navigateBack({
                        delta:1
                    });
                    // wx.redirectTo({
                    //     url:'/pages/my_publish_car/my_publish_car?id=' + that.data.userID + '&name='+that.data.share_UserAlias + '&number=' + that.data.share_PhoneNumber + '&share='+getApp().data.serial_Number
                    // })
                }else if(that.data.intList==5){
                    app.data.carORGoods_Bool=true;
                    wx.navigateBack({
                        delta:1
                    });
                    // wx.redirectTo({
                    //     url:(that.data.intCarORGoods==1?'/pages/my_publish_goods/my_publish_goods?id=' + that.data.userID + '&name=' + that.data.strUserAlias + '&number=' + that.data.strPhoneNumber + '&companyName=' + that.data.strCompanyName + '&share='+that.data.share:'/pages/my_publish_car/my_publish_car?id=' + that.data.userID + '&name='+that.data.share_UserAlias + '&number=' + that.data.share_PhoneNumber + '&share='+that.data.share)
                    // });
                }else if(that.data.intList==6){
                    wx.navigateBack({
                        delta: that.data.page-3
                    });
                    // wx.redirectTo({
                    //     url: '/pages/publish_success/publish_success?publish='+that.data.intCarORGoods
                    // })
                }else{
                    wx.showLoading({
                        title: '加载中...'
                    });
                    this.setData({
                        intHistory:0
                    });
                    if(this.data.intCarORGoods==1){
                        var strMsgSend_Goods = GCMAPI.doCreate_gcmMsg_120_GetConnect(this.data.strInfoSysID,wx.getStorageSync('strWXOpenID'));
                        GZK_Coder.doSendMsgWXSMA(strMsgSend_Goods,this.onMsgCallBack_120);
                    }else{
                        var strMsgSend_Car = GCMAPI.doCreate_gcmMsg_118_GetConnect(this.data.strInfoSysID,wx.getStorageSync('strWXOpenID'));
                        GZK_Coder.doSendMsgWXSMA(strMsgSend_Car,this.onMsgCallBack_118);
                    }
                }
            }else{
                wx.reLaunch({
                    url: '/pages/index/index'
                });
            }


        }else{
            wx.showToast({
                title: (that.data.intCarORGoods==1?'货源':'车源')+'下架失败',
                icon: 'none',
                duration: 3000
            })
        }
    },
    onMsgCallBack_124:function (jsonBack){
        // wx.hideLoading();
        },
    findInformation:function (e){
        var strInfoSysID=e.currentTarget.dataset.statu;
        var type=e.currentTarget.dataset.type;
        var that=this;
        wx.navigateTo({
            url: '/pages/find_information/find_information?id='+wx.getStorageSync('strWXOpenID')+'&sysID='+strInfoSysID+'&type='+type+'&intHistory='+this.data.intHistory+'&intList='+this.data.intList+ '&share=0'
        });
    },
    onOthers:function (){
        var that=this;
        wx.navigateTo({
            url: (that.data.intCarORGoods==1?'/pages/others/others?id='+that.data.strContactUserSysID+'&strUserName='+that.data.find_strUserName+'&strPhoneNumber='+that.data.find_strContactPhone+'&strCompanyName='+that.data.find_strCompanyName+'&intList='+that.data.intList+'&or=1'+ '&share=0':'/pages/others/others?id='+that.data.strContactUserSysID+'&strUserName='+that.data.find_strUserName+'&strPhoneNumber='+that.data.find_strContactPhone+'&strCompanyName='+that.data.find_strCompanyName+'&intList='+that.data.intList+'&or=2'+ '&share=0')
        });
    },
    onHome:function (){
        wx.reLaunch({
            url: '/pages/index/index'
        });
    }

});

