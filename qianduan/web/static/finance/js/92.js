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
    // 定义选择查看项
    var fncSalaryListLookAbledField = [
        {'index': null, 'field': '发薪状态'},
        {'index': null, 'field': '结算账户'},
        {'index': null, 'field': '结算账目'},
        {'index': null, 'field': '发薪日期'},
        {'index': null, 'field': '发薪人'}
    ];
    likShow('#fnc_salary_table', fncSalaryListLookAbledField, '#fnc_salary_look_field_ul', '#fnc_salary_look_save', '#fnc_salary_look_reset');

    //获取我的工资列表
    var getMySalaryListData = {
        token: token,
        company_id: cmpyid,
        uid: uid,
        page: 1,
        limit: 10,
        yearmonth: ''
    };
    getMySalaryListFn();
    //获取我的薪资列表
    function getMySalaryListFn() {
        $.ajax({
            url: SERVER_URL + '/financial-salary/my-salary-list',
            type: 'POST',
            data: getMySalaryListData,
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                //总条数
                $('.fnc_my_salary_list_num_total').html(oE.number);
                //工资总额合计
                $('.fnc_my_salary_list_total').html(oE.total);
                //补发补扣合计
                $('.fnc_my_salary_list_bufa').html(oE.bufa);
                var datalist = oE.data;
                console.log(datalist);
                if (datalist.length == 0) {
                    $('.fnc_my_salary_nodata_box').removeClass('none');
                    $('.fnc_salary_list_handle').addClass('none');
                    $('.table_total').addClass('none');
                } else {
                    $('.fnc_my_salary_nodata_box').addClass('none');
                    $('.fnc_salary_list_handle').removeClass('none');
                    $('.table_total').removeClass('none');
                }
                var salaryTotalHtml = '';
                $.each(datalist, function (i, v) {
                    //核算状态
                    var checkStatusName = '';
                    var checkStatusClass = '';
                    if (v['hesuan_status'] == 4) {
                        checkStatusClass = 'c_g';
                        checkStatusName = '已确定核算';
                    } else {
                        checkStatusClass = '';
                        checkStatusName = '-';
                    }
                    //发薪状态
                    var sendStatusName = '';
                    var sendStatusClass = '';
                    if (v['send_status'] == 0) {
                        sendStatusName = '未发放';
                        sendStatusClass = 'c_r';
                    } else if (v['send_status'] == 1) {
                        sendStatusName = '已发放';
                        sendStatusClass = 'c_g';
                    }
                    salaryTotalHtml += '<tr yearmonth="' + v['yearmonth'] + '" salaryid="' + v['salary_id'] + '">\
                                        <td>' + l_dbl(i + 1) + '</td>\
                                        <td>' + v['yearmonth'] + '</td>\
                                        <td>' + v['job_number'] + '</td>\
                                        <td>' + v['name'] + '</td>\
                                        <td>' + v['salary_type'] + '</td>\
                                        <td>' + v['department'] + '</td>\
                                        <td>' + v['salary_total'] + '</td>\
                                        <td class="' + checkStatusClass + '">' + checkStatusName + '</td>\
                                        <td class="' + sendStatusClass + '">' + sendStatusName + '</td>\
                                        <td>' + v['bufa'] + '</td>\
                                        <td>' + v['hesuan_time'] + '</td>\
                                        <td>\
                                        <button class="but_mix val_dialog fnc_salary_look_detail_btn" name="finance_salary_look">查看</button>\
                                        </td>\
                                        </tr>';
                });
                $('.fnc_my_salary_total_list').html(salaryTotalHtml);
                //分页
                list_table_render_pagination('.fnc_salary_list_page', getMySalaryListData, getMySalaryListFn, oE.number, datalist.length);
                list_table_render_pagination('.fnc_salary_list_page_2', getMySalaryListData, getMySalaryListFn, oE.number, datalist.length);
            }
        });
    }

    //搜索日期
    $('.fnc_my_salary_choose_month_ul li').die('click').live('click', function () {
        getMySalaryListData.yearmonth = $('.fnc_my_salary_search_month_inp').val();
        getMySalaryListFn();
    });
    var oDate = new Date();
    var curYear = oDate.getFullYear();
    var curMonth = oDate.getMonth() + 1;

    //查看我的薪资详情
    var curSalaryId = null;
    $('.fnc_salary_look_detail_btn').die('click').live('click', function () {
        curSalaryId = $(this).closest('tr').attr('salaryid');
        getMySalaryListData.yearmonth = $(this).closest('tr').attr('yearmonth');
        getMySalaryListDetailFn();
    });
    //确定核算
    $('.tanceng .fnc_my_salary_detail_qdhs_btn').die('click').live('click', function () {
        $.ajax({
            url: SERVER_URL + '/financial-salary/make-sure',
            type: 'POST',
            data: {
                token: token,
                salary_id: curSalaryId,
                uid: uid
            },
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                if (oE.code == 0) {
                    $('.tanceng').css('display', 'none').children('.dialog_box').remove();
                    getMySalaryListData.yearmonth = '';
                    getMySalaryListFn();
                }
            }
        });
    });
    //刷新
    $('.fnc_my_salary_refresh_btn').die('click').live('click', function () {
        if ($('#fnc_salary_nav_ul li:nth-of-type(1)').hasClass('tabhover')) {
            getMySalaryListData = {
                token: token,
                company_id: cmpyid,
                uid: uid,
                page: 1,
                limit: 10,
                yearmonth: ''
            };
            $('.fnc_my_salary_search_month_inp').val(curYear + '-' + l_dbl(curMonth));
            $('.fnc_my_salary_search_num_inp').val('10');
            getMySalaryListFn();
        } else {
            getSalaryListData = {
                token: token,
                company_id: cmpyid,
                page: 1,
                limit: 10,
                yearmonth: ''
            };
            $('.fnc_salary_total_search_month_inp').val(curYear + '-' + l_dbl(curMonth));
            $('.fnc_my_salary_search_num_inp').val('10');
            getFncSalaryListFn();
        }

    });
    //申诉补发
    $('.tanceng .fnc_my_salary_detail_ssbf_btn').die('click').live('click', function () {
        var fncMySalarySsData = {
            token: token,
            salary_id: curSalaryId,
            uid: uid,
            do_uid: 15,
            content: ''
        };
        if ($('.tanceng .fnc_my_salary_detail_ssly_textarea').val() == '请输入申诉理由') {
            fncMySalarySsData.content = '';
        } else {
            fncMySalarySsData.content = $('.tanceng .fnc_my_salary_detail_ssly_textarea').val();
        }
        $.ajax({
            url: SERVER_URL + '/financial-salary/add-appeal',
            type: 'POST',
            data: fncMySalarySsData,
            dataType: 'json',
            success: function (oE) {
                alert(oE.msg);
                $('.tanceng').html('').css('display', 'none');
            }
        });
    });

    //获取我的薪资列表
    function getMySalaryListDetailFn() {
        $.ajax({
            url: SERVER_URL + '/financial-salary/my-salary-list',
            type: 'POST',
            data: getMySalaryListData,
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var data = oE.data[0];
                    console.log(data);
                    //核算时间
                    $('.tanceng .fnc_my_salary_detail_hesuan_time').html(data['hesuan_time']);
                    $('.tanceng .fnc_my_salary_detail_year_month').html(data['yearmonth']);
                    var salaryDetail = '<tr>\
                                        <td>' + data['yearmonth'].split('-')[1] + '月</td>\
                                        <td>' + data['name'] + '</td>\
                                        <td>' + data['salary_type'] + '</td>\
                                        <td>' + data['basic_salary'] + '</td>\
                                        <td>' + data['work_day'] + '</td>\
                                        <td>' + data['really_basic_salary'] + '</td>\
                                        <td>' + data['really_performance_salary'] + '</td>\
                                        <td>' + data['ticheng'] + '</td>\
                                        <td>' + data['reward'] + '</td>\
                                        <td>' + data['salary_type'] + '</td>\
                                        <td>' + data['really_heji'] + '</td>\
                                        <td>' + data['no_sign_day'] + '</td>\
                                        <td>' + data['kouchu_sign_money'] + '</td>\
                                        <td>' + data['kouchu_performance'] + '</td>\
                                        <td>' + data['kouchu_tax'] + '</td>\
                                        <td>' + data['insurance'] + '</td>\
                                        <td>' + data['kouchu_insurance_money'] + '</td>\
                                        <td>' + data['kouchu_all'] + '</td>\
                                        <td>' + data['bufa'] + '</td>\
                                        <td>' + data['kouchu'] + '</td>\
                                        <td>' + data['tomoney_all'] + '</td>\
                                        <td>' + data['hesuan_man'] + '</td>\
                                        </tr>';
                    $('.tanceng .fnc_my_salary_detail_list').html(salaryDetail)
                }
            }
        });
    }

    $('#fnc_salary_nav_ul li:nth-of-type(1)').die('click').live('click', function () {
        $('.fnc_my_salary_wdgz_box').addClass('none');
        $('.fnc_my_salary_fxjl_box').removeClass('none');
        getFncSalaryListFn();
    });
    //获取发薪记录列表
    var getSalaryListData = {
        token: token,
        company_id: cmpyid,
        page: 1,
        limit: 10,
        yearmonth: ''
    };
    //发薪记录
    $('#fnc_salary_nav_ul li:nth-of-type(2)').die('click').live('click', function () {
        $('.fnc_my_salary_wdgz_box').removeClass('none');
        $('.fnc_my_salary_fxjl_box').addClass('none');
        getSalaryListData = {
            token: token,
            company_id: cmpyid,
            page: 1,
            limit: 10,
            yearmonth: ''
        };
        getFncSalaryListFn();
    });
    //获取发薪记录函数
    function getFncSalaryListFn() {
        $.ajax({
            url: SERVER_URL + '/financial-salary/salary-total',
            type: 'POST',
            data: getSalaryListData,
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                //工资总额
                $('.fnc_salary_total_list_total').html(oE.total);
                //已发工资总额
                $('.fnc_salary_total_list_sendtotal').html(oE.sendtotal);
                //总条数
                $('.fnc_salary_num_total').html(oE.number);
                var datalist = oE.data;
                if (datalist.length == 0) {
                    $('.fnc_salary_total_nodata_box').removeClass('none');
                    $('.fnc_salary_list_handle').addClass('none');
                    $('.table_total').addClass('none');
                } else {
                    $('.fnc_salary_total_nodata_box').addClass('none');
                    $('.fnc_salary_list_handle').removeClass('none');
                    $('.table_total').removeClass('none');
                }
                console.log(datalist);
                var salaryTotalHtml = '';
                $.each(datalist, function (i, v) {
                    var fxStatusClass = '';
                    if (v['faxin_status'] == "部分支付") {
                        fxStatusClass = 'c_y';
                    } else if (v['faxin_status'] == "全部支付") {
                        fxStatusClass = 'c_g';
                    }
                    salaryTotalHtml += '<tr yearmonth="' + v['yearmonth'] + '">\
                                        <td>' + l_dbl(i + 1) + '</td>\
                                        <td>' + v['yearmonth'] + '</td>\
                                        <td>' + v['allpeople'] + '</td>\
                                        <td>' + v['hesuan_num'] + '</td>\
                                        <td>' + v['allmoney'] + '</td>\
                                        <td>' + v['sendmoney_num'] + '</td>\
                                        <td>' + v['makesendmoney'] + '</td>\
                                        <td class="' + fxStatusClass + '">' + v['faxin_status'] + '</td>\
                                        <td>' + v['jiesuan_zhanghu'] + '</td>\
                                        <td>' + v['jiesuan_zhangmu'] + '</td>\
                                        <td>' + v['send_time'] + '</td>\
                                        <td>' + v['send_people'] + '</td>\
                                        <td>\
                                        <button class="but_mix val_dialog fnc_salary_total_hsgz_btn" name="finance_fxjl_ysqk_ysk">核算工资</button>\
                                        </td>\
                                        </tr>';
                });
                $('.fnc_salary_total_list').html(salaryTotalHtml);
                //分页
                list_table_render_pagination('.fnc_salary_list_page', getSalaryListData, getFncSalaryListFn, oE.number, datalist.length);
                $('#fnc_salary_look_save').trigger('click');
            }
        });
    }

    //搜索日期 - 发薪记录
    $('.fnc_salary_total_choose_month_ul li').die('click').live('click', function () {
        getSalaryListData.yearmonth = $('.fnc_salary_total_search_month_inp').val();
        getFncSalaryListFn();
    });
    //核算工资
    var curSalaryHsgzYearMonth = null;
    //核算工资参数
    var fncSalaryTotalHsgzData = {
        token: token,
        company_id: cmpyid,
        yearmonth: '',
        job_status: 0
    };
    //获取核算工资列表函数
    function getFncSalaryTotalHsgzFn() {
        $.ajax({
            url: SERVER_URL + '/financial-salary/account-salary',
            type: 'POST',
            data: fncSalaryTotalHsgzData,
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                //核算工资时间
                $('.tanceng .fnc_salary_hsgz_month').html(curSalaryHsgzYearMonth);
                if (oE.code == 0) {
                    var datalist = oE.data;
                    var fncSalaryHsgzHtml = '';
                    //核算状态
                    var hesuanStatus = '';
                    var hesuanStatusClass = '';
                    //发薪状态
                    var sendStatus = '';
                    var sendStatusClass = '';
                    $.each(datalist, function (i, v) {
                        //核算状态
                        if (v['hesuan_status'] == 4) {
                            hesuanStatus = '已确定核算';
                            hesuanStatusClass = 'c_g';
                        } else {
                            hesuanStatus = '-';
                            hesuanStatusClass = '';
                        }
                        //发薪状态
                        if (v['send_status'] == 0) {
                            sendStatus = '未发放';
                            sendStatusClass = 'c_r';
                        } else if (v['send_status'] == 1) {
                            sendStatus = '已发放';
                            sendStatusClass = 'c_g';
                        }
                        //标记发薪按钮
                        var bjfxBtn = '';
                        if (v['send_status'] == 0 || v['hesuan_status'] == 4) {
                            bjfxBtn = '<button class="but_mix but_look val_dialogTop fnc_salary_fxjl_bjfx_btn" signnum="simple" name="finance_fxjl_bjfx">标记发薪</button>';
                        }
                        if (v['send_status'] == 1 || v['hesuan_status'] != 4){
                            bjfxBtn = '<button class="but_mix1 but_grey1">标记发薪</button>';
                        }
                        fncSalaryHsgzHtml += '<tr salaryid="' + v['salary_id'] + '" yearmonth="' + v['yearmonth'] + '">\
                                                <td><input type="checkbox" '+((v['send_status'] == 1 || v['hesuan_status'] != 4)? 'disabled' : '')+' name="finance_fxjl_inp"></td>\
                                                <td>' + l_dbl(i + 1) + '</td>\
                                                <td class="fnc_salary_fxjl_year_month">' + v['yearmonth'] + '</td>\
                                                <td>' + v['job_number'] + '</td>\
                                                <td>' + v['name'] + '</td>\
                                                <td>' + v['salary_type'] + '</td>\
                                                <td>' + v['department'] + '</td>\
                                                <td class="fnc_salary_fxjl_total">' + v['salary_total'] + '</td>\
                                                <td class="' + hesuanStatusClass + '">' + hesuanStatus + '</td>\
                                                <td class="' + sendStatusClass + '">' + sendStatus + '</td>\
                                                <td>' + v['bufa'] + '</td>\
                                                <td>' + v['send_people'] + '</td>\
                                                <td>' + v['hesuan_time'] + '</td>\
                                                <td>' + v['payfor_time'] + '</td>\
                                                <td>' + bjfxBtn + '<button class="but_mix but_look val_dialogTop fnc_salary_look_detail_btn" name="finance_fxbj_look_salary">查看工资条</button>\
                                                </td>\
                                                </tr>'
                    });
                    $('.tanceng .fnc_salary_hsgz_html_tbody').html(fncSalaryHsgzHtml);
                }
            }
        });
    }

    // 定义选择查看项
    var fncSalaryHsgzListLookAbledField = [
        {'index': null, 'field': '工号'},
        {'index': null, 'field': '发薪人'},
        {'index': null, 'field': '核算时间'},
        {'index': null, 'field': '发薪日期'}
    ];

    //核算工资列表
    $('.fnc_salary_total_hsgz_btn').die('click').live('click', function () {
        curSalaryHsgzYearMonth = $(this).closest('tr').attr('yearmonth');
        fncSalaryTotalHsgzData.yearmonth = curSalaryHsgzYearMonth;
        getFncSalaryTotalHsgzFn();
        likShow('.tanceng .fnc_salary_fxjl_table', fncSalaryHsgzListLookAbledField, '.tanceng .fnc_salary_fxjl_look_field_ul', '.tanceng .fnc_salary_fxjl_look_save', '.tanceng .fnc_salary_fxjl_look_reset');
    });
    //所有成员核算工资列表
    $('.tanceng .fnc_salary_total_hsgz_nav_ul li:nth-of-type(1)').die('click').live('click', function () {
        fncSalaryTotalHsgzData.job_status = 0;
        getFncSalaryTotalHsgzFn();
    });
    //离职成员核算工资列表
    $('.tanceng .fnc_salary_total_hsgz_nav_ul li:nth-of-type(2)').die('click').live('click', function () {
        fncSalaryTotalHsgzData.job_status = 1;
        getFncSalaryTotalHsgzFn();
    });

    //标记发薪 - 参数
    var fncSalaryFxjlBjfxCreateData = {
        token: token,
        salary_id: '', // 发薪表id
        send_people: '', // 发薪人名字
        payfor_num: '', // 付款单编号
        payfor_name: '', // 付款名称
        zhanghu: '', // 付款账户
        zhangmu: '', // 付款账目
        zhifu: '', // 支付方式
        need_pay_money: '', // 应付款项
        this_pay_money: '', // 本次付款
        daxie: '', // 大写
        note: '', // 备注
        company_id: cmpyid, // 公司id
        yearmonth: ''
    };

    //标记发薪
    $('.tanceng .fnc_salary_fxjl_bjfx_btn').die('click').live('click', function () {
        fncSalaryFxjlBjfxCreateData = {
            token: token,
            salary_id: '', // 发薪表id
            send_people: '', // 发薪人名字
            payfor_num: '', // 付款单编号
            payfor_name: '', // 付款名称
            zhanghu: '', // 付款账户
            zhangmu: '', // 付款账目
            zhifu: '', // 支付方式
            need_pay_money: '', // 应付款项
            this_pay_money: '', // 本次付款
            daxie: '', // 大写
            note: '', // 备注
            company_id: cmpyid, // 公司id
            yearmonth: ''
        };
        //发薪表id
        if($(this).attr('signnum') == 'simple'){
            fncSalaryFxjlBjfxCreateData.salary_id = $(this).closest('tr').attr('salaryid');
            //应付款项
            $('.tanceng .fnc_salary_fxjl_bjfx_total').html($(this).closest('tr').find('.fnc_salary_fxjl_total').html());
            $('.tanceng .fnc_salary_fxjl_bjfx_total_upper').html(convertCurrency($(this).closest('tr').find('.fnc_salary_fxjl_total').html()));
            $('.tanceng .fnc_salary_fxjl_bjfx_submit_btn_list').children().eq(0).removeClass('fnc_salary_fxjl_bjfx_multi_submit_btn').addClass('fnc_salary_fxjl_bjfx_submit_btn');
        }else if($(this).attr('signnum') == 'multi'){
            var salaryIdList = '';
            //应付款项
            var salaryPayforTotal = 0;
            $.each($('.tanceng .fnc_salary_hsgz_html_tbody tr'), function (i, v) {
                if ($('.tanceng .fnc_salary_hsgz_html_tbody tr').eq(i).find('input:checkbox').attr('checked') == 'checked') {
                    salaryIdList += $('.tanceng .fnc_salary_hsgz_html_tbody tr').eq(i).attr('salaryid') + ',';
                    salaryPayforTotal += parseFloat($('.tanceng .fnc_salary_hsgz_html_tbody tr').eq(i).find('.fnc_salary_fxjl_total').html());
                }
            });
            salaryIdList = salaryIdList.slice(0, salaryIdList.length - 1);
            fncSalaryFxjlBjfxCreateData.salary_id = salaryIdList;
            $('.tanceng .fnc_salary_fxjl_bjfx_total').html(salaryPayforTotal);
            $('.tanceng .fnc_salary_fxjl_bjfx_total_upper').html(convertCurrency(salaryPayforTotal));
            $('.tanceng .fnc_salary_fxjl_bjfx_submit_btn_list').children().eq(0).removeClass('fnc_salary_fxjl_bjfx_submit_btn').addClass('fnc_salary_fxjl_bjfx_multi_submit_btn');
        }
        //付款单编号
        $('.tanceng .fnc_salary_fxjl_bjfx_code_sn').html(likGetCodeFn('GZ'));
        fncSalaryFxjlBjfxCreateData.payfor_num = $('.tanceng .fnc_salary_fxjl_bjfx_code_sn').html();
        //付款名称
        $('.tanceng .fnc_salary_fxjl_bjfx_year_month').html($('.tanceng .fnc_salary_hsgz_month').html() + '工资');
        fncSalaryFxjlBjfxCreateData.payfor_name = $('.tanceng .fnc_salary_fxjl_bjfx_year_month').html();
        fncSalaryFxjlBjfxCreateData.need_pay_money = $('.tanceng .fnc_salary_fxjl_bjfx_total').html();
        fncSalaryFxjlBjfxCreateData.this_pay_money = $('.tanceng .fnc_salary_fxjl_bjfx_total').html();
        fncSalaryFxjlBjfxCreateData.daxie = $('.tanceng .fnc_salary_fxjl_bjfx_total_upper').html();
        //发薪设置相关信息
        $.ajax({
            url: SERVER_URL + '/financial-salary/get-salary-set',
            type: 'POST',
            data: {
                token: token,
                company_id: cmpyid
            },
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                if (oE.code == 0) {
                    var data = oE.data;
                    $('.tanceng .fnc_salary_fxjl_bjfx_company_account_name').html(data['zhanghu_name']);
                    fncSalaryFxjlBjfxCreateData.zhanghu = $('.tanceng .fnc_salary_fxjl_bjfx_company_account_name').html();
                    $('.tanceng .fnc_salary_fxjl_bjfx_account_name').html(data['zhangmu_name']);
                    fncSalaryFxjlBjfxCreateData.zhangmu = $('.tanceng .fnc_salary_fxjl_bjfx_account_name').html();
                    if(data['zhifu_type'] == 1){
                        $('.tanceng .fnc_salary_fxjl_bjfx_way').html('现金');
                    }else if(data['zhifu_type'] == 2){
                        $('.tanceng .fnc_salary_fxjl_bjfx_way').html('电汇');
                    }else if(data['zhifu_type'] == 3){
                        $('.tanceng .fnc_salary_fxjl_bjfx_way').html('支票');
                    }
                    fncSalaryFxjlBjfxCreateData.zhifu = $('.tanceng .fnc_salary_fxjl_bjfx_way').html();
                }
            }
        });
        //付款人
        $('.tanceng .fnc_salary_fxjl_bjfx_uname').html(uname);
        fncSalaryFxjlBjfxCreateData.send_people = uname;
        //付款日期
        $('.tanceng .fnc_salary_fxjl_bjfx_create_time').html(getCurrentDateDay());
        //年月
        fncSalaryFxjlBjfxCreateData.yearmonth = $('.tanceng .fnc_salary_hsgz_month').html();
    });

    //标记发薪 - 提交
    $('.tanceng .fnc_salary_fxjl_bjfx_submit_btn').die('click').live('click', function () {
        fncSalaryFxjlBjfxCreateData.note = $('.tanceng .fnc_salary_fxjl_bjfx_note').val();
        $.ajax({
            url: SERVER_URL + '/financial-salary/sign-salary',
            type: 'POST',
            data: fncSalaryFxjlBjfxCreateData,
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                if (oE.code == 0) {
                    getFncSalaryTotalHsgzFn();
                    $('.tanceng').css('display', 'none').children('.dialog_box').remove();
                }
            }
        });
    });

    //批量发薪 - 提交
    $('.tanceng .fnc_salary_fxjl_bjfx_multi_submit_btn').die('click').live('click', function () {
        fncSalaryFxjlBjfxCreateData.note = $('.tanceng .fnc_salary_fxjl_bjfx_note').val();
        $.ajax({
            url: SERVER_URL + '/financial-salary/more-sign-salary',
            type: 'POST',
            data: fncSalaryFxjlBjfxCreateData,
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                if (oE.code == 0) {
                    getFncSalaryTotalHsgzFn();
                    $('.tanceng').css('display', 'none').children('.dialog_box').remove();
                }
            }
        });
    });

    //发薪设置 - 参数
    var fncSalaryFxszData = {
        token: token,
        uid: uid,
        company_id: cmpyid,
        zhanghu: '',
        zhangmu: '',
        zhifu_type: ''
    };

    //发薪设置 - 选择账户
    $('.tanceng .fnc_salary_fxsz_choose_account_company_btn').die('click').live('click', function () {
        $.ajax({
            url: SERVER_URL + '/company/list',
            type: 'GET',
            data: {token: token},
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                if (oE.code == 0) {
                    var datalist = oE.data.dataList;
                    var accountListHtml = '';
                    $.each(datalist, function (i, v) {
                        accountListHtml += '<li accountid="' + v['id'] + '">' + v['name'] + '</li>'
                    });
                    $('.tanceng .fnc_salary_fxsz_choose_account_company_list_ul').html(accountListHtml);
                }
            }
        });
    });
    $('.tanceng .fnc_salary_fxsz_choose_account_company_list_ul li').die('click').live('click', function () {
        fncSalaryFxszData.zhanghu = $(this).attr('accountid');
        $.ajax({
            url: SERVER_URL + '/accounts/list',
            type: 'GET',
            data: {
                token: token,
                company_account_id: fncSalaryFxszData.zhanghu
            },
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                if (oE.code == 0) {
                    var datalist = oE.datalist;
                    var accountListHtml = '';
                    $.each(datalist, function (i, v) {
                        accountListHtml += '<li accountid="' + v['id'] + '">' + v['name'] + '</li>'
                    });
                    $('.tanceng .fnc_salary_fxsz_choose_account_list_ul').html(accountListHtml);
                }
            }
        });
    });
    //发薪设置 - 选择账目
    $('.tanceng .fnc_salary_fxsz_choose_account_list_ul li').die('click').live('click', function () {
        fncSalaryFxszData.zhangmu = $(this).attr('accountid');
    });
    //发薪设置 - 选择支付方式
    $('.tanceng .fnc_salary_fxsz_choose_zhifu_way_ul li').die('click').live('click', function () {
        fncSalaryFxszData.zhifu_type = $(this).index() + 1;
    });
    //发薪设置 - 提交
    $('.tanceng .fnc_salary_fxsz_submit_btn').die('click').live('click', function () {
        //账户必填
        if ($('.tanceng .fnc_salary_fxsz_choose_account_company_btn').val() == '请选择账户') {
            alert('请选择账户');
            return false;
        }
        //账目必填
        if ($('.tanceng .fnc_salary_fxsz_choose_account_btn').val() == '请选择账目') {
            alert('请选择账目');
            return false;
        }
        //账目必填
        if ($('.tanceng .fnc_salary_fxsz_choose_zhifu_way_inp').val() == '请选择支付方式') {
            alert('请选择支付方式');
            return false;
        }
        $.ajax({
            url: SERVER_URL + '/financial-salary/salary-set',
            type: 'POST',
            data: fncSalaryFxszData,
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                if (oE.code == 0) {
                    alert('设置成功');
                    $('.tanceng').css('display', 'none').children('.dialog_box').remove();
                }
            }
        });
    });

    //付款记录
    $('.tanceng .fnc_salary_fxjl_hsgz_fkjl_btn').die('click').live('click', function () {
        $('.tanceng .fnc_salary_hsgz_fkjl_year_month').html(curSalaryHsgzYearMonth);
        $.ajax({
            url: SERVER_URL + '/financial-salary/send-salary-list',
            type: 'POST',
            data: {
                token: token,
                company_id: cmpyid,
                yearmonth: curSalaryHsgzYearMonth
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var datalist = oE.data;
                    console.log(datalist);
                    var salaryTotal = 0;
                    var fkjlHtml = '';
                    $.each(datalist, function (i, v) {
                        salaryTotal += parseFloat(v['this_pay_money']);
                        fkjlHtml += '<tr payforid="' + v['id'] + '">\
                                    <td>' + l_dbl(i + 1) + '</td>\
                                    <td>' + v['payfor_num'] + '</td>\
                                    <td>' + v['payfor_time'] + '</td>\
                                    <td>' + v['send_people'] + '</td>\
                                    <td>' + v['this_pay_money'] + '</td>\
                                    <td>' + v['note'] + '</td>\
                                    <td><button class="but_mix but_look val_dialogTop fnc_salary_fxjl_fkjl_look_btn" name="finance_fxjl_look_salary">查看付款单</button></td>\
                                    </tr>'
                    });
                    $('.tanceng .fnc_salary_fxjl_hsgz_fkjl_tbody').html(fkjlHtml);
                    $('.tanceng .fnc_salary_fxjl_hsgz_fkjl_total').html(salaryTotal);
                }
            }
        });
    });
    //查看付款单
    $('.tanceng .fnc_salary_fxjl_fkjl_look_btn').die('click').live('click', function(){
        var fkdId = $(this).closest('tr').attr('payforid');
        $.ajax({
            url: SERVER_URL + '/financial-salary/one-salary-record',
            type: 'POST',
            data: {
                token: token,
                id: fkdId
            },
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                if (oE.code == 0) {
                    var data = oE.data;
                    //付款单编号
                    $('.tanceng .fnc_fkjl_hsgz_fkd_detail_payfor_num').html(data['payfor_num']);
                    //付款名称
                    $('.tanceng .fnc_fkjl_hsgz_fkd_detail_payfor_name').html(data['payfor_name']);
                    //结算账户
                    $('.tanceng .fnc_fkjl_hsgz_fkd_detail_zhanghu').html(data['zhanghu']);
                    //结算账目
                    $('.tanceng .fnc_fkjl_hsgz_fkd_detail_zhangmu').html(data['zhangmu']);
                    //付款方式
                    $('.tanceng .fnc_fkjl_hsgz_fkd_detail_zhifu').html(data['zhifu']);
                    //付款人
                    $('.tanceng .fnc_fkjl_hsgz_fkd_detail_send_people').html(data['send_people']);
                    //付款日期
                    $('.tanceng .fnc_fkjl_hsgz_fkd_detail_payfor_time').html(data['payfor_time']);
                    //应付款项
                    $('.tanceng .fnc_fkjl_hsgz_fkd_detail_need_pay_money').html(data['need_pay_money']);
                    //本次付款
                    $('.tanceng .fnc_fkjl_hsgz_fkd_detail_this_pay_money').html(data['this_pay_money']);
                    //大写实付款
                    $('.tanceng .fnc_fkjl_hsgz_fkd_detail_daxie').html(data['daxie']);
                    //备注
                    $('.tanceng .fnc_fkjl_hsgz_fkd_detail_note').html(data['note']);
                }
            }
        });
    });

});
