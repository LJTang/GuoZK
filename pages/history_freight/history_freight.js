import DATE from '../../utils/util.js';
import GCMAPI from '../../script/gzk_MsgApi/gcm_api.js';
import GZK_Coder from '../../script/gzk_MsgApi/gzk_script_coder.js';
var app = getApp();
Page({
    data:{
        bound:null,
        intPageIndex:0,
        height:0,
        dateTime:0,
        binding:0,
        intHistory:null,
        noMoreHidden: true,
        loadMoreHidden: true,
        inLoadHidden: false,
        historyArr:[],
        strSearchValue:'',
        inputVal:'',
        endDate:DATE.formatTime(Date.parse(new Date()),'Y-M-D'),
        startDate:DATE.formatTime(Date.parse(new Date())-(60*60*24*30*1000),'Y-M-D'),
        dateValue:DATE.formatTime(new Date().getTime(),'Y-M-D'),
        share:0
    },
    onLoad: function (options){
        var _this=this;
        wx.setNavigationBarTitle({
            title:'历史运价'
        });
        wx.getSystemInfo({
            success: function(res) {
                _this.setData({
                    height:res.windowHeight-110

                });
            }
        });
        this.setData({
            search_Hide:true,
            information_Hide:true,
            share_Hide:false,
            share:options.share
        });

        wx.hideShareMenu();
    },
    onShow:function (){
        var strMsgSend = GCMAPI.doCreate_gcmMsg_104_GetConnect(wx.getStorageSync('strWXOpenID'));
        GZK_Coder.doSendMsgWXSMA(strMsgSend,this.onMsgCallBack_105);

        this.onGetConnect();
    },
    onMsgCallBack_105:function (jsonBack) {
        this.setData({binding:jsonBack.intStatus});
    },
    lookOver:function () {
        var that=this;
        wx.showModal({
            title: '温馨提示',
            content: '请绑定手机号码',
            showCancel:true,
            cancelText:'取消',
            confirmText:'确定',
            success: function (res) {
                if (res.confirm) {
                    wx.navigateTo({
                        url: '/pages/gzk_login/gzk_login?id=&page=history'
                    });
                }
            }
        });

    },
    //分享
    onShareInformation:function () {
        var that=this;
        wx.showModal({
            title: '温馨提示',
            content: '分享历史运价需要绑定果真快账号',
            cancelText:'取消',
            confirmText:'确定',
            success: function(res) {
                if (res.confirm) {
                    wx.navigateTo({
                        url: '/pages/gzk_login/gzk_login?id=&page=history'
                    });
                } else if (res.cancel) {
                }
            }
        })
    },

    onShareAppMessage: function (res) {
        if (res.from === 'button') {
            return {
                title: '果真快信息通',
                path:'/pages/history_freight/history_freight?share=1',
                success: function(res) {
                    // 转发成功
                },
                fail: function(res) {
                    // 转发失败
                }
            }
        }

    },
    //列表
    onGetConnect:function (){
        var that=this;
        this.setData({
            noMoreHidden: true,
            loadMoreHidden: true,
            inLoadHidden: false
        });
        var strMsgSend = GCMAPI.doCreate_gcmMsg_150_GetConnect(this.data.intPageIndex,that.data.dateTime,that.data.strSearchValue,wx.getStorageSync('strWXOpenID'));
        console.log(strMsgSend);
        GZK_Coder.doSendMsgWXSMA(strMsgSend,this.onMsgCallBack_150);
    },
    onMsgCallBack_150:function (jsonBack){

        var myList=this.data.historyArr;
        for(var i=0;i<jsonBack.arrayInfo.length;i++){
            myList.push(jsonBack.arrayInfo[i]);
        }
        this.setData({
            historyArr:myList
            // intHistory:jsonBack.intHistory
        });
        if(jsonBack.arrayInfo.length==0){
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
    },
    onSearch:function (){
        this.data.intPageIndex=0;
        this.setData({
            historyArr:[],
            scrollTop:0,
        });
        this.onGetConnect();
    },
    inputTyping: function (e) {
        this.setData({
            inputVal: e.detail.value,
            strSearchValue: e.detail.value
        });
    },
    /** 日期 **/
    doSelect_Dste:function (){
        this.setData({
            isRotate:'rotate_180'
        });
    },
    datePickerBindchange:function(e){
        this.setData({
            dateValue:e.detail.value,
            dateTime:GZK_Coder.doTurnTimestamp(e.detail.value),
            intPageIndex:0,
            historyArr:[],
            isRotate:''
        });
        this.onGetConnect();
    },
    colseDatePicker:function (){
        this.setData({
            isRotate:''
        });
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
    onHome:function (){
        wx.reLaunch({
            url: '/pages/index/index'
        });
    }

});