$(function () {
    //补零函数
    function l_dbl(x) {
        return x < 10 ? '0' + x : x
    }

    //json数组去重
    function getJsonArr(arr) {
        //定义需要的空数组
        var newArr = [];
        //定义转换字符串后的数组
        var newStringArr = [];
        //对arr数组进行遍历
        $.each(arr, function (i, v) {
            //json对象转换为字符串
            var sArr = JSON.stringify(v);
            if ($.inArray(sArr, newStringArr) == -1) {
                //根据字符串数组push对象
                newStringArr.push(sArr);
                newArr.push(v)
            }
        });
        return newArr;
    }

    //获取当前系统时间 年-月-日 时：分：秒
    function getCurrentDate() {
        var oDate = new Date();
        var sTime = '';
        sTime = oDate.getFullYear() + '-' + l_dbl(oDate.getMonth() + 1) + '-' + l_dbl(oDate.getDate()) + '&nbsp;&nbsp;&nbsp;' + l_dbl(oDate.getHours()) + ':' + l_dbl(oDate.getMinutes()) + ':' + l_dbl(oDate.getSeconds());
        return sTime;
    }

    //获取当前系统时间  年-月-日
    function getCurrentDateDay() {
        var oDate = new Date();
        var sTime = '';
        sTime = oDate.getFullYear() + '-' + l_dbl(oDate.getMonth() + 1) + '-' + l_dbl(oDate.getDate());
        return sTime
    }

    var token, page, num, keywords, thetype;
    //token = Admin.get_token();
    //token = '2017052516045457073-1-1';
    uid = Admin.get_uid();
    token = Admin.get_token();
    uname = loginUserInfo['username'];
    console.log(token);
//**************选择查看项*****************************
    //未付退票定义选择查看项income-refund-ticket
    var fnIncomeRefundTicketNoListLookAbledField = [
        {'index': null, 'field': '结算账户'},
        {'index': null, 'field': '结算账目'}
    ];
    likShow('#fnc_income_refund_ticket_no_table', fnIncomeRefundTicketNoListLookAbledField, '#fnc_income_refund_ticket_no_look_field_ul', '#fnc_income_refund_ticket_no_look_field_save', '#fnc_income_refund_ticket_no_look_field_reset');
    //已付退票定义选择查看项
    var fnIncomeRefundTicketYesListLookAbledField = [
        {'index': null, 'field': '结算账户'},
        {'index': null, 'field': '结算账目'}
    ];
    likShow('#fnc_income_refund_ticket_yes_table', fnIncomeRefundTicketYesListLookAbledField, '#fnc_income_refund_ticket_yes_look_field_ul', '#fnc_income_refund_ticket_yes_look_field_save', '#fnc_income_refund_ticket_yes_look_field_reset');
    //进项退票参数
    var getIncomeRefundTicketListData = {
        token: token,
        page: 1,
        num: 10,
        keywords: '',//关键字
        thetype: 1,//1未付退票/2已付退票
        day: ''//应付退票日期
    };

    getNoIncomeRefundTicketListFn();
    //未付退票列表函数
    function getNoIncomeRefundTicketListFn() {
        $.ajax({
            url: SERVER_URL + '/income-refund-ticket/list',
            type: 'GET',
            data: getIncomeRefundTicketListData,
            dataType:'json',
            success: function (oE) {
                //将返回值转换为json对象
                //var oE = eval("(" + e + ")");
                console.log(oE);
                if (oE.code == 0) {
                    console.log(oE)
                    //搜索总条数
                    $('.fnc_noincome_ticket_list_num_total').html(oE.totalcount);
                    //应付退票款
                    $('.fnc_noincome_no_ticket_total').html(oE.no_ticket_total);
                    //总应付退票款
                    $('.fnc_noincome_total_ticket').html(oE.total_ticket);
                    //已付退票款
                    $('.fnc_noincome_already_ticket').html(oE.already_ticket);
                    var datalist = oE.datalist;
                    if (datalist.length == 0) {
                        $('.fnc_noincome_ticket_list_nodata_box').removeClass('none');
                        $('.fnc_noincome_ticket_list_no_handle').addClass('none');
                        $('.fnc_noincome_ticket_list_table_total').addClass('none');
                    } else {
                        $('.fnc_noincome_ticket_list_nodata_box').addClass('none');
                        $('.fnc_noincome_ticket_list_no_handle').removeClass('none');
                        $('.fnc_noincome_ticket_list_table_total').removeClass('none');
                    }
                    var noincomeHtml = '';
                    console.log(datalist);
                    $.each(datalist, function (i, v) {
                        noincomeHtml += '<tr fncnoincomeid="' + v['id'] + '">\
                        <td>' + l_dbl(i + 1) + '</td>\
                        <td class="finance_pay_rent_list f_color">' + likNullData(v['quote_code_sn']) + '</td>\
                        <td class="finance_pay_rent_list f_color">' + likNullData(v['quote_order_code_sn']) + '</td>\
                        <td>' + likNullData(v['cs_name']) + '</td>\
                        <td>' + likNullData(v['owner_name']) + '</td>\
                        <td>' + likNullData(v['day']) + '</td>\
                        <td>' + likNullData(v['ticket_name']) + '</td>\
                        <td>' + likNullData(v['ticket_total']) + '</td>\
                        <td>' + likNullData(v['name']) + '</td>\
                        <td>' + likNullData(v['choice_cuenta']) + '</td>\
                        <td>\
                        <button class="but_mix val_dialog finance_pay_refund_yfqk_xxtp" name="finance_pay_refund_yfqk_xxtp">标记已付</button>\
                        </td>\
                        </tr>'
                    });
                    $('.fnc_noincome_ticket_tbody').html(noincomeHtml);
                    //分页
                    list_table_render_pagination('.fnc_noincome_ticket_list_no_handle', getIncomeRefundTicketListData, getNoIncomeRefundTicketListFn, oE.totalcount, datalist.length);
                    $('#fnc_income_refund_ticket_yes_look_field_save').trigger('click');
                }
            },
            error: function(e){
                console.log(e);
            }
        });
    }

    //已付退票列表函数
    function getIncomeRefundTicketListFn() {

        $.ajax({
            url: SERVER_URL + '/income-refund-ticket/list',
            type: 'GET',
            data: getIncomeRefundTicketListData,
            dataType:'json',
            success: function (oE) {
                if (oE.code == 0) {
                    //搜索总条数
                    $('.fnc_income_ticket_list_num_total').html(oE.totalcount);
                    var datalist = oE.datalist;
                    if (datalist.length == 0) {
                        $('.fnc_income_ticket_list_nodata_box').removeClass('none');
                        $('.fnc_income_ticket_list_yes_handle').addClass('none');
                        $('.fnc_income_ticket_list_table_total').addClass('none');
                    } else {
                        $('.fnc_income_ticket_list_nodata_box').addClass('none');
                        $('.fnc_income_ticket_list_yes_handle').removeClass('none');
                        $('.fnc_income_ticket_list_table_total').removeClass('none');
                    }
                    var incomeHtml = '';
                    console.log(datalist);
                    $.each(datalist, function (i, v) {
                        incomeHtml += ' <tr fncnoincomeid="' + v['id'] + '">\
                            <td>' + l_dbl(i + 1) + '</td>\
                            <td class="finance_pay_rent_list f_color">' + likNullData(v['quote_code_sn']) + '</td>\
                            <td class="finance_pay_rent_list f_color">' + likNullData(v['quote_order_code_sn']) + '</td>\
                            <td>' + likNullData(v['cs_name']) + '</td>\
                            <td>' + likNullData(v['owner_name']) + '</td>\
                            <td>' + likNullData(v['day']) + '</td>\
                            <td>缺</td>\
                            <td>' + likNullData(v['ticket_name']) + '</td>\
                        <td>' + likNullData(v['ticket_total']) + '</td>\
                        <td>' + likNullData(v['name']) + '</td>\
                        <td>' + likNullData(v['choice_cuenta']) + '</td>\
                        <td>\
                        <button class="but_mix val_dialog finance_pay_refund_yfqk_xx" name="finance_pay_refund_yfqk_xx">查看</button>\
                            </td>\
                            </tr>'
                    });
                    $('.fnc_income_ticket_tbody').html(incomeHtml);
                    //分页
                    list_table_render_pagination('.fnc_income_ticket_list_yes_handle', getIncomeRefundTicketListData, getIncomeRefundTicketListFn, oE.totalcount, datalist.length);
                    $('#fnc_income_refund_ticket_yes_look_field_save').trigger('click');
                }
            }
        });
    }

    //切换未付退票
    $('#fnc_income_ticket_nav_ul li:nth-of-type(1)').die('click').live('click', function () {
        getIncomeRefundTicketListData.thetype = 1;
        getIncomeRefundTicketListData.page = 1;
        getIncomeRefundTicketListData.num = 10;
        $('.fnc_noincome_ticket_list_search_num_inp').val('10');
        $('.fnc_noincome_ticket_list_no_search_inp').val('搜索采购退换货编号/供应商名称').css('color', '#ccc');
        getIncomeRefundTicketListData.keywords = '';
        getNoIncomeRefundTicketListFn();
    });
    //切换已付退票
    $('#fnc_income_ticket_nav_ul li:nth-of-type(2)').die('click').live('click', function () {
        getIncomeRefundTicketListData.thetype = 2;
        getIncomeRefundTicketListData.page = 1;
        getIncomeRefundTicketListData.num = 10;
        $('.fnc_income_ticket_list_search_num_inp').val('10');
        $('.fnc_income_ticket_list_yes_search_inp').val('搜索采购退换货编号/供应商名称').css('color', '#ccc');
        getIncomeRefundTicketListData.keywords = '';
        getIncomeRefundTicketListFn();
    });

    //未收退票搜索关键字
    $('#fnc_no_income_search_btn').die('click').live('click', function () {
        if ($('.fnc_noincome_ticket_list_no_search_inp').val() == '搜索采购退换货编号/供应商名称') {
            getIncomeRefundTicketListData.keywords = '';
        } else {
            getIncomeRefundTicketListData.keywords = $('.fnc_noincome_ticket_list_no_search_inp').val();
        }
        getNoIncomeRefundTicketListFn();
    });
    //已收退票搜索关键字
    $('#fnc_income_search_btn').die('click').live('click', function () {
        if ($('.fnc_income_ticket_list_yes_search_inp').val() == '搜索采购退换货编号/供应商名称') {
            getIncomeRefundTicketListData.keywords = '';
        } else {
            getIncomeRefundTicketListData.keywords = $('.fnc_income_ticket_list_yes_search_inp').val();
        }
        getIncomeRefundTicketListFn();
    });

    //刷新
    $('#fn_income_refresh').die('click').live('click', function () {
        $('.fnc_noincome_ticket_list_no_search_inp').val('搜索采购退换货编号/供应商名称').css('color', '#ccc');
        $('.fnc_income_ticket_list_yes_search_inp').val('搜索采购退换货编号/供应商名称').css('color', '#ccc');
        getIncomeRefundTicketListData.keywords = '';
        getNoIncomeRefundTicketListFn();
        getIncomeRefundTicketListFn();
    });

    //定义当前未收退票id
    var curTicketId = null;


    //标记已付
    $('.finance_pay_refund_yfqk_xxtp').die('click').live('click', function () {
        curTicketId = $(this).closest('tr').attr('fncnoincomeid');
        getNoIncomeRefundListFn(curTicketId);
    });
    //标记已付详情函数
    function getNoIncomeRefundListFn(curTicketId) {
        $.ajax({
            url: SERVER_URL + '/income-refund-ticket/info',
            type: 'GET',
            data: {
                token: token,
                id: curTicketId
            },
            dataType:'json',
            success: function (oE) {
               if (oE.code == 0) {
                    var data = oE.datalist;
                    //已付票退款
                    $('.tanceng .fnc_noincome_ticket_ticket_total').html(data['ticket_total']);
                    //票号
                    $('.tanceng .fnc_noincome_ticket_ticket_name').html(data['ticket_name']);
                    //付票单编号
                    $('.tanceng .fnc_noincome_ticket_code_sn').html(data['code_sn']);
                    //供应商名称
                    $('.tanceng .fnc_noincome_ticket_cs_name').html(data['cs_name']);
                    //采购订单编号
                    $('.tanceng .fnc_noincome_ticket_quote_order_code_sn').html(data['quote_order_code_sn']);
                    //采购退换货编号
                    $('.tanceng .fnc_noincome_ticket_quote_code_sn').html(data['quote_code_sn']);
                    //结算账户
                    $('.tanceng .fnc_noincome_ticket_name').html(data['name']);
                    //结算账目
                    $('.tanceng .fnc_noincome_choice_cuenta').html(data['choice_cuenta']);
                    //收票日期
                    $('.tanceng .fnc_noincome_day').html(data['day']);
                }
            }
        })
    }

    //标记已收点击确定按钮操作
    $('.fnc_noincome_look_yes_btn').die('click').live('click', function () {
        $.ajax({
            url: SERVER_URL + '/income-refund-ticket/doflag',
            type: 'GET',
            data: {
                token: token,
                id: curTicketId
            },
            dataType:'json',
            success: function (oE) {
                if (oE.code == 0) {
                    $('.tanceng div').remove();
                    $('.tanceng').css('display', 'none');
                    getNoIncomeRefundTicketListFn();
                }
            }
        });
    });
    //查看
    $(".finance_pay_refund_yfqk_xx").die('click').live('click', function () {
        curTicketId = $(this).closest('tr').attr('fncnoincomeid');
        getNoIncomeRefundListFn(curTicketId);
    });


});
