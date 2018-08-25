import CITY from '../../utils/city.js';

var id;
var cityData={
    'city.imageH':0,
    'city.remark_Hide':true,
    'city.isChecked': false,
    'city.conductors':[],
    'city.models':[],
    'city.search_Arr':[],
    'city.id':0,
    'city.mID':0,
    'city.vehicleParameters':false,
    'city.cityText': '中国',
    'city.showModalStatus': false,
    'city.provincesH': false,
    'city.cityH': true,
    'city.districtH': true,
    'city.returnLevel': false,
    'city.arrayProvince': [],
    'city.arrayCity': [],
    'city.arrayDistrict': [],
    'city.provinceName':'',
    'city.cityName':'',
    'city.districtName':'',
    'city.currentlySelected':'',
    'city.provinceICID':'',
    'city.cityICID':'',
    'city.districtICID':'',
    'city.IndexDistrict': 0,
    'city.region':0,
    'city.L':1,
    'city.areaLength':0,
    'city.inputShowed_City': true,
    'city.inputVal_City': "",
    'city.searchHide': true

};
var cityProgram= {
    /** 搜索地区选择 **/
    selectedSearch:function (e) {
        if (this.data.city.region == 0) {
            this.setData({
                find_CityText: e.currentTarget.dataset.statu,
                cityText: e.currentTarget.dataset.statu,
                cityTextID: e.currentTarget.dataset.icid,
                remark_Hide: false,
                showModalStatus: false,
                'city.showModalStatus': false,
                'city.searchHide': true
            })
        } else {
            this.setData({
                remark_Hide: false,
                find_CityText2: e.currentTarget.dataset.statu,
                cityText2: e.currentTarget.dataset.statu,
                cityText2ID: e.currentTarget.dataset.icid,
                showModalStatus: false,
                'city.showModalStatus': false,
                'city.searchHide': true
            })
        }
    },
    /** 热门地区选择 **/
    selectedHotRegion:function (e) {
            if (this.data.city.region == 0) {
                this.setData({
                    find_CityText: e.currentTarget.dataset.text,
                    cityText: e.currentTarget.dataset.text,
                    cityTextID: e.currentTarget.dataset.icid,
                    remark_Hide: false,
                    showModalStatus: false,
                    'city.showModalStatus': false
                })
            } else {
                this.setData({
                    remark_Hide: false,
                    find_CityText2: e.currentTarget.dataset.text,
                    cityText2: e.currentTarget.dataset.text,
                    cityText2ID: e.currentTarget.dataset.icid,
                    showModalStatus: false,
                    'city.showModalStatus': false
                })
            }

        },
    /** 省地区选择 **/
    selectedProvince: function (e) {
            //获取省份列表
            var array_C = [];
            var arrayTemp = CITY.citylist;
            array_C.push({'name': e.currentTarget.dataset.text + '全境', 'icid': e.currentTarget.id});
            for (var i = 0; i < arrayTemp.length; i++) {
                if ((parseInt(e.currentTarget.id) == arrayTemp[i].p) && (arrayTemp[i].l == 2)) {
                    array_C.push({'name': arrayTemp[i].s, 'icid': arrayTemp[i].c});
                    // array_C.push({'name':arrayTemp[i].s+arrayTemp[i].n,'icid':arrayTemp[i].c});
                }
            }
            //更新市显示
            if (parseInt(e.currentTarget.id) == 100000) {
                if (this.data.city.region == 0) {
                    this.setData({
                        'city.cityText': e.currentTarget.dataset.text,
                        find_CityText: e.currentTarget.dataset.text,
                        cityText: e.currentTarget.dataset.text,
                        cityTextID: e.currentTarget.id,
                        'city.provincesH': false,
                        remark_Hide: false,
                        'city.cityH': true,
                        'city.districtH': true,
                        'city.districtICID': parseInt(e.currentTarget.id),
                        'city.showModalStatus': false,
                        showModalStatus: false
                    })
                } else {
                    this.setData({
                        'city.cityText2': e.currentTarget.dataset.text,
                        find_CityText2: e.currentTarget.dataset.text,
                        cityText2: e.currentTarget.dataset.text,
                        cityText2ID: e.currentTarget.id,
                        remark_Hide: false,
                        'city.provincesH': false,
                        'city.cityH': true,
                        'city.districtH': true,
                        'city.returnLevel': true,
                        'city.districtICID2': parseInt(e.currentTarget.id),
                        'city.showModalStatus': false,
                        showModalStatus: false
                    })
                }
            }else{
                this.setData({
                    'city.L':2,
                    'city.currentlySelected': e.currentTarget.dataset.text,
                    'city.provincesH': true,
                    'city.cityH': false,
                    'city.districtH': true,
                    'city.returnLevel': true,
                    'city.arrayCity': array_C,
                    'city.provinceName': e.currentTarget.dataset.text,
                    'city.provinceICID': parseInt(e.currentTarget.id)


                })
            }
        },
    selectedCity: function (e) {
            //获取区列表
            var arrayTemp1 = [];
            var array_D = [];
            var arrayTemp = CITY.citylist;
            // array_D.push({'name':'返回上一级', 'icid': 0});
            array_D.push({'name': e.currentTarget.dataset.text + '全境', 'icid': e.currentTarget.id});
            for (var i = 0; i < arrayTemp.length; i++) {
                if ((parseInt(e.currentTarget.id) == arrayTemp[i].p) && (arrayTemp[i].l == 3)) {
                    arrayTemp1.push(arrayTemp[i].s);
                    // array_D.push({'name':arrayTemp[i].s+arrayTemp[i].n,'icid':arrayTemp[i].c});
                    array_D.push({'name': arrayTemp[i].s, 'icid': arrayTemp[i].c});
                }
            }

            if (this.data.city.provinceICID == 110100 || this.data.city.provinceICID == 120100 || this.data.city.provinceICID == 500100 || this.data.city.provinceICID == 310100 || e.currentTarget.dataset.index == 0) {
                if (this.data.region == 0) {
                    this.setData({
                        'city.cityText': (e.currentTarget.dataset.index == 0 ? e.currentTarget.dataset.text : this.data.city.provinceName + ',' + e.currentTarget.dataset.text),
                        find_CityText: (e.currentTarget.dataset.index == 0 ? e.currentTarget.dataset.text : this.data.city.provinceName + ',' + e.currentTarget.dataset.text),
                        cityText: (e.currentTarget.dataset.index == 0 ? e.currentTarget.dataset.text : this.data.city.provinceName + ',' + e.currentTarget.dataset.text),
                        cityTextID: e.currentTarget.id,
                        remark_Hide: false,
                        'city.provincesH': false,
                        'city.cityH': true,
                        'city.districtH': true,
                        'city.cityName': e.currentTarget.dataset.text,
                        'city.cityICID': parseInt(e.currentTarget.id),
                        'city.districtICID': parseInt(e.currentTarget.id),
                        'city.showModalStatus': false,
                        showModalStatus: false
                    })
                } else {
                    this.setData({
                        'city.cityText2': (e.currentTarget.dataset.index == 0 ? e.currentTarget.dataset.text : this.data.city.provinceName + ',' + e.currentTarget.dataset.text),
                        cityText2: (e.currentTarget.dataset.index == 0 ? e.currentTarget.dataset.text : this.data.city.provinceName + ',' + e.currentTarget.dataset.text),
                        find_CityText2: (e.currentTarget.dataset.index == 0 ? e.currentTarget.dataset.text : this.data.city.provinceName + ',' + e.currentTarget.dataset.text),
                        cityText2ID: e.currentTarget.id,
                        remark_Hide: false,
                        'city.provincesH': false,
                        'city.cityH': true,
                        'city.districtH': true,
                        'city.cityName': e.currentTarget.dataset.text,
                        'city.cityICID': parseInt(e.currentTarget.id),
                        'city.districtICID2': parseInt(e.currentTarget.id),
                        'city.showModalStatus': false,
                        showModalStatus: false
                    })
                }

            } else {
                //更新区显示
                this.setData({
                    'city.L':3,
                    'city.currentlySelected': (e.currentTarget.dataset.index == 0 ? e.currentTarget.dataset.text : this.data.city.provinceName + ',' + e.currentTarget.dataset.text),
                    'city.provincesH': true,
                    'city.cityH': true,
                    'city.districtH': false,
                    'city.returnLevel': true,
                    'city.arrayDistrict': array_D,
                    'city.cityName': e.currentTarget.dataset.text,
                    'city.cityICID': parseInt(e.currentTarget.id)
                })
            }

        },
    selectedDistrict: function (e) {
            if (this.data.city.region== 0) {
                this.setData({
                    find_CityText:(e.currentTarget.dataset.index == 0 ? e.currentTarget.dataset.text : this.data.city.cityName + ',' + e.currentTarget.dataset.text),
                    'city.L':1,
                    'city.currentlySelected':'',
                    'city.cityText': this.data.city.provinceName + ',' + (e.currentTarget.dataset.index == 0 ? e.currentTarget.dataset.text : this.data.city.cityName + ',' + e.currentTarget.dataset.text),
                   cityText: this.data.city.provinceName + ',' + (e.currentTarget.dataset.index == 0 ? e.currentTarget.dataset.text : this.data.city.cityName + ',' + e.currentTarget.dataset.text),
                    cityTextID: e.currentTarget.id,
                    remark_Hide: false,
                    'city.districtICID': parseInt(e.currentTarget.id),
                    'city.provincesH': false,
                    'city.cityH': true,
                    'city.districtH': true,
                    'city.returnLevel': false,
                    'city.showModalStatus': false,
                    showModalStatus: false
                })
            } else {
                this.setData({
                    find_CityText2:(e.currentTarget.dataset.index == 0 ? e.currentTarget.dataset.text : this.data.city.cityName + ',' + e.currentTarget.dataset.text),
                    'city.L':1,
                    'city.cityText2': this.data.city.provinceName + ',' + (e.currentTarget.dataset.index == 0 ? e.currentTarget.dataset.text : this.data.city.cityName + ',' + e.currentTarget.dataset.text),
                    cityText2:this.data.city.provinceName + ',' + (e.currentTarget.dataset.index == 0 ? e.currentTarget.dataset.text : this.data.city.cityName + ',' + e.currentTarget.dataset.text),
                    cityText2ID: e.currentTarget.id,
                    remark_Hide: false,
                    'city.districtICID2': parseInt(e.currentTarget.id),
                    'city.provincesH': false,
                    'city.cityH': true,
                    'city.districtH': true,
                    'city.returnLevel': false,
                    'city.showModalStatus': false,
                    showModalStatus: false
                })
            }




        },

    nextHigherLevel: function (e) {
            if(this.data.city.L==3){
                var yourString = this.data.city.currentlySelected;
                var result = yourString.split(",");
                this.setData({
                    'city.L':2,
                    'city.currentlySelected': result[0],
                    'city.provincesH': true,
                    'city.cityH': false,
                    'city.districtH': true,
                    'city.returnLevel': true
                })

            }else if(this.data.city.L==2){
                this.setData({
                    'city.L':1,
                    'city.currentlySelected':'',
                    'city.provincesH': false,
                    'city.cityH': true,
                    'city.districtH': true,
                    'city.returnLevel': false
                })
            }else{
                this.setData({
                    'city.L':1,
                    'city.currentlySelected':'',
                    'city.provincesH': false,
                    'city.cityH': true,
                    'city.districtH': true,
                    'city.returnLevel': false
                })
            }
        },
    powerDrawer: function (e) {
            this.setData({
                'city.showModalStatus':false,
                showModalStatus:false,
                remark_Hide:false
            })
        },
    /** 搜索框 **/
    showInput_City: function () {
        this.setData({'city.inputShowed_City': true});
    },
    searchInput_City: function () {
        this.setData({
            'city.inputVal_City': "",
            'city.inputShowed_City': true
        });
    },
        clearInput_City: function () {
            this.setData({
                'city.inputVal_City': "",
                'city.areaLength':0,
                'city.inputShowed_City': true,
                'city.searchHide': true
            });
        },
        inputTyping_City:function (e){
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
                'city.search_Arr': arr,
                'city.areaLength': arr.length,
                'city.inputVal_City': e.detail.value,
                'city.searchHide': false
            });
        }
    };

