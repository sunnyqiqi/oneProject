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
            });

            html += '</li>';
            html += '</ul>';
            html += '</ul>'
        });
        return html
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

    //金额保留两位小数
    function moneyToFixed(money) {
        return money.toFixed(2);
    }

    // json数组去重
    function getJsonArr(arr) {
        //定义需要的空数组
        var newArr = [];
        //定义转换字符串后的数组
        var newStringArr = [];
        $.each(arr, function (i, v) {
            var sArr = JSON.stringify(v);
            if ($.inArray(sArr, newStringArr) == -1 && sArr.indexOf('null') == -1) {
                // 根据字符串数组push对象
                newStringArr.push(sArr);
                newArr.push(v)
            }
        });
        return newArr;
    }//js实现数组转换成json
    function arrayToJson(o) {
        /*var r = [];
         if (typeof o == "string") return "\"" + o.replace(/([\'\"\\])/g, "\\$1").replace(/(\n)/g, "\\n").replace(/(\r)/g, "\\r").replace(/(\t)/g, "\\t") + "\"";
         if (typeof o == "object") {
         if (!o.sort) {
         for (var i in o)
         r.push("\"" + i + "\"" + ":" + arrayToJson(o[i]));
         if (!!document.all && !/^\n?function\s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/.test(o.toString)) {
         r.push("toString:" + o.toString.toString());
         }
         r = "{" + r.join() + "}";
         } else {
         for (var i = 0; i < o.length; i++) {
         r.push(arrayToJson(o[i]));
         }
         r = "[" + r.join() + "]";
         }
         return r;
         }
         return o.toString();*/
        return JSON.stringify(o);
    }

    var token, pid, key, page, limit, word_titl, goods_id, goods_pid, goods_member, goods_enddate, goods_fileurl, goods_imgurl, w_p_n;
    token = Admin.get_token();
    //token = '2017052516045457073-1-1';
    uid = Admin.get_uid();
    comid = loginUserInfo.usercompany_id;
    deptid = loginUserInfo.department_id;
    var uname = loginUserInfo.username;
    //	补零函数
    function l_dbl(x) {
        return x < 10 ? '0' + x : x
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
            },
            error: function (oE) {
                alert('获取编号失败，请重试！');
            }
        });
        return needCode;
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

    // 定义选择查看项
    var purQuoteLookAbledField = [
        {'index': null, 'field': '审批状态'},
        {'index': null, 'field': '审批人'},
        {'index': null, 'field': '创建人'},
        {'index': null, 'field': '创建日期'},
        {'index': null, 'field': '负责部门'},
        {'index': null, 'field': '负责人'}
    ];
    likShow('#pur_quote_table', purQuoteLookAbledField, '#page_65_headers', '#pur_quote_look_save', '#pur_quote_look_reset');

    //采购报价单参数
    var getBuyQuoteData = {
        token: token,
        thetype: 1, // 1 我发起的 2 待我审批的
        page: 1,//页面
        num: 10,//每页条数
        is_draft: 0, // 0不是 1是
        keywords: '',//  关键字
        status: '',
        current_uid: '',
        uid: '',
        ids: ''
    };
    //判断是否来自消息
    if ($('#left_button_65').attr('fromnotice') == 1) {
        var curId = $('#left_button_65').attr('detailid');
        var secondName = $('#left_button_65').attr('secondmenu');
        $.each($('.tabtitle li'), function (i, v) {
            if ('待我审批' == $.trim($('.tabtitle li').eq(i).text())) {
                //$('.tabtitle li').removeClass('tabhover').eq(i).addClass('tabhover');
                getBuyQuoteData = {
                    token: token,
                    thetype: 2, // 1 我发起的 2 待我审批的
                    page: 1,//页面
                    num: 10,//每页条数
                    is_draft: 0, // 0不是 1是
                    keywords: '',//  关键字
                    status: '',
                    current_uid: '',
                    uid: '',
                    ids: curId
                };
                setTimeout(function(){
                    $('.tabtitle li').eq(i).trigger('click');
                    $('#left_button_65').attr({
                        'fromnotice': '',
                        'detailid': '',
                        'secondmenu': '',
                        'totable': ''
                    });
                },100);
            }
        });
    } else {
        getBuyQuoteList();
    }
    //我发起的采购报价单列表

    $('#pur_quote_mylist').die('click').live('click', function () {
        getBuyQuoteData.thetype = 1;
        getBuyQuoteData.page = 1;
        getBuyQuoteData.ids = '';
        getBuyQuoteList();
    });
    //待我审批采购报价单列表
    $('#pur_quote_mychecklist').die('click').live('click', function () {
        getBuyQuoteData.thetype = 2;
        getBuyQuoteData.page = 1;
        getBuyQuoteList();
    });
    //搜索
    $('#pur_quote_search_btn').die('click').live('click', function () {
        if ($('#pur_quote_search_inp').val() == '搜索供应商名称') {
            alert('请输入搜索关键字');
            getBuyQuoteData.keywords = '';
        } else {
            getBuyQuoteData.keywords = $('#pur_quote_search_inp').val();
        }
        getBuyQuoteList();
    });
    function getBuyQuoteList() {
        $.ajax({
            url: SERVER_URL + '/buy-quote/list',
            type: 'GET',
            data: getBuyQuoteData,
            dataType: 'json',
            success: function (oE) {
                //搜索结果
                $('#page_65_total_count').html(oE.totalcount);
                if (oE.code == 0) {
                    var datalist = oE.datalist;
                    console.log(datalist);
                    if (datalist.length == 0) {
                        $('.pur_quote_nodata_box').removeClass('none');
                        $('.pur_quote_handle').addClass('none');
                    } else {
                        $('.pur_quote_nodata_box').addClass('none');
                        $('.pur_quote_handle').removeClass('none');
                    }
                    var purQuoteListHtml = '';
                    $.each(datalist, function (i, v) {
                        //审批状态class
                        var statusClass = '';
                        //审批状态name
                        var statusName = '';
                        //操作按钮
                        var purQuoteBtn = '';
                        if (getBuyQuoteData.thetype == 1) {
                            $('.slider_head_More').removeClass('none');
                            if (v['status'] == 1) {
                                statusClass = 'c_y';
                                statusName = '审批中';
                                purQuoteBtn = '<button class="but_mix but_look r_sidebar_btn pur_quote_look_btn" name="cg_cgbjd_look">查看</button><button class="but_mix but_look val_dialog pur_quote_edit_btn" name="cg_cgbjd_edit">编辑</button><button class="but_mix but_r val_dialog pur_quote_del_btn" name="cg_cgbjd_delete">删除</button>';
                            } else if (v['status'] == 2) {
                                statusClass = 'c_r';
                                statusName = '未通过';
                                purQuoteBtn = '<button class="but_mix but_look r_sidebar_btn pur_quote_look_btn" name="cg_cgbjd_look">查看</button><button class="but_mix but_look val_dialog pur_quote_edit_btn" name="cg_cgbjd_edit">编辑</button><button class="but_mix but_r val_dialog pur_quote_del_btn" name="cg_cgbjd_delete">删除</button>';
                            } else if (v['status'] == 3) {
                                statusClass = 'c_g';
                                statusName = '通过';
                                if (v['buy_order_sn'] != null || v['purchase_code_sn'] != null) {
                                    purQuoteBtn = '<button class="but_mix but_look r_sidebar_btn pur_quote_look_btn" name="cg_cgbjd_look">查看</button>';
                                } else {
                                    purQuoteBtn = '<button class="but_mix but_look r_sidebar_btn pur_quote_look_btn" name="cg_cgbjd_look">查看</button><button class="but_mix but_look val_dialog pur_quote_edit_btn" name="cg_cgbjd_edit">编辑</button><button class="but_mix but_r val_dialog pur_quote_del_btn" name="cg_cgbjd_delete">删除</button>';
                                }
                            }
                        } else if (getBuyQuoteData.thetype == 2) {
                            $('.slider_head_More').addClass('none');
                            if (v['status'] == 1) {
                                statusClass = 'c_y';
                                statusName = '审批中';
                                purQuoteBtn = '<button class="but_mix but_look r_sidebar_btn pur_quote_look_btn" name="cg_cgbjd_splook">查看</button><button class="but_mix but_exit val_dialog pur_quote_sp_look_btn" name="cg_cgbjd_spckxq">审批</button>';
                            } else if (v['status'] == 2) {
                                statusClass = 'c_r';
                                statusName = '未通过';
                                purQuoteBtn = '<button class="but_mix but_look r_sidebar_btn pur_quote_look_btn" name="cg_cgbjd_look">查看</button><button class="but_mix but_grey1">审批</button>';
                            } else if (v['status'] == 3) {
                                statusClass = 'c_g';
                                statusName = '通过';
                                purQuoteBtn = '<button class="but_mix but_look r_sidebar_btn pur_quote_look_btn" name="cg_cgbjd_look">查看</button><button class="but_mix but_grey1">审批</button>';
                            }
                        }
                        //作废状态判断
                        var purQuoteInvalid = '';// 0 正常  1 作废
                        var purQuoteInvalidClass = '';
                        /*if (v['is_invalid'] == 0) {
                         purQuoteInvalidClass = '';
                         purQuoteInvalid = '<input type="checkbox" name="cg_bjd_fq">';
                         } else {
                         purQuoteInvalidClass = 'grey';
                         purQuoteInvalid = '<span class="voidIcon pur_sup_zf_btn">作废</span>';
                         purQuoteBtn = '';
                         }*/
                        purQuoteListHtml += '<tr purquoteid="' + v['id'] + '">\
                                                <td>' + l_dbl(i + 1) + '</td>\
                                                <td>' + likNullData(v['code_sn']) + '</td>\
                                                <td>' + likNullData(v['purchase_code_sn']) + '</td>\
                                                <td>' + likNullData(v['buy_order_sn']) + '</td>\
                                                <td>' + likNullData(v['borrow_sn']) + '</td>\
                                                <td>' + likNullData(v['supplier_name']) + '</td>\
                                                <td><span class="' + statusClass + '">' + statusName + '</span></td>\
                                                <td>' + likNullData(v['mulit_approver_name']) + '</td>\
                                                <td>' + likNullData(v['product_name']) + '</td>\
                                                <td>' + likNullData(v['totals']) + '</td>\
                                                <td>' + likNullData(v['created_at']).split(' ')[0] + '</td>\
                                                <td>' + likNullData(v['uname']) + '</td>\
                                                <td>' + purQuoteBtn + '</td>\
                                            </tr>'
                    });
                    $('#pur_quote_list').html(purQuoteListHtml);
                    //分页
                    list_table_render_pagination('.pur_quote_pagination', getBuyQuoteData, getBuyQuoteList, oE.totalcount, datalist.length);
                    $('#pur_quote_look_save').trigger('click');
                }
            }
        });
    }

    //采购报价单 - 草稿箱参数
    var getBuyQuoteDraftData = {
        token: token,
        page: 1,//页面
        is_draft: 1, // 0不是 1是
        num: 10,//每页条数
        key: ''//  关键字
    };
    getBuyQuoteDraftNum();
    function getBuyQuoteDraftNum() {
        $.ajax({
            url: SERVER_URL + '/buy-quote/mylist',
            type: 'GET',
            data: getBuyQuoteDraftData,
            dataType: 'json',
            success: function (oE) {
                //搜索结果
                $('.page_65_draft_total_count').html(oE.totalcount);
            }
        });
    }

    //点击草稿箱
    $('#pur_quote_draft_btn').die('click').live('click', function () {
        getBuyQuoteDraftList();
    });
    function getBuyQuoteDraftList() {
        $.ajax({
            url: SERVER_URL + '/buy-quote/mylist',
            type: 'GET',
            data: getBuyQuoteDraftData,
            dataType: 'json',
            success: function (oE) {
                //搜索结果
                $('.page_65_draft_total_count').html(oE.totalcount);
                if (oE.code == 0) {
                    var datalist = oE.datalist;
                    if (datalist.length == 0) {
                        $('.pur_quote_nodata_box').removeClass('none');
                        $('.pur_quote_handle').addClass('none');
                    } else {
                        $('.pur_quote_nodata_box').addClass('none');
                        $('.pur_quote_handle').removeClass('none');
                    }
                    var purQuoteListHtml = '';
                    $.each(datalist, function (i, v) {
                        purQuoteListHtml += '<tr purquoteid="' + v['id'] + '">\
                                                <td>' + l_dbl(i + 1) + '</td>\
                                                <td>' + likNullData(v['code_sn']) + '</td>\
                                                <td>' + likNullData(v['supplier_name']) + '</td>\
                                                <td>' + likNullData(v['buy_order_sn']) + '</td>\
                                                <td>' + likNullData(v['borrow_sn']) + '</td>\
                                                <td>' + likNullData(v['goods_sum_price']) + '</td>\
                                                <td>' + likNullData(v['goods_sum_tax_money']) + '</td>\
                                                <td>' + likNullData(v['totals']) + '</td>\
                                                <td>' + likNullData(v['uname']) + '</td>\
                                                <td>' + likNullData(v['created_at'].split(' ')[0]) + '</td>\
                                                <td>' + likNullData(v['dept_name']) + '</td>\
                                                <td>' + likNullData(v['owner_name']) + '</td>\
                                                <td><button class="but_mix but_look val_dialog pur_quote_edit_btn" name="cg_cgbjd_edit">编辑</button><button class="but_mix but_r val_dialog pur_quote_del_btn" name="cg_cgbjd_delete">删除</button></td>\
                                            </tr>'
                    });
                    $('.pur_quote_draft_list').html(purQuoteListHtml);
                    //分页
                    list_table_render_pagination('.tanceng .pur_quote_draft_pagination', getBuyQuoteDraftData, getBuyQuoteDraftList, oE.totalcount, datalist.length);
                }
            }
        });
    }

    //审批状态搜索
    $('.pur_quote_list_status_search_ul li').live('click', function () {
        getBuyQuoteData.status = $(this).index() + 1;
        getBuyQuoteList();
    });

    //审批人
    $('.pur_quote_zkgjss').live('click', function () {
        if ($(this).text() == '隐藏高级搜索') {
        }
    });
    getPurQuoteSearchFn();
    function getPurQuoteSearchFn() {
        $.ajax({
            url: SERVER_URL + '/buy-quote/list',
            type: 'GET',
            data: {token: token, thetype: 1, num: 500},
            dataType: 'json',
            success: function (oE) {
                //搜索结果
                if (oE.code == 0) {
                    var datalist = oE.datalist;
                    console.log(datalist);
                    var flowListArr = [];
                    $.each(datalist, function (i, v) {
                        flowListArr = flowListArr.concat(v['flow_info']);
                    });
                    flowListArr = getJsonArr(flowListArr);
                    console.log(flowListArr);
                    var flowListHtml = '';
                    $.each(flowListArr, function (i, v) {
                        flowListHtml += '<li flowid="' + v['id'] + '">' + v['name'] + '</li>'
                    });
                    $('.pur_quote_list_check_person_search_ul').html(flowListHtml);
                }
            }
        });
    }

    //搜索审批人
    $('.pur_quote_list_check_person_search_ul li').live('click', function () {
        getBuyQuoteData.current_uid = $(this).attr('flowid');
        getBuyQuoteList();
    });

    //刷新
    $('.page_65_refresh').live('click', function () {
        getBuyQuoteData.page = 1;
        getBuyQuoteData.keywords = '';
        getBuyQuoteData.status = '';
        getBuyQuoteData.current_uid = '';
        $('#pur_quote_search_inp').val('搜索供应商名称').css('color', '#ccc');
        $('.pur_quote_list_status_search_inp').val('审批状态').css('color', '#ccc');
        $('.pur_quote_list_check_person_search_inp').val('审批人').css('color', '#ccc');
        getBuyQuoteList();
    });

    //定义当前操作id
    var purQuoteCurrentId = null;
    //定义采购报价单关联订单id
    var purQuoteLinkOrderId = null;

    //查看操作
    $('.pur_quote_look_btn').die('click').live('click', function () {
        $('.ht_slid_list li:first-of-type').trigger('click');
        $('.slider_head_list').css('display', 'none');
        purQuoteCurrentId = $(this).closest('tr').attr('purquoteid');
        $.ajax({
            url: SERVER_URL + '/buy-quote/detail',
            type: 'GET',
            data: {
                token: token,
                buy_quote_id: purQuoteCurrentId
            },
            async: false,
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var data = oE.data;
                    console.log(data);
                    //关联订单id
                    purQuoteLinkOrderId = data['order_id'];
                    //采购报价单名称
                    $('.pur_quote_look_name').html(data['supplier_name']);
                    //采购报价单创建时间
                    $('.pur_quote_look_created_at').html(data['created_at']);
                    //采购报价单编号
                    $('.pur_quote_look_code_sn').html(data['code_sn']);
                    //采购报价单供应商名称
                    $('.pur_quote_look_supplier_name').html(data['supplier_name']);
                    //采购报价单关联采购订单
                    $('.pur_quote_look_buy_order_sn').html(data['buy_order_sn']);
                    //采购报价单关联采购合同
                    $('.pur_quote_look_purchase_code_sn').html(data['purchase_code_sn']);
                    //采购报价单审批状态
                    if (data['status'] == 1) {
                        $('.pur_quote_look_status_name').html('审批中');
                        $('#pur_quote_look_more_btn_list').html('<li class="but_mix but_r val_dialog" name="cg_cgbjd_delete">删除</li>');
                    } else if (data['status'] == 2) {
                        $('.pur_quote_look_status_name').html('未通过');
                        $('#pur_quote_look_more_btn_list').html('<li class="but_mix but_r val_dialog pur_quote_look_edit_btn" name="cg_cgbjd_edit">编辑</li><li class="but_mix but_r val_dialog" name="cg_cgbjd_delete">删除</li>');
                    } else if (data['status'] == 3) {
                        $('.pur_quote_look_status_name').html('已通过');
                        $('#pur_quote_look_more_btn_list').html('<li class="but_mix but_r val_dialog" name="cg_cgbjd_delete">删除</li>');
                    }
                    //采购报价单采购商品
                    $('.pur_quote_look_product_name').html(data['product_name']);
                    //采购报价单税率
                    $('.pur_quote_look_goods_tax_rate').html(data['tax_rate'] == 0 ? '无税' : '含17%税');
                    //采购报价单总金额
                    $('.pur_quote_look_totals').html(data['product_json']['totals']);

                    //审批阶段
                    //审批流程
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
                                <img class="inline_block tx" src="' + getImgUrl(v['face']) + '">\
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
                        $('.pur_quote_look_check_list').html(checkHtml);
                    } else {
                        $('.sq_look_check_box').addClass('none');
                    }
                }
            }
        })
    });

 /*
    $('.pur_quote_look_detail_btn').text('审批报价单').attr('name', 'cg_cgbjd_spckxq');
    $('.pur_quote_look_detail_btn').text('查看报价单').attr('name', 'cg_cgbjd_xq');
*/

    //待我审批 - 查看
    $('.pur_quote_sp_look_btn').die('click').live('click', function () {
        purQuoteCurrentId = $(this).closest('tr').attr('purquoteid');
        getPurQuoteDetailFn(purQuoteCurrentId);
    });

    //查看采购报价单详情
    $('.pur_quote_look_detail_btn').die('click').live('click', function () {
        getPurQuoteDetailFn(purQuoteCurrentId);
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
                    $('.tanceng .pur_quote_look_created_at').html(data['created_at'].split(' ')[0]);
                    //采购报价单创建人
                    $('.tanceng .pur_quote_look_uname').html(data['uname']);
                    //采购报价单创建人电话
                    $('.tanceng .pur_quote_look_uname_tel').html(data['mobile']);
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
                                        <td class="noprint">' + l_dbl(i + 1) + '</td>\
                                        <td class="noprint">' + v['good_sn'] + '</td>\
                                        <td class="xs_print_name">' + v['good_name'] + '</td>\
                                        <td class="xs_print_sx">' + v['good_attr'] + '</td>\
                                        <td class="noprint">' + v['good_num'] + v['good_unit'] + '</td>\
                                        <td class="xs_bjd_td xs_goods_box xs_print_price" style="position: relative;padding:8px 10px;">\
                                            <div>\
                                            <span>￥' + v['good_price'] + '</span><i class="' + (v['up_down'] == 1 ? 'ven_warning_arrow_up' : 'ven_warning_arrow') + ' xs_goods_down_img" style="' + (v['up_down'] == 0 ? 'display: none;' : '') + '"></i>\
                                            </div>\
                                            <div class="work_vent_client_contMsgBox" style="display: none;top: 4px;left: 94px">\
                                            <i class="work_vent_client_torr"></i>\
                                            <div class="work_vent_client_contMsgBoxDet fnc_output_ticket_total_remain_ticket_num_list">' + (v['up_down'] == 1 ? '高' : '低') + '于 ' + v['good_last_price'] + '(上次报价)</div>\
                                        </div>\
                                        </td>\
                                        <td class="none xs_print_sl">' + v['good_num'] + v['good_unit'] + '</td>\
                                        <td class="noprint">￥' + v['good_rate_price'] + '</td>\
                                        <td class="xs_print_total">￥' + v['good_total'] + '</td>\
                                        <td class="noprint"></td>\
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
                            console.log(settingArr);
                            $.each(settingArr, function (i, v) {
                                var settingGoods = '';
                                //可选配
                                $.each(v['good_list'], function (i2, v2) {
                                    var settingGoodsInfo = '';
                                    $.each(v2['attr_list'], function (i3, v3) {
                                        settingGoodsInfo += '<tr class="xs_print_complete_a">\
                                        <td width="140" class="noprint">' + v3['good_sn'] + '</td>\
                                        <td width="150" class="none xs_print_name">' + v2['title'] + '</td>\
                                        <td width="560" class="xs_print_sx">' + v3['good_attr'] + '</td>\
                                        <td width="50" class="noprint">' + v3['total_num'] + '</td>\
                                        <td width="150" class="xs_bjd_td xs_goods_box xs_print_price" style="position: relative;"><div>￥' + v3['good_price'] + '<i class="' + (v3['up_down'] == 1 ? 'ven_warning_arrow_up' : 'ven_warning_arrow') + ' xs_goods_down_img ' + (v3['up_down'] == 0 ? 'none' : '') + '"></i>\
                            </div>\
                            <div class="work_vent_client_contMsgBox" style="display: none;top: 3px;left: 94px">\
                            <i class="work_vent_client_torr"></i>\
                            <div class="work_vent_client_contMsgBoxDet fnc_output_ticket_total_remain_ticket_num_list" style="font-weight: 100;">' + (v3['up_down'] == 1 ? '高' : '低') + '于 ' + v3['good_last_price'] + '(上次报价)</div>\
                            </div></td>\
                            <td  width="50" class="none xs_print_sl">' + v3['total_num'] + '</td>\
                                        <td width="90" class="noprint">￥' + v3['good_rate_price'] + '</td>\
                                        <td width="90" class="xs_print_total">￥' + v3['good_total'] + '</td>\
                                        <td width="60" class="noprint"></td>\
                                        </tr>';
                                    });
                                    settingGoods += '<table class="xs_bjd_table_1 xs_print_bjd_goods_table">\
                                        <thead class="noprint">\
                                        <tr style="background: #fff;">\
                                        <th class="c_3" style="font-weight: 100;">' + v2['title'] + '</th>\
                                        <th></th>\
                                        <th></th>\
                                        </tr>\
                                        <tr>\
                                        <th width="140">编号</th>\
                                        <th width="560">属性</th>\
                                        <th width="50">数量</th>\
                                        <th width="150">单价</th>\
                                        <th width="90">含税价</th>\
                                        <th width="90">总价</th>\
                                        <th width="60"></th>\
                                        </tr>\
                                        </thead>\
                                        <tbody>' + settingGoodsInfo + '</tbody>\
                                        </table>'
                                });

                                settingHtml += '<div class="xs_div_2" ' + (i == 0 ? ' style="margin-top: 20px;"' : '') + '>\
                            <table class="xs_bjd_table xs_print_bjd_goods_table">\
                            <thead class="' + (i == 0 ? '' : 'none') + ' noprint">\
                            <tr>\
                            <th width="30">序号</th>\
                            <th width="140">编号</th>\
                            <th width="150">名称</th>\
                            <th width="340">属性</th>\
                            <th width="50">数量</th>\
                            <th width="150">单价</th>\
                            <th width="90">含税价</th>\
                            <th width="90">总价</th>\
                            <th width="60">配件</th>\
                            </tr>\
                            </thead>\
                            <tbody>\
                            <tr class="c_3 c_3 xs_bjd_bold xs_print_complete">\
                            <td width="30" class="noprint">' + l_dbl(i + 1) + '</td>\
                            <td width="140" class="noprint">' + v['setting_sn'] + '</td>\
                            <td width="150" class="xs_complete_name">' + v['setting_name'] + '</td>\
                            <td width="340" class="noprint">' + v['setting_attr'] + '</td>\
                            <td width="50" class="noprint">' + v['setting_num'] + '</td>\
                            <td width="150" class="xs_complete_price">\
                            <span>￥' + v['setting_price'] + '</span>\
                            </td>\
                            <td width="50" class="xs_complete_sl none">' + v['setting_num'] + '</td>\
                            <td width="90" class="noprint">￥' + v['setting_rate_price'] + '</td>\
                            <td width="90" class="xs_complete_total">￥' + v['setting_total'] + '</td>\
                            <td width="60" class="noprint">\
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
                console.log(e);
            }
        });
    }

    //查看 - 更多列表 - 点击右侧弹框消失
    $('.slider_head_list li').die('click').live('click', function () {
        $('.right_sidebar_h').trigger('click');
    });

    //采购报价单关联订单
    $('.pur_quote_look_nav_ul li:nth-of-type(2)').die('click').live('click', function () {
        $.ajax({
            url: SERVER_URL + '/buy-order/info',
            type: 'GET',
            data: {
                token: token,
                buy_order_id: purQuoteLinkOrderId
            },
            async: false,
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var data = oE.data;
                    //采购订单编号
                    $('.pur_quote_look_link_order_buy_code_sn').html(data['buy_code_sn']);
                    //采购订单供应商名称
                    $('.pur_quote_look_link_order_supplier_name').html(data['supplier_name']);
                    //采购订单创建时间
                    $('.pur_quote_look_link_order_created_at').html(data['created_at']);
                    //采购订单创建人
                    $('.pur_quote_look_link_order_uname').html(data['uname']);
                    //采购订单负责部门
                    $('.pur_quote_look_link_order_dept_name').html(data['dept_name']);
                    //采购订单负责人
                    $('.pur_quote_look_link_order_owner_name').html(data['owner_name']);
                    //采购订单审批人
                    $('.pur_quote_look_link_order_current_name').html(data['current_name']);
                    //采购订单到货时间
                    $('.pur_quote_look_link_order_expected_date').html(data['expected_date']);
                    //采购订单入库状态
                    if (data['storage_status'] == 1) {
                        $('.pur_quote_look_link_order_storage_name').html('未入库');
                    } else if (data['storage_status'] == 2) {
                        $('.pur_quote_look_link_order_storage_name').html('部分入库');
                    } else if (data['storage_status'] == 3) {
                        $('.pur_quote_look_link_order_storage_name').html('已入库');
                    }
                    //采购订单商品采购金额
                    $('.pur_quote_look_link_order_goods_total').html(data['goods_total']);
                    //采购订单税额合计
                    $('.pur_quote_look_link_order_tax_total').html(data['tax_total']);
                    //采购订单总金额
                    $('.pur_quote_look_link_order_totals').html(data['totals']);
                    //采购订单已付金额
                    $('.pur_quote_look_link_order_alreaypay_name').html(data['alreaypay_name']);
                    //采购订单已到票金额
                    $('.pur_quote_look_link_order_alreadyto_total').html(data['alreadyto_total']);
                    //采购订单备注
                    $('.pur_quote_look_link_order_note').html(data['note']);
                }
            }
        })
    });

    //删除操作
    $('.pur_quote_del_btn').die('click').live('click', function () {
        purQuoteCurrentId = $(this).closest('tr').attr('purquoteid');
    });
    $('.tanceng .pur_quote_del_submit').die('click').live('click', function () {
        $.ajax({
            url: SERVER_URL + '/buy-quote/del',
            type: 'GET',
            data: {
                token: token,
                id: purQuoteCurrentId
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    $(this).closest('.dialog_box').remove();
                    $('.tanceng').css('display', 'none');
                    getBuyQuoteList($('#page_65_tab li.tabhover').attr('needurl'));
                    getBuyQuoteDraftNum();
                }
            }
        });
    });

    //作废操作
    $('.pur_quote_invalid_btn').die('click').live('click', function () {
        purQuoteCurrentId = $(this).closest('tr').attr('purquoteid');
        $.ajax({
            url: SERVER_URL + '/buy-quote/setstatus',
            type: 'POST',
            data: {
                token: token,
                uid: uid,//用户id
                buy_quote_id: purQuoteCurrentId,// id
                status_flag: 1 //设置类型 enable 是启用 disable作废
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    if ($('#pur_quote_mylist').hasClass('tabhover')) {
                        getBuyQuoteList('/buy-quote/mylist');
                    } else if ($('#pur_quote_mychecklist').hasClass('tabhover')) {
                        getBuyQuoteList('/buy-quote/mychecklist');
                    }
                }
            }
        })
    });

    //审批参数
    var purQuoteCheckData = {
        token: token,
        check_type: '',
        buy_quote_id: '',
        note: ''
    };
    //审批操作
    $('.pur_quote_check_btn').die('click').live('click', function () {
        purQuoteCurrentId = $(this).closest('tr').attr('purquoteid');
        purQuoteCheckData.buy_quote_id = purQuoteCurrentId;
    });
    //审批操作 - 通过
    $('.pur_quote_check_btn_pass').die('click').live('click', function () {
        purQuoteCheckData.check_type = 1;
        purQuoteCheckData.buy_quote_id = purQuoteCurrentId;
    });
    //审批操作 - 拒绝
    $('.pur_quote_check_btn_refuse').die('click').live('click', function () {
        purQuoteCheckData.check_type = 2;
        purQuoteCheckData.buy_quote_id = purQuoteCurrentId;
    });
    //审批提交
    $('.tanceng .pur_quote_check_submit_btn').die('click').live('click', function () {
        if ($('.tanceng .pur_quote_check_note_textarea').val() == '请输入审批意见') {
            purQuoteCheckData.note = '';
        } else {
            purQuoteCheckData.note = $('.tanceng .pur_quote_check_note_textarea').val();
        }
        $.ajax({
            url: SERVER_URL + '/buy-quote/check',
            type: 'POST',
            data: purQuoteCheckData,
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    alert('操作成功');
                    $(this).closest('.dialog_box').remove();
                    $('.tanceng').css('display', 'none').children('div').remove();
                    $('.right_sidebar_h').trigger('click');
                    getBuyQuoteList('/buy-quote/mychecklist');
                } else {
                    alert('操作失败')
                }
            }
        });
    });

    //新建采购报价参数
    var purQuoteCreateData = {
        token: token,
        code_sn: '', // 采购报价单编号
        borrow_id: '', // 借入单id
        supplier_id: '', // 供应商id
        account_id: '',
        tax_rate: '', // 税率 含税1 无税0
        flow: '', // 审批人1,2,3
        goods: '',
        quote_id: '', // 报价单id 有为修改 0 为添加
        supplier_name: '', // 供应商名称
        setting: '', // 非必填
        money_sum: '', // 单价合计
        tax_money_sum: '', // 合计税额
        other_free: '', // 其它费用
        totals: '', // 总计金额
        note: '', // 备注
        is_draft: '' // 是否草稿 0 不 1 草稿
    };
    //已选审批人数组
    var purQuoteCreateFlowChosenArr = [];
    //审批步骤顺序数组
    var flowOrderArr = ['步骤一', '步骤二', '步骤三', '步骤四', '步骤五', '步骤六', '步骤七'];
    //清空数组
    var aPurQuoteCreateGoodsChosen = [];
    var purQuoteSettingGoodsListArr = [];
    var purQuoteSettingGoodsListValArr = [];
    var aPurQuoteCreateSettingChosen = [];
    //新建采购报价单
    $('#pur_quote_create_btn').die('click').live('click', function () {
        purQuoteCreateData = {
            token: token,
            code_sn: '', // 采购报价单编号
            borrow_id: '', // 借入单id
            supplier_id: '', // 供应商id
            account_id: '',
            tax_rate: '', // 税率 含税1 无税0
            flow: '', // 审批人1,2,3
            goods: '',
            quote_id: '', // 报价单id 有为修改 0 为添加
            supplier_name: '', // 供应商名称
            setting: '', // 非必填
            money_sum: '', // 单价合计
            tax_money_sum: '', // 合计税额
            other_free: '', // 其它费用
            totals: '', // 总计金额
            note: '', // 备注
            is_draft: '' // 是否草稿 0 不 1 草稿
        };
        //创建日期
        $('.tanceng .pur_quote_create_time').html(getCurrentDateDay());
        //创建人
        $('.tanceng .pur_quote_create_uname').html(uname);
        //采购报价单编号
        $('.tanceng .pur_quote_create_code_sn').val(likGetCodeFn('CBJ'));
        //已选审批人数组
        purQuoteCreateFlowChosenArr = [];
        //系统设置中的审批人
        $.ajax({
            url: SERVER_URL + '/approval/person',
            type: 'GET',
            data: {
                token: token,
                thetype: 2,
                category: 5
            },
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                if (oE.code == 0) {
                    var copyList = '';
                    if (oE.is_across == 1) {
                        //跨级
                        $.each(oE.data, function (i, v) {
                            copyList += '<li flowid="' + v['id'] + '"><em class="icon_personBtn icon_personBtn_msg" style="background-image:url(' + getImgUrl(v['face']) + ')"><i class="icon_personNext none"></i></em><em class="icon_adderBtn"></em><p class="box_adderName">' + v['name'] + ' </p></li>';
                        });
                    } else {
                        //正常
                        $.each(oE.data, function (i, v) {
                            copyList += '<li flowid="' + v['id'] + '"><em class="icon_personBtn icon_personBtn_msg" style="background-image:url(' + getImgUrl(v['face']) + ')"><i class="icon_personNext ' + ((i == oE.data.length - 1) ? 'none' : '') + '"></i></em><em class="icon_adderBtn"></em><p class="box_adderName">' + v['name'] + ' </p><p class="box_addermsg">' + flowOrderArr[i] + '</p></li>';
                        });
                    }
                    //copyList += '<li class="ven_sell_quote_create_flow_list_add_btn"><em class="icon_personBtn icon_personBtn_add val_dialogTop ven_sell_quote_create_choose_flow_btn" name="xs_xsbjd_spr"></em></li>';
                    $('.tanceng .pur_quote_create_flow_list').html(copyList);
                }
            },
            error: function (e) {
                alert(e.msg);
                console.log(e);
            }
        });

        aPurQuoteCreateGoodsChosen = [];
        purQuoteSettingGoodsListArr = [];
        purQuoteSettingGoodsListValArr = [];
        aPurQuoteCreateSettingChosen = [];

    });
    //获取借入单参数
    var getBorrowData = {
        token: token,
        page: 1,
        num: 10,
        uid: uid,
        company_id: comid,
        is_invalid: 1,
        key_search: ''
    };
    //新建采购报价单 - 关联借入单
    $('.tanceng .pur_quote_create_choose_borrow_btn').die('click').live('click', function () {
        getBorrowData = {
            token: token,
            page: 1,
            num: 10,
            uid: uid,
            company_id: comid
        };
        getBorrowFn();
    });
    //借入单 - 搜索
    $('.tanceng .pur_quote_create_choose_borrow_search_btn').die('click').live('click', function () {
        if ($('.tanceng .pur_quote_create_choose_borrow_search_inp').val() == '搜索借入单编号') {
            getBorrowData.key_search = '';
        } else {
            getBorrowData.key_search = $('.tanceng .pur_quote_create_choose_borrow_search_inp').val();
        }
        getBorrowFn();
    });
    //关联借入单函数
    function getBorrowFn() {
        $.ajax({
            url: SERVER_URL + '/borrow/list',
            type: 'POST',
            data: getBorrowData,
            dataType: 'json',
            success: function (oE) {
                //搜索结果
                $('.tanceng .pur_quote_create_choose_borrow_total').html(oE.total_num);
                console.log(oE);
                if (oE.code == 0) {
                    var datalist = oE.data;
                    if (datalist.length == 0) {
                        $('.pur_quote_create_choose_borrow_nodata_box').removeClass('none');
                        $('.pur_quote_create_choose_borrow_handle').addClass('none');
                    } else {
                        $('.pur_quote_create_choose_borrow_nodata_box').addClass('none');
                        $('.pur_quote_create_choose_borrow_handle').removeClass('none');
                    }
                    var borrowHtml = '';
                    $.each(datalist, function (i, v) {
                        var status = '';
                        var statusClass = '';
                        if (v['thetype'] == 0) {
                            status = '未归还';
                            statusClass = 'c_r';
                        } else if (v['thetype'] == 2) {
                            status = '部分归还';
                            statusClass = 'c_y';
                        }
                        borrowHtml += '<tr borrowid="' + v['id'] + '">\
                             <td><input type="radio" ' + (i == 0 ? 'checked' : '') + ' name="cg_cgbjd_xzxsdd"></td>\
                             <td>' + likNullData(v['code_sn']) + '</td>\
                             <td>' + likNullData(v['supplier_name']) + '</td>\
                             <td>' + likNullData(v['create_time'].split(' ')[0]) + '</td>\
                             <td>' + likNullData(v['name']) + '</td>\
                             <td>' + likNullData(v['all_money']) + '</td>\
                             <td class="' + statusClass + '"' + statusClass + '>' + status + '</td>\
                             </tr>'
                    });
                    $('.tanceng .pur_quote_create_choose_borrow_tbody').html(borrowHtml);
                    //分页
                    list_table_render_pagination('.tanceng .pur_quote_create_choose_borrow_pagination', getBorrowData, getBorrowFn, oE.total_num, datalist.length);
                }
            }
        });
    }

    //关联借入单保存
    var borrowCurTr = null;
    $('.tanceng .pur_quote_create_choose_borrow_save').die('click').live('click', function () {
        borrowCurTr = $('.tanceng .pur_quote_create_choose_borrow_tbody tr input:checked').closest('tr');
        $('.tanceng .pur_quote_create_choose_borrow_inp').val(borrowCurTr.find('td').eq(1).html()).css('color', '#333');
        purQuoteCreateData.borrow_id = borrowCurTr.attr('borrowid');
        $(this).closest('.dialog_box').remove();
        getBorrowDetailFn(purQuoteCreateData.borrow_id);
    });

    //借入单详情函数
    function getBorrowDetailFn(borrowId) {
        $.ajax({
            url: SERVER_URL + '/borrow/look-borrow',
            type: 'POST',
            data: {
                token: token,
                id: borrowId
            },
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                if (oE.code == 0) {
                    var data = oE.data;
                    //供应商名称
                    $('.tanceng .pur_quote_create_choose_supplier_inp').val(data['supplier_name']).css('color', '#333');
                    $('.tanceng .pur_quote_create_choose_supplier_btn').hide();
                    //基本商品
                    var goods = '';
                    if (data['goods'] && data['goods']['goods'].length > 0) {
                        $('.tanceng .page_65_shdSP').removeClass('none');
                        $(".tanceng .page65_newxsbjd").width(1100);
                        $(".tanceng .page65_newxsbjd").css('height', '90%');
                        $(".tanceng .page65_newxsbjd").find(".page65_new_inpbox").css('width', '50%');
                        $('.tanceng .xs_xsbjd_hr1').hide();
                        $(".tanceng .page_65_shdSP").css({
                            'padding': '10px 10px',
                            'background': '#f7f7f7',
                            'margin': '0 -40px',
                            'border': '1px solid #e6e6e6'
                        });

                        $('.tanceng .pur_quote_create_link_borrow_nav_ul li:nth-of-type(1)').css('display', 'inline-block').css({
                            'background': '#32a0f6',
                            'borderColor': '#32a0f6',
                            'color': '#fff'
                        }).find('i').css({
                            'background': 'url(static/images/close_1.png) no-repeat',
                            'backgroundSize': '100%'
                        });
                        goods += '<div class="container">\
                            <div class="table-container">\
                            <table>\
                            <thead>\
                            <tr>\
                            <th width="32">序号</th>\
                            <th width="100">商品名称</th>\
                            <th width="120">商品编号</th>\
                            <th width="248">属性</th>\
                            <th width="55">基本单位</th>\
                            <th width="85">数量</th>\
                            <th width="120">单价</th>\
                            <th width="30">税率(%)</th>\
                        <th width="85">含税价(元)</th>\
                            <th width="85">总价(元)</th>\
                            </tr>\
                            </thead>\
                            <tbody class="pur_quote_create_chosen_goods_tbody">';
                        $.each(data['goods']['goods'], function (i, v) {
                            var goodsAttr = v['good_attr'].split(',');
                            var goodsAttrHtml = '';
                            $.each(goodsAttr, function (i2, v2) {
                                goodsAttrHtml += v2.split('&')[1] + '/';
                            });
                            goodsAttrHtml = goodsAttrHtml.slice(0, goodsAttrHtml.length - 1);
                            goods += '<tr goodsid="' + v['good_id'] + '" lik_up_down_type="0">\
                                            <td class="pur_quote_create_choose_goods_order">' + l_dbl(i + 1) + '</td>\
                                            <td class="xs_f_color sell_quote_create_choose_goods_name">' + v['good_name'] + '</td>\
                                                <td>' + v['good_sn'] + '</td>\
                                                <td>' + goodsAttrHtml + '</td>\
                                                <td>' + v['good_unit'] + '</td>\
                                                <td>\
                                                <div class="xs_num_input num_input inline_block num_input_new"><button class="but_grey_a but_opa_small inp_plus pur_quote_productnum_change">+</button><input type="text" class="lik_input_number productnum pur_quote_productnum_input_change pur_quote_link_brw_productnum_input_change" value="1" maxnum="' + (parseFloat(v['good_num']) - parseFloat(v['return_num'])) + '"/><button class="but_grey_a but_opa_small radius_left_0 inp_reduce pur_quote_productnum_change">-</button></div>\
                                                    </td>\
                                                    <td class="xs_goods_box" style="position: relative;">\
                                                    <div class="xs_goods_big_box"><div class="inline_block select_100"><input type="text" class="lik_input_number c_3 time_input xs_bjd_inp xs_xsbjd_inp_60 product_reference_price pur_quote_goods_cost_one" value="0" lastprice="" style="color: rgb(153, 153, 153);margin-right: 10px;"></div></div>\
                                                </td>\
                                                    <td><span class="pur_quote_goods_tax_one c_y">' + v['good_rate'] + '</span></td>\
                                                    <td><span class="pur_quote_goods_tax_total">0</span></td>\
                                                    <td><span class="pur_quote_goods_one_cost_total">0</span></td>\
                                            </tr>';
                        });
                        goods += '</tbody>\
                            <tbody>\
                            <tr class="table_total">\
                            <td>合计</td>\
                            <td></td>\
                            <td></td>\
                            <td></td>\
                            <td></td>\
                            <td class="pur_quote_create_goods_num_total">0</td>\
                            <td></td>\
                            <td></td>\
                            <td><input type="hidden" value="0" class="goods_tax_total"></td>\
                            <td><span class="pur_quote_goods_cost_total">0</span></td>\
                            </tr>\
                            </tbody>\
                            </table>\
                            </div>\
                            </div>';
                        $('.tanceng .pur_quote_create_link_borrow_goods_box').html(goods).removeClass('none');
                    } else if (data['setting'] && data['setting'].length > 0) {
                        $('.tanceng .pur_quote_create_link_borrow_nav_ul li:nth-of-type(3)').css('display', 'inline-block').css({
                            'background': '#32a0f6',
                            'borderColor': '#32a0f6',
                            'color': '#fff'
                        }).find('i').css({
                            'background': 'url(static/images/close_1.png) no-repeat',
                            'backgroundSize': '100%'
                        });
                        $('.tanceng .pur_quote_create_link_borrow_setting_box').removeClass('none');
                    }
                    //整机商品
                    var setting = '';
                    if (data['setting'] && data['setting'].length > 0) {
                        $('.tanceng .pur_quote_create_link_borrow_nav_ul li:nth-of-type(2)').css('display', 'inline-block');
                        $('.tanceng .page_65_shdSP').removeClass('none');
                        $(".tanceng .page65_newxsbjd").width(1100);
                        $(".tanceng .page65_newxsbjd").css('height', '90%');
                        $(".tanceng .page65_newxsbjd").find(".page65_new_inpbox").css('width', '50%');
                        $('.tanceng .xs_xsbjd_hr1').hide();
                        $(".tanceng .page_65_shdSP").css({
                            'padding': '10px 10px',
                            'background': '#f7f7f7',
                            'margin': '0 -40px',
                            'border': '1px solid #e6e6e6'
                        });
                        setting += '<div class="pur_quote_create_choose_setting_box_list">';
                        $.each(data['setting'], function (i, v) {

                            var purQuoteSettingInfo = '';
                            if (v['good_list']) {
                                $.each(v['good_list'], function (i2, v2) {
                                    var purQuoteSettingChild = '';
                                    $.each(v2['attr_list'], function (i3, v3) {
                                        //商品属性
                                        var goodsAttr = v3['good_attr'].split(',');
                                        var goodsAttrHtml = '';
                                        $.each(goodsAttr, function (i4, v4) {
                                            goodsAttrHtml += v4.split('&')[1] + '/';
                                        });
                                        goodsAttrHtml = goodsAttrHtml.slice(0, goodsAttrHtml.length - 1);
                                        purQuoteSettingChild += '<tr settinggoodsid="' + v3['good_id'] + '" lik_up_down_type="0">\
                                                <td>' + v3['good_sn'] + '</td>\
                                                <td>' + goodsAttrHtml + '</td>\
                                                <td>\
                                                <div class="num_input inline_block num_input_new"><button class="but_grey_a but_opa_small inp_plus pur_quote_create_setting_child_num_change_btn">+</button><input class="lik_input_number pur_quote_create_setting_child_num" type="text" value="1" style="width: 32px;"><button class="but_grey_a but_opa_small radius_left_0 inp_reduce pur_quote_create_setting_child_num_change_btn">-</button></div>\
                                                </td>\
                                                <td class="pur_quote_create_setting_child_one_num_total">1</td>\
                                                <td class="xs_goods_box" style="position: relative;">                                    <div class="xs_goods_big_box">                                    <div class="inline_block select_100">    <input type="text" class="lik_input_number time_input xs_xsbjd_inp_60 pur_quote_create_setting_child_one_cost" lastprice="" value="0" onfocus="fn_focus(this);" onblur="fn_blur(this);" style="color: rgb(204, 204, 204);"></div></div>\
                                                </td>\
                                                <td class="pur_quote_create_setting_child_one_tax">' + v3['good_rate'] + '</td>\
                                                <td class="pur_quote_create_setting_child_one_cost_hsj">0</td>\
                                                <td class="pur_quote_create_setting_child_one_cost_total">0</td>\
                                                </tr>'
                                    });
                                    purQuoteSettingInfo += '<div class="box_open_list">\
                                        <p class="box_open_head" style="background: rgb(255, 255, 255); border-radius: 3px;">\
                                        <span>' + v2['title'] + '</span>\
                                        </p>\
                                        <div class="container">\
                                        <div class="table-container">\
                                        <table>\
                                        <thead>\
                                        <tr>\
                                        <th width="140">商品编号</th>\
                                        <th width="299">属性</th>\
                                        <th width="90">单个整机数量</th>\
                                        <th width="45">总数</th>\
                                        <th width="120">单价(元)</th>\
                                        <th width="63">税率(%)</th>\
                                        <th width="85">含税价(元)</th>\
                                        <th width="85">总价(元)</th>\
                                        </tr>\
                                        </thead>\
                                        <tbody> ' + purQuoteSettingChild + '\
                                        <tr class="table_total">\
                                        <td>合计</td>\
                                        <td></td>\
                                        <td></td>\
                                        <td class="c_r pur_quote_create_setting_child_num_total">0</td>\
                                        <td></td>\
                                        <td></td>\
                                        <td></td>\
                                        <td class="pur_quote_create_setting_child_cost_hj_total">0</td>\
                                        </tr>\
                                        </tbody>\
                                        </table>\
                                        </div>\
                                        </div>\
                                        </div>'
                                });
                            }
                            setting += '<div class="pur_quote_create_choose_setting_one_box_list" style="margin-bottom:15px;">\
                                    <div class="container">\
                                    <div class="table-container">\
                                    <table>\
                                    <thead>\
                                    <tr>\
                                    <th width="32">序号</th>\
                                    <th width="110">整机商品名称</th>\
                                    <th width="120">整机商品编号</th>\
                                    <th width="55">基本单位</th>\
                                    <th width="215">属性</th>\
                                    <th width="85">数量</th>\
                                    <th width="120">单价</th>\
                                    <th width="63">税率(%)</th>\
                                <th width="85">含税价(元)</th>\
                                    <th width="85">总价(元)</th>\
                                    </tr>\
                                    </thead>\
                                    <tbody>\
                                    <tr settingid="' + v['goods_id'] + '">\
                                    <td>' + l_dbl(i + 1) + '</td>\
                                    <td class="xs_f_color val_dialogTop" name="cg_cgbjd_xzsp">' + v['good_name'] + '</td>\
                                    <td>' + v['good_sn'] + '</td>\
                                    <td>' + v['good_unit'] + '</td>\
                                    <td>' + v['good_attr'] + '</td>\
                                    <td>\
                                    <div class="xs_num_input num_input inline_block num_input_new">\
                                    <button class="but_blue but_opa_small inp_plus pur_quote_create_setting_parent_num_change_btn">+</button><input type="text" value="1" class="pur_quote_create_setting_parent_num" style="border:1px solid #23a2f3;"><button class="but_blue but_opa_small radius_left_0 inp_reduce pur_quote_create_setting_parent_num_change_btn">-</button>\
                                    </div>\
                                    </td>\
                                    <td class="xs_goods_box" style="position: relative;">\
                                    <div class="xs_goods_big_box">\
                                    <div class="inline_block select_100">\
                                    <input type="text" class="c_3 lik_input_number time_input xs_bjd_inp xs_xsbjd_inp_60 pur_quote_create_setting_cost_one_change" value="0" style="color: rgb(153, 153, 153);margin-right: 10px;">\
                                    </div>\
                                    </div>\
                                    </td>\
                                    <td><span class="">' + v['containing_rate'] + '</span></td>\
                                    <td><span class="pur_quote_create_setting_parent_one_cost_hsj">0</span></td>\
                                    <td><span class="pur_quote_create_setting_parent_one_cost_total">0</span></td>\
                                    </tr>\
                                    </tbody>\
                                    </table>\
                                    </div>\
                                    </div>\
                                    <div class="xs_xsbjd_table_t2">\
                                    <div class="table_t2" style="position: relative;">\
                                    <span class="cont_title" style="border-left: 4px;padding-left: 10px;margin-left: 0;border-left: 5px solid #23a2f3;">配件内容</span><span class="c_9">(您必须把配件价格标明，配件合计必须等于整机单价)</span>\
                                    <span class="box_open_btn" style="right: 13px;">收起 <i class="right icon_show"></i></span>\
                                    </div>\
                                    <div class="goods_tc_toggle">\
                                    <div style="overflow: hidden;margin: 10px;">\
                                    <div class="cg_bjd_pjnr1"><span class="c_3">整机单价：<span class="pur_quote_create_setting_price_one">0</span>元</span>\
                                </div>\
                                <div class="cg_bjd_pjnr1"><span class="c_g">已标记：<span class="pur_quote_create_setting_price_one_yes">0</span>元</span>\
                                </div>\
                                <div class="cg_bjd_pjnr1"><span class="c_r">未标记：<span class="pur_quote_create_setting_price_one_no">0</span>元</span>\
                                </div>\
                                </div>' + purQuoteSettingInfo + '</div>\
                                    </div>\
                                    </div>';
                        });
                        setting += '</div>\
                            <div class="container">\
                            <div class="table-container">\
                            <table>\
                            <tbody>\
                            <tr class="table_total" style="border-top:1px solid #e6e6e6;">\
                            <td width="32">合计</td>\
                            <td width="110"></td>\
                            <td width="120"></td>\
                            <td width="55"></td>\
                            <td width="215"></td>\
                            <td width="85" class="pur_quote_create_setting_num_total_hj">0</td>\
                            <td width="120"></td>\
                            <td width="63"></td>\
                            <td width="85"></td>\
                            <td width="85" class="pur_quote_create_setting_cost_total_hj">0</td>\
                            </tr>\
                            </tbody>\
                            </table>\
                            </div>\
                            </div>';
                        $('.tanceng .pur_quote_create_link_borrow_setting_box').html(setting);
                    }
                    $('.tanceng .productnum').trigger('keyup');
                }
            },
            error: function (e) {
                alert(e.msg);
                console.log(e);
            }
        });
    }

    //关联借入单 商品数量控制
    $('.tanceng .pur_quote_link_brw_productnum_input_change').live('keyup', function () {
        if (parseFloat($(this).val()) > parseFloat($(this).attr('maxnum'))) {
            alert('已达上限');
            $(this).val($(this).attr('maxnum'));
        }
    });

    //新建报价单 - 选择账户
    $('.tanceng .pur_quote_create_choose_account').die('click').live('click', function () {
        $.ajax({
            url: SERVER_URL + '/company/list',
            type: 'GET',
            data: {token: token},
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                var accountHtml = '';
                $.each(oE.data.dataList, function (i, v) {
                    accountHtml += '<li accountid="'+v['id']+'">'+v['company_account_name']+'</li>'
                });
                $('.tanceng .pur_quote_create_choose_account_ul').html(accountHtml);
            },
            error: function(e){
                alert(e.msg);
                console.log(e);
            }
        });
    });
    $('.tanceng .pur_quote_create_choose_account_ul li').die('click').live('click', function(){
        purQuoteCreateData.account_id = $(this).attr('accountid');
    });
    var purSupData = {
        token: token,
        page: 1, //页面
        num: 10, //每页条数
        is_invalid: 0, // 0正常  1作废
        keywords: '',//关键字
        big_id: '',
        small_id: '',
        province: '', // 省id
        city: '' // 市id
    };
    //商品分类列表
    var purSupGoodsCateListData = {
        token: token,
        category: 1, //类型 1.商品 2.整机商品
        name: '', // 分类名称
        detail: 1, // 是否获取各类型的数量总数 0 否 1 是
        supply: 1
    };
    //获取商品分类列表
    function purSupGetGoodsCateListFn() {
        $.ajax({
            url: SERVER_URL + '/product-category/list',
            type: 'GET',
            data: purSupGoodsCateListData,
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                var datalist = oE.dataList;
                var goodsCateListHtml = '<li bigid="" goodscateid="0" class="Sideslip_list_on"><span>未分类</span></li>';
                var numTotal = 0;
                $.each(datalist, function (i, v) {
                    if (v['num'] == 0) return true;
                    goodsCateListHtml += '<li bigid="1" goodscateid="' + v['id'] + '"><span>' + v['name'] + '（' + v['num'] + '）</span></li>';
                    numTotal += parseFloat(v['num']);
                });
                $('.pur_sup_goods_cate_list_ul').html(goodsCateListHtml);
                $(".pur_sup_goods_cate_num").html(numTotal);
                if ($('.pur_sup_goods_cate_list_ul li').length > 0) {
                    purSupData.big_id = $('.pur_sup_goods_cate_list_ul li.Sideslip_list_on').attr('bigid');
                    purSupData.small_id = $('.pur_sup_goods_cate_list_ul li.Sideslip_list_on').attr('goodscateid');
                } else {
                    purSupData.big_id = 9;
                }
                getPurSupList();
            },
            error: function (e) {
                console.log(e);
            }
        });
    }

    //获取整机商品分类参数
    var purSupGetSettingCateData = {
        token: token,
        category: 2, // 类型 1.商品 2.整机商品
        name: '', // 分类名称
        detail: 1, // 是否获取各类型的数量总数 0 否 1 是
        supply: 1
    };

    //获取整机商品分类列表
    function purSupGetSettingCateListFn() {
        $.ajax({
            url: SERVER_URL + '/product-category/list',
            type: 'GET',
            data: purSupGetSettingCateData,
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                var datalist = oE.dataList;
                var completeCateListHtml = '<li bigid="" goodscateid="0" class="Sideslip_list_on"><span>未分类</span></li>';
                var numTotal = 0;
                $.each(datalist, function (i, v) {
                    if (v['num'] == 0) return true;
                    completeCateListHtml += '<li bigid="2" goodscateid="' + v['id'] + '" class="' + (i == 0 ? 'Sideslip_list_on' : '') + '"><span>' + v['name'] + '（' + v['num'] + '）</span></li>';
                    numTotal += parseFloat(v['num']);
                });
                $('.pur_sup_setting_cate_num').html(numTotal);
                $('.pur_sup_setting_cate_list_ul').html(completeCateListHtml);
                if ($('.pur_sup_setting_cate_list_ul li').length > 0) {
                    purSupData.big_id = $('.pur_sup_setting_cate_list_ul li.Sideslip_list_on').attr('bigid');
                    purSupData.small_id = $('.pur_sup_setting_cate_list_ul li.Sideslip_list_on').attr('goodscateid');
                } else {
                    purSupData.big_id = 9;
                }
                getPurSupList();
            },
            error: function (e) {
                console.log(e);
            }
        });
    }

    $('.tanceng .pur_quote_create_sup_cate_nav_ul li:nth-of-type(1)').live('click', function () {
        purSupGetGoodsCateListFn();
    });
    $('.tanceng .pur_quote_create_sup_cate_nav_ul li:nth-of-type(2)').live('click', function () {
        purSupGetSettingCateListFn();
    });
    /*(function () {
     $.ajax({
     url: SERVER_URL + '/product-category/list',
     type: 'GET',
     data: purSupGetSettingCateData,
     dataType: 'json',
     success: function (oE) {
     var datalist = oE.dataList;
     var completeCateListHtml = '';
     var numTotal = 0;
     $.each(datalist, function (i, v) {
     numTotal += parseFloat(v['num']);
     });
     $('.pur_sup_setting_cate_num').html(numTotal);
     },
     error: function (e) {
     console.log(e);
     }
     });
     })();*/
    function getPurSupList() {
        $.ajax({
            url: SERVER_URL + '/supplier/list',
            type: 'GET',
            data: purSupData,
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                if (oE.code == 0) {
                    //搜索总条数
                    $('.tanceng .pur_quote_create_supplier_search_total').html(oE.totalcount);
                    //获取datalist
                    var datalist = oE.datalist;
                    if (datalist.length == 0) {
                        $('.pur_quote_create_choose_sup_nodata_box').removeClass('none');
                        $('.pur_quote_create_choose_supplier_handle').addClass('none');
                    } else {
                        $('.pur_quote_create_choose_sup_nodata_box').addClass('none');
                        $('.pur_quote_create_choose_supplier_handle').removeClass('none');
                    }
                    //字符串拼接
                    var purSupHtml = '';
                    $.each(datalist, function (i, v) {
                        //作废状态判断
                        var sortStatus = '';
                        var sortStatusClass = '';
                        var sortStatusBtn = '';
                        if (v['is_invalid'] == 0) {
                            sortStatus = l_dbl(i + 1);
                            sortStatusClass = '';
                            sortStatusBtn = '<button class="but_mix but_exit val_dialog pur_sup_edit_btn" name="cg_ghs_exit">编辑</button><button class=" but_mix but_void but_r pur_sup_zf_btn">作废</button><button class="but_r but_mix val_dialog sq_gys_Delete" name="cg_gys_Delete">删除</button>'
                        } else if (v['is_invalid'] == 1) {
                            sortStatus = '<span class="voidIcon pur_sup_zf_btn">作废</span>';
                            sortStatusClass = 'grey';
                            sortStatusBtn = '';
                        }
                        //供应商联系人信息
                        var contacts1 = [];
                        var contacts2 = '';
                        var contactsMsgBox = '';
                        if (v['contacts'].length > 0) {
                            $.each(v['contacts'], function (i2, v2) {
                                contacts1.push(v2['name']);
                                contacts2 += '<div class="cg_ghs_contMsgBoxDet cg_gys_contMsgBox"><p>客户联系人 <span>' + (i2 + 1) + '</span></p>\
                                <h3 class="cont_title">' + v2['contact_person'] + '</h3>\
                                <ul>\
                                <li>类型: ' + v2['contact_type'] + '</li>\
                                <li>职务: ' + v2['jobs'] + '</li>\
                            <li>电话: ' + v2['contact_tel'] + '</li>\
                            <li>邮箱: ' + v2['email'] + '</li>\
                            </ul>\
                            </div>'
                            });
                            contactsMsgBox = '<div class="lik_dialog_mousemove cg_ghs_contMsgBox" style="z-index: 9999;position:fixed;display:none!important;">\
                                                <i class="cg_ghs_torr"></i>\
                                                ' + contacts2 + '\
                                            </div>'
                        } else {
                            contactsMsgBox = '';
                        }
                        contacts1 = contacts1.join('、');
                        purSupHtml += '<tr pursupid="' + v['id'] + '" class="' + sortStatusClass + '">\
                                            <td><input name="pursup" type="radio" ' + (i == 0 ? 'checked' : '') + '></td>\
                                            <td>' + sortStatus + '</td>\
                                            <td>' + v['code_sn'] + '</td>\
                                            <td>' + v['name'] + '</td>\
                                            <td>' + v['tel'] + '</td>\
                                            <td><p class="xiangmu_p5">' + v['address'] + '</p></td>\
                                            <td>' + v['comefrom_name'] + '</td>\
                                            <td class="vend_client_contact f_color cg_ghs_contact" style="cursor: pointer;">' + v['contact_person'] + contactsMsgBox + '\
                                            </td>\
                                            <td>' + v['note'] + '</td>\
                                            </tr>'
                    });
                    //供应商数据渲染
                    $('.pur_quote_create_choose_sup_list').html(purSupHtml);
                }
                //分页
                list_table_render_pagination('.pur_supplier_pagination', purSupData, getPurSupList, oE.totalcount, datalist.length);
                $('#pur_supplier_look_save').trigger('click');
            }
        });
    }

    //搜索关键字
    $('.tanceng .pur_quote_create_choose_sup_search').live('click', function () {
        if ($('.tanceng .pur_quote_create_choose_sup_search_inp').val() == '搜索供应商编号/供应商名称') {
            purSupData.keywords = '';
        } else {
            purSupData.keywords = $('.tanceng .pur_quote_create_choose_sup_search_inp').val();
        }
        getPurSupList();
    });
    //分类搜索供应商
    $('.pur_sup_goods_cate_list_ul li').live('click', function () {
        purSupData.big_id = $(this).attr('bigid');
        purSupData.small_id = $(this).attr('goodscateid');
        getPurSupList();
    });
    $('.pur_sup_setting_cate_list_ul li').live('click', function () {
        purSupData.big_id = $(this).attr('bigid');
        purSupData.small_id = $(this).attr('goodscateid');
        getPurSupList();
    });
    //地区搜索供应商

    //选择省
    $('.pur_sup_search_province_btn').live('click', function () {
        $.ajax({
            url: SERVER_URL + '/industry/provincelist',
            type: 'GET',
            data: {
                token: token
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var datalist = oE.datalist;
                    var areaListProvince = '<li provinceid="">全部</li>';
                    $.each(datalist, function (i, v) {
                        areaListProvince += '<li provinceid="' + v['provinceID'] + '">' + v['province'] + '</li>'
                    });
                    $('.pur_sup_search_province_ul').html(areaListProvince);
                }
            }
        })
    });
    $('.pur_sup_search_province_ul li').live('click', function () {
        purSupData.province = $(this).attr('provinceid');
        getPurSupList();
        $.ajax({
            url: SERVER_URL + '/industry/citylist',
            type: 'GET',
            data: {
                token: token,
                province_id: purSupData.province
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var datalist = oE.datalist;
                    var areaListCity = '<li cityid="">全部</li>';
                    $.each(datalist, function (i, v) {
                        areaListCity += '<li cityid="' + v['cityID'] + '">' + v['city'] + '</li>'
                    });
                    $('.pur_sup_search_city_ul').html(areaListCity);
                }
            }
        });
    });
    //选择市
    $('.pur_sup_search_city_ul li').live('click', function () {
        purSupData.city = $(this).attr('cityid');
        getPurSupList();
    });

    //选择供应商
    $('.tanceng .pur_quote_create_choose_supplier_btn').die('click').live('click', function () {
        purSupData = {
            token: token,
            page: 1, //页面
            num: 10, //每页条数
            is_invalid: 0, // 0正常  1作废
            keywords: '',//关键字
            big_id: '',
            small_id: '',
            province: '', // 省id
            city: '' // 市id
        };
        $('.tanceng .pur_quote_create_sup_cate_nav_ul li:nth-of-type(1)').trigger('click');
    });

    //供应商选择分类
    $('.tanceng .pur_quote_create_choose_sup_cate_ul li').die('click').live('click', function () {
        purQuoteChooseSupData.category_id = $(this).attr('cussortid');
        purQuoteChooseSupList();
    });

    //搜索关键字
    $('.pur_quote_create_choose_sup_search_btn').die('click').live('click', function () {
        if ($('.pur_quote_create_choose_sup_search_inp').val() == '搜索供应商名称') {
            alert('请输入搜索关键字');
            purQuoteChooseSupData.key = '';
        } else {
            purQuoteChooseSupData.key = $('.pur_quote_create_choose_sup_search_inp').val();
        }
        purQuoteChooseSupList();
    });
    //选择供应商 - 保存
    $('.tanceng .pur_quote_create_choose_supplier_save').die('click').live('click', function () {
        var purSupCurTr = $('.tanceng .pur_quote_create_choose_sup_list tr input:checked').closest('tr');
        $('.tanceng .pur_quote_create_choose_supplier_inp').val(purSupCurTr.find('td').eq(3).html()).css('color', '#333');
        purQuoteCreateData.supplier_id = purSupCurTr.attr('pursupid');
        $(this).closest('.dialog_box').remove();
    });

    //选择负责人
    $('.tanceng .pur_quote_create_choose_owner_btn').die('click').live('click', function () {
        purQuoteCreateChooseOwnerFn();
        //选择负责人确认
        $('.tanceng .after_order_create_choose_owner_save').die('click').live('click', function () {
            //新建
            purQuoteCreateData.owner = $('.tanceng .list_check').closest('li').attr('userinfoid');
            purQuoteCreateData.dept = $('.tanceng .list_check').closest('ul.ul3').prev('.left_1').attr('cussortid');
            $('.tanceng .pur_quote_create_choose_owner_inp').val($('.tanceng .list_check').closest('li').find('.list_msg').html());
            //编辑
            /*purQuoteEditData.owner = $('.tanceng .list_check').closest('li').attr('userinfoid');
             purQuoteEditData.dept = $('.tanceng .list_check').closest('ul.ul3').prev('.left_1').attr('cussortid');*/
            $('.tanceng .pur_quote_edit_choose_owner_inp').val($('.tanceng .list_check').closest('li').find('.list_msg').html());
            $(this).closest('.dialog_box').remove();
        })
    });

    //选择审批人
    $('.tanceng .pur_quote_create_choose_flow_btn').die('click').live('click', function () {
        purQuoteCreateChooseOwnerFn();
    });
    //选择审批人确认
    $('.tanceng .pur_quote_create_choose_flow_save').die('click').live('click', function () {
        if ($.inArray($('.tanceng .list_check').closest('li').attr('userinfoid'), purQuoteCreateFlowChosenArr) == -1) {
            purQuoteCreateFlowChosenArr.push($('.tanceng .list_check').closest('li').attr('userinfoid'));
            $('.tanceng .pur_quote_create_flow_list .pur_quote_create_flow_list_add_btn').before('<li flowid="' + $('.tanceng .list_check').closest('li').attr('userinfoid') + '"><em class="icon_personBtn icon_personBtn_msg"><i class="icon_personNext"></i></em><em class="icon_adderBtn"></em><p class="box_adderName">' + $('.tanceng .list_check').closest('li').find('.list_msg').html() + '</p><p class="box_addermsg"></p></li>');
            $('.tanceng .pur_quote_edit_flow_list .pur_quote_edit_flow_list_add_btn').before('<li flowid="' + $('.tanceng .list_check').closest('li').attr('userinfoid') + '"><em class="icon_personBtn icon_personBtn_msg"><i class="icon_personNext"></i></em><em class="icon_adderBtn"></em><p class="box_adderName">' + $('.tanceng .list_check').closest('li').find('.list_msg').html() + '</p><p class="box_addermsg"></p></li>');
        } else {
            alert('请不要重复选择审批人');
            return false;
        }
        $(this).closest('.dialog_box').remove();
    });
    $('.ven_sell_quote_create_flow_del_btn').die('click').live('click', function () {
        var index = $(this).closest('li').index();
        purQuoteCreateFlowChosenArr.splice(index, 1);
        $(this).closest('li').remove();
    });

    //负责人列表 / 审批人列表
    function purQuoteCreateChooseOwnerFn() {
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
                    $('.tanceng .pur_quote_create_choose_owner_list').html(tree_list_person(datalist, deep));
                    //审批人列表
                    $('.tanceng .pur_quote_create_choose_flow_list').html(tree_list_person(datalist, deep));
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

    /*新建销售报价单 - 选择普通商品*/

    //选择商品
    //商品分类参数
    var purQuoteCreateChooseGoodsCateListData = {
        token: token,
        category: '', //类型 1.商品 2.整机商品
        name: '', // 分类名称
        detail: 1 // 是否获取各类型的数量总数 0 否 1 是
    };
    //商品分类
    function purQuoteCreateChooseGoodsSortFn() {
        $.ajax({
            url: SERVER_URL + '/product-category/list',
            type: 'GET',
            data: purQuoteCreateChooseGoodsCateListData,
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                var datalist = oE.dataList;
                var goodsCateListHtml = '';
                $.each(datalist, function (i, v) {
                    goodsCateListHtml += '<li goodscateid="' + v['id'] + '" class="' + (i == 0 ? 'Sideslip_list_on' : '') + '"><span>' + v['name'] + '</span></li>';
                });
                $('.tanceng .pur_quote_create_choose_goods_cate_list').html(goodsCateListHtml);
                getGoodsListByCateFn($('.tanceng .pur_quote_create_choose_goods_cate_list li:nth-of-type(1)').attr('goodscateid'));
            },
            error: function (e) {
                alert(e.msg);
                console.log(e);
            }
        });
    }

    //商品分类搜索功能
    $('.pur_quote_create_choose_goods_cate_search_btn').die('click').live('click', function () {
        if ($('.pur_quote_create_choose_goods_cate_search_inp').val() == '') {
            return false;
        }
        $('.tanceng .pur_quote_create_choose_goods_inp_add_list').html('<li style="margin-top: 1px;">' + $('.pur_quote_create_choose_goods_cate_search_inp').val() + ' <i></i></li>');
        purQuoteCreateChooseGoodsCateListData.name = $('.pur_quote_create_choose_goods_cate_search_inp').val();
        purQuoteCreateChooseGoodsSortFn();
        $('.pur_quote_create_choose_goods_cate_search_inp').val('').attr('readonly', true);
    });

    //商品分类 - 删除搜索项
    $('.tanceng .pur_quote_create_choose_goods_inp_add_list li i').die('click').live('click', function () {
        $(this).closest('li').remove();
        purQuoteCreateChooseGoodsCateListData.name = '';
        purQuoteCreateChooseGoodsSortFn();
        $('.pur_quote_create_choose_goods_cate_search_inp').val('').attr('readonly', false);
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
    $('.pur_quote_create_choose_goods_cate_list li').die('click').live('click', function () {
        $('.pur_quote_create_choose_goods_list_search_inp').val('搜索商品编号/商品名称').css('#ccc');
        getGoodsListData.key = '';
        getGoodsListByCateFn($(this).attr('goodscateid'));
    });
    //获取基本商品列表
    function purQuoteCreateChooseGoodsFn() {
        $.ajax({
            url: SERVER_URL + '/product/list',
            type: 'GET',
            data: getGoodsListData,
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                //搜索结果
                $('.tanceng .pur_quote_create_choose_goods_totals').html(oE.totalcount);
                var datalist = oE.dataList;
                if (datalist.length == 0) {
                    $('.pur_quote_create_choose_goods_nodata_box').removeClass('none');
                    $('.pur_quote_create_choose_goods_handle').addClass('none');
                } else {
                    $('.pur_quote_create_choose_goods_nodata_box').addClass('none');
                    $('.pur_quote_create_choose_goods_handle').removeClass('none');
                }
                var goodsListHtml = '';
                //属性名
                var goodsAttrNameArr = getGoodsCateAttrTheadListFn(getGoodsListData.cate_id);
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
                $('.tanceng .pur_quote_create_choose_goods_list_thead').html('<tr><th>选择</th><th>序号</th><th>商品编号</th><th>名称</th><th>基本单位</th>' + goodsAttrName + '<th>备注</th></tr>');
                //表格主体
                $('.tanceng .pur_quote_create_choose_goods_list').html(goodsListHtml);
                //分页
                list_table_render_pagination('.pur_quote_create_choose_goods_pagination', getGoodsListData, purQuoteCreateChooseGoodsFn, oE.totalcount, datalist.length);
                $('.table-container').scroll(function () {
                    $('.table_head_fixed').css('left', -$(this).scrollLeft());
                    $('.pur_quote_create_choose_goods_nodata_box').css('padding-left', parseInt($(this).scrollLeft()));
                })
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
            $('.pur_quote_create_choose_goods_list').addClass('none');
            $('.pur_quote_create_choose_goods_handle').addClass('none');
            $('.pur_quote_create_choose_goods_nodata_box').removeClass('none');
            return false;
        } else {
            getGoodsListData.cate_id = cateid;
            $('.pur_quote_create_choose_goods_list').removeClass('none');
            $('.pur_quote_create_choose_goods_handle').removeClass('none');
            $('.pur_quote_create_choose_goods_nodata_box').addClass('none');
        }
        purQuoteCreateChooseGoodsFn();
        getGoodsCateAttrListFn(cateid);
    }

    //商品属性高级搜索
    $('.tanceng .goods_attr_search_table li').live('click', function () {
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
        getGoodsListData.cate_id = $('.pur_quote_create_choose_goods_cate_list li.Sideslip_list_on').attr('goodscateid');
        getGoodsListData.attr = arrayToJson(attrSearchField);
        purQuoteCreateChooseGoodsFn();
    });
    //商品属性
    function getGoodsCateAttrListFn(cateId) {
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
                    var datalist = oE.data.attrList;
                    var cateAttrList = '';
                    console.log(datalist);
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
                    });
                    $('.goods_attr_search_table').html(cateAttrList);
                }
            },
            error: function (e) {
            }
        });
    }

    function getGoodsCateAttrTheadListFn(cateId) {
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
                    var datalist = oE.data.attrList;
                    console.log(datalist);
                    $.each(datalist, function (i, v) {
                        goodsAttrList.push(v['category_name']);
                    });
                }
            },
            error: function (e) {
            }
        });
        return goodsAttrList;
    }


    //搜索关键字
    $('.tanceng .pur_quote_create_choose_goods_search_btn').die('click').live('click', function () {
        if ($('.tanceng .pur_quote_create_choose_goods_search_inp').val() == '搜索商品编号/商品名称') {
            getGoodsListData.key = '';
        } else {
            getGoodsListData.key = $('.tanceng .pur_quote_create_choose_goods_search_inp').val();
        }
        purQuoteCreateChooseGoodsFn();
    });

    //选择商品
    $('.tanceng .pur_quote_create_choose_goods_btn').die('click').live('click', function () {
        //展开高级搜索隐藏
        $('.tanceng .zkgjss_content').hide();
        $('.tanceng .zkgjssBtn').next('i').hide();
        purQuoteCreateChooseGoodsSortFn();
    });
    $('.tanceng .pur_quote_choose_products_ul li').die('click').live('click', function () {
        /*if ($(this).index() == 0) {
            aPurQuoteCreateGoodsChosen = [];
        } else if ($(this).index() == 2) {
            purQuoteSettingGoodsListArr = [];
            purQuoteSettingGoodsListValArr = [];
            aPurQuoteCreateSettingChosen = [];
        }*/
    });
    //选择商品 - 保存
    $('.tanceng .pur_quote_create_choose_goods_save_btn').die('click').live('click', function () {
        $.each($('.tanceng .pur_quote_create_choose_goods_list tr'), function (i, v) {
            if ($('.tanceng .pur_quote_create_choose_goods_list tr').eq(i).find('input:checkbox').is(':checked')) {
                aPurQuoteCreateGoodsChosen.push({
                    'goodsid': $('.tanceng .pur_quote_create_choose_goods_list tr').eq(i).attr('goodsid'),
                    'goodstaxtype': $('.tanceng .pur_quote_create_choose_goods_list tr').eq(i).attr('goodstaxtype'),
                    'goodsname': $('.tanceng .pur_quote_create_choose_goods_cate_list li.Sideslip_list_on').text(),
                    'goodscodesn': $('.tanceng .pur_quote_create_choose_goods_list tr').eq(i).find('td.goodscodesn').html(),
                    'goodsattr': $('.tanceng .pur_quote_create_choose_goods_list tr').eq(i).attr('goodsattr'),
                    'goodsunitname': $('.tanceng .pur_quote_create_choose_goods_list tr').eq(i).find('td.goodsunitname').html()
                });
            }
            //$('.tanceng .pur_quote_create_choose_goods_list tr').eq(i).find('input.goodsnum').val();
        });
        var purQuoteCreateGoodsList = '';
        aPurQuoteCreateGoodsChosen = getJsonArr(aPurQuoteCreateGoodsChosen);
        if (aPurQuoteCreateGoodsChosen.length != 0) {
            $('.tanceng .pur_quote_create_chosen_goods_add_btn_tr').addClass('none');
        } else {
            $('.tanceng .pur_quote_create_chosen_goods_add_btn_tr').removeClass('none');
        }
        console.log(aPurQuoteCreateGoodsChosen);
        $.each(aPurQuoteCreateGoodsChosen, function (i, v) {

            //上次报价
            var priceLastTime = 0;
            $.ajax({
                url: SERVER_URL + '/quote/goodhislist',
                type: 'GET',
                data: {
                    token: token,
                    good_id: v['goodsid'],
                    thetype: 2
                },
                async: false,
                dataType: 'json',
                success: function (oE) {
                    console.log(oE);
                    if (oE.code == 0) {
                        priceLastTime = oE.data.price ? oE.data.price : 0;
                    }
                },
                error: function (e) {
                    alert(e.msg);
                    console.log(e);
                }
            });

            if (purQuoteCreateData.quote_id == 0) {
                priceLastTime = 0;
            }

            var taxNum = 0;
            if ($('.tanceng .pur_quote_create_tax_num_inp').val() == '含税17%') {
                taxNum = 17;
            } else if ($('.tanceng .pur_quote_create_tax_num_inp').val() == '无税') {
                taxNum = 0;
            }
            purQuoteCreateGoodsList += '<tr goodsid="' + v['goodsid'] + '" lik_up_down_type="0">\
                                            <td class="pur_quote_create_choose_goods_order">' + l_dbl(i + 1) + '</td>\
                                            <td class="xs_f_color sell_quote_create_choose_goods_name">' + v['goodsname'] + '</td>\
                                                <td>' + v['goodscodesn'] + '</td>\
                                                <td>' + v['goodsattr'] + '</td>\
                                                <td>' + v['goodsunitname'] + '</td>\
                                                <td>\
                                                <div class="xs_num_input num_input inline_block num_input_new"><button class="but_grey_a but_opa_small inp_plus pur_quote_productnum_change">+</button><input type="text" class="lik_input_number productnum pur_quote_productnum_input_change" value="1"/><button class="but_grey_a but_opa_small radius_left_0 inp_reduce pur_quote_productnum_change">-</button></div>\
                                                    </td>\
                                                    <td class="xs_goods_box" style="position: relative;">\
                                                    <div class="xs_goods_big_box"><div class="inline_block select_100"><input type="text" class="lik_input_number c_3 time_input ' + ((priceLastTime == 0 || purQuoteCreateData.quote_id == 0) ? '' : 'xs_bjd_inp') + '  xs_xsbjd_inp_60 product_reference_price pur_quote_goods_cost_one" lastprice = "' + priceLastTime + '" value="0" style="color: rgb(153, 153, 153);margin-right: 10px;"></div><i class="ven_warning_arrow xs_goods_down_img" style="margin: 0;position: absolute;top: 21px;right: 6px;display:none;"></i><ul class="xs_goods_select select_list" style="padding-bottom:5px; ' + (priceLastTime == 0 ? 'display:none;' : '') + '"><div class="xs_goods_li_box"><p class="p1">上次报价：</p><p class="p2">' + priceLastTime + '</p><i class="ven_warning_arrow xs_goods_down_img xs_goods_down_img1"></i><p></p></div></ul></div><div class="work_vent_client_contMsgBox"><i class="work_vent_client_torr"></i><div class="work_vent_client_contMsgBoxDet fnc_output_ticket_total_remain_ticket_num_list"><span class="lik_up_down_text"></span>于 ' + priceLastTime + '(上次报价)</div></div>\
                                                </td>\
                                                    <td><span class="pur_quote_tax_num pur_quote_goods_tax_one c_y">' + taxNum + '</span></td>\
                                                    <td><span class="pur_quote_goods_tax_total">0</span></td>\
                                                    <td><span class="pur_quote_goods_one_cost_total">0</span></td>\
                                                <td><button class="but_blue but_opa_small but_green val_dialogTop pur_quote_create_choose_goods_btn" name="cg_cgbjd_xzsp">+</button><button class="but_opa_small but_red pur_quote_create_goods_del_btn">-</button></td>\
                                            </tr>'
        });
        $('.tanceng .pur_quote_create_chosen_goods_tbody').html(purQuoteCreateGoodsList);
        //productnumChangeFn();
        //goodTaxTotalsFn();
        //goodCostTotalsFn();
        $(this).closest('.dialog_box').remove();
        purQuoteCreateProductnumChangeFn();
    });

    //商品数量控制
    function purQuoteCreateProductnumChangeFn() {
        var goodsNumTotal = 0;
        $.each($('.tanceng .pur_quote_create_chosen_goods_tbody .productnum'), function (i, v) {
            goodsNumTotal += parseFloat($('.tanceng .pur_quote_create_chosen_goods_tbody .productnum').eq(i).val());
        });
        $('.tanceng .pur_quote_create_goods_num_total').html(goodsNumTotal);
    }

    //商品数量增加减少
    $('.tanceng .pur_quote_create_chosen_goods_tbody .pur_quote_productnum_change').die('click').live('click', function () {
        if (parseFloat($(this).siblings('input').val()) > parseFloat($(this).siblings('input').attr('maxnum'))) {
            alert('已达上限');
            $(this).siblings('input').val($(this).siblings('input').attr('maxnum'));
        }
        var index = $(this).closest('tr').index();
        purQuoteCreateProductnumChangeFn();
        purQuoteCreateGoodCostCalcFn(index);
        purQuoteCreateGoodCostTotalsFn();
        purQuoteCreateGoodTaxTotalsFn();
    });
    $('.tanceng .pur_quote_create_chosen_goods_tbody .pur_quote_productnum_input_change').live('keyup', function () {
        if (parseFloat($(this).val()) > parseFloat($(this).attr('maxnum'))) {
            alert('已达上限');
            $(this).val($(this).attr('maxnum'));
        }
        var index = $(this).closest('tr').index();
        purQuoteCreateProductnumChangeFn();
        purQuoteCreateGoodCostCalcFn(index);
        purQuoteCreateGoodCostTotalsFn();
        purQuoteCreateGoodTaxTotalsFn();
    });

    //商品数量增加减少
    $('.tanceng .pur_quote_create_chosen_goods_tbody .pur_quote_productnum_input_change').die('keyup').live('keyup', function () {
        var index = $(this).closest('tr').index();
        purQuoteCreateProductnumChangeFn();
        purQuoteCreateGoodCostCalcFn(index);
        purQuoteCreateGoodCostTotalsFn();
        purQuoteCreateGoodTaxTotalsFn();
    });
    //商品单价调整
    $('.tanceng .pur_quote_create_chosen_goods_tbody .pur_quote_goods_cost_one').live('keyup', function () {
        var index = $(this).closest('tr').index();
        purQuoteCreateGoodCostCalcFn(index);
        purQuoteCreateGoodCostTotalsFn();
        purQuoteCreateGoodTaxTotalsFn();
        //与上次报价相比
        if (parseFloat($(this).val()) > parseFloat($(this).attr('lastprice'))) {
            $(this).parent().next().addClass('ven_warning_arrow_up').css('display', '');
            $(this).closest('td').find('.lik_up_down_text').text('高');
            $(this).closest('tr').attr('lik_up_down_type', '1');
            $(this).parent().siblings('ul').find('.xs_goods_li_box i').css({
                'display': '',
                'margin': '-3px 8px'
            }).removeClass('ven_warning_arrow').addClass('ven_warning_arrow_up');
        } else if (parseFloat($(this).val()) < parseFloat($(this).attr('lastprice'))) {
            $(this).parent().next().removeClass('ven_warning_arrow_up').css('display', '');
            $(this).closest('td').find('.lik_up_down_text').text('低');
            $(this).closest('tr').attr('lik_up_down_type', '2');
            $(this).parent().siblings('ul').find('.xs_goods_li_box i').css({
                'display': '',
                'margin': '-3px 8px'
            }).removeClass('ven_warning_arrow_up').addClass('ven_warning_arrow');
        } else {
            $(this).parent().next().css('display', 'none');
            $(this).closest('tr').attr('lik_up_down_type', '0');
            $(this).parent().siblings('ul').find('.xs_goods_li_box i').css('display', 'none');
        }
    });
    //商品总价
    function purQuoteCreateGoodCostTotalsFn() {
        var goodsCostTotals = 0;
        $.each($('.tanceng .pur_quote_create_chosen_goods_tbody .pur_quote_goods_one_cost_total'), function (i, v) {
            goodsCostTotals += parseFloat($('.tanceng .pur_quote_create_chosen_goods_tbody .pur_quote_goods_one_cost_total').eq(i).html());
        });
        $('.tanceng .pur_quote_goods_cost_total').html(moneyToFixed(goodsCostTotals));
        purQuoteCreateProductCostTotalFn();
    }

    //税额总价
    function purQuoteCreateGoodTaxTotalsFn() {
        var goodsTaxTotals = 0;
        $.each($('.tanceng .pur_quote_create_chosen_goods_tbody .pur_quote_goods_tax_total'), function (i, v) {
            goodsTaxTotals += parseFloat($('.tanceng .pur_quote_create_chosen_goods_tbody .pur_quote_goods_tax_total').eq(i).html());
        });
        $('.tanceng .pur_quote_create_goods_tax_total').html(moneyToFixed(goodsTaxTotals));
        purQuoteCreateProductCostTotalFn();
    }

    //商品单条金额计算
    function purQuoteCreateGoodCostCalcFn(index) {
        //单条商品税额
        $('.tanceng .pur_quote_create_chosen_goods_tbody .pur_quote_goods_tax_total').eq(index).html(moneyToFixed($('.tanceng .pur_quote_create_chosen_goods_tbody .pur_quote_goods_cost_one').eq(index).val() * (100 + parseFloat($('.tanceng .pur_quote_create_chosen_goods_tbody .pur_quote_goods_tax_one').eq(index).html())) / 100));
        //单条商品价格
        $('.tanceng .pur_quote_create_chosen_goods_tbody .pur_quote_goods_one_cost_total').eq(index).html(moneyToFixed($('.tanceng .pur_quote_create_chosen_goods_tbody .productnum').eq(index).val() * $('.tanceng .pur_quote_create_chosen_goods_tbody .pur_quote_goods_tax_total').eq(index).text()));
    }

    //删除单条商品
    $('.tanceng .pur_quote_create_chosen_goods_tbody .pur_quote_create_goods_del_btn').die('click').live('click', function () {
        var index = $(this).closest('tr').index();
        aPurQuoteCreateGoodsChosen.splice(index, 1);
        if (aPurQuoteCreateGoodsChosen.length != 0) {
            $('.tanceng .pur_quote_create_chosen_goods_add_btn_tr').addClass('none');
        } else {
            $('.tanceng .pur_quote_create_chosen_goods_add_btn_tr').removeClass('none');
        }
        $(this).closest('tr').remove();
        purQuoteCreateProductnumChangeFn();
        purQuoteCreateGoodCostTotalsFn();
        purQuoteCreateGoodTaxTotalsFn();
        purQuoteCreateProductCostTotalFn();
        purQuoteCreateGoodsArrOrderFn('pur_quote_create_chosen_goods_tbody');

    });

    //选择商品 - 序号
    function purQuoteCreateGoodsArrOrderFn(parentClass) {
        $.each($('.tanceng .' + parentClass + ' .pur_quote_create_choose_goods_order'), function (i, v) {
            $('.tanceng .' + parentClass + ' .pur_quote_create_choose_goods_order').eq(i).html(l_dbl(i + 1));
        })
    }

    /*新建采购报价单 - 选择整机商品*/

    $('.tanceng .pur_quote_create_choose_setting_btn').die('click').live('click', function () {
        purQuoteSettingSortData = {
            token: token,
            category: 2, // 类型 1.商品 2.整机商品
            name: '', // 分类名称
            detail: 1 // 是否获取各类型的数量总数 0 否 1 是
        };
        purQuoteCreateChooseSettingSortFn();
        purQuoteSettingGoodsListArr = [];
        $.each($('.tanceng .pur_quote_create_choose_setting_box_list .pur_quote_create_choose_setting_kxp_list'), function (i, v) {
            purQuoteSettingGoodsListArr.push($('.tanceng .pur_quote_create_choose_setting_box_list .pur_quote_create_choose_setting_kxp_list').eq(i).html());
        });
        purQuoteSettingGoodsListValArr = [];
        $.each($('.tanceng .pur_quote_create_choose_setting_box_list .sell_quote_create_setting_cost_one_change'), function (i, v) {
            purQuoteSettingGoodsListValArr.push($('.tanceng .pur_quote_create_choose_setting_box_list .sell_quote_create_setting_cost_one_change').eq(i).val());
        });
    });

    //整机商品分类参数
    var purQuoteSettingSortData = {
        token: token,
        category: 2, // 类型 1.商品 2.整机商品
        name: '', // 分类名称
        detail: 1 // 是否获取各类型的数量总数 0 否 1 是
    };
    //整机商品分类
    function purQuoteCreateChooseSettingSortFn() {
        $.ajax({
            url: SERVER_URL + '/product-category/list',
            type: 'GET',
            data: purQuoteSettingSortData,
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                var datalist = oE.dataList;
                var completeCateListHtml = '';
                $.each(datalist, function (i, v) {
                    completeCateListHtml += '<li completecateid="' + v['id'] + '" class="' + (i == 0 ? 'Sideslip_list_on' : '') + '"><span>' + v['name'] + '</span></li>';
                });
                $('.pur_quote_create_choose_setting_sort_list').html(completeCateListHtml);
                getPurQuoteChooseCompleteGoodsListByCateFn($('.pur_quote_create_choose_setting_sort_list li:nth-of-type(1)').attr('completecateid'));
            },
            error: function (e) {
                alert(e.msg);
                console.log(e);
            }
        });
    }

    //获取整机商品列表参数
    var getPurQuoteChooseCompleteGoodsListData = {
        token: token,
        key: '', //关键字
        page: 1, //页码
        num: 10, //每页数量
        status: 0, //是否启用状态 0正常 1停用
        cate_id: '', //分类id
        is_optional: '' //是否可选配 1 是 2 否
    };
    //选择整机商品分类切换整机商品列表
    $('.tanceng .pur_quote_create_choose_setting_sort_list li').die('click').live('click', function () {
        $('.tanceng .pur_quote_create_choose_setting_search_inp').val('搜索商品编号/商品名称').css('#ccc');
        getPurQuoteChooseCompleteGoodsListData.key = '';
        getPurQuoteChooseCompleteGoodsListData.page = 1;
        getPurQuoteChooseCompleteGoodsListByCateFn($(this).attr('completecateid'));
    });
    //获取整机商品列表
    function getPurQuoteChooseCompleteGoodsListFn() {
        $.ajax({
            url: SERVER_URL + '/product-setting/list',
            type: 'GET',
            data: getPurQuoteChooseCompleteGoodsListData,
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                //搜索结果
                $('.tanceng .pur_quote_create_choose_setting_totals').html(oE.totalcount);
                var datalist = oE.datalist;
                if (datalist.length == 0) {
                    $('.tanceng .pur_quote_create_choose_setting_nodata_box').removeClass('none');
                    $('.tanceng .pur_quote_create_choose_setting_handle').addClass('none');
                } else {
                    $('.tanceng .pur_quote_create_choose_setting_nodata_box').addClass('none');
                    $('.tanceng .pur_quote_create_choose_setting_handle').removeClass('none');
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
                $('.tanceng .pur_quote_create_choose_setting_list').html(completeListHtml);
                //分页
                list_table_render_pagination('.tanceng .pur_quote_create_choose_setting_pagination', getPurQuoteChooseCompleteGoodsListData, getPurQuoteChooseCompleteGoodsListFn, oE.totalcount, datalist.length);
            },
            error: function (e) {
                alert(e.msg);
                console.log(e);
            }
        });
    }

    //切换分类调取不同列表 函数
    function getPurQuoteChooseCompleteGoodsListByCateFn(cateid) {
        if (cateid == undefined) {
            $('.pur_quote_create_choose_setting_list').addClass('none');
            $('.pur_quote_create_choose_setting_handle').addClass('none');
            $('.pur_quote_create_choose_setting_nodata_box').removeClass('none');
            return false;
        } else {
            getPurQuoteChooseCompleteGoodsListData.cate_id = cateid;
            $('.pur_quote_create_choose_setting_list').removeClass('none');
            $('.pur_quote_create_choose_setting_handle').removeClass('none');
            $('.pur_quote_create_choose_setting_nodata_box').addClass('none');
        }
        getPurQuoteChooseCompleteGoodsListFn();
    }

    //整机商品分类搜索功能
    $('.pur_quote_create_choose_setting_cate_search_btn').die('click').live('click', function () {
        if ($('.tanceng .pur_quote_create_choose_setting_cate_search_inp').val() == '') {
            return false;
        }
        $('.pur_quote_create_choose_setting_inp_add_list').html('<li style="margin-top: 1px;">' + $('.tanceng .pur_quote_create_choose_setting_cate_search_inp').val() + ' <i></i></li>');
        purQuoteSettingSortData.name = $('.tanceng .pur_quote_create_choose_setting_cate_search_inp').val();
        purQuoteCreateChooseSettingSortFn();
        $('.tanceng .pur_quote_create_choose_setting_cate_search_inp').val('').attr('readonly', true);
    });
    //整机商品分类搜索 - 删除关键字
    $('.pur_quote_create_choose_setting_inp_add_list li i').die('click').live('click', function () {
        $(this).closest('li').remove();
        $('.tanceng .pur_quote_create_choose_setting_cate_search_inp').val('').attr('readonly', false);
        purQuoteSettingSortData.name = '';
        purQuoteCreateChooseSettingSortFn();
    });

    //整机商品 - 搜索关键字
    $('.tanceng .pur_quote_create_choose_setting_search_btn').die('click').live('click', function () {
        if ($('.tanceng .pur_quote_create_choose_setting_search_inp').val() == '搜索商品编号/商品名称') {
            alert('请输入搜索关键字');
            getPurQuoteChooseCompleteGoodsListData.key = '';
        } else {
            getPurQuoteChooseCompleteGoodsListData.key = $('.tanceng .pur_quote_create_choose_setting_search_inp').val();
        }
        getPurQuoteChooseCompleteGoodsListFn();
    });

    //整机商品 - 搜索整机类型
    $('.tanceng .pur_quote_create_choose_optional_list li').die('click').live('click', function () {
        getPurQuoteChooseCompleteGoodsListData.is_optional = $(this).attr('optional');
        getPurQuoteChooseCompleteGoodsListFn();
    });

    //选择整机商品 - 保存
    $('.tanceng .pur_quote_create_choose_setting_save').die('click').live('click', function () {
        $.each($('.tanceng .pur_quote_create_choose_setting_list tr'), function (i, v) {
            if ($('.tanceng .pur_quote_create_choose_setting_list tr').eq(i).find('input:checkbox').is(':checked')) {
                aPurQuoteCreateSettingChosen.push($('.tanceng .pur_quote_create_choose_setting_list tr').eq(i).attr('completeid'));
            }
        });
        aPurQuoteCreateSettingChosen = getJsonArr(aPurQuoteCreateSettingChosen);
        if (aPurQuoteCreateSettingChosen.length != 0) {
            $('.tanceng .pur_quote_create_chosen_setting_add_btn_tr').addClass('none');
        } else {
            $('.tanceng .pur_quote_create_chosen_setting_add_btn_tr').removeClass('none');
        }
        console.log(aPurQuoteCreateSettingChosen);
        $(this).closest('.dialog_box').remove();
        //整机商品选择后展示列表
        var aPurQuoteCreateSettingChosenHtml = '';
        if (aPurQuoteCreateSettingChosen.length > 0) {
            $('.tanceng .pur_quote_choose_setting_hj_head').addClass('none');
            $.each(aPurQuoteCreateSettingChosen, function (i, v) {

                //税率
                var taxNum = 0;
                if ($('.tanceng .pur_quote_create_tax_num_inp').val() == '含税17%') {
                    taxNum = 17;
                } else if ($('.tanceng .pur_quote_create_tax_num_inp').val() == '无税') {
                    taxNum = 0;
                }
                //配件商品信息
                var sellQuoteCreateSettingGoodsList = '';
                $.ajax({
                    url: SERVER_URL + '/product-setting/loadsetting',
                    type: 'GET',
                    data: {
                        token: token,
                        id: v,
                        detail: 1
                    },
                    async: false,
                    dataType: 'json',
                    success: function (oE) {
                        if (oE.code == 0) {
                            var data = oE.data;
                            console.log(data);
                            if (data.is_optional == 1) {
                                //可选配

                                //可选配详情
                                var purQuoteSettingInfo = '';
                                $.each(data['setting_info'], function (i2, v2) {
                                    if (v2['cate_name'] == null) return true;
                                    var purQuoteSettingChild = '';
                                    $.each(v2['list'], function (i3, v3) {
                                        //商品属性
                                        var purQuoteSettingChildAttr = '';
                                        $.each(v3['attributes'], function (i4, v4) {
                                            purQuoteSettingChildAttr += v4['value'] + '/';
                                        });
                                        purQuoteSettingChildAttr = purQuoteSettingChildAttr.substr(0, purQuoteSettingChildAttr.length - 1);
                                        purQuoteSettingChild += '<tr>\
                                                <td>' + v3['code_sn'] + '</td>\
                                                <td>' + purQuoteSettingChildAttr + '</td>\
                                                <td>\
                                                <div class="num_input inline_block num_input_new"><button class="but_grey_a but_opa_small inp_plus pur_quote_create_setting_child_num_change_btn">+</button><input class="lik_input_number pur_quote_create_setting_child_num" type="text" value="1" style="width: 32px;"><button class="but_grey_a but_opa_small radius_left_0 inp_reduce pur_quote_create_setting_child_num_change_btn">-</button></div>\
                                                </td>\
                                                <td class="pur_quote_create_setting_child_one_num_total">1</td>\
                                                <td><input type="text" class="lik_input_number time_input xs_xsbjd_inp_60 pur_quote_create_setting_child_one_cost" value="0" onfocus="fn_focus(this);" onblur="fn_blur(this);" style="color: rgb(204, 204, 204);">\
                                                </td>\
                                                <td class="pur_quote_tax_num pur_quote_create_setting_child_one_tax c_y">' + taxNum + '</td>\
                                                <td class="pur_quote_create_setting_child_one_cost_hsj">0</td>\
                                                <td class="pur_quote_create_setting_child_one_cost_total">0</td>\
                                                <td>\
                                                <button class="but_opa_small c_r">-</button>\
                                                </td>\
                                                </tr>'
                                    });
                                    purQuoteSettingInfo += '<div class="box_open_list">\
                                        <p class="box_open_head" style="background: rgb(255, 255, 255); border-radius: 3px;">\
                                        <span>' + v2['cate_name'] + '</span>\
                                        </p>\
                                        <div class="container">\
                                        <div class="table-container">\
                                        <table>\
                                        <thead>\
                                        <tr>\
                                        <th width="140">商品编号</th>\
                                        <th width="299">属性</th>\
                                        <th width="90">单个整机数量</th>\
                                        <th width="45">总数</th>\
                                        <th width="120">单价(元)</th>\
                                        <th width="63">税率(%)</th>\
                                        <th width="85">含税价(元)</th>\
                                        <th width="85">总价(元)</th>\
                                        <th width="">操作</th>\
                                        </tr>\
                                        </thead>\
                                        <tbody> ' + purQuoteSettingChild + '\
                                        <tr class="table_total">\
                                        <td>合计</td>\
                                        <td></td>\
                                        <td></td>\
                                        <td class="c_r pur_quote_create_setting_child_num_total">0</td>\
                                        <td></td>\
                                        <td></td>\
                                        <td></td>\
                                        <td class="pur_quote_create_setting_child_cost_hj_total">0</td>\
                                        <td></td>\
                                        </tr>\
                                        </tbody>\
                                        </table>\
                                        </div>\
                                        </div>\
                                        </div>'
                                });

                                aPurQuoteCreateSettingChosenHtml += '<div class="pur_quote_create_choose_setting_one_box_list" settingsign="settingkxp_' + data['id'] + '" style="margin-bottom:15px;">\
                                    <div class="container">\
                                    <div class="table-container">\
                                    <table>\
                                    <thead>\
                                    <tr>\
                                    <th width="32">序号</th>\
                                    <th width="110">整机商品名称</th>\
                                    <th width="120">整机商品编号</th>\
                                    <th width="55">基本单位</th>\
                                    <th width="215">属性</th>\
                                    <th width="85">数量</th>\
                                    <th width="120">单价</th>\
                                    <th width="63">税率(%)</th>\
                                <th width="85">含税价(元)</th>\
                                    <th width="85">总价(元)</th>\
                                    <th width="70">操作</th>\
                                    </tr>\
                                    </thead>\
                                    <tbody>\
                                    <tr settingid="' + data['id'] + '">\
                                    <td>' + l_dbl(i + 1) + '</td>\
                                    <td class="xs_f_color val_dialogTop" name="cg_cgbjd_xzsp">' + data['cate_name'] + '</td>\
                                    <td>' + data['code_sn'] + '</td>\
                                    <td>' + data['unit_name'] + '</td>\
                                    <td>' + data['attr_name'] + '</td>\
                                    <td>\
                                    <div class="xs_num_input num_input inline_block num_input_new">\
                                    <button class="but_blue but_opa_small inp_plus pur_quote_create_setting_parent_num_change_btn">+</button><input type="text" value="1" class="pur_quote_create_setting_parent_num" style="border:1px solid #23a2f3;"><button class="but_blue but_opa_small radius_left_0 inp_reduce pur_quote_create_setting_parent_num_change_btn">-</button>\
                                    </div>\
                                    </td>\
                                    <td class="xs_goods_box" style="position: relative;">\
                                    <div class="xs_goods_big_box">\
                                    <div class="inline_block select_100">\
                                    <input type="text" class="c_3 lik_input_number time_input xs_bjd_inp xs_xsbjd_inp_60 pur_quote_create_setting_cost_one_change" value="0" style="color: rgb(153, 153, 153);margin-right: 10px;">\
                                    </div>\
                                    </div>\
                                    </td>\
                                    <td><span class="pur_quote_tax_num c_y">' + taxNum + '</span></td>\
                                    <td><span class="pur_quote_create_setting_parent_one_cost_hsj">0</span></td>\
                                    <td><span class="pur_quote_create_setting_parent_one_cost_total">0</span></td>\
                                    <td>\
                                    <button class="but_blue but_opa_small but_green val_dialogTop pur_quote_create_choose_setting_btn" name="cg_cgbjd_xzpzspa">+</button><button class="but_opa_small but_red pur_quote_create_setting_parent_del_btn">-</button>\
                                    </td>\
                                    </tr>\
                                    </tbody>\
                                    </table>\
                                    </div>\
                                    </div>\
                                    <div class="xs_xsbjd_table_t2">\
                                    <div class="table_t2" style="position: relative;">\
                                    <span class="cont_title" style="border-left: 4px;padding-left: 10px;margin-left: 0;border-left: 5px solid #23a2f3;">配件内容</span><span class="c_9">(您必须把配件价格标明，配件合计必须等于整机单价)</span>\
                                    <button class="but_icon_plus_white but_small but_blue val_dialogTop pur_quote_create_choose_setting_goods_btn" name="cg_cgbjd_xzpzsp_dp" settingsign="settingkxp_' + data['id'] + '" settingid="' + data['id'] + '" style="position:absolute;right:80px;top:12px;"><i></i>选择配件</button>\
                                    <span class="box_open_btn" style="right: 13px;">收起 <i class="right icon_show"></i></span>\
                                    </div>\
                                    <div class="goods_tc_toggle">\
                                    <div style="overflow: hidden;margin: 10px;">\
                                    <div class="cg_bjd_pjnr1"><span class="c_3">整机单价：<span class="pur_quote_create_setting_price_one">0</span>元</span>\
                                </div>\
                                <div class="cg_bjd_pjnr1"><span class="c_g">已标记：<span class="pur_quote_create_setting_price_one_yes">0</span>元</span>\
                                </div>\
                                <div class="cg_bjd_pjnr1"><span class="c_r">未标记：<span class="pur_quote_create_setting_price_one_no">0</span>元</span>\
                                </div>\
                                </div><div class="pur_quote_create_setting_kxp_child_list settingkxp_' + data['id'] + '"></div></div>\
                                    </div>\
                                    </div>';
                            } else if (data.is_optional == 2) {
                                //不可选配

                                //不可选配详情
                                var purQuoteSettingInfo = '';
                                $.each(data['setting_info'], function (i2, v2) {
                                    if (v2['cate_name'] == null) return true;
                                    var purQuoteSettingChild = '';
                                    $.each(v2['list'], function (i3, v3) {
                                        var lastPrice = getPurLastPrice(v3['id']);
                                        //商品属性
                                        var purQuoteSettingChildAttr = '';
                                        $.each(v3['attributes'], function (i4, v4) {
                                            purQuoteSettingChildAttr += v4['value'] + '/';
                                        });
                                        purQuoteSettingChildAttr = purQuoteSettingChildAttr.substr(0, purQuoteSettingChildAttr.length - 1);
                                        purQuoteSettingChild += '<tr settinggoodsid="' + v3['id'] + '">\
                                                <td>' + v3['code_sn'] + '</td>\
                                                <td>' + purQuoteSettingChildAttr + '</td>\
                                                <td>\
                                                <div class="num_input inline_block num_input_new"><button class="but_grey_a but_opa_small inp_plus pur_quote_create_setting_child_num_change_btn">+</button><input class="lik_input_number pur_quote_create_setting_child_num" type="text" value="1" style="width: 32px;"><button class="but_grey_a but_opa_small radius_left_0 inp_reduce pur_quote_create_setting_child_num_change_btn">-</button></div>\
                                                </td>\
                                                <td class="pur_quote_create_setting_child_one_num_total">1</td>\
                                                <td class="xs_goods_box" style="position: relative;">                                    <div class="xs_goods_big_box">                                    <div class="inline_block select_100">    <input type="text" class="lik_input_number time_input xs_xsbjd_inp_60 pur_quote_create_setting_child_one_cost" lastprice="' + lastPrice + '" value="0" onfocus="fn_focus(this);" onblur="fn_blur(this);" style="color: rgb(204, 204, 204);"></div>                       <i class="ven_warning_arrow xs_goods_down_img ven_warning_arrow_up" style="margin: 0px; position: absolute; top: 21px; right: 12px;display:none;"></i>             </div>        \
                                                <div class="work_vent_client_contMsgBox" style="display: none; left:124px;"><i class="work_vent_client_torr"></i><div class="work_vent_client_contMsgBoxDet fnc_output_ticket_total_remain_ticket_num_list"><span class="lik_up_down_text"></span>于 ' + lastPrice + '(上次报价)</div></div>\
                                                </td>\
                                                <td class="pur_quote_tax_num c_y pur_quote_create_setting_child_one_tax">' + taxNum + '</td>\
                                                <td class="pur_quote_create_setting_child_one_cost_hsj">0</td>\
                                                <td class="pur_quote_create_setting_child_one_cost_total">0</td>\
                                                </tr>'
                                    });
                                    purQuoteSettingInfo += '<div class="box_open_list">\
                                        <p class="box_open_head" style="background: rgb(255, 255, 255); border-radius: 3px;">\
                                        <span>' + v2['cate_name'] + '</span>\
                                        </p>\
                                        <div class="container">\
                                        <div class="table-container">\
                                        <table>\
                                        <thead>\
                                        <tr>\
                                        <th width="140">商品编号</th>\
                                        <th width="299">属性</th>\
                                        <th width="90">单个整机数量</th>\
                                        <th width="45">总数</th>\
                                        <th width="120">单价(元)</th>\
                                        <th width="63">税率(%)</th>\
                                        <th width="85">含税价(元)</th>\
                                        <th width="85">总价(元)</th>\
                                        </tr>\
                                        </thead>\
                                        <tbody> ' + purQuoteSettingChild + '\
                                        <tr class="table_total">\
                                        <td>合计</td>\
                                        <td></td>\
                                        <td></td>\
                                        <td class="c_r pur_quote_create_setting_child_num_total">0</td>\
                                        <td></td>\
                                        <td></td>\
                                        <td></td>\
                                        <td class="pur_quote_create_setting_child_cost_hj_total">0</td>\
                                        </tr>\
                                        </tbody>\
                                        </table>\
                                        </div>\
                                        </div>\
                                        </div>'
                                });

                                aPurQuoteCreateSettingChosenHtml += '<div class="pur_quote_create_choose_setting_one_box_list" style="margin-bottom:15px;">\
                                    <div class="container">\
                                    <div class="table-container">\
                                    <table>\
                                    <thead>\
                                    <tr>\
                                    <th width="32">序号</th>\
                                    <th width="110">整机商品名称</th>\
                                    <th width="120">整机商品编号</th>\
                                    <th width="55">基本单位</th>\
                                    <th width="215">属性</th>\
                                    <th width="85">数量</th>\
                                    <th width="120">单价</th>\
                                    <th width="63">税率(%)</th>\
                                <th width="85">含税价(元)</th>\
                                    <th width="85">总价(元)</th>\
                                    <th width="70">操作</th>\
                                    </tr>\
                                    </thead>\
                                    <tbody>\
                                    <tr settingid="' + data['id'] + '">\
                                    <td>' + l_dbl(i + 1) + '</td>\
                                    <td class="xs_f_color val_dialogTop" name="cg_cgbjd_xzsp">' + data['cate_name'] + '</td>\
                                    <td>' + data['code_sn'] + '</td>\
                                    <td>' + data['unit_name'] + '</td>\
                                    <td>' + data['attr_name'] + '</td>\
                                    <td>\
                                    <div class="xs_num_input num_input inline_block num_input_new">\
                                    <button class="but_blue but_opa_small inp_plus pur_quote_create_setting_parent_num_change_btn">+</button><input type="text" value="1" class="pur_quote_create_setting_parent_num" style="border:1px solid #23a2f3;"><button class="but_blue but_opa_small radius_left_0 inp_reduce pur_quote_create_setting_parent_num_change_btn">-</button>\
                                    </div>\
                                    </td>\
                                    <td class="xs_goods_box" style="position: relative;">\
                                    <div class="xs_goods_big_box">\
                                    <div class="inline_block select_100">\
                                    <input type="text" class="c_3 lik_input_number time_input xs_bjd_inp xs_xsbjd_inp_60 pur_quote_create_setting_cost_one_change" value="0" style="color: rgb(153, 153, 153);margin-right: 10px;">\
                                    </div>\
                                    </div>\
                                    </td>\
                                    <td><span class="pur_quote_tax_num c_y">' + taxNum + '</span></td>\
                                    <td><span class="pur_quote_create_setting_parent_one_cost_hsj">0</span></td>\
                                    <td><span class="pur_quote_create_setting_parent_one_cost_total">0</span></td>\
                                    <td>\
                                    <button class="but_blue but_opa_small but_green val_dialogTop pur_quote_create_choose_setting_btn" name="cg_cgbjd_xzpzspa">+</button><button class="but_opa_small but_red pur_quote_create_setting_parent_del_btn">-</button>\
                                    </td>\
                                    </tr>\
                                    </tbody>\
                                    </table>\
                                    </div>\
                                    </div>\
                                    <div class="xs_xsbjd_table_t2">\
                                    <div class="table_t2" style="position: relative;">\
                                    <span class="cont_title" style="border-left: 4px;padding-left: 10px;margin-left: 0;border-left: 5px solid #23a2f3;">配件内容</span><span class="c_9">(您必须把配件价格标明，配件合计必须等于整机单价)</span>\
                                    <span class="box_open_btn" style="right: 13px;">收起 <i class="right icon_show"></i></span>\
                                    </div>\
                                    <div class="goods_tc_toggle">\
                                    <div style="overflow: hidden;margin: 10px;">\
                                    <div class="cg_bjd_pjnr1"><span class="c_3">整机单价：<span class="pur_quote_create_setting_price_one">0</span>元</span>\
                                </div>\
                                <div class="cg_bjd_pjnr1"><span class="c_g">已标记：<span class="pur_quote_create_setting_price_one_yes">0</span>元</span>\
                                </div>\
                                <div class="cg_bjd_pjnr1"><span class="c_r">未标记：<span class="pur_quote_create_setting_price_one_no">0</span>元</span>\
                                </div>\
                                </div>' + purQuoteSettingInfo + '</div>\
                                    </div>\
                                    </div>';
                            }
                        }
                    },
                    error: function (e) {
                        console.log(e);
                        alert(e.msg);
                    }
                });
            });
        } else {
            $('.tanceng .pur_quote_choose_setting_hj_head').removeClass('none');
        }
        $('.tanceng .pur_quote_create_choose_setting_box_list').html(aPurQuoteCreateSettingChosenHtml);
        //原有配件商品
        $.each($('.tanceng .pur_quote_create_choose_setting_box_list .pur_quote_create_choose_setting_kxp_list'), function (i, v) {
            $('.tanceng .pur_quote_create_choose_setting_box_list .pur_quote_create_choose_setting_kxp_list').eq(i).html(purQuoteSettingGoodsListArr[i]);
        });
        //原有配件商品的value值
        $.each($('.tanceng .pur_quote_create_choose_setting_box_list .sell_quote_create_setting_cost_one_change'), function (i, v) {
            $('.tanceng .pur_quote_create_choose_setting_box_list .sell_quote_create_setting_cost_one_change').eq(i).val(purQuoteSettingGoodsListValArr[i]);
            if ($('.tanceng .pur_quote_create_choose_setting_box_list .sell_quote_create_setting_cost_one_change').eq(i).val() == '') {
                $('.tanceng .pur_quote_create_choose_setting_box_list .sell_quote_create_setting_cost_one_change').eq(i).val(0);
            }
        });
        purQuoteCreateSettingNumFn();
    });

    //获取上次报价函数
    function getPurLastPrice(goodsId) {
        var lastPrice = 0;
        $.ajax({
            url: SERVER_URL + '/quote/goodhislist',
            type: 'GET',
            data: {
                token: token,
                good_id: goodsId, // 商品id
                thetype: 2 // 1销售普通商品 2 采购普通商品
            },
            async: false,
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                if (oE.code == 0) {
                    lastPrice = oE.data.price
                }
            },
            error: function (e) {
                alert(e.msg);
                console.log(e);
            }
        });
        return lastPrice ? lastPrice : 0;
    }

    //整机商品数量价格控制函数
    function purQuoteCreateSettingNumFn() {
        //子商品单条数量
        var $_settingChildOneNum = $('.tanceng .pur_quote_create_choose_setting_box_list .pur_quote_create_setting_child_one_num_total');
        $.each($_settingChildOneNum, function (i, v) {
            $_settingChildOneNum.eq(i).html(parseFloat($_settingChildOneNum.eq(i).closest('.pur_quote_create_choose_setting_one_box_list').find('.pur_quote_create_setting_parent_num').val()) * parseFloat($_settingChildOneNum.eq(i).closest('tr').find('.pur_quote_create_setting_child_num').val()))
        });
        //子商品数量总和
        var $_settingChildNumTotal = $('.tanceng .pur_quote_create_choose_setting_box_list .pur_quote_create_setting_child_num_total');
        $.each($_settingChildNumTotal, function (i, v) {
            var settingChildNumTotal = 0;
            $.each($_settingChildNumTotal.eq(i).closest('tbody').find('.pur_quote_create_setting_child_one_num_total'), function (i2, v2) {
                settingChildNumTotal += parseFloat($_settingChildNumTotal.eq(i).closest('tbody').find('.pur_quote_create_setting_child_one_num_total').eq(i2).text());
            });
            $_settingChildNumTotal.eq(i).html(settingChildNumTotal);
        });
        //整机商品含税价
        var $_settingParentCostHsj = $('.tanceng .pur_quote_create_choose_setting_box_list .pur_quote_create_setting_parent_one_cost_hsj');
        $.each($_settingParentCostHsj, function (i, v) {
            $_settingParentCostHsj.eq(i).html(moneyToFixed((parseFloat($_settingParentCostHsj.eq(i).closest('td').prev().text()) + 100) * parseFloat($_settingParentCostHsj.eq(i).closest('td').prev().prev().find('input').val()) / 100));
        });
        //整机商品单条总价
        var $_settingParentOneCostTotal = $('.tanceng .pur_quote_create_choose_setting_box_list .pur_quote_create_setting_parent_one_cost_total');
        $.each($_settingParentOneCostTotal, function (i, v) {
            $_settingParentOneCostTotal.eq(i).html(moneyToFixed(parseFloat($_settingParentOneCostTotal.eq(i).closest('td').prev().text()) * parseFloat($_settingParentOneCostTotal.eq(i).closest('tr').find('input.pur_quote_create_setting_parent_num').val())));
        });
        //整机商品包含商品单条含税价
        var $_settingChildCostHsj = $('.tanceng .pur_quote_create_choose_setting_box_list .pur_quote_create_setting_child_one_cost_hsj');
        $.each($_settingChildCostHsj, function (i, v) {
            $_settingChildCostHsj.eq(i).html(moneyToFixed((parseFloat($_settingChildCostHsj.eq(i).closest('td').prev().text()) + 100) * parseFloat($_settingChildCostHsj.eq(i).closest('td').prev().prev().find('input').val()) / 100));
        });
        //整机商品包含商品单条总价
        var $_settingChildOneCostTotal = $('.tanceng .pur_quote_create_choose_setting_box_list .pur_quote_create_setting_child_one_cost_total');
        $.each($_settingChildOneCostTotal, function (i, v) {
            $_settingChildOneCostTotal.eq(i).html(moneyToFixed(parseFloat($_settingChildOneCostTotal.eq(i).closest('td').prev().text()) * parseFloat($_settingChildOneCostTotal.eq(i).closest('tr').find('.pur_quote_create_setting_child_one_num_total').text())));
        });
        //整机商品包含商品总价
        var $_settingChildCostHjTotal = $('.tanceng .pur_quote_create_choose_setting_box_list .pur_quote_create_setting_child_cost_hj_total');
        $.each($_settingChildCostHjTotal, function (i, v) {
            var settingChildCostTotal = 0;
            $.each($_settingChildCostHjTotal.eq(i).closest('tbody').find('.pur_quote_create_setting_child_one_num_total'), function (i2, v2) {
                settingChildCostTotal += parseFloat($_settingChildCostHjTotal.eq(i).closest('tbody').find('.pur_quote_create_setting_child_one_cost_total').eq(i2).text());
            });
            $_settingChildCostHjTotal.eq(i).html(moneyToFixed(settingChildCostTotal));
        });

        //已标记总和
        var $_settingYbj = $('.tanceng .pur_quote_create_choose_setting_box_list .pur_quote_create_setting_price_one_yes');
        $.each($_settingYbj, function (i, v) {
            var costYbj = 0;
            var $_costYbj = $_settingYbj.eq(i).closest('.pur_quote_create_choose_setting_one_box_list').find('.pur_quote_create_setting_child_one_cost');
            $.each($_costYbj, function (i2, v2) {
                costYbj += parseFloat($_costYbj.eq(i2).val()) * parseFloat($_costYbj.eq(i2).closest('tr').find('.pur_quote_create_setting_child_num').val());
            });
            $_settingYbj.eq(i).html(costYbj);
        });
        //未标记总和
        var $_settingWbj = $('.tanceng .pur_quote_create_choose_setting_box_list .pur_quote_create_setting_price_one_no');
        $.each($_settingWbj, function (i, v) {
            $_settingWbj.eq(i).html($_settingWbj.eq(i).closest('.goods_tc_toggle').find('.pur_quote_create_setting_price_one').text() - $_settingYbj.eq(i).text())
        });

        //整机总合计信息
        var settingNumTotalHj = 0;
        var settingCostTotalHj = 0;
        $.each($('.tanceng .pur_quote_create_choose_setting_box_list .pur_quote_create_choose_setting_one_box_list'), function (i, v) {
            settingNumTotalHj += parseFloat($('.tanceng .pur_quote_create_choose_setting_box_list .pur_quote_create_choose_setting_one_box_list').eq(i).find('.pur_quote_create_setting_parent_num').val());
            settingCostTotalHj += parseFloat($('.tanceng .pur_quote_create_choose_setting_box_list .pur_quote_create_choose_setting_one_box_list').eq(i).find('.pur_quote_create_setting_parent_one_cost_total').text());
        });
        $('.tanceng .pur_quote_create_setting_num_total_hj').text(settingNumTotalHj);
        $('.tanceng .pur_quote_create_setting_cost_total_hj').text(moneyToFixed(settingCostTotalHj));

        purQuoteCreateProductCostTotalFn();

    }

    //整机商品修改整机数量
    $('.tanceng .pur_quote_create_choose_setting_box_list .pur_quote_create_setting_parent_num_change_btn').die('click').live('click', function () {
        purQuoteCreateSettingNumFn();
    });
    $('.tanceng .pur_quote_create_choose_setting_box_list .pur_quote_create_setting_parent_num').live('keyup', function () {
        purQuoteCreateSettingNumFn();
    });
    //整机商品修改整机单价
    $('.tanceng .pur_quote_create_choose_setting_box_list .pur_quote_create_setting_cost_one_change').die('keyup').live('keyup', function () {
        $('.tanceng .pur_quote_create_choose_setting_box_list .pur_quote_create_setting_price_one').each(function (i, v) {
            $('.tanceng .pur_quote_create_choose_setting_box_list .pur_quote_create_setting_price_one').eq(i).html($('.tanceng .pur_quote_create_choose_setting_box_list .pur_quote_create_setting_price_one').eq(i).closest('.pur_quote_create_choose_setting_one_box_list').find('.pur_quote_create_setting_cost_one_change').val());
        });
        purQuoteCreateSettingNumFn();
    });
    //整机商品修改包含商品单价
    $('.tanceng .pur_quote_create_choose_setting_box_list .pur_quote_create_setting_child_one_cost').die('keyup').live('keyup', function () {
        purQuoteCreateSettingNumFn();
        //与上次报价相比
        if (parseFloat($(this).val()) > parseFloat($(this).attr('lastprice'))) {
            $(this).parent().next().addClass('ven_warning_arrow_up').css('display', '');
            $(this).closest('td').find('.lik_up_down_text').text('高');
            $(this).closest('tr').attr('lik_up_down_type', '1');
            $(this).parent().siblings('ul').find('.xs_goods_li_box i').css({
                'display': '',
                'margin': '-3px 8px'
            }).removeClass('ven_warning_arrow').addClass('ven_warning_arrow_up');
        } else if (parseFloat($(this).val()) < parseFloat($(this).attr('lastprice'))) {
            $(this).parent().next().removeClass('ven_warning_arrow_up').css('display', '');
            $(this).closest('td').find('.lik_up_down_text').text('低');
            $(this).closest('tr').attr('lik_up_down_type', '2');
            $(this).parent().siblings('ul').find('.xs_goods_li_box i').css({
                'display': '',
                'margin': '-3px 8px'
            }).removeClass('ven_warning_arrow_up').addClass('ven_warning_arrow');
        } else {
            $(this).parent().next().css('display', 'none');
            $(this).closest('tr').attr('lik_up_down_type', '0');
            $(this).parent().siblings('ul').find('.xs_goods_li_box i').css('display', 'none');
        }
        /*$('.tanceng .pur_quote_create_choose_setting_box_list .pur_quote_create_setting_price_one').each(function (i, v) {
         $('.tanceng .pur_quote_create_choose_setting_box_list .pur_quote_create_setting_price_one').eq(i).html($('.tanceng .pur_quote_create_choose_setting_box_list .pur_quote_create_setting_price_one').eq(i).closest('.pur_quote_create_choose_setting_one_box_list').find('.pur_quote_create_setting_cost_one_change').val());
         });*/
    });
    //整机商品修改包含商品数量
    $('.tanceng .pur_quote_create_choose_setting_box_list .pur_quote_create_setting_child_num_change_btn').die('click').live('click', function () {
        purQuoteCreateSettingNumFn();
    });
    $('.tanceng .pur_quote_create_choose_setting_box_list .pur_quote_create_setting_child_num').live('keyup', function () {
        purQuoteCreateSettingNumFn();
    });

    //选择搭配商品
    $('.tanceng .pur_quote_create_choose_setting_goods_btn').die('click').live('click', function () {
        var settingId = $(this).attr('settingid');
        var settingSignCurrent = $(this).attr('settingsign');
        $('.tanceng .pur_quote_create_choose_setting_child_save_btn').attr('settingsign', settingSignCurrent);
        $.ajax({
            url: SERVER_URL + '/product-setting/loadsetting',
            type: 'GET',
            data: {
                token: token,
                id: settingId,
                detail: 1
            },
            async: false,
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var data = oE.data;
                    console.log(data);
                    //整机商品编号
                    $('.tanceng .pur_quote_create_choose_setting_code_sn').html(data['code_sn']);
                    //整机商品名称
                    $('.tanceng .pur_quote_create_choose_setting_goods_parent_name').html(data['name']);
                    //整机类型
                    if (data['is_optional'] == 1) {
                        $('.tanceng .pur_quote_create_choose_setting_is_optional').html('可选配');
                    } else if (data['is_optional'] == 2) {
                        $('.tanceng .pur_quote_create_choose_setting_is_optional').html('不可选配');
                    }
                    //备注
                    $('.tanceng .pur_quote_create_choose_setting_remark').html(data['remark']);
                    //选配说明
                    $('.tanceng .pur_quote_create_choose_setting_introductions').html(data['introductions']);
                    var settingInfo = data['setting_info'];
                    var settingHtmlLeft = '';
                    var settingHtmlRight = '';
                    $.each(settingInfo, function (i, v) {
                        if (v['cate_name'] == null) return true;
                        var settingGoodsHtml = '';
                        $.each(v['list'], function (i2, v2) {
                            var settingGoodsAttr = '';
                            $.each(v2['attributes'], function (i3, v3) {
                                settingGoodsAttr += v3['value'] + '/';
                            });
                            settingGoodsAttr = settingGoodsAttr.slice(0, settingGoodsAttr.length - 1);
                            settingGoodsHtml += '<tr settinggoodsid="' + v2['id'] + '">\
                                                <td><input class="pur_quote_create_setting_list_checkbox" type="checkbox"></td>\
                                                <td>' + v2['code_sn'] + '</td>\
                                                <td><p class="xiangmu_p1">' + settingGoodsAttr + '</p></td>\
                                                </tr>'
                        });
                        settingHtmlLeft += '<div class="box_Open" style="width:100%;border-left:1px solid #e7eaec;border-right:1px solid #e7eaec;margin-bottom:10px;">\
                                                <p class="box_open_head" style="padding-left:8px;">' + v['cate_name'] + '<span class="box_open_btn" style="right: 10px;">收起 <i class="right icon_show"></i></span>\
                                                </p>\
                                                <div class="box_open_list  table-container">\
                                                <table class="xs_bjd_choose_bhsp">\
                                                <thead>\
                                                <th width="32">选择</th>\
                                                <th width="120">商品编号</th>\
                                                <th width="370">属性</th>\
                                                </thead>\
                                                <tbody settingsign="set' + (i + 1) + '" class="set' + (i + 1) + '">' + settingGoodsHtml + '</tbody>\
                                                </table>\
                                                </div>\
                                            </div>';
                        settingHtmlRight += '<div class="box_Open none" style="width:100%;border-left:1px solid #e7eaec;border-right:1px solid #e7eaec;border-bottom:1px solid #e7eaec;margin-bottom:10px;">\
                                                <p class="box_open_head" style="padding-left:8px;">' + v['cate_name'] + '<span class="box_open_btn" style="right: 10px;">收起 <i class="right icon_show"></i></span>\
                                                </p>\
                                                <div class="box_open_list  table-container">\
                                                <table class="xs_bjd_choose_bhsp">\
                                                <thead>\
                                                <th width="32">选择</th>\
                                                <th width="120">商品编号</th>\
                                                <th width="371">属性</th>\
                                                <th width="85">数量</th>\
                                                <th width="30">操作</th>\
                                                </thead>\
                                                <tbody settingsign="set' + (i + 1) + '" class="set' + (i + 1) + '" catename="' + v['cate_name'] + '"></tbody>\
                                                </table>\
                                                </div>\
                                            </div>';
                    });
                    $('.tanceng .pur_quote_create_setting_list_left').html(settingHtmlLeft);
                    $('.tanceng .pur_quote_create_setting_list_right').html(settingHtmlRight);
                }
            },
            error: function (e) {
                console.log(e);
                alert(e.msg);
            }
        });
    });
    $('.tanceng .pur_quote_create_setting_list_left .pur_quote_create_setting_list_checkbox').die('click').live('click', function () {
        var currentTbodyClass = $(this).closest('tbody').attr('settingsign');
        var $_this = $(this);
        var settingGoodsChosen = '';
        $.each($_this.closest('tbody').find('tr'), function (i, v) {
            if ($_this.closest('tbody').find('tr').eq(i).find('input:checkbox').is(':checked')) {
                settingGoodsChosen += '<tr index="' + i + '" settinggoodsid="' + $_this.closest('tbody').find('tr').eq(i).attr('settinggoodsid') + '">\
                                        <td>' + l_dbl(i + 1) + '</td>\
                                        <td>' + $_this.closest('tbody').find('tr').eq(i).find('td').eq(1).html() + '</td>\
                                        <td>' + $_this.closest('tbody').find('tr').eq(i).find('td').eq(2).html() + '</td>\
                                        <td style="padding: 0 1em;"><div class="xs_num_input num_input inline_block num_input_new"><button class="but_grey_a but_opa_small inp_plus">+</button><input style="border-color: #ccc;" type="text" value="1"><button class="but_grey_a but_opa_small radius_left_0 inp_reduce">-</button></div></td>\
                                        <td style="padding: 0 1em;"><button class="but_opa_small but_red_a pur_quote_create_setting_list_right_del_btn">-</button></td>\
                                        </tr>'
            }
        });
        $('.tanceng .pur_quote_create_setting_list_right').find('.' + currentTbodyClass).html(settingGoodsChosen);
        settingChildShowFn();
        tbodyTrSortFn();
    });
    //配件商品显示隐藏
    function settingChildShowFn(){
        $.each($('.tanceng .pur_quote_create_setting_list_right .box_Open'), function (i, v) {
            if ($('.tanceng .pur_quote_create_setting_list_right .box_Open').eq(i).find('tbody tr').length > 0) {
                $('.tanceng .pur_quote_create_setting_list_right .box_Open').eq(i).removeClass('none');
            } else {
                $('.tanceng .pur_quote_create_setting_list_right .box_Open').eq(i).addClass('none');
            }
        });
        if($('.tanceng .pur_quote_create_setting_list_right .box_Open').length == $('.tanceng .pur_quote_create_setting_list_right .box_Open.none').length){
            $('.tanceng .pur_quote_create_setting_list_right').addClass('none');
        }else{
            $('.tanceng .pur_quote_create_setting_list_right').removeClass('none');
        }
    }
    //tbody中tr序号
    function tbodyTrSortFn() {
        $.each($('.tanceng .pur_quote_create_setting_list_right tbody tr'), function (i, v) {
            $('.tanceng .pur_quote_create_setting_list_right tbody tr').eq(i).find('td').eq(0).html(l_dbl($('.tanceng .pur_quote_create_setting_list_right tbody tr').eq(i).index() + 1))
        });
    }

    //删除整机商品
    $('.tanceng .pur_quote_create_setting_parent_del_btn').live('click', function () {
        $(this).closest('.pur_quote_create_choose_setting_one_box_list').remove();
        purQuoteCreateSettingNumFn();
        settingSortFn();
    });

    //整机商品序号
    function settingSortFn() {
        $.each($('.tanceng .pur_quote_create_choose_setting_box_list .pur_quote_create_choose_setting_one_box_list'), function (i, v) {
            $('.tanceng .pur_quote_create_choose_setting_box_list .pur_quote_create_choose_setting_one_box_list').eq(i).find('td').eq(0).html(l_dbl(i + 1));
        });
    }

    //删除配件商品
    $('.tanceng .pur_quote_create_setting_list_right .pur_quote_create_setting_list_right_del_btn').die('click').live('click', function () {
        var index = $(this).closest('tr').attr('index');
        var curTbodySign = $(this).closest('tbody').attr('settingsign');
        $('.tanceng .pur_quote_create_setting_list_left .' + curTbodySign).find('input:checkbox').eq(index).attr('checked', false);
        $(this).closest('tr').remove();
        tbodyTrSortFn();
        settingChildShowFn();
    });
    //选择搭配商品保存
    $('.tanceng .pur_quote_create_choose_setting_child_save_btn').die('click').live('click', function () {
        var settingChildKxpGoodsArr = [];
        var taxNum = 0;
        if ($('.tanceng .pur_quote_create_tax_num_inp').val() == '含税17%') {
            taxNum = 17;
        } else if ($('.tanceng .pur_quote_create_tax_num_inp').val() == '无税') {
            taxNum = 0;
        }
        var setParentSign = $(this).attr('settingsign');
        $.each($('.tanceng .pur_quote_create_setting_list_right tbody'), function (i, v) {
            if ($('.tanceng .pur_quote_create_setting_list_right tbody').eq(i).find('tr').length != 0) {
                var goodsChildArr = [];
                $.each($('.tanceng .pur_quote_create_setting_list_right tbody').eq(i).find('tr'), function (i2, v2) {
                    goodsChildArr.push({
                        goodsid: $('.tanceng .pur_quote_create_setting_list_right tbody').eq(i).find('tr').eq(i2).attr('settinggoodsid'),
                        goodscodesn: $('.tanceng .pur_quote_create_setting_list_right tbody').eq(i).find('tr').eq(i2).find('td').eq(1).html(),
                        goodsattr: $('.tanceng .pur_quote_create_setting_list_right tbody').eq(i).find('tr').eq(i2).find('td').eq(2).html(),
                        goodsnum: $('.tanceng .pur_quote_create_setting_list_right tbody').eq(i).find('tr').eq(i2).find('td').eq(3).find('input:text').val()
                    })
                });
                settingChildKxpGoodsArr.push({
                    catename: $('.tanceng .pur_quote_create_setting_list_right tbody').eq(i).attr('catename'),
                    goodschildren: goodsChildArr
                });
            }
        });
        settingChildKxpGoodsArr = getJsonArr(settingChildKxpGoodsArr);
        var settingChildChosenHtml = '';
        $.each(settingChildKxpGoodsArr, function (i, v) {
            var settingChildGoodsHtml = '';
            var settingNumTotal = 0;
            $.each(v['goodschildren'], function (i2, v2) {
                var lastPrice = getPurLastPrice(v2['goodsid']);
                settingChildGoodsHtml += '<tr settinggoodsid="' + v2['goodsid'] + '" lik_up_down_type="0">\
                                    <td>' + v2['goodscodesn'] + '</td>\
                                    <td>' + v2['goodsattr'] + '</td>\
                                    <td><div class="num_input inline_block num_input_new"><button class="but_grey_a but_opa_small inp_plus pur_quote_create_setting_child_num_change_btn">+</button><input class="lik_input_number pur_quote_create_setting_child_num" type="text" value="' + v2['goodsnum'] + '"><button class="but_grey_a but_opa_small radius_left_0 inp_reduce pur_quote_create_setting_child_num_change_btn">-</button></div></td>\
                                    <td class="pur_quote_create_setting_child_one_num_total">' + (parseFloat(v2['goodsnum']) * parseFloat($('.tanceng .pur_quote_create_choose_setting_one_box_list[settingsign="' + setParentSign + '"] .pur_quote_create_setting_parent_num').val())) + '</td>\
                                    <td class="xs_goods_box" style="position: relative;">                                    <div class="xs_goods_big_box">                                    <div class="inline_block select_100"><input type="text" class="lik_input_number time_input xs_xsbjd_inp_60 pur_quote_create_setting_child_one_cost" lastprice="' + lastPrice + '" value="0" onfocus="fn_focus(this);" onblur="fn_blur(this);" style="color: rgb(204, 204, 204);"></div>                       <i class="ven_warning_arrow xs_goods_down_img ven_warning_arrow_up" style="margin: 0px; position: absolute; top: 21px; right: 16px;display:none;"></i>             </div>                                                        <div class="work_vent_client_contMsgBox" style="left: 126px; display: none;"><i class="work_vent_client_torr"></i><div class="work_vent_client_contMsgBoxDet fnc_output_ticket_total_remain_ticket_num_list"><span class="lik_up_down_text"></span>于 ' + lastPrice + ' (上次报价)</div></div></td>\
                                    <td class="pur_quote_tax_num c_y pur_quote_create_setting_child_one_tax">' + taxNum + '</td>\
                                    <td class="pur_quote_create_setting_child_one_cost_hsj">0</td>\
                                    <td class="pur_quote_create_setting_child_one_cost_total">0</td>\
                                    <td><button class="but_opa_small c_r pur_quote_create_setting_goods_del_btn">-</button></td>\
                                    </tr>';
                settingNumTotal += parseFloat(parseFloat(v2['goodsnum']) * parseFloat($('.tanceng .pur_quote_create_choose_setting_one_box_list[settingsign="' + setParentSign + '"] .pur_quote_create_setting_parent_num').val()));
            });
            settingChildChosenHtml += '<div class="box_open_list goods_tc_toggle">\
                                    <div class="pur_quote_create_setting_goods_list" optionaltype="1">\
                                    <p class="box_open_head" style="background: rgb(255, 255, 255); border-radius: 3px;">\
                                    <span>' + v['catename'] + '</span>\
                                    </p>\
                                    <div class="container">\
                                    <div class="table-container">\
                                    <table>\
                                    <thead>\
                                    <tr>\
                                    <th width="110">商品编号</th>\
                                    <th width="200">属性</th>\
                                    <th width="110">单个整机数量</th>\
                                    <th width="70">总数</th>\
                                    <th width="80" style="width: 130px;">单价(元)</th>\
                                    <th width="70">税率(%)</th>\
                                    <th width="100">含税价(元)</th>\
                                    <th width="70">总价(元)</th>\
                                    <th width="70">操作</th>\
                                    </tr>\
                                    </thead>\
                                    <tbody>' + settingChildGoodsHtml + '<tr class="table_total">\
                                    <td>合计</td>\
                                    <td></td>\
                                    <td></td>\
                                    <td class="pur_quote_create_setting_child_num_total">' + settingNumTotal + '</td>\
                                    <td></td>\
                                    <td></td>\
                                    <td></td>\
                                    <td class="pur_quote_create_setting_child_cost_hj_total">0</td>\
                                    <td></td>\
                                    </tr>\
                                    </tbody>\
                                    </table>\
                                    </div>\
                                    </div>\
                                    </div></div>';
        });
        $('.tanceng .pur_quote_create_choose_setting_one_box_list .' + setParentSign).html(settingChildChosenHtml);
        $(this).closest('.dialog_box').remove();
        purQuoteCreateSettingNumFn();
    });
    //提交页面删除配件商品
    $('.tanceng .pur_quote_create_setting_goods_del_btn').live('click', function () {
        if ($(this).closest('tbody').find('tr').length == 2) {
            $(this).closest('.box_open_list').remove();
        } else {
            $(this).closest('tr').remove();
        }
        purQuoteCreateSettingNumFn();
    });

    //修改其他费用
    $('.tanceng .pur_quote_create_other_fee').live('keyup', function () {
        purQuoteCreateProductCostTotalFn();
    });

    //总金额计算
    function purQuoteCreateProductCostTotalFn() {
        //税率
        var taxNum = 0;
        if ($('.tanceng .pur_quote_create_tax_num_inp').val() == '含税17%') {
            taxNum = 17;
        } else {
            taxNum = 0;
        }
        //单价合计
        $('.tanceng .pur_quote_create_product_cost_total').val(moneyToFixed((parseFloat($('.tanceng .pur_quote_goods_cost_total').text()) + parseFloat($('.tanceng .pur_quote_create_setting_cost_total_hj').text())) * 100 / (100 + taxNum)));
        //合计税额
        $('.tanceng .pur_quote_create_tax_total').val(moneyToFixed(parseFloat($('.tanceng .pur_quote_create_product_cost_total').val()) * (taxNum / 100)));
        //总计金额
        $('.tanceng .pur_quote_create_cost_tax_total').html(moneyToFixed(parseFloat($('.tanceng .pur_quote_create_product_cost_total').val()) + parseFloat($('.tanceng .pur_quote_create_tax_total').val()) + parseFloat($('.tanceng .pur_quote_create_other_fee').val())));
    }

    //删除商品
    var purQuoteCreateProductDelIndex = -1;
    $('.tanceng .pur_quote_create_goods_list_del_btn').die('click').live('click', function () {
        purQuoteCreateProductDelIndex = 0;
    });
    $('.tanceng .pur_quote_create_setting_list_del_btn').die('click').live('click', function () {
        purQuoteCreateProductDelIndex = 1;
    });
    $('.tanceng .pur_quote_create_product_del_submit').die('click').live('click', function () {
        if (purQuoteCreateProductDelIndex == 0) {
            aPurQuoteCreateGoodsChosen = [];
            $('.tanceng .pur_quote_create_chosen_goods_tbody').html('');
            $('.tanceng .pur_quote_create_goods_num_total').html('0');
            $('.tanceng .pur_quote_create_goods_cost_total').html('0');
            $('.tanceng .pur_quote_create_goods_tax_total').html('0');
            purQuoteCreateProductCostTotalFn();
            purQuoteCreateProductDelIndex = -1;
        }
        if (purQuoteCreateProductDelIndex == 1) {
            aPurQuoteCreateSettingChosen = [];
            purQuoteCreateSettingChildIdArr = [];
            $('.tanceng .pur_quote_create_chosen_setting_tbody').html('');
            $('.tanceng .pur_quote_create_setting_child_chosen_list').html('');
            $('.tanceng .lik_remember_num').html('0');
            $('.tanceng .pur_quote_create_setting_child_num_total').html('0');
            $('.tanceng .pur_quote_create_setting_child_cost_total').html('0');
            $('.tanceng .pur_quote_create_setting_child_tax_total').html('0');
            purQuoteCreateProductCostTotalFn();
            purQuoteCreateProductDelIndex = -1;

            $('.pur_quote_create_setting_list').html('<div class="box_open_list">\
                                                <div class="table_t1">\
                                                <h3 class="cont_title inline_block">整机商品01采购报价</h3>\
                                                </div>\
                                                <div class="pur_quote_create_setting_add_box">\
                                                <div class="container">\
                                                <div class="table-container">\
                                                <table>\
                                                <thead>\
                                                <tr>\
                                                <th>商品名称/规格</th>\
                                                <th>商品编号</th>\
                                                <th>属性</th>\
                                                <th>计算单位</th>\
                                                <th>数量</th>\
                                                <th>采购价格(元)</th>\
                                                <th>合计总价(元)</th>\
                                                <th>含税率</th>\
                                                <th>含税额(元)</th>\
                                                <th>操作</th>\
                                                </tr>\
                                                </thead>\
                                                <tbody class="pur_quote_create_chosen_setting_tbody"></tbody>\
                                                <tbody>\
                                                <tr class="table_total">\
                                                <td>合计</td>\
                                                <td></td>\
                                                <td></td>\
                                                <td></td>\
                                                <td class="pur_quote_setting_parent_one_num">0</td>\
                                                <td></td>\
                                                <td class="pur_quote_setting_parent_one_cgcost_total">0</td>\
                                                <td></td>\
                                                <td class="pur_quote_setting_parent_one_tax_total">0</td>\
                                                <td></td>\
                                                </tr>\
                                                </tbody>\
                                                </table>\
                                                </div>\
                                                </div>\
                                                <div class="table_t2">搭配商品内容</div>\
                                                <div class="container">\
                                                <div class="table-container">\
                                                <table>\
                                                <thead>\
                                                <tr>\
                                                <th>序号</th>\
                                                <th>商品名称/规格</th>\
                                                <th>商品编号</th>\
                                                <th>属性</th>\
                                                <th>计算单位</th>\
                                                <th>单个配置搭配商品数量</th>\
                                                <th>单个搭配采购价格(元)</th>\
                                                <th>总数量</th>\
                                                <th>总价(元)</th>\
                                                <th>含税率(%)</th>\
                                                <th>含税额(元)</th>\
                                                <th>合计税额(元)</th>\
                                                <th>操作</th>\
                                                </tr>\
                                                </thead>\
                                                <tbody class="pur_quote_create_setting_child_chosen_list"></tbody>\
                                                <tbody>\
                                                <tr class="table_total">\
                                                <td>合计</td>\
                                                <td>\
                                                <button class="but_small but_green val_dialogTop pur_quote_create_choose_setting_btn" name="cg_cgbjd_xzpzspa">选择整机商品</button>\
                                                </td>\
                                                <td></td>\
                                                <td></td>\
                                                <td></td>\
                                                <td></td>\
                                                <td></td>\
                                                <td class="pur_quote_create_setting_child_num_total">0</td>\
                                                <td><span class="pur_quote_create_setting_child_cost_total">0</span>(<span class="pur_quote_create_setting_child_cost_total_max">0</span>)</td>\
                                            <td></td>\
                                            <td></td>\
                                            <td><span class="pur_quote_create_setting_child_tax_total">0</span>(<span class="pur_quote_create_setting_child_tax_total_max">0</span>)</td>\
                                            <td></td>\
                                            </tr>\
                                            </tbody>\
                                            </table>\
                                            </div>\
                                            </div>\
                                            </div>\
                                            </div>')

        }
    });

    //切换含税状态
    $('.tanceng .pur_quote_create_change_tax_ul li').die('click').live('click', function () {
        if($(this).text() == '含税17%'){
            $('.tanceng .pur_quote_tax_num').html('17');
        }else if($(this).text() == '无税'){
            $('.tanceng .pur_quote_tax_num').html('0');
        }
        $('.tanceng .lik_input_number').trigger('keyup');
    });

    //新建采购报价单 - 提交审批
    $('.tanceng .pur_quote_create_submit').die('click').live('click', function () {
        purQuoteCreateData.quote_id = 0;
        purQuoteCreateData.is_draft = 0;
        purQuoteCreateSubmitFn();
    });
    //新建采购报价单 - 保存草稿
    $('.tanceng .pur_quote_create_submit_draft').die('click').live('click', function () {
        purQuoteCreateData.quote_id = 0;
        purQuoteCreateData.is_draft = 1;
        purQuoteCreateSubmitFn();
    });

    //新建报价单 - 提交函数
    function purQuoteCreateSubmitFn() {
        //报价单编号
        purQuoteCreateData.code_sn = $('.tanceng .pur_quote_create_code_sn').val();
        //关联借入单编号
        if ($('.tanceng .pur_quote_create_choose_borrow_inp').val() == '请选择借入单') {
            purQuoteCreateData.borrow_sn = '';
        } else {
            purQuoteCreateData.borrow_sn = $('.tanceng .pur_quote_create_choose_borrow_inp').val();
        }

        //供应商
        if ($('.tanceng .pur_quote_create_choose_supplier_inp').val() == '请选择供应商') {
            alert('请选择供应商');
            return false;
        } else {
            purQuoteCreateData.supplier_name = $('.tanceng .pur_quote_create_choose_supplier_inp').val();
        }

        //税率
        if ($('.tanceng .pur_quote_create_tax_num_inp').val() == '含税17%') {
            purQuoteCreateData.tax_rate = 1;
        } else {
            purQuoteCreateData.tax_rate = 0;
        }


        //普通商品信息
        var purQuoteCreateGoodsArr = [];
        var purQuoteCreateGoodsJson = {};
        $.each($('.tanceng .pur_quote_create_chosen_goods_tbody tr'), function (i, v) {
            purQuoteCreateGoodsArr.push({
                good_id: $('.tanceng .pur_quote_create_chosen_goods_tbody tr').eq(i).attr('goodsid'),
                up_down: $('.tanceng .pur_quote_create_chosen_goods_tbody tr').eq(i).attr('lik_up_down_type'),
                good_name: $('.tanceng .pur_quote_create_chosen_goods_tbody tr').eq(i).find('td').eq(1).text(),
                good_sn: $('.tanceng .pur_quote_create_chosen_goods_tbody tr').eq(i).find('td').eq(2).text(),
                good_attr: $('.tanceng .pur_quote_create_chosen_goods_tbody tr').eq(i).find('td').eq(3).text(),
                good_unit: $('.tanceng .pur_quote_create_chosen_goods_tbody tr').eq(i).find('td').eq(4).text(),
                good_num: $('.tanceng .pur_quote_create_chosen_goods_tbody tr').eq(i).find('.productnum').val(),
                good_price: $('.tanceng .pur_quote_create_chosen_goods_tbody tr').eq(i).find('.pur_quote_goods_cost_one').val(),
                good_last_price: $('.tanceng .pur_quote_create_chosen_goods_tbody tr').eq(i).find('.pur_quote_goods_cost_one').attr('lastprice'),
                good_rate: $('.tanceng .pur_quote_create_chosen_goods_tbody tr').eq(i).find('.pur_quote_goods_tax_one').text(),
                good_rate_price: $('.tanceng .pur_quote_create_chosen_goods_tbody tr').eq(i).find('.pur_quote_goods_tax_total').text(),
                good_total: $('.tanceng .pur_quote_create_chosen_goods_tbody tr').eq(i).find('.pur_quote_goods_one_cost_total').text()
            });
        });
        purQuoteCreateGoodsJson.goods = purQuoteCreateGoodsArr;
        purQuoteCreateGoodsJson.sum_num = $('.tanceng .pur_quote_create_goods_num_total').html(); // 普通商品总数
        purQuoteCreateGoodsJson.sum_total = $('.tanceng .pur_quote_goods_cost_total').html();// 普通商品总价额
        if (purQuoteCreateGoodsArr.length == 0) {
            purQuoteCreateData.goods = '';
        } else {
            purQuoteCreateData.goods = arrayToJson(purQuoteCreateGoodsJson);
        }

        var likOnOff = false;
        $.each($('.tanceng .pur_quote_create_choose_setting_box_list .pur_quote_create_setting_price_one_no'), function (i, v) {
            if ($('.tanceng .pur_quote_create_choose_setting_box_list .pur_quote_create_setting_price_one_no').eq(i).text() != 0) {
                likOnOff = true;
                return false
            }
            likOnOff = false;
        });
        if (likOnOff) {
            alert('请完善整机商品配件内容');
            return false;
        }

        //整机商品信息
        var purQuoteCreateSettingArr = [];
        var purQuoteCreateSettingJson = {};
        var $_settingParentList = $('.tanceng .pur_quote_create_choose_setting_box_list .pur_quote_create_choose_setting_one_box_list');
        $.each($_settingParentList, function (i, v) {
            //整机配件信息
            var settingGoodsArr = [];
            $.each($_settingParentList.eq(i).find('.box_open_list'), function (i2, v2) {
                var settingGoodsInfoArr = [];
                var $_settingGoodsInfoTr = $_settingParentList.eq(i).find('.box_open_list').eq(i2).find('tbody tr:not(".table_total")');
                $.each($_settingGoodsInfoTr, function (i3, v3) {
                    settingGoodsInfoArr.push({
                        "good_id": $_settingGoodsInfoTr.eq(i3).attr('settinggoodsid'),
                        "up_down": $_settingGoodsInfoTr.eq(i3).attr('lik_up_down_type'),
                        "good_sn": $_settingGoodsInfoTr.eq(i3).find('td').eq(0).text(),
                        "good_attr": $_settingGoodsInfoTr.eq(i3).find('td').eq(1).text(),
                        "sing_num": $_settingGoodsInfoTr.eq(i3).find('.pur_quote_create_setting_child_num').val(),
                        "total_num": $_settingGoodsInfoTr.eq(i3).find('td.pur_quote_create_setting_child_one_num_total').text(),
                        "good_price": $_settingGoodsInfoTr.eq(i3).find('.pur_quote_create_setting_child_one_cost').val(),
                        "good_last_price": $_settingGoodsInfoTr.eq(i3).find('.pur_quote_create_setting_child_one_cost').attr('lastprice'),
                        "good_rate": $_settingGoodsInfoTr.eq(i3).find('td.pur_quote_create_setting_child_one_tax').text(),
                        "good_rate_price": $_settingGoodsInfoTr.eq(i3).find('td.pur_quote_create_setting_child_one_cost_hsj').text(),
                        "good_total": $_settingGoodsInfoTr.eq(i3).find('td.pur_quote_create_setting_child_one_cost_total').text()
                    });
                });
                settingGoodsArr.push({
                    "title": $_settingParentList.eq(i).find('.box_open_list').eq(i2).find('.box_open_head span').text(),
                    "attr_list": settingGoodsInfoArr,
                    "sum_num": $_settingParentList.eq(i).find('.box_open_list').eq(i2).find('.pur_quote_create_setting_child_num_total').text(),
                    "sum_total": $_settingParentList.eq(i).find('.box_open_list').eq(i2).find('.pur_quote_create_setting_child_cost_hj_total').text()
                })
            });
            // 整机商品信息
            var curTr = $_settingParentList.eq(i).find('tbody:nth-of-type(1) tr');
            purQuoteCreateSettingArr.push({
                "setting_id": curTr.attr('settingid'),
                "setting_name": curTr.find('td').eq(1).text(),
                "setting_sn": curTr.find('td').eq(2).text(),
                "setting_unit": curTr.find('td').eq(3).text(),
                "setting_attr": curTr.find('td').eq(4).text(),
                "setting_num": curTr.find('input.pur_quote_create_setting_parent_num').val(),
                "setting_price": curTr.find('input.pur_quote_create_setting_cost_one_change').val(),
                "setting_rate": curTr.find('td').eq(7).text(),
                "setting_rate_price": curTr.find('.pur_quote_create_setting_parent_one_cost_hsj').text(),
                "setting_total": curTr.find('.pur_quote_create_setting_parent_one_cost_total').text(),
                "good_list": settingGoodsArr
            });
        });
        purQuoteCreateSettingJson.setting = purQuoteCreateSettingArr;
        purQuoteCreateSettingJson.sum_num = $('.tanceng .pur_quote_create_setting_num_total_hj').text();
        purQuoteCreateSettingJson.sum_total = $('.tanceng .pur_quote_create_setting_cost_total_hj').text();
        if (purQuoteCreateSettingArr.length == 0) {
            purQuoteCreateData.setting = '';
        } else {
            purQuoteCreateData.setting = arrayToJson(purQuoteCreateSettingJson);
        }


        //是否包运费
        if ($('.tanceng .pur_quote_create_freight_checkbox').is(':checked')) {
            purQuoteCreateData.is_freight = 1;
        } else {
            purQuoteCreateData.is_freight = 0;
        }
        //备注
        if ($('.tanceng .pur_quote_create_note_textarea').val() == '请输入备注') {
            purQuoteCreateData.note = '';
        } else {
            purQuoteCreateData.note = $('.tanceng .pur_quote_create_note_textarea').val();
        }
        //商品合计
        purQuoteCreateData.money_sum = $('.tanceng .pur_quote_create_product_cost_total').val();
        //合计税额
        purQuoteCreateData.tax_money_sum = $('.tanceng .pur_quote_create_tax_total').val();
        //其他费用
        purQuoteCreateData.other_free = $('.tanceng .pur_quote_create_other_fee').val();
        //总计金额
        purQuoteCreateData.totals = $('.tanceng .pur_quote_create_cost_tax_total').html();

        //审批人
        var flowList = '';
        if ($('.tanceng .pur_quote_create_flow_list li').length == 0) {
            alert('请选择审批人');
            return false;
        } else {
            $.each($('.tanceng .pur_quote_create_flow_list li'), function (i, v) {
                flowList += $('.tanceng .pur_quote_create_flow_list li').eq(i).attr('flowid') + ',';
            });
            flowList = flowList.slice(0, flowList.length - 1);
        }
        purQuoteCreateData.flow = flowList;

        if (purQuoteCreateData.goods == '' && purQuoteCreateData.setting == '') {
            alert('请选择商品');
            return false;
        }

        console.log(purQuoteCreateData);

        $.ajax({
            url: SERVER_URL + "/buy-quote/add",
            type: 'POST',
            data: purQuoteCreateData,
            dataType: 'json',
            success: function (e) {
                if (e.code == 0) {
                    $('.tanceng .dialog_box').remove();
                    $('.tanceng').css('display', 'none');
                    getBuyQuoteList();
                    getBuyQuoteDraftNum();
                }
            },
            error: function (data) {
                alert(data);
            }
        });
    }

    //编辑采购报价单
    $('.pur_quote_edit_btn').die('click').live('click', function () {
        purQuoteCurrentId = $(this).closest('tr').attr('purquoteid');
        purQuoteCreateData.quote_id = purQuoteCurrentId;
        $('.tanceng .xs_xsbjd_sp_box').addClass('none');
        purQuoteEditDetailFn();
    });

    //查看 - 编辑采购报价单
    $('.pur_quote_look_edit_btn').die('click').live('click', function () {
        purQuoteEditDetailFn();
    });

    //编辑采购报价单 - 获取详情函数
    function purQuoteEditDetailFn() {
        $.ajax({
            url: SERVER_URL + '/buy-quote/detail',
            type: 'GET',
            data: {
                token: token,
                buy_quote_id: purQuoteCurrentId,
                is_list: 1
            },
            async: false,
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var data = oE.data;
                    console.log(data);
                    //创建日期
                    $('.tanceng .pur_quote_create_time').html(data['created_at']);
                    //创建人
                    $('.tanceng .pur_quote_create_uname').html(data['uname']);
                    purQuoteCreateData.uid = data['uid'];
                    //采购报价单编号
                    $('.tanceng .pur_quote_create_code_sn').val(data['code_sn']);
                    purQuoteCreateData.code_sn = data['code_sn'];
                    //关联借入单
                    $('.tanceng .pur_quote_create_choose_borrow_inp').val(data['borrow_sn']);
                    purQuoteCreateData.borrow_id = data['borrow_id'];
                    //供应商
                    $('.tanceng .pur_quote_create_choose_supplier_inp').val(data['supplier_name']);
                    purQuoteCreateData.supplier_id = data['supplier_id'];
                    //公司账户
                    $('.tanceng .pur_quote_create_choose_account').val(data['account_name']);
                    purQuoteCreateData.account_id = data['account_id'];
                    //税率
                    if (data['tax_rate'] == 1) {
                        $('.tanceng .pur_quote_create_tax_num_inp').val('含税17%');
                    } else {
                        $('.tanceng .pur_quote_create_tax_num_inp').val('无税');
                    }
                    //审批人
                    var flowHtml = '';
                    if (data['current_check'] == 1) {
                        //跨级
                        $.each(data['flow_arr'], function (i, v) {
                            flowHtml += '<li flowid="' + v['name'] + '"><em class="icon_personBtn icon_personBtn_msg"></em><em class="icon_adderBtn"></em><p class="box_adderName">' + v['name'] + '</p></li>';
                        });
                    } else {
                        //不跨级
                        $.each(data['flow_arr'], function (i, v) {
                            flowHtml += '<li flowid="' + v['name'] + '"><em class="icon_personBtn icon_personBtn_msg"><i class="icon_personNext ' + ((i == data['flow_arr'].length - 1) ? 'none' : '') + '"></i></em><em class="icon_adderBtn"></em><p class="box_adderName">' + v['name'] + '</p><p class="box_addermsg">' + flowOrderArr[i] + '</p></li>';
                        });
                    }
                    $('.tanceng .pur_quote_create_flow_list').html(flowHtml);
                    purQuoteCreateData.flow = data['flow'];
                    //采购报价单详情
                    var purQuoteStepsHtml = '';
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
                                        <td class="noprint">' + l_dbl(i + 1) + '</td>\
                                        <td class="noprint">' + v['good_sn'] + '</td>\
                                        <td class="xs_print_name">' + v['good_name'] + '</td>\
                                        <td class="xs_print_sx">' + v['good_attr'] + '</td>\
                                        <td class="noprint">' + v['good_num'] + v['good_unit'] + '</td>\
                                        <td class="xs_bjd_td xs_goods_box xs_print_price" style="position: relative;padding:8px 10px;">\
                                            <div>\
                                            <span>￥' + v['good_price'] + '</span><i class="' + (v['up_down'] == 1 ? 'ven_warning_arrow_up' : 'ven_warning_arrow') + ' xs_goods_down_img" style="' + (v['up_down'] == 0 ? 'display: none;' : '') + '"></i>\
                                            </div>\
                                            <div class="work_vent_client_contMsgBox" style="display: none;top: 4px;left: 94px">\
                                            <i class="work_vent_client_torr"></i>\
                                            <div class="work_vent_client_contMsgBoxDet fnc_output_ticket_total_remain_ticket_num_list">' + (v['up_down'] == 1 ? '高' : '低') + '于 ' + v['good_last_price'] + '(上次报价)</div>\
                                        </div>\
                                        </td>\
                                        <td class="none xs_print_sl">' + v['good_num'] + v['good_unit'] + '</td>\
                                        <td class="noprint">￥' + v['good_rate_price'] + '</td>\
                                        <td class="xs_print_total">￥' + v['good_total'] + '</td>\
                                        <td class="noprint"></td>\
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
                            console.log(settingArr);
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
                                        <td class="xs_bjd_td xs_goods_box" style="position: relative;"><div>￥' + v3['good_price'] + '<i class="' + (v3['up_down'] == 1 ? 'ven_warning_arrow_up' : 'ven_warning_arrow') + ' xs_goods_down_img ' + (v3['up_down'] == 0 ? 'none' : '') + '"></i>\
                            </div>\
                            <div class="work_vent_client_contMsgBox" style="display: none;top: 3px;left: 94px">\
                            <i class="work_vent_client_torr"></i>\
                            <div class="work_vent_client_contMsgBoxDet fnc_output_ticket_total_remain_ticket_num_list" style="font-weight: 100;">' + (v3['up_down'] == 1 ? '高' : '低') + '于 ' + v3['good_last_price'] + '(上次报价)</div>\
                            </div>\</td>\
                                        <td>￥' + v3['good_rate_price'] + '</td>\
                                        <td>￥' + v3['good_total'] + '</td>\
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
                                        <th width="150">单价</th>\
                                        <th width="90">含税价</th>\
                                        <th width="90">总价</th>\
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
                            <th width="150">单价</th>\
                            <th width="90">含税价</th>\
                            <th width="90">总价</th>\
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
                            <td width="150">\
                            <span>￥' + v['setting_price'] + '</span>\
                            </td>\
                            <td width="90">￥' + v['setting_rate_price'] + '</td>\
                            <td width="90">￥' + v['setting_total'] + '</td>\
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
                    }
                }
            }
        })
    }

    //新建采购报价单 - 提交审批
    $('.tanceng .pur_quote_edit_submit').die('click').live('click', function () {
        purQuoteCreateData.quote_id = purQuoteCurrentId;
        purQuoteCreateData.is_draft = 0;
        console.log(purQuoteCreateData);
        purQuoteCreateSubmitFn();
    });
    //新建采购报价单 - 保存草稿
    $('.tanceng .pur_quote_edit_submit_draft').die('click').live('click', function () {
        purQuoteCreateData.quote_id = purQuoteCurrentId;
        purQuoteCreateData.is_draft = 1;
        purQuoteCreateSubmitFn();
    });


    //导出
    $('.tanceng .pur_quote_print_btn').live('click', function () {
        document.title = '采购报价单' + $('.tanceng .pur_quote_look_code_sn').html();
    });

});
