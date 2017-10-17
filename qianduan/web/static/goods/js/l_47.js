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

    $('.pro_goods_create_upload_img_btn').die('change').live('change', function () {
        ajaxSubmit($(this));
    });

    //	补零函数
    function l_dbl(x) {
        return x < 10 ? '0' + x : x;
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
            },
            error: function (oE) {
                alert('获取编号失败，请重试！');
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

    function moneyToFixed(money) {
        return money.toFixed(2);
    }

    //权限部分
    if (loginUserInfo['company_admin'] != 1) {
        var proGoodsPowerList = loginUserInfo['powerUrls'];
        var proGoodsAdd = 'product/add';
        var proGoodsUnitSetting = 'product-unit/list';
        var proGoodsQyTy = 'product/statuschange';
        var proGoodsdel = 'product/deldata';

        //新建基本商品 / 编辑
        var proGoodsEditBtnStatus = '';
        if ($.inArray(proGoodsAdd, proGoodsPowerList) == -1) {
            $('.pro_goods_create_btn').hide();
            proGoodsEditBtnStatus = 'none';
        } else {
            $('.pro_goods_create_btn').show();
            proGoodsEditBtnStatus = '';
        }

        //基本单位设置
        if ($.inArray(proGoodsUnitSetting, proGoodsPowerList) == -1) {
            $('.pro_goods_set_unit_btn').hide();
        } else {
            $('.pro_goods_set_unit_btn').show();
        }
        if ($.inArray(proGoodsAdd, proGoodsPowerList) == -1 && $.inArray(proGoodsUnitSetting, proGoodsPowerList) == -1) {
            $('#pro_goods_create_unit_nav').css('width', '74px');
        } else if ($.inArray(proGoodsAdd, proGoodsPowerList) != -1 && $.inArray(proGoodsUnitSetting, proGoodsPowerList) == -1) {
            $('#pro_goods_create_unit_nav').css('width', '178px');
        } else if ($.inArray(proGoodsAdd, proGoodsPowerList) == -1 && $.inArray(proGoodsUnitSetting, proGoodsPowerList) != -1) {
            $('#pro_goods_create_unit_nav').css('width', '202px');
        } else if ($.inArray(proGoodsAdd, proGoodsPowerList) != -1 && $.inArray(proGoodsUnitSetting, proGoodsPowerList) != -1) {
            $('#pro_goods_create_unit_nav').css('width', '284px');
        }

        //启用停用
        var proGoodsQyTyBtn = '';
        if ($.inArray(proGoodsQyTy, proGoodsPowerList) == -1) {
            proGoodsQyTyBtn = 'none';
        } else {
            proGoodsQyTyBtn = '';
        }

        //删除
        var proGoodsDelBtnStatus = '';
        if ($.inArray(proGoodsdel, proGoodsPowerList) == -1) {
            proGoodsDelBtnStatus = 'none';
        } else {
            proGoodsDelBtnStatus = '';
        }

        //商品的期初信息
        $('.pro_goods_qccgj').addClass('none');
    } else {
        $('.pro_goods_qccgj').removeClass('none');
    }

    var token, page, num, keywords, type;
    token = Admin.get_token();
    //token = '2017052516045457073-1-1';
    uid = Admin.get_uid();
    uname = loginUserInfo.username;
    //选择查看项
    var proGoodsNoListLookAbledField = [
        {'index': null, 'field': '基本单位'},
        {'index': null, 'field': '备注'}
    ];

    //商品分类
    var goodsCateListData = {
        token: token,
        category: 1, //类型 1.商品 2.整机商品
        name: '', // 分类名称
        detail: 1 // 是否获取各类型的数量总数 0 否 1 是
    };
    getGoodsCateListFn();
    //获取商品分类列表
    function getGoodsCateListFn() {
        $.ajax({
            url: SERVER_URL + '/product-category/list',
            type: 'GET',
            data: goodsCateListData,
            dataType: 'json',
            success: function (oE) {
                var datalist = oE.dataList;
                if (datalist.length == 0) {
                    $('.pro_goods_create_btn').removeClass('val_dialog').css('background', '#ccc');
                } else {
                    $('.pro_goods_create_btn').addClass('val_dialog').css('background', '#23a2f');
                }
                var goodsCateListHtml = '';
                $.each(datalist, function (i, v) {
                    goodsCateListHtml += '<li goodscateid="' + v['id'] + '" class="' + (i == 0 ? 'Sideslip_list_on' : '') + '"><span>' + v['name'] + '（' + v['num'] + '）</span></li>';
                });
                $('.pro_goods_cate_list_ul').html(goodsCateListHtml);
                getGoodsListByCateFn($('.pro_goods_cate_list_ul li:nth-of-type(1)').attr('goodscateid'));
                getGoodsCateAttrListFn($('.pro_goods_cate_list_ul li:nth-of-type(1)').attr('goodscateid'));
            },
            error: function (e) {
            }
        });
    }

    //商品分类搜索 - 删除关键字
    $('.lik_inp_add_list li i').die('click').live('click', function () {
        $(this).closest('li').remove();
        $('.pro_goods_cate_search_inp').val('').attr('readonly', false);
        goodsCateListData.name = '';
        getGoodsCateListFn();
    });
    //商品分类搜索功能
    $('.pro_goods_cate_search_btn').die('click').live('click', function () {
        if ($('.pro_goods_cate_search_inp').val() == '') {
            return false;
        }
        $('.lik_inp_add_list').html('<li style="margin-top: 1px;">' + $('.pro_goods_cate_search_inp').val() + ' <i></i></li>');
        goodsCateListData.name = $('.pro_goods_cate_search_inp').val();
        getGoodsCateListFn();
        $('.pro_goods_cate_search_inp').val('').attr('readonly', true);
    });
    //获取基本商品列表参数
    var getGoodsListData = {
        token: token,
        key: '', //关键字
        page: 1, //页码
        num: 10, //每页数量
        status: '', //是否启用状态 0正常 1停用
        unit_id: '', // 基本单位id
        cate_id: '', //分类id
        brand_id: '', //品牌ID
        attr: '' //属性
    };
    //选择商品分类切换商品列表
    $('.pro_goods_cate_list_ul li').die('click').live('click', function () {
        $('.pro_goods_list_search_inp').val('请输入关键字/商品编号').css('color', '#ccc');
        getGoodsListData.key = '';
        getGoodsListData.page = 1;
        getGoodsListByCateFn($(this).attr('goodscateid'));
    });
    //查看项需要用到一个变量
    var likLookFlag = true;
    //获取基本商品列表
    function getGoodsListFn() {
        $.ajax({
            url: SERVER_URL + '/product/list',
            type: 'GET',
            data: getGoodsListData,
            dataType: 'json',
            success: function (oE) {
                //搜索结果
                $('.pro_goods_search_num_total').html(oE.totalcount);
                var datalist = oE.dataList;
                if (datalist.length == 0) {
                    $('.pro_goods_list_nodata_box').removeClass('none');
                    $('.pro_goods_list_handle').addClass('none');
                } else {
                    $('.pro_goods_list_nodata_box').addClass('none');
                    $('.pro_goods_list_handle').removeClass('none');
                }
                var goodsListHtml = '';
                //停用状态
                var invalidStatusClass = '';
                //属性名
                var goodsAttrNameArr = getGoodsCateAttrTheadListFn(getGoodsListData.cate_id);
                var goodsAttrName = '';
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
                    if (v['status'] == 0) {
                        invalidStatusClass = '';
                        goodsOperateBtn = '<button class="' + proGoodsEditBtnStatus + ' but_mix but_exit val_dialog pro_goods_list_edit_btn" name="sp_exit_sp">编辑</button><button class="' + proGoodsQyTyBtn + ' but_mix but_r but_stop pro_goods_list_ty_btn">停用</button>';
                    } else if (v['status'] == 1) {
                        invalidStatusClass = 'grey';
                        goodsOperateBtn = '<button class="' + proGoodsQyTyBtn + ' but_mix but_stop but_lv pro_goods_list_qy_btn">启用</button><button class="' + proGoodsDelBtnStatus + ' but_mix but_r val_dialog pro_goods_list_del_btn" name="sp_base_bjzd">删除</button>';
                    }
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

                    //列表内容
                    goodsListHtml += '<tr goodsid="' + v['id'] + '" class="' + invalidStatusClass + '">\
                                        <td>' + l_dbl(i + 1) + '</td>\
                                        ' + goodsAttrValue + '\
                                        <td>' + v['remark'] + '</td>\
                                        <td>\
                                        <button class="but_mix but_look r_sidebar_btn but_look pro_goods_list_look_btn" name="sp_sp_msg">查看</button>' + goodsOperateBtn + '</td>\
                                        </tr>'
                });
                //<td>' + v['code_sn'] + '</td><td>' + v['unit_name'] + '</td>\ <td>' + v['name'] + '</td>\
                //表头
                $('.pro_goods_list_thead').html('<tr><th>序号</th><!--<th>商品编号</th>--><!--<th>名称</th><!--<th>基本单位</th>-->' + goodsAttrName + '<th>备注</th><th>操作</th></tr>');
                //表格搜索项
                $('.pro_goods_list_search_tbody').html('<td>\
                                                        <div class="inline_block select_mormal select_p" style="background: #f5f5f5">\
                                                        <input type="text" class="select_input block" readonly="true" >\
                                                        </div>\
                                                        </td>\
                                                        <td>\
                                                        <div class="inline_block select_mormal select_p" style="background: #f5f5f5">\
                                                        <input type="text" class="select_input block" readonly="true" >\
                                                        </div>\
                                                        </td>\
                                                        <td>\
                                                        <div class="inline_block select_mormal select_p" style="background: #f5f5f5">\
                                                        <input type="text" class="select_input block" readonly="true" >\
                                                        </div>\
                                                        </td>\
                                                        <td>\
                                                        <div class="inline_block select_mormal select_p" style="background: #f5f5f5">\
                                                        <input type="text" class="select_input block" readonly="true" >\
                                                        </div>\
                                                        </td>');
                //表格主体
                $('.pro_goods_list_tbody').html(goodsListHtml);
                likShow('#pro_goods_list_table', proGoodsNoListLookAbledField, '#pro_goods_list_look_field_ul', '#pro_goods_list_look_save', '#pro_goods_list_look_reset');
                /*if (likLookFlag) {
                 likShow('#pro_goods_list_table', proGoodsNoListLookAbledField, '#pro_goods_list_look_field_ul', '#pro_goods_list_look_save', '#pro_goods_list_look_reset');
                 likLookFlag = false;
                 } else {
                 $('#pro_goods_list_look_save').trigger('click');
                 }*/
                //分页
                list_table_render_pagination('.pro_goods_list_page', getGoodsListData, getGoodsListFn, oE.totalcount, datalist.length);
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
        attrSearch = [];
        attrTemp = [];
        getGoodsListData.attr = '';
        if (cateid == undefined) {
            $('.pro_goods_list_tbody').addClass('none');
            $('.pro_goods_list_handle').addClass('none');
            $('.pro_goods_list_nodata_box').removeClass('none');
            return false;
        } else {
            getGoodsListData.cate_id = cateid;
            $('.pro_goods_list_tbody').removeClass('none');
            $('.pro_goods_list_handle').removeClass('none');
            $('.pro_goods_list_nodata_box').addClass('none');
        }
        getGoodsListFn();
        getGoodsCateAttrListFn(cateid);
    }

    //商品属性高级搜索
    $('.goods_attr_search_table li').die('click').live('click', function () {
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
        getGoodsListData.cate_id = $('.pro_goods_cate_list_ul li.Sideslip_list_on').attr('goodscateid');
        getGoodsListData.attr = arrayToJson(attrSearchField);
        getGoodsListFn();
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
                    $('.goods_attr_search_table').html(cateAttrList);
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
    $('.pro_goods_list_search_btn').die('click').live('click', function () {
        getGoodsListData.cate_id = $('.pro_goods_cate_list_ul li.Sideslip_list_on').attr('goodscateid');
        if ($('.pro_goods_list_search_inp').val() == '请输入关键字/商品编号') {
            getGoodsListData.key = '';
        } else {
            getGoodsListData.key = $('.pro_goods_list_search_inp').val();
        }
        getGoodsListFn();
    });
    //不显示停用商品
    $('#pro_goods_list_noshow_invalid_btn').die('click').live('click', function () {
        if ($(this).attr('checked') == 'checked') {
            getGoodsListData.status = 0;
        } else {
            getGoodsListData.status = '';
        }
        getGoodsListFn();
    });
    //定义当前操作id
    var curProGoodsListOpeId = null;
    //定义启用停用参数
    var proGoodsQyTyData = {
        token: token,
        id: '',
        status: '' //是否启用状态 0正常 1停用
    };
    //启用停用函数
    function proGoodsQyTyFn() {
        $.ajax({
            url: SERVER_URL + '/product/statuschange',
            type: 'POST',
            data: proGoodsQyTyData,
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    getGoodsListFn();
                }
            },
            error: function (e) {
            }
        });
    }

    //启用
    $('.pro_goods_list_qy_btn').die('click').live('click', function () {
        proGoodsQyTyData.id = $(this).closest('tr').attr('goodsid');
        proGoodsQyTyData.status = 0;
        proGoodsQyTyFn();
    });
    //停用
    $('.pro_goods_list_ty_btn').die('click').live('click', function () {
        proGoodsQyTyData.id = $(this).closest('tr').attr('goodsid');
        proGoodsQyTyData.status = 1;
        proGoodsQyTyFn();
    });
    //删除商品
    $('.pro_goods_list_del_btn').die('click').live('click', function () {
        curProGoodsListOpeId = $(this).closest('tr').attr('goodsid');
    });
    //删除商品 - 确定
    $('.pro_goods_list_del_submit_btn').die('click').live('click', function () {
        var $_this = $(this);
        $.ajax({
            url: SERVER_URL + '/product/deldata',
            type: 'POST',
            data: {
                token: token,
                id: curProGoodsListOpeId
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    $_this.closest('.dialog_box').remove();
                    $('.tanceng').css('display', 'none');
                    getGoodsCateListFn();
                }
            },
            error: function (e) {
            }
        });
    });
    //获取基本单位列表函数
    function getProGoodsSetUnitListFn() {
        $.ajax({
            url: SERVER_URL + '/product-unit/list',
            type: 'POST',
            data: {token: token},
            dataType: 'json',
            success: function (oE) {
                var datalist = oE.datalist;
                var goodsUnitHtml = '';
                var datalistLen = datalist.length;
                $('.tanceng .pro_goods_set_unit_num_total').html(datalistLen);
                $.each(datalist, function (i, v) {
                    goodsUnitHtml += '<tr goodsunitid="' + v['id'] + '">\
                                        <td>' + l_dbl(i + 1) + '</td>\
                                        <td>' + v['name'] + '</td>\
                                        <td>\
                                        <button class="but_mix but_exit val_dialogTop pro_goods_unit_edit_btn" name="goods_base_exit_sp">修改</button>\
                                        <button class="but_mix but_r val_dialogTop pro_goods_unit_del_btn" name="pro_goods_unit_del_dialog">删除</button>\
                                        </td>\
                                        </tr>'
                });
                $('.tanceng .pro_goods_set_unit_list_tbody').html(goodsUnitHtml);
            },
            error: function (e) {
            }
        });
    }

    //添加基本单位
    $('.pro_goods_set_unit_btn').die('click').live('click', function () {
        getProGoodsSetUnitListFn();
    });
    //基本单位排序
    var curGoodsUnitId = null;
    $('.tanceng .pro_goods_unit_sort_btn').die('click').live('click', function () {
        curGoodsUnitId = $(this).closest('tr').attr('goodsunitid');
        var sortStatus = $(this).attr('sortstatus');
        $.ajax({
            url: SERVER_URL + '/product-unit/sort',
            type: 'GET',
            data: {
                token: token,
                id: curGoodsUnitId,
                status: sortStatus
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    getProGoodsSetUnitListFn();
                }
            },
            error: function (e) {
            }
        });
    });
    //新建基本单位
    $('.tanceng .pro_goods_unit_create_submit_btn').die('click').live('click', function () {
        var $_this = $(this);
        if ($('.tanceng .pro_goods_unit_create_name_inp').val() == '输入名称') {
            alert('请输入单位名称');
            return false;
        } else {
            $.ajax({
                url: SERVER_URL + '/product-unit/add',
                type: 'POST',
                data: {token: token, id: 0, name: $('.tanceng .pro_goods_unit_create_name_inp').val()},
                dataType: 'json',
                success: function (oE) {
                    if (oE.code == 0) {
                        $_this.closest('.dialog_box').remove();
                        getProGoodsSetUnitListFn();
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
    $('.tanceng .pro_goods_unit_edit_btn').die('click').live('click', function () {
        curGoodsUnitId = $(this).closest('tr').attr('goodsunitid');
        $('.tanceng .pro_goods_unit_edit_name_inp').val($(this).closest('tr').find('td').eq(1).html());
    });
    //修改基本单位 - 确认
    $('.tanceng .pro_goods_unit_edit_submit_btn').die('click').live('click', function () {
        var $_this = $(this);
        if ($('.tanceng .pro_goods_unit_edit_name_inp').val() == '输入名称') {
            alert('请输入单位名称');
            return false;
        } else {
            $.ajax({
                url: SERVER_URL + '/product-unit/add',
                type: 'POST',
                data: {token: token, id: curGoodsUnitId, name: $('.tanceng .pro_goods_unit_edit_name_inp').val()},
                dataType: 'json',
                success: function (oE) {
                    if (oE.code == 0) {
                        $_this.closest('.dialog_box').remove();
                        getProGoodsSetUnitListFn();
                    }
                },
                error: function (e) {
                }
            });
        }
    });
    //删除基本单位
    $('.tanceng .pro_goods_unit_del_btn').die('click').live('click', function () {
        curGoodsUnitId = $(this).closest('tr').attr('goodsunitid');
    });
    //删除基本单位 确认
    $('.tanceng .pro_goods_unit_del_submit_btn').die('click').live('click', function () {
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
                    getProGoodsSetUnitListFn();
                }
            },
            error: function (e) {
            }
        });
    });

    //刷新
    $('#pro_goods_refresh_btn').die('click').live('click', function () {
        getGoodsListData.status = '';
        getGoodsListData.key = '';
        $('#pro_goods_list_noshow_invalid_btn').attr('checked', false);
        $('.pro_goods_list_search_inp').val('请输入关键字/商品编号').css('color', '#ccc');
        if ($('ul.lik_inp_add_list li').length > 0) {
            $('ul.lik_inp_add_list li i').trigger('click');
        } else {
            $('.pro_goods_cate_search_inp').val('');
        }
        //属性搜索
        $('.goods_attr_search_table input').val('待选择').css('color', '#ccc');
        getGoodsListData.cate_id = $('.pro_goods_cate_list_ul li.Sideslip_list_on').attr('goodscateid');
        getGoodsListData.attr = '';
        attrSearch = [];
        attrTemp = [];
        getGoodsListFn();
    });

    //查看
    $('.pro_goods_list_look_btn').die('click').live('click', function () {
        $('.pro_goods_detail_nav ul li:nth-of-type(1)').trigger('click');
        curProGoodsListOpeId = $(this).closest('tr').attr('goodsid');
        $.ajax({
            url: SERVER_URL + '/product/loadproduct',
            type: 'GET',
            data: {
                token: token,
                id: curProGoodsListOpeId
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var data = oE.data;
                    //创建日期
                    $('.pro_goods_list_detail_created_at').html(data['created_at']);
                    //创建人
                    $('.pro_goods_list_detail_user_name').html(data['user_name']);
                    //产品图数组
                    if (data['image_url']) {
                        var productImgArr = data['image_url'].split(',');
                        $('.pro_goods_list_detail_img_num_total').html(productImgArr.length);
                        $('.pro_goods_list_detail_img').attr('src', getImgUrl(productImgArr[0]));
                        $('.pro_look_img_btn').addClass('val_dialog');
                        $('.pro_look_img_btn').live('click', function () {
                            var lik_max_width = $('.lik_img_auto_box').width();
                            var lik_max_height = $('.lik_img_auto_box').height();
                            var lik_img_width = 0;
                            var lik_img_height = 0;
                            $('.sp_ck_img').live('click', function () {
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
                            $('.tanceng .goods_icon_pre').live('click', function () {
                                goods_img--;
                                if (goods_img == -1) {
                                    goods_img = goods_arr.length - 1;
                                }
                                $('.tanceng .image_box_content_img').attr('src', getImgUrl(goods_arr[goods_img]));
                                $('.tanceng .goods_icon_page').html((goods_img + 1) + '/' + goods_arr.length);
                                //likImgAutoFn();
                            });
                            $('.tanceng .goods_icon_nxt').live('click', function () {
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
                    //更多列表
                    if (data['status'] == 0) {
                        $('.pro_goods_list_detail_more_ul').html('<li class="' + proGoodsEditBtnStatus + ' val_dialog pro_goods_detail_more_edit_btn" name="sp_exit_sp">编辑</li><li class="' + proGoodsQyTyBtn + ' pro_goods_list_detail_ty_btn">停用</li>');
                    } else {
                        $('.pro_goods_list_detail_more_ul').html('<li class="' + proGoodsQyTyBtn + ' pro_goods_list_detail_qy_btn">启用</li><li class="' + proGoodsDelBtnStatus + ' val_dialog pro_goods_list_detail_del_btn" name="sp_base_bjzd">删除</li>');
                    }
                    //商品编号
                    $('.pro_goods_list_detail_code_sn').html(data['code_sn']);
                    //商品名称
                    $('.pro_goods_list_detail_name').html(data['name']);
                    //基本单位
                    $('.pro_goods_list_detail_unit_name').html(data['unit_name']);
                    //商品属性
                    var goodsAttrList = '';
                    $.each(data['attributes'], function (i, v) {
                        goodsAttrList += '<p class="l-s-x">' + v['name'] + '：<span>' + v['value'] + '</span></p>'
                    });
                    $('.pro_goods_detail_attr_list').html(goodsAttrList);
                    //备注
                    $('.pro_goods_list_detail_remark').html(data['remark']);
                    //最低库存
                    $('.pro_goods_list_detail_lower_limit').html(data['lower_limit']);
                    //最高库存
                    $('.pro_goods_list_detail_top_limit').html(data['top_limit']);
                    //启用商品
                    if (data['status'] == 0) {
                        $('.pro_goods_list_detail_status').html('启用');
                    } else {
                        $('.pro_goods_list_detail_status').html('停用');
                    }
                    //期初信息
                    var qichuInfo = '';
                    $.each(data['qichu_info'], function (i, v) {
                        qichuInfo += '<p class="l-s-x">' + v['warehouse_name'] + '：<span>' + v['num'] + '</span></p>';
                    });
                    $('.pro_goods_list_detail_qichu_info').html(qichuInfo);
                    //期初信息 - 总和
                    $('.pro_goods_list_detail_qichu_total').html(data['qichu_total']);
                    //采购价
                    $('.pro_goods_list_detail_purchase_price').html(data['purchase_price']);
                    //价格详情
                    $('.pro_goods_detail_price_list').html('<div class="l-s-x clearfix">\
                                                                <p class="left" style="margin-right:30px;">成本价：<span>' + data['cost_price'] + '元</span></p>\
                                                            <p class="left c_r ' + (data['taxtype'] == 0 ? 'none' : '') + '">含税价：<span>' + moneyToFixed(data['cost_price'] * 1.17) + '</span><i class="c_9">（含增值税17%）</i></p></div>\
                                                            <div class="l-s-x clearfix">\
                                                                <p class="left" style="margin-right:30px;">零售价：<span>' + data['retail_price'] + '元</span></p>\
                                                            <p class="left c_r ' + (data['taxtype'] == 0 ? 'none' : '') + '">含税价：<span>' + moneyToFixed(data['retail_price'] * 1.17) + '</span><i class="c_9">（含增值税17%）</i></p></div>\
                                                            <div class="l-s-x clearfix">\
                                                                <p class="left" style="margin-right:30px;">最低价：<span>' + data['lower_price'] + '元</span></p>\
                                                            <p class="left c_r ' + (data['taxtype'] == 0 ? 'none' : '') + '">含税价：<span>' + moneyToFixed(data['lower_price'] * 1.17) + '</span><i class="c_9">（含增值税17%）</i></p>\
                                                            </div>')
                }
            },
            error: function (e) {
            }
        });
    });
    $('.tanceng .img_detail_close_btn').live('click', function () {
        $('.tanceng').css("display", 'none').children('div').remove();
    });
    //查看中的启用
    $('.pro_goods_list_detail_qy_btn').die('click').live('click', function () {
        $('.right_sidebar_h').trigger('click');
        proGoodsQyTyData.id = curProGoodsListOpeId;
        proGoodsQyTyData.status = 0;
        proGoodsQyTyFn();
    });
    //查看中的停用
    $('.pro_goods_list_detail_ty_btn').die('click').live('click', function () {
        $('.right_sidebar_h').trigger('click');
        proGoodsQyTyData.id = curProGoodsListOpeId;
        proGoodsQyTyData.status = 1;
        proGoodsQyTyFn();
    });
    //查看中的删除
    $('.pro_goods_list_detail_del_btn').die('click').live('click', function () {
        $('.right_sidebar_h').trigger('click');
    });

    //新建商品参数
    var proGoodsCreateData = {
        token: token,
        name: '', //商品名称
        code_sn: '', //商品编号
        unit_id: '', //基本单位id
        brand_id: 0, //品牌ID
        cate_id: '', //分类id
        status: '', //是否启用状态 0正常 1停用
        taxtype: '', //税率类型：0无税1增值税17% 2普通税6%
        purchase_price: 0, //采购价
        top_limit: '', //库存上限
        lower_limit: '', //库存下限
        remark: '', //备注
        image_url: '', //图片地址(可多张图片，以逗号分隔)
        qichu_info: '', //初期库存数量
        qichu_total: '', //初期库存总量
        attr_info: '', //属性信息
        id: ''
    };
    //新建商品
    $('.pro_goods_create_btn').die('click').live('click', function () {
        if ($('.pro_goods_cate_list_ul>li').length == 0) {
            return false;
        }
        proGoodsCreateData = {
            token: token,
            name: '', //商品名称
            code_sn: '', //商品编号
            unit_id: '', //基本单位id
            brand_id: 0, //品牌ID
            cate_id: '', //分类id
            status: '', //是否启用状态 0正常 1停用
            taxtype: '', //税率类型：0无税1增值税17% 2普通税6%
            purchase_price: 0, //采购价
            top_limit: '', //库存上限
            lower_limit: '', //库存下限
            remark: '', //备注
            image_url: '', //图片地址(可多张图片，以逗号分隔)
            qichu_info: '', //初期库存数量
            qichu_total: '', //初期库存总量
            attr_info: '', //属性信息
            id: 0
        };
        //创建人
        $('.tanceng .pro_goods_create_uname').html(uname);
        //创建日期
        $('.tanceng .pro_goods_create_date').html(getCurrentDateDay());
        //商品编号
        $('.tanceng .pro_goods_create_code_sn').val(likGetCodeFn('SP'));
        //商品类别
        $('.tanceng .pro_goods_create_category').val($('.Sideslip_list_on span').html().split('（')[0]);
        //商品属性
        var curCateId = $('.pro_goods_cate_list_ul li.Sideslip_list_on').attr('goodscateid');
        proGoodsCreateData.cate_id = curCateId;
        $.ajax({
            url: SERVER_URL + '/product-category/loadcategory',
            type: 'GET',
            data: {
                token: token,
                id: curCateId
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var datalist = oE.data.attrList;
                    var attrsList = '';
                    var attrValList = '';
                    $.each(datalist, function (i, v) {
                        attrValList = '';
                        if (v['list'][1] && v['list'][1].value != '') {
                            attrValList += '<div class="inline_block select_mormal select_100">\
                                    <input type="text" class="select_input select_attr_list_inp" attrvalid="" value="请选择' + v['category_name'] + '">\
                                    <i></i>\
                                    <ul class="select_list sbar select_attr_list_ul">';
                            $.each(v['list'], function (i2, v2) {
                                if (v2['value'] == '')return true;
                                attrValList += '<li attrvalid="' + v2['id'] + '">' + v2['value'] + '</li>';
                            });
                            attrValList += '</ul></div>';
                        } else {
                            attrValList = '<input type="text" attrvalid="' + v['list'][0]['id'] + '" class="time_input select_100 select_attr_list_inp" onfocus="fn_focus(this);" onblur="fn_blur(this);" style="color: rgb(204, 204, 204);" value="请输入' + v['category_name'] + '">'
                        }
                        attrsList += '<div class="t_textinput">\
                                        <div class="t_left"><i class="c_r ">*</i>' + v['category_name'] + '</div>\
                                        <div class="t_right">' + attrValList + '</div>\
                                        </div>'
                    });
                    $('.tanceng .pro_goods_create_attrs_list').html(attrsList);
                }
            },
            error: function (e) {
            }
        });
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
                        if (v['status'] == 2)return true;
                        warehouse += '<div class="t_textinput">\
                                        <div class="t_left t_left_conrow"><i class="c_r v_hidden">*</i>' + v['name'] + '</div>\
                                        <div class="t_right"><input type="text" warehouseid="' + v['id'] + '" class="time_input goods_inp_32 lik_input_number pro_goods_create_warehouse_num" value="请输入数量" onfocus="fn_focus(this);" onblur="fn_blur(this);">\
                                        </div>\
                                        </div>'
                    });
                    $('.tanceng .pro_goods_create_warehouse_list').html(warehouse);
                }
            },
            error: function (e) {
            }
        });
    });
    $('.select_attr_list_ul li').die('click').live('click', function () {
        $(this).closest('.select_mormal').find('input.select_attr_list_inp').attr('attrvalid', $(this).attr('attrvalid'))
    });
    //期初信息 - 库房 - 输入数量
    $('.tanceng .pro_goods_create_warehouse_num').live('keyup', function () {
        var warehouseNumTotal = 0;
        $.each($('.tanceng .pro_goods_create_warehouse_num'), function (i, v) {
            if ($('.tanceng .pro_goods_create_warehouse_num').eq(i).val() != '请输入数量') {
                warehouseNumTotal += parseFloat($('.tanceng .pro_goods_create_warehouse_num').eq(i).val());
            } else {
                return true;
            }
        });
        $('.tanceng .pro_goods_create_warehouse_num_total').html(warehouseNumTotal);
    });
    //选择基本单位
    $('.tanceng .pro_goods_create_choose_unit_btn').die('click').live('click', function () {
        $.ajax({
            url: SERVER_URL + '/product-unit/list',
            type: 'POST',
            data: {token: token},
            dataType: 'json',
            success: function (oE) {
                var datalist = oE.datalist;
                var goodsUnitHtml = '';
                $.each(datalist, function (i, v) {
                    goodsUnitHtml += '<li goodsunitid="' + v['id'] + '">' + v['name'] + '</li>';
                });
                $('.tanceng .pro_goods_create_choose_unit_list_ul').html(goodsUnitHtml);
            },
            error: function (e) {
            }
        });
    });
    $('.tanceng .pro_goods_create_choose_unit_list_ul li').die('click').live('click', function () {
        proGoodsCreateData.unit_id = $(this).attr('goodsunitid');
    });
    //输入单价
    $('.tanceng .pro_goods_create_cost_one').live('keyup', function () {
        if ($('.tanceng .pro_goods_create_tax_one').val() == '含税率17%') {
            $('.tanceng .pro_goods_create_cg_cost_one').val(moneyToFixed(parseFloat(parseFloat($(this).val()) * 17 / 100) + parseFloat($(this).val())));
        } else if ($('.tanceng .pro_goods_create_tax_one').val() == '未税') {
            $('.tanceng .pro_goods_create_cg_cost_one').val(moneyToFixed(parseFloat($(this).val())));
        }
    });
    //选择税
    $('.tanceng .pro_goods_create_tax_ul li').die('click').live('click', function () {
        var costOne = 0;
        if ($('.tanceng .pro_goods_create_cost_one').val() == '请输入单价') {
            costOne = 0;
        } else {
            costOne = parseFloat($('.tanceng .pro_goods_create_cost_one').val());
        }
        if ($('.tanceng .pro_goods_create_tax_one').val() == '含税率17%') {
            $('.tanceng .pro_goods_create_cg_cost_one').val(moneyToFixed(parseFloat(costOne * 17 / 100) + costOne));
        } else if ($('.tanceng .pro_goods_create_tax_one').val() == '未税') {
            $('.tanceng .pro_goods_create_cg_cost_one').val(moneyToFixed(costOne));
        }
    });
    //新建商品 - 提交
    $('.tanceng .pro_goods_create_submit_btn').die('click').live('click', function () {
        //商品名称
        proGoodsCreateData.name = $('.tanceng .pro_goods_create_category').val();
        //商品编号
        proGoodsCreateData.code_sn = $('.tanceng .pro_goods_create_code_sn').val();
        //基本单位
        if ($('.tanceng .pro_goods_create_choose_unit_btn').val() == '请选择基本单位') {
            alert('请选择基本单位');
            return false;
        }
        //商品属性
        var goodsAttrArr = [];
        var submitFlag = true;
        $.each($('.tanceng .pro_goods_create_attrs_list input.select_attr_list_inp'), function (i, v) {
            if ($('.tanceng .pro_goods_create_attrs_list input.select_attr_list_inp').eq(i).attr('attrvalid') == '' || $('.tanceng .pro_goods_create_attrs_list input.select_attr_list_inp').eq(i).val().slice(0, 3) == '请输入') {
                alert($('.tanceng .pro_goods_create_attrs_list input.select_attr_list_inp').eq(i).val());
                submitFlag = false;
                return false;
            }
            goodsAttrArr.push({
                id: $('.tanceng .pro_goods_create_attrs_list input.select_attr_list_inp').eq(i).attr('attrvalid'),
                value: $('.tanceng .pro_goods_create_attrs_list input.select_attr_list_inp').eq(i).val()
            });
        });
        //图片地址
        var imgUrlList = '';
        $.each($('.tanceng .img_warp li'), function (i, v) {
            imgUrlList += $('.tanceng .img_warp li').eq(i).find('img').attr('imgurl') + ',';
        });
        imgUrlList = imgUrlList.slice(0, imgUrlList.length - 1);
        proGoodsCreateData.image_url = imgUrlList;
        //备注信息
        if ($('.tanceng .pro_goods_create_note_textarea').val() == '请输入备注内容') {
            proGoodsCreateData.remark = '';
        } else {
            proGoodsCreateData.remark = $('.tanceng .pro_goods_create_note_textarea').val();
        }
        //最低库存
        if ($('.tanceng .pro_goods_create_lower_limit_inp').val() == '请输入库存下限') {
            proGoodsCreateData.lower_limit = '';
        } else {
            proGoodsCreateData.lower_limit = $('.tanceng .pro_goods_create_lower_limit_inp').val();
        }
        //最高库存
        if ($('.tanceng .pro_goods_create_top_limit_inp').val() == '请输入库存上限') {
            proGoodsCreateData.top_limit = '';
        } else {
            proGoodsCreateData.top_limit = $('.tanceng .pro_goods_create_top_limit_inp').val();
        }
        //是否启用商品
        if ($('.tanceng .pro_goods_create_qysp_up').is(':checked')) {
            proGoodsCreateData.status = 0;
        } else if ($('.tanceng .pro_goods_create_qysp_down').is(':checked')) {
            proGoodsCreateData.status = 1;
        }
        //期初库存数量
        var warehouseArr = [];
        $.each($('.tanceng .pro_goods_create_warehouse_list>div'), function (i, v) {
            if ($('.tanceng .pro_goods_create_warehouse_list>div').eq(i).find('.pro_goods_create_warehouse_num').val() == '请输入数量') {
                return true;
            } else {
                warehouseArr.push({
                    warehouse_id: $('.tanceng .pro_goods_create_warehouse_list>div').eq(i).find('.pro_goods_create_warehouse_num').attr('warehouseid'),
                    num: $('.tanceng .pro_goods_create_warehouse_list>div').eq(i).find('.pro_goods_create_warehouse_num').val()
                });
            }
        });
        proGoodsCreateData.qichu_info = arrayToJson(warehouseArr);
        proGoodsCreateData.qichu_total = $('.tanceng .pro_goods_create_warehouse_num_total').html();
        //单价
        if ($('.tanceng .pro_goods_create_cost_one').val() == '请输入单价') {
            proGoodsCreateData.purchase_price = 0;
        } else {
            proGoodsCreateData.purchase_price = $('.tanceng .pro_goods_create_cost_one').val();
        }
        //税率
        if ($('.tanceng .pro_goods_create_tax_one').val() == '含税率17%') {
            proGoodsCreateData.taxtype = 1;
        } else if ($('.tanceng .pro_goods_create_tax_one').val() == '未税') {
            proGoodsCreateData.taxtype = 0;
        }
        if (submitFlag) {
            proGoodsCreateData.attr_info = arrayToJson(goodsAttrArr);
            $.ajax({
                url: SERVER_URL + '/product/add',
                type: 'POST',
                data: proGoodsCreateData,
                dataType: 'json',
                success: function (oE) {
                    if (oE.code == 0) {
                        $('.tanceng').css('display', 'none').find('.dialog_box').remove();
                        //截取当前数量
                        if (proGoodsCreateData.id == 0) {
                            var curNum = parseFloat($('.pro_goods_cate_list_ul li.Sideslip_list_on span').text().split('（')[1].split('）')[0]);
                            $('.pro_goods_cate_list_ul li.Sideslip_list_on span').text($('.pro_goods_cate_list_ul li.Sideslip_list_on span').text().split('（')[0] + '（' + (curNum + 1) + '）');
                        }
                        getGoodsListByCateFn($('.pro_goods_cate_list_ul li.Sideslip_list_on').attr('goodscateid'));
                    } else {
                        alert(oE.msg);
                    }
                },
                error: function (e) {
                }
            });
        }
    });

    //列表中编辑
    $('.pro_goods_list_edit_btn').die('click').live('click', function () {
        curProGoodsListOpeId = $(this).closest('tr').attr('goodsid');
        proGoodsGetDetailFn(curProGoodsListOpeId);
    });

    //查看 - 更多中编辑
    $('.pro_goods_detail_more_edit_btn').die('click').live('click', function () {
        proGoodsGetDetailFn(curProGoodsListOpeId);
    });

    //编辑商品 - 获取详情函数
    function proGoodsGetDetailFn(goodsId) {
        //商品id
        proGoodsCreateData.id = goodsId;
        $.ajax({
            url: SERVER_URL + '/product/loadproduct',
            type: 'GET',
            data: {
                token: token,
                id: goodsId
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var data = oE.data;
                    //创建日期
                    $('.tanceng .pro_goods_create_date').html(data['created_at']);
                    //创建人
                    $('.tanceng .pro_goods_create_uname').html(data['user_name']);
                    //产品图数组
                    if (data['image_url']) {
                        var productImgArr = data['image_url'].split(',');
                        var productImgHtml = '';
                        $.each(productImgArr, function (i, v) {
                            productImgHtml += '<li><input class="hide_input" type="file"><img class="img_src" imgurl="' + v + '" src="' + getImgUrl(v) + '"><i class="del_img">-</i></li>'
                        });
                        $('.tanceng .img_warp cite').before(productImgHtml);
                    } else {
                        $('.tanceng .pro_goods_create_img').attr('src', 'static/goods/images/cp_img.png');
                    }
                    //商品编号
                    $('.tanceng .pro_goods_create_code_sn').val(data['code_sn']);
                    //商品名称
                    $('.tanceng .pro_goods_create_category').val(data['name']);
                    //基本单位
                    $('.tanceng .pro_goods_create_choose_unit_btn').val(data['unit_name']);
                    proGoodsCreateData.unit_id = data['unit_id'];
                    //分类id
                    proGoodsCreateData.cate_id = data['cate_id'];
                    //商品属性
                    $.ajax({
                        url: SERVER_URL + '/product-category/loadcategory',
                        type: 'GET',
                        data: {
                            token: token,
                            id: data['cate_id']
                        },
                        dataType: 'json',
                        success: function (oE) {
                            if (oE.code == 0) {
                                var datalist = oE.data.attrList;
                                var attrsList = '';
                                var attrValList = '';
                                $.each(datalist, function (i, v) {
                                    attrValList = '';
                                    if (v['list'].length > 1 && v['list'][1].value != '') {
                                        attrValList += '<div class="inline_block select_mormal select_100">\
                                    <input type="text" class="c_3 select_input select_attr_list_inp" attrvalid="" value="请选择' + v['category_name'] + '">\
                                    <i></i>\
                                    <ul class="select_list sbar select_attr_list_ul">';
                                        $.each(v['list'], function (i2, v2) {
                                            attrValList += '<li attrvalid="' + v2['id'] + '">' + v2['value'] + '</li>';
                                        });
                                        attrValList += '</ul></div>';
                                    } else {
                                        attrValList = '<input type="text" attrvalid="' + v['list'][0].id + '" class="c_3 time_input select_100 select_attr_list_inp" onfocus="fn_focus(this);" onblur="fn_blur(this);" style="color: rgb(204, 204, 204);" value="请输入' + v['category_name'] + '">'
                                    }
                                    attrsList += '<div class="t_textinput">\
                                        <div class="t_left"><i class="c_r ">*</i>' + v['category_name'] + '</div>\
                                        <div class="t_right">' + attrValList + '</div>\
                                        </div>'
                                });
                                $('.tanceng .pro_goods_create_attrs_list').html(attrsList);
                                $.each(data['attributes'], function (i, v) {
                                    $('.tanceng .pro_goods_create_attrs_list .t_right input').eq(i).val(data['attributes'][i]['value']).attr('attrvalid', data['attributes'][i]['id']);
                                });
                            }
                        },
                        error: function (e) {
                        }
                    });
                    //备注
                    $('.tanceng .pro_goods_create_note_textarea').val(data['remark']);
                    //最低库存
                    $('.tanceng .pro_goods_create_lower_limit_inp').val(data['lower_limit']);
                    //最高库存
                    $('.tanceng .pro_goods_create_top_limit_inp').val(data['top_limit']);
                    //启用商品
                    if (data['status'] == 0) {
                        $('.tanceng .pro_goods_create_qysp_up').attr('checked', 'checked');
                    } else {
                        $('.tanceng .pro_goods_create_qysp_down').attr('checked', 'checked');
                    }
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
                                    if (v['status'] == 2)return true;
                                    warehouse += '<div class="t_textinput">\
                                        <div class="t_left t_left_conrow"><i class="c_r v_hidden">*</i>' + v['name'] + '</div>\
                                        <div class="t_right"><input type="text" warehouseid="' + v['id'] + '" class="time_input goods_inp_32 pro_goods_create_warehouse_num" value="请输入数量" onfocus="fn_focus(this);" onblur="fn_blur(this);" onkeydown="value = this.value.replace(/[^0-9\.]/g, \'\');" onkeyup="value = this.value.replace(/[^0-9\.]/g, \'\');">\
                                        </div>\
                                        </div>'
                                });
                                $('.tanceng .pro_goods_create_warehouse_list').html(warehouse);
                                //期初信息
                                $.each(data['qichu_info'], function (i, v) {
                                    $.each($('.tanceng .pro_goods_create_warehouse_list>div'), function (i2, v2) {
                                        if ($('.tanceng .pro_goods_create_warehouse_list>div').eq(i2).find('input:text').attr('warehouseid') == v['warehouse_id']) {
                                            $('.tanceng .pro_goods_create_warehouse_list>div').eq(i2).find('input:text').val(v['num']);
                                        }
                                    });
                                });
                            }
                        },
                        error: function (e) {
                        }
                    });
                    //期初信息 - 总和
                    $('.tanceng .pro_goods_create_warehouse_num_total').html(data['qichu_total']);
                    //采购价
                    $('.tanceng .pro_goods_create_cost_one').val(data['purchase_price']);
                    //税率
                    if (data['taxtype'] == 0) {
                        $('.tanceng .pro_goods_create_tax_one').val('未税');
                        $('.tanceng .pro_goods_create_cg_cost_one').val(data['purchase_price']);
                    } else if (data['taxtype'] == 1) {
                        $('.tanceng .pro_goods_create_tax_one').val('含税率17%');
                        $('.tanceng .pro_goods_create_cg_cost_one').val(moneyToFixed(data['purchase_price'] * 1.17));
                    }

                }
            },
            error: function (e) {
            }
        });
    }
});
