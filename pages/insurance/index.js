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
        bounced_Height:null
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
            title:'果真快-货运保险'
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
    //弹出框
    modalcnt:function(){
        wx.showModal({
            title: '提示',
            content: "<view>这是一个模态弹窗</view><view>这是一个模态弹窗</view>",
            success: function(res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
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

    /**********/
    goToIndex:function (e){
        var that=this;
        var id = e.currentTarget.dataset.statu;  //获取自定义的ID值
        var strIns_Products=''

        if(id==1){
            strIns_Products='普货基本险';
        }else if(id==2){
            strIns_Products='普货综合险';
        }else{
            strIns_Products='果蔬冷藏险';
        }
        // app.data.insuType=parseInt(id);
        that.setData({
            index:parseInt(id),
            insuranceType:parseInt(id),
            strInsurance_Products:strIns_Products,
        });
    },
    buy_Insurance:function(){
        app.data.copy_Bool=false;
        app.data.strInsurance_Products=this.data.strInsurance_Products;
        app.data.insuType=this.data.insuranceType;

        var strMsgSend = GCMAPI.doCreate_gcmMsg_104_GetConnect(wx.getStorageSync('strWXOpenID'));
        GZK_Coder.doSendMsgWXSMA(strMsgSend,this.onMsgCallBack_104);

    },
    onMsgCallBack_104:function(jsonBack){
        wx.setStorage({
            key: 'strUserData',
            data: {strPhoneNumber:jsonBack.strPhoneNumber,strUserAlias:jsonBack.strUserAlias,strCompanyName:jsonBack.strCompanyName}
        });
        if(jsonBack.intStatus==1){
            wx.navigateTo({
                url: '/pages/buy_insurance/buy_insurance'
            });
        }else{
            wx.navigateTo({
                url: '/pages/gzk_login/gzk_login?id=&page=insurance'
            });
        }
    }
});