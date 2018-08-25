import DATE from '../../utils/util.js';
import dateTimePicker from '../../utils/dateTime.js';
import GCMAPI from '../../script/gzk_MsgApi/gcm_api.js';
import GZK_Coder from '../../script/gzk_MsgApi/gzk_script_coder.js';
var app = getApp();
Page({
    data: {
        page_Bool:true,
        strOrderNo:'',
        strOrderSysID:'',
        intUserType:null,
        dateLoading:null,
        intStatus:0,
        strDateLoading:'',
        floatCarLength:0,
        strFloatCarLength:'',
        intCarType:0,
        strCarType:'',
        intFreightRate:0,//参考运价
        intLoadingCost:0,
        intMatchingCost:0,
        intPolicyCost:0,//保险费
        intSaleType:0,
        intVolume:0,//体积
        intWeight:0,
        strApplicantName:'',
        strApplicantTel:'',
        strFromAddress:'',
        strToAddress:'',
        strGoodName:'',//货物名称
        strLoaderName:'',
        strLoaderTel:'',
        strPayRemarks:'',
        strTransfer:'',
        intPayCost:'',//总金额
        arrayPayItemList:[],//付款栏
        arrayRemarkList:[],//客服备注
        carFloatCarLength:0,
        carFloatCarLengthText:'',
        carType:0,
        CarTypeText:'',
        intCarPrice:0,
        intFreight:0,
        intMachineType:0,
        strDriverName:'',
        strDriverTel:'',
        strIDNumber:'',
        strPlate:'',
        strTrailerPlate:'',
        strUrgentTel:'',
        intRotate:1,
        isRotate:'',//旋转
        toggle:false,
        circuit_Hide:false,
        isRotate_2:'',
        toggle_2:false,
        circuit_Hide_2:false,
        isRotate_3:'',
        toggle_3:false,
        circuit_Hide_3:false,
        isRotate_4:'',
        toggle_4:false,
        circuit_Hide_4:false,
        isRotate_5:'',
        toggle_5:false,
        circuit_Hide_5:false,
    },
    onLoad: function (options) {
        var _this=this;
        wx.setNavigationBarTitle({
            title:'工单详情'
        });
        wx.getSystemInfo({
            success: function(res) {
                _this.setData({
                    page_Height:res.windowHeight-60,
                    bounced_Height:res.windowHeight*0.8
                });
            }
        });
        wx.hideShareMenu();
        this.setData({
            share:parseInt(options.share),
            strOrderSysID:options.strOrderSysID,
        });
    },
    onShow:function() {
        var that=this;
        wx.showLoading({
            title: '加载中...'
        });
        var strMsgSend = GCMAPI.doCreate_gcmMsg_206_GetConnect(this.data.strOrderSysID,wx.getStorageSync('strWXOpenID'));
        console.log(strMsgSend);
        GZK_Coder.doSendMsgWXSMA(strMsgSend,that.onMsgCallBack_206);
    },

    //点击图片选转 列表隐藏
    doRotateIMG:function (e){
        var that=this;
        var value=!that.data.toggle;

        that.setData({
            toggle:value,
            isRotate:'',
            circuit_Hide:false
        });
        if(that.data.toggle){
            that.setData({
                isRotate:'rotate_180',
                circuit_Hide:true
            });
        }
    },

    doRotateIMG_2:function (e){
        console.log(121121)
        var that=this;
        var value2=!that.data.toggle_2;

        that.setData({
            toggle_2:value2,
            isRotate_2:'',
            circuit_Hide_2:false
        });
        if(that.data.toggle_2){
            that.setData({
                isRotate_2:'rotate_180',
                circuit_Hide_2:true
            });
        }
    },
    doRotateIMG_3:function (e){
        var that=this;
        var value3=!that.data.toggle_3;

        that.setData({
            toggle_3:value3,
            isRotate_3:'',
            circuit_Hide_3:false
        });
        if(that.data.toggle_3){
            that.setData({
                isRotate_3:'rotate_180',
                circuit_Hide_3:true
            });
        }
    },
    doRotateIMG_4:function (e){
        var that=this;
        var value4=!that.data.toggle_4;

        that.setData({
            toggle_4:value4,
            isRotate_4:'',
            circuit_Hide_4:false
        });
        if(that.data.toggle_4){
            that.setData({
                isRotate_4:'rotate_180',
                circuit_Hide_4:true
            });
        }
    },
    doRotateIMG_5:function (e){
        var that=this;
        var value5=!that.data.toggle_5;

        that.setData({
            toggle_5:value5,
            isRotate_5:'',
            circuit_Hide_5:false
        });
        if(that.data.toggle_5){
            that.setData({
                isRotate_5:'rotate_180',
                circuit_Hide_5:true
            });
        }
    },

    onMsgCallBack_206:function(jsonBack){
        setTimeout(function () {
            wx.hideLoading();
        },300);

        console.log(jsonBack);
        var that=this;
        that.setData({
            page_Bool:false,
            intUserType:jsonBack.intUserType,
            strOrderNo:jsonBack.strOrderSysID,
            intPayCost:jsonBack.selfOrderInfo.intPayCost,
            dateLoading:jsonBack.selfOrderInfo.dateLoading,
            intStatus:jsonBack.selfOrderInfo.intStatus,
            strDateLoading:DATE.formatTime(jsonBack.selfOrderInfo.dateLoading, 'Y年M月D日 h:m'),
            floatCarLength:jsonBack.selfOrderInfo.floatCarLength,
            strFloatCarLength:(jsonBack.selfOrderInfo.floatCarLength==0||jsonBack.selfOrderInfo.floatCarLength==999?'其他车长':jsonBack.selfOrderInfo.floatCarLength+'米'),
            intCarType:jsonBack.selfOrderInfo.intCarType,
            strCarType:GZK_Coder.doCarType(jsonBack.selfOrderInfo.intCarType),
            intFreightRate:(jsonBack.selfOrderInfo.intFreightRate==0?'--':jsonBack.selfOrderInfo.intFreightRate),
            intLoadingCost:(jsonBack.selfOrderInfo.intLoadingCost==0?'--':jsonBack.selfOrderInfo.intLoadingCost),
            intMatchingCost:(jsonBack.selfOrderInfo.intMatchingCost==0?'--':jsonBack.selfOrderInfo.intMatchingCost),//人工匹配费
            intPolicyCost:(jsonBack.selfOrderInfo.intPolicyCost==0?'--':jsonBack.selfOrderInfo.intPolicyCost),//
            intSaleType:(jsonBack.selfOrderInfo.intSaleType==0?'--':jsonBack.selfOrderInfo.intSaleType),//
            intVolume:(jsonBack.selfOrderInfo.intVolume==0?'--':jsonBack.selfOrderInfo.intVolume),//体积
            intWeight:(jsonBack.selfOrderInfo.intWeight==0?'--':jsonBack.selfOrderInfo.intWeight),
            strApplicantName:jsonBack.selfOrderInfo.strApplicantName,
            strApplicantTel:jsonBack.selfOrderInfo.strApplicantTel,
            strFromAddress:jsonBack.selfOrderInfo.strFromAddress,
            strToAddress:jsonBack.selfOrderInfo.strToAddress,
            strGoodName:jsonBack.selfOrderInfo.strGoodName,
            strLoaderName:jsonBack.selfOrderInfo.strLoaderName,
            strLoaderTel:jsonBack.selfOrderInfo.strLoaderTel,
            strPayRemarks:jsonBack.selfOrderInfo.strPayRemarks,
            strTransfer:jsonBack.selfOrderInfo.strTransfer,
            strTransportRemarks:jsonBack.selfOrderInfo.strTransportRemarks,
            arrayPayItemList:jsonBack.arrayPayItemList,//付款栏
            arrayRemarkList:jsonBack.arrayRemarkList,
            carFloatCarLength:jsonBack.selfMatchingDriverInfo.floatCarLength,
            carFloatCarLengthText:(jsonBack.selfMatchingDriverInfo.floatCarLength==0||jsonBack.selfMatchingDriverInfo.floatCarLength==999?'其他车长':jsonBack.selfMatchingDriverInfo.floatCarLength+'米'),
            carType:jsonBack.selfMatchingDriverInfo.intCarType,
            CarTypeText:GZK_Coder.doCarType(jsonBack.selfMatchingDriverInfo.intCarType),
            intCarPrice:(jsonBack.selfMatchingDriverInfo.intCarPrice==0?'--':jsonBack.selfMatchingDriverInfo.intCarPrice),
            intFreight:(jsonBack.selfMatchingDriverInfo.intFreight==0?'--':jsonBack.selfMatchingDriverInfo.intFreight),
            intMachineType:(jsonBack.selfMatchingDriverInfo.intMachineType==0?'--':jsonBack.selfMatchingDriverInfo.intMachineType),
            strDriverName:(jsonBack.selfMatchingDriverInfo.strDriverName==''?'--':jsonBack.selfMatchingDriverInfo.strDriverName),
            strDriverTel:(jsonBack.selfMatchingDriverInfo.strDriverTel==''?'--':jsonBack.selfMatchingDriverInfo.strDriverTel),
            strIDNumber:(jsonBack.selfMatchingDriverInfo.strIDNumber==''?'--':jsonBack.selfMatchingDriverInfo.strIDNumber),
            strPlate:(jsonBack.selfMatchingDriverInfo.strPlate==''?'--':jsonBack.selfMatchingDriverInfo.strPlate),
            strTrailerPlate:(jsonBack.selfMatchingDriverInfo.strTrailerPlate==''?'--':jsonBack.selfMatchingDriverInfo.strTrailerPlate),
            strUrgentTel:(jsonBack.selfMatchingDriverInfo.strUrgentTel==''?'--':jsonBack.selfMatchingDriverInfo.strUrgentTel),
        });
    },
    //  拨打电话
    onMakePhoneCall:function (e){
        var that=this;
        var stuta=e.currentTarget.dataset.statu;
        var phone=e.currentTarget.dataset.phone;

        wx.showModal({
            title: '温馨提示',
            content: (stuta==1?'果真快保险热线':'国寿财保热线'),
            confirmText:'拨打',
            success: function(res) {
                if (res.confirm) {
                    wx.makePhoneCall({
                        phoneNumber:phone
                    })
                }
            }
        });
    },
    // 支付
    toPayFor:function(jsonBack){
        var that=this;
        app.data.floatMoneyPay=that.data.intPayCost;
        app.data.strOrderNo=this.data.strOrderNo;
        app.data.intUsePayReason=110;
        app.data.payDesGoods='人工匹配费';
        app.data.carORGoods_Bool=true;
        wx.navigateTo({
            url: '/pages/payment/payment?page=pworkOrder_Details'
        });
    },
    onMsgCallBack_2503:function (jsonBack) {
        if(jsonBack.intOperationStatus==0){
            app.data.floatMoneyPay=this.data.premium;
            app.data.strOrderNo=this.data.strOrderNo;
            app.data.payDesGoods=jsonBack.strDesc;
            wx.navigateTo({
                url: '/pages/payment/payment?page=policyDetails'
            });
        }else{
            wx.showToast({
                title: '保单信息有误，请稍后再尝试',
                icon: 'none',
                duration: 3000
            })
        }
    },
    //  判断分享
    onShareInformation:function () {
        var that=this;
        wx.showModal({
            title: '温馨提示',
            content: '分享保单需要绑定果真快账号',
            cancelText:'取消',
            confirmText:'确定',
            success: function(res) {
                if (res.confirm) {
                    wx.navigateTo({
                        url: '/pages/gzk_login/gzk_login?strOrderNo='+that.data.strOrderNo+'&share='+that.data.share+'&page=policy_details'
                    });
                } else if (res.cancel) {
                }
            }
        })
    },
    //  分享
    onShareAppMessage: function (rest) {
        var that = this;
        if (rest.from === 'button') {}
        return {
            title:that.data.cityText+'->'+that.data.cityText2+'，'+that.data.itemName,
            path: '/pages/work_order_details/index?strOrderSysID='+that.data.strOrderSysID+'&share=1',
            success: function (rest) {
                // 转发成功
            },
            fail: function (rest) {
                // 转发失败
            }
        }
    },
    onHome:function (){
        wx.reLaunch({
            url: '/pages/index/index'
        });
    },

    doIns_Amendment:function (){
        app.data.strOrderNo=this.data.strOrderNo;
        var that=this;
        if(that.data.intBackStatus==1){
            wx.showToast({
                title: '当前时间超过起运时间，不可以修改',
                icon: 'none',
                duration: 3000
            });
        }else{
            wx.navigateTo({
                url: '/pages/insurance_amendment/insurance_amendment'
            });
        }
    }
});

