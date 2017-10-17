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

    var token, page, num, keywords, thetype;
    token = Admin.get_token();
    //token = '2017052516045457073-1-1';
    uid = Admin.get_uid();
    uname = loginUserInfo['username'];

    //权限部分
    if (loginUserInfo['company_admin'] != 1) {
        var fncReceiptPowerList = loginUserInfo['powerUrls'];
        //查看已收款
        var fncReceiptYes = 'receipt/list';
        //新建收款单
        var fncReceiptAdd = 'receipt/add';
        //收款提醒设置
        var fncReceiptSet = 'receipt/set';

        //查看已收款
        if ($.inArray(fncReceiptYes, fncReceiptPowerList) == -1) {
            $('#fnc_receipt_nav_ul').html('<li name="finance_gather_account_gather" class="taba tabhover">应收款</li>');
        } else {
            $('#fnc_receipt_nav_ul').html('<li name="finance_gather_account_gather" class="taba tabhover">应收款</li><li name="finance_gather_account_gather" class="taba">已收款</li>');
        }

        //新建收款单
        if ($.inArray(fncReceiptAdd, fncReceiptPowerList) == -1) {
            $('.fnc_receipt_detail_create_skd_btn').hide();
        } else {
            $('.fnc_receipt_detail_create_skd_btn').show();
        }

        //收款提醒设置
        if ($.inArray(fncReceiptSet, fncReceiptPowerList) == -1) {
            $('.finance_khysqk_xj_2').css('width', '46px').html('<div class="res" title="点击刷新" id="page_84_refresh"></div>');
        } else {
            $('.finance_khysqk_xj_2').css('width', '134px').html('<button class="but_blue ht_but val_dialog page_84_sktx_btn" name="finance_gather_remind">收款提醒</button><div class="res" title="点击刷新" id="page_84_refresh"></div>');
        }
    }

    // 定义选择查看项
    var fncReceiptListLookAbledField = [
        {'index': null, 'field': '含税状态'},
        {'index': null, 'field': '结算账户'},
        {'index': null, 'field': '收款方式'}
    ];
    likShow('.fnc_receipt_table', fncReceiptListLookAbledField, '#fnc_receipt_look_field_ul', '#fnc_receipt_look_save', '#fnc_receipt_look_reset');
    // 定义选择查看项 - 已收款
    var fncReceiptYesListLookAbledField = [
        {'index': null, 'field': '含税状态'},
        {'index': null, 'field': '结算账户'},
        {'index': null, 'field': '结算账目'},
        {'index': null, 'field': '收款方式'}
    ];
    likShow('.fnc_receipt_yes_table', fncReceiptYesListLookAbledField, '#fnc_receipt_yes_look_field_ul', '#fnc_receipt_yes_look_save', '#fnc_receipt_yes_look_reset');

    //获取收款列表
    var getReceiptListData = {
        token: token,
        page: 1,
        num: 10,
        keywords: '',
        flag: 1,
        ids: ''
    };

    //判断是否来自消息
    if ($('#left_button_84').attr('fromnotice') == 1) {
        var curId = $('#left_button_84').attr('detailid');
        var secondName = $('#left_button_84').attr('secondmenu');
        $.each($('.tabtitle li'), function (i, v) {
            if (secondName == $.trim($('.tabtitle li').eq(i).text())) {
                //$('.tabtitle li').removeClass('tabhover').eq(i).addClass('tabhover');
                getReceiptListData = {
                    token: token,
                    page: 1,
                    num: 10,
                    keywords: '',
                    flag: 1,
                    ids: curId
                };
                setTimeout(function () {
                    $('.tabtitle li').eq(i).trigger('click');
                    $('#left_button_84').attr({
                        'fromnotice': '',
                        'detailid': '',
                        'secondmenu': '',
                        'totable': ''
                    });
                }, 100);
            }
        });
    } else {
        getReceiptListFn();
    }
    function getReceiptListFn() {
        $.ajax({
            url: SERVER_URL + '/receipt/list',
            type: 'GET',
            data: getReceiptListData,
            dataType: 'json',
            success: function (oE) {
                if (getReceiptListData.flag == 1) {
                    //总应收款
                    $('.fnc_receipt_list_sum_no_total_money').html(oE.sum_no_total_money);
                    //总实收款
                    $('.fnc_receipt_list_sum_already_total_money').html(oE.sum_already_total_money);
                    //总应收款
                    $('.fnc_receipt_list_sum_all_no_total_money').html(parseFloat(oE.sum_no_total_money) - parseFloat(oE.sum_already_total_money));

                    //当前页应收款
                    $('.fnc_receipt_list_cur_page_sum_no_total_money').html(oE.page_no_total_money);
                    //当前页实收款
                    $('.fnc_receipt_list_cur_page_page_already_total_money').html(oE.page_already_total_money);
                    if (oE.code == 0) {
                        var datalist = oE.datalist;
                        if (datalist.length == 0) {
                            $(".fnc_receipt_list_nodata_box").removeClass('none');
                            $(".fnc_receipt_list_nodata_box_fenye").addClass('none');
                            $(".fnc_receipt_list_table_total").addClass('none');
                        } else {
                            $(".fnc_receipt_list_nodata_box").addClass('none');
                            $(".fnc_receipt_list_nodata_box_fenye").removeClass('none');
                            $(".fnc_receipt_list_table_total").removeClass('none');
                        }
                        //总条数
                        $('.fnc_receipt_num_total').html(oE.totalcount);
                        var receiptListHtml = '';
                        //收款类型
                        var thetypeName = '';
                        //查看详情按钮name值
                        var thetypeBtnName = '';
                        var thetypeBtnClassName = '';
                        //账期状态
                        var accountStatusClass = '';
                        var accountStatusName = '';
                        //含税状态
                        var taxStatusName = '';
                        //收款方式
                        var receiptWayName = '';
                        $.each(datalist, function (i, v) {
                            //收款类型
                            if (v['thetype'] == 1) {
                                thetypeName = '销售收款';
                                thetypeBtnName = 'finance_khysqk_ysqk';
                                thetypeBtnClassName = 'fnc_receipt_look_btn';
                            } else {
                                thetypeName = '采购退款';
                                thetypeBtnName = 'finance_khysqk_ysqk_cg';
                                thetypeBtnClassName = 'fnc_receipt_cg_look_btn';
                            }
                            //账期状态
                            if (v['account_status'] == 1) {
                                accountStatusClass = 'c_g';
                                accountStatusName = '待收';
                            } else if (v['account_status'] == 2) {
                                accountStatusClass = 'c_y';
                                accountStatusName = '临近';
                            } else if (v['account_status'] == 3) {
                                accountStatusClass = 'c_r';
                                accountStatusName = '逾期';
                            }
                            //含税状态
                            if (v['tax_status'] == 1) {
                                taxStatusName = '未税';
                            } else if (v['tax_status'] == 2) {
                                taxStatusName = '含税';
                            }
                            //收款方式
                            if (v['receipt_way'] == 1) {
                                receiptWayName = '现金';
                            } else if (v['receipt_way'] == 2) {
                                receiptWayName = '电汇';
                            } else if (v['receipt_way'] == 3) {
                                receiptWayName = '支票';
                            }
                            receiptListHtml += '<tr receiptid="' + v['id'] + '">\
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
                                            <td class="fnc_receipt_list_table_unshow ' + (getReceiptListData.flag == 1 ? 'none' : '') + '">' + v['choice_cuenta'] + '</td>\
                                            <td>' + receiptWayName + '</td>\
                                            <td>\
                                            <button class="but_mix val_dialog ' + thetypeBtnClassName + '" name="' + thetypeBtnName + '">收款详情</button>\
                                            </td>\
                                            </tr>'
                        });
                        $('.fnc_receipt_list_tbody').html(receiptListHtml);
                        //分页
                        list_table_render_pagination('.fnc_receipt_list_page', getReceiptListData, getReceiptListFn, oE.totalcount, datalist.length);
                        $('#fnc_receipt_look_save').trigger('click');
                    }
                } else if (getReceiptListData.flag == 2) {
                    //当前页应收款
                    $('.fnc_receipt_list_cur_page_sum_no_total_money').html(oE.page_no_total_money);
                    //当前页实收款
                    $('.fnc_receipt_list_cur_page_page_already_total_money').html(oE.page_already_total_money);
                    if (oE.code == 0) {
                        var datalist = oE.datalist;
                        if (datalist.length == 0) {
                            $(".fnc_receipt_list_nodata_box").removeClass('none');
                            $(".fnc_receipt_list_nodata_box_fenye").addClass('none');
                            $(".fnc_receipt_list_table_total").addClass('none');
                        } else {
                            $(".fnc_receipt_list_nodata_box").addClass('none');
                            $(".fnc_receipt_list_nodata_box_fenye").removeClass('none');
                            $(".fnc_receipt_list_table_total").removeClass('none');
                        }
                        //总条数
                        $('.fnc_receipt_num_total').html(oE.totalcount);
                        var receiptListHtml = '';
                        //收款类型
                        var thetypeName = '';
                        //查看详情按钮name值
                        var thetypeBtnName = '';
                        var thetypeBtnClassName = '';
                        //账期状态
                        var accountStatusClass = '';
                        var accountStatusName = '';
                        //含税状态
                        var taxStatusName = '';
                        //收款方式
                        var receiptWayName = '';
                        $.each(datalist, function (i, v) {
                            //收款类型
                            if (v['thetype'] == 1) {
                                thetypeName = '销售收款';
                                thetypeBtnName = 'finance_khysqk_ysqk';
                                thetypeBtnClassName = 'fnc_receipt_look_btn';
                            } else {
                                thetypeName = '采购退款';
                                thetypeBtnName = 'finance_khysqk_ysqk_cg';
                                thetypeBtnClassName = 'fnc_receipt_cg_look_btn';
                            }
                            //账期状态
                            if (v['account_status'] == 1) {
                                accountStatusClass = 'c_g';
                                accountStatusName = '待收';
                            } else if (v['account_status'] == 2) {
                                accountStatusClass = 'c_y';
                                accountStatusName = '临近';
                            } else if (v['account_status'] == 3) {
                                accountStatusClass = 'c_r';
                                accountStatusName = '逾期';
                            }
                            //含税状态
                            if (v['tax_status'] == 1) {
                                taxStatusName = '未税';
                            } else if (v['tax_status'] == 2) {
                                taxStatusName = '含税';
                            }
                            //收款方式
                            if (v['receipt_way'] == 1) {
                                receiptWayName = '现金';
                            } else if (v['receipt_way'] == 2) {
                                receiptWayName = '电汇';
                            } else if (v['receipt_way'] == 3) {
                                receiptWayName = '支票';
                            }
                            receiptListHtml += '<tr receiptid="' + v['id'] + '">\
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
                                            <td class="fnc_receipt_list_table_unshow ' + (getReceiptListData.flag == 1 ? 'none' : '') + '">' + likNullData(v['choice_cuenta']) + '</td>\
                                            <td>' + receiptWayName + '</td>\
                                            <td>\
                                            <button class="but_mix val_dialog ' + thetypeBtnClassName + '" name="' + thetypeBtnName + '">收款详情</button>\
                                            </td>\
                                            </tr>'
                        });
                        $('.fnc_receipt_yes_list_tbody').html(receiptListHtml);
                        //分页
                        list_table_render_pagination('.fnc_receipt_list_page_2', getReceiptListData, getReceiptListFn, oE.totalcount, datalist.length);
                        $('#fnc_receipt_yes_look_save').trigger('click');
                    }
                }
            }
        });
    }

    $('#fnc_receipt_nav_ul li:nth-of-type(1)').die('click').live('click', function () {
        getReceiptListData.flag = 1;
        getReceiptListData.keywords = '';
        $('.fnc_receipt_list_search_inp').val('搜索相关业务单编号/相关业务名称').css('color', '#ccc');
        getReceiptListFn();
        $('.fnc_receipt_list_table_unshow').addClass('none');
    });

    $('#fnc_receipt_nav_ul li:nth-of-type(2)').die('click').live('click', function () {
        getReceiptListData.flag = 2;
        getReceiptListData.keywords = '';
        $('.fnc_receipt_yes_list_search_inp').val('搜索相关业务单编号/相关业务名称').css('color', '#ccc');
        getReceiptListFn();
        $('.fnc_receipt_list_table_unshow').removeClass('none');
    });

    //未收款 - 搜索关键字
    $('.fnc_receipt_list_search_btn').die('click').live('click', function () {
        if ($('.fnc_receipt_list_search_inp').val() == '搜索相关业务单编号/相关业务名称') {
            getReceiptListData.keywords = '';
        } else {
            getReceiptListData.keywords = $('.fnc_receipt_list_search_inp').val();
        }
        getReceiptListData.ids = '';
        getReceiptListFn();
    });

    //已收款 - 搜索关键字
    $('.fnc_receipt_yes_list_search_btn').die('click').live('click', function () {
        if ($('.fnc_receipt_yes_list_search_inp').val() == '搜索相关业务单编号/相关业务名称') {
            getReceiptListData.keywords = '';
        } else {
            getReceiptListData.keywords = $('.fnc_receipt_yes_list_search_inp').val();
        }
        getReceiptListData.ids = '';
        getReceiptListFn();
    });
    //刷新
    $('#page_84_refresh').die('click').live('click', function () {
        getReceiptListData.page = 1;
        getReceiptListData.keywords = '';
        $('.fnc_receipt_yes_list_search_inp').val('搜索相关业务单编号/相关业务名称').css('color', '#ccc');
        $('.fnc_receipt_list_search_inp').val('搜索相关业务单编号/相关业务名称').css('color', '#ccc');
        getReceiptListData.ids = '';
        getReceiptListFn();
    });

    //添加抄送人
    $('.tanceng .fnc_receipt_create_choose_copy_btn').die('click').live('click', function () {
        fncReceiptSkdChooseCopy();
    });
    //选择抄送人
    function fncReceiptSkdChooseCopy() {
        $.ajax({
            type: "get",
            url: SERVER_URL + "/dept/deptlist",
            data: {token: token},
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var deep = 0;
                    $('.tanceng .fnc_receipt_create_choose_copy_list').html(tree_list_choose_dept_person(oE.rows, deep));
                    // 所有分类图标样式控制
                    if ($('i.fnc_receipt_create_choose_copy_list').children().length == 0) {
                        $('li.left_all span.icon_open').addClass('personOth')
                    }
                    // 下级部门样式控制
                    for (var i = 0, liLeft1 = $('.tanceng .fnc_receipt_create_choose_copy_list li.left_1').length; i < liLeft1; i++) {
                        if ($('.tanceng .fnc_receipt_create_choose_copy_list li.left_1').eq(i).next('ul').length == 0) {
                            $('.tanceng .fnc_receipt_create_choose_copy_list li.left_1').eq(i).find('span.icon_open').addClass('personOth');
                            $('.tanceng .fnc_receipt_create_choose_copy_list li.left_1').eq(i).find('span.personOth').closest('li').addClass('deptChild')
                        }
                    }
                    //选择人员左侧选择
                    $('.tanceng .fnc_receipt_create_choose_copy_list ul .li_person').die('click').live('click', function () {
                        if ($(this).find('em').hasClass('on')) {
                            $('.tanceng .fnc_receipt_create_copy_chosen_list').find('li[userinfoid=' + $(this).attr('userinfoid') + ']').remove()
                            $(this).find('span.list_check em').removeClass('on')
                        } else {
                            $('.tanceng .fnc_receipt_create_copy_chosen_list').append('<li userinfoid="' + $(this).attr('userinfoid') + '"><span>' + $(this).children('.list_msg').html() + '</span><i class="list_choose_delete"></i></li>');
                            $(this).find('span.list_check em').addClass('on')
                        }
                    });
                    //选择人员右侧删除
                    $('i.list_choose_delete').die('click').live('click', function () {
                        $(this).closest('li').remove();
                        $('.tanceng .fnc_receipt_create_choose_copy_list ul .li_person[userinfoid = "' + $(this).closest('li').attr('userinfoid') + '"]').find('em').removeClass('on');
                    });
                }
            },
            error: function (data) {

            }
        });
    }

    //新建收款单参数

    var fncReceiptSkdCreateData = {
        token: token,
        cs_name: '', // 创建名称 客户名称 供应商名称
        code_sn: '', // 编号
        receipt_code_sn: '', // 收款单编号
        name: '', // 结算账户名称
        choice_cuenta: '', // 选择账目
        way: 1, // 方式 1现金 2电汇 3支票
        owner: uid, // 收款人
        no_pay_money: '', // 应收款
        already_pay_money: '', // 实收款
        already_pay_money_big: '', // 实收款大写
        note: '', // 备注
        copy_list: '', // 抄送人
        receipt_id: '' // 收款id
    };
    //选择人员保存
    $('.tanceng .fnc_receipt_choose_copy_save').die('click').live('click', function () {
        var copyChosen = '';
        $.each($('.tanceng .fnc_receipt_create_copy_chosen_list li'), function (i, v) {
            if($('.tanceng .fnc_receipt_create_copy_chosen_list').find('li').eq(i).attr('userinfoid') == uid) return true;
            copyChosen += '<li userinfoid="' + $('.tanceng .fnc_receipt_create_copy_chosen_list').find('li').eq(i).attr('userinfoid') + '">\
                                <i class="del_img_1">-</i><em class="icon_personBtn icon_personBtn_msg"></em>\
                                <em class="icon_adderBtn"></em>\
                                <p class="box_adderName">' + $('.tanceng .fnc_receipt_create_copy_chosen_list').find('li').eq(i).text() + '</p>\
                                </li>';
        });
        $('.tanceng .fnc_receipt_create_add_copy_list').html('<li userinfoid="' + uid + '"><em class="icon_personBtn icon_personBtn_msg"></em> <em class="icon_adderBtn"></em> <p class="box_adderName">' + uname + '</p> </li> <li> <em class="icon_personBtn icon_personBtn_add val_dialogTop fnc_receipt_create_choose_copy_btn" name="finance_khysqk_csr"></em> </li>').prepend(copyChosen);
        $('.tanceng .fnc_receipt_edit_copy_list').html('<li userinfoid="' + uid + '"><em class="icon_personBtn icon_personBtn_msg"></em> <em class="icon_adderBtn"></em> <p class="box_adderName">' + uname + '</p> </li> <li> <em class="icon_personBtn icon_personBtn_add val_dialogTop fnc_receipt_create_choose_copy_btn" name="finance_khysqk_csr"></em> </li>').prepend(copyChosen);
        $(this).closest('.dialog_box').remove();
    })

    //查看销售收款详情
    var curReceiptId = null;
    $('.fnc_receipt_look_btn').die('click').live('click', function () {
        curReceiptId = $(this).closest('tr').attr('receiptid');
        fncReceiptDetailFn(curReceiptId);
    });

    //销售收款详情函数
    function fncReceiptDetailFn(curReceiptId) {
        $.ajax({
            url: SERVER_URL + '/receipt/info',
            type: 'GET',
            data: {
                token: token,
                id: curReceiptId,
                thetype: 1
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var receiptDetail = oE.datalist;
                    //名字
                    $('.tanceng .fnc_receipt_detail_name').html(receiptDetail['name']);
                    //销售单编号
                    $('.tanceng .fnc_receipt_detail_code_sn').html(receiptDetail['code_sn']);
                    //结算账户
                    $('.tanceng .fnc_receipt_detail_account_name').html(receiptDetail['account_name']);
                    //含税状态
                    if (receiptDetail['tax_status'] == 1) {
                        $('.tanceng .fnc_receipt_detail_tax_status').html('未含税');
                    } else if (receiptDetail['tax_status'] == 2) {
                        $('.tanceng .fnc_receipt_detail_tax_status').html('含税');
                    }
                    //收款方式
                    if (receiptDetail['receipt_way'] == 1) {
                        $('.tanceng .fnc_receipt_detail_way').html('现金');
                    } else if (receiptDetail['receipt_way'] == 2) {
                        $('.tanceng .fnc_receipt_detail_way').html('电汇');
                    } else if (receiptDetail['receipt_way'] == 3) {
                        $('.tanceng .fnc_receipt_detail_way').html('支票');
                    }
                    //本次应收款
                    $('.tanceng .fnc_receipt_detail_no_pay_money').html(receiptDetail['no_pay_money']);
                    //总应收款
                    $('.tanceng .fnc_receipt_detail_already_pay_money').html(receiptDetail['already_pay_money']);
                    //剩余款
                    $('.tanceng .fnc_receipt_detail_remain').html(receiptDetail['remain']);
                    //回款阶段
                    var stepList = receiptDetail['stepList'];
                    var stepListHtml = '';
                    //账期状态
                    var payStatusClass = '';
                    var payStatusName = '';
                    $.each(stepList, function (i, v) {
                        if (v['pay_status'] == 1) {
                            payStatusClass = 'c_g';
                            payStatusName = '正常回款';
                        } else if (v['pay_status'] == 2) {
                            payStatusClass = 'c_y';
                            payStatusName = '临近';
                        } else if (v['pay_status'] == 3) {
                            payStatusClass = 'c_r';
                            payStatusName = '逾期';
                        } else if (v['pay_status'] == 4) {
                            payStatusClass = 'c_g';
                            payStatusName = '待收';
                        }
                        stepListHtml += '<tr>\
                                        <td>阶段' + (i + 1) + '</td>\
                                        <td>' + v['segmet_day'] + '</td>\
                                        <td>' + v['no_pay_money'] + '</td>\
                                        <td>' + v['pay_time'] + '</td>\
                                        <td>' + v['already_money'] + '</td>\
                                        <td class="' + payStatusClass + '">' + payStatusName + '<div class="' + (v['pay_status'] == 1 ? '' : 'none') + '" style="position: relative;padding: 0 10px;">\
                                        <img src="static/images/hr_duihao.png" style="position: absolute;top:-18px;left: 55px;">\
                                        </div>\
                                        </td>\
                                        </tr>'
                    });
                    $('.tanceng .fnc_receipt_detail_steps_list_tbody').html(stepListHtml);
                    //订单收款记录
                    var receiptLog = oE.receiptLogList;
                    if(receiptLog.length == 0){
                        $('.tanceng .fnc_receipt_log_list_nodata_box').removeClass('none');
                        $('.tanceng .fnc_receipt_log_list_table_total').addClass('none');
                    }else{
                        $('.tanceng .fnc_receipt_log_list_nodata_box').addClass('none');
                        $('.tanceng .fnc_receipt_log_list_table_total').removeClass('none');
                    }
                    var receiptLogHtml = '';
                    var receiptLogTotal = 0;
                    $.each(receiptLog, function (i, v) {
                        receiptLogHtml += '<tr receiptlogid="' + v['id'] + '">\
                                            <td>' + l_dbl(i + 1) + '</td>\
                                            <td>' + v['receipt_code_sn'] + '</td>\
                                            <td>' + v['create_time'] + '</td>\
                                            <td>' + v['owner_name'] + '</td>\
                                            <td>' + v['choice_cuenta'] + '</td>\
                                            <td>' + v['already_pay_money'] + '</td>\
                                            <td>' + v['note'] + '</td>\
                                            <td>\
                                            <button class="but_mix val_dialogTop fnc_receipt_log_look_detail_btn" name="finance_khysqk_ckxq">查看收款单</button>\
                                            </td>\
                                           </tr>';
                        receiptLogTotal += parseFloat(v['already_pay_money']);
                    });
                    $('.tanceng .fnc_receipt_log_list_tbody').html(receiptLogHtml);
                    $('.tanceng .fnc_receipt_detail_ddskjl_total').html(receiptLogTotal);

                    //新建收款单
                    $('.tanceng .fnc_receipt_detail_create_skd_btn').die('click').live('click', function () {
                        if($('.tanceng .fnc_receipt_log_list_tbody tr').length > 0){
                            $('.tanceng .fnc_receipt_detail_create_skd_choose_account_btn').attr('disabled', true).removeClass('select_input').addClass('time_input inp_noInput').val(receiptDetail['choice_cuenta_name']).parent().removeClass('select_mormal');
                            fncReceiptSkdCreateData.choice_cuenta = receiptDetail['choice_cuenta'];
                            fncReceiptSkdCreateData.choice_cuenta_name = receiptDetail['choice_cuenta_name'];
                        }else{
                            $('.tanceng .fnc_receipt_detail_create_skd_choose_account_btn').attr('disabled', false).addClass('select_input').removeClass('time_input inp_noInput').val(receiptDetail['choice_cuenta_name']).parent().addClass('select_mormal');
                        }
                        //收款id
                        fncReceiptSkdCreateData.receipt_id = receiptDetail['id'];
                        //收款方式
                        fncReceiptSkdCreateData.way = receiptDetail['receipt_way'];
                        $('.tanceng .fnc_receipt_detail_create_skd_receipt_way').html($('.tanceng .fnc_receipt_detail_way'));
                        //客户名称
                        $('.tanceng .fnc_receipt_detail_create_skd_name').html(receiptDetail['name']);
                        fncReceiptSkdCreateData.cs_name = receiptDetail['name'];
                        //销售单编号
                        $('.tanceng .fnc_receipt_detail_create_skd_code_sn').html(receiptDetail['code_sn']);
                        fncReceiptSkdCreateData.code_sn = receiptDetail['code_sn'];
                        //销售收款单编号
                        $('.tanceng .fnc_receipt_detail_create_skd_code').val(likGetCodeFn('KHSK'));
                        fncReceiptSkdCreateData.receipt_code_sn = $('.tanceng .fnc_receipt_detail_create_skd_code').val();
                        //结算账户
                        $('.tanceng .fnc_receipt_detail_create_skd_jszh').val(receiptDetail['account_name']);
                        fncReceiptSkdCreateData.name = receiptDetail['account_name'];
                        var curCompanyAccountId = receiptDetail['company_account_id'];
                        //选择账目
                        $('.tanceng .fnc_receipt_detail_create_skd_choose_account_btn').die('click').live('click', function () {
                            $.ajax({
                                url: SERVER_URL + '/accounts/list',
                                type: 'GET',
                                data: {
                                    token: token,
                                    company_account_id: curCompanyAccountId
                                },
                                dataType: 'json',
                                success: function (oE) {
                                    var datalist = oE.datalist;
                                    var chooseAccountUl = '';
                                    $.each(datalist, function (i, v) {
                                        chooseAccountUl += '<li accountid="' + v['id'] + '">' + v['name'] + '</li>'
                                    });
                                    $('.tanceng .fnc_receipt_detail_create_skd_choose_account_ul').html(chooseAccountUl);
                                }
                            });
                        });
                        $('.tanceng .fnc_receipt_detail_create_skd_choose_account_ul li').die('click').live('click', function () {
                            fncReceiptSkdCreateData.choice_cuenta = $(this).attr('accountid');
                        });
                        //收款人
                        $('.tanceng .fnc_receipt_detail_create_skd_owner').html(uname);
                        //收款时间
                        $('.tanceng .fnc_receipt_detail_create_skd_create_time').html(getCurrentDate());
                        //应收款项
                        $('.tanceng .fnc_receipt_detail_create_skd_create_no_pay_money').html(receiptDetail['remain']);
                        fncReceiptSkdCreateData.no_pay_money = receiptDetail['remain'];
                        //大写实收款
                        $('.tanceng .fnc_receipt_detail_create_skd_create_already_money_inp').live('keyup', function () {
                            $('.tanceng .fnc_receipt_detail_create_skd_create_already_money_upper').html(convertCurrency($('.tanceng .fnc_receipt_detail_create_skd_create_already_money_inp').val()));
                        });
                        //抄送人
                        $('.tanceng .fnc_receipt_create_add_copy_list').html('<li userinfoid="' + uid + '"><em class="icon_personBtn icon_personBtn_msg"></em> <em class="icon_adderBtn"></em> <p class="box_adderName">' + uname + '</p> </li> <li> <em class="icon_personBtn icon_personBtn_add val_dialogTop fnc_receipt_create_choose_copy_btn" name="finance_khysqk_csr"></em> </li>');
                    });
                }
            }
        });
    }

    //新建收款单提交
    $('.tanceng .fnc_receipt_skd_create_submit_btn').die('click').live('click', function () {
        //选择账目
        if ($('.tanceng .fnc_receipt_detail_create_skd_choose_account_btn').val() == '请选择账目') {
            alert('请选择账目');
            return false;
        }
        //实收款
        if ($('.tanceng .fnc_receipt_detail_create_skd_create_already_money_inp').val() == '') {
            alert('实收款不能为空');
            return false;
        }else if(parseFloat($('.tanceng .fnc_receipt_detail_create_skd_create_already_money_inp').val()) > parseFloat($('.tanceng .fnc_receipt_detail_create_skd_create_no_pay_money').html())){
            alert('超出最大限额');
            return false;
        }

        var copyList = '';
        for (var i = 0; i < $('.tanceng .fnc_receipt_create_add_copy_list li').length - 1; i++) {
            copyList += $('.tanceng .fnc_receipt_create_add_copy_list li').eq(i).attr('userinfoid') + ',';
        }
        //应收款项
        fncReceiptSkdCreateData.no_pay_money = $('.tanceng .fnc_receipt_detail_create_skd_create_no_pay_money').html();
        //大写实收款
        fncReceiptSkdCreateData.already_pay_money = $('.tanceng .fnc_receipt_detail_create_skd_create_already_money_inp').val();
        fncReceiptSkdCreateData.already_pay_money_big = $('.tanceng .fnc_receipt_detail_create_skd_create_already_money_upper').html();
        //备注
        if ($('.tanceng .fnc_receipt_detail_create_skd_create_note_inp').val() == '备注') {
            fncReceiptSkdCreateData.note = '';
        } else {
            fncReceiptSkdCreateData.note = $('.tanceng .fnc_receipt_detail_create_skd_create_note_inp').val();
        }

        copyList = copyList.slice(0, copyList.length - 1);
        fncReceiptSkdCreateData.copy_list = copyList;
        $.ajax({
            url: SERVER_URL + '/receipt/add',
            type: 'POST',
            data: fncReceiptSkdCreateData,
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    fncReceiptDetailFn(curReceiptId);
                    getReceiptListFn();
                }
            }
        });
        $(this).closest('.dialog_box').remove();
    });

    //查看采购退货收款详情
    $('.fnc_receipt_cg_look_btn').die('click').live('click', function () {
        curReceiptId = $(this).closest('tr').attr('receiptid');
        fncReceiptCgDetailFn(curReceiptId);
    });

    //采购退货收款详情函数
    function fncReceiptCgDetailFn(curReceiptId) {
        $.ajax({
            url: SERVER_URL + '/receipt/info',
            type: 'GET',
            data: {
                token: token,
                id: curReceiptId,
                thetype: 1
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var receiptDetail = oE.datalist;
                    //名字
                    $('.tanceng .fnc_receipt_detail_name').html(receiptDetail['name']);
                    //销售单编号
                    $('.tanceng .fnc_receipt_detail_code_sn').html(receiptDetail['code_sn']);
                    //结算账户
                    $('.tanceng .fnc_receipt_detail_account_name').html(receiptDetail['account_name']);
                    //含税状态
                    if (receiptDetail['tax_status'] == 1) {
                        $('.tanceng .fnc_receipt_detail_tax_status').html('未含税');
                    } else if (receiptDetail['tax_status'] == 2) {
                        $('.tanceng .fnc_receipt_detail_tax_status').html('含税');
                    }
                    //收款方式
                    if (receiptDetail['account_name'] == 1) {
                        $('.tanceng .fnc_receipt_detail_account_name').html('现金');
                    } else if (receiptDetail['account_name'] == 2) {
                        $('.tanceng .fnc_receipt_detail_account_name').html('电汇');
                    } else if (receiptDetail['account_name'] == 3) {
                        $('.tanceng .fnc_receipt_detail_account_name').html('支票');
                    }
                    //本次应收款
                    $('.tanceng .fnc_receipt_detail_no_pay_money').html(receiptDetail['no_pay_money']);
                    //总应收款
                    $('.tanceng .fnc_receipt_detail_already_pay_money').html(receiptDetail['already_pay_money']);
                    //应收款日期
                    $('.tanceng .fnc_receipt_detail_segmet_day').html(receiptDetail['day']);
                    //订单收款记录
                    var receiptLog = oE.receiptLogList;
                    var receiptLogHtml = '';
                    var receiptLogTotal = 0;
                    $.each(receiptLog, function (i, v) {
                        receiptLogHtml += '<tr receiptlogid="' + v['id'] + '">\
                                            <td>' + l_dbl(i + 1) + '</td>\
                                            <td>' + v['receipt_code_sn'] + '</td>\
                                            <td>' + v['create_time'] + '</td>\
                                            <td>' + v['owner_name'] + '</td>\
                                            <td>' + v['choice_cuenta'] + '</td>\
                                            <td>' + v['already_pay_money'] + '</td>\
                                            <td>' + v['note'] + '</td>\
                                            <td>\
                                            <button class="but_mix val_dialogTop fnc_receipt_log_look_cg_detail_btn" name="finance_khysqk_ckxq_cg">查看收款单</button>\
                                            </td>\
                                           </tr>';
                        receiptLogTotal += parseFloat(v['already_pay_money']);
                    });
                    $('.tanceng .fnc_receipt_log_list_tbody').html(receiptLogHtml);
                    $('.tanceng .fnc_receipt_detail_ddskjl_total').html(receiptLogTotal);
                    //新建收款单
                    $('.tanceng .fnc_receipt_detail_create_skd_cg_btn').die('click').live('click', function () {
                        //收款id
                        fncReceiptSkdCreateData.receipt_id = receiptDetail['id'];
                        //收款方式
                        fncReceiptSkdCreateData.way = receiptDetail['receipt_way'];
                        $('.tanceng .fnc_receipt_detail_create_skd_receipt_way').html($('.tanceng .fnc_receipt_detail_way'));
                        //供应商名称
                        $('.tanceng .fnc_receipt_detail_create_skd_name').html(receiptDetail['name']);
                        fncReceiptSkdCreateData.cs_name = receiptDetail['name'];
                        //退换货编号
                        $('.tanceng .fnc_receipt_detail_create_skd_code_sn').html(receiptDetail['code_sn']);
                        fncReceiptSkdCreateData.code_sn = receiptDetail['code_sn'];
                        //采购收款单编号
                        $('.tanceng .fnc_receipt_detail_create_skd_code').val(likGetCodeFn('GYSSK'));
                        fncReceiptSkdCreateData.receipt_code_sn = $('.tanceng .fnc_receipt_detail_create_skd_code').val();
                        //结算账户
                        $('.tanceng .fnc_receipt_detail_create_skd_jszh').val(receiptDetail['account_name']);
                        fncReceiptSkdCreateData.name = receiptDetail['account_name'];
                        var curCompanyAccountId = receiptDetail['company_account_id'];
                        //选择账目
                        $('.tanceng .fnc_receipt_detail_create_skd_choose_account_btn').die('click').live('click', function () {
                            $.ajax({
                                url: SERVER_URL + '/accounts/list',
                                type: 'GET',
                                data: {
                                    token: token,
                                    company_account_id: curCompanyAccountId
                                },
                                dataType: 'json',
                                success: function (oE) {
                                    var datalist = oE.datalist;
                                    var chooseAccountUl = '';
                                    $.each(datalist, function (i, v) {
                                        chooseAccountUl += '<li accountid="' + v['id'] + '">' + v['name'] + '</li>'
                                    });
                                    $('.tanceng .fnc_receipt_detail_create_skd_choose_account_ul').html(chooseAccountUl);
                                }
                            });
                        });
                        $('.tanceng .fnc_receipt_detail_create_skd_choose_account_ul li').die('click').live('click', function () {
                            fncReceiptSkdCreateData.choice_cuenta = $(this).attr('accountid');
                        });
                        //收款人
                        $('.tanceng .fnc_receipt_detail_create_skd_owner').html(uname);
                        //收款时间
                        $('.tanceng .fnc_receipt_detail_create_skd_create_time').html(getCurrentDate());
                        //应收款项
                        $('.tanceng .fnc_receipt_detail_create_skd_create_no_pay_money').html(receiptDetail['no_pay_money']);
                        fncReceiptSkdCreateData.no_pay_money = receiptDetail['no_pay_money'];
                        //大写实收款
                        $('.tanceng .fnc_receipt_detail_create_skd_create_already_money_inp').live('keyup', function () {
                            $('.tanceng .fnc_receipt_detail_create_skd_create_already_money_upper').html(convertCurrency($('.tanceng .fnc_receipt_detail_create_skd_create_already_money_inp').val()));
                        });
                        //抄送人
                        $('.tanceng .fnc_receipt_create_add_copy_list').html('<li userinfoid="' + uid + '"><em class="icon_personBtn icon_personBtn_msg"></em> <em class="icon_adderBtn"></em> <p class="box_adderName">' + uname + '</p> </li> <li> <em class="icon_personBtn icon_personBtn_add val_dialogTop fnc_receipt_create_choose_copy_btn" name="finance_khysqk_csr"></em> </li>');
                    });
                }
            }
        });
    }

    //查看收款单详情
    var curReceiptLogId = null;
    $('.fnc_receipt_log_look_detail_btn').die('click').live('click', function () {
        curReceiptLogId = $(this).closest('tr').attr('receiptlogid');
        $.ajax({
            url: SERVER_URL + '/receipt/infolog',
            type: 'GET',
            data: {
                token: token,
                id: curReceiptLogId
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var data = oE.datalist;
                    //收款单编号
                    $('.tanceng .fnc_receipt_log_detail_receipt_code_sn').html(data['receipt_code_sn']);
                    //客户名称
                    $('.tanceng .fnc_receipt_log_detail_cs_name').html(data['cs_name']);
                    //销售单编号
                    $('.tanceng .fnc_receipt_log_detail_code_sn').html(data['code_sn']);
                    //结算账户
                    $('.tanceng .fnc_receipt_log_detail_name').html(data['name']);
                    //结算账目
                    $('.tanceng .fnc_receipt_log_detail_choice_cuenta').html(data['choice_cuenta']);
                    //收款方式
                    if (data['way'] == 1) {
                        $('.tanceng .fnc_receipt_log_detail_way').html('现金');
                    } else if (data['way'] == 2) {
                        $('.tanceng .fnc_receipt_log_detail_way').html('电汇');
                    } else if (data['way'] == 3) {
                        $('.tanceng .fnc_receipt_log_detail_way').html('支票');
                    }
                    //收款人
                    $('.tanceng .fnc_receipt_log_detail_owner').html(data['owner_name']);
                    //收款日期
                    $('.tanceng .fnc_receipt_log_detail_day').html(data['day']);
                    //应收款项
                    $('.tanceng .fnc_receipt_log_detail_no_pay_money').html(data['no_pay_money']);
                    //实收款
                    $('.tanceng .fnc_receipt_log_detail_already_pay_money').html(data['already_pay_money']);
                    //大写实收款
                    $('.tanceng .fnc_receipt_log_detail_already_pay_money_big').html(data['already_pay_money_big']);
                    //备注
                    $('.tanceng .fnc_receipt_log_detail_note').html(data['note']);
                }
            }
        });
    });

    //查看采购退款收款单详情
    $('.fnc_receipt_log_look_cg_detail_btn').die('click').live('click', function () {
        curReceiptLogId = $(this).closest('tr').attr('receiptlogid');
        $.ajax({
            url: SERVER_URL + '/receipt/infolog',
            type: 'GET',
            data: {
                token: token,
                id: curReceiptLogId
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var data = oE.datalist;
                    //收款单编号
                    $('.tanceng .fnc_receipt_log_detail_receipt_code_sn').html(data['receipt_code_sn']);
                    //客户名称
                    $('.tanceng .fnc_receipt_log_detail_cs_name').html(data['cs_name']);
                    //销售单编号
                    $('.tanceng .fnc_receipt_log_detail_code_sn').html(data['code_sn']);
                    //结算账户
                    $('.tanceng .fnc_receipt_log_detail_name').html(data['name']);
                    //结算账目
                    $('.tanceng .fnc_receipt_log_detail_choice_cuenta').html(data['choice_cuenta']);
                    //收款方式
                    if (data['way'] == 1) {
                        $('.tanceng .fnc_receipt_log_detail_way').html('现金');
                    } else if (data['way'] == 2) {
                        $('.tanceng .fnc_receipt_log_detail_way').html('电汇');
                    } else if (data['way'] == 3) {
                        $('.tanceng .fnc_receipt_log_detail_way').html('支票');
                    }
                    //收款人
                    $('.tanceng .fnc_receipt_log_detail_owner').html(data['owner_name']);
                    //收款日期
                    $('.tanceng .fnc_receipt_log_detail_day').html(data['day']);
                    //应收款项
                    $('.tanceng .fnc_receipt_log_detail_no_pay_money').html(data['no_pay_money']);
                    //实收款
                    $('.tanceng .fnc_receipt_log_detail_already_pay_money').html(data['already_pay_money']);
                    //大写实收款
                    $('.tanceng .fnc_receipt_log_detail_already_pay_money_big').html(data['already_pay_money_big']);
                    //备注
                    $('.tanceng .fnc_receipt_log_detail_note').html(data['note']);
                }
            }
        });
    });

    //阻止重复触发
    $('.fnc_receipt_page_select_list li').die('click').live('click', function () {
        return false;
    });

    //收款提醒
    $('.page_84_sktx_btn').live('click', function () {
        $.ajax({
            url: SERVER_URL + '/receipt/getwarning',
            type: 'GET',
            data: {
                token: token,
                thetype: 1
            },
            dataType: 'json',
            success: function (oE) {
                if(oE.code == 0){
                    $('.tanceng .fnc_sktx_day_time').val(oE['datalist']['day']).css('color', '#333');
                }
            },
            error: function(e){
                alert(e.msg);
            }
        });
    });

    var fncSktxData = {
        token: token,
        is_open: '', // 是否开启 1关闭 2开启
        day: '', // 天数
        thetype: 1
    };
    $('.tanceng .fnc_sktx_submit_btn').die('click').live('click', function () {
        if ($('.tanceng .fnc_sktx_checkbox').is(':checked')) {
            fncSktxData.is_open = 2;
        } else {
            fncSktxData.is_open = 1;
        }
        if ($('.tanceng .fnc_sktx_day_time').val() == '') {
            alert('请输入天数');
            return false;
        } else {
            fncSktxData.day = $('.tanceng .fnc_sktx_day_time').val();
        }
        $.ajax({
            url: SERVER_URL + '/receipt/setwarning',
            type: 'POST',
            data: fncSktxData,
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
