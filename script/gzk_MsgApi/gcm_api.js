import GZK_Coder from './gzk_script_coder.js';
// import HtmlToJson from './html2json.js';
function doCreate_gcmMsg_240_WXShareIndex(intSetLngID, strShareCode_Set, strWXOpenID_Set, strWXUserName_Set, intVisitType_Set){
    var returnJson = doGCMMsgCreate(240);
    returnJson.intLngID = intSetLngID;
    returnJson.strShareCode = strShareCode_Set ;
    returnJson.strWXOpenID = strWXOpenID_Set ;
    returnJson.strWXUserName = strWXUserName_Set ;
    returnJson.intVisitType = intVisitType_Set ;

    return JSON.stringify(returnJson);
}
function doCreate_gcmMsg_242_WXShareGetHistoryData(intSetLngID, strShareCode_Set, strSharePasswd_Set, dateCreate_Set){
    var returnJson = doGCMMsgCreate(242);
    returnJson.intLngID = intSetLngID;
    returnJson.strShareCode = strShareCode_Set ;
    returnJson.strSharePasswd = strSharePasswd_Set ;
    returnJson.dateCreate = dateCreate_Set ;

    return JSON.stringify(returnJson);
}
function doCreate_gcmMsg_1000_GetConnect(strDateEnd, strDateStart, intPageIndex, strSearchContent){
    var returnJson = GZK_Coder.doGCMMsgCreate(1000);
    returnJson.strDateEnd = strDateEnd;
    returnJson.strDateStart = strDateStart ;
    returnJson.intPageIndex = intPageIndex ;
    returnJson.strSearchContent = strSearchContent ;

    return JSON.stringify(returnJson);
}
function doCreate_gcmMsg_1002_GetConnect(strUserSysID_Set){
    var returnJson = doGCMMsgCreate(1002);
    returnJson.strUserSysID = strUserSysID_Set ;
    return JSON.stringify(returnJson);
}
function doCreate_gcmMsg_1004_GetConnect(strUserName_Set, strUserAlias_Set,strPassword_Set, strPhoneNumber_Set,strCompanyName_Set,intOperationType_Set,intUserStatus_Set,intViewStatus_Set,strUserSysID){
    var returnJson = doGCMMsgCreate(1004);
    returnJson.strUserName = strUserName_Set;
    returnJson.strUserAlias =strUserAlias_Set ;
    returnJson.strPassword = strPassword_Set ;
    returnJson.strPhoneNumber =strPhoneNumber_Set ;
    returnJson.strCompanyName =strCompanyName_Set ;
    returnJson.intOperationType =intOperationType_Set ;
    returnJson.intUserStatus=intUserStatus_Set ;
    returnJson.intViewStatus=intViewStatus_Set ;
    returnJson.strUserSysID=strUserSysID ;

    return JSON.stringify(returnJson);
}
function doCreate_gcmMsg_1006_GetConnect(intPageIndex,strUserSysID){
    var returnJson = doGCMMsgCreate(1006);
    returnJson.intPageIndex = intPageIndex ;
    returnJson.strUserSysID = strUserSysID ;

    return JSON.stringify(returnJson);
}
function doCreate_gcmMsg_1008_GetConnect(strContainerSysID,strUserSysID){
    var returnJson = doGCMMsgCreate(1008);
    returnJson.strContainerSysID = strContainerSysID;
    returnJson.strUserSysID=strUserSysID;

    return JSON.stringify(returnJson);
}
function doCreate_gcmMsg_1010_GetConnect(intOperationType_Set,strContainerSysID,strUserSysID){
    var returnJson = doGCMMsgCreate(1010);
    returnJson.intOperationType = intOperationType_Set;
    returnJson.strContainerSysID = strContainerSysID ;
    returnJson.strUserSysID=strUserSysID ;

    return JSON.stringify(returnJson);
}

function doCreate_gcmMsg_1012_GetConnect(intUseStatus_Set,strRemark_Set,strContainerSysID,strUserSysID){
    var returnJson = doGCMMsgCreate(1012);
    returnJson.intUseStatus = parseInt(intUseStatus_Set);
    returnJson.strRemark = strRemark_Set ;
    returnJson.strContainerSysID=strContainerSysID ;
    returnJson.strUserSysID=strUserSysID ;

    return JSON.stringify(returnJson);
}
function doCreate_gcmMsg_1014_GetConnect(intPageIndex,strSearchContent,strUserSysID){
    var returnJson = doGCMMsgCreate(1014);
    returnJson.intPageIndex = intPageIndex ;
    returnJson.strSearchContent = strSearchContent ;
    returnJson.strUserSysID = strUserSysID ;

    return JSON.stringify(returnJson);
}
var intQueryType=0;
function doCreate_gcmMsg_1016_GetConnect(intPageIndex,intQueryType,strDateEnd,strDateStart,strSearchContent,strUserSysID){
    var returnJson = doGCMMsgCreate(1016);
    returnJson.intPageIndex = intPageIndex;
    returnJson.intQueryType = intQueryType;
    returnJson.strDateEnd = strDateEnd;
    returnJson.strDateStart = strDateStart;
    returnJson.strSearchContent = strSearchContent;
    returnJson.strUserSysID = strUserSysID;

    return JSON.stringify(returnJson);
}

