import DATE from '../../utils/util.js';
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
        noMoreHidden: true,
        loadMoreHidden: false,
        inLoadHidden: true,
        others_List:[],
        array_HotStruts:[true,false],
        height:0,
        yHeight:0,
        mHeight:0,
        userID:'',
        shareText_btn:'分享有效信息列表',
        share:null,
        shareBtn_Hide:false,
        information_Hide:true,
        others_Hide:true,
        all_Hide:true,
        effective_Hide:false,
        company_Hide:true,
        binding:null,
        strPhoneNumber:'',
        share_PhoneNumber:'',
        share_UserAlias:'',
        strUserAlias:'',
        strCompanyName:'',
        share_CompanyName:'',
        carORGoods:null,
        intList:null
    },
    onLoad: function (options){
        this.setData({
            loadingHidden:false,
            userID:options.id,
            share:parseInt(options.share),
            carORGoods:options.or,
            share_UserAlias:options.strUserName,
            share_PhoneNumber:options.strPhoneNumber,
            share_CompanyName:options.strCompanyName,
            intList:options.intList
        });
        console.log(options.intList)

        wx.showShareMenu({
            withShareTicket: true
        })

    },
    onShow: function() {
        var strMsgSend = GCMAPI.doCreate_gcmMsg_104_GetConnect(wx.getStorageSync('strWXOpenID'));
        GZK_Coder.doSendMsgWXSMA(strMsgSend,this.onMsgCallBack_105);
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
        if(_this.data.share_CompanyName!=''){
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

        if(_this.data.binding==0){
            wx.setNavigationBarTitle({
                title:(_this.data.carORGoods==1?'他(她)的货源':'他(她)的车源')
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
                shareText_btn:'分享(她)的有效信息列表',
                others_Hide:false,
                information_Hide:false,
                share_Hide:true
            })

        }else{
            if(wx.getStorageSync('strWXOpenID')!=_this.data.userID){
                wx.setNavigationBarTitle({
                    title:(_this.data.carORGoods==1?'他(她)的货源':'他(她)的车源')
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
                    others_Hide:false,
                    information_Hide:false,
                    share_Hide:true
                })
            }else{
                wx.getSystemInfo({
                    success: function(res) {
                        _this.setData({
                            shareText_btn:'分享有效信息列表',
                            height:res.windowHeight-126,
                            mHeight:res.windowHeight-116,
                            yHeight:res.windowHeight-126
                        });
                    }
                });
                wx.setNavigationBarTitle({
                    title:(_this.data.carORGoods==1?'我的货源':'我的车源')
                });
                this.setData({
                    others_Hide:true,
                    information_Hide:true,
                    share_Hide:false
                })

            }
        }
        _this.onGetConnect();
    },
    //分享
    onShareInformation:function () {
        var that=this;
        wx.showModal({
            title: '温馨提示',
            content: '分享有效信息需要绑定果真快账号',
            cancelText:'取消',
            confirmText:'确定',
            success: function(res) {
                if (res.confirm) {
                    wx.navigateTo({
                        url: (that.data.carORGoods == 1 ? '/pages/gzk_login/gzk_login?id=' + that.data.userID + '&or=1' + '&share='+ that.data.share+'&intList='+that.data.intList+'&page=others'+'&strUserName='+that.data.share_UserAlias+'&strPhoneNumber='+that.data.share_PhoneNumber+'&strCompanyName='+that.data.share_CompanyName: '/pages/gzk_login/gzk_login?id=' + that.data.userID + '&or=2' + '&share='+ that.data.share+'&intList='+that.data.intList+'&page=others'+'&strUserName='+that.data.share_UserAlias+'&strPhoneNumber='+that.data.share_PhoneNumber+'&strCompanyName='+that.data.share_CompanyName)
                    });
                } else if (res.cancel) {
                }
            }
        })
    },
    onShareAppMessage: function (res) {
        var that=this;
        if (res.from === 'button'){}
            return {
                title:DATE.formatTime(new Date().getTime(), 'Y年M月D日')+' '+that.data.share_UserAlias,
                path: (that.data.carORGoods == 1 ? '/pages/others/others?id=' + that.data.userID + '&or=1' + '&share=1'+'&strUserName='+that.data.share_UserAlias+'&strPhoneNumber='+that.data.share_PhoneNumber+'&strCompanyName='+that.data.share_CompanyName+'&intList='+that.data.intList: '/pages/others/others?id=' + that.data.userID + '&or=2' + '&share=1'+'&strUserName='+that.data.share_UserAlias+'&strPhoneNumber='+that.data.share_PhoneNumber+'&strCompanyName='+that.data.share_CompanyName+'&intList='+that.data.intList),
                success: function (res) {
                                // 转发成功
                },
                fail: function (res) {
                                // 转发失败
                }
            }


    },

    onGetConnect:function (){
        this.setData({
            noMoreHidden: true,
            loadMoreHidden: true,
            inLoadHidden: false
        });

        if(this.data.carORGoods==1){
            var strMsgSend_146 = GCMAPI.doCreate_gcmMsg_146_GetConnect(this.data.select_ID,this.data.intPageIndex,this.data.userID);
            GZK_Coder.doSendMsgWXSMA(strMsgSend_146,this.onMsgCallBack_999);
        }else{
            var strMsgSend = GCMAPI.doCreate_gcmMsg_144_GetConnect(this.data.select_ID,this.data.intPageIndex,this.data.userID);
            // console.log(strMsgSend)
            GZK_Coder.doSendMsgWXSMA(strMsgSend,this.onMsgCallBack_999);
        }
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
        var strMsgSend = GCMAPI.doCreate_gcmMsg_142_GetConnect(this.data.select_ID,this.data.intPageIndex,this.data.strSearchValue,this.data.userID);
        GZK_Coder.doSendMsgWXSMA(strMsgSend,this.onMsgCallBack_142);
    },
    onMsgCallBack_999:function (jsonBack) {

        var others_List = this.data.others_List;
        for (var i = 0; i < jsonBack.arrayInfotom.length; i++) {
            others_List.push(jsonBack.arrayInfotom[i]);
        }

        this.setData({
            others_List: others_List,
            strPhoneNumber: jsonBack.strPhoneNumber,
            strUserAlias: jsonBack.strUserAlias,
            strCompanyName: jsonBack.strCompanyName
        });
        if (jsonBack.intHistory == 0){
            if (this.data.others_List.length == 0){
                this.setData({
                    shareBtn_Hide: false
                });
            }else {
                this.setData({
                    shareBtn_Hide: true
                })
            }
        } else {
            this.setData({
                shareBtn_Hide: false
            })
        }


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
            others_List:[],
            // shareBtn_Hide:(parseInt(id)==0?true:false),
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
        if(intStatus==1){
            wx.navigateTo({
                url: '/pages/find_information/find_information?id='+wx.getStorageSync('strWXOpenID')+'&sysID='+strInfoSysID+'&type='+type+'&intHistory='+intStatus+'&intList='+that.data.intList+'&share=0'
            });
        }

        return;
    },
    onHome:function (){
        wx.reLaunch({
            url: '/pages/index/index'
        });
    }

});