
/***********系统设置》采购设置***************/
$(function(){
    //var SERVER_URL="http://192.168.0.167:9091";
    //	dialog tree list
    function tree_list_dialog(datalist, deep) {
        var html = '';
        $.each(datalist, function (index, data) {
            var html_i_list_before = '<i class="list_before_span"></i>';
            html += '<ul class="ul1">';
            for (var j = 0; j < deep; j++) {
                html_i_list_before += '<i class="list_before_span"></i>'
            }
            if(data['children'].length > 0){
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
    function gys_set_list_fn(){

    }
    //供应商设置
    $('#zcj_cg_set_gys_supplier_tab').die('click').live('click', function () {

        $.ajax({
            url: SERVER_URL + '/supplier/settinglist',
            type: 'GET',
            data: {
                token: token
            },
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                if (oE.code == 0) {
                    var data = oE.datalist;
                    var supSettingHtml = '';
                    var conSettingHtml = '';
                    var numTotal = data['supplier_info'].length + data['contacts_info'].length;
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
                            <button class="but_green sys_xsset_butAdd" style="margin-left:0;">+</button>\
                            <button class="but_red sys_xsset_butDelete" style="margin-left:0;">-</button>\
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
                    /*supSettingHtml += '<div class="m_bottom_10" style="clear:both">\
                     <div class="t_textinput left" style="width: 75%;">\
                     <div class="t_left"><i class="c_r v_hidden">*</i>自定义</div>\
                     <div class="t_right clearfix">\
                     <div class="inline_block select_mormal select_100 left">\
                     <input type="text" class="select_input pur_sup_setting_info_field_new" value="如QQ号" onfocus="fn_focus(this);" onblur="fn_blur(this);"/>\
                     </div>\
                     </div>\
                     </div>\
                     <div class="cg_ghs_setul" style="width:20%">\
                     <button class="but_green page64_gysszAdd" style="margin-left:0;">+</button>\
                     <button class="but_red page31_khsxDelete" style="margin-left:0;">-</button>\
                     </div>\
                     </div>';*/
                    $('.zj_page_user_defined_supplier_fields').html(supSettingHtml);
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
                            <button class="but_green sys_xsset_butAdd" style="margin-left:0;">+</button>\
                            <button class="but_red sys_xsset_butDelete" style="margin-left:0;">-</button>\
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
                    /*conSettingHtml += '<div class="m_bottom_10" style="clear:both">\
                     <div class="t_textinput left" style="width: 75%;">\
                     <div class="t_left"><i class="c_r v_hidden">*</i>自定义</div>\
                     <div class="t_right clearfix">\
                     <div class="inline_block select_mormal select_100 left">\
                     <input type="text" class="select_input pur_sup_setting_info_field_new" value="如QQ号" onfocus="fn_focus(this);" onblur="fn_blur(this);"/>\
                     </div>\
                     </div>\
                     </div>\
                     <div class="cg_ghs_setul" style="width:20%">\
                     <button class="but_green page64_gysszAdd" style="margin-left:0;">+</button>\
                     <button class="but_red page31_khsxDelete" style="margin-left:0;">-</button>\
                     </div>\
                     </div>';*/
                    $('.zj_user_defined_contact_fields').html(conSettingHtml);
                    $('.pur_sup_setting_dialog').css('minHeight', 200 + 45 * numTotal);
                }
            }
        });


        $('.zj_pur_sup_setting_save_btn').die('click').live('click', function () {
            var supSettingFieldNew = [];
            var $supSetting = $('.zj_page_user_defined_supplier_fields .m_bottom_10');
            $.each($supSetting, function (i, v) {
                if ($supSetting.eq(i).find('input.pur_sup_setting_info_field_new').val() != '如QQ号') {
                    supSettingFieldNew.push($supSetting.eq(i).find('input.pur_sup_setting_info_field_new').val());
                }
            });
            var conSettingFieldNew = [];
            var $conSetting = $('.zj_user_defined_contact_fields .m_bottom_10');
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
           /* $(this).closest('.dialog_box').remove();
            $('.tanceng').css('display', 'none');*/
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
      //   var me = this;
      //   var modal_class = '.page_64_supplier_config_modal ';
      //   var db_supplier_setting_data = null;
      //   var page_supplier_setting_data = {'supplier_info': [], 'contacts_info': []};
      //   function gys_set_list_fn(){
      //       $.ajax({
      //           type: 'post',
      //           url: SERVER_URL + '/supplier/settinglist',
      //           data: {
      //               'token':Admin.get_token()
      //           },
      //           async: false,
      //           dataType: "json",
      //           success: function (data) {
      //               console.log('2001');
      //               console.log(data);
      //               console.log('2001');
      //               /* invoke_tanceng(this, function () {*/
      //               db_supplier_setting_data = data['datalist'];
      //               _page_64_render_db_supplier_config_list();
      //               /* _page_64_render_supplier_config_list();*/
      //
      //               /* });*/
      //
      //           },
      //           error: function (data) {
      //               alert("刷新失败，请稍后再试");
      //           }
      //       });
      //   }
      // /*  SupplierSetting.all(function (data) {*/
      //
      //   gys_set_list_fn();
      //
      //  /* });*/
      //  /*保存*/
      //   $(modal_class + '.fz_sure').die('click').live('click', function () {
      //
      //       var that = this;
      //       var supplier_info = [];
      //       $(modal_class + '.supplier_field').each(function () {
      //           var value = $.trim($(this).val());
      //           if (value != '如QQ号') {
      //               supplier_info.push(value);
      //               supplier_info.push($(this).data('title'))
      //           }
      //
      //       });
      //
      //       var contact_info = [];
      //       $(modal_class + '.contact_field').each(function (i) {
      //           var value = $.trim($(this).val());
      //           if (value != '如QQ号') {
      //               contact_info.push(value);
      //               contact_info.push($(this).data('title'));
      //           }
      //
      //       });
      //
      //       SupplierSetting.save({
      //           'supplier_info':supplier_info,
      //           'contacts_info': contact_info
      //       }, function (data) {
      //           console.log(supplier_info);
      //           console.log(data);
      //           console.log(contact_info);
      //           if(data.code==0){
      //              /* _page_64_render_db_supplier_config_list();*/
      //               gys_set_list_fn();
      //               $(".page_64_page_user_defined_supplier_fields .supplier_field").val('如QQ号').css('color','#ccc')
      //               $(".page_64_page_user_defined_contact_fields .contact_field").val('如QQ号').css('color','#ccc')
      //               var ss=$(".page_64_page_user_defined_supplier_fields .m_bottom_10").length
      //               var cc=$(".page_64_page_user_defined_contact_fields .m_bottom_10").length
      //               if(ss>1){
      //                   $(".page_64_page_user_defined_supplier_fields .m_bottom_10").eq(0).remove();
      //               }
      //               if(cc>1){
      //                   $(".page_64_page_user_defined_contact_fields .m_bottom_10").eq(0).remove();
      //               }
      //
      //           }else {
      //               alert(data.msg);
      //           }
      //
      //           /*$(that).next().click();*/
      //       });
      //   });
      //   console.log(db_supplier_setting_data);
      //   function _page_64_render_db_supplier_config_list() {
      //       console.log("2000000000000000003333");
      //       console.log(db_supplier_setting_data);
      //       console.log('2000000000000000003333');
      //       var supplier_info_html = '';
      //       /*新建供应商信息自定义字段*/
      //       $.each(db_supplier_setting_data['supplier_info'], function (_, field) {
      //           supplier_info_html += '<div class="t_textinput">';
      //           supplier_info_html += ' <div class="t_left"><i class="c_r v_hidden">*</i>'+field['title']+'</div>';
      //           supplier_info_html += '<div class="t_right clearfix">';
      //           supplier_info_html += '<input type="text" class="time_input inp_noInput supplier_field" data-title="'+field['title']+'" value="" readonly="true">';
      //           supplier_info_html += '<span class="t_right_span val_dialogTop delete_supplier_supplier" style="background:#ff6c60;">删除</span>';
      //           supplier_info_html += '</div>';
      //           supplier_info_html += '</div>';
      //       });
      //       $(modal_class + '.page_64_db_user_defined_supplier_fields').html(supplier_info_html);
      //       supplier_info_html = null;
      //       /*删除*/
      //       $(modal_class + '.delete_supplier_supplier').unbind('click').bind('click', function () {
      //       $(this).parents(".t_textinput").remove();
      //          /* gys_set_list_fn();*/
      //           var value = $(this).prev().val();
      //          /* db_supplier_setting_data['supplier_info'] = _.filter(db_supplier_setting_data['supplier_info'], function (item) {
      //
      //               return item != value;
      //           });*/
      //          /* _page_64_render_db_supplier_config_list();*/
      //       });
      //       var contact_info_html = '';
      //       /*供应商联系人信息*/
      //       $.each(db_supplier_setting_data['contacts_info'], function (_, field) {
      //           contact_info_html += '<div class="t_textinput">';
      //           contact_info_html += ' <div class="t_left"><i class="c_r v_hidden">*</i>'+field['title']+'</div>';
      //           contact_info_html += '<div class="t_right clearfix">';
      //           contact_info_html += '<input type="text" class="time_input inp_noInput contact_field" data-title="'+field['title']+'" value="" readonly="true">';
      //           contact_info_html += '<span class="t_right_span val_dialogTop delete_supplier_contact" style="background:#ff6c60;">删除</span>';
      //           contact_info_html += '</div>';
      //           contact_info_html += '</div>';
      //       });
      //       $(modal_class + '.page_64_db_user_defined_contacts_fields').html(contact_info_html);
      //       /*删除*/
      //       $(modal_class + '.delete_supplier_contact').unbind('click').bind('click', function () {
      //           $(this).parents(".t_textinput").remove();
      //          /* gys_set_list_fn();*/
      //           var value = $(this).prev().val();
      //         /*  db_supplier_setting_data['contacts_info'] = _.filter(db_supplier_setting_data['contacts_info'], function (item) {
      //               return item != value;
      //           });
      //           _page_64_render_db_supplier_config_list();*/
      //       });
      //
      //   }
      //
      //   function _page_64_render_supplier_config_list() {
      //       var supplier_info_html = '';
      //       console.log("123456");
      //       console.log(page_supplier_setting_data);
      //       console.log(supplier_info_html);
      //       console.log('123456');
      //       /*添加字段*/
      //       /*新建供应商信息自定义字段*/
      //       $.each(page_supplier_setting_data['supplier_info'], function (_, field) {
      //           supplier_info_html += '<div class="m_bottom_10">';
      //           supplier_info_html += '<div class="t_textinput left" style="width: 85%;">';
      //           supplier_info_html += '<div class="t_left"><i class="c_r v_hidden">*</i>自定义</div>';
      //           supplier_info_html += '<div class="t_right clearfix">';
      //           supplier_info_html += '<div class="inline_block select_mormal select_25 left">';
      //           supplier_info_html += '<input type="text" class="select_input supplier_field" value="">';
      //           supplier_info_html += '</div>';
      //           supplier_info_html += '<div class="inline_block select_mormal select_75 right">';
      //           supplier_info_html += '<input type="text" class="select_input" value="">';
      //           supplier_info_html += '</div>';
      //           supplier_info_html += '</div>';
      //           supplier_info_html += '</div>';
      //           supplier_info_html += '<div class="cg_ghs_setul"><button class="but_green page_supplier_field">+</button>'
      //           supplier_info_html += '<button class="but_red page_supplier_field" data-field="' + field + '">-</button></div>';
      //       });
      //       $(modal_class + '.page_64_page_user_defined_supplier_fields').html(supplier_info_html);
      //       _listen_supplier_add_or_delete();
      //       function _listen_supplier_add_or_delete() {
      //           $(modal_class + '.page_supplier_field').unbind('click').bind('click', function () {
      //               if ($(this).text() == '+') {
      //                   var node = $(modal_class + '.page_64_page_user_defined_supplier_blank_fields').children('.m_bottom_10').first().clone();
      //                   node.find('.supplier_field').val('如QQ号');
      //                   $(modal_class + '.page_64_page_user_defined_supplier_blank_fields').append(node);
      //                   _listen_supplier_add_or_delete();
      //               } else {
      //                   $(this).parents('.m_bottom_10').remove();
      //               }
      //           });
      //       }
      //
      //       var contact_info_html = '';
      //       /*供应商联系人信息*/
      //       $.each(page_supplier_setting_data['supplier_info'], function (_, field) {
      //           contact_info_html += '<div class="m_bottom_10">';
      //           contact_info_html += '<div class="t_textinput left" style="width: 85%;">';
      //           contact_info_html += '<div class="t_left"><i class="c_r v_hidden">*</i>自定义</div>';
      //           contact_info_html += '<div class="t_right clearfix">';
      //           contact_info_html += '<div class="inline_block select_mormal select_25 left">';
      //           contact_info_html += '<input type="text" class="select_input contact_field" value="' + field + '">';
      //           contact_info_html += '</div>';
      //           contact_info_html += '<div class="inline_block select_mormal select_75 right">';
      //           contact_info_html += '<input type="text" class="select_input" value="">';
      //           contact_info_html += '</div>';
      //           contact_info_html += '</div>';
      //           contact_info_html += '</div>';
      //           contact_info_html += '<div class="cg_ghs_setul"><button class="but_green page_contact_field">+</button>'
      //           contact_info_html += '<button class="but_red page_supplier_field" data-field="' + field + '">-</button></div>';
      //       });
      //       $(modal_class + '.page_64_page_user_defined_contact_fields').html(contact_info_html);
      //       _listen_contact_add_or_delete();
      //       function _listen_contact_add_or_delete() {
      //           $(modal_class + '.page_contact_field').unbind('click').bind('click', function () {
      //               if ($(this).text() == '+') {
      //                   var node = $(modal_class + '.page_64_page_user_defined_contact_blank_fields').children('.m_bottom_10').first().clone();
      //                   node.find('.contact_field').val('如QQ号');
      //                   $(modal_class + '.page_64_page_user_defined_contact_blank_fields').append(node);
      //                   _listen_supplier_add_or_delete();
      //               } else {
      //                   $(this).parents('.m_bottom_10').remove();
      //               }
      //           });
      //       }
      //
      //   }
    });
    $('#zcj_cg_set_gys_supplier_tab').trigger('click');

    /*供应商分类*/

    // 供应商分类>分类列表展示
    // function getCusListSort(vclass) {
    //     $.ajax({
    //         url: SERVER_URL + '/supplier/categorylist',
    //         type: 'GET',
    //         data: {
    //             token: Admin.get_token(),
    //             pid: 0,
    //             customer: 1
    //         },
    //         success: function (e) {
    //             var oE = eval("(" + e + ")");
    //             var datalist = oE['datalist'];
    //             var html='<li class="left_all" data-id="0" data-name="所有分类"><span class="icon_open change_ba"></span><span class="icon_file"></span><span class="list_msg">所有分类</span></li>'
    //             var deep=0;
    //             $(vclass).html(html+tree_list_dialog(datalist,deep));
    //
    //         }
    //     })
    // }
    // /*供应商分类*/
    // $("#zcj_cg_set_gys_fl_tab").die().live("click",function(){
    //     getCusListSort('.zcj_cg_set_select_up_fl_list');
    //     /*添加分类*/
    //     $('.zcj_cg_add_gys_fl_btn').unbind('click').bind('click', function () {
    //         invoke_tanceng(this, function () {
    //
    //             var add_cate_modal = '.tanceng .zcj_cg_gys_cate_add_cate_modal ';
    //             var $input = $(add_cate_modal + 'input.fz_cate_name');
    //             $(add_cate_modal + '.zcj_select_cggys_up_fl_val_put').data("id",0)
    //             /*选择上级分类*/
    //             $(".tanceng .zcj_select_cggys_fl_up_btn").unbind('click').bind('click', function () {
    //
    //                 getCusListSort(".tanceng .zcj_upfl_gys_list_tree .list_box_ulexitAll");
    //
    //                 $(".zcj_upfl_gys_list_tree li").die('click').live('click', function () {
    //
    //                     var fl_id=$('.zcj_upfl_gys_list_tree li.on').data('id')
    //                     var fl_name=$('.zcj_upfl_gys_list_tree li.on').data('name')
    //                     $(".tanceng .zcj_kh_select_cggys_fl_end_btn").unbind('click').bind('click', function () {
    //                         $(add_cate_modal + '.zcj_select_cggys_up_fl_val_put').data("id",fl_id).val(fl_name);
    //                         $(this).next().click();
    //                     })
    //                 })
    //             })
    //
    //             $(add_cate_modal + '.fz_save').unbind('click').bind('click', function () {
    //                 var c_pid=$(add_cate_modal + '.zcj_select_cggys_up_fl_val_put').data("id")
    //                 var me = this;
    //                 var cate_name = $input.val();
    //                 var cate_pid =c_pid;
    //                 if(cate_name!='请填写分类名称' && cate_name!=''){
    //                     $.ajax({
    //                         url: SERVER_URL + '/supplier/categoryadd',
    //                         type: 'post',
    //                         data: {
    //                             token: Admin.get_token(),
    //                             pid:cate_pid,
    //                             name: cate_name
    //                         },
    //                         success: function (e) {
    //                             var oE = eval("(" + e + ")");
    //                             console.log(oE);
    //                             if(oE.code==0){
    //                                 getCusListSort('.zcj_cg_set_select_up_fl_list');
    //                                 $(add_cate_modal + ".dialog_close").click();
    //                             }else{
    //                                 alert(oE.msg);
    //                             }
    //
    //                         }
    //                     })
    //
    //                 }else{
    //                     alert('请填写分类名称');
    //                 }
    //
    //             });
    //         })
    //     });
    //     /*编辑分类*/
    //     $('.zcj_cg_edit_gys_fl_btn').on('click', function () {
    //         $(".zcj_cggys_tc_cate_edit_modal .dialog_h3").text('编辑分类');
    //         var modal_class = '.zcj_cggys_name_cate_edit_modal ';
    //         var btn_me = this;
    //         invoke_tanceng(this, function () {
    //             $(".zcj_select_cg_edit_sjfl_tc_btn").unbind('click').bind('click', function () {
    //
    //                 getCusListSort(".tanceng .zcj_upfl_gys_list_tree .list_box_ulexitAll");
    //
    //                 $(".zcj_upfl_gys_list_tree li").die('click').live('click', function () {
    //
    //                     var fl_id=$('.zcj_upfl_gys_list_tree li.on').data('id')
    //                     var fl_name=$('.zcj_upfl_gys_list_tree li.on').data('name')
    //                     $(".tanceng .zcj_kh_select_cggys_fl_end_btn").unbind('click').bind('click', function () {
    //                         $('.zcj_cggys_up_fl_name_val_show').data("id",fl_id).val(fl_name);
    //                         $('.tanceng .zcj_cggys_tc_cate_edit_modal input.fz_cate_name').data("pid",fl_id);
    //                         $(this).next().click();
    //                     })
    //                 })
    //
    //             })
    //
    //             var $li = $(modal_class + '.zcj_cg_set_select_up_fl_list li.on');
    //             var text = $li.data('name');
    //             var id = $li.data('id');
    //             var pid = $li.data('pid');
    //             var cate_name_edit_modal = '.tanceng .zcj_cggys_tc_cate_edit_modal ';
    //             var $input = $(cate_name_edit_modal + 'input.fz_cate_name');
    //             $input.val(text).data('id', id).data('pid', pid);
    //             $(cate_name_edit_modal + '.fz_save').unbind('click').bind('click', function () {
    //                 var me = this;
    //                 var cate_id = $input.data('id');
    //                 var cate_name = $input.val();
    //                 var cate_pid = $input.data('pid');
    //                 if(cate_name!='请填写分类名称' && cate_name!=''){
    //                     $.ajax({
    //                         url: SERVER_URL + '/supplier/categoryupdate',
    //                         type: 'post',
    //                         data: {
    //                             token: Admin.get_token(),
    //                             id:cate_id,
    //                             pid:cate_pid,
    //                             name: cate_name
    //                         },
    //                         success: function (e) {
    //                             var oE = eval("(" + e + ")");
    //                             console.log(oE);
    //                             if(oE.code==0){
    //                                 getCusListSort('.zcj_cg_set_select_up_fl_list');
    //                                 $(cate_name_edit_modal + ".dialog_close").click();
    //                             }else{
    //                                 alert(oE.msg);
    //                             }
    //
    //                         }
    //                     })
    //
    //                 }else{
    //                     alert('请填写分类名称');
    //                 }
    //
    //             });
    //
    //         });
    //
    //     });
    //     /*上移、下移*/
    //     /* $('.goods_cate_edit_change_sort').die('click').live('click', function () {
    //      var action = $(this).data('action');
    //      var id = $('.page_51_goods_cate_edit_modal .goods_cate_tree li.on').data('id');
    //      if (!id) {
    //      return;
    //      }
    //      GoodsCate.up_or_down(id, action, function (data) {
    //      console.log(data);
    //      getCusListSort('.zcj_sy_kh_fl_list_show');
    //      });
    //      });
    //      */
    //     //采购>供应商分类设置>分类上移
    //     $('.zj_sort_supplier_cate_up').die('click').live('click', function () {
    //         var id=$(".zcj_cg_set_select_up_fl_list li.on").data('id')
    //         $.ajax({
    //             type: "GET",
    //             url: SERVER_URL + "/supplier/categorysort",
    //             async: true,
    //             data: {
    //                 token: token,
    //                 id: id,
    //                 action: 'up'
    //             },
    //             dataType: 'json',
    //             success: function (oE) {
    //                 if (oE.code == 0) {
    //                    // getPurCategoryListSort();
    //                     getCusListSort('.zcj_cg_set_select_up_fl_list');
    //                 }
    //             }
    //         });
    //     });
    //     //采购>供应商分类设置>分类下移
    //     $('.zj_sort_supplier_cate_down').die('click').live('click', function () {
    //         var id=$(".zcj_cg_set_select_up_fl_list li.on").data('id')
    //         $.ajax({
    //             type: "GET",
    //             url: SERVER_URL + "/supplier/categorysort",
    //             async: true,
    //             data: {
    //                 token: token,
    //                 id: id,
    //                 action: 'down'
    //             },
    //             dataType: 'json',
    //             success: function (oE) {
    //                 if (oE.code == 0) {
    //                     //getPurCategoryListSort();
    //                     getCusListSort('.zcj_cg_set_select_up_fl_list');
    //                 }
    //             }
    //         });
    //     });
    //     /*删除分类*/
    //     $('.zcj_cg_del_gys_fl_btn').die().on('click', function () {
    //         var id = 0;
    //         if ($('.zcj_cggys_name_cate_edit_modal .zcj_cg_set_select_up_fl_list li.on').length > 0) {
    //             id = $('.zcj_cggys_name_cate_edit_modal .zcj_cg_set_select_up_fl_list li.on').data('id')
    //         }
    //         if (id == '0') {
    //             $(".zcj_cg_del_gys_fl_btn").removeClass("val_dialogTop").attr("name","");
    //             alert('请选择要删除的分类');
    //
    //             return;
    //         }
    //         if ($('.zcj_cggys_name_cate_edit_modal .zcj_cg_set_select_up_fl_list li.on').next().children().length > 0) {
    //             $(".zcj_cg_del_gys_fl_btn").removeClass("val_dialogTop").attr("name","");
    //
    //             alert('删除失败，请先删除下一级分类');
    //             return;
    //         }else{
    //             $(".zcj_cg_del_gys_fl_btn").addClass("val_dialogTop").attr("name","xt_gnsz_cgDeletesort");
    //         }
    //         /* if (confirm('确定要删除分类吗？')) {
    //
    //          }*/
    //         $(".zcj_gys_unit_new_delete_sure").die().live("click",function(){
    //             var _this=this;
    //             $.ajax({
    //                 url: SERVER_URL + '/supplier/categorydel',
    //                 type: 'post',
    //                 data: {
    //                     token: Admin.get_token(),
    //                     id:id
    //                 },
    //                 success: function (e) {
    //                     var oE = eval("(" + e + ")");
    //                     console.log(oE);
    //                     if(oE.code==0){
    //                         getCusListSort('.zcj_cg_set_select_up_fl_list');
    //                         $(_this).parents('.dialog_content_delete').find(".dialog_close").click();
    //                     }else{
    //                         alert(oE.msg);
    //                     }
    //
    //                 }
    //             })
    //             /*GoodsCate.delete(id, function (data) {
    //              if(data.code==0){
    //              getCusListSort('.zcj_sy_kh_fl_list_show');
    //              }else{
    //              alert(data.msg)
    //              }
    //
    //              });*/
    //         });
    //
    //     });
    //
    // });








});