function doCreate_gcmMsg_1018_GetConnect(strFreightTransportSysID){
    var returnJson = doGCMMsgCreate(1018);
    returnJson.strFreightTransportSysID =strFreightTransportSysID ;
    return JSON.stringify(returnJson);
}
function doCreate_gcmMsg_1020_GetConnect(dateCreate,strFreightTransportSysID){
    var returnJson = doGCMMsgCreate(1020);
    returnJson.dateCreate =dateCreate ;
    returnJson.strFreightTransportSysID =strFreightTransportSysID ;
    return JSON.stringify(returnJson);
}
function doCreate_gcmMsg_216_GetConnect(dateCreate,strContainerMarkID){
    var returnJson = doGCMMsgCreate(216);
    returnJson.intLngID=1;
    returnJson.intMapType =0 ;
    returnJson.dateCreate =dateCreate ;
    returnJson.strContainerMarkID =strContainerMarkID ;
    return JSON.stringify(returnJson);
}
function doCreate_gcmMsg_1022_GetConnect(intPageIndex,intQueryType,strDateEnd,strDateStart,strSearchContent,strUserSysID){
    var returnJson = doGCMMsgCreate(1022);
    returnJson.intPageIndex = intPageIndex;
    returnJson.intQueryType = intQueryType;
    returnJson.strDateEnd = strDateEnd;
    returnJson.strDateStart = strDateStart;
    returnJson.strSearchContent = strSearchContent;
    returnJson.strUserSysID = strUserSysID;

    return JSON.stringify(returnJson);
}

