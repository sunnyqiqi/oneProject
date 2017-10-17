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
        var fncOutputPowerList = loginUserInfo['powerUrls'];
        //查看已付票
        var fncOutputYes = 'output-ticket/list';
        //办理付票
        var fncOutputAdd = 'output-ticket/pay';
        //付票设置
        var fncOutputSet = 'output-ticket/set';

        //查看已付票
        if ($.inArray(fncOutputYes, fncOutputPowerList) == -1) {
            $('#fnc_output_ticket_nav_ul').html('<li name="finance_pay_rent_a" class="taba tabhover">未付票</li>');
        } else {
            $('#fnc_output_ticket_nav_ul').html('<li name="finance_pay_rent_a" class="taba tabhover">未付票</li><li name="finance_pay_rent_a" class="taba">已付票</li>');
        }

        //办理付票
    var fncOutputAddClass = '';
        if ($.inArray(fncOutputAdd, fncOutputPowerList) == -1) {
            fncOutputAddClass = 'none';
        } else {
            fncOutputAddClass = '';
        }

        //付票设置
        if ($.inArray(fncOutputSet, fncOutputPowerList) == -1) {
            $('.fnc_output_ticket_setting_nav').css('width', '46px').html('<div id="fnc_output_ticket_refresh_btn" class="res" title="点击刷新"></div>');
        } else {
            $('.fnc_output_ticket_setting_nav').css('width', '134px').html('<button class="but_blue val_dialog ht_but page_86_fpsz_btn" name="finance_pay_rent_setting">付票设置</button><div id="fnc_output_ticket_refresh_btn" class="res" title="点击刷新"></div>');
        }
    }

    // 未付票定义选择查看项
    var fncOutputTicketNoListLookAbledField = [
        {'index': null, 'field': '结算账户'}
    ];
    likShow('#fnc_output_ticket_no_table', fncOutputTicketNoListLookAbledField, '#fnc_output_ticket_no_look_field_ul', '#fnc_output_ticket_no_look_save', '#fnc_output_ticket_no_look_reset');
    // 已付票定义选择查看项
    var fncOutputTicketYesListLookAbledField = [
        {'index': null, 'field': '结算账户'},
        {'index': null, 'field': '结算账目'}
    ];
    likShow('#fnc_output_ticket_yes_table', fncOutputTicketYesListLookAbledField, '#fnc_output_ticket_yes_look_field_ul', '#fnc_output_ticket_yes_look_save', '#fnc_output_ticket_yes_look_reset');

    //销项付票参数
    var getOutputTicketListData = {
        token: token,
        page: 1,
        num: 10,
        keywords: '',
        thetype: 1, // 1未付票2已付票
        uid: '', // 负责人
        ticket_status: '', // 付票状态 1正常 4待付 2临近 3逾期
        name: '', // 结算账户
        company_id: cmpyid
    };
    getOutPutTicketListNoFn();
    //切换未付票
    $('#fnc_output_ticket_nav_ul li:nth-of-type(1)').die('click').live('click', function () {
        getOutputTicketListData.thetype = 1;
        getOutputTicketListData.page = 1;
        getOutputTicketListData.num = 10;
        $('.fnc_output_ticket_list_yes_search_num_inp').val('10');
        $('.fnc_output_ticket_list_no_search_inp').val('搜索相关业务单编号/相关业务名称').css('color', '#ccc');
        getOutputTicketListData.keywords = '';
        getOutPutTicketListNoFn();
    });
    //切换已付票
    $('#fnc_output_ticket_nav_ul li:nth-of-type(2)').die('click').live('click', function () {
        getOutputTicketListData.thetype = 2;
        getOutputTicketListData.page = 1;
        getOutputTicketListData.num = 10;
        $('.fnc_output_ticket_list_yes_search_num_inp').val('10');
        $('.fnc_output_ticket_list_yes_search_inp').val('搜索相关业务单编号/相关业务名称').css('color', '#ccc');
        getOutputTicketListData.keywords = '';
        getOutPutTicketListYesFn();
    });
    //未付票列表函数
    function getOutPutTicketListNoFn() {
        $.ajax({
            url: SERVER_URL + '/output-ticket/list',
            type: 'GET',
            data: getOutputTicketListData,
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    //搜索总条数
                    $('.fnc_output_ticket_list_num_total').html(oE.totalcount);
                    //应付票款
                    $('.fnc_output_ticket_no_ticket_total').html(oE.no_ticket_total);
                    //总应付票款
                    $('.fnc_output_ticket_total_ticket').html(oE.total_ticket);
                    //实付票款
                    $('.fnc_output_ticket_already_ticket').html(oE.already_ticket);
                    //预计使用票数
                    $('.fnc_output_ticket_expected_ticket_num').html(oE.expected_ticket_num);
                    //本月总剩余票数
                    $('.fnc_output_ticket_total_remain_ticket_num').html(oE.total_remain_ticket_num);
                    //本月总票数
                    $('.fnc_output_ticket_total_ticket_num').html(oE.total_ticket_num);
                    //本月已付票数
                    $('.fnc_output_ticket_already_ticket_num').html(oE.already_ticket_num);;
                    //当前页总应付票款
                    $('.fnc_output_ticket_total_ticket_page').html(oE.no_pay_money_page);
                    //当前页实收款
                    $('.fnc_output_already_pay_money_page').html(oE.already_pay_money_page);
                    //当前页实付票款
                    $('.fnc_output_already_ticket_pay_money_page').html(oE.already_ticket_pay_money_page);
                    var datalist = oE.datalist;
                    if (datalist.length == 0) {
                        $('.fnc_output_ticket_list_no_nodata_box').removeClass('none');
                        $('.fnc_output_ticket_list_no_handle').addClass('none');
                        $('.fnc_output_ticket_list_no_table_total').addClass('none');
                    } else {
                        $('.fnc_output_ticket_list_no_nodata_box').addClass('none');
                        $('.fnc_output_ticket_list_no_handle').removeClass('none');
                        $('.fnc_output_ticket_list_no_table_total').removeClass('none');
                    }
                    var outputListHtml = '';
                    var ticketStatusClass = '';
                    var ticketStatusName = '';
                    $.each(datalist, function (i, v) {
                        if (v['ticket_status'] == 2) {
                            ticketStatusClass = 'c_y';
                            ticketStatusName = '临近';
                        } else if (v['ticket_status'] == 3) {
                            ticketStatusClass = 'c_r';
                            ticketStatusName = '逾期';
                        } else {
                            ticketStatusClass = 'c_g';
                            ticketStatusName = '待付';
                        }
                        outputListHtml += '<tr ticketid="' + v['id'] + '" curaccountid="'+v['company_account_id']+'">\
                                            <td>' + l_dbl(i + 1) + '</td>\
                                            <td class="finance_pay_rent_list f_color">' + v['code_sn'] + '</td>\
                                            <td>' + v['cs_name'] + '</td>\
                                            <td>' + v['owner_name'] + '</td>\
                                            <td>' + v['expected_day'] + '</td>\
                                            <td>' + v['no_pay_money'] + '</td>\
                                            <td>' + v['already_pay_money'] + '</td>\
                                            <td>' + v['already_ticket_pay_money'] + '</td>\
                                            <td>' + v['confirm_day'] + '</td>\
                                            <td class="' + ticketStatusClass + '">' + ticketStatusName + '</td>\
                                            <td>' + v['name'] + '</td>\
                                            <td>\
                                            <button class="but_mix val_dialog fnc_output_ticket_list_detail_btn" name="finance_gysyfqk_yfqk">付票详情</button><button class="'+fncOutputAddClass+' but_mix val_dialog fnc_output_ticket_create_btn" name="finance_pay_rent_fp">付票</button>\
                                            </td>\
                                           </tr>'
                    });
                    $('.fnc_output_ticket_no_tbody').html(outputListHtml);
                    //分页
                    list_table_render_pagination('.fnc_output_ticket_list_no_page', getOutputTicketListData, getOutPutTicketListNoFn, oE.totalcount, datalist.length);
                    $('#fnc_output_ticket_no_look_save').trigger('click');
                }
            }
        });
    }

    //已付票列表函数
    function getOutPutTicketListYesFn() {
        $.ajax({
            url: SERVER_URL + '/output-ticket/list',
            type: 'GET',
            data: getOutputTicketListData,
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    //搜索总条数
                    $('.fnc_output_ticket_list_num_total').html(oE.totalcount);
                    var datalist = oE.datalist;
                    if (datalist.length == 0) {
                        $('.fnc_output_ticket_list_yes_nodata_box').removeClass('none');
                        $('.fnc_output_ticket_list_yes_handle').addClass('none');
                        $('.fnc_output_ticket_list_yes_table_total').addClass('none');
                    } else {
                        $('.fnc_output_ticket_list_yes_nodata_box').addClass('none');
                        $('.fnc_output_ticket_list_yes_handle').removeClass('none');
                        $('.fnc_output_ticket_list_yes_table_total').removeClass('none');
                    }
                    var outputListHtml = '';
                    var ticketStatusClass = '';
                    var ticketStatusName = '';
                    $.each(datalist, function (i, v) {
                        if (v['ticket_status'] == 2) {
                            ticketStatusClass = 'c_y';
                            ticketStatusName = '临近';
                        } else if (v['ticket_status'] == 3) {
                            ticketStatusClass = 'c_r';
                            ticketStatusName = '逾期';
                        } else {
                            ticketStatusClass = 'c_g';
                            ticketStatusName = '待付';
                        }
                        outputListHtml += '<tr ticketid="' + v['id'] + '">\
                                            <td>' + l_dbl(i + 1) + '</td>\
                                            <td class="finance_pay_rent_list f_color">' + v['code_sn'] + '</td>\
                                            <td>' + v['cs_name'] + '</td>\
                                            <td>' + v['owner_name'] + '</td>\
                                            <td>' + v['confirm_day'] + '</td>\
                                            <td>' + v['owner_name'] + '</td>\
                                            <td class="' + ticketStatusClass + '">' + ticketStatusName + '</td>\
                                            <td>' + v['already_pay_money'] + '</td>\
                                            <td>' + v['already_ticket_pay_money'] + '</td>\
                                            <td>' + v['name'] + '</td>\
                                            <td>' + v[''] + '</td>\
                                            <td>\
                                            <button class="but_mix val_dialog fnc_output_ticket_list_detail_btn" name="finance_gysyfqk_yfqk_yfp">付票详情</button>\
                                            </td>\
                                           </tr>';
                    });
                    $('.fnc_output_ticket_yes_tbody').html(outputListHtml);
                    //分页
                    list_table_render_pagination('.fnc_output_ticket_list_yes_page', getOutputTicketListData, getOutPutTicketListYesFn, oE.totalcount, datalist.length);
                    $('#fnc_output_ticket_yes_look_save').trigger('click');
                }
            }
        });
    }

    //未付票搜索关键字
    $('.fnc_output_ticket_list_no_search_btn').die('click').live('click', function () {
        if ($('.fnc_output_ticket_list_no_search_inp').val() == '搜索相关业务单编号/相关业务名称') {
            getOutputTicketListData.keywords = '';
        } else {
            getOutputTicketListData.keywords = $('.fnc_output_ticket_list_no_search_inp').val();
        }
        getOutPutTicketListNoFn();
    });
    //已付票搜索关键字
    $('.fnc_output_ticket_list_yes_search_btn').die('click').live('click', function () {
        if ($('.fnc_output_ticket_list_yes_search_inp').val() == '搜索相关业务单编号/相关业务名称') {
            getOutputTicketListData.keywords = '';
        } else {
            getOutputTicketListData.keywords = $('.fnc_output_ticket_list_yes_search_inp').val();
        }
        getOutPutTicketListYesFn();
    });
    //刷新
    $('#fnc_output_ticket_refresh_btn').die('click').live('click', function () {
        $('.fnc_output_ticket_list_no_search_inp').val('搜索相关业务单编号/相关业务名称').css('color', '#ccc');
        $('.fnc_output_ticket_list_yes_search_inp').val('搜索相关业务单编号/相关业务名称').css('color', '#ccc');
        getOutputTicketListData.keywords = '';
        getOutPutTicketListNoFn();
        getOutPutTicketListYesFn();

    });
    //定义当前付票id
    var curTicketId = null;
    //定义当前结算账户id
    var curAccountId = null;
    //付票详情
    $('.fnc_output_ticket_list_detail_btn').die('click').live('click', function () {
        curTicketId = $(this).closest('tr').attr('ticketid');
        getTicketDetailFn(curTicketId);
        curAccountId = $(this).closest('tr').attr('curaccountid');
    });
    //付票详情函数
    function getTicketDetailFn(curTicketId) {
        $.ajax({
            url: SERVER_URL + '/output-ticket/info',
            type: 'GET',
            data: {
                token: token,
                id: curTicketId,
                thetype: 1
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var data = oE.datalist;
                    //客户名称
                    $('.tanceng .fnc_output_ticket_detail_cs_name').html(data['cs_name']);
                    //销售单编号
                    $('.tanceng .fnc_output_ticket_detail_code_sn').html(data['code_sn']);
                    //预计付票日期
                    $('.tanceng .fnc_output_ticket_detail_expected_day').html(data['expected_day']);
                    //结算账户
                    $('.tanceng .fnc_output_ticket_detail_name').html(data['name']);
                    //本次应付票款
                    $('.tanceng .fnc_output_ticket_detail_no_pay_money').html(data['no_pay_money']);
                    //总票款
                    $('.tanceng .fnc_output_ticket_detail_total_money').html(data['total_money']);
                    //订单剩余应付票款
                    $('.tanceng .fnc_output_ticket_detail_remain_total_money').html(data['remain_total_money']);
                    //付票阶段
                    var ticketSteps = oE.stepList;
                    if(ticketSteps.length == 0){
                        $('.tanceng .fnc_output_ticket_detail_steps_nodata_box').removeClass('none');
                        $('.tanceng .fnc_output_ticket_detail_steps_tbody').addClass('none');
                    }else{
                        $('.tanceng .fnc_output_ticket_detail_steps_nodata_box').addClass('none');
                        $('.tanceng .fnc_output_ticket_detail_steps_tbody').removeClass('none');
                    }
                    var ticketStepsHtml = '';
                    var ticketYesStepsHtml = '';
                    $.each(ticketSteps, function (i, v) {
                        //付票阶段
                        var ticketStatusClass = '', ticketStatusName = '', ticketStatusBtn = '';
                        if (v['pay_status'] == 1) {
                            ticketStatusClass = 'c_g';
                            ticketStatusName = '正常付票';
                            ticketStatusBtn = '<button class="but_mix1 but_grey1">付票</button>';
                        } else if (v['pay_status'] == 2) {
                            ticketStatusClass = 'c_y';
                            ticketStatusName = '临近';
                            ticketStatusBtn = '<button class="but_mix but_blue val_dialogTop fnc_output_ticket_dialog_create_btn" name="finance_pay_rent_fp">付票</button>';
                        } else if (v['pay_status'] == 3) {
                            ticketStatusClass = 'c_r';
                            ticketStatusName = '逾期';
                            ticketStatusBtn = '<button class="but_mix but_blue val_dialogTop fnc_output_ticket_dialog_create_btn" name="finance_pay_rent_fp">付票</button>';
                        } else if (v['pay_status'] == 4) {
                            ticketStatusClass = 'c_y';
                            ticketStatusName = '待收';
                            ticketStatusBtn = '<button class="but_mix1 but_grey1">付票</button>';
                        }
                        ticketStepsHtml += '<tr>\
                                        <td>阶段' + l_dbl(i + 1) + '</td>\
                                        <td>' + v['segmet_day'] + '</td>\
                                        <td>' + v['no_pay_money'] + '</td>\
                                        <td>' + v['pay_time'] + '</td>\
                                        <td>' + v['pay_ticket_num'] + '</td>\
                                        <td>' + v['pay_ticket_num'] + '</td>\
                                        <td class="' + ticketStatusClass + '">' + ticketStatusName + '<div class="' + (v['pay_status'] == 1 ? '' : 'none') + '" style="position: relative;padding: 0 10px;">\
                                        <img src="static/images/hr_duihao.png" style="position: absolute;top:-18px;right: 29px;">\
                                        </div>\
                                        </td>\
                                        <td>' + ticketStatusBtn + '</td>\
                                        </tr>';
                        ticketYesStepsHtml += '<tr>\
                                        <td>阶段' + l_dbl(i + 1) + '</td>\
                                        <td>' + v['segmet_day'] + '</td>\
                                        <td>' + v['no_pay_money'] + '</td>\
                                        <td>' + v['pay_time'] + '</td>\
                                        <td>' + v['pay_ticket_num'] + '</td>\
                                        <td>' + v['pay_ticket_num'] + '</td>\
                                        <td class="' + ticketStatusClass + '">' + ticketStatusName + '<div class="' + (v['pay_status'] == 1 ? '' : 'none') + '" style="position: relative;padding: 0 10px;">\
                                        <img src="static/images/hr_duihao.png" style="position: absolute;top:-18px;right: 29px;">\
                                        </div>\
                                        </td>\
                                        </tr>';
                    });
                    $('.tanceng .fnc_output_ticket_detail_steps_tbody').html(ticketStepsHtml);
                    $('.tanceng .fnc_output_ticket_yes_detail_steps_tbody').html(ticketYesStepsHtml);
                    //订单付票记录
                    var ticketLog = oE.logList;
                    if(ticketLog.length == 0){
                        $('.tanceng .fnc_output_ticket_detail_log_nodata_box').removeClass('none');
                        $('.tanceng .fnc_output_ticket_detail_log_tbody').addClass('none');
                        $('.tanceng .fnc_output_ticket_detail_log_total_tbody').addClass('none');
                    }else{
                        $('.tanceng .fnc_output_ticket_detail_log_nodata_box').addClass('none');
                        $('.tanceng .fnc_output_ticket_detail_log_tbody').removeClass('none');
                        $('.tanceng .fnc_output_ticket_detail_log_total_tbody').removeClass('none');
                    }
                    var ticketLogHtml = '';
                    //实付票款总数
                    var ticketLogTotal = 0, ticketLogNumTotal = 0;
                    $.each(ticketLog, function (i, v) {
                        ticketLogTotal += parseFloat(v['already_pay_money']);
                        ticketLogNumTotal += parseFloat(v['ticket_num']);
                        ticketLogHtml += '<tr ticketlogid="'+v['id']+'">\
                                        <td>' + l_dbl(i + 1) + '</td>\
                                        <td>'+v['ticket_code_sn']+'</td>\
                                        <td>'+v['day']+'</td>\
                                        <td>'+v['owner_name']+'</td>\
                                        <td>'+v['ticket_name']+'</td>\
                                        <td>'+v['choice_cuenta']+'</td>\
                                        <td>'+v['already_pay_money']+'</td>\
                                        <td>'+v['ticket_num']+'</td>\
                                        <td>'+v['note']+'</td>\
                                        <td>\
                                        <button class="but_mix val_dialogTop fnc_output_ticket_log_detail_btn" name="finance_gysyfqk_ckxq">查看付票单</button>\
                                        </td>\
                                        </tr>';
                    });
                    $('.tanceng .fnc_output_ticket_detail_log_tbody').html(ticketLogHtml);
                    $('.tanceng .fnc_output_ticket_detail_log_already_pay_money_total').html(ticketLogTotal);
                    $('.tanceng .fnc_output_ticket_detail_log_ticket_num_total').html(ticketLogNumTotal);
                }
            }
        });
    }
    //定义当前付票单id
    var curTicketLogId = null;
    //付票单详情
    $('.fnc_output_ticket_log_detail_btn').die('click').live('click', function () {
        curTicketLogId = $(this).closest('tr').attr('ticketlogid');
        getTicketLogDetailFn(curTicketLogId);
    });
    //付票单详情函数
    function getTicketLogDetailFn(curTicketLogId) {
        $.ajax({
            url: SERVER_URL + '/output-ticket/infolog',
            type: 'GET',
            data: {
                token: token,
                id: curTicketLogId
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var data = oE.datalist;
                    //付票单编号
                    $('.tanceng .fnc_output_ticket_detail_log_detail_ticket_code_sn').html(data['ticket_code_sn']);
                    //客户名称
                    $('.tanceng .fnc_output_ticket_detail_log_detail_cs_name').html(data['cs_name']);
                    //销售单编号
                    $('.tanceng .fnc_output_ticket_detail_log_detail_code_sn').html(data['code_sn']);
                    //结算账户
                    $('.tanceng .fnc_output_ticket_detail_log_detail_name').html(data['name']);
                    //结算账目
                    $('.tanceng .fnc_output_ticket_detail_log_detail_choice_cuenta').html(data['choice_cuenta']);
                    //付票人
                    $('.tanceng .fnc_output_ticket_detail_log_detail_owner_name').html(data['owner_name']);
                    //付票日期
                    $('.tanceng .fnc_output_ticket_detail_log_detail_day').html(data['day']);
                    //应付票项
                    $('.tanceng .fnc_output_ticket_detail_log_detail_no_pay_money').html(data['no_pay_money']);
                    //实付票项
                    $('.tanceng .fnc_output_ticket_detail_log_detail_already_pay_money').html(data['already_pay_money']);
                    //付票数量
                    $('.tanceng .fnc_output_ticket_detail_log_detail_ticket_num').html(data['ticket_num']);
                    //备注
                    $('.tanceng .fnc_output_ticket_detail_log_detail_note').html(data['note']);
                    var ticketNameList = '';
                    var ticketNameArr = data['ticket_name'].split(',')
                    $.each(ticketNameArr, function (i, v) {
                        ticketNameList += '<div class="t_textinput">\
                            <div class="t_left"><i class="c_r v_hidden">*</i>票号' + (i + 1) + '</div>\
                            <div class="t_right">\
                            <input type="text" class="time_input inp_noInput" value="' + v + '" readonly="true">\
                            </div>\
                            </div>'
                    });
                    $('.fnc_output_ticket_detail_log_ticket_name_list').html(ticketNameList);
                }
            }
        });
    }
    //新建付票单参数
    var fncOutputTicketCreateData = {
        token: token,
        cs_name: '', //创建名称 客户名称 供应商名称
        code_sn: '', //编号
        ticket_code_sn: '', //付票单编号
        name: '', //结算账户名称
        choice_cuenta: '', //选择账目
        owner: '', //付票人
        no_pay_money: '', //应付票款
        already_pay_money: '', //实付票款
        ticket_name: '', //票号
        note: '', //备注
        copy_list: '', //抄送人
        output_ticket_id: '', //销项发票id
        ticket_num: '' //付票数量
    };
    //票号字符串
    var ticketNameList = '';
    //新建付票单
    $('.fnc_output_ticket_create_btn').die('click').live('click', function () {
        var curTr = $(this).closest('tr');
        fncOutputTicketCreateData = {
            token: token,
            cs_name: '', //创建名称 客户名称 供应商名称
            code_sn: '', //编号
            ticket_code_sn: '', //付票单编号
            name: '', //结算账户名称
            choice_cuenta: '', //选择账目
            owner: '', //付票人
            no_pay_money: '', //应付票款
            already_pay_money: '', //实付票款
            ticket_name: '', //票号
            note: '', //备注
            copy_list: '', //抄送人
            output_ticket_id: '', //销项发票id
            ticket_num: '' //付票数量
        };
        fncOutputTicketCreateData.output_ticket_id = curTr.attr('ticketid');
        //客户名称
        $('.tanceng .fnc_output_ticket_create_cs_name').html(curTr.find('td').eq(2).html());
        //销售单编号
        $('.tanceng .fnc_output_ticket_create_code_sn').html(curTr.find('td').eq(1).html());
        //付票单编号
        $('.tanceng .fnc_output_ticket_create_ticket_code_sn').val(likGetCodeFn('KHFP'));
        //结算账户
        $('.tanceng .fnc_output_ticket_create_name').val(curTr.find('td').eq(10).html());
        curAccountId = curTr.attr('curaccountid');
        //付票人
        $('.tanceng .fnc_output_ticket_create_owner').html(uname);
        //付票日期
        $('.tanceng .fnc_output_ticket_create_day').html(getCurrentDateDay());
        //应付票款
        $('.tanceng .fnc_output_ticket_create_no_pay_money').html(curTr.find('td').eq(5).html());
        ticketNameList = '';
        $('.tanceng .fnc_output_ticket_create_add_copy_list').html('<li userinfoid="' + uid + '"><em class="icon_personBtn icon_personBtn_msg"><i class="icon_personNext"></i></em> <em class="icon_adderBtn"></em> <p class="box_adderName">' + uname + '</p> </li> <li> <em class="icon_personBtn icon_personBtn_add val_dialogTop fnc_output_ticket_create_choose_copy_btn" name="finance_gysyfqk_csr"></em> </li>')
    });
    //弹框中的新建付票单
    $('.tanceng .fnc_output_ticket_dialog_create_btn').die('click').live('click', function () {
        var curTr = $(this).closest('tr');
        fncOutputTicketCreateData = {
            token: token,
            cs_name: '', //创建名称 客户名称 供应商名称
            code_sn: '', //编号
            ticket_code_sn: '', //付票单编号
            name: '', //结算账户名称
            choice_cuenta: '', //选择账目
            owner: '', //付票人
            no_pay_money: '', //应付票款
            already_pay_money: '', //实付票款
            ticket_name: '', //票号
            note: '', //备注
            copy_list: '', //抄送人
            output_ticket_id: '', //销项发票id
            ticket_num: '' //付票数量
        };
        fncOutputTicketCreateData.output_ticket_id = curTicketId;
        //客户名称
        $('.tanceng .fnc_output_ticket_create_cs_name').html($('.tanceng .fnc_output_ticket_detail_cs_name').html());
        //销售单编号
        $('.tanceng .fnc_output_ticket_create_code_sn').html($('.tanceng .fnc_output_ticket_detail_code_sn').html());
        //付票单编号
        $('.tanceng .fnc_output_ticket_create_ticket_code_sn').val(likGetCodeFn('KHFP'));
        //结算账户
        $('.tanceng .fnc_output_ticket_create_name').val($('.tanceng .fnc_output_ticket_detail_name').html());
        //付票人
        $('.tanceng .fnc_output_ticket_create_owner').html(uname);
        //付票日期
        $('.tanceng .fnc_output_ticket_create_day').html(getCurrentDateDay());
        //应付票款
        $('.tanceng .fnc_output_ticket_create_no_pay_money').html(curTr.find('td').eq(2).html());
        ticketNameList = '';
        $('.tanceng .fnc_output_ticket_create_add_copy_list').html('<li userinfoid="' + uid + '"><em class="icon_personBtn icon_personBtn_msg"><i class="icon_personNext"></i></em> <em class="icon_adderBtn"></em> <p class="box_adderName">' + uname + '</p> </li> <li> <em class="icon_personBtn icon_personBtn_add val_dialogTop fnc_output_ticket_create_choose_copy_btn" name="finance_gysyfqk_csr"></em> </li>')
    });
    //选择账目列表
    $('.tanceng .fnc_output_ticket_create_choice_cuenta_btn').die('click').live('click', function () {
        $.ajax({
            url: SERVER_URL + '/accounts/list',
            type: 'GET',
            data: {
                token: token,
                company_account_id: curAccountId
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var datalist = oE.datalist;
                    var accountHtml = '';
                    $.each(datalist, function (i, v) {
                        accountHtml += '<li accountid="' + v['id'] + '">' + v['name'] + '</li>'
                    });
                    $('.tanceng .fnc_output_ticket_create_choice_cuenta_ul').html(accountHtml);
                }
            }
        });
    });
    //选择账目
    $('.tanceng .fnc_output_ticket_create_choice_cuenta_ul li').die('click').live('click', function () {
        fncOutputTicketCreateData.choice_cuenta = $(this).attr('accountid');
    });
    //输入票号
    $('.tanceng .fnc_output_ticket_create_ticket_name_inp').die('click').live('click', function () {
        if (ticketNameList.length > 0) {
            var ticketNameArrList = ticketNameList.split(',');
            var ticketNameHtml = '';
            $.each(ticketNameArrList, function (i, v) {
                ticketNameHtml += '<div class="finance_xxfp_ph">\
                                <div class="t_textinput finance_xxfp_pha">\
                                <div class="t_left"><i class="c_r v_hidden">*</i>票号 <span><cite class="page_86_zjphNum">' + (i + 1) + '</cite></span></div>\
                                <div class="t_right clearfix">\
                                <input type="text" class="time_input finance_xxfp_inpa c_3" value="' + v + '">\
                                <span class="t_right_span finance_xxfp_del" style="background:#ff6c60;">删除</span>\
                                </div>\
                                </div>\
                                </div>'
            });
            $('.tanceng .finance_sz_ysqk_need').before(ticketNameHtml);
            xxfp_num();
        }
    });
    //输入票号保存
    $(".tanceng .fnc_output_ticket_create_ticket_name_save_btn").die('click').live('click', function () {
        ticketNameList = '';
        var onOff = true;
        $.each($('.tanceng .dialog_text_con .finance_xxfp_ph'), function (i, v) {
            if ($('.tanceng .dialog_text_con .finance_xxfp_ph').eq(i).find('input:text').val() != '请输入票号') {
                ticketNameList += $('.tanceng .dialog_text_con .finance_xxfp_ph').eq(i).find('input:text').val() + ',';
            } else {
                return true;
            }
            if($('.tanceng .dialog_text_con .finance_xxfp_ph').eq(i).find('input:text').val().length != 8){
                alert('票号必须是8位数字，票号' + (i + 1) + '输入有误');
                onOff = false;
                return false;
            }
        });
        ticketNameList = ticketNameList.slice(0, ticketNameList.length - 1);
        fncOutputTicketCreateData.ticket_name = ticketNameList;
        if(onOff){
            $(this).closest('.dialog_box').remove();
        }
        if(ticketNameList.length> 6){
            $('.tanceng .fnc_output_ticket_create_ticket_name_inp').val(ticketNameList.slice(0, 6) + '...');
        }else{
            $('.tanceng .fnc_output_ticket_create_ticket_name_inp').val(ticketNameList);
        }
    });
    //添加抄送人
    $('.tanceng .fnc_output_ticket_create_choose_copy_btn').die('click').live('click', function () {
        fncOutputTicketCreateChooseCopy();
    });
    //选择人员保存
    $('.tanceng .fnc_paying_choose_copy_save').die('click').live('click', function () {
        var copyChosen = '';
        $.each($('.tanceng .fnc_output_ticket_create_copy_chosen_list li'), function (i, v) {
            copyChosen += '<li userinfoid="' + $('.tanceng .fnc_output_ticket_create_copy_chosen_list').find('li').eq(i).attr('userinfoid') + '">\
                                <i class="del_img_1">-</i><em class="icon_personBtn icon_personBtn_msg"><i class="icon_personNext"></i></em>\
                                <em class="icon_adderBtn"></em>\
                                <p class="box_adderName">' + $('.tanceng .fnc_output_ticket_create_copy_chosen_list').find('li').eq(i).text() + '</p>\
                                </li>';
        });
        $('.tanceng .fnc_output_ticket_create_add_copy_list').html('<li userinfoid="' + uid + '"><em class="icon_personBtn icon_personBtn_msg"><i class="icon_personNext"></i></em> <em class="icon_adderBtn"></em> <p class="box_adderName">' + uname + '</p> </li> <li> <em class="icon_personBtn icon_personBtn_add val_dialogTop fnc_output_ticket_create_choose_copy_btn" name="finance_gysyfqk_csr"></em> </li>').prepend(copyChosen);
        $('.tanceng .fnc_paying_edit_copy_list').html('<li userinfoid="' + uid + '"><em class="icon_personBtn icon_personBtn_msg"><i class="icon_personNext"></i></em> <em class="icon_adderBtn"></em> <p class="box_adderName">' + uname + '</p> </li> <li> <em class="icon_personBtn icon_personBtn_add val_dialogTop fnc_output_ticket_create_choose_copy_btn" name="finance_gysyfqk_csr"></em> </li>').prepend(copyChosen);
        $(this).closest('.dialog_box').remove();
    });
    //选择抄送人函数
    function fncOutputTicketCreateChooseCopy() {
        $.ajax({
            type: "get",
            url: SERVER_URL + "/dept/deptlist",
            data: {token: token},
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var deep = 0;
                    $('.tanceng .fnc_output_ticket_create_choose_copy_list').html(tree_list_choose_dept_person(oE.rows, deep));
                    // 所有分类图标样式控制
                    if ($('i.fnc_output_ticket_create_choose_copy_list').children().length == 0) {
                        $('li.left_all span.icon_open').addClass('personOth')
                    }
                    // 下级部门样式控制
                    for (var i = 0, liLeft1 = $('.tanceng .fnc_output_ticket_create_choose_copy_list li.left_1').length; i < liLeft1; i++) {
                        if ($('.tanceng .fnc_output_ticket_create_choose_copy_list li.left_1').eq(i).next('ul').length == 0) {
                            $('.tanceng .fnc_output_ticket_create_choose_copy_list li.left_1').eq(i).find('span.icon_open').addClass('personOth');
                            $('.tanceng .fnc_output_ticket_create_choose_copy_list li.left_1').eq(i).find('span.personOth').closest('li').addClass('deptChild')
                        }
                    }
                    //选择人员左侧选择
                    $('.tanceng .fnc_output_ticket_create_choose_copy_list ul .li_person').die('click').live('click', function () {
                        if ($(this).find('em').hasClass('on')) {
                            $('.tanceng .fnc_output_ticket_create_copy_chosen_list').find('li[userinfoid=' + $(this).attr('userinfoid') + ']').remove()
                            $(this).find('span.list_check em').removeClass('on')
                        } else {
                            $('.tanceng .fnc_output_ticket_create_copy_chosen_list').append('<li userinfoid="' + $(this).attr('userinfoid') + '"><span>' + $(this).children('.list_msg').html() + '</span><i class="list_choose_delete"></i></li>');
                            $(this).find('span.list_check em').addClass('on')
                        }
                    });
                    //选择人员右侧删除
                    $('i.list_choose_delete').die('click').live('click', function () {
                        $(this).closest('li').remove();
                        $('.tanceng .fnc_output_ticket_create_choose_copy_list ul .li_person[userinfoid = "' + $(this).closest('li').attr('userinfoid') + '"]').find('em').removeClass('on');
                    });
                }
            },
            error: function (data) {

            }
        });
    }
    //新建付票单提交
    $('.tanceng .fnc_output_ticket_create_submit_btn').die('click').live('click', function () {
        //客户名称
        fncOutputTicketCreateData.cs_name = $('.tanceng .fnc_output_ticket_create_cs_name').html();
        //销售单编号
        fncOutputTicketCreateData.code_sn = $('.tanceng .fnc_output_ticket_create_code_sn').html();
        //付票单编号
        fncOutputTicketCreateData.ticket_code_sn = $('.tanceng .fnc_output_ticket_create_ticket_code_sn').val();
        //结算账户
        fncOutputTicketCreateData.name = $('.tanceng .fnc_output_ticket_create_name').val();
        //付票人
        fncOutputTicketCreateData.owner = uid;
        //应付票款
        fncOutputTicketCreateData.no_pay_money = $('.tanceng .fnc_output_ticket_create_no_pay_money').html();
        //选择账目
        if ($('.tanceng .fnc_output_ticket_create_choice_cuenta_btn').val() == '请选择账目') {
            alert('请选择账目');
            return false;
        }
        //实付票款
        if ($('.tanceng .fnc_output_ticket_create_already_pay_money_inp').val() == '') {
            alert('请输入实付票款');
            return false;
        } else {
            fncOutputTicketCreateData.already_pay_money = $('.tanceng .fnc_output_ticket_create_already_pay_money_inp').val();
        }
        //付票数量
        if ($('.tanceng .fnc_output_ticket_create_ticket_num_inp').val() == '') {
            alert('请输入付票数量');
            return false;
        } else {
            fncOutputTicketCreateData.ticket_num = $('.tanceng .fnc_output_ticket_create_ticket_num_inp').val();
        }
        //票号
        if ($('.tanceng .fnc_output_ticket_create_ticket_name_inp').val() == '') {
            alert('请输入票号');
            return false;
        }
        //备注
        if ($('.tanceng .fnc_output_ticket_create_note_inp').val() == '备注') {
            fncOutputTicketCreateData.note = '';
        } else {
            fncOutputTicketCreateData.note = $('.tanceng .fnc_output_ticket_create_note_inp').val();
        }
        //抄送人
        var copyList = '';
        for (var i = 0; i < $('.tanceng .fnc_output_ticket_create_add_copy_list li').length - 1; i++) {
            copyList += $('.tanceng .fnc_output_ticket_create_add_copy_list li').eq(i).attr('userinfoid') + ',';
        }
        copyList = copyList.slice(0, copyList.length - 1);
        fncOutputTicketCreateData.copy_list = copyList;
        $.ajax({
            url: SERVER_URL + '/output-ticket/add',
            type: 'POST',
            data: fncOutputTicketCreateData,
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    $('.tanceng div').remove();
                    $('.tanceng').css('display', 'none');
                }
            }
        });
    });

    //选择公司账户
    $('.fnc_xxfp_account_list_btn').die('click').live('click', function () {
        $.ajax({
            url: SERVER_URL + '/company/list',
            type: 'GET',
            data: {
                token: token
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var datalist = oE.data.dataList;
                    var AccountcompanyNameHTML = '';
                    $.each(datalist, function (i, v) {
                        AccountcompanyNameHTML += '<li companyid="' + v['id'] + '">' + v['name'] + '</li>'
                    });
                    $(".fnc_xxfp_account_list").html(AccountcompanyNameHTML);
                }
            }
        });
    });
    $(".fnc_xxfp_account_list li").die('click').live('click', function () {
        getOutputTicketListData.company_id = $(this).attr('companyid');
        getOutPutTicketListNoFn();
    });

    //付票设置
    $('.page_86_fpsz_btn').live('click', function () {
        //提醒
        $.ajax({
            url: SERVER_URL + '/receipt/getwarning',
            type: 'GET',
            data: {
                token: token,
                thetype: 3
            },
            dataType: 'json',
            success: function (oE) {
                if(oE.code == 0){
                    $('.tanceng .fnc_xxfp_fpsz_fptx_time_inp').val(oE['datalist']['day']).css('color', '#333');
                }
            },
            error: function(e){
                alert(e.msg);
            }
        });
        //付票限制
        $.ajax({
            url: SERVER_URL + '/receipt/getpayticket',
            type: 'GET',
            data: {
                token: token,
                thetype: 1
            },
            dataType: 'json',
            success: function (oE) {
                if(oE.code == 0){
                    //开始时间
                    $('.tanceng .fnc_xxfp_fpsz_fpxz_start').val(oE['datalist']['start_time'].split(' ')[0]).css('color', '#333');
                    //结束时间
                    $('.tanceng .fnc_xxfp_fpsz_fpxz_end').val(oE['datalist']['end_time'].split(' ')[0]).css('color', '#333');
                }
            },
            error: function(e){
                alert(e.msg);
            }
        });
    });
    //付票设置提醒
    var fncXxfpSettingData = {
        token: token,
        is_open: '', // 是否开启 1关闭 2开启
        start_time: '', // 开始时间
        thetype: 1, // 类型
        end_time: '' // 结束时间
    };
    var fncFptxData = {
        token: token,
        is_open: '', // 是否开启 1关闭 2开启
        day: '', // 天数
        thetype: 3
    };
    $('.tanceng .fnc_xxfp_fpsz_submit_btn').die('click').live('click', function () {
        if($('.tanceng .fnc_xxfp_fpsz_fpxz_checkbox').is(':checked')){
            if($('.tanceng .fnc_xxfp_fpsz_fpxz_start').val() == '请选择日期' || $('.tanceng .fnc_xxfp_fpsz_fpxz_start').val() == ''){
                alert('请选择开始时间');
                return false;
            }
            if($('.tanceng .fnc_xxfp_fpsz_fpxz_end').val() == '请选择日期' || $('.tanceng .fnc_xxfp_fpsz_fpxz_end').val() == ''){
                alert('请选择结束时间');
                return false;
            }
            fncXxfpSettingData.start_time = $('.tanceng .fnc_xxfp_fpsz_fpxz_start').val();
            fncXxfpSettingData.end_time = $('.tanceng .fnc_xxfp_fpsz_fpxz_end').val();
        }else{
            fncXxfpSettingData.start_time = '';
            fncXxfpSettingData.end_time = '';
        }
        if($('.tanceng .fnc_xxfp_fpsz_fptx_checkbox').is(':checked')){
            fncXxfpSettingData.is_open = 2;
            fncFptxData.is_open = 2;
            if($('.tanceng .fnc_xxfp_fpsz_fptx_time_inp').val() == ''){
                alert('请输入提醒时间');
                return false;
            }
        }else{
            fncXxfpSettingData.is_open = 1;
            fncFptxData.is_open = 1;
        }
        if($('.tanceng .fnc_xxfp_fpsz_fptx_time_inp').val() == ''){
            alert('请输入天数');
            return false;
        }else{
            fncFptxData.day = $('.tanceng .fnc_xxfp_fpsz_fptx_time_inp').val();
        }
        $.ajax({
            url: SERVER_URL + '/receipt/setpayticket',
            type: 'POST',
            data: fncXxfpSettingData,
            dataType: 'json',
            success: function (oE) {
                if(oE.code == 0){
                    $.ajax({
                        url: SERVER_URL + '/receipt/setwarning',
                        type: 'POST',
                        data: fncFptxData,
                        dataType: 'json',
                        success: function (oE) {
                            if(oE.code == 0){
                                $('.tanceng').hide().children('.dialog_box').remove();
                            }
                        },
                        error: function(e){
                        }
                    });
                }
            },
            error: function(e){
            }
        });
    });
});
