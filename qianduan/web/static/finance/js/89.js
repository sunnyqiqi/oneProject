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

    function moneyToFixed(money) {
        return money.toFixed(2);
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
    function likGetCodeFn(arg){
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
            },
            error: function(oE){
                alert('获取编号失败，请重试！');
            }
        });
        return needCode;
    }

    var token, page, num, keywords, thetype;
    token = Admin.get_token();
    //token = '2017052516045457073-1-1';
    cmpyid = loginUserInfo['usercompany_id'];
    uid = Admin.get_uid();
    uname = loginUserInfo['username'];

    //定义物流付款列表参数
    var getLogisticsListData = {
        token:token,
        company_id: cmpyid
    };
    getLogisticsListFn();
    //获取物流付款列表函数
    function getLogisticsListFn() {
        $.ajax({
            url: SERVER_URL + '/financial-logistics/logistics-list',
            type: 'POST',
            data: getLogisticsListData,
            success: function (e) {
                // 将返回值转换为json对象
                var oE = eval("(" + e + ")");
                console.log(oE);
                if (oE.code == 0) {
                    //总应付款
                    $('.fnc_logistics_list_need_money').html(oE.need_money);
                    //总实付款
                    $('.fnc_logistics_list_pay_money').html(oE.pay_money);
                    //剩余应付款
                    $('.fnc_logistics_list_no_pay_money').html(parseFloat(oE.need_money - oE.pay_money));
                    //物流付款总数
                    var datalist = oE.data;
                    $('.fnc_logistics_list_num_total').html(datalist.length);
                    if (datalist.length == 0) {
                        $('.fnc_logistics_list_nodata_box').removeClass('none');
                        $('.fnc_logistics_list_table_total').addClass('none');
                    } else {
                        $('.fnc_logistics_list_nodata_box').addClass('none');
                        $('.fnc_logistics_list_table_total').removeClass('none');
                    }
                    var logisticsListHtml = '';
                    $.each(datalist, function (i, v) {
                        logisticsListHtml += '<tr>\
                                                <td>' + l_dbl(i + 1) + '</td>\
                                                <td>' + v['logistics_company_id'] + '</td>\
                                                <td>' + v['yingfu'] + '</td>\
                                                <td>' + v['shijifu'] + '</td>\
                                                <td>\
                                                <button class="but_mix val_dialog fnc_logistics_detail_btn" name="finance_wlfy_ckxq">付款详情</button>\
                                                </td>\
                                                </tr>'
                    });
                    $('.fnc_logistics_list').html(logisticsListHtml);
                }
            }
        });
    }

    //物流付款 - 未付款详情
    var fncLogisticsDetailNoData = {
        token: token,
        company_id: cmpyid,
        yearmonthday: '',
        logistics_company_id: ''
    };
    //物流付款 - 未付款详情函数
    function getFncLogisticsDetailNoFn() {
        $.ajax({
            url: SERVER_URL + '/financial-logistics/no-pay',
            type: 'POST',
            data: fncLogisticsDetailNoData,
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    //物流总应付款
                    $('.tanceng .fnc_logistics_detail_nopay_list_money_total').html(oE.need_money);
                    var datalist = oE.data;
                    if(datalist.length == 0){
                        $('.tanceng .fnc_logistics_detail_nopay_list_nodata_box').removeClass('none');
                        $('.tanceng .fnc_logistics_detail_nopay_handle').addClass('none');
                        $('.tanceng .fnc_logistics_detail_nopay_table_total').addClass('none');
                    }else{
                        $('.tanceng .fnc_logistics_detail_nopay_list_nodata_box').addClass('none');
                        $('.tanceng .fnc_logistics_detail_nopay_handle').removeClass('none');
                        $('.tanceng .fnc_logistics_detail_nopay_table_total').removeClass('none');
                    }
                    //总条数
                    $('.tanceng .fnc_logistics_detail_nopay_list_num_total').html(datalist.length);
                    console.log(datalist);
                    var logisticsDetailNoPayHtml = '';
                    $.each(datalist, function (i, v) {
                        logisticsDetailNoPayHtml += '<tr logisticsid="' + v['id'] + '">\
                                                        <td><input type="checkbox" name="finance_logistics_inp"></td>\
                                                        <td>' + l_dbl(i + 1) + '</td>\
                                                        <td class="finance_pay_rent_list f_color">' + v['number'] + '</td>\
                                                        <td>' + v['principal'] + '</td>\
                                                        <td>' + v['create_time'] + '</td>\
                                                        <td>' + v['money'] + '</td>\
                                                        <td>\
                                                        <button class="but_mix r_sidebar_btn val_dialogTop finance_wlfy_ck fnc_logistics_detail_pay_btn" name="finance_logistics_pay">付款</button>\
                                                        </td>\
                                                      </tr>';
                    });
                    $('.tanceng .fnc_logistics_detail_nopay_list').html(logisticsDetailNoPayHtml);
                }
            }
        });
    }

    $('.fnc_logistics_detail_btn').die('click').live('click', function () {
        var logisticsName = $(this).closest('tr').find('td').eq(1).html();
        fncLogisticsDetailNoData.logistics_company_id = logisticsName;
        $('.tanceng .fnc_logistics_detail_name').html(logisticsName);
        getFncLogisticsDetailNoFn();
    });
    //定义当前操作物流id
    var curLogisticsId = null;
    //单个付款参数
    var fncLogisticsPayData = {
        token: token,
        number: '', // 物流单编号
        zhanghu: '', // 结算账户id
        accounts_name: '', // 账目id
        zhifu: '', // 支付方式
        need_pay_money: '', // 应付款项
        this_pay_money: '', // 本次付款
        daxie: '', // 大写
        description: '', // 备注
        cc: '', // 抄送人id
        payment_name: '', // 付款人
        logistics_payment_no: '', // 物流付款单编号
        company_id: '', // 公司id
        id: '', // 主表id
        logistics_company: '' // 物流公司
    };
    //单个付款
    $('.tanceng .fnc_logistics_detail_pay_btn').die('click').live('click', function () {
        fncLogisticsPayData = {
            token: token,
            number: '', // 物流单编号
            zhanghu: '', // 结算账户id
            accounts_name: '', // 账目id
            zhifu: '', // 支付方式
            need_pay_money: '', // 应付款项
            this_pay_money: '', // 本次付款
            daxie: '', // 大写
            description: '', // 备注
            cc: '', // 抄送人id
            payment_name: '', // 付款人
            logistics_payment_no: '', // 物流付款单编号
            company_id: cmpyid, // 公司id
            id: '', // 主表id
            logistics_company: '' // 物流公司
        };
        curLogisticsId = $(this).closest('tr').attr('logisticsid');
        fncLogisticsPayData.id = curLogisticsId;
        //物流公司名称
        $('.tanceng .fnc_logistics_detail_create_one_pay_name').html($('.tanceng .fnc_logistics_detail_name').html());
        //物流单编号
        $('.tanceng .fnc_logistics_detail_create_one_pay_code_sn').html($(this).closest('tr').find('td').eq(2).html());
        //付款单编号
        $('.tanceng .fnc_logistics_detail_create_one_pay_ticket_code_sn').val(likGetCodeFn('WLFK'));
        //付款人
        $('.tanceng .fnc_logistics_detail_create_one_pay_uname').html(uname);
        //付款时间
        $('.tanceng .fnc_logistics_detail_create_one_pay_time').html(getCurrentDateDay());
        //应付款项
        $('.tanceng .fnc_logistics_detail_create_one_pay_need_pay').html($(this).closest('tr').find('td').eq(5).html());
        //应付款 / 实付款
        fncLogisticsPayData.need_pay_money = $('.tanceng .fnc_logistics_detail_create_one_pay_need_pay').html();
        fncLogisticsPayData.this_pay_money = $('.tanceng .fnc_logistics_detail_create_one_pay_need_pay').html();
        //应付款项大写
        $('.tanceng .fnc_logistics_detail_create_one_pay_need_pay_upper').html(convertCurrency($(this).closest('tr').find('td').eq(5).html()));
        //添加抄送人
        $('.tanceng .fnc_logistics_detail_create_pay_add_copy_list').html('<li userinfoid="' + uid + '"><em class="icon_personBtn icon_personBtn_msg"><i class="icon_personNext"></i></em> <em class="icon_adderBtn"></em> <p class="box_adderName">' + uname + '</p> </li> <li> <em class="icon_personBtn icon_personBtn_add val_dialogTop fnc_logistics_detail_create_pay_choose_copy_btn" name="finance_wlfy_csr"></em> </li>')
    });
    //选择结算账户
    $('.fnc_logistics_detail_create_pay_company_account_btn').die('click').live('click', function () {
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
                    $(".tanceng .fnc_logistics_detail_create_pay_company_account_ul").html(AccountcompanyNameHTML);
                }
            }
        })
    });
    //定义当前账户id
    var curLogCompanyAccountId = null;
    $(".tanceng .fnc_logistics_detail_create_pay_company_account_ul li").die('click').live('click', function () {
        curLogCompanyAccountId = $(this).attr('companyid');
        fncLogisticsPayData.zhanghu = curLogCompanyAccountId;
    });
    //选择账目
    $('.tanceng .fnc_logistics_detail_create_pay_account_btn').die('click').live('click', function () {
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
                $('.tanceng .fnc_logistics_detail_create_pay_account_ul').html(chooseAccountUl);
            }
        });
    });
    $('.tanceng .fnc_logistics_detail_create_pay_account_ul li').die('click').live('click', function () {
        fncLogisticsPayData.accounts_name = $(this).attr('accountid');
    });
    //添加抄送人
    $('.tanceng .fnc_logistics_detail_create_pay_choose_copy_btn').die('click').live('click', function () {
        fncReceiptSkdChooseCopy();
    });
    //选择抄送人
    function fncReceiptSkdChooseCopy() {
        $.ajax({
            type: "get",
            url: SERVER_URL + "/dept/deptlist",
            data: {token: token},
            success: function (e) {
                var oE = eval('(' + e + ')');
                if (oE.code == 0) {
                    var deep = 0;
                    $('.tanceng .fnc_logistics_detail_create_pay_choose_copy_list').html(tree_list_choose_dept_person(oE.rows, deep));
                    // 所有分类图标样式控制
                    if ($('i.fnc_logistics_detail_create_pay_choose_copy_list').children().length == 0) {
                        $('li.left_all span.icon_open').addClass('personOth')
                    }
                    // 下级部门样式控制
                    for (var i = 0, liLeft1 = $('.tanceng .fnc_logistics_detail_create_pay_choose_copy_list li.left_1').length; i < liLeft1; i++) {
                        if ($('.tanceng .fnc_logistics_detail_create_pay_choose_copy_list li.left_1').eq(i).next('ul').length == 0) {
                            $('.tanceng .fnc_logistics_detail_create_pay_choose_copy_list li.left_1').eq(i).find('span.icon_open').addClass('personOth');
                            $('.tanceng .fnc_logistics_detail_create_pay_choose_copy_list li.left_1').eq(i).find('span.personOth').closest('li').addClass('deptChild')
                        }
                    }
                    //选择人员左侧选择
                    $('.tanceng .fnc_logistics_detail_create_pay_choose_copy_list ul .li_person').die('click').live('click', function () {
                        if ($(this).find('em').hasClass('on')) {
                            $('.tanceng .fnc_logistics_detail_create_pay_copy_chosen_list').find('li[userinfoid=' + $(this).attr('userinfoid') + ']').remove();
                            $(this).find('span.list_check em').removeClass('on')
                        } else {
                            $('.tanceng .fnc_logistics_detail_create_pay_copy_chosen_list').append('<li userinfoid="' + $(this).attr('userinfoid') + '"><span>' + $(this).children('.list_msg').html() + '</span><i class="list_choose_delete"></i></li>');
                            $(this).find('span.list_check em').addClass('on')
                        }
                    });
                    //选择人员右侧删除
                    $('i.list_choose_delete').die('click').live('click', function () {
                        $(this).closest('li').remove();
                        $('.tanceng .fnc_logistics_detail_create_pay_choose_copy_list ul .li_person[userinfoid = "' + $(this).closest('li').attr('userinfoid') + '"]').find('em').removeClass('on');
                    });
                }
            },
            error: function (data) {

            }
        });
    }
    //选择人员保存
    $('.tanceng .fnc_logistics_detail_create_pay_choose_copy_save').die('click').live('click', function () {
        var copyChosen = '';
        $.each($('.tanceng .fnc_logistics_detail_create_pay_copy_chosen_list li'), function (i, v) {
            copyChosen += '<li userinfoid="' + $('.tanceng .fnc_logistics_detail_create_pay_copy_chosen_list').find('li').eq(i).attr('userinfoid') + '">\
                                <i class="del_img_1">-</i><em class="icon_personBtn icon_personBtn_msg"><i class="icon_personNext"></i></em>\
                                <em class="icon_adderBtn"></em>\
                                <p class="box_adderName">' + $('.tanceng .fnc_logistics_detail_create_pay_copy_chosen_list').find('li').eq(i).text() + '</p>\
                                </li>';
        });
        $('.tanceng .fnc_logistics_detail_create_pay_add_copy_list').html('<li userinfoid="' + uid + '"><em class="icon_personBtn icon_personBtn_msg"><i class="icon_personNext"></i></em> <em class="icon_adderBtn"></em> <p class="box_adderName">' + uname + '</p> </li> <li> <em class="icon_personBtn icon_personBtn_add val_dialogTop fnc_logistics_detail_create_pay_choose_copy_btn" name="finance_wlfy_csr"></em> </li>').prepend(copyChosen);
        $('.tanceng .fnc_receipt_edit_copy_list').html('<li userinfoid="' + uid + '"><em class="icon_personBtn icon_personBtn_msg"><i class="icon_personNext"></i></em> <em class="icon_adderBtn"></em> <p class="box_adderName">' + uname + '</p> </li> <li> <em class="icon_personBtn icon_personBtn_add val_dialogTop fnc_logistics_detail_create_pay_choose_copy_btn" name="finance_wlfy_csr"></em> </li>').prepend(copyChosen);
        $(this).closest('.dialog_box').remove();
    });

    //物流付款 - 新建付款 - 提交
    $('.tanceng .fnc_logistics_detail_create_pay_submit_btn').die('click').live('click', function () {
        //物流公司名称
        fncLogisticsPayData.logistics_company = $('.tanceng .fnc_logistics_detail_create_one_pay_name').html();
        //物流单编号
        fncLogisticsPayData.number = $('.tanceng .fnc_logistics_detail_create_one_pay_code_sn').html();
        //付款单编号
        fncLogisticsPayData.logistics_payment_no = $('.tanceng .fnc_logistics_detail_create_one_pay_ticket_code_sn').val();
        //判断是否填写完整
        //结算账户
        if($('.tanceng .fnc_logistics_detail_create_pay_company_account_btn').val()== '请选择结算账户'){
            alert('请选择结算账户');
            return false;
        }
        //结算账目
        if($('.tanceng .fnc_logistics_detail_create_pay_account_btn').val()== '请选择账目'){
            alert('请选择账目');
            return false;
        }
        //支付方式
        if($('.tanceng .fnc_logistics_detail_create_pay_way').val()== '请选择付款方式'){
            alert('请选择付款方式');
            return false;
        }else{
            fncLogisticsPayData.zhifu = $('.tanceng .fnc_logistics_detail_create_pay_way').val();
        }
        //付款人
        fncLogisticsPayData.payment_name = $('.tanceng .fnc_logistics_detail_create_one_pay_uname').html();
        //实付款 大写
        fncLogisticsPayData.daxie = $('.tanceng .fnc_logistics_detail_create_one_pay_need_pay_upper').html();
        //备注
        fncLogisticsPayData.description = $('.tanceng .fnc_logistics_detail_create_one_pay_note').val();
        //抄送人
        var copyList = '';
        for (var i = 0; i < $('.tanceng .fnc_logistics_detail_create_pay_add_copy_list li').length - 1; i++) {
            copyList += $('.tanceng .fnc_logistics_detail_create_pay_add_copy_list li').eq(i).attr('userinfoid') + ',';
        }
        copyList = copyList.slice(0, copyList.length - 1);
        fncLogisticsPayData.cc = copyList;
        console.log(fncLogisticsPayData);
        var $_this = $(this);
        if(fncLogisticsPayData.id.indexOf(',') == -1){
            var curUrl = '/financial-logistics/one-to-pay'
        }else{
            var curUrl = '/financial-logistics/more-pay'
        }
        $.ajax({
            url: SERVER_URL + curUrl,
            type: "POST",
            data: fncLogisticsPayData,
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                $_this.closest('.dialog_box').remove();
                getFncLogisticsDetailNoFn();
            },
            error: function (data) {

            }
        });
    });
    //批量付款
    $('.tanceng .fnc_logistics_detail_more_pay_btn').die('click').live('click', function () {
        fncLogisticsPayData = {
            token: token,
            number: '', // 物流单编号
            zhanghu: '', // 结算账户id
            accounts_name: '', // 账目id
            zhifu: '', // 支付方式
            need_pay_money: '', // 应付款项
            this_pay_money: '', // 本次付款
            daxie: '', // 大写
            description: '', // 备注
            cc: '', // 抄送人id
            payment_name: '', // 付款人
            logistics_payment_no: '', // 物流付款单编号
            company_id: cmpyid, // 公司id
            id: '', // 主表id
            logistics_company: '' // 物流公司
        };
        //物流公司名称
        $('.tanceng .fnc_logistics_detail_create_one_pay_name').html($('.tanceng .fnc_logistics_detail_name').html());
        fncLogisticsPayData.logistics_company = $('.tanceng .fnc_logistics_detail_create_one_pay_name').html();
        var logisticsMorePayCodeSn = '';
        var logisticsMorePayId = '';
        var logisticsNeedPayMoney = '';
        var logisticsNeedPayTotal = 0;
        $.each($('.tanceng .fnc_logistics_detail_nopay_list tr'), function (i, v) {
            if ($('.tanceng .fnc_logistics_detail_nopay_list tr').eq(i).find('input:checkbox').attr('checked') == 'checked') {
                logisticsMorePayCodeSn += $('.tanceng .fnc_logistics_detail_nopay_list tr').eq(i).find('td').eq(2).html() + ',';
                logisticsMorePayId += $('.tanceng .fnc_logistics_detail_nopay_list tr').eq(i).attr('logisticsid') + ',';
                logisticsNeedPayMoney += $('.tanceng .fnc_logistics_detail_nopay_list tr').eq(i).find('td').eq(5).html() + ',';
                logisticsNeedPayTotal += parseFloat($('.tanceng .fnc_logistics_detail_nopay_list tr').eq(i).find('td').eq(5).html());
            }
        });
        logisticsMorePayCodeSn = logisticsMorePayCodeSn.slice(0, logisticsMorePayCodeSn.length - 1);
        fncLogisticsPayData.number = logisticsMorePayCodeSn;
        logisticsMorePayId = logisticsMorePayId.slice(0, logisticsMorePayId.length - 1);
        fncLogisticsPayData.id = logisticsMorePayId;
        //应付款 / 实付款
        fncLogisticsPayData.need_pay_money = logisticsNeedPayMoney;
        fncLogisticsPayData.this_pay_money = logisticsNeedPayMoney;
        //应付款项
        $('.tanceng .fnc_logistics_detail_create_one_pay_need_pay').html(moneyToFixed(logisticsNeedPayTotal));
        //物流单编号
        $('.tanceng .fnc_logistics_detail_create_one_pay_code_sn').html(logisticsMorePayCodeSn);
        //付款单编号
        $('.tanceng .fnc_logistics_detail_create_one_pay_ticket_code_sn').val(likGetCodeFn('WLFK'));
        //付款人
        $('.tanceng .fnc_logistics_detail_create_one_pay_uname').html(uname);
        //付款时间
        $('.tanceng .fnc_logistics_detail_create_one_pay_time').html(getCurrentDateDay());
        //应付款项大写
        $('.tanceng .fnc_logistics_detail_create_one_pay_need_pay_upper').html(convertCurrency(logisticsNeedPayTotal));
        //添加抄送人
        $('.tanceng .fnc_logistics_detail_create_pay_add_copy_list').html('<li userinfoid="' + uid + '"><em class="icon_personBtn icon_personBtn_msg"><i class="icon_personNext"></i></em> <em class="icon_adderBtn"></em> <p class="box_adderName">' + uname + '</p> </li> <li> <em class="icon_personBtn icon_personBtn_add val_dialogTop fnc_logistics_detail_create_pay_choose_copy_btn" name="finance_wlfy_csr"></em> </li>')
    });
    //已付款选择查看项
    var fncLogisticsYesListLookAbledField = [
        {'index': null, 'field': '结算账户'},
        {'index': null, 'field': '结算账目'},
        {'index': null, 'field': '支付方式'},
        {'index': null, 'field': '备注'}
    ];
    //已付款列表
    var fncLogisticsDetailYesData = {
        token: token,
        company_id: cmpyid,
        yearmonthday: '',
        logistics_company: ''
    };
    $('.tanceng .fnc_logistics_pay_nav_ul li:nth-of-type(2)').die('click').live('click', function () {
        fncLogisticsDetailYesData.logistics_company = $('.tanceng .fnc_logistics_detail_name').html();
        getFncLogisticsDetailYesFn();
        likShow('.tanceng .fnc_logistics_yes_table', fncLogisticsYesListLookAbledField, '.tanceng .fnc_logistics_yes_look_field_ul', '.tanceng .fnc_logistics_yes_look_save', '.tanceng .fnc_logistics_yes_look_reset');
    });
    //物流付款 - 已付款详情函数
    function getFncLogisticsDetailYesFn() {
        $.ajax({
            url: SERVER_URL + '/financial-logistics/have-pay',
            type: 'POST',
            data: fncLogisticsDetailYesData,
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                var datalist = oE.data;
                //搜索总数
                $('.tanceng .fnc_logistics_yes_pay_list_num_total').html(datalist.length);
                //已付款总额
                $('.tanceng .fnc_logistics_yes_pay_list_pay_total').html(oE.pay_money);
                console.log(datalist);
                if(datalist.length == 0){
                    $('.tanceng .fnc_logistics_detail_yespay_list_nodata_box').removeClass('none');
                    $('.tanceng .fnc_logistics_detail_yespay_table_total').addClass('none');
                }else{
                    $('.tanceng .fnc_logistics_detail_yespay_list_nodata_box').addClass('none');
                    $('.tanceng .fnc_logistics_detail_yespay_table_total').removeClass('none');
                }
                var fncLogisticsYesPayList = '';
                $.each(datalist, function (i, v) {
                    fncLogisticsYesPayList += '<tr logisticsid="'+v['id']+'">\
                                                <td>'+l_dbl(i+1)+'</td>\
                                                <td>'+v['logistics_payment_no']+'</td>\
                                                <td class="finance_pay_rent_list f_color">'+v['number']+'</td>\
                                                <td>'+v['payment_name']+'</td>\
                                                <td>'+v['payment_date']+'</td>\
                                                <td>'+v['need_pay_money']+'</td>\
                                                <td>'+v['this_pay_money']+'</td>\
                                                <td>'+v['zhanghu_name']+'</td>\
                                                <td>'+v['zhangmu_name']+'</td>\
                                                <td>'+v['zhifu']+'<span class="c_y '+(v['more_post'] == 0 ? 'none' : '')+'">【批付】</span></td>\
                                                <td>'+v['description']+'</td>\
                                                <td>\
                                                <button class="but_mix r_sidebar_btn val_dialogTop finance_wlfy_ck fnc_wlfk_detail_btn" name="finance_logistics_pay_detail">付款详情</button>\
                                                </td>\
                                                </tr>'
                });
                $('.tanceng .fnc_logistics_yes_pay_list').html(fncLogisticsYesPayList);
                $('.tanceng .fnc_logistics_yes_look_save').trigger('click');
            }
        });
    }

    //查看物流付款单详情
    $('.tanceng .fnc_wlfk_detail_btn').die('click').live('click', function(){
        var curWlfkId = $(this).closest('tr').attr('logisticsid');
        console.log(curWlfkId);
        $.ajax({
            url: SERVER_URL + '/financial-logistics/one-pay',
            type: 'POST',
            data: {
                token: token,
                id: curWlfkId
            },
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                var data = oE.data;
                //付款单编号
                $('.tanceng .fnc_logistics_pay_detail_logistics_payment_no').html(data['logistics_payment_no']);
                //物流公司名称
                $('.tanceng .fnc_logistics_pay_detail_logistics_company').html(data['logistics_company']);
                //物流单编号
                $('.tanceng .fnc_logistics_pay_detail_number').html(data['number']);
                //结算账户
                $('.tanceng .fnc_logistics_pay_detail_zhanghu').html(data['zhanghu']);
                //结算账目
                $('.tanceng .fnc_logistics_pay_detail_accounts_name').html(data['zhangmu']);
                //付款方式
                $('.tanceng .fnc_logistics_pay_detail_zhifu').html(data['zhifu']);
                //付款人
                $('.tanceng .fnc_logistics_pay_detail_payment_name').html(data['payment_name']);
                //付款日期
                $('.tanceng .fnc_logistics_pay_detail_payment_date').html(data['payment_date']);
                //应付款项
                $('.tanceng .fnc_logistics_pay_detail_need_pay_money').html(data['need_pay_money']);
                //实付款
                $('.tanceng .fnc_logistics_pay_detail_this_pay_money').html(data['this_pay_money']);
                //是否为批付
                if(data['more_post'] == 0){
                    $('.tanceng .fnc_logistics_pay_detail_more_post').addClass('none');
                }else{
                    $('.tanceng .fnc_logistics_pay_detail_more_post').removeClass('none');
                }
                //实付款大写
                $('.tanceng .fnc_logistics_pay_detail_daxie').html(convertCurrency(data['this_pay_money']));
                //备注
                $('.tanceng .fnc_logistics_pay_detail_description').html(data['description']);
            }
        });
    })
});
