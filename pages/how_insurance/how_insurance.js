import GCMAPI from '../../script/gzk_MsgApi/gcm_api.js';
import GZK_Coder from '../../script/gzk_MsgApi/gzk_script_coder.js';
import MD5 from '../../script/gzk_MsgApi/md5.js';
var app = getApp();
Page({
    data:{
        index:3,
        insuranceType:3,
        strInsurance_Products:'果蔬冷藏险',
        height:null,
        bounced_Height:null,
        imageURL:app.data.imgURL
    },
    onLoad:function () {
        var that=this;
        wx.getSystemInfo({
            success: function(res) {
                that.setData({
                    height:res.windowHeight-203,
                    bounced_Height:res.windowHeight*0.8
                });
            }
        });
        wx.setNavigationBarTitle({
            title:'如何投保'
        });
    },

    onPhoneCall:function (e){
        var that=this;
        var stuta=e.currentTarget.dataset.statu;
        var phone=e.currentTarget.dataset.phone;

        wx.makePhoneCall({
            phoneNumber:e.currentTarget.dataset.phone
        });

    },

    normalPickerBindchange:function(e){
    this.setData({
      picker1Value:e.detail.value
    })
  },
    timePickerBindchange:function(e){
    this.setData({
      timeValue:e.detail.value
    })
  },
    datePickerBindchange:function(e){
    this.setData({
      dateValue:e.detail.value
    })
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

    buy_Insurance:function(){
        app.data.copy_Bool=false;
        app.data.strInsurance_Products=this.data.strInsurance_Products;
        app.data.insuType=this.data.insuranceType;
        wx.navigateTo({
            url: '/pages/buy_insurance/buy_insurance'
        });
    }
});