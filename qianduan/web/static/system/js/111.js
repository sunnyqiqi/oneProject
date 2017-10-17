
/***********系统设置》销售设置***************/
$(function(){
    //var SERVER_URL="http://192.168.0.167:9091";
    var token=Admin.get_token();
    //var token='2017051308443559139-1-4';
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
             if(data['children'] && data['children'].length > 0){
                html += '<li class="left_1" data-id="' + data["id"] + '" data-pid="' + data["pid"] + '" data-name="' + data['name'] + '">' + html_i_list_before + '<span class="icon_open change_ba"></span><span class="icon_file"></span><span class="list_msg">' + data['name'] + '</span></li>';
            }else{
                html += '<li class="left_1" data-id="' + data["id"] + '" data-pid="' + data["pid"] + '" data-name="' + data['name'] + '">' + html_i_list_before + '<span class="change_ba"></span><span class="icon_file"></span><span class="list_msg">' + data['name'] + '</span></li>';
            }

            if (data['children'] && data['children'].length > 0) {
                html += tree_list_dialog(data['children'], deep + 1);
            }
            html += '</li>';
            html += '</ul>'
        });
        return html
    }
    //客户信息
function new_create_custom(){
    $('.ven_custom_setting_info_field_new_list_khset').find('.zcj_kh_info_show').remove();
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
            console.log(oE);
            if (oE.code == 0) {
                var datalist = oE.datalist;
                numTotal += parseFloat(datalist.length);
                var venCusSetInfoFieldOldHtml = '';
                $.each(datalist, function (i, v) {
                    venCusSetInfoFieldOldHtml += '<div class="m_bottom_10 zcj_kh_info_show" style="clear:both">\
                                                    <div class="t_textinput left" style="width: 67%;">\
                                                    <div class="t_left"><i class="c_r v_hidden">*</i>自定义</div>\
                                                    <div class="t_right clearfix">\
                                                    <div class="inline_block select_mormal select_100 left">\
                                                    <input type="text" class="select_input c_3 ven_custom_setting_info_field_new" value="' + v['title'] + '" />\
                                                    </div>\
                                                    </div>\
                                                    </div>\
                                                    <div class="cg_ghs_setul">\
                                                    <button class="but_green page31_khsxAdd">+</button>\
                                                    <button class="but_red page31_khsxDelete">-</button>\
                                                    </div>\
                                                    </div>'
                });
                $('.ven_custom_setting_info_field_new_list_khset').prepend(venCusSetInfoFieldOldHtml);
            }
        }
    });
    dialogBoxAutoHeight('.ven_custom_setting_dialog', numTotal)
}
//联系人信息
function new_cteate_linkman(){
    $('.ven_custom_setting_cont_field_new_list_khset').find('.zcj_lxr_info_show').remove();
    var numTotal = 0;
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
            console.log('10000');
            console.log(oE);
            console.log('10000');
            if (oE.code == 0) {
                var datalist = oE.datalist;
                numTotal += parseFloat(datalist.length);
                var venCusSetContFieldOldHtml = '';
                $.each(datalist, function (i, v) {
                    venCusSetContFieldOldHtml += '<div class="m_bottom_10 zcj_lxr_info_show" style="clear:both">\
                                                    <div class="t_textinput left" style="width: 67%;">\
                                                    <div class="t_left"><i class="c_r v_hidden">*</i>自定义</div>\
                                                    <div class="t_right clearfix">\
                                                    <div class="inline_block select_mormal select_100 left">\
                                                    <input type="text" class="select_input c_3 ven_custom_setting_info_field_new" value="' + v['title'] + '" />\
                                                    </div>\
                                                    </div>\
                                                    </div>\
                                                    <div class="cg_ghs_setul">\
                                                    <button class="but_green page31_khsxAdd">+</button>\
                                                    <button class="but_red page31_khsxDelete">-</button>\
                                                    </div>\
                                                    </div>\
                            </div>\
                            </div>'
                });
                $('.ven_custom_setting_cont_field_new_list_khset').prepend(venCusSetContFieldOldHtml);
            }
        }
    });
    dialogBoxAutoHeight('.ven_custom_setting_dialog', numTotal)
}
    //客户设置
    $('#zcj_xsset_kh_set_left_tab').die('click').live('click', function () {
        new_create_custom();
        //联系人信息
        new_cteate_linkman();

    });
    //弹窗高度适应
    function dialogBoxAutoHeight(className, numTotal) {
        if (numTotal > 7) {
            numTotal = 7;
            return;
        }
        $(className).css('minHeight', 300 + 45 * numTotal)
    }
    $('#zcj_xsset_kh_set_left_tab').trigger('click')
