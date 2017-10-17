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

    //js实现数组转换成json
    function arrayToJson(o) {
        var r = [];
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
        return o.toString();
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
    uid = Admin.get_uid();
    //token = '2017052516045457073-1-1';
    var uname = loginUserInfo.username;
    //	补零函数
    function l_dbl(x) {
        return x < 10 ? '0' + x : x
    }

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
    var purOrderLookAbledField = [
        {'index': null, 'field': '创建日期'},
        {'index': null, 'field': '创建人'},
        {'index': null, 'field': '负责部门'},
        {'index': null, 'field': '负责人'},
        {'index': null, 'field': '备注'}
    ];
    likShow('#pur_order_table', purOrderLookAbledField, '#pur_order_look_list_ul', '#pur_order_look_save', '#pur_order_look_reset');

    //采购订单参数
    var getBuyOrderData = {
        token: token,
        page: 1,//页面
        num: 10,//每页条数
        type: 0, // 0全部1团购采购2我的采购3抄送我的
        //dept: '',
        //owner: '',
        is_invalid: '',
        key: ''//  关键字
    };
    //全部采购订单列表
    getBuyOrderList();
    $('#pur_order_list_all').die('click').live('click', function () {
        getBuyOrderData.type = 0;
        getBuyOrderList();
    });
    //团购采购订单列表
    $('#pur_order_list_team').die('click').live('click', function () {
        getBuyOrderData.type = 1;
        getBuyOrderList();
    });
    //我的采购订单列表
    $('#pur_order_list_mine').die('click').live('click', function () {
        getBuyOrderData.type = 2;
        getBuyOrderList();
    });
    //抄送我的采购订单列表
    $('#pur_order_list_mycheck').die('click').live('click', function () {
        getBuyOrderData.type = 3;
        getBuyOrderList();
    });
    //搜索
    $('#pur_order_search_btn').die('click').live('click', function () {
        if ($('#pur_order_search_inp').val() == '采购订单编号/供应商名称') {
            alert('请输入搜索关键字');
            getBuyOrderData.key = '';
        } else {
            getBuyOrderData.key = $('#pur_order_search_inp').val();
        }
        getBuyOrderList();
    });
    function getBuyOrderList() {
        $.ajax({
            url: SERVER_URL + '/buy-order/list',
            type: 'GET',
            data: getBuyOrderData,
            dataType: 'json',
            success: function (oE) {
                //搜索结果
                $('#pur_order_total').html(oE.totalcount);
                if (oE.code == 0) {
                    console.log(oE);
                    //合计总金额
                    $('.pur_order_list_hj_total').html(oE.sum_totals);
                    //合计已付金额
                    $('.pur_order_list_hj_already_pay_money').html(oE.sum_already_pay_money);
                    //合计已收发票
                    $('.pur_order_list_hj_total').html(oE.sum_totals);
                    var datalist = oE.datalist;
                    if (datalist.length == 0) {
                        $('.pur_order_nodata_box').removeClass('none');
                        $('.pur_order_handle').addClass('none');
                        $('.pur_order_table_total').addClass('none');
                    } else {
                        $('.pur_order_nodata_box').addClass('none');
                        $('.pur_order_handle').removeClass('none');
                        $('.pur_order_table_total').removeClass('none');
                    }
                    var purOrderListHtml = '';
                    $.each(datalist, function (i, v) {
                        //作废状态判断
                        var purOrderInvalidClass = '';
                        var purOrderInvalid = '';// 0 正常  1 作废
                        var purOrderOperateBtn = '';
                        if (v['is_invalid'] == 0) {
                            purOrderInvalidClass = '';
                            purOrderInvalid = l_dbl(i + 1);
                            purOrderOperateBtn = '<button class="but_mix but_void but_void pur_order_invalid_btn">作废</button>';
                        } else {
                            purOrderInvalidClass = 'grey';
                            purOrderInvalid = '<span class="voidIcon">作废</span>';
                            purOrderOperateBtn = '';
                        }
                        //入库状态
                        var purOrderStorageClass = '';
                        var purOrderStorageName = '';
                        if (v['storage_status'] == 1) {
                            purOrderStorageClass = 'c_r';
                            purOrderStorageName = '待入库';
                        } else if (v['storage_status'] == 2) {
                            purOrderStorageClass = 'c_y';
                            purOrderStorageName = '部分入库';
                        } else if (v['storage_status'] == 3) {
                            purOrderStorageClass = 'c_g';
                            purOrderStorageName = '已入库';
                        }
                        //已付金额详情
                        var purOrderPayList = '';
                        purOrderPayList += '<div class="lik_dialog_mousemove cg_ghs_contMsgBox' + (v['pay_list']['list'].length == 0 ? 'none' : '') + '" style="display: none;width: 330px;position:fixed;">\
                                                        <i class="cg_ghs_torr"></i>\
                                                        <div class="cg_ghs_contMsgBoxDet" style="border-bottom:1px solid #e6e6e6;">\
                                                        <ul>';
                        $.each(v['pay_list']['list'], function (i2, v2) {
                            purOrderPayList += '<li>实付款：<span>' + v2['already_pay_money'] + '</span>   收款人：<span>' + v2['name'] + '</span>  <span>' + v2['day'] + '</span></li>';
                        });
                        purOrderPayList += '</ul>\
                                                    <p class="c_r" style="font-weight: bold;text-align: right;margin-right: 10px;">总计实收款: ￥<span>' + v['pay_list']['sum'] + '</span></p>\
                                               </div>';
                        //已收发票详情
                        var purOrderTicketList = '';
                        purOrderTicketList += '<div class="lik_dialog_mousemove cg_ghs_contMsgBox' + (v['tick_list']['list'].length == 0 ? 'none' : '') + '" style="display: none;width: 330px;position:fixed;">\
                                                        <i class="cg_ghs_torr"></i>\
                                                        <div class="cg_ghs_contMsgBoxDet" style="border-bottom:1px solid #e6e6e6;">\
                                                        <ul>';
                        $.each(v['tick_list']['list'], function (i2, v2) {
                            purOrderTicketList += '<li>已收票款：<span>' + v2['already_ticket_pay_money'] + '</span>   付票人：<span>' + v2['name'] + '</span>  <span>' + v2['day'] + '</span></li>';
                        });
                        purOrderTicketList += '</ul>\
                                                    <p class="c_r" style="font-weight: bold;text-align: right;margin-right: 10px;">总计实收票款: ￥<span>' + v['tick_list']['sum'] + '</span></p>\
                                               </div>';
                        purOrderListHtml += '<tr purorderid="' + v['id'] + '" class="' + purOrderInvalidClass + '">\
                            <td>' + purOrderInvalid + '</td>\
                            <td>' + likNullData(v['buy_code_sn']) + '</td>\
                            <td>' + likNullData(v['supplier_name']) + '</td>\
                            <td>' + likNullData(v['created_at'].split(' ')[0]) + '</td>\
                            <td>' + likNullData(v['dept_name']) + '</td>\
                            <td>' + likNullData(v['owner_name']) + '</td>\
                            <td>' + likNullData(v['input_time']) + '</td>\
                             <td class="' + purOrderStorageClass + '">' + purOrderStorageName + '</td>\
                            <td>' + likNullData(v['totals']) + '</td>\
                            <td class="relative cg_ghs_contact" style="cursor: \
pointer;"><span class="f_color">' + likNullData(v['already_pay_money']) + '</span>\
                            ' + purOrderPayList + '\
                        </td>\
                        <td class="relative cg_ghs_contact" style="cursor: pointer;"><span class="f_color">' + likNullData(v['already_ticket_pay_money']) + '</span>\
                            ' + purOrderTicketList + '\
                        </td>\
                        <td><button class="but_mix but_look r_sidebar_btn pur_order_look_btn" name="cg_cgdd_look">查看</button>' + purOrderOperateBtn + '</td>\
                            </tr>';
                    });
                    $('#pur_order_list').html(purOrderListHtml);//客户联系人鼠标悬浮效果
                    $('.cg_ghs_contact').live('mouseover', function (e) {
                        //var index = $(this).index();
                        $('.cg_ghs_contact').live('mousemove', function (e) {
                            $('.lik_dialog_mousemove').css({
                                'left': e.pageX - 20,
                                'top': e.pageY + 25,
                                'zIndex': '999'
                            });
                        });
                    });
                    $('.cg_ghs_contact').live('mouseout', function (e) {
                        $('.lik_dialog_mousemove').css('display', 'none');
                    });
                    //分页
                    list_table_render_pagination('.pur_order_pagination', getBuyOrderData, getBuyOrderList, oE.totalcount, datalist.length);
                    $('#pur_order_look_save').trigger('click');
                }
            }
        });
    }

    //不显示作废订单
    $('.pur_order_noshow_invalid_btn').live('click', function () {
        getBuyOrderData.page = 1;
        if ($(this).attr('checked') == 'checked') {
            getBuyOrderData.is_invalid = 0;
        } else {
            getBuyOrderData.is_invalid = '';
        }
        getBuyOrderList();
    });

    //新建采购订单
    var purOrderCreateData = {
        token: token,
        buy_code_sn: '',//采购订单编号
        purchase_contract: '',//采购合同id
        buy_quote_id: '', // 采购报价单id
        supplier_id: '', //供应商id
        dept: '', //负责部门id
        owner: '', //负责人id
        note: '',//备注
        copy_list: '',//抄送人
        totals: '',//总计金额
        account_name: '',//结算账户名称
        pay_type: '',//1现金2电汇3支票
        tax_rate: '',//税率
        no_pay_money: '',//应付款金额
        on_receipt_money: '',//应收款金额
        in_libs_day: '',//入库日期
        in_libs_goods: '',//入库商品 和报价单格式一样
        owner_name: '',//负责人名字
        dept_name: ''//部门名称
    };
    //新建采购订单 - 推送待入库
    var purOrderToStockingIn = {
        token: token,
        related_receipts_no: '', // 关联单据编号
        input_type: '', // 入库类型 1销售退货 2借入 3借出归还 4销售换货 5采购/采购换货
        related_business_name: '', // 相关往来名称
        document_marker: '', // 下单人
        remark: '', // 备注
        product_info: '', // 商品明细
        input_time: '' // 入库日期
    };
    //新建采购订单 - 推送付款
    var purOrderToPaying = {
        token: token,
        last_id: '', //返回的最后id
        code_sn: '', //相关业务单编号
        name: '', //相关业务名称 采购是供应商 销售是客户名称
        thetype: '', //收款类型 1销售退货 2采购订单
        no_pay_money: '', //应付款
        tax_status: '', //含税状态 1未税 2含税
        account_id: '', //结算账户id
        account_name: '', //结算账户
        receipt_way: '' //付款方式1现金 2电汇 3支票
    };

    //新建采购订单 - 推送收票
    var purOrderToInTicket = {
        token: token,
        last_id: '', //返回的最后id
        code_sn: '', //相关业务单编号
        cs_name: '', //相关业务名称 采购是供应商 销售是客户名称
        owner: '', //收款类型 1销售退货 2采购订单
        no_ticket_pay_money: '', //应付款
        name: '' //结算账户
    };
    //新建采购订单
    $('.pur_order_create_btn').die('click').live('click', function () {
        //初始化
        purOrderCreateData = {
            token: token,
            buy_code_sn: '',//采购订单编号
            purchase_contract: '',//采购合同id
            buy_quote_id: '', // 采购报价单id
            supplier_id: '', //供应商id
            dept: '', //负责部门id
            owner: '', //负责人id
            note: '',//备注
            copy_list: '',//抄送人
            totals: '',//总计金额
            account_name: '',//结算账户名称
            pay_type: '',//1现金2电汇3支票
            tax_rate: '',//税率
            no_pay_money: '',//应付款金额
            on_receipt_money: '',//应收款金额
            in_libs_day: '',//入库日期
            in_libs_goods: '',//入库商品 和报价单格式一样
            owner_name: '',//负责人名字
            dept_name: ''//部门名称
        };
        //新建采购订单 - 推送待入库
        purOrderToStockingIn = {
            token: token,
            related_receipts_no: '', // 关联单据编号
            input_type: 5, // 入库类型 1销售退货 2借入 3借出归还 4销售换货 5采购/采购换货
            related_business_name: '', // 相关往来名称
            document_marker: '', // 下单人
            remark: '', // 备注
            product_info: '', // 商品明细
            input_time: '' // 入库日期
        };
        //新建采购订单 - 推送付款
        purOrderToPaying = {
            token: token,
            last_id: '', //返回的最后id
            code_sn: '', //相关业务单编号
            name: '', //相关业务名称 采购是供应商 销售是客户名称
            thetype: 2, //收款类型 1销售退货 2采购订单
            no_pay_money: '', //应付款
            tax_status: '', //含税状态 1未税 2含税
            account_name: '', //结算账户
            receipt_way: '' //付款方式1现金 2电汇 3支票
        };
        //新建采购订单 - 推送收票
        purOrderToInTicket = {
            token: token,
            last_id: '', //返回的最后id
            code_sn: '', //相关业务单编号
            cs_name: '', //相关业务名称 采购是供应商 销售是客户名称
            owner: uid, //
            no_ticket_pay_money: '', //应付款
            name: '' //结算账户
        };

        //创建日期
        $('.tanceng .pur_order_create_at').html(getCurrentDateDay());
        //创建人
        $('.tanceng .pur_order_create_uname').html(uname);
        //采购订单编号
        $('.tanceng .pur_order_create_code_sn').val(likGetCodeFn('CGD'));
        //推送待入库
        purOrderToStockingIn.related_receipts_no = $('.tanceng .pur_order_create_code_sn').val();
        purOrderToStockingIn.document_marker = uid;
        //推送付款
        purOrderToPaying.code_sn = $('.tanceng .pur_order_create_code_sn').val();
        //推送收票
        purOrderToInTicket.code_sn = $('.tanceng .pur_order_create_code_sn').val();
    });
    //采购合同获取列表参数
    var purOrderCreateChooseContractData = {
        token: token,
        page: 1,
        num: 10,
        status: 3,
        is_invalid: 0,//是否作废：0正常1作废
        thetype: 1,//类型：1我发起的 2待我审批 3抄送我的
        keywords: '',//关键词（合同编号、采购报价单编号、供应商名称、合同名称）
        flow: '',//审核人
        uid: '',//创建人
        dept_id: '',//负责部门
        owner_id: '',//负责人
        created_at: '',//创建日期：1升序2降序
        order_status: ''//状态：1升序2降序
    };
    //选择采购合同函数
    function purOrderCreateChooseContractList() {
        $.ajax({
            url: SERVER_URL + '/purchase-contract/list',
            type: 'GET',
            data: purOrderCreateChooseContractData,
            dataType: 'json',
            success: function (oE) {
                //搜索结果
                $('.tanceng .pur_order_create_choose_contract_total').html(oE.totalcount);
                if (oE.code == 0) {
                    var datalist = oE.datalist;
                    if (datalist.length == 0) {
                        $('.tanceng .pur_order_create_choose_contract_nodata_box').removeClass('none');
                        $('.pur_order_create_choose_contract_handle').addClass('none');
                    } else {
                        $('.tanceng .pur_order_create_choose_contract_nodata_box').addClass('none');
                        $('.tanceng .pur_order_create_choose_contract_handle').removeClass('none');
                    }
                    var purContractListHtml = '';
                    $.each(datalist, function (i, v) {
                        purContractListHtml += '<tr purcontractid="' + v['id'] + '" purquoteid="' + v['quote_id'] + '" supid="' + v['supplier_id'] + '" dept="' + v['dept_id'] + '" owner="' + v['owner_id'] + '">\
                                                    <td><input type="radio" name="xs_xsdd_xzxsthinp" ' + (i == 0 ? 'checked' : '') + '></td>\
                                                    <td>' + v['purchase_sn'] + '</td>\
                                                    <td>' + v['purchase_quote_sn'] + '</td>\
                                                    \<td>' + v['created_at'].split(' ')[0] + '</td>\
                                                    <td>' + v['name'] + '</td>\
                                                    <td>' + v['supplier_name'] + '</td>\
                                                    <td class="c_g">通过</td>\
                                                    <td>' + v['current_name'] + '</td>\
                                                </tr>'
                    });
                    $('.tanceng .pur_order_create_choose_contract_list').html(purContractListHtml);
                    //分页
                    list_table_render_pagination('.pur_order_create_choose_contract_pagination', purOrderCreateChooseContractData, purOrderCreateChooseContractList, oE.totalcount, datalist.length);
                }
            }
        });
    }

    //新建采购订单 - 关联采购合同
    $('.tanceng .pur_order_create_choose_pur_contract_btn').die('click').live('click', function () {
        purOrderCreateChooseContractList();
    });
    //选择采购合同 - 搜索关键字
    $('.tanceng .pur_order_create_choose_contract_search_btn').die('click').live('click', function () {
        if ($('.tanceng .pur_order_create_choose_contract_search_inp').val() == '搜索合同编号') {
            purOrderCreateChooseContractData.keywords = '';
        } else {
            purOrderCreateChooseContractData.keywords = $('.tanceng .pur_order_create_choose_contract_search_inp').val();
        }
        purOrderCreateChooseContractList();
    });
    //选择采购合同 - 保存
    $('.tanceng .pur_order_create_choose_contract_save').die('click').live('click', function () {
        var chosenContract = $('.tanceng .pur_order_create_choose_contract_list input:checked').closest('tr');
        $('.tanceng .pur_order_link_contract_inp').val(chosenContract.find('td').eq(1).html());
        //采购报价单
        $('.tanceng .pur_order_link_quote_code_inp').val(chosenContract.find('td').eq(2).html());
        purOrderCreateData.purchase_contract = chosenContract.attr('purcontractid');
        purOrderCreateData.buy_quote_id = chosenContract.attr('purquoteid');
        $('.tanceng .pur_order_create_custom_name').val(chosenContract.find('td').eq(4).html());
        //查看采购报价单添加弹层类
        $('.tanceng .pur_order_create_look_quote_btn').addClass('val_dialogTop').attr('quoteid', purOrderCreateData.buy_quote_id).css('color', '#23a2f3').removeAttr('disabled');
        //查看入库商品添加弹层类
        $('.tanceng .pur_order_create_look_goods').addClass('val_dialogTop but_blue').removeClass('but_grey1').attr('quoteid', purOrderCreateData.buy_quote_id).removeAttr('disabled');

        //获取采购合同详情
        $.ajax({
            url: SERVER_URL + '/purchase-contract/info',
            type: 'GET',
            async: false,
            data: {
                token: token,
                id: purOrderCreateData.purchase_contract
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var data = oE.data;
                    console.log(data);
                    //供应商
                    $('.tanceng .pur_order_create_supplier_name').val(data['supplier_name']);
                    purOrderCreateData.supplier_id = data['supplier_id'];
                    purOrderCreateData.supplier_name = data['supplier_name'];
                    //推送入库
                    purOrderToStockingIn.related_business_name = $('.tanceng .pur_order_create_supplier_name').val();
                    //推送付款
                    purOrderToPaying.name = $('.tanceng .pur_order_create_supplier_name').val();
                    //推送收票
                    purOrderToInTicket.cs_name = $('.tanceng .pur_order_create_supplier_name').val();
                    //负责部门
                    $('.tanceng .pur_order_create_dept_name').val(data['dept_name']);
                    purOrderCreateData.dept = data['dept_id'];
                    purOrderCreateData.dept_name = data['dept_name'];
                    //负责人
                    $('.tanceng .pur_order_create_owner_name').val(data['owner_name']);
                    purOrderCreateData.owner = data['owner_id'];
                    purOrderCreateData.owner_name = data['owner_name'];
                    //结算账户
                    $('.tanceng .pur_order_create_account_name').val(data['account_name']);
                    purOrderCreateData.account_name = data['account_name'];
                    //推送付款
                    purOrderToPaying.account_id = data['chance_account'];
                    purOrderToPaying.account_name = data['account_name'];
                    //推送收票
                    purOrderToInTicket.name = data['account_name'];
                }
            }
        });

        console.log(purOrderCreateData.buy_quote_id);

        //通过采购报价单id获取商品信息
        $.ajax({
            url: SERVER_URL + '/buy-quote/detail',
            type: 'GET',
            async: false,
            data: {
                token: token,
                buy_quote_id: purOrderCreateData.buy_quote_id,
                is_list: 0
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var data = oE.data;
                    console.log(data);
                    if (data['product_json']) {
                        //总金额
                        $('.tanceng .pur_order_create_totals').html(data['product_json']['totals']);
                        $('.tanceng .pur_order_create_totals_inp').val(data['product_json']['totals']);
                        purOrderCreateData.in_libs_goods = arrayToJson(data['product_json']);
                        var rukuProducts = [];
                        if (data['product_json']['goods']) {
                            $.each(data['product_json']['goods']['goods'], function (i, v) {
                                rukuProducts.push({
                                    product_id: v['good_id'],
                                    product_type: 1,
                                    input_num: v['good_num'],
                                    product_type_no: v['good_sn'],
                                    product_type_name: v['good_name'],
                                    set_detail: []
                                });
                            });
                        }
                        if (data['product_json']['setting']) {
                            var goods = [];
                            $.each(data['product_json']['setting']['setting'], function (i, v) {
                                $.each(v['good_list'], function (i2, v2) {
                                    goods = goods.concat(v2['attr_list']);
                                });
                                var settingGoods = [];
                                $.each(goods, function (i2, v2) {
                                    settingGoods.push({
                                        product_id: v2['good_id'],
                                        num: v2['sing_num']
                                    });
                                });
                                rukuProducts.push({
                                    product_id: v['setting_id'],
                                    product_type: 3,
                                    input_num: v['setting_num'],
                                    product_type_no: v['setting_sn'],
                                    product_type_name: v['setting_name'],
                                    set_detail: settingGoods
                                });
                            });
                        }
                        purOrderToStockingIn.product_info = arrayToJson(rukuProducts);
                    }
                    //含税状态
                    if (data['tax_rate'] == 0) {
                        $('.tanceng .pur_order_create_tax_rate').val('无税');
                    } else if (data['tax_rate'] == 1) {
                        $('.tanceng .pur_order_create_tax_rate').val('含税17%');
                    }
                    purOrderCreateData.tax_rate = data['tax_rate'];
                    //推送付款
                    purOrderToPaying.tax_status = data['tax_rate'];
                }
            }
        });

        $(this).closest('.dialog_box').remove();
    });

    //付款方式
    $('.pur_order_create_zffs_ul li').live('click', function () {
        purOrderCreateData.pay_type = $(this).index() + 1;
        purOrderToPaying.receipt_way = $(this).index() + 1;
    });

    //查看采购报价单详情
    $('.tanceng .pur_order_create_look_quote_btn').live('click', function () {
        getPurQuoteDetailFn(purOrderCreateData.buy_quote_id);
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
                                        <td>' + v['good_price'] + '</td>\
                                        <td>' + v['good_rate'] + '</td>\
                                        <td>' + v['good_rate_price'] + '</td>\
                                        <td></td>\
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
    //入库商品详情函数
    function getPurQuoteDetailInLibFn(purQuoteCurrentId) {
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

    //新建查看入库商品
    $('.tanceng .pur_order_create_look_goods').live('click', function () {
        getPurQuoteDetailInLibFn(purOrderCreateData.buy_quote_id);
    });

    //添加抄送人
    $('.tanceng .ven_sell_chance_create_choose_copy_btn').die('click').live('click', function () {
        purOrderCreateChooseCopy()
    });
    //选择抄送人
    function purOrderCreateChooseCopy() {
        $.ajax({
            type: "get",
            url: SERVER_URL + "/dept/deptlist",
            data: {token: token},
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var deep = 0;
                    $('.tanceng .ven_sell_chance_create_choose_copy_list').html(tree_list_choose_dept_person(oE.rows, deep));
                    // 所有分类图标样式控制
                    if ($('i.ven_sell_chance_create_choose_copy_list').children().length == 0) {
                        $('li.left_all span.icon_open').addClass('personOth')
                    }
                    // 下级部门样式控制
                    for (var i = 0, liLeft1 = $('.tanceng .ven_sell_chance_create_choose_copy_list li.left_1').length; i < liLeft1; i++) {
                        if ($('.tanceng .ven_sell_chance_create_choose_copy_list li.left_1').eq(i).next('ul').length == 0) {
                            $('.tanceng .ven_sell_chance_create_choose_copy_list li.left_1').eq(i).find('span.icon_open').addClass('personOth');
                            $('.tanceng .ven_sell_chance_create_choose_copy_list li.left_1').eq(i).find('span.personOth').closest('li').addClass('deptChild')
                        }
                    }
                    //选择人员左侧选择
                    $('.tanceng .ven_sell_chance_create_choose_copy_list ul .li_person').die('click').live('click', function () {
                        if ($(this).find('em').hasClass('on')) {
                            $('.tanceng .ven_sell_chance_create_copy_chosen_list').find('li[userinfoid=' + $(this).attr('userinfoid') + ']').remove();
                            $(this).find('span.list_check em').removeClass('on')
                        } else {
                            $('.tanceng .ven_sell_chance_create_copy_chosen_list').append('<li userinfoid="' + $(this).attr('userinfoid') + '"><span>' + $(this).children('.list_msg').html() + '</span><i class="list_choose_delete"></i></li>');
                            $(this).find('span.list_check em').addClass('on')
                        }
                    });
                    //选择人员右侧删除
                    $('i.list_choose_delete').die('click').live('click', function () {
                        $(this).closest('li').remove();
                        $('.tanceng .ven_sell_chance_create_choose_copy_list ul .li_person[userinfoid = "' + $(this).closest('li').attr('userinfoid') + '"]').find('em').removeClass('on');
                    });
                    //选择人员保存
                    $('.tanceng .ven_sell_chance_choose_copy_save').die('click').live('click', function () {
                        var copyChosen = '';
                        $.each($('.tanceng .ven_sell_chance_create_copy_chosen_list li'), function (i, v) {
                            copyChosen += '<li userinfoid="' + $('.tanceng .ven_sell_chance_create_copy_chosen_list').find('li').eq(i).attr('userinfoid') + '">\
                                <i class="del_img_1">-</i><em class="icon_personBtn icon_personBtn_msg"><i class="icon_personNext"></i></em>\
                                <em class="icon_adderBtn"></em>\
                                <p class="box_adderName">' + $('.tanceng .ven_sell_chance_create_copy_chosen_list').find('li').eq(i).text() + '</p>\
                                </li>';
                        });
                        $('.tanceng .pur_order_create_add_copy_list').html('<li> <em class="icon_personBtn icon_personBtn_add val_dialogTop ven_sell_chance_create_choose_copy_btn" name="pur_order_create_csg"></em> </li>').prepend(copyChosen);
                        $(this).closest('.dialog_box').remove()
                    })
                }
            },
            error: function (data) {

            }
        });
    }

    //新建采购订单提交
    $('.pur_order_create_submit_btn').die('click').live('click', function () {
        if ($('.tanceng .pur_order_link_contract_inp').val() == '请选择采购合同') {
            alert('请选择采购合同');
            return false;
        }
        if ($('.tanceng .pur_order_create_fkfs').val() == '请选择付款方式') {
            alert('请选择付款方式');
            return false;
        }
        //采购订单编号
        purOrderCreateData.buy_code_sn = $('.tanceng .pur_order_create_code_sn').val();
        //预计到货日期
        if ($('.tanceng .pur_order_create_rukutime').val() == '请选择日期') {
            alert('请选择入库日期');
            return false;
        } else {
            purOrderCreateData.in_libs_day = $('.tanceng .pur_order_create_rukutime').val();
            purOrderToStockingIn.input_time = $('.tanceng .pur_order_create_rukutime').val();
        }
        //应付款金额
        purOrderCreateData.no_pay_money = $('.tanceng .pur_order_create_totals').text();
        //推送付款
        purOrderToPaying.no_pay_money = $('.tanceng .pur_order_create_totals').text();
        //推送收票
        purOrderToInTicket.no_ticket_pay_money = $('.tanceng .pur_order_create_totals').text();
        //应收款金额
        purOrderCreateData.on_receipt_money = $('.tanceng .pur_order_create_totals').text();
        //总计金额
        purOrderCreateData.totals = $('.tanceng .pur_order_create_totals').text();
        //备注
        if ($('.tanceng .pur_order_create_note').val() == '请输入备注') {
            purOrderCreateData.note = '';
            purOrderToStockingIn.remark = '';
        } else {
            purOrderCreateData.note = $('.tanceng .pur_order_create_note').val();
            purOrderToStockingIn.remark = $('.tanceng .pur_order_create_note').val();
        }
        //抄送人
        purOrderCreateData.copy_list = '';
        $.each($('.tanceng .pur_order_create_add_copy_list').find('li:not(:last-of-type)'), function (i, v) {
            purOrderCreateData.copy_list += $('.tanceng .pur_order_create_add_copy_list').find('li').eq(i).attr('userinfoid') + ',';
        });
        console.log(purOrderToStockingIn);
        $.ajax({
            url: SERVER_URL + '/buy-order/add',
            type: 'POST',
            data: purOrderCreateData,
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var onOff = false;
                    $('.pur_order_create_success_code').html(purOrderCreateData.buy_code_sn);
                    //推送入库信息
                    $.ajax({
                        url: SERVER_URL + '/stocking-in/add',
                        type: 'POST',
                        async: false,
                        data: purOrderToStockingIn,
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
                    //推送付款
                    purOrderToPaying.last_id = oE.id;
                    console.log(purOrderToPaying);
                    $.ajax({
                        url: SERVER_URL + '/push/reproductadd',
                        type: 'POST',
                        async: false,
                        data: purOrderToPaying,
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
                    //推送收票
                    purOrderToInTicket.last_id = oE.id;
                    $.ajax({
                        url: SERVER_URL + '/push/incometicketadd',
                        type: 'POST',
                        async: false,
                        data: purOrderToInTicket,
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
                    if (onOff) {
                        $('.tanceng>div').remove();
                        $('.tanceng').append($('.dialog_box[name="cg_cgdd_sccgd"]').clone().css('display', 'block')).css('display', 'block');
                    }
                    getBuyOrderList();
                }
            },
            error: function (e) {
                alert(e.msg);
            }
        });
    });

    //高级搜索列表
    //getBuyOrderSearchList();
    function getBuyOrderSearchList() {
        $.ajax({
            url: SERVER_URL + '/buy-order/list',
            type: 'GET',
            data: {
                token: token,
                num: 500
            },
            dataType: 'json',
            success: function (oE) {
                // 将返回值转换为json对象
                //var oE = eval("(" + e + ")");
                if (oE.code == 0) {
                    console.log(oE);
                    var datalist = oE.datalist;
                    var deptArr = [];
                    var ownerArr = [];
                    $.each(datalist, function (i, v) {
                        deptArr.push({
                            'dept': v['dept'],
                            'deptName': v['dept_name']
                        });
                        ownerArr.push({
                            'owner': v['owner'],
                            'ownerName': v['owner_name']
                        });
                    });
                    deptArr = getJsonArr(deptArr);
                    var buyOrderSearchDeptList = '';
                    $.each(deptArr, function (i, v) {
                        buyOrderSearchDeptList += '<li dept="' + v['dept'] + '">' + v['deptName'] + '</li>'
                    });
                    $('.pur_order_search_dept_ul').html(buyOrderSearchDeptList);
                    ownerArr = getJsonArr(ownerArr);
                    var buyOrderSearchOwnerList = '';
                    $.each(ownerArr, function (i, v) {
                        buyOrderSearchOwnerList += '<li owner="' + v['owner'] + '">' + v['ownerName'] + '</li>'
                    });
                    $('.pur_order_search_owner_ul').html(buyOrderSearchOwnerList);
                }
            }
        });
    }

    getBuyOrderSearchList();

    //搜索部门
    $('.pur_order_search_dept_ul li').die('click').live('click', function () {
        getBuyOrderData.dept = $(this).attr('dept');
        getBuyOrderList();
    });
    //搜索负责人
    $('.pur_order_search_owner_ul li').die('click').live('click', function () {
        getBuyOrderData.owner = $(this).attr('owner');
        getBuyOrderList();
    });

    //刷新列表
    $('.pur_order_list_refresh_btn').die('click').live('click', function () {
        getBuyOrderData.page = 1;
        getBuyOrderData.dept = '';
        getBuyOrderData.owner = '';
        getBuyOrderData.key = '';
        $('#pur_order_search_inp').val('采购订单编号/供应商名称').css('color', '#ccc');
        $('.pur_order_search_dept_inp').val('负责部门').css('color', '#ccc');
        $('.pur_order_search_owner_inp').val('负责人').css('color', '#ccc');
        getBuyOrderList();
    });

    //定义当前操作id
    var purOrderCurrentId = null;
    var purOrderLinkQuoteId = null;
    var purOrderLinkContractId = null;
    //查看操作
    $('.pur_order_look_btn').die('click').live('click', function () {
        $('#pur_order_look_nav_ul li:nth-of-type(1)').trigger('click');
        purOrderCurrentId = $(this).closest('tr').attr('purorderid');
        $.ajax({
            url: SERVER_URL + '/buy-order/info',
            type: 'GET',
            data: {
                token: token,
                buy_order_id: purOrderCurrentId
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
                //关联采购合同
                purOrderLinkContractId = data['purchase_contract'];
            }
        });
    });
    //查看入库商品
    $('.pur_order_look_ruku_products').live('click', function () {
        getPurQuoteDetailFn(purOrderLinkQuoteId);
    });

    //查看采购订单 - 采购报价单
    $('#pur_order_look_nav_quote').die('click').live('click', function () {
        $.ajax({
            url: SERVER_URL + '/buy-quote/detail',
            type: 'GET',
            data: {
                token: token,
                buy_quote_id: purOrderLinkQuoteId
            },
            dataType: 'json',
            success: function (oE) {
                // 将返回值转换为json对象
                //var oE = eval("(" + e + ")");
                if (oE.code == 0) {
                    var data = oE.data;
                    console.log(data);
                    //采购报价单编号
                    $('.pur_order_link_quote_code_sn').html(data['code_sn']);
                    //关联合同
                    $('.pur_order_link_purchase_code_sn').html(data['purchase_code_sn']);
                    //关联采购订单
                    $('.pur_order_link_buy_code_sn').html(data['buy_code_sn']);
                    //关联借入单
                    $('.pur_order_link_borrow_sn').html(data['borrow_sn']);
                    //供应商名称
                    $('.pur_order_link_supplier_name').html(data['supplier_name']);
                    //采购报价单采购商品
                    $('.pur_order_link_quote_product_name').html(data['product_name']);
                    //税率
                    if (data['tax_rate'] == 0) {
                        $('.pur_order_link_quote_tax_rate').html('无税');
                    } else {
                        $('.pur_order_link_quote_tax_rate').html('含税17%');
                    }
                    //总金额
                    if (data['product_json']) {
                        $('.pur_order_link_').html(data['product_json']['totals']);
                    }
                    //审批流程
                    var purOrderLookCheckListHtml = '';
                    var flowOrderArr2 = ['', '步骤一', '步骤二', '步骤三', '步骤四', '步骤五', '步骤六', '步骤七'];
                    if (data['check_log'].length != 0) {
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
                            purOrderLookCheckListHtml += '<div class="work_spiliu">\
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
                    }
                    $('.pur_order_link_quote_check_list').html(purOrderLookCheckListHtml);
                }
            }
        })
    });

    //查看关联报价单
    $('.pur_order_look_quote_btn').live('click', function () {
        getPurQuoteDetailFn(purOrderLinkQuoteId);
    });

    //查看采购订单 - 采购合同
    $('#pur_order_look_nav_contract').die('click').live('click', function () {
        $.ajax({
            url: SERVER_URL + '/purchase-contract/info',
            type: 'GET',
            data: {
                token: token,
                id: purOrderLinkContractId
            },
            dataType: 'json',
            success: function (oE) {
                // 将返回值转换为json对象
                //var oE = eval("(" + e + ")");
                if (oE.code == 0) {
                    var data = oE.data;
                    console.log(data);
                    //采购合同  合同编号
                    $('.pur_order_link_contract_purchase_sn').html(data['purchase_sn']);
                    //采购合同  采购订单编号
                    $('.pur_order_link_contract_purchase_order_sn').html(data['purchase_order_sn']);
                    //采购合同  采购报价单编号
                    $('.pur_order_link_contract_purchase_quote_sn').html(data['purchase_quote_sn']);
                    //采购合同  合同名称
                    $('.pur_order_link_contract_name').html(data['name']);
                    //采购合同  供应商名称
                    $('.pur_order_link_contract_supplier_name').html(data['supplier_name']);
                    //采购合同  审核状态
                    if (data['status'] == 1) {
                        $('.pur_order_link_contract_status').html('审批中');
                    } else if (data['status'] == 2) {
                        $('.pur_order_link_contract_status').html('未通过');
                    } else if (data['status'] == 3) {
                        $('.pur_order_link_contract_status').html('通过');
                    }
                    //采购合同  审核人
                    $('.pur_order_link_contract_current_name').html(data['current_name']);
                    //采购合同  采购商品
                    $('.pur_order_link_contract_').html(data['']);
                    //采购合同  创建时间
                    $('.pur_order_link_contract_created_at').html(data['created_at']);
                    //采购合同  创建人
                    $('.pur_order_link_contract_uname').html(data['uname']);
                    //采购合同  负责部门
                    $('.pur_order_link_contract_dept_name').html(data['dept_name']);
                    //采购合同  负责人
                    $('.pur_order_link_contract_owner_name').html(data['owner_name']);
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
                        $('.pur_order_link_contract_check_list').html(checkHtml);
                    }
                }
            }
        });
    });

    //查看采购订单 - 付款收票
    $('#pur_order_look_nav_pay').die('click').live('click', function () {
        $.ajax({
            url: SERVER_URL + '/buy-order/pay',
            type: 'GET',
            data: {
                token: token,
                buy_order_id: purOrderCurrentId
            },
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                if (oE.code == 0) {
                    //付款
                    var payList = '';
                    if(oE['pay_data'].length == 0){
                        $('.pur_order_look_fkjl_list_nodata_box').removeClass('none');
                        $('.pur_order_look_fkjl_list').addClass('none');
                        $('.pur_order_look_fkjl_list_table_total').addClass('none');
                    }else{
                        $('.pur_order_look_fkjl_list_nodata_box').addClass('none');
                        $('.pur_order_look_fkjl_list').removeClass('none');
                        $('.pur_order_look_fkjl_list_table_total').removeClass('none');
                    }
                    $.each(oE['pay_data'], function (i, v) {
                        payList += '<tr>\
                                    <td>'+l_dbl(i+1)+'</td>\
                                    <td>'+v['paying_code_sn']+'</td>\
                                    <td>'+v['day']+'</td>\
                                    <td>'+v['owner']+'</td>\
                                    <td>'+v['choice_cuenta_name']+'</td>\
                                    <td>'+v['already_pay_money']+'</td>\
                                    <td>'+v['note']+'</td>\
                                    </tr>';
                    });
                    $('.pur_order_look_fkjl_list').html(payList);
                    $('.pur_order_look_fkjl_list_total').html(oE.sum_total);
                    $('.pur_order_look_fkjl_pay_totals').html(oE.pay_totals);
                    //收票
                    var ticketList = '';
                    if(oE['ticket_data'].length == 0){
                        $('.pur_order_look_fksp_list_nodata_box').removeClass('none');
                        $('.pur_order_look_fksp_list').addClass('none');
                        $('.pur_order_look_fksp_list_table_total').addClass('none');
                    }else{
                        $('.pur_order_look_fksp_list_nodata_box').addClass('none');
                        $('.pur_order_look_fksp_list').removeClass('none');
                        $('.pur_order_look_fksp_list_table_total').removeClass('none');
                    }
                    $.each(oE['ticket_data'], function (i, v) {
                        ticketList += '<tr>\
                                    <td>'+l_dbl(i+1)+'</td>\
                                    <td>'+v['ticket_code_sn']+'</td>\
                                    <td>'+v['day']+'</td>\
                                    <td>'+v['owner']+'</td>\
                                    <td>'+v['choice_cuenta']+'</td>\
                                    <td>'+v['already_pay_money']+'</td>\
                                    <td>'+v['note']+'</td>\
                                    </tr>';
                    });
                    $('.pur_order_look_fksp_list').html(ticketList);
                    $('.pur_order_look_fksp_list_sum_ticket_total').html(oE.sum_ticket_total);
                    $('.pur_order_look_fksp_ticket_totals').html(oE.ticket_totals);
                }
            }
        });
    });

    //作废操作
    $('.pur_order_invalid_btn').die('click').live('click', function () {
        purOrderCurrentId = $(this).closest('tr').attr('purorderid');
        $.ajax({
            url: SERVER_URL + '/buy-order/setstatus',
            type: 'POST',
            data: {
                token: token,
                uid: uid,//用户id
                buy_order_id: purOrderCurrentId,// id
                status_flag: 1 //设置类型 enable 是启用 disable作废
            },
            dataType: 'json',
            success: function (oE) {
                // 将返回值转换为json对象
                //var oE = eval("(" + e + ")");
                if (oE.code == 0) {
                    alert('操作成功');
                    getBuyOrderList();
                }
            }
        })
    });

});
