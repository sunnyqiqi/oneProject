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
            html += '</ul>';
        });
        return html
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

    //补零函数
    function l_db1(x) {
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

    // json数组去重 - 某一项不考虑
    function getJsonArrIgnore(arr, ignore) {
        //定义需要的空数组
        var newArr = [];
        //定义转换字符串后的数组
        var newStringArr = [];
        $.each(arr, function (i, v) {
            var sIgnore = v[ignore];
            v[ignore] = '';
            var sArr = JSON.stringify(v);
            if ($.inArray(sArr, newStringArr) == -1) {
                // 根据字符串数组push对象
                newStringArr.push(sArr);
                newArr.push(v);
                v[ignore] = sIgnore;
            }
        });
        return newArr;
    }

    //获取当前系统时间-短
    function getCurrentDateShort() {
        var oDate = new Date();
        var sTime = '';
        sTime = oDate.getFullYear() + '-' + l_dbl(oDate.getMonth() + 1) + '-' + l_db1(oDate.getDate());
        return sTime
    }

    //1.新建退换货 -退换货编号
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

    var token, comid, pid, key, page, limit, word_titl, goods_id, goods_pid, goods_member, goods_enddate, goods_fileurl, goods_imgurl, w_p_n;
    token = Admin.get_token();
    //token = '2017052516045457073-1-1';
    uid = Admin.get_uid();
    var uname = loginUserInfo.username;
    comid = loginUserInfo.usercompany_id;
    deptid = loginUserInfo.department_id;
    userface = loginUserInfo.userface;
    //	补零函数
    function l_dbl(x) {
        return x < 10 ? '0' + x : x
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

    //选择审批人
    //审批步骤顺序数组
    var purReproductFlowOrderArr = ['步骤一', '步骤二', '步骤三', '步骤四', '步骤五', '步骤六', '步骤七'];

    //定义查看项
    var cgReproductLookAbledField = [
        {'index': null, 'field': '退款总金额(元)'},
        {'index': null, 'field': '退换货日期'},
        {'index': null, 'field': '审批状态'},
        {'index': null, 'field': '审批人'},
        {'index': null, 'field': '入库状态'},
        {'index': null, 'field': '创建日期'},
        {'index': null, 'field': '创建人'},
        {'index': null, 'field': '负责部门'},
        {'index': null, 'field': '负责人'},
        {'index': null, 'field': '备注'},
    ];
    likShow('#cg_reproduct_chance_table', cgReproductLookAbledField, '#cg_reproduct_chance_look_ul', '#cg_reproduct_chance_look_save', '#cg_reproduct_chance_look_reset');

    //采购退换货参数
    var getBuyReproductData = {
        token: token,
        thetype: 1, // 1 我发起的 2 待我审批的
        page: 1, // 当前页
        num: 10, // 每页条数
        is_invalid: 0,
        keywords: '', // 编号 、供应商搜索
        type: '', // 退换货类型 1 换货 2退货
        status: '' // 状态 1审批中2未完成3完成
    };
    //我发起的采购退换货列表
    getBuyReproductList();
    $("#cg_buyreproduct_mylist").live("click", function () {
        getBuyReproductData.page = 1;
        getBuyReproductData.thetype = 1;
        getBuyReproductList();
    });
    //待我审批采购退换货列表
    $("#cg_buyreproduct_mychecklist").live("click", function () {
        getBuyReproductData.page = 1;
        getBuyReproductData.thetype = 2;
        getBuyReproductList();
    });
    function getBuyReproductList() {
        $.ajax({
            url: SERVER_URL + '/buy-reproduct/list',
            type: 'GET',
            data: getBuyReproductData,
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                //搜索结果
                $("#cg_buyreproduct_search_list").html(oE.totalcount);
                if (oE.code == 0) {
                    var datalist = oE.datalist;
                    console.log(datalist);
                    if (datalist.length == 0) {
                        $('.cg_buyreproduct_nodata_box').removeClass('none');
                        $('.cg_buyreproduct_handle').addClass('none');
                    } else {
                        $(".cg_buyreproduct_nodata_box").addClass('none');
                        $('.cg_buyreproduct_handle').removeClass('none');
                    }
                    var cgReproductHtml = '';
                    $.each(datalist, function (i, v) {
                        //退换货类型
                        thetypeName = '';
                        if (v['thetype'] == 1) {
                            thetypeName = '换货';
                        } else {
                            thetypeName = '退货';
                        }
                        //审批状态class
                        var statusClass = '';
                        //审批状态name
                        var statusName = '';
                        //操作按钮
                        var cgReproductBtn = '';
                        //查看name值
                        var lookName = '';
                        //审批name值
                        var checkName = '';
                        //审批class值
                        var checkClass = '';
                        //作废状态判断
                        var cgReproductInvalid = '';//0 正常 1 作废
                        var cgReproductInvalidClass = '';
                        if (getBuyReproductData.thetype == 1) {
                            if (v['thetype'] == 1) {
                                lookName = 'cg_cgthd_look_hh';
                            } else {
                                lookName = 'cg_cgthd_look_th';
                            }
                            if (v['status'] == 1) {
                                statusClass = 'c_y';
                                statusName = '审批中';
                                cgReproductBtn = '<button class="but_mix but_cancal r_sidebar_btn but_look cgreproduct_look" name="'+lookName+'">查看</button><button class="but_mix but_cancal but_void but_r cgreproduct_invalid_btn">作废</button>';
                            } else if (v['status'] == 2) {
                                statusClass = 'c_r';
                                statusName = '未通过';
                                cgReproductBtn = '<button class="but_mix but_cancal r_sidebar_btn but_look cgreproduct_look" name="'+lookName+'">查看</button> <button class="but_mix but_cancal but_void but_r cgreproduct_invalid_btn">作废</button>';
                            // <button class="but_mix but_exit val_dialog page_67_newBut_wh pur_reproduct_edit_btn" name="cg_cgthd_exit">编辑</button>
                            } else if (v['status'] == 3) {
                                statusClass = 'c_g';
                                statusName = '通过';
                                cgReproductBtn = '<button class="but_mix but_cancal r_sidebar_btn but_look cgreproduct_look" name="'+lookName+'">查看</button><button class="but_mix but_cancal but_void but_r cgreproduct_invalid_btn">作废</button>';
                            }
                            //作废状态判断
                            if (v['is_invalid'] == 0) {
                                cgReproductInvalidClass = '';
                                cgReproductInvalid = l_dbl(i + 1);
                            } else {
                                cgReproductInvalidClass = 'grey';
                                cgReproductInvalid = '<span class="voidIcon pur_sup_zf_btn">作废</span>';
                                cgReproductBtn = '<button class="but_mix but_cancal r_sidebar_btn but_look cgreproduct_look" name="'+lookName+'">查看</button><button class="but_mix but_cancal but_void but_r">刪除</button>';
                            }
                        } else if (getBuyReproductData.thetype == 2) {
                            if (v['thetype'] == 1) {
                                checkName = 'cg_cgthhd_spckxq_hh';
                                checkClass = 'cgreproduct_check_btn_hh';
                                if(v['status'] == 1){
                                    lookName = 'cg_cgthh_splook_hh';
                                }else{
                                    lookName = 'cg_cgthd_look_hh';
                                }
                            } else {
                                lookName = 'cg_cgthh_splook_th';
                                checkName = 'cg_cgthhd_spckxq_th';
                                checkClass = 'cgreproduct_check_btn_th';
                                if(v['status'] == 1){
                                    lookName = 'cg_cgthh_splook_th';
                                }else{
                                    lookName = 'cg_cgthd_look_th';
                                }
                            }
                            if (v['status'] == 1) {
                                statusClass = 'c_y';
                                statusName = '审批中';
                                cgReproductBtn = '<button class="but_mix but_cancal r_sidebar_btn but_look cgreproduct_look" name="'+lookName+'">查看</button><button class="but_mix but_look val_dialog pur_rep_check_btn '+checkClass+'" name="'+checkName+'">审批</button>';
                            } else if (v['status'] == 2) {
                                statusClass = 'c_r';
                                statusName = '未通过';
                                cgReproductBtn = '<button class="but_mix but_cancal r_sidebar_btn but_look cgreproduct_look" name="'+lookName+'">查看</button><button class="but_mix but_grey1">审批</button>';

                            } else if (v['status'] == 3) {
                                statusClass = 'c_g';
                                statusName = '通过';
                                cgReproductBtn = '<button class="but_mix but_cancal r_sidebar_btn but_look cgreproduct_look" name="'+lookName+'">查看</button><button class="but_mix but_grey1">审批</button>';
                            }
                            //作废状态判断
                            if (v['is_invalid'] == 0) {
                                cgReproductInvalidClass = '';
                                cgReproductInvalid = l_dbl(i + 1);
                            } else {
                                cgReproductInvalidClass = 'grey';
                                cgReproductInvalid = '<span class="voidIcon pur_sup_zf_btn">作废</span>';
                            }
                        }
                        var cg_reproduct_thlx = '';
                        if (v['thetype'] == 1) {
                            cg_reproduct_thlx = '换货';
                        } else if (v['thetype'] == 2) {
                            cg_reproduct_thlx = '退货';
                        }
                        //入库状态
                        var inStatusName = '';
                        if (v['input_status'] == 0) {
                            inStatusName = '未入库';
                        } else if (v['input_status'] == 1) {
                            inStatusName = '已入库';
                        }
                        //出库状态
                        var outStatusName = '';
                        if (v['output_status'] == 0) {
                            outStatusName = '未出库';
                        } else if (v['output_status'] == 1) {
                            outStatusName = '已出库';
                        }


                        cgReproductHtml += '<tr cgreproductid ="' + v['id'] + '" class ="' + cgReproductInvalidClass + '">\
                           <td>' + cgReproductInvalid + '</td>\
                           <td>' + likNullData(v['code_sn']) + '</td>\
                           <td>' + likNullData(v['buy_order_sn']) + '</td>\
                           <td>' + likNullData(v['supplier_name']) + '</td>\
                           <td>' + likNullData(v['created_at'].split(' ')[0]) + '</td>\
                           <td>' + likNullData(v['product_type']) + '</td>\
                           <td>' + thetypeName + '</td>\
                           <td><span class="' + statusClass + '">' + statusName + '</span></td>\
                           <td>' + likNullData(v['mulit_approver_name']) + '</td>\
                           <td>' + likNullData(v['send_day'].split(" ")[0]) + '</td>\
                           <td>' + outStatusName + '</td>\
                           <td>' + likNullData(v['in_send_day'].split(" ")[0]) + '</td>\
                           <td>' + inStatusName + '</td>\
                           <td>' + likNullData(v['pay_day'].split(" ")[0]) + '</td>\
                           <td>' + likNullData(v['totals']) + '</td>\
                           <td>' + likNullData(v['uname']) + '</td>\
                            <td>' + likNullData(v['note']) + '</td>\
                            <td>' + cgReproductBtn + '</td>\
                           </tr>'
                    });
                    $(".cg_cgthh_tbody").html(cgReproductHtml);
                    //分页
                    list_table_render_pagination('.cg_buyreproduct_fenye', getBuyReproductData, getBuyReproductList, oE.totalcount, datalist.length);
                    //选择查看项
                    $("#cg_reproduct_chance_look_save").trigger("click");
                }
            }

        });
    }

    //点击刷新
    $('#cg_thh_refresh').die('click').live('click', function () {
        getBuyReproductData = {
            token: token,
            page: 1,//当前页
            num: 10,//每页显示条数
            is_invalid: 0,
            key: ''//关键字
        };
        $('#cd_reproduct_chance_noShow').attr('checked', 'checked');
        $('#cg_buyreproduct_search_inp').val('搜索退换货编号').css('color', '#CCCCCC');
        $('#cg_thh_thhlx_inp').val('退换货类型').css('color', '#CCCCCC');
        $('#cg_thh_spzt_inp').val('审批状态').css('color', '#CCCCCC');
        $('#cg_thh_spr_inp').val('审批人').css('color', '#CCCCCC');
        $('#cg_thh_rkzt_inp').val('入库状态').css('color', '#CCCCCC');
        $('#cg_thh_ckzt_inp').val('出库状态').css('color', '#CCCCCC');
        $('#cg_thh_fzbm_inp').val('负责部门').css('color', '#CCCCCC');
        $('#cg_thh_fzr_inp').val('负责人').css('color', '#CCCCCC');
        getBuyReproductList($('#cg_thh_quote_nav_ul li.tabhover').attr('needurl'));
    });

    //搜索关键字
    $("#cg_buyreproduct_search_btn").live("click", function () {
        if ($('#cg_buyreproduct_search_inp').val() == '搜索退换货编号') {
            getBuyReproductData.keywords = '';
        } else {
            getBuyReproductData.keywords = $('#cg_buyreproduct_search_inp').val();
        }
        getBuyReproductList($('#cg_thh_quote_nav_ul li.tabhover').attr('needurl'));
    });
    //展开高级搜索
    function cgThhQuoteSearch() {
        $.ajax({
            url: SERVER_URL + '/buy-reproduct/list',
            type: 'GET',
            data: {
                token: token
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    //获取datalist
                    var datalist = oE.datalist;
                    //定义高级搜索字段
                    //高级搜索 负责部门 字符串
                    var searchDeptName = '';
                    //高级搜索 审批人名字 字符串
                    var searchFlowName = '';
                    //高级搜索 负责人 字符串
                    var searchFlowaName = '';
                    //定义高级搜索数组
                    //高级搜索 负责部门 数组
                    var searchDeptArr = [];
                    //高级搜索 审批人名字 数组
                    var searchFlowArr = [];
                    //高级搜索 负责人 数组
                    var searchFlowaArr = [];
                    //高级搜索遍历
                    $.each(datalist, function (i, v) {
                        //高级搜索 审批人
                        if (v['current_uid'] != '' && v['current_name'] != '') {
                            searchFlowArr.push({
                                flowid: v['current_uid'],
                                flowname: v['current_name']
                            });
                        }
                        //高级搜索 负责部门
                        if (v['dept'] != '' && v['dept_name'] != '') {
                            searchDeptArr.push({
                                flowid: v['dept'],
                                flowname: v['dept_name']
                            });
                        }
                        //高级搜索 负责人
                        if (v['uid'] != '' && v['uname'] != '') {
                            searchFlowaArr.push({
                                flowid: v['uid'],
                                flowname: v['uname']
                            });
                        }
                    });
                    //高级搜索 审批人
                    $.each(getJsonArr(searchFlowArr), function (i, v) {
                        searchFlowName += '<li searchflowId ="' + v['flowid'] + '">' + v['flowname'] + '</li>';
                    });
                    //高级搜索 负责部门
                    $.each(getJsonArr(searchDeptArr), function (i, v) {
                        searchDeptName += '<li searchflowId ="' + v['flowid'] + '">' + v['flowname'] + '</li>';
                    });
                    //高级搜索 负责人
                    $.each(getJsonArr(searchFlowaArr), function (i, v) {
                        searchFlowaName += '<li searchflowId ="' + v['flowid'] + '">' + v['flowname'] + '</li>';
                    });
                    //高级搜索 审批人
                    $('#cg_thh_spr_inp_ul').html(searchFlowName);
                    //高级搜索 负责部门
                    $('#cg_thh_fzbm_inp_ul').html(searchDeptName);
                    //高级搜索 负责人
                    $('#cg_thh_fzr_inp_ul').html(searchFlowaName);
                }
            }
        })
    }

    //定义当前操作id
    var cgReproductId = null;
    //订单id
    var purRepLinkOrderId = null;
    //查看操作
    $('.cgreproduct_look').die('click').live('click', function () {
        $('.pur_rep_look_nav_ul li:nth-of-type(1)').trigger('click');
        cgReproductId = $(this).closest('tr').attr('cgreproductid');
        $.ajax({
            url: SERVER_URL + '/buy-reproduct/info',
            type: 'GET',
            data: {
                token: token,
                buy_reproduct_id: cgReproductId
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var data = oE.data;
                    console.log(data);
                    //采购退换货供应商名称
                    $('.cgreproduct_look_name').html(data['supplier_name']);
                    //采购退换货创建时间
                    $('.cgreproduct_look_created_at').html(data['created_at']);
                    //采购退换货创建人
                    $('.cgreproduct_look_uname').html(data['uname']);
                    //采购退换货编号
                    $('.cgreproduct_look_code_sn').html(data['code_sn']);
                    //采购订单编号
                    $('.cgreproduct_look_order_code_sn').html(data['buy_order_sn']);
                    //退换货类型
                    var cg_reproduct_thlx = '';
                    if (data['thetype'] == 1) {
                        cg_reproduct_thlx = '换货';
                    } else if (data['thetype'] == 2) {
                        cg_reproduct_thlx = '退货';
                    }
                    //是否整单退
                    var cg_reproduct_full = '';
                    if (data['is_full'] == 0) {
                        cg_reproduct_full = '';
                    } else if (data['is_full'] == 1) {
                        cg_reproduct_full = '（整单退）';
                    }
                    $('.cgreproduct_look_thetype').html(cg_reproduct_thlx + cg_reproduct_full);

                    //财务信息

                    //结算账户
                    $('.cgreproduct_look_account_name').html(data['account_name']);
                    //结算账目
                    $('.cgreproduct_look_item_name').html(data['item_name']);
                    //付款方式
                    if(data['pay_type'] == 1){
                        $('.cgreproduct_look_pay_type').html('现金');
                    }else if(data['pay_type'] == 2){
                        $('.cgreproduct_look_pay_type').html('电汇');
                    }else if(data['pay_type'] == 3){
                        $('.cgreproduct_look_pay_type').html('支票');
                    }

                    //付款日期
                    $('.cgreproduct_look_pay_day').html(data['pay_day']);
                    //收票日期
                    $('.cgreproduct_look_refund_day').html(data['refund_day']);

                    //出库日期

                    //发货日期
                    $('.cgreproduct_look_send_day').html(data['send_day']);
                    //物流方式
                    if(data['logistics_type'] == 1){
                        $('.cgreproduct_look_logistics_type').html('快递');
                    }else if(data['logistics_type'] == 2){
                        $('.cgreproduct_look_logistics_type').html('陆运');
                    }else if(data['logistics_type'] == 3){
                        $('.cgreproduct_look_logistics_type').html('空运');
                    }else if(data['logistics_type'] == 4){
                        $('.cgreproduct_look_logistics_type').html('平邮');
                    }else if(data['logistics_type'] == 5){
                        $('.cgreproduct_look_logistics_type').html('海运');
                    }
                    //承担运费
                    if(data['freight'] == 1){
                        $('.cgreproduct_look_freight').html('包运费');
                    }else if(data['freight'] == 0){
                        $('.cgreproduct_look_freight').html('不包运费');
                    }
                    //收货人
                    $('.cgreproduct_look_receipt_person').html(data['receipt_person']);
                    //联系电话
                    $('.cgreproduct_look_contact_tel').html(data['contact_tel']);
                    //收货地址
                    $('.cgreproduct_look_receipt_address').html(data['receipt_address']);
                    //入库日期
                    $('.cgreproduct_look_in_send_day').html(data['in_send_day']);

                    //备注
                    $('.cgreproduct_look_note').html(data['note']);

                    //审批结果

                    var checkHtml = '';
                    var flowOrderArr2 = ['', '步骤一', '步骤二', '步骤三', '步骤四', '步骤五', '步骤六', '步骤七'];
                    if (data['check_log'].length != 0) {
                        $('.sq_look_check_box').removeClass('none');
                        $.each(data['check_log'], function (i, v) {
                            var checkStatusName = '';
                            var checkCiteClass = '';
                            var checkStatusClass = '';
                            if (v['status'] == 0) {
                                checkStatusName = '未审批';
                                checkCiteClass = 'b_h';
                                checkStatusClass = 'c_9';
                            } else if (v['status'] == 1) {
                                checkStatusName = '审批中';
                                checkCiteClass = 'b_y';
                                checkStatusClass = 'c_y';
                            } else if (v['status'] == 2) {
                                checkStatusName = '未通过';
                                checkCiteClass = 'b_r';
                                checkStatusClass = 'c_r';
                            } else if (v['status'] == 3) {
                                checkStatusName = '通过审批';
                                checkCiteClass = 'b_g';
                                checkStatusClass = 'c_g';
                            } else if (v['status'] == 9) {
                                checkCiteClass = 'b_b';
                                checkStatusClass = 'f_color bold';
                                checkStatusName = '发起审批';
                            }
                            checkHtml += '<div class="work_spiliu">\
                                <div class="work_spiliu_items" style="overflow: hidden;">\
                                <div class="left" style="position: relative;">\
                                <div class="work_spiliu_div">\
                                <img class="inline_block tx" src="' + v['face'] + '">\
                                <h3 class="work_sp_h3">' + v['name'] + '</h3>\
                                <span class="c_9 m_left_5 ' + (data['current_check'] == 1 ? 'none1' : '') + '">' + flowOrderArr2[i] + '</span>\
                                </div>\
                                <cite class="' + checkCiteClass + '"></cite>\
                                </div>\
                                <div class="auto_height">\
                                <img src="static/images/work_jiantou.png">\
                                <div class="sp_cont">\
                                <div class="sp_cont_a">\
                                <h3 class="' + checkStatusClass + '">' + checkStatusName + '</h3>\
                                <p class="c_9">' + v['day'] + '</p>\
                                </div>\
                                <p class="c_3 work_sp_p ' + (v['status'] == 9 ? 'none' : '') + '">' + v['note'] + '</p>\
                                </div>\
                                </div>\
                                <div style="clear: both;height: 0;font-size: 1px;line-height: 0px;"></div>\
                                </div>\
                                </div>';
                        });
                        $('.cgreproduct_look_check_log').html(checkHtml);
                    }

                    //采购订单基本信息
                    purRepLinkOrderId = data['buy_order'];
                }

            }
        });
    });
    //我发起的
    //查看退货详情
    $('.pur_reproduct_look_th_detail_btn').die('click').live('click', function () {
        purReproductReturnDetailFn(cgReproductId);
    });
    //查看换货详情
    $('.pur_reproduct_look_hh_detail_btn').die('click').live('click', function () {
        purReproductExchangeDetailFn(cgReproductId);
    });
    //我审批的
    //查看退货详情
    $('.cgreproduct_check_btn_th').die('click').live('click', function () {
        cgReproductId = $(this).closest('tr').attr('cgreproductid');
        purReproductReturnDetailFn(cgReproductId);
    });
    //查看换货详情
    $('.cgreproduct_check_btn_hh').die('click').live('click', function () {
        cgReproductId = $(this).closest('tr').attr('cgreproductid');
        purReproductExchangeDetailFn(cgReproductId);
    });
    //换货详情函数
    function purReproductExchangeDetailFn(repId) {
        $.ajax({
            url: SERVER_URL + '/buy-reproduct/info',
            type: 'GET',
            data: {
                token: token,
                buy_reproduct_id: repId
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var data = oE.data;
                    console.log(data);
                    //采购退换货供应商名称
                    $('.tanceng .cgreproduct_look_name').html(data['supplier_name']);
                    //采购退换货创建时间
                    $('.tanceng .cgreproduct_look_created_at').html(data['created_at']);
                    //采购退换货创建人
                    $('.tanceng .cgreproduct_look_uname').html(data['uname']);
                    //采购退换货编号
                    $('.tanceng .cgreproduct_look_code_sn').html(data['code_sn']);
                    //采购订单编号
                    $('.tanceng .cgreproduct_look_order_code_sn').html(data['buy_order_sn']);
                    //退换货类型
                    var cg_reproduct_thlx = '';
                    if (data['thetype'] == 1) {
                        cg_reproduct_thlx = '换货';
                    } else if (data['thetype'] == 2) {
                        cg_reproduct_thlx = '退货';
                    }
                    //是否整单退
                    var cg_reproduct_full = '';
                    if (data['is_full'] == 0) {
                        cg_reproduct_full = '';
                    } else if (data['is_full'] == 1) {
                        cg_reproduct_full = '（整单退）';
                    }
                    $('.tanceng .cgreproduct_look_thetype').html(cg_reproduct_thlx + cg_reproduct_full);

                    //财务信息

                    //结算账户
                    $('.tanceng .cgreproduct_look_account_name').html(data['account_name']);
                    //结算账目
                    $('.tanceng .cgreproduct_look_item_name').html(data['item_name']);
                    //付款方式
                    if(data['pay_type'] == 1){
                        $('.tanceng .cgreproduct_look_pay_type').html('现金');
                    }else if(data['pay_type'] == 2){
                        $('.tanceng .cgreproduct_look_pay_type').html('电汇');
                    }else if(data['pay_type'] == 3){
                        $('.tanceng .cgreproduct_look_pay_type').html('支票');
                    }

                    //付款日期
                    $('.tanceng .cgreproduct_look_pay_day').html(data['pay_day']);
                    //退票日期
                    $('.tanceng .cgreproduct_look_refund_day').html(data['refund_day']);

                    //出库日期

                    //发货日期
                    $('.tanceng .cgreproduct_look_send_day').html(data['send_day']);
                    //物流方式
                    if(data['logistics_type'] == 1){
                        $('.tanceng .cgreproduct_look_logistics_type').html('快递');
                    }else if(data['logistics_type'] == 2){
                        $('.tanceng .cgreproduct_look_logistics_type').html('陆运');
                    }else if(data['logistics_type'] == 3){
                        $('.tanceng .cgreproduct_look_logistics_type').html('空运');
                    }else if(data['logistics_type'] == 4){
                        $('.tanceng .cgreproduct_look_logistics_type').html('平邮');
                    }else if(data['logistics_type'] == 5){
                        $('.tanceng .cgreproduct_look_logistics_type').html('海运');
                    }
                    //承担运费
                    if(data['freight'] == 1){
                        $('.tanceng .cgreproduct_look_freight').html('包运费');
                    }else if(data['freight'] == 0){
                        $('.tanceng .cgreproduct_look_freight').html('不包运费');
                    }
                    //收货人
                    $('.tanceng .cgreproduct_look_receipt_person').html(data['receipt_person']);
                    //联系电话
                    $('.tanceng .cgreproduct_look_contact_tel').html(data['contact_tel']);
                    //收货地址
                    $('.tanceng .cgreproduct_look_receipt_address').html(data['receipt_address']);
                    //入库日期
                    $('.tanceng .cgreproduct_look_in_send_day').html(data['in_send_day']);

                    //备注
                    $('.tanceng .cgreproduct_look_note').html(data['note']);

                    //商品信息
                    if (data['product']) {
                        var productInfo = data['product'];
                        //基本商品信息
                        if (productInfo['goods']) {
                            //基本商品
                            var goodsInfo = productInfo['goods'];
                            var goodsHtml = '';
                            $('.tanceng .pur_rep_detail_goods_box').css('display', 'block');
                            $.each(goodsInfo, function (i, v) {
                                goodsHtml += '<tr>\
                                        <td>' + v['good_sn'] + '</td>\
                                        <td>' + v['good_name'] + '</td>\
                                        <td>' + v['good_attr'] + '</td>\
                                        <td>' + v['buy_num'] + '</td>\
                                        <td>' + v['reproduct_num'] + '</td>\
                                        <td></td>\
                                        </tr>';
                            });
                            $('.tanceng .pur_rep_detail_goods_list').html(goodsHtml);
                        } else {
                            $('.tanceng .pur_rep_detail_goods_box').css('display', 'none');
                        }

                        //整机商品信息
                        var settingHtml = '';
                        if (productInfo['setting']) {
                            $('.tanceng .pur_rep_detail_setting_box').css('display', 'block');
                            var settingArr = productInfo['setting'];
                            $.each(settingArr, function (i, v) {
                                var settingGoods = '';
                                //可选配
                                $.each(v['good_list'], function (i2, v2) {
                                    var settingGoodsInfo = '';
                                    $.each(v2['attr_list'], function (i3, v3) {
                                        settingGoodsInfo += '<tr>\
                                        <td>' + v3['good_sn'] + '</td>\
                                        <td>' + v3['good_attr'] + '</td>\
                                        <td>' + v3['buy_num'] + '</td>\
                                        <td>' + v3['reproduct_num'] + '</td>\
                                        <td></td>\
                                        </tr>';
                                    });
                                    settingGoods += '<table class="xs_bjd_table_1">\
                                        <thead>\
                                        <tr style="background: #fff;">\
                                        <th class="c_3" style="font-weight: 100;">' + v2['title'] + '</th>\
                                        <th></th>\
                                        <th></th>\
                                        </tr>\
                                        <tr>\
                                        <th width="140">编号</th>\
                                        <th width="360">属性</th>\
                                        <th width="70">采购数量</th>\
                                        <th width="70">换货数量</th>\
                                        <th width="60"></th>\
                                        </tr>\
                                        </thead>\
                                        <tbody>' + settingGoodsInfo + '</tbody>\
                                        </table>'
                                });

                                settingHtml += '<div class="xs_div_2" ' + (i == 0 ? ' style="margin-top: 20px;"' : '') + '>\
                            <table class="xs_bjd_table">\
                            <thead class="' + (i == 0 ? '' : 'none') + '">\
                            <tr>\
                            <th width="140">编号</th>\
                            <th width="120">名称</th>\
                            <th width="240">属性</th>\
                            <th width="70">采购数量</th>\
                            <th width="70">换货数量</th>\
                            <th width="60">配件</th>\
                            </tr>\
                            </thead>\
                            <tbody>\
                            <tr class="c_3 c_3 xs_bjd_bold">\
                            <td width="140">' + v['setting_sn'] + '</td>\
                            <td width="120">' + v['setting_name'] + '</td>\
                            <td width="240">' + v['setting_attr'] + '</td>\
                            <td width="70">' + v['buy_num'] + '</td>\
                            <td width="70">' + v['reproduct_num'] + '</td>\
                            <td width="60">\
                            <button class="but_mix box_open_btn_1 but_blue_1">展开</button>\
                            </td>\
                            </tr>\
                            </tbody>\
                            </table>\
                            </div>\
                            <div class="xs_tc_goods_box xs_xsbjd_table_t2 goods_tc_toggle" style="display: none;">' + settingGoods + '</div>';
                            });
                            $('.tanceng .pur_rep_detail_setting_total').html(productInfo['setting']['setting_sum_total']);
                        } else {
                            $('.tanceng .pur_rep_detail_setting_box').css('display', 'none');
                        }
                        $('.tanceng .pur_rep_detail_setting_list').html(settingHtml);
                    }
                }
            }
        });
    }

    //退货详情函数
    function purReproductReturnDetailFn(repId) {
        $.ajax({
            url: SERVER_URL + '/buy-reproduct/info',
            type: 'GET',
            data: {
                token: token,
                buy_reproduct_id: repId
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var data = oE.data;
                    console.log(data);
                    //采购退换货供应商名称
                    $('.tanceng .cgreproduct_look_name').html(data['supplier_name']);
                    //采购退换货创建时间
                    $('.tanceng .cgreproduct_look_created_at').html(data['created_at']);
                    //采购退换货创建人
                    $('.tanceng .cgreproduct_look_uname').html(data['uname']);
                    //采购退换货编号
                    $('.tanceng .cgreproduct_look_code_sn').html(data['code_sn']);
                    //采购订单编号
                    $('.tanceng .cgreproduct_look_order_code_sn').html(data['buy_order_sn']);
                    //退换货类型
                    var cg_reproduct_thlx = '';
                    if (data['thetype'] == 1) {
                        cg_reproduct_thlx = '换货';
                    } else if (data['thetype'] == 2) {
                        cg_reproduct_thlx = '退货';
                    }
                    //是否整单退
                    var cg_reproduct_full = '';
                    if (data['is_full'] == 0) {
                        cg_reproduct_full = '';
                    } else if (data['is_full'] == 1) {
                        cg_reproduct_full = '（整单退）';
                    }
                    $('.tanceng .cgreproduct_look_thetype').html(cg_reproduct_thlx + cg_reproduct_full);


                    //出库日期

                    //发货日期
                    $('.tanceng .cgreproduct_look_send_day').html(data['send_day']);
                    //物流方式
                    if(data['logistics_type'] == 1){
                        $('.tanceng .cgreproduct_look_logistics_type').html('快递');
                    }else if(data['logistics_type'] == 2){
                        $('.tanceng .cgreproduct_look_logistics_type').html('陆运');
                    }else if(data['logistics_type'] == 3){
                        $('.tanceng .cgreproduct_look_logistics_type').html('空运');
                    }else if(data['logistics_type'] == 4){
                        $('.tanceng .cgreproduct_look_logistics_type').html('平邮');
                    }else if(data['logistics_type'] == 5){
                        $('.tanceng .cgreproduct_look_logistics_type').html('海运');
                    }
                    //承担运费
                    if(data['freight'] == 1){
                        $('.tanceng .cgreproduct_look_freight').html('包运费');
                    }else if(data['freight'] == 0){
                        $('.tanceng .cgreproduct_look_freight').html('不包运费');
                    }
                    //收货人
                    $('.tanceng .cgreproduct_look_receipt_person').html(data['receipt_person']);
                    //联系电话
                    $('.tanceng .cgreproduct_look_contact_tel').html(data['contact_tel']);
                    //收货地址
                    $('.tanceng .cgreproduct_look_receipt_address').html(data['receipt_address']);

                    //备注
                    $('.tanceng .cgreproduct_look_note').html(data['note']);

                    //商品信息
                    if (data['product']) {
                        var productInfo = data['product'];
                        //基本商品信息
                        if (productInfo['goods']) {
                            //基本商品
                            var goodsInfo = productInfo['goods'];
                            var goodsHtml = '';
                            $('.tanceng .pur_rep_detail_goods_box').css('display', 'block');
                            $.each(goodsInfo, function (i, v) {
                                goodsHtml += '<tr>\
                                        <td>' + v['good_sn'] + '</td>\
                                        <td>' + v['good_name'] + '</td>\
                                        <td>' + v['good_attr'] + '</td>\
                                        <td>' + v['buy_num'] + '</td>\
                                        <td>' + v['reproduct_num'] + '</td>\
                                        <td>' + v['buy_price'] + '</td>\
                                        <td>' + v['reproduct_price'] + '</td>\
                                        <td>' + v['reproduct_price_total'] + '</td>\
                                        <td></td>\
                                        </tr>';
                            });
                            $('.tanceng .pur_rep_detail_goods_list').html(goodsHtml);
                        } else {
                            $('.tanceng .pur_rep_detail_goods_box').css('display', 'none');
                        }

                        //整机商品信息
                        var settingHtml = '';
                        if (productInfo['setting']) {
                            $('.tanceng .pur_rep_detail_setting_box').css('display', 'block');
                            var settingArr = productInfo['setting'];
                            $.each(settingArr, function (i, v) {
                                var settingGoods = '';
                                //可选配
                                $.each(v['good_list'], function (i2, v2) {
                                    var settingGoodsInfo = '';
                                    $.each(v2['attr_list'], function (i3, v3) {
                                        settingGoodsInfo += '<tr>\
                                        <td>' + v3['good_sn'] + '</td>\
                                        <td>' + v3['good_attr'] + '</td>\
                                        <td>' + v3['buy_num'] + '</td>\
                                        <td>' + v3['reproduct_num'] + '</td>\
                                        <td>' + v3['buy_price'] + '</td>\
                                        <td>' + v3['reproduct_price'] + '</td>\
                                        <td>' + v3['reproduct_price_total'] + '</td>\
                                        <td></td>\
                                        </tr>';
                                    });
                                    settingGoods += '<table class="xs_bjd_table_1">\
                                        <thead>\
                                        <tr style="background: #fff;">\
                                        <th class="c_3" style="font-weight: 100;">' + v2['title'] + '</th>\
                                        <th></th>\
                                        <th></th>\
                                        </tr>\
                                        <tr>\
                                        <th width="260">编号</th>\
                                        <th width="330">属性</th>\
                                        <th width="80">采购数量</th>\
                                        <th width="80">退货数量</th>\
                                        <th width="80">采购价</th>\
                                        <th width="80">退货单价</th>\
                                        <th width="80">退款总价</th>\
                                        <th width="60"></th>\
                                        </tr>\
                                        </thead>\
                                        <tbody>' + settingGoodsInfo + '</tbody>\
                                        </table>'
                                });

                                settingHtml += '<div class="xs_div_2" ' + (i == 0 ? ' style="margin-top: 20px;"' : '') + '>\
                            <table class="xs_bjd_table">\
                            <thead class="' + (i == 0 ? '' : 'none') + '">\
                            <tr>\
                            <th width="140">编号</th>\
                            <th width="120">名称</th>\
                            <th width="330">属性</th>\
                            <th width="80">采购数量</th>\
                            <th width="80">退货数量</th>\
                            <th width="80">采购价</th>\
                            <th width="80">退货单价</th>\
                            <th width="80">退款总价</th>\
                            <th width="60">配件</th>\
                            </tr>\
                            </thead>\
                            <tbody>\
                            <tr class="c_3 c_3 xs_bjd_bold">\
                            <td width="140">' + v['setting_sn'] + '</td>\
                            <td width="120">' + v['setting_name'] + '</td>\
                            <td width="330">' + v['setting_attr'] + '</td>\
                            <td width="80">' + v['buy_num'] + '</td>\
                            <td width="80">' + v['reproduct_num'] + '</td>\
                            <td width="80">' + v['buy_price'] + '</td>\
                            <td width="80">' + v['reproduct_price'] + '</td>\
                            <td width="80">' + v['reproduct_price_total'] + '</td>\
                            <td width="60">\
                            <button class="but_mix box_open_btn_1 but_blue_1">展开</button>\
                            </td>\
                            </tr>\
                            </tbody>\
                            </table>\
                            </div>\
                            <div class="xs_tc_goods_box xs_xsbjd_table_t2 goods_tc_toggle" style="display: none;">' + settingGoods + '</div>';
                            });
                            $('.tanceng .pur_rep_detail_setting_total').html(productInfo['setting']['setting_sum_total']);
                        } else {
                            $('.tanceng .pur_rep_detail_setting_box').css('display', 'none');
                        }
                        $('.tanceng .pur_rep_detail_setting_list').html(settingHtml);
                        //其他费用
                        $('.tanceng .pur_rep_detail_other_free').html(productInfo['other_free']);
                        //总计金额
                        $('.tanceng .pur_rep_detail_reproduct_price_total').html(productInfo['reproduct_price_total']);
                    }
                }
            }
        });
    }


    //审批参数
    var purRepCheckData = {
        token: token,
        check_type: '',
        buy_reproduct_id: '',
        note: ''
    };
    //审批操作
    $('.pur_rep_check_btn').die('click').live('click', function () {
        cgReproductId = $(this).closest('tr').attr('cgreproductid');
        purRepCheckData.buy_reproduct_id = cgReproductId;
    });
    //审批操作 - 通过
    $('.pur_rep_check_btn_pass').die('click').live('click', function () {
        purRepCheckData.check_type = 1;
        purRepCheckData.buy_reproduct_id = cgReproductId;
    });
    //审批操作 - 拒绝
    $('.pur_rep_check_btn_refuse').die('click').live('click', function () {
        purRepCheckData.check_type = 2;
        purRepCheckData.buy_reproduct_id = cgReproductId;
    });
    //审批提交
    $('.tanceng .pur_reproduct_check_submit_btn').die('click').live('click', function () {
        if ($('.tanceng .pur_reproduct_check_note_textarea').val() == '请输入审批意见') {
            purRepCheckData.note = '';
        } else {
            purRepCheckData.note = $('.tanceng .pur_reproduct_check_note_textarea').val();
        }
        $.ajax({
            url: SERVER_URL + '/buy-reproduct/check',
            type: 'POST',
            data: purRepCheckData,
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    $(this).closest('.dialog_box').remove();
                    $('.tanceng').css('display', 'none').children('div').remove();
                    $('.right_sidebar_h').trigger('click');
                    getBuyReproductList();
                } else {
                    alert(oE.msg);
                }
            }
        });
    });
    //查看退换货 - 查看订单
    var purOrderLinkQuoteId = null;
    $('.pur_rep_look_nav_ul li:nth-of-type(2)').die('click').live('click', function () {
        $.ajax({
            url: SERVER_URL + '/buy-order/info',
            type: 'GET',
            data: {
                token: token,
                buy_order_id: purRepLinkOrderId
            },
            dataType: 'json',
            success: function (oE) {
                var data = oE.data;
                console.log(data);
                //根据作废状态判断更多的显示隐藏
                if (data['is_invalid'] == 0) {
                    $('.pur_order_look_more').css('display', '');
                } else if (data['is_invalid'] == 1) {
                    $('.pur_order_look_more').css('display', 'none');
                }
                //采购订单创建时间
                $('.pur_order_look_created_at').html(data['created_at']);
                //采购订单创建人
                $('.pur_order_look_uname').html(data['uname']);
                //采购订单编号
                $('.pur_order_look_buy_code_sn').html(data['buy_code_sn']);
                //采购订单供应商名称
                $('.pur_order_look_name').html(likNullData(data['supplier_name']));
                //采购订单采购合同
                $('.pur_order_look_purchase_contract_sn').html(data['purchase_contract_sn']);
                //采购订单采购报价单
                $('.pur_order_look_buy_quote_code_sn').html(data['buy_quote_code_sn']);
                //采购订单负责部门
                $('.pur_order_look_dept_name').html(data['dept_name']);
                //采购订单负责人
                $('.pur_order_look_owner_name').html(data['owner_name']);

                //财务信息

                //结算账户
                $('.pur_order_look_account_name').html(data['account_name']);
                //付款方式
                if (data['pay_type'] == 1) {
                    $('.pur_order_look_pay_type').html('现金');
                } else if (data['pay_type'] == 2) {
                    $('.pur_order_look_pay_type').html('电汇');
                } else if (data['pay_type'] == 3) {
                    $('.pur_order_look_pay_type').html('支票');
                }
                //税率
                if (data['tax_rate'] == 1) {
                    $('.pur_order_look_tax_rate').html('含税17%');
                } else if (data['pay_type'] == 0) {
                    $('.pur_order_look_tax_rate').html('无税');
                }
                //总金额
                $('.pur_order_look_totals').html(data['totals']);

                //入库日期
                $('.pur_order_look_in_libs_day').html(data['in_libs_day']);
                //采购订单 备注
                $('.pur_order_look_note').html(data['note']);
                //采购订单 抄送人
                var copyList = '';
                $.each(data['copy_list'], function (i, v) {
                    copyList += v['name'] + '、';
                });
                copyList = copyList.slice(0, copyList.length - 1);
                $('.pur_order_look_copy_list').html(copyList);

                //关联采购报价单
                purOrderLinkQuoteId = data['buy_quote_id'];
            }
        });
    });
    //查看入库商品
    $('.pur_order_look_ruku_products').die('click').live('click', function () {
        getPurQuoteDetailFn(purOrderLinkQuoteId);
    });
    //采购报价单详情函数
    function getPurQuoteDetailFn(purQuoteCurrentId) {
        $.ajax({
            url: SERVER_URL + '/buy-quote/detail',
            type: 'GET',
            data: {
                token: token,
                buy_quote_id: purQuoteCurrentId
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var data = oE.data;
                    console.log(data);
                    //采购报价单名称
                    $('.tanceng .pur_quote_look_name').html(data['supplier_name']);
                    //采购报价单创建时间
                    $('.tanceng .pur_quote_look_created_at').html(data['created_at']);
                    //采购报价单创建人
                    $('.tanceng .pur_quote_look_uname').html(data['uname']);
                    //采购报价单编号
                    $('.tanceng .pur_quote_look_code_sn').html(data['code_sn']);
                    //采购报价单供应商名称
                    $('.tanceng .pur_quote_look_supplier_name').html(data['supplier_name']);
                    //负责部门
                    $('.tanceng .pur_quote_look_dept_name').html(data['dept_name']);
                    //负责人
                    $('.tanceng .pur_quote_look_owner_name').html(data['owner_name']);
                    //商品信息
                    if (data['product_json']) {
                        var productInfo = data['product_json'];
                        //基本商品信息
                        if (productInfo['goods']) {
                            //基本商品
                            var goodsInfo = productInfo['goods']['goods'];
                            var goodsHtml = '';
                            $('.tanceng .pur_quote_detail_goods_box').css('display', 'block');
                            $.each(goodsInfo, function (i, v) {
                                goodsHtml += '<tr>\
                                        <td>' + l_dbl(i + 1) + '</td>\
                                        <td>' + v['good_sn'] + '</td>\
                                        <td>' + v['good_name'] + '</td>\
                                        <td>' + v['good_attr'] + '</td>\
                                        <td>' + v['good_num'] + v['good_unit'] + '</td>\
                                        </tr>';
                            });
                            $('.tanceng .pur_quote_detail_goods_list').html(goodsHtml);
                        } else {
                            $('.tanceng .pur_quote_detail_goods_box').css('display', 'none');
                        }
                        //整机商品信息
                        var settingHtml = '';
                        if (productInfo['setting']) {
                            $('.tanceng .pur_quote_detail_setting_box').css('display', 'block');
                            var settingArr = productInfo['setting']['setting'];
                            $.each(settingArr, function (i, v) {
                                var settingGoods = '';
                                //可选配
                                $.each(v['good_list'], function (i2, v2) {
                                    var settingGoodsInfo = '';
                                    $.each(v2['attr_list'], function (i3, v3) {
                                        settingGoodsInfo += '<tr>\
                                        <td>' + v3['good_sn'] + '</td>\
                                        <td>' + v3['good_attr'] + '</td>\
                                        <td>' + v3['total_num'] + '</td>\
                                        <td></td>\
                                        </tr>';
                                    });
                                    settingGoods += '<table class="xs_bjd_table_1">\
                                        <thead>\
                                        <tr style="background: #fff;">\
                                        <th class="c_3" style="font-weight: 100;">' + v2['title'] + '</th>\
                                        <th></th>\
                                        <th></th>\
                                        </tr>\
                                        <tr>\
                                        <th width="140">编号</th>\
                                        <th width="560">属性</th>\
                                        <th width="50">数量</th>\
                                        <th width="60"></th>\
                                        </tr>\
                                        </thead>\
                                        <tbody>' + settingGoodsInfo + '</tbody>\
                                        </table>'
                                });

                                settingHtml += '<div class="xs_div_2" ' + (i == 0 ? ' style="margin-top: 20px;"' : '') + '>\
                            <table class="xs_bjd_table">\
                            <thead class="' + (i == 0 ? '' : 'none') + '">\
                            <tr>\
                            <th width="30">序号</th>\
                            <th width="140">编号</th>\
                            <th width="150">名称</th>\
                            <th width="340">属性</th>\
                            <th width="50">数量</th>\
                            <th width="60">配件</th>\
                            </tr>\
                            </thead>\
                            <tbody>\
                            <tr class="c_3 c_3 xs_bjd_bold">\
                            <td width="30">' + l_dbl(i + 1) + '</td>\
                            <td width="140">' + v['setting_sn'] + '</td>\
                            <td width="150">' + v['setting_name'] + '</td>\
                            <td width="340">' + v['setting_attr'] + '</td>\
                            <td width="50">' + v['setting_num'] + '</td>\
                            <td width="60">\
                            <button class="but_mix box_open_btn_1 but_blue_1">展开</button>\
                            </td>\
                            </tr>\
                            </tbody>\
                            </table>\
                            </div>\
                            <div class="xs_tc_goods_box goods_tc_toggle" style="display: none;">' + settingGoods + '</div>';
                            });
                            $('.tanceng .pur_quote_detail_setting_total').html(productInfo['setting']['sum_total']);
                        } else {
                            $('.tanceng .pur_quote_detail_setting_box').css('display', 'none');
                        }
                        $('.tanceng .pur_quote_detail_setting_list').html(settingHtml);
                        //单价合计
                        $('.tanceng .pur_quote_detail_money_sum').html(productInfo['money_sum']);
                        //合计税额
                        $('.tanceng .pur_quote_detail_tax_money_sum').html(productInfo['tax_money_sum']);
                        //其他费用
                        $('.tanceng .pur_quote_detail_other_free').html(productInfo['other_free']);
                        //总计金额
                        $('.tanceng .pur_quote_detail_totals').html(productInfo['totals']);
                        //备注
                        $('.tanceng .pur_quote_detail_note').html(productInfo['note']);
                    }

                }
            },
            error: function (e) {
                alert(e.msg);
            }
        });
    }



    //作废操作
    $('.cgreproduct_invalid_btn').live("click", function () {
        cgReproductId = $(this).closest('tr').attr('cgreproductid');
        $.ajax({
            url: SERVER_URL + '/buy-reproduct/setstatus',
            type: 'POST',
            data: {
                token: token,
                uid: uid,//用户id
                buy_reproduct_id: cgReproductId,//退换货id
                status_flag: 1//设置类型 (0enable) 是启用 (1disable作废)
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    if ($('#cg_buyreproduct_mylist').hasClass('tabhover')) {
                        getBuyReproductList('/buy-reproduct/mylist');
                    } else if ($('#cg_buyreproduct_mychecklist').hasClass('tabhover')) {
                        getBuyReproductList('/buy-reproduct/mychecklist');
                    }
                }
            }
        })
    });
    //不显示作废状态
    $('#cd_reproduct_chance_noShow').die('click').live('click', function () {
        if ($(this).attr('checked') == 'checked') {
            getBuyReproductData.is_invalid = 0;
        } else {
            getBuyReproductData.is_invalid = '';
        }
        getBuyReproductList();
    });

    //高级搜索
    //退换货类型
    $('#cg_thh_thhlx_inp_ul li').die('click').live('click', function () {
        getBuyReproductData.s_type = $(this).closest('li').attr('searchflowId');
        getBuyReproductList($('#cg_thh_quote_nav_ul li.tabhover').attr('needurl'));
    });
    //审批状态
    $('#cg_thh_spzt_inp_ul li').die('click').live('click', function () {
        alert($(this).index() + 1);
        getBuyReproductData.status = $(this).index() + 1;
        getBuyReproductList($('#cg_thh_quote_nav_ul li.tabhover').attr('needurl'));
    });
    //审批人
    $('#cg_thh_spr_inp_ul li').die('click').live('click', function () {
        getBuyReproductData.flow = $(this).closest('li').attr('searchflowId');
        getBuyReproductList($('#cg_thh_quote_nav_ul li.tabhover').attr('needurl'));
    });
    //负责部门
    $('#cg_thh_fzbm_inp_ul li').die('click').live('click', function () {
        getBuyReproductData.flow = $(this).closest('li').attr('searchflowId');
        getBuyReproductList($('#cg_thh_quote_nav_ul li.tabhover').attr('needurl'));
    });
    //负责人
    $('#cg_thh_fzr_inp_ul li').die('click').live('click', function () {
        getBuyReproductData.flow = $(this).closest('li').attr('searchflowId');
        getBuyReproductList($('#cg_thh_quote_nav_ul li.tabhover').attr('needurl'));
    });
    //入库状态
    //出库状态

    //新建退换货

    //新建退换货参数
    var cgThhCreateData = {
        token: token,
        buy_reproduct_id: 0, //退换货id，有值为修改
        code_sn: '', // 退换货编号
        buy_order: '', // 采购订单
        thetype: '', // 1换货 2退货
        is_full: '', // 1整单退 0 不整单
        supplier_id: '', // 供应商id
        supplier_name: '', // 供应商名称
        account_id: '', // 结算账户id
        account_name: '', // 结算账户
        item_id: '', // 结算账目id
        item_name: '', // 结算账目名称
        pay_type: '', // 付款方式
        pay_day: '', // 付款日期
        refund_ticket_status: '', // 退回发票
        refund_day: '', // 退票日期
        send_day: '', // 发货日期
        logistics_type: '', // 物流方式
        freight: '', // 承担运费
        receipt_person: '', // 收货人
        contact_tel: '', // 联系电话
        receipt_address: '', // 收货地址
        flow: '', // 审批人 1,2,3
        totals: '', // 总金额
        in_send_day: '', // 入库发货日期
        product_json: '', // 商品 json
        out_libs_info: '',// 出库信息
        rcceipt_monty_info: '', // 收款信息
        pay_tacket_info: '', // 付票信息
        in_libs_info: '' // 入库信息
    };
    //定义选中普通商品数组
    var purReproductChooseGoodsArr = [];
    //定义选中配置商品数组
    var purReproductChooseSettingArr = [];
    //定义选中配置子商品数组
    var purReproductChooseSettingGoodsArr = [];
    //审批步骤顺序数组
    var flowOrderArr = ['步骤一', '步骤二', '步骤三', '步骤四', '步骤五', '步骤六', '步骤七'];

    //推送信息

    //定义推送出库信息参数
    var purReproductToOutStockData = {
        token: token,
        related_receipts_no: '', // 关联单据编号
        output_type: 2, // 出库类型 1销售 2采购退货/采购换货 3借出出库 4借入归还 5销售换货
        related_business_name: '', // 相关往来名称
        logistics_way: '', // 物流方式 1.快递 2.陆运 3.空运 4.平邮 5.海运
        document_marker: uid, // 制单人
        remark: '', // 备注
        product_info: '', // 商品明细
        is_package_freight: '', // 是否包运费 1 是 2 否
        consignee: '', // 收货人
        consignee_tel: '', // 收货人电话
        consignee_addr: '', // 收货人地址
        output_time: '', // 出库日期
        principal: uid // 负责人
    };
    //定义推送收款信息参数
    var purReproductToReceiptData = {
        token: token,
        last_id: '', // 返回的最后id
        code_sn: '', // 相关业务单编号
        name: '', // 相关业务名称 采购是供应商 销售是客户名称
        thetype: 2, // 收款类型 1销售收款 2采购退款
        no_pay_money: '', // 应收款
        tax_status: '', // 含税状态 1未税 2含税
        account_name: '', // 结算账户
        receipt_way: '', // 收款方式1现金 2电汇 3支票
        company_account_id: '' // 账户id
    };
    //定义推送销项付票参数
    var purReproductToOutPutTicketData = {
        token: token,
        last_id: '', // 返回的最后id
        code_sn: '', // 相关业务单编号
        cs_name: '', // 相关业务名称 采购是供应商 销售是客户名称
        owner: uid, // 负责人
        company_account_id: '', // 结算账户id
        name: '', // 账户名称
        steps: ''  // 付票阶段
    };
    //推送待入库
    var purReproductToStockingInData = {
        token: token,
        related_receipts_no: '', // 关联单据编号
        input_type: 6, // 入库类型 1销售退货 2借入入库 3借出归还 4销售换货 5采购入库 6采购换货
        related_business_name: '', // 相关往来名称
        document_marker: uid, // 下单人
        remark: '', // 备注
        product_info: '', // 商品明细
        input_time: '' // 入库日期
    };

    //新建退换货
    $('#cg_thh_quote_create_btn').die('click').live('click', function () {
        cgThhCreateData = {
            token: token,
            buy_reproduct_id: 0, //退换货id，有值为修改
            code_sn: '', // 退换货编号
            buy_order: '', // 采购订单
            thetype: '', // 1换货 2退货
            is_full: '', // 1整单退 0 不整单
            supplier_id: '', // 供应商id
            supplier_name: '', // 供应商名称
            account_id: '', // 结算账户id
            account_name: '', // 结算账户
            item_id: '', // 结算账目id
            item_name: '', // 结算账目名称
            pay_type: '', // 付款方式
            pay_day: '', // 付款日期
            refund_ticket_status: '', // 退回发票
            refund_day: '', // 退票日期
            send_day: '', // 发货日期
            logistics_type: '', // 物流方式
            freight: '', // 承担运费
            receipt_person: '', // 收货人
            contact_tel: '', // 联系电话
            receipt_address: '', // 收货地址
            flow: '', // 审批人 1,2,3
            totals: '', // 总金额
            product_json: '' // 商品 json
        };
        //创建人
        $('.tanceng .cg_thh_quote_create_uname').html(uname);
        //创建时间
        $('.tanceng .cg_thh_quote_create_time').html(getCurrentDateShort());
        //退换货编号
        $('.cg_thh_create_code_sn').val(likGetCodeFn('CTH'));

        //定义选中普通商品数组
        purReproductChooseGoodsArr = [];
        //定义选中配置商品数组
        purReproductChooseSettingArr = [];
        //定义选中配置子商品数组
        purReproductChooseSettingGoodsArr = [];

        //系统设置中的审批人
        $.ajax({
            url: SERVER_URL + '/approval/person',
            type: 'GET',
            data: {
                token: token,
                thetype: 2,
                category: 6
            },
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                if (oE.code == 0) {
                    var copyList = '';
                    if (oE.is_across == 1) {
                        //跨级
                        $.each(oE.data, function (i, v) {
                            copyList += '<li flowid="' + v['id'] + '"><em class="icon_personBtn icon_personBtn_msg" style="background-image:url(' + v['face'] + ')"><i class="icon_personNext none"></i></em><em class="icon_adderBtn"></em><p class="box_adderName">' + v['name'] + ' </p></li>';
                        });
                    } else {
                        //正常
                        $.each(oE.data, function (i, v) {
                            copyList += '<li flowid="' + v['id'] + '"><em class="icon_personBtn icon_personBtn_msg" style="background-image:url(' + v['face'] + ')"><i class="icon_personNext ' + ((i == oE.data.length - 1) ? 'none' : '') + '"></i></em><em class="icon_adderBtn"></em><p class="box_adderName">' + v['name'] + ' </p><p class="box_addermsg">' + flowOrderArr[i] + '</p></li>';
                        });
                    }
                    //copyList += '<li class="ven_sell_quote_create_flow_list_add_btn"><em class="icon_personBtn icon_personBtn_add val_dialogTop ven_sell_quote_create_choose_flow_btn" name="xs_xsbjd_spr"></em></li>';
                    $('.tanceng .pur_rep_create_flow_list').html(copyList);
                }
            },
            error: function (e) {
                alert(e.msg);
                console.log(e);
            }
        });

    });

    //2.***********新建 采购订单*************

    //新建退换货-定义采购订单参数
    var buyReproductGetBuyOrderData = {
        token: token,
        page: 1,//页面
        num: 10,// 每页条数
        type: 2,//全部1团购采购2我的采购3抄送我的
        key: '' //供应商名称’  关键字
    };
    //新建退换货-选择采购订单-搜索
    $('.tanceng .cg_thh_quote_search_btn').die('click').live('click', function () {
        if ($('.tanceng .cg_thh_create_choose_quote_search_inp').val() == '搜索采购订单编号') {
            alert('请输入搜索关键字');
            buyReproductGetBuyOrderData.key = '';
        } else {
            buyReproductGetBuyOrderData.key = $('.tanceng .cg_thh_create_choose_quote_search_inp').val();
        }
        buyReproductGetBuyOrderList();
    });
    //新建退换货-获取采购订单列表
    function buyReproductGetBuyOrderList() {
        $.ajax({
            url: SERVER_URL + '/buy-order/list',
            type: 'GET',
            data: buyReproductGetBuyOrderData,
            dataType: 'json',
            success: function (oE) {
                //搜索结果
                $('#pur_order_total').html(oE.totalcount);
                console.log(oE);
                if (oE.code == 0) {
                    var datalist = oE.datalist;
                    console.log(datalist);
                    if (datalist.length == 0) {
                        $('.tanceng .pur_reproduct_choose_order_nodata_box').removeClass('none');
                        $('.tanceng .pur_reproduct_choose_order_handle').addClass('none');
                    } else {
                        $('.tanceng .pur_reproduct_choose_order_nodata_box').addClass('none');
                        $('.tanceng .pur_reproduct_choose_order_handle').removeClass('none');
                    }
                    var purOrderListHtml = '';
                    $.each(datalist, function (i, v) {
                        purOrderListHtml += '<tr purorderid="' + v['id'] + '" sid ="' + v['supplier_id'] + '" purquoteid="' + v['buy_quote_id'] + '">\
                            <td>' + ' <input type="radio" name="cg_cgdd_xzcgthhinp" ' + (i == 0 ? 'checked' : '') + '></td>\
                            <td>' + v['buy_code_sn'] + '</td>\
                            <td>' + v['supplier_name'] + '</td>\
                            <td>' + v['created_at'] + '</td>\
                            <td>' + v['dept_name'] + '</td>\
                            <td>' + v['owner_name'] + '</td>\
                            <td>' + v['totals'] + '</td>\
                            </tr>'
                    });
                    $('.tanceng .cg_thh_after_order_create_sell_order_list').html(purOrderListHtml);
                    //分页
                    list_table_render_pagination('.pur_order_pagination', buyReproductGetBuyOrderData, buyReproductGetBuyOrderList, oE.totalcount, datalist.length);
                }
            }
        });
    }

    //新建退换货-选择采购订单
    $('.tanceng .cg_thh_getbuyorder').die('click').live('click', function () {
        buyReproductGetBuyOrderList();
    });
    //负责人列表 / 审批人列表
    function venCustomCreateChooseOwnerFn() {
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
                    //负责人列表
                    $('.tanceng .cg_thh_fzr_quote_create_choose_owner_list').html(tree_list_person(datalist, deep));
                    //审批人列表
                    $('.tanceng .cg_thh_quote_spr_create_choose_flow_list').html(tree_list_person(datalist, deep));
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

    //选择负责人
    $('.tanceng .cg_thh_quote_create_choose_owner_btn').die('click').live('click', function () {
        venCustomCreateChooseOwnerFn();
        //选择负责人确认
        $('.tanceng .after_cg_create_choose_owner_save').die('click').live('click', function () {
            cgThhCreateData.owner = $('.tanceng .list_check').closest('li').attr('userinfoid');
            cgThhCreateData.dept = $('.tanceng .list_check').closest('ul.ul3').prev('.left_1').attr('cussortid');
            $('.tanceng .cg_thh_quote_create_choose_owner_inp').val($('.tanceng .list_check').closest('li').find('.list_msg').html());
            $('.tanceng .cg_thh_quote_exit_choose_owner_inp').val($('.tanceng .list_check').closest('li').find('.list_msg').html());
            $(this).closest('.dialog_box').remove();
        });
    });

    //选择审批人
    //已选审批人数组
    var purReproductFlowChosenArr = [];
    $('.tanceng .cg_thh_quote_create_choose_flow_btn').die('click').live('click', function () {
        venCustomCreateChooseOwnerFn();
    });
    //选择审批人确认
    $('.tanceng .cg_thh_quote_create_choose_flow_save').die('click').live('click', function () {
        if ($('.tanceng .list_check').length > 0) {
            if ($.inArray($('.tanceng .list_check').closest('li').attr('userinfoid'), purReproductFlowChosenArr) == -1) {
                purReproductFlowChosenArr.push($('.tanceng .list_check').closest('li').attr('userinfoid'));
                $('.tanceng .cg_thh_quote_create_flow_list .cg_thh_quote_create_flow_list_add_btn').before('<li flowid ="' + $('.tanceng .list_check').closest('li').attr('userinfoid') + '"><i class="ven_sell_quote_create_flow_del_btn">-</i><em class="icon_personBtn icon_personBtn_msg"><i class="icon_personNext"></i></em><em class="icon_adderBtn"></em><p class="box_adderName">' + $('.tanceng .list_check').closest('li').find('.list_msg').html() + '</p><p class="box_addermsg"></p></li>');
            } else {
                alert('请不要重复选择审批人');
                return false;
            }
        }
        //步骤显示
        $.each($('.tanceng .cg_thh_quote_create_flow_list .box_addermsg'), function (i, v) {
            $('.tanceng .cg_thh_quote_create_flow_list .box_addermsg').eq(i).html(purReproductFlowOrderArr[i]);
        });
        $(this).closest('.dialog_box').remove();
    });
    $('.ven_sell_quote_create_flow_del_btn').die('click').live('click', function () {
        var index = $(this).closest('li').index();
        purReproductFlowChosenArr.splice(index, 1);
        $(this).closest('li').remove();
    });

    //5.*******新建退换货 选择退换货商品*****
    $('.tanceng .cg_thh_create_cg_exchange_goods').die('click').live('click', function () {
        $('.tanceng .cg_thh_create_choose_goods_sell_btn').html('<i></i>选择换货商品');
        cgThhCreateData.thetype = 1;
    });
    $('.tanceng .cg_thh_create_cg_return_goods').die('click').live('click', function () {
        $('.tanceng .cg_thh_create_choose_goods_sell_btn').html('<i></i>选择退货商品');
        cgThhCreateData.thetype = 2;
    });

    //新建退换货 - 选择订单保存
    var purReproductProductChosenIndexArr = [];
    $('.tanceng .cg_thh_create_choose_quote_save').die('click').live('click', function () {
        var chosenOrder = $('.tanceng .cg_thh_after_order_create_sell_order_list input:checked').closest('tr');
        //新建
        cgThhCreateData.buy_order = chosenOrder.attr('purorderid');
        cgThhCreateData.supplier_id = chosenOrder.attr('sid');
        cgThhCreateData.supplier_name = chosenOrder.find('td').eq(2).html();
        $('.tanceng .cg_thh_link_quote_buy_id').val(chosenOrder.find('td').eq(1).html()).css('color', '#333');
        $('.tanceng .cg_thh_create_supplier_name').val(chosenOrder.find('td').eq(2).html());
        $(this).closest('.dialog_box').remove();

        //退货换货切换
        if ($('.tanceng .pur_reproduct_create_type_inp').val() == '退货') {
            $('.cg_thh_type').css('height', '80');
            $('.cg_thh_type label').removeClass('none');
            $('.cg_thh_type p').removeClass('none');
            $('.cg_thh_THbox').removeClass('none');
            $('.cg_thh_HHbox').addClass('none');
        } else if ($('.tanceng .pur_reproduct_create_type_inp').val() == '换货') {
            $('.cg_thh_type').css('height', '30');
            $('.cg_thh_type label').addClass('none');
            $('.cg_thh_type p').addClass('none');
            $('.cg_thh_HHbox').removeClass('none');
            $('.cg_thh_THbox').addClass('none');
        }
        $('.cg_shd_new_addBox').removeClass('none');
        $('.cg_shd_t_textarea .t_left').css('margin-left', '0');
        $('.cg_shd_new').css('width', '1200');
        $('.cg_shd_new_input').css('width', '56%');

        //获取采购订单详情
        $.ajax({
            url: SERVER_URL + '/buy-order/info',
            type: 'GET',
            data: {
                token: token,
                buy_order_id: cgThhCreateData.buy_order
            },
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                if (oE.code == 0) {
                    var data = oE.data;
                    console.log(data);
                    //结算账户信息
                    $('.tanceng .pur_reproduct_create_account_name').val(data['account_name']);
                    cgThhCreateData.account_id = data['account_id'];
                    cgThhCreateData.account_name = data['account_name'];
                    //结算账目信息
                    $('.tanceng .pur_reproduct_create_choice_cuenta').val(data['choice_cuenta_name']);
                    cgThhCreateData.item_id = data['choice_cuenta'];
                    cgThhCreateData.item_name = data['choice_cuenta_name'];

                    if ($('.tanceng .pur_reproduct_create_type_inp').val() == '退货') {
                        if (data['contacts'].length > 0) {
                            var supConHtml = '';
                            $.each(data['contacts'], function (i, v) {
                                supConHtml += '<li contel="' + v['contact_tel'] + '">' + v['contact_person'] + '</li>';
                            });
                            $('.pur_reproduct_create_choose_receipt_person_ul').html(supConHtml);
                        }
                        //收货地址
                        $('.tanceng .pur_reproduct_create_address').val(data['address']);
                        $('.tanceng .pur_reproduct_create_hh_address').val(data['address']);
                    }
                    //基本商品信息
                    var purReproductCreateGoodsTh = '';
                    var purReproductCreateGoodsHh = '';
                    if (data['in_libs_goods'] && data['in_libs_goods']['goods']) {
                        $.each(data['in_libs_goods']['goods']['goods'], function (i, v) {
                            purReproductCreateGoodsTh += '<tr goodsid="' + v['good_id'] + '">\
                                                        <td><input class="pur_rep_create_disabled_checkbox" type="checkbox" name="xs_thh_check1"></td>\
                                                        <td>' + v['good_sn'] + '</td>\
                                                        <td>' + v['good_name'] + '</td>\
                                                        <td>' + v['good_attr'] + '</td>\
                                                        <td>' + v['good_num'] + '</td>\
                                                        <td><div class="xs_num_input num_input inline_block num_input_new"><button disabled class="but_grey_a but_opa_small inp_plus pur_rep_create_th_goods_productnum_change">+</button><input type="text" class="lik_input_number productnum" maxnum="' + v['good_num'] + '" value="0" disabled><button class="but_grey_a but_opa_small radius_left_0 inp_reduce pur_rep_create_th_goods_productnum_change" disabled>-</button></div></td>\
                                                        <td class="pur_rep_create_th_goods_cost_danjia">' + v['good_rate_price'] + '</td>\
                                                        <td><input type="text" class="lik_input_number time_input c_3 pur_rep_create_goods_cost_one_inp" costmax="' + v['good_rate_price'] + '" value="0" style="width:60px;" disabled></td>\
                                                        <td class="pur_rep_create_cost_reset pur_rep_create_goods_cost_one">0</td>\
                                                    </tr>';
                            purReproductCreateGoodsHh += '<tr goodsid="' + v['good_id'] + '">\
                                                        <td><input class="pur_rep_create_disabled_checkbox" type="checkbox" name="xs_thh_check1"></td>\
                                                        <td>' + v['good_sn'] + '</td>\
                                                        <td>' + v['good_name'] + '</td>\
                                                        <td>' + v['good_attr'] + '</td>\
                                                        <td>' + v['good_num'] + '</td>\
                                                        <td><div class="xs_num_input num_input inline_block num_input_new"><button class="but_grey_a but_opa_small inp_plus pur_rep_create_hh_productnum_change" disabled>+</button><input type="text" class="lik_input_number productnum" maxnum="' + v['good_num'] + '" value="0" disabled><button class="but_grey_a but_opa_small radius_left_0 inp_reduce pur_rep_create_hh_productnum_change" disabled>-</button></div></td>\
                                                    </tr>'
                        });
                        $('.tanceng .pur_reproduct_create_th_goods_tbody').html(purReproductCreateGoodsTh);
                        $('.tanceng .pur_reproduct_create_hh_goods_tbody').html(purReproductCreateGoodsHh);
                    } else {
                        $('.tanceng .pur_reproduct_create_th_goods').addClass('none');
                        $('.tanceng .pur_reproduct_create_hh_goods').addClass('none');
                    }
                    //整机商品信息
                    var purReproductCreateSettingTh = '';
                    var purReproductCreateSettingHh = '';
                    if (data['in_libs_goods'] && data['in_libs_goods']['setting']) {
                        $.each(data['in_libs_goods']['setting']['setting'], function (i, v) {
                            var settingGoodsHtmlTh = '';
                            var settingGoodsHtmlHh = '';
                            $.each(v['good_list'], function (i2, v2) {
                                var attrListTh = '';
                                var attrListHh = '';
                                $.each(v2['attr_list'], function (i3, v3) {
                                    attrListTh += '<tr goodsid="' + v3['good_id'] + '">\
                                                        <td><input class="pur_rep_create_disabled_checkbox pur_rep_create_th_setting_child_disabled_checkbox" type="checkbox"></td>\
                                                        <td>' + v3['good_sn'] + '</td>\
                                                        <td>' + v3['good_attr'] + '</td>\
                                                        <td>' + v3['total_num'] + '</td>\
                                                        <td><div class="xs_num_input num_input inline_block num_input_new"><button class="but_grey_a but_opa_small inp_plus pur_rep_create_th_productnum_change" disabled>+</button><input type="text" class="lik_input_number productnum pur_rep_create_th_setting_child_num_inp" maxnum="' + v3['total_num'] + '" value="0" disabled><button class="but_grey_a but_opa_small radius_left_0 inp_reduce pur_rep_create_th_productnum_change" disabled>-</button></div></td>\
                                                        <td class="pur_rep_create_th_setting_child_cost_danjia">' + v3['good_rate_price'] + '</td>\
                                                        <td><input type="text" class="lik_input_number time_input c_3 pur_rep_create_setting_goods_cost_one_inp" costmax="' + v3['good_rate_price'] + '" value="0" style="width:60px;" disabled></td>\
                                                        <td class="pur_rep_create_cost_reset pur_rep_create_setting_goods_cost_one">0</td>\
                                                    </tr>';
                                    attrListHh += '<tr goodsid="' + v3['good_id'] + '">\
                                                        <td><input class="pur_rep_create_disabled_checkbox" type="checkbox"></td>\
                                                        <td>' + v3['good_sn'] + '</td>\
                                                        <td>' + v3['good_attr'] + '</td>\
                                                        <td>' + v3['total_num'] + '</td>\
                                                        <td><div class="xs_num_input num_input inline_block num_input_new"><button class="but_grey_a but_opa_small inp_plus pur_rep_create_hh_productnum_change" disabled>+</button><input type="text" maxnum="' + v3['total_num'] + '" class="lik_input_number productnum" value="0" disabled><button class="but_grey_a but_opa_small radius_left_0 inp_reduce pur_rep_create_hh_productnum_change" disabled>-</button></div></td>\
                                                    </tr>';
                                });
                                settingGoodsHtmlTh += '<div class="box_open_list goods_tc_toggle">\
                                                    <p class="box_open_head" style="background: rgb(255, 255, 255); border-radius: 3px;"><span class="cont_title"style="padding-left: 0;margin-left: 0;">' + v2['title'] + '</span></p>\
                                                    <div class="container">\
                                                    <table>\
                                                    <thead>\
                                                    <tr>\
                                                    <th width="32">选择</th>\
                                                    <th width="140">编号</th>\
                                                    <th width="353">属性</th>\
                                                    <th width="55">采购数量</th>\
                                                    <th width="80">退货数量</th>\
                                                    <th width="110">采购价</th>\
                                                    <th width="110">退货单价</th>\
                                                    <th width="110">退款总价</th>\
                                                    </tr>\
                                                    </thead>\
                                                    <tbody>' + attrListTh + '</tbody>\
                                                </table>\
                                                </div>\
                                                </div>';
                                settingGoodsHtmlHh += '<div class="box_open_list goods_tc_toggle">\
                                                    <p class="box_open_head" style="background: rgb(255, 255, 255); border-radius: 3px;"><span class="cont_title"style="padding-left: 0;margin-left: 0;">' + v2['title'] + '</span></p>\
                                                    <div class="container">\
                                                    <table>\
                                                    <thead>\
                                                    <tr>\
                                                    <th width="32">选择</th>\
                                                    <th width="170">编号</th>\
                                                    <th width="558">属性</th>\
                                                    <th width="80">采购数量</th>\
                                                    <th width="140">换货数量</th>\
                                                    </tr>\
                                                    </thead>\
                                                    <tbody>' + attrListHh + '</tbody>\
                                                </table>\
                                                </div>\
                                                </div>';
                            });
                            purReproductCreateSettingTh += '<div class="pur_rep_create_th_setting_one_box"><div class="xs_div_2">\
                                <div class="container">\
                                <table>\
                                <thead>\
                                <tr>\
                                <th width="32">选择</th>\
                                <th width="140">编号</th>\
                                <th width="100">名称</th>\
                                <th width="263">属性</th>\
                                <th width="55">采购数量</th>\
                                <th width="80">退货数量</th>\
                                <th width="110">采购价</th>\
                                <th width="80">退货单价</th>\
                                <th width="110">退款总价</th>\
                                <th width="60">配件</th>\
                                </tr>\
                                </thead>\
                                <tbody>\
                                <tr settingid="' + v['setting_id'] + '">\
                                <td><input class="pur_rep_create_disabled_checkbox pur_rep_create_th_setting_parent_disabled_checkbox" type="checkbox" name="xs_thh_check2"></td>\
                                <td>' + v['setting_sn'] + '</td>\
                                <td>' + v['setting_name'] + '</td>\
                            <td>' + v['setting_attr'] + '</td>\
                            <td>' + v['setting_num'] + '</td>\
                            <td><div class="xs_num_input num_input inline_block num_input_new"><button class="but_blue but_opa_small inp_plus pur_rep_create_th_setting_num_change_btn" disabled>+</button><input type="text" value="0" maxnum="' + v['setting_num'] + '" class="lik_input_number productnum pur_rep_create_th_setting_parent_num_inp" style="border:1px solid #23a2f3;" disabled><button class="but_blue but_opa_small radius_left_0 inp_reduce pur_rep_create_th_setting_num_change_btn" disabled>-</button></div></td>\
                                <td class="pur_rep_create_th_setting_parent_cost_danjia">' + v['setting_rate_price'] + '</td>\
                            <td><input type="text" class="lik_input_number time_input c_3 pur_rep_create_th_setting_parent_cost_inp" costmax="' + v['setting_rate_price'] + '" value="0" style="width:60px;" disabled></td>\
                                <td class="pur_rep_create_cost_reset pur_rep_create_setting_parent_cost">0</td>\
                            <td><button class="but_mix box_open_btn_1 but_blue_1 pur_rep_create_setting_zksq_btn">展开</button></td>\
                                </tr>\
                                </tbody>\
                                </table>\
                                </div>\
                                </div>\
                                <div class="xs_xsbjd_table_t2 pur_rep_create_setting_children_box none" style="padding: 10px;border-bottom: 2px solid #e6e6e6;">\
                                ' + settingGoodsHtmlTh + '\
                            </div>\
                            </div>';
                            purReproductCreateSettingHh += '<div class="pur_rep_create_hh_setting_one_box"><div class="xs_div_2">\
                                <div class="container">\
                                <table>\
                                <thead>\
                                <tr>\
                                <th width="32">选择</th>\
                                <th width="140">编号</th>\
                                <th width="120">名称</th>\
                                <th width="500">属性</th>\
                                <th width="80">采购数量</th>\
                                <th width="98">换货数量</th>\
                                <th width="60">配件</th>\
                                </tr>\
                                </thead>\
                                <tbody>\
                                <tr settingid="' + v['setting_id'] + '">\
                                <td><input class="pur_rep_create_disabled_checkbox pur_rep_create_hh_disabled_checkbox" type="checkbox" name="xs_thh_check2"></td>\
                                <td>' + v['setting_sn'] + '</td>\
                                <td>' + v['setting_name'] + '</td>\
                            <td>' + v['setting_attr'] + '</td>\
                            <td>' + v['setting_num'] + '</td>\
                            <td><div class="xs_num_input num_input inline_block num_input_new"><button class="but_blue but_opa_small inp_plus pur_rep_create_hh_productnum_change" disabled>+</button><input type="text" value="0" maxnum="' + v['setting_num'] + '" class="lik_input_number productnum" style="border:1px solid #23a2f3;" disabled><button class="but_blue but_opa_small radius_left_0 inp_reduce pur_rep_create_hh_productnum_change" disabled>-</button></div></td>\
                            <td><button class="but_mix box_open_btn_1 but_blue_1 pur_rep_create_setting_zksq_btn">展开</button></td>\
                                </tr>\
                                </tbody>\
                                </table>\
                                </div>\
                                </div>\
                                <div class="xs_xsbjd_table_t2 pur_rep_create_setting_children_box none" style="padding: 10px;border-bottom: 2px solid #e6e6e6;">\
                                ' + settingGoodsHtmlHh + '\
                            </div>\
                            </div>';
                        });
                        $('.tanceng .pur_reproduct_create_th_setting_box').html(purReproductCreateSettingTh);
                        $('.tanceng .pur_reproduct_create_hh_setting_box').html(purReproductCreateSettingHh);
                    } else {
                        $('.tanceng .pur_reproduct_create_th_setting').addClass('none');
                        $('.tanceng .pur_reproduct_create_hh_setting').addClass('none');
                    }

                    //推送收款
                    purReproductToReceiptData.tax_status = data['tax_rate'];
                }
            },
            error: function (e) {
                alert(e.msg);
                console.log(e);
            }
        });

    });

    //输入框disabled改变
    $('.tanceng .pur_rep_create_disabled_checkbox').die('click').live('click', function () {
        if ($(this).attr('checked') == 'checked' && $('.tanceng .pur_rep_create_zhesun_checkbox').attr('checked') == null) {
            $(this).closest('tr').find('input,button').attr('disabled', false);
        } else if ($(this).attr('checked') == 'checked' && $('.tanceng .pur_rep_create_zhesun_checkbox').attr('checked') == 'checked') {
            $(this).closest('tr').find('input.pur_rep_create_goods_cost_one_inp').attr('disabled', true);
            $(this).closest('tr').find('input.productnum').attr('disabled', false);
            $(this).closest('tr').find('button:not(".pur_rep_create_setting_zksq_btn")').attr('disabled', false);
        } else {
            $(this).closest('tr').find('input:not(".pur_rep_create_disabled_checkbox"),button:not(".pur_rep_create_setting_zksq_btn")').attr('disabled', true);
            $(this).closest('tr').find('input:text').val('0');
            $(this).closest('tr').find('.pur_rep_create_cost_reset').html('0');
        }
        purRepThGoodsCost();
        purRepThSettingCost();
    });

    //退货

    //改变普通商品退货单价
    $('.tanceng .pur_rep_create_goods_cost_one_inp').live('keyup', function () {
        if (parseFloat($(this).val()) > parseFloat($(this).attr('costmax'))) {
            $(this).val($(this).attr('costmax'));
        }
        purRepThGoodsCost();
    });
    //点击改变普通商品数量
    $('.tanceng .pur_rep_create_th_goods_productnum_change').die('click').live('click', function () {
        if (parseFloat($(this).siblings('input').val()) > parseFloat($(this).siblings('input').attr('maxnum'))) {
            alert('已达到上限');
            $(this).siblings('input').val($(this).siblings('input').attr('maxnum'))
        }
        purRepCostZsl();
        purRepThGoodsCost();
    });
    //输入商品数量
    $('.tanceng .productnum').live('keyup', function () {
        if (parseFloat($(this).val()) > parseFloat($(this).attr('maxnum'))) {
            alert('已达到上限');
            $(this).val($(this).attr('maxnum'));
        }
        purRepCostZsl();
        purRepThGoodsCost();
    });

    //普通商品价格控制函数
    function purRepThGoodsCost() {
        var goodsTr = $('.tanceng .pur_reproduct_create_th_goods_tbody tr');
        //单条商品价格
        var costTotal = 0;
        $.each(goodsTr, function (i, v) {
            if (goodsTr.eq(i).find('input:checkbox').attr('checked') == 'checked') {
                goodsTr.eq(i).find('.pur_rep_create_goods_cost_one').html(moneyToFixed(parseFloat(goodsTr.eq(i).find('input.productnum').val()) * parseFloat(goodsTr.eq(i).find('.pur_rep_create_goods_cost_one_inp').val())));
                costTotal += parseFloat(goodsTr.eq(i).find('.pur_rep_create_goods_cost_one').html());
            } else {
                goodsTr.eq(i).find('.pur_rep_create_cost_reset').html(0);
            }
        });
        //商品价格合计
        $('.pur_rep_create_goods_cost_hj').html(costTotal);
        $('.tanceng .ven_sell_quote_create_cost_tax_total').html(moneyToFixed(parseFloat($('.tanceng .pur_rep_create_other_fee').val()) + parseFloat($('.tanceng .pur_rep_create_goods_cost_hj').html()) + parseFloat($('.tanceng .pur_rep_create_setting_cost_hj').html())));
    }

    //整机商品选择父级整机checkbox
    $('.tanceng .pur_rep_create_th_setting_parent_disabled_checkbox').die('click').live('click', function () {
        if ($(this).attr('checked') == 'checked') {
            $(this).closest('.pur_rep_create_th_setting_one_box').find('.pur_rep_create_th_setting_child_disabled_checkbox').attr('checked', true).attr('disabled', true);
            $(this).closest('.pur_rep_create_th_setting_one_box').find('input.pur_rep_create_th_setting_child_num_inp,input.pur_rep_create_setting_goods_cost_one_inp').val('0').attr('disabled', true);
            $(this).closest('.pur_rep_create_th_setting_one_box').find('.pur_rep_create_cost_reset').html('0');
        } else {
            $(this).closest('.pur_rep_create_th_setting_one_box').find('.pur_rep_create_th_setting_child_disabled_checkbox').attr('checked', false).attr('disabled', false);
        }
    });

    //改变整机商品配件商品退货单价
    $('.tanceng .pur_rep_create_setting_goods_cost_one_inp').live('keyup', function () {
        if (parseFloat($(this).val()) > parseFloat($(this).attr('costmax'))) {
            $(this).val($(this).attr('costmax'));
        }
        purRepThSettingCost();
    });

    //改变整机商品退货单价
    $('.tanceng .pur_rep_create_th_setting_parent_cost_inp').live('keyup', function () {
        if (parseFloat($(this).val()) > parseFloat($(this).attr('costmax'))) {
            $(this).val($(this).attr('costmax'));
        }
        purRepThSettingCost();
    });

    //整机商品输入整机数量
    $('.tanceng .pur_rep_create_th_setting_parent_num_inp').live('keyup', function () {
        purRepCostZsl();
        purRepThSettingCost();
    });

    //整机商品点击改变整机数量
    $('.tanceng .pur_rep_create_th_setting_num_change_btn').die('click').live('click', function () {
        if (parseFloat($(this).siblings('input').val()) > parseFloat($(this).siblings('input').attr('maxnum'))) {
            alert('已达到上限');
            $(this).siblings('input').val($(this).siblings('input').attr('maxnum'));
        }
        purRepCostZsl();
        purRepThSettingCost();
    });
    //整机商品配件点击改变整机数量
    $('.tanceng .pur_rep_create_th_productnum_change').die('click').live('click', function () {
        if (parseFloat($(this).siblings('input').val()) > parseFloat($(this).siblings('input').attr('maxnum'))) {
            alert('已达到上限');
            $(this).siblings('input').val($(this).siblings('input').attr('maxnum'));
        }
        purRepCostZsl();
        purRepThSettingCost();
    });

    //整机商品价格控制函数
    function purRepThSettingCost() {
        //父级
        var settingTr = $('.tanceng .pur_reproduct_create_th_setting_box .xs_div_2 tbody tr');
        var settingCostTotal = 0;
        $.each(settingTr, function (i, v) {
            if (settingTr.eq(i).find('.pur_rep_create_th_setting_parent_disabled_checkbox').attr('checked') == 'checked') {
                settingTr.eq(i).find('.pur_rep_create_setting_parent_cost').html(moneyToFixed(parseFloat(settingTr.eq(i).find('.pur_rep_create_th_setting_parent_cost_inp').val()) * parseFloat(settingTr.eq(i).find('.pur_rep_create_th_setting_parent_num_inp').val())));
                settingCostTotal += parseFloat(settingTr.eq(i).find('.pur_rep_create_setting_parent_cost').html());
            } else {
                var settingChildTr = settingTr.eq(i).closest('.pur_rep_create_th_setting_one_box').find('.pur_rep_create_setting_children_box tbody tr');
                $.each(settingChildTr, function (i2, v2) {
                    if (settingChildTr.eq(i2).find('.pur_rep_create_th_setting_child_disabled_checkbox').attr('checked') == 'checked') {
                        settingChildTr.eq(i2).find('.pur_rep_create_setting_goods_cost_one').html(moneyToFixed(parseFloat(settingChildTr.eq(i2).find('.pur_rep_create_setting_goods_cost_one_inp').val()) * parseFloat(settingChildTr.eq(i2).find('.pur_rep_create_th_setting_child_num_inp').val())));
                        settingCostTotal += parseFloat(settingChildTr.eq(i2).find('.pur_rep_create_setting_goods_cost_one').text());
                    }
                });
            }
        });

        //合计价格
        $('.tanceng .pur_rep_create_setting_cost_hj').html(moneyToFixed(settingCostTotal));
        $('.tanceng .ven_sell_quote_create_cost_tax_total').html(moneyToFixed(parseFloat($('.tanceng .pur_rep_create_other_fee').val()) + parseFloat($('.tanceng .pur_rep_create_goods_cost_hj').html()) + parseFloat($('.tanceng .pur_rep_create_setting_cost_hj').html())));
    }


    //折损选中
    $('.tanceng .pur_rep_create_zhesun_checkbox').die('click').live('click', function () {
        //基本商品
        var goodsTr = $('.tanceng .pur_reproduct_create_th_goods tbody tr');
        //整机商品
        var settingTr = $('.tanceng .pur_reproduct_create_th_setting_box tbody tr');
        if ($(this).attr('checked') == 'checked') {
            //折扣率
            $('.tanceng .pur_rep_create_zsl_inp').attr('disabled', false);
            $.each(goodsTr, function (i, v) {
                goodsTr.eq(i).find('.pur_rep_create_goods_cost_one_inp').attr('disabled', true);
            });
            $.each(settingTr, function (i, v) {
                settingTr.eq(i).find('.pur_rep_create_th_setting_parent_cost_inp,.pur_rep_create_setting_goods_cost_one_inp').attr('disabled', true);
            });
        } else if ($('.tanceng .pur_rep_create_th_zdt_checkbox').attr('checked') != 'checked') {
            //折扣率
            $('.tanceng .pur_rep_create_zsl_inp').attr('disabled', true).val(0);
            $.each(goodsTr, function (i, v) {
                if (goodsTr.eq(i).find('.pur_rep_create_disabled_checkbox').attr('checked') == 'checked') {
                    goodsTr.eq(i).find('.pur_rep_create_goods_cost_one_inp').attr('disabled', false);
                } else {
                    goodsTr.eq(i).find('.pur_rep_create_goods_cost_one_inp').attr('disabled', true);
                }
            });
            $.each(settingTr, function (i, v) {
                if (settingTr.eq(i).find('.pur_rep_create_th_setting_parent_disabled_checkbox').attr('checked') == 'checked') {
                    settingTr.eq(i).find('.pur_rep_create_th_setting_parent_cost_inp').attr('disabled', false);
                } else {
                    settingTr.eq(i).find('.pur_rep_create_th_setting_parent_cost_inp').attr('disabled', true);
                }
            });
        } else {
            //折扣率
            $('.tanceng .pur_rep_create_zsl_inp').attr('disabled', true).val(0);
            purRepZhengtuiCost();
        }
        purRepCostZsl();
    });

    //折损率计算
    function purRepCostZsl() {
        //基本商品
        var goodsTr = $('.tanceng .pur_reproduct_create_th_goods tbody tr');
        //整机父级商品
        var settingParentTr = $('.tanceng .pur_reproduct_create_th_setting_box .xs_div_2 tbody tr');
        //整机子级商品
        var settingChildTr = $('.tanceng .pur_reproduct_create_th_setting_box .xs_xsbjd_table_t2 tbody tr');
        if ($('.tanceng .pur_rep_create_zhesun_checkbox').attr('checked') == 'checked') {
            var goodsTotal = 0;
            $.each(goodsTr, function (i, v) {
                if (goodsTr.eq(i).find('.pur_rep_create_disabled_checkbox').attr('checked') == 'checked') {
                    goodsTr.eq(i).find('.pur_rep_create_goods_cost_one_inp').val(moneyToFixed(parseFloat(goodsTr.eq(i).find('.pur_rep_create_th_goods_cost_danjia').text()) * parseFloat($('.tanceng .pur_rep_create_zsl_inp').val()) / 100));
                    //goodsTr.eq(i).find('.pur_rep_create_goods_cost_one_inp').val(moneyToFixed(parseFloat(goodsTr.eq(i).find('.productnum').val()) * parseFloat(goodsTr.eq(i).find('.pur_rep_create_th_goods_cost_danjia').text()) * parseFloat($('.tanceng .pur_rep_create_zsl_inp').val()) / 100));
                    goodsTr.eq(i).find('.pur_rep_create_goods_cost_one').html(moneyToFixed(parseFloat(goodsTr.eq(i).find('.productnum').val()) * parseFloat(goodsTr.eq(i).find('.pur_rep_create_th_goods_cost_danjia').text()) * parseFloat($('.tanceng .pur_rep_create_zsl_inp').val()) / 100));
                    goodsTotal += parseFloat(goodsTr.eq(i).find('.pur_rep_create_goods_cost_one').html());
                }
            });
            $('.tanceng .pur_rep_create_goods_cost_hj').html(goodsTotal);
            $.each(settingParentTr, function (i, v) {
                if (settingParentTr.eq(i).find('.pur_rep_create_disabled_checkbox').attr('checked') == 'checked') {
                    settingParentTr.eq(i).find('.pur_rep_create_th_setting_parent_cost_inp').val(moneyToFixed(parseFloat(settingParentTr.eq(i).find('.pur_rep_create_th_setting_parent_cost_danjia').text()) * parseFloat($('.tanceng .pur_rep_create_zsl_inp').val()) / 100));
                    //settingParentTr.eq(i).find('.pur_rep_create_th_setting_parent_cost_inp').val(moneyToFixed(parseFloat(settingParentTr.eq(i).find('.pur_rep_create_th_setting_parent_num_inp').val()) * parseFloat(settingParentTr.eq(i).find('.pur_rep_create_th_setting_parent_cost_danjia').text()) * parseFloat($('.tanceng .pur_rep_create_zsl_inp').val()) / 100));
                    settingParentTr.eq(i).find('.pur_rep_create_setting_parent_cost').html(moneyToFixed(parseFloat(settingParentTr.eq(i).find('.pur_rep_create_th_setting_parent_num_inp').val()) * parseFloat(settingParentTr.eq(i).find('.pur_rep_create_th_setting_parent_cost_danjia').text()) * parseFloat($('.tanceng .pur_rep_create_zsl_inp').val()) / 100));
                }
            });
            $.each(settingChildTr, function (i, v) {
                if (settingChildTr.eq(i).find('.pur_rep_create_th_setting_child_disabled_checkbox').attr('checked') == 'checked') {
                    settingChildTr.eq(i).find('.pur_rep_create_setting_goods_cost_one_inp').val(moneyToFixed(parseFloat(settingChildTr.eq(i).find('.pur_rep_create_th_setting_child_cost_danjia').text()) * parseFloat($('.tanceng .pur_rep_create_zsl_inp').val()) / 100));
                    //settingChildTr.eq(i).find('.pur_rep_create_setting_goods_cost_one_inp').val(moneyToFixed(parseFloat(settingChildTr.eq(i).find('.pur_rep_create_th_setting_child_num_inp').val()) * parseFloat(settingChildTr.eq(i).find('.pur_rep_create_th_setting_child_cost_danjia').text()) * parseFloat($('.tanceng .pur_rep_create_zsl_inp').val()) / 100));
                    settingChildTr.eq(i).find('.pur_rep_create_setting_goods_cost_one').html(moneyToFixed(parseFloat(settingChildTr.eq(i).find('.pur_rep_create_th_setting_child_num_inp').val()) * parseFloat(settingChildTr.eq(i).find('.pur_rep_create_th_setting_child_cost_danjia').text()) * parseFloat($('.tanceng .pur_rep_create_zsl_inp').val()) / 100));
                }
            });
        }
        $('.tanceng .ven_sell_quote_create_cost_tax_total').html(moneyToFixed(parseFloat($('.tanceng .pur_rep_create_other_fee').val()) + parseFloat($('.tanceng .pur_rep_create_goods_cost_hj').html()) + parseFloat($('.tanceng .pur_rep_create_setting_cost_hj').html())));
    }

    //改变折损率
    $('.tanceng .pur_rep_create_zsl_inp').live('keyup', function () {
        if (parseFloat($(this).val()) > 100)$(this).val(100);
        purRepCostZsl();
        purRepThGoodsCost();
        purRepThSettingCost();
    });

    //整单退
    $('.tanceng .pur_rep_create_th_zdt_checkbox').die('click').live('click', function () {
        if ($(this).attr('checked') == 'checked') {
            $('.tanceng .pur_reproduct_create_th_goods input:checkbox').attr('checked', true);
            $('.tanceng .pur_reproduct_create_th_setting_box input:checkbox').attr('checked', true);
            $('.tanceng .pur_reproduct_create_th_goods input,.tanceng button:not(".pur_rep_create_setting_zksq_btn")').attr('disabled', true);
            $('.tanceng .pur_reproduct_create_th_setting_box input,.tanceng button:not(".pur_rep_create_setting_zksq_btn")').attr('disabled', true);
            purRepZhengtuiCost();
        } else {
            $('.tanceng .pur_reproduct_create_th_goods input:checkbox').attr('checked', false).attr('disabled', false);
            $('.tanceng .pur_reproduct_create_th_setting_box input:checkbox').attr('checked', false).attr('disabled', false);
        }
        $('.tanceng .pur_rep_create_zhesun_checkbox').attr('checked', false);
        $('.tanceng .pur_rep_create_zsl_inp').attr('disabled', true).val(0);

        $('.tanceng .pur_reproduct_create_submit_btn').attr('disabled', false);
        $('.tanceng .but_cancel').attr('disabled', false);

    });

    //整单退金额计算
    function purRepZhengtuiCost() {
        var goodsTotal = 0;
        $.each($('.pur_reproduct_create_th_goods input.productnum'), function (i, v) {
            $('.pur_reproduct_create_th_goods input.productnum').eq(i).val($('.pur_reproduct_create_th_goods input.productnum').eq(i).attr('maxnum'));
            $('.pur_reproduct_create_th_goods input.pur_rep_create_goods_cost_one_inp').eq(i).val($('.pur_reproduct_create_th_goods .pur_rep_create_th_goods_cost_danjia').eq(i).text());
            $('.pur_reproduct_create_th_goods .pur_rep_create_goods_cost_one').eq(i).html(moneyToFixed(parseFloat($('.pur_reproduct_create_th_goods input.productnum').eq(i).attr('maxnum')) * parseFloat($('.pur_reproduct_create_th_goods .pur_rep_create_th_goods_cost_danjia').eq(i).text())));
            goodsTotal += parseFloat($('.pur_reproduct_create_th_goods .pur_rep_create_goods_cost_one').eq(i).html());
        });
        $('.tanceng .pur_rep_create_goods_cost_hj').html(goodsTotal);
        var settingTotal = 0;
        $.each($('.pur_reproduct_create_th_setting_box .pur_rep_create_th_setting_parent_num_inp'), function (i, v) {
            $('.pur_reproduct_create_th_setting_box .pur_rep_create_th_setting_parent_num_inp').eq(i).val($('.pur_reproduct_create_th_setting_box .pur_rep_create_th_setting_parent_num_inp').eq(i).attr('maxnum'));
            $('.pur_reproduct_create_th_setting_box .pur_rep_create_th_setting_parent_cost_inp').eq(i).val($('.pur_reproduct_create_th_setting_box .pur_rep_create_th_setting_parent_cost_danjia').eq(i).text());
            $('.pur_reproduct_create_th_setting_box .pur_rep_create_setting_parent_cost').eq(i).html(moneyToFixed(parseFloat($('.pur_reproduct_create_th_setting_box .pur_rep_create_th_setting_parent_cost_danjia').eq(i).text()) * parseFloat($('.pur_reproduct_create_th_setting_box .pur_rep_create_th_setting_parent_num_inp').eq(i).val())));
            settingTotal += parseFloat($('.pur_reproduct_create_th_setting_box .pur_rep_create_setting_parent_cost').eq(i).html());
        });
        $('.tanceng .pur_rep_create_setting_cost_hj').html(settingTotal);

        $('.tanceng .ven_sell_quote_create_cost_tax_total').html(moneyToFixed(parseFloat($('.tanceng .pur_rep_create_other_fee').val()) + parseFloat($('.tanceng .pur_rep_create_goods_cost_hj').html()) + parseFloat($('.tanceng .pur_rep_create_setting_cost_hj').html())));
    }

    //其他费用
    $('.tanceng .pur_rep_create_other_fee').live('keyup', function () {
        $('.tanceng .ven_sell_quote_create_cost_tax_total').html(moneyToFixed(parseFloat($('.tanceng .pur_rep_create_other_fee').val()) + parseFloat($('.tanceng .pur_rep_create_goods_cost_hj').html()) + parseFloat($('.tanceng .pur_rep_create_setting_cost_hj').html())));
    });

    //换货
    //基本商品数量控制
    $('.tanceng .pur_rep_create_hh_productnum_change').die('click').live('click', function () {
        if (parseFloat($(this).siblings('input.productnum').val()) > parseFloat($(this).siblings('input.productnum').attr('maxnum'))) {
            $(this).siblings('input.productnum').val($(this).siblings('input.productnum').attr('maxnum'));
        }
    });
    //选择整机商品父级CheckBox
    $('.tanceng .pur_rep_create_hh_disabled_checkbox').die('click').live('click', function () {
        if ($(this).attr('checked') == 'checked') {
            $(this).closest('.pur_rep_create_hh_setting_one_box').find('.goods_tc_toggle input:checkbox').attr({
                'checked': true,
                'disabled': true
            });
        } else {
            $(this).closest('.pur_rep_create_hh_setting_one_box').find('.goods_tc_toggle input:checkbox').attr({
                'checked': false,
                'disabled': false
            });
        }
    });

    //选择付款方式
    $('.tanceng .pur_reproduct_create_choose_paying_way li').die('click').live('click', function () {
        cgThhCreateData.pay_type = $(this).index() + 1;
    });
    //选择收货人
    $('.pur_reproduct_create_choose_receipt_person_ul li').die('click').live('click', function () {
        $('.tanceng .pur_reproduct_create_choose_receipt_person_tel').val($(this).attr('contel')).css('color', '#333');
        $('.tanceng .pur_reproduct_create_hh_choose_receipt_person_tel').val($(this).attr('contel')).css('color', '#333');
    });

    //切换采购退货换货时候清空选中数组
    $('.tanceng .cgthh_select_sort li').die('click').live('click', function () {
        $('.tanceng .cg_thh_create_choose_goods_sell_btn').attr('name', 'cg_cgthd_xzsp');
        //定义选中普通商品数组
        purReproductChooseGoodsArr = [];
        //定义选中配置商品数组
        purReproductChooseSettingArr = [];
        //定义选中配置子商品数组
        purReproductChooseSettingGoodsArr = [];
    });

    //换货提交数据函数
    function purReproductExchangeDataFn() {
        //退换货类型
        cgThhCreateData.thetype = 1;

        //出库信息

        //发货日期
        if ($('.tanceng .pur_reproduct_create_hh_choose_send_day').val() == '请选择日期' || $('.tanceng .pur_reproduct_create_hh_choose_send_day').val() == '') {
            alert('请选择发货日期');
            submitOnOff = false;
            return false;
        } else {
            cgThhCreateData.send_day = $('.tanceng .pur_reproduct_create_hh_choose_send_day').val();
        }
        //物流方式
        if ($('.tanceng .pur_reproduct_create_hh_choose_wlfs_inp').val() == '请选择物流方式') {
            alert('请选择物流方式');
            submitOnOff = false;
            return false;
        }

        //是否包运费
        if ($('.tanceng .pur_reproduct_create_hh_freight_checkbox').attr('checked') == 'checked') {
            cgThhCreateData.freight = 1;
        } else {
            cgThhCreateData.freight = 0;
        }
        //收货人
        if ($('.tanceng .pur_reproduct_create_hh_choose_receipt_person').val() == '请选择收货人') {
            alert('请选择收货人');
            submitOnOff = false;
            return false;
        } else {
            cgThhCreateData.receipt_person = $('.tanceng .pur_reproduct_create_hh_choose_receipt_person').val();
            cgThhCreateData.contact_tel = $('.tanceng .pur_reproduct_create_hh_choose_receipt_person_tel').val();
        }
        // 收货地址
        if ($('.tanceng .pur_reproduct_create_hh_address').val() == '') {
            alert('请输入收货地址');
            submitOnOff = false;
            return false;
        } else {
            cgThhCreateData.receipt_address = $('.tanceng .pur_reproduct_create_hh_address').val();
        }

        //入库时间
        if ($('.tanceng .pur_reproduct_create_hh_in_send_day').val() == '请选择日期' || $('.tanceng .pur_reproduct_create_hh_in_send_day').val() == '') {
            alert('请选择入库时间');
            submitOnOff = false;
            return false;
        } else {
            cgThhCreateData.in_send_day = $('.tanceng .pur_reproduct_create_hh_in_send_day').val();
        }

        //备注
        if ($('.tanceng .pur_reproduct_create_hh_note_textarea').val() == '请输入备注') {
            cgThhCreateData.note = '';
        } else {
            cgThhCreateData.note = $('.tanceng .pur_reproduct_create_hh_note_textarea').val();
        }

        //推送出库
        var productInfoArr = [];

        //推送入库
        var productInfoInArr = [];

        var purRepProJson = {};

        //基本商品
        var goodsInfo = [];
        var goodsList = $('.tanceng .pur_reproduct_create_hh_goods_tbody tr');
        $.each(goodsList, function (i, v) {
            if (goodsList.eq(i).find('input:checkbox').attr('checked') == 'checked') {
                goodsInfo.push({
                    "good_id": goodsList.eq(i).attr('goodsid'),
                    "good_sn": goodsList.eq(i).find('td').eq(1).text(),
                    "good_name": goodsList.eq(i).find('td').eq(2).text(),
                    "good_attr": goodsList.eq(i).find('td').eq(3).text(),
                    "buy_num": goodsList.eq(i).find('td').eq(4).text(),
                    "reproduct_num": goodsList.eq(i).find('td').eq(5).find('input').val()
                });
                //推送出库 - 基本商品信息
                productInfoArr.push({
                    product_id: goodsList.eq(i).attr('goodsid'),
                    product_type: 1,
                    output_num: goodsList.eq(i).find('td').eq(5).find('input').val()
                });
                //推送入库 - 基本商品信息
                productInfoInArr.push({
                    product_id: goodsList.eq(i).attr('goodsid'),
                    product_type: 1,
                    input_num: goodsList.eq(i).find('td').eq(5).find('input').val()
                });
            }
        });
        /*if (goodsInfo.length == 0) {
         purRepProJson.goods = '';
         } else {
         purRepProJson.goods = arrayToJson(goodsInfo);
         }*/

        purRepProJson.goods = goodsInfo;
        //整机商品
        var settingInfo = [];
        var settingList = $('.tanceng .pur_reproduct_create_hh_setting_box .pur_rep_create_hh_setting_one_box');
        $.each(settingList, function (i, v) {
            $.each(settingList.eq(i).find('.xs_div_2 tbody tr'), function (i2, v2) {
                //推送出库
                var settingGoodsArr = [];
                //推送入库
                var settingGoodsInArr = [];
                var setting_goods_list = [];
                $.each(settingList.eq(i).find('.xs_xsbjd_table_t2').eq(i2).children('div'), function (i3, v3) {
                    var setting_attr_list = [];
                    var settingAttrListTr = settingList.eq(i).find('.xs_xsbjd_table_t2').eq(i2).children('div').eq(i3).find('tbody tr');
                    $.each(settingAttrListTr, function (i4, v4) {
                        setting_attr_list.push({
                            "good_id": settingAttrListTr.eq(i4).attr('goodsid'),
                            "good_sn": settingAttrListTr.eq(i4).find('td').eq(1).text(),
                            "good_attr": settingAttrListTr.eq(i4).find('td').eq(2).text(),
                            "buy_num": settingAttrListTr.eq(i4).find('td').eq(3).text(),
                            "reproduct_num": settingAttrListTr.eq(i4).find('td').eq(4).find('input').val()
                        });
                        if(settingList.eq(i).find('.xs_div_2 tbody tr').eq(i2).find('input:checkbox').attr('checked') != 'checked' && settingAttrListTr.eq(i4).find('input:checkbox').attr('checked') != 'checked'){
                            return true;
                        }
                        settingGoodsArr.push({
                            product_id: settingAttrListTr.eq(i4).attr('goodsid'),
                            num: settingAttrListTr.eq(i4).find('td').eq(4).find('input').val()
                        })
                        settingGoodsInArr.push({
                            product_id: settingAttrListTr.eq(i4).attr('goodsid'),
                            num: settingAttrListTr.eq(i4).find('td').eq(4).find('input').val()
                        })
                    });
                    setting_goods_list.push({
                        "title": settingList.eq(i).find('.xs_xsbjd_table_t2').eq(i2).children('div').eq(i3).find('span.cont_title').text(),
                        "attr_list": setting_attr_list
                    });
                });
                settingInfo.push({
                    "setting_id": settingList.eq(i).find('.xs_div_2 tbody tr').eq(i2).attr('settingid'),
                    "setting_sn": settingList.eq(i).find('.xs_div_2 tbody tr').eq(i2).find('td').eq(1).text(),
                    "setting_name": settingList.eq(i).find('.xs_div_2 tbody tr').eq(i2).find('td').eq(2).text(),
                    "setting_attr": settingList.eq(i).find('.xs_div_2 tbody tr').eq(i2).find('td').eq(3).text(),
                    "buy_num": settingList.eq(i).find('.xs_div_2 tbody tr').eq(i2).find('td').eq(4).text(),
                    "reproduct_num": settingList.eq(i).find('.xs_div_2 tbody tr').eq(i2).find('td').eq(5).find('input').val(),
                    "good_list": setting_goods_list
                });
                productInfoArr.push({
                    product_id: settingList.eq(i).find('.xs_div_2 tbody tr').eq(i2).attr('settingid'),
                    product_type: 3,
                    product_type_no: settingList.eq(i).find('.xs_div_2 tbody tr').eq(i2).find('td').eq(1).text(),
                    output_num: settingList.eq(i).find('.xs_div_2 tbody tr').eq(i2).find('td').eq(5).find('input').val(),
                    product_type_name: settingList.eq(i).find('.xs_div_2 tbody tr').eq(i2).find('td').eq(2).text(),
                    set_detail: settingGoodsArr
                })
                productInfoInArr.push({
                    product_id: settingList.eq(i).find('.xs_div_2 tbody tr').eq(i2).attr('settingid'),
                    product_type: 3,
                    product_type_no: settingList.eq(i).find('.xs_div_2 tbody tr').eq(i2).find('td').eq(1).text(),
                    input_num: settingList.eq(i).find('.xs_div_2 tbody tr').eq(i2).find('td').eq(5).find('input').val(),
                    product_type_name: settingList.eq(i).find('.xs_div_2 tbody tr').eq(i2).find('td').eq(2).text(),
                    set_detail: settingGoodsInArr
                })
            });
        });
        /*if (settingInfo.length = 0) {
         purRepProJson.setting = '';
         } else {
         purRepProJson.setting = arrayToJson(settingInfo);
         }*/
        purRepProJson.setting = settingInfo;

        purRepProJson.setting_sum_total = $('.tanceng .pur_rep_create_setting_cost_hj').html();
        purRepProJson.other_free = $('.tanceng .pur_rep_create_other_fee').val();
        purRepProJson.reproduct_price_total = $('.tanceng .ven_sell_quote_create_cost_tax_total').text();
        cgThhCreateData.product_json = arrayToJson(purRepProJson);

        submitOnOff = true;
    }

    //退货提交数据函数
    function purReproductReturnDataFn() {
        //退换货类型
        cgThhCreateData.thetype = 2;
        //付款方式
        if ($('.tanceng .pur_reproduct_create_choose_paying_way_inp').val() == '请选择付款方式') {
            alert('请选择付款方式');
            submitOnOff = false;
            return false;
        }
        //付款日期
        if ($('.tanceng .pur_reproduct_create_choose_pay_day').val() == '请选择日期' || $('.tanceng .pur_reproduct_create_choose_pay_day').val() == '') {
            alert('请选择付款日期');
            submitOnOff = false;
            return false;
        } else {
            cgThhCreateData.pay_day = $('.tanceng .pur_reproduct_create_choose_pay_day').val();
        }
        //退票日期
        if ($('.tanceng .pur_reproduct_create_thfp_checkbox').attr('checked') == 'checked') {
            if ($('.tanceng .pur_reproduct_create_choose_refund_day').val() == '请选择日期' || $('.tanceng .pur_reproduct_create_choose_refund_day').val() == '') {
                alert('请选择退票日期');
                submitOnOff = false;
                return false;
            } else {
                cgThhCreateData.refund_day = $('.tanceng .pur_reproduct_create_choose_refund_day').val();
                cgThhCreateData.refund_ticket_status = 1;
            }
        } else {
            cgThhCreateData.refund_day = '';
            cgThhCreateData.refund_ticket_status = 0;
        }

        //出库信息

        //发货日期
        if ($('.tanceng .pur_reproduct_create_choose_send_day').val() == '请选择日期' || $('.tanceng .pur_reproduct_create_choose_send_day').val() == '') {
            alert('请选择发货日期');
            submitOnOff = false;
            return false;
        } else {
            cgThhCreateData.send_day = $('.tanceng .pur_reproduct_create_choose_send_day').val();
        }
        //物流方式
        if ($('.tanceng .pur_reproduct_create_choose_wlfs_inp').val() == '请选择物流方式') {
            alert('请选择物流方式');
            submitOnOff = false;
            return false;
        }

        //是否包运费
        if ($('.tanceng .pur_reproduct_create_th_freight_checkbox').attr('checked') == 'checked') {
            cgThhCreateData.freight = 1;
        } else {
            cgThhCreateData.freight = 0;
        }
        //收货人
        if ($('.tanceng .pur_reproduct_create_choose_receipt_person').val() == '请选择收货人') {
            alert('请选择收货人');
            submitOnOff = false;
            return false;
        } else {
            cgThhCreateData.receipt_person = $('.tanceng .pur_reproduct_create_choose_receipt_person').val();
            cgThhCreateData.contact_tel = $('.tanceng .pur_reproduct_create_choose_receipt_person_tel').val();
        }
        // 收货地址
        if ($('.tanceng .pur_reproduct_create_address').val() == '') {
            alert('请输入收货地址');
            submitOnOff = false;
            return false;
        } else {
            cgThhCreateData.receipt_address = $('.tanceng .pur_reproduct_create_address').val();
        }
        //是否整单退
        if ($('.tanceng .pur_rep_create_th_zdt_checkbox').attr('checked') == 'checked') {
            cgThhCreateData.is_full = 1;
        } else {
            cgThhCreateData.is_full = 0;
        }
        //备注
        if ($('.tanceng .pur_reproduct_create_th_note_textarea').val() == '请输入备注') {
            cgThhCreateData.note = '';
        } else {
            cgThhCreateData.note = $('.tanceng .pur_reproduct_create_th_note_textarea').val();
        }

        var purRepProJson = {};
        //折损
        if ($('.tanceng .pur_rep_create_zhesun_checkbox').attr('checked') == 'checked') {
            purRepProJson.is_derating = 1;
            purRepProJson.percent = $('.tanceng .pur_rep_create_zsl_inp').val();
        } else {
            purRepProJson.is_derating = 0;
            purRepProJson.percent = 0;
        }

        //推送出库
        var productInfoArr = [];

        //基本商品
        var goodsInfo = [];
        var goodsList = $('.tanceng .pur_reproduct_create_th_goods_tbody tr');
        $.each(goodsList, function (i, v) {
            if (goodsList.eq(i).find('input:checkbox').attr('checked') == 'checked') {
                goodsInfo.push({
                    "good_id": goodsList.eq(i).attr('goodsid'),
                    "good_sn": goodsList.eq(i).find('td').eq(1).text(),
                    "good_name": goodsList.eq(i).find('td').eq(2).text(),
                    "good_attr": goodsList.eq(i).find('td').eq(3).text(),
                    "buy_num": goodsList.eq(i).find('td').eq(4).text(),
                    "reproduct_num": goodsList.eq(i).find('td').eq(5).find('input').val(),
                    "buy_price": goodsList.eq(i).find('td').eq(6).text(),
                    "reproduct_price": goodsList.eq(i).find('td').eq(7).find('input').val(),
                    "reproduct_price_total": goodsList.eq(i).find('td').eq(8).text()
                });
                //推送出库 - 基本商品信息
                productInfoArr.push({
                    product_id: goodsList.eq(i).attr('goodsid'),
                    product_type: 1,
                    output_num: goodsList.eq(i).find('td').eq(5).find('input').val()
                })
            }
        });
        /*if (goodsInfo.length == 0) {
         purRepProJson.goods = '';
         } else {
         purRepProJson.goods = arrayToJson(goodsInfo);
         }*/

        purRepProJson.goods = goodsInfo;
        purRepProJson.goods_sum_total = $('.tanceng .pur_rep_create_goods_cost_hj').html();

        //整机商品
        var settingInfo = [];
        var settingList = $('.tanceng .pur_reproduct_create_th_setting_box .pur_rep_create_th_setting_one_box');
        $.each(settingList, function (i, v) {
            $.each(settingList.eq(i).find('.xs_div_2 tbody tr'), function (i2, v2) {
                var settingGoodsArr = [];
                var setting_goods_list = [];
                $.each(settingList.eq(i).find('.xs_xsbjd_table_t2').eq(i2).children('div'), function (i3, v3) {
                    var setting_attr_list = [];
                    var settingAttrListTr = settingList.eq(i).find('.xs_xsbjd_table_t2').eq(i2).children('div').eq(i3).find('tbody tr');
                    $.each(settingAttrListTr, function (i4, v4) {
                        setting_attr_list.push({
                            "good_id": settingAttrListTr.eq(i4).attr('goodsid'),
                            "good_sn": settingAttrListTr.eq(i4).find('td').eq(1).text(),
                            "good_attr": settingAttrListTr.eq(i4).find('td').eq(2).text(),
                            "buy_num": settingAttrListTr.eq(i4).find('td').eq(3).text(),
                            "reproduct_num": settingAttrListTr.eq(i4).find('td').eq(4).find('input').val(),
                            "buy_price": settingAttrListTr.eq(i4).find('td').eq(5).text(),
                            "reproduct_price": settingAttrListTr.eq(i4).find('td').eq(6).find('input').val(),
                            "reproduct_price_total": settingAttrListTr.eq(i4).find('td').eq(7).text()
                        });
                        if(settingList.eq(i).find('.xs_div_2 tbody tr').eq(i2).find('input:checkbox').attr('checked') != 'checked' && settingAttrListTr.eq(i4).find('input:checkbox').attr('checked') != 'checked'){
                            return true;
                        }
                        settingGoodsArr.push({
                            product_id: settingAttrListTr.eq(i4).attr('goodsid'),
                            num: settingAttrListTr.eq(i4).find('td').eq(4).find('input').val()
                        })
                    });
                    setting_goods_list.push({
                        "title": settingList.eq(i).find('.xs_xsbjd_table_t2').eq(i2).children('div').eq(i3).find('span.cont_title').text(),
                        "attr_list": setting_attr_list
                    });
                });
                settingInfo.push({
                    "setting_id": settingList.eq(i).find('.xs_div_2 tbody tr').eq(i2).attr('settingid'),
                    "setting_sn": settingList.eq(i).find('.xs_div_2 tbody tr').eq(i2).find('td').eq(1).text(),
                    "setting_name": settingList.eq(i).find('.xs_div_2 tbody tr').eq(i2).find('td').eq(2).text(),
                    "setting_attr": settingList.eq(i).find('.xs_div_2 tbody tr').eq(i2).find('td').eq(3).text(),
                    "buy_num": settingList.eq(i).find('.xs_div_2 tbody tr').eq(i2).find('td').eq(4).text(),
                    "reproduct_num": settingList.eq(i).find('.xs_div_2 tbody tr').eq(i2).find('td').eq(5).find('input').val(),
                    "buy_price": settingList.eq(i).find('.xs_div_2 tbody tr').eq(i2).find('td').eq(6).text(),
                    "reproduct_price": settingList.eq(i).find('.xs_div_2 tbody tr').eq(i2).find('td').eq(7).find('input').val(),
                    "reproduct_price_total": settingList.eq(i).find('.xs_div_2 tbody tr').eq(i2).find('td').eq(8).text(),
                    "good_list": setting_goods_list
                });
                productInfoArr.push({
                    product_id: settingList.eq(i).find('.xs_div_2 tbody tr').eq(i2).attr('settingid'),
                    product_type: 3,
                    product_type_no: settingList.eq(i).find('.xs_div_2 tbody tr').eq(i2).find('td').eq(1).text(),
                    output_num: settingList.eq(i).find('.xs_div_2 tbody tr').eq(i2).find('td').eq(5).find('input').val(),
                    product_type_name: settingList.eq(i).find('.xs_div_2 tbody tr').eq(i2).find('td').eq(2).text(),
                    set_detail: settingGoodsArr
                })
            });
            //推送出库 - 商品明细
            purReproductToOutStockData.product_info = arrayToJson(productInfoArr);
        });
        /*if (settingInfo.length == 0) {
         purRepProJson.setting = '';
         } else {
         purRepProJson.setting = arrayToJson(settingInfo);
         }*/

        purRepProJson.setting = settingInfo;
        purRepProJson.setting_sum_total = $('.tanceng .pur_rep_create_setting_cost_hj').html();
        purRepProJson.other_free = $('.tanceng .pur_rep_create_other_fee').val();
        purRepProJson.reproduct_price_total = $('.tanceng .ven_sell_quote_create_cost_tax_total').text();
        cgThhCreateData.product_json = arrayToJson(purRepProJson);
        //总金额
        cgThhCreateData.totals = $('.tanceng .ven_sell_quote_create_cost_tax_total').text();

        //推送收款
        purReproductToReceiptData.no_pay_money = cgThhCreateData.totals;

        submitOnOff = true;
    }

    //选择物流方式
    $('.tanceng .pur_reproduct_create_choose_wlfs_ul li').die('click').live('click', function () {
        cgThhCreateData.logistics_type = $(this).index() + 1;
    });


    var submitOnOff = true;
    //新建退换货 - 提交
    $('.tanceng .pur_reproduct_create_submit_btn').die('click').live('click', function () {
        //采购退换货编号
        cgThhCreateData.code_sn = $('.tanceng .cg_thh_create_code_sn').val();

        if ($('.tanceng .cg_thh_link_quote_buy_id').val() == '选择采购订单') {
            alert('请选择采购订单');
            return false;
        }

        if ($('.tanceng .pur_reproduct_create_type_inp').val() == '换货') {
            purReproductExchangeDataFn();
        } else if ($('.tanceng .pur_reproduct_create_type_inp').val() == '退货') {
            purReproductReturnDataFn();
        }

        //采购退换货 - 审批人
        purReproductFlowChosenArr = [];
        $.each($('.tanceng .pur_rep_create_flow_list li'), function (i, v) {
            purReproductFlowChosenArr.push($('.tanceng .pur_rep_create_flow_list li').attr('flowid'));
        });
        cgThhCreateData.flow = purReproductFlowChosenArr.join(',');

        if (submitOnOff) {
            console.log(cgThhCreateData);

            //推送出库
            purReproductToOutStockData.related_receipts_no = cgThhCreateData.code_sn;
            purReproductToOutStockData.related_business_name = cgThhCreateData.supplier_name;
            purReproductToOutStockData.logistics_way = cgThhCreateData.logistics_type;
            purReproductToOutStockData.remark = cgThhCreateData.note;
            purReproductToOutStockData.is_package_freight = cgThhCreateData.freight;
            purReproductToOutStockData.consignee = cgThhCreateData.receipt_person;
            purReproductToOutStockData.consignee_tel = cgThhCreateData.contact_tel;
            purReproductToOutStockData.consignee_addr = cgThhCreateData.receipt_address;
            purReproductToOutStockData.output_time = cgThhCreateData.send_day;

            //推送收款
            purReproductToReceiptData.code_sn = cgThhCreateData.code_sn;
            purReproductToReceiptData.name = cgThhCreateData.supplier_name;
            purReproductToReceiptData.account_name = cgThhCreateData.account_name;
            purReproductToReceiptData.receipt_way = cgThhCreateData.pay_type;
            purReproductToReceiptData.company_account_id = cgThhCreateData.account_id;

            //推送付票
            purReproductToReceiptData.code_sn = cgThhCreateData.code_sn;
            purReproductToReceiptData.cs_name = cgThhCreateData.supplier_name;
            purReproductToReceiptData.name = cgThhCreateData.account_name;
            purReproductToReceiptData.company_account_id = cgThhCreateData.account_id;

            //推送入库
            purReproductToStockingInData.related_receipts_no = cgThhCreateData.code_sn;
            purReproductToStockingInData.related_business_name = cgThhCreateData.supplier_name;
            purReproductToStockingInData.remark = cgThhCreateData.note;
            purReproductToStockingInData.input_time = cgThhCreateData.in_send_day;

            cgThhCreateData.out_libs_info = JSON.stringify(purReproductToOutStockData);
            cgThhCreateData.rcceipt_monty_info = JSON.stringify(purReproductToReceiptData);
            cgThhCreateData.pay_tacket_info = JSON.stringify(purReproductToReceiptData);
            cgThhCreateData.in_libs_info = JSON.stringify(purReproductToStockingInData);

            $.ajax({
                url: SERVER_URL + '/buy-reproduct/add',
                type: 'POST',
                data: cgThhCreateData,
                dataType: 'json',
                success: function (oE) {
                    if (oE.code == 0) {
                        alert('添加成功');
                        $('.tanceng').css('display', 'none').children('.dialog_box').remove();
                        getBuyReproductList();
                        //推送出库
                        //purReproductToOutStockFn();

                        //推送收款
                        purReproductToReceiptData.last_id = oE.id;
                        //推送付票
                        purReproductToOutPutTicketData.last_id = oE.id;
                     }
                }
            })
        }
    });

    //推送出库函数
    function purReproductToOutStockFn() {
        $.ajax({
            url: SERVER_URL + '/stocking-out/add',
            type: 'POST',
            data: purReproductToOutStockData,
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
            },
            error: function (e) {
                alert(e.msg);
                console.log(e);
            }
        });
    }

    //推送收款函数
    function purReproductToReceiptFn() {
        $.ajax({
            url: SERVER_URL + '/push/add',
            type: 'POST',
            data: purReproductToReceiptData,
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
            },
            error: function (e) {
                alert(e.msg);
                console.log(e);
            }
        });
    }

    //推送付票函数
    function purReproductToOutPutTicketFn() {
        $.ajax({
            url: SERVER_URL + '/push/outputticketadd',
            type: 'POST',
            data: purReproductToOutPutTicketData,
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
            },
            error: function (e) {
                alert(e.msg);
                console.log(e);
            }
        });
    }
    //推送入库信息
    function purReproductToStockingInFn() {
        $.ajax({
            url: SERVER_URL + '/stocking-in/add',
            type: 'POST',
            data: purReproductToStockingInData,
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    onOff = true;
                }
            },
            error: function (e) {
                alert(e.msg);
            }
        });
    }

});