//客户设置 - 保存
    $('.ven_custom_setting_save_btn').die('click').live('click', function () {

        var arrVenCusSetInfoField = [];
        //客户信息 - 新
        $.each($('.ven_custom_setting_info_field_new_list_khset .ven_custom_setting_info_field_new'), function (i, v) {
            if ($('.ven_custom_setting_info_field_new_list_khset .ven_custom_setting_info_field_new').eq(i).val() == '如QQ号') {
                return true;
            }
            arrVenCusSetInfoField.push($('.ven_custom_setting_info_field_new_list_khset .ven_custom_setting_info_field_new').eq(i).val())
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
                    new_create_custom();
                    $(".zcj_kh_vale_v .ven_custom_setting_info_field_new").val('如QQ号').css('color','#ccc')
                }
            }
        });
        var arrVenCusSetContField = [];
        //客户联系人信息 - 新
        $.each($('.ven_custom_setting_cont_field_new_list_khset .ven_custom_setting_info_field_new'), function (i, v) {
            if ($('.ven_custom_setting_cont_field_new_list_khset .ven_custom_setting_info_field_new').eq(i).val() == '如QQ号') {
                return true;
            }
            arrVenCusSetContField.push($('.ven_custom_setting_cont_field_new_list_khset .ven_custom_setting_info_field_new').eq(i).val())
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
                    new_cteate_linkman();
                    $(".zcj_lxr_vale_v .ven_custom_setting_info_field_new").val('如QQ号').css('color','#ccc')
                }
            }
        });
        $(this).closest('.dialog_box').remove();
        $('.tanceng').css('display', 'none')
    })
    // /*客户设置方法*/
    // function kh_set_zd_fn(){
    //     //客户信息
    //     $.ajax({
    //         url: SERVER_URL + '/customer/settinglist',
    //         type: 'GET',
    //         data: {
    //             token: token,
    //             thetype: 4
    //         },
    //         success: function (e) {
    //             var oE = eval("(" + e + ")");
    //             if (oE.code == 0) {
    //                 var datalist = oE['datalist'];
    //                 var venCusSetInfoFieldOldHtml = '';
    //                 $.each(datalist, function (i, v) {
    //                     venCusSetInfoFieldOldHtml += '<div class="t_textinput">\
    //                         <div class="t_left"><i class="c_r v_hidden">*</i><span class="ven_custom_setting_info_field_old">' + v['title'] + '</span></div>\
    //                         <div class="t_right clearfix">\
    //                         <input type="text" class="time_input inp_noInput" value="" readonly="true">\
    //                         <span class="t_right_span ven_custom_setting_field_del" style="background:#ff6c60;">删除</span>\
    //                         </div>\
    //                         </div>'
    //                 });
    //                 $('.ven_custom_setting_info_field_old_list').html(venCusSetInfoFieldOldHtml);
    //             }
    //         }
    //     });
    //
    // }
    // function kh_info_fn() {
    //     //联系人信息
    //     $.ajax({
    //         url: SERVER_URL + '/customer/settinglist',
    //         type: 'GET',
    //         data: {
    //             token: token,
    //             thetype: 5
    //         },
    //         success: function (e) {
    //             var oE = eval("(" + e + ")");
    //             if (oE.code == 0) {
    //                 var datalist = oE['datalist'];
    //                 var venCusSetContFieldOldHtml = '';
    //                 $.each(datalist, function (i, v) {
    //                     venCusSetContFieldOldHtml += '<div class="t_textinput">\
    //                         <div class="t_left"><i class="c_r v_hidden">*</i><span class="ven_custom_setting_info_field_old">' + v['title'] + '</span></div>\
    //                         <div class="t_right clearfix">\
    //                         <input type="text" class="time_input inp_noInput" value=""\
    //                     readonly="true">\
    //                         <span class="t_right_span ven_custom_setting_field_del"\
    //                     style="background:#ff6c60;">删除</span>\
    //                         </div>\
    //                         </div>'
    //                 });
    //                 $('.ven_custom_setting_cont_field_old_list').html(venCusSetContFieldOldHtml);
    //             }
    //         }
    //     });
    // }
    // //客户设置
    // $('#zcj_xsset_kh_set_left_tab').die().live('click', function () {
    //
    //     kh_set_zd_fn();
    //     kh_info_fn();
    //     //客户设置 - 保存
    //     $('.ven_custom_setting_save_btn').die().live('click', function () {
    //         var arrVenCusSetInfoField = [];
    //         //客户信息 - 旧
    //         $.each($('.ven_custom_setting_info_field_old_list .ven_custom_setting_info_field_old'), function (i, v) {
    //             arrVenCusSetInfoField.push($('.ven_custom_setting_info_field_old_list .ven_custom_setting_info_field_old').eq(i).html())
    //         });
    //         //客户信息 - 新
    //         $.each($('.ven_custom_setting_info_field_new_list .ven_custom_setting_info_field_new'), function (i, v) {
    //             if ($('.ven_custom_setting_info_field_new_list .ven_custom_setting_info_field_new').eq(i).val() != '如QQ号') {
    //                 arrVenCusSetInfoField.push($('.ven_custom_setting_info_field_new_list .ven_custom_setting_info_field_new').eq(i).val())
    //             }
    //
    //         });
    //         $.ajax({
    //             url: SERVER_URL + '/customer/setting',
    //             type: 'POST',
    //             data: {
    //                 token: token,
    //                 thetype: 4,
    //                 customer: arrVenCusSetInfoField
    //             },
    //             success: function (e) {
    //                 var oE = eval("(" + e + ")");
    //                 if (oE.code == 0) {
    //                     kh_set_zd_fn();
    //                     var ss=$('.ven_custom_setting_info_field_new_list .ven_custom_setting_info_field_new').length
    //                     if(ss>1){
    //                         $('.ven_custom_setting_info_field_new_list .ven_custom_setting_info_field_new').eq(0).remove();
    //                     }
    //                 }
    //             }
    //         });
    //
    //
    //
    //         var arrVenCusSetContField = [];
    //         //客户联系人信息 - 旧
    //         $.each($('.ven_custom_setting_cont_field_old_list .ven_custom_setting_cont_field_old'), function (i, v) {
    //             arrVenCusSetContField.push($('.ven_custom_setting_cont_field_old_list .ven_custom_setting_cont_field_old').eq(i).html())
    //         });
    //         //客户联系人信息 - 新
    //         $.each($('.ven_custom_setting_cont_field_new_list .ven_custom_setting_cont_field_new'), function (i, v) {
    //             if ($('.ven_custom_setting_cont_field_new_list .ven_custom_setting_cont_field_new').eq(i).val() != '如QQ号') {
    //                 arrVenCusSetContField.push($('.ven_custom_setting_cont_field_new_list .ven_custom_setting_cont_field_new').eq(i).val())
    //             }
    //
    //         });
    //         $.ajax({
    //             url: SERVER_URL + '/customer/setting',
    //             type: 'POST',
    //             data: {
    //                 token: token,
    //                 thetype: 5,
    //                 customer: arrVenCusSetContField
    //             },
    //             success: function (e) {
    //                 var oE = eval("(" + e + ")");
    //                 if (oE.code == 0) {
    //                     kh_info_fn();
    //                     var cc=$('.ven_custom_setting_cont_field_new_list .ven_custom_setting_cont_field_new').length
    //
    //                     if(cc>1){
    //                         $('.ven_custom_setting_cont_field_new_list .ven_custom_setting_cont_field_new').eq(0).remove();
    //                     }
    //                 }
    //             }
    //         });
    //         /* $(this).closest('.dialog_box').remove();
    //          $('.tanceng').css('display', 'none')*/
    //     })
    // })
    // $('#zcj_xsset_kh_set_left_tab').trigger("click");