function doCreate_gcmMsg_1024_GetConnect(strContainerExchangeSysID){
    var returnJson = doGCMMsgCreate(1024);
    returnJson.strContainerExchangeSysID =strContainerExchangeSysID ;
    return JSON.stringify(returnJson);
}
function doCreate_gcmMsg_1026_GetConnect(intPageIndex,strDateEnd,strDateStart,strSearchContent){

    var returnJson = doGCMMsgCreate(1026);
    returnJson.intPageIndex = intPageIndex;
    returnJson.strDateEnd = strDateEnd;
    returnJson.strDateStart = strDateStart;
    returnJson.strSearchContent = strSearchContent;

    return JSON.stringify(returnJson);
}
function doCreate_gcmMsg_1028_GetConnect(intPageIndex,intQueryType,strDateEnd,strDateStart,strSearchContent){

    var returnJson = doGCMMsgCreate(1028);
    returnJson.intPageIndex = intPageIndex;
    returnJson.intQueryType = intQueryType;
    returnJson.strDateEnd = strDateEnd;
    returnJson.strDateStart = strDateStart;
    returnJson.strSearchContent = strSearchContent;

    return JSON.stringify(returnJson);
}
function doCreate_gcmMsg_1030_GetConnect(strApplicationSysID){
    var returnJson = doGCMMsgCreate(1030);
    returnJson.strApplicationSysID =strApplicationSysID ;
    return JSON.stringify(returnJson);
}
function doCreate_gcmMsg_1032_GetConnect(intPageIndex,strDateEnd,strDateStart,strSearchContent){
    var returnJson = doGCMMsgCreate(1032);
    returnJson.intPageIndex = intPageIndex;
    returnJson.strDateEnd = strDateEnd;
    returnJson.strDateStart = strDateStart;
    returnJson.strSearchContent = strSearchContent;
    // returnJson.strUserSysID = strUserSysID;

    return JSON.stringify(returnJson);
}
function doCreate_gcmMsg_1034_GetConnect(strContainerSysID,strUserSysID){
    var returnJson = doGCMMsgCreate(1034);
    returnJson.strContainerSysID = strContainerSysID ;
    return JSON.stringify(returnJson);
}
function doCreate_gcmMsg_1036_GetConnect(strContainerSysID,intPageIndex){
    var returnJson = doGCMMsgCreate(1036);
    returnJson.strContainerSysID = strContainerSysID ;
    returnJson.intPageIndex = intPageIndex ;
    return JSON.stringify(returnJson);
}
function doCreate_gcmMsg_1038_GetConnect(intOperationType,strContainerMarkID,strHDMarkID,strContact_Set,strContactPhonne_Set,strContactCompany_Set,strRemark_Set,strContainerSysID){
    var returnJson = doGCMMsgCreate(1038);
    returnJson.intOperationType = intOperationType;
    returnJson.strContainerMarkID = strContainerMarkID;
    returnJson.strHDMarkID = strHDMarkID;
    returnJson.strContact = strContact_Set ;
    returnJson.strContactPhonne = strContactPhonne_Set ;
    returnJson.strContactCompany = strContactCompany_Set ;
    returnJson.strContainerRemark = strRemark_Set ;
    returnJson.strContainerSysID = strContainerSysID ;

    return JSON.stringify(returnJson);
}
function doCreate_gcmMsg_1038_GetConnect_D(strContainerSysID){
    var returnJson = doGCMMsgCreate(1038);
    returnJson.intOperationType = 3;
    returnJson.strContainerSysID = strContainerSysID ;

    return JSON.stringify(returnJson);
}
function doCreate_gcmMsg_1040_GetConnect(strAdminSysID,strApplicationSysID){
    var returnJson = doGCMMsgCreate(1040);
    returnJson.strAdminSysID = strAdminSysID ;
    returnJson.strApplicationSysID = strApplicationSysID ;
    return JSON.stringify(returnJson);
}
function doCreate_gcmMsg_1042_GetConnect(intPageIndex,intQueryType,strDateEnd,strDateStart,strSearchContent){
    var returnJson = doGCMMsgCreate(1042);
    returnJson.intPageIndex = intPageIndex;
    returnJson.intQueryType = intQueryType;
    returnJson.strDateEnd = strDateEnd;
    returnJson.strDateStart = strDateStart;
    returnJson.strSearchContent = strSearchContent;

    return JSON.stringify(returnJson);
}
function doCreate_gcmMsg_1044_GetConnect(strAlarmSysID){
    var returnJson = doGCMMsgCreate(1044);
    returnJson.strAlarmSysID = strAlarmSysID;
    return JSON.stringify(returnJson);
}
function doCreate_gcmMsg_1046_GetConnect(strAlarmSysID){
    var returnJson = doGCMMsgCreate(1046);
    returnJson.strAlarmSysID = strAlarmSysID;

    return JSON.stringify(returnJson);
}
function doCreate_gcmMsg_1048_GetConnect(strAdminName,strPasscode){
    var returnJson = GZK_Coder.doGCMMsgCreate(1048);
    returnJson.strAdminName = strAdminName;
    returnJson.strPasscode = strPasscode;

    return JSON.stringify(returnJson);
}

function doCreate_gcmMsg_1050_GetConnect(intPageIndex,intQueryType,strDateEnd,strDateStart,strSearchContent){
    var returnJson = doGCMMsgCreate(1050);
    returnJson.intPageIndex = intPageIndex;
    returnJson.intQueryType = intQueryType;
    returnJson.strDateEnd = strDateEnd;
    returnJson.strDateStart = strDateStart;
    returnJson.strSearchContent = strSearchContent;

    return JSON.stringify(returnJson);
}
function doCreate_gcmMsg_1052_GetConnect(strReminSysID){
    var returnJson = doGCMMsgCreate(1052);
    returnJson.strReminSysID =strReminSysID;
    return JSON.stringify(returnJson);
}
function doCreate_gcmMsg_270_GetConnect(strReminSysID){
    var returnJson = doGCMMsgCreate(270);
    returnJson.intMapType =0;
    returnJson.strAlertSysID =strReminSysID;
    return JSON.stringify(returnJson);
}
function doCreate_gcmMsg_1054_GetConnect(intPageIndex,strReminSysID){
    var returnJson = doGCMMsgCreate(1054);
    returnJson.intPageIndex = intPageIndex;
    returnJson.strReminSysID = strReminSysID;

    return JSON.stringify(returnJson);
}
function doCreate_gcmMsg_1056_GetConnect(intPageIndex,intQueryType,strDateEnd,strDateStart,strSearchContent){
    var returnJson = doGCMMsgCreate(1056);
    returnJson.intPageIndex = intPageIndex;
    returnJson.intQueryType = intQueryType;
    returnJson.strDateEnd = strDateEnd;
    returnJson.strDateStart = strDateStart;
    returnJson.strSearchContent = strSearchContent;

    return JSON.stringify(returnJson);
}
function doCreate_gcmMsg_1058_GetConnect(strContainerSysID){
    var returnJson = doGCMMsgCreate(1058);
    returnJson.strContainerSysID = strContainerSysID;
    return JSON.stringify(returnJson);
}

