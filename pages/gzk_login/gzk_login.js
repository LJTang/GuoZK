//logs.js
import GCMAPI from '../../script/gzk_MsgApi/gcm_api.js';
import GZK_Coder from '../../script/gzk_MsgApi/gzk_script_coder.js';

Page({
  data: {
      countDown:60,
      timer:null,
      codeText:'获取验证码',
      phoneNumber:'',
      codeNumber:'',
      pupUPBoolean: false,
      codeClick: true,
      pageText:'',
      share:null,
      userID:'',
      strUserName:'',
      strPhoneNumber:'',
      strCompanyName:'',
      name:'',
      number:'',
      companyName:'',
      sysID:'',
      strOrderNo:'',
      type:null,
      intHistory:null,
      intList:null,
      or:null
  },

  onLoad: function (options) {
      wx.setNavigationBarTitle({
          title: '绑定账号'
      });
      if(options.page=='my_publish_goods'){
          this.setData({
              name:options.name,
              number:options.number,
              companyName:options.companyName,
              share:options.share

          });
      }else if(options.page=='my_publish_car'){
          this.setData({
              name:options.name,
              number:options.number,
              companyName:options.companyName,
              share:options.share
          });
      }else if(options.page=='find_information'){
          this.setData({
              strInfoSysID:options.sysID,
              type:options.type,
              intHistory:options.intHistory,
              intList:options.intList,
              share:options.share
          });
      }else if(options.page=='others'){
          this.setData({
              strUserName:options.strUserName,
              strPhoneNumber:options.strPhoneNumber,
              strCompanyName:options.strCompanyName,
              or:options.or,
              share:options.share,
              intList:options.intList
          });

      }else if(options.page=='policy_details'){
          this.setData({
              strOrderNo:options.strOrderNo,
              pageText:options.page,
              share:options.share
          });

      }else if(options.page=='history'){
          this.setData({
              pageText:options.page,
          });

      }
      this.setData({
          pageText:options.page,
          userID:options.id
      });
  },
    onPupUp_Show:function () {
        this.setData({
            pupUPBoolean: true
        })
    },
    onPupUp_Hide:function () {
        this.setData({
            pupUPBoolean:false
        })
    },
    onGZK_UserType:function (e) {
        this.setData({
            pupUPBoolean: false
        });
        var strMsgSend = GCMAPI.doCreate_gcmMsg_110_GetConnect(wx.getStorageSync('location').latitude,wx.getStorageSync('location').longitude,parseInt(e.currentTarget.dataset.statu),this.data.phoneNumber,wx.getStorageSync('strWXOpenID'));
        GZK_Coder.doSendMsgWXSMA(strMsgSend,this.onMsgCallBack_110);
    },
    //倒计时
    gzkLog_SendCode: function () {
        var that=this;
      if(this.data.phoneNumber==''||GZK_Coder.checkPhone(that.data.phoneNumber)==false){
          wx.showToast({
              title: '请输入正确的手机号码',
              icon: 'none',
              duration: 3000
          });
      }else{
          if(this.data.codeText=='获取验证码'||this.data.codeText=='重新获取'){
              var strMsgSend = GCMAPI.doCreate_gcmMsg_134_GetConnect(1, this.data.phoneNumber);
              GZK_Coder.doSendMsgWXSMA(strMsgSend, this.onMsgCallBack_134);
          }
      }
    },

    onMsgCallBack_134:function (jsonBack) {
      if(jsonBack.intSendSMSStatus==0){
          this.setData({
              codeClick: false
          });
          if (this.countDown<60) {
              this.setData({
                  codeClick: true
              });
              return;
          }
          this.setData({
              codeText: this.data.countDown + 's'
          });
          var that=this;
          var timer=null;
          timer = setInterval(function () {
              that.data.countDown--;
              that.setData({
                  codeClick: false
              });
              if (that.data.countDown <= 0) {
                  that.setData({
                      codeClick: true
                  });
                  clearInterval(timer);
                  that.data.countDown = 60;
                  that.setData({
                      codeText: '重新获取'
                  });
                  return
              }
              that.setData({
                  codeText: that.data.countDown + 's'
              })
          }, 1000);


          wx.showToast({
              title: '验证码已发送，请注意查收',
              icon: 'none',
              duration: 3000
          });

      }else if(jsonBack.intSendSMSStatus==1){
          wx.showToast({
              title: '验证电话号码为空',
              icon: 'none',
              duration: 3000
          });
      }else if(jsonBack.intSendSMSStatus==2){
          wx.showToast({
              title: '验证电话号码错误',
              icon: 'none',
              duration: 3000
          });
      }else{
          wx.showToast({
              title: '验证码发送失败',
              icon: 'none',
              duration: 3000
          });
      }

    },

    onPhoneNumber:function(e){
        this.setData({
            phoneNumber:e.detail.value
        });
    },

    onCodeNumber:function(e){
        this.setData({
            codeNumber:e.detail.value
        });
    },
    //确定
    gzkLog_OK:function () {
        var that=this;
        if(this.data.phoneNumber.length!=11||this.data.codeNumber==''||GZK_Coder.checkPhone(that.data.phoneNumber)==false){
            wx.showToast({
                title: '请输入正确的手机号码或验证码',
                icon: 'none',
                duration: 3000
            });
        }else {
            var strMsgSend = GCMAPI.doCreate_gcmMsg_106_GetConnect(this.data.codeNumber, this.data.phoneNumber, wx.getStorageSync('strWXOpenID'));
            // console.log(strMsgSend)
            GZK_Coder.doSendMsgWXSMA(strMsgSend, this.onMsgCallBack_106);
        }
    },
    onMsgCallBack_106:function (jsonBack){
        var that=this;
        // console.log(jsonBack)
        if(jsonBack.intStatus==0){
            this.setData({
                pupUPBoolean: true
            });

        }else if(jsonBack.intStatus==1){
            wx.showToast({
                title: '已绑定',
                icon: 'none',
                duration:1500
            });
            setTimeout(function () {
                wx.navigateBack({
                    delta: 1
                });
            },1500)

        }else if(jsonBack.intStatus==2){
            wx.setStorage({
                key: 'strUserSysID',
                data: jsonBack.strUserSysID
            });
            wx.setStorage({
                key: 'strPhoneNumber',
                data: jsonBack.strPhoneNumber
            });
            wx.showToast({
                title: '绑定成功',
                icon: 'none',
                duration: 1500
            });
            setTimeout(function () {
                if(that.data.pageText=='my_publish_goods'){
                    app.data.carORGoods_Bool=true;
                    wx.navigateBack({
                        delta: 1
                    });
                    // wx.redirectTo({
                    //     url: '/pages/my_publish_goods/my_publish_goods?id=' + that.data.userID + '&name=' + that.data.name + '&number=' + that.data.number+'&companyName=' + that.data.companyName+'&share='+that.data.share
                    // });
                }else if(that.data.pageText=='my_publish_car'){
                    app.data.carORGoods_Bool=true;
                    wx.navigateBack({
                        delta: 1
                    });

                    // wx.redirectTo({
                    //     url: '/pages/my_publish_car/my_publish_car?id=' + that.data.userID + '&name=' + that.data.name + '&number=' + that.data.number+'&companyName=' + that.data.companyName+'&share='+that.data.share
                    // });
                }else if(that.data.pageText=='find_information'){
                    // console.log(that.data.strInfoSysID,that.data.type,that.data.intHistory,that.data.intList)
                    app.data.carORGoods_Bool=true;
                    wx.navigateBack({
                        delta: 1
                    });
                    // wx.redirectTo({
                    //    url: '/pages/find_information/find_information?id='+wx.getStorageSync('strWXOpenID') + '&sysID=' + that.data.strInfoSysID + '&type=' + that.data.type + '&intHistory=' + that.data.intHistory + '&intList=' + that.data.intList + '&share='+that.data.share
                    // });
                }else if(that.data.pageText=='others'){
                    app.data.carORGoods_Bool=true;
                    wx.navigateBack({
                        delta: 1
                    });
                    // wx.redirectTo({
                    //     url: '/pages/others/others?id='+that.data.userID+'&strUserName='+that.data.strUserName+'&strPhoneNumber='+that.data.strPhoneNumber+'&strCompanyName='+that.data.strCompanyName+'&or='+that.data.or+ '&share='+that.data.share+'&intList='+that.data.intList
                    // });
                }else if(that.data.pageText=='policy_details'){
                    app.data.carORGoods_Bool=true;
                    wx.navigateBack({
                        delta: 1
                    });

                }else if(that.data.pageText=='insurance'){
                    wx.navigateBack({
                        delta: 1
                    });

                }else if(that.data.pageText=='history'){
                    wx.navigateBack({
                        delta: 1
                    });

                }else{
                    wx.navigateBack({
                        delta: 1
                    });
                }
            },1000)

        }else if(jsonBack.intStatus==3){
            wx.showToast({
                title: '验证码错误',
                icon: 'none',
                duration: 3000
            });
        }else{
            wx.showToast({
                title: '网络错误',
                icon: 'none',
                duration: 3000
            });
        }



    },
    onMsgCallBack_110:function (jsonBack) {
        if(jsonBack.intRegsterStatus==0){
            wx.setStorage({
                key: 'strUserSysID',
                data: jsonBack.strUserSysID
            });
            this.setData({
                pupUPBoolean: false
            });

            wx.showToast({
                title: '注册成功',
                icon: 'none',
                duration: 2000
            });
            setTimeout(function (){
                wx.navigateBack({
                    delta: 1
                });
            },2000);

        }else if(jsonBack.intStatus==1){
            wx.showToast({
                title: '电话号码已经注册',
                icon: 'none',
                duration: 2000
            });
            setTimeout(function (){
                wx.navigateBack({
                    delta: 1
                });
            },2000);
        }else if(jsonBack.intStatus==2){
            wx.showToast({
                title: '数据错误',
                icon: 'none',
                duration: 3000
            });

        }else if(jsonBack.intStatus==3){

            wx.showToast({
                title: '电话号码被锁定，请与客服人员联系',
                icon: 'none',
                duration: 3000
            });
            setTimeout(function () {
                wx.navigateBack({
                    delta: 1
                });
            },3000)
        }else{
            wx.showToast({
                title: '网络错误',
                icon: 'none',
                duration: 3000
            });
        }


    }
});
