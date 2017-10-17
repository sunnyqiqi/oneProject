$(function () {
    //	tree list
    function tree_list(datalist) {
        var html = '';
        $.each(datalist, function (index, data) {
            html += '<ul class="hr_ul1 change">';
            //			html += '<li class="hr_left_1" cusSortId="' + data["id"] + '"><span>' + data['name'] + '&nbsp;<em class="list_num_null">(<i>'+data['children'].length+'</i>)</em></span></li>';
            html += '<li class="hr_left_1" cussortid="' + data["id"] + '"><span>' + data['name'] + '&nbsp;<em class="list_num_null">(<i></i>)</em></span></li>';
            if (data['children'] && data['children'].length > 0) {
                html += tree_list(data['children'])
            }
            html += '</li>';
            html += '</ul>'
        });
        return html
    }

    //	dialog tree list
    function tree_list_dialog(datalist, deep) {
        var html = '';
        $.each(datalist, function (index, data) {
            var html_i_list_before = '<i class="list_before_span"></i>';
            html += '<ul class="ul1">';
            for (var j = 0; j < deep; j++) {
                html_i_list_before += '<i class="list_before_span"></i>'
            }
            html += '<li class="left_1" cussortid = "' + data["id"] + '">' + html_i_list_before + '<span class="icon_open change_ba"></span><span class="icon_file"></span><span class="list_msg">' + data['name'] + '</span></li>';
            if (data['children'] && data['children'].length > 0) {
                html += tree_list_dialog(data['children'], deep + 1);
            }
            html += '</li>';
            html += '</ul>'
        });
        return html
    }

    //	dialog tree list choose dept
    function tree_list_choose_dept(datalist, deep) {
        var html = '';
        $.each(datalist, function (index, data) {
            var html_i_list_before = '<i class="list_before_span"></i>';
            html += '<ul class="ul1">';
            for (var j = 0; j < deep; j++) {
                html_i_list_before += '<i class="list_before_span"></i>'
            }
            html += '<li class="left_1" deptid = "' + data["id"] + '">' + html_i_list_before + '<span class="icon_open change_ba"></span><span class="icon_file"></span><span class="list_msg">' + data['name'] + '</span><span class="list_check"><em></em></span></li>';
            if (data['children'] && data['children'].length > 0) {
                html += tree_list_choose_dept(data['children'], deep + 1);
            }
            html += '</ul>';
        });
        return html
    }

    //	dialog tree list person
    function tree_list_person(datalist, deep) {
        var html = '';
        $.each(datalist, function (index, data) {
            var html_i_list_before = '<i class="list_before_span"></i>';
            html += '<ul class="ul1">';
            for (var j = 0; j < deep; j++) {
                html_i_list_before += '<i class="list_before_span"></i>'
            }
            html += '<li class="left_1" cussortid = "' + data["id"] + '">' + html_i_list_before + '<span class="icon_open"></span><span class="icon_file"></span><span class="list_msg">' + data['name'] + '</span><>';
            html += '<ul class="ul3">';
            if (data['children'] && data['children'].length > 0) {
                html += tree_list_person(data['children'], deep + 1);
            }
            $.each(data['user_info'], function (index2, data2) {
                var html_i_list_before = '<i class="list_before_span"></i>';
                for (var j = 0; j < deep + 1; j++) {
                    html_i_list_before += '<i class="list_before_span"></i>'
                }
                html += '<li class="left_2 person_left_nav" userinfoid="' + data2['id'] + '">' + html_i_list_before + '<span class="list_msg">' + data2['name'] + ' </span><>'
            });

            html += '<>';
            html += '</ul>';
            html += '</ul>'
        });
        return html
    }

    // 部门id和名字关联
    function getDataArr(key, val) {
        // 定义空json数组
        var newArr = [];
        // 切割字符串
        var keyArr = key.split(',');
        var valArr = val.split('、');
        // 循环
        $.each(keyArr, function (index, value) {
            newArr.push({'title': keyArr[index], 'val': valArr[index]});
        });
        // 返回json数组
        return newArr
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

    //	补零函数
    function l_dbl(x) {
        return x < 10 ? '0' + x : x
    }

    //获取当前系统时间
    function getCurrentDate() {
        var oDate = new Date();
        var sTime = '';
        sTime = oDate.getFullYear() + '-' + l_dbl(oDate.getMonth() + 1) + '-' + l_dbl(oDate.getDate()) + '&nbsp;&nbsp;&nbsp;' + l_dbl(oDate.getHours()) + ':' + l_dbl(oDate.getMinutes()) + ':' + l_dbl(oDate.getSeconds());
        return sTime
    }

    var token, pid, key, page, limit, word_titl, goods_id, goods_pid, goods_member, goods_enddate, goods_fileurl, goods_imgurl, w_p_n;
    token = Admin.get_token();
    //token = '2017052516045457073-1-1';
    uname = loginUserInfo.username;
    var deptId = loginUserInfo.department_id;

    //权限部分
    if(loginUserInfo['company_admin'] != 1){
        var venSellFlowPowerList = loginUserInfo['powerUrls'];
        var venSellFlowAdd = 'customer-flow/add';
        var venSellFlowQyTy = 'customer-flow/status';
        var venSellFlowEdit = 'customer-flow/update';
        var venSellFlowdel = 'customer-flow/del';

        //新建销售流程
        if($.inArray(venSellFlowAdd, venSellFlowPowerList) == -1){
            $('#ven_sell_flow_create').hide();
        }else{
            $('#ven_sell_flow_create').show();
        }

        //启用停用
        var qytyBtnStatus = '';
        if($.inArray(venSellFlowQyTy, venSellFlowPowerList) == -1){
            qytyBtnStatus = 'none';
        }else{
            qytyBtnStatus = '';
        }
        //编辑
        var editBtnStatus = '';
        if($.inArray(venSellFlowEdit, venSellFlowPowerList) == -1){
            editBtnStatus = 'none';
        }else{
            editBtnStatus = '';
        }
        //删除
        var delBtnStatus = '';
        if($.inArray(venSellFlowdel, venSellFlowPowerList) == -1){
            delBtnStatus = 'none';
        }else{
            delBtnStatus = '';
        }
    }

    // 定义销售流程参数
    var sellFlowData = {
        token: token,
        page: 1, // 页面
        num: 10, // 每页条数
        key: '', // 关键字
        dept: deptId, // 部门id
        creater_id: '', // 创建人id
        update_id: '', // 最后修改人id
        created_at: '', // 创建日期
        updated_at: '', // 修改日期
        status: '' // 状态。空是所有，0是使用中 1停用
    };

    getSellFlowList();
    // 获取销售流程列表
    function getSellFlowList() {
        $.ajax({
            url: SERVER_URL + '/customer-flow/list',
            type: 'GET',
            data: sellFlowData,
            dataType: 'json',
            success: function (oE) {
                //搜索总条数
                $('#ven_sell_flow_search_total').html(oE.totalcount);
                if (oE.code == 0) {

                    //获取datalist
                    var datalist = oE.datalist;
                    console.log(datalist);
                    if (datalist.length == 0) {
                        $('.ven_sell_flow_nodata_box').removeClass('none');
                        $('.ven_sell_flow_handle').addClass('none');
                    } else {
                        $('.ven_sell_flow_nodata_box').addClass('none');
                        $('.ven_sell_flow_handle').removeClass('none');
                    }
                    //字符串拼接
                    var sellFlowHtml = '';
                    var statusClass = '';
                    $.each(datalist, function (i, v) {
                        //对不同值进行判断
                        //使用中 停用判断
                        var sBtn = '';
                        if (datalist[i]['status'] == 0) {
                            statusClass = 'c_g';
                            sBtn = '<button class="'+qytyBtnStatus+' but_cancel but_mix but_r lik_sell_flow_btn_ty">停用</button>'
                        } else {
                            statusClass = 'c_r';
                            sBtn = '<button class="'+editBtnStatus+' but_mix but_exit val_dialogTop ven_sell_flow_edit" name="vendition_addxslc_exit">编辑</button><button class="'+qytyBtnStatus+' but_cancel but_mix but_lv lik_sell_flow_btn_qy">启用</button><button class="'+delBtnStatus+' but_mix but_r val_dialog lik_sell_flow_btn_del" name="xs_xslc_delete">删除</button>'
                        }
                        sellFlowHtml += '<tr sellflowuid="' + v['uid'] + '" sellflowid="' + v['id'] + '">\
                            <td>' + l_dbl(i + 1) + '</td>\
                            <td>' + (datalist[i]['name']) + '</td>\
                            <td>' + (datalist[i]['dept_name']) + '</td>\
                            <td>' + (datalist[i]['uname']) + '</td>\
                            <td>' + (datalist[i]['created_at'].split(' ')[0]) + '</td>\
                            <td>' + (datalist[i]['updated_name']) + '</td>\
                            <td>' + (datalist[i]['updated_at'].split(' ')[0]) + '</td>\
                            <td><span class="' + statusClass + '">' + (datalist[i]['status_name']) + '</span></td>\
                            <td><button class="but_mix r_sidebar_btn but_look lik_sell_flow_btn_look" name="vendition_xslc_rights">查看</button>' + sBtn + '</td>\
                        </tr>';
                    });
                    //销售流程数据渲染
                    $('#ven_sell_flow_list').html(sellFlowHtml);

                }
                //分页
                list_table_render_pagination('.ven_sell_flow_all_page', sellFlowData, getSellFlowList, oE.totalcount, datalist.length)
            }
        });
    }

    //刷新列表
    $('#ven_sell_flow_refresh').die('click').live('click', function () {
        sellFlowData = {
            token: token,
            page: 1, // 页面
            num: 10, // 每页条数
            key: '', // 关键字
            dept: '', // 部门id
            creater_id: '', // 创建人id
            update_id: '', // 最后修改人id
            created_at: '', // 创建日期
            updated_at: '', // 修改日期
            status: '' // 状态。空是所有，0是使用中 1停用
        };
        $('#ven_sell_flow_noShow').attr('checked', false);
        $('#ven_sell_flow_searKey').val('搜索销售流程/应用部门').css('color', '#CCCCCC');
        $('#ven_sell_flow_search_dept_inp').val('应用部门').css('color', '#CCCCCC');
        $('#ven_sell_flow_search_uname_inp').val('创建人').css('color', '#CCCCCC');
        $('#ven_sell_flow_search_updataname_inp').val('最后修改人').css('color', '#CCCCCC');
        $('#ven_sell_flow_search_status_inp').val('状态').css('color', '#CCCCCC');
        $('.fenye_box .select_input').val('10');
        getSellFlowList();
    });

    // 销售流程查看全部
    $('#ven_sell_flow_searAll').die('click').live('click', function () {
        sellFlowData.status = '';
        getSellFlowList();
    });
    //销售流程查看使用中
    $('#ven_sell_flow_searUse').die('click').live('click', function () {
        sellFlowData.status = 0;
        getSellFlowList();
    });
    //销售流程查看已停用
    $('#ven_sell_flow_searStop').die('click').live('click', function () {
        sellFlowData.status = 1;
        getSellFlowList();
    });
    //搜索关键字
    $('#ven_sell_flow_searKey_btn').die('click').live('click', function () {
        if ($('#ven_sell_flow_searKey').val() == '搜索销售流程/应用部门') {
            alert('请输入搜索关键字');
            sellFlowData.key = '';
        } else {
            sellFlowData.key = $('#ven_sell_flow_searKey').val();
        }
        getSellFlowList();
    });

    //高级搜索 控制下拉框

    venSellFlowSearch();
    function venSellFlowSearch() {
        $.ajax({
            url: SERVER_URL + '/customer-flow/list',
            type: 'GET',
            data: {token: token},
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    //获取datalist
                    var datalist = oE.datalist;
                    //定义高级搜索字段
                    //高级搜索 部门id
                    var sSearchDeptId = '';
                    var sSearchDeptName = '';
                    var searchDeptUl = '';
                    //高级搜索 创建人名字 字符串
                    var searchUnameUl = '';
                    //高级搜索 最后修改人名字 字符串
                    var searchUpdataUl = '';
                    // 定义高级搜索数组
                    //高级搜索 创建人 数组
                    var searchUnameArr = [];
                    //高级搜索 最后修改人 数组
                    var searchUpdataArr = [];
                    //高级搜索遍历
                    $.each(datalist, function (i, v) {
                        sSearchDeptId += v['dept_list'] + ',';
                        sSearchDeptName += v['dept_name'] + '、';
                        //提取创建人数组
                        searchUnameArr.push({uid: v['uid'], uname: v['uname']});
                        //提取最后修改人数组
                        searchUpdataArr.push({upid: v['updated_uid'], upname: v['updated_name']});
                    });
                    // 应用部门id和name放在一个数组里
                    var aSearchDept = getJsonArr(getDataArr(sSearchDeptId.substr(0, sSearchDeptId.length - 1), sSearchDeptName.substr(0, sSearchDeptName.length - 1)));
                    console.log(aSearchDept);
                    $.each(aSearchDept, function (i, v) {
                        searchDeptUl += '<li searchdeptid="' + v['title'] + '">' + v['val'] + '</li>'
                    });
                    //高级搜索 应用部门
                    $('#ven_sell_flow_search_dept_ul').html(searchDeptUl);

                    //高级搜索 创建人
                    $.each(getJsonArr(searchUnameArr), function (i, v) {
                        searchUnameUl += '<li searchUid="' + v['uid'] + '">' + v['uname'] + '</li>'
                    });
                    $('#ven_sell_flow_search_uname_ul').html(searchUnameUl);
                    //高级搜索 最后修改人
                    $.each(getJsonArr(searchUpdataArr), function (i, v) {
                        searchUpdataUl += '<li searchUpid="' + v['upid'] + '">' + v['upname'] + '</li>'
                    });
                    $('#ven_sell_flow_search_updataname_ul').html(searchUpdataUl);
                }
            }
        })
    }

    // 搜索应用部门
    $('#ven_sell_flow_search_dept_ul li').die('click').live('click', function () {
        sellFlowData.dept = $(this).attr('searchdeptid');
        console.log(sellFlowData.dept);
        getSellFlowList();
    });
    //搜索创建人
    $('#ven_sell_flow_search_uname_ul li').die('click').live('click', function () {
        sellFlowData.creater_id = $(this).attr('searchUid');
        getSellFlowList();
    });
    //搜索最后修改人
    $('#ven_sell_flow_search_updataname_ul li').die('click').live('click', function () {
        sellFlowData.update_id = $(this).attr('searchUpid');
        getSellFlowList();
    });
    //搜索 状态
    $('#ven_sell_flow_search_status_ul li').die('click').live('click', function () {
        /*if($(this).index() == 0){
         $('#ven_sell_flow_searUse').trigger('click')
         }else if($(this).index() == 1){
         $('#ven_sell_flow_searStop').trigger('click')
         }*/
        if ($(this).index() == 1) {
            $('#ven_sell_flow_noShow').attr('checked', false)
        }
        sellFlowData.status = $(this).index();
        getSellFlowList();
    });
    //不显示作废状态
    $('#ven_sell_flow_noShow').die('click').live('click', function () {
        if ($(this).prop('checked')) {
            sellFlowData.status = 0;
            $('#ven_sell_flow_search_status_inp').val('状态').css('color', '#CCCCCC');
        } else {
            sellFlowData.status = '';
        }
        getSellFlowList()
    });

    //销售阶段要求，阶段停留勾选才能填写
    $('.tanceng .ven_sell_flow_create_steps_content_remind_checkbox').die('click').live('click', function () {
        if($(this).is(':checked')){
            $(this).siblings('.ven_sell_flow_create_steps_content_remind_day').attr('disabled', false);
        }else{
            $(this).siblings('.ven_sell_flow_create_steps_content_remind_day').attr('disabled', true);
        }
    });

    // 定义新建销售流程参数
    var venSellFlowCreateData = {
        token: token,
        flow_id: '', // 流程id，修改时生效
        name: '', //	名称
        is_order: '', // 是否依据新建销售单确认成交	0不1是
        dept_list: '', // 可用部门id列表
        edit_type: 0, // 销售流程数据更新 不更新已有数据，1更新已有数据，修改时生效
        steps: []
    };

    //新建销售流程
    $('#ven_sell_flow_create').die('click').live('click', function () {
        //创建人
        $('.tanceng .ven_sell_flow_create_uname').html(uname);
        //获取创建时系统时间
        $('.tanceng .ven_sell_flow_create_date').html(getCurrentDate());
    });
    //编辑销售流程名称
    $('.tanceng .ven_sell_flow_create_steps_name').live('keyup', function () {
        $.each($('.tanceng .ven_sell_flow_create_steps_content>div'), function (i, v) {
            if ($('.tanceng .ven_sell_flow_create_steps li').eq(i).find('.ven_sell_flow_create_steps_name').val() == '请输入阶段名称') {
                $('.tanceng .ven_sell_flow_create_steps_content>div').eq(i).find('.ven_sell_flow_create_steps_content_name').html('');
            }else{
                $('.tanceng .ven_sell_flow_create_steps_content>div').eq(i).find('.ven_sell_flow_create_steps_content_name').html($('.tanceng .ven_sell_flow_create_steps li').eq(i).find('.ven_sell_flow_create_steps_name').val());
            }

        })
    });
    //新建销售流程保存
    $('.tanceng .ven_sell_flow_create_save').die('click').live('click', function () {
        //判断销售流程名称是否输入
        if ($('.tanceng .ven_sell_flow_create_name').val() == '请输入销售流程名称') {
            alert('请输入销售流程名称');
            return false;
        } else {
            venSellFlowCreateData.name = $('.tanceng .ven_sell_flow_create_name').val()
        }
        venSellFlowCreateData.steps = [];
        var venSellFlowCreateWinrateTotal = 0;
        //销售流程阶段
        $.each($('.tanceng .ven_sell_flow_create_steps').children(), function (i, v) {
            // 阶段名称
            var venSellFlowCreateStepsName = $('.tanceng .ven_sell_flow_create_steps').children().eq(i).find('.ven_sell_flow_create_steps_name').val();
            // 阶段赢单率
            var venSellFlowCreateStepsWinrate = $('.tanceng .ven_sell_flow_create_steps').children().eq(i).find('.ven_sell_flow_create_steps_winrate').val();
            venSellFlowCreateWinrateTotal += parseFloat(venSellFlowCreateStepsWinrate);
            //销售阶段要求
            var venSellFlowCreateStepsContent = $('.tanceng .ven_sell_flow_create_steps_content').children().eq(i).find('.ven_sell_flow_create_steps_content_textarea').val();
            //销售阶段是否提醒
            var venSellFlowCreateStepsRemind = $('.tanceng .ven_sell_flow_create_steps_content').children().eq(i).find('.ven_sell_flow_create_steps_content_remind_checkbox').attr('checked');
            var venSellFlowCreateStepsCurRemind = null;
            var venSellFlowCreateStepsCurRemindDay = '';
            //销售阶段是否需要上级确认
            var venSellFlowCreateStepsConfirm = $('.tanceng .ven_sell_flow_create_steps_content').children().eq(i).find('.ven_sell_flow_create_steps_content_confirm_checkbox').attr('checked');
            var venSellFlowCreateStepsCurConfirm = null;

            if (venSellFlowCreateStepsName == '请输入阶段名称') {
                alert('请输入  阶段' + $('.tanceng .ven_sell_flow_create_steps cite').eq(i).html() + '  阶段名称');
                return false;
            } else if (venSellFlowCreateStepsWinrate == '' || venSellFlowCreateStepsWinrate == null) {
                alert('请输入  阶段' + $('.tanceng .ven_sell_flow_create_steps cite').eq(i).html() + '  赢单率');
                return false;
            } else if (venSellFlowCreateStepsContent == '请输入销售阶段要求') {
                alert('请输入  阶段' + $('.tanceng .ven_sell_flow_create_steps cite').eq(i).html() + '  阶段要求');
                return false;
            } else {
                //判断阶段提醒是否选中
                if (venSellFlowCreateStepsRemind == 'checked') {
                    venSellFlowCreateStepsCurRemind = 1;
                    venSellFlowCreateStepsCurRemindDay = $('.tanceng .ven_sell_flow_create_steps_content').children().eq(i).find('.ven_sell_flow_create_steps_content_remind_day').val();
                    if (venSellFlowCreateStepsCurRemindDay == '' || venSellFlowCreateStepsCurRemindDay == null) {
                        alert('请输入  阶段' + $('.tanceng .ven_sell_flow_create_steps cite').eq(i).html() + '  提醒天数')
                    }
                } else {
                    venSellFlowCreateStepsCurRemind = 0;
                    venSellFlowCreateStepsCurRemindDay = '';
                }
                //判断上级确认是否选中
                if (venSellFlowCreateStepsConfirm == 'checked') {
                    venSellFlowCreateStepsCurConfirm = 1;
                } else {
                    venSellFlowCreateStepsCurConfirm = 0;
                }
                //改变steps数组的值
                venSellFlowCreateData.steps.push({
                    id: 0,
                    name: $('.tanceng .ven_sell_flow_create_steps').children().eq(i).find('.ven_sell_flow_create_steps_name').val(),
                    win_rate: venSellFlowCreateStepsWinrate,
                    content: venSellFlowCreateStepsContent,
                    remind: venSellFlowCreateStepsCurRemind,
                    days: venSellFlowCreateStepsCurRemindDay,
                    confirm: venSellFlowCreateStepsCurConfirm
                });
            }

        });


        //最后需要完成阶段
        venSellFlowCreateData.steps.push({
            id: 0,
            name: '完成',
            win_rate: '100',
            content: '',
            remind: 0,
            days: '',
            confirm: '完成本销售流程'
        });


        //必须新建销售单方可成交选中状态判断
        if ($('.tanceng .ven_sell_flow_create_is_order').attr('checked') == 'checked') {
            venSellFlowCreateData.is_order = 1;
        } else {
            venSellFlowCreateData.is_order = 0;
        }
        //判断赢单率是否超过100%
        if(venSellFlowCreateWinrateTotal>100){
            alert('赢单率总和不可超过100%');
            return false;
        }
        //提交ajax
        venSellFlowCreateData.dept_list = venSellFlowCreateData.dept_list.slice(0, venSellFlowCreateData.dept_list.length - 1);
        if(venSellFlowCreateData.dept_list == ''){
            alert('请选择部门');
            return false;
        }
        $.ajax({
            url: SERVER_URL + '/customer-flow/add',
            type: 'POST',
            data: venSellFlowCreateData,
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    alert('添加成功');
                    $('.tanceng .ven_sell_flow_create_save').parents('.dialog_box').remove();
                    $('.tanceng').css('display', 'none');
                    getSellFlowList();
                } else {
                    alert('添加失败')
                }
            }
        })
    });

    //添加部门
    $('.tanceng .ven_sell_flow_choose_dept').die('click').live('click', function () {
        venSellFlowChooseDept()
    });

    //新建/编辑销售流程添加部门
    function venSellFlowChooseDept() {
        $.ajax({
            url: SERVER_URL + '/dept/list',
            type: 'GET',
            data: {
                token: token,
                pid: 0
            },
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                var deep = 0;
                $('.tanceng .ven_sell_flow_dept_list').html(tree_list_choose_dept(oE.rows, deep));
                // 所有分类图标样式控制
                if ($('i.ven_sell_flow_dept_list').children().length == 0) {
                    $('li.left_all span.icon_open').addClass('personOth')
                }
                // 下级部门样式控制
                for (var i = 0, liLeft1 = $('.tanceng .ven_sell_flow_dept_list li.left_1').length; i < liLeft1; i++) {
                    if ($('.tanceng .ven_sell_flow_dept_list li.left_1').eq(i).next('ul').length == 0) {
                        $('.tanceng .ven_sell_flow_dept_list li.left_1').eq(i).find('span.icon_open').addClass('personOth');
                    }
                    $('.tanceng .ven_sell_flow_dept_list li.left_1').eq(i).addClass('deptChild');
                }

                //选择部门左侧选择
                $('.tanceng .left_all').die('click').live('click', function () {
                    $(this).toggle(function () {
                        $(this).find('em').addClass('on');
                        var listhtmlall = '';
                        $('.tanceng .ven_sell_flow_dept_list').find('li.deptChild').each(function (i, v) {
                            listhtmlall += '<li uid="' + $(this).attr('deptid') + '"><span>' + $(this).children('.list_msg').html() + '</span><i class="list_choose_delete"></i></li>';
                            $(this).find('span.list_check em').addClass('on');
                        })
                        $('.tanceng .ven_sell_flow_dept_chosen').html(listhtmlall)
                        $('.tanceng .ven_sell_flow_dept_list').css('display', 'none')
                    }, function () {
                        $(this).find('em').removeClass('on');
                        $('.tanceng .ven_sell_flow_dept_chosen').html('')
                        $('.tanceng .ven_sell_flow_dept_list').css('display', 'block')
                        $('.tanceng .ven_sell_flow_dept_list').find('li.deptChild').each(function (i, v) {
                            $(this).find('span.list_check em').removeClass('on');
                        })
                    })
                    $(this).trigger('click');
                });

                $('.tanceng .ven_sell_flow_dept_list ul .deptChild').die('click').live('click', function () {
                    if ($(this).find('em').hasClass('on')) {
                        if($(this).parent('ul').children('ul').length==0){
                            $('.tanceng .ven_sell_flow_dept_chosen').find('li[uid=' + $(this).attr('deptid') + ']').remove();
                            $(this).find('span.list_check em').removeClass('on');
                        }else{
                            var arr = [];
                            $('.tanceng .ven_sell_flow_dept_chosen').find('li[uid=' + $(this).attr('deptid') + ']').remove();
                            $(this).find('span.list_check em').removeClass('on');
                            $(this).parent('ul').children('ul').each(function(i,v){
                                arr.push($(this).children('li.deptChild').attr('deptid'))
                                $(this).find('span.list_check em').removeClass('on');
                            })
                            $('.tanceng .ven_sell_flow_dept_chosen').children().each(function(i,v){
                                if($.inArray($(this).attr('uid'), arr)!=-1){
                                    $(this).remove();
                                }
                            })
                        }

                    } else {
                        if($(this).parent('ul').children('ul').length==0){
                            $('.tanceng .ven_sell_flow_dept_chosen').append('<li uid="' + $(this).attr('deptid') + '"><span>' + $(this).children('.list_msg').html() + '</span><i class="list_choose_delete"></i></li>');
                            $(this).find('span.list_check em').addClass('on');
                        }else{
                            var listhtml = '',zjlist='',arrb=[];
                            zjlist +='<li uid="' + $(this).attr('deptid') + '"><span>' + $(this).children('.list_msg').html() + '</span><i class="list_choose_delete"></i></li>';
                            $(this).find('span.list_check em').addClass('on');
                            $('.tanceng .ven_sell_flow_dept_chosen').children().each(function(i,v){
                                arrb.push($(this).attr('uid'))
                            })
                            //console.log(arrb)
                            $(this).parent('ul').children('ul').each(function(i,v){
                                if($.inArray($(this).children('li.deptChild').attr('deptid'), arrb)!=-1){
                                    //$(this).remove();
                                    return
                                }else{
                                    listhtml +='<li uid="' + $(this).children('li.deptChild').attr('deptid') + '"><span>' + $(this).children('li.deptChild').children('.list_msg').html() + '</span><i class="list_choose_delete"></i></li>';
                                    $(this).children('li.deptChild').find('span.list_check em').addClass('on');
                                }

                            })
                            $('.tanceng .ven_sell_flow_dept_chosen').append(zjlist+listhtml)
                        }

                    }
                    $('.tanceng .ven_sell_flow_dept_list ul li').removeClass('on');
                    $(this).closest('li').addClass('on');
                });

                //选择部门右侧删除
                $('i.list_choose_delete').die('click').live('click', function () {
                    $(this).closest('li').remove();
                    $('.tanceng .ven_sell_flow_dept_list ul .deptChild[deptid = "' + $(this).closest('li').attr('uid') + '"]').find('em').removeClass('on');
                });
               /* //选择部门左侧选择
                $('.tanceng .ven_sell_flow_dept_list ul .deptChild').die('click').die('click).live('click', function () {
                    if ($(this).find('em').hasClass('on')) {
                        $('.tanceng .ven_sell_flow_dept_chosen').find('li[rid=' + $(this).attr('deptid') + ']').remove();
                        $(this).find('span.list_check em').removeClass('on');
                    } else {
                        $('.tanceng .ven_sell_flow_dept_chosen').append('<li rid="' + $(this).attr('deptid') + '"><span>' + $(this).children('.list_msg').html() + '</span><i class="list_choose_delete"></i></li>');
                        $(this).find('span.list_check em').addClass('on');
                    }
                    $('.tanceng .ven_sell_flow_dept_list ul li').removeClass('on');
                    $(this).closest('li').addClass('on');
                });
                //选择部门右侧删除
                $('i.list_choose_delete').die('click).live('click', function () {
                    $(this).closest('li').remove();
                    $('.tanceng .ven_sell_flow_dept_list ul .deptChild[deptid = "' + $(this).closest('li').attr('rid') + '"]').find('em').removeClass('on');
                });*/
                $('.tanceng .ven_sell_flow_create_choose_dept_save').die('click').live('click', function () {
                    venSellFlowCreateData.dept_list = '';  // 声明对象要区分开
                    //venSellFlowEditData.dept_list = '';
                    var deptChosen = '';
                    $.each($('.tanceng .ven_sell_flow_dept_chosen').find('li'), function (i, v) {
                        deptChosen += '<li deptid="' + $('.tanceng .ven_sell_flow_dept_chosen').find('li').eq(i).attr('uid') + '">' + $('.tanceng .ven_sell_flow_dept_chosen').find('li').eq(i).text() + ' <i></i></li>';
                        venSellFlowCreateData.dept_list += $('.tanceng .ven_sell_flow_dept_chosen').find('li').eq(i).attr('uid') + ','
                    });
                    var ul_heigth=$(".zcj_select_bm_name_list").height();
                    if(ul_heigth<21){
                        ul_heigth=21;
                    }
                    $(".zcj_input_val").css({'height':ul_heigth});
                        //console.log(duoxuanBm)
                            $('.tanceng .ven_sell_flow_create_add_dept_list').html(deptChosen);
                            $('.tanceng .ven_sell_flow_edit_dept_list').html(deptChosen);
                            $(this).parents('.dialog_box').remove()
                        })
                    }
                })
            }

    var venSellFlowEditId = '';
    //编辑按钮点击事件
    $('.ven_sell_flow_edit').die('click').live('click', function () {
        venSellFlowEditId = $(this).closest('tr').attr('sellflowid');
        editDataRender(venSellFlowEditId);
    });
    //编辑  数据渲染
    function editDataRender(venSellFlowEditId) {
        venSellFlowCreateData.flow_id = venSellFlowEditId;
        //先调取销售流程详情，遍历已有数据
        $.ajax({
            url: SERVER_URL + '/customer-flow/info',
            type: 'GET',
            data: {
                token: token,
                flow_id: venSellFlowEditId//  流程id
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var data = oE.data;
                    console.log(data);
                    //创建时间
                    $('.tanceng .ven_sell_flow_edit_date').html(data['created_at']);
                    //创建人
                    $('.tanceng .ven_sell_flow_edit_uname').html(data['uname']);
                    //销售流程
                    $('.tanceng .ven_sell_flow_edit_name').val(data['name']);
                    //销售阶段
                    var venSellFlowEditSteps = '';
                    var venSellFlowEditStepsContent = '';
                    if(data['steps'].length == 0){
                        venSellFlowEditSteps = '<li><div style="z-index: 1;"><span class="xslc_setul_1">阶段<cite>1</cite></span><div class="xslc_setul_2"><input type="text" value="请输入阶段名称" onfocus="fn_focus(this);" onblur="fn_blur(this);" class="ven_sell_flow_create_steps_name"></div><div class="xslc_setul_3"><input type="text" onfocus="fn_focus(this);" class="lik_input_number ven_sell_flow_create_steps_winrate"><i>%</i></div><div class="xslc_setul_4"><button class="xslc_edit_setulAddli but_green">+</button><button class="xslc_setuldelli but_red">-</button></div></div></li>';
                        venSellFlowEditStepsContent='<div style="z-index: 1;">\
                            <div class="t_textinput t_textarea" style="z-index: 1;">\
                            <div class="t_left" style="z-index: 1;"><i class="c_r">*</i>阶段<cite>1</cite>要求</div>\
                            <div class="t_right" style="z-index: 2;"><textarea class="sell_flow_jdyq_textarea txt_normal c_3 ven_sell_flow_create_steps_content_textarea" onfocus="fn_focus(this);" onblur="fn_blur(this);">请输入销售流程名称</textarea></div>\
                            </div>\
                            <div class="vendition_xslcss">\
                            <input type="checkbox" class="ven_sell_flow_create_steps_content_remind_checkbox"><span>本阶段停留</span><input type="text" onfocus="fn_focus(this);" \
onblur="fn_blur(this);" class="ven_sell_flow_create_steps_content_remind_day" disabled><span>天时提醒销售人员执行</span>\
                            </div>\
                            </div>'
                    }else{
                        $.each(data['steps'], function (i, v) {
                            if(i == data['steps'].length-1) return true;
                            venSellFlowEditSteps += '<li><div><span class="xslc_setul_1">阶段<cite>' + (i + 1) + '</cite></span><div class="xslc_setul_2"><input type="text" value="' + v['name'] + '" class="ven_sell_flow_edit_steps_name c_3"/></div><div class="xslc_setul_3"><input type="text" value="' + v['win_rate'] + '" class="lik_input_number ven_sell_flow_edit_steps_winrate c_3"/><i>%</i></div><div class="xslc_setul_4"><button class="xslc_edit_setulAddli but_green">+</button><button class="xslc_edit_setuldelli but_red">-</button></div></div></li>';
                            venSellFlowEditStepsContent += '<div><div class="t_textinput t_textarea">\
                            <div class="t_left"><i class="c_r">*</i>阶段<cite>' + (i + 1) + '</cite>要求</div>\
                            <div class="t_right"><textarea class="sell_flow_jdyq_textarea txt_normal ven_sell_flow_edit_steps_content_textarea c_3">' + v['content'] + '</textarea></div>\
                            </div>\
                            <div class="vendition_xslcss">\
                            <input class="ven_sell_flow_edit_steps_content_remind_checkbox" type="checkbox" ' + (v['remind'] == "1" ? "checked" : "") + '/><span>本阶段停留</span><input class="c_3 ven_sell_flow_edit_steps_content_remind_day" value="' + v['days'] + '" type="text" onfocus="fn_focus(this);" onblur="fn_blur(this);"/><span>天时提醒销售人员执行</span>\
                            </div>\
                            </div>'
                        });
                    }

                    $('.tanceng .ven_sell_flow_edit_steps_list').html(venSellFlowEditSteps);
                    $('.tanceng .ven_sell_flow_edit_steps_content').html(venSellFlowEditStepsContent);
                    //选择使用范围 选择部门
                    if (data['dept_list'].slice(data['dept_list'].length - 1) == ',') {
                        data['dept_list'] = data['dept_list'].slice(0, data['dept_list'].length - 1)
                    }
                    var venSellFlowEditDeptChosenArr = getDataArr(data['dept_list'], data['dept_name']);
                    var venSellFlowEditDeptChosen = '';
                    $.each(data['mulit_dept'], function (i, v) {
                        venSellFlowEditDeptChosen += '<li deptid="' + v['id'] + '">' + v['name'] + ' <i></i></li>'
                    });
                    $('.tanceng .ven_sell_flow_edit_dept_list').html(venSellFlowEditDeptChosen);
                    //必须新建销售单方可成交选中状态
                    if (data['is_order'] == '1') {
                        $('.tanceng .ven_sell_flow_edit_is_order').attr('checked', 'checked')
                    } else {
                        $('.tanceng .ven_sell_flow_edit_is_order').attr('checked', null)
                    }
                    //选择部门
                    $('.tanceng .ven_sell_flow_edit_choose_dept').die('click').live('click', function () {
                        venSellFlowChooseDept();
                    })
                } else {
                    alert('操作失败');
                }
            }
        })
    }

    //编辑销售流程提交
    var likOnOff = false;
    $('.tanceng .ven_sell_flow_edit_save').die('click').live('click', function () {
        //判断销售流程名称是否输入
        if ($('.tanceng .ven_sell_flow_edit_name').val() == '请输入销售流程名称') {
            alert('请输入销售流程名称');
            likOnOff = false;
            return;
        } else {
            venSellFlowCreateData.name = $('.tanceng .ven_sell_flow_edit_name').val()
        }
        venSellFlowCreateData.steps = [];
        //销售流程阶段
        $.each($('.tanceng .ven_sell_flow_edit_steps_list').children(), function (i, v) {
            // 阶段名称
            var venSellFlowCreateStepsName = $('.tanceng .ven_sell_flow_edit_steps_list').children().eq(i).find('.ven_sell_flow_edit_steps_name').val();
            // 阶段赢单率
            var venSellFlowCreateStepsWinrate = $('.tanceng .ven_sell_flow_edit_steps_list').children().eq(i).find('.ven_sell_flow_edit_steps_winrate').val();
            //销售阶段要求
            var venSellFlowCreateStepsContent = $('.tanceng .ven_sell_flow_edit_steps_content').children().eq(i).find('.ven_sell_flow_edit_steps_content_textarea').val();
            //销售阶段是否提醒
            var venSellFlowCreateStepsRemind = $('.tanceng .ven_sell_flow_edit_steps_content').children().eq(i).find('.ven_sell_flow_edit_steps_content_remind_checkbox').attr('checked');
            var venSellFlowCreateStepsCurRemind = null;
            var venSellFlowCreateStepsCurRemindDay = '';
            //销售阶段是否需要上级确认
            var venSellFlowCreateStepsConfirm = $('.tanceng .ven_sell_flow_edit_steps_content').children().eq(i).find('.ven_sell_flow_edit_steps_content_confirm_checkbox').attr('checked');
            var venSellFlowCreateStepsCurConfirm = null;

            if (venSellFlowCreateStepsName == '请输入阶段名称') {
                alert('请输入  阶段' + $('.tanceng .ven_sell_flow_edit_steps_list cite').eq(i).html() + '  阶段名称');
                likOnOff = false;
                return false;
            } else if (venSellFlowCreateStepsWinrate == '' || venSellFlowCreateStepsWinrate == null) {
                alert('请输入  阶段' + $('.tanceng .ven_sell_flow_edit_steps_list cite').eq(i).html() + '  赢单率');
                likOnOff = false;
                return false;
            } else if (venSellFlowCreateStepsContent == '请输入销售阶段要求') {
                alert('请输入  阶段' + $('.tanceng .ven_sell_flow_edit_steps_list cite').eq(i).html() + '  阶段要求');
                likOnOff = false;
                return false;
            } else {
                //判断阶段提醒是否选中
                if (venSellFlowCreateStepsRemind == 'checked') {
                    venSellFlowCreateStepsCurRemind = 1;
                    venSellFlowCreateStepsCurRemindDay = $('.tanceng .ven_sell_flow_edit_steps_content').children().eq(i).find('.ven_sell_flow_edit_steps_content_remind_day').val();
                    if (venSellFlowCreateStepsCurRemindDay == '' || venSellFlowCreateStepsCurRemindDay == null) {
                        alert('请输入  阶段' + $('.tanceng .ven_sell_flow_edit_steps_list cite').eq(i).html() + '  提醒天数')
                        return false;
                    }
                } else {
                    venSellFlowCreateStepsCurRemind = 0;
                    venSellFlowCreateStepsCurRemindDay = '';
                }
                //判断上级确认是否选中
                if (venSellFlowCreateStepsConfirm == 'checked') {
                    venSellFlowCreateStepsCurConfirm = 1;
                } else {
                    venSellFlowCreateStepsCurConfirm = 0;
                }
                //改变steps数组的值
                venSellFlowCreateData.steps.push({
                    id: 0,
                    name: $('.tanceng .ven_sell_flow_edit_steps_list').children().eq(i).find('.ven_sell_flow_edit_steps_name').val(),
                    win_rate: venSellFlowCreateStepsWinrate,
                    content: venSellFlowCreateStepsContent,
                    remind: venSellFlowCreateStepsCurRemind,
                    days: venSellFlowCreateStepsCurRemindDay,
                    confirm: venSellFlowCreateStepsCurConfirm
                });

                likOnOff = true;
            }
        });
        //最后需要完成阶段
        venSellFlowCreateData.steps.push({
            id: 0,
            name: '完成',
            win_rate: '100',
            content: '',
            remind: 0,
            days: '',
            confirm: '完成本销售流程'
        });

        if (likOnOff) {
            //必须新建销售单方可成交选中状态判断
            if ($('.tanceng .ven_sell_flow_create_is_order').attr('checked') == 'checked') {
                venSellFlowCreateData.is_order = 1;
            } else {
                venSellFlowCreateData.is_order = 0;
            }
            //选择部门
            venSellFlowCreateData.dept_list = '';
            $.each($('.tanceng .ven_sell_flow_edit_dept_list').children(), function (i, v) {
                venSellFlowCreateData.dept_list += $('.tanceng .ven_sell_flow_edit_dept_list').children().eq(i).attr('deptid') + ','
            });

            //提交ajax
            //venSellFlowCreateData.dept_list = venSellFlowCreateData.dept_list.slice(0, venSellFlowCreateData.dept_list.length-1)
            console.log(venSellFlowCreateData);
            $.ajax({
                url: SERVER_URL + '/customer-flow/add',
                type: 'POST',
                data: venSellFlowCreateData,
                dataType: 'json',
                success: function (oE) {
                    console.log(oE)
                    if (oE.code == 0) {
                        alert('修改成功');
                        $('.tanceng').children().remove();
                        $('.tanceng').css('display', 'none');
                        getSellFlowList();
                    } else {
                        alert(oE.msg)
                    }
                }
            })
        }
    });


    //启用操作
    $('.lik_sell_flow_btn_qy').die('click').live('click', function () {
        var sellflowid = $(this).closest('tr').attr('sellflowid');
        $.ajax({
            url: SERVER_URL + '/customer-flow/setstatus',
            type: 'GET',
            data: {
                token: token,
                flow_id: sellflowid,//  流程id
                status_flag: 0// 设置状态 0 是启用 1停用
            },
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                if (oE.code == 0) {
                    getSellFlowList()
                } else {
                    alert('操作失败')
                }
            }
        })
    });
    //停用操作
    $('.lik_sell_flow_btn_ty').die('click').live('click', function () {
        var sellflowid = $(this).closest('tr').attr('sellflowid');
        $.ajax({
            url: SERVER_URL + '/customer-flow/setstatus',
            type: 'GET',
            data: {
                token: token,
                flow_id: sellflowid,//  流程id
                status_flag: 1// 设置状态 0 是启用 1停用
            },
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                if (oE.code == 0) {
                    getSellFlowList()
                } else {
                    alert('操作失败')
                }
            }
        })
    });

    //查看操作
    var sellFlowId = null;
    var sellFlowUid = null;
    $('.lik_sell_flow_btn_look').die('click').live('click', function () {
        sellFlowId = parseInt($(this).closest('tr').attr('sellflowid'));
        sellFlowUid = parseInt($(this).closest('tr').attr('sellflowuid'));
        lookSellFlowDetail(sellFlowId)
    });
    // 查看详情函数
    function lookSellFlowDetail(sellFlowId) {
        $.ajax({
            url: SERVER_URL + '/customer-flow/info',
            type: 'GET',
            data: {
                token: token,
                flow_id: sellFlowId//  流程id
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var data = oE.data;
                    console.log(data);
                    //名称
                    $('#ven_sell_flow_look_name').html(data['name']);
                    //状态
                    $('#ven_sell_flow_look_status').html(data['status_name']);
                    //状态  更多
                    if (data['status'] == 1) {
                        $('#ven_sell_flow_look_more').html('<li class="'+qytyBtnStatus+'" id="ven_sell_flow_look_more_qy">启用</li><li class="'+editBtnStatus+' val_dialogTop" name="vendition_addxslc_exit" id="ven_sell_flow_look_more_edit">编辑</li><li id="ven_sell_flow_look_more_del" class="'+delBtnStatus+'val_dialog" name="xs_xslc_delete" id="ven_sell_flow_look_more_del">删除</li>');
                    } else if (data['status'] == 0) {
                        $('#ven_sell_flow_look_more').html('<li class="'+qytyBtnStatus+'" id="ven_sell_flow_look_more_ty">停用</li>');
                    }
                    //基本信息
                    //创建时间
                    $('#ven_sell_flow_look_create_at').html(data['created_at']);
                    //部门名称
                    $('#ven_sell_flow_look_dept_name').html(data['dept_name']);
                    //是否新建销售单方可赢单
                    var sIsOrder = '';
                    if (data['is_order'] == 0) {
                        sIsOrder = '关闭';
                    } else if (data['is_order'] == 1) {
                        sIsOrder = '开启';
                    }
                    $('#ven_sell_flow_is_order').html(sIsOrder);
                    //销售流程阶段导航
                    var sSellStepNav = '';
                    //销售流程阶段
                    var sSellStep = '';
                    $.each(data['steps'], function (i, v) {
                        sSellStepNav += '<li>\
                                            <span class="sale_saleflow_circle" name="xs_lc_step' + (i + 1) + '">' + (i + 1) + '</span>\
                                            <hr class="sale_saleflow_circleLine">\
                                            <span class="sale_saleflow_circleP">阶段' + (i + 1) + '</span>\
                                        </li>';
                        sSellStep += '<div class="xs_lc_step" name="xs_lc_step' + (i + 1) + '" style="display: ' + (i == 0 ? 'block' : 'none') + ';">\
                         <p class="l-s-x"><h4 style="font-weight:bold; line-height: 12px;">阶段' + (i + 1) + '</h4>\
                         <span class="c_6">' + v['name'] + '</span><hr class="xs_xslc_hrLine"/><span class="f_color">赢率：' + v['win_rate'] + '%</span></p>\
                         <h4 class="" style="font-weight:bold; line-height: 12px;">阶段要求</h4>\
                         <p class="l-s-x c_6" style="margin-bottom: 20px;">' + v['content'] + '</p>\
                         <h4 class="" style="font-weight:bold; line-height: 12px;">' + (v['remind'] == 0 ? "不提醒" : "提醒") + '</h4>\
                         <p class="l-s-x c_6">停留' + v['days'] + '天</p>\
                         </div>'
                    });
                    $('#ven_sell_flow_steps_nav').html(sSellStepNav);
                    $('#ven_sell_flow_steps_nav li').eq(0).find('span.sale_saleflow_circle').addClass('sale_saleflow_circle_On');
                    $('#ven_sell_flow_steps_nav li').eq(data['steps'].length - 1).find('hr.sale_saleflow_circleLine').remove();
                    $('#ven_sell_flow_steps').html(sSellStep);

                    //历史记录
                    $.ajax({
                        url: SERVER_URL + '/customer-flow/loadlog',
                        type: 'GET',
                        data: {
                            token: token,
                            id: sellFlowId
                        },
                        dataType: 'json',
                        success: function (oE) {
                            if (oE.code == 0) {
                                var historyDatalist = oE.datalist;
                                console.log(historyDatalist);
                                var fromTypeName = '';
                                var historyListHtml = '';
                                $.each(historyDatalist, function (i, v) {
                                    if (v['from_type'] == 1) {
                                        fromTypeName = 'PC端'
                                    } else if (v['from_type'] == 2) {
                                        fromTypeName = 'IOS端'
                                    } else if (v['from_type'] == 3) {
                                        fromTypeName = 'android端'
                                    }
                                    //阶段
                                    if (v['thetype'] == 8) {
                                        historyListHtml += '<div class="d-r-t-h" >\
                                                            <div class="d-r-box">\
                                                            <img class="l-sl-i" src="' + getImgUrl(v['face']) + '">\
                                                            <div class="d-r-r">\
                                                            <p class="u-id-t">' + v['name'] + '</p>\
                                                            <p class="t-s-p">' + v['created_at'] + '</p>\
                                                        </div>\
                                                        </div>\
                                                        </div>\
                                                       <div class="d-r-t-h xslc_right_lsbjjl">\
                                                            <div>\
                                                            <strong>状态：</strong>\
                                                        <p>' + (v['content_json']['status'] == 1 ? '停用' : '启用') + '</p>\
                                                        </div>\
                                                        </div>\
                                                        </div>'
                                    } else {
                                        var historyStepHtml = '';
                                        $.each(v['content_json']['steps'], function (i2, v2) {
                                            historyStepHtml += '<div>\
                                                            <strong>' + (v['thetype'] == 0 ? '新建' : '编辑') + '阶段' + (i2 + 1) + '：</strong>\
                                                        <p><span>验证客户：</span>赢单' + v2['win_rate'] + '%</p>\
                                                        </div>\
                                                        <div>\
                                                        <strong></strong>\
                                                        <p><span>阶段要求：</span>' + v2['content'] + '</p>\
                                                        </div>\
                                                        <div>\
                                                        <strong></strong>\
                                                        <p><span>提醒时间：</span>停留' + (v2['days'] ? v2['days'] : '-') + '天</p>\
                                                        </div>\
                                                        <div>\
                                                        <strong></strong>\
                                                        <p><span>上级确认：</span>' + (v2['confirm'] == 0 ? '关闭' : '开启') + '</p>\
                                                        </div>'
                                        });
                                        historyListHtml += '<div class="d-r-t-h" >\
                                                            <div class="d-r-box">\
                                                            <img class="l-sl-i" src="' + getImgUrl(v['face']) + '">\
                                                            <div class="d-r-r">\
                                                            <p class="u-id-t">' + v['name'] + '</p>\
                                                            <p class="t-s-p">' + v['created_at'] + '</p>\
                                                        </div>\
                                                        </div>\
                                                        </div>\
                                                        <div class="d-r-t-h xslc_right_lsbjjl">' + historyStepHtml + '\
                                                        <div>\
                                                        <strong>' + (v['thetype'] == 0 ? '新建' : '编辑') + '适用部门：</strong>\
                                                        <p>' + v['content_json']['dept_name'] + '</p>\
                                                        </div>\
                                                        <div>\
                                                        <strong>销售单赢单：</strong>\
                                                        <p>' + (v['content_json']['is_order'] == 0 ? '关闭' : '开启') + '</p>\
                                                        </div>\
                                                        <div>\
                                                        </div>\
                                                        <div>\
                                                        <strong>来源：</strong>\
                                                        <p>' + fromTypeName + '</p>\
                                                        </div>\
                                                        </div>'
                                    }
                                });
                                $('.ven_sell_flow_history_list').html(historyListHtml)
                            }
                        }
                    })
                } else {
                    alert('操作失败');
                }
            }
        })
    }

    //查看>更多>启用
    $('#ven_sell_flow_look_more_qy').die('click').live('click', function () {
        $.ajax({
            url: SERVER_URL + '/customer-flow/setstatus',
            type: 'GET',
            data: {
                token: token,
                flow_id: sellFlowId,//  流程id
                status_flag: 0// 设置状态 0 是启用 1停用
            },
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                if (oE.code == 0) {
                    $('.slider_head_More').trigger('click');
                    $('.slider_head_close').trigger('click');
                    getSellFlowList()
                } else {
                    alert('操作失败')
                }
            }
        });
    });
    //查看>更多>停用
    $('#ven_sell_flow_look_more_ty').die('click').live('click', function () {
        $.ajax({
            url: SERVER_URL + '/customer-flow/setstatus',
            type: 'GET',
            data: {
                token: token,
                flow_id: sellFlowId,//  流程id
                status_flag: 1// 设置状态 0 是启用 1停用
            },
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                if (oE.code == 0) {
                    $('.slider_head_More').trigger('click');
                    $('.slider_head_close').trigger('click');
                    getSellFlowList()
                } else {
                    alert('操作失败')
                }
            }
        })
    });
    //查看>更多>删除
    $('#ven_sell_flow_look_more_del').die('click').live('click', function () {
        $('#ven_sell_flow_curid_inphid').val(sellFlowId);
        $('.slider_head_More').trigger('click');
        $('.slider_head_close').trigger('click');
    });
    //删除操作
    $('.lik_sell_flow_btn_del').die('click').live('click', function () {
        $('#ven_sell_flow_curid_inphid').val($(this).closest('tr').attr('sellflowid'));
    });
    $('#ven_sell_flow_del_btn').die('click').live('click', function () {
        $.ajax({
            url: SERVER_URL + '/customer-flow/del',
            type: 'GET',
            data: {
                token: token,
                flow_id: $('#ven_sell_flow_curid_inphid').val()//  流程id
            },
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                if (oE.code == 0) {
                    getSellFlowList()
                } else {
                    alert('操作失败')
                }
            }
        })
    });
    //查看>编辑
    $('#ven_sell_flow_look_more_edit').die('click').live('click', function () {
        venSellFlowEditId = sellFlowId;
        editDataRender(venSellFlowEditId)
    });

});
