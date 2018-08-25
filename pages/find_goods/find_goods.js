import GCMAPI from '../../script/gzk_MsgApi/gcm_api.js';
import GZK_Coder from '../../script/gzk_MsgApi/gzk_script_coder.js';
var app = getApp();
var goods_array=[];
Page({
    data:{
        // text:"这是一个页面"
        imageH:0,
        picker1Value:0,
        intPageIndex:0,
        inputShowed: true,
        inputVal:'',
        scrollTop:0,
        strSearchValue:'',
        cityTextID:100000,
        cityText2ID:100000,
        cityText:"中国全境",
        cityText2:"中国全境",
        find_CityText:"中国全境",
        find_CityText2:"中国全境",
        location:null,
        showModalStatus: false,
        loadingHidden: true,
        noMoreHidden: true,
        loadMoreHidden: true,
        inLoadHidden: true,
        goods:[],
        array_HotStruts:[true,false],
        height:0

    },
    onLoad: function () {
        new app.Region();
        var _this=this;
        var lonLat=null;
        var sysinfo=wx.getSystemInfoSync();
        wx.setNavigationBarTitle({
            title: '货源列表'
        });
        this.setData({
            loadingHidden:false
        });
        wx.getLocation( {
            success: function( res ) {
                _this.setData( {
                    hasLocation: true,
                    location: {
                        longitude: res.longitude,
                        latitude: res.latitude
                    }
                })
            },
            complete:function(res){
                wx.getLocation( {
                    success: function( res ) {
                        _this.setData( {
                            hasLocation: true,
                            location: {
                                longitude: res.longitude,
                                latitude: res.latitude
                            }
                        })
                    },
                    complete:function(res){
                    }
                });
            }
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
            GZK_Coder.doSendMsgWXSMA(strMsgSend_136,this.onMsgCallBack_136);
        }
    },
    onShow: function() {
        if(app.data.carORGoods_Bool==true){
            this.data.intPageIndex=0;
            this.setData({
                goods:[],
                scrollTop:0,
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
    //列表数据
    onGetConnect:function (){
        this.setData({
            noMoreHidden: true,
            loadMoreHidden: true,
            inLoadHidden: false
        });
        var strMsgSend = GCMAPI.doCreate_gcmMsg_116_GetConnect(0,0,parseInt(this.data.cityTextID),this.data.intPageIndex,0,parseInt(this.data.cityText2ID),this.data.strSearchValue,wx.getStorageSync('strWXOpenID'));
        console.log(strMsgSend)
        GZK_Coder.doSendMsgWXSMA(strMsgSend,this.onMsgCallBack_116);
    },
    onSearch:function (){
        this.data.intPageIndex=0;
        this.setData({
            goods:[],
            scrollTop:0,
            noMoreHidden: true,
            loadMoreHidden: true,
            inLoadHidden: false
        });
        var strMsgSend = GCMAPI.doCreate_gcmMsg_116_GetConnect(0,0,parseInt(this.data.cityTextID),this.data.intPageIndex,0,parseInt(this.data.cityText2ID),this.data.strSearchValue);
        GZK_Coder.doSendMsgWXSMA(strMsgSend,this.onMsgCallBack_116);
    },
    onMsgCallBack_116:function (jsonBack){
        var goods=this.data.goods;
        for(var i=0;i<jsonBack.arrayInfotomGoods.length;i++){
            goods.push(jsonBack.arrayInfotomGoods[i]);
        }
        this.setData({
            goods:goods
        });

        if(jsonBack.arrayInfotomGoods.length==0){
            this.setData({
                noMoreHidden: false,
                loadMoreHidden: true,
                inLoadHidden:true
            });
        }else{
            this.data.intPageIndex++;
            var that=this;
            that.setData({
                noMoreHidden: true,
                loadMoreHidden: false,
                inLoadHidden:true
            })
        }
    },
    //现在地区
    openLoginPannel:function(e){
        var that=this;
        var arrayHotArea=[];
        var strMsgSend ='';
        var cityID=this.data.cityTextID;
        var cityToID=this.data.cityText2ID;
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

        this.setData({
            showModalStatus:true,
            region:parseInt(e.currentTarget.dataset.region),
            cityText: this.loginCity.__page.data.cityText,
            cityTextID: this.loginCity.__page.data.cityTextID
        });

        var timer=setInterval(function (){
            if(that.data.showModalStatus==false){
                if(cityID!=that.data.cityTextID||cityToID!=that.data.cityText2ID){
                    that.setData({
                        goods:[],
                        scrollTop:0,
                        intPageIndex:0,
                        loadingHidden:false,
                        noMoreHidden: true,
                        loadMoreHidden: true
                    });

                    var strMsgSend = GCMAPI.doCreate_gcmMsg_116_GetConnect(0,0,parseInt(that.data.cityTextID),0,0,parseInt(that.data.cityText2ID),that.data.strSearchValue,wx.getStorageSync('strWXOpenID'));
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
    /** 搜索 **/
    showInput: function () {
        this.setData({
            inputShowed: true
        });
    },
    searchInput: function () {
        // this.setData({
        //     inputVal: "",
        //     inputShowed: false
        // });
    },
    clearInput: function () {
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
    inputTyping_City: function (e) {
        this.setData({
            inputShowed_City: true,
            inputVal_City: e.detail.value,
            strSearchValue: e.detail.value
        });
    },
    searchBtn:function (){
        this.onSearch();
    },
    /** 自定义弹出框 **/
    upper: function(e) {},
    lower: function(e) {
        this.setData({
            noMoreHidden: true,
            loadMoreHidden: true,
            inLoadHidden:false
        });
        this.onGetConnect();
    },
    scroll: function (e){
        // this.setData({
        //     noMoreHidden: true,
        //     loadMoreHidden: true,
        //     inLoadHidden: false
        // });
    },
    tap: function (e){},
    tapMove: function (e){
        this.setData({
            scrollTop: this.data.scrollTop + 10
        })
    },
    findInformation:function(e){
        var strInfoSysID=e.currentTarget.dataset.statu;

        wx.navigateTo({
            url: '/pages/find_information/find_information?id='+wx.getStorageSync('strWXOpenID')+'&sysID='+strInfoSysID+'&type=1'+'&intHistory=1'+'&intList=1'+'&share=0'
        });
    }

});