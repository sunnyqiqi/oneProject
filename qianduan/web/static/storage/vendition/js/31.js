SERVER_URL = 'http://192.168.0.167:9091';
$(function () {

    //	tree list
    function tree_list(datalist) {
        var html = '';
        $.each(datalist, function (index, data) {
            html += '<ul class="hr_ul1 change">';
//			html += '<li class="hr_left_1" cusSortId="' + data["id"] + '"><span>' + data['name'] + '&nbsp;<em class="list_num_null">(<i>'+data['children'].length+'</i>)</em></span></li>';
            html += '<li class="hr_left_1" cusSortId="' + data["id"] + '"><span>' + data['name'] + '&nbsp;<em class="list_num_null">(<i></i>)</em></span></li>';
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
            html += '<li class="left_1" cusSortId = "' + data["id"] + '">' + html_i_list_before + '<span class="icon_open change_ba"></span><span class="icon_file"></span><span class="list_msg">' + data['name'] + '</span></li>';
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


    var token, pid, key, page, limit, word_titl, goods_id, goods_pid, goods_member, goods_enddate, goods_fileurl, goods_imgurl, w_p_n;
    token = Admin.get_token();
    uid = Admin.get_uid();
    //	补零函数
    function l_dbl(x) {
        return x < 10 ? '0' + x : x
    }

    var venCustomLookAbledField = [
        {'index': null, 'field': '介绍人'},
        {'index': null, 'field': '关联供应商'},
        {'index': null, 'field': '信用额度'},
        {'index': null, 'field': '创建日期'},
        {'index': null, 'field': '创建人'},
        {'index': null, 'field': '成交'},
        {'index': null, 'field': '负责部门'},
        {'index': null, 'field': '负责人'},
        {'index': null, 'field': '备注'}
    ];

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

    getCusListSort();

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
        statusflag: 0 // 作废状态  0 有效客户 1 作废客户  不传 是全部
    };

    // 点击刷新
    $('#xs_kh_refresh').live('click', function () {
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
            owner: '', // 负责人id
            statusflag: '' // 作废状态  0 有效客户 1 作废客户  不传 是全部
        };
        $('#xs_kh_bxszfkh').attr('checked', false);
        $('#xs_kh_search_inp').val('搜索客户编号/客户名称').css('color', '#CCCCCC');
        $('#xs_kh_khmc_inp').val('客户名称').css('color', '#CCCCCC');
        $('#xs_kh_khly_inp').val('客户来源').css('color', '#CCCCCC');
        $('#xs_kh_khjb_inp').val('客户级别').css('color', '#CCCCCC');
        $('#xs_kh_xyed_inp').val('信用额度').css('color', '#CCCCCC');
        $('#xs_kh_fzr_inp').val('负责人').css('color', '#CCCCCC');
        getCusList()
    });

    $('#xs_kh_xzfl li').live('click', function () {
        getCusListData.category_id = $(this).attr('cussortid')
        getCusList()
    });

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
                    $('.xs_kh_ssjg').html(e.totalcount);
                    if (cuslist.length == 0) {
                        $('.ven_custom_nodata_box').removeClass('none')
                        $('.ven_custom_handle').addClass('none')
                    } else {
                        $('.ven_custom_nodata_box').addClass('none')
                        $('.ven_custom_handle').removeClass('none')
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
                        if (cuslist[i].contacts.length > 0) {
                            for (var j = 0; j < cuslist[i].contacts.length; j++) {
                                if (cuslist[i].contacts[j].name == '') {
                                    //continue;
                                } else {
                                    con1 += cuslist[i].contacts[j].name + '、';
                                    con2 += '<div class="vent_client_contMsgBoxDet"><h3 class="cont_title">' + cuslist[i].contacts[j].name + '</h3><ul><li>职务：' + cuslist[i].contacts[j].job + '</li><li>电话：' + cuslist[i].contacts[j].tel + '</li><li>邮箱：' + cuslist[i].contacts[j].email + '</li></ul></div>'
                                }
                            }
                            con1 = con1.substring(0, con1.length - 1);
                        }
                        var cusSort = '',
                            cusBtnClass = '',
                            cusContactClass = '';
                        if (cuslist[i].status == 1) {
                            cusSta = 'grey';
                            cusSort = '<span class="voidIcon">作废</span>';
                            cusBtnClass = 'btn_dis_none';
                            cusContactClass = ''
                        } else {
                            cusSta = '';
                            cusSort = l_dbl(i + 1);
                            cusBtnClass = '';
                            cusContactClass = 'vend_client_contact'
                        }
                        oCuslist += '<tr class="' + cusSta + '" cusid="' + cuslist[i].id + '">' +
                            '<td>' + cusSort + '</td>' +
                            '<td>' + likNullData(cuslist[i].code_sn) + '</td>' +
                            '<td>' + likNullData(cuslist[i].name) + '</td>' +
                            '<td>' + likNullData(cuslist[i].tel) + '</td>' +
                            '<td>' + likNullData(cuslist[i].grade_name) + '</td>' +
                            '<td>' + likNullData(cuslist[i].industry_big_name) + '</td>' +
                            '<td>' + likNullData(cuslist[i].comefrom_name) + '</td>' +
                            '<td class="f_color ' + cusContactClass + '">' + con1 + (con2 == '' ? '' : '<div class="lik_dialog_mousemove vent_client_contMsgBox" style="z-index: 9999;position:fixed;display:none!important;"><i class="vent_client_torr"></i>' + con2 + '</div>' ) + '</td>' +
                            '<td>' + likNullData(cuslist[i].introducer_name) + '</td>' +
                            '<td>' + likNullData(cuslist[i].supplier_name) + '</td>' +
                            '<td>' + likNullData(cuslist[i].credit) + '元</td>' +
                            '<td>' + likNullData(cuslist[i].vol) + '</td>' +
                            '<td>' + likNullData(cuslist[i].created_at.split(' ')[0]) + '</td>' +
                            '<td>' + likNullData(cuslist[i].uname) + '</td>' +
                            '<td>' + likNullData(cuslist[i].dept_name) + '</td>' +
                            '<td>' + likNullData(cuslist[i].owner_name) + '</td>' +
                            '<td>' + likNullData(cuslist[i].note) + '</td>' +
                            '<td><button class="but_mix r_sidebar_btn but_look xz_kh_look" name="xs_khgl_right">查看</button><button class="but_mix val_dialogTop but_exit ven_custom_edit_btn ' + cusBtnClass + '" name="xs_khgl_exit">编辑</button><button class="but_mix but_void but_r ' + cusBtnClass + '">作废</button><button class="but_mix but_r ven_cus_del_btn val_dialog ' + cusBtnClass + '" name="xs_kh_cus_delete">删除</button></td></tr>'
                    }
                    $('#l_cuslist').html(oCuslist);
                    //客户联系人鼠标悬浮效果
                    $('.vend_client_contact').live('mouseover', function (e) {
                        //var index = $(this).index();
                        $('.vend_client_contact').live('mousemove', function (e) {
                            $('.lik_dialog_mousemove').css({
                                'left': e.pageX - 20,
                                'top': e.pageY + 25,
                                'zIndex': '999'
                            });
                        });
                    });
                    $('.vend_client_contact').live('mouseout', function (e) {
                        $('.lik_dialog_mousemove').css('display', 'none');
                    });

                    list_table_render_pagination('.page_ven31_cuslist', getCusListData, getCusList, e.totalcount, cuslist.length);

                    likShow('#ven_custom_table', venCustomLookAbledField, '#xs_kh_xzckx', '#xs_kh_ckx_save', '#xs_kh_ckx_reset');
                    // 获取客户列表时调用一次选择查看项
                    $('#xs_kh_ckx_save').trigger("click");
                }

            }
        });
    }

    getCusList();
    // 查看客户详情
    var cusid = '';
    $('button.xz_kh_look').live('click', function () {
        cusid = $(this).closest('tr').attr('cusid');
        $('#xs_kh_look_cusid').val($(this).closest('tr').attr('cusid'));
        $.ajax({
            url: SERVER_URL + '/customer/info',
            type: 'get',
            data: {
                token: token,
                customer_id: cusid
            },
            success: function (e) {
                var oE = eval("(" + e + ")");
                if (oE.code == 0) {
                    var cusDetail = oE.data;
                    var cusDetCont = cusDetail.contacts;
                    var cusDetCont2 = '';
                    for (var i = 0; i < cusDetCont.length; i++) {
                        cusDetCont2 += cusDetCont[i].name + '、'
                    }
                    cusDetCont2 = cusDetCont2.substring(0, cusDetCont2.length - 1);
                    $('.slider_head_msg_date').html(cusDetail.name);
                    $('.l_createDate').html(cusDetail.created_at);
                    $('.l_khbh').html(cusDetail.code_sn);
                    $('.l_gsdh').html(cusDetail.tel);
                    $('.l_xxdz').html(cusDetail.address);
                    $('.l_hydl').html(cusDetail.industry_big_name);
                    $('.l_hyxl').html(cusDetail.industry_small_name);
                    $('.l_khly').html(cusDetail.comefrom_name);
                    $('.l_khjb').html(cusDetail.grade_name);
                    $('.l_khlxr').html(cusDetCont2);
                    $('.l_jsr').html(cusDetail.introducer_name);
                    $('.l_glgys').html(cusDetail.supplier_name);
                    $('.l_sccjj').html(cusDetail.credit);
                    $('.l_fzbm').html(cusDetail.dept_name);
                    $('.l_fzr').html(cusDetail.owner_name);
                    $('.l_bz').html(cusDetail.note);
                    //查看 - 销售机会
                    var cusLookChanceList = cusDetail['customerChanceList'];
                    $('.ven_custom_look_chance_total').html(cusLookChanceList['totalcount']);
                    var cuslookChanceDatalist = cusLookChanceList['datalist'];
                    var cusLookChanceHtml = '';
                    var statusName = '';
                    $.each(cuslookChanceDatalist, function (i, v) {
                        statusName = '';
                        if (v['status'] == 0) {
                            statusName = '进行中'
                        } else if (v['status'] == 1) {
                            statusName = '成交'
                        } else if (v['status'] == 2) {
                            statusName = '未成交'
                        }
                        cusLookChanceHtml += '<div class="d-r-t-h">\
                                                                        <p class="l-s-x">成交日期：<span>' + v['expected_at'].split(' ')[0] + '</span></p>\
                                                                    <p class="l-s-x">预计金额：<span>' + v['expected_money'] + '元</span></p>\
                                                                    <p class="l-s-x sale_customer_seal_state">状态：<span class="sale_customer_seal_state_ing">&nbsp;' + statusName + '</span></p>\
                                                                    <p class="l-s-x">销售阶段：<span>' + v['steps_name'] + '</span></p>\
                                                                </div>'
                    })
                    $('.ven_custom_look_chance_list').html(cusLookChanceHtml);
                    //查看 - 客户拜访
                    var cusLookVisitList = cusDetail['customerVisitList'];
                    $('.ven_custom_look_visit_total').html(cusLookVisitList['totalcount']);
                    var cuslookVisitDatalist = cusLookVisitList['datalist'];
                    var cusLookVisitHtml = '';
                    var visitType = '';
                    $.each(cuslookVisitDatalist, function (i, v) {
                        visitType = '';
                        if (v['thetype'] == 0) {
                            visitType = '电话拜访'
                        } else if (v['thetype'] == 1) {
                            visitType = '外出拜访'
                        } else if (v['thetype'] == 2) {
                            visitType = '网络拜访'
                        } else if (v['thetype'] == 3) {
                            visitType = '其他'
                        } else if (v['thetype'] == 4) {
                            visitType = '出差拜访'
                        }
                        cusLookVisitHtml += '<div class="d-r-t-h sbar">\
                                                                <p class="l-s-x">拜访类型：<span>' + visitType + '</span></p>\
                                                                <p class="l-s-x">拜访日期：<span>' + v['visited_at'].split(' ')[0] + '</span></p>\
                                                                <p class="l-s-x">拜访商品：<span>' + v['goods_name'] + '</span></p>\
                                                             </div>'
                    });
                    $('.ven_custom_look_visit_list').html(cusLookVisitHtml);
                    //查看 - 销售报价单
                    var cusLookQuoteList = cusDetail['quoteList'];
                    $('.ven_custom_look_quote_total').html(cusLookQuoteList['totalcount']);
                    var cuslookQuoteDatalist = cusLookQuoteList['datalist'];
                    var cusLookQuoteHtml = '';
                    var statusName = '';
                    $.each(cuslookQuoteDatalist, function (i, v) {
                        statusName = '';
                        if (v['status'] == 1) {
                            statusName = '审批中'
                        } else if (v['status'] == 2) {
                            statusName = '未通过'
                        } else if (v['status'] == 3) {
                            statusName = '已通过'
                        }
                        cusLookQuoteHtml += '<div class="d-r-t-h sbar">\
                                                                <p class="l-s-x">报价单编号：<span>' + v['code_sn'] + '</span></p>\
                                                                <p class="l-s-x">审批状态：<span>' + statusName + '</span></p>\
                                                                <p class="l-s-x">审批人：<span>' + v['approval_name'] + '</span></p>\
                                                                <p class="l-s-x sale_customer_seal_state">总金额：<span>&nbsp;' + v['totals'] + '</span></p>\
                                                             </div>'
                    });
                    $('.ven_custom_look_quote_list').html(cusLookQuoteHtml);
                    //查看 - 销售订单
                    var cusLookOrderList = cusDetail['orderList'];
                    $('.ven_custom_look_order_total').html(cusLookOrderList['totalcount']);
                    var cuslookOrderDatalist = cusLookOrderList['datalist'];
                    var cusLookOrderHtml = '';
                    var outStatusName = '';
                    $.each(cuslookOrderDatalist, function (i, v) {
                        outStatusName = '';
                        if (v['thetype'] == 0) {
                            outStatusName = '未出库'
                        } else if (v['thetype'] == 1) {
                            outStatusName = '部分出库'
                        } else if (v['thetype'] == 2) {
                            outStatusName = '已出库'
                        }
                        cusLookOrderHtml += '<div class="d-r-t-h sbar">\
                                                                <p class="l-s-x">销售订单编号：<span>' + v['code_sn'] + '</span></p>\
                                                                <p class="l-s-x">发货时间：<span>' + v['delivery_at'].split(' ')[0] + '</span></p>\
                                                                <p class="l-s-x">出货状态：<span>&nbsp;' + outStatusName + '</span></p>\
                                                                <p class="l-s-x">订单总金额(元)：<span>' + v['totals'] + '</span></p>\
                                                                <p class="l-s-x">已收金额(元)：<span>' + v['is_pay'] + '</span></p>\
                                                                <p class="l-s-x ">已付票金额：<span>&nbsp;' + v['is_ticket'] + '</span></p>\
                                                             </div>'
                    });
                    $('.ven_custom_look_order_list').html(cusLookOrderHtml);
                    //查看 - 销售退换货
                    var cusLookReproductList = cusDetail['reproductList'];
                    $('.ven_custom_look_reproduct_total').html(cusLookReproductList['totalcount']);
                    var cuslookReproductDatalist = cusLookReproductList['datalist'];
                    var cusLookReproductHtml = '';
                    var theTypeName = '';
                    var statusName = '';
                    var outStatusName = '';
                    var inStatusName = '';
                    $.each(cuslookReproductDatalist, function (i, v) {
                        theTypeName = '';
                        if (v['thetype'] == 1) {
                            theTypeName = '换货'
                        } else if (v['thetype'] == 2) {
                            theTypeName = '退货'
                        }
                        statusName = '';
                        if (v['status'] == 1) {
                            statusName = '审批中'
                        } else if (v['status'] == 2) {
                            statusName = '未通过'
                        } else if (v['status'] == 3) {
                            statusName = '已通过'
                        }
                        outStatusName = '';
                        if (v['out_status'] == 1) {
                            outStatusName = '未出库'
                        } else if (v['out_status'] == 2) {
                            outStatusName = '已出库'
                        }
                        inStatusName = '';
                        if (v['out_status'] == 1) {
                            inStatusName = '未入库'
                        } else if (v['out_status'] == 2) {
                            inStatusName = '已入库'
                        }
                        cusLookReproductHtml += '<div class="d-r-t-h sbar">\
                                                                    <p class="l-s-x">退换货编号：<span>' + v['code_sn'] + '</span></p>\
                                                                    <p class="l-s-x">退换商品：<span>' + v['reproduct_name'] + '</span></p>\
                                                                    <p class="l-s-x">退换货类型：<span>&nbsp;' + theTypeName + '</span></p>\
                                                                    <p class="l-s-x">退款总金额(元)：<span>' + v['totals'] + '</span></p>\
                                                                    <p class="l-s-x">退换货日期：<span>' + v['service_at'] + '</span></p>\
                                                                    <p class="l-s-x ">审批状态：<span>&nbsp;' + statusName + '</span></p>\
                                                                    <p class="l-s-x ">审批人：<span>&nbsp;' + v['approval_name'] + '</span></p>\
                                                                    <p class="l-s-x ">入库状态：<span>&nbsp;' + inStatusName + '</span></p>\
                                                                    <p class="l-s-x ">出库状态：<span>&nbsp;' + outStatusName + '</span></p>\
                                                                 </div>'
                    });
                    $('.ven_custom_look_reproduct_list').html(cusLookReproductHtml);
                    //查看 - 售后单
                    var cusLookAfterorderList = cusDetail['afterorderList'];
                    $('.ven_custom_look_afterorder_total').html(cusLookAfterorderList['totalcount']);
                    var cuslookAfterorderDatalist = cusLookAfterorderList['datalist'];
                    var cusLookAfterorderHtml = '';
                    var serviceTypeName = '';
                    var statusName = '';
                    $.each(cuslookAfterorderDatalist, function (i, v) {
                        serviceTypeName = '';
                        if (v['service_type'] == 0) {
                            serviceTypeName = '外出售后'
                        } else if (v['service_type'] == 1) {
                            serviceTypeName = '电话售后'
                        } else if (v['service_type'] == 2) {
                            serviceTypeName = '网络售后'
                        }
                        statusName = '';
                        if (v['status'] == 0) {
                            statusName = '待接收'
                        } else if (v['status'] == 1) {
                            statusName = '进行中'
                        } else if (v['status'] == 2) {
                            statusName = '已完成'
                        }
                        cusLookAfterorderHtml += '<div class="d-r-t-h sbar">\
                                                        <p class="l-s-x">售后单编号：<span>' + v['code_sn'] + '</span></p>\
                                                        <p class="l-s-x">售后商品：<span>' + v['goods_name'] + '</span></p>\
                                                        <p class="l-s-x">负责人：<span>&nbsp;' + v['owner_name'] + '</span></p>\
                                                        <p class="l-s-x">售后时间：<span>&nbsp;' + v['service_at'] + '</span></p>\
                                                        <p class="l-s-x">售后类型：<span>&nbsp;' + serviceTypeName + '</span></p>\
                                                        <p class="l-s-x sale_customer_seal_state">状态：<span class="sale_customer_seal_state_ing">&nbsp;' + statusName + '</span></p>\
                                                   </div>'
                    });
                    $('.ven_custom_look_afterorder_list').html(cusLookAfterorderHtml);
                    //查看 - 历史记录
                    $.ajax({
                        url: SERVER_URL + '/customer/loadlog',
                        type: 'POST',
                        data: {
                            token: token,
                            customer_id: cusid
                        },
                        success: function (e) {
                            var oE = eval("(" + e + ")");
                            if (oE.code == 0) {
                                var historyDatalist = oE.datalist;
                                var fromTypeName = '';
                                var cusLookHisContHtml = '';
                                var cusContractData = null;
                                var historyListHtml = '';
                                $.each(historyDatalist, function (i, v) {
                                    if (v['from_type'] == 1) {
                                        fromTypeName = 'PC端'
                                    } else if (v['from_type'] == 2) {
                                        fromTypeName = 'IOS端'
                                    } else if (v['from_type'] == 3) {
                                        fromTypeName = 'android端'
                                    }
                                    //客户联系人信息
                                    if (v['content_json']['contacts']) {
                                        cusContractData = eval(v['content_json']['contacts']);
                                        $.each(cusContractData, function (i2, v2) {
                                            cusLookHisContHtml += v2['name'] + '、'
                                        });
                                        cusLookHisContHtml = cusLookHisContHtml.slice(0, cusLookHisContHtml.length - 1)
                                    }
                                    historyListHtml += '<div class="d-r-t-h">\
                                                            <div class="d-r-box">\
                                                            <img class="l-sl-i" src="' + v['content_json']['update_face'] + '">\
                                                            <div class="d-r-r">\
                                                            <p class="u-id-t">' + v['content_json']['update_name'] + '</p>\
                                                            <p class="t-s-p">' + v['content_json']['updated_at'] + '</p>\
                                                            </div>\
                                                            </div>\
                                                        </div>\
                                                        <div class="d-r-t-h">\
                                                            <p class="l-s-x">客户编号：<span>' + cusDetail['code_sn'] + '</span></p>\
                                                            <p class="l-s-x">客户名称：<span>' + v['content_json']['name'] + '</span></p>\
                                                            <p class="l-s-x">公司电话：<span>' + v['content_json']['tel'] + '</span></p>\
                                                            <p class="l-s-x">详细地址：<span class="f_color">' + v['content_json']['address'] + '</span></p>\
                                                            <p class="l-s-x">行业：<span>&nbsp;' + v['content_json']['industry_big_name'] + '/' + v['content_json']['industry_small_name'] + '</span></p>\
                                                            <p class="l-s-x">客户来源：<span>' + v['content_json']['comefrom_name'] + '</span></p>\
                                                            <p class="l-s-x">客户级别：<span>' + v['content_json']['grade_name'] + '</span></p>\
                                                            <p class="l-s-x">客户联系人：<span>' + cusLookHisContHtml + '</span></p>\
                                                            <p class="l-s-x">介绍人：<span>&nbsp;' + v['content_json']['introducer_name'] + '</span></p>\
                                                            <p class="l-s-x">关联供应商：<span>' + v['content_json']['supplier_name'] + '</span></p>\
                                                            <p class="l-s-x">负责人：<span>&nbsp;' + v['content_json']['owner_name'] + '</span></p>\
                                                            <p class="l-s-x">来源：<span>&nbsp;' + fromTypeName + '</span></p>\
                                                        </div>';
                                });
                                $('.ven_custom_look_history_list').html(historyListHtml);
                            }
                        }
                    })
                }
            }
        })
    });

    // 客户查看详情中作废
    $('#xs_kh_look_zf').live('click', function () {
        var cusid = $('#xs_kh_look_cusid').val()
        cusZf(cusid)
    });

    // 客户作废
    $('button.but_void').live('click', function () {
        var cusid = $(this).closest('tr').attr('cusid')
        cusZf(cusid)
    });

    // 客户作废函数
    function cusZf(cid) {
        $.ajax({
            url: SERVER_URL + '/customer/invalid',
            type: 'post',
            data: {
                token: token,
                customer_id: cid
            },
            success: function (e) {
                var e = eval("(" + e + ")");
                if (e.code == 0) {
                    alert('作废成功')
                    getCusList()
                }
            }
        })
    }

    // 客户查看详情中删除
    $('#xs_kh_look_del').live('click', function () {
        var cusid = $('#xs_kh_look_cusid').val()
        cusDel(cusid)
    });

    // 客户删除
    var cusid = null;
    $('button.ven_cus_del_btn').live('click', function () {
        cusid = $(this).closest('tr').attr('cusid');
    });
    $('.tanceng .list_custom_del_submit').die('click').live('click', function () {
        cusDel(cusid)
    });

    // 客户删除函数
    function cusDel(cid) {
        $.ajax({
            url: SERVER_URL + '/customer/del',
            type: 'post',
            data: {
                token: token,
                customer_id: cid
            },
            success: function (e) {
                var e = eval("(" + e + ")");
                if (e.code == 0) {
                    alert('删除成功')
                    getCusList()
                }
            }
        })
    }

    // 搜索关键字
    $('#xs_kh_search').live('click', function () {
        if ($('#xs_kh_search_inp').val() == '搜索客户编号/客户名称') {
            getCusListData.key = ''
        } else {
            getCusListData.key = $('#xs_kh_search_inp').val()
        }
        getCusList()
    });

    // 客户>高级搜索>控制下拉框
    xs_kh_gjss_xlk();

    function xs_kh_gjss_xlk() {
        $.ajax({
            url: SERVER_URL + '/customer/list',
            type: 'GET',
            data: {
                token: token
            },
            success: function (e) {
                var e = eval("(" + e + ")")
                if (e.code == 0) {
                    var cuslist = e.datalist;
                    // 高级搜索
                    var xs_kh_khbh = '',
                        xs_kh_khmc = '',
                        xs_kh_gsdh = '',
                        xs_kh_dz = '',
                        xs_kh_hy = '',
                        xs_kh_khlxr = '',
                        xs_kh_jsr = '',
                        xs_kh_glgys = '',
                        xs_kh_xyed = '',
                        xs_kh_cj = '',
                        xs_kh_fzr = ''
                    // 高级搜索数组
                    var xs_kh_hy_array = [],
                        xs_kh_khlxr_array = [],
                        xs_kh_jsr_array = [],
                        xs_kh_glgys_array = [],
                        xs_kh_xyed_array = [],
                        xs_kh_cj_array = [],
                        xs_kh_fzr_array = [],
                        xs_kh_fzr_array2 = []
                    for (var i = 0; i < cuslist.length; i++) {
                        // 客户编号下拉框
                        xs_kh_khbh += '<li>' + cuslist[i].code_sn + '</li>'

                        // 客户名称下拉框
                        xs_kh_khmc += '<li>' + cuslist[i].name + '</li>'

                        // 公司电话下拉框
                        xs_kh_gsdh += '<li>' + cuslist[i].tel + '</li>'

                        // 公司地址下拉框
                        xs_kh_dz += '<li>' + cuslist[i].address + '</li>'

                        // 行业下拉框
                        if (xs_kh_hy_array.indexOf(cuslist[i].industry_big_name) == -1) {
                            xs_kh_hy_array.push(cuslist[i].industry_big_name)
                        }

                        // 客户联系人下拉框
                        for (var j = 0; j < cuslist[i].contacts.length; j++) {
                            if (xs_kh_khlxr_array.indexOf(cuslist[i].contacts[j].name) == -1) {
                                xs_kh_khlxr_array.push(cuslist[i].contacts[j].name)
                            }
                        }

                        // 介绍人下拉框
                        if (xs_kh_jsr_array.indexOf(cuslist[i].introducer_name) == -1) {
                            xs_kh_jsr_array.push(cuslist[i].introducer_name)
                        }

                        // 关联供应商下拉框
                        if (xs_kh_glgys_array.indexOf(cuslist[i].supplier_name) == -1) {
                            xs_kh_glgys_array.push(cuslist[i].supplier_name)
                        }

                        // 信用额度下拉框
                        if (xs_kh_xyed_array.indexOf(cuslist[i].credit) == -1) {
                            xs_kh_xyed_array.push(cuslist[i].credit)
                        }

                        // 成交下拉框
                        if (xs_kh_cj_array.indexOf(cuslist[i].vol) == -1) {
                            xs_kh_cj_array.push(cuslist[i].vol)
                        }

                        // 负责人下拉框
                        if (xs_kh_fzr_array.indexOf(cuslist[i].owner_name) == -1) {
                            xs_kh_fzr_array.push(cuslist[i].owner_name)
                            xs_kh_fzr_array2.push({
                                'owner_name': cuslist[i].owner_name,
                                'owner': cuslist[i].owner
                            })
                        }
                    }
                    // 行业下拉框数据循环
                    for (var i = 0; i < xs_kh_hy_array.length; i++) {
                        xs_kh_hy += '<li>' + xs_kh_hy_array[i] + '</li>'
                    }
                    // 客户联系人下拉框数据循环
                    for (var i = 0; i < xs_kh_khlxr_array.length; i++) {
                        xs_kh_khlxr += '<li>' + xs_kh_khlxr_array[i] + '</li>'
                    }
                    // 介绍人下拉框数据循环
                    for (var i = 0; i < xs_kh_jsr_array.length; i++) {
                        xs_kh_jsr += '<li>' + xs_kh_jsr_array[i] + '</li>'
                    }
                    // 关联供应商下拉框数据循环
                    for (var i = 0; i < xs_kh_glgys_array.length; i++) {
                        xs_kh_glgys += '<li>' + xs_kh_glgys_array[i] + '</li>'
                    }
                    // 信用额度下拉框数据循环
                    for (var i = 0; i < xs_kh_xyed_array.length; i++) {
                        xs_kh_xyed += '<li>' + xs_kh_xyed_array[i] + '</li>'
                    }
                    // 成交下拉框数据循环
                    for (var i = 0; i < xs_kh_cj_array.length; i++) {
                        xs_kh_cj += '<li>' + xs_kh_cj_array[i] + '</li>'
                    }
                    // 负责人下拉框数据循环
                    for (var i = 0; i < xs_kh_fzr_array.length; i++) {
                        xs_kh_fzr += '<li owner="' + xs_kh_fzr_array2[i].owner + '">' + xs_kh_fzr_array2[i].owner_name + '</li>'
                    }
                    // 客户编号下拉框插入数据
                    $('#xs_kh_khbh').html(xs_kh_khbh)
                    // 客户名称下拉框插入数据
                    $('#xs_kh_khmc').html(xs_kh_khmc)
                    // 公司电话下拉框插入数据
                    $('#xs_kh_gsdh').html(xs_kh_gsdh)
                    // 公司电话下拉框插入数据
                    $('#xs_kh_dz').html(xs_kh_dz)
                    // 行业下拉框插入数据
                    $('#xs_kh_hy').html(xs_kh_hy)
                    // 客户联系人下拉框插入数据
                    $('#xs_kh_khlxr').html(xs_kh_khlxr)
                    // 介绍人下拉框插入数据
                    $('#xs_kh_jsr').html(xs_kh_jsr)
                    // 关联供应商下拉框插入数据
                    $('#xs_kh_glgys').html(xs_kh_glgys)
                    // 信用额度下拉框插入数据
                    $('#xs_kh_xyed').html(xs_kh_xyed)
                    // 成交下拉框插入数据
                    $('#xs_kh_cj').html(xs_kh_cj)
                    // 负责人下拉框插入数据
                    $('#xs_kh_fzr').html(xs_kh_fzr)
                }
            }
        })
    }

    // 客户>高级搜索>客户名称
    $('#xs_kh_khmc li').live('click', function () {
        getCusListData.key = $(this).closest('div').find('input').val()
        getCusList()
    })
    //  客户>高级搜索>行业
    $('#xs_kh_hy_inp').live('click', function () {
        $.ajax({
            url: SERVER_URL + '/industry/list',
            type: 'GET',
            data: {
                token: token,
                pid: 0
            },
            success: function (e) {
                var oE = eval("(" + e + ")");
                if (oE.code == 0) {
                    var dataList = oE.datalist;
                    var html = '';
                    $.each(dataList, function (i, v) {
                        html += '<li>' + v.name + '</li>'
                    });
                    $('#xs_kh_hy').html(html);
                    $('#xs_kh_hy li').live('click', function () {
                        var industryIndex = $('#xs_kh_hy li').index($(this));
                        getCusListData.industry_big_id = dataList[industryIndex].id;
                        getCusList()
                    })
                }
            },
            error: function () {
                alert('访问出错！')
            }
        })
    })
    $('#xs_kh_hy li').live('click', function () {
        getCusListData.industry_big_id = $(this).closest('div').find('input').val()
        getCusList()
    })
    // 客户>高级搜索>客户来源
    $('#xs_kh_khly li').live('click', function () {
        getCusListData.comefrom = $('#xs_kh_khly li').index($(this))
        getCusList()
    })
    // 客户>高级搜索>客户级别
    $('#xs_kh_khjb li').live('click', function () {
        getCusListData.grade = $('#xs_kh_khjb li').index($(this))
        getCusList()
    })
    // 客户>高级搜索>信用额度
    $('#xs_kh_xyed li').live('click', function () {
        getCusListData.credit = $(this).closest('div').find('input').val()
        getCusList()
    })
    // 客户>高级搜索>负责人
    $('#xs_kh_fzr li').live('click', function () {
        getCusListData.owner = $(this).attr('owner')
        getCusList()
    })
    // 客户>高级搜索>创建日期
    function l_create_at(a) {
        alert(000)
    }

    //	不显示作废客户
    $('#xs_kh_bxszfkh').live('click', function () {
        if ($(this).prop('checked')) {
            getCusListData.statusflag = 0
            getCusList()
        } else {
            getCusListData.statusflag = '';
            getCusList()
        }
    });

    //新建客户 - 定义参数
    var venCustomCreateData = {
        token: token,
        customer_id: 0, //客户id大于0就是修改
        code_sn: "", //客户编号
        name: "", //名称
        uid: uid, //添加人
        dept: '', //负责部门
        owner: uid, //负责人
        industry_big_id: '', //行业大类id
        industry_small_id: '', //行业小类id
        comefrom: 0, //来源类型
        grade: 0, //客户级别
        arrears: 0, //欠款
        tel: "", //联系电话
        country: 0, //国家
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
        note: "" //备注
    };

    // 新建客户
    $('#ven_custom_create_btn').live('click', function () {
        venCustomCreateData = {
            token: token,
            customer_id: 0, //客户id大于0就是修改
            code_sn: "", //客户编号
            name: "", //名称
            uid: uid, //添加人
            dept: '', //负责部门
            owner: uid, //负责人
            industry_big_id: '', //行业大类id
            industry_small_id: '', //行业小类id
            comefrom: 0, //来源类型
            grade: 0, //客户级别
            arrears: 0, //欠款
            tel: "", //联系电话
            country: 0, //国家
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
            note: "" //备注
        };
        //产生编号
        $.ajax({
            url: SERVER_URL + '/admin/autoload',
            type: 'GET',
            data: {
                token: token,
                args: 'KH'
            },
            success: function (e) {
                var oE = eval("(" + e + ")");
                if (oE.code == 0) {
                    $('.tanceng .l_createCusCode').val(oE.data);
                    venCustomCreateData.code_sn = oE.data
                }
            }
        });
        // 新建日期
        var oDate = new Date();
        var oCreateDate = oDate.getFullYear() + '-' + (oDate.getMonth() + 1) + '-' + oDate.getDate();
        $('.l_createDate').html(oCreateDate);
        //客户信息自定义字段
        $.ajax({
            url: SERVER_URL + '/customer/settinglist',
            type: 'GET',
            data: {
                token: token,
                thetype: 4
            },
            success: function (e) {
                var oE = eval("(" + e + ")");
                if (oE.code == 0) {
                    var datalist = oE.datalist;
                    var venCusCreateInfoFieldHtml = '';
                    $.each(datalist, function (i, v) {
                        venCusCreateInfoFieldHtml += '<div class="t_textinput">\
                            <div class="t_left">' + v['title'] + '</div>\
                            <div class="t_right"><input type="text" class="time_input" value="" onfocus="fn_focus(this);" onblur="fn_blur(this);"></div>\
                            </div>'
                    });
                    $('.tanceng .ven_custom_create_info_field_list').html(venCusCreateInfoFieldHtml);
                }
            }
        });
        //客户联系人信息自定义字段
        $.ajax({
            url: SERVER_URL + '/customer/settinglist',
            type: 'GET',
            data: {
                token: token,
                thetype: 5
            },
            success: function (e) {
                var oE = eval("(" + e + ")");
                if (oE.code == 0) {
                    var datalist = oE.datalist;
                    var venCusCreateContFieldHtml = '';
                    $.each(datalist, function (i, v) {
                        venCusCreateContFieldHtml += '<div class="t_textinput">\
                            <div class="t_left">' + v['title'] + '</div>\
                            <div class="t_right"><input type="text" class="time_input" value="" onfocus="fn_focus(this);" onblur="fn_blur(this);"></div>\
                            </div>'
                    });
                    $('.tanceng .ven_custom_create_cont_field_list').html(venCusCreateContFieldHtml);
                }
            }
        });
    });

    //选择负责人
    $('.tanceng .ven_custom_create_choose_owner_btn').live('click', function () {
        venCustomCreateChooseOwnerFn();
        //选择负责人
        $('.tanceng .person_left_nav').live('click', function () {
            //新建
            venCustomCreateData.owner = $(this).attr('userinfoid');
            venCustomCreateData.dept = $(this).parent('ul').prev('li').attr('cussortid');
            //编辑
            venCustomEditData.owner = $(this).attr('userinfoid');
            venCustomEditData.dept = $(this).parent('ul').prev('li').attr('cussortid');
        });
        //选择负责人确认
        $('.tanceng .after_order_create_choose_owner_save').die('click').live('click', function () {
            $('.tanceng .ven_custom_create_choose_owner_inp').val($('.tanceng .list_check').closest('li').find('.list_msg').html());
            $('.tanceng .ven_custom_edit_choose_owner_inp').val($('.tanceng .list_check').closest('li').find('.list_msg').html());
            $(this).closest('.dialog_box').remove();
        })
    });
    //负责人列表
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
                    $('.tanceng .ven_custom_create_choose_owner_list').html(tree_list_person(datalist, deep));
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

    // 行业选择
    $('.tanceng .l_createCusIndustryBig').live('focus', function () {
        $.ajax({
            url: SERVER_URL + '/industry/list',
            type: 'GET',
            data: {
                token: token,
                pid: 0
            },
            success: function (e) {
                var oE = eval("(" + e + ")");
                if (oE.code == 0) {
                    var dataList = oE.datalist;
                    var html = '';
                    $.each(dataList, function (i, v) {
                        html += '<li industrybigid="' + v['id'] + '">' + v.name + '</li>'
                    });
                    $('.tanceng .l_createCusIndustryBig_ul').html(html);
                    $('.tanceng .l_createCusIndustryBig_ul li').live('click', function () {
                        $('.tanceng .l_createCusIndustrySmall_inp').val('互联网/电子商务').attr('disabled', null);
                        $('.tanceng .l_createCusIndustrySmall_ul').css('visibility', '');
                        var curIndustryBigId = $(this).attr('industrybigid');
                        venCustomCreateData.industry_big_id = curIndustryBigId;
                        venCustomEditData.industry_big_id = curIndustryBigId;
                        $.ajax({
                            url: SERVER_URL + '/industry/smalllist',
                            type: 'GET',
                            data: {
                                token: token,
                                big_id: curIndustryBigId
                            },
                            success: function (e) {
                                var oE = eval("(" + e + ")");
                                if (oE.code == 0) {
                                    var dataList = oE.datalist;
                                    var html = '';
                                    $.each(dataList, function (i, v) {
                                        html += '<li industrysmallid="' + v['id'] + '">' + v.name + '</liindustrybigid>'
                                    });
                                    $('.tanceng .l_createCusIndustrySmall_ul').html(html);
                                    $('.tanceng .l_createCusIndustrySmall_ul li').live('click', function () {
                                        venCustomCreateData.industry_small_id = $(this).attr('industrysmallid');
                                        venCustomEditData.industry_small_id = $(this).attr('industrysmallid');
                                    })
                                }
                            }
                        })
                    })
                }
            },
            error: function () {
                alert('访问出错！')
            }
        })
    });

    // 客户来源选择
    $('.tanceng .l_createCusCome li').live('click', function () {
        venCustomCreateData.comefrom = $(this).index() + 1;
    });
    // 新建客戶 - 客户级别选择
    $('.tanceng .l_createCusGrade li').live('click', function () {
        venCustomCreateData.grade = $(this).index() + 1;
    });

    //判断省市县是否可以点击函数
    function inputDisabledStatus() {
        if ($('.ven_custom_create_choose_province_name').attr('disabled') == 'disabled') {
            $('.area_list_province').css('visibility', 'hidden');
        } else {
            $('.area_list_province').css('visibility', '');
        }
        if ($('.ven_custom_create_choose_city_name').attr('disabled') == 'disabled') {
            $('.area_list_city').css('visibility', 'hidden');
        } else {
            $('.area_list_city').css('visibility', '');
        }
        if ($('.ven_custom_create_choose_area_name').attr('disabled') == 'disabled') {
            $('.area_list_area').css('visibility', 'hidden');
        } else {
            $('.area_list_area').css('visibility', '');
        }
    }

    inputDisabledStatus();
    //选择大区
    $('.tanceng .ven_custom_create_choose_bigarea_name').live('click', function () {
        $.ajax({
            url: SERVER_URL + '/industry/bigarealist',
            type: 'GET',
            data: {
                token: token
            },
            success: function (e) {
                var oE = eval("(" + e + ")");
                if (oE.code == 0) {
                    var datalist = oE.datalist;
                    var areaListBigarea = '';
                    $.each(datalist, function (i, v) {
                        areaListBigarea += '<li bigareaid="' + v['id'] + '">' + v['name'] + '</li>'
                    });
                    $('.tanceng .area_list_bigarea').html(areaListBigarea);
                }
            }
        });
    });
    //选择省市区
    $('.tanceng .area_list_bigarea li').live('click', function () {
        var bigareaId = $(this).attr('bigareaid');
        venCustomCreateData.country = bigareaId;
        venCustomEditData.country = bigareaId;
        $.ajax({
            url: SERVER_URL + '/industry/provincelist',
            type: 'GET',
            data: {
                token: token,
                big_area_id: bigareaId
            },
            success: function (e) {
                var oE = eval("(" + e + ")");
                if (oE.code == 0) {
                    var datalist = oE.datalist;
                    var areaListProvince = '';
                    $.each(datalist, function (i, v) {
                        areaListProvince += '<li provinceid="' + v['provinceID'] + '">' + v['province'] + '</li>'
                    });
                    $('.tanceng .area_list_province').html(areaListProvince);
                }
            }
        });
        $('.ven_custom_create_choose_province_name').val('省').attr('disabled', null);
        $('.tanceng .ven_custom_create_choose_city_name').val('市').attr('disabled', 'disabled');
        $('.tanceng .ven_custom_create_choose_area_name').val('县/区').attr('disabled', 'disabled');
        inputDisabledStatus();
    });
    //选择省
    $('.tanceng .area_list_province li').live('click', function () {
        var provinceId = $(this).attr('provinceid');
        venCustomCreateData.province = provinceId;
        venCustomEditData.province = provinceId;
        $.ajax({
            url: SERVER_URL + '/industry/citylist',
            type: 'GET',
            data: {
                token: token,
                province_id: provinceId
            },
            success: function (e) {
                var oE = eval("(" + e + ")");
                if (oE.code == 0) {
                    var datalist = oE.datalist;
                    var areaListCity = '';
                    $.each(datalist, function (i, v) {
                        areaListCity += '<li cityid="' + v['cityID'] + '">' + v['city'] + '</li>'
                    });
                    $('.tanceng .area_list_city').html(areaListCity);
                }
            }
        });
        $('.tanceng .ven_custom_create_choose_city_name').val('市').attr('disabled', null);
        $('.tanceng .ven_custom_create_choose_area_name').val('县/区').attr('disabled', 'disabled');
        inputDisabledStatus();
    });
    //选择市
    $('.tanceng .area_list_city li').live('click', function () {
        var cityId = $(this).attr('cityid');
        venCustomCreateData.city = cityId;
        venCustomEditData.city = cityId;
        $.ajax({
            url: SERVER_URL + '/industry/arealist',
            type: 'GET',
            data: {
                token: token,
                city_id: cityId
            },
            success: function (e) {
                var oE = eval("(" + e + ")");
                if (oE.code == 0) {
                    var datalist = oE.datalist;
                    var areaListCity = '';
                    $.each(datalist, function (i, v) {
                        areaListCity += '<li areaid="' + v['areaID'] + '">' + v['area'] + '</li>'
                    });
                    $('.tanceng .area_list_area').html(areaListCity);
                }
            }
        });
        $('.tanceng .ven_custom_create_choose_area_name').val('县/区').attr('disabled', null);
        inputDisabledStatus();
    });
    //选择县
    $('.tanceng .area_list_area li').live('click', function () {
        var areaId = $(this).attr('areaid');
        venCustomCreateData.area = areaId;
        venCustomEditData.area = areaId;
    });

    // 新建客户>选择分类
    $('.tanceng .l_createCusChooseSortSub').live('click', function () {
        $('.tanceng .l_createCusSortInp').val($(this).parent().prev().find('li.on span.list_msg').text());
        $('.tanceng .l_createCusSortInpHid').val($(this).parent().prev().find('li.on').attr('cussortid'));
        venCustomCreateData.category_id = $('.tanceng .l_createCusSortInpHid').val();
    });
    // 編輯客戶 - 客户级别选择
    $('.tanceng .l_editCusGrade li').live('click', function () {
        venCustomEditData.grade = $(this).index() + 1;
    });
    //新建客户 - 选择介绍人
    $('.tanceng .ven_custom_create_choose_introducer_btn').live('click', function () {
        cusCreateChooseIndroducerFn()
    });
    // 新建客户 - 选择介绍人 - 初始化获取列表参数
    var cusCreateChooseIndroducerData = {
        token: token,
        page: 1, //当前页
        num: 10, // 每页显示条数
        key: '', // 关键字
        industry_big_id: '', // 行业大类id
        grade: '', // 级别id
        statusflag: 0 // 作废状态  0 有效客户 1 作废客户  不传 是全部
    };
    //新建客户 - 选择介绍人 - 函数
    function cusCreateChooseIndroducerFn() {
        //客户信息列表
        $.ajax({
            url: SERVER_URL + '/customer/list',
            type: 'GET',
            data: cusCreateChooseIndroducerData,
            success: function (e) {
                var e = eval("(" + e + ")");
                if (e.code == 0) {
                    var cuslist = e.datalist;
                    $('.tanceng .cus_create_choose_indroducer_total').html(e.totalcount);
                    if (cuslist.length == 0) {
                        $('.ven_custom_create_choose_introducer_nodata_box').removeClass('none')
                        $('.ven_custom_create_choose_introducer_handle').addClass('none')
                    } else {
                        $('.ven_custom_create_choose_introducer_nodata_box').addClass('none')
                        $('.ven_custom_create_choose_introducer_handle').removeClass('none')
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
                        oCuslist += '<tr cusid="' + cuslist[i].id + '">' +
                            '<td><input type="radio" name="222" ' + (i == 0 ? 'checked' : '') + '></td>' +
                            '<td>' + likNullData(cuslist[i].code_sn) + '</td>' +
                            '<td>' + likNullData(cuslist[i].name) + '</td>' +
                            '<td>' + likNullData(cuslist[i].tel) + '</td>' +
                            '<td>' + likNullData(cuslist[i].grade_name) + '</td>' +
                            '<td>' + likNullData(cuslist[i].industry_big_name) + '</td>' +
                            '<td>' + likNullData(cuslist[i].comefrom_name) + '</td>' +
                            '<td>' + con1 + '</td>' +
                            '<td>' + likNullData(cuslist[i].introducer_name) + '</td>' +
                            '<td>' + likNullData(cuslist[i].supplier_name) + '</td>' +
                            '<td>' + likNullData(cuslist[i].credit) + '元</td>' +
                            '<td>' + likNullData(cuslist[i].created_at.split(' ')[0]) + '</td>' +
                            '<td>' + likNullData(cuslist[i].uname) + '</td>' +
                            '<td>' + likNullData(cuslist[i].dept_name) + '</td>' +
                            '<td>' + likNullData(cuslist[i].owner_name) + '</td>' +
                            '<td>' + likNullData(cuslist[i].note) + '</td>' +
                            '</tr>'
                    }
                    $('.tanceng .ven_custom_create_choose_introducer_list').html(oCuslist);

                    list_table_render_pagination('.tanceng .ven_custom_create_choose_introducer_page', cusCreateChooseIndroducerData, cusCreateChooseIndroducerFn, e.totalcount, cuslist.length)
                }
            }
        });
    }

    //新建客户 - 选择介绍人 - 关键字查找
    $('.tanceng .ven_custom_create_choose_indroducer_search_btn').live('click', function () {
        if ($('.tanceng .ven_custom_create_choose_indroducer_search_inp').val() == '搜索客户编号/客户名称') {
            alert('请输入搜索关键字');
            cusCreateChooseIndroducerData.key = '';
            cusCreateChooseIndroducerFn();
            return false;
        } else {
            cusCreateChooseIndroducerData.key = $('.tanceng .ven_custom_create_choose_indroducer_search_inp').val();
            cusCreateChooseIndroducerFn();
        }
    });
    //新建客户 - 选择介绍人 - 行业
    $('.tanceng .ven_custom_create_choose_indroducer_industry_btn').live('click', function () {
        $.ajax({
            url: SERVER_URL + '/industry/list',
            type: 'GET',
            data: {
                token: token,
                pid: 0
            },
            success: function (e) {
                var oE = eval("(" + e + ")");
                if (oE.code == 0) {
                    var dataList = oE.datalist;
                    var html = '';
                    $.each(dataList, function (i, v) {
                        html += '<li industrybigid="' + v['id'] + '">' + v.name + '</li>'
                    });
                    $('.tanceng .ven_custom_create_choose_indroducer_industry_list').html(html);
                    $('.tanceng .ven_custom_create_choose_indroducer_industry_list li').live('click', function () {
                        cusCreateChooseIndroducerData.industry_big_id = $(this).attr('industrybigid');
                        cusCreateChooseIndroducerFn();
                    })
                }
            },
            error: function () {
                alert('访问出错！')
            }
        })
    })
    //新建客户 - 选择介绍人 - 客户级别
    $('.tanceng .ven_custom_create_choose_indroducer_grade_ul li').die('click').live('click', function () {
        cusCreateChooseIndroducerData.grade = $(this).index();
        cusCreateChooseIndroducerFn();
    });
    //新建客户 - 选择介绍人 - 保存
    $('.tanceng .cus_create_choose_indroducer_save_btn').live('click', function () {
        var curIndroducerId = '';
        var curIndroducerName = '';
        $.each($('.tanceng .ven_custom_create_choose_introducer_list tr'), function (i, v) {
            if ($('.tanceng .ven_custom_create_choose_introducer_list tr').eq(i).find('input').attr('checked') == 'checked') {
                curIndroducerId = $('.tanceng .ven_custom_create_choose_introducer_list tr').eq(i).attr('cusid');
                curIndroducerName = $('.tanceng .ven_custom_create_choose_introducer_list tr').eq(i).find('td').eq(2).html();
                //新建
                $('.tanceng .ven_custom_create_chosen_introducer').html('<span class="xs_kh_addjsrname c_3" curintroducerid="' + curIndroducerId + '">' + curIndroducerName + ' <em></em></span>');
                //编辑
                $('.tanceng .ven_custom_edit_chosen_introducer').html('<span class="xs_kh_addjsrname c_3" curintroducerid="' + curIndroducerId + '">' + curIndroducerName + ' <em></em></span>');
            }
        });
        $(this).closest('.dialog_box').remove();
    });

    //新建客户 - 选择供应商
    $('.tanceng .ven_custom_create_choose_supplier_btn').live('click', function () {
        venCusCreateChooseSupCategoryList();
        venCusCreateChooseSupList();
    });

    //供应商分类
    function venCusCreateChooseSupCategoryList() {
        $.ajax({
            url: SERVER_URL + '/supplier/categorylist',
            type: 'GET',
            data: {
                token: token,
                pid: 0,
                customer: 1
            },
            success: function (e) {
                var oE = eval("(" + e + ")");
                var datalist = oE.datalist;
                $('.tanceng .ven_custom_create_choose_sup_categorylist').html(tree_list(datalist));
                // 所有分类总数
                setTimeout(function () {
                    // 总分类数量
                    //$('.hr_left_all_l_n').html($('#hr_left_all_l_n').parent().parent().next('i').find('ul.oth').length)
                    $('.ven_custom_create_choose_sup_categorylist_totalcount').html(oE.totalcount);
                    // 子级数量
                    //$('.hr_left_all_l_n').html(datalist.length)
                    for (var i = 0, len = $('em.list_num_null').length; i < len; i++) {
                        //$('em.list_num_null').eq(i).find('i').html($('em.list_num_null').eq(i).closest('ul').find('ul.oth').length);
                        $('em.list_num_null').eq(i).find('i').html($('em.list_num_null').eq(i).closest('ul').children('ul').length);
                    }
                }, 500)
                // 所有分类图标样式控制
                if ($('i.ven_custom_create_choose_sup_categorylist').children().length == 0) {
                    $('ul.l_hr_left_1').addClass('oth');
                    $('li.hr_left_all span').addClass('oth')
                }
                // 下级分类图标样式控制
                for (var i = 0; i < $('i.ven_custom_create_choose_sup_categorylist li').length; i++) {
                    if ($('i.ven_custom_create_choose_sup_categorylist li').eq(i).next('ul').children().length == 0) {
                        $('i.ven_custom_create_choose_sup_categorylist li').eq(i).find('span').addClass('oth');
                        $('i.ven_custom_create_choose_sup_categorylist li').eq(i).parent('ul').addClass('oth')
                    }
                }
                $('span.oth .list_num_null').remove();
                var aClassList = $('.l_hr_left_1').find('li').filter('[class*="hr_left"]')
            }
        })
    }

    // 定义供应商参数
    var venCusCreateChooseSupData = {
        token: token,
        page: 1, //页面
        num: 10, //每页条数
        key: ''//关键字
    };

    //新建客户 - 选择供应商 - 函数
    function venCusCreateChooseSupList() {
        $.ajax({
            url: SERVER_URL + '/supplier/list',
            type: 'GET',
            data: venCusCreateChooseSupData,
            success: function (e) {
                // 将返回值转换为json对象
                var oE = eval("(" + e + ")");
                if (oE.code == 0) {
                    //搜索总条数
                    $('.tanceng .ven_custom_create_choose_supplier_search_total').html(oE.totalcount);
                    //获取datalist
                    var datalist = oE.datalist;
                    if (datalist.length == 0) {
                        $('.tanceng .ven_custom_create_choose_sup_nodata_box').removeClass('none');
                        $('.tanceng .ven_custom_create_choose_sup_handle').addClass('none');
                    } else {
                        $('.tanceng .ven_custom_create_choose_sup_nodata_box').addClass('none');
                        $('.tanceng .ven_custom_create_choose_sup_handle').removeClass('none');
                    }
                    //字符串拼接
                    var purSupHtml = '';
                    $.each(datalist, function (i, v) {
                        //作废状态判断
                        var sortStatus = '';
                        var sortStatusClass = '';
                        var sortStatusBtn = '';
                        if (v['status'] == 0) {
                            sortStatus = l_dbl(i + 1);
                            sortStatusClass = '';
                            sortStatusBtn = '<button class="but_mix but_exit val_dialog pur_sup_edit_btn" name="cg_ghs_exit">编辑</button><button class="but_mix but_void but_r pur_sup_zf_btn">作废</button>'
                        } else if (v['status'] == 1) {
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
                                contacts2 += '<div class="cg_ghs_contMsgBoxDet">\
                                <h3 class="cont_title">' + v2['name'] + '</h3>\
                                <ul>\
                                <li>职务: ' + v2['job'] + '</li>\
                            <li>电话: ' + v2['tel'] + '</li>\
                            <li>邮箱: ' + v2['email'] + '</li>\
                            </ul>\
                            </div>'
                            });
                            contactsMsgBox = '<div class="cg_ghs_contMsgBox" style="display: none;">\
                                                <i class="cg_ghs_torr"></i>\
                                                ' + contacts2 + '\
                                            </div>'
                        } else {
                            contactsMsgBox = '';
                        }
                        contacts1 = contacts1.join('、');
                        purSupHtml += '<tr pursupid="' + v['id'] + '" >\
                                            <td><input type="radio" name="aa" ' + (i == 0 ? 'checked' : '') + '></td>\
                                            <td>' + l_dbl(i + 1) + '</td>\
                                            <td>' + v['code_sn'] + '</td>\
                                            <td>' + v['name'] + '</td>\
                                            <td>' + v['tel'] + '</td>\
                                            <td>' + v['address'] + '</td>\
                                            <td>' + v['comefrom_name'] + '</td>\
                                            <td class="relative f_color cg_ghs_contact" style="cursor: pointer;">' + contacts1 + contactsMsgBox + '\
                                            </td>\
                                            <td>' + v['note'] + '</td>\
                                            </tr>'
                    });
                    //供应商数据渲染
                    $('.tanceng .ven_custom_create_choose_sup_list').html(purSupHtml);
                }
                //分页
                list_table_render_pagination('.ven_custom_create_choose_sup_pagination', venCusCreateChooseSupData, venCusCreateChooseSupList, oE.totalcount, datalist.length);
            }
        });
    }

    //新建客户 - 选择供应商 - 搜索关键字
    $('.tanceng .ven_custom_create_choose_supplier_search_btn').live('click', function () {
        if ($('.tanceng .ven_custom_create_choose_supplier_search_inp').val() == '搜索供应商编号/供应商名称') {
            alert('请输入搜索关键字');
            venCusCreateChooseSupData.key = '';
            venCusCreateChooseSupList();
            return false;
        } else {
            venCusCreateChooseSupData.key = $('.tanceng .ven_custom_create_choose_supplier_search_inp').val();
            venCusCreateChooseSupList();
        }
    });

    //新建客户 - 选择供应商 - 保存
    $('.tanceng .ven_custom_create_choose_supplier_save_btn').live('click', function () {
        var curSupId = '';
        var curSupName = '';
        $.each($('.tanceng .ven_custom_create_choose_sup_list tr'), function (i, v) {
            if ($('.tanceng .ven_custom_create_choose_sup_list tr').eq(i).find('input').attr('checked') == 'checked') {
                curSupId = $('.tanceng .ven_custom_create_choose_sup_list tr').eq(i).attr('pursupid');
                curSupName = $('.tanceng .ven_custom_create_choose_sup_list tr').eq(i).find('td').eq(3).html();
                //新建
                $('.tanceng .ven_custom_create_chosen_supplier').html('<span class="xs_kh_addjsrname c_3" chosensupplierid="' + curSupId + '">' + curSupName + ' <em></em></span>');
                //编辑
                $('.tanceng .ven_custom_edit_chosen_supplier').html('<span class="xs_kh_addjsrname c_3" chosensupplierid="' + curSupId + '">' + curSupName + ' <em></em></span>');
            }
        });
        $(this).closest('.dialog_box').remove();
    });

    //信用限定金额设置
    $('.tanceng .ven_custom_create_limit_checkbox').live('click', function () {
        if ($(this).attr('checked') == 'checked') {
            $('.tanceng .ven_custom_create_limit_inp').attr('disabled', null);
        } else {
            $('.tanceng .ven_custom_create_limit_inp').attr('disabled', 'disabled');
        }
    });

    // 新建客户>提交
    $('.tanceng .addCusSub').live('click', function () {
        //必填字段
        if ($('.tanceng .l_createCusName').val() == '请填写客户名称') {
            alert('请填写客户名称');
            return false;
        }
        if ($('.tanceng .l_createCusIndustryBig').val() == 'IT/通信/电子/互联网' || $('.tanceng .l_createCusIndustrySmall_inp').val() == '互联网/电子商务') {
            alert('请选择行业分类');
            return false;
        }
        if ($('.tanceng .ven_custom_create_choose_bigarea_name').val() == '区' || $('.tanceng .ven_custom_create_choose_province_name').val() == '省' || $('.tanceng .ven_custom_create_choose_city_name').val() == '市' || $('.tanceng .ven_custom_create_choose_area_name').val() == '县/区') {
            alert('请选择客户所在地区');
            return false;
        }
        //详细地址
        if ($('.tanceng .l_createCusAddr').val() == '请输入详细地址') {
            venCustomCreateData.address = '';
        } else {
            venCustomCreateData.address = $('.tanceng .l_createCusAddr').val();
        }
        //客户名称
        venCustomCreateData.name = $('.tanceng .l_createCusName').val();
        //公司电话
        if ($('.tanceng .l_createCusComTel').val() == '请输入公司电话') {
            venCustomCreateData.tel = '';
        } else {
            venCustomCreateData.tel = $('.tanceng .l_createCusComTel').val();
        }
        //客户信息自定义字段
        var cusCreateInfoField = [];
        $.each($('.tanceng .ven_custom_create_info_field_list').children(), function (i, v) {
            cusCreateInfoField.push({
                title: $('.tanceng .ven_custom_create_info_field_list').children().eq(i).find('.t_left').html(),
                val: $('.tanceng .ven_custom_create_info_field_list').children().eq(i).find('.time_input').val()
            });
        });
        venCustomCreateData.customfields = cusCreateInfoField;

        //客户联系人自定义字段
        var cusCreateCont = [];
        var cusCreateContLen = $('.tanceng .ven_cus_create_cont_list_start').nextUntil('.tanceng .ven_cus_create_cont_list_end').length - 1;
        for (var i = 0; i < cusCreateContLen; i++) {
            var cusCreateContField = [];
            $.each($('.tanceng .ven_cus_create_cont_list_start').nextUntil('.tanceng .ven_cus_create_cont_list_end').eq(i).find('.ven_custom_create_cont_field_list .t_textinput'), function (i2, v) {
                cusCreateContField.push({
                    title: $('.tanceng .ven_cus_create_cont_list_start').nextUntil('.tanceng .ven_cus_create_cont_list_end').eq(i).find('.ven_custom_create_cont_field_list .t_textinput').eq(i2).find('.t_left').html(),
                    val: $('.tanceng .ven_cus_create_cont_list_start').nextUntil('.tanceng .ven_cus_create_cont_list_end').eq(i).find('.ven_custom_create_cont_field_list .t_textinput').eq(i2).find('.time_input').val()
                });
            });
            //联系人名字
            var venCustomCreateContactName = $('.tanceng .ven_cus_create_cont_list_start').nextUntil('.tanceng .ven_cus_create_cont_list_end').eq(i).find('.ven_custom_create_contact_name').val();
            if (venCustomCreateContactName == "请输入联系人姓名") {
                venCustomCreateContactName = ''
            } else {
                venCustomCreateContactName = $('.tanceng .ven_cus_create_cont_list_start').nextUntil('.tanceng .ven_cus_create_cont_list_end').eq(i).find('.ven_custom_create_contact_name').val();
            }
            //联系人电话
            var venCustomCreateContactTel = $('.tanceng .ven_cus_create_cont_list_start').nextUntil('.tanceng .ven_cus_create_cont_list_end').eq(i).find('.ven_custom_create_contact_tel').val();
            if (venCustomCreateContactTel == "请输入联系人电话") {
                venCustomCreateContactTel = ''
            } else {
                venCustomCreateContactTel = $('.tanceng .ven_cus_create_cont_list_start').nextUntil('.tanceng .ven_cus_create_cont_list_end').eq(i).find('.ven_custom_create_contact_tel').val();
            }
            //联系人名字
            var venCustomCreateContactJob = $('.tanceng .ven_cus_create_cont_list_start').nextUntil('.tanceng .ven_cus_create_cont_list_end').eq(i).find('.ven_custom_create_contact_job').val();
            if (venCustomCreateContactJob == "请输入联系人职务") {
                venCustomCreateContactJob = ''
            } else {
                venCustomCreateContactJob = $('.tanceng .ven_cus_create_cont_list_start').nextUntil('.tanceng .ven_cus_create_cont_list_end').eq(i).find('.ven_custom_create_contact_job').val();
            }
            //联系人名字
            var venCustomCreateContactEmail = $('.tanceng .ven_cus_create_cont_list_start').nextUntil('.tanceng .ven_cus_create_cont_list_end').eq(i).find('.ven_custom_create_contact_email').val();
            if (venCustomCreateContactEmail == "请输入联系人邮箱") {
                venCustomCreateContactEmail = ''
            } else {
                venCustomCreateContactEmail = $('.tanceng .ven_cus_create_cont_list_start').nextUntil('.tanceng .ven_cus_create_cont_list_end').eq(i).find('.ven_custom_create_contact_email').val();
            }
            if (venCustomCreateContactName == '' && venCustomCreateContactTel == '' && venCustomCreateContactJob == '' && venCustomCreateContactEmail == '') {
                continue;
            }
            cusCreateCont.push({
                name: venCustomCreateContactName,
                tel: venCustomCreateContactTel,
                job: venCustomCreateContactJob,
                email: venCustomCreateContactEmail,
                custom_field: cusCreateContField
            })
        }
        venCustomCreateData.contacts = cusCreateCont;
        //介绍人
        if ($('.tanceng .ven_custom_create_chosen_introducer').children().length == 0) {
            venCustomCreateData.introducer_id = '';
        } else {
            venCustomCreateData.introducer_id = $('.tanceng .ven_custom_create_chosen_introducer span').attr('curintroducerid');
        }
        //关联供应商
        if ($('.tanceng .ven_custom_create_chosen_supplier').children().length == 0) {
            venCustomCreateData.supplier_id = '';
        } else {
            venCustomCreateData.supplier_id = $('.tanceng .ven_custom_create_chosen_supplier span').attr('chosensupplierid');
        }

        //信用限定金额
        if ($('.tanceng .ven_custom_create_limit_checkbox').attr('checked') == 'checked') {
            venCustomCreateData.credit = $('.tanceng .ven_custom_create_limit_inp').val();
        } else {
            venCustomCreateData.credit = '';
        }
        //备注
        if ($('.tanceng .ven_cus_create_note').val() == '请输入备注') {
            venCustomCreateData.note = '';
        } else {
            venCustomCreateData.note = $('.tanceng .ven_cus_create_note').val();
        }
        $.ajax({
            url: SERVER_URL + '/customer/add',
            type: 'POST',
            data: venCustomCreateData,
            success: function (e) {
                alert('成功');
                getCusList()
            }
        });
        $(this).closest('.dialog_box').remove();
        $('.tanceng').css({
            'display': 'none'
        });
        getCusListSort()
    });

    $(".select_list:not(.no_auto) li").live("click", function () {
        // 高级搜索输入框宽度自适应
        $(this).parents('div.select_p').css('minWidth', $(this).width() + 32)
    });

