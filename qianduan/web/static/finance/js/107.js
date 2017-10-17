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

    //选择人员
    //	dialog tree list person  选择人员  单选
    function tree_list_person(datalist, deep) {
        var html = '';
        $.each(datalist, function (index, data) {
            var html_i_list_before = '<i class="list_before_span"></i>';
            html += '<ul class="ul1">';
            for (var j = 0; j < deep; j++) {
                html_i_list_before += '<i class="list_before_span"></i>'
            }
            html += '<li class="left_1" cussortid = "' + data["id"] + '">' + html_i_list_before + '<span class="icon_open"></span><span class="icon_file"></span><span class="list_msg">' + data['name'] + '</span></li>';
            html += '<ul class="ul3">';
            if (data['children'] && data['children'].length > 0) {
                html += tree_list_person(data['children'], deep + 1);
            }
            $.each(data['user_info'], function (index2, data2) {
                var html_i_list_before = '<i class="list_before_span"></i>';
                for (var j = 0; j < deep + 1; j++) {
                    html_i_list_before += '<i class="list_before_span"></i>'
                }
                html += '<li class="left_2 person_left_nav" userinfoid="' + data2['id'] + '">' + html_i_list_before + '<span class="list_msg">' + data2['name'] + ' </span></li>'
            })

            html += '</li>';
            html += '</ul>';
            html += '</ul>'
        });
        return html
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

    var token, page, num, keywords, thetype;
    token = Admin.get_token();
    // token = '2017052516045457073-1-1';
    uid = Admin.get_uid();
    uname = loginUserInfo['username'];

    //权限部分
    if (loginUserInfo['company_admin'] != 1) {
        var fncExpendPowerList = loginUserInfo['powerUrls'];
        //新建一笔收入
        var fncExpendAdd = 'income-expend/expend';
        //作废
        var fncExpendInvalid = 'income-expend/invalid';

        //新建一笔支出
        if ($.inArray(fncExpendAdd, fncExpendPowerList) == -1) {
            $('#fnc_expend_create_btn').hide();
            $('#fnc_expend_create_nav').css('width', '52px');
        } else {
            $('#fnc_expend_create_btn').show();
            $('#fnc_expend_create_nav').css('width', '152px');
        }

        //作废
        var fncExpendInvalidBtnClass = '';
        if ($.inArray(fncExpendInvalid, fncExpendPowerList) == -1) {
            fncExpendInvalidBtnClass = 'none';
        } else {
            fncExpendInvalidBtnClass = '';
        }

    }
    // 定义选择查看项
    var fncExpendListLookAbledField = [
        {'index': null, 'field': '结算账户'},
        {'index': null, 'field': '结算账目'},
        {'index': null, 'field': '付款方式'},
        {'index': null, 'field': '备注'}
    ];
    likShow('#fnc_expend_table', fncExpendListLookAbledField, '#fnc_expend_look_field_ul', '#fnc_expend_look_save', '#fnc_expend_look_reset');
    var fncExpendData = {
        token: token,
        page: 1,
        num: 10,
        keywords: '',
        is_invalid: 0,
        thetype: 2
    };
    getFncExpendList();
    //获取日常支出列表
    function getFncExpendList() {
        $.ajax({
            url: SERVER_URL + '/income-expend/list',
            type: 'GET',
            data: fncExpendData,
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                if (oE.code == 0) {
                    //总支出
                    $('.fnc_expend_expend_total_money').html(oE.expend_total_money);
                    //搜索总条数
                    $(".fnc_expend_search_allNum").html(oE.totalcount);
                    var datalist = oE.datalist;
                    if (datalist.length == 0) {
                        $(".fnc_expend_nodata").removeClass('none');
                        $(".fnc_expend_nodata_fenye").addClass('none');
                    } else {
                        $(".fnc_expend_nodata").addClass('none');
                        $(".fnc_expend_nodata_fenye").removeClass('none');
                    }
                    //字符串拼接
                    var DailyExpendHtml = '';
                    $.each(datalist, function (i, v) {
                        // 作废状态判断
                        var voidStatus = '',
                            voidStatusClass = '',
                            voidStatusBtn = '';
                        if (v['is_invalid'] == 0) {
                            voidStatus = l_dbl(i + 1);
                            voidStatusClass = '';
                            voidStatusBtn = '<button class="'+fncExpendInvalidBtnClass+' but_mix but_r but_void fnc_expend_invalid_btn">作废</button>';
                        } else {
                            voidStatus = '<span class="voidIcon">作废</span>';
                            voidStatusClass = 'grey';
                            voidStatusBtn = '';
                        }
                        //支出类型
                        var incomType = '';
                        if (v['company_type'] == 1) {
                            incomType = '公司';
                        } else if (v['company_type'] == 2) {
                            incomType = '个人';
                        }
                        // 收款方式
                        var expendWay = '';
                        if (v['way'] == 1) {
                            expendWay = '现金';
                        } else if (v['way'] == 2) {
                            expendWay = '电汇';
                        } else if (v['way'] == 3) {
                            expendWay = '支票';
                        }
                        DailyExpendHtml += '<tr expendid="' + v['id'] + '" class="' + voidStatusClass + '">' +
                            '<td>' + voidStatus + '</td>' +
                            '<td>' + v['code_sn'] + '</td>' +
                            '<td>' + incomType + '</td>' +
                            '<td>' + v['company_name'] + '</td>' +
                            '<td>' + v['name'] + '</td>' +
                            '<td>' + v['uname'] + '</td>' +
                            '<td>' + v['day'] + '</td>' +
                            '<td>' + v['account_name'] + '</td>' +
                            '<td>' + v['cuenta_name'] + '</td>' +
                            '<td>' + v['owner_name'] + '</td>' +
                            '<td>' + v['money'] + '</td>' +
                            '<td>' + expendWay + '</td>' +
                            '<td>' + v['note'] + '</td>' +
                            '<td><button class="but_mix but_look val_dialog fnc_expend_look_but" name="finance_rczc_dayin">查看付款单</button>' + voidStatusBtn + '</td>' +
                            '</tr>';
                    });
                    // 页面表格数据渲染
                    $(".fnc_expend_expend_table").html(DailyExpendHtml);
                    list_table_render_pagination('.fnc_expend_table_fenye', fncExpendData, getFncExpendList, oE.totalcount, datalist.length);
                    $('#fnc_expend_look_save').trigger('click');
                }
            }
        })
    }

    var fncExpendlookId = null;
    //查看详情
    $(".fnc_expend_look_but").die('click').live('click', function () {
        fncExpendlookId = $(this).closest("tr").attr('expendid');
        $.ajax({
            url: SERVER_URL + '/income-expend/info',
            type: 'GET',
            data: {
                token: token,
                id: fncExpendlookId
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var datalist = oE.datalist;
                    console.log(datalist);
                    //作废按钮的显示隐藏
                    if (datalist['is_invalid'] == 0) {
                        $(".tanceng .fnc_expend_void_btn").hide();
                    } else if (datalist['is_invalid'] == 1) {
                        $(".tanceng .fnc_expend_void_btn").show();
                    }
                    //收款方式
                    var expendWay = null,
                        expendCheckNum = '';
                    if (datalist['way'] == 1) {
                        expendWay = '现金';
                    } else if (datalist['way'] == 2) {
                        expendWay = '电汇';
                    } else if (datalist['way'] == 3) {
                        expendCheckNum = datalist['cheque_num'];
                        expendWay = '支票（票号' + expendCheckNum + '）';
                    }
                    //支出类型
                    if (datalist['company_type'] == 1) {
                        expendType = '公司';
                    } else if (datalist['company_type'] == 2) {
                        expendType = '个人';
                    }
                    //付款金额
                    $(".tanceng .fnc_expend_look_expendNum").html(datalist['money'] + '元');
                    //付款单编号
                    $(".tanceng .fnc_expend_look_expend_number").html(datalist['code_sn']);
                    //支出类型
                    $(".tanceng .fnc_expend_look_expend_type").html(expendType);
                    //公司名称
                    $(".tanceng .fnc_expend_look_expend_company_name").html(datalist['company_name']);
                    //支出名称
                    $(".tanceng .fnc_expend_look_expend_name").html(datalist['name']);
                    //结算账户
                    $(".tanceng .fnc_expend_look_account_company").html(datalist['account_name']);
                    //结算账目
                    $(".tanceng .fnc_expend_look_account_name").html(datalist['cuenta_name']);
                    //支出负责人
                    $(".tanceng .fnc_expend_look_owner_name").html(datalist['owner_name']);
                    //付款方式
                    $(".tanceng .fnc_expend_look_expend_way").html(expendWay);
                    //付款人
                    $(".tanceng .fnc_expend_look_user").html(uname);
                    //付款日期
                    $(".tanceng .fnc_expend_look_day").html(datalist['day']);
                    //备注
                    $(".tanceng .fnc_expend_look_note").html(datalist['note']);
                }
            }
        });
    });
    //作废操作
    $(".fnc_expend_invalid_btn").live("click", function () {
        fncExpendlookId = $(this).closest('tr').attr('expendid');
        $.ajax({
            url: SERVER_URL + '/income-expend/invalid',
            type: 'GET',
            data: {
                token: token,
                id: fncExpendlookId
            },
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                if (oE.code == 0) {
                    // alert('操作成功');
                    getFncExpendList();
                } else {
                    // console.log('操作失败');
                }
            }
        });
    });
    //不显示作废状态
    $('.fnc_expend_list_no_show').die('click').live('click', function () {
        if ($(this).attr('checked') == 'checked') {
            fncExpendData.is_invalid = 0;
        } else {
            fncExpendData.is_invalid = '';
        }
        getFncExpendList();
    });
    //搜索关键字
    $('.fnc_expend_list_search_btn').die('click').live('click', function () {
        if ($('.fnc_expend_list_search_inp').val() == '搜索支出名称') {
            alert('请输入搜索关键字');
            fncExpendData.keywords = '';
        } else {
            fncExpendData.keywords = $('.fnc_expend_list_search_inp').val();
        }
        getFncExpendList();
    });
    //刷新
    $('#fnc_expend_refresh_btn').die('click').live('click', function () {
        fncExpendData = {
            token: token,
            page: 1,
            num: 10,
            keywords: '',
            is_invalid: 0,
            thetype: 2
        };
        $('.fnc_expend_list_search_inp').val('搜索支出名称').css('color', '#CCCCCC');
        $('.fnc_expend_list_search_num').val('10');
        $('.fnc_expend_list_no_show').attr('checked', 'checked');
        getFncExpendList();
    });
    //定义新建日常支出参数
    var fncExpendCreateData = {
        token: token,
        id: 0,
        thetype: 2, // 1支出2支出
        code_sn: '', // 编号
        company_type: '', // 类型 1公司 2个人
        company_name: '', // 公司名称
        name: '', //  账目名称
        day: '', // 日期
        choice_account: '', // 选择账户
        choice_cuenta: '', // 选择账目
        way: '', //  方式 1现金 2电汇 3支票
        cheque_num: '', // 支票号
        money: '', //  金额
        note: '',
        owner:'',//支出负责人id
        owner_name:''//支出负责人名称
    };
    $('#fnc_expend_create_btn').die('click').live('click', function () {
        fncExpendCreateData = {
            token: token,
            id: 0,
            thetype: 2, // 1支出2支出
            code_sn: '', // 编号
            company_type: '', // 类型 1公司 2个人
            company_name: '', // 公司名称
            name: '', //  账目名称
            day: '', // 日期
            choice_account: '', // 选择账户
            choice_cuenta: '', // 选择账目
            way: '', //  方式 1现金 2电汇 3支票
            cheque_num: '', // 支票号
            money: '', //  金额
            note: '',
            owner:'',//支出负责人id
            owner_name:''//支出负责人名称
        };
        //收款人
        $('.tanceng .fnc_expend_create_uname').html(uname);
        //收款编号
        $('.tanceng .fnc_expend_create_code_sn').val(likGetCodeFn('RCZC'));
    });
    //支出类型
    $('.tanceng .fnc_expend_create_type_ul li').die('click').live('click', function () {
        fncExpendCreateData.company_type = $(this).index() + 1;
    });
    //选择账户
    var companyAccountId = null;
    $('.tanceng .fnc_expend_create_choice_account_inp').die('click').live('click', function () {
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
                    $(".tanceng .fnc_expend_create_choose_company_ul").html(AccountcompanyNameHTML);
                }
            }
        });
    });
    $(".tanceng .fnc_expend_create_choose_company_ul li").die('click').live('click', function () {
        fncExpendCreateData.choice_account = $(this).attr('companyid');
        companyAccountId = $(this).attr('companyid');
    });
    //选择账目
    $('.tanceng .fnc_expend_create_choice_cuenta_inp').die('click').live('click', function () {
        if ($('.tanceng .fnc_expend_create_choice_account_inp').val() == '请选择账户') {
            alert('请先选择账户');
            return false;
        } else {
            $.ajax({
                url: SERVER_URL + '/accounts/list',
                type: 'GET',
                data: {
                    token: token,
                    company_account_id: companyAccountId
                },
                dataType: 'json',
                success: function (oE) {
                    console.log(oE);
                    if (oE.code == 0) {
                        var datalist = oE.datalist;
                        console.log(datalist);
                        var fncExpendCreateChooseCuentaList = '';
                        $.each(datalist, function (i, v) {
                            fncExpendCreateChooseCuentaList += '<li accountid="' + v['id'] + '">' + v['name'] + '</li>'
                        });
                        $(".tanceng .fnc_expend_create_choice_cuenta_ul").html(fncExpendCreateChooseCuentaList);
                    }
                }
            });
        }
    });
    $(".tanceng .fnc_expend_create_choice_cuenta_ul li").die('click').live('click', function () {
        fncExpendCreateData.choice_cuenta = $(this).attr('accountid');
    });
    //支出负责人
    function finExpendCreateChoiceOwnerFn(){
        $.ajax({
            url:SERVER_URL + '/dept/deptlist',
            type:'GET',
            data:{
                token:token
            },
            dataType: 'json',
            success: function (oE) {
                if(oE.code == 0){
                    var datalist = oE.rows;
                    var deep = 0;
                    //负责人列表
                    $('.tanceng .fin_expend_create_chioce_owner_list').html(tree_list_person(datalist, deep));
                    //判断部门图标样式
                    $.each($('.tanceng .left_1'),function(i,v){
                        if($('.tanceng .left_1').eq(i).next('ul').children().length == 0){
                            $('.tanceng .left_1').eq(i).children('span.icon_open').addClass('other');
                        }
                    });
                }
            }
        });
    }
    //选择支出负责人
    $('.tanceng .fnc_expend_create_choice_owner').die('click').live('click',function(){
        finExpendCreateChoiceOwnerFn();
        //选择支出负责人确认
        $('.tanceng .fin_expend_create_chioce_owner_save').die('click').live('click',function(){
            fncExpendCreateData.owner = $('.tanceng .list_check').closest('li').attr('userinfoid');
            $('.tanceng .fin_expend_create_choice_owner_inp').val($('.tanceng .list_check').closest('li').find('.list_msg').html());
            $(this).closest('.dialog_box').remove();
        });
    });
    //收款方式
    $('.tanceng .fnc_expend_create_choice_way_ul li').die('click').live('click', function () {
        fncExpendCreateData.way = $(this).index() + 1;
    });
    //新建日常支出 - 提交
    $('.tanceng .fnc_expend_create_submit_btn').die('click').live('click', function () {
        //收款编号
        fncExpendCreateData.code_sn = $('.tanceng .fnc_expend_create_code_sn').val();
        //支出类型
        if ($('.tanceng .fnc_expend_create_type_inp').val() == '请选择支出类型') {
            alert('请选择支出类型');
            return false;
        }
        //公司名称
        if ($('.tanceng .fnc_expend_create_company_name_inp').val() == '请输入公司名称') {
            alert('请输入公司名称');
            return false;
        } else {
            fncExpendCreateData.company_name = $('.tanceng .fnc_expend_create_company_name_inp').val();
        }
        //支出名称
        if ($('.tanceng .fnc_expend_create_name_inp').val() == '请输入支出名称') {
            alert('请输入支出名称');
            return false;
        } else {
            fncExpendCreateData.name = $('.tanceng .fnc_expend_create_name_inp').val();
        }
        //支出日期
        if ($('.tanceng .fnc_expend_create_day_inp').val() == '请选择日期') {
            alert('请选择支出日期');
            return false;
        } else {
            fncExpendCreateData.day = $('.tanceng .fnc_expend_create_day_inp').val();
        }
        //选择账户
        if ($('.tanceng .fnc_expend_create_choice_account_inp').val() == '请选择账户') {
            alert('请选择账户');
            return false;
        }
        //选择账户
        if ($('.tanceng .fnc_expend_create_choice_cuenta_inp').val() == '请选择账目') {
            alert('请选择账目');
            return false;
        }
        //选择收款方式
        if ($('.tanceng .fnc_expend_create_choice_way_inp').val() == '请选择付款方式') {
            alert('请选择付款方式');
            return false;
        }
        //支票号
        fncExpendCreateData.cheque_num = '';
        if ($('.tanceng .fnc_expend_create_choice_way_inp').val() == '支票' && $('.tanceng .finance_rcsr_one_check_inp').val() == '请输入支票号') {
            alert('请输入支票号');
            return false;
        } else if ($('.tanceng .fnc_expend_create_choice_way_inp').val() == '支票' && $('.tanceng .finance_rcsr_one_check_inp').val() != '请输入支票号') {
            fncExpendCreateData.cheque_num = $('.tanceng .finance_rcsr_one_check_inp').val();
        }
        //选择支出负责人
        if($('.tanceng .fin_expend_create_choice_owner_inp').val() == '请选择支出负责人'){
            alert('请选择负责人');
            return false;
        }
        //金额
        if ($('.tanceng .fnc_expend_create_money_inp').val() == '请输入金额') {
            alert('请输入金额');
            return false;
        } else {
            fncExpendCreateData.money = $('.tanceng .fnc_expend_create_money_inp').val();
        }
        //备注
        if ($('.tanceng .fnc_expend_create_note_textarea').val() == '请输入备注内容') {
            fncExpendCreateData.note = '';
        } else {
            fncExpendCreateData.note = $('.tanceng .fnc_expend_create_note_textarea').val();
        }
        console.log(fncExpendCreateData);
        $.ajax({
            url: SERVER_URL + '/income-expend/add',
            type: 'POST',
            data: fncExpendCreateData,
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                if (oE.code == 0) {
                    $(this).closest('.dialog_box').remove();
                    $('.tanceng').css('display', 'none');
                    getFncExpendList();
                }
            }
        });
    });
});
