SERVER_URL = 'http://192.168.0.167:9091';
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
            html += '<li class="left_1" deptchosenid = "' + data["id"] + '">' + html_i_list_before + '<span class="icon_open change_ba"></span><span class="icon_file"></span><span class="list_msg">' + data['name'] + '</span><span class="list_check"><em></em></span></li>';
            if (data['children'] && data['children'].length > 0) {
                html += tree_list_choose_dept(data['children'], deep + 1);
            }
            html += '</ul>';
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

    var token, pid, key, page, limit, word_titl, goods_id, goods_pid, goods_member, goods_enddate, goods_fileurl, goods_imgurl, w_p_n;
    token = Admin.get_token();
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

    // 定义回款流程参数
    var payFlowData = {
        token: token,
        page: 1, // 页面
        num: 10, // 每页条数
        key: '', // 关键字
        dept: '', // 部门id
        creater_id: '', // 创建人id,
        owner_id: '', // 负责人id
        created_at: '', // 创建日期
        updated_at: '', // 修改日期
        status: '' // 状态。空是所有，0是使用中 1停用
    };

    getPayFlowList();
    // 获取回款流程列表
    function getPayFlowList() {
        $.ajax({
            url: SERVER_URL + '/customer-pay-flow/list',
            type: 'GET',
            data: payFlowData,
            success: function (e) {
                // 将返回值转换为json对象
                var oE = eval("(" + e + ")");
                if (oE.code == 0) {
                    //获取datalist
                    var datalist = oE.datalist;
                    console.log(datalist);
                    if (datalist.length == 0) {
                        $('.ven_pay_flow_nodata_box').removeClass('none')
                        $('.ven_pay_flow_handle').addClass('none')
                    } else {
                        $('.ven_pay_flow_nodata_box').addClass('none')
                        $('.ven_pay_flow_handle').removeClass('none')
                    }
                    //字符串拼接
                    var payFlowHtml = '';
                    var statusClass = '';
                    $.each(datalist, function (i, v) {
                        //对不同值进行判断
                        //使用中 停用判断
                        var sBtn = '';
                        if (datalist[i]['status'] == 0) {
                            statusClass = 'c_g';
                            sBtn = '<button class="but_cancel but_mix but_r lik_pay_flow_btn_ty">停用</button>'
                        } else {
                            statusClass = 'c_r';
                            sBtn = '<button class="but_cancel but_mix but_lv lik_pay_flow_btn_qy">启用</button><button class="but_cancel but_mix but_exit val_dialog ven_pay_flow_edit_btn" name="vendition_addhklc_exit">编辑</button><button class="but_cancel but_mix but_r val_dialog lik_pay_flow_btn_del" name="xs_hklc_delete">删除</button>'
                        }
                        payFlowHtml += '<tr payFlowId="' + v['id'] + '">\
                            <td>' + l_dbl(i + 1) + '</td>\
                            <td>' + (datalist[i]['name']) + '</td>\
                            <td>' + (datalist[i]['dept_name']) + '</td>\
                            <td>' + (datalist[i]['uname']) + '</td>\
                            <td>' + (datalist[i]['created_at'].split(' ')[0]) + '</td>\
                            <td>' + (datalist[i]['updated_name']) + '</td>\
                            <td>' + (datalist[i]['updated_at'].split(' ')[0]) + '</td>\
                            <td><span class="' + statusClass + '">' + (datalist[i]['status_name']) + '</span></td>\
                            <td><button class="but_cancel but_mix r_sidebar_btn but_look ven_pay_flow_look" name="vendition_hklc_rights">查看</button>' + sBtn + '</td>\
                        </tr>';
                    });
                    //回款流程数据渲染
                    $('#ven_pay_flow_list').html(payFlowHtml);
                }
                //分页
                list_table_render_pagination('.ven_pay_flow_all_page', payFlowData, getPayFlowList, oE.totalcount, datalist.length)

            }
        });
        //搜索结果条数
        venPayFlowSearchNum();
    }

    //刷新列表
    $('#ven_pay_flow_refresh').die('click').live('click', function () {
        payFlowData = {
            token: token,
            page: 1, // 页面
            num: 10, // 每页条数
            key: '', // 关键字
            dept: '', // 部门id
            creater_id: '', // 创建人id,
            owner_id: '', // 负责人id
            created_at: '', // 创建日期
            updated_at: '', // 修改日期
            status: '' // 状态。空是所有，0是使用中 1停用
        };
        $('#ven_pay_flow_noShow').attr('checked', false);
        $('#ven_pay_flow_searKey').val('搜索回款流程名称').css('color', '#CCCCCC');
        $('#ven_pay_flow_search_dept_inp').val('应用部门').css('color', '#CCCCCC');
        $('#ven_pay_flow_search_uname_inp').val('创建人').css('color', '#CCCCCC');
        $('#ven_pay_flow_search_updataname_inp').val('负责人').css('color', '#CCCCCC');
        $('#ven_pay_flow_search_status_inp').val('状态').css('color', '#CCCCCC');
        $('.fenye_box .select_input').val('10');
        getPayFlowList();
    });

    // 回款流程查看全部
    $('#ven_pay_flow_searAll').die('click').live('click', function () {
        payFlowData.status = '';
        getPayFlowList();
    });
    //回款流程查看使用中
    $('#ven_pay_flow_searUse').die('click').live('click', function () {
        payFlowData.status = 0;
        getPayFlowList();
    });
    //回款流程查看已停用
    $('#ven_pay_flow_searStop').die('click').live('click', function () {
        payFlowData.status = 1;
        getPayFlowList();
    });
    //搜索关键字
    $('#ven_pay_flow_searKey_btn').die('click').live('click', function () {
        if ($('#ven_pay_flow_searKey').val() == '搜索回款流程/应用部门') {
            alert('请输入搜索关键字');
        } else {
            payFlowData.key = $('#ven_pay_flow_searKey').val();
            getPayFlowList();
        }
    });

    //高级搜索 控制下拉框
    venPayFlowSearch();
    function venPayFlowSearch() {
        $.ajax({
            url: SERVER_URL + '/customer-pay-flow/list',
            type: 'GET',
            data: {token: token},
            success: function (e) {
                // 将返回值转换为json对象
                var oE = eval("(" + e + ")");
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
                        searchDeptUl += '<li searchdeptchosenid="' + v["title"] + '">' + v["val"] + '</li>'
                    });
                    //高级搜索 应用部门
                    $('#ven_pay_flow_search_dept_ul').html(searchDeptUl);

                    //高级搜索 创建人
                    $.each(getJsonArr(searchUnameArr), function (i, v) {
                        searchUnameUl += '<li searchUid="' + v['uid'] + '">' + v['uname'] + '</li>'
                    });
                    $('#ven_pay_flow_search_uname_ul').html(searchUnameUl);
                    //高级搜索 最后修改人
                    $.each(getJsonArr(searchUpdataArr), function (i, v) {
                        searchUpdataUl += '<li searchUpid="' + v['upid'] + '">' + v['upname'] + '</li>'
                    });
                    $('#ven_pay_flow_search_updataname_ul').html(searchUpdataUl);
                }
            }
        })
    }

    // 搜索应用部门
    $('#ven_pay_flow_search_dept_ul li').live('click', function () {
        payFlowData.dept = $(this).attr('searchdeptchosenid');
        getPayFlowList();
    });
    //搜索创建人
    $('#ven_pay_flow_search_uname_ul li').live('click', function () {
        payFlowData.creater_id = $(this).attr('searchUid');
        getPayFlowList();
    });
    //搜索负责人
    $('#ven_pay_flow_search_updataname_ul li').live('click', function () {
        payFlowData.owner_id = $(this).attr('searchUpid');
        getPayFlowList();
    });
    //搜索 状态
    $('#ven_pay_flow_search_status_ul li').live('click', function () {
        /*if($(this).index() == 0){
         $('#ven_pay_flow_searUse').trigger('click')
         }else if($(this).index() == 1){
         $('#ven_pay_flow_searStop').trigger('click')
         }*/
        if ($(this).index() == 1) {
            $('#ven_pay_flow_noShow').attr('checked', false)
        }
        payFlowData.status = $(this).index();
        getPayFlowList();
    });
    //不显示作废状态
    $('#ven_pay_flow_noShow').live('click', function () {
        if ($(this).prop('checked')) {
            payFlowData.status = 0;
            $('#ven_pay_flow_search_status_inp').val('状态').css('color', '#CCCCCC');
        } else {
            payFlowData.status = '';
        }
        getPayFlowList()
    });

    //高级搜索 控制搜索条数
    venPayFlowSearchNum();
    function venPayFlowSearchNum() {
        $.ajax({
            url: SERVER_URL + '/customer-pay-flow/list',
            type: 'GET',
            data: {
                token: token,
                key: payFlowData.key, // 关键字
                dept: payFlowData.dept, // 部门id
                creater_id: payFlowData.creater_id, // 创建人id
                owner_id: payFlowData.owner_id, // 负责人id
                created_at: '', // 创建日期
                updated_at: '', // 修改日期
                status: payFlowData.status // 状态。空是所有，0是使用中 1停用
            },
            success: function (e) {
                // 将返回值转换为json对象
                var oE = eval("(" + e + ")");
                if (oE.code == 0) {
                    //搜索总条数
                    $('#ven_pay_flow_search_total').html(oE.totalcount);
                }
            }
        })
    }

    //定义回款id
    var payFlowId = null;
    //启用操作
    $('.lik_pay_flow_btn_qy').die('click').live('click', function () {
        payFlowId = $(this).closest('tr').attr('payflowid');
        venPayFlowQy(payFlowId)
    });
    //启用函数
    function venPayFlowQy(payFlowId) {
        $.ajax({
            url: SERVER_URL + '/customer-pay-flow/setstatus',
            type: 'POST',
            data: {
                token: token,
                payflow_id: payFlowId,//  流程id
                status_flag: 0// 设置状态 0 是启用 1停用
            },
            success: function (e) {
                // 将返回值转换为json对象
                var oE = eval("(" + e + ")");
                console.log(oE);
                if (oE.code == 0) {
                    alert('操作成功');
                    getPayFlowList()
                } else {
                    alert('操作失败')
                }
            }
        })
    }

    //停用操作
    $('.lik_pay_flow_btn_ty').die('click').live('click', function () {
        payFlowId = $(this).closest('tr').attr('payflowid');
        venPayFlowTy(payFlowId)
    });
    //停用函数
    function venPayFlowTy(payFlowId) {
        $.ajax({
            url: SERVER_URL + '/customer-pay-flow/setstatus',
            type: 'POST',
            data: {
                token: token,
                payflow_id: payFlowId,//  流程id
                status_flag: 1// 设置状态 0 是启用 1停用
            },
            success: function (e) {
                // 将返回值转换为json对象
                var oE = eval("(" + e + ")");
                if (oE.code == 0) {
                    alert('操作成功');
                    getPayFlowList()
                } else {
                    alert('操作失败')
                }
            }
        })
    }

    //删除操作
    var payFlowId = '';
    $('.lik_pay_flow_btn_del').die('click').live('click', function () {
        payFlowId = $(this).closest('tr').attr('payflowid');
    });
    //  删除确认按钮
    $('.tanceng .ven_pay_flow_del_submit').die('click').live('click', function () {
        $.ajax({
            url: SERVER_URL + '/customer-pay-flow/del',
            type: 'POST',
            data: {
                token: token,
                payflow_id: payFlowId//  流程id
            },
            success: function (e) {
                // 将返回值转换为json对象
                var oE = eval("(" + e + ")");
                console.log(oE);
                if (oE.code == 0) {
                    getPayFlowList()
                } else {
                    alert('操作失败')
                }
            }
        })
    });

    //查看
    $('.ven_pay_flow_look').die('click').live('click', function () {
        payFlowId = $(this).closest('tr').attr('payflowid');
        $.ajax({
            url: SERVER_URL + '/customer-pay-flow/info',
            type: 'GET',
            data: {
                token: token,
                payflow_id: payFlowId//  流程id
            },
            success: function (e) {
                // 将返回值转换为json对象
                var oE = eval("(" + e + ")");
                if (oE.code == 0) {
                    var data = oE.data;
                    console.log(data);
                    //名称
                    $('#ven_pay_flow_look_name').html(data['name']);
                    //状态
                    $('#ven_pay_flow_look_status').html(data['status_name']);
                    //状态  更多
                    if (data['status'] == 1) {
                        $('#ven_pay_flow_look_more').html('<li id="ven_pay_flow_look_more_qy">启用</li><li class="val_dialogTop" name="vendition_addhklc_exit" id="ven_pay_flow_look_more_edit">编辑</li><li class="val_dialog" id="ven_pay_flow_look_more_del" name="xs_hklc_delete">删除</li>');
                    } else if (data['status'] == 0) {
                        $('#ven_pay_flow_look_more').html('<li id="ven_pay_flow_look_more_ty">停用</li>');
                    }
                    //基本信息
                    //创建时间
                    $('#ven_pay_flow_look_create_at').html(data['created_at']);
                    //部门名称
                    $('#ven_pay_flow_look_dept_name').html(data['dept_name']);
                    //回款流程阶段导航
                    var sPayStepNav = '';
                    //回款流程阶段
                    var sPayStep = '';
                    $.each(data['steps'], function (i, v) {
                        sPayStepNav += '<li>\
                                            <span class="sale_saleflow_circle" name="xs_lc_stephk' + (i + 1) + '">' + (i + 1) + '</span>\
                                            <hr class="sale_saleflow_circleLine">\
                                            <span class="sale_saleflow_circleP">阶段' + (i + 1) + '</span>\
                                        </li>';
                        sPayStep += '<div class="xs_lc_stephk" name="xs_lc_stephk' + (i + 1) + '" style="display: ' + (i == 0 ? 'block' : 'none') + ';">\
                                            <p class="l-s-x"><h4 style="display: inline-block; font-size: 14px;">阶段' + (i + 1) + '：<span style="margin-right:20px;">' + v['name'] + '</span></h4><span class="f_color">回款率：' + v['pay_rate'] + '%</span>&nbsp;&nbsp;<span class="f_color m_left_10">周期' + v['segment'] + '天</span><hr class="xs_xslc_hrLine"><span class="f_color">超过' + v['overdue'] + '天扣除提成比例' + v['deduct_rate'] + '%</span></p>\
                                            <h4 class="">阶段要求</h4>\
                                            <p class="l-s-x">' + v['content'] + '</p>\
                                            <h4 class="">' + (v['remind'] == 0 ? "不提醒" : "提醒") + '</h4>\
                                            <p class="l-s-x">停留' + v['days'] + '天</p>\
                                        </div>';
                    });
                    $('#ven_pay_flow_steps_nav').html(sPayStepNav);
                    $('#ven_pay_flow_steps_nav li').eq(0).find('span.sale_saleflow_circle').addClass('sale_saleflow_circle_On');
                    $('#ven_pay_flow_steps_nav li').eq(data['steps'].length - 1).find('hr.sale_saleflow_circleLine').remove();
                    $('#ven_pay_flow_steps').html(sPayStep);
                    //查看 - 历史记录
                    $.ajax({
                        url: SERVER_URL + '/customer-pay-flow/loadlog',
                        type: 'GET',
                        data: {
                            token: token,
                            id: payFlowId
                        },
                        success: function (e) {
                            var oE = eval("(" + e + ")");
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
                                                            <img class="l-sl-i" src="' + v['face'] + '">\
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
                                                            <img class="l-sl-i" src="' + v['face'] + '">\
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
    });
    //查看>启用
    $('#ven_pay_flow_look_more_qy').live('click', function () {
        venPayFlowQy(payFlowId)
        $('.slider_head_More').trigger('click');
        $('.slider_head_close').trigger('click');
    });
    //查看>停用
    $('#ven_pay_flow_look_more_ty').live('click', function () {
        venPayFlowTy(payFlowId);
        $('.slider_head_More').trigger('click');
        $('.slider_head_close').trigger('click');
    });

    //新建回款流程
    //定义新建回款流程参数
    var venPayFlowCreateData = {
        token: token,
        payflow_id: 0, //回款流程
        name: '', //	流程名称
        deduct_type: 0, //提成结算方式	0按每阶段回款后结算提成1按总额回款后结算提成
        dept_list: '', //	 可用部门id列表
        steps: []
    };
    var venPayFlowEditData = {
        token: token,
        payflow_id: 0, //回款流程
        name: '', //	流程名称
        deduct_type: 0, //提成结算方式	0按每阶段回款后结算提成1按总额回款后结算提成
        dept_list: '', //	 可用部门id列表
        steps: []
    };
    //点击新建回款流程按钮
    $('#ven_pay_flow_create').die('click').live('click', function () {
        venPayFlowCreateData = {
            token: token,
            payflow_id: 0, //回款流程
            name: '', //	流程名称
            deduct_type: 0, //提成结算方式	0按每阶段回款后结算提成1按总额回款后结算提成
            dept_list: '', //	 可用部门id列表
            steps: []
        };
        //新建回款流程创建时间
        $('.tanceng .ven_pay_flow_create_date').html(getCurrentDate());
        //超出周期扣除提成金额比例 选中状态判断
        overCheckbox()
    });
    //创建回款流程>超出周期扣除提成金额比例 选中状态判断  函数
    function overCheckbox() {
        $.each($('.tanceng .ven_pay_flow_create_steps li'), function (i, v) {
            if ($('.tanceng .ven_pay_flow_create_over_checkbox').attr('checked') == 'checked') {
                $('.tanceng .ven_pay_flow_create_steps li').eq(i).find('input:text').eq(2).attr('disabled', null);
                $('.tanceng .ven_pay_flow_create_steps li').eq(i).find('input:text').eq(3).attr('disabled', null);
            } else {
                $('.tanceng .ven_pay_flow_create_steps li').eq(i).find('input:text').eq(2).attr('disabled', 'disabled');
                $('.tanceng .ven_pay_flow_create_steps li').eq(i).find('input:text').eq(3).attr('disabled', 'disabled');
            }
        })
    }

    $('.tanceng .ven_pay_flow_create_button').die('click').live('click', function () {
        //新建回款流程提醒效果
        $.each($('.tanceng .ven_pay_flow_create_steps_content').find('input:checkbox'), function (i, v) {
            if ($('.tanceng .ven_pay_flow_create_steps_content').find('input:checkbox').eq(i).attr('checked') == 'checked') {
                $('.tanceng .ven_pay_flow_create_steps_content').find('input:checkbox').eq(i).siblings('input:text').attr('disabled', null)
            } else {
                $('.tanceng .ven_pay_flow_create_steps_content').find('input:checkbox').eq(i).siblings('input:text').attr('disabled', 'disabled')
            }
        });
    });
    //新建回款流程点击复选框效果
    $('.tanceng .ven_pay_flow_create_steps_content').find('input:checkbox').live('click', function () {
        if ($(this).attr('checked') == 'checked') {
            $(this).siblings('input:text').attr('disabled', null)
        } else {
            $(this).siblings('input:text').attr('disabled', 'disabled')
        }
    });
    //新建回款流程点击复选框  超出周期扣除提成金额比例 选中状态判断
    $('.tanceng .ven_pay_flow_create_over_checkbox').live('click', function () {
        overCheckbox();
    });

    // 选择部门
    $('.tanceng .ven_pay_flow_choose_dept').die('click').live('click', function () {
        venPayFlowChooseDept()
    });

    /*//回款流程添加部门
    function venPayFlowChooseDept() {
        $.ajax({
            url: SERVER_URL + '/dept/list',
            type: 'GET',
            data: {
                token: token,
                pid: 0
            },
            success: function (e) {
                // 将返回值转换为json对象
                var oE = eval("(" + e + ")");
                console.log(oE);
                var deep = 0;
                $('.tanceng .ven_pay_flow_dept_list').html(tree_list_choose_dept(oE.rows, deep));
                // 所有分类图标样式控制
                if ($('i.ven_pay_flow_dept_list').children().length == 0) {
                    $('li.left_all span.icon_open').addClass('personOth')
                }
                // 下级部门样式控制
                for (var i = 0, liLeft1 = $('.tanceng .ven_pay_flow_dept_list li.left_1').length; i < liLeft1; i++) {
                    if ($('.tanceng .ven_pay_flow_dept_list li.left_1').eq(i).next('ul').length == 0) {
                        $('.tanceng .ven_pay_flow_dept_list li.left_1').eq(i).find('span.icon_open').addClass('personOth');
                        $('.tanceng .ven_pay_flow_dept_list li.left_1').eq(i).find('span.personOth').closest('li').addClass('deptChild')
                    }
                }
                //选择部门左侧选择
                $('.tanceng .ven_pay_flow_dept_list ul .deptChild').die('click').live('click', function () {
                    if($(this).find('em').hasClass('on')){
                        $('.tanceng .ven_pay_flow_dept_chosen').find('li[rid=' + $(this).attr('deptchosenid') + ']').remove()
                        $(this).find('span.list_check em').removeClass('on')
                    }else{
                        $('.tanceng .ven_pay_flow_dept_chosen').append('<li rid="' + $(this).attr('deptchosenid') + '"><span>' + $(this).children('.list_msg').html() + '</span><i class="list_choose_delete"></i></li>');
                        $(this).find('span.list_check em').addClass('on')
                    }
                });
                //选择部门右侧删除
                $('i.list_choose_delete').live('click', function () {
                    $(this).closest('li').remove();
                    $('.tanceng .ven_pay_flow_dept_list ul .deptChild[deptchosenid = "' + $(this).closest('li').attr('rid') + '"]').find('em').removeClass('on');
                });
                //新建>选择部门确认
                $('.tanceng .ven_pay_flow_create_choose_dept_save').die('click').live('click', function () {
                    venPayFlowCreateData.dept_list = '';  // 声明对象要区分开
                    //venPayFlowEditData.dept_list = '';
                    var deptChosen = '';
                    $.each($('.tanceng .ven_pay_flow_dept_chosen').find('li'), function (i, v) {
                        deptChosen += '<li deptchosenid="' + $('.tanceng .ven_pay_flow_dept_chosen').find('li').eq(i).attr('rid') + '">' + $('.tanceng .ven_pay_flow_dept_chosen').find('li').eq(i).text() + ' <i></i></li>'
                        venPayFlowCreateData.dept_list += $('.tanceng .ven_pay_flow_dept_chosen').find('li').eq(i).attr('rid') + ','
                    });
                    $('.tanceng .ven_pay_flow_create_add_dept_list').html(deptChosen);
                    $('.tanceng .ven_pay_flow_edit_dept_list').html(deptChosen);
                    $(this).parents('.dialog_box').remove()
                })
            }
        })
    }*/

    //新建回款流程保存操作
    $('.tanceng .ven_pay_flow_create_save').die('click').live('click', function () {
        //新建回款流程名称
        if ($('.tanceng .ven_pay_flow_create_name').val() == '请输入回款流程名称' || $('.tanceng .ven_pay_flow_create_name').val() == null) {
            alert('请输入回款流程名称');
            return
        } else {
            venPayFlowCreateData.name = $('.tanceng .ven_pay_flow_create_name').val()
        }
        //新建回款流程阶段获取值
        venPayFlowCreateData.steps = [];
        $.each($('.tanceng .ven_pay_flow_create_steps li'), function (i, v) {
            //判断回款率和回款周期是否填入
            if ($('.tanceng .ven_pay_flow_create_steps li').eq(i).find('input:text').eq(0).val() == '') {
                alert('请输入阶段 ' + (i + 1) + ' 回款率');
                return false;
            } else if ($('.tanceng .ven_pay_flow_create_steps li').eq(i).find('input:text').eq(1).val() == '') {
                alert('请输入阶段 ' + (i + 1) + ' 回款周期');
                return false;
            }
            //判断超出周期扣除提成金额比例是否选中
            var venPayFlowOverTime = 0;
            var venPayFlowOverPerc = 0;
            if ($('.tanceng .ven_pay_flow_create_over_checkbox').attr('checked') == 'checked') {
                //判断超出时间和超期扣除比例是否填写
                if ($('.tanceng .ven_pay_flow_create_steps li').eq(i).find('input:text').eq(2).val() == null || $('.tanceng .ven_pay_flow_create_steps li').eq(i).find('input:text').eq(2).val() == '') {
                    alert('请输入阶段 ' + (i + 1) + ' 超期时间');
                    return false;
                } else if ($('.tanceng .ven_pay_flow_create_steps li').eq(i).find('input:text').eq(3).val() == null || $('.tanceng .ven_pay_flow_create_steps li').eq(i).find('input:text').eq(3).val() == '') {
                    alert('请输入阶段 ' + (i + 1) + ' 超期扣除比例');
                    return false;
                } else {
                    venPayFlowOverTime = $('.tanceng .ven_pay_flow_create_steps li').eq(i).find('input:text').eq(2).val();
                    venPayFlowOverPerc = $('.tanceng .ven_pay_flow_create_steps li').eq(i).find('input:text').eq(3).val();
                }
            } else {
                venPayFlowOverTime = 0;
                venPayFlowOverPerc = 0;
            }
            //判断阶段要求
            var venPayFlowCreateStepsContTextarea = '';
            if ($('.tanceng .ven_pay_flow_create_steps_content').find('textarea.ven_pay_flow_create_steps_contents_textarea').eq(i).val() == '请填写此阶段对销售人员的要求，以便销售人员更好的执行') {
                alert('请输入阶段 ' + (i + 1) + ' 阶段要求');
                return false;
            } else {
                venPayFlowCreateStepsContTextarea = $('.tanceng .ven_pay_flow_create_steps_content').find('textarea.ven_pay_flow_create_steps_contents_textarea').eq(i).val()
            }
            //判断是否提醒
            var venPayFlowCreateRemind = null;
            var venPayFlowCreateRemindDays = null;
            if ($('.tanceng .ven_pay_flow_create_steps_content').children().eq(i).find('input:checkbox').attr('checked') == 'checked') {
                if ($('.tanceng .ven_pay_flow_create_steps_content').children().eq(i).find('input:text').val() == '') {
                    alert('请输入阶段 ' + (i + 1) + ' 提醒提前天数');
                    return false
                } else {
                    venPayFlowCreateRemind = 1;
                    venPayFlowCreateRemindDays = $('.tanceng .ven_pay_flow_create_steps_content').children().eq(i).find('input:text').val()
                }
            } else {
                venPayFlowCreateRemind = 0;
                venPayFlowCreateRemindDays = 0;
            }
            venPayFlowCreateData.steps.push({
                id: 0,
                name: '',
                segment: $('.tanceng .ven_pay_flow_create_steps li').eq(i).find('input:text').eq(1).val(),    // 周期
                pay_rate: $('.tanceng .ven_pay_flow_create_steps li').eq(i).find('input:text').eq(0).val(),   // 回款率
                overdue: venPayFlowOverTime,    //  过期时间（单位天）
                deduct_rate: venPayFlowOverPerc,    //  超出周期扣除提成金额比例	0-100
                content: venPayFlowCreateStepsContTextarea,    //   内容
                remind: venPayFlowCreateRemind,      //  是否提醒	0不提醒1提醒
                days: venPayFlowCreateRemindDays,        //	提醒激活的天数
                sort: 0         //	序号
            });
        });
        //选择部门
        venPayFlowCreateData.dept_list = '';
        $.each($('.tanceng .ven_pay_flow_create_add_dept_list').children(), function (i, v) {
            venPayFlowCreateData.dept_list += $('.tanceng .ven_pay_flow_create_add_dept_list').children().eq(i).attr('deptchosenid') + ','
        });
        if (venPayFlowCreateData.dept_list == '') {
            alert('请选择部门');
            return false;
        }
        console.log(venPayFlowCreateData)
        $.ajax({
            url: SERVER_URL + '/customer-pay-flow/add',
            type: 'POST',
            data: venPayFlowCreateData,
            success: function (e) {
                var oE = eval('(' + e + ')');
                console.log(oE)
                if (oE.code == 0) {
                    alert('添加成功');
                    $('.tanceng').children().remove();
                    $('.tanceng').css('display', 'none');
                    getPayFlowList();
                } else {
                    alert(oE.msg)
                }
            }
        })
    })

    //编辑回款流程
    //获取原始详情
    $('.ven_pay_flow_edit_btn').die('click').live('click', function () {
        payFlowId = $(this).closest('tr').attr('payflowid');
        venPayFlowEditData = {
            token: token,
            payflow_id: payFlowId, //回款流程
            name: '', //	流程名称
            deduct_type: 0, //提成结算方式	0按每阶段回款后结算提成1按总额回款后结算提成
            dept_list: '', //	 可用部门id列表
            steps: []
        };
        getPayFlowInfoEdit(payFlowId);
        overCheckboxEdit()
    });
    //查看>编辑
    $('#ven_pay_flow_look_more_edit').live('click', function(){
        $('.slider_head_More').trigger('click');
        $('.slider_head_close').trigger('click');
        venPayFlowEditData = {
            token: token,
            payflow_id: payFlowId, //回款流程
            name: '', //	流程名称
            deduct_type: 0, //提成结算方式	0按每阶段回款后结算提成1按总额回款后结算提成
            dept_list: '', //	 可用部门id列表
            steps: []
        };
        getPayFlowInfoEdit(payFlowId);
        overCheckboxEdit()
    })
    $('.tanceng .ven_pay_flow_edit_over_checkbox').live('click', function () {
        overCheckboxEdit()
    })
    //编辑回款流程>超出周期扣除提成金额比例 选中状态判断  函数
    function overCheckboxEdit() {
        $.each($('.tanceng .ven_pay_flow_edit_steps li'), function (i, v) {
            if ($('.tanceng .ven_pay_flow_edit_over_checkbox').attr('checked') == 'checked') {
                $('.tanceng .ven_pay_flow_edit_steps li').eq(i).find('input:text').eq(2).attr('disabled', null);
                $('.tanceng .ven_pay_flow_edit_steps li').eq(i).find('input:text').eq(3).attr('disabled', null);
            } else {
                $('.tanceng .ven_pay_flow_edit_steps li').eq(i).find('input:text').eq(2).val('').attr('disabled', 'disabled');
                $('.tanceng .ven_pay_flow_edit_steps li').eq(i).find('input:text').eq(3).val('').attr('disabled', 'disabled');
            }
        })
    }

    //编辑回款流程>回款流程详情
    function getPayFlowInfoEdit(payFlowId) {
        $.ajax({
            url: SERVER_URL + '/customer-pay-flow/info',
            type: 'GET',
            data: {
                token: token,
                payflow_id: payFlowId
            },
            success: function (e) {
                var oE = eval('(' + e + ')');
                console.log(oE);
                var data = oE.data;
                if (oE.code == 0) {
                    //回款流程制单日期
                    $('.tanceng .ven_pay_flow_edit_createtime').html(data['created_at']);
                    //回款流程名称
                    $('.tanceng .ven_pay_flow_edit_name').val(data['name']);
                    //回款阶段
                    var venPayFlowEditStepsList = '';
                    var venPayFlowEditStepsContents = '';
                    if(data['steps'].length == 0){
                        venPayFlowEditStepsList = '<li><div><span class="xslc_setul_1">阶段<cite>1</cite></span><div class="xslc_setul_5"><input type="text" onfocus="fn_focus(this);" onblur="fn_blur(this);" onkeydown="value=value.replace(/[^\-?\\d.]/g,\'\')" onkeyup="value=value.replace(/[^\-?\\d.]/g,\'\')"><i>%</i></div><div class="xslc_setul_5"><input type="text" onfocus="fn_focus(this);" onblur="fn_blur(this);" onkeydown="value=value.replace(/[^\-?\\d.]/g,\'\')" onkeyup="value=value.replace(/[^\-?\\d.]/g,\'\')"><i>天</i></div><div class="xslc_setul_5"><input type="text" onfocus="fn_focus(this);" onblur="fn_blur(this);" onkeydown="value=value.replace(/[^\-?\\d.]/g,\'\')" onkeyup="value=value.replace(/[^\-?\\d.]/g,\'\')"><i>天</i></div><div class="xslc_setul_5"><input type="text" onfocus="fn_focus(this);" onblur="fn_blur(this); "onkeydown="value=value.replace(/[^\-?\\d.]/g,\'\')" onkeyup="value=value.replace(/[^\-?\\d.]/g,\'\')"><i>%</i></div><div class="xslc_setul_4"><button class="hklc_setulAddli but_green">+</button><button class="hklc_setuldelli but_red">-</button></div></div></li>';
                        venPayFlowEditStepsContents = ' <div class="t_textinput t_textarea">\
                            <div class="t_left"><i class="c_r">*</i>阶段<cite>1</cite>要求</div>\
                            <div class="t_right"><textarea class="txt_normal" onfocus="fn_focus(this);" onblur="fn_blur(this);">请填写此阶段对销售人员的要求，以便销售人员更好的执行</textarea></div>\
                        </div>\
                        <div class="vendition_xslcss"><input type="checkbox"/><span>本阶段提前</span><input type="text" onfocus="fn_focus(this);" onblur="fn_blur(this);"/><span>天时提醒销售人员执行</span>\
                            </div>\
                            </div>'
                    }else{
                        $.each(data['steps'], function (i, v) {
                            venPayFlowEditStepsList += '<li><div><span class="xslc_setul_1">阶段<cite>' + (i + 1) + '</cite></span><div class="xslc_setul_5"><input type="text" value="' + v['pay_rate'] + '" onfocus="fn_focus(this);" onblur="fn_blur(this);" onkeydown="value=value.replace(/[^\-?\\d.]/g,\'\')" onkeyup="value=value.replace(/[^\-?\\d.]/g,\'\')"><i>%</i></div><div class="xslc_setul_5"><input type="text" value="' + v['segment'] + '" onfocus="fn_focus(this);" onblur="fn_blur(this);" onkeydown="value=value.replace(/[^\-?\\d.]/g,\'\')" onkeyup="value=value.replace(/[^\-?\\d.]/g,\'\')"><i>天</i></div><div class="xslc_setul_5"><input type="text" value="' + v['overdue'] + '" onfocus="fn_focus(this);" onblur="fn_blur(this);" onkeydown="value=value.replace(/[^\-?\\d.]/g,\'\')" onkeyup="value=value.replace(/[^\-?\\d.]/g,\'\')"><i>天</i></div><div class="xslc_setul_5"><input type="text" value="' + v['deduct_rate'] + '" onfocus="fn_focus(this);" onblur="fn_blur(this);" onkeydown="value=value.replace(/[^\-?\\d.]/g,\'\')" onkeyup="value=value.replace(/[^\-?\\d.]/g,\'\')"><i>%</i></div><div class="xslc_setul_4"><button class="hklc_setulAddli but_green">+</button><button class="hklc_setuldelli but_red">-</button></div></div></li>'
                            venPayFlowEditStepsContents += '<div>\
                                                            <div class="t_textinput t_textarea">\
                                                            <div class="t_left"><i class="c_r">*</i>阶段<cite>' + (i + 1) + '</cite>要求</div>\
                                                            <div class="t_right"><textarea class="txt_normal ven_pay_flow_edit_steps_content_textarea" onfocus="fn_focus(this);" onblur="fn_blur(this);">' + v['content'] + '</textarea></div>\
                                                        </div>\
                                                        <div class="vendition_xslcss"><input type="checkbox" class="ven_pay_flow_edit_remind_checkbox" ' + (v['remind'] == "1" ? "checked" : "") + '/><span>本阶段提前</span><input type="text" ' + (v['remind'] == "1" ? "" : "disabled") + ' value="' + (v['remind'] == "1" ? (v["days"]) : "") + '" onfocus="fn_focus(this);" onblur="fn_blur(this);"/><span>天时提醒销售人员执行</span>\
                                                            </div>\
                                                        </div>'
                        });
                    }

                    $('.tanceng .ven_pay_flow_edit_steps').html(venPayFlowEditStepsList);
                    $('.tanceng .ven_pay_flow_edit_steps_content').html(venPayFlowEditStepsContents);
                    //提醒选中状态切换
                    $.each($('.tanceng .ven_pay_flow_edit_steps_content .ven_pay_flow_edit_remind_checkbox'), function (i, v) {
                        $('.tanceng .ven_pay_flow_edit_steps_content .ven_pay_flow_edit_remind_checkbox').live('click', function () {
                            if ($(this).attr('checked') == 'checked') {
                                $(this).siblings('input:text').attr('disabled', null);
                            } else {
                                $(this).siblings('input:text').val('').attr('disabled', 'disabled');
                            }
                        })
                    })
                    // 部门
                    var venPayFlowEditDeptList = '';
                    if(data['dept_list'].slice(data['dept_list'].length-1) == ','){
                        data['dept_list'] = data['dept_list'].slice(0, data['dept_list'].length-1)
                    }
                    var venSellFlowEditDeptChosenArr = getDataArr(data['dept_list'], data['dept_name']);
                    $.each(venSellFlowEditDeptChosenArr, function (i, v) {
                        venPayFlowEditDeptList += '<li deptchosenid="' + v['title'] + '">' + v['val'] + ' <i></i></li>'
                    });
                    $('.tanceng .ven_pay_flow_edit_dept_list').html(venPayFlowEditDeptList);

                } else {
                    alert(oE.msg)
                }
            }
        })
    }
    //新建/编辑回款流程添加部门
    function venPayFlowChooseDept(){
        $.ajax({
            url: SERVER_URL + '/dept/list',
            type: 'GET',
            data: {
                token: token,
                pid: 0
            },
            success: function (e) {
                // 将返回值转换为json对象
                var oE = eval("(" + e + ")");
                console.log(oE);
                var deep = 0;
                $('.tanceng .ven_pay_flow_dept_list').html(tree_list_choose_dept(oE.rows, deep));
                // 所有分类图标样式控制
                if ($('i.ven_pay_flow_dept_list').children().length == 0) {
                    $('li.left_all span.icon_open').addClass('personOth')
                }
                // 下级部门样式控制
                for (var i = 0, liLeft1 = $('.tanceng .ven_pay_flow_dept_list li.left_1').length; i < liLeft1; i++) {
                    if ($('.tanceng .ven_pay_flow_dept_list li.left_1').eq(i).next('ul').length == 0) {
                        $('.tanceng .ven_pay_flow_dept_list li.left_1').eq(i).find('span.icon_open').addClass('personOth');
                        $('.tanceng .ven_pay_flow_dept_list li.left_1').eq(i).find('span.personOth').closest('li').addClass('deptChild')
                    }
                }
                //选择部门左侧选择
                $('.tanceng .ven_pay_flow_dept_list ul .deptChild').die('click').live('click', function () {
                    if($(this).find('em').hasClass('on')){
                        $('.tanceng .ven_pay_flow_dept_chosen').find('li[rid=' + $(this).attr('deptchosenid') + ']').remove()
                        $(this).find('span.list_check em').removeClass('on')
                    }else{
                        $('.tanceng .ven_pay_flow_dept_chosen').append('<li rid="' + $(this).attr('deptchosenid') + '"><span>' + $(this).children('.list_msg').html() + '</span><i class="list_choose_delete"></i></li>');
                        $(this).find('span.list_check em').addClass('on')
                    }
                });
                //选择部门右侧删除
                $('i.list_choose_delete').live('click', function () {
                    $(this).closest('li').remove();
                    $('.tanceng .ven_pay_flow_dept_list ul .deptChild[deptchosenid = "' + $(this).closest('li').attr('rid') + '"]').find('em').removeClass('on');
                });
                //新建>选择部门确认
                $('.tanceng .ven_pay_flow_create_choose_dept_save').die('click').live('click', function(){
                    venPayFlowCreateData.dept_list = '';
                    venPayFlowEditData.dept_list = '';
                    var deptChosen = '';
                    $.each($('.tanceng .ven_pay_flow_dept_chosen').find('li'), function(i, v){
                        deptChosen += '<li deptchosenid="'+ $('.tanceng .ven_pay_flow_dept_chosen').find('li').eq(i).attr('rid') +'">'+$('.tanceng .ven_pay_flow_dept_chosen').find('li').eq(i).text()+' <i></i></li>'
                        venPayFlowCreateData.dept_list +=$('.tanceng .ven_pay_flow_dept_chosen').find('li').eq(i).attr('rid') + ','
                        venPayFlowEditData.dept_list +=$('.tanceng .ven_pay_flow_dept_chosen').find('li').eq(i).attr('rid') + ','
                    });
                    $('.tanceng .ven_pay_flow_create_add_dept_list').html(deptChosen);
                    $('.tanceng .ven_pay_flow_edit_dept_list').html(deptChosen);
                    $(this).parents('.dialog_box').remove()
                })
            }
        })
    }
    //编辑回款流程 > 选择部门
    $('.tanceng .ven_pay_flow_edit_choose_dept').live('click', function(){
        venPayFlowChooseDept()
    })
    //编辑回款流程 > 提交
    $('.tanceng .ven_pay_flow_edit_submit').live('click', function(){
        //编辑回款流程名称
        if ($('.tanceng .ven_pay_flow_edit_name').val() == '请输入回款流程名称' || $('.tanceng .ven_pay_flow_edit_name').val() == null) {
            alert('请输入回款流程名称');
            return
        } else {
            venPayFlowEditData.name = $('.tanceng .ven_pay_flow_edit_name').val()
        }
        //编辑回款流程阶段获取值
        venPayFlowEditData.steps = [];
        $.each($('.tanceng .ven_pay_flow_edit_steps li'), function (i, v) {
            //判断回款率和回款周期是否填入
            if ($('.tanceng .ven_pay_flow_edit_steps li').eq(i).find('input:text').eq(0).val() == '') {
                alert('请输入阶段 ' + (i + 1) + ' 回款率');
                return false;
            } else if ($('.tanceng .ven_pay_flow_edit_steps li').eq(i).find('input:text').eq(1).val() == '') {
                alert('请输入阶段 ' + (i + 1) + ' 回款周期');
                return false;
            }
            //判断超出周期扣除提成金额比例是否选中
            var venPayFlowOverTime = 0;
            var venPayFlowOverPerc = 0;
            if ($('.tanceng .ven_pay_flow_edit_over_checkbox').attr('checked') == 'checked') {
                //判断超出时间和超期扣除比例是否填写
                if ($('.tanceng .ven_pay_flow_edit_steps li').eq(i).find('input:text').eq(2).val() == null || $('.tanceng .ven_pay_flow_edit_steps li').eq(i).find('input:text').eq(2).val() == '') {
                    alert('请输入阶段 ' + (i + 1) + ' 超期时间');
                    return false;
                } else if ($('.tanceng .ven_pay_flow_edit_steps li').eq(i).find('input:text').eq(3).val() == null || $('.tanceng .ven_pay_flow_edit_steps li').eq(i).find('input:text').eq(3).val() == '') {
                    alert('请输入阶段 ' + (i + 1) + ' 超期扣除比例');
                    return false;
                } else {
                    venPayFlowOverTime = $('.tanceng .ven_pay_flow_edit_steps li').eq(i).find('input:text').eq(2).val();
                    venPayFlowOverPerc = $('.tanceng .ven_pay_flow_edit_steps li').eq(i).find('input:text').eq(3).val();
                }
            } else {
                venPayFlowOverTime = 0;
                venPayFlowOverPerc = 0;
            }
            //判断阶段要求
            var venPayFlowEditStepsContTextarea = '';
            if ($('.tanceng .ven_pay_flow_edit_steps_content').find('textarea.ven_pay_flow_edit_steps_content_textarea').eq(i).val() == '请填写此阶段对销售人员的要求，以便销售人员更好的执行') {
                alert('请输入阶段 ' + (i + 1) + ' 阶段要求');
                return false;
            } else {
                venPayFlowEditStepsContTextarea = $('.tanceng .ven_pay_flow_edit_steps_content').find('textarea.ven_pay_flow_edit_steps_content_textarea').eq(i).val()
            }
            //判断是否提醒
            var venPayFlowEditRemind = null;
            var venPayFlowEditRemindDays = null;
            if ($('.tanceng .ven_pay_flow_edit_steps_content').children().eq(i).find('input:checkbox').attr('checked') == 'checked') {
                if ($('.tanceng .ven_pay_flow_edit_steps_content').children().eq(i).find('input:text').val() == '') {
                    alert('请输入阶段 ' + (i + 1) + ' 提醒提前天数');
                    return false
                } else {
                    venPayFlowEditRemind = 1;
                    venPayFlowEditRemindDays = $('.tanceng .ven_pay_flow_edit_steps_content').children().eq(i).find('input:text').val()
                }
            } else {
                venPayFlowEditRemind = 0;
                venPayFlowEditRemindDays = 0;
            }
            venPayFlowEditData.steps.push({
                id: 0,
                name: '',
                segment: $('.tanceng .ven_pay_flow_edit_steps li').eq(i).find('input:text').eq(1).val(),    // 周期
                pay_rate: $('.tanceng .ven_pay_flow_edit_steps li').eq(i).find('input:text').eq(0).val(),   // 回款率
                overdue: venPayFlowOverTime,    //  过期时间（单位天）
                deduct_rate: venPayFlowOverPerc,    //  超出周期扣除提成金额比例	0-100
                content: venPayFlowEditStepsContTextarea,    //   内容
                remind: venPayFlowEditRemind,      //  是否提醒	0不提醒1提醒
                days: venPayFlowEditRemindDays,        //	提醒激活的天数
                sort: 0         //	序号
            });
        });
         //选择部门
        venPayFlowEditData.dept_list = '';
        $.each($('.tanceng .ven_pay_flow_edit_dept_list').children(), function (i, v) {
            venPayFlowEditData.dept_list += $('.tanceng .ven_pay_flow_edit_dept_list').children().eq(i).attr('deptchosenid') + ','
        });
        if (venPayFlowEditData.dept_list == '') {
            alert('请选择部门');
            return false;
        }
        $.ajax({
            url: SERVER_URL + '/customer-pay-flow/add',
            type: 'POST',
            data: venPayFlowEditData,
            success: function (e) {
                var oE = eval('(' + e + ')');
                console.log(oE);
                if (oE.code == 0) {
                    alert('编辑成功');
                    $('.tanceng').children().remove();
                    $('.tanceng').css('display', 'none');
                    getPayFlowList();
                } else {
                    alert(oE.msg)
                }
            }
        });
    })

});
