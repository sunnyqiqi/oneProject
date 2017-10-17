

/*商品设置*/
$(function(){
   // var SERVER_URL="http://192.168.0.167:9091";
    var token=Admin.get_token();
    ///	弹窗无限循环树结构
    function tree_list_dialog(datalist, deep) {

        var html = '';
        $.each(datalist, function (index, data) {

            var html_i_list_before = '<i class="list_before_span"></i>';
            html += '<ul class="ul1 zcj_child1">';
            for (var j = 0; j < deep; j++) {
                html_i_list_before += '<i class="list_before_span"></i>'
            }
            if(data['children'].length>0){
                html += '<li class="left_1" data-id= "' + data["id"] + '" data-pid="' + data['pid'] + '" data-name="' + data['name'] + '">' + html_i_list_before + '<span class="icon_open change_ba"></span><span class="icon_file"></span><span class="list_msg">' + data['name'] + '</span>'+'(' + data['children'].length + ')'+'</li>';
            }else{
                html += '<li class="left_1" data-id= "' + data["id"] + '" data-pid="' + data['pid'] + '" data-name="' + data['name'] + '">' + html_i_list_before + '<span class="change_ba"></span><span class="icon_file"></span><span class="list_msg">' + data['name'] + '</span>'+'(' + data['children'].length + ')'+'</li>';
            }

            if (data['children'] && data['children'].length > 0) {
                html += tree_list_dialog(data['children'], deep + 1);
            }

            html += '</li>';
            html += '</ul>'
        });
        return html;

    }
    /*
     新建属性
     */
   /* $("#zcj_gnsz_spsx_set_left_tab").die().live('click', function () {

        setTimeout(function () {
             page_47_goods_attr_list();
            $('.zcj_gnsz_add_sxzd_field').die().live('click', function () {
                 var html='<div class="t_textinput" style="margin: 0;"> <div class="t_left"><i class="c_r v_hidden">*</i>自定义属性1</div> <div class="t_right"> <input type="text" class="c_3 zcj_goods_attr_new_add" value="品牌"> <div class="inline_block sp_set_con"> <button class="val_dialogTop but_mix fz_attr_edit" name="xt_gnsz_goodExitzd">编辑</button> <button class="val_dialogTop but_mix fz_attr_add" name="xt_gnsz_goodAddzd">增加属性字段</button> <button class="val_dialogTop but_mix but_r fz_attr_delete" name="xt_gnsz_goodDeletezd">删除</button> </div> </div> </div>'

                $('.zcj_sp_attr_set_list_show_dv').append(html);
                 page_47_goods_attr_new_listener();
            });

        },200);
        function page_47_goods_attr_list() {

            GoodsAttr.all(function (data) {
                console.log('2000');
                console.log(data);
                console.log('2000');
                page_47_goods_attr_new_render_list_table(data['datalist']);
                page_47_goods_attr_new_listener();


            });
        }
        function page_47_goods_attr_new_render_list_table(data) {
            var html = '';
            $.each(data, function (i, db_attr) {
                html += '<div class="t_textinput" style="margin: 0;">';
                html += '<div class="t_left" data-id="' + db_attr['id'] + '"><i class="c_r v_hidden">*</i>' + db_attr['name'] + '</div>';
                html += ' <div class="t_right">';
                html += '<input type="text" class="c_3 zcj_goods_attr_new_add" value="' + db_attr['name'] + '" data-id="' + db_attr['id'] + '" data-pid="'+db_attr['pid']+'">';
                html += ' <div class="inline_block sp_set_con">';
                $.each(db_attr['children'], function (k, db_sencond_attr) {
                    html += '<label><input class="zcj_goods_attr_second_attr_status" type="checkbox"'+(db_sencond_attr['status']=='1'?' checked="checked"':'')+' data-id="'+db_sencond_attr['id']+'" data-name="'+db_sencond_attr['name']+'" data-pid="'+db_sencond_attr['pid']+'">'+db_sencond_attr['name']+'</label>';
                });
                html += '<button class="val_dialogTop but_mix fz_attr_edit" name="xt_gnsz_goodExitzd">编辑</button>';
                html += '<button class="val_dialogTop but_mix fz_attr_add" name="xt_gnsz_goodAddzd" data-id="' + db_attr['id'] + '">增加属性字段</button>';
                html += '<button class="val_dialogTop but_mix but_r fz_attr_delete" name="xt_gnsz_goodDeletezd" data-id="' + db_attr['id'] + '">删除</button>';
                html += '</div>';
                html += '</div>';
                html += '</div>';
            });
            $('.zcj_goods_attr_setting_list_data').html(html);

        }

        function page_47_goods_attr_new_listener() {
            /!*输入属性名字*!/
            $('.zcj_goods_attr_new_add').on('keyup', function (event) {

                if(event.keyCode == 13) {
                    var first_attr = {};
                    first_attr['id'] = $(this).data('id');
                    first_attr['name'] = $(this).val();
                    first_attr['pid'] = $(this).data('pid');
                    GoodsAttr.add(first_attr, function (data) {
                        page_47_goods_attr_list();
                    });
                }
            });
            /!*选择属性*!/
            $('.zcj_goods_attr_second_attr_status').on('click', function () {
                var attr = {};
                attr['id'] = $(this).data('id');
                attr['name'] = $(this).data('name');
                attr['pid'] = $(this).data('pid');
                attr['status'] = $(this).prop('checked') ? '1' : '0';
                GoodsAttr.add(attr, function (data) {
                    page_47_goods_attr_list();
                });
            });

            /!*增加属性字段*!/
            $('.zcj_goods_attr_setting_list_data .fz_attr_add').on('click', function () {

                var pid = $(this).data('id');
                setTimeout(function () {
                    $('.tanceng input.zcj_goods_attr_setting_new_second_attr').data('pid', pid);
                    $('.tanceng .zcj_goods_attr_setting_new_second_attr_sure').on('click', function () {
                        var pid = $('.tanceng input.zcj_goods_attr_setting_new_second_attr').data('pid');
                        var name = $('.tanceng input.zcj_goods_attr_setting_new_second_attr').val();
                        GoodsAttr.add({'pid': pid, 'name': name}, function (data) {
                           $('.tanceng .zcj_goods_attr_setting_new_second_attr_close').click();
                            page_47_goods_attr_list();

                        });
                    });
                    $('.zcj_goods_attr_setting_new_second_attr_cancel').on('click', function () {
                        $('.tanceng .zcj_goods_attr_setting_new_second_attr_close').click();

                    });
                },100);


            });
            /!*属性编辑*!/
            $('.zcj_goods_attr_setting_list_data .fz_attr_edit').on('click', function () {
                var me = this;
                var second_attrs = [];
                $(this).parent().find('input').each(function () {
                    var attr = {};
                    attr['id'] = $(this).data('id');
                    attr['name'] = $(this).data('name');
                    attr['pid'] = $(this).data('pid');
                    attr['status'] = $(this).prop('checked') ? '1' : '0';
                    second_attrs.push(attr);
                });
                setTimeout(function () {
                    var html = '';
                    $.each(second_attrs, function (i, second_attr) {
                        html += '<div class="t_textinput" style="height:40px">';
                        html += '<div class="t_left"><i class="c_r v_hidden">*</i>' + second_attr['name'] + '</div>';
                        html += '<div class="t_right"><input type="text" class="time_input" data-id="'+second_attr['id']+'" data-pid="'+second_attr['pid']+'" value="'+second_attr['name']+'" onfocus="fn_focus(this);" onblur="fn_blur(this);">';
                        html += ' <i class="sp_delete val_dialogTop zcj_goods_attr_second_attr_delete" data-id="'+second_attr['id']+'" name="xt_gnsz_goodDeletezd">删除</i>';
                        html += '</div></div>';

                    });

                    $('.tanceng .zcj_goods_attr_edit_second_attr_list').html(html);
                    /!*删除*!/
                    $('.tanceng  .zcj_goods_attr_second_attr_delete').on('click', function () {
                        var me_delete = this;
                        var id = $(this).data('id');
                        setTimeout(function () {
                            $('.tanceng .zcj_goods_unit_new_delete_sure').on('click', function () {
                                GoodsAttr.delete(id, function (data) {
                                    setTimeout(function () {
                                        $('.tanceng .dialog_box[name="xt_gnsz_goodDeletezd"]').remove();
                                        if(data['msg'] != '删除失败') {
                                            $(me_delete).parents('.t_textinput').remove();
                                           /!* page_47_goods_attr_list();*!/
                                        }else{
                                            alert(data['msg']);
                                        }

                                    }, 100);

                                });
                            });
                            $('.tanceng .zcj_goods_unit_new_delete_cancel').on('click', function () {
                                $(this).parents('.dialog_content').find('.dialog_close_but').click();
                            });
                        }, 100);

                    });
                    /!*编辑确定*!/
                    $('.tanceng .zcj_goods_attr_edit_second_attr_list_sure').on('click', function () {
                        var sure_click = this;
                        var news_second_attrs = [];
                        $('.tanceng .zcj_goods_attr_edit_second_attr_list input:text').each(function () {
                            var attr = {
                                id: $(this).data('id'),
                                name: $(this).val(),
                                pid: $(this).data('pid')
                            };
                            news_second_attrs.push(attr);
                        });
                        $.each(news_second_attrs, function (i, new_second_attr) {
                            console.log(new_second_attr);
                            GoodsAttr.update(new_second_attr['id'], new_second_attr, function (data) {
                                page_47_goods_attr_list();
                            });
                        });
                        setTimeout(function () {
                            $(sure_click).next().click();
                        }, 100);

                    });
                    $('.tanceng .zcj_goods_attr_edit_second_attr_list_cancel').on('click', function () {
                        $('.tanceng .zcj_goods_attr_edit_second_attr_list_cancel_close').click();
                    });
                },150);



            });
            /!*删除商品属性*!/
            $('.zcj_goods_attr_setting_list_data .fz_attr_delete').on('click', function () {
                var id = $(this).data('id');
                setTimeout(function () {
                    $('.tanceng .zcj_goods_unit_new_delete_sure').on('click', function () {
                        var me = this;
                        if(id) {
                            GoodsAttr.delete(id, function () {
                                $(this).parents('.dialog_content').find('.dialog_close_but').click();
                                setTimeout(function () {
                                    $('.tanceng .dialog_box[name="xt_gnsz_goodDeletezd"]').remove();
                                }, 100);
                                page_47_goods_attr_list();
                            });
                        }else{
                            $(this).parents('.dialog_content').find('.dialog_close_but').click();
                            setTimeout(function () {
                                $('.tanceng .dialog_box[name="xt_gnsz_goodDeletezd"]').remove();
                            }, 100);
                            page_47_goods_attr_list();
                        }

                    });
                    $('.tanceng .zcj_goods_unit_new_delete_cancel').on('click', function () {
                        $(this).parents('.dialog_content').find('.dialog_close_but').click();
                    });
                },100);

            });

        }

    });*/


    //	补零函数
    function repair(x) {
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
        console.log(o);
        return o.toString();
    }
    /*
     基本单位设置
     */
    //获取基本单位列表函数
    function getProGoodsSetUnitListFn() {
        $.ajax({
            url: SERVER_URL + '/product-unit/list',
            type: 'POST',
            data: {token: token},
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                var datalist = oE.datalist;
                var goodsUnitHtml = '';
                var datalistLen = datalist.length;
                $('.pro_goods_set_unit_num_total').html(datalistLen);
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
                $('.pro_goods_set_unit_list_tbody').html(goodsUnitHtml);
            },
            error: function (e) {
                console.log(e);
            }
        });
    }
    //添加基本单位
    $('#zcj_gnsz_jbdw_set_left_tab').die('click').live('click', function () {
        getProGoodsSetUnitListFn();
    });
    //基本单位排序
    var curGoodsUnitId = null;
    $('.pro_goods_unit_sort_btn').die('click').live('click', function () {
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
                console.log(e);
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
                        //$_this.closest('.dialog_box').remove();
                        $_this.parents('.dialog_content_1').find('.dialog_close').click();
                        getProGoodsSetUnitListFn();
                    }else{
                        alert(oE.msg);
                    }
                },
                error: function (e) {
                    console.log(e);
                }
            });
        }
    });
    //修改基本单位
    $('.pro_goods_unit_edit_btn').die('click').live('click', function () {
        curGoodsUnitId = $(this).closest('tr').attr('goodsunitid');
        $('.pro_goods_unit_edit_name_inp').val($(this).closest('tr').find('td').eq(1).html());
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
                        //$_this.closest('.dialog_box').remove();
                        $_this.parents('.dialog_content_1').find('.dialog_close').click();
                        getProGoodsSetUnitListFn();
                    }
                },
                error: function (e) {
                    console.log(e);
                }
            });
        }
    });
    //删除基本单位
    $('.pro_goods_unit_del_btn').die('click').live('click', function () {
        curGoodsUnitId = $(this).closest('tr').attr('goodsunitid');

    });
    //删除基本单位 确认
    $('.pro_goods_unit_del_submit_btn').die('click').live('click', function () {
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
                    //$_this.closest('.dialog_box').remove();
                    $_this.parents('.dialog_content_4').find('.dialog_close_but').click();
                    getProGoodsSetUnitListFn();
                }
            },
            error: function (e) {
                console.log(e);
            }
        });
    });
    $(".tanceng .zcj_qx_out_del").die().live("click",function(){
        $(this).parents('.dialog_content_4').find('.dialog_close_but').click();
    });
   /* $('#zcj_gnsz_jbdw_set_left_tab').on('click', function () {
        var page_47_goods_unit_list_params = {
            page: 1,
            num: 10
        };
        $('.page_47_goods_unit_new_sure').removeClass('but_blue');
        setTimeout(function () {
            $('.tanceng .page_47_goods_unit_new_sure').addClass('but_blue');
            page_47_goods_unit_new_get_unit_list();


        }, 100);
        /!*单位属性列表*!/
        function page_47_goods_unit_new_get_unit_list() {
            GoodsUnit.all(page_47_goods_unit_list_params, function (data) {

                $('.page_47_goods_unit_new_list_count').text(data['datalist'].length);
                page_47_goods_unit_new_render_list_table(data['datalist']);
                page_47_goods_unit_new_btn_listener();
            });
        }
        /!*搜索*!/
        $(".zcj_goods_jbdw_ss_search").live("click",function(){
            var key=$(".zcj_goods_jbdw_search_val_name").val();
            page_47_goods_unit_list_params['key']=key;

            GoodsUnit.all(page_47_goods_unit_list_params, function (data) {
                $('.tanceng .page_47_goods_unit_new_list_count').text(data['datalist'].length);
                page_47_goods_unit_new_render_list_table(data['datalist']);
                page_47_goods_unit_new_btn_listener();
            });

        });
        /!*单位列表展示*!/
        function page_47_goods_unit_new_render_list_table(datalist) {
            var html = '<thead><tr><th>序号</th><th>单位名称</th><th>排序</th><th>操作</th></tr></thead>';
            html += '<tbody>';
            var sort='';
            var data_length = datalist.length;
            $.each(datalist, function (index, goods_unit) {
                sort=repair(index+1)
                html += '<tr>';
                html += '<td>' + sort + '</td>';
                html += '<td>' + goods_unit['name'] + '</td>';
                html += '<td>';
                if (index != 0) {
                    html += '<button class="but_mix page_47_goods_unit_resort" data-name="' + goods_unit['name'] + '" data-sort="' + goods_unit['sort'] + ')" data-action="up" data-id="' + goods_unit['id'] + '">上移</button>';
                }
                if (index != data_length - 1) {
                    html += '<button class="but_mix page_47_goods_unit_resort" data-name="' + goods_unit['name'] + '" data-sort="' + goods_unit['sort'] + ')" data-action="down" data-id="' + goods_unit['id'] + '">下移</button>';
                }
                html += '</td>';
                html += '<td>' +
                    '<button class="but_mix val_dialogTop but_exit page_47_goods_unit_new_edit" data-sort="' + goods_unit['sort'] + ')"  data-id="' + goods_unit['id'] + '"  data-name="' + goods_unit['name'] + '" name="xt_gnsz_goodExitdw">修改</button>' +
                    '<button class="but_mix but_r val_dialogTop page_47_goods_unit_new_delete" data-id="' + goods_unit['id'] + '"  data-name="' + goods_unit['name'] + '"  name="xt_gnsz_goodDeletezd">删除</button>' +
                    '</td>';

                html += '</tr>';

            });
            html += '</tbody>';
            $('.zcj_goods_unit_new_list_table').html(html);
            /!*上移、下移*!/
            $('.page_47_goods_unit_resort').unbind('click').bind('click', function () {
                var id = $(this).data('id');
                var action = $(this).data('action');
                /!*
                 var sort = parseInt($(this).data('sort'));
                 var name = $(this).data('name');
                 *!/
                action = action == 'up' ? 1:2;
                GoodsUnit.re_sort(id, action, function (data) {
                    page_47_goods_unit_new_get_unit_list();
                });
            });



        }

        /!*基本单位设置*!/
        function page_47_goods_unit_new_btn_listener() {
            /!*基本单位新建btn*!/
            $('.zcj_goods_unit_new_new_form').on('click', function () {

                setTimeout(function () {
                    // 保存新建单位btn
                    $('.tanceng .page_47_goods_unit_new_new_form_sure').die().live('click', function () {

                        var me = this;
                        var params = {};
                         params['id'] = $(this).parents('.dialog_content').find('input:eq(0)').val();
                         params['name'] = $(this).parents('.dialog_content').find('input:eq(1)').val();
                         params['sort'] = $(this).parents('.dialog_content').find('input:eq(2)').val();
                        if (params['id'] == '') {
                            delete  params['id'];
                        }
                        if(params['sort']==''){
                            delete  params['sort'];
                        }

                        GoodsUnit.add(params, function (data) {
                            console.log(data);
                            $(me).next().click();
                            page_47_goods_unit_new_get_unit_list();
                        });
                    });
                    $('.tanceng .page_47_goods_unit_new_new_form_cancel').on('click', function () {
                        $(this).parents('.dialog_content').find('.dialog_close').click();
                    });
                }, 100);
            });
            //商品单位编辑
            $('.page_47_goods_unit_new_edit').on('click', function () {
                var id = $(this).data('id');
                var name = $(this).data('name');
                var sort = $(this).data('sort');
                $('.zcj_goods_unit_new_new_form').click();
                setTimeout(function () {
                    $('.tanceng .page_47_goods_unit_new_new_form_sure').parents('.dialog_content').find('input:eq(0)').val(id);
                    $('.tanceng .page_47_goods_unit_new_new_form_sure').parents('.dialog_content').find('input:eq(1)').val(name);
                    $('.tanceng .page_47_goods_unit_new_new_form_sure').parents('.dialog_content').find('input:eq(2)').val(sort);

                },100);
                return false;
            });
            //del删除
            $('.page_47_goods_unit_new_delete').on('click', function () {
                var id = $(this).data('id');

                setTimeout(function () {
                    $('.tanceng .zcj_goods_unit_new_delete_sure').on('click', function () {

                        GoodsUnit.delete(id, function () {
                            setTimeout(function () {
                                $('.tanceng .dialog_box[name="xt_gnsz_goodDeletezd"]').remove();
                            }, 100);
                            page_47_goods_unit_new_get_unit_list();
                        });
                    });
                    $('.tanceng .zcj_goods_unit_new_delete_cancel').on('click', function () {
                        $(this).parents('.dialog_content').find('.dialog_close_but').click();
                    });
                }, 100);


            });


           /!* $('.tanceng .page_47_goods_unit_new_sure').on('click', function () {

                $(this).next().click();
            });*!/
           /!* $('.tanceng .page_47_goods_unit_new_cancel').on('click', function () {
                $(this).parents('.dialog_content').find('.dialog_close').click();
            });*!/
        }
    });*/
    $("#zcj_gnsz_jbdw_set_left_tab").trigger("click");
        /*树形列表*/
    function goods_fl_tree_fn(vclass){
        GoodsCate.all(0, 1, function (data) {
            console.log(data);
            var total_count = data['datalist'].length;

            var html = '<li class="left_all" data-id="0"><span class="icon_open change_ba"></span><span class="icon_file"></span><span class="list_msg">所有分类(' + total_count + ')</span></li>'
            var deep=0;

            $(vclass).html(html+tree_list_dialog(data['datalist'], deep));

        });
    }
    /*树形列表*/
    function page_51_goods_cate_news_render_cate_tree() {
        GoodsCate.all(0, 1, function (data) {
            console.log(data);

            var total_count = data['datalist'].length;

            var html = '<li class="left_all"><span class="icon_open change_ba"></span><span class="icon_file"></span><span class="list_msg">所有分类(' + total_count + ')</span></li>';
            var deep=0;

          /*  if ($('.tanceng .page_51_goods_cate_edit_modal .goods_cate_tree')) {
                $('.tanceng .page_51_goods_cate_edit_modal .goods_cate_tree .list_box_ulexit').html(html+tree_list_dialog(data['datalist'], deep));
            }
*/

            $('.page_51_goods_cate_edit_modal .list_box_ulexit').html(html+tree_list_dialog(data['datalist'], deep));

        });
    }
 /*商品分类*/
    /*$("#zcj_gnsz_spfl_set_left_tab").on("click",function(){
        page_51_goods_cate_news_render_cate_tree();

    /!*编辑分类*!/
    $('.page_51_goods_cate_edit_btn').on('click', function () {
        var modal_class = '.page_51_goods_cate_edit_modal ';
        var btn_me = this;
                invoke_tanceng(this, function () {
                    $(".page_51_goods_cate_edit_cate_edit_modal .zcj_edit_upfl_btn").unbind('click').bind('click', function () {

                        goods_fl_tree_fn(".tanceng .zcj_bjfl_goods_select_list_tree .list_box_ulexitAll");
                        /!* if($(".tanceng .zcj_bjfl_goods_select_list_tree li").next().children().length==0){
                         $(this).find("change_ba").removeClass("icon_open");
                         }*!/
                        $(".zcj_bjfl_goods_select_list_tree li").die('click').live('click', function () {

                            var fl_id=$('.zcj_bjfl_goods_select_list_tree li.on').data('id')
                            var fl_name=$('.zcj_bjfl_goods_select_list_tree li.on').data('name')
                            $(".tanceng .zcj_sp_select_sjfl_end_btn").unbind('click').bind('click', function () {
                                $('.zcj_select_up_fl_val_show').data("id",fl_id).val(fl_name);
                                $('.tanceng .page_51_goods_cate_edit_cate_edit_modal input.fz_cate_name').data("pid",fl_id);
                                $(this).next().click();
                            })
                        })

                    })

                    var $li = $(modal_class + '.goods_cate_tree li.on');
                    var text = $li.data('name');
                    var id = $li.data('id');
                    var pid = $li.data('pid');
                    var cate_name_edit_modal = '.tanceng .page_51_goods_cate_edit_cate_edit_modal ';
                    var $input = $(cate_name_edit_modal + 'input.fz_cate_name');
                    $input.val(text).data('id', id).data('pid', pid);
                    $(cate_name_edit_modal + '.fz_save').unbind('click').bind('click', function () {
                        var me = this;
                        var cate_id = $input.data('id');
                        var cate_name = $input.val();
                        var cate_pid = $input.data('pid');
                        GoodsCate.update(cate_id, cate_name, cate_pid, 1, function () {
                            page_51_goods_cate_news_render_cate_tree();
                           $(".tanceng .page_51_goods_cate_edit_cate_edit_modal .dialog_close").click();

                        });

                    });

                });

        });
        /!*上移、下移*!/
        $('.goods_cate_edit_change_sort').die('click').live('click', function () {
            var action = $(this).data('action');
            var id = $('.page_51_goods_cate_edit_modal .goods_cate_tree li.on').data('id');
            if (!id) {
                return;
            }
            GoodsCate.up_or_down(id, action, function (data) {
                console.log(data);
                page_51_goods_cate_news_render_cate_tree();
            });
        });
    /!*添加分类*!/
    $('.zcj_goods_cate_add_btn').unbind('click').bind('click', function () {
        invoke_tanceng(this, function () {

            var add_cate_modal = '.tanceng .page_51_goods_cate_add_cate_modal ';
            var $input = $(add_cate_modal + 'input.fz_cate_name');
            $(add_cate_modal + '.zcj_select_goods_up_fl_val_put').data("id",0)
            /!*选择上级分类*!/
            $(".tanceng .zcj_select_goods_up_btn").unbind('click').bind('click', function () {

                goods_fl_tree_fn(".tanceng .zcj_bjfl_goods_select_list_tree .list_box_ulexitAll");

                $(".zcj_bjfl_goods_select_list_tree li").die('click').live('click', function () {

                    var fl_id=$('.zcj_bjfl_goods_select_list_tree li.on').data('id')
                    var fl_name=$('.zcj_bjfl_goods_select_list_tree li.on').data('name')
                    $(".tanceng .zcj_sp_select_sjfl_end_btn").unbind('click').bind('click', function () {
                        $(add_cate_modal + '.zcj_select_goods_up_fl_val_put').data("id",fl_id).val(fl_name);
                        $(this).next().click();
                    })
                })
            })

            $(add_cate_modal + '.fz_save').unbind('click').bind('click', function () {
                var c_pid=$(add_cate_modal + '.zcj_select_goods_up_fl_val_put').data("id")
                var me = this;
                var cate_name = $input.val();
                var cate_pid =c_pid;
                if(cate_name!='请填写分类名称' && cate_name!=''){
                    GoodsCate.add(cate_pid, cate_name, 1, function () {
                        page_51_goods_cate_news_render_cate_tree();
                        $(add_cate_modal + ".dialog_close").click();
                    });
                }else{
                    alert('请填写分类名称');
                }

            });
        })
    });
    /!*删除分类*!/
    $('.page_51_goods_cate_delete_btn').on('click', function () {
        var id = 0;
        if ($('.page_51_goods_cate_edit_modal .goods_cate_tree li.on').length > 0) {
            id = $('.page_51_goods_cate_edit_modal .goods_cate_tree li.on').data('id')
        }
        if (id == '0') {
            $(".page_51_goods_cate_delete_btn").removeClass("val_dialogTop").attr("name","");
            alert('请选择要删除的分类');

            return;
        }
        if ($('.page_51_goods_cate_edit_modal .goods_cate_tree li.on').next().children().length > 0) {
            $(".page_51_goods_cate_delete_btn").removeClass("val_dialogTop").attr("name","");
            alert('删除失败，请先删除下一级分类');
            return;
        }else{
            $(".page_51_goods_cate_delete_btn").addClass("val_dialogTop").attr("name","xt_gnsz_goodDeletezd");
        }
       /!* if (confirm('确定要删除分类吗？')) {

        }*!/
        $(".zcj_goods_unit_new_delete_sure").die().live("click",function(){
            GoodsCate.delete(id, function (data) {
                if(data.code==0){
                    page_51_goods_cate_news_render_cate_tree();
                }else{
                    alert(data.msg)
                }

            });
        });

    });


    /!*page_51_goods_cate_news_render_cate_tree();*!/

});*/
    // 去掉字符串首尾空格
    function strTrim(str) {
        return str.replace(/^\s+|\s+$/g, "");
    }
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
                console.log(oE);
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
                console.log(e);
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
                console.log(oE);
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
                console.log(e);
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
                    console.log(e);
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
        console.log(curOperateCateId);
    });
    //删除整机商品分类
    $('.pro_category_setting_del_btn').die('click').live('click', function () {
        curOperateCateId = $('.pro_category_setting_list_ul .Sideslip_list_on').attr('goodscateid');
        console.log(curOperateCateId);
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
                console.log(oE);
                if (oE.code == 0) {
                    $('.tanceng').css('display', 'none').find('div').remove();
                    getProCategoryGoodsListFn();
                    getProCategorySettingListFn();
                }
            },
            error: function (e) {
                console.log(e);
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
                    console.log(e);
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
                $('.tanceng .cur_worksp_addbx ul.inp_add_list_3').append('<li attroptionid="0" style="margin-top: 1px;">' + $('.tanceng .pro_category_goods_add_option_list>div').eq(i).find('input:text').val() + ' <i></i></li>')
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
        console.log(proCategoryGoodsData);
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
                console.log(oE);
                if (oE.code == 0) {
                    $('.tanceng').css('display', 'none').find('div').remove();
                    getProCategoryGoodsListFn();
                } else {
                    alert(oE.msg);
                }
            },
            error: function (e) {
                console.log(e);
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
        console.log(curOperateCateId);
        $.ajax({
            url: SERVER_URL + '/product-category/loadcategory',
            type: 'GET',
            data: {
                token: token,
                id: curOperateCateId
            },
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                var data = oE.data;
                console.log(data);
                //分类名称
                $('.tanceng .pro_category_goods_create_name').val(data['name']);
                //属性列表
                var attrList = '';
                if (data['attrList']) {
                    $.each(data['attrList'], function (i, v) {
                        var attrOptionList = '';
                        $.each(v['list'], function (i2, v2) {
                            //if (v['list'] && v['list'][i2]['value'] != '') {
                            attrOptionList += '<li attroptionid="' + v2['id'] + '" style="margin-top: 1px;" class="' + (v2['value'] == '' ? 'lik_option_none none' : '') + '">' + v2['value'] + ' <i></i></li>'
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
                        <div class="goods_add_select_box ' + (attrOptionList != '' ? '' : 'none') + '" style="position: relative;">\
                        <i class="goods_sort_up"></i>\
                        <div class="goods_add_select_box_con" style="position: relative;">\
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
                console.log(e);
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
        $(this).parents('.t_textinput').remove();
        tjfl_num();
    });

    //编辑分类 - 提交
    $('.tanceng .pro_category_goods_edit_submit_btn').die('click').live('click', function () {
        console.log(attrOptionDelId);
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
         console.log($('.tanceng .pro_category_tjfl_dialog_box .worksp_addbx_list').eq(i).find('.inp_add_list li').length);
         if ($('.tanceng .pro_category_tjfl_dialog_box .worksp_addbx_list').eq(i).find('.inp_add_list li').length > 1) {
         attrOptionDelId += $('.tanceng .pro_category_tjfl_dialog_box .worksp_addbx_list').eq(i).find('.lik_option_none').attr('attroptionid') + ',';
         }
         });*/
        proCategoryGoodsData.attr_info = arrayToJson(getJsonArr(attrInfArr));
        console.log(proCategoryGoodsData);
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
                    console.log(oE);
                    if (oE.code == 0) {
                    }
                },
                error: function (e) {
                    console.log(e);
                }
            });
        }
        $.ajax({
            url: SERVER_URL + '/product-category/add',
            type: 'POST',
            data: proCategoryGoodsData,
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                if (oE.code == 0) {
                    $('.tanceng').css('display', 'none').find('div').remove();
                    getProCategoryGoodsListFn();
                }
            },
            error: function (e) {
                console.log(e);
            }
        });

    });

    //分类排序 上移下移操作函数
    function proCateUpDownBtnDisFn() {
        var index = $('.pro_category_nav_ul li.tabhover2').index();
        console.log(index);
        if (index == 0) {
            console.log($('.pro_category_goods_list_ul li.Sideslip_list_on').index());
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
            console.log($('.pro_category_setting_list_ul li.Sideslip_list_on').index());
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
                console.log(e);
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
                console.log(oE);
                if (oE.code == 0) {
                    $('.pro_category_nav_ul li.tabhover2').trigger('click');
                }
            },
            error: function (e) {
                alert(e.msg);
                console.log(e);
            }
        });
    });

    /*$('.sp_sort_con li').live('click', function () {
     proCateUpDownBtnDisFn();
     });*/

});