$(function () {
    //	补零函数
    function l_dbl(x) {
        return x < 10 ? '0' + x : x
    }

    // json数组去重
    function getJsonArr(arr) {
        //定义需要的空数组
        var newArr = [];
        //定义转换字符串后的数组
        var newStringArr = [];
        $.each(arr, function (i, v) {
            var sArr = JSON.stringify(v);
            if (sArr.indexOf('undefined') == -1 && sArr.indexOf('null') == -1 && $.inArray(sArr, newStringArr) == -1) {
                // 根据字符串数组push对象
                newStringArr.push(sArr);
                newArr.push(v)
            }else{
                return true;
            }
        });
        return newArr;
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

    // 去掉字符串首尾空格
    function strTrim(str) {
        return str.replace(/^\s+|\s+$/g, "");
    }

    var token, page, num, keywords, type;
    token = Admin.get_token();
    //token = '2017052516045457073-1-1';
    uid = Admin.get_uid();
    uname = loginUserInfo.username;

    //权限部分
    if (loginUserInfo['company_admin'] != 1) {
        var proCatePowerList = loginUserInfo['powerUrls'];
        var proCateAdd = 'product-category/add';

        //新建基本商品 / 编辑
        if ($.inArray(proCateAdd, proCatePowerList) == -1) {
            $('.pro_cate_add_edit_btn').hide();
        } else {
            $('.pro_cate_add_edit_btn').show();
        }
    }

    //选择查看项
    var proGoodsNoListLookAbledField = [
        {'index': null, 'field': '基本单位'},
        {'index': null, 'field': '备注'}
    ];

    //刷新
    $('.page_51_refresh').live('click', function () {
        $('.pro_category_nav_ul li.tabhover2').trigger('click');
    });

    //商品分类
    var proCategoryData = {
        token: token,
        category: 1, //类型 1.商品 2.整机商品
        name: '', // 分类名称
        detail: 1 // 是否获取各类型的数量总数 0 否 1 是
    };
    getProCategoryGoodsListFn();
    //获取商品分类列表函数
    function getProCategoryGoodsListFn() {
        proCategoryData.category = 1;
        $.ajax({
            url: SERVER_URL + '/product-category/list',
            type: 'GET',
            data: proCategoryData,
            async: false,
            dataType: 'json',
            success: function (oE) {
                var datalist = oE.dataList;
                var goodsCateListHtml = '';
                $.each(datalist, function (i, v) {
                    goodsCateListHtml += '<li goodscateid="' + v['id'] + '" class="' + (i == 0 ? 'Sideslip_list_on' : '') + '" goodsnum="' + v['num'] + '" goodssort="' + v['sort'] + '"><span>' + v['name'] + '</span></li>';
                });
                $('.pro_category_goods_list_ul').html(goodsCateListHtml);
                if ($('.pro_category_goods_list_ul .Sideslip_list_on').attr('goodsnum') == 0) {
                    $('.pro_category_del_btn').attr('name', 'sp_sort_delete');
                } else {
                    $('.pro_category_del_btn').attr('name', 'sp_sort_delete_no');
                }
            },
            error: function (e) {
            }
        });
        //proCateUpDownBtnDisFn();
    }

    //获取整机商品分类列表函数
    function getProCategorySettingListFn() {
        proCategoryData.category = 2;
        $.ajax({
            url: SERVER_URL + '/product-category/list',
            type: 'GET',
            data: proCategoryData,
            dataType: 'json',
            success: function (oE) {
                var datalist = oE.dataList;
                var goodsCateListHtml = '';
                $.each(datalist, function (i, v) {
                    goodsCateListHtml += '<li goodscateid="' + v['id'] + '" class="' + (i == 0 ? 'Sideslip_list_on' : '') + '" goodsnum="' + v['num'] + '" goodssort="' + v['sort'] + '"><span>' + v['name'] + '</span></li>';
                });
                $('.pro_category_setting_list_ul').html(goodsCateListHtml);
                if ($('.pro_category_setting_list_ul .Sideslip_list_on').attr('goodsnum') == 0) {
                    $('.pro_category_setting_del_btn').attr('name', 'sp_sort_delete');
                } else {
                    $('.pro_category_setting_del_btn').attr('name', 'sp_sort_delete_no');
                }
            },
            error: function (e) {
            }
        });
    }

    //切换商品分类
    $('.pro_category_nav_ul li:nth-of-type(1)').die('click').live('click', function () {
        getProCategoryGoodsListFn();
    });
    //切换整机商品分类
    $('.pro_category_nav_ul li:nth-of-type(2)').die('click').live('click', function () {
        getProCategorySettingListFn();
    });
    //整机商品添加分类
    $('.pro_category_create_setting_submit_btn').die('click').live('click', function () {
        var $_this = $(this);
        if ($('.tanceng .pro_category_create_setting_inp').val() == '请输入名称') {
            alert('请输入整机名称');
            return false;
        } else {
            $.ajax({
                url: SERVER_URL + '/product-category/add',
                type: 'POST',
                data: {
                    token: token,
                    name: $('.tanceng .pro_category_create_setting_inp').val(),
                    category: 2,
                    id: ''
                },
                dataType: 'json',
                success: function (oE) {
                    if (oE.code == 0) {
                        $_this.closest('.dialog_box').remove();
                        $('.tanceng').css('display', 'none');
                        getProCategorySettingListFn();
                    }
                },
                error: function (e) {
                }
            });
        }
    });
    //选中一条分类
    $('.sp_sort_con li').die('click').live('click', function () {
        if ($(this).attr('goodsnum') == 0) {
            $('.pro_category_del_btn').attr('name', 'sp_sort_delete');
            $('.pro_category_setting_del_btn').attr('name', 'sp_sort_delete');
        } else {
            $('.pro_category_del_btn').attr('name', 'sp_sort_delete_no');
            $('.pro_category_setting_del_btn').attr('name', 'sp_sort_delete_no');
        }
    });
    //定义当前分类id
    var curOperateCateId = null;
    //删除商品分类
    $('.pro_category_del_btn').die('click').live('click', function () {
        curOperateCateId = $('.pro_category_goods_list_ul .Sideslip_list_on').attr('goodscateid');
    });
    //删除整机商品分类
    $('.pro_category_setting_del_btn').die('click').live('click', function () {
        curOperateCateId = $('.pro_category_setting_list_ul .Sideslip_list_on').attr('goodscateid');
    });
    //删除商品分类 - 确定
    $('.pro_category_del_submit_btn').die('click').live('click', function () {
        proCategoryDelFn();
    });
    //删除分类函数
    function proCategoryDelFn() {
        $.ajax({
            url: SERVER_URL + '/product-category/deldata',
            type: 'POST',
            data: {
                token: token,
                id: curOperateCateId
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    $('.tanceng').css('display', 'none').find('div').remove();
                    getProCategoryGoodsListFn();
                    getProCategorySettingListFn();
                }
            },
            error: function (e) {
            }
        });
    }

    //整机商品分类 - 编辑分类
    $('.pro_category_setting_edit_btn').die('click').live('click', function () {
        curOperateCateId = $('.pro_category_setting_list_ul .Sideslip_list_on').attr('goodscateid');
        $('.tanceng .pro_category_setting_edit_inp').val($('.pro_category_setting_list_ul li.Sideslip_list_on span').html());
    });
    //整机商品分类 - 编辑分类 - 提交
    $('.pro_category_setting_edit_submit_btn').die('click').live('click', function () {
        var $_this = $(this);
        if ($('.tanceng .pro_category_setting_edit_inp').val() == '') {
            alert('请输入整机名称');
            return false;
        } else {
            $.ajax({
                url: SERVER_URL + '/product-category/add',
                type: 'POST',
                data: {
                    token: token,
                    name: $('.tanceng .pro_category_setting_edit_inp').val(),
                    category: 2,
                    id: curOperateCateId
                },
                dataType: 'json',
                success: function (oE) {
                    if (oE.code == 0) {
                        $_this.closest('.dialog_box').remove();
                        $('.tanceng').css('display', 'none');
                        getProCategorySettingListFn();
                    }
                },
                error: function (e) {
                }
            });
        }
    });
    //添加基本商品分类参数
    var proCategoryGoodsData = {
        token: token,
        name: '',
        category: 1,
        attr_info: [],
        id: 0
    };

    //添加选项 - 保存
    $('.goods_sort_new_save').die('click').live('click', function () {
        $.each($('.tanceng .pro_category_goods_add_option_list>div'), function (i, v) {
            if ($('.tanceng .pro_category_goods_add_option_list>div').eq(i).find('input:text').val() == '输入名称') {
                return true;
            } else {
                $('.tanceng .cur_worksp_addbx ul.inp_add_list_3').append('<li attroptionid="0">' + $('.tanceng .pro_category_goods_add_option_list>div').eq(i).find('input:text').val() + ' <i></i></li>')
            }
        });
        $(this).closest('.dialog_box').remove();
        if ($('.tanceng .cur_worksp_addbx ul.inp_add_list_3 li').length > 0) {
            $('.tanceng .cur_worksp_addbx .goods_add_select_box').removeClass('none');
        }
    });

    //    删除商品属性的选项
    $('.inp_add_list_3 li i').die('click').live('click', function () {
        if ($(this).closest('ul').find('li').length == 1) {
            $(this).closest('.goods_add_select_box').addClass('none');
        }
        $(this).closest('li').remove();
    });
    $('.page_51_goods_cate_add_btn').live('click', function () {
        proCategoryGoodsData = {
            token: token,
            name: '',
            category: 1,
            attr_info: [],
            id: 0
        };
    });
    //添加基本商品分类保存
    $('.tanceng .pro_category_goods_create_submit_btn').die('click').live('click', function () {
        var attrInfArr = [];
        if ($('.tanceng .pro_category_goods_create_name').val() == '请输入名称') {
            alert('请输入分类名称');
            return false;
        } else {
            proCategoryGoodsData.name = $('.tanceng .pro_category_goods_create_name').val();
        }
        var requiredStatus = 0;
        $.each($('.tanceng .pro_category_tjfl_dialog_box .worksp_addbx'), function (i, v) {
            if ($('.tanceng .pro_category_tjfl_dialog_box .worksp_addbx').eq(i).find('input:text').val() == '请输入字段') {
                return true;
            } else {
                if ($('.tanceng .pro_category_tjfl_dialog_box .worksp_addbx').eq(i).find('input:checkbox').attr('checked')) {
                    requiredStatus = 1;
                } else {
                    requiredStatus = 0;
                }
                if ($('.tanceng .pro_category_tjfl_dialog_box .worksp_addbx').eq(i).find('.goods_add_select_box_con li').length != 0) {
                    $.each($('.tanceng .pro_category_tjfl_dialog_box .worksp_addbx').eq(i).find('.goods_add_select_box_con li'), function (i2, v2) {
                        attrInfArr.push({
                            'name': $('.tanceng .pro_category_tjfl_dialog_box .worksp_addbx').eq(i).find('input:text').val(),
                            'value': strTrim($('.tanceng .pro_category_tjfl_dialog_box .worksp_addbx').eq(i).find('.goods_add_select_box_con li').eq(i2).text()),
                            'is_required': requiredStatus,
                            'id': 0
                        });
                    })
                } else {
                    attrInfArr.push({
                        'name': $('.tanceng .pro_category_tjfl_dialog_box .worksp_addbx').eq(i).find('input:text').val(),
                        'value': '',
                        'is_required': requiredStatus,
                        'id': 0
                    });
                }
            }
        });
        proCategoryGoodsData.attr_info = arrayToJson(getJsonArr(attrInfArr));
        if ((getJsonArr(attrInfArr)).length == 0) {
            alert('请输入至少一条属性');
            return false;
        }
        $.ajax({
            url: SERVER_URL + '/product-category/add',
            type: 'POST',
            data: proCategoryGoodsData,
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    $('.tanceng').css('display', 'none').find('div').remove();
                    getProCategoryGoodsListFn();
                } else {
                    alert(oE.msg);
                }
            },
            error: function (e) {
            }
        });
    });

    //定义要删除的属性值id
    var attrOptionDelId = '';

    //编辑基本商品的分类
    $('.pro_category_goods_edit_btn').die('click').live('click', function () {
        attrOptionDelId = '';
        curOperateCateId = $('.pro_category_goods_list_ul .Sideslip_list_on').attr('goodscateid');
        proCategoryGoodsData.id = curOperateCateId;
        $.ajax({
            url: SERVER_URL + '/product-category/loadcategory',
            type: 'GET',
            data: {
                token: token,
                id: curOperateCateId
            },
            dataType: 'json',
            success: function (oE) {
                var data = oE.data;
                //分类名称
                $('.tanceng .pro_category_goods_create_name').val(data['name']);
                //属性列表
                var attrList = '';
                if (data['attrList']) {
                    $.each(data['attrList'], function (i, v) {
                        var attrOptionList = '';
                        $.each(v['list'], function (i2, v2) {
                            //if (v['list'] && v['list'][i2]['value'] != '') {
                            attrOptionList += '<li attroptionid="' + v2['id'] + '" class="' + (v2['value'] == '' ? 'lik_option_none none' : '') + '">' + v2['value'] + ' <i></i></li>'
                            //}
                        });
                        attrList += '<div class="worksp_addbx">\
                        <div class="t_textinput" style="height: auto;">\
                        <div class="t_left" style="max-width: 10em;"><i class="c_r">*</i>属性名称<span><cite class="page_86_zjphNum">' + (i + 1) + '</cite></span></div>\
                        <div class="t_right">\
                        <input type="text" class="time_input goods_inp_32" value="' + v['category_name'] + '" onfocus="fn_focus(this);" onblur="fn_blur(this);" style="color: rgb(153, 153, 153);">\
                        <label style="vertical-align: middle;margin-left: 30px;"><input type="checkbox" ' + (v['is_required'] == 1 ? 'checked' : '') + '>标记必填</label>\
                        <label style="vertical-align: middle;margin-left: 20px;">\
                        <button class="but_green but_mix goods_add_select_btn val_dialogTop" name="goods_add_select_btn">添加选项</button>\
                        </label>\
                        <label style="vertical-align: middle;">\
                        <button class="but_r but_mix goods_sort_tjfl_del">删除</button>\
                        </label>\
                        </div>\
                        <div class="goods_add_select_box ' + (attrOptionList != '' ? '' : 'none') + '" style="">\
                        <i class="goods_sort_up"></i>\
                        <div class="goods_add_select_box_con" style="overflow: hidden">\
                        <ul class="inp_add_list_3">' + attrOptionList + '</ul>\
                        </div>\
                        </div>\
                        </div>\
                        </div>'
                    });
                    $('.tanceng .pro_category_tjfl_dialog_box .worksp_addbx_list').html(attrList);
                }
            },
            error: function (e) {
            }
        });
    });
    //删除属性值
    $('.tanceng .pro_category_tjfl_dialog_box .worksp_addbx_list li i').die('click').live('click', function () {
        attrOptionDelId += $(this).closest('li').attr('attroptionid') + ',';
    });
    //删除整条属性
    $('.tanceng .worksp_addbx .goods_sort_tjfl_del').die('click').live('click', function () {
        $.each($(this).closest('.worksp_addbx').find('.inp_add_list_3 li'), function (i, v) {
            attrOptionDelId += $(this).closest('.worksp_addbx').find('.inp_add_list_3 li').eq(i).attr('attroptionid') + ','
        });
        if ($('.tanceng .dialog_text_con .worksp_addbx .t_textinput').length == 1) {
            alert('最后一个不可删除');
            return false;
        }
        $(this).closest('.worksp_addbx').remove();
        tjfl_num();
    });

    //编辑分类 - 提交
    $('.tanceng .pro_category_goods_edit_submit_btn').die('click').live('click', function () {
        var attrInfArr = [];
        if ($('.tanceng .pro_category_goods_create_name').val() == '请输入名称') {
            alert('请输入分类名称');
            return false;
        } else {
            proCategoryGoodsData.name = $('.tanceng .pro_category_goods_create_name').val();
        }
        var requiredStatus = 0;
        var attrName = '';
        $.each($('.tanceng .pro_category_tjfl_dialog_box .worksp_addbx'), function (i, v) {
            if ($('.tanceng .pro_category_tjfl_dialog_box .worksp_addbx').eq(i).find('input:text').val() == undefined) {
                return true;
            }
            if ($('.tanceng .pro_category_tjfl_dialog_box .worksp_addbx').eq(i).find('input:text').val() == '请输入字段') {
                return true;
            } else {
                if ($('.tanceng .pro_category_tjfl_dialog_box .worksp_addbx').eq(i).find('input:checkbox').attr('checked')) {
                    requiredStatus = 1;
                } else {
                    requiredStatus = 0;
                }
                attrName = $('.tanceng .pro_category_tjfl_dialog_box .worksp_addbx').eq(i).find('input:text').val();
                if ($('.tanceng .pro_category_tjfl_dialog_box .worksp_addbx').eq(i).find('.goods_add_select_box_con li').length != 0) {
                    $.each($('.tanceng .pro_category_tjfl_dialog_box .worksp_addbx').eq(i).find('.goods_add_select_box_con li'), function (i2, v2) {
                        attrInfArr.push({
                            'name': attrName,
                            'value': strTrim($('.tanceng .pro_category_tjfl_dialog_box .worksp_addbx').eq(i).find('.goods_add_select_box_con li').eq(i2).text()),
                            'is_required': requiredStatus,
                            'id': $('.tanceng .pro_category_tjfl_dialog_box .worksp_addbx').eq(i).find('.goods_add_select_box_con li').eq(i2).attr('attroptionid')
                        });
                    })
                } else {
                    attrInfArr.push({
                        'name': attrName,
                        'value': '',
                        'is_required': requiredStatus,
                        'id': 0
                    });
                }
            }
        });
        //删除已有空值
        /*$.each($('.tanceng .pro_category_tjfl_dialog_box .worksp_addbx_list'), function (i, v) {
            if ($('.tanceng .pro_category_tjfl_dialog_box .worksp_addbx_list').eq(i).find('.inp_add_list_3 li').length > 1) {
                attrOptionDelId += $('.tanceng .pro_category_tjfl_dialog_box .worksp_addbx_list').eq(i).find('.lik_option_none').attr('attroptionid') + ',';
            }
        });*/
        proCategoryGoodsData.attr_info = arrayToJson(getJsonArr(attrInfArr));
        if ((getJsonArr(attrInfArr)).length == 0) {
            alert('请输入至少一条属性');
            return false;
        }
        console.log(attrOptionDelId);
        if (attrOptionDelId != '') {
            //删除属性值
            $.ajax({
                url: SERVER_URL + '/product-attribute/deldata',
                type: 'POST',
                data: {
                    token: token,
                    id: attrOptionDelId
                },
                dataType: 'json',
                success: function (oE) {
                    if (oE.code == 0) {
                    }
                },
                error: function (e) {
                }
            });
        }
        $.ajax({
            url: SERVER_URL + '/product-category/add',
            type: 'POST',
            data: proCategoryGoodsData,
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    $('.tanceng').css('display', 'none').find('div').remove();
                    getProCategoryGoodsListFn();
                }
            },
            error: function (e) {
            }
        });

    });

    //分类排序 上移下移操作函数
    function proCateUpDownBtnDisFn() {
        var index = $('.pro_category_nav_ul li.tabhover2').index();
        if (index == 0) {
            if ($('.pro_category_goods_list_ul li.Sideslip_list_on').index() == 0) {
                $('.pro_category_up_btn').addClass('pro_btn_up_grey').removeClass('pro_category_up_btn');
                $('.pro_btn_down_grey').addClass('pro_category_down_btn').removeClass('pro_btn_down_grey');
            } else if ($('.pro_category_goods_list_ul li.Sideslip_list_on').index() == $('.pro_category_goods_list_ul li').length - 1) {
                $('.pro_btn_up_grey').addClass('pro_category_up_btn').removeClass('pro_btn_up_grey');
                $('.pro_category_down_btn').addClass('pro_btn_down_grey').removeClass('pro_category_down_btn');
            } else {
                $('.pro_btn_up_grey').addClass('pro_category_up_btn').removeClass('pro_btn_up_grey');
                $('.pro_btn_down_grey').addClass('pro_category_down_btn').removeClass('pro_btn_down_grey');
            }
        } else if (index == 1) {
            if ($('.pro_category_setting_list_ul li.Sideslip_list_on').index() == 0) {
                $('.pro_category_up_btn').addClass('pro_btn_up_grey').removeClass('pro_category_up_btn');
                $('.pro_btn_down_grey').addClass('pro_category_down_btn').removeClass('pro_btn_down_grey');
            } else if ($('.pro_category_setting_list_ul li.Sideslip_list_on').index() == $('.pro_category_setting_list_ul li').length - 1) {
                $('.pro_btn_up_grey').addClass('pro_category_up_btn').removeClass('pro_btn_up_grey');
                $('.pro_category_down_btn').addClass('pro_btn_down_grey').removeClass('pro_category_down_btn');
            } else {
                $('.pro_btn_up_grey').addClass('pro_category_up_btn').removeClass('pro_btn_up_grey');
                $('.pro_btn_down_grey').addClass('pro_category_down_btn').removeClass('pro_btn_down_grey');
            }
        }
    }

    //定义分类上移下移参数
    var proCateUpDownData = {
        token: token,
        sort: '',
        action: '',
        category: ''
    };
    //分类上移
    $('.pro_category_up_btn').die('click').live('click', function () {
        proCateUpDownData.action = 'up';
        var index = $('.pro_category_nav_ul li.tabhover2').index();
        if (index == 0) {
            if ($('.pro_category_goods_list_ul li.Sideslip_list_on').index() == 0) {
                alert('当前已处于第一个');
                return false;
            }
            proCateUpDownData.sort = $('.pro_category_goods_list_ul li.Sideslip_list_on').attr('goodssort');
            proCateUpDownData.category = 1;
        } else if (index == 1) {
            if ($('.pro_category_setting_list_ul li.Sideslip_list_on').index() == 0) {
                alert('当前已处于第一个');
                return false;
            }
            proCateUpDownData.sort = $('.pro_category_setting_list_ul li.Sideslip_list_on').attr('goodssort');
            proCateUpDownData.category = 2;
        }
        $.ajax({
            url: SERVER_URL + '/product-category/sort',
            type: 'POST',
            data: proCateUpDownData,
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    $('.pro_category_nav_ul li.tabhover2').trigger('click');
                }
            },
            error: function (e) {
                alert(e.msg);
            }
        });
    });
    //分类下移
    $('.pro_category_down_btn').die('click').live('click', function () {
        proCateUpDownData.action = 'down';
        var index = $('.pro_category_nav_ul li.tabhover2').index();
        if (index == 0) {
            if ($('.pro_category_goods_list_ul li.Sideslip_list_on').index() == $('.pro_category_goods_list_ul li').length - 1) {
                alert('当前已处于最后一个');
                return false;
            }
            proCateUpDownData.sort = $('.pro_category_goods_list_ul li.Sideslip_list_on').attr('goodssort');
            proCateUpDownData.category = 1;
        } else if (index == 1) {
            if ($('.pro_category_setting_list_ul li.Sideslip_list_on').index() == $('.pro_category_setting_list_ul li').length - 1) {
                alert('当前已处于最后一个');
                return false;
            }
            proCateUpDownData.sort = $('.pro_category_setting_list_ul li.Sideslip_list_on').attr('goodssort');
            proCateUpDownData.category = 2;
        }
        $.ajax({
            url: SERVER_URL + '/product-category/sort',
            type: 'POST',
            data: proCateUpDownData,
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    $('.pro_category_nav_ul li.tabhover2').trigger('click');
                }
            },
            error: function (e) {
                alert(e.msg);
            }
        });
    });

    /*$('.sp_sort_con li').live('click', function () {
     proCateUpDownBtnDisFn();
     });*/

});