// 设置>客户分类设置
    $('#list_khflsz li').live('click', function () {
        $(this).closest('.list_box').find('.list_box_But button').removeClass('grey')
        $(this).closest('.list_box').find('.list_box_But button').eq(1).addClass('val_dialogTop')
        $(this).closest('.list_box').find('.list_box_But button').eq(4).addClass('val_dialogTop')
    })
// 设置>客户分类设置>新建分类
    $('#list_create_category_save').live('click', function () {
        if ($('#list_create_category_name').val() == '请填写分类名称') {
            alert('请填写分类名称')
        } else if ($('#list_create_category_nameP').val() == '' || $('#list_create_category_idP_inp_hid').val() == '') {
            alert('请选择上级分类')
        } else {
            $.ajax({
                type: "post",
                url: SERVER_URL + "/customer/categoryadd",
                async: true,
                data: {
                    token: token,
                    name: $('#list_create_category_name').val(),
                    pid: $('#list_create_category_idP_inp_hid').val()
                },
                success: function (e) {
                    var e = eval("(" + e + ")");
                    if (e.code == 0) {
                        alert('新建成功')
                        getCusListSort()
                        $('#list_create_category_save').parent().parent().parent().remove()
                    }
                }
            });
        }
        //			$('#list_edit_category_old').val($('#list_khflsz li.on').attr('cussortid'))
    })
