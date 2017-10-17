$(function () {

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

    $('.ven_after_order_create_add_img_btn').die('change').live('change', function () {
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

    var token, pid, key, page, limit, word_titl, goods_id, goods_pid, goods_member, goods_enddate, goods_fileurl, goods_imgurl, w_p_n;
    token = Admin.get_token();
    //token = '2017052516045457073-1-1';
    uid = Admin.get_uid();
    var uname = loginUserInfo.username;
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

    //获取当前系统时间 - 短
    function getCurrentDateShort() {
        var oDate = new Date();
        var sTime = '';
        sTime = oDate.getFullYear() + '-' + l_dbl(oDate.getMonth() + 1) + '-' + l_dbl(oDate.getDate());
        return sTime
    }

    // 定义选择查看项
    var venAfterOrderLookAbledField = [
        {'index': null, 'field': '负责人'},
        {'index': null, 'field': '售后时间'},
        {'index': null, 'field': '售后类型'},
        {'index': null, 'field': '制单人'},
        {'index': null, 'field': '创建时间'}
    ];
    likShow('#ven_after_order_table', venAfterOrderLookAbledField, '#ven_after_order_look_ul', '#ven_after_order_look_save', '#ven_after_order_look_reset');

    // 定义售后单参数
    var afterOrderData = {
        token: token,
        page: 1, //页面
        num: 10, //每页条数
        thetype: 1, // 1我的 2我执行的 3售后分配
        keywords: '', // 客户名称 售后单编号搜索
        is_invalid: 0 //作废 0正常1作废
    };

    getAfterOrderList();

    // 获取售后单列表
    function getAfterOrderList() {
        $.ajax({
            url: SERVER_URL + '/afterorder/list',
            type: 'GET',
            data: afterOrderData,
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    $('#ven_after_order_search_total').html(oE.totalcount);
                    //获取datalist
                    var datalist = oE.datalist;
                    console.log(datalist);
                    if (datalist.length == 0) {
                        $('.ven_after_order_nodata_box').removeClass('none');
                        $('.ven_after_order_handle').addClass('none');
                    } else {
                        $('.ven_after_order_nodata_box').addClass('none');
                        $('.ven_after_order_handle').removeClass('none');
                    }
                    //字符串拼接
                    var afterOrderHtml = '';
                    $.each(datalist, function (i, v) {
                        // 出库状态判断改变class
                        var afterOrderBtn = '';
                        var afterOrderStatusClass = '';
                        var afterOrderStatusInvalidClass = '';
                        var afterOrderStatusName = '';
                        if (afterOrderData.datatype == 1) {
                            if (v['status'] == 0) {
                                afterOrderStatusClass = 'c_r';
                                afterOrderStatusInvalidClass = '';
                                afterOrderStatusName = '待接收';
                                afterOrderBtn = '<button class="but_mix but_cancal r_sidebar_btn but_look ven_after_order_look" name="xs_shd_right">查看</button><button class="but_mix but_cancal val_dialog but_exit ven_after_order_edit_btn" name="xs_shd_edit">编辑</button><button class="but_mix but_cancal but_void but_r ven_after_order_invalid_btn">作废</button>';
                            } else if (v['status'] == 1) {
                                afterOrderStatusClass = 'c_y';
                                afterOrderStatusName = '进行中';
                                afterOrderBtn = '<button class="but_mix but_cancal r_sidebar_btn but_look ven_after_order_look" name="xs_shd_right">查看</button><button class="but_mix but_cancal val_dialog but_exit ven_after_order_edit_btn" name="xs_shd_edit">编辑</button><button class="but_mix but_cancal but_void but_r ven_after_order_invalid_btn">作废</button>';
                            } else if (v['status'] == 2) {
                                afterOrderStatusClass = 'c_g';
                                afterOrderStatusName = '已完成';
                                afterOrderBtn = '<button class="but_mix but_cancal r_sidebar_btn but_look ven_after_order_look" name="xs_shd_right">查看</button>';
                            }
                        } else if (afterOrderData.datatype == 2) {
                            if (v['status'] == 0) {
                                afterOrderStatusClass = 'c_r';
                                afterOrderStatusInvalidClass = '';
                                afterOrderStatusName = '待接收';
                                afterOrderBtn = '<button class="but_mix r_sidebar_btn but_look ven_after_order_look" name="xs_shd_rightMy">查看</button><button class="but_mix but_lv ven_after_order_receive_btn">确认接收</button>';
                            } else if (v['status'] == 1) {
                                afterOrderStatusClass = 'c_y';
                                afterOrderStatusName = '进行中';
                                afterOrderBtn = '<button class="but_mix r_sidebar_btn but_look ven_after_order_look" name="xs_shd_rightMy">查看</button>';
                            } else if (v['status'] == 2) {
                                afterOrderStatusClass = 'c_g';
                                afterOrderStatusName = '已完成';
                                afterOrderBtn = '<button class="but_mix r_sidebar_btn but_look ven_after_order_look" name="xs_shd_rightMy">查看</button>';
                            }
                        }
                        var invalidText = '';
                        if (v['is_invalid'] == 0) {
                            afterOrderStatusInvalidClass = '';
                            invalidText = l_dbl(i + 1);
                        } else {
                            afterOrderStatusInvalidClass = 'grey';
                            afterOrderStatusClass = '';
                            invalidText = '<span class="voidIcon">作废</span>';
                            afterOrderBtn = '<button class="but_mix but_cancal r_sidebar_btn but_look ven_after_order_look" name="xs_shd_right">查看</button>';
                        }
                        afterOrderHtml += '<tr class="' + afterOrderStatusInvalidClass + '" afterorderid="' + v['id'] + '">\
                                                <td>' + invalidText + '</td>\
                                                <td>' + v['code_sn'] + (v['is_old'] == 1 ? '<b class="c_r" style="font-weight:600;">(补)</b>' : '') + '</td>\
                                                <td>' + v['order_code_sn'] + '</td>\
                                                <td>' + v['name'] + '</td>\
                                                <td>' + v['product'] + '</td>\
                                                <td>' + v['owner_name'] + '</td>\
                                                <td>' + v['service_at'].split(' ')[0] + '</td>\
                                                <td>' + v['service_name'] + '</td>\
                                                <td>' + v['uname'] + '</td>\
                                                <td>' + v['created_at'].split(' ')[0] + '</td>\
                                                <td class="' + afterOrderStatusClass + '">' + afterOrderStatusName + '</td>\
                                                <td>' + v['note'] + '</td>\
                                                <td>' + afterOrderBtn + '</td>\
                                            </tr>';
                    });
                    //售后单数据渲染
                    $('#ven_after_order_list').html(afterOrderHtml);
                }
                //分页
                list_table_render_pagination('.ven_after_order_pagination', afterOrderData, getAfterOrderList, oE.totalcount, datalist.length);
                $('#ven_after_order_look_save').trigger('click');
            }
        });
    }

    //展开高级搜索
    $('.ven_after_order_search_btn').die('click').live('click', function () {
        if ($(this).text() != '展开高级搜索') {
            venAfterOrderSearch();
        }
    });

    //刷新列表
    $('#ven_after_order_refresh').die('click').live('click', function () {
        afterOrderData = {
            token: token,
            page: 1, //页面
            num: 10, //每页条数
            owner: '',
            uid: '',
            service_type: '', // 售后类型
            datatype: 1, //列表数据类型 1是我发起的，2我执行的
            notshowok: '', //是否显示完成的，1不显示完成售后，否则显示全部
            is_invalid: 0, //作废 0正常1作废
            status: '', // 状态0待接受1已接受2完成
            key: ''//关键字
        };
        $('#ven_after_order_notshowinvalid_btn').attr('checked', 'checked');
        $('#ven_after_order_search_inp').val('搜索客户名称').css('color', '#CCCCCC');
        $('.ven_after_order_search_owner_inp').val('负责人').css('color', '#CCCCCC');
        $('.ven_after_order_search_service_type_inp').val('售后类型').css('color', '#CCCCCC');
        $('.ven_after_order_search_uname_inp').val('创建人').css('color', '#CCCCCC');
        $('.ven_after_order_search_status_inp').val('状态').css('color', '#CCCCCC');
        $('#ven_after_order_nav_ul li.tabhover').trigger('click');
        //getAfterOrderList();
    });

    // 售后单查看我发起的
    $('#ven_after_order_searMine').die('click').live('click', function () {
        $('.ven_after_order_search_div').css('display', '');
        $('button.ven_after_order_search_btn').css('display', '');
        afterOrderData.datatype = 1;
        getAfterOrderList();
    });
    // 售后单查看我执行的
    $('#ven_after_order_searIdo').die('click').live('click', function () {
        $('.ven_after_order_search_div').css('display', 'none');
        $('button.ven_after_order_search_btn').css('display', 'none');
        afterOrderData.datatype = 2;
        getAfterOrderList();
    });
    // 售后单查看售后分配
    var afterOrderAllotData = {
        token: token,
        page: 1, //页面
        num: 10, //每页条数
        owner: '', //负责人id
        service_type: '', //售后类型0外出售后1电话售后2网络售后
        uid: '', //创建人id
        status: 0, //状态0待接受1已接受2完成
        is_invalid: 0, //作废0正常1作废
        key: ''//关键字
    };
    $('#ven_after_order_allot_btn').die('click').live('click', function () {
        $('.ven_after_order_search_div').css('display', 'none');
        $('button.ven_after_order_search_btn').css('display', 'none');
        afterOrderAllotFn();
    });
    //售后分配函数
    function afterOrderAllotFn() {
        $.ajax({
            url: SERVER_URL + '/afterorder/allotlist',
            type: 'GET',
            data: afterOrderAllotData,
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    //获取datalist
                    var datalist = oE.datalist;
                    if (datalist.length == 0) {
                        $('.ven_after_order_nodata_box').removeClass('none');
                        $('.ven_after_order_handle').addClass('none');
                    } else {
                        $('.ven_after_order_nodata_box').addClass('none');
                        $('.ven_after_order_handle').removeClass('none');
                    }
                    //字符串拼接
                    var afterOrderHtml = '';
                    $.each(datalist, function (i, v) {
                        afterOrderHtml += '<tr afterorderid="' + v['id'] + '">\
                                                <td>' + l_dbl(i + 1) + '</td>\
                                                <td>' + v['code_sn'] + (v['is_old'] == 1 ? '<b class="c_r" style="font-weight:600;">(补)</b>' : '') + '</td>\
                                                <td>' + v['order_code_sn'] + '</td>\
                                                <td>' + v['name'] + '</td>\
                                                <td>' + v['product'] + '</td>\
                                                <td>' + v['owner_name'] + '</td>\
                                                <td>' + v['service_at'].split(' ')[0] + '</td>\
                                                <td>' + v['service_name'] + '</td>\
                                                <td>' + v['uname'] + '</td>\
                                                <td>' + v['created_at'].split(' ')[0] + '</td>\
                                                <td class="c_y">待接收</td>\
                                                <td>' + v['note'] + '</td>\
                                                <td><button class="but_mix r_sidebar_btn but_look" name="xs_shd_rightfp">分配</button></td>\
                                            </tr>';
                    });
                    //售后单数据渲染
                    $('#ven_after_order_list').html(afterOrderHtml);
                }
                //分页
                list_table_render_pagination('.ven_after_order_pagination', afterOrderData, getAfterOrderList, oE.totalcount, datalist.length);
                $('#ven_after_order_look_save').trigger('click');

            }
        });
    }

    //搜索关键字
    $('#ven_after_order_search_btn').die('click').live('click', function () {
        if ($('#ven_after_order_search_inp').val() == '搜索客户名称') {
            alert('请输入搜索关键字');
            afterOrderData.key = '';
        } else {
            afterOrderData.key = $('#ven_after_order_search_inp').val();
        }
        getAfterOrderList();
    });
    //不显示完成售后
    $('#ven_after_order_notshowok_btn').die('click').live('click', function () {
        if ($(this).attr('checked') == 'checked') {
            afterOrderData.notshowok = 1;
        } else {
            afterOrderData.notshowok = '';
        }
        getAfterOrderList();
    });

    //不显示作废
    $('#ven_after_order_notshowinvalid_btn').die('click').live('click', function () {
        if ($(this).is(':checked')) {
            afterOrderData.is_invalid = 0;
        } else {
            afterOrderData.is_invalid = '';
        }
        if ($('#ven_after_order_allot_btn').hasClass('tabhover')) {
            afterOrderAllotFn()
        } else {
            getAfterOrderList();
        }
    });
    //高级搜索 控制下拉框
    function venAfterOrderSearch() {
        $.ajax({
            url: SERVER_URL + '/afterorder/list',
            type: 'GET',
            data: {token: token, num: 100},
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var datalist = oE.datalist;
                    console.log(datalist);
                    //负责人列表
                    var ownerList = '';
                    var ownerListArr = [];
                    //创建人列表
                    var unameList = '';
                    var unameListArr = [];
                    $.each(datalist, function (i, v) {
                        if (v['owner'] != '' && v['owner_name'] != '') {
                            ownerListArr.push({
                                ownerid: v['owner'],
                                ownername: v['owner_name']
                            });
                        }
                        if (v['uid'] != '' && v['uname'] != '') {
                            unameListArr.push({
                                uid: v['uid'],
                                uname: v['uname']
                            });
                        }
                    });
                    //负责人
                    ownerListArr = getJsonArr(ownerListArr);
                    $.each(ownerListArr, function (i, v) {
                        ownerList += '<li ownerid="' + v['ownerid'] + '">' + v['ownername'] + '</li>'
                    });
                    $('.ven_after_order_search_owner_ul').html(ownerList);
                    //创建人
                    unameListArr = getJsonArr(unameListArr);
                    $.each(unameListArr, function (i, v) {
                        unameList += '<li uid="' + v['uid'] + '">' + v['uname'] + '</li>'
                    });
                    $('.ven_after_order_search_uname_ul').html(ownerList);
                }
            }
        });
    }

    // 搜索客户名称
    $('#ven_after_order_search_cus_name_ul li').die('click').live('click', function () {
        afterOrderData.key = $(this).html();
        getAfterOrderList();
    });
    // 搜索拜访类型
    $('#ven_after_order_search_thetype_ul li').die('click').live('click', function () {
        afterOrderData.thetype = $(this).index();
        getAfterOrderList();
    });
    //搜索负责人
    $('.ven_after_order_search_owner_ul li').die('click').live('click', function () {
        afterOrderData.owner = $(this).attr('ownerid');
        getAfterOrderList();
    });
    //搜索售后类型
    $('.ven_after_order_search_service_type_ul li').die('click').live('click', function () {
        afterOrderData.service_type = $(this).index();
        getAfterOrderList();
    });
    //搜索创建人
    $('.ven_after_order_search_uname_ul li').die('click').live('click', function () {
        afterOrderData.uid = $(this).attr('uid');
        getAfterOrderList();
    });
    //搜索状态
    $('.ven_after_order_search_status_ul li').die('click').live('click', function () {
        afterOrderData.status = $(this).index();
        getAfterOrderList();
    });

    //定义当前操作售后单id
    var venAfterOrderCurrentId = null;
    // 查看
    $('.ven_after_order_look').die('click').live('click', function () {
        $('.slider_head_list').css('display', 'none');
        $('#after_order_look_ul li:first-of-type').trigger('click');
        venAfterOrderCurrentId = $(this).closest('tr').attr('afterorderid');
        $.ajax({
            url: SERVER_URL + '/afterorder/info',
            type: 'GET',
            data: {
                token: token,
                afterorder_id: venAfterOrderCurrentId
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var data = oE.data;
                    //状态
                    if (data['status'] == 0) {
                        $('.ven_after_order_typea_look_status_name').html('待接收');
                        $('.newpra-4-cent').css('display', 'block');
                    } else if (data['status'] == 1) {
                        $('.ven_after_order_typea_look_status_name').html('进行中');
                        $('.newpra-4-cent').css('display', 'none');
                    } else if (data['status'] == 2) {
                        $('.ven_after_order_typea_look_status_name').html('已完成');
                        $('.newpra-4-cent').css('display', 'none');
                    }
                    //作废状态
                    if (data['is_invalid'] == 0) {
                        $('.slider_head_More').css('display', 'block');
                    } else {
                        $('.slider_head_More').css('display', 'none');
                    }
                    //客户名称
                    $('.ven_after_order_typea_look_custom_name').html(likNullData(data['name']));
                    //创建日期
                    $('.ven_after_order_typea_look_create_at').html(likNullData(data['created_at']));
                    //创建人
                    $('.ven_after_order_typea_look_uname').html(likNullData(data['uname']));
                    //售后单编号
                    $('.ven_after_order_typea_look_code_sn').html(likNullData(data['code_sn']));
                    //销售订单编号
                    $('.ven_after_order_typea_look_order_sn').html(likNullData(data['order_code_sn']));
                    //售后商品
                    $('.ven_after_order_typea_look_product').html(likNullData(data['product']));
                    //负责人
                    $('.ven_after_order_typea_look_owner_name').html(likNullData(data['owner_name']));
                    //售后时间
                    $('.ven_after_order_typea_look_service_at').html(likNullData(data['service_at']));
                    //售后类型
                    $('.ven_after_order_typea_look_service_name').html(likNullData(data['service_name']));
                    //客户联系人
                    $('.ven_after_order_typea_look_contacts').html(likNullData(data['contacts']));
                    //联系人电话
                    $('.ven_after_order_typea_look_tel').html(likNullData(data['tel']));
                    //售后商品信息
                    //普通商品
                    var detailGoodsArr = [];
                    var detailGoodsHtml = '';
                    if (data['product_json'] && data['product_json']['product']) {
                        detailGoodsArr = data['product_json']['product'];
                        $.each(detailGoodsArr, function (i, v) {
                            detailGoodsHtml += '<tr>\
                                                <td>' + l_dbl(i + 1) + '</td>\
                                                <td>' + likNullData(v['good_name']) + '</td>\
                                            <td>' + likNullData(v['good_code_sn']) + '</td>\
                                            <td>' + likNullData(v['good_attribute']) + '</td>\
                                            <td>' + likNullData(v['unit']) + '</td>\
                                            <td>' + likNullData(v['good_after_num']) + '</td>\
                                            <td class="xs_shd_imgBox">' + likNullData(v['note']) + '</td>\
                                                <td>缺' + likNullData(v['']) + '</td>\
                                                <td class="c_y">缺' + likNullData(v['']) + '</td>\
                                            </tr>';
                        });
                        $('.ven_after_order_detail_goods_box').html(detailGoodsHtml);
                        //商品售后数量
                        $('.ven_after_order_detail_goods_total').html(data['product_json']['good_sum_num'])
                        $('.ven_after_order_detail_box_list').children('div.box_open_list').eq(0).removeClass('none');
                    } else {
                        $('.ven_after_order_detail_box_list').children('div.box_open_list').eq(0).addClass('none');
                    }
                    //套餐商品
                    var detailPackageParentArr = [];
                    var detailPackageParentHtml = '';
                    if (data['product_json'] && data['product_json']['product_package']) {
                        detailPackageParentArr = data['product_json']['product_package'];
                        $.each(detailPackageParentArr, function (i, v) {
                            detailPackageParentHtml += '<tr>\
                                <td>' + likNullData(v['package_name']) + '</td>\
                                <td>' + likNullData(v['package_code_sn']) + '</td>\
                                <td>' + likNullData(v['package_after_num']) + '</td>\
                                <td>' + likNullData(v['note']) + '</td>\
                                </tr>';
                        });
                        $('.ven_after_order_detail_package_parent_box').html(detailPackageParentHtml);
                        //商品售后数量
                        $('.ven_after_order_detail_package_parent_total').html(data['product_json']['package_sum_num'])
                        $('.ven_after_order_detail_box_list').children('div.box_open_list').eq(1).removeClass('none');
                    } else {
                        $('.ven_after_order_detail_box_list').children('div.box_open_list').eq(1).addClass('none');
                    }
                    //套餐子商品
                    var detailPackageChildArr = [];
                    var detailPackageChildHtml = '';
                    if (data['product_json'] && data['product_json']['package_goods']) {
                        detailPackageChildArr = data['product_json']['package_goods'];
                        $.each(detailPackageChildArr, function (i, v) {
                            detailPackageChildHtml += '<tr>\
                                                            <td>' + l_dbl(i + 1) + '</td>\
                                                            <td>' + likNullData(v['good_name']) + '</td>\
                                                            <td>' + likNullData(v['good_code_sn']) + '</td>\
                                                            <td>' + likNullData(v['good_attribute']) + '</td>\
                                                            <td>' + likNullData(v['unit']) + '</td>\
                                                            <td>' + likNullData(v['good_after_num']) + '</td>\
                                                            <td class="xs_shd_imgBox">' + likNullData(v['note']) + '</td>\
                                                            <td>缺</td>\
                                                            <td class="c_r">缺</td>\
                                                     </tr>';
                        });
                        $('.ven_after_order_detail_package_child_box').html(detailPackageChildHtml);
                        //商品售后数量
                        $('.ven_after_order_detail_package_child_total').html(data['product_json']['package_in_sum_num'])
                    }
                    //配置商品
                    var detailSettingParengArr = [];
                    var detailSettingParengHtml = '';
                    if (data['product_json'] && data['product_json']['product_setting']) {
                        detailSettingParengArr = data['product_json']['product_setting'];
                        $.each(detailSettingParengArr, function (i, v) {
                            detailSettingParengHtml += '<tr>\
                                                        <td>' + likNullData(v['setting_name']) + '</td>\
                                                        <td>' + likNullData(v['setting_code_sn']) + '</td>\
                                                        <td>' + likNullData(v['setting_unit']) + '</td>\
                                                        <td>' + likNullData(v['setting_after_num']) + '</td>\
                                                        <td>' + likNullData(v['note']) + '</td>\
                                                        <td>缺</td>\
                                                        <td>缺</td>\
                                                        </tr>';
                        });
                        $('.ven_after_order_detail_setting_parent_box').html(detailSettingParengHtml);
                        $('.ven_after_order_detail_box_list').children('div.box_open_list').eq(2).removeClass('none');
                    } else {
                        $('.ven_after_order_detail_box_list').children('div.box_open_list').eq(2).addClass('none');
                    }
                    //配置子商品
                    var detailSettingChildArr = [];
                    var detailSettingChildHtml = '';
                    if (data['product_json'] && data['product_json']['setting_goods']) {
                        detailSettingChildArr = data['product_json']['setting_goods'];
                        $.each(detailSettingChildArr, function (i, v) {
                            detailSettingChildHtml += '<tr>\
                                                            <td>' + l_dbl(i + 1) + '</td>\
                                                            <td>' + likNullData(v['good_name']) + '</td>\
                                                            <td>' + likNullData(v['good_code_sn']) + '</td>\
                                                            <td>' + likNullData(v['good_attribute']) + '</td>\
                                                            <td>' + likNullData(v['unit']) + '</td>\
                                                            <td>' + likNullData(v['good_after_num']) + '</td>\
                                                            <td class="xs_shd_imgBox">' + likNullData(v['note']) + '</td>\
                                                            <td>缺</td>\
                                                            <td class="c_r">缺</td>\
                                                        </tr>';
                        });
                        $('.ven_after_order_detail_setting_child_box').html(detailSettingChildHtml);
                        //商品售后数量
                        $('.ven_after_order_detail_setting_child_total').html(data['product_json']['setting_in_sum_num'])
                    }
                    if ($('.ven_after_order_detail_box_list').children('.none').length == 3) {
                        $('.ven_after_order_detail_box_list').addClass('none');
                        $('.dialog_content_after_detail').width(630);
                    } else {
                        $('.ven_after_order_detail_box_list').removeClass('none');
                        $('.dialog_content_after_detail').width(1100);
                    }
                    //备注
                    $('.ven_after_order_detail_note_textarea').html(likNullData(data['product_json']['note']));
                    //总计商品数量
                    $('.ven_after_order_detail_products_num_total').html(likNullData(data['product_json']['good_total_num']));
                    //分配售后人员
                    /*if (data['status'] == 0) {
                     $('.ven_after_order_typea_look_fpshd').css('display', 'block');
                     } else {
                     $('.ven_after_order_typea_look_fpshd').css('display', 'none');
                     }*/
                } else {
                    alert('操作失败')
                }
            }
        });
        getAfterOrderRecordFn();
    });
    $('.tanceng .btn_cancel').die('click').live('click', function () {
        $('.tanceng .dialog_screen').trigger('click');
    });
    //查看售后商品详单
    /*$('.ven_after_order_typea_look_product_info').die('click').die('click).live('click', function () {
     $.ajax({
     url: SERVER_URL + '/afterorder/info',
     type: 'GET',
     data: {
     token: token,
     afterorder_id: venAfterOrderCurrentId
     },
     success: function (e) {
     // 将返回值转换为json对象
     var oE = eval("(" + e + ")");
     if (oE.code == 0) {
     var data = oE.data;
     console.log(data);
     //创建日期
     $('.tanceng .ven_after_order_detail_create_at').html(likNullData(data['created_at']));
     } else {
     alert('操作失败')
     }
     }
     })
     });*/
    //售后记录
    var afterOrderLookRecordlistData = {
        token: token,
        afterorder_id: 1,    //id
        service_type: '',     //售后类型,空字符串是全部，0外出售后1电话售后2网络售后
        starttime: '',       // 开始时间
        endtime: ''          // 结束时间
    };
    //选择售后类型
    $('.ven_after_order_look_record_choose_type_ul li').die('click').live('click', function () {
        afterOrderLookRecordlistData.service_type = $(this).index();
        getAfterOrderRecordFn();
    });
    //选择售后时间
    $('.ven_after_order_look_record_choose_time li:first-of-type').die('click').live('click', function () {
        afterOrderLookRecordlistData.starttime = '';
        afterOrderLookRecordlistData.endtime = '';
        getAfterOrderRecordFn()
    });
    //选择售后时间 - 自定义时间
    $('.tanceng .ven_after_order_look_record_zdysj_save').die('click').live('click', function () {
        if ($('.tanceng .ven_after_order_look_record_zdysj_start_inp').val() == '选择日期') {
            alert('请选择开始时间');
            return false;
        }
        if ($('.tanceng .ven_after_order_look_record_zdysj_end_inp').val() == '选择日期') {
            alert('请选择结束时间');
            return false;
        }
        afterOrderLookRecordlistData.starttime = $('.tanceng .ven_after_order_look_record_zdysj_start_inp').val();
        afterOrderLookRecordlistData.endtime = $('.tanceng .ven_after_order_look_record_zdysj_end_inp').val();
        getAfterOrderRecordFn();
        $(this).closest('.dialog_box').remove();
        $('.tanceng').css('display', 'none');
    });
    //获取售后记录
    function getAfterOrderRecordFn() {
        $.ajax({
            url: SERVER_URL + '/afterorder/recordlist',
            type: 'GET',
            data: afterOrderLookRecordlistData,
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    $('.ven_after_look_recordlist_num').html(oE.totalcount)
                    var datalist = oE.datalist;
                    var afterOrderLookRecordHtml = '';
                    $.each(datalist, function (i, v) {
                        //售后类型判断
                        var afterOrderType = '';
                        if (v['service_type'] == '0') {
                            afterOrderType = '外访售后';
                        } else if (v['service_type'] == '1') {
                            afterOrderType = '电话售后';
                        } else if (v['service_type'] == '2') {
                            afterOrderType = '网络售后';
                        }
                        //评论
                        var afterOrderLookRecordCommit = '';

                        /*<button class="but_small but_look right work_report_Comment" name="xs_shd_Commentfq" style="margin-right:14px;">评论 <i>(' + v['commit_log'].length + ')</i></button>*/
                        $.each(v['commit_log'], function (i2, v2) {
                            afterOrderLookRecordCommit += '<div class="v_rsp_item rsp_item">\
                                <div class="work_rsp_text rsp_text" style="width: 460px;">\
                                <img class="tx" src="' + v2['face'] + '" style="margin-top: 4px;">\
                                <div class="work_wfqd_pl">\
                                <p><span class="c_3 m_right_10">' + v2['uname'] + '</span>' + v2['created_at'] + '</p>\
                            <h3 class="inline_block m_right_20" style="margin-top: 6px;">' + v2['content'] + '</h3>\
                            </div>\
                            <button class="but_normal right c_r work_but_sc val_dialog" style="margin-top: 27px;" name="vendition_khbf_sc">删除</button>\
                                </div>\
                                <div class="vendtion_hr"></div></div>'
                        });
                        afterOrderLookRecordHtml += '<div class="work_report_exitBox work_report_date vendition_bfjl xs_shd_shjl after_order_look_record" afterorderrecordid="' + v['id'] + '" style="display: block;margin-right: 10px;margin-top:16px;">\
                            <div class="work_report_head" style="margin-left:20px;">\
                            <div class="work_report_detHead clearfix inline_block" style="padding:0;">\
                            <span class="left m_top_5" style="background:url(' + v.face + ')"></span>\
                            <div class="work_report_personMsg left">\
                            <p>' + v['uname'] + ' <span>(' + afterOrderType + ')</span></p>\
                            <p>' + v['created_at'] + '</p>\
                        </div>\
                        </div>\
                            </div>\
                            <div class="work_report_det" style="margin-left:20px;">\
                            <div class="work_report_detCon" style="border:0;">\
                            <div class="xs_shd_gjkeMsg">\
                            <p class="c_9 left"><em class="c_3">操作记录：</em><span>SP46547987</span><span>硬盘</span><span>1T</span><span>品牌</span><span>类别</span><span>1块</span></p> <span class="left c_r" style="margin:0 10px;">未解决</span><button class="but_mix but_green right val_dialog" name="xs_shd_shdxq" style="margin-top:14px;">完成售后</button>\
                            </div>\
                            <p>' + v['note'] + '</p>\
                        </div>\
                        <div class="work_report_upload vendition_khbf2">\
                            <img src="' + v['imgurl'] + '" alt="工作计划" class="val_dialog" name="vendition_khbf_imglist" style="border-radius: 3px;">\
                            </div>\
                            <div class="work_report_comment">\
                            <div class="work_report_commentBtn">\
                            </div>\
                            <div style="margin-right:7px;">\
                            <!--评论-->\
                            <div class="work_report_commentCon" name="xs_shd_Commentfq" style="display: none;padding-right:14px;">\
                                <em class="work_report_comment_icon" style="right:27px;"></em>\
                                <label class="inp_box clearfix" style="margin-top:0;">\
                                <input type="text" class="left xs_glbf_plInp2 after_order_look_record_add_commit_inp" value="写评论" onfocus="fn_focus(this);" onblur="fn_blur(this);" style="width: 78%;" >\
                                <button class="work_report_commentBut but_blue after_order_look_record_add_commit_save" style="margin-left:12px;">发送</button>\
                                </label>\
                            ' + afterOrderLookRecordCommit + '\
                                </div>\
                                </div>\
                            </div>\
                            </div>\
                            </div>\
                            </div>\
                            </div>';
                    });
                    $('.ven_after_order_look_recordlist_divs').html(afterOrderLookRecordHtml);
                } else {
                    alert('操作失败')
                }
            }
        });
    }

    //添加评论
    $('.after_order_look_record_add_commit_save').die('click').live('click', function () {
        if ($('.after_order_look_record_add_commit_inp').val() == '写评论') {
            alert('请输入评论内容');
            return false;
        } else {
            $.ajax({
                url: SERVER_URL + '/afterorder/recordcommit',
                type: 'POST',
                data: {
                    token: token,
                    afterorder_id: venAfterOrderCurrentId,
                    record_id: $(this).closest('.after_order_look_record').attr('afterorderrecordid'),
                    content: $('.after_order_look_record_add_commit_inp').val()
                },
                dataType: 'json',
                success: function (oE) {
                    if (oE.code == 0) {
                        getAfterOrderRecordFn()
                    }
                }
            });
        }
    });

    //作废操作
    $('.ven_after_order_invalid_btn').die('click').live('click', function () {
        venAfterOrderCurrentId = $(this).closest('tr').attr('afterorderid');
        $.ajax({
            url: SERVER_URL + '/afterorder/setstatus',
            type: 'POST',
            data: {
                token: token,
                afterorder_id: venAfterOrderCurrentId,
                status_flag: 1
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    alert('操作成功');
                    getAfterOrderList()
                } else {
                    alert('操作失败');
                }
            }
        })
    });

    //查看- 作废操作
    $('.ven_after_order_look_invalid_btn').die('click').live('click', function () {
        $.ajax({
            url: SERVER_URL + '/afterorder/setstatus',
            type: 'POST',
            data: {
                token: token,
                afterorder_id: venAfterOrderCurrentId,
                status_flag: 1
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    alert('操作成功');
                    $('.right_sidebar_h').trigger('click');
                    getAfterOrderList()
                } else {
                    alert('操作失败');
                }
            }
        })
    });

    //查看 - 编辑操作
    $('.ven_after_order_look_edit_btn').die('click').live('click', function () {
        $('.right_sidebar_h').trigger('click');
    })

    //确认接收操作
    $('.ven_after_order_receive_btn').die('click').live('click', function () {
        venAfterOrderCurrentId = $(this).closest('tr').attr('afterorderid');
        $.ajax({
            url: SERVER_URL + '/afterorder/opstatus',
            type: 'GET',
            data: {
                token: token,
                afterorder_id: venAfterOrderCurrentId,
                status: 1
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    getAfterOrderList();
                    $(this).closest('.dialog_box').remove();
                    $('.tanceng').css('display', 'none');
                } else {
                    alert('操作失败');
                }
            }
        })
    });

    //查看 - 接收操作
    $('.ven_after_order_look_receive_btn').die('click').live('click', function () {
        $.ajax({
            url: SERVER_URL + '/afterorder/opstatus',
            type: 'GET',
            data: {
                token: token,
                afterorder_id: venAfterOrderCurrentId,
                status: 1
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    getAfterOrderList();
                    $(this).closest('.dialog_box').remove();
                    $('.tanceng').css('display', 'none');
                    $('.xs_shd_rightBox').css('display', 'none');
                    $('.right_sidebar_h').css('display', 'none');
                } else {
                    alert('操作失败');
                }
            }
        })
    });
    //查看 - 拒绝操作
    $('.ven_after_look_Ido_refuse').die('click').live('click', function () {
        $.ajax({
            url: SERVER_URL + '/afterorder/opstatus',
            type: 'GET',
            data: {
                token: token,
                afterorder_id: venAfterOrderCurrentId,
                status: 3
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    getAfterOrderList();
                    $(this).closest('.dialog_box').remove();
                    $('.tanceng').css('display', 'none');
                    $('.xs_shd_rightBox').css('display', 'none');
                    $('.right_sidebar_h').css('display', 'none');
                } else {
                    alert('操作失败');
                }
            }
        })
    });
    // 分配售后人员
    $('.ven_after_order_look_fpshry').die('click').live('click', function () {
        $('.slider_head_close').trigger('click');
        afterOrderChooseOwnerFn();
        //选择负责人
        $('.tanceng .person_left_nav').die('click').live('click', function () {
            afterOrderCreateData.owner = $(this).attr('userinfoid');
            afterOrderCreateData.dept = $(this).closest('ul').prev('li.left_1').attr('cussortid');
        });
        //选择负责人确认
        $('.tanceng .after_order_create_choose_owner_save').die('click').live('click', function () {
            $.ajax({
                url: SERVER_URL + '/afterorder/setowner',
                type: 'GET',
                data: {
                    token: token,
                    afterorder_id: venAfterOrderCurrentId,
                    owner: $('.tanceng .list_check').closest('li').attr('userinfoid')
                },
                dataType: 'json',
                success: function (oE) {
                    if (oE.code == 0) {
                        getAfterOrderList();
                        $(this).closest('.dialog_box').remove();
                        $('.tanceng').css('display', 'none');
                    }
                }
            });
        })
    });

    //删除操作
    /*$('.ven_cus_visit_del').die('click).live('click', function () {
     $.ajax({
     url: SERVER_URL + '/afterorder/info',
     type: 'GET',
     data: {
     token: token,
     afterorder_id: $('#ven_after_order_del_id').val()
     },
     success: function (e) {
     // 将返回值转换为json对象
     var oE = eval("(" + e + ")");
     if (oE.code == 0) {
     $('.tanceng').css('display', 'none')
     getAfterOrderList()
     } else {
     alert('操作失败')
     }
     }
     })
     })*/

    // 新建售后单参数
    var afterOrderCreateData = {
        token: token,
        recod_id: '', // 售后单记录id 有则修改
        afterorder_id: '', // 售后单id 添加有 修改去掉
        uid: '', // 创建人
        serviced_at: '', // 记录日期
        service_type: '', // 售后类型
        note: '', // 内容
        imgurl: '', // 图片地址
        goods: '', // 基本商品
        product_good_sum_num: '', // 售后数量总数
        product_solve_good_sum_num: '', // 解决数量总数
        sum_good_num: '', // 总计商品
        package: '', // 套餐商品
        imgurl: '', // 图片地址
    };
    // 编辑售后单参数
    var afterOrderEditData = {
        token: token,
        afterorder_id: 0,//售后单id，有值为修改
        code_sn: '', //编号
        order_id: '', //订单id
        customer_id: '', // 客户id添加有
        contacts: '', // 联系人
        tel: '', //联系人电话
        service_at: '', // 售后时间
        dept: '', // 负责部门
        owner: '', //负责人id
        service_type: 0, //售后类型 	0外出售后1电话售后2网络售后
        note: '', //  备注
        good_total_num: '', //商品总数量
        product: [],
        good_sum_num: '',
        product_package: [],
        package_sum_num: '',
        package_goods: [],
        package_in_sum_num: '',
        product_setting: [],
        setting_sum_num: '',
        setting_goods: [],
        setting_in_sum_num: ''
    };
    // 新建售后单
    $('#ven_after_order_create_btn').die('click').live('click', function () {
        //创建时间
        $('.tanceng .ven_after_order_create_time').html(getCurrentDateShort());
        //创建人
        $('.tanceng .ven_after_order_create_uname').html(uname);
        //生成编号
        $('.tanceng .after_order_create_code_sn').val(likGetCodeFn('SHD'));
    });

    //选择销售订单
    $('.tanceng .ven_after_order_create_choose_sell_order_btn').die('click').live('click', function () {
        afterOrderCreateGetSellOrderList();
    });

    // 获取销售订单列表
    var afterOrderSellOrderData = {
        token: token,
        page: 1, //页面
        num: 10, //每页条数
        list_type: 'my', //查询类型：空是所有，team团队订单 my我的订单copy抄送给我的
        key: ''//关键字
    };

    function afterOrderCreateGetSellOrderList() {
        $.ajax({
            url: SERVER_URL + '/order/list',
            type: 'GET',
            data: afterOrderSellOrderData,
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                if (oE.code == 0) {
                    //搜索总条数
                    $('.tanceng .ven_after_order_create_sell_order_total').html(oE.totalcount);
                    //获取datalist
                    var datalist = oE.datalist;
                    if (datalist.length == 0) {
                        $('.ven_after_order_create_sell_order_nodata_box').removeClass('none');
                        $('.ven_after_order_create_sell_order_handle').addClass('none');
                    } else {
                        $('.ven_after_order_create_sell_order_nodata_box').addClass('none');
                        $('.ven_after_order_create_sell_order_handle').removeClass('none');
                    }
                    //字符串拼接
                    var sellOrderHtml = '';
                    $.each(datalist, function (i, v) {
                        sellOrderHtml += '<tr sellorderid="' + v['id'] + '" vensellordercustomid="' + v['customer_id'] + '" vensellordercontacts="' + v['contacts_name'] + '" vensellordertel="' + v['contacts_tel'] + '" vensellorderlinkquoteid="' + v['quote_id'] + '">\
                            <td><input type="radio" name="xs_xsdd_xzxsbjdinp" ' + (i == 0 ? 'checked' : '') + '></td>\
                            <td>' + (v['code_sn']) + '</td>\
                            <td>' + (v['customer_name']) + '</td>\
                            <td>' + (v['created_at'].split(' ')[0]) + '</td>\
                            <td>' + (v['dept_name']) + '</td>\
                            <td>' + (v['owner_name']) + '</td>\
                            <td>' + (v['totals']) + '</td>\
                        </tr>';
                    });
                    //销售订单数据渲染
                    $('.tanceng .ven_after_order_create_sell_order_list').html(sellOrderHtml);
                }
                //分页
                list_table_render_pagination('.ven_after_order_create_sell_order_page', afterOrderSellOrderData, afterOrderCreateGetSellOrderList, oE.totalcount, datalist.length);
            }
        });
    }

    //搜索关键字
    $('.tanceng .ven_after_order_create_sell_order_searKey_btn').die('click').live('click', function () {
        if ($('.tanceng .ven_after_order_create_sell_order_searKey').val() == '搜索客户名称') {
            alert('请输入搜索关键字');
            afterOrderSellOrderData.key = '';
        } else {
            afterOrderSellOrderData.key = $('.tanceng .ven_after_order_create_sell_order_searKey').val();
        }
        afterOrderCreateGetSellOrderList();
    });

    //新建售后单 - 选择销售订单 - 确定
    //读取相关联的报价单
    var afterOrderLinkQuoteid = '';
    //删除时候用于判断
    var afterOrderProductChosenIndexArr = [];
    //选择销售订单保存
    $('.tanceng .ven_after_order_create_choose_sell_order_save').die('click').live('click', function () {
        var chosenOrder = $('.tanceng .ven_after_order_create_sell_order_list input:checked').closest('tr');
        //新建
        $('.tanceng .ven_after_order_link_order_code_inp').val(chosenOrder.find('td').eq(1).html()).css('color', '#333');
        afterOrderCreateData.order_id = chosenOrder.attr('sellorderid');
        getSellOrderDetailFn(afterOrderCreateData.order_id);
        //编辑
        afterOrderEditData.order_id = chosenOrder.attr('sellorderid');
        afterOrderEditData.customer_id = chosenOrder.attr('vensellordercustomid');
        afterOrderEditData.contacts = chosenOrder.attr('vensellordercontacts');
        afterOrderEditData.tel = chosenOrder.attr('vensellordertel');
        $('.tanceng .ven_after_order_create_custom_name').val(chosenOrder.find('td').eq(2).html());
        $('.tanceng .ven_after_order_edit_contacts').val(chosenOrder.attr('vensellordercontacts'));
        $('.tanceng .ven_after_order_edit_tel').val(chosenOrder.attr('vensellordertel'));
        $(this).closest('.dialog_box').remove();
        $('.tanceng .xs_shd_new_addBox').removeClass('none');
        $('.tanceng .xs_xsbjd_sp_box').removeClass('none');
        $('.xs_shd_t_textarea .t_left').css('margin-left', '0');
        $('.xs_shd_new').css('width', '1000');
        $('.xs_shd_new_input').css('width', '56%');
        $('.xs_shd_t_textarea').css({'width': '56%', 'margin-left': '0'});
    });
    $('.tanceng .after_order_choose_product_btn').die('click').live('click', function () {
        if ($('.tanceng .ven_after_order_link_order_code_inp').val() == '请选择销售订单' || $('.tanceng .ven_after_order_link_order_code_inp').val() == '') {
            alert('请先选择销售订单！');
            return false;
        }
        $.ajax({
            url: SERVER_URL + '/quote/detail',
            type: 'GET',
            data: {
                token: token,
                quote_id: afterOrderLinkQuoteid
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    //搜索总条数
                    $('.tanceng .ven_after_order_create_sell_order_total').html(oE.totalcount);
                    //获取datalist
                    var data = oE.data;
                    $('.tanceng .after_order_link_quote_code').html(data['code_sn']);
                    if (data['steps'] && data['steps']['product_json']) {
                        var productJson = data['steps']['product_json'];
                        //普通商品数量
                        $('.tanceng .after_order_link_quote_goods_num').html(productJson['product'].length);
                        //普通商品列表
                        var productJsonGoodsHtml = '';
                        $.each(productJson['product'], function (i, v) {
                            productJsonGoodsHtml += '<tr goodsid="' + v['good_id'] + '" goodsnamespec="' + (v['good_name'] + '/' + v['spec']) + '" goodscodesn="' + v['good_code_sn'] + '" goodsattr="' + v['good_attribute'] + '" goodsunit="' + v['unit'] + '" goodsnum="' + v['num'] + '">\
                                <td><input type="checkbox" name="xs_xsthd_xzCheck"></td>\
                                <td>\
                                <div class="num_input inline_block num_input_new"><button class="but_blue but_opa_small inp_plus">+</button><input type="text" value="1" /><button class="but_blue but_opa_small radius_left_0 inp_reduce">-</button></div>\
                                </td>\
                                <td>' + v['num'] + '</td>\
                                <td>' + v['good_code_sn'] + '</td>\
                                <td>' + v['good_name'] + '</td>\
                                <td>' + v['unit'] + '</td>\
                                <td>' + v['spec'] + '</td>\
                                <td>' + v['good_attribute'] + '</td>\
                            </tr>'
                        });
                        $('.tanceng .after_order_link_quote_goods_list').html(productJsonGoodsHtml);
                        //套餐商品数量
                        $('.tanceng .after_order_link_quote_package_num').html(productJson['product_package'].length);
                        //套餐商品列表
                        var productJsonPackageHtml = '';
                        $.each(productJson['product_package'], function (i, v) {
                            var packageGoodsHtml = '';
                            $.each(v['product'], function (i2, v2) {
                                packageGoodsHtml += v2['good_name'] + '/' + v2['spec'] + '、';
                            });
                            packageGoodsHtml = packageGoodsHtml.slice(0, packageGoodsHtml.length - 1);
                            productJsonPackageHtml += '<tr packageid="' + v['package_id'] + '">\
                                <td><input type="checkbox" name="xs_xsthd_xzbhCheck"></td>\
                                <td>\
                                <div class="num_input inline_block num_input_new"><button class="but_blue but_opa_small inp_plus">+</button><input type="text" value="1" /><button class="but_blue but_opa_small radius_left_0 inp_reduce">-</button></div>\
                                </td>\
                                <td>' + v['package_num'] + '</td>\
                                <td>' + v['package_code_sn'] + '</td>\
                                <td>' + v['package_name'] + '</td>\
                                <td>' + packageGoodsHtml + '</td>\
                            </tr>'
                        });
                        $('.tanceng .after_order_link_quote_package_list').html(productJsonPackageHtml);
                        //配置商品数量
                        $('.tanceng .after_order_link_quote_setting_num').html(productJson['product_setting'].length);
                        //配置商品列表
                        var productJsonSettingHtml = '';
                        $.each(productJson['product_setting'], function (i, v) {
                            var settingGoodsHtml = '';
                            $.each(v['product'], function (i2, v2) {
                                settingGoodsHtml += v2['good_name'] + '/' + v2['spec'] + '、';
                            });
                            settingGoodsHtml = settingGoodsHtml.slice(0, settingGoodsHtml.length - 1);
                            productJsonSettingHtml += '<tr>\
                                <td><input type="checkbox" name="xs_xsthd_xzbhCheck"></td>\
                                <td>\
                                <div class="num_input inline_block num_input_new"><button class="but_blue but_opa_small inp_plus">+</button><input type="text" value="1" /><button class="but_blue but_opa_small radius_left_0 inp_reduce">-</button></div>\
                                </td>\
                                <td>' + v['setting_num'] + '</td>\
                                <td>' + v['setting_code_sn'] + '</td>\
                                <td>' + v['setting_name'] + '</td>\
                                <td>' + v['setting_spec'] + '</td>\
                                <td>' + settingGoodsHtml + '</td>\
                            </tr>'
                        });
                        $('.tanceng .after_order_link_quote_setting_list').html(productJsonSettingHtml);
                    }
                }
            }
        });
        afterOrderProductChosenIndexArr = [];
    });

    //销售订单详情
    function getSellOrderDetailFn(sellOrderId) {
        $.ajax({
            url: SERVER_URL + '/order/info',
            type: 'GET',
            data: {
                token: token,
                order_id: sellOrderId
            },
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                if (oE.code == 0) {
                    var data = oE.data;
                    //客户名称
                    $('.tanceng .ven_after_order_create_custom_name').val(data['customer_name']);
                    //联系人
                    var contHtml = '';
                    if (data['contacts'] && data['contacts'].length > 0) {
                        $('.tanceng .ven_after_order_create_contact_inp').val(data['contacts'][0]['name']);
                        $('.tanceng .ven_after_order_create_contact_tel').val(data['contacts'][0]['tel']);
                        $.each(data['contacts'], function (i, v) {
                            contHtml += '<li contel="' + v['tel'] + '">' + v['name'] + '</li>';
                        });
                        $('.tanceng .ven_after_order_create_contact_list').html(contHtml);
                    }
                    //售后地址
                    $('.tanceng .ven_after_order_create_address').val(data['address']);
                    //商品信息
                    if (data['product_json']) {
                        //基本商品
                        if (data['product_json']['goods']) {
                            var goodsHtml = '';
                            $.each(data['product_json']['goods'], function (i, v) {
                                goodsHtml += '<tr >\
                                    <td><input type="checkbox" class="goods_choose_checkbox"></td>\
                                    <td>' + v['good_sn'] + '</td>\
                                    <td>' + v['good_name'] + '</td>\
                                    <td>' + v['good_attr'] + '</td>\
                                    <td>' + v['good_num'] + v['good_unit'] + '</td>\
                                    <td><div class="xs_num_input num_input inline_block num_input_new"><button class="but_grey_a but_opa_small inp_plus goods_num_change_btn" disabled>+</button><input type="text" class="lik_input_number productnum" value="0" maxnum="' + v['good_num'] + '" disabled><button class="but_grey_a but_opa_small radius_left_0 inp_reduce goods_num_change_btn" disabled>-</button></div></td>\
                                    </tr>';
                            });
                            $('.tanceng .ven_after_order_create_goods_list').html(goodsHtml);
                        }
                        //套餐商品
                        if (data['product_json']['package']) {
                            var packageHtml = '';
                            $.each(data['product_json']['package'], function (i, v) {
                                var packageGoodsHtml = '';
                                $.each(v['good_list'], function (i2, v2) {
                                    var attrList = '';
                                    $.each(v2['attr_list'], function (i3, v3) {
                                        attrList += '<tr goodsid="' + v3['good_id'] + '">\
                                                    <td><input type="checkbox" class="goods_choose_checkbox"></td>\
                                                    <td>' + v3['good_sn'] + '</td>\
                                                    <td>' + v3['good_attr'] + '</td>\
                                                    <td>' + v3['total_num'] + '</td>\
                                                    <td><div class="xs_num_input num_input inline_block num_input_new"><button class="but_grey_a but_opa_small inp_plus goods_num_change_btn" disabled>+</button><input type="text" class="lik_input_number productnum ven_after_order_package_child_num_inp" value="0" singnum="' + v3['sing_num'] + '" maxnum="' + v3['total_num'] + '" disabled><button class="but_grey_a but_opa_small radius_left_0 inp_reduce goods_num_change_btn" disabled>-</button></div></td>\
                                                    </tr>';
                                    });
                                    packageGoodsHtml += '<div class="box_open_list goods_tc_toggle">\
                                        <p class="box_open_head" style="background: rgb(255, 255, 255); border-radius: 3px;"><span class="cont_title" style="padding-left: 0;margin-left: 0;">' + v2['title'] + '</span></p>\
                                        <div class="div_1 container">\
                                        <table>\
                                        <thead>\
                                        <tr>\
                                        <th width="32">选择</th>\
                                        <th width="140">编号</th>\
                                        <th width="435">属性</th>\
                                        <th width="65">售出数量</th>\
                                        <th width="88">售后数量</th>\
                                        </tr>\
                                        </thead>\
                                        <tbody>' + attrList + '</tbody>\
                                        </table>\
                                        </div>\
                                        </div>';
                                });
                                packageHtml += '<div class="ven_after_order_package_list_one">\
                                    <div class="xs_div_2" style="border-bottom: 1px solid #e6e6e6;">\
                                    <div class="div_1 container">\
                                    <table>\
                                    <thead>\
                                    <tr>\
                                    <th width="32">选择</th>\
                                    <th width="140">编号</th>\
                                    <th width="100">名称</th>\
                                    <th width="65">售出数量</th>\
                                    <th width="88">售后数量</th>\
                                    <th width="60">操作</th>\
                                    </tr>\
                                    </thead>\
                                    <tbody>\
                                    <tr packageid="'+v['package_id']+'">\
                                    <td><input type="checkbox" class="ven_after_order_create_package_parent_checkbox"></td>\
                                    <td>'+v['package_sn']+'</td>\
                                    <td>'+v['package_name']+'</td>\
                                <td>'+v['package_num']+'</td>\
                                <td><div class="xs_num_input num_input inline_block num_input_new"><button class="but_blue but_opa_small inp_plus goods_num_change_btn ven_after_order_package_parent_num_change_btn" disabled>+</button><input type="text" value="0" maxnum="'+v['package_num']+'" class="lik_input_number productnum ven_after_order_package_parent_num_inp" style="border:1px solid #23a2f3;" disabled><button class="but_blue but_opa_small radius_left_0 inp_reduce goods_num_change_btn ven_after_order_package_parent_num_change_btn" disabled>-</button></div></td>\
                                    <td><button class="but_mix box_open_btn_1 but_blue_1">展开</button></td>\
                                    </tr>\
                                    </tbody>\
                                    </table>\
                                    </div>\
                                    </div>\
                                    <div class="xs_xsbjd_table_t2 none" style="padding: 10px;border-bottom: 2px solid #e6e6e6;">' + packageGoodsHtml + '</div>\
                                    </div>';
                            });
                            $('.tanceng .ven_after_order_create_package_list').html(packageHtml);
                        }
                    }
                } else {
                    alert(oE.msg);
                }
            }
        });
    }

    //改变商品数量
    $('.tanceng .goods_num_change_btn').live('click', function () {
        if (parseFloat($(this).siblings('input.productnum').val()) > parseFloat($(this).siblings('input.productnum').attr('maxnum'))) {
            alert('已达到最大数量');
            $(this).siblings('input.productnum').val($(this).siblings('input.productnum').attr('maxnum'));
        }
    });
    $('input.productnum').live('keyup', function () {
        if (parseFloat($(this).val()) > parseFloat($(this).attr('maxnum'))) {
            alert('已达到最大数量');
            $(this).val($(this).attr('maxnum'));
        }
    });
    //选中商品
    $('.tanceng .goods_choose_checkbox').live('click', function () {
        if ($(this).is(':checked')) {
            $(this).closest('tr').find('input.productnum, button.inp_plus, button.inp_reduce').attr('disabled', false);
        } else {
            $(this).closest('tr').find('input.productnum, button.inp_plus, button.inp_reduce').attr('disabled', true);
            $(this).closest('tr').find('input.productnum').val('0');
        }
    });

    //套餐商品选中状态
    $('.tanceng .ven_after_order_create_package_parent_checkbox').live('click', function () {
        if ($(this).is(':checked')) {
            $(this).closest('.ven_after_order_package_list_one').find('input.goods_choose_checkbox').attr('disabled', true).attr('checked', true);
            $(this).closest('tr').find('input.productnum, button.inp_plus, button.inp_reduce').attr('disabled', false);
        } else {
            $(this).closest('.ven_after_order_package_list_one').find('input.goods_choose_checkbox').attr('disabled', false).attr('checked', false);
            $(this).closest('tr').find('input.productnum, button.inp_plus, button.inp_reduce').attr('disabled', false);
            $(this).closest('.ven_after_order_package_list_one').find('input.productnum').val('0');
        }
    });

    //套餐商品父级改变数量
    $('.tanceng .ven_after_order_package_parent_num_change_btn').live('click', function () {
        venAfterOrderPackageChildNum();
    });
    $('.tanceng .ven_after_order_package_parent_num_inp').live('keyup', function () {
        venAfterOrderPackageChildNum();
    });
    //套餐商品子级数量变化
    function venAfterOrderPackageChildNum(){
        $.each($('.tanceng .ven_after_order_package_child_num_inp'), function(i, v){
            $('.tanceng .ven_after_order_package_child_num_inp').eq(i).val(parseFloat($('.tanceng .ven_after_order_package_child_num_inp').eq(i).closest('.ven_after_order_package_list_one').find('.ven_after_order_package_parent_num_inp').val()) * parseFloat($('.tanceng .ven_after_order_package_child_num_inp').eq(i).attr('singnum')));
        })
    }

    //选择联系人
    $('.tanceng .ven_after_order_create_contact_list li').live('click', function () {
        $('.tanceng .ven_after_order_create_contact_inp').val($(this).text());
        $('.tanceng .ven_after_order_create_contact_tel').val($(this).attr('contel'));
    });

    //新建售后单 - 选择商品保存
    $('.after_order_choose_product_save').die('click').live('click', function () {
        //普通商品
        var afterOrderChooseGoodsArr = [];
        $.each($('.tanceng .after_order_link_quote_goods_list tr'), function (i, v) {
            if ($('.tanceng .after_order_link_quote_goods_list tr').eq(i).find('input:checkbox').attr('checked') == 'checked') {
                var afterOrderGoodsChosen = $('.tanceng .after_order_link_quote_goods_list tr').eq(i);
                afterOrderChooseGoodsArr.push({
                    goodsid: afterOrderGoodsChosen.attr('goodsid'),
                    goodsnamespec: afterOrderGoodsChosen.attr('goodsnamespec'),
                    goodscodesn: afterOrderGoodsChosen.attr('goodscodesn'),
                    goodsattr: afterOrderGoodsChosen.attr('goodsattr'),
                    goodsunit: afterOrderGoodsChosen.attr('goodsunit'),
                    goodsnum: afterOrderGoodsChosen.attr('goodsnum')
                });
                var goodsChosenListHtml = '';
                $.each(afterOrderChooseGoodsArr, function (i, v) {
                    goodsChosenListHtml += '<tr>\
                                                <td>' + l_dbl(i + 1) + '</td>\
                                                <td><span class="after_order_goods_namespec">' + v['goodsnamespec'] + '</span><button class="but_mix but_blue val_dialogTop after_order_choose_product_btn" name="xs_shd_choose">选择商品</button></td>\
                                                <td class="after_order_goods_codesn">' + v['goodscodesn'] + '</td>\
                                                <td class="after_order_goods_attr">' + v['goodsattr'] + '</td>\
                                            <td class="after_order_goods_unit">' + v['goodsunit'] + '</td>\
                                            <td class="after_order_create_goods_num_max">' + v['goodsnum'] + '</td>\
                                            <td>\
                                            <div class="num_input inline_block num_input_new"><button class="but_blue but_opa_small inp_plus after_order_create_goods_num_change_btn">+</button><input class="after_order_create_goods_num_change_inp" type="text" value="1"/><button class="but_blue but_opa_small radius_left_0 inp_reduce after_order_create_goods_num_change_btn">-</button></div>\
                                                </td>\
                                                <td style="min-width:350px;">\
                                                <div>\
                                                <div class="t_textinput inline_block" style="margin:0;">\
                                                <div class="t_right" style="margin-left:0;width: 100%;"><input type="text" class="time_input after_order_goods_note" value="" onfocus="fn_focus(this);" onblur="fn_blur(this);" style="color: rgb(153, 153, 153);">\
                                                </div>\
                                                </div>\
                                                <div class="t_textinput inline_block xs_shd_imgBox" style="margin:0;">\
                                                </div>\
                                                </div>\
                                                </td>\
                                            </tr>'
                });
                $('.tanceng .after_order_create_goods_chosen_list').html(goodsChosenListHtml);
                $(".page_108_shdSP").removeClass("none").children(".box_open_list").eq(0).removeClass("none");
                $(".tanceng .page108_newshd_box").width(1100);
                $(".tanceng .page108_newshd_box .page108_new_inputBox").width('50%');
                //合计数量控制
                $('.tanceng .after_order_create_goods_chosen_total').html(afterOrderChooseGoodsArr.length);
                //数量控制
                $('.tanceng .after_order_create_goods_num_change_btn').die('click').live('click', function () {
                    if ($('.tanceng .after_order_create_goods_chosen_list tr').eq(i).find('.after_order_create_goods_num_change_inp').val() >= $('.tanceng .after_order_create_goods_chosen_list tr').eq(i).find('.after_order_create_goods_num_max').text()) {
                        $('.tanceng .after_order_create_goods_chosen_list tr').eq(i).find('.after_order_create_goods_num_change_inp').val($('.tanceng .after_order_create_goods_chosen_list tr').eq(i).find('.after_order_create_goods_num_max').text())
                    }
                    var afterOrderChooseGoodsTotal = 0;
                    $.each($('.tanceng .after_order_create_goods_chosen_list tr'), function (i, v) {
                        afterOrderChooseGoodsTotal += parseFloat($('.tanceng .after_order_create_goods_chosen_list tr').eq(i).find('.after_order_create_goods_num_change_inp').val());
                    });
                    $('.tanceng .after_order_create_goods_chosen_total').html(afterOrderChooseGoodsTotal);
                    afterOrderNumTotalChange();
                });
                if ($.inArray(0, afterOrderProductChosenIndexArr) == -1) {
                    afterOrderProductChosenIndexArr.push(0);
                }
            }
        });
        //套餐商品
        var afterOrderChoosePackageIndexArr = [];
        $.each($('.tanceng .after_order_link_quote_package_list tr'), function (i, v) {
            if ($('.tanceng .after_order_link_quote_package_list tr').eq(i).find('input:checkbox').attr('checked') == 'checked') {
                afterOrderChoosePackageIndexArr.push(i);
                $(".page_108_shdSP").removeClass("none").children(".box_open_list").eq(1).removeClass("none");
                $(".tanceng .page108_newshd_box").width(1100);
                $(".tanceng .page108_newshd_box .page108_new_inputBox").width('50%');
                if ($.inArray(1, afterOrderProductChosenIndexArr) == -1) {
                    afterOrderProductChosenIndexArr.push(1);
                }
            }
        });
        //套餐商品数据渲染
        var afterOrderPackageParentArr = [];
        var afterOrderPackageChildArr = [];
        $.each(afterOrderChoosePackageIndexArr, function (i, v) {
            $.ajax({
                url: SERVER_URL + '/quote/detail',
                type: 'GET',
                data: {
                    token: token,
                    quote_id: afterOrderLinkQuoteid
                },
                async: false,
                dataType: 'json',
                success: function (oE) {
                    if (oE.code == 0) {
                        var data = oE.data;
                        if (data['steps']) {
                            afterOrderPackageParentArr = afterOrderPackageParentArr.concat(data['steps']['product_json']['product_package'][v]);
                        }
                    }
                }
            });
        });
        //套餐
        var packageChosenParentListHtml = '';
        $.each(afterOrderPackageParentArr, function (i, v) {
            afterOrderPackageChildArr = afterOrderPackageChildArr.concat(v.product);
            packageChosenParentListHtml += '<tr>\
                                                <td><span class="after_order_package_name">' + v['package_name'] + '</span><button class="but_small but_yellow val_dialogTop after_order_choose_product_btn" name="xs_shd_choose">修改套餐商品</button></td>\
                                                <td class="after_order_package_code_sn">' + v['package_code_sn'] + '</td>\
                                                <td class="after_order_create_package_parent_num_max">' + v['package_num'] + '</td>\
                                                <td>\
                                                <div class="num_input inline_block num_input_new"><button class="but_blue but_opa_small inp_plus after_order_create_package_parent_num_change">+</button><input class="after_order_create_package_parent_num_inp" type="text" value="1"><button class="but_blue but_opa_small radius_left_0 inp_reduce after_order_create_package_parent_num_change">-</button></div>\
                                                </td>\
                                                <td style="min-width: 240px;">\
                                                <div>\
                                                <div class="t_textinput inline_block" style="margin:0;">\
                                                <div class="t_right" style="margin-left:0;width: 100%;"><input type="text" class="time_input after_order_package_note" value="" onfocus="fn_focus(this);" onblur="fn_blur(this);" style="color: rgb(153, 153, 153);">\
                                                </div>\
                                                </div>\
                                                <div class="t_textinput inline_block xs_shd_imgBox" style="margin:0;">\
                                                </div>\
                                                </div>\
                                                </td>\
                                              </tr>'
        });
        $('.tanceng .after_order_create_package_parent_chosen_list').html(packageChosenParentListHtml);
        $('.tanceng .after_order_create_package_parent_num_total').html(afterOrderPackageParentArr.length);
        $('.tanceng .after_order_create_package_parent_num_change').die('click').live('click', function () {
            if ($(this).siblings('.after_order_create_package_parent_num_inp').val() >= $(this).closest('tr').find('.after_order_create_package_parent_num_max').text()) {
                $(this).siblings('.after_order_create_package_parent_num_inp').val($(this).closest('tr').find('.after_order_create_package_parent_num_max').text());
            }
            var total = 0;
            var $_this = $(this);
            $.each($_this.closest('tbody').find('tr'), function (i, v) {
                total += parseFloat($_this.closest('tbody').find('tr').eq(i).find('.after_order_create_package_parent_num_inp').val());
            });
            $('.tanceng .after_order_create_package_parent_num_total').html(total);
        });
        //套餐子商品
        var packageChosenChildListHtml = '';
        $.each(afterOrderPackageChildArr, function (i, v) {
            packageChosenChildListHtml += '<tr>\
                                                <td>' + l_dbl(i + 1) + '</td>\
                                                <td class="after_order_package_good_name">' + v['good_name'] + '/' + v['spec'] + '</td>\
                                                <td class="after_order_package_good_code_sn">' + v['good_code_sn'] + '</td>\
                                                <td class="after_order_create_package_good_attribute">' + v['good_attribute'] + '</td>\
                                            <td class="after_order_package_good_unit">' + v['unit'] + '</td>\
                                            <td class="after_order_create_package_child_num_max">' + v['num'] + '</td>\
                                            <td>\
                                            <div class="num_input inline_block num_input_new"><button class="but_blue but_opa_small inp_plus after_order_create_package_child_num_change">+</button><input class="after_order_create_package_child_num_inp" type="text" value="1"/><button class="but_blue but_opa_small radius_left_0 inp_reduce after_order_create_package_child_num_change">-</button></div>\
                                                </td>\
                                                <td style="min-width:280px;">\
                                                <div>\
                                                <div class="t_textinput inline_block" style="margin:0;">\
                                                <div class="t_right" style="margin-left:0;width: 100%;"><input type="text" class="time_input after_order_package_good_note" value="" onfocus="fn_focus(this);" onblur="fn_blur(this);" style="color: rgb(153, 153, 153);">\
                                                </div>\
                                                </div>\
                                                <div class="t_textinput inline_block xs_shd_imgBox" style="margin:0;"><ul class="xs_shd_scImg clearfix inline_block"></ul>\
                                                </div>\
                                                </div>\
                                                </td>\
                                                <td class="xs_butbox">\
                                                <button class="but_blue but_opa_small but_red after_order_product_del_btn">-</button>\
                                                </td>\
                                                </tr>'
        });
        $('.tanceng .after_order_create_package_child_chosen_list').html(packageChosenChildListHtml);
        $('.tanceng .after_order_create_package_child_num_total').html(afterOrderPackageChildArr.length);
        $('.tanceng .after_order_create_package_child_num_change').die('click').live('click', function () {
            if ($(this).siblings('.after_order_create_package_child_num_inp').val() >= $(this).closest('tr').find('.after_order_create_package_child_num_max').text()) {
                $(this).siblings('.after_order_create_package_child_num_inp').val($(this).closest('tr').find('.after_order_create_package_child_num_max').text());
            }
            var total = 0;
            var $_this = $(this);
            $.each($_this.closest('tbody').find('tr'), function (i, v) {
                total += parseFloat($_this.closest('tbody').find('tr').eq(i).find('.after_order_create_package_child_num_inp').val());
            });
            $('.tanceng .after_order_create_package_child_num_total').html(total);
            afterOrderNumTotalChange();
        });

        //配置商品
        var afterOrderChooseSettingIndexArr = [];
        $.each($('.tanceng .after_order_link_quote_setting_list tr'), function (i, v) {
            if ($('.tanceng .after_order_link_quote_setting_list tr').eq(i).find('input:checkbox').attr('checked') == 'checked') {
                afterOrderChooseSettingIndexArr.push(i);
                $(".page_108_shdSP").removeClass("none").children(".box_open_list").eq(2).removeClass("none");
                $(".tanceng .page108_newshd_box").width(1100);
                $(".tanceng .page108_newshd_box .page108_new_inputBox").width('50%');
                if ($.inArray(2, afterOrderProductChosenIndexArr) == -1) {
                    afterOrderProductChosenIndexArr.push(2);
                }
            }
        });
        //配置商品数据渲染
        var afterOrderSettingParentArr = [];
        var afterOrderSettingChildArr = [];
        $.each(afterOrderChooseSettingIndexArr, function (i, v) {
            $.ajax({
                url: SERVER_URL + '/quote/detail',
                type: 'GET',
                data: {
                    token: token,
                    quote_id: afterOrderLinkQuoteid
                },
                async: false,
                dataType: 'json',
                success: function (oE) {
                    if (oE.code == 0) {
                        var data = oE.data;
                        if (data['steps']) {
                            afterOrderSettingParentArr = afterOrderSettingParentArr.concat(data['steps']['product_json']['product_setting'][v]);
                        }
                    }
                }
            });
        });
        //配置
        var settingChosenParentListHtml = '';
        $.each(afterOrderSettingParentArr, function (i, v) {
            afterOrderSettingChildArr = afterOrderSettingChildArr.concat(v.product);
            settingChosenParentListHtml += '<tr>\
                <td><span class="after_order_setting_name">' + v['setting_name'] + '/' + v['setting_spec'] + '</span><button class="but_small but_yellow val_dialogTop after_order_choose_product_btn" name="xs_shd_choose">修改配置商品</button></td>\
                <td class="after_order_setting_code_sn">' + v['setting_code_sn'] + '</td>\
                <td class="after_order_setting_unit">' + v['setting_unit'] + '</td>\
                <td class="after_order_create_setting_parent_num_max">' + v['setting_num'] + '</td>\
                <td>\
                <div class="num_input inline_block num_input_new"><button class="but_blue but_opa_small inp_plus after_order_create_setting_parent_num_change">+</button><input class="after_order_create_setting_parent_num_inp" type="text" value="1"><button class="but_blue but_opa_small radius_left_0 inp_reduce after_order_create_setting_parent_num_change">-</button></div>\
                </td>\
                <td>\
                <div>\
                <div class="t_textinput inline_block" style="margin:0;">\
                <div class="t_right" style="margin-left:0;width: 100%;"><input type="text" class="time_input after_order_setting_note" value="" onfocus="fn_focus(this);" onblur="fn_blur(this);" style="color: rgb(153, 153, 153);">\
                </div>\
                </div>\
                <div class="t_textinput inline_block xs_shd_imgBox" style="margin:0;">\
                </div>\
                </div>\
                </td>\
                </tr>'
        });
        $('.tanceng .after_order_create_setting_parent_chosen_list').html(settingChosenParentListHtml);
        $('.tanceng .after_order_create_setting_parent_num_total').html(afterOrderSettingParentArr.length);
        $('.tanceng .after_order_create_setting_parent_num_change').die('click').live('click', function () {
            if ($(this).siblings('.after_order_create_setting_parent_num_inp').val() >= $(this).closest('tr').find('.after_order_create_setting_parent_num_max').text()) {
                $(this).siblings('.after_order_create_setting_parent_num_inp').val($(this).closest('tr').find('.after_order_create_setting_parent_num_max').text());
            }
            var total = 0;
            var $_this = $(this);
            $.each($_this.closest('tbody').find('tr'), function (i, v) {
                total += parseFloat($_this.closest('tbody').find('tr').eq(i).find('.after_order_create_setting_parent_num_inp').val());
            });
            $('.tanceng .after_order_create_setting_parent_num_total').html(total);
        });
        //配置子商品
        var settingChosenChildListHtml = '';
        $.each(afterOrderSettingChildArr, function (i, v) {
            settingChosenChildListHtml += '<tr>\
                                                <td>' + l_dbl(i + 1) + '</td>\
                                                <td class="after_order_setting_good_name">' + v['good_name'] + '/' + v['spec'] + '</td>\
                                                <td class="after_order_setting_good_code_sn">' + v['good_code_sn'] + '</td>\
                                                <td class="after_order_create_setting_good_attribute">' + v['good_attribute'] + '</td>\
                                            <td class="after_order_setting_good_unit">' + v['unit'] + '</td>\
                                            <td class="after_order_create_setting_child_num_max">' + v['num'] + '</td>\
                                            <td>\
                                            <div class="num_input inline_block num_input_new"><button class="but_blue but_opa_small inp_plus after_order_create_setting_child_num_change">+</button><input class="after_order_create_setting_child_num_inp" type="text" value="1"/><button class="but_blue but_opa_small radius_left_0 inp_reduce after_order_create_setting_child_num_change">-</button></div>\
                                                </td>\
                                                <td style="min-width:350px;">\
                                                <div>\
                                                <div class="t_textinput inline_block" style="margin:0;">\
                                                <div class="t_right" style="margin-left:0;width: 100%;"><input type="text" class="time_input after_order_setting_good_note" value="" onfocus="fn_focus(this);" onblur="fn_blur(this);" style="color: rgb(153, 153, 153);">\
                                                </div>\
                                                <div class="t_textinput inline_block xs_shd_imgBox" style="margin:0;">\
                                                </div>\
                                                </div>\
                                                </td>\
                                                <td class="xs_butbox">\
                                                <button class="but_blue but_opa_small but_red after_order_product_del_btn">-</button>\
                                                </td>\
                                             </tr>'
        });
        $('.tanceng .after_order_create_setting_child_chosen_list').html(settingChosenChildListHtml);
        $('.tanceng .after_order_create_setting_child_num_total').html(afterOrderSettingChildArr.length);
        $('.tanceng .after_order_create_setting_child_num_change').die('click').live('click', function () {
            if ($(this).siblings('.after_order_create_setting_child_num_inp').val() >= $(this).closest('tr').find('.after_order_create_setting_child_num_max').text()) {
                $(this).siblings('.after_order_create_setting_child_num_inp').val($(this).closest('tr').find('.after_order_create_setting_child_num_max').text());
            }
            var total = 0;
            var $_this = $(this);
            $.each($_this.closest('tbody').find('tr'), function (i, v) {
                total += parseFloat($_this.closest('tbody').find('tr').eq(i).find('.after_order_create_setting_child_num_inp').val());
            });
            $('.tanceng .after_order_create_setting_child_num_total').html(total);
            afterOrderNumTotalChange();
        });
        console.log(afterOrderProductChosenIndexArr);
        //普通商品
        if ($.inArray(0, afterOrderProductChosenIndexArr) == -1) {
            $('.tanceng .after_order_create_goods_chosen_list').html('');
            $(".page_108_shdSP").children(".box_open_list").eq(0).addClass("none");
        }
        //套餐商品
        if ($.inArray(1, afterOrderProductChosenIndexArr) == -1) {
            $(".page_108_shdSP").children(".box_open_list").eq(1).addClass("none");
        }
        //配置商品
        if ($.inArray(2, afterOrderProductChosenIndexArr) == -1) {
            $(".page_108_shdSP").children(".box_open_list").eq(2).addClass("none");
        }
        //总体判断
        if ($.inArray(0, afterOrderProductChosenIndexArr) == -1 && $.inArray(1, afterOrderProductChosenIndexArr) == -1 && $.inArray(2, afterOrderProductChosenIndexArr) == -1) {
            $(".page_108_shdSP").addClass("none");
            $(".tanceng .page108_newshd_box").width(620);
            $(".tanceng .page108_newshd_box .page108_new_inputBox").width('100%');
        }
        afterOrderNumTotalChange();
        $(this).closest('.dialog_box').remove();
    });

    //新建销售单 - 删除单条商品
    $('.tanceng .after_order_product_del_btn').die('click').live('click', function () {
        $(this).closest('tr').remove();
    });

    //新建售后单 - 删除套餐子商品
    $('.tanceng .after_order_create_package_child_chosen_list .after_order_product_del_btn').die('click').live('click', function () {
        var total = 0;
        $.each($('.tanceng .after_order_create_package_child_chosen_list tr'), function (i, v) {
            total += parseFloat($('.tanceng .after_order_create_package_child_chosen_list tr').eq(i).find('.after_order_create_package_child_num_inp').val())
        });
        $('.tanceng .after_order_create_package_child_num_total').html(total);
        afterOrderNumTotalChange();
    });
    //新建售后单 - 删除配置子商品
    $('.tanceng .after_order_create_setting_child_chosen_list .after_order_product_del_btn').die('click').live('click', function () {
        var total = 0;
        $.each($('.tanceng .after_order_create_setting_child_chosen_list tr'), function (i, v) {
            total += parseFloat($('.tanceng .after_order_create_setting_child_chosen_list tr').eq(i).find('.after_order_create_setting_child_num_inp').val())
        });
        $('.tanceng .after_order_create_setting_child_num_total').html(total);
        afterOrderNumTotalChange();
    });
    //新建售后单 - 删除整条商品
    var afterOrderProductDelIndex = '';
    $('.tanceng .after_order_create_goods_box_del_btn').die('click').live('click', function () {
        afterOrderProductDelIndex = 0;
    });
    $('.tanceng .after_order_create_package_box_del_btn').die('click').live('click', function () {
        afterOrderProductDelIndex = 1;
    });
    $('.tanceng .after_order_create_setting_box_del_btn').die('click').live('click', function () {
        afterOrderProductDelIndex = 2;
    });
    $('.tanceng .xs_shd_delete').die('click').live('click', function () {
        $(".page_108_shdSP").children(".box_open_list").eq(afterOrderProductDelIndex).addClass("none");
        if (afterOrderProductDelIndex == 0) {
            $('.tanceng .after_order_create_goods_chosen_list').html('');
        }
        if (afterOrderProductDelIndex == 1) {
            $('.tanceng .after_order_create_package_parent_chosen_list').html('');
            $('.tanceng .after_order_create_package_child_chosen_list').html('');
        }
        if (afterOrderProductDelIndex == 2) {
            $('.tanceng .after_order_create_setting_parent_chosen_list').html('');
            $('.tanceng .after_order_create_setting_child_chosen_list').html('');
        }
        $(".page_108_shdSP .none .after_order_create_chosen_total").html("0");
        afterOrderProductChosenIndexArr.splice($.inArray(afterOrderProductDelIndex, afterOrderProductChosenIndexArr), 1);
        //总体判断
        if ($.inArray(0, afterOrderProductChosenIndexArr) == -1 && $.inArray(1, afterOrderProductChosenIndexArr) == -1 && $.inArray(2, afterOrderProductChosenIndexArr) == -1) {
            $(".page_108_shdSP").addClass("none");
            $(".tanceng .page108_newshd_box").width(620);
            $(".tanceng .page108_newshd_box .page108_new_inputBox").width('100%');
        }
        afterOrderNumTotalChange();
        $(this).closest('.dialog_box').remove();
    });
    //改变商品总数量
    function afterOrderNumTotalChange() {
        $('.tanceng .after_order_create_product_num_total').html(parseFloat($('.tanceng .after_order_create_goods_chosen_total').text()) + parseFloat($('.tanceng .after_order_create_package_child_num_total').text()) + parseFloat($('.tanceng .after_order_create_setting_child_num_total').text()));
    }

    //选择负责人
    $('.tanceng .ven_after_order_create_choose_owner_btn').die('click').live('click', function () {
        afterOrderChooseOwnerFn();
        //选择负责人
        $('.tanceng .person_left_nav').die('click').live('click', function () {
            //新建
            afterOrderCreateData.owner = $(this).attr('userinfoid');
            afterOrderCreateData.dept = $(this).closest('ul').prev('li.left_1').attr('cussortid');
            //编辑
            afterOrderEditData.owner = $(this).attr('userinfoid');
            afterOrderEditData.dept = $(this).closest('ul').prev('li.left_1').attr('cussortid');
        });
        //选择负责人确认
        $('.tanceng .after_order_create_choose_owner_save').die('click').live('click', function () {
            $('.tanceng .after_order_create_owner_inp').val($('.tanceng .list_check').closest('li').find('.list_msg').html()).css('color', '#333');
            $(this).closest('.dialog_box').remove();
        })
    });
    //负责人列表
    function afterOrderChooseOwnerFn() {
        $.ajax({
            url: SERVER_URL + '/dept/deptlist',
            type: 'GET',
            data: {
                token: token
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var datalist = oE.rows;
                    var deep = 0;
                    $('.tanceng .ven_after_order_create_owner_list').html(tree_list_person(datalist, deep));
                    //判断部门图标样式
                    $.each($('.tanceng .left_1'), function (i, v) {
                        if ($('.tanceng .left_1').eq(i).next('ul').children().length == 0) {
                            $('.tanceng .left_1').eq(i).children('span.icon_open').addClass('other')
                        }
                    });
                }
            }
        })
    }

    //选择售后类型
    $('.tanceng .after_order_create_service_type_ul li').die('click').live('click', function () {
        //新建
        afterOrderCreateData.service_type = $(this).index();
        //编辑
        afterOrderEditData.service_type = $(this).index();
    });
    //新建售后提交
    $('.tanceng .after_order_create_submit').die('click').live('click', function () {
        //售后单编号
        afterOrderCreateData.code_sn = $('.tanceng .after_order_create_code_sn').val();
        //销售订单
        if ($('.tanceng .ven_after_order_link_order_code_inp').val() == '请选择销售订单') {
            alert('请选择销售订单');
            return false;
        }
        //售后时间
        if ($('.tanceng .after_order_create_service_at').val() == '请选择日期' || $('.tanceng .after_order_create_service_at').val() == '') {
            alert('请选择售后时间');
            return false;
        } else {
            afterOrderCreateData.service_at = $('.tanceng .after_order_create_service_at').val()
        }
        //负责人
        if ($('.tanceng .after_order_create_owner_inp').val() == '请选择负责人') {
            alert('请选择负责人');
            return false;
        }
        //普通商品
        var afterOrderCreateDataProductArr = [];
        $.each($('.tanceng .after_order_create_goods_chosen_list tr'), function (i, v) {
            afterOrderCreateDataProductArr.push({
                good_name: $('.tanceng .after_order_create_goods_chosen_list').find('tr').eq(i).find('.after_order_goods_namespec').html(),
                good_code_sn: $('.tanceng .after_order_create_goods_chosen_list').find('tr').eq(i).find('.after_order_goods_codesn').html(),
                good_attribute: $('.tanceng .after_order_create_goods_chosen_list').find('tr').eq(i).find('.after_order_goods_attr').html(),
                unit: $('.tanceng .after_order_create_goods_chosen_list').find('tr').eq(i).find('.after_order_goods_unit').html(),
                good_sold_num: $('.tanceng .after_order_create_goods_chosen_list').find('tr').eq(i).find('.after_order_create_goods_num_max').html(),
                good_after_num: $('.tanceng .after_order_create_goods_chosen_list').find('tr').eq(i).find('.after_order_create_goods_num_change_inp').val(),
                note: $('.tanceng .after_order_create_goods_chosen_list').find('tr').eq(i).find('.after_order_goods_note').val()
            });
        });
        afterOrderCreateData.product = afterOrderCreateDataProductArr;
        //普通商品总数
        afterOrderCreateData.good_sum_num = $('.tanceng .after_order_create_goods_chosen_total').html();
        //套餐商品 - 父级
        var afterOrderCreateDataPackageArr = [];
        $.each($('.tanceng .after_order_create_package_parent_chosen_list tr'), function (i, v) {
            afterOrderCreateDataPackageArr.push({
                package_name: $('.tanceng .after_order_create_package_parent_chosen_list').find('tr').eq(i).find('.after_order_package_name').html(),
                package_code_sn: $('.tanceng .after_order_create_package_parent_chosen_list').find('tr').eq(i).find('.after_order_package_code_sn').html(),
                package_sold_num: $('.tanceng .after_order_create_package_parent_chosen_list').find('tr').eq(i).find('.after_order_create_package_parent_num_max').html(),
                package_after_num: $('.tanceng .after_order_create_package_parent_chosen_list').find('tr').eq(i).find('.after_order_create_package_parent_num_inp').val(),
                note: $('.tanceng .after_order_create_package_parent_chosen_list').find('tr').eq(i).find('.after_order_package_note').val()
            });
        });
        afterOrderCreateData.product_package = afterOrderCreateDataPackageArr;
        afterOrderCreateData.package_sum_num = $('.tanceng .after_order_create_package_parent_num_total').html();
        //套餐商品 - 子商品
        var afterOrderCreateDataPackageGoodsArr = [];
        $.each($('.tanceng .after_order_create_package_child_chosen_list tr'), function (i, v) {
            afterOrderCreateDataPackageGoodsArr.push({
                good_name: $('.tanceng .after_order_create_package_child_chosen_list').find('tr').eq(i).find('.after_order_package_good_name').html(),
                good_code_sn: $('.tanceng .after_order_create_package_child_chosen_list').find('tr').eq(i).find('.after_order_package_good_code_sn').html(),
                good_attribute: $('.tanceng .after_order_create_package_child_chosen_list').find('tr').eq(i).find('.after_order_create_package_good_attribute').html(),
                unit: $('.tanceng .after_order_create_package_child_chosen_list').find('tr').eq(i).find('.after_order_package_good_unit').html(),
                good_sold_num: $('.tanceng .after_order_create_package_child_chosen_list').find('tr').eq(i).find('.after_order_create_package_child_num_max').html(),
                good_after_num: $('.tanceng .after_order_create_package_child_chosen_list').find('tr').eq(i).find('.after_order_create_package_child_num_inp').val(),
                note: $('.tanceng .after_order_create_package_child_chosen_list').find('tr').eq(i).find('.after_order_package_good_note').val()
            });
        });
        afterOrderCreateData.package_goods = afterOrderCreateDataPackageGoodsArr;
        afterOrderCreateData.package_in_sum_num = $('.tanceng .after_order_create_package_child_num_total').html();
        //配置商品 - 父级
        var afterOrderCreateDataSettingArr = [];
        $.each($('.tanceng .after_order_create_setting_parent_chosen_list tr'), function (i, v) {
            afterOrderCreateDataSettingArr.push({
                setting_name: $('.tanceng .after_order_create_setting_parent_chosen_list').find('tr').eq(i).find('.after_order_setting_name').html(),
                setting_code_sn: $('.tanceng .after_order_create_setting_parent_chosen_list').find('tr').eq(i).find('.after_order_setting_code_sn').html(),
                setting_unit: $('.tanceng .after_order_create_setting_parent_chosen_list').find('tr').eq(i).find('.after_order_setting_unit').html(),
                setting_sold_num: $('.tanceng .after_order_create_setting_parent_chosen_list').find('tr').eq(i).find('.after_order_create_setting_parent_num_max').html(),
                setting_after_num: $('.tanceng .after_order_create_setting_parent_chosen_list').find('tr').eq(i).find('.after_order_create_setting_parent_num_inp').val(),
                note: $('.tanceng .after_order_create_setting_parent_chosen_list').find('tr').eq(i).find('.after_order_setting_note').val()
            });
        });
        afterOrderCreateData.product_setting = afterOrderCreateDataSettingArr;
        afterOrderCreateData.setting_sum_num = $('.tanceng .after_order_create_setting_parent_num_total').html();
        //配置商品 - 子商品
        var afterOrderCreateDataSettingGoodsArr = [];
        $.each($('.tanceng .after_order_create_setting_child_chosen_list tr'), function (i, v) {
            afterOrderCreateDataSettingGoodsArr.push({
                good_name: $('.tanceng .after_order_create_setting_child_chosen_list').find('tr').eq(i).find('.after_order_setting_good_name').html(),
                good_code_sn: $('.tanceng .after_order_create_setting_child_chosen_list').find('tr').eq(i).find('.after_order_setting_good_code_sn').html(),
                good_attribute: $('.tanceng .after_order_create_setting_child_chosen_list').find('tr').eq(i).find('.after_order_create_setting_good_attribute').html(),
                unit: $('.tanceng .after_order_create_setting_child_chosen_list').find('tr').eq(i).find('.after_order_setting_good_unit').html(),
                good_sold_num: $('.tanceng .after_order_create_setting_child_chosen_list').find('tr').eq(i).find('.after_order_create_setting_child_num_max').html(),
                good_after_num: $('.tanceng .after_order_create_setting_child_chosen_list').find('tr').eq(i).find('.after_order_create_setting_child_num_inp').val(),
                note: $('.tanceng .after_order_create_setting_child_chosen_list').find('tr').eq(i).find('.after_order_setting_good_note').val()
            });
        });
        afterOrderCreateData.setting_goods = afterOrderCreateDataSettingGoodsArr;
        afterOrderCreateData.setting_in_sum_num = $('.tanceng .after_order_create_setting_child_num_total').html();
        //商品总数量
        afterOrderCreateData.good_total_num = $('.tanceng .after_order_create_product_num_total').html();
        //备注
        if ($('.tanceng .after_order_create_note_textarea').val() == '请输入备注') {
            afterOrderCreateData.note = '';
        } else {
            afterOrderCreateData.note = $('.tanceng .after_order_create_note_textarea').val();
        }
        console.log(afterOrderCreateData);
        $.ajax({
            url: SERVER_URL + '/afterorder/add',
            type: 'POST',
            data: afterOrderCreateData,
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                if (oE.code == 0) {
                    $(this).closest('.dialog_box').remove();
                    $('.tanceng').css('display', 'none');
                    getAfterOrderList();
                }
            }
        })
    });

    //编辑售后
    $('.ven_after_order_edit_btn').die('click').live('click', function () {
        venAfterOrderCurrentId = $(this).closest('tr').attr('afterorderid');
        afterOrderEditData.afterorder_id = venAfterOrderCurrentId;
        afterOrderProductChosenIndexArr = [];
        $.ajax({
            url: SERVER_URL + '/afterorder/info',
            type: 'GET',
            data: {
                token: token,
                afterorder_id: venAfterOrderCurrentId
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var data = oE.data;
                    console.log(data);
                    afterOrderLinkQuoteid = data['quote_id'];
                    //客户名称
                    $('.tanceng .ven_after_order_create_custom_name').val(likNullData(data['name']));
                    afterOrderEditData.customer_id = data['customer_id'];
                    //创建日期
                    $('.tanceng .ven_after_order_edit_create_at').html(likNullData(data['created_at']));
                    //创建人
                    $('.tanceng .ven_after_order_edit_uname').html(likNullData(data['uname']));
                    //售后单编号
                    $('.tanceng .after_order_create_code_sn').val(likNullData(data['code_sn']));
                    afterOrderEditData.code_sn = data['code_sn'];
                    //销售订单编号
                    $('.tanceng .ven_after_order_link_order_code_inp').val(likNullData(data['order_code_sn']));
                    afterOrderEditData.order_id = data['order_id'];
                    //负责人
                    $('.tanceng .after_order_create_owner_inp').val(likNullData(data['owner_name']));
                    afterOrderEditData.dept = data['dept'];
                    afterOrderEditData.owner = data['owner'];
                    //售后时间
                    $('.tanceng .after_order_create_service_at').val(likNullData(data['service_at']));
                    afterOrderEditData.service_at = data['service_at'];
                    //售后类型
                    $('.tanceng .ven_after_order_edit_service_name').val(likNullData(data['service_name']));
                    afterOrderEditData.service_type = data['service_type'];
                    //客户联系人
                    $('.tanceng .ven_after_order_edit_contacts').val(likNullData(data['contacts']));
                    afterOrderEditData.contacts = data['contacts'];
                    //联系人电话
                    $('.tanceng .ven_after_order_edit_tel').val(likNullData(data['tel']));
                    afterOrderEditData.tel = data['tel'];
                    //售后商品信息

                    //普通商品
                    var detailGoodsArr = [];
                    var detailGoodsHtml = '';
                    if (data['product_json'] && data['product_json']['product']) {
                        afterOrderProductChosenIndexArr.push(0);
                        detailGoodsArr = data['product_json']['product'];
                        $.each(detailGoodsArr, function (i, v) {
                            detailGoodsHtml += '<tr>\
                                                <td>' + l_dbl(i + 1) + '</td>\
                                                <td><span class="after_order_goods_namespec">' + v['good_name'] + '</span><button class="but_mix but_blue val_dialogTop after_order_choose_product_btn" name="xs_shd_choose">选择商品</button></td>\
                                                <td class="after_order_goods_codesn">' + v['good_code_sn'] + '</td>\
                                                <td class="after_order_goods_attr">' + v['good_attribute'] + '</td>\
                                            <td class="after_order_goods_unit">' + v['unit'] + '</td>\
                                            <td class="after_order_create_goods_num_max">' + v['good_sold_num'] + '</td>\
                                            <td>\
                                            <div class="num_input inline_block num_input_new"><button class="but_blue but_opa_small inp_plus after_order_create_goods_num_change_btn">+</button><input class="after_order_create_goods_num_change_inp" type="text" value="' + v['good_after_num'] + '"/><button class="but_blue but_opa_small radius_left_0 inp_reduce after_order_create_goods_num_change_btn">-</button></div>\
                                                </td>\
                                                <td style="min-width:350px;">\
                                                <div>\
                                                <div class="t_textinput inline_block" style="margin:0;">\
                                                <div class="t_right" style="margin-left:0;width: 100%;"><input type="text" class="time_input after_order_goods_note" value="' + v['note'] + '" onfocus="fn_focus(this);" onblur="fn_blur(this);" style="color: rgb(153, 153, 153);">\
                                                </div>\
                                                </div>\
                                                <div class="t_textinput inline_block xs_shd_imgBox" style="margin:0;">\
                                                </div>\
                                                </div>\
                                                </td>\
                                            </tr>';
                        });
                        $('.tanceng .after_order_create_goods_chosen_list').html(detailGoodsHtml);
                        //商品售后数量
                        $('.tanceng .after_order_create_goods_chosen_total').html(data['product_json']['good_sum_num']);
                        //数量控制
                        $('.tanceng .after_order_create_goods_num_change_btn').die('click').live('click', function () {
                            if ($(this).closest('tr').find('.after_order_create_goods_num_change_inp').val() >= $(this).closest('tr').find('.after_order_create_goods_num_max').text()) {
                                $(this).closest('tr').find('.after_order_create_goods_num_change_inp').val($(this).closest('tr').find('.after_order_create_goods_num_max').text())
                            }
                            var afterOrderChooseGoodsTotal = 0;
                            $.each($('.tanceng .after_order_create_goods_chosen_list tr'), function (i, v) {
                                afterOrderChooseGoodsTotal += parseFloat($('.tanceng .after_order_create_goods_chosen_list tr').eq(i).find('.after_order_create_goods_num_change_inp').val());
                            });
                            $('.tanceng .after_order_create_goods_chosen_total').html(afterOrderChooseGoodsTotal);
                            afterOrderNumTotalChange();
                        });
                        $('.tanceng .ven_after_order_detail_box_list').children('div.box_open_list').eq(0).removeClass('none');
                    } else {
                        $('.tanceng .ven_after_order_detail_box_list').children('div.box_open_list').eq(0).addClass('none');
                    }
                    //套餐商品
                    var detailPackageParentArr = [];
                    var detailPackageParentHtml = '';
                    if (data['product_json'] && data['product_json']['product_package']) {
                        afterOrderProductChosenIndexArr.push(1);
                        detailPackageParentArr = data['product_json']['product_package'];
                        $.each(detailPackageParentArr, function (i, v) {
                            detailPackageParentHtml += '<tr>\
                                                <td><span class="after_order_package_name">' + v['package_name'] + '</span><button class="but_small but_yellow val_dialogTop after_order_choose_product_btn" name="xs_shd_choose">修改套餐商品</button></td>\
                                                <td class="after_order_package_code_sn">' + v['package_code_sn'] + '</td>\
                                                <td class="after_order_create_package_parent_num_max">' + v['package_sold_num'] + '</td>\
                                                <td>\
                                                <div class="num_input inline_block num_input_new"><button class="but_blue but_opa_small inp_plus after_order_create_package_parent_num_change">+</button><input class="after_order_create_package_parent_num_inp" type="text" value="' + v['package_after_num'] + '"><button class="but_blue but_opa_small radius_left_0 inp_reduce after_order_create_package_parent_num_change">-</button></div>\
                                                </td>\
                                                <td style="min-width: 240px;">\
                                                <div>\
                                                <div class="t_textinput inline_block" style="margin:0;">\
                                                <div class="t_right" style="margin-left:0;width: 100%;"><input type="text" class="time_input after_order_package_note" value="' + v['note'] + '" onfocus="fn_focus(this);" onblur="fn_blur(this);" style="color: rgb(153, 153, 153);">\
                                                </div>\
                                                </div>\
                                                <div class="t_textinput inline_block xs_shd_imgBox" style="margin:0;">\
                                                </div>\
                                                </div>\
                                                </td>\
                                              </tr>';
                        });
                        $('.tanceng .after_order_create_package_parent_chosen_list').html(detailPackageParentHtml);
                        //商品售后数量
                        $('.tanceng .after_order_create_package_parent_num_total').html(data['product_json']['package_sum_num']);
                        $('.tanceng .after_order_create_package_parent_num_change').die('click').live('click', function () {
                            if ($(this).siblings('.after_order_create_package_parent_num_inp').val() >= $(this).closest('tr').find('.after_order_create_package_parent_num_max').text()) {
                                $(this).siblings('.after_order_create_package_parent_num_inp').val($(this).closest('tr').find('.after_order_create_package_parent_num_max').text());
                            }
                            var total = 0;
                            var $_this = $(this);
                            $.each($_this.closest('tbody').find('tr'), function (i, v) {
                                total += parseFloat($_this.closest('tbody').find('tr').eq(i).find('.after_order_create_package_parent_num_inp').val());
                            });
                            $('.tanceng .after_order_create_package_parent_num_total').html(total);
                        });
                        $('.tanceng .ven_after_order_detail_box_list').children('div.box_open_list').eq(1).removeClass('none');
                    } else {
                        $('.tanceng .ven_after_order_detail_box_list').children('div.box_open_list').eq(1).addClass('none');
                    }
                    //套餐子商品
                    var detailPackageChildArr = [];
                    var detailPackageChildHtml = '';
                    if (data['product_json'] && data['product_json']['package_goods']) {
                        detailPackageChildArr = data['product_json']['package_goods'];
                        $.each(detailPackageChildArr, function (i, v) {
                            detailPackageChildHtml += '<tr>\
                                                <td>' + l_dbl(i + 1) + '</td>\
                                                <td class="after_order_package_good_name">' + v['good_name'] + '</td>\
                                                <td class="after_order_package_good_code_sn">' + v['good_code_sn'] + '</td>\
                                                <td class="after_order_create_package_good_attribute">' + v['good_attribute'] + '</td>\
                                            <td class="after_order_package_good_unit">' + v['unit'] + '</td>\
                                            <td class="after_order_create_package_child_num_max">' + v['good_sold_num'] + '</td>\
                                            <td>\
                                            <div class="num_input inline_block num_input_new"><button class="but_blue but_opa_small inp_plus after_order_create_package_child_num_change">+</button><input class="after_order_create_package_child_num_inp" type="text" value="' + v['good_after_num'] + '"/><button class="but_blue but_opa_small radius_left_0 inp_reduce after_order_create_package_child_num_change">-</button></div>\
                                                </td><td style="min-width:280px;">\
                                                <div>\
                                                <div class="t_textinput inline_block" style="margin:0;">\
                                                <div class="t_right" style="margin-left:0;width: 100%;"><input type="text" class="time_input after_order_package_good_note" value="' + v['note'] + '" onfocus="fn_focus(this);" onblur="fn_blur(this);" style="color: rgb(153, 153, 153);">\
                                                </div>\
                                                </div>\
                                                <div class="t_textinput inline_block xs_shd_imgBox" style="margin:0;"><ul class="xs_shd_scImg clearfix inline_block"></ul>\
                                                </div>\
                                                </div>\
                                                </td>\
                                                <td class="xs_butbox">\
                                                <button class="but_blue but_opa_small but_red after_order_product_del_btn">-</button>\
                                                </td>\
                                                </tr>';
                        });
                        $('.tanceng .after_order_create_package_child_chosen_list').html(detailPackageChildHtml);
                        //商品售后数量
                        $('.tanceng .after_order_create_package_child_num_total').html(data['product_json']['package_in_sum_num'])
                        $('.tanceng .after_order_create_package_child_num_change').die('click').live('click', function () {
                            if ($(this).siblings('.after_order_create_package_child_num_inp').val() >= $(this).closest('tr').find('.after_order_create_package_child_num_max').text()) {
                                $(this).siblings('.after_order_create_package_child_num_inp').val($(this).closest('tr').find('.after_order_create_package_child_num_max').text());
                            }
                            var total = 0;
                            var $_this = $(this);
                            $.each($_this.closest('tbody').find('tr'), function (i, v) {
                                total += parseFloat($_this.closest('tbody').find('tr').eq(i).find('.after_order_create_package_child_num_inp').val());
                            });
                            $('.tanceng .after_order_create_package_child_num_total').html(total);
                            afterOrderNumTotalChange();
                        });
                    }
                    //配置商品
                    var detailSettingParengArr = [];
                    var detailSettingParengHtml = '';
                    if (data['product_json'] && data['product_json']['product_setting']) {
                        afterOrderProductChosenIndexArr.push(2);
                        detailSettingParengArr = data['product_json']['product_setting'];
                        $.each(detailSettingParengArr, function (i, v) {
                            detailSettingParengHtml += '<tr>\
                <td><span class="after_order_setting_name">' + v['setting_name'] + '</span><button class="but_small but_yellow val_dialogTop after_order_choose_product_btn" name="xs_shd_choose">修改配置商品</button></td>\
                <td class="after_order_setting_code_sn">' + v['setting_code_sn'] + '</td>\
                <td class="after_order_setting_unit">' + v['setting_unit'] + '</td>\
                <td class="after_order_create_setting_parent_num_max">' + v['setting_sold_num'] + '</td>\
                <td>\
                <div class="num_input inline_block num_input_new"><button class="but_blue but_opa_small inp_plus after_order_create_setting_parent_num_change">+</button><input class="after_order_create_setting_parent_num_inp" type="text" value="' + v['setting_after_num'] + '"><button class="but_blue but_opa_small radius_left_0 inp_reduce after_order_create_setting_parent_num_change">-</button></div>\
                </td>\
                <td>\
                <div>\
                <div class="t_textinput inline_block" style="margin:0;">\
                <div class="t_right" style="margin-left:0;width: 100%;"><input type="text" class="time_input after_order_setting_note" value="' + v['note'] + '" onfocus="fn_focus(this);" onblur="fn_blur(this);" style="color: rgb(153, 153, 153);">\
                </div>\
                </div>\
                <div class="t_textinput inline_block xs_shd_imgBox" style="margin:0;">\
                </div>\
                </div>\
                </td>\
                </tr>';
                        });
                        $('.tanceng .after_order_create_setting_parent_chosen_list').html(detailSettingParengHtml);
                        $('.tanceng .after_order_create_setting_parent_num_total').html(data['product_json']['setting_sum_num']);
                        $('.tanceng .after_order_create_setting_parent_num_change').die('click').live('click', function () {
                            if ($(this).siblings('.after_order_create_setting_parent_num_inp').val() >= $(this).closest('tr').find('.after_order_create_setting_parent_num_max').text()) {
                                $(this).siblings('.after_order_create_setting_parent_num_inp').val($(this).closest('tr').find('.after_order_create_setting_parent_num_max').text());
                            }
                            var total = 0;
                            var $_this = $(this);
                            $.each($_this.closest('tbody').find('tr'), function (i, v) {
                                total += parseFloat($_this.closest('tbody').find('tr').eq(i).find('.after_order_create_setting_parent_num_inp').val());
                            });
                            $('.tanceng .after_order_create_setting_parent_num_total').html(total);
                        });
                        $('.tanceng .ven_after_order_detail_box_list').children('div.box_open_list').eq(2).removeClass('none');
                    } else {
                        $('.tanceng .ven_after_order_detail_box_list').children('div.box_open_list').eq(2).addClass('none');
                    }
                    //配置子商品
                    var detailSettingChildArr = [];
                    var detailSettingChildHtml = '';
                    if (data['product_json'] && data['product_json']['setting_goods']) {
                        detailSettingChildArr = data['product_json']['setting_goods'];
                        $.each(detailSettingChildArr, function (i, v) {
                            detailSettingChildHtml += '<tr>\
                                                <td>' + l_dbl(i + 1) + '</td>\
                                                <td class="after_order_setting_good_name">' + v['good_name'] + '</td>\
                                                <td class="after_order_setting_good_code_sn">' + v['good_code_sn'] + '</td>\
                                                <td class="after_order_create_setting_good_attribute">' + v['good_attribute'] + '</td>\
                                            <td class="after_order_setting_good_unit">' + v['unit'] + '</td>\
                                            <td class="after_order_create_setting_child_num_max">' + v['good_sold_num'] + '</td>\
                                            <td>\
                                            <div class="num_input inline_block num_input_new"><button class="but_blue but_opa_small inp_plus after_order_create_setting_child_num_change">+</button><input class="after_order_create_setting_child_num_inp" type="text" value="' + v['good_after_num'] + '"/><button class="but_blue but_opa_small radius_left_0 inp_reduce after_order_create_setting_child_num_change">-</button></div>\
                                                </td>\
                                                <td style="min-width:350px;">\
                                                <div>\
                                                <div class="t_textinput inline_block" style="margin:0;">\
                                                <div class="t_right" style="margin-left:0;width: 100%;"><input type="text" class="time_input after_order_setting_good_note" value="' + v['note'] + '" onfocus="fn_focus(this);" onblur="fn_blur(this);" style="color: rgb(153, 153, 153);">\
                                                </div>\
                                                <div class="t_textinput inline_block xs_shd_imgBox" style="margin:0;">\
                                                </div>\
                                                </div>\
                                                </td>\
                                                <td class="xs_butbox">\
                                                <button class="but_blue but_opa_small but_red after_order_product_del_btn">-</button>\
                                                </td>\
                                             </tr>';
                        });
                        $('.tanceng .after_order_create_setting_child_chosen_list').html(detailSettingChildHtml);
                        //商品售后数量
                        $('.tanceng .after_order_create_setting_child_num_total').html(data['product_json']['setting_in_sum_num'])
                        $('.tanceng .after_order_create_setting_child_num_change').die('click').live('click', function () {
                            if ($(this).siblings('.after_order_create_setting_child_num_inp').val() >= $(this).closest('tr').find('.after_order_create_setting_child_num_max').text()) {
                                $(this).siblings('.after_order_create_setting_child_num_inp').val($(this).closest('tr').find('.after_order_create_setting_child_num_max').text());
                            }
                            var total = 0;
                            var $_this = $(this);
                            $.each($_this.closest('tbody').find('tr'), function (i, v) {
                                total += parseFloat($_this.closest('tbody').find('tr').eq(i).find('.after_order_create_setting_child_num_inp').val());
                            });
                            $('.tanceng .after_order_create_setting_child_num_total').html(total);
                            afterOrderNumTotalChange();
                        });
                    }
                    if ($('.tanceng .ven_after_order_detail_box_list').children('.none').length == 3) {
                        $('.tanceng .ven_after_order_detail_box_list').addClass('none');
                    } else {
                        $('.tanceng .ven_after_order_detail_box_list').removeClass('none');
                    }
                    //备注
                    $('.tanceng .after_order_create_note_textarea').html(likNullData(data['product_json']['note']));
                    //总计商品数量
                    $('.tanceng .after_order_create_product_num_total').html(likNullData(data['product_json']['good_total_num']));
                    //分配售后人员
                    /*if (data['status'] == 0) {
                     $('.ven_after_order_typea_look_fpshd').css('display', 'block');
                     } else {
                     $('.ven_after_order_typea_look_fpshd').css('display', 'none');
                     }*/
                } else {
                    alert('操作失败')
                }
            }
        });
    });

    //编辑售后 - 提交
    $('.tanceng .after_order_edit_submit').die('click').live('click', function () {
        afterOrderEditData.service_at = $('.tanceng .after_order_create_service_at').val();
        //普通商品
        var afterOrderEditDataProductArr = [];
        $.each($('.tanceng .after_order_create_goods_chosen_list tr'), function (i, v) {
            afterOrderEditDataProductArr.push({
                good_name: $('.tanceng .after_order_create_goods_chosen_list').find('tr').eq(i).find('.after_order_goods_namespec').html(),
                good_code_sn: $('.tanceng .after_order_create_goods_chosen_list').find('tr').eq(i).find('.after_order_goods_codesn').html(),
                good_attribute: $('.tanceng .after_order_create_goods_chosen_list').find('tr').eq(i).find('.after_order_goods_attr').html(),
                unit: $('.tanceng .after_order_create_goods_chosen_list').find('tr').eq(i).find('.after_order_goods_unit').html(),
                good_sold_num: $('.tanceng .after_order_create_goods_chosen_list').find('tr').eq(i).find('.after_order_create_goods_num_max').html(),
                good_after_num: $('.tanceng .after_order_create_goods_chosen_list').find('tr').eq(i).find('.after_order_create_goods_num_change_inp').val(),
                note: $('.tanceng .after_order_create_goods_chosen_list').find('tr').eq(i).find('.after_order_goods_note').val()
            });
        });
        afterOrderEditData.product = afterOrderEditDataProductArr;
        //普通商品总数
        afterOrderEditData.good_sum_num = $('.tanceng .after_order_create_goods_chosen_total').html();
        //套餐商品 - 父级
        var afterOrderEditDataPackageArr = [];
        $.each($('.tanceng .after_order_create_package_parent_chosen_list tr'), function (i, v) {
            afterOrderEditDataPackageArr.push({
                package_name: $('.tanceng .after_order_create_package_parent_chosen_list').find('tr').eq(i).find('.after_order_package_name').html(),
                package_code_sn: $('.tanceng .after_order_create_package_parent_chosen_list').find('tr').eq(i).find('.after_order_package_code_sn').html(),
                package_sold_num: $('.tanceng .after_order_create_package_parent_chosen_list').find('tr').eq(i).find('.after_order_create_package_parent_num_max').html(),
                package_after_num: $('.tanceng .after_order_create_package_parent_chosen_list').find('tr').eq(i).find('.after_order_create_package_parent_num_inp').val(),
                note: $('.tanceng .after_order_create_package_parent_chosen_list').find('tr').eq(i).find('.after_order_package_note').val()
            });
        });
        afterOrderEditData.product_package = afterOrderEditDataPackageArr;
        afterOrderEditData.package_sum_num = $('.tanceng .after_order_create_package_parent_num_total').html();
        //套餐商品 - 子商品
        var afterOrderEditDataPackageGoodsArr = [];
        $.each($('.tanceng .after_order_create_package_child_chosen_list tr'), function (i, v) {
            afterOrderEditDataPackageGoodsArr.push({
                good_name: $('.tanceng .after_order_create_package_child_chosen_list').find('tr').eq(i).find('.after_order_package_good_name').html(),
                good_code_sn: $('.tanceng .after_order_create_package_child_chosen_list').find('tr').eq(i).find('.after_order_package_good_code_sn').html(),
                good_attribute: $('.tanceng .after_order_create_package_child_chosen_list').find('tr').eq(i).find('.after_order_create_package_good_attribute').html(),
                unit: $('.tanceng .after_order_create_package_child_chosen_list').find('tr').eq(i).find('.after_order_package_good_unit').html(),
                good_sold_num: $('.tanceng .after_order_create_package_child_chosen_list').find('tr').eq(i).find('.after_order_create_package_child_num_max').html(),
                good_after_num: $('.tanceng .after_order_create_package_child_chosen_list').find('tr').eq(i).find('.after_order_create_package_child_num_inp').val(),
                note: $('.tanceng .after_order_create_package_child_chosen_list').find('tr').eq(i).find('.after_order_package_good_note').val()
            });
        });
        afterOrderEditData.package_goods = afterOrderEditDataPackageGoodsArr;
        afterOrderEditData.package_in_sum_num = $('.tanceng .after_order_create_package_child_num_total').html();
        //配置商品 - 父级
        var afterOrderEditDataSettingArr = [];
        $.each($('.tanceng .after_order_create_setting_parent_chosen_list tr'), function (i, v) {
            afterOrderEditDataSettingArr.push({
                setting_name: $('.tanceng .after_order_create_setting_parent_chosen_list').find('tr').eq(i).find('.after_order_setting_name').html(),
                setting_code_sn: $('.tanceng .after_order_create_setting_parent_chosen_list').find('tr').eq(i).find('.after_order_setting_code_sn').html(),
                setting_unit: $('.tanceng .after_order_create_setting_parent_chosen_list').find('tr').eq(i).find('.after_order_setting_unit').html(),
                setting_sold_num: $('.tanceng .after_order_create_setting_parent_chosen_list').find('tr').eq(i).find('.after_order_create_setting_parent_num_max').html(),
                setting_after_num: $('.tanceng .after_order_create_setting_parent_chosen_list').find('tr').eq(i).find('.after_order_create_setting_parent_num_inp').val(),
                note: $('.tanceng .after_order_create_setting_parent_chosen_list').find('tr').eq(i).find('.after_order_setting_note').val()
            });
        });
        afterOrderEditData.product_setting = afterOrderEditDataSettingArr;
        afterOrderEditData.setting_sum_num = $('.tanceng .after_order_create_setting_parent_num_total').html();
        //配置商品 - 子商品
        var afterOrderEditDataSettingGoodsArr = [];
        $.each($('.tanceng .after_order_create_setting_child_chosen_list tr'), function (i, v) {
            afterOrderEditDataSettingGoodsArr.push({
                good_name: $('.tanceng .after_order_create_setting_child_chosen_list').find('tr').eq(i).find('.after_order_setting_good_name').html(),
                good_code_sn: $('.tanceng .after_order_create_setting_child_chosen_list').find('tr').eq(i).find('.after_order_setting_good_code_sn').html(),
                good_attribute: $('.tanceng .after_order_create_setting_child_chosen_list').find('tr').eq(i).find('.after_order_create_setting_good_attribute').html(),
                unit: $('.tanceng .after_order_create_setting_child_chosen_list').find('tr').eq(i).find('.after_order_setting_good_unit').html(),
                good_sold_num: $('.tanceng .after_order_create_setting_child_chosen_list').find('tr').eq(i).find('.after_order_create_setting_child_num_max').html(),
                good_after_num: $('.tanceng .after_order_create_setting_child_chosen_list').find('tr').eq(i).find('.after_order_create_setting_child_num_inp').val(),
                note: $('.tanceng .after_order_create_setting_child_chosen_list').find('tr').eq(i).find('.after_order_setting_good_note').val()
            });
        });
        afterOrderEditData.setting_goods = afterOrderEditDataSettingGoodsArr;
        afterOrderEditData.setting_in_sum_num = $('.tanceng .after_order_create_setting_child_num_total').html();
        //商品总数量
        afterOrderEditData.good_total_num = $('.tanceng .after_order_create_product_num_total').html();
        //备注
        if ($('.tanceng .after_order_create_note_textarea').val() == '请输入备注') {
            afterOrderEditData.note = '';
        } else {
            afterOrderEditData.note = $('.tanceng .after_order_create_note_textarea').val();
        }
        console.log(afterOrderEditData);
        $.ajax({
            url: SERVER_URL + '/afterorder/add',
            type: 'POST',
            data: afterOrderEditData,
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                if (oE.code == 0) {
                    $(this).closest('.dialog_box').remove();
                    $('.tanceng').css('display', 'none');
                    getAfterOrderList();
                }
            }
        })
    });

    //自动分配时长设置
    var afterOrderSettimeData = {
        token: token,
        afterorder_interval: '',     //售后提醒时间间隔，分钟
        afterorder_allot: '',        //重新分配时隔
        after_auto_set: 0,           //开启自动分配,0否，1是
        after_auto_num: ''            //少于几单会自动分配
    };
    //开启自动分配
    $('.tanceng .after_order_setting_checkbox').die('click').live('click', function () {
        if ($(this).attr('checked') == 'checked') {
            $('.tanceng .after_order_setting_zdfp_inp').attr('disabled', null)
        } else {
            $('.tanceng .after_order_setting_zdfp_inp').attr('disabled', 'disabled')
        }
    });
    //设置提交
    $('.tanceng .after_order_setting_submit').die('click').live('click', function () {
        if ($('.tanceng .after_order_setting_txsg').val() == '') {
            alert('请输入提醒时隔');
            return false;
        } else {
            afterOrderSettimeData.afterorder_interval = $('.tanceng .after_order_setting_txsg').val();
        }
        if ($('.tanceng .after_order_setting_cxfpsg').val() == '') {
            alert('请输入重新分配时隔');
            return false;
        } else {
            afterOrderSettimeData.afterorder_allot = $('.tanceng .after_order_setting_cxfpsg').val();
        }
        if ($('.tanceng .after_order_setting_checkbox').attr('checked') == 'checked') {
            afterOrderSettimeData.after_auto_set = 1;
            afterOrderSettimeData.after_auto_num = $('.tanceng .after_order_setting_zdfp_inp').val();
        } else {
            afterOrderSettimeData.after_auto_set = 0;
            afterOrderSettimeData.after_auto_num = '';
        }
        $.ajax({
            url: SERVER_URL + '/afterorder/settime',
            type: 'POST',
            data: afterOrderSettimeData,
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    $(this).closest('.dialog_box').remove();
                    $('.tanceng').css('display', 'none');
                }
            }
        })
    });

    //添加售后记录
    $('#ven_after_order_record_add_btn').die('click').live('click', function () {
        $.ajax({
            url: SERVER_URL + '/afterorder/info',
            type: 'GET',
            data: {
                token: token,
                afterorder_id: venAfterOrderCurrentId
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var data = oE.data;
                    console.log(data);
                    afterOrderLinkQuoteid = data['quote_id'];
                    //售后商品信息
                    //普通商品
                    var detailGoodsArr = [];
                    var detailGoodsHtml = '';
                    if (data['product_json'] && data['product_json']['product']) {
                        afterOrderProductChosenIndexArr.push(0);
                        detailGoodsArr = data['product_json']['product'];
                        $.each(detailGoodsArr, function (i, v) {
                            detailGoodsHtml += '<tr>\
                                <td>' + l_dbl(i + 1) + '</td>\
                                <td>' + v['good_name'] + '</td>\
                            <td>' + v['good_code_sn'] + '</td>\
                            <td>' + v['good_code_sn'] + '</td>\
                            <td>' + v['unit'] + '</td>\
                            <td>' + v['good_after_num'] + '</td>\
                            <td><span>' + v['note'] + '</span></td>\
                                <td>0</td>\
                                <td><div class="t_textinput xs_shd_clhInp" style="margin:0;">\
                                <div class="t_right relative" style="margin-left:0;width: 100%;"><input type="text" class="time_input" value="" onfocus="fn_focus(this);" onblur="fn_blur(this);" style="color: rgb(153, 153, 153);">\
                                <i class="xs_search val_dialogTop" name="xs_shd_search_ok"></i>\
                                </div>\
                                </div></td>\
                                <td><span class="c_r">未解决</span></td>\
                                <td><button class="but_green val_dialogTop" name="xs_shd_shjg">标记完成</button></td>\
                                </tr>';
                        });
                        $('.tanceng .after_order_record_create_goods_list').html(detailGoodsHtml);
                        //商品售后数量
                        $('.tanceng .after_order_record_create_goods_total').html(data['product_json']['good_sum_num']);
                        $('.tanceng .ven_after_order_detail_box_list').children('div.box_open_list').eq(0).removeClass('none');
                    } else {
                        $('.tanceng .ven_after_order_detail_box_list').children('div.box_open_list').eq(0).addClass('none');
                    }
                    //套餐商品
                    var detailPackageParentArr = [];
                    var detailPackageParentHtml = '';
                    if (data['product_json'] && data['product_json']['product_package']) {
                        afterOrderProductChosenIndexArr.push(1);
                        detailPackageParentArr = data['product_json']['product_package'];
                        $.each(detailPackageParentArr, function (i, v) {
                            detailPackageParentHtml += '<tr>\
                                                        <td>' + v['package_name'] + '</td>\
                                                        <td>' + v['package_code_sn'] + '</td>\
                                                        <td>' + v['package_after_num'] + '</td>\
                                                        <td>' + v['note'] + '</td>\
                                                        </tr>';
                        });
                        $('.tanceng .after_order_record_create_package_parent_list').html(detailPackageParentHtml);
                        //商品售后数量
                        $('.tanceng .after_order_record_create_package_parent_num_total').html(data['product_json']['package_sum_num']);
                    } else {
                        $('.tanceng .ven_after_order_detail_box_list').children('div.box_open_list').eq(1).addClass('none');
                    }
                    //套餐子商品
                    var detailPackageChildArr = [];
                    var detailPackageChildHtml = '';
                    if (data['product_json'] && data['product_json']['package_goods']) {
                        detailPackageChildArr = data['product_json']['package_goods'];
                        $.each(detailPackageChildArr, function (i, v) {
                            detailPackageChildHtml += '<tr>\
                                <td>' + l_dbl(i + 1) + '</td>\
                                <td>' + v['good_name'] + '</td>\
                                <td>' + v['good_code_sn'] + '</td>\
                                <td>' + v['good_attribute'] + '</td>\
                                <td>' + v['unit'] + '</td>\
                                <td>' + v['good_after_num'] + '</td>\
                                <td><span>' + v['note'] + '</span></td>\
                                <td>0</td>\
                                <td><div class="t_textinput xs_shd_clhInp" style="margin:0;">\
                                <div class="t_right relative" style="margin-left:0;width: 100%;"><input type="text" class="time_input" value="" onfocus="fn_focus(this);" onblur="fn_blur(this);" style="color: rgb(153, 153, 153);">\
                                <i class="xs_search val_dialogTop" name="xs_shd_search_no"></i>\
                                </div>\
                                </div></td>\
                                <td><span class="c_r">未解决</span></td>\
                                <td><button class="but_green val_dialogTop" name="xs_shd_shjg">标记完成</button></td>\
                                </tr>';
                        });
                        $('.tanceng .after_order_record_create_package_child_list').html(detailPackageChildHtml);
                        //商品售后数量
                        $('.tanceng .after_order_record_create_package_child_num_total').html(data['product_json']['package_in_sum_num']);
                    }
                    //配置商品
                    var detailSettingParengArr = [];
                    var detailSettingParengHtml = '';
                    if (data['product_json'] && data['product_json']['product_setting']) {
                        afterOrderProductChosenIndexArr.push(2);
                        detailSettingParengArr = data['product_json']['product_setting'];
                        $.each(detailSettingParengArr, function (i, v) {
                            detailSettingParengHtml += '<tr>\
                                <td>' + v['setting_name'] + '</td>\
                                <td>' + v['setting_code_sn'] + '</td>\
                                <td>' + v['setting_unit'] + '</td>\
                                <td>' + v['setting_after_num'] + '</td>\
                                <td>' + v['note'] + '</td>\
                                <td>0</td>\
                                <td>\
                                <div class="t_textinput xs_shd_clhInp" style="margin:0;">\
                                <div class="t_right relative" style="margin-left:0;width: 100%;"><input type="text" class="time_input" value="" onfocus="fn_focus(this);" onblur="fn_blur(this);" style="color: rgb(153, 153, 153);">\
                                <i class="xs_search val_dialogTop" name="xs_shd_search_no"></i>\
                                </div>\
                                </div>\
                                </td>\
                                <td></td>\
                                <td><button class="but_green val_dialogTop" name="xs_shd_shjg">标记完成</button></td>\
                                </tr>';
                        });
                        $('.tanceng .after_order_record_create_setting_parent_list').html(detailSettingParengHtml);
                        $('.tanceng .after_order_record_create_setting_parent_num_total').html(data['product_json']['setting_sum_num']);
                    } else {
                        $('.tanceng .ven_after_order_detail_box_list').children('div.box_open_list').eq(2).addClass('none');
                    }
                    //配置子商品
                    var detailSettingChildArr = [];
                    var detailSettingChildHtml = '';
                    if (data['product_json'] && data['product_json']['setting_goods']) {
                        detailSettingChildArr = data['product_json']['setting_goods'];
                        $.each(detailSettingChildArr, function (i, v) {
                            detailSettingChildHtml += '<tr>\
                            <td>' + l_dbl(i + 1) + '</td>\
                                <td>' + v['good_name'] + '</td>\
                                <td>' + v['good_code_sn'] + '</td>\
                            <td>' + v['good_attribute'] + '</td>\
                            <td>' + v['unit'] + '</td>\
                            <td>' + v['good_after_num'] + '</td>\
                            <td>' + v['note'] + '</td>\
                                <td>0</td>\
                                <td><div class="t_textinput xs_shd_clhInp" style="margin:0;">\
                                <div class="t_right relative" style="margin-left:0;width: 100%;"><input type="text" class="time_input" value="" onfocus="fn_focus(this);" onblur="fn_blur(this);" style="color: rgb(153, 153, 153);">\
                                <i class="xs_search val_dialogTop" name="xs_shd_search_ok"></i>\
                                </div>\
                                </div></td>\
                                <td><span class="c_r">未解决</span></td>\
                                <td><button class="but_green val_dialogTop" name="xs_shd_shjg">标记完成</button></td>\
                                </tr>';
                        });
                        $('.tanceng .after_order_record_create_setting_child_list').html(detailSettingChildHtml);
                        //商品售后数量
                        $('.tanceng .after_order_record_create_setting_child_num_total').html(data['product_json']['setting_in_sum_num']);
                    }
                    //备注
                    $('.tanceng .after_order_create_note_textarea').html(likNullData(data['product_json']['note']));
                    //总计商品数量
                    $('.tanceng .after_order_create_product_num_total').html(likNullData(data['product_json']['good_total_num']));
                    //分配售后人员
                    /*if (data['status'] == 0) {
                     $('.ven_after_order_typea_look_fpshd').css('display', 'block');
                     } else {
                     $('.ven_after_order_typea_look_fpshd').css('display', 'none');
                     }*/
                } else {
                    alert('操作失败')
                }
            }
        });
    });

    //添加售后记录 - 提交
    $('.tanceng .ven_after_order_record_add_submit').die('click').live('click', function () {
        console.log()
    })

});
