$(function () {

    //图片上传

    function ajaxSubmit($el) {
        var token = Admin.get_token();
        $el.upload({
            url: SERVER_URL + '/task/uploadattch',
            // 其他表单数据
            params: {
                token: token
            },
            // 上传完成后, 返回json, text
            dataType: 'json',
            onSend: function (obj, str) {
                //console.log(obj+':::'+str)
                var extStart=str.lastIndexOf(".");
                var ext=str.substring(extStart,str.length).toUpperCase();
                console.log(ext)
                if(ext!=".BMP"&&ext!=".PNG"&&ext!=".GIF"&&ext!=".JPG"&&ext!=".JPEG"){
                    alert("图片限于bmp,png,gif,jpeg,jpg格式");
                    return false;
                }else{
                    return true;
                }
            },
            // 上传之后回调
            onComplate: function (data) {
                $el.parent().before('<li><input class="hide_input" type="file"/><img class="img_src" imgurl="' + data.imgurl + '" src="' + SERVER_URL + data.imgurl + '"/><i class="del_img">-</i></li>');
            },
            onProgress: function (e) {
                var per = Math.round(e.loaded * 100 / e.total);
                $('.complete').css('width', per + '%')
            }
        });
        $el.upload("ajaxSubmit");
    }

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
            if ($.inArray(sArr, newStringArr) == -1) {
                // 根据字符串数组push对象
                newStringArr.push(sArr);
                newArr.push(v)
            }
        });
        return newArr;
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

    // 数组根据某一值分成多个数组
    function likSeparateArr(arr, str, index) {
        var strArr = [];
        $.each(arr, function (i, v) {
            if ($.inArray('-' + v[str], strArr) == -1) {
                strArr.push('-' + v[str]);
            }
        });
        var newArr = [];
        $.each(strArr, function (i, v) {
            var childrenArr = [];
            $.each(arr, function (i2, v2) {
                if (v2[str] == v.split('-')[1]) {
                    childrenArr.push(v2);
                }
            });
            newArr.push({
                parent: childrenArr[0]['cateIndex'] + v,
                children: childrenArr
            })
        });
        return newArr;
    }

    function moneyToFixed(money) {
        return money.toFixed(2);
    }

    var token, page, num, keywords, type;
    token = Admin.get_token();
    //token = '2017052516045457073-1-1';
    uid = Admin.get_uid();
    uname = loginUserInfo.username;

    //权限部分
    if (loginUserInfo['company_admin'] != 1) {
        var proSettingPowerList = loginUserInfo['powerUrls'];
        var proSettingAdd = 'product-setting/add';
        var proSettingQyTy = 'product-setting/statuschange';
        var proSettingdel = 'product-setting/deldata';

        //新建基本商品 / 编辑
        var proSettingEditBtnStatus = '';
        if ($.inArray(proSettingAdd, proSettingPowerList) == -1) {
            $('#pro_complete_create_btn').hide();
            proSettingEditBtnStatus = 'none';
            $('#pro_complete_create_nav').css('width', '202px');
        } else {
            $('#pro_complete_create_btn').show();
            proSettingEditBtnStatus = '';
            $('#pro_complete_create_nav').css('width', '320px');
        }

        //启用停用
        var proSettingQyTyBtn = '';
        if ($.inArray(proSettingQyTy, proSettingPowerList) == -1) {
            proSettingQyTyBtn = 'none';
        } else {
            proSettingQyTyBtn = '';
        }

        //删除
        var proSettingDelBtnStatus = '';
        if ($.inArray(proSettingdel, proSettingPowerList) == -1) {
            proSettingDelBtnStatus = 'none';
        } else {
            proSettingDelBtnStatus = '';
        }
    }

    var proCompleteListLookAbledField = [
        {'index': null, 'field': '基本单位'},
        {'index': null, 'field': '备注'}
    ];
    likShow('#pro_complete_list_table', proCompleteListLookAbledField, '#pro_complete_list_look_field_ul', '#pro_complete_list_look_save', '#pro_complete_list_look_reset');


    //获取整机商品分类参数
    var getCompleteCateData = {
        token: token,
        category: 2, // 类型 1.商品 2.整机商品
        name: '', // 分类名称
        detail: 1 // 是否获取各类型的数量总数 0 否 1 是
    };
    getCompleteCateListFn();
    //获取商品分类列表
    function getCompleteCateListFn() {
        $.ajax({
            url: SERVER_URL + '/product-category/list',
            type: 'GET',
            data: getCompleteCateData,
            dataType: 'json',
            success: function (oE) {
                var datalist = oE.dataList;
                if(datalist.length == 0){
                    $('#pro_complete_create_btn').removeClass('val_dialog').css('background', '#ccc');
                }else{
                    $('#pro_complete_create_btn').addClass('val_dialog').css('background', '#23a2f');
                }
                var completeCateListHtml = '';
                $.each(datalist, function (i, v) {
                    completeCateListHtml += '<li completecateid="' + v['id'] + '" class="' + (i == 0 ? 'Sideslip_list_on' : '') + '"><span>' + v['name'] + '（' + v['num'] + '）</span></li>';
                });
                $('.pro_complete_cate_list_ul').html(completeCateListHtml);
                getCompleteGoodsListByCateFn($('.pro_complete_cate_list_ul li:nth-of-type(1)').attr('completecateid'));
            },
            error: function (e) {
            }
        });
    }

    //整机商品分类搜索功能
    $('.pro_complete_cate_search_btn').die('click').live('click', function () {
        if ($('.pro_complete_cate_search_inp').val() == '') {
            return false;
        }
        $('.lik_complete_cate_inp_add_list').html('<li style="margin-top: 1px;">' + $('.pro_complete_cate_search_inp').val() + ' <i></i></li>');
        getCompleteCateData.name = $('.pro_complete_cate_search_inp').val();
        getCompleteCateListFn();
        $('.pro_complete_cate_search_inp').val('').attr('readonly', true);
    });
    //整机商品分类搜索 - 删除关键字
    $('.lik_complete_cate_inp_add_list li i').die('click').live('click', function () {
        $(this).closest('li').remove();
        $('.pro_complete_cate_search_inp').val('').attr('readonly', false);
        getCompleteCateData.name = '';
        getCompleteCateListFn();
    });
    //获取整机商品列表参数
    var getCompleteGoodsListData = {
        token: token,
        key: '', //关键字
        page: 1, //页码
        num: 10, //每页数量
        status: '', //是否启用状态 0正常 1停用
        cate_id: '', //分类id
        is_optional: '' //是否可选配 1 是 2 否
    };
    //选择整机商品分类切换整机商品列表
    $('.pro_complete_cate_list_ul').on('click', 'li', function () {
        $('.pro_complete_list_search_inp').val('请输入整机商品名称/整机商品编号').css('#ccc');
        getCompleteGoodsListData.key = '';
        getCompleteGoodsListData.page = 1;
        getCompleteGoodsListByCateFn($(this).attr('completecateid'));
    });
    //获取整机商品列表
    function getCompleteGoodsListFn() {
        $.ajax({
            url: SERVER_URL + '/product-setting/list',
            type: 'GET',
            data: getCompleteGoodsListData,
            dataType: 'json',
            success: function (oE) {
                //搜索结果
                $('.pro_complete_search_num_total').html(oE.totalcount);
                var datalist = oE.datalist;
                if (datalist.length == 0) {
                    $('.pro_complete_list_nodata_box').removeClass('none');
                    $('.pro_complete_list_handle').addClass('none');
                } else {
                    $('.pro_complete_list_nodata_box').addClass('none');
                    $('.pro_complete_list_handle').removeClass('none');
                }
                var completeListHtml = '';
                //整机类型
                var completeOptionalName = '';
                //操作按钮
                var completeOperateBtn = '';
                $.each(datalist, function (i, v) {
                    if (v['status'] == 0) {
                        invalidStatusClass = '';
                        completeOperateBtn = '<button class="'+proSettingEditBtnStatus+' but_mix but_exit val_dialog pro_complete_list_edit_btn" name="sp_exitpz_pz">编辑</button><button class="'+proSettingQyTyBtn+' but_mix but_r but_stop pro_complete_list_ty_btn">停用</button>';
                    } else if (v['status'] == 1) {
                        invalidStatusClass = 'grey';
                        completeOperateBtn = '<button class="'+proSettingQyTyBtn+' but_mix but_stop but_lv pro_complete_list_qy_btn">启用</button><button class="'+proSettingDelBtnStatus+' but_mix but_r val_dialog pro_complete_list_del_btn" name="pro_complete_del_sure_box">删除</button>';
                    }
                    //整机类型
                    if (v['is_optional'] == 1) {
                        completeOptionalName = '可选配';
                    } else if (v['is_optional'] == 2) {
                        completeOptionalName = '不可选配';
                    }
                    //列表内容
                    completeListHtml += '<tr completeid="' + v['id'] + '" class="' + invalidStatusClass + '">\
                                        <td>' + l_dbl(i + 1) + '</td>\
                                        <td>' + v['name'] + '</td>\
                                        <td>' + completeOptionalName + '</td>\
                                        <td>' + v['attr_name'] + '</td>\
                                        <td>' + v['remark'] + '</td>\
                                        <td>\
                                        <button class="but_mix but_look r_sidebar_btn but_look pro_complete_list_look_btn" name="pro_complete_look">查看</button>' + completeOperateBtn + '</td>\
                                        </tr>'
                });
                //<td>' + v['code_sn'] + '</td>\ <td>' + v['unit_name'] + '</td>\
                //表格主体
                $('.pro_complete_list_tbody').html(completeListHtml);
                //分页
                list_table_render_pagination('.pro_complete_list_page', getCompleteGoodsListData, getCompleteGoodsListFn, oE.totalcount, datalist.length);
                $('#pro_complete_list_look_save').trigger('click');
            },
            error: function (e) {
            }
        });
    }

    //切换分类调取不同列表 函数
    function getCompleteGoodsListByCateFn(cateid) {
        if (cateid == undefined) {
            $('.pro_complete_list_tbody').addClass('none');
            $('.pro_complete_list_handle').addClass('none');
            $('.pro_complete_list_nodata_box').removeClass('none');
            return false;
        } else {
            getCompleteGoodsListData.cate_id = cateid;
            $('.pro_complete_list_tbody').removeClass('none');
            $('.pro_complete_list_handle').removeClass('none');
            $('.pro_complete_list_nodata_box').addClass('none');
        }
        getCompleteGoodsListFn();
    }

    //搜索关键字
    $('.pro_complete_list_search_btn').on('click', function () {
        if ($('.pro_complete_list_search_inp').val() == '请输入整机商品名称/整机商品编号') {
            getCompleteGoodsListData.key = '';
        } else {
            getCompleteGoodsListData.key = $('.pro_complete_list_search_inp').val();
        }
        getCompleteGoodsListFn();
    });
    //不显示停用商品
    $('.pro_complete_list_noshow_invalid_btn').on('click', function () {
        if ($(this).attr('checked') == 'checked') {
            getCompleteGoodsListData.status = 0;
        } else {
            getCompleteGoodsListData.status = '';
        }
        getCompleteGoodsListFn();
    });

    //高级搜索
    $('.pro_complete_optional_search_ul').on('click', 'li', function () {
        getCompleteGoodsListData.is_optional = $(this).attr('comoptional');
        getCompleteGoodsListFn();
    });

    //定义启用停用参数
    var proCompleteQyTyData = {
        token: token,
        id: '',
        status: '' //是否启用状态 0正常 1停用
    };
    //启用停用函数
    function proCompleteQyTyFn() {
        $.ajax({
            url: SERVER_URL + '/product-setting/statuschange',
            type: 'POST',
            data: proCompleteQyTyData,
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    getCompleteGoodsListFn();
                }
            },
            error: function (e) {
            }
        });
    }

    //启用
    $('.pro_complete_list_qy_btn').die('click').live('click', function () {
        proCompleteQyTyData.id = $(this).closest('tr').attr('completeid');
        proCompleteQyTyData.status = 0;
        proCompleteQyTyFn();
    });
    //停用
    $('.pro_complete_list_ty_btn').die('click').live('click', function () {
        proCompleteQyTyData.id = $(this).closest('tr').attr('completeid');
        proCompleteQyTyData.status = 1;
        proCompleteQyTyFn();
    });

    //刷新
    $('.pro_complete_list_refresh_btn').on('click', function () {
        getCompleteGoodsListData.key = '';
        getCompleteGoodsListData.page = 1;
        getCompleteGoodsListData.status = '';
        getCompleteGoodsListData.is_optional = '';
        $('.pro_complete_list_search_inp').val('请输入整机商品名称/整机商品编号').css('color', '#ccc');
        $('.pro_complete_optional_search_inp').val('整机类型').css('color', '#ccc');
        $('.pro_complete_list_noshow_invalid_btn').attr('checked', false);
        getCompleteGoodsListFn();
    });
    //获取基本单位列表函数
    function getProCompleteSetUnitListFn() {
        $.ajax({
            url: SERVER_URL + '/product-unit/list',
            type: 'POST',
            data: {token: token},
            dataType: 'json',
            success: function (oE) {
                var datalist = oE.datalist;
                var goodsUnitHtml = '';
                var datalistLen = datalist.length;
                $('.tanceng .pro_complete_set_unit_num_total').html(datalistLen);
                $.each(datalist, function (i, v) {
                    goodsUnitHtml += '<tr goodsunitid="' + v['id'] + '">\
                                        <td>' + l_dbl(i + 1) + '</td>\
                                        <td>' + v['name'] + '</td>\
                                        <td>\
                                        <button class="but_mix but_exit val_dialogTop pro_complete_unit_edit_btn" name="goods_base_exit_sp">修改</button>\
                                        <button class="but_mix but_r val_dialogTop pro_complete_unit_del_btn" name="pro_complete_unit_del_dialog">删除</button>\
                                        </td>\
                                        </tr>'
                });
                $('.tanceng .pro_complete_set_unit_list_tbody').html(goodsUnitHtml);
            },
            error: function (e) {
            }
        });
    }

    //添加基本单位
    $('.pro_complete_add_unit').die('click').live('click', function () {
        getProCompleteSetUnitListFn();
    });
    //新建基本单位
    $('.tanceng .pro_complete_unit_create_submit_btn').die('.click').die('click').live('click', function () {
        var $_this = $(this);
        if ($('.tanceng .pro_complete_unit_create_name_inp').val() == '输入名称') {
            alert('请输入单位名称');
            return false;
        } else {
            $.ajax({
                url: SERVER_URL + '/product-unit/add',
                type: 'POST',
                data: {token: token, id: 0, name: $('.tanceng .pro_complete_unit_create_name_inp').val()},
                dataType: 'json',
                success: function (oE) {
                    if (oE.code == 0) {
                        $_this.closest('.dialog_box').remove();
                        getProCompleteSetUnitListFn();
                    } else {
                        alert(oE.msg);
                    }
                },
                error: function (e) {
                }
            });
        }
    });
    //修改基本单位
    $('.tanceng .pro_complete_unit_edit_btn').die('click').live('click', function () {
        curGoodsUnitId = $(this).closest('tr').attr('goodsunitid');
        $('.tanceng .pro_complete_unit_edit_name_inp').val($(this).closest('tr').find('td').eq(1).html());
    });
    //修改基本单位 - 确认
    $('.tanceng .pro_complete_unit_edit_submit_btn').die('click').live('click', function () {
        var $_this = $(this);
        if ($('.tanceng .pro_complete_unit_edit_name_inp').val() == '输入名称') {
            alert('请输入单位名称');
            return false;
        } else {
            $.ajax({
                url: SERVER_URL + '/product-unit/add',
                type: 'POST',
                data: {token: token, id: curGoodsUnitId, name: $('.tanceng .pro_complete_unit_edit_name_inp').val()},
                dataType: 'json',
                success: function (oE) {
                    if (oE.code == 0) {
                        $_this.closest('.dialog_box').remove();
                        getProCompleteSetUnitListFn();
                    }
                },
                error: function (e) {
                }
            });
        }
    });
    //删除基本单位
    $('.tanceng .pro_complete_unit_del_btn').die('click').live('click', function () {
        curGoodsUnitId = $(this).closest('tr').attr('goodsunitid');
    });
    //删除基本单位 确认
    $('.tanceng .pro_complete_unit_del_submit_btn').die('click').live('click', function () {
        var $_this = $(this);
        $.ajax({
            url: SERVER_URL + '/product-unit/deldata',
            type: 'POST',
            data: {
                token: token,
                id: curGoodsUnitId
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    $_this.closest('.dialog_box').remove();
                    getProCompleteSetUnitListFn();
                }
            },
            error: function (e) {
            }
        });
    });

    //定义当前操作id
    var curCompleteId = null;
    //查看
    $('.pro_complete_list_look_btn').die('click').live('click', function () {
        curCompleteId = $(this).closest('tr').attr('completeid');
        $.ajax({
            url: SERVER_URL + '/product-setting/loadsetting',
            type: 'GET',
            data: {
                token: token,
                id: curCompleteId,
                detail: 0
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var data = oE.data;
                    //整机商品名称
                    $('.pro_complete_detail_name').html(data['name']);
                    //创建日期
                    $('.pro_complete_detail_created_at').html(data['created_at']);
                    //创建人
                    $('.pro_complete_detail_user_name').html(data['user_name']);
                    //产品图数组
                    if (data['img_url'] != '') {
                        var productImgArr = data['img_url'].split(',');
                        $('.pro_goods_list_detail_img_num_total').html(productImgArr.length);
                        $('.pro_goods_list_detail_img').attr('src', getImgUrl(productImgArr[0]));
                        $('.pro_look_img_btn').addClass('val_dialog');
                        $('.pro_look_img_btn').die('click').live('click', function () {
                            var lik_max_width = $('.lik_img_auto_box').width();
                            var lik_max_height = $('.lik_img_auto_box').height();
                            var lik_img_width = 0;
                            var lik_img_height = 0;
                            $('.sp_ck_img').die('click').live('click', function () {
                                //likImgAutoFn();
                            });
                            function likImgAutoFn() {
                                var lik_img_width = $('.lik_img_auto_box img').width();
                                var lik_img_height = $('.lik_img_auto_box img').height();
                                $('.lik_img_auto_box img').css({'width': 0, 'height': 0});
                                if ((lik_img_width / lik_img_height) > (lik_max_width / lik_max_height)) {
                                    $('.tanceng .lik_img_auto_box img').css({'width': 1000, 'height': ''});
                                } else {
                                    $('.tanceng .lik_img_auto_box img').css({'width': '', 'height': 680});
                                }
                            }

                            var goods_arr = productImgArr;
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
                        $('.pro_look_img_btn').removeClass('val_dialog');
                        $('.pro_goods_list_detail_img_num_total').html(0);
                        $('.pro_goods_list_detail_img').attr('src', 'static/images/error_xxl.png');
                    }
                    //整机商品编号
                    $('.pro_complete_detail_code_sn').html(data['code_sn']);
                    //整机类型
                    if (data['is_optional'] == 1) {
                        $('.pro_complete_detail_is_optional').html('可选配');
                        $('.pro_complete_detail_info_btn').attr('name', 'goods_total_pj_yes');
                    } else if (data['is_optional'] == 2) {
                        $('.pro_complete_detail_is_optional').html('不可选配');
                        $('.pro_complete_detail_info_btn').attr('name', 'goods_total_pj_no');
                    }
                    //属性
                    $('.pro_complete_detail_attr_name').html(data['attr_name']);
                    //备注
                    $('.pro_complete_detail_remark').html(data['remark']);
                    //启用状态
                    if (data['status'] == 0) {
                        $('.pro_complete_detail_status').html('启用');
                        $('.pro_complete_list_detail_more_ul').html('<li class="val_dialog pro_complete_detail_more_edit_btn" name="sp_exitpz_pz">编辑</li><li class="'+proSettingQyTyBtn+' pro_complete_list_detail_ty_btn">停用</li>');
                    } else if (data['status'] == 1) {
                        $('.pro_complete_detail_status').html('停用');
                        $('.pro_complete_list_detail_more_ul').html('<li class="'+proSettingQyTyBtn+' pro_complete_list_detail_qy_btn">启用</li><li class="'+proSettingDelBtnStatus+' val_dialog pro_complete_list_detail_del_btn" name="pro_complete_del_sure_box">删除</li>');
                    }
                    //最低库存
                    $('.pro_complete_detail_lower_limit').html(data['lower_limit']);
                    //最高库存
                    $('.pro_complete_detail_top_limit').html(data['top_limit']);
                    //库存列表
                    var qichuInfo = '';
                    $.each(data['qichu_info'], function (i, v) {
                        qichuInfo += '<p class="l-s-x" style="margin-top: 8px;">' + v['warehouse_name'] + '：<span>' + v['num'] + '</span></p>'
                    });
                    $('.pro_complete_detail_warehouse_list').html(qichuInfo);
                    //库存总计
                    $('.pro_complete_detail_qichu_total').html(data['qichu_total']);
                    //采购价
                    $('.pro_complete_detail_purchase_price').html(data['purchase_price']);
                }
            },
            error: function (e) {
            }
        });
    });
    $('.tanceng .img_detail_close_btn').die('click').live('click', function () {
        $('.tanceng').css("display", 'none').children('div').remove();
    });
    //查看 - 启用
    $('.pro_complete_list_detail_qy_btn').die('click').live('click', function () {
        proCompleteQyTyData.id = curCompleteId;
        $('.right_sidebar_h').trigger('click');
        proCompleteQyTyData.status = 0;
        proCompleteQyTyFn();
    });
    //查看 - 停用
    $('.pro_complete_list_detail_ty_btn').die('click').live('click', function () {
        proCompleteQyTyData.id = curCompleteId;
        $('.right_sidebar_h').trigger('click');
        proCompleteQyTyData.status = 1;
        proCompleteQyTyFn();
    });

    //查看配件商品
    $('.pro_complete_detail_info_btn').on('click', function () {
        $.ajax({
            url: SERVER_URL + '/product-setting/loadsetting',
            type: 'GET',
            data: {
                token: token,
                id: curCompleteId,
                detail: 1
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var data = oE.data;
                    //整机商品编号
                    $('.tanceng .pro_complete_detail_info_code_sn').html(data['code_sn']);
                    //整机商品名称
                    $('.tanceng .pro_complete_detail_info_name').html(data['name']);
                    //整机类型
                    $('.tanceng .pro_complete_detail_info_is_optional').html($('.pro_complete_detail_is_optional').html());
                    //备注
                    $('.tanceng .pro_complete_detail_info_remark').html(data['remark']);
                    var goodsListHtml = '';
                    if (data['is_optional'] == 1) {
                        //选配说明
                        $('.tanceng .pro_complete_detail_info_introductions').html(data['introductions']);
                        $.each(data['setting_info'], function (i, v) {
                            var goodsInfoList = '';
                            $.each(v['list'], function (i2, v2) {
                                var goodsInfoAttrList = '';
                                $.each(v2['attributes'], function (i3, v3) {
                                    goodsInfoAttrList += v3['name'] + '/' + v3['value'] + ','
                                });
                                goodsInfoAttrList = goodsInfoAttrList.slice(0, goodsInfoAttrList.length - 1);
                                goodsInfoList += '<tr>\
                                                <td>' + v2['code_sn'] + '</td>\
                                                <td>' + goodsInfoAttrList + '</td>\
                                              </tr>';
                            });
                            goodsListHtml += '<div>\
                                <div class="t_textinput relative" style="margin: 10px 0 5px;">\
                                <div class="t_left" style="color:#666;font-weight: 600;max-width: 10em;"><i class="c_r">*</i>商品<span>'+(i+1)+'</span>\
                                </div>\
                                </div>\
                                <div class="box_Open cg_cgbjd_newCon xs_shd_newCon page_108_shdSP">\
                                <div class="box_open_list goods_tc_toggle">\
                                <p class="box_open_head">\
                                <span class="cont_title" style="padding-left: 0;">' + v['cate_name'] + '</span>\
                                <span class="box_open_btn" style="right: 13px;">收起 <i class="right icon_show"></i></span>\
                                </p>\
                                <div class="div_1 container">\
                                <div class="div_1 table-container">\
                                <table>\
                                <thead>\
                                <tr>\
                                <th>编号</th>\
                                <th>属性</th>\
                                </tr>\
                                </thead>\
                                <tbody>' + goodsInfoList + '</tbody>\
                            </table>\
                            </div>\
                            </div>\
                            </div>\
                            </div>\
                            </div>'
                        });
                        $('.tanceng .pro_complete_detail_info_goods_list_yes').html(goodsListHtml);
                    } else if (data['is_optional'] == 2) {
                        $.each(data['setting_info'], function (i, v) {
                            var goodsInfoList = '';
                            $.each(v['list'], function (i2, v2) {
                                var goodsInfoAttrList = '';
                                $.each(v2['attributes'], function (i3, v3) {
                                    goodsInfoAttrList += v3['value'] + '/'
                                });
                                goodsInfoAttrList = goodsInfoAttrList.slice(0, goodsInfoAttrList.length - 1);
                                goodsInfoList += '<tr>\
                                                <td>' + v2['code_sn'] + '</td>\
                                                <td>' + goodsInfoAttrList + '</td>\
                                                <td>' + v2['num'] + v2['unit_name'] + '</td>\
                                              </tr>';
                            });
                            goodsListHtml += '<div>\
                                <div class="t_textinput relative" style="margin: 10px 0 5px;">\
                                <div class="t_left" style="color:#666;font-weight: 600;max-width: 10em;"><i class="c_r">*</i>商品<span>'+(i+1)+'</span>\
                                </div>\
                                </div>\
                                <div class="box_Open cg_cgbjd_newCon xs_shd_newCon page_108_shdSP">\
                                <div class="box_open_list goods_tc_toggle">\
                                <p class="box_open_head">\
                                <span class="cont_title" style="padding-left: 0;">' + v['cate_name'] + '</span>\
                                <span class="box_open_btn" style="right: 13px;">收起 <i class="right icon_show"></i></span>\
                                </p>\
                                <div class="div_1 container">\
                                <div class="div_1 table-container">\
                                <table>\
                                <thead>\
                                <tr>\
                                <th>编号</th>\
                                <th>属性</th>\
                                <th width="60">数量</th>\
                                </tr>\
                                </thead>\
                                <tbody>' + goodsInfoList + '</tbody>\
                            </table>\
                            </div>\
                            </div>\
                            </div>\
                            </div>\
                            </div>'
                        });
                        $('.tanceng .pro_complete_detail_info_goods_list_no').html(goodsListHtml);
                    }
                }
            },
            error: function (e) {
            }
        });
    });

    //删除操作
    $('.pro_complete_list_del_btn').die('click').live('click', function () {
        curCompleteId = $(this).closest('tr').attr('completeid');
    });
    //查看 - 删除操作
    $('.pro_complete_list_detail_del_btn').die('click').live('click', function () {
        $('.right_sidebar_h').trigger('click');
    });
    //删除确定
    $('.pro_complete_list_del_submit_btn').die('click').live('click', function () {
        proCompleteDelSubmitFn(curCompleteId);
    });
    //删除确定函数
    function proCompleteDelSubmitFn(completeId) {
        $.ajax({
            url: SERVER_URL + '/product-setting/deldata',
            type: 'POST',
            data: {
                token: token,
                id: completeId
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    $('.tanceng').css('display', 'none').find('.dialog_box').remove();
                    getCompleteCateListFn();
                }
            },
            error: function (e) {
            }
        });
    }

    //定义新建整机商品数量
    var proCompleteCreateData = {
        token: token,
        code_sn: '', // 编号
        name: '', //  名称
        cate_id: '', // 所属类别
        cate_name: '', // 所属类别名称
        unit_id: '', // 基本单位
        attr_name: '', // 属性
        warehouse_info: '', // 期初信息
        product_info: '', // 配件商品明细
        introductions: '', // 选配说明
        status: '', // 启用状态 0启用 1停用
        remark: '', // 备注
        img_url: '', // 图片地址(可多张图片，以逗号分隔)
        id: '', // ID编号 值不为空 则修改记录
        is_optional: '', // 是否可选配 1 是 2 否
        taxtype: '', // 税率类型：0无税1增值税17% 2普通税6%
        purchase_price: '', //  期初单价(采购价)
        top_limit: '', // 库存上限
        lower_limit: '', // 库存下限
        qichu_total: '' // 期初总和
    };

    var proCompleteCreateGoodsChosenArr = [];
    var proCompleteCreateGoodsInfoChosenArr = [];
    //新建整机商品
    $(document).on('click', '#pro_complete_create_btn', function () {
        if($('.pro_complete_cate_list_ul>li').length == 0){
            return false;
        }
        proCompleteCreateData = {
            token: token,
            code_sn: '', // 编号
            name: '', //  名称
            cate_id: '', // 所属类别
            cate_name: '', // 所属类别名称
            unit_id: '', // 基本单位
            attr_name: '', // 属性
            warehouse_info: '', // 期初信息
            product_info: '', // 配件商品明细
            introductions: '', // 选配说明
            status: '', // 启用状态 0启用 1停用
            remark: '', // 备注
            img_url: '', // 图片地址(可多张图片，以逗号分隔)
            id: 0, // ID编号 值不为空 则修改记录
            is_optional: '', // 是否可选配 1 是 2 否
            taxtype: 1, // 税率类型：0无税1增值税17% 2普通税6%
            purchase_price: '', //  期初单价(采购价)
            top_limit: '', // 库存上限
            lower_limit: '', // 库存下限
            qichu_total: '' // 期初总和
        };
        //创建人
        $('.tanceng .pro_complete_create_uname').html(uname);
        //创建日期
        $('.tanceng .pro_complete_create_time').html(getCurrentDateDay());
        //商品编号
        $('.tanceng .pro_complete_create_code_sn').val(likGetCodeFn('ZJ'));
        //商品分类
        $('.tanceng .pro_complete_create_cate_name').val($('.pro_complete_cate_list_ul li.Sideslip_list_on').text().split('（')[0]);
        proCompleteCreateData.cate_id = $('.pro_complete_cate_list_ul li.Sideslip_list_on').attr('completecateid');
        proCompleteCreateData.cate_name = $('.pro_complete_cate_list_ul li.Sideslip_list_on').text().split('（')[0];

        //清空原有数组
        proCompleteCreateGoodsChosenArr = [];
        proCompleteCreateGoodsInfoChosenArr = [];

        //调取库房信息
        $.ajax({
            url: SERVER_URL + '/warehouse/list',
            type: 'GET',
            data: {
                token: token
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var datalist = oE.datalist;
                    if (datalist.length == 0) {
                        $('.tanceng .goods_base_new_lfxx').removeClass('none');
                    } else {
                        $('.tanceng .goods_base_new_lfxx').addClass('none');
                    }
                    var warehouse = '';
                    $.each(datalist, function (i, v) {
                        warehouse += '<div class="t_textinput">\
                                        <div class="t_left"><i class="c_r v_hidden">*</i>' + v['name'] + '</div>\
                                        <div class="t_right"><input type="text" warehouseid="' + v['id'] + '" class="time_input goods_inp_32 pro_complete_create_warehouse_num" value="请输入数量" onfocus="fn_focus(this);" onblur="fn_blur(this);" onkeydown="value = this.value.replace(/[^0-9\.]/g, \'\');" onkeyup="value = this.value.replace(/[^0-9\.]/g, \'\');">\
                                        </div>\
                                        </div>'
                    });
                    $('.tanceng .pro_complete_create_warehouse_list').html(warehouse);
                }
            },
            error: function (e) {
            }
        });

    });

    //添加图片
    $('.tanceng .lik_pro_setting_create_addimg').die('change').live('change', function () {
        ajaxSubmit($(this));
    });

    //期初信息 - 库房 - 输入数量
    $('.tanceng .pro_complete_create_warehouse_num').live('keyup', function () {
        var warehouseNumTotal = 0;
        $.each($('.tanceng .pro_complete_create_warehouse_num'), function (i, v) {
            if ($('.tanceng .pro_complete_create_warehouse_num').eq(i).val() != '请输入数量') {
                warehouseNumTotal += parseFloat($('.tanceng .pro_complete_create_warehouse_num').eq(i).val());
            } else {
                return true;
            }
        });
        $('.tanceng .pro_complete_create_warehouse_num_total').html(warehouseNumTotal);
    });

    //选择基本单位
    $('.tanceng').on('click', '.pro_complete_create_choose_unit_btn', function () {
        $.ajax({
            url: SERVER_URL + '/product-unit/list',
            type: 'POST',
            data: {token: token},
            dataType: 'json',
            success: function (oE) {
                var datalist = oE.datalist;
                var goodsUnitHtml = '';
                $.each(datalist, function (i, v) {
                    goodsUnitHtml += '<li goodsunitid="' + v['id'] + '">' + v['name'] + '</li>'
                });
                $('.tanceng .pro_complete_create_choose_unit_list_ul').html(goodsUnitHtml);
            },
            error: function (e) {
            }
        });
    });
    $('.tanceng').on('click', '.pro_complete_create_choose_unit_list_ul li', function () {
        proCompleteCreateData.unit_id = $(this).attr('goodsunitid');
    });
    //输入单价
    $('.tanceng .pro_complete_create_cost_one').live('keyup', function () {
        if ($('.tanceng .pro_complete_create_tax_one').val() == '含税率17%') {
            $('.tanceng .pro_complete_create_cg_cost_one').val(moneyToFixed(parseFloat(parseFloat($(this).val()) * 17 / 100) + parseFloat($(this).val())));
        } else if ($('.tanceng .pro_complete_create_tax_one').val() == '未税') {
            $('.tanceng .pro_complete_create_cg_cost_one').val(moneyToFixed(parseFloat($(this).val())));
        }
    });
    //选择税
    $('.tanceng .pro_complete_create_tax_ul li').die('click').live('click', function () {
        var costOne = 0;
        if ($('.tanceng .pro_complete_create_cost_one').val() == '请输入单价') {
            costOne = 0;
        } else {
            costOne = parseFloat($('.tanceng .pro_complete_create_cost_one').val());
        }
        if ($('.tanceng .pro_complete_create_tax_one').val() == '含税率17%') {
            $('.tanceng .pro_complete_create_cg_cost_one').val(moneyToFixed(parseFloat(costOne * 17 / 100) + costOne));
        } else if ($('.tanceng .pro_complete_create_tax_one').val() == '未税') {
            $('.tanceng .pro_complete_create_cg_cost_one').val(moneyToFixed(costOne));
        }
    });

    //切换不可选配
    $('.tanceng').on('click', '.pro_complete_create_bkxp', function () {
        $('.tanceng .goods_zj_kfyj').removeClass('none');
        $('.tanceng .goods_zj_qcxx').removeClass('none');
        //改变框大小
        $('.tanceng .pro_complete_create_goods_dialog_content').width(650);
        $('.tanceng .goods_pz_new_sp_inputbox').css('width', '100%');
        //清空原有数组
        proCompleteCreateGoodsChosenArr = [];
        proCompleteCreateGoodsInfoChosenArr = [];
        $('.tanceng .pro_complete_create_goods_chosen_list_no').html('');
        $('.tanceng .pro_complete_create_goods_chosen_list_yes').html('');
        //配置说明
        $('.tanceng .goods_pjsm').addClass('none');
    });
    //切换可选配
    $('.tanceng').on('click', '.pro_complete_create_kxp', function () {
        $('.tanceng .goods_zj_kfyj').addClass('none');
        $('.tanceng .goods_zj_qcxx').addClass('none');
        //改变框大小
        $('.tanceng .pro_complete_create_goods_dialog_content').width(650);
        $('.tanceng .goods_pz_new_sp_inputbox').css('width', '100%');
        //清空原有数组
        proCompleteCreateGoodsChosenArr = [];
        proCompleteCreateGoodsInfoChosenArr = [];
        $('.tanceng .pro_complete_create_goods_chosen_list_no').html('');
        $('.tanceng .pro_complete_create_goods_chosen_list_yes').html('');
        //配置说明
        $('.tanceng .goods_pjsm').removeClass('none');
    });

    //选择商品

    //商品分类参数
    var proCompleteCreateChooseGoodsCateListData = {
        token: token,
        category: 1, //类型 1.商品 2.整机商品
        name: '', // 分类名称
        detail: 1 // 是否获取各类型的数量总数 0 否 1 是
    };
    //商品分类
    function proCompleteCreateChooseGoodsSortFn() {
        $.ajax({
            url: SERVER_URL + '/product-category/list',
            type: 'GET',
            data: proCompleteCreateChooseGoodsCateListData,
            dataType: 'json',
            async: false,
            success: function (oE) {
                var datalist = oE.dataList;
                var goodsCateListHtml = '';
                $.each(datalist, function (i, v) {
                    goodsCateListHtml += '<li goodscateid="' + v['id'] + '" class="' + (i == 0 ? 'Sideslip_list_on' : '') + '"><span>' + v['name'] + '</span></li>';
                });
                $('.tanceng .pro_complete_create_choose_goods_cate_list').html(goodsCateListHtml);
                getGoodsListByCateFn($('.tanceng .pro_complete_create_choose_goods_cate_list li:nth-of-type(1)').attr('goodscateid'));
            },
            error: function (e) {
            }
        });
    }

    //商品分类搜索功能
    $('.pro_complete_create_choose_goods_cate_search_btn').die('click').live('click', function () {
        if ($('.pro_complete_create_choose_goods_cate_search_inp').val() == '') {
            return false;
        }
        $('.tanceng .pro_complete_create_choose_goods_inp_add_list').html('<li style="margin-top: 1px;">' + $('.pro_complete_create_choose_goods_cate_search_inp').val() + ' <i></i></li>');
        proCompleteCreateChooseGoodsCateListData.name = $('.pro_complete_create_choose_goods_cate_search_inp').val();
        proCompleteCreateChooseGoodsSortFn();
        $('.pro_complete_create_choose_goods_cate_search_inp').val('').attr('readonly', true);
    });

    //商品分类 - 删除搜索项
    $('.tanceng .pro_complete_create_choose_goods_inp_add_list li i').die('click').live('click', function () {
        $(this).closest('li').remove();
        proCompleteCreateChooseGoodsCateListData.name = '';
        proCompleteCreateChooseGoodsSortFn();
        $('.pro_complete_create_choose_goods_cate_search_inp').val('').attr('readonly', false);
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
    $('.pro_complete_create_choose_goods_cate_list li').die('click').live('click', function () {
        $('.pro_complete_create_choose_goods_search_inp').val('搜索商品编号/商品名称').css('#ccc');
        getGoodsListData.key = '';
        getGoodsListData.page = 1;
        getGoodsListByCateFn($(this).attr('goodscateid'));
    });
    //获取基本商品列表
    function proCompleteCreateChooseGoodsFn() {
        $.ajax({
            url: SERVER_URL + '/product/list',
            type: 'GET',
            data: getGoodsListData,
            dataType: 'json',
            success: function (oE) {
                //搜索结果
                $('.tanceng .pro_complete_create_choose_goods_totals').html(oE.totalcount);
                var datalist = oE.dataList;
                if (datalist.length == 0) {
                    $('.pro_complete_create_choose_goods_nodata_box').removeClass('none');
                    $('.pro_complete_create_choose_goods_handle').addClass('none');
                } else {
                    $('.pro_complete_create_choose_goods_nodata_box').addClass('none');
                    $('.pro_complete_create_choose_goods_handle').removeClass('none');
                }
                var goodsListHtml = '';
                //属性名
                var goodsAttrNameArr = getGoodsCateAttrTheadListFn(getGoodsListData.cate_id);
                var goodsAttrName = '';
                $.each(goodsAttrNameArr, function (i, v) {
                    //表头
                    goodsAttrName += '<th>' + v + '</th>';
                });
                $.each(datalist, function (i, v) {
                    //属性值
                    var goodsAttrValue = '';
                    var goodsAttrValueText = '';
                    $.each(goodsAttrNameArr, function (i2, v2) {
                        var temp = [];
                        $.each(v['attributes'], function (i3, v3) {
                            temp.push(v3['name']);
                        });
                        if($.inArray(v2, temp) != -1){
                            $.each(v['attributes'], function (i3, v3) {
                                if(v2 == v3['name']){
                                    var splP = '';
                                    if (v3['value'].length>10){
                                        splP = 'xiangmu_p';
                                    }
                                    goodsAttrValue += '<td><p class="'+splP+'">' + v3['value'] + '</p></td>';
                                }else{
                                    return true;
                                }
                            });
                        }else{
                            goodsAttrValue += '<td>-</td>';
                        }
                    });
                    $.each(v['attributes'], function (i2, v2) {
                        goodsAttrValueText += v2['value'] + '/';
                    });
                    goodsAttrValueText = goodsAttrValueText.slice(0, goodsAttrValueText.length - 1);
                    //列表内容
                    goodsListHtml += '<tr goodsid="' + v['id'] + '" goodstaxtype="' + v['taxtype'] + '" goodsattr="' + goodsAttrValueText + '" goodscode="' + v['code_sn'] + '" goodsretailprice="' + v['retail_price'] + '" goodslowerprice="' + v['lower_price'] + '" goodscostprice="' + v['cost_price'] + '">\
                                        <td><input type="checkbox"></td>\
                                        <td>' + l_dbl(i + 1) + '</td>\
                                        <td class="goodscodesn">' + v['code_sn'] + '</td>\
                                        <td class="goodsname">' + v['name'] + '</td>\
                                        <td class="goodsunitname">' + v['unit_name'] + '</td>' + goodsAttrValue + '\
                                        <td>' + v['remark'] + '</td>\
                                        </tr>'
                });
                //表头
                $('.tanceng .pro_complete_create_choose_goods_list_thead').html('<tr><th>选择</th><th>序号</th><th>商品编号</th><th>名称</th><th>基本单位</th>' + goodsAttrName + '<th>备注</th></tr>');
                //表格主体
                $('.tanceng .pro_complete_create_choose_goods_list').html(goodsListHtml);
                //分页
                list_table_render_pagination('.pro_complete_create_choose_goods_pagination', getGoodsListData, proCompleteCreateChooseGoodsFn, oE.totalcount, datalist.length);
            },
            error: function (e) {
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
            $('.pro_complete_create_choose_goods_list').addClass('none');
            $('.pro_complete_create_choose_goods_handle').addClass('none');
            $('.pro_complete_create_choose_goods_nodata_box').removeClass('none');
            return false;
        } else {
            getGoodsListData.cate_id = cateid;
            $('.pro_complete_create_choose_goods_list').removeClass('none');
            $('.pro_complete_create_choose_goods_handle').removeClass('none');
            $('.pro_complete_create_choose_goods_nodata_box').addClass('none');
        }
        proCompleteCreateChooseGoodsFn();
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
        getGoodsListData.cate_id = $('.pro_complete_create_choose_goods_cate_list li.Sideslip_list_on').attr('goodscateid');
        getGoodsListData.attr = arrayToJson(attrSearchField);
        proCompleteCreateChooseGoodsFn();
    });
    //商品属性
    function getGoodsCateAttrListFn(cateId){
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
                    $.each(datalist, function (i, v) {
                        if (v['list'][1] && v['list'][1].value != ''){
                            var attrList = '';
                            $.each(v['list'], function (i2, v2) {
                                if(v2['value'] == '')return true;
                                attrList += '<li cate="'+v2['name']+'" attr="'+(v2['id'] + '&' + v2['value'])+'">'+v2['value']+'</li>';
                            });
                            cateAttrList += '<div class="zkgjjss_value">\
                            <div class="zkgjjss_value_left">'+v['category_name']+'</div>\
                            <div class="zkgjjss_value_right">\
                            <div class="inline_block select_mormal select_p">\
                            <input type="text" class="select_input block" value="待选择">\
                            <i></i>\
                            <ul class="select_list pur_supplier_come_from_ul sbar" style = "display: none;" >'+attrList+'</ul>\
                            </div>\
                            </div>\
                            </div> ';
                        }
                    });
                    $('.goods_attr_search_table').html(cateAttrList);
                }
            },
            error: function (e) {
            }
        });
    }

    function getGoodsCateAttrTheadListFn(cateId){
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
    $('.tanceng .pro_complete_create_choose_goods_search_btn').die('click').live('click', function () {
        if ($('.tanceng .pro_complete_create_choose_goods_search_inp').val() == '搜索商品编号/商品名称') {
            getGoodsListData.key = '';
        } else {
            getGoodsListData.key = $('.tanceng .pro_complete_create_choose_goods_search_inp').val();
        }
        proCompleteCreateChooseGoodsFn();
    });

    //选择商品
    var inpValHis = [];
    $('.tanceng .pro_complete_create_choose_goods_btn').die('click').live('click', function () {
        inpValHis = [];
        /*$.each($('.tanceng .pro_complete_create_goods_chosen_list_no input:text'), function (i, v) {
            inpValHis.push($('.tanceng .pro_complete_create_goods_chosen_list_no input:text').eq(i).val());
        });*/
        $.each($('.tanceng .pro_complete_create_goods_chosen_list_no .worksp_addbx'), function (i, v) {
            var inpValHisTmp = [];
            $.each($('.tanceng .pro_complete_create_goods_chosen_list_no .worksp_addbx').eq(i).find('input:text'), function (i2,v2) {
                inpValHisTmp.push($('.tanceng .pro_complete_create_goods_chosen_list_no .worksp_addbx').eq(i).find('input:text').eq(i2).val());
            });
            inpValHis.push(inpValHisTmp);
        });
        proCompleteCreateChooseGoodsSortFn();
    });
    //添加 - 选择商品
    $('.tanceng .pro_complete_create_choose_goods_tj_btn').die('click').live('click', function () {
        inpValHis = [];
        /*$.each($('.tanceng .pro_complete_create_goods_chosen_list_no input:text'), function (i, v) {
            inpValHis.push($('.tanceng .pro_complete_create_goods_chosen_list_no input:text').eq(i).val());
        });*/
        $.each($('.tanceng .pro_complete_create_goods_chosen_list_no .worksp_addbx'), function (i, v) {
            var inpValHisTmp = [];
            $.each($('.tanceng .pro_complete_create_goods_chosen_list_no .worksp_addbx').eq(i).find('input:text'), function (i2,v2) {
                inpValHisTmp.push($('.tanceng .pro_complete_create_goods_chosen_list_no .worksp_addbx').eq(i).find('input:text').eq(i2).val());
            });
            inpValHis.push(inpValHisTmp);
        });
        proCompleteCreateChooseGoodsSortFn();
        if($(this).attr('cateindexname') != null){
            var curCateName = $(this).attr('cateindexname');
            $.each($('.tanceng .pro_complete_create_choose_goods_cate_list li'), function (i, v) {
                if(curCateName == $('.tanceng .pro_complete_create_choose_goods_cate_list li').eq(i).text()){
                    $('.tanceng .pro_complete_create_choose_goods_cate_list li').eq(i).trigger('click');
                }
            });
        }
       /* if($(this).attr('cateindex') != null){
            $('.tanceng .pro_complete_create_choose_goods_cate_list li').eq($(this).attr('cateindex')).trigger('click');
        }else if($(this).attr('cateindexname') != null){
            var curCateName = $(this).attr('cateindexname');
            $.each($('.tanceng .pro_complete_create_choose_goods_cate_list li'), function (i, v) {
                if(curCateName == $('.tanceng .pro_complete_create_choose_goods_cate_list li').eq(i).text()){
                    $('.tanceng .pro_complete_create_choose_goods_cate_list li').eq(i).trigger('click');
                }
            });
        }*/

    });

    //选择商品保存
    $('.tanceng .pro_complete_create_choose_goods_save_btn').die('click').live('click', function () {
        $.each($('.tanceng .pro_complete_create_choose_goods_list tr'), function (i, v) {
            if ($('.tanceng .pro_complete_create_choose_goods_list tr').eq(i).find('input:checkbox').attr('checked') == 'checked') {
                proCompleteCreateGoodsChosenArr.push({
                    "cateName": $('.tanceng .pro_complete_create_choose_goods_cate_list .Sideslip_list_on').text(),
                    "cateIndex": $('.tanceng .pro_complete_create_choose_goods_cate_list .Sideslip_list_on').index(),
                    "goodsId": $('.tanceng .pro_complete_create_choose_goods_list tr').eq(i).attr('goodsid'),
                    "goodsCodeSn": $('.tanceng .pro_complete_create_choose_goods_list tr').eq(i).attr('goodscode'),
                    "goodsAttr": $('.tanceng .pro_complete_create_choose_goods_list tr').eq(i).attr('goodsattr')
                });
            }
        });
        proCompleteCreateGoodsInfoChosenArr = likSeparateArr(getJsonArr(proCompleteCreateGoodsChosenArr), 'cateName', 'cateIndex');
        console.log(proCompleteCreateGoodsInfoChosenArr);
        $(this).closest('.dialog_box').remove();
        if (proCompleteCreateGoodsInfoChosenArr.length == 0) {
            $('.tanceng .pro_complete_create_goods_dialog_content').width(650);
            $('.tanceng .goods_pz_new_sp_inputbox').css('width', '100%');
        } else {
            $('.tanceng .pro_complete_create_goods_dialog_content').width(900);
            $('.tanceng .goods_pz_new_sp_inputbox').css('width', '50%');
        }
        //选中的商品信息展示
        var goodsInfoListHtml = '';
        if ($('.tanceng .pro_complete_create_bkxp').is(':checked') && proCompleteCreateGoodsInfoChosenArr.length != 0) {
            //不可选配
            $('.tanceng .sp_sppz_pt_box_no').removeClass('none');
            $('.tanceng .sp_sppz_pt_box_yes').addClass('none');
            $.each(proCompleteCreateGoodsInfoChosenArr, function (i, v) {
                var goodsInfoHtml = '';
                $.each(v['children'], function (i2, v2) {
                    goodsInfoHtml += '<tr goodsid="' + v2['goodsId'] + '">\
                                    <td>' + v2['goodsCodeSn'] + '</td>\
                                    <td>' + v2['goodsAttr'] + '</td>\
                                    <td><div class="num_input inline_block num_input_new"><button class="but_blue but_opa_small inp_plus">+</button><input type="text" value="1"><button class="but_blue but_opa_small radius_left_0 inp_reduce">-</button></div></td>\
                                    <td><button class="but_mix but_r val_dialogTop pro_complete_create_goods_child_del_btn" name="pro_complete_goods_child_del_name">删除</button></td>\
                                    </tr>';
                });
                goodsInfoListHtml += '<div class="worksp_addbx">\
                <div class="t_textinput relative" style="margin: 10px 0 5px;">\
                <div class="t_left" style="color:#666;font-weight: 600;max-width: 10em;"><i class="c_r">*</i>商品<span>(<cite class="pro_complete_choose_goods_parent_index_num">' + (i + 1) + '</cite>)</span></div>\
            </div>\
            <div class="box_Open cg_cgbjd_newCon xs_shd_newCon page_108_shdSP">\
                <div class="box_open_list goods_tc_toggle">\
                <p class="box_open_head">\
                <span class="cont_title" style="padding-left: 0;margin-left: 0;">' + v['parent'].split('-')[1] + '</span>\
                <span>\
                <button class="but_mix val_dialogTop pro_complete_create_choose_goods_tj_btn" name="sp_new_tjpjsp" cateindex="' + v['parent'].split('-')[0] + '" cateindexname="'+v['parent'].split('-')[1]+'">添加</button><button class="but_r but_mix val_dialogTop pro_complete_create_goods_parent_del_btn" goodsparentindex="' + (i + 1) + '" name="pro_complete_goods_parent_del_name">删除</button>\
                </span>\
                <span class="box_open_btn" style="right: 13px;">收起 <i class="right icon_show"></i></span>\
                </p>\
                <div class="div_1 container">\
                <div class="div_1 table-container">\
                <table>\
                <thead>\
                <tr>\
                <th>编号</th>\
                <th>属性</th>\
                <th style="width:93px;">数量</th>\
                <th style="width:93px;">操作</th>\
                </tr>\
                </thead>\
                <tbody>' + goodsInfoHtml + '</tbody>\
                </table>\
                </div>\
                </div>\
                </div>\
                </div>\
                </div>'
            });
            $('.tanceng .pro_complete_create_goods_chosen_list_no').html(goodsInfoListHtml);
        } else if ($('.tanceng .pro_complete_create_kxp').is(':checked') && proCompleteCreateGoodsInfoChosenArr.length != 0) {
            //可选配
            $('.tanceng .sp_sppz_pt_box_no').addClass('none');
            $('.tanceng .sp_sppz_pt_box_yes').removeClass('none');
            $.each(proCompleteCreateGoodsInfoChosenArr, function (i, v) {
                var goodsInfoHtml = '';
                $.each(v['children'], function (i2, v2) {
                    goodsInfoHtml += '<tr goodsid="' + v2['goodsId'] + '">\
                                    <td>' + v2['goodsCodeSn'] + '</td>\
                                    <td>' + v2['goodsAttr'] + '</td>\
                                    <td><button class="but_mix but_r val_dialogTop pro_complete_create_goods_child_del_btn" name="pro_complete_goods_child_del_name">删除</button></td>\
                                    </tr>';
                });
                goodsInfoListHtml += '<div class="worksp_addbx">\
                <div class="t_textinput relative" style="margin: 10px 0 5px;">\
                <div class="t_left" style="color:#666;font-weight: 600;max-width: 10em;"><i class="c_r">*</i>商品<span>(<cite class="pro_complete_choose_goods_parent_index_num">' + (i + 1) + '</cite>)</span></div>\
            </div>\
            <div class="box_Open cg_cgbjd_newCon xs_shd_newCon page_108_shdSP">\
                <div class="box_open_list goods_tc_toggle">\
                <p class="box_open_head">\
                <span class="cont_title" style="padding-left: 0;margin-left: 0;">' + v['parent'].split('-')[1] + '</span>\
                <span>\
                <button class="but_mix val_dialogTop pro_complete_create_choose_goods_tj_btn" name="sp_new_tjpjsp" cateindex="' + v['parent'].split('-')[0] + '">添加</button><button class="but_r but_mix val_dialogTop pro_complete_create_goods_parent_del_btn" goodsparentindex="' + (i + 1) + '" name="pro_complete_goods_parent_del_name">删除</button>\
                </span>\
                <span class="box_open_btn" style="right: 13px;">收起 <i class="right icon_show"></i></span>\
                </p>\
                <div class="div_1 container">\
                <div class="div_1 table-container">\
                <table>\
                <thead>\
                <tr>\
                <th>编号</th>\
                <th>属性</th>\
                <th style="width:93px;">操作</th>\
                </tr>\
                </thead>\
                <tbody>' + goodsInfoHtml + '</tbody>\
                </table>\
                </div>\
                </div>\
                </div>\
                </div>\
                </div>'
            });
            $('.tanceng .pro_complete_create_goods_chosen_list_yes').html(goodsInfoListHtml);
        }
        $.each(inpValHis, function (i, v) {
            $.each(v, function (i2,v2) {
                $('.tanceng .pro_complete_create_goods_chosen_list_no .worksp_addbx').eq(i).find('input:text').eq(i2).val(v2);
            });
        });
    });

    //删除商品大类
    var proComGoodsParentIndex = null;
    $('.tanceng .pro_complete_create_goods_parent_del_btn').die('click').live('click', function () {
        proComGoodsParentIndex = $(this).closest('.worksp_addbx').index();
    });
    //删除商品大类 - 确定
    $('.tanceng .pro_complete_create_goods_parent_del_submit').die('click').live('click', function () {
        //在子商品中查找并删除
        for (var i = 0; i < proCompleteCreateGoodsChosenArr.length; i++) {
            if (proCompleteCreateGoodsChosenArr[i]['cateName'] == proCompleteCreateGoodsInfoChosenArr[proComGoodsParentIndex]['parent'].split('-')[1]) {
                proCompleteCreateGoodsChosenArr.splice(i, 1);
                i--;
            }
        }
        //proCompleteCreateGoodsInfoChosenArr.splice(proComGoodsParentIndex, 1);
        $('.tanceng .pro_complete_create_goods_chosen_list_no .worksp_addbx').eq(proComGoodsParentIndex).remove();
        $.each($('.tanceng .pro_complete_create_goods_chosen_list_no .worksp_addbx'), function (i, v) {
            $('.tanceng .pro_complete_create_goods_chosen_list_no .worksp_addbx').eq(i).find('.pro_complete_choose_goods_parent_index_num').html(i + 1)
        });
        $('.tanceng .pro_complete_create_goods_chosen_list_yes .worksp_addbx').eq(proComGoodsParentIndex).remove();
        $.each($('.tanceng .pro_complete_create_goods_chosen_list_yes .worksp_addbx'), function (i, v) {
            $('.tanceng .pro_complete_create_goods_chosen_list_yes .worksp_addbx').eq(i).find('.pro_complete_choose_goods_parent_index_num').html(i + 1)
        });
        $(this).closest('.dialog_box').remove();
    });
    //删除子商品
    var proComGoodsChildId = null;
    var proComGoodsChildIndex = null;
    $('.tanceng .pro_complete_create_goods_child_del_btn').die('click').live('click', function () {
        proComGoodsParentIndex = $(this).closest('.worksp_addbx').index();
        proComGoodsChildIndex = $(this).closest('tr').index();
        proComGoodsChildId = $(this).closest('tr').attr('goodsid');
    });
    //删除子商品 - 确定
    $('.tanceng .pro_complete_create_goods_child_del_submit').die('click').live('click', function () {
        //在子商品中查找并删除
        for (var i = 0; i < proCompleteCreateGoodsChosenArr.length; i++) {
            if (proCompleteCreateGoodsChosenArr[i]['goodsId'] == proComGoodsChildId) {
                proCompleteCreateGoodsChosenArr.splice(i, 1);
            }
        }
        $('.tanceng .pro_complete_create_goods_chosen_list_no .worksp_addbx').eq(proComGoodsParentIndex).find('tbody tr').eq(proComGoodsChildIndex).remove();
        $('.tanceng .pro_complete_create_goods_chosen_list_yes .worksp_addbx').eq(proComGoodsParentIndex).find('tbody tr').eq(proComGoodsChildIndex).remove();
        $(this).closest('.dialog_box').remove();
    });

    //选择商品结束

    //新建整机商品提交
    $('.tanceng .pro_complete_create_submit_btn').die('click').live('click', function () {
        //商品编号
        proCompleteCreateData.code_sn = $('.tanceng .pro_complete_create_code_sn').val();
        //整机类型
        if ($('.tanceng .pro_complete_create_bkxp').is(':checked')) {
            proCompleteCreateData.is_optional = 2;
        } else if ($('.tanceng .pro_complete_create_kxp').is(':checked')) {
            proCompleteCreateData.is_optional = 1;
        }
        proCompleteCreateData.code_sn = $('.tanceng .pro_complete_create_code_sn').val();
        //商品名称
        if ($('.tanceng .pro_complete_create_name').val() == '请输入商品名称') {
            alert('请输入商品名称');
            return false;
        } else {
            proCompleteCreateData.name = $('.tanceng .pro_complete_create_name').val();
        }
        //基本单位
        if ($('.tanceng .pro_complete_create_choose_unit_btn').val() == '请选择基本单位') {
            alert('请选择基本单位');
            return false;
        }
        //属性
        if ($('.tanceng .pro_complete_create_attr_name_textarea').val() == '请输入属性') {
            proCompleteCreateData.attr_name = '';
        } else {
            proCompleteCreateData.attr_name = $('.tanceng .pro_complete_create_attr_name_textarea').val();
        }
        //添加图片
        if ($('.tanceng .img_warp li').size() != 0) {
            var imgUrlList = '';
            var $_imgWrapLi = $('.tanceng .img_warp li');
            $.each($_imgWrapLi, function (i, v) {
                imgUrlList += $_imgWrapLi.eq(i).find('img.img_src').attr('imgurl')+',';
            });
            imgUrlList = imgUrlList.slice(0, imgUrlList.length-1);
            proCompleteCreateData.img_url = imgUrlList;
        }
        //备注
        if ($('.tanceng .pro_complete_create_remark_textarea').val() == '请输入备注') {
            proCompleteCreateData.remark = '';
        } else {
            proCompleteCreateData.remark = $('.tanceng .pro_complete_create_remark_textarea').val();
        }

        //商品信息
        if ($('.tanceng .pro_complete_create_bkxp').is(':checked')) {
            //不可选配
            if ($('.tanceng .pro_complete_create_goods_chosen_list_no>div').length == 0) {
                alert('请选择商品');
                return false;
            } else {
                var goodsInfoList = [];
                $.each($('.tanceng .pro_complete_create_goods_chosen_list_no tbody tr'), function (i, v) {
                    goodsInfoList.push({
                        product_id: $('.tanceng .pro_complete_create_goods_chosen_list_no tbody tr').eq(i).attr('goodsid'),
                        num: $('.tanceng .pro_complete_create_goods_chosen_list_no tbody tr').eq(i).find('input:text').val()
                    });
                });
                proCompleteCreateData.product_info = arrayToJson(goodsInfoList);
                proCompleteCreateData.introductions = '';
            }
        } else if ($('.tanceng .pro_complete_create_kxp').is(':checked')) {
            //可选配
            if ($('.tanceng .pro_complete_create_goods_chosen_list_yes>div').length == 0) {
                alert('请选择商品');
                return false;
            } else {
                var goodsInfoList = [];
                $.each($('.tanceng .pro_complete_create_goods_chosen_list_yes tbody tr'), function (i, v) {
                    goodsInfoList.push({
                        product_id: $('.tanceng .pro_complete_create_goods_chosen_list_yes tbody tr').eq(i).attr('goodsid'),
                        num: 1
                    });
                });
                proCompleteCreateData.product_info = arrayToJson(goodsInfoList);
                //选配说明
                if ($('.tanceng .pro_complete_create_kxp_xpsm_textarea').val() == '请输入选配说明') {
                    proCompleteCreateData.introductions = '';
                } else {
                    proCompleteCreateData.introductions = $('.tanceng .pro_complete_create_kxp_xpsm_textarea').val();
                }
            }
        }

        //最低库存
        if ($('.tanceng .pro_complete_create_lower_limit').val() == '请输入库存下限') {
            proCompleteCreateData.lower_limit = '';
        } else {
            proCompleteCreateData.lower_limit = $('.tanceng .pro_complete_create_lower_limit').val();
        }
        //最高库存
        if ($('.tanceng .pro_complete_create_top_limit').val() == '请输入库存上限') {
            proCompleteCreateData.top_limit = '';
        } else {
            proCompleteCreateData.top_limit = $('.tanceng .pro_complete_create_top_limit').val();
        }
        //是否启用商品
        if ($('.tanceng .pro_complete_create_qysp_up').is(':checked')) {
            proCompleteCreateData.status = 0;
        } else if ($('.tanceng .pro_complete_create_qysp_down').is(':checked')) {
            proCompleteCreateData.status = 1;
        }
        //期初库存数量
        var warehouseArr = [];
        $.each($('.tanceng .pro_complete_create_warehouse_list>div'), function (i, v) {
            if ($('.tanceng .pro_complete_create_warehouse_list>div').eq(i).find('.pro_complete_create_warehouse_num').val() == '请输入数量') {
                return true;
            } else {
                warehouseArr.push({
                    warehouse_id: $('.tanceng .pro_complete_create_warehouse_list>div').eq(i).find('.pro_complete_create_warehouse_num').attr('warehouseid'),
                    num: $('.tanceng .pro_complete_create_warehouse_list>div').eq(i).find('.pro_complete_create_warehouse_num').val()
                });
            }
        });
        proCompleteCreateData.warehouse_info = arrayToJson(warehouseArr);
        proCompleteCreateData.qichu_total = $('.tanceng .pro_complete_create_warehouse_num_total').html();
        //单价
        if ($('.tanceng .pro_complete_create_cost_one').val() == '请输入单价') {
            proCompleteCreateData.purchase_price = 0;
        } else {
            proCompleteCreateData.purchase_price = $('.tanceng .pro_complete_create_cost_one').val();
        }
        //税率
        if ($('.tanceng .pro_complete_create_tax_one').val() == '含税率17%') {
            proCompleteCreateData.taxtype = 1;
        } else if ($('.tanceng .pro_complete_create_tax_one').val() == '未税') {
            proCompleteCreateData.taxtype = 0;
        }
        $.ajax({
            url: SERVER_URL + '/product-setting/add',
            type: 'POST',
            data: proCompleteCreateData,
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    $('.tanceng').css('display', 'none').find('.dialog_box').remove();
                    //截取当前数量
                    if (proCompleteCreateData.id == 0) {
                        var curNum = parseFloat($('.pro_complete_cate_list_ul li.Sideslip_list_on span').text().split('（')[1].split('）')[0]);
                        $('.pro_complete_cate_list_ul li.Sideslip_list_on span').text($('.pro_complete_cate_list_ul li.Sideslip_list_on span').text().split('（')[0] + '（' + (curNum + 1) + '）');
                    }
                    getCompleteGoodsListByCateFn($('.pro_complete_cate_list_ul li.Sideslip_list_on').attr('completecateid'));
                }
            },
            error: function (e) {
            }
        });
    });

    //编辑整机商品
    $('.pro_complete_list_edit_btn').die('click').live('click', function () {
        curCompleteId = $(this).closest('tr').attr('completeid');
        getEditCompleteDetailFn(curCompleteId);
        proCompleteCreateData.id = curCompleteId;
    });
    //查看中编辑整机商品
    $('.pro_complete_detail_more_edit_btn').die('click').live('click', function () {
        $('.right_sidebar_h').trigger('click');
        getEditCompleteDetailFn(curCompleteId);
        proCompleteCreateData.id = curCompleteId;
    });
    //编辑中获取整机商品详情函数
    function getEditCompleteDetailFn(completeId) {
        //清空原有数组
        proCompleteCreateGoodsChosenArr = [];
        proCompleteCreateGoodsInfoChosenArr = [];
        $.ajax({
            url: SERVER_URL + '/product-setting/loadsetting',
            type: 'GET',
            data: {
                token: token,
                id: completeId,
                detail: 1
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var data = oE.data;
                    //创建人
                    $('.tanceng .pro_complete_create_uname').html(data['user_name']);
                    //创建日期
                    $('.tanceng .pro_complete_create_date').html(data['created_at']);
                    //整机编号
                    $('.tanceng .pro_complete_create_code_sn').val(data['code_sn']);
                    //整机名称
                    $('.tanceng .pro_complete_create_name').val(data['name']);
                    //整机分类
                    $('.tanceng .pro_complete_create_cate_name').val(data['cate_name']);
                    proCompleteCreateData.cate_id = data['cate_id'];
                    proCompleteCreateData.cate_name = data['cate_name'];
                    //基本单位
                    $('.tanceng .pro_complete_create_choose_unit_btn').val(data['unit_name']);
                    proCompleteCreateData.unit_id = data['unit_id'];
                    //产品图数组
                    if (data['img_url']) {
                        var productImgArr = data['img_url'].split(',');
                        var productImgHtml = '';
                        $.each(productImgArr, function (i, v) {
                            productImgHtml += '<li><input class="hide_input" type="file"><img class="img_src" imgurl="' + v + '" src="' + getImgUrl(v) + '"><i class="del_img">-</i></li>';
                        });
                        $('.tanceng .img_warp cite').before(productImgHtml);
                    } else {
                    }
                    //属性
                    $('.tanceng .pro_complete_create_attr_name_textarea').val(data['attr_name']);
                    //备注
                    $('.tanceng .pro_complete_create_remark_textarea').val(data['remark']);
                    //可选配/不可选配
                    if (data['is_optional'] == 1) {
                        // 可选配
                        $('.tanceng .pro_complete_create_kxp').attr('checked', true);
                        $('.tanceng .goods_zj_kfyj').addClass('none');
                        $('.tanceng .goods_zj_qcxx').addClass('none');
                        //配件商品
                        if(data['setting_info']){
                            var settingGoods = data['setting_info'];
                            var settingGoodsList = '';
                            $.each(settingGoods, function (i, v) {
                                var goodsList = '';
                                $.each(v['list'], function (i2, v2) {
                                    var attrList = '';
                                    $.each(v2['attributes'], function (i3, v3) {
                                        attrList += v3['value'] + '/';
                                    });
                                    attrList = attrList.slice(0, attrList.length - 1);
                                    goodsList += '<tr goodsid="'+v2['id']+'">\
                                                <td>'+v2['code_sn']+'</td>\
                                                <td>'+attrList+'</td>\
                                                <td>\
                                                <button class="but_mix but_r val_dialogTop pro_complete_create_goods_child_del_btn" name="pro_complete_goods_child_del_name">删除</button>\
                                                </td>\
                                                </tr>';

                                    proCompleteCreateGoodsChosenArr.push({
                                        "cateName": v['cate_name'],
                                        "cateIndex": 0,
                                        "goodsId": v2['id'],
                                        "goodsCodeSn": v2['code_sn'],
                                        "goodsAttr": attrList
                                    });

                                });
                                settingGoodsList += '<div class="worksp_addbx">\
                                    <div class="t_textinput relative" style="margin: 10px 0 5px;">\
                                    <div class="t_left" style="color:#666;font-weight: 600;max-width: 10em;"><i class="c_r">*</i><span>商品(<cite class="pro_complete_choose_goods_parent_index_num">'+(i+1)+'</cite>)</span></div>\
                                </div>\
                                <div class="box_Open cg_cgbjd_newCon xs_shd_newCon page_108_shdSP">\
                                    <div class="box_open_list goods_tc_toggle">\
                                    <p class="box_open_head"><span class="cont_title" style="padding-left: 0;margin-left: 0;">'+v['cate_name']+'</span>\
                                    <span>\
                                    <button class="but_mix val_dialogTop pro_complete_create_choose_goods_tj_btn" name="sp_new_tjpjsp" cateindexname="'+v['cate_name']+'">添加</button><button class="but_r but_mix val_dialogTop pro_complete_create_goods_parent_del_btn" name="pro_complete_goods_parent_del_name">删除</button></span> <span class="box_open_btn" style="right: 13px;">收起 <i class="right icon_show"></i></span></p>\
                                    <div class="div_1 container">\
                                    <div class="div_1 table-container">\
                                    <table>\
                                    <thead>\
                                    <tr>\
                                    <th>编号</th>\
                                    <th>属性</th>\
                                    <th style="width:93px;">操作</th>\
                                    </tr>\
                                    </thead>\
                                    <tbody>'+goodsList+'</tbody>\
                                    </table>\
                                    </div>\
                                    </div>\
                                    </div>\
                                    </div>\
                                    </div>';
                            });
                            $('.tanceng .sp_sppz_pt_box_no').addClass('none');
                            $('.tanceng .sp_sppz_pt_box_yes').removeClass('none').find('.pro_complete_create_goods_chosen_list_yes').html(settingGoodsList);
                        }

                    } else if (data['is_optional'] == 2) {
                        // 不可选配
                        //商品信息
                        var settingGoods = data['setting_info'];
                        var settingGoodsList = '';
                        $.each(settingGoods, function (i, v) {
                            var goodsList = '';
                            $.each(v['list'], function (i2, v2) {
                                var attrList = '';
                                $.each(v2['attributes'], function (i3, v3) {
                                    attrList += v3['value'] + '/';
                                });
                                attrList = attrList.slice(0, attrList.length - 1);
                                goodsList += '<tr goodsid="'+v2['id']+'">\
                                                <td>'+v2['code_sn']+'</td>\
                                                <td>'+attrList+'</td>\
                                                <td>\
                                                <div class="num_input inline_block num_input_new"><button class="but_blue but_opa_small inp_plus">+</button><input class="lik_input_number" type="text" value="'+v2['num']+'"><button class="but_blue but_opa_small radius_left_0 inp_reduce">-</button></div>\
                                                </td>\
                                                <td>\
                                                <button class="but_mix but_r val_dialogTop pro_complete_create_goods_child_del_btn" name="pro_complete_goods_child_del_name">删除</button>\
                                                </td>\
                                                </tr>';

                                proCompleteCreateGoodsChosenArr.push({
                                    "cateName": v['cate_name'],
                                    "cateIndex": 0,
                                    "goodsId": v2['id'],
                                    "goodsCodeSn": v2['code_sn'],
                                    "goodsAttr": attrList
                                });

                            });
                            settingGoodsList += '<div class="worksp_addbx">\
                                <div class="t_textinput relative" style="margin: 10px 0 5px;">\
                                <div class="t_left" style="color:#666;font-weight: 600;max-width: 10em;"><i class="c_r">*</i>商品<span>(<cite class="pro_complete_choose_goods_parent_index_num">'+(i+1)+'</cite>)</span></div>\
                            </div>\
                            <div class="box_Open cg_cgbjd_newCon xs_shd_newCon page_108_shdSP">\
                                <div class="box_open_list goods_tc_toggle">\
                                <p class="box_open_head"><span class="cont_title" style="padding-left: 0;margin-left: 0;">'+v['cate_name']+'</span> <span><button class="but_mix val_dialogTop pro_complete_create_choose_goods_tj_btn" name="sp_new_tjpjsp" cateindexname="'+v['cate_name']+'">添加</button><button class="but_r but_mix val_dialogTop pro_complete_create_goods_parent_del_btn" name="pro_complete_goods_parent_del_name">删除</button>\
                                </span> <span class="box_open_btn" style="right: 13px;">收起 <i class="right icon_show"></i></span></p>\
                                <div class="div_1 container">\
                                <div class="div_1 table-container">\
                                <table>\
                                <thead>\
                                <tr>\
                                <th>编号</th>\
                                <th>属性</th>\
                                <th style="width:93px;">数量</th>\
                                <th style="width:93px;">操作</th>\
                                </tr>\
                                </thead>\
                                <tbody>'+goodsList+'</tbody>\
                                </table>\
                                </div>\
                                </div>\
                                </div>\
                                </div>\
                                </div>';
                        });
                        $('.tanceng .sp_sppz_pt_box_no').removeClass('none').find('.pro_complete_create_goods_chosen_list_no').html(settingGoodsList);
                        $('.tanceng .sp_sppz_pt_box_yes').addClass('none');
                        $('.tanceng .pro_complete_create_bkxp').attr('checked', true);
                        $('.tanceng .goods_zj_kfyj').removeClass('none');
                        $('.tanceng .goods_zj_qcxx').removeClass('none');
                        //最低库存
                        $('.tanceng .pro_complete_create_lower_limit').val(data['lower_limit']);
                        //最高库存
                        $('.tanceng .pro_complete_create_top_limit').val(data['top_limit']);

                        //调取库房信息
                        $.ajax({
                            url: SERVER_URL + '/warehouse/list',
                            type: 'GET',
                            data: {
                                token: token
                            },
                            dataType: 'json',
                            success: function (oE) {
                                if (oE.code == 0) {
                                    var datalist = oE.datalist;
                                    if (datalist.length == 0) {
                                        $('.tanceng .goods_base_new_lfxx').removeClass('none');
                                    } else {
                                        $('.tanceng .goods_base_new_lfxx').addClass('none');
                                    }
                                    var warehouse = '';
                                    $.each(datalist, function (i, v) {
                                        warehouse += '<div class="t_textinput">\
                                        <div class="t_left"><i class="c_r v_hidden">*</i>' + v['name'] + '</div>\
                                        <div class="t_right"><input type="text" warehouseid="' + v['id'] + '" class="lik_input_number time_input goods_inp_32 pro_complete_create_warehouse_num" value="请输入数量" onfocus="fn_focus(this);" onblur="fn_blur(this);">\
                                        </div>\
                                        </div>'
                                    });
                                    $('.tanceng .pro_complete_create_warehouse_list').html(warehouse);
                                    //期初信息
                                    $.each(data['qichu_info'], function (i, v) {
                                        $.each($('.tanceng .pro_complete_create_warehouse_list>div'), function (i2, v2) {
                                            if ($('.tanceng .pro_complete_create_warehouse_list>div').eq(i2).find('input:text').attr('warehouseid') == v['warehouse_id']) {
                                                $('.tanceng .pro_complete_create_warehouse_list>div').eq(i2).find('input:text').val(v['num']).css('color', '#333');
                                            }
                                        });
                                    });
                                    //期初信息 - 总和
                                    $('.tanceng .pro_complete_create_warehouse_num_total').html(data['qichu_total']);
                                    //采购价
                                    $('.tanceng .pro_complete_create_cost_one').val(data['purchase_price']);
                                    //税率
                                    if (data['taxtype'] == 0) {
                                        $('.tanceng .pro_complete_create_tax_one').val('未税');
                                        $('.tanceng .pro_complete_create_cg_cost_one').val(data['purchase_price']);
                                    } else if (data['taxtype'] == 1) {
                                        $('.tanceng .pro_complete_create_tax_one').val('含税率17%');
                                        $('.tanceng .pro_complete_create_cg_cost_one').val(moneyToFixed(data['purchase_price'] * 1.17));
                                    }
                                }
                            },
                            error: function (e) {
                            }
                        });
                    }
                    //包含商品信息
                    var datalist = data['setting_info'];
                    var goodsList = '';
                    $.each(datalist, function (i, v) {
                        var goodsInfoList = '';
                        $.each(v['list'], function (i2, v2) {
                            var goodsInfoAttrList = '';
                            $.each(v2['attributes'], function (i3, v3) {
                                goodsInfoAttrList += v3['name'] + '/' + v3['value'] + ','
                            });
                            goodsInfoAttrList = goodsInfoAttrList.slice(0, goodsInfoAttrList.length - 1);
                            goodsInfoList += '<tr>\
                                                <td>' + goodsInfoAttrList + '</td>\
                                                <td>' + v2['num'] + v2['unit_name'] + '</td>\
                                              </tr>';
                        });
                        goodsList += '<div>\
                            <div class="t_textinput relative" style="margin: 10px 0 5px;">\
                            <div class="t_left" style="color:#666;font-weight: 600;max-width: 10em;"><i class="c_r">*</i>商品' + (i + 1) + '</div>\
                            </div>\
                            <div class="box_Open cg_cgbjd_newCon xs_shd_newCon page_108_shdSP">\
                            <div class="box_open_list">\
                            <p class="box_open_head">\
                            <span class="cont_title" style="padding-left: 0;margin-left: 0;">'+v['cate_name']+'</span>\
                            <span class="box_open_btn" style="right: 13px;">收起 <i class="right icon_show"></i></span>\
                            </p>\
                            <div class="div_1 container">\
                            <div class="div_1 table-container">\
                            <table>\
                            <thead>\
                            <tr style="font-weight: 100;">\
                            <th>属性</th>\
                            <th style="width: 40px;font-weight: 100;">数量</th>\
                            </tr>\
                            </thead>\
                            <tbody>' + goodsInfoList + '</tbody>\
                        </table>\
                        </div>\
                        </div>\
                        </div>\
                        </div>\
                        </div>';
                    });
                    $('.tanceng .pro_complete_edit_goods_chosen_list').html(goodsList);
                }
            },
            error: function (e) {
            }
        });
    }
});
