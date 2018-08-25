import DATE from '../../utils/util.js';
import GCMAPI from '../../script/gzk_MsgApi/gcm_api.js';
import GZK_Coder from '../../script/gzk_MsgApi/gzk_script_coder.js';
var app = getApp();
Page({
    data:{
        hide:true,
        inputShowed: true,
        inputVal:'',
        scrollTop:0,
        intPageIndex:0,
        strSearchValue:'',
        location:null,
        showModalStatus: false,
        loadingHidden: false,
        noMoreHidden: true,
        loadMoreHidden: true,
        inLoadHidden: false,
        myList:[],
        array_HotStruts:[true,false],
        height:0,
        userID:'',
        carOrGoods:'',
        strUserAlias:'',
        strPhoneNumber:'',
        strCompanyName:'',
        publish:null,
        intHistory:null
    },
    onLoad:function (options){
        var _this=this;
        wx.setNavigationBarTitle({
            title:'发布成功'
        });
        this.setData({
            hide:false,
            carOrGoods:(options.publish==1?'货源':'车源'),
            publish:options.publish
        });
        wx.getSystemInfo({
            success: function(res) {
                _this.setData({
                    height:res.windowHeight-131
                });
            }
        });
    },
    onShow: function() {
        this.data.intPageIndex=0;
        this.setData({
            myList:[],
            scrollTop:0,
        });
        this.onGetConnect();
    },
    onShareAppMessage: function (res) {
        var that=this;
        if (res.from === 'button'){
            return {
                title:DATE.formatTime(new Date().getTime(),'Y年M月D日')+' '+that.data.strUserAlias,
                path:(that.data.publish==1?'/pages/my_publish_goods/my_publish_goods?id='+wx.getStorageSync('strWXOpenID')+'&name='+that.data.strUserAlias+'&number='+that.data.strPhoneNumber+'&companyName='+that.data.strCompanyName+'&share=1':'/pages/my_publish_car/my_publish_car?id='+wx.getStorageSync('strWXOpenID')+'&name='+that.data.strUserAlias+'&number='+that.data.strPhoneNumber+'&companyName='+that.data.strCompanyName+'&share=1'),
                success: function(res) {},
                fail: function(res) {}
            }
        }

    },
    onGetConnect:function (){
        this.setData({
            noMoreHidden: true,
            loadMoreHidden: true,
            inLoadHidden: false
        });
        if(this.data.publish==1){
            var strMsgSend = GCMAPI.doCreate_gcmMsg_142_GetConnect(0,this.data.intPageIndex,this.data.strSearchValue,wx.getStorageSync('strWXOpenID'));
            GZK_Coder.doSendMsgWXSMA(strMsgSend,this.onMsgCallBack_142);
        }else{
            var strMsgSend_140 = GCMAPI.doCreate_gcmMsg_140_GetConnect(0,this.data.intPageIndex,this.data.strSearchValue,wx.getStorageSync('strWXOpenID'));
            GZK_Coder.doSendMsgWXSMA(strMsgSend_140,this.onMsgCallBack_142);
        }

    },
    // 货/车源详情
    onMsgCallBack_142:function (jsonBack){

        var myList=this.data.myList;
        for(var i=0;i<jsonBack.arrayInfotom.length;i++){
            myList.push(jsonBack.arrayInfotom[i]);
        }
        this.setData({
            myList:myList,
            strPhoneNumber:jsonBack.strPhoneNumber,
            strUserAlias:jsonBack.strUserAlias,
            strCompanyName :jsonBack.strCompanyName,
            intHistory:jsonBack.intHistory
        });
        if(jsonBack.arrayInfotom.length==0){
            this.setData({
                noMoreHidden: false,
                loadMoreHidden: true,
                inLoadHidden: true
            });
        }else{
            this.data.intPageIndex++;
            var that=this;
            that.setData({
                loadMoreHidden: false,
                noMoreHidden: true,
                inLoadHidden:true
            })
        }
        wx.setStorage({
            key: 'intHistory',
            data:jsonBack.intHistory
        });

    },
    // 车源详情
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
        wx.hideLoading();
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
        wx.showLoading({
            title: '加载中...'
        });
        setTimeout(function (){
            wx.navigateBack({
                delta:1
            });
            wx.hideLoading();
        },1000);

    },
    onHome:function (){
        wx.reLaunch({
            url: '/pages/index/index'
        });
    },
    findInformation:function(e){
        var strInfoSysID=e.currentTarget.dataset.statu;
        var type=e.currentTarget.dataset.type;
        wx.setStorage({
            key: 'strInfoSysID',
            data:{strInfoSysID:strInfoSysID,intCarORGoods:type}
        });

        wx.navigateTo({
            url: '/pages/find_information/find_information?id='+wx.getStorageSync('strWXOpenID')+'&sysID='+strInfoSysID+'&type='+type+'&intHistory=1&intList=6'+'&share=0'
        });
    }
});