function doCreate_gcmMsg_1060_GetConnect(strWXTest){
    var returnJson = GZK_Coder.doGCMMsgCreate(1060);
    returnJson.strWXTest = strWXTest;
    return JSON.stringify(returnJson);
}

function doCreate_gcmMsg_872_GetConnect(floatPayMoney,strWXOpenID){
    var returnJson = GZK_Coder.doGCMMsgCreate(872);
    returnJson.floatPayMoney=floatPayMoney;
    returnJson.strWXOpenID=strWXOpenID;
    return JSON.stringify(returnJson);

}

function doCreate_gcmMsg_100_GetConnect(){
    var returnJson = GZK_Coder.doGCMMsgCreate(100);
    returnJson.intSwitch=0;
    return JSON.stringify(returnJson);
}
function doCreate_gcmMsg_102_GetConnect(strWXcode){
    var returnJson = GZK_Coder.doGCMMsgCreate(102);
    returnJson.strWXcode =strWXcode;
    return JSON.stringify(returnJson);
}
function doCreate_gcmMsg_104_GetConnect(strWXOpenID){
    var returnJson = GZK_Coder.doGCMMsgCreate(104);
    returnJson.strWXOpenID=strWXOpenID;
    return JSON.stringify(returnJson);
}
function doCreate_gcmMsg_106_GetConnect(strIdentifyingCode,strPhoneNumber,strWXOpenID){
    var returnJson = GZK_Coder.doGCMMsgCreate(106);
    returnJson.strIdentifyingCode=strIdentifyingCode;
    returnJson.strPhoneNumber=strPhoneNumber;
    returnJson.strWXOpenID=strWXOpenID;
    return JSON.stringify(returnJson);
}
function doCreate_gcmMsg_108_GetConnect(strPhoneNumber,strUserSysID,strWXOpenID){
    var returnJson = GZK_Coder.doGCMMsgCreate(108);
    returnJson.strPhoneNumber=strPhoneNumber;
    returnJson.strUserSysID=strUserSysID;
    returnJson.strWXOpenID=strWXOpenID;
    returnJson.intLngID=0;
    return JSON.stringify(returnJson);
}
function doCreate_gcmMsg_110_GetConnect(floatGPSLat,floatGPSLng,intUserType,strPhoneNumber,strWXOpenID){
    var returnJson = GZK_Coder.doGCMMsgCreate(110);
    returnJson.floatGPSLat=	floatGPSLat;
    returnJson.floatGPSLng=	floatGPSLng;
    returnJson.intUserType=	intUserType;
    returnJson.strPhoneNumber=strPhoneNumber;
    returnJson.strWXOpenID=strWXOpenID;
    return JSON.stringify(returnJson);
}
function doCreate_gcmMsg_112_GetConnect(dateLoadingTime,floatCarLength,intCarType,intFreightPrice,intFromAreaID,intGoodsCubic,intGoodsWeight,intToAreaID,strCompanyName,strContactPhone,strGoodsName,strOtherToAreaDesc,strPublishUserSysID,strRemark,strUserName,strWXOpenID ){
    var returnJson = GZK_Coder.doGCMMsgCreate(112);
    returnJson.dateLoadingTime =dateLoadingTime;
    returnJson.floatCarLength=floatCarLength;
    returnJson.intCarType=intCarType;
    returnJson.intFreightPrice=intFreightPrice;
    returnJson.intFromAreaID=intFromAreaID;
    returnJson.intGoodsCubic=intGoodsCubic;
    returnJson.intGoodsWeight=intGoodsWeight;
    returnJson.intToAreaID=intToAreaID;
    returnJson.strCompanyName =strCompanyName;
    returnJson.strContactPhone =strContactPhone;
    returnJson.strGoodsName =strGoodsName;
    returnJson.	strOtherToAreaDesc =strOtherToAreaDesc;
    returnJson.	strPublishUserSysID =strPublishUserSysID;
    returnJson.	strRemark =strRemark;
    returnJson.	strUserName =strUserName;
    returnJson.	strWXOpenID =strWXOpenID;
    return JSON.stringify(returnJson);
}
function doCreate_gcmMsg_114_GetConnect(floatCarLength,intCarType,intFromAreaID,intToAreaID,strContactPhone,strPublishUserSysID,strRemark,strUserName,strWXOpenID){
    var returnJson = GZK_Coder.doGCMMsgCreate(114);
    returnJson.floatCarLength=floatCarLength;
    returnJson.intCarType=intCarType;
    returnJson.intFromAreaID=intFromAreaID;
    returnJson.intToAreaID=intToAreaID;
    returnJson.strContactPhone =strContactPhone;
    returnJson.	strPublishUserSysID =strPublishUserSysID;
    returnJson.	strRemark =strRemark;
    returnJson.	strUserName =strUserName;
    returnJson.	strWXOpenID =strWXOpenID;
    return JSON.stringify(returnJson);
}
function doCreate_gcmMsg_116_GetConnect(dateSettingTime,intFocusType,intFromAreaID,intPageIndex,intQueryListTypes,intToAreaID,strSearchContent,strWXOpenID){
    var returnJson = GZK_Coder.doGCMMsgCreate(116);
    returnJson.dateSettingTime=dateSettingTime;
    returnJson.intFocusType=intFocusType;
    returnJson.intFromAreaID=intFromAreaID;
    returnJson.intPageIndex=intPageIndex;
    returnJson.intQueryListTypes=intQueryListTypes;
    returnJson.intToAreaID=intToAreaID;
    returnJson.strSearchContent =strSearchContent;
    returnJson.strWXOpenID =strWXOpenID;

    return JSON.stringify(returnJson);
}
function doCreate_gcmMsg_118_GetConnect(strInfoSysID,strWXOpenID){
    var returnJson = GZK_Coder.doGCMMsgCreate(118);
    returnJson.strInfoSysID=strInfoSysID;
    returnJson.strWXOpenID=strWXOpenID;

    return JSON.stringify(returnJson);
}
function doCreate_gcmMsg_120_GetConnect(strInfoSysID,strWXOpenID){
    var returnJson = GZK_Coder.doGCMMsgCreate(120);
    returnJson.strInfoSysID=strInfoSysID;
    returnJson.strWXOpenID=strWXOpenID;

    return JSON.stringify(returnJson);
}
function doCreate_gcmMsg_122_GetConnect(strInfoSysID,strWXOpenID){
    var returnJson = GZK_Coder.doGCMMsgCreate(122);
    returnJson.strInfoSysID=strInfoSysID;
    returnJson.strWXOpenID=strWXOpenID;

    return JSON.stringify(returnJson);
}
function doCreate_gcmMsg_124_GetConnect(intType,strInfoSysID){
    var returnJson = GZK_Coder.doGCMMsgCreate(124);
    returnJson.intType=intType;
    returnJson.strInfoSysID=strInfoSysID;
    return JSON.stringify(returnJson);
}
function doCreate_gcmMsg_126_GetConnect(strWXOpenID){
    var returnJson = GZK_Coder.doGCMMsgCreate(126);
    returnJson.strWXOpenID=strWXOpenID;
    return JSON.stringify(returnJson);
}
function doCreate_gcmMsg_128_GetConnect(strWXOpenID){
    var returnJson = GZK_Coder.doGCMMsgCreate(128);
    returnJson.strWXOpenID=strWXOpenID;
    return JSON.stringify(returnJson);
}
function doCreate_gcmMsg_130_GetConnect(intHistory,intPageIndex,strSearchContent,strWXOpenID){
    var returnJson = GZK_Coder.doGCMMsgCreate(130);
    returnJson.intHistory=intHistory;
    returnJson.intPageIndex=intPageIndex;
    returnJson.strSearchContent=strSearchContent;
    returnJson.strWXOpenID=strWXOpenID;
    return JSON.stringify(returnJson);
}
function doCreate_gcmMsg_132_GetConnect(intQueryTypes){
    var returnJson = GZK_Coder.doGCMMsgCreate(132);
    returnJson.intQueryTypes=intQueryTypes;
    return JSON.stringify(returnJson);
}
function doCreate_gcmMsg_134_GetConnect(intSendSMSType,strPhoneNumber){
    var returnJson = GZK_Coder.doGCMMsgCreate(134);
    returnJson.intSendSMSType=intSendSMSType;
    returnJson.strPhoneNumber=strPhoneNumber;
    return JSON.stringify(returnJson);
}
function doCreate_gcmMsg_136_GetConnect(floatGPSLat,floatGPSLng){
    var returnJson = GZK_Coder.doGCMMsgCreate(136);
    returnJson.floatGPSLat=floatGPSLat;
    returnJson.floatGPSLng=floatGPSLng;
    return JSON.stringify(returnJson);
}
function doCreate_gcmMsg_138_GetConnect(floatCarLength,intCarType,strCarPlateNumber,strCompanyName,strUserAlias,strWXOpenID){
    var returnJson = GZK_Coder.doGCMMsgCreate(138);
    returnJson.floatCarLength=floatCarLength;
    returnJson.intCarType=intCarType;
    returnJson.strCarPlateNumber=strCarPlateNumber;
    returnJson.strCompanyName=strCompanyName;
    returnJson.strUserAlias=strUserAlias;
    returnJson.strWXOpenID=strWXOpenID;
    return JSON.stringify(returnJson);
}
function doCreate_gcmMsg_140_GetConnect(intHistory,intPageIndex,strSearchContent,strWXOpenID){
    var returnJson = GZK_Coder.doGCMMsgCreate(140);
    returnJson.intHistory=intHistory;
    returnJson.intPageIndex=intPageIndex;
    returnJson.strSearchContent=strSearchContent;
    returnJson.strWXOpenID=strWXOpenID;
    return JSON.stringify(returnJson);
}
function doCreate_gcmMsg_142_GetConnect(intHistory,intPageIndex,strSearchContent,strWXOpenID){
    var returnJson = GZK_Coder.doGCMMsgCreate(142);
    returnJson.intHistory=intHistory;
    returnJson.intPageIndex=intPageIndex;
    returnJson.strSearchContent=strSearchContent;
    returnJson.strWXOpenID=strWXOpenID;
    return JSON.stringify(returnJson);
}
function doCreate_gcmMsg_144_GetConnect(intHistory,intPageIndex,strUserSysID){
    var returnJson = GZK_Coder.doGCMMsgCreate(144);
    returnJson.intHistory=intHistory;
    returnJson.intPageIndex=intPageIndex;
    returnJson.strUserSysID=strUserSysID;
    return JSON.stringify(returnJson);
}
function doCreate_gcmMsg_146_GetConnect(intHistory,intPageIndex,strUserSysID){
    var returnJson = GZK_Coder.doGCMMsgCreate(146);
    returnJson.intHistory=intHistory;
    returnJson.intPageIndex=intPageIndex;
    returnJson.strUserSysID=strUserSysID;
    return JSON.stringify(returnJson);
}

