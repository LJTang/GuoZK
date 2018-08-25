import CITY from '../../utils/city.js';
import DATE from '../../utils/util.js';
import GCMAPI from '../../script/gzk_MsgApi/gcm_api.js';
import GZK_Coder from '../../script/gzk_MsgApi/gzk_script_coder.js';
var app = getApp();
var id;
Page({
    data:{
        page_Hide:true,
        inputVal: "",
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
        vehicleParameters: false,
        carPlateNumber_Bool: false,
        car_Hide:true,
        company_Hide:true,
        contactPhoneNumber:'',
        strUserName:'',
        strCompanyName:'',
        strCarPlateNumber:'',
        identity:'',
        intUserType:null,
        bounced_Height:0,
        text1:'',
        text2:'',
        text3:'',
        text4:'',
        text5:'',
        text6:'',
        text7:'',
        select_ID:0,
        am_Hide:true,
        nz_Hide:false,
        shorthand_Bool:true,
        letter_Bool:false,
        number_Hide:true,
        letter_Hide:false,
        az:'am',
        gzk_FloatALLCash:null,
        gzk_AvailableSunshine:null,
        gzk_FloatUserCash :null,
    },
    onLoad: function () {
        new app.Region();
        var sysinfo=wx.getSystemInfoSync();
        var that=this;
        wx.showLoading({
            title: '加载中...'
        });
        wx.getSystemInfo({
            success: function(res) {
                that.setData({
                    bounced_Height:res.windowHeight*0.8
                });
            }
        });
        wx.setNavigationBarTitle({
            title: '个人中心'
        });
        var strMsgSend = GCMAPI.doCreate_gcmMsg_104_GetConnect(wx.getStorageSync('strWXOpenID'));
        GZK_Coder.doSendMsgWXSMA(strMsgSend,this.onMsgCallBack_104);
    },

    onMsgCallBack_104:function (jsonBack){
        if(jsonBack.intUserType==2){
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
                car_Hide:false,
                company_Hide:true,
                vehicle_Parameters:(jsonBack.floatCarLength==0?'其他车长/':(jsonBack.floatCarLength==999?'其他车长/':jsonBack.floatCarLength+'米/'))+(jsonBack.intCarType==0?'其他车型':GZK_Coder.doCarType(jsonBack.intCarType)),
                strCarPlateNumber:jsonBack.strCarPlateNumber,
                mID:(jsonBack.intCarType==999?0:jsonBack.intCarType),
                carType_mID:(jsonBack.intCarType==0?999:jsonBack.intCarType),
                carType_mValue:GZK_Coder.doCarType((jsonBack.intCarType==0?999:jsonBack.intCarType)),
                mValue:GZK_Coder.doCarType((jsonBack.intCarType==0?999:jsonBack.intCarType))
            });
        }else{
            this.setData({
                strCompanyName:jsonBack.strCompanyName,
                car_Hide:true,
                company_Hide:false
            });
        }
        this.setData({
            page_Hide:false,
            strUserName:jsonBack.strUserAlias,
            contactPhoneNumber:jsonBack.strPhoneNumber,
            identity:jsonBack.strUserTypeDesc,
            intUserType:jsonBack.intUserType,
            gzk_FloatALLCash:jsonBack.floatALLCash,
            gzk_AvailableSunshine:jsonBack.floatGZKSysCash,
            gzk_FloatUserCash :parseFloat(jsonBack.floatUserCash).toFixed(0)
        });
        wx.hideLoading();
    },

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
    /** input值 **/
    getInputValue:function (e) {
        if(e.currentTarget.dataset.name=='userName'){
            this.setData({
                strUserName:GZK_Coder.doREG_Word(e.detail.value)
            });

        }else if(e.currentTarget.dataset.name=='carPlateNumber'){
            this.setData({
                strCarPlateNumber:e.detail.value
            })
        }else if(e.currentTarget.dataset.name=='contactPhoneNumber'){
            this.setData({
                contactPhoneNumber:e.detail.value
            })
        }else if(e.currentTarget.dataset.name=='companyName'){
            this.setData({
                strCompanyName:e.detail.value
            })
        }else{
            this.setData({
                note:e.detail.value
            })
        }

    },
    /** 保存 **/
    onSave:function (e) {
        var that=this;
        if(that.data.intUserType==2){
            if(that.data.strUserName==''){
                wx.showToast({
                    title: '用户昵称未填写',
                    icon: 'none',
                    duration: 3000
                })
            }else if(that.data.strCarPlateNumber==''){
                wx.showToast({
                    title: '车牌号码未填写',
                    icon: 'none',
                    duration: 3000
                })
            }else{
                wx.showModal({
                    title: '温馨提示',
                    content: '确定保存修改吗？',
                    success: function(res) {
                        if (res.confirm) {
                            var strMsgSend = GCMAPI.doCreate_gcmMsg_138_GetConnect(that.data.carType_CarLength,(that.data.carType_mID==0?999:that.data.carType_mID),that.data.strCarPlateNumber,'',that.data.strUserName,wx.getStorageSync('strWXOpenID'));
                            GZK_Coder.doSendMsgWXSMA(strMsgSend,that.onMsgCallBack_138);
                        }
                    }
                })
            }
        }else{
            if(that.data.strUserName==''){
                wx.showToast({
                    title: '用户昵称未填写',
                    icon: 'none',
                    duration: 3000
                })
            }else{
                wx.showModal({
                    title: '温馨提示',
                    content: '确定保存修改吗？',
                    success: function(res) {
                        if (res.confirm) {
                            var strMsgSend = GCMAPI.doCreate_gcmMsg_138_GetConnect(0,0,'',that.data.strCompanyName,that.data.strUserName,wx.getStorageSync('strWXOpenID'));
                            GZK_Coder.doSendMsgWXSMA(strMsgSend,that.onMsgCallBack_138);
                        }
                    }
                })
            }
        }

    },
    onMsgCallBack_138:function (jsonBack){
        var that=this;
        if(jsonBack.intStatus==1){
            wx.showToast({
                title: '保存成功',
                icon: 'none',
                duration: 3000
            });
        }else{
            wx.showToast({
                title: '保存失败',
                icon: 'none',
                duration: 3000
            })
        }

    },

    //消费记录
    doExpense_Calendar:function () {
        wx.navigateTo({
            url: "/pages/gzk_expense_calendar/gzk_expense_calendar"
        });
    },
    /** 车型弹出框 **/
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
    /** 车牌弹出框 **/
    powerDrawer_CarPlateNumber:function (e) {
        var statu = e.currentTarget.dataset.statu;
        var strCarPlateNumber = this.data.strCarPlateNumber;
        this.util(statu);
        this.setData({
            text1:(strCarPlateNumber==''?'':strCarPlateNumber[0]),
            text2:(strCarPlateNumber==''?'':strCarPlateNumber[1]),
            text3:(strCarPlateNumber==''?'':strCarPlateNumber[3]),
            text4:(strCarPlateNumber==''?'':strCarPlateNumber[4]),
            text5:(strCarPlateNumber==''?'':strCarPlateNumber[5]),
            text6:(strCarPlateNumber==''?'':strCarPlateNumber[6]),
            text7:(strCarPlateNumber==''?'':strCarPlateNumber[7])
        })
    },
    powerDrawerClose_CarPlateNumber:function (e) {
        var statu = e.currentTarget.dataset.statu;
        var strCarPlateNumber = this.data.strCarPlateNumber;
        this.util(statu);
    },
    //切换键盘
    onSwitch:function (e){
        var id = e.currentTarget.dataset.statu;  //获取自定义的ID值
        this.setData({
            select_ID:parseInt(id)
        });
        if(parseInt(id)==0) {
            this.setData({
                az: 'am',
                am_Hide: true,
                nz_Hide: false,
                shorthand_Bool: true,
                letter_Bool: false,
                number_Hide: true,
                letter_Hide: true
            })
        }else if(parseInt(id)==1){
            this.setData({
                am_Hide:true,
                nz_Hide:true,
                shorthand_Bool:false,
                letter_Bool:true,
                number_Hide:true,
                letter_Hide:false
            })
        }else{
            this.setData({
                am_Hide:true,
                nz_Hide:true,
                shorthand_Bool:false,
                letter_Bool:true,
                letter_Hide:this.data.letter_Hide
            })
        }
    },
    //点击取值
    onClickValue:function (e){
        if(this.data.select_ID==0){
            this.setData({
                text1:e.currentTarget.dataset.text,
                select_ID:(this.data.select_ID==6?6:this.data.select_ID+1),
                am_Hide:true,
                nz_Hide:true,
                shorthand_Bool:false,
                letter_Bool:true,
                number_Hide:true,
                letter_Hide:false
            });
        }else if(this.data.select_ID==1){
            this.setData({
                text2:e.currentTarget.dataset.text,
                select_ID:(this.data.select_ID==6?6:this.data.select_ID+1),
                am_Hide:true,
                nz_Hide:true,
                shorthand_Bool:false,
                letter_Bool:true,
                number_Hide:true,
                letter_Hide:false
            });
        }else if(this.data.select_ID==2){
            this.setData({
                text3:e.currentTarget.dataset.text,
                select_ID:(this.data.select_ID==6?6:this.data.select_ID+1),
                am_Hide:true,
                nz_Hide:true,
                shorthand_Bool:false,
                letter_Bool:true
            });
        }else if(this.data.select_ID==3){
            this.setData({
                text4:e.currentTarget.dataset.text,
                select_ID:(this.data.select_ID==6?6:this.data.select_ID+1),
                am_Hide:true,
                nz_Hide:true,
                shorthand_Bool:false,
                letter_Bool:true
            });
        }else if(this.data.select_ID==4){
            this.setData({
                text5:e.currentTarget.dataset.text,
                select_ID:(this.data.select_ID==6?6:this.data.select_ID+1),
                am_Hide:true,
                nz_Hide:true,
                shorthand_Bool:false,
                letter_Bool:true
            });
        }else if(this.data.select_ID==5){
            this.setData({
                text6:e.currentTarget.dataset.text,
                select_ID:(this.data.select_ID==6?6:this.data.select_ID+1),
                am_Hide:true,
                nz_Hide:true,
                shorthand_Bool:false,
                letter_Bool:true
            });
        }else if(this.data.select_ID==6){
            this.setData({
                text7:e.currentTarget.dataset.text,
                select_ID:(this.data.select_ID==6?6:this.data.select_ID+1),
                am_Hide:true,
                nz_Hide:true,
                shorthand_Bool:false,
                letter_Bool:true
            });
        }else{
            return;
        }
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
        animation.opacity(0).translateY(200).step();
        // 第4步：导出动画对象赋给数据对象储存
        this.setData({
            animationData: animation.export()
        });

        // 第5步：设置定时器到指定时候后，执行第二组动画
        setTimeout(function () {
            // 执行第二组动画
            animation.opacity(1).translateY(0).step();
            // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象
            this.setData({
                animationData: animation
            });
            //关闭
            if (currentStatu == "close") {
                this.setData({
                    carPlateNumber_Bool:false,
                    strCarPlateNumber:(this.data.text1==''&&this.data.text2==''&&this.data.text3==''&&this.data.text4==''&&this.data.text5==''&&this.data.text6==''&&this.data.text7==''?'':this.data.text1+this.data.text2+'•'+this.data.text3+this.data.text4+this.data.text5+this.data.text6+this.data.text7)
                });
            }
        }.bind(this), 200);

        // 显示
        if (currentStatu == "open") {
            this.setData({
                carPlateNumber_Bool: true
            });
        }
    },
    //地区文字切换
    onLettersTo_Switch:function (e){
        var text = e.currentTarget.dataset.text;  //获取自定义的ID值
        this.setData({
            az:text
        });
        if(text=='am'){
            this.setData({
                am_Hide:true,
                nz_Hide:false,
                shorthand_Bool:true,
                letter_Bool:false,
                number_Hide:true,
                letter_Hide:true
            })
        }else{
            this.setData({
                am_Hide:false,
                nz_Hide:true,
                shorthand_Bool:true,
                letter_Bool:false,
                number_Hide:true,
                letter_Hide:true
            })
        }
    },
    //数字英文
    onAccording_To:function (e){
        var id = e.currentTarget.dataset.statu;
        if(parseInt(id)==0){
            this.setData({
                am_Hide:true,
                nz_Hide:true,
                shorthand_Bool:false,
                letter_Bool:true,
                number_Hide:(this.data.select_ID==1?true:false),
                letter_Hide:(this.data.select_ID==1?false:true)
            });
        }else{
            this.setData({
                am_Hide:true,
                nz_Hide:true,
                shorthand_Bool:false,
                letter_Bool:true,
                number_Hide:true,
                letter_Hide:false
            })
        }
    }
});