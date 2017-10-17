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
    var fncLogInvDetailListLookAbledField = [
        {'index': null, 'field': '结算账户'},
        {'index': null, 'field': '结算账目'},
        {'index': null, 'field': '备注'}
    ];

    //定义物流收票列表参数
    var getLogisticsInvoiceListData = {
        token:token,
        company_id: cmpyid,
        logistics_company: '',
        yearmonthday: ''
    };
    getLogisticsInvoiceListFn();
    //获取物流收票列表函数
    function getLogisticsInvoiceListFn(){
        $.ajax({
            url: SERVER_URL + '/financial-logistics/invoice',
            type: 'POST',
            data: getLogisticsInvoiceListData,
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                if(oE.code == 0){
                    //应收发票总和
                    $('.fnc_logistics_invoice_list_total').html(oE.need_all_money);
                    var datalist = oE.data;
                    if (datalist.length == 0) {
                        $('.fnc_logistics_invoice_list_nodata_box').removeClass('none');
                        $('.fnc_logistics_invoice_list_no_handle').addClass('none');
                        $('.fnc_logistics_invoice_list_table_total').addClass('none');
                    } else {
                        $('.fnc_logistics_invoice_list_nodata_box').addClass('none');
                        $('.fnc_logistics_invoice_list_no_handle').removeClass('none');
                        $('.fnc_logistics_invoice_list_table_total').removeClass('none');
                    }
                    //搜索条数
                    $('.fnc_logistics_invoice_list_num_total').html(datalist.length);
                    var logisticsInvoiceListHtml = '';
                    $.each(datalist, function (i, v) {
                        logisticsInvoiceListHtml += '<tr>\
                                                        <td>'+l_dbl(i+1)+'</td>\
                                                        <td>'+v['logistics_company_id']+'</td>\
                                                        <td>'+v['yingfu']+'</td>\
                                                        <td>\
                                                        <button class="but_mix val_dialog fnc_log_inv_detail_btn" name="finance_wlfp_ckxq">付款详情</button>\
                                                        </td>\
                                                     </tr>'
                    });
                    $('.fnc_logistics_invoice_list_tbody').html(logisticsInvoiceListHtml);
                }
            }
        });
    }
    //搜索关键字
    $('.fnc_log_inv_search_btn').die('click').live('click', function () {
        if ($('.fnc_log_inv_search_inp').val() == '搜索物流公司') {
            getLogisticsInvoiceListData.logistics_company = '';
        } else {
            getLogisticsInvoiceListData.logistics_company = $('.fnc_log_inv_search_inp').val();
        }
        getLogisticsInvoiceListFn();
    });
    //收款详情列表参数
    var fncLogInvDetailListData = {
        token: token,
        company_id: '',
        logistics_company: '',
        yearmonthday: ''
    };
    //查看付款详情
    $('.fnc_log_inv_detail_btn').die('click').live('click', function () {
        var curLogInvTr = $(this).closest('tr');
        var curLogInvId = curLogInvTr.find('td').eq(1).html();
        $('.tanceng .fnc_log_inv_detail_name').html(curLogInvId);
        $('.tanceng .fnc_log_inv_detail_money').html(curLogInvTr.find('td').eq(2).html());
        fncLogInvDetailListData.company_id = cmpyid;
        fncLogInvDetailListData.logistics_company = curLogInvId;
        fncLogInvDetailListFn();
        likShow('.tanceng .fnc_log_inv_detail_list_table', fncLogInvDetailListLookAbledField, '.tanceng .fnc_log_inv_detail_list_look_field_ul', '.tanceng .fnc_log_inv_detail_list_look_save', '.tanceng .fnc_log_inv_detail_list_look_reset');
    });
    //收款详情列表函数
    function fncLogInvDetailListFn(){
        $.ajax({
            url: SERVER_URL + '/financial-logistics/invoice-list',
            type: 'POST',
            data: fncLogInvDetailListData,
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                if(oE.code == 0){
                    var datalist = oE.data;
                    if(datalist.length == 0){
                        $('.tanceng .fnc_log_inv_detail_nopay_list_nodata_box').removeClass('none');
                        $('.tanceng .fnc_log_inv_detail_nopay_list_table_total').addClass('none');
                    }else{
                        $('.tanceng .fnc_log_inv_detail_nopay_list_nodata_box').addClass('none');
                        $('.tanceng .fnc_log_inv_detail_nopay_list_table_total').removeClass('none');
                    }
                    //总数
                    $('.tanceng .fnc_log_inv_detail_list_num_total').html(datalist.length);
                    //总额
                    $('.tanceng .fnc_log_inv_detail_list_money_total').html(oE.all_money);
                    var fncLogInvDetailListHtml = '';
                    $.each(datalist, function (i, v) {
                        fncLogInvDetailListHtml += '<tr loginvid="'+v['id']+'">\
                                                    <td>'+l_dbl(i+1)+'</td>\
                                                    <td>'+v['get_ticket_number']+'</td>\
                                                    <td>'+v['ticket_date']+'</td>\
                                                    <td>'+v['ticket_name']+'</td>\
                                                    <td>'+v['ticket_number']+'</td>\
                                                    <td>'+v['money']+'</td>\
                                                    <td>'+v['zhanghu_name']+'</td>\
                                                    <td>'+v['zhangmu_name']+'</td>\
                                                    <td>'+v['description']+'</td>\
                                                    <td>\
                                                    <button class="but_mix r_sidebar_btn val_dialogTop finance_wlfy_ck fnc_log_inv_detail_ckskd_btn" name="finance_pay_refund_look_gather">查看收票单</button>\
                                                    </td>\
                                                    </tr>'
                    });
                    $('.tanceng .fnc_log_inv_detail_list_tbody').html(fncLogInvDetailListHtml);
                }
            }
        });
    }
    //定义新建收票单参数
    var fncLogInvDetailCreateData = {
        token: token,
        company_id: '', // 公司id
        get_ticket_number: '', // 收票单编号
        ticket_number: '', // 票号
        logistics_company: '', // 物流公司
        zhanghu: '', // 账户ID
        zhangmu: '', // 账目ID
        ticket_name: '', // 收票人
        money: '', // 发票金额
        need_money: '',
        cc: '', // 抄送人
        description: '' // 备注
    };
    //新建收票单
    $('.tanceng .fnc_log_inv_detail_create_ticket_btn').die('click').live('click', function () {
        fncLogInvDetailCreateData = {
            token: token,
            company_id: cmpyid, // 公司id
            get_ticket_number: '', // 收票单编号
            ticket_number: '', // 票号
            logistics_company: '', // 物流公司
            zhanghu: '', // 账户ID
            zhangmu: '', // 账目ID
            ticket_name: '', // 收票人
            money: '', // 发票金额
            need_money: '',
            cc: '', // 抄送人
            description: '' // 备注
        };
        //物流公司名称
        $('.tanceng .fnc_log_inv_detail_create_ticket_name').html($('.tanceng .fnc_log_inv_detail_name').html());
        //收款单编号
        $('.tanceng .fnc_log_inv_detail_create_ticket_get_ticket_number').val(likGetCodeFn('WLDP'));
        //收票人
        $('.tanceng .fnc_log_inv_detail_create_ticket_ticket_name').html(uname);
        //收票时间
        $('.tanceng .fnc_log_inv_detail_create_ticket_ticket_date').html(getCurrentDateDay());
        //应收票款
        $('.tanceng .fnc_log_inv_detail_create_ticket_money').html($('.tanceng .fnc_log_inv_detail_money').html());
    });
    //选择结算账户
    $('.fnc_log_inv_detail_create_ticket_company_account_btn').die('click').live('click', function () {
        $.ajax({
            url: SERVER_URL + '/company/list',
            type: 'GET',
            data: {
                token: token
            },
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                if (oE.code == 0) {
                    var datalist = oE.data.dataList;
                    var AccountcompanyNameHTML = '';
                    $.each(datalist, function (i, v) {
                        AccountcompanyNameHTML += '<li companyid="' + v['id'] + '">' + v['name'] + '</li>'
                    });
                    $(".tanceng .fnc_log_inv_detail_create_ticket_company_account_ul").html(AccountcompanyNameHTML);
                }
            }
        })
    });
    //定义当前账户id
    var curLogCompanyAccountId = null;
    $(".tanceng .fnc_log_inv_detail_create_ticket_company_account_ul li").die('click').live('click', function () {
        curLogCompanyAccountId = $(this).attr('companyid');
        fncLogInvDetailCreateData.zhanghu = curLogCompanyAccountId;
    });
    //选择账目
    $('.tanceng .fnc_log_inv_detail_create_ticket_account_btn').die('click').live('click', function () {
        $.ajax({
            url: SERVER_URL + '/accounts/list',
            type: 'GET',
            data: {
                token: token,
                company_account_id: curLogCompanyAccountId
            },
            success: function (e) {
                // 将返回值转换为json对象
                var oE = eval("(" + e + ")");
                console.log(oE);
                var datalist = oE.datalist;
                var chooseAccountUl = '';
                $.each(datalist, function (i, v) {
                    chooseAccountUl += '<li accountid="' + v['id'] + '">' + v['name'] + '</li>'
                });
                $('.tanceng .fnc_log_inv_detail_create_ticket_account_ul').html(chooseAccountUl);
            }
        });
    });
    $('.tanceng .fnc_log_inv_detail_create_ticket_account_ul li').die('click').live('click', function () {
        fncLogInvDetailCreateData.zhangmu = $(this).attr('accountid');
    });//添加抄送人
    $('.tanceng .fnc_log_inv_detail_create_ticket_choose_copy_btn').die('click').live('click', function () {
        fncLogInvDetailCreateTicketChooseCopy();
    });
    //选择抄送人
    function fncLogInvDetailCreateTicketChooseCopy() {
        $.ajax({
            type: "get",
            url: SERVER_URL + "/dept/deptlist",
            data: {token: token},
            success: function (e) {
                var oE = eval('(' + e + ')');
                if (oE.code == 0) {
                    var deep = 0;
                    $('.tanceng .fnc_log_inv_detail_create_ticket_choose_copy_list').html(tree_list_choose_dept_person(oE.rows, deep));
                    // 所有分类图标样式控制
                    if ($('i.fnc_log_inv_detail_create_ticket_choose_copy_list').children().length == 0) {
                        $('li.left_all span.icon_open').addClass('personOth')
                    }
                    // 下级部门样式控制
                    for (var i = 0, liLeft1 = $('.tanceng .fnc_log_inv_detail_create_ticket_choose_copy_list li.left_1').length; i < liLeft1; i++) {
                        if ($('.tanceng .fnc_log_inv_detail_create_ticket_choose_copy_list li.left_1').eq(i).next('ul').length == 0) {
                            $('.tanceng .fnc_log_inv_detail_create_ticket_choose_copy_list li.left_1').eq(i).find('span.icon_open').addClass('personOth');
                            $('.tanceng .fnc_log_inv_detail_create_ticket_choose_copy_list li.left_1').eq(i).find('span.personOth').closest('li').addClass('deptChild')
                        }
                    }
                    //选择人员左侧选择
                    $('.tanceng .fnc_log_inv_detail_create_ticket_choose_copy_list ul .li_person').die('click').live('click', function () {
                        if ($(this).find('em').hasClass('on')) {
                            $('.tanceng .fnc_log_inv_detail_create_ticket_copy_chosen_list').find('li[userinfoid=' + $(this).attr('userinfoid') + ']').remove();
                            $(this).find('span.list_check em').removeClass('on')
                        } else {
                            $('.tanceng .fnc_log_inv_detail_create_ticket_copy_chosen_list').append('<li userinfoid="' + $(this).attr('userinfoid') + '"><span>' + $(this).children('.list_msg').html() + '</span><i class="list_choose_delete"></i></li>');
                            $(this).find('span.list_check em').addClass('on')
                        }
                    });
                    //选择人员右侧删除
                    $('i.list_choose_delete').die('click').live('click', function () {
                        $(this).closest('li').remove();
                        $('.tanceng .fnc_log_inv_detail_create_ticket_choose_copy_list ul .li_person[userinfoid = "' + $(this).closest('li').attr('userinfoid') + '"]').find('em').removeClass('on');
                    });
                }
            },
            error: function (data) {

            }
        });
    }
    //选择人员保存
    $('.tanceng .fnc_log_inv_detail_create_ticket_choose_copy_save').die('click').live('click', function () {
        var copyChosen = '';
        $.each($('.tanceng .fnc_log_inv_detail_create_ticket_copy_chosen_list li'), function (i, v) {
            copyChosen += '<li userinfoid="' + $('.tanceng .fnc_log_inv_detail_create_ticket_copy_chosen_list').find('li').eq(i).attr('userinfoid') + '">\
                                <i class="del_img_1">-</i><em class="icon_personBtn icon_personBtn_msg"><i class="icon_personNext"></i></em>\
                                <em class="icon_adderBtn"></em>\
                                <p class="box_adderName">' + $('.tanceng .fnc_log_inv_detail_create_ticket_copy_chosen_list').find('li').eq(i).text() + '</p>\
                                </li>';
        });
        $('.tanceng .fnc_log_inv_detail_create_ticket_add_copy_list').html('<li> <em class="icon_personBtn icon_personBtn_add val_dialogTop fnc_log_inv_detail_create_ticket_choose_copy_btn" name="finance_wlfp_csr"></em> </li>').prepend(copyChosen);
        $(this).closest('.dialog_box').remove();
    });

    //新建收票 - 提交
    $('.tanceng .fnc_log_inv_detail_create_ticket_submit_btn').die('click').live('click', function () {
        //物流公司名称
        fncLogInvDetailCreateData.logistics_company = $('.tanceng .fnc_log_inv_detail_create_ticket_name').html();
        //收票单编号
        fncLogInvDetailCreateData.get_ticket_number = $('.tanceng .fnc_log_inv_detail_create_ticket_get_ticket_number').val();
        //判断是否填写完整
        //结算账户
        if($('.tanceng .fnc_log_inv_detail_create_ticket_company_account_btn').val()== '请选择结算账户'){
            alert('请选择结算账户');
            return false;
        }
        //结算账目
        if($('.tanceng .fnc_log_inv_detail_create_ticket_account_btn').val()== '请选择账目'){
            alert('请选择账目');
            return false;
        }
        //收票人
        fncLogInvDetailCreateData.ticket_name = $('.tanceng .fnc_log_inv_detail_create_ticket_ticket_name').html();
        //应付款
        fncLogInvDetailCreateData.need_money = $('.tanceng .fnc_log_inv_detail_create_ticket_money').html();
        //发票金额
        if($('.tanceng .fnc_log_inv_detail_create_ticket_this_money').val().length == 0 ||$('.tanceng .fnc_log_inv_detail_create_ticket_this_money').val() == 0 ){
            alert('请输入金额');
            return false;
        }else{
            fncLogInvDetailCreateData.money = $('.tanceng .fnc_log_inv_detail_create_ticket_this_money').val();
        }
        //票号
        if($('.tanceng .fnc_log_inv_detail_create_ticket_number').val().length != 8){
            alert('票号必须为8位数字');
            return false;
        }else{
            fncLogInvDetailCreateData.ticket_number = $('.tanceng .fnc_log_inv_detail_create_ticket_number').val();
        }
        //备注
        if($('.tanceng .fnc_log_inv_detail_create_ticket_note').val()=='备注'){
            fncLogInvDetailCreateData.description = '';
        }else{
            fncLogInvDetailCreateData.description = $('.tanceng .fnc_log_inv_detail_create_ticket_note').val();
        }
        //抄送人
        var copyList = '';
        for (var i = 0; i < $('.tanceng .fnc_log_inv_detail_create_ticket_add_copy_list li').length - 1; i++) {
            copyList += $('.tanceng .fnc_log_inv_detail_create_ticket_add_copy_list li').eq(i).attr('userinfoid') + ',';
        }
        copyList = copyList.slice(0, copyList.length - 1);
        fncLogInvDetailCreateData.cc = copyList;
        console.log(fncLogInvDetailCreateData);
        var $_this = $(this);
        $.ajax({
            url: SERVER_URL + '/financial-logistics/add-invoice',
            type: "POST",
            data: fncLogInvDetailCreateData,
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                $_this.closest('.dialog_box').remove();
                fncLogInvDetailListFn();
            },
            error: function (data) {

            }
        });
    });
    //查看收款单详情
    $('.tanceng .fnc_log_inv_detail_ckskd_btn').die('click').live('click', function () {
        var curInvId = $(this).closest('tr').attr('loginvid');
        $.ajax({
            url: SERVER_URL + '/financial-logistics/invoice-info',
            type: 'POST',
            data: {
                token: token,
                id: curInvId
            },
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                var data = oE.data;
                //收票单编号
                $('.tanceng .fnc_log_inv_detail_ticket_info_get_ticket_number').html(data['get_ticket_number']);
                //物流公司名称
                $('.tanceng .fnc_log_inv_detail_ticket_info_logistics_company').html(data['logistics_company']);
                //结算账户
                $('.tanceng .fnc_log_inv_detail_ticket_info_zhanghu_name').html(data['zhanghu_name']);
                //结算账目
                $('.tanceng .fnc_log_inv_detail_ticket_info_zhangmu_name').html(data['zhangmu_name']);
                //收票人
                $('.tanceng .fnc_log_inv_detail_ticket_info_ticket_name').html(data['ticket_name']);
                //收票日期
                $('.tanceng .fnc_log_inv_detail_ticket_info_ticket_date').html(data['ticket_date']);
                //应收票款
                $('.tanceng .fnc_log_inv_detail_ticket_info_need_money').html(data['need_pay_money']);
                //实收票款
                $('.tanceng .fnc_log_inv_detail_ticket_info_money').html(data['money']);
                //票号
                $('.tanceng .fnc_log_inv_detail_ticket_info_ticket_number').html(data['ticket_number']);
                //备注
                $('.tanceng .fnc_log_inv_detail_ticket_info_description').html(data['description']);
            },
            error: function(e){
                console.log(e);
            }
        });
    });
});
