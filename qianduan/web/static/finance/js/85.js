$(function () {
    //	dialog tree list choose dept_person
    function tree_list_choose_dept_person(datalist, deep) {
        var html = '';
        $.each(datalist, function (index, data) {
            var html_i_list_before = '<i class="list_before_span"></i>';
            html += '<ul class="ul1">';
            for (var j = 0; j < deep; j++) {
                html_i_list_before += '<i class="list_before_span"></i>'
            }
            html += '<li class="left_1" deptchosenid = "' + data["id"] + '">' + html_i_list_before + '<span class="icon_open change_ba"></span><span class="icon_file"></span><span class="list_msg">' + data['name'] + '</span><span class="list_check"><em></em></span></li>';
            if (data['children'] && data['children'].length > 0) {
                html += tree_list_choose_dept_person(data['children'], deep + 1);
            }
            html += '<ul class="ul3" style="display:block;">';
            $.each(data['user_info'], function (index2, data2) {
                var html_i_list_before = '<i class="list_before_span"></i>';
                for (var j = 0; j < deep + 1; j++) {
                    html_i_list_before += '<i class="list_before_span"></i>'
                }
                html += '<li class="left_2 person_left_nav li_person" userinfoid="' + data2['id'] + '">' + html_i_list_before + '<span class="list_msg">' + data2['name'] + ' </span><span class="list_check"><em></em></span></li>'
            });
            html += '</ul>';
            html += '</ul>';
        });
        return html
    }

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

    //JS实现将数字金额转换为大写人民币汉字：
    function convertCurrency(money) {
        //汉字的数字
        var cnNums = new Array('零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖');
        //基本单位
        var cnIntRadice = new Array('', '拾', '佰', '仟');
        //对应整数部分扩展单位
        var cnIntUnits = new Array('', '万', '亿', '兆');
        //对应小数部分单位
        var cnDecUnits = new Array('角', '分', '毫', '厘');
        //整数金额时后面跟的字符
        var cnInteger = '整';
        //整型完以后的单位
        var cnIntLast = '元';
        //最大处理的数字
        var maxNum = 999999999999999.9999;
        //金额整数部分
        var integerNum;
        //金额小数部分
        var decimalNum;
        //输出的中文金额字符串
        var chineseStr = '';
        //分离金额后用的数组，预定义
        var parts;
        if (money == '') {
            return '';
        }
        money = parseFloat(money);
        if (money >= maxNum) {
            //超出最大处理数字
            return '';
        }
        if (money == 0) {
            chineseStr = cnNums[0] + cnIntLast + cnInteger;
            return chineseStr;
        }
        //转换为字符串
        money = money.toString();
        if (money.indexOf('.') == -1) {
            integerNum = money;
            decimalNum = '';
        } else {
            parts = money.split('.');
            integerNum = parts[0];
            decimalNum = parts[1].substr(0, 4);
        }
        //获取整型部分转换
        if (parseInt(integerNum, 10) > 0) {
            var zeroCount = 0;
            var IntLen = integerNum.length;
            for (var i = 0; i < IntLen; i++) {
                var n = integerNum.substr(i, 1);
                var p = IntLen - i - 1;
                var q = p / 4;
                var m = p % 4;
                if (n == '0') {
                    zeroCount++;
                } else {
                    if (zeroCount > 0) {
                        chineseStr += cnNums[0];
                    }
                    //归零
                    zeroCount = 0;
                    chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
                }
                if (m == 0 && zeroCount < 4) {
                    chineseStr += cnIntUnits[q];
                }
            }
            chineseStr += cnIntLast;
        }
        //小数部分
        if (decimalNum != '') {
            var decLen = decimalNum.length;
            for (var i = 0; i < decLen; i++) {
                var n = decimalNum.substr(i, 1);
                if (n != '0') {
                    chineseStr += cnNums[Number(n)] + cnDecUnits[i];
                }
            }
        }
        if (chineseStr == '') {
            chineseStr += cnNums[0] + cnIntLast + cnInteger;
        } else if (decimalNum == '') {
            chineseStr += cnInteger;
        }
        return chineseStr;
    }

    //自动生成编号函数
    function likGetCodeFn(arg) {
        var needCode = '';
        $.ajax({
            url: SERVER_URL + '/admin/autoload',
            type: 'GET',
            data: {token: token, args: arg},
            async: false,
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    needCode = oE['data'];
                }
            }
        });
        return needCode;
    }

    var token, page, num, keywords, thetype;
    token = Admin.get_token();
    // token = '2017052516045457073-1-1';
    cmpyid = loginUserInfo['usercompany_id'];
    uid = Admin.get_uid();
    uname = loginUserInfo['username'];

    //权限部分
    if (loginUserInfo['company_admin'] != 1) {
        var fncPayingPowerList = loginUserInfo['powerUrls'];
        //查看已付款
        var fncPayingYes = 'paying/list';
        //新建付款单
        var fncPayingAdd = 'paying/add';
        //付款提醒设置
        var fncPayingSet = 'paying/set';

        //查看已付款
        if ($.inArray(fncPayingYes, fncPayingPowerList) == -1) {
            $('#fnc_paying_nav_ul').html('<li name="finance_gather_account_gather" class="taba tabhover">应付款</li>');
        } else {
            $('#fnc_paying_nav_ul').html('<li name="finance_gather_account_gather" class="taba tabhover">应付款</li><li name="finance_gather_account_gather" class="taba">已付款</li>');
        }

        //新建付款单
        if ($.inArray(fncPayingAdd, fncPayingPowerList) == -1) {
            $('.fnc_paying_detail_create_log_btn').hide();
        } else {
            $('.fnc_paying_detail_create_log_btn').show();
        }

        //付款提醒设置
        if ($.inArray(fncPayingSet, fncPayingPowerList) == -1) {
            $('.finance_khysqk_xj_1').css('width', '46px').html('<div class="res" title="点击刷新" id="page_85_refresh"></div>');
        } else {
            $('.finance_khysqk_xj_1').css('width', '134px').html('<button class="but_blue ht_but val_dialog page_85_fktx_btn" name="finance_gather_remind">付款提醒</button><div class="res" title="点击刷新" id="page_85_refresh"></div>');
        }
    }

    // 定义选择查看项
    var fncPayingListLookAbledField = [
        {'index': null, 'field': '含税状态'},
        {'index': null, 'field': '结算账户'},
        {'index': null, 'field': '付款方式'}
    ];
    likShow('#fnc_paying_table', fncPayingListLookAbledField, '#fnc_paying_look_field_ul', '#fnc_paying_look_save', '#fnc_paying_look_reset');

    // 已付款 - 定义选择查看项
    var fncPayingYesListLookAbledField = [
        {'index': null, 'field': '含税状态'},
        {'index': null, 'field': '结算账户'},
        {'index': null, 'field': '结算账目'},
        {'index': null, 'field': '付款方式'}
    ];
    likShow('#fnc_paying_yes_table', fncPayingYesListLookAbledField, '#fnc_paying_yes_look_field_ul', '#fnc_paying_yes_look_save', '#fnc_paying_yes_look_reset');

    //获取付款列表
    var getPayingListData = {
        token: token,
        page: 1,
        num: 10,
        keywords: '',
        flag: 1 // 1未付款2已付款
    };

    //判断是否来自消息
    if ($('#left_button_85').attr('fromnotice') == 1) {
        var curId = $('#left_button_85').attr('detailid');
        var secondName = $('#left_button_85').attr('secondmenu');
        $.each($('.tabtitle li'), function (i, v) {
            if (secondName == $.trim($('.tabtitle li').eq(i).text())) {
                //$('.tabtitle li').removeClass('tabhover').eq(i).addClass('tabhover');
                getPayingListData = {
                    token: token,
                    page: 1,
                    num: 10,
                    keywords: '',
                    flag: 1,
                    ids: curId
                };
                setTimeout(function () {
                    $('.tabtitle li').eq(i).trigger('click');
                    $('#left_button_85').attr({
                        'fromnotice': '',
                        'detailid': '',
                        'secondmenu': '',
                        'totable': ''
                    });
                }, 100);
            }
        });
    } else {
        getPayingListFn();
    }


    function getPayingListFn() {
        $.ajax({
            url: SERVER_URL + '/paying/list',
            type: 'GET',
            data: getPayingListData,
            dataType: 'json',
            success: function (oE) {
                if (getPayingListData.flag == 1) {
                    if (oE.code == 0) {
                        //搜索结果
                        $('.fnc_paying_search_num_total').html(oE.totalcount);
                        //总应付款
                        $('.fnc_paying_list_sum_no_total_money').html(oE.sum_no_total_money);
                        //总实付款
                        $('.fnc_paying_list_sum_already_total_money').html(oE.sum_already_total_money);
                        //总应付款
                        $('.fnc_paying_list_sum_all_no_total_money').html(parseFloat(oE.sum_no_total_money) - parseFloat(oE.sum_already_total_money));

                        //当前页应付款
                        $('.fnc_paying_list_cur_page_sum_no_total_money').html(oE.page_no_total_money);
                        //当前页实付款
                        $('.fnc_paying_list_cur_page_page_already_total_money').html(oE.page_already_total_money);
                        var datalist = oE.datalist;
                        if (datalist.length == 0) {
                            $(".fnc_paying_list_nodata_box").removeClass('none');
                            $(".fnc_paying_list_nodata_box_handle").addClass('none');
                            $(".fnc_paying_list_table_total").addClass('none');
                        } else {
                            $(".fnc_paying_list_nodata_box").addClass('none');
                            $(".fnc_paying_list_nodata_box_handle").removeClass('none');
                            $(".fnc_paying_list_table_total").removeClass('none');
                        }
                        var fncPayignListHtml = '';
                        //付款类型
                        var thetypeName = '';
                        //查看详情按钮name值
                        var thetypeBtnName = '';
                        var thetypeBtnClassName = '';
                        //账期状态
                        var accountStatusClass = '';
                        var accountStatusName = '';
                        //含税状态
                        var taxStatusName = '';
                        //付款方式
                        var payingWayName = '';
                        $.each(datalist, function (i, v) {
                            //付款类型
                            if (v['thetype'] == 1) {
                                thetypeName = '销售退款';
                                thetypeBtnName = 'finance_payment_ysqk_xs';
                            } else {
                                thetypeName = '采购付款';
                                thetypeBtnName = 'finance_payment_ysqk';
                            }
                            //账期状态
                            if (v['account_status'] == 2) {
                                accountStatusClass = 'c_y';
                                accountStatusName = '临近';
                            } else if (v['account_status'] == 3) {
                                accountStatusClass = 'c_r';
                                accountStatusName = '逾期';
                            } else {
                                accountStatusClass = 'c_g';
                                accountStatusName = '待收';
                            }
                            //含税状态
                            if (v['tax_status'] == 0) {
                                taxStatusName = '未税';
                            } else if (v['tax_status'] == 1) {
                                taxStatusName = '含税';
                            }
                            //付款方式
                            if (v['paying_way'] == 1) {
                                payingWayName = '现金';
                            } else if (v['paying_way'] == 2) {
                                payingWayName = '电汇';
                            } else if (v['paying_way'] == 3) {
                                payingWayName = '支票';
                            }
                            fncPayignListHtml += '<tr payingid="' + v['id'] + '">\
                                            <td>' + l_dbl(i + 1) + '</td>\
                                            <td class="f_color finance_pay_rent_list">' + v['code_sn'] + '</td>\
                                            <td>' + v['name'] + '</td>\
                                            <td>' + v['owner_name'] + '</td>\
                                            <td>' + thetypeName + '</td>\
                                            <td>' + v['day'] + '</td>\
                                            <td class="' + accountStatusClass + '">' + accountStatusName + '</td>\
                                            <td>' + v['no_pay_money'] + '</td>\
                                            <td>' + v['already_pay_money'] + '</td>\
                                            <td>' + taxStatusName + '</td>\
                                            <td>' + v['account_name'] + '</td>\
                                            <td class="fnc_paying_list_table_unshow ' + (getPayingListData.flag == 1 ? 'none' : '') + '">' + v['choice_cuenta'] + '</td>\
                                            <td>' + payingWayName + '</td>\
                                            <td>\
                                            <button class="but_mix val_dialog fnc_paying_look_btn" name="' + thetypeBtnName + '">付款详情</button>\
                                            </td>\
                                            </tr>'
                        });
                        $('.fnc_paying_list_tbody').html(fncPayignListHtml);
                        //分页
                        list_table_render_pagination('.fnc_paying_list_page', getPayingListData, getPayingListFn, oE.totalcount, datalist.length);
                        $('#fnc_paying_look_save').trigger('click');
                    }
                } else if (getPayingListData.flag == 2) {
                    if (oE.code == 0) {
                        //搜索结果
                        $('.fnc_paying_search_num_total').html(oE.totalcount);
                        //当前页应付款
                        $('.fnc_paying_list_cur_page_sum_no_total_money').html(oE.page_no_total_money);
                        //当前页实付款
                        $('.fnc_paying_list_cur_page_page_already_total_money').html(oE.page_already_total_money);
                        var datalist = oE.datalist;
                        if (datalist.length == 0) {
                            $(".fnc_paying_yes_list_nodata_box").removeClass('none');
                            $(".fnc_paying_yes_list_nodata_box_handle").addClass('none');
                            $(".fnc_paying_yes_list_table_total").addClass('none');
                        } else {
                            $(".fnc_paying_yes_list_nodata_box").addClass('none');
                            $(".fnc_paying_yes_list_nodata_box_handle").removeClass('none');
                            $(".fnc_paying_yes_list_table_total").removeClass('none');
                        }
                        var fncPayignListHtml = '';
                        //付款类型
                        var thetypeName = '';
                        //查看详情按钮name值
                        var thetypeBtnName = '';
                        var thetypeBtnClassName = '';
                        //账期状态
                        var accountStatusClass = '';
                        var accountStatusName = '';
                        //含税状态
                        var taxStatusName = '';
                        //付款方式
                        var payingWayName = '';
                        $.each(datalist, function (i, v) {
                            //付款类型
                            if (v['thetype'] == 1) {
                                thetypeName = '销售退款';
                                thetypeBtnName = 'finance_payment_ysqk_xs';
                            } else {
                                thetypeName = '采购付款';
                                thetypeBtnName = 'finance_payment_ysqk';
                            }
                            //账期状态
                            if (v['account_status'] == 2) {
                                accountStatusClass = 'c_y';
                                accountStatusName = '临近';
                            } else if (v['account_status'] == 3) {
                                accountStatusClass = 'c_r';
                                accountStatusName = '逾期';
                            } else {
                                accountStatusClass = 'c_g';
                                accountStatusName = '待收';
                            }
                            //含税状态
                            if (v['tax_status'] == 0) {
                                taxStatusName = '未税';
                            } else if (v['tax_status'] == 1) {
                                taxStatusName = '含税';
                            }
                            //付款方式
                            if (v['paying_way'] == 1) {
                                payingWayName = '现金';
                            } else if (v['paying_way'] == 2) {
                                payingWayName = '电汇';
                            } else if (v['paying_way'] == 3) {
                                payingWayName = '支票';
                            }
                            fncPayignListHtml += '<tr payingid="' + v['id'] + '">\
                                            <td>' + l_dbl(i + 1) + '</td>\
                                            <td class="f_color finance_pay_rent_list">' + likNullData(v['code_sn']) + '</td>\
                                            <td>' + likNullData(v['name']) + '</td>\
                                            <td>' + likNullData(v['owner_name']) + '</td>\
                                            <td>' + thetypeName + '</td>\
                                            <td>' + likNullData(v['day']) + '</td>\
                                            <td>' + likNullData(v['pay_people']) + '</td>\
                                            <td class="' + accountStatusClass + '">' + accountStatusName + '</td>\
                                            <td>' + likNullData(v['no_pay_money']) + '</td>\
                                            <td>' + likNullData(v['already_pay_money']) + '</td>\
                                            <td>' + taxStatusName + '</td>\
                                            <td>' + likNullData(v['account_name']) + '</td>\
                                            <td class="fnc_paying_list_table_unshow ' + (getPayingListData.flag == 1 ? 'none' : '') + '">' + likNullData(v['choice_cuenta']) + '</td>\
                                            <td>' + payingWayName + '</td>\
                                            <td>\
                                            <button class="but_mix val_dialog fnc_paying_look_btn" name="' + thetypeBtnName + '">付款详情</button>\
                                            </td>\
                                            </tr>'
                        });
                        $('.fnc_paying_yes_list_tbody').html(fncPayignListHtml);
                        //分页
                        list_table_render_pagination('.fnc_paying_yes_list_page', getPayingListData, getPayingListFn, oE.totalcount, datalist.length);
                        $('#fnc_paying_yes_look_save').trigger('click');
                    }
                }

            }
        });
    }

    $('#fnc_paying_nav_ul li:nth-of-type(1)').die('click').live('click', function () {
        getPayingListData.flag = 1;
        getPayingListData.keywords = '';
        $('.fnc_paying_search_inp').val('相关业务单编号/相关业务名称').css('color', '#ccc');
        getPayingListFn();
        $('.fnc_paying_list_table_unshow').addClass('none');
    });

    $('#fnc_paying_nav_ul li:nth-of-type(2)').die('click').live('click', function () {
        getPayingListData.flag = 2;
        getPayingListData.keywords = '';
        $('.fnc_paying_yes_search_inp').val('相关业务单编号/相关业务名称').css('color', '#ccc');
        getPayingListFn();
        $('.fnc_paying_list_table_unshow').removeClass('none');
    });

    //未付款 - 搜索关键字
    $('.fnc_paying_search_btn').die('click').live('click', function () {
        if ($('.fnc_paying_search_inp').val() == '相关业务单编号/相关业务名称') {
            getPayingListData.keywords = '';
        } else {
            getPayingListData.keywords = $('.fnc_paying_search_inp').val();
        }
        getPayingListFn();
    });

    //已付款 - 搜索关键字
    $('.fnc_paying_yes_search_btn').die('click').live('click', function () {
        if ($('.fnc_paying_yes_search_inp').val() == '相关业务单编号/相关业务名称') {
            getPayingListData.keywords = '';
        } else {
            getPayingListData.keywords = $('.fnc_paying_yes_search_inp').val();
        }
        getPayingListFn();
    });
    //刷新
    $('#page_85_refresh').live('click', function () {
        getPayingListData.page = 1;
        getPayingListData.keywords = '';
        $('.fnc_paying_search_inp').val('相关业务单编号/相关业务名称').css('color', '#ccc');
        $('.fnc_paying_yes_search_inp').val('相关业务单编号/相关业务名称').css('color', '#ccc');
        getPayingListData.ids = '';
        getPayingListFn();
    });

    //刷新
    $('.fnc_paying_refresh_btn').die('click').live('click', function () {
        getPayingListData = {
            token: token,
            page: 1,
            num: 10,
            keywords: '',
            flag: 1 // 1未付款2已付款
        };
        $('.fnc_paying_search_inp').val('相关业务单编号/相关业务名称');
        $('.fnc_paying_search_num_inp').val('10');
        getPayingListFn();
    });

    //付款账户id
    var curAccountCompanyId = null;

    //查看付款详情
    var curPayingId = null;
    //新建付款单参数
    var fncPayingCreateData = {
        token: token,
        cs_name: '', // 创建名称 客户名称 供应商名称
        code_sn: '', // 编号
        paying_code_sn: '', // 付款单编号
        name: '', // 结算账户名称
        choice_cuenta: '', // 选择账目
        choice_cuenta_name: '', // 选择账目名称
        way: '', // 方式 1现金 2电汇 3支票
        owner: '', // 付款人
        no_pay_money: '', // 应付款
        already_pay_money: '', // 实付款
        already_pay_money_big: '', // 实付款大写
        note: '', // 备注
        copy_list: '', // 抄送人
        paying_id: '' // 付款id
    };

    //获取付款详情函数
    function getFncPayingDetailFn(curPayingId) {
        $.ajax({
            url: SERVER_URL + '/paying/info',
            type: 'GET',
            data: {
                token: token,
                id: curPayingId
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var data = oE.datalist;
                    //名字
                    $('.fnc_paying_detail_name').html(data['name']);
                    fncPayingCreateData.cs_name = data['name'];
                    //销售单编号
                    $('.fnc_paying_detail_code_sn').html(data['code_sn']);
                    fncPayingCreateData.code_sn = data['code_sn'];
                    //结算账户
                    $('.tanceng .fnc_paying_detail_account_name').html(data['account_name']);
                    fncPayingCreateData.name = data['account_name'];
                    //结算账目id  结算账目名字
                    $('.tanceng .fnc_paying_detail_create_log_btn').attr({
                        'jszmid': data['choice_cuenta'],
                        'jszmname': data['choice_cuenta_name']
                    });
                    //含税状态
                    if (data['tax_status'] == 0) {
                        $('.tanceng .fnc_paying_detail_tax_status').html('未含税');
                    } else if (data['tax_status'] == 1) {
                        $('.tanceng .fnc_paying_detail_tax_status').html('含税');
                    }
                    //付款方式
                    if (data['paying_way'] == 1) {
                        $('.fnc_paying_detail_way').html('现金');
                    } else if (data['paying_way'] == 2) {
                        $('.fnc_paying_detail_way').html('电汇');
                    } else if (data['paying_way'] == 3) {
                        $('.fnc_paying_detail_way').html('支票');
                    }
                    fncPayingCreateData.way = data['paying_way'];
                    //本次应付款
                    $('.fnc_paying_detail_no_pay_money').html(data['no_pay_money']);
                    fncPayingCreateData.no_pay_money = data['no_pay_money'];
                    //总应付款
                    $('.tanceng .fnc_paying_detail_already_pay_money').html(data['already_pay_money']);
                    //剩余款
                    $('.tanceng .fnc_paying_detail_remain').html(data['remain']);
                    //应付款日期
                    $('.tanceng .fnc_paying_detail_pay_day').html(data['day']);
                    //账期状态
                    if (data['account_status'] == 2) {
                        $('.tanceng .fnc_paying_detail_account_status').removeClass('none');
                    } else {
                        $('.tanceng .fnc_paying_detail_account_status').addClass('none');
                    }

                    //付款记录
                    var payingLog = oE.payingLogList;
                    if (payingLog.length == 0) {
                        $('.tanceng .fnc_paying_detail_nodata_box').removeClass('none');
                        $('.tanceng .table_total').addClass('none');
                    } else {
                        $('.tanceng .fnc_paying_detail_nodata_box').addClass('none');
                        $('.tanceng .table_total').removeClass('none');
                    }
                    var payingLogHtml = '';
                    var payingLogTotal = 0;
                    $.each(payingLog, function (i, v) {
                        payingLogHtml += '<tr payinglogid="' + v['id'] + '">\
                                            <td>' + l_dbl(i + 1) + '</td>\
                                            <td>' + v['paying_code_sn'] + '</td>\
                                            <td>' + v['day'] + '</td>\
                                            <td>' + v['owner'] + '</td>\
                                            <td jszmid="' + v['choice_cuenta'] + '">' + v['choice_cuenta_name'] + '</td>\
                                            <td>' + v['already_pay_money'] + '</td>\
                                            <td>' + v['note'] + '</td>\
                                            <td>\
                                            <button class="but_mix val_dialogTop fnc_paying_log_look_detail_btn" name="finance_payment_ckxq">查看付款单</button>\
                                            </td>\
                                           </tr>';
                        payingLogTotal += parseFloat(v['already_pay_money']);
                    });
                    $('.tanceng .fnc_paying_log_list_tbody').html(payingLogHtml);
                    $('.tanceng .fnc_paying_detail_ddskjl_total').html(payingLogTotal);
                    curAccountCompanyId = data['account_id'];
                }
            }
        });
    }

    $('.fnc_paying_look_btn').die('click').live('click', function () {
        curPayingId = $(this).closest('tr').attr('payingid');
        fncPayingCreateData.paying_id = curPayingId;
        getFncPayingDetailFn(curPayingId);
    });

    //查看付款单详情
    $('.tanceng .fnc_paying_log_look_detail_btn').die('click').live('click', function () {
        var curPayingLogId = $(this).closest('tr').attr('payinglogid');
        $.ajax({
            url: SERVER_URL + '/paying/infolog',
            type: 'GET',
            data: {
                token: token,
                id: curPayingLogId
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var data = oE.datalist;
                    //付款单编号
                    $('.tanceng .fnc_paying_log_detail_paying_code_sn').html(data['paying_code_sn']);
                    //客户名称
                    $('.tanceng .fnc_paying_log_detail_cs_name').html(data['cs_name']);
                    //销售单编号
                    $('.tanceng .fnc_paying_log_detail_code_sn').html(data['code_sn']);
                    //结算账户
                    $('.tanceng .fnc_paying_log_detail_name').html(data['name']);
                    //结算账目
                    $('.tanceng .fnc_paying_log_detail_choice_cuenta').html(data['choice_cuenta_name']);
                    //付款方式
                    if (data['way'] == 1) {
                        $('.tanceng .fnc_paying_log_detail_way').html('现金');
                    } else if (data['way'] == 2) {
                        $('.tanceng .fnc_paying_log_detail_way').html('电汇');
                    } else if (data['way'] == 3) {
                        $('.tanceng .fnc_paying_log_detail_way').html('支票');
                    }
                    //付款人
                    $('.tanceng .fnc_paying_log_detail_owner').html(data['owner']);
                    //付款日期
                    $('.tanceng .fnc_paying_log_detail_day').html(data['day']);
                    //应付款项
                    $('.tanceng .fnc_paying_log_detail_no_pay_money').html(data['no_pay_money']);
                    //实付款
                    $('.tanceng .fnc_paying_log_detail_already_pay_money').html(data['already_pay_money']);
                    //大写实付款
                    $('.tanceng .fnc_paying_log_detail_already_pay_money_big').html(data['already_pay_money_big']);
                    //备注
                    $('.tanceng .fnc_paying_log_detail_note').html(data['note']);

                }
            }
        });
    });
    //大写实付款
    $('.tanceng .fnc_paying_detail_create_fkd_already_money_inp').live('keyup', function () {
        $('.tanceng .fnc_paying_detail_create_fkd_already_money_upper').html(convertCurrency($('.tanceng .fnc_paying_detail_create_fkd_already_money_inp').val()));
    });
    //新建付款单
    $('.tanceng .fnc_paying_detail_create_log_btn').die('click').live('click', function () {
        if($('.tanceng .fnc_paying_log_list_tbody tr').length > 0){
            $('.tanceng .fnc_paying_detail_create_log_account_inp').attr('disabled', true).removeClass('select_input').addClass('time_input inp_noInput').val($(this).attr('jszmname')).parent().removeClass('select_mormal');
            fncPayingCreateData.choice_cuenta = $(this).attr('jszmid');
            fncPayingCreateData.choice_cuenta_name = $(this).attr('jszmname');
        }else{
            $('.tanceng .fnc_paying_detail_create_log_account_inp').attr('disabled', false).addClass('select_input').removeClass('time_input inp_noInput').val($(this).attr('jszmname')).parent().addClass('select_mormal');
        }
        //付款单编号
        if ($(this).attr('name') == 'finance_payment_xjsk_xs') {
            $('.tanceng .fnc_paying_detail_create_log_paying_code_sn').val(likGetCodeFn('KHTK'))
        } else if ($(this).attr('name') == 'finance_payment_xjsk') {
            $('.tanceng .fnc_paying_detail_create_log_paying_code_sn').val(likGetCodeFn('GYSFK'))
        }
        fncPayingCreateData.paying_code_sn = $('.tanceng .fnc_paying_detail_create_log_paying_code_sn').val();
        //结算账户
        $('.tanceng .fnc_paying_detail_account_name_inp').val($('.tanceng .fnc_paying_detail_account_name').html());
        //剩余金额
        $('.tanceng .fnc_paying_detail_no_pay_money_create').html($('.tanceng .fnc_paying_detail_remain').html());
        //结算账目列表
        var accountHtml = '';
        $.ajax({
            url: SERVER_URL + '/accounts/list',
            type: 'GET',
            data: {
                token: token,
                company_account_id: curAccountCompanyId
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var datalist = oE.datalist;
                    $.each(datalist, function (i, v) {
                        if (v['type'] != 2) return true;
                        accountHtml += '<li accountid="' + v['id'] + '">' + v['name'] + '</li>'
                    });
                    $('.tanceng .fnc_paying_detail_create_log_account_ul').html(accountHtml);
                }
            }
        });
        //付款人
        $('.tanceng .fnc_paying_detail_create_log_paying_uname').html(uname);
        fncPayingCreateData.owner = uname;
        //付款日期
        $('.tanceng .fnc_paying_detail_create_log_paying_day').html(getCurrentDateDay());
        //抄送人
        $('.tanceng .fnc_paying_create_add_copy_list').html('<li userinfoid="' + uid + '"><em class="icon_personBtn icon_personBtn_msg"></em> <em class="icon_adderBtn"></em> <p class="box_adderName">' + uname + '</p> </li> <li> <em class="icon_personBtn icon_personBtn_add val_dialogTop fnc_paying_create_choose_copy_btn" name="finance_paying_choose_copy"></em> </li>');
    });
    //选择结算账目
    $('.tanceng .fnc_paying_detail_create_log_account_ul li').die('click').live('click', function () {
        fncPayingCreateData.choice_cuenta = $(this).attr('accountid');
        fncPayingCreateData.choice_cuenta_name = $(this).text();
    });
    //添加抄送人
    $('.tanceng .fnc_paying_create_choose_copy_btn').die('click').live('click', function () {
        fncPayingfkdChooseCopy();
    });
    //选择人员保存
    $('.tanceng .fnc_paying_choose_copy_save').die('click').live('click', function () {
        var copyChosen = '';
        $.each($('.tanceng .fnc_paying_create_copy_chosen_list li'), function (i, v) {
            if($('.tanceng .fnc_paying_create_copy_chosen_list').find('li').eq(i).attr('userinfoid') == uid) return true;
            copyChosen += '<li userinfoid="' + $('.tanceng .fnc_paying_create_copy_chosen_list').find('li').eq(i).attr('userinfoid') + '">\
                                <i class="del_img_1">-</i><em class="icon_personBtn icon_personBtn_msg"></em>\
                                <em class="icon_adderBtn"></em>\
                                <p class="box_adderName">' + $('.tanceng .fnc_paying_create_copy_chosen_list').find('li').eq(i).text() + '</p>\
                                </li>';
        });
        $('.tanceng .fnc_paying_create_add_copy_list').html('<li userinfoid="' + uid + '"><em class="icon_personBtn icon_personBtn_msg"></em> <em class="icon_adderBtn"></em> <p class="box_adderName">' + uname + '</p> </li> <li> <em class="icon_personBtn icon_personBtn_add val_dialogTop fnc_paying_create_choose_copy_btn" name="finance_paying_choose_copy"></em> </li>').prepend(copyChosen);
        $('.tanceng .fnc_paying_edit_copy_list').html('<li userinfoid="' + uid + '"><em class="icon_personBtn icon_personBtn_msg"></em> <em class="icon_adderBtn"></em> <p class="box_adderName">' + uname + '</p> </li> <li> <em class="icon_personBtn icon_personBtn_add val_dialogTop fnc_paying_create_choose_copy_btn" name="finance_paying_choose_copy"></em> </li>').prepend(copyChosen);
        $(this).closest('.dialog_box').remove();
    })

    //选择抄送人函数
    function fncPayingfkdChooseCopy() {
        $.ajax({
            type: "get",
            url: SERVER_URL + "/dept/deptlist",
            data: {token: token},
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var deep = 0;
                    $('.tanceng .fnc_paying_create_choose_copy_list').html(tree_list_choose_dept_person(oE.rows, deep));
                    // 所有分类图标样式控制
                    if ($('i.fnc_paying_create_choose_copy_list').children().length == 0) {
                        $('li.left_all span.icon_open').addClass('personOth')
                    }
                    // 下级部门样式控制
                    for (var i = 0, liLeft1 = $('.tanceng .fnc_paying_create_choose_copy_list li.left_1').length; i < liLeft1; i++) {
                        if ($('.tanceng .fnc_paying_create_choose_copy_list li.left_1').eq(i).next('ul').length == 0) {
                            $('.tanceng .fnc_paying_create_choose_copy_list li.left_1').eq(i).find('span.icon_open').addClass('personOth');
                            $('.tanceng .fnc_paying_create_choose_copy_list li.left_1').eq(i).find('span.personOth').closest('li').addClass('deptChild')
                        }
                    }
                    //选择人员左侧选择
                    $('.tanceng .fnc_paying_create_choose_copy_list ul .li_person').die('click').live('click', function () {
                        if ($(this).find('em').hasClass('on')) {
                            $('.tanceng .fnc_paying_create_copy_chosen_list').find('li[userinfoid=' + $(this).attr('userinfoid') + ']').remove()
                            $(this).find('span.list_check em').removeClass('on')
                        } else {
                            $('.tanceng .fnc_paying_create_copy_chosen_list').append('<li userinfoid="' + $(this).attr('userinfoid') + '"><span>' + $(this).children('.list_msg').html() + '</span><i class="list_choose_delete"></i></li>');
                            $(this).find('span.list_check em').addClass('on')
                        }
                    });
                    //选择人员右侧删除
                    $('i.list_choose_delete').die('click').live('click', function () {
                        $(this).closest('li').remove();
                        $('.tanceng .fnc_paying_create_choose_copy_list ul .li_person[userinfoid = "' + $(this).closest('li').attr('userinfoid') + '"]').find('em').removeClass('on');
                    });
                }
            },
            error: function (data) {

            }
        });
    }

    //新建付款单 - 提交
    $('.tanceng .fnc_paying_detail_create_log_submit_btn').die('click').live('click', function () {
        if ($('.tanceng .fnc_paying_detail_create_log_account_inp').val() == '请选择账目') {
            alert('请选择账目');
            return false;
        }
        //实付款
        if ($('.tanceng .fnc_paying_detail_create_fkd_already_money_inp').val() == '') {
            alert('实付款不能为空');
            return false;
        } else {
            if (parseFloat($('.tanceng .fnc_paying_detail_create_fkd_already_money_inp').val()) > parseFloat($('.tanceng .fnc_paying_detail_no_pay_money_create').html())) {
                alert('实付款已超过最大限额');
                return false;
            }
        }
        fncPayingCreateData.already_pay_money = $('.tanceng .fnc_paying_detail_create_fkd_already_money_inp').val();
        //实付款大写
        fncPayingCreateData.already_pay_money_big = $('.tanceng .fnc_paying_detail_create_fkd_already_money_upper').html();
        //备注
        if ($('.tanceng .fnc_paying_detail_create_fkd_note').val() == '备注') {
            fncPayingCreateData.note = '';
        } else {
            fncPayingCreateData.note = $('.tanceng .fnc_paying_detail_create_fkd_note').val();
        }
        //抄送人
        var copyList = '';
        for (var i = 0; i < $('.tanceng .fnc_paying_create_add_copy_list li').length - 1; i++) {
            copyList += $('.tanceng .fnc_paying_create_add_copy_list li').eq(i).attr('userinfoid') + ',';
        }
        copyList = copyList.slice(0, copyList.length - 1);
        fncPayingCreateData.copy_list = copyList;
        $.ajax({
            url: SERVER_URL + '/paying/add',
            type: 'POST',
            data: fncPayingCreateData,
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    getFncPayingDetailFn(curPayingId);
                    getPayingListFn();
                }
            }
        });
        $(this).closest('.dialog_box').remove();
    });
    //阻止重复触发
    $('.fnc_paying_page_select_list li').die('click').live('click', function () {
        return false;
    });


    //付款提醒
    $('.page_85_fktx_btn').live('click', function () {
        $.ajax({
            url: SERVER_URL + '/receipt/getwarning',
            type: 'GET',
            data: {
                token: token,
                thetype: 2
            },
            dataType: 'json',
            success: function (oE) {
                if(oE.code == 0){
                    $('.tanceng .fnc_fktx_day_time').val(oE['datalist']['day']).css('color', '#333');
                }
            },
            error: function(e){
                alert(e.msg);
            }
        });
    });
    var fncFktxData = {
        token: token,
        is_open: '', // 是否开启 1关闭 2开启
        day: '', // 天数
        thetype: 2
    };
    $('.tanceng .fnc_fktx_submit_btn').die('click').live('click', function () {
        if ($('.tanceng .fnc_fktx_checkbox').is(':checked')) {
            fncFktxData.is_open = 2;
        } else {
            fncFktxData.is_open = 1;
        }
        if ($('.tanceng .fnc_fktx_day_time').val() == '') {
            alert('请输入天数');
            return false;
        } else {
            fncFktxData.day = $('.tanceng .fnc_fktx_day_time').val();
        }
        $.ajax({
            url: SERVER_URL + '/receipt/setwarning',
            type: 'POST',
            data: fncFktxData,
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    $('.tanceng').hide().children('.dialog_box').remove();
                }
            },
            error: function (e) {
            }
        });
    });

});