// 设置>客户分类设置>编辑弹框>客户名称
    $('#xs_kh_bjfl_btn').live('click', function () {
        $('#xs_kh_bjfl_val').val($('#list_khflsz li.on span.list_msg').html())
        $('#list_edit_category_old').val($('#list_khflsz li.on').attr('cussortid'))
    })
// 设置>客户分类设置>编辑弹框>选择上级分类
    $('#list_edit_category_chooseP_ul li').live('click', function () {
        // 选择上级输入框文本（编辑）
        $('#list_edit_category_chooseP_inp').val($('#list_edit_category_chooseP_ul li.on').find('span.list_msg').html())
        // 选择上级输入框文本（新建）
        $('#list_create_category_nameP').val($('#list_edit_category_chooseP_ul li.on').find('span.list_msg').html())
        // 选择上级id（编辑）
        $('#list_edit_category_chooseP_inp_hid').val($('#list_edit_category_chooseP_ul li.on').attr('cussortid'))
        // 选择上级id（新建）
        $('#list_create_category_idP_inp_hid').val($('#list_edit_category_chooseP_ul li.on').attr('cussortid'))
    })
// 编辑分类
    $('#list_edit_category_save').live('click', function () {
        $.ajax({
            type: "post",
            url: SERVER_URL + "/customer/categoryupdate",
            async: true,
            data: {
                token: token,
                id: $('#list_edit_category_old').val(),
                name: $('#xs_kh_bjfl_val').val(),
                pid: $('#list_edit_category_chooseP_inp_hid').val()
            },
            success: function (e) {
                var e = eval("(" + e + ")");
                if (e.code == 0) {
                    alert('编辑成功')
                    getCusListSort()
                    $('#list_edit_category_save').closest('.dialog_box').remove();
                }
            }
        });
    })
