import DATE from '../../utils/util.js';
import GCMAPI from '../../script/gzk_MsgApi/gcm_api.js';
import GZK_Coder from '../../script/gzk_MsgApi/gzk_script_coder.js';
var app = getApp();
Page({
    data:{
        height:null,
        imageURL:app.data.imgURL,
        hide:true
    },
    onLoad: function () {
        var _this = this;

        wx.getSystemInfo({
            success: function (res) {
                _this.setData({
                    height: res.windowHeight-60
                });
            }
        });

        wx.setNavigationBarTitle({
            title:'客服热线'
        });

        _this.setData({
            hide:false
        });
    },
    onMakePhoneCall:function (){
        var that=this;
        wx.showModal({
            title: '温馨提示',
            content: '果真快客服热线 400-998-2860',
            confirmText:'拨打',
            success: function(res) {
                if (res.confirm) {
                    wx.makePhoneCall({
                        phoneNumber:'4009982860'
                    })
                }
            }
        })

    }
});