$(function () {
    var token, pid, key, page, limit, word_titl, goods_id, goods_pid, goods_member, goods_enddate, goods_fileurl, goods_imgurl, w_p_n;
    token = Admin.get_token();
    //token = '2017052516045457073-1-1';
    uname = loginUserInfo.username;
    uid = Admin.get_uid();
    comid = loginUserInfo.usercompany_id;
    var deptid = loginUserInfo.department_id;
    var deptName = loginUserInfo.department_name;
    userface = loginUserInfo.userface;

    //查询普通商品当前库存函数
    function searchGoodsNumFn(goodsId) {
        var proNum = {
            cur_num: 0,
            stocking_num: 0
        };
        $.ajax({
            url: SERVER_URL + '/warehouse/numbyproid',
            type: 'GET',
            data: {
                token: token,
                id: goodsId,
                warehouse_id: ''
            },
            async: false,
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                if (oE.code == 0) {
                    proNum.cur_num = oE.data.currentNum;
                    proNum.stocking_num = oE.data.stockOutIngNum;
                }
            },
            error: function (e) {
                alert(e.msg);
                console.log(e);
            }
        });
        return proNum;
    }

    //查询整机商品当前库存函数
    function searchSettingNumFn(goodsId) {
        var proNum = {
            cur_num: 0,
            stocking_num: 0
        };
        $.ajax({
            url: SERVER_URL + '/warehouse/numbysetproid',
            type: 'GET',
            data: {
                token: token,
                id: goodsId,
                warehouse_id: ''
            },
            async: false,
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                if (oE.code == 0) {
                    proNum.cur_num = oE.data.currentNum;
                    proNum.stocking_num = oE.data.stockOutIngNum;
                }
            },
            error: function (e) {
                alert(e.msg);
                console.log(e);
            }
        });
        return proNum;
    }

    var sellQuoteStepsArr = ['一次报价', '二次报价', '三次报价', '四次报价', '五次报价', '六次报价', '七次报价'];

    // 定义销售报价单参数
    var sellQuoteData = {
        token: token,
        thetype: 1,
        page: 1, //页面
        num: 10, //每页条数
        keywords: '', //关键字
        is_invalid: 0, // 作废状态  0：正常 1：作废
        is_draft: 0, // 是否草稿,0不是1是
        status: '',
        flow: '',
        dept_id: '',
        owner_id: '',
        ids: ''
    };
    // 定义销售报价单草稿参数
    var sellQuoteDraftData = {
        token: token,
        thetype: 1,
        page: 1,
        num: 10,
        is_draft: 1
    };
    //刷新列表
    $('#ven_sell_quote_refresh').die('click').live('click', function () {
        sellQuoteData.page = 1;
        sellQuoteData.keywords = '';
        sellQuoteData.status = '';
        sellQuoteData.flow = '';
        sellQuoteData.dept_id = '';
        sellQuoteData.owner_id = '';
        sellQuoteData.ids = '';
        $('#ven_sell_quote_searKey_inp').val('搜索销售报价单编号/客户名称').css('color', '#CCCCCC');
        $('#ven_sell_quote_searKey_inp_sp').val('搜索销售报价单编号/客户名称').css('color', '#CCCCCC');
        $('#ven_sell_quote_search_status_inp').val('全部').css('color', '#ccc');
        $('#ven_sell_quote_search_status_inp_sp').val('全部').css('color', '#ccc');
        $('#ven_sell_quote_search_dept_inp_sp').val('全部').css('color', '#ccc');
        $('#ven_sell_quote_search_owner_inp_sp').val('全部').css('color', '#ccc');
        getSellQuoteList();
        //$('#ven_sell_quote_search_flow_inp').val('审批人').css('color', '#CCCCCC');
        //$('#ven_sell_quote_search_product_name_inp').val('销售商品类型').css('color', '#CCCCCC');
        //$('#ven_sell_quote_search_dept_inp').val('负责部门').css('color', '#CCCCCC');
        //$('#ven_sell_quote_search_owner_inp').val('负责人').css('color', '#CCCCCC');
        getSellQuoteListSp();
    });
    //我发起的 - 高级搜索 - 清除选择
    $('.ven_sell_quote_my_clear_search').live('click', function () {
        $('#ven_sell_quote_search_status_inp').val('全部').css('color', '#ccc');
        sellQuoteData.status = '';
        getSellQuoteList();
    });
    //待我审批 - 高级搜索 - 清除选择
    $('.ven_sell_quote_my_clear_search_sp').live('click', function () {
        $('#ven_sell_quote_search_status_inp_sp').val('全部').css('color', '#ccc');
        $('#ven_sell_quote_search_dept_inp_sp').val('全部').css('color', '#ccc');
        $('#ven_sell_quote_search_owner_inp_sp').val('全部').css('color', '#ccc');
        sellQuoteData.status = '';
        sellQuoteData.dept_id = '';
        sellQuoteData.owner_id = '';
        getSellQuoteListSp();
    });
    //判断是否来自消息
    if ($('#left_button_36').attr('fromnotice') == 1) {
        var curId = $('#left_button_36').attr('detailid');
        var secondName = $('#left_button_36').attr('secondmenu');
        $.each($('.tabtitle li'), function (i, v) {
            if ('待我审批' == $.trim($('.tabtitle li').eq(i).text())) {
                //$('.tabtitle li').removeClass('tabhover').eq(i).addClass('tabhover');
                sellQuoteData = {
                    token: token,
                    thetype: 2,
                    page: 1, //页面
                    num: 10, //每页条数
                    keywords: '', //关键字
                    is_invalid: 0, // 作废状态  0：正常 1：作废
                    is_draft: 0, // 是否草稿,0不是1是
                    status: '',
                    ids: curId,
                    flow: '',
                    dept: '',
                    owner: ''
                };
                setTimeout(function () {
                    $('.tabtitle li').eq(i).trigger('click');
                    $('#left_button_36').attr({
                        'fromnotice': '',
                        'detailid': '',
                        'secondmenu': '',
                        'totable': ''
                    });
                }, 100);
            }
        });
    } else {
        getSellQuoteList('/quote/list');
    }

    $('#ven_sell_quote_my_list').die('click').live('click', function () {
        sellQuoteData.page = 1;
        sellQuoteData.thetype = 1;
        sellQuoteData.status = '';
        sellQuoteData.ids = '';
        sellQuoteData.keywords = '';
        sellQuoteData.flow = '';
        sellQuoteData.dept_id = '';
        sellQuoteData.owner_id = '';
        sellQuoteData.ids = '';
        $('#ven_sell_quote_searKey_inp').val('搜索销售报价单编号/客户名称').css('color', '#ccc');
        $('#ven_sell_quote_draft_btn').removeClass('none');
        $('.ven_sell_quote_vend_title_right').css('width', '220px');
        getSellQuoteList();
        $('.ven_sell_quote_tgshzje').removeClass('none');
        $('.zkgjss_content').css('display', 'none');
        $('.zkgjssBtn').text('展开高级搜索').css({'background': '#fff', 'color': '#999', 'border': '1px solid #e6e6e6'})

    });
    $('#ven_sell_quote_tome_list').die('click').live('click', function () {
        sellQuoteData.page = 1;
        sellQuoteData.thetype = 2;
        sellQuoteData.status = '';
        sellQuoteData.ids = '';
        sellQuoteData.keywords = '';
        sellQuoteData.flow = '';
        sellQuoteData.dept_id = '';
        sellQuoteData.owner_id = '';
        sellQuoteData.ids = '';
        $('#ven_sell_quote_searKey_inp_sp').val('搜索销售报价单编号/客户名称').css('color', '#ccc');
        $('#ven_sell_quote_draft_btn').addClass('none');
        $('.ven_sell_quote_vend_title_right').css('width', '120px');
        getSellQuoteListSp();
        $('.ven_sell_quote_tgshzje').addClass('none');
        $('.zkgjss_content').css('display', 'none');
        $('.zkgjssBtn').text('展开高级搜索').css({'background': '#fff', 'color': '#999', 'border': '1px solid #e6e6e6'})
    });

//********************我发起的************************************************************************
    //获取销售报价单列表
    function getSellQuoteList() {
        $.ajax({
            url: SERVER_URL + '/quote/list',
            type: 'GET',
            data: sellQuoteData,
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                if (oE.code == 0) {
                    //搜索总条数
                    $('#ven_sell_quote_total').html(oE.totalcount);
                    //通过审核总金额
                    $('#ven_sell_quote_sum_totals').html(oE.sum_totals);
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
                        //审批状态
                        var statusName = '';
                        if (sellQuoteData.thetype == 1) {
                            sellQuoteIsvalidClass = '';
                            sellQuoteIsvalidSort = l_dbl(i + 1);
                            if (v['status'] == 1) {
                                statusName = '审批中';
                                sellQuoteStatusClass = 'c_y';
                            } else if (v['status'] == 2) {
                                statusName = '未通过';
                                sellQuoteStatusClass = 'c_r';
                            } else if (v['status'] == 3) {
                                statusName = '已通过';
                                sellQuoteStatusClass = 'c_g';
                            }
                            //已关联订单或合同则不可编辑
                            if (v['contract_code_sn'] || v['order_code_sn']) {
                                var moreOperateType = '0';
                                sellQuoteBtn = '<button class="but_mix r_sidebar_btn but_look ven_sell_quote_look" name="xs_bjd_right">查看</button>';
                            } else {
                                var moreOperateType = '1';
                                sellQuoteBtn = '<button class="but_mix r_sidebar_btn but_look ven_sell_quote_look" name="xs_bjd_right">查看</button><button class="but_mix but_exit val_dialog lik_sell_quote_edit_btn" name="xs_bjd_exit">编辑</button><button class="but_mix but_r val_dialogTop lik_sell_quote_del_btn" name="xs_xsbjd_delete">删除</button>';
                            }
                        } else if (sellQuoteData.thetype == 2) {
                            sellQuoteIsvalidClass = '';
                            sellQuoteIsvalidSort = l_dbl(i + 1);
                            if (v['status'] == 1) {
                                if (v['cur_status'] == 3) {
                                    sellQuoteBtn = '<button class="but_mix r_sidebar_btn but_look ven_sell_quote_look" name="xs_bjd_right">查看</button><button class="but_mix but_grey1">审批</button>';
                                } else {
                                    sellQuoteBtn = '<button class="but_mix r_sidebar_btn but_look ven_sell_quote_look" name="cs_bjd_splook">查看</button><button class="but_mix val_dialog but_look ven_sell_quote_check_btn" name="xs_bjd_xq_sp">审批</button>';
                                }

                                sellQuoteStatusClass = 'c_y';
                                statusName = '审批中';
                            } else if (v['status'] == 2) {
                                sellQuoteBtn = '<button class="but_mix r_sidebar_btn but_look ven_sell_quote_look" name="xs_bjd_right">查看</button><button class="but_mix but_grey1">审批</button>';
                                sellQuoteStatusClass = 'c_r';
                                statusName = '未通过';
                            } else if (v['status'] == 3) {
                                sellQuoteBtn = '<button class="but_mix r_sidebar_btn but_look ven_sell_quote_look" name="xs_bjd_right">查看</button><button class="but_mix but_grey1">审批</button>';
                                sellQuoteStatusClass = 'c_g';
                                statusName = '已通过';
                            }
                        }
                        var flowList = '';
                        $.each(v['flowArr'], function (i2, v2) {
                            flowList += v2['name'] + '、';
                        });
                        flowList = flowList.slice(0, flowList.length - 1);
                        sellQuoteHtml += '<tr vensellquoteid="' + v['id'] + '" operate="' + moreOperateType + '" class="' + sellQuoteIsvalidClass + '">\
                            <td>' + sellQuoteIsvalidSort + '</td>\
                            <td>' + likNullData(v['code_sn']) + '</td>\
                            <td>' + likNullData(v['customer_name']) + '</td>\
                            <td class="' + sellQuoteStatusClass + '">' + statusName + '</td>\
                            <td>' + flowList + '</td>\
                            <td>' + likNullData(v['totals']) + '</td>\
                            <td class="f_color finance_pay_rent_list r_sidebar_btn xsht_chakan_btn" name="vendition_contract_code_sn">' + likNullData(v['contract_code_sn']) + '</td>\
                            <td class="'+(v['order_code_sn']? 'f_color finance_pay_rent_list r_sidebar_btn ven_sell_order_look' : '')+'" name="vendition_order_code_sn">' + likNullData(v['order_code_sn']) + '</td>\
                            <td class="f_color finance_pay_rent_list r_sidebar_btn zj_jcd_check_xq_btn" name="vendition_lend_code_sn">' + likNullData(v['lend_code_sn']) + '</td>\
                            <td>' + likNullData(v['created_at'].split(' ')[0]) + '</td>\
                            <td>' + sellQuoteBtn + '</td>\
                        </tr>';
                    });
                    //
                    //销售报价单数据渲染
                    $('#ven_sell_quote_list').html(sellQuoteHtml);
                }
                //分页
                list_table_render_pagination('.ven_sell_quote_pagination', sellQuoteData, getSellQuoteList, oE.totalcount, datalist.length);
                $('#ven_sell_quote_look_save').trigger('click');
            }
        });
        //获取草稿数量
        getSellQuoteDraftNum();
    }

    // 定义选择查看项
    var venSellQuoteLookAbledField = [
        {'index': null, 'field': '总金额(元)'},
        {'index': null, 'field': '关联合同'},
        {'index': null, 'field': '关联销售订单'},
        {'index': null, 'field': '关联借出单'},
        {'index': null, 'field': '创建日期'}
    ];
    likShow('#ven_sell_quote_table', venSellQuoteLookAbledField, '#ven_sell_quote_look_ul', '#ven_sell_quote_look_save', '#ven_sell_quote_look_reset');
    //搜索关键字
    $('#ven_sell_quote_searKey_btn').die('click').live('click', function () {
        if ($('#ven_sell_quote_searKey_inp').val() == '搜索销售报价单编号/客户名称') {
            sellQuoteData.keywords = '';
        } else {
            sellQuoteData.keywords = $('#ven_sell_quote_searKey_inp').val();
        }
        getSellQuoteList('/quote/list');
    });