//     // 客户>分类列表展示
//     function getCusListSort(vclass) {
//         $.ajax({
//             url: SERVER_URL + '/customer/arealist',
//             type: 'GET',
//             data: {
//                 token: token,
//                 pid: 0,
//                 status: 0
//             },
//             success: function (e) {
//
//                 var oE = eval("(" + e + ")");
//                 console.log(oE);
//                 var datalist = oE['datalist'];
//                 var html='<li class="left_all" data-id="0" data-name="所有分类"><span class="icon_open change_ba"></span><span class="icon_file"></span><span class="list_msg">所有分类</span></li>'
//                 var deep=0;
//                 $(vclass).html(html+tree_list_dialog(datalist,deep));
//
//             }
//         })
//     }
// /*客户分类*/
//     $("#zcj_xsset_kh_fl_left_tab").die().live("click",function(){
//         getCusListSort('.zcj_sy_kh_fl_list_show');
//         /*添加分类*/
//         $('.zcj_addfl_cate_add_btn').unbind('click').bind('click', function () {
//             invoke_tanceng(this, function () {
//
//                 var add_cate_modal = '.tanceng .zcj_add_cate_add_cate_modal ';
//                 var $input = $(add_cate_modal + 'input.fz_cate_name');
//                 $(add_cate_modal + '.zcj_select_kh_up_fl_val_put').data("id",0)
//                 /*选择上级分类*/
//                 $(".tanceng .zcj_select_khfl_up_btn").unbind('click').bind('click', function () {
//
//                     getCusListSort(".tanceng .zcj_upfl_select_list_tree .list_box_ulexitAll");
//
//                     $(".zcj_upfl_select_list_tree li").die('click').live('click', function () {
//
//                         var fl_id=$('.zcj_upfl_select_list_tree li.on').data('id')
//                         var fl_name=$('.zcj_upfl_select_list_tree li.on').data('name')
//                         $(".tanceng .zcj_kh_select_sjfl_end_btn").unbind('click').bind('click', function () {
//                             $(add_cate_modal + '.zcj_select_kh_up_fl_val_put').data("id",fl_id).val(fl_name);
//                             $(this).next().click();
//                         })
//                     })
//                 })
//
//                 $(add_cate_modal + '.fz_save').unbind('click').bind('click', function () {
//                     var c_pid=$(add_cate_modal + '.zcj_select_kh_up_fl_val_put').data("id")
//                     var me = this;
//                     var cate_name = $input.val();
//                     var cate_pid =c_pid;
//                     if(cate_name!='请填写分类名称' && cate_name!=''){
//                         $.ajax({
//                             url: SERVER_URL + '/customer/categoryadd',
//                             type: 'post',
//                             data: {
//                                 token: token,
//                                 pid:cate_pid,
//                                 name: cate_name
//                             },
//                             success: function (e) {
//                                 var oE = eval("(" + e + ")");
//                                 console.log(oE);
//                                 if(oE.code==0){
//                                     getCusListSort('.zcj_sy_kh_fl_list_show');
//                                     $(add_cate_modal + ".dialog_close").click();
//                                 }else{
//                                     alert(oE.msg);
//                                 }
//
//                             }
//                         })
//
//                     }else{
//                         alert('请填写分类名称');
//                     }
//
//                 });
//             })
//         });
//         /*编辑分类*/
//         $('.zcj_khfl_cate_edit_btn').on('click', function () {
//             var modal_class = '.zcj_kefl_name_cate_edit_modal ';
//             var btn_me = this;
//             invoke_tanceng(this, function () {
//                 $(".zcj_kh_cate_edit_cate_edit_modal .zcj_select_kh_edit_sjfl_tc_btn").unbind('click').bind('click', function () {
//
//                     getCusListSort(".tanceng .zcj_upfl_select_list_tree .list_box_ulexitAll");
//                     /* if($(".tanceng .zcj_bjfl_goods_select_list_tree li").next().children().length==0){
//                      $(this).find("change_ba").removeClass("icon_open");
//                      }*/
//                     $(".zcj_upfl_select_list_tree li").die('click').live('click', function () {
//
//                         var fl_id=$('.zcj_upfl_select_list_tree li.on').data('id')
//                         var fl_name=$('.zcj_upfl_select_list_tree li.on').data('name')
//                         $(".tanceng .zcj_kh_select_sjfl_end_btn").unbind('click').bind('click', function () {
//                             $('.zcj_select_up_fl_name_val_show').data("id",fl_id).val(fl_name);
//                             $('.tanceng .zcj_kh_cate_edit_cate_edit_modal input.fz_cate_name').data("pid",fl_id);
//                             $(this).next().click();
//                         })
//                     })
//
//                 })
//
//                 var $li = $(modal_class + '.zcj_sy_kh_fl_list_show li.on');
//                 var text = $li.data('name');
//                 var id = $li.data('id');
//                 var pid = $li.data('pid');
//                 var cate_name_edit_modal = '.tanceng .zcj_kh_cate_edit_cate_edit_modal ';
//                 var $input = $(cate_name_edit_modal + 'input.fz_cate_name');
//                 $input.val(text).data('id', id).data('pid', pid);
//                 $(cate_name_edit_modal + '.fz_save').unbind('click').bind('click', function () {
//                     var me = this;
//                     var cate_id = $input.data('id');
//                     var cate_name = $input.val();
//                     var cate_pid = $input.data('pid');
//                     if(cate_name!='请填写分类名称' && cate_name!=''){
//                         $.ajax({
//                             url: SERVER_URL + '/customer/categoryupdate',
//                             type: 'post',
//                             data: {
//                                 token: token,
//                                 id:cate_id,
//                                 pid:cate_pid,
//                                 name: cate_name
//                             },
//                             success: function (e) {
//                                 var oE = eval("(" + e + ")");
//                                 console.log(oE);
//                                 if(oE.code==0){
//                                     getCusListSort('.zcj_sy_kh_fl_list_show');
//                                     $(cate_name_edit_modal + ".dialog_close").click();
//                                 }else{
//                                     alert(oE.msg);
//                                 }
//
//                             }
//                         })
//
//                     }else{
//                         alert('请填写分类名称');
//                     }
//
//                 });
//
//             });
//
//         });
//         /*上移、下移*/
//        /* $('.goods_cate_edit_change_sort').die('click').live('click', function () {
//             var action = $(this).data('action');
//             var id = $('.page_51_goods_cate_edit_modal .goods_cate_tree li.on').data('id');
//             if (!id) {
//                 return;
//             }
//             GoodsCate.up_or_down(id, action, function (data) {
//                 console.log(data);
//                 getCusListSort('.zcj_sy_kh_fl_list_show');
//             });
//         });
// */
//         /*删除分类*/
//         $('.zcj_khfl_del_cate_delete_btn').on('click', function () {
//             var id = 0;
//             if ($('.zcj_kefl_name_cate_edit_modal .zcj_sy_kh_fl_list_show li.on').length > 0) {
//                 id = $('.zcj_kefl_name_cate_edit_modal .zcj_sy_kh_fl_list_show li.on').data('id')
//             }
//             if (id == '0') {
//                 $(".zcj_khfl_del_cate_delete_btn").removeClass("val_dialogTop").attr("name","");
//                 alert('请选择要删除的分类');
//
//                 return;
//             }
//             if ($('.zcj_kefl_name_cate_edit_modal .zcj_sy_kh_fl_list_show li.on').next().children().length > 0) {
//                 $(".zcj_khfl_del_cate_delete_btn").removeClass("val_dialogTop").attr("name","");
//
//                 alert('删除失败，请先删除下一级分类');
//                 return;
//             }else{
//                 $(".zcj_khfl_del_cate_delete_btn").addClass("val_dialogTop").attr("name","xt_gnsz_xsDeletesort");
//             }
//             /* if (confirm('确定要删除分类吗？')) {
//
//              }*/
//             $(".zcj_kh_unit_new_delete_sure").die().live("click",function(){
//                 var _this=this;
//                 $.ajax({
//                     url: SERVER_URL + '/customer/categorydel',
//                     type: 'post',
//                     data: {
//                         token: token,
//                         id:id
//
//                     },
//                     success: function (e) {
//                         var oE = eval("(" + e + ")");
//                         console.log(oE);
//                         if(oE.code==0){
//                             getCusListSort('.zcj_sy_kh_fl_list_show');
//                             $(_this).parents('.zcj_cate_name_delfl_modal').find(".dialog_close").click();
//                         }else{
//                             alert(oE.msg);
//                         }
//
//                     }
//                 })
//                 /*GoodsCate.delete(id, function (data) {
//                     if(data.code==0){
//                         getCusListSort('.zcj_sy_kh_fl_list_show');
//                     }else{
//                         alert(data.msg)
//                     }
//
//                 });*/
//             });
//
//         });
//
//     });
/*************************************销售机会设置*****************************/
/*自定义方法*/
function xsjh_custom_fn() {
    $.ajax({
        url: SERVER_URL + '/customer/settinglist',
        type: 'GET',
        data: {
            token: token,
            thetype: 3
        },
        async: false,
        dataType: 'json',
        success: function (oE) {
            console.log(oE);
            if (oE.code == 0) {
                var datalist = oE.datalist;
                var venSellChanceFieldHtml = '';
                $.each(datalist, function (i, v) {
                    venSellChanceFieldHtml += '<div class="m_bottom_10 zcj_xs_jh_set_zdy" style="clear:both">\
                            <div class="t_textinput left" style="width: 67%;">\
                            <div class="t_left"><i class="c_r v_hidden">*</i>自定义</div>\
                            <div class="t_right clearfix">\
                            <div class="inline_block select_mormal select_100 left">\
                            <input type="text" class="select_input ven_custom_setting_info_field_new_chance c_3" value="' + v['title'] + '">\
                            </div>\
                            </div>\
                            </div>\
                            <div class="cg_ghs_setul">\
                            <button class="but_green page34_khsxAdd">+</button>\
                            <button class="but_red page34_khsxDelete">-</button>\
                            </div>\
                            </div>'
                });
                $('.ven_sell_chance_setting_oldlist').html(venSellChanceFieldHtml);
            } else {
                alert(oE.msg);
            }
        }
    });
}
/*未成交反馈原因方法*/
function xsjh_no_cj_fn(){
    $.ajax({
        url: SERVER_URL + '/customer/settinglist',
        type: 'GET',
        data: {
            token: token,
            thetype: 6
        },
        async: false,
        dataType: 'json',
        success: function (oE) {
            console.log(oE);
            if (oE.code == 0) {
                var datalist = oE.datalist;
                var venSellChanceFieldHtml = '';
                $.each(datalist, function (i, v) {
                    venSellChanceFieldHtml += '<div class="m_bottom_10 zcj_xs_jh_set_no_cause">\
                            <div class="t_textinput left" style="width: 67%;margin-bottom:10px;">\
                            <div class="t_left"><i class="c_r v_hidden">*</i>自定义</div>\
                            <div class="t_right clearfix">\
                            <div class="inline_block select_mormal select_100 left">\
                            <input type="text" class="select_input ven_sell_chance_setting_fail_reason_inp c_3" value="'+v['title']+'">\
                        </div>\
                        </div>\
                        </div>\
                        <div class="cg_ghs_setul">\
                            <button class="but_green page34_failReasonAdd">+</button>\
                            <button class="but_red page34_failReasonDelete">-</button>\
                            </div>\
                            </div>'
                });
                $('.ven_sell_chance_setting_wcjyy_field_old_list').html(venSellChanceFieldHtml);
            } else {
                alert(oE.msg);
            }
        }
    });
}
//设置自定义字段
    $('#zcj_xsset_xsjh_left_tab').die('click').live('click', function () {
        xsjh_custom_fn();
        xsjh_no_cj_fn();
        dialogBoxAutoHeight('.ven_sell_chance_setting_dialog', $('.ven_sell_chance_setting_dialog div.m_bottom_10').length - 2);
        $('.ven_sell_chance_setting_fail_reason_btn').die('click').live('click', function () {
            if ($(this).is(':checked')) {
                $('.ven_sell_chance_setting_fail_reason_inp').attr('disabled', null);
            } else {
                $('.ven_sell_chance_setting_fail_reason_inp').attr('disabled', 'disabled');
            }
        })
    });
    //设置自定义字段 - 保存
    $('.ven_sell_chance_setting_submit').die('click').live('click', function () {
        var venSellChanceField = [];
        $.each($('.ven_sell_chance_setting_oldlist>.m_bottom_10'), function (i, v) {
            venSellChanceField.push($('.ven_sell_chance_setting_oldlist .t_textinput').eq(i).find('.ven_custom_setting_info_field_new_chance').val());
        });
        $.each($('.ven_custom_setting_info_field_new_list .ven_custom_setting_info_field_new'), function (i, v) {
            if ($('.ven_custom_setting_info_field_new_list .ven_custom_setting_info_field_new').eq(i).val() != '') {
                venSellChanceField.push($('.ven_custom_setting_info_field_new_list .ven_custom_setting_info_field_new').eq(i).val());
            }
        });
        var venSellChanceFaildField = [];
        $.each($('.ven_sell_chance_setting_wcjyy_field_old_list>.m_bottom_10'), function (i, v) {
            venSellChanceFaildField.push($('.ven_sell_chance_setting_wcjyy_field_old_list>.m_bottom_10').eq(i).find('.ven_sell_chance_setting_fail_reason_inp').val());
        });
        $.each($('.ven_sell_chance_setting_wcjyy_field_new_list .ven_sell_chance_setting_fail_reason_inp'), function (i, v) {
            if ($('.ven_sell_chance_setting_wcjyy_field_new_list .ven_sell_chance_setting_fail_reason_inp').eq(i).val() != '') {
                venSellChanceFaildField.push($('.ven_sell_chance_setting_wcjyy_field_new_list .ven_sell_chance_setting_fail_reason_inp').eq(i).val());
            }
        });
        console.log(venSellChanceField);
        $.ajax({
            url: SERVER_URL + '/customer/setting',
            type: 'POST',
            data: {
                token: token,
                thetype: 3,
                customer: venSellChanceField
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    xsjh_custom_fn();
                    $(".ven_custom_setting_info_field_new_list .ven_custom_setting_info_field_new").val('')
                    /*$(this).closest('.dialog_box').remove();
                     $('.tanceng').css('display', 'none');*/
                } else {
                    alert(oE.msg);
                }
            }
        });
        $.ajax({
            url: SERVER_URL + '/customer/setting',
            type: 'POST',
            data: {
                token: token,
                thetype: 6,
                customer: venSellChanceFaildField
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    xsjh_no_cj_fn();
                    $(".ven_sell_chance_setting_wcjyy_field_new_list .ven_sell_chance_setting_fail_reason_inp").val('')
                    // $(this).closest('.dialog_box').remove();
                    // $('.tanceng').css('display', 'none');
                } else {
                    alert(oE.msg);
                }
            }
        });
    });
    /*销售机会设置*/
