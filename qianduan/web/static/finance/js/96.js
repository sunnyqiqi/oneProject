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
            success: function (e) {
                // 将返回值转换为json对象
                var oE = eval("(" + e + ")");
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
    // 未收票定义选择查看项
    var fncIncomeTicketNoListLookAbledField = [
        {'index': null, 'field': '结算账户'}
    ];
    likShow('#fnc_income_ticket_no_table', fncIncomeTicketNoListLookAbledField, '#fnc_income_ticket_no_look_field_ul', '#fnc_income_ticket_no_look_save', '#fnc_income_ticket_no_look_reset');
    // 已收票定义选择查看项
    var fncIncomeTicketYesListLookAbledField = [
        {'index': null, 'field': '结算账户'},
        {'index': null, 'field': '结算账目'}
    ];
    likShow('#fnc_income_ticket_yes_table', fncIncomeTicketYesListLookAbledField, '#fnc_income_ticket_yes_look_field_ul', '#fnc_income_ticket_yes_look_save', '#fnc_income_ticket_yes_look_reset');

    //进项收票参数
    var getIncomeTicketListData = {
        token: token,
        page: 1,
        num: 10,
        keywords: '',
        thetype: 1 // 1未收票2已收票
    };
    getIncomeTicketListNoFn();
    //切换未收票
    $('#fnc_income_ticket_nav_ul li:nth-of-type(1)').die('click').live('click', function () {
        getIncomeTicketListData.thetype = 1;
        getIncomeTicketListData.page = 1;
        getIncomeTicketListData.num = 10;
        $('.fnc_income_ticket_list_yes_search_num_inp').val('10');
        $('.fnc_income_ticket_list_no_search_inp').val('搜索采购订单编号/供应商名称').css('color', '#ccc');
        getIncomeTicketListData.keywords = '';
        getIncomeTicketListNoFn();
    });
    //切换已收票
    $('#fnc_income_ticket_nav_ul li:nth-of-type(2)').die('click').live('click', function () {
        getIncomeTicketListData.thetype = 2;
        getIncomeTicketListData.page = 1;
        getIncomeTicketListData.num = 10;
        $('.fnc_income_ticket_list_yes_search_num_inp').val('10');
        $('.fnc_income_ticket_list_yes_search_inp').val('搜索采购订单编号/供应商名称').css('color', '#ccc');
        getIncomeTicketListData.keywords = '';
        getIncomeTicketListYesFn();
    });
    //未收票列表函数
    function getIncomeTicketListNoFn() {
        $.ajax({
            url: SERVER_URL + '/income-ticket/list',
            type: 'GET',
            data: getIncomeTicketListData,
            success: function (e) {
                // 将返回值转换为json对象
                var oE = eval("(" + e + ")");
                console.log(oE);
                if (oE.code == 0) {
                    //搜索总条数
                    $('.fnc_income_ticket_list_num_total').html(oE.totalcount);
                    //应收票款
                    $('.fnc_income_ticket_no_ticket_total').html(oE.no_ticket_total);
                    //总应收票款
                    $('.fnc_income_ticket_total_ticket').html(oE.total_ticket);
                    //实收票款
                    $('.fnc_income_ticket_already_ticket').html(oE.already_ticket);
                    var datalist = oE.datalist;
                    if (datalist.length == 0) {
                        $('.fnc_income_ticket_list_no_nodata_box').removeClass('none');
                        $('.fnc_income_ticket_list_no_handle').addClass('none');
                        $('.fnc_income_ticket_list_no_table_total').addClass('none');
                    } else {
                        $('.fnc_income_ticket_list_no_nodata_box').addClass('none');
                        $('.fnc_income_ticket_list_no_handle').removeClass('none');
                        $('.fnc_income_ticket_list_no_table_total').removeClass('none');
                    }
                    var incomeListHtml = '';
                    console.log(datalist);
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
                        incomeListHtml += '<tr ticketid="' + v['id'] + '" curaccountid="'+v['company_account_id']+'">\
                                            <td>' + l_dbl(i + 1) + '</td>\
                                            <td class="finance_pay_rent_list f_color">' + v['code_sn'] + '</td>\
                                            <td>' + v['cs_name'] + '</td>\
                                            <td>' + v['owner_name'] + '</td>\
                                            <td>' + v['day'] + '</td>\
                                            <td>' + v['already_pay_money'] + '</td>\
                                            <td>' + v['no_ticket_pay_money'] + '</td>\
                                            <td>' + v['already_ticket_pay_money'] + '</td>\
                                            <td>' + v['name'] + '</td>\
                                            <td>\
                                            <button class="but_mix val_dialog fnc_income_ticket_list_detail_btn" name="finance_pay_refund_yfqk">收票详情</button><button class="but_mix val_dialog fnc_income_ticket_create_btn" name="finance_khysqk_xjsp">收票</button>\
                                            </td>\
                                           </tr>'
                    });
                    $('.fnc_income_ticket_no_tbody').html(incomeListHtml);
                    //分页
                    list_table_render_pagination('.fnc_income_ticket_list_no_page', getIncomeTicketListData, getIncomeTicketListNoFn, oE.totalcount, datalist.length);
                    $('#fnc_income_ticket_no_look_save').trigger('click');
                }
            }
        });
    }

    //已收票列表函数
    function getIncomeTicketListYesFn() {
        $.ajax({
            url: SERVER_URL + '/income-ticket/list',
            type: 'GET',
            data: getIncomeTicketListData,
            success: function (e) {
                // 将返回值转换为json对象
                var oE = eval("(" + e + ")");
                console.log(oE);
                if (oE.code == 0) {
                    //搜索总条数
                    $('.fnc_income_ticket_list_num_total').html(oE.totalcount);
                    var datalist = oE.datalist;
                    if (datalist.length == 0) {
                        $('.fnc_income_ticket_list_yes_nodata_box').removeClass('none');
                        $('.fnc_income_ticket_list_yes_handle').addClass('none');
                        $('.fnc_income_ticket_list_yes_table_total').addClass('none');
                    } else {
                        $('.fnc_income_ticket_list_yes_nodata_box').addClass('none');
                        $('.fnc_income_ticket_list_yes_handle').removeClass('none');
                        $('.fnc_income_ticket_list_yes_table_total').removeClass('none');
                    }
                    var incomeListHtml = '';
                    console.log(datalist);
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
                        incomeListHtml += '<tr ticketid="' + v['id'] + '">\
                                            <td>' + l_dbl(i + 1) + '</td>\
                                            <td class="finance_pay_rent_list f_color">' + v['code_sn'] + '</td>\
                                            <td>' + v['cs_name'] + '</td>\
                                            <td>' + v['owner_name'] + '</td>\
                                            <td>' + v['day'] + '</td>\
                                            <td>' + v['owner_name'] + '</td>\
                                            <td>' + v['no_ticket_pay_money'] + '</td>\
                                            <td>' + v['already_ticket_pay_money'] + '</td>\
                                            <td>' + v['name'] + '</td>\
                                            <td>' + v[''] + '</td>\
                                            <td>\
                                            <button class="but_mix val_dialog fnc_income_ticket_list_detail_btn" name="finance_gysyfqk_yfqk_ysp">收票详情</button>\
                                            </td>\
                                           </tr>';
                    });
                    $('.fnc_income_ticket_yes_tbody').html(incomeListHtml);
                    //分页
                    list_table_render_pagination('.fnc_income_ticket_list_yes_page', getIncomeTicketListData, getIncomeTicketListYesFn, oE.totalcount, datalist.length);
                    $('#fnc_income_ticket_yes_look_save').trigger('click');
                }
            }
        });
    }

    //未收票搜索关键字
    $('.fnc_income_ticket_list_no_search_btn').die('click').live('click', function () {
        if ($('.fnc_income_ticket_list_no_search_inp').val() == '搜索采购订单编号/供应商名称') {
            getIncomeTicketListData.keywords = '';
        } else {
            getIncomeTicketListData.keywords = $('.fnc_income_ticket_list_no_search_inp').val();
        }
        getIncomeTicketListNoFn();
    });
    //已收票搜索关键字
    $('.fnc_income_ticket_list_yes_search_btn').die('click').live('click', function () {
        if ($('.fnc_income_ticket_list_yes_search_inp').val() == '搜索采购订单编号/供应商名称') {
            getIncomeTicketListData.keywords = '';
        } else {
            getIncomeTicketListData.keywords = $('.fnc_income_ticket_list_yes_search_inp').val();
        }
        getIncomeTicketListYesFn();
    });
    //刷新
    $('#fnc_income_ticket_refresh_btn').die('click').live('click', function () {
        $('.fnc_income_ticket_list_no_search_inp').val('搜索采购订单编号/供应商名称').css('color', '#ccc');
        $('.fnc_income_ticket_list_yes_search_inp').val('搜索采购订单编号/供应商名称').css('color', '#ccc');
        getIncomeTicketListData.keywords = '';
        getIncomeTicketListNoFn();
        getIncomeTicketListYesFn();

    });
    //定义当前收票id
    var curIncomeTicketId = null;
    //定义当前结算账户id
    var curIncomeAccountId = null;
    //收票详情
    $('.fnc_income_ticket_list_detail_btn').die('click').live('click', function () {
        curIncomeTicketId = $(this).closest('tr').attr('ticketid');
        getTicketDetailFn(curIncomeTicketId);
        curIncomeAccountId = $(this).closest('tr').attr('curaccountid');
    });
    //收票详情函数
    function getTicketDetailFn(curIncomeTicketId) {
        $.ajax({
            url: SERVER_URL + '/income-ticket/info',
            type: 'GET',
            data: {
                token: token,
                id: curIncomeTicketId
            },
            success: function (e) {
                // 将返回值转换为json对象
                var oE = eval("(" + e + ")");
                console.log(oE);
                if (oE.code == 0) {
                    var data = oE.datalist;
                    //供应商名称
                    $('.tanceng .fnc_income_ticket_detail_cs_name').html(data['cs_name']);
                    //采购单编号
                    $('.tanceng .fnc_income_ticket_detail_code_sn').html(data['code_sn']);
                    //结算账户
                    $('.tanceng .fnc_income_ticket_detail_name').html(data['name']);
                    //本次应收票款
                    $('.tanceng .fnc_income_ticket_detail_no_pay_money').html(data['no_ticket_pay_money']);
                    //总票款
                    $('.tanceng .fnc_income_ticket_detail_total_money').html(data['total_money']);
                    //订单收票记录
                    var ticketLog = oE.logList;
                    if(ticketLog.length == 0){
                        $('.tanceng .fnc_income_ticket_detail_log_nodata_box').removeClass('none');
                        $('.tanceng .fnc_income_ticket_detail_log_tbody').addClass('none');
                        $('.tanceng .fnc_income_ticket_detail_log_total_tbody').addClass('none');
                    }else{
                        $('.tanceng .fnc_income_ticket_detail_log_nodata_box').addClass('none');
                        $('.tanceng .fnc_income_ticket_detail_log_tbody').removeClass('none');
                        $('.tanceng .fnc_income_ticket_detail_log_total_tbody').removeClass('none');
                    }
                    var ticketLogHtml = '';
                    //实收票款总数
                    var ticketLogTotal = 0;
                    $.each(ticketLog, function (i, v) {
                        ticketLogTotal += parseFloat(v['already_pay_money']);
                        ticketLogHtml += '<tr ticketlogid="'+v['id']+'">\
                                        <td>' + l_dbl(i + 1) + '</td>\
                                        <td>'+v['ticket_code_sn']+'</td>\
                                        <td>'+v['day']+'</td>\
                                        <td>'+v['owner_name']+'</td>\
                                        <td>'+v['ticket_name']+'</td>\
                                        <td>'+v['choice_cuenta']+'</td>\
                                        <td>'+v['already_pay_money']+'</td>\
                                        <td>'+v['note']+'</td>\
                                        <td>\
                                        <button class="but_mix val_dialogTop fnc_income_ticket_log_detail_btn" name="finance_pay_refund_gysyfqk_ckxq">查看收票单</button>\
                                        </td>\
                                        </tr>';
                    });
                    $('.tanceng .fnc_income_ticket_detail_log_tbody').html(ticketLogHtml);
                    $('.tanceng .fnc_income_ticket_detail_log_already_pay_money_total').html(ticketLogTotal);
                }
            }
        });
    }
    //定义当前收票单id
    var curTicketLogId = null;
    //收票单详情
    $('.fnc_income_ticket_log_detail_btn').die('click').live('click', function () {
        curTicketLogId = $(this).closest('tr').attr('ticketlogid');
        getTicketLogDetailFn(curTicketLogId);
    });
    //收票单详情函数
    function getTicketLogDetailFn(curTicketLogId) {
        $.ajax({
            url: SERVER_URL + '/income-ticket/infolog',
            type: 'GET',
            data: {
                token: token,
                id: curTicketLogId
            },
            success: function (e) {
                // 将返回值转换为json对象
                var oE = eval("(" + e + ")");
                console.log(oE);
                if (oE.code == 0) {
                    var data = oE.datalist;
                    //收票单编号
                    $('.tanceng .fnc_income_ticket_detail_log_detail_ticket_code_sn').html(data['ticket_code_sn']);
                    //供应商名称
                    $('.tanceng .fnc_income_ticket_detail_log_detail_cs_name').html(data['cs_name']);
                    //采购单编号
                    $('.tanceng .fnc_income_ticket_detail_log_detail_code_sn').html(data['code_sn']);
                    //结算账户
                    $('.tanceng .fnc_income_ticket_detail_log_detail_name').html(data['name']);
                    //结算账目
                    $('.tanceng .fnc_income_ticket_detail_log_detail_choice_cuenta').html(data['choice_cuenta']);
                    //收票人
                    $('.tanceng .fnc_income_ticket_detail_log_detail_owner_name').html(data['owner_name']);
                    //收票日期
                    $('.tanceng .fnc_income_ticket_detail_log_detail_day').html(data['day']);
                    //应收票项
                    $('.tanceng .fnc_income_ticket_detail_log_detail_no_pay_money').html(data['no_pay_money']);
                    //实收票项
                    $('.tanceng .fnc_income_ticket_detail_log_detail_already_pay_money').html(data['already_pay_money']);
                    //备注
                    $('.tanceng .fnc_income_ticket_detail_log_detail_note').html(data['note']);
                    $('.tanceng .fnc_income_ticket_detail_log_ticket_name').html(data['ticket_name']);
                }
            }
        });
    }
    //新建收票单参数
    var fncIncomeTicketCreateData = {
        token: token,
        cs_name: '', //创建名称 供应商名称
        code_sn: '', //编号
        ticket_code_sn: '', //收票单编号
        name: '', //结算账户名称
        choice_cuenta: '', //选择账目
        owner: '', //收票人
        no_pay_money: '', //应收票款
        already_pay_money: '', //实收票款
        ticket_name: '', //票号
        note: '', //备注
        copy_list: '', //抄送人
        income_ticket_id: '' //销项发票id
    };
    //票号字符串
    var ticketNameList = '';
    //新建收票单
    $('.fnc_income_ticket_create_btn').die('click').live('click', function () {
        var curTr = $(this).closest('tr');
        fncIncomeTicketCreateData = {
            token: token,
            cs_name: '', //创建名称 供应商名称
            code_sn: '', //编号
            ticket_code_sn: '', //收票单编号
            name: '', //结算账户名称
            choice_cuenta: '', //选择账目
            owner: '', //收票人
            no_pay_money: '', //应收票款
            already_pay_money: '', //实收票款
            ticket_name: '', //票号
            note: '', //备注
            copy_list: '', //抄送人
            income_ticket_id: '' //销项发票id
        };
        fncIncomeTicketCreateData.income_ticket_id = curTr.attr('ticketid');
        //供应商名称
        $('.tanceng .fnc_income_ticket_create_cs_name').html(curTr.find('td').eq(2).html());
        //采购单编号
        $('.tanceng .fnc_income_ticket_create_code_sn').html(curTr.find('td').eq(1).html());
        //收票单编号
        $('.tanceng .fnc_income_ticket_create_ticket_code_sn').val(likGetCodeFn('KHFP'));
        //结算账户
        $('.tanceng .fnc_income_ticket_create_name').val(curTr.find('td').eq(8).html());
        curIncomeAccountId = curTr.attr('curaccountid');
        //收票人
        $('.tanceng .fnc_income_ticket_create_owner').html(uname);
        //收票日期
        $('.tanceng .fnc_income_ticket_create_day').html(getCurrentDateDay());
        //应收票款
        $('.tanceng .fnc_income_ticket_create_no_pay_money').html(curTr.find('td').eq(5).html());
        ticketNameList = '';
        $('.tanceng .fnc_income_ticket_create_add_copy_list').html('<li userinfoid="' + uid + '"><em class="icon_personBtn icon_personBtn_msg"><i class="icon_personNext"></i></em> <em class="icon_adderBtn"></em> <p class="box_adderName">' + uname + '</p> </li> <li> <em class="icon_personBtn icon_personBtn_add val_dialogTop fnc_income_ticket_create_choose_copy_btn" name="finance_gysyfqk_csr"></em> </li>')
    });
    //弹框中的新建收票单
    $('.tanceng .fnc_income_ticket_dialog_create_btn').die('click').live('click', function () {
        fncIncomeTicketCreateData = {
            token: token,
            cs_name: '', //创建名称 供应商名称
            code_sn: '', //编号
            ticket_code_sn: '', //收票单编号
            name: '', //结算账户名称
            choice_cuenta: '', //选择账目
            owner: '', //收票人
            no_pay_money: '', //应收票款
            already_pay_money: '', //实收票款
            ticket_name: '', //票号
            note: '', //备注
            copy_list: '', //抄送人
            income_ticket_id: '' //销项发票id
        };
        fncIncomeTicketCreateData.income_ticket_id = curIncomeTicketId;
        //供应商名称
        $('.tanceng .fnc_income_ticket_create_cs_name').html($('.tanceng .fnc_income_ticket_detail_cs_name').html());
        //采购单编号
        $('.tanceng .fnc_income_ticket_create_code_sn').html($('.tanceng .fnc_income_ticket_detail_code_sn').html());
        //收票单编号
        $('.tanceng .fnc_income_ticket_create_ticket_code_sn').val(likGetCodeFn('GYSSK'));
        //结算账户
        $('.tanceng .fnc_income_ticket_create_name').val($('.tanceng .fnc_income_ticket_detail_name').html());
        //收票人
        $('.tanceng .fnc_income_ticket_create_owner').html(uname);
        //收票日期
        $('.tanceng .fnc_income_ticket_create_day').html(getCurrentDateDay());
        //应收票款
        $('.tanceng .fnc_income_ticket_create_no_pay_money').html($('.tanceng .fnc_income_ticket_detail_no_pay_money').html());
        ticketNameList = '';
        $('.tanceng .fnc_income_ticket_create_add_copy_list').html('<li userinfoid="' + uid + '"><em class="icon_personBtn icon_personBtn_msg"><i class="icon_personNext"></i></em> <em class="icon_adderBtn"></em> <p class="box_adderName">' + uname + '</p> </li> <li> <em class="icon_personBtn icon_personBtn_add val_dialogTop fnc_income_ticket_create_choose_copy_btn" name="finance_gysyfqk_csr"></em> </li>')
    });
    //选择账目列表
    $('.tanceng .fnc_income_ticket_create_choice_cuenta_btn').die('click').live('click', function () {
        console.log(curIncomeAccountId);
        $.ajax({
            url: SERVER_URL + '/accounts/list',
            type: 'GET',
            data: {
                token: token,
                company_account_id: curIncomeAccountId
            },
            success: function (e) {
                // 将返回值转换为json对象
                var oE = eval("(" + e + ")");
                console.log(oE);
                if (oE.code == 0) {
                    var datalist = oE.datalist;
                    var accountHtml = '';
                    $.each(datalist, function (i, v) {
                        accountHtml += '<li accountid="' + v['id'] + '">' + v['name'] + '</li>'
                    });
                    $('.tanceng .fnc_income_ticket_create_choice_cuenta_ul').html(accountHtml);
                }
            }
        });
    });
    //选择账目
    $('.tanceng .fnc_income_ticket_create_choice_cuenta_ul li').die('click').live('click', function () {
        fncIncomeTicketCreateData.choice_cuenta = $(this).attr('accountid');
    });
    //添加抄送人
    $('.tanceng .fnc_income_ticket_create_choose_copy_btn').die('click').live('click', function () {
        fncIncomeTicketCreateChooseCopy();
    });
    //选择人员保存
    $('.tanceng .fnc_paying_choose_copy_save').die('click').live('click', function () {
        var copyChosen = '';
        $.each($('.tanceng .fnc_income_ticket_create_copy_chosen_list li'), function (i, v) {
            copyChosen += '<li userinfoid="' + $('.tanceng .fnc_income_ticket_create_copy_chosen_list').find('li').eq(i).attr('userinfoid') + '">\
                                <i class="del_img_1">-</i><em class="icon_personBtn icon_personBtn_msg"><i class="icon_personNext"></i></em>\
                                <em class="icon_adderBtn"></em>\
                                <p class="box_adderName">' + $('.tanceng .fnc_income_ticket_create_copy_chosen_list').find('li').eq(i).text() + '</p>\
                                </li>';
        });
        $('.tanceng .fnc_income_ticket_create_add_copy_list').html('<li userinfoid="' + uid + '"><em class="icon_personBtn icon_personBtn_msg"><i class="icon_personNext"></i></em> <em class="icon_adderBtn"></em> <p class="box_adderName">' + uname + '</p> </li> <li> <em class="icon_personBtn icon_personBtn_add val_dialogTop fnc_income_ticket_create_choose_copy_btn" name="finance_gysyfqk_csr"></em> </li>').prepend(copyChosen);
        $('.tanceng .fnc_paying_edit_copy_list').html('<li userinfoid="' + uid + '"><em class="icon_personBtn icon_personBtn_msg"><i class="icon_personNext"></i></em> <em class="icon_adderBtn"></em> <p class="box_adderName">' + uname + '</p> </li> <li> <em class="icon_personBtn icon_personBtn_add val_dialogTop fnc_income_ticket_create_choose_copy_btn" name="finance_gysyfqk_csr"></em> </li>').prepend(copyChosen);
        $(this).closest('.dialog_box').remove();
    });
    //选择抄送人函数
    function fncIncomeTicketCreateChooseCopy() {
        $.ajax({
            type: "get",
            url: SERVER_URL + "/dept/deptlist",
            data: {token: token},
            success: function (e) {
                var oE = eval('(' + e + ')');
                if (oE.code == 0) {
                    var deep = 0;
                    $('.tanceng .fnc_income_ticket_create_choose_copy_list').html(tree_list_choose_dept_person(oE.rows, deep));
                    // 所有分类图标样式控制
                    if ($('i.fnc_income_ticket_create_choose_copy_list').children().length == 0) {
                        $('li.left_all span.icon_open').addClass('personOth')
                    }
                    // 下级部门样式控制
                    for (var i = 0, liLeft1 = $('.tanceng .fnc_income_ticket_create_choose_copy_list li.left_1').length; i < liLeft1; i++) {
                        if ($('.tanceng .fnc_income_ticket_create_choose_copy_list li.left_1').eq(i).next('ul').length == 0) {
                            $('.tanceng .fnc_income_ticket_create_choose_copy_list li.left_1').eq(i).find('span.icon_open').addClass('personOth');
                            $('.tanceng .fnc_income_ticket_create_choose_copy_list li.left_1').eq(i).find('span.personOth').closest('li').addClass('deptChild')
                        }
                    }
                    //选择人员左侧选择
                    $('.tanceng .fnc_income_ticket_create_choose_copy_list ul .li_person').die('click').live('click', function () {
                        if ($(this).find('em').hasClass('on')) {
                            $('.tanceng .fnc_income_ticket_create_copy_chosen_list').find('li[userinfoid=' + $(this).attr('userinfoid') + ']').remove()
                            $(this).find('span.list_check em').removeClass('on')
                        } else {
                            $('.tanceng .fnc_income_ticket_create_copy_chosen_list').append('<li userinfoid="' + $(this).attr('userinfoid') + '"><span>' + $(this).children('.list_msg').html() + '</span><i class="list_choose_delete"></i></li>');
                            $(this).find('span.list_check em').addClass('on')
                        }
                    });
                    //选择人员右侧删除
                    $('i.list_choose_delete').die('click').live('click', function () {
                        $(this).closest('li').remove();
                        $('.tanceng .fnc_income_ticket_create_choose_copy_list ul .li_person[userinfoid = "' + $(this).closest('li').attr('userinfoid') + '"]').find('em').removeClass('on');
                    });
                }
            },
            error: function (data) {

            }
        });
    }
    //新建收票单提交
    $('.tanceng .fnc_income_ticket_create_submit_btn').die('click').live('click', function(){
        //供应商名称
        fncIncomeTicketCreateData.cs_name = $('.tanceng .fnc_income_ticket_create_cs_name').html();
        //采购单编号
        fncIncomeTicketCreateData.code_sn = $('.tanceng .fnc_income_ticket_create_code_sn').html();
        //收票单编号
        fncIncomeTicketCreateData.ticket_code_sn = $('.tanceng .fnc_income_ticket_create_ticket_code_sn').val();
        //结算账户
        fncIncomeTicketCreateData.name = $('.tanceng .fnc_income_ticket_create_name').val();
        //收票人
        fncIncomeTicketCreateData.owner = uid;
        //应收票款
        fncIncomeTicketCreateData.no_pay_money = $('.tanceng .fnc_income_ticket_create_no_pay_money').html();
        //选择账目
        if($('.tanceng .fnc_income_ticket_create_choice_cuenta_btn').val() == '请选择账目'){
            alert('请选择账目');
            return false;
        }
        //实收票款
        if($('.tanceng .fnc_income_ticket_create_already_pay_money_inp').val() == ''){
            alert('请输入实收票款');
            return false;
        }else{
            fncIncomeTicketCreateData.already_pay_money = $('.tanceng .fnc_income_ticket_create_already_pay_money_inp').val();
        }
        //票号
        if($('.tanceng .fnc_income_ticket_create_ticket_name_inp').val() == ''){
            alert('请输入票号');
            return false;
        }else if($('.tanceng .fnc_income_ticket_create_ticket_name_inp').val().length != 8){
            alert('票号必须为8位数字，请重新输入票号');
            return false;
        }else{
            fncIncomeTicketCreateData.ticket_name = $('.tanceng .fnc_income_ticket_create_ticket_name_inp').val();
        }
        //备注
        if($('.tanceng .fnc_income_ticket_create_note_inp').val() == '备注'){
            fncIncomeTicketCreateData.note = '';
        }else{
            fncIncomeTicketCreateData.note = $('.tanceng .fnc_income_ticket_create_note_inp').val();
        }
        //抄送人
        var copyList = '';
        for (var i = 0; i < $('.tanceng .fnc_income_ticket_create_add_copy_list li').length - 1; i++) {
            copyList += $('.tanceng .fnc_income_ticket_create_add_copy_list li').eq(i).attr('userinfoid') + ',';
        }
        copyList = copyList.slice(0, copyList.length - 1);
        fncIncomeTicketCreateData.copy_list = copyList;
        console.log(fncIncomeTicketCreateData);
        $.ajax({
            url: SERVER_URL + '/income-ticket/add',
            type: 'POST',
            data: fncIncomeTicketCreateData,
            success: function (e) {
                // 将返回值转换为json对象
                var oE = eval("(" + e + ")");
                console.log(oE);
                if(oE.code == 0){
                    $('.tanceng div').remove();
                    $('.tanceng').css('display', 'none');
                }
            }
        });
    })

});