// 客户>客户分类设置>删除分类
    $('.tanceng .list_category_del_submit').live('click', function () {
        $.ajax({
            type: "post",
            url: SERVER_URL + "/customer/categorydel",
            async: true,
            data: {
                token: token,
                id: $('#list_khflsz li.on').attr('cussortid')
            },
            success: function (e) {
                var e = eval("(" + e + ")");
                if (e.code == 0) {
                    alert('删除成功');
                    getCusListSort();
//					$('#list_edit_category_save').closest('.dialog_box').remove();
                }
            }
        });
    })

//客户设置
    $('#ven_custom_setting_btn').live('click', function () {
        //客户信息
        $.ajax({
            url: SERVER_URL + '/customer/settinglist',
            type: 'GET',
            data: {
                token: token,
                thetype: 4
            },
            success: function (e) {
                var oE = eval("(" + e + ")");
                if (oE.code == 0) {
                    var datalist = oE.datalist;
                    var venCusSetInfoFieldOldHtml = '';
                    $.each(datalist, function (i, v) {
                        venCusSetInfoFieldOldHtml += '<div class="t_textinput">\
                            <div class="t_left"><i class="c_r v_hidden">*</i><span class="ven_custom_setting_info_field_old">' + v['title'] + '</span></div>\
                            <div class="t_right clearfix">\
                            <input type="text" class="time_input inp_noInput" value="" readonly="true">\
                            <span class="t_right_span val_dialogTop ven_custom_setting_field_del" style="background:#ff6c60;">删除</span>\
                            </div>\
                            </div>'
                    });
                    $('.tanceng .ven_custom_setting_info_field_old_list').html(venCusSetInfoFieldOldHtml);
                }
            }
        });
        //联系人信息
        $.ajax({
            url: SERVER_URL + '/customer/settinglist',
            type: 'GET',
            data: {
                token: token,
                thetype: 5
            },
            success: function (e) {
                var oE = eval("(" + e + ")");
                if (oE.code == 0) {
                    var datalist = oE.datalist;
                    var venCusSetContFieldOldHtml = '';
                    $.each(datalist, function (i, v) {
                        venCusSetContFieldOldHtml += '<div class="t_textinput">\
                            <div class="t_left"><i class="c_r v_hidden">*</i><span class="ven_custom_setting_info_field_old">' + v['title'] + '</span></div>\
                            <div class="t_right clearfix">\
                            <input type="text" class="time_input inp_noInput" value=""\
                        readonly="true">\
                            <span class="t_right_span val_dialogTop ven_custom_setting_field_del"\
                        style="background:#ff6c60;">删除</span>\
                            </div>\
                            </div>'
                    });
                    $('.tanceng .ven_custom_setting_cont_field_old_list').html(venCusSetContFieldOldHtml);
                }
            }
        });
    })

