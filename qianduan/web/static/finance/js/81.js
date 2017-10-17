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

    var token, page, num, keywords, type;
    token = Admin.get_token();
    //token = '2017052516045457073-1-1';
    uid = Admin.get_uid();
    cmpyid = loginUserInfo['usercompany_id'];
    uname = loginUserInfo['username'];

    //权限部分

    if (loginUserInfo['company_admin'] != 1) {
        var fncAccountPowerList = loginUserInfo['powerUrls'];
        //新建账目
        var fncAccountAdd = 'accounts/add';
        //本月临时增票
        var fncAccountTmpAdd = 'accounts/tmpadd';
        //启用停用
        var fncAccountQyTyBtn = 'accounts/isopen';
        //编辑
        var fncAccountEditBtn = 'accounts/update';
        //编辑
        var fncAccountDelBtn = 'accounts/del';

        //新建账目
        if ($.inArray(fncAccountAdd, fncAccountPowerList) == -1) {
            $('.page_81_new_but').hide();
        } else {
            $('.page_81_new_but').show();
        }

        //本月临时增票
        if ($.inArray(fncAccountTmpAdd, fncAccountPowerList) == -1) {
            $('.finance_temporary_increase_ticket').hide();
        } else {
            $('.finance_temporary_increase_ticket').show();
        }

        if ($.inArray(fncAccountAdd, fncAccountPowerList) == -1 && $.inArray(fncAccountTmpAdd, fncAccountPowerList) == -1) {
            $('#fnc_account_create_nav').css('width', '52px');
        } else if ($.inArray(fncAccountAdd, fncAccountPowerList) == -1 && $.inArray(fncAccountTmpAdd, fncAccountPowerList) != -1) {
            $('#fnc_account_create_nav').css('width', '174px');
        } else if ($.inArray(fncAccountAdd, fncAccountPowerList) != -1 && $.inArray(fncAccountTmpAdd, fncAccountPowerList) == -1) {
            $('#fnc_account_create_nav').css('width', '152px');
        } else if ($.inArray(fncAccountAdd, fncAccountPowerList) != -1 && $.inArray(fncAccountTmpAdd, fncAccountPowerList) != -1) {
            $('#fnc_account_create_nav').css('width', '262px');
        }

        //启用停用
        var fncAccountQyTyBtnClass = '';
        if ($.inArray(fncAccountQyTyBtn, fncAccountPowerList) == -1) {
            fncAccountQyTyBtnClass = 'none';
        } else {
            fncAccountQyTyBtnClass = '';
        }

        //编辑
        var fncAccountEditBtnClass = '';
        if ($.inArray(fncAccountEditBtn, fncAccountPowerList) == -1) {
            fncAccountEditBtnClass = 'none';
        } else {
            fncAccountEditBtnClass = '';
        }

        //删除
        var fncAccountDelBtnClass = '';
        if ($.inArray(fncAccountDelBtn, fncAccountPowerList) == -1) {
            fncAccountDelBtnClass = 'none';
        } else {
            fncAccountDelBtnClass = '';
        }

    }

    // 定义账目管理参数
    var AccountData = {
        token: token,
        page: 1,//页面
        num: 10,//每页条数
        keywords: '',//关键字
        type: '',//账目类型
        create_time: ''//创建时间
    };
    getAccountMngerList();
    // 获取账目管理列表
    function getAccountMngerList() {
        $.ajax({
            url: SERVER_URL + '/accounts/list',
            type: 'GET',
            data: AccountData,
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                if (oE.code == 0) {
                    //搜索总条数
                    $(".page_81_search_allNum").html(oE.totalcount);
                    //收入总金额
                    $('.fnc_list_income_total_money').html(oE.sum_income_total_money);
                    //支出总金额
                    $('.fnc_list_expend_total_money').html(oE.sum_expend_total_money);
                    //月发票数量
                    $('.fnc_list_month_total_num').html(oE.month_total_num);
                    //月发票剩余数量
                    $('.fnc_list_month_reamin_num').html(oE.month_reamin_num);
                    //合计总金额
                    $('.fnc_list_sum_total_money').html(oE.sum_total_money);
                    var datalist = oE.datalist;
                    console.log(datalist);
                    if (datalist.length == 0) {
                        $(".page_81_table_noData").removeClass('none');
                        $(".page_81_table_fenye").addClass('none');
                        $(".fnc_list_table_total").addClass('none');
                    } else {
                        $(".page_81_table_noData").addClass('none');
                        $(".page_81_table_fenye").removeClass('none');
                        $(".fnc_list_table_total").removeClass('none');
                    }
                    //字符串拼接
                    var Account_html = '';
                    $.each(datalist, function (i, v) {
                        // 停用状态判断
                        // var useStatus = '',
                        var useStatusClass = '',
                            isOpenClass = '',
                            useStatus = '',
                            useStatusBtn = '';
                        if (v['is_open'] == 1) {
                            // useStatus = l_dbl(i+1);
                            useStatusClass = '';
                            isOpenClass = 'c_g';
                            useStatus = '启用';
                            useStatusBtn = '<button class="' + fncAccountQyTyBtnClass + ' but_mix but_r page_81_nouse_btn">停用</button>';
                        } else if (v['is_open'] == 2) {
                            // useStatus = l_dbl(i+1);
                            useStatusClass = 'grey';
                            isOpenClass = 'c_r';
                            useStatus = '停用';
                            useStatusBtn = '<button class="' + fncAccountQyTyBtnClass + ' but_mix but_lv page_81_use_btn">启用</button><button class="' + fncAccountEditBtnClass + ' but_mix val_dialog but_exit page_81_edit_btn" name="finance_new_bj">编辑</button><button class="but_mix but_r val_dialog" name="finance_sc">删除</button>';
                        }
                        //账目类型判断
                        var account_type = '';
                        if (v['type'] == 1) {
                            account_type = '收入';
                        } else if (v['type'] == 2) {
                            account_type = '支出';
                        }
                        Account_html += '<tr accountid="' + v['id'] + '" zhanghuid="' + v['company_account_id'] + '" class="' + useStatusClass + '">' +
                            '<td>' + l_dbl(i + 1) + '</td>' +
                            '<td>' + v['company_account_name'] + '</td>' +
                            '<td>' + v['name'] + '</td>' +
                            '<td>' + account_type + '</td>' +
                            '<td>' + v['income_total_money'] + '</td>' +
                            '<td>' + v['expend_total_money'] + '</td>' +
                            '<td class="' + isOpenClass + '">' + useStatus + '</td>' +
                            '<td>' + v['note'] + '</td>' +
                            '<td><button class="but_mix but_look page_81_account_lookBut r_sidebar_btn" name="finance_ck">查看</button>' + useStatusBtn + '</td></tr>'
                    });
                    //账目管理数据渲染
                    $(".page_81_account_table").html(Account_html);
                    //分页
                    list_table_render_pagination('.page_81_table_fenyeBox', AccountData, getAccountMngerList, oE.totalcount, datalist.length);
                }
            }
        });
    }

    //启用操作
    $(".page_81_use_btn").die('click').live('click', function () {
        var accountlookId = $(this).closest('tr').attr('accountid');
        $.ajax({
            url: SERVER_URL + '/accounts/isopen',
            type: 'GET',
            data: {
                token: token,
                id: accountlookId,
                is_open: 1//设置状态，1是启用，2是停用
            },
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                if (oE.code == 0) {
                    console.log('操作成功');
                    getAccountMngerList();
                } else {
                    console.log('操作失败');
                }
            }
        });
    });
    // 停用操作
    $(".page_81_nouse_btn").die("click").live('click', function () {
        var accountlookId = $(this).closest('tr').attr('accountid');
        $.ajax({
            url: SERVER_URL + '/accounts/isopen',
            type: 'GET',
            data: {
                token: token,
                id: accountlookId,
                is_open: 2//设置状态，2是停用
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    console.log("操作成功");
                    getAccountMngerList();
                } else {
                    console.log("操作失败");
                }
            }
        });
    });
    // 查看操作
    //账目id
    var accountlookId = null;
    //账户id
    var curZhanghuId = null;
    // var account_lookUid = null;
    $(".page_81_account_lookBut").die('click').live('click', function () {
        accountlookId = $(this).closest('tr').attr('accountid');
        curZhanghuId = $(this).closest('tr').attr('zhanghuid');
        lookAccountDetail(accountlookId);
    });
    //查看详情函数
    function lookAccountDetail(accountlookId) {
        $.ajax({
            url: SERVER_URL + '/accounts/info',
            type: 'GET',
            data: {
                token: token,
                id: accountlookId
            },
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                if (oE.code == 0) {
                    var datalist = oE.datalist;
                    console.log(datalist);
                    // 更多按钮的显示隐藏
                    if (datalist['is_open'] == 2) {
                        $('.page_81_look_more').html('<li class="' + fncAccountEditBtnClass + ' val_dialog " name="finance_new_bj">编辑</li><li class="' + fncAccountQyTyBtnClass + ' page_81_look_use">启用</li><li class="vla_dialog" name="finance_sc">删除</li>');
                    } else if (datalist['is_open'] == 1) {
                        $(".page_81_look_more").html('<li class="' + fncAccountQyTyBtnClass + ' page_81_look_stop">停用</li>');
                    }
                    //账户名称
                    $('.page_81_look_company_name').html(datalist['company_account_name']);
                    //账目名称
                    $('.page_81_look_account_name').html(datalist['name']);
                    // 创建时间-长
                    $(".page_81_look_create_time").html(datalist['create_time']);
                    //创建人
                    $(".page_81_look_create_user").html(datalist['uname']);
                    $(".page_81_look_account_name").html(datalist['name']);
                    //账目类型
                    var typename = '';
                    if (datalist['type'] == 1) {
                        typename = '收入';
                        $('.finance_zmgl_look_one_account_statement').attr('name', 'finance_zmgl_look_one_account_statement');
                    } else {
                        typename = '支出';
                        $('.finance_zmgl_look_one_account_statement').attr('name', 'finance_zmgl_look_one_account_statement_zc');
                    }
                    $(".page_81_look_account_type").html(typename);
                    $(".page_81_look_get_all").html(datalist['income_total_money']);
                    $(".page_81_look_pay_all").html(datalist['expend_total_money']);
                    //状态
                    var isOpenName = '';
                    if (datalist['is_open'] == 1) {
                        isOpenName = '启用';
                    } else {
                        isOpenName = '停用';
                    }
                    $(".page_81_look_account_status").html(isOpenName);
                    $(".page_81_look_account_note").html(datalist['note']);
                    // var account_mnger_id = = datalist[]
                }
            }
        });
    }

    // 查看->更多->启用
    $(".page_81_look_use").die('click').live('click', function () {
        $.ajax({
            url: SERVER_URL + '/accounts/isopen',
            type: 'GET',
            data: {
                token: token,
                id: accountlookId,
                is_open: 1//设置状态 1是启用
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    // alert('操作成功');
                    $('.slider_head_More').trigger('click');
                    $('.slider_head_close').trigger('click');
                    getAccountMngerList();
                } else {
                    // alert('操作失败');
                }
            }

        });
    });
    // 查看->更多-停用
    $(".page_81_look_stop").die('click').live('click', function () {
        $.ajax({
            url: SERVER_URL + '/accounts/isopen',
            type: 'GET',
            data: {
                token: token,
                id: accountlookId,
                is_open: 2//设置状态，2是停用
            },
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                if (oE.code == 0) {
                    // alert("操作成功");
                    $(".slider_head_More").trigger('click');
                    $(".slider_head_close").trigger('click');
                    getAccountMngerList();
                } else {
                    // alert('操作失败');
                }
            }
        });
    });

    // 定义新建参数
    var setAccountData = {
        token: token,
        id: 0,//订单id,有值为修改
        company_account_id: 0,//选择账号id
        company_account_name: "",//公司账户名称
        type: 0,//账目类型 1收入 2支出
        name: '',//账目名称
        is_open: 1,//1启用 2停用
        is_default: 0,//1默认账目 0 不
        note: ''//备注
    };
    // 新建账目
    $('.page_81_new_but').die("click").live("click", function () {
        setAccountData = {
            token: token,
            id: 0,//订单id,有值为修改
            company_account_id: 0,//选择账号id
            company_account_name: "",//公司账户名称
            type: 0,//账目类型 1收入 2支出
            name: '',//账目名称
            is_open: 1,//1启用 2停用
            is_default: 0,//1默认账目 0 不
            note: ''//备注
        };
        //创建人
        $('.tanceng .fnc_zmgl_create_uname').html(uname);
        //创建日期
        $('.tanceng .fnc_zmgl_create_time').html(getCurrentDate());
    });
    // 新建账目-选择账户
    $(".tanceng .page_81_new_choose_company_inp").die("click").live("click", function () {
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
                    // console.log(AccountcompanyNameHTML);
                    $(".tanceng .page_81_new_choose_company").html(AccountcompanyNameHTML);
                }
            }
        })
    });
    $(".tanceng .page_81_new_choose_company li").die("click").live("click", function () {
        setAccountData.company_account_id = $(this).attr('companyid');
        setAccountData.company_account_name = $(this).html();
    });
    // 新建账目-选择账目类型
    $(".tanceng .page_81_new_choose_type li").die("click").live("click", function () {
        setAccountData.type = $(this).index() + 1;
    });
    //新建账目-设置默认账目
    if ($(".page_81_new_set_default").attr('checked') == 'checked') {
        setAccountData.is_default = 1;
    } else if ($(".page_81_new_set_default").attr('checked') == null) {
        setAccountData.is_default = 0;
    }
    // 提交新建账目
    $(".page_81_new_save").die("click").live("click", function () {
        if ($(".page_81_new_choose_company_inp").val() == '请选择账户') {
            alert('请选择账户');
            return false;
        }
        if ($('.page_81_new_choose_type_inp').val() == '情选择账目类型') {
            alert("请选择账目类型");
            return false;
        }
        //账目名称
        if ($(".tanceng .page_81_new_account_name_inp").val() == '') {
            alert("请选择账目名称");
            return false;
        } else {
            setAccountData.name = $(".tanceng .page_81_new_account_name_inp").val();
        }
        //是否启用
        if ($(".tanceng .fnc_zmgl_create_qy").is(':checked')) {
            setAccountData.is_open = 1;
        } else if ($(".tanceng .fnc_zmgl_create_ty").is(':checked')) {
            setAccountData.is_open = 2;
        }
        //备注
        if ($(".tanceng .page_81_new_account_note").val() == '请输入备注') {
            setAccountData.note = '';
        } else {
            setAccountData.note = $(".tanceng .page_81_new_account_note").val();
        }
        //设置默认
        console.log(setAccountData);
        $.ajax({
            url: SERVER_URL + '/accounts/add',
            type: 'POST',
            data: setAccountData,
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                getAccountMngerList();

            }
        });
        $(this).next("button.but_cancel").trigger('click');
        getAccountMngerList();
    });
    //定义编辑账目信息
    var getAccountEditData = {
        token: token,
        id: 0,//订单id,有值为修改
        company_account_id: 0,//选择账号id
        company_account_name: "",//公司账户名称
        type: 0,//账目类型 1收入 2支出
        name: '',//账目名称
        is_open: 0,//1启用 2停用
        is_default: 0,//1默认账目 0 不
        note: ''//备注
    };
    // 编辑账目信息
    $(".page_81_edit_btn").die("click").live("click", function () {
        var accountEditID = $(this).closest('tr').attr('accountid');
        getAccountEditData.id = accountEditID;
        $.ajax({
            url: SERVER_URL + '/accounts/info',
            type: 'GET',
            data: {
                token: token,
                id: accountEditID
            },
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                if (oE.code == 0) {
                    var datalist = oE.datalist;
                    //创建人
                    $('.tanceng .page_81_edit_create_user').html(uname);
                    //创建日期
                    $(".tanceng .page_81_edit_create_Time").html(datalist['create_time'].split(' ')[0]);
                    //选择账目
                    $(".tanceng .page_81_edit_company_name").val(datalist['company_account_name']).addClass('c_3');
                    getAccountEditData['company_account_name'] = datalist['company_account_name'];
                    getAccountEditData['company_account_id'] = datalist['company_account_id'];
                    //账目类型
                    if (datalist['type'] == 1) {
                        $(".tanceng .page_81_edit_account_type").val('收入').addClass('c_3');
                    } else if (datalist['type'] == 2) {
                        $(".tanceng .page_81_edit_account_type").val('支出').addClass('c_3');
                    }
                    getAccountEditData['type'] = datalist['type'];
                    //账目名称
                    $(".tanceng .page_81_edit_account_name").val(datalist['name']).addClass('c_3');
                    getAccountEditData['name'] = datalist['name'];
                    //备注
                    $(".tanceng .page_81_edit_account_note").val(datalist['note']).addClass('c_3');
                    getAccountEditData['note'] = datalist['note'];
                    // 是否启用
                    $('.tanceng .fnc_zmgl_create_ty').attr('checked', true);
                    getAccountEditData['is_open'] = datalist['is_open'];
                    //设置为默认账户
                    if (datalist['is_defualt'] == 0) {
                        $('.tanceng .page_81_edit_account_default').attr("checked", 'checked');
                    } else {
                        $('.tanceng .page_81_edit_account_default').attr("checked", null);
                    }
                    getAccountEditData['is_defualt'] = datalist['is_defualt'];
                }
            }
        });
    });
    // 编辑账目-选择账户
    $(".tanceng .page_81_edit_choose_company li").die("click").live("click", function () {
        getAccountEditData.company_account_id = $(this).attr('companyid');
        getAccountEditData.company_account_name = $(this).html();
    });
    // 编辑账目-选择账目类型
    $(".tanceng .page_81_edit_account_type li").die("click").live("click", function () {
        getAccountEditData.type = $(this).index() + 1;
    });
    //新建账目-设置默认账目
    if ($(".page_81_edit_account_default").attr('checked') == 'checked') {
        getAccountEditData.is_default = 1;
    } else if ($(".page_81_edit_account_default").attr('checked') == null) {
        getAccountEditData.is_default = 0;
    }
    //编辑账目保存
    $(".tanceng .page_81_edit_save_btn").die('click').live('click', function () {
        if ($(".page_81_edit_company_name").val() == '请选择账户') {
            alert('请选择账户');
            return false;
        }
        if ($('.page_81_edit_account_type').val() == '情选择账目类型') {
            alert("请选择账目类型");
            return false;
        }
        //账目名称
        if ($(".tanceng .page_81_edit_account_name").val() == '') {
            alert("请选择账目名称");
            return false;
        } else {
            getAccountEditData.name = $(".tanceng .page_81_edit_account_name").val();
        }
        //是否启用
        if ($(".tanceng .fnc_zmgl_create_qy").is(':checked')) {
            getAccountEditData.is_open = 1;
        } else if ($(".tanceng .fnc_zmgl_create_ty").is(':checked')) {
            getAccountEditData.is_open = 2;
        }
        //备注
        if ($(".tanceng .page_81_edit_account_note").val() == '请输入备注') {
            getAccountEditData.note = '';
        } else {
            getAccountEditData.note = $(".tanceng .page_81_edit_account_note").val();
        }
        console.log(getAccountEditData);
        $.ajax({
            url: SERVER_URL + '/accounts/add',
            type: 'POST',
            data: getAccountEditData,
            dataType: 'json',
            success: function (e) {
                if (e.code == 0) {
                    getAccountMngerList();
                    $('.tanceng').css({'display': 'none'}).children('.dialog_box').remove();
                } else {
                    alert(e.msg);
                }
            }
        });

    });
    //刷新列表
    $(".page_81_reflash").die('click').live('click', function () {
        AccountData = {
            token: token,
            create_time: '',//创建时间
            page: 1,//页面
            num: 10,//每页条数
            keywords: '',//关键字
            company_account_id: 0,//公司账号id
            company_account_name: ''//公司账户名称
        }
        $(".page_81_search_account_name").val('搜索账目名称').css('color', '#CCC');
        $(".page_81_search_time").val('请选择日期').css('color', '#CCC');
        $(".page_81_search_company_name").val('请选择公司账户').css('color', '#CCC');
        $(".page_81_table_fenye").val(10);
        getAccountMngerList();
    });
    //搜索关键字
    $(".page_81_search_account_Btn").die('click').live('click', function () {
        if ($('.page_81_search_account_name').val() == '搜索账目名称') {
            AccountData.keywords = '';
        } else {
            AccountData.keywords = $('.page_81_search_account_name').val();
        }
        getAccountMngerList();
    });
    //搜索-查看时间
    $(".page_81_search_time").die('click').live('click', function () {
        if ($(".page_81_search_time").val() == '请选择日期') {
            alert("请选择日期");
            AccountData.create_time = '';
        } else {
            AccountData.create_time = $('.page_81_search_time').val();
        }
        getAccountMngerList();
    });

