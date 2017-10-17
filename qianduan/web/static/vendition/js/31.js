$(function () {
    var token, pid, key, page, limit, word_titl, goods_id, goods_pid, goods_member, goods_enddate, goods_fileurl, goods_imgurl, w_p_n;
    token = Admin.get_token();
    //token = '2017052516045457073-1-1';
    uid = Admin.get_uid();
    uname = loginUserInfo.username;
    dept = loginUserInfo.department_id;

    //权限部分
    var invalidOnOff = '';

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
        dept: '',
        owner: '', // 负责人id
        created_at: '',
        statusflag: 0 // 作废状态  0 有效客户 1 作废客户  不传 是全部
    };
    //客户按区域分类参数
    var cusListByAreaData = {
        token: token,
        status: 0,
        level_type: '',
        owner: ''
    };

    if (loginUserInfo['company_admin'] != 1) {
        getCusListData.owner = uid;
        cusListByAreaData.owner = uid;
        var venCusPowerList = loginUserInfo['powerUrls'];
        var venCusOwnerpeople = 'customer/ownerpeople';
        var venCusChanceowner = 'customer/chanceowner';
        var venCusSetting = 'customer/setting';
        var venCusInvalid = 'customer/invalid';
        var venCusDel = 'customer/del';

        //查看成员负责客户
        if ($.inArray(venCusOwnerpeople, venCusPowerList) == -1) {
            $('.ven_cus_search_ul').html('<li class="tab_btn tabhover2 left" name="vendition_kexz" style="position: relative;width:100%;"><span>所有客户</span><i class="bargin_bjd_btn"></i></li>')
        } else {
            $('.ven_cus_search_ul').html('<li class="tab_btn tabhover2 left" name="vendition_kexz" style="position: relative;"><span>所有客户</span><i class="bargin_bjd_btn"></i></li><li class="tab_btn left" name="vendition_kexz">所有成员客户</li>');
        }
        //作废
        if ($.inArray(venCusInvalid, venCusPowerList) == -1) {
            invalidOnOff = 'none';
        } else {
            invalidOnOff = '';
        }
        /*//客户设置
         if ($.inArray(venCusSetting, venCusPowerList) == -1) {
         $('#ven_custom_setting_btn').hide();
         $('.ven_cus_create_setting_box').css('width', '154px');
         } else {
         $('#ven_custom_setting_btn').show();
         $('.ven_cus_create_setting_box').css('width', '254px');
         }*/
        //选择客户负责人
        if ($.inArray(venCusChanceowner, venCusPowerList) == -1) {
            $('.ven_custom_create_choose_owner_btn').hide();
        } else {
            $('.ven_custom_create_choose_owner_btn').show();
        }
    }else{
        getCusListData.owner = '';
        cusListByAreaData.owner = '';
    }

    $('.lik_upload_img').die('change').live('change', function () {
        likUpload($(this));
    });

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
    likShow('#ven_custom_table', venCustomLookAbledField, '#xs_kh_xzckx', '#xs_kh_ckx_save', '#xs_kh_ckx_reset');

    //所有客户按区域分类
    function getCusListByAreaSort() {
        $.ajax({
            url: SERVER_URL + '/customer/arealist',
            type: 'GET',
            data: cusListByAreaData,
            dataType: 'json',
            success: function (oE) {
                $('i.ven_cus_area_total').html(oE.count);
                var datalist = oE.datalist;
                var deep = 0;
                $('.ven_customer_area_sort_list').html(tree_list_close(datalist, deep));
                // 下级分类图标样式控制
                for (var i = 0; i < $('i.ven_customer_area_sort_list li').length; i++) {
                    if ($('i.ven_customer_area_sort_list li').eq(i).next('ul').children().length == 0) {
                        $('i.ven_customer_area_sort_list li').eq(i).prev('i').remove();
                        //$('i.ven_customer_area_sort_list li').eq(i).parent('ul').addClass('oth')
                    }
                }
                /*$('.hr_left_all').live("click", function () {
                 //判断点击元素下有没有ul子节点，有的话展开树结构
                 var next_p = $(this).nextAll('i').find('ul');
                 if (next_p.length > 0) {
                 $(this).parents('ul').toggleClass("change");
                 $(this).nextAll('i').toggle();
                 }
                 ;
                 $(this).parents(".hr_left_nav").find("cite").remove();
                 $(this).append("<cite></cite>");
                 });
                 $('.hr_left_1').die('click').live("click", function () {
                 $(this).nextAll('ul').toggle();
                 //判断点击元素下有没有ul子节点，有的话展开树结构
                 var next_p = $(this).nextAll('ul');
                 if (next_p.length > 0) {
                 $(this).nextAll('ul').toggle();
                 }
                 $(this).parents(".hr_left_nav").find("cite").remove();
                 $(this).append("<cite></cite>");
                 });*/
            },
            error: function (e) {
                console.log(e);
            }
        })
    }

    // 客户>分类列表展示
    /*function getCusListSort() {
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
     console.log(oE);
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

     getCusListSort();*/
    getCusListByAreaSort();
    getCusListByOwnerSort();
    function getCusListByOwnerSort() {
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
                    //负责人列表
                    $('.ven_customer_owner_sort_list').html(tree_list_dept_person(oE));
                    //判断部门图标样式
                    $.each($('.left_1'), function (i, v) {
                        if ($('.left_1').eq(i).next('ul').children().length == 0) {
                            $('.left_1').eq(i).children('span.icon_open').addClass('other')
                        }
                    });
                }
            }
        })
    }

    /*选择人列表*/
    $('#ven_customer_dept_sort_list_wrap_ul .hr_left_bmyg2').die().live("click", function () {
        $(this).parents(".hr_left_nav").find("cite").remove();
        $(this).append("<cite></cite>");
    });

    // 点击刷新
    $('#xs_kh_refresh').die('click').live('click', function () {
        getCusListData.page = 1;
        getCusListData.key = '';
        getCusListData.industry_big_id = '';
        getCusListData.category_id = '';
        getCusListData.comefrom = '';
        getCusListData.grade = '';
        if (loginUserInfo['company_admin'] != 1) {
            getCusListData.owner = uid;
        }else{
            getCusListData.owner = '';
        }
        getCusListData.statusflag = 0;
        getCusListData.level_type = '';
        getCusListData.clear_type = '';
        cusListByAreaData.level_type = '';
        $('#xs_kh_bxszfkh').attr('checked', true);
        $('#xs_kh_search_inp').val('搜索客户编号/客户名称').css('color', '#CCCCCC');
        $('.cus_clear_type_inp').val('全部').css('color', '#CCCCCC');
        $('#xs_kh_khjb_inp').val('全部').css('color', '#CCCCCC');
        $('#xs_kh_khly_inp').val('全部').css('color', '#CCCCCC');
        $('.cus_industry_big_id_inp').val('全部').css('color', '#CCCCCC');
        getCusList();
        getCusListByAreaSort();
    });

    $('#xs_kh_xzfl li').die('click').live('click', function () {
        getCusListData.category_id = $(this).attr('cussortid');
        getCusList()
    });

    // 客户>客户列表

    function getCusList() {
        $.ajax({
            url: SERVER_URL + '/customer/list',
            type: 'GET',
            data: getCusListData,
            dataType: 'json',
            success: function (e) {
                if (e.code == 0) {
                    var delOnOff = '';
                    if ($.inArray(venCusDel, venCusPowerList) == -1) {
                        delOnOff = 'none';
                    } else {
                        delOnOff = '';
                    }

                    var cuslist = e.datalist;
                    console.log(cuslist);
                    $('.xs_kh_ssjg').html(e.totalcount);
                    if (cuslist.length == 0) {
                        $('.ven_custom_nodata_box').removeClass('none');
                        $('.ven_custom_handle').addClass('none');
                    } else {
                        $('.ven_custom_nodata_box').addClass('none');
                        $('.ven_custom_handle').removeClass('none');
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
                        if (cuslist[i].contacts && cuslist[i].contacts.length > 0) {
                            for (var j = 0; j < cuslist[i].contacts.length; j++) {
                                if (cuslist[i].contacts[j].name == '') {
                                    //continue;
                                } else {
                                    con1 += cuslist[i].contacts[j].name + '、';
                                    con2 += '<div class="vent_client_contMsgBoxDet"><h3 class="cont_title">' + cuslist[i].contacts[j].name + '</h3><ul><li>类型：' + (cuslist[i].contacts[j].contact_type == 1 ? '业务' : cuslist[i].contacts[j].contact_type == 2 ? '财务' : '收货人') + '</li><li>职务：' + cuslist[i].contacts[j].jobs + '</li><li>电话：' + cuslist[i].contacts[j].tel + '</li><li>邮箱：' + cuslist[i].contacts[j].email + '</li></ul></div>'
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
                        //结算方式\
                        var clear_type = '';
                        if (cuslist[i].clear_type == 1) {
                            clear_type = '现结'
                        } else if (cuslist[i].clear_type == 2) {
                            clear_type = '账期'
                        } else {
                            clear_type = '无'
                        }
                        oCuslist += '<tr class="' + cusSta + '" cusid="' + cuslist[i].id + '">' +
                            '<td>' + cusSort + '</td>' +
                            '<td>' + likNullData(cuslist[i].name) + '</td>' +
                            '<td class="f_color ' + (con1.length == 0 ? '' : 'val_dialog cus_look_cont_detail_btn') + ' finance_pay_rent_list ' + cusContactClass + '" name="vendition_lianxiren">' + con1 + '</td>' +
                            '<td>' + clear_type + '</td>' +
                            '<td>' + likNullData(cuslist[i].tel) + '</td>' +
                            '<td>' + likNullData(cuslist[i].grade_name) + '</td>' +
                            '<td>' + likNullData(cuslist[i].industry_big_name) + '/' + likNullData(cuslist[i].industry_small_name) + '</td>' +
                            '<td>' + likNullData(cuslist[i].comefrom_name) + '</td>' +
                            '<td>' + likNullData(cuslist[i].vol) + '</td>' +
                            '<td><p class="xiangmu_p1">' + likNullData(cuslist[i].note) + '</p></td>' +
                            '<td><button class="but_mix r_sidebar_btn but_look xz_kh_look" name="xs_khgl_right">查看</button><button class="but_mix val_dialogTop but_exit ven_custom_edit_btn ' + cusBtnClass + '" name="xs_khgl_exit">编辑</button><button class="but_mix ven_cus_void_btn but_r val_dialog ' + cusBtnClass + ' ' + invalidOnOff + '" name="xs_kh_zf_qd">作废</button></td></tr>';
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

                    // 获取客户列表时调用一次选择查看项
                    $('#xs_kh_ckx_save').trigger("click");
                }
            }
        });
    }

    getCusList();

    //查看客户联系人信息
    $('.cus_look_cont_detail_btn').die('click').live('click', function () {
        curCusId = $(this).closest('tr').attr('cusid');
        $('.tanceng .ven_cus_name').html($(this).closest('tr').find('td').eq(1).html());
        $.ajax({
            url: SERVER_URL + '/customer/contactlist',
            type: 'GET',
            data: {
                token: token,
                customer_id: curCusId
            },
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                if (oE.code == 0) {
                    if (oE.data.length == 0) {
                        $('.tanceng .ven_cus_cont_list_nodata_box').removeClass('none');
                    } else {
                        $('.tanceng .ven_cus_cont_list_nodata_box').addClass('none');
                    }
                    var cusContList = '';
                    $.each(oE.data, function (i, v) {
                        var contField = '';
                        $.each(v['custom_field'], function (i2, v2) {
                            contField += v2['title'] + ': ' + v2['val'] + '<br/>'
                        });
                        cusContList += '<tr>\
                                        <td>' + v['name'] + '</td>\
                                        <td>' + v['job'] + '</td>\
                                        <td>' + v['tel'] + '</td>\
                                        <td>' + v['email'] + '</td>\
                                        <td>' + contField + '</td>\
                                        <td><p class="xiangmu_p4" style="line-height: 140%;width: auto;">' + v['note'] + '</p></td>\
                                        </tr>'
                    });
                    $('.tanceng .ven_cus_cont_list').html(cusContList);
                }
            },
            error: function (e) {
                alert(e.msg);
                console.log(e);
            }
        });
    });

    //切换地区搜索客户
    $('#ven_customer_area_sort_list_wrap_ul li').die('click').live('click', function () {
        getCusListData.id = $(this).attr('cussortid');
        getCusListData.page = 1;
        getCusListData.p_dept = '';
        getCusListData.dept = '';
        if (loginUserInfo['company_admin'] != 1) {
            getCusListData.owner = uid;
        }else{
            getCusListData.owner = '';
        }
        getCusList();
    });
    //搜索所有分类
    $('.ven_customer_dept_search_all').die('click').live('click', function () {
        getCusListData.id = '';
        getCusListData.page = 1;
        getCusListData.p_dept = '';
        getCusListData.dept = '';
        getCusListData.owner = '';
        getCusList();
    });

    //切换部门搜索客户
    $('#ven_customer_dept_sort_list_wrap_ul li.hr_left_1').die('click').live('click', function () {
        getCusListData.id = '';
        getCusListData.page = 1;
        if ($(this).attr('deepid') == 'top_1') {
            getCusListData.p_dept = $(this).attr('id');
            getCusListData.dept = '';
        } else {
            getCusListData.p_dept = '';
            getCusListData.dept = $(this).attr('id');
        }
        if (loginUserInfo['company_admin'] != 1) {
            getCusListData.owner = uid;
        }else{
            getCusListData.owner = '';
        }
        getCusList();
        return false;
    });
    $('#ven_customer_dept_sort_list_wrap_ul li.hr_left_bmyg2').die('click').live('click', function () {
        getCusListData.id = '';
        getCusListData.page = 1;
        getCusListData.p_dept = '';
        getCusListData.dept = '';
        getCusListData.owner = $(this).attr('manid');
        getCusList();
        return false;
    });
    // 查看客户详情
    var cusid = '';
    $('button.xz_kh_look').die('click').live('click', function () {
        cusid = $(this).closest('tr').attr('cusid');
        $('#xs_kh_look_cusid').val($(this).closest('tr').attr('cusid'));
        $.ajax({
            url: SERVER_URL + '/customer/info',
            type: 'get',
            data: {
                token: token,
                customer_id: cusid
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var delOnOff = '';
                    if ($.inArray(venCusDel, venCusPowerList) == -1) {
                        delOnOff = 'none';
                    } else {
                        delOnOff = '';
                    }
                    var cusDetail = oE.data;
                    console.log(cusDetail);
                    //更多列表
                    if (cusDetail.status == 0) {
                        $('.ven_cus_look_more_btn').show();
                        $('.ven_cus_look_more_list').html('<li class="val_dialog" name="xs_khgl_exit">编辑</li><li id="xs_kh_look_zf">作废</li><li class="' + delOnOff + '" id="xs_kh_look_del">删除</li><input type="hidden" id="xs_kh_look_cusId"/>')
                    } else {
                        $('.ven_cus_look_more_btn').hide();
                    }
                    var cusDetCont = cusDetail.contacts;
                    var cusDetCont2 = '';
                    for (var i = 0; i < cusDetCont.length; i++) {
                        cusDetCont2 += cusDetCont[i].name + '、'
                    }
                    cusDetCont2 = cusDetCont2.substring(0, cusDetCont2.length - 1);
                    $('.slider_head_msg_date').html(likNullData(cusDetail.name));
                    $('.l_createDate').html(likNullData(cusDetail.created_at.split(' ')[0]));
                    $('.l_createUname').html(likNullData(cusDetail.owner_name));
                    $('.l_khbh').html(likNullData(cusDetail.code_sn));
                    $('.l_gsdh').html(likNullData(cusDetail.tel));
                    $('.l_xxdz').html(likNullData(cusDetail.address));
                    $('.l_location').html(likNullData(cusDetail.location));
                    $('.l_diqu').html(likNullData(cusDetail.province_name) + likNullData(cusDetail.city_name) + likNullData(cusDetail.area_name));
                    $('.l_hydl').html(likNullData(cusDetail.industry_big_name));
                    $('.l_hyxl').html(likNullData(cusDetail.industry_small_name));
                    $('.l_khly').html(likNullData(cusDetail.comefrom_name));
                    $('.l_khjb').html(likNullData(cusDetail.grade_name));
                    $('.l_khlxr').html(cusDetCont2);
                    $('.l_jsr').html(likNullData(cusDetail.introducer_name));
                    $('.l_glgys').html(likNullData(cusDetail.supplier_name));
                    $('.l_sccjj').html(likNullData(cusDetail.credit));
                    $('.l_cjl').html(likNullData(cusDetail.vol));
                    $('.l_fzbm').html(likNullData(cusDetail.dept_name));
                    $('.l_fzr').html(likNullData(cusDetail.owner_name));
                    $('.l_bz').html(likNullData(cusDetail.note));

                    //结算方式
                    if (cusDetail.clear_type == 1) {
                        $('.l_jsfs').html('现结');
                    } else if (cusDetail.clear_type == 2) {
                        $('.l_jsfs').html('账期');
                    } else {
                        $('.l_jsfs').html('-');
                    }

                    //自定义字段
                    var cusField = '';
                    $.each(cusDetail.customfields, function (i, v) {
                        cusField += '<p class="l-s-x">' + v['title'] + '：<span>' + v['val'] + '</span></p>'
                    });
                    $('.cus_look_field').html(cusField);

                    //营业执照
                    if (cusDetail['business_img']) {
                        var businessImgArr = cusDetail['business_img'].split(',');
                        $('.cus_look_img_yyzz_num_total').html(businessImgArr.length);
                        $('.cus_look_img_yyzz').attr('src', getImgUrl(businessImgArr[0]));
                        $('.cus_look_img_yyzz_btn').addClass('val_dialog');
                        $('.cus_look_img_yyzz_btn').die('click').live('click', function () {
                            var goods_arr = businessImgArr;
                            var goods_img = 0;
                            $('.tanceng .image_box_content_img').attr('src', getImgUrl(goods_arr[goods_img]));
                            $('.tanceng .goods_icon_page').html((goods_img + 1) + '/' + goods_arr.length);
                            $('.tanceng .goods_icon_pre').die('click').live('click', function () {
                                goods_img--;
                                if (goods_img == -1) {
                                    goods_img = goods_arr.length - 1;
                                }
                                $('.tanceng .image_box_content_img').attr('src', getImgUrl(goods_arr[goods_img]));
                                $('.tanceng .goods_icon_page').html((goods_img + 1) + '/' + goods_arr.length);
                                //likImgAutoFn();
                            });
                            $('.tanceng .goods_icon_nxt').die('click').live('click', function () {
                                goods_img++;
                                if (goods_img == goods_arr.length) {
                                    goods_img = 0;
                                }
                                $('.image_box_content_img').attr('src', getImgUrl(goods_arr[goods_img]));
                                $('.goods_icon_page').html((goods_img + 1) + '/' + goods_arr.length);
                                //likImgAutoFn();
                            });
                        });
                    } else {
                        $('.cus_look_img_yyzz_btn').removeClass('val_dialog');
                        $('.cus_look_img_yyzz_num_total').html(0);
                        $('.cus_look_img_yyzz').attr('src', 'static/images/error_xxl.png');
                    }
                    //法人执照
                    if (cusDetail['legal_person_img']) {
                        var legalPersonImgArr = cusDetail['legal_person_img'].split(',');
                        $('.cus_look_img_frzz_num_total').html(legalPersonImgArr.length);
                        $('.cus_look_img_frzz').attr('src', getImgUrl(legalPersonImgArr[0]));
                        $('.cus_look_img_frzz_btn').addClass('val_dialog');
                        $('.cus_look_img_frzz_btn').die('click').live('click', function () {
                            var goods_arr = legalPersonImgArr;
                            var goods_img = 0;
                            $('.tanceng .image_box_content_img').attr('src', getImgUrl(goods_arr[goods_img]));
                            $('.tanceng .goods_icon_page').html((goods_img + 1) + '/' + goods_arr.length);
                            $('.tanceng .goods_icon_pre').die('click').live('click', function () {
                                goods_img--;
                                if (goods_img == -1) {
                                    goods_img = goods_arr.length - 1;
                                }
                                $('.tanceng .image_box_content_img').attr('src', getImgUrl(goods_arr[goods_img]));
                                $('.tanceng .goods_icon_page').html((goods_img + 1) + '/' + goods_arr.length);
                                //likImgAutoFn();
                            });
                            $('.tanceng .goods_icon_nxt').die('click').live('click', function () {
                                goods_img++;
                                if (goods_img == goods_arr.length) {
                                    goods_img = 0;
                                }
                                $('.image_box_content_img').attr('src', getImgUrl(goods_arr[goods_img]));
                                $('.goods_icon_page').html((goods_img + 1) + '/' + goods_arr.length);
                                //likImgAutoFn();
                            });
                        });
                    } else {
                        $('.cus_look_img_frzz_btn').removeClass('val_dialog');
                        $('.cus_look_img_frzz_num_total').html(0);
                        $('.cus_look_img_frzz').attr('src', 'static/images/error_xxl.png');
                    }
                    //客户联系人
                    var cusContactList = '';
                    if (cusDetail['contacts'].length > 0) {
                        $.each(cusDetail['contacts'], function (i, v) {
                            if(v['name'] == '') return true;
                            var cusConField = '';
                            $.each(v['custom_field'], function (i2, v2) {
                                cusConField += '<p class="l-s-x">' + v2['title'] + '：<span >' + v2['val'] + '</span></p>'
                            });
                            cusContactList += '<div style="margin-bottom:24px;">\
                                            <p class="l-s-x xs_kehu_lxr">客户联系人' + (i + 1) + '：<span>' + v['name'] + '</span></p>\
                                            <p class="l-s-x">职务：<span >' + likNullData(v['job']) + '</span></p>\
                                            <p class="l-s-x">电话：<span >' + likNullData(v['tel']) + '</span></p>\
                                            <p class="l-s-x">地址：<span >' + likNullData(v['address']) + '</span></p>\
                                            <p class="l-s-x">邮箱：<span >' + likNullData(v['email']) + '</span></p>\
                                            ' + cusConField + '\
                                            <p class="l-s-x">联系人备注：<span >' + likNullData(v['note']) + '</span></p>\
                                            </div>'
                        });
                        $('.l_cus_contact_list').html(cusContactList);
                        if(cusContactList == ''){
                            $('.cus_look_contact_box').addClass('none');
                        }else{
                            $('.cus_look_contact_box').removeClass('none');
                        }

                        /*var cusContList = '';
                         $.each(cusDetail['contacts'], function (i, v) {
                         var contField = '';
                         $.each(v['custom_field'], function (i2, v2) {
                         contField += v2['title'] + ': ' + v2['val'] + '<br/>'
                         });
                         cusContList += '<tr>\
                         <td>' + v['name'] + '</td>\
                         <td>' + v['job'] + '</td>\
                         <td>' + v['tel'] + '</td>\
                         <td>' + v['email'] + '</td>\
                         <td>' + contField + '</td>\
                         <td><p class="xiangmu_p4" style="line-height: 140%;">' + v['note'] + '</p></td>\
                         </tr>'
                         });
                         $('.ven_cus_cont_list').html(cusContList);*/

                    } else {
                        $('.cus_look_contact_box').addClass('none');
                    }


                    //开户名称
                    $('.l_account_name').html(likNullData(cusDetail['account_name']));
                    //开户银行
                    $('.l_account_bank').html(likNullData(cusDetail['account_bank']));
                    //汇款账号
                    $('.l_pay_account').html(likNullData(cusDetail['pay_account']));
                    //税号
                    $('.l_tax_num').html(likNullData(cusDetail['tax_num']));

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
                                                                        <p class="l-s-x">成交日期：<span>' + likNullData(v['expected_at'].split(' ')[0]) + '</span></p>\
                                                                    <p class="l-s-x">预计金额：<span>' + likNullData(v['expected_money']) + '元</span></p>\
                                                                    <p class="l-s-x sale_customer_seal_state">状态：<span class="sale_customer_seal_state_ing">&nbsp;' + statusName + '</span></p>\
                                                                    <p class="l-s-x">销售阶段：<span>' + likNullData(v['steps_name']) + '</span></p>\
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
                    /*$.ajax({
                     url: SERVER_URL + '/customer/loadlog',
                     type: 'POST',
                     data: {
                     token: token,
                     customer_id: cusid
                     },
                     dataType: 'json',
                     success: function (oE) {
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
                     })*/
                }
            }
        })
    });

    // 客户查看详情中作废
    $('#xs_kh_look_zf').die('click').live('click', function () {
        var cusid = $('#xs_kh_look_cusid').val()
        cusZf(cusid)
    });

    // 客户作废
    $('button.ven_cus_void_btn').die('click').live('click', function () {
        cusid = $(this).closest('tr').attr('cusid');
    });
    //作废确定
    $('.tanceng .list_cus_zf_submit').die('click').live('click', function () {
        cusZf(cusid);
    })

    // 客户作废函数
    function cusZf(cid) {
        $.ajax({
            url: SERVER_URL + '/customer/invalid',
            type: 'post',
            data: {
                token: token,
                customer_id: cid
            },
            dataType: 'json',
            success: function (e) {
                if (e.code == 0) {
                    alert('作废成功');
                    getCusListData.page = 1;
                    getCusList()
                }
            }
        })
    }

    // 客户查看详情中删除
    $('#xs_kh_look_del').die('click').live('click', function () {
        var cusid = $('#xs_kh_look_cusid').val()
        cusDel(cusid)
    });

    // 客户删除
    var cusid = null;
    $('button.ven_cus_del_btn').die('click').live('click', function () {
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
            dataType: 'json',
            success: function (e) {
                if (e.code == 0) {
                    getCusList()
                }
            }
        })
    }

    // 搜索关键字
    $('#xs_kh_search').die('click').live('click', function () {
        if ($('#xs_kh_search_inp').val() == '搜索客户编号/客户名称') {
            getCusListData.key = ''
        } else {
            getCusListData.key = $('#xs_kh_search_inp').val()
        }
        getCusList()
    });
    //展开高级搜索
    $('.ven_cus_zkgjssBtn').die('click').live('click', function () {
        if($(this).text() != '展开高级搜索'){
            $.ajax({
                url: SERVER_URL + '/common/search',
                type: 'GET',
                data: {
                    token: token,
                    big_type: 11,
                    small_type: 'industry_big_id'
                },
                dataType: 'json',
                success: function (oE) {
                    console.log(oE);
                    if(oE.code == 0){
                        var industrySearchList = '<li searchid="">全部</li>';
                        $.each(oE.data, function (i, v) {
                            industrySearchList += '<li searchid="'+v['id']+'">'+v['name']+'</li>';
                        });
                        $('.cus_industry_big_id_ul').html(industrySearchList);
                    }
                },
                error: function(e){
                    alert(e.msg);
                    console.log(e);
                }
            });
        }
    });
    //行业
    $('.cus_industry_big_id_ul li').die('click').live('click', function () {
        getCusListData.industry_big_id = $(this).attr('searchid');
        getCusList();
    });
    // 结算方式
    $('.cus_clear_type_ul li').die('click').live('click', function () {
        getCusListData.clear_type = $(this).attr('searchid');
        getCusList();
    });
    //清除选择
    $('.ven_cus_clear_search_btn').die('click').live('click', function () {
        $('.cus_clear_type_inp').val('全部').css('color', '#CCCCCC');
        $('#xs_kh_khjb_inp').val('全部').css('color', '#CCCCCC');
        $('.cus_industry_big_id_inp').val('全部').css('color', '#CCCCCC');
        $('#xs_kh_khly_inp').val('全部').css('color', '#CCCCCC');
        getCusListData.industry_big_id = '';
        getCusListData.grade = '';
        getCusListData.comefrom = '';
        getCusListData.clear_type = '';
        getCusList();
    });

    // 客户>高级搜索>客户名称
    $('#xs_kh_khmc li').die('click').live('click', function () {
        getCusListData.key = $(this).closest('div').find('input').val();
        getCusList();
    });
    $('#xs_kh_hy li').die('click').live('click', function () {
        getCusListData.industry_big_id = $(this).attr('hybigid');
        getCusList()
    })
    // 客户>高级搜索>客户来源
    $('#xs_kh_khly li').die('click').live('click', function () {
        getCusListData.comefrom = $('#xs_kh_khly li').index($(this))
        getCusList()
    })
    // 客户>高级搜索>客户级别
    $('#xs_kh_khjb li').die('click').live('click', function () {
        getCusListData.grade = $('#xs_kh_khjb li').index($(this))
        getCusList()
    })
    // 客户>高级搜索>客户类别
    $('#xs_kh_khlb li').die('click').live('click', function () {
        getCusListData.level_type = $(this).attr('searchid');
        cusListByAreaData.level_type = $(this).attr('searchid');
        getCusList();
        getCusListByAreaSort();
    })
    // 客户>高级搜索>信用额度
    $('#xs_kh_xyed li').die('click').live('click', function () {
        getCusListData.credit = $(this).closest('div').find('input').val()
        getCusList()
    })
    // 客户>高级搜索>负责部门
    $('#xs_kh_fzbm_ul li').die('click').live('click', function () {
        getCusListData.dept = $(this).attr('dept');
        getCusList();
    })
    // 客户>高级搜索>负责人
    $('#xs_kh_fzr li').die('click').live('click', function () {
        getCusListData.owner = $(this).attr('owner');
        getCusList()
    })
    // 客户>高级搜索>创建日期
    function l_create_at(a) {
        alert(000)
    }

    //	不显示作废客户
    $('#xs_kh_bxszfkh').die('click').live('click', function () {
        if ($(this).prop('checked')) {
            getCusListData.statusflag = 0;
            cusListByAreaData.status = 0;
        } else {
            getCusListData.statusflag = '';
            cusListByAreaData.status = '';
        }
        getCusListByAreaSort();
        getCusList();
    });

    //新建客户 - 定义参数
    var venCustomCreateData = {
        token: token,
        customer_id: 0, //客户id大于0就是修改
        code_sn: "", //客户编号
        name: "", //名称
        uid: uid, //添加人
        dept: dept, //负责部门
        owner: uid, //负责人
        industry_big_id: '', //行业大类id
        industry_small_id: '', //行业小类id
        comefrom: 0, //来源类型
        grade: 0, //客户级别
        arrears: 0, //欠款
        tel: "", //联系电话
        province: 0, //省
        city: 0, //市
        area: 0, //区
        address: "", //地址
        //下面是自定义字段内容
        customfields: [], // 自定义字段
        //下面是联系人内容
        contacts: '', // 联系人信息
        note: "", //备注
        account_name: "",
        account_bank: "",
        pay_account: "",
        tax_num: "",
        level_type: '', // 客户类别 1渠道客户 2系统集成客户 3终端客户 4其他
        business_img: '', // 上传营业执照 图片
        legal_person_img: '', //上传法人执照 图片
        clear_type: '' //结算方式
    };

    // 新建客户
    var venCusCreateContFieldHtml = '';
    $('#ven_custom_create_btn').die('click').live('click', function () {
        venCustomCreateData = {
            token: token,
            customer_id: 0, //客户id大于0就是修改
            code_sn: "", //客户编号
            name: "", //名称
            uid: uid, //添加人
            dept: dept, //负责部门
            owner: uid, //负责人
            industry_big_id: '', //行业大类id
            industry_small_id: '', //行业小类id
            comefrom: 0, //来源类型
            grade: 0, //客户级别
            arrears: 0, //欠款
            tel: "", //联系电话
            province: 0, //省
            city: 0, //市
            area: 0, //区
            address: "", //地址
            //下面是自定义字段内容
            customfields: [], // 自定义字段
            //下面是联系人内容
            contacts: '', // 联系人信息
            note: "", //备注
            account_name: "",
            account_bank: "",
            pay_account: "",
            tax_num: "",
            level_type: '', // 客户类别 1渠道客户 2系统集成客户 3终端客户 4其他
            business_img: '', // 上传营业执照 图片
            legal_person_img: '', //上传法人执照 图片
            clear_type: '' //结算方式
        };
        $('.tanceng .l_createCusCode').val(likGetCodeFn('KH'));
        //负责人
        $('.tanceng .ven_custom_create_choose_owner_inp').val(uname);
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
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var datalist = oE.datalist;
                    var venCusCreateInfoFieldHtml = '';
                    $.each(datalist, function (i, v) {
                        venCusCreateInfoFieldHtml += '<div class="t_textinput">\
                            <div class="t_left">' + v['title'] + '</div>\
                            <div class="t_right"><input type="text" class="time_input" value="请输入' + v['title'] + '" onfocus="fn_focus(this);" onblur="fn_blur(this);"></div>\
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
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var datalist = oE.datalist;
                    if (datalist.length > 0) {
                        venCusCreateContFieldHtml = '';
                        $.each(datalist, function (i, v) {
                            venCusCreateContFieldHtml += '<div class="t_textinput">\
                            <div class="t_left">' + v['title'] + '</div>\
                            <div class="t_right"><input type="text" class="time_input" value="请输入' + v['title'] + '" onfocus="fn_focus(this);" onblur="fn_blur(this);"></div>\
                            </div>'
                        });
                    }
                    $('.tanceng .ven_custom_create_cont_field_list').html(venCusCreateContFieldHtml);
                }
            }
        });
    });
    //    添加客户联系人
    $(".xs_khgl_addlxrBut").die('click').live("click", function () {
        $(this).parent(".t_textinput").before('<div class="worksp_addbx">\
                <div class="work_sp_fqsp_h3">\
                <h3 class="inline_block"><p>联系人信息<span class="c_r">(<cite class="page_31_khlxrNum">1</cite>)</span>\
                </p></h3>\
                <div class="work_fqsp_gb_img none xs_khgl_khlxrBut"><i></i></div>\
                </div>\
                <div class="t_textinput">\
                <div class="t_left t_left_conrow"><i class="c_r v_hidden">*</i>联系人职务</div>\
                <div class="t_right">\
                <div class="inline_block select_mormal select_100">\
                <input type="text" class="select_input ven_custom_create_contact_job" value="CEO">\
                <i></i>\
                <ul class="select_list sbar">\
                <li searchid="1">CEO</li>\
                <li searchid="2">总经理</li>\
                <li searchid="3">副总经理</li>\
                <li searchid="4">业务主管</li>\
                <li searchid="5">业务员</li>\
                <li searchid="6">财务</li>\
                <li searchid="7">收货人</li>\
                </ul>\
                </div>\
                </div>\
                </div>\
                <div class="t_textinput">\
                <div class="t_left"><i class="c_r v_hidden">*</i>联系人</div>\
                <div class="t_right"><input type="text" class="time_input ven_custom_create_contact_name" value="请输入联系人姓名" onfocus="fn_focus(this);" onblur="fn_blur(this);"></div>\
                </div>\
                <div class="t_textinput">\
                <div class="t_left t_left_conrow"><i class="c_r v_hidden">*</i>联系人电话</div>\
                <div class="t_right"><input type="text" class="time_input ven_custom_create_contact_tel" value="请输入联系人电话" onfocus="fn_focus(this);" onblur="fn_blur(this);"></div>\
                </div>\
                <div class="t_textinput">\
                <div class="t_left t_left_conrow"><i class="c_r v_hidden">*</i>联系人地址</div>\
                <div class="t_right"><input type="text" class="time_input ven_custom_create_contact_addr" value="请输入联系人地址" onfocus="fn_focus(this);" onblur="fn_blur(this);"></div>\
                </div>\
                <div class="t_textinput">\
                <div class="t_left "><i class="c_r v_hidden">*</i>邮箱</div>\
                <div class="t_right"><input type="text" class="time_input ven_custom_create_contact_email" value="请输入联系人邮箱" onfocus="fn_focus(this);" onblur="fn_blur(this);"></div>\
                </div>\
                <div class="ven_custom_create_cont_field_list">' + venCusCreateContFieldHtml + '</div>\
                <div class="t_textinput" style="height:auto;">\
                <div class="t_left ">联系人备注</div>\
                <div class="t_right"><textarea class="txt_normal ven_custom_create_contact_note" onfocus="fn_focus(this);" onblur="fn_blur(this);">请输入联系人备注</textarea></div>\
                </div>\
                </div>');
        xsadd_khlxr($(this));
    });
    $(".xs_khgl_khlxrBut").die('click').live("click", function () {
        var obj_this = $(this).closest(".dialog_text_con").find(".xs_khgl_khlxrBut");
        $(this).parents(".worksp_addbx").remove();
        xsadd_khlxr(obj_this);
    });
    function xsadd_khlxr(obj) {
        var num_khlxr = obj.parents(".dialog_text_con").children(".worksp_addbx").length;
        for (var i = 0; i < num_khlxr; i++) {
            obj.parents(".dialog_text_con").find(".worksp_addbx .page_31_khlxrNum").eq(i).html(i + 1);
        }
        if (num_khlxr > 1) {
            obj.parents(".dialog_text_con").children(".worksp_addbx").find(".work_fqsp_gb_img").show();
        } else {
            obj.parents(".dialog_text_con").children(".worksp_addbx").find(".work_fqsp_gb_img").hide()
        }
    }

    //选择负责人
    $('.tanceng .ven_custom_create_choose_owner_btn').die('click').live('click', function () {
        venCustomCreateChooseOwnerFn();
        //选择负责人
        $('.tanceng .person_left_nav').die('click').live('click', function () {
            //新建
            venCustomCreateData.owner = $(this).attr('userinfoid');
            venCustomCreateData.dept = $(this).parent('ul').prev('li').attr('cussortid');
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
            dataType: 'json',
            success: function (oE) {
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
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var dataList = oE.datalist;
                    var html = '';
                    $.each(dataList, function (i, v) {
                        html += '<li industrybigid="' + v['id'] + '">' + v.name + '</li>'
                    });
                    $('.tanceng .l_createCusIndustryBig_ul').html(html);
                    $('.tanceng .l_createCusIndustryBig_ul li').die('click').live('click', function () {
                        $('.tanceng .l_createCusIndustrySmall_inp').val('互联网/电子商务').attr('disabled', null);
                        $('.tanceng .l_createCusIndustrySmall_ul').css('visibility', '');
                        var curIndustryBigId = $(this).attr('industrybigid');
                        venCustomCreateData.industry_big_id = curIndustryBigId;
                        $.ajax({
                            url: SERVER_URL + '/industry/smalllist',
                            type: 'GET',
                            data: {
                                token: token,
                                big_id: curIndustryBigId
                            },
                            dataType: 'json',
                            success: function (oE) {
                                if (oE.code == 0) {
                                    var dataList = oE.datalist;
                                    var html = '';
                                    $.each(dataList, function (i, v) {
                                        html += '<li industrysmallid="' + v['id'] + '">' + v.name + '</liindustrybigid>'
                                    });
                                    $('.tanceng .l_createCusIndustrySmall_ul').html(html);
                                    $('.tanceng .l_createCusIndustrySmall_ul li').die('click').live('click', function () {
                                        venCustomCreateData.industry_small_id = $(this).attr('industrysmallid');
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

    // 客户类别
    $('.tanceng .l_create_level_type_ul li').die('click').live('click', function () {
        venCustomCreateData.level_type = $(this).attr('searchid');
    });

    // 结算方式
    $('.tanceng .l_create_clear_type_ul li').die('click').live('click', function () {
        venCustomCreateData.clear_type = $(this).attr('searchid');
    });

    // 客户来源选择
    $('.tanceng .l_createCusCome li').die('click').live('click', function () {
        venCustomCreateData.comefrom = $(this).attr('searchid');
    });
    // 新建客戶 - 客户级别选择
    $('.tanceng .l_createCusGrade_ul li').die('click').live('click', function () {
        venCustomCreateData.grade = $(this).attr('searchid');
    });

    //判断省市县是否可以点击函数
    function inputDisabledStatus() {
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
    $('.tanceng .ven_custom_create_choose_bigarea_name').die('click').live('click', function () {
        $.ajax({
            url: SERVER_URL + '/industry/bigarealist',
            type: 'GET',
            data: {
                token: token
            },
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                if (oE.code == 0) {
                    var datalist = oE.datalist;
                    var areaListBigarea = '';
                    $.each(datalist, function (i, v) {
                        areaListBigarea += '<li bigareaid="' + v['id'] + '">' + v['name'] + '</li>'
                    });
                    $('.tanceng .area_list_bigarea').html(areaListBigarea);
                }
            },
            error: function () {
                alert('获取失败');
            }
        });
    });
    //选择省市区
    $('.tanceng .area_list_bigarea li').die('click').live('click', function () {
        var bigareaId = $(this).attr('bigareaid');
        $.ajax({
            url: SERVER_URL + '/industry/provincelist',
            type: 'GET',
            data: {
                token: token,
                big_area_id: bigareaId
            },
            dataType: 'json',
            success: function (oE) {
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
    $('.ven_custom_create_choose_province_name').die('click').live('click', function () {
        $.ajax({
            url: SERVER_URL + '/industry/provincelist',
            type: 'GET',
            data: {
                token: token,
                big_area_id: 0
            },
            dataType: 'json',
            success: function (oE) {
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
    var provinceId = null;
    $('.tanceng .area_list_province li').die('click').live('click', function () {
        provinceId = $(this).attr('provinceid');
        venCustomCreateData.province = provinceId;
        $.ajax({
            url: SERVER_URL + '/industry/citylist',
            type: 'GET',
            data: {
                token: token,
                province_id: provinceId
            },
            dataType: 'json',
            success: function (oE) {
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
    var cityId = null;
    $('.tanceng .area_list_city li').die('click').live('click', function () {
        cityId = $(this).attr('cityid');
        venCustomCreateData.city = cityId;
        $.ajax({
            url: SERVER_URL + '/industry/arealist',
            type: 'GET',
            data: {
                token: token,
                city_id: cityId
            },
            dataType: 'json',
            success: function (oE) {
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
    $('.tanceng .area_list_area li').die('click').live('click', function () {
        var areaId = $(this).attr('areaid');
        venCustomCreateData.area = areaId;
    });

    // 新建客户>选择分类
    $('.tanceng .l_createCusChooseSortSub').die('click').live('click', function () {
        $('.tanceng .l_createCusSortInp').val($(this).parent().prev().find('li.on span.list_msg').text());
        $('.tanceng .l_createCusSortInpHid').val($(this).parent().prev().find('li.on').attr('cussortid'));
        venCustomCreateData.category_id = $('.tanceng .l_createCusSortInpHid').val();
    });
    /*
     //新建客户 - 选择介绍人
     $('.tanceng .ven_custom_create_choose_introducer_btn').die('click').live('click', function () {
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
     dataType: 'json',
     success: function (e) {
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
     $('.tanceng .ven_custom_create_choose_indroducer_search_btn').die('click').live('click', function () {
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
     $('.tanceng .ven_custom_create_choose_indroducer_industry_btn').die('click').live('click', function () {
     $.ajax({
     url: SERVER_URL + '/industry/list',
     type: 'GET',
     data: {
     token: token,
     pid: 0
     },
     dataType: 'json',
     success: function (oE) {
     if (oE.code == 0) {
     var dataList = oE.datalist;
     var html = '';
     $.each(dataList, function (i, v) {
     html += '<li industrybigid="' + v['id'] + '">' + v.name + '</li>'
     });
     $('.tanceng .ven_custom_create_choose_indroducer_industry_list').html(html);
     $('.tanceng .ven_custom_create_choose_indroducer_industry_list li').die('click').live('click', function () {
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
     $('.tanceng .ven_custom_create_choose_indroducer_grade_ul li').die.die('click').live('click', function () {
     cusCreateChooseIndroducerData.grade = $(this).index();
     cusCreateChooseIndroducerFn();
     });
     //新建客户 - 选择介绍人 - 保存
     $('.tanceng .cus_create_choose_indroducer_save_btn').die('click').live('click', function () {
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
     $('.tanceng .ven_custom_create_choose_supplier_btn').die('click').live('click', function () {
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
     dataType: 'json',
     success: function (oE) {
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
     dataType: 'json',
     success: function (oE) {
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
     sortStatusBtn = '<button class="but_mix but_exit val_dialog pur_sup_edit_btn" name="cg_ghs_exit">编辑</button><button class="but_mix ven_cus_void_btn but_r pur_sup_zf_btn">作废</button>'
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
     $('.tanceng .ven_custom_create_choose_supplier_search_btn').die('click').live('click', function () {
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
     $('.tanceng .ven_custom_create_choose_supplier_save_btn').die('click').live('click', function () {
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
     $('.tanceng .ven_custom_create_limit_checkbox').die('click').live('click', function () {
     if ($(this).attr('checked') == 'checked') {
     $('.tanceng .ven_custom_create_limit_inp').attr('disabled', null);
     } else {
     $('.tanceng .ven_custom_create_limit_inp').attr('disabled', 'disabled');
     }
     });
     */

    //客户名称
    $('.tanceng .l_createCusName').live('keyup', function () {
        $('.tanceng .ven_cus_create_account_name').val($(this).val());
    });

    // 新建客户>提交
    $('.tanceng .addCusSub').die('click').live('click', function () {
        cusCreateSubmitFn();
    });
    //新建提交函数
    function cusCreateSubmitFn() {
        //必填字段
        if ($('.tanceng .l_createCusName').val() == '请输入客户名称') {
            alert('请输入客户名称');
            return false;
        }
        //客户类别
        if ($('.tanceng .l_create_level_type').val() == '请选择客户类别') {
            alert('请选择客户类别');
            return false;
        }
        //客户所在地区
        if ($('.tanceng .ven_custom_create_choose_bigarea_name').val() == '区' || $('.tanceng .ven_custom_create_choose_province_name').val() == '省' || $('.tanceng .ven_custom_create_choose_city_name').val() == '市' || $('.tanceng .ven_custom_create_choose_area_name').val() == '县/区') {
            alert('请选择客户所在地区');
            return false;
        }
        //结算方式
        if ($('.tanceng .l_create_clear_type').val() == '请选择结算方式') {
            alert('请选择结算方式');
            return false;
        }
        //客户级别
        if ($('.tanceng .l_createCusGrade').val() == '请选择客户级别') {
            alert('请选择客户级别');
            return false;
        }
        //行业分类
        if ($('.tanceng .l_createCusIndustryBig').val() == 'IT/通信/电子/互联网' || $('.tanceng .l_createCusIndustrySmall_inp').val() == '互联网/电子商务') {
            alert('请选择行业分类');
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
        //客户编号
        venCustomCreateData.code_sn = $('.tanceng .l_createCusCode').val();
        //公司电话
        if ($('.tanceng .l_createCusComTel').val() == '请输入公司电话') {
            venCustomCreateData.tel = '';
        } else {
            venCustomCreateData.tel = $('.tanceng .l_createCusComTel').val();
        }
        //营业执照
        var cusCreateYyzz = '';
        $.each($('.tanceng .img_wrap_cus_yyzz li'), function (i, v) {
            cusCreateYyzz += $(this).find('img').attr('imgurl') + ',';
        });
        venCustomCreateData.business_img = cusCreateYyzz.slice(0, cusCreateYyzz.length - 1);
        //法人执照
        var cusCreateFrzz = '';
        $.each($('.tanceng .img_wrap_cus_frzz li'), function (i, v) {
            cusCreateFrzz += $(this).find('img').attr('imgurl') + ',';
        });
        venCustomCreateData.legal_person_img = cusCreateFrzz.slice(0, cusCreateFrzz.length - 1);
        //客户信息自定义字段
        var cusCreateInfoField = [];
        $.each($('.tanceng .ven_custom_create_info_field_list').children(), function (i, v) {
            var value = '';
            if ($('.tanceng .ven_custom_create_info_field_list').children().eq(i).find('.time_input').val().indexOf('请输入') != -1) {
                value = '';
            } else {
                value = $('.tanceng .ven_custom_create_info_field_list').children().eq(i).find('.time_input').val();
            }
            cusCreateInfoField.push({
                title: $('.tanceng .ven_custom_create_info_field_list').children().eq(i).find('.t_left').html(),
                val: value
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
            //联系人职务
            var venCustomCreateContactJob = $('.tanceng .ven_cus_create_cont_list_start').nextUntil('.tanceng .ven_cus_create_cont_list_end').eq(i).find('.ven_custom_create_contact_job').val();
            if (venCustomCreateContactJob == "请输入联系人职务") {
                venCustomCreateContactJob = ''
            } else {
                venCustomCreateContactJob = $('.tanceng .ven_cus_create_cont_list_start').nextUntil('.tanceng .ven_cus_create_cont_list_end').eq(i).find('.ven_custom_create_contact_job').val();
            }
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
            //联系人地址
            var venCustomCreateContactAddr = $('.tanceng .ven_cus_create_cont_list_start').nextUntil('.tanceng .ven_cus_create_cont_list_end').eq(i).find('.ven_custom_create_contact_addr').val();
            if (venCustomCreateContactAddr == "请输入联系人地址") {
                venCustomCreateContactAddr = ''
            } else {
                venCustomCreateContactAddr = $('.tanceng .ven_cus_create_cont_list_start').nextUntil('.tanceng .ven_cus_create_cont_list_end').eq(i).find('.ven_custom_create_contact_addr').val();
            }
            //联系人邮箱
            var venCustomCreateContactEmail = $('.tanceng .ven_cus_create_cont_list_start').nextUntil('.tanceng .ven_cus_create_cont_list_end').eq(i).find('.ven_custom_create_contact_email').val();
            if (venCustomCreateContactEmail == "请输入联系人邮箱") {
                venCustomCreateContactEmail = ''
            } else {
                venCustomCreateContactEmail = $('.tanceng .ven_cus_create_cont_list_start').nextUntil('.tanceng .ven_cus_create_cont_list_end').eq(i).find('.ven_custom_create_contact_email').val();
            }
            if (venCustomCreateContactName == '') {
                continue;
            }
            //联系人备注
            var venCustomCreateContactNote = $('.tanceng .ven_cus_create_cont_list_start').nextUntil('.tanceng .ven_cus_create_cont_list_end').eq(i).find('.ven_custom_create_contact_note').val();
            if (venCustomCreateContactNote == "请输入联系人备注") {
                venCustomCreateContactNote = ''
            } else {
                venCustomCreateContactNote = $('.tanceng .ven_cus_create_cont_list_start').nextUntil('.tanceng .ven_cus_create_cont_list_end').eq(i).find('.ven_custom_create_contact_note').val();
            }
            if (venCustomCreateContactName == '') {
                continue;
            }
            cusCreateCont.push({
                job: venCustomCreateContactJob,
                name: venCustomCreateContactName,
                tel: venCustomCreateContactTel,
                address: venCustomCreateContactAddr,
                email: venCustomCreateContactEmail,
                custom_field: cusCreateContField,
                note: venCustomCreateContactNote
            })
        }
        if (cusCreateCont.length == 0) {
            venCustomCreateData.contacts = '';
        } else {
            venCustomCreateData.contacts = arrayToJson(cusCreateCont);
        }

        //备注
        if ($('.tanceng .ven_cus_create_note').val() == '请输入备注') {
            venCustomCreateData.note = '';
        } else {
            venCustomCreateData.note = $('.tanceng .ven_cus_create_note').val();
        }
        //账户名称
        if ($('.tanceng  .ven_cus_create_account_name').val() == '') {
            venCustomCreateData.account_name = '';
        } else {
            venCustomCreateData.account_name = $('.tanceng .ven_cus_create_account_name').val();
        }
        //纳税人识别号
        if ($('.tanceng  .ven_cus_create_account_bank').val() == '请输入纳税人识别号') {
            venCustomCreateData.account_bank = '';
        } else {
            venCustomCreateData.account_bank = $('.tanceng .ven_cus_create_account_bank').val();
        }
        //地址、电话
        if ($('.tanceng  .ven_cus_create_pay_account').val() == '请输入地址、电话') {
            venCustomCreateData.pay_account = '';
        } else {
            venCustomCreateData.pay_account = $('.tanceng .ven_cus_create_pay_account').val();
        }
        //开户行及账号
        if ($('.tanceng  .ven_cus_create_tax_num').val() == '请输入开户行及账号') {
            venCustomCreateData.tax_num = '';
        } else {
            venCustomCreateData.tax_num = $('.tanceng .ven_cus_create_tax_num').val();
        }
        console.log(venCustomCreateData);
        $.ajax({
            url: SERVER_URL + '/customer/add',
            type: 'POST',
            data: venCustomCreateData,
            dataType: 'json',
            success: function (e) {
                if (e.code == 0) {
                    alert('成功');
                    getCusListByAreaSort();
                    getCusListByOwnerSort();
                    getCusList();
                    $('.tanceng>div').remove();
                    $('.tanceng').css({
                        'display': 'none'
                    });
                } else {
                    alert(e.msg);
                }
            }
        });
    }

    $(".select_list:not(.no_auto) li").live("click", function () {
        // 高级搜索输入框宽度自适应
        $(this).parents('div.select_p').css('minWidth', $(this).width() + 32)
    });

// 设置>客户分类设置
    $('#list_khflsz li').die('click').live('click', function () {
        $(this).closest('.list_box').find('.list_box_But button').removeClass('grey')
        $(this).closest('.list_box').find('.list_box_But button').eq(1).addClass('val_dialogTop')
        $(this).closest('.list_box').find('.list_box_But button').eq(4).addClass('val_dialogTop')
    })
// 设置>客户分类设置>新建分类
    $('#list_create_category_save').die('click').live('click', function () {
        if ($('#list_create_category_name').val() == '请输入分类名称') {
            alert('请输入分类名称')
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
                dataType: 'json',
                success: function (e) {
                    if (e.code == 0) {
                        alert('新建成功');
                        $('#list_create_category_save').parent().parent().parent().remove()
                    }
                }
            });
        }
        //			$('#list_edit_category_old').val($('#list_khflsz li.on').attr('cussortid'))
    })
// 设置>客户分类设置>编辑弹框>客户名称
    $('#xs_kh_bjfl_btn').die('click').live('click', function () {
        $('#xs_kh_bjfl_val').val($('#list_khflsz li.on span.list_msg').html())
        $('#list_edit_category_old').val($('#list_khflsz li.on').attr('cussortid'))
    })
// 设置>客户分类设置>编辑弹框>选择上级分类
    $('#list_edit_category_chooseP_ul li').die('click').live('click', function () {
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
    $('#list_edit_category_save').die('click').live('click', function () {
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
            dataType: 'json',
            success: function (e) {
                if (e.code == 0) {
                    alert('编辑成功');
                    $('#list_edit_category_save').closest('.dialog_box').remove();
                }
            }
        });
    })
// 客户>客户分类设置>删除分类
    $('.tanceng .list_category_del_submit').die('click').live('click', function () {
        $.ajax({
            type: "post",
            url: SERVER_URL + "/customer/categorydel",
            async: true,
            data: {
                token: token,
                id: $('#list_khflsz li.on').attr('cussortid')
            },
            dataType: 'json',
            success: function (e) {
                if (e.code == 0) {
//					$('#list_edit_category_save').closest('.dialog_box').remove();
                }
            }
        });
    })

//客户设置
    $('#ven_custom_setting_btn').die('click').live('click', function () {
        var numTotal = 0;
        //客户信息
        $.ajax({
            url: SERVER_URL + '/customer/settinglist',
            type: 'GET',
            async: false,
            data: {
                token: token,
                thetype: 4
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var datalist = oE.datalist;
                    console.log(oE);
                    numTotal += parseFloat(datalist.length);
                    var venCusSetInfoFieldOldHtml = '';
                    $.each(datalist, function (i, v) {
                        venCusSetInfoFieldOldHtml += '<div class="m_bottom_10" style="clear:both">\
                                                    <div class="t_textinput left" style="width: 75%;">\
                                                    <div class="t_left"><i class="c_r v_hidden">*</i>自定义</div>\
                                                    <div class="t_right clearfix">\
                                                    <div class="inline_block select_mormal select_100 left">\
                                                    <input type="text" class="select_input c_3 ven_custom_setting_info_field_new" value="' + v['title'] + '" />\
                                                    </div>\
                                                    </div>\
                                                    </div>\
                                                    <div class="cg_ghs_setul" style="width:23%;">\
                                                    <button class="but_green page31_khsxAdd">+</button><button class="but_red page31_khsxDelete">-</button>\
                                                    </div>\
                                                    </div>'
                    });
                    $('.tanceng .ven_custom_setting_info_field_new_list').html(venCusSetInfoFieldOldHtml);
                }
            }
        });
        //联系人信息
        $.ajax({
            url: SERVER_URL + '/customer/settinglist',
            type: 'GET',
            async: false,
            data: {
                token: token,
                thetype: 5
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var datalist = oE.datalist;
                    numTotal += parseFloat(datalist.length);
                    var venCusSetContFieldOldHtml = '';
                    $.each(datalist, function (i, v) {
                        venCusSetContFieldOldHtml += '<div class="m_bottom_10" style="clear:both">\
                                                    <div class="t_textinput left" style="width: 75%;">\
                                                    <div class="t_left"><i class="c_r v_hidden">*</i>自定义</div>\
                                                    <div class="t_right clearfix">\
                                                    <div class="inline_block select_mormal select_100 left">\
                                                    <input type="text" class="select_input c_3 ven_custom_setting_info_field_new" value="' + v['title'] + '" />\
                                                    </div>\
                                                    </div>\
                                                    </div>\
                                                    <div class="cg_ghs_setul" style="width:23%;">\
                                                    <button class="but_green page31_khsxAdd">+</button>\
                                                    <button class="but_red page31_khsxDelete">-</button>\
                                                    </div>\
                                                    </div>\
                            </div>\
                            </div>'
                    });
                    $('.tanceng .ven_custom_setting_cont_field_new_list').html(venCusSetContFieldOldHtml);
                }
            }
        });
        dialogBoxAutoHeight('.ven_custom_setting_dialog', numTotal)
    });
    //弹窗高度适应
    function dialogBoxAutoHeight(className, numTotal) {
        if (numTotal > 7) {
            numTotal = 7;
            return;
        }
        $(className).css('minHeight', 200 + 45 * numTotal)
    }

//客户设置 - 保存
    $('.tanceng .ven_custom_setting_save_btn').die('click').live('click', function () {
        var arrVenCusSetInfoField = [];
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
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                }
            }
        });
        var arrVenCusSetContField = [];
        //客户联系人信息 - 新
        $.each($('.tanceng .ven_custom_setting_cont_field_new_list .ven_custom_setting_info_field_new'), function (i, v) {
            if ($('.tanceng .ven_custom_setting_cont_field_new_list .ven_custom_setting_info_field_new').eq(i).val() == '如QQ号') {
                return true;
            }
            arrVenCusSetContField.push($('.tanceng .ven_custom_setting_cont_field_new_list .ven_custom_setting_info_field_new').eq(i).val())
        });
        $.ajax({
            url: SERVER_URL + '/customer/setting',
            type: 'POST',
            data: {
                token: token,
                thetype: 5,
                customer: arrVenCusSetContField
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                }
            }
        });
        $(this).closest('.dialog_box').remove();
        $('.tanceng').css('display', 'none')
    })

    //编辑客户
    $('.ven_custom_edit_btn').die('click').live('click', function () {
        var currentCusId = $(this).closest('tr').attr('cusid');
        //用于自定义字段判断
        var cusInfoField = [];
        var cusInfoFieldArr = [];
        //用于客户联系人自定义字段判断
        var cusContField = [];
        var cusContFieldArr = [];
        $.ajax({
            url: SERVER_URL + '/customer/info',
            type: 'get',
            async: false,
            data: {
                token: token,
                customer_id: currentCusId
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var datalist = oE.data;
                    console.log(datalist);
                    //创建日期
                    $('.tanceng .l_createDate').html(datalist['created_at'].split(' ')[0]);
                    //客户编号
                    $('.tanceng .l_createCusCode').val(datalist['code_sn']);
                    //负责人
                    $('.tanceng .ven_custom_create_choose_owner_inp').val(datalist['owner_name']);
                    //客户名称
                    $('.tanceng .l_createCusName').val(datalist['name']);
                    //客户类别
                    var level_type = '';
                    if (datalist['level_type'] == 1) {
                        level_type = '渠道客户';
                    } else if (datalist['level_type'] == 2) {
                        level_type = '系统集成客户';
                    } else if (datalist['level_type'] == 3) {
                        level_type = '终端客户';
                    } else if (datalist['level_type'] == 4) {
                        level_type = '其他';
                    }
                    $('.tanceng .l_create_level_type').val(level_type);
                    //结算方式
                    var clear_type = '';
                    if (datalist['clear_type'] == 1) {
                        clear_type = '现结';
                    } else if (datalist['clear_type'] == 2) {
                        clear_type = '账期';
                    } else {
                        clear_type = '无';
                    }
                    $('.tanceng .l_create_clear_type').val(clear_type);
                    //客户级别
                    $('.tanceng .l_createCusGrade').val(datalist['grade_name']);
                    //行业大类
                    $('.tanceng .l_createCusIndustryBig').val(datalist['industry_big_name']);
                    //行业小类
                    $('.tanceng .l_createCusIndustrySmall_inp').val(datalist['industry_small_name']);
                    //客户来源
                    $('.tanceng .ven_custom_edit_comefrom_name').val(datalist['comefrom_name']);
                    //客户级别
                    $('.tanceng .ven_custom_edit_grade_name').val(datalist['grade_name']);
                    //公司电话
                    $('.tanceng .l_createCusComTel').val(datalist['tel']);
                    //地址 - 省
                    $('.tanceng .ven_custom_create_choose_province_name').val(datalist['province_name']);
                    provinceId = datalist['province'];
                    //地址 - 市
                    $('.tanceng .ven_custom_create_choose_city_name').val(datalist['city_name']);
                    cityId = datalist['city'];
                    //地址 - 县/区
                    $('.tanceng .ven_custom_create_choose_area_name').val(datalist['area_name']);
                    //详细地址
                    $('.tanceng .l_createCusAddr').val(datalist['address']);
                    //客户信息自定义字段
                    var cusEditFieldDatalist = datalist['customfields'];
                    var cusEditFieldDatalistHtml = '';
                    $.each(cusEditFieldDatalist, function (i, v) {
                        //用于自定义字段判断
                        cusInfoField.push(v['title']);
                        var key = v['title'];
                        cusInfoFieldArr.push({
                            title: v['title'],
                            val: v['val']
                        });
                        cusEditFieldDatalistHtml += '<div class="t_textinput">\
                            <div class="t_left">' + v['title'] + '</div>\
                            <div class="t_right"><input type="text" class="time_input" value="' + v['val'] + '" onfocus="fn_focus(this);" onblur="fn_blur(this);"></div>\
                            </div>'
                    });
                    //客户联系人信息
                    var cusEditContDatalist = datalist['contacts'];
                    var cusEditContDatalistHtml = '';
                    $.each(cusEditContDatalist, function (i, v) {
                        if(v['name'] == '') return true;
                        var cusEditContFieldDatalistHtml = '';
                        $.each(v['custom_field'], function (i2, v2) {
                            cusContField.push(v2['title']);
                            cusContFieldArr.push({
                                title: v2['title'],
                                val: v2['val']
                            });
                            cusEditContFieldDatalistHtml += '<div class="t_textinput">\
                            <div class="t_left">' + v2['title'] + '</div>\
                            <div class="t_right"><input type="text" class="time_input c_3" value="' + v2['val'] + '" onfocus="fn_focus(this);" onblur="fn_blur(this);"></div>\
                            </div>'
                        });
                        cusEditContDatalistHtml += '<div class="worksp_addbx">\
                                                        <div class="work_sp_fqsp_h3">\
                                                        <h3 class="inline_block"><p>联系人信息<span class="c_r">(<cite class="page_31_khlxrNum">' + (i + 1) + '</cite>)</span></p></h3>\
                                                    <div class="work_fqsp_gb_img xs_khgl_khlxrBut ' + (i == 0 ? 'none' : '') + '"><i></i></div>\
                                                        </div>\
                                                        <div class="t_textinput">\
                                                        <div class="t_left t_left_conrow"><i class="c_r v_hidden">*</i>联系人职务</div>\
                                                        <div class="t_right">\
                                                        <div class="inline_block select_mormal select_100">\
                                                        <input type="text" class="select_input ven_custom_create_contact_job c_3" value="' + v['job'] + '">\
                                                        <i></i>\
                                                        <ul class="select_list l_createCusCome">\
                                                        <li searchid="1">CEO</li>\
                                                        <li searchid="2">总经理</li>\
                                                        <li searchid="3">副总经理</li>\
                                                        <li searchid="4">业务主管</li>\
                                                        <li searchid="5">业务员</li>\
                                                        <li searchid="6">财务</li>\
                                                        <li searchid="7">收货人</li>\
                                                        </ul>\
                                                        </div>\
                                                        </div>\
                                                        </div>\
                                                        <div class="t_textinput">\
                                                        <div class="t_left"><i class="c_r v_hidden">*</i>联系人</div>\
                                                        <div class="t_right"><input type="text" class="time_input ven_custom_create_contact_name c_3" value="' + v['name'] + '"></div>\
                                                        </div>\
                                                        <div class="t_textinput">\
                                                        <div class="t_left t_left_conrow"><i class="c_r v_hidden">*</i>联系人电话</div>\
                                                        <div class="t_right"><input type="text" class="time_input ven_custom_create_contact_tel c_3" value="' + v['tel'] + '"></div>\
                                                        </div>\
                                                        <div class="t_textinput">\
                                                        <div class="t_left t_left_conrow"><i class="c_r v_hidden">*</i>联系人地址</div>\
                                                        <div class="t_right"><input type="text" class="time_input ven_custom_create_contact_addr c_3" value="' + v['address'] + '"></div>\
                                                        </div>\
                                                        <div class="t_textinput">\
                                                        <div class="t_left "><i class="c_r v_hidden">*</i>邮箱</div>\
                                                        <div class="t_right"><input type="text" class="time_input ven_custom_create_contact_email c_3" value="' + v['email'] + '"></div>\
                                                        </div>\
                                                        <div class="ven_custom_create_cont_field_list">' + cusEditContFieldDatalistHtml + '</div><div class="t_textinput" style="height:auto;"><div class="t_left ">联系人备注</div><div class="t_right"><textarea class="c_3 txt_normal ven_custom_create_contact_note">' + v['note'] + '</textarea></div></div></div>'
                    });
                    if (cusEditContDatalistHtml == '') {
                        $.ajax({
                            url: SERVER_URL + '/customer/settinglist',
                            type: 'GET',
                            data: {
                                token: token,
                                thetype: 5
                            },
                            dataType: 'json',
                            success: function (oE) {
                                if (oE.code == 0) {
                                    var datalist = oE.datalist;
                                    var venCusCreateContFieldHtml = '';
                                    $.each(datalist, function (i, v) {
                                        venCusCreateContFieldHtml += '<div class="t_textinput">\
                                                                    <div class="t_left">' + v['title'] + '</div>\
                                                                    <div class="t_right"><input type="text" class="time_input" value="请输入' + v['title'] + '"></div>\
                                                                    </div>'
                                    });
                                    cusEditContDatalistHtml = '<div class="worksp_addbx">\
                                                        <div class="work_sp_fqsp_h3">\
                                                        <h3 class="inline_block"><p>联系人信息<span class="c_r">(<cite class="page_31_khlxrNum">1</cite>)</span>\
                                                        </p></h3>\
                                                        <div class="work_fqsp_gb_img none xs_khgl_khlxrBut"><i></i></div>\
                                                        </div>\
                                                        <div class="t_textinput">\
                                                        <div class="t_left t_left_conrow"><i class="c_r v_hidden">*</i>联系人职务</div>\
                                                        <div class="t_right">\
                                                        <div class="inline_block select_mormal select_100">\
                                                        <input type="text" class="select_input ven_custom_create_contact_job" value="CEO">\
                                                        <i></i>\
                                                        <ul class="select_list sbar">\
                                                        <li searchid="1">CEO</li>\
                                                        <li searchid="2">总经理</li>\
                                                        <li searchid="3">副总经理</li>\
                                                        <li searchid="4">业务主管</li>\
                                                        <li searchid="5">业务员</li>\
                                                        <li searchid="6">财务</li>\
                                                        <li searchid="7">收货人</li>\
                                                        </ul>\
                                                        </div>\
                                                        </div>\
                                                        </div>\
                                                        <div class="t_textinput">\
                                                        <div class="t_left"><i class="c_r v_hidden">*</i>联系人</div>\
                                                        <div class="t_right"><input type="text" class="time_input ven_custom_create_contact_name" value="请输入联系人姓名" onfocus="fn_focus(this);" onblur="fn_blur(this);"></div>\
                                                        </div>\
                                                        <div class="t_textinput">\
                                                        <div class="t_left t_left_conrow"><i class="c_r v_hidden">*</i>联系人电话</div>\
                                                        <div class="t_right"><input type="text" class="time_input ven_custom_create_contact_tel" value="请输入联系人电话" onfocus="fn_focus(this);" onblur="fn_blur(this);"></div>\
                                                        </div>\
                                                        <div class="t_textinput">\
                                                        <div class="t_left t_left_conrow"><i class="c_r v_hidden">*</i>联系人地址</div>\
                                                        <div class="t_right"><input type="text" class="time_input ven_custom_create_contact_addr" value="请输入联系人地址" onfocus="fn_focus(this);" onblur="fn_blur(this);"></div>\
                                                        </div>\
                                                        <div class="t_textinput">\
                                                        <div class="t_left "><i class="c_r v_hidden">*</i>邮箱</div>\
                                                        <div class="t_right"><input type="text" class="time_input ven_custom_create_contact_email" value="请输入联系人邮箱" onfocus="fn_focus(this);" onblur="fn_blur(this);"></div>\
                                                        </div>\
                                                        <div class="ven_custom_create_cont_field_list">' + venCusCreateContFieldHtml + '</div>\
                                                        <div class="t_textinput" style="height:auto;">\
                                                        <div class="t_left ">联系人备注</div>\
                                                        <div class="t_right"><textarea class="txt_normal ven_custom_create_contact_note" onfocus="fn_focus(this);" onblur="fn_blur(this);">请输入联系人备注</textarea></div>\
                                                        </div>\
                                                        </div>';
                                    $('.tanceng .xs_khgl_addlxrBut').parents('.t_textinput').before(cusEditContDatalistHtml);
                                }
                            }
                        });
                    } else {
                        $('.tanceng .xs_khgl_addlxrBut').parents('.t_textinput').before(cusEditContDatalistHtml);
                    }
                    //营业执照
                    if (datalist['business_img']) {
                        var imgArr = datalist['business_img'].split(',');
                        var imgHtml = '';
                        $.each(imgArr, function (i, v) {
                            imgHtml += '<li><input class="hide_input" type="file"><img class="img_src" imgurl="' + v + '" src="' + getImgUrl(v) + '"><i class="del_img">-</i></li>'
                        });
                        $('.tanceng .img_wrap_cus_yyzz cite').before(imgHtml);
                    }
                    //法人执照
                    if (datalist['legal_person_img']) {
                        var imgArr = datalist['legal_person_img'].split(',');
                        var imgHtml = '';
                        $.each(imgArr, function (i, v) {
                            imgHtml += '<li><input class="hide_input" type="file"><img class="img_src" imgurl="' + v + '" src="' + getImgUrl(v) + '"><i class="del_img">-</i></li>'
                        });
                        $('.tanceng .img_wrap_cus_frzz cite').before(imgHtml);
                    }
                    //介绍人
                    $('.tanceng .ven_custom_edit_chosen_introducer').html((datalist['introducer_name']) ? '<span class="xs_kh_addjsrname c_3">' + datalist['introducer_name'] + ' <em></em></span>' : '');
                    //关联供应商
                    $('.tanceng .ven_custom_edit_chosen_supplier').html((datalist['supplier_name']) ? '<span class="xs_kh_addjsrname c_3">' + datalist['supplier_name'] + ' <em></em></span>' : '');
                    //开户名称  账户名称
                    $('.tanceng .ven_cus_create_account_name').val(datalist['account_name']);
                    //开户银行  纳税人识别号
                    $('.tanceng .ven_cus_create_account_bank').val(datalist['account_bank']);
                    //汇款账号  地址、电话
                    $('.tanceng .ven_cus_create_pay_account').val(datalist['pay_account']);
                    //税号    开户行及账号
                    $('.tanceng .ven_cus_create_tax_num').val(datalist['tax_num']);
                    //备注
                    $('.tanceng .ven_cus_create_note').val(datalist['note']);

                    //编辑旧信息
                    venCustomCreateData = {
                        token: token,
                        customer_id: datalist['id'], //客户id大于0就是修改
                        code_sn: datalist['code_sn'], //客户编号
                        name: datalist['name'], //名称
                        uid: datalist['uid'], //添加人
                        dept: datalist['dept'], //负责部门
                        owner: datalist['owner'], //负责人
                        industry_big_id: datalist['industry_big_id'], //行业大类id
                        industry_small_id: datalist['industry_small_id'], //行业小类id
                        comefrom: datalist['comefrom'], //来源类型
                        grade: datalist['grade'], //客户级别
                        tel: datalist['tel'], //联系电话
                        province: datalist['province'], //省
                        city: datalist['city'], //市
                        area: datalist['area'], //区
                        address: datalist['address'], //地址
                        //下面是自定义字段内容
                        customfields: datalist['customfields'], // 自定义字段
                        //下面是联系人内容
                        contacts: arrayToJson(datalist['contacts']), // 联系人信息
                        note: datalist['note'], //备注
                        account_name: datalist['account_name'],
                        account_bank: datalist['account_bank'],
                        pay_account: datalist['pay_account'],
                        tax_num: datalist['tax_num'],
                        level_type: datalist['level_type'], // 客户类别 1渠道客户 2系统集成客户 3终端客户 4其他
                        business_img: datalist['business_img'], // 上传营业执照 图片
                        legal_person_img: datalist['legal_person_img'], //上传法人执照 图片
                        clear_type: datalist['clear_type'] //结算方式
                    };
                }
            }
        });

        //客户信息自定义字段
        $.ajax({
            url: SERVER_URL + '/customer/settinglist',
            type: 'GET',
            data: {
                token: token,
                thetype: 4
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var datalist = oE.datalist;
                    var venCusCreateInfoFieldHtml = '';
                    var cusInfoFieldArr2 = [];
                    $.each(datalist, function (i, v) {
                        cusInfoFieldArr2.push({
                            title: v['title'],
                            val: ''
                        });
                        if ($.inArray(v['title'], cusInfoField) != -1) {
                            venCusCreateInfoFieldHtml += '<div class="t_textinput">\
                            <div class="t_left">' + v['title'] + '</div>\
                            <div class="t_right"><input type="text" class="c_3 time_input" value="' + cusInfoFieldArr[$.inArray(v['title'], cusInfoField)]['val'] + '"></div>\
                            </div>';
                        } else {
                            venCusCreateInfoFieldHtml += '<div class="t_textinput">\
                            <div class="t_left">' + v['title'] + '</div>\
                            <div class="t_right"><input type="text" class="time_input" value="请输入' + v['title'] + '" onfocus="fn_focus(this);" onblur="fn_blur(this);"></div>\
                            </div>';
                        }
                    });
                    $('.tanceng .ven_custom_create_info_field_list').html(venCusCreateInfoFieldHtml);
                }
            }
        });
        /*venCusCreateInfoFieldHtml += '<div class="t_textinput">\
         <div class="t_left">' + v['title'] + '</div>\
         <div class="t_right"><input type="text" class="time_input" value="' + ($.inArray(v['title'], cusInfoField) == -1 ? ('请输入' + v['title']) : (cusInfoFieldArr[v['title']])) + '" onfocus="fn_focus(this);" onblur="fn_blur(this);"></div>\
         </div>';*/
        //客户联系人信息自定义字段
        /*$.ajax({
            url: SERVER_URL + '/customer/settinglist',
            type: 'GET',
            data: {
                token: token,
                thetype: 5
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var datalist = oE.datalist;
                    if (datalist.length > 0) {
                        venCusCreateContFieldHtml = '';
                        $.each(datalist, function (i, v) {
                            venCusCreateContFieldHtml += '<div class="t_textinput">\
                            <div class="t_left">' + v['title'] + '</div>\
                            <div class="t_right"><input type="text" class="time_input" value="请输入' + v['title'] + '" onfocus="fn_focus(this);" onblur="fn_blur(this);"></div>\
                            </div>'
                        });
                    }
                    $('.tanceng .ven_custom_create_cont_field_list').html(venCusCreateContFieldHtml);
                }
            }
        });*/
        //客户联系人信息自定义字段
        $.ajax({
            url: SERVER_URL + '/customer/settinglist',
            type: 'GET',
            data: {
                token: token,
                thetype: 5
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var datalist = oE.datalist;
                    venCusEditContFieldHtml = '';
                    venCusCreateContFieldHtml = '';
                    if (datalist.length > 0) {
                        $.each(datalist, function (i, v) {
                            venCusCreateContFieldHtml += '<div class="t_textinput">\
                             <div class="t_left">' + v['title'] + '</div>\
                            <div class="t_right"><input type="text" class="time_input" value="请输入' + v['title'] + '" onfocus="fn_focus(this);" onblur="fn_blur(this);"></div>\
                            </div>';
                            if($.inArray(v['title'], cusContField) != -1){
                                venCusEditContFieldHtml += '<div class="t_textinput">\
                             <div class="t_left">' + v['title'] + '</div>\
                            <div class="t_right"><input type="text" class="c_3 time_input" value="' + cusContFieldArr[$.inArray(v['title'], cusContField)]['val'] + '"></div>\
                            </div>';
                            }else{
                                venCusEditContFieldHtml += '<div class="t_textinput">\
                             <div class="t_left">' + v['title'] + '</div>\
                            <div class="t_right"><input type="text" class="time_input" value="请输入' + v['title'] + '" onfocus="fn_focus(this);" onblur="fn_blur(this);"></div>\
                            </div>';
                            }
                        });
                    }
                    $('.tanceng .ven_custom_create_cont_field_list').html(venCusEditContFieldHtml);
                }
            }
        });
    });
});
