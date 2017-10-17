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

    var token, pid, key, page, limit, word_titl, goods_id, goods_pid, goods_member, goods_enddate, goods_fileurl, goods_imgurl, w_p_n;
    token = Admin.get_token();
    //	补零函数
    function l_dbl(x) {
        return x < 10 ? '0' + x : x
    }

    // 定义选择查看项
    var venReproductLookAbledField = [
        {'index': null, 'field': '税额(元)'},
        {'index': null, 'field': '退款总金额(元)'},
        {'index': null, 'field': '退换货日期'},
        {'index': null, 'field': '预计退款日期'},
        {'index': null, 'field': '负责人'},
        {'index': null, 'field': '创建日期'},
        {'index': null, 'field': '创建人'},
        {'index': null, 'field': '入库状态'},
        {'index': null, 'field': '出库状态'}
    ];
    likShow('#ven_reproduct_table', venReproductLookAbledField, '#ven_reproduct_look_ul', '#ven_reproduct_look_save', '#ven_reproduct_look_reset');

    // 定义销售退换货参数
    var reproductData = {
        token: token,
        page: 1, //页面
        num: 10, //每页条数
        key: '',//关键字
        service_at: '',//退换货日期
        thetype: '',//退换货类型（1换货2退货）
        in_status: '',//入库状态（0未1已）
        out_status: '',//出库状态（0未1已）
        owner: '',//负责人
        created_at: '',//制单日期
        uid: '' //制单人
    };

    getReproductList('/reproduct/mylist');

    // 销售退换货查看我发起的
    $('#ven_reproduct_searMine').live('click', function () {
        reproductData.page = 1;
        getReproductList('/reproduct/mylist');
    });
    // 销售退换货查看我审批的
    $('#ven_reproduct_searMycheck').live('click', function () {
        reproductData.page = 1;
        getReproductList('/reproduct/mychecklist');
    });

    // 获取销售退换货列表
    function getReproductList(url) {
        $.ajax({
            url: SERVER_URL + url,
            type: 'GET',
            data: reproductData,
            success: function (e) {
                // 将返回值转换为json对象
                var oE = eval("(" + e + ")");
                if (oE.code == 0) {
                    //获取datalist
                    var datalist = oE.datalist;
                    console.log(datalist);
                    if (datalist.length == 0) {
                        $('.ven_reproduct_nodata_box').removeClass('none');
                        $('.ven_reproduct_handle').addClass('none');
                    } else {
                        $('.ven_reproduct_nodata_box').addClass('none');
                        $('.ven_reproduct_handle').removeClass('none');
                    }
                    //字符串拼接
                    var reproductHtml = '';
                    $.each(datalist, function (i, v) {
                        // 审批状态判断
                        var sStatus = '';
                        var statusBtn = '';
                        if (v['status'] == 0) {
                            sStatus = '<span class="c_g">通过</span>';
                            statusBtn = '<button class="but_mix but_cancal but_void but_r ven_reproduct_zf">作废</button>';
                        } else if (v['status'] == 1 && url == '/reproduct/mylist') {
                            sStatus = '<span class="c_r">审批中</span>';
                            statusBtn = '<button class="but_mix but_cancal but_exit val_dialogTop" name="xs_thh_new">编辑</button><button class="but_mix but_cancal but_void but_r ven_reproduct_zf">作废</button>';
                        } else if (v['status'] == 1 && url == '/reproduct/mychecklist') {
                            sStatus = '<span class="c_r">审批中</span>';
                            statusBtn = '<button class="but_mix but_look val_dialog ven_reproduct_sp_btn" name="xs_thh_spckxq">审批</button><button class="but_mix but_cancal but_void but_r ven_reproduct_zf">作废</button>';
                        }
                        // 入库状态判断
                        var sInStatus = '';
                        if (v['in_status'] == 0) {
                            sInStatus = '未入库';
                        } else if (v['in_status'] == 1) {
                            sInStatus = '已入库';
                        }
                        // 出库状态判断
                        var sOutStatus = '';
                        if (v['out_status'] == 0) {
                            sOutStatus = '未出库';
                        } else if (v['out_status'] == 1) {
                            sOutStatus = '已出库';
                        }
                        //作废状态判断
                        invalidClass = '';
                        invalidStatus = '';
                        if (v['is_invalid'] == 0) {
                            invalidClass = '';
                            invalidStatus = l_dbl(i + 1);
                        } else if (v['is_invalid'] == 1) {
                            invalidClass = 'grey';
                            invalidStatus = '<span class="voidIcon">作废</span>';
                            sStatus = '<span>已作废</span>';
                            statusBtn = '';
                        }
                        reproductHtml += '<tr reproductid="' + v['id'] + '" class="' + invalidClass + '">\
                                                <td>' + invalidStatus + '</td>\
                                                <td>' + v['code_sn'] + '(补)</td>\
                                                <td>' + v['order_code_sn'] + '</td>\
                                                <td>' + v['customer_name'] + '</td>\
                                                <td>' + v['reproduct_name'] + '</td>\
                                                <td>' + (v['thetype'] == 1 ? "换货" : "退货") + '</td>\
                                                <td>' + v['tax'] + '</td>\
                                                <td>' + v['totals'] + '</td>\
                                                <td>' + v['service_at'].split(' ')[0] + '</td>\
                                                <td>' + v['returnmoney_at'].split(' ')[0] + '</td>\
                                                <td>' + sStatus + '</td>\
                                                <td>' + v['current_name'] + '</td>\
                                                <td>' + v['owner_name'] + '</td>\
                                                <td>' + v['created_at'].split(' ')[0] + '</td>\
                                                <td>' + v['uname'] + '</td>\
                                                <td>' + sInStatus + '</td>\
                                                <td>' + sOutStatus + '</td>\
                                                <td>' + v['note'] + '</td>\
                                                <td>\
                                                <button class="but_mix but_cancal but_look r_sidebar_btn ven_reproduct_look" name="xs_thh_look">查看</button>' + statusBtn + '\
                                                </td>\
                                            </tr>';
                    });
                    //销售退换货数据渲染
                    $('#ven_reproduct_list').html(reproductHtml);
                }
                //分页
                list_table_render_pagination('.ven_reproduct_pagination', reproductData, getReproductList, oE.totalcount, datalist.length, url);
                $('#ven_reproduct_look_save').trigger('click');

            }
        });
        //搜索结果条数
        venReproductSearchNum(url);
    }


    //刷新列表
    $('#ven_reproduct_refresh').live('click', function () {
        reproductData = {
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
        $('#ven_reproduct_searKey').val('搜索成员/部门/手机等').css('color', '#CCCCCC');
        $('#ven_reproduct_search_name_inp').val('客户名称').css('color', '#CCCCCC');
        $('#ven_reproduct_search_thetype_inp').val('拜访类型').css('color', '#CCCCCC');
        $('#ven_reproduct_search_uname_inp').val('创建人').css('color', '#CCCCCC');
        $('#ven_reproduct_search_owner_inp').val('负责人').css('color', '#CCCCCC');
        getReproductList();
    });
    //搜索关键字
    $('#ven_reproduct_searKey_btn').live('click', function () {
        if ($('#ven_reproduct_searKey').val() == '搜索成员/部门/手机等') {
            alert('请输入搜索关键字');
        } else {
            reproductData.key = $('#ven_reproduct_searKey').val();
            getReproductList();
        }
    });
    //不显示完成售后
    $('#ven_reproduct_notshowok_btn').live('click', function () {
        if ($(this).attr('checked') == 'checked') {
            reproductData.notshowok = 1;
        } else {
            reproductData.notshowok = '';
        }
        getReproductList();
    });

    //高级搜索 控制下拉框
    //venReproductSearch();
    function venReproductSearch() {
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
                    //高级搜索 创建人 数组
                    var searchUnameArr = [];
                    //高级搜索遍历
                    $.each(datalist, function (i, v) {
                        //高级搜索 客户名称
                        sSearchCusNameUl += '<li>' + v['name'] + '</li>';
                        //高级搜索 负责人
                        searchOwnerName += '<li searchOwnerId="' + v['owner'] + '">' + v['owner_name'] + '</li>';
                        //提取创建人数组
                        searchUnameArr.push({uid: v['uid'], uname: v['uname']});
                    });
                    //高级搜索 客户名称
                    $('#ven_reproduct_search_cus_name_ul').html(sSearchCusNameUl);
                    //高级搜索 创建人
                    $.each(getJsonArr(searchUnameArr), function (i, v) {
                        searchUnameUl += '<li searchUid="' + v['uid'] + '">' + v['uname'] + '</li>'
                    });
                    $('#ven_reproduct_search_uname_ul').html(searchUnameUl);
                    // 高级搜索 负责人
                    $('#ven_reproduct_search_owner_ul').html(searchOwnerName);
                }
            }
        })
    }


    //高级搜索 控制搜索条数
    //venReproductSearchNum();
    function venReproductSearchNum(url) {
        $.ajax({
            url: SERVER_URL + url,
            type: 'GET',
            data: {
                token: token
            },
            success: function (e) {
                // 将返回值转换为json对象
                var oE = eval("(" + e + ")");
                if (oE.code == 0) {
                    //搜索总条数
                    $('#ven_reproduct_search_total').html(oE.totalcount);
                }
            }
        })
    }

    //查看
    var reproductCurrentId = null;
    $('.ven_reproduct_look').live('click', function () {
        reproductCurrentId = $(this).closest('tr').attr('reproductid');
        reproductInfoFn()
    });
    //退换货详情
    function reproductInfoFn() {
        $.ajax({
            url: SERVER_URL + '/reproduct/info',
            type: 'GET',
            data: {
                token: token,
                reproduct_id: reproductCurrentId
            },
            success: function (e) {
                // 将返回值转换为json对象
                var oE = eval("(" + e + ")");
                if (oE.code == 0) {
                    var data = oE.data;
                    console.log(data);
                    //客户名称
                    $('.ven_reproduct_look_name').html(data['customer_name']);
                    //创建时间
                    $('.ven_reproduct_look_created_at').html(data['created_at']);
                    //更多列表
                    if (data['status'] == 0) {
                        var reproductLookMoreUl = '<li>作废</li>'
                    } else if (data['status'] == 1) {
                        var reproductLookMoreUl = '<li>编辑</li><li>作废</li>'
                    }
                    if (data['is_invalid'] == 1) {
                        $('.slider_head_More').css('display', 'none');
                        $('.ven_reproduct_look_more_ul').html('');
                    } else {
                        $('.slider_head_More').css('display', '');
                        $('.ven_reproduct_look_more_ul').html(reproductLookMoreUl);
                    }

                    //退换货编号
                    $('.ven_reproduct_look_code_sn').html(data['code_sn']);
                    //关联销售订单编号
                    $('.ven_reproduct_look_order_code_sn').html(data['order_code_sn']);
                    //供应商
                    $('.ven_reproduct_look_name').html(data['customer_name']);
                    //退换商品
                    $('.ven_reproduct_look_reproduct_name').html(data['reproduct_name']);
                    //退换货类型
                    if (data['thetype'] == 1) {
                        $('.ven_reproduct_look_thetype').html('换货');
                    } else if (data['thetype'] == 2) {
                        $('.ven_reproduct_look_thetype').html('退货');
                    }
                    //税额
                    $('.ven_reproduct_look_tax').html(data['tax']);
                    //总金额
                    $('.ven_reproduct_look_totals').html(data['totals']);
                    //退换货时间
                    $('.ven_reproduct_look_service_at').html(data['service_at']);
                    //审批状态
                    $('.ven_reproduct_look_status_name').html(data['status_name']);
                    //审批人
                    $('.ven_reproduct_look_current_name').html(data['current_name']);
                    //负责人
                    $('.ven_reproduct_look_owner_name').html(data['owner_name']);
                    //创建人
                    $('.ven_reproduct_look_uname').html(data['uname']);
                    //入库状态
                    if (data['in_status'] == 0) {
                        $('.ven_reproduct_look_in_status').html('未入库');
                    } else if (data['in_status'] == 1) {
                        $('.ven_reproduct_look_in_status').html('已入库');
                    }
                    //出库状态
                    if (data['in_status'] == 0) {
                        $('.ven_reproduct_look_out_status').html('未出库');
                    } else if (data['in_status'] == 1) {
                        $('.ven_reproduct_look_out_status').html('已出库');
                    }
                    //预计退款日期
                    $('.ven_reproduct_look_out_status').html(data['returnmoney_at']);
                    //负责部门
                    $('.ven_reproduct_look_dept_name').html(data['dept_name']);
                }
            }
        })
    }

    //作废
    $('.ven_reproduct_zf').live('click', function () {
        reproductCurrentId = $(this).closest('tr').attr('reproductid');
        $.ajax({
            url: SERVER_URL + '/reproduct/setstatus',
            type: 'POST',
            data: {
                token: token,
                reproduct_id: reproductCurrentId,
                status_flag: 1
            },
            success: function (e) {
                // 将返回值转换为json对象
                var oE = eval("(" + e + ")");
                if (oE.code == 0) {
                    if ($('.ven_reproduct_search_ul li.tabhover').html() == '我发起的') {
                        getReproductList('/reproduct/mylist')
                    } else if ($('.ven_reproduct_search_ul li.tabhover').html() == '我审批的') {
                        getReproductList('/reproduct/mychecklist')
                    }
                    alert(oE.msg)
                }
            }
        })
    });
    //新建退换货
    var reproductCreateData = {
        reproduct_id: 1,     //退换货id，有值为修改
        code_sn: "",         //编号
        order_id: '',        //订单id
        customer_id: '',     //客户id
        contacts: '',        //联系人
        tel: '',             //联系人电话
        thetype: 1,         //业务类型	1是换货2是退货
        service_at: '',      //退换货时间
        returnmoney_at: '',  //预计退款时间
        dept: '',            //负责部门
        owner: '',           //负责人id
        note: '',            //备注
        flow: '',            //审批流程
        freight: '',         //运费
        other_free: '',      //其他费用,单位分
        is_old: 0            //是否旧数据追加	0不是1是
    };
    //选择销售订单
    $('.tanceng .ven_reproduct_create_choose_sell_order_btn').live('click', function () {
        reproductCreateGetSellOrderList();
    });

    // 获取销售订单列表
    var reproductSellOrderData = {
        token: token,
        page: 1, //页面
        num: 10, //每页条数
        list_type: 'my', //查询类型：空是所有，team团队订单 my我的订单copy抄送给我的
        key: ''//关键字
    };

    function reproductCreateGetSellOrderList() {
        $.ajax({
            url: SERVER_URL + '/order/list',
            type: 'GET',
            data: reproductSellOrderData,
            success: function (e) {
                // 将返回值转换为json对象
                var oE = eval("(" + e + ")");
                if (oE.code == 0) {
                    //获取datalist
                    var datalist = oE.datalist;
                    console.log(datalist);
                    if (datalist.length == 0) {
                        $('.ven_reproduct_create_sell_order_nodata_box').removeClass('none');
                        $('.ven_reproduct_create_sell_order_handle').addClass('none');
                    } else {
                        $('.ven_reproduct_create_sell_order_nodata_box').addClass('none');
                        $('.ven_reproduct_create_sell_order_handle').removeClass('none');
                    }
                    //字符串拼接
                    var sellOrderHtml = '';
                    $.each(datalist, function (i, v) {
                        sellOrderHtml += '<tr sellorderid="' + v['id'] + '" vensellordercustomid="' + v['customer_id'] + '">\
                            <td><input type="radio" name="xs_xsdd_xzxsbjdinp"></td>\
                            <td>' + (datalist[i]['code_sn']) + '</td>\
                            <td>' + (datalist[i]['name']) + '</td>\
                            <td>' + (datalist[i]['created_at'].split(' ')[0]) + '</td>\
                            <td>' + (datalist[i]['uname']) + '</td>\
                            <td>' + (datalist[i]['dept_name']) + '</td>\
                            <td>' + (datalist[i]['owner_name']) + '</td>\
                            <td>' + (datalist[i]['delivery_at'].split(' ')[0]) + '</td>\
                            <td>' + (datalist[i]['totals_product']) + '</td>\
                            <td>缺</td>\
                            <td>' + (datalist[i]['totals']) + '</td>\
                            <td>' + (datalist[i]['is_pay']) + '</td>\
                            <td>' + (datalist[i]['is_ticket']) + '</td>\
                        </tr>';
                    });
                    //销售订单数据渲染
                    $('.tanceng .ven_reproduct_create_sell_order_list').html(sellOrderHtml);
                }
                //分页
                list_table_render_pagination('.ven_reproduct_create_sell_order_page', reproductSellOrderData, reproductCreateGetSellOrderList, oE.totalcount, datalist.length);

            }
        });
        //搜索结果条数
        reproductCreateSellOrderSearchNum();
    }

    //高级搜索 控制搜索条数
    function reproductCreateSellOrderSearchNum() {
        $.ajax({
            url: SERVER_URL + '/order/list',
            type: 'GET',
            data: {
                token: token,
                list_type: reproductSellOrderData.list_type,
                key: reproductSellOrderData.key
            },
            success: function (e) {
                // 将返回值转换为json对象
                var oE = eval("(" + e + ")");
                if (oE.code == 0) {
                    //搜索总条数
                    $('.tanceng .ven_reproduct_create_sell_order_total').html(oE.totalcount);
                }
            }
        })
    }


    //搜索关键字
    $('.tanceng .ven_reproduct_create_sell_order_searKey_btn').live('click', function () {
        if ($('.tanceng .ven_reproduct_create_sell_order_searKey').val() == '搜索销售订单编号') {
            alert('请输入搜索关键字');
        } else {
            reproductSellOrderData.key = $('.tanceng .ven_reproduct_create_sell_order_searKey').val();
            reproductCreateGetSellOrderList();
        }
    });

    //新建销售退换货 - 选择销售订单 - 确定
    $('.tanceng .ven_reproduct_create_choose_sell_order_save').live('click', function () {
        var chosenOrder = $('.tanceng .ven_reproduct_create_sell_order_list input:checked').closest('tr');
        reproductCreateData.order_id = chosenOrder.attr('sellorderid');
        reproductCreateData.customer_id = chosenOrder.attr('vensellordercustomid');
        reproductCreateData.contacts = chosenOrder.attr('vensellordercontacts');
        reproductCreateData.tel = chosenOrder.attr('vensellordertel');
        $('.tanceng .ven_reproduct_link_order_code_inp').val(chosenOrder.find('td').eq(1).html());
        $('.tanceng .ven_reproduct_create_custom_name').val(chosenOrder.find('td').eq(2).html());
        $('.tanceng .ven_reproduct_create_contacts').val(chosenOrder.attr('vensellordercontacts'));
        $('.tanceng .ven_reproduct_create_owner').val(chosenOrder.find('td').eq(8).html());
        $(this).closest('.dialog_box').remove();
    });

    //选择售后类型
    $('.tanceng .ven_reproduct_create_choose_thetype_ul li').live('click', function () {
        reproductCreateData.thetype = $(this).index + 1
    });

    //选择负责人
    $('.tanceng .ven_reproduct_create_choose_owner_btn').live('click', function () {
        afterOrderChooseOwnerFn()
        //选择负责人
        $('.tanceng .person_left_nav').live('click', function () {
            reproductCreateData.owner = $(this).attr('userinfoid');
            reproductCreateData.dept = $(this).closest('ul').prev('li.left_1').attr('cussortid');
        });
        //选择负责人确认
        $('.tanceng .reproduct_create_choose_owner_save').live('click', function () {
            $('.tanceng .reproduct_create_owner_inp').val($('.tanceng .list_check').closest('li').find('.list_msg').html());
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
            success: function (e) {
                // 将返回值转换为json对象
                var oE = eval("(" + e + ")");
                if (oE.code == 0) {
                    var datalist = oE.rows;
                    var deep = 0;
                    $('.tanceng .ven_reproduct_create_owner_list').html(tree_list_person(datalist, deep));
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


    //新建销售退换货 提交
    $('.tanceng .ven_reproduct_create_submit_btn').live('click', function () {
        if ($('.tanceng .ven_reproduct_create_service_at').val() == '请选择日期') {
            alert('请选择退换货时间');
            return false;
        } else {
            reproductCreateData.service_at = $('.tanceng .ven_reproduct_create_service_at').val();
        }
        if ($('.tanceng .ven_reproduct_create_returnmoney_at').val() == '请选择日期') {
            alert('请选择预期退款时间');
            return false;
        } else {
            reproductCreateData.returnmoney_at = $('.tanceng .ven_reproduct_create_returnmoney_at').val();
        }
        if ($('.tanceng .reproduct_create_owner_inp').val() == '请选择负责人') {
            alert('请选择负责人');
            return false;
        }
        console.log(reproductCreateData)
    });

    //我审批的 - 审批
    var reproductSpResult = {
        token: token,
        check_type: '',                     //处理类型： 1通过，2拒绝
        reproduct_id: reproductCurrentId,   //退换货id，
        note: ''                            //"审批意见"
    };
    $('.ven_reproduct_sp_btn').live('click', function () {
        reproductCurrentId = $(this).closest('tr').attr('reproductid');
        reproductSpResult.reproduct_id = reproductCurrentId;
        reproductInfoFn();
    });
    //通过
    $('.tanceng .ven_reproduct_sp_pass').live('click', function(){
        reproductSpResult.check_type = 1
    })
    //拒绝
    $('.tanceng .ven_reproduct_sp_refuse').live('click', function(){
        reproductSpResult.check_type = 2
    })
    //提交审批
    $('.tanceng .ven_reproduct_sp_save_btn').live('click', function(){
        if($('.tanceng .ven_reproduct_sp_note').val() == '请输入审批意见'){
            alert('请输入审批意见');
            return false;
        }else{
            reproductSpResult.note = $('.tanceng .ven_reproduct_sp_note').val();
        }
        $.ajax({
            url: SERVER_URL + '/reproduct/check',
            type: 'POST',
            data: reproductSpResult,
            success: function (e) {
                // 将返回值转换为json对象
                var oE = eval("(" + e + ")");
                console.log(oE);
                if (oE.code == 0) {
                }
            }
        })
    })

});
