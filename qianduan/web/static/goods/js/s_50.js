$(function () {
    //	补零函数
    function l_dbl(x) {
        return x < 10 ? '0' + x : x
    }

    // json数组去重
    function getJsonArr(arr) {
        //定义需要的空数组
        var newArr = [];
        //定义转换字符串后的数组
        var newStringArr = [];
        $.each(arr, function (i, v) {
            var sArr = JSON.stringify(v);
            if ($.inArray(sArr, newStringArr) == -1) {
                // 根据字符串数组push对象
                newStringArr.push(sArr);
                newArr.push(v)
            }
        });
        return newArr;
    }

    function moneyToFixed(money) {
        money = parseFloat(money);
        return money.toFixed(2);
    }

    //获取当前系统时间  年-月-日  时: 分: 秒
    function getCurrentDate() {
        var oDate = new Date();
        var sTime = '';
        sTime = oDate.getFullYear() + '-' + l_dbl(oDate.getMonth() + 1) + '-' + l_dbl(oDate.getDate()) + '&nbsp;&nbsp;&nbsp;' + l_dbl(oDate.getHours()) + ':' + l_dbl(oDate.getMinutes()) + ':' + l_dbl(oDate.getSeconds());
        return sTime
    }

    //获取当前系统时间  年-月-日
    function getCurrentDateDay() {
        var oDate = new Date();
        var sTime = '';
        sTime = oDate.getFullYear() + '-' + l_dbl(oDate.getMonth() + 1) + '-' + l_dbl(oDate.getDate());
        return sTime
    }

    //自动生成编号函数
    function likGetCodeFn(arg) {
        var needCode = '';
        $.ajax({
            url: SERVER_URL + '/admin/autoload',
            type: 'GET',
            data: {token: token, args: arg},
            async: false,
            success: function (oE) {
                // 将返回值转换为json对象
                //var oE = eval("(" + e + ")");
                if (oE.code == 0) {
                    needCode = oE['data'];
                }
            }
        });
        return needCode;
    }

    //js实现数组转换成json
    function arrayToJson(o) {
        var r = [];
        if (typeof o == "string") return "\"" + o.replace(/([\'\"\\])/g, "\\$1").replace(/(\n)/g, "\\n").replace(/(\r)/g, "\\r").replace(/(\t)/g, "\\t") + "\"";
        if (typeof o == "object") {
            if (!o.sort) {
                for (var i in o)
                    r.push("\"" + i + "\"" + ":" + arrayToJson(o[i]));
                if (!!document.all && !/^\n?function\s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/.test(o.toString)) {
                    r.push("toString:" + o.toString.toString());
                }
                r = "{" + r.join() + "}";
            } else {
                for (var i = 0; i < o.length; i++) {
                    r.push(arrayToJson(o[i]));
                }
                r = "[" + r.join() + "]";
            }
            return r;
        }
        return o.toString();
    }


    var token, page, num, keywords, type;
    token = Admin.get_token();
    //token = '2017052516045457073-1-1';
    uid = Admin.get_uid();
    uname = '管理员';


    //刷新
    $('#goods_price_refresh_btn').die('click').live('click', function () {
        //基本商品
        $('.pro_goods_price_list_search_inp').val('请输入关键字/商品编号').css('color', '#ccc');
        getGoodsPriceListData.key = '';
        getGoodsPriceListData.page = 1;
        getGoodsPriceListData.status = '';
        getGoodsPriceListData.unit_id = '';
        getGoodsPriceListData.cate_id = '';
        getGoodsPriceListData.brand_id = '';
        getGoodsPriceListData.attr = '';
        getGoodsPriceListFn();
        $('.pro_goods_price_noshow_invalid_checkbox').attr('checked', 'checked');
        //套餐商品
        getProPackagePriceListData.key = '';
        getProPackagePriceListData.page = '';
        getProPackagePriceListData.status = '';
        getProPackagePriceListData.price = '';
        $('.pro_package_price_list_search_inp').val('请输入关键字/套餐编号').css('color', '#ccc');
        getProPackagePriceListFn();
        $('.pro_package_price_noshow_invalid_checkbox').attr('checked', 'checked');
        //整机商品
        getCompleteGoodsPriceListData.key = '';
        getCompleteGoodsPriceListData.page = 1;
        getCompleteGoodsPriceListData.status = '';
        getCompleteGoodsPriceListData.is_optional = '';
        getCompleteGoodsPriceListData.price = '';
        $('.pro_complete_price_list_search_inp').val('请输入整机商品名称/整机商品编号').css('color', '#ccc');
        $('.pro_complete_price_list_noshow_invalid_btn').attr('checked', 'checked');
        getCompleteGoodsPriceListFn();
    });

    //切换
    $('.finance_account_tabtitle li').die('click').live('click', function () {
        if ($(this).html() == '商品') {
            $('.hr_left_bjbm').show();
            $('.goods_price_rightconten').addClass('rightcontent');
            getGoodsPriceCateListFn();
            $('.goods_left_box').removeClass('none');
            $('.package_goods_left_box').addClass('none');
        } else if ($(this).html() == '套餐商品') {
            $('.hr_left_bjbm').hide();
            $('.goods_price_rightconten').removeClass('rightcontent');
            getProPackagePriceListFn();
        } else if ($(this).html() == '整机商品') {
            $('.hr_left_bjbm').show();
            $('.goods_price_rightconten').addClass('rightcontent');
            getCompletePriceCateListFn();
            $('.goods_left_box').addClass('none');
            $('.package_goods_left_box').removeClass('none');
        }
    });


//*******************基本商品*****************************************************
//*****************基本商品类别-左侧****************************
    //商品分类
    var goodsPriceGateListData = {
        token: token,
        category: 1, //类型 1.商品 2.整机商品
        name: '', // 分类名称
        detail: 1 // 是否获取各类型的数量总数 0 否 1 是
    };
    getGoodsPriceCateListFn();
    //获取商品分类列表
    function getGoodsPriceCateListFn() {
        $.ajax({
            url: SERVER_URL + '/product-category/list',
            type: 'GET',
            data: goodsPriceGateListData,
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                var datalist = oE.dataList;
                var goodsPriceCateListHtml = '';
                $.each(datalist, function (i, v) {
                    //默认状态，刚开始的时候有一个默认状态
                    goodsPriceCateListHtml += '<li goodscateid ="' + v['id'] + '" class="' + (i == 0 ? 'Sideslip_list_on' : '') + '"><span>' + v['name'] + '（' + v['num'] + '）</span></li>';
                });
                $('.pro_goods_price_cate_list_ul').html(goodsPriceCateListHtml);
                getGoodsPriceListByCateFn($('.pro_goods_price_cate_list_ul li:nth-of-type(1)').attr('goodscateid'));
            },
            error: function (e) {
                console.log(e);
            }
        });
    }

    //商品分类搜索功能
    $('.pro_goods_price_cate_search_btn').die('click').live('click', function () {
        //alert(111);
        if ($('.pro_goods_price_cate_search_inp').val() == '') {
            return false;
        }
        $('.sq_inp_add_list').html('<li style="margin-top: 1px;">' + $('.pro_goods_price_cate_search_inp').val() + ' <i></i></li>');
        goodsPriceGateListData.name = $('.pro_goods_price_cate_search_inp').val();
        getGoodsPriceCateListFn();
        $('.pro_goods_price_cate_search_inp').val('').attr('readonly', true);
    });
    //商品分类搜索-删除关键字
    $('.sq_inp_add_list li i').die('click').live('click', function () {
        $(this).closest('li').remove();
        $('.pro_goods_price_cate_search_inp').val('').attr('readonly', false);
        goodsPriceGateListData.name = '';
        getGoodsPriceCateListFn();
    });
    //选择商品分类切换商品列表
    $('.pro_goods_price_cate_list_ul li').die('click').live('click', function () {
        $('.pro_goods_price_list_search_inp').val('请输入关键字/商品编号').css('#ccc');
        getGoodsPriceListData.key = '';
        getGoodsPriceListData.page = 1;
        getGoodsPriceListByCateFn($(this).attr('goodscateid'));
    });
    //切换分类调取不同列表 函数
    function getGoodsPriceListByCateFn(cateid) {
        if (cateid == undefined) {
            $('.pro_goods_price_list_tbody').addClass('none');
            $('.pro_goods_price_list_handle').addClass('none');
            $('.pro_goods_price_list_nodata_box').removeClass('none');
            $('.pro_goods_price_list_table_total').addClass('none');
            return false;
        } else {
            getGoodsPriceListData.cate_id = cateid;
            $('.pro_goods_price_list_tbody').removeClass('none');
            $('.pro_goods_price_list_handle').removeClass('none');
            $('.pro_goods_price_list_nodata_box').addClass('none');
            $('.pro_goods_price_list_table_total').removeClass('none');
        }
        getGoodsPriceListFn();
    }

//************基本商品价格-右侧****************************************
    //获取基本商品列表参数
    var getGoodsPriceListData = {
        token: token,
        key: '', //关键字
        page: 1, //页码
        num: 10, //每页数量
        status: '', //是否启用状态 0正常 1停用
        unit_id: '', // 基本单位id
        cate_id: '', //分类id
        brand_id: '', //品牌ID
        attr: '' //属性
    };
    //获取基本商品列表
    function getGoodsPriceListFn() {
        $.ajax({
            url: SERVER_URL + '/product/list',
            type: 'GET',
            data: getGoodsPriceListData,
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                //搜索结果
                $('.pro_goods_price_search_num_total').html(oE.totalcount);
                var datalist = oE.dataList;
                if (datalist.length == 0) {
                    $('.pro_goods_price_list_nodata_box').removeClass('none');
                    $('.pro_goods_price_list_handle').addClass('none');
                    $('.pro_goods_price_list_table_total').addClass('none');
                } else {
                    $('.pro_goods_price_list_nodata_box').addClass('none');
                    $('.pro_goods_price_list_handle').removeClass('none');
                    $('.pro_goods_price_list_table_total').removeClass('none');
                }
                var goodsPriceListHtml = '';
                $.each(datalist, function (i, v) {
                    //停用之后
                    if (v['status'] == 0) {
                        goodsClass = '';
                        goodsOperateBtn = '<button class="but_mix val_dialog but_exit goods_adjust_price_btn" name="sp_price_tj">调价</button>';
                        goodsPClass = 'f_color';
                    } else {
                        goodsClass = 'grey';
                        goodsOperateBtn = ' <button class="but_mix1 but_grey1">调价</button>';
                        goodsPClass = '';
                    }
                    //属性值
                    var goodsPriceAttrValue = '';
                    $.each(v['attributes'], function (i2, v2) {
                        goodsPriceAttrValue += v2['value'] + '/';
                    });
                    goodsPriceAttrValue = goodsPriceAttrValue.slice(0, goodsPriceAttrValue.length - 1);
                    //列表内容<td>' + likNullData(v['code_sn']) + '</td>\<td>' + likNullData(v['name'])+ '</td>\<td>' + likNullData(v['unit_name']) + '</td>\
                    goodsPriceListHtml += '<tr goodsid="' + v['id'] + '" class="' + goodsClass + '">\
                        <td>' + l_dbl(i + 1) + '</td>\
                        <td><p class="xiamgmu_p4">' + goodsPriceAttrValue + '</p></td>\
                        <td class="sp_price_show">\
                        <p class="' + goodsPClass + ' goodsretailpricetotal">' + likNullData(moneyToFixed(v['retail_price'])) + '</p>\
                        <div class="sp_price_slvMsgBox sp_div_show" style="display: none;">\
                        <i class="sp_spsl_torr"></i>\
                        <ul class="sp_price_MSGlist">\
                        <li>\
                        <p>最新零售价(元):</p>\
                    <p class="c_r">含税：' + likNullData(moneyToFixed((v['retail_price'] * (1.17)))) + '<span class="c_9">（增值税17%，税额：' + likNullData(moneyToFixed((v['retail_price'] * (0.17)))) + '）</span></p>\
                    <p class="c_9">无税：' + likNullData(moneyToFixed(v['retail_price'])) + '</p>\
                    </li>\
                    </ul>\
                    </div>\
                    </td>\
                    <td class="sp_price_show">\
                        <p class="' + goodsPClass + ' goodslowerpricetotal">' + likNullData(moneyToFixed(v['lower_price'])) + '</p>\
                        <div class="sp_price_slvMsgBox sp_div_show" style="display: none;">\
                        <i class="sp_spsl_torr"></i>\
                        <ul class="sp_price_MSGlist">\
                        <li>\
                        <p>最新最低价(元):</p>\
                    <p class="c_r">含税：' + likNullData(moneyToFixed((v['lower_price'] * (1.17)))) + '<span class="c_9">（增值税17%，税额：' + likNullData(moneyToFixed((v['lower_price'] * (0.17)))) + '）</span></p>\
                    <p class="c_9">无税：' + likNullData(moneyToFixed(v['lower_price'])) + '</p>\
                    </li>\
                    </ul>\
                    </div>\
                    </td>\
                    <td class="sp_price_show '+proGoodsPriceStatus+'">\
                        <p class="' + goodsPClass + ' goodscostpricetotal">' +likNullData(moneyToFixed(v['cost_price'])) + '</p>\
                        <div class="sp_price_slvMsgBox sp_div_show" style="display: none;">\
                        <i class="sp_spsl_torr"></i>\
                        <ul class="sp_price_MSGlist">\
                        <li>\
                        <p>最新成本价(元):</p>\
                    <p class="c_r">含税：' + likNullData(moneyToFixed((v['cost_price'] * (1.17)))) + '<span class="c_9">（增值税17%，税额：' + likNullData(moneyToFixed((v['cost_price'] * (0.17)))) + '）</span></p>\
                    <p class="c_9">无税：' + likNullData(moneyToFixed(v['cost_price'])) + '</p>\
                    </li>\
                    </ul>\
                    </div>\
                    </td>\
                    <td class="sp_price_show '+ proGoodsPriceStatus +'">\
                        <p class="' + goodsPClass +' goodsstatuspricetotal">' + likNullData(moneyToFixed(v['status'])) + '</p>\
                        <div class="sp_price_slvMsgBox sp_div_show" style="display: none;left:-90px;">\
                        <i class="sp_spsl_torr" style="left: 135px;"></i>\
                        <ul class="sp_price_MSGlist">\
                        <li>\
                        <p>最新采购价(元):</p>\
                    <p class="c_r">含税：' + likNullData(moneyToFixed((v['status'] * (1.17)))) + '<span class="c_9">（增值税17%，税额：' + likNullData(moneyToFixed((v['status'] * (0.17)))) + '）</span></p>\
                    </li>\
                    </ul>\
                    </div>\
                    </td>\
                    <td>' + goodsOperateBtn + '</td>\
                        </tr>';
                });
                $('.pro_goods_price_list_tbody').html(goodsPriceListHtml);
                ////商品-最新零售价合计
                //var goodsRetailPriceTotal = 0;
                //$.each($('.pro_goods_price_list_tbody .goodsretailpricetotal'),function(i,v){
                //    goodsRetailPriceTotal += parseFloat($('.pro_goods_price_list_tbody .goodsretailpricetotal').eq(i).text());
                //});
                //$('.pro_goods_retail_price_total').html(goodsRetailPriceTotal);
                ////商品-最新最低价合计
                //var goodsLowerPriceTotal = 0;
                //$.each($('.pro_goods_price_list_tbody .goodslowerpricetotal'),function(i,v){
                //    goodsLowerPriceTotal += parseFloat($('.pro_goods_price_list_tbody .goodslowerpricetotal').eq(i).text());
                //});
                //$('.pro_goods_lower_price_total').html(goodsLowerPriceTotal);
                //分页
                list_table_render_pagination('.pro_goods_price_list_page', getGoodsPriceListData, getGoodsPriceListFn, oE.totalcount, datalist.length);
            },
            error: function (e) {
                console.log(e);
            }
        });
    }

    //搜索关键字
    $('.pro_goods_price_list_search_btn').die('click').live('click', function () {
        if ($('.pro_goods_price_list_search_inp').val() == '请输入关键字/商品编号') {
            getGoodsPriceListData.key = '';
        } else {
            getGoodsPriceListData.key = $('.pro_goods_price_list_search_inp').val();
        }
        getGoodsPriceListFn();
    });
    //不显示停用商品
    $('#pro_goods_price_list_noshow_invalid_btn').die('click').live('click', function () {
        if ($(this).attr('checked') == 'checked') {
            getGoodsPriceListData.status = 0;
        } else {
            getGoodsPriceListData.status = '';
        }
        //getGoodsPriceListFn();
    });
    //基本商品选择查看项
    var proGoodsPriceNoListLookAbledField = [
        {'index': null, 'field': '基本单位'},
        {'index': null, 'field': '最新采购价（元）'}
    ]
    likShow('.goods_price_table', proGoodsPriceNoListLookAbledField, '#goods_price_choose_look_ul', '#goods_price_choose_look_save', '#goods_price_choose_look_reset');
    //不显示停用状态
    $('.pro_goods_price_noshow_invalid_checkbox').die('click').live('click', function () {
        if ($(this).attr('checked') == 'checked') {
            getGoodsPriceListData.status = 0;
        } else {
            getGoodsPriceListData.status = '';
        }
        getGoodsPriceListFn();
    });

//*********************套餐商品*********************************************************
    //获取套餐商品列表参数
    var getProPackagePriceListData = {
        token: token,
        key: '', //关键字
        page: 1, //页码
        num: 10, //每页数量
        status: 0, //是否启用状态：0启用 1停用
        price: 1 //计算套餐总价格 0 否 1 是
    };
    getProPackagePriceListFn();
    //获取套餐商品列表参数
    function getProPackagePriceListFn() {
        $.ajax({
            url: SERVER_URL + '/product-package/list',
            type: 'GET',
            data: getProPackagePriceListData,
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                if (oE.code == 0) {
                    var datalist = oE.datalist;
                    if (datalist.length == 0) {
                        $('.pro_package_price_list_nodata_box').removeClass('none');
                        $('.pro_package_price_list_handle').addClass('none');
                        $('.pro_package_price_list_table_total').addClass('none');
                    } else {
                        $('.pro_package_price_list_nodata_box').addClass('none');
                        $('.pro_package_price_list_handle').removeClass('none');
                        $('.pro_package_price_list_table_total').removeClass('none');
                    }
                    //搜索结果
                    $('.pro_package_price_list_num_total').html(oE.totalcount);
                    var proPackagePriceListHtml = '';
                    $.each(datalist, function (i, v) {
                        //停用之后
                        if (v['status'] == 0) {
                            packageClass = '';
                            packageOperateBtn = '<button class="but_mix val_dialog but_exit sp_package_price_adjust_btn" name="sp_pricetc_tj">调价</button>';
                            packagePClass = 'f_color';
                        } else {
                            packageClass = 'grey';
                            packageOperateBtn = ' <button class="but_mix1 but_grey1">调价</button>';
                            packagePClass = '';
                        }
                        proPackagePriceListHtml += '<tr packageid="' + v['id'] + '" class="' + packageClass + '">\
                            <td>' + l_dbl(i + 1) + '</td>\
                            <td>' + likNullData(v['code_sn']) + '</td>\
                            <td>' + likNullData(v['name']) + '</td>\
                            <td class="sp_price_show">\
                            <p class="' + packagePClass + '">' + likNullData(v['total_price']) + '</p>\
                            <div class="sp_price_slvMsgBox sp_div_show" style="display: none;">\
                            <i class="sp_spsl_torr"></i>\
                            <ul class="sp_price_MSGlist">\
                            <li>\
                            <p>原价(元):</p>\
                        <p class="c_r">含税：' + likNullData(moneyToFixed(( v['total_price'] * (1.17)))) + '<span class="c_9">（增值税17%，税额：' + likNullData(moneyToFixed(( v['total_price'] * (0.17)))) + '）</span></p>\
                        <p>无税：' + likNullData(v['total_price']) + '</p>\
                        </li>\
                        </ul>\
                        </div>\
                        </td>\
                        <td class="sp_price_show">\
                            <p class="' + packagePClass + '">' + likNullData(v['total_new_price']) + '</p>\
                            <div class="sp_price_slvMsgBox sp_div_show" style="display: none;">\
                            <i class="sp_spsl_torr"></i>\
                            <ul class="sp_price_MSGlist">\
                            <li>\
                            <p>最新套餐总价(元):</p>\
                        <p class="c_r">含税：' + likNullData(moneyToFixed(( v['total_new_price'] * (1.17)))) +'<span class="c_9">（增值税17%，税额：' + likNullData(moneyToFixed(( v['total_new_price'] * (0.17)))) + '）</span></p>\
                        <p>无税：' + likNullData(v['total_new_price']) + '</p>\
                        </li>\
                        </ul>\
                        </div>\
                        </td>\
                        <td>' + packageOperateBtn + '</td>\
                            </tr>';
                    });
                    $('.pro_package_price_list_tbody').html(proPackagePriceListHtml);
                    //分页
                    list_table_render_pagination('.pro_package_price_list_page', getProPackagePriceListData, getProPackagePriceListFn, oE.totalcount, datalist.length);
                }
            },
            error: function (e) {
            }
        });
    }

    //搜索关键字
    $('.pro_package_price_list_search_btn').die('click').live('click', function () {
        if ($('.pro_package_price_list_search_inp').val() == '请输入关键字/套餐编号') {
            getProPackagePriceListData.key = '';
        } else {
            getProPackagePriceListData.key = $('.pro_package_price_list_search_inp').val();
        }
        getProPackagePriceListFn();
    });
    //不显示停用状态
    $('.pro_package_price_noshow_invalid_checkbox').die('click').live('click', function () {
        if ($(this).attr('checked') == 'checked') {
            getProPackagePriceListData.status = 0;
        } else {
            getProPackagePriceListData.status = '';
        }
        getProPackagePriceListFn();
    });

//********************整机商品**************************************************************
    //*****************整机商品类别-左侧****************************
    var getCompletePriceCateData = {
        token: token,
        category: 2, // 类型 1.商品 2.整机商品
        name: '', // 分类名称
        detail: 1 // 是否获取各类型的数量总数 0 否 1 是
    };

    function getCompletePriceCateListFn() {
        $.ajax({
            url: SERVER_URL + '/product-category/list',
            type: 'GET',
            data: getCompletePriceCateData,
            async: false,
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                var datalist = oE.dataList;
                var completePriceCateListHtml = '';
                $.each(datalist, function (i, v) {
                    completePriceCateListHtml += '<li completecatepriceid="' + v['id'] + '" class="' + (i == 0 ? 'Sideslip_list_on' : '') + '"><span>' + v['name'] + '（' + v['num'] + '）</span></li>';
                });
                $('.pro_complete_goods_price_cate_list_ul').html(completePriceCateListHtml);
                //console.log($('.pro_complete_goods_price_cate_list_ul li:nth-of-type(1)').attr('completecatepriceid'));
                getCompleteGoodsPriceListByCateFn($('.pro_complete_goods_price_cate_list_ul li:nth-of-type(1)').attr('completecatepriceid'));
            },
            error: function (e) {
                console.log(e);
            }
        });
    }

    //整机商品分类搜索功能
    $('.pro_complete_goods_price_cate_search_btn').die('click').live('click', function () {
        //alert(111);
        if ($('.pro_complete_price_cate_search_inp').val() == '') {
            return false;
        }
        $('.sq_inp_add_list_complete').html('<li style="margin-top: 1px;">' + $('.pro_complete_price_cate_search_inp').val() + ' <i></i></li>');
        getCompletePriceCateData.name = $('.pro_complete_price_cate_search_inp').val();
        getCompletePriceCateListFn();
        $('.pro_complete_price_cate_search_inp').val('').attr('readonly', true);
    });
    //商品分类搜索-删除关键字
    $('.sq_inp_add_list_complete li i').die('click').live('click', function () {
        $(this).closest('li').remove();
        $('.pro_complete_price_cate_search_inp').val('').attr('readonly', false);
        getCompletePriceCateData.name = '';
        getCompletePriceCateListFn();
    });
    //选择商品分类切换商品列表
    $('.pro_complete_goods_price_cate_list_ul li').die('click').live('click', function () {
        //$('.pro_complete_price_cate_search_inp').val('请输入关键字/商品编号').css('#ccc');
        getCompleteGoodsPriceListData.key = '';
        getCompleteGoodsPriceListData.page = 1;
        getCompleteGoodsPriceListByCateFn($(this).attr('completecatepriceid'));
    });
    //切换分类调取不同列表 函数
    function getCompleteGoodsPriceListByCateFn(cateid) {
        if (cateid == undefined) {
            $('.pro_complete_price_list_tbody').addClass('none');
            $('.pro_complete_price_list_handle').addClass('none');
            $('.pro_complete_price_list_nodata_box').removeClass('none');
            $('.pro_complete_price_list_table_total').addClass('none');
            return false;
        } else {
            getCompleteGoodsPriceListData.cate_id = cateid;
            $('.pro_complete_price_list_tbody').removeClass('none');
            $('.pro_complete_price_list_handle').removeClass('none');
            $('.pro_complete_price_list_nodata_box').addClass('none');
            $('.pro_complete_price_list_table_total').removeClass('none');
        }
        getCompleteGoodsPriceListFn();
    }

//************整机商品价格-右侧****************************************
    //获取整机商品列表参数
    var getCompleteGoodsPriceListData = {
        token: token,
        key: '', //关键字
        page: 1, //页码
        num: 10, //每页数量
        status: '', //是否启用状态 0正常 1停用
        cate_id: '', //分类id
        is_optional: '' //是否可选配 1 是 2 否
    };
    //获取整机商品列表
    function getCompleteGoodsPriceListFn() {
        $.ajax({
            url: SERVER_URL + '/product-setting/list',
            type: 'GET',
            data: getCompleteGoodsPriceListData,
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                //搜索结果
                $('.pro_complete_price_search_num_total').html(oE.totalcount);
                var datalist = oE.datalist;
                if (datalist.length == 0) {
                    $('.pro_complete_price_list_nodata_box').removeClass('none');
                    $('.pro_complete_price_list_handle').addClass('none');
                    $('.pro_complete_price_list_table_total').addClass('none');
                } else {
                    $('.pro_complete_price_list_nodata_box').addClass('none');
                    $('.pro_complete_price_list_handle').removeClass('none');
                    $('.pro_complete_price_list_table_total').removeClass('none');
                }
                var completePriceListHtml = '';
                var completeOperateBtn = '';
                $.each(datalist, function (i, v) {
                    //启用
                    if (v['status'] == 0) {
                        invalidStatusClass = '';
                        completeOperateBtn = '<button class="but_mix val_dialog but_exit complete_adjust_price_btn" name="sp_price_zjtj">调价</button>';
                        packagePClass = 'f_color';
                    } else if (v['status'] == 1) {
                        invalidStatusClass = 'grey';
                        completeOperateBtn = '<button class="but_mix1 but_grey1">调价</button>';
                        packagePClass = '';
                    }
                    //列表内容 <td>' + likNullData(v['code_sn']) + '</td>\
                    completePriceListHtml += '<tr completeid="' + v['id'] + '" class="' + invalidStatusClass + '">\
                        <td>' + l_dbl(i + 1) + '</td>\
                        <td>' + likNullData(v['name']) + '</td>\
                        <td><p class="xiamgmu_p4">' +likNullData(v['attr_name'])+ '</p></td>\
                        <td class="sp_price_show">\
                            <p class="' + packagePClass + '">' + likNullData(moneyToFixed(v['retail_price'])) + '</p>\
                            <div class="sp_price_slvMsgBox sp_div_show" style="display: none;">\
                            <i class="sp_spsl_torr"></i>\
                            <ul class="sp_price_MSGlist">\
                            <li>\
                            <p>最新零售价(元):</p>\
                            <p class="c_r">含税：' + likNullData(moneyToFixed((v['retail_price'] * (1.17)))) + '<span class="c_9">（增值税17%，税额：' + likNullData(moneyToFixed((v['retail_price'] * (0.17)))) + '）</span></p>\
                            <p class="c_9">无税：' + likNullData(moneyToFixed(v['retail_price'])) + '</p>\
                            </li>\
                            </ul>\
                            </div>\
                        </td>\
                    <td class="sp_price_show">\
                        <p class="' + packagePClass + '">' + likNullData(moneyToFixed(v['lower_price'])) + '</p>\
                        <div class="sp_price_slvMsgBox sp_div_show" style="display: none;">\
                        <i class="sp_spsl_torr"></i>\
                        <ul class="sp_price_MSGlist">\
                        <li>\
                        <p>最新最低价(元):</p>\
                    <p class="c_r">含税：' + likNullData(moneyToFixed((v['lower_price'] * (1.17)))) + '<span class="c_9">（增值税17%，税额：' + likNullData(moneyToFixed((v['lower_price'] * (0.17)))) + '）</span></p>\
                    <p class="c_9">无税：' + likNullData(moneyToFixed(v['lower_price'])) + '</p>\
                    </li>\
                    </ul>\
                    </div>\
                    </td>\
                    <td class="sp_price_show '+ proGoodsPriceStatus +'">\
                        <p class="' + packagePClass + '">' + likNullData(moneyToFixed(v['cost_price'])) + '</p>\
                        <div class="sp_price_slvMsgBox sp_div_show" style="display: none;">\
                        <i class="sp_spsl_torr"></i>\
                        <ul class="sp_price_MSGlist">\
                        <li>\
                        <p>最新成本价(元):</p>\
                    <p class="c_r">含税：' + likNullData(moneyToFixed((v['cost_price'] * (1.17)))) + '<span class="c_9">（增值税17%，税额：' + likNullData(moneyToFixed((v['cost_price'] * (0.17)))) + '）</span></p>\
                    <p class="c_9">无税：' + likNullData(moneyToFixed(v['cost_price'])) + '</p>\
                    </li>\
                    </ul>\
                    </div>\
                    </td>\
                    <td class="sp_price_show '+ proGoodsPriceStatus +'">\
                        <p class="' + packagePClass + '">' + likNullData(moneyToFixed(v['purchase_price'])) + '</p>\
                        <div class="sp_price_slvMsgBox sp_div_show" style="display: none;left:-90px;">\
                        <i class="sp_spsl_torr" style="left: 135px;"></i>\
                        <ul class="sp_price_MSGlist">\
                        <li>\
                        <p>最新采购价(元):</p>\
                    <p class="c_r">含税：' + likNullData(moneyToFixed((v['purchase_price'] * (1.17)))) + '<span class="c_9">（增值税17%，税额：' + likNullData(moneyToFixed((v['purchase_price'] * (0.17)))) + '）</span></p>\
                    </li>\
                    </ul>\
                    </div>\
                    </td>\
                    <td>' + completeOperateBtn + '</td>\
                        </tr>';
                });
                //表格主体
                $('.pro_complete_price_list_tbody').html(completePriceListHtml);
                //分页
                list_table_render_pagination('.pro_complete_price_list_page', getCompleteGoodsPriceListData, getCompleteGoodsPriceListFn, oE.totalcount, datalist.length);
                $('.pro_complete_price_list_look_save').trigger('click');
            },
            error: function (e) {
                console.log(e);
            }
        });
    }

    //搜索关键字
    $('.pro_complete_price_list_search_btn').die('click').live('click', function () {
        if ($('.pro_complete_price_list_search_inp').val() == '请输入整机商品名称/整机商品编号') {
            getCompleteGoodsPriceListData.key = '';
        } else {
            getCompleteGoodsPriceListData.key = $('.pro_complete_price_list_search_inp').val();
        }
        getCompleteGoodsPriceListFn();
    });
    //不显示停用商品
    $('.pro_complete_price_list_noshow_invalid_btn').die('click').live('click', function () {
        if ($(this).attr('checked') == 'checked') {
            getCompleteGoodsPriceListData.status = 0;
        } else {
            getCompleteGoodsPriceListData.status = '';
        }
        getCompleteGoodsPriceListFn();
    });

