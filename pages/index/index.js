import GCMAPI from '../../script/gzk_MsgApi/gcm_api.js';
import GZK_Coder from '../../script/gzk_MsgApi/gzk_script_coder.js';
import MD5 from '../../script/gzk_MsgApi/md5.js';
var app = getApp();
Page({
    data:{
        // text:"这是一个页面"
        imageH:0,
        intsPolicySwitchStatus:1,
        imageURL:app.data.imgURL,
        picker1Value:0,
        determineNumber:'',
        userPhone:'',
        gzkType:[
            {value:3, name: '物流公司'},
            {value:1, name: '货主', checked: 'true'},
            {value:2, name: '车主'}],
        location:null,
        typeValue:2,
        showModalStatus: false,
        pupUPBoolean: false,
        pupUPRadio: false

    },
    onShareAppMessage: function (res) {
        if (res.from === 'button') {
            // 来自页面内转发按钮
            // console.log(res.target)
            return {
                title: ' ',
                path: '/pages/index/index',
                imageUrl:app.data.imgURL+"/home_share.jpg",
                success: function(res) {
                    // 转发成功
                },
                fail: function(res) {
                    // 转发失败
                }
            }
        }
        return {
            title: '',
            path: '/pages/index/index',
            imageUrl:app.data.imgURL+"/home_share.jpg",
            success: function(res) {
                // 转发成功
            },
            fail: function(res) {
                // 转发失败
            }
        }
    },
    onLoad:function (){
        var sysinfo=wx.getSystemInfoSync();
        var _this=this;
        _this.setData({
            imageH:sysinfo.windowHeight,
        });
        var strMsgSend_100= GCMAPI.doCreate_gcmMsg_100_GetConnect();
        GZK_Coder.doSendMsgWXSMA(strMsgSend_100,_this.onMsgCallBack_101);
        wx.setStorage({
            key:'strInformation',
            data:''
        });
        wx.getLocation( {
            success: function( res ) {
                wx.setStorage({
                    key: 'location',
                    data: {longitude: res.longitude,
                        latitude: res.latitude}
                });
                _this.doCreate_gcmMsg_154(res.latitude,res.longitude);
            },
            fail:function(res){
                if (wx.openSetting) {
                    wx.openSetting({
                        success: function (res) {
                            _this.onHome();
                        }
                    })
                } else {

                }
            },
            complete:function(res){}
        });
    },

    onMsgCallBack_101:function (jsonBack){
        app.data.intsPolicyRepairStatus=jsonBack.intsPolicyRepairStatus;
        this.setData({
            intsPolicySwitchStatus:jsonBack.intsPolicySwitchStatus
        });
    },
    onHome: function () {
        wx.reLaunch({
            url: '/pages/index/index'
        });
    },

    doCreate_gcmMsg_154:function(lat,lon){
        var strMsgSend = GCMAPI.doCreate_gcmMsg_154_GetConnect(lat,lon,wx.getStorageSync('strWXOpenID'));
        GZK_Coder.doSendMsgWXSMA(strMsgSend,this.onMsgCallBack_154);
        //支付
        // var strMsgSend = GCMAPI.doCreate_gcmMsg_872_GetConnect();
        // GZK_Coder.doSendMsgWXSMA(strMsgSend, this.onMsgCallBack);

    },
    onMsgCallBack_154:function(jsonBack){},
    onMsgCallBack:function(jsonBack){

        wx.requestPayment({
            'timeStamp': jsonBack.strTimestamp,
            'nonceStr': jsonBack.strNoncestr,
            'package': 'prepay_id='+jsonBack.strPrepayid,
            'signType': 'MD5',
            'paySign': jsonBack.strSign,
            'success':function(res){
                if(res.errMsg='requestPayment:ok'){
                    wx.showToast({
                        title: '成功',
                        icon: 'success',
                        duration: 2000
                    })
                }else{
                    wx.showToast({
                        title: '失败',
                        icon: 'cancel',
                        duration: 2000
                    })
                }

            },
            'fail':function(res){
            },
            'complete':function(res){
            }
        })
    },

    // 判断手机号码注册
    onDetermineNumber:function(e){
        this.setData({
            determineNumber:e.currentTarget.dataset.statu
        });
        wx.setStorage({
            key: 'pageName',
            data: e.currentTarget.dataset.statu
        });
        var strMsgSend = GCMAPI.doCreate_gcmMsg_104_GetConnect(wx.getStorageSync('strWXOpenID'));
        GZK_Coder.doSendMsgWXSMA(strMsgSend,this.onMsgCallBack_104);
    },

    onMsgCallBack_104:function(jsonBack){
        wx.setStorage({
            key: 'strUserData',
            data: {strPhoneNumber:jsonBack.strPhoneNumber,strUserAlias:jsonBack.strUserAlias,strCompanyName:jsonBack.strCompanyName}
        });
        if(jsonBack.intStatus==1){
            if(this.data.determineNumber=='publish_car'){
               wx.navigateTo({
                   url: '/pages/publish_car/publish_car'
               });
           }else if(this.data.determineNumber=='publish_goods'){
               wx.navigateTo({
                   url: '/pages/publish_goods/publish_goods'
               });
           }else if(this.data.determineNumber=='my_publish_goods'){
               wx.navigateTo({
                   url: '/pages/my_publish_goods/my_publish_goods?id='+wx.getStorageSync('strWXOpenID')+'&name=&number=&companyName=&share=0'
               });
           }else if(this.data.determineNumber=='my_publish_car'){
                wx.navigateTo({
                    url: '/pages/my_publish_car/my_publish_car?id='+wx.getStorageSync('strWXOpenID')+'&name=&number=&companyName=&share=0'
                });
           }else if(this.data.determineNumber=='center'){
                wx.navigateTo({
                    url: '/pages/gzk_personal_center/gzk_personal_center'
                });
            }else if(this.data.determineNumber=='history_freight'){
                wx.navigateTo({
                    url: '/pages/history_freight/history_freight'
                });
            }else if(this.data.determineNumber=='my_policy'){
                wx.navigateTo({
                    url: '/pages/my_policy/policy'
                });
            }
        }else{
            wx.navigateTo({
                url: '/pages/gzk_login/gzk_login?id=&page=index'
            });
        }
    },

    onReady:function () {
        //获得dialog组件
    },

    normalPickerBindchange:function(e){
        this.setData({
          picker1Value:e.detail.value
        });
    },
  timePickerBindchange:function(e){
    this.setData({
      timeValue:e.detail.value
    })
  },
  datePickerBindchange:function(e){
    this.setData({
      dateValue:e.detail.value
    })
  },

    onArtificialHotline:function () {
        wx.navigateTo({
            url: '/pages/artificial_matching/artificial_matching'
        });
    },
    log:function (e) {
        wx.navigateTo({
            url: '/pages/gzk_login/gzk_login'
        });
    },
    onInsurance:function () {
        wx.navigateTo({
            url: '/pages/insurance/index'
        });
    },
    onHistoryFreight:function (){
        wx.navigateTo({
            url: '/pages/history_freight/history_freight?share=0'
        });
    },
    onHow_Insurance:function () {
        wx.navigateTo({
            url: '/pages/how_insurance/how_insurance'
        });
    },

    /* 手机号码输入 */
    userPhoneInput:function(e){
        this.setData({
            userPhone: e.detail.value
        })
    },
    /** 选择注册类型 **/
    radioChange: function(e) {
        this.setData({
            typeValue: parseInt(e.detail.value)
        });
    },
    /** 自定义弹出框 **/
    powerDrawer: function (e) {
        var currentStatu = e;
        this.util(currentStatu)
    },

    powerDrawer2: function (e) {
        var strMsgSend = GCMAPI.doCreate_gcmMsg_106_GetConnect(this.data.userPhone);
        GZK_Coder.doSendMsgWXSMA(strMsgSend,this.onMsgCallBack_106);

        var currentStatu = e.currentTarget.dataset.statu;
        this.util(currentStatu)
    },
    util: function(currentStatu){
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
        animation.opacity(0).rotateX(-100).step();

        // 第4步：导出动画对象赋给数据对象储存
        this.setData({
            animationData: animation.export()
        })

        // 第5步：设置定时器到指定时候后，执行第二组动画
        setTimeout(function () {
            // 执行第二组动画
            animation.opacity(1).rotateX(0).step();
            // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象
            this.setData({
                animationData: animation
            })

            //关闭
            if (currentStatu == "close") {
                this.setData({
                    showModalStatus: false
                });
            }
        }.bind(this), 200)

        // 显示
        if (currentStatu == "open") {
            this.setData({
                showModalStatus: true
            });
        }
    },

    onMsgCallBack_106:function(jsonBack){
        var that=this;
        if(jsonBack.intStatus==1){
            wx.showModal({
                showCancel:false,
                title: '绑定',
                content: '绑定果真快APP',
                success: function(res) {
                    if (res.confirm) {
                        var strMsgSend = GCMAPI.doCreate_gcmMsg_108_GetConnect(jsonBack.strPhoneNumber,jsonBack.strUserSysID,wx.getStorageSync('strWXOpenID'));
                        GZK_Coder.doSendMsgWXSMA(strMsgSend,that.onMsgCallBack_108);
                    }
                }
            })

        }else{

        }
    },
    onMsgCallBack_108:function (jsonBack) {
        if(jsonBack.intStatus==1){
            wx.showToast({
                title: '绑定成功',
                icon: 'none',
                duration: 3000
            });
        }else if(jsonBack.intStatus==0){
            wx.showToast({
                title: '绑定失败',
                icon: 'none',
                duration: 3000
            });

        }else{

        }
    },

    buy_Insurance:function(){
        wx.navigateTo({
            url: '/pages/buy_insurance/buy_insurance'
        });
    },
    onIntelligent_Distribution:function(){
        wx.navigateTo({
            url: '/pages/gzk_intelligent_distribution/gzk_intelligent_distribution'
        });
    },
    findCar:function(){
        wx.navigateTo({
            url: '/pages/find_car/find_car'
        });
    },
    findGoods:function(){
        wx.navigateTo({
            url: '/pages/find_goods/find_goods'
        });
    },
    onPersonal_Center:function(){
        wx.navigateTo({
            url: '/pages/gzk_personal_center/gzk_personal_center'
        });
    },
    onInsurance:function(){
        wx.navigateTo({
            url: '/pages/insurance/index'
            // url: '/pages/payment/payment'
        });
    },
    carNumber:function(){
        wx.navigateTo({
            url: '/pages/keyboard/keyboard'
        });
    },
    onCustomerService:function(){
        wx.navigateTo({
            url: '/pages/kefu/kefu'
        });
    }
});