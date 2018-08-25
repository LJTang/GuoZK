/**
 * 消息编码 ，需加密处理
 * Created by binli on 2016-11-04.
 */
function doGCMMsgCreate(intSetMsgID){
    var returnJson = {};
    returnJson.intMsgID = intSetMsgID;
    returnJson.strMsgDesc = "";
    returnJson.intMsgStatus = 0 ;
    returnJson.intMsgVer = 1 ;
    return returnJson;
}

function Base64() {
    // private property
    var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    // private method for UTF-8 encoding
    var _utf8_encode = function (string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }
        return utftext;
    };

    // private method for UTF-8 decoding
    var _utf8_decode=function (utftext) {
        var string = "";
        var i = 0,c1,c2,c3;
        var c = c1 = c2 = 0;
        while ( i < utftext.length ) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i+1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i+1);
                c3 = utftext.charCodeAt(i+2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    };
    // public method for encoding
    this.encode = function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = _utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output + _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +	_keyStr.charAt(enc3) + _keyStr.charAt(enc4);
        }
        return output;
    };

    // public method for decoding
    this.decode = function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = _keyStr.indexOf(input.charAt(i++));
            enc2 = _keyStr.indexOf(input.charAt(i++));
            enc3 = _keyStr.indexOf(input.charAt(i++));
            enc4 = _keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = _utf8_decode(output);
        return output;
    };

    // public method for decoding
    this.decode_json = function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = _keyStr.indexOf(input.charAt(i++));
            enc2 = _keyStr.indexOf(input.charAt(i++));
            enc3 = _keyStr.indexOf(input.charAt(i++));
            enc4 = _keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = _utf8_decode(output);
        return JSON.parse(output);
    };
}
//  请求
function doSendMsgWXSMA(strMsg, funCallback){
    wx.request({
        // url: 'https://wsa.guozk.com/sa_msg_proc.jsp',
        url: 'https://bca.guozk.com/sa_msg_proc.jsp',
        // url: 'http://192.168.80.138:8084/GZK-SA-Service/sa_msg_proc.jsp',
        data:'sa='+new Base64().encode(strMsg),
        dataType: 'text',
        responseType: 'text',
        header: {
            'content-type':'application/x-www-form-urlencoded'
        },
        method: 'POST',
        success: function (res) {
            var jsonTemp=new Base64().decode_json(res.data);
            funCallback(jsonTemp);
        },
        fail:function (res) {
            wx.showToast({
                title: '网络请求错误，请稍后再重试',
                icon: 'none',
                duration: 3000
            });
            wx.hideLoading();
        }

    });

}
function xcx_Address() {
    return 'http://192.168.80.138:8084/GZK-SA-Service/sa_msg_proc.jsp';
    // return 'https://bca.guozk.com/sa_msg_proc.jsp';
    // return 'https://wsa.guozk.com/sa_msg_proc.jsp';
}
function doCarType(index){
    switch (index){
        case 0:return '未填写';
            break;
        case 1:return '冷藏车';
            break;
        case 2:return '高栏车';
            break;
        case 3:return '冷藏肉挂车';
            break;
        case 4:return '保温车';
            break;
        case 5:return '箱车';
            break;
        case 6:return '平板车';
            break;
        case 7:return '集装箱';
            break;
        case 9:return '海柜';
            break;
        default:return '其他车型';
    }
}
function doInsuType(index){
    switch (index){
        case 1:return '普货基本险';
            break;
        case 2:return '普货综合险';
            break;
        case 3:return '冷藏货物险';
            break;
        default:return '其他';
    }

}
function doTurnTimestamp(intValue){
    // var getInput_dateVal = intValue;
    // var data = new Date(getInput_dateVal.replace(/[-]/g,"/"));
    // return data.getTime()
    var resData = intValue;
    resData=resData.replace(/-/g, '/');
    var time = Date.parse(new Date(resData));
    return time;
}

function doThreeUnary(intValue) {
    return (intValue==0?'':intValue)
}

function doREG_NoonSign(intValue,reg,matValue) {
    var s=intValue;
    var n=(s.split(reg)).length-1;
    if(n>1){
        var str = s.match(matValue)[1];
        return str;
    }else{
        return intValue;
    }

}
//输入匹配带有果真快文字的
function doREG_Word(intValue) {
    var str = intValue;
    var reg = RegExp(/果真快/);
    var reg2 = RegExp(/客服/);
    var reg3 = RegExp(/果*真*快/);
    if(str.match(reg)||str.match(reg2)||str.match(reg3)){
        return '';
    }else{
        return intValue;
    }
}
// 电话号码验证
function checkPhone(phone){
    if(!(/^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,1,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/.test(phone))){
       return false;
    }
}

function getLocation(){
    var that = this;
    wx.getLocation({
        success: function( res ){
            wx.setStorage({
                key: 'location',
                data: {longitude: res.longitude,
                    latitude: res.latitude}
            });
            console.log( res.longitude)
        },
        fail:function(res){
            console.log( res.longitude);
        },
        complete:function(res){
        }
    });

}
function getLocation2(){
    wx.getLocation({
        success: function( res ){
            wx.setStorage({
                key: 'location',
                data: {longitude: res.longitude,
                    latitude: res.latitude}
            });
            console.log( res.longitude)
        },
        fail:function(res){
        },
        complete:function(res){
        }
    });

}
function doDistrictJudge(cityID,city2ID){

}

module.exports = {
    doGCMMsgCreate: doGCMMsgCreate,
    Base64: Base64,
    doSendMsgWXSMA : doSendMsgWXSMA,
    xcx_Address : xcx_Address,
    doCarType : doCarType,
    doInsuType : doInsuType,
    doThreeUnary : doThreeUnary,
    doTurnTimestamp : doTurnTimestamp,
    doREG_NoonSign : doREG_NoonSign,
    doREG_Word: doREG_Word,
    getLocation : getLocation,
    doDistrictJudge : doDistrictJudge,
    checkPhone : checkPhone
};