//*******************调价******************************
    //获取历史采购价的参数
    var proPriceHistoryProductData = {
        token:token,
        thetype:1, //类别 1 商品 2 整机商品
        product_id:'', //商品ID&整机ID
        day:''//采购日期
    };
    //历史采购价函数
    function proPriceHistoryProductFn(){
        $.ajax({
            url: SERVER_URL + '/product/historyprice',
            type: 'GET',
            data: proPriceHistoryProductData,
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                if (oE.code == 0) {
                    var datalist = oE.data.datalist;
                    var proPriceHistoryProductHtml = '';

                    $.each(datalist,function(i,v){
                        if(v['is_rate'] ==1){
                            proPriceHistoryProductHtml += '<ul class="sp_lscg_list">\
                            <li>\
                            <p class="sp_lscg_p c_9">\
                            采购日期：<span style="margin-right:25px;">'+v['day']+'</span>负责人：<span >'+v['owner']+'</span>\
                        </p>\
                        <div class="clearfix">\
                            <p class="left">采购价（元）：</p>\
                        <p class="right c_r">含税价（元）</span>：<span>'+v['tax_price']+'</span>\
                            <i class="c_9">（含税'+v['tax_rate']+'，税额：'+v['tax_money']+'元）</i></p>\
                        </div>\
                        </li>\
                        </ul>';
                        }else if(v['is_rate'] ==2){
                            proPriceHistoryProductHtml += '<ul class="sp_lscg_list">\
                                <li>\
                                <p class="sp_lscg_p c_9">\
                                采购日期：<span style="margin-right:25px;">'+v['day']+'</span>负责人：<span>'+v['owner']+'</span>\
                            </p>\
                            <div class="clearfix">\
                                <p class="left">采购价（元）：</p>\
                            <p class="right">无税价（元）：<span>'+v['price']+'</span></p>\
                            </div>\
                            </li>\
                            </ul>';
                        }else if(v['is_rate'] ==3){
                            proPriceHistoryProductHtml += '<ul class="sp_lscg_list">\
                                <li>\
                                <p class="sp_lscg_p c_9">\
                                采购日期：<span style="margin-right:25px;">'+v['day']+'</span>负责人：<span>'+v['owner']+'</span>\
                            </p>\
                            <div class="clearfix">\
                                <p class="left">采购价（元）：</p>\
                            <p class="right">（期初价格）无税价(元)：<span>'+v['price']+'</span></p>\
                            </div>\
                            </li>\
                            </ul>';
                        }

                    });
                    $('.pro_history_price_product_div').html(proPriceHistoryProductHtml);
                }
            }
        });
    }

    //  获取历史调价
    var proHistoryPriceAdjustData = {
        token:token,
        category:1, //类别 1 商品 2 套餐商品 3 整机商品
        cate_id:'',//套餐ID编号（category值为2时 则必填）
        product_id:'', //（category值为1或3时 则必填）
        create_time:''//调价时间
    };
    //历史调价函数
    function proHistoryPriceAdjustFn(){
        console.log(proHistoryPriceAdjustData);
        $.ajax({
            url: SERVER_URL + '/product/setpricelog',
            type: 'GET',
            data: proHistoryPriceAdjustData,
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                if (oE.code == 0) {
                    var datalist = oE.data;
                    var proPriceHistoryAdjustHtml = '';
                    $.each(datalist,function(i,v){
                        proPriceHistoryAdjustHtml += '<ul class="sp_lscg_list ">\
                            <p class="sp_lscg_p c_9" style="position: relative;">\
                            调价人：<span style="margin-right:25px">'+v['user_name']+'</span>采购日期：<span>'+v['create_time']+'</span>\
                        <span class="box_open_btn" style="right: 13px;line-height: 40px;">收起 <i class="right icon_show" style="margin-top: 12px;"></i></span>\
                            </p>\
                            <li>\
                            <div class="clearfix">\
                            <p class="left">成本价（元）</p>\
                        <p class="right">\
                            <span class="c_r goods_sp_m_r">含税价（元）：<span class="c_r">'+moneyToFixed((v['cost_price']*(1.17)))+'</span></span>\
                            <span class="c_3 goods_sp_m_r">无税价（元）：<span class="c_3">'+v['cost_price']+'</span></span>\
                            <i class="c_9">（含税17%，税额：'+moneyToFixed((v['cost_price']*(0.17)))+'元）</i>\
                        </p>\
                        </div>\
                        <div class="clearfix">\
                            <p class="left">零售价（元）</p>\
                        <p class="right">\
                            <span class="c_r goods_sp_m_r">含税价（元）：<span class="c_r">'+moneyToFixed((v['retail_price']*(1.17)))+'</span></span>\
                            <span class="c_3 goods_sp_m_r">无税价（元）：<span class="c_3">'+v['retail_price']+'</span></span>\
                            <i class="c_9">（含税17%，税额：'+moneyToFixed((v['retail_price']*(0.17)))+'元）</i>\
                        </p>\
                        </div>\
                        <div class="clearfix">\
                            <p class="left">最低价（元）</p>\
                        <p class="right">\
                            <span class="c_r goods_sp_m_r">含税价（元）：<span class="c_r">'+moneyToFixed((v['lower_price']*(1.17)))+'</span></span>\
                            <span class="c_3 goods_sp_m_r">无税价（元）：<span class="c_3">'+v['lower_price']+'</span></span>\
                            <i class="c_9">（含税17%，税额：'+moneyToFixed((v['lower_price']*(0.17)))+'元）</i>\
                        </p>\
                        </div>\
                        </li>\
                        </ul>';
                    });
                    $('.pro_history_price_adjuest_div').html(proPriceHistoryAdjustHtml);
                }
            }
        });
    }




