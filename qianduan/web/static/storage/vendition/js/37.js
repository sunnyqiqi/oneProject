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
    uid = Admin.get_uid();

    /*var userinfo = eval('(' + $.cookie('userinfo') + ')');
    uname = userinfo['username'];*/
    var uname = '管理员';
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

    //自动生成编号函数
    function likGetCodeFn(arg){
        var needCode = '';
        $.ajax({
            url: SERVER_URL + '/admin/autoload',
            type: 'GET',
            data: {token: token, args: arg},
            async: false,
            success: function (e) {
                // 将返回值转换为json对象
                var oE = eval("(" + e + ")");
                if (oE.code == 0) {
                    needCode = oE['data'];
                }
            }
        });
        return needCode;
    }


    // 定义选择查看项
    var venSellOrderLookAbledField = [
        {'index': null, 'field': '创建日期'},
        {'index': null, 'field': '创建人'},
        {'index': null, 'field': '发货时间'},
        {'index': null, 'field': '商品总金额(元)'},
        {'index': null, 'field': '税额合计(元)'},
        {'index': null, 'field': '订单总金额(元)'},
        {'index': null, 'field': '已收金额(元)'},
        {'index': null, 'field': '已付票金额'}
    ];
    likShow('#ven_sell_order_table', venSellOrderLookAbledField, '#ven_sell_order_look_ul', '#ven_sell_order_look_save', '#ven_sell_order_look_reset');

    // 定义销售订单参数
    var sellOrderData = {
        token: token,
        page: 1, //页面
        num: 10, //每页条数
        list_type: '', //查询类型：空是所有，team团队订单 my我的订单copy抄送给我的
        key: '', //关键字
        is_old: '', //是否补录  0不是1是
        is_invalid: 0, //作废状态  0 正常  1 作废  空为不搜
        dept: '', // 负责部门
        owner: '' // 负责人
    };

    getSellOrderList();

    // 获取销售订单列表
    function getSellOrderList() {
        $.ajax({
            url: SERVER_URL + '/order/list',
            type: 'GET',
            data: sellOrderData,
            success: function (e) {
                // 将返回值转换为json对象
                var oE = eval("(" + e + ")");
                if (oE.code == 0) {
                    //获取datalist
                    var datalist = oE.datalist;
                    if (datalist.length == 0) {
                        $('.ven_sell_order_nodata_box').removeClass('none');
                        $('.ven_sell_order_handle').addClass('none');
                    } else {
                        $('.ven_sell_order_nodata_box').addClass('none');
                        $('.ven_sell_order_handle').removeClass('none');
                    }
                    //字符串拼接
                    var sellOrderHtml = '';
                    $.each(datalist, function (i, v) {
                        //作废状态
                        var invalidClass = '';
                        var sellOrderNum = '';
                        var sellOrderInvalidBtn = '';
                        if (v['is_invalid'] == 0) {
                            invalidClass = '';
                            sellOrderNum = l_dbl(i + 1);
                            sellOrderInvalidBtn = '<button class="but_mix but_void but_r ven_sell_order_invalid_btn">作废</button>';
                        } else if (v['is_invalid'] == 1) {
                            invalidClass = 'grey';
                            sellOrderNum = '<span class="voidIcon">作废</span>';
                            sellOrderInvalidBtn = '';
                        }
                        // 出库状态判断改变class
                        var outStatusClass = '';
                        if (v['out_status'] == 0) {
                            outStatusClass = 'c_r';
                        } else if (v['out_status'] == 1) {
                            outStatusClass = 'c_y';
                        } else if (v['out_status'] == 2) {
                            outStatusClass = 'c_g';
                        }
                        var outStatusBox = '';
                        outStatusBox += '<div class="cg_ghs_contMsgBox" style="width: 360px; display: none; position:fixed;"><i class="cg_ghs_torr"></i>';
                        $.each(v['out_stock_list'], function (i2, v2) {
                            var outStatusBoxChild = '';
                            $.each(v2['list'], function (i3, v3) {
                                outStatusBoxChild += '<li>库房：<span>' + v3['stock_name'] + '</span>   出库数量：<span>' + v3['out_stock_num'] + '块</span>  <span>' + v3['date'] + '</span>  出库人：<span>' + v3['owner'] + '</span></li>'
                            });
                            outStatusBox += '<div class="cg_ghs_contMsgBoxDet">\
                                                <h3 class="cont_title">' + v2['name'] + '</h3>\
                                                <ul>' + outStatusBoxChild + '</ul>\
                                                <p class="c_r">合计: <span>' + v2['sum'] + '</span>块</p>\
                                            </div>';
                        });
                        outStatusBox += '</div>';

                        //已付票金额
                        var tickListBox = '<div class="cg_ghs_contMsgBox" style="width: 300px; padding-top: 10px; display: none;position:fixed;"><i class="cg_ghs_torr"></i>';
                        var tickListBoxChild = '';
                        $.each(v['tick_list']['list'], function (i2, v2) {
                            tickListBoxChild += '<li>付票：<span>' + v2['ticket'] + '元</span><span style="margin:0 10px;">' + v2['date'] + '</span>操作人 <span>' + v2['owner'] + '</span></li>'
                        });
                        tickListBox += '<div class="cg_ghs_contMsgBoxDet">\
                                            <ul>' + tickListBoxChild + '</ul>\
                                            <p class="c_r" style="font-weight: bold;text-align: right;margin-right: 10px;">总计付票: <span > ' + v['tick_list']['sum'] + ' </span> 元 </p>\
                                        </div>'
                        tickListBox += '</div>';

                        sellOrderHtml += '<tr sellorderid="' + v['id'] + '" class="' + invalidClass + '">\
                            <td>' + sellOrderNum + '</td>\
                            <td>' + (v['code_sn']) + (v['is_old'] == 1 ? '<b class="c_r" style="font-weight:600;">(补)</b>' : '') + '</td>\
                            <td>' + (v['name']) + '</td>\
                            <td>' + (v['created_at'].split(' ')[0]) + '</td>\
                            <td>' + (v['uname']) + '</td>\
                            <td>' + (v['dept_name']) + '</td>\
                            <td>' + (v['owner_name']) + '</td>\
                            <td>' + (v['delivery_at']) + '</td>\
                            <td class="relative ' + outStatusClass + ' cg_ghs_contact" style="cursor: pointer;"><span style="font-weight:bold;">' + (v['out_status_name']) + '</span>' + outStatusBox +
                            '</td>\
                            <td>' + (v['totals_product']) + '</td>\
                            <td>' + (v['rate_sum']) + '</td>\
                            <td>' + (v['totals']) + '</td>\
                            <td>' + (v['is_pay']) + '</td>\
                            <td class="relative cg_ghs_contact" style="cursor: pointer;"><span class="f_color">' + (v['is_ticket']) + '</span>' + tickListBox + '</td>\
                            <td>' + (v['note']) + '</td>\
                            <td><button class="but_mix r_sidebar_btn but_look ven_sell_order_look" name="xs_xsdd_look">查看</button>' + sellOrderInvalidBtn + '</td>\
                        </tr>';
                    });
                    //销售订单数据渲染
                    $('#ven_sell_order_list').html(sellOrderHtml);
                }
                //分页
                list_table_render_pagination('.ven_sell_order_pagination', sellOrderData, getSellOrderList, oE.totalcount, datalist.length);
                $('#ven_sell_order_look_save').trigger('click');

            }
        });
        //搜索结果条数
        venSellOrderSearchNum();
        //高级搜索
        venSellOrderSearch();
    }

    // 全部销售订单
    $('#ven_sell_order_list_all').live('click', function () {
        sellOrderData.list_type = '';
        getSellOrderList();
    });

    // 团队销售订单
    $('#ven_sell_order_list_team').live('click', function () {
        sellOrderData.list_type = 'team';
        getSellOrderList();
    });

    // 我的销售订单
    $('#ven_sell_order_list_mine').live('click', function () {
        sellOrderData.list_type = 'my';
        getSellOrderList();
    });

    // 抄送我的销售订单
    $('#ven_sell_order_list_tome').live('click', function () {
        sellOrderData.list_type = 'copy';
        getSellOrderList();
    });

    //刷新列表
    $('#ven_sell_order_refresh').live('click', function () {
        sellOrderData = {
            token: token,
            page: 1, //页面
            num: 10, //每页条数
            list_type: '', //查询类型：空是所有，team团队订单 my我的订单copy抄送给我的
            key: '', //关键字
            dept: '', // 负责部门
            owner: '' // 负责人
        };
        $('#ven_sell_order_searKey').val('搜索客户名称').css('color', '#CCCCCC');
        $('#ven_sell_order_search_dept_inp').val('负责部门').css('color', '#CCCCCC');
        $('#ven_sell_order_search_owner_inp').val('负责人').css('color', '#CCCCCC');
        $('.ven_sell_order_search_num').val('10');
        sellOrderData.list_type = $('#ven_sell_order_tab_ul li.tabhover').attr('needurl');
        getSellOrderList();
    });

    //搜索关键字
    $('#ven_sell_order_searKey_btn').live('click', function () {
        if ($('#ven_sell_order_searKey').val() == '搜索客户名称') {
            alert('请输入搜索关键字');
            sellOrderData.key = '';
        } else {
            sellOrderData.key = $('#ven_sell_order_searKey').val();
        }
        sellOrderData.list_type = $('#ven_sell_order_tab_ul li.tabhover').attr('needurl');
        getSellOrderList();
    });
    //高级搜索 控制下拉框
    function venSellOrderSearch() {
        $.ajax({
            url: SERVER_URL + '/order/list',
            type: 'GET',
            data: {token: token, num: 500, list_type: $('#ven_sell_order_tab_ul li.tabhover').attr('needurl')},
            success: function (e) {
                // 将返回值转换为json对象
                var oE = eval("(" + e + ")");
                if (oE.code == 0) {
                    //获取datalist
                    var datalist = oE.datalist;
                    //定义高级搜索字段
                    //高级搜索 负责部门名字 字符串
                    var searchDeptName = '';
                    //高级搜索 负责人名字 字符串
                    var searchOwnerName = '';
                    //高级搜索 负责部门名字 数组
                    var searchDeptNameArr = [];
                    //高级搜索 负责人名字 数组
                    var searchOwnerNameArr = [];
                    //高级搜索遍历
                    $.each(datalist, function (i, v) {
                        searchDeptNameArr.push({
                            deptid: v['dept'],
                            deptname: v['dept_name']
                        });
                        searchOwnerNameArr.push({
                            ownerid: v['owner'],
                            ownername: v['owner_name']
                        });
                    });
                    //负责部门
                    searchDeptNameArr = getJsonArr(searchDeptNameArr);
                    $.each(searchDeptNameArr, function (i, v) {
                        searchDeptName += '<li deptid="' + v['deptid'] + '">' + v['deptname'] + '</li>'
                    });
                    $('#ven_sell_order_search_dept_ul').html(searchDeptName);
                    //负责人
                    searchOwnerNameArr = getJsonArr(searchOwnerNameArr);
                    $.each(searchOwnerNameArr, function (i, v) {
                        searchOwnerName += '<li ownerid="' + v['ownerid'] + '">' + v['ownername'] + '</li>'
                    });
                    $('#ven_sell_order_search_owner_ul').html(searchOwnerName);
                }
            }
        })
    }

    //搜索负责部门
    $('#ven_sell_order_search_dept_ul li').live('click', function () {
        sellOrderData.dept = $(this).attr('deptid');
        sellOrderData.list_type = $('#ven_sell_order_tab_ul li.tabhover').attr('needurl');
        getSellOrderList();
    });
    //搜索负责人
    $('#ven_sell_order_search_owner_ul li').live('click', function () {
        sellOrderData.owner = $(this).attr('ownerid');
        sellOrderData.list_type = $('#ven_sell_order_tab_ul li.tabhover').attr('needurl');
        getSellOrderList();
    });

    //高级搜索 控制搜索条数
    function venSellOrderSearchNum() {
        $.ajax({
            url: SERVER_URL + '/order/list',
            type: 'GET',
            data: {
                token: token,
                list_type: sellOrderData.list_type
            },
            success: function (e) {
                // 将返回值转换为json对象
                var oE = eval("(" + e + ")");
                if (oE.code == 0) {
                    //搜索总条数
                    $('#ven_sell_order_total').html(oE.totalcount);
                }
            }
        })
    }

    //定义当前操作销售订单ID
    var sellOrderCurrentId = null;
    //查看操作
    $('.ven_sell_order_look').die('click').live('click', function () {
        sellOrderCurrentId = $(this).closest('tr').attr('sellorderid');
        $.ajax({
            url: SERVER_URL + '/order/info',
            type: 'GET',
            data: {
                token: token,
                order_id: sellOrderCurrentId
            },
            success: function (e) {
                // 将返回值转换为json对象
                var oE = eval("(" + e + ")");
                if (oE.code == 0) {
                    var data = oE.data;
                    console.log(data);
                    //更多按钮显示隐藏
                    if (data['is_invalid'] == 1) {
                        $('.slider_head_More').css('display', 'none');
                    } else {
                        $('.slider_head_More').css('display', 'block');
                    }
                    //客户名称
                    $('.ven_sell_order_look_name').html(data['name']);
                    //创建日期 - 长
                    $('.ven_sell_order_look_create_at_long').html(data['created_at']);
                    //创建日期 - 短
                    $('.ven_sell_order_look_create_at_short').html(data['created_at'].split(' ')[0]);
                    //订单编号
                    $('.ven_sell_order_look_code_sn').html(data['code_sn']);
                    //制单人
                    $('.ven_sell_order_look_uname').html(data['uname']);
                    //负责部门
                    $('.ven_sell_order_look_dept_name').html(data['dept_name']);
                    //负责人
                    $('.ven_sell_order_look_owner_name').html(data['owner_name']);
                    //发货时间
                    $('.ven_sell_order_look_delivery_at').html(data['delivery_at']);
                    //出库状态
                    $('.ven_sell_order_look_out_status_name').html(data['out_status_name']);
                    //商品总金额
                    $('.ven_sell_order_look_totals_product').html(data['totals_product']);
                    //税额合计
                    $('.ven_sell_order_look_rate_sum').html(data['rate_sum']);
                    //订单总金额
                    $('.ven_sell_order_look_totals').html(data['totals']);
                    //已收金额
                    $('.ven_sell_order_look_is_pay').html(data['is_pay']);
                    //已付款金额
                    $('.ven_sell_order_look_is_ticket').html(data['is_ticket']);
                    //备注
                    $('.ven_sell_order_look_note').html(data['note']);
                    //获取当前关联报价单id
                    var sellOrderCurrentLinkQuoteId = data['quote_id'];
                    $('#ven_sell_order_look_quote_btn').die('click').live('click', function () {
                        $.ajax({
                            url: SERVER_URL + '/quote/detail',
                            type: 'GET',
                            data: {
                                token: token,
                                quote_id: sellOrderCurrentLinkQuoteId
                            },
                            success: function (e) {
                                // 将返回值转换为json对象
                                var oE = eval("(" + e + ")");
                                if (oE.code == 0) {
                                    var data = oE.data;
                                    console.log(data);
                                    //报价单编号
                                    $('#ven_sell_order_link_quote_code_sn').html(data['code_sn']);
                                    //销售订单
                                    $('#ven_sell_order_link_quote_order_code_sn').html(data['order_code_sn']);
                                    //借出单
                                    $('#ven_sell_order_link_quote_lend_code_sn').html(data['lend_code_sn']);
                                    //客户名称
                                    $('#ven_sell_order_link_quote_customer_name').html(data['customer_name']);
                                    //报价次数
                                    $('#ven_sell_order_link_quote_count').html(data['quote_count']);
                                    //审批状态
                                    var statusname = '';
                                    if(data['status'] == 1){
                                        statusname = '审批中';
                                    }else if(data['status'] == 2){
                                        statusname = '未通过';
                                    }else if(data['status'] == 3){
                                        statusname = '已通过';
                                    }
                                    $('#ven_sell_order_link_quote_status_name').html(statusname);
                                    //审批人
                                    $('#ven_sell_order_link_quote_current_name').html(data['current_name']);
                                    //销售商品
                                    $('#ven_sell_order_link_quote_product_name').html(data['goods_type']);
                                    //商品销售金额
                                    $('#ven_sell_order_link_quote_good_totals').html(data['good_totals']);
                                    //税率合计
                                    $('#ven_sell_order_link_quote_rate_sum').html(data['rate_sum']);
                                    //总金额
                                    $('#ven_sell_order_link_quote_totals').html(data['totals']);
                                    //创建时间
                                    $('#ven_sell_order_link_quote_create_at').html(data['created_at']);
                                    //创建人
                                    $('#ven_sell_order_link_quote_uname').html(data['uname']);
                                    //负责部门
                                    $('#ven_sell_order_link_quote_dept_name').html(data['dept_name']);
                                    //负责人
                                    $('#ven_sell_order_link_quote_owner_name').html(data['owner_name']);
                                } else {
                                }
                            }
                        });
                    });

                    //获取当前关联合同id
                    var sellOrderCurrentLinkContractId = data['contract_id'];
                    $('#ven_sell_order_look_contract_btn').die('click').live('click', function () {
                        $.ajax({
                            url: SERVER_URL + '/market-contract/info',
                            type: 'GET',
                            data: {
                                token: token,
                                id: sellOrderCurrentLinkContractId
                            },
                            success: function (e) {
                                // 将返回值转换为json对象
                                var oE = eval("(" + e + ")");
                                if (oE.code == 0) {
                                    var data = oE.data;
                                    console.log(data);
                                    //合同编号
                                    $('#ven_sell_order_link_contract_market_sn').html(data['market_sn']);
                                    //销售订单编号
                                    $('#ven_sell_order_link_contract_market_order_sn').html(data['market_order_sn']);
                                    //销售报价单编号
                                    $('#ven_sell_order_link_contract_market_quote_sn').html(data['market_quote_sn']);
                                    //合同名称
                                    $('#ven_sell_order_link_contract_name').html(data['name']);
                                    //客户名称
                                    $('#ven_sell_order_link_contract_customer_name').html(data['customer_name']);
                                    //审核状态
                                    $('#ven_sell_order_link_contract_statusname').html(data['statusname']);
                                    //审核人
                                    $('#ven_sell_order_link_contract_current_name').html(data['current_name']);
                                    //创建日期
                                    $('#ven_sell_order_link_contract_created_at').html(data['created_at']);
                                    //创建人
                                    $('#ven_sell_order_link_contract_uname').html(data['uname']);
                                    //负责部门
                                    $('#ven_sell_order_link_contract_dept_name').html(data['dept_name']);
                                    //负责人
                                    $('#ven_sell_order_link_contract_owner_name').html(data['owner_name']);
                                } else {
                                    alert('操作失败')
                                }
                            }
                        })
                    });

                    //关联售后单
                    $('#ven_sell_order_look_afterorder_btn').die('click').live('click', function () {
                        $.ajax({
                            url: SERVER_URL + '/order/afterorder',
                            type: 'GET',
                            data: {
                                token: token,
                                order_id: sellOrderCurrentId
                            },
                            success: function (e) {
                                // 将返回值转换为json对象
                                var oE = eval("(" + e + ")");
                                console.log(oE);
                                if (oE.code == 0) {
                                    var data = oE.data;
                                    //售后单编号
                                    $('#ven_sell_order_link_afterorder_code_sn').html(data['code_sn']);
                                    //销售订单编号
                                    $('#ven_sell_order_link_afterorder_order_code_sn').html(data['order_code_sn']);
                                    //客户
                                    $('#ven_sell_order_link_afterorder_customer_name').html(data['customer_name']);
                                    //售后商品
                                    $('#ven_sell_order_link_afterorder_afterorder_goods_name').html(data['afterorder_goods_name']);
                                    //负责人
                                    $('#ven_sell_order_link_afterorder_owner_name').html(data['owner_name']);
                                    //售后时间
                                    $('#ven_sell_order_link_afterorder_service_at').html(data['service_at']);
                                    //售后类型
                                    var servicetypeName = '';
                                    if(data['service_type'] == 0){
                                        servicetypeName = '外出售后'
                                    }else if(data['service_type'] == 1){
                                        servicetypeName = '电话售后'
                                    }else if(data['service_type'] == 2){
                                        servicetypeName = '网络售后'
                                    }
                                    $('#ven_sell_order_link_afterorder_servicetype').html(servicetypeName);
                                    //创建人
                                    $('#ven_sell_order_link_afterorder_uname').html(data['uname']);
                                    //创建时间
                                    $('#ven_sell_order_link_afterorder_created_at').html(data['created_at']);
                                    //状态
                                    var statusname = '';
                                    if(data['status'] == 0){
                                        statusname = '待接受';
                                    }else if(data['status'] == 1){
                                        statusname = '已接受';
                                    }else if(data['status'] == 2){
                                        statusname = '完成';
                                    }else if(data['status'] == 3){
                                        statusname = '终止';
                                    }
                                    $('#ven_sell_order_link_afterorder_statusname').html(statusname);
                                    //备注
                                    $('#ven_sell_order_link_afterorder_note').html(data['note']);
                                } else {
                                    alert('操作失败')
                                }
                            }
                        })
                    });

                    //关联退换货
                    $('#ven_sell_order_look_returngoods_btn').die('click').live('click', function () {
                        $.ajax({
                            url: SERVER_URL + '/order/returngoods',
                            type: 'GET',
                            data: {
                                token: token,
                                order_id: sellOrderCurrentId
                            },
                            success: function (e) {
                                // 将返回值转换为json对象
                                var oE = eval("(" + e + ")");
                                if (oE.code == 0) {
                                    var data = oE.data;
                                    console.log(data);
                                    //退换货编号
                                    $('#ven_sell_order_link_reproduct_code_sn').html(data['code_sn']);
                                    //销售订单编号
                                    $('#ven_sell_order_link_reproduct_order_code_sn').html(data['order_code_sn']);
                                    //客户
                                    $('#ven_sell_order_link_reproduct_customer_name').html(data['customer_name']);
                                    //退换商品类型
                                    $('#ven_sell_order_link_reproduct_afterorder_goods_name').html(data['afterorder_goods_name']);
                                    //退换货类型
                                    var thetypename = '';
                                    if(data['thetype'] == 1){
                                        thetypename = '换货';
                                    }else if(data['thetype'] == 2){
                                        thetypename = '退货';
                                    }
                                    $('#ven_sell_order_link_reproduct_thetypename').html(thetypename);
                                    //退款总金额(元)
                                    $('#ven_sell_order_link_reproduct_totals').html(data['totals']);
                                    //退换货日期
                                    $('#ven_sell_order_link_reproduct_service_at').html(data['service_at']);
                                    //预计退款日期
                                    $('#ven_sell_order_link_reproduct_returnmoney_at').html(data['returnmoney_at']);
                                    //审批状态
                                    var statusname = '';
                                    if(data['status'] == 1){
                                        statusname = '审批中'
                                    }else if(data['status'] == 2){
                                        statusname = '未完成'
                                    }else if(data['status'] == 3){
                                        statusname = '已完成'
                                    }
                                    $('#ven_sell_order_link_reproduct_statusname').html(statusname);
                                    //审批人
                                    $('#ven_sell_order_link_reproduct_approval_name').html(data['approval_name']);
                                    //负责人
                                    $('#ven_sell_order_link_reproduct_owner_name').html(data['owner_name']);
                                    //创建时间
                                    $('#ven_sell_order_link_reproduct_created_at').html(data['created_at']);
                                    //创建人
                                    $('#ven_sell_order_link_reproduct_uname').html(data['uname']);
                                    //入库状态
                                    var instatusname = '';
                                    if(data['in_status'] == 0){
                                        instatusname = '未入库';
                                    }else if(data['in_status'] == 1){
                                        instatusname = '已入库';
                                    }
                                    $('#ven_sell_order_link_reproduct_instatusname').html(instatusname);
                                    //出库状态
                                    var outstatusname = '';
                                    if(data['out_status'] == 0){
                                        outstatusname = '未入库';
                                    }else if(data['out_status'] == 1){
                                        outstatusname = '已入库';
                                    }
                                    $('#ven_sell_order_link_reproduct_outstatusname').html(outstatusname);
                                    //备注
                                    $('#ven_sell_order_link_reproduct_note').html(data['note']);
                                } else {
                                    alert('操作失败')
                                }
                            }
                        })
                    });
                } else {
                    alert('操作失败')
                }
            }
        });
        $('.Sideslip_list ul li:first-of-type').trigger('click');
        $('.slider_head_list').css('display', 'none');
    });

    //作废操作
    $('.ven_sell_order_invalid_btn').live('click', function () {
        sellOrderCurrentId = $(this).closest('tr').attr('sellorderid');
        $.ajax({
            url: SERVER_URL + '/order/setstatus',
            type: 'POST',
            data: {
                token: token,
                order_id: sellOrderCurrentId,
                status_flag: 1
            },
            success: function (e) {
                // 将返回值转换为json对象
                var oE = eval("(" + e + ")");
                if (oE.code == 0) {
                    sellOrderData.list_type = $('#ven_sell_order_tab_ul li.tabhover').attr('needurl');
                    getSellOrderList();
                } else {
                    alert('操作失败')
                }
            }
        });
    });

    //查看中作废操作
    $('.ven_sell_order_look_invalid_btn').live('click', function () {
        $.ajax({
            url: SERVER_URL + '/order/setstatus',
            type: 'POST',
            data: {
                token: token,
                order_id: sellOrderCurrentId,
                status_flag: 1
            },
            success: function (e) {
                // 将返回值转换为json对象
                var oE = eval("(" + e + ")");
                if (oE.code == 0) {
                    $('.right_sidebar').css('display', 'none');
                    sellOrderData.list_type = $('#ven_sell_order_tab_ul li.tabhover').attr('needurl');
                    getSellOrderList();
                } else {
                    alert('操作失败')
                }
            }
        });
    })


    //不显示作废状态
    $('#ven_sell_order_noShow').live('click', function () {
        if ($(this).is(':checked')) {
            sellOrderData.is_invalid = 0;
            sellOrderData.list_type = $('#ven_sell_order_tab_ul li.tabhover').attr('needurl');
            getSellOrderList();
        } else {
            sellOrderData.is_invalid = '';
            sellOrderData.list_type = $('#ven_sell_order_tab_ul li.tabhover').attr('needurl');
            getSellOrderList();
        }
    });
    //新建销售订单

    //定义新建参数
    var sellOrderCreateData = {
        token: token,
        order_id: 0,// 订单id，有值为修改
        code_sn: "",// 编号
        quote_id: 0, //报价单id
        customer_id: '', //客户id
        contract_id: 0, //合同id
        transport_type: 0, //运输方式, 0快递1陆运2空运3平邮4海运
        delivery_at: 0, //发货时间
        dept: '', //负责部门
        owner: '', //负责人id
        note: "", //备注
        copy_list: [], //4, 21, 22’  抄送名单
        is_old: 1//是否旧数据追加0不是1是
    };

    //定义新建补录订单
    var sellOrderCreateOldData = {
        token: token,
        order_id: 0,// 订单id，有值为修改
        code_sn: "",// 编号
        quote_id: '', //报价单id
        customer_id: '', //客户id
        dept: '', //负责部门
        owner: '', //负责人id
        note: "", //备注
        copy_list: [], //4, 21, 22’  抄送名单
        order_create_time: '', //订单生成时间
        order_totals: '', //订单总金额
        is_old: 0//是否旧数据追加0不是1是
    };

    //新建销售订单
    $('#ven_sell_order_create_btn').live('click', function () {
        sellOrderCreateData = {
            token: token,
            order_id: 0,// 订单id，有值为修改
            code_sn: "",// 编号
            quote_id: '', //报价单id
            customer_id: '', //客户id
            contract_id: '', //合同id
            transport_type: 0, //运输方式, 0快递1陆运2空运3平邮4海运
            delivery_at: '', //发货时间
            dept: '', //负责部门
            owner: '', //负责人id
            note: "", //备注
            copy_list: [], //4, 21, 22’  抄送名单
            is_old: 0//是否旧数据追加0不是1是
        };
        sellOrderCreateOldData = {
            token: token,
            order_id: 0,// 订单id，有值为修改
            code_sn: "",// 编号
            quote_id: 0, //报价单id
            customer_id: '', //客户id
            contract_id: 0, //合同id
            transport_type: 0, //运输方式, 0快递1陆运2空运3平邮4海运
            delivery_at: 0, //发货时间
            dept: '', //负责部门
            owner: '', //负责人id
            note: "", //备注
            copy_list: [], //4, 21, 22’  抄送名单
            is_old: 1//是否旧数据追加0不是1是
        };
    });
    $('.tanceng .ven_sell_order_create_btn_2').live('click', function () {
        $('.tanceng .ven_sell_order_create_uname').html(uname);
        $('.tanceng .ven_sell_order_create_code_sn_inp').val(likGetCodeFn('XSD'));
    });

    $('.tanceng .ven_sell_order_create_choose_quote_btn').live('click', function () {
        getSellQuoteList();
    });

    //新建订单 - 选择报价单
    var sellQuoteData = {
        token: token,
        page: 1, //页面
        num: 10, //每页条数
        key: '' //关键字
    };
    //新建订单 - 选择报价单 - 搜索
    $('.tanceng .ven_sell_order_create_choose_quote_search_btn').live('click', function () {
        if ($('.tanceng .ven_sell_order_create_choose_quote_search_inp').val() == '搜索报价单客户名称') {
            alert('请输入搜索报价单客户名称');
            sellQuoteData.key = '';
            getSellQuoteList();
            return false;
        } else {
            sellQuoteData.key = $('.tanceng .ven_sell_order_create_choose_quote_search_inp').val();
            getSellQuoteList();
        }
    });

    //新建订单 - 选择报价单 - 确定
    $('.tanceng .ven_sell_order_create_choose_quote_save').live('click', function () {
        var chosenQuote = $('.tanceng .ven_sell_order_create_choose_quote_table input:checked').closest('tr');
        sellOrderCreateData.quote_id = chosenQuote.attr('vensellquoteid');
        sellOrderCreateOldData.quote_id = chosenQuote.attr('vensellquoteid');
        sellOrderCreateData.customer_id = chosenQuote.attr('vensellquotecustomid');
        sellOrderCreateData.dept = chosenQuote.attr('vensellquotedept');
        sellOrderCreateData.owner = chosenQuote.attr('vensellquoteowner');
        $('.tanceng .ven_sell_order_link_quote_code_inp').val(chosenQuote.find('td').eq(1).html());
        $('.tanceng .ven_sell_order_create_custom_name').val(chosenQuote.find('td').eq(2).html());
        $('.tanceng .ven_sell_order_create_dept').val(chosenQuote.find('td').eq(7).html());
        $('.tanceng .ven_sell_order_create_owner').val(chosenQuote.find('td').eq(8).html());
        $(this).closest('.dialog_box').remove();
    });

    function getSellQuoteList() {
        $.ajax({
            url: SERVER_URL + '/quote/mylist',
            type: 'GET',
            data: sellQuoteData,
            success: function (e) {
                // 将返回值转换为json对象
                var oE = eval("(" + e + ")");
                if (oE.code == 0) {
                    //获取datalist
                    var datalist = oE.datalist;
                    if (datalist.length == 0) {
                        $('.tanceng .ven_sell_order_create_choose_sell_quote_nodata_box').removeClass('none');
                        $('.tanceng .ven_sell_order_create_choose_sell_quote_handle').addClass('none');
                    } else {
                        $('.tanceng .ven_sell_order_create_choose_sell_quote_nodata_box').addClass('none');
                        $('.tanceng .ven_sell_order_create_choose_sell_quote_handle').removeClass('none');
                    }
                    //字符串拼接
                    var sellQuoteHtml = '';
                    $.each(datalist, function (i, v) {
                        // 审批状态判断
                        //status:    '1' '审批中','2' '未通过', '3'  '已通过',
                        var sellQuoteBtn = '';
                        var sellQuoteStatusClass = '';

                        sellQuoteHtml += '<tr vensellquoteid="' + v['id'] + '" vensellquotecustomid="' + v['customer_id'] + '" vensellquotedept="' + v['dept'] + '" vensellquoteowner="' + v['owner'] + '">\
                            <td><input type="radio" name="xs_xsdd_xzxsbjdinp"></td>\
                            <td>' + (v['code_sn']) + '</td>\
                            <td>' + (v['customer_name']) + '</td>\
                            <td>缺</td>\
                            <td>' + (v['product_name']) + '</td>\
                            <td>' + (v['uname']) + '</td>\
                            <td>' + (v['created_at'].split(' ')[0]) + '</td>\
                            <td>' + (v['dept_name']) + '</td>\
                            <td>' + (v['owner_name']) + '</td>\
                        </tr>';
                    });
                    //销售报价单数据渲染
                    $('.tanceng .ven_sell_order_create_choose_quote_table').html(sellQuoteHtml);
                }
                //分页
                list_table_render_pagination('.tanceng .ven_sell_order_create_choose_sell_quote_pagination', sellQuoteData, getSellQuoteList, oE.totalcount, datalist.length);
            }
        });
        //搜索结果条数
        venSellQuoteSearchNum();
    }

    function venSellQuoteSearchNum() {
        $.ajax({
            url: SERVER_URL + '/quote/mylist',
            type: 'GET',
            data: {
                token: token
            },
            success: function (e) {
                // 将返回值转换为json对象
                var oE = eval("(" + e + ")");
                if (oE.code == 0) {
                    //搜索总条数
                    $('.tanceng .ven_sell_order_create_choose_sell_quote_total').html(oE.totalcount);
                }
            }
        })
    }

    //新建销售订单 - 选择销售合同
    //定义选择销售合同参数
    var getContractData = {
        token: token,
        thetype: 1,
        page: 1,
        num: 10,
        keywords: ''
    };
    $('.tanceng .ven_sell_order_create_choose_contract').live('click', function () {
        getContractFn()
    });
    //搜索销售合同
    $('.tanceng .ven_sell_order_create_choose_contract_search_btn').live('click', function () {
        if ($('.tanceng .ven_sell_order_create_choose_contract_search_inp').val() == '请输入关键字') {
            alert('请输入搜索关键字');
            getContractData.keywords = '';
            getContractFn();
            return false;
        } else {
            getContractData.keywords = $('.tanceng .ven_sell_order_create_choose_contract_search_inp').val();
            getContractFn();
        }
    });
    //选择销售合同 - 确定
    $('.tanceng .ven_sell_order_create_choose_contract_save').live('click', function () {
        var chosenContract = $('.tanceng .ven_sell_order_create_choose_contract_list input:checked').closest('tr');
        sellOrderCreateData.contract_id = chosenContract.attr('contractid');
        sellOrderCreateData.quote_id = chosenContract.attr('vensellquoteid');
        sellOrderCreateOldData.quote_id = chosenContract.attr('vensellquoteid');
        sellOrderCreateData.customer_id = chosenContract.attr('vensellquotecustomid');
        sellOrderCreateData.dept = chosenContract.attr('vensellquotedept');
        sellOrderCreateData.owner = chosenContract.attr('vensellquoteowner');
        $('.tanceng .ven_sell_order_create_choose_contract_inp').val(chosenContract.find('td').eq(2).html());
        $('.tanceng .ven_sell_order_link_quote_code_inp').val(chosenContract.attr('vensellquotecode'));
        $('.tanceng .ven_sell_order_create_custom_name').val(chosenContract.find('td').eq(3).html());
        $('.tanceng .ven_sell_order_create_dept').val(chosenContract.find('td').eq(6).html());
        $('.tanceng .ven_sell_order_create_owner').val(chosenContract.find('td').eq(7).html());
        $(this).closest('.dialog_box').remove();
    });
    function getContractFn() {
        $.ajax({
            url: SERVER_URL + '/market-contract/list',
            type: 'GET',
            data: getContractData,
            success: function (e) {
                // 将返回值转换为json对象
                var oE = eval("(" + e + ")");
                if (oE.code == 0) {
                    var datalist = oE.datalist;
                    console.log(datalist);
                    if (datalist.length == 0) {
                        $('.tanceng .ven_sell_order_create_choose_contract_nodata_box').removeClass('none');
                        $('.tanceng .ven_sell_order_create_choose_contract_handle').addClass('none');
                    } else {
                        $('.tanceng .ven_sell_order_create_choose_contract_nodata_box').addClass('none');
                        $('.tanceng .ven_sell_order_create_choose_contract_handle').removeClass('none');
                    }
                    var html = '';
                    $.each(datalist, function (i, v) {
                        html += '<tr contractid="' + v['id'] + '" vensellquoteid="' + v['quote_id'] + '" vensellquotecode="' + v['market_quote_sn'] + '" vensellquotecustomid="' + v['customer_id'] + '" vensellquotedept="' + v['dept_id'] + '" vensellquoteowner="' + v['owner_id'] + '">\
                                    <td><input type="radio" name="xs_xsdd_xzxsthinp"></td>\
                                    <td>' + v['market_sn'] + '</td>\
                                    <td>' + v['name'] + '</td>\
                                    <td>' + v['customer_name'] + '</td>\
                                    <td>' + v['created_at'].split(' ')[0] + '</td>\
                                    <td>' + v['uname'] + '</td>\
                                    <td>' + v['dept_name'] + '</td>\
                                    <td>' + v['owner_name'] + '</td>\
                                </tr>'
                    });
                    $('.tanceng .ven_sell_order_create_choose_contract_list').html(html); //分页
                    list_table_render_pagination('.tanceng .ven_sell_order_create_choose_contract_pagination', getContractData, getContractFn, oE.totalcount, datalist.length);
                } else {
                    alert('操作失败')
                }
            }
        });
        getContractSearchNum()
    }

    function getContractSearchNum() {
        $.ajax({
            url: SERVER_URL + '/market-contract/list',
            type: 'GET',
            data: {
                token: token,
                thetype: 1,
                keywords: getContractData.keywords
            },
            success: function (e) {
                // 将返回值转换为json对象
                var oE = eval("(" + e + ")");
                if (oE.code == 0) {
                    //搜索总条数
                    $('.tanceng .ven_sell_order_create_choose_contract_total').html(oE.totalcount);
                }
            }
        })
    }

    //新建销售订单 - 选择物流方式
    $('.tanceng .ven_sell_order_create_choose_transport_ul li').live('click', function () {
        sellOrderCreateData.transport_type = $(this).index();
    });

    //新建销售订单 - 选择抄送人
    $('.tanceng .ven_sell_order_create_choose_copy_btn').live('click', function () {
        venSellOrderChooseCopy()
    });

    //选择抄送人
    function venSellOrderChooseCopy() {
        $.ajax({
            type: "get",
            url: SERVER_URL + "/dept/deptlist",
            data: {token: token},
            success: function (e) {
                var oE = eval('(' + e + ')');
                if (oE.code == 0) {
                    var deep = 0;
                    $('.tanceng .ven_sell_contract_create_choose_copy_list').html(tree_list_choose_dept_person(oE.rows, deep));
                    // 所有分类图标样式控制
                    if ($('i.ven_sell_contract_create_choose_copy_list').children().length == 0) {
                        $('li.left_all span.icon_open').addClass('personOth')
                    }
                    // 下级部门样式控制
                    for (var i = 0, liLeft1 = $('.tanceng .ven_sell_contract_create_choose_copy_list li.left_1').length; i < liLeft1; i++) {
                        if ($('.tanceng .ven_sell_contract_create_choose_copy_list li.left_1').eq(i).next('ul').length == 0) {
                            $('.tanceng .ven_sell_contract_create_choose_copy_list li.left_1').eq(i).find('span.icon_open').addClass('personOth');
                            $('.tanceng .ven_sell_contract_create_choose_copy_list li.left_1').eq(i).find('span.personOth').closest('li').addClass('deptChild')
                        }
                    }
                    //选择人员左侧选择
                    $('.tanceng .ven_sell_contract_create_choose_copy_list ul .li_person').die('click').live('click', function () {
                        if ($(this).find('em').hasClass('on')) {
                            $('.tanceng .ven_sell_contract_create_copy_chosen_list').find('li[userinfoid=' + $(this).attr('userinfoid') + ']').remove()
                            $(this).find('span.list_check em').removeClass('on')
                        } else {
                            $('.tanceng .ven_sell_contract_create_copy_chosen_list').append('<li userinfoid="' + $(this).attr('userinfoid') + '"><span>' + $(this).children('.list_msg').html() + '</span><i class="list_choose_delete"></i></li>');
                            $(this).find('span.list_check em').addClass('on')
                        }
                    });
                    //选择人员右侧删除
                    $('i.list_choose_delete').live('click', function () {
                        $(this).closest('li').remove();
                        $('.tanceng .ven_sell_contract_create_choose_copy_list ul .li_person[userinfoid = "' + $(this).closest('li').attr('userinfoid') + '"]').find('em').removeClass('on');
                    });
                    //选择人员保存
                    $('.tanceng .ven_sell_contract_choose_copy_save').die('click').live('click', function () {
                        sellOrderCreateData.copy_list = [];  // 声明对象要区分开
                        var copyChosen = '';
                        if ((typeof sellOrderCreateData.copy_list) == 'string') {
                            sellOrderCreateData.copy_list = sellOrderCreateOldData.copy_list.split(',');
                        }
                        $.each($('.tanceng .ven_sell_contract_create_copy_chosen_list li'), function (i, v) {
                            copyChosen += '<li class="ven_sell_order_copy_list_li" style="float:left;margin-right:23px;position:relative;" userinfoid="' + $('.tanceng .ven_sell_contract_create_copy_chosen_list').find('li').eq(i).attr('userinfoid') + '">\
                                <i class="del_img_1">-</i><em class="icon_personBtn icon_personBtn_msg"><i class="icon_personNext"></i></em>\
                                <em class="icon_adderBtn"></em>\
                                <p class="box_adderName">' + $('.tanceng .ven_sell_contract_create_copy_chosen_list').find('li').eq(i).text() + '</p>\
                                </li>';
                            sellOrderCreateData.copy_list.push($('.tanceng .ven_sell_contract_create_copy_chosen_list').find('li').eq(i).attr('userinfoid'));
                        });
                        $('.tanceng .ven_sell_contract_create_add_copy_list').html(copyChosen);
                        $(this).closest('.dialog_box').remove()
                    })
                }
            },
            error: function (data) {

            }
        });
    }

    //生成销售订单
    $('.tanceng .ven_sell_order_create_submit').die('click').live('click', function () {
        if ($('.tanceng .ven_sell_order_link_quote_code_inp').val() == '销售报价单编号') {
            alert("请选择销售报价单");
            return false;
        } else if ($('.tanceng .ven_sell_order_create_choose_contract_inp').val() == '选择销售合同') {
            alert('请选择销售合同');
            return false;
        } else if ($('.tanceng .ven_sell_order_create_delivery_at_inp').val() == '请选择日期') {
            alert('请选择发货时间');
            return false;
        }
        //备注
        if ($('.tanceng .ven_sell_order_create_note_text').val() == '请输入备注') {
            sellOrderCreateData.note = ''
        } else {
            sellOrderCreateData.note = $('.tanceng .ven_sell_order_create_note_text').val();
        }
        //订单编号
        sellOrderCreateData.code_sn = $('.tanceng .ven_sell_order_create_code_sn_inp').val();
        //发货时间
        sellOrderCreateData.delivery_at = $('.tanceng .ven_sell_order_create_delivery_at_inp').val();
        //抄送人
        if ((typeof sellOrderCreateData.copy_list) == 'string') {
            sellOrderCreateData.copy_list = sellOrderCreateData.copy_list.split(',')
        }
        sellOrderCreateData.copy_list = [];
        $.each($('.tanceng .ven_sell_order_copy_list_ul li.ven_sell_order_copy_list_li'), function (i, v) {
            sellOrderCreateData.copy_list.push($('.tanceng .ven_sell_order_copy_list_ul li.ven_sell_order_copy_list_li').eq(i).attr('userinfoid'));
        });
        sellOrderCreateData.copy_list = sellOrderCreateData.copy_list.join(',');
        //是否旧数据追加
        sellOrderCreateData.is_old = 0;
        console.log(sellOrderCreateData);
        $('.tanceng .ven_sell_order_create_success_dialog').css('display', 'none');
        $.ajax({
            url: SERVER_URL + '/order/add',
            type: 'POST',
            data: sellOrderCreateData,
            success: function (e) {
                // 将返回值转换为json对象
                var oE = eval("(" + e + ")");
                if (oE.code == 0) {
                    $('.tanceng .dialog_box').not('[name="xs_xsdd_scxsd"]').remove();
                    getSellOrderList();
                    $('.tanceng .ven_sell_order_create_submit').attr('name', 'xs_xsdd_scxsd');
                    $('.tanceng').append($('.dialog_box[name="xs_xsdd_scxsd"]').css('display', 'block'));
                    $('.tanceng .ven_sell_order_create_success_code').html(sellOrderCreateData.code_sn)
                } else {
                    alert('操作失败')
                }
            }
        });
    });
    $('.tanceng .ven_sell_order_scxsd_submit').live('click', function () {
        $(this).closest('.dialog_box').remove();
        $('.tanceng').css('display', 'none');
    });
    /*$('.tanceng .ven_sell_order_scxsd_submit').die('click').live('click', function () {
     $(this).closest('.dialog_box').remove();
     $('.tanceng .ven_sell_order_create_submit').closest('.dialog_box').remove();
     $('.tanceng').css('display', 'none');
     });*/

    //选择客户
    $('.tanceng .ven_sell_order_create_old_choose_customer').live('click', function () {
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
                $('.l_cus_sort').html(tree_list(datalist));
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
                $('.l_cus_sort_dialog').html(tree_list_dialog(datalist, deep));
                // 所有分类图标样式控制
                if ($('i.l_cus_sort').children().length == 0) {
                    $('ul.l_hr_left_1').addClass('oth');
                    $('li.hr_left_all span').addClass('oth')
                }
                // 下级分类图标样式控制
                for (var i = 0; i < $('i.l_cus_sort li').length; i++) {
                    if ($('i.l_cus_sort li').eq(i).next('ul').children().length == 0) {
                        $('i.l_cus_sort li').eq(i).find('span').addClass('oth');
                        $('i.l_cus_sort li').eq(i).parent('ul').addClass('oth')
                    }
                }
                $('span.oth .list_num_null').remove()
                // 模态框样式控制
                // 所有分类图标样式控制
                if ($('i.l_cus_sort_dialog').children().length == 0) {
                    $('ul.ul1').addClass('oth');
                    $('li.left_all span').addClass('oth')
                }
                // 下级分类图标样式控制
                for (var i = 0; i < $('i.l_cus_sort_dialog li').length; i++) {
                    if ($('i.l_cus_sort_dialog li').eq(i).next('ul').children().length == 0) {
                        $('i.l_cus_sort_dialog li').eq(i).find('span').addClass('oth');
                        $('i.l_cus_sort_dialog li').eq(i).find('span.icon_open').addClass('other');
                        $('i.l_cus_sort_dialog li').eq(i).parent('ul').addClass('oth')
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
                        $('.tanceng .ven_custom_nodata_box').removeClass('none')
                        $('.tanceng .ven_custom_handle').addClass('none')
                    } else {
                        $('.tanceng .ven_custom_nodata_box').addClass('none')
                        $('.tanceng .ven_custom_handle').removeClass('none')
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
                        oCuslist += '<tr vensellorderdept="' + cuslist[i].category_id + '" vensellorderowner="' + cuslist[i].owner + '" class="' + cusSta + '" cusId="' + cuslist[i].id + '"><td><input type="radio" name="222"></td><td>' + l_dbl(i + 1) + '</td><td>' + cuslist[i].code_sn + '</td><td>' + cuslist[i].name + '</td><td>' + cuslist[i].tel + '</td><td><div class="text_line" style="width: 9em;"><span class="ellipsis">' + cuslist[i].address + '</span></div></td><td>' + cuslist[i].industry_big_name + '</td><td>' + cuslist[i].grade_name + '</td><td class="f_color ' + cusContactClass + '">' + con1 + '<div class="vent_client_contMsgBox" style="display: none;z-index:99;"><i class="vent_client_torr"></i>' + con2 + '</div></td><td>' + cuslist[i].category_name + '</td><td>' + cuslist[i].owner_name + '</td><td>' + cuslist[i].note + '</td></tr>'
                    }
                    $('.tanceng .ven_sell_order_cus_list').html(oCuslist);
                    list_table_render_pagination('.tanceng .page_ven31_cuslist', getCusListData, getCusList, e.totalcount, cuslist.length)
                }
            }
        });
        xs_kh_gjss_num()
    }

    //选择分类获取客户
    $('.tanceng .ven_sell_order_create_choose_customer_sort li').live('click', function () {
        getCusListData.category_id = $(this).attr('cussortid');
        getCusList();
    });
    // 搜索关键字
    $('.tanceng .ven_sell_order_choose_customer_search_btn').live('click', function () {
        if ($('.tanceng .ven_sell_order_choose_customer_search_inp').val() == '搜索客户编号/客户名称') {
            getCusListData.key = ''
        } else {
            getCusListData.key = $('.tanceng .ven_sell_order_choose_customer_search_inp').val()
        }
        getCusList()
    });
    //搜索行业
    $('.tanceng .ven_sell_order_create_choose_customer_industry_list li').live('click', function () {
        getCusListData.industry_big_id = $(this).attr('industryid');
        getCusList()
    });
    //搜索客户级别
    $('.tanceng .ven_sell_order_create_choose_customer_grade_list li').live('click', function () {
        getCusListData.grade = $(this).index();
        getCusList()
    });
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
                    $('.tanceng .ven_sell_order_create_choose_customer_industry_list').html(xs_kh_hy)
                }
            }
        })
    }

    //选择客户
    $('.tanceng .ven_sell_order_create_choose_customer_save').live('click', function () {
        var sellChanceCusChosen = null;
        var chosenCustom = $('.tanceng .ven_sell_order_cus_list input:checked').closest('tr');
        sellOrderCreateOldData.dept = chosenCustom.attr('vensellorderdept');
        sellOrderCreateOldData.owner = chosenCustom.attr('vensellorderowner');
        $.each($('.tanceng .ven_sell_order_cus_list tr'), function (i, v) {
            if ($('.tanceng .ven_sell_order_cus_list tr').eq(i).find('input:radio').attr('checked') == 'checked') {
                sellChanceCusChosen = {
                    'title': $('.tanceng .ven_sell_order_cus_list tr').eq(i).attr('cusid'),
                    'val': $('.tanceng .ven_sell_order_cus_list tr').eq(i).find('td').eq(3).text(),
                    'dept': $('.tanceng .ven_sell_order_cus_list tr').eq(i).find('td').eq(9).text(),
                    'owner': $('.tanceng .ven_sell_order_cus_list tr').eq(i).find('td').eq(10).text()
                }
            }
        });
        //编辑销售订单用
        sellOrderCreateOldData.customer_id = sellChanceCusChosen['title'];
        $('.tanceng .ven_sell_order_create_choose_customer_inp').val(sellChanceCusChosen['val']);
        $('.tanceng .ven_sell_order_create_choose_dept_inp').val(sellChanceCusChosen['dept']);
        $('.tanceng .ven_sell_order_create_choose_owner_inp').val(sellChanceCusChosen['owner']);
        $(this).closest('.dialog_box').remove();
    });

    //新建 - 补录订单 - 提交
    $('.tanceng .ven_sell_order_create_old_submit').live('click', function () {
        if ($('.tanceng .ven_sell_order_create_choose_customer_inp').val() == '请选择客户') {
            alert('请选择客户');
            return false;
        }
        if ($('.tanceng .ven_sell_order_create_old_date_inp').val() == '请选择日期') {
            alert('请选择日期');
            return false;
        }
        if ($('.tanceng .ven_sell_order_create_old_total_inp').val() == '请输入金额') {
            alert('请输入金额');
            return false;
        }
        //备注
        if ($('.tanceng .ven_sell_order_create_old_note_text').val() == '请输入备注') {
            sellOrderCreateOldData.note = ''
        } else {
            sellOrderCreateOldData.note = $('.tanceng .ven_sell_order_create_old_note_text').val();
        }
        //抄送人
        //新建 - 补录
        if ((typeof sellOrderCreateOldData.copy_list) == 'string') {
            sellOrderCreateOldData.copy_list = sellOrderCreateOldData.copy_list.split(',');
        }
        sellOrderCreateOldData.copy_list = [];
        $.each($('.tanceng .ven_sell_contract_create_add_copy_list li.ven_sell_order_copy_list_li'), function (i, v) {
            sellOrderCreateOldData.copy_list.push($('.tanceng .ven_sell_contract_create_add_copy_list li.ven_sell_order_copy_list_li').eq(i).attr('userinfoid'));
        });
        sellOrderCreateOldData.copy_list = sellOrderCreateOldData.copy_list.join(',');
        sellOrderCreateOldData.code_sn = $('.tanceng .ven_sell_order_create_code_sn_inp').val();
        //订单生成时间
        sellOrderCreateOldData.order_create_time = $('.tanceng .ven_sell_order_create_old_date_inp').val();
        //订单总金额
        sellOrderCreateOldData.order_totals = $('.tanceng .ven_sell_order_create_old_total_inp').val();
        console.log(sellOrderCreateOldData);
        $.ajax({
            url: SERVER_URL + '/order/add',
            type: 'POST',
            data: sellOrderCreateOldData,
            success: function (e) {
                // 将返回值转换为json对象
                var oE = eval("(" + e + ")");
                console.log(oE);
                if (oE.code == 0) {
                    $('.tanceng .dialog_box').remove();
                    $('.tanceng').css('display', 'none');
                    getSellOrderList();
                } else {
                    alert('操作失败')
                }
            }
        })
    });

    //删除操作
    /*$('.ven_sell_order_del_btn').live('click', function () {
     $('#ven_sell_order_del_id').val($(this).closest('tr').attr('sellorderid'));
     });
     $('.ven_cus_visit_del').live('click', function () {
     $.ajax({
     url: SERVER_URL + '/customer-visit/del',
     type: 'POST',
     data: {
     token: token,
     visit_id: $('#ven_sell_order_del_id').val()
     },
     success: function (e) {
     // 将返回值转换为json对象
     var oE = eval("(" + e + ")");
     if (oE.code == 0) {
     $('.tanceng').css('display', 'none')
     getSellOrderList()
     } else {
     alert('操作失败')
     }
     }
     })
     })*/


});