function doCreate_gcmMsg_148_GetConnect(floatCarLength,intCarType,intFromAreaID,strFromAreaDesc,intPageIndex,strWXOpenID){
    var returnJson = GZK_Coder.doGCMMsgCreate(148);
    returnJson.floatCarLength=floatCarLength;
    returnJson.intCarType=intCarType;
    returnJson.intFromAreaID=intFromAreaID;
    returnJson.strFromAreaDesc=strFromAreaDesc;
    returnJson.intPageIndex=intPageIndex;
    returnJson.strWXOpenID=strWXOpenID;
    return JSON.stringify(returnJson);
}
function doCreate_gcmMsg_150_GetConnect(intPageIndex,dateQuery,strSearchContent,strWXOpenID){
    var returnJson = GZK_Coder.doGCMMsgCreate(150);
    returnJson.intPageIndex=intPageIndex;
    returnJson.dateQuery=dateQuery;
    returnJson.strSearchContent=strSearchContent;
    returnJson.strWXOpenID=strWXOpenID;
    return JSON.stringify(returnJson);
}
function doCreate_gcmMsg_152_GetConnect(strWXOpenID){
    var returnJson = GZK_Coder.doGCMMsgCreate(152);
    returnJson.strWXOpenID=strWXOpenID;
    return JSON.stringify(returnJson);
}
function doCreate_gcmMsg_154_GetConnect(floatGPSLat,floatGPSLng,strWXOpenID){
    var returnJson = GZK_Coder.doGCMMsgCreate(154);
    returnJson.floatGPSLat=floatGPSLat;
    returnJson.floatGPSLng=floatGPSLng;
    returnJson.strWXOpenID=strWXOpenID;
    return JSON.stringify(returnJson);
}
function doCreate_gcmMsg_202_GetConnect(intPageIndex,intQueryTypes,strSearchContent,strWXOpenID){
    var returnJson = GZK_Coder.doGCMMsgCreate(202);
    returnJson.intPageIndex=intPageIndex;
    returnJson.intQueryTypes=intQueryTypes;
    returnJson.strSearchContent=strSearchContent;
    returnJson.strWXOpenID=strWXOpenID;
    return JSON.stringify(returnJson);
}
function doCreate_gcmMsg_204_GetConnect(intPageIndex,dateQuery,strWXOpenID){
    var returnJson = GZK_Coder.doGCMMsgCreate(204);
    returnJson.intPageIndex=intPageIndex;
    returnJson.dateQuery=dateQuery;
    returnJson.strWXOpenID=strWXOpenID;
    return JSON.stringify(returnJson);
}
function doCreate_gcmMsg_206_GetConnect(strOrderSysID,strWXOpenID){
    var returnJson = GZK_Coder.doGCMMsgCreate(206);
    returnJson.strOrderSysID=strOrderSysID;
    returnJson.strWXOpenID=strWXOpenID;
    return JSON.stringify(returnJson);
}
function doCreate_gcmMsg_860_GetConnect(floatMoneyPay,intUsePayReason,intUsePayType,intWXPayStatus,out_trade_no,strAboutOrderSysID,strWXOpenID){
    var returnJson = GZK_Coder.doGCMMsgCreate(860);
    returnJson.floatMoneyPay=floatMoneyPay;
    returnJson.intUsePayReason=intUsePayReason;
    returnJson.intUsePayType=intUsePayType;
    returnJson.intWXPayStatus=intWXPayStatus;
    returnJson.out_trade_no=out_trade_no;
    returnJson.strAboutOrderSysID=strAboutOrderSysID;
    returnJson.strWXOpenID=strWXOpenID;
    return JSON.stringify(returnJson);
}
function doCreate_gcmMsg_872_GetConnect(floatPayMoney,strDesc,strWXOpenID){
    var returnJson = GZK_Coder.doGCMMsgCreate(872);
    returnJson.floatPayMoney=floatPayMoney;
    returnJson.strDesc=strDesc;
    returnJson.strWXOpenID=strWXOpenID;
    return JSON.stringify(returnJson);
}
function doCreate_gcmMsg_880_GetConnect(strWXOpenID){
    var returnJson = GZK_Coder.doGCMMsgCreate(880);
    returnJson.strWXOpenID=strWXOpenID;
    return JSON.stringify(returnJson);
}
function doCreate_gcmMsg_2500_GetConnect(insuType,strWXOpenID){
    var returnJson = GZK_Coder.doGCMMsgCreate(2500);
    returnJson.insuType=insuType;
    returnJson.strWXOpenID=strWXOpenID;
    return JSON.stringify(returnJson);
}
function doCreate_gcmMsg_2502_GetConnect(intOperationType,selfInsuranceInfo,strWXOpenID){
    var returnJson = GZK_Coder.doGCMMsgCreate(2502);
    returnJson.intOperationType=intOperationType;
    returnJson.selfInsuranceInfo=selfInsuranceInfo;
    returnJson.strWXOpenID=strWXOpenID;
    return JSON.stringify(returnJson);
}
function doCreate_gcmMsg_2504_GetConnect(strOrderNo,strUserMoneySysID,strWXOpenID){
    var returnJson = GZK_Coder.doGCMMsgCreate(2504);
    returnJson.strOrderNo=strOrderNo;
    returnJson.strUserMoneySysID=strUserMoneySysID;
    returnJson.strWXOpenID=strWXOpenID;
    return JSON.stringify(returnJson);
}
function doCreate_gcmMsg_2506_GetConnect(strOrderNo,strWXOpenID){
    var returnJson = GZK_Coder.doGCMMsgCreate(2506);
    returnJson.strOrderNo=strOrderNo;
    returnJson.strWXOpenID=strWXOpenID;
    return JSON.stringify(returnJson);
}
function doCreate_gcmMsg_2508_GetConnect(strOrderNo,strPolicyNo,strWXOpenID){
    var returnJson = GZK_Coder.doGCMMsgCreate(2508);
    returnJson.strOrderNo=strOrderNo;
    returnJson.strPolicyNo=strPolicyNo;
    returnJson.strWXOpenID=strWXOpenID;
    return JSON.stringify(returnJson);
}
function doCreate_gcmMsg_2516_GetConnect(intPageIndex,strSearchContent,strWXOpenID){
    var returnJson = GZK_Coder.doGCMMsgCreate(2516);
    returnJson.	intPageIndex=intPageIndex;
    returnJson.	strSearchContent=strSearchContent;
    returnJson.strWXOpenID=strWXOpenID;
    return JSON.stringify(returnJson);
}
function doCreate_gcmMsg_2522_GetConnect(strOrderNo,selfInsuranceInfo,strWXOpenID){
    var returnJson = GZK_Coder.doGCMMsgCreate(2522);
    returnJson.strOrderNo=strOrderNo;
    returnJson.selfInsuranceInfo=selfInsuranceInfo;
    returnJson.strWXOpenID=strWXOpenID;
    return JSON.stringify(returnJson);
}


