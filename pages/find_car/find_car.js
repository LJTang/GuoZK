import GCMAPI from '../../script/gzk_MsgApi/gcm_api.js';
import GZK_Coder from '../../script/gzk_MsgApi/gzk_script_coder.js';
var app = getApp();
// var intPageIndex=0;
Page({
    data:{
        bound:null,
        inputShowed: true,
        inputVal:'',
        scrollTop:0,
        intPageIndex:0,
        strSearchValue:'',
        cityTextID:100000,
        cityText2ID:100000,
        cityText:"中国全境",
        cityText2:"中国全境",
        find_CityText:"中国全境",
        find_CityText2:"中国全境",
        location:null,
        showModalStatus: false,
        loadingHidden: false,
        noMoreHidden: true,
        loadMoreHidden: true,
        inLoadHidden: false,
        cars:[],
        array_HotStruts:[true,false],
        height:0
    },
    onLoad: function (){
        new app.Region();
        var _this=this;
        wx.setNavigationBarTitle({
            title: '车源列表'
        });
        _this.setData({
            loadingHidden:true
        });

        wx.getSystemInfo({
            success: function(res) {
                _this.setData({
                    height:res.windowHeight-116
                });
            }
        });

        if(app.data.carORGoods_Bool==false){
            var strMsgSend_136 = GCMAPI.doCreate_gcmMsg_136_GetConnect(wx.getStorageSync('location').latitude,wx.getStorageSync('location').longitude);
            GZK_Coder.doSendMsgWXSMA(strMsgSend_136,_this.onMsgCallBack_136);
        }

    },
    onShow: function() {
        if(app.data.carORGoods_Bool==true){
            this.setData({
                cars:[],
                scrollTop:0,
                intPageIndex:0
            });
            this.onGetConnect();
            app.data.carORGoods_Bool=false;
        }
    },
    onMsgCallBack_136:function (jsonBack){
        if(jsonBack.intStatus==0){
            this.setData({
                cityTextID:jsonBack.intProvCityID,
                cityText:jsonBack.strProvMergerName,
                find_CityText:jsonBack.strProvMergerName
            });
        }else{
            this.setData({
                cityTextID:100000,
                cityText:'中国全境',
                find_CityText:'中国全境'
            });
        }
        this.onGetConnect();
    },
    onGetConnect:function (){
        this.setData({
            noMoreHidden: true,
            loadMoreHidden: true,
            inLoadHidden: false
        });
        var strMsgSend = GCMAPI.doCreate_gcmMsg_116_GetConnect(0,0,parseInt(this.data.cityTextID),this.data.intPageIndex,1,parseInt(this.data.cityText2ID),this.data.strSearchValue,wx.getStorageSync('strWXOpenID'));
        GZK_Coder.doSendMsgWXSMA(strMsgSend,this.onMsgCallBack_116);
    },
    onSearch:function (){
        this.data.intPageIndex=0;
        this.setData({
            cars:[],
            scrollTop:0,
            noMoreHidden: true,
            loadMoreHidden: true,
            inLoadHidden: false
        });

        var strMsgSend = GCMAPI.doCreate_gcmMsg_116_GetConnect(0,0,parseInt(this.data.cityTextID),this.data.intPageIndex,1,parseInt(this.data.cityText2ID),this.data.strSearchValue,wx.getStorageSync('strWXOpenID'));
        GZK_Coder.doSendMsgWXSMA(strMsgSend,this.onMsgCallBack_116);
    },

    onMsgCallBack_116:function (jsonBack){
        var cars=this.data.cars;

        for(var i=0;i<jsonBack.arrayInfotomCar.length;i++){
            cars.push(jsonBack.arrayInfotomCar[i]);
        }
        this.setData({
            cars:cars,
            loadingHidden:true
        });

        if(jsonBack.arrayInfotomCar.length==0){
            // intPageIndex=jsonBack.intPageIndex;
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
    //选择地区
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
        var cityID=this.data.cityTextID;
        var cityToID=this.data.cityText2ID;
        this.setData({
            showModalStatus:true,
            region:parseInt(e.currentTarget.dataset.region),
            cityText: this.loginCity.__page.data.cityText,
            cityTextID: this.loginCity.__page.data.cityTextID
        });
        var timer=setInterval(function () {
            if(that.data.showModalStatus==false){
                if(cityID!=that.data.cityTextID||cityToID!=that.data.cityText2ID){
                    that.setData({
                        cars:[],
                        scrollTop:0,
                        intPageIndex:0,
                        loadingHidden:false,
                        noMoreHidden: true,
                        loadMoreHidden: true
                    });

                    var strMsgSend = GCMAPI.doCreate_gcmMsg_116_GetConnect(0,0,parseInt(that.data.cityTextID),0,1,parseInt(that.data.cityText2ID),that.data.strSearchValue,wx.getStorageSync('strWXOpenID'));
                    GZK_Coder.doSendMsgWXSMA(strMsgSend,that.onMsgCallBack_116);
                }
                clearTimeout(timer)
            }

        },1000);
    },

    getPhoneNumber: function(e) {
        if (e.detail.errMsg == 'getPhoneNumber:fail user deny'){
            wx.showModal({
                title: '温馨提示',
                showCancel: false,
                content: '未授权',
                success: function (res) {}
            })
        } else {
            wx.showModal({
                title: '温馨提示',
                showCancel: false,
                content: '同意授权',
                success: function (res) {}
            })
        }
    },

    showInput: function () {
        this.setData({
            inputShowed: true
        });
    },
    searchInput: function () {},
    clearInput: function (){
        this.setData({
            inputVal: "",
            strSearchValue:'',
            inputShowed: true
        });
        this.onSearch();
    },
    inputTyping: function (e) {
        this.setData({
            inputVal: e.detail.value,
            strSearchValue: e.detail.value
        });
    },
    inputTyping_City: function (e){
        this.setData({
            inputShowed_City: true,
            inputVal_City: e.detail.value,
            strSearchValue: e.detail.value
        });
    },
    searchBtn:function (e){
        this.onSearch();
    },

    /** 自定义弹出框 **/
    powerDrawer: function (e) {
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
                this.setData(
                    {
                        showModalStatus: false
                    }
                );
            }
        }.bind(this), 200)

        // 显示
        if (currentStatu == "open") {
            this.setData(
                {
                    showModalStatus: true
                }
            );
        }
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
    scroll: function() {
        // this.setData({
        //     noMoreHidden: true,
        //     loadMoreHidden: true,
        //     inLoadHidden: false
        // });
    },
    tap: function (e){},
    tapMove: function (e){},
    findInformation:function (e){
        var strInfoSysID=e.currentTarget.dataset.statu;
        wx.setStorage({
            key: 'strInfoSysID',
            data:{strInfoSysID:strInfoSysID,intCarORGoods:2}
        });
        wx.setStorage({
            key: 'intHistory',
            data:0
        });
        // 跳转数量
        wx.setStorage({
            key: 'intList',
            data:2
        });
        wx.navigateTo({
            url: '/pages/find_information/find_information?id='+wx.getStorageSync('strWXOpenID')+'&sysID='+strInfoSysID+'&type=2'+'&intHistory=1'+'&intList=2'+'&share=0'
        });
    },
    f:function (strValue){
        strValue.substring(0,3)+"****"+strValue.substring(8,11)
    }

});