//客户设置 - 保存
    $('.tanceng .ven_custom_setting_save_btn').live('click', function () {
        var arrVenCusSetInfoField = [];
        //客户信息 - 旧
        $.each($('.tanceng .ven_custom_setting_info_field_old_list .ven_custom_setting_info_field_old'), function (i, v) {
            arrVenCusSetInfoField.push($('.tanceng .ven_custom_setting_info_field_old_list .ven_custom_setting_info_field_old').eq(i).html())
        });
        //客户信息 - 新
        $.each($('.tanceng .ven_custom_setting_info_field_new_list .ven_custom_setting_info_field_new'), function (i, v) {
            if ($('.tanceng .ven_custom_setting_info_field_new_list .ven_custom_setting_info_field_new').eq(i).val() == '如QQ号') {
                return true;
            }
            arrVenCusSetInfoField.push($('.tanceng .ven_custom_setting_info_field_new_list .ven_custom_setting_info_field_new').eq(i).val())
        });
        $.ajax({
            url: SERVER_URL + '/customer/setting',
            type: 'POST',
            data: {
                token: token,
                thetype: 4,
                customer: arrVenCusSetInfoField
            },
            success: function (e) {
                var oE = eval("(" + e + ")");
                if (oE.code == 0) {
                }
            }
        });
        var arrVenCusSetContField = [];
        //客户联系人信息 - 旧
        $.each($('.tanceng .ven_custom_setting_cont_field_old_list .ven_custom_setting_cont_field_old'), function (i, v) {
            arrVenCusSetContField.push($('.tanceng .ven_custom_setting_cont_field_old_list .ven_custom_setting_cont_field_old').eq(i).html())
        });
        //客户联系人信息 - 新
        $.each($('.tanceng .ven_custom_setting_cont_field_new_list .ven_custom_setting_cont_field_new'), function (i, v) {
            if ($('.tanceng .ven_custom_setting_cont_field_new_list .ven_custom_setting_cont_field_new').eq(i).val() == '如QQ号') {
                return true;
            }
            arrVenCusSetContField.push($('.tanceng .ven_custom_setting_cont_field_new_list .ven_custom_setting_cont_field_new').eq(i).val())
        });
        $.ajax({
            url: SERVER_URL + '/customer/setting',
            type: 'POST',
            data: {
                token: token,
                thetype: 5,
                customer: arrVenCusSetContField
            },
            success: function (e) {
                var oE = eval("(" + e + ")");
                if (oE.code == 0) {
                }
            }
        });
        $(this).closest('.dialog_box').remove();
        $('.tanceng').css('display', 'none')
    })

    //定义编辑客户信息参数
    var venCustomEditData = {
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
        country: 0, //国家
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
        note: "" //备注
    };
    //编辑客户
    $('.ven_custom_edit_btn').live('click', function () {
        var currentCusId = $(this).closest('tr').attr('cusid');
        venCustomEditData.customer_id = currentCusId;
        $.ajax({
            url: SERVER_URL + '/customer/info',
            type: 'get',
            data: {
                token: token,
                customer_id: currentCusId
            },
            success: function (e) {
                var oE = eval("(" + e + ")");
                if (oE.code == 0) {
                    var datalist = oE.data;
                    //创建日期
                    $('.tanceng .l_edit_createDate').html(datalist['created_at'].split(' ')[0]);
                    //客户编号
                    $('.tanceng .l_editCusCode').val(datalist['code_sn']);
                    venCustomEditData.code_sn = datalist['code_sn'];
                    //负责人
                    $('.tanceng .ven_custom_edit_choose_owner_inp').val(datalist['owner_name']);
                    venCustomEditData.owner = datalist['owner'];
                    //客户名称
                    $('.tanceng .l_editCusName').val(datalist['name']);
                    venCustomEditData.name = datalist['name'];
                    //行业大类
                    $('.tanceng .l_createCusIndustryBig').val(datalist['industry_big_name']);
                    venCustomEditData.industry_big_id = datalist['industry_big_id'];
                    //行业小类
                    $('.tanceng .l_createCusIndustrySmall_inp').val(datalist['industry_small_name']);
                    venCustomEditData.industry_small_id = datalist['industry_small_id'];
                    //客户来源
                    $('.tanceng .ven_custom_edit_comefrom_name').val(datalist['comefrom_name']);
                    venCustomEditData.comefrom = datalist['comefrom'];
                    //客户级别
                    $('.tanceng .ven_custom_edit_grade_name').val(datalist['grade_name']);
                    venCustomEditData.grade = datalist['grade'];
                    //公司电话
                    $('.tanceng .l_createCusComTel').val(datalist['tel']);
                    venCustomEditData.tel = datalist['tel'];
                    //地址 - 区
                    $('.tanceng .ven_custom_create_choose_bigarea_name').val(datalist['big_area_name']);
                    venCustomEditData.country = datalist['country'];
                    //地址 - 省
                    $('.tanceng .ven_custom_create_choose_province_name').val(datalist['province_name']);
                    venCustomEditData.province = datalist['province'];
                    //地址 - 市
                    $('.tanceng .ven_custom_create_choose_city_name').val(datalist['city_name']);
                    venCustomEditData.city = datalist['city'];
                    //地址 - 县/区
                    $('.tanceng .ven_custom_create_choose_area_name').val(datalist['area_name']);
                    venCustomEditData.area = datalist['area'];
                    //详细地址
                    $('.tanceng .l_editCusAddr').val(datalist['address']);
                    venCustomEditData.address = datalist['address'];
                    //客户信息自定义字段
                    var cusEditFieldDatalist = datalist['customfields'];
                    var cusEditFieldDatalistHtml = '';
                    $.each(cusEditFieldDatalist, function (i, v) {
                        cusEditFieldDatalistHtml += '<div class="t_textinput">\
                            <div class="t_left">' + v['title'] + '</div>\
                            <div class="t_right"><input type="text" class="time_input" value="' + v['val'] + '" onfocus="fn_focus(this);" onblur="fn_blur(this);"></div>\
                            </div>'
                    });
                    $('.tanceng .ven_custom_edit_info_field_list').html(cusEditFieldDatalistHtml);
                    //客户联系人信息
                    var cusEditContDatalist = datalist['contacts'];
                    var cusEditContDatalistHtml = '';
                    $.each(cusEditContDatalist, function (i, v) {
                        var cusEditContFieldDatalistHtml = '';
                        $.each(v['custom_field'], function (i2, v2) {
                            cusEditContFieldDatalistHtml += '<div class="t_textinput">\
                            <div class="t_left">' + v2['title'] + '</div>\
                            <div class="t_right"><input type="text" class="time_input" value="' + v2['val'] + '" onfocus="fn_focus(this);" onblur="fn_blur(this);"></div>\
                            </div>'
                        });
                        cusEditContDatalistHtml += '<div class="worksp_addbx">\
                                                        <div class="work_sp_fqsp_h3">\
                                                        <h3 class="inline_block"><p>联系人信息<span class="c_r">(<cite class="page_31_khlxrNum">' + (i + 1) + '</cite>)</span></p></h3>\
                                                    <div class="work_fqsp_gb_img xs_khgl_khlxrBut"><i></i></div>\
                                                        </div>\
                                                        <div class="t_textinput">\
                                                        <div class="t_left"><i class="c_r v_hidden">*</i>联系人</div>\
                                                        <div class="t_right"><input type="text" class="time_input ven_custom_edit_contact_name" value="' + v['name'] + '" onfocus="fn_focus(this);" onblur="fn_blur(this);"></div>\
                                                        </div>\
                                                        <div class="t_textinput">\
                                                        <div class="t_left t_left_conrow"><i class="c_r v_hidden">*</i>联系人电话</div>\
                                                        <div class="t_right"><input type="text" class="time_input ven_custom_edit_contact_tel" value="' + v['tel'] + '" onfocus="fn_focus(this);" onblur="fn_blur(this);"></div>\
                                                        </div>\
                                                        <div class="t_textinput">\
                                                        <div class="t_left "><i class="c_r v_hidden">*</i>职务</div>\
                                                        <div class="t_right"><input type="text" class="time_input ven_custom_edit_contact_job" value="' + v['job'] + '" onfocus="fn_focus(this);" onblur="fn_blur(this);"></div>\
                                                        </div>\
                                                        <div class="t_textinput">\
                                                        <div class="t_left "><i class="c_r v_hidden">*</i>邮箱</div>\
                                                        <div class="t_right"><input type="text" class="time_input ven_custom_edit_contact_email" value="' + v['email'] + '" onfocus="fn_focus(this);" onblur="fn_blur(this);"></div>\
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
                            success: function (e) {
                                var oE = eval("(" + e + ")");
                                if (oE.code == 0) {
                                    var datalist = oE.datalist;
                                    var venCusCreateContFieldHtml = '';
                                    $.each(datalist, function (i, v) {
                                        venCusCreateContFieldHtml += '<div class="t_textinput">\
                                                                    <div class="t_left">' + v['title'] + '</div>\
                                                                    <div class="t_right"><input type="text" class="time_input" value="" onfocus="fn_focus(this);" onblur="fn_blur(this);"></div>\
                                                                    </div>'
                                    });
                                    cusEditContDatalistHtml = '<div class="worksp_addbx">\
                                                        <div class="work_sp_fqsp_h3">\
                                                        <h3 class="inline_block"><p>联系人信息<span class="c_r">(<cite class="page_31_khlxrNum">1</cite>)</span></p></h3>\
                                                    <div class="work_fqsp_gb_img xs_khgl_khlxrBut none"><i></i></div>\
                                                        </div>\
                                                        <div class="t_textinput">\
                                                        <div class="t_left"><i class="c_r v_hidden">*</i>联系人</div>\
                                                        <div class="t_right"><input type="text" class="time_input ven_custom_edit_contact_name" value="请输入联系人姓名" onfocus="fn_focus(this);" onblur="fn_blur(this);"></div>\
                                                        </div>\
                                                        <div class="t_textinput">\
                                                        <div class="t_left t_left_conrow"><i class="c_r v_hidden">*</i>联系人电话</div>\
                                                        <div class="t_right"><input type="text" class="time_input ven_custom_edit_contact_tel" value="请输入联系人电话" onfocus="fn_focus(this);" onblur="fn_blur(this);"></div>\
                                                        </div>\
                                                        <div class="t_textinput">\
                                                        <div class="t_left "><i class="c_r v_hidden">*</i>职务</div>\
                                                        <div class="t_right"><input type="text" class="time_input ven_custom_edit_contact_job" value="请输入联系人职务" onfocus="fn_focus(this);" onblur="fn_blur(this);"></div>\
                                                        </div>\
                                                        <div class="t_textinput">\
                                                        <div class="t_left "><i class="c_r v_hidden">*</i>邮箱</div>\
                                                        <div class="t_right"><input type="text" class="time_input ven_custom_edit_contact_email" value="请输入联系人邮箱" onfocus="fn_focus(this);" onblur="fn_blur(this);"></div>\
                                                        </div><div class="ven_custom_edit_cont_field_list">' + venCusCreateContFieldHtml + '</div></div>'
                                    cusEditContDatalistHtml += '<div class="t_textinput"><button class="but_icon xs_khgl_addlxrBut"><i></i>添加客户联系人</button></div>';
                                    $('.tanceng .ven_custom_edit_cont_list').html(cusEditContDatalistHtml);
                                }
                            }
                        });
                    } else {
                        cusEditContDatalistHtml += '<div class="t_textinput"><button class="but_icon xs_khgl_addlxrBut"><i></i>添加客户联系人</button></div>';
                        $('.tanceng .ven_custom_edit_cont_list').html(cusEditContDatalistHtml);
                    }
                    //介绍人
                    $('.tanceng .ven_custom_edit_chosen_introducer').html((datalist['introducer_name']) ? '<span class="xs_kh_addjsrname c_3">' + datalist['introducer_name'] + ' <em></em></span>' : '');
                    venCustomEditData.introducer_id = datalist['introducer_id'];
                    //关联供应商
                    $('.tanceng .ven_custom_edit_chosen_supplier').html((datalist['supplier_name']) ? '<span class="xs_kh_addjsrname c_3">' + datalist['supplier_name'] + ' <em></em></span>' : '');
                    venCustomEditData.supplier_id = datalist['supplier_id'];
                    //信用限定金额
                    if (datalist['credit'] == 0) {
                        $('.tanceng .ven_custom_edit_limit_checkbox').attr('checked', null);
                        $('.tanceng .ven_custom_edit_limit_inp').val('0');
                    } else {
                        $('.tanceng .ven_custom_edit_limit_checkbox').attr('checked', 'checked');
                        $('.tanceng .ven_custom_edit_limit_inp').val(datalist['credit']).attr('disabled', null);
                    }
                    //备注
                    $('.tanceng .ven_cus_edit_note').val(datalist['note']);
                }
            }
        })
    })
    //信用限定金额设置
    $('.tanceng .ven_custom_edit_limit_checkbox').die('click').live('click', function () {
        if ($(this).attr('checked') == 'checked') {
            $('.tanceng .ven_custom_edit_limit_inp').attr('disabled', null);
        } else {
            $('.tanceng .ven_custom_edit_limit_inp').attr('disabled', 'disabled');
        }
    });
    //编辑客户 - 提交
    $('.tanceng .ven_cus_edit_save_btn').live('click', function () {
        //必填字段
        if ($('.tanceng .l_editCusName').val() == '请填写客户名称') {
            alert('请填写客户名称');
            return false;
        }
        if ($('.tanceng .l_createCusIndustryBig').val() == 'IT/通信/电子/互联网' || $('.tanceng .l_createCusIndustrySmall_inp').val() == '互联网/电子商务') {
            alert('请选择行业分类');
            return false;
        }
        if ($('.tanceng .ven_custom_create_choose_bigarea_name').val() == '区' || $('.tanceng .ven_custom_create_choose_province_name').val() == '省' || $('.tanceng .ven_custom_create_choose_city_name').val() == '市' || $('.tanceng .ven_custom_create_choose_area_name').val() == '县/区') {
            alert('请选择客户所在地区');
            return false;
        }
        //详细地址
        if ($('.tanceng .l_editCusAddr').val() == '请输入详细地址') {
            venCustomEditData.address = '';
        } else {
            venCustomEditData.address = $('.tanceng .l_editCusAddr').val();
        }
        //客户名称
        venCustomEditData.name = $('.tanceng .l_editCusName').val();
        //公司电话
        if ($('.tanceng .l_createCusComTel').val() == '请输入公司电话') {
            venCustomEditData.tel = '';
        } else {
            venCustomEditData.tel = $('.tanceng .l_createCusComTel').val();
        }
        //客户信息自定义字段
        var cusEditInfoField = [];
        $.each($('.tanceng .ven_custom_edit_info_field_list').children(), function (i, v) {
            cusEditInfoField.push({
                title: $('.tanceng .ven_custom_edit_info_field_list').children().eq(i).find('.t_left').html(),
                val: $('.tanceng .ven_custom_edit_info_field_list').children().eq(i).find('.time_input').val()
            });
        });
        venCustomEditData.customfields = cusEditInfoField;

        //客户联系人自定义字段
        var cusEditCont = [];
        var cusEditContLen = $('.tanceng .ven_custom_edit_cont_list').find('.worksp_addbx').length;
        for (var i = 0; i < cusEditContLen; i++) {
            var cusEditContField = [];
            $.each($('.tanceng .ven_custom_edit_cont_list').find('.worksp_addbx').eq(i).find('.ven_custom_edit_cont_field_list .t_textinput'), function (i2, v) {
                cusEditContField.push({
                    title: $('.tanceng .ven_custom_edit_cont_list').find('.worksp_addbx').eq(i).find('.ven_custom_edit_cont_field_list .t_textinput').eq(i2).find('.t_left').html(),
                    val: $('.tanceng .ven_custom_edit_cont_list').find('.worksp_addbx').eq(i).find('.ven_custom_edit_cont_field_list .t_textinput').eq(i2).find('.time_input').val()
                });
            });
            //联系人名字
            var venCustomEditContactName = $('.tanceng .ven_custom_edit_cont_list').find('.worksp_addbx').eq(i).find('.ven_custom_edit_contact_name').val();
            if (venCustomEditContactName == "请输入联系人姓名") {
                venCustomEditContactName = ''
            } else {
                venCustomEditContactName = $('.tanceng .ven_custom_edit_cont_list').find('.worksp_addbx').eq(i).find('.ven_custom_edit_contact_name').val();
            }
            //联系人电话
            var venCustomEditContactTel = $('.tanceng .ven_custom_edit_cont_list').find('.worksp_addbx').eq(i).find('.ven_custom_edit_contact_tel').val();
            if (venCustomEditContactTel == "请输入联系人电话") {
                venCustomEditContactTel = ''
            } else {
                venCustomEditContactTel = $('.tanceng .ven_custom_edit_cont_list').find('.worksp_addbx').eq(i).find('.ven_custom_edit_contact_tel').val();
            }
            //联系人职务
            var venCustomEditContactJob = $('.tanceng .ven_custom_edit_cont_list').find('.worksp_addbx').eq(i).find('.ven_custom_edit_contact_job').val();
            if (venCustomEditContactJob == "请输入联系人职务") {
                venCustomEditContactJob = ''
            } else {
                venCustomEditContactJob = $('.tanceng .ven_custom_edit_cont_list').find('.worksp_addbx').eq(i).find('.ven_custom_edit_contact_job').val();
            }
            //联系人邮箱
            var venCustomEditContactEmail = $('.tanceng .ven_custom_edit_cont_list').find('.worksp_addbx').eq(i).find('.ven_custom_edit_contact_email').val();
            if (venCustomEditContactEmail == "请输入联系人邮箱") {
                venCustomEditContactEmail = ''
            } else {
                venCustomEditContactEmail = $('.tanceng .ven_custom_edit_cont_list').find('.worksp_addbx').eq(i).find('.ven_custom_edit_contact_email').val();
            }
            cusEditCont.push({
                name: venCustomEditContactName,
                tel: venCustomEditContactTel,
                job: venCustomEditContactJob,
                email: venCustomEditContactEmail,
                custom_field: cusEditContField
            })
        }
        venCustomEditData.contacts = cusEditCont;
        //介绍人
        if ($('.tanceng .ven_custom_edit_chosen_introducer').children().length == 0) {
            venCustomEditData.introducer_id = '';
        } else {
            venCustomEditData.introducer_id = $('.tanceng .ven_custom_edit_chosen_introducer span').attr('curintroducerid');
        }
        //关联供应商
        if ($('.tanceng .ven_custom_edit_chosen_supplier').children().length == 0) {
            venCustomEditData.supplier_id = '';
        } else {
            venCustomEditData.supplier_id = $('.tanceng .ven_custom_edit_chosen_supplier span').attr('chosensupplierid');
        }
        //信用限定金额
        if ($('.tanceng .ven_custom_edit_limit_checkbox').attr('checked') == 'checked') {
            venCustomEditData.credit = $('.tanceng .ven_custom_edit_limit_inp').val();
        } else {
            venCustomEditData.credit = '';
        }
        //备注
        if ($('.tanceng .ven_cus_edit_note').val() == '请输入备注') {
            venCustomEditData.note = '';
        } else {
            venCustomEditData.note = $('.tanceng .ven_cus_edit_note').val();
        }
        $.ajax({
            url: SERVER_URL + '/customer/add',
            type: 'POST',
            data: venCustomEditData,
            success: function (e) {
                alert('成功');
                getCusList()
            }
        });
        $(this).closest('.dialog_box').remove();
        $('.tanceng').css({
            'display': 'none'
        });
        getCusListSort()
    });
})
