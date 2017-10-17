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

    //字符串转数组去重
    function getStringArr(str) {
        if (str == null) {
            return;
        } else {
            var arr = str.split('、');
            var newArr = [];
            $.each(arr, function (i, v) {
                if ($.inArray(v, newArr) == -1) {
                    newArr.push(v);
                }
            });
            var newStr = newArr.join('、');
            return newStr;
        }

    }

    var token, pid, key, page, limit, word_titl, goods_id, goods_pid, goods_member, goods_enddate, goods_fileurl, goods_imgurl, w_p_n;
    token = Admin.get_token();
    //token = '2017052516045457073-1-1';
    uid = Admin.get_uid();

    /*var userinfo = eval('(' + $.cookie('userinfo') + ')');
     uname = userinfo['username'];*/
    uname = loginUserInfo.username;
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

    //权限部分
    if (loginUserInfo['company_admin'] != 1) {
        var venSellChancePowerList = loginUserInfo['powerUrls'];
        //查看全部成员
        var venCusVisitDept = 'customer-order/dept';
        //查看全部成员
        var venCusVisitAllList = 'customer-order/list';

        if ($.inArray(venCusVisitDept, venSellChancePowerList) == -1 && $.inArray(venCusVisitAllList, venSellChancePowerList) == -1) {
            $('#ven_sell_order_tab_ul').html('<li name="xs_xsdd_mian" class="taba" id="ven_sell_order_list_mine" needurl="my">我的销售订单</li>\
                <li name="xs_xsdd_mian" class="taba" id="ven_sell_order_list_tome" needurl="copy">抄送我的</li>');
        } else if ($.inArray(venCusVisitDept, venSellChancePowerList) == -1 && $.inArray(venCusVisitAllList, venSellChancePowerList) != -1) {
            $('#ven_sell_order_tab_ul').html('<li class="taba tabhover" name="xs_xsdd_mian" id="ven_sell_order_list_all" needurl="">全部</li>\
                <li name="xs_xsdd_mian" class="taba" id="ven_sell_order_list_mine" needurl="my">我的销售订单</li>\
                <li name="xs_xsdd_mian" class="taba" id="ven_sell_order_list_tome" needurl="copy">抄送我的</li>');
        } else if ($.inArray(venCusVisitDept, venSellChancePowerList) != -1 && $.inArray(venCusVisitAllList, venSellChancePowerList) == -1) {
            $('#ven_sell_order_tab_ul').html('<li name="xs_xsdd_mian" class="taba" id="ven_sell_order_list_team" needurl="team">团队销售订单</li>\
                <li name="xs_xsdd_mian" class="taba" id="ven_sell_order_list_mine" needurl="my">我的销售订单</li>\
                <li name="xs_xsdd_mian" class="taba" id="ven_sell_order_list_tome" needurl="copy">抄送我的</li>');
        } else if ($.inArray(venCusVisitDept, venSellChancePowerList) != -1 && $.inArray(venCusVisitAllList, venSellChancePowerList) != -1) {
            $('#ven_sell_order_tab_ul').html('<li class="taba tabhover" name="xs_xsdd_mian" id="ven_sell_order_list_all" needurl="">全部</li>\
                <li name="xs_xsdd_mian" class="taba" id="ven_sell_order_list_team" needurl="team">团队销售订单</li>\
                <li name="xs_xsdd_mian" class="taba" id="ven_sell_order_list_mine" needurl="my">我的销售订单</li>\
                <li name="xs_xsdd_mian" class="taba" id="ven_sell_order_list_tome" needurl="copy">抄送我的</li>');
        }

    }


    // 定义选择查看项
    var venSellOrderLookAbledField = [
        {'index': null, 'field': '创建日期'},
        {'index': null, 'field': '负责部门'},
        {'index': null, 'field': '负责人'}
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

    // 获取销售订单列表
    function getSellOrderList() {
        $.ajax({
            url: SERVER_URL + '/order/list',
            type: 'GET',
            data: sellOrderData,
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                if (oE.code == 0) {
                    //搜索总条数
                    $('#ven_sell_order_total').html(oE.totalcount);

                    //合计信息
                    //总金额合计
                    $('.ven_sell_order_list_sum_totals').html(oE.sum_totals);
                    //已收金额合计
                    $('.ven_sell_order_list_sum_already_money').html(oE.sum_already_money);
                    //已付票合计
                    $('.ven_sell_order_list_sum_already_ticket_money').html(oE.sum_already_ticket_money);

                    //获取datalist
                    var datalist = oE.datalist;
                    console.log(datalist);
                    if (datalist.length == 0) {
                        $('.ven_sell_order_nodata_box').removeClass('none');
                        $('.ven_sell_order_handle').addClass('none');
                        $('.ven_sell_order_list_table_total').addClass('none');
                    } else {
                        $('.ven_sell_order_nodata_box').addClass('none');
                        $('.ven_sell_order_handle').removeClass('none');
                        $('.ven_sell_order_list_table_total').removeClass('none');
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
                        var outStatusName = '';
                        if (v['out_status'] == 0) {
                            outStatusClass = 'c_r';
                            outStatusName = '未出库';
                        } else if (v['out_status'] == 1) {
                            outStatusClass = 'c_y';
                            outStatusName = '部分出库';
                        } else if (v['out_status'] == 2) {
                            outStatusClass = 'c_g';
                            outStatusName = '已出库';
                        }
                        // 发货状态判断改变class
                        var shipmentsStatusClass = '';
                        var shipmentsStatusName = '';
                        if (v['shipments_status'] == 1) {
                            shipmentsStatusClass = 'c_r';
                            shipmentsStatusName = '待发货';
                        } else if (v['shipments_status'] == 2) {
                            shipmentsStatusClass = 'c_y';
                            shipmentsStatusName = '部分发货';
                        } else if (v['shipments_status'] == 3) {
                            shipmentsStatusClass = 'c_g';
                            shipmentsStatusName = '已发货';
                        } else {
                            shipmentsStatusName = '-';
                        }
                        /* var outStatusBox = '';
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
                         outStatusBox += '</div>';*/

                        //已付票金额
                        /*var tickListBox = '<div class="cg_ghs_contMsgBox" style="width: 300px; padding-top: 10px; display: none;position:fixed;"><i class="cg_ghs_torr"></i>';
                         var tickListBoxChild = '';
                         $.each(v['tick_list']['list'], function (i2, v2) {
                         tickListBoxChild += '<li>付票：<span>' + v2['ticket'] + '元</span><span style="margin:0 10px;">' + v2['date'] + '</span>操作人 <span>' + v2['owner'] + '</span></li>'
                         });
                         tickListBox += '<div class="cg_ghs_contMsgBoxDet">\
                         <ul>' + tickListBoxChild + '</ul>\
                         <p class="c_r" style="font-weight: bold;text-align: right;margin-right: 10px;">总计付票: <span > ' + v['tick_list']['sum'] + ' </span> 元 </p>\
                         </div>'
                         tickListBox += '</div>';*/

                        sellOrderHtml += '<tr sellorderid="' + v['id'] + '" class="' + invalidClass + '">\
                            <td>' + sellOrderNum + '</td>\
                            <td>' + (v['code_sn']) + (v['is_old'] == 1 ? '<b class="c_r" style="font-weight:600;">(补)</b>' : '') + '</td>\
                            <td>' + (v['customer_name']) + '</td>\
                            <td>' + (v['created_at'].split(' ')[0]) + '</td>\
                            <td>' + (v['dept_name']) + '</td>\
                            <td>' + (v['owner_name']) + '</td>\
                            <td>' + (v['delivery_at']) + '</td>\
                            <td class="' + outStatusClass + '">' + outStatusName + '</td>\
                            <td class="' + shipmentsStatusClass + '">' + shipmentsStatusName + '</td>\
                            <td>' + (v['totals']) + '</td>\
                            <td class="relative cg_ghs_contact" style="cursor: pointer;"><span class="f_color">' + (v['already_money']) + '</span></td>\
                            <td class="relative cg_ghs_contact" style="cursor: pointer;"><span class="f_color">' + (v['already_ticket_money']) + '</span></td>\
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
        //高级搜索
        venSellOrderSearch();
    }

    // 全部销售订单
    $('#ven_sell_order_list_all').die('click').live('click', function () {
        sellOrderData.list_type = '';
        getSellOrderList();
    });

    // 团队销售订单
    $('#ven_sell_order_list_team').die('click').live('click', function () {
        sellOrderData.list_type = 'team';
        getSellOrderList();
    });

    // 我的销售订单
    $('#ven_sell_order_list_mine').die('click').live('click', function () {
        sellOrderData.list_type = 'my';
        getSellOrderList();
    });

    // 抄送我的销售订单
    $('#ven_sell_order_list_tome').die('click').live('click', function () {
        sellOrderData.list_type = 'copy';
        getSellOrderList();
    });

    //刷新列表
    $('#ven_sell_order_refresh').die('click').live('click', function () {
        sellOrderData.page = 1;
        sellOrderData.key = '';
        sellOrderData.dept = '';
        sellOrderData.owner = '';
        $('#ven_sell_order_searKey').val('搜索客户名称').css('color', '#CCCCCC');
        $('#ven_sell_order_search_dept_inp').val('负责部门').css('color', '#CCCCCC');
        $('#ven_sell_order_search_owner_inp').val('负责人').css('color', '#CCCCCC');
        $('.ven_sell_order_search_num').val('10');
        sellOrderData.list_type = $('#ven_sell_order_tab_ul li.tabhover').attr('needurl');
        getSellOrderList();
    });

    //搜索关键字
    $('#ven_sell_order_searKey_btn').die('click').live('click', function () {
        if ($('#ven_sell_order_searKey').val() == '搜索客户名称') {
            sellOrderData.key = '';
        } else {
            sellOrderData.key = $('#ven_sell_order_searKey').val();
        }
        sellOrderData.list_type = $('#ven_sell_order_tab_ul li.tabhover').attr('needurl');
        getSellOrderList();
    });
    $('#ven_sell_order_tab_ul li:nth-of-type(1)').trigger('click');
    //高级搜索 控制下拉框
    function venSellOrderSearch() {
        $.ajax({
            url: SERVER_URL + '/order/list',
            type: 'GET',
            data: {token: token, num: 500, list_type: $('#ven_sell_order_tab_ul li.tabhover').attr('needurl')},
            dataType: 'json',
            success: function (oE) {
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
    $('#ven_sell_order_search_dept_ul li').die('click').live('click', function () {
        sellOrderData.dept = $(this).attr('deptid');
        sellOrderData.list_type = $('#ven_sell_order_tab_ul li.tabhover').attr('needurl');
        getSellOrderList();
    });
    //搜索负责人
    $('#ven_sell_order_search_owner_ul li').die('click').live('click', function () {
        sellOrderData.owner = $(this).attr('ownerid');
        sellOrderData.list_type = $('#ven_sell_order_tab_ul li.tabhover').attr('needurl');
        getSellOrderList();
    });

    //定义当前操作销售订单ID
    var sellOrderCurrentId = null;
    //定义销售订单开具发票参数
    var sellOrderKjfpData = {
        token: token,
        order_id: '', // 订单id
        steps: '', // 阶段
        money: '', // 应付票款
        pay_day: '' // 确定付票日期
    };
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
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var data = oE.data;
                    console.log(data);
                    //更多按钮显示隐藏
                    if (data['is_invalid'] == 1) {
                        $('.slider_head_More').css('display', 'none');
                    } else {
                        $('.slider_head_More').css('display', 'block');
                    }

                    //基本信息

                    //客户名称
                    $('.ven_sell_order_look_name').html(data['customer_name']);
                    //创建日期 - 长
                    $('.ven_sell_order_look_create_at_long').html(data['created_at']);
                    //创建日期 - 短
                    $('.ven_sell_order_look_create_at_short').html(data['created_at'].split(' ')[0]);
                    //订单编号
                    $('.ven_sell_order_look_code_sn').html(data['code_sn']);
                    //合同编号
                    $('.ven_sell_order_look_contract_name').html(data['contract_code_sn']);
                    //报价单
                    $('.ven_sell_order_look_quote_code_sn').html(data['quote_code_sn']);
                    //制单人
                    $('.ven_sell_order_look_uname').html(data['uname']);
                    //负责部门
                    $('.ven_sell_order_look_dept_name').html(data['dept_name']);
                    //负责人
                    $('.ven_sell_order_look_owner_name').html(data['owner_name']);

                    //财务信息

                    //结算账户
                    $('.ven_sell_order_look_account_name').html(data['account_name']);
                    //付款方式
                    if (data['way'] == 1) {
                        $('.ven_sell_order_look_way').html('现金');
                    } else if (data['way'] == 2) {
                        $('.ven_sell_order_look_way').html('电汇');
                    } else if (data['way'] == 3) {
                        $('.ven_sell_order_look_way').html('支票');
                    }
                    //税率
                    $('.ven_sell_order_look_tax_rate').html(data['tax_rate']);
                    //总金额
                    $('.ven_sell_order_look_totals').html(data['totals']);
                    //回款阶段
                    var returnMoneyHtml = '';
                    //回款状态
                    var returnStatus = '';
                    //开具发票信息
                    var kjfpInfo = '';
                    $.each(data['return_money_steps'], function (i, v) {
                        if (v['pay_status'] == 3) {
                            returnStatus = 'c_r';
                        } else if (v['pay_status'] == 1) {
                            returnStatus = 'c_g';
                        } else {
                            returnStatus = 'c_y';
                        }
                        var already = v['already_money'] == '' ? 0 : v['already_money'];
                        returnMoneyHtml += '<tr>\
                                            <td>阶段' + (i + 1) + '</td>\
                                            <td>' + v['segmet_day'] + '</td>\
                                            <td>' + v['no_pay_money'] + '</td>\
                                            <td class="' + returnStatus + '" style="font-weight: bold;">' + (already) + '</td>\
                                            </tr>';
                        kjfpInfo += '<tr stepid="' + v['id'] + '">\
                                        <td><input type="checkbox" class="ven_sell_order_kjfp_checkbox" ' + ((v['no_pay_money'] - already) == 0 ? 'disabled' : '') + '></td>\
                                        <td>阶段' + (i + 1) + '</td>\
                                        <td>' + v['segmet_day'] + '</td>\
                                        <td>' + (v['no_pay_money'] - already) + '</td>\
                                        </tr>';
                    });
                    $('.ven_sell_order_return_money_steps_tbody').html(returnMoneyHtml);
                    $('.ven_sell_order_look_kjfp_btn').die('click').live('click', function () {
                        $('.tanceng .ven_sell_order_look_kjfp_dialog_tbody').html(kjfpInfo);
                        var $_kjfpCheckbox = $('.ven_sell_order_look_kjfp_dialog_tbody .ven_sell_order_kjfp_checkbox');
                        $_kjfpCheckbox.die('click').live('click', function () {
                            var ticketTotal = 0;
                            $.each($_kjfpCheckbox, function (i, v) {
                                if ($_kjfpCheckbox.eq(i).attr('checked') == 'checked') {
                                    ticketTotal += parseFloat($_kjfpCheckbox.eq(i).closest('tr').find('td').eq(3).text());
                                }
                            });
                            $('.tanceng .ven_sell_order_look_kjfp_dialog_ticket_total').html(ticketTotal);
                        });
                    });
                    sellOrderKjfpData = {
                        token: token,
                        order_id: '', // 订单id
                        steps: '', // 阶段
                        money: '', // 应付票款
                        pay_day: '' // 确定付票日期
                    };
                    //开具发票提交
                    $('.tanceng .ven_sell_order_look_kjfp_dialog_submit_btn').die('click').live('click', function () {
                        if ($('.tanceng .ven_sell_order_look_kjfp_dialog_tbody tr input:checked').length == 0) {
                            alert('请选择阶段');
                            return false;
                        }
                        if ($('.tanceng .ven_sell_order_look_kjfp_dialog_day_inp').val() == '请选择日期') {
                            alert('请选择确定付票日期');
                            return false;
                        }
                        sellOrderKjfpData.order_id = data['id'];
                        var stepsArr = [];
                        $.each($('.tanceng .ven_sell_order_look_kjfp_dialog_tbody tr'), function (i, v) {
                            if ($('.tanceng .ven_sell_order_look_kjfp_dialog_tbody tr').eq(i).find('input:checkbox').attr('checked') == 'checked') {
                                stepsArr.push({
                                    id: $('.tanceng .ven_sell_order_look_kjfp_dialog_tbody tr').eq(i).attr('stepid'),
                                    day: $('.tanceng .ven_sell_order_look_kjfp_dialog_tbody tr').eq(i).find('td').eq(2).text(),
                                    money: $('.tanceng .ven_sell_order_look_kjfp_dialog_tbody tr').eq(i).find('td').eq(3).text()
                                });
                            }
                        });
                        console.log(stepsArr);
                        sellOrderKjfpData.steps = arrayToJson(stepsArr);
                        sellOrderKjfpData.money = $('.tanceng .ven_sell_order_look_kjfp_dialog_ticket_total').text();
                        sellOrderKjfpData.pay_day = $('.tanceng .ven_sell_order_look_kjfp_dialog_day_inp').val();
                        $.ajax({
                            url: SERVER_URL + '/order/addticketlog',
                            type: 'POST',
                            data: sellOrderKjfpData,
                            dataType: 'json',
                            success: function (oE) {
                                console.log(oE);
                                if (oE.code == 0) {
                                    $('.tanceng').css('display', 'none').find('div').remove();
                                    $('.right_sidebar_h').trigger('click');
                                }
                            },
                            error: function (e) {
                                alert(e.msg);
                                console.log(e);
                            }
                        });
                    });

                    //出库信息

                    //发货时间
                    $('.ven_sell_order_look_delivery_at').html(data['delivery_at']);
                    //物流方式
                    if (data['transport_type'] == 1) {
                        $('.ven_sell_order_look_transport_type').html('快递');
                    } else if (data['transport_type'] == 2) {
                        $('.ven_sell_order_look_transport_type').html('陆运');
                    } else if (data['transport_type'] == 3) {
                        $('.ven_sell_order_look_transport_type').html('空运');
                    } else if (data['transport_type'] == 4) {
                        $('.ven_sell_order_look_transport_type').html('平邮');
                    } else if (data['transport_type'] == 5) {
                        $('.ven_sell_order_look_transport_type').html('海运');
                    }
                    //收货人
                    $('.ven_sell_order_look_receipt_person').html(data['receipt_person']);
                    //收货人电话
                    $('.ven_sell_order_look_receipt_person_tel').html(data['receipt_person_tel']);
                    //收货人地址
                    $('.ven_sell_order_look_receipt_address').html(data['receipt_address']);
                    //出库商品
                    $('.ven_sell_order_look_out_product').die('click').live('click', function () {
                        $.ajax({
                            url: SERVER_URL + '/quote/detail',
                            type: 'GET',
                            data: {
                                token: token,
                                quote_id: data['quote_id']
                            },
                            dataType: 'json',
                            success: function (oE) {
                                console.log(oE);
                                if (oE.code == 0) {
                                    var data = oE.data;
                                    //基本商品
                                    var goodsHtml = '';
                                    if (data['steps']['product_json']['goods']) {
                                        $('.tanceng .sell_order_look_cksp_detail_goods_box').css('display', 'block');
                                        var goodsArr = data['steps']['product_json']['goods']['goods'];
                                        $.each(goodsArr, function (i, v) {
                                            goodsHtml += '<tr>\
                                        <td>' + l_dbl(i + 1) + '</td>\
                                        <td>' + v['good_sn'] + '</td>\
                                        <td>' + v['good_name'] + '</td>\
                                        <td>' + v['good_attr'] + '</td>\
                                        <td>' + v['good_num'] + v['good_unit'] + '</td>\
                                        </tr>';
                                        });
                                    } else {
                                        $('.tanceng .sell_order_look_cksp_detail_goods_box').css('display', 'none');
                                    }
                                    $('.tanceng .sell_order_look_cksp_detail_goods_list').html(goodsHtml);

                                    //套餐商品
                                    var packageHtml = '';
                                    if (data['steps']['product_json']['package']) {
                                        $('.tanceng .sell_order_look_cksp_detail_package_box').css('display', 'block');
                                        var packageArr = data['steps']['product_json']['package']['package'];
                                        $.each(packageArr, function (i, v) {
                                            var packageGoods = '';
                                            $.each(v['good_list'], function (i2, v2) {
                                                var packageGoodsInfo = '';
                                                $.each(v2['attr_list'], function (i3, v3) {
                                                    packageGoodsInfo += '<tr>\
                                    <td>' + v3['good_sn'] + '</td>\
                                    <td>' + v3['good_attr'] + '</td>\
                                    <td>' + v3['total_num'] + '</td>\
                                    <td></td>\
                                    </tr>'
                                                });
                                                packageGoods += '<table class="xs_bjd_table_1">\
                                    <thead>\
                                    <tr style="background: #fff;">\
                                    <th class="c_3" style="font-weight: 100;">' + v2['title'] + '</th>\
                                    <th></th>\
                                    <th></th>\
                                    </tr>\
                                    <tr>\
                                    <th width="200">编号</th>\
                                    <th width="470">属性</th>\
                                    <th width="50">数量</th>\
                                    <th width="60"></th>\
                                    </tr>\
                                    </thead>\
                                    <tbody>' + packageGoodsInfo + '</tbody>\
                                    </table>';
                                            });
                                            packageHtml += '<div class="xs_div_2"' + (i == 0 ? ' style="margin-top: 20px;"' : '') + '>\
                            <table class="xs_bjd_table">\
                            <thead class="' + (i == 0 ? '' : 'none') + '">\
                            <tr>\
                            <th width="40">序号</th>\
                            <th width="140">编号</th>\
                            <th width="150">名称</th>\
                            <th width="285">属性</th>\
                            <th width="50">数量</th>\
                            <th width="55">配件</th>\
                            </tr>\
                            </thead>\
                            <tbody>\
                            <tr class="c_3 xs_bjd_bold">\
                            <td width="40">' + l_dbl(i + 1) + '</td>\
                            <td width="140">' + v['package_sn'] + '</td>\
                            <td width="150">' + v['package_name'] + '</td>\
                            <td width="285">-</td>\
                            <td width="50">' + v['package_num'] + '</td>\
                            <td width="55">\
                            <button class="but_mix box_open_btn_1 but_blue_1 but_look">展开</button>\
                            </td>\
                            </tr>\
                            </tbody>\
                            </table>\
                            </div>\
                            <div class="xs_tc_goods_box goods_tc_toggle" style="display: none;">' + packageGoods + '</div>';
                                        });
                                    } else {
                                        $('.tanceng .sell_order_look_cksp_detail_package_box').css('display', 'none');
                                    }

                                    $('.tanceng .sell_order_look_cksp_detail_package_list').html(packageHtml);

                                    //整机商品
                                    var settingHtml = '';
                                    if (data['steps']['product_json']['setting']) {
                                        $('.tanceng .sell_order_look_cksp_detail_setting_box').css('display', 'block');
                                        var settingArr = data['steps']['product_json']['setting']['setting'];
                                        console.log(settingArr);
                                        $.each(settingArr, function (i, v) {
                                            var settingGoods = '';
                                            if (v['optional'] == 1) {
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
                                        <th width="200">编号</th>\
                                        <th width="470">属性</th>\
                                        <th width="50">数量</th>\
                                        <th width="60"></th>\
                                        </tr>\
                                        </thead>\
                                        <tbody>' + settingGoodsInfo + '</tbody>\
                                        </table>'
                                                })
                                            } else if (v['optional'] == 2) {
                                                //不可选配
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
                                        <th width="200">编号</th>\
                                        <th width="470">属性</th>\
                                        <th width="50">数量</th>\
                                        <th width="60"></th>\
                                        </tr>\
                                        </thead>\
                                        <tbody>' + settingGoodsInfo + '</tbody>\
                                        </table>';
                                                })
                                            }

                                            settingHtml += '<div class="xs_div_2" ' + (i == 0 ? ' style="margin-top: 20px;"' : '') + '>\
                            <table class="xs_bjd_table">\
                            <thead class="' + (i == 0 ? '' : 'none') + '">\
                            <tr>\
                            <th width="40">序号</th>\
                            <th width="140">编号</th>\
                            <th width="150">名称</th>\
                            <th width="285">属性</th>\
                            <th width="50">数量</th>\
                            <th width="55">配件</th>\
                            </tr>\
                            </thead>\
                            <tbody>\
                            <tr class="c_3 c_3 xs_bjd_bold">\
                            <td width="40">' + l_dbl(i + 1) + '</td>\
                            <td width="140">' + v['setting_sn'] + '</td>\
                            <td width="150">' + v['setting_name'] + '（' + (v['optional'] == 1 ? '可选配' : '不可选配') + '）</td>\
                            <td width="285">' + v['setting_attr'] + '</td>\
                            <td width="50">' + v['setting_num'] + '</td>\
                            <td width="55">\
                            <button class="but_mix box_open_btn_1 but_blue_1">展开</button>\
                            </td>\
                            </tr>\
                            </tbody>\
                            </table>\
                            </div>\
                            <div class="xs_tc_goods_box goods_tc_toggle" style="display: none;">' + settingGoods + '</div>';
                                        });
                                    } else {
                                        $('.tanceng .sell_order_look_cksp_detail_setting_box').css('display', 'none');
                                    }

                                    $('.tanceng .sell_order_look_cksp_detail_setting_list').html(settingHtml);
                                }
                            },
                            error: function (e) {
                                alert(e.msg);
                            }
                        });
                    });

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
                    //抄送人
                    var copyListHtml = '';
                    $.each(data['copy_list'], function (i, v) {
                        copyListHtml += v['name'] + ','
                    });
                    copyListHtml = copyListHtml.slice(0, copyListHtml.length - 1);
                    $('.ven_sell_order_look_copy_list').html(copyListHtml);

                    //获取当前关联报价单id
                    var sellOrderCurrentLinkQuoteId = data['quote_id'];
                    $('#ven_sell_order_look_quote_btn').die('click').live('click', function () {
                        $.ajax({
                            url: SERVER_URL + '/quote/info',
                            type: 'GET',
                            data: {
                                token: token,
                                quote_id: sellOrderCurrentLinkQuoteId
                            },
                            dataType: 'json',
                            success: function (oE) {
                                if (oE.code == 0 && oE.data) {
                                    var data = oE.data;
                                    //报价单编号
                                    $('#ven_sell_order_link_quote_code_sn').html(data['code_sn']);
                                    //销售订单
                                    $('#ven_sell_order_link_quote_order_code_sn').html(data['order_code_sn']);
                                    //借出单
                                    $('#ven_sell_order_link_quote_lend_code_sn').html(data['lend_code_sn']);
                                    //客户名称
                                    $('#ven_sell_order_link_quote_customer_name').html(data['customer_name']);
                                    //销售商品
                                    $('#ven_sell_order_link_quote_product_name').html(data['product_name']);
                                    //商品销售金额
                                    $('#ven_sell_order_link_quote_good_totals').html(data['good_totals']);
                                    //税率合计
                                    $('#ven_sell_order_link_quote_rate_sum').html(data['tax_rate'] == 1 ? '含税17%' : '无税');
                                    //运费承担
                                    $('#ven_sell_order_link_quote_is_freight').html(data['is_freight'] == 1 ? '包运费' : '不包运费');
                                    //总金额
                                    $('#ven_sell_order_link_quote_totals').html(data['totals']);
                                    //创建人
                                    $('#ven_sell_order_link_quote_uname').html(data['owner']);


                                    //审批流程

                                    var sellQuoteLookCheckListHtml = '';
                                    var checkStatusClass = "";

                                    var flowOrderArr2 = ['', '步骤一', '步骤二', '步骤三', '步骤四', '步骤五', '步骤六', '步骤七'];
                                    if (data['check_log'].length != 0) {
                                        $('.sq_look_check_box').removeClass('none');
                                        $.each(data['check_log'], function (i, v) {
                                            var checkStatusName = '';
                                            var checkCiteClass = '';
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
                                            sellQuoteLookCheckListHtml += '<div class="work_spiliu">\
                                <div class="work_spiliu_items" style="overflow: hidden;">\
                                <div class="left" style="position: relative;">\
                                <div class="work_spiliu_div">\
                                <img class="inline_block tx" src="' + v['face'] + '">\
                                <h3 class="work_sp_h3">' + v['name'] + '</h3>\
                                <span class="c_9 m_left_5 '+(data['current_check'] == 1 ? 'none1' : '')+'">'+flowOrderArr2[i]+'</span>\
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
                                <p class="c_3 work_sp_p '+(v['status'] == 9 ? 'none':'')+'">' + v['note'] + '</p>\
                                </div>\
                                </div>\
                                <div style="clear: both;height: 0;font-size: 1px;line-height: 0px;"></div>\
                                </div>\
                                </div>';
                                        });
                                        $('.ven_sell_order_link_quote_check_list').removeClass('none').html(sellQuoteLookCheckListHtml);
                                    } else {
                                        $('.ven_sell_order_link_quote_check_list').addClass('none');
                                    }
                                }
                            }
                        });
                    });
                    $('.ven_sell_order_link_quote_look_detail_btn').die('click').live('click', function () {
                        sellOrderLookQuoteDetailFn(sellOrderCurrentLinkQuoteId);
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
                            dataType: 'json',
                            success: function (oE) {
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
                                    $('#ven_sell_order_link_contract_statusname').html(data['status_name']);
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

                                    //审批流程
                                    var sellQuoteLookCheckListHtml = '';
                                    $.each(data['check_log'], function (i, v) {
                                        var checkStatusName = '';
                                        var checkCiteClass = '';
                                        if (v['check_status'] == 1) {
                                            checkStatusName = '通过审批';
                                            checkCiteClass = 'b_g';
                                        } else if (v['check_status'] == 2) {
                                            checkStatusName = '进行中';
                                            checkCiteClass = 'b_y';
                                        }
                                        sellQuoteLookCheckListHtml += '<div class="work_spiliu">\
                                                     <div class="work_spiliu_items">\
                                                     <div class="left" style="position: relative;">\
                                                     <img class="inline_block tx" src="' + v['face'] + '">\
                                                     <cite class="' + checkCiteClass + '"></cite>\
                                                     </div>\
                                                     <div class="right auto_height">\
                                                     <img src="static/images/work_jiantou.png">\
                                                     <div class="sp_cont">\
                                                     <div><h3 class="c_3" ' + (v['check_status'] == 2 ? 'style="color:#f8ac59;"' : '') + '>' + v['name'] + '</h3><span class="c_9 m_left_5">' + v['day'] + '</span></div>\
                                                     <h3 class=" f_color">' + checkStatusName + '</h3>\
                                                     <p class="c_3 work_sp_p">' + v['note'] + '</p>\
                                                     </div>\
                                                     </div>\
                                                     <div style="clear: both;height: 0;font-size: 1px;line-height: 0px;"></div>\
                                                     </div>\
                                                     </div>'
                                    });
                                    $('.ven_sell_order_link_contract_check_list').html(sellQuoteLookCheckListHtml);
                                } else {
                                    alert('操作失败')
                                }
                            }
                        })
                    });

                    //关联收款付票
                    $('#ven_sell_order_look_skfp_btn').die('click').live('click', function () {
                        //收款
                        $.ajax({
                            url: SERVER_URL + '/receipt/info',
                            type: 'GET',
                            data: {
                                token: token,
                                thetype: 2,
                                id: data['id']
                            },
                            dataType: 'json',
                            success: function (oE) {
                                console.log(oE);
                                if (oE.code == 0) {
                                    //回款阶段
                                    var datalist = oE.datalist.stepList;
                                    if(datalist.length>0){
                                        $('.ven_sell_order_look_hkjd_tbody_nodata_box').addClass('none');
                                        var sellOrderSkHtml = '';
                                        var skStatusClass = '';
                                        var skStatusName = '';
                                        $.each(datalist, function (i, v) {
                                            if (v['pay_status'] == 3) {
                                                skStatusClass = 'c_r';
                                                skStatusName = '逾期';
                                            } else if (v['pay_status'] == 1) {
                                                skStatusClass = 'c_g';
                                                skStatusName = '正常回款 <i class="xs_xsdd_yes"></i>';
                                            } else {
                                                skStatusClass = 'c_y';
                                                skStatusName = '待收';
                                            }
                                            sellOrderSkHtml += '<tr  style="border-bottom: 1px dashed #cecece;">\
                                                            <td>阶段' + (i + 1) + '</td>\
                                                            <td>' + v['segmet_day'] + '</td>\
                                                            <td>' + v['no_pay_money'] + '</td>\
                                                            <td>' + v['pay_time'] + '</td>\
                                                            <td>' + v['already_money'] + '</td>\
                                                            <td class="' + skStatusClass + '" style="font-weight: bold;position: relative;">' + skStatusName + '</td>\
                                                            </tr>'
                                        });
                                        $('.ven_sell_order_look_hkjd_tbody').html(sellOrderSkHtml);
                                    }else{
                                        $('.ven_sell_order_look_hkjd_tbody_nodata_box').removeClass('none');
                                        $('.ven_sell_order_look_hkjd_tbody').html('');
                                    }
                                    //订单收款记录
                                    if(oE.receiptLogList.length > 0){
                                        $('.ven_sell_order_look_skjl_tbody_nodata_box').addClass('none');
                                        $('.ven_sell_order_look_skjl_tbody_table_total').removeClass('none');
                                        var receiptLogHtml = '';
                                        var receiptLogTotal = 0;
                                        $.each(oE.receiptLogList, function (i, v) {
                                            receiptLogHtml += '<tr>\
                                                            <td>' + l_dbl(i + 1) + '</td>\
                                                            <td>' + v['code_sn'] + '</td>\
                                                            <td>' + v['day'] + '</td>\
                                                            <td>' + v['owner_name'] + '</td>\
                                                            <td>' + v['choice_cuenta'] + '</td>\
                                                            <td>' + v['already_pay_money'] + '</td>\
                                                            <td>' + v['note'] + '</td>\
                                                            </tr>';
                                            receiptLogTotal += parseFloat(v['already_pay_money']);
                                        });
                                        $('.ven_sell_order_look_skjl_tbody').html(receiptLogHtml);
                                        $('.ven_sell_order_look_skjl_total').html(receiptLogTotal);
                                    }else{
                                        $('.ven_sell_order_look_skjl_tbody_nodata_box').removeClass('none');
                                        $('.ven_sell_order_look_skjl_tbody_table_total').addClass('none');
                                        $('.ven_sell_order_look_skjl_tbody').html('');
                                        $('.ven_sell_order_look_skjl_total').html('');
                                    }
                                } else {
                                    alert('操作失败')
                                }
                            }
                        });
                        //付票
                        $.ajax({
                            url: SERVER_URL + '/output-ticket/info',
                            type: 'GET',
                            data: {
                                token: token,
                                thetype: 2,
                                id: data['id']
                            },
                            dataType: 'json',
                            success: function (oE) {
                                console.log(oE);
                                if (oE.code == 0) {
                                    //付票阶段
                                    var stepDatalist = oE.stepList;
                                    if(stepDatalist.length > 0){
                                        $('.sell_order_look_fp_tbody_nodata_box').addClass('none');
                                        var fpjdHtml = '';
                                        $.each(stepDatalist, function (i, v) {
                                            if (v['pay_status'] == 3) {
                                                skStatusClass = 'c_r';
                                                skStatusName = '逾期';
                                            } else if (v['pay_status'] == 1) {
                                                skStatusClass = 'c_g';
                                                skStatusName = '正常付票 <i class="xs_xsdd_yes"></i>';
                                            } else {
                                                skStatusClass = 'c_y';
                                                skStatusName = '待收';
                                            }
                                            fpjdHtml += '<tr  style="border-bottom: 1px dashed #cecece;">\
                                                            <td>阶段' + (i + 1) + '</td>\
                                                            <td>' + v['segmet_day'] + '</td>\
                                                            <td>' + v['no_pay_money'] + '</td>\
                                                            <td>' + v['pay_time'] + '</td>\
                                                            <td>' + v['already_money'] + '</td>\
                                                            <td class="' + skStatusClass + '" style="font-weight: bold;position: relative;">' + skStatusName + '</td>\
                                                            </tr>'
                                        });
                                        $('.sell_order_look_fp_tbody').html(fpjdHtml);
                                    }else{
                                        $('.sell_order_look_fp_tbody_nodata_box').removeClass('none');
                                        $('.sell_order_look_fp_tbody').html('');
                                    }
                                    //订单付票记录
                                    var logDatalist = oE.logList;
                                    if(logDatalist.length > 0){
                                        $('.sell_order_look_ddfpjl_tbody_nodata_box').addClass('none');
                                        $('.sell_order_look_ddfpjl_tbody_table_total').removeClass('none');
                                        var logHtml = '';
                                        $.each(logDatalist, function (i, v) {
                                            logHtml += '';
                                        });
                                    }else{
                                        $('.sell_order_look_ddfpjl_tbody_nodata_box').removeClass('none');
                                        $('.sell_order_look_ddfpjl_tbody_table_total').addClass('none');
                                    }
                                } else {
                                    alert('操作失败')
                                }
                            }
                        });
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
                            dataType: 'json',
                            success: function (oE) {
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
                                    if (data['service_type'] == 0) {
                                        servicetypeName = '外出售后'
                                    } else if (data['service_type'] == 1) {
                                        servicetypeName = '电话售后'
                                    } else if (data['service_type'] == 2) {
                                        servicetypeName = '网络售后'
                                    }
                                    $('#ven_sell_order_link_afterorder_servicetype').html(servicetypeName);
                                    //创建人
                                    $('#ven_sell_order_link_afterorder_uname').html(data['uname']);
                                    //创建时间
                                    $('#ven_sell_order_link_afterorder_created_at').html(data['created_at']);
                                    //状态
                                    var statusname = '';
                                    if (data['status'] == 0) {
                                        statusname = '待接受';
                                    } else if (data['status'] == 1) {
                                        statusname = '已接受';
                                    } else if (data['status'] == 2) {
                                        statusname = '完成';
                                    } else if (data['status'] == 3) {
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
                            dataType: 'json',
                            success: function (oE) {
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
                                    if (data['thetype'] == 1) {
                                        thetypename = '换货';
                                    } else if (data['thetype'] == 2) {
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
                                    if (data['status'] == 1) {
                                        statusname = '审批中'
                                    } else if (data['status'] == 2) {
                                        statusname = '未完成'
                                    } else if (data['status'] == 3) {
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
                                    if (data['in_status'] == 0) {
                                        instatusname = '未入库';
                                    } else if (data['in_status'] == 1) {
                                        instatusname = '已入库';
                                    }
                                    $('#ven_sell_order_link_reproduct_instatusname').html(instatusname);
                                    //出库状态
                                    var outstatusname = '';
                                    if (data['out_status'] == 0) {
                                        outstatusname = '未入库';
                                    } else if (data['out_status'] == 1) {
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
    $('.ven_sell_order_invalid_btn').die('click').live('click', function () {
        sellOrderCurrentId = $(this).closest('tr').attr('sellorderid');
        $.ajax({
            url: SERVER_URL + '/order/setstatus',
            type: 'POST',
            data: {
                token: token,
                order_id: sellOrderCurrentId,
                status_flag: 1
            },
            dataType: 'json',
            success: function (oE) {
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
    $('.ven_sell_order_look_invalid_btn').die('click').live('click', function () {
        $.ajax({
            url: SERVER_URL + '/order/setstatus',
            type: 'POST',
            data: {
                token: token,
                order_id: sellOrderCurrentId,
                status_flag: 1
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    $('.right_sidebar').css('display', 'none');
                    sellOrderData.list_type = $('#ven_sell_order_tab_ul li.tabhover').attr('needurl');
                    getSellOrderList();
                } else {
                    alert('操作失败')
                }
            }
        });
    });

    //不显示作废状态
    $('#ven_sell_order_noShow').die('click').live('click', function () {
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
        order_id: 0, // 订单id
        chance_id: 0, // 机会id
        is_old: '', // 是否补录  0 不是补录   1 是补录
        quote_id: '', //  销售报价单id
        customer_id: '', // 客户id
        contract_id: '', //  合同id
        transport_type: '', // 物流方式
        delivery_at: '', // 发货时间
        note: '', // 备注
        copy_list: '', // 抄送人 1,2,3
        quote_code_sn: '', // 销售报价单编号
        customer_name: '', // 客户名称
        dept_name: '', // 负责部门名称
        owner_name: '', // 负责人
        account_name: '', // 结算账户
        way: '', //  付款方式
        tax_rate: '', // 税率
        return_money_steps: '', // 回款阶段
        pay_ticket_steps: '', //  付票阶段
        receipt_person: '', // 收货人
        receipt_person_id: '', // 收货人id
        receipt_person_tel: '', // 收货人电话
        receipt_address: '', // 收货地址
        goods: '', // 普通商品
        package: '', //  套餐商品
        setting: '', // 整机商品
        totals: '' // 总计金额
    };
    //定义推送出库信息参数
    var sellOrderToOutStockData = {
        token: token,
        related_receipts_no: '', // 关联单据编号
        output_type: 1, // 出库类型 1销售 2采购退货/采购换货 3借出出库 4借入归还 5销售换货
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
    var sellOrderToReceiptData = {
        token: token,
        last_id: '', // 返回的最后id
        code_sn: '', // 相关业务单编号
        name: '', // 相关业务名称 采购是供应商 销售是客户名称
        thetype: 1, // 收款类型 1销售收款 2采购退款
        no_pay_money: '', // 应收款
        tax_status: '', // 含税状态 1未税 2含税
        account_name: '', // 结算账户
        receipt_way: '', // 收款方式1现金 2电汇 3支票
        company_account_id: '' // 账户id
    };
    //定义推送销项付票参数
    var sellOrderToOutPutTicketData = {
        token: token,
        last_id: '', // 返回的最后id
        code_sn: '', // 相关业务单编号
        cs_name: '', // 相关业务名称 采购是供应商 销售是客户名称
        owner: uid, // 负责人
        company_account_id: '', // 结算账户id
        name: '', // 账户名称
        expected_day: '',
        no_pay_money: '',
        steps: ''  // 付票阶段
    };

    //新建销售订单
    $('#ven_sell_order_create_btn').die('click').live('click', function () {
        sellOrderCreateData = {
            token: token,
            order_id: 0, // 订单id
            chance_id: 0, // 机会id
            is_old: '', // 是否补录  0 不是补录   1 是补录
            quote_id: '', //  销售报价单id
            customer_id: '', // 客户id
            contract_id: '', //  合同id
            transport_type: '', // 物流方式
            delivery_at: '', // 发货时间
            note: '', // 备注
            copy_list: '', // 抄送人 1,2,3
            quote_code_sn: '', // 销售报价单编号
            customer_name: '', // 客户名称
            dept_name: '', // 负责部门名称
            owner_name: '', // 负责人
            account_name: '', // 结算账户
            way: '', //  付款方式
            tax_rate: '', // 税率
            return_money_steps: '', // 回款阶段
            pay_ticket_steps: '', //  付票阶段
            receipt_person: '', // 收货人
            receipt_person_id: '', // 收货人id
            receipt_person_tel: '', // 收货人电话
            receipt_address: '', // 收货地址
            goods: '', // 普通商品
            package: '', //  套餐商品
            setting: '', // 整机商品
            totals: '' // 总计金额
        };
        //查看报价单删除弹层的类
        $('.tanceng .ven_sell_order_look_quote_detail_btn').removeClass('val_dialogTop');
        //查看出库商品删除弹层的类
        $('.tanceng .sell_order_create_look_cksp_detail_btn').removeClass('val_dialogTop');
        sellOrderCreateData.is_old = 0;
        $('.tanceng .ven_sell_order_create_time').html(getCurrentDate());
        $('.tanceng .ven_sell_order_create_uname').html(uname);
        $('.tanceng .ven_sell_order_create_code_sn_inp').val(likGetCodeFn('XSD'));
        //推送出库 - 关联单据编号
        sellOrderToOutStockData.related_receipts_no = $('.tanceng .ven_sell_order_create_code_sn_inp').val();
        //推送收款 - 相关业务单编号
        sellOrderToReceiptData.code_sn = $('.tanceng .ven_sell_order_create_code_sn_inp').val();
        //推送付票 - 相关业务单编号
        sellOrderToOutPutTicketData.code_sn = $('.tanceng .ven_sell_order_create_code_sn_inp').val();
    });
    //新建新的
    /*$('.tanceng .ven_sell_order_create_new_btn').die('click').live('click', function () {
        sellOrderCreateData.is_old = 0;
        $('.tanceng .ven_sell_order_create_time').html(getCurrentDate());
        $('.tanceng .ven_sell_order_create_uname').html(uname);
        $('.tanceng .ven_sell_order_create_code_sn_inp').val(likGetCodeFn('XSD'));
        //推送出库 - 关联单据编号
        sellOrderToOutStockData.related_receipts_no = $('.tanceng .ven_sell_order_create_code_sn_inp').val();
        //推送收款 - 相关业务单编号
        sellOrderToReceiptData.code_sn = $('.tanceng .ven_sell_order_create_code_sn_inp').val();
        //推送付票 - 相关业务单编号
        sellOrderToOutPutTicketData.code_sn = $('.tanceng .ven_sell_order_create_code_sn_inp').val();
    });*/
    //新建旧的
    $('.tanceng .ven_sell_order_create_old_btn').die('click').live('click', function () {
        sellOrderCreateData.is_old = 1;
        $('.tanceng .ven_sell_order_create_time').html(getCurrentDate());
        $('.tanceng .ven_sell_order_create_uname').html(uname);
        $('.tanceng .ven_sell_order_create_code_sn_inp').val(likGetCodeFn('XSD'));
    });

    $('.tanceng .ven_sell_order_create_choose_quote_btn').die('click').live('click', function () {
        getSellQuoteList();
    });

    /*//新建订单 - 选择报价单
     var sellQuoteData = {
     token: token,
     page: 1, //页面
     num: 10, //每页条数
     key: '' //关键字
     };
     //新建订单 - 选择报价单 - 搜索
     $('.tanceng .ven_sell_order_create_choose_quote_search_btn').die('click).live('click', function () {
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
     $('.tanceng .ven_sell_order_create_choose_quote_save').die('click).live('click', function () {
     var chosenQuote = $('.tanceng .ven_sell_order_create_choose_quote_table input:checked').closest('tr');
     sellOrderCreateData.quote_id = chosenQuote.attr('vensellquoteid');
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
     }*/
    //新建订单 - 定义销售机会参数
    var sellOrderChooseChanceData = {
        token: token,
        page: 1, // 页面
        num: 10, // 每页条数
        keywords: '', // 关键字
        status: 0, // 销售状态 0进行中1成交2未成交
        dept: '', // 负责部门
        uid: '', // 创建人
        owner: '', // 跟进人
        is_invalid: 0 // 0 正常 1作废 空是所有
    };
    // 新建订单 - 获取销售机会列表
    function getSellOrderChooseChanceList() {
        $.ajax({
            url: SERVER_URL + '/customer-chance/mylist',
            type: 'GET',
            data: sellOrderChooseChanceData,
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    //获取datalist
                    var datalist = oE.datalist;
                    console.log(datalist);
                    //搜索总条数
                    $('.tanceng .ven_sell_order_create_choose_chance_total').html(oE.totalcount);
                    if (datalist.length == 0) {
                        $('.ven_sell_order_create_choose_chance_nodata_box').removeClass('none');
                        $('.ven_sell_order_create_choose_chance_handle').addClass('none')
                    } else {
                        $('.ven_sell_order_create_choose_chance_nodata_box').addClass('none');
                        $('.ven_sell_order_create_choose_chance_handle').removeClass('none')
                    }
                    //字符串拼接
                    var sellChanceHtml = '';
                    $.each(datalist, function (i, v) {
                        sellChanceHtml += '<tr sellchanceid="' + v['id'] + '" sellchancecustomerid="' + v['customer_id'] + '">\
                             <td style="text-align: center;"><input type="radio" ' + (i == 0 ? 'checked' : '') + ' name="123"></td>\
                             <td>' + (v['name']) + '</td>\
                             <td>' + (v['expected_at'].split(' ')[0]) + '</td>\
                             <td>' + (v['expected_money']) + '</td>\
                             <td>' + (v['step_name']) + '</td>\
                             <td>' + (v['track_num']) + '</td>\
                             <td>' + (v['track_date'].split(' ')[0]) + '</td>\
                             <td>' + (v['dept_name']) + '</td>\
                             <td>' + (v['owner_name']) + '</td>\
                             <td>' + (v['uname']) + '</td>\
                             <td>' + (v['created_at'].split(' ')[0]) + '</td>\
                             </tr>';
                    });
                    //销售机会数据渲染
                    $('.tanceng .ven_sell_order_create_choose_chance_list').html(sellChanceHtml);
                }
                //分页
                list_table_render_pagination('.ven_sell_order_create_choose_chance_all_page', sellOrderChooseChanceData, getSellOrderChooseChanceList, oE.totalcount, datalist.length);
            }
        });
    }

    //新建订单 - 选择销售机会
    $('.tanceng .ven_sell_order_create_choose_chance_btn').die('click').live('click', function () {
        getSellOrderChooseChanceList();
    });
    //新建订单 - 销售机会 - 搜索关键字
    $('.tanceng .ven_sell_order_create_choose_chance_search_btn').die('click').live('click', function () {
        if ($('.tanceng .ven_sell_order_create_choose_chance_search_inp').val() == '搜索客户名称') {
            sellOrderChooseChanceData.keywords = '';
        } else {
            sellOrderChooseChanceData.keywords = $('.tanceng .ven_sell_order_create_choose_chance_search_inp').val();
        }
        getSellOrderChooseChanceList()
    });
    //新建订单 - 选择销售机会 - 保存
    $('.tanceng .ven_sell_order_create_choose_chance_save').die('click').live('click', function () {
        var sellOrderChanceChosen = null;
        $.each($('.tanceng .ven_sell_order_create_choose_chance_list tr'), function (i, v) {
            if ($('.tanceng .ven_sell_order_create_choose_chance_list tr').eq(i).find('input:radio').is(':checked')) {
                sellOrderChanceChosen = {
                    'title': $('.tanceng .ven_sell_order_create_choose_chance_list tr').eq(i).attr('sellchanceid'),
                    'value': $('.tanceng .ven_sell_order_create_choose_chance_list tr').eq(i).find('td').eq(1).text()
                }
            }
        });
        //新建销售报价单用
        $('.tanceng .ven_sell_order_create_choose_chance_inp').val(sellOrderChanceChosen['value']);
        sellOrderCreateData.chance_id = sellOrderChanceChosen['title'];
        $(this).closest('.dialog_box').remove();
    });

    //新建销售订单 - 选择销售合同

    //定义选择销售合同参数
    var getContractData = {
        token: token,
        thetype: 1,
        page: 1,
        num: 10,
        keywords: ''
    };
    $('.tanceng .ven_sell_order_create_choose_contract').die('click').live('click', function () {
        getContractFn();
    });
    //搜索销售合同
    $('.tanceng .ven_sell_order_create_choose_contract_search_btn').die('click').live('click', function () {
        if ($('.tanceng .ven_sell_order_create_choose_contract_search_inp').val() == '请输入关键字') {
            getContractData.keywords = '';
        } else {
            getContractData.keywords = $('.tanceng .ven_sell_order_create_choose_contract_search_inp').val();
        }
        getContractFn();
    });
    //选择销售合同 - 确定
    $('.tanceng .ven_sell_order_create_choose_contract_save').die('click').live('click', function () {
        var chosenContract = $('.tanceng .ven_sell_order_create_choose_contract_list input:checked').closest('tr');
        sellOrderCreateData.contract_id = chosenContract.attr('contractid');
        sellOrderCreateData.quote_id = chosenContract.attr('vensellquoteid');
        sellOrderCreateData.customer_id = chosenContract.attr('vensellquotecustomid');
        sellOrderCreateData.dept = chosenContract.attr('vensellquotedept');
        sellOrderCreateData.owner = chosenContract.attr('vensellquoteowner');
        $('.tanceng .ven_sell_order_create_choose_contract_inp').val(chosenContract.find('td').eq(1).html()).addClass('c_3');
        $('.tanceng .ven_sell_order_link_quote_code_inp').val(chosenContract.attr('vensellquotecode'));
        $('.tanceng .ven_sell_order_create_custom_name').val(chosenContract.find('td').eq(5).html());
        $('.tanceng .ven_sell_order_create_dept').val(chosenContract.attr('vensellquotedeptname'));
        $('.tanceng .ven_sell_order_create_owner').val(chosenContract.attr('vensellquoteownername'));
        $('.tanceng .ven_sell_order_create_open_account').val(chosenContract.attr('venopenaccount'));
        $('.tanceng .ven_sell_order_look_quote_detail_btn').addClass('val_dialogTop').css('color', '#23a2f3').removeAttr('disabled');
        $('.tanceng .sell_order_create_look_cksp_detail_btn').addClass('val_dialogTop but_blue').removeClass('but_grey1').removeAttr('disabled');

        //推送出库 - 相关往来名称
        sellOrderToOutStockData.related_business_name = $('.tanceng .ven_sell_order_create_custom_name').val();
        //推送收款 - 相关往来名称
        sellOrderToReceiptData.name = $('.tanceng .ven_sell_order_create_custom_name').val();
        //推送付票 - 相关业务名称
        sellOrderToOutPutTicketData.cs_name = $('.tanceng .ven_sell_order_create_custom_name').val();

        //获取合同详情
        getContractDetailFn();

        //获取报价单详情
        sellOrderLookQuoteDetailFn(sellOrderCreateData.quote_id);

        $(this).closest('.dialog_box').remove();
    });
    function getContractFn() {
        $.ajax({
            url: SERVER_URL + '/market-contract/list',
            type: 'GET',
            data: getContractData,
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    //搜索总条数
                    $('.tanceng .ven_sell_order_create_choose_contract_total').html(oE.totalcount);
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
                        html += '<tr contractid="' + v['id'] + '" vensellquoteid="' + v['quote_id'] + '" vensellquotecode="' + v['market_quote_sn'] + '" vensellquotecustomid="' + v['customer_id'] + '" vensellquotedept="' + v['dept_id'] + '" vensellquoteowner="' + v['owner_id'] + '" vensellquotedeptname="' + v['dept_name'] + '" vensellquoteownername="' + v['owner_name'] + '" venopenaccount="' + v['open_account'] + '">\
                                    <td><input type="radio" name="xs_xsdd_xzxsthinp" ' + (i == 0 ? 'checked' : '') + '></td>\
                                    <td>' + likNullData(v['market_sn']) + '</td>\
                                    <td>' + likNullData(v['market_order_sn']) + '</td>\
                                    <td>' + likNullData(v['name']) + '</td>\
                                    <td>' + likNullData(v['created_at'].split(' ')[0]) + '</td>\
                                    <td>' + likNullData(v['customer_name']) + '</td>\
                                    <td>' + likNullData(v['status_name']) + '</td>\
                                    <td>' + likNullData(v['flow_name']) + '</td>\
                                </tr>'
                    });
                    $('.tanceng .ven_sell_order_create_choose_contract_list').html(html); //分页
                    list_table_render_pagination('.tanceng .ven_sell_order_create_choose_contract_pagination', getContractData, getContractFn, oE.totalcount, datalist.length);
                } else {
                    alert('操作失败')
                }
            }
        });
    }

    //获取合同详情
    function getContractDetailFn() {
        $.ajax({
            url: SERVER_URL + '/market-contract/info',
            type: 'GET',
            data: {
                token: token,
                id: sellOrderCreateData.contract_id
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var data = oE.data;
                    console.log(data);
                    //推送付票 - 付票阶段
                    var finSteps = [];
                    //回款流程
                    var payflowHtml = '';
                    sellOrderCreateData.return_money_steps = JSON.stringify(data['payflow_list']);
                    sellOrderCreateData.pay_ticket_steps = JSON.stringify(data['payflow_list']);
                    if(data['payflow_list'] && data['payflow_list'].length > 0){
                        $.each(data['payflow_list'], function (i, v) {
                            payflowHtml += '<tr>\
                                        <td>阶段' + (i + 1) + '</td>\
                                        <td>' + likNullData(v['pay_time']) + '</td>\
                                        <td>' + likNullData(v['no_pay_money']) + '</td>\
                                        </tr>';
                            finSteps.push({
                                expected_day: v['pay_time'],
                                no_pay_money: v['no_pay_money']
                            })
                        });
                    }
                    $('.tanceng .sell_order_create_payflow_tbody').html(payflowHtml);
                    //收货人
                    var cusContactHtml = '';
                    if(data['customer_contact'] && data['customer_contact'] > 0){
                        $.each(data['customer_contact'], function (i, v) {
                            cusContactHtml += '<li cuscontel="' + v['tel'] + '">' + v['name'] + '</li>'
                        });
                    }
                    $('.tanceng .sell_order_create_cus_contact_ul').html(cusContactHtml);
                    //收货地址
                    $('.tanceng .sell_order_create_cus_addr').val(data['customer_address']);

                    //推送收款 - 结算账户id
                    sellOrderToReceiptData.company_account_id = data['chance_account'];
                    //推送付票 - 结算账户id
                    sellOrderToOutPutTicketData.company_account_id = data['chance_account'];
                    if(finSteps[0]){
                        sellOrderToOutPutTicketData.expected_day = finSteps[0]['expected_day'];
                    }
                    sellOrderToOutPutTicketData.no_pay_money = $('.tanceng .sell_order_create_money_total').html();
                    sellOrderToOutPutTicketData.steps = arrayToJson(finSteps);

                } else {
                    alert('操作失败')
                }
            }
        });
    }

    //查看报价单详情
    $('.ven_sell_order_look_quote_detail_btn').die('click').live('click', function () {
        sellOrderLookQuoteDetailFn(sellOrderCreateData.quote_id);
    });
    //根据是否有关联借出单判断是否推送出库
    var sellOrderToOutStockOnOff = false;
    //报价单详情函数
    function sellOrderLookQuoteDetailFn(sellOrderLinkQuoteId) {
        $.ajax({
            url: SERVER_URL + '/quote/detail',
            type: 'GET',
            data: {
                token: token,
                quote_id: sellOrderLinkQuoteId
            },
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                if (oE.code == 0) {

                    var data = oE.data;

                    //根据是否有关联借出单判断是否推送出库
                    if(data['lend_code_sn'] != null){
                        sellOrderToOutStockOnOff = false;
                    }else{
                        sellOrderToOutStockOnOff = true;
                    }

                    //基本信息
                    //借出单转销售报价单提示框
                    if (data['lend_id'] != 0) {
                        $('.xs_xsdd_lend_to_order').clone().css('display', 'block').appendTo('.tanceng');
                        $('.tanceng .sell_order_create_ckxx_box').addClass('none');
                    } else {
                        $('.tanceng .sell_order_create_ckxx_box').removeClass('none');
                    }
                    //税率
                    if (data['tax_rate'] == 0) {
                        $('.tanceng .sell_order_create_tax_rate').val('无税');
                        //推送收款 - 税率
                        sellOrderToReceiptData.tax_status = 0;
                    } else {
                        $('.tanceng .sell_order_create_tax_rate').val('含税17%');
                        //推送收款 - 税率
                        sellOrderToReceiptData.tax_status = 1;
                    }
                    //承担运费
                    $('.sell_order_create_freight').val(data['is_freight'] == 1 ? '包运费' : '不包运费');
                    //推送出库 - 承担运费
                    sellOrderToOutStockData.is_package_freight = data['is_freight'];
                    //物流方式
                    sellOrderCreateData.transport_type = data['logistics_type'];
                    //推送出库 - 物流方式
                    sellOrderToOutStockData.logistics_way = data['logistics_type'];
                    if (data['logistics_type'] == 1) {
                        $('.sell_order_create_logistics').val('快递');
                    } else if (data['logistics_type'] == 2) {
                        $('.sell_order_create_logistics').val('陆运');
                    } else if (data['logistics_type'] == 3) {
                        $('.sell_order_create_logistics').val('陆运');
                    } else if (data['logistics_type'] == 4) {
                        $('.sell_order_create_logistics').val('平邮');
                    } else if (data['logistics_type'] == 5) {
                        $('.sell_order_create_logistics').val('海运');
                    }
                    //基本信息end

                    //创建日期
                    $('.tanceng .ven_sell_order_look_quote_detail_created_at').html(data['created_at']);
                    //创建人
                    $('.tanceng .ven_sell_order_look_quote_detail_owner').html(data['owner']);
                    //编号
                    $('.tanceng .ven_sell_order_look_quote_detail_code_sn').html(data['code_sn']);
                    //客户
                    $('.tanceng .ven_sell_order_look_quote_detail_customer_name').html(data['customer_name']);
                    //承担运费
                    $('.tanceng .ven_sell_order_look_quote_detail_is_freight').html(data['is_freight'] == 1 ? '包运费' : '不包运费');
                    //物流方式
                    var logistics = '';
                    if (data['logistics_type'] == 1) {
                        logistics = '快递';
                    } else if (data['logistics_type'] == 2) {
                        logistics = '陆运';
                    } else if (data['logistics_type'] == 3) {
                        logistics = '陆运';
                    } else if (data['logistics_type'] == 4) {
                        logistics = '平邮';
                    } else if (data['logistics_type'] == 5) {
                        logistics = '海运';
                    }
                    $('.tanceng .ven_sell_order_look_quote_detail_logistics').html(logistics);
                    //负责部门
                    $('.tanceng .ven_sell_order_look_quote_detail_dept').html(data['dept']);

                    //推送出库
                    var productInfoArr = [];

                    //基本商品
                    var goodsHtml = '';
                    if (data['steps']['product_json']['goods']) {
                        sellOrderCreateData.goods = arrayToJson(data['steps']['product_json']['goods']);
                        $('.tanceng .ven_sell_order_look_quote_detail_goods_box').css('display', 'block');
                        var goodsArr = data['steps']['product_json']['goods']['goods'];
                        $.each(goodsArr, function (i, v) {
                            goodsHtml += '<tr>\
                                        <td>' + l_dbl(i + 1) + '</td>\
                                        <td>' + v['good_sn'] + '</td>\
                                        <td>' + v['good_name'] + '</td>\
                                        <td>' + v['good_attr'] + '</td>\
                                        <td>' + v['good_num'] + v['good_unit'] + '</td>\
                                        <td class="xs_bjd_td xs_goods_box" style="position: relative;padding:8px 10px;">\
                                            <div>\
                                            <span>￥' + v['good_price'] + '</span><i class="' + (v['up_down'] == 1 ? 'ven_warning_arrow_up' : 'ven_warning_arrow') + ' xs_goods_down_img ' + (v['up_down'] == 0 ? 'none' : '') + '"></i>\
                                            </div>\
                                            <div class="work_vent_client_contMsgBox" style="display: none;top: 4px;left: 94px">\
                                            <i class="work_vent_client_torr"></i>\
                                            <div class="work_vent_client_contMsgBoxDet fnc_output_ticket_total_remain_ticket_num_list">' + (v['up_down'] == 1 ? '高' : '低') + '于 ' + v['good_retail_price'] + '(零售价)</div>\
                                        </div>\
                                        </td>\
                                        <td>￥' + v['good_rate_price'] + '</td>\
                                        <td>￥' + v['good_total'] + '</td>\
                                        <td></td>\
                                        </tr>';
                            //推送出库 - 基本商品信息
                            productInfoArr.push({
                                product_id: v['good_id'],
                                product_type: 1,
                                output_num: v['good_num']
                            })
                        });
                    } else {
                        $('.tanceng .ven_sell_order_look_quote_detail_goods_box').css('display', 'none');
                    }
                    $('.tanceng .ven_sell_order_look_quote_detail_goods_list').html(goodsHtml);

                    //套餐商品
                    var packageHtml = '';
                    if (data['steps']['product_json']['package']) {
                        sellOrderCreateData.package = arrayToJson(data['steps']['product_json']['package']);
                        $('.tanceng .ven_sell_order_look_quote_detail_package_box').css('display', 'block');
                        var packageArr = data['steps']['product_json']['package']['package'];
                        $.each(packageArr, function (i, v) {
                            var packageGoods = '';
                            $.each(v['good_list'], function (i2, v2) {
                                var packageGoodsInfo = '';
                                $.each(v2['attr_list'], function (i3, v3) {
                                    packageGoodsInfo += '<tr>\
                                    <td>' + v3['good_sn'] + '</td>\
                                    <td>' + v3['good_attr'] + '</td>\
                                    <td>' + v3['total_num'] + '</td>\
                                    <td></td>\
                                    </tr>'
                                    //推送出库 - 套餐商品信息
                                    productInfoArr.push({
                                        product_id: v3['good_id'],
                                        product_type: 2,
                                        output_num: v3['total_num'],
                                        product_type_no: v['package_sn'],
                                        product_type_name: v['package_name']
                                    })
                                });
                                packageGoods += '<table class="xs_bjd_table_1">\
                                    <thead>\
                                    <tr style="background: #fff;">\
                                    <th class="c_3" style="font-weight: 100;">' + v2['title'] + '</th>\
                                    <th></th>\
                                    <th></th>\
                                    </tr>\
                                    <tr>\
                                    <th width="127">编号</th>\
                                    <th width="853">属性</th>\
                                    <th width="90">数量</th>\
                                    <th width="60"></th>\
                                    </tr>\
                                    </thead>\
                                    <tbody>' + packageGoodsInfo + '</tbody>\
                                    </table>';

                            });
                            packageHtml += '<div class="xs_div_2"' + (i == 0 ? ' style="margin-top: 20px;"' : '') + '>\
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
                            <tr class="c_3 xs_bjd_bold">\
                            <td width="30">' + l_dbl(i + 1) + '</td>\
                            <td width="140">' + v['package_sn'] + '</td>\
                            <td width="150">' + v['package_name'] + '</td>\
                            <td width="340">-</td>\
                            <td width="50">' + v['package_num'] + '</td>\
                            <td width="150" class="xs_bjd_td xs_goods_box" style="position: relative;">\
                            <span>￥' + v['package_price'] + '</span>\
                            </td>\
                            <td width="90">￥' + v['package_rate_price'] + '</td>\
                            <td width="90">￥' + v['package_total'] + '</td>\
                            <td width="60">\
                            <button class="but_mix box_open_btn_1 but_blue_1">展开</button>\
                            </td>\
                            </tr>\
                            </tbody>\
                            </table>\
                            </div>\
                            <div class="xs_tc_goods_box goods_tc_toggle" style="display: none;">' + packageGoods + '</div>';

                        });
                        $('.tanceng .ven_sell_order_look_quote_detail_package_total').html(data['steps']['product_json']['package']['sum_total']);
                    } else {
                        $('.tanceng .ven_sell_order_look_quote_detail_package_box').css('display', 'none');
                    }

                    $('.tanceng .ven_sell_order_look_quote_detail_package_list').html(packageHtml);

                    //整机商品
                    var settingHtml = '';
                    if (data['steps']['product_json']['setting']) {
                        sellOrderCreateData.setting = arrayToJson(data['steps']['product_json']['setting']);
                        $('.tanceng .ven_sell_order_look_quote_detail_setting_box').css('display', 'block');
                        var settingArr = data['steps']['product_json']['setting']['setting'];
                        console.log(settingArr);
                        var settingGoodsArr = [];
                        $.each(settingArr, function (i, v) {
                            var settingGoods = '';
                            if (v['optional'] == 1) {
                                //可选配
                                $.each(v['good_list'], function (i2, v2) {
                                    var settingGoodsInfo = '';
                                    $.each(v2['attr_list'], function (i3, v3) {
                                        settingGoodsInfo += '<tr>\
                                        <td>' + v3['good_sn'] + '</td>\
                                        <td>' + v3['good_attr'] + '</td>\
                                        <td>' + v3['total_num'] + '</td>\
                                        <td>￥' + v3['good_price'] + '</td>\
                                        <td>￥' + v3['good_rate_price'] + '</td>\
                                        <td>￥' + v3['good_total'] + '</td>\
                                        <td></td>\
                                        </tr>';
                                        //推送出库
                                        settingGoodsArr.push({
                                            product_id: v3['good_id'],
                                            num: v3['total_num']
                                        });
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
                                })
                            } else if (v['optional'] == 2) {
                                //不可选配
                                $.each(v['good_list'], function (i2, v2) {
                                    var settingGoodsInfo = '';
                                    $.each(v2['attr_list'], function (i3, v3) {
                                        settingGoodsInfo += '<tr>\
                                        <td>' + v3['good_sn'] + '</td>\
                                        <td>' + v3['good_attr'] + '</td>\
                                        <td>' + v3['total_num'] + '</td>\
                                        <td></td>\
                                        </tr>';
                                        //推送出库
                                        settingGoodsArr.push({
                                            product_id: v3['good_id'],
                                            num: v3['sing_num']
                                        });
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
                                        </table>';
                                })
                            }

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
                            <td width="150">' + v['setting_name'] + '（' + (v['optional'] == 1 ? '可选配' : '不可选配') + '）</td>\
                            <td width="340">' + v['setting_attr'] + '</td>\
                            <td width="50">' + v['setting_num'] + '</td>\
                            <td width="150" class="xs_bjd_td xs_goods_box" style="position: relative;">\
                            <div>\
                            <span>￥' + v['setting_price'] + '</span><i class="' + (v['up_down'] == 1 ? 'ven_warning_arrow_up' : 'ven_warning_arrow') + ' xs_goods_down_img ' + (v['up_down'] == 0 ? 'none' : '') + '"></i>\
                            </div>\
                            <div class="work_vent_client_contMsgBox" style="display: none;top: 3px;left: 94px">\
                            <i class="work_vent_client_torr"></i>\
                            <div class="work_vent_client_contMsgBoxDet fnc_output_ticket_total_remain_ticket_num_list" style="font-weight: 100;">' + (v['up_down'] == 1 ? '高' : '低') + '于 ' + v['setting_retail_price'] + '(零售价)</div>\
                            </div>\
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

                            //推送出库 - 整机商品信息
                            productInfoArr.push({
                                product_id: v['setting_id'],
                                product_type: 3,
                                output_num: v['setting_num'],
                                product_type_no: v['setting_sn'],
                                product_type_name: v['setting_name'],
                                set_detail: settingGoodsArr
                            });
                        });
                        $('.tanceng .ven_sell_order_look_quote_detail_setting_total').html(data['steps']['product_json']['setting']['sum_total']);
                    } else {
                        $('.tanceng .ven_sell_order_look_quote_detail_setting_box').css('display', 'none');
                    }
                    //推送出库 - 商品明细
                    console.log(productInfoArr);
                    sellOrderToOutStockData.product_info = arrayToJson(productInfoArr);

                    $('.tanceng .ven_sell_order_look_quote_detail_setting_list').html(settingHtml);

                    //单价合计
                    $('.tanceng .ven_sell_order_look_quote_detail_money_sum').html(data['steps']['product_json']['money_sum']);

                    //合计税额
                    $('.tanceng .ven_sell_order_look_quote_detail_tax_money_sum').html(data['steps']['product_json']['tax_money_sum']);

                    //其他费用
                    $('.tanceng .ven_sell_order_look_quote_detail_other_free').html(data['steps']['product_json']['other_free']);

                    //总计金额
                    $('.tanceng .ven_sell_order_look_quote_detail_totals').html(data['steps']['product_json']['totals']);
                    //总计金额
                    $('.tanceng .sell_order_create_money_total').html(data['steps']['product_json']['totals']);
                    sellOrderCreateData.totals = data['steps']['product_json']['totals'];
                    //推送收款 - 应收款
                    sellOrderToReceiptData.no_pay_money = data['steps']['product_json']['totals'];

                    //备注
                    $('.tanceng .ven_sell_quote_detail_note').html(data['steps']['product_json']['note']);
                }
            },
            error: function (e) {
                alert(e.msg);
            }
        });
    }

    //选择付款方式
    $('.tanceng .sell_order_create_choice_way_ul li').die('click').live('click', function () {
        sellOrderCreateData.way = $(this).index() + 1;
        sellOrderToReceiptData.receipt_way = $(this).index() + 1;
    });
    //选择收货人
    $('.tanceng .sell_order_create_cus_contact_ul li').die('click').live('click', function () {
        $('.tanceng .sell_order_create_cus_contact_tel_inp').val($(this).attr('cuscontel'));
    });
    //查看出库商品
    $('.tanceng .sell_order_create_look_cksp_detail_btn').die('click').live('click', function () {
        $.ajax({
            url: SERVER_URL + '/quote/detail',
            type: 'GET',
            data: {
                token: token,
                quote_id: sellOrderCreateData.quote_id
            },
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                if (oE.code == 0) {
                    var data = oE.data;
                    //基本商品
                    var goodsHtml = '';
                    if (data['steps']['product_json']['goods']) {
                        $('.tanceng .sell_order_look_cksp_detail_goods_box').css('display', 'block');
                        var goodsArr = data['steps']['product_json']['goods']['goods'];
                        $.each(goodsArr, function (i, v) {
                            goodsHtml += '<tr>\
                                        <td>' + l_dbl(i + 1) + '</td>\
                                        <td>' + v['good_sn'] + '</td>\
                                        <td>' + v['good_name'] + '</td>\
                                        <td>' + v['good_attr'] + '</td>\
                                        <td>' + v['good_num'] + v['good_unit'] + '</td>\
                                        </tr>';
                        });
                    } else {
                        $('.tanceng .sell_order_look_cksp_detail_goods_box').css('display', 'none');
                    }
                    $('.tanceng .sell_order_look_cksp_detail_goods_list').html(goodsHtml);

                    //套餐商品
                    var packageHtml = '';
                    if (data['steps']['product_json']['package']) {
                        $('.tanceng .sell_order_look_cksp_detail_package_box').css('display', 'block');
                        var packageArr = data['steps']['product_json']['package']['package'];
                        $.each(packageArr, function (i, v) {
                            var packageGoods = '';
                            $.each(v['good_list'], function (i2, v2) {
                                var packageGoodsInfo = '';
                                $.each(v2['attr_list'], function (i3, v3) {
                                    packageGoodsInfo += '<tr>\
                                    <td>' + v3['good_sn'] + '</td>\
                                    <td>' + v3['good_attr'] + '</td>\
                                    <td>' + v3['total_num'] + '</td>\
                                    <td></td>\
                                    </tr>'
                                });
                                packageGoods += '<table class="xs_bjd_table_1">\
                                    <thead>\
                                    <tr style="background: #fff;">\
                                    <th class="c_3" style="font-weight: 100;">' + v2['title'] + '</th>\
                                    <th></th>\
                                    <th></th>\
                                    </tr>\
                                    <tr>\
                                    <th width="200">编号</th>\
                                    <th width="470">属性</th>\
                                    <th width="50">数量</th>\
                                    <th width="60"></th>\
                                    </tr>\
                                    </thead>\
                                    <tbody>' + packageGoodsInfo + '</tbody>\
                                    </table>';
                            });
                            packageHtml += '<div class="xs_div_2"' + (i == 0 ? ' style="margin-top: 20px;"' : '') + '>\
                            <table class="xs_bjd_table">\
                            <thead class="' + (i == 0 ? '' : 'none') + '">\
                            <tr>\
                            <th width="40">序号</th>\
                            <th width="140">编号</th>\
                            <th width="150">名称</th>\
                            <th width="285">属性</th>\
                            <th width="50">数量</th>\
                            <th width="55">配件</th>\
                            </tr>\
                            </thead>\
                            <tbody>\
                            <tr class="c_3 xs_bjd_bold">\
                            <td width="40">' + l_dbl(i + 1) + '</td>\
                            <td width="140">' + v['package_sn'] + '</td>\
                            <td width="150">' + v['package_name'] + '</td>\
                            <td width="285">-</td>\
                            <td width="50">' + v['package_num'] + '</td>\
                            <td width="55">\
                            <button class="but_mix box_open_btn_1 but_blue_1 but_look">展开</button>\
                            </td>\
                            </tr>\
                            </tbody>\
                            </table>\
                            </div>\
                            <div class="xs_tc_goods_box goods_tc_toggle" style="display: none;">' + packageGoods + '</div>';
                        });
                    } else {
                        $('.tanceng .sell_order_look_cksp_detail_package_box').css('display', 'none');
                    }

                    $('.tanceng .sell_order_look_cksp_detail_package_list').html(packageHtml);

                    //整机商品
                    var settingHtml = '';
                    if (data['steps']['product_json']['setting']) {
                        $('.tanceng .sell_order_look_cksp_detail_setting_box').css('display', 'block');
                        var settingArr = data['steps']['product_json']['setting']['setting'];
                        console.log(settingArr);
                        $.each(settingArr, function (i, v) {
                            var settingGoods = '';
                            if (v['optional'] == 1) {
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
                                        <th width="200">编号</th>\
                                        <th width="470">属性</th>\
                                        <th width="50">数量</th>\
                                        <th width="60"></th>\
                                        </tr>\
                                        </thead>\
                                        <tbody>' + settingGoodsInfo + '</tbody>\
                                        </table>'
                                })
                            } else if (v['optional'] == 2) {
                                //不可选配
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
                                        <th width="200">编号</th>\
                                        <th width="470">属性</th>\
                                        <th width="50">数量</th>\
                                        <th width="60"></th>\
                                        </tr>\
                                        </thead>\
                                        <tbody>' + settingGoodsInfo + '</tbody>\
                                        </table>';
                                })
                            }

                            settingHtml += '<div class="xs_div_2" ' + (i == 0 ? ' style="margin-top: 20px;"' : '') + '>\
                            <table class="xs_bjd_table">\
                            <thead class="' + (i == 0 ? '' : 'none') + '">\
                            <tr>\
                            <th width="40">序号</th>\
                            <th width="140">编号</th>\
                            <th width="150">名称</th>\
                            <th width="285">属性</th>\
                            <th width="50">数量</th>\
                            <th width="55">配件</th>\
                            </tr>\
                            </thead>\
                            <tbody>\
                            <tr class="c_3 c_3 xs_bjd_bold">\
                            <td width="40">' + l_dbl(i + 1) + '</td>\
                            <td width="140">' + v['setting_sn'] + '</td>\
                            <td width="150">' + v['setting_name'] + '（' + (v['optional'] == 1 ? '可选配' : '不可选配') + '）</td>\
                            <td width="285">' + v['setting_attr'] + '</td>\
                            <td width="50">' + v['setting_num'] + '</td>\
                            <td width="55">\
                            <button class="but_mix box_open_btn_1 but_blue_1">展开</button>\
                            </td>\
                            </tr>\
                            </tbody>\
                            </table>\
                            </div>\
                            <div class="xs_tc_goods_box goods_tc_toggle" style="display: none;">' + settingGoods + '</div>';
                        });
                    } else {
                        $('.tanceng .sell_order_look_cksp_detail_setting_box').css('display', 'none');
                    }

                    $('.tanceng .sell_order_look_cksp_detail_setting_list').html(settingHtml);
                }
            },
            error: function (e) {
                alert(e.msg);
            }
        });
    });

    //新建销售订单 - 选择物流方式
    $('.tanceng .ven_sell_order_create_choose_transport_ul li').die('click').live('click', function () {
        sellOrderCreateData.transport_type = $(this).index();
    });

    //新建销售订单 - 选择抄送人
    $('.tanceng .ven_sell_order_create_choose_copy_btn').die('click').live('click', function () {
        venSellOrderChooseCopy()
    });

    //选择抄送人
    function venSellOrderChooseCopy() {
        $.ajax({
            type: "get",
            url: SERVER_URL + "/dept/deptlist",
            data: {token: token},
            dataType: 'json',
            success: function (oE) {
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
                    $('i.list_choose_delete').die('click').live('click', function () {
                        $(this).closest('li').remove();
                        $('.tanceng .ven_sell_contract_create_choose_copy_list ul .li_person[userinfoid = "' + $(this).closest('li').attr('userinfoid') + '"]').find('em').removeClass('on');
                    });
                    //选择人员保存
                    $('.tanceng .ven_sell_contract_choose_copy_save').die('click').live('click', function () {
                        sellOrderCreateData.copy_list = [];  // 声明对象要区分开
                        var copyChosen = '';
                        if ((typeof sellOrderCreateData.copy_list) == 'string') {
                            sellOrderCreateData.copy_list = sellOrderCreateData.copy_list.split(',');
                        }
                        $.each($('.tanceng .ven_sell_contract_create_copy_chosen_list li'), function (i, v) {
                            copyChosen += '<li class="ven_sell_order_copy_list_li" style="float:left;margin-right:23px;position:relative;" userinfoid="' + $('.tanceng .ven_sell_contract_create_copy_chosen_list').find('li').eq(i).attr('userinfoid') + '">\
                                <i class="del_img_1">-</i><em class="icon_personBtn icon_personBtn_msg"></em>\
                                <em class="icon_adderBtn"></em>\
                                <p class="box_adderName">' + $('.tanceng .ven_sell_contract_create_copy_chosen_list').find('li').eq(i).text() + '</p>\
                                </li>';
                            sellOrderCreateData.copy_list.push($('.tanceng .ven_sell_contract_create_copy_chosen_list').find('li').eq(i).attr('userinfoid'));
                        });
                        $('.tanceng .ven_sell_contract_create_add_copy_list').html(copyChosen);
                        $(this).closest('.dialog_box').remove();
                    })
                }
            },
            error: function (data) {

            }
        });
    }

    //生成销售订单
    $('.tanceng .ven_sell_order_create_submit').die('click').live('click', function () {
        if ($('.tanceng .ven_sell_order_create_choose_contract_inp').val() == '选择销售合同') {
            alert('请选择销售合同');
            return false;
        }
        if ($('.tanceng .sell_order_create_choice_way_inp').val() == '请选择付款方式') {
            alert('请选择付款方式');
            return false;
        }
        if ($('.tanceng .ven_sell_order_create_delivery_at_inp').val() == '请选择日期') {
            alert('请选择发货时间');
            return false;
        }
        if ($('.tanceng .sell_order_create_cus_contact_inp').val() == '请选择收货人') {
            alert('请选择收货人');
            return false;
        }
        if ($('.tanceng .sell_order_create_cus_addr').val() == '' || $('.tanceng .sell_order_create_cus_addr').val() == '请输入收货地址') {
            alert('请输入收货地址');
            return false;
        }
        //备注
        if ($('.tanceng .ven_sell_order_create_note_text').val() == '请输入备注') {
            sellOrderCreateData.note = ''
            sellOrderToOutStockData.remark = ''
        } else {
            sellOrderCreateData.note = $('.tanceng .ven_sell_order_create_note_text').val();
            sellOrderToOutStockData.remark = $('.tanceng .ven_sell_order_create_note_text').val();
        }
        //订单编号
        sellOrderCreateData.code_sn = $('.tanceng .ven_sell_order_create_code_sn_inp').val();
        //报价单编号
        sellOrderCreateData.quote_code_sn = $('.tanceng .ven_sell_order_link_quote_code_inp').val();
        //客户名称
        sellOrderCreateData.customer_name = $('.tanceng .ven_sell_order_create_custom_name').val();
        //负责部门
        sellOrderCreateData.dept_name = $('.tanceng .ven_sell_order_create_dept').val();
        //负责人
        sellOrderCreateData.owner_name = $('.tanceng .ven_sell_order_create_owner').val();
        //结算账户
        sellOrderCreateData.account_name = $('.tanceng .ven_sell_order_create_open_account').val();
        //推送收款
        sellOrderToReceiptData.account_name = $('.tanceng .ven_sell_order_create_open_account').val();
        //推送付票 - 账户名称
        sellOrderToOutPutTicketData.name = $('.tanceng .ven_sell_order_create_open_account').val();
        sellOrderCreateData.owner_name = $('.tanceng .ven_sell_order_create_owner').val();
        //税率
        sellOrderCreateData.tax_rate = $('.tanceng .sell_order_create_tax_rate').val();
        //收货人
        sellOrderCreateData.receipt_person = $('.tanceng .sell_order_create_cus_contact_inp').val();

        //推送出库 - 收货人
        sellOrderToOutStockData.consignee = $('.tanceng .sell_order_create_cus_contact_inp').val();

        //收货人电话
        sellOrderCreateData.receipt_person_tel = $('.tanceng .sell_order_create_cus_contact_tel_inp').val();

        //推送出库 - 收货人电话
        sellOrderToOutStockData.consignee_tel = $('.tanceng .sell_order_create_cus_contact_tel_inp').val();
        //收货地址
        sellOrderCreateData.receipt_address = $('.tanceng .sell_order_create_cus_addr').val();
        //推送出库 - 收货地址
        sellOrderToOutStockData.consignee_addr = $('.tanceng .sell_order_create_cus_addr').val();
        //发货时间
        sellOrderCreateData.delivery_at = $('.tanceng .ven_sell_order_create_delivery_at_inp').val();
        //推送出库 - 发货时间
        sellOrderToOutStockData.output_time = $('.tanceng .ven_sell_order_create_delivery_at_inp').val();
        //抄送人
        if ((typeof sellOrderCreateData.copy_list) == 'string') {
            sellOrderCreateData.copy_list = sellOrderCreateData.copy_list.split(',')
        }
        sellOrderCreateData.copy_list = [];
        $.each($('.tanceng .ven_sell_order_copy_list_ul li.ven_sell_order_copy_list_li'), function (i, v) {
            sellOrderCreateData.copy_list.push($('.tanceng .ven_sell_order_copy_list_ul li.ven_sell_order_copy_list_li').eq(i).attr('userinfoid'));
        });
        sellOrderCreateData.copy_list = sellOrderCreateData.copy_list.join(',');
        console.log(sellOrderCreateData);
        $('.tanceng .ven_sell_order_create_success_dialog').css('display', 'none');
        console.log(sellOrderToOutStockData);
        $.ajax({
            url: SERVER_URL + '/order/add',
            type: 'POST',
            data: sellOrderCreateData,
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    $('.tanceng .dialog_box').not('[name="xs_xsdd_scxsd"]').remove();
                    getSellOrderList();
                    $('.tanceng .ven_sell_order_create_submit').attr('name', 'xs_xsdd_scxsd');
                    $('.tanceng').append($('.dialog_box[name="xs_xsdd_scxsd"]').css('display', 'block'));
                    $('.tanceng .ven_sell_order_create_success_code').html(sellOrderCreateData.code_sn);
                    //推送出库
                    if(sellOrderToOutStockOnOff){
                        sellOrderToOutStockFn();
                    }
                    //推送收款
                    sellOrderToReceiptData.last_id = oE.id;
                    sellOrderToReceiptFn();
                    //推送付票
                    sellOrderToOutPutTicketData.last_id = oE.id;
                    sellOrderToOutPutTicketFn();
                } else {
                    alert('操作失败')
                }
            }
        });
    });
    //推送出库函数
    function sellOrderToOutStockFn() {
        $.ajax({
            url: SERVER_URL + '/stocking-out/add',
            type: 'POST',
            data: sellOrderToOutStockData,
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
    function sellOrderToReceiptFn() {
        $.ajax({
            url: SERVER_URL + '/push/add',
            type: 'POST',
            data: sellOrderToReceiptData,
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
    function sellOrderToOutPutTicketFn() {
        $.ajax({
            url: SERVER_URL + '/push/outputticketadd',
            type: 'POST',
            data: sellOrderToOutPutTicketData,
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

    $('.tanceng .ven_sell_order_scxsd_submit').die('click').live('click', function () {
        $(this).closest('.dialog_box').remove();
        $('.tanceng').css('display', 'none');
    });

    //选择客户
    $('.tanceng .ven_sell_order_create_old_choose_customer').die('click').live('click', function () {
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
            dataType: 'json',
            success: function (oE) {
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
            dataType: 'json',
            success: function (oE) {
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
    $('.tanceng .ven_sell_order_create_choose_customer_sort li').die('click').live('click', function () {
        getCusListData.category_id = $(this).attr('cussortid');
        getCusList();
    });
    // 搜索关键字
    $('.tanceng .ven_sell_order_choose_customer_search_btn').die('click').live('click', function () {
        if ($('.tanceng .ven_sell_order_choose_customer_search_inp').val() == '搜索客户编号/客户名称') {
            getCusListData.key = ''
        } else {
            getCusListData.key = $('.tanceng .ven_sell_order_choose_customer_search_inp').val()
        }
        getCusList()
    });
    //搜索行业
    $('.tanceng .ven_sell_order_create_choose_customer_industry_list li').die('click').live('click', function () {
        getCusListData.industry_big_id = $(this).attr('industryid');
        getCusList()
    });
    //搜索客户级别
    $('.tanceng .ven_sell_order_create_choose_customer_grade_list li').die('click').live('click', function () {
        getCusListData.grade = $(this).index();
        getCusList();
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
            dataType: 'json',
            success: function (oE) {
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
            dataType: 'json',
            success: function (oE) {
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
    $('.tanceng .ven_sell_order_create_choose_customer_save').die('click').live('click', function () {
        var sellChanceCusChosen = null;
        var chosenCustom = $('.tanceng .ven_sell_order_cus_list input:checked').closest('tr');
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
        $('.tanceng .ven_sell_order_create_choose_customer_inp').val(sellChanceCusChosen['val']);
        $('.tanceng .ven_sell_order_create_choose_dept_inp').val(sellChanceCusChosen['dept']);
        $('.tanceng .ven_sell_order_create_choose_owner_inp').val(sellChanceCusChosen['owner']);
        $(this).closest('.dialog_box').remove();
    });

    //删除操作
    /*$('.ven_sell_order_del_btn').die('click).live('click', function () {
     $('#ven_sell_order_del_id').val($(this).closest('tr').attr('sellorderid'));
     });
     $('.ven_cus_visit_del').die('click).live('click', function () {
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
