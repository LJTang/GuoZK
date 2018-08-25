import DATE from '../../utils/util.js';
import GCMAPI from '../../script/gzk_MsgApi/gcm_api.js';
import GZK_Coder from '../../script/gzk_MsgApi/gzk_script_coder.js';
var app = getApp();
Page({
    data:{
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
        height:0,
        mHeight:0,
        yHeight:0,
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
        s_CompanyName:''
    },
    onLoad: function (options){
        getApp().data.serial_Number=parseInt(options.share);
        this.setData({
            loadingHidden:false,
            userID:options.id,
            share:getApp().data.serial_Number,
            myPublish_Hide:true,
            share_PhoneNumber:options.number,
            share_UserAlias:options.name,
            share_CompanyName:options.companyName
        });
        wx.showShareMenu({
            withShareTicket: true
        });
        if(app.data.carORGoods_Bool==false){
            var strMsgSend = GCMAPI.doCreate_gcmMsg_104_GetConnect(wx.getStorageSync('strWXOpenID'));
            GZK_Coder.doSendMsgWXSMA(strMsgSend,this.onMsgCallBack_105);
        }
    },
    onShow: function() {
        if(app.data.carORGoods_Bool==true){
            this.setData({
                myList:[],
                scrollTop:0,
                intPageIndex:0
            });
            this.onGetConnect();
            app.data.carORGoods_Bool=false;
        }
    },

    onMsgCallBack_105:function (jsonBack) {

        this.setData({
            binding:jsonBack.intStatus
        });
        this.validation_User();
    },

    validation_User:function () {
        var _this=this;
        var strCompanyName_H=0;
        if(this.data.share_CompanyName!=''){
            strCompanyName_H=40;
            this.setData({
                company_Hide:false
            })
        }else{
            strCompanyName_H=0;
            this.setData({
                company_Hide:true
            })
        }
        if(this.data.binding==0){
            wx.setNavigationBarTitle({
                title:'他(她)的车源'
            });

            wx.getSystemInfo({
                success: function(res) {
                    _this.setData({
                        height:res.windowHeight-(161+strCompanyName_H),
                        mHeight:res.windowHeight-(201+strCompanyName_H),
                        yHeight:res.windowHeight-(161+strCompanyName_H)
                    });
                }
            });
            this.setData({
                shareText_btn:'分享他(她)的有效信息列表',
                search_Hide:false,
                information_Hide:false,
                share_Hide:true
            });
        }else{
            if(wx.getStorageSync('strWXOpenID')!=_this.data.userID){
                wx.setNavigationBarTitle({
                    title:'他(她)的车源'
                });
                wx.getSystemInfo({
                    success: function(res) {
                        _this.setData({
                            height:res.windowHeight-(161+strCompanyName_H),
                            mHeight:res.windowHeight-(101+strCompanyName_H),
                            yHeight:res.windowHeight-(161+strCompanyName_H)
                        });
                    }
                });
                this.setData({
                    shareText_btn:'分享他(她)的有效信息列表',
                    search_Hide:false,
                    information_Hide:false,
                    share_Hide:true
                });
            }else{
                wx.setNavigationBarTitle({
                    title:'我的车源'
                });
                wx.getSystemInfo({
                    success: function(res) {
                        _this.setData({
                            height:res.windowHeight-176,
                            mHeight:res.windowHeight-116,
                            yHeight:res.windowHeight-176
                        });
                    }
                });

                this.setData({
                    shareText_btn:'分享有效信息列表',
                    search_Hide:true,
                    information_Hide:true,
                    share_Hide:false
                });

            }
        }
        _this.onGetConnect();
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

    onGetConnect:function (){
        this.setData({
            noMoreHidden: true,
            loadMoreHidden: true,
            inLoadHidden: false
        });
        var strMsgSend = GCMAPI.doCreate_gcmMsg_140_GetConnect(this.data.select_ID,this.data.intPageIndex,this.data.strSearchValue,this.data.userID);

        GZK_Coder.doSendMsgWXSMA(strMsgSend,this.onMsgCallBack_140);
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
        var strMsgSend = GCMAPI.doCreate_gcmMsg_140_GetConnect(this.data.select_ID,this.data.intPageIndex,this.data.strSearchValue,this.data.userID);
        GZK_Coder.doSendMsgWXSMA(strMsgSend,this.onMsgCallBack_140);
    },
    onMsgCallBack_140:function (jsonBack){

        var myList=this.data.myList;

        for(var i=0;i<jsonBack.arrayInfotom.length;i++){
            myList.push(jsonBack.arrayInfotom[i]);
        }
        this.setData({
            myList:myList,
            strPhoneNumber:jsonBack.strPhoneNumber,
            strUserAlias:jsonBack.strUserAlias,
            share_PhoneNumber:jsonBack.strPhoneNumber,
            share_UserAlias:jsonBack.strUserAlias,
            share_CompanyName:jsonBack.strCompanyName,
            share_Shelves:(wx.getStorageSync('strWXOpenID')!=this.data.userID?true:false)
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

    findInformation:function(e){
        var strInfoSysID=e.currentTarget.dataset.statu;
        var type=e.currentTarget.dataset.type;
        var intStatus=e.currentTarget.dataset.history;
        var that=this;

        if(intStatus==0&&wx.getStorageSync('strWXOpenID')==this.data.userID) {
            wx.navigateTo({
                url: '/pages/find_information/find_information?id=' + wx.getStorageSync('strWXOpenID') + '&sysID=' + strInfoSysID + '&type=' + type + '&intHistory=' + intStatus + '&intList=4'+'&share=0'
            });
        }else if(intStatus==1) {
            wx.navigateTo({
                url: '/pages/find_information/find_information?id=' + wx.getStorageSync('strWXOpenID') + '&sysID=' + strInfoSysID + '&type=' + type + '&intHistory=' + intStatus + '&intList=4'+'&share=0'
            });
        }else{

        }
        return;
    },

    onHome:function (){
        wx.reLaunch({
            url: '/pages/index/index'
        });
    }

});