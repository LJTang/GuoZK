import GCMAPI from '../../script/gzk_MsgApi/gcm_api.js';
import GZK_Coder from '../../script/gzk_MsgApi/gzk_script_coder.js';
var app = getApp();
Page({
    data:{
        // text:"这是一个页面"
        imageH:0,
        intPageIndex:0,
        inputShowed: true,
        inputVal:'',
        scrollTop:0,
        select_ID:0,
        strSearchValue:'',
        location:null,
        showModalStatus: false,
        loadingHidden: true,
        noMoreHidden: false,
        loadMoreHidden: false,
        inLoadHidden: true,
        myList:[],
        array_HotStruts:[true,false],
        height:0,
        userID:'',
        share:null,
        myPublish_Hide:true,
        information_Hide:true

    },
    onLoad: function (options){
        var _this=this;
        var lonLat=null;
        var sysinfo=wx.getSystemInfoSync();
        if(wx.getStorageSync('strWXOpenID')!=options.id){
            wx.setNavigationBarTitle({
                title:'小里的有效货源'
            });
        }else{
            wx.setNavigationBarTitle({
                title:'我的发布'
            });
        }

        this.setData({
            loadingHidden:false,
            userID:options.id,
            myPublish_Hide:true,
            information_Hide:(wx.getStorageSync('strWXOpenID')!=options.id?false:true)
        });
console.log(this.data.myPublish_Hide)
        _this.onGetConnect();
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
                    height:res.windowHeight-176
                });
            }
        });
        wx.showShareMenu({
            withShareTicket: true
        })

    },

    onShareAppMessage: function (res) {
        if (res.from === 'button') {
            return {
                title: '果真快信息通',
                path: '/pages/my_publish/my_publish?id='+this.data.userID,
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
    onGetConnect:function (){
        this.setData({
            noMoreHidden: true,
            loadMoreHidden: true,
            inLoadHidden: false
        });
        // var strMsgSend = GCMAPI.doCreate_gcmMsg_130_GetConnect(this.data.select_ID,this.data.intPageIndex,this.data.strSearchValue,wx.getStorageSync('strWXOpenID'));
        var strMsgSend = GCMAPI.doCreate_gcmMsg_130_GetConnect(this.data.select_ID,this.data.intPageIndex,this.data.strSearchValue,this.data.userID);
        GZK_Coder.doSendMsgWXSMA(strMsgSend,this.onMsgCallBack_130);
    },
    onSearch:function (){
        this.data.intPageIndex=0;
        this.setData({
            myList:[],
            scrollTop:0,
            noMoreHidden: true,
            loadMoreHidden: true,
            inLoadHidden: false
        });
        var strMsgSend = GCMAPI.doCreate_gcmMsg_130_GetConnect(this.data.select_ID,this.data.intPageIndex,this.data.strSearchValue,wx.getStorageSync('strWXOpenID'));
        GZK_Coder.doSendMsgWXSMA(strMsgSend,this.onMsgCallBack_130);
    },
    onMsgCallBack_130:function (jsonBack){
        var myList=this.data.myList;

        for(var i=0;i<jsonBack.arrayInfotom.length;i++){
            myList.push(jsonBack.arrayInfotom[i]);
        }
        this.setData({
            myList:myList
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
            inputShowed: true,
            strSearchValue:''
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
    searchBtn:function (){
        this.onSearch();
    },
    // 切换
    onMyPublishList:function(e){
        var id = e.currentTarget.dataset.statu;  //获取自定义的ID值
        this.setData({
            noMoreHidden: true,
            loadMoreHidden: true,
            inLoadHidden: false,
            select_ID:parseInt(id),
            intPageIndex:0,
            myList:[],
            myPublish_Hide:(parseInt(id)==0?true:false),
            height:(parseInt(id)==0?this.data.height-60:this.data.height+60)
        });
        this.onGetConnect();
    },

    upper: function (e){},
    lower:function(e) {
        this.setData({
            noMoreHidden: true,
            loadMoreHidden: true,
            inLoadHidden: false
        });
        this.onGetConnect();
    },
    scroll: function(e) {},
    tap: function(e){},

    findInformation:function(e){
        var strInfoSysID=e.currentTarget.dataset.statu;
        var type=e.currentTarget.dataset.type;
        wx.setStorage({
            key: 'strInfoSysID',
            data:{strInfoSysID:strInfoSysID,intCarORGoods:type}
        });

        wx.setStorage({
            key: 'intList',
            data:3
        });
        wx.navigateTo({
            url: '/pages/find_information/find_information'
        });
    }

});