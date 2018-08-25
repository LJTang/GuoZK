import DATE from '../../utils/util.js';
import dateTimePicker from '../../utils/dateTime.js';
import GCMAPI from '../../script/gzk_MsgApi/gcm_api.js';
import GZK_Coder from '../../script/gzk_MsgApi/gzk_script_coder.js';
var app = getApp();
Page({
    data: {
        page_Bool:true,
        height:null,
        listArray:[],
        scrollTop:0,
        intPageIndex:0,
        intQueryTypes:0,
        loadingHidden: false,
        noMoreHidden: true,
        loadMoreHidden: true,
        inLoadHidden: false,
        dateValue:DATE.formatTime(Date.parse(new Date()),'Y-M'),
        strDateValue:DATE.formatTime(Date.parse(new Date()),'Y年M月'),
        dateEnd:DATE.formatTime(Date.parse(new Date()),'Y-M'),
        dateStrat:'',
    },
    onLoad: function (options) {
        var _this=this;
        wx.setNavigationBarTitle({
            title:'消费记录'
        });
        wx.getSystemInfo({
            success: function(res) {
                _this.setData({
                    height:res.windowHeight-50,
                });
            }
        });
        this.onGetConnect();
    },

    onGetConnect:function (){
        this.setData({
            noMoreHidden: true,
            loadMoreHidden: true,
            inLoadHidden: false
        });
        var strMsgSend = GCMAPI.doCreate_gcmMsg_204_GetConnect(this.data.intPageIndex,Date.parse(this.data.dateValue),wx.getStorageSync('strWXOpenID'));
        console.log(strMsgSend)
        GZK_Coder.doSendMsgWXSMA(strMsgSend,this.onMsgCallBack_204);
    },
    onMsgCallBack_204:function (jsonBack){
        console.log(jsonBack)
        var listArray=this.data.listArray;

        for(var i=0;i<jsonBack.arrayMoneyList.length;i++){
            listArray.push(jsonBack.arrayMoneyList[i]);
        }
        this.setData({
            listArray:listArray,
            loadingHidden:true
        });

        if(jsonBack.arrayMoneyList.length==0){
            this.setData({
                noMoreHidden: false,
                loadMoreHidden: true,
                inLoadHidden: true
            });
        }else{
            this.data.intPageIndex++;
            var that=this;
            that.setData({
                noMoreHidden: true,
                loadMoreHidden: false,
                inLoadHidden: true
            })
        }
    },
    upper: function(e) {},
    lower: function(e) {
        this.setData({
            noMoreHidden: true,
            loadMoreHidden: true,
            inLoadHidden: false
        });
        this.onGetConnect();
    },
    scroll: function() {
        // this.setData({
        //     noMoreHidden: true,
        //     loadMoreHidden: true,
        //     inLoadHidden: false
        // });
    },
    tap: function (e){},
    tapMove: function (e){},

    bindDateChange:function(e){
        this.setData({
            dateValue:e.detail.value,
            strDateValue:DATE.formatTime(Date.parse(e.detail.value),'Y年M月'),
            listArray:[],
            intPageIndex:0
        });
        this.onGetConnect();
    }
});