//*******************商品调价******************************
    //商品历史采购价
    //上半部分
    $('.goods_adjust_price_btn').die('click').live('click', function () {
        goodsDetailPriceId = $(this).closest('tr').attr('goodsid');
        proPriceHistoryProductData.thetype =1;
        proPriceHistoryProductData.product_id =goodsDetailPriceId;
        proHistoryPriceAdjustData.category =1;
        proHistoryPriceAdjustData.product_id =goodsDetailPriceId;
        goodsPriceAttrValueDetail = $(this).closest('tr').find('td').eq(4).html();
        $.ajax({
            url: SERVER_URL + '/product/loadproduct',
            type: 'GET',
            data: {
                token: token,
                id: goodsDetailPriceId
            },
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                if (oE.code == 0) {
                    var data = oE.data;
                    //调价日期
                    $('.pro_goods_price_list_detail_created_at').html(data['created_at']);
                    //调价人
                    $('.pro_goods_price_list_detail_user_name').html(data['user_name']);
                    //商品名称
                    $('.pro_goods_price_list_detail_name').html(data['name']);
                    //商品属性
                    $('.pro_goods_price_list_attr_value').html(goodsPriceAttrValueDetail);
                    //采购价
                    $('.pro_goods_price_list_purchase_price').html(moneyToFixed(data['purchase_price'] * (1.17)));
                    //税额
                    $('.pro_goods_price_list_purchase_price_a').html(moneyToFixed(data['purchase_price'] * (0.17)));

                }
            }
        });
    });
    //下班部分
    $('.pro_goods_price_list_detail_cost_price').live('keyup', function () {
        $('.pro_goods_price_list_detail_cost_price_a').html(moneyToFixed(parseFloat($(this).val()) * (1.17)));
        $('.pro_goods_price_list_detail_cost_price_b').html(moneyToFixed(parseFloat($(this).val()) * (0.17)));
    });
    $('.pro_goods_price_list_detail_retail_price').live('keyup',function(){
        $('.pro_goods_price_list_detail_retail_price_a').html(moneyToFixed(parseFloat($(this).val()) * (1.17)));
        $('.pro_goods_price_list_detail_retail_price_b').html(moneyToFixed(parseFloat($(this).val()) * (0.17)));
    });
    $('.pro_goods_price_list_detail_lower_price').live('keyup',function(){
        $('.pro_goods_price_list_detail_lower_price_a').html(moneyToFixed(parseFloat($(this).val()) * (1.17)));
        $('.pro_goods_price_list_detail_lower_price_b').html(moneyToFixed(parseFloat($(this).val()) * (0.17)));
    });
    $('.pro_goods_price_list_detail_save').die('click').live('click',function(){
        if($('.pro_goods_price_list_detail_retail_price').val()==0 ||$('.pro_goods_price_list_detail_lower_price').val()==0||$('.pro_goods_price_list_detail_cost_price').val()==0){
            alert('必须要填写相应的价格');
            return false;
        }
        var goods_aaa =$(this);
        $.ajax({
            url : SERVER_URL + '/product/updateprice',
            type:'POST',
            data:{
                token:token,
                id:goodsDetailPriceId,
                retail_price:$('.pro_goods_price_list_detail_retail_price').val(),
                lower_price:$('.pro_goods_price_list_detail_lower_price').val(),
                cost_price:$('.pro_goods_price_list_detail_cost_price').val()
            },
            dataType:'json',
            success:function(oE){
                console.log(oE);
                if(oE.code == 0){
                    console.log('上传成功');
                    goods_aaa.closest('.dialog_box').remove();
                    $('.tanceng').css('display','none');
                    getGoodsPriceListByCateFn($('.pro_goods_price_cate_list_ul>li.Sideslip_list_on').attr('goodscateid'));
                }
            }
        });

    });


