import GCMAPI from '../../script/gzk_MsgApi/gcm_api.js';
import GZK_Coder from '../../script/gzk_MsgApi/gzk_script_coder.js';
var app = getApp();
Page({
    data: {
        imageURL:app.data.imgURL,
        height: null,
        scrollTop: 0,
        intPageIndex: 0,
        intQueryTypes: 0,
        loadingHidden: false,
        noMoreHidden: true,
        loadMoreHidden: true,
        inLoadHidden: false,
        listArray: [],
        workOrder_Array: ["全部状态", "已匹配", "待装货"],
        i: 0,
        input_SearchVal: '',
        strSearchValue: '',
        isXZ: ''
    },
    onLoad: function () {
        wx.setNavigationBarTitle({
            title: '人工匹配'
        });
        var _this = this;
        wx.getSystemInfo({
            success: function (res) {
                _this.setData({
                    height: res.windowHeight - 70
                    // height: res.windowHeight - 50
                });
            }
        });
        wx.hideShareMenu();
        if (app.data.carORGoods_Bool==false) {
            this.onGetConnect();
        }
    },
    onCall: function () {
        wx.showModal({
            title: '400-998-2860',
            content: '确定拨打果真快客服热线吗？',
            cancelText: '取消',
            confirmText: '确定',
            success: function (res) {
                if (res.confirm) {
                    wx.makePhoneCall({
                        phoneNumber: '4009982860'
                    })
                }
            }
        })
    },

    onShow: function () {
        wx.hideShareMenu();
        if (app.data.carORGoods_Bool == true) {
            this.setData({
                listArray: [],
                scrollTop: 0,
                intPageIndex: 0
            });
            this.onGetConnect();
            app.data.carORGoods_Bool = false;
        }
    },
    onGetConnect: function () {
        this.setData({
            noMoreHidden: true,
            loadMoreHidden: true,
            inLoadHidden: false
        });
        var strMsgSend = GCMAPI.doCreate_gcmMsg_202_GetConnect(this.data.intPageIndex, this.data.intQueryTypes, this.data.strSearchValue, wx.getStorageSync('strWXOpenID'));
        GZK_Coder.doSendMsgWXSMA(strMsgSend, this.onMsgCallBack_202);
    },
    onSearch: function () {
        this.data.intPageIndex = 0;
        this.setData({
            listArray: [],
            scrollTop: 0,
            noMoreHidden: true,
            loadMoreHidden: true,
            inLoadHidden: false
        });
        var strMsgSend = GCMAPI.doCreate_gcmMsg_202_GetConnect(this.data.intPageIndex, this.data.intQueryTypes, this.data.strSearchValue, wx.getStorageSync('strWXOpenID'));
        GZK_Coder.doSendMsgWXSMA(strMsgSend, this.onMsgCallBack_202);
    },

    onMsgCallBack_202: function (jsonBack) {
        var listArray = this.data.listArray;

        for (var i = 0; i < jsonBack.arrayGoodsList.length; i++) {
            listArray.push(jsonBack.arrayGoodsList[i]);
        }
        this.setData({
            listArray: listArray,
            loadingHidden: true
        });

        if (jsonBack.arrayGoodsList.length == 0) {
            // intPageIndex=jsonBack.intPageIndex;
            this.setData({
                noMoreHidden: false,
                loadMoreHidden: true,
                inLoadHidden: true
            });
        } else {
            this.data.intPageIndex++;
            var that = this;
            that.setData({
                noMoreHidden: true,
                loadMoreHidden: false,
                inLoadHidden: true
            })
        }
    },

    onWorkOrder_Details: function (e) {
        wx.setStorage({
            key: "strOrderSysID",
            data: e.currentTarget.dataset.statu
        })
        wx.navigateTo({
            url:"/pages/work_order_details/index?strOrderSysID="+e.currentTarget.dataset.statu+"&share=0"
        });
    },

    showInput: function () {
        this.setData({
            inputShowed: true
        });
    },
    searchInput: function () {
    },
    clearInput: function () {
        this.setData({
            input_SearchVal: "",
            strSearchValue: '',
            inputShowed: true
        });
        this.onSearch();
    },
    inputTyping: function (e) {
        this.setData({
            input_SearchVal: e.detail.value,
            strSearchValue: e.detail.value
        });
    },
    searchBtn: function (e) {
        this.onSearch();
    },
    upper: function (e) {
    },
    lower: function (e) {
        this.setData({
            noMoreHidden: true,
            loadMoreHidden: true,
            inLoadHidden: false
        });
        this.onGetConnect();
    },
    scroll: function () {
    },
    workOrder_Select:function () {
        this.setData({
            isXZ: 'rotate_180'
        });
    },
    bindPickerChange:function (e) {
        this.setData({
            isXZ: '',
            i: e.detail.value,
            intQueryTypes:(e.detail.value==1?20:(e.detail.value==2?30:e.detail.value))
        });
        this.onSearch();
    },
    closePickerChange:function (e) {
        this.setData({
            isXZ: '',
        });
    }
})