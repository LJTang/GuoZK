import DATE from '../../utils/util.js';
import GCMAPI from '../../script/gzk_MsgApi/gcm_api.js';
import GZK_Coder from '../../script/gzk_MsgApi/gzk_script_coder.js';
var app = getApp();
Page({
    data:{
        hide:true,
        cityText:'中国全境',
        cityTextID:100000,
        cityMergerName:'中国全境',
        cityID:100000,
        id:11,
        mID:1,
        cValue:'15米',
        cLength:15,
        mValue:'冷藏车',
        carType_ID:0,
        carType_mID:0,
        carType_CarLength:15,
        carType_cValue:'其他车长',
        carType_mValue:'其他车型',
        vehicle_Parameters:'15米/冷藏车',
        conductors:[{'text':'其他车长','value':999},{'text':'4.2米','value':4.2},{'text':'5.8米','value':5.8},{'text':'6.8米','value':6.8},{'text':'7.2米','value':7.2},{'text':'7.6米','value':7.6},{'text':'8.6米','value':8.6},{'text':'9.6米','value':9.6},{'text':'12.5米','value':12.5},{'text':'13米','value':13},{'text':'13.7米','value':13.7},{'text':'15米','value':15},{'text':'17.5米','value':17.5}],
        models:[{text:'其他车型'},{text:'冷藏车'},{text:'高栏车'},{text:'冷藏肉挂车'},{text:'保温车'},{text:'箱车'},{text:'平板车'},{text:'集装箱'},{text:'海柜'}],
        vehicleParameters:false,
        inputShowed: true,
        inputVal:'',
        scrollTop:0,
        intPageIndex:0,
        strSearchValue:'',
        location:null,
        showModalStatus: false,
        noMoreHidden: true,
        loadMoreHidden: true,
        inLoadHidden: false,
        GoodsArr:[],
        array_HotStruts:[true,false],
        height:0,
        bounced_Height:0,
        userID:''
    },
    onShareAppMessage: function (res) {
        if (res.from === 'button') {
            return {
                title: '果真快信息通',
                path: '/pages/find_information/find_information?id='+this.data.userID,
                success: function(res) {
                    // 转发成功
                    console.log('WXID: '+wx.getStorageSync('strWXOpenID'),res)
                },
                fail: function(res) {
                    // 转发失败
                }
            }
        }

    },
    onLoad:function (options){
        var _this=this;
        new app.Region();
        wx.setNavigationBarTitle({
            title:'智能配货'
        });

        wx.getSystemInfo({
            success: function(res) {
                _this.setData({
                    height:res.windowHeight-183,
                    bounced_Height:res.windowHeight*0.8
                });
            }
        });
        var strMsgSend_136 = GCMAPI.doCreate_gcmMsg_136_GetConnect(wx.getStorageSync('location').latitude,wx.getStorageSync('location').longitude);
        GZK_Coder.doSendMsgWXSMA(strMsgSend_136,_this.onMsgCallBack_136);
    },
    onMsgCallBack_136:function (jsonBack){
        if(jsonBack.intStatus==0){
            this.setData({
                hide:false,
                cityID:jsonBack.intCityID,
                cityMergerName:jsonBack.strMergerName
            });
        }else{
            this.setData({
                hide:false,
                cityID:100000,
                cityMergerName:'中国全境'
            });
        }
        var strMsgSend_152 = GCMAPI.doCreate_gcmMsg_152_GetConnect(wx.getStorageSync('strWXOpenID'));
        GZK_Coder.doSendMsgWXSMA(strMsgSend_152,this.onMsgCallBack_152);
    },
    onMsgCallBack_152:function (jsonBack){
        if(jsonBack.intStatus==1){
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
                // cityText:(jsonBack.strFromAreaDesc==''?this.data.cityMergerName:jsonBack.strFromAreaDesc),
                cityText:(this.data.cityMergerName=='中国全境'?jsonBack.strFromAreaDesc:this.data.cityMergerName),
                cityTextID:(this.data.cityID==100000?jsonBack.intFromAreaID:this.data.cityID),
                vehicle_Parameters:(jsonBack.floatCarLength==0?'其他车长/':(jsonBack.floatCarLength==999?'其他车长/':jsonBack.floatCarLength+'米/'))+(jsonBack.intCarType==0?'其他车型':GZK_Coder.doCarType(jsonBack.intCarType)),
                mID:(jsonBack.intCarType==999?0:jsonBack.intCarType),
                carType_mID:(jsonBack.intCarType==0?999:jsonBack.intCarType),
                carType_mValue:GZK_Coder.doCarType((jsonBack.intCarType==0?999:jsonBack.intCarType)),
                mValue:GZK_Coder.doCarType((jsonBack.intCarType==0?999:jsonBack.intCarType))
            });

        }else{
            this.setData({
                cityText:this.data.cityMergerName,
                cityTextID:this.data.cityID,
                id:11,
                mID:1,
                cValue:'15米',
                cLength:15,
                mValue:'冷藏车',
                carType_ID:0,
                carType_mID:0,
                carType_CarLength:15,
                // carType_cValue:'其他车长',
                // carType_mValue:'其他车型',
                vehicle_Parameters:'15米/冷藏车'
            });
        }
        this.onGetConnect();

    },

    onGetConnect:function (){
        this.setData({
            hide:false,
            noMoreHidden: true,
            loadMoreHidden: true,
            inLoadHidden: false
        });
        if(this.data.carType_CarLength==0||this.data.carType_CarLength==999||this.data.carType_mID==0||this.data.carType_mID==999){
            wx.showToast({
                title: '请选择具体的车长车型',
                icon: 'none',
                duration: 3000
            });

            this.setData({
                hide:false,
                noMoreHidden: false,
                loadMoreHidden: true,
                inLoadHidden: true
            });
        }else{
            var strMsgSend = GCMAPI.doCreate_gcmMsg_148_GetConnect(this.data.carType_CarLength,(this.data.carType_mID==0?999:this.data.carType_mID),parseInt(this.data.cityTextID),this.data.cityText,this.data.intPageIndex,wx.getStorageSync('strWXOpenID'));

            GZK_Coder.doSendMsgWXSMA(strMsgSend,this.onMsgCallBack_148);
        }

    },
    //
    onMsgCallBack_148:function (jsonBack){

        var goods=this.data.GoodsArr;

        for(var i=0;i<jsonBack.arrayInfotomGoods.length;i++){
            goods.push(jsonBack.arrayInfotomGoods[i]);
        }
        this.setData({
            GoodsArr:goods
        });

        if(jsonBack.arrayInfotomGoods.length==0){
            this.setData({
                noMoreHidden: false,
                loadMoreHidden: true,
                inLoadHidden: true
            });
        }else{
            this.data.intPageIndex++;
            var that=this;
            that.setData({
                noMoreHidden: true,
                loadMoreHidden: false,
                inLoadHidden: true
            })
        }
    },
    //车型选择
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
            strMsgSend = GCMAPI.doCreate_gcmMsg_132_GetConnect(1);
        }else{
            strMsgSend = GCMAPI.doCreate_gcmMsg_132_GetConnect(3);
        }

        wx.request({
            url: GZK_Coder.xcx_Address(),
            data:'sa='+new GZK_Coder.Base64().encode(strMsgSend),
            dataType: 'text',
            responseType: 'text',
            header: {
                'content-type':'application/x-www-form-urlencoded'
            },
            method: 'POST',
            success: function (res) {
                var jsonTemp=new GZK_Coder.Base64().decode_json(res.data);
                arrayHotArea=jsonTemp.arrayHotArea;
                that.loginCity.show(e.currentTarget.dataset.region,arrayHotArea);
            }
        });

        // GZK_Coder.doSendMsgWXSMA(strMsgSend,this.onMsgCallBack_132);
        var cityID=this.data.cityTextID;
        this.setData({
            showModalStatus:true,
            region:parseInt(e.currentTarget.dataset.region),
            cityText: this.loginCity.__page.data.cityText,
            cityTextID: this.loginCity.__page.data.cityTextID
        });
        var timer=setInterval(function () {
            if(that.data.showModalStatus==false){
                if(cityID!=that.data.cityTextID){
                    that.setData({
                        GoodsArr:[],
                        scrollTop:0,
                        intPageIndex:0,
                        inLoadHidden:false,
                        noMoreHidden: true,
                        loadMoreHidden: true
                    });

                    var strMsgSend = GCMAPI.doCreate_gcmMsg_148_GetConnect(that.data.carType_CarLength,(that.data.carType_mID==0?999:that.data.carType_mID),parseInt(that.data.cityTextID),that.data.cityText,that.data.intPageIndex,wx.getStorageSync('strWXOpenID'));

                    GZK_Coder.doSendMsgWXSMA(strMsgSend,that.onMsgCallBack_148);
                }
                clearTimeout(timer)
            }

        },1000);
    },
    clearInput_City: function () {
        this.setData({
            'city.inputVal_City': "",
            'city.inputShowed_City': true,
            'city.searchHide': true
        });
    },

    upper: function(e) {},
    lower: function(e) {
        this.setData({
            noMoreHidden: true,
            loadMoreHidden: true,
            inLoadHidden: false
        });
        this.onGetConnect();
    },
    scroll: function (){},
    tap: function (e){},
    tapMove: function (e){},
    // 货源详情
    previousPage:function (){
        wx.navigateBack({
            delta:1
        });
    },
    onHome:function (){
        wx.navigateBack({
            delta:2
        });
    },
    /** 自定动画 **/
    powerDrawer2:function (e) {
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
                    vehicle_Parameters:this.data.cValue+'/'+this.data.mValue,
                    GoodsArr:[],
                    intPageIndex:0
                });
                this.onGetConnect();
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
    findInformation:function(e){
        var strInfoSysID=e.currentTarget.dataset.statu;
        var type=e.currentTarget.dataset.type;

        wx.navigateTo({
            url: '/pages/find_information/find_information?id=' + wx.getStorageSync('strWXOpenID') + '&sysID=' + strInfoSysID + '&type=' + type + '&intHistory=1'+ '&intList=999'+'&share=0'
        });

    }
});