//*******************商品采购价******************************
    $('.pro_goods_price_list_history_product').die('click').live('click',function(){
        proPriceHistoryProductFn();
    });
//商品历史调价
    $('.pro_history_adjust_price_btn').die('click').live('click',function(){
        proHistoryPriceAdjustFn();
    });

//*******************套餐商品调价******************************
    //套餐商品采购价
    var proPackageAdjustSaveData={
        token:token,
        package_id:0,
        product_info:''
    }
    //    商品价格下拉框点击事件
    $('.tanceng .xs_goods_select li').die('click').live('click', function () {
        var price = $(this).text().split('(')[0];
        $(this).closest('td').find('input').val(price).trigger('keyup');
    });
    $('.sp_package_price_adjust_btn').die('click').live('click',function(){
        packageGoodsDetailPriceId = $(this).closest('tr').attr('packageid');
        proPackageAdjustSaveData.package_id =packageGoodsDetailPriceId;
        //proPriceHistoryProductData.thetype =2;
        proHistoryPriceAdjustData.category =2;
        proHistoryPriceAdjustData.cate_id =packageGoodsDetailPriceId;
        $.ajax({
            url: SERVER_URL + '/product-package/loadpackage',
            type: 'GET',
            data: {
                token: token,
                id: packageGoodsDetailPriceId,
                detail:1,
                price:1
            },
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                if (oE.code == 0) {
                    var data = oE.data;
                    //调价日期
                    $('.pro_package_goods_price_list_detail_created_at').html(data['created_at']);
                    //调价人
                    $('.pro_package_goods_price_list_detail_user_name').html(data['user_name']);
                    //套餐商品名称
                    $('.pro_package_goods_price_list_detail_name').html(data['name']);
                    //套餐原价
                    $('.pro_package_goods_price_list_detail_total_old_price').html(data['total_price']);
                    var packageGoodsDetailHtml = '';
                    var package_goods_arr = [];
                    $.each(data.package_info,function(i,v){
                        package_goods_arr = package_goods_arr.concat(v['list']);
                    });
                    console.log(package_goods_arr);

                    $.each(package_goods_arr,function(i,v){
                        var packageGoodsPriceAttrValueDetailHtml = '';
                        $.each(v['attributes'],function(i2,v2){
                            packageGoodsPriceAttrValueDetailHtml +=v2['value']+'/';
                        });
                        packageGoodsPriceAttrValueDetailHtml = packageGoodsPriceAttrValueDetailHtml.slice(0, packageGoodsPriceAttrValueDetailHtml.length - 1);
                        packageGoodsDetailHtml +='<tr packageid="'+v['id']+'" packagenum="'+v['relation_id']+'">\
                            <td>' + l_dbl(i + 1) + '</td>\
                            <td>'+v['name']+'</td>\
                            <td>'+v['code_sn']+'</td>\
                            <td>'+packageGoodsPriceAttrValueDetailHtml+'</td>\
                        <td class="package_goods_num">'+v['num']+'</td>\
                        <td class="xs_goods_box" style="position: relative;">\
                        <div class="xs_goods_big_box"><div class="inline_block select_100" style="color: rgb(51, 51, 51);">\
                        <input type="text" class="lik_input_number c_3 time_input xs_bjd_inp xs_xsbjd_inp_60 package_goods_detail_inp pro_package_price_arr" value="'+v['retail_price']+'" packageprice="'+v['cost_price']+'" packageretail="'+v['retail_price']+'" style="color: rgb(153, 153, 153);margin-right: 10px;">\
                        </div>\
                        <ul class="xs_goods_select select_list none" style="padding-bottom: 5px;left: 12px;top: 44px;">\
                        <li>'+v['retail_price']+'(零售价)</li>\
                        <li>'+v['lower_price']+'(最低价)</li>\
                        <li>'+v['cost_price']+'(成本价)</li>\
                        <div class="none"><div class="xs_goods_li_box"><p class="p1">上次报价：</p><p class="p2">0</p></div></div></ul></div>\
                        </td>\
                        <td class="package_goods_total_price">'+(v['num'])*(v['retail_price'])+'</td>\
                        </tr>';
                    });
                    $('.package_goods_detail_tbody').html(packageGoodsDetailHtml);
                    //合计中的数量
                    var packageNumTotal = 0;
                    $.each($('.tanceng .package_goods_detail_tbody .package_goods_num'),function(i,v){
                        packageNumTotal += parseFloat($('.tanceng .package_goods_detail_tbody .package_goods_num').eq(i).text());
                    });
                    $('.pro_package_goods_price_list_detail_num').html(packageNumTotal);
                    //合计中的总价
                    var packagePriceTotal = 0;
                    $.each($('.tanceng .package_goods_detail_tbody .package_goods_total_price'),function(i,v){
                        packagePriceTotal += parseFloat($('.tanceng .package_goods_detail_tbody .package_goods_total_price').eq(i).text());
                        //console.log(packagePriceTotal);
                    });
                    $('.pro_package_goods_price_list_detail_total_price').html(packagePriceTotal);
                }
            }
        });
    });

    $('.package_goods_detail_inp').live('keyup',function(){
        //盈利额
        var addPrice = 0;
        //亏损额
        var subPrice =0;
        $.each($('.tanceng .package_goods_detail_tbody tr'),function(i,v){
            var package_goods_td_val= $('.tanceng .package_goods_detail_tbody tr').eq(i).find('.package_goods_detail_inp').val();
            var package_goods_td_attr = $('.tanceng .package_goods_detail_tbody tr').eq(i).find('.package_goods_detail_inp').attr('packageprice');
            var package_goods_td_num = $('.tanceng .package_goods_detail_tbody tr').eq(i).find('.package_goods_num').text();
            if(parseFloat(package_goods_td_val) >parseFloat(package_goods_td_attr)){
                addPrice += (parseFloat(package_goods_td_val) - parseFloat(package_goods_td_attr))*parseFloat(package_goods_td_num);
            }else{
                subPrice += (parseFloat(package_goods_td_attr)-parseFloat(package_goods_td_val))*parseFloat(package_goods_td_num);
                console.log((parseFloat(package_goods_td_attr)-parseFloat(package_goods_td_val))*parseFloat(package_goods_td_num))
            }
        });
        var package_goods_detail_data = $(this).val();
        var package_goods_detail_num = $(this).closest('tr').find('td.package_goods_num').text();
        $(this).closest('tr').find('.package_goods_total_price').html(package_goods_detail_data*package_goods_detail_num);

        $('.tanceng .package_goods_addPrice').html(addPrice);
        $('.tanceng .package_goods_subPrice').html(subPrice);
        $('.tanceng .package_goods_totalPrice').html(addPrice-subPrice);
        //合计中的总价
        var packagePriceTotal = 0;
        $.each($('.tanceng .package_goods_detail_tbody .package_goods_total_price'),function(i,v) {
            packagePriceTotal += parseFloat($('.tanceng .package_goods_detail_tbody .package_goods_total_price').eq(i).text());
            //console.log(packagePriceTotal);
        });
        $('.pro_package_goods_price_list_detail_total_price').html(packagePriceTotal);
    });

    //套餐商品历史查看
    function proHistoryPriceAdjustPackageFn(){
        $.ajax({
            url: SERVER_URL + '/product/setpricelog',
            type: 'GET',
            data: proHistoryPriceAdjustData,
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                if (oE.code == 0) {
                    var datalist = oE.data;
                    var proPriceHistoryAdjustPackageHtml = '';
                    $.each(datalist,function(i,v){
                        var list = v.list;
                        var proPriceHistoryAdjustPackageTableHtml = '';
                        $.each(list,function(i2,v2){
                            var packageGoodsPriceAttrValueCgHtml = '';
                            $.each(v2['attributes'],function(i3,v3){
                                packageGoodsPriceAttrValueCgHtml +=v3['value']+'/';
                            });
                            packageGoodsPriceAttrValueCgHtml = packageGoodsPriceAttrValueCgHtml.slice(0, packageGoodsPriceAttrValueCgHtml.length - 1);
                            proPriceHistoryAdjustPackageTableHtml += '<tr>\
                                <td class="">' + l_dbl(i + 1) + '</td>\
                                <td>'+v2['name']+'</td>\
                                <td>'+v2['code_sn']+'</td>\
                                <td>'+packageGoodsPriceAttrValueCgHtml+'</td>\
                            <td class="">'+v2['num']+'</td>\
                            <td>'+v2['price']+'</td>\
                            <td>'+(v2['price'])*(v2['num'])+'</td>\
                            </tr>';
                        });
                        proPriceHistoryAdjustPackageHtml += '<div class="box_Open cg_cgbjd_newCon xs_shd_newCon page_108_shdSP">\
                            <div class="box_open_list goods_tc_toggle">\
                            <p class="box_open_head">\
                             <span class="cont_title" style="padding-left: 0;margin-left:-16px;border-left:0;">\
                            原价（元）：<span class="c_r">'+v['total_price']+'</span>\
                            <span class="cont_title" style="padding-left: 0;margin-left:-16px;border-left:0;">\
                            套餐总价（元）：<span class="c_r">'+v['total_new_price']+'</span>\
                        </span>\
                        <span class="c_9 goods_sp_m_r" style="font-size: 12px;">调价日期：<span>'+v['create_time']+'</span></span>\
                        <span class="c_9" style="font-size: 12px;">调价人：<span>'+v['user_name']+'</span></span>\
                        <span class="box_open_btn" style="right: 13px;line-height: 40px;">收起 <i class="right icon_show"></i></span>\
                            </p>\
                            <div class="div_1 container">\
                            <div class="div_1 table-container">\
                            <table>\
                            <thead>\
                            <tr>\
                            <th>序号</th>\
                            <th>商品名称</th>\
                            <th>商品编号</th>\
                            <th>属性</th>\
                            <th>数量</th>\
                            <th>商品单价（元）</th>\
                        <th>总价（元）</th>\
                        </tr>\
                        </thead>\
                        <tbody>'+proPriceHistoryAdjustPackageTableHtml+'</tbody>\
                        </table>\
                        </div>\
                        </div>\
                        </div>\
                        </div>';
                    });
                    $('.pro_history_price_adjuest_package_div').html(proPriceHistoryAdjustPackageHtml);
                }
            }
        });
    }


    //套餐商品历史调价
    $('.pro_history_adjust_price_package_btn').die('click').live('click',function(){
        proHistoryPriceAdjustPackageFn();
    });
    //开启折扣率
    //零售价
    $('.tanceng .goods_package_text').die().live('keyup',function(){
        var proPackagePriceValue=parseFloat($('.goods_package_text').val());
        console.log(proPackagePriceValue);
        if(proPackagePriceValue>=100){
            $('.goods_package_text').val(100);
            proPackagePriceValue =100;
        }
        $.each($('.tanceng .package_goods_detail_tbody tr'),function(i,v){
            var packageRetail=$('.tanceng .package_goods_detail_tbody tr').eq(i).find('.pro_package_price_arr').attr('packageretail');
            $('.tanceng .package_goods_detail_tbody .pro_package_price_arr').eq(i).val(packageRetail*proPackagePriceValue/100);
        });
    });
    //判断是否选中
    $('.goods_package_checkbox').die('click').live('click',function(){
        if($(this).attr('checked')=='checked'){
            $(this).siblings('.goods_package_text').removeAttr('readonly');
            $(this).siblings('.goods_package_text').removeClass('inp_noInput');
            $('.tanceng .package_goods_detail_tbody .pro_package_price_arr').attr('readonly','readonly').removeClass('xs_bjd_inp');
        }else{
            $(this).siblings('.goods_package_text').attr('readonly','readonly');
            $(this).siblings('.goods_package_text').addClass('inp_noInput');
            $('.tanceng .package_goods_detail_tbody .pro_package_price_arr').removeAttr('readonly').addClass('xs_bjd_inp');
            $('.tanceng .goods_package_text').val(0);
        }
    });
    //套餐商品调价保存
    $('.pro_price_package_save').die('click').live('click',function(){
        var proPricePackageArr =[];
        $.each($('.tanceng .package_goods_detail_tbody tr'),function(i,v){
            proPricePackageArr.push({
                id:$('.tanceng .package_goods_detail_tbody tr').eq(i).attr('packagenum'),
                product_id:$('.tanceng .package_goods_detail_tbody tr').eq(i).attr('packageid'),
                price:$('.tanceng .package_goods_detail_tbody tr').eq(i).find('.pro_package_price_arr').val()
            });
            getProPackagePriceListFn();
        });
        proPackageAdjustSaveData.product_info =arrayToJson(proPricePackageArr);
        console.log(proPackageAdjustSaveData);

        var goods_bbb =$(this);
        $.ajax({
            url:SERVER_URL+'/product-package/setproductprice',
            type:'POST',
            data:proPackageAdjustSaveData,
            dataType:'json',
            success:function(oE){
                console.log(oE);
                if(oE.code == 0){
                    console.log('上传成功');
                    goods_bbb.closest('.dialog_box').remove();
                    $('.tanceng').css('display','none');
                }
            }
        });
    });

