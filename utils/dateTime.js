function withData(param){
    return param < 10 ? '0' + param : '' + param;
}
function getLoopArray(start,end){
    var start = start || 0;
    var end = end || 1;
    var array = [];
    for (var i = start; i <= end; i++) {
        array.push(withData(i));
    }
    return array;
}
function getLoopArray_Hours(start,end){
    var start = start || 0;
    var end = end || 1;
    var array = [];
    for (var i = start; i <= end; i++) {
        array.push(i+'0');
    }
    return array;
}
function getMonthDay(year,month){
    var flag = year % 400 == 0 || (year % 4 == 0 && year % 100 != 0), array = null;

    switch (month) {
        case '01':
        case '03':
        case '05':
        case '07':
        case '08':
        case '10':
        case '12':
            array = getLoopArray(1, 31);
            break;
        case '04':
        case '06':
        case '09':
        case '11':
            array = getLoopArray(1, 30);
            break;
        case '02':
            array = flag ? getLoopArray(1, 29) : getLoopArray(1, 28);
            break;
        default:
            array = '月份格式不正确，请重新输入！'
    }
    return array;
}

// 当前时间的处理
function getNewDateArry(){
    var newDateTime=new Date(new Date().getTime()).format('yyyy-MM-dd HH:mm');

    // newDate=new Date(newDateTime).format()
    var time = new Date(newDateTime.replace("-","/"));
    var b = 10; //分钟数
    time.setMinutes(time.getMinutes() + b, time.getSeconds(), 0);
    var newDate=(((new Date().getMinutes()/10)%1==0?Math.ceil(new Date().getMinutes()/10)+1:Math.ceil(new Date().getMinutes()/10))==6?time:new Date());
    var year = withData(newDate.getFullYear()),
        mont = withData(newDate.getMonth() + 1),
        date = withData(newDate.getDate()),
        hour =withData(newDate.getHours()),
        aaa=((new Date().getMinutes()/10)%1==0?Math.ceil(new Date().getMinutes()/10)+1:Math.ceil(newDate.getMinutes()/10)),
        minu = (((new Date().getMinutes()/10)%1==0?Math.ceil(new Date().getMinutes()/10)+1:Math.ceil(newDate.getMinutes()/10))==6?'00':aaa+'0'),
        seco = withData(newDate.getSeconds());
    return [year, mont, date, hour, minu, seco];
}
/*
function getNewDateArry(){
    var newDate = new Date();
    var year = withData(newDate.getFullYear()),
        mont = withData(newDate.getMonth() + 1),
        date = withData(newDate.getDate()),
        hour =withData(newDate.getHours()),
        // minu = withData(newDate.getMinutes()),
        minu = (Math.ceil(newDate.getMinutes()/10)==6?'50':Math.ceil(newDate.getMinutes()/10)+'0'),
        seco = withData(newDate.getSeconds());

    return [year, mont, date, hour, minu, seco];
}*/
function dateTimePicker(startYear,endYear,date) {
    // 返回默认显示的数组和联动数组的声明
    var dateTime = [], dateTimeArray = [[],[],[],[],[],[]];
    var start = startYear || 1978;
    var end = endYear || 2100;
    // 默认开始显示数据
    var defaultDate = date ? [date.split(' ')[0].split('-'),date.split(' ')[1].split(':')] : getNewDateArry();
    // 处理联动列表数据
    /*年月日 时分秒*/
    dateTimeArray[0] = getLoopArray(start,end);
    dateTimeArray[1] = getLoopArray(1, 12);
    dateTimeArray[2] = getMonthDay(defaultDate[0], defaultDate[1]);
    dateTimeArray[3] = getLoopArray(0, 23);
    // dateTimeArray[4] = getLoopArray(0, 59);
    dateTimeArray[4] = getLoopArray_Hours(0,5);
    dateTimeArray[5] = getLoopArray(0, 59);

    dateTimeArray.forEach((current,index) => {
        dateTime.push(current.indexOf(defaultDate[index]));
});
    return {
        dateTimeArray: dateTimeArray,
        dateTime: dateTime
    }
}
Date.prototype.format=function(fmt) {
    var o = {
        "M+" : this.getMonth()+1, //月份
        "d+" : this.getDate(), //日
        "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时
        "H+" : this.getHours(), //小时
        "m+" : this.getMinutes(), //分
        "s+" : this.getSeconds(), //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S" : this.getMilliseconds() //毫秒
    };
    var week = {
        "0" : "日",
        "1" : "一",
        "2" : "二",
        "3" : "三",
        "4" : "四",
        "5" : "五",
        "6" : "六"
    };
    if(/(y+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    if(/(E+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "周" : "星期") : "")+week[this.getDay()+""]);
    }
    for(var k in o){
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt;
}


module.exports = {
    dateTimePicker: dateTimePicker,
    getMonthDay: getMonthDay
}