//************临时增票*************************************
    //定义临时增票参数
    var temIncTicketData = {
        token: token,
        company_account_id: 0,//公司账户id
        company_account: "",//公司账户名称
        num: 0//票数
    };
    //临时增票
    $('.finance_temporary_increase_ticket').die('click').live('click', function () {
        //选择账户
        $('.tanceng .finance_man_account_inp').die('click').live('click', function () {
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
                        // console.log(AccountcompanyNameHTML);
                        $(".tanceng .finance_man_account_ul").html(AccountcompanyNameHTML);
                    }
                }
            });
        });
        $(".tanceng .finance_man_account_ul li").die("click").live("click", function () {
            temIncTicketData.company_account_id = $(this).attr('companyid');
            temIncTicketData.company_account = $(this).html();
        });
    });
    //保存临时增票
    $('.tanceng .finance_increase_account_save').die('click').live('click', function () {
        //保存选择账户
        if ($('.tanceng .finance_man_account_inp').val() == '请选择公司账户') {
            alert('请选择公司账户');
            return false;
        }
        //保存增票数量
        if ($('.tanceng .finance_increase_account_num_inp').val() == '请输入增票数量') {
            alert('请选择增票数量');
            return false;
        } else {
            temIncTicketData.num = $(".tanceng .finance_increase_account_num_inp").val();
        }
        $.ajax({
            url: SERVER_URL + '/accounts/addticket',
            type: 'POST',
            data: temIncTicketData,
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                if (oE.code == 0) {
                    alert('增票成功');
                    $(this).closest('.dialog_box').remove();
                    $('.tanceng').css('display', 'none');
                }
            }
        });
    });


