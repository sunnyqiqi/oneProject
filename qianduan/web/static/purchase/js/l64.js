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

    var token, pid, key, page, limit, word_titl, goods_id, goods_pid, goods_member, goods_enddate, goods_fileurl, goods_imgurl, w_p_n;
    token = Admin.get_token();
    //token = '2017052516045457073-1-1';
    uid = Admin.get_uid();
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
        var purSupPowerList = loginUserInfo['powerUrls'];
        var purSupAdd = 'supplier/add';
        var purSupSetting = 'supplier/set';
        var purSupInvalid = 'supplier/invalid';
        var purSupDel = 'supplier/del';

        //新建供应商
        if ($.inArray(purSupAdd, purSupPowerList) == -1) {
            $('.pur_sup_create_btn').hide();
        } else {
            $('.pur_sup_create_btn').show();
        }

        //供应商设置
        if ($.inArray(purSupSetting, purSupPowerList) == -1) {
            $('.page_64_supplier_config').hide();
        } else {
            $('.page_64_supplier_config').show();
        }

        if ($.inArray(purSupAdd, purSupPowerList) == -1 && $.inArray(purSupSetting, purSupPowerList) == -1) {
            $('#pur_sup_create_setting_nav').css('width', '54px');
        } else if ($.inArray(purSupAdd, purSupPowerList) != -1 && $.inArray(purSupSetting, purSupPowerList) == -1) {
            $('#pur_sup_create_setting_nav').css('width', '165px');
        } else if ($.inArray(purSupAdd, purSupPowerList) == -1 && $.inArray(purSupSetting, purSupPowerList) != -1) {
            $('#pur_sup_create_setting_nav').css('width', '165px');
        } else if ($.inArray(purSupAdd, purSupPowerList) != -1 && $.inArray(purSupSetting, purSupPowerList) != -1) {
            $('#pur_sup_create_setting_nav').css('width', '272px');
        }

        //作废
        var invalidBtnStatus = '';
        if ($.inArray(purSupInvalid, purSupPowerList) == -1) {
            invalidBtnStatus = 'none';
        } else {
            invalidBtnStatus = '';
        }
        //删除
        var delBtnStatus = '';
        if ($.inArray(purSupDel, purSupPowerList) == -1) {
            delBtnStatus = 'none';
        } else {
            delBtnStatus = '';
        }
    }

    // 定义选择查看项
    var venPurSupLookAbledField = [
        {'index': null, 'field': '公司电话'},
        {'index': null, 'field': '地址'},
        {'index': null, 'field': '供应商来源'},
        {'index': null, 'field': '供应商联系人信息'},
        {'index': null, 'field': '关联客户'},
        {'index': null, 'field': '备注'}
    ];
    likShow('#pur_supplier_table', venPurSupLookAbledField, '#page_64_headers', '#pur_supplier_look_save', '#pur_supplier_look_reset');

//*****************定义供应商（左侧）********************
    // 定义供应商参数
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
        category: '', //类型 1.商品 2.整机商品
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
                var datalist = oE.dataList;
                var goodsCateListHtml = '<li bigid="0" goodscateid="0" class="Sideslip_list_on"><span>未分类</span></li>';
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
                    purSupData.big_id = '';
                }
                getPurSupList();
            },
            error: function (e) {
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

    //获取整机分类列表
    function purSupGetSettingCateListFn() {
        $.ajax({
            url: SERVER_URL + '/product-category/list',
            type: 'GET',
            data: purSupGetSettingCateData,
            dataType: 'json',
            success: function (oE) {
                var datalist = oE.dataList;
                var completeCateListHtml = '<li bigid="0" goodscateid="0" class="Sideslip_list_on"><span>未分类</span></li>';
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
                    purSupData.big_id = '';
                }
                getPurSupList();
            },
            error: function (e) {
            }
        });
    }

    $('#pur_sup_cate_nav_ul li:nth-of-type(1)').die('click').live('click', function () {
        purSupGetGoodsCateListFn();
    });
    $('#pur_sup_cate_nav_ul li:nth-of-type(2)').die('click').live('click', function () {
        purSupGetSettingCateListFn();
    });
    purSupGetGoodsCateListFn();
    purSupGetSettingCateListFn();
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
     }
     });
     })();*/