// function  zd_xsjh_fn(){
//     $.ajax({
//         url: SERVER_URL + '/customer/settinglist',
//         type: 'GET',
//         data: {
//             token: token,
//             thetype: 3
//         },
//         success: function (e) {
//             var oE = eval("(" + e + ")");
//             if (oE.code == 0) {
//                 var datalist = oE['datalist'];
//                 var venSellChanceFieldHtml = '';
//                 $.each(datalist, function (i, v) {
//                     venSellChanceFieldHtml += '<div class="t_textinput">\
//                             <div class="t_left">' + v['title'] + '</div>\
//                             <div class="t_right clearfix">\
//                             <input type="text" class="time_input inp_noInput" value="" readonly="true">\
//                             <span class="t_right_span page34_sxjhzdyDelete ven_custom_setting_field_del" style="cursor: pointer;background: #FF6C60;">删除</span>\
//                             </div>\
//                             </div>'
//                 });
//                 $('.ven_sell_chance_setting_oldlist').html(venSellChanceFieldHtml);
//             } else {
//                 alert(oE.msg);
//             }
//         }
//     });
// }
// //设置自定义字段
//     $('#zcj_xsset_xsjh_left_tab').die().live('click', function () {
//         zd_xsjh_fn();
//        /* $('.tanceng .ven_sell_chance_setting_fail_reason_btn').live('click', function () {
//             if ($(this).is(':checked')) {
//                 $('.tanceng .ven_sell_chance_setting_fail_reason_inp').attr('disabled', null);
//             } else {
//                 $('.tanceng .ven_sell_chance_setting_fail_reason_inp').attr('disabled', 'disabled');
//             }
//         })*/
//
//
//         //设置自定义字段 - 保存
//         $('.ven_sell_chance_setting_submit').die().live('click', function () {
//             var venSellChanceField = [];
//             $.each($('.ven_sell_chance_setting_oldlist .t_textinput'), function (i, v) {
//                 venSellChanceField.push($('.ven_sell_chance_setting_oldlist .t_textinput').eq(i).find('.t_left').text());
//             });
//             $.each($('.ven_sell_chance_setting_newlist .ven_sell_chance_setting_newlist_field_inp'), function (i, v) {
//                 if ($('.ven_sell_chance_setting_newlist .ven_sell_chance_setting_newlist_field_inp').eq(i).val() != '如QQ号') {
//                     venSellChanceField.push($('.ven_sell_chance_setting_newlist .ven_sell_chance_setting_newlist_field_inp').eq(i).val());
//                 }
//             });
//             $.ajax({
//                 url: SERVER_URL + '/customer/setting',
//                 type: 'POST',
//                 data: {
//                     token: token,
//                     thetype: 3,
//                     customer: venSellChanceField
//                 },
//                 success: function (e) {
//                     var oE = eval("(" + e + ")");
//                     if (oE.code == 0) {
//                        /* $(this).closest('.dialog_box').remove();*/
//                         zd_xsjh_fn();
//                        /* $('.tanceng').css('display', 'none');*/
//                     } else {
//                         alert(oE.msg);
//                     }
//                 }
//             })
//         })
//     })

    $("#zcj_xsset_shd_set_left_tab").die().live("click",function(){
        /*读取时长设置*/
        $.ajax({
            url: SERVER_URL + '/afterorder/gettime',
            type: 'POST',
            data: {
                token: token
            },
            success: function (e) {
                // 将返回值转换为json对象
                var oE = eval("(" + e + ")");
                console.log(oE);
                if (oE.code == 0) {
                    $(".after_order_setting_txsg").val(oE['afterorder_interval']);
                    $(".after_order_setting_cxfpsg").val(oE['afterorder_allot']);
                    $(".after_order_setting_zdfp_inp").val(oE['after_auto_num']);
                    if(oE['after_auto_set']==0){
                        $(".after_order_setting_checkbox").attr('checked',false);
                        $(".after_order_setting_zdfp_inp").attr('disabled',true);
                    }else{
                        $(".after_order_setting_checkbox").attr('checked',true);
                        $(".after_order_setting_zdfp_inp").attr('disabled',false);
                    }

                }else{
                    alert(oE.msg);
                }
            },
            error:function(){
                alert("更新失败，请稍后再试");
            }
        })

        //自动分配时长设置
        var afterOrderSettimeData = {
            token: token,
            afterorder_interval: '',     //售后提醒时间间隔，分钟
            afterorder_allot: '',        //重新分配时隔
            after_auto_set: 0,           //开启自动分配,0否，1是
            after_auto_num: ''            //少于几单会自动分配
        };
        //开启自动分配
        $('.after_order_setting_checkbox').live('click', function () {
            if ($(this).attr('checked') == 'checked') {
                $('.after_order_setting_zdfp_inp').attr('disabled', null)
            } else {
                $('.after_order_setting_zdfp_inp').attr('disabled', 'disabled')
            }
        });
        //设置提交
        $('.after_order_setting_submit').live('click', function () {
            if ($('.after_order_setting_txsg').val() == '') {
                alert('请输入提醒时隔');
                return false;
            } else {
                afterOrderSettimeData.afterorder_interval = $('.after_order_setting_txsg').val();
            }
            if ($('.after_order_setting_cxfpsg').val() == '') {
                alert('请输入重新分配时隔');
                return false;
            } else {
                afterOrderSettimeData.afterorder_allot = $('.after_order_setting_cxfpsg').val();
            }
            if ($('.after_order_setting_checkbox').attr('checked') == 'checked') {
                afterOrderSettimeData.after_auto_set = 1;
                afterOrderSettimeData.after_auto_num = $('.after_order_setting_zdfp_inp').val();
            } else {
                afterOrderSettimeData.after_auto_set = 0;
                afterOrderSettimeData.after_auto_num = '';
            }
            $.ajax({
                url: SERVER_URL + '/afterorder/settime',
                type: 'POST',
                data: afterOrderSettimeData,
                success: function (e) {
                    // 将返回值转换为json对象
                    var oE = eval("(" + e + ")");
                    console.log(oE);
                    if (oE.code == 0) {
                       /* $(this).closest('.dialog_box').remove();
                        $('.tanceng').css('display', 'none');*/
                       alert(oE.msg);
                    }else{
                        alert(oE.msg);
                    }
                },
                error:function(){
                    alert("更新失败，请稍后再试");
                }
            })
        });
    });





});