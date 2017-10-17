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
    //token = Admin.get_token();
    token = '2017052516045457073-1-1';
    uid = Admin.get_uid();
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

    // 定义客户拜访参数
    var customVisitData = {
        token: token,
        page: 1, //页面
        num: 10, //每页条数
        list_type: '', //查询类型：空是所有，team团队拜访 my我的拜访
        thetype: '', //拜访类型 空是所有 0电话拜访1外出2网络3其他4出差拜访
        key: '', //关键字
        dept: '', //部门id
        creater_id: '', //创建人id
        owner_id: '', //负责人id
        visited_at: '', //拜访时间
        status: ''  //状态。空是所有，0是启用 1停用
    };

    // 定义选择查看项
    var venCusVisitLookAbledField = [
        {'index': null, 'field': '客户联系人'},
        {'index': null, 'field': '拜访产品'},
        {'index': null, 'field': '创建人'}
    ];
    likShow('#ven_custom_visit_table', venCusVisitLookAbledField, '#ven_custom_visit_look_ul', '#ven_custom_visit_look_save', '#ven_custom_visit_look_reset');

    getCustomVisitList();

    // 获取客户拜访列表
    function getCustomVisitList() {
        $.ajax({
            url: SERVER_URL + '/customer-visit/list',
            type: 'GET',
            data: customVisitData,
            success: function (e) {
                // 将返回值转换为json对象
                var oE = eval("(" + e + ")");
                if (oE.code == 0) {
                    //获取datalist
                    var datalist = oE.datalist;
                    if (datalist.length == 0) {
                        $('.ven_custom_visit_nodata_box').removeClass('none');
                        $('.ven_custom_visit_handle').addClass('none');
                    } else {
                        $('.ven_custom_visit_nodata_box').addClass('none');
                        $('.ven_custom_visit_handle').removeClass('none');
                    }
                    //字符串拼接
                    var customVisitHtml = '';
                    $.each(datalist, function (i, v) {
                        // 客户联系人
                        var customVisitCont = '';
                        if (v['contacts'] != null) {
                            $.each(v['contacts'], function (i, v) {
                                customVisitCont += v['name'] + '、'
                            })
                        }
                        // 拜访产品
                        var customVisitProduct = '';
                        if (v['product'] != null) {
                            $.each(v['product'], function (i, v) {
                                customVisitProduct += v['name'] + '、'
                            })
                        }
                        customVisitHtml += '<tr vencustomvisitid="' + v['id'] + '">\
                            <td>' + l_dbl(i + 1) + '</td>\
                            <td>' + (datalist[i]['name']) + '</td>\
                            <td>' + (datalist[i]['thetype_name']) + '</td>\
                            <td>' + (datalist[i]['visited_at'].split(' ')[0]) + '</td>\
                            <td>' + (datalist[i]['owner_name']) + '</td>\
                            <td>' + (customVisitCont.slice(0, customVisitCont.length - 1)) + '</td>\
                            <td>' + (customVisitProduct.slice(0, customVisitProduct.length - 1)) + '</td>\
                            <td>' + (datalist[i]['uname']) + '</td>\
                            <td>' + (datalist[i]['created_at'].split(' ')[0]) + '</td>\
                            <td><button class="but_cancel but_mix r_sidebar_btn but_look ven_custom_visit_look" name="xs_gjbf_right">查看</button><button class="but_mix but_exit val_dialog ven_custom_visit_edit" name="xs_fzbf_exit">编辑</button><button class="but_mix but_r val_dialog ven_custom_visit_del_btn" name="vendition_khbf_sc">删除</button></td>\
                        </tr>';
                    });
                    //客户拜访数据渲染
                    $('#ven_custom_visit_list').html(customVisitHtml);
                }
                //分页
                list_table_render_pagination('.ven_custom_visit_all_page', customVisitData, getCustomVisitList, oE.totalcount, datalist.length);
                $('#ven_custom_visit_look_save').trigger('click')

            }
        });
        //搜索结果条数
        venCustomVisitSearchNum();
    }

    //刷新列表
    $('#ven_custom_visit_refresh').live('click', function () {
        customVisitData = {
            token: token,
            page: 1, //页面
            num: 10, //每页条数
            list_type: '', //查询类型：空是所有，team团队拜访 my我的拜访
            thetype: '', //拜访类型 空是所有 0电话拜访1外出2网络3其他4出差拜访
            key: '', //关键字
            dept: '', //部门id
            creater_id: '', //创建人id
            owner_id: '', //负责人id
            visited_at: '', //拜访时间
            status: ''  //状态。空是所有，0是启用 1停用
        };
        $('#ven_custom_visit_searKey').val('搜索成员/部门/手机等').css('color', '#CCCCCC');
        $('#ven_custom_visit_search_name_inp').val('客户名称').css('color', '#CCCCCC');
        $('#ven_custom_visit_search_thetype_inp').val('拜访类型').css('color', '#CCCCCC');
        $('#ven_custom_visit_search_uname_inp').val('创建人').css('color', '#CCCCCC');
        $('#ven_custom_visit_search_owner_inp').val('负责人').css('color', '#CCCCCC');
        //getCustomVisitList();
        $('#ven_custom_visit_searAll').trigger('click')
    });

    // 客户拜访查看全部
    $('#ven_custom_visit_searAll').live('click', function () {
        customVisitData.list_type = '';
        getCustomVisitList();
    });
    //客户拜访查看团队拜访
    $('#ven_custom_visit_searTeam').live('click', function () {
        customVisitData.list_type = 'team';
        getCustomVisitList();
    });
    //客户拜访查看我的拜访
    $('#ven_custom_visit_searMine').live('click', function () {
        customVisitData.list_type = 'my';
        getCustomVisitList();
    });
    //搜索关键字
    $('#ven_custom_visit_searKey_btn').live('click', function () {
        if ($('#ven_custom_visit_searKey').val() == '搜索成员/部门/手机等') {
            alert('请输入搜索关键字');
        } else {
            customVisitData.key = $('#ven_custom_visit_searKey').val();
            getCustomVisitList();
        }
    });

    //高级搜索 控制下拉框
    venCustomVisitSearch();
    function venCustomVisitSearch() {
        $.ajax({
            url: SERVER_URL + '/customer-visit/list',
            type: 'GET',
            data: {token: token},
            success: function (e) {
                // 将返回值转换为json对象
                var oE = eval("(" + e + ")");
                if (oE.code == 0) {
                    //获取datalist
                    var datalist = oE.datalist;
                    //定义高级搜索字段
                    //高级搜索 客户名称
                    var sSearchCusNameUl = '';
                    //高级搜索 负责人名字 字符串
                    var searchOwnerName = '';
                    //高级搜索 拜访产品 字符串
                    var searchOwnerName = '';
                    //高级搜索 创建人名字 字符串
                    var searchUnameUl = '';
                    // 定义高级搜索数组
                    //高级搜索 负责人 数组
                    var searchOwnerArr = [];
                    //高级搜索 创建人 数组
                    var searchUnameArr = [];
                    //高级搜索遍历
                    $.each(datalist, function (i, v) {
                        //高级搜索 客户名称
                        sSearchCusNameUl += '<li>' + v['name'] + '</li>';
                        //提取负责人数组
                        searchOwnerArr.push({owner: v['owner'], ownername: v['owner_name']});
                        //提取创建人数组
                        searchUnameArr.push({uid: v['uid'], uname: v['uname']});
                    });
                    //高级搜索 客户名称
                    $('#ven_custom_visit_search_cus_name_ul').html(sSearchCusNameUl);
                    //高级搜索 负责人
                    $.each(getJsonArr(searchOwnerArr), function (i, v) {
                        searchOwnerName += '<li searchOwnerId="' + v['owner'] + '">' + v['ownername'] + '</li>';
                    });
                    //高级搜索 创建人
                    $.each(getJsonArr(searchUnameArr), function (i, v) {
                        searchUnameUl += '<li searchUid="' + v['uid'] + '">' + v['uname'] + '</li>'
                    });
                    $('#ven_custom_visit_search_uname_ul').html(searchUnameUl);
                    // 高级搜索 负责人
                    $('#ven_custom_visit_search_owner_ul').html(searchOwnerName);
                }
            }
        })
    }

    // 搜索客户名称
    $('#ven_custom_visit_search_cus_name_ul li').live('click', function () {
        customVisitData.key = $(this).html();
        getCustomVisitList();
    });
    // 搜索拜访类型
    $('#ven_custom_visit_search_thetype_ul li').live('click', function () {
        customVisitData.thetype = $(this).index();
        getCustomVisitList();
    });
    //搜索负责人
    $('#ven_custom_visit_search_owner_ul li').live('click', function () {
        customVisitData.owner_id = $(this).attr('searchOwnerId');
        getCustomVisitList();
    });
    //搜索创建人
    $('#ven_custom_visit_search_uname_ul li').live('click', function () {
        customVisitData.creater_id = $(this).attr('searchUid');
        getCustomVisitList();
    });

    //高级搜索 控制搜索条数
    venCustomVisitSearchNum();
    function venCustomVisitSearchNum() {
        $.ajax({
            url: SERVER_URL + '/customer-visit/list',
            type: 'GET',
            data: {
                token: token,
                key: customVisitData.key, // 关键字
                thetype: customVisitData.thetype, //拜访类型 空是所有 0电话拜访1外出2网络3其他4出差拜访
                list_type: customVisitData.list_type,
                owner_id: customVisitData.owner_id, // 负责人id
                creater_id: customVisitData.creater_id, // 创建人id
                status: customVisitData.status // 状态。空是所有，0是使用中 1停用
            },
            success: function (e) {
                // 将返回值转换为json对象
                var oE = eval("(" + e + ")");
                if (oE.code == 0) {
                    //搜索总条数
                    $('#ven_custom_visit_search_total').html(oE.totalcount);
                }
            }
        })
    }

    //删除操作
    $('.ven_custom_visit_del_btn').live('click', function () {
        $('#ven_custom_visit_del_id').val($(this).closest('tr').attr('vencustomvisitid'));
    });
    $('.ven_cus_visit_del').live('click', function () {
        $.ajax({
            url: SERVER_URL + '/customer-visit/del',
            type: 'POST',
            data: {
                token: token,
                visit_id: $('#ven_custom_visit_del_id').val()
            },
            success: function (e) {
                // 将返回值转换为json对象
                var oE = eval("(" + e + ")");
                if (oE.code == 0) {
                    $('.tanceng').css('display', 'none')
                    getCustomVisitList()
                } else {
                    alert('操作失败')
                }
            }
        })
    });

    //查看操作
    var venCustomVisitCurrentId = null;
    $('.ven_custom_visit_look').die('click').live('click', function () {
        venCustomVisitCurrentId = $(this).closest('tr').attr('vencustomvisitid');
        $('#ven_custom_visit_look_first').trigger('click');
        customVisitLook(venCustomVisitCurrentId);
        customVisitFeedback(venCustomVisitCurrentId);
    });
    //查看操作 函数
    function customVisitLook(venCustomVisitCurrentId) {
        $.ajax({
            url: SERVER_URL + '/customer-visit/info',
            type: 'GET',
            data: {
                token: token,
                uid: uid,
                visit_id: venCustomVisitCurrentId
            },
            success: function (e) {
                // 将返回值转换为json对象
                var oE = eval("(" + e + ")");
                if (oE.code == 0) {
                    var datalist = oE.data;
                    $('#ven_custom_visit_look_contacts_num').html(datalist['contacts'].length);
                    //拜访状态判断
                    var visitStatus = '';
                    if (datalist['status'] == 0) {
                        visitStatus = '未拜访';
                        $('.custom_visit_look_finished').addClass('none');
                        $('#customVisitFinishBtn').removeClass('none');
                    } else if (datalist['status'] == 1) {
                        visitStatus = '已拜访';
                        $('.custom_visit_look_finished').addClass('none');
                        $('#customVisitFinishBtn').removeClass('none');
                    } else if (datalist['status'] == 2) {
                        visitStatus = '完成拜访';
                        $('.custom_visit_look_finished').removeClass('none');
                        $('#customVisitFinishBtn').addClass('none');
                    }
                    $('.ven_custom_visit_status').html(visitStatus);
                    //用户名称
                    $('#ven_custom_visit_cusname').html(datalist['name']);
                    //拜访类型判断
                    var visitThetype = '';
                    if (datalist['thetype'] == 0) {
                        visitThetype = '外出拜访'
                    } else if (datalist['thetype'] == 1) {
                        visitThetype = '电话拜访'
                    } else if (datalist['thetype'] == 2) {
                        visitThetype = '网络拜访'
                    } else if (datalist['thetype'] == 3) {
                        visitThetype = '出差拜访'
                    } else if (datalist['thetype'] == 4) {
                        visitThetype = '其它'
                    }
                    $('#ven_custom_visit_thetype').html(visitThetype);
                    //拜访日期
                    $('#ven_custom_visit_time').html(datalist['visited_at'].split(' ')[0]);
                    //负责人
                    $('#ven_custom_visit_owner').html(datalist['owner_name']);
                    //签到时间
                    $('#ven_custom_visit_signtime').html(datalist['sign_time']);
                    //签到地点
                    $('#ven_custom_visit_signaddress').html(datalist['sign_address']);
                    //创建人
                    $('#ven_custom_visit_uname').html(datalist['uname']);
                    //创建时间
                    $('#ven_custom_visit_createtime').html(datalist['created_at']);
                    //客户联系人
                    var sContacts = '';
                    $.each(datalist['contacts'], function (i, v) {
                        sContacts += '<div class="d-r-t-h" contactid="' + v['id'] + '">\
                        <div class="xs_gjbf_rightkhlxr clearfix xs_khlxr">\
                            <div class="xs_khlxr_tit clearfix work_sp_fqsp_h3 ">\
                            <p class="left" style="font-weight: bold;">客户联系人<span class="c_r">(' + (i + 1) + ')</span></p>\
                            <div class="xs_khlxr_titBut right vendition_khbf_khlxr">\
                            <button class="but_mix val_dialog but_exit ven_custom_visit_edit_contact_btn" name="xs_fzbf_exitkhlxr">编辑</button><button class="but_mix but_r val_dialog ven_custom_visit_contact_del_btn" name="ven_khbf_sckhlxr">删除</button>\
                            </div>\
                            </div>\
                            </div>\
                            <p class="l-s-x">姓名：<span>' + v['name'] + '</span></p>\
                        <p class="l-s-x">职务<span>' + v['job'] + '</span></p>\
                            <p class="l-s-x">电话：<span>' + v['tel'] + '</span></p>\
                        <p class="l-s-x">邮箱：<span>' + v['email'] + '</span></p>\
                        </div>'
                    });
                    $('#ven_custom_visit_look_contacts_list').html(sContacts);
                    //拜访商品
                    /*var sProducts = '';
                     $.each(datalist['product'], function (i, v) {
                     sProducts += '<div class="d-r-t-h" visitproductid="' + v['id'] + '" style="border-bottom:none;">\
                     <div class="xs_gjbf_rightkhlxr clearfix">\
                     <div class="xs_gzbf_bfsptit clearfix" style="border-bottom: 1px solid #e6e6e6;height: 60px;">\
                     <p class="left">' + v['code_sn'] + ',&nbsp;&nbsp;&nbsp;' + v['name'] + '</p>\
                     <div class="xs_khlxr_titBut right vendition_khbf_khlxr">\
                     <button class="val_dialog but_small but_r ven_customer_visit_product_del" name="vendition_khbf_sc_visit_product">删除</button>\
                     </div>\
                     </div>\
                     </div>\
                     </div>'
                     });
                     $('#ven_custom_visit_look_product_list').html(sProducts)*/

                } else {
                    alert('操作失败')
                }
            }
        });
    }

    //查看>删除
    $('#ven_custom_visit_look_del').live('click', function () {
        $('.slider_head_close').trigger('click');
        //把当前id存起来，删除用
        $('#ven_custom_visit_del_id').val(venCustomVisitCurrentId);
    });
    //查看>完成拜访
    $('#customVisitFinishBtn').live('click', function () {
        $.ajax({
            url: SERVER_URL + '/customer-visit/finished',
            type: 'POST',
            data: {
                token: token,
                uid: uid,
                visit_id: venCustomVisitCurrentId
            },
            success: function (e) {
                // 将返回值转换为json对象
                var oE = eval("(" + e + ")");
                if (oE.code == 0) {
                    $('.custom_visit_look_finished').removeClass('none');
                    $('#customVisitFinishBtn').addClass('none');
                }
            }
        });
    });
    //拜访记录函数
    function customVisitFeedback(venCustomVisitCurrentId) {
        $.ajax({
            url: SERVER_URL + '/customer-visit/feedback',
            type: 'GET',
            data: {
                token: token,
                uid: uid,
                visit_id: venCustomVisitCurrentId
            },
            success: function (e) {
                // 将返回值转换为json对象
                var oE = eval("(" + e + ")");
                var datalist = oE.datalist;
                if (oE.code == 0) {
                    $("#ven_custom_visit_look_feedback_num").html(oE.totalcount);
                    //拜访记录
                    var feedback = '';
                    $.each(datalist, function (i, v) {
                        var sCommit = '';
                        $.each(v['commit_log']['datalist'], function (i2, v2) {
                            sCommit += '<div class="v_rsp_item rsp_item" commitid="' + v2['id'] + '">\
                                        <div class="work_rsp_text rsp_text" style="width: 326px;">\
                                        <img class="tx" src="' + v2['face'] + '" title="头像" style="margin-top: 4px;">\
                                        <div class="work_wfqd_pl">\
                                        <p><span class="c_3 m_right_10">' + v2['uname'] + '</span>' + v2['created_at'] + '</p>\
                                        <h3 class="inline_block m_right_20" style="margin-top: 6px;">' + v2['content'] + '</h3>\
                                        </div>\
                                        <button class="but_normal right c_r work_but_sc val_dialog ven_custom_visit_look_commit_del_btn" style="margin-top: 27px;"name="ven_khbf_scpl">删除</button>\
                                        </div>\
                                        <div class="vendtion_hr" style="width: 260px;"></div>\
                                        </div>'
                        });
                        feedback += '<div class="work_report_exitBox work_report_date vendition_bfjl ven_custom_visit_feedback_box" name="report_all" feedbackid="' + v['id'] + '" style="margin-bottom:20px;">\
                            <div class="work_report_head">\
                            <div class="work_report_detHead clearfix inline_block" style="padding:0;">\
                            <span class="left m_top_5 m_left_5" style="background-image:url("' + v['face'] + '")"></span>\
                            <div class="work_report_personMsg left">\
                            <p>' + v['uname'] + '</p>\
                            <p>' + v['created_at'] + '</p>\
                        </div>\
                        </div>\
                        <div class="work_report_headBtn">\
                            <button class="but_small val_dialog but_exit ven_custom_visit_look_feedback_edit" name="xs_gjbf_bffk_edit">编辑</button><button class="but_small but_r val_dialog ven_custom_visit_feedback_del_btn" name="ven_khbf_scbffk">删除</button>\
                            </div>\
                            </div>\
                            <div class="work_report_det vendition_khbf1">\
                            <div class="work_report_detCon"\
                            <p>' + v['content'] + '</p>\
                        </div>\
                        <div class="work_report_upload vendition_khbf2">\
                            <img src="' + v['imgurl'] + '" alt="工作计划" class="val_dialog" name="vendition_khbf_imglist" style="border-radius: 3px;">\
                            </div>\
                            <div class="work_report_comment">\
                            <div class="work_report_commentBtn">\
                            <button class="but_small but_look right work_report_Comment" name="cs_khbf_Comment">评论 <i>(' + v['commit_log']['datalist'].length + ')</i></button>\
                            </div>\
                            <div style="margin-right:7px;">\
                            <!--评论-->\
                            <div class="work_report_commentCon" name="cs_khbf_Comment" style="display: none;padding-right:14px;">\
                            <em class="work_report_comment_icon" style="right:27px;"></em>\
                            <label class="inp_box clearfix" style="margin-top:0;">\
                            <input type="text" class="left xs_glbf_plInp2 ven_custom_visit_look_add_commit_inp" value="写评论" onfocus="fn_focus(this);" onblur="fn_blur(this);" >\
                            <button class="work_report_commentBut but_blue ven_custom_visit_look_add_commit_submit" style="margin-left:12px;">发送</button>\
                            </label>' + sCommit + '</div>\
                            </div>\
                            </div>\
                            </div>\
                            </div>'
                    });
                    $('#ven_custom_visit_look_feedback_list').html(feedback)
                } else {
                    alert('操作失败')
                }
            }
        })
    }

    //添加拜访反馈
    var addfeedbackData = {
        token: token,
        feedback_id: 0,
        visit_id: '',
        uid: uid,
        content: '',
        imgurl: ''
    };
    $('.tanceng .ven_custom_visit_look_feedback_add_submit').die('click').live('click', function () {
        addfeedbackData.visit_id = venCustomVisitCurrentId;
        if ($('.tanceng .ven_custom_visit_look_feedback_add_textarea').val() == '请输入拜访内容') {
            alert('请输入拜访内容');
            addfeedbackData.content = '';
            return false;
        } else {
            addfeedbackData.content = $('.tanceng .ven_custom_visit_look_feedback_add_textarea').val();
        }
        $.ajax({
            url: SERVER_URL + '/customer-visit/addfeedback',
            type: 'POST',
            data: addfeedbackData,
            success: function (e) {
                // 将返回值转换为json对象
                var oE = eval("(" + e + ")");
                if (oE.code == 0) {
                    $('.tanceng .dialog_box').remove();
                    $('.tanceng').css('display', 'none');
                    customVisitFeedback(venCustomVisitCurrentId);
                }
            }
        });
    });

    //编辑拜访反馈
    var editfeedbackData = {
        token: token,
        feedback_id: 0,
        visit_id: '',
        uid: uid,
        content: '',
        imgurl: ''
    };
    $('.ven_custom_visit_look_feedback_edit').live('click', function () {
        editfeedbackData.feedback_id = $(this).closest('.ven_custom_visit_feedback_box').attr('feedbackid');
        editfeedbackData.visit_id = venCustomVisitCurrentId;
    });
    $('.tanceng .ven_custom_visit_look_feedback_edit_submit').die('click').live('click', function () {
        if ($('.tanceng .ven_custom_visit_look_feedback_add_textarea').val() == '请输入拜访内容') {
            alert('请输入拜访内容');
            editfeedbackData.content = '';
            return false;
        } else {
            editfeedbackData.content = $('.tanceng .ven_custom_visit_look_feedback_add_textarea').val();
        }
        $.ajax({
            url: SERVER_URL + '/customer-visit/addfeedback',
            type: 'POST',
            data: editfeedbackData,
            success: function (e) {
                // 将返回值转换为json对象
                var oE = eval("(" + e + ")");
                if (oE.code == 0) {
                    $('.tanceng .dialog_box').remove();
                    $('.tanceng').css('display', 'none');
                    customVisitFeedback(venCustomVisitCurrentId);
                }
            }
        });
    });

    //删除拜访反馈
    var feedbackCurrentId = '';
    $('.ven_custom_visit_feedback_del_btn').die('click').live('click', function () {
        feedbackCurrentId = $(this).closest('.ven_custom_visit_feedback_box').attr('feedbackid');
    });
    $('.tanceng .ven_cus_visit_del_feedback_submit').die('click').live('click', function () {
        $.ajax({
            url: SERVER_URL + '/customer-visit/feedbackdel',
            type: 'GET',
            data: {
                token: token,
                id: feedbackCurrentId
            },
            success: function (e) {
                // 将返回值转换为json对象
                var oE = eval("(" + e + ")");
                if (oE.code == 0) {
                    $('.tanceng .dialog_box').remove();
                    $('.tanceng').css('display', 'none');
                    customVisitFeedback(venCustomVisitCurrentId);
                }
            }
        });
    });

    // 添加评论
    $('.ven_custom_visit_look_add_commit_submit').live('click', function () {
        var venCustomVisitLookFeedbackid = $(this).closest('.vendition_bfjl').attr('feedbackid');
        var venCustomVisitLookFeedbackCommitContent = $(this).prev('.ven_custom_visit_look_add_commit_inp').val();
        $.ajax({
            url: SERVER_URL + '/customer-visit/feedbackcommit',
            type: 'POST',
            data: {
                token: token,
                feedback_id: venCustomVisitLookFeedbackid,
                visit_id: venCustomVisitCurrentId,
                content: venCustomVisitLookFeedbackCommitContent
            },
            success: function (e) {
                // 将返回值转换为json对象
                var oE = eval("(" + e + ")");
                var datalist = oE.datalist;
                if (oE.code == 0) {
                    alert('评论成功');
                    customVisitFeedback(venCustomVisitCurrentId)
                } else {
                    alert('操作失败')
                }
            }
        })
    });
    //删除评论
    var currentCommitId = '';
    $('.ven_custom_visit_look_commit_del_btn').live('click', function () {
        currentCommitId = $(this).closest('.v_rsp_item').attr('commitid');
    });
    $('.tanceng .ven_cus_visit_del_commit_submit').live('click', function () {
        venCusVisitCommitDelFn(currentCommitId);
        customVisitFeedback(venCustomVisitCurrentId);
        $(this).closest('.dialog_box').remove('click');
        $('.tanceng').css('display', 'none');
    });
    //删除评论函数
    function venCusVisitCommitDelFn(commitid) {
        $.ajax({
            url: SERVER_URL + '/customer-visit/feedbackcommentdel',
            type: 'GET',
            data: {
                token: token,
                uid: uid,
                id: commitid
            },
            success: function (e) {
                // 将返回值转换为json对象
                var oE = eval("(" + e + ")");
                if (oE.code == 0) {
                }
            }
        });
    }

    //新建客户联系人
    var venCutVisitAddContactData = {
        token: token,
        visit_id: '',
        name: '',
        tel: '',
        job: '',
        email: ''
    };
    $('.tanceng .ven_custom_visit_add_contact_submit').live('click', function () {
        venCutVisitAddContactData.visit_id = venCustomVisitCurrentId;
        if ($('.tanceng .ven_custom_visit_add_contact_name').val() == '请输入联系人名称') {
            alert('请输入联系人名称');
            return false;
        } else {
            venCutVisitAddContactData.name = $('.tanceng .ven_custom_visit_add_contact_name').val();
        }
        if ($('.tanceng .ven_custom_visit_add_contact_tel').val() == '请输入联系人电话') {
            alert('请输入联系人电话');
            return false;
        } else {
            venCutVisitAddContactData.tel = $('.tanceng .ven_custom_visit_add_contact_tel').val();
        }
        if ($('.tanceng .ven_custom_visit_add_contact_job').val() == '请输入职务') {
            venCutVisitAddContactData.job = '';
        } else {
            venCutVisitAddContactData.job = $('.tanceng .ven_custom_visit_add_contact_job').val();
        }
        if ($('.tanceng .ven_custom_visit_add_contact_email').val() == '请输入邮箱') {
            venCutVisitAddContactData.email = '';
        } else {
            venCutVisitAddContactData.email = $('.tanceng .ven_custom_visit_add_contact_email').val();
        }
        $.ajax({
            url: SERVER_URL + '/customer-visit/addcontacts',
            type: 'POST',
            data: venCutVisitAddContactData,
            success: function (e) {
                // 将返回值转换为json对象
                var oE = eval("(" + e + ")");
                if (oE.code == 0) {
                    customVisitLook(venCustomVisitCurrentId);
                    $('.tanceng .dialog_box').remove();
                    $('.tanceng').css('display', 'none');
                }
            }
        });
    });
    //编辑客户联系人
    var venCutVisitEditContactData = {
        token: token,
        id: '',
        name: '',
        tel: '',
        job: '',
        email: ''
    };
    $('.ven_custom_visit_edit_contact_btn').live('click', function () {
        venCutVisitEditContactData.id = $(this).closest('.d-r-t-h').attr('contactid');
        $.ajax({
            url: SERVER_URL + '/customer-visit/infocontacts',
            type: 'GET',
            data: {
                token: token,
                id: venCutVisitEditContactData.id
            },
            success: function (e) {
                // 将返回值转换为json对象
                var oE = eval("(" + e + ")");
                if (oE.code == 0) {
                    var data = oE.data;
                    $('.tanceng .ven_custom_visit_edit_contact_name').val(data['name']);
                    $('.tanceng .ven_custom_visit_edit_contact_tel').val(data['tel']);
                    $('.tanceng .ven_custom_visit_edit_contact_job').val(data['job']);
                    $('.tanceng .ven_custom_visit_edit_contact_email').val(data['email']);
                }
            }
        });
    });
    $('.tanceng .ven_custom_visit_edit_contact_submit').live('click', function () {
        if ($('.tanceng .ven_custom_visit_edit_contact_name').val() == '请输入联系人名称') {
            alert('请输入联系人名称');
            return false;
        } else {
            venCutVisitEditContactData.name = $('.tanceng .ven_custom_visit_edit_contact_name').val();
        }
        if ($('.tanceng .ven_custom_visit_edit_contact_tel').val() == '请输入联系人电话') {
            alert('请输入联系人电话');
            return false;
        } else {
            venCutVisitEditContactData.tel = $('.tanceng .ven_custom_visit_edit_contact_tel').val();
        }
        if ($('.tanceng .ven_custom_visit_edit_contact_job').val() == '请输入职务') {
            venCutVisitEditContactData.job = '';
        } else {
            venCutVisitEditContactData.job = $('.tanceng .ven_custom_visit_edit_contact_job').val();
        }
        if ($('.tanceng .ven_custom_visit_edit_contact_email').val() == '请输入邮箱') {
            venCutVisitEditContactData.email = '';
        } else {
            venCutVisitEditContactData.email = $('.tanceng .ven_custom_visit_edit_contact_email').val();
        }
        $.ajax({
            url: SERVER_URL + '/customer-visit/updatecontacts',
            type: 'POST',
            data: venCutVisitEditContactData,
            success: function (e) {
                // 将返回值转换为json对象
                var oE = eval("(" + e + ")");
                if (oE.code == 0) {
                    customVisitLook(venCustomVisitCurrentId);
                    $('.tanceng .dialog_box').remove();
                    $('.tanceng').css('display', 'none');
                }
            }
        });
    });
    //删除客户联系人
    var currentContactId = null;
    $('.ven_custom_visit_contact_del_btn').live('click', function () {
        currentContactId = $(this).closest('.d-r-t-h').attr('contactid');
    });
    $('.tanceng .ven_cus_visit_contact_del_submit').live('click', function () {
        $.ajax({
            url: SERVER_URL + '/customer-visit/delcontacts',
            type: 'GET',
            data: {
                token: token,
                id: currentContactId
            },
            success: function (e) {
                // 将返回值转换为json对象
                var oE = eval("(" + e + ")");
                if (oE.code == 0) {
                    customVisitLook(venCustomVisitCurrentId);
                    $('.tanceng .dialog_box').remove();
                    $('.tanceng').css('display', 'none');
                }
            }
        });
    });

    //获取客户拜访中的拜访商品
    $('#ven_custom_visit_look_products_btn').die('click').live('click', function () {
        getVisitProductFn();
    });
    //获取拜访商品函数
    function getVisitProductFn() {
        $.ajax({
            url: SERVER_URL + '/customer-visit/goodlist',
            type: 'GET',
            data: {
                token: token,
                visit_id: venCustomVisitCurrentId
            },
            success: function (e) {
                // 将返回值转换为json对象
                var oE = eval("(" + e + ")");
                if (oE.code == 0) {
                    var data = oE.data;
                    //普通商品
                    var productArr = data['product'];
                    if (productArr.length == 0) {
                        $('#ven_custom_visit_look_product_list').css('display', 'none');
                    } else {
                        $('#ven_custom_visit_look_product_list').css('display', 'block');
                        var productHtml = '';
                        $.each(productArr, function (i, v) {
                            var productAttr = '';
                            $.each(v['attributes'], function (i2, v2) {
                                productAttr += v2['attr'] + '、'
                            });
                            productAttr = productAttr.slice(0, productAttr.length - 1);
                            productHtml += '<p class="l-s-x ven_custom_visit_look_product_del_box" visitproductid="' + v['id'] + '">' + v['name'] + ' ， ' + v['code_sn'] + ' ， ' + productAttr + ' ， ' + v['unit_name'] + '<span class="val_dialog c_r right ven_customer_visit_product_del" name="vendition_khbf_sc_visit_product" style="margin-right: 35px;">删除</span></p>';
                        });
                        $('#ven_custom_visit_look_product_list_box').html(productHtml);
                    }
                    //套餐商品
                    var packageArr = data['productPackage'];
                    if (packageArr.length == 0) {
                        $('#ven_custom_visit_look_package_list').css('display', 'none');
                    } else {
                        $('#ven_custom_visit_look_package_list').css('display', 'block');
                        var packageHtml = '';
                        $.each(packageArr, function (i, v) {
                            packageHtml += '<p class="l-s-x ven_custom_visit_look_product_del_box" visitproductid="' + v['id'] + '">' + v['name'] + ' ， ' + v['code_sn'] + '<span class="val_dialog c_r right ven_customer_visit_product_del" name="vendition_khbf_sc_visit_product" style="margin-right: 35px;">删除</span></p>';
                        });
                        $('#ven_custom_visit_look_package_list_box').html(packageHtml);
                    }
                    //普通商品
                    var settingArr = data['productSetting'];
                    if (settingArr.length == 0) {
                        $('#ven_custom_visit_look_setting_list').css('display', 'none');
                    } else {
                        $('#ven_custom_visit_look_setting_list').css('display', 'block');
                        var settingHtml = '';
                        $.each(settingArr, function (i, v) {
                            var settingId = v['id'];
                            $.ajax({
                                url: SERVER_URL + '/product-setting/loadsetting',
                                type: 'GET',
                                async: false,
                                data: {
                                    token: token,
                                    id: settingId
                                },
                                success: function (e) {
                                    // 将返回值转换为json对象
                                    var oE = eval("(" + e + ")");
                                    if (oE.code == 0) {
                                        var data = oE.data;
                                        var settingProductArr = data['setting_info'];
                                        var settingProductHtml = '';
                                        var newSettingArr = [];
                                        $.each(settingProductArr, function (i, v) {
                                            newSettingArr = newSettingArr.concat(v['list']);
                                        });
                                        $.each(newSettingArr, function (i, v) {
                                            settingProductHtml += '<p class="l-s-x">' + v['product_name'] + ' , ' + v['code_sn'] + ' , ' + v['unit_name'] + '<span class="val_dialog c_r right ven_customer_visit_product_del" name="vendition_khbf_sc_visit_product" style="margin-right: 35px;">删除</span></p>'
                                        });
                                        settingHtml += '<div class="ven_custom_visit_look_product_del_box" visitproductid="' + v['id'] + '"><h3 class="cont_title">' + v['name'] + '(配置商品)</h3>' + settingProductHtml + '</div>'
                                    }
                                }
                            });
                        });
                        $('#ven_custom_visit_look_setting_list_box').html(settingHtml);
                    }
                }
            }
        });
    }

    //添加拜访商品
    //定义获取参数
    cusVisitAddProductData = {
        token: token,
        key: '',
        page: 1,
        num: 10,
        cate_id: ''
    };
    $('#ven_custom_visit_look_product_add_btn').live('click', function () {
        $('.tanceng .ven_custom_visit_add_product_btn').trigger('click')
    });
    $('.tanceng .ven_custom_visit_add_product_btn').die('click').live('click', function () {
        cusVisitAddProductData = {
            token: token,
            key: '',
            page: 1,
            num: 10,
            cate_id: ''
        };
        cusVisitAddProductFn();
        $('.tanceng .ven_custom_visit_add_product_search_inp').val('搜索商品编号/商品名称等').css('color', '#ccc')
    });
    // 基本商品点击分类获取列表
    $('.tanceng .ven_customer_visit_look_product_add_sort_ul li').die('click').live('click', function () {
        cusVisitAddProductData.cate_id = $(this).attr('cussortid');
        cusVisitAddProductFn()
    });
    //基本商品列表
    function cusVisitAddProductFn() {
        //商品分类
        $.ajax({
            url: SERVER_URL + '/product-category/list',
            type: 'GET',
            data: {
                token: token,
                pid: 0
            },
            success: function (e) {
                // 将返回值转换为json对象
                var oE = eval("(" + e + ")");
                $('.tanceng .ven_customer_visit_look_product_add_sort_list').html(tree_list(oE.datalist));
                for (var i = 0; i < $('em.list_num_null').length; i++) {
                    $('em.list_num_null').eq(i).remove();
                    i--
                }
                // 所有分类图标样式控制
                if ($('.tanceng i.ven_customer_visit_look_product_add_sort_list').children().length == 0) {
                    $('.tanceng ul.hr_ul1').addClass('oth');
                    $('.tanceng li.hr_left_all span').addClass('oth')
                }
                // 下级分类图标样式控制
                for (var i = 0; i < $('.tanceng i.ven_customer_visit_look_product_add_sort_list li').length; i++) {
                    if ($('.tanceng i.ven_customer_visit_look_product_add_sort_list li').eq(i).next('ul').children().length == 0) {
                        $('.tanceng i.ven_customer_visit_look_product_add_sort_list li').eq(i).find('span').addClass('oth');
                        $('.tanceng i.ven_customer_visit_look_product_add_sort_list li').eq(i).parent('ul').addClass('oth')
                    }
                }
                $('.tanceng span.oth .list_num_null').remove();
                var aClassList = $('.tanceng .hr_ul1').find('li').filter('[class*="hr_left"]')
            }
        });
        $.ajax({
            url: SERVER_URL + '/product/list',
            type: 'GET',
            data: cusVisitAddProductData,
            success: function (e) {
                // 将返回值转换为json对象
                var oE = eval("(" + e + ")");
                if (oE.code == 0) {
                    //搜索总条数
                    $('.tanceng .ven_custom_visit_add_product_search_num').html(oE.totalcount);
                    var datalist = oE.datalist;
                    var productList = '';
                    $.each(datalist, function (i, v) {
                        productList += '<tr productid="' + v['id'] + '">\
                                            <td><input type="checkbox" name="cg_cgthd_xz"></td>\
                                            <td>' + v['code_sn'] + '</td>\
                                            <td>' + v['name'] + '</td>\
                                            <td>' + v['unit_name'] + '</td>\
                                            <td>' + v['format'] + '</td>\
                                            <td>品牌：<span>' + v[''] + '</span>&nbsp;&nbsp;&nbsp;类型：<span>' + v[''] + '</span></td>\
                                            <td>' + v['retail_price'] + '</td>\
                                        </tr>'
                    });
                    $('.tanceng .ven_customer_visit_look_product_add_goods_list').html(productList);
                    list_table_render_pagination('.tanceng .ven_customer_visit_look_product_add_goods_list_page', cusVisitAddProductData, cusVisitAddProductFn, oE.totalcount, datalist.length);
                } else {
                    alert(oE.msg)
                }
            }
        });
    }

    //套餐商品
    var cusVisitAddProductPackageData = null;
    $('.tanceng .ven_custom_visit_add_product_btn_ul li:nth-of-type(1)').die('click').live('click', function () {
        cusVisitAddProductPackageData = {
            token: token,
            page: 1,
            num: 10,
            key: ''
        };
        cusVisitAddProductPackageFn();
        $('.tanceng .ven_custom_visit_add_product_search_inp').val('搜索商品编号/商品名称等').css('color', '#ccc')
    });
    function cusVisitAddProductPackageFn() {
        $.ajax({
            url: SERVER_URL + '/product-package/list',
            type: 'GET',
            data: cusVisitAddProductPackageData,
            success: function (e) {
                // 将返回值转换为json对象
                var oE = eval("(" + e + ")");
                if (oE.code == 0) {
                    //搜索总条数
                    $('.tanceng .ven_custom_visit_add_product_search_num').html(oE.totalcount);
                    var datalist = oE.datalist;
                    var productList = '';
                    $.each(datalist, function (i, v) {
                        productList += '<tr packageproductid="' + v['id'] + '">\
                            <td><input type="checkbox" name="xs_khbf_xztcsp"></td>\
                            <td>' + v['code_sn'] + '</td>\
                            <td>' + v['name'] + '</td>\
                            <td>' + v['product_name'] + '</td>\
                        </tr>'
                    });
                    $('.tanceng .ven_custom_visit_add_product_package_list').html(productList);
                    list_table_render_pagination('.tanceng .ven_customer_visit_look_product_add_package_list_page', cusVisitAddProductPackageData, cusVisitAddProductPackageFn, oE.totalcount, datalist.length);
                }
            }
        });
    }

    //配置商品
    var cusVisitAddProductConfigData = null;
    $('.tanceng .ven_custom_visit_add_product_btn_ul li:nth-of-type(2)').die('click').live('click', function () {
        cusVisitAddProductConfigData = {
            token: token,
            page: 1,
            num: 10,
            key: ''
        };
        cusVisitAddProductConfigFn();
    });
    function cusVisitAddProductConfigFn() {
        $.ajax({
            url: SERVER_URL + '/product-setting/list',
            type: 'GET',
            data: cusVisitAddProductConfigData,
            success: function (e) {
                // 将返回值转换为json对象
                var oE = eval("(" + e + ")");
                if (oE.code == 0) {
                    //搜索总条数
                    $('.tanceng .ven_custom_visit_add_product_search_num').html(oE.totalcount);
                    var datalist = oE.datalist;
                    var productList = '';
                    $.each(datalist, function (i, v) {
                        productList += '<tr configproductid="' + v['id'] + '">\
                                            <td><input type="checkbox" name="xs_gzbg_xzspPeiz"></td>\
                                            <td>' + v['code_sn'] + '</td>\
                                            <td>' + v['name'] + '</td>\
                                            <td>' + v['cate_info'] + '</td></tr>'
                    });
                    $('.tanceng .ven_customer_visit_look_product_add_config_goods_list').html(productList);
                    list_table_render_pagination('.tanceng .ven_customer_visit_look_product_add_config_list_page', cusVisitAddProductConfigData, cusVisitAddProductConfigFn, oE.totalcount, datalist.length);
                }
            }
        });
    }

    //添加商品  搜索关键字
    $('.tanceng .ven_custom_visit_add_product_search_btn').live('click', function () {
        if ($('.tanceng .tabhover').html() == '商品') {
            cusVisitAddProductData.key = $('.tanceng .ven_custom_visit_add_product_search_inp').val();
            cusVisitAddProductFn();
        } else if ($('.tanceng .tabhover').html() == '套餐商品') {
            cusVisitAddProductPackageData.key = $('.tanceng .ven_custom_visit_add_product_search_inp').val();
            cusVisitAddProductPackageFn();
        } else if ($('.tanceng .tabhover').html() == '配置商品') {
            cusVisitAddProductConfigData.key = $('.tanceng .ven_custom_visit_add_product_search_inp').val();
            cusVisitAddProductConfigFn();
        }
    });

    //添加商品提交
    $('.tanceng .ven_customer_visit_add_product_submit').live('click', function () {
        var aProductChosenList = [];
        var aProductPackageChosenList = [];
        var aProductConfigChosenList = [];
        $.each($('.tanceng .ven_customer_visit_look_product_add_goods_list').find('input:checked'), function (i, v) {
            aProductChosenList.push($(this).closest('tr').attr('productid'))
        });
        $.each($('.tanceng .ven_custom_visit_add_product_package_list').find('input:checked'), function (i, v) {
            aProductPackageChosenList.push($(this).closest('tr').attr('packageproductid'))
        });
        $.each($('.tanceng .ven_customer_visit_look_product_add_config_goods_list').find('input:checked'), function (i, v) {
            aProductConfigChosenList.push($(this).closest('tr').attr('configproductid'))
        });
        $.ajax({
            url: SERVER_URL + '/customer-visit/addproduct',
            type: 'POST',
            data: {
                token: token,
                visit_id: venCustomVisitCurrentId,
                uid: uid,
                product: aProductChosenList.join(','),
                package_product: aProductPackageChosenList.join(','),
                setting_product: aProductConfigChosenList.join(',')
            },
            success: function (e) {
                // 将返回值转换为json对象
                var oE = eval("(" + e + ")");
                if (oE.code == 0) {
                    alert('添加成功');
                } else {
                    alert(oE.msg)
                }
            }
        });
        $(this).closest('.dialog_box').remove();
        $('.tanceng').css('display', 'none');
    });

    //删除商品
    var delProductId = null;
    $('.ven_customer_visit_product_del').live('click', function () {
        delProductId = $(this).closest('.ven_custom_visit_look_product_del_box').attr('visitproductid');
    });
    //删除商品确认
    $('.tanceng .ven_cus_visit_del_product_submit').live('click', function () {
        $.ajax({
            url: SERVER_URL + '/customer-visit/delproduct',
            type: 'POST',
            data: {
                token: token,
                uid: uid,
                visit_id: venCustomVisitCurrentId,
                visitproduct_id: delProductId
            },
            success: function (e) {
                // 将返回值转换为json对象
                var oE = eval("(" + e + ")");
                $(this).closest('.dialog_box').remove();
                $('.tanceng').css('display', 'none');
                getVisitProductFn();
            }
        });
    });

    //新建拜访
    //初始化新建客户拜访参数
    var venCustomVisitCreateData = {
        token: token,
        visit_id: 0, //拜访id,有值为修改
        customer_id: '', //客户id	添加有
        uid: uid, //创建人	添加有
        thetype: 0, //拜访类型
        visited_at: '', //拜访时间
        dept: '', //负责部门
        owner: ''  //负责人
    };
    //初始化编辑客户拜访参数
    var venCustomVisitEditData = {
        token: token,
        visit_id: '', //拜访id,有值为修改
        customer_id: '', //客户id	添加有
        uid: uid, //创建人	添加有
        thetype: '', //拜访类型
        visited_at: '', //拜访时间
        dept: '', //负责部门
        owner: ''  //负责人
    };

    $('.ven_custom_visit_create_btn').live('click', function () {
        venCustomVisitCreateData = {
            token: token,
            visit_id: 0, //拜访id,有值为修改
            customer_id: '', //客户id	添加有
            uid: uid, //创建人	添加有
            thetype: 0, //拜访类型
            visited_at: '', //拜访时间
            dept: '', //负责部门
            owner: ''  //负责人
        };
        //新建弹窗清空已有数据
        $('.tanceng input').css('color', '#ccc');
        $('.tanceng .ven_custom_visit_create_add_dept_list').children().remove();
        $('.tanceng .ven_custom_visit_add_owner_list').children().remove();

        //创建时间
        $('.tanceng .ven_custom_visit_create_at').html(getCurrentDate())
    });

    //选择客户
    $('.tanceng .ven_custom_visit_choose_customer').live('click', function () {
        getCusListSort();
        getCusList();
        xs_kh_gjss_xlk();
    });
    // 客户>分类列表展示
    function getCusListSort() {
        $.ajax({
            url: SERVER_URL + '/customer/categorylist',
            type: 'GET',
            data: {
                token: token,
                pid: 0,
                customer: 1
            },
            success: function (e) {
                var oE = eval("(" + e + ")");
                var datalist = oE.datalist;
                $('.ven_custom_visit_choose_cus_sort').html(tree_list(datalist));
                // 所有分类总数
                setTimeout(function () {
                    // 总分类数量
                    //$('.hr_left_all_l_n').html($('#hr_left_all_l_n').parent().parent().next('i').find('ul.oth').length)
                    $('.hr_left_all_l_n').html(oE.totalcount);
                    // 子级数量
//					$('.hr_left_all_l_n').html(datalist.length)
                    for (var i = 0, len = $('em.list_num_null').length; i < len; i++) {
                        //$('em.list_num_null').eq(i).find('i').html($('em.list_num_null').eq(i).closest('ul').find('ul.oth').length);
                        $('em.list_num_null').eq(i).find('i').html($('em.list_num_null').eq(i).closest('ul').children('ul').length);
                    }
                }, 500)
                var deep = 0;
                $('.ven_custom_visit_choose_cus_sort_dialog').html(tree_list_dialog(datalist, deep));
                // 所有分类图标样式控制
                if ($('i.ven_custom_visit_choose_cus_sort').children().length == 0) {
                    $('ul.l_hr_left_1').addClass('oth');
                    $('li.hr_left_all span').addClass('oth')
                }
                // 下级分类图标样式控制
                for (var i = 0; i < $('i.ven_custom_visit_choose_cus_sort li').length; i++) {
                    if ($('i.ven_custom_visit_choose_cus_sort li').eq(i).next('ul').children().length == 0) {
                        $('i.ven_custom_visit_choose_cus_sort li').eq(i).find('span').addClass('oth');
                        $('i.ven_custom_visit_choose_cus_sort li').eq(i).parent('ul').addClass('oth')
                    }
                }
                $('span.oth .list_num_null').remove()
                // 模态框样式控制
                // 所有分类图标样式控制
                if ($('i.ven_custom_visit_choose_cus_sort_dialog').children().length == 0) {
                    $('ul.ul1').addClass('oth');
                    $('li.left_all span').addClass('oth')
                }
                // 下级分类图标样式控制
                for (var i = 0; i < $('i.ven_custom_visit_choose_cus_sort_dialog li').length; i++) {
                    if ($('i.ven_custom_visit_choose_cus_sort_dialog li').eq(i).next('ul').children().length == 0) {
                        $('i.ven_custom_visit_choose_cus_sort_dialog li').eq(i).find('span').addClass('oth');
                        $('i.ven_custom_visit_choose_cus_sort_dialog li').eq(i).find('span.icon_open').addClass('other');
                        $('i.ven_custom_visit_choose_cus_sort_dialog li').eq(i).parent('ul').addClass('oth')
                    }
                }
                var aClassList = $('.l_hr_left_1').find('li').filter('[class*="hr_left"]')
            }
        })
    }

    // 初始化获取列表参数
    var getCusListData = {
        token: token,
        page: 1, //当前页
        num: 10, // 每页显示条数
        key: '', // 关键字
        industry_big_id: '', // 行业大类id
        category_id: '', // 分类id
        comefrom: '', // 来源类型id
        grade: '', // 级别id
        credit: '', // 信用额度
        owner: '', // 负责人id
        created_at: '',
        statusflag: '' // 作废状态  0 有效客户 1 作废客户  不传 是全部
    };
    // 客户>客户列表
    function getCusList() {
        $.ajax({
            url: SERVER_URL + '/customer/list',
            type: 'GET',
            data: getCusListData,
            success: function (e) {
                var e = eval("(" + e + ")");
                if (e.code == 0) {
                    var cuslist = e.datalist;
                    if (cuslist.length == 0) {
                        $('.tanceng .ven_custom_visit_choose_custom_nodata_box').removeClass('none')
                        $('.tanceng .ven_custom_visit_choose_custom_handle').addClass('none')
                    } else {
                        $('.tanceng .ven_custom_visit_choose_custom_nodata_box').addClass('none')
                        $('.tanceng .ven_custom_visit_choose_custom_handle').removeClass('none')
                    }
                    // 客户列表
                    var oCuslist = '';
                    // 客户作废状态
                    var cusSta = '';
                    for (var i = 0; i < cuslist.length; i++) {
                        if (cuslist[i].contacts) {
                            // 客户联系人名字
                            var con1 = '';
                            // 客户联系人详细信息
                            var con2 = '';
                            for (var j = 0; j < cuslist[i].contacts.length; j++) {
                                con1 += cuslist[i].contacts[j].name + '、';
                                con2 += '<div class="vent_client_contMsgBoxDet"><h3 class="cont_title">' + cuslist[i].contacts[j].name + '</h3><ul><li>职务：' + cuslist[i].contacts[j].job + '</li><li>电话：' + cuslist[i].contacts[j].tel + '</li><li>邮箱：' + cuslist[i].contacts[j].email + '</li></ul></div>'
                            }
                        }
                        con1 = con1.substring(0, con1.length - 1);
                        var cusSort = '',
                            cusBtnClass = '',
                            cusContactClass = '';
                        oCuslist += '<tr class="' + cusSta + '" cusId="' + cuslist[i].id + '"><td><input type="radio" name="222"></td><td>' + l_dbl(i + 1) + '</td><td>' + cuslist[i].code_sn + '</td><td>' + cuslist[i].name + '</td><td>' + cuslist[i].tel + '</td><td><div class="text_line" style="width: 9em;"><span class="ellipsis">' + cuslist[i].address + '</span></div></td><td>' + cuslist[i].industry_big_name + '</td><td>' + cuslist[i].grade_name + '</td><td class="f_color ' + cusContactClass + '">' + con1 + '<div class="vent_client_contMsgBox" style="display: none;z-index:99;"><i class="vent_client_torr"></i>' + con2 + '</div></td><td>' + cuslist[i].introducer_name + '</td><td>' + cuslist[i].note + '</td></tr>'
                    }
                    $('.tanceng .ven_custom_visit_cus_list').html(oCuslist);
                    list_table_render_pagination('.tanceng .page_ven31_cuslist', getCusListData, getCusList, e.totalcount, cuslist.length)
                }
            }
        })
        xs_kh_gjss_num()
    }

    //选择分类获取客户
    $('.tanceng .ven_custom_visit_create_choose_customer_sort li').live('click', function () {
        getCusListData.category_id = $(this).attr('cussortid');
        getCusList();
    })
    // 搜索关键字
    $('.tanceng .ven_custom_visit_choose_customer_search_btn').live('click', function () {
        if ($('.tanceng .ven_custom_visit_choose_customer_search_inp').val() == '搜索客户编号/客户名称') {
            getCusListData.key = ''
        } else {
            getCusListData.key = $('.tanceng .ven_custom_visit_choose_customer_search_inp').val()
        }
        getCusList()
    });
    //搜索行业
    $('.tanceng .ven_custom_visit_create_choose_customer_industry_list li').live('click', function () {
        getCusListData.industry_big_id = $(this).attr('industryid');
        getCusList()
    });
    //搜索客户级别
    $('.tanceng .ven_custom_visit_create_choose_customer_grade_list li').live('click', function () {
        getCusListData.grade = $(this).index();
        getCusList()
    })
    // 客户>高级搜索>控制搜索条数
    function xs_kh_gjss_num() {
        $.ajax({
            url: SERVER_URL + '/customer/list',
            type: 'GET',
            data: {
                token: token,
                key: getCusListData.key, // 关键字
                industry_big_id: getCusListData.industry_big_id, // 行业大类id
                category_id: getCusListData.category_id, // 分类id
                comefrom: getCusListData.comefrom, // 来源类型id
                grade: getCusListData.grade, // 级别id
                credit: getCusListData.credit, // 信用额度
                owner: getCusListData.owner // 负责人id
            },
            success: function (e) {
                var e = eval("(" + e + ")");
                if (e.code == 0) {
                    var cuslist = e.datalist;
                    $('.tanceng .xs_kh_ssjg').html(cuslist.length)
                }
            }
        })
    }

    // 客户>高级搜索>控制下拉框
    function xs_kh_gjss_xlk() {
        $.ajax({
            url: SERVER_URL + '/customer/list',
            type: 'GET',
            data: {
                token: token
            },
            success: function (e) {
                var e = eval("(" + e + ")");
                if (e.code == 0) {
                    var cuslist = e.datalist;
                    // 高级搜索
                    var xs_kh_hy = '';
                    // 高级搜索数组
                    var xs_kh_hy_array = [];
                    $.each(cuslist, function (i, v) {
                        xs_kh_hy_array.push({'title': v['industry_big_id'], 'val': v['industry_big_name']})
                    });
                    var newCustomListIndustry = getJsonArr(xs_kh_hy_array);
                    // 行业下拉框数据循环
                    $.each(newCustomListIndustry, function (i, v) {
                        xs_kh_hy += '<li industryid="' + v['title'] + '">' + v['val'] + '</li>'
                    })
                    // 行业下拉框插入数据
                    $('.tanceng .ven_custom_visit_create_choose_customer_industry_list').html(xs_kh_hy)
                }
            }
        })
    }

    //选择客户
    $('.tanceng .ven_custom_visit_create_choose_customer_submit').live('click', function () {
        var customVisitCusChosen = null;
        $.each($('.tanceng .ven_custom_visit_cus_list tr'), function (i, v) {
            if ($('.tanceng .ven_custom_visit_cus_list tr').eq(i).find('input:radio').attr('checked') == 'checked') {
                customVisitCusChosen = {
                    'title': $('.tanceng .ven_custom_visit_cus_list tr').eq(i).attr('cusid'),
                    'val': $('.tanceng .ven_custom_visit_cus_list tr').eq(i).find('td').eq(3).text()
                }
            }
        });
        //新建客户拜访用
        $('.tanceng .custom_visit_create_customer_chosen').val(customVisitCusChosen['val']);
        venCustomVisitCreateData.customer_id = customVisitCusChosen['title'];
        //编辑客户拜访用
        $('.tanceng .ven_custom_visit_edit_cusname').val(customVisitCusChosen['val']);
        venCustomVisitEditData.customer_id = customVisitCusChosen['title'];
        // 关闭当前弹窗
        $(this).closest('.dialog_box').remove();
    });
    //选择拜访类型
    $('.tanceng .ven_custom_visit_create_type_ul li').live('click', function () {
        venCustomVisitCreateData.thetype = $(this).index();
    });

    // 选择负责部门
    $('.tanceng .ven_custom_visit_create_choose_dept_btn').die('click').live('click', function () {
        $('.tanceng .ven_custom_visit_create_choose_dept_list').html('');
        $('.tanceng .ven_custom_visit_create_dept_chosen_list').html('');
        venPayFlowChooseDept()
    });

    //负责部门
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
                var deep = 0;
                $('.tanceng .ven_custom_visit_create_choose_dept_list').html(tree_list_choose_dept(oE.rows, deep));
                // 所有分类图标样式控制
                if ($('i.ven_custom_visit_create_choose_dept_list').children().length == 0) {
                    $('li.left_all span.icon_open').addClass('personOth')
                }
                // 下级部门样式控制
                for (var i = 0, liLeft1 = $('.tanceng .ven_custom_visit_create_choose_dept_list li.left_1').length; i < liLeft1; i++) {
                    if ($('.tanceng .ven_custom_visit_create_choose_dept_list li.left_1').eq(i).next('ul').length == 0) {
                        $('.tanceng .ven_custom_visit_create_choose_dept_list li.left_1').eq(i).find('span.icon_open').addClass('personOth');
                        $('.tanceng .ven_custom_visit_create_choose_dept_list li.left_1').eq(i).find('span.personOth').closest('li').addClass('deptChild')
                    }
                }
                //选择部门左侧选择
                $('.tanceng .ven_custom_visit_create_choose_dept_list ul .deptChild').die('click').live('click', function () {
                    if ($(this).find('em').hasClass('on')) {
                        $('.tanceng .ven_custom_visit_create_dept_chosen_list').find('li[rid=' + $(this).attr('deptchosenid') + ']').remove()
                        $(this).find('span.list_check em').removeClass('on')
                    } else {
                        $('.tanceng .ven_custom_visit_create_dept_chosen_list').append('<li rid="' + $(this).attr('deptchosenid') + '"><span>' + $(this).children('.list_msg').html() + '</span><i class="list_choose_delete"></i></li>');
                        $(this).find('span.list_check em').addClass('on')
                    }
                });
                //选择部门右侧删除
                $('i.list_choose_delete').live('click', function () {
                    $(this).closest('li').remove();
                    $('.tanceng .ven_custom_visit_create_choose_dept_list ul .deptChild[deptchosenid = "' + $(this).closest('li').attr('rid') + '"]').find('em').removeClass('on');
                });
                //新建>选择部门确认
                $('.tanceng .ven_custom_visit_create_choose_dept_save').die('click').live('click', function () {
                    venCustomVisitCreateData.dept = [];  // 声明对象要区分开
                    //venPayFlowEditData.dept_list = '';
                    venCustomVisitEditData.dept = [];  // 声明对象要区分开
                    //venPayFlowEditData.dept_list = '';
                    var deptChosen = '';
                    $.each($('.tanceng .ven_custom_visit_create_dept_chosen_list').find('li'), function (i, v) {
                        deptChosen += '<li deptchosenid="' + $('.tanceng .ven_custom_visit_create_dept_chosen_list').find('li').eq(i).attr('rid') + '">' + $('.tanceng .ven_custom_visit_create_dept_chosen_list').find('li').eq(i).text() + ' <i></i></li>'
                        venCustomVisitCreateData.dept.push($('.tanceng .ven_custom_visit_create_dept_chosen_list').find('li').eq(i).attr('rid'));
                        venCustomVisitEditData.dept.push($('.tanceng .ven_custom_visit_create_dept_chosen_list').find('li').eq(i).attr('rid'));
                    });
                    venCustomVisitCreateData.dept = venCustomVisitCreateData.dept.join(',')
                    venCustomVisitEditData.dept = venCustomVisitEditData.dept.join(',')
                    $('.tanceng .ven_custom_visit_create_add_dept_list').html(deptChosen);
                    $('.tanceng .ven_custom_visit_edit_add_dept_list').html(deptChosen);
                    $(this).closest('.dialog_box').remove()
                })
            }
        })
    }

    //选择负责人
    $('.tanceng .ven_custom_visit_create_choose_owner').live('click', function () {
        venCustomVisitChooseOwner()
    });

    //选择负责人
    function venCustomVisitChooseOwner() {
        $.ajax({
            type: "get",
            url: SERVER_URL + "/dept/deptlist",
            data: {token: token},
            success: function (e) {
                var oE = eval('(' + e + ')');
                if (oE.code == 0) {
                    var deep = 0;
                    $('.tanceng .ven_custom_visit_create_choose_owner_list').html(tree_list_choose_dept_person(oE.rows, deep));
                    // 所有分类图标样式控制
                    if ($('i.ven_custom_visit_create_choose_owner_list').children().length == 0) {
                        $('li.left_all span.icon_open').addClass('personOth')
                    }
                    // 下级部门样式控制
                    for (var i = 0, liLeft1 = $('.tanceng .ven_custom_visit_create_choose_owner_list li.left_1').length; i < liLeft1; i++) {
                        if ($('.tanceng .ven_custom_visit_create_choose_owner_list li.left_1').eq(i).next('ul').length == 0) {
                            $('.tanceng .ven_custom_visit_create_choose_owner_list li.left_1').eq(i).find('span.icon_open').addClass('personOth');
                            $('.tanceng .ven_custom_visit_create_choose_owner_list li.left_1').eq(i).find('span.personOth').closest('li').addClass('deptChild')
                        }
                    }
                    //选择人员左侧选择
                    $('.tanceng .ven_custom_visit_create_choose_owner_list ul .li_person').die('click').live('click', function () {
                        if ($(this).find('em').hasClass('on')) {
                            $('.tanceng .ven_custom_visit_create_owner_chosen_list').find('li[userinfoid=' + $(this).attr('userinfoid') + ']').remove()
                            $(this).find('span.list_check em').removeClass('on')
                        } else {
                            $('.tanceng .ven_custom_visit_create_owner_chosen_list').append('<li userinfodeptid="' + $(this).closest('ul.ul1').children('li.left_1').attr('deptchosenid') + '" userinfoid="' + $(this).attr('userinfoid') + '"><span>' + $(this).children('.list_msg').html() + '</span><i class="list_choose_delete"></i></li>');
                            $(this).find('span.list_check em').addClass('on')
                        }
                    });
                    //选择人员右侧删除
                    $('i.list_choose_delete').live('click', function () {
                        $(this).closest('li').remove();
                        $('.tanceng .ven_custom_visit_create_choose_owner_list ul .li_person[userinfoid = "' + $(this).closest('li').attr('userinfoid') + '"]').find('em').removeClass('on');
                    });
                    //选择人员保存
                    $('.tanceng .ven_custom_visit_choose_owner_save').die('click').live('click', function () {
                        venCustomVisitCreateData.dept = [];  // 声明对象要区分开
                        venCustomVisitCreateData.owner = [];  // 声明对象要区分开
                        venCustomVisitEditData.dept = [];  // 声明对象要区分开
                        venCustomVisitEditData.owner = [];  // 声明对象要区分开
                        var ownerChosen = '';
                        $.each($('.tanceng .ven_custom_visit_create_owner_chosen_list li'), function (i, v) {
                            ownerChosen += '<li userinfodeptid="' + $('.tanceng .ven_custom_visit_create_owner_chosen_list').find('li').eq(i).attr('userinfodeptid') + '" userinfoid="' + $('.tanceng .ven_custom_visit_create_owner_chosen_list').find('li').eq(i).attr('userinfoid') + '">' + $('.tanceng .ven_custom_visit_create_owner_chosen_list').find('li').eq(i).text() + ' <i></i></li>';
                            venCustomVisitCreateData.dept.push($('.tanceng .ven_custom_visit_create_owner_chosen_list').find('li').eq(i).attr('userinfodeptid'));
                            venCustomVisitCreateData.owner.push($('.tanceng .ven_custom_visit_create_owner_chosen_list').find('li').eq(i).attr('userinfoid'));
                            venCustomVisitEditData.dept.push($('.tanceng .ven_custom_visit_create_owner_chosen_list').find('li').eq(i).attr('userinfodeptid'));
                            venCustomVisitEditData.owner.push($('.tanceng .ven_custom_visit_create_owner_chosen_list').find('li').eq(i).attr('userinfoid'));
                        });
                        venCustomVisitCreateData.owner = venCustomVisitCreateData.owner.join(',');
                        venCustomVisitEditData.owner = venCustomVisitEditData.owner.join(',');
                        $('.tanceng .ven_custom_visit_add_owner_list').html(ownerChosen);
                        $('.tanceng .ven_custom_visit_edit_add_owner_list').html(ownerChosen);
                        $(this).closest('.dialog_box').remove()
                    })
                }
            },
            error: function (data) {

            }
        });
    }

    //新建客户拜访提交
    $('.tanceng .ven_custom_visit_create_submit_btn').live('click', function () {
        if ($('.tanceng .custom_visit_create_customer_chosen').val() == '') {
            alert('请选择客户');
            return false;
        } else if ($('.tanceng .ven_custom_visit_create_visit_at').val() == '请选择日期') {
            alert('请选择拜访日期');
            return false;
        } else if ($('.tanceng .ven_custom_visit_add_owner_list').children().length == 0) {
            alert('请选择负责人');
            return false;
        } else {
            venCustomVisitCreateData.visited_at = $('.tanceng .ven_custom_visit_create_visit_at').val();
            $.ajax({
                type: "POST",
                url: SERVER_URL + "/customer-visit/add",
                data: venCustomVisitCreateData,
                success: function (e) {
                    var oE = eval('(' + e + ')');
                    if (oE.code == 0) {
                        alert('添加成功');
                        $(this).closest('.dialog_box').remove();
                        $('.tanceng').css('display', 'none');
                        getCustomVisitList();
                        $.each($('#lik-fullcalendar .lik-cur-month-day'), function (i, v) {
                            likFullListFn($('#lik-fullcalendar .lik-cur-month-day').eq(i).attr('lik-data-date'));
                        });
                    } else {
                        alert(oE.msg)
                    }
                },
                error: function (data) {

                }
            });
        }
    });

    //编辑客户拜访
    $('.ven_custom_visit_edit').live('click', function () {
        venCustomVisitCurrentId = $(this).closest('tr').attr('vencustomvisitid');
        venCustomVisitEditData.visit_id = venCustomVisitCurrentId;
        // 获取数据遍历
        $.ajax({
            url: SERVER_URL + '/customer-visit/info',
            type: 'GET',
            data: {
                token: token,
                uid: uid,
                visit_id: venCustomVisitCurrentId
            },
            success: function (e) {
                // 将返回值转换为json对象
                var oE = eval("(" + e + ")");
                var datalist = oE.data;
                if (oE.code == 0) {
                    //创建人
                    $('.tanceng .ven_custom_visit_edit_visit_uname').html(datalist['uname']);
                    //创建时间
                    $('.tanceng .ven_custom_visit_edit_create_at').html(datalist['created_at'].split(' ')[0]);
                    //用户名称
                    $('.tanceng .ven_custom_visit_edit_cusname').val(datalist['name']);
                    venCustomVisitEditData.customer_id = datalist['customer_id'];
                    //拜访类型判断
                    var visitThetype = '';
                    if (datalist['thetype'] == 0) {
                        visitThetype = '外出拜访'
                    } else if (datalist['thetype'] == 1) {
                        visitThetype = '电话拜访'
                    } else if (datalist['thetype'] == 2) {
                        visitThetype = '网络拜访'
                    } else if (datalist['thetype'] == 3) {
                        visitThetype = '出差拜访'
                    } else if (datalist['thetype'] == 4) {
                        visitThetype = '其它'
                    }
                    $('.tanceng .ven_custom_visit_edit_type_inp').val(visitThetype);
                    venCustomVisitEditData.thetype = datalist['thetype'];
                    //拜访日期
                    $('.tanceng .ven_custom_visit_edit_visit_time').val(datalist['visited_at'].split(' ')[0]);
                    //负责部门
                    var deptList = getDataArr(datalist['dept'], datalist['dept_name']);
                    var deptListLi = '';
                    venCustomVisitEditData.dept = [];
                    $.each(deptList, function (i, v) {
                        deptListLi += '<li deptchosenid="' + v['title'] + '">' + v['val'] + '<i></i></li>';
                        venCustomVisitEditData.dept.push(v['title'])
                    });
                    venCustomVisitEditData.dept = venCustomVisitEditData.dept.join(',');
                    $('.tanceng .ven_custom_visit_edit_add_dept_list').html(deptListLi);
                    //负责人
                    var ownerList = getDataArr(datalist['owner'], datalist['owner_name']);
                    var ownerListLi = '';
                    venCustomVisitEditData.owner = [];
                    $.each(ownerList, function (i, v) {
                        ownerListLi += '<li userinfoid="' + v['title'] + '">' + v['val'] + '<i></i></li>'
                        venCustomVisitEditData.owner.push(v['title'])
                    });
                    venCustomVisitEditData.owner = venCustomVisitEditData.owner.join(',');
                    $('.tanceng .ven_custom_visit_edit_add_owner_list').html(ownerListLi);
                } else {
                    alert('操作失败')
                }
            }
        });
    });

    //选择拜访类型
    $('.tanceng .ven_custom_visit_edit_type_ul li').live('click', function () {
        venCustomVisitEditData.thetype = $(this).index();
    });
    //编辑客户拜访提交
    $('.tanceng .ven_custom_visit_edit_submit_btn').live('click', function () {
        if ($('.tanceng .ven_custom_visit_edit_cusname').val() == '') {
            alert('请选择客户');
            return false;
        } else if ($('.tanceng .ven_custom_visit_edit_visit_time').val() == '请选择日期') {
            alert('请选择拜访日期');
            return false;
        } else if ($('.tanceng .ven_custom_visit_edit_add_owner_list').children().length == 0) {
            alert('请选择负责人');
            return false;
        } else {
            venCustomVisitEditData.visited_at = $('.tanceng .ven_custom_visit_edit_visit_time').val();
            $.ajax({
                type: "POST",
                url: SERVER_URL + "/customer-visit/add",
                data: venCustomVisitEditData,
                success: function (e) {
                    var oE = eval('(' + e + ')');
                    if (oE.code == 0) {
                        alert('修改成功');
                        $(this).closest('.dialog_box').remove();
                        $('.tanceng').css('display', 'none');
                        getCustomVisitList();
                    } else {
                        alert(oE.msg)
                    }
                },
                error: function (data) {

                }
            });
        }
    });

    //日历
    $('.lik_fullcalendar_btn').live('click', function () {
        $.each($('#lik-fullcalendar .lik-cur-month-day'), function (i, v) {
            likFullListFn($('#lik-fullcalendar .lik-cur-month-day').eq(i).attr('lik-data-date'));
        });
    });
    $('.change-month').live('click', function () {
        $.each($('#lik-fullcalendar .lik-date-item'), function (i, v) {
            $('#lik-fullcalendar .lik-date-item').eq(i).find('.lik-full-detail').html('');
        });
        $.each($('#lik-fullcalendar .lik-cur-month-day'), function (i, v) {
            likFullListFn($('#lik-fullcalendar .lik-cur-month-day').eq(i).attr('lik-data-date'));
        });
    });
    function likFullListFn(date) {
        $.ajax({
            type: "GET",
            url: SERVER_URL + "/customer-visit/daylist",
            data: {
                token: token,
                uid: uid,
                day: date
            },
            success: function (e) {
                var oE = eval('(' + e + ')');
                if (oE.code == 0) {
                    var datalist = oE.datalist;
                    var visitHtml = '';
                    $.each(datalist, function (i, v) {
                        var statusName = '';
                        var statusClass = '';
                        if (v['status'] == 0) {
                            statusName = '未拜访';
                            statusClass = 'c_r';
                        } else if (v['status'] == 1) {
                            statusName = '已拜访';
                            statusClass = 'c_g';
                        } else if (v['status'] == 2) {
                            statusName = '完成';
                            statusClass = '';
                        }
                        visitHtml += '<p class="lik-full-detail-p">' + v['customer_name'] + '<span class="' + statusClass + '">' + statusName + '</span></p>'
                    });
                    $('#lik-fullcalendar .lik-cur-month-day[lik-data-date="' + date + '"]').find('.lik-full-detail').html(visitHtml);
                } else {
                }
            },
            error: function (data) {
            }
        });
    }

});