module.exports = {
    doCreate_gcmMsg_100_GetConnect: doCreate_gcmMsg_100_GetConnect,
    doCreate_gcmMsg_102_GetConnect: doCreate_gcmMsg_102_GetConnect,
    doCreate_gcmMsg_104_GetConnect: doCreate_gcmMsg_104_GetConnect,
    doCreate_gcmMsg_106_GetConnect: doCreate_gcmMsg_106_GetConnect,
    doCreate_gcmMsg_110_GetConnect: doCreate_gcmMsg_110_GetConnect,
    doCreate_gcmMsg_112_GetConnect: doCreate_gcmMsg_112_GetConnect,
    doCreate_gcmMsg_114_GetConnect: doCreate_gcmMsg_114_GetConnect,
    doCreate_gcmMsg_116_GetConnect: doCreate_gcmMsg_116_GetConnect,
    doCreate_gcmMsg_118_GetConnect: doCreate_gcmMsg_118_GetConnect,
    doCreate_gcmMsg_120_GetConnect: doCreate_gcmMsg_120_GetConnect,
    doCreate_gcmMsg_122_GetConnect: doCreate_gcmMsg_122_GetConnect,
    doCreate_gcmMsg_124_GetConnect: doCreate_gcmMsg_124_GetConnect,
    doCreate_gcmMsg_126_GetConnect: doCreate_gcmMsg_126_GetConnect,
    doCreate_gcmMsg_128_GetConnect: doCreate_gcmMsg_128_GetConnect,
    doCreate_gcmMsg_130_GetConnect: doCreate_gcmMsg_130_GetConnect,
    doCreate_gcmMsg_132_GetConnect: doCreate_gcmMsg_132_GetConnect,
    doCreate_gcmMsg_134_GetConnect: doCreate_gcmMsg_134_GetConnect,
    doCreate_gcmMsg_136_GetConnect: doCreate_gcmMsg_136_GetConnect,
    doCreate_gcmMsg_138_GetConnect: doCreate_gcmMsg_138_GetConnect,
    doCreate_gcmMsg_140_GetConnect: doCreate_gcmMsg_140_GetConnect,
    doCreate_gcmMsg_142_GetConnect: doCreate_gcmMsg_142_GetConnect,
    doCreate_gcmMsg_144_GetConnect: doCreate_gcmMsg_144_GetConnect,
    doCreate_gcmMsg_146_GetConnect: doCreate_gcmMsg_146_GetConnect,
    doCreate_gcmMsg_148_GetConnect: doCreate_gcmMsg_148_GetConnect,
    doCreate_gcmMsg_150_GetConnect: doCreate_gcmMsg_150_GetConnect,
    doCreate_gcmMsg_152_GetConnect: doCreate_gcmMsg_152_GetConnect,
    doCreate_gcmMsg_154_GetConnect: doCreate_gcmMsg_154_GetConnect,
    doCreate_gcmMsg_202_GetConnect: doCreate_gcmMsg_202_GetConnect,
    doCreate_gcmMsg_204_GetConnect: doCreate_gcmMsg_204_GetConnect,
    doCreate_gcmMsg_206_GetConnect: doCreate_gcmMsg_206_GetConnect,
    doCreate_gcmMsg_860_GetConnect: doCreate_gcmMsg_860_GetConnect,
    doCreate_gcmMsg_880_GetConnect: doCreate_gcmMsg_880_GetConnect,
    doCreate_gcmMsg_1000_GetConnect: doCreate_gcmMsg_1000_GetConnect,
    doCreate_gcmMsg_1060_GetConnect: doCreate_gcmMsg_1060_GetConnect,
    doCreate_gcmMsg_872_GetConnect: doCreate_gcmMsg_872_GetConnect,
    doCreate_gcmMsg_2500_GetConnect: doCreate_gcmMsg_2500_GetConnect,
    doCreate_gcmMsg_2502_GetConnect: doCreate_gcmMsg_2502_GetConnect,
    doCreate_gcmMsg_2504_GetConnect: doCreate_gcmMsg_2504_GetConnect,
    doCreate_gcmMsg_2506_GetConnect: doCreate_gcmMsg_2506_GetConnect,
    doCreate_gcmMsg_2508_GetConnect: doCreate_gcmMsg_2508_GetConnect,
    doCreate_gcmMsg_2516_GetConnect: doCreate_gcmMsg_2516_GetConnect,
    doCreate_gcmMsg_2522_GetConnect: doCreate_gcmMsg_2522_GetConnect
};

