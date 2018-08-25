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
        i: 0,
        isXZ: '',
        select_ID:0,
        carOrGoods:0
    },
    onLoad: function () {
        wx.setNavigationBarTitle({
            title: '人工匹配'
        });
        var _this = this;
        wx.getSystemInfo({
            success: function (res) {
                _this.setData({
                    height: res.windowHeight - 122
                });
            }
        });
        wx.hideShareMenu();
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


    // 切换
    onMyPublishList:function(e){
        var id = e.currentTarget.dataset.statu;  //获取自定义的ID值
        this.setData({
            select_ID:parseInt(id),
            scrollTop:0
        });
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
    upper: function (e) {
    },
    lower: function (e) {
    },
    scroll: function () {
    },
    tap: function (e) {
    },
    tapMove: function (e) {
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
    },
    doDetails:function (){
        wx.navigateTo({
            url: '/pages/match_list/match_list'
        });
    }
})