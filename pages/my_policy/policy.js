import DATE from '../../utils/util.js';
import GCMAPI from '../../script/gzk_MsgApi/gcm_api.js';
import GZK_Coder from '../../script/gzk_MsgApi/gzk_script_coder.js';
var app = getApp();
Page({
    data:{
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
        height:0,
        userID:'',
        shareText_btn:'分享有效信息列表',
        share:null,
        search_Hide:false,
        myPublish_Hide:false,
        information_Hide:false,
        share_Hide:false,
        all_Hide:true,
        effective_Hide:false,
        company_Hide:true,
        share_Shelves:true,
        binding:null,
        strPhoneNumber:'',
        share_PhoneNumber:'',
        share_UserAlias:'',
        strUserAlias:'',
        s_CompanyName:'',
        intContractStatus:0,
        pageLength:0,
    },
    onLoad: function (options){
        var that=this;
        var pages = getCurrentPages();
        that.setData({
            pageLength:pages.length
        });
        // getApp().data.serial_Number=parseInt(options.share);
        // this.setData({
        //     loadingHidden:false,
        //     userID:options.id,
        //     share:getApp().data.serial_Number,
        //     myPublish_Hide:true,
        //     share_PhoneNumber:options.number,
        //     share_UserAlias:options.name,
        //     share_CompanyName:options.companyName
        // });
        wx.setNavigationBarTitle({
            title:'我的保单'
        });
        wx.showShareMenu({
            withShareTicket: true
        });
        wx.getSystemInfo({
            success: function(res) {
                that.setData({
                    height:res.windowHeight-136
                });
            }
        });
        if(app.data.ifRefresh==false){
            var strMsgSend = GCMAPI.doCreate_gcmMsg_2500_GetConnect(3,wx.getStorageSync('strWXOpenID'));
            GZK_Coder.doSendMsgWXSMA(strMsgSend,that.onMsgCallBack_2501);
            this.onGetConnect();
        }
    },
    onShow: function() {
        var that=this;
        if(app.data.ifRefresh){
            this.setData({
                myList:[],
                intPageIndex:0
            });
            var strMsgSend = GCMAPI.doCreate_gcmMsg_2500_GetConnect(3,wx.getStorageSync('strWXOpenID'));
            GZK_Coder.doSendMsgWXSMA(strMsgSend,that.onMsgCallBack_2501);
            this.onGetConnect();
            app.data.ifRefresh=false;
        }
        // var strMsgSend = GCMAPI.doCreate_gcmMsg_104_GetConnect(wx.getStorageSync('strWXOpenID'));
        // GZK_Coder.doSendMsgWXSMA(strMsgSend,this.onMsgCallBack_105);
    },
    onUnload:function () {
        var that=this;
        if(app.data.ins_pages=='buy'){
            app.data.ins_pages='';
            wx.navigateBack({
                delta:that.data.pageLength
            });
            // wx.redirectTo({
            //     url: '/pages/index/index'
            // });
        }

    },
    //分享
    onShareInformation:function (){
        var that=this;
        wx.showModal({
            title: '温馨提示',
            content: '分享有效信息需要绑定果真快账号',
            cancelText:'取消',
            confirmText:'确定',
            success: function(res) {
                if (res.confirm) {
                    wx.navigateTo({
                        url: '/pages/gzk_login/gzk_login?id=' + that.data.userID + '&name=' + that.data.share_UserAlias + '&number=' + that.data.share_PhoneNumber+'&companyName='+that.data.share_CompanyName + '&share='+ that.data.share+'&page=my_publish_car'
                    });
                } else if (res.cancel) {

                }
            }
        })
    },
    onShareAppMessage: function (res) {
        var that=this;
        if (res.from === 'button') {}
        return {
            title:DATE.formatTime(new Date().getTime(),'Y年M月D日')+' '+ that.data.strUserAlias,
            path:'/pages/my_publish_car/my_publish_car?id=' + that.data.userID + '&name=' + that.data.share_UserAlias + '&number=' + that.data.share_PhoneNumber +'&companyName='+that.data.share_CompanyName + '&share=1',
            success: function (res) {
                // 转发成功
            },
            fail: function (res) {}
        }
    },
    //统计
    onMsgCallBack_2501:function(jsonBack){
        var that=this;
        that.setData({
            floatPremiumSumDes:jsonBack.floatPremiumSum,
            intPolicySumDes:jsonBack.intPolicySum,
            intContractStatus:jsonBack.selfUserInsuranceDiscountInfo.intContractStatus,
            intContractDes:(jsonBack.selfUserInsuranceDiscountInfo.intContractStatus==0?'已签约':'申请优惠'),
        });
    },
    // 申请优惠需联系客服,确认拨打吗?
    doCallCustomerService:function (){
        wx.showModal({
            title: '温馨提示',
            content: '申请优惠需联系果真快保险客服热线 400-998-2860,确认拨打吗？',
            success: function (res) {
                if (res.confirm) {
                    wx.makePhoneCall({
                        phoneNumber:4009982860
                    })
                }
            }
        })
    },
    //列表
    onGetConnect:function (){
        this.setData({
            noMoreHidden: true,
            loadMoreHidden: true,
            inLoadHidden: false
        });
        var strMsgSend = GCMAPI.doCreate_gcmMsg_2516_GetConnect(this.data.intPageIndex,this.data.strSearchValue,wx.getStorageSync('strWXOpenID'));

        GZK_Coder.doSendMsgWXSMA(strMsgSend,this.onMsgCallBack_2516);
    },
    //查找
    onSearch:function (){
        this.data.intPageIndex=0;
        this.setData({
            myList:[],
            scrollTop:0,
            noMoreHidden: true,
            loadMoreHidden: true,
            inLoadHidden: false
        });
        var strMsgSend = GCMAPI.doCreate_gcmMsg_2516_GetConnect(this.data.intPageIndex,this.data.strSearchValue,wx.getStorageSync('strWXOpenID'));

        GZK_Coder.doSendMsgWXSMA(strMsgSend,this.onMsgCallBack_2516);
    },
    onMsgCallBack_2516:function (jsonBack){
        var myList=this.data.myList;
        for(var i=0;i<jsonBack.selfInsuranceList.length;i++){
            myList.push(jsonBack.selfInsuranceList[i]);
        }
        this.setData({
            myList:myList,

        });
        if(jsonBack.selfInsuranceList.length==0){
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

    showInput: function () {
        this.setData({
            inputShowed: true
        });
    },
    searchInput: function () {},
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
            height:(parseInt(id)==0?this.data.yHeight:this.data.mHeight),
            all_Hide:(parseInt(id)==0?true:false),
            effective_Hide:(parseInt(id)==0?false:true)
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

    doDetails:function(e){
        app.data.strOrderNo=e.currentTarget.dataset.statu;
        app.data.ins_pages='policy';
        var that=this;
        wx.navigateTo({
            url: '/pages/policy_details/policy_details?strOrderNo='+e.currentTarget.dataset.statu+'&share=0'
        });
    }

});