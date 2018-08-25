import DATE from '../../utils/util.js';
import CITY from '../../utils/city.js';
import GCMAPI from '../../script/gzk_MsgApi/gcm_api.js';
import GZK_Coder from '../../script/gzk_MsgApi/gzk_script_coder.js';
var app = getApp();
// var id;
Page({
    data:{
        publishHeight:0,
        startDate:DATE.formatTime(Date.parse(new Date()),'Y-M-D'),
        inputShowed: false,
        inputVal: "",
        cityText:'中国全境',
        cityTextID:100000,
        cityText2:'中国全境',
        cityText2ID:100000,
        id:11,
        mID:1,
        cValue:'15米',
        cLength:15,
        mValue:'冷藏车',
        carType_ID:0,
        carType_mID:0,
        carType_CarLength:1,
        carType_cValue:'其他车长',
        carType_mValue:'其他车型',
        vehicle_Parameters:'',
        conductors:[{'text':'其他车长','value':999},{'text':'4.2米','value':4.2},{'text':'5.8米','value':5.8},{'text':'6.8米','value':6.8},{'text':'7.2米','value':7.2},{'text':'7.6米','value':7.6},{'text':'8.6米','value':8.6},{'text':'9.6米','value':9.6},{'text':'12.5米','value':12.5},{'text':'13米','value':13},{'text':'13.7米','value':13.7},{'text':'15米','value':15},{'text':'17.5米','value':17.5}],
        models:[{text:'其他车型'},{text:'冷藏车'},{text:'高栏车'},{text:'冷藏肉挂车'},{text:'保温车'},{text:'箱车'},{text:'平板车'},{text:'集装箱'},{text:'海柜'}],
        showModalStatus: false,
        returnLevel:false,
        transitPoint:'',
        nameGoods:'',
        goodsWeight:0,
        volumeGoods:0,
        nameCompany:'',
        contact:'',
        contactPhoneNumber:'',
        note:'',
        publish_Freight:'',
        isScroll:false,
        bounced_Height:0,
        dateValue:DATE.formatTime(Date.parse(new Date()),'Y-M-D')
        // dateValue:DATE.formatTime(new Date().getTime(),'Y-M-D')
    },
    onLoad: function () {
        new app.Region();
        var sysinfo=wx.getSystemInfoSync();
        wx.showLoading({
            title: '加载中...'
        });
        wx.setNavigationBarTitle({
            title: '发布货源'
        });
        var _this=this;
        wx.getSystemInfo({
            success: function(res) {
                _this.setData({
                    bounced_Height:res.windowHeight*0.8,
                    publishHeight:res.windowHeight-60
                });
            }
        });
        if(wx.getStorageSync('strInformation')=='strInformation'){
            var conductors=this.data.conductors.length;
            for(var i=0;i<conductors;i++){
                //如果字符串中不包含目标字符会返回-1
                if(this.data.conductors[i].text==(wx.getStorageSync('publishGoods').floatCarLength==0?'其他车长':(wx.getStorageSync('publishGoods').floatCarLength==999?'其他车长':wx.getStorageSync('publishGoods').floatCarLength+'米'))){
                    this.setData({
                        id:i,
                        carType_ID:i,
                        cValue:(wx.getStorageSync('publishGoods').floatCarLength==0?'其他车长':(wx.getStorageSync('publishGoods').floatCarLength==999?'其他车长':wx.getStorageSync('publishGoods').floatCarLength+'米')),
                        cLength:(wx.getStorageSync('publishGoods').floatCarLength==0?999:wx.getStorageSync('publishGoods').floatCarLength),
                        carType_CarLength:(wx.getStorageSync('publishGoods').floatCarLength==0?999:wx.getStorageSync('publishGoods').floatCarLength)
                    })
                }
            }
            _this.setData({
                cityText: wx.getStorageSync('publishGoods').strFromAreaDesc,
                cityTextID: wx.getStorageSync('publishGoods').intFromAreaID,
                cityText2: wx.getStorageSync('publishGoods').strToAreaDesc,
                cityText2ID: wx.getStorageSync('publishGoods').intToAreaID,
                transitPoint: wx.getStorageSync('publishGoods').strOtherToAreaDesc,

                nameGoods: wx.getStorageSync('publishGoods').strGoodsName,
                goodsWeight: (wx.getStorageSync('publishGoods').intGoodsWeight==0?'':wx.getStorageSync('publishGoods').intGoodsWeight),
                volumeGoods: (wx.getStorageSync('publishGoods').intGoodsCubic==0?'':wx.getStorageSync('publishGoods').intGoodsCubic),
                nameCompany: wx.getStorageSync('publishGoods').strCompanyName,
                vehicle_Parameters: wx.getStorageSync('publishGoods').strCarDesc,
                contact: wx.getStorageSync('publishGoods').strUserName,
                contactPhoneNumber: wx.getStorageSync('publishGoods').strContactPhone,
                note: wx.getStorageSync('publishGoods').strRemark,
                publish_Freight: wx.getStorageSync('publishGoods').intFreightPrice,
                dateValue:DATE.formatTime(new Date().getTime(),'Y-M-D'),
                carType_mID:(wx.getStorageSync('publishGoods').intCarType==0?999:wx.getStorageSync('publishGoods').intCarType),
                mID:(wx.getStorageSync('publishGoods').intCarType==999?0:wx.getStorageSync('publishGoods').intCarType),
                carType_mValue:GZK_Coder.doCarType((wx.getStorageSync('publishGoods').intCarType==0?999:wx.getStorageSync('publishGoods').intCarType)),
                mValue:GZK_Coder.doCarType((wx.getStorageSync('publishGoods').intCarType==0?999:wx.getStorageSync('publishGoods').intCarType))
            });
            setTimeout(function (){
                wx.hideLoading();
            },500);
        }else{

            var strMsgSend_136 = GCMAPI.doCreate_gcmMsg_136_GetConnect(wx.getStorageSync('location').latitude,wx.getStorageSync('location').longitude);
            GZK_Coder.doSendMsgWXSMA(strMsgSend_136,this.onMsgCallBack_136);

        }

    },
    onMsgCallBack_136:function (jsonBack){
        if(jsonBack.intStatus==0){
            this.setData({
                current_CityText:jsonBack.strMergerName,
                current_CityTextID:jsonBack.intCityID
            });
        }else{
            this.setData({
                current_CityText:'中国全境',
                current_CityTextID:100000
            });
        }
        var strMsgSend = GCMAPI.doCreate_gcmMsg_128_GetConnect(wx.getStorageSync('strWXOpenID'));
        GZK_Coder.doSendMsgWXSMA(strMsgSend,this.onMsgCallBack_128);
    },
    onMsgCallBack_128:function (jsonBack){
        var conductors=this.data.conductors.length;
        for(var i=0;i<conductors;i++){
            //如果字符串中不包含目标字符会返回-1
            if(this.data.conductors[i].text==(jsonBack.floatCarLength==0?'其他车长':(jsonBack.floatCarLength==999?'其他车长':jsonBack.floatCarLength+'米'))){
                this.setData({
                    id:i,
                    carType_ID:i,
                    cValue:(jsonBack.floatCarLength==0?'其他车长':(jsonBack.floatCarLength==999?'其他车长':jsonBack.floatCarLength+'米')),
                    cLength:(jsonBack.floatCarLength==0?999:jsonBack.floatCarLength),
                    carType_CarLength:(jsonBack.floatCarLength==0?999:jsonBack.floatCarLength)
                })
            }
        }
        this.setData({
            cityText:(jsonBack.strFromAreaDesc==''?this.data.current_CityText:jsonBack.strFromAreaDesc),
            cityTextID:(jsonBack.intFromAreaID==0?this.data.current_CityTextID:jsonBack.intFromAreaID),
            cityText2:(jsonBack.strToAreaDesc==''?'中国全境':jsonBack.strToAreaDesc),
            cityText2ID:(jsonBack.intToAreaID==0?100000:jsonBack.intToAreaID),
            transitPoint:jsonBack.strOtherToAreaDesc,
            nameGoods: jsonBack.strGoodsName,
            goodsWeight:(jsonBack.intGoodsWeight==0?'':jsonBack.intGoodsWeight),
            volumeGoods:(jsonBack.intGoodsCubic==0?'':jsonBack.intGoodsCubic),
            nameCompany:(jsonBack.strCompanyName==''?wx.getStorageSync('strUserData').strCompanyName:jsonBack.strCompanyName),
            dateValue:DATE.formatTime(new Date().getTime(),'Y-M-D'),

            vehicle_Parameters:(jsonBack.floatCarLength==0?'其他车长/':(jsonBack.floatCarLength==999?'其他车长/':jsonBack.floatCarLength+'米/'))+(jsonBack.intCarType==0?'其他车型':GZK_Coder.doCarType(jsonBack.intCarType)),
            contact:(jsonBack.strUserName==''?wx.getStorageSync('strUserData').strUserAlias:jsonBack.strUserName),
            publish_Freight:(jsonBack.intFreightPrice==0?'':jsonBack.intFreightPrice),
            contactPhoneNumber:wx.getStorageSync('strUserData').strPhoneNumber,
            note:jsonBack.strRemark,
            mID:(jsonBack.intCarType==999?0:jsonBack.intCarType),
            carType_mID:(jsonBack.intCarType==0?999:jsonBack.intCarType),
            carType_mValue:GZK_Coder.doCarType((jsonBack.intCarType==0?999:jsonBack.intCarType)),
            mValue:GZK_Coder.doCarType((jsonBack.intCarType==0?999:jsonBack.intCarType))
        });
        setTimeout(function (){
            wx.hideLoading();
        },500);
    },
    clearInput_City: function () {
        this.setData({
            'city.inputVal_City': "",
            'city.inputShowed_City': true,
            'city.searchHide': true
        });
    },
    inputTyping_City: function (e) {
        var len = CITY.citylist.length;
        var arr = [];
        var reg = new RegExp(e.detail.value);
        for(var i=0;i<len;i++){
            //如果字符串中不包含目标字符会返回-1
            if(CITY.citylist[i].s.match(reg)){
                arr.push(CITY.citylist[i]);
            }
        }
        this.setData({
            'city.inputVal_City': e.detail.value,
            'city.searchHide': false
        });
    },
    // 点击选择类型
    select_ChooseConductor:function(e){
        var id = e.currentTarget.dataset.id;  //获取自定义的ID值
        var cText=this.data.conductors[id].text;
        var that=this;
        that.setData({
            id:id,
            cValue:cText,
            cLength:this.data.conductors[id].value
        })
    },
    select_Models:function(e){
        var id = e.currentTarget.dataset.id;  //获取自定义的ID值
        var mText=this.data.models[id].text;
        var that=this;
        that.setData({
            mID:id,
            mValue:mText
        })
    },
    //地区选择
    openLoginPannel:function(e){
        var that=this;
        var arrayHotArea=[];
        var strMsgSend ='';
        if(e.currentTarget.dataset.region==0){
            strMsgSend = GCMAPI.doCreate_gcmMsg_132_GetConnect(0);
        }else{
            strMsgSend = GCMAPI.doCreate_gcmMsg_132_GetConnect(2);
        }
        wx.request({
            url: GZK_Coder.xcx_Address(),
            data:'sa='+new GZK_Coder.Base64().encode(strMsgSend),
            dataType: 'text',
            responseType: 'text',
            header:{
                'content-type':'application/x-www-form-urlencoded'
            },
            method: 'POST',
            success: function (res) {
                var jsonTemp=new GZK_Coder.Base64().decode_json(res.data);
                arrayHotArea=jsonTemp.arrayHotArea;
                that.loginCity.show(e.currentTarget.dataset.region,arrayHotArea);
            }
        });
        this.setData({
            showModalStatus:true,
            region:parseInt(e.currentTarget.dataset.region)
        })

    },
    /** 日期 **/
    datePickerBindchange:function(e){
        this.setData({
            dateValue:e.detail.value
        })
    },
    /** 发布 **/
    getInputValue:function (e){
        if(e.currentTarget.dataset.name=='transitPoint'){
            this.setData({
                transitPoint:e.detail.value
            })
        }else if(e.currentTarget.dataset.name=='nameGoods'){
            this.setData({
                nameGoods:e.detail.value
            })
        }else if(e.currentTarget.dataset.name=='goodsWeight'){
            this.setData({
                goodsWeight:e.detail.value
            })
        }else if(e.currentTarget.dataset.name=='volumeGoods'){
            this.setData({
                volumeGoods:e.detail.value
            })
        }else if(e.currentTarget.dataset.name=='nameCompany'){
            this.setData({
                nameCompany:e.detail.value
            })
        }else if(e.currentTarget.dataset.name=='contact'){
            this.setData({
                contact:e.detail.value
            })
        }else if(e.currentTarget.dataset.name=='contactPhoneNumber'){
            this.setData({
                contactPhoneNumber:e.detail.value
            })
        }else if(e.currentTarget.dataset.name=='freight') {
            this.setData({
                publish_Freight: e.detail.value
            })
        }else{
            this.setData({
                note:e.detail.value
            })
        }

    },
    publishGoods:function () {
        var that = this;
        if (this.data.cityText == '' || this.data.cityText2 == '' || this.data.vehicle_Parameters == '' || this.data.contact == ''|| this.data.dateValue == ''||that.data.contactPhoneNumber=='') {
            wx.showToast({
                title: '带 * 号均为必填项资料，请检查后再次提交',
                icon: 'none',
                duration: 3000
            })
        }else if(that.data.contactPhoneNumber.length!=11){
            wx.showToast({
                title: '电话号码输入不正确',
                icon: 'none',
                duration: 3000
            })
        }else if(this.data.cityTextID==100000){
    wx.showToast({
        title: '发货地区不能为中国全境',
        icon: 'none',
        duration: 3000
    })
        }else if(this.data.cityText2ID==100000){
            wx.showToast({
                title: '收货地区不能为中国全境',
                icon: 'none',
                duration: 3000
            })
        }else if(GZK_Coder.checkPhone(that.data.contactPhoneNumber)==false){
            wx.showToast({
                title: '联系人电话输入有误，请检查',
                icon: 'none',
                duration: 3000
            });
        }else{
            wx.showModal({
                title: '温馨提示',
                content: '确定发布货源吗？',
                success: function(res) {
                    if (res.confirm) {
                        var strMsgSend = GCMAPI.doCreate_gcmMsg_112_GetConnect(GZK_Coder.doTurnTimestamp(that.data.dateValue),that.data.carType_CarLength,(that.data.carType_mID==0?999:that.data.carType_mID),parseInt((that.data.publish_Freight==''?0:that.data.publish_Freight)),parseInt(that.data.cityTextID),(that.data.volumeGoods==''?0:parseInt(that.data.volumeGoods)),(that.data.goodsWeight==''?0:parseInt(that.data.goodsWeight)),parseInt(that.data.cityText2ID),that.data.nameCompany,that.data.contactPhoneNumber,that.data.nameGoods,that.data.transitPoint,wx.getStorageSync('strUserSysID'),that.data.note,that.data.contact,wx.getStorageSync('strWXOpenID'));
                        console.log(strMsgSend)
                        GZK_Coder.doSendMsgWXSMA(strMsgSend,that.onMsgCallBack_112);

                    }
                }
            })
        }

    },
    onMsgCallBack_112:function (jsonBack) {
        var that=this;
        if(jsonBack.intUpdateStatus==0){
            // wx.showModal({
            //     title: '温馨提示',
            //     content: '您的货源信息已成功发布',
            //     cancelText:'再发一条',
            //     confirmText:'返回首页',
            //     success: function(res) {
            //         if (res.confirm) {
            //             if(wx.getStorageSync('strInformation')=='strInformation'){
            //                 wx.navigateBack({
            //                     delta: 3
            //                 });
            //             }else{
            //                 wx.navigateBack({
            //                     delta: 1
            //                 });
            //             }
            //
            //         } else if (res.cancel) {
            //             wx.showLoading({
            //                 title: '加载中...'
            //             });
            //             setTimeout(function () {
            //                 wx.hideLoading();
            //             },1500);
            //         }
            //     }
            // })
            wx.navigateTo({
                url: '/pages/publish_success/publish_success?publish=1'
            });
        }else if(jsonBack.intUpdateStatus==3){
            wx.showModal({
                title: '温馨提示',
                content: '请勿在短时间内重复发布信息',
                cancelText:'重新编辑',
                confirmText:'返回首页',
                success: function(res) {
                    if (res.confirm) {
                        wx.reLaunch({
                            url: '/pages/index/index'
                        });
                    } else if (res.cancel) {

                    }
                }
            })
        }else{
            wx.showModal({
                title: '温馨提示',
                content: '您的货源信息发布失败',
                cancelText:'再试一次',
                confirmText:'返回首页',
                success: function(res) {
                    if (res.confirm) {
                        wx.reLaunch({
                            url: '/pages/index/index'
                        });
                    } else if (res.cancel) {

                    }
                }
            })
        }

    },
    /** 自定义弹出框 **/
    powerDrawer2: function (e) {
        var currentStatu = e.currentTarget.dataset.statu;
        this.setData({
            carType_ID:this.data.id,
            carType_mID:this.data.mID,
            carType_cValue:this.data.cValue,
            carType_CarLength:this.data.cLength,
            isScroll:false,
            carType_mValue:this.data.mValue
        });
        this.util2(currentStatu);
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
                    vehicle_Parameters:this.data.cValue+'/'+this.data.mValue
                });
            }
        }.bind(this), 200);

        // 显示
        if (currentStatu == "open") {
            this.setData({
                    vehicleParameters: true
                }
            );
        }
    },

    powerDrawerClose: function (e) {
        this.utilClose('close');
        this.setData({
            id:this.data.carType_ID,
            cValue:this.data.carType_cValue,
            cLength:this.data.carType_CarLength,
            mID:this.data.carType_mID,
            mValue:this.data.carType_mValue
        })
    },
    utilClose: function(currentStatu){
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
                    vehicleParameters: false
                });
            }
        }.bind(this), 200);

        // 显示
        if (currentStatu == "open") {
            this.setData({
                    vehicleParameters: true
                });
        }
    },

    powerDrawer: function (e) {
        var currentStatu = e.currentTarget.dataset.statu;
        this.util(currentStatu);
        this.setData({
            carType_ID:this.data.id,
            carType_mID:this.data.mID,
            carType_cValue:this.data.cValue,
            carType_CarLength:this.data.cLength,
            isScroll:false,
            carType_mValue:this.data.mValue
        })
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
    }
});