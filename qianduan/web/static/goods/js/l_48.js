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
            if ($.inArray(v[index] + '-' + v[str], strArr) == -1) {
                strArr.push(v[index] + '-' + v[str]);
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
                parent: v,
                children: childrenArr
            })
        });
        return newArr;
    }

    function moneyToFixed(money) {
        return money.toFixed(2);
    }

    //权限部分
    if (loginUserInfo['company_admin'] != 1) {
        var proPackagePowerList = loginUserInfo['powerUrls'];
        var proPackageAdd = 'product-package/add';
        var proPackageQyTy = 'product-package/statuschange';
        var proPackagedel = 'product-package/deldata';

        //新建基本商品 / 编辑
        var proPackageEditBtnStatus = '';
        if ($.inArray(proPackageAdd, proPackagePowerList) == -1) {
            $('.pro_package_create_btn').hide();
            proPackageEditBtnStatus = 'none';
            $('#pro_package_create_nav').css('width', '60px');
        } else {
            $('.pro_package_create_btn').show();
            proPackageEditBtnStatus = '';
            $('#pro_package_create_nav').css('width', '160px');
        }

        //启用停用
        var proPackageQyTyBtn = '';
        if ($.inArray(proPackageQyTy, proPackagePowerList) == -1) {
            proPackageQyTyBtn = 'none';
        } else {
            proPackageQyTyBtn = '';
        }

        //删除
        var proPackageDelBtnStatus = '';
        if ($.inArray(proPackagedel, proPackagePowerList) == -1) {
            proPackageDelBtnStatus = 'none';
        } else {
            proPackageDelBtnStatus = '';
        }
    }

    var token, page, num, keywords, type;
    token = Admin.get_token();
    //token = '2017052516045457073-1-1';
    uid = Admin.get_uid();
    uname = loginUserInfo.username;
    //获取套餐商品列表参数
    var getProPackageListData = {
        token: token,
        key: '', //关键字
        page: 1, //页码
        num: 10, //每页数量
        status: 0, //是否启用状态：0启用 1停用
        price: '' //计算套餐总价格 0 否 1 是
    };
    getProPackageListFn();
    //获取套餐商品列表参数
    function getProPackageListFn() {
        $.ajax({
            url: SERVER_URL + '/product-package/list',
            type: 'GET',
            data: getProPackageListData,
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var datalist = oE.datalist;
                    if (datalist.length == 0) {
                        $('.pro_package_list_nodata_box').removeClass('none');
                        $('.pro_package_list_handle').addClass('none');
                    } else {
                        $('.pro_package_list_nodata_box').addClass('none');
                        $('.pro_package_list_handle').removeClass('none');
                    }
                    //搜索结果
                    $('.pro_package_list_num_total').html(oE.totalcount);
                    var proPackageListHtml = '';
                    var packageOperateBtn = '';
                    var packageClass = '';
                    $.each(datalist, function (i, v) {
                        if (v['status'] == 0) {
                            packageClass = '';
                            packageOperateBtn = '<button class="'+proPackageEditBtnStatus+' but_mix val_dialog but_exit pro_package_edit_btn" name="sp_exit_tc">编辑</button><button class="'+proPackageQyTy+' but_mix but_r pro_package_list_ty_btn">停用</button>';
                        } else if (v['status'] == 1) {
                            packageClass = 'grey';
                            packageOperateBtn = '<button class="'+proPackageQyTy+' but_mix but_lv pro_package_list_qy_btn">启用</button><button class="'+proPackageDelBtnStatus+' but_mix but_r val_dialog pro_package_del_btn" name="pro_package_del_sure_box">删除</button>';
                        }
                        proPackageListHtml += '<tr packageid="' + v['id'] + '" class="' + packageClass + '">\
                                                    <td>' + l_dbl(i + 1) + '</td>\
                                                    <td>' + v['code_sn'] + '</td>\
                                                    <td>' + v['name'] + '</td>\
                                                    <td>' + v['remark'] + '</td>\
                                                    <td>\
                                                    <button class="but_mix r_sidebar_btn pro_package_look_btn" name="sp_tc_msg">查看</button>' + packageOperateBtn + '</td>\
                                                </tr>'
                    });
                    $('.pro_package_list_tbody').html(proPackageListHtml);
                    //分页
                    list_table_render_pagination('.pro_package_list_page', getProPackageListData, getProPackageListFn, oE.totalcount, datalist.length);
                }
            },
            error: function (e) {
            }
        });
    }

    //搜索关键字
    $('.pro_package_list_search_btn').die('click').live('click', function () {
        if ($('.pro_package_list_search_inp').val() == '请输入关键字/套餐编号') {
            getProPackageListData.key = '';
        } else {
            getProPackageListData.key = $('.pro_package_list_search_inp').val();
        }
        getProPackageListFn();
    });
    //不显示停用状态
    $('.pro_package_noshow_invalid_checkbox').die('click').live('click', function () {
        if ($(this).is(':checked')) {
            getProPackageListData.status = 0;
        } else {
            getProPackageListData.status = '';
        }
        getProPackageListFn();
    });
    //定义当前操作id
    var curProPackageId = null;
    //启用/停用 参数
    var proPackageQyTyData = {
        token: token,
        id: '',
        status: '' // 是否启用状态：0启用 1停用
    };
    //启用操作
    $('.pro_package_list_qy_btn').die('click').live('click', function () {
        curProPackageId = $(this).closest('tr').attr('packageid');
        proPackageQyTyData.id = curProPackageId;
        proPackageQyTyData.status = 0;
        proPackageListQyTyFn();
    });
    //停用操作
    $('.pro_package_list_ty_btn').die('click').live('click', function () {
        curProPackageId = $(this).closest('tr').attr('packageid');
        proPackageQyTyData.id = curProPackageId;
        proPackageQyTyData.status = 1;
        proPackageListQyTyFn();
    });
    //启用/停用 函数
    function proPackageListQyTyFn() {
        $.ajax({
            url: SERVER_URL + '/product-package/statuschange',
            type: 'POST',
            data: proPackageQyTyData,
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    getProPackageListFn();
                }
            },
            error: function (e) {
            }
        });
    }

    //删除套餐商品
    $('.pro_package_del_btn').die('click').live('click', function () {
        curProPackageId = $(this).closest('tr').attr('packageid');
    });
    //删除套餐商品 - 确定
    $('.pro_package_del_submit_btn').die('click').live('click', function () {
        proPackageDelFn(curProPackageId);
    });
    //删除套餐商品函数
    function proPackageDelFn(packageId){
        $.ajax({
            url: SERVER_URL + '/product-package/deldata',
            type: 'POST',
            data: {
                token: token,
                id: packageId
            },
            dataType: 'json',
            success: function (oE) {
                if(oE.code == 0){
                    $('.tanceng').css('display', 'none').find('.dialog_box').remove();
                    getProPackageListFn();
                }
            },
            error: function(e){
            }
        });
    }

    //刷新
    $('.pro_package_list_refresh_btn').die('click').live('click', function () {
        getProPackageListData.page = 1;
        getProPackageListData.status = 0;
        $('.pro_package_noshow_invalid_checkbox').attr('checked', 'checked');
        getProPackageListData.key = '';
        $('.pro_package_list_search_inp').val('请输入关键字/套餐编号').css('color', '#ccc');
        getProPackageListFn();
    });

    //查看
    $('.pro_package_look_btn').die('click').live('click', function () {
        $('.pro_package_look_nav_ul li:nth-of-type(1)').trigger('click');
        curProPackageId = $(this).closest('tr').attr('packageid');
        $.ajax({
            url: SERVER_URL + '/product-package/loadpackage',
            type: 'GET',
            data: {
                token: token,
                id: curProPackageId,
                detail: 0
            },
            dataType: 'json',
            success: function (oE) {
                if(oE.code == 0){
                    var data = oE.data;
                    //创建日期
                    $('.pro_package_detail_created_at').html(data['created_at']);
                    //创建人
                    $('.pro_package_detail_user_name').html(data['user_name']);
                    //套餐编号
                    $('.pro_package_detail_code_sn').html(data['code_sn']);
                    //套餐名称
                    $('.pro_package_detail_name').html(data['name']);
                    //启用停用操作
                    if(data['status'] == 0){
                        $('.pro_package_detail_status').html('启用');
                        $('.pro_package_detail_more_list').html('<li class="'+proPackageEditBtnStatus+' val_dialog pro_package_detail_more_edit_btn" name="sp_exit_tc">编辑</li><li class="'+proPackageQyTy+' pro_package_detail_more_ty_btn">停用</li>');
                    }else if(data['status'] == 1){
                        $('.pro_package_detail_status').html('停用');
                        $('.pro_package_detail_more_list').html('<li class="'+proPackageQyTy+' pro_package_detail_more_qy_btn">启用</li><li class="'+proPackageDelBtnStatus+' val_dialog pro_package_detail_more_del_btn" name="pro_package_del_sure_box">删除</li>');
                    }
                }
            },
            error: function(e){
            }
        });
    });
    //查看中启用
    $('.pro_package_detail_more_qy_btn').die('click').live('click', function () {
        $('.right_sidebar_h').trigger('click');
        proPackageQyTyData.id = curProPackageId;
        proPackageQyTyData.status = 0;
        proPackageListQyTyFn();
    });
    //查看中停用
    $('.pro_package_detail_more_ty_btn').die('click').live('click', function () {
        $('.right_sidebar_h').trigger('click');
        proPackageQyTyData.id = curProPackageId;
        proPackageQyTyData.status = 1;
        proPackageListQyTyFn();
    });
    //查看中删除
    $('.pro_package_detail_more_del_btn').die('click').live('click', function () {
        $('.right_sidebar_h').trigger('click');
    });
    //查看包含商品
    $('.pro_package_detail_info_btn').die('click').live('click', function () {
        $.ajax({
            url: SERVER_URL + '/product-package/loadpackage',
            type: 'GET',
            data: {
                token: token,
                id: curProPackageId,
                detail: 1
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var data = oE.data;
                    console.log(data);
                    //套餐编号
                    $('.tanceng .pro_package_detail_code_sn').html(data['code_sn']);
                    //套餐名称
                    $('.tanceng .pro_package_detail_name').html(data['name']);
                    //包含商品信息
                    var datalist = data['package_info'];
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
                            <div class="t_left" style="color:#666;font-weight: 600;max-width: 10em;"><i class="c_r">*</i>商品'+(i+1)+'</div>\
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
                            <th width="580">属性</th>\
                            <th width="40" style="font-weight: 100;">数量</th>\
                            </tr>\
                            </thead>\
                            <tbody>'+goodsInfoList+'</tbody>\
                        </table>\
                        </div>\
                        </div>\
                        </div>\
                        </div>\
                        </div>';
                    });
                    $('.tanceng .pro_package_detail_info_list').html(goodsList);
                }
            },
            error: function (e) {
            }
        });
    });

    //查看套餐商品价格
    $('.pro_package_look_nav_ul li:nth-of-type(2)').die('click').live('click', function () {
        $.ajax({
            url: SERVER_URL + '/product-package/pricebyid',
            type: 'GET',
            data: {
                token: token,
                package_id: curProPackageId
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    $('.pro_package_detail_price').html(oE.data.total_new_price);
                }
            },
            error: function (e) {
            }
        });
    });

    //新建套餐商品参数
    var proPackageCreateData = {
        token: token,
        name: '', //套餐名称
        status: '', //是否启用状态：0正常 1停用
        remark: '', //备注
        product_info: '', //商品明细
        code_sn: '', //套餐编号
        id: 0 //ID编号（不为空时 则修改记录）
    };

    var proPackageCreateGoodsChosenArr = [];
    var proPackageCreateGoodsInfoChosenArr = [];
    //新建套餐商品
    $('.pro_package_create_btn').die('click').live('click', function () {
        proPackageCreateData = {
            token: token,
            name: '', //套餐名称
            status: '', //是否启用状态：0正常 1停用
            remark: '', //备注
            product_info: '', //商品明细
            code_sn: '', //套餐编号
            id: 0 //ID编号（不为空时 则修改记录）
        };
        //创建人
        $('.tanceng .pro_package_create_uname').html(uname);
        //创建日期
        $('.tanceng .pro_package_create_date').html(getCurrentDateDay());
        //编号
        $('.tanceng .pro_package_create_code_sn').val(likGetCodeFn("TC"));
        //清空原有数组
        proPackageCreateGoodsChosenArr = [];
        proPackageCreateGoodsInfoChosenArr = [];
    });

    //选择商品

    //商品分类参数
    var proPackageCreateChooseGoodsCateListData = {
        token: token,
        category: 1, //类型 1.商品 2.整机商品
        name: '', // 分类名称
        detail: 1 // 是否获取各类型的数量总数 0 否 1 是
    };
    //商品分类
    function proPackageCreateChooseGoodsSortFn() {
        $.ajax({
            url: SERVER_URL + '/product-category/list',
            type: 'GET',
            data: proPackageCreateChooseGoodsCateListData,
            dataType: 'json',
            async: false,
            success: function (oE) {
                var datalist = oE.dataList;
                var goodsCateListHtml = '';
                $.each(datalist, function (i, v) {
                    goodsCateListHtml += '<li goodscateid="' + v['id'] + '" class="' + (i == 0 ? 'Sideslip_list_on' : '') + '"><span>' + v['name'] + '</span></li>';
                });
                $('.tanceng .pro_package_create_choose_goods_cate_list').html(goodsCateListHtml);
                getGoodsListByCateFn($('.tanceng .pro_package_create_choose_goods_cate_list li:nth-of-type(1)').attr('goodscateid'));
            },
            error: function (e) {
            }
        });
    }

    //商品分类搜索功能
    $('.pro_package_create_choose_goods_cate_search_btn').die('click').live('click', function () {
        if ($('.pro_package_create_choose_goods_cate_search_inp').val() == '') {
            return false;
        }
        $('.tanceng .pro_package_create_choose_goods_inp_add_list').html('<li style="margin-top: 1px;">' + $('.pro_package_create_choose_goods_cate_search_inp').val() + ' <i></i></li>');
        proPackageCreateChooseGoodsCateListData.name = $('.pro_package_create_choose_goods_cate_search_inp').val();
        proPackageCreateChooseGoodsSortFn();
        $('.pro_package_create_choose_goods_cate_search_inp').val('').attr('readonly', true);
    });

    //商品分类 - 删除搜索项
    $('.tanceng .pro_package_create_choose_goods_inp_add_list li i').die('click').live('click', function () {
        $(this).closest('li').remove();
        proPackageCreateChooseGoodsCateListData.name = '';
        proPackageCreateChooseGoodsSortFn();
        $('.pro_package_create_choose_goods_cate_search_inp').val('').attr('readonly', false);
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
    $('.pro_package_create_choose_goods_cate_list li').die('click').live('click', function () {
        $('.pro_package_create_choose_goods_search_inp').val('搜索商品编号/商品名称').css('#ccc');
        getGoodsListData.key = '';
        getGoodsListData.page = 1;
        getGoodsListByCateFn($(this).attr('goodscateid'));
    });
    //获取基本商品列表
    function proPackageCreateChooseGoodsFn() {
        $.ajax({
            url: SERVER_URL + '/product/list',
            type: 'GET',
            data: getGoodsListData,
            dataType: 'json',
            success: function (oE) {
                //搜索结果
                $('.tanceng .pro_package_create_choose_goods_totals').html(oE.totalcount);
                var datalist = oE.dataList;
                if (datalist.length == 0) {
                    $('.pro_package_create_choose_goods_nodata_box').removeClass('none');
                    $('.pro_package_create_choose_goods_handle').addClass('none');
                } else {
                    $('.pro_package_create_choose_goods_nodata_box').addClass('none');
                    $('.pro_package_create_choose_goods_handle').removeClass('none');
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
                    goodsListHtml += '<tr goodsid="' + v['id'] + '" goodstaxtype="' + v['taxtype'] + '" goodsattr="' + goodsAttrValueText + '" goodsretailprice="' + v['retail_price'] + '" goodslowerprice="' + v['lower_price'] + '" goodscostprice="' + v['cost_price'] + '">\
                                        <td><input type="checkbox"></td>\
                                        <td>' + l_dbl(i + 1) + '</td>\
                                        <td class="goodscodesn">' + v['code_sn'] + '</td>\
                                        <td class="goodsname">' + v['name'] + '</td>\
                                        <td class="goodsunitname">' + v['unit_name'] + '</td>' + goodsAttrValue + '\
                                        <td>' + v['remark'] + '</td>\
                                        </tr>'
                });
                //表头
                $('.tanceng .pro_package_create_choose_goods_list_thead').html('<tr><th>选择</th><th>序号</th><th>商品编号</th><th>名称</th><th>基本单位</th>' + goodsAttrName + '<th>备注</th></tr>');
                //表格主体
                $('.tanceng .pro_package_create_choose_goods_list').html(goodsListHtml);
                //分页
                list_table_render_pagination('.pro_package_create_choose_goods_pagination', getGoodsListData, proPackageCreateChooseGoodsFn, oE.totalcount, datalist.length);
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
            $('.pro_package_create_choose_goods_list').addClass('none');
            $('.pro_package_create_choose_goods_handle').addClass('none');
            $('.pro_package_create_choose_goods_nodata_box').removeClass('none');
            return false;
        } else {
            getGoodsListData.cate_id = cateid;
            $('.pro_package_create_choose_goods_list').removeClass('none');
            $('.pro_package_create_choose_goods_handle').removeClass('none');
            $('.pro_package_create_choose_goods_nodata_box').addClass('none');
        }
        proPackageCreateChooseGoodsFn();
        getGoodsCateAttrListFn(cateid);
    }
    //商品属性高级搜索
    $('.tanceng .goods_attr_search_table li').live('click', function () {
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
        getGoodsListData.cate_id = $('.pro_package_create_choose_goods_cate_list li.Sideslip_list_on').attr('goodscateid');
        getGoodsListData.attr = arrayToJson(attrSearchField);
        proPackageCreateChooseGoodsFn();
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
                    console.log(datalist);
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
    $('.tanceng .pro_package_create_choose_goods_search_btn').die('click').live('click', function () {
        if ($('.tanceng .pro_package_create_choose_goods_search_inp').val() == '搜索商品编号/商品名称') {
            getGoodsListData.key = '';
        } else {
            getGoodsListData.key = $('.tanceng .pro_package_create_choose_goods_search_inp').val();
        }
        proPackageCreateChooseGoodsFn();
    });

    //选择商品
    $('.tanceng .pro_package_create_choose_goods_btn').die('click').live('click', function () {
        proPackageCreateChooseGoodsSortFn();
        $(".tanceng .sp_new_tc").find(".goods_tc_new_inputbox").css({'width':'50%','margin-left':'0'});
    });
    //添加 - 选择商品
    $('.tanceng .pro_package_create_choose_goods_tj_btn').die('click').live('click', function () {
        proPackageCreateChooseGoodsSortFn();
        $('.tanceng .pro_package_create_choose_goods_cate_list li').eq($(this).attr('cateindex')).trigger('click');
    });

    //选择商品保存
    $('.tanceng .pro_package_create_choose_goods_save_btn').die('click').live('click', function () {
        $.each($('.tanceng .pro_package_create_choose_goods_list tr'), function (i, v) {
            if ($('.tanceng .pro_package_create_choose_goods_list tr').eq(i).find('input:checkbox').attr('checked') == 'checked') {
                proPackageCreateGoodsChosenArr.push({
                    "cateName": $('.tanceng .pro_package_create_choose_goods_cate_list .Sideslip_list_on').text(),
                    "cateIndex": $('.tanceng .pro_package_create_choose_goods_cate_list .Sideslip_list_on').index(),
                    "goodsId": $('.tanceng .pro_package_create_choose_goods_list tr').eq(i).attr('goodsid'),
                    "goodsAttr": $('.tanceng .pro_package_create_choose_goods_list tr').eq(i).attr('goodsattr')
                });
            }
        });
        proPackageCreateGoodsInfoChosenArr = likSeparateArr(getJsonArr(proPackageCreateGoodsChosenArr), 'cateName', 'cateIndex');
        $(this).closest('.dialog_box').remove();
        if (proPackageCreateGoodsInfoChosenArr.length == 0) {
            $('.tanceng .pro_package_create_goods_chosen_list').addClass('none');
            $('.tanceng .pro_package_create_goods_dialog_content').width(540);
            $(".tanceng .sp_new_tc").find(".goods_tc_new_inputbox").css({'width':'','margin-left':''});
        } else {
            $('.tanceng .pro_package_create_goods_chosen_list').removeClass('none');
            $('.tanceng .pro_package_create_goods_dialog_content').width(1000);

        }
        //选中的商品信息展示
        var goodsInfoListHtml = '';
        $.each(proPackageCreateGoodsInfoChosenArr, function (i, v) {
            var goodsInfoHtml = '';
            $.each(v['children'], function (i2, v2) {
                goodsInfoHtml += '<tr goodsid="' + v2['goodsId'] + '">\
                                    <td>' + v2['goodsAttr'] + '</td>\
                                    <td><div class="num_input inline_block num_input_new"><button class="but_blue but_opa_small inp_plus">+</button><input type="text" value="1"><button class="but_blue but_opa_small radius_left_0 inp_reduce">-</button></div></td>\
                                    <td><button class="but_mix but_r val_dialogTop pro_package_create_goods_child_del_btn">删除</button></td>\
                                    </tr>';
            });
            goodsInfoListHtml += '<div class="worksp_addbx">\
                <div class="t_textinput relative" style="margin: 10px 0 5px;">\
                <div class="t_left" style="color:#666;font-weight: 600;max-width: 10em;"><i class="c_r">*</i>商品<span>(<cite class="pro_package_choose_goods_parent_index_num">' + (i + 1) + '</cite>)</span></div>\
            </div>\
            <div class="box_Open cg_cgbjd_newCon xs_shd_newCon page_108_shdSP">\
                <div class="box_open_list goods_tc_toggle">\
                <p class="box_open_head">\
                <span class="cont_title" style="padding-left: 0;margin-left: 0;">' + v['parent'].split('-')[1] + '</span>\
                <span>\
                <button class="but_mix val_dialogTop pro_package_create_choose_goods_tj_btn" name="sp_set_tcNew" cateindex="' + v['parent'].split('-')[0] + '">添加</button><button class="but_r but_mix val_dialogTop pro_package_create_goods_parent_del_btn" goodsparentindex="' + (i + 1) + '">删除</button>\
                </span>\
                <span class="box_open_btn" style="right: 13px;">收起 <i class="right icon_show"></i></span>\
                </p>\
                <div class="div_1 container">\
                <div class="div_1 table-container">\
                <table>\
                <thead>\
                <tr>\
                <th width="750">属性</th>\
                <th width="120">数量</th>\
                <th width="50">操作</th>\
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
        console.log(goodsInfoListHtml);
        $('.tanceng .pro_package_create_goods_chosen_list').html(goodsInfoListHtml);
    });
    //删除商品大类
    var goodsParentIndex = null;
    $('.tanceng .pro_package_create_goods_parent_del_btn').die('click').live('click', function () {
        goodsParentIndex = $(this).closest('.worksp_addbx').index();//在子商品中查找并删除
        for (var i = 0; i < proPackageCreateGoodsChosenArr.length; i++) {
            if (proPackageCreateGoodsChosenArr[i]['cateName'] == proPackageCreateGoodsInfoChosenArr[goodsParentIndex]['parent'].split('-')[1]) {
                proPackageCreateGoodsChosenArr.splice(i, 1);
                i--;
            }
        }
        //proPackageCreateGoodsInfoChosenArr.splice(goodsParentIndex, 1);
        $('.tanceng .pro_package_create_goods_chosen_list .worksp_addbx').eq(goodsParentIndex).remove();
        $.each($('.tanceng .pro_package_create_goods_chosen_list .worksp_addbx'), function (i, v) {
            $('.tanceng .pro_package_create_goods_chosen_list .worksp_addbx').eq(i).find('.pro_package_choose_goods_parent_index_num').html(i + 1)
        });
        if(proPackageCreateGoodsChosenArr.length == 0){
            $('.tanceng .pro_package_create_goods_dialog_content').width(540);
            $(".tanceng .sp_new_tc").find(".goods_tc_new_inputbox").css({'width':'','margin-left':''});
        }else{
            $('.tanceng .pro_package_create_goods_dialog_content').width(1000);
            $(".tanceng .sp_new_tc").find(".goods_tc_new_inputbox").css({'width':'50%','margin-left':'0'});
        }
    });
    //删除子商品
    var goodsChildId = null;
    var goodsChildIndex = null;
    $('.tanceng .pro_package_create_goods_child_del_btn').die('click').live('click', function () {
        goodsParentIndex = $(this).closest('.worksp_addbx').index();
        goodsChildIndex = $(this).closest('tr').index();
        goodsChildId = $(this).closest('tr').attr('goodsid');
        //在子商品中查找并删除
        for (var i = 0; i < proPackageCreateGoodsChosenArr.length; i++) {
            if (proPackageCreateGoodsChosenArr[i]['goodsId'] == goodsChildId) {
                proPackageCreateGoodsChosenArr.splice(i, 1);
            }
        }
        $('.tanceng .pro_package_create_goods_chosen_list .worksp_addbx').eq(goodsParentIndex).find('tbody tr').eq(goodsChildIndex).remove();
    });

    //新建套餐商品 - 提交
    $('.tanceng .pro_package_create_submit_btn').die('click').live('click', function () {
        //套餐编号
        proPackageCreateData.code_sn = $('.tanceng .pro_package_create_code_sn').val();
        //套餐名称
        if($('.tanceng .pro_package_create_name').val() == '请输入套餐名称'){
            alert('请输入套餐名称');
            return false;
        }else{
            proPackageCreateData.name = $('.tanceng .pro_package_create_name').val();
        }
        if($('.tanceng .pro_package_create_goods_chosen_list>div').length == 0){
            alert('请选择商品');
            return false;
        }else{
            var goodsInfoList = [];
            $.each($('.tanceng .pro_package_create_goods_chosen_list tbody tr'), function (i, v) {
                goodsInfoList.push({
                    product_id: $('.tanceng .pro_package_create_goods_chosen_list tbody tr').eq(i).attr('goodsid'),
                    num: $('.tanceng .pro_package_create_goods_chosen_list tbody tr').eq(i).find('input:text').val()
                });
            });
            proPackageCreateData.product_info = arrayToJson(goodsInfoList);
        }
        if($('.tanceng .pro_package_create_qy_btn').is(':checked')){
            proPackageCreateData.status = 0;
        }else if($('.tanceng .pro_package_create_ty_btn').is(':checked')){
            proPackageCreateData.status = 1;
        }
        //备注
        if($('.tanceng .pro_package_create_note_textarea').val() == '请输入备注'){
            proPackageCreateData.remark = '';
        }else{
            proPackageCreateData.remark = $('.tanceng .pro_package_create_note_textarea').val();
        }
        $.ajax({
            url: SERVER_URL + '/product-package/add',
            type: 'POST',
            data: proPackageCreateData,
            dataType: 'json',
            success: function (oE) {
                if(oE.code == 0){
                    $('.tanceng').css('display', 'none').find('.dialog_box').remove();
                    getProPackageListFn();
                }
            },
            error: function(e){
            }
        });
    });

    //编辑套餐商品
    $('.pro_package_edit_btn').die('click').live('click', function () {
        curProPackageId = $(this).closest('tr').attr('packageid');
        getEditPackageDetailFn(curProPackageId);
        proPackageCreateData.id = curProPackageId;
    });
    //查看中编辑套餐商品
    $('.pro_package_detail_more_edit_btn').die('click').live('click', function () {
        $('.right_sidebar_h').trigger('click');
        getEditPackageDetailFn(curProPackageId);
        proPackageCreateData.id = curProPackageId;
    });
    //编辑中获取套餐商品详情函数
    function getEditPackageDetailFn(packageId){
        //清空原有数组
        proPackageCreateGoodsChosenArr = [];
        proPackageCreateGoodsInfoChosenArr = [];
        $.ajax({
            url: SERVER_URL + '/product-package/loadpackage',
            type: 'GET',
            data: {
                token: token,
                id: packageId,
                detail: 1
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var data = oE.data;
                    //创建人
                    $('.tanceng .pro_package_create_uname').html(data['user_name']);
                    //创建日期
                    $('.tanceng .pro_package_create_date').html(data['created_at']);
                    //套餐编号
                    $('.tanceng .pro_package_create_code_sn').val(data['code_sn']);
                    //套餐名称
                    $('.tanceng .pro_package_create_name').val(data['name']);
                    //包含商品信息
                    var datalist = data['package_info'];
                    var goodsList = '';
                    $.each(datalist, function (i, v) {
                        var goodsInfoList = '';
                        $.each(v['list'], function (i2, v2) {

                            var goodsInfoAttrList = '';
                            $.each(v2['attributes'], function (i3, v3) {
                                goodsInfoAttrList += v3['name'] + '/' + v3['value'] + ','
                            });
                            goodsInfoAttrList = goodsInfoAttrList.slice(0, goodsInfoAttrList.length - 1);
                            proPackageCreateGoodsChosenArr.push({
                                "cateIndex": 0,
                                "cateName": v2['name'],
                                "goodsAttr": goodsInfoAttrList,
                                "goodsId": v2['id'],
                                "goodsNum": v2['num']
                            });
                        });
                        proPackageCreateGoodsInfoChosenArr = likSeparateArr(getJsonArr(proPackageCreateGoodsChosenArr), 'cateName', 'cateIndex');
                        $(this).closest('.dialog_box').remove();
                        if (proPackageCreateGoodsInfoChosenArr.length == 0) {
                            $('.tanceng .pro_package_create_goods_chosen_list').addClass('none');
                            $('.tanceng .pro_package_create_goods_dialog_content').width(540);
                        } else {
                            $('.tanceng .pro_package_create_goods_chosen_list').removeClass('none');
                            $('.tanceng .pro_package_create_goods_dialog_content').width(1100);
                        }
                        //选中的商品信息展示
                        var goodsInfoListHtml = '';
                        $.each(proPackageCreateGoodsInfoChosenArr, function (i, v) {
                            var goodsInfoHtml = '';
                            $.each(v['children'], function (i2, v2) {
                                goodsInfoHtml += '<tr goodsid="' + v2['goodsId'] + '">\
                                    <td>' + v2['goodsAttr'] + '</td>\
                                    <td><div class="num_input inline_block num_input_new"><button class="but_blue but_opa_small inp_plus">+</button><input type="text" value="'+v2['goodsNum']+'"><button class="but_blue but_opa_small radius_left_0 inp_reduce">-</button></div></td>\
                                    <td><button class="but_mix but_r val_dialogTop pro_package_create_goods_child_del_btn">删除</button></td>\
                                    </tr>';
                            });
                            goodsInfoListHtml += '<div class="worksp_addbx">\
                                <div class="t_textinput relative" style="margin: 10px 0 5px;">\
                                <div class="t_left" style="color:#666;font-weight: 600;max-width: 10em;"><i class="c_r">*</i>商品<span>(<cite class="pro_package_choose_goods_parent_index_num">' + (i + 1) + '</cite>)</span></div>\
                            </div>\
                            <div class="box_Open cg_cgbjd_newCon xs_shd_newCon page_108_shdSP">\
                                <div class="box_open_list goods_tc_toggle">\
                                <p class="box_open_head">\
                                <span class="cont_title" style="padding-left: 0;margin-left: 0;">' + v['parent'].split('-')[1] + '</span>\
                                <span>\
                                <button class="but_mix val_dialogTop pro_package_create_choose_goods_tj_btn" name="sp_set_tcNew" cateindex="' + v['parent'].split('-')[0] + '">添加</button><button class="but_r but_mix val_dialogTop pro_package_create_goods_parent_del_btn" goodsparentindex="' + (i + 1) + '">删除</button>\
                                </span>\
                                <span class="box_open_btn" style="right: 13px;">收起 <i class="right icon_show"></i></span>\
                                </p>\
                                <div class="div_1 container">\
                                <div class="div_1 table-container">\
                                <table>\
                                <thead>\
                                <tr>\
                                <th width="750">属性</th>\
                                <th width="120">数量</th>\
                                <th width="50">操作</th>\
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
                        $('.tanceng .pro_package_create_goods_chosen_list').html(goodsInfoListHtml);
                    });
                    //备注
                    $('.tanceng .pro_package_create_note_textarea').val(data['remark']);
                }
            },
            error: function (e) {
            }
        });
    }
});