//*******************整机商品调价******************************
    //整机历史采购价
    //上半部分
    $('.complete_adjust_price_btn').die('click').live('click',function(){
        completeDetailPriceId = $(this).closest('tr').attr('completeid');
        proPriceHistoryProductData.thetype=2;
        proPriceHistoryProductData.product_id =completeDetailPriceId;
        proHistoryPriceAdjustData.category =3;
        proHistoryPriceAdjustData.product_id =completeDetailPriceId;
        completePriceAttrValueDetail = $(this).closest('tr').find('td').eq(3).html();
        $.ajax({
            url: SERVER_URL + '/product-setting/loadsetting',
            type: 'GET',
            data: {
                token: token,
                id: completeDetailPriceId
            },
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                if (oE.code == 0) {
                    var data = oE.data;
                    //调价日期
                    $('.pro_complete_price_list_detail_created_at').html(data['created_at']);
                    //调价人
                    $('.pro_complete_price_list_detail_user_name').html(data['user_name']);
                    //整机商品名称
                    $('.pro_complete_price_list_detail_name').html(data['name']);
                    //整机商品属性
                    $('.pro_complete_price_list_attr_value').html(completePriceAttrValueDetail);
                    //采购价
                    $('.pro_complete_price_list_purchase_price').html(moneyToFixed(data['purchase_price'] * (1.17)));
                    //税额
                    $('.pro_complete_price_list_purchase_price_a').html(moneyToFixed(data['purchase_price'] * (0.17)));

                }
            }
        });
    });
    //下班部分
    $('.pro_complete_price_list_detail_cost_price').live('keyup', function () {
        $('.pro_complete_price_list_detail_cost_price_a').html(moneyToFixed(parseFloat($(this).val()) * (1.17)));
        $('.pro_complete_price_list_detail_cost_price_b').html(moneyToFixed(parseFloat($(this).val()) * (0.17)));
    });
    $('.pro_complete_price_list_detail_retail_price').live('keyup',function(){
        $('.pro_complete_price_list_detail_retail_price_a').html(moneyToFixed(parseFloat($(this).val()) * (1.17)));
        $('.pro_complete_price_list_detail_retail_price_b').html(moneyToFixed(parseFloat($(this).val()) * (0.17)));
    });
    $('.pro_complete_price_list_detail_lower_price').live('keyup',function(){
        $('.pro_complete_price_list_detail_lower_price_a').html(moneyToFixed(parseFloat($(this).val()) * (1.17)));
        $('.pro_complete_price_list_detail_lower_price_b').html(moneyToFixed(parseFloat($(this).val()) * (0.17)));
    });
    $('.pro_complete_price_list_detail_save').die('click').live('click',function(){
        if($('.pro_complete_price_list_detail_retail_price').val()==0 ||$('.pro_complete_price_list_detail_lower_price').val()==0||$('.pro_complete_price_list_detail_cost_price').val()==0){
            alert('必须要填写相应的价格');
            return false;
        }
        var goods_bbb =$(this);
        $.ajax({
            url : SERVER_URL + '/product-setting/updateprice',
            type:'POST',
            data:{
                token:token,
                id:completeDetailPriceId,
                retail_price:$('.pro_complete_price_list_detail_retail_price').val(),
                lower_price:$('.pro_complete_price_list_detail_lower_price').val(),
                cost_price:$('.pro_complete_price_list_detail_cost_price').val()
            },
            dataType:'json',
            success:function(oE){
                console.log(oE);
                if(oE.code == 0){
                    console.log('上传成功');
                    goods_bbb.closest('.dialog_box').remove();
                    $('.tanceng').css('display','none');
                    getCompleteGoodsPriceListByCateFn($('.pro_complete_goods_price_cate_list_ul>li.Sideslip_list_on').attr('completecatepriceid'));
                }
            }
        });

    });
    //*******************商品采购价******************************
    $('.pro_complete_price_list_history_product').die('click').live('click',function(){
        proPriceHistoryProductFn();
    });
//商品历史调价
    $('.pro_history_adjust_price_complete_btn').die('click').live('click',function(){
        proHistoryPriceAdjustFn();
    });

    //权限部分
    if (loginUserInfo['company_admin'] != 1) {
        var proSettingPowerList = loginUserInfo['powerUrls'];
        var proSettingPriceAdjust = 'product/list';

        //商品列表
        var proGoodsPriceStatus='';
        if($.inArray(proGoodsPriceStatus,proSettingPowerList) ==-1){
            proGoodsPriceStatus ='none';
            $('.pro_goods_price_new').addClass('none');
        }else{
            proGoodsPriceStatus ='';
            $('.pro_goods_price_new').removeClass('none');
        }

        //调价
        if($.inArray(proSettingPriceAdjust,proSettingPowerList)== -1){
            $('.pro_goods_price_new').addClass('none');
        }else{
            $('.pro_goods_price_new').removeClass('none');
        }
    }








});