//****************************供应商列表***********************
    // 获取供应商列表
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
                    $('#pur_supplier_search_total').html(oE.totalcount);
                    //获取datalist
                    var datalist = oE.datalist;
                    if (datalist.length == 0) {
                        $('.pur_supplier_nodata_box').removeClass('none');
                        $('.pur_supplier_handle').addClass('none');
                    } else {
                        $('.pur_supplier_nodata_box').addClass('none');
                        $('.pur_supplier_handle').removeClass('none');
                    }
                    //字符串拼接
                    var purSupHtml = '';
                    $.each(datalist, function (i, v) {
                        //可否删除
                        if (v['relate_status'] == 0) {
                            delBtnStatus = '';
                        } else {
                            delBtnStatus = 'none';
                        }
                        //作废状态判断
                        var sortStatus = '';
                        var sortStatusClass = '';
                        var sortStatusBtn = '';
                        if (v['is_invalid'] == 0) {
                            sortStatus = l_dbl(i + 1);
                            sortStatusClass = '';
                            //可否删除
                            if (v['relate_status'] == 0) {
                                sortStatusBtn = '<button class="but_mix but_exit val_dialog pur_sup_edit_btn" name="cg_ghs_exit">编辑</button><button class="' + invalidBtnStatus + ' but_mix but_void but_r pur_sup_zf_btn">作废</button><button class="' + delBtnStatus + ' but_r but_mix val_dialog sq_gys_Delete" name="cg_gys_Delete">删除</button>';
                            } else {
                                sortStatusBtn = '<button class="but_mix but_exit val_dialog pur_sup_edit_btn" name="cg_ghs_exit">编辑</button><button class="' + invalidBtnStatus + ' but_mix but_void but_r pur_sup_zf_btn">作废</button><button class="' + delBtnStatus + ' but_mix but_grey1">删除</button>';
                            }
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
                                if ($.trim(v2['contact_person']) == '' || v2['contact_person'] == null) return true;
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
                        //地区
                        if (v['province_name'] == '' || v['province_name'] == null) {
                            var province_name = '';
                        } else {
                            var province_name = v['province_name'];
                        }
                        if (v['city_name'] == '' || v['city_name'] == null) {
                            var city_name = '';
                        } else {
                            var city_name = v['city_name'];
                        }
                        if (v['area_name'] == '' || v['area_name'] == null) {
                            var area_name = '';
                        } else {
                            var area_name = v['area_name'];
                        }
                        var pcaHtml = province_name + city_name + area_name
                        purSupHtml += '<tr pursupid="' + v['id'] + '" class="' + sortStatusClass + '">\
                                            <td>' + sortStatus + '</td>\
                                            <td>' + v['name'] + '</td>\
                                            <td>' + v['tel'] + '</td>\
                                            <td>' + pcaHtml.replace(/\s/g, "") + '</td>\
                                            <td><p class="xiangmu_p5">' + v['address'] + '</p></td>\
                                            <td>' + v['comefrom_name'] + '</td>\
                                            <td class="vend_client_contact f_color val_dialog ' + ($.trim(v['contact_person']) == '' ? '' : 'cg_ghs_contact') + '" style="cursor: pointer;" name="purchase_lianxiren">' + v['contact_person'] + contactsMsgBox + '\
                    </td>\
                                            <td class="f_color">' + v['vol'] + '</td>\
                                            <td>' + v['note'] + '</td>\
                                            <td>\
                                            <button class="but_mix r_sidebar_btn but_look pur_sup_look_btn" name="cg_ghs_look">查看</button>' + sortStatusBtn + '\
                                            </td></tr>'
                    });
                    //供应商数据渲染
                    $('#page_64_list_table_body').html(purSupHtml);
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
                }
                //分页
                list_table_render_pagination('.pur_supplier_pagination', purSupData, getPurSupList, oE.totalcount, datalist.length);
                $('#pur_supplier_look_save').trigger('click');
            }
        });
    }

    //分类搜索供应商
    $('.pur_sup_goods_cate_list_ul li').die('click').live('click', function () {
        purSupData.page = 1;
        purSupData.big_id = $(this).attr('bigid');
        purSupData.small_id = $(this).attr('goodscateid');
        getPurSupList();
    });
    $('.pur_sup_setting_cate_list_ul li').die('click').live('click', function () {
        purSupData.page = 1;
        purSupData.big_id = $(this).attr('bigid');
        purSupData.small_id = $(this).attr('goodscateid');
        getPurSupList();
    });
    //地区搜索供应商

    //选择省
    $('.pur_sup_search_province_btn').die('click').live('click', function () {
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
    $('.pur_sup_search_province_ul li').die('click').live('click', function () {
        purSupData.page = 1;
        purSupData.province = $(this).attr('provinceid');
        $('.pur_sup_search_city_btn').val('市').css('color', '#ccc');
        purSupData.city = '';
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
    $('.pur_sup_search_city_ul li').die('click').live('click', function () {
        purSupData.page = 1;
        purSupData.city = $(this).attr('cityid');
        getPurSupList();
    });
    //刷新
    $('.page_64_refresh').die('click').live('click', function () {
        purSupData.is_invalid = 0;
        purSupData.keywords = '';
        purSupData.page = 1;
        purSupData.province = '';
        purSupData.city = '';
        $('.page_64_list_table_search_inp').val('搜索供应商编号／供应商名称').css('color', '#ccc');
        $('.pur_sup_search_province_btn').val('省').css('color', '#ccc');
        $('.pur_sup_search_city_btn').val('市').css('color', '#ccc');
        $('.pur_sup_search_city_ul').html('<li cityid="">市</li>');
        $('#pur_sup_noShow_invalid_btn').attr('checked', true);
        getPurSupList();
    });

    //删除供应商列表
    $('.sq_gys_Delete').die('click').live('click', function () {
        supplierId = $(this).closest('tr').attr('pursupid');
    });
    $('.sq_cg_gys_del_btn').die('click').live('click', function () {
        $.ajax({
            url: SERVER_URL + '/supplier/del',
            type: 'POST',
            data: {
                token: token,
                supplier_id: supplierId
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    $('.tanceng').css('display', 'none').children('.dialog_box').remove();
                    $('#pur_sup_cate_nav_ul li.tabhover2').trigger('click');
                }

            },
            error: function (oE) {
            }
        });
    });
    //不显示作废状态
    $('#pur_sup_noShow_invalid_btn').die('click').live('click', function () {
        if ($(this).attr('checked') == 'checked') {
            purSupData.is_invalid = 0;
        } else {
            purSupData.is_invalid = '';
        }
        getPurSupList();
    });
    //搜索关键字
    $('.page_64_list_table_search').die('click').live('click', function () {
        if ($('.page_64_list_table_search_inp').val() == '搜索供应商编号／供应商名称') {
            alert('请输入搜索关键字');
            purSupData.keywords = '';
        } else {
            purSupData.keywords = $('.page_64_list_table_search_inp').val();
        }
        getPurSupList();
    });
    //作废操作
    $('.pur_sup_zf_btn').die('click').live('click', function () {
        purSupCurrentId = $(this).closest('tr').attr('pursupid');
        $.ajax({
            url: SERVER_URL + '/supplier/invalid',
            type: 'POST',
            data: {
                token: token,
                supplier_id: purSupCurrentId,//供应商id
                uid: uid // 用户id
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    $('#pur_sup_cate_nav_ul li.tabhover2').trigger('click');
                }
            }
        })
    });

//**********************新建供应商***********************************
    //供应商自定义字段和供应商联系人自定义字段
    function purSupFieldFn() {
        //自定义字段
        $.ajax({
            url: SERVER_URL + '/supplier/settinglist',
            type: 'GET',
            data: {
                token: token
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var data = oE.datalist;
                    var supSettingHtml = '';
                    conSettingHtml = '';
                    $.each(data['supplier_info'], function (i, v) {
                        supSettingHtml += '<div class="t_textinput">\
                                                <div class="t_left">' + v['title'] + '</div>\
                                                <div class="t_right clearfix">\
                                                <div class="inline_block" style="width:100%;">\
                                                <input type="text" class="time_input" value="" onfocus="fn_focus(this);" onblur="fn_blur(this);">\
                                                </div>\
                                                </div>\
                                            </div>'
                    });
                    $('.tanceng .pur_sup_create_sup_set_old').html(supSettingHtml);
                    $.each(data['contacts_info'], function (i, v) {
                        conSettingHtml += '<div class="t_textinput">\
                                                <div class="t_left">' + v['title'] + '</div>\
                                                <div class="t_right clearfix">\
                                                <div class="inline_block" style="width:100%;">\
                                                <input type="text" class="time_input" value="" onfocus="fn_focus(this);" onblur="fn_blur(this);">\
                                                </div>\
                                                </div>\
                                            </div>'
                    });
                    $('.tanceng .pur_sup_create_con_set_old').html(conSettingHtml);
                }
            }
        });
    }

    //新建供应商
    var purSupCreateData = {
        token: token,
        supplier_id: 0,// 供应商id大于0就是修改*
        code_sn: "",// 供应商编号*
        name: "",// 供应商名称*
        tel: "",// 公司电话
        province: '',// 省
        city: '',// 市
        area: '',// 区
        address: "",// 地址
        customfields: [], // 自定义字段
        contacts: [],//供应商联系人
        account_name: '',// 开户名称
        account_bank: '',// 开户银行
        account_remittance: '',// 汇款账号
        tax_num: "",//税号
        note: "",// 备注
        comefrom: 0,//供应商来源
        big_id: 1,//供应商大类*
        small_id: ""//供应商小类*
    };
    var conSettingHtml = null;
    $('.pur_sup_create_btn').die('click').live('click', function () {
        purSupCreateData = {
            token: token,
            supplier_id: 0,// 供应商id大于0就是修改*
            code_sn: "",// 供应商编号*
            name: "",// 供应商名称*
            tel: "",// 公司电话
            province: '',// 省
            city: '',// 市
            area: '',// 区
            address: "",// 地址
            customfields: [], // 自定义字段
            contacts: [],//供应商联系人
            account_name: '',// 开户名称
            account_bank: '',// 开户银行
            account_remittance: '',// 汇款账号
            tax_num: "",//税号
            note: "",// 备注
            comefrom: 0,//供应商来源
            big_id: 1,//供应商大类*
            small_id: ""//供应商小类*
        };
        purSupFieldFn();
        //新建时间
        $('.tanceng .supplier_create_supplier_created_at').html(getCurrentDateDay());
        //供应商编号
        $('.tanceng .supplier_create_supplier_code_sn').val(likGetCodeFn('GYS'));
        $.ajax({
            url: SERVER_URL + '/product-category/list',
            type: 'GET',
            data: {
                token: token,
                category: 1 //类型 1.商品 2.整机商品
            },
            dataType: 'json',
            success: function (oE) {
                var datalist = oE.dataList;
                var goodsCateListHtml = '';
                $.each(datalist, function (i, v) {
                    goodsCateListHtml += '<li goodscateid="' + v['id'] + '">' + v['name'] + '</li>';
                });
                $('.pur_sup_create_small_cate_ul').html(goodsCateListHtml);
            },
            error: function (e) {
            }
        });
    });
    //供应商选择分类
    $('.tanceng .pur_sup_create_big_cate_ul li:nth-of-type(1)').die('click').live('click', function () {
        purSupCreateData.big_id = 1;
        $.ajax({
            url: SERVER_URL + '/product-category/list',
            type: 'GET',
            data: {
                token: token,
                category: 1 //类型 1.商品 2.整机商品
            },
            dataType: 'json',
            success: function (oE) {
                var datalist = oE.dataList;
                var goodsCateListHtml = '';
                $.each(datalist, function (i, v) {
                    goodsCateListHtml += '<li goodscateid="' + v['id'] + '">' + v['name'] + '</li>';
                });
                $('.pur_sup_create_small_cate_ul').html(goodsCateListHtml);
            },
            error: function (e) {
            }
        });
    });
    $('.tanceng .pur_sup_create_big_cate_ul li:nth-of-type(2)').die('click').live('click', function () {
        purSupCreateData.big_id = 2;
        $.ajax({
            url: SERVER_URL + '/product-category/list',
            type: 'GET',
            data: {
                token: token,
                category: 2 //类型 1.商品 2.整机商品
            },
            dataType: 'json',
            success: function (oE) {
                var datalist = oE.dataList;
                var goodsCateListHtml = '';
                $.each(datalist, function (i, v) {
                    goodsCateListHtml += '<li goodscateid="' + v['id'] + '">' + v['name'] + '</li>';
                });
                $('.pur_sup_create_small_cate_ul').html(goodsCateListHtml);
            },
            error: function (e) {
            }
        });
        $('.tanceng .pur_sup_create_small_cate_inp').val('请选择');
    });
    $('.tanceng .pur_sup_create_small_cate_ul li').die('click').live('click', function () {
        purSupCreateData.small_id = $(this).attr('goodscateid');
    });
    /*$('#pur_sup_create_big_cate_ul li').die('click').live('click', function () {
     purSupData.category_id = $(this).attr('cussortid');
     getPurSupList();
     });*/

    //新建供应商提交函数
    function purSupCreateSubmitFn() {
        //供应商编号
        purSupCreateData.code_sn = $('.tanceng .supplier_create_supplier_code_sn').val();
        //供应商名称
        if ($('.tanceng .supplier_create_supplier_name').val() == '请填写供货商名称') {
            alert('请填写供货商名称');
            return false;
        } else {
            purSupCreateData.name = $('.tanceng .supplier_create_supplier_name').val();
        }
        //供应商分类
        if ($('.tanceng .pur_sup_create_big_cate_inp').val() == '' || $('.tanceng .pur_sup_create_small_cate_inp').val() == '' || $('.tanceng .pur_sup_create_small_cate_inp').val() == '请选择') {
            alert('请选择供应商分类');
            return false;
        } else {
            purSupCreateData.big_name = $('.tanceng .pur_sup_create_big_cate_inp').val();
            purSupCreateData.small_name = $('.tanceng .pur_sup_create_small_cate_inp').val();
        }
        //公司电话
        if ($('.tanceng .supplier_create_supplier_tel').val() == '请输入公司电话') {
            purSupCreateData.tel = '';
        } else {
            purSupCreateData.tel = $('.tanceng .supplier_create_supplier_tel').val();
        }
        //详细地址
        if ($('.tanceng .supplier_create_supplier_address').val() == '请输入详细地址') {
            purSupCreateData.address = '';
        } else {
            purSupCreateData.address = $('.tanceng .supplier_create_supplier_address').val();
        }
        //自定义字段
        var supField = [];
        $.each($('.tanceng .pur_sup_create_sup_set_old .t_textinput'), function (i, v) {
            supField.push({
                title: $('.tanceng .pur_sup_create_sup_set_old .t_textinput').eq(i).find('.t_left').html(),
                val: $('.tanceng .pur_sup_create_sup_set_old .t_textinput').eq(i).find('.t_right input').val()
            })
        });
        purSupCreateData.customfields = arrayToJson(supField);
        //初期欠款
        /*if ($('.tanceng .supplier_create_supplier_arrears').val() == '请输入初期欠款') {
         purSupCreateData.arrears = '';
         } else {
         purSupCreateData.arrears = $('.tanceng .supplier_create_supplier_arrears').val();
         }*/
        //供应商联系人
        var supContacts = [];
        $.each($('.tanceng .pur_sup_create_contact_add_list .pur_sup_create_contact_add'), function (i, v) {
            var purSupCreateConName = '';
            if ($('.tanceng .pur_sup_create_contact_add_list .pur_sup_create_contact_add').eq(i).find('input.pur_sup_create_con_name').val() == '请输入联系人姓名' && $('.tanceng .pur_sup_create_contact_add_list .pur_sup_create_contact_add').eq(i).find('input.pur_sup_create_con_tel').val() == '请输入联系人电话' && $('.tanceng .pur_sup_create_contact_add_list .pur_sup_create_contact_add').eq(i).find('input.pur_sup_create_con_job').val() == '请输入联系人职务' && $('.tanceng .pur_sup_create_contact_add_list .pur_sup_create_contact_add').eq(i).find('input.pur_sup_create_con_email').val() == '请输入联系人邮箱') {
                return true;
            }
            if ($('.tanceng .pur_sup_create_contact_add_list .pur_sup_create_contact_add').eq(i).find('input.pur_sup_create_con_name').val() == '请输入联系人姓名') {
                purSupCreateConName = '';
            } else {
                purSupCreateConName = $('.tanceng .pur_sup_create_contact_add_list .pur_sup_create_contact_add').eq(i).find('input.pur_sup_create_con_name').val();
            }
            var purSupCreateConTel = '';
            if ($('.tanceng .pur_sup_create_contact_add_list .pur_sup_create_contact_add').eq(i).find('input.pur_sup_create_con_tel').val() == '请输入联系人电话') {
                purSupCreateConTel = '';
            } else {
                purSupCreateConTel = $('.tanceng .pur_sup_create_contact_add_list .pur_sup_create_contact_add').eq(i).find('input.pur_sup_create_con_tel').val();
            }
            var purSupCreateConJob = '';
            if ($('.tanceng .pur_sup_create_contact_add_list .pur_sup_create_contact_add').eq(i).find('input.pur_sup_create_con_job').val() == '请输入联系人职务') {
                purSupCreateConJob = '';
            } else {
                purSupCreateConJob = $('.tanceng .pur_sup_create_contact_add_list .pur_sup_create_contact_add').eq(i).find('input.pur_sup_create_con_job').val();
            }
            var purSupCreateConEmail = '';
            if ($('.tanceng .pur_sup_create_contact_add_list .pur_sup_create_contact_add').eq(i).find('input.pur_sup_create_con_email').val() == '请输入联系人邮箱') {
                purSupCreateConEmail = '';
            } else {
                purSupCreateConEmail = $('.tanceng .pur_sup_create_contact_add').eq(i).find('input.pur_sup_create_con_email').val();
            }

            //联系人自定义字段
            var contField = [];
            $.each($('.tanceng .pur_sup_create_contact_add').eq(i).find('.pur_sup_create_con_set_old .t_textinput'), function (i2, v2) {
                contField.push({
                    title: $('.tanceng .pur_sup_create_contact_add').eq(i).find('.pur_sup_create_con_set_old .t_textinput').eq(i2).find('.t_left').text(),
                    value: $('.tanceng .pur_sup_create_contact_add').eq(i).find('.pur_sup_create_con_set_old .t_textinput').eq(i2).find('.t_right input').val()
                });
            });

            supContacts.push({
                contact_type: $('.tanceng .supplier_create_contact_type').eq(i).val(),
                contact_person: purSupCreateConName,
                contact_tel: purSupCreateConTel,
                jobs: purSupCreateConJob,
                email: purSupCreateConEmail,
                custom_fields: contField
            });
        });
        purSupCreateData.contacts = arrayToJson(supContacts);
        //开户名称
        if ($('.tanceng .supplier_create_supplier_account_name').val() == '请输入开户名称') {
            purSupCreateData.account_name = '';
        } else {
            purSupCreateData.account_name = $('.tanceng .supplier_create_supplier_account_name').val();
        }
        //开户银行
        if ($('.tanceng .supplier_create_supplier_account_bank').val() == '请输入开户银行') {
            purSupCreateData.account_bank = '';
        } else {
            purSupCreateData.account_bank = $('.tanceng .supplier_create_supplier_account_bank').val();
        }
        //汇款账号
        if ($('.tanceng .supplier_create_supplier_account_remittance').val() == '请输入汇款账号') {
            purSupCreateData.account_remittance = '';
        } else {
            purSupCreateData.account_remittance = $('.tanceng .supplier_create_supplier_account_remittance').val();
        }
        //税号
        if ($('.tanceng .supplier_create_supplier_tax_num').val() == '请输入税号') {
            purSupCreateData.tax_num = '';
        } else {
            purSupCreateData.tax_num = $('.tanceng .supplier_create_supplier_tax_num').val();
        }
        //备注
        if ($('.tanceng .supplier_create_supplier_note').val() == '请输入备注') {
            purSupCreateData.note = '';
        } else {
            purSupCreateData.note = $('.tanceng .supplier_create_supplier_note').val();
        }
        $.ajax({
            url: SERVER_URL + '/supplier/add',
            type: 'POST',
            data: purSupCreateData,
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    $('.tanceng').css('display', 'none').children('.dialog_box').remove();
                    $('#pur_sup_cate_nav_ul li.tabhover2').trigger('click');
                }
            }
        });
    }

    $('.tanceng .pur_sup_create_submit').die('click').live('click', function () {
        purSupCreateSubmitFn();
    });


    //高级搜索
    $('.pur_supplier_come_from_ul li').die('click').live('click', function () {
        purSupData.key = '';
    });

    //查看操作
    var purSupCurrentId = null;
    $('.pur_sup_look_btn').die('click').live('click', function () {
        $('.ht_slid_list li:first-of-type').trigger('click');
        purSupCurrentId = $(this).closest('tr').attr('pursupid');
        //获取基本信息
        $.ajax({
            url: SERVER_URL + '/supplier/info',
            type: 'GET',
            data: {
                token: token,
                supplier_id: purSupCurrentId//供应商id
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var data = oE.data;
                    //供应商名称
                    $('.page_64_supplier_detail_supplier_name').html(data['name']);
                    //创建时间
                    $('.page_64_supplier_detail_created_at').html(data['created_at']);
                    //创建时间
                    $('.page_64_supplier_detail_uname').html(data['uname']);
                    //供应商编号
                    $('.page_64_supplier_detail_code_sn').html(data['code_sn']);
                    //供应商分类
                    $('.page_64_supplier_detail_cate').html(data['big_name'] + ' / ' + data['small_name']);
                    //公司电话
                    $('.page_64_supplier_detail_tel').html(data['tel']);
                    //地区
                    var dqHtml = '';
                    if (data['province_name']) {
                        dqHtml += '';
                    }
                    if (data['city_name']) {
                        dqHtml += '';
                    }
                    if (data['area_name']) {
                        dqHtml += '';
                    }
                    $('.page_64_supplier_detail_dq').html(dqHtml);
                    //详细地址
                    $('.page_64_supplier_detail_address').html(data['address']);
                    //供应商来源
                    $('.page_64_supplier_detail_comefrom_name').html(data['comefrom_name']);
                    //自定义字段
                    var fieldHtml = '';
                    if (data['customfields']) {
                        $.each(JSON.parse(data['customfields']), function (i, v) {
                            fieldHtml += '<p class="l-s-x" style="margin-top:16px;">' + v['title'] + '：<span>' + v['val'] + '</span></p>'
                        });
                    }
                    $('.page_64_supplier_detail_field').html(fieldHtml);
                    //供应商联系人信息
                    var contactsHtml = '';
                    $.each(data['contacts'], function (i, v) {
                        var contField = '';
                        if (v['custom_fields']) {
                            $.each(v['custom_fields'], function (i2, v2) {
                                contField += '<p class="l-s-x">' + v2['title'] + '：<span>' + v2['value'] + '</span></p>'
                            });
                        }

                        contactsHtml += '<div style="margin-bottom:24px;">\
                                        <p class="l-s-x xs_kehu_lxr">供应商联系人' + (i + 1) + '：<span>' + v['contact_person'] + '</span></p>\
                                        <p class="l-s-x">类型：<span>' + v['contact_type'] + '</span></p>\
                                        <p class="l-s-x">职务：<span>' + v['jobs'] + '</span></p>\
                                        <p class="l-s-x">电话：<span>' + v['contact_tel'] + '</span></p>\
                                        <p class="l-s-x">邮箱：<span>' + v['email'] + '</span></p>\
                                        ' + contField + '\
                                        </div>'
                    });
                    $('.page_64_supplier_detail_contacts_name').html(contactsHtml);
                    //开户名称
                    $('.page_64_supplier_detail_account_name').html(data['account_name']);
                    //开户银行
                    $('.page_64_supplier_detail_account_bank').html(data['account_bank']);
                    //银行账号
                    $('.page_64_supplier_detail_account_remittance').html(data['account_remittance']);
                    //税号
                    $('.page_64_supplier_detail_tax_num').html(data['tax_num']);
                    //备注
                    $('.page_64_supplier_detail_note').html(data['note'])
                }
            }
        });
        //获取采购报价单
        $.ajax({
            url: SERVER_URL + '/buy-quote/supplierlist',
            type: 'GET',
            data: {
                token: token,
                supplier_id: purSupCurrentId
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    $('.pur_sup_look_buy_quote_num').html(oE.totalcount);
                    var datalist = oE.datalist;
                    var buyQuoteHtml = '';
                    $.each(datalist, function (i, v) {
                        var statusName = '';
                        if (v['status'] == 1) {
                            statusName = '审批中';
                        } else if (v['status'] == 2) {
                            statusName = '未完成';
                        } else if (v['status'] == 3) {
                            statusName = '已完成';
                        }
                        buyQuoteHtml += '<div class="d-r-t-h">\
                                        <p class="l-s-x">采购报价单编号：<span>' + v['code_sn'] + '</span></p>\
                                        <p class="l-s-x">供应商名称：<span>' + v['supplier_name'] + '</span></p>\
                                        <p class="l-s-x">关联采购订单：<span>' + v['buy_order_sn'] + '</span></p>\
                                        <p class="l-s-x">关联借入单：<span>' + v['borrow_code_sn'] + '</span></p>\
                                        <p class="l-s-x">审批状态：<span>' + statusName + '</span></p>\
                                        <p class="l-s-x">审批人：<span>' + v['approver_name'] + '</span></p>\
                                        <p class="l-s-x">商品采购金额(元)：<span>' + v['goods_sum_price'] + '</span></p>\
                                        <p class="l-s-x">税率合计(元)：<span>' + v['goods_sum_tax_money'] + '</span></p>\
                                        <p class="l-s-x">总采购金额(元)：<span>' + v['totals'] + '</span></p>\
                                        </div>'
                    });
                    $('.pur_sup_look_link_buy_quote_list').html(buyQuoteHtml);
                }
            }
        });
        //获取采购订单
        $.ajax({
            url: SERVER_URL + '/buy-order/supplierlist',
            type: 'GET',
            data: {
                token: token,
                supplier_id: purSupCurrentId
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    $('.pur_sup_look_buy_order_num').html(oE.totalcount);
                    var datalist = oE.datalist;
                    var buyOrderHtml = '';
                    $.each(datalist, function (i, v) {
                        var statusName = '';
                        if (v['in_status'] == 1) {
                            statusName = '未入库';
                        } else if (v['in_status'] == 2) {
                            statusName = '部分入库';
                        } else if (v['in_status'] == 3) {
                            statusName = '已入库';
                        }
                        buyOrderHtml += '<div class="d-r-t-h">\
                                        <p class="l-s-x">采购订单编号：<span>' + v['buy_code_sn'] + '</span></p>\
                                        <p class="l-s-x">供应商：<span>' + v['supplier_name'] + '</span></p>\
                                        <p class="l-s-x">入库状态：<span>' + statusName + '</span></p>\
                                        <p class="l-s-x">商品总金额(元)：<span>' + v['goods_sum_price'] + '</span></p>\
                                        <p class="l-s-x">税额合计(元)：<span>' + v['goods_sum_tax_money'] + '</span></p>\
                                        <p class="l-s-x">订单总金额(元)：<span>' + v['totals'] + '</span></p>\
                                        <p class="l-s-x">已付金额(元)：<span>' + v['pay_money'] + '</span></p>\
                                        <p class="l-s-x">已到票金额：<span>' + v['ticket_money'] + '</span></p>\
                                        </div>'
                    });
                    $('.pur_sup_look_link_buy_order_list').html(buyOrderHtml);
                }
            }
        });
        //获取采购退换货
        $.ajax({
            url: SERVER_URL + '/buy-reproduct/supplierlist',
            type: 'GET',
            data: {
                token: token,
                supplier_id: purSupCurrentId
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    $('.pur_sup_look_buy_reproduct_num').html(oE.totalcount);
                    var datalist = oE.datalist;
                    var buyReproductHtml = '';
                    $.each(datalist, function (i, v) {
                        //退换货类型
                        var thetypeName = '';
                        if (v['thetype'] == 1) {
                            thetypeName = '换货';
                        } else if (v['thetype'] == 2) {
                            thetypeName = '退货';
                        }
                        //审批状态
                        var statusName = '';
                        if (v['status'] == 1) {
                            statusName = '审批中';
                        } else if (v['status'] == 2) {
                            statusName = '未通过';
                        } else if (v['status'] == 3) {
                            statusName = '已通过';
                        }
                        //入库状态
                        var inStatusName = '';
                        if (v['in_status'] == 0) {
                            inStatusName = '未入库';
                        } else if (v['in_status'] == 1) {
                            inStatusName = '已入库';
                        }
                        //出库状态
                        var outStatusName = '';
                        if (v['out_status'] == 0) {
                            outStatusName = '未出库';
                        } else if (v['out_status'] == 1) {
                            outStatusName = '已出库';
                        }
                        buyReproductHtml += '<div class="d-r-t-h">\
                                            <p class="l-s-x">退换货编号：<span>' + v['code_sn'] + '</span></p>\
                                            <p class="l-s-x">采购订单编号：<span>' + v['buy_order_sn'] + '</span></p>\
                                            <p class="l-s-x">供应商：<span>' + v['supplier_name'] + '</span></p>\
                                            <p class="l-s-x">退换货类型：<span>' + thetypeName + '</span></p>\
                                            <p class="l-s-x">退款总金额(元)：<span>' + v['totals'] + '</span></p>\
                                            <p class="l-s-x">退换货日期：<span>' + v['service_at'] + '</span></p>\
                                            <p class="l-s-x">审批状态：<span>' + statusName + '</span></p>\
                                            <p class="l-s-x">审批人：<span>' + v['approver_name'] + '</span></p>\
                                            <p class="l-s-x">入库状态：<span>' + inStatusName + '</span></p>\
                                            <p class="l-s-x">出库状态：<span>' + outStatusName + '</span></p>\
                                            </div>'
                    });
                    $('.pur_sup_look_link_buy_reproduct_list').html(buyReproductHtml);
                }
            }
        });
    });

    //供应商设置
    $('.page_64_supplier_config').die('click').live('click', function () {
        $.ajax({
            url: SERVER_URL + '/supplier/settinglist',
            type: 'GET',
            data: {
                token: token
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var data = oE.datalist;
                    var supSettingHtml = '';
                    var conSettingHtml = '';
                    var numTotal = data['supplier_info'].length + data['contacts_info'].length;
                    if(data['supplier_info'] && data['supplier_info'].length > 0){
                        $.each(data['supplier_info'], function (i, v) {
                            supSettingHtml += '<div class="m_bottom_10" style="clear:both">\
                            <div class="t_textinput left" style="width: 75%;">\
                            <div class="t_left"><i class="c_r v_hidden">*</i>自定义</div>\
                            <div class="t_right clearfix">\
                            <div class="inline_block select_mormal select_100 left">\
                            <input type="text" class="c_3 select_input pur_sup_setting_info_field_new" value="' + v['title'] + '"/>\
                            </div>\
                            </div>\
                            </div>\
                            <div class="cg_ghs_setul" style="width:20%">\
                            <button class="but_green page64_gysszAdd" style="margin-left:6px;">+</button>\
                            <button class="but_red page31_khsxDelete" style="margin-left:6px;">-</button>\
                            </div>\
                            </div>';
                            /*supSettingHtml += '<div class="t_textinput" pursupfieldid="' + v['id'] + '">\
                             <div class="t_left"><span class="pur_sup_setting_field_title">' + v['title'] + '</span></div>\
                             <div class="t_right clearfix">\
                             <input type="text" class="time_input inp_noInput" value="" readonly="true">\
                             <span class="t_right_span val_dialogTop cg_gys_delete pur_sup_setting_field_del" style="background:#ff6c60;">删除</span>\
                             </div>\
                             </div>';*/
                        });
                    }else{
                        supSettingHtml += '<div class="m_bottom_10" style="clear:both">\
                     <div class="t_textinput left" style="width: 75%;">\
                     <div class="t_left"><i class="c_r v_hidden">*</i>自定义</div>\
                     <div class="t_right clearfix">\
                     <div class="inline_block select_mormal select_100 left">\
                     <input type="text" class="select_input pur_sup_setting_info_field_new" value="如QQ号" onfocus="fn_focus(this);" onblur="fn_blur(this);"/>\
                     </div>\
                     </div>\
                     </div>\
                     <div class="cg_ghs_setul" style="width:20%">\
                     <button class="but_green page64_gysszAdd" style="margin-left:6px;">+</button>\
                     <button class="but_red page31_khsxDelete" style="margin-left:6px;">-</button>\
                     </div>\
                     </div>';
                    }
                    $('.tanceng .pur_sup_setting_info_field_new_list').html(supSettingHtml);
                    if(data['contacts_info'] && data['contacts_info'].length > 0){
                        $.each(data['contacts_info'], function (i, v) {
                            conSettingHtml += '<div class="m_bottom_10" style="clear:both">\
                            <div class="t_textinput left" style="width: 75%;">\
                            <div class="t_left"><i class="c_r v_hidden">*</i>自定义</div>\
                            <div class="t_right clearfix">\
                            <div class="inline_block select_mormal select_100 left">\
                            <input type="text" class="c_3 select_input pur_sup_setting_info_field_new" value="' + v['title'] + '"/>\
                            </div>\
                            </div>\
                            </div>\
                            <div class="cg_ghs_setul" style="width:20%">\
                            <button class="but_green page64_gysszAdd" style="margin-left:6px;">+</button>\
                            <button class="but_red page31_khsxDelete" style="margin-left:6px;">-</button>\
                            </div>\
                            </div>';
                            /*conSettingHtml += '<div class="t_textinput" pursupfieldid="' + v['id'] + '">\
                             <div class="t_left"><span class="pur_sup_setting_field_title">' + v['title'] + '</span></div>\
                             <div class="t_right clearfix">\
                             <input type="text" class="time_input inp_noInput" value="" readonly="true">\
                             <span class="t_right_span val_dialogTop cg_gys_delete pur_sup_setting_field_del" style="background:#ff6c60;">删除</span>\
                             </div>\
                             </div>'*/
                        });
                    }else{
                        conSettingHtml += '<div class="m_bottom_10" style="clear:both">\
                         <div class="t_textinput left" style="width: 75%;">\
                         <div class="t_left"><i class="c_r v_hidden">*</i>自定义</div>\
                         <div class="t_right clearfix">\
                         <div class="inline_block select_mormal select_100 left">\
                         <input type="text" class="select_input pur_sup_setting_info_field_new" value="如QQ号" onfocus="fn_focus(this);" onblur="fn_blur(this);"/>\
                         </div>\
                         </div>\
                         </div>\
                         <div class="cg_ghs_setul" style="width:20%">\
                         <button class="but_green page64_gysszAdd" style="margin-left:6px;">+</button>\
                         <button class="but_red page31_khsxDelete" style="margin-left:6px;">-</button>\
                         </div>\
                         </div>';
                    }
                    $('.tanceng .pur_sup_setting_cont_field_new_list').html(conSettingHtml);
                    $('.pur_sup_setting_dialog').css('minHeight', 200 + 45 * numTotal);
                }
            }
        });
    });
    $('.tanceng .pur_sup_setting_save_btn').die('click').live('click', function () {
        var supSettingFieldNew = [];
        var $supSetting = $('.tanceng .pur_sup_setting_info_field_new_list .m_bottom_10');
        $.each($supSetting, function (i, v) {
            if ($supSetting.eq(i).find('input.pur_sup_setting_info_field_new').val() != '如QQ号') {
                supSettingFieldNew.push($supSetting.eq(i).find('input.pur_sup_setting_info_field_new').val());
            }
        });
        var conSettingFieldNew = [];
        var $conSetting = $('.tanceng .pur_sup_setting_cont_field_new_list .m_bottom_10');
        $.each($conSetting, function (i, v) {
            if ($conSetting.eq(i).find('input.pur_sup_setting_info_field_new').val() != '如QQ号') {
                conSettingFieldNew.push($conSetting.eq(i).find('input.pur_sup_setting_info_field_new').val());
            }
        });
        $.ajax({
            url: SERVER_URL + '/supplier/setting',
            type: 'POST',
            data: {
                token: token,
                supplier_info: supSettingFieldNew,
                contacts_info: conSettingFieldNew
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                }
            }
        });
        $(this).closest('.dialog_box').remove();
        $('.tanceng').css('display', 'none');
    });
    //删除供应商设置自定义字段
    $('.tanceng .pur_sup_setting_field_del').die('click').live('click', function () {
        var supFieldDelId = $(this).closest('.t_textinput').attr('pursupfieldid');
        $.ajax({
            url: SERVER_URL + '/supplier/settingdel',
            type: 'GET',
            data: {
                token: token,
                id: supFieldDelId
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                }
            }
        });
    })
    //供应商分类设置
    /*$('.page_64_supplier_cate_config').die('click').live('click', function () {
     getPurCategoryListSort();
     $('.tanceng .pur_categorylist_dialog li').die('click').live('click', function () {
     $(this).closest('.list_box').find('button').removeClass('grey').removeAttr('disabled');
     });

     });*/
    $('.page_64_supplier_cate_config').die('click').live('click', function () {
        getPurCategoryListSort();
        $('.tanceng .left_all').die('click').live('click', function () {
            $(this).addClass('on');
            $(this).next('i').find('li').removeClass('on');
            $(this).prepend('<span class="list_check"><em class="on"></em></span>')
            $(this).next('i').find('li').children('.list_check').remove();
            //设置 - 供应商分类设置 - 点所有分类按钮不可点
            $(this).closest('.list_box').find('button.btn_disabled').addClass('grey').addAttr('disabled');
        })
    });
    // 设置>供应商分类设置
    $('.tanceng .pur_categorylist_dialog li').die('click').live('click', function () {
        $(this).closest('.list_box').find('button').removeClass('grey').removeAttr('disabled');
    });
    // 设置>供应商分类设置>新建分类
    $('.tanceng .pur_sup_create_choose_parent_category_save').die('click').live('click', function () {
        //新建分类
        $('.tanceng .pur_sup_set_create_cate_pcate_inp').val($('.tanceng li.on span.list_msg').html());
        $('#pur_sup_set_create_cate_pcateid_hidden').val($('.tanceng li.on').attr('cussortid'));
        //编辑分类
        $('.tanceng .pur_sup_set_cateP_edit_inp').val($('.tanceng li.on span.list_msg').html());
        $('#pur_sup_set_edit_cate_pcateid_hidden').val($('.tanceng li.on').attr('cussortid'));
        $(this).closest('.dialog_box').remove();
    })
    $('.tanceng .pur_sup_set_create_cate_save').die('click').live('click', function () {
        if ($('.tanceng .pur_sup_set_create_cate_inp').val() == '请填写分类名称') {
            alert('请填写分类名称');
            return false;
        } else if ($('.tanceng .pur_sup_set_create_cate_pcate_inp').val() == '' || $('#pur_sup_set_create_cate_pcateid_hidden').val() == '') {
            alert('请选择上级分类');
            return false;
        } else {
            $.ajax({
                type: "post",
                url: SERVER_URL + "/supplier/categoryadd",
                async: true,
                data: {
                    token: token,
                    name: $('.tanceng .pur_sup_set_create_cate_inp').val(),
                    pid: $('#pur_sup_set_create_cate_pcateid_hidden').val()
                },
                dataType: 'json',
                success: function (oE) {
                    if (oE.code == 0) {
                        alert('新建成功');
                        getPurCategoryListSort();
                        $('.tanceng .dialog_box').remove();
                    }
                }
            });
        }
    })
    // 设置>供应商分类设置>编辑弹框>客户名称
    $('.tanceng .edit_supplier_cate').die('click').live('click', function () {
        $('.tanceng .pur_sup_set_cate_edit_inp').val($('.tanceng li.on span.list_msg').html());
        $('#pur_sup_set_edit_category_old').val($('.tanceng li.on').attr('cussortid'));
    })
    // 编辑分类 - 提交
    $('.tanceng .pur_sup_setting_edit_cate_save').die('click').live('click', function () {
        $.ajax({
            type: "post",
            url: SERVER_URL + "/supplier/categoryupdate",
            async: true,
            data: {
                token: token,
                id: $('#pur_sup_set_edit_category_old').val(),
                name: $('.tanceng .pur_sup_set_cate_edit_inp').val(),
                pid: $('#pur_sup_set_edit_cate_pcateid_hidden').val()
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    alert('编辑成功');
                    getPurCategoryListSort();
                }
            }
        });
        $(this).closest('.dialog_box').remove();
    });
    // 采购>供应商分类设置>删除分类
    $('.tanceng .del_supplier_cate').die('click').live('click', function () {
        $('#cate_del').val($('.tanceng li.on').attr('cussortid'))
    })
    $('.tanceng .cate_del_submit').die('click').live('click', function () {
        $.ajax({
            type: "post",
            url: SERVER_URL + "/supplier/categorydel",
            async: true,
            data: {
                token: token,
                id: $('#cate_del').val()
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    getPurCategoryListSort();
                }
            }
        });
        $(this).closest('.dialog_box').remove();
    });
    //采购>供应商分类设置>分类上移
    $('.sort_supplier_cate_up').die('click').live('click', function () {
        $.ajax({
            type: "GET",
            url: SERVER_URL + "/supplier/categorysort",
            async: true,
            data: {
                token: token,
                id: $('.tanceng li.on').attr('cussortid'),
                action: 'up'
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    getPurCategoryListSort();
                }
            }
        });
    });
    //采购>供应商分类设置>分类下移
    $('.sort_supplier_cate_down').die('click').live('click', function () {
        $.ajax({
            type: "GET",
            url: SERVER_URL + "/supplier/categorysort",
            async: true,
            data: {
                token: token,
                id: $('.tanceng li.on').attr('cussortid'),
                action: 'down'
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    getPurCategoryListSort();
                }
            }
        });
    });
    //供应商添加
    $(".worksp_addccBtn").die('click').live("click", function () {
        var worksp_addcchtml = '<div class="pur_sup_create_contact_add">\
            <div class="work_sp_fqsp_h3">\
            <h3 class="inline_block"><p>供应商联系人<span class="c_r">(<span class="pur_sup_create_contact_num" style="margin-left:0;"></span>)</span></p></h3><div class="work_fqsp_gb_img"> <img src="static/images/work_sp_gb.png" class="work_sp_gb"> </div>\
            </div>\
            <div class="t_textinput">\
            <div class="t_left t_left_conrow"><i class="c_r v_hidden">*</i>联系人类型</div>\
            <div class="t_right clearfix">\
            <div class="inline_block select_mormal left select_100">\
            <input type="text" class="select_input supplier_create_contact_type" value="销售">\
            <i></i>\
            <ul class="select_list supplier_create_contact_type_list" style="display: none;">\
            <li>销售</li>\
            <li>财务</li>\
            <li>发货人</li>\
            </ul>\
            </div>\
            </div>\
            </div>\
            <div class="t_textinput">\
            <div class="t_left">联系人</div>\
            <div class="t_right"><input type="text" class="time_input pur_sup_create_con_name" value="请输入联系人姓名" onfocus="fn_focus(this);" onblur="fn_blur(this);"/></div>\
            </div>\
            <div class="t_textinput">\
            <div class="t_left t_left_conrow">联系人电话</div>\
            <div class="t_right"><input type="text" class="time_input pur_sup_create_con_tel" data-default_value="请输入联系人电话" value="请输入联系人电话" onfocus="fn_focus(this);" onblur="fn_blur(this);"></div>\
            </div>\
            <div class="t_textinput">\
            <div class="t_left ">职务</div>\
            <div class="t_right"><input type="text" class="time_input pur_sup_create_con_job" data-default_value="请输入联系人职务" value="请输入联系人职务" onfocus="fn_focus(this);" onblur="fn_blur(this);"></div>\
            </div>\
            <div class="t_textinput">\
            <div class="t_left ">邮箱</div>\
            <div class="t_right"><input type="text" class="time_input pur_sup_create_con_email" data-default_value="请输入联系人邮箱" value="请输入联系人邮箱" onfocus="fn_focus(this);" onblur="fn_blur(this);"></div>\
            </div><div class="pur_sup_create_con_set_old">' + conSettingHtml + '</div></div>';
        $(this).parent().prev().append(worksp_addcchtml);
        $.each($('.tanceng .pur_sup_create_contact_add_list .pur_sup_create_contact_add'), function (i, v) {
            $('.tanceng span.pur_sup_create_contact_num').eq(i).html(i + 1);
        })
    });
    //删除当前新增元素
    $(".work_sp_gb").die('click').live("click", function () {
        $(this).closest('.pur_sup_create_contact_add').remove();
        $.each($('.tanceng .pur_sup_create_contact_add'), function (i, v) {
            $('.tanceng span.pur_sup_create_contact_num').eq(i).html(i + 1);
        })
    });

    //判断省市县是否可以点击函数
    function inputDisabledStatus() {
        if ($('.supplier_create_supplier_city_name').attr('disabled') == 'disabled') {
            $('.area_list_city').css('visibility', 'hidden');
        } else {
            $('.area_list_city').css('visibility', '');
        }
        if ($('.supplier_create_supplier_area_name').attr('disabled') == 'disabled') {
            $('.area_list_area').css('visibility', 'hidden');
        } else {
            $('.area_list_area').css('visibility', '');
        }
    }

    inputDisabledStatus();
    //选择省市区
    $('.tanceng .supplier_create_supplier_province_name').die('click').live('click', function () {
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
                    var areaListProvince = '';
                    $.each(datalist, function (i, v) {
                        areaListProvince += '<li provinceid="' + v['provinceID'] + '">' + v['province'] + '</li>'
                    });
                    $('.tanceng .area_list_province').html(areaListProvince);
                }
            }
        })
    });
    //选择省
    $('.tanceng .area_list_province li').die('click').live('click', function () {
        var provinceId = $(this).attr('provinceid');
        purSupCreateData.province = provinceId;
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
        $('.tanceng .supplier_create_supplier_city_name').val('市').attr('disabled', null);
        $('.tanceng .supplier_create_supplier_area_name').val('县/区').attr('disabled', 'disabled');
        inputDisabledStatus();
    });
    //选择市
    $('.tanceng .area_list_city li').die('click').live('click', function () {
        var cityId = $(this).attr('cityid');
        purSupCreateData.city = cityId;
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
        $('.tanceng .supplier_create_supplier_area_name').val('县/区').attr('disabled', null);
        inputDisabledStatus();
    });
    //选择县
    $('.tanceng .area_list_area li').die('click').live('click', function () {
        var areaId = $(this).attr('areaid');
        purSupCreateData.area = areaId;
    });
    //供应商来源
    $('.tanceng .supplier_create_supplier_comeform_name_list li').die('click').live('click', function () {
        purSupCreateData.comefrom = $(this).index();
    });

    //编辑供应商
    $('.pur_sup_edit_btn').die('click').live('click', function () {
        purSupCurrentId = $(this).closest('tr').attr('pursupid');
        purSupCreateData.supplier_id = purSupCurrentId;
        purSupFieldFn();
        $.ajax({
            url: SERVER_URL + '/supplier/info',
            type: 'GET',
            data: {
                token: token,
                supplier_id: purSupCurrentId
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var data = oE.data;
                    //创建时间
                    $('.tanceng .supplier_create_supplier_created_at').html(data['created_at']);
                    //供应商编号
                    $('.tanceng .supplier_create_supplier_code_sn').val(data['code_sn']);
                    //供应商分类
                    $('.tanceng .pur_sup_create_big_cate_inp').val(data['big_name']);
                    purSupCreateData.big_id = data['big_id'];
                    purSupCreateData.big_name = data['big_name'];
                    $('.tanceng .pur_sup_create_small_cate_inp').val(data['small_name']);
                    purSupCreateData.small_id = data['small_id'];
                    purSupCreateData.small_name = data['small_name'];
                    //供应商名称
                    $('.tanceng .supplier_create_supplier_name').val(data['name']);
                    //供应商来源
                    $('.tanceng .supplier_create_supplier_comefrom_name').val(data['comefrom_name']);
                    purSupCreateData.comefrom = data['comefrom'];
                    //公司电话
                    $('.tanceng .supplier_create_supplier_tel').val(data['tel']);
                    //地区
                    $('.tanceng .supplier_create_supplier_province_name').val(data['province_name']);
                    $('.tanceng .supplier_create_supplier_city_name').val(data['city_name']);
                    $('.tanceng .supplier_create_supplier_area_name').val(data['area_name']);
                    purSupCreateData.province = data['province'];
                    purSupCreateData.city = data['city'];
                    purSupCreateData.area = data['area'];
                    //地址
                    $('.tanceng .supplier_create_supplier_address').val(data['address']);
                    //自定义字段
                    var fieldOldHtml = '';
                    var fieldContOldHtml = '';
                    $.ajax({
                        url: SERVER_URL + '/supplier/settinglist',
                        type: 'GET',
                        data: {
                            token: token
                        },
                        async: false,
                        dataType: 'json',
                        success: function (oE) {
                            if (oE.code == 0) {
                                var data = oE.datalist;
                                $.each(data['supplier_info'], function (i, v) {
                                    fieldOldHtml += '<div class="t_textinput">\
                                                <div class="t_left">' + v['title'] + '</div>\
                                                <div class="t_right clearfix">\
                                                <div class="inline_block" style="width:100%;">\
                                                <input type="text" class="time_input" value="" onfocus="fn_focus(this);" onblur="fn_blur(this);">\
                                                </div>\
                                                </div>\
                                            </div>'
                                });
                                $.each(data['contacts_info'], function (i, v) {
                                    fieldContOldHtml += '<div class="t_textinput">\
                                                <div class="t_left">' + v['title'] + '</div>\
                                                <div class="t_right clearfix">\
                                                <div class="inline_block" style="width:100%;">\
                                                <input type="text" class="time_input" value="" onfocus="fn_focus(this);" onblur="fn_blur(this);">\
                                                </div>\
                                                </div>\
                                            </div>'
                                });
                            }
                        }
                    });
                    var fieldHtml = '';
                    if (data['customfields']) {
                        $.each(JSON.parse(data['customfields']), function (i, v) {
                            fieldHtml += '<div class="t_textinput"><div class="t_left">' + v['title'] + '</div><div class="t_right clearfix"><div class="inline_block" style="width:100%;"><input type="text" class="c_3 time_input" value="' + v['val'] + '" onfocus="fn_focus(this);" onblur="fn_blur(this);"></div></div></div>'
                        });
                    } else {
                        fieldHtml = fieldOldHtml;
                    }
                    $('.tanceng .pur_sup_create_sup_set_old').html(fieldHtml);
                    //供应商联系人信息
                    var purSupEditConHtml = '';
                    if (data['contacts'].length > 0) {
                        $.each(data['contacts'], function (i, v) {
                            //自定义字段
                            var contField = '';
                            if (v['custom_fields']) {
                                $.each(v['custom_fields'], function (i2, v2) {
                                    contField += '<div class="t_textinput">\
                                        <div class="t_left">' + v2['title'] + '</div>\
                                        <div class="t_right"><input type="text" class="c_3 time_input pur_sup_create_con_name" value="' + v2['value'] + '"/></div>\
                                        </div>'
                                });
                            } else {
                                contField = fieldContOldHtml;
                            }
                            purSupEditConHtml += '<div class="pur_sup_create_contact_add">\
                            <div class="work_sp_fqsp_h3"><div class="work_fqsp_gb_img" style="display:' + (i == 0 ? 'none' : '') + '"> <img src="static/images/work_sp_gb.png" class="work_sp_gb"> </div>\
                            <h3 class="inline_block"><p>供应商联系人<span class="c_r">(<span class="pur_sup_create_contact_num" style="margin-left:0;">' + (i + 1) + '</span>)</span></p></h3>\
                            </div>\
                            <div class="t_textinput">\
                            <div class="t_left t_left_conrow"><i class="c_r v_hidden">*</i>联系人类型</div>\
                            <div class="t_right clearfix">\
                            <div class="inline_block select_mormal left select_100">\
                            <input type="text" class="c_3 select_input supplier_create_contact_type" value="' + v['contact_type'] + '">\
                            <i></i>\
                            <ul class="select_list supplier_create_contact_type_list sbar" style="display: none;">\
                            <li>销售</li>\
                            <li>财务</li>\
                            <li>发货人</li>\
                            </ul>\
                            </div>\
                            </div>\
                            </div>\
                            <div class="t_textinput">\
                            <div class="t_left">联系人</div>\
                            <div class="t_right"><input type="text" class="c_3 time_input pur_sup_create_con_name" value="' + v['contact_person'] + '"/></div>\
                            </div>\
                            <div class="t_textinput">\
                            <div class="t_left t_left_conrow">联系人电话</div>\
                            <div class="t_right"><input type="text" class="c_3 time_input pur_sup_create_con_tel" data-default_value="请输入联系人电话" value="' + v['contact_tel'] + '"></div>\
                            </div>\
                            <div class="t_textinput">\
                            <div class="t_left ">职务</div>\
                            <div class="t_right"><input type="text" class="c_3 time_input pur_sup_create_con_job" data-default_value="请输入联系人职务" value="' + v['jobs'] + '"></div>\
                            </div>\
                            <div class="t_textinput">\
                            <div class="t_left ">邮箱</div>\
                            <div class="t_right"><input type="text" class="c_3 time_input pur_sup_create_con_email" data-default_value="请输入联系人邮箱" value="' + v['email'] + '"></div>\
                            </div>\
                            <div class="pur_sup_create_con_set_old">' + contField + '</div>\
                            </div>';
                        });
                    } else {
                        purSupEditConHtml = '<div class="pur_sup_create_contact_add">\
                                            <div class="work_sp_fqsp_h3">\
                                            <h3 class="inline_block"><p>供应商联系人<span class="c_r">(<span class="pur_sup_create_contact_num" style="margin-left:0;">1</span>)</span></p></h3>\
                                            <div class="work_fqsp_gb_img none work_sp_gb"><i></i></div>\
                                            </div>\
                                            <div class="t_textinput">\
                                            <div class="t_left t_left_conrow"><i class="c_r v_hidden">*</i>联系人类型</div>\
                                            <div class="t_right clearfix">\
                                            <div class="inline_block select_mormal left select_100">\
                                            <input type="text" class="select_input supplier_create_contact_type" value="销售">\
                                            <i></i>\
                                            <ul class="select_list supplier_create_contact_type_list sbar" style="display: none;">\
                                            <li>销售</li>\
                                            <li>财务</li>\
                                            <li>发货人</li>\
                                            </ul>\
                                            </div>\
                                            </div>\
                                            </div>\
                                            <div class="t_textinput">\
                                            <div class="t_left"><i class="c_r v_hidden">*</i>联系人</div>\
                                            <div class="t_right"><input type="text" class="time_input pur_sup_create_con_name" value="请输入联系人姓名" onfocus="fn_focus(this);" onblur="fn_blur(this);"></div>\
                                            </div>\
                                            <div class="t_textinput">\
                                            <div class="t_left t_left_conrow"><i class="c_r v_hidden">*</i>联系人电话</div>\
                                            <div class="t_right"><input type="text" class="time_input pur_sup_create_con_tel" data-default_value="请输入联系人电话" value="请输入联系人电话" onfocus="fn_focus(this);" onblur="fn_blur(this);"></div>\
                                            </div>\
                                            <div class="t_textinput">\
                                            <div class="t_left "><i class="c_r v_hidden">*</i>职务</div>\
                                            <div class="t_right"><input type="text" class="time_input pur_sup_create_con_job" data-default_value="请输入联系人职务" value="请输入联系人职务" onfocus="fn_focus(this);" onblur="fn_blur(this);"></div>\
                                            </div>\
                                            <div class="t_textinput">\
                                            <div class="t_left "><i class="c_r v_hidden">*</i>邮箱</div>\
                                            <div class="t_right"><input type="text" class="time_input pur_sup_create_con_email" data-default_value="请输入联系人邮箱" value="请输入联系人邮箱" onfocus="fn_focus(this);" onblur="fn_blur(this);"></div>\
                                            </div>\
                                            <div class="pur_sup_create_con_set_old"></div>\
                                            </div>';
                        purSupFieldFn();
                    }
                    $('.tanceng .pur_sup_create_contact_add_list').html(purSupEditConHtml);
                    //开户名称
                    $('.tanceng .supplier_create_supplier_account_name').val(data['account_name']);
                    //开户银行
                    $('.tanceng .supplier_create_supplier_account_bank').val(data['account_bank']);
                    //汇款账号
                    $('.tanceng .supplier_create_supplier_account_remittance').val(data['account_remittance']);
                    //税号
                    $('.tanceng .supplier_create_supplier_tax_num').val(data['tax_num']);
                    //备注
                    $('.tanceng .supplier_create_supplier_note').val(data['note'])
                }
            }
        });
    });

});
