import DATE from '../../utils/util.js';
import CITY from '../../utils/city.js';
import dateTimePicker from '../../utils/dateTime.js';
import GCMAPI from '../../script/gzk_MsgApi/gcm_api.js';
import GZK_Coder from '../../script/gzk_MsgApi/gzk_script_coder.js';
var app = getApp();
Page({
    data: {
        img_LineH:{},
        page_Height:null,
        insurant1_Bool:false,//类型
        insurant2_Bool:true,//
        packingWay_Bool:false,//包装方式 货物类型
        typeWay_ArrayClass:[],
        intTypeWay:0,
        strTypeWay:'',
        insurantType_ArrayClass:[{"sc":1,"sd":"个人"},{"sc":2,"sd":"公司"}],
        packingWay_ArrayClass:[{"sc":"PACK001","sd":"箱状包装","il":1,"ip":1,"id":17},{"sc":"PACK002","sd":"袋状包装","il":1,"ip":1,"id":18},{"sc":"PACK003","sd":"托盘包装","il":1,"ip":1,"id":19},{"sc":"PACK004","sd":"捆包状包装","il":1,"ip":1,"id":20},{"sc":"PACK005","sd":"桶状包装","il":1,"ip":1,"id":21},{"sc":"PACK006","sd":"裸状包装","il":1,"ip":1,"id":22},{"sc":"PACK007","sd":"其他形状包装","il":1,"ip":1,"id":23}],
        goodsType_Bool:false,
        goodsType_ArrayClass:[],
        gzkCoupons_Bool:false,  //优惠卷
        showModalStatus: false, //地区
        cityText:'中国全境',
        cityTextID:100000,
        cityText2:'中国全境',
        cityText2ID:100000,
        dateTimeArray: null,
        dateTime:[],
        bounced_Height:null,    //弹出框高度
        intCarNumber_Type:null,   //车牌
        strCarPlateNumber:'',   //车牌
        strHangingPlate:'',   //挂车牌
        text1:'',
        text2:'',
        text3:'',
        text4:'',
        text5:'',
        text6:'',
        text7:'',
        select_ID:0,
        shorthand_Bool:true,
        letter_Bool:false,
        floatRate:null,   //费率
        premium:null,   //保费
        dateCreate:0,
        datePolicy:0,
        applicant_Certificate:'',//投保人证件
        doublePriceDiscount:0,//增加金额(对应是否签约0 5 10)
        driverName:'',//司机姓名
        driverPhone:'',//司机电话
        floatRSPremium:'',//人寿价格
        floattTransporMonery:0,//运输费
        floattTransporMoneryDes:'',//运输费
        floatUserNeedPremium:0,//用户需交保费用户需支付金额
        freightNo:'',//运单号
        holderLinkName:'',//投保人联系人姓名
        insuEndTime:'',//保险止期
        insuPrice:'',//保额
        insurantCertNo:'',//被保险联系人证件号码
        insurantName:'',//被保险人(公司)名称
        insurantPhone:'',//被保险联系人电话
        insurantType:1,//被保险人类型:100：个人；201：公司
        insurantTypeDes:'个人',//被保险人类型:100：个人；201：公司
        insuStartTime:0,//保险起期
        intContractStatus:0,//签约状态
        intContractType:0,//签约协议种类
        intPolicyStatus:0,// 保单状态
        itemName:'',//货物类型
        itemType:'',
        itemTypeCode:'',
        itemValue:0,// 货物价值
        packType:'',   //包装类型
        packTypeCode:'',
        strHolderLinkTel:'',// 投保联系人电话
        strOrderNo:'',//保单系统编号
        strPolicyNo:'',//人寿保单号
        strUserSysID:'',
        strHangingPlate:'', //挂车牌号
        transAt:'', //起运日期
        transitAddress:'', //中转地
        weight:0, //重量
        strLoaderTel:'', //装货人电话
        quantity:0   //数量
    },
    onLoad: function (){
        var _this=this;
        new app.Region();
        wx.showLoading({
            title: '加载中...'
        });
        wx.setNavigationBarTitle({
            title:'修改保单'
        });
        wx.getSystemInfo({
            success: function(res) {
                _this.setData({
                    page_Height:res.windowHeight-60,
                    bounced_Height:res.windowHeight*0.8,
                    publishHeight:res.windowHeight-60
                });
            }
        });

        this.setData({
            strInsurance_Company:app.data.strInsurance_Company,
            strInsurance_Products:app.data.strInsurance_Products
        });

        var strMsgSend = GCMAPI.doCreate_gcmMsg_2506_GetConnect(app.data.strOrderNo,wx.getStorageSync('strWXOpenID'));
        GZK_Coder.doSendMsgWXSMA(strMsgSend,_this.onMsgCallBack_2506);
    },
    onMsgCallBack_2506:function(jsonBack){
        setTimeout(function (){wx.hideLoading();},300);
        var that=this;

        var bTotal=parseFloat(parseInt(jsonBack.selfInsuranceInfo.itemValue)*jsonBack.floatRate+jsonBack.selfInsuranceInfo.doublePriceDiscount).toFixed(2);
        if(bTotal<20){
            bTotal=20.00;
        }
        var insurantTypeDes='';
        if(jsonBack.selfInsuranceInfo.insurantType==1){
            insurantTypeDes='个人';
            that.setData({
                insurant1_Bool:false,
                insurant2_Bool:true
            })
        }else if(jsonBack.selfInsuranceInfo.insurantType==2){
            insurantTypeDes='公司';
            that.setData({
                insurant1_Bool:true,
                insurant2_Bool:false
            })
        }else{
            insurantTypeDes='个人';
            that.setData({
                insurant1_Bool:false,
                insurant2_Bool:true
            })
        }

        that.setData({
            floatRate:jsonBack.floatRate,
            dateCreate:jsonBack.selfInsuranceInfo.dateCreate,
            datePolicy:jsonBack.selfInsuranceInfo.datePolicy,
            doublePriceDiscount:jsonBack.selfInsuranceInfo.doublePriceDiscount,
            driverName:jsonBack.selfInsuranceInfo.driverName,
            driverPhone:jsonBack.selfInsuranceInfo.driverPhone,
            floatRSPremium:jsonBack.selfInsuranceInfo.floatRSPremium,
            floattTransporMonery:(jsonBack.selfInsuranceInfo.floattTransporMonery==0?'':jsonBack.selfInsuranceInfo.floattTransporMonery),
            premium:Math.ceil(bTotal),
            cityText:jsonBack.selfInsuranceInfo.fromAddress,
            cityTextID:jsonBack.selfInsuranceInfo.fromAddressID,
            holderLinkName:jsonBack.selfInsuranceInfo.holderLinkName,
            insuEndTime:jsonBack.selfInsuranceInfo.insuEndTime,
            insuPrice:jsonBack.selfInsuranceInfo.insuPrice,
            insurantCertNo:jsonBack.selfInsuranceInfo.insurantCertNo,
            insurantName:jsonBack.selfInsuranceInfo.insurantName,
            insurantPhone:jsonBack.selfInsuranceInfo.insurantPhone,
            insurantType:(jsonBack.selfInsuranceInfo.insurantType==0?1:jsonBack.selfInsuranceInfo.insurantType),
            insurantTypeDes:insurantTypeDes,
            insuStartTime:jsonBack.selfInsuranceInfo.insuStartTime,
            intContractStatus:jsonBack.selfInsuranceInfo.intContractStatus,
            intContractType:jsonBack.selfInsuranceInfo.intContractType,
            intPolicyStatus:jsonBack.selfInsuranceInfo.intPolicyStatus,
            itemName:jsonBack.selfInsuranceInfo.itemName,
            itemType:jsonBack.selfInsuranceInfo.itemType,
            itemTypeCode:jsonBack.selfInsuranceInfo.itemTypeCode,
            itemValue:(jsonBack.selfInsuranceInfo.itemValue==0?'':jsonBack.selfInsuranceInfo.itemValue/10000),
            packType:jsonBack.selfInsuranceInfo.packType,//包装类型
            packTypeCode:jsonBack.selfInsuranceInfo.packTypeCode,
            strCarPlateNumber:jsonBack.selfInsuranceInfo.plateNo,
            strHolderLinkTel:jsonBack.selfInsuranceInfo.strHolderLinkTel,
            strOrderNo:jsonBack.selfInsuranceInfo.strOrderNo,
            strPolicyNo:jsonBack.selfInsuranceInfo.strPolicyNo,
            strUserSysID:jsonBack.selfInsuranceInfo.strUserSysID,
            cityText2:jsonBack.selfInsuranceInfo.toAddress,
            cityText2ID:jsonBack.selfInsuranceInfo.toAddressID,
            strHangingPlate:jsonBack.selfInsuranceInfo.trailerNo, //挂车牌号
            transitAddress:jsonBack.selfInsuranceInfo.transitAddress, //
            transAt:DATE.formatTime(jsonBack.selfInsuranceInfo.transAt,'Y-M-D h:m'),
            weight:GZK_Coder.doThreeUnary(jsonBack.selfInsuranceInfo.weight),
            strLoaderTel:jsonBack.selfInsuranceInfo.strLoaderTel,

            quantity:GZK_Coder.doThreeUnary(jsonBack.selfInsuranceInfo.quantity)
        })

    },
    //  value值
    getInputValue:function (e){
        if(e.currentTarget.dataset.name=='goodsName'){
            this.setData({
                itemName:e.detail.value
            })
        }else if(e.currentTarget.dataset.name=='goodsWeight'){
            this.setData({
                weight:e.detail.value
            })
        }else if(e.currentTarget.dataset.name=='quantity'){
            this.setData({
                quantity:e.detail.value
            });
        }else if(e.currentTarget.dataset.name=='itemValue'){
            if(e.detail.value.charAt(0)=='.'){
                this.setData({
                    itemValue:'',
                    premium:20
                })
            }else{
                if(parseFloat(e.detail.value)>100){
                    wx.showToast({
                        title: '货物价值不能大于100万',
                        icon: 'none',
                        duration: 3000
                    })
                }else{

                    var bTotal=Math.ceil(parseFloat(e.detail.value)*10000*this.data.floatRate+this.data.doublePriceDiscount);
                    if(bTotal<20){
                        bTotal=20.00;
                    }
                    this.setData({
                        itemValue:e.detail.value,
                        premium:(e.detail.value==''?20:bTotal)
                    })
                }
            }
        }else if(e.currentTarget.dataset.name=='floattTransporMonery'){
            this.setData({
                floattTransporMonery:e.detail.value
            })
        }else if(e.currentTarget.dataset.name=='transitAddress'){
            this.setData({
                transitAddress:e.detail.value
            })
        }else if(e.currentTarget.dataset.name=='holderLinkName'){
            this.setData({
                holderLinkName:e.detail.value
            })
        }else if(e.currentTarget.dataset.name=='strHolderLinkTel'){
            this.setData({
                strHolderLinkTel:e.detail.value
            })
        }else if(e.currentTarget.dataset.name=='applicant_Certificate'){
            this.setData({
                applicant_Certificate:e.detail.value
            })
        }else if(e.currentTarget.dataset.name=='insurantPhone'){
            this.setData({
                insurantPhone:e.detail.value
            })
        }else if(e.currentTarget.dataset.name=='insurantName'){
            this.setData({
                insurantName:e.detail.value
            })
        }else if(e.currentTarget.dataset.name=='insurantCertNo'){
            this.setData({
                insurantCertNo:e.detail.value
            })
        }else if(e.currentTarget.dataset.name=='driverPhone'){
            this.setData({
                driverPhone:e.detail.value
            })
        }else if(e.currentTarget.dataset.name=='driverName'){
            this.setData({
                driverName:e.detail.value
            })
        }else if(e.currentTarget.dataset.name=='strLoaderTel'){
            this.setData({
                strLoaderTel:e.detail.value
            })
        }else{
            this.setData({
                note:e.detail.value
            })
        }

    },
    //  修改保单
    doAmendment:function(jsonBack){
        var that=this;
        if (that.data.itemName==''||that.data.cityText2 ==''||that.data.cityText==''||that.data.insurantTypeDes==''||that.data.insurantPhone==''||that.data.insurantName==''||that.data.insurantCertNo==''||that.data.strCarPlateNumber==''||that.data.driverPhone=='') {
            wx.showToast({
                title: '带 * 号均为必填项资料，请检查后再提交',
                icon: 'none',
                duration: 3000
            })
        }else if(GZK_Coder.doTurnTimestamp(that.data.transAt)<GZK_Coder.doTurnTimestamp(DATE.formatTime(new Date().getTime(), 'Y-M-D h:m'))){
            wx.showToast({
                title: '起运时间不能小于当前时间',
                icon: 'none',
                duration: 3000
            });
        }else if(this.data.cityTextID==100000||this.data.cityText2ID==100000){
            wx.showToast({
                title: '起运和目的地地区不能为中国全境',
                icon: 'none',
                duration: 3000
            });
        }else if(that.data.cityTextID>=540000&&that.data.cityTextID<=542627||that.data.cityText2ID>=540000&&that.data.cityText2ID<=542627){
            wx.showToast({
                title: '起运和目的地地区不能为西藏地区',
                icon: 'none',
                duration: 3000
            });
        }else if(that.data.cityTextID==650000||that.data.cityTextID>650121||that.data.cityText2ID==650000||that.data.cityText2ID>650121){
            wx.showToast({
                title: '起运和目的地地区不能为新疆地区(乌鲁木齐除外)',
                icon: 'none',
                duration: 3000
            });
        }else if(GZK_Coder.checkPhone(that.data.insurantPhone)==false){
            wx.showToast({
                title: '联系人电话输入有误，请检查',
                icon: 'none',
                duration: 3000
            });
        }else if(GZK_Coder.checkPhone(that.data.driverPhone)==false){
            wx.showToast({
                title: '司机电话输入有误，请检查',
                icon: 'none',
                duration: 3000
            });
        }else if(that.data.cityTextID==130000||that.data.cityTextID==140000||that.data.cityTextID==150000|| that.data.cityTextID==210000||that.data.cityTextID==220000||that.data.cityTextID==230000||that.data.cityTextID==320000||that.data.cityTextID==330000||that.data.cityTextID==340000||that.data.cityTextID==350000||that.data.cityTextID==360000||that.data.cityTextID==370000||that.data.cityTextID==410000||that.data.cityTextID==420000||that.data.cityTextID==430000||that.data.cityTextID==440000||that.data.cityTextID==450000||that.data.cityTextID==460000||that.data.cityTextID==510000||that.data.cityTextID==520000||that.data.cityTextID==530000||that.data.cityTextID==540000||that.data.cityTextID==610000||that.data.cityTextID==620000||that.data.cityTextID==630000||that.data.cityTextID==640000||that.data.cityTextID==650000||that.data.cityText2ID==130000||that.data.cityText2ID==140000||that.data.cityText2ID==150000||that.data.cityText2ID==210000||that.data.cityText2ID==220000||that.data.cityText2ID==230000|| that.data.cityText2ID==320000||that.data.cityText2ID==330000||that.data.cityText2ID==340000||that.data.cityText2ID==350000||that.data.cityText2ID==360000||that.data.cityText2ID==370000||that.data.cityText2ID==410000||that.data.cityText2ID==420000||that.data.cityText2ID==430000||that.data.cityText2ID==440000||that.data.cityText2ID==450000||that.data.cityText2ID==460000||that.data.cityText2ID==510000||that.data.cityText2ID==520000||that.data.cityText2ID==530000||that.data.cityText2ID==540000||that.data.cityText2ID==610000||that.data.cityText2ID==620000||that.data.cityText2ID==630000||that.data.cityText2ID==640000||that.data.cityText2ID==650000){
            wx.showToast({
                title: '起运和目的地地区不能为全省全境',
                icon: 'none',
                duration: 3000
            });
        }else if(this.data.driverPhone.length<11||this.data.insurantPhone.length<11){
            wx.showToast({
                title:'电话号码不能小于11位数',
                icon: 'none',
                duration: 3000
            });
        }else {
            wx.showLoading({
                title: '加载中...'
            });
            var strMsgSend = GCMAPI.doCreate_gcmMsg_2522_GetConnect(app.data.strOrderNo, {
                "dateCreate":that.data.dateCreate,"datePolicy":that.data.datePolicy,"doublePriceDiscount":0,
                "driverName":that.data.driverName,
                "driverPhone":that.data.driverPhone,
                "floatRSPremium":that.data.floatRSPremium,
                "floattTransporMonery":parseInt((that.data.floattTransporMonery==''?0:that.data.floattTransporMonery)) ,
                "floatUserNeedPremium": parseInt((that.data.premium==''?0:that.data.premium)),
                "freightNo":'',
                "fromAddress":GZK_Coder.doREG_NoonSign(that.data.cityText,',',/(\S*),/),
                "fromAddressID":parseInt(that.data.cityTextID),
                "holderLinkName":that.data.holderLinkName,
                "insuEndTime":0,//保险止期
                "insuPrice":parseInt((that.data.itemValue==''?0:that.data.itemValue))*10000,//保额
                "insurantCertNo":that.data.insurantCertNo,//证件
                "insurantName":that.data.insurantName,
                "insurantPhone":that.data.insurantPhone,
                "insurantType":parseInt(that.data.insurantType),
                "insuStartTime":parseInt(that.data.insuStartTime),
                "insuType":app.data.insuType,
                "intContractStatus":parseInt(that.data.intContractStatus),
                "intContractType":parseInt(that.data.intContractType),
                "intPolicyStatus":parseInt(that.data.intPolicyStatus),
                "itemName":that.data.itemName,
                "itemType":that.data.itemType,
                "itemTypeCode":that.data.itemTypeCode,
                "itemValue":parseInt((that.data.itemValue==''?0:that.data.itemValue))*10000,
                "packType":that.data.packType,
                "packTypeCode":that.data.packTypeCode,
                "plateNo":that.data.strCarPlateNumber,
                "quantity": parseInt((that.data.quantity==''?0:that.data.quantity)),
                "strHolderLinkTel":that.data.strHolderLinkTel,
                "strOrderNo":that.data.strOrderNo,
                "strPolicyNo":that.data.strPolicyNo,
                "strUserSysID":that.data.strUserSysID,
                "toAddress":GZK_Coder.doREG_NoonSign(that.data.cityText2,',',/(\S*),/),
                "toAddressID":parseInt(that.data.cityText2ID),
                "trailerNo":that.data.strHangingPlate, //挂车牌号
                "transAt":GZK_Coder.doTurnTimestamp(that.data.transAt),
                "transitAddress":that.data.transitAddress,
                "strLoaderTel":that.data.strLoaderTel,
                "weight":parseInt((that.data.weight==''?0:that.data.weight))}, wx.getStorageSync('strWXOpenID'));
            // console.log(strMsgSend);
            GZK_Coder.doSendMsgWXSMA(strMsgSend,that.onMsgCallBack_2522);
        }
    },
    onMsgCallBack_2522:function (jsonBack) {
        wx.hideLoading();
        if(jsonBack.intUpdateStatus==0){

            wx.showToast({
                title: '修改保单成功',
                icon: 'none',
                duration:2000
            });

            var that=this;
            app.data.strOrderNo=jsonBack.strOrderNo;
            setTimeout(function () {
                wx.navigateBack({
                    delta:1
                });
            },2000)

        }else if(jsonBack.intUpdateStatus==1){
            wx.showToast({
                title: '提交修改保单网关错误',
                icon: 'none',
                duration: 3000
            });
        }else if(jsonBack.intUpdateStatus==2){
            wx.showToast({
                title: '系统错误',
                icon: 'none',
                duration: 3000
            });
        }else if(jsonBack.intUpdateStatus==3){
            wx.showToast({
                title: '超出起运时间不能修改',
                icon: 'none',
                duration: 3000
            });
        }else{
            wx.showToast({
                title: '网络错误，请稍后再尝试',
                icon: 'none',
                duration: 3000
            })
        }
    },
    //地区选择
    openLoginPannel:function(e){
        var that=this;
        var arrayHotArea=[];
        var strMsgSend ='';
        if(e.currentTarget.dataset.region==0){
            strMsgSend = GCMAPI.doCreate_gcmMsg_132_GetConnect(1);
        }else{
            strMsgSend = GCMAPI.doCreate_gcmMsg_132_GetConnect(3);
        }

        wx.request({
            url: GZK_Coder.xcx_Address(),
            data:'sa='+new GZK_Coder.Base64().encode(strMsgSend),
            dataType: 'text',
            responseType: 'text',
            header: {
                'content-type':'application/x-www-form-urlencoded'
            },
            method: 'POST',
            success: function (res) {
                var jsonTemp=new GZK_Coder.Base64().decode_json(res.data);
                arrayHotArea=jsonTemp.arrayHotArea;
                that.loginCity.show(e.currentTarget.dataset.region,arrayHotArea);
            }
        });

        this.setData({
            showModalStatus:true,
            remark_Hide:true,
            region:parseInt(e.currentTarget.dataset.region)
        });
        // GZK_Coder.doSendMsgWXSMA(strMsgSend,this.onMsgCallBack_132);
    },
    clearInput_City: function () {
        this.setData({
            'city.inputVal_City': "",
            'city.inputShowed_City': true,
            'city.searchHide': true
        });
    },
    inputTyping_City: function (e) {
        var len = CITY.citylist.length;
        var arr = [];
        var reg = new RegExp(e.detail.value);
        for(var i=0;i<len;i++){
            //如果字符串中不包含目标字符会返回-1
            if(CITY.citylist[i].s.match(reg)){
                arr.push(CITY.citylist[i]);
            }
        }
        this.setData({
            'city.inputVal_City': e.detail.value,
            'city.searchHide': false
        });
    },
    /** 车牌弹出框 **/
    powerDrawer_CarPlateNumber:function (e) {
        var statu = e.currentTarget.dataset.statu;
        var number = e.currentTarget.dataset.number;
        var strCarPlateNumber = this.data.strCarPlateNumber;
        this.util(statu);
        this.setData({
            intCarNumber_Type:number,
            text1:(strCarPlateNumber==''?'':strCarPlateNumber[0]),
            text2:(strCarPlateNumber==''?'':strCarPlateNumber[1]),
            text3:(strCarPlateNumber==''?'':strCarPlateNumber[3]),
            text4:(strCarPlateNumber==''?'':strCarPlateNumber[4]),
            text5:(strCarPlateNumber==''?'':strCarPlateNumber[5]),
            text6:(strCarPlateNumber==''?'':strCarPlateNumber[6]),
            text7:(strCarPlateNumber==''?'':strCarPlateNumber[7]),
            select_ID:0,
            shorthand_Bool:true,
            letter_Bool:false
        })
    },
    powerDrawer_HangingPlate:function (e) {
        var statu = e.currentTarget.dataset.statu;
        var number = e.currentTarget.dataset.number;
        var strHangingPlate= this.data.strHangingPlate;
        this.util(statu);
        this.setData({
            intCarNumber_Type:number,
            text1:(strHangingPlate==''?'':strHangingPlate[0]),
            text2:(strHangingPlate==''?'':strHangingPlate[1]),
            text3:(strHangingPlate==''?'':strHangingPlate[3]),
            text4:(strHangingPlate==''?'':strHangingPlate[4]),
            text5:(strHangingPlate==''?'':strHangingPlate[5]),
            text6:(strHangingPlate==''?'':strHangingPlate[6]),
            text7:(strHangingPlate==''?'':strHangingPlate[7]),
            select_ID:0,
            shorthand_Bool:true,
            letter_Bool:false
        })
    },
    powerDrawerClose_CarPlateNumber:function (e){
        var statu = e.currentTarget.dataset.statu;
        this.util(statu);
    },
    //切换键盘
    onSwitch:function (e){
        var id = e.currentTarget.dataset.statu;  //获取自定义的ID值
        this.setData({
            select_ID:parseInt(id)
        });
        if(parseInt(id)==0) {
            this.setData({
                shorthand_Bool: true,
                letter_Bool: false
            })
        }else{
            this.setData({
                shorthand_Bool:false,
                letter_Bool:true
            })
        }
    },
    //点击取值
    onClickValue:function (e){
        if(this.data.select_ID==0){
            this.setData({
                text1:e.currentTarget.dataset.text,
                select_ID:(this.data.select_ID==6?6:this.data.select_ID+1),
                am_Hide:true,
                nz_Hide:true,
                shorthand_Bool:false,
                letter_Bool:true,
                number_Hide:true,
                letter_Hide:false
            });
        }else if(this.data.select_ID==1){
            this.setData({
                text2:e.currentTarget.dataset.text,
                select_ID:(this.data.select_ID==6?6:this.data.select_ID+1),
                am_Hide:true,
                nz_Hide:true,
                shorthand_Bool:false,
                letter_Bool:true,
                number_Hide:true,
                letter_Hide:false
            });
        }else if(this.data.select_ID==2){
            this.setData({
                text3:e.currentTarget.dataset.text,
                select_ID:(this.data.select_ID==6?6:this.data.select_ID+1),
                am_Hide:true,
                nz_Hide:true,
                shorthand_Bool:false,
                letter_Bool:true
            });
        }else if(this.data.select_ID==3){
            this.setData({
                text4:e.currentTarget.dataset.text,
                select_ID:(this.data.select_ID==6?6:this.data.select_ID+1),
                am_Hide:true,
                nz_Hide:true,
                shorthand_Bool:false,
                letter_Bool:true
            });
        }else if(this.data.select_ID==4){
            this.setData({
                text5:e.currentTarget.dataset.text,
                select_ID:(this.data.select_ID==6?6:this.data.select_ID+1),
                am_Hide:true,
                nz_Hide:true,
                shorthand_Bool:false,
                letter_Bool:true
            });
        }else if(this.data.select_ID==5){
            this.setData({
                text6:e.currentTarget.dataset.text,
                select_ID:(this.data.select_ID==6?6:this.data.select_ID+1),
                am_Hide:true,
                nz_Hide:true,
                shorthand_Bool:false,
                letter_Bool:true
            });
        }else if(this.data.select_ID==6){
            this.setData({
                text7:e.currentTarget.dataset.text,
                select_ID:(this.data.select_ID==6?6:this.data.select_ID+1),
                am_Hide:true,
                nz_Hide:true,
                shorthand_Bool:false,
                letter_Bool:true
            });
        }else{
            return;
        }
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
        animation.opacity(0).translateY(200).step();
        // 第4步：导出动画对象赋给数据对象储存
        this.setData({
            animationData: animation.export()
        });

        // 第5步：设置定时器到指定时候后，执行第二组动画
        setTimeout(function () {
            // 执行第二组动画
            animation.opacity(1).translateY(0).step();
            // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象
            this.setData({
                animationData: animation
            });
            //关闭
            if (currentStatu == "close") {
                var number_Type=this.data.intCarNumber_Type;
                if(number_Type==1){
                    this.setData({
                        carPlateNumber_Bool:false,
                        strCarPlateNumber:(this.data.text1==''||this.data.text2==''||this.data.text3==''||this.data.text4==''||this.data.text5==''||this.data.text6==''||this.data.text7==''?'':this.data.text1+this.data.text2+'•'+this.data.text3+this.data.text4+this.data.text5+this.data.text6+this.data.text7)
                });
                }else{
                    this.setData({
                        carPlateNumber_Bool:false,
                        strHangingPlate:(this.data.text1==''||this.data.text2==''||this.data.text3==''||this.data.text4==''||this.data.text5==''||this.data.text6==''||this.data.text7==''?'':this.data.text1+this.data.text2+'•'+this.data.text3+this.data.text4+this.data.text5+this.data.text6+this.data.text7),
                });
                }

            }
        }.bind(this), 200);

        // 显示
        if (currentStatu == "open") {
            this.setData({
                carPlateNumber_Bool: true
            });
        }
    },
    /***** 包装方式 货物类型 ****/
    powerDrawer_PackingWay:function (e) {
        var that=this;
        var statu = e.currentTarget.dataset.statu;
        var number = e.currentTarget.dataset.number;

        this.setData({
            typeWay_ArrayClass:that.data.insurantType_ArrayClass,
            intTypeWay:number,
            strTypeWay:'被保人类型',
        })
        this.util_PackingWay(statu);
    },
    powerDrawerClose_PackingWay:function (e) {
        var statu = e.currentTarget.dataset.statu;
        this.util_PackingWay(statu);
    },
    //  选择
    packingWay_Select:function (e){
        var statu = e.currentTarget.dataset.statu;
        var text = e.currentTarget.dataset.text;

        if(this.data.intTypeWay==0){
            this.setData({
                itemType:text,
                itemTypeCode:statu
            });
        }else if(this.data.intTypeWay==1){
            this.setData({
                packType:text,
                packTypeCode:statu
            });
        }else{
            this.setData({
                insurant1_Bool:(statu==1?false:true),
                insurant2_Bool:(statu==2?false:true),
                insurantTypeDes:text,
                insurantType:statu,
                insurantPhone:'',
                insurantName:'',
                insurantCertNo:''
            });
        }

        this.util_PackingWay('close');
    },
    util_PackingWay: function(currentStatu){
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
        animation.opacity(0).translateY(200).step();
        // 第4步：导出动画对象赋给数据对象储存
        this.setData({
            animationData: animation.export()
        });

        // 第5步：设置定时器到指定时候后，执行第二组动画
        setTimeout(function () {
            // 执行第二组动画
            animation.opacity(1).translateY(0).step();
            // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象
            this.setData({
                animationData: animation
            });
            //关闭
            if (currentStatu == "close") {
                this.setData({
                    packingWay_Bool:false,
                });
            }
        }.bind(this), 200);

        // 显示
        if (currentStatu == "open") {
            this.setData({
                packingWay_Bool: true
            });
        }
    },
    //  优惠卷
    powerDrawer_Coupons:function (e) {
        var that = this;
        var statu = e.currentTarget.dataset.statu;

        this.setData({
        })
        this.util_Coupons(statu);
    },
    util_Coupons: function(currentStatu){
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
        animation.opacity(0).translateY(200).step();
        // 第4步：导出动画对象赋给数据对象储存
        this.setData({
            animationData: animation.export()
        });

        // 第5步：设置定时器到指定时候后，执行第二组动画
        setTimeout(function () {
            // 执行第二组动画
            animation.opacity(1).translateY(0).step();
            // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象
            this.setData({
                animationData: animation
            });
            //关闭
            if (currentStatu == "close") {
                this.setData({
                    gzkCoupons_Bool:false,
                });
            }
        }.bind(this), 200);

        // 显示
        if (currentStatu == "open") {
            this.setData({
                gzkCoupons_Bool: true
            });
        }
    },
})