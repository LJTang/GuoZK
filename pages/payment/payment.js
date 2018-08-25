import DATE from '../../utils/util.js';
import GCMAPI from '../../script/gzk_MsgApi/gcm_api.js';
import GZK_Coder from '../../script/gzk_MsgApi/gzk_script_coder.js';
var app = getApp();
var id;
Page({
    data:{
        height:null,
        bgColor:'',
        btnText:'保单出单中...',
        bounced_Height:0,
        intUsePayType:2,
        sucs_warn:'',
        pay_Text:'',
        pay_TextDescribe:'',
        pay_Bool:false,
        results_Bool:true,
        ren_Bool:true,
        jump_Bool:false,
        pageName:'', //页面名
        titleName:'支付', //标题名
        gzk_AvailableSunshine:0, //标题名
        gzk_FloatUserCash:0, //标题名
        doClick:''
    },
    onLoad: function (options){
        var sysinfo=wx.getSystemInfoSync();
        var that=this;
        wx.showLoading({
            title: '加载中...'
        });
        wx.getSystemInfo({
            success: function(res) {
                that.setData({
                    height:res.windowHeight,
                    bounced_Height:res.windowHeight*0.8
                });
            }
        });
        wx.setNavigationBarTitle({
            title: that.data.titleName
        });
        that.setData({
            strFloatMoneyPay:app.data.floatMoneyPay,
            pageName:options.page,
            pay_Bool:false,
            results_Bool:true
        });
        //  果宝
        var strMsgSend_880 = GCMAPI.doCreate_gcmMsg_880_GetConnect(wx.getStorageSync('strWXOpenID'));
        GZK_Coder.doSendMsgWXSMA(strMsgSend_880,this.onMsgCallBack_880);
    },

    onUnload:function () {
        this.setData({
            pay_Bool:true,
            results_Bool:true
        });
    },
    /** 选择支付 **/
    select_Method_Of_Payment:function(e){
        var id = e.currentTarget.dataset.statu;  //获取自定义的ID值
        var that=this;
        that.setData({
            intUsePayType:id
        })
    },
    /** 支付 **/
    insurance_Pay:function (e){
       var that=this;
        wx.showModal({
            title: '温馨提示',
            content: '确定支付吗？',
            success: function(res) {
                if (res.confirm) {
                    console.log(that.data.intUsePayType)
                    if(parseInt(that.data.intUsePayType)==1) {
                        wx.showLoading({
                            title: '加载中...'
                        });
                        var strMsgSend = GCMAPI.doCreate_gcmMsg_860_GetConnect(app.data.floatMoneyPay,app.data.intUsePayReason, parseInt(that.data.intUsePayType),0,'',app.data.strOrderNo, wx.getStorageSync('strWXOpenID'));
                        GZK_Coder.doSendMsgWXSMA(strMsgSend, that.onMsgCallBack_860);
                    }else{
                        var strMsgSend_872=GCMAPI.doCreate_gcmMsg_872_GetConnect(app.data.floatMoneyPay,app.data.payDesGoods,wx.getStorageSync('strWXOpenID'));
                        console.log(strMsgSend_872)
                        GZK_Coder.doSendMsgWXSMA(strMsgSend_872, that.onMsgCallBack_Pay);
                    }
                }
            }
        })

    },
    //查果宝
    onMsgCallBack_880:function (jsonBack){
        wx.hideLoading();
        if(jsonBack.intStatus==0){
            this.setData({
                gzk_FloatUserCash:Math.floor(jsonBack.floatUserCash *100)/100,
                gzk_AvailableSunshine:parseFloat(jsonBack.floatUserCash-jsonBack.floatUserSysCash).toFixed(0)
            });
        }else{
            wx.showToast({
                title: '获取果宝金额失败，请稍后再尝试请求',
                icon: 'none',
                duration: 2000
            });
        }
    },

    onMsgCallBack_860:function (jsonBack){
        setTimeout(function (){
            wx.hideLoading();
        },300);
        console.log(jsonBack);
        var that=this;
        wx.setNavigationBarTitle({
            title: '支付结果'
        });
        if(this.data.intUsePayType==1){
            if(jsonBack.intUserPayStatus==0){
                if(jsonBack.intPayStatus==0){
                    that.setData({
                        pay_Bool:true,
                        results_Bool:false,
                        ren_Bool:true,
                        jump_Bool:false,
                        sucs_warn:'success',
                        pay_Text:'支付成功',
                        pay_TextDescribe:'支付成功，可查看'+(that.data.pageName=='pworkOrder_Details'?'':'保单')+'详情',
                        titleName:'支付结果'
                    });
                    if(that.data.pageName=='pworkOrder_Details'){
                        that.setData({
                            btnText:'查看详情',
                            doClick:'doDetails',
                            bgColor:'bg09bb07'
                        });
                    }else{
                        that.onMsgCall_2504(jsonBack);
                    }
                }else{
                    that.setData({
                        pay_Bool:true,
                        results_Bool:false,
                        jump_Bool:true,
                        ren_Bool:false,
                        sucs_warn:'warn',
                        pay_Text:'支付失败',
                        pay_TextDescribe:'支付失败，可点击“返回”按钮重返支付页面重新支付',
                        titleName:'支付结果'
                    });
                    wx.showToast({
                        title: '果宝支付失败',
                        icon: 'none',
                        duration: 2000
                    });
                }
            }else{
                wx.showToast({
                    title: '账户余款不足',
                    icon: 'none',
                    duration: 2000
                });
            }
        }else{
            if(jsonBack.intPayStatus==0){
                that.setData({
                    pay_Bool:true,
                    results_Bool:false,
                    ren_Bool:true,
                    jump_Bool:false,
                    sucs_warn:'success',
                    pay_Text:'支付成功',
                    pay_TextDescribe:'支付成功，可查看'+(that.data.pageName=='pworkOrder_Details'?'':'保单')+'详情',
                    titleName:'支付结果'
                });
                if(that.data.pageName=='pworkOrder_Details'){
                    that.setData({
                        btnText:'查看详情',
                        doClick:'doDetails',
                        bgColor:'bg09bb07'
                    });
                }else{
                    that.onMsgCall_2504(jsonBack);
                }

            }else{

                that.setData({
                    pay_Bool:false,
                    results_Bool:true,
                    jump_Bool:true,
                    ren_Bool:false,
                    sucs_warn:'warn',
                    pay_Text:'支付失败',
                    pay_TextDescribe:'支付失败，可点击“返回”按钮重返支付页面重新支付',
                    titleName:'支付结果'
                });
                wx.showToast({
                    title: '微信支付失败，稍后工作人员会把支付金额退还给您',
                    icon: 'none',
                    duration: 2000
                });
            }
        }

    },
    //  微信支付
    onMsgCallBack_Pay:function(jsonBack){
        var that=this;
        wx.requestPayment({
            'timeStamp': jsonBack.strTimestamp,
            'nonceStr': jsonBack.strNoncestr,
            'package': 'prepay_id='+jsonBack.strPrepayid,
            'signType': 'MD5',
            'paySign': jsonBack.strSign,
            'success':function(res){
                wx.showLoading({
                    title: '加载中...'
                });
                if(res.errMsg='requestPayment:ok'){
                    var strMsgSend = GCMAPI.doCreate_gcmMsg_860_GetConnect(app.data.floatMoneyPay,app.data.intUsePayReason, parseInt(that.data.intUsePayType),0,jsonBack.out_trade_no,app.data.strOrderNo, wx.getStorageSync('strWXOpenID'));

                    GZK_Coder.doSendMsgWXSMA(strMsgSend, that.onMsgCallBack_860);
                }else{
                    var strMsgSend = GCMAPI.doCreate_gcmMsg_860_GetConnect(app.data.floatMoneyPay,app.data.intUsePayReason, parseInt(that.data.intUsePayType),1,jsonBack.out_trade_no,app.data.strOrderNo, wx.getStorageSync('strWXOpenID'));
                    GZK_Coder.doSendMsgWXSMA(strMsgSend, that.onMsgCallBack_860);
                }
            },
            'fail':function(res){
            },
            'complete':function(res){
            }
        });
    },
    onMsgCall_2504:function (jsonBack){
        this.setData({
            bgColor:'bg70',
            btnText:'保单出单中...'
        });
        wx.showLoading({
            title: '保单出单中...'
        });
        var strMsgSend_2504= GCMAPI.doCreate_gcmMsg_2504_GetConnect(jsonBack.strAboutOrderSysID,jsonBack.strUserMoneySysID,wx.getStorageSync('strWXOpenID'));
        GZK_Coder.doSendMsgWXSMA(strMsgSend_2504,this.onMsgCallBack_2504);
    },
    onMsgCallBack_2504:function (jsonBack){
        var that=this;
        setTimeout(function (){
            // wx.hideLoading();

            app.data.strOrderNo=jsonBack.strOrderNo;
            app.data.ins_pages=that.data.pageName;
            that.setData({
                doClick:'doDetails',
                bgColor:'bg09bb07'
            });
            if(jsonBack.intStatus==0){
                // that.setData({
                //     doClick:''
                // })
                // wx.showToast({
                //     title: '保险网关出错，请联系果真快保险客服',
                //     icon: 'none',
                //     duration: 2000
                // });
                // setTimeout(function () {
                //     if(that.data.pageName=='buy'){
                //         wx.navigateTo({
                //             url: '/pages/policy_details/policy_details?strOrderNo='+app.data.strOrderNo+'&share=0'
                //         });
                //     }else{
                //         wx.navigateBack({
                //             delta:1
                //         });
                //     }
                // },2000);
                that.setData({
                    btnText:'查看详情'
                });
                wx.showModal({
                    title: '温馨提示',
                    content: '保单出单成功',
                    confirmText: '查看详情',
                    cancelText:'知道了',
                    success: function (res) {
                        if (res.confirm) {
                            if(that.data.pageName=='buy'){
                                wx.navigateTo({
                                    url: '/pages/policy_details/policy_details?strOrderNo='+app.data.strOrderNo+'&share=0'
                                });
                            }else{
                                wx.navigateBack({
                                    delta:1
                                });
                            }
                        }
                    }
                });

            }else if(jsonBack.intStatus==1){
                that.setData({
                    btnText:'出单失败-查看详情'
                });

                wx.showModal({
                    title: '温馨提示',
                    content: '系统错误，请联系果真快保险客服',
                    confirmText: '查看详情',
                    cancelText:'知道了',
                    success: function (res) {
                        if (res.confirm) {
                            if(that.data.pageName=='buy'){
                                wx.navigateTo({
                                    url: '/pages/policy_details/policy_details?strOrderNo='+app.data.strOrderNo+'&share=0'
                                });
                            }else{
                                wx.navigateBack({
                                    delta:1
                                });
                            }
                        }
                    }
                });
            }else if(jsonBack.intStatus==2){

                that.setData({
                    btnText:'出单失败-查看详情'
                });
                wx.showModal({
                    title: '温馨提示',
                    content: '保险网关出错，请联系果真快保险客服',
                    confirmText: '知道了',
                    showCancel:false,
                    success: function (res) {
                        if (res.confirm) {
                            if (res.confirm) {
                                if(that.data.pageName=='buy'){
                                    wx.navigateTo({
                                        url: '/pages/policy_details/policy_details?strOrderNo='+app.data.strOrderNo+'&share=0'
                                    });
                                }else{
                                    wx.navigateBack({
                                        delta:1
                                    });
                                }
                            }
                        }
                    }
                });
            }else if(jsonBack.intStatus==3){
                that.setData({
                    btnText:'出单失败-查看详情'
                });
                wx.showModal({
                    title: '温馨提示',
                    content: '找不到付款记录，请联系果真快保险客服',
                    confirmText: '知道了',
                    showCancel:false,
                    success: function (res) {
                        if (res.confirm) {
                            if (res.confirm) {
                                if(that.data.pageName=='buy'){
                                    wx.navigateTo({
                                        url: '/pages/policy_details/policy_details?strOrderNo='+app.data.strOrderNo+'&share=0'
                                    });
                                }else{
                                    wx.navigateBack({
                                        delta:1
                                    });
                                }
                            }
                        }
                    }
                });
            }else{
                wx.showModal({
                    title: '温馨提示',
                    content: '网络错误，请联系果真快保险客服',
                    confirmText: '知道了',
                    showCancel:false,
                    success: function (res) {
                        if (res.confirm) {

                        }
                    }
                });

            }
        },500);
    },
    //  跳转保单详情
    doDetails:function (e){
        var that=this;
        app.data.ins_pages=that.data.pageName;
        if(that.data.pageName=='buy'){
            wx.navigateTo({
                url: '/pages/policy_details/policy_details?strOrderNo='+app.data.strOrderNo+'&share=0'
            });
            // wx.navigateBack({
            //     delta:1
            // });
        }else{
            wx.navigateBack({
                delta:1
            });
        }

    },
    //  返回
    pageBack:function (){
        var that=this;
        wx.showLoading({
            title: '加载中...'
        });
        setTimeout(function (){
            wx.hideLoading();
            wx.setNavigationBarTitle({
                title: '支付'
            });
            that.setData({
                pay_Bool:false,
                results_Bool:true,
                ren_Bool:true,
                jump_Bool:false,
                sucs_warn:'success',
                pay_Text:'支付成功',
                pay_TextDescribe:'支付成功，可查看保单详情',
                titleName:'支付结果'
            });
        },500);

    },
    /** 自定义弹出框 **/
    powerDrawer2: function (e) {
        var currentStatu = e.currentTarget.dataset.statu;
        this.util2(currentStatu);
        this.setData({
            carType_ID:this.data.id,
            carType_mID:this.data.mID,
            carType_cValue:this.data.cValue,
            carType_CarLength:this.data.cLength,
            carType_mValue:this.data.mValue
        })
    },
    util2: function(currentStatu){
        /* 动画部分 */
        // 第1步：创建动画实例
        var animation = wx.createAnimation({
            duration: 200, //动画时长
            timingFunction: "linear", //线性
            delay: 0 //0则不延迟
        });

        // 第2步：这个动画实例赋给当前的动画实例
        this.animation = animation;

        // 第3步：执行第一组动画
        animation.opacity(0).translateY(200).step();

        // 第4步：导出动画对象赋给数据对象储存
        this.setData({
            animationData: animation.export()
        })

        // 第5步：设置定时器到指定时候后，执行第二组动画
        setTimeout(function () {
            // 执行第二组动画
            animation.opacity(1).translateY(0).step();
            // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象
            this.setData({
                animationData: animation
            })

            //关闭
            if (currentStatu == "close") {
                this.setData({
                    vehicleParameters: false,
                    remark_Hide:false,
                    vehicle_Parameters:this.data.cValue+'/'+this.data.mValue
                });
            }
        }.bind(this), 200);

        // 显示
        if (currentStatu == "open") {
            this.setData(
                {
                    vehicleParameters: true,
                    remark_Hide: true
                }
            );
        }
    },
});