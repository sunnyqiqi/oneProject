$(function () {
    //图片上传

    function ajaxSubmit($el) {
        var token = Admin.get_token();
        $el.upload({
            url: SERVER_URL + '/task/uploadattch',
            // 其他表单数据
            params: {
                token: token
            },
            // 上传完成后, 返回json, text
            dataType: 'json',
            onSend: function (obj, str) {
                return true;
            },
            // 上传之后回调
            onComplate: function (data) {
                $el.parent().before('<li><input class="hide_input" type="file"/><img class="img_src" imgurl="' + data.imgurl + '" src="' + SERVER_URL + data.imgurl + '"/><i class="del_img">-</i></li>');
            },
            onProgress: function (e) {
                var per = Math.round(e.loaded * 100 / e.total);
                $('.complete').css('width', per + '%')
            }
        });
        $el.upload("ajaxSubmit");
    }

    $('.tanceng .ven_cus_visit_bfjl_create_upload_img_btn').die('change').live('change', function () {
        ajaxSubmit($(this));
    });
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
    token = Admin.get_token();
    //token = '2017052516045457073-1-1';
    uid = Admin.get_uid();
    var uname = loginUserInfo.username;
    var deptId = loginUserInfo.department_id;
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

    //权限部分
    if (loginUserInfo['company_admin'] != 1) {
        var venSellChancePowerList = loginUserInfo['powerUrls'];
        //查看团队拜访
        var venCusVisitTeam = 'customer-visit/team';
        //查看全部拜访
        var venCusVisitAllList = 'customer-visit/list';
        //新建客户拜访
        var venCusVisitAdd = 'customer-visit/add';
        //删除
        var venCusVisitDel = 'customer-visit/del';

        if ($.inArray(venCusVisitTeam, venSellChancePowerList) == -1 && $.inArray(venCusVisitAllList, venSellChancePowerList) == -1) {
            $('#ven_cus_visit_tab').html('<li name="xs_gjbf_table" class="taba" id="ven_custom_visit_searMine">我的拜访</li>');
        } else if ($.inArray(venCusVisitTeam, venSellChancePowerList) == -1 && $.inArray(venCusVisitAllList, venSellChancePowerList) != -1) {
            $('#ven_cus_visit_tab').html('<li class="taba tabhover" name="xs_gjbf_table" id="ven_custom_visit_searAll">全部</li>\
                <li name="xs_gjbf_table" class="taba" id="ven_custom_visit_searMine">我的拜访</li>');
        } else if ($.inArray(venCusVisitTeam, venSellChancePowerList) != -1 && $.inArray(venCusVisitAllList, venSellChancePowerList) == -1) {
            $('#ven_cus_visit_tab').html('<li name="xs_gjbf_table" class="taba" id="ven_custom_visit_searTeam">团队拜访</li>\
                <li name="xs_gjbf_table" class="taba" id="ven_custom_visit_searMine">我的拜访</li>');
        } else if ($.inArray(venCusVisitTeam, venSellChancePowerList) != -1 && $.inArray(venCusVisitAllList, venSellChancePowerList) != -1) {
            $('#ven_cus_visit_tab').html('<li class="taba tabhover" name="xs_gjbf_table" id="ven_custom_visit_searAll">全部</li>\
                <li name="xs_gjbf_table" class="taba" id="ven_custom_visit_searTeam">团队拜访</li>\
                <li name="xs_gjbf_table" class="taba" id="ven_custom_visit_searMine">我的拜访</li>');
        }

        //新建回款流程
        if ($.inArray(venCusVisitAdd, venSellChancePowerList) == -1) {
            $('.ven_custom_visit_create_btn').hide();
        } else {
            $('.ven_custom_visit_create_btn').show();
        }

        //删除
        var venCusVisitDelBtnClass = '';
        if ($.inArray(venCusVisitDel, venSellChancePowerList) == -1) {
            venCusVisitDelBtnClass = 'none';
            $('#ven_custom_visit_look_del').hide();
        } else {
            venCusVisitDelBtnClass = '';
            $('#ven_custom_visit_look_del').show();
        }

    }

    // 定义客户拜访参数
    var customVisitData = {
        token: token,
        page: 1, //页面
        num: 10, //每页条数
        list_type: '', //查询类型：空是所有，2抄送我的 1我的拜访
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
        {'index': null, 'field': '创建时间'},
        {'index': null, 'field': '抄送人'}
    ];
    likShow('#ven_custom_visit_table', venCusVisitLookAbledField, '#ven_custom_visit_look_ul', '#ven_custom_visit_look_save', '#ven_custom_visit_look_reset');

    //getCustomVisitList();

    // 获取客户拜访列表
    function getCustomVisitList() {
        $.ajax({
            url: SERVER_URL + '/customer-visit/list',
            type: 'GET',
            data: customVisitData,
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                if (oE.code == 0) {
                    if (customVisitData.list_type == 2) {
                        var cusVisEditDel = 'none';
                    } else {
                        var cusVisEditDel = '';
                    }
                    //搜索总条数
                    $('#ven_custom_visit_search_total').html(oE.totalcount);
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
                        //抄送人
                        var cusVisitCopy = '';
                        $.each(v['copy_list'], function (i2, v2) {
                            cusVisitCopy += v2['name'] + '、'
                        });
                        cusVisitCopy = cusVisitCopy.slice(0, cusVisitCopy.length - 1);
                        // 拜访状态
                        var customVisitStatus = '';
                        if (v['status'] == 0) {
                            customVisitStatus = '未拜访';
                        } else if (v['status'] == 1) {
                            customVisitStatus = '已拜访';
                        } else if (v['status'] == 2) {
                            customVisitStatus = '完成拜访';
                        }
                        customVisitHtml += '<tr vencustomvisitid="' + v['id'] + '">\
                            <td>' + l_dbl(i + 1) + '</td>\
                            <td>' + (datalist[i]['name']) + '</td>\
                            <td>' + (datalist[i]['thetype_name']) + '</td>\
                            <td>' + (datalist[i]['visited_at'].split(' ')[0]) + '</td>\
                            <td>' + (datalist[i]['owner_name']) + '</td>\
                            <td>' + (customVisitCont.slice(0, customVisitCont.length - 1)) + '</td>\
                            <td>' + customVisitStatus + '</td>\
                            <td>' + cusVisitCopy + '</td>\
                            <td>' + (datalist[i]['created_at'].split(' ')[0]) + '</td>\
                            <td><button class="but_cancel but_mix r_sidebar_btn but_look ven_custom_visit_look" name="xs_gjbf_right">查看</button><button class="but_mix but_exit val_dialog ven_custom_visit_edit ' + cusVisEditDel + '" name="xs_fzbf_exit">编辑</button><button class="' + venCusVisitDelBtnClass + ' but_mix but_r val_dialog ven_custom_visit_del_btn ' + cusVisEditDel + '"" name="vendition_khbf_sc">删除</button></td>\
                        </tr>';
                    });
                    //客户拜访数据渲染
                    $('#ven_custom_visit_list').html(customVisitHtml);
                }
                //分页
                list_table_render_pagination('.ven_custom_visit_all_page', customVisitData, getCustomVisitList, oE.totalcount, datalist.length);
                $('#ven_custom_visit_look_save').trigger('click');
            }
        });
    }

    //刷新列表
    $('#ven_custom_visit_refresh').die('click').live('click', function () {
        customVisitData.page = 1;
        customVisitData.key = '';
        customVisitData.thetype = '';
        customVisitData.dept = '';
        customVisitData.creater_id = '';
        customVisitData.key = '';
        customVisitData.owner_id = '';
        $('#ven_custom_visit_searKey').val('搜索客户').css('color', '#CCCCCC');
        $('#ven_custom_visit_search_name_inp').val('客户名称').css('color', '#CCCCCC');
        $('#ven_custom_visit_search_thetype_inp').val('拜访类型').css('color', '#CCCCCC');
        $('#ven_custom_visit_search_uname_inp').val('抄送人').css('color', '#CCCCCC');
        $('#ven_custom_visit_search_owner_inp').val('负责人').css('color', '#CCCCCC');
        //getCustomVisitList();
        $('#ven_custom_visit_searAll').trigger('click');
        getCustomVisitList();
    });
    //客户拜访查看我的拜访
    $('#ven_custom_visit_searMine').die('click').live('click', function () {
        customVisitData.list_type = 1;
        getCustomVisitList();
        $('#ven_custom_visit_look_del').show();
    });
    //客户拜访查看抄送我的
    $('#ven_custom_visit_searTome').die('click').live('click', function () {
        customVisitData.list_type = 2;
        getCustomVisitList();
        $('#ven_custom_visit_look_del').hide();
    });
    $('#ven_cus_visit_tab li:nth-of-type(1)').trigger('click');
    //搜索关键字
    $('#ven_custom_visit_searKey_btn').die('click').live('click', function () {
        if ($('#ven_custom_visit_searKey').val() == '搜索客户') {
            customVisitData.key = '';
        } else {
            customVisitData.key = $('#ven_custom_visit_searKey').val();
        }
        getCustomVisitList();
    });

    //高级搜索 控制下拉框
    //展开高级搜索
    $('.ven_cus_visit_zkgjss_btn').live('click', function () {
        if ($(this).text() != '展开高级搜索') {
            venCustomVisitSearch();
        }
    });
    function venCustomVisitSearch() {
        $.ajax({
            url: SERVER_URL + '/common/search',
            type: 'GET',
            data: {token: token, big_type: 7, small_type: 'copy_list'},
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var datalist = oE.data;
                    var searchList = '';
                    $.each(datalist, function (i, v) {
                        searchList += '<li searchid="' + v['id'] + '">' + v['name'] + '</li>';
                    });
                    $('#ven_cus_visit_search_copy_list_ul').html(searchList);
                }
            }
        });
        $.ajax({
            url: SERVER_URL + '/common/search',
            type: 'GET',
            data: {token: token, big_type: 7, small_type: 'owner'},
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var datalist = oE.data;
                    var searchList = '';
                    $.each(datalist, function (i, v) {
                        searchList += '<li searchid="' + v['id'] + '">' + v['name'] + '</li>';
                    });
                    $('#ven_custom_visit_search_owner_ul').html(searchList);
                }
            }
        });
    }

    // 搜索客户名称
    $('#ven_custom_visit_search_cus_name_ul li').die('click').live('click', function () {
        customVisitData.key = $(this).html();
        getCustomVisitList();
    });
    // 搜索拜访类型
    $('#ven_custom_visit_search_thetype_ul li').die('click').live('click', function () {
        customVisitData.thetype = $(this).index();
        getCustomVisitList();
    });
    //搜索负责人
    $('#ven_custom_visit_search_owner_ul li').die('click').live('click', function () {
        customVisitData.owner_id = $(this).attr('searchid');
        getCustomVisitList();
    });
    //搜索抄送人
    $('#ven_cus_visit_search_copy_list_ul li').die('click').live('click', function () {
        customVisitData.copy_list = $(this).attr('searchid');
        getCustomVisitList();
    });

    //删除操作
    $('.ven_custom_visit_del_btn').die('click').live('click', function () {
        $('#ven_custom_visit_del_id').val($(this).closest('tr').attr('vencustomvisitid'));
    });
    $('.ven_cus_visit_del').die('click').live('click', function () {
        $.ajax({
            url: SERVER_URL + '/customer-visit/del',
            type: 'POST',
            data: {
                token: token,
                visit_id: $('#ven_custom_visit_del_id').val()
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    $('.tanceng').css('display', 'none').children('.dialog_box').remove();
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

    //定义客户信息
    var venCusInfoData = {
        token: token,
        customer_id: 0, //客户id大于0就是修改
        code_sn: "", //客户编号
        name: "", //名称
        uid: uid, //添加人
        owner: uid, //负责人
        industry_big_id: '', //行业大类id
        industry_small_id: '', //行业小类id
        comefrom: 0, //来源类型
        grade: 0, //客户级别
        arrears: 0, //欠款
        tel: "", //联系电话
        province: 0, //省
        city: 0, //市
        area: 0, //区
        address: "", //地址
        //下面是自定义字段内容
        customfields: [], // 自定义字段
        category_id: 0, //分类
        //下面是联系人内容
        contacts: [], // 联系人信息
        supplier_id: '', //关联供应商id
        introducer_id: '', //介绍人（来自客户id）
        credit: '', //信用限定金额单位为分
        note: "", //备注
        account_name: "",
        account_bank: "",
        pay_account: "",
        tax_num: ""
    }

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
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var datalist = oE.data;
                    console.log(oE);
                    $('#ven_custom_visit_look_contacts_num').html(datalist['contacts'].length);
                    //拜访状态判断
                    var visitStatus = '';
                    if (datalist['status'] == 0) {
                        visitStatus = '未拜访';
                        $('.custom_visit_look_finished').addClass('none');
                        $('#customVisitFinishBtn').removeClass('none');
                        $('#ven_cus_visit_look_bffk_box').removeClass('none');
                    } else if (datalist['status'] == 1) {
                        visitStatus = '已拜访';
                        $('.custom_visit_look_finished').addClass('none');
                        $('#customVisitFinishBtn').removeClass('none');
                        $('#ven_cus_visit_look_bffk_box').removeClass('none');
                    } else if (datalist['status'] == 2) {
                        visitStatus = '完成拜访';
                        $('.custom_visit_look_finished').removeClass('none');
                        $('#customVisitFinishBtn').addClass('none');
                        $('#ven_cus_visit_look_bffk_box').addClass('none');
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
                    $('#ven_custom_visit_time').html(likNullData(datalist['visited_at'].split(' ')[0]));
                    //负责人
                    $('#ven_custom_visit_owner').html(likNullData(datalist['owner_name']));
                    //签到时间
                    $('#ven_custom_visit_signtime').html(likNullData(datalist['lastvisittime']));
                    //签到地点
                    $('#ven_custom_visit_signaddress').html(likNullData(datalist['lastvisitaddr']));
                    //创建人
                    $('#ven_custom_visit_uname').html(likNullData(datalist['uname']));
                    //创建时间
                    $('#ven_custom_visit_createtime').html(likNullData(datalist['created_at']));
                    //客户联系人
                    var sContacts = '';
                    if(datalist['contacts']){
                        $.each(datalist['contacts'], function (i, v) {
                            var contactField = '';
                            $.each(v['custom_field'], function (i2, v2) {
                                contactField += '<p class="l-s-x">' + v2['title'] + '：<span>' + v2['val'] + '</span></p>';
                            });
                            sContacts += '<div class="d-r-t-h" contactid="' + v['id'] + '">\
                        <div class="xs_gjbf_rightkhlxr clearfix xs_khlxr">\
                            <div class="xs_khlxr_tit clearfix work_sp_fqsp_h3 ">\
                            <p class="left" style="font-weight: bold;">客户联系人<span class="c_r">(' + (i + 1) + ')</span></p>\
                            </div>\
                            </div>\
                            <p class="l-s-x">姓名：<span>' + v['name'] + '</span></p>\
                        <p class="l-s-x">职务<span>' + v['jobs'] + '</span></p>\
                            <p class="l-s-x">电话：<span>' + v['tel'] + '</span></p>\
                        <p class="l-s-x">邮箱：<span>' + v['email'] + '</span></p>' + contactField + '\
                        </div>'
                        });
                    }

                    $('#ven_custom_visit_look_contacts_list').html(sContacts);

                    //修改客户联系人信息
                    $('.ven_cus_visit_look_change_cont_btn').live('click', function () {
                        venCusInfoData.customer_id = datalist['customer_id'];
                        $.ajax({
                            url: SERVER_URL + '/customer/info',
                            type: 'get',
                            data: {
                                token: token,
                                customer_id: datalist['customer_id']
                            },
                            dataType: 'json',
                            success: function (oE) {
                                if (oE.code == 0) {
                                    var datalist = oE.data;
                                    console.log(datalist);
                                    //旧数据
                                    venCusInfoData.code_sn = datalist['code_sn'];
                                    //负责人
                                    venCusInfoData.dept = datalist['dept'];
                                    venCusInfoData.owner = datalist['owner'];
                                    //客户名称
                                    venCusInfoData.name = datalist['name'];
                                    //行业大类
                                    venCusInfoData.industry_big_id = datalist['industry_big_id'];
                                    //行业小类
                                    venCusInfoData.industry_small_id = datalist['industry_small_id'];
                                    //客户来源
                                    venCusInfoData.comefrom = datalist['comefrom'];
                                    //客户级别
                                    venCusInfoData.grade = datalist['grade'];
                                    //公司电话
                                    venCusInfoData.tel = datalist['tel'];
                                    //地址 - 省
                                    venCusInfoData.province = datalist['province'];
                                    //地址 - 市
                                    venCusInfoData.city = datalist['city'];
                                    //地址 - 县/区
                                    venCusInfoData.area = datalist['area'];
                                    //详细地址
                                    venCusInfoData.address = datalist['address'];
                                    //客户信息自定义字段
                                    venCusInfoData.customfields = datalist['customfields'];
                                    //介绍人
                                    venCusInfoData.introducer_id = datalist['introducer_id'];
                                    //关联供应商
                                    venCusInfoData.supplier_id = datalist['supplier_id'];
                                    //客户联系人信息
                                    var cusEditContDatalist = datalist['contacts'];
                                    var cusEditContDatalistHtml = '';
                                    $.each(cusEditContDatalist, function (i, v) {
                                        var cusEditContFieldDatalistHtml = '';
                                        $.each(v['custom_field'], function (i2, v2) {
                                            cusEditContFieldDatalistHtml += '<div class="t_textinput">\
                            <div class="t_left">' + v2['title'] + '</div>\
                            <div class="t_right"><input type="text" class="time_input c_3" value="' + v2['val'] + '" onfocus="fn_focus(this);" onblur="fn_blur(this);"></div>\
                            </div>'
                                        });
                                        cusEditContDatalistHtml += '<div class="worksp_addbx">\
                                                        <div class="work_sp_fqsp_h3">\
                                                        <h3 class="inline_block"><p>联系人信息<span class="c_r">(<cite class="page_31_khlxrNum">' + (i + 1) + '</cite>)</span></p></h3>\
                                                    <div class="work_fqsp_gb_img xs_khgl_khlxrBut ' + (i == 0 ? 'none' : '') + '"><i></i></div>\
                                                        </div>\
                                                        <div class="t_textinput">\
                                                        <div class="t_left t_left_conrow"><i class="c_r v_hidden">*</i>联系人类型</div>\
                                                        <div class="t_right">\
                                                        <div class="inline_block select_mormal select_100">\
                                                        <input type="text" class="select_input c_3" value="' + (v['contact_type'] == 1 ? '业务' : v['contact_type'] == 2 ? '财务' : '收货人') + '">\
                                                        <i></i>\
                                                        <ul class="select_list l_createCusCome">\
                                                        <li>业务</li>\
                                                        <li>财务</li>\
                                                        <li>收货人</li>\
                                                        </ul>\
                                                        </div>\
                                                        </div>\
                                                        </div>\
                                                        <div class="t_textinput">\
                                                        <div class="t_left"><i class="c_r v_hidden">*</i>联系人</div>\
                                                        <div class="t_right"><input type="text" class="time_input ven_custom_create_contact_name c_3" value="' + v['name'] + '"></div>\
                                                        </div>\
                                                        <div class="t_textinput">\
                                                        <div class="t_left t_left_conrow"><i class="c_r v_hidden">*</i>联系人电话</div>\
                                                        <div class="t_right"><input type="text" class="time_input ven_custom_create_contact_tel c_3" value="' + v['tel'] + '"></div>\
                                                        </div>\
                                                        <div class="t_textinput">\
                                                        <div class="t_left "><i class="c_r v_hidden">*</i>职务</div>\
                                                        <div class="t_right"><input type="text" class="time_input ven_custom_create_contact_job c_3" value="' + v['jobs'] + '"></div>\
                                                        </div>\
                                                        <div class="t_textinput">\
                                                        <div class="t_left "><i class="c_r v_hidden">*</i>邮箱</div>\
                                                        <div class="t_right"><input type="text" class="time_input ven_custom_create_contact_email c_3" value="' + v['email'] + '"></div>\
                                                        </div><div class="ven_custom_edit_cont_field_list">' + cusEditContFieldDatalistHtml + '</div></div>'
                                    });
                                    if (cusEditContDatalistHtml == '') {
                                        $.ajax({
                                            url: SERVER_URL + '/customer/settinglist',
                                            type: 'GET',
                                            data: {
                                                token: token,
                                                thetype: 5
                                            },
                                            dataType: 'json',
                                            success: function (oE) {
                                                if (oE.code == 0) {
                                                    var datalist = oE.datalist;
                                                    var venCusCreateContFieldHtml = '';
                                                    $.each(datalist, function (i, v) {
                                                        venCusCreateContFieldHtml += '<div class="t_textinput">\
                                                                    <div class="t_left">' + v['title'] + '</div>\
                                                                    <div class="t_right"><input type="text" class="time_input" value=""></div>\
                                                                    </div>'
                                                    });
                                                    cusEditContDatalistHtml = '<div class="worksp_addbx">\
                                                        <div class="work_sp_fqsp_h3">\
                                                        <h3 class="inline_block"><p>联系人信息<span class="c_r">(<cite class="page_31_khlxrNum">1</cite>)</span></p></h3>\
                                                    <div class="work_fqsp_gb_img xs_khgl_khlxrBut none"><i></i></div>\
                                                        </div>\
                                                        <div class="t_textinput">\
                                                        <div class="t_left t_left_conrow"><i class="c_r v_hidden">*</i>联系人类型</div>\
                                                        <div class="t_right">\
                                                        <div class="inline_block select_mormal select_100">\
                                                        <input type="text" class="select_input" value="业务">\
                                                        <i></i>\
                                                        <ul class="select_list l_createCusCome">\
                                                        <li>业务</li>\
                                                        <li>财务</li>\
                                                        <li>收货人</li>\
                                                        </ul>\
                                                        </div>\
                                                        </div>\
                                                        </div>\
                                                        <div class="t_textinput">\
                                                        <div class="t_left"><i class="c_r v_hidden">*</i>联系人</div>\
                                                        <div class="t_right"><input type="text" class="time_input ven_custom_create_contact_name" value="请输入联系人姓名" onfocus="fn_focus(this);" onblur="fn_blur(this);"></div>\
                                                        </div>\
                                                        <div class="t_textinput">\
                                                        <div class="t_left t_left_conrow"><i class="c_r v_hidden">*</i>联系人电话</div>\
                                                        <div class="t_right"><input type="text" class="time_input ven_custom_create_contact_tel" value="请输入联系人电话" onfocus="fn_focus(this);" onblur="fn_blur(this);"></div>\
                                                        </div>\
                                                        <div class="t_textinput">\
                                                        <div class="t_left "><i class="c_r v_hidden">*</i>职务</div>\
                                                        <div class="t_right"><input type="text" class="time_input ven_custom_create_contact_job" value="请输入联系人职务" onfocus="fn_focus(this);" onblur="fn_blur(this);"></div>\
                                                        </div>\
                                                        <div class="t_textinput">\
                                                        <div class="t_left "><i class="c_r v_hidden">*</i>邮箱</div>\
                                                        <div class="t_right"><input type="text" class="time_input ven_custom_create_contact_email" value="请输入联系人邮箱" onfocus="fn_focus(this);" onblur="fn_blur(this);"></div>\
                                                        </div><div class="ven_custom_edit_cont_field_list">' + venCusCreateContFieldHtml + '</div></div>'
                                                    cusEditContDatalistHtml += '<div class="t_textinput"><button class="but_icon xs_khgl_addlxrBut"><i></i>添加客户联系人</button></div>';
                                                    $('.tanceng .ven_cus_info_cont').html(cusEditContDatalistHtml);
                                                }
                                            }
                                        });
                                    } else {
                                        cusEditContDatalistHtml += '<div class="t_textinput"><button class="but_icon xs_khgl_addlxrBut"><i></i>添加客户联系人</button></div>';
                                        $('.tanceng .ven_cus_info_cont').html(cusEditContDatalistHtml);
                                    }
                                }
                            }
                        })
                    });

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

                    //编辑客户联系人
                    /*<div class="xs_khlxr_titBut right vendition_khbf_khlxr">\
                     <button class="but_mix val_dialog but_exit ven_custom_visit_edit_contact_btn" name="xs_fzbf_exitkhlxr">编辑</button><button class="but_mix but_r val_dialog ven_custom_visit_contact_del_btn" name="ven_khbf_sckhlxr">删除</button>\
                     </div>\*/
                } else {
                    alert('操作失败')
                }
            }
        });
    }

    //查看>删除
    $('#ven_custom_visit_look_del').die('click').live('click', function () {
        $('.slider_head_close').trigger('click');
        //把当前id存起来，删除用
        $('#ven_custom_visit_del_id').val(venCustomVisitCurrentId);
    });
    //查看>完成拜访
    $('#customVisitFinishBtn').die('click').live('click', function () {
        $.ajax({
            url: SERVER_URL + '/customer-visit/finished',
            type: 'POST',
            data: {
                token: token,
                uid: uid,
                visit_id: venCustomVisitCurrentId
            },
            dataType: 'json',
            success: function (oE) {
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
            dataType: 'json',
            success: function (oE) {
                var datalist = oE.datalist;
                console.log(datalist);
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
                        //图片
                        var imgUrl = '';
                        $.each(v['imgurl'], function (i3, v3) {
                            imgUrl += '<img src="' + getImgUrl(v3) + '" alt="图片" class="' + (v['imgurl'].length > 0 ? '' : 'none') + '" name="vendition_khbf_imglist" style="border-radius: 3px; width:100%;">';
                        });
                        //imgUrl += '<img src="' + v3 + '" alt="图片" class="val_dialog ' + (v['imgurl'].length > 0 ? '' : 'none') + '" name="vendition_khbf_imglist" style="border-radius: 3px; width:100%;">';
                        feedback += '<div class="work_report_exitBox work_report_date vendition_bfjl ven_custom_visit_feedback_box" name="report_all" feedbackid="' + v['id'] + '" style="margin-bottom:20px;">\
                            <div class="work_report_head">\
                            <div class="work_report_detHead clearfix inline_block" style="padding:0;">\
                            <span class="left m_top_5 m_left_5" style="background-image:url(' + v["face"] + ')"></span>\
                            <div class="work_report_personMsg left">\
                            <p>' + v['uname'] + '</p>\
                            <p>' + v['created_at'] + '</p>\
                        </div>\
                        </div>\
                            </div>\
                            <div class="work_report_det vendition_khbf1">\
                            <div class="work_report_detCon"\
                            <p>' + v['content'] + '</p>\
                        </div>\
                        <div class="work_report_upload vendition_khbf2" style="width: 96%;">' + imgUrl + '</div>\
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
        //图片
        var venCusVisitAddTractImg = '';
        $.each($('.tanceng .img_warp>li'), function (i, v) {
            venCusVisitAddTractImg += $('.tanceng .img_warp>li').eq(i).find('img').attr('imgurl') + ',';
        });
        venCusVisitAddTractImg = venCusVisitAddTractImg.substr(0, venCusVisitAddTractImg.length - 1);
        addfeedbackData.imgurl = venCusVisitAddTractImg;
        $.ajax({
            url: SERVER_URL + '/customer-visit/addfeedback',
            type: 'POST',
            data: addfeedbackData,
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    $('.tanceng').css('display', 'none').children('.dialog_box').remove();
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
    $('.ven_custom_visit_look_feedback_edit').die('click').live('click', function () {
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
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    $('.tanceng').css('display', 'none').children('.dialog_box').remove();
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
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    $('.tanceng').css('display', 'none').children('.dialog_box').remove();
                    customVisitFeedback(venCustomVisitCurrentId);
                }
            }
        });
    });

    // 添加评论
    $('.ven_custom_visit_look_add_commit_submit').die('click').live('click', function () {
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
            dataType: 'json',
            success: function (oE) {
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
    $('.ven_custom_visit_look_commit_del_btn').die('click').live('click', function () {
        currentCommitId = $(this).closest('.v_rsp_item').attr('commitid');
    });
    $('.tanceng .ven_cus_visit_del_commit_submit').die('click').live('click', function () {
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
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                }
            }
        });
    }

    //编辑客户联系人提交
    $('.tanceng .ven_custom_visit_add_contact_submit').die('click').live('click', function () {
        var cusContInfo = {};
        var cusEditCont = [];
        var cusEditContLen = $('.tanceng .ven_cus_info_cont').find('.worksp_addbx').length;
        for (var i = 0; i < cusEditContLen; i++) {
            var cusEditContField = [];
            //联系人类型
            var venCustomCreateContactType = $('.tanceng .ven_cus_info_cont .worksp_addbx').eq(i).find('.select_input').val();
            if (venCustomCreateContactType == "业务") {
                venCustomCreateContactType = 1
            } else if (venCustomCreateContactType == "财务") {
                venCustomCreateContactType = 2
            } else if (venCustomCreateContactType == "收货人") {
                venCustomCreateContactType = 3
            }
            $.each($('.tanceng .ven_cus_info_cont').find('.worksp_addbx').eq(i).find('.ven_custom_edit_cont_field_list .t_textinput'), function (i2, v) {
                cusEditContField.push({
                    title: $('.tanceng .ven_cus_info_cont').find('.worksp_addbx').eq(i).find('.ven_custom_edit_cont_field_list .t_textinput').eq(i2).find('.t_left').html(),
                    val: $('.tanceng .ven_cus_info_cont').find('.worksp_addbx').eq(i).find('.ven_custom_edit_cont_field_list .t_textinput').eq(i2).find('.time_input').val()
                });
            });
            //联系人名字
            var venCustomEditContactName = $('.tanceng .ven_cus_info_cont').find('.worksp_addbx').eq(i).find('.ven_custom_create_contact_name').val();
            if (venCustomEditContactName == "请输入联系人姓名") {
                venCustomEditContactName = ''
                continue;
            } else {
                venCustomEditContactName = $('.tanceng .ven_cus_info_cont').find('.worksp_addbx').eq(i).find('.ven_custom_create_contact_name').val();
            }
            //联系人电话
            var venCustomEditContactTel = $('.tanceng .ven_cus_info_cont').find('.worksp_addbx').eq(i).find('.ven_custom_create_contact_tel').val();
            if (venCustomEditContactTel == "请输入联系人电话") {
                venCustomEditContactTel = ''
            } else {
                venCustomEditContactTel = $('.tanceng .ven_cus_info_cont').find('.worksp_addbx').eq(i).find('.ven_custom_create_contact_tel').val();
            }
            //联系人职务
            var venCustomEditContactJob = $('.tanceng .ven_cus_info_cont').find('.worksp_addbx').eq(i).find('.ven_custom_create_contact_job').val();
            if (venCustomEditContactJob == "请输入联系人职务") {
                venCustomEditContactJob = ''
            } else {
                venCustomEditContactJob = $('.tanceng .ven_cus_info_cont').find('.worksp_addbx').eq(i).find('.ven_custom_create_contact_job').val();
            }
            //联系人邮箱
            var venCustomEditContactEmail = $('.tanceng .ven_cus_info_cont').find('.worksp_addbx').eq(i).find('.ven_custom_create_contact_email').val();
            if (venCustomEditContactEmail == "请输入联系人邮箱") {
                venCustomEditContactEmail = ''
            } else {
                venCustomEditContactEmail = $('.tanceng .ven_cus_info_cont').find('.worksp_addbx').eq(i).find('.ven_custom_create_contact_email').val();
            }
            cusEditCont.push({
                contact_type: venCustomCreateContactType,
                name: venCustomEditContactName,
                tel: venCustomEditContactTel,
                jobs: venCustomEditContactJob,
                email: venCustomEditContactEmail,
                custom_field: cusEditContField
            })
        }
        venCusInfoData.contacts = cusEditCont;
        console.log(venCusInfoData);
        $.ajax({
            url: SERVER_URL + '/customer/add',
            type: 'POST',
            data: venCusInfoData,
            dataType: 'json',
            success: function (e) {
                if (e.code == 0) {
                    $('.tanceng>div').remove();
                    $('.tanceng').css({
                        'display': 'none'
                    });
                    customVisitLook(venCustomVisitCurrentId);
                } else {
                    alert(e.msg);
                }

            }
        });
    });
    /*
     var venCutVisitAddContactData = {
     token: token,
     visit_id: '',
     name: '',
     tel: '',
     job: '',
     email: ''
     };
     $('.tanceng .ven_custom_visit_add_contact_submit').die('click').live('click', function () {
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
     dataType: 'json',
     success: function (oE) {
     if (oE.code == 0) {
     customVisitLook(venCustomVisitCurrentId);
     $('.tanceng').css('display', 'none').children('.dialog_box').remove();
     }
     }
     });
     });
     */
    //编辑客户联系人
    var venCutVisitEditContactData = {
        token: token,
        id: '',
        name: '',
        tel: '',
        job: '',
        email: ''
    };
    $('.ven_custom_visit_edit_contact_btn').die('click').live('click', function () {
        venCutVisitEditContactData.id = $(this).closest('.d-r-t-h').attr('contactid');
        $.ajax({
            url: SERVER_URL + '/customer-visit/infocontacts',
            type: 'GET',
            data: {
                token: token,
                id: venCutVisitEditContactData.id
            },
            dataType: 'json',
            success: function (oE) {
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
    $('.tanceng .ven_custom_visit_edit_contact_submit').die('click').live('click', function () {
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
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    customVisitLook(venCustomVisitCurrentId);
                    $('.tanceng').css('display', 'none').children('.dialog_box').remove();
                }
            }
        });
    });
    //删除客户联系人
    var currentContactId = null;
    $('.ven_custom_visit_contact_del_btn').die('click').live('click', function () {
        currentContactId = $(this).closest('.d-r-t-h').attr('contactid');
    });
    $('.tanceng .ven_cus_visit_contact_del_submit').die('click').live('click', function () {
        $.ajax({
            url: SERVER_URL + '/customer-visit/delcontacts',
            type: 'GET',
            data: {
                token: token,
                id: currentContactId
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    customVisitLook(venCustomVisitCurrentId);
                    $('.tanceng').css('display', 'none').children('.dialog_box').remove();
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
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                if (oE.code == 0) {
                    var data = oE.data;
                    //普通商品
                    if (data['product']) {
                        var productArr = data['product'];
                        if (productArr.length == 0) {
                            $('#ven_custom_visit_look_product_list').css('display', 'none');
                        } else {
                            $('#ven_custom_visit_look_product_list').css('display', 'block');
                            var productHtml = '';
                            $.each(productArr, function (i, v) {
                                var productAttr = '';
                                $.each(v['pdt']['attributes'], function (i2, v2) {
                                    productAttr += v2['value'] + '/'
                                });
                                productAttr = productAttr.slice(0, productAttr.length - 1);
                                productHtml += '<p class="l-s-x ven_custom_visit_look_product_del_box" visitproductid="' + v['pdt']['id'] + '">' + v['pdt']['name'] + ' ， ' + v['pdt']['code_sn'] + ' ， ' + productAttr + ' ， ' + v['pdt']['unit_name'] + '<span class="val_dialog c_r right ven_customer_visit_product_del" name="vendition_khbf_sc_visit_product" style="margin-right: 35px;">删除</span></p>';
                            });
                            $('#ven_custom_visit_look_product_list_box').html(productHtml);
                        }
                    }

                    //套餐商品
                    if (data['productPackage']) {
                        var packageArr = data['productPackage'];
                        if (packageArr.length == 0) {
                            $('#ven_custom_visit_look_package_list').css('display', 'none');
                        } else {
                            $('#ven_custom_visit_look_package_list').css('display', 'block');
                            var packageHtml = '';
                            $.each(packageArr, function (i, v) {
                                packageHtml += '<p class="l-s-x ven_custom_visit_look_product_del_box" visitproductid="' + v['pdt']['id'] + '">' + v['pdt']['name'] + ' ， ' + v['pdt']['code_sn'] + '<span class="val_dialog c_r right ven_customer_visit_product_del" name="vendition_khbf_sc_visit_product" style="margin-right: 35px;">删除</span></p>';
                            });
                            $('#ven_custom_visit_look_package_list_box').html(packageHtml);
                        }
                    }

                    //整机商品
                    if (data['productSetting']) {
                        var settingArr = data['productSetting'];
                        if (settingArr.length == 0) {
                            $('#ven_custom_visit_look_setting_list').css('display', 'none');
                        } else {
                            $('#ven_custom_visit_look_setting_list').css('display', 'block');
                            var settingHtml = '';
                            $.each(settingArr, function (i, v) {
                                settingHtml += '<p class="l-s-x ven_custom_visit_look_product_del_box" visitproductid="' + v['pdt']['id'] + '">' + v['pdt']['cate_name'] + ' ， ' + v['pdt']['code_sn'] + ' ， ' + v['pdt']['attr_name'] + '<span class="val_dialog c_r right ven_customer_visit_product_del" name="vendition_khbf_sc_visit_product" style="margin-right: 35px;">删除</span></p>'
                            });
                            $('#ven_custom_visit_look_setting_list_box').html(settingHtml);
                        }
                    }

                }
            }
        });
    }


    //选择拜访商品

    //添加拜访商品
    var addBfspData = {
        token: token,
        visit_id: '',
        uid: uid,
        product: '',
        package_product: '',
        setting_product: ''
    };
    var venCusVisitBfspGoodsChosen = [];
    var venCusVisitBfspPackageChosen = [];
    var venCusVisitBfspSettingChosen = [];

    //选择商品
    //商品分类参数
    var venSellQuoteCreateChooseGoodsCateListData = {
        token: token,
        category: 1, //类型 1.商品 2.整机商品
        name: '', // 分类名称
        detail: 1 // 是否获取各类型的数量总数 0 否 1 是
    };
    //商品分类
    function venSellQuoteCreateChooseGoodsSortFn() {
        $.ajax({
            url: SERVER_URL + '/product-category/list',
            type: 'GET',
            data: venSellQuoteCreateChooseGoodsCateListData,
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                var datalist = oE.dataList;
                var goodsCateListHtml = '';
                $.each(datalist, function (i, v) {
                    goodsCateListHtml += '<li goodscateid="' + v['id'] + '" class="' + (i == 0 ? 'Sideslip_list_on' : '') + '"><span>' + v['name'] + '</span></li>';
                });
                $('.tanceng .ven_cus_visit_bfsp_choose_goods_cate_list').html(goodsCateListHtml);
                getGoodsListByCateFn($('.tanceng .ven_cus_visit_bfsp_choose_goods_cate_list li:nth-of-type(1)').attr('goodscateid'));
            },
            error: function (e) {
                alert(e.msg);
                console.log(e);
            }
        });
    }

    //商品分类搜索功能
    $('.ven_cus_visit_bfsp_choose_goods_cate_search_btn').die('click').live('click', function () {
        if ($('.ven_cus_visit_bfsp_choose_goods_cate_search_inp').val() == '') {
            return false;
        }
        $('.tanceng .ven_cus_visit_bfsp_choose_goods_inp_add_list').html('<li style="margin-top: 1px;">' + $('.ven_cus_visit_bfsp_choose_goods_cate_search_inp').val() + ' <i></i></li>');
        venSellQuoteCreateChooseGoodsCateListData.name = $('.ven_cus_visit_bfsp_choose_goods_cate_search_inp').val();
        venSellQuoteCreateChooseGoodsSortFn();
        $('.ven_cus_visit_bfsp_choose_goods_cate_search_inp').val('').attr('readonly', true);
    });

    //商品分类 - 删除搜索项
    $('.tanceng .ven_cus_visit_bfsp_choose_goods_inp_add_list li i').die('click').live('click', function () {
        $(this).closest('li').remove();
        venSellQuoteCreateChooseGoodsCateListData.name = '';
        venSellQuoteCreateChooseGoodsSortFn();
        $('.ven_cus_visit_bfsp_choose_goods_cate_search_inp').val('').attr('readonly', false);
    });

    //获取基本商品列表参数
    var getGoodsListData = {
        token: token,
        key: '', //关键字
        page: 1, //页码
        num: 10, //每页数量
        status: 0, //是否启用状态 0正常 1停用
        unit_id: '', // 基本单位id
        cate_id: '', //分类id
        brand_id: '', //品牌ID
        attr: '' //属性
    };
    //选择商品分类切换商品列表
    $('.ven_cus_visit_bfsp_choose_goods_cate_list li').die('click').live('click', function () {
        $('.ven_cus_visit_bfsp_choose_goods_list_search_inp').val('搜索商品编号/商品名称').css('#ccc');
        getGoodsListData.key = '';
        getGoodsListByCateFn($(this).attr('goodscateid'));
    });
    //获取基本商品列表
    function venSellQuoteCreateChooseGoodsFn() {
        $.ajax({
            url: SERVER_URL + '/product/list',
            type: 'GET',
            data: getGoodsListData,
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                //搜索结果
                $('.tanceng .ven_cus_visit_bfsp_choose_goods_totals').html(oE.totalcount);
                var datalist = oE.dataList;
                if (datalist.length == 0) {
                    $('.ven_cus_visit_bfsp_choose_goods_nodata_box').removeClass('none');
                    $('.ven_cus_visit_bfsp_choose_goods_handle').addClass('none');
                } else {
                    $('.ven_cus_visit_bfsp_choose_goods_nodata_box').addClass('none');
                    $('.ven_cus_visit_bfsp_choose_goods_handle').removeClass('none');
                }
                var goodsListHtml = '';
                //属性名
                var goodsAttrNameArr = getGoodsCateAttrListFn(getGoodsListData.cate_id);
                var goodsAttrName = '';
                $.each(goodsAttrNameArr, function (i, v) {
                    //表头
                    goodsAttrName += '<th>' + v + '</th>';
                });
                $.each(datalist, function (i, v) {
                    //属性值
                    var goodsAttrValue = '';
                    var goodsAttrValueText = '';
                    $.each(goodsAttrNameArr, function (i2, v2) {
                        var temp = [];
                        $.each(v['attributes'], function (i3, v3) {
                            temp.push(v3['name']);
                        });
                        if ($.inArray(v2, temp) != -1) {
                            $.each(v['attributes'], function (i3, v3) {
                                if (v2 == v3['name']) {
                                    var splP = '';
                                    if (v3['value'].length > 10) {
                                        splP = 'xiangmu_p';
                                    }
                                    goodsAttrValue += '<td><p class="' + splP + '">' + v3['value'] + '</p></td>';
                                } else {
                                    return true;
                                }
                            });
                        } else {
                            goodsAttrValue += '<td>-</td>';
                        }
                    });
                    $.each(v['attributes'], function (i2, v2) {
                        goodsAttrValueText += v2['value'] + '/';
                    });
                    goodsAttrValueText = goodsAttrValueText.slice(0, goodsAttrValueText.length - 1);
                    //列表内容
                    goodsListHtml += '<tr goodsid="' + v['id'] + '" goodstaxtype="' + v['taxtype'] + '" goodsattr="' + goodsAttrValueText + '" goodsretailprice="' + v['retail_price'] + '" goodslowerprice="' + v['lower_price'] + '" goodscostprice="' + v['cost_price'] + '">\
                                        <td><input type="checkbox"></td>\
                                        <td>' + l_dbl(i + 1) + '</td>\
                                        <td class="goodscodesn">' + v['code_sn'] + '</td>\
                                        <td class="goodsname">' + v['name'] + '</td>\
                                        <td class="goodsunitname">' + v['unit_name'] + '</td>' + goodsAttrValue + '\
                                        <td>' + v['remark'] + '</td>\
                                        </tr>'
                });
                //表头
                $('.tanceng .ven_cus_visit_bfsp_choose_goods_list_thead').html('<tr><th>选择</th><th>序号</th><th>商品编号</th><th>名称</th><th>基本单位</th>' + goodsAttrName + '<th>备注</th></tr>');
                //表格主体
                $('.tanceng .ven_cus_visit_bfsp_choose_goods_list').html(goodsListHtml);
                //分页
                list_table_render_pagination('.ven_cus_visit_bfsp_choose_goods_pagination', getGoodsListData, venSellQuoteCreateChooseGoodsFn, oE.totalcount, datalist.length);
            },
            error: function (e) {
                alert(e.msg);
                console.log(e);
            }
        });
    }

    //商品属性高级搜索
    var attrSearch = [];
    var attrTemp = [];
    //切换分类调取不同列表 函数
    function getGoodsListByCateFn(cateid) {
        getGoodsListData.attr = '';
        attrSearch = [];
        attrTemp = [];
        if (cateid == undefined) {
            $('.ven_cus_visit_bfsp_choose_goods_list').addClass('none');
            $('.ven_cus_visit_bfsp_choose_goods_handle').addClass('none');
            $('.ven_cus_visit_bfsp_choose_goods_nodata_box').removeClass('none');
            return false;
        } else {
            getGoodsListData.cate_id = cateid;
            $('.ven_cus_visit_bfsp_choose_goods_list').removeClass('none');
            $('.ven_cus_visit_bfsp_choose_goods_handle').removeClass('none');
            $('.ven_cus_visit_bfsp_choose_goods_nodata_box').addClass('none');
        }
        venSellQuoteCreateChooseGoodsFn();
        getGoodsCateAttrListFn(cateid);
    }

    //商品属性高级搜索
    $('.tanceng .goods_attr_search_table li').die('click').live('click', function () {
        if ($.inArray($(this).attr('cate'), attrTemp) == -1) {
            attrTemp.push($(this).attr('cate'));
            attrSearch.push({
                title: $(this).attr('cate'),
                val: $(this).attr('attr')
            });
        } else {
            attrSearch[$.inArray($(this).attr('cate'), attrTemp)]['val'] = $(this).attr('attr');
        }
        var attrSearchField = [];
        $.each(attrSearch, function (i, v) {
            attrSearchField.push(v['val']);
        });
        getGoodsListData.cate_id = $('.pro_goods_cate_list_ul li.Sideslip_list_on').attr('goodscateid');
        getGoodsListData.attr = arrayToJson(attrSearchField);
        venSellQuoteCreateChooseGoodsFn();
    });
    //商品属性
    function getGoodsCateAttrListFn(cateId) {
        var goodsAttrList = [];
        $.ajax({
            url: SERVER_URL + '/product-category/loadcategory',
            type: 'GET',
            async: false,
            data: {
                token: token,
                id: cateId
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    console.log(oE.data);
                    var datalist = oE.data.attrList;
                    var cateAttrList = '';
                    $.each(datalist, function (i, v) {
                        if (v['list'][1] && v['list'][1].value != '') {
                            var attrList = '';
                            $.each(v['list'], function (i2, v2) {
                                if (v2['value'] == '')return true;
                                attrList += '<li cate="' + v2['name'] + '" attr="' + (v2['id'] + '&' + v2['value']) + '">' + v2['value'] + '</li>';
                            });
                            cateAttrList += '<div class="zkgjjss_value">\
                            <div class="zkgjjss_value_left">' + v['category_name'] + '</div>\
                            <div class="zkgjjss_value_right">\
                            <div class="inline_block select_mormal select_p">\
                            <input type="text" class="select_input block" value="待选择">\
                            <i></i>\
                            <ul class="select_list pur_supplier_come_from_ul sbar" style = "display: none;" >' + attrList + '</ul>\
                            </div>\
                            </div>\
                            </div> ';
                        }
                        goodsAttrList.push(v['category_name']);
                    });
                    $('.goods_attr_search_table').html(cateAttrList);
                }
            },
            error: function (e) {
                console.log(e);
            }
        });
        return goodsAttrList;
    }

    //搜索关键字
    $('.tanceng .ven_cus_visit_bfsp_choose_goods_search_btn').die('click').live('click', function () {
        getGoodsListData.cate_id = $('.pro_goods_cate_list_ul li.Sideslip_list_on').attr('goodscateid');
        if ($('.tanceng .ven_cus_visit_bfsp_choose_goods_search_inp').val() == '搜索商品编号/商品名称') {
            getGoodsListData.key = '';
        } else {
            getGoodsListData.key = $('.tanceng .ven_cus_visit_bfsp_choose_goods_search_inp').val();
        }
        venSellQuoteCreateChooseGoodsFn();
    });


    //选择商品
    $('.tanceng .ven_cus_visit_bfsp_choose_goods_btn').die('click').live('click', function () {
        venSellQuoteCreateChooseGoodsSortFn();
        venCusVisitBfspGoodsChosen = [];
        //清空属性搜索
        attrSearch = [];
        attrTemp = [];
        $(this).closest('.dialog_box').remove();
    });
    $('.tanceng .ven_sell_quote_choose_products_ul li').die('click').live('click', function () {
        if ($(this).index() == 0) {
            venCusVisitBfspGoodsChosen = [];
        }
    });
    //选择商品 - 保存
    $('.tanceng .ven_cus_visit_bfsp_choose_goods_save_btn').die('click').live('click', function () {
        $.each($('.tanceng .ven_cus_visit_bfsp_choose_goods_list tr'), function (i, v) {
            if ($('.tanceng .ven_cus_visit_bfsp_choose_goods_list tr').eq(i).find('input:checkbox').is(':checked')) {
                venCusVisitBfspGoodsChosen.push($('.tanceng .ven_cus_visit_bfsp_choose_goods_list tr').eq(i).attr('goodsid'));
            }
        });
        addBfspData.product = venCusVisitBfspGoodsChosen.join(',');
        addBfspSubmitFn();
        $(this).closest('.dialog_box').remove();
    });

    /*选择套餐商品*/

    var getPackagePackageData = {
        token: token,
        key: '', //关键字（套餐）
        page: 1, //第几页（1）
        num: 10, //每页条数（10）
        status: 0 // 查询状态
    };

    function venSellQuoteCreateChoosePackageFn() {
        /*套餐商品列表展示*/
        $.ajax({
            type: 'get',
            url: SERVER_URL + "/product-package/list",
            data: getPackagePackageData,
            dataType: "json",
            success: function (data) {
                var datalist = data.datalist;
                $('.tanceng .ven_cus_visit_bfsp_choose_package_totals').html(data.totalcount);
                if (datalist.length == 0) {
                    $('.ven_cus_visit_bfsp_choose_package_nodata_box').removeClass('none');
                    $('.ven_cus_visit_bfsp_choose_package_handle').addClass('none');
                } else {
                    $('.ven_cus_visit_bfsp_choose_package_nodata_box').addClass('none');
                    $('.ven_cus_visit_bfsp_choose_package_handle').removeClass('none');
                }
                console.log(datalist);
                var html = '';
                $.each(datalist, function (i, v) {
                    html += '<tr packageid="' + v['id'] + '">\
                                <td><input type="checkbox" name="xs_bjd_xztcsp"></td>\
                                <td>' + likNullData(v['code_sn']) + '</td>\
                                <td>' + likNullData(v['name']) + '</td>\
                                <td>' + likNullData(v['remark']) + '</td>\
                            </tr>'
                });
                $('.tanceng .ven_cus_visit_bfsp_choose_package_list').html(html);
                list_table_render_pagination(".ven_cus_visit_bfsp_choose_package_pagination", getPackagePackageData, venSellQuoteCreateChoosePackageFn, data.totalcount, datalist.length);
            },
            error: function (data) {
                alert(e.msg);
                alert(data);
            }
        });
    }

    //选择套餐商品
    $('.tanceng .ven_cus_visit_bfsp_choose_package_btn').die('click').live('click', function () {
        venSellQuoteCreateChoosePackageFn();
        venCusVisitBfspPackageChosen = [];
        $('.xs_TC').find('td').css('border-bottom', 'none');
        $(this).closest('.dialog_box').remove();
    });

    //搜索关键字
    $('.tanceng .ven_cus_visit_bfsp_choose_package_search_btn').die('click').live('click', function () {
        if ($('.tanceng .ven_cus_visit_bfsp_choose_package_inp').val() == '搜索套餐编号/套餐名称') {
            getPackagePackageData.key = '';
        } else {
            getPackagePackageData.key = $('.tanceng .ven_cus_visit_bfsp_choose_package_inp').val();
        }
        venSellQuoteCreateChoosePackageFn();
    });
    //选择套餐商品 - 保存
    $('.tanceng .ven_cus_visit_bfsp_choose_package_save').die('click').live('click', function () {
        $.each($('.tanceng .ven_cus_visit_bfsp_choose_package_list tr'), function (i, v) {
            if ($('.tanceng .ven_cus_visit_bfsp_choose_package_list tr').eq(i).find('input:checkbox').is(':checked')) {
                venCusVisitBfspPackageChosen.push($('.tanceng .ven_cus_visit_bfsp_choose_package_list tr').eq(i).attr('packageid'));
            }
        });
        addBfspData.package_product = venCusVisitBfspPackageChosen.join(',');
        addBfspSubmitFn();
    });

    /*整机商品*/

    var likSettingGoodsListArr = [];
    var likSettingGoodsListValArr = [];
    $('.tanceng .ven_cus_visit_bfsp_choose_setting_btn').die('click').live('click', function () {
        venSellQuoteCreateChooseSettingSortFn();
        venCusVisitBfspSettingChosen = [];
        likSettingGoodsListArr = [];
        $.each($('.tanceng .ven_cus_visit_bfsp_choose_setting_box_list .ven_cus_visit_bfsp_choose_setting_kxp_list'), function (i, v) {
            likSettingGoodsListArr.push($('.tanceng .ven_cus_visit_bfsp_choose_setting_box_list .ven_cus_visit_bfsp_choose_setting_kxp_list').eq(i).html());
        });
        likSettingGoodsListValArr = [];
        $.each($('.tanceng .ven_cus_visit_bfsp_choose_setting_box_list .sell_quote_create_setting_cost_one_change'), function (i, v) {
            likSettingGoodsListValArr.push($('.tanceng .ven_cus_visit_bfsp_choose_setting_box_list .sell_quote_create_setting_cost_one_change').eq(i).val());
        });
        $(this).closest('.dialog_box').remove();
    });

    //整机商品分类参数
    var venSellQuoteSettingSortData = {
        token: token,
        category: 2, // 类型 1.商品 2.整机商品
        name: '', // 分类名称
        detail: 1 // 是否获取各类型的数量总数 0 否 1 是
    };
    //整机商品分类
    function venSellQuoteCreateChooseSettingSortFn() {
        $.ajax({
            url: SERVER_URL + '/product-category/list',
            type: 'GET',
            data: venSellQuoteSettingSortData,
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                var datalist = oE.dataList;
                var completeCateListHtml = '';
                $.each(datalist, function (i, v) {
                    completeCateListHtml += '<li completecateid="' + v['id'] + '" class="' + (i == 0 ? 'Sideslip_list_on' : '') + '"><span>' + v['name'] + '</span></li>';
                });
                $('.ven_cus_visit_bfsp_choose_setting_sort_list').html(completeCateListHtml);
                getSellQuoteChooseCompleteGoodsListByCateFn($('.ven_cus_visit_bfsp_choose_setting_sort_list li:nth-of-type(1)').attr('completecateid'));
            },
            error: function (e) {
                alert(e.msg);
                console.log(e);
            }
        });
    }

    //获取整机商品列表参数
    var getSellQuoteChooseCompleteGoodsListData = {
        token: token,
        key: '', //关键字
        page: 1, //页码
        num: 10, //每页数量
        status: 0, //是否启用状态 0正常 1停用
        cate_id: '', //分类id
        is_optional: '' //是否可选配 1 是 2 否
    };
    //选择整机商品分类切换整机商品列表
    $('.tanceng .ven_cus_visit_bfsp_choose_setting_sort_list li').die('click').live('click', function () {
        $('.tanceng .ven_cus_visit_bfsp_choose_setting_search_inp').val('搜索商品编号/商品名称').css('#ccc');
        getSellQuoteChooseCompleteGoodsListData.key = '';
        getSellQuoteChooseCompleteGoodsListData.page = 1;
        getSellQuoteChooseCompleteGoodsListByCateFn($(this).attr('completecateid'));
    });
    //获取整机商品列表
    function getSellQuoteChooseCompleteGoodsListFn() {
        $.ajax({
            url: SERVER_URL + '/product-setting/list',
            type: 'GET',
            data: getSellQuoteChooseCompleteGoodsListData,
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                //搜索结果
                $('.tanceng .ven_cus_visit_bfsp_choose_setting_totals').html(oE.totalcount);
                var datalist = oE.datalist;
                if (datalist.length == 0) {
                    $('.tanceng .ven_cus_visit_bfsp_choose_setting_nodata_box').removeClass('none');
                    $('.tanceng .ven_cus_visit_bfsp_choose_setting_handle').addClass('none');
                } else {
                    $('.tanceng .ven_cus_visit_bfsp_choose_setting_nodata_box').addClass('none');
                    $('.tanceng .ven_cus_visit_bfsp_choose_setting_handle').removeClass('none');
                }
                var completeListHtml = '';
                //整机类型
                var completeOptionalName = '';
                $.each(datalist, function (i, v) {
                    //整机类型
                    if (v['is_optional'] == 1) {
                        completeOptionalName = '可选配';
                    } else if (v['is_optional'] == 2) {
                        completeOptionalName = '不可选配';
                    }
                    //列表内容
                    completeListHtml += '<tr completeid="' + v['id'] + '">\
                                        <td><input type="checkbox"></td>\
                                        <td>' + v['code_sn'] + '</td>\
                                        <td>' + v['name'] + '</td>\
                                        <td>' + completeOptionalName + '</td>\
                                        <td>' + v['attr_name'] + '</td>\
                                        <td>' + v['remark'] + '</td>\
                                        </tr>'
                });
                //表格主体
                $('.tanceng .ven_cus_visit_bfsp_choose_setting_list').html(completeListHtml);
                //分页
                list_table_render_pagination('.tanceng .ven_cus_visit_bfsp_choose_setting_pagination', getSellQuoteChooseCompleteGoodsListData, getSellQuoteChooseCompleteGoodsListFn, oE.totalcount, datalist.length);
            },
            error: function (e) {
                alert(e.msg);
                console.log(e);
            }
        });
    }

    //切换分类调取不同列表 函数
    function getSellQuoteChooseCompleteGoodsListByCateFn(cateid) {
        if (cateid == undefined) {
            $('.pro_complete_list_tbody').addClass('none');
            $('.pro_complete_list_handle').addClass('none');
            $('.pro_complete_list_nodata_box').removeClass('none');
            return false;
        } else {
            getSellQuoteChooseCompleteGoodsListData.cate_id = cateid;
            $('.pro_complete_list_tbody').removeClass('none');
            $('.pro_complete_list_handle').removeClass('none');
            $('.pro_complete_list_nodata_box').addClass('none');
        }
        getSellQuoteChooseCompleteGoodsListFn();
    }

    //整机商品分类搜索功能
    $('.ven_cus_visit_bfsp_choose_setting_cate_search_btn').die('click').live('click', function () {
        if ($('.tanceng .ven_cus_visit_bfsp_choose_setting_cate_search_inp').val() == '') {
            return false;
        }
        $('.ven_cus_visit_bfsp_choose_setting_inp_add_list').html('<li style="margin-top: 1px;">' + $('.tanceng .ven_cus_visit_bfsp_choose_setting_cate_search_inp').val() + ' <i></i></li>');
        venSellQuoteSettingSortData.name = $('.tanceng .ven_cus_visit_bfsp_choose_setting_cate_search_inp').val();
        venSellQuoteCreateChooseSettingSortFn();
        $('.tanceng .ven_cus_visit_bfsp_choose_setting_cate_search_inp').val('').attr('readonly', true);
    });
    //整机商品分类搜索 - 删除关键字
    $('.ven_cus_visit_bfsp_choose_setting_inp_add_list li i').die('click').live('click', function () {
        $(this).closest('li').remove();
        $('.tanceng .ven_cus_visit_bfsp_choose_setting_cate_search_inp').val('').attr('readonly', false);
        venSellQuoteSettingSortData.name = '';
        venSellQuoteCreateChooseSettingSortFn();
    });

    //整机商品 - 搜索关键字
    $('.tanceng .ven_cus_visit_bfsp_choose_setting_search_btn').die('click').live('click', function () {
        if ($('.tanceng .ven_cus_visit_bfsp_choose_setting_search_inp').val() == '搜索商品编号/商品名称') {
            alert('请输入搜索关键字');
            getSellQuoteChooseCompleteGoodsListData.key = '';
        } else {
            getSellQuoteChooseCompleteGoodsListData.key = $('.tanceng .ven_cus_visit_bfsp_choose_setting_search_inp').val();
        }
        getSellQuoteChooseCompleteGoodsListFn();
    });

    //整机商品 - 搜索整机类型
    $('.tanceng .ven_cus_visit_bfsp_choose_optional_list li').die('click').live('click', function () {
        getSellQuoteChooseCompleteGoodsListData.is_optional = $(this).attr('optional');
        getSellQuoteChooseCompleteGoodsListFn();
    });

    //选择整机商品 - 保存
    $('.tanceng .ven_cus_visit_bfsp_choose_setting_save').die('click').live('click', function () {
        $.each($('.tanceng .ven_cus_visit_bfsp_choose_setting_list tr'), function (i, v) {
            if ($('.tanceng .ven_cus_visit_bfsp_choose_setting_list tr').eq(i).find('input:checkbox').is(':checked')) {
                venCusVisitBfspSettingChosen.push($('.tanceng .ven_cus_visit_bfsp_choose_setting_list tr').eq(i).attr('completeid'));
            }
        });
        addBfspData.setting_product = venCusVisitBfspSettingChosen.join(',');
        addBfspSubmitFn();
    });


    //添加拜访商品
    //定义获取参数
    cusVisitAddProductData = {
        token: token,
        key: '',
        page: 1,
        num: 10,
        cate_id: ''
    };
    $('#ven_custom_visit_look_product_add_btn').die('click').live('click', function () {
        $('.tanceng .ven_custom_visit_add_product_btn').trigger('click');
        addBfspData.visit_id = venCustomVisitCurrentId;
        venCusVisitBfspGoodsChosen = [];
        venCusVisitBfspPackageChosen = [];
        venCusVisitBfspSettingChosen = [];
        addBfspData.product = '';
        addBfspData.package_product = '';
        addBfspData.setting_product = '';
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
            dataType: 'json',
            success: function (oE) {
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
            dataType: 'json',
            success: function (oE) {
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
            dataType: 'json',
            success: function (oE) {
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

    //整机商品
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
            dataType: 'json',
            success: function (oE) {
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
    $('.tanceng .ven_custom_visit_add_product_search_btn').die('click').live('click', function () {
        if ($('.tanceng .tabhover').html() == '商品') {
            cusVisitAddProductData.key = $('.tanceng .ven_custom_visit_add_product_search_inp').val();
            cusVisitAddProductFn();
        } else if ($('.tanceng .tabhover').html() == '套餐商品') {
            cusVisitAddProductPackageData.key = $('.tanceng .ven_custom_visit_add_product_search_inp').val();
            cusVisitAddProductPackageFn();
        } else if ($('.tanceng .tabhover').html() == '整机商品') {
            cusVisitAddProductConfigData.key = $('.tanceng .ven_custom_visit_add_product_search_inp').val();
            cusVisitAddProductConfigFn();
        }
    });

    //添加商品提交
    function addBfspSubmitFn() {
        console.log(addBfspData);
        if ($('.tanceng>.dialog_box').length == 0) {
            $('.tanceng').css('display', 'none');
        }
        $.ajax({
            url: SERVER_URL + '/customer-visit/addproduct',
            type: 'POST',
            data: addBfspData,
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    alert('添加成功');
                    $('.tanceng').css('display', 'none').children('.dialog_box').remove();
                    $('#ven_custom_visit_look_products_btn').trigger('click');
                } else {
                    alert(oE.msg)
                }
            }
        });
    }

    //删除商品
    var delProductId = null;
    $('.ven_customer_visit_product_del').die('click').live('click', function () {
        delProductId = $(this).closest('.ven_custom_visit_look_product_del_box').attr('visitproductid');
    });
    //删除商品确认
    $('.tanceng .ven_cus_visit_del_product_submit').die('click').live('click', function () {
        $.ajax({
            url: SERVER_URL + '/customer-visit/delproduct',
            type: 'POST',
            data: {
                token: token,
                uid: uid,
                visit_id: venCustomVisitCurrentId,
                visitproduct_id: delProductId
            },
            dataType: 'json',
            success: function (oE) {
                $('.tanceng').css('display', 'none').children('.dialog_box').remove();
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
        owner: '',  //负责人
        copy_list: ''
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

    $('.ven_custom_visit_create_btn').die('click').live('click', function () {
        venCustomVisitCreateData = {
            token: token,
            visit_id: 0, //拜访id,有值为修改
            customer_id: '', //客户id	添加有
            uid: uid, //创建人	添加有
            thetype: 0, //拜访类型
            visited_at: '', //拜访时间
            dept: deptId, //负责部门
            owner: uid,  //负责人
            copy_list: ''
        };
        //新建弹窗清空已有数据
        $('.tanceng input').css('color', '#ccc');
        $('.tanceng .ven_custom_visit_create_add_dept_list').children().remove();
        $('.tanceng .ven_custom_visit_add_owner_list').children().remove();

        //创建时间
        $('.tanceng .ven_custom_visit_create_at').html(getCurrentDate());
        //创建人
        $('.tanceng .ven_cus_visit_create_uname').html(uname);
        //负责人
        $('.tanceng .ven_cus_visit_create_owner_inp').val(uname);
    });

    //选择客户
    $('.tanceng .ven_custom_visit_choose_customer').die('click').live('click', function () {
        getCusListByAreaSort();
        getCusListData = {
            token: token,
            page: 1, //当前页
            num: 10, // 每页显示条数
            key: '', // 关键字
            industry_big_id: '', // 行业大类id
            category_id: '', // 分类id
            comefrom: '', // 来源类型id
            grade: '', // 级别id
            credit: '', // 信用额度
            owner: uid, // 负责人id
            created_at: '',
            statusflag: '' // 作废状态  0 有效客户 1 作废客户  不传 是全部
        }
        getCusList();
        xs_kh_gjss_xlk();
    });


    //客户按区域分类参数
    var cusListByAreaData = {
        token: token,
        status: 0
    };
    //所有客户按区域分类
    function getCusListByAreaSort() {
        $.ajax({
            url: SERVER_URL + '/customer/arealist',
            type: 'GET',
            data: cusListByAreaData,
            dataType: 'json',
            success: function (oE) {
                $('i.ven_cus_area_total').html(oE.count);
                var datalist = oE.datalist;
                var deep = 0;
                $('.tanceng .ven_customer_area_sort_list').html(tree_list_close(datalist, deep));
                // 下级分类图标样式控制
                for (var i = 0; i < $('i.ven_customer_area_sort_list li').length; i++) {
                    if ($('i.ven_customer_area_sort_list li').eq(i).next('ul').children().length == 0) {
                        $('i.ven_customer_area_sort_list li').eq(i).find('span').addClass('oth');
                        $('i.ven_customer_area_sort_list li').eq(i).parent('ul').addClass('oth')
                    }
                }
                $('.hr_left_all').live("click", function () {
                    //判断点击元素下有没有ul子节点，有的话展开树结构
                    var next_p = $(this).nextAll('i').find('ul');
                    if (next_p.length > 0) {
                        $(this).parents('ul').toggleClass("change");
                        $(this).nextAll('i').toggle();
                    }
                    ;
                    $(this).parents(".hr_left_nav").find("cite").remove();
                    $(this).append("<cite></cite>");
                });
                $('.hr_left_1').die('click').live("click", function () {
                    $(this).nextAll('ul').toggle();
                    //判断点击元素下有没有ul子节点，有的话展开树结构
                    var next_p = $(this).nextAll('ul');
                    if (next_p.length > 0) {
                        $(this).nextAll('ul').toggle();
                    }
                    $(this).parents(".hr_left_nav").find("cite").remove();
                    $(this).append("<cite></cite>");
                });
                $('#ven_customer_area_sort_list_wrap_ul li').live('click', function () {
                    getCusListData.id = $(this).attr('cussortid');
                    getCusListData.page = 1;
                    getCusListData.p_dept = '';
                    getCusListData.dept = '';
                    getCusListData.owner = uid;
                    getCusList();
                });
            },
            error: function (e) {
                console.log(e);
            }
        })
    }

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
            dataType: 'json',
            success: function (oE) {
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
        owner: uid, // 负责人id
        created_at: '',
        statusflag: '' // 作废状态  0 有效客户 1 作废客户  不传 是全部
    };
    // 客户>客户列表
    function getCusList() {
        $.ajax({
            url: SERVER_URL + '/customer/list',
            type: 'GET',
            data: getCusListData,
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var cuslist = oE.datalist;
                    $('.tanceng .xs_kh_ssjg').html(oE.totalcount);
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
                        oCuslist += '<tr class="' + cusSta + '" cusId="' + cuslist[i].id + '"><td><input type="radio" name="222"></td><td>' + l_dbl(i + 1) + '</td><td>' + likNullData(cuslist[i].code_sn) + '</td><td>' + likNullData(cuslist[i].name) + '</td><td>' + likNullData(cuslist[i].tel) + '</td><td><div class="text_line" style="width: 9em;"><span class="ellipsis">' + likNullData(cuslist[i].address) + '</span></div></td><td>' + likNullData(cuslist[i].industry_big_name) + '</td><td>' + likNullData(cuslist[i].grade_name) + '</td><td class="f_color ' + cusContactClass + '">' + con1 + '<div class="vent_client_contMsgBox" style="display: none;z-index:99;"><i class="vent_client_torr"></i>' + con2 + '</div></td><td>' + likNullData(cuslist[i].introducer_name) + '</td><td>' + likNullData(cuslist[i].note) + '</td></tr>'
                    }
                    $('.tanceng .ven_custom_visit_cus_list').html(oCuslist);
                    list_table_render_pagination('.tanceng .page_ven31_cuslist', getCusListData, getCusList, oE.totalcount, cuslist.length)
                }
            }
        })
        //xs_kh_gjss_num()
    }

    //选择分类获取客户
    $('.tanceng .ven_custom_visit_create_choose_customer_sort li').die('click').live('click', function () {
        getCusListData.category_id = $(this).attr('cussortid');
        getCusList();
    })
    // 搜索关键字
    $('.tanceng .ven_custom_visit_choose_customer_search_btn').die('click').live('click', function () {
        if ($('.tanceng .ven_custom_visit_choose_customer_search_inp').val() == '搜索客户编号/客户名称') {
            getCusListData.key = ''
        } else {
            getCusListData.key = $('.tanceng .ven_custom_visit_choose_customer_search_inp').val()
        }
        getCusList()
    });
    //搜索行业
    $('.tanceng .ven_custom_visit_create_choose_customer_industry_list li').die('click').live('click', function () {
        getCusListData.industry_big_id = $(this).attr('industryid');
        getCusList()
    });
    //搜索客户级别
    $('.tanceng .ven_custom_visit_create_choose_customer_grade_list li').die('click').live('click', function () {
        getCusListData.grade = $(this).index();
        getCusList()
    })

    // 客户>高级搜索>控制下拉框
    function xs_kh_gjss_xlk() {
        $.ajax({
            url: SERVER_URL + '/customer/list',
            type: 'GET',
            data: {
                token: token
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var cuslist = oE.datalist;
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
                        if (v['val'] == '' || v['val'] == null) return true;
                        xs_kh_hy += '<li industryid="' + v['title'] + '">' + v['val'] + '</li>'
                    })
                    // 行业下拉框插入数据
                    $('.tanceng .ven_custom_visit_create_choose_customer_industry_list').html(xs_kh_hy)
                }
            }
        })
    }

    //选择客户
    $('.tanceng .ven_custom_visit_create_choose_customer_submit').die('click').live('click', function () {
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
        $('.tanceng .custom_visit_create_customer_chosen').val(customVisitCusChosen['val']).css('color', '#333');
        venCustomVisitCreateData.customer_id = customVisitCusChosen['title'];
        //编辑客户拜访用
        $('.tanceng .ven_custom_visit_edit_cusname').val(customVisitCusChosen['val']);
        venCustomVisitEditData.customer_id = customVisitCusChosen['title'];
        // 关闭当前弹窗
        $(this).closest('.dialog_box').remove();
    });
    //选择拜访类型
    $('.tanceng .ven_custom_visit_create_type_ul li').die('click').live('click', function () {
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
            dataType: 'json',
            success: function (oE) {
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
                $('i.list_choose_delete').die('click').live('click', function () {
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
    $('.tanceng .ven_custom_visit_create_choose_owner').die('click').live('click', function () {
        venCustomVisitChooseOwner()
    });

    //选择负责人
    function venCustomVisitChooseOwner() {
        $.ajax({
            type: "get",
            url: SERVER_URL + "/dept/deptlist",
            data: {token: token},
            dataType: 'json',
            success: function (oE) {
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
                    $('i.list_choose_delete').die('click').live('click', function () {
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

    //添加抄送人
    $('.tanceng .ven_cus_visit_create_choose_copy_btn').die('click').live('click', function () {
        venSellChanceChooseCopy()
    });
    //选择抄送人
    function venSellChanceChooseCopy() {
        $.ajax({
            type: "get",
            url: SERVER_URL + "/dept/deptlist",
            data: {token: token},
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var deep = 0;
                    $('.tanceng .ven_cus_visit_create_choose_copy_list').html(tree_list_choose_dept_person(oE.rows, deep));
                    // 所有分类图标样式控制
                    if ($('i.ven_cus_visit_create_choose_copy_list').children().length == 0) {
                        $('li.left_all span.icon_open').addClass('personOth')
                    }
                    // 下级部门样式控制
                    for (var i = 0, liLeft1 = $('.tanceng .ven_cus_visit_create_choose_copy_list li.left_1').length; i < liLeft1; i++) {
                        if ($('.tanceng .ven_cus_visit_create_choose_copy_list li.left_1').eq(i).next('ul').length == 0) {
                            $('.tanceng .ven_cus_visit_create_choose_copy_list li.left_1').eq(i).find('span.icon_open').addClass('personOth');
                            $('.tanceng .ven_cus_visit_create_choose_copy_list li.left_1').eq(i).find('span.personOth').closest('li').addClass('deptChild')
                        }
                    }
                    //选择人员左侧选择
                    $('.tanceng .ven_cus_visit_create_choose_copy_list ul .li_person').die('click').live('click', function () {
                        if ($(this).find('em').hasClass('on')) {
                            $('.tanceng .ven_cus_visit_create_copy_chosen_list').find('li[userinfoid=' + $(this).attr('userinfoid') + ']').remove()
                            $(this).find('span.list_check em').removeClass('on')
                        } else {
                            $('.tanceng .ven_cus_visit_create_copy_chosen_list').append('<li userinfoid="' + $(this).attr('userinfoid') + '"><span>' + $(this).children('.list_msg').html() + '</span><i class="list_choose_delete"></i></li>');
                            $(this).find('span.list_check em').addClass('on')
                        }
                    });
                    //选择人员右侧删除
                    $('i.list_choose_delete').die('click').live('click', function () {
                        $(this).closest('li').remove();
                        $('.tanceng .ven_cus_visit_create_choose_copy_list ul .li_person[userinfoid = "' + $(this).closest('li').attr('userinfoid') + '"]').find('em').removeClass('on');
                    });
                    //选择人员保存
                    $('.tanceng .ven_cus_visit_choose_copy_save').die('click').live('click', function () {
                        var copyChosen = '';
                        $.each($('.tanceng .ven_cus_visit_create_copy_chosen_list li'), function (i, v) {
                            copyChosen += '<li userinfoid="' + $('.tanceng .ven_cus_visit_create_copy_chosen_list').find('li').eq(i).attr('userinfoid') + '">\
                                <i class="del_img_1">-</i><em class="icon_personBtn icon_personBtn_msg"><i class="icon_personNext"></i></em>\
                                <em class="icon_adderBtn"></em>\
                                <p class="box_adderName">' + $('.tanceng .ven_cus_visit_create_copy_chosen_list').find('li').eq(i).text() + '</p>\
                                </li>';
                        });
                        $('.tanceng .ven_cus_visit_create_add_copy_list').html('<li> <em class="icon_personBtn icon_personBtn_add val_dialogTop ven_cus_visit_create_choose_copy_btn" name="vendition_khbf_csr"></em> </li>').prepend(copyChosen);
                        $('.tanceng .ven_cus_visit_edit_copy_list').html('<li> <em class="icon_personBtn icon_personBtn_add val_dialogTop ven_cus_visit_create_choose_copy_btn" name="vendition_khbf_csr"></em> </li>').prepend(copyChosen);
                        $(this).closest('.dialog_box').remove()
                    })
                }
            },
            error: function (data) {

            }
        });
    }

    //新建客户拜访提交
    $('.tanceng .ven_custom_visit_create_submit_btn').die('click').live('click', function () {
        if ($('.tanceng .custom_visit_create_customer_chosen').val() == '') {
            alert('请选择客户');
            return false;
        } else if ($('.tanceng .ven_custom_visit_create_visit_at').val() == '请选择日期') {
            alert('请选择拜访日期');
            return false;
        } else {
            venCustomVisitCreateData.visited_at = $('.tanceng .ven_custom_visit_create_visit_at').val();
            //抄送人
            var copyList = '';
            $.each($('.tanceng .ven_cus_visit_create_add_copy_list li:not(:last-of-type)'), function (i, v) {
                copyList += $('.tanceng .ven_cus_visit_create_add_copy_list li:not(:last-of-type)').eq(i).attr('userinfoid') + ',';
            });
            venCustomVisitCreateData.copy_list = copyList.slice(0, copyList.length - 1);
            console.log(venCustomVisitCreateData);
            $.ajax({
                type: "POST",
                url: SERVER_URL + "/customer-visit/add",
                data: venCustomVisitCreateData,
                dataType: 'json',
                success: function (oE) {
                    if (oE.code == 0) {
                        alert('添加成功');
                        $('.tanceng').css('display', 'none').children('.dialog_box').remove();
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
    $('.ven_custom_visit_edit').die('click').live('click', function () {
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
            dataType: 'json',
            success: function (oE) {
                var datalist = oE.data;
                console.log(oE);
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
                    venCustomVisitEditData.dept = datalist['dept'];
                    //负责人
                    venCustomVisitEditData.owner = datalist['owner'];
                    $('.tanceng .ven_custom_visit_edit_visit_owner_name').val(datalist['uname']);
                    //抄送人
                    var copyChosen = '';
                    $.each(datalist['copy_list'], function (i, v) {
                        copyChosen += '<li userinfoid="' + v['id'] + '">\
                                <i class="del_img_1">-</i><em class="icon_personBtn icon_personBtn_msg"><i class="icon_personNext"></i></em>\
                                <em class="icon_adderBtn" style="background:url(' + v['face'] + ')"></em>\
                                <p class="box_adderName">' + v['name'] + '</p>\
                                </li>';
                    });
                    $('.tanceng .ven_cus_visit_create_add_copy_list').html('<li> <em class="icon_personBtn icon_personBtn_add val_dialogTop ven_cus_visit_create_choose_copy_btn" name="vendition_khbf_csr"></em> </li>').prepend(copyChosen);
                    $('.tanceng .ven_cus_visit_edit_copy_list').html('<li> <em class="icon_personBtn icon_personBtn_add val_dialogTop ven_cus_visit_create_choose_copy_btn" name="vendition_khbf_csr"></em> </li>').prepend(copyChosen);
                } else {
                    alert('操作失败')
                }
            }
        });
    });

    //选择拜访类型
    $('.tanceng .ven_custom_visit_edit_type_ul li').die('click').live('click', function () {
        venCustomVisitEditData.thetype = $(this).index();
    });
    //编辑客户拜访提交
    $('.tanceng .ven_custom_visit_edit_submit_btn').die('click').live('click', function () {
        if ($('.tanceng .ven_custom_visit_edit_cusname').val() == '') {
            alert('请选择客户');
            return false;
        } else if ($('.tanceng .ven_custom_visit_edit_visit_time').val() == '请选择日期') {
            alert('请选择拜访日期');
            return false;
        } else {
            venCustomVisitEditData.visited_at = $('.tanceng .ven_custom_visit_edit_visit_time').val();
            //抄送人
            var copyList = '';
            $.each($('.tanceng .ven_cus_visit_create_add_copy_list li:not(:last-of-type)'), function (i, v) {
                copyList += $('.tanceng .ven_cus_visit_create_add_copy_list li:not(:last-of-type)').eq(i).attr('userinfoid') + ',';
            });
            venCustomVisitEditData.copy_list = copyList.slice(0, copyList.length - 1);
            $.ajax({
                type: "POST",
                url: SERVER_URL + "/customer-visit/add",
                data: venCustomVisitEditData,
                dataType: 'json',
                success: function (oE) {
                    if (oE.code == 0) {
                        alert('修改成功');
                        $('.tanceng').css('display', 'none').children('.dialog_box').remove();
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
    $('.lik_fullcalendar_btn').die('click').live('click', function () {
        $.each($('#lik-fullcalendar .lik-cur-month-day'), function (i, v) {
            likFullListFn($('#lik-fullcalendar .lik-cur-month-day').eq(i).attr('lik-data-date'));
        });
    });
    $('.change-month').die('click').live('click', function () {
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
            dataType: 'json',
            success: function (oE) {
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