//*********账户流水**********************************8
    //1.设置账户流水参数
    var finAccStateData = {
        token: token,
        page: 1,//当前页
        num: 10,//每页显示条数
        keywords: '',//关键字
        ie_type: '',//1收入2支出
        company_account_id: 0//账号id
    };
    //选择公司账户
    //选择账户
    $('.page_81_search_company_name').die('click').live('click', function () {
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
                    // console.log(AccountcompanyNameHTML);
                    $(".page_81_search_company_li").html(AccountcompanyNameHTML);
                }
            }
        });
        finAccStateData.company_account_id = '';
    });
    $('.page_81_search_company_li li').die('click').live('click', function () {
        $(this).closest('.inline_block').siblings('.finance_zmgl_look_account_statement').addClass('val_dialog');
        finAccStateData.company_account_id = $(this).attr('companyid');
    });
    $('.finance_zmgl_look_account_statement').die('click').live('click', function () {
        likShow('.tanceng .finance_account_statement_table', finAccStaLookAbledField, '.tanceng .fin_account_state_ul', '.tanceng .fin_account_state_save', '.tanceng .fin_account_state_reset');
        if ($('.page_81_search_company_name').val() == '请选择公司账户') {
            alert('请选择公司账户');
            return false;
        } else {
            finAccStateData.keywords = '';
            $('.tanceng .finance_account_ckzhls_name').html($('.page_81_search_company_name').val());
            $('.tanceng .finance_account_statement_ul li:nth-of-type(1)').trigger('click');
        }
    });
    $('.tanceng .finance_account_statement_ul li').die('click').live('click', function () {
        if ($(this).index() == 0) {
            //查看全部账户流水
            finAccStateData.ie_type = '';
        } else if ($(this).index() == 1) {
            //查看收入
            finAccStateData.ie_type = 1;
        } else if ($(this).index() == 2) {
            //查看收入
            finAccStateData.ie_type = 2;
        }
        getFinAccStateList();
    });
    //获取账户流水列表
    function getFinAccStateList() {
        $.ajax({
            url: SERVER_URL + '/accounts/accountlist',
            type: 'GET',
            data: finAccStateData,
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                //搜素结果
                $('#finance_account_satament_search_list').html(oE.totalcount);
                //账目流水支出合计
                $('.tanceng .finance_account_sum_expend_total_money').html(oE.sum_expend_total_money);
                //账目流水收入合计
                $('.tanceng .finance_account_sum_income_total_money').html(oE.sum_income_total_money);
                if (oE.code == 0) {
                    //获取列表
                    var datalist = oE.datalist;
                    if (datalist.length == 0) {
                        $('.finance_table_nodata_box').removeClass('none');
                        $('.fnc_talbe_state_list_handle').addClass('none');
                        $('.fnc_total_state_list_handle').addClass('none');
                    } else {
                        $(".finance_table_nodata_box").addClass('none');
                        $('.fnc_talbe_state_list_handle').removeClass('none');
                        $('.fnc_total_state_list_handle').removeClass('none');
                    }
                }
                //列表
                var finAccStateHtml = '';
                $.each(datalist, function (i, v) {
                    //收付方式
                    var finwayName = '';
                    if (v['way'] == 1) {
                        finwayName = '现金';
                    } else if (v['way'] == 2) {
                        finwayName = '电汇';
                    } else {
                        finwayName = '支票';
                    }
                    //收支类型
                    var InOutName = '';
                    if (v['ie_type'] == 1) {
                        InOutName = '收入';
                    } else if (v['ie_type'] == 2) {
                        InOutName = '支出';
                    }
                    //收付类型
                    var shoufuTypeName = '';
                    if (v['receipt_pay_type'] == 1) {
                        shoufuTypeName = '销售收款';
                    } else if ((datalist[i]['receipt_pay_type']) == 2) {
                        shoufuTypeName = '采购退款';
                    } else if ((datalist[i]['receipt_pay_type']) == 3) {
                        shoufuTypeName = '采购付款';
                    } else if ((datalist[i]['receipt_pay_type']) == 4) {
                        shoufuTypeName = '客户退款';
                    } else {
                        shoufuTypeName = '-';
                    }
                    //收付类型name
                    var finthetypeName = '';
                    //操作按钮
                    var finAccStateBtn = '';
                    if (v['thetype'] == 1) {
                        //收入
                        finAccStateBtn = '<button class="but_mix but_look val_dialogTop fnc_account_ckskd_rcsr_btn" name="finance_rcsr_dayin" lastid="' + v['last_id'] + '">查看收款单</button>';
                    } else if ((datalist[i]['thetype']) == 2) {
                        //支出
                        finAccStateBtn = '<button class="but_mix but_look val_dialogTop fnc_account_ckfkd_rczc_btn" name="finance_rczc_dayin" lastid="' + v['last_id'] + '">查看付款单</button>';
                    } else if ((datalist[i]['thetype']) == 3) {
                        //收款
                        finAccStateBtn = '<button class="but_mix but_look val_dialogTop fnc_account_ckskd_sk_btn" name="finance_zmgl_look_gather" lastid="' + v['last_id'] + '">查看收款单</button>';
                    } else if ((datalist[i]['thetype']) == 4) {
                        //付款
                        finAccStateBtn = '<button class="but_mix but_look val_dialogTop fnc_account_ckfkd_fk_btn" name="finance_zmgl_look_gather_fk" lastid="' + v['last_id'] + '">查看付款单</button>';
                    } else if ((datalist[i]['thetype']) == 5) {
                        //物流付款
                        finAccStateBtn = '<button class="but_mix but_look val_dialogTop fnc_account_ckfkd_wlfk_btn" name="finance_zmgl_look_gather_fk" lastid="' + v['last_id'] + '">查看付款单</button>';
                    } else if ((datalist[i]['thetype']) == 6) {
                        //工资条
                        finAccStateBtn = '<button class="but_mix but_look val_dialogTop finance_wlfy_ck" name="finance_zmgl_look_gather_fk" lastid="' + v['last_id'] + '">查看付款单</button>';
                    }
                    finAccStateHtml += ' <tr finaccstateuid=" ' + v['uid'] + '" finaccstateid = "' + v['id'] + '">\
                        <td>' + l_dbl(i + 1) + '</td>\
                        <td>' + likNullData(v['code_sn']) + '</td>\
                        <td>' + likNullData(v['day'].split(' ')[0]) + '</td>\
                        <td>' + likNullData(v['receipt_code_sn']) + '</td>\
                        <td>' + likNullData(v['name']) + '</td>\
                        <td>' + shoufuTypeName + '</td>\
                        <td>' + InOutName + '</td>\
                        <td>' + likNullData(v['uname']) + '</td>\
                        <td>' + likNullData(v['cuenta_name']) + '</td>\
                        <td>' + finwayName + '</td>\
                        <td>' + likNullData(v['income_money']) + '</td>\
                        <td>' + likNullData(v['expend_money']) + '</td>\
                        <td>' + finAccStateBtn + '</td>\
                        </tr>'
                });
                $('.fin_account_statement_tobdy').html(finAccStateHtml);
                //分页
                list_table_render_pagination('.fnc_acc_state_list_page', finAccStateData, getFinAccStateList, oE.totalcount, datalist.length);
            }
        });
    }

    //查看收入收款单详情
    $('.tanceng .fnc_account_ckskd_rcsr_btn').live('click', function () {
        var curId = $(this).attr('lastid');
        $.ajax({
            url: SERVER_URL + '/income-expend/info',
            type: 'GET',
            data: {
                token: token,
                id: curId
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var datalist = oE.datalist;
                    console.log(datalist);
                    //作废按钮的显示隐藏
                    if (datalist['is_invalid'] == 0) {
                        $(".tanceng .page_105_void_btn").hide();
                    } else if (datalist['is_invalid'] == 1) {
                        $(".tanceng .page_105_void_btn").show();
                    }
                    //收款方式
                    var incomeWay = null,
                        incomeCheckNum = '';
                    if (datalist['way'] == 1) {
                        incomeWay = '现金';
                    } else if (datalist['way'] == 2) {
                        incomeWay = '电汇';
                    } else if (datalist['way'] == 3) {
                        incomeCheckNum = datalist['cheque_num'];
                        incomeWay = '支票(票号' + incomeCheckNum + ')';
                    }
                    //收入类型
                    var incomeType = null;
                    if (datalist['company_type'] == 1) {
                        incomeType = '公司';
                    } else if (datalist['company_type'] == 2) {
                        incomeType = '个人';
                    }
                    $(".tanceng .page_105_look_incomeNum").html(datalist['money'] + '元');
                    $(".tanceng .page_105_look_income_number").html(datalist['code_sn']);
                    $(".tanceng .page_105_look_income_type").html(incomeType);
                    $(".tanceng .page_105_look_income_company_name").html(datalist['company_name']);
                    $(".tanceng .page_105_look_income_name").html(datalist['name']);
                    $(".tanceng .page_105_look_owner").html(datalist['owner_name']);
                    $(".tanceng .page_105_look_account_company").html(datalist['account_name']);
                    $(".tanceng .page_105_look_account_name").html(datalist['cuenta_name']);
                    $(".tanceng .page_105_look_income_way").html(incomeWay);
                    $(".tanceng .page_105_look_user").html(uname);
                    $(".tanceng .page_105_look_day").html(datalist['day']);
                    $(".tanceng .page_105_look_note").html(datalist['note']);
                }
            }
        });
    });

    //查看支出付款单详情
    $('.tanceng .fnc_account_ckfkd_rczc_btn').live('click', function () {
        var curId = $(this).attr('lastid');
        $.ajax({
            url: SERVER_URL + '/income-expend/info',
            type: 'GET',
            data: {
                token: token,
                id: curId
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

    //查看收款收款单详情
    $('.tanceng .fnc_account_ckskd_sk_btn').live('click', function () {
        var curId = $(this).attr('lastid');
        $.ajax({
            url: SERVER_URL + '/receipt/infolog',
            type: 'GET',
            data: {
                token: token,
                id: curId
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var data = oE.datalist;
                    console.log(data);
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

    //查看付款付款单详情
    $('.tanceng .fnc_account_ckfkd_fk_btn').live('click', function () {
        var curId = $(this).attr('lastid');
        $.ajax({
            url: SERVER_URL + '/paying/infolog',
            type: 'GET',
            data: {
                token: token,
                id: curId
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var data = oE.datalist;
                    console.log(data);
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

    //查看物流付款付款单详情
    $('.tanceng .fnc_account_ckfkd_wlfk_btn').live('click', function () {
        var curId = $(this).attr('lastid');
        $.ajax({
            url: SERVER_URL + '/financial-logistics/have-pay',
            type: 'POST',
            data: {
                token: token,
                company_id: cmpyid,
                yearmonthday: '',
                logistics_company: ''
            },
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
    });

    //2.搜索关键字
    $('.tanceng .finance_account_statement_search').die('click').live('click', function () {
        if ($('.tanceng .finance_account_statement_search_inp').val() == '关联业务名称/单据编号/收支编号') {
            finAccStateData.keywords = '';
        } else {
            finAccStateData.keywords = $('.tanceng .finance_account_statement_search_inp').val();
        }
        getFinAccStateList();
    });
    //3.选择查看项
    var finAccStaLookAbledField = [
        {'index': null, 'field': '收付类型'},
        {'index': null, 'field': '收付人'},
        {'index': null, 'field': '收付方式'}
    ];


    //******查看里的账目流水*****

    var finAccStateLookData = {
        token: token,
        page: 1,//当前页
        num: 10,//每页显示条数
        keywords: '',//关键字
        ie_type: '',//1收入2支出
        company_account_id: 0,//账号id
        choice_cuenta: '' // 结算账目
    };
    //查看账户流水
    $('.finance_zmgl_look_one_account_statement').die('click').live('click', function () {
        //公司账户
        $('.finance_account_statement_person').html($('.page_81_look_company_name').html());
        //账目
        $('.finance_account_statement_account').html($('.page_81_look_account_name').html());
        //账目类型
        $('.finance_account_statement_account_type').html($(".page_81_look_account_type").html());
        finAccStateLookData = {
            token: token,
            page: 1,//当前页
            num: 10,//每页显示条数
            keywords: '',//关键字
            ie_type: '',//1收入2支出
            company_account_id: 0,//账号id
            choice_cuenta: '' // 结算账目
        };
        //支出的账户流水列表
        finAccStateLookData.company_account_id = curZhanghuId;
        finAccStateLookData.choice_cuenta = accountlookId;
        if ($(this).attr('name') == 'finance_zmgl_look_one_account_statement') {
            //收入
            finAccStateLookData.ie_type = 1;
            getFinAccStateIncomeList();
            var finAccStaLookIncomeAbledField = [
                {'index': null, 'field': '收款类型'},
                {'index': null, 'field': '收款人'},
                {'index': null, 'field': '收款方式'}
            ];
            likShow('.tanceng .fin_account_statement_income_table', finAccStaLookIncomeAbledField, '.tanceng .fin_account_state_income_ul', '.tanceng .fin_account_state_income_save', '.tanceng .fin_account_state_income_reset');
        } else if ($(this).attr('name') == 'finance_zmgl_look_one_account_statement_zc') {
            //支出
            finAccStateLookData.ie_type = 2;
            getFinAccStateOutputList();
            var finAccStaLookOutputAbledField = [
                {'index': null, 'field': '付款类型'},
                {'index': null, 'field': '付款人'},
                {'index': null, 'field': '付款方式'}
            ];
            likShow('.tanceng .fin_account_statement_output_table', finAccStaLookOutputAbledField, '.tanceng .fin_account_state_output_ul', '.tanceng .fin_account_state_output_save', '.tanceng .fin_account_state_output_reset');
        }
    });
    //2.收入-搜索关键字
    $('.tanceng .finance_account_statement_income_search').die('click').live('click', function () {
        if ($('.tanceng .finance_account_statement_income_search_inp').val() == '关联业务名称/单据编号/收款编号') {
            finAccStateLookData.keywords = '';
        } else {
            finAccStateLookData.keywords = $('.tanceng .finance_account_statement_income_search_inp').val();
        }
        getFinAccStateIncomeList();
    });
    //2.支出-搜索关键字
    $('.tanceng .finance_account_statement_output_search').die('click').live('click', function () {
        if ($('.tanceng .finance_account_statement_output_search_inp').val() == '关联业务名称/单据编号/付款编号') {
            finAccStateLookData.keywords = '';
        } else {
            finAccStateLookData.keywords = $('.tanceng .finance_account_statement_output_search_inp').val();
        }
        getFinAccStateOutputList();
    });
    //收入的账户流水列表
    function getFinAccStateIncomeList() {
        $.ajax({
            url: SERVER_URL + '/accounts/accountlist',
            type: 'GET',
            data: finAccStateLookData,
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                //搜素结果
                $('.finance_account_satament_income_search_list').html(oE.totalcount);
                console.log(oE.totalcount);
                if (oE.code == 0) {
                    //获取列表
                    var datalist = oE.datalist;
                    console.log(datalist);
                    if (datalist.length == 0) {
                        $('.finance_table_nodata_box').removeClass('none');
                        $('.fnc_talbe_state_list_handle').addClass('none');
                        $('.fnc_total_state_list_handle').addClass('none');
                    } else {
                        $(".finance_table_nodata_box").addClass('none');
                        $('.fnc_talbe_state_list_handle').removeClass('none');
                        $('.fnc_total_state_list_handle').removeClass('none');
                    }
                    //列表
                    var finAccStateIncomeHtml = '';
                    $.each(datalist, function (i, v) {
                        //收付方式
                        var finwayName = '';
                        if (v['way'] == 1) {
                            finwayName = '现金';
                        } else if (v['way'] == 2) {
                            finwayName = '电汇';
                        } else {
                            finwayName = '支票';
                        }
                        //收支类型
                        //收支类型class
                        //var finthetypeClass='';
                        //收支类型name
                        var finthetypeName = '';
                        //操作按钮
                        var finAccStateBtn = '';
                        if (v['thetype'] == 1) {
                            finthetypeName = '收入';
                            finAccStateBtn = '<button class="but_mix but_look val_dialogTop fnc_account_ckskd_btn" name="finance_zmgl_look_gather">查看收款单</button>';
                        } else if ((datalist[i]['thetype']) == 2) {
                            finthetypeName = '支出';
                            finAccStateBtn = '<button class="but_mix but_look val_dialogTop" name="finance_zmgl_look_gather_fk">查看付款单</button>';
                        }
                        finAccStateIncomeHtml += '  <tr finaccstateuid=" ' + v['uid'] + '" finaccstateid = "' + v['id'] + '">\
                        <td>' + l_dbl(i + 1) + '</td>\
                        <td>' + likNullData(v['code_sn']) + '</td>\
                        <td>' + likNullData(v['day']) + '</td>\
                        <td>' + likNullData(v['related_receipts_no']) + '</td>\
                        <td>' + likNullData(v['related_business_name']) + '</td>\
                        <td>' + finthetypeName + '</td>\
                        <td>' + likNullData(v['uname']) + '</td>\
                        <td>' + finwayName + '</td>\
                        <td>' + likNullData(v['income_total_money']) + '</td>\
                        <td>\
                        <button class="but_mix r_sidebar_btn val_dialogTop fnc_account_ckskd_btn"\
                    name="finance_zmgl_look_gather">查看收款单\
                        </button>\
                        </td>\
                        </tr>'
                    });
                    $('.fin_account_statement_income_tobdy').html(finAccStateIncomeHtml);
                    //分页
                    list_table_render_pagination('.fnc_acc_state_list_page', finAccStateLookData, getFinAccStateIncomeList, oE.totalcount, datalist.length);
                }
            }
        });
    }

    //支出的账户流水
    function getFinAccStateOutputList() {
        $.ajax({
            url: SERVER_URL + '/accounts/accountlist',
            type: 'GET',
            data: finAccStateLookData,
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                //搜素结果
                $('.tanceng .finance_account_satament_output_search_list').html(oE.totalcount);
                //账目流水支出合计
                $('.tanceng .finance_account_sum_expend_total_money').html(oE.sum_expend_total_money);
                //账目流水收入合计
                $('.tanceng .finance_account_sum_income_total_money').html(oE.sum_income_total_money);
                if (oE.code == 0) {
                    //获取列表
                    var datalist = oE.datalist;
                    console.log(datalist);
                    if (datalist.length == 0) {
                        $('.finance_table_nodata_box').removeClass('none');
                        $('.fnc_talbe_state_list_handle').addClass('none');
                        $('.fnc_total_state_list_handle').addClass('none');
                    } else {
                        $(".finance_table_nodata_box").addClass('none');
                        $('.fnc_talbe_state_list_handle').removeClass('none');
                        $('.fnc_total_state_list_handle').removeClass('none');
                    }
                    //列表
                    var finAccStateOutputHtml = '';
                    $.each(datalist, function (i, v) {
                        //收付方式
                        var finwayName = '';
                        if (v['way'] == 1) {
                            finwayName = '现金';
                        } else if (v['way'] == 2) {
                            finwayName = '电汇';
                        } else {
                            finwayName = '支票';
                        }
                        //收支类型
                        //收支类型class
                        //var finthetypeClass='';
                        //收支类型name
                        var finthetypeName = '';
                        //操作按钮
                        if (v['thetype'] == 1) {
                            finthetypeName = '收入';
                        } else if ((datalist[i]['thetype']) == 2) {
                            finthetypeName = '支出';
                        } else if ((datalist[i]['thetype']) == 3) {
                            finthetypeName = '收款';
                        } else if ((datalist[i]['thetype']) == 4) {
                            finthetypeName = '付款';
                        } else if ((datalist[i]['thetype']) == 5) {
                            finthetypeName = '物流付款';
                        } else if ((datalist[i]['thetype']) == 6) {
                            finthetypeName = '工资条';
                        }
                        finAccStateOutputHtml += '  <tr finaccstateuid=" ' + v['uid'] + '" finaccstateid = "' + v['id'] + '">\
                        <td>' + l_dbl(i + 1) + '</td>\
                        <td>' + likNullData(v['code_sn']) + '</td>\
                        <td>' + likNullData(v['day'].split(' ')[0]) + '</td>\
                        <td>' + likNullData(v['receipt_code_sn']) + '</td>\
                        <td>' + likNullData(v['name']) + '</td>\
                        <td>' + finthetypeName + '</td>\
                        <td>' + likNullData(v['uname']) + '</td>\
                        <td>' + finwayName + '</td>\
                        <td>' + likNullData(v['expend_money']) + '</td>\
                        <td>\
                        <button class="but_mix but_look val_dialogTop fnc_account_ckfkd_fk_btn" lastid="' + v['last_id'] + '" name="finance_zmgl_look_gather_fk">查看付款单</button>\
                        </td>\
                        </tr>'
                    });
                    $('.fin_account_statement_output_tbody').html(finAccStateOutputHtml);
                    //分页
                    list_table_render_pagination('.fnc_acc_state_list_page', finAccStateLookData, getFinAccStateOutputList, oE.totalcount, datalist.length);
                }

            }
        });
    }

    //查看收款单
    //查看收款单详情
    var curReceiptLogId = null;
    $('.tanceng .fnc_account_ckskd_btn').die('click').live('click', function () {
        curReceiptLogId = $(this).closest('tr').attr('finaccstateid');
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
                    console.log(data);
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

});