let loginCity= {
    show: function (data,array) {
        var sysinfo = wx.getSystemInfoSync();

        var array_p = [];
        array_p.push({'name': CITY.citylist[0].s + '全境', 'icid': CITY.citylist[0].c});
        for (var i = 0; i < CITY.citylist.length; i++) {
            if (CITY.citylist[i].l <= 1 && CITY.citylist[i].p > 0) {
                array_p.push({'name': CITY.citylist[i].s, 'icid': CITY.citylist[i].c});
            }
        }
        var publishHeight=0;
        wx.getSystemInfo({
            success: function(res) {
                publishHeight=res.windowHeight*0.8
            }
        });
        this.__page.setData({
            'city.region':data,
            'city.publishHeight':publishHeight,
            'city.showModalStatus': true,
            'city.arrayProvince': array_p,
            'city.provincesH': false,
            'city.cityH': true,
            'city.districtH': true,
            'city.returnLevel': false,
            'city.L': 1,
            'city.search_Arr':'',
            'city.inputVal_City':'',
            'city.currentlySelected':'',
            'city.arrayHotRegion':array,
            'city.searchHide': true
        });


    }
};

function Region(){
    let pages = getCurrentPages();
    let curPage = pages[pages.length - 1];

    // 把组件的事件“合并到”页面对象上
    Object.assign(curPage, cityProgram);

    this.__page = curPage;
    // 附加到page上，方便访问

    Object.assign(this,loginCity);

    curPage.loginCity = this;

    // 把组件的数据“注入”到页面的data对象中
    curPage.setData(cityData);

    return this
}
module.exports = {
    Region
};