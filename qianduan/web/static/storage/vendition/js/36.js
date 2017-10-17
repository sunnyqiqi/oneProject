var SERVER_URL = 'http://192.168.0.167:9091';
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

    function moneyToFixed(money) {
        return money.toFixed(2);
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
    //token = Admin.get_token();
    uid = Admin.get_uid();
    token = '2017052516045457073-1-1';
    //	补零函数
    function l_dbl(x) {
        return x < 10 ? '0' + x : x
    }

    //获取当前系统时间 - 短
    function getCurrentDateShort() {
        var oDate = new Date();
        var sTime = '';
        sTime = oDate.getFullYear() + '-' + l_dbl(oDate.getMonth() + 1) + '-' + l_dbl(oDate.getDate());
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

    var sellQuoteStepsArr = ['一次报价', '二次报价', '三次报价', '四次报价', '五次报价', '六次报价', '七次报价'];

    // 定义选择查看项
    var venSellQuoteLookAbledField = [
        {'index': null, 'field': '审批状态'},
        {'index': null, 'field': '审批人'},
        {'index': null, 'field': '销售商品类型'},
        {'index': null, 'field': '创建人'},
        {'index': null, 'field': '创建日期'},
        {'index': null, 'field': '负责部门'},
        {'index': null, 'field': '负责人'}
    ];
    likShow('#ven_sell_quote_table', venSellQuoteLookAbledField, '#ven_sell_quote_look_ul', '#ven_sell_quote_look_save', '#ven_sell_quote_look_reset');

    // 定义销售报价单参数
    var sellQuoteData = {
        token: token,
        page: 1, //页面
        num: 10, //每页条数
        key: '', //关键字
        is_invalid: 0, // 作废状态  0：正常 1：作废
        is_draft: 0, // 是否草稿,0不是1是
        status: '',
        flow: '',
        dept: '',
        owner: ''
    };
    // 定义销售报价单草稿参数
    var sellQuoteDraftData = {
        token: token,
        page: 1,
        num: 10,
        is_draft: 1
    };
    getSellQuoteList('/quote/mylist');
    $('#ven_sell_quote_my_list').live('click', function () {
        sellQuoteData.page = 1;
        getSellQuoteList('/quote/mylist');
    });
    $('#ven_sell_quote_tome_list').live('click', function () {
        sellQuoteData.page = 1;
        getSellQuoteList('/quote/mychecklist');
    });

    // 获取销售报价单列表
    function getSellQuoteList(url) {
        $.ajax({
            url: SERVER_URL + url,
            type: 'GET',
            data: sellQuoteData,
            success: function (e) {
                // 将返回值转换为json对象
                var oE = eval("(" + e + ")");
                console.log(oE);
                if (oE.code == 0) {
                    //搜索总条数
                    $('#ven_sell_quote_total').html(oE.totalcount);
                    //获取datalist
                    var datalist = oE.datalist;
                    if (datalist.length == 0) {
                        $('.ven_sell_quote_nodata_box').removeClass('none');
                        $('.ven_sell_quote_handle').addClass('none');
                    } else {
                        $('.ven_sell_quote_nodata_box').addClass('none');
                        $('.ven_sell_quote_handle').removeClass('none');
                    }
                    //字符串拼接
                    var sellQuoteHtml = '';
                    $.each(datalist, function (i, v) {
                        // 审批状态判断
                        //status:    '1' '审批中','2' '未通过', '3'  '已通过',
                        var sellQuoteBtn = '';
                        var sellQuoteStatusClass = '';
                        //作废状态判断
                        var sellQuoteIsvalidClass = '';
                        var sellQuoteIsvalidSort = '';
                        if ($('#ven_sell_quote_nav_ul li.tabhover').html() == '我发起的') {
                            sellQuoteIsvalidClass = '';
                            sellQuoteIsvalidSort = l_dbl(i + 1);
                            if (v['status'] == 1) {
                                sellQuoteBtn = '<button class="but_mix r_sidebar_btn but_look ven_sell_quote_look" name="xs_bjd_right">查看</button><button class="but_mix but_r val_dialog lik_sell_quote_del_btn" name="xs_xsbjd_delete">删除</button>';
                                sellQuoteStatusClass = 'c_y';
                            } else if (v['status'] == 2) {
                                sellQuoteBtn = '<button class="but_mix r_sidebar_btn but_look ven_sell_quote_look" name="xs_bjd_right">查看</button><button class="but_mix but_exit val_dialog lik_sell_quote_edit_btn" name="xs_bjd_exit">编辑</button><button class="but_mix but_r val_dialog lik_sell_quote_del_btn" name="xs_xsbjd_delete">删除</button>';
                                sellQuoteStatusClass = 'c_r';
                            } else if (v['status'] == 3) {
                                sellQuoteBtn = '<button class="but_mix r_sidebar_btn but_look ven_sell_quote_look" name="xs_bjd_right">查看</button>';
                                sellQuoteStatusClass = 'c_g';
                            }
                        } else {
                            sellQuoteIsvalidClass = '';
                            sellQuoteIsvalidSort = l_dbl(i + 1);
                            if (v['status'] == 1) {
                                sellQuoteBtn = '<button class="but_mix r_sidebar_btn but_look ven_sell_quote_look ven_sell_quote_check_btn" name="cs_bjd_splook">审批</button>';
                                sellQuoteStatusClass = 'c_y';
                            } else if (v['status'] == 2) {
                                sellQuoteBtn = '<button class="but_mix r_sidebar_btn but_look ven_sell_quote_look" name="xs_bjd_right">查看</button>';
                                sellQuoteStatusClass = 'c_r';
                            } else if (v['status'] == 3) {
                                sellQuoteBtn = '<button class="but_mix r_sidebar_btn but_look ven_sell_quote_look" name="xs_bjd_right">查看</button>';
                                sellQuoteStatusClass = 'c_g';
                            }
                        }
                        sellQuoteHtml += '<tr vensellquoteid="' + v['id'] + '" class="' + sellQuoteIsvalidClass + '">\
                            <td>' + sellQuoteIsvalidSort + '</td>\
                            <td>' + likNullData(v['code_sn']) + '</td>\
                            <td>' + likNullData(v['order_code_sn']) + '</td>\
                            <td>' + likNullData(v['lend_code_sn']) + '</td>\
                            <td>' + likNullData(v['customer_name']) + '</td>\
                            <td>' + likNullData(v['quote_num']) + '</td>\
                            <td class="' + sellQuoteStatusClass + '">' + likNullData(v['status_name']) + '</td>\
                            <td>' + likNullData(v['current_name']) + '</td>\
                            <td>' + likNullData(v['good_name']) + '</td>\
                            <td>' + likNullData(v['good_totals']) + '</td>\
                            <td>' + likNullData(v['rate_sum']) + '</td>\
                            <td>' + likNullData(v['totals']) + '</td>\
                            <td>' + likNullData(v['uname']) + '</td>\
                            <td>' + likNullData(v['created_at'].split(' ')[0]) + '</td>\
                            <td>' + likNullData(v['dept_name']) + '</td>\
                            <td>' + likNullData(v['owner_name']) + '</td>\
                            <td>' + sellQuoteBtn + '</td>\
                        </tr>';
                    });
                    //销售报价单数据渲染
                    $('#ven_sell_quote_list').html(sellQuoteHtml);
                }
                //分页
                list_table_render_pagination('.ven_sell_quote_pagination', sellQuoteData, getSellQuoteList, oE.totalcount, datalist.length, url);
                $('#ven_sell_quote_look_save').trigger('click');
            }
        });
        venSellQuoteSearch(url);
        //获取草稿数量
        getSellQuoteDraftNum();
    }

    //刷新列表
    $('#ven_sell_quote_refresh').live('click', function () {
        sellQuoteData = {
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
        $('#ven_sell_quote_searKey_inp').val('搜索报价单编号/客户名称等').css('color', '#CCCCCC');
        $('#ven_sell_quote_search_status_inp').val('审批状态').css('color', '#CCCCCC');
        $('#ven_sell_quote_search_flow_inp').val('审批人').css('color', '#CCCCCC');
        $('#ven_sell_quote_search_product_name_inp').val('销售商品类型').css('color', '#CCCCCC');
        $('#ven_sell_quote_search_dept_inp').val('负责部门').css('color', '#CCCCCC');
        $('#ven_sell_quote_search_owner_inp').val('负责人').css('color', '#CCCCCC');
        getSellQuoteList($('#ven_sell_quote_nav_ul .tabhover').attr('needurl'));
    });

    //搜索关键字
    $('#ven_sell_quote_searKey_btn').live('click', function () {
        if ($('#ven_sell_quote_searKey_inp').val() == '搜索客户名称等') {
            alert('请输入搜索关键字');
            sellQuoteData.key = '';
        } else {
            sellQuoteData.key = $('#ven_sell_quote_searKey_inp').val();
        }
        getSellQuoteList($('#ven_sell_quote_nav_ul li.tabhover').attr('needurl'));
    });

    //高级搜索 控制下拉框
    function venSellQuoteSearch(url) {
        $.ajax({
            url: SERVER_URL + url,
            type: 'GET',
            data: {token: token, num: 500},
            success: function (e) {
                // 将返回值转换为json对象
                var oE = eval("(" + e + ")");
                if (oE.code == 0) {
                    //获取datalist
                    var datalist = oE.datalist;
                    //定义高级搜索字段
                    //高级搜索 审批人名字 字符串
                    var searchFlowName = '';
                    //高级搜索 负责部门 字符串
                    var searchDeptName = '';
                    // 定义高级搜索数组
                    //高级搜索 审批人 数组
                    var searchFlowArr = [];
                    //高级搜索 负责部门 数组
                    var searchDeptArr = [];
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
                        if (v['current_uid'] != '' && v['current_name'] != '') {
                            searchFlowArr.push({
                                flowid: v['current_uid'],
                                flowname: v['current_name']
                            });
                        }
                    });
                    //高级搜索 审批人
                    $.each(getJsonArr(searchFlowArr), function (i, v) {
                        searchFlowName += '<li searchflowId="' + v['flowid'] + '">' + v['flowname'] + '</li>';
                    });
                    // 高级搜索 审批人
                    $('#ven_sell_quote_search_flow_ul').html(searchFlowName);
                }
            }
        })
    }

    //获取销售报价单草稿列表
    $('#ven_sell_quote_draft_btn').live('click', function () {
        getSellQuoteDraftList();
    });
    //只显示数量
    function getSellQuoteDraftNum() {
        $.ajax({
            url: SERVER_URL + '/quote/mylist',
            type: 'GET',
            data: sellQuoteDraftData,
            success: function (e) {
                // 将返回值转换为json对象
                var oE = eval("(" + e + ")");
                if (oE.code == 0) {
                    //搜索总条数
                    $('.ven_sell_quote_draft_num').html(oE.totalcount);
                }
            }
        });
    }

    function getSellQuoteDraftList() {
        $.ajax({
            url: SERVER_URL + '/quote/mylist',
            type: 'GET',
            data: sellQuoteDraftData,
            success: function (e) {
                // 将返回值转换为json对象
                var oE = eval("(" + e + ")");
                if (oE.code == 0) {
                    //搜索总条数
                    $('.ven_sell_quote_draft_num').html(oE.totalcount);
                    //获取datalist
                    var datalist = oE.datalist;
                    if (datalist.length == 0) {
                        $('.ven_sell_quote_draft_nodata_box').removeClass('none');
                        $('.ven_sell_quote_draft_handle').addClass('none');
                    } else {
                        $('.ven_sell_quote_draft_nodata_box').addClass('none');
                        $('.ven_sell_quote_draft_handle').removeClass('none');
                    }
                    //字符串拼接
                    var sellQuoteDraftHtml = '';
                    $.each(datalist, function (i, v) {
                        sellQuoteDraftHtml += '<tr vensellquoteid="' + v['id'] + '">\
                            <td>' + l_dbl(i + 1) + '</td>\
                            <td>' + likNullData(v['code_sn']) + '</td>\
                            <td>' + likNullData(v['customer_name']) + '</td>\
                            <td>' + likNullData(v['goods_type']) + '</td>\
                            <td>' + likNullData(v['good_totals']) + '</td>\
                            <td>' + likNullData(v['rate_sum']) + '</td>\
                            <td>' + likNullData(v['totals']) + '</td>\
                            <td>' + likNullData(v['uname']) + '</td>\
                            <td>' + likNullData(v['created_at'].split(' ')[0]) + '</td>\
                            <td>' + likNullData(v['dept_name']) + '</td>\
                            <td>' + likNullData(v['owner_name']) + '</td>\
                            <td><button class="but_mix but_exit val_dialog" name="xs_bjd_exit">编辑</button><button class="but_mix but_r val_dialog lik_sell_quote_del_btn" name="xs_xsbjd_delete">删除</button></td>\
                        </tr>';
                    });
                    //销售报价单数据渲染
                    $('.ven_sell_quote_draft_list').html(sellQuoteDraftHtml);
                }
                //分页
                list_table_render_pagination('.tanceng .ven_sell_quote_draft_pagination', sellQuoteDraftData, getSellQuoteDraftList, oE.totalcount, datalist.length);
            }
        });
    }

    //高级搜索
    //审批状态
    $('#ven_sell_quote_search_status_ul li').live('click', function () {
        sellQuoteData.status = $(this).index() + 1;
        getSellQuoteList($('#ven_sell_quote_nav_ul li.tabhover').attr('needurl'));
    });
    //审批人
    $('#ven_sell_quote_search_flow_ul li').live('click', function () {
        sellQuoteData.flow = $(this).closest('li').attr('searchflowId');
        getSellQuoteList($('#ven_sell_quote_nav_ul li.tabhover').attr('needurl'));
    });

    //定义当前操作id
    var sellQuoteCurrentId = '';
    var sellOrderCurrentId = '';
    //查看操作
    $('.ven_sell_quote_look').die('click').live('click', function () {
        $('.ht_slid_list ul li:first-of-type').trigger('click');
        sellQuoteCurrentId = $(this).closest('tr').attr('vensellquoteid');
        $.ajax({
            url: SERVER_URL + '/quote/detail',
            type: 'GET',
            async: false,
            data: {
                token: token,
                quote_id: sellQuoteCurrentId,
                is_list: 1
            },
            success: function (e) {
                // 将返回值转换为json对象
                var oE = eval("(" + e + ")");
                if (oE.code == 0) {
                    var datalist = oE.data;
                    console.log(datalist);
                    //更多列表显示操作
                    var sellQuoteLookMore = '';
                    if (datalist['is_invalid'] == 0) {
                        $('#ven_sell_quote_look_more_btn').css('display', '');
                        $('#ven_sell_quote_look_more').css('display', '');
                        if (datalist['status'] == 3) {
                            $('#ven_sell_quote_look_more_btn').css('display', 'none');
                            sellQuoteLookMore = ''
                        } else if (datalist['status'] == 2) {
                            sellQuoteLookMore = '<li class="val_dialogTop" id="ven_sell_quote_look_more_edit_btn" name="xs_bjd_exit">编辑</li><li class="val_dialog" name="xs_xsbjd_delete" id="ven_sell_quote_look_more_del_btn">删除</li>'
                        } else if (datalist['status'] == 1) {
                            sellQuoteLookMore = '<li class="val_dialog" name="xs_xsbjd_delete" id="ven_sell_quote_look_more_del_btn">删除</li>'
                        }
                    } else {
                        $('#ven_sell_quote_look_more_btn').css('display', 'none');
                        $('#ven_sell_quote_look_more').css('display', 'none');
                    }
                    $('#ven_sell_quote_look_more').html(sellQuoteLookMore);
                    //订单id
                    sellOrderCurrentId = datalist['order_id'];
                    //客户名称
                    $('.ven_sell_quote_look_custom_name').html(likNullData(datalist['customer_name']));
                    //创建日期
                    $('.ven_sell_quote_look_create_at').html(likNullData(datalist['created_at']));
                    //创建人
                    $('.ven_sell_quote_look_uname').html(likNullData(datalist['uname']));
                    //报价单编号
                    $('.ven_sell_quote_look_code_sn').html(likNullData(datalist['code_sn']));
                    //关联销售订单
                    $('.ven_sell_quote_look_order_code_sn').html(likNullData(datalist['order_code_sn']));
                    //关联借出单
                    $('.ven_sell_quote_look_lend_code_sn').html(likNullData(datalist['lend_code_sn']));
                    //报价次数
                    $('.ven_sell_quote_look_steps_num').html(likNullData(datalist['steps'].length));
                    //审批状态
                    var statusname = '';
                    if (datalist['status'] == 1) {
                        statusname = '审批中';
                    } else if (datalist['status'] == 2) {
                        statusname = '未通过';
                    } else if (datalist['status'] == 3) {
                        statusname = '已通过';
                    }
                    $('.ven_sell_quote_look_status_name').html(statusname);
                    //审批人
                    $('.ven_sell_quote_look_current_name').html(likNullData(datalist['current_name']));
                    //销售商品
                    $('.ven_sell_quote_look_product_name').html(likNullData(datalist['good_name']));
                    //商品销售金额
                    $('.ven_sell_quote_look_good_totals').html(datalist['good_totals']);
                    //税率合计
                    $('.ven_sell_quote_look_rate_sum').html(datalist['rate_sum']);
                    //总金额
                    $('.ven_sell_quote_look_totals').html(likNullData(datalist['totals']));
                    //制单日期
                    $('.ven_sell_quote_look_create_quote_at').html(likNullData(datalist['created_at'].split(' ')[0]));
                    //负责部门
                    $('.ven_sell_quote_look_dept_name').html(likNullData(datalist['dept_name']));
                    //负责人
                    $('.ven_sell_quote_look_owner_name').html(likNullData(datalist['owner_name']));

                    //审批流程
                    var sellQuoteLookCheckListHtml = '';
                    $.each(datalist['check_log'], function (i, v) {
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
                    $('.ven_sell_quote_look_check_list').html(sellQuoteLookCheckListHtml);

                    //详情弹框 - 报价单商品
                    var quoteProductDetailHtml = '';
                    if (datalist['steps']) {
                        $.each(datalist['steps'], function (i, v) {
                            //取商品集合
                            var productJson = v['product_json'];
                            //商品循环
                            var goodsListHtml = '';
                            if (productJson['product']) {
                                $.each(productJson['product'], function (i2, v2) {
                                    goodsListHtml += '<tr>\
                                                    <td>' + l_dbl(i + 1) + '</td>\
                                                    <td>' + v2['good_name'] + '</td>\
                                                    <td>' + v2['good_code_sn'] + '</td>\
                                                    <td>' + v2['good_attribute'] + '</td>\
                                                    <td>' + v2['unit'] + '</td>\
                                                    <td>' + v2['num'] + '</td>\
                                                    <td>' + v2['cost'] + '</td>\
                                                    <td>' + v2['total'] + '</td>\
                                                    <td>' + v2['tax_rate'] + '</td>\
                                                    <td>' + v2['tax_money'] + '</td>\
                                                    </tr>'
                                });
                            }
                            //套餐循环
                            var packageListHtml = '';
                            if (productJson['product_package']) {
                                $.each(productJson['product_package'], function (i2, v2) {
                                    packageListHtml += '<tr>\
                                                    <td>' + v2['package_name'] + '</td>\
                                                    <td>' + v2['package_code_sn'] + '</td>\
                                                    <td>' + v2['package_num'] + '</td>\
                                                    <td>' + v2['package_sum_total'] + '</td>\
                                                    </tr>'
                                });
                            }
                            //套餐子商品循环
                            var packageGoodsListHtml = '';
                            if (productJson['package_goods']) {
                                $.each(productJson['package_goods'], function (i2, v2) {
                                    packageGoodsListHtml += '<tr>\
                                                            <td>' + l_dbl(i + 1) + '</td>\
                                                            <td>' + v2['good_name'] + '</td>\
                                                            <td>' + v2['good_code_sn'] + '</td>\
                                                            <td>' + v2['good_attribute'] + '</td>\
                                                            <td>' + v2['unit'] + '</td>\
                                                            <td>' + v2['num'] + '</td>\
                                                            <td>' + v2['price'] + '</td>\
                                                            <td>' + v2['total_num'] + '</td>\
                                                            <td>' + v2['good_total'] + '</td>\
                                                            <td>' + v2['tax_rate'] + '</td>\
                                                            <td>' + v2['single_tax_money'] + '</td>\
                                                            <td>' + v2['sum_tax_money'] + '</td>\
                                                            </tr>'
                                });
                            }
                            //配置商品循环
                            var settingListHtml = '';
                            if (productJson['product_setting']) {
                                $.each(productJson['product_setting'], function (i2, v2) {
                                    settingListHtml += '<tr>\
                                                        <td>' + l_dbl(i + 1) + '</td>\
                                                        <td>' + v2['setting_name'] + '</td>\
                                                        <td>' + v2['setting_code_sn'] + '</td>\
                                                        <td>' + v2['setting_unit'] + '</td>\
                                                        <td>' + v2['setting_num'] + '</td>\
                                                        <td>-</td>\
                                                        </tr>'
                                });
                            }
                            //配置子商品循环
                            var settingGoodsListHtml = '';
                            if (productJson['setting_goods']) {
                                $.each(productJson['setting_goods'], function (i2, v2) {
                                    settingGoodsListHtml += '<tr>\
                                                        <td>' + l_dbl(i + 1) + '</td>\
                                                        <td>' + v2['good_name'] + '</td>\
                                                        <td>' + v2['good_code_sn'] + '</td>\
                                                        <td>' + v2['good_attribute'] + '</td>\
                                                        <td>' + v2['unit'] + '</td>\
                                                        <td>' + v2['num'] + '</td>\
                                                        <td>' + v2['price'] + '</td>\
                                                        <td>' + v2['total_num'] + '</td>\
                                                        <td>' + v2['good_total'] + '</td>\
                                                        <td>' + v2['tax_rate'] + '</td>\
                                                        <td>' + v2['single_tax_money'] + '</td>\
                                                        <td>' + v2['sum_tax_money'] + '</td>\
                                                        </tr>'
                                });
                            }
                            quoteProductDetailHtml += '<div class="box_Open cg_cgbjd_newCon" style="margin-bottom:15px;">\
                            <p class="box_open_head" style="background: #fafafa;">' + sellQuoteStepsArr[i] + '<span class="box_open_btn" style="right:10px;">收起<i class="right icon_show"></i></span>\
                            </p>\
                            <div class="box_open_list">\
                            <div class="table_t1">\
                            <h3 class="cont_title inline_block">商品报价</h3>\
                            </div>\
                            <div class="div_1 container">\
                            <div class="div_1 table-container">\
                            <table>\
                            <thead>\
                            <tr>\
                            <th>序号</th>\
                            <th>商品名称/规格</th>\
                            <th>商品编号</th>\
                            <th>属性</th>\
                            <th>计算单位</th>\
                            <th>数量</th>\
                            <th>价格(元)</th>\
                            <th>总价(元)</th>\
                            <th>含税率%</th>\
                            <th>含税额(元)</th>\
                            </tr>\
                            </thead>\
                            <tbody>' + goodsListHtml + '<tr class="table_total">\
                            <td>合计</td>\
                            <td></td>\
                            <td></td>\
                            <td></td>\
                            <td></td>\
                            <td class="c_r">' + productJson['product_good_sum_num'] + '</td>\
                            <td></td>\
                            <td><span class="c_r">' + productJson['product_good_sum_price'] + '</span></td>\
                        <td></td>\
                        <td class="c_r">' + productJson['product_good_sum_tax_money'] + '</td>\
                        </tr>\
                        </tbody>\
                        </table>\
                        </div>\
                        </div>\
                        <div class="box_open_list">\
                            <div class="table_t1">\
                            <h3 class="cont_title inline_block">套餐商品报价</h3>\
                            </div>\
                            <div class="div_1 container">\
                            <div class="div_1 table-container">\
                            <table>\
                            <thead>\
                            <tr>\
                            <th>商品名称/规格</th>\
                            <th>商品编号</th>\
                            <th>数量</th>\
                            <th>合计总价(元)</th>\
                            </tr>\
                            </thead>\
                            <tbody>' + packageListHtml + '<tr class="table_total">\
                            <td>合计</td>\
                            <td></td>\
                            <td class="c_r">' + productJson['package_sum_num'] + '</td>\
                            <td class="c_r">' + productJson['package_sum_total'] + '</td>\
                            </tr>\
                            </tbody>\
                            </table>\
                            </div>\
                            </div>\
                            <div class="table_t2">包含商品内容</div>\
                            <div class="div_1 container">\
                            <div class="div_1 table-container">\
                            <table>\
                            <thead>\
                            <tr>\
                            <th>序号</th>\
                            <th>商品名称/规格</th>\
                            <th>商品编号</th>\
                            <th>属性</th>\
                            <th>计算单位</th>\
                            <th>单个套餐包含商品数量</th>\
                            <th>包含商品单价（元）</th>\
                        <th>总数量</th>\
                        <th>包含商品总价(元)</th>\
                        <th>含税率%</th>\
                        <th>单个税额(元)</th>\
                        <th>合计税额(元)</th>\
                        </tr>\
                        </thead>\
                        <tbody>' + packageGoodsListHtml + '<tr class="table_total">\
                            <td>合计</td>\
                            <td></td>\
                            <td></td>\
                            <td></td>\
                            <td></td>\
                            <td>' + productJson['package_goods_sum_num'] + '</td>\
                            <td></td>\
                            <td></td>\
                            <td><span class="c_r">' + productJson['package_goods_sum_price'] + '</span></td>\
                            <td></td>\
                            <td></td>\
                            <td class="c_r">' + productJson['package_goods_sum_tax_money'] + '</td>\
                            </tr>\
                            </tbody>\
                            </table>\
                            </div>\
                            </div>\
                            </div>\
                            <div class="box_open_list">\
                            <div class="box_open_list">\
                            <div class="table_t1">\
                            <h3 class="cont_title inline_block">配置商品报价</h3>\
                            </div>\
                            <div class="div_1 container">\
                            <div class="div_1 table-container">\
                            <table>\
                            <thead>\
                            <tr>\
                            <th>序号</th>\
                            <th>配置商品名称</th>\
                            <th>配置商品编号</th>\
                            <th>单位</th>\
                            <th>数量</th>\
                            <th>合计总价(元)</th>\
                            </tr>\
                            </thead>\
                            <tbody>' + settingListHtml + '</tbody>\
                            </table>\
                            </div>\
                            </div>\
                            </div>\
                            <div class="table_t2">配置商品内容</div>\
                            <div class="div_1 container">\
                            <div class="div_1 table-container">\
                            <table>\
                            <thead>\
                            <tr>\
                            <th>序号</th>\
                            <th>商品名称/规格</th>\
                            <th>商品编号</th>\
                            <th>属性</th>\
                            <th>计算单位</th>\
                            <th>单个配置搭配商品数量</th>\
                            <th>搭配商品单价(元)</th>\
                            <th>总数量</th>\
                            <th>搭配商品总价(元)</th>\
                            <th>含税率%</th>\
                            <th>单个税额(元)</th>\
                            <th>合计税额(元)</th>\
                            </tr>\
                            </thead>\
                            <tbody>' + settingGoodsListHtml + '<tr class="table_total">\
                            <td>合计</td>\
                            <td></td>\
                            <td></td>\
                            <td></td>\
                            <td></td>\
                            <td>' + productJson['setting_goods_sum_num'] + '</td>\
                            <td></td>\
                            <td></td>\
                            <td>' + productJson['setting_goods_sum_price'] + '</td>\
                            <td></td>\
                            <td></td>\
                            <td>' + productJson['setting_goods_sum_tax_money'] + '</td>\
                            </tr>\
                            </tbody>\
                            </table>\
                            </div>\
                            </div>\
                            </div>\
                            <div style="min-height:120px; padding: 30px 10px 20px;">\
                            <div class="left" style="width: 50%;">\
                            <div class="t_textinput">\
                            <div class="t_left" style="width:50%"><i class="c_r v_hidden">*</i><input type="checkbox" ' + (productJson['is_freight'] == 1 ? 'checked' : '') + '>包运费</div>\
                            </div>\
                            <div class="t_textinput t_textarea" style="margin-top: 30px;">\
                            <div class="t_left">备注</div>\
                            <div class="t_right">\
                            <textarea class="txt_normal" readonly="true" style="background: #f5f5f5;">' + productJson['note'] + '</textarea>\
                            </div>\
                            </div>\
                            </div>\
                            <div class="right cg_cgbjd_newright" style="width: 30%;">\
                            <div class="t_textinput">\
                            <div class="t_left">合计</div>\
                            <div class="t_right">\
                            <input type="text" class="inp_noInput" readonly="readonly" value="¥：' + productJson['good_totals'] + '">\
                            </div>\
                            </div>\
                            <div class="t_textinput">\
                            <div class="t_left">合计税额(元)</div>\
                            <div class="t_right">\
                            <input type="text" class="inp_noInput" readonly="readonly" value="¥：' + productJson['rate_sum'] + '">\
                            </div>\
                            </div>\
                            <div class="t_textinput">\
                            <div class="t_left">其他费用</div>\
                            <div class="t_right">\
                            <input type="text" class="inp_noInput" readonly="readonly" value="¥：' + productJson['other_free'] + '">\
                            </div>\
                            </div>\
                            </div>\
                            </div>\
                            <div class="cg_cgbjd_b">\
                            <p class="c_r" style="margin-right:50px;">总计金额：<span>¥' + productJson['totals'] + '元</span></p>\
                        </div>\
                        </div>\
                        </div>'
                        });
                        $('.ven_sell_quote_look_detail_list_box').html(quoteProductDetailHtml);
                    }

                } else {
                    console.log(e)
                }
            }
        })
    });
    //查看 - 销售订单
    $('.ven_sell_quote_look_nav li:nth-of-type(2)').die('click').live('click', function () {
        console.log(sellOrderCurrentId);
        $.ajax({
            url: SERVER_URL + '/order/info',
            type: 'GET',
            data: {
                token: token,
                order_id: sellOrderCurrentId
            },
            dataType: 'json',
            success: function (e) {
                if (e.code == 0) {
                    var data = e.data;
                    console.log(data);
                    //销售订单编号
                    $('.ven_sell_quote_link_order_code_sn').html(data['code_sn']);
                    //客户
                    $('.ven_sell_quote_link_order_name').html(data['name']);
                    //负责部门
                    $('.ven_sell_quote_link_order_dept_name').html(data['dept_name']);
                    //负责人
                    $('.ven_sell_quote_link_order_owner_name').html(data['owner_name']);
                    //发货时间
                    $('.ven_sell_quote_link_order_delivery_at').html(data['delivery_at']);
                    //出库状态
                    $('.ven_sell_quote_link_order_out_status_name').html(data['out_status_name']);
                    //商品总金额
                    $('.ven_sell_quote_link_order_totals_product').html(data['totals_product']);
                    //税额合计
                    $('.ven_sell_quote_link_order_rate_sum').html(data['rate_sum']);
                    //订单总金额
                    $('.ven_sell_quote_link_order_totals').html(data['totals']);
                    //已收金额
                    $('.ven_sell_quote_link_order_is_pay').html(data['is_pay']);
                    //已付金额
                    $('.ven_sell_quote_link_order_is_ticket').html(data['is_ticket']);
                    //备注
                    $('.ven_sell_quote_link_order_note').html(data['note']);
                } else {
                    alert('操作失败')
                }
            }
        })
    });
    //查看中的作废操作
    $('#ven_sell_quote_look_more_invalid_btn').die('click').live('click', function () {
        $.ajax({
            url: SERVER_URL + '/quote/setstatus',
            type: 'POST',
            data: {
                token: token,
                quote_id: sellQuoteCurrentId,
                status_flag: 1
            },
            success: function (e) {
                // 将返回值转换为json对象
                var oE = eval("(" + e + ")");
                if (oE.code == 0) {
                    if ($('.tabhover').html() == '我发起的') {
                        getSellQuoteList('/quote/mylist')
                    } else {
                        getSellQuoteList('/quote/mychecklist');
                    }
                    $('#ven_sell_quote_look_more').css('display', 'none');
                    $('.Sideslip').css('display', 'none');
                } else {
                    alert('操作失败')
                }
            }
        })
    });
    //作废操作
    $('.ven_sell_quote_invalid_btn').live('click', function () {
        sellQuoteCurrentId = $(this).closest('tr').attr('vensellquoteid');
        $.ajax({
            url: SERVER_URL + '/quote/setstatus',
            type: 'POST',
            data: {
                token: token,
                quote_id: sellQuoteCurrentId,
                status_flag: 1
            },
            success: function (e) {
                // 将返回值转换为json对象
                var oE = eval("(" + e + ")");
                if (oE.code == 0) {
                    if ($('.tabhover').html() == '我发起的') {
                        getSellQuoteList('/quote/mylist')
                    } else {
                        getSellQuoteList('/quote/mychecklist');
                    }
                } else {
                    alert('操作失败')
                }
            }
        })
    });
    //不显示作废状态
    $('#ven_sell_quote_noShow').live('click', function () {
        if ($(this).is(':checked')) {
            sellQuoteData.is_invalid = 0;
        } else {
            sellQuoteData.is_invalid = '';
        }
        getSellQuoteList($('#ven_sell_quote_nav_ul .tabhover').attr('needurl'));

        /*if ($(this).prop('checked')) {
         payFlowData.status = 0;
         $('#ven_pay_flow_search_status_inp').val('状态').css('color', '#CCCCCC');
         } else {
         payFlowData.status = '';
         }
         getPayFlowList()*/
    });
    //查看 - 编辑操作
    $('#ven_sell_quote_look_more_edit_btn').live('click', function () {
        $('.right_sidebar_h').trigger('click');
        sellQuoteEditFn(sellQuoteCurrentId);
    });
    //删除操作
    $('.lik_sell_quote_del_btn').live('click', function () {
        sellQuoteCurrentId = $(this).closest('tr').attr('vensellquoteid');
    });
    //查看 - 删除操作
    $('#ven_sell_quote_look_more_del_btn').live('click', function () {
        $('.right_sidebar').css('display', 'none');
    });
    //删除操作确定
    $('.tanceng .xs_bjd_list_delete').live('click', function () {
        $.ajax({
            url: SERVER_URL + '/quote/del',
            type: 'GET',
            data: {
                token: token,
                id: sellQuoteCurrentId
            },
            success: function (e) {
                // 将返回值转换为json对象
                var oE = eval("(" + e + ")");
                console.log(oE);
                if (oE.code == 0) {
                    getSellQuoteList($('#ven_sell_quote_nav_ul .tabhover').attr('needurl'));
                    getSellQuoteDraftList();
                    $(this).closest('.dialog_box').remove();
                    $('.tanceng').css('display', 'none');
                } else {
                    alert('操作失败')
                }
            }
        })
    });

    //审批参数
    var sellQuoteCheckData = {
        token: token,
        check_type: '',
        quote_id: '',
        note: ''
    };
    //审批操作
    $('.ven_sell_quote_check_btn').live('click', function () {
        sellQuoteCurrentId = $(this).closest('tr').attr('vensellquoteid');
        sellQuoteCheckData.quote_id = sellQuoteCurrentId;
    });
    //审批操作 - 拒绝
    $('.ven_sell_quote_check_btn_refuse').live('click', function () {
        sellQuoteCheckData.check_type = 2;
    });
    //审批操作 - 通过
    $('.ven_sell_quote_check_btn_pass').live('click', function () {
        sellQuoteCheckData.check_type = 1;
    });
    //审批提交
    $('.tanceng .ven_sell_quote_check_submit_btn').live('click', function () {
        if ($('.tanceng .ven_sell_quote_check_note_textarea').val() == '请输入审批意见') {
            sellQuoteCheckData.note = '';
        } else {
            sellQuoteCheckData.note = $('.tanceng .ven_sell_quote_check_note_textarea').val();
        }
        $.ajax({
            url: SERVER_URL + '/quote/check',
            type: 'POST',
            data: sellQuoteCheckData,
            success: function (e) {
                // 将返回值转换为json对象
                var oE = eval("(" + e + ")");
                console.log(oE);
                if (oE.code == 0) {
                    alert('操作成功')
                } else {
                    alert('操作失败')
                }
            }
        });
    });

    //新建报价单参数
    var sellQuoteCreateData = {
        token: token,
        quote_id: 0,//报价单id,有值为修改
        code_sn: "",//编号
        chance_id: '',//销售机会id
        lend_id: '', // 借出单id
        customer_id: '',//客户id
        dept: '',//负责部门
        owner: '',//负责人id
        note: "",//备注
        is_draft: '',//是否草稿,0不是1是
        flow: '',  //审批流程
        is_freight: '',//是否有运费,0无1有
        discount_type: '',//折扣类型,0折扣率1折扣额
        discount: '',//折扣值,折扣率的取值0-100,折扣额的单位分
        good_totals: 0,//商品金额
        rate_sum: 0,//税率合计
        totals: 0,//总金额
        other_free: 0,//其他费用,单位分
        goods: [], // 普通商品
        product_good_sum_num: '', // 普通商品总数
        product_good_sum_price: '', // 普通商品总价额
        product_good_sum_tax_money: '', // 普通商品总含税额
        package: [], // 套餐商品
        package_goods: [],// 套餐包含子商品
        package_goods_sum_num: '', // 套餐里面包含商品的总数量
        package_goods_sum_price: '', // 套餐里面包含商品的总价格
        package_goods_sum_tax_money: '', // 套餐里面包含商品的合计税额总额
        setting: [], // 配置商品
        setting_goods: [], // 配置包含子商品
        setting_goods_sum_num: '', //  配置里面包含商品的总数量
        setting_goods_sum_price: '', //  配置里面包含商品的总价格
        setting_goods_sum_tax_money: '' // 配置里面包含商品的合计税额总额
    };
    //编辑报价单参数
    var sellQuoteEditData = {
        token: token,
        quote_id: 0,//报价单id,有值为修改
        code_sn: "",//编号
        chance_id: '',//销售机会id
        lend_id: '', // 借出单id
        customer_id: '',//客户id
        dept: '',//负责部门
        owner: '',//负责人id
        note: "",//备注
        is_draft: '',//是否草稿,0不是1是
        flow: '',  //审批流程
        is_freight: '',//是否有运费,0无1有
        discount_type: '',//折扣类型,0折扣率1折扣额
        discount: '',//折扣值,折扣率的取值0-100,折扣额的单位分
        good_totals: 0,//商品金额
        rate_sum: 0,//税率合计
        totals: 0,//总金额
        other_free: 0,//其他费用,单位分
        goods: [], // 普通商品
        product_good_sum_num: '', // 普通商品总数
        product_good_sum_price: '', // 普通商品总价额
        product_good_sum_tax_money: '', // 普通商品总含税额
        package: [], // 套餐商品
        package_goods: [],// 套餐包含子商品
        package_goods_sum_num: '', // 套餐里面包含商品的总数量
        package_goods_sum_price: '', // 套餐里面包含商品的总价格
        package_goods_sum_tax_money: '', // 套餐里面包含商品的合计税额总额
        setting: [], // 配置商品
        setting_goods: [], // 配置包含子商品
        setting_goods_sum_num: '', //  配置里面包含商品的总数量
        setting_goods_sum_price: '', //  配置里面包含商品的总价格
        setting_goods_sum_tax_money: '' // 配置里面包含商品的合计税额总额
    };
    //新建报价单
    $('#ven_sell_quote_create_btn').live('click', function () {
        //创建时间
        $('.tanceng .ven_sell_quote_create_time').html(getCurrentDateShort);
        //编号
        $('.tanceng .ven_sell_quote_create_code').val(likGetCodeFn('XBJ'));
        //清空审批人数组
        flowChosenArr = [];
    });
    //新建报价单 - 定义销售机会参数
    var sellQuoteChooseChanceData = {
        token: token,
        page: 1, // 页面
        num: 10, // 每页条数
        key: '', // 关键字
        status: '', // 销售状态 0进行中1成交2未成交
        dept: '', // 负责部门
        uid: '', // 创建人
        owner: '', // 跟进人
        is_invalid: 0 // 0 正常 1作废 空是所有
    };
    // 新建报价单 - 获取销售机会列表
    function getSellQuoteChooseChanceList() {
        $.ajax({
            url: SERVER_URL + '/customer-chance/mylist',
            type: 'GET',
            data: sellQuoteChooseChanceData,
            success: function (e) {
                // 将返回值转换为json对象
                var oE = eval("(" + e + ")");
                if (oE.code == 0) {
                    //获取datalist
                    var datalist = oE.datalist;
                    console.log(datalist);
                    //搜索总条数
                    $('.tanceng .ven_sell_quote_create_choose_chance_total').html(oE.totalcount);
                    if (datalist.length == 0) {
                        $('.ven_sell_quote_create_choose_chance_nodata_box').removeClass('none');
                        $('.ven_sell_quote_create_choose_chance_handle').addClass('none')
                    } else {
                        $('.ven_sell_quote_create_choose_chance_nodata_box').addClass('none');
                        $('.ven_sell_quote_create_choose_chance_handle').removeClass('none')
                    }
                    //字符串拼接
                    var sellChanceHtml = '';
                    $.each(datalist, function (i, v) {
                        sellChanceHtml += '<tr sellchanceid="' + v['id'] + '" sellchancecustomerid="' + v['customer_id'] + '" sellchancecustomercredit="' + v['credit'] + '">\
                            <td style="text-align: center;"><input type="radio" ' + (i == 0 ? 'checked' : '') + ' name="123"></td>\
                            <td>' + (v['name']) + '</td>\
                            <td>' + (v['flow_status_name']) + '</td>\
                            <td>' + (v['track_num']) + '</td>\
                            <td>' + (v['track_date'].split(' ')[0]) + '</td>\
                            <td>' + getStringArr(v['dept_name']) + '</td>\
                            <td>' + (v['owner_name']) + '</td>\
                            <td>' + (v['uname']) + '</td>\
                            <td>' + (v['created_at'].split(' ')[0]) + '</td>\
                        </tr>';
                    });
                    //销售机会数据渲染
                    $('.tanceng .ven_sell_quote_create_choose_chance_list').html(sellChanceHtml);
                }
                //分页
                list_table_render_pagination('.ven_sell_quote_create_choose_chance_all_page', sellQuoteChooseChanceData, getSellQuoteChooseChanceList, oE.totalcount, datalist.length);
            }
        });
    }

    //新建报价单 - 销售机会 - 搜索关键字
    $('.tanceng .ven_sell_quote_create_choose_chance_search_btn').live('click', function () {
        if ($('.tanceng .ven_sell_quote_create_choose_chance_search_inp').val() == '搜索客户名称') {
            alert('请输入搜索关键字');
            sellQuoteChooseChanceData.key = '';
            return false;
        } else {
            sellQuoteChooseChanceData.key = $('.tanceng .ven_sell_quote_create_choose_chance_search_inp').val();
        }
        getSellQuoteChooseChanceList()
    });
    //新建报价单 - 选择销售机会
    $('.tanceng .ven_sell_quote_create_choose_chance_btn').live('click', function () {
        getSellQuoteChooseChanceList();
    });
    //新建报价单 - 选择销售机会 - 保存
    $('.tanceng .ven_sell_quote_create_choose_chance_save').live('click', function () {
        var sellQuoteChanceChosen = null;
        $.each($('.tanceng .ven_sell_quote_create_choose_chance_list tr'), function (i, v) {
            if ($('.tanceng .ven_sell_quote_create_choose_chance_list tr').eq(i).find('input:radio').is(':checked')) {
                sellQuoteChanceChosen = {
                    'title': $('.tanceng .ven_sell_quote_create_choose_chance_list tr').eq(i).attr('sellchanceid'),
                    'val': $('.tanceng .ven_sell_quote_create_choose_chance_list tr').eq(i).find('td').eq(1).text(),
                    'cusid': $('.tanceng .ven_sell_quote_create_choose_chance_list tr').eq(i).attr('sellchancecustomerid'),
                    'cuscredit': $('.tanceng .ven_sell_quote_create_choose_chance_list tr').eq(i).attr('sellchancecustomercredit')
                }
            }
        });
        //新建销售报价单用
        $('.tanceng .ven_sell_quote_create_choose_chance_inp').val(sellQuoteChanceChosen['val']);
        $('.tanceng .ven_sell_quote_create_choose_customer_inp').val(sellQuoteChanceChosen['val']);
        $('.tanceng .ven_sell_quote_create_choose_customer_credit').html(sellQuoteChanceChosen['cuscredit']);
        sellQuoteCreateData.chance_id = sellQuoteChanceChosen['title'];
        sellQuoteCreateData.customer_id = sellQuoteChanceChosen['cusid'];
        $('.tanceng .ven_sell_quote_create_choose_lend_btn').css('display', 'none').prev().css('background', '#f5f5f5');
        $('.tanceng .ven_sell_quote_create_choose_customer_btn').css('display', 'none').prev().css('background', '#f5f5f5');
        //编辑销售报价单用
        $('.tanceng .ven_sell_quote_edit_choose_chance_inp').val(sellQuoteChanceChosen['val']);
        $('.tanceng .ven_sell_quote_edit_choose_customer_inp').val(sellQuoteChanceChosen['val']);
        $('.tanceng .ven_sell_quote_edit_choose_customer_credit').html(sellQuoteChanceChosen['cuscredit']);
        sellQuoteEditData.chance_id = sellQuoteChanceChosen['title'];
        sellQuoteEditData.customer_id = sellQuoteChanceChosen['cusid'];
        $('.tanceng .ven_sell_quote_edit_choose_lend_btn').css('display', 'none').prev().css('background', '#f5f5f5');
        $('.tanceng .ven_sell_quote_edit_choose_customer_btn').css('display', 'none').prev().css('background', '#f5f5f5');
        $(this).closest('.dialog_box').remove();
    });
    //新建报价单 - 选择借出单
    $('.tanceng .ven_sell_quote_create_choose_lend_btn').die('click').live('click', function () {
        getSellQuoteChooseLendList()
    });
    //新建报价单 - 定义借出单参数
    var sellQuoteChooseLendData = {
        token: token,
        page: 1, // 页面
        num: 10, // 每页条数
        keywords: '', // 关键字
        type: 1, // 负责部门
        is_invalid: 0 // 0 正常 1作废 空是所有
    };
    // 新建报价单 - 获取借出单列表
    function getSellQuoteChooseLendList() {
        $.ajax({
            url: SERVER_URL + '/lend/list',
            type: 'GET',
            data: sellQuoteChooseLendData,
            success: function (e) {
                // 将返回值转换为json对象
                var oE = eval("(" + e + ")");
                if (oE.code == 0) {
                    //获取datalist
                    var datalist = oE.datalist;
                    console.log(datalist);
                    //搜索总条数
                    $('.tanceng .ven_sell_quote_create_choose_lend_total').html(oE.totalcount);
                    if (datalist.length == 0) {
                        $('.ven_sell_quote_create_choose_lend_nodata_box').removeClass('none');
                        $('.ven_sell_quote_create_choose_lend_handle').addClass('none')
                    } else {
                        $('.ven_sell_quote_create_choose_lend_nodata_box').addClass('none');
                        $('.ven_sell_quote_create_choose_lend_handle').removeClass('none')
                    }
                    //字符串拼接
                    var sellLendHtml = '';
                    $.each(datalist, function (i, v) {
                        sellLendHtml += '<tr selllendid="' + v['id'] + '" selllendcustomerid="' + v['customer_id'] + '" selllendcustomercredit="' + v['credit'] + '">\
                                            <td><input type="radio" ' + (i == 0 ? 'checked' : '') + ' name="xs_bjd_xzxsdd"></td>\
                                            <td>' + likNullData(v['code_sn']) + '</td>\
                                            <td>' + likNullData(v['lend_time'].split(' ')[0]) + '</td>\
                                            <td>' + likNullData(v['customer_name']) + '</td>\
                                            <td>' + likNullData(v['expect_return_time']) + '</td>\
                                            <td>' + likNullData(v['storage_room_name']) + '</td>\
                                            <td>' + likNullData(v['current_status_str']) + '</td>\
                                            <td>' + likNullData(v['storage_name']) + '</td>\
                                            <td>' + likNullData(v['note']) + '</td>\
                                         </tr>'
                    });
                    //借出单数据渲染
                    $('.tanceng .ven_sell_quote_create_choose_lend_list').html(sellLendHtml);
                }
                //分页
                list_table_render_pagination('.ven_sell_quote_create_choose_lend_all_page', sellQuoteChooseLendData, getSellQuoteChooseLendList, oE.totalcount, datalist.length);
            }
        });
    }

    //新建报价单 - 借出单 - 搜索关键字
    $('.tanceng .ven_sell_quote_create_choose_lend_search_btn').live('click', function () {
        if ($('.tanceng .ven_sell_quote_create_choose_lend_search_inp').val() == '搜索借出单编号') {
            alert('请输入搜索关键字');
            sellQuoteChooseLendData.keywords = '';
            return false;
        } else {
            sellQuoteChooseLendData.keywords = $('.tanceng .ven_sell_quote_create_choose_lend_search_inp').val();
        }
        getSellQuoteChooseLendList();
    });
    //新建报价单 - 选择借出单
    $('.tanceng .ven_sell_quote_create_choose_lend_btn').live('click', function () {
        getSellQuoteChooseLendList();
    });
    //新建报价单 - 选择借出单 - 保存
    $('.tanceng .ven_sell_quote_create_choose_lend_save').live('click', function () {
        var sellQuoteLendChosen = null;
        $.each($('.tanceng .ven_sell_quote_create_choose_lend_list tr'), function (i, v) {
            if ($('.tanceng .ven_sell_quote_create_choose_lend_list tr').eq(i).find('input:radio').is(':checked')) {
                sellQuoteLendChosen = {
                    'title': $('.tanceng .ven_sell_quote_create_choose_lend_list tr').eq(i).attr('selllendid'),
                    'val': $('.tanceng .ven_sell_quote_create_choose_lend_list tr').eq(i).find('td').eq(3).text(),
                    'cusid': $('.tanceng .ven_sell_quote_create_choose_lend_list tr').eq(i).attr('selllendcustomerid'),
                    'cuscredit': $('.tanceng .ven_sell_quote_create_choose_lend_list tr').eq(i).attr('selllendcustomercredit')
                }
            }
        });
        //新建销售报价单用
        $('.tanceng .ven_sell_quote_create_choose_lend_inp').val(sellQuoteLendChosen['val']);
        $('.tanceng .ven_sell_quote_create_choose_customer_inp').val(sellQuoteLendChosen['val']);
        $('.tanceng .ven_sell_quote_create_choose_customer_credit').html(sellQuoteLendChosen['cuscredit']);
        sellQuoteCreateData.lend_id = sellQuoteLendChosen['title'];
        sellQuoteCreateData.customer_id = sellQuoteLendChosen['cusid'];
        $('.tanceng .ven_sell_quote_create_choose_chance_btn').css('display', 'none').prev().css('background', '#f5f5f5');
        $('.tanceng .ven_sell_quote_create_choose_customer_btn').css('display', 'none').prev().css('background', '#f5f5f5');
        //编辑销售报价单用
        $('.tanceng .ven_sell_quote_edit_choose_lend_inp').val(sellQuoteLendChosen['val']);
        $('.tanceng .ven_sell_quote_edit_choose_customer_inp').val(sellQuoteLendChosen['val']);
        $('.tanceng .ven_sell_quote_edit_choose_customer_credit').html(sellQuoteLendChosen['cuscredit']);
        sellQuoteEditData.lend_id = sellQuoteLendChosen['title'];
        sellQuoteEditData.customer_id = sellQuoteLendChosen['cusid'];
        $('.tanceng .ven_sell_quote_edit_choose_chance_btn').css('display', 'none').prev().css('background', '#f5f5f5');
        $('.tanceng .ven_sell_quote_edit_choose_customer_btn').css('display', 'none').prev().css('background', '#f5f5f5');
        $(this).closest('.dialog_box').remove();
    });

    //新建报价单 - 选择客户
    $('.tanceng .ven_sell_quote_create_choose_customer_btn').live('click', function () {
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
                }, 500);
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
                $('span.oth .list_num_null').remove();
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
                    $('.tanceng .ven_sell_quote_cus_num').html(e.totalcount);
                    var cuslist = e.datalist;
                    console.log(cuslist)
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
                        oCuslist += '<tr class="' + cusSta + '" cusid="' + cuslist[i].id + '" cuscredit="' + cuslist[i].credit + '"><td><input type="radio" name="222" ' + (i == 0 ? 'checked' : '') + '></td><td>' + l_dbl(i + 1) + '</td><td>' + cuslist[i].code_sn + '</td><td>' + cuslist[i].name + '</td><td>' + cuslist[i].tel + '</td><td><div class="text_line" style="width: 9em;"><span class="ellipsis">' + cuslist[i].address + '</span></div></td><td>' + cuslist[i].industry_big_name + '</td><td>' + cuslist[i].grade_name + '</td><td class="f_color ' + cusContactClass + '">' + con1 + '<div class="vent_client_contMsgBox" style="display: none;z-index:99;"><i class="vent_client_torr"></i>' + con2 + '</div></td><td>' + cuslist[i].introducer_name + '</td><td>' + cuslist[i].note + '</td></tr>'
                    }
                    $('.tanceng .ven_sell_quote_choose_cus_list').html(oCuslist);
                    list_table_render_pagination('.tanceng .page_ven31_cuslist', getCusListData, getCusList, e.totalcount, cuslist.length)
                }
            }
        })
    }

    //选择分类获取客户
    $('.tanceng .ven_sell_quote_create_choose_customer_sort li').live('click', function () {
        getCusListData.category_id = $(this).attr('cussortid');
        getCusList();
    })
    // 搜索关键字
    $('.tanceng .ven_sell_chance_choose_customer_search_btn').live('click', function () {
        if ($('.tanceng .ven_sell_chance_choose_customer_search_inp').val() == '搜索客户编号/客户名称') {
            getCusListData.key = ''
        } else {
            getCusListData.key = $('.tanceng .ven_sell_chance_choose_customer_search_inp').val()
        }
        getCusList()
    });
    //搜索行业
    $('.tanceng .ven_sell_chance_create_choose_customer_industry_list li').live('click', function () {
        getCusListData.industry_big_id = $(this).attr('industryid');
        getCusList()
    });
    //搜索客户级别
    $('.tanceng .ven_sell_chance_create_choose_customer_grade_list li').live('click', function () {
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
                    $('.tanceng .ven_sell_chance_create_choose_customer_industry_list').html(xs_kh_hy)
                }
            }
        })
    }

    //选择客户
    $('.tanceng .ven_sell_quote_create_choose_customer_save').live('click', function () {
        var sellQuoteCreateCusChosen = null;
        $.each($('.tanceng .ven_sell_quote_choose_cus_list tr'), function (i, v) {
            if ($('.tanceng .ven_sell_quote_choose_cus_list tr').eq(i).find('input:radio').is(':checked')) {
                sellQuoteCreateCusChosen = {
                    'val': $('.tanceng .ven_sell_quote_choose_cus_list tr').eq(i).find('td').eq(3).text(),
                    'cusid': $('.tanceng .ven_sell_quote_choose_cus_list tr').eq(i).attr('cusid'),
                    'cuscredit': $('.tanceng .ven_sell_quote_choose_cus_list tr').eq(i).attr('cuscredit')
                }
            }
        });
        //新建销售报价单用
        $('.tanceng .ven_sell_quote_create_choose_customer_inp').val(sellQuoteCreateCusChosen['val']);
        $('.tanceng .ven_sell_quote_create_choose_customer_credit').html(sellQuoteCreateCusChosen['cuscredit']);
        sellQuoteCreateData.customer_id = sellQuoteCreateCusChosen['cusid'];
        $('.tanceng .ven_sell_quote_create_choose_chance_btn').css('display', 'none').prev().css('background', '#f5f5f5');
        $('.tanceng .ven_sell_quote_create_choose_lend_btn').css('display', 'none').prev().css('background', '#f5f5f5');
        //编辑销售报价单用
        $('.tanceng .ven_sell_quote_edit_choose_customer_inp').val(sellQuoteCreateCusChosen['val']);
        $('.tanceng .ven_sell_quote_edit_choose_customer_credit').html(sellQuoteCreateCusChosen['cuscredit']);
        sellQuoteEditData.customer_id = sellQuoteCreateCusChosen['cusid'];
        $('.tanceng .ven_sell_quote_edit_choose_chance_btn').css('display', 'none').prev().css('background', '#f5f5f5');
        $('.tanceng .ven_sell_quote_edit_choose_lend_btn').css('display', 'none').prev().css('background', '#f5f5f5');
        $(this).closest('.dialog_box').remove();
    });

    //选择负责人
    $('.tanceng .ven_sell_quote_create_choose_owner_btn').live('click', function () {
        venCustomCreateChooseOwnerFn();
        //选择负责人
        /*$('.tanceng .person_left_nav').live('click', function () {
         //新建
         sellQuoteCreateData.owner = $(this).attr('userinfoid');
         sellQuoteCreateData.dept = $(this).parent('ul').prev('li').attr('cussortid');
         //编辑
         sellQuoteEditData.owner = $(this).attr('userinfoid');
         sellQuoteEditData.dept = $(this).parent('ul').prev('li').attr('cussortid');
         });*/
        //选择负责人确认
        $('.tanceng .after_order_create_choose_owner_save').die('click').live('click', function () {
            //新建
            sellQuoteCreateData.owner = $('.tanceng .list_check').closest('li').attr('userinfoid');
            sellQuoteCreateData.dept = $('.tanceng .list_check').closest('ul.ul3').prev('.left_1').attr('cussortid');
            $('.tanceng .ven_sell_quote_create_choose_owner_inp').val($('.tanceng .list_check').closest('li').find('.list_msg').html());
            //编辑
            sellQuoteEditData.owner = $('.tanceng .list_check').closest('li').attr('userinfoid');
            sellQuoteEditData.dept = $('.tanceng .list_check').closest('ul.ul3').prev('.left_1').attr('cussortid');
            $('.tanceng .ven_sell_quote_edit_choose_owner_inp').val($('.tanceng .list_check').closest('li').find('.list_msg').html());
            $(this).closest('.dialog_box').remove();
        })
    });
    //选择审批人
    //审批步骤顺序数组
    var flowOrderArr = ['步骤一', '步骤二', '步骤三', '步骤四', '步骤五', '步骤六', '步骤七'];
    //已选审批人数组
    var flowChosenArr = [];
    $('.tanceng .ven_sell_quote_create_choose_flow_btn').live('click', function () {
        venCustomCreateChooseOwnerFn();
        //选择审批人确认
        $('.tanceng .ven_sell_quote_create_choose_flow_save').die('click').live('click', function () {
            if ($.inArray($('.tanceng .list_check').closest('li').attr('userinfoid'), flowChosenArr) == -1) {
                flowChosenArr.push($('.tanceng .list_check').closest('li').attr('userinfoid'));
                $('.tanceng .ven_sell_quote_create_flow_list .ven_sell_quote_create_flow_list_add_btn').before('<li flowid="' + $('.tanceng .list_check').closest('li').attr('userinfoid') + '"><i class="ven_sell_quote_create_flow_del_btn">-</i><em class="icon_personBtn icon_personBtn_msg"><i class="icon_personNext"></i></em><em class="icon_adderBtn"></em><p class="box_adderName">' + $('.tanceng .list_check').closest('li').find('.list_msg').html() + '</p><p class="box_addermsg"></p></li>');
                $('.tanceng .ven_sell_quote_edit_flow_list .ven_sell_quote_edit_flow_list_add_btn').before('<li flowid="' + $('.tanceng .list_check').closest('li').attr('userinfoid') + '"><i class="ven_sell_quote_create_flow_del_btn">-</i><em class="icon_personBtn icon_personBtn_msg"><i class="icon_personNext"></i></em><em class="icon_adderBtn"></em><p class="box_adderName">' + $('.tanceng .list_check').closest('li').find('.list_msg').html() + '</p><p class="box_addermsg"></p></li>');
            } else {
                alert('请不要重复选择审批人');
                return false;
            }
            //步骤显示
            $.each($('.tanceng .ven_sell_quote_create_flow_list .box_addermsg'), function (i, v) {
                $('.tanceng .ven_sell_quote_create_flow_list .box_addermsg').eq(i).html(flowOrderArr[i]);
            });
            $.each($('.tanceng .ven_sell_quote_edit_flow_list .box_addermsg'), function (i, v) {
                $('.tanceng .ven_sell_quote_edit_flow_list .box_addermsg').eq(i).html(flowOrderArr[i]);
            });
            $(this).closest('.dialog_box').remove();
        });
    });
    $('.ven_sell_quote_create_flow_del_btn').die('click').live('click', function () {
        var index = $(this).closest('li').index();
        flowChosenArr.splice(index, 1);
        $(this).closest('li').remove();
        //步骤显示
        $.each($('.tanceng .ven_sell_quote_create_flow_list .box_addermsg'), function (i, v) {
            $('.tanceng .ven_sell_quote_create_flow_list .box_addermsg').eq(i).html(flowOrderArr[i]);
        });
        $.each($('.tanceng .ven_sell_quote_edit_flow_list .box_addermsg'), function (i, v) {
            $('.tanceng .ven_sell_quote_edit_flow_list .box_addermsg').eq(i).html(flowOrderArr[i]);
        });
    });
    //负责人列表 / 审批人列表
    function venCustomCreateChooseOwnerFn() {
        $.ajax({
            url: SERVER_URL + '/dept/deptlist',
            type: 'GET',
            data: {
                token: token
            },
            success: function (e) {
                // 将返回值转换为json对象
                var oE = eval("(" + e + ")");
                if (oE.code == 0) {
                    var datalist = oE.rows;
                    var deep = 0;
                    //负责人列表
                    $('.tanceng .ven_sell_quote_create_choose_owner_list').html(tree_list_person(datalist, deep));
                    //审批人列表
                    $('.tanceng .ven_sell_quote_create_choose_flow_list').html(tree_list_person(datalist, deep));
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

    //商品分类
    function venSellQuoteCreateChooseGoodsSortFn() {
        $.ajax({
            type: 'get',
            url: SERVER_URL + "/product-category/list",
            data: {
                token: token,
                pid: '',
                category: 1
            },
            dataType: "json",
            success: function (data) {
                console.log(data);
                $(".tanceng .ven_sell_quote_create_choose_goods_sort_list").html(tree_list(data.datalist)); // 所有分类总数
                setTimeout(function () {
                    // 总分类数量
                    $('.tanceng .ven_sell_quote_goods_sort_totals').html(data.datalist.length);
                    // 子级数量
                    for (var i = 0, len = $('.tanceng em.list_num_null').length; i < len; i++) {
                        $('.tanceng em.list_num_null').eq(i).find('i').html($('.tanceng em.list_num_null').eq(i).closest('ul').children('ul').length);
                    }
                }, 500);
                var deep = 0;
                // 所有分类图标样式控制
                if ($('.tanceng i.ven_sell_quote_create_choose_goods_sort_list').children().length == 0) {
                    $('.tanceng ul.l_hr_left_1').addClass('oth');
                    $('.tanceng li.hr_left_all span').addClass('oth')
                }
                // 下级分类图标样式控制
                for (var i = 0; i < $('.tanceng i.ven_sell_quote_create_choose_goods_sort_list li').length; i++) {
                    if ($('.tanceng i.ven_sell_quote_create_choose_goods_sort_list li').eq(i).next('ul').children().length == 0) {
                        $('.tanceng i.ven_sell_quote_create_choose_goods_sort_list li').eq(i).find('span').addClass('oth');
                        $('.tanceng i.ven_sell_quote_create_choose_goods_sort_list li').eq(i).parent('ul').addClass('oth')
                    }
                }
                $('.tanceng span.oth .list_num_null').remove();
                var aClassList = $('.tanceng .l_hr_left_1').find('li').filter('[class*="hr_left"]')
            },
            error: function (data) {
                alert(data);
            }
        });
    }

    var goodsData = {
        token: token,
        key: '',
        page: 1,    //第几页
        num: 10,    //每页条数
        cate_id: '', //1 分类id
        fields: '',  //’name,cat_id’ 字段列表
        status: 0   //状态0正常1停用
    };

    function venSellQuoteCreateChooseGoodsFn() {
        /*商品列表展示*/
        $.ajax({
            type: 'get',
            url: SERVER_URL + "/product/list",
            data: goodsData,
            dataType: "json",
            success: function (data) {
                var datalist = data.datalist;
                $('.tanceng .ven_sell_quote_create_choose_goods_totals').html(data.totalcount);
                if (datalist.length == 0) {
                    $('.ven_sell_quote_create_choose_goods_nodata_box').removeClass('none');
                    $('.ven_sell_quote_create_choose_goods_handle').addClass('none');
                } else {
                    $('.ven_sell_quote_create_choose_goods_nodata_box').addClass('none');
                    $('.ven_sell_quote_create_choose_goods_handle').removeClass('none');
                }
                console.log(datalist);
                var html = '';
                $.each(datalist, function (i, v) {
                    var attrHtml = '';
                    $.each(v['attributes'], function (i2, v2) {
                        attrHtml += v2['attr'] + '，'
                    });
                    if (attrHtml.slice(attrHtml.length - 1, attrHtml.length) == '，') {
                        attrHtml = attrHtml.slice(0, attrHtml.length - 1);
                    }
                    html += '<tr goodsid="' + v['id'] + '" goodstaxtype="' + v['taxtype'] + '">\
                                <td><input type="checkbox" name="cg_cgbjd_xzspAll"></td>\
                                <td><div class="num_input inline_block num_input_new"><button class="but_blue but_opa_small inp_plus">+</button><input type="text" class="goodsnum" value="1"><button class="but_blue but_opa_small radius_left_0 inp_reduce">-</button></div></td>\
                                <td class="goodscodesn">' + likNullData(v['code_sn']) + '</td>\
                                <td class="goodsname">' + likNullData(v['name']) + '</td>\
                                <td class="goodsunitname">' + likNullData(v['unit']) + '</td>\
                                <td class="goodsformat">' + likNullData(v['format']) + '</td>\
                                <td class="goodsattr">' + likNullData(attrHtml) + '</td>\
                                <td class="goodsretailprice">' + likNullData(v['retail_price']) + '</td>\
                                <td class="goodslowerprice">' + likNullData(v['lower_price']) + '</td>\
                                <td class="goodscostprice">' + likNullData(v['cost_price']) + '</td>\
                            </tr>';
                });
                $('.tanceng .ven_sell_quote_create_choose_goods_list').html(html);
                list_table_render_pagination(".ven_sell_quote_create_choose_goods_pagination", goodsData, venSellQuoteCreateChooseGoodsFn, data.totalcount, datalist.length);
            },
            error: function (data) {
                alert(data);
            }
        });
    }

    //选择分类 - 过滤商品
    $('.tanceng .ven_sell_quote_create_choose_goods_sort_ul_list li').live('click', function () {
        goodsData.cate_id = $(this).attr('cussortid');
        venSellQuoteCreateChooseGoodsFn();
    });
    //选择商品 - 搜索关键字
    $('.tanceng .ven_sell_quote_create_choose_goods_search_btn').live('click', function () {
        if ($('.tanceng .ven_sell_quote_create_choose_goods_search_inp').val() == '搜索商品编号/商品名称') {
            alert('请输入搜索关键字');
            goodsData.key = '';
        } else {
            goodsData.key = $('.tanceng .ven_sell_quote_create_choose_goods_search_inp').val();
        }
        venSellQuoteCreateChooseGoodsFn();
    });
    //选择商品
    var aSellQuoteCreateGoodsChosen = null;
    $('.tanceng .ven_sell_quote_create_choose_goods_btn').live('click', function () {
        venSellQuoteCreateChooseGoodsSortFn();
        venSellQuoteCreateChooseGoodsFn();
    });
    $('.tanceng .ven_sell_quote_choose_products_ul li').live('click', function () {
        if ($(this).index() == 0) {
            aSellQuoteCreateGoodsChosen = [];
        }
    });
    //选择商品 - 保存
    $('.tanceng .ven_sell_quote_create_choose_goods_save_btn').live('click', function () {
        $.each($('.tanceng .ven_sell_quote_create_choose_goods_list tr'), function (i, v) {
            if ($('.tanceng .ven_sell_quote_create_choose_goods_list tr').eq(i).find('input:checkbox').is(':checked')) {
                aSellQuoteCreateGoodsChosen.push({
                    'goodsid': $('.tanceng .ven_sell_quote_create_choose_goods_list tr').eq(i).attr('goodsid'),
                    'goodstaxtype': $('.tanceng .ven_sell_quote_create_choose_goods_list tr').eq(i).attr('goodstaxtype'),
                    'goodsname': $('.tanceng .ven_sell_quote_create_choose_goods_list tr').eq(i).find('td.goodsname').html(),
                    'goodsformat': $('.tanceng .ven_sell_quote_create_choose_goods_list tr').eq(i).find('td.goodsformat').html(),
                    'goodscodesn': $('.tanceng .ven_sell_quote_create_choose_goods_list tr').eq(i).find('td.goodscodesn').html(),
                    'goodsattr': $('.tanceng .ven_sell_quote_create_choose_goods_list tr').eq(i).find('td.goodsattr').html(),
                    'goodsunitname': $('.tanceng .ven_sell_quote_create_choose_goods_list tr').eq(i).find('td.goodsunitname').html(),
                    'goodsnum': $('.tanceng .ven_sell_quote_create_choose_goods_list tr').eq(i).find('input.goodsnum').val(),
                    'goodsretailprice': $('.tanceng .ven_sell_quote_create_choose_goods_list tr').eq(i).find('td.goodsretailprice').html(),
                    'goodslowerprice': $('.tanceng .ven_sell_quote_create_choose_goods_list tr').eq(i).find('td.goodslowerprice').html(),
                    'goodscostprice': $('.tanceng .ven_sell_quote_create_choose_goods_list tr').eq(i).find('td.goodscostprice').html()
                });
            }
            //$('.tanceng .ven_sell_quote_create_choose_goods_list tr').eq(i).find('input.goodsnum').val();
        });
        var venSellQuoteCreateGoodsList = '';
        aSellQuoteCreateGoodsChosen = getJsonArrIgnore(aSellQuoteCreateGoodsChosen, 'goodsnum');
        $.each(aSellQuoteCreateGoodsChosen, function (i, v) {
            var taxNum = 0;
            if (v['taxtype'] == 0) {
                taxNum = 0
            } else if (v['taxtype'] == 1) {
                taxNum = 17
            } else if (v['taxtype'] == 2) {
                taxNum = 6
            }
            venSellQuoteCreateGoodsList += '<tr goodsid="' + v['goodsid'] + '">\
                                            <td class="sell_quote_create_choose_goods_order">' + l_dbl(i + 1) + '</td>\
                                            <td class="sell_quote_create_choose_goods_name">' + v['goodsname'] + '/' + v['goodsformat'] + '</td>\
                                                <td>' + v['goodscodesn'] + '</td>\
                                                <td>' + v['goodsattr'] + '</td>\
                                                <td>' + v['goodsunitname'] + '</td>\
                                                <td>\
                                                <div class="num_input inline_block num_input_new"><button class="but_blue but_opa_small inp_plus ven_sell_quote_productnum_change">+</button><input type="text" class="productnum" value="' + v['goodsnum'] + '"/><button class="but_blue but_opa_small radius_left_0 inp_reduce ven_sell_quote_productnum_change">-</button></div>\
                                                    </td>\
                                                    <td>\
                                                    <div class="t_textinput inline_block" style="width: 100px;margin:0;">\
                                                    <div class="t_right" style="width: 100%;margin:0;">\
                                                    <div class="inline_block select_mormal select_100">\
                                                    <input type="text" class="select_input product_reference_price" value="' + v['goodsretailprice'] + '(零售价)">\
                                                    <i></i>\
                                                    <ul class="select_list sbar">\
                                                    <li>' + v['goodsretailprice'] + '(零售价)</li>\
                                                    <li>' + v['goodslowerprice'] + '(最低价)</li>\
                                                    <li>' + v['goodscostprice'] + '(成本价)</li>\
                                                    </ul>\
                                                    </div>\
                                                    </div>\
                                                    </div>\
                                                </td>\
                                                <td><input type="text"  onkeydown="value=value.replace(/[^\-?\\d.]/g,\'\')" onkeyup="value=value.replace(/[^\-?\\d.]/g,\'\')" class="time_input ven_sell_quote_goods_cost_one" value="' + v['goodsretailprice'] + '" style="color: rgb(153, 153, 153);width:63px;margin-right: 10px;"></td>\
                                                    <td class="ven_sell_quote_goods_cost_total">' + moneyToFixed(v['goodsretailprice'] * v['goodsnum']) + '</td>\
                                                    <td><span class="ven_sell_quote_goods_tax_one">' + taxNum + '</span></td>\
                                                    <td><span class="ven_sell_quote_goods_tax_total">' + moneyToFixed(v['goodsretailprice'] * v['goodsnum'] * parseFloat(taxNum) / 100) + '</span></td>\
                                                <td><button class="but_blue but_opa_small but_red ven_sell_quote_create_goods_del_btn">-</button></td>\
                                            </tr>'
        });
        $('.tanceng .ven_sell_quote_create_chosen_goods_tbody').html(venSellQuoteCreateGoodsList);
        productnumChangeFn();
        goodCostTotalsFn();
        goodTaxTotalsFn();
        $(this).closest('.dialog_box').remove();
    });
    //商品数量控制
    function productnumChangeFn() {
        var goodsNumTotal = 0;
        $.each($('.tanceng .ven_sell_quote_create_chosen_goods_tbody .productnum'), function (i, v) {
            goodsNumTotal += parseFloat($('.tanceng .ven_sell_quote_create_chosen_goods_tbody .productnum').eq(i).val());
        });
        $('.tanceng .goods_num_total').html(goodsNumTotal);
    }

    //商品数量增加减少
    $('.tanceng .ven_sell_quote_create_chosen_goods_tbody .ven_sell_quote_productnum_change').live('click', function () {
        var index = $(this).closest('tr').index();
        productnumChangeFn();
        goodCostCalcFn(index);
        goodCostTotalsFn();
        goodTaxTotalsFn();
    });
    //商品单价调整
    $('.tanceng .ven_sell_quote_create_chosen_goods_tbody .ven_sell_quote_goods_cost_one').live('keyup', function () {
        var index = $(this).closest('tr').index();
        goodCostCalcFn(index);
        goodCostTotalsFn();
        goodTaxTotalsFn();
    });
    //商品总价
    function goodCostTotalsFn() {
        var goodsCostTotals = 0;
        $.each($('.tanceng .ven_sell_quote_create_chosen_goods_tbody .ven_sell_quote_goods_cost_total'), function (i, v) {
            goodsCostTotals += parseFloat($('.tanceng .ven_sell_quote_create_chosen_goods_tbody .ven_sell_quote_goods_cost_total').eq(i).html());
        });
        $('.tanceng .goods_cost_total').html(moneyToFixed(goodsCostTotals));
        venSellQuoteCreateProductCostTotalFn();
    }

    //税额总价
    function goodTaxTotalsFn() {
        var goodsTaxTotals = 0;
        $.each($('.tanceng .ven_sell_quote_create_chosen_goods_tbody .ven_sell_quote_goods_tax_total'), function (i, v) {
            goodsTaxTotals += parseFloat($('.tanceng .ven_sell_quote_create_chosen_goods_tbody .ven_sell_quote_goods_tax_total').eq(i).html());
        });
        $('.tanceng .goods_tax_total').html(moneyToFixed(goodsTaxTotals));
    }

    //商品单条金额计算
    function goodCostCalcFn(index) {
        //单条商品价格
        $('.tanceng .ven_sell_quote_create_chosen_goods_tbody .ven_sell_quote_goods_cost_total').eq(index).html(moneyToFixed($('.tanceng .ven_sell_quote_create_chosen_goods_tbody .productnum').eq(index).val() * $('.tanceng .ven_sell_quote_create_chosen_goods_tbody .ven_sell_quote_goods_cost_one').eq(index).val()));
        //单条商品税额
        $('.tanceng .ven_sell_quote_create_chosen_goods_tbody .ven_sell_quote_goods_tax_total').eq(index).html(moneyToFixed($('.tanceng .ven_sell_quote_create_chosen_goods_tbody .ven_sell_quote_goods_cost_total').eq(index).html() * parseFloat($('.tanceng .ven_sell_quote_create_chosen_goods_tbody .ven_sell_quote_goods_tax_one').eq(index).html()) / 100));
    }

    //删除单条商品
    $('.tanceng .ven_sell_quote_create_chosen_goods_tbody .ven_sell_quote_create_goods_del_btn').live('click', function () {
        var index = $(this).closest('tr').index();
        aSellQuoteCreateGoodsChosen.splice(index, 1);
        $(this).closest('tr').remove();
        productnumChangeFn();
        goodCostTotalsFn();
        goodTaxTotalsFn();
        sellQuoteCreateGoodsArrOrderFn('ven_sell_quote_create_chosen_goods_tbody');
    });

    //选择商品 - 序号
    function sellQuoteCreateGoodsArrOrderFn(parentClass) {
        $.each($('.tanceng .' + parentClass + ' .sell_quote_create_choose_goods_order'), function (i, v) {
            $('.tanceng .' + parentClass + ' .sell_quote_create_choose_goods_order').eq(i).html(l_dbl(i + 1));
        })
    }

    /*新建销售报价单 - 选择套餐商品*/

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
                $('.tanceng .ven_sell_quote_create_choose_package_totals').html(data.totalcount);
                if (datalist.length == 0) {
                    $('.ven_sell_quote_create_choose_package_nodata_box').removeClass('none');
                    $('.ven_sell_quote_create_choose_package_handle').addClass('none');
                } else {
                    $('.ven_sell_quote_create_choose_package_nodata_box').addClass('none');
                    $('.ven_sell_quote_create_choose_package_handle').removeClass('none');
                }
                console.log(datalist);
                var html = '';
                $.each(datalist, function (i, v) {
                    html += '<tr packageid="' + v['id'] + '">\
                                <td><input type="checkbox" name="xs_bjd_xztcsp"></td>\
                                <td>\
                                <div class="num_input">\
                                <div class="num_input inline_block num_input_new"><button class="but_blue but_opa_small inp_plus">+</button><input type="text" class="packagenum" value="1" /><button class="but_blue but_opa_small radius_left_0 inp_reduce">-</button></div>\
                                </div>\
                                </td>\
                                <td>' + likNullData(v['code_sn']) + '</td>\
                                <td>' + likNullData(v['name']) + '</td>\
                                <td>' + likNullData(v['sum_price']) + '</td>\
                                <td>' + likNullData(v['sum_tax']) + '</td>\
                            </tr>'
                });
                $('.tanceng .ven_sell_quote_create_choose_package_list').html(html);
                list_table_render_pagination(".ven_sell_quote_create_choose_package_pagination", getPackagePackageData, venSellQuoteCreateChoosePackageFn, data.totalcount, datalist.length);
            },
            error: function (data) {
                alert(data);
            }
        });
    };

    //选择套餐商品
    $('.tanceng .ven_sell_quote_create_choose_package_btn').live('click', function () {
        venSellQuoteCreateChoosePackageFn();
    });

    //搜索关键字
    $('.tanceng .ven_sell_quote_create_choose_package_search_btn').live('click', function () {
        if ($('.tanceng .ven_sell_quote_create_choose_package_inp').val() == '搜索套餐商品') {
            alert('请输入关键字');
            getPackagePackageData.key = '';
        } else {
            getPackagePackageData.key = $('.tanceng .ven_sell_quote_create_choose_package_inp').val();
        }
        venSellQuoteCreateChoosePackageFn();
    });
    //选择套餐商品 - 保存
    var aSellQuoteCreatePackageChosen = [];
    $('.tanceng .ven_sell_quote_create_choose_package_save').live('click', function () {
        $.each($('.tanceng .ven_sell_quote_create_choose_package_list tr'), function (i, v) {
            if ($('.tanceng .ven_sell_quote_create_choose_package_list tr').eq(i).find('input:checkbox').is(':checked')) {
                aSellQuoteCreatePackageChosen.push({
                    packageid: $('.tanceng .ven_sell_quote_create_choose_package_list tr').eq(i).attr('packageid'),
                    packagenum: $('.tanceng .ven_sell_quote_create_choose_package_list tr').eq(i).find('.packagenum').val()
                });
            }
        });
        //套餐商品数据展示
        var sellQuoteCreatePackageParentHtml = '';
        var sellQuoteCreatePackageChildHtml = '';
        var sellQuoteCreatePackageChildArr = [];
        aSellQuoteCreatePackageChosen = getJsonArrIgnore(aSellQuoteCreatePackageChosen, 'packagenum');
        $.each(aSellQuoteCreatePackageChosen, function (i, v) {
            //获取套餐详情
            $.ajax({
                url: SERVER_URL + "/product-package/loadpackage",
                type: 'get',
                data: {
                    token: token,
                    id: v['packageid']
                },
                dataType: "json",
                async: false,
                success: function (data) {
                    var data = data.data;
                    console.log(data);
                    //套餐大类
                    sellQuoteCreatePackageParentHtml += '<tr class="pack' + data['code_sn'] + '" packsign="pack' + data['code_sn'] + '" packageid="' + data['id'] + '">\
                                                            <td>' + l_dbl(i + 1) + '</td>\
                                                            <td>' + likNullData(data['name']) + '</td>\
                                                            <td>' + likNullData(data['code_sn']) + '</td>\
                                                            <td>\
                                                                <div class="num_input inline_block num_input_new">\
                                                                    <button class="but_blue but_opa_small inp_plus sell_quote_create_package_num_change">+</button>\
                                                                    <input type="text" class="sell_quote_create_package_num" value="' + v['packagenum'] + '"/>\
                                                                    <button class="but_blue but_opa_small radius_left_0 inp_reduce sell_quote_create_package_num_change">-</button>\
                                                                </div>\
                                                            </td>\
                                                            <td class="sell_quote_create_package_cost">' + data['totalNum'] + '</td>\
                                                            <td>\
                                                            <button class="but_blue but_opa_small but_red ven_sell_quote_choose_package_delone_btn">-</button>\
                                                            </td>\
                                                        </tr>';
                    //给每一个套餐子商品加一个独特字段
                    $.each(data['package_info'], function (i5, v5) {
                        v5.pack_mark = 'pack' + (data['code_sn']);
                        v5.pack_num = v['packagenum'];
                    });
                    //把套餐的子商品放在一个数组里
                    sellQuoteCreatePackageChildArr = sellQuoteCreatePackageChildArr.concat(data['package_info']);
                }
            });
        });
        //循环套餐子商品
        $.each(sellQuoteCreatePackageChildArr, function (i, v) {
            var packageChildAttr = '';
            $.each(v['attributes'], function (i2, v2) {
                packageChildAttr += v2['pid_name'] + v2['name']
            });
            var taxNum = 0;
            if (v['taxtype'] == 0) {
                taxNum = 0
            } else if (v['taxtype'] == 1) {
                taxNum = 17
            } else if (v['taxtype'] == 2) {
                taxNum = 6
            }
            sellQuoteCreatePackageChildHtml += '<tr packagechildid="' + v['id'] + '" class="' + v['pack_mark'] + '">\
                                                    <td>' + l_dbl(i + 1) + '</td>\
                                                    <td>' + likNullData(v['name']) + '/' + likNullData(v['format']) + '</td>\
                                                    <td>' + likNullData(v['code_sn']) + '</td>\
                                                    <td>' + packageChildAttr + '</td>\
                                                    <td>' + likNullData(v['unit']) + '</td>\
                                                    <td class="pack_child_num">' + likNullData(v['num']) + '</td>\
                                                    <td class="relative pack_child_cost">' + likNullData(v['price']) + '</td>\
                                                    <td class="pack_child_num_total">' + likNullData(v['num'] * v['pack_num']) + '</td>\
                                                    <td class="relative pack_child_cost_total">' + moneyToFixed(v['num'] * v['price'] * v['pack_num']) + '</td>\
                                                    <td>\
                                                    <div class="t_textinput" style="margin:0;">\
                                                    <div class="t_right" style="margin-left:0;">' + taxNum + '</div>\
                                                    </div>\
                                                    </td>\
                                                    <td class="pack_child_tax">' + moneyToFixed(v["price"] * parseFloat(taxNum) / 100) + '</td>\
                                                    <td class="pack_child_tax_total">' + moneyToFixed(v['num'] * v['price'] * v['pack_num'] * parseFloat(taxNum) / 100) + '</td>\
                                                </tr>'
        });
        $('.tanceng .ven_sell_quote_choose_package_parent_tbody').html(sellQuoteCreatePackageParentHtml);
        $('.tanceng .ven_sell_quote_choose_package_child_tbody').html(sellQuoteCreatePackageChildHtml);
        $(this).closest('.dialog_box').remove();
        //套餐商品总数
        packageNumFn();
    });

    //套餐商品总数函数
    function packageNumFn() {
        var sellQuoteCreatePackageNum = 0;
        $.each($('.tanceng .ven_sell_quote_choose_package_parent_tbody .sell_quote_create_package_num'), function (i, v) {
            sellQuoteCreatePackageNum += parseFloat($('.tanceng .ven_sell_quote_choose_package_parent_tbody .sell_quote_create_package_num').eq(i).val());
        });
        $('.tanceng .sell_quote_create_package_num_total').html(sellQuoteCreatePackageNum);
        //套餐商品总价
        packageCostTotalFn();
        //套餐包含子商品数量和金额
        packageChildrenChangeFn()
    }

    //套餐商品总价函数
    function packageCostTotalFn() {
        var sellQuoteCreatePackageCostTotal = 0;
        $.each($('.tanceng .ven_sell_quote_choose_package_parent_tbody .sell_quote_create_package_cost'), function (i, v) {
            sellQuoteCreatePackageCostTotal += parseFloat($('.tanceng .ven_sell_quote_choose_package_parent_tbody .sell_quote_create_package_cost').eq(i).html());
        });
        $('.tanceng .sell_quote_create_package_cost_total').html(sellQuoteCreatePackageCostTotal);
    }

    //套餐包含子商品数量和金额函数
    function packageChildrenChangeFn() {
        //子商品总数量
        var packChildrenNumTotal = 0;
        $.each($('.tanceng .ven_sell_quote_choose_package_child_tbody .pack_child_num_total'), function (i, v) {
            packChildrenNumTotal += parseFloat($('.tanceng .ven_sell_quote_choose_package_child_tbody .pack_child_num_total').eq(i).html());
        });
        $('.tanceng .sell_quote_create_package_children_num_total').html(packChildrenNumTotal);
        //子商品总价格
        var packChildrenCostTotal = 0;
        $.each($('.tanceng .ven_sell_quote_choose_package_child_tbody .pack_child_cost_total'), function (i, v) {
            packChildrenCostTotal += parseFloat($('.tanceng .ven_sell_quote_choose_package_child_tbody .pack_child_cost_total').eq(i).html());
        });
        $('.tanceng .sell_quote_create_package_children_cost_total').html(packChildrenCostTotal);
        //子商品总含税额
        var packChildrenTaxTotal = 0;
        $.each($('.tanceng .ven_sell_quote_choose_package_child_tbody .pack_child_tax_total'), function (i, v) {
            packChildrenTaxTotal += parseFloat($('.tanceng .ven_sell_quote_choose_package_child_tbody .pack_child_tax_total').eq(i).html());
        });
        $('.tanceng .sell_quote_create_package_children_tax_total').html(packChildrenTaxTotal);
        venSellQuoteCreateProductCostTotalFn();
    }

    //单条套餐商品增加减少
    $('.tanceng .sell_quote_create_package_num_change').live('click', function () {
        packageNumFn();
        //套餐商品子商品数量和金额控制
        var parentPacksign = $(this).closest('tr').attr('packsign');
        var sellQuoteCreatePackageNum = $(this).siblings('.sell_quote_create_package_num').val();
        var sellQuoteCreatePackageCost = 0;
        $.each($('.tanceng .ven_sell_quote_choose_package_child_tbody .' + parentPacksign), function (i, v) {
            //单条子商品总数量
            var packChildNum = $('.tanceng .ven_sell_quote_choose_package_child_tbody .' + parentPacksign).eq(i).find('.pack_child_num').html();
            $('.tanceng .ven_sell_quote_choose_package_child_tbody .' + parentPacksign).eq(i).find('.pack_child_num_total').html(sellQuoteCreatePackageNum * packChildNum);
            //单条子商品价格
            var packChildCost = $('.tanceng .ven_sell_quote_choose_package_child_tbody .' + parentPacksign).eq(i).find('.pack_child_cost').html();
            var packChildCostTotal = moneyToFixed(sellQuoteCreatePackageNum * packChildNum * packChildCost);
            $('.tanceng .ven_sell_quote_choose_package_child_tbody .' + parentPacksign).eq(i).find('.pack_child_cost_total').html(packChildCostTotal);
            //单条子商品含税额
            var packChildTax = $('.tanceng .ven_sell_quote_choose_package_child_tbody .' + parentPacksign).eq(i).find('.pack_child_tax').html();
            var packChildTaxTotal = moneyToFixed(sellQuoteCreatePackageNum * packChildNum * packChildTax);
            $('.tanceng .ven_sell_quote_choose_package_child_tbody .' + parentPacksign).eq(i).find('.pack_child_tax_total').html(packChildTaxTotal);
            sellQuoteCreatePackageCost += parseFloat(packChildCostTotal) + parseFloat(packChildTaxTotal);
        });
        $('.tanceng .ven_sell_quote_choose_package_parent_tbody .' + parentPacksign + ' .sell_quote_create_package_cost').html(sellQuoteCreatePackageCost);
        packageCostTotalFn();
        packageChildrenChangeFn();
    });

    //删除单条套餐商品
    $('.tanceng .ven_sell_quote_choose_package_parent_tbody .ven_sell_quote_choose_package_delone_btn').live('click', function () {
        var index = $(this).closest('tr').index();
        aSellQuoteCreatePackageChosen.splice(index, 1);
        $(this).closest('tr').remove();
        //重新渲染
        sellQuoteCreatePackageParentHtml = '';
        sellQuoteCreatePackageChildHtml = '';
        sellQuoteCreatePackageChildArr = [];
        $.each(aSellQuoteCreatePackageChosen, function (i, v) {
            //获取套餐详情
            $.ajax({
                url: SERVER_URL + "/product-package/loadpackage",
                type: 'get',
                data: {
                    token: token,
                    id: v['packageid']
                },
                dataType: "json",
                async: false,
                success: function (data) {
                    var data = data.data;
                    //套餐大类
                    sellQuoteCreatePackageParentHtml += '<tr class="pack' + data['code_sn'] + '" packsign="pack' + data['code_sn'] + '">\
                                                            <td>' + l_dbl(i + 1) + '</td>\
                                                            <td>' + likNullData(data['name']) + '</td>\
                                                            <td>' + likNullData(data['code_sn']) + '</td>\
                                                            <td>\
                                                                <div class="num_input inline_block num_input_new">\
                                                                    <button class="but_blue but_opa_small inp_plus sell_quote_create_package_num_change">+</button>\
                                                                    <input type="text" class="sell_quote_create_package_num" value="' + v['packagenum'] + '"/>\
                                                                    <button class="but_blue but_opa_small radius_left_0 inp_reduce sell_quote_create_package_num_change">-</button>\
                                                                </div>\
                                                            </td>\
                                                            <td class="sell_quote_create_package_cost">' + (data['sum_price'] + data['sum_tax']) + '</td>\
                                                            <td>\
                                                            <button class="but_blue but_opa_small but_red ven_sell_quote_choose_package_delone_btn">-</button>\
                                                            </td>\
                                                        </tr>';
                    //给每一个套餐子商品加一个独特字段
                    $.each(data['package_info'], function (i5, v5) {
                        v5.pack_mark = 'pack' + (data['code_sn']);
                        v5.pack_num = v['packagenum'];
                    });
                    //把套餐的子商品放在一个数组里
                    sellQuoteCreatePackageChildArr = sellQuoteCreatePackageChildArr.concat(data['package_info']);
                }
            });
        });
        //循环套餐子商品
        $.each(sellQuoteCreatePackageChildArr, function (i, v) {
            var packageChildAttr = '';
            $.each(v['attributes'], function (i2, v2) {
                packageChildAttr += v2['pid_name'] + v2['name']
            });
            var taxNum = 0;
            if (v['taxtype'] == 0) {
                taxNum = 0
            } else if (v['taxtype'] == 1) {
                taxNum = 17
            } else if (v['taxtype'] == 2) {
                taxNum = 6
            }
            sellQuoteCreatePackageChildHtml += '<tr class="' + v['pack_mark'] + '">\
                                                    <td>' + l_dbl(i + 1) + '</td>\
                                                    <td>' + likNullData(v['name']) + '/' + likNullData(v['format']) + '</td>\
                                                    <td>' + likNullData(v['code_sn']) + '</td>\
                                                    <td>' + packageChildAttr + '</td>\
                                                    <td>' + likNullData(v['unit']) + '</td>\
                                                    <td class="pack_child_num">' + likNullData(v['num']) + '</td>\
                                                    <td class="relative pack_child_cost">' + likNullData(v['price']) + '</td>\
                                                    <td class="pack_child_num_total">' + likNullData(v['num'] * v['pack_num']) + '</td>\
                                                    <td class="relative pack_child_cost_total">' + moneyToFixed(v['num'] * v['price'] * v['pack_num']) + '</td>\
                                                    <td>\
                                                    <div class="t_textinput" style="margin:0;">\
                                                    <div class="t_right" style="margin-left:0;">' + taxNum + '</div>\
                                                    </div>\
                                                    </td>\
                                                    <td class="pack_child_tax">' + moneyToFixed(v["price"] * parseFloat(taxNum) / 100) + '</td>\
                                                    <td class="pack_child_tax_total">' + moneyToFixed(v['num'] * v['price'] * v['pack_num'] * parseFloat(taxNum) / 100) + '</td>\
                                                </tr>'
        });
        $('.tanceng .ven_sell_quote_choose_package_parent_tbody').html(sellQuoteCreatePackageParentHtml);
        $('.tanceng .ven_sell_quote_choose_package_child_tbody').html(sellQuoteCreatePackageChildHtml);
        sellQuoteCreateGoodsArrOrderFn('ven_sell_quote_create_chosen_goods_tbody');
        //套餐商品总数
        packageNumFn();
    });

    /*配置商品*/

    var settingData = {
        token: token,
        key: '',
        page: 1,    //第几页
        num: 10,    //每页条数
        cate_id: 0, //1 分类id
        status: 0   //状态0正常1停用
    };
    $('.tanceng .ven_sell_quote_create_choose_setting_btn').live('click', function () {
        venSellQuoteCreateChooseSettingSortFn();
        settingData = {
            token: token,
            key: '',
            page: 1,    //第几页
            num: 10,    //每页条数
            cate_id: 0, //1 分类id
            status: 0   //状态0正常1停用
        };
        venSellQuoteCreateChooseSettingFn();
    });

    //配置商品分类
    function venSellQuoteCreateChooseSettingSortFn() {
        $.ajax({
            type: 'get',
            url: SERVER_URL + "/product-category/list",
            data: {
                token: token,
                pid: '',
                category: 2
            },
            dataType: "json",
            success: function (data) {
                $(".tanceng .ven_sell_quote_create_choose_setting_sort_list").html(tree_list(data.datalist)); // 所有分类总数
                setTimeout(function () {
                    // 总分类数量
                    $('.tanceng .ven_sell_quote_setting_sort_totals').html(data.datalist.length);
                    // 子级数量
                    for (var i = 0, len = $('.tanceng em.list_num_null').length; i < len; i++) {
                        $('.tanceng em.list_num_null').eq(i).find('i').html($('.tanceng em.list_num_null').eq(i).closest('ul').children('ul').length);
                    }
                }, 500);
                var deep = 0;
                // 所有分类图标样式控制
                if ($('.tanceng i.ven_sell_quote_create_choose_setting_sort_list').children().length == 0) {
                    $('.tanceng ul.l_hr_left_1').addClass('oth');
                    $('.tanceng li.hr_left_all span').addClass('oth')
                }
                // 下级分类图标样式控制
                for (var i = 0; i < $('.tanceng i.ven_sell_quote_create_choose_setting_sort_list li').length; i++) {
                    if ($('.tanceng i.ven_sell_quote_create_choose_setting_sort_list li').eq(i).next('ul').children().length == 0) {
                        $('.tanceng i.ven_sell_quote_create_choose_setting_sort_list li').eq(i).find('span').addClass('oth');
                        $('.tanceng i.ven_sell_quote_create_choose_setting_sort_list li').eq(i).parent('ul').addClass('oth');
                    }
                }
                $('.tanceng span.oth .list_num_null').remove();
                var aClassList = $('.tanceng .l_hr_left_1').find('li').filter('[class*="hr_left"]');
            },
            error: function (data) {
                alert(data);
            }
        });
    }

    //选择配置分类选择配置商品
    $('.tanceng .ven_sell_quote_create_choose_setting_sort_ul_list li').live('click', function () {
        settingData.cate_id = $(this).attr('cussortid');
        venSellQuoteCreateChooseSettingFn();
    })

    function venSellQuoteCreateChooseSettingFn() {
        /*配置商品列表展示*/
        $.ajax({
            type: 'get',
            url: SERVER_URL + "/product-setting/list",
            data: settingData,
            dataType: "json",
            success: function (data) {
                var datalist = data.datalist;
                console.log(data);
                $('.tanceng .ven_sell_quote_create_choose_setting_totals').html(data.totalcount);
                if (datalist.length == 0) {
                    $('.ven_sell_quote_create_choose_setting_nodata_box').removeClass('none');
                    $('.ven_sell_quote_create_choose_setting_handle').addClass('none');
                } else {
                    $('.ven_sell_quote_create_choose_setting_nodata_box').addClass('none');
                    $('.ven_sell_quote_create_choose_setting_handle').removeClass('none');
                }
                console.log(datalist);
                var html = '';
                $.each(datalist, function (i, v) {
                    var attrHtml = '';
                    $.each(v['attributes'], function (i2, v2) {
                        attrHtml += v2['attr'] + '，'
                    });
                    if (attrHtml.slice(attrHtml.length - 1, attrHtml.length) == '，') {
                        attrHtml = attrHtml.slice(0, attrHtml.length - 1);
                    }
                    html += '<tr settingid="' + v['id'] + '">\
                                <td><input type="checkbox" name="cg_cgbjd_xzpzspAll"></td>\
                                <td class="settingcodesn">' + v['code_sn'] + '</td>\
                                <td class="settingname">' + v['name'] + '</td>\
                                <td class="settingunitname">' + v['unit_name'] + '</td>\
                            </tr>';
                });
                $('.tanceng .ven_sell_quote_create_choose_setting_list').html(html);
                list_table_render_pagination(".ven_sell_quote_create_choose_setting_pagination", settingData, venSellQuoteCreateChooseSettingFn, data.totalcount, datalist.length);
            },
            error: function (data) {
                alert(data);
            }
        });
    }

    //配置商品 - 搜索关键字
    $('.tanceng .ven_sell_quote_create_choose_setting_search_btn').live('click', function () {
        if ($('.tanceng .ven_sell_quote_create_choose_setting_search_inp').val() == '搜索商品编号/商品名称') {
            alert('请输入搜索关键字');
            settingData.key = '';
        } else {
            settingData.key = $('.tanceng .ven_sell_quote_create_choose_setting_search_inp').val();
        }
        venSellQuoteCreateChooseSettingFn();
    });

    //选择配置商品 - 保存
    var aSellQuoteCreateSettingChosen = [];
    $('.tanceng .ven_sell_quote_create_choose_setting_save').live('click', function () {
        $.each($('.tanceng .ven_sell_quote_create_choose_setting_list tr'), function (i, v) {
            if ($('.tanceng .ven_sell_quote_create_choose_setting_list tr').eq(i).find('input:checkbox').is(':checked')) {
                aSellQuoteCreateSettingChosen.push({
                    'settingid': $('.tanceng .ven_sell_quote_create_choose_setting_list tr').eq(i).attr('settingid'),
                    'settingname': $('.tanceng .ven_sell_quote_create_choose_setting_list tr').eq(i).find('td.settingname').html(),
                    'settingcodesn': $('.tanceng .ven_sell_quote_create_choose_setting_list tr').eq(i).find('td.settingcodesn').html(),
                    'settingunitname': $('.tanceng .ven_sell_quote_create_choose_setting_list tr').eq(i).find('td.settingunitname').html()
                });
            }
        });
        aSellQuoteCreateSettingChosen = getJsonArr(aSellQuoteCreateSettingChosen);
        console.log(aSellQuoteCreateSettingChosen);
        $(this).closest('.dialog_box').remove();
        //配置商品选择后展示列表
        var aSellQuoteCreateSettingChosenHtml = '';
        $.each(aSellQuoteCreateSettingChosen, function (i, v) {
            aSellQuoteCreateSettingChosenHtml += '<tr class="set' + v['settingid'] + '" settingsign="set' + v['settingid'] + '" settingid="' + v['settingid'] + '">\
                                                        <td><span>' + v['settingname'] + '</span><button class="but_small but_blue val_dialogTop ven_sell_quote_create_choose_setting_goods_btn" name="xs_bjd_xzpzsp">选择搭配商品</button></td>\
                                                        <td>' + v['settingcodesn'] + '</td>\
                                                        <td>' + v['settingunitname'] + '</td>\
                                                        <td>\
                                                        <div class="num_input inline_block num_input_new"><button class="but_blue but_opa_small inp_plus ven_sell_quote_setting_parent_num_change_btn">+</button><input class="ven_sell_quote_setting_parent_num" type="text" value="1"/><button class="but_blue but_opa_small radius_left_0 inp_reduce ven_sell_quote_setting_parent_num_change_btn">-</button></div>\
                                                        </td>\
                                                        <td></td>\
                                                        <td>\
                                                        <button class="but_red but_opa_small but_blue ven_sell_quote_create_setting_parent_del_btn">-</button>\
                                                        </td>\
                                                    </tr>'
        });
        $('.tanceng .ven_sell_quote_create_chosen_setting_tbody').html(aSellQuoteCreateSettingChosenHtml);
    });

    //选择搭配商品
    $('.tanceng .ven_sell_quote_create_choose_setting_goods_btn').live('click', function () {
        var settingId = $(this).closest('tr').attr('settingid');
        var settingSign = $(this).closest('tr').attr('settingsign');
        $('.tanceng .ven_sell_quote_create_choose_setting_goods_parent_name').html($(this).siblings('span').text());
        $.ajax({
            url: SERVER_URL + "/product-setting/loadsetting",
            type: 'get',
            data: {
                token: token,
                id: settingId
            },
            dataType: "json",
            success: function (e) {
                if (e.code == 0) {
                    var data = e.data;
                    var settingInfo = data['setting_info'];
                    console.log(settingInfo);
                    var settingHtmlLeft = '';
                    var settingHtmlRight = '';
                    $.each(settingInfo, function (i, v) {
                        var settingChild = v['list'];
                        var settingChildHtml = '';
                        $.each(settingChild, function (i2, v2) {
                            settingChildHtml += '<li settingsign="' + settingSign + '" settingchildid="' + v2['product_id'] + '" settingchildname="' + v2['product_name'] + '" settingchildformat="' + v2['format'] + '" settingchildcodesn="' + v2['code_sn'] + '" settingchildattr="' + v2['attr_name'] + '" settingchildunit="' + v2['unit_name'] + '"><input type="checkbox" class="ven_sell_quote_create_setting_list_checkbox">' + v2['product_name'] + ', 规格' + v2['format'] + ', 编号' + v2['code_sn'] + ', 属性' + v2['attr_name'] + ', 单位' + v2['unit_name'] + '</li>'
                        });
                        settingHtmlLeft += '<div class="sp_sppz_ptMAs">\
                                            <div class="box_Open">\
                                            <p class="box_open_head">' + v['cate_name'] + '<span class="box_open_btn" style="right: 10px;">收起 <i class="right icon_show"></i></span>\
                                            </p>\
                                            <ul class="box_open_list">' + settingChildHtml + '</ul>\
                                        </div>\
                                        </div>';
                        settingHtmlRight += '<div class="sp_sppz_ptMAs">\
                            <div class="box_Open" style="width: 430px;">\
                            <p class="box_open_head">' + v['cate_name'] + '</p>\
                            <div class="box_open_list">\
                        </div>\
                        </div>\
                        </div>';
                    });
                    $('.tanceng .ven_sell_quote_create_setting_list_left').html(settingHtmlLeft);
                    $('.tanceng .ven_sell_quote_create_setting_list_right').html(settingHtmlRight);
                } else {
                    alert(e.msg);
                }
            },
            error: function (data) {
                alert(data);
            }
        });
    });
    $('.tanceng .ven_sell_quote_create_setting_list_checkbox').live('click', function () {
        var currentIndex = $(this).closest('.sp_sppz_ptMAs').index();
        var settingGoodsChosen = '';
        $.each($('.tanceng .ven_sell_quote_create_setting_list_left .sp_sppz_ptMAs').eq(currentIndex).find('li'), function (i, v) {
            if ($('.tanceng .ven_sell_quote_create_setting_list_left .sp_sppz_ptMAs').eq(currentIndex).find('li').eq(i).find('input:checkbox').attr('checked') == 'checked') {
                settingGoodsChosen += '<p settingsign="' + $('.tanceng .ven_sell_quote_create_setting_list_left .sp_sppz_ptMAs').eq(currentIndex).find('li').eq(i).attr('settingsign') + '" settingchildid="' + $('.tanceng .ven_sell_quote_create_setting_list_left .sp_sppz_ptMAs').eq(currentIndex).find('li').eq(i).attr('settingchildid') + '" settingchildname="' + $('.tanceng .ven_sell_quote_create_setting_list_left .sp_sppz_ptMAs').eq(currentIndex).find('li').eq(i).attr('settingchildname') + '" settingchildformat="' + $('.tanceng .ven_sell_quote_create_setting_list_left .sp_sppz_ptMAs').eq(currentIndex).find('li').eq(i).attr('settingchildformat') + '" settingchildcodesn="' + $('.tanceng .ven_sell_quote_create_setting_list_left .sp_sppz_ptMAs').eq(currentIndex).find('li').eq(i).attr('settingchildcodesn') + '" settingchildattr="' + $('.tanceng .ven_sell_quote_create_setting_list_left .sp_sppz_ptMAs').eq(currentIndex).find('li').eq(i).attr('settingchildattr') + '" settingchildunit="' + $('.tanceng .ven_sell_quote_create_setting_list_left .sp_sppz_ptMAs').eq(currentIndex).find('li').eq(i).attr('settingchildunit') + '" class="settingchildchosen">' + $('.tanceng .ven_sell_quote_create_setting_list_left .sp_sppz_ptMAs').eq(currentIndex).find('li').eq(i).text() + '</p>'
            }
        });
        $('.tanceng .ven_sell_quote_create_setting_list_right .sp_sppz_ptMAs').eq(currentIndex).find('.box_open_list').html(settingGoodsChosen);
    });
    //选择搭配商品保存
    var settingChildIdArr = [];
    $('.tanceng .ven_sell_quote_create_choose_setting_child_save_btn').die('click').live('click', function () {
        var settingChildChosenHtml = '';
        $.each($('.tanceng .ven_sell_quote_create_setting_list_right .settingchildchosen'), function (i, v) {
            var $_k = $('.tanceng .ven_sell_quote_create_setting_list_right .settingchildchosen').eq(i);
            settingChildIdArr.push({
                settingChildId: $_k.attr('settingchildid'),
                settingChildClass: $_k.attr('settingsign')
            });
            /*$.ajax({
             url: SERVER_URL + "/product/loadproduct",
             type: 'get',
             data: {
             token: token,
             id: curid
             },
             dataType: "json",
             async: false,
             success: function (e) {
             var data = e.data;
             console.log(data);
             var taxNum = 0;
             if (data['taxtype'] == 0) {
             taxNum = 0;
             } else if (data['taxtype'] == 1) {
             taxNum = 17;
             } else if (data['taxtype'] == 2) {
             taxNum = 6;
             }
             settingChildChosenHtml += '<tr class="' + $_k.attr('settingsign') + '" settingchildid="' + $_k.attr('settingchildid') + '">\
             <td class="settingchildorder">' + l_dbl(i + 1) + '</td>\
             <td>' + $_k.attr('settingchildname') + ' / ' + $_k.attr('settingchildformat') + '</td>\
             <td>' + $_k.attr('settingchildcodesn') + '</td>\
             <td>' + $_k.attr('settingchildattr') + '</td>\
             <td>' + $_k.attr('settingchildunit') + '</td>\
             <td><div class="num_input inline_block num_input_new"><button class="but_blue but_opa_small inp_plus">+</button><input type="text" value="1"><button class="but_blue but_opa_small radius_left_0 inp_reduce">-</button></div></td>\
             <td><div class="t_textinput inline_block" style="width: 100px;margin:0;">\
             <div class="t_right" style="width: 100%;margin:0;">\
             <div class="inline_block select_mormal select_100">\
             <input type="text" class="select_input product_reference_price" value="' + data['retail_price'] + '(零售价)">\
             <i></i>\
             <ul class="select_list sbar">\
             <li>' + data['retail_price'] + '(零售价)</li>\
             <li>' + data['lower_price'] + '(最低价)</li>\
             <li>' + data['cost_price'] + '(成本价)</li>\
             </ul>\
             </div>\
             </div>\
             </div></td>\
             <td><input type="text" onkeydown="value=value.replace(/[^-?\\d.]/g,\'\')" onkeyup="value=value.replace(/[^-?\\d.]/g,\'\')" class="time_input ven_sell_quote_setting_cost_one" value="' + data['retail_price'] + '" style="color: rgb(153, 153, 153);width:63px;margin-right: 10px;"></td>\
             <td class="ven_sell_quote_setting_child_one_num_total">1</td>\
             <td class="ven_sell_quote_setting_child_one_cost_total">' + data['retail_price'] + '</td>\
             <td class="ven_sell_quote_setting_child_one_tax">' + taxNum + '</td>\
             <td>'+(parseFloat(data['retail_price'])*parseFloat(taxNum)/100)+'</td>\
             <td>'+(parseFloat(data['retail_price'])*parseFloat(taxNum)/100)+'</td>\
             <td class="xs_butbox">\
             <button class="but_red but_opa_small but_blue ven_sell_quote_create_setting_del_btn">-</button>\
             </td>\
             </tr>'
             },
             error: function (data) {
             alert(data);
             }
             });*/
        });
        settingChildIdArr = getJsonArr(settingChildIdArr);
        $.each(settingChildIdArr, function (i, v) {
            $.ajax({
                url: SERVER_URL + "/product/loadproduct",
                type: 'get',
                data: {
                    token: token,
                    id: v['settingChildId']
                },
                dataType: "json",
                async: false,
                success: function (e) {
                    var data = e.data;
                    console.log(data);
                    var taxNum = 0;
                    if (data['taxtype'] == 0) {
                        taxNum = 0;
                    } else if (data['taxtype'] == 1) {
                        taxNum = 17;
                    } else if (data['taxtype'] == 2) {
                        taxNum = 6;
                    }
                    var attrHtml = '';
                    $.each(data['attributes'], function (i2, v2) {
                        attrHtml += v2['attr'] + ','
                    });
                    attrHtml = attrHtml.slice(0, attrHtml.length - 1);
                    settingChildChosenHtml += '<tr class="' + v['settingChildClass'] + '" settingchildid="' + v['settingChildId'] + '">\
                             <td class="settingchildorder">' + l_dbl(i + 1) + '</td>\
                             <td>' + data['name'] + ' / ' + data['format'] + '</td>\
                             <td>' + data['code_sn'] + '</td>\
                             <td>' + attrHtml + '</td>\
                             <td>' + data['unit_name'] + '</td>\
                             <td><div class="num_input inline_block num_input_new"><button class="but_blue but_opa_small inp_plus ven_sell_quote_setting_child_num_change_btn">+</button><input class="ven_sell_quote_setting_child_one_num" type="text" value="1"><button class="but_blue but_opa_small radius_left_0 inp_reduce ven_sell_quote_setting_child_num_change_btn">-</button></div></td>\
                             <td><div class="t_textinput inline_block" style="width: 100px;margin:0;">\
                             <div class="t_right" style="width: 100%;margin:0;">\
                             <div class="inline_block select_mormal select_100">\
                             <input type="text" class="select_input product_reference_price" value="' + data['retail_price'] + '(零售价)">\
                             <i></i>\
                             <ul class="select_list sbar">\
                             <li>' + data['retail_price'] + '(零售价)</li>\
                             <li>' + data['lower_price'] + '(最低价)</li>\
                             <li>' + data['cost_price'] + '(成本价)</li>\
                             </ul>\
                             </div>\
                             </div>\
                             </div></td>\
                             <td><input class="ven_sell_quote_setting_child_one_cost" type="text" onkeydown="value=value.replace(/[^-?\\d.]/g,\'\')" onkeyup="value=value.replace(/[^-?\\d.]/g,\'\')" class="time_input ven_sell_quote_setting_cost_one" value="' + data['retail_price'] + '" style="color: rgb(153, 153, 153);width:63px;margin-right: 10px;"></td>\
                             <td class="ven_sell_quote_setting_child_one_num_total">1</td>\
                             <td class="ven_sell_quote_setting_child_one_cost_total">' + data['retail_price'] + '</td>\
                             <td class="ven_sell_quote_setting_child_one_tax">' + taxNum + '</td>\
                             <td class="ven_sell_quote_setting_child_one_tax_text">' + (parseFloat(data['retail_price']) * parseFloat(taxNum) / 100) + '</td>\
                             <td class="ven_sell_quote_setting_child_one_tax_total">' + (parseFloat(data['retail_price']) * parseFloat(taxNum) / 100) + '</td>\
                             <td class="xs_butbox">\
                             <button class="but_red but_opa_small but_blue ven_sell_quote_create_setting_del_btn">-</button>\
                             </td>\
                             </tr>'
                },
                error: function (data) {
                    alert(data);
                }
            });
        });
        $('.tanceng .ven_sell_quote_create_setting_child_chosen_list').html(settingChildChosenHtml);
        settingChildNumTotalFn();
        settingChildCostTotalFn();
        settingChildTaxTotalFn();
        $(this).closest('.dialog_box').remove();
    });
    //配置商品父级改变数量
    $('.tanceng .ven_sell_quote_setting_parent_num_change_btn').live('click', function () {
        var settingSignCur = $(this).closest('tr').attr('settingsign');
        var $_this = $(this);
        //控制子级数量
        $.each($('.tanceng .ven_sell_quote_create_setting_child_chosen_list tr.' + settingSignCur), function (i, v) {
            $('.tanceng .ven_sell_quote_create_setting_child_chosen_list tr.' + settingSignCur).eq(i).find('.ven_sell_quote_setting_child_one_num_total').html(parseFloat($_this.siblings('.ven_sell_quote_setting_parent_num').val()) * parseFloat($('.tanceng .ven_sell_quote_create_setting_child_chosen_list tr.' + settingSignCur).eq(i).find('.ven_sell_quote_setting_child_one_num').val()));
        });
        //控制子级搭配商品总价
        $.each($('.tanceng .ven_sell_quote_create_setting_child_chosen_list tr.' + settingSignCur), function (i, v) {
            $('.tanceng .ven_sell_quote_create_setting_child_chosen_list tr.' + settingSignCur).eq(i).find('.ven_sell_quote_setting_child_one_cost_total').html(parseFloat($('.tanceng .ven_sell_quote_create_setting_child_chosen_list tr.' + settingSignCur).eq(i).find('.ven_sell_quote_setting_child_one_cost').val()) * parseFloat($('.tanceng .ven_sell_quote_create_setting_child_chosen_list tr.' + settingSignCur).eq(i).find('.ven_sell_quote_setting_child_one_num_total').html()));
        });
        //控制子级合计税额
        $.each($('.tanceng .ven_sell_quote_create_setting_child_chosen_list tr.' + settingSignCur), function (i, v) {
            $('.tanceng .ven_sell_quote_create_setting_child_chosen_list tr.' + settingSignCur).eq(i).find('.ven_sell_quote_setting_child_one_tax_total').html(parseFloat($('.tanceng .ven_sell_quote_create_setting_child_chosen_list tr.' + settingSignCur).eq(i).find('.ven_sell_quote_setting_child_one_cost_total').html()) * parseFloat($('.tanceng .ven_sell_quote_create_setting_child_chosen_list tr.' + settingSignCur).eq(i).find('.ven_sell_quote_setting_child_one_tax').html()) / 100);
        });
        settingChildCostTotalFn();
        settingChildTaxTotalFn();
    });
    //配置商品子级改变数量
    $('.tanceng .ven_sell_quote_setting_child_num_change_btn').live('click', function () {
        var settingSignCur = $(this).closest('tr').attr('class');
        //控制子级数量
        $(this).closest('tr').find('.ven_sell_quote_setting_child_one_num_total').html(parseFloat($(this).siblings('.ven_sell_quote_setting_child_one_num').val()) * parseFloat($('.tanceng .ven_sell_quote_create_chosen_setting_tbody tr.' + settingSignCur).find('.ven_sell_quote_setting_parent_num').val()));
        //控制子级搭配商品总价
        $(this).closest('tr').find('.ven_sell_quote_setting_child_one_cost_total').html(parseFloat($(this).closest('tr').find('.ven_sell_quote_setting_child_one_num_total').html()) * parseFloat($(this).closest('tr').find('.ven_sell_quote_setting_child_one_cost').val()));
        //控制子级合计税额
        $(this).closest('tr').find('.ven_sell_quote_setting_child_one_tax_total').html(parseFloat($(this).closest('tr').find('.ven_sell_quote_setting_child_one_cost_total').html()) * parseFloat($(this).closest('tr').find('.ven_sell_quote_setting_child_one_tax').html()) / 100);
        settingChildNumTotalFn();
        settingChildCostTotalFn();
        settingChildTaxTotalFn();
    });
    //配置商品单价调整
    $('.tanceng .ven_sell_quote_create_setting_child_chosen_list .ven_sell_quote_setting_child_one_cost').live('keyup', function () {
        //搭配商品总价
        $(this).closest('tr').find('.ven_sell_quote_setting_child_one_cost_total').html(parseFloat($(this).val()) * parseFloat($(this).closest('tr').find('.ven_sell_quote_setting_child_one_num_total').html()));
        //搭配商品总价
        $(this).closest('tr').find('.ven_sell_quote_setting_child_one_tax_total').html(parseFloat($(this).closest('tr').find('.ven_sell_quote_setting_child_one_tax').html()) * parseFloat($(this).closest('tr').find('.ven_sell_quote_setting_child_one_cost_total').html()) / 100);
        //单个商品税额
        $(this).closest('tr').find('.ven_sell_quote_setting_child_one_tax_text').html(parseFloat($(this).closest('tr').find('.ven_sell_quote_setting_child_one_cost').val()) * parseFloat($(this).closest('tr').find('.ven_sell_quote_setting_child_one_tax').html()) / 100);
        settingChildCostTotalFn();
        settingChildTaxTotalFn();
    });
    //配置商品父级删除单条数据
    $('.tanceng .ven_sell_quote_create_setting_parent_del_btn').live('click', function () {
        var settingSignCur = $(this).closest('tr').attr('settingsign');
        for (var i = 0; i < ($('.tanceng .ven_sell_quote_create_setting_child_chosen_list tr.' + settingSignCur)).length; i++) {
            $('.tanceng .ven_sell_quote_create_setting_child_chosen_list tr.' + settingSignCur).eq(i).remove();
            settingChildIdArr.splice(i, 1);
            i--;
        }
        var index = $(this).closest('tr').index();
        aSellQuoteCreateSettingChosen.splice(index, 1);
        $(this).closest('tr').remove();
        settingChildCostTotalFn();
        settingChildTaxTotalFn();
    });
    //配置商品删除单条数据
    $('.tanceng .ven_sell_quote_create_setting_del_btn').live('click', function () {
        $(this).closest('tr').remove();
        $.each($('.tanceng .ven_sell_quote_create_setting_child_chosen_list .settingchildorder'), function (i, v) {
            $('.tanceng .ven_sell_quote_create_setting_child_chosen_list .settingchildorder').eq(i).html(l_dbl(i + 1));
        })
        settingChildCostTotalFn();
        settingChildTaxTotalFn();
    });
    //单个配置搭配商品数量总和
    function settingChildNumTotalFn() {
        var total = 0;
        $.each($('.tanceng .ven_sell_quote_create_setting_child_chosen_list tr'), function (i, v) {
            total += parseFloat($('.tanceng .ven_sell_quote_create_setting_child_chosen_list tr').eq(i).find('.ven_sell_quote_setting_child_one_num').val());
        });
        $('.tanceng .setting_child_num_total').html(total);
    }

    //搭配商品总价总和
    function settingChildCostTotalFn() {
        var total = 0;
        $.each($('.tanceng .ven_sell_quote_create_setting_child_chosen_list tr'), function (i, v) {
            total += parseFloat($('.tanceng .ven_sell_quote_create_setting_child_chosen_list tr').eq(i).find('.ven_sell_quote_setting_child_one_cost_total').html());
        });
        $('.tanceng .setting_child_cost_total').html(total);
    }

    //搭配商品合计税额总和
    function settingChildTaxTotalFn() {
        var total = 0;
        $.each($('.tanceng .ven_sell_quote_create_setting_child_chosen_list tr'), function (i, v) {
            total += parseFloat($('.tanceng .ven_sell_quote_create_setting_child_chosen_list tr').eq(i).find('.ven_sell_quote_setting_child_one_tax_total').html());
        });
        $('.tanceng .setting_child_tax_total').html(total);
        venSellQuoteCreateProductCostTotalFn();
    }

    //总金额计算
    function venSellQuoteCreateProductCostTotalFn() {
        //总价
        var total = 0;
        total = parseFloat($('.tanceng .goods_cost_total').html()) + parseFloat($('.tanceng .sell_quote_create_package_children_cost_total').html()) + parseFloat($('.tanceng .setting_child_cost_total').html());
        $('.tanceng .sell_quote_create_product_cost_total').val(total);
        //总税额
        var taxTotal = 0;
        taxTotal = parseFloat($('.tanceng .goods_tax_total').html()) + parseFloat($('.tanceng .sell_quote_create_package_children_tax_total').html()) + parseFloat($('.tanceng .setting_child_tax_total').html());
        $('.tanceng .sell_quote_create_tax_total').val(taxTotal);
        //总计金额
        $('.tanceng .ven_sell_quote_create_cost_tax_total').html(parseFloat($('.tanceng .sell_quote_create_product_cost_total').val()) + parseFloat($('.tanceng .sell_quote_create_tax_total').val()) + parseFloat($('.tanceng .sell_quote_create_other_fee').val()));
    }

    //修改其他费用
    $('.tanceng .sell_quote_create_other_fee').live('keyup', function () {
        //总计金额
        $('.tanceng .ven_sell_quote_create_cost_tax_total').html(parseFloat($('.tanceng .sell_quote_create_product_cost_total').val()) + parseFloat($('.tanceng .sell_quote_create_tax_total').val()) + parseFloat($('.tanceng .sell_quote_create_other_fee').val()));
    });

    //删除商品
    var delIndex = -1;
    $('.tanceng .ven_sell_quote_create_goods_list_del_btn').live('click', function () {
        delIndex = 0;
    });
    $('.tanceng .ven_sell_quote_create_package_list_del_btn').live('click', function () {
        delIndex = 1;
    });
    $('.tanceng .ven_sell_quote_create_setting_list_del_btn').live('click', function () {
        delIndex = 2;
    });
    $('.tanceng .xs_bjd_delete').live('click', function () {
        if (delIndex == 0) {
            aSellQuoteCreateGoodsChosen = [];
            $('.tanceng .ven_sell_quote_create_chosen_goods_tbody').html('');
            delIndex = -1;
        }
        //套餐商品
        if (delIndex == 1) {
            //清空套餐商品父数组
            aSellQuoteCreatePackageChosen = [];
            //清空套餐商品子数组
            sellQuoteCreatePackageChildArr = [];
            //清空套餐商品父页面
            $('.tanceng .ven_sell_quote_choose_package_parent_tbody').html('');
            //清空套餐商品子页面
            $('.tanceng .ven_sell_quote_choose_package_child_tbody').html('');
            //清空页面合计数据
            $('.tanceng .sell_quote_create_package_num_total').html('-');
            $('.tanceng .sell_quote_create_package_cost_total').html('-');
            $('.tanceng .sell_quote_create_package_children_num_total').html('-');
            $('.tanceng .sell_quote_create_package_children_cost_total').html('-');
            $('.tanceng .sell_quote_create_package_children_tax_total').html('-');
            delIndex = -1;
        }
        if (delIndex == 2) {
            aSellQuoteCreateSettingChosen = [];
            settingChildIdArr = [];
            $('.tanceng .ven_sell_quote_create_chosen_setting_tbody').html('');
            $('.tanceng .ven_sell_quote_create_setting_child_chosen_list').html('');
            delIndex = -1;
        }
    });

    //提交审批
    $('.tanceng .ven_sell_quote_create_submit').live('click', function () {
        sellQuoteCreateData.is_draft = 0;
        sellQuoteCreateSubmitFn();
    });
    //保存草稿
    $('.tanceng .ven_sell_quote_create_submit_draft').live('click', function () {
        sellQuoteCreateData.is_draft = 1;
        sellQuoteCreateSubmitFn();
    });

    //新建报价单 - 提交函数
    function sellQuoteCreateSubmitFn() {
        //报价单编号
        sellQuoteCreateData.code_sn = $('.tanceng .ven_sell_quote_create_code').val();
        if ($('.tanceng .ven_sell_quote_create_choose_customer_inp').val() == '') {
            alert('请选择客户');
            return false;
        }
        if ($('.tanceng .ven_sell_quote_create_choose_owner_inp').val() == '请选择负责人') {
            alert('请选择负责人');
            return false;
        }
        //普通商品信息
        var sellQuoteCreateGoodsArr = [];
        $.each($('.tanceng .ven_sell_quote_create_chosen_goods_tbody tr'), function (i, v) {
            sellQuoteCreateGoodsArr.push({
                good_id: $('.tanceng .ven_sell_quote_create_chosen_goods_tbody tr').eq(i).attr('goodsid'),
                good_name: $('.tanceng .ven_sell_quote_create_chosen_goods_tbody tr').eq(i).find('td').eq(1).text(),
                good_code_sn: $('.tanceng .ven_sell_quote_create_chosen_goods_tbody tr').eq(i).find('td').eq(2).text(),
                good_attribute: $('.tanceng .ven_sell_quote_create_chosen_goods_tbody tr').eq(i).find('td').eq(3).text(),
                unit: $('.tanceng .ven_sell_quote_create_chosen_goods_tbody tr').eq(i).find('td').eq(4).text(),
                num: $('.tanceng .ven_sell_quote_create_chosen_goods_tbody tr').eq(i).find('.productnum').val(),
                price: parseFloat($('.tanceng .ven_sell_quote_create_chosen_goods_tbody tr').eq(i).find('.product_reference_price').val()),
                cost: $('.tanceng .ven_sell_quote_create_chosen_goods_tbody tr').eq(i).find('.ven_sell_quote_goods_cost_one').val(),
                total: $('.tanceng .ven_sell_quote_create_chosen_goods_tbody tr').eq(i).find('td').eq(8).text(),
                tax_rate: $('.tanceng .ven_sell_quote_create_chosen_goods_tbody tr').eq(i).find('td').eq(9).text(),
                tax_money: $('.tanceng .ven_sell_quote_create_chosen_goods_tbody tr').eq(i).find('td').eq(10).text()
            });
        });
        sellQuoteCreateData.goods = sellQuoteCreateGoodsArr;
        sellQuoteCreateData.product_good_sum_num = $('.tanceng .goods_num_total').html(); // 普通商品总数
        sellQuoteCreateData.product_good_sum_price = $('.tanceng .goods_cost_total').html();// 普通商品总价额
        sellQuoteCreateData.product_good_sum_tax_money = $('.tanceng .goods_tax_total').html(); // 普通商品总含税额

        //套餐商品信息
        var sellQuoteCreatePackageArr = [];
        $.each($('.tanceng .ven_sell_quote_choose_package_parent_tbody tr'), function (i, v) {
            sellQuoteCreatePackageArr.push({
                package_id: $('.tanceng .ven_sell_quote_choose_package_parent_tbody tr').eq(i).attr('packageid'),
                package_name: $('.tanceng .ven_sell_quote_choose_package_parent_tbody tr').eq(i).find('td').eq(1).text(),
                package_code_sn: $('.tanceng .ven_sell_quote_choose_package_parent_tbody tr').eq(i).find('td').eq(2).text(),
                package_num: $('.tanceng .ven_sell_quote_choose_package_parent_tbody tr').eq(i).find('.sell_quote_create_package_num').val(),
                package_sum_total: $('.tanceng .ven_sell_quote_choose_package_parent_tbody tr').eq(i).find('td').eq(4).text()
            });
        });
        sellQuoteCreateData.package = sellQuoteCreatePackageArr;
        sellQuoteCreateData.package_sum_num = $('.tanceng .sell_quote_create_package_num_total').html(); // 套餐总数量
        sellQuoteCreateData.package_sum_total = $('.tanceng .sell_quote_create_package_cost_total').html();// 套餐总价额
        //套餐包含子商品
        sellQuoteCreateData.package_goods = [];
        $.each($('.tanceng .ven_sell_quote_choose_package_child_tbody tr'), function (i, v) {
            sellQuoteCreateData.package_goods.push({
                good_id: $('.tanceng .ven_sell_quote_choose_package_child_tbody tr').eq(i).attr('packagechildid'),
                good_name: $('.tanceng .ven_sell_quote_choose_package_child_tbody tr').eq(i).find('td').eq(1).text(),
                good_code_sn: $('.tanceng .ven_sell_quote_choose_package_child_tbody tr').eq(i).find('td').eq(2).text(),
                good_attribute: $('.tanceng .ven_sell_quote_choose_package_child_tbody tr').eq(i).find('td').eq(3).text(),
                unit: $('.tanceng .ven_sell_quote_choose_package_child_tbody tr').eq(i).find('td').eq(4).text(),
                num: $('.tanceng .ven_sell_quote_choose_package_child_tbody tr').eq(i).find('td').eq(5).text(),
                price: $('.tanceng .ven_sell_quote_choose_package_child_tbody tr').eq(i).find('td').eq(6).text(),
                total_num: $('.tanceng .ven_sell_quote_choose_package_child_tbody tr').eq(i).find('td').eq(7).text(),
                good_total: $('.tanceng .ven_sell_quote_choose_package_child_tbody tr').eq(i).find('td').eq(8).text(),
                tax_rate: $('.tanceng .ven_sell_quote_choose_package_child_tbody tr').eq(i).find('td').eq(9).text(),
                single_tax_money: $('.tanceng .ven_sell_quote_choose_package_child_tbody tr').eq(i).find('td').eq(10).text(),
                sum_tax_money: $('.tanceng .ven_sell_quote_choose_package_child_tbody tr').eq(i).find('td').eq(11).text()
            })
        });
        sellQuoteCreateData.package_goods_sum_num = $('.tanceng .sell_quote_create_package_children_num_total').html(); // 套餐子商品数量
        sellQuoteCreateData.package_goods_sum_price = $('.tanceng .sell_quote_create_package_children_cost_total').html();// 套餐子商品价额
        sellQuoteCreateData.package_goods_sum_tax_money = $('.tanceng .sell_quote_create_package_children_tax_total').html(); // 套餐子商品总含税额

        //配置商品信息
        sellQuoteCreateData.setting = [];
        $.each($('.tanceng .ven_sell_quote_create_chosen_setting_tbody tr'), function (i, v) {
            sellQuoteCreateData.setting.push({
                setting_id: $('.tanceng .ven_sell_quote_create_chosen_setting_tbody tr').eq(i).attr('settingid'),
                setting_name: $('.tanceng .ven_sell_quote_create_chosen_setting_tbody tr').eq(i).find('td').eq(0).find('span').text(),
                setting_code_sn: $('.tanceng .ven_sell_quote_create_chosen_setting_tbody tr').eq(i).find('td').eq(1).text(),
                setting_unit: $('.tanceng .ven_sell_quote_create_chosen_setting_tbody tr').eq(i).find('td').eq(2).text(),
                setting_num: $('.tanceng .ven_sell_quote_create_chosen_setting_tbody tr').eq(i).find('td').eq(3).find('.ven_sell_quote_setting_parent_num').val()
                /*,setting_sum_total: $('.tanceng .ven_sell_quote_create_chosen_setting_tbody tr').eq(i).find('td').eq(4).text()*/
            });
        });
        //配置包含子商品信息
        sellQuoteCreateData.setting_goods = [];
        $.each($('.tanceng .ven_sell_quote_create_setting_child_chosen_list tr'), function (i, v) {
            sellQuoteCreateData.setting_goods.push({
                good_id: $('.tanceng .ven_sell_quote_create_setting_child_chosen_list tr').eq(i).attr('settingchildid'),
                good_name: $('.tanceng .ven_sell_quote_create_setting_child_chosen_list tr').eq(i).find('td').eq(1).text(),
                good_code_sn: $('.tanceng .ven_sell_quote_create_setting_child_chosen_list tr').eq(i).find('td').eq(2).text(),
                good_attribute: $('.tanceng .ven_sell_quote_create_setting_child_chosen_list tr').eq(i).find('td').eq(3).text(),
                unit: $('.tanceng .ven_sell_quote_create_setting_child_chosen_list tr').eq(i).find('td').eq(4).text(),
                num: $('.tanceng .ven_sell_quote_create_setting_child_chosen_list tr').eq(i).find('td').eq(5).find('.ven_sell_quote_setting_child_one_num').val(),
                price: parseFloat($('.tanceng .ven_sell_quote_create_setting_child_chosen_list tr').eq(i).find('td').eq(6).find('.product_reference_price').val()),
                good_price: $('.tanceng .ven_sell_quote_create_setting_child_chosen_list tr').eq(i).find('td').eq(7).find('.ven_sell_quote_setting_child_one_cost').val(),
                total_num: $('.tanceng .ven_sell_quote_create_setting_child_chosen_list tr').eq(i).find('.ven_sell_quote_setting_child_one_num_total').text(),
                good_total: $('.tanceng .ven_sell_quote_create_setting_child_chosen_list tr').eq(i).find('.ven_sell_quote_setting_child_one_cost_total').text(),
                tax_rate: $('.tanceng .ven_sell_quote_create_setting_child_chosen_list tr').eq(i).find('.ven_sell_quote_setting_child_one_tax').text(),
                single_tax_money: $('.tanceng .ven_sell_quote_create_setting_child_chosen_list tr').eq(i).find('.ven_sell_quote_setting_child_one_tax_text').text(),
                sum_tax_money: $('.tanceng .ven_sell_quote_create_setting_child_chosen_list tr').eq(i).find('.ven_sell_quote_setting_child_one_tax_total').text()
            })
        });
        sellQuoteCreateData.setting_goods_sum_num = $('.tanceng .setting_child_num_total').html(); // 配置子商品数量
        sellQuoteCreateData.setting_goods_sum_price = $('.tanceng .setting_child_cost_total').html();// 配置子商品价额
        sellQuoteCreateData.setting_goods_sum_tax_money = $('.tanceng .setting_child_tax_total').html(); // 配置子商品总含税额

        //是否包运费
        if ($('.tanceng .ven_sell_quote_create_freight_checkbox').is(':checked')) {
            sellQuoteCreateData.is_freight = 1;
        } else {
            sellQuoteCreateData.is_freight = 0;
        }
        //备注
        if ($('.tanceng .ven_sell_quote_create_note_textarea').val() == '请输入备注') {
            sellQuoteCreateData.note = '';
        } else {
            sellQuoteCreateData.note = $('.tanceng .ven_sell_quote_create_note_textarea').val();
        }
        //商品合计
        sellQuoteCreateData.good_totals = $('.tanceng .sell_quote_create_product_cost_total').val();
        //合计税额
        sellQuoteCreateData.rate_sum = $('.tanceng .sell_quote_create_tax_total').val();
        //其他费用
        sellQuoteCreateData.other_free = $('.tanceng .sell_quote_create_other_fee').val();
        //总计金额
        sellQuoteCreateData.totals = $('.tanceng .ven_sell_quote_create_cost_tax_total').html();

        //审批人
        sellQuoteCreateData.flow = flowChosenArr.join(',');
        if ($('.tanceng .ven_sell_quote_create_flow_list li').length == 1) {
            alert('请选择审批人');
            return false;
        }
        console.log(sellQuoteCreateData);
        $.ajax({
            url: SERVER_URL + "/quote/add",
            type: 'POST',
            data: sellQuoteCreateData,
            dataType: 'json',
            success: function (e) {
                if (e.code == 0) {
                    alert('添加成功');
                    $(this).closest('.dialog_box').remove();
                    $('.tanceng').css('display', 'none');
                    getSellQuoteList($('#ven_sell_quote_nav_ul li.tabhover').attr('needurl'));
                }
            },
            error: function (data) {
                alert(data);
            }
        });
    }

    //编辑销售报价单
    $('.lik_sell_quote_edit_btn').live('click', function () {
        sellQuoteCurrentId = $(this).closest('tr').attr('vensellquoteid');
        sellQuoteEditData.quote_id = sellQuoteCurrentId;
        sellQuoteEditFn(sellQuoteCurrentId);
    });
    function sellQuoteEditFn(sellQuoteCurrentId) {
        $.ajax({
            url: SERVER_URL + "/quote/detail",
            type: 'get',
            data: {
                token: token,
                quote_id: sellQuoteCurrentId,
                is_list: 1
            },
            dataType: "json",
            success: function (e) {
                if (e.code == 0) {
                    var data = e.data;
                    console.log(data);
                    //创建人
                    $('.tanceng .ven_sell_quote_edit_create_uname').html(likNullData(data['uname']));
                    //创建时间
                    $('.tanceng .ven_sell_quote_edit_create_at').html(likNullData(data['created_at'].split(' ')[0]));
                    //报价单编号
                    $('.tanceng .ven_sell_quote_edit_code_sn').val(likNullData(data['code_sn']));
                    sellQuoteEditData.code_sn = data['code_sn'];
                    //关联借出单 或 销售机会
                    if (data['lend_code_sn'] == '' || data['lend_code_sn'] == null) {
                        if (data['chance_id'] != '') {
                            $('.tanceng .ven_sell_quote_edit_choose_chance_inp').val(data['customer_name']);
                            sellQuoteEditData.chance_id = data['chance_id'];
                        } else {
                            $('.tanceng .ven_sell_quote_edit_choose_chance_inp').val('');
                            sellQuoteEditData.chance_id = '';
                        }
                    } else {
                        $('.tanceng .ven_sell_quote_edit_choose_lend_inp').val(data['lend_code_sn']);
                        sellQuoteEditData.lend_id = data['lend_id'];
                    }
                    //客户信息
                    $('.tanceng .ven_sell_quote_edit_choose_customer_inp').val(likNullData(data['customer_name']));
                    $('.tanceng .ven_sell_quote_edit_choose_customer_credit').html(likNullData(data['credit']));
                    sellQuoteEditData.customer_id = data['customer_id'];
                    //负责人
                    $('.tanceng .ven_sell_quote_edit_choose_owner_inp').val(likNullData(data['owner_name']));
                    sellQuoteEditData.owner = data['owner'];
                    sellQuoteEditData.dept = data['dept'];

                    /*商品信息展示*/
                    var productListHtml = '';
                    if (data['steps']) {
                        $.each(data['steps'], function (i, v) {
                            //取商品集合
                            var productJson = v['product_json'];
                            //商品循环
                            var goodsListHtml = '';
                            if (productJson['product']) {
                                $.each(productJson['product'], function (i2, v2) {
                                    goodsListHtml += '<tr>\
                                                    <td>' + l_dbl(i + 1) + '</td>\
                                                    <td>' + v2['good_name'] + '</td>\
                                                    <td>' + v2['good_code_sn'] + '</td>\
                                                    <td>' + v2['good_attribute'] + '</td>\
                                                    <td>' + v2['unit'] + '</td>\
                                                    <td>' + v2['num'] + '</td>\
                                                    <td>' + v2['cost'] + '</td>\
                                                    <td>' + v2['total'] + '</td>\
                                                    <td>' + v2['tax_rate'] + '</td>\
                                                    <td>' + v2['tax_money'] + '</td>\
                                                    </tr>'
                                });
                            }
                            //套餐循环
                            var packageListHtml = '';
                            if (productJson['product_package']) {
                                $.each(productJson['product_package'], function (i2, v2) {
                                    packageListHtml += '<tr>\
                                                    <td>' + v2['package_name'] + '</td>\
                                                    <td>' + v2['package_code_sn'] + '</td>\
                                                    <td>' + v2['package_num'] + '</td>\
                                                    <td>' + v2['package_sum_total'] + '</td>\
                                                    </tr>'
                                });
                            }
                            //套餐子商品循环
                            var packageGoodsListHtml = '';
                            if (productJson['package_goods']) {
                                $.each(productJson['package_goods'], function (i2, v2) {
                                    packageGoodsListHtml += '<tr>\
                                                            <td>' + l_dbl(i + 1) + '</td>\
                                                            <td>' + v2['good_name'] + '</td>\
                                                            <td>' + v2['good_code_sn'] + '</td>\
                                                            <td>' + v2['good_attribute'] + '</td>\
                                                            <td>' + v2['unit'] + '</td>\
                                                            <td>' + v2['num'] + '</td>\
                                                            <td>' + v2['price'] + '</td>\
                                                            <td>' + v2['total_num'] + '</td>\
                                                            <td>' + v2['good_total'] + '</td>\
                                                            <td>' + v2['tax_rate'] + '</td>\
                                                            <td>' + v2['single_tax_money'] + '</td>\
                                                            <td>' + v2['sum_tax_money'] + '</td>\
                                                            </tr>'
                                });
                            }
                            //配置商品循环
                            var settingListHtml = '';
                            if (productJson['product_setting']) {
                                $.each(productJson['product_setting'], function (i2, v2) {
                                    settingListHtml += '<tr>\
                                                        <td>' + l_dbl(i + 1) + '</td>\
                                                        <td>' + v2['setting_name'] + '</td>\
                                                        <td>' + v2['setting_code_sn'] + '</td>\
                                                        <td>' + v2['setting_unit'] + '</td>\
                                                        <td>' + v2['setting_num'] + '</td>\
                                                        <td>-</td>\
                                                        </tr>'
                                });
                            }
                            //配置子商品循环
                            var settingGoodsListHtml = '';
                            if (productJson['setting_goods']) {
                                $.each(productJson['setting_goods'], function (i2, v2) {
                                    settingGoodsListHtml += '<tr>\
                                                        <td>' + l_dbl(i + 1) + '</td>\
                                                        <td>' + v2['good_name'] + '</td>\
                                                        <td>' + v2['good_code_sn'] + '</td>\
                                                        <td>' + v2['good_attribute'] + '</td>\
                                                        <td>' + v2['unit'] + '</td>\
                                                        <td>' + v2['num'] + '</td>\
                                                        <td>' + v2['price'] + '</td>\
                                                        <td>' + v2['total_num'] + '</td>\
                                                        <td>' + v2['good_total'] + '</td>\
                                                        <td>' + v2['tax_rate'] + '</td>\
                                                        <td>' + v2['single_tax_money'] + '</td>\
                                                        <td>' + v2['sum_tax_money'] + '</td>\
                                                        </tr>'
                                });
                            }
                            productListHtml += '<div class="box_Open cg_cgbjd_newCon" style="margin-bottom:15px;">\
                            <p class="box_open_head" style="background: #fafafa;">' + sellQuoteStepsArr[i] + '<span class="box_open_btn" style="right:10px;">收起<i class="right icon_show"></i></span>\
                            </p>\
                            <div class="box_open_list">\
                            <div class="table_t1">\
                            <h3 class="cont_title inline_block">商品报价</h3>\
                            </div>\
                            <div class="div_1 container">\
                            <div class="div_1 table-container">\
                            <table>\
                            <thead>\
                            <tr>\
                            <th>序号</th>\
                            <th>商品名称/规格</th>\
                            <th>商品编号</th>\
                            <th>属性</th>\
                            <th>计算单位</th>\
                            <th>数量</th>\
                            <th>价格(元)</th>\
                            <th>总价(元)</th>\
                            <th>含税率%</th>\
                            <th>含税额(元)</th>\
                            </tr>\
                            </thead>\
                            <tbody>' + goodsListHtml + '<tr class="table_total">\
                            <td>合计</td>\
                            <td></td>\
                            <td></td>\
                            <td></td>\
                            <td></td>\
                            <td class="c_r">' + productJson['product_good_sum_num'] + '</td>\
                            <td></td>\
                            <td><span class="c_r">' + productJson['product_good_sum_price'] + '</span></td>\
                        <td></td>\
                        <td class="c_r">' + productJson['product_good_sum_tax_money'] + '</td>\
                        </tr>\
                        </tbody>\
                        </table>\
                        </div>\
                        </div>\
                        <div class="box_open_list">\
                            <div class="table_t1">\
                            <h3 class="cont_title inline_block">套餐商品报价</h3>\
                            </div>\
                            <div class="div_1 container">\
                            <div class="div_1 table-container">\
                            <table>\
                            <thead>\
                            <tr>\
                            <th>商品名称/规格</th>\
                            <th>商品编号</th>\
                            <th>数量</th>\
                            <th>合计总价(元)</th>\
                            </tr>\
                            </thead>\
                            <tbody>' + packageListHtml + '<tr class="table_total">\
                            <td>合计</td>\
                            <td></td>\
                            <td class="c_r">' + productJson['package_sum_num'] + '</td>\
                            <td class="c_r">' + productJson['package_sum_total'] + '</td>\
                            </tr>\
                            </tbody>\
                            </table>\
                            </div>\
                            </div>\
                            <div class="table_t2">包含商品内容</div>\
                            <div class="div_1 container">\
                            <div class="div_1 table-container">\
                            <table>\
                            <thead>\
                            <tr>\
                            <th>序号</th>\
                            <th>商品名称/规格</th>\
                            <th>商品编号</th>\
                            <th>属性</th>\
                            <th>计算单位</th>\
                            <th>单个套餐包含商品数量</th>\
                            <th>包含商品单价（元）</th>\
                        <th>总数量</th>\
                        <th>包含商品总价(元)</th>\
                        <th>含税率%</th>\
                        <th>单个税额(元)</th>\
                        <th>合计税额(元)</th>\
                        </tr>\
                        </thead>\
                        <tbody>' + packageGoodsListHtml + '<tr class="table_total">\
                            <td>合计</td>\
                            <td></td>\
                            <td></td>\
                            <td></td>\
                            <td></td>\
                            <td>' + productJson['package_goods_sum_num'] + '</td>\
                            <td></td>\
                            <td></td>\
                            <td><span class="c_r">' + productJson['package_goods_sum_price'] + '</span></td>\
                            <td></td>\
                            <td></td>\
                            <td class="c_r">' + productJson['package_goods_sum_tax_money'] + '</td>\
                            </tr>\
                            </tbody>\
                            </table>\
                            </div>\
                            </div>\
                            </div>\
                            <div class="box_open_list">\
                            <div class="box_open_list">\
                            <div class="table_t1">\
                            <h3 class="cont_title inline_block">配置商品报价</h3>\
                            </div>\
                            <div class="div_1 container">\
                            <div class="div_1 table-container">\
                            <table>\
                            <thead>\
                            <tr>\
                            <th>序号</th>\
                            <th>配置商品名称</th>\
                            <th>配置商品编号</th>\
                            <th>单位</th>\
                            <th>数量</th>\
                            <th>合计总价(元)</th>\
                            </tr>\
                            </thead>\
                            <tbody>' + settingListHtml + '</tbody>\
                            </table>\
                            </div>\
                            </div>\
                            </div>\
                            <div class="table_t2">配置商品内容</div>\
                            <div class="div_1 container">\
                            <div class="div_1 table-container">\
                            <table>\
                            <thead>\
                            <tr>\
                            <th>序号</th>\
                            <th>商品名称/规格</th>\
                            <th>商品编号</th>\
                            <th>属性</th>\
                            <th>计算单位</th>\
                            <th>单个配置搭配商品数量</th>\
                            <th>搭配商品单价(元)</th>\
                            <th>总数量</th>\
                            <th>搭配商品总价(元)</th>\
                            <th>含税率%</th>\
                            <th>单个税额(元)</th>\
                            <th>合计税额(元)</th>\
                            </tr>\
                            </thead>\
                            <tbody>' + settingGoodsListHtml + '<tr class="table_total">\
                            <td>合计</td>\
                            <td></td>\
                            <td></td>\
                            <td></td>\
                            <td></td>\
                            <td>' + productJson['setting_goods_sum_num'] + '</td>\
                            <td></td>\
                            <td></td>\
                            <td>' + productJson['setting_goods_sum_price'] + '</td>\
                            <td></td>\
                            <td></td>\
                            <td>' + productJson['setting_goods_sum_tax_money'] + '</td>\
                            </tr>\
                            </tbody>\
                            </table>\
                            </div>\
                            </div>\
                            </div>\
                            <div style="min-height:120px; padding: 30px 10px 20px;">\
                            <div class="left" style="width: 50%;">\
                            <div class="t_textinput">\
                            <div class="t_left" style="width:50%"><i class="c_r v_hidden">*</i><input type="checkbox" ' + (v['is_freight'] == 1 ? 'checked' : '') + '>包运费</div>\
                            </div>\
                            <div class="t_textinput t_textarea" style="margin-top: 30px;">\
                            <div class="t_left">备注</div>\
                            <div class="t_right">\
                            <textarea class="txt_normal" readonly="true" style="background: #f5f5f5;">' + productJson['note'] + '</textarea>\
                            </div>\
                            </div>\
                            </div>\
                            <div class="right cg_cgbjd_newright" style="width: 30%;">\
                            <div class="t_textinput">\
                            <div class="t_left">合计</div>\
                            <div class="t_right">\
                            <input type="text" class="inp_noInput" readonly="readonly" value="¥：' + productJson['good_totals'] + '">\
                            </div>\
                            </div>\
                            <div class="t_textinput">\
                            <div class="t_left">合计税额(元)</div>\
                            <div class="t_right">\
                            <input type="text" class="inp_noInput" readonly="readonly" value="¥：' + productJson['rate_sum'] + '">\
                            </div>\
                            </div>\
                            <div class="t_textinput">\
                            <div class="t_left">其他费用</div>\
                            <div class="t_right">\
                            <input type="text" class="inp_noInput" readonly="readonly" value="¥：' + productJson['other_free'] + '">\
                            </div>\
                            </div>\
                            </div>\
                            </div>\
                            <div class="cg_cgbjd_b">\
                            <p class="c_r" style="margin-right:50px;">总计金额：<span>¥' + productJson['totals'] + '元</span></p>\
                        </div>\
                        </div>\
                        </div>'
                        });
                        $('.tanceng .ven_sell_quote_edit_old_list').html(productListHtml);
                    }
                } else {
                    alert('请重试！');
                }
            },
            error: function (data) {
                alert(data);
            }
        });
    }

    //编辑销售报价单 - 提交函数
    function sellQuoteEditSubmitFn() {
        //报价单编号
        sellQuoteEditData.code_sn = $('.tanceng .ven_sell_quote_edit_code_sn').val();
        if ($('.tanceng .ven_sell_quote_create_choose_customer_inp').val() == '') {
            alert('请选择客户');
            return false;
        }
        if ($('.tanceng .ven_sell_quote_create_choose_owner_inp').val() == '请选择负责人') {
            alert('请选择负责人');
            return false;
        }
        //普通商品信息
        var sellQuoteEditGoodsArr = [];
        $.each($('.tanceng .ven_sell_quote_create_chosen_goods_tbody tr'), function (i, v) {
            sellQuoteEditGoodsArr.push({
                good_id: $('.tanceng .ven_sell_quote_create_chosen_goods_tbody tr').eq(i).attr('goodsid'),
                good_name: $('.tanceng .ven_sell_quote_create_chosen_goods_tbody tr').eq(i).find('td').eq(1).text(),
                good_code_sn: $('.tanceng .ven_sell_quote_create_chosen_goods_tbody tr').eq(i).find('td').eq(2).text(),
                good_attribute: $('.tanceng .ven_sell_quote_create_chosen_goods_tbody tr').eq(i).find('td').eq(3).text(),
                unit: $('.tanceng .ven_sell_quote_create_chosen_goods_tbody tr').eq(i).find('td').eq(4).text(),
                num: $('.tanceng .ven_sell_quote_create_chosen_goods_tbody tr').eq(i).find('.productnum').val(),
                price: parseFloat($('.tanceng .ven_sell_quote_create_chosen_goods_tbody tr').eq(i).find('.product_reference_price').val()),
                cost: $('.tanceng .ven_sell_quote_create_chosen_goods_tbody tr').eq(i).find('.ven_sell_quote_goods_cost_one').val(),
                total: $('.tanceng .ven_sell_quote_create_chosen_goods_tbody tr').eq(i).find('td').eq(8).text(),
                tax_rate: $('.tanceng .ven_sell_quote_create_chosen_goods_tbody tr').eq(i).find('td').eq(9).text(),
                tax_money: $('.tanceng .ven_sell_quote_create_chosen_goods_tbody tr').eq(i).find('td').eq(10).text()
            });
        });
        sellQuoteEditData.goods = sellQuoteEditGoodsArr;
        sellQuoteEditData.product_good_sum_num = $('.tanceng .goods_num_total').html(); // 普通商品总数
        sellQuoteEditData.product_good_sum_price = $('.tanceng .goods_cost_total').html();// 普通商品总价额
        sellQuoteEditData.product_good_sum_tax_money = $('.tanceng .goods_tax_total').html(); // 普通商品总含税额

        //套餐商品信息
        var sellQuoteEditPackageArr = [];
        $.each($('.tanceng .ven_sell_quote_choose_package_parent_tbody tr'), function (i, v) {
            sellQuoteEditPackageArr.push({
                package_id: $('.tanceng .ven_sell_quote_choose_package_parent_tbody tr').eq(i).attr('packageid'),
                package_name: $('.tanceng .ven_sell_quote_choose_package_parent_tbody tr').eq(i).find('td').eq(1).text(),
                package_code_sn: $('.tanceng .ven_sell_quote_choose_package_parent_tbody tr').eq(i).find('td').eq(2).text(),
                package_num: $('.tanceng .ven_sell_quote_choose_package_parent_tbody tr').eq(i).find('.sell_quote_create_package_num').val(),
                package_sum_total: $('.tanceng .ven_sell_quote_choose_package_parent_tbody tr').eq(i).find('td').eq(4).text()
            });
        });
        sellQuoteEditData.package = sellQuoteEditPackageArr;
        sellQuoteEditData.package_sum_num = $('.tanceng .sell_quote_create_package_num_total').html(); // 套餐总数量
        sellQuoteEditData.package_sum_total = $('.tanceng .sell_quote_create_package_cost_total').html();// 套餐总价额
        //套餐包含子商品
        sellQuoteEditData.package_goods = [];
        $.each($('.tanceng .ven_sell_quote_choose_package_child_tbody tr'), function (i, v) {
            sellQuoteEditData.package_goods.push({
                good_id: $('.tanceng .ven_sell_quote_choose_package_child_tbody tr').eq(i).attr('packagechildid'),
                good_name: $('.tanceng .ven_sell_quote_choose_package_child_tbody tr').eq(i).find('td').eq(1).text(),
                good_code_sn: $('.tanceng .ven_sell_quote_choose_package_child_tbody tr').eq(i).find('td').eq(2).text(),
                good_attribute: $('.tanceng .ven_sell_quote_choose_package_child_tbody tr').eq(i).find('td').eq(3).text(),
                unit: $('.tanceng .ven_sell_quote_choose_package_child_tbody tr').eq(i).find('td').eq(4).text(),
                num: $('.tanceng .ven_sell_quote_choose_package_child_tbody tr').eq(i).find('td').eq(5).text(),
                price: $('.tanceng .ven_sell_quote_choose_package_child_tbody tr').eq(i).find('td').eq(6).text(),
                total_num: $('.tanceng .ven_sell_quote_choose_package_child_tbody tr').eq(i).find('td').eq(7).text(),
                good_total: $('.tanceng .ven_sell_quote_choose_package_child_tbody tr').eq(i).find('td').eq(8).text(),
                tax_rate: $('.tanceng .ven_sell_quote_choose_package_child_tbody tr').eq(i).find('td').eq(9).text(),
                single_tax_money: $('.tanceng .ven_sell_quote_choose_package_child_tbody tr').eq(i).find('td').eq(10).text(),
                sum_tax_money: $('.tanceng .ven_sell_quote_choose_package_child_tbody tr').eq(i).find('td').eq(11).text()
            })
        });
        sellQuoteEditData.package_goods_sum_num = $('.tanceng .sell_quote_create_package_children_num_total').html(); // 套餐子商品数量
        sellQuoteEditData.package_goods_sum_price = $('.tanceng .sell_quote_create_package_children_cost_total').html();// 套餐子商品价额
        sellQuoteEditData.package_goods_sum_tax_money = $('.tanceng .sell_quote_create_package_children_tax_total').html(); // 套餐子商品总含税额

        //配置商品信息
        sellQuoteEditData.setting = [];
        $.each($('.tanceng .ven_sell_quote_create_chosen_setting_tbody tr'), function (i, v) {
            sellQuoteEditData.setting.push({
                setting_id: $('.tanceng .ven_sell_quote_create_chosen_setting_tbody tr').eq(i).attr('settingid'),
                setting_name: $('.tanceng .ven_sell_quote_create_chosen_setting_tbody tr').eq(i).find('td').eq(0).find('span').text(),
                setting_code_sn: $('.tanceng .ven_sell_quote_create_chosen_setting_tbody tr').eq(i).find('td').eq(1).text(),
                setting_unit: $('.tanceng .ven_sell_quote_create_chosen_setting_tbody tr').eq(i).find('td').eq(2).text(),
                setting_num: $('.tanceng .ven_sell_quote_create_chosen_setting_tbody tr').eq(i).find('td').eq(3).find('.ven_sell_quote_setting_parent_num').val()
                /*,setting_sum_total: $('.tanceng .ven_sell_quote_create_chosen_setting_tbody tr').eq(i).find('td').eq(4).text()*/
            });
        });
        //配置包含子商品信息
        sellQuoteEditData.setting_goods = [];
        $.each($('.tanceng .ven_sell_quote_create_setting_child_chosen_list tr'), function (i, v) {
            sellQuoteEditData.setting_goods.push({
                good_id: $('.tanceng .ven_sell_quote_create_setting_child_chosen_list tr').eq(i).attr('settingchildid'),
                good_name: $('.tanceng .ven_sell_quote_create_setting_child_chosen_list tr').eq(i).find('td').eq(1).text(),
                good_code_sn: $('.tanceng .ven_sell_quote_create_setting_child_chosen_list tr').eq(i).find('td').eq(2).text(),
                good_attribute: $('.tanceng .ven_sell_quote_create_setting_child_chosen_list tr').eq(i).find('td').eq(3).text(),
                unit: $('.tanceng .ven_sell_quote_create_setting_child_chosen_list tr').eq(i).find('td').eq(4).text(),
                num: $('.tanceng .ven_sell_quote_create_setting_child_chosen_list tr').eq(i).find('td').eq(5).find('.ven_sell_quote_setting_child_one_num').val(),
                price: parseFloat($('.tanceng .ven_sell_quote_create_setting_child_chosen_list tr').eq(i).find('td').eq(6).find('.product_reference_price').val()),
                good_price: $('.tanceng .ven_sell_quote_create_setting_child_chosen_list tr').eq(i).find('td').eq(7).find('.ven_sell_quote_setting_child_one_cost').val(),
                total_num: $('.tanceng .ven_sell_quote_create_setting_child_chosen_list tr').eq(i).find('.ven_sell_quote_setting_child_one_num_total').text(),
                good_total: $('.tanceng .ven_sell_quote_create_setting_child_chosen_list tr').eq(i).find('.ven_sell_quote_setting_child_one_cost_total').text(),
                tax_rate: $('.tanceng .ven_sell_quote_create_setting_child_chosen_list tr').eq(i).find('.ven_sell_quote_setting_child_one_tax').text(),
                single_tax_money: $('.tanceng .ven_sell_quote_create_setting_child_chosen_list tr').eq(i).find('.ven_sell_quote_setting_child_one_tax_text').text(),
                sum_tax_money: $('.tanceng .ven_sell_quote_create_setting_child_chosen_list tr').eq(i).find('.ven_sell_quote_setting_child_one_tax_total').text()
            })
        });
        sellQuoteEditData.setting_goods_sum_num = $('.tanceng .setting_child_num_total').html(); // 配置子商品数量
        sellQuoteEditData.setting_goods_sum_price = $('.tanceng .setting_child_cost_total').html();// 配置子商品价额
        sellQuoteEditData.setting_goods_sum_tax_money = $('.tanceng .setting_child_tax_total').html(); // 配置子商品总含税额

        //是否包运费
        if ($('.tanceng .ven_sell_quote_create_freight_checkbox').is(':checked')) {
            sellQuoteEditData.is_freight = 1;
        } else {
            sellQuoteEditData.is_freight = 0;
        }
        //备注
        if ($('.tanceng .ven_sell_quote_create_note_textarea').val() == '请输入备注') {
            sellQuoteEditData.note = '';
        } else {
            sellQuoteEditData.note = $('.tanceng .ven_sell_quote_create_note_textarea').val();
        }
        //商品合计
        sellQuoteEditData.good_totals = $('.tanceng .sell_quote_create_product_cost_total').val();
        //合计税额
        sellQuoteEditData.rate_sum = $('.tanceng .sell_quote_create_tax_total').val();
        //其他费用
        sellQuoteEditData.other_free = $('.tanceng .sell_quote_create_other_fee').val();
        //总计金额
        sellQuoteEditData.totals = $('.tanceng .ven_sell_quote_create_cost_tax_total').html();

        //审批人
        sellQuoteEditData.flow = flowChosenArr.join(',');
        console.log(sellQuoteEditData);
        $.ajax({
            url: SERVER_URL + "/quote/add",
            type: 'POST',
            data: sellQuoteEditData,
            dataType: 'json',
            success: function (e) {
                if (e.code == 0) {
                    alert('修改成功');
                    $(this).closest('.dialog_box').remove();
                    $('.tanceng').css('display', 'none');
                    getSellQuoteList($('#ven_sell_quote_nav_ul li.tabhover').attr('needurl'));
                }
            },
            error: function (data) {
                alert(data);
            }
        });
    }

    //编辑销售报价单 - 提交
    $('.tanceng .ven_sell_quote_edit_submit').live('click', function () {
        sellQuoteEditData.is_draft = 0;
        sellQuoteEditSubmitFn();
    });
    //编辑销售报价单 - 保存草稿
    $('.tanceng .ven_sell_quote_edit_submit_draft').live('click', function () {
        sellQuoteEditData.is_draft = 1;
        sellQuoteEditSubmitFn();
    })

});