//********************待我审批********************************************************************
    // 定义选择查看项
    var venSellQuoteLookAbledFieldSP = [
        {'index': null, 'field': '审批人'},
        {'index': null, 'field': '总金额(元)'},
        {'index': null, 'field': '创建日期'},
        {'index': null, 'field': '负责部门'},
        {'index': null, 'field': '负责人'}
    ];
    likShow('#ven_sell_quote_table_sp', venSellQuoteLookAbledFieldSP, '#ven_sell_quote_look_ul_sp', '#ven_sell_quote_look_save_sp', '#ven_sell_quote_look_reset_sp');
    //待我审批--获取销售报价单列表
    function getSellQuoteListSp() {
        $.ajax({
            url: SERVER_URL + '/quote/list',
            type: 'GET',
            data: sellQuoteData,
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                if (oE.code == 0) {
                    //搜索总条数
                    $('#ven_sell_quote_total_sp').html(oE.totalcount);
                    //获取datalist
                    var datalist = oE.datalist;
                    if (datalist.length == 0) {
                        $('.ven_sell_quote_nodata_box_sp').removeClass('none');
                        $('.ven_sell_quote_handle_sp').addClass('none');
                    } else {
                        $('.ven_sell_quote_nodata_box_sp').addClass('none');
                        $('.ven_sell_quote_handle_sp').removeClass('none');
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
                        //审批状态
                        var statusName = '';
                        if (sellQuoteData.thetype == 1) {
                            sellQuoteIsvalidClass = '';
                            sellQuoteIsvalidSort = l_dbl(i + 1);
                            if (v['status'] == 1) {
                                statusName = '审批中';
                                sellQuoteStatusClass = 'c_y';
                            } else if (v['status'] == 2) {
                                statusName = '未通过';
                                sellQuoteStatusClass = 'c_r';
                            } else if (v['status'] == 3) {
                                statusName = '已通过';
                                sellQuoteStatusClass = 'c_g';
                            }
                            //已关联订单或合同则不可编辑
                            if (v['contract_code_sn'] || v['order_code_sn']) {
                                var moreOperateType = '0';
                                sellQuoteBtn = '<button class="but_mix r_sidebar_btn but_look ven_sell_quote_look" name="xs_bjd_right">查看</button>';
                            } else {
                                var moreOperateType = '1';
                                sellQuoteBtn = '<button class="but_mix r_sidebar_btn but_look ven_sell_quote_look" name="xs_bjd_right">查看</button><button class="but_mix but_exit val_dialog lik_sell_quote_edit_btn" name="xs_bjd_exit">编辑</button><button class="but_mix but_r val_dialogTop lik_sell_quote_del_btn" name="xs_xsbjd_delete">删除</button>';
                            }
                        } else if (sellQuoteData.thetype == 2) {
                            sellQuoteIsvalidClass = '';
                            sellQuoteIsvalidSort = l_dbl(i + 1);
                            if (v['status'] == 1) {
                                if (v['cur_status'] == 3) {
                                    sellQuoteBtn = '<button class="but_mix r_sidebar_btn but_look ven_sell_quote_look" name="xs_bjd_right">查看</button><button class="but_mix but_grey1">审批</button>';
                                } else {
                                    sellQuoteBtn = '<button class="but_mix r_sidebar_btn but_look ven_sell_quote_look" name="cs_bjd_splook">查看</button><button class="but_mix val_dialog but_look ven_sell_quote_check_btn" name="xs_bjd_xq_sp">审批</button>';
                                }
                                sellQuoteStatusClass = 'c_y';
                                statusName = '审批中';
                            } else if (v['status'] == 2) {
                                sellQuoteBtn = '<button class="but_mix r_sidebar_btn but_look ven_sell_quote_look" name="xs_bjd_right">查看</button><button class="but_mix but_grey1">审批</button>';
                                sellQuoteStatusClass = 'c_r';
                                statusName = '未通过';
                            } else if (v['status'] == 3) {
                                sellQuoteBtn = '<button class="but_mix r_sidebar_btn but_look ven_sell_quote_look" name="xs_bjd_right">查看</button><button class="but_mix but_grey1">审批</button>';
                                sellQuoteStatusClass = 'c_g';
                                statusName = '已通过';
                            }
                        }
                        var flowList = '';
                        $.each(v['flowArr'], function (i2, v2) {
                            flowList += v2['name'] + '、';
                        });
                        flowList = flowList.slice(0, flowList.length - 1);
                        sellQuoteHtml += '<tr vensellquoteid="' + v['id'] + '" operate="' + moreOperateType + '" class="' + sellQuoteIsvalidClass + '">\
                            <td>' + sellQuoteIsvalidSort + '</td>\
                            <td>' + likNullData(v['code_sn']) + '</td>\
                            <td>' + likNullData(v['customer_name']) + '</td>\
                            <td class="' + sellQuoteStatusClass + '">' + statusName + '</td>\
                            <td>' + flowList + '</td>\
                            <td>' + likNullData(v['totals']) + '</td>\
                            <td>' + likNullData(v['created_at'].split(' ')[0]) + '</td>\
                            <td>' + likNullData(v['dept_name']) + '</td>\
                            <td>' + likNullData(v['owner']) + '</td>\
                            <td>' + sellQuoteBtn + '</td>\
                        </tr>';
                    });
                    //
                    //销售报价单数据渲染
                    $('#ven_sell_quote_list_sp').html(sellQuoteHtml);
                }
                //分页
                list_table_render_pagination('.ven_sell_quote_pagination_sp', sellQuoteData, getSellQuoteListSp, oE.totalcount, datalist.length);
                $('#ven_sell_quote_look_save_sp').trigger('click');
            }
        });
    }

    //搜索关键字
    $('#ven_sell_quote_searKey_btn_sp').die('click').live('click', function () {
        if ($('#ven_sell_quote_searKey_inp_sp').val() == '搜索销售报价单编号/客户名称') {
            sellQuoteData.keywords = '';
        } else {
            sellQuoteData.keywords = $('#ven_sell_quote_searKey_inp_sp').val();
        }
        getSellQuoteListSp();
    });
    //高级搜索 控制下拉框
    $('.sell_quote_zkgjssBtn_sp').die('click').live('click', function () {
        if ($.trim($(this).text()) != '展开高级搜索') {
            venSellQuoteSearchSP();
        }
    });
    function venSellQuoteSearchSP() {
        $.ajax({
            url: SERVER_URL + '/common/search',
            type: 'GET',
            data: {
                token: token,
                big_type: 12,
                small_type: 'dept_id'
            },
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                if (oE.code == 0) {
                    var deptHtml = '';
                    $.each(oE.data, function (i, v) {
                        deptHtml += '<li searchid="' + v['id'] + '">' + v['name'] + '</li>';
                    });
                    $('#ven_sell_quote_search_dept_ul').html(deptHtml);
                }
            }
        });
        $.ajax({
            url: SERVER_URL + '/common/search',
            type: 'GET',
            data: {
                token: token,
                big_type: 12,
                small_type: 'owner_id'
            },
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                if (oE.code == 0) {
                    var ownerHtml = '';
                    $.each(oE.data, function (i, v) {
                        ownerHtml += '<li searchid="' + v['id'] + '">' + v['name'] + '</li>';
                    });
                    $('#ven_sell_quote_search_owner_ul').html(ownerHtml);
                }
            }
        });
    }

    //搜索负责部门
    $('#ven_sell_quote_search_dept_ul li').live('click', function () {
        sellQuoteData.dept_id = $(this).attr('searchid');
        getSellQuoteListSp();
    });
    //搜索负责人
    $('#ven_sell_quote_search_owner_ul li').live('click', function () {
        sellQuoteData.owner_id = $(this).attr('searchid');
        getSellQuoteListSp();
    });


    //获取销售报价单草稿列表
    $('#ven_sell_quote_draft_btn').die('click').live('click', function () {
        getSellQuoteDraftList();
    });
    //草稿只显示数量
    function getSellQuoteDraftNum() {
        $.ajax({
            url: SERVER_URL + '/quote/list',
            type: 'GET',
            data: sellQuoteDraftData,
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    //搜索总条数
                    $('.ven_sell_quote_draft_num').html(oE.totalcount);
                }
            }
        });
    }

    function getSellQuoteDraftList() {
        $.ajax({
            url: SERVER_URL + '/quote/list',
            type: 'GET',
            data: sellQuoteDraftData,
            dataType: 'json',
            success: function (oE) {
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
                            <td>' + likNullData(v['lend_code_sn']) + '</td>\
                            <td>' + likNullData(v['customer_name']) + '</td>\
                            <td>' + likNullData(v['product_name']) + '</td>\
                            <td>' + likNullData(v['totals']) + '</td>\
                            <td>' + likNullData(v['created_at'].split(' ')[0]) + '</td>\
                            <td>' + likNullData(v['owner']) + '</td>\
                            <td><button class="but_mix but_exit val_dialog lik_sell_quote_edit_btn" name="xs_bjd_exit">编辑</button><button class="but_mix but_r val_dialogTop lik_sell_quote_del_btn" name="xs_xsbjd_delete">删除</button></td>\
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

    //审批状态 - 我发起的
    $('.ven_sell_quote_search_status_ul li').die('click').live('click', function () {
        sellQuoteData.status = $(this).attr('searchid');
        getSellQuoteList();
    });
    //审批状态 - 待我审批
    $('.ven_sell_quote_search_status_ul_sp li').die('click').live('click', function () {
        sellQuoteData.status = $(this).attr('searchid');
        getSellQuoteListSp();
    });
    //审批人
    $('#ven_sell_quote_search_flow_ul li').die('click').live('click', function () {
        sellQuoteData.flow = $(this).closest('li').attr('flowid');
        getSellQuoteList();
    });

    //定义当前操作id
    var sellQuoteCurrentId = '';
    var sellOrderCurrentId = '';
    //查看操作
    $('.ven_sell_quote_look').die('click').live('click', function () {
        $('.ht_slid_list ul li:first-of-type').trigger('click');
        sellQuoteCurrentId = $(this).closest('tr').attr('vensellquoteid');

        //更多列表显示操作
        var sellQuoteLookMore = '';
        var curOperate = $(this).closest('tr').attr('operate');
        if (curOperate == 0) {
            $('#ven_sell_quote_look_more_btn').css('display', 'none');
            $('#ven_sell_quote_look_more').css('display', 'none');
        } else {
            $('#ven_sell_quote_look_more_btn').css('display', '');
            $('#ven_sell_quote_look_more').css('display', '');
            sellQuoteLookMore = '<li class="val_dialogTop" id="ven_sell_quote_look_more_edit_btn" name="xs_bjd_exit">编辑</li><li class="val_dialog" name="xs_xsbjd_delete" id="ven_sell_quote_look_more_del_btn">删除</li>'
        }
        $('#ven_sell_quote_look_more').html(sellQuoteLookMore);

        $.ajax({
            url: SERVER_URL + '/quote/info',
            type: 'GET',
            async: false,
            data: {
                token: token,
                quote_id: sellQuoteCurrentId
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var datalist = oE.data;
                    console.log(datalist);
                    //订单id
                    sellOrderCurrentId = datalist['order_id'];
                    //客户名称
                    $('.ven_sell_quote_look_custom_name').html(likNullData(datalist['customer_name']));
                    //创建日期
                    $('.ven_sell_quote_look_create_at').html(likNullData(datalist['created_at']));
                    //创建人
                    $('.ven_sell_quote_look_uname').html(likNullData(datalist['owner']));
                    //报价单编号
                    $('.ven_sell_quote_look_code_sn').html(likNullData(datalist['code_sn']));
                    //关联销售合同
                    $('.ven_sell_quote_look_contract_code_sn').html(likNullData(datalist['contract_code_sn']));
                    //关联销售订单
                    $('.ven_sell_quote_look_order_code_sn').html(likNullData(datalist['order_code_sn']));
                    //关联借出单
                    $('.ven_sell_quote_look_lend_code_sn').html(likNullData(datalist['lend_code_sn']));
                    //审批状态
                    var statusname = '';
                    if (datalist['status'] == 1) {
                        statusname = '审批中';
                        $('.ven_sell_quote_check_btn_box').removeClass('none');
                        $('.ven_sell_quote_look_check_img').css('display', 'none').attr('src', '');
                    } else if (datalist['status'] == 2) {
                        statusname = '未通过';
                        $('.ven_sell_quote_check_btn_box').addClass('none');
                        $('.ven_sell_quote_look_check_img').css('display', 'inline-block').attr('src', 'static/images/refuse.png');
                    } else if (datalist['status'] == 3) {
                        statusname = '已通过';
                        $('.ven_sell_quote_check_btn_box').addClass('none');
                        $('.ven_sell_quote_look_check_img').css('display', 'inline-block').attr('src', 'static/images/pass.png');
                    }
                    $('.ven_sell_quote_look_status_name').html(statusname);
                    //审批人
                    $('.ven_sell_quote_look_current_name').html(likNullData(datalist['current_name']));
                    //销售商品
                    $('.ven_sell_quote_look_product_name').html(likNullData(datalist['product_name']));
                    //商品销售金额
                    $('.ven_sell_quote_look_good_totals').html(datalist['good_totals']);
                    //税率合计
                    $('.ven_sell_quote_look_tax_rate').html(datalist['tax_rate'] == '1' ? '含税17%' : '无税');
                    //总金额
                    $('.ven_sell_quote_look_totals').html(likNullData(datalist['totals']));
                    //制单日期
                    $('.ven_sell_quote_look_create_quote_at').html(likNullData(datalist['created_at'].split(' ')[0]));
                    //负责部门
                    $('.ven_sell_quote_look_dept_name').html(likNullData(datalist['dept_name']));
                    //负责人
                    $('.ven_sell_quote_look_owner_name').html(likNullData(datalist['owner_name']));

                    //承担运费
                    $('.ven_sell_quote_look_freight').html(datalist['is_freight'] == 1 ? '包运费' : '不包运费');
                    //物流方式
                    if (datalist['logistics_type'] == 1) {
                        $('.ven_sell_quote_look_logistics').html('快递');
                    } else if (datalist['logistics_type'] == 2) {
                        $('.ven_sell_quote_look_logistics').html('陆运');
                    } else if (datalist['logistics_type'] == 3) {
                        $('.ven_sell_quote_look_logistics').html('陆运');
                    } else if (datalist['logistics_type'] == 4) {
                        $('.ven_sell_quote_look_logistics').html('平邮');
                    } else if (datalist['logistics_type'] == 5) {
                        $('.ven_sell_quote_look_logistics').html('海运');
                    }

                    //审批流程
                    var sellQuoteLookCheckListHtml = '';
                    var checkStatusClass = "";

                    var flowOrderArr2 = ['', '步骤一', '步骤二', '步骤三', '步骤四', '步骤五', '步骤六', '步骤七'];
                    if (datalist['check_log'].length != 0) {
                        $('.sq_look_check_box').removeClass('none');
                        $.each(datalist['check_log'], function (i, v) {
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
                            /*sellQuoteLookCheckListHtml += '<div class="work_spiliu">\
                             <div class="work_spiliu_items">\
                             <div class="left" style="position: relative;">\
                             <img class="inline_block tx" src="' + v['face'] + '">\
                             <cite class="' + checkCiteClass + '"></cite>\
                             </div>\
                             <div class="right auto_height" style="min-height: 85px;">\
                             <img src="static/images/work_jiantou.png">\
                             <div class="sp_cont">\
                             <div class="sp_cont_a"><h3 class="c_3" ' + (v['status'] == 2 ? 'style="color:#f8ac59;"' : '') + '>' + v['name'] + '</h3><span class="c_9 right ' + ((v['status'] == 0 || v['status'] == 1) ? 'none' : '') + '">' + v['day'] + '</span></div>\
                             <h3 class="' + checkStatusClass + '">' + checkStatusName + '</h3>\
                             <p class="c_3 work_sp_p">' + v['note'] + '</p>\
                             </div>\
                             </div>\
                             <div style="clear: both;height: 0;font-size: 1px;line-height: 0px;"></div>\
                             </div>\
                             </div>';*/
                            //sellQuoteLookCheckListHtml += '<div class="work_spiliu">\
                            //    <div class="work_spiliu_items">\
                            //    <div class="left" style="position: relative;">\
                            //    <div class="work_spiliu_div">\
                            //    <img class="inline_block tx" src="' + v['face'] + '">\
                            //    <h3 class="work_sp_h3">' + v['name'] + '</h3>\
                            //    <span class="c_9 m_left_5 '+(datalist['current_check'] == 1 ? 'none' : '')+'">'+flowOrderArr[i]+'</span>\
                            //    </div>\
                            //    <cite class="' + checkCiteClass + '"></cite>\
                            //    </div>\
                            //    <div class="auto_height">\
                            //    <img src="static/images/work_jiantou.png">\
                            //    <div class="sp_cont">\
                            //    <div class="sp_cont_a">\
                            //    <h3 class="' + checkStatusClass + '">' + checkStatusName + '</h3>\
                            //    <p class="c_9">' + v['day'] + '</p>\
                            //</div>\
                            //<p class="c_3 work_sp_p">' + v['note'] + '</p>\
                            //    </div>\
                            //    </div>\
                            //    <div style="clear: both;height: 0;font-size: 1px;line-height: 0px;"></div>\
                            //    </div>\
                            //    </div>';
                            sellQuoteLookCheckListHtml += '<div class="work_spiliu">\
                                <div class="work_spiliu_items" style="overflow: hidden;">\
                                <div class="left" style="position: relative;">\
                                <div class="work_spiliu_div">\
                                <img class="inline_block tx" src="' + getImgUrl(v['face']) + '">\
                                <h3 class="work_sp_h3">' + v['name'] + '</h3>\
                                <span class="c_9 m_left_5 ' + (datalist['current_check'] == 1 ? 'none1' : '') + '">' + flowOrderArr2[i] + '</span>\
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
                        $('.ven_sell_quote_look_check_list').html(sellQuoteLookCheckListHtml);
                    } else {
                        $('.sq_look_check_box').addClass('none');
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
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    if ($('.tabhover').html() == '我发起的') {
                        getSellQuoteList('/quote/list')
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
    $('.ven_sell_quote_invalid_btn').die('click').live('click', function () {
        sellQuoteCurrentId = $(this).closest('tr').attr('vensellquoteid');
        $.ajax({
            url: SERVER_URL + '/quote/setstatus',
            type: 'POST',
            data: {
                token: token,
                quote_id: sellQuoteCurrentId,
                status_flag: 1
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    if ($('.tabhover').html() == '我发起的') {
                        getSellQuoteList('/quote/list')
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
    $('#ven_sell_quote_noShow').die('click').live('click', function () {
        if ($(this).is(':checked')) {
            sellQuoteData.is_invalid = 0;
        } else {
            sellQuoteData.is_invalid = '';
        }
        getSellQuoteList('/quote/list');

        /*if ($(this).prop('checked')) {
         payFlowData.status = 0;
         $('#ven_pay_flow_search_status_inp').val('状态').css('color', '#CCCCCC');
         } else {
         payFlowData.status = '';
         }
         getPayFlowList()*/
    });
    //查看 - 编辑操作
    $('#ven_sell_quote_look_more_edit_btn').die('click').live('click', function () {
        $('.right_sidebar_h').trigger('click');
        sellQuoteEditFn(sellQuoteCurrentId);
    });
    //删除操作
    $('.lik_sell_quote_del_btn').die('click').live('click', function () {
        sellQuoteCurrentId = $(this).closest('tr').attr('vensellquoteid');
    });
    //查看 - 删除操作
    $('#ven_sell_quote_look_more_del_btn').die('click').live('click', function () {
        $('.right_sidebar').css('display', 'none');
    });
    //删除操作确定
    $('.tanceng .xs_bjd_list_delete').die('click').live('click', function () {
        var $_this = $(this);
        $.ajax({
            url: SERVER_URL + '/quote/del',
            type: 'GET',
            data: {
                token: token,
                id: sellQuoteCurrentId
            },
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                if (oE.code == 0) {
                    getSellQuoteList('/quote/list');
                    getSellQuoteDraftList();
                    $_this.closest('.dialog_box').remove();
                    if ($('.tanceng').children('div').length == 0) {
                        $('.tanceng').css('display', 'none');
                    }
                } else {
                    alert('操作失败')
                }
            }
        })
    });

    //查看报价单详情
    $('.ven_sell_quote_look_detail_btn').die('click').live('click', function () {
        sellQuoteDetailFn(sellQuoteCurrentId);
    });
    //报价单详情函数
    function sellQuoteDetailFn(sellQuoteCurrentId) {
        $.ajax({
            url: SERVER_URL + '/quote/detail',
            type: 'GET',
            data: {
                token: token,
                quote_id: sellQuoteCurrentId
            },
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                if (oE.code == 0) {
                    var data = oE.data;
                    console.log(data);
                    //创建日期
                    $('.tanceng .ven_sell_quote_detail_created_at').html(data['created_at'].split(' ')[0]);
                    //创建人
                    $('.tanceng .ven_sell_quote_detail_owner').html(data['owner']);
                    //创建人电话
                    $('.tanceng .ven_sell_quote_detail_owner_tel').html(data['mobile']);
                    //报价单有效期
                    if (data['expiry_day'] == 0 || data['expiry_day'] == '') {
                        $('.tanceng .ven_sell_quote_detail_deadline').html('-');
                    } else {
                        $('.tanceng .ven_sell_quote_detail_deadline').html(data['expiry_day']);
                    }
                    //编号
                    $('.tanceng .ven_sell_quote_detail_code_sn').html(data['code_sn']);
                    //客户
                    $('.tanceng .ven_sell_quote_detail_customer_name').html(data['customer_name']);
                    //承担运费
                    $('.tanceng .ven_sell_quote_detail_is_freight').html(data['is_freight'] == 1 ? '包运费' : '不包运费');
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
                    $('.tanceng .ven_sell_quote_detail_logistics').html(logistics);
                    //负责部门
                    $('.tanceng .ven_sell_quote_detail_dept').html(data['dept']);

                    if (data['steps'] && data['steps']['product_json']) {
                        //基本商品
                        var goodsHtml = '';
                        if (data['steps']['product_json']['goods']) {
                            $('.tanceng .ven_sell_quote_detail_goods_box').css('display', 'block');
                            var goodsArr = data['steps']['product_json']['goods']['goods'];
                            $.each(goodsArr, function (i, v) {
                                goodsHtml += '<tr>\
                                        <td class="noprint">' + l_dbl(i + 1) + '</td>\
                                        <td class="noprint">' + v['good_sn'] + '</td>\
                                        <td class="xs_print_name">' + v['good_name'] + '</td>\
                                        <td class="xs_print_sx">' + v['good_attr'] + '</td>\
                                        <td class="noprint">' + v['good_num'] + v['good_unit'] + '</td>\
                                        <td class="xs_bjd_td xs_goods_box xs_print_price" style="position: relative;padding:8px 10px;">\
                                            <div>\
                                            <span>￥' + v['good_price'] + '</span><i class="' + (v['up_down'] == 1 ? 'ven_warning_arrow_up' : 'ven_warning_arrow') + ' xs_goods_down_img" ' + (v['up_down'] == 0 ? 'style="display:none;"' : '') + '></i>\
                                            </div>\
                                            <div class="work_vent_client_contMsgBox" style="display: none;top: 4px;left: 94px">\
                                            <i class="work_vent_client_torr"></i>\
                                            <div class="work_vent_client_contMsgBoxDet fnc_output_ticket_total_remain_ticket_num_list">' + (v['up_down'] == 1 ? '高' : '低') + '于 ' + v['good_retail_price'] + '(零售价)</div>\
                                        </div>\
                                        </td>\
                                        <td class="none xs_print_sl">' + v['good_num'] + v['good_unit'] + '</td>\
                                        <td class="noprint">￥' + v['good_rate_price'] + '</td>\
                                        <td class="xs_print_total">￥' + v['good_total'] + '</td>\
                                        <td class="noprint"></td>\
                                        </tr>';
                            });
                        } else {
                            $('.tanceng .ven_sell_quote_detail_goods_box').css('display', 'none');
                        }
                        $('.tanceng .ven_sell_quote_detail_goods_list').html(goodsHtml);

                        //套餐商品
                        var packageHtml = '';
                        if (data['steps']['product_json']['package']) {
                            $('.tanceng .ven_sell_quote_detail_package_box').css('display', 'block');
                            var packageArr = data['steps']['product_json']['package']['package'];
                            $.each(packageArr, function (i, v) {
                                var packageGoods = '';
                                $.each(v['good_list'], function (i2, v2) {
                                    var packageGoodsInfo = '';
                                    $.each(v2['attr_list'], function (i3, v3) {
                                        packageGoodsInfo += '<tr class="xs_print_table">\
                                    <td class="noprint">' + v3['good_sn'] + '</td>\
                                    <td class="none xs_print_name">' + v2['title'] + '</td>\
                                    <td class="xs_print_sx">' + v3['good_attr'] + '</td>\
                                    <td class="xs_print_price none"></td>\
                                    <td class="xs_print_sl xs_print_package">' + v3['total_num'] + '</td>\
                                    <td class="xs_print_total none"></td>\
                                    <td class="noprint"></td>\
                                    </tr>'
                                    });
                                    packageGoods += '<table class="xs_bjd_table_1">\
                                    <thead class="noprint">\
                                    <tr style="background: #fff;">\
                                    <th class="c_3" style="font-weight: 100;">' + v2['title'] + '</th>\
                                    <th></th>\
                                    <th></th>\
                                    </tr>\
                                    <tr class="noprint">\
                                    <th width="127" class="noprint">编号</th>\
                                    <th class="xs_print_name none">名称</th>\
                                    <th width="853" class="xs_print_sx">属性</th>\
                                    <th width="90" class="xs_print_sl">数量</th>\
                                    <th width="60" class="noprint"></th>\
                                    </tr>\
                                    </thead>\
                                    <tbody>' + packageGoodsInfo + '</tbody>\
                                    </table>';
                                });
                                packageHtml += '<div class="xs_div_2"' + (i == 0 ? ' style="margin-top: 20px;"' : '') + '>\
                            <table class="xs_bjd_table xs_print_bjd_goods_table">\
                            <thead class="' + (i == 0 ? '' : 'none') + '">\
                            <tr class="noprint">\
                            <th width="30">序号</th>\
                            <th width="140">编号</th>\
                            <th width="150">名称</th>\
                            <th width="340">属性</th>\
                            <th width="50">数量</th>\
                            <th width="150">单价</th>\
                            <th width="90">税额</th>\
                            <th width="90">总价</th>\
                            <th width="60">配件</th>\
                            </tr>\
                            </thead>\
                            <tbody class="xs_print_bjd_goods_head">\
                            <tr class="c_3 xs_bjd_bold">\
                            <td width="30" class="noprint">' + l_dbl(i + 1) + '</td>\
                            <td width="140" class="noprint">' + v['package_sn'] + '</td>\
                            <td width="150" class="xs_print_name">' + v['package_name'] + '<span class="c_r none">（88折）</span></td>\
                            <td width="340" class="noprint">-</td>\
                            <td width="50" class="noprint">' + v['package_num'] + '</td>\
                            <td width="150" class="xs_bjd_td xs_goods_box noprint" style="position: relative;">\
                            <span>￥' + v['package_price'] + '</span>\
                            </td>\
                            <td width="90" class="noprint">￥' + v['package_rate_price'] + '</td>\
                            <td width="90" class="xs_print_total"> <span class="xs_bjd_old none">原价￥1230.00</span>\
                                    <br class="none">￥' + v['package_total'] + '</td>\
                            <td width="60" class="noprint">\
                            <button class="but_mix box_open_btn_1 but_blue_1">展开</button>\
                            </td>\
                            </tr>\
                            </tbody>\
                            </table>\
                            </div>\
                            <div class="xs_tc_goods_box goods_tc_toggle" style="display: none;">' + packageGoods + '</div>';
                            });
                            $('.tanceng .ven_sell_quote_detail_package_total').html(data['steps']['product_json']['package']['sum_total']);
                        } else {
                            $('.tanceng .ven_sell_quote_detail_package_box').css('display', 'none');
                        }

                        $('.tanceng .ven_sell_quote_detail_package_list').html(packageHtml);

                        //整机商品
                        var settingHtml = '';
                        if (data['steps']['product_json']['setting']) {
                            $('.tanceng .ven_sell_quote_detail_setting_box').css('display', 'block');
                            var settingArr = data['steps']['product_json']['setting']['setting'];
                            console.log(settingArr);
                            $.each(settingArr, function (i, v) {
                                var settingGoods = '';
                                if (v['optional'] == 1) {
                                    //可选配
                                    $.each(v['good_list'], function (i2, v2) {
                                        var settingGoodsInfo = '';
                                        /*$.each(v2['attr_list'], function (i3, v3) {
                                         settingGoodsInfo += '<tr class="">\
                                         <td width="140" class="noprint ">' + v3['good_sn'] + '</td>\
                                         <td width="150" class="none ">' + v2['title'] + '</td>\
                                         <td width="560" class="">' + v3['good_attr'] + '</td>\
                                         <td width="50" class="noprint ">' + v3['total_num'] + '</td>\
                                         <td width="150" class="">￥' + v3['good_price'] + '</td>\
                                         <td  width="50" class="none ">' + v3['total_num'] + '</td>\
                                         <td width="90" class="noprint ">￥' + v3['good_rate_price'] + '</td>\
                                         <td width="90" class="">￥' + v3['good_total'] + '</td>\
                                         <td width="60" class="noprint "></td>\
                                         </tr>';
                                         });*/

                                        $.each(v2['attr_list'], function (i3, v3) {
                                            settingGoodsInfo += '<tr class="xs_print_complete_a">\
                                        <td width="140" class="noprint">' + v3['good_sn'] + '</td>\
                                        <td width="150" class="none xs_print_name">' + v2['title'] + '</td>\
                                        <td width="560" class="xs_print_sx">' + v3['good_attr'] + '</td>\
                                        <td width="50" class="noprint">' + v3['total_num'] + '</td>\
                                        <td width="150" class="xs_print_price noprint">￥' + v3['good_price'] + '</td>\
                                        <td  width="50" class="none xs_print_sl noprint" style="text-align: right;">' + v3['total_num'] + '</td>\
                                        <td width="90" class="noprint">￥' + v3['good_rate_price'] + '</td>\
                                        <td width="90" class="xs_print_total none"></td>\
                                        <td width="90" class="xs_print_total noprint">￥' + v3['good_total'] + '</td>\
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
                                        <th width="90" class="noprint">税额</th>\
                                        <th width="90">总价</th>\
                                        <th width="60"></th>\
                                        </tr>\
                                        </thead>\
                                        <tbody>' + settingGoodsInfo + '</tbody>\
                                        </table>'
                                    })
                                } else {
                                    //不可选配
                                    $.each(v['good_list'], function (i2, v2) {
                                        var settingGoodsInfo = '';
                                        $.each(v2['attr_list'], function (i3, v3) {
                                            settingGoodsInfo += '<tr class="xs_print_complete_a">\
                                        <td class="noprint">' + v3['good_sn'] + '</td>\
                                        <td class="none xs_print_name">' + v2['title'] + '</td>\
                                        <td class="xs_print_sx">' + v3['good_attr'] + '</td>\
                                        <td class="none xs_print_price"></td>\
                                        <td class="xs_print_sl noprint">' + v3['total_num'] + '</td>\
                                        <td class="xs_print_total"></td>\
                                        </tr>';
                                        });
                                        settingGoods += '<table class="xs_bjd_table_1">\
                                        <thead>\
                                        <tr style="background: #fff;" class="noprint">\
                                        <th class="c_3" style="font-weight: 100;">' + v2['title'] + '</th>\
                                        <th></th>\
                                        <th></th>\
                                        </tr>\
                                        <tr class="noprint">\
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
                            <table class="xs_bjd_table xs_bjd_table xs_print_bjd_goods_table">\
                            <thead class="noprint">\
                            <tr class="noprint">\
                            <th width="30">序号</th>\
                            <th width="140">编号</th>\
                            <th width="150">名称</th>\
                            <th width="340">属性</th>\
                            <th width="50">数量</th>\
                            <th width="150">单价</th>\
                            <th width="90">税额</th>\
                            <th width="90">总价</th>\
                            <th width="60">配件</th>\
                            </tr>\
                            </thead>\
                            <tbody>\
                            <tr class="c_3 c_3 xs_bjd_bold xs_print_complete">\
                            <td width="30" class="noprint">' + l_dbl(i + 1) + '</td>\
                            <td width="140" class="noprint">' + v['setting_sn'] + '</td>\
                            <td width="150" class="xs_complete_name">' + v['setting_name'] + '' + (v['optional'] == 1 ? '（可选配）' : (v['optional'] == 2 ? '（不可选配）' : '')) + '</td>\
                            <td width="340" class="noprint">' + v['setting_attr'] + '</td>\
                            <td width="50" class="noprint">' + v['setting_num'] + '</td>\
                            <td width="150" class="xs_bjd_td xs_goods_box xs_complete_price" style="position: relative;">\
                            <div>\
                            <span>￥' + v['setting_price'] + '</span><i class="' + (v['up_down'] == 1 ? 'ven_warning_arrow_up' : 'ven_warning_arrow') + ' xs_goods_down_img ' + (v['up_down'] == 0 ? 'none' : '') + '"></i>\
                            </div>\
                            <div class="work_vent_client_contMsgBox" style="display: none;top: 3px;left: 94px">\
                            <i class="work_vent_client_torr"></i>\
                            <div class="work_vent_client_contMsgBoxDet fnc_output_ticket_total_remain_ticket_num_list" style="font-weight: 100;">' + (v['up_down'] == 1 ? '高' : '低') + '于 ' + v['setting_retail_price'] + '(零售价)</div>\
                            </div>\
                            </td>\
                            <td width="50" class="xs_complete_sl none noprint">' + v['setting_num'] + '</td>\
                            <td width="90" class="noprint">￥' + v['setting_rate_price'] + '</td>\
                            <td width="90" class="xs_complete_total noprint">￥' + v['setting_total'] + '</td>\
                            <td width="60" class="noprint">\
                            <button class="but_mix box_open_btn_1 but_blue_1">展开</button>\
                            </td>\
                            </tr>\
                            </tbody>\
                            </table>\
                            </div>\
                            <div class="xs_tc_goods_box goods_tc_toggle" style="display: none;">' + settingGoods + '</div>';
                            });
                            $('.tanceng .ven_sell_quote_detail_setting_total').html(data['steps']['product_json']['setting']['sum_total']);
                        } else {
                            $('.tanceng .ven_sell_quote_detail_setting_box').css('display', 'none');
                        }

                        $('.tanceng .ven_sell_quote_detail_setting_list').html(settingHtml);

                        //单价合计
                        $('.tanceng .ven_sell_quote_detail_money_sum').html(data['steps']['product_json']['money_sum']);

                        //合计税额
                        $('.tanceng .ven_sell_quote_detail_tax_money_sum').html(data['steps']['product_json']['tax_money_sum']);

                        //其他费用
                        $('.tanceng .ven_sell_quote_detail_other_free').html(data['steps']['product_json']['other_free']);

                        //总计金额
                        $('.tanceng .ven_sell_quote_detail_totals').html(data['steps']['product_json']['totals']);

                        //备注
                        $('.tanceng .ven_sell_quote_detail_note').html(data['steps']['product_json']['note']);
                    }
                    //税率
                    if (data['tax_rate'] == 0) {
                        $('.tanceng .ven_sell_quote_tax_rate_print').html('0%');
                    } else if (data['tax_rate'] == 1) {
                        $('.tanceng .ven_sell_quote_tax_rate_print').html('17%');
                    }
                }
            },
            error: function (e) {
                alert(e.msg);
            }
        });
    }

    //审批参数
    var sellQuoteCheckData = {
        token: token,
        check_type: '',
        quote_id: '',
        note: ''
    };
    //审批操作
    $('.ven_sell_quote_check_btn').die('click').live('click', function () {
        sellQuoteCurrentId = $(this).closest('tr').attr('vensellquoteid');
        sellQuoteCheckData.quote_id = sellQuoteCurrentId;
        sellQuoteDetailFn(sellQuoteCurrentId);
    });
    //审批操作 - 拒绝
    $('.ven_sell_quote_check_btn_refuse').die('click').live('click', function () {
        sellQuoteCheckData.quote_id = sellQuoteCurrentId;
        sellQuoteCheckData.check_type = 2;
    });
    //审批操作 - 通过
    $('.ven_sell_quote_check_btn_pass').die('click').live('click', function () {
        sellQuoteCheckData.quote_id = sellQuoteCurrentId;
        sellQuoteCheckData.check_type = 1;
    });
    //审批提交
    $('.tanceng .ven_sell_quote_check_submit_btn').die('click').live('click', function () {
        if ($('.tanceng .ven_sell_quote_check_note_textarea').val() == '请输入审批意见') {
            sellQuoteCheckData.note = '';
        } else {
            sellQuoteCheckData.note = $('.tanceng .ven_sell_quote_check_note_textarea').val();
        }
        $.ajax({
            url: SERVER_URL + '/quote/check',
            type: 'POST',
            data: sellQuoteCheckData,
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                if (oE.code == 0) {
                    alert('操作成功');
                    $('.tanceng').css('display', ' none').find('div').remove();
                    $('.right_sidebar_h').trigger('click');
                    getSellQuoteList('/quote/list');
                } else {
                    alert(oE.msg);
                }
            }
        });
    });

    //新建报价单参数
    var sellQuoteCreateData = {
        token: token,
        quote_id: 0,//报价单id,有值为修改
        code_sn: "",//编号
        account_id: '',
        lend_id: '', // 借出单id
        customer_id: '',//客户id
        customer_name: '',  // 客户名称
        is_draft: '',//是否草稿,0不是1是
        tax_rate: '', // 含税状态  1 17%  0  无税
        is_freight: '',//运费承担 0 不包 1包运费
        logistics_type: '', //物流方式
        flow: '',  //审批流程
        goods: '',
        package: '',
        setting: '',
        money_sum: '', //单价合计
        tax_money_sum: '', //合计税额
        other_free: '', //其它费用
        totals: '',//总计金额
        to_type: 0,//到货方式0无 1到门 2到站
        owner_name: '',//负责人名字
        owner_id: '',//负责人id
        dept_name: '',//部门名称
        dept_id: '',//部门id
        note: "",//备注
        ctr_type: "",//控货方式1不控 2控货
        expiry_day: ""//有效期
    };

    //初始化商品数组
    var aSellQuoteCreateGoodsChosen = [];
    var aSellQuoteCreatePackageChosen = [];
    var aSellQuoteCreateSettingChosen = [];

    //审批步骤顺序数组
    var flowOrderArr = ['步骤一', '步骤二', '步骤三', '步骤四', '步骤五', '步骤六', '步骤七'];
    //新建报价单
    $('#ven_sell_quote_create_btn').die('click').live('click', function () {
        sellQuoteCreateData = {
            token: token,
            quote_id: 0,//报价单id,有值为修改
            code_sn: "",//编号
            account_id: '',
            lend_id: '', // 借出单id
            customer_id: '',//客户id
            customer_name: '',  // 客户名称
            is_draft: '',//是否草稿,0不是1是
            tax_rate: '', // 含税状态  1 17%  0  无税
            is_freight: '',//运费承担 0 不包 1包运费
            logistics_type: '', //物流方式
            flow: '',  //审批流程
            goods: '',
            package: '',
            setting: '',
            money_sum: '', //单价合计
            tax_money_sum: '', //合计税额
            other_free: '', //其它费用
            totals: '',//总计金额
            to_type: 0,//到货方式0无 1到门 2到站
            owner_name: uname,//负责人名字
            owner_id: uid,//负责人id
            dept_name: deptName,//部门名称
            dept_id: deptid,//部门id
            note: "",//备注
            ctr_type: "",//控货方式1不控 2控货
            expiry_day: ""//有效期
        };
        //报价人
        $('.tanceng .ven_sell_quote_create_uname').val(uname);
        //负责部门
        $('.tanceng .ven_sell_quote_create_dept').val(deptName);
        //创建时间
        $('.tanceng .ven_sell_quote_create_time').html(getCurrentDateShort());
        //编号
        $('.tanceng .ven_sell_quote_create_code').val(likGetCodeFn('XBJ'));
        //清空审批人数组
        flowChosenArr = [];

        //系统设置中的审批人
        $.ajax({
            url: SERVER_URL + '/approval/person',
            type: 'GET',
            data: {
                token: token,
                thetype: 1,
                category: 1
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
                    $('.ven_sell_quote_create_flow_list').html(copyList);
                }
            },
            error: function (e) {
                alert(e.msg);
                console.log(e);
            }
        });
        //清空商品数组
        aSellQuoteCreateGoodsChosen = [];
        aSellQuoteCreatePackageChosen = [];
        aSellQuoteCreateSettingChosen = [];

        //页面样式
        //$('.tanceng .xsbjd_new_inputbox').css('width', '100%');

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
        key_search: '', // 关键字
        uid: uid, // 用户id
        company_id: comid, // 公司id
        is_invalid: 1, // 0显示所有，1为不显示作废
        approval_status: 2
    };
    // 新建报价单 - 获取借出单列表
    function getSellQuoteChooseLendList() {
        $.ajax({
            url: SERVER_URL + '/lend/list',
            type: 'POST',
            data: sellQuoteChooseLendData,
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                if (oE.code == 0) {
                    $('.tanceng .ven_sell_quote_create_choose_lend_total').html(oE.total_num);
                    //获取datalist
                    var datalist = oE.data;
                    //搜索总条数
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
                        sellLendHtml += '<tr selllendid="' + v['id'] + '" selllendcustomerid="' + v['supplier_id'] + '" selllendcustomername="' + v['supplier_name'] + '">\
                                            <td><input type="radio" ' + (i == 0 ? 'checked' : '') + ' name="xs_bjd_xzxsdd"></td>\
                                            <td>' + likNullData(v['code_sn']) + '</td>\
                                            <td>' + likNullData(v['supplier_name']) + '</td>\
                                            <td>' + likNullData(v['expect_return_time'].split(' ')[0]) + '</td>\
                                            <td>' + likNullData(v['create_time'].split(' ')[0]) + '</td>\
                                            <td>' + likNullData(v['all_money']) + '</td>\
                                            <td>' + likNullData(v['guihuan']) + '</td>\
                                         </tr>'
                    });
                    //借出单数据渲染
                    $('.tanceng .ven_sell_quote_create_choose_lend_list').html(sellLendHtml);
                }
                //分页
                list_table_render_pagination('.ven_sell_quote_create_choose_lend_all_page', sellQuoteChooseLendData, getSellQuoteChooseLendList, oE.total_num, datalist.length);
            }
        });
    }

    //新建报价单 - 借出单 - 搜索关键字
    $('.tanceng .ven_sell_quote_create_choose_lend_search_btn').die('click').live('click', function () {
        if ($('.tanceng .ven_sell_quote_create_choose_lend_search_inp').val() == '搜索借出单编号') {
            sellQuoteChooseLendData.key_search = '';
        } else {
            sellQuoteChooseLendData.key_search = $('.tanceng .ven_sell_quote_create_choose_lend_search_inp').val();
        }
        getSellQuoteChooseLendList();
    });
    //新建报价单 - 选择借出单 - 保存
    $('.tanceng .ven_sell_quote_create_choose_lend_save').die('click').live('click', function () {
        var sellQuoteLendChosen = null;
        $.each($('.tanceng .ven_sell_quote_create_choose_lend_list tr'), function (i, v) {
            if ($('.tanceng .ven_sell_quote_create_choose_lend_list tr').eq(i).find('input:radio').is(':checked')) {
                sellQuoteLendChosen = {
                    'title': $('.tanceng .ven_sell_quote_create_choose_lend_list tr').eq(i).attr('selllendid'),
                    'val': $('.tanceng .ven_sell_quote_create_choose_lend_list tr').eq(i).find('td').eq(1).text(),
                    'cusid': $('.tanceng .ven_sell_quote_create_choose_lend_list tr').eq(i).attr('selllendcustomerid'),
                    'cusname': $('.tanceng .ven_sell_quote_create_choose_lend_list tr').eq(i).attr('selllendcustomername')
                }
            }
        });
        //新建销售报价单用
        $('.tanceng .ven_sell_quote_create_choose_lend_inp').val(sellQuoteLendChosen['val']).css('color', '#333');
        $('.tanceng .ven_sell_quote_create_choose_customer_inp').val(sellQuoteLendChosen['cusname']).css('color', '#333');
        sellQuoteCreateData.lend_id = sellQuoteLendChosen['title'];
        sellQuoteCreateData.customer_id = sellQuoteLendChosen['cusid'];
        sellQuoteCreateData.customer_name = sellQuoteLendChosen['cusname'];
        $('.tanceng .ven_sell_quote_create_choose_chance_btn').css('display', 'none').prev().css('background', '#f5f5f5');
        $('.tanceng .ven_sell_quote_create_choose_customer_btn').css('display', 'none').css('background', '#f5f5f5');
        $(this).closest('.dialog_box').remove();
        $(".tanceng .page36_newxsbjd").width(1100);
        $(".tanceng .page36_newxsbjd").height('90%');
        $(".tanceng .page36_newxsbjd").find(".xsbjd_new_inputbox").css({'width': '50%'});
        $('.tanceng .xs_xsbjd_hr1').hide();
        $(".tanceng .xs_xsbjd_sp_box").css({
            'padding': '0 10px',
            'background': '#f7f7f7',
            'margin': '0 -40px',
            'border': '1px solid #e6e6e6'
        });
        $('.tanceng .xs_xsbjd_bjd_box').css('margin', '10px 0');
        getLendDetailFn(sellQuoteCreateData.lend_id);
    });

    //借出单详情函数
    function getLendDetailFn(lendId) {
        $.ajax({
            url: SERVER_URL + '/lend/look-lend',
            type: 'POST',
            data: {
                token: token,
                id: lendId
            },
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                var data = oE.data;
                $('.tanceng .page_108_shdSP').removeClass('none');
                //基本商品
                var goodsHtml = '';
                if (data['goods'] && data['goods']['goods'].length > 0) {
                    $('.tanceng .xs_xsbjd_box_ul ul li:nth-of-type(1)').css('display', 'inline-block').css({
                        'background': '#32a0f6',
                        'borderColor': '#32a0f6',
                        'color': '#fff'
                    }).find('i').css({
                        'background': 'url(static/images/close_1.png) no-repeat',
                        'backgroundSize': '100%'
                    });
                    goodsHtml += '<div class="container">\
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
                        <th width="30">税率</th>\
                        <th width="85">税额(元)</th>\
                    <th width="85">总价(元)</th>\
                        </tr>\
                        </thead>\
                        <tbody class="ven_sell_quote_create_chosen_goods_tbody">';
                    $.each(data['goods']['goods'], function (i, v) {
                        var goodsAttr = v['good_attr'].split(',');
                        var goodsAttrHtml = '';
                        $.each(goodsAttr, function (i2, v2) {
                            goodsAttrHtml += v2.split('&')[1] + '/';
                        });
                        goodsAttrHtml = goodsAttrHtml.slice(0, goodsAttrHtml.length - 1);
                        goodsHtml += '<tr goodsid="' + v['good_id'] + '" lik_up_down_type="0">\
                            <td class="sell_quote_create_choose_goods_order">' + l_dbl(i + 1) + '</td>\
                            <td class="xs_f_color sell_quote_create_choose_goods_name">' + v['good_name'] + '</td>\
                            <td>' + v['good_sn'] + '</td>\
                            <td>' + goodsAttrHtml + '</td>\
                        <td>' + v['good_unit'] + '</td>\
                        <td>\
                        <div class="xs_num_input num_input inline_block num_input_new">\
                            <button class="but_grey_a but_opa_small inp_plus ven_sell_quote_productnum_change">+</button><input type="text" class="lik_input_number productnum sell_quote_num_check" maxnum="' + (v['good_num'] - v['return_num']) + '" value="0"><button class="but_grey_a but_opa_small radius_left_0 inp_reduce ven_sell_quote_productnum_change">-</button>\
                            </div>\
                            </td>\
                            <td class="xs_goods_box" style="position: relative;">\
                            <div class="xs_goods_big_box">\
                            <div class="inline_block select_100"><input type="text" class="sell_quote_num_check lik_input_number c_3 time_input xs_bjd_inp xs_xsbjd_inp_60 product_reference_price ven_sell_quote_goods_cost_one" value="' + v['good_price'] + '" style="color: rgb(153, 153, 153);margin-right: 10px;">\
                            </div>\
                            </div>\
                        </td>\
                        <td><span class="ven_sell_quote_goods_tax_one c_y">' + v['good_rate'] + '</span></td>\
                            <td><span class="ven_sell_quote_goods_tax_total">' + v['good_rate_price'] + '</span></td>\
                            <td><span class="ven_sell_quote_goods_cost_total">' + v['good_total'] + '</span>\
                            </td>\
                            </tr>';
                    });
                    goodsHtml += '</tbody>\
                         <tbody>\
                        <tr class="table_total">\
                        <td>合计</td>\
                        <td></td>\
                        <td></td>\
                        <td></td>\
                        <td></td>\
                        <td class="goods_num_total">0</td>\
                        <td></td>\
                        <td></td>\
                        <td><input type="hidden" value="0" class="goods_tax_total"></td>\
                        <td><span class="goods_cost_total">0</span></td>\
                        </tr>\
                        </tbody>\
                        </table>\
                        </div>\
                        </div>';
                    $('.tanceng .ven_quote_create_link_lend_goods').removeClass('none').html(goodsHtml);
                } else if (data['setting'] && data['setting'].length > 0) {
                    $('.tanceng .xs_xsbjd_box_ul ul li:nth-of-type(3)').css('display', 'inline-block').css({
                        'background': '#32a0f6',
                        'borderColor': '#32a0f6',
                        'color': '#fff'
                    }).find('i').css({
                        'background': 'url(static/images/close_1.png) no-repeat',
                        'backgroundSize': '100%'
                    });
                    $('.tanceng .ven_quote_create_link_lend_setting').removeClass('none');
                } else {
                    $('.tanceng .xs_xsbjd_box_ul ul li:nth-of-type(1)').css('display', 'none');
                    $('.tanceng .xs_xsbjd_box_ul ul li:nth-of-type(3)').css('display', 'none');
                }
                //整机商品
                var settingHtml = '';
                console.log(data['setting']);
                if (data['setting'] && data['setting'].length > 0) {
                    $('.tanceng .xs_xsbjd_box_ul ul li:nth-of-type(3)').css('display', 'inline-block');
                    settingHtml += '<div class="ven_sell_quote_create_choose_setting_box_list">';
                    $.each(data['setting'], function (i, v) {
                        if (v['num'] > v['return_num']) {
                            var settingGoods = '';
                            if (v['good_list']) {
                                $.each(v['good_list'], function (i2, v2) {
                                    var attrList = '';
                                    $.each(v2['attr_list'], function (i3, v3) {
                                        var goodAttrHtml = '';
                                        var good_attr = v3['good_attr'].split(',');
                                        $.each(good_attr, function (i4, v4) {
                                            goodAttrHtml += v4.split('&')[1] + '/'
                                        });
                                        goodAttrHtml = goodAttrHtml.slice(0, goodAttrHtml.length - 1);
                                        attrList += '<tr settinggoodsid="' + v3['good_id'] + '">\
                                                <td>' + v3['good_sn'] + '</td>\
                                                <td>' + goodAttrHtml + '</td>\
                                                <td>' + v3['sing_num'] + '</td>\
                                                <td class="ven_sell_quote_create_setting_goods_bkxp_one_num_toal">0</td>\
                                                </tr>'
                                    });
                                    settingGoods += '<div class="sell_quote_create_setting_goods_list" optionaltype="">\
                                                <p class="box_open_head" style="background: rgb(255, 255, 255); border-radius: 3px;">\
                                                <span>' + v2['title'] + '</span></p>\
                                                <div class="container">\
                                                <div class="table-container">\
                                                <table>\
                                                <thead>\
                                                <tr>\
                                                <th width="200">商品编号</th>\
                                                <th width="350">属性</th>\
                                                <th width="200">单个整机数量</th>\
                                                <th width="200">总数</th>\
                                                </tr>\
                                                </thead>\
                                                <tbody>\
                                                ' + attrList + '\
                                                <tr class="table_total">\
                                                <td>合计</td>\
                                                <td></td>\
                                                <td><input type="hidden" value="0"></td>\
                                                <td class="c_3">小计：<span class="ven_sell_quote_create_setting_goods_bkxp_num_total c_r">0</span>\
                                                </td>\
                                                </tr>\
                                                </tbody>\
                                                </table>\
                                                </div>\
                                                </div>\
                                                </div>'
                                });
                            }
                            settingHtml += '<div class="ven_sell_quote_create_choose_setting_one_box_list" settingid="' + v['goods_id'] + '" optionaltype="">\
                        <div class="container">\
                        <div class="table-container">\
                        <table>\
                        <thead class="' + (i == 0 ? '' : 'none') + '">\
                        <tr>\
                        <th width="32">序号</th>\
                        <th width="100">整机商品名称</th>\
                        <th width="120">整机商品编号</th>\
                        <th width="56">基本单位</th>\
                        <th width="238">属性</th>\
                        <th width="85">数量</th>\
                        <th width="130">单价</th>\
                        <th width="30">税率(%)</th>\
                    <th width="85">税额(元)</th>\
                        <th width="85">总价(元)</th>\
                        </tr>\
                        </thead>\
                        <tbody>\
                        <tr settingid="' + v['goods_id'] + '">\
                        <td width="32">' + l_dbl(i + 1) + '</td>\
                        <td width="100" class="f_color xs_xsbjs_td">' + v['good_name'] + '</td>\
                    <td width="120">' + v['good_sn'] + '</td>\
                        <td width="56">' + v['good_unit'] + '</td>\
                        <td width="238">' + v['good_attr'] + '</td>\
                    <td width="85">\
                        <div class="xs_num_input num_input inline_block num_input_new">\
                        <button class="but_blue but_opa_small inp_plus ven_sell_quote_create_setting_bkxp_parent_num_change_btn">+</button><input class="lik_input_number ven_sell_quote_create_setting_bkxp_parent_num_inp" maxnum="' + (v['num'] - v['return_num']) + '" type="text" value="0" style="border:1px solid #23a2f3;"><button class="but_blue but_opa_small radius_left_0 inp_reduce ven_sell_quote_create_setting_bkxp_parent_num_change_btn">-</button>\
                        </div>\
                        </td>\
                        <td width="130" class="xs_goods_box" style="position: relative;">\
                        <div class="xs_goods_big_box">\
                        <div class="inline_block select_100" style="color: rgb(51, 51, 51);"><input type="text" class="sell_quote_num_check time_input lik_input_number xs_bjd_inp xs_bjd_inp_1 xs_xsbjd_inp_60 sell_quote_create_setting_cost_one_change" value="' + v['price'] + '" style="color: rgb(153, 153, 153);margin-right: 10px;">\
                        </div>\
                        </div>\
                        </td>\
                        <td width="30" class="c_y">' + v['containing_rate'] + '</td>\
                        <td width="85" class="ven_sell_quote_create_setting_parent_one_cost_hsj">' + v['containing_money'] + '</td>\
                        <td width="85" class="ven_sell_quote_create_setting_parent_one_cost_total">0</td>\
                        </tr>\
                        </tbody>\
                        </table>\
                        </div>\
                        </div>\
                        <div class="xs_xsbjd_table_t2">\
                        <div class="table_t2" style="position: relative;"><span class="cont_title" style="border-left: 4px solid #23a2f3;padding-left: 10px;margin-left: 0;">配件内容</span><span class="box_open_btn" style="right: 13px;">收起 <i class="right icon_show"></i></span></div>\
                        <div class="box_open_list goods_tc_toggle" style="">\
                        ' + settingGoods + '</div>\
                        </div>\
                        </div>';
                        }
                    });
                    settingHtml += '</div>\
                        <div class="container">\
                        <div class="table-container">\
                        <table>\
                        <thead class="ven_sell_quote_choose_setting_hj_head">\
                        </thead>\
                        <tbody>\
                        <tr class="table_total" style="border-top:1px solid #e6e6e6;">\
                        <td width="30">合计</td>\
                        <td width="125"></td>\
                        <td width="120"></td>\
                        <td width="60"></td>\
                        <td width="195"></td>\
                        <td width="110" class="sell_quote_create_setting_num_total_hj">0</td>\
                        <td width="130"></td>\
                        <td width="30"></td>\
                        <td width="85"></td>\
                        <td width="55" class="sell_quote_create_setting_cost_total_hj">0</td>\
                        <td width="70"></td>\
                        </tr>\
                        </tbody>\
                        </table>\
                        </div>\
                        </div>';
                    $('.tanceng .ven_quote_create_link_lend_setting').html(settingHtml);
                }
                //其他费用
                $('.tanceng .sell_quote_create_other_fee').val(data['other_costs']);
                $('.tanceng .productnum').trigger('keyup');
            },
            error: function (e) {
                alert(e.msg);
                console.log(e);
            }
        });
    }

    //新建报价单 - 选择客户
    $('.tanceng .ven_sell_quote_create_choose_customer_btn').die('click').live('click', function () {
        getCusListSort();
        getCusList();
        xs_kh_gjss_xlk();
    });
    // 客户>分类列表展示
    function getCusListSort() {
        $.ajax({
            url: SERVER_URL + '/customer/arealist',
            type: 'GET',
            data: {
                token: token
            },
            dataType: 'json',
            success: function (oE) {
                $('i.ven_cus_area_total').html(oE.count);
                var datalist = oE.datalist;
                var deep = 0;
                $('.tanceng .ven_sell_quote_create_choose_cus_area_sort_list').html(tree_list_close(datalist, deep));
                // 下级分类图标样式控制
                for (var i = 0; i < $('i.ven_sell_quote_create_choose_cus_area_sort_list li').length; i++) {
                    if ($('i.ven_sell_quote_create_choose_cus_area_sort_list li').eq(i).next('ul').children().length == 0) {
                        $('i.ven_sell_quote_create_choose_cus_area_sort_list li').eq(i).prev('i').remove();
                        //$('i.ven_sell_quote_create_choose_cus_area_sort_list li').eq(i).parent('ul').addClass('oth')
                    }
                }
            },
            error: function (e) {
                alert(e.msg);
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
            success: function (e) {
                console.log(e);
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
                        // 客户联系人名字
                        var con1 = '';
                        // 客户联系人详细信息
                        var con2 = '';
                        if (cuslist[i].contacts) {
                            // 客户联系人名字
                            con1 = '';
                            // 客户联系人详细信息
                            con2 = '';
                            for (var j = 0; j < cuslist[i].contacts.length; j++) {
                                con1 += cuslist[i].contacts[j].name + '、';
                                con2 += '<div class="vent_client_contMsgBoxDet"><h3 class="cont_title">' + cuslist[i].contacts[j].name + '</h3><ul><li>职务：' + cuslist[i].contacts[j].job + '</li><li>电话：' + cuslist[i].contacts[j].tel + '</li><li>邮箱：' + cuslist[i].contacts[j].email + '</li></ul></div>'
                            }
                            con1 = con1.substring(0, con1.length - 1);
                        }
                        var cusSort = '',
                            cusBtnClass = '',
                            cusContactClass = '';
                        oCuslist += '<tr class="' + cusSta + '" cusid="' + cuslist[i].id + '" cusname="' + likNullData(cuslist[i].name) + '"><td><input type="radio" name="222" ' + (i == 0 ? 'checked' : '') + '></td><td>' + likNullData(cuslist[i].code_sn) + '</td><td>' + likNullData(cuslist[i].name) + '</td><td>' + likNullData(cuslist[i].tel) + '</td><td>' + likNullData(cuslist[i].grade_name) + '</td><td>' + likNullData(cuslist[i].industry_big_name) + '</td><td>' + likNullData(cuslist[i].comefrom_name) + '</td><td class="f_color ' + cusContactClass + '">' + con1 + '<div class="vent_client_contMsgBox" style="display: none;z-index:99;"><i class="vent_client_torr"></i>' + con2 + '</div></td><td>' + likNullData(cuslist[i].note) + '</td></tr>'
                    }
                    $('.tanceng .ven_sell_quote_choose_cus_list').html(oCuslist);
                    list_table_render_pagination('.tanceng .page_ven31_cuslist', getCusListData, getCusList, e.totalcount, cuslist.length)
                }
            }
        })
    }

    //选择分类获取客户
    $('.tanceng .ven_sell_quote_create_choose_customer_sort li').die('click').live('click', function () {
        getCusListData.id = $(this).attr('cussortid');
        getCusList();
    });
    // 搜索关键字
    $('.tanceng .ven_sell_chance_choose_customer_search_btn').die('click').live('click', function () {
        if ($('.tanceng .ven_sell_chance_choose_customer_search_inp').val() == '搜索客户编号/客户名称') {
            getCusListData.key = ''
        } else {
            getCusListData.key = $('.tanceng .ven_sell_chance_choose_customer_search_inp').val()
        }
        getCusList()
    });
    //搜索行业
    $('.tanceng .ven_sell_chance_create_choose_customer_industry_list li').die('click').live('click', function () {
        getCusListData.industry_big_id = $(this).attr('industryid');
        getCusList()
    });
    //搜索客户级别
    $('.tanceng .ven_sell_chance_create_choose_customer_grade_list li').die('click').live('click', function () {
        getCusListData.grade = $(this).index();
        getCusList();
    });
    //搜索客户来源
    $('.tanceng .ven_sell_quote_create_choose_customer_come_from_list li').die('click').live('click', function () {
        getCusListData.comefrom = $(this).index();
        getCusList();
    });

    // 客户>高级搜索>控制下拉框
    function xs_kh_gjss_xlk() {
        $.ajax({
            url: SERVER_URL + '/customer/list',
            type: 'GET',
            data: {
                token: token
            },
            dataType: 'json',
            success: function (e) {
                if (e.code == 0) {
                    var cuslist = e.datalist;
                    // 高级搜索
                    var xs_kh_hy = '<li industryid="">无</li>';
                    // 高级搜索数组
                    var xs_kh_hy_array = [];
                    $.each(cuslist, function (i, v) {
                        xs_kh_hy_array.push({'title': v['industry_big_id'], 'val': v['industry_big_name']})
                    });
                    var newCustomListIndustry = getJsonArr(xs_kh_hy_array);
                    // 行业下拉框数据循环
                    $.each(newCustomListIndustry, function (i, v) {
                        if (v['val'] == null) return true;
                        xs_kh_hy += '<li industryid="' + v['title'] + '">' + v['val'] + '</li>'
                    })
                    // 行业下拉框插入数据
                    $('.tanceng .ven_sell_chance_create_choose_customer_industry_list').html(xs_kh_hy)
                }
            }
        })
    }

    //选择客户
    $('.tanceng .ven_sell_quote_create_choose_customer_save').die('click').live('click', function () {
        var sellQuoteCreateCusChosen = null;
        $.each($('.tanceng .ven_sell_quote_choose_cus_list tr'), function (i, v) {
            if ($('.tanceng .ven_sell_quote_choose_cus_list tr').eq(i).find('input:radio').is(':checked')) {
                sellQuoteCreateCusChosen = {
                    'val': $('.tanceng .ven_sell_quote_choose_cus_list tr').eq(i).find('td').eq(2).text(),
                    'cusid': $('.tanceng .ven_sell_quote_choose_cus_list tr').eq(i).attr('cusid'),
                    'cusname': $('.tanceng .ven_sell_quote_choose_cus_list tr').eq(i).attr('cusname')
                };
            }
        });
        //新建销售报价单用
        $('.tanceng .ven_sell_quote_create_choose_customer_inp').val(sellQuoteCreateCusChosen['val']).css('color', '#333');
        $('.tanceng .ven_sell_quote_create_choose_customer_credit').html(sellQuoteCreateCusChosen['cuscredit']);
        sellQuoteCreateData.customer_id = sellQuoteCreateCusChosen['cusid'];
        sellQuoteCreateData.customer_name = sellQuoteCreateCusChosen['cusname'];
        $('.tanceng .ven_sell_quote_create_choose_chance_btn').css('display', 'none').prev().css('background', '#f5f5f5');
        $('.tanceng .ven_sell_quote_create_choose_lend_btn').css('display', 'none').prev().val('请选择借出单').css('background', '#f5f5f5');

        /*//编辑销售报价单用
         $('.tanceng .ven_sell_quote_edit_choose_customer_inp').val(sellQuoteCreateCusChosen['val']);
         $('.tanceng .ven_sell_quote_edit_choose_customer_credit').html(sellQuoteCreateCusChosen['cuscredit']);
         sellQuoteCreateData.customer_id = sellQuoteCreateCusChosen['cusid'];
         $('.tanceng .ven_sell_quote_edit_choose_chance_btn').css('display', 'none').prev().css('background', '#f5f5f5');
         $('.tanceng .ven_sell_quote_edit_choose_lend_btn').css('display', 'none').prev().css('background', '#f5f5f5');*/
        $(this).closest('.dialog_box').remove();
    });

    //新建报价单 - 选择账户
    $('.tanceng .ven_sell_quote_create_choose_account').die('click').live('click', function () {
        $.ajax({
            url: SERVER_URL + '/company/list',
            type: 'GET',
            data: {token: token},
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                var accountHtml = '';
                $.each(oE.data.dataList, function (i, v) {
                    accountHtml += '<li accountid="' + v['id'] + '">' + v['company_account_name'] + '</li>'
                });
                $('.tanceng .ven_sell_quote_create_choose_account_ul').html(accountHtml);
            },
            error: function (e) {
                alert(e.msg);
                console.log(e);
            }
        });
    });
    $('.tanceng .ven_sell_quote_create_choose_account_ul li').die('click').live('click', function () {
        sellQuoteCreateData.account_id = $(this).attr('accountid');
    });
    //选择物流方式
    $('.tanceng .ven_sell_quote_create_logistics_list li').die('click').live('click', function () {
        sellQuoteCreateData.logistics_type = $(this).index() + 1;
        if ($(this).text() == '自提') {
            $('.tanceng .ven_sell_quote_create_choose_to_type_inp').attr('disabled', true).val('无').css({
                'color': '#ccc',
                'width': '90%'
            }).parent().removeClass('select_mormal');
            sellQuoteCreateData.to_type = 0;
        } else {
            $('.tanceng .ven_sell_quote_create_choose_to_type_inp').attr('disabled', false).val('无').css({
                'color': '#ccc',
                'width': ''
            }).parent().addClass('select_mormal');
        }
    });
    //选择到货方式
    $('.tanceng .ven_sell_quote_create_to_type_list  li').die('click').live('click', function () {
        sellQuoteCreateData.to_type = $(this).index();
    });

    /*//选择负责人
     $('.tanceng .ven_sell_quote_create_choose_owner_btn').die('click').live('click', function () {
     venCustomCreateChooseOwnerFn();
     //选择负责人
     /!*$('.tanceng .person_left_nav').die('click').live('click', function () {
     //新建
     sellQuoteCreateData.owner = $(this).attr('userinfoid');
     sellQuoteCreateData.dept = $(this).parent('ul').prev('li').attr('cussortid');
     //编辑
     sellQuoteCreateData.owner = $(this).attr('userinfoid');
     sellQuoteCreateData.dept = $(this).parent('ul').prev('li').attr('cussortid');
     });*!/
     //选择负责人确认
     $('.tanceng .after_order_create_choose_owner_save').die('click').live('click', function () {
     //新建
     sellQuoteCreateData.owner = $('.tanceng .list_check').closest('li').attr('userinfoid');
     sellQuoteCreateData.dept = $('.tanceng .list_check').closest('ul.ul3').prev('.left_1').attr('cussortid');
     $('.tanceng .ven_sell_quote_create_choose_owner_inp').val($('.tanceng .list_check').closest('li').find('.list_msg').html());
     //编辑
     sellQuoteCreateData.owner = $('.tanceng .list_check').closest('li').attr('userinfoid');
     sellQuoteCreateData.dept = $('.tanceng .list_check').closest('ul.ul3').prev('.left_1').attr('cussortid');
     $('.tanceng .ven_sell_quote_edit_choose_owner_inp').val($('.tanceng .list_check').closest('li').find('.list_msg').html());
     $(this).closest('.dialog_box').remove();
     })
     });*/

    //选择审批人
    //已选审批人数组
    var flowChosenArr = [];
    $('.tanceng .ven_sell_quote_create_choose_flow_btn').die('click').live('click', function () {
        venCustomCreateChooseOwnerFn();
        //选择审批人确认
        $('.tanceng .ven_sell_quote_create_choose_flow_save').die('click').live('click', function () {
            if ($.inArray($('.tanceng .list_check').closest('li').attr('userinfoid'), flowChosenArr) == -1) {
                flowChosenArr.push($('.tanceng .list_check').closest('li').attr('userinfoid'));
                $('.tanceng .ven_sell_quote_create_flow_list .ven_sell_quote_create_flow_list_add_btn').before('<li flowid="' + $('.tanceng .list_check').closest('li').attr('userinfoid') + '"><em class="icon_personBtn icon_personBtn_msg"><i class="icon_personNext"></i></em><em class="icon_adderBtn"></em><p class="box_adderName">' + $('.tanceng .list_check').closest('li').find('.list_msg').html() + '</p><p class="box_addermsg"></p></li>');
                $('.tanceng .ven_sell_quote_edit_flow_list .ven_sell_quote_edit_flow_list_add_btn').before('<li flowid="' + $('.tanceng .list_check').closest('li').attr('userinfoid') + '"><em class="icon_personBtn icon_personBtn_msg"><i class="icon_personNext"></i></em><em class="icon_adderBtn"></em><p class="box_adderName">' + $('.tanceng .list_check').closest('li').find('.list_msg').html() + '</p><p class="box_addermsg"></p></li>');
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
            dataType: 'json',
            success: function (oE) {
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
                $('.tanceng .ven_sell_quote_create_choose_goods_cate_list').html(goodsCateListHtml);
                getGoodsListByCateFn($('.tanceng .ven_sell_quote_create_choose_goods_cate_list li:nth-of-type(1)').attr('goodscateid'));
            },
            error: function (e) {
                alert(e.msg);
                console.log(e);
            }
        });
    }

    //商品分类搜索功能
    $('.ven_sell_quote_create_choose_goods_cate_search_btn').die('click').live('click', function () {
        if ($('.ven_sell_quote_create_choose_goods_cate_search_inp').val() == '') {
            return false;
        }
        $('.tanceng .ven_sell_quote_create_choose_goods_inp_add_list').html('<li style="margin-top: 1px;">' + $('.ven_sell_quote_create_choose_goods_cate_search_inp').val() + ' <i></i></li>');
        venSellQuoteCreateChooseGoodsCateListData.name = $('.ven_sell_quote_create_choose_goods_cate_search_inp').val();
        venSellQuoteCreateChooseGoodsSortFn();
        $('.ven_sell_quote_create_choose_goods_cate_search_inp').val('').attr('readonly', true);
    });

    //商品分类 - 删除搜索项
    $('.tanceng .ven_sell_quote_create_choose_goods_inp_add_list li i').die('click').live('click', function () {
        $(this).closest('li').remove();
        venSellQuoteCreateChooseGoodsCateListData.name = '';
        venSellQuoteCreateChooseGoodsSortFn();
        $('.ven_sell_quote_create_choose_goods_cate_search_inp').val('').attr('readonly', false);
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
    $('.ven_sell_quote_create_choose_goods_cate_list li').die('click').live('click', function () {
        $('.ven_sell_quote_create_choose_goods_search_inp').val('搜索商品编号/商品名称').css('color', '#ccc');
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
                $('.tanceng .ven_sell_quote_create_choose_goods_totals').html(oE.totalcount);
                var datalist = oE.dataList;
                if (datalist.length == 0) {
                    $('.tanceng .ven_sell_quote_create_choose_goods_nodata_box').removeClass('none');
                    $('.tanceng .ven_sell_quote_create_choose_goods_handle').addClass('none');
                } else {
                    $('.tanceng .ven_sell_quote_create_choose_goods_nodata_box').addClass('none');
                    $('.tanceng .ven_sell_quote_create_choose_goods_handle').removeClass('none');
                }
                var goodsListHtml = '';
                //停用状态
                var invalidStatusClass = '';
                //属性名
                var goodsAttrNameArr = getGoodsCateAttrTheadListFn(getGoodsListData.cate_id);
                var goodsAttrName = '';
                console.log(getGoodsListData.cate_id);
                console.log(goodsAttrNameArr);
                //操作按钮
                var goodsOperateBtn = '';
                console.log(datalist);
                $.each(goodsAttrNameArr, function (i, v) {
                    //表头
                    goodsAttrName += '<th>' + v + '</th>';
                });

                $.each(datalist, function (i, v) {
                    //属性值
                    var goodsAttrValue = '';
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
                                        splP = 'xiangmu_p6';
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
                    var goodsAttrValueText = '';
                    $.each(v['attributes'], function (i2, v2) {
                        goodsAttrValueText += v2['value'] + '/';
                    });
                    goodsAttrValueText = goodsAttrValueText.slice(0, goodsAttrValueText.length - 1);
                    //列表内容
                    goodsListHtml += '<tr goodsid="' + v['id'] + '" goodstaxtype="' + v['taxtype'] + '" goodsattr="' + goodsAttrValueText + '" goodsretailprice="' + v['retail_price'] + '" goodslowerprice="' + v['lower_price'] + '" goodscostprice="' + v['cost_price'] + '">\
                                        <td><input type="checkbox"/></td>\
                                        <td>' + l_dbl(i + 1) + '</td>\
                                        <td class="goodscodesn none">' + v['code_sn'] + '</td>\
                                        <td class="goodsname none">' + v['name'] + '</td>\
                                        <td class="goodsunitname none">' + v['unit_name'] + '</td>\
                                        ' + goodsAttrValue + '\
                                        <td>' + v['remark'] + '</td>\
                                        </tr>'
                });
                //
                //
                //表头
                console.log(goodsAttrName);
                $('.tanceng .ven_sell_quote_create_choose_goods_list_thead').html('<tr><th>选择</th><th>序号</th><th class="none">商品编号</th><th class="none">名称</th><th class="none">基本单位</th>' + goodsAttrName + '<th>备注</th></tr>');
                //-->
                //表格主体
                $('.tanceng .ven_sell_quote_create_choose_goods_list').html(goodsListHtml);
                //分页
                list_table_render_pagination('.ven_sell_quote_create_choose_goods_pagination', getGoodsListData, venSellQuoteCreateChooseGoodsFn, oE.totalcount, datalist.length);
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
            $('.ven_sell_quote_create_choose_goods_list').addClass('none');
            $('.ven_sell_quote_create_choose_goods_handle').addClass('none');
            $('.ven_sell_quote_create_choose_goods_nodata_box').removeClass('none');
            return false;
        } else {
            getGoodsListData.cate_id = cateid;
            $('.ven_sell_quote_create_choose_goods_list').removeClass('none');
            $('.ven_sell_quote_create_choose_goods_handle').removeClass('none');
            $('.ven_sell_quote_create_choose_goods_nodata_box').addClass('none');
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
        getGoodsListData.cate_id = $('.ven_sell_quote_create_choose_goods_cate_list li.Sideslip_list_on').attr('goodscateid');
        getGoodsListData.attr = arrayToJson(attrSearchField);
        venSellQuoteCreateChooseGoodsFn();
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
                    $('.tanceng .goods_attr_search_table').html(cateAttrList);
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
    $('.tanceng .ven_sell_quote_create_choose_goods_search_btn').die('click').live('click', function () {
        getGoodsListData.cate_id = $('.tanceng .ven_sell_quote_create_choose_goods_cate_list li.Sideslip_list_on').attr('goodscateid');
        if ($('.tanceng .ven_sell_quote_create_choose_goods_search_inp').val() == '搜索商品编号/商品名称') {
            getGoodsListData.key = '';
        } else {
            getGoodsListData.key = $('.tanceng .ven_sell_quote_create_choose_goods_search_inp').val();
        }
        venSellQuoteCreateChooseGoodsFn();
    });


    //选择商品
    $('.tanceng .ven_sell_quote_create_choose_goods_btn').die('click').live('click', function () {
        getGoodsListData.key = '';
        venSellQuoteCreateChooseGoodsSortFn();
        //清空属性搜索
        attrSearch = [];
        attrTemp = [];
    });
    //记录商品数量
    function remProductNum() {
        var numArr = [];
        $.each($('.tanceng .sell_quote_num_check'), function (i, v) {
            numArr.push($('.tanceng .sell_quote_num_check').eq(i).val());
        });
        return numArr;
    }

    //选择商品种类
    $('.tanceng .ven_sell_quote_choose_products_ul li').live('click', function () {
        if ($('.tanceng .ven_sell_quote_create_tax_num_inp').val() == '含税17%') {
            $('.tanceng .sell_quote_has_tax_hsdj').text('含税单价');
            $('.tanceng .sell_quote_has_tax').removeClass('none');
        } else if ($('.tanceng .ven_sell_quote_create_tax_num_inp').val() == '无税') {
            $('.tanceng .sell_quote_has_tax_hsdj').text('单价');
            $('.tanceng .sell_quote_has_tax').addClass('none');
        }
    });

    //选择商品 - 保存
    $('.tanceng .ven_sell_quote_create_choose_goods_save_btn').die('click').live('click', function () {
        var arr = remProductNum();
        $.each($('.tanceng .ven_sell_quote_create_choose_goods_list tr'), function (i, v) {
            if ($('.tanceng .ven_sell_quote_create_choose_goods_list tr').eq(i).find('input:checkbox').is(':checked')) {
                aSellQuoteCreateGoodsChosen.push({
                    'goodsid': $('.tanceng .ven_sell_quote_create_choose_goods_list tr').eq(i).attr('goodsid'),
                    'goodsname': $('.tanceng .ven_sell_quote_create_choose_goods_list tr').eq(i).find('td.goodsname').html(),
                    'goodscodesn': $('.tanceng .ven_sell_quote_create_choose_goods_list tr').eq(i).find('td.goodscodesn').html(),
                    'goodsattr': $('.tanceng .ven_sell_quote_create_choose_goods_list tr').eq(i).attr('goodsattr'),
                    'goodsunitname': $('.tanceng .ven_sell_quote_create_choose_goods_list tr').eq(i).find('td.goodsunitname').html(),
                    'goodsretailprice': $('.tanceng .ven_sell_quote_create_choose_goods_list tr').eq(i).attr('goodsretailprice')
                });
            }
            //$('.tanceng .ven_sell_quote_create_choose_goods_list tr').eq(i).find('input.goodsnum').val();
        });
        var venSellQuoteCreateGoodsList = '';
        aSellQuoteCreateGoodsChosen = getJsonArrIgnore(aSellQuoteCreateGoodsChosen, 'goodsnum');
        if (aSellQuoteCreateGoodsChosen.length != 0) {
            $('.tanceng .ven_sell_quote_create_chosen_goods_add_btn_tr').addClass('none');
        } else {
            $('.tanceng .ven_sell_quote_create_chosen_goods_add_btn_tr').removeClass('none');
        }
        $.each(aSellQuoteCreateGoodsChosen, function (i, v) {
            var proNum = searchGoodsNumFn(v['goodsid']);
            console.log(proNum);
            //上次报价
            var priceLastTime = 0;
            $.ajax({
                url: SERVER_URL + '/quote/goodhislist',
                type: 'GET',
                data: {
                    token: token,
                    good_id: v['goodsid'],
                    thetype: 1
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

            var taxNum = 0;
            var sellQuoteCreateSepClass = "";
            if ($('.tanceng .ven_sell_quote_create_tax_num_inp').val() == '含税17%') {
                taxNum = 17;
                $('.tanceng .sell_quote_has_tax_hsdj').text('含税单价');
                sellQuoteCreateSepClass = "";
            } else if ($('.tanceng .ven_sell_quote_create_tax_num_inp').val() == '无税') {
                taxNum = 0;
                $('.tanceng .sell_quote_has_tax_hsdj').text('单价');
                sellQuoteCreateSepClass = "none";
            }
            venSellQuoteCreateGoodsList += '<tr goodsid="' + v['goodsid'] + '" lik_up_down_type="0">\
                                            <td class="sell_quote_create_choose_goods_order">' + l_dbl(i + 1) + '</td>\
                                            <td class="xs_f_color sell_quote_create_choose_goods_name">' + v['goodsname'] + '</td>\
                                                <td>' + v['goodscodesn'] + '</td>\
                                                <td>' + v['goodsattr'] + '</td>\
                                                <td>' + v['goodsunitname'] + '</td>\
                                                <td>\
                                                <div class="xs_num_input num_input inline_block num_input_new"><button class="but_grey_a but_opa_small inp_plus ven_sell_quote_productnum_change">+</button><input type="text" class="lik_input_number productnum sell_quote_num_check" value="0"/><button class="but_grey_a but_opa_small radius_left_0 inp_reduce ven_sell_quote_productnum_change">-</button></div>\
                                                    </td>\
                                                <td>当前库存：<br/ ><span class="good_cur_num">' + (proNum['cur_num']) + '</span><br />待出库：<br /><span class="good_stocking_num">' + (proNum['stocking_num']) + '</span></td>\
                                                <td class="xs_goods_box" style="position: relative;">\
                                                <div class="xs_goods_big_box"><div class="inline_block select_100"><input type="text" class="sell_quote_num_check lik_input_number c_3 time_input xs_bjd_inp xs_xsbjd_inp_60 product_reference_price ven_sell_quote_goods_cost_one" lastprice = "' + priceLastTime + '" retail="' + v['goodsretailprice'] + '" value="' + v['goodsretailprice'] + '" style="color: rgb(153, 153, 153);margin-right: 10px;"></div><i class="ven_warning_arrow xs_goods_down_img" style="margin: 0;position: absolute;top: 21px;right: 6px;display:none;"></i><ul class="xs_goods_select select_list" style="padding-bottom:5px;"><li>' + v['goodsretailprice'] + '(零售价)</li><div class="' + ((priceLastTime == 0 || sellQuoteCreateData.quote_id == 0) ? 'none' : '') + '"><div class="xs_goods_li_box"><p class="p1">上次报价：</p><p class="p2">' + priceLastTime + '</p><i class="ven_warning_arrow xs_goods_down_img xs_goods_down_img1"></i><p></p></div></div></ul></div><div class="work_vent_client_contMsgBox"><i class="work_vent_client_torr"></i><div class="work_vent_client_contMsgBoxDet fnc_output_ticket_total_remain_ticket_num_list"><span class="lik_up_down_text"></span>于 ' + v['goodsretailprice'] + '(零售价)</div></div>\
                                                </td>\
                                                    <td class="sell_quote_has_tax ' + sellQuoteCreateSepClass + '"><span class="ven_sell_quote_tax_num ven_sell_quote_goods_tax_one c_y ">' + taxNum + '</span></td>\
                                                    <td class="sell_quote_has_tax ' + sellQuoteCreateSepClass + '"><span class="ven_sell_quote_goods_tax_total"></span></td>\
                                                    <td><span class="ven_sell_quote_goods_cost_total">0</span></td>\
                                                <td><button class="but_blue but_opa_small but_green val_dialogTop ven_sell_quote_create_choose_goods_btn" name="xg_xsbjd_xzsp">+</button><button class="but_opa_small but_red ven_sell_quote_create_goods_del_btn">-</button></td>\
                                            </tr>'
        });
        //<td><span class="ven_sell_quote_goods_cost_total">' + moneyToFixed(v['goodsretailprice'] * (1 + (parseFloat(taxNum) / 100))) + '</span></td>\
        $('.tanceng .ven_sell_quote_create_chosen_goods_tbody').html(venSellQuoteCreateGoodsList);
        productnumChangeFn();
        goodTaxTotalsFn();
        goodCostTotalsFn();
        $(this).closest('.dialog_box').remove();
        reWriteProductNum(arr);
    });

//    商品价格下拉框点击事件
    $('.tanceng .xs_goods_select li').die('click').live('click', function () {
        var price = $(this).text().split('(')[0];
        $(this).closest('td').find('input').val(price).trigger('keyup');
    });

    //商品数量控制
    function productnumChangeFn() {
        var goodsNumTotal = 0;
        $.each($('.tanceng .ven_sell_quote_create_chosen_goods_tbody .productnum'), function (i, v) {
            goodsNumTotal += parseFloat($('.tanceng .ven_sell_quote_create_chosen_goods_tbody .productnum').eq(i).val());
        });
        $('.tanceng .goods_num_total').html(goodsNumTotal);
    }

    //商品数量改变事件
    $('.tanceng .productnum').live('keyup', function () {
        /*if (parseFloat($(this).val()) > parseFloat($(this).attr('maxnum'))) {
         alert('已达到当前库存上限');
         $(this).val($(this).attr('maxnum'));
         $('.tanceng .productnum').trigger('keyup');
         return false;
         }*/
        var index = $(this).closest('tr').index();
        productnumChangeFn();
        goodCostCalcFn(index);
        goodTaxTotalsFn();
        goodCostTotalsFn();
    });

    //选择零售价列表
    $('.tanceng .ven_sell_quote_goods_cost_ul li').die('click').live('click', function () {
        var index = $(this).closest('tr').index();
        productnumChangeFn();
        goodCostCalcFn(index);
        goodCostTotalsFn();
        goodTaxTotalsFn();
    });

    //商品数量增加减少
    $('.tanceng .ven_sell_quote_create_chosen_goods_tbody .ven_sell_quote_productnum_change').die('click').live('click', function () {
        /*if (parseFloat($(this).siblings('input').val()) > parseFloat($(this).siblings('input').attr('maxnum'))) {
         alert('已达到当前库存上限');
         $(this).siblings('input').val(parseFloat($(this).siblings('input').attr('maxnum')));
         return false;
         }*/
        var index = $(this).closest('tr').index();
        productnumChangeFn();
        goodCostCalcFn(index);
        goodTaxTotalsFn();
        goodCostTotalsFn();
    });
    //商品单价调整
    $('.tanceng .ven_sell_quote_create_chosen_goods_tbody .ven_sell_quote_goods_cost_one').live('keyup', function () {
        var index = $(this).closest('tr').index();
        goodCostCalcFn(index);
        goodTaxTotalsFn();
        goodCostTotalsFn();
        if (parseFloat($(this).val()) > parseFloat($(this).attr('retail'))) {
            $(this).parent().next().addClass('ven_warning_arrow_up').css('display', '');
            $(this).closest('td').find('.lik_up_down_text').text('高');
            $(this).closest('tr').attr('lik_up_down_type', '1');
        } else if (parseFloat($(this).val()) < parseFloat($(this).attr('retail'))) {
            $(this).parent().next().removeClass('ven_warning_arrow_up').css('display', '');
            $(this).closest('td').find('.lik_up_down_text').text('低');
            $(this).closest('tr').attr('lik_up_down_type', '2');
        } else {
            $(this).parent().next().css('display', 'none');
            $(this).closest('tr').attr('lik_up_down_type', '0');
        }
        //与上次报价相比
        if (parseFloat($(this).val()) > parseFloat($(this).attr('lastprice'))) {
            $(this).parent().siblings('ul').find('.xs_goods_li_box i').css({
                'display': '',
                'margin': '-3px 8px'
            }).removeClass('ven_warning_arrow').addClass('ven_warning_arrow_up');
        } else if (parseFloat($(this).val()) < parseFloat($(this).attr('lastprice'))) {
            $(this).parent().siblings('ul').find('.xs_goods_li_box i').css({
                'display': '',
                'margin': '-3px 8px'
            }).removeClass('ven_warning_arrow_up').addClass('ven_warning_arrow');
        } else {
            $(this).parent().siblings('ul').find('.xs_goods_li_box i').css('display', 'none');
        }
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
        $.each($('.tanceng .ven_sell_quote_create_chosen_goods_tbody tr'), function (i, v) {
            goodsTaxTotals += parseFloat($('.tanceng .ven_sell_quote_create_chosen_goods_tbody .ven_sell_quote_goods_tax_one').eq(i).html() * $('.tanceng .ven_sell_quote_create_chosen_goods_tbody .ven_sell_quote_goods_cost_total').eq(i).html() / 100);
        });
        $('.tanceng .goods_tax_total').val(moneyToFixed(goodsTaxTotals));
    }

    //商品单条金额计算
    function goodCostCalcFn(index) {
        //单条商品税额
        $('.tanceng .ven_sell_quote_create_chosen_goods_tbody .ven_sell_quote_goods_tax_total').eq(index).html(moneyToFixed($('.tanceng .ven_sell_quote_create_chosen_goods_tbody .ven_sell_quote_goods_cost_one').eq(index).val().split('(')[0] / (1.17) * 0.17));
        //单条商品价格
        $('.tanceng .ven_sell_quote_create_chosen_goods_tbody .ven_sell_quote_goods_cost_total').eq(index).html(moneyToFixed($('.tanceng .ven_sell_quote_create_chosen_goods_tbody .productnum').eq(index).val() * $('.tanceng .ven_sell_quote_create_chosen_goods_tbody .ven_sell_quote_goods_cost_one').eq(index).val()));
        //单条商品价格
        //$('.tanceng .ven_sell_quote_create_chosen_goods_tbody .ven_sell_quote_goods_cost_total').eq(index).html(moneyToFixed($('.tanceng .ven_sell_quote_create_chosen_goods_tbody .productnum').eq(index).val() * $('.tanceng .ven_sell_quote_create_chosen_goods_tbody .ven_sell_quote_goods_cost_one').eq(index).val()));
        //单条商品税额
        //$('.tanceng .ven_sell_quote_create_chosen_goods_tbody .ven_sell_quote_goods_tax_total').eq(index).html(moneyToFixed($('.tanceng .ven_sell_quote_create_chosen_goods_tbody .ven_sell_quote_goods_cost_total').eq(index).html() * parseFloat($('.tanceng .ven_sell_quote_create_chosen_goods_tbody .ven_sell_quote_goods_tax_one').eq(index).html()) / 100));
    }

    //删除单条商品
    $('.tanceng .ven_sell_quote_create_chosen_goods_tbody .ven_sell_quote_create_goods_del_btn').die('click').live('click', function () {
        var index = $(this).closest('tr').index();
        aSellQuoteCreateGoodsChosen.splice(index, 1);
        if (aSellQuoteCreateGoodsChosen.length != 0) {
            $('.tanceng .ven_sell_quote_create_chosen_goods_add_btn_tr').addClass('none');
        } else {
            $('.tanceng .ven_sell_quote_create_chosen_goods_add_btn_tr').removeClass('none');
        }
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
                                <td>' + likNullData(v['code_sn']) + '</td>\
                                <td>' + likNullData(v['name']) + '</td>\
                                <td>' + likNullData(v['remark']) + '</td>\
                            </tr>'
                });
                $('.tanceng .ven_sell_quote_create_choose_package_list').html(html);
                list_table_render_pagination(".ven_sell_quote_create_choose_package_pagination", getPackagePackageData, venSellQuoteCreateChoosePackageFn, data.totalcount, datalist.length);
            },
            error: function (data) {
                alert(e.msg);
                alert(data);
            }
        });
    }

    //选择套餐商品
    $('.tanceng .ven_sell_quote_create_choose_package_btn').die('click').live('click', function () {
        venSellQuoteCreateChoosePackageFn();
        $('.xs_TC').find('td').css('border-bottom', 'none');
        console.log(remProductNum());
    });

    //搜索关键字
    $('.tanceng .ven_sell_quote_create_choose_package_search_btn').die('click').live('click', function () {
        if ($('.tanceng .ven_sell_quote_create_choose_package_inp').val() == '搜索套餐编号/套餐名称') {
            getPackagePackageData.key = '';
        } else {
            getPackagePackageData.key = $('.tanceng .ven_sell_quote_create_choose_package_inp').val();
        }
        venSellQuoteCreateChoosePackageFn();
    });
    //选择套餐商品 - 保存
    $('.tanceng .ven_sell_quote_create_choose_package_save').die('click').live('click', function () {
        var arr = remProductNum();
        $.each($('.tanceng .ven_sell_quote_create_choose_package_list tr'), function (i, v) {
            if ($('.tanceng .ven_sell_quote_create_choose_package_list tr').eq(i).find('input:checkbox').is(':checked')) {
                aSellQuoteCreatePackageChosen.push($('.tanceng .ven_sell_quote_create_choose_package_list tr').eq(i).attr('packageid'));
            }
        });
        //套餐商品数据展示
        var sellQuoteCreatePackageParentHtml = '';
        var sellQuoteCreatePackageChildHtml = '';
        var sellQuoteCreatePackageChildArr = [];
        aSellQuoteCreatePackageChosen = getJsonArr(aSellQuoteCreatePackageChosen);
        if (aSellQuoteCreatePackageChosen.length != 0) {
            $('.tanceng .ven_sell_quote_create_chosen_package_add_btn_tr').addClass('none');
        } else {
            $('.tanceng .ven_sell_quote_create_chosen_package_add_btn_tr').removeClass('none');
        }
        console.log(aSellQuoteCreatePackageChosen);
        if (aSellQuoteCreatePackageChosen.length > 0) {
            $('.tanceng .ven_sell_quote_choose_package_hj_head').addClass('none');
            var taxNum = 0;
            if ($('.tanceng .ven_sell_quote_create_tax_num_inp').val() == '含税17%') {
                taxNum = 17;
            } else if ($('.tanceng .ven_sell_quote_create_tax_num_inp').val() == '无税') {
                taxNum = 0;
            }
            $.each(aSellQuoteCreatePackageChosen, function (i, v) {
                //获取套餐详情
                $.ajax({
                    url: SERVER_URL + "/product-package/loadpackage",
                    type: 'get',
                    data: {
                        token: token,
                        id: v,
                        detail: 1,
                        price: 1
                    },
                    dataType: "json",
                    async: false,
                    success: function (data) {
                        var data = data.data;
                        console.log(data);
                        //套餐包含商品
                        var packageGoodsList = '';
                        $.each(data['package_info'], function (i2, v2) {
                            var packageGoodsChildList = '';
                            var goodsNumTotal = 0;
                            $.each(v2['list'], function (i3, v3) {
                                var packageGoodsAttr = '';
                                $.each(v3['attributes'], function (i4, v4) {
                                    packageGoodsAttr += v4['value'] + '/';
                                });
                                packageGoodsAttr = packageGoodsAttr.slice(0, packageGoodsAttr.length - 1);
                                goodsNumTotal += parseFloat(v3['num']);
                                packageGoodsChildList += '<tr packageid="' + v3['id'] + '">\
                                                        <td>' + v3['code_sn'] + '</td>\
                                                        <td>' + packageGoodsAttr + '</td>\
                                                        <td>' + v3['num'] + '</td>\
                                                        <td class="ven_sell_quote_create_choose_package_child_num">' + v3['num'] + '</td>\
                                                        </tr>'
                            });
                            packageGoodsList += '<div class="sell_quote_create_package_goods_list"><p class="box_open_head" style="background: rgb(255, 255, 255); border-radius: 3px;">\
                                                    <span class="cont_title" style="padding-left: 0;margin-left: 0;">' + v2['cate_name'] + '</span>\
                                                    </p>\
                                                    <div class="container">\
                                                    <div class="table-container">\
                                                    <table>\
                                                    <thead>\
                                                    <tr>\
                                                    <th width="200">商品编号</th>\
                                                    <th width="350">属性</th>\
                                                    <th width="200">单个套餐数量</th>\
                                                    <th width="200">总数</th>\
                                                    </tr>\
                                                    </thead>\
                                                    <tbody>\
                                                    ' + packageGoodsChildList + '\
                                                <tr class="table_total">\
                                                    <td></td>\
                                                    <td></td>\
                                                    <td><input type="hidden" class="sell_quote_create_package_child_one_num_total_inp_hid" value="' + goodsNumTotal + '"></td>\
                                                    <td class="c_3">小计：<span class="sell_quote_create_package_child_one_num_total c_r">' + goodsNumTotal + '</span></td>\
                                                </tr>\
                                                </tbody>\
                                                </table>\
                                                </div>\
                                                </div></div>'
                        });
                        //套餐
                        /*<th width="60">折扣率</th>\
                         <th width="100">原价</th>\*/
                        sellQuoteCreatePackageParentHtml += '<div class="ven_sell_quote_choose_package_one_box_list">\
                                    <div class="container">\
                                    <div class="table-container">\
                                    <table>\
                                    <thead class="' + (i == 0 ? '' : 'none') + '">\
                                    <tr>\
                                    <th width="50">序号</th>\
                                    <th width="160">套餐商品名称</th>\
                                    <th width="160">商品编号</th>\
                                    <th width="130">数量</th>\
                                    <th width="170">单价</th>\
                                    <th width="50">税率(%)</th>\
                                    <th width="110">税额(元)</th>\
                                    <th width="110">总价(元)</th>\
                                    <th width="80">操作</th>\
                                    </tr>\
                                    </thead>\
                                    <tbody>\
                                    <tr packageid="' + data['id'] + '">\
                                    <td width="50">' + l_dbl(i + 1) + '</td>\
                                    <td width="160" class="f_color xs_xsbjs_td">' + data['name'] + '</td>\
                                    <td width="160">' + data['code_sn'] + '</td>\
                                    <td width="130">\
                                    <div class="xs_num_input num_input inline_block num_input_new"><button class="but_grey_a but_opa_small inp_plus sell_quote_create_package_num_change">+</button><input class="lik_input_number sell_quote_create_package_num sell_quote_num_check" type="text" value="0"><button class="but_grey_a but_opa_small radius_left_0 inp_reduce sell_quote_create_package_num_change">-</button></div>\
                                    </td>\
                                    <td width="170" class="xs_goods_box" style="position: relative;">\
                                    <input type="text" class="time_input xs_xsbjd_inp_60 c_3 lik_input_number sell_quote_create_package_cost_one_change" value="' + (data['total_price'] == '-' ? '0' : data['total_price']) + '">\
                                    </td>\
                                    <td width="50" class="ven_sell_quote_tax_num c_y">' + taxNum + '</td>\
                                    <td width="110" class="sell_quote_create_package_tax_cost">0</td>\
                                    <td width="110" class="sell_quote_create_package_cost">0</td>\
                                    <td width="80"><button class="but_blue but_opa_small but_green val_dialogTop ven_sell_quote_create_choose_package_btn" name="xg_xsbjd_xzspTC">+</button><button class="but_blue but_opa_small but_red sell_quote_create_package_parent_del_btn">-</button></td>\
                                    </tr>\
                                    </tbody>\
                                    </table>\
                                    </div>\
                                    </div>\
                                    <div class="xs_xsbjd_table_t2">\
                                    <div class="table_t2" style="position: relative;">\
                                    <p class="xs_content_sp"><span>包含商品内容</span></p>\
                                    <span class="box_open_btn" style="right: 13px;">收起 <i class="right icon_show"></i></span>\
                                    </div>\
                                    <div class="box_open_list goods_tc_toggle">' + packageGoodsList + '</div>\
                                    </div>\
                                </div>';
                    }
                });
            });
        } else {
            $('.tanceng .ven_sell_quote_choose_package_hj_head').removeClass('none');
        }
        $('.tanceng .ven_sell_quote_choose_package_box_list').html(sellQuoteCreatePackageParentHtml);
        $(this).closest('.dialog_box').remove();
        sellQuoteCreatePackageNumChangeFn();
        sellQuoteCreatePackageCostChangeFn();
        reWriteProductNum(arr);
    });

    //单条套餐商品增加减少
    $('.tanceng .sell_quote_create_package_num_change').die('click').live('click', function () {
        sellQuoteCreatePackageNumChangeFn();
        sellQuoteCreatePackageCostChangeFn();
    });
    //套餐改变价格
    $('.tanceng .sell_quote_create_package_cost_one_change').live('keyup', function () {
        sellQuoteCreatePackageCostChangeFn();
    });
    //选中套餐数量的变化
    function sellQuoteCreatePackageNumChangeFn() {
        //套餐子商品单条数量控制
        $.each($('.tanceng .ven_sell_quote_create_choose_package_child_num'), function (i, v) {
            $('.tanceng .ven_sell_quote_create_choose_package_child_num').eq(i).html(parseFloat($('.tanceng .ven_sell_quote_create_choose_package_child_num').eq(i).prev().html()) * parseFloat($('.tanceng .ven_sell_quote_create_choose_package_child_num').eq(i).closest('.ven_sell_quote_choose_package_one_box_list').find('.sell_quote_create_package_num').val()))
        });
        //套餐子商品数量总数控制
        $.each($('.tanceng .sell_quote_create_package_child_one_num_total'), function (i, v) {
            $('.tanceng .sell_quote_create_package_child_one_num_total').eq(i).html(parseFloat($('.tanceng .sell_quote_create_package_child_one_num_total_inp_hid').eq(i).val()) * parseFloat($('.tanceng .sell_quote_create_package_child_one_num_total').eq(i).closest('.ven_sell_quote_choose_package_one_box_list').find('.sell_quote_create_package_num').val()));
        });
        //套餐总数量
        var total = 0;
        $.each($('.tanceng .ven_sell_quote_choose_package_box_list').find('.sell_quote_create_package_num'), function (i, v) {
            total += parseFloat($('.tanceng .ven_sell_quote_choose_package_box_list').find('.sell_quote_create_package_num').eq(i).val());
        });
        $('.tanceng .ven_sell_quote_create_package_num_total').html(total);
    }

    //选中套餐价格的变化
    function sellQuoteCreatePackageCostChangeFn() {
        var taxNum = 0;
        if ($('.tanceng .ven_sell_quote_create_tax_num_inp').val() == '含税17%') {
            taxNum = 17;
        } else if ($('.tanceng .ven_sell_quote_create_tax_num_inp').val() == '无税') {
            taxNum = 0;
        }
        //单条税额变化
        $.each($('.tanceng .sell_quote_create_package_tax_cost'), function (i, v) {
            $('.tanceng .sell_quote_create_package_tax_cost').eq(i).html(moneyToFixed(parseFloat($('.tanceng .sell_quote_create_package_cost_one_change').eq(i).val()) * parseFloat(100 + taxNum) / 100));
        });
        //单条总价变化
        $.each($('.tanceng .sell_quote_create_package_cost'), function (i, v) {
            $('.tanceng .sell_quote_create_package_cost').eq(i).html(moneyToFixed(parseFloat($('.tanceng .sell_quote_create_package_num').eq(i).val()) * parseFloat($('.tanceng .sell_quote_create_package_cost_one_change').eq(i).val()) * parseFloat(100 + taxNum) / 100));
        });
        //套餐总价格
        var costTotal = 0;
        $.each($('.tanceng .ven_sell_quote_choose_package_box_list .sell_quote_create_package_cost'), function (i, v) {
            costTotal += parseFloat($('.tanceng .ven_sell_quote_choose_package_box_list .sell_quote_create_package_cost').eq(i).html());
        });
        $('.tanceng .ven_sell_quote_create_package_cost_total').html(costTotal);
        venSellQuoteCreateProductCostTotalFn();
    }

    $('.tanceng .sell_quote_create_package_num').live('keyup', function () {
        $('.tanceng .sell_quote_create_package_cost_one_change').trigger('keyup');
    });

    //删除套餐父级
    $('.tanceng .sell_quote_create_package_parent_del_btn').die('click').live('click', function () {
        var index = $(this).closest('.ven_sell_quote_choose_package_one_box_list').index();
        aSellQuoteCreatePackageChosen.splice(index, 1);
        if (aSellQuoteCreatePackageChosen.length != 0) {
            $('.tanceng .ven_sell_quote_create_chosen_package_add_btn_tr').addClass('none');
        } else {
            $('.tanceng .ven_sell_quote_choose_package_hj_head').removeClass('none');
            $('.tanceng .ven_sell_quote_create_chosen_package_add_btn_tr').removeClass('none');
        }
        $(this).closest('.ven_sell_quote_choose_package_one_box_list').remove();

        //第一个表头显示
        $('.tanceng .ven_sell_quote_choose_package_box_list .ven_sell_quote_choose_package_one_box_list:nth-of-type(1)').find('thead').eq(0).removeClass('none');

        sellQuoteCreatePackageNumChangeFn();
        sellQuoteCreatePackageCostChangeFn();
        sellQuoteCreatePackageSortFn();
    });
    //套餐父级序号控制
    function sellQuoteCreatePackageSortFn() {
        $.each($('.tanceng .ven_sell_quote_choose_package_box_list .ven_sell_quote_choose_package_one_box_list'), function (i, v) {
            $('.tanceng .ven_sell_quote_choose_package_box_list .ven_sell_quote_choose_package_one_box_list').eq(i).find('tbody').eq(0).find('td').eq(0).html(l_dbl(i + 1));
        })
    }

    /*整机商品*/

    var likSettingGoodsListArr = [];
    var likSettingGoodsListValArr = [];
    $('.tanceng .ven_sell_quote_create_choose_setting_btn').die('click').live('click', function () {
        venSellQuoteCreateChooseSettingSortFn();
        likSettingGoodsListArr = [];
        $.each($('.tanceng .ven_sell_quote_create_choose_setting_box_list .ven_sell_quote_create_choose_setting_kxp_list'), function (i, v) {
            likSettingGoodsListArr.push($('.tanceng .ven_sell_quote_create_choose_setting_box_list .ven_sell_quote_create_choose_setting_kxp_list').eq(i).html());
        });
        likSettingGoodsListValArr = [];
        $.each($('.tanceng .ven_sell_quote_create_choose_setting_box_list .sell_quote_create_setting_cost_one_change'), function (i, v) {
            likSettingGoodsListValArr.push($('.tanceng .ven_sell_quote_create_choose_setting_box_list .sell_quote_create_setting_cost_one_change').eq(i).val());
        });
        console.log(remProductNum());
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
                $('.ven_sell_quote_create_choose_setting_sort_list').html(completeCateListHtml);
                getSellQuoteChooseCompleteGoodsListByCateFn($('.ven_sell_quote_create_choose_setting_sort_list li:nth-of-type(1)').attr('completecateid'));
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
    $('.tanceng .ven_sell_quote_create_choose_setting_sort_list li').die('click').live('click', function () {
        $('.tanceng .ven_sell_quote_create_choose_setting_search_inp').val('搜索商品编号/商品名称').css('color', '#ccc');
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
                $('.tanceng .ven_sell_quote_create_choose_setting_totals').html(oE.totalcount);
                var datalist = oE.datalist;
                if (datalist.length == 0) {
                    $('.tanceng .ven_sell_quote_create_choose_setting_nodata_box').removeClass('none');
                    $('.tanceng .ven_sell_quote_create_choose_setting_handle').addClass('none');
                } else {
                    $('.tanceng .ven_sell_quote_create_choose_setting_nodata_box').addClass('none');
                    $('.tanceng .ven_sell_quote_create_choose_setting_handle').removeClass('none');
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
                                        <td class="none">' + v['code_sn'] + '</td>\
                                        <td>' + v['name'] + '</td>\
                                        <td>' + completeOptionalName + '</td>\
                                        <td>' + v['attr_name'] + '</td>\
                                        <td>' + v['remark'] + '</td>\
                                        </tr>'
                });
                //
                //表格主体
                $('.tanceng .ven_sell_quote_create_choose_setting_list').html(completeListHtml);
                //分页
                list_table_render_pagination('.tanceng .ven_sell_quote_create_choose_setting_pagination', getSellQuoteChooseCompleteGoodsListData, getSellQuoteChooseCompleteGoodsListFn, oE.totalcount, datalist.length);
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
    $('.ven_sell_quote_create_choose_setting_cate_search_btn').die('click').live('click', function () {
        if ($('.tanceng .ven_sell_quote_create_choose_setting_cate_search_inp').val() == '') {
            return false;
        }
        $('.ven_sell_quote_create_choose_setting_inp_add_list').html('<li style="margin-top: 1px;">' + $('.tanceng .ven_sell_quote_create_choose_setting_cate_search_inp').val() + ' <i></i></li>');
        venSellQuoteSettingSortData.name = $('.tanceng .ven_sell_quote_create_choose_setting_cate_search_inp').val();
        venSellQuoteCreateChooseSettingSortFn();
        $('.tanceng .ven_sell_quote_create_choose_setting_cate_search_inp').val('').attr('readonly', true);
    });
    //整机商品分类搜索 - 删除关键字
    $('.ven_sell_quote_create_choose_setting_inp_add_list li i').die('click').live('click', function () {
        $(this).closest('li').remove();
        $('.tanceng .ven_sell_quote_create_choose_setting_cate_search_inp').val('').attr('readonly', false);
        venSellQuoteSettingSortData.name = '';
        venSellQuoteCreateChooseSettingSortFn();
    });

    //整机商品 - 搜索关键字
    $('.tanceng .ven_sell_quote_create_choose_setting_search_btn').die('click').live('click', function () {
        if ($('.tanceng .ven_sell_quote_create_choose_setting_search_inp').val() == '搜索商品编号/商品名称') {
            alert('请输入搜索关键字');
            getSellQuoteChooseCompleteGoodsListData.key = '';
        } else {
            getSellQuoteChooseCompleteGoodsListData.key = $('.tanceng .ven_sell_quote_create_choose_setting_search_inp').val();
        }
        getSellQuoteChooseCompleteGoodsListFn();
    });

    //整机商品 - 搜索整机类型
    $('.tanceng .ven_sell_quote_create_choose_optional_list li').die('click').live('click', function () {
        getSellQuoteChooseCompleteGoodsListData.is_optional = $(this).attr('optional');
        getSellQuoteChooseCompleteGoodsListFn();
    });

    //选择整机商品 - 保存
    $('.tanceng .ven_sell_quote_create_choose_setting_save').die('click').live('click', function () {
        var arr = remProductNum();
        $.each($('.tanceng .ven_sell_quote_create_choose_setting_list tr'), function (i, v) {
            if ($('.tanceng .ven_sell_quote_create_choose_setting_list tr').eq(i).find('input:checkbox').is(':checked')) {
                aSellQuoteCreateSettingChosen.push($('.tanceng .ven_sell_quote_create_choose_setting_list tr').eq(i).attr('completeid'));
            }
        });
        aSellQuoteCreateSettingChosen = getJsonArr(aSellQuoteCreateSettingChosen);
        if (aSellQuoteCreateSettingChosen.length != 0) {
            $('.tanceng .ven_sell_quote_create_chosen_setting_add_btn_tr').addClass('none');
        } else {
            $('.tanceng .ven_sell_quote_create_chosen_setting_add_btn_tr').removeClass('none');
            alert('请选择商品');
            return false;
        }
        console.log(aSellQuoteCreateSettingChosen);
        $(this).closest('.dialog_box').remove();
        //整机商品选择后展示列表
        var aSellQuoteCreateSettingChosenHtml = '';
        if (aSellQuoteCreateSettingChosen) {
            $('.tanceng .ven_sell_quote_choose_setting_hj_head').addClass('none');
            $.each(aSellQuoteCreateSettingChosen, function (i, v) {
                var proNum = searchSettingNumFn(v);
                //税率
                var taxNum = 0;
                var sellQuoteCreateSepClass = "";
                var sellQuoteCreateHsdj = "";
                if ($('.tanceng .ven_sell_quote_create_tax_num_inp').val() == '含税17%') {
                    taxNum = 17;
                    $('.tanceng .sell_quote_has_tax_hsdj').text('含税单价');
                    sellQuoteCreateHsdj = '含税单价';
                    sellQuoteCreateSepClass = "";
                } else if ($('.tanceng .ven_sell_quote_create_tax_num_inp').val() == '无税') {
                    taxNum = 0;
                    $('.tanceng .sell_quote_has_tax_hsdj').text('单价');
                    sellQuoteCreateHsdj = '单价';
                    sellQuoteCreateSepClass = "none";
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
                            if (data['is_optional'] == 1) {
                                //可选配
                                aSellQuoteCreateSettingChosenHtml += '<div class="ven_sell_quote_create_choose_setting_one_box_list" settingsign="setsign' + data['id'] + '" settingid="' + data['id'] + '" optionaltype="1">\
                                <div class="container">\
                                <div class="table-container">\
                                <table>\
                                <thead class="' + (i == 0 ? '' : 'none') + '">\
                                <tr>\
                                    <th width="32">序号</th>\
                                    <th width="100">整机商品名称</th>\
                                    <th width="120">整机商品编号</th>\
                                    <th width="56">基本单位</th>\
                                    <th width="238">属性</th>\
                                    <th width="90">数量</th>\
                                    <th width="120">库存</th>\
                                    <th width="130" class="sell_quote_has_tax_hsdj">' + sellQuoteCreateHsdj + '</th>\
                                    <th width="30" class="sell_quote_has_tax ' + sellQuoteCreateSepClass + '">税率(%)</th>\
                                    <th width="85" class="sell_quote_has_tax ' + sellQuoteCreateSepClass + '">税额(元)</th>\
                                    <th width="85">总价(元)</th>\
                                    <th width="80">操作</th>\
                                </tr>\
                            </thead>\
                            <tbody>\
                            <tr settingid="' + data['id'] + '" lik_up_down_type="0">\
                            <td width="32">' + l_dbl(i + 1) + '</td>\
                            <td width="100" class="f_color xs_xsbjs_td">' + data['name'] + '</td>\
                                <td width="120">' + data['code_sn'] + '</td>\
                                <td width="56">' + data['unit_name'] + '</td>\
                                <td width="238">' + data['attr_name'] + '</td>\
                            <td width="90">\
                            <div class="xs_num_input num_input inline_block num_input_new"><button class="but_blue but_opa_small inp_plus ven_sell_quote_setting_parent_kxp_num_change_btn">+</button><input class="lik_input_number ven_sell_quote_choose_setting_kxp_num sell_quote_num_check" type="text" value="0" style="border:1px solid #23a2f3;"><button class="but_blue but_opa_small radius_left_0 inp_reduce ven_sell_quote_setting_parent_kxp_num_change_btn">-</button></div>\
                                </td>\
                                <td width="85">当前库存：<br/ ><span class="good_cur_num">' + (proNum['cur_num']) + '</span><br />待出库：<br /><span class="good_stocking_num">' + (proNum['stocking_num']) + '</span></td>\
                                <td width="130" class="xs_goods_box " style="position: relative;"><div class="xs_goods_big_box"><div class="inline_block select_100" style="color: rgb(51, 51, 51);"><input type="text" class="sell_quote_num_check time_input lik_input_number xs_bjd_inp xs_bjd_inp_1 xs_xsbjd_inp_60 sell_quote_create_setting_cost_one_change" readonly retail="' + data['retail_price'] + '" value="' + data['retail_price'] + '" style="color: rgb(153, 153, 153);margin-right: 10px;"></div></div></td>\
                                <td width="30" class="' + sellQuoteCreateSepClass + ' sell_quote_has_tax ven_sell_quote_tax_num c_y">' + taxNum + '</td>\
                                <td width="85" class="' + sellQuoteCreateSepClass + ' sell_quote_has_tax ven_sell_quote_create_setting_kxp_parent_one_cost_hsj">0</td>\
                                <td width="85" class="ven_sell_quote_create_setting_kxp_parent_one_cost_total">0</td>\
                                <td width="75"><button class="but_blue but_opa_small but_green val_dialogTop ven_sell_quote_create_choose_setting_btn" name="xg_xsbjd_xgpeizsp">+</button><button class="but_blue but_opa_small but_red sell_quote_create_setting_parent_del_btn">-</button></td>\
                                </tr>\
                                </tbody>\
                                </table>\
                                </div>\
                                </div>\
                                <div class="xs_xsbjd_table_t2">\
                                <div class="table_t2" style="position: relative;">\
                                <span class="cont_title" style="border-left: 4px solid #23a2f3;padding-left: 10px;margin-left: 0;">配件内容</span>\
                                <button class="but_icon_plus_white but_small but_blue val_dialogTop ven_sell_quote_create_choose_setting_goods_btn" name="xs_bjd_xzpzsp" style="position:absolute;right:80px;top:12px;"><i></i>选择配件</button>\
                                <span class="box_open_btn" style="right: 13px;">收起 <i class="right icon_show"></i></span>\
                                </div>\
                                <div class="ven_sell_quote_create_choose_setting_kxp_list">\
                                </div>\
                                </div>\
                                </div>';
                            } else if (data['is_optional'] == 2) {
                                //配件内容
                                $.each(data['setting_info'], function (i2, v2) {
                                    //配件子商品内容
                                    var sellQuoteCreateSettingChildGoodsList = '';
                                    //配件子商品数量
                                    var numTotal = 0;
                                    $.each(v2['list'], function (i3, v3) {
                                        var proNum = searchGoodsNumFn(v3['id']);
                                        var sellQuoteCreateSettingChildGoodsAttrList = '';
                                        $.each(v3['attributes'], function (i4, v4) {
                                            sellQuoteCreateSettingChildGoodsAttrList += v4['value'] + '/';
                                        });
                                        sellQuoteCreateSettingChildGoodsAttrList = sellQuoteCreateSettingChildGoodsAttrList.slice(0, sellQuoteCreateSettingChildGoodsAttrList.length - 1);
                                        sellQuoteCreateSettingChildGoodsList += '<tr settinggoodsid="' + v3['id'] + '">\
                                                        <td>' + v3['code_sn'] + '</td>\
                                                        <td>' + sellQuoteCreateSettingChildGoodsAttrList + '</td>\
                                                        <td>' + v3['num'] + '</td>\
                                                        <td>当前库存：<br/ ><span class="good_cur_num">' + (proNum['cur_num']) + '</span><br />待出库：<br /><span class="good_stocking_num">' + (proNum['stocking_num']) + '</span></td>\
                                                        <td class="ven_sell_quote_create_setting_goods_bkxp_one_num_toal">0</td>\
                                                        </tr>';
                                        numTotal += parseFloat(v3['num']);
                                    });
                                    sellQuoteCreateSettingGoodsList += '<div class="sell_quote_create_setting_goods_list" optionaltype="2"><p class="box_open_head" style="background: rgb(255, 255, 255); border-radius: 3px;">\
                                <span>' + v2['cate_name'] + '</span>\
                                </p>\
                                <div class="container">\
                                <div class="table-container">\
                                <table>\
                                <thead>\
                                <tr>\
                                <th width="200">商品编号</th>\
                                <th width="350">属性</th>\
                                <th width="200">单个整机数量</th>\
                                <th width="200">库存</th>\
                                <th width="200">总数</th>\
                                </tr>\
                                </thead>\
                                <tbody>' + sellQuoteCreateSettingChildGoodsList + '\
                                <tr class="table_total">\
                                <td>合计</td>\
                                <td></td>\
                                <td></td>\
                                <td><input type="hidden" value="' + numTotal + '"></td>\
                                <td class="c_3">小计：<span class="ven_sell_quote_create_setting_goods_bkxp_num_total c_r">0</span></td>\
                                </tr>\
                                </tbody>\
                                </table>\
                                </div>\
                                </div></div>'
                                });
                                //不可选配
                                aSellQuoteCreateSettingChosenHtml += '<div class="ven_sell_quote_create_choose_setting_one_box_list" settingid="' + data['id'] + '" optionaltype="2">\
                                <div class="container">\
                                <div class="table-container">\
                                <table>\
                                <thead class="' + (i == 0 ? '' : 'none') + '">\
                                <tr>\
                                    <th width="32">序号</th>\
                                    <th width="100">整机商品名称</th>\
                                    <th width="120">整机商品编号</th>\
                                    <th width="56">基本单位</th>\
                                    <th width="238">属性</th>\
                                    <th width="90">数量</th>\
                                    <th width="120">库存</th>\
                                    <th width="130" class="sell_quote_has_tax_hsdj">' + sellQuoteCreateHsdj + '</th>\
                                    <th width="30" class="' + sellQuoteCreateSepClass + ' sell_quote_has_tax">税率(%)</th>\
                                    <th width="85" class="' + sellQuoteCreateSepClass + ' sell_quote_has_tax">税额(元)</th>\
                                    <th width="85">总价(元)</th>\
                                    <th width="80">操作</th>\
                                </tr>\
                                </thead>\
                                <tbody>\
                                <tr settingid="' + data['id'] + '">\
                                <td width="32">' + l_dbl(i + 1) + '</td>\
                                <td width="100" class="f_color xs_xsbjs_td">' + data['name'] + '</td>\
                                <td width="120">' + data['code_sn'] + '</td>\
                                <td width="56">' + data['unit_name'] + '</td>\
                                <td width="238">' + data['attr_name'] + '</td>\
                                <td width="90">\
                                <div class="xs_num_input num_input inline_block num_input_new"><button class="but_blue but_opa_small inp_plus ven_sell_quote_create_setting_bkxp_parent_num_change_btn">+</button><input class="sell_quote_num_check lik_input_number ven_sell_quote_create_setting_bkxp_parent_num_inp" type="text" value="0" style="border:1px solid #23a2f3;"><button class="but_blue but_opa_small radius_left_0 inp_reduce ven_sell_quote_create_setting_bkxp_parent_num_change_btn">-</button></div>\
                                </td>\
                                <td width="85">当前库存：<br/ ><span class="good_cur_num">' + (proNum['cur_num']) + '</span><br />待出库：<br /><span class="good_stocking_num">' + (proNum['stocking_num']) + '</span></td>\
                                <td width="130" class="xs_goods_box" style="position: relative;"><div class="xs_goods_big_box"><div class="inline_block select_100" style="color: rgb(51, 51, 51);"><input type="text" class="sell_quote_num_check time_input lik_input_number xs_bjd_inp xs_bjd_inp_1 xs_xsbjd_inp_60 sell_quote_create_setting_cost_one_change" retail="' + data['retail_price'] + '" value="' + data['retail_price'] + '" style="color: rgb(153, 153, 153);margin-right: 10px;"></div><i class="ven_warning_arrow xs_goods_down_img ven_warning_arrow_up" style="margin: 0px; position: absolute; top: 21px; right: 13px;display:none;"></i><ul class="xs_goods_select select_list none"><li>' + data['retail_price'] + '(零售价)</li></ul></div><div class="work_vent_client_contMsgBox" style="display: none;"><i class="work_vent_client_torr"></i><div class="work_vent_client_contMsgBoxDet fnc_output_ticket_total_remain_ticket_num_list"><span class="lik_up_down_text"></span>于 ' + data['retail_price'] + '(零售价)</div></div>                                                </td>\
                                <td width="30" class="' + sellQuoteCreateSepClass + ' ven_sell_quote_tax_num sell_quote_has_tax c_y">' + taxNum + '</td>\
                                <td width="85" class="' + sellQuoteCreateSepClass + ' sell_quote_has_tax ven_sell_quote_create_setting_parent_one_cost_hsj">0</td>\
                                <td width="85" class="ven_sell_quote_create_setting_parent_one_cost_total">0</td>\
                                <td width="75"><button class="but_blue but_opa_small but_green val_dialogTop ven_sell_quote_create_choose_setting_btn" name="xg_xsbjd_xgpeizsp">+</button><button class="but_blue but_opa_small but_red sell_quote_create_setting_parent_del_btn">-</button></td>\
                                </tr>\
                                </tbody>\
                                </table>\
                                </div>\
                                </div>\
                                <div class="xs_xsbjd_table_t2">\
                                <div class="table_t2" style="position: relative;"><span class="cont_title" style="border-left: 4px solid #23a2f3;padding-left: 10px;margin-left: 0;">配件内容</span><span class="box_open_btn" style="right: 13px;">收起 <i class="right icon_show"></i></span></div>\
                                <div class="box_open_list goods_tc_toggle">\
                                ' + sellQuoteCreateSettingGoodsList + '</div>\
                                </div>\
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
            $('.tanceng .ven_sell_quote_choose_setting_hj_head').removeClass('none');
        }
        $('.tanceng .ven_sell_quote_create_choose_setting_box_list').html(aSellQuoteCreateSettingChosenHtml);
        //原有配件商品
        $.each($('.tanceng .ven_sell_quote_create_choose_setting_box_list .ven_sell_quote_create_choose_setting_kxp_list'), function (i, v) {
            $('.tanceng .ven_sell_quote_create_choose_setting_box_list .ven_sell_quote_create_choose_setting_kxp_list').eq(i).html(likSettingGoodsListArr[i]);
        });
        //原有配件商品的value值
        $.each($('.tanceng .ven_sell_quote_create_choose_setting_box_list .sell_quote_create_setting_cost_one_change'), function (i, v) {
            $('.tanceng .ven_sell_quote_create_choose_setting_box_list .sell_quote_create_setting_cost_one_change').eq(i).val(likSettingGoodsListValArr[i]);
            if ($('.tanceng .ven_sell_quote_create_choose_setting_box_list .sell_quote_create_setting_cost_one_change').eq(i).val() == '') {
                $('.tanceng .ven_sell_quote_create_choose_setting_box_list .sell_quote_create_setting_cost_one_change').eq(i).val(0);
            }
        });
        sellQuoteSettingNumTotal();
        reWriteProductNum(arr);
    });

    function reWriteProductNum(arr) {
        $.each($('.tanceng .sell_quote_num_check'), function (i, v) {
            $('.tanceng .sell_quote_num_check').eq(i).val(arr[i]);
        });
        $('.tanceng .sell_quote_num_check').trigger('keyup');
    }

//    整机商品价格下拉框点击事件
    $('.tanceng .xs_goods_select li').die('click').live('click', function () {
        var price = $(this).text().split('(')[0];
        $(this).closest('td').find('input').val(price).trigger('keyup');
    });

    //选择搭配商品
    $('.tanceng .ven_sell_quote_create_choose_setting_goods_btn').die('click').live('click', function () {
        var settingId = $(this).closest('.ven_sell_quote_create_choose_setting_one_box_list').attr('settingid');
        $('.tanceng .ven_sell_quote_create_choose_setting_child_save_btn').attr('settingsign', $(this).closest('.ven_sell_quote_create_choose_setting_one_box_list').attr('settingsign'));
        console.log(settingId);
        $.ajax({
            url: SERVER_URL + "/product-setting/loadsetting",
            type: 'get',
            data: {
                token: token,
                id: settingId,
                detail: 1
            },
            dataType: "json",
            success: function (e) {
                if (e.code == 0) {
                    var data = e.data;
                    console.log(data);
                    //整机商品编号
                    $('.tanceng .ven_sell_quote_create_choose_setting_code_sn').html(data['code_sn']);
                    //整机商品名称
                    $('.tanceng .ven_sell_quote_create_choose_setting_goods_parent_name').html(data['name']);
                    //整机类型
                    if (data['is_optional'] == 1) {
                        $('.tanceng .ven_sell_quote_create_choose_setting_is_optional').html('可选配');
                    } else if (data['is_optional'] == 2) {
                        $('.tanceng .ven_sell_quote_create_choose_setting_is_optional').html('不可选配');
                    }
                    //备注
                    $('.tanceng .ven_sell_quote_create_choose_setting_remark').html(data['remark']);
                    //选配说明
                    $('.tanceng .ven_sell_quote_create_choose_setting_introductions').html(data['introductions']);
                    var settingInfo = data['setting_info'];
                    var settingHtmlRight = '';
                    var settingCateList = '';
                    var settingGoodsList = '';
                    $.each(settingInfo, function (i, v) {
                        settingCateList += ' <li class="' + (i == 0 ? 'Sideslip_list_on' : '') + '" name="setting_good"><span>' + v['cate_name'] + '（<p class="c_g" style="display: inline;"><i class="setting_goods_chosen_num">0</i></p>/' + v['num'] + '）</span></li>';

                        var settingHtmlLeft = '';
                        $.each(v['list'], function (i2, v2) {
                            var settingGoodsAttr = '';
                            $.each(v2['attributes'], function (i3, v3) {
                                settingGoodsAttr += v3['value'] + '/';
                            });
                            settingGoodsAttr = settingGoodsAttr.slice(0, settingGoodsAttr.length - 1);
                            settingHtmlLeft += '<tr settinggoodsid="' + v2['id'] + '" settinggoodscodesn="' + v2['code_sn'] + '" settinggoodsattr="' + settingGoodsAttr + '">\
                                            <td><input class="ven_sell_quote_create_setting_list_checkbox" type="checkbox">' + settingGoodsAttr + '</td>\
                                            </tr>';
                        });

                        settingGoodsList += '<div class="table-contianer ht_base_msg" name="setting_good" ' + (i == 0 ? '' : 'style="display: none;"') + '>\
                            <table>\
                            <thead>\
                            <tr>\
                            <th><span class="vend_pj_span">' + v['cate_name'] + '</span><!--<button class="but_small inline_block zkgjssBtn right" name="cg_cgbjd_gjss">展开高级搜索</button>--></th>\
                            </tr>\
                            </thead>\
                            <!--<tbody>\
                            <tr>\
                            <td class="zkgjss_cont zkgjss_content  " name="cg_cgbjd_gjss" style="padding:0;background: #f5f6fa;">\
                            <div style="overflow: hidden;">\
                            <div class="zkgjjss_value zkgjjss_value1">\
                            <div class="zkgjjss_value_left">品牌</div>\
                            <div class="zkgjjss_value_right">\
                            <div class="inline_block select_mormal select_p">\
                            <input type="text" class="select_input block" value="供货商来源">\
                            <i></i>\
                            <ul class="select_list pur_supplier_come_from_ul sbar" style="display: none;">\
                            <li>未知</li>\
                            <li>线上资源</li>\
                            <li>登门拜访</li>\
                            <li>陌生拜访</li>\
                            <li>招商资源</li>\
                            <li>公司资源</li>\
                            <li>个人资源</li>\
                            <li>电话资源</li>\
                            </ul>\
                            </div>\
                            </div>\
                            </div>\
                            </div>\
                            <div class="zkggss_delete right">\
                            <span class="c_r">清除选择</span>\
                            </div>\
                            </td>\
                            </tr></tbody>-->\
                            <tbody>' + settingHtmlLeft + '</tbody>\
                            </table>\
                            </div>';
                    });
                    $('.tanceng .pro_complete_cate_list_ul').html(settingCateList);
                    $('.tanceng .sell_quote_setting_goods_list_wrap').html(settingGoodsList);
                } else {
                    alert(e.msg);
                }
            },
            error: function (data) {
                alert(data);
            }
        });
    });
    $('.tanceng .ven_sell_quote_create_setting_list_checkbox').die('click').live('click', function () {
        $('.tanceng .pro_complete_cate_list_ul li.Sideslip_list_on .setting_goods_chosen_num').html($(this).closest('tbody').find('input:checkbox:checked').length);
    });
    //tbody中tr序号
    function tbodyTrSortFn() {
        $.each($('.tanceng .ven_sell_quote_create_setting_list_right tbody tr'), function (i, v) {
            $('.tanceng .ven_sell_quote_create_setting_list_right tbody tr').eq(i).find('td').eq(0).html(l_dbl($('.tanceng .ven_sell_quote_create_setting_list_right tbody tr').eq(i).index() + 1))
        });
    }

    //配件商品显示隐藏
    function settingChildShowFn() {
        $.each($('.tanceng .ven_sell_quote_create_setting_list_right .box_Open'), function (i, v) {
            if ($('.tanceng .ven_sell_quote_create_setting_list_right .box_Open').eq(i).find('tbody tr').length > 0) {
                $('.tanceng .ven_sell_quote_create_setting_list_right .box_Open').eq(i).removeClass('none');
            } else {
                $('.tanceng .ven_sell_quote_create_setting_list_right .box_Open').eq(i).addClass('none');
            }
        });
        if ($('.tanceng .ven_sell_quote_create_setting_list_right .box_Open').length == $('.tanceng .ven_sell_quote_create_setting_list_right .box_Open.none').length) {
            $('.tanceng .ven_sell_quote_create_setting_list_right').addClass('none');
        } else {
            $('.tanceng .ven_sell_quote_create_setting_list_right').removeClass('none');
        }
    }

    //删除配件商品
    $('.tanceng .ven_sell_quote_create_setting_list_right .ven_sell_quote_create_setting_list_right_del_btn').die('click').live('click', function () {
        var index = $(this).closest('tr').attr('index');
        var curTbodySign = $(this).closest('tbody').attr('settingsign');
        $('.tanceng .ven_sell_quote_create_setting_list_left .' + curTbodySign).find('input:checkbox').eq(index).attr('checked', false);
        $(this).closest('tr').remove();
        settingChildShowFn();
        tbodyTrSortFn();
    });
    //选择搭配商品保存
    $('.tanceng .ven_sell_quote_create_choose_setting_child_save_btn').die('click').live('click', function () {
        var settingChildKxpGoodsArr = [];
        var taxNum = 0;
        var sellQuoteCreateSepClass = "";
        var sellQuoteCreateHsdj = "";
        if ($('.tanceng .ven_sell_quote_create_tax_num_inp').val() == '含税17%') {
            taxNum = 17;
            $('.tanceng .sell_quote_has_tax_hsdj').text('含税单价');
            sellQuoteCreateHsdj = '含税单价';
            sellQuoteCreateSepClass = "";
        } else if ($('.tanceng .ven_sell_quote_create_tax_num_inp').val() == '无税') {
            taxNum = 0;
            $('.tanceng .sell_quote_has_tax_hsdj').text('单价');
            sellQuoteCreateHsdj = '单价';
            sellQuoteCreateSepClass = "none";
        }
        var setParentSign = $(this).attr('settingsign');
        $.each($('.tanceng .sell_quote_setting_goods_list_wrap>div'), function (i, v) {
            if ($('.tanceng .sell_quote_setting_goods_list_wrap>div').eq(i).find('input:checkbox:checked').length > 0) {
                var goodsChildArr = [];
                $.each($('.tanceng .sell_quote_setting_goods_list_wrap>div').eq(i).find('input:checkbox:checked'), function (i2, v2) {
                    //goodsArr.push($('.tanceng .sell_quote_setting_goods_list_wrap>div').eq(i).find('input:checkbox:checked').eq(i2).closest('tr').attr('settinggoodsid'))
                    goodsChildArr.push({
                        goodsid: $('.tanceng .sell_quote_setting_goods_list_wrap>div').eq(i).find('input:checkbox:checked').eq(i2).closest('tr').attr('settinggoodsid'),
                        goodscodesn: $('.tanceng .sell_quote_setting_goods_list_wrap>div').eq(i).find('input:checkbox:checked').eq(i2).closest('tr').attr('settinggoodscodesn'),
                        goodsattr: $('.tanceng .sell_quote_setting_goods_list_wrap>div').eq(i).find('input:checkbox:checked').eq(i2).closest('tr').attr('settinggoodsattr'),
                        goodsnum: 0
                    })
                });
                settingChildKxpGoodsArr.push({
                    catename: $('.tanceng .sell_quote_setting_goods_list_wrap>div').eq(i).find('.vend_pj_span').text(),
                    goodschildren: goodsChildArr
                });
            } else {
                return true;
            }
        });
        console.log(settingChildKxpGoodsArr);


        /*$.each($('.tanceng .ven_sell_quote_create_setting_list_right tbody'), function (i, v) {
         if ($('.tanceng .ven_sell_quote_create_setting_list_right tbody').eq(i).find('tr').length != 0) {
         var goodsChildArr = [];
         $.each($('.tanceng .ven_sell_quote_create_setting_list_right tbody').eq(i).find('tr'), function (i2, v2) {
         goodsChildArr.push({
         goodsid: $('.tanceng .ven_sell_quote_create_setting_list_right tbody').eq(i).find('tr').eq(i2).attr('settinggoodsid'),
         goodscodesn: $('.tanceng .ven_sell_quote_create_setting_list_right tbody').eq(i).find('tr').eq(i2).attr('settinggoodscodesn'),
         goodsattr: $('.tanceng .ven_sell_quote_create_setting_list_right tbody').eq(i).find('tr').eq(i2).attr('settinggoodsattr')
         })
         });
         settingChildKxpGoodsArr.push({
         catename: $('.tanceng .ven_sell_quote_create_setting_list_right tbody').eq(i).attr('catename'),
         goodschildren: goodsChildArr
         });
         }
         });
         settingChildKxpGoodsArr = getJsonArr(settingChildKxpGoodsArr);*/
        var settingChildChosenHtml = '';
        console.log(settingChildKxpGoodsArr);
        $.each(settingChildKxpGoodsArr, function (i, v) {
            var settingChildGoodsHtml = '';
            var settingNumTotal = 0;
            $.each(v['goodschildren'], function (i2, v2) {
                var proNum = searchGoodsNumFn(v2['goodsid']);
                settingChildGoodsHtml += '<tr settinggoodsid="' + v2['goodsid'] + '">\
                                    <td>' + v2['goodscodesn'] + '</td>\
                                    <td>' + v2['goodsattr'] + '</td>\
                                    <td><div class="num_input inline_block num_input_new"><button class="but_grey_a but_opa_small inp_plus ven_sell_quote_setting_child_kxp_num_change_btn">+</button><input class="lik_input_number ven_sell_quote_choose_setting_kxp_child_num_inp sell_quote_num_check" type="text" value="' + v2['goodsnum'] + '"><button class="but_grey_a but_opa_small radius_left_0 inp_reduce ven_sell_quote_setting_child_kxp_num_change_btn">-</button></div></td>\
                                    <td class="ven_sell_quote_create_setting_goods_one_num_total">' + (parseFloat(v2['goodsnum']) * parseFloat($('.tanceng .ven_sell_quote_create_choose_setting_one_box_list[settingsign="' + setParentSign + '"] .ven_sell_quote_choose_setting_kxp_num').val())) + '</td>\
                                    <td>当前库存：<br/ ><span class="good_cur_num">' + (proNum['cur_num']) + '</span><br />待出库：<br /><span class="good_stocking_num">' + (proNum['stocking_num']) + '</span></td>\
                                    <td><input type="text" class="sell_quote_num_check lik_input_number time_input xs_xsbjd_inp_60 sell_quote_create_setting_child_cost_one_change" value="0" onfocus="fn_focus(this);" onblur="fn_blur(this);" style="color: rgb(204, 204, 204);"></td>\
                                    <td class="sell_quote_has_tax ' + sellQuoteCreateSepClass + ' ven_sell_quote_tax_num c_y">' + taxNum + '</td>\
                                    <td class="sell_quote_has_tax ' + sellQuoteCreateSepClass + ' sell_quote_create_setting_kxp_goods_one_cost_hsj">0</td>\
                                    <td class="sell_quote_create_setting_kxp_goods_one_cost_total">0</td>\
                                    <td><button class="but_blue but_opa_small but_green val_dialogTop ven_sell_quote_create_choose_setting_goods_btn" name="xs_bjd_xzpzsp">+</button><button class="but_opa_small but_red sell_quote_create_setting_goods_del_btn">-</button></td>\
                                    </tr>';
                settingNumTotal += parseFloat(parseFloat(v2['goodsnum']) * parseFloat($('.tanceng .ven_sell_quote_create_choose_setting_one_box_list[settingsign="' + setParentSign + '"] .ven_sell_quote_choose_setting_kxp_num').val()))
            });
            settingChildChosenHtml += '<div class="box_open_list goods_tc_toggle">\
                                    <div class="sell_quote_create_setting_goods_list" optionaltype="1">\
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
                                    <th width="70">配件库存</th>\
                                    <th width="80" class="sell_quote_has_tax_hsdj" style="width: 130px;">' + sellQuoteCreateHsdj + '</th>\
                                    <th width="70" class="sell_quote_has_tax ' + sellQuoteCreateSepClass + '">税率(%)</th>\
                                    <th width="100" class="sell_quote_has_tax ' + sellQuoteCreateSepClass + '">税额(元)</th>\
                                    <th width="70">总价(元)</th>\
                                    <th width="70">操作</th>\
                                    </tr>\
                                    </thead>\
                                    <tbody>' + settingChildGoodsHtml + '<tr class="table_total">\
                                    <td>合计</td>\
                                    <td></td>\
                                    <td></td>\
                                    <td class="ven_sell_quote_create_setting_goods_num_total">' + settingNumTotal + '</td>\
                                    <td></td>\
                                    <td></td>\
                                    <td class="sell_quote_has_tax ' + sellQuoteCreateSepClass + '"></td>\
                                    <td class="sell_quote_has_tax ' + sellQuoteCreateSepClass + '"></td>\
                                    <td class="ven_sell_quote_create_setting_goods_cost_total_hj">0</td>\
                                    <td></td>\
                                    </tr>\
                                    </tbody>\
                                    </table>\
                                    </div>\
                                    </div>\
                                    </div></div>';
        });
        $('.tanceng .ven_sell_quote_create_choose_setting_one_box_list[settingsign="' + setParentSign + '"] .ven_sell_quote_create_choose_setting_kxp_list').html(settingChildChosenHtml);
        $(this).closest('.dialog_box').remove();
        sellQuoteSettingNumTotal();
        $('.tanceng .lik_input_number').trigger('keyup');
    });

    //提交页面删除配件商品
    $('.tanceng .sell_quote_create_setting_goods_del_btn').die('click').live('click', function () {
        $(this).closest('tr').remove();
        sellQuoteCreateSettingKxpNumFn();
        sellQuoteCreateSettingKxpGoodsCostFn();
    });

    //可选配 - 单条配件改变数量
    $('.tanceng .ven_sell_quote_setting_child_kxp_num_change_btn').die('click').live('click', function () {
        /*if (parseFloat($(this).siblings('input').val()) > parseFloat($(this).siblings('input').attr('maxnum'))) {
         alert('已达到当前库存上限');
         $(this).siblings('input').val(parseFloat($(this).siblings('input').attr('maxnum')));
         return false;
         }*/
        sellQuoteCreateSettingKxpNumFn();
        sellQuoteCreateSettingKxpGoodsCostFn($(this));
        sellQuoteSettingNumTotal();
    });

    //可选配 - 单条配件input改变数量
    $('.tanceng .ven_sell_quote_choose_setting_kxp_child_num_inp').live('keyup', function () {
        /*if (parseFloat($(this).val()) > parseFloat($(this).attr('maxnum'))) {
         alert('已达到当前库存上限');
         $(this).val($(this).attr('maxnum'));
         $('.tanceng .ven_sell_quote_choose_setting_kxp_child_num_inp').trigger('keyup');
         return false;
         }*/
        sellQuoteCreateSettingKxpNumFn();
        sellQuoteCreateSettingKxpGoodsCostFn($(this));
        sellQuoteSettingNumTotal();
    });

    //可选配 - 选择配件商品 - 改变数量
    $('.tanceng .ven_sell_quote_kxp_goods_num_change_btn').die('click').live('click', function () {
        /*if (parseFloat($(this).siblings('input').val()) > parseFloat($(this).siblings('input').attr('maxnum'))) {
         alert('已达到当前库存上限');
         $(this).siblings('input').val(parseFloat($(this).siblings('input').attr('maxnum')));
         return false;
         }*/
    });

    //可选配 - 整机商品改变数量
    $('.tanceng .ven_sell_quote_setting_parent_kxp_num_change_btn').die('click').live('click', function () {
        /*if (parseFloat($(this).siblings('input').val()) > parseFloat($(this).siblings('input').attr('maxnum'))) {
         alert('已达到当前库存上限');
         $(this).siblings('input').val(parseFloat($(this).siblings('input').attr('maxnum')));
         return false;
         }*/
        sellQuoteCreateSettingKxpNumFn();
        sellQuoteCreateSettingKxpParentCostFn();
        sellQuoteCreateSettingKxpGoodsCostFn($(this));
        sellQuoteSettingNumTotal();
    });

    //可选配 - 整机商品input改变数量
    $('.tanceng .ven_sell_quote_choose_setting_kxp_num').live('keyup', function () {
        /*if (parseFloat($(this).val()) > parseFloat($(this).attr('maxnum'))) {
         alert('已达到当前库存上限');
         $(this).val($(this).attr('maxnum'));
         $('.tanceng .ven_sell_quote_choose_setting_kxp_num').trigger('keyup');
         return false;
         }*/
        sellQuoteCreateSettingKxpNumFn();
        sellQuoteCreateSettingKxpParentCostFn();
        sellQuoteCreateSettingKxpGoodsCostFn($(this));
        sellQuoteSettingNumTotal();
    });

    //可选配 - 配件内容数量控制
    function sellQuoteCreateSettingKxpNumFn() {
        //单条配件商品数量控制
        $.each($('.tanceng .ven_sell_quote_create_choose_setting_box_list .ven_sell_quote_create_setting_goods_one_num_total'), function (i, v) {
            $('.tanceng .ven_sell_quote_create_choose_setting_box_list .ven_sell_quote_create_setting_goods_one_num_total').eq(i).html(parseFloat($('.tanceng .ven_sell_quote_create_choose_setting_box_list .ven_sell_quote_create_setting_goods_one_num_total').eq(i).prev().find('input:text').val()) * parseFloat($('.tanceng .ven_sell_quote_create_choose_setting_box_list .ven_sell_quote_create_setting_goods_one_num_total').eq(i).closest('.ven_sell_quote_create_choose_setting_one_box_list').find('.ven_sell_quote_choose_setting_kxp_num').val()));
        });
        //单条配件商品数量总和控制
        $.each($('.tanceng .ven_sell_quote_create_choose_setting_box_list .ven_sell_quote_create_setting_goods_num_total'), function (i, v) {
            var total = 0;
            var settingGoodsNum = $('.tanceng .ven_sell_quote_create_choose_setting_box_list .ven_sell_quote_create_setting_goods_num_total').eq(i).closest('tbody').find('tr').find('.ven_sell_quote_create_setting_goods_one_num_total');
            $.each(settingGoodsNum, function (i2, v2) {
                total += parseFloat(settingGoodsNum.eq(i2).html());
            });
            $('.tanceng .ven_sell_quote_create_choose_setting_box_list .ven_sell_quote_create_setting_goods_num_total').eq(i).html(total);
        })
    }

    //不可选配 - 配件数量控制
    $('.tanceng .ven_sell_quote_create_setting_bkxp_parent_num_change_btn').die('click').live('click', function () {
        /*if (parseFloat($(this).siblings('input').val()) > parseFloat($(this).siblings('input').attr('maxnum'))) {
         alert('已达到当前库存上限');
         $(this).siblings('input').val(parseFloat($(this).siblings('input').attr('maxnum')));
         return false;
         }*/
        sellQuoteCreateSettingBkxpNumFn();
        sellQuoteCreateSettingParentCostFn();
        sellQuoteSettingNumTotal();
    });
    //配件单价控制
    $('.tanceng .ven_sell_quote_create_choose_setting_box_list .sell_quote_create_setting_cost_one_change').live('keyup', function () {
        sellQuoteCreateSettingParentCostFn();
        sellQuoteCreateSettingKxpParentCostFn();
        sellQuoteSettingNumTotal();
        sellQuoteCreateSettingKxpGoodsCostFn();
        if (parseFloat($(this).val()) > parseFloat($(this).attr('retail'))) {
            $(this).parent().next().addClass('ven_warning_arrow_up').css('display', '');
            $(this).closest('td').find('.lik_up_down_text').text('高');
            $(this).closest('tr').attr('lik_up_down_type', '1');
        } else if (parseFloat($(this).val()) < parseFloat($(this).attr('retail'))) {
            $(this).parent().next().removeClass('ven_warning_arrow_up').css('display', '');
            $(this).closest('td').find('.lik_up_down_text').text('低');
            $(this).closest('tr').attr('lik_up_down_type', '2');
        } else {
            $(this).parent().next().css('display', 'none');
            $(this).closest('tr').attr('lik_up_down_type', '0');
        }
    });

    //不可选配 - 配件内容数量控制
    function sellQuoteCreateSettingBkxpNumFn() {
        //单条配件商品数量控制
        $.each($('.tanceng .ven_sell_quote_create_choose_setting_box_list .ven_sell_quote_create_setting_goods_bkxp_one_num_toal'), function (i, v) {
            $('.tanceng .ven_sell_quote_create_choose_setting_box_list .ven_sell_quote_create_setting_goods_bkxp_one_num_toal').eq(i).html(parseFloat($('.tanceng .ven_sell_quote_create_choose_setting_box_list .ven_sell_quote_create_setting_goods_bkxp_one_num_toal').eq(i).prev().prev().text()) * parseFloat($('.tanceng .ven_sell_quote_create_choose_setting_box_list .ven_sell_quote_create_setting_goods_bkxp_one_num_toal').eq(i).closest('.ven_sell_quote_create_choose_setting_one_box_list').find('.ven_sell_quote_create_setting_bkxp_parent_num_inp').val()));
        });
        //单条配件商品数量总和控制
        $.each($('.tanceng .ven_sell_quote_create_choose_setting_box_list .ven_sell_quote_create_setting_goods_bkxp_num_total'), function (i, v) {
            var total = 0;
            var settingGoodsNum = $('.tanceng .ven_sell_quote_create_choose_setting_box_list .ven_sell_quote_create_setting_goods_bkxp_num_total').eq(i).closest('tbody').find('tr').find('.ven_sell_quote_create_setting_goods_bkxp_one_num_toal');
            $.each(settingGoodsNum, function (i2, v2) {
                total += parseFloat(settingGoodsNum.eq(i2).html());
            });
            $('.tanceng .ven_sell_quote_create_choose_setting_box_list .ven_sell_quote_create_setting_goods_bkxp_num_total').eq(i).html(total);
        })
    }

    $('.tanceng .ven_sell_quote_create_setting_bkxp_parent_num_inp').live('keyup', function () {
        /*if (parseFloat($(this).val()) > parseFloat($(this).attr('maxnum'))) {
         alert('已达到当前库存上限');
         $(this).val($(this).attr('maxnum'));
         $('.tanceng .ven_sell_quote_create_setting_bkxp_parent_num_inp').trigger('keyup');
         return false;
         }*/
        sellQuoteCreateSettingBkxpNumFn();
        sellQuoteCreateSettingParentCostFn();
        sellQuoteSettingNumTotal();
    });

    //不可选配 - 配件内容金额控制
    function sellQuoteCreateSettingParentCostFn() {
        //税额
        var $_settingBkxpHsj = $('.tanceng .ven_sell_quote_create_choose_setting_box_list .ven_sell_quote_create_setting_parent_one_cost_hsj');
        $.each($_settingBkxpHsj, function (i, v) {
            $_settingBkxpHsj.eq(i).html(moneyToFixed(parseFloat($_settingBkxpHsj.eq(i).closest('tr').find('.sell_quote_create_setting_cost_one_change').val()) / 1.17 * 0.17));
        });
        //总价
        var $_settingParentCostTotal = $('.tanceng .ven_sell_quote_create_choose_setting_box_list .ven_sell_quote_create_setting_parent_one_cost_total');
        $.each($_settingParentCostTotal, function (i, v) {
            $_settingParentCostTotal.eq(i).html(moneyToFixed(parseFloat($_settingParentCostTotal.eq(i).closest('tr').find('.sell_quote_create_setting_cost_one_change').val()) * parseFloat($_settingParentCostTotal.eq(i).closest('tr').find('.ven_sell_quote_create_setting_bkxp_parent_num_inp').val())));
        });
        venSellQuoteCreateProductCostTotalFn();
    }

    //可选配 - 配件内容金额控制
    function sellQuoteCreateSettingKxpParentCostFn() {
        //税额
        var $_settingBkxpHsj = $('.tanceng .ven_sell_quote_create_choose_setting_box_list .ven_sell_quote_create_setting_kxp_parent_one_cost_hsj');
        $.each($_settingBkxpHsj, function (i, v) {
            $_settingBkxpHsj.eq(i).html(moneyToFixed(parseFloat($_settingBkxpHsj.eq(i).closest('tr').find('.sell_quote_create_setting_cost_one_change').val()) / (100 + parseFloat($_settingBkxpHsj.eq(i).prev().text())) * (parseFloat($_settingBkxpHsj.eq(i).prev().text()))));
        });
        //总价
        /*var $_settingParentCostTotal = $('.tanceng .ven_sell_quote_create_choose_setting_box_list .ven_sell_quote_create_setting_kxp_parent_one_cost_total');
         $.each($_settingParentCostTotal, function (i, v) {
         $_settingParentCostTotal.eq(i).html(moneyToFixed(parseFloat($_settingBkxpHsj.eq(i).html()) * parseFloat($_settingParentCostTotal.eq(i).closest('tr').find('.ven_sell_quote_choose_setting_kxp_num').val())));
         });*/
        venSellQuoteCreateProductCostTotalFn();
    }

    //可选配 - 配件商品 改变单价
    $('.tanceng .ven_sell_quote_create_choose_setting_box_list .sell_quote_create_setting_child_cost_one_change').live('keyup', function () {
        //sellQuoteCreateSettingParentCostFn();
        //sellQuoteCreateSettingKxpParentCostFn();
        //sellQuoteSettingNumTotal();
        sellQuoteCreateSettingKxpGoodsCostFn();
    });

    //可选配 - 配件商品 改变价格
    function sellQuoteCreateSettingKxpGoodsCostFn() {
        //单条配件商品税额
        var $_settingKxpChildHsj = $('.tanceng .ven_sell_quote_create_choose_setting_one_box_list .sell_quote_create_setting_kxp_goods_one_cost_hsj');
        $.each($_settingKxpChildHsj, function (i, v) {
            $_settingKxpChildHsj.eq(i).html(moneyToFixed(parseFloat($_settingKxpChildHsj.eq(i).closest('tr').find('.sell_quote_create_setting_child_cost_one_change').val()) / (100 + parseFloat($_settingKxpChildHsj.eq(i).prev().text())) * parseFloat($_settingKxpChildHsj.eq(i).prev().text())));
        });
        //单条配件商品总价
        var $_settingKxpChildCostTotal = $('.tanceng .ven_sell_quote_create_choose_setting_one_box_list .sell_quote_create_setting_kxp_goods_one_cost_total');
        $.each($_settingKxpChildCostTotal, function (i, v) {
            $_settingKxpChildCostTotal.eq(i).html(moneyToFixed(parseFloat($('.tanceng .ven_sell_quote_create_choose_setting_one_box_list .sell_quote_create_setting_child_cost_one_change').eq(i).val()) * parseFloat($_settingKxpChildCostTotal.eq(i).closest('tr').find('.ven_sell_quote_create_setting_goods_one_num_total').html())));
        });
        //总价合计
        var $_settingKxpChildCostTotalHj = $('.tanceng .ven_sell_quote_create_choose_setting_one_box_list .ven_sell_quote_create_setting_goods_cost_total_hj');
        $.each($_settingKxpChildCostTotalHj, function (i, v) {
            var total = 0;
            $.each($_settingKxpChildCostTotalHj.eq(i).closest('tbody').find('.sell_quote_create_setting_kxp_goods_one_cost_total'), function (i2, v2) {
                total += parseFloat($_settingKxpChildCostTotalHj.eq(i).closest('tbody').find('.sell_quote_create_setting_kxp_goods_one_cost_total').eq(i2).html());
            });
            $_settingKxpChildCostTotalHj.eq(i).html(total);
        });

        //整机商品 - 价格控制
        var $_settingParentCost = $('.tanceng .ven_sell_quote_create_choose_setting_box_list .ven_sell_quote_create_setting_kxp_parent_one_cost_total');

        $.each($_settingParentCost, function (i, v) {
            var settingParentTotal = 0;
            var $_settingGoodsCost = $_settingParentCost.eq(i).closest('.ven_sell_quote_create_choose_setting_one_box_list').find('.ven_sell_quote_create_setting_goods_cost_total_hj');
            $.each($_settingGoodsCost, function (i2, v2) {
                settingParentTotal += parseFloat($_settingGoodsCost.eq(i2).text());
            });
            $_settingParentCost.eq(i).html((moneyToFixed(settingParentTotal)));
            //整机商品单件单价控制
            if ($_settingParentCost.eq(i).closest('tr').find('.ven_sell_quote_choose_setting_kxp_num').val() == 0) {
                $_settingParentCost.eq(i).closest('tr').find('.sell_quote_create_setting_cost_one_change').val(0);
                $_settingParentCost.eq(i).prev().html(0);
            } else {
                $_settingParentCost.eq(i).closest('tr').find('.sell_quote_create_setting_cost_one_change').val(moneyToFixed(parseFloat($_settingParentCost.eq(i).html()) / parseFloat($_settingParentCost.eq(i).closest('tr').find('.ven_sell_quote_choose_setting_kxp_num').val())));
                //整机商品单件税额
                //$_settingParentCost.eq(i).prev().html(parseFloat($_settingParentCost.eq(i).html()) / parseFloat($_settingParentCost.eq(i).closest('tr').find('.ven_sell_quote_choose_setting_kxp_num').val()));
            }
        });
        venSellQuoteCreateProductCostTotalFn();
        sellQuoteCreateSettingKxpParentCostFn();
        sellQuoteSettingNumTotal();
    }

    /*function sellQuoteCreateSettingKxpGoodsCostFn($el) {
     //税额
     var $_settingKxpHsj = $el.closest('tbody').find('.sell_quote_create_setting_kxp_goods_one_cost_hsj');
     $.each($_settingKxpHsj, function (i, v) {
     $_settingKxpHsj.eq(i).html(moneyToFixed(parseFloat($_settingKxpHsj.eq(i).closest('tr').find('.sell_quote_create_setting_child_cost_one_change').val()) * (100 + parseFloat($_settingKxpHsj.eq(i).prev().text())) / 100));
     });
     //总价
     var $_settingKxpCostTotal = $el.closest('tbody').find('.sell_quote_create_setting_kxp_goods_one_cost_total');
     $.each($_settingKxpCostTotal, function (i, v) {
     $_settingKxpCostTotal.eq(i).html(moneyToFixed(parseFloat($_settingKxpHsj.eq(i).html()) * parseFloat($_settingKxpCostTotal.eq(i).closest('tr').find('.ven_sell_quote_create_setting_goods_one_num_total').html())));
     });
     //总价合计
     var total = 0;
     $.each($_settingKxpCostTotal, function (i, v) {
     total += parseFloat($_settingKxpCostTotal.eq(i).html());
     });
     $el.closest('tbody').find('.ven_sell_quote_create_setting_goods_cost_total_hj').html(moneyToFixed(total));

     //整机商品 - 价格控制
     var settingParentTotal = 0;
     var $_settingGoodsCost = $el.closest('.ven_sell_quote_create_choose_setting_box_list').find('.ven_sell_quote_create_setting_goods_cost_total_hj');
     $.each($_settingGoodsCost, function (i, v) {
     settingParentTotal += parseFloat($_settingGoodsCost.eq(i).text());
     });
     $el.closest('.ven_sell_quote_create_choose_setting_one_box_list').find('.ven_sell_quote_create_setting_kxp_parent_one_cost_total').html(moneyToFixed(settingParentTotal));

     venSellQuoteCreateProductCostTotalFn();
     }*/

    //提交页面删除整机商品
    $('.tanceng .sell_quote_create_setting_parent_del_btn').die('click').live('click', function () {
        aSellQuoteCreateSettingChosen.splice($(this).closest('.ven_sell_quote_create_choose_setting_one_box_list').index(), 1);
        console.log(aSellQuoteCreateSettingChosen);
        if (aSellQuoteCreateSettingChosen.length != 0) {
            $('.tanceng .ven_sell_quote_create_chosen_setting_add_btn_tr').addClass('none');
        } else {
            $('.tanceng .ven_sell_quote_create_chosen_setting_add_btn_tr').removeClass('none');
            $('.tanceng .ven_sell_quote_choose_setting_hj_head').removeClass('none');
        }
        $(this).closest('.ven_sell_quote_create_choose_setting_one_box_list').remove();

        //第一个表头显示
        $('.tanceng .ven_sell_quote_create_choose_setting_box_list .ven_sell_quote_create_choose_setting_one_box_list:nth-of-type(1)').find('thead').eq(0).removeClass('none');
        sellQuoteCreateSettingParentNumFn();
    });
    //整机商品数量控制
    function sellQuoteCreateSettingParentNumFn() {
        var total = 0;
        $.each($('.tanceng .ven_sell_quote_create_choose_setting_box_list .ven_sell_quote_create_choose_setting_one_box_list'), function (i, v) {
            if ($('.tanceng .ven_sell_quote_create_choose_setting_box_list .ven_sell_quote_create_choose_setting_one_box_list').eq(i).find('.ven_sell_quote_create_setting_bkxp_parent_num_inp').length != 0) {
                total += parseFloat($('.tanceng .ven_sell_quote_create_choose_setting_box_list .ven_sell_quote_create_choose_setting_one_box_list').eq(i).find('.ven_sell_quote_create_setting_bkxp_parent_num_inp').val());
            } else {
                total += parseFloat($('.tanceng .ven_sell_quote_create_choose_setting_box_list .ven_sell_quote_create_choose_setting_one_box_list').eq(i).find('.ven_sell_quote_choose_setting_kxp_num').val());
            }
            $('.tanceng .ven_sell_quote_create_choose_setting_box_list .ven_sell_quote_create_choose_setting_one_box_list').eq(i).find('tbody').eq(0).find('td').eq(0).html(l_dbl(i + 1));
        });
        $('.tanceng .sell_quote_create_setting_num_total_hj').html(total);
    }

    //整机商品合计信息
    function sellQuoteSettingNumTotal() {
        //数量合计
        var total = 0;
        $.each($('.tanceng .ven_sell_quote_choose_setting_kxp_num'), function (i, v) {
            total += parseFloat($('.tanceng .ven_sell_quote_choose_setting_kxp_num').eq(i).val());
        });
        $.each($('.tanceng .ven_sell_quote_create_setting_bkxp_parent_num_inp'), function (i, v) {
            total += parseFloat($('.tanceng .ven_sell_quote_create_setting_bkxp_parent_num_inp').eq(i).val());
        });
        $('.tanceng .sell_quote_create_setting_num_total_hj').html(total);
        //金额合计
        var costTotal = 0;
        $.each($('.tanceng .ven_sell_quote_create_setting_kxp_parent_one_cost_total'), function (i, v) {
            costTotal += parseFloat($('.tanceng .ven_sell_quote_create_setting_kxp_parent_one_cost_total').eq(i).html());
        });
        $.each($('.tanceng .ven_sell_quote_create_setting_parent_one_cost_total'), function (i, v) {
            costTotal += parseFloat($('.tanceng .ven_sell_quote_create_setting_parent_one_cost_total').eq(i).html());
        });
        $('.tanceng .sell_quote_create_setting_cost_total_hj').html(costTotal);
        venSellQuoteCreateProductCostTotalFn();
    }

    //总金额计算
    function venSellQuoteCreateProductCostTotalFn() {
        var taxNum = 0;
        if ($('.tanceng .ven_sell_quote_create_tax_num_inp').val() == '含税17%') {
            taxNum = 17;
        } else if ($('.tanceng .ven_sell_quote_create_tax_num_inp').val() == '无税') {
            taxNum = 0;
        }
        //含税总价
        var total = 0;
        total = parseFloat($('.tanceng .goods_cost_total').html()) + parseFloat($('.tanceng .ven_sell_quote_create_package_cost_total').html()) + parseFloat($('.tanceng .sell_quote_create_setting_cost_total_hj').html());
        //总计金额
        $('.tanceng .ven_sell_quote_create_cost_tax_total').html(moneyToFixed(total + parseFloat($('.tanceng .sell_quote_create_other_fee').val())));
        //总价
        $('.tanceng .sell_quote_create_product_cost_total').val(moneyToFixed(total / (parseFloat(100 + taxNum) / 100)));
        //总税额
        $('.tanceng .sell_quote_create_tax_total').val(moneyToFixed(total - parseFloat($('.tanceng .sell_quote_create_product_cost_total').val())));
    }

    //修改其他费用
    $('.tanceng .sell_quote_create_other_fee').live('keyup', function () {
        //总计金额
        $('.tanceng .ven_sell_quote_create_cost_tax_total').html(moneyToFixed(parseFloat($('.tanceng .sell_quote_create_product_cost_total').val()) + parseFloat($('.tanceng .sell_quote_create_tax_total').val()) + parseFloat($('.tanceng .sell_quote_create_other_fee').val())));
    });

    //删除商品
    /*var delIndex = -1;
     $('.tanceng .ven_sell_quote_create_goods_list_del_btn').die('click').live('click', function () {
     delIndex = 0;
     });
     $('.tanceng .ven_sell_quote_create_package_list_del_btn').die('click').live('click', function () {
     delIndex = 1;
     });
     $('.tanceng .ven_sell_quote_create_setting_list_del_btn').die('click').live('click', function () {
     delIndex = 2;
     });
     $('.tanceng .xs_bjd_delete').die('click').live('click', function () {
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
     });*/

    //删除基本商品
    $('.tanceng .sell_quote_create_nav_del_goods_btn').die('click').live('click', function () {
        $(this).closest('li').css('display', 'none');
        $('.tanceng .xs_xsbjd_SPbj>div.tabcontent:nth-of-type(1)').addClass('none').html('<div class="container">\
            <div class="table-container">\
            <table>\
            <thead>\
            <tr>\
            <th width="32">序号</th>\
            <th width="100">商品名称</th>\
            <th width="120">商品编号</th>\
            <th width="220">属性</th>\
            <th width="55">基本单位</th>\
            <th width="92">数量</th>\
            <th width="105">库存</th>\
            <th width="120" class="sell_quote_has_tax_hsdj">含税单价</th>\
            <th width="30" class="sell_quote_has_tax">税率</th>\
            <th width="85" class="sell_quote_has_tax">税额(元)</th>\
            <th width="85">总价(元)</th>\
            <th width="80">操作</th>\
            </tr>\
            </thead>\
            <tbody class="ven_sell_quote_create_chosen_goods_tbody">\
            </tbody>\
            <tbody>\
            <tr class="ven_sell_quote_create_chosen_goods_add_btn_tr">\
            <td>-</td>\
            <td>\
            <button class="but_mix but_green val_dialogTop ven_sell_quote_create_choose_goods_btn" name="xg_xsbjd_xzsp">选择商品</button>\
            </td>\
            <td>-</td>\
            <td>-</td>\
            <td>-</td>\
            <td>-</td>\
            <td>-</td>\
            <td>-</td>\
            <td class="sell_quote_has_tax">-</td>\
            <td class="sell_quote_has_tax">-</td>\
            <td>-</td>\
            <td>-</td>\
            </tr>\
            <tr class="table_total">\
            <td>合计</td>\
            <td></td>\
            <td></td>\
            <td></td>\
            <td></td>\
            <td class="goods_num_total">0</td>\
            <td></td>\
            <td></td>\
            <td class="sell_quote_has_tax"></td>\
            <td class="sell_quote_has_tax"><input type="hidden" value="0" class="goods_tax_total"></td>\
            <td><span class="goods_cost_total">0</span></td>\
            <td></td>\
            </tr>\
            </tbody>\
            </table>\
            </div>\
            </div>');
        xs_sp_arr.splice(xs_sp_arr.indexOf(0), 1);
        if (xs_sp_arr.length != 0) {
            console.log(parseFloat(xs_sp_arr[0]) / 2);
            $('.tanceng .xs_xsbjd_box_ul ul li').eq(parseFloat(xs_sp_arr[0]) / 2).trigger('click');
        } else if (xs_sp_arr.length == 0) {
            $('.tanceng .xs_xsbjd_sp_box').addClass('none');
            $('.tanceng .page36_newxsbjd').css('width', '620px');
            $('.tanceng .xsbjd_new_inputbox').css('width', '100%');
            $('.tanceng .xs_xsbjd_hr1').css('display', 'inline-block');
        }
        aSellQuoteCreateGoodsChosen = [];
        venSellQuoteCreateProductCostTotalFn();
        return false;
    });

    //删除套餐商品
    $('.tanceng .sell_quote_create_nav_del_package_btn').die('click').live('click', function () {
        $(this).closest('li').css('display', 'none');

        /*<th width="60">折扣率</th>\
         <th width="100">原价</th>\*/
        $('.tanceng .xs_xsbjd_SPbj>div.tabcontent:nth-of-type(3)').addClass('none').html('<div class="ven_sell_quote_choose_package_box_list">\
        </div>\
        <div class="container">\
            <div class="table-container">\
            <table>\
            <thead class="ven_sell_quote_choose_package_hj_head">\
            <tr>\
            <th width="50">序号</th>\
            <th width="160">套餐商品名称</th>\
            <th width="160">商品编号</th>\
            <th width="130">数量</th>\
            <th width="170">单价</th>\
            <th width="50">税率</th>\
            <th width="110">税额(元)</th>\
            <th width="110">总价(元)</th>\
            <th width="80">操作</th>\
            </tr>\
            </thead>\
            <tbody>\
            <tr class="xs_TC ven_sell_quote_create_chosen_package_add_btn_tr" style="border-bottom: none;">\
            <td width="50" style="border-bottom: none;">-</td>\
            <td width="160">\
            <button class="but_mix but_green val_dialogTop ven_sell_quote_create_choose_package_btn" name="xg_xsbjd_xzspTC">选择套餐商品</button>\
            </td>\
            <td width="160">-</td>\
            <td width="130">-</td>\
            <td width="170">-</td>\
            <td width="50" style="border-bottom: none;">-</td>\
            <td width="110">-</td>\
            <td width="110">-</td>\
            <td width="80" style="border-bottom: none;">-</td>\
            </tr>\
            <tr class="table_total" style="border-top:1px solid #e6e6e6;">\
            <td width="50">合计</td>\
            <td width="160"></td>\
            <td width="160"></td>\
            <td width="130" class="ven_sell_quote_create_package_num_total">0</td>\
            <td width="170"></td>\
            <td width="50"></td>\
            <td width="110"></td>\
            <td width="110" class="ven_sell_quote_create_package_cost_total">0</td>\
            <td width="80"></td>\
            </tr>\
            </tbody>\
            </table>\
            </div>\
            </div>');
        xs_sp_arr.splice(xs_sp_arr.indexOf(4), 1);
        if (xs_sp_arr.length != 0) {
            $('.tanceng .xs_xsbjd_box_ul ul li').eq(parseFloat(xs_sp_arr[0]) / 2).trigger('click');
        } else if (xs_sp_arr.length == 0) {
            $('.tanceng .xs_xsbjd_sp_box').addClass('none');
            $('.tanceng .page36_newxsbjd').width(620).height('67%');
            $('.tanceng .xsbjd_new_inputbox').css('width', '100%');
            $('.tanceng .xs_xsbjd_hr1').css('display', 'inline-block');
        }
        aSellQuoteCreatePackageChosen = [];
        venSellQuoteCreateProductCostTotalFn();
        return false;
    });

    //删除整机商品
    $('.tanceng .sell_quote_create_nav_del_setting_btn').die('click').live('click', function () {
        $(this).closest('li').css('display', 'none');
        $('.tanceng .xs_xsbjd_SPbj>div.tabcontent:nth-of-type(2)').addClass('none').html('<div class="ven_sell_quote_create_choose_setting_box_list">\
            </div>\
            <div class="container">\
            <div class="table-container">\
            <table>\
            <thead class="ven_sell_quote_choose_setting_hj_head">\
            <tr>\
            <th width="32">序号</th>\
            <th width="100">整机商品名称</th>\
            <th width="120">整机商品编号</th>\
            <th width="55">基本单位</th>\
            <th width="238">属性</th>\
            <th width="85">数量</th>\
            <th width="120">库存</th>\
            <th width="130" class="sell_quote_has_tax_hsdj">含税单价</th>\
            <th width="30" class="sell_quote_has_tax">税率</th>\
            <th width="85" class="sell_quote_has_tax">税额(元)</th>\
            <th width="85">总价(元)</th>\
            <th width="80">操作</th>\
            </tr>\
            </thead>\
            <tbody>\
            <tr class="ven_sell_quote_create_chosen_setting_add_btn_tr">\
            <td width="30">-</td>\
            <td width="140">\
            <button class="but_mix but_green val_dialogTop ven_sell_quote_create_choose_setting_btn" name="xg_xsbjd_xgpeizsp">选择整机商品</button>\
            </td>\
            <td width="120">-</td>\
            <td width="60">-</td>\
            <td width="195">-</td>\
            <td width="110">-</td>\
            <td width="130">-</td>\
            <td width="130">-</td>\
            <td width="30" class="sell_quote_has_tax">-</td>\
            <td width="85" class="sell_quote_has_tax">-</td>\
            <td width="55">-</td>\
            <td width="80">-</td>\
            </tr>\
            <tr class="table_total" style="border-top:1px solid #e6e6e6;">\
            <td width="30">合计</td>\
            <td width="125"></td>\
            <td width="120"></td>\
            <td width="60"></td>\
            <td width="195"></td>\
            <td width="110" class="sell_quote_create_setting_num_total_hj">0</td>\
            <td width="195"></td>\
            <td width="130"></td>\
            <td width="30" class="sell_quote_has_tax"></td>\
            <td width="85" class="sell_quote_has_tax"></td>\
            <td width="55" class="sell_quote_create_setting_cost_total_hj">0</td>\
            <td width="80"></td>\
            </tr>\
            </tbody>\
            </table>\
            </div>\
            </div>');
        xs_sp_arr.splice(xs_sp_arr.indexOf(2), 1);
        if (xs_sp_arr.length != 0) {
            $('.tanceng .xs_xsbjd_box_ul ul li').eq(parseFloat(xs_sp_arr[0]) / 2).trigger('click');
        } else if (xs_sp_arr.length == 0) {
            $('.tanceng .xs_xsbjd_sp_box').addClass('none');
            $('.tanceng .page36_newxsbjd').css('width', '620px');
            $('.tanceng .xsbjd_new_inputbox').css('width', '100%');
            $('.tanceng .xs_xsbjd_hr1').css('display', 'inline-block');
        }
        aSellQuoteCreateSettingChosen = [];
        venSellQuoteCreateProductCostTotalFn();
        return false;
    });


    //切换含税状态
    $('.tanceng .ven_sell_quote_create_change_tax_ul li').die('click').live('click', function () {
        if ($(this).text() == '含税17%') {
            $('.tanceng .ven_sell_quote_tax_num').html('17');
            $('.tanceng .sell_quote_has_tax').removeClass('none');
            $('.tanceng .sell_quote_has_tax_hsdj').text('含税单价');
        } else if ($(this).text() == '无税') {
            $('.tanceng .ven_sell_quote_tax_num').html('0');
            $('.tanceng .sell_quote_has_tax').addClass('none');
            $('.tanceng .sell_quote_has_tax_hsdj').text('单价');
        }
        $('.tanceng .lik_input_number').trigger('keyup');
    });

    //提交审批
    $('.tanceng .ven_sell_quote_create_submit').die('click').live('click', function () {
        sellQuoteCreateData.is_draft = 0;
        //必填字段
        //客户
        if ($('.tanceng .ven_sell_quote_create_choose_customer_inp').val() == '请选择客户') {
            alert('请选择客户');
            return false;
        }
        //账户
        if ($('.tanceng .ven_sell_quote_create_choose_account').val() == '请选择账户') {
            alert('请选择账户');
            return false;
        }
        //物流方式
        if ($('.tanceng .ven_sell_quote_create_choose_logistics_inp').val() == '请选择物流方式') {
            alert('请选择物流方式');
            return false;
        }
        var onOff = false;
        $.each($('.tanceng .sell_quote_num_check'), function (i, v) {
            if ($('.tanceng .sell_quote_num_check').eq(i).val() == 0) {
                //alert('请完善商品数量');
                onOff = false;
                return false;
            } else {
                onOff = true;
            }
        });
        if (onOff) {
            sellQuoteCreateSubmitFn();
        } else {
            alert('请选择商品或完善商品信息');
        }
    });
    //保存草稿
    $('.tanceng .ven_sell_quote_create_submit_draft').die('click').live('click', function () {
        sellQuoteCreateData.is_draft = 1;
        sellQuoteCreateSubmitFn();
    });

    //新建报价单 - 提交函数
    function sellQuoteCreateSubmitFn() {
        //报价单编号
        sellQuoteCreateData.code_sn = $('.tanceng .ven_sell_quote_create_code').val();
        //税率
        if ($('.tanceng .ven_sell_quote_create_tax_num_inp').val() == '含税17%') {
            sellQuoteCreateData.tax_rate = 1;
        } else if ($('.tanceng .ven_sell_quote_create_tax_num_inp').val() == '无税') {
            sellQuoteCreateData.tax_rate = 0;
        }
        //是否包运费
        if ($('.tanceng .ven_sell_quote_create_freight_checkbox').is(':checked')) {
            sellQuoteCreateData.is_freight = 1;
        } else {
            sellQuoteCreateData.is_freight = 0;
        }
        //控货方式
        if ($('.tanceng .ven_sell_quote_create_ctr_type_checkbox').is(':checked')) {
            sellQuoteCreateData.ctr_type = 1;
        } else {
            sellQuoteCreateData.ctr_type = 2;
        }
        //有效期
        sellQuoteCreateData.expiry_day = $('.tanceng .ven_sell_quote_create_deadline').val();

        //基本商品信息
        var goodsArr = [];
        var goodsJson = {};
        var $_goodsTr = $('.tanceng .ven_sell_quote_create_chosen_goods_tbody tr');
        $.each($_goodsTr, function (i, v) {
            goodsArr.push({
                "good_id": $_goodsTr.eq(i).attr('goodsid'),
                "up_down": $_goodsTr.eq(i).attr('lik_up_down_type'),
                "good_name": $_goodsTr.eq(i).find('td').eq(1).text(),
                "good_sn": $_goodsTr.eq(i).find('td').eq(2).text(),
                "good_attr": $_goodsTr.eq(i).find('td').eq(3).text(),
                "good_unit": $_goodsTr.eq(i).find('td').eq(4).text(),
                "good_num": $_goodsTr.eq(i).find('td').eq(5).find('input.productnum').val(),
                "good_cur_num": $_goodsTr.eq(i).find('td').eq(6).find('.good_cur_num').text(),
                "good_stocking_out_num": $_goodsTr.eq(i).find('td').eq(6).find('.good_stocking_num').text(),
                "good_price": $_goodsTr.eq(i).find('td').eq(7).find('input.ven_sell_quote_goods_cost_one').val(),
                "good_retail_price": $_goodsTr.eq(i).find('td').eq(7).find('input.ven_sell_quote_goods_cost_one').attr('retail'),
                "good_rate": $_goodsTr.eq(i).find('td').eq(8).text(),
                "good_rate_price": $_goodsTr.eq(i).find('td').eq(8).text() == 0 ? 0 : ($_goodsTr.eq(i).find('td').eq(9).text()),
                "good_total": $_goodsTr.eq(i).find('td').eq(10).text()
            });
        });
        goodsJson.goods = goodsArr;
        goodsJson.sum_num = $('.tanceng .goods_num_total').text();
        goodsJson.sum_total = $('.tanceng .goods_cost_total').text();
        if (goodsArr.length == 0) {
            sellQuoteCreateData.goods = '';
        } else {
            sellQuoteCreateData.goods = JSON.stringify(goodsJson);
        }

        //套餐商品信息
        var packageArr = [];
        var packageJson = {};
        var $_packageBox = $('.tanceng .ven_sell_quote_choose_package_box_list .ven_sell_quote_choose_package_one_box_list');
        $.each($_packageBox, function (i, v) {
            //套餐子商品信息
            var packageGoodsArr = [];
            $.each($_packageBox.eq(i).find('.xs_xsbjd_table_t2 .sell_quote_create_package_goods_list'), function (i2, v2) {
                var packageGoodsChild = [];
                $.each($_packageBox.eq(i).find('.xs_xsbjd_table_t2 .sell_quote_create_package_goods_list').eq(i2).find('tbody tr:not(".table_total")'), function (i3, v3) {
                    packageGoodsChild.push({
                        "good_id": $_packageBox.eq(i).find('.xs_xsbjd_table_t2 .sell_quote_create_package_goods_list').eq(i2).find('tbody tr:not(".table_total")').eq(i3).attr('packageid'),
                        "good_sn": $_packageBox.eq(i).find('.xs_xsbjd_table_t2 .sell_quote_create_package_goods_list').eq(i2).find('tbody tr:not(".table_total")').eq(i3).find('td').eq(0).text(),
                        "good_attr": $_packageBox.eq(i).find('.xs_xsbjd_table_t2 .sell_quote_create_package_goods_list').eq(i2).find('tbody tr:not(".table_total")').eq(i3).find('td').eq(1).text(),
                        "sing_num": $_packageBox.eq(i).find('.xs_xsbjd_table_t2 .sell_quote_create_package_goods_list').eq(i2).find('tbody tr:not(".table_total")').eq(i3).find('td').eq(2).text(),
                        "total_num": $_packageBox.eq(i).find('.xs_xsbjd_table_t2 .sell_quote_create_package_goods_list').eq(i2).find('tbody tr:not(".table_total")').eq(i3).find('td').eq(3).text()
                    });
                });
                packageGoodsArr.push({
                    "title": $_packageBox.eq(i).find('.xs_xsbjd_table_t2 .sell_quote_create_package_goods_list').eq(i2).find('p span').text(),
                    "attr_list": packageGoodsChild,
                    "sum_num": $_packageBox.eq(i).find('.xs_xsbjd_table_t2 .sell_quote_create_package_goods_list').eq(i2).find('.sell_quote_create_package_child_one_num_total').text()
                });
            });
            packageArr.push({
                "package_id": $_packageBox.eq(i).find('tbody').eq(0).find('tr').attr('packageid'),
                "package_name": $_packageBox.eq(i).find('tbody').eq(0).find('tr td').eq(1).text(),
                "package_sn": $_packageBox.eq(i).find('tbody').eq(0).find('tr td').eq(2).text(),
                "package_num": $_packageBox.eq(i).find('tbody').eq(0).find('tr td').eq(3).find('input.sell_quote_create_package_num').val(),
                "package_price": $_packageBox.eq(i).find('tbody').eq(0).find('tr td').eq(4).find('input.sell_quote_create_package_cost_one_change').val(),
                "package_rate": $_packageBox.eq(i).find('tbody').eq(0).find('tr td').eq(5).text(),
                "package_rate_price": $_packageBox.eq(i).find('tbody').eq(0).find('tr td').eq(6).text(),
                "package_total": $_packageBox.eq(i).find('tbody').eq(0).find('tr td').eq(7).text(),
                "good_list": packageGoodsArr
            });
        });
        packageJson.package = packageArr;
        packageJson.sum_num = $('.tanceng .ven_sell_quote_create_package_num_total').text();
        packageJson.sum_total = $('.tanceng .ven_sell_quote_create_package_cost_total').text();
        if (packageArr.length == 0) {
            sellQuoteCreateData.package = '';
        } else {
            sellQuoteCreateData.package = JSON.stringify(packageJson);
        }

        //整机商品
        var settingArr = [];
        var settingJson = {};
        var $_settingBox = $('.tanceng .ven_sell_quote_create_choose_setting_box_list .ven_sell_quote_create_choose_setting_one_box_list');
        $.each($_settingBox, function (i, v) {
            //整机子商品信息
            var settingGoodsArr = [];
            $.each($_settingBox.eq(i).find('.xs_xsbjd_table_t2 .sell_quote_create_setting_goods_list'), function (i2, v2) {
                var settingGoodsChild = [];
                if ($_settingBox.eq(i).find('.xs_xsbjd_table_t2 .sell_quote_create_setting_goods_list').eq(i2).attr('optionaltype') == 1) {
                    //可选配
                    $.each($_settingBox.eq(i).find('.xs_xsbjd_table_t2 .sell_quote_create_setting_goods_list').eq(i2).find('tbody tr:not(".table_total")'), function (i3, v3) {
                        settingGoodsChild.push({
                            "good_id": $_settingBox.eq(i).find('.xs_xsbjd_table_t2 .sell_quote_create_setting_goods_list').eq(i2).find('tbody tr:not(".table_total")').eq(i3).attr('settinggoodsid'),
                            "good_sn": $_settingBox.eq(i).find('.xs_xsbjd_table_t2 .sell_quote_create_setting_goods_list').eq(i2).find('tbody tr:not(".table_total")').eq(i3).find('td').eq(0).text(),
                            "good_attr": $_settingBox.eq(i).find('.xs_xsbjd_table_t2 .sell_quote_create_setting_goods_list').eq(i2).find('tbody tr:not(".table_total")').eq(i3).find('td').eq(1).text(),
                            "sing_num": $_settingBox.eq(i).find('.xs_xsbjd_table_t2 .sell_quote_create_setting_goods_list').eq(i2).find('tbody tr:not(".table_total")').eq(i3).find('td').eq(2).find('input.ven_sell_quote_choose_setting_kxp_child_num_inp').val(),
                            "total_num": $_settingBox.eq(i).find('.xs_xsbjd_table_t2 .sell_quote_create_setting_goods_list').eq(i2).find('tbody tr:not(".table_total")').eq(i3).find('td').eq(3).text(),
                            "good_cur_num": $_settingBox.eq(i).find('.xs_xsbjd_table_t2 .sell_quote_create_setting_goods_list').eq(i2).find('tbody tr:not(".table_total")').eq(i3).find('td').eq(4).find('.good_cur_num').text(),
                            "good_stocking_out_num": $_settingBox.eq(i).find('.xs_xsbjd_table_t2 .sell_quote_create_setting_goods_list').eq(i2).find('tbody tr:not(".table_total")').eq(i3).find('td').eq(4).find('.good_stocking_num').text(),
                            "good_price": $_settingBox.eq(i).find('.xs_xsbjd_table_t2 .sell_quote_create_setting_goods_list').eq(i2).find('tbody tr:not(".table_total")').eq(i3).find('td').eq(5).find('input').val(),
                            "good_rate": $_settingBox.eq(i).find('.xs_xsbjd_table_t2 .sell_quote_create_setting_goods_list').eq(i2).find('tbody tr:not(".table_total")').eq(i3).find('td').eq(6).text(),
                            "good_rate_price": $_settingBox.eq(i).find('.xs_xsbjd_table_t2 .sell_quote_create_setting_goods_list').eq(i2).find('tbody tr:not(".table_total")').eq(i3).find('td').eq(6).text() == 0 ? 0 : ($_settingBox.eq(i).find('.xs_xsbjd_table_t2 .sell_quote_create_setting_goods_list').eq(i2).find('tbody tr:not(".table_total")').eq(i3).find('td').eq(7).text()),
                            "good_total": $_settingBox.eq(i).find('.xs_xsbjd_table_t2 .sell_quote_create_setting_goods_list').eq(i2).find('tbody tr:not(".table_total")').eq(i3).find('td').eq(8).text()
                        });
                    });
                    settingGoodsArr.push({
                        "title": $_settingBox.eq(i).find('.xs_xsbjd_table_t2 .sell_quote_create_setting_goods_list').eq(i2).find('p span').text(),
                        "attr_list": settingGoodsChild,
                        "sum_num": $_settingBox.eq(i).find('.xs_xsbjd_table_t2 .sell_quote_create_setting_goods_list').eq(i2).find('.ven_sell_quote_create_setting_goods_num_total').text(),
                        "sum_total": $_settingBox.eq(i).find('.xs_xsbjd_table_t2 .sell_quote_create_setting_goods_list').eq(i2).find('.ven_sell_quote_create_setting_goods_cost_total_hj').text()
                    });
                } else if ($_settingBox.eq(i).find('.xs_xsbjd_table_t2 .sell_quote_create_setting_goods_list').eq(i2).attr('optionaltype') == 2) {
                    //不可选配
                    $.each($_settingBox.eq(i).find('.xs_xsbjd_table_t2 .sell_quote_create_setting_goods_list').eq(i2).find('tbody tr:not(".table_total")'), function (i3, v3) {
                        settingGoodsChild.push({
                            "good_id": $_settingBox.eq(i).find('.xs_xsbjd_table_t2 .sell_quote_create_setting_goods_list').eq(i2).find('tbody tr:not(".table_total")').eq(i3).attr('settinggoodsid'),
                            "good_sn": $_settingBox.eq(i).find('.xs_xsbjd_table_t2 .sell_quote_create_setting_goods_list').eq(i2).find('tbody tr:not(".table_total")').eq(i3).find('td').eq(0).text(),
                            "good_attr": $_settingBox.eq(i).find('.xs_xsbjd_table_t2 .sell_quote_create_setting_goods_list').eq(i2).find('tbody tr:not(".table_total")').eq(i3).find('td').eq(1).text(),
                            "sing_num": $_settingBox.eq(i).find('.xs_xsbjd_table_t2 .sell_quote_create_setting_goods_list').eq(i2).find('tbody tr:not(".table_total")').eq(i3).find('td').eq(2).text(),
                            "good_cur_num": $_settingBox.eq(i).find('.xs_xsbjd_table_t2 .sell_quote_create_setting_goods_list').eq(i2).find('tbody tr:not(".table_total")').eq(i3).find('td').eq(3).find('.good_cur_num').text(),
                            "good_stocking_out_num": $_settingBox.eq(i).find('.xs_xsbjd_table_t2 .sell_quote_create_setting_goods_list').eq(i2).find('tbody tr:not(".table_total")').eq(i3).find('td').eq(3).find('.good_stocking_num').text(),
                            "total_num": $_settingBox.eq(i).find('.xs_xsbjd_table_t2 .sell_quote_create_setting_goods_list').eq(i2).find('tbody tr:not(".table_total")').eq(i3).find('td').eq(4).text()
                        });
                    });
                    settingGoodsArr.push({
                        "title": $_settingBox.eq(i).find('.xs_xsbjd_table_t2 .sell_quote_create_setting_goods_list').eq(i2).find('p span').text(),
                        "attr_list": settingGoodsChild,
                        "sum_num": $_settingBox.eq(i).find('.xs_xsbjd_table_t2 .sell_quote_create_setting_goods_list').eq(i2).find('.ven_sell_quote_create_setting_goods_bkxp_num_total').text()
                    });
                }
            });
            settingArr.push({
                "setting_id": $_settingBox.eq(i).find('tbody').eq(0).find('tr').attr('settingid'),
                "optional": $_settingBox.eq(i).attr('optionaltype'),
                "up_down": $_settingBox.eq(i).find('tbody').eq(0).find('tr').attr('lik_up_down_type'),
                "setting_name": $_settingBox.eq(i).find('tbody').eq(0).find('tr').find('td').eq(1).text(),
                "setting_sn": $_settingBox.eq(i).find('tbody').eq(0).find('tr').find('td').eq(2).text(),
                "setting_unit": $_settingBox.eq(i).find('tbody').eq(0).find('tr').find('td').eq(3).text(),
                "setting_attr": $_settingBox.eq(i).find('tbody').eq(0).find('tr').find('td').eq(4).text(),
                "setting_num": ($_settingBox.eq(i).find('tbody').eq(0).find('tr').find('td').eq(5).find('input.ven_sell_quote_create_setting_bkxp_parent_num_inp').val()) ? ($_settingBox.eq(i).find('tbody').eq(0).find('tr').find('td').eq(5).find('input.ven_sell_quote_create_setting_bkxp_parent_num_inp').val()) : ($_settingBox.eq(i).find('tbody').eq(0).find('tr').find('td').eq(5).find('input.ven_sell_quote_choose_setting_kxp_num').val()),
                "setting_cur_num": $_settingBox.eq(i).find('tbody').eq(0).find('tr').find('td').eq(6).find('.good_cur_num').text(),
                "setting_stocking_out_num": $_settingBox.eq(i).find('tbody').eq(0).find('tr').find('td').eq(6).find('.good_stocking_num').text(),
                "setting_price": $_settingBox.eq(i).find('tbody').eq(0).find('tr').find('td').eq(7).find('input.sell_quote_create_setting_cost_one_change').val(),
                "setting_retail_price": $_settingBox.eq(i).find('tbody').eq(0).find('tr').find('td').eq(7).find('input.sell_quote_create_setting_cost_one_change').attr('retail'),
                "setting_rate": $_settingBox.eq(i).find('tbody').eq(0).find('tr').find('td').eq(8).text(),
                "setting_rate_price": $_settingBox.eq(i).find('tbody').eq(0).find('tr').find('td').eq(8).text() == 0 ? 0 : ($_settingBox.eq(i).find('tbody').eq(0).find('tr').find('td').eq(9).text()),
                "setting_total": $_settingBox.eq(i).find('tbody').eq(0).find('tr').find('td').eq(10).text(),
                "good_list": settingGoodsArr
            })
        });
        settingJson.setting = settingArr;
        settingJson.sum_num = $('.tanceng .sell_quote_create_setting_num_total_hj').text();
        settingJson.sum_total = $('.tanceng .sell_quote_create_setting_cost_total_hj').text();
        if (settingArr.length == 0) {
            sellQuoteCreateData.setting = '';
        } else {
            sellQuoteCreateData.setting = JSON.stringify(settingJson);
        }
        //备注
        if ($('.tanceng .ven_sell_quote_create_note_textarea').val() == '请输入备注') {
            sellQuoteCreateData.note = '';
        } else {
            sellQuoteCreateData.note = $('.tanceng .ven_sell_quote_create_note_textarea').val();
        }
        //商品合计
        sellQuoteCreateData.money_sum = $('.tanceng .sell_quote_create_product_cost_total').val();
        //合计税额
        sellQuoteCreateData.tax_money_sum = $('.tanceng .sell_quote_create_tax_total').val();
        //其他费用
        sellQuoteCreateData.other_free = $('.tanceng .sell_quote_create_other_fee').val();
        //总计金额
        sellQuoteCreateData.totals = $('.tanceng .ven_sell_quote_create_cost_tax_total').html();
        /*if (goodsArr.length == 0 && packageArr.length == 0 && settingArr.length == 0) {
         alert('请选择商品');
         return false;
         }*/
        //审批人
        flowChosenArr = [];
        if ($('.tanceng .ven_sell_quote_create_flow_list li').length == 0) {
            alert('请选择审批人');
            return false;
        } else {
            var $_flowList = $('.tanceng .ven_sell_quote_create_flow_list li');
            $.each($_flowList, function (i, v) {
                flowChosenArr.push($_flowList.eq(i).attr('flowid'));
            });
        }
        sellQuoteCreateData.flow = flowChosenArr.join(',');

        console.log(sellQuoteCreateData);
        $.ajax({
            url: SERVER_URL + "/quote/add",
            type: 'POST',
            data: sellQuoteCreateData,
            dataType: 'json',
            success: function (e) {
                if (e.code == 0) {
                    $(this).closest('.dialog_box').remove();
                    $('.tanceng').css('display', 'none').children().remove();
                    getSellQuoteList('/quote/list');
                }
            },
            error: function (data) {
                alert(data);
            }
        });
    }

    //编辑销售报价单
    $('.lik_sell_quote_edit_btn').die('click').live('click', function () {
        sellQuoteCurrentId = $(this).closest('tr').attr('vensellquoteid');
        sellQuoteCreateData.quote_id = sellQuoteCurrentId;
        xs_sp_arr = [];
        $(".page_108_shdSP").addClass("none");
        //清空商品数组
        aSellQuoteCreateGoodsChosen = [];
        aSellQuoteCreatePackageChosen = [];
        aSellQuoteCreateSettingChosen = [];
        sellQuoteEditFn(sellQuoteCurrentId);
    });
    function sellQuoteEditFn(sellQuoteCurrentId) {
        $.ajax({
            url: SERVER_URL + "/quote/detail",
            type: 'get',
            data: {
                token: token,
                quote_id: sellQuoteCurrentId
            },
            dataType: "json",
            success: function (e) {
                if (e.code == 0) {
                    var data = e.data;
                    console.log(data);
                    sellQuoteCreateData = {
                        token: token,
                        quote_id: data['id'],//报价单id,有值为修改
                        code_sn: data['code_sn'],//编号
                        account_id: data['account_id'],
                        customer_id: data['customer_id'],//客户id
                        customer_name: data['customer_name'],  // 客户名称
                        is_draft: data['is_draft'],//是否草稿,0不是1是
                        tax_rate: data['tax_rate'], // 含税状态  1 17%  0  无税
                        is_freight: data['is_freight'],//运费承担 0 不包 1包运费
                        logistics_type: data['logistics_type'], //物流方式
                        flow: data['flow'],  //审批流程
                        goods: '',
                        package: '',
                        setting: '',
                        money_sum: '', //单价合计
                        tax_money_sum: '', //合计税额
                        other_free: '', //其它费用
                        totals: '',//总计金额
                        to_type: data['to_type'],//到货方式0无 1到门 2到站
                        owner_name: data['owner_name'],//负责人名字
                        owner_id: data['owner_id'],//负责人id
                        dept_name: data['dept_name'],//部门名称
                        dept_id: data['dept_id'],//部门id
                        note: data['note'],//备注
                        ctr_type: data['ctr_type'],//控货方式1不控 2控货
                        expiry_day: data['expiry_day']//有效期
                    };
                    //创建人
                    $('.tanceng .ven_sell_quote_create_uname').val(likNullData(data['owner']));
                    //创建时间
                    $('.tanceng .ven_sell_quote_create_time').html(likNullData(data['created_at'].split(' ')[0]));
                    //报价单编号
                    $('.tanceng .ven_sell_quote_create_code').val(likNullData(data['code_sn']));
                    //关联借出单编号
                    if (data['lend_code_sn']) {
                        $('.tanceng .ven_sell_quote_create_choose_lend_inp').attr('readonly', false);
                    } else {
                        $('.tanceng .ven_sell_quote_create_choose_lend_inp').attr('readonly', true);
                    }
                    $('.tanceng .ven_sell_quote_create_choose_lend_inp').val(likNullData(data['lend_code_sn']));
                    //客户
                    $('.tanceng .ven_sell_quote_create_choose_customer_inp').val(likNullData(data['customer_name']));
                    //账户
                    $('.tanceng .ven_sell_quote_create_choose_account').val(likNullData(data['account_name']));
                    //税率
                    var sellQuoteCreateSepClass = "";
                    var sellQuoteCreateHsdj = "";
                    if (data['tax_rate'] == 1) {
                        $('.tanceng .ven_sell_quote_create_tax_num_inp').val('含税17%');
                        $('.tanceng .sell_quote_has_tax_hsdj').text('含税单价');
                        $('.tanceng .sell_quote_has_tax').removeClass('none');
                        sellQuoteCreateHsdj = '含税单价';
                        sellQuoteCreateSepClass = "";
                    } else if (data['tax_rate'] == 0) {
                        $('.tanceng .ven_sell_quote_create_tax_num_inp').val('无税');
                        $('.tanceng .sell_quote_has_tax_hsdj').text('单价');
                        $('.tanceng .sell_quote_has_tax').addClass('none');
                        sellQuoteCreateHsdj = '单价';
                        sellQuoteCreateSepClass = "none";
                    }
                    //承担运费
                    if (data['is_freight'] == 1) {
                        $('.tanceng .ven_sell_quote_create_freight_checkbox').attr('checked', true);
                    } else {
                        $('.tanceng .ven_sell_quote_create_freight_no_checkbox').attr('checked', true);
                    }
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
                    } else if (data['logistics_type'] == 6) {
                        logistics = '自提';
                    }
                    $('.tanceng .ven_sell_quote_create_choose_logistics_inp').val(logistics);
                    //到货方式
                    var toType = '';
                    if (data['to_type'] == 0) {
                        toType = '无';
                    } else if (data['to_type'] == 1) {
                        toType = '到门';
                    } else if (data['to_type'] == 2) {
                        toType = '到站';
                    }
                    $('.tanceng .ven_sell_quote_create_choose_to_type_inp').val(toType);
                    //控货方式
                    if (data['ctr_type'] == 1) {
                        $('.tanceng .ven_sell_quote_create_ctr_type_checkbox').attr('checked', true);
                    } else if (data['ctr_type'] == 2) {
                        $('.tanceng .ven_sell_quote_create_ctr_type_checkbox2').attr('checked', true);
                    }
                    //负责部门
                    $('.tanceng .ven_sell_quote_create_dept').val(likNullData(data['dept_name']));
                    //有效期
                    $('.tanceng .ven_sell_quote_create_deadline').val(likNullData(data['expiry_day']));
                    //备注
                    $('.tanceng .ven_sell_quote_create_note_textarea').val(likNullData(data['note']));
                    //审批人
                    var flowHtml = '';
                    if (data['current_check'] == 1) {
                        //跨级
                        $.each(data['flowArr'], function (i, v) {
                            flowHtml += '<li flowid="' + v['name'] + '"><em class="icon_personBtn icon_personBtn_msg"></em><em class="icon_adderBtn"></em><p class="box_adderName">' + v['name'] + '</p></li>';
                        });
                    } else {
                        //不跨级
                        $.each(data['flowArr'], function (i, v) {
                            flowHtml += '<li flowid="' + v['name'] + '"><em class="icon_personBtn icon_personBtn_msg"><i class="icon_personNext ' + ((i == data['flowArr'].length - 1) ? 'none' : '') + '"></i></em><em class="icon_adderBtn"></em><p class="box_adderName">' + v['name'] + '</p><p class="box_addermsg">' + flowOrderArr[i] + '</p></li>';
                        });
                    }

                    $('.tanceng .ven_sell_quote_create_flow_list').html(flowHtml);

                    //商品信息
                    aSellQuoteCreateGoodsChosen = [];
                    if (data['steps'] && data['steps']['product_json']) {
                        var proDetail = data['steps']['product_json'];
                        if (proDetail['goods']) {
                            xs_sp_arr.push(0);
                            $('.tanceng .page_108_shdSP').removeClass('none');
                            $('.tanceng .xs_xsbjd_bjd_box .xs_xsbjd_box_ul li:nth-of-type(1)').css('display', 'inline-block').trigger('click');
                            $('.tanceng .xs_xsbjd_SPbj>div:nth-of-type(1)').removeClass('none');
                            $('.tanceng .ven_sell_quote_create_chosen_goods_add_btn_tr').addClass('none');
                            var goodsList = '';
                            $.each(proDetail['goods']['goods'], function (i, v) {
                                goodsList += '';
                                var proNum = searchGoodsNumFn(v['good_id']);
                                console.log(proNum);
                                //上次报价
                                var priceLastTime = 0;
                                $.ajax({
                                    url: SERVER_URL + '/quote/goodhislist',
                                    type: 'GET',
                                    data: {
                                        token: token,
                                        good_id: v['good_id'],
                                        thetype: 1
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

                                var taxNum = 0;
                                var sellQuoteCreateSepClass = "";
                                if ($('.tanceng .ven_sell_quote_create_tax_num_inp').val() == '含税17%') {
                                    taxNum = 17;
                                    $('.tanceng .sell_quote_has_tax_hsdj').text('含税单价');
                                    sellQuoteCreateSepClass = "";
                                } else if ($('.tanceng .ven_sell_quote_create_tax_num_inp').val() == '无税') {
                                    taxNum = 0;
                                    $('.tanceng .sell_quote_has_tax_hsdj').text('单价');
                                    sellQuoteCreateSepClass = "none";
                                }
                                goodsList += '<tr good_id="' + v['good_id'] + '" lik_up_down_type="' + v['up_down'] + '">\
                                            <td class="sell_quote_create_choose_goods_order">' + l_dbl(i + 1) + '</td>\
                                            <td class="xs_f_color sell_quote_create_choose_goods_name">' + v['good_name'] + '</td>\
                                                <td>' + v['good_sn'] + '</td>\
                                                <td>' + v['good_attr'] + '</td>\
                                                <td>' + v['good_unit'] + '</td>\
                                                <td>\
                                                <div class="xs_num_input num_input inline_block num_input_new"><button class="but_grey_a but_opa_small inp_plus ven_sell_quote_productnum_change">+</button><input type="text" class="lik_input_number productnum sell_quote_num_check" value="' + v['good_num'] + '"/><button class="but_grey_a but_opa_small radius_left_0 inp_reduce ven_sell_quote_productnum_change">-</button></div>\
                                                    </td>\
                                                <td>当前库存：<br/ ><span class="good_cur_num">' + (proNum['cur_num']) + '</span><br />待出库：<br /><span class="good_stocking_num">' + (proNum['stocking_num']) + '</span></td>\
                                                <td class="xs_goods_box" style="position: relative;">\
                                                <div class="xs_goods_big_box"><div class="inline_block select_100"><input type="text" class="sell_quote_num_check lik_input_number c_3 time_input xs_bjd_inp xs_xsbjd_inp_60 product_reference_price ven_sell_quote_goods_cost_one" lastprice = "' + priceLastTime + '" retail="' + v['good_retail_price'] + '" value="' + v['good_price'] + '" style="color: rgb(153, 153, 153);margin-right: 10px;"></div><i class="ven_warning_arrow  '+(v['up_down'] == 1 ? 'ven_warning_arrow_up' : v['up_down'] == 2 ? 'xs_goods_down_img' : 'none')+'" style="margin: 0;position: absolute;top: 21px;right: 6px;"></i><ul class="xs_goods_select select_list" style="padding-bottom:5px;display: none"><li>' + v['good_retail_price'] + '(零售价)</li><div class="' + ((priceLastTime == 0 || sellQuoteCreateData.quote_id == 0) ? 'none' : '') + '"><div class="xs_goods_li_box"><p class="p1">上次报价：</p><p class="p2">' + priceLastTime + '</p><i class="ven_warning_arrow '+(v['up_down'] == 1 ? 'ven_warning_arrow_up' : v['up_down'] == 2 ? 'xs_goods_down_img' : 'none')+'""></i><p></p></div></div></ul></div><div class="work_vent_client_contMsgBox"><i class="work_vent_client_torr"></i><div class="work_vent_client_contMsgBoxDet fnc_output_ticket_total_remain_ticket_num_list"><span class="lik_up_down_text">'+(v['up_down'] == 1 ? '高' : v['up_down'] == 2 ? '低' : '')+'</span>于 ' + v['good_retail_price'] + '(零售价)</div></div>\
                                                </td>\
                                                    <td class="sell_quote_has_tax ' + sellQuoteCreateSepClass + '"><span class="ven_sell_quote_tax_num ven_sell_quote_goods_tax_one c_y ">' + v['good_rate'] + '</span></td>\
                                                    <td class="sell_quote_has_tax ' + sellQuoteCreateSepClass + '"><span class="ven_sell_quote_goods_tax_total">' + v['good_rate_price'] + '</span></td>\
                                                    <td><span class="ven_sell_quote_goods_cost_total">' + v['good_total'] + '</span></td>\
                                                <td><button class="but_blue but_opa_small but_green val_dialogTop ven_sell_quote_create_choose_goods_btn" name="xg_xsbjd_xzsp">+</button><button class="but_opa_small but_red ven_sell_quote_create_goods_del_btn">-</button></td>\
                                            </tr>';

                                aSellQuoteCreateGoodsChosen.push({
                                    'goodsid': v['good_id'],
                                    'goodsname': v['good_name'],
                                    'goodscodesn':  v['good_sn'] ,
                                    'goodsattr': v['good_attr'],
                                    'goodsunitname': v['good_unit'],
                                    'goodsretailprice': v['good_retail_price']
                                });
                            });
                            $('.tanceng .ven_sell_quote_create_chosen_goods_tbody').html(goodsList);
                            productnumChangeFn();
                            goodTaxTotalsFn();
                            goodCostTotalsFn();
                        }else{
                            $('.tanceng .xs_xsbjd_bjd_box .xs_xsbjd_box_ul li:nth-of-type(1)').css('display', 'none');
                            $('.tanceng .xs_xsbjd_SPbj>div:nth-of-type(1)').addClass('none');
                            $('.tanceng .ven_sell_quote_create_chosen_goods_add_btn_tr').removeClass('none');
                            if(proDetail['setting']){
                                $('.tanceng .xs_xsbjd_bjd_box .xs_xsbjd_box_ul li:nth-of-type(2)').css('display', 'inline-block').trigger('click');
                            }
                        }
                        if(proDetail['setting']){
                            xs_sp_arr.push(2);
                            $('.tanceng .page_108_shdSP').removeClass('none');
                            $('.tanceng .xs_xsbjd_bjd_box .xs_xsbjd_box_ul li:nth-of-type(2)').css('display', 'inline-block');
                            if(!proDetail['goods']){
                                $('.tanceng .xs_xsbjd_SPbj>div:nth-of-type(2)').removeClass('none');
                            }
                            $('.tanceng .ven_sell_quote_create_chosen_setting_add_btn_tr').addClass('none');
                            var settingList = '';
                            $.each(proDetail['setting']['setting'], function (i, v) {
                                aSellQuoteCreateSettingChosen.push(v['setting_id']);
                                var proSettingNum = searchSettingNumFn(v);
                                if (v['optional'] == 1) {
                                    //可选配
                                    settingList += '<div class="ven_sell_quote_create_choose_setting_one_box_list" settingsign="setsign' + data['id'] + '" settingid="' + data['id'] + '" optionaltype="1">\
                                <div class="container">\
                                <div class="table-container">\
                                <table>\
                                <thead class="' + (i == 0 ? '' : 'none') + '">\
                                <tr>\
                                    <th width="32">序号</th>\
                                    <th width="100">整机商品名称</th>\
                                    <th width="120">整机商品编号</th>\
                                    <th width="56">基本单位</th>\
                                    <th width="238">属性</th>\
                                    <th width="90">数量</th>\
                                    <th width="120">库存</th>\
                                    <th width="130" class="sell_quote_has_tax_hsdj">' + sellQuoteCreateHsdj + '</th>\
                                    <th width="30" class="sell_quote_has_tax ' + sellQuoteCreateSepClass + '">税率(%)</th>\
                                    <th width="85" class="sell_quote_has_tax ' + sellQuoteCreateSepClass + '">税额(元)</th>\
                                    <th width="85">总价(元)</th>\
                                    <th width="80">操作</th>\
                                </tr>\
                            </thead>\
                            <tbody>\
                            <tr settingid="' + data['id'] + '" lik_up_down_type="0">\
                            <td width="32">' + l_dbl(i + 1) + '</td>\
                            <td width="100" class="f_color xs_xsbjs_td">' + data['name'] + '</td>\
                                <td width="120">' + data['code_sn'] + '</td>\
                                <td width="56">' + data['unit_name'] + '</td>\
                                <td width="238">' + data['attr_name'] + '</td>\
                            <td width="90">\
                            <div class="xs_num_input num_input inline_block num_input_new"><button class="but_blue but_opa_small inp_plus ven_sell_quote_setting_parent_kxp_num_change_btn">+</button><input class="lik_input_number ven_sell_quote_choose_setting_kxp_num sell_quote_num_check" type="text" value="0" style="border:1px solid #23a2f3;"><button class="but_blue but_opa_small radius_left_0 inp_reduce ven_sell_quote_setting_parent_kxp_num_change_btn">-</button></div>\
                                </td>\
                                <td width="85">当前库存：<br/ ><span class="good_cur_num">' + (proNum['cur_num']) + '</span><br />待出库：<br /><span class="good_stocking_num">' + (proNum['stocking_num']) + '</span></td>\
                                <td width="130" class="xs_goods_box " style="position: relative;"><div class="xs_goods_big_box"><div class="inline_block select_100" style="color: rgb(51, 51, 51);"><input type="text" class="sell_quote_num_check time_input lik_input_number xs_bjd_inp xs_bjd_inp_1 xs_xsbjd_inp_60 sell_quote_create_setting_cost_one_change" readonly retail="' + data['retail_price'] + '" value="' + data['retail_price'] + '" style="color: rgb(153, 153, 153);margin-right: 10px;"></div></div></td>\
                                <td width="30" class="' + sellQuoteCreateSepClass + ' sell_quote_has_tax ven_sell_quote_tax_num c_y">' + taxNum + '</td>\
                                <td width="85" class="' + sellQuoteCreateSepClass + ' sell_quote_has_tax ven_sell_quote_create_setting_kxp_parent_one_cost_hsj">0</td>\
                                <td width="85" class="ven_sell_quote_create_setting_kxp_parent_one_cost_total">0</td>\
                                <td width="75"><button class="but_blue but_opa_small but_green val_dialogTop ven_sell_quote_create_choose_setting_btn" name="xg_xsbjd_xgpeizsp">+</button><button class="but_blue but_opa_small but_red sell_quote_create_setting_parent_del_btn">-</button></td>\
                                </tr>\
                                </tbody>\
                                </table>\
                                </div>\
                                </div>\
                                <div class="xs_xsbjd_table_t2">\
                                <div class="table_t2" style="position: relative;">\
                                <span class="cont_title" style="border-left: 4px solid #23a2f3;padding-left: 10px;margin-left: 0;">配件内容</span>\
                                <button class="but_icon_plus_white but_small but_blue val_dialogTop ven_sell_quote_create_choose_setting_goods_btn" name="xs_bjd_xzpzsp" style="position:absolute;right:80px;top:12px;"><i></i>选择配件</button>\
                                <span class="box_open_btn" style="right: 13px;">收起 <i class="right icon_show"></i></span>\
                                </div>\
                                <div class="ven_sell_quote_create_choose_setting_kxp_list">\
                                </div>\
                                </div>\
                                </div>';
                                } else if (v['optional'] == 2) {
                                    //配件内容
                                    var sellQuoteCreateSettingGoodsList = '';
                                    $.each(v['good_list'], function (i2, v2) {
                                        //配件子商品内容
                                        var settingGoodsList = '';
                                        //配件子商品数量
                                        var numTotal = 0;
                                        $.each(v2['attr_list'], function (i3, v3) {
                                            var proNum = searchGoodsNumFn(v3['id']);
                                            settingGoodsList += '<tr settinggoodsid="' + v3['good_id'] + '">\
                                                        <td>' + v3['good_sn'] + '</td>\
                                                        <td>' + v3['good_attr'] + '</td>\
                                                        <td>' + v3['sing_num'] + '</td>\
                                                        <td>当前库存：<br/ ><span class="good_cur_num">' + (proNum['cur_num']) + '</span><br />待出库：<br /><span class="good_stocking_num">' + (proNum['stocking_num']) + '</span></td>\
                                                        <td class="ven_sell_quote_create_setting_goods_bkxp_one_num_toal">' + v3['total_num'] + '</td>\
                                                        </tr>';
                                        });
                                        sellQuoteCreateSettingGoodsList += '<div class="sell_quote_create_setting_goods_list" optionaltype="2"><p class="box_open_head" style="background: rgb(255, 255, 255); border-radius: 3px;">\
                                        <span>' + v2['title'] + '</span>\
                                        </p>\
                                        <div class="container">\
                                        <div class="table-container">\
                                        <table>\
                                        <thead>\
                                        <tr>\
                                        <th width="200">商品编号</th>\
                                        <th width="350">属性</th>\
                                        <th width="200">单个整机数量</th>\
                                        <th width="200">库存</th>\
                                        <th width="200">总数</th>\
                                        </tr>\
                                        </thead>\
                                        <tbody>' + settingGoodsList + '\
                                        <tr class="table_total">\
                                        <td>合计</td>\
                                        <td></td>\
                                        <td></td>\
                                        <td><input type="hidden" value="' + v2['sum_num'] + '"></td>\
                                        <td class="c_3">小计：<span class="ven_sell_quote_create_setting_goods_bkxp_num_total c_r">' + v2['sum_num'] + '</span></td>\
                                        </tr>\
                                        </tbody>\
                                        </table>\
                                        </div>\
                                        </div></div>'
                                    });
                                    //不可选配
                                    settingList += '<div class="ven_sell_quote_create_choose_setting_one_box_list" settingid="' + v['setting_id'] + '" optionaltype="2">\
                                <div class="container">\
                                <div class="table-container">\
                                <table>\
                                <thead class="' + (i == 0 ? '' : 'none') + '">\
                                <tr>\
                                    <th width="32">序号</th>\
                                    <th width="100">整机商品名称</th>\
                                    <th width="120">整机商品编号</th>\
                                    <th width="56">基本单位</th>\
                                    <th width="238">属性</th>\
                                    <th width="100">数量</th>\
                                    <th width="120">库存</th>\
                                    <th width="130" class="sell_quote_has_tax_hsdj">' + sellQuoteCreateHsdj + '</th>\
                                    <th width="30" class="' + sellQuoteCreateSepClass + ' sell_quote_has_tax">税率(%)</th>\
                                    <th width="85" class="' + sellQuoteCreateSepClass + ' sell_quote_has_tax">税额(元)</th>\
                                    <th width="85">总价(元)</th>\
                                    <th width="90">操作</th>\
                                </tr>\
                                </thead>\
                                <tbody>\
                                <tr settingid="' + v['setting_id'] + '">\
                                <td width="32">' + l_dbl(i + 1) + '</td>\
                                <td width="100" class="f_color xs_xsbjs_td">' + v['setting_name'] + '</td>\
                                <td width="120">' + v['setting_sn'] + '</td>\
                                <td width="56">' + v['setting_unit'] + '</td>\
                                <td width="238">' + v['setting_attr'] + '</td>\
                                <td width="90">\
                                <div class="xs_num_input num_input inline_block num_input_new"><button class="but_blue but_opa_small inp_plus ven_sell_quote_create_setting_bkxp_parent_num_change_btn">+</button><input class="sell_quote_num_check lik_input_number ven_sell_quote_create_setting_bkxp_parent_num_inp" type="text" value="' + v['setting_num'] + '" style="border:1px solid #23a2f3;"><button class="but_blue but_opa_small radius_left_0 inp_reduce ven_sell_quote_create_setting_bkxp_parent_num_change_btn">-</button></div>\
                                </td>\
                                <td width="85">当前库存：<br/ ><span class="good_cur_num">' + (proSettingNum['cur_num']) + '</span><br />待出库：<br /><span class="good_stocking_num">' + (proSettingNum['stocking_num']) + '</span></td>\
                                <td width="130" class="xs_goods_box" style="position: relative;"><div class="xs_goods_big_box"><div class="inline_block select_100" style="color: rgb(51, 51, 51);"><input type="text" class="sell_quote_num_check time_input lik_input_number xs_bjd_inp xs_bjd_inp_1 xs_xsbjd_inp_60 sell_quote_create_setting_cost_one_change" retail="' + v['setting_retail_price'] + '" value="' + v['setting_price'] + '" style="color: rgb(153, 153, 153);margin-right: 10px;"></div><i class="ven_warning_arrow  '+(v['up_down'] == 1 ? 'ven_warning_arrow_up' : v['up_down'] == 2 ? 'xs_goods_down_img' : 'none')+'" style="margin: 0px; position: absolute; top: 21px; right: 13px;"></i><ul class="xs_goods_select select_list none"><li>' + v['setting_retail_price'] + '(零售价)</li></ul></div><div class="work_vent_client_contMsgBox" style="display: none;"><i class="work_vent_client_torr"></i><div class="work_vent_client_contMsgBoxDet fnc_output_ticket_total_remain_ticket_num_list"><span class="lik_up_down_text">'+(v['up_down'] == 1 ? '高' : v['up_down'] == 2 ? '低' : '')+'</span>于 ' + v['setting_retail_price'] + '(零售价)</div></div>                                                </td>\
                                <td width="30" class="' + sellQuoteCreateSepClass + ' ven_sell_quote_tax_num sell_quote_has_tax c_y">' + v['setting_rate'] + '</td>\
                                <td width="85" class="' + sellQuoteCreateSepClass + ' sell_quote_has_tax ven_sell_quote_create_setting_parent_one_cost_hsj">' + v['setting_rate_price'] + '</td>\
                                <td width="85" class="ven_sell_quote_create_setting_parent_one_cost_total">' + v['setting_total'] + '</td>\
                                <td width="75"><button class="but_blue but_opa_small but_green val_dialogTop ven_sell_quote_create_choose_setting_btn" name="xg_xsbjd_xgpeizsp">+</button><button class="but_blue but_opa_small but_red sell_quote_create_setting_parent_del_btn">-</button></td>\
                                </tr>\
                                </tbody>\
                                </table>\
                                </div>\
                                </div>\
                                <div class="xs_xsbjd_table_t2">\
                                <div class="table_t2" style="position: relative;"><span class="cont_title" style="border-left: 4px solid #23a2f3;padding-left: 10px;margin-left: 0;">配件内容</span><span class="box_open_btn" style="right: 13px;">收起 <i class="right icon_show"></i></span></div>\
                                <div class="box_open_list goods_tc_toggle">\
                                ' + sellQuoteCreateSettingGoodsList + '</div>\
                                </div>\
                                </div>\
                                </div>';
                                }
                            });
                            $('.tanceng .ven_sell_quote_create_choose_setting_box_list').html(settingList);
                            $('.tanceng .sell_quote_create_setting_num_total_hj').html(proDetail['setting']['sum_num']);
                            $('.tanceng .sell_quote_create_setting_cost_total_hj').html(proDetail['setting']['sum_total']);
                            $('.tanceng .ven_sell_quote_choose_setting_hj_head').addClass('none');
                        }
                        console.log(aSellQuoteCreateSettingChosen);
                    }

                    //合计信息
                    $('.tanceng .sell_quote_create_product_cost_total').val(proDetail['money_sum']);
                    $('.tanceng .sell_quote_create_other_fee').val(proDetail['other_free']);
                    $('.tanceng .ven_sell_quote_create_cost_tax_total').html(proDetail['totals']);

                } else {
                    alert('请重试！');
                }
            },
            error: function (data) {
                alert(data);
            }
        });
    }

    $('.tanceng .ven_sell_quote_create_choose_goods_list tr').die().live("click", function () {
        if ($(this).find('input:checkbox').is(":checked")) {
            $(this).find('input:checkbox').attr('checked', false);
        } else {
            $(this).find('input:checkbox').attr('checked', true);
        }
    });
    //导出
    $('.tanceng .ven_sell_quote_print_btn').die('click').live('click', function () {
        document.title = '销售报价单' + $('.tanceng .ven_sell_quote_detail_code_sn').html();
    });



    //关联借出单
    /*查看按钮*/
    $(".zj_jcd_check_xq_btn").die().live("click",function(){
        $(".zj_jcghd_number_show").text('');
        $(".zj_xsbjd_number_show").html('')
        $(".slider_head_moreBox").show();
        var _this=this;
        $(".zj_ck_info_check_jcd").text('查看借出单')
        $(".zj_jcd_my_fqd_bjd_div").show();
        $(".zj_jcd_dwsp_bjd_div").hide();
        $(".zj_cswd_jrd_div").hide();
        var checkid=$(this).data('id');
        var code=$(this).data('code_sn')
        /*基本信息*/
        $("#zj_jbinfo_left_head_table").die().live("click",function(){
            $.ajax({
                type: 'post',
                url: SERVER_URL + "/lend/basic",
                data:{
                    token: token,
                    id:checkid
                },
                dataType: "json",
                success: function (data) {
                    console.log('100033333');
                    console.log(data);
                    console.log('100033333');
                    $(".zj_jcd_kh_name_show_check").text(data['data']['supplier_name']);
                    $(".zj_xdr_name_show").text(data['data']['xiadan_name']);
                    $(".zj_create_time_show").text(subTime(data['data']['create_time']));
                    $(".zj_jcd_jb_info_show_nr p span").eq(0).text(data['data']['code_sn']);
                    $(".zj_jcd_jb_info_show_nr p span").eq(1).text(data['data']['supplier_name']);
                    $(".zj_jcd_jb_info_show_nr p span").eq(2).text(subTime(data['data']['expect_return_time']));
                    if(data['data']['tax_rate']==1){
                        $(".zj_jcd_jb_info_show_nr p span").eq(3).text('17%');
                    }else{
                        $(".zj_jcd_jb_info_show_nr p span").eq(3).text('无税');
                    }

                    $(".zj_jcd_jb_info_show_nr p span").eq(4).text(data['data']['note']);


                    var c_name='';
                    $.each(data['cc'],function (i,csr_name) {
                        c_name+=''+csr_name['name']+','
                    })
                    c_name = c_name.slice(0, c_name.length - 1);
                    $(".zj_jcd_jb_info_show_nr p span").eq(5).text(c_name);
                    if(data['data']['thetype']==0){
                        $(".zj_jcd_jb_info_show_nr p span").eq(6).text("-");
                        $(".zj_jcd_gd_jcgh_li_btn").hide();
                        $(".zj_jcd_gd_zf_li_btn").show()
                        $(".zj_jcd_gd_del_li_btn").show()
                    }else if(data['data']['thetype']==1){
                        $(".zj_jcd_jb_info_show_nr p span").eq(6).text("未归还");
                        $(".zj_jcd_gd_jcgh_li_btn").show();
                        $(".zj_jcd_gd_zf_li_btn").hide()
                        $(".zj_jcd_gd_del_li_btn").hide()
                    }else if(data['data']['thetype']==2){
                        $(".zj_jcd_jb_info_show_nr p span").eq(6).text("部分归还");
                        $(".zj_jcd_gd_jcgh_li_btn").show();
                        $(".zj_jcd_gd_zf_li_btn").hide()
                        $(".zj_jcd_gd_del_li_btn").hide()
                    }else if(data['data']['thetype']==3){
                        $(".zj_jcd_jb_info_show_nr p span").eq(6).text("已归还");
                        $(".zj_jcd_gd_jcgh_li_btn").hide();
                        $(".zj_jcd_gd_zf_li_btn").hide()
                        $(".zj_jcd_gd_del_li_btn").hide()
                        /*不可转销售报价单*/
                        $(".zj_jcd_my_fqd_bjd_div").hide();
                        $(".zj_jcd_dwsp_bjd_div").hide();
                        $(".zj_cswd_jrd_div").show();
                    }else{
                        $(".zj_jcd_gd_jcgh_li_btn").hide();
                        $(".zj_jcd_gd_zf_li_btn").show()
                        $(".zj_jcd_gd_del_li_btn").show()
                    }
                    $(".zj_jcd_jb_info_show_nr p span").eq(7).text(data['data']['send_time']);

                    if(data['data']['logistics_type']==1){
                        $(".zj_jcd_jb_info_show_nr p span").eq(8).text('快递');
                    }else if(data['data']['logistics_type']==2){
                        $(".zj_jcd_jb_info_show_nr p span").eq(8).text('陆运');
                    }else if(data['data']['logistics_type']==3){
                        $(".zj_jcd_jb_info_show_nr p span").eq(8).text('空运');
                    }else if(data['data']['logistics_type']==4){
                        $(".zj_jcd_jb_info_show_nr p span").eq(8).text('海运');
                    }else if(data['data']['logistics_type']==5){
                        $(".zj_jcd_jb_info_show_nr p span").eq(8).text('平邮');
                    }
                    if(data['data']['is_freight']==1){
                        $(".zj_jcd_jb_info_show_nr p span").eq(9).text('包运费');
                    }else{
                        $(".zj_jcd_jb_info_show_nr p span").eq(9).text('不包');
                    }
                    // $(".zj_jcd_jb_info_show_nr p span").eq(9).text(data['data']['is_freight']);
                    $(".zj_jcd_jb_info_show_nr p span").eq(10).text(data['data']['receiver']);
                    $(".zj_jcd_jb_info_show_nr p span").eq(11).text(data['data']['mobile']);
                    $(".zj_jcd_jb_info_show_nr p span").eq(12).text(data['data']['address']);
                    //$(".zj_jcd_jb_info_show_nr p span").eq().text(data['data']['']);
                    // if(data['data']['approval_status']==0){
                    //     $(".zj_jcd_gd_zf_li_btn").show();
                    //     $(".zj_jcd_gd_del_li_btn").show();
                    //     $(".zj_jcd_gd_jcgh_li_btn").hide();
                    // } else if(data['data']['approval_status']==1){
                    //     $(".zj_jcd_gd_zf_li_btn").show();
                    //     $(".zj_jcd_gd_del_li_btn").show();
                    //     $(".zj_jcd_gd_jcgh_li_btn").hide();
                    // }else if(data['data']['approval_status']==2){
                    //     $(".zj_jcd_gd_jcgh_li_btn").show();
                    //     $(".zj_jcd_gd_zf_li_btn").hide();
                    //     $(".zj_jcd_gd_del_li_btn").hide();
                    // }else if(data['data']['approval_status']==3){
                    //     $(".zj_jcd_gd_zf_li_btn").show();
                    //     $(".zj_jcd_gd_del_li_btn").show();
                    //     $(".zj_jcd_gd_jcgh_li_btn").hide();
                    // }


                }
            })

            /*查看审批结果*/
            $.ajax({
                type: 'post',
                url: SERVER_URL + "/lend/approval-result",
                data: {
                    token: token,
                    //company_id: company_id, //公司id
                    id: checkid,//id
                    uid:uid

                },
                dataType: "json",
                success: function (data) {
                    console.log('审批结果');
                    console.log(data);
                    console.log('审批结果');
                    var html='';
                    if(data.code==0){

                        $.each(data['data'],function(i,vinfo){
                            html+='<div class="work_spiliu">'
                            html+='<div class="work_spiliu_items" style="overflow: hidden;">';
                            html+='<div class="left" style="position: relative;">';
                            html+='<div class="work_spiliu_div">';
                            if(vinfo['headpic']=='' || vinfo['headpic']==null){
                                html+='<img class="inline_block tx" src="static/images/touxiang.png">'
                            }else{
                                html+='<img src="'+getImgUrl(vinfo['headpic'])+'">'
                            }

                            html+='<h3 class="work_sp_h3">'+likNullData(vinfo['username'])+'</h3>';
                            if(vinfo['approval_status']!=9){
                                html+='<span class="c_9 m_left_5 zj_bz_is_hid">步骤'+i+'</span>'
                            }else {
                                html+='<span class="c_9 m_left_5 zj_bz_is_hid"></span>'
                            }
                            html+='</div>'
                            if(vinfo['approval_status']==0){
                                html+='<cite class="b_h"></cite>'
                            }else if(vinfo['approval_status']==1){
                                html+='<cite class="b_y"></cite>'
                            }else if(vinfo['approval_status']==2){
                                html+='<cite class="b_g"></cite>'
                            }else if(vinfo['approval_status']==3){
                                html+='<cite class="b_r"></cite>'
                            }else if(vinfo['approval_status']==4){
                                html+='<cite class="b_b"></cite>'
                            }else if(vinfo['approval_status']==9){
                                html+='<cite class="b_b"></cite>'
                            }
                            html+='</div>'
                            html+='<div class="auto_height">';

                            html+='<img src="static/images/work_jiantou.png">';

                            html+='<div class="sp_cont">';
                            html+='<div class="sp_cont_a">';
                            if(vinfo['approval_status']==0){
                                html+='<h3 class="b_h">待审批</h3>'
                            }else if(vinfo['approval_status']==1){
                                html+='<h3 class="c_y">审批中</h3>'
                            }else if(vinfo['approval_status']==2){
                                html+='<h3 class="c_g">审批通过</h3>'
                            }else if(vinfo['approval_status']==3){
                                html+='<h3 class="c_r">拒绝</h3>'
                            }else if(vinfo['approval_status']==4){
                                html+='<h3 class="f_color bold">撤回</h3>'
                            }else if(vinfo['approval_status']==9){
                                html+='<h3 class="f_color bold">发起审批</h3>'

                            }

                            if(vinfo['update_time']==null || vinfo['update_time']==''){
                                html+='<p class="c_9"></p>'
                            }else{
                                html+='<p class="c_9">'+likNullData(vinfo['update_time'])+'</p>'
                            }
                            //html+='<p class="c_9">'+likNullData(vinfo['update_time'])+'</p>'
                            html+='</div>'
                            if(vinfo['approval_status']==9){
                                html+='<p class="c_3 work_sp_p none1"></p>'
                            }else{
                                html+='<p class="c_3 work_sp_p">'+likNullData(vinfo['note'])+'</p>'
                            }

                            html+='</div>'
                            html+='</div>'
                            html+='<div style="clear: both;height: 0;font-size: 1px;line-height: 0px;"></div>';
                            html+='</div>';
                            html+='</div>'
                        })
                        $(".zj_jcd_sp_result_box").html(html);
                        if(data['is_across']==1){
                            $(".zj_bz_is_hid").hide();
                        }else{
                            $(".zj_bz_is_hid").show();
                        }
                    }



                }
            })

            /*查看详情*/
            $(".zj_ck_info_check_jcd").die().live("click",function(){
                $.ajax({
                    type: 'POST',
                    url: SERVER_URL + "/lend/look-lend",
                    data: {
                        token: token,
                        //company_id: company_id, //公司id
                        id: checkid// 用户id
                    },
                    dataType: "json",
                    success: function (data) {
                        console.log('20001110000000000000000');
                        console.log(data);
                        console.log('20001110000000000000000');
                        if(data.code==0){
                            if(data['data'].length==0){
                                return true;
                            }
                            $(".zj_jcd_check_info_zxs_bjd").data('id',data['data']['id']).data('code_sn',data['data']['code_sn']).data('supplier_id',data['data']['supplier_id']).data('supplier_name',data['data']['supplier_name']);//id
                            $(".zj_jcd_check_xq_kh_name").text(likNullData(data['data']['supplier_name']));
                            $(".zj_jcd_quote_look_uname").text(data['data']['xiadan_name']);
                            $(".zj_jcd_quote_look_create_at").text(data['data']['create_time']);
                            $(".zj_look_info_header_content .zj_jcd_bh_show_info").eq(0).text(data['data']['code_sn']);
                            $(".zj_look_info_header_content .zj_jcd_bh_show_info").eq(1).text(data['data']['supplier_name']);
                            $(".zj_look_info_header_content .zj_jcd_bh_show_info").eq(2).text(data['data']['expect_return_time']);
                            $(".zj_look_info_header_content .zj_jcd_bh_show_info").eq(3).text(data['data']['send_time']);
                            if(data['data']['logistics_type']==1){
                                $(".zj_look_info_header_content .zj_jcd_bh_show_info").eq(4).text('快递');
                            }else if(data['data']['logistics_type']==2){
                                $(".zj_look_info_header_content .zj_jcd_bh_show_info").eq(4).text('陆运');
                            }else if(data['data']['logistics_type']==3){
                                $(".zj_look_info_header_content .zj_jcd_bh_show_info").eq(4).text('空运');
                            }else if(data['data']['logistics_type']==4){
                                $(".zj_look_info_header_content .zj_jcd_bh_show_info").eq(4).text('海运');
                            }else if(data['data']['logistics_type']==5){
                                $(".zj_look_info_header_content .zj_jcd_bh_show_info").eq(4).text('平邮');
                            }
                            if(data['data']['is_freight']==1){
                                $(".zj_look_info_header_content .zj_jcd_bh_show_info").eq(5).text('包运费');
                            }else{
                                $(".zj_look_info_header_content .zj_jcd_bh_show_info").eq(5).text('不包');
                            }

                            $(".zj_look_info_header_content .zj_jcd_bh_show_info").eq(6).text(data['data']['receiver']);
                            $(".zj_look_info_header_content .zj_jcd_bh_show_info").eq(7).text(data['data']['mobile']);
                            $(".zj_look_info_header_content .zj_jcd_bh_show_info").eq(8).text(data['data']['address']);
                            $(".zj_look_info_header_content .zj_jcd_bh_show_info").eq(9).text(data['data']['note']);
                            //$(".zj_look_info_header_content .zj_jcd_bh_show_info").eq(10).text(data['data']['code_sn']);
                            // $(".tanceng .zj_jrd_info_num_header_show .zj_jrd_bh_show_num").text(data['data']['code_sn']);
                            // $(".tanceng .zj_jrd_info_num_header_show .zj_supplier_name_show").text(data['data']['supplier_name']);
                            // $(".tanceng .zj_jrd_info_num_header_show .zj_yjgh_time_show").text(data['data']['expect_return_time']);
                            // $(".tanceng .zj_jrd_info_num_header_show .zj_rk_day_show").text(data['data']['library_time']);
                            // $(".tanceng .zj_jrd_info_num_header_show .zj_note_info_show").text(data['data']['note']);
                            if(data['data']['goods']['sum_total']){
                                $(".tanceng .xs_bjd_bold .zj_jcd_goods_hj_sum").text(data['data']['goods']['sum_total']);
                            }
                            // if(data['data']['setting']['sum_total']){
                            //     $(".xs_bjd_bold .zj_jcd_complete_goods_price_sum").text(data['data']['setting']['sum_total']);
                            // }


                            /*ff*/
                            $(".zj_jcd_unit_price_hj").text(data['data']['unit_price_total']);
                            $(".zj_jcd_contain_tax").text(data['data']['tax_total']);
                            $(".zj_jcd_other_cost").text(data['data']['other_costs']);
                            $(".zj_jcd_sum_price_num").text(data['data']['all_money']);


                            var html='';
                            $.each(data['data']['goods'],function(i,v){

                                $.each(v,function(i2,v2){
                                    var sor=repair(i2+1)
                                    html+='<tr>\
                                                <td>'+sor+'</td>\
                                                <td>'+likNullData(v2['good_sn'])+'</td>\
                                                <td>'+likNullData(v2['good_name'])+'</td>\
                                                <td>'+likNullData(v2['good_attr'])+'</td>\
                                                <td>'+likNullData(v2['good_num'])+''+v2['good_unit']+'</td>\
                                                <td>'+likNullData(v2['good_price'])+'</td>\
                                                <td>'+likNullData(v2['good_rate_price'])+'</td>\
                                                <td>'+likNullData(v2['good_total'])+'</td>\
                                                <td></td>\
                                                </tr>'
                                })

                            })
                            $(".zj_jcd_goods_table_content_info").html(html);
                            /*整机商品*/

                            var complete='';
                            $.each(data['data']['setting'],function(i,arr){
                                var px=repair(i+1)
                                var setting='';
                                if(arr['good_list']){
                                    $.each(arr['good_list'],function(i2,v2){
                                        var setting_goods=''
                                        if(v2['attr_list']){
                                            $.each(v2['attr_list'],function(i3,v3){
                                                setting_goods+='<tr>\
                                                <td>'+likNullData(v3['good_sn'])+'</td>\
                                                <td>'+likNullData(v3['good_attr'])+'</td>\
                                                <td>'+likNullData(v3['sing_num'])+''+v3['good_unit']+'</td>\
                                                <td>'+likNullData(v3['good_price'])+'</td>\
                                                <td>'+likNullData(v3['good_rate_price'])+'</td>\
                                                <td>'+likNullData(v3['good_total'])+'</td>\
                                                <td></td>\
                                                </tr>'
                                            })
                                        }

                                        setting+='<table class="xs_bjd_table_1">\
                                <thead>\
                                <tr style="background: #fff;">\
                                <th class="c_3" style="font-weight: 100;">'+likNullData(v2['title'])+'</th>\
                                <th></th>\
                                <th></th>\
                                </tr>\
                                <tr>\
                                <th width="90">编号</th>\
                                <th width="560">属性</th>\
                                <th width="50">数量</th>\
                                <th width="150">单价</th>\
                                <th width="90">含税价</th>\
                                <th width="90">总价</th>\
                                <th width="60"></th>\
                                </tr>\
                                </thead>\
                                <tbody>'+setting_goods+'\
                                </tbody>\
                            </table>'
                                    })
                                }

                                complete+='<div class="xs_div_2" style="margin-top: 20px;">\
                            <table class="xs_bjd_table">\
                            <thead>\
                            <tr>\
                            <th width="30">序号</th>\
                            <th width="90">编号</th>\
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
                                    <td>'+px+'</td>\
                                    <td>'+likNullData(arr['good_sn'])+'</td>\
                                    <td>'+likNullData(arr['good_name'])+'</td>\
                                    <td>'+likNullData(arr['good_attr'])+'</td>\
                                    <td>'+likNullData(arr['num'])+''+arr['good_unit']+'</td>\
                                    <td>'+likNullData(arr['price'])+'</td>\
                                    <td>'+likNullData(arr['containing_money'])+'</td>\
                                    <td class="zj_pzzj_goods_sum_price">'+likNullData(arr['total_money'])+'</td>\
                                    <td><button class="but_mix box_open_btn_1 but_blue_1">展开</button></td>\
                                </tr>\
                            </tbody>\
                            </table>\
                            </div>\
                            <div class="xs_tc_goods_box goods_tc_toggle" style="display: none;">'+setting+'</div>'

                            })


                            $(".tanceng .zj_jcd_complete_goods_dv_content").html(complete);
                            var z_sum=0;
                            $(".tanceng .zj_jcd_complete_goods_dv_content .zj_pzzj_goods_sum_price").each(function () {
                                z_sum+=parseFloat($(this).text());
                            })
                            $(".zj_jcd_complete_goods_price_sum").text(z_sum);
                        }

                    }
                })

            });
            /*转销售报价单*/
            $(".zj_jcd_check_info_zxs_bjd").die().live("click",function(){
                $(".tanceng .xs_xsbjd_bjd_box .xs_xsbjd_box_ul ul li").eq(0).css({'background':'#32a0f6','border-color':'#32a0f6','color':'#fff'})
                var zxs_this=this;
                new_number('.zj_xs_quote_create_code','XBJ')

                var id=$(this).data('id');
                var code=$(this).data('code_sn');//借入单编号
                var supplier_name=$(this).data('supplier_name');//客户name
                var supplier_id=$(this).data('supplier_id');//客户id

                $(".zj_xs_quote_create_choose_lend_inp").val(code);
                $(".zj_xs_quote_create_choose_customer_inp").val(supplier_name);

                if($(".tanceng .zj_xs_quote_create_tax_num_inp").val()=='含税17%'){

                    $(".tanceng .zj_z_xs_tax_content").text('含税17%');
                }else{
                    $(".tanceng .zj_z_xs_tax_content").text('无税');
                }
                $(".zj_zxs_tax_list_li li").die().live("click",function(){
                    var dj=$(".tanceng .zj_xs_create_product_cost_total").val();


                    if($(".tanceng .zj_xs_quote_create_tax_num_inp").val()=='含税17%'){
                        var sl=parseFloat(dj)*0.17
                        $(".tanceng .zj_z_xs_tax_content").text('含税17%');

                        $(".zj_xs_create_tax_total").val(sl.toFixed(2));
                        var zprice=$(".tanceng .zj_xs_quote_create_cost_tax_total").text();
                        var z_price=parseFloat(zprice)+sl
                        $(".zj_xs_quote_create_cost_tax_total").text(z_price.toFixed(2));
                    }else{
                        $(".tanceng .zj_z_xs_tax_content").text('无税');
                        var ws=$(".zj_xs_create_tax_total").val();

                        var zj=$(".tanceng .zj_xs_quote_create_cost_tax_total").text();
                        var z_sum=parseFloat(zj)-parseFloat(ws)
                        $(".zj_xs_quote_create_cost_tax_total").text(z_sum.toFixed(2));
                        $(".zj_xs_create_tax_total").val('0');
                    }
                });

                /*审批人获取*/
                $.ajax({
                    type: 'POST',
                    url: SERVER_URL + "/borrow/get-approval-type",
                    data: {
                        token: token,
                        company_id: company_id, //公司id
                        uid: uid, // 用户id
                        category: 1,// 分类id 1合同管理,2采购,3借入借出
                        type_id: 2, // 类型(1销售合同,2采购合同,3员工合同,4其他合同,5采购报价单,6采购退换货,7借入单,8借出单,9归还单,10,归还单(借入归还),11(借出归还)
                        department_id:department_id
                    },
                    dataType: "json",
                    success: function (data) {
                        console.log('10001');
                        console.log(data);
                        console.log('10001');

                        var html='';
                        var P_sort=" ";
                        if(data.code==0){
                            if(data['kuaji']==1) {
                                $.each(data['data'], function (i, v) {

                                    if (v['face'] != '') {
                                        html += '<li data-id="' + v['uid'] + '" class="zj_spr_num"><em class="icon_personBtn"><img src="' + getImgUrl(v['face']) + '" style="width: 34px;height: 34px;border-radius:50px;"/></em> <em class="icon_adderBtn"></em> <p class="box_adderName">' + v['name'] + '</p> </li>'
                                    } else {
                                        html += '<li data-id="' + v['uid'] + '" class="zj_spr_num"> <em class="icon_personBtn icon_personBtn_msg"></em> <em class="icon_adderBtn"></em> <p class="box_adderName">' + v['name'] + '</p></li>'
                                    }


                                })
                            }else{
                                $.each(data['data'], function (i, v) {

                                    if (v['face'] != '') {
                                        html += '<li data-id="' + v['uid'] + '" class="zj_spr_num"><em class="icon_personBtn"><img src="' + getImgUrl(v['face']) + '" style="width: 34px;height: 34px;border-radius:50px;"/><i class="icon_personNext"></i></em> <em class="icon_adderBtn"></em> <p class="box_adderName">' + v['name'] + '</p> <p class="box_addermsg">步骤' + (i + 1) + '</p> </li>'
                                    } else {
                                        html += '<li data-id="' + v['uid'] + '" class="zj_spr_num"> <em class="icon_personBtn icon_personBtn_msg"><i class="icon_personNext"></i></em> <em class="icon_adderBtn"></em> <p class="box_adderName">' + v['name'] + '</p> <p class="box_addermsg">步骤' + (i + 1) + '</p> </li>'
                                    }

                                })
                            }


                            $(".zj_xs_quote_create_flow_list").html(html);
                            $(".zj_xs_quote_create_flow_list li:last-child").find('i').hide();
                        }else{
                            alert(data.msg);
                        }

                    }
                })

                /*查看借出商品*/
                $.ajax({
                    type: 'POST',
                    url: SERVER_URL + "/lend/look-lend",
                    data: {
                        token: token,
                        //company_id: company_id, //公司id
                        id: id  // id

                    },
                    dataType: "json",
                    success: function (data) {
                        console.log('2000111222');
                        console.log(data);
                        console.log('2000111222');

                        if(data.code==0){

                            if(data['data'].length==0){
                                return true;
                            }

                            $(".ven_sell_quote_create_time").text(data['data']['create_time']);
                            $(".ven_sell_quote_create_uname").text(data['data']['xiadan_name']);
                            // $(".zj_xs_create_product_cost_total").val(data['data']['unit_price_total']);
                            // $(".zj_xs_create_tax_total").val(data['data']['tax_total']);
                            // $(".sell_quote_create_other_fee").val(data['data']['other_costs']);
                            // $(".zj_xs_quote_create_cost_tax_total").text(data['data']['all_money']);

                            if(data['data']['goods']){
                                var goods='';
                                $.each(data['data']['goods'],function(i,v){
                                    $.each(v,function(i2,v2){
                                        goods+='<tr>\
                                                    <td><input type="checkbox" data-id="'+v2['id']+'" data-good_id="'+v2['good_id']+'" data-good_unit="'+v2['good_unit']+'" data-good_num="'+v2['good_num']+'" data-good_rate="'+v2['good_rate']+'"></td>\
                                                    <td>'+likNullData(v2['good_name'])+'</td>\
                                                    <td>'+likNullData(v2['good_sn'])+'</td>\
                                                    <td>'+likNullData(v2['good_attr'])+'</td>\
                                                    <td>'+likNullData(v2['good_unit'])+'</td>\
                                                    <td>'+likNullData(v2['good_num'])+'</td>\
                                                    <td>'+likNullData(v2['good_price'])+'</td>\
                                                    <td>'+likNullData(v2['good_rate'])+'</td>\
                                                    <td>'+likNullData(v2['good_rate_price'])+'</td>\
                                                    <td>'+likNullData(v2['good_total'])+'</td>\
                                                    </tr>'
                                    })

                                })
                                $(".zj_xs_quote_create_chosen_goods_tbody").html(goods);
                                var complete='';
                                if(data['data']['setting']){
                                    $.each(data['data']['setting'],function(i,arr){
                                        var setting='';
                                        if(arr['good_list']){
                                            $.each(arr['good_list'],function(i2,v2){
                                                var setting_goods=''
                                                if(v2['attr_list']){
                                                    $.each(v2['attr_list'],function(i3,v3){
                                                        setting_goods+='<tr>\
                                                <td><input type="checkbox" disabled="disabled" data-id="'+v3['id']+'" data-good_attr="'+v3['good_attr']+'" data-sing_num="'+v3['sing_num']+'" data-return_num="'+v3['return_num']+'" data-good_id="'+v3['good_id']+'" data-good_rate="'+v3['good_rate']+'" data-good_unit="'+v3['good_unit']+'"></td>\
                                                <td>'+likNullData(v3['good_sn'])+'</td>\
                                                <td>'+likNullData(v3['good_attr'])+'</td>\
                                                <td>'+likNullData(v3['sing_num'])+''+v3['good_unit']+'</td>\
                                                <td>'+likNullData(v3['good_price'])+' </td>\
                                                <td>'+likNullData(v3['good_rate_price'])+' </td>\
                                                <td>'+likNullData(v3['good_total'])+' </td>\
                                                </tr>'
                                                    })
                                                }

                                                setting+='<table class="xs_bjd_table_1">\
                                                                <thead>\
                                                                <tr style="background: #fff;">\
                                                                <th class="c_3" style="font-weight: 100;">'+likNullData(v2['title'])+'</th>\
                                                                <th></th>\
                                                                <th></th>\
                                                                </tr>\
                                                                <tr>\
                                                                    <th width="32">选择</th>\
                                                                    <th width="140">编号</th>\
                                                                    <th width="435">属性</th>\
                                                                    <th width="88">数量</th>\
                                                                    <th width="88">单价</th>\
                                                                    <th width="88">含税价</th>\
                                                                    <th width="88">总价</th>\
                                                                </tr>\
                                                                </thead>\
                                                                <tbody>'+setting_goods+'\
                                                                </tbody>\
                                                            </table>'
                                            })
                                        }

                                        complete+='<div class="xs_div_2" style="border-bottom: 1px solid #e6e6e6;">\
                                               <div class="div_1 container">\
                                                <table class="xs_bjd_table">\
                                                <thead>\
                                                <tr>\
                                                <th width="32">选择</th>\
                                                <th width="140">编号</th>\
                                                <th width="100">名称</th>\
                                                <th width="375">属性</th>\
                                                <th width="65">数量</th>\
                                                <th width="88">单价</th>\
                                                <th width="88">含税价</th>\
                                                <th width="88">总价</th>\
                                                <th width="60">操作</th>\
                                                </tr>\
                                                </thead>\
                                                <tbody>\
                                                    <tr class="c_3 c_3 xs_bjd_bold">\
                                                        <td><input type="checkbox" data-id="'+arr['id']+'" data-good_attr="'+arr['good_attr']+'" data-goods_id="'+arr['goods_id']+'" data-num="'+arr['num']+'" data-good_unit="'+arr['good_unit']+'" data-containing_rate="'+arr['containing_rate']+'"></td>\
                                                        <td>'+likNullData(arr['good_sn'])+'</td>\
                                                        <td>'+likNullData(arr['good_name'])+'</td>\
                                                        <td>'+likNullData(arr['good_attr'])+'</td>\
                                                        <td>'+likNullData(arr['num'])+''+arr['good_unit']+'</td>\
                                                        <td>'+likNullData(arr['price'])+'</td>\
                                                        <td>'+likNullData(arr['containing_money'])+'</td>\
                                                        <td>'+likNullData(arr['total_money'])+'</td>\
                                                        <td><button class="but_mix box_open_btn_3 but_blue_1">展开</button></td>\
                                                    </tr>\
                                                </tbody>\
                                                </table>\
                                                </div>\
                                                </div>\
                                                <div class="xs_xsbjd_table_t2 none" style="padding: 10px;border-bottom: 2px solid #e6e6e6;">\
                                                <div class="box_open_list goods_tc_toggle">'+setting+'</div>\
                                                </div>'

                                    })
                                }

                                $(".tanceng .zj_xs_quote_create_choose_setting_box_list").html(complete);
                                /*勾选普通商品*/
                                // var x_p_price=0;
                                //var x_z_price=0
                                $(".tanceng .zj_xs_quote_create_chosen_goods_tbody input").die().live("click",function(){
                                    //var goods_price=0

                                    if($(this).is(':checked')){
                                        var one_price=parseFloat($(this).parents('tr').find('td').eq(6).text());
                                        var down_price=parseFloat($(".zj_xs_create_product_cost_total").val());

                                        var x_p_price=one_price+down_price;
                                        var goods_price=parseFloat(x_p_price);
                                        /*单价*/
                                        $(".zj_xs_create_product_cost_total").val(goods_price);
                                        /*税率*/
                                        if($(".zj_xs_quote_create_tax_num_inp").val()=='含税17%'){
                                            var tax_x=parseFloat(goods_price*0.17)
                                            $(".zj_xs_create_tax_total").val(tax_x.toFixed(2));
                                        }else{
                                            $(".zj_xs_create_tax_total").val(0);
                                        }
                                        /*总额*/
                                        var tax_ze=$(".zj_xs_create_tax_total").val();//税额
                                        var qt_znump=$(".sell_quote_create_other_fee").val();//其他
                                        var zsum_price=goods_price+parseFloat(tax_ze)+parseFloat(qt_znump);
                                        $(".zj_xs_quote_create_cost_tax_total").text(zsum_price.toFixed(2));

                                    }else{
                                        var one_p=parseFloat($(this).parents('tr').find('td').eq(6).text());
                                        var down_p=parseFloat($(".zj_xs_create_product_cost_total").val());

                                        var znum_price=parseFloat(down_p-one_p)
                                        $(".zj_xs_create_product_cost_total").val(znum_price);
                                        /*税率*/
                                        if($(".zj_xs_quote_create_tax_num_inp").val()=='含税17%'){
                                            var tax=parseFloat(znum_price*0.17)
                                            $(".zj_xs_create_tax_total").val(tax.toFixed(2));
                                        }else{
                                            $(".zj_xs_create_tax_total").val(0);
                                        }
                                        /*总额*/
                                        var tax_ze1=$(".zj_xs_create_tax_total").val();//税额
                                        var qt_znum=$(".sell_quote_create_other_fee").val();//其他
                                        var zsum_price1=znum_price+parseFloat(tax_ze1)+parseFloat(qt_znum);
                                        $(".zj_xs_quote_create_cost_tax_total").text(zsum_price1.toFixed(2));
                                    }

                                });
                                /*其他事件*/
                                $(".sell_quote_create_other_fee").die().live("keyup",function(){
                                    /*总额*/
                                    var dj_ze=$(".zj_xs_create_product_cost_total").val();
                                    var dj_se=$(".zj_xs_create_tax_total").val();//税额
                                    var qt_znumc=$(this).val();//其他
                                    var zsum_price=parseFloat(dj_ze)+parseFloat(dj_se)+parseFloat(qt_znumc);
                                    $(".zj_xs_quote_create_cost_tax_total").text(zsum_price.toFixed(2));
                                });
                                //整机商品父级勾选
                                $('.tanceng .zj_xs_quote_create_choose_setting_box_list .xs_div_2 input').die('click').live('click', function () {
                                    if ($(this).is(':checked')) {
                                        var x_z_price=parseFloat($(this).parents('tr').find('td').eq(5).text());
                                        var x_z_down=parseFloat($(".zj_xs_create_product_cost_total").val());
                                        var goods_price=parseFloat(x_z_down+x_z_price);
                                        $(".zj_xs_create_product_cost_total").val(goods_price);
                                        /*税率*/
                                        if($(".zj_xs_quote_create_tax_num_inp").val()=='含税17%'){
                                            var tax=parseFloat(goods_price*0.17)
                                            $(".zj_xs_create_tax_total ").val(tax.toFixed(2));
                                        }else{
                                            $(".zj_xs_create_tax_total ").val(0);
                                        }

                                        /*总额*/
                                        var tax_ze1=$(".zj_xs_create_tax_total").val();//税额
                                        var qt_znumz=$(".sell_quote_create_other_fee").val();//其他
                                        var zsum_price=goods_price+parseFloat(tax_ze1)+parseFloat(qt_znumz);
                                        $(".zj_xs_quote_create_cost_tax_total").text(zsum_price.toFixed(2));
                                        $(this).parents('.xs_div_2').next('.xs_xsbjd_table_t2').find('input').attr('checked', true);
                                    } else {
                                        $(this).parents('.xs_div_2').next('.xs_xsbjd_table_t2').find('input').attr('checked', false);
                                        //$(this).closest('.takenote_setting_list_one').find('input').val(0);

                                        var num1=$(".zj_xs_create_product_cost_total").val();
                                        var d_num1=parseFloat($(this).parents('tr').find('td').eq(5).text());
                                        var set_price=parseFloat(num1-d_num1);
                                        $(".zj_xs_create_product_cost_total").val(set_price.toFixed(2));
                                        /*税率*/
                                        if($(".zj_xs_quote_create_tax_num_inp").val()=='含税17%'){
                                            var tax1=parseFloat(set_price*0.17)
                                            $(".zj_xs_create_tax_total").val(tax1.toFixed(2));
                                        }else{
                                            $(".zj_xs_create_tax_total").val(0);
                                        }
                                        /*总额*/
                                        var tax_z=$(".zj_xs_create_tax_total").val();//税额
                                        var qt_znumc=$(".sell_quote_create_other_fee").val();//其他
                                        var zsum_p=set_price+parseFloat(tax_z)+parseFloat(qt_znumc);
                                        $(".zj_xs_quote_create_cost_tax_total").text(zsum_p.toFixed(2));
                                    }
                                });

                            }
                        }

                    }
                });
                var xsbjd_data={
                    token: token,
                    code_sn:'',
                    lend_id:'',
                    customer_id:'',
                    tax_rate:'',
                    is_freight:'',
                    logistics_type:'',
                    flow:'',
                    goods:'',
                    setting:'',
                    customer_name:''


                }
                /*****************转销售确定but*/
                $(".tanceng .zj_xs_quote_create_submit").die().live("click",function(){
                    var _this=this;
                    xsbjd_data.code_sn=$(".tanceng .zj_xs_quote_create_code").val();
                    xsbjd_data.lend_id=id;
                    xsbjd_data.customer_id=supplier_id;
                    xsbjd_data.customer_name=supplier_name;
                    if($(".tanceng .zj_xs_quote_create_tax_num_inp").val()=='含税17%'){
                        xsbjd_data.tax_rate=1;
                    }else{
                        xsbjd_data.tax_rate=0;
                    }
                    if($(".tanceng .zj_xs_quote_create_freight_checkbox").is(':checked')){
                        xsbjd_data.is_freight=1;
                    }else{
                        xsbjd_data.is_freight=2;
                    }
                    if($(".tanceng .zj_xs_quote_create_choose_logistics_inp").val()=='快递'){
                        xsbjd_data.logistics_type=1;
                    }else if($(".tanceng .zj_xs_quote_create_choose_logistics_inp").val()=='陆运'){
                        xsbjd_data.logistics_type=2;
                    }else if($(".tanceng .zj_xs_quote_create_choose_logistics_inp").val()=='空运'){
                        xsbjd_data.logistics_type=3;
                    }else if($(".tanceng .zj_xs_quote_create_choose_logistics_inp").val()=='平邮'){
                        xsbjd_data.logistics_type=4;
                    }else if($(".tanceng .zj_xs_quote_create_choose_logistics_inp").val()=='海运'){
                        xsbjd_data.logistics_type=5;
                    }

                    xsbjd_data.money_sum=$(".tanceng .zj_xs_create_product_cost_total").val();
                    xsbjd_data.tax_money_sum=$(".tanceng .zj_xs_create_tax_total").val();
                    xsbjd_data.other_free= $(".tanceng .sell_quote_create_other_fee").val();
                    xsbjd_data.totals=$(".tanceng .zj_xs_quote_create_cost_tax_total").text();
                    if($(".tanceng .zj_xs_quote_create_note_textarea").val()=='请输入备注'){
                        xsbjd_data.note='';
                    }else{
                        xsbjd_data.note=$(".tanceng .zj_xs_quote_create_note_textarea").val();
                    }


                    var xs_spr=[];
                    $(".tanceng .zj_xs_quote_create_flow_list .zj_spr_num").each(function(){
                        xs_spr.push($(this).data('id'));
                    })
                    xsbjd_data.flow=xs_spr.toString();
                    /*商品*/
                    var jrgh_goods=[];
                    var xs_pt_goods={};
                    $(".tanceng .zj_xs_quote_create_chosen_goods_tbody tr input").each(function(i){
                        if($(this).is(':checked')){
                            jrgh_goods.push({
                                good_id:$(this).data('id'),
                                good_name:$(this).parents('tr').find('td').eq(2).text(),
                                good_sn:$(this).parents('tr').find('td').eq(1).text(),
                                good_attr: $(this).parents('tr').find('td').eq(3).text(),
                                good_unit:$(this).data('good_unit'),
                                good_num:$(this).data('good_num'),
                                good_price:$(this).parents('tr').find('td').eq(6).text(),
                                good_rate:$(this).data('good_rate'),
                                good_rate_price:$(this).parents('tr').find('td').eq(8).text(),
                                good_total:$(this).parents('tr').find('td').eq(9).text()
                            })
                        }
                    })
                    xs_pt_goods.goods=jrgh_goods;
                    xs_pt_goods.sum_total = $('.tanceng .zj_jcd_goods_hj_sum').html();// 普通商品总价额
                    var jrgh_goods_info=JSON.stringify(xs_pt_goods);
                    xsbjd_data.goods=jrgh_goods_info;
                    /*整机商品*/
                    var zj_goods=[];
                    var xs_goods_info={};
                    $(".tanceng .zj_xs_quote_create_choose_setting_box_list .xs_div_2 tbody input").each(function (i) {
                        var match_goods=[];
                        if($(this).is(':checked')){
                            $(".tanceng .zj_xs_quote_create_choose_setting_box_list .xs_xsbjd_table_t2").eq(i).find('thead').each(function(i2){
                                var pz_goods=[];
                                $(".tanceng .zj_xs_quote_create_choose_setting_box_list .xs_xsbjd_table_t2 table tbody").eq(i2).find('input:checkbox').each(function (i3) {

                                    pz_goods.push({
                                        good_id: $(this).data('id'),
                                        good_sn: $(this).parents('tr').find('td').eq(1).text(),
                                        good_attr: $(this).data('good_attr'),
                                        sing_num: $(this).data('sing_num'),
                                        total_num: $(this).data('return_num'),
                                        good_price: $(this).parents('tr').find('td').eq(4).text(),
                                        good_rate: $(this).data('good_rate'),
                                        good_rate_price: $(this).parents('tr').find('td').eq(5).text(),
                                        good_total: $(this).parents('tr').find('td').eq(6).text()
                                    })

                                })

                                match_goods.push({
                                    title:$(this).find('th').eq(0).text(),
                                    attr_list:pz_goods
                                })

                            })

                            zj_goods.push({
                                setting_id:$(this).data('id'),
                                setting_name:$(this).parents('tr').find('td').eq(2).text(),
                                setting_sn:$(this).parents('tr').find('td').eq(1).text(),
                                setting_unit:$(this).data('good_unit'),
                                setting_attr:$(this).data('good_attr'),
                                setting_num:$(this).data('num'),
                                setting_price:$(this).parents('tr').find('td').eq(5).text(),
                                setting_rate:$(this).data('containing_rate'),
                                setting_rate_price:$(this).parents('tr').find('td').eq(6).text(),
                                setting_total:$(this).parents('tr').find('td').eq(7).text(),
                                good_list:match_goods
                            })
                        }
                    })
                    // var jcd_goods_info=JSON.stringify(jrgh_goods);
                    // var jcd_goods_zj=JSON.stringify(zj_goods);
                    // xsbjd_data.goods=jcd_goods_info;
                    // xsbjd_data.setting=jcd_goods_zj;
                    xs_goods_info.setting=zj_goods;
                    xs_goods_info.sum_total=$(".tanceng .zj_jcd_complete_goods_price_sum").text();
                    var jrgh_goods_zj=JSON.stringify(xs_goods_info);
                    xsbjd_data.setting=jrgh_goods_zj;
                    /*转商品数量*/
                    var goods_sum=0;
                    $(".tanceng .zj_xs_quote_create_chosen_goods_tbody input").each(function(){
                        if($(this).is(":checked")){
                            goods_sum+=parseFloat($(this).data('good_num'));
                        }

                    })
                    /*转整机数量*/
                    var zj_sum=0;
                    $(".tanceng .zj_xs_create_link_lend_setting .xs_div_2 tbody input").each(function(){
                        if($(this).is(":checked")){
                            zj_sum+=parseFloat($(this).data('num'));
                        }

                    })
                    $.ajax({
                        type: 'post',
                        url: SERVER_URL + "/quote/add",
                        data: xsbjd_data,
                        dataType: "json",
                        success: function (data) {
                            console.log('300');
                            console.log(data);
                            console.log('300');
                            if(data.code==0){
                                $(_this).parents('.dialog_content_middle5').find('.dialog_close').click();
                                $.ajax({
                                    type: 'post',
                                    url: SERVER_URL + "/lend/to-quote",
                                    data: {
                                        token: token,
                                        id:id,
                                        good_lend_num:goods_sum,
                                        computer_lend_num:zj_sum
                                    },
                                    dataType: "json",
                                    success: function (data) {
                                        console.log('3003');
                                        console.log(data);
                                        console.log('3003');
                                        if(data.code==0){
                                            $(zxs_this).parents('.dialog_content_middle5').find('.dialog_close').click();
                                        }
                                    }
                                })


                            }
                        }
                    })
                });
            });

        });
        $("#zj_jbinfo_left_head_table").trigger('click');
        /*查看详情*/
        $(".zj_jcd_check_jcgh_info_btn").die().live("click",function(){
            var gh_id=$(this).data('id');
            $.ajax({
                type: 'POST',
                url: SERVER_URL + "/lend/look-lend",
                data: {
                    token: token,
                    //company_id: company_id, //公司id
                    id: checkid// 用户id
                },
                dataType: "json",
                success: function (data) {
                    console.log('20001110000000000000000');
                    console.log(data);
                    console.log('20001110000000000000000');
                    if(data.code==0){
                        if(data['data'].length==0){
                            return true;
                        }
                        $(".zj_jcd_jcgh_kh_name_show").text(data['data']['supplier_name']);
                        $(".zj_jcgh_quote_look_create_at").text(data['data']['xiadan_name']);
                        $(".zj_jcgh_quote_look_uname").text(data['data']['create_time']);
                        $(".zj_jcgh_info_header_content .zj_info_show").eq(0).text(data['data']['code_sn']);
                        $(".zj_jcgh_info_header_content .zj_info_show").eq(1).text(data['data']['supplier_name']);
                        $(".zj_jcgh_info_header_content .zj_info_show").eq(2).text(data['data']['expect_return_time']);
                        $(".zj_jcgh_info_header_content .zj_info_show").eq(3).text(data['data']['send_time']);


                        // $(".zj_look_info_header_content .zj_jcd_bh_show_info").eq(6).text(data['data']['receiver']);
                        // $(".zj_look_info_header_content .zj_jcd_bh_show_info").eq(7).text(data['data']['mobile']);
                        // $(".zj_look_info_header_content .zj_jcd_bh_show_info").eq(8).text(data['data']['address']);
                        // $(".zj_look_info_header_content .zj_jcd_bh_show_info").eq(9).text(data['data']['note']);

                        // if(data['data']['goods']['sum_total']){
                        //     $(".tanceng .xs_bjd_bold .zj_jcd_goods_hj_sum").text(data['data']['goods']['sum_total']);
                        // }
                        /*  if(data['data']['setting']['sum_total']){
                         $(".xs_bjd_bold .zj_jcd_complete_goods_price_sum").text(data['data']['setting']['sum_total']);
                         }*/


                        /*ff*/
                        $(".zj_jcd_unit_price_hj").text(data['data']['unit_price_total']);
                        $(".zj_jcd_contain_tax").text(data['data']['tax_total']);
                        $(".zj_jcd_other_cost").text(data['data']['other_costs']);
                        $(".zj_jcd_sum_price_num").text(data['data']['all_money']);


                        var html='';
                        $.each(data['data']['goods'],function(i,v){
                            $.each(v,function(i2,v2){
                                html+='<tr>\
                            <td>'+likNullData(v2['good_sn'])+'</td>\
                            <td>'+likNullData(v2['good_name'])+'</td>\
                            <td>'+likNullData(v2['good_attr'])+'</td>\
                            <td>'+likNullData(v2['good_num'])+''+v2['good_unit']+'</td>\
                            <td>'+likNullData(v2['return_num'])+''+v2['good_unit']+'</td>\
                            <td></td>\
                            </tr>'
                            })

                        })
                        $(".zj_check_jrghd_pt_goods_info").html(html);
                        /*整机商品*/

                        var complete='';
                        $.each(data['data']['setting'],function(i,arr){
                            var setting='';
                            if(arr['good_list']){
                                $.each(arr['good_list'],function(i2,v2){
                                    var setting_goods=''
                                    if(v2['attr_list']){
                                        $.each(v2['attr_list'],function(i3,v3){
                                            setting_goods+='<tr>\
                                                <td>'+likNullData(v3['good_sn'])+'</td>\
                                                <td>'+likNullData(v3['good_attr'])+'</td>\
                                                <td>'+likNullData(v3['sing_num'])+''+v3['good_unit']+'</td>\
                                                <td>'+likNullData(v3['return_num'])+''+v3['good_unit']+'</td>\
                                                <td></td>\
                                                </tr>'
                                        })
                                    }

                                    setting+='<table class="xs_bjd_table_1">\
                                <thead>\
                                <tr style="background: #fff;">\
                                <th class="c_3" style="font-weight: 100;">'+likNullData(v2['title'])+'</th>\
                                <th></th>\
                                <th></th>\
                                </tr>\
                                <tr>\
                                   <th width="140">编号</th>\
                                   <th width="360">属性</th>\
                                   <th width="70">借出数量</th>\
                                   <th width="70">归还数量</th>\
                                   <th width="60"></th>\
                                </tr>\
                                </thead>\
                                <tbody>'+setting_goods+'\
                                </tbody>\
                            </table>'
                                })
                            }

                            complete+='<div class="xs_div_2" style="margin-top: 20px;">\
                            <table class="xs_bjd_table">\
                            <thead>\
                            <tr>\
                               <th width="140">编号</th>\
                               <th width="120">名称</th>\
                               <th width="240">属性</th>\
                               <th width="70">借出数量</th>\
                               <th width="70">归还数量</th>\
                               <th width="60">配件</th>\
                            </tr>\
                            </thead>\
                            <tbody>\
                                <tr class="c_3 c_3 xs_bjd_bold">\
                                    <td>'+likNullData(arr['good_sn'])+'</td>\
                                    <td>'+likNullData(arr['good_name'])+'</td>\
                                    <td>'+likNullData(arr['good_attr'])+'</td>\
                                    <td>'+likNullData(arr['num'])+''+arr['good_unit']+'</td>\
                                    <td>'+likNullData(arr['return_num'])+''+arr['good_unit']+'</td>\
                                    <td><button class="but_mix box_open_btn_1 but_blue_1">展开</button></td>\
                                </tr>\
                            </tbody>\
                            </table>\
                            </div>\
                            <div class="xs_tc_goods_box goods_tc_toggle" style="display: none;">'+setting+'</div>'

                        })


                        $(".tanceng .zj_check_jrghd_complate_info").html(complete);
                        // var z_sum=0;
                        // $(".tanceng .zj_jcd_complete_goods_dv_content .zj_pzzj_goods_sum_price").each(function () {
                        //     z_sum+=parseFloat($(this).text());
                        // })
                        // $(".zj_jcd_complete_goods_price_sum").text(z_sum);
                    }

                }
            })
        });
    });






//    关联销售订单
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
        sellQuoteCurrentId = $(this).closest('tr').attr('vensellquoteid');
        sellOrderCurrentId = $(this).closest('tr').attr('sellorderid');
        $.ajax({
            url: SERVER_URL + '/order/info',
            type: 'GET',
            data: {
                token: token,
                order_id: sellQuoteCurrentId,
                type:2
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



});
