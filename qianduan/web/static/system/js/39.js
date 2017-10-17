
//var SERVER_URL="http://192.168.0.167:9091";
var token=Admin.get_token();
//var token='2017051308443559139-1-4';
/***********系统设置》审批流程***************/
$(function(){
    //	dialog tree list choose dept_person 部门和人无限<span class="list_check"><em></em></span>
    function tree_list_choose_dept_person(datalist, deep) {
        var html = '';
        $.each(datalist, function (index, data) {
            var html_i_list_before = '<i class="list_before_span"></i>';
            html += '<ul class="ul1">';
            for (var j = 0; j < deep; j++) {
                html_i_list_before += '<i class="list_before_span"></i>'
            }
            if(data['children'].length > 0 || data['user_info'].length>0){
                html += '<li class="left_1" deptchosenid = "' + data["id"] + '">' + html_i_list_before + '<span class="icon_open change_ba"></span><span class="icon_file"></span><span class="list_msg">' + data['name'] + '</span> </li>';
            }else{
                html += '<li class="left_1" deptchosenid = "' + data["id"] + '">' + html_i_list_before + '<span class="change_ba"></span><span class="icon_file"></span><span class="list_msg">' + data['name'] + '</span> </li>';
            }

            if (data['children'] && data['children'].length > 0) {
                html += tree_list_choose_dept_person(data['children'], deep + 1);
            }
            html += '<ul class="ul3" style="display:block;">';
            $.each(data['user_info'], function (index2, data2) {
                var html_i_list_before = '<i class="list_before_span"></i>';
                for (var j = 0; j < deep + 1; j++) {
                    html_i_list_before += '<i class="list_before_span"></i>'
                }
                html += '<li class="left_2 person_left_nav li_person" userinfoid="' + data2['id'] + '">' + html_i_list_before + '<span class="list_msg">' + data2['name'] + ' </span> </li>'
            });
            html += '</ul>';
            html += '</ul>';
        });
        return html
    }
    //	dialog tree list choose dept部门无限
    function tree_list_choose_dept(datalist, deep) {
        var html = '';
        $.each(datalist, function (index, data) {
            var html_i_list_before = '<i class="list_before_span"></i>';
            html += '<ul class="ul1">';
            for (var j = 0; j < deep; j++) {
                html_i_list_before += '<i class="list_before_span"></i>'
            }
            if(data['children'].length > 0){
                html += '<li class="left_1" deptid = "' + data["id"] + '">' + html_i_list_before + '<span class="icon_open change_ba"></span><span class="icon_file"></span><span class="list_msg">' + data['name'] + '</span><span class="list_check"><em></em></span></li>';
            }else{
                html += '<li class="left_1" deptid = "' + data["id"] + '">' + html_i_list_before + '<span class="change_ba"></span><span class="icon_file"></span><span class="list_msg">' + data['name'] + '</span><span class="list_check"><em></em></span></li>';
            }

            if (data['children'] && data['children'].length > 0) {
                html += tree_list_choose_dept(data['children'], deep + 1);
            }
            html += '</ul>';
        });
        return html
    }
    //选择人员
//	dialog tree list person  选择人员  单选
    function tree_list_person_new(datalist, deep) {
        var html = '';
        $.each(datalist, function (index, data) {
            var html_i_list_before = '<i class="list_before_span"></i>';
            html += '<ul class="ul1">';
            for (var j = 0; j < deep; j++) {
                html_i_list_before += '<i class="list_before_span"></i>'
            }
            if(data['children'].length > 0 || data['user_info'].length>0){
                html += '<li class="left_1" cussortid = "' + data["id"] + '">' + html_i_list_before + '<span class="icon_open"></span><span class="icon_file"></span><span class="list_msg">' + data['name'] + '</span></li>';
            }else{
                html += '<li class="left_1" cussortid = "' + data["id"] + '">' + html_i_list_before + '<span class="icon_file"></span><span class="list_msg">' + data['name'] + '</span></li>';
            }

            html += '<ul class="ul3">';
            if (data['children'] && data['children'].length > 0) {
                html += tree_list_person_new(data['children'], deep + 1);
            }
            $.each(data['user_info'], function (index2, data2) {
                var html_i_list_before = '<i class="list_before_span"></i>';
                for (var j = 0; j < deep + 1; j++) {
                    html_i_list_before += '<i class="list_before_span"></i>'
                }
                html += '<li class="left_2 person_left_nav" aid="' + data2['id'] + '">' + html_i_list_before + '<span class="list_msg">' + data2['name'] + ' </span></li>'
            })

            /*  html += '</li>';*/
            html += '</ul>';
            html += '</ul>'
        });
        return html;

    }
    //	弹窗无限循环树结构
    function tree_list_dialog(datalist, deep) {
        var html = '';
        $.each(datalist, function (index, data) {
            var html_i_list_before = '<i class="list_before_span"></i>';
            html += '<ul class="ul1 zcj_child1">';
            for (var j = 0; j < deep; j++) {
                html_i_list_before += '<i class="list_before_span"></i>'
            }
            if(data['children'].length > 0){
                html += '<li class="left_1" aid = "' + data["id"] + '">' + html_i_list_before + '<span class="icon_open change_ba"></span><span class="icon_file"></span><span class="list_msg">' + data['name'] + '</span></li>';
            }else{
                html += '<li class="left_1" aid = "' + data["id"] + '">' + html_i_list_before + '<span class="change_ba"></span><span class="icon_file"></span><span class="list_msg">' + data['name'] + '</span></li>';
            }

            if (data['children'] && data['children'].length > 0) {
                html += tree_list_dialog(data['children'], deep + 1);
            }

            html += '</li>';
            html += '</ul>'
        });
        return html
    }
    /*左侧 限循环树结构*/
    function tree_list_bmfzr(datalist){
        var html = '';
        var bm_count=datalist['rows'].length;
        $.each(datalist['rows'], function(index, data_list){


            html += '<ul class="ul1">';
            if(data_list['children'].length>0 || data_list['user_info'].length>0){
                html+='<li class="left_1" cussortid = "' + data_list["id"] + '"><i class="list_before_span"></i><span class="icon_open"></span><span class="icon_file"></span><span class="list_msg">' + data_list['name'] + '</span></li>'
            }else{
                html+='<li class="left_1" cussortid = "' + data_list["id"] + '"><i class="list_before_span"></i><span class="icon_file"></span><span class="list_msg">' + data_list['name'] + '</span></li>'
            }

            if(data_list['children'] && data_list['children'].length>0){
                bm_count+=data_list['children'].length;
                $.each(data_list['children'],function(v,bmlist){
                    html += '<ul class="ul2">';
                    if(bmlist['children'].length>0 || bmlist['user_info'].length>0){
                        html+='<li class="left_1" cussortid = "' + bmlist["id"] + '"><i class="list_before_span"></i><i class="list_before_span"></i><span class="icon_open"></span><span class="icon_file"></span><span class="list_msg">' + bmlist['name'] + '</span></li>'
                    }else{
                        html+='<li class="left_1" cussortid = "' + bmlist["id"] + '"><i class="list_before_span"></i><i class="list_before_span"></i><span class="icon_file"></span><span class="list_msg">' + bmlist['name'] + '</span></li>'
                    }

                    if(bmlist['children'] && bmlist['children'].length>0){
                        bm_count+=bmlist['children'].length;
                        $.each(bmlist['children'],function(i,last_list){

                            html += '<ul class="ul1">';
                            if(last_list['children'].length>0 || last_list['user_info'].length>0){
                                html+='<li class="left_1" cussortid = "' + last_list["id"] + '"><i class="list_before_span"></i><i class="list_before_span"></i><i class="list_before_span"></i><span class="icon_open"></span><span class="icon_file"></span><span class="list_msg">' + last_list['name'] + '</span></li>'
                            }else{
                                html+='<li class="left_1" cussortid = "' + last_list["id"] + '"><i class="list_before_span"></i><i class="list_before_span"></i><i class="list_before_span"></i> <span class="icon_file"></span><span class="list_msg">' + last_list['name'] + '</span></li>'
                            }

                            html += '</ul>'
                        })

                    }
                    html += '<ul class="ul3">'
                    if(bmlist['user_info'] && bmlist['user_info'].length>0) {
                        $.each(bmlist['user_info'], function (index3, data3) {
                            if(data3['is_director']==1){
                                //html += '<li class="hr_left_bmyg2" manid="' + data3['id'] + '"> <span>' + data3['name'] + '</span>(主管)</li>';
                                html+='<li class="left_2 person_left_nav" aid="' + data3['id'] + '"><i class="list_before_span"></i><i class="list_before_span"></i><i class="list_before_span"></i><span class="list_msg">' + data3['name'] + ' </span>(主管)</li>'
                            }else{
                                //html += '<li class="hr_left_bmyg2" manid="' + data3['id'] + '"> <span>' + data3['name'] + '</span></li>';
                                html+='<li class="left_2 person_left_nav" aid="' + data3['id'] + '"><i class="list_before_span"></i><i class="list_before_span"></i><i class="list_before_span"></i><span class="list_msg">' + data3['name'] + ' </span></li>'
                            }

                        })
                    }
                    html += '</ul>'
                    html += '</ul>'
                })

            }
            html += '<ul class="ul3">'
            if(data_list['user_info'] && data_list['user_info'].length>0){
                $.each(data_list['user_info'], function (index2, data2) {
                    if(data2['is_director']==1){
                        //html += '<li class="hr_left_bmyg2" manid="' + data2['id'] + '"> <span>' + data2['name'] + '</span>(主管)</li>'
                        html+='<li class="left_2 person_left_nav" aid="' + data2['id'] + '"><i class="list_before_span"></i><i class="list_before_span"></i><span class="list_msg">' + data2['name'] + ' </span>(主管)</li>'
                    }else{
                        //html += '<li class="hr_left_bmyg2" manid="' + data2['id'] + '"> <span>' + data2['name'] + '</span></li>'
                        html+='<li class="left_2 person_left_nav" aid="' + data2['id'] + '"><i class="list_before_span"></i><i class="list_before_span"></i><span class="list_msg">' + data2['name'] + ' </span></li>'
                    }

                })
            }

            html += '</ul>'
            html += '</ul>'

        })
        html+='<ul class="ul1">'
        $.each(datalist['list'],function(r,vlist){
            //html += '<li class="hr_left_bmyg2" manid="' + vlist['id'] + '"> <span>' + vlist['name'] + ' </span></li>'
            html+='<li class="left_2 person_left_nav" aid="' + vlist['id'] + '"><i class="list_before_span"></i><span class="list_msg">' + vlist['name'] + ' </span></li>'

        })
        html+='</ul>'
        datalist['bm_count']=bm_count;
        return html;
    }
/****************************工作列表**********************************/

    $("#zcj_work_list_left_bar").die().live("click",function(){


        /***********审批********/
        $("#zcj_sp_list_content_header").die().live("click",function(){
            system_set_work_list();
        });
        $("#zcj_sp_list_content_header").trigger('click');


    });
    /****************************************请假编辑列表*************************************/
    $(".zcj_system_set_work_list_show_content").on("click",".zcj_edit_show_qj_list_btn",function(){
        /*alert($(".tanceng .zcj_edit_show_data_list_ck .zcj_qj_list_show_xq_data").length);*/
        var category=$(this).data('category');

        if(category==1){
            $(".zcj_qj_edit_content_info_show .zcj_qj_head_show").html('请假');
            edit_list_fn(category);
            $(".zcj_add_work_sp_tj").attr('arr','1')
        }else if(category==2){

            edit_list_fn(category);
            $(".zcj_qj_edit_content_info_show .zcj_qj_head_show").html('出差');
            $(".zcj_add_work_sp_tj").attr('arr','2')
        }else if(category==3){

            edit_list_fn_other(category)
            $(".zcj_sp_other_info_show .zcj_head_name_text").html('外出');
        }else if(category==4){

            edit_list_fn(category);
            $(".zcj_qj_edit_content_info_show .zcj_qj_head_show").html('报销');
            $(".zcj_add_work_sp_tj").attr('arr','4')
            /* $(".tanceng .zcj_qj_list_show_xq_data .zcj_xy_work_is_val").hide();*/
        }else if(category==5){

            edit_list_fn_other(category)
            $(".zcj_sp_other_info_show .zcj_head_name_text").html('借款');
        }else if(category==6){

            edit_list_fn_other(category)
            $(".zcj_sp_other_info_show .zcj_head_name_text").html('付款');
        }else if(category==7){

            edit_list_fn_other(category)
            $(".zcj_sp_other_info_show .zcj_head_name_text").html('招聘');
        }else if(category==8){

            edit_list_fn_other(category)
            $(".zcj_sp_other_info_show .zcj_head_name_text").html('离职');
        }else if(category==9){

            edit_list_fn_other(category)
            $(".zcj_sp_other_info_show .zcj_head_name_text").html('转正');
        }else if(category==10){

            edit_list_fn_other(category)
            $(".zcj_sp_other_info_show .zcj_head_name_text").html('调薪');
        }else if(category==11){

            edit_list_fn_other(category)
            $(".zcj_sp_other_info_show .zcj_head_name_text").html('办公采购');
        }else if(category==12){

            edit_list_fn_other(category)
            $(".zcj_sp_other_info_show .zcj_head_name_text").html('物品领用');
        }else if(category==13){

            edit_list_fn_other(category)
            $(".zcj_sp_other_info_show .zcj_head_name_text").html('公章');
        }else if(category==14){

            edit_list_fn_other(category)
            $(".zcj_sp_other_info_show .zcj_head_name_text").html('合同');
        }else if(category==15){
            edit_list_fn_other(category)
            $(".zcj_sp_other_info_show .zcj_head_name_text").html('普通审批');
        }else if(category==16){
            edit_list_fn_other(category)
            $(".zcj_sp_other_info_show .zcj_qj_head_show").html('统计考勤');
        }


        /* var bmzg=2;
         var uq=2;*/
        /*添加审批人*/
        $(".tanceng .zcj_add_qj_spr_tc").die().live("click",function(){
            var idx=$(this).data('index')

            /*$(".zcj_xzspr_person_list_end_btn").data('index',idx)*/
            var _this=this;
            $.ajax({
                type: 'get',
                url: SERVER_URL + "/dept/deptlist",
                data:{
                    token:token

                },
                dataType: "json",
                success: function (data) {
                    console.log('00000')
                    console.log(data)
                    console.log('00000')
                    if(data.code==0){
                        var head='<li class="left_all"><span class="icon_open change_ba"></span><span class="icon_file"></span><span class="list_msg">所有分类</span></li>'
                        var deep=0
                        $(".zcj_xz_spr_tc_tree_list").html(head+tree_list_bmfzr(data,deep));/*左侧 限循环树结构*/

                    }else{
                        alert(data.msg);
                    }

                },
                error:function(data){
                    alert('更新失败，请稍后再试');
                }
            });
            /*获取name*/
            $(".zcj_xz_spr_tc_tree_list .person_left_nav").die().live("click",function(){

                var iv=$(this).children(".list_msg").html();
                /* alert(iv);*/

                /*确定选择负责人*/
                $(".tanceng .zcj_select_spr_person_end_btn").die().live("click",function(){
                    /*var name=$(".zcj_show_man").val(iv);*/

                    var id=$(".zcj_xz_spr_tc_tree_list .person_left_nav.on").attr("aid");

                    var sp_length=$(".tanceng .zcj_edit_show_data_list_ck").find('.zcj_add_qj_spr_tc').eq(idx).parent().prev().find('.zcj_xz_spr_name_show').length;
                    var z_length=$(".tanceng .zcj_edit_show_data_list_ck").find('.zcj_add_qj_spr_tc').eq(idx).parent().prev().find('.xt_sp_sprAdd ').length;
                    var bm_zg=$(".tanceng .zcj_edit_show_data_list_ck").find('.zcj_add_qj_spr_tc').eq(idx).parent().prev().find('.zcj_bmzg ').length;
                    var ss_sj=$(".tanceng .zcj_edit_show_data_list_ck").find('.zcj_add_qj_spr_tc').eq(idx).parent().prev().find('.zcj_scsj ').length;

                    var xz_spr='<div class="xt_sp_sprAdd left zcj_xz_spr_name_show" data-id="'+id+'"><span class="m_right_5">步骤<span class="zj_index_num">'+(sp_length+1)+'</span>：</span><span class="xt_sp_sprAddmsg">'+iv+'<i class="zcj_del_sp_name_sc" data-num="'+(sp_length+1)+'"></i></span></div>'

                    var f_if=[];

                    $(".tanceng .zcj_edit_show_data_list_ck").find('.zcj_add_qj_spr_tc').eq(idx).parent().prev().find('.zcj_xz_spr_name_show').each(function(){
                        var sp_id=$(this).data('id')
                        if(sp_id==id){
                            f_if.push(sp_id)
                            alert('审批人不可以重复');
                            return false;
                        }
                    });
                    if(f_if.length>0){
                        return false;
                    }else if(sp_length>=4 || z_length>=4){
                        alert('审批人不可以超过4个');
                        return false;
                    }else if(bm_zg>0){
                        alert('你已选部门主管，不可再选员工');
                        return false;
                    }else if(ss_sj>0){
                        alert('你已选所属上级，不可再选其他员工');
                        return false;
                    }else{
                        $(".tanceng .zcj_edit_show_data_list_ck").find('.zcj_add_qj_spr_tc').eq(idx).parent().prev('.zcj_select_spr_add_nr').append(xz_spr);
                    }
                    var gsp_str=[]
                    $(".tanceng .zcj_edit_show_data_list_ck .zcj_select_spr_add_nr").eq(idx).find('.zcj_xz_spr_name_show').each(function(){
                        gsp_str.push($(this).data('id'));
                    })
                    $(".tanceng .zcj_edit_show_data_list_ck").find('.zcj_select_spr_add_nr').eq(idx).data('gs_id',gsp_str.toString())

                    $(this).next().click();
                    $(".tanceng .dialog_content_delete").find(".dialog_close").click();
                });
                /*取消选择负责人*/

            });
            /*部门主管*/
            $(".tanceng .zcj_bmzg_xzspr_is_true").die().live("click",function(){
                if($(this).is(":checked")){
                    $(this).data("bmzg",1);
                    // $(this).parent().prev('.but_icon').removeClass('val_dialogTop');
                }else{
                    $(this).data("bmzg",2);
                    // $(this).parent().prev('.but_icon').addClass('val_dialogTop');
                    /*console.log($(this).data('bmzg'));*/
                }
            });
            /*所属上级*/
            $(".tanceng .zcj_ssup_xzspr_is_true").die().live("click",function(){
                if($(this).is(":checked")){
                    $(this).data("uq",1);
                    // $(this).parent().prev().children('.zcj_bmzg_xzspr_is_true').attr('disabled',true).attr('checked',false);
                    // $(this).parent().prev().prev('.but_icon').removeClass('val_dialogTop');
                }else{
                    $(this).data("uq",2);
                    // $(this).parent().prev().children('.zcj_bmzg_xzspr_is_true').attr('disabled',false);
                    // $(this).parent().prev().prev('.but_icon').addClass('val_dialogTop');
                }
            });
            /*添加审批人确定btn*/
            $(".tanceng .zcj_xzspr_person_list_end_btn").die().live("click",function(){
                if($(".tanceng .zcj_bmzg_xzspr_is_true").is(":checked")){
                    var bm_zg= $(this).parent().prev().find('.zcj_bmzg_xzspr_is_true').data('bmzg');
                }
                if($(".tanceng .zcj_ssup_xzspr_is_true").is(":checked")){
                    var ss_up= $(this).parent().prev().find('.zcj_ssup_xzspr_is_true').data('uq');
                }

                var bm_name=$(this).parent().prev().find('.zcj_bmzg_xzspr_is_true').val();
                var up_name=$(this).parent().prev().find('.zcj_ssup_xzspr_is_true').val();

                var z_length=$(".tanceng .zcj_edit_show_data_list_ck").find('.zcj_add_qj_spr_tc').eq(idx).parent().prev('.zcj_select_spr_add_nr').find('.xt_sp_sprAdd').length;
                var z_ry=$(".tanceng .zcj_edit_show_data_list_ck").find('.zcj_add_qj_spr_tc').eq(idx).parent().prev('.zcj_select_spr_add_nr').find('.zcj_xz_spr_name_show').length;
                var bm_z=$(".tanceng .zcj_edit_show_data_list_ck").find('.zcj_add_qj_spr_tc').eq(idx).parent().prev('.zcj_select_spr_add_nr').find('.zcj_bmzg').length;
                var zg_z=$(".tanceng .zcj_edit_show_data_list_ck").find('.zcj_add_qj_spr_tc').eq(idx).parent().prev('.zcj_select_spr_add_nr').find('.zcj_scsj').length;
                if(bm_zg==1){
                    var xz_zg='<div class="xt_sp_sprAdd left zcj_bmzg" data-director="1"><span class="m_right_5">步骤<span class="zj_index_num">'+(z_ry+1)+'</span>：</span><span class="xt_sp_sprAddmsg">'+bm_name+'<i class="zcj_del_sp_name_sc" data-num="'+(z_ry+1)+'"></i></span></div>';


                    if(bm_z>0){
                        alert("您已添加部门主管");
                    }else if(zg_z>0){
                        alert("您已添加所属上级,不用再添加主管");
                    }else if(z_length>=4){
                        alert("审批人不能多于4人");
                    }else{
                        $(".tanceng .zcj_edit_show_data_list_ck").find('.zcj_add_qj_spr_tc').eq(idx).parent().prev('.zcj_select_spr_add_nr').append(xz_zg);
                        //$(".tanceng .zcj_edit_show_data_list_ck").find('.zcj_add_qj_spr_tc').eq(idx).parent().prev('.zcj_select_spr_add_nr').find('.zcj_bmzg').data('director','1');
                    }

                }
                if(ss_up==1){
                    var xz_up='<div class="xt_sp_sprAdd left zcj_scsj" data-superior="1"><span class="m_right_5">步骤<span class="zj_index_num">'+(z_length+1)+'</span>：</span><span class="xt_sp_sprAddmsg">'+up_name+'<i class="zcj_del_sp_name_sc" data-num="'+(z_length+1)+'"></i></span></div>'


                    if(zg_z>0){
                        alert("您已添加所属上级");
                    }else if(z_length>=4){
                        alert("审批人不能多于4人");
                    }else{
                        $(".tanceng .zcj_edit_show_data_list_ck").find('.zcj_add_qj_spr_tc').eq(idx).parent().prev('.zcj_select_spr_add_nr').append(xz_up);
                        //$(".tanceng .zcj_edit_show_data_list_ck").find('.zcj_add_qj_spr_tc').eq(idx).parent().prev('.zcj_select_spr_add_nr').find('.zcj_scsj').data('superior','1');
                    }

                }
                $(_this).data('zgid',bm_zg);
                $(_this).data('upid',ss_up);
                $(this).next().click();
                $(this).parents('.dialog_content_delete').find('.dialog_close').click();

            });
        });
        /*选择适用部门*/
        // var arr_id=[];
        // var cs_name=[];
        // $(".tanceng .zcj_xz_sybm_tc_dept_btn").die().live("click",function(){
        //
        //     $.ajax({
        //         type: 'get',
        //         url: SERVER_URL + "/dept/deptlist",
        //         data:{
        //             token:token
        //         },
        //         dataType: "json",
        //         success: function (data) {
        //             console.log('102');
        //             console.log(data);
        //             console.log('102');
        //             if(data.code==0){
        //                 var head='<li class="left_all"><span class="icon_open change_ba"></span><span class="icon_file"></span><span class="list_msg">所有分类(4)</span></li>'
        //                 /* $(".zcj_chao_sr_tree_list").html(head+tree_list_more_person(data.rows));*/
        //                 var deep=0;
        //                 $(".zcj_xz_bm_tree_dx_list").html(head+tree_list_choose_dept(data.rows, deep));
        //             }else{
        //                 alert(data.msg);
        //             }
        //
        //         },
        //         error:function(data){
        //             alert(data);
        //         }
        //     });
        //     //选择部门左侧选择
        //
        //     $(".tanceng .zcj_xz_bm_tree_dx_list .left_1").die().live("click",function(){
        //         /* debugger;*/
        //         var id=$(this).attr("deptid");
        //         var name=$(this).children(".list_msg").text();
        //         $(this).toggle(function(){
        //             $('.tanceng .zcj_shoose_right_list').append('<li rid="'+$(this).attr('deptid')+'"><span>'+$(this).children('.list_msg').text()+'</span><i class="list_choose_delete"></i></li>')
        //             $(this).find('span.list_check em').addClass('on');
        //             arr_id.unshift(id);
        //             cs_name.unshift(name)
        //             console.log(arr_id);
        //             console.log(cs_name);
        //
        //         },function(){
        //             $('.tanceng .zcj_shoose_right_list').find('li[rid='+$(this).attr('deptid')+']').remove()
        //             $(this).find('span.list_check em').removeClass('on');
        //             arr_id.splice(jQuery.inArray(id,arr_id),1);
        //             cs_name.splice(jQuery.inArray(id,cs_name),1);
        //             console.log(arr_id);
        //             console.log(cs_name);
        //
        //         })
        //         $(this).trigger('click')
        //
        //         /*部门确认按钮*/
        //         $(".tanceng .zcj_sybm_yxlist_end_btn").die().live("click",function(){
        //             var cs_per="";
        //             $.each($(".tanceng .zcj_shoose_right_list li"),function (i,v) {
        //
        //                 cs_per+='<li class="zcj_sybm_val" data-id="'+arr_id[i]+'">'+cs_name[i]+'<i class="zcj_del_sybm_name_d"></i></li>'
        //             });
        //
        //             $(".zcj_xz_sybm_tc_dept_btn").parent().before(cs_per);
        //             /*delbtn(this);*/
        //             $(".zcj_shoose_right_list").empty();
        //             $(this).parents('.dialog_content_addBox1').find('.dialog_close').click();
        //         });
        //     });
        //
        //     /*删除选择的部门*/
        //     $(".tanceng .zcj_shoose_right_list .list_choose_delete").die().live("click",function(){
        //         var cs_id=$(this).parent().attr("rid");
        //         var name=$(this).prev().text();
        //
        //         $(this).parent().remove();
        //         arr_id.splice(jQuery.inArray(cs_id,arr_id),1);
        //         cs_name.splice(jQuery.inArray(name,cs_name),1);
        //         console.log(arr_id);
        //         console.log(cs_name);
        //     });
        //
        //     /*部门取消按钮*/
        //     $(".zcj_bmqx_canael_btn").live("click",function(){
        //         arr_id.length = 0;
        //         cs_name.length = 0;
        //         $(".zcj_shoose_right_list").empty();
        //     });
        //     /*直接关闭*/
        //     $(".zj_bmgb_close_bt").live("click",function(){
        //         arr_id.length = 0;
        //         cs_name.length = 0;
        //         $(".zcj_shoose_right_list").empty();
        //         /*console.log(cs_name);
        //          console.log(arr_id);*/
        //     });
        //     /*删除添加后的抄送人*/
        //     /*$(".zcj_csr_info_content_icon .del_img_1").die().live("click",function(){
        //         var dq_id= $(this).parent().attr("arrid");
        //         var dq_name=$(this).parent().children(".box_adderName").text();
        //         $(this).parent().remove();
        //         arr_id.splice($.inArray(dq_id,arr_id),1);
        //         cs_name.splice($.inArray(dq_name,cs_name),1);
        //         console.log(cs_name);
        //         console.log(arr_id);
        //     });*/
        // });

        /**************抄送人弹框按钮********************/
//             var  csrarr_id=[];/*抄送人id*/
//             var csrarr_name=[];/*抄送人名字*/
//             $(".tanceng .zcj_xzcsr_tc_btn").die().live("click",function(){
//                 $.ajax({
//                     type: 'get',
//                     url: SERVER_URL + "/dept/deptlist",
//                     data:{
//                         token:token
//                     },
//                     dataType: "json",
//                     success: function (data) {
//                         console.log(data);
//                         if(data.code==0){
//                             var head='<li class="left_all"><span class="icon_open change_ba"></span><span class="icon_file"></span><span class="list_msg">所有分类(4)</span></li>'
//                             /* $(".zcj_chao_sr_tree_list").html(head+tree_list_more_person(data.rows));*/
//                             var deep=0;
//                             $(".zcj_dx_csr_tc_tree_list_show").html(head+tree_list_choose_dept_person(data.rows, deep));
//                         }else{
//                             alert(data.msg);
//                         }
//
//                     },
//                     error:function(data){
//                         alert(data);
//                     }
//                 });
//                 /*选择的抄送人*/
//
// //选择部门左侧选择
//
//                 $(".tanceng .zcj_dx_csr_tc_tree_list_show .person_left_nav").die().live("click",function(){
//                     /* debugger;*/
//                     var id=$(this).attr("userinfoid");
//                     var name=$(this).children(".list_msg").text();
//                     $(this).toggle(function(){
//                         $('.tanceng .zcj_shoose_right_csr_list').append('<li rid="'+$(this).attr('userinfoid')+'"><span>'+$(this).children('.list_msg').text()+'</span><i class="list_choose_delete"></i></li>')
//                         $(this).find('span.list_check em').addClass('on')
//                         csrarr_id.unshift(id);
//                         csrarr_name.unshift(name)
//                         console.log(csrarr_id);
//                         console.log(csrarr_name);
//
//                     },function(){
//                         $('.tanceng .zcj_shoose_right_csr_list').find('li[rid='+$(this).attr('userinfoid')+']').remove()
//                         $(this).find('span.list_check em').removeClass('on')
//                         csrarr_id.splice(jQuery.inArray(id,csrarr_id),1);
//                         csrarr_name.splice(jQuery.inArray(id,csrarr_name),1);
//                         console.log(csrarr_id);
//                         console.log(csrarr_name);
//
//                     })
//                     $(this).trigger('click')
//
//                     /*抄送人确认按钮*/
//                     $(".tanceng .zcj_select_bmcsr_list_end_btn").die().live("click",function(){
//                         var cs_per="";
//                         $.each($(".tanceng .zcj_shoose_right_csr_list li"),function (i,v) {
//                             cs_per+='<li data-id="'+csrarr_id[i]+'" class="zcj_csr_val"><i class="del_img_1">-</i><em class="icon_personBtn icon_personBtn_msg"><i class="icon_personNext"></i></em> <em class="icon_adderBtn"></em> <p class="box_adderName">'+csrarr_name[i]+'</p></li>'
//                         });
//                         $(".tanceng .zcj_xzcsr_tc_btn").parent().before(cs_per);
//                        /* delbtn(this);*/
//                         $(".zcj_shoose_right_csr_list").empty();
//                         $(this).parents('.dialog_content_addBox1').find('.dialog_close').click();
//                     });
//                 });
//
//                 /*删除选择的抄送人*/
//                 $(".tanceng .zcj_shoose_right_csr_list .list_choose_delete").die().live("click",function(){
//                     var cs_id=$(this).parent().attr("rid");
//                     var name=$(this).prev().text();
//
//                     $(this).parent().remove();
//                     csrarr_id.splice(jQuery.inArray(cs_id,csrarr_id),1);
//                     csrarr_name.splice(jQuery.inArray(name,csrarr_name),1);
//                     // console.log(arr_id);
//                     // console.log(csrarr_name);
//                 });
//
//                 /*抄送人取消按钮*/
//                 $(".zcj_qx_canael_btn").live("click",function(){
//                     csrarr_id.length = 0;
//                     csrarr_name.length = 0;
//                     $(".zcj_shoose_right_list").empty();
//                 });
//                 /*直接关闭*/
//                 $(".zj_gb_close_bt").live("click",function(){
//                     csrarr_id.length = 0;
//                     csrarr_name.length = 0;
//                     $(".zcj_shoose_right_list").empty();
//                     /*console.log(cs_name);
//                      console.log(arr_id);*/
//                 });
//                 /*删除添加后的抄送人*/
//                 $(".zcj_csr_info_content_icon .del_img_1").die().live("click",function(){
//                     var dq_id= $(this).parent().attr("arrid");
//                     var dq_name=$(this).parent().children(".box_adderName").text();
//                     $(this).parent().remove();
//                     csrarr_id.splice($.inArray(dq_id,csrarr_id),1);
//                     csrarr_name.splice($.inArray(dq_name,csrarr_name),1);
//                     console.log(csrarr_name);
//                     console.log(csrarr_id);
//                 });
//             });
        /*是否开启跨级*/
        //var is_open;
        setTimeout(function() {
            var is_open = $(".tanceng .zcj_edit_show_data_list_ck .zcj_qj_list_show_xq_data").eq(0).data('is_across');

            if(is_open==1){
                $('.tanceng .zcj_is_kq_kjsp_btn').children("i").css("right",0);
                $('.tanceng .zcj_is_kq_kjsp_btn').css("background","#3bafda")
                $('.tanceng .zcj_is_kq_kjsp_btn').data('id',1);
            }else{
                $('.tanceng .zcj_is_kq_kjsp_btn').children("i").css("right","10px");
                $('.tanceng .zcj_is_kq_kjsp_btn').css("background","#e6e6e6");
                $('.tanceng .zcj_is_kq_kjsp_btn').data('id',2);
            }

        },200);
        /*其他是否开启跨级*/
        setTimeout(function() {
            var is_open = $(".tanceng .zcj_sp_other_info_show .zcj_qj_list_show_xq_data").eq(0).data('is_across');

            if(is_open==1){
                $('.tanceng .zcj_is_open_other_sp').children("i").css("right",0);
                $('.tanceng .zcj_is_open_other_sp').css("background","#3bafda")
                $('.tanceng .zcj_is_open_other_sp').data('id',1);
            }else{
                $('.tanceng .zcj_is_open_other_sp').children("i").css("right","10px");
                $('.tanceng .zcj_is_open_other_sp').css("background","#e6e6e6");
                $('.tanceng .zcj_is_open_other_sp').data('id',2);
            }

        },200);

        $(".tanceng .zcj_add_qt_other_spr_tc").die().live("click",function(){
            var idx=$(this).data('index')

            /*$(".zcj_xzspr_person_list_end_btn").data('index',idx)*/
            var _this=this;
            $.ajax({
                type: 'get',
                url: SERVER_URL + "/dept/deptlist",
                data:{
                    token:token

                },
                dataType: "json",
                success: function (data) {
                    console.log('00000')
                    console.log(data)
                    console.log('00000')
                    if(data.code==0){
                        var head='<li class="left_all"><span class="icon_open change_ba"></span><span class="icon_file"></span><span class="list_msg">所有分类</span></li>'
                        var deep=0
                        $(".zcj_xz_spr_tc_tree_list").html(head+tree_list_bmfzr(data,deep));
                    }else{
                        alert(data.msg);
                    }

                },
                error:function(data){
                    alert('更新失败，请稍后再试');
                }
            });
            /*获取name*/
            $(".zcj_xz_spr_tc_tree_list .person_left_nav").die().live("click",function(){

                var iv=$(this).children(".list_msg").html();
                /* alert(iv);*/

                /*确定选择负责人*/
                $(".tanceng .zcj_select_spr_person_end_btn").die().live("click",function(){
                    /*var name=$(".zcj_show_man").val(iv);*/

                    var id=$(".zcj_xz_spr_tc_tree_list .person_left_nav.on").attr("aid");

                    var sp_length=$(".tanceng .zcj_edit_show_data_list_ck").find('.zcj_add_qt_other_spr_tc').eq(idx).parent().prev().find('.zcj_xz_spr_name_show').length;
                    var z_length=$(".tanceng .zcj_edit_show_data_list_ck").find('.zcj_add_qt_other_spr_tc').eq(idx).parent().prev().find('.xt_sp_sprAdd ').length;
                    var bm_zg=$(".tanceng .zcj_edit_show_data_list_ck").find('.zcj_add_qt_other_spr_tc').eq(idx).parent().prev().find('.zcj_bmzg ').length;
                    var ss_sj=$(".tanceng .zcj_edit_show_data_list_ck").find('.zcj_add_qt_other_spr_tc').eq(idx).parent().prev().find('.zcj_scsj ').length;

                    var xz_spr='<div class="xt_sp_sprAdd left zcj_xz_spr_name_show" data-id="'+id+'"><span class="m_right_5">步骤<span class="zj_index_num">'+(sp_length+1)+'</span>：</span><span class="xt_sp_sprAddmsg">'+iv+'<i class="zcj_del_sp_name_sc"></i></span></div>'

                    var f_if=[];

                    $(".tanceng .zcj_edit_show_data_list_ck").find('.zcj_add_qt_other_spr_tc').eq(idx).parent().prev().find('.zcj_xz_spr_name_show').each(function(){
                        var sp_id=$(this).data('id')
                        if(sp_id==id){
                            f_if.push(sp_id)
                            alert('审批人不可以重复');
                            return false;
                        }
                    });
                    if(f_if.length>0){
                        return false;
                    }else if(sp_length>=4 || z_length>=4){
                        alert('审批人不可以超过4个');
                        return false;
                    }else if(bm_zg>0){
                        alert('你已选部门主管，不可再选员工');
                        return false;
                    }else if(ss_sj>0){
                        alert('你已选所属上级，不可再选其他员工');
                        return false;
                    }else{
                        $(".tanceng .zcj_edit_show_data_list_ck").find('.zcj_add_qt_other_spr_tc').eq(idx).parent().prev('.zcj_select_spr_add_nr').append(xz_spr);
                    }
                    // var gsp_str=[]
                    // $(".tanceng .zcj_edit_show_data_list_ck .zcj_select_spr_add_nr").eq(idx).find('.zcj_xz_spr_name_show').each(function(){
                    //     gsp_str.push($(this).data('id'));
                    // })
                    // $(".tanceng .zcj_edit_show_data_list_ck").find('.zcj_select_spr_add_nr').eq(idx).data('gs_id',gsp_str.toString())

                    $(this).next().click();
                    $(".tanceng .dialog_content_delete").find(".dialog_close").click();
                });
                /*取消选择负责人*/

            });
            /*部门主管*/
            $(".tanceng .zcj_bmzg_xzspr_is_true").die().live("click",function(){
                if($(this).is(":checked")){
                    $(this).data("bmzg",1);
                    // $(this).parent().prev('.but_icon').removeClass('val_dialogTop');
                }else{
                    $(this).data("bmzg",2);
                    // $(this).parent().prev('.but_icon').addClass('val_dialogTop');
                    /*console.log($(this).data('bmzg'));*/
                }
            });
            /*所属上级*/
            $(".tanceng .zcj_ssup_xzspr_is_true").die().live("click",function(){
                if($(this).is(":checked")){
                    $(this).data("uq",1);
                    // $(this).parent().prev().children('.zcj_bmzg_xzspr_is_true').attr('disabled',true).attr('checked',false);
                    // $(this).parent().prev().prev('.but_icon').removeClass('val_dialogTop');
                }else{
                    $(this).data("uq",2);
                    // $(this).parent().prev().children('.zcj_bmzg_xzspr_is_true').attr('disabled',false);
                    // $(this).parent().prev().prev('.but_icon').addClass('val_dialogTop');
                }
            });
            /*添加审批人确定btn*/
            $(".tanceng .zcj_xzspr_person_list_end_btn").die().live("click",function(){
                if($(".tanceng .zcj_bmzg_xzspr_is_true").is(":checked")){
                    var bm_zg= $(this).parent().prev().find('.zcj_bmzg_xzspr_is_true').data('bmzg');
                }
                if($(".tanceng .zcj_ssup_xzspr_is_true").is(":checked")){
                    var ss_up= $(this).parent().prev().find('.zcj_ssup_xzspr_is_true').data('uq');
                }

                var bm_name=$(this).parent().prev().find('.zcj_bmzg_xzspr_is_true').val();
                var up_name=$(this).parent().prev().find('.zcj_ssup_xzspr_is_true').val();

                var z_length=$(".tanceng .zcj_edit_show_data_list_ck").find('.zcj_add_qt_other_spr_tc').eq(idx).parent().prev('.zcj_select_spr_add_nr').find('.xt_sp_sprAdd').length;
                var z_ry=$(".tanceng .zcj_edit_show_data_list_ck").find('.zcj_add_qt_other_spr_tc').eq(idx).parent().prev('.zcj_select_spr_add_nr').find('.zcj_xz_spr_name_show').length;
                var bm_z=$(".tanceng .zcj_edit_show_data_list_ck").find('.zcj_add_qt_other_spr_tc').eq(idx).parent().prev('.zcj_select_spr_add_nr').find('.zcj_bmzg').length;
                var zg_z=$(".tanceng .zcj_edit_show_data_list_ck").find('.zcj_add_qt_other_spr_tc').eq(idx).parent().prev('.zcj_select_spr_add_nr').find('.zcj_scsj').length;
                if(bm_zg==1){
                    var xz_zg='<div class="xt_sp_sprAdd left zcj_bmzg" data-director="1"><span class="m_right_5">步骤<span class="zj_index_num">'+(z_ry+1)+'</span>：</span><span class="xt_sp_sprAddmsg">'+bm_name+'<i class="zcj_del_sp_name_sc"></i></span></div>'


                    if(bm_z>0){
                        alert("您已添加部门主管");
                    }else if(zg_z>0){
                        alert("您已添加所属上级,不用再添加主管");
                    }else if(z_length>=4){
                        alert("审批人不能多于4人");
                    }else{
                        $(".tanceng .zcj_edit_show_data_list_ck").find('.zcj_add_qt_other_spr_tc').eq(idx).parent().prev('.zcj_select_spr_add_nr').append(xz_zg);
                        //$(".tanceng .zcj_edit_show_data_list_ck").find('.zcj_add_qj_spr_tc').eq(idx).parent().prev('.zcj_select_spr_add_nr').find('.zcj_bmzg').data('director','1');
                    }

                }
                if(ss_up==1){
                    var xz_up='<div class="xt_sp_sprAdd left zcj_scsj" data-superior="1"><span class="m_right_5">步骤<span class="zj_index_num">'+(z_length+1)+'</span>：</span><span class="xt_sp_sprAddmsg">'+up_name+'<i class="zcj_del_sp_name_sc"></i></span></div>'


                    if(zg_z>0){
                        alert("您已添加所属上级");
                    }else if(z_length>=4){
                        alert("审批人不能多于4人");
                    }else{
                        $(".tanceng .zcj_edit_show_data_list_ck").find('.zcj_add_qt_other_spr_tc').eq(idx).parent().prev('.zcj_select_spr_add_nr').append(xz_up);
                        //$(".tanceng .zcj_edit_show_data_list_ck").find('.zcj_add_qj_spr_tc').eq(idx).parent().prev('.zcj_select_spr_add_nr').find('.zcj_scsj').data('superior','1');
                    }

                }
                $(_this).data('zgid',bm_zg);
                $(_this).data('upid',ss_up);
                $(this).next().click();
                $(this).parents('.dialog_content_delete').find('.dialog_close').click();

            });

        });

        /*需要工作交接人*/
        $(".tanceng .zcj_qj_list_show_xq_data .zcj_xy_work_is_val").die().live("click",function(){
            if($(this).is(":checked")){
                $(this).data('id',1)
            }else{
                $(this).data('id',2)
            }

        });
        /*开启自动通过*/
        $(".tanceng .zcj_qj_list_show_xq_data .zcj_xy_autotg_is_val").die().live("click",function(){
            if($(this).is(":checked")){
                $(this).data('id',1)
            }else{
                $(this).data('id',2)
            }

        });
        /******************************编辑确认按钮********************************/
        $(".tanceng .zcj_edit_leave_btn").die().live("click",function(){
            var _this=this;
            /* if($(".tanceng .zcj_qj_list_show_xq_data").data('id') == '') {
             delete ($(".tanceng .zcj_qj_list_show_xq_data").data('id'));
             }
             */
            var sybm=[];
            $(".tanceng .zcj_sybm_list_data_zs .zcj_sybm_val").each(function(){

                sybm.push($(this).data('id'));


            })
            /*抄送人数据*/
            var csrid=[];
            $(".tanceng .box_adderCon2 .zcj_csr_val").each(function(){

                csrid.push($(this).data('id'));


            })

            // $(".tanceng .zcj_select_spr_add_nr .zcj_xz_spr_name_show").each(function () {
            //     sp_r.push($(this).data('id'))$(".tanceng .zcj_edit_show_data_list_ck").find('.zcj_select_spr_add_nr').eq(i).data('gs_id')
            // })
            var sp_info=[];
            $(".tanceng .zcj_qj_list_show_xq_data").each(function (i,v) {
                var sp_r=[]
                $(".tanceng .zcj_qj_list_show_xq_data").eq(i).find('.zcj_xz_spr_name_show').each(function () {
                    sp_r.push($(this).data('id'))
                })
                sp_info.push({
                    'begin_value':$(".tanceng .zcj_start_time_val").eq(i).val(),
                    'end_value':$(".tanceng .zcj_end_time_val").eq(i).val(),
                    'is_need':$(".tanceng .zcj_xy_work_is_val").eq(i).data('id'),
                    'checker':sp_r.toString(),
                    'is_auto':2,
                    'director':$(".tanceng .zcj_select_spr_add_nr .zcj_bmzg").eq(i).data('director'),
                    'superior':$(".tanceng .zcj_select_spr_add_nr .zcj_scsj").eq(i).data('superior'),
                    'id': $(".tanceng .zcj_qj_list_show_xq_data").eq(i).data('id')
                });
            })

            var spr_info=JSON.stringify(sp_info)
            var is_open=$('.tanceng .zcj_is_kq_kjsp_btn').data('id')
            // console.log('100000000000000000000003');
            // console.log(sybm);
            // console.log(csrid);
            // console.log(spr_info);
            // console.log('100000000000000000000003');
            var star_z=parseInt($(".tanceng .zcj_qj_list_show_xq_data .zcj_start_time_val:last").val());
            var end_z=parseInt($(".tanceng .zcj_qj_list_show_xq_data .zcj_end_time_val:last").val());
            if(star_z<=0){
                alert("没有开始天数");
                return false;
            }else if(end_z>star_z){
                $.ajax({
                    type: 'post',
                    url: SERVER_URL + "/system-work/add",
                    data:{
                        token:token,
                        category:category,
                        dept:0,
                        is_across:is_open,
                        cc:csrid.toString(),
                        info:spr_info
                    },
                    dataType: "json",
                    success: function (data) {
                        console.log("333");
                        console.log(data);
                        console.log("333");
                        if(data.code==0){
                            system_set_work_list();
                            $(_this).parents('.dialog_content_3').find('.dialog_close').click();
                        }else{
                            alert(data.msg);
                        }

                    },
                    error:function(data){
                        alert("刷新失败");
                    }
                });
            }else{
                alert("请输入大于开始时间的结束天数");
            }

        });
        /************************编辑其他确认btn***********************/
        $(".tanceng .zcj_add_sp_tj_end_btn").die().live("click",function(){
            var me=this;
            var sybm=[];
            $(".tanceng .zcj_sybm_list_data_zs .zcj_sybm_val").each(function(){

                sybm.push($(this).data('id'));


            })
            /*抄送人数据*/
            // var csrid=[];
            // $(".tanceng .box_adderCon2 .zcj_csr_val").each(function(){
            //
            //     csrid.push($(this).data('id'));
            //
            //
            // })


            var other_info=[]

            $(".tanceng .zcj_qj_list_show_xq_data").each(function (i,v) {
                var sp_r=[]
                $(".tanceng .zcj_qj_list_show_xq_data").eq(i).find('.zcj_xz_spr_name_show').each(function () {
                    sp_r.push($(this).data('id'))
                })
                other_info.push({
                    'begin_value':'',
                    'end_value':'',
                    'is_need':$(".tanceng .zcj_xy_work_is_val").eq(i).data('id'),
                    'checker':sp_r.toString(),
                    'is_auto':2,
                    'director':$(".tanceng .zcj_select_spr_add_nr .zcj_bmzg").eq(i).data('director'),
                    'superior':$(".tanceng .zcj_select_spr_add_nr .zcj_scsj").eq(i).data('superior'),
                    'id': $(".tanceng .zcj_qj_list_show_xq_data").eq(i).data('id')
                });
            })

            var spr_show=JSON.stringify(other_info)
            var is_open=$('.tanceng .zcj_is_kq_kjsp_btn').data('id')
            // console.log('100000000000000000000003');
            // console.log(sybm);
            //
            // console.log(spr_show);
            // console.log('100000000000000000000003');
            $.ajax({
                type: 'post',
                url: SERVER_URL + "/system-work/add",
                data:{
                    token:token,
                    category:category,
                    dept:0,
                    is_across:is_open,
                    cc:0,
                    info:spr_show
                },
                dataType: "json",
                success: function (data) {
                    console.log("333");
                    console.log(data);
                    console.log("333");
                    if(data.code==0){
                        system_set_work_list();
                        $(me).parents('.dialog_content_3').find('.dialog_close').click();
                    }else{
                        alert(data.msg);
                    }

                },
                error:function(data){
                    alert("刷新失败");
                }
            });
        });
    });
/*审批list*/
function system_set_work_list(){
    $.ajax({
        type: "get",
        url: SERVER_URL + "/system-work/list",
        data: {
            token:token
        },
        dataType: 'json',
        success: function (data) {
            // console.log('000123123');
            // console.log(data);
            // console.log('000123123');
            worklist_show_fn(data['dataList'],".zcj_system_set_work_list_show_content")
           /* if(data['dataList']['16']){
                 $(".zcj_kq_list_data_disply_content").html(html)
            }else{

            }*/

        },
        error:function(data){
        alert('更新失败');
        }
    })
}
function worklist_show_fn(datalist,vclass){
    var html='';

        $.each(datalist,function(index,worklist){
        if(index!=16){
            html+='<div class="system_work_mbdh"><div class="crk_rkgl_addRKD">';
            html+='<div class="box_open_head relative">';
            if(index==1){
                html+='<span class="systerm_sp_title">请假</span><button class="but_mix but_blue val_dialog zcj_edit_show_qj_list_btn" data-category="1" name="xt_sp_qj">编辑</button>';
            }else if(index==2){
                html+='<span class="systerm_sp_title">出差</span><button class="but_mix but_blue val_dialog zcj_edit_show_qj_list_btn" data-category="2" name="xt_sp_qj">编辑</button>';
            }else if(index==3){
                html+='<span class="systerm_sp_title">外出</span><button class="but_mix but_blue val_dialog zcj_edit_show_qj_list_btn" data-category="3" name="xt_sp_jiekuan">编辑</button>';
            }else if(index==4){
                html+='<span class="systerm_sp_title">报销</span><button class="but_mix but_blue val_dialog zcj_edit_show_qj_list_btn" data-category="4" name="xt_sp_qj">编辑</button>';
            }else if(index==5){
                html+='<span class="systerm_sp_title">借款</span><button class="but_mix but_blue val_dialog zcj_edit_show_qj_list_btn" data-category="5" name="xt_sp_jiekuan">编辑</button>';
            }else if(index==6){
                html+='<span class="systerm_sp_title">付款</span><button class="but_mix but_blue val_dialog zcj_edit_show_qj_list_btn" data-category="6" name="xt_sp_jiekuan">编辑</button>';
            }else if(index==7){
                html+='<span class="systerm_sp_title">招聘</span><button class="but_mix but_blue val_dialog zcj_edit_show_qj_list_btn" data-category="7" name="xt_sp_jiekuan">编辑</button>';
            }else if(index==8){
                html+='<span class="systerm_sp_title">离职</span><button class="but_mix but_blue val_dialog zcj_edit_show_qj_list_btn" data-category="8" name="xt_sp_jiekuan">编辑</button>';
            }else if(index==9){
                html+='<span class="systerm_sp_title">转正</span><button class="but_mix but_blue val_dialog zcj_edit_show_qj_list_btn" data-category="9" name="xt_sp_jiekuan">编辑</button>';
            }else if(index==10){
                html+='<span class="systerm_sp_title">调薪</span><button class="but_mix but_blue val_dialog zcj_edit_show_qj_list_btn" data-category="10" name="xt_sp_jiekuan">编辑</button>';
            }else if(index==11){
                html+='<span class="systerm_sp_title">办公采购</span><button class="but_mix but_blue val_dialog zcj_edit_show_qj_list_btn" data-category="11" name="xt_sp_jiekuan">编辑</button>';
            }else if(index==12){
                html+='<span class="systerm_sp_title">物品领用</span><button class="but_mix but_blue val_dialog zcj_edit_show_qj_list_btn" data-category="12" name="xt_sp_jiekuan">编辑</button>';
            }else if(index==13){
                html+='<span class="systerm_sp_title">公章</span><button class="but_mix but_blue val_dialog zcj_edit_show_qj_list_btn" data-category="13" name="xt_sp_jiekuan">编辑</button>';
            }else if(index==14){
                html+='<span class="systerm_sp_title">合同</span><button class="but_mix but_blue val_dialog zcj_edit_show_qj_list_btn" data-category="14" name="xt_sp_jiekuan">编辑</button>';
            }else if(index==15){
                html+='<span class="systerm_sp_title">普通审批</span><button class="but_mix but_blue val_dialog zcj_edit_show_qj_list_btn" data-category="15" name="xt_sp_jiekuan">编辑</button>';
            }else if(index==16){
                return true;
                // html+='<span class="systerm_sp_title">考勤</span><button class="but_mix but_blue val_dialog zcj_edit_show_qj_list_btn" data-category="16" name="xt_sp_jiekuan">编辑</button>';
            }
            html+='<span class="box_open_btn c_9" style="right:20px;">收起 <i class="right icon_hide"></i></span>';
            html+='</div>';
            html+='<div class="systerm_sp_con"><div class="container">';
            html+='<div class="table-container">';
            html+='<table class="systerm_sp_con_table">';
            html+='<thead>';
            html+='<tr> <th style="width: 11%;">条件名称</th> <th style="width: 89%">审批条件</th></tr>';
            html+='</thead>';
            html+='<tbody>';


            $.each(worklist,function(index,content){

                html+='<tr>';
                if(content['category']==1){
                    if(index==0){
                        html+='<td data-category="'+content['category']+'">请假</td>';
                    }else{
                        html+='<td data-category="'+content['category']+'"></td>';
                    }

                }else if(content['category']==2){
                    if(index==0){
                        html+='<td data-category="'+content['category']+'">出差</td>';
                    }else{
                        html+='<td data-category="'+content['category']+'"></td>';
                    }
                }else if(content['category']==3){
                    if(index==0){
                        html+='<td data-category="'+content['category']+'">外出</td>';
                    }else{
                        html+='<td data-category="'+content['category']+'"></td>';
                    }

                }else if(content['category']==4){
                    if(index==0){
                        html+='<td>报销</td>';
                    }else{
                        html+='<td></td>';
                    }

                }else if(content['category']==5){
                    if(index==0){
                        html+='<td>借款</td>';
                    }else{
                        html+='<td></td>';
                    }

                }else if(content['category']==6){
                    if(index==0){
                        html+='<td>付款</td>';
                    }else{
                        html+='<td></td>';
                    }

                }else if(content['category']==7){
                    if(index==0){
                        html+='<td>招聘</td>';
                    }else{
                        html+='<td></td>';
                    }

                }else if(content['category']==8){
                    if(index==0){
                        html+='<td>离职</td>';
                    }else{
                        html+='<td></td>';
                    }

                }else if(content['category']==9){
                    if(index==0){
                        html+='<td>转正</td>';
                    }else{
                        html+='<td></td>';
                    }

                }else if(content['category']==10){
                    if(index==0){
                        html+='<td>调薪</td>';
                    }else{
                        html+='<td></td>';
                    }

                }else if(content['category']==11){
                    if(index==0){
                        html+='<td>办公采购</td>';
                    }else{
                        html+='<td></td>';
                    }

                }else if(content['category']==12){
                    if(index==0){
                        html+='<td>物品领用</td>';
                    }else{
                        html+='<td></td>';
                    }

                }else if(content['category']==13){
                    if(index==0){
                        html+='<td>公章</td>';
                    }else{
                        html+='<td></td>';
                    }

                }else if(content['category']==14){
                    if(index==0){
                        html+='<td>合同</td>';
                    }else{
                        html+='<td></td>';
                    }

                }else if(content['category']==15){
                    if(index==0){
                        html+='<td>普通审批</td>';
                    }else{
                        html+='<td></td>';
                    }

                }else if(content['category']==16){
                    return true;
                    // if(index==0){
                    //     html+='<td>考勤</td>';
                    // }else{
                    //     html+='<td></td>';
                    // }

                }
                if(content['category']!=16){
                    if(content['begin_value']==0){
                        html+='<td><div class="xt_sp_step"><span class="xt_sp_stepName">条件'+(index+1)+'：</span><div class="inline_block xt_sp_stepBox">';
                        // html+='<span></span>';
                    }else{
                        if(content['category']==4) {
                            html += '<td><div class="xt_sp_step"><span class="xt_sp_stepName">条件' + (index + 1) + '：</span><div class="inline_block xt_sp_stepBox"><span>' + content['begin_value'] + '-' + content['end_value'] + '元</span>';
                            html += '<span>' + (content['is_need'] == 1 ? "需要工作交接人" : "不需要工作交接人") + '</span>';
                        }else{
                            html += '<td><div class="xt_sp_step"><span class="xt_sp_stepName">条件' + (index + 1) + '：</span><div class="inline_block xt_sp_stepBox"><span>' + content['begin_value'] + '-' + content['end_value'] + '天</span>';
                            html += '<span>' + (content['is_need'] == 1 ? "需要工作交接人" : "不需要工作交接人") + '</span>';
                        }
                    }

                    if(content['checkerName']){
                        var spbz=[];
                        var cs_name=[];
                        var step=content['checker'];
                        var csname=content['checkerName'];
                        if(step!=null){
                            spbz.push(step.split(','));
                        }
                        /*  if(content['director']==1){
                         spbz.push('1')
                         cs_name.push("部门主管")
                         }*/
                        // console.log('10001');
                        // console.log(csname);
                        // console.log(step);
                        // console.log("10001");
                        if(csname!=null){
                            cs_name.push(csname.split(','));
                        }

                        content['checkerName']=cs_name;
                        var bz;
                        $.each(content['checkerName'],function(v,bzlist){
                            bz='';
                            $.each(bzlist,function(i){

                                bz+='<span data-id="'+spbz[v][i]+'" >步骤'+(i+1)+'：<em>'+bzlist[i]+'<i></i></em></span>'

                            })
                        })
                    }
                        html+='<div class="inline_block xt_sp_stepCon c_9">';
                        if(content['checkerName']!=''){
                            html+=bz
                            if(content['director']==1 && content['superior']==1){
                                html+='<span data-id="1">步骤'+(parseInt(cs_name[0].length)+1)+'：<em>部门主管<i></i></em></span><span data-id="1">步骤'+(parseInt(cs_name[0].length)+2)+'：<em>所属上级<i></i></em></span>'
                                /*cs_name.push("部门主管")*/
                            }else if(content['director']==1){
                                html+='<span data-id="1">步骤'+(parseInt(cs_name[0].length)+1)+'：<em>部门主管<i></i></em></span>'
                            }else if(content['superior']==1){
                                html+='<span data-id="1">步骤'+(parseInt(cs_name[0].length)+1)+'：<em>所属上级<i></i></em></span>'
                            }
                        }else{
                            html+=''
                            if(content['director']==1 && content['superior']==1){
                                html+='<span data-id="1">步骤1：<em>部门主管<i></i></em></span><span data-id="1">步骤2：<em>所属上级<i></i></em></span>'
                                /*cs_name.push("部门主管")*/
                            }else if(content['director']==1){
                                html+='<span data-id="1">步骤1：<em>部门主管<i></i></em></span>'
                            }else if(content['superior']==1){
                                html+='<span data-id="1">步骤1：<em>所属上级<i></i></em></span>'
                            }
                        }





                    html+='</div></div></div>';
                    html+='</td>'
                }

                // html+='<td>'+likNullData(content['deptName'])+'</td>';
                // if(index==0){
                //     html+='<td>'+likNullData(content['ccName'])+'</td>';
                // }else{
                //     html+='<td></td>';
                // }

                html+='</tr>';
            })

            html+='</tbody>';
            html+='</table>';
            html+='</div></div></div></div></div>';
        }



    })

    $(vclass).html(html)
}

    $("#zcj_work_list_left_bar").trigger('click');
/*编辑列表方法*/
function edit_list_fn(cate_id){
    $.ajax({
        type: "get",
        url: SERVER_URL + "/system-work/list",
        data: {
            token: token,
            category:cate_id
        },
        dataType: 'json',
        success: function (data) {
            console.log('999000');
            console.log(data);

                edit_qj_list_show(data['dataList'],".zcj_edit_show_data_list_ck");

            // var bm_id=$(".tanceng .zcj_qj_list_show_xq_data").eq(0).data('dept');
            // var bm_name=$(".tanceng .zcj_qj_list_show_xq_data").eq(0).data('deptname');
            var cc_id=$(".tanceng .zcj_qj_list_show_xq_data").eq(0).data('cc');
            var cc_name=$(".tanceng .zcj_qj_list_show_xq_data").eq(0).data('ccname');


            /*部门*/

            //     var bmname=[];
            //     var bmid=[];
            //    /* var bm_name=v['deptName'];*/
            // console.log('20000033333');
            //     console.log(bm_id);
            //     var bid=bm_id.toString()
            //     console.log(bm_name);
            // console.log('20000033333');
            //     if(bm_name!=null && bm_name!=undefined){
            //         bmname.push(bm_name.split('、'));
            //     }
            //     if(bid!=null && bid!=undefined){
            //         bmid.push(bid.split(','));
            //     }
            //    /* bmid.push(bm_id.split(','));*/
            // var bm_list;
            //     $.each(bmname,function(i,bmlist){
            //         bm_list=''
            //         $.each(bmlist,function(j){
            //             bm_list+='<li class="zcj_sybm_val" data-id="'+bmid[i][j]+'">'+bmlist[j]+'<i class="zcj_del_sybm_name_d"></i></li>';
            //         })
            //     })
            // $(".zcj_sybm_list_data_zs .zcj_sybm_val").remove();
            // $(".zcj_xz_sybm_tc_dept_btn").parent().before(bm_list);
                /*抄送人*/

            // var cc_list=''
            // $.each(data['dataList'],function(v,cclist){
            //     if(v==0){
            //         $.each(cclist['ccList'],function(k,vlist){
            //
            //                 cc_list+='<li data-id="'+vlist['uid']+'" data-name="'+vlist['userName']+'" class="zcj_csr_val"><i class="del_img_1">-</i><em class="icon_personBtn icon_personBtn_msg"><i class="icon_personNext"></i></em> <em class="icon_adderBtn"></em> <p class="box_adderName">'+vlist['userName']+'</p></li>';
            //
            //
            //          })
            //     }
            //  })
            // $(".tanceng .box_adderCon2 .zcj_csr_val").remove();
            //     $(".tanceng .zcj_xzcsr_tc_btn").parent().before(cc_list);

        },
        error:function(){
            alert("更新失败");
        }
    })
}

    /*请假、报销、出差、编辑列表*/
    function edit_qj_list_show(datalist,vclass){
    var html='';

    $.each(datalist,function(index,editlist){
        html+='<div class="sys_sp_sptjBox clearfix zcj_qj_list_show_xq_data" data-is_across="'+editlist['is_across']+'" data-id="'+editlist['id']+'" data-cc="'+editlist['cc']+'" data-ccname="'+editlist['ccName']+'" data-dept="'+editlist['dept']+'" data-deptname="'+editlist['deptName']+'" style="margin-top: 20px;">';
        if(datalist.length>1){
            html+='<i class="sys_sp_close"></i>';
        }else{
            html+='<i class="sys_sp_close none1"></i>';
        }

        html+='<div class="left c_3">';
        html+='审批条件<span class="page_39_sptjNum">'+(index+1)+'</span>';
        html+='</div>';
        html+='<div class="sys_sp_spfw">';

            html+='<p class="c_3">审批范围</p>';
            html+='<div class="sys_sp_spfwCon c_9">';

        if(editlist['category']==4){
            html+='<span class="m_right_10">范围</span><input type="text" data-dept="'+editlist['dept']+'" data-cc="'+editlist['cc']+'" disabled="true" class="time_input c_3 zcj_start_time_val" value="'+(editlist['begin_value']==undefined ? '1' : editlist['begin_value'])+'"><hr class="inline_block sys_inp_line"/><input type="text" class="time_input c_3 zcj_end_time_val" value="'+(editlist['end_value']==undefined ? '2' : editlist['end_value'])+'"><span class="m_left_10 zj_bx_price_num">元</span>';
        }else{

            html+='<span class="m_right_10">范围</span><input type="text" data-dept="'+editlist['dept']+'" data-cc="'+editlist['cc']+'" disabled="true" class="time_input c_3 zcj_start_time_val" value="'+(editlist['begin_value']==undefined ? '1' : editlist['begin_value'])+'"><hr class="inline_block sys_inp_line"/><input type="text" class="time_input c_3 zcj_end_time_val" value="'+(editlist['end_value']==undefined ? '2' : editlist['end_value'])+'"><span class="m_left_10 zj_bx_price_num">天</span>';
        }

            if(editlist['category']!=4){

                if(editlist['is_need']==1){
                    html+=' <label><input type="checkbox" class="zcj_xy_work_is_val" checked="true" data-id="1" value=""/>需要工作交接人</label>';
                }else{
                    html+=' <label><input type="checkbox" class="zcj_xy_work_is_val" data-id="2" value=""/>需要工作交接人</label>';
                }
            }

           /* if(editlist['is_auto']==1){
                html+='<label><input type="checkbox" checked="true" class="zcj_xy_autotg_is_val" data-id="1" value=""/>开启自动通过</label>';
            }else{
                html+='<label><input type="checkbox" class="zcj_xy_autotg_is_val" data-id="2" value=""/>开启自动通过</label>';
            }*/
            html+='</div>';


        html+='<p class="c_3">审批人</p>';
        html+='<div class="sys_sp_spfwCon c_9">';
        html+='<div class="left zcj_select_spr_add_nr" data-zgid="2" data-upid="2" data-gs_id="'+editlist['checker']+'">'
        if(editlist['checkerName']){
            var sprname=[];
            var sprid=[];
            if(editlist['checker']!=''){
                var spr_id=editlist['checker'];
                var spid=spr_id.toString();
            }

            if(spid!=null && spid!=undefined){
                sprid.push(spid.split(','));
            }
            var spr_name=editlist['checkerName'];
            if(spr_name!=null){
                sprname.push(spr_name.split(','));
            }

            editlist['checkerName']=sprname;
            var aname;
            $.each(editlist['checkerName'],function(arr,con){
                aname='';
                $.each(con,function (i) {
                    aname+='<div class="xt_sp_sprAdd left zcj_xz_spr_name_show" data-id="'+sprid[arr][i]+'"><span class="m_right_5">步骤<span class="zj_index_num">'+(i+1)+'</span>：</span><span class="xt_sp_sprAddmsg">'+con[i]+'<i class="zcj_del_sp_name_sc" data-num="'+(i+1)+'"></i></span></div>'
                })
            })
            // html+=''+aname+''

            html+=aname;
        }else{
            html+='';
        }
            if(editlist['checkerName']!=''){
                if(editlist['director']==1 && editlist['superior']==1){
                    html+='<div class="xt_sp_sprAdd left zcj_bmzg" data-director="'+editlist['director']+'"><span class="m_right_5">步骤<span class="zj_index_num">'+(parseInt(sprname[0].length)+1)+'</span>：</span><span class="xt_sp_sprAddmsg">部门主管<i class="zcj_del_sp_name_sc"></i></span></div><div class="xt_sp_sprAdd left zcj_scsj" data-superior="'+editlist['superior']+'"><span class="m_right_5">步骤<span class="zj_index_num">'+(parseInt(sprname[0].length)+2)+'</span>：</span><span class="xt_sp_sprAddmsg">所属上级<i class="zcj_del_sp_name_sc"></i></span></div>';


                    /*cs_name.push("部门主管")*/
                }else if(editlist['director']==1){
                    html+='<div class="xt_sp_sprAdd left zcj_bmzg" data-director="'+editlist['director']+'"><span class="m_right_5">步骤<span class="zj_index_num">'+(parseInt(sprname[0].length)+1)+'</span>：</span><span class="xt_sp_sprAddmsg">部门主管<i class="zcj_del_sp_name_sc"></i></span></div>';

                }else if(editlist['superior']==1){
                    html+='<div class="xt_sp_sprAdd left zcj_scsj" data-superior="'+editlist['superior']+'"><span class="m_right_5">步骤<span class="zj_index_num">'+(parseInt(sprname[0].length)+1)+'</span>：</span><span class="xt_sp_sprAddmsg">所属上级<i class="zcj_del_sp_name_sc"></i></span></div>';

                }
            }else{
                if(editlist['director']==1 && editlist['superior']==1){
                    html+='<div class="xt_sp_sprAdd left zcj_bmzg" data-director="'+editlist['director']+'"><span class="m_right_5">步骤<span class="zj_index_num">1</span>：</span><span class="xt_sp_sprAddmsg">部门主管<i class="zcj_del_sp_name_sc"></i></span></div><div class="xt_sp_sprAdd left zcj_scsj" data-superior="'+editlist['superior']+'"><span class="m_right_5">步骤<span class="zj_index_num">2</span>：</span><span class="xt_sp_sprAddmsg">所属上级<i class="zcj_del_sp_name_sc"></i></span></div>';


                    /*cs_name.push("部门主管")*/
                }else if(editlist['director']==1){
                    html+='<div class="xt_sp_sprAdd left zcj_bmzg" data-director="'+editlist['director']+'"><span class="m_right_5">步骤<span class="zj_index_num">1</span>：</span><span class="xt_sp_sprAddmsg">部门主管<i class="zcj_del_sp_name_sc"></i></span></div>';

                }else if(editlist['superior']==1){
                    html+='<div class="xt_sp_sprAdd left zcj_scsj" data-superior="'+editlist['superior']+'"><span class="m_right_5">步骤<span class="zj_index_num">1</span>：</span><span class="xt_sp_sprAddmsg">所属上级<i class="zcj_del_sp_name_sc"></i></span></div>';

                }
            }


        html+='</div><div class="xt_sp_sprAdd left"><span class="m_right_5">步骤：</span> <button data-dept="'+editlist['dept']+'" class="but_icon sys_sp_addsprBtn val_dialogTop zcj_add_qj_spr_tc" data-index="'+index+'" name="xt_sp_xzspr"><i></i>添加</button> </div>';
        html+='</div> </div> </div>';

    })
    $(vclass).html(html);
    }
    /*编辑列表方法*/
    function edit_list_fn_other(cate_id){
        $.ajax({
            type: "get",
            url: SERVER_URL + "/system-work/list",
            data: {
                token: token,
                category:cate_id
            },
            dataType: 'json',
            success: function (data) {
                console.log('999000999999999999');
                console.log(data);
                console.log('99900099999999999999');
                edit_qj_list_show_other(data['dataList'],".zcj_edit_show_data_list_ck");


                // var bm_id=$(".tanceng .zcj_qj_list_show_xq_data").eq(0).data('dept');
                // var bm_name=$(".tanceng .zcj_qj_list_show_xq_data").eq(0).data('deptname');
                // var cc_id=$(".tanceng .zcj_qj_list_show_xq_data").eq(0).data('cc');
                // var cc_name=$(".tanceng .zcj_qj_list_show_xq_data").eq(0).data('ccname');


                /*部门*/

                //     var bmname=[];
                //     var bmid=[];
                //    /* var bm_name=v['deptName'];*/
                // console.log('20000033333');
                //     console.log(bm_id);
                //     var bid=bm_id.toString()
                //     console.log(bm_name);
                // console.log('20000033333');
                //     if(bm_name!=null && bm_name!=undefined){
                //         bmname.push(bm_name.split('、'));
                //     }
                //     if(bid!=null && bid!=undefined){
                //         bmid.push(bid.split(','));
                //     }
                //    /* bmid.push(bm_id.split(','));*/
                // var bm_list;
                //     $.each(bmname,function(i,bmlist){
                //         bm_list=''
                //         $.each(bmlist,function(j){
                //             bm_list+='<li class="zcj_sybm_val" data-id="'+bmid[i][j]+'">'+bmlist[j]+'<i class="zcj_del_sybm_name_d"></i></li>';
                //         })
                //     })
                // $(".zcj_sybm_list_data_zs .zcj_sybm_val").remove();
                // $(".zcj_xz_sybm_tc_dept_btn").parent().before(bm_list);
                /*抄送人*/

                // var cc_list=''
                // $.each(data['dataList'],function(v,cclist){
                //     if(v==0){
                //         $.each(cclist['ccList'],function(k,vlist){
                //
                //             cc_list+='<li data-id="'+vlist['uid']+'" data-name="'+vlist['userName']+'" class="zcj_csr_val"><i class="del_img_1">-</i><em class="icon_personBtn icon_personBtn_msg"><i class="icon_personNext"></i></em> <em class="icon_adderBtn"></em> <p class="box_adderName">'+vlist['userName']+'</p></li>';
                //
                //
                //         })
                //     }
                // })
                // $(".tanceng .box_adderCon2 .zcj_csr_val").remove();
                // $(".tanceng .zcj_xzcsr_tc_btn").parent().before(cc_list);

            },
            error:function(){
                alert("更新失败");
            }
        })
    }
    /*借款、招聘、离职、转正、公章、外出、调薪、办公采购、付款、物品领用、合同、普通审批*/
    function edit_qj_list_show_other(datalist,vclass){
        var html='';

        $.each(datalist,function(index,editlist){
            html+='<div class="sys_sp_sptjBox clearfix zcj_qj_list_show_xq_data" data-is_across="'+editlist['is_across']+'" data-id="'+editlist['id']+'" data-cc="'+editlist['cc']+'" data-ccname="'+editlist['ccName']+'" data-dept="'+editlist['dept']+'" data-deptname="'+editlist['deptName']+'" style="margin-top: 20px;">';
            /*html+='<i class="sys_sp_close"></i>';*/
            html+='<div class="left c_3">';
            html+='审批条件<span class="page_39_sptjNum">'+(index+1)+'</span>';
            html+='</div>';
            html+='<div class="sys_sp_spfw">';
            html+='<p class="c_3">审批人</p>';
            html+='<div class="sys_sp_spfwCon c_9">';
            html+='<div class="left zcj_select_spr_add_nr" data-zgid="2" data-upid="2" data-gs_id="'+editlist['checker']+'">'
            if(editlist['checkerName']){
                var sprname=[];
                var sprid=[];
                var spr_id=editlist['checker'];
                if(editlist['checker']!=''){
                    var spid=spr_id.toString();
                }
                if(spid!=null && spid!=undefined){
                    sprid.push(spid.split(','));
                }
                var spr_name=editlist['checkerName'];
                if(spr_name!=null){
                    sprname.push(spr_name.split(','));
                }

                editlist['checkerName']=sprname;
                var aname;
                $.each(editlist['checkerName'],function(arr,con){
                    aname='';
                    $.each(con,function (i) {
                        aname+='<div class="xt_sp_sprAdd left zcj_xz_spr_name_show" data-id="'+sprid[arr][i]+'"><span class="m_right_5">步骤<span class="zj_index_num">'+(i+1)+'</span>：</span><span class="xt_sp_sprAddmsg">'+con[i]+'<i class="zcj_del_sp_name_sc" data-num="'+(i+1)+'"></i></span></div>'
                    })
                })
                 html+= aname;

            }else{
                html+= '';
            }
            if(editlist['checkerName']!=''){
                if(editlist['director']==1 && editlist['superior']==1){
                    html+='<div class="xt_sp_sprAdd left zcj_bmzg" data-director="'+editlist['director']+'"><span class="m_right_5">步骤<span class="zj_index_num">'+(parseInt(sprname[0].length)+1)+'</span>：</span><span class="xt_sp_sprAddmsg">部门主管<i class="zcj_del_sp_name_sc"></i></span></div><div class="xt_sp_sprAdd left zcj_scsj" data-superior="'+editlist['superior']+'"><span class="m_right_5">步骤<span class="zj_index_num">'+(parseInt(sprname[0].length)+2)+'</span>：</span><span class="xt_sp_sprAddmsg">所属上级<i class="zcj_del_sp_name_sc"></i></span></div>';

                    /*cs_name.push("部门主管")*/
                }else if(editlist['director']==1){
                    html+='<div class="xt_sp_sprAdd left zcj_bmzg" data-director="'+editlist['director']+'"><span class="m_right_5">步骤<span class="zj_index_num">'+(parseInt(sprname[0].length)+1)+'</span>：</span><span class="xt_sp_sprAddmsg">部门主管<i class="zcj_del_sp_name_sc"></i></span></div>';

                }else if(editlist['superior']==1){
                    html+='<div class="xt_sp_sprAdd left zcj_scsj" data-superior="'+editlist['superior']+'"><span class="m_right_5">步骤<span class="zj_index_num">'+(parseInt(sprname[0].length)+1)+'</span>：</span><span class="xt_sp_sprAddmsg">所属上级<i class="zcj_del_sp_name_sc"></i></span></div>';

                }
            }else{
                if(editlist['director']==1 && editlist['superior']==1){
                    html+='<div class="xt_sp_sprAdd left zcj_bmzg" data-director="'+editlist['director']+'"><span class="m_right_5">步骤<span class="zj_index_num">1</span>：</span><span class="xt_sp_sprAddmsg">部门主管<i class="zcj_del_sp_name_sc"></i></span></div><div class="xt_sp_sprAdd left zcj_scsj" data-superior="'+editlist['superior']+'"><span class="m_right_5">步骤<span class="zj_index_num">2</span>：</span><span class="xt_sp_sprAddmsg">所属上级<i class="zcj_del_sp_name_sc" data-num="'+(parseInt(sprname[0].length)+2)+'"></i></span></div>';

                    /*cs_name.push("部门主管")*/
                }else if(editlist['director']==1){
                    html+='<div class="xt_sp_sprAdd left zcj_bmzg" data-director="'+editlist['director']+'"><span class="m_right_5">步骤<span class="zj_index_num">1</span>：</span><span class="xt_sp_sprAddmsg">部门主管<i class="zcj_del_sp_name_sc"></i></span></div>';

                }else if(editlist['superior']==1){
                    html+='<div class="xt_sp_sprAdd left zcj_scsj" data-superior="'+editlist['superior']+'"><span class="m_right_5">步骤<span class="zj_index_num">1</span>：</span><span class="xt_sp_sprAddmsg">所属上级<i class="zcj_del_sp_name_sc"></i></span></div>';

                }
            }


            html+='</div><div class="xt_sp_sprAdd left"><span class="m_right_5">步骤：</span> <button data-dept="'+editlist['dept']+'" class="but_icon sys_sp_addsprBtn val_dialogTop zcj_add_qt_other_spr_tc" data-index="'+index+'" name="xt_sp_xzspr"><i></i>添加</button> </div>';
            html+=' </div> </div></div>';

        })
        $(vclass).html(html);

    }
    /*删除审批人*/
    $(".tanceng .zcj_del_sp_name_sc").die().live("click",function(){
        //var del_num=$(this).data('num');
        var del=$(this).parent('span').prev().find('.zj_index_num').text()
        $(this).parents('.xt_sp_sprAdd').next().find('.zj_index_num').text(parseInt(del))
        $(this).parents('.xt_sp_sprAdd').next().next().find('.zj_index_num').text(parseInt(del)+1)
        $(this).parents('.xt_sp_sprAdd').next().next().next().find('.zj_index_num').text(parseInt(del)+2)
        $(this).parents('.xt_sp_sprAdd').next().next().next().next().find('.zj_index_num').text(parseInt(del)+3)
        $(this).parent().parent().remove();
    });
    /*删除适用部门*/
    $(".tanceng .zcj_del_sybm_name_d").die().live("click",function(){
        $(this).parent().remove();
    });
/*输入天数*/
$(".tanceng .zcj_qj_list_show_xq_data .zcj_end_time_val").die().live("keyup",function(){
    var my_val=$(this).val();
    var stat_val=$(this).parent('.sys_sp_spfwCon').children('.zcj_start_time_val').val();

    if(parseInt(my_val)>0 && parseInt(my_val)>parseInt(stat_val)){
        $(this).parents(".zcj_qj_list_show_xq_data").next().find('.zcj_start_time_val').val(parseInt(my_val)+1);
    }else{
        my_val=parseInt(stat_val)+1
        //alert("请输入正确的天数");
    }

});
/*关闭*/
$(".tanceng .zcj_qj_list_show_xq_data .sys_sp_close").die().live("click",function () {
    var up_val=$(this).parent().prev().find(".zcj_end_time_val").val();
    if(up_val>0 && up_val!=undefined && up_val!=''){
        $(this).parent().next().find('.zcj_start_time_val').val(parseInt(up_val)+1);
    }


});


    /********************工作考勤************************************/
    $("#zcj_kq_list_content").die().live("click",function(){

        //work_data['category']=16;
        $.ajax({
            type: "get",
            url: SERVER_URL + "/system-work/list",
            data: {
                token: token,
                category:16
            },
            dataType: 'json',
            success: function (data) {

                console.log(data);
               /* edit_list_fn_other(cate_id);*/
                var html='';

                $.each(data['dataList'],function(index,worklist){
                    console.log('222');
                    console.log(worklist);
                    console.log('222');
                    html+='<div class="system_work_mbdh"><div class="crk_rkgl_addRKD">';
                    html+='<div class="box_open_head relative">';

                    html+='<span class="systerm_sp_title">统计考勤</span><button class="but_mix but_blue val_dialog zcj_edit_kq_show_qj_list_btn" data-category="16" name="xt_sp_jiekuan">编辑</button>';

                    html+='<span class="box_open_btn c_9" style="right:20px;">收起 <i class="right icon_hide"></i></span>';
                    html+='</div>';
                    html+='<div class="systerm_sp_con"><div class="container">';
                    html+='<div class="table-container">';
                    html+='<table class="systerm_sp_con_table">';
                    html+='<thead>';
                    html+='<tr> <th style="width:11%;">条件名称</th> <th style="width:89%;">审批条件</th></tr>';
                    html+='</thead>';
                    html+='<tbody>';


                /*    $.each(worklist,function(index,content){*/

                        html+='<tr>';
                        html+='<td>请假</td>';
                        html+='<td><div class="xt_sp_step"><span class="xt_sp_stepName">条件1：</span><div class="inline_block xt_sp_stepBox">'
                       /* html+='<span>'+(worklist['is_need']==1 ? "是" : "否")+'</span>';*/
                        if(worklist['checkerName']){
                            var spbz=[];
                            var cs_name=[];
                            var step=worklist['checker'];
                            var csname=worklist['checkerName'];
                            if(step!=''){
                                spbz.push(step.split(','));
                            }
                            /*  if(content['director']==1){
                             spbz.push('1')
                             cs_name.push("部门主管")
                             }*/
                            // console.log('10001');
                            // console.log(csname);
                            // console.log(step);
                            // console.log("10001");
                            if(csname!=''){
                                cs_name.push(csname.split(','));
                            }

                            worklist['checkerName']=cs_name;

                                var bz;
                                $.each(worklist['checkerName'],function(v,bzlist){
                                    bz='';
                                    $.each(bzlist,function(i){

                                        bz+='<span data-id="'+spbz[v][i]+'">步骤'+(i+1)+'：<em>'+bzlist[i]+'<i></i></em></span>'

                                    })
                                })



                            html+='<div class="inline_block xt_sp_stepCon c_9">';
                            if(worklist['director']==1 && worklist['superior']==1){
                                html+=bz+'<span data-id="1">步骤'+(parseInt(cs_name[0].length)+1)+'：<em>部门主管<i></i></em></span><span data-id="1">步骤'+(parseInt(cs_name[0].length)+2)+'：<em>所属上级<i></i></em></span>'
                                /*cs_name.push("部门主管")*/
                            }else if(worklist['director']==1){
                                html+=bz+'<span data-id="1">步骤'+(parseInt(cs_name[0].length)+1)+'：<em>部门主管<i></i></em></span>'
                            }else if(worklist['superior']==1){
                                html+=bz+'<span data-id="1">步骤'+(parseInt(cs_name[0].length)+1)+'：<em>所属上级<i></i></em></span>'
                            }else{
                                html+=bz;
                            }
                        }


                        html+='</div></div></div>';
                        html+='</td>'
                       /* html+='<td>'+likNullData(worklist['deptName'])+'</td>';*/
                      /* if(index==0){
                           html+='<td>'+likNullData(worklist['ccName'])+'</td>';
                       }else{
                           html+='<td></td>';
                       }*/

                        html+='</tr>';
                    })

                    html+='</tbody>';
                    html+='</table>';
                    html+='</div></div></div></div></div>';


              /*  })*/

                $(".zcj_kq_list_data_disply_content").html(html)

            },
            error:function(data){
                alert('更新失败');
            }
        })

       /* system_set_work_list();*/
       $(".zcj_edit_kq_show_qj_list_btn").die().live("click",function(){
           var category=$(this).data('category')

           $(".zcj_sp_other_info_show .zcj_head_name_text").html('统计考勤');
           edit_list_fn_other(category);

           /*添加审批人*/
           $(".tanceng .zcj_add_qt_other_spr_tc").die().live("click",function(){
                var inum=$(this).data('index');

               /*$(".zcj_xzspr_person_list_end_btn").data('index',idx)*/
               var _this=this;
               $.ajax({
                   type: 'get',
                   url: SERVER_URL + "/dept/deptlist",
                   data:{
                       token:token

                   },
                   dataType: "json",
                   success: function (data) {
                       console.log('00000')
                       console.log(data)
                       console.log('00000')
                       if(data.code==0){
                           var head='<li class="left_all"><span class="icon_open change_ba"></span><span class="icon_file"></span><span class="list_msg">所有分类</span></li>'
                           var deep=0
                           $(".zcj_xz_spr_tc_tree_list").html(head+tree_list_bmfzr(data,deep));
                       }else{
                           alert(data.msg);
                       }

                   },
                   error:function(data){
                       alert('更新失败，请稍后再试');
                   }
               });
               /*获取name*/
               $(".tanceng .zcj_xz_spr_tc_tree_list .person_left_nav").die().live("click",function(){

                   var iv=$(this).children(".list_msg").html();
                   /* alert(iv);*/

                   /*确定选择负责人*/
                   $(".tanceng .zcj_select_spr_person_end_btn").die().live("click",function(){
                       /*var name=$(".zcj_show_man").val(iv);*/

                       var id=$(".zcj_xz_spr_tc_tree_list .person_left_nav.on").attr("aid");

                       var sp_length=$(".tanceng .zcj_edit_show_data_list_ck").find('.zcj_add_qt_other_spr_tc').eq(inum).parent().prev().find('.zcj_xz_spr_name_show').length;
                       var z_length=$(".tanceng .zcj_edit_show_data_list_ck").find('.zcj_add_qt_other_spr_tc').eq(inum).parent().prev().find('.xt_sp_sprAdd ').length;
                       var bm_zg=$(".tanceng .zcj_edit_show_data_list_ck").find('.zcj_add_qt_other_spr_tc').eq(inum).parent().prev().find('.zcj_bmzg ').length;
                       var ss_sj=$(".tanceng .zcj_edit_show_data_list_ck").find('.zcj_add_qt_other_spr_tc').eq(inum).parent().prev().find('.zcj_scsj ').length;

                       var xz_spr='<div class="xt_sp_sprAdd left zcj_xz_spr_name_show" data-id="'+id+'"><span class="m_right_5">步骤<span class="zj_inde_num">'+(sp_length+1)+'</span>：</span><span class="xt_sp_sprAddmsg">'+iv+'<i class="zcj_del_sp_name_sc"></i></span></div>'

                       var f_if=[];

                       $(".tanceng .zcj_edit_show_data_list_ck").find('.zcj_add_qt_other_spr_tc').eq(inum).parent().prev().find('.zcj_xz_spr_name_show').each(function(){
                           var sp_id=$(this).data('id')
                           if(sp_id==id){
                               f_if.push(sp_id)
                               alert('审批人不可以重复');
                               return false;
                           }
                       });
                       if(f_if.length>0){
                           return false;
                       }else if(sp_length>=4 || z_length>=4){
                           alert('审批人不可以超过4个');
                           return false;
                       }else if(bm_zg>0){
                           alert('你已选部门主管，不可再选员工');
                           return false;
                       }else if(ss_sj>0){
                           alert('你已选所属上级，不可再选其他员工');
                           return false;
                       }else{
                           $(".tanceng .zcj_edit_show_data_list_ck").find('.zcj_add_qt_other_spr_tc').eq(inum).parent().prev('.zcj_select_spr_add_nr').append(xz_spr);
                       }
                      /* var gsp_str=[]
                       $(".tanceng .zcj_edit_show_data_list_ck .zcj_select_spr_add_nr").eq(idx).find('.zcj_xz_spr_name_show').each(function(){
                           gsp_str.push($(this).data('id'));
                       })
                       $(".tanceng .zcj_edit_show_data_list_ck").find('.zcj_select_spr_add_nr').eq(idx).data('gs_id',gsp_str.toString())*/

                       $(this).next().click();
                       $(".tanceng .dialog_content_delete").find(".dialog_close").click();
                   });
                   /*取消选择负责人*/

               });
               /*部门主管*/
               $(".tanceng .zcj_bmzg_xzspr_is_true").die().live("click",function(){
                   if($(this).is(":checked")){
                       $(this).data("bmzg",1);
                       // $(this).parent().prev('.but_icon').removeClass('val_dialogTop');
                   }else{
                       $(this).data("bmzg",2);
                       // $(this).parent().prev('.but_icon').addClass('val_dialogTop');
                       /*console.log($(this).data('bmzg'));*/
                   }
               });
               /*所属上级*/
               $(".tanceng .zcj_ssup_xzspr_is_true").die().live("click",function(){
                   if($(this).is(":checked")){
                       $(this).data("uq",1);
                       //$(this).parent().prev().children('.zcj_bmzg_xzspr_is_true').attr('disabled',true).attr('checked',false);
                       //$(this).parent().prev().prev('.but_icon').removeClass('val_dialogTop');
                   }else{
                       $(this).data("uq",2);
                       //$(this).parent().prev().children('.zcj_bmzg_xzspr_is_true').attr('disabled',false);
                       //$(this).parent().prev().prev('.but_icon').addClass('val_dialogTop');
                   }
               });
               /*添加审批人确定btn*/
               $(".tanceng .zcj_xzspr_person_list_end_btn").die().live("click",function(){
                   if($(".tanceng .zcj_bmzg_xzspr_is_true").is("checked")){
                       var bm_zg= $(this).parent().prev().find('.zcj_bmzg_xzspr_is_true').data('bmzg');
                   }
                    if($(".tanceng .zcj_ssup_xzspr_is_true").is(":checked")){
                        var ss_up= $(this).parent().prev().find('.zcj_ssup_xzspr_is_true').data('uq');
                    }

                   var bm_name=$(this).parent().prev().find('.zcj_bmzg_xzspr_is_true').val();
                   var up_name=$(this).parent().prev().find('.zcj_ssup_xzspr_is_true').val();

                   var z_length=$(".tanceng .zcj_edit_show_data_list_ck").find('.zcj_add_qt_other_spr_tc').eq(inum).parent().prev('.zcj_select_spr_add_nr').find('.xt_sp_sprAdd').length;
                   var z_ry=$(".tanceng .zcj_edit_show_data_list_ck").find('.zcj_add_qt_other_spr_tc').eq(inum).parent().prev('.zcj_select_spr_add_nr').find('.zcj_xz_spr_name_show').length;
                   var bm_z=$(".tanceng .zcj_edit_show_data_list_ck").find('.zcj_add_qt_other_spr_tc').eq(inum).parent().prev('.zcj_select_spr_add_nr').find('.zcj_bmzg').length;
                   var zg_z=$(".tanceng .zcj_edit_show_data_list_ck").find('.zcj_add_qt_other_spr_tc').eq(inum).parent().prev('.zcj_select_spr_add_nr').find('.zcj_scsj').length;
                   if(bm_zg==1){
                       var xz_zg='<div class="xt_sp_sprAdd left zcj_bmzg" data-director="1"><span class="m_right_5">步骤<span class="zj_index_num">'+(z_ry+1)+'</span>：</span><span class="xt_sp_sprAddmsg">'+bm_name+'<i class="zcj_del_sp_name_sc"></i></span></div>'


                       if(bm_z>0){
                           alert("您已添加部门主管");
                       }else if(zg_z>0){
                           alert("您已添加所属上级,不用再添加主管");
                       }else if(z_length>=4){
                           alert("审批人不能多于4人");
                       }else{
                           $(".tanceng .zcj_edit_show_data_list_ck").find('.zcj_add_qt_other_spr_tc').eq(inum).parent().prev('.zcj_select_spr_add_nr').append(xz_zg);
                           //$(".tanceng .zcj_edit_show_data_list_ck").find('.zcj_add_qj_spr_tc').eq(idx).parent().prev('.zcj_select_spr_add_nr').find('.zcj_bmzg').data('director','1');
                       }

                   }
                   if(ss_up==1){
                       var xz_up='<div class="xt_sp_sprAdd left zcj_scsj" data-superior="1"><span class="m_right_5">步骤<span class="zj_index_num">'+(z_length+1)+'</span>：</span><span class="xt_sp_sprAddmsg">'+up_name+'<i class="zcj_del_sp_name_sc"></i></span></div>'


                       if(zg_z>0){
                           alert("您已添加所属上级");
                       }else if(z_length>=4){
                           alert("审批人不能多于4人");
                       }else{
                           $(".tanceng .zcj_edit_show_data_list_ck").find('.zcj_add_qt_other_spr_tc').eq(inum).parent().prev('.zcj_select_spr_add_nr').append(xz_up);
                           //$(".tanceng .zcj_edit_show_data_list_ck").find('.zcj_add_qj_spr_tc').eq(idx).parent().prev('.zcj_select_spr_add_nr').find('.zcj_scsj').data('superior','1');
                       }

                   }
                   $(_this).data('zgid',bm_zg);
                   $(_this).data('upid',ss_up);
                   $(this).next().click();
                   $(this).parents('.dialog_content_delete').find('.dialog_close').click();

               });
           });
           /*选择适用部门*/
           // var arr_id=[];
           // var cs_name=[];
           // $(".tanceng .zcj_xz_sybm_tc_dept_btn").die().live("click",function(){
           //
           //     $.ajax({
           //         type: 'get',
           //         url: SERVER_URL + "/dept/deptlist",
           //         data:{
           //             token:token
           //         },
           //         dataType: "json",
           //         success: function (data) {
           //             console.log('102');
           //             console.log(data);
           //             console.log('102');
           //             if(data.code==0){
           //                 var head='<li class="left_all"><span class="icon_open change_ba"></span><span class="icon_file"></span><span class="list_msg">所有分类(4)</span></li>'
           //                 /* $(".zcj_chao_sr_tree_list").html(head+tree_list_more_person(data.rows));*/
           //                 var deep=0;
           //                 $(".zcj_xz_bm_tree_dx_list").html(head+tree_list_choose_dept(data.rows, deep));
           //             }else{
           //                 alert(data.msg);
           //             }
           //
           //         },
           //         error:function(data){
           //             alert(data);
           //         }
           //     });
           //     //选择部门左侧选择
           //
           //     $(".tanceng .zcj_xz_bm_tree_dx_list .left_1").die().live("click",function(){
           //         /* debugger;*/
           //         var id=$(this).attr("deptid");
           //         var name=$(this).children(".list_msg").text();
           //         $(this).toggle(function(){
           //             $('.tanceng .zcj_shoose_right_list').append('<li rid="'+$(this).attr('deptid')+'"><span>'+$(this).children('.list_msg').text()+'</span><i class="list_choose_delete"></i></li>')
           //             $(this).find('span.list_check em').addClass('on');
           //             arr_id.unshift(id);
           //             cs_name.unshift(name)
           //             console.log(arr_id);
           //             console.log(cs_name);
           //
           //         },function(){
           //             $('.tanceng .zcj_shoose_right_list').find('li[rid='+$(this).attr('deptid')+']').remove()
           //             $(this).find('span.list_check em').removeClass('on');
           //             arr_id.splice(jQuery.inArray(id,arr_id),1);
           //             cs_name.splice(jQuery.inArray(id,cs_name),1);
           //             console.log(arr_id);
           //             console.log(cs_name);
           //
           //         })
           //         $(this).trigger('click')
           //
           //         /*部门确认按钮*/
           //         $(".tanceng .zcj_sybm_yxlist_end_btn").die().live("click",function(){
           //             var cs_per="";
           //             $.each($(".tanceng .zcj_shoose_right_list li"),function (i,v) {
           //
           //                 cs_per+='<li class="zcj_sybm_val" data-id="'+arr_id[i]+'">'+cs_name[i]+'<i class="zcj_del_sybm_name_d"></i></li>'
           //             });
           //
           //             $(".zcj_xz_sybm_tc_dept_btn").parent().before(cs_per);
           //             /*delbtn(this);*/
           //             $(".zcj_shoose_right_list").empty();
           //             $(this).parents('.dialog_content_addBox1').find('.dialog_close').click();
           //         });
           //     });
           //
           //     /*删除选择的部门*/
           //     $(".tanceng .zcj_shoose_right_list .list_choose_delete").die().live("click",function(){
           //         var cs_id=$(this).parent().attr("rid");
           //         var name=$(this).prev().text();
           //
           //         $(this).parent().remove();
           //         arr_id.splice(jQuery.inArray(cs_id,arr_id),1);
           //         cs_name.splice(jQuery.inArray(name,cs_name),1);
           //         console.log(arr_id);
           //         console.log(cs_name);
           //     });
           //
           //     /*部门取消按钮*/
           //     $(".zcj_bmqx_canael_btn").live("click",function(){
           //         arr_id.length = 0;
           //         cs_name.length = 0;
           //         $(".zcj_shoose_right_list").empty();
           //     });
           //     /*直接关闭*/
           //     $(".zj_bmgb_close_bt").live("click",function(){
           //         arr_id.length = 0;
           //         cs_name.length = 0;
           //         $(".zcj_shoose_right_list").empty();
           //         /*console.log(cs_name);
           //          console.log(arr_id);*/
           //     });
           //     /*删除添加后的抄送人*/
           //     /*$(".zcj_csr_info_content_icon .del_img_1").die().live("click",function(){
           //         var dq_id= $(this).parent().attr("arrid");
           //         var dq_name=$(this).parent().children(".box_adderName").text();
           //         $(this).parent().remove();
           //         arr_id.splice($.inArray(dq_id,arr_id),1);
           //         cs_name.splice($.inArray(dq_name,cs_name),1);
           //         console.log(cs_name);
           //         console.log(arr_id);
           //     });*/
           // });

           /**************抄送人弹框按钮********************/
//             var  csrarr_id=[];/*抄送人id*/
//             var csrarr_name=[];/*抄送人名字*/
//             $(".tanceng .zcj_xzcsr_tc_btn").die().live("click",function(){
//                 $.ajax({
//                     type: 'get',
//                     url: SERVER_URL + "/dept/deptlist",
//                     data:{
//                         token:token
//                     },
//                     dataType: "json",
//                     success: function (data) {
//                         console.log(data);
//                         if(data.code==0){
//                             var head='<li class="left_all"><span class="icon_open change_ba"></span><span class="icon_file"></span><span class="list_msg">所有分类(4)</span></li>'
//                             /* $(".zcj_chao_sr_tree_list").html(head+tree_list_more_person(data.rows));*/
//                             var deep=0;
//                             $(".zcj_dx_csr_tc_tree_list_show").html(head+tree_list_choose_dept_person(data.rows, deep));
//                         }else{
//                             alert(data.msg);
//                         }
//
//                     },
//                     error:function(data){
//                         alert(data);
//                     }
//                 });
//                 /*选择的抄送人*/
//
// //选择部门左侧选择
//
//                 $(".tanceng .zcj_dx_csr_tc_tree_list_show .person_left_nav").die().live("click",function(){
//                     /* debugger;*/
//                     var id=$(this).attr("userinfoid");
//                     var name=$(this).children(".list_msg").text();
//                     $(this).toggle(function(){
//                         $('.tanceng .zcj_shoose_right_csr_list').append('<li rid="'+$(this).attr('userinfoid')+'"><span>'+$(this).children('.list_msg').text()+'</span><i class="list_choose_delete"></i></li>')
//                         $(this).find('span.list_check em').addClass('on')
//                         csrarr_id.unshift(id);
//                         csrarr_name.unshift(name)
//                         console.log(csrarr_id);
//                         console.log(csrarr_name);
//
//                     },function(){
//                         $('.tanceng .zcj_shoose_right_csr_list').find('li[rid='+$(this).attr('userinfoid')+']').remove()
//                         $(this).find('span.list_check em').removeClass('on')
//                         csrarr_id.splice(jQuery.inArray(id,csrarr_id),1);
//                         csrarr_name.splice(jQuery.inArray(id,csrarr_name),1);
//                         console.log(csrarr_id);
//                         console.log(csrarr_name);
//
//                     })
//                     $(this).trigger('click')
//
//                     /*抄送人确认按钮*/
//                     $(".tanceng .zcj_select_bmcsr_list_end_btn").die().live("click",function(){
//                         var cs_per="";
//                         $.each($(".tanceng .zcj_shoose_right_csr_list li"),function (i,v) {
//                             cs_per+='<li data-id="'+csrarr_id[i]+'" class="zcj_csr_val"><i class="del_img_1">-</i><em class="icon_personBtn icon_personBtn_msg"><i class="icon_personNext"></i></em> <em class="icon_adderBtn"></em> <p class="box_adderName">'+csrarr_name[i]+'</p></li>'
//                         });
//                         $(".tanceng .zcj_xzcsr_tc_btn").parent().before(cs_per);
//                        /* delbtn(this);*/
//                         $(".zcj_shoose_right_csr_list").empty();
//                         $(this).parents('.dialog_content_addBox1').find('.dialog_close').click();
//                     });
//                 });
//
//                 /*删除选择的抄送人*/
//                 $(".tanceng .zcj_shoose_right_csr_list .list_choose_delete").die().live("click",function(){
//                     var cs_id=$(this).parent().attr("rid");
//                     var name=$(this).prev().text();
//
//                     $(this).parent().remove();
//                     csrarr_id.splice(jQuery.inArray(cs_id,csrarr_id),1);
//                     csrarr_name.splice(jQuery.inArray(name,csrarr_name),1);
//                     // console.log(arr_id);
//                     // console.log(csrarr_name);
//                 });
//
//                 /*抄送人取消按钮*/
//                 $(".zcj_qx_canael_btn").live("click",function(){
//                     csrarr_id.length = 0;
//                     csrarr_name.length = 0;
//                     $(".zcj_shoose_right_list").empty();
//                 });
//                 /*直接关闭*/
//                 $(".zj_gb_close_bt").live("click",function(){
//                     csrarr_id.length = 0;
//                     csrarr_name.length = 0;
//                     $(".zcj_shoose_right_list").empty();
//                     /*console.log(cs_name);
//                      console.log(arr_id);*/
//                 });
//                 /*删除添加后的抄送人*/
//                 $(".zcj_csr_info_content_icon .del_img_1").die().live("click",function(){
//                     var dq_id= $(this).parent().attr("arrid");
//                     var dq_name=$(this).parent().children(".box_adderName").text();
//                     $(this).parent().remove();
//                     csrarr_id.splice($.inArray(dq_id,csrarr_id),1);
//                     csrarr_name.splice($.inArray(dq_name,csrarr_name),1);
//                     console.log(csrarr_name);
//                     console.log(csrarr_id);
//                 });
//             });
           /*是否开启跨级*/
           //var is_open;
           setTimeout(function() {
               var is_open = $(".tanceng .zcj_sp_other_info_show .zcj_qj_list_show_xq_data").eq(0).data('is_across');
               console.log('456');
               console.log(is_open);
               console.log('456');
               if(is_open==1){
                   $('.tanceng .zcj_is_open_other_sp').children("i").css("right",0);
                   $('.tanceng .zcj_is_open_other_sp').css("background","#3bafda")
                   $('.tanceng .zcj_is_open_other_sp').data('id',1);
               }else{
                   $('.tanceng .zcj_is_open_other_sp').children("i").css("right","10px");
                   $('.tanceng .zcj_is_open_other_sp').css("background","#e6e6e6");
                   $('.tanceng .zcj_is_open_other_sp').data('id',2);
               }

           },200);
           /*需要工作交接人*/
           // $(".tanceng .zcj_qj_list_show_xq_data .zcj_xy_work_is_val").die().live("click",function(){
           //     if($(this).is(":checked")){
           //         $(this).data('id',1)
           //     }else{
           //         $(this).data('id',2)
           //     }
           //
           // });
           /*开启自动通过*/
           // $(".tanceng .zcj_qj_list_show_xq_data .zcj_xy_autotg_is_val").die().live("click",function(){
           //     if($(this).is(":checked")){
           //         $(this).data('id',1)
           //     }else{
           //         $(this).data('id',2)
           //     }
           //
           // });

           /************************编辑其他确认btn***********************/
           $(".tanceng .zcj_add_sp_tj_end_btn").die().live("click",function(){

               var me=this;
               var sybm=[];
               $(".tanceng .zcj_sybm_list_data_zs .zcj_sybm_val").each(function(){

                   sybm.push($(this).data('id'));


               })
               /*抄送人数据*/
               // var csrid=[];
               // $(".tanceng .box_adderCon2 .zcj_csr_val").each(function(){
               //
               //     csrid.push($(this).data('id'));
               //
               //
               // })


               var other_info=[]

               $(".tanceng .zcj_edit_show_data_list_ck .zcj_qj_list_show_xq_data").each(function (i,v) {
                   var sp_r=[]
                   $(".tanceng .zcj_qj_list_show_xq_data .zcj_select_spr_add_nr").eq(i).find('.zcj_xz_spr_name_show').each(function () {
                       sp_r.push($(this).data('id'))
                   })
                   other_info.push({
                       'begin_value':'',
                       'end_value':'',
                       'is_need':$(".tanceng .zcj_xy_work_is_val").eq(i).data('id'),
                       'checker':sp_r.toString(),
                       'is_auto':2,
                       'director':$(".tanceng .zcj_select_spr_add_nr .zcj_bmzg").eq(i).data('director'),
                       'superior':$(".tanceng .zcj_select_spr_add_nr .zcj_scsj").eq(i).data('superior'),
                       'id': $(".tanceng .zcj_qj_list_show_xq_data").eq(i).data('id')
                   });
               })

               var spr_show=JSON.stringify(other_info)
               var is_open=$('.tanceng .zcj_is_kq_kjsp_btn').data('id')
               console.log('100000000000000000000003');
               console.log(sybm);

               console.log(spr_show);
               console.log('100000000000000000000003');
               $.ajax({
                   type: 'post',
                   url: SERVER_URL + "/system-work/add",
                   data:{
                       token:token,
                       category:16,
                       dept:0,
                       is_across:is_open,
                       cc:0,
                       info:spr_show
                   },
                   dataType: "json",
                   success: function (data) {
                       console.log("333");
                       console.log(data);
                       console.log("333");
                       if(data.code==0){

                           $("#zcj_kq_list_content").click();
                           $(me).parents('.dialog_content_3').find('.dialog_close').click();
                       }else{
                           alert(data.msg);
                       }

                   },
                   error:function(data){
                       alert("刷新失败");
                   }
               });
           });

       });
    });


/****************************销售****************************/


function sell_list_fn() {
    $.ajax({
        type: "get",
        url: SERVER_URL + "/system-sale/list",
        data: {token:token},
        dataType: 'json',
        success: function (data) {
            console.log('000');
            console.log(data);
            console.log('000');
            var html=''
             $.each(data['dataList'],function(index,sell_list){
                 html+='<div class="system_work_mbdh"><div class="crk_rkgl_addRKD">';
                 html+='<div class="box_open_head relative">';
                 if(index==1){
                     html+='<span class="systerm_sp_title">销售报价单</span><button class="but_mix but_blue val_dialog zcj_sell_xsbjd_edit_btn" data-category="1" name="xt_sp_newbjd">编辑</button>';
                     html+='<span class="box_open_btn c_9" style="right:20px;">收起 <i class="right icon_hide"></i></span>';
                 }else if(index==2){
                     html+='<span class="systerm_sp_title">销售退换货</span><button class="but_mix but_blue val_dialog zcj_sell_xsbjd_edit_btn" data-category="2" name="xt_sp_newbjd">编辑</button>';
                     html+='<span class="box_open_btn c_9" style="right:20px;">收起 <i class="right icon_hide"></i></span>';
                 }
                 html+='</div>';
                 html+='<div class="systerm_sp_con"><div class="div_1 container"><div class="div_1 table-container">';
                 html+='<table class="systerm_sp_con_table">';
                 html+='<thead>';
                 html+='<tr> <th style="width:11%;">条件名称</th> <th style="width:89%;">审批条件</th></tr>';
                 html+='</thead>';
                 html+='<tbody>';

                 $.each(sell_list,function(index,sell_con){
                     html+='<tr>';
                     if(sell_con['category']==1){
                         html+='<td>销售报价单</td>';
                     }else{
                         html+='<td>销售退换货</td>';
                     }

                     if(sell_con['checkerName']!=''){
                         var spbz=[];
                         var cs_name=[];
                         var step=sell_con['checker'];
                         var csname=sell_con['checkerName'];
                         if(step!=null && step.length>0){
                             spbz.push(step.split(','));
                         }
                         /*  if(content['director']==1){
                          spbz.push('1')
                          cs_name.push("部门主管")
                          }*/
                         // console.log('10001');
                         // console.log(csname);
                         // console.log(step);
                         // console.log("10001");
                         if(csname!=null){
                             cs_name.push(csname.split(','));
                         }

                         sell_con['checkerName']=cs_name;
                         if(spbz.length>0){
                             var bz;
                             $.each(sell_con['checkerName'],function(v,bzlist){
                                 bz='';
                                 $.each(bzlist,function(i){

                                     bz+='<span data-id="'+spbz[v][i]+'">步骤'+(i+1)+'：<em>'+bzlist[i]+'<i></i></em></span>'

                                 })
                             })
                         }

                     }
                     html+='<td>';
                     html+='<div class="inline_block xt_sp_stepCon c_9">';

                     // console.log('10001');
                     // console.log(csname);
                     // console.log('10001');
                     if(sell_con['checkerName']!='') {
                         html+=bz;
                         if (sell_con['director'] == 1 && sell_con['superior'] == 1) {
                             html += '<span data-id="1">步骤' + (parseInt(cs_name[0].length) + 1) + '：<em>部门主管<i></i></em></span><span data-id="1">步骤' + (parseInt(cs_name[0].length) + 2) + '：<em>所属上级<i></i></em></span>'
                             /*cs_name.push("部门主管")*/
                         } else if (sell_con['director'] == 1) {
                             html += '<span data-id="1">步骤' + (parseInt(cs_name[0].length) + 1) + '：<em>部门主管<i></i></em></span>'
                         } else if (sell_con['superior'] == 1) {
                             html += '<span data-id="1">步骤' + (parseInt(cs_name[0].length) + 1) + '：<em>所属上级<i></i></em></span>'
                         }


                     }else{
                         html+='';
                         if (sell_con['director'] == 1 && sell_con['superior'] == 1) {
                             html += '<span data-id="1">步骤1：<em>部门主管<i></i></em></span><span data-id="1">步骤2：<em>所属上级<i></i></em></span>'
                             /*cs_name.push("部门主管")*/
                         } else if (sell_con['director'] == 1) {
                             html += '<span data-id="1">步骤1：<em>部门主管<i></i></em></span>'
                         } else if (sell_con['superior'] == 1) {
                             html += '<span data-id="1">步骤2：<em>所属上级<i></i></em></span>'
                         }

                     }
                     html += '</div>';
                     html += '</td>';
                     // if(sell_con['type_id']==1){
                     //     html+='<td>'+sell_con['checkerName']+'</td>';
                     // }else if(sell_con['type_id']==2){
                     //     html+='<td>'+sell_con['checkerName']+'</td>';
                     // }else if(sell_con['type_id']==3){
                     //     html+='<td>'+sell_con['checkerName']+'</td>';
                     // }else if(sell_con['type_id']==4){
                     //     html+='<td>'+sell_con['checkerName']+'</td>';
                     // }else if(sell_con['type_id']==5){
                     //     html+='<td>'+sell_con['checkerName']+'</td>';
                     // }else{
                     //     html+='<td>-</td>';
                     // }
                     // html+='<td>'+likNullData(sell_con['deptName'])+'</td>';
                     html+='</tr>';
                 })
                 html+='</tbody>';
                 html+='</table>';
                 html+='</div></div></div></div></div>';
             })
            $(".zcj_sell_content_list_show").html(html);
        },
        error:function(data){

        }
    })
}
/*销售*/
$("#zcj_sell_list_left_bar").die().live("click",function(){
    sell_list_fn();
    /*编辑列表数据方法*/
    function edit_sell_data_fn(fl_id){
        $.ajax({
            type: "get",
            url: SERVER_URL + "/system-sale/list",
            data: {
                token: token,
                category:fl_id
            },
            dataType: 'json',
            success: function (data) {
                console.log('999000999');
                console.log(data);
                console.log('999000999');

                sell_list_show_fn(data['dataList'],".zcj_sell_price_list_display");
                var bmname=[];
                var bmid=[];
                // setTimeout(function () {
                //     var bm_id=$(".tanceng .zcj_show_dept_id_name").eq(0).data('dept');
                //     var bm_name=$(".tanceng .zcj_show_dept_id_name").eq(0).data('deptname');
                //     /* var cc_id=$(".tanceng .zcj_show_dept_id_name").eq(0).data('cc');
                //      var cc_name=$(".tanceng .zcj_show_dept_id_name").eq(0).data('ccname');*/
                //     /*部门*/
                //
                //
                //     /* var bm_name=v['deptName'];*/
                //     console.log('1000033');
                //     console.log(bm_id);
                //     console.log(bm_name);
                //     console.log('100333');
                //     if(bm_name!=null){
                //         bmname.push(bm_name.split('、'));
                //     }
                //     var bd=bm_id.toString();
                //     bmid.push(bd.split(','));
                //
                //     /* bmid.push(bm_id.split(',')); */
                //     var bm_list;
                //     $.each(bmname,function(i,bmlist){
                //         bm_list=''
                //         $.each(bmlist,function(j){
                //             bm_list+='<li class="zcj_sybm_val" data-id="'+bmid[i][j]+'">'+bmlist[j]+'<i class="zcj_del_sybm_name_d"></i></li>';
                //         })
                //     })
                //     $(".zcj_selest_list_display_bm_name .zcj_sybm_val").remove();
                //     $(".zcj_selest_bm_list_show_xs_btn").parent().before(bm_list);
                // },200)



            },
            error:function(){
                alert("更新失败");
            }
        })
    }
    /*销售列表展示*/
    function sell_list_show_fn(datalist,vclass){
        var html='';
        $.each(datalist,function(index,sell_list){
            if(sell_list['type_id']==1){
                html+='<div class="left c_3 zcj_sell_type_lx_id" data-type_id="1">零售价</div>';
            }else if(sell_list['type_id']==2){
                html+='<div class="left c_3 zcj_sell_type_lx_id" data-type_id="2">最低价</div>';
            }else if(sell_list['type_id']==3){
                html+='<div class="left c_3 zcj_sell_type_lx_id" data-type_id="3">成本价</div>';
            }else if(sell_list['type_id']==4){
                html+='<div class="left c_3 zcj_sell_type_lx_id" data-type_id="4">其他价格</div>';
            }else if(sell_list['type_id']==5){
                html+='<div class="left c_3 zcj_sell_type_lx_id" data-type_id="5">超出信用额</div>';
            }
            html+='<div class="sys_sp_spfw relative zcj_show_dept_id_name" data-id="'+(sell_list['id']==undefined ? '' : sell_list['id'])+'" data-is_across="'+(sell_list['is_across']==undefined ? '' : sell_list['is_across'])+'" data-dept="'+(sell_list['dept']==undefined ? '' : sell_list['dept'])+'" data-deptname="'+(sell_list['deptName']==undefined ? '' : sell_list['deptName'])+'">';
            html+='<p class="c_3">审批人</p>';

            html+='<div class="c_9 clearfix zcj_sell_spbm_ry_show" data-xs_id="'+(sell_list['checker']==undefined ? '' : sell_list['checker'])+'">';

            var sp_r=$(".tanceng .zcj_sell_spbm_ry_show .zcj_sell_spr").length;
            var bm_r=$(".tanceng .zcj_sell_spbm_ry_show .zcj_sell_bmzg").length;
            var z_l=$(".tanceng .zcj_sell_spbm_ry_show .xt_sp_sprAdd").length;
            var ry_length;

            if(sell_list['checkerName']){
                var spid=[];
                var spname=[];
                var spr_id=sell_list['checker']
                /*spid.push(spr_id);*/
                var spr_name=sell_list['checkerName'];
                /* spname.push(spr_name);*/

                if(spr_name!='' && spr_name!=undefined){
                    spname.push(spr_name.split(','));
                }
                if(spr_id!='' && spr_id!=undefined){
                    spid.push(spr_id.split(','));
                }
                ry_length=spname.length
                // console.log(spid);
                // console.log('100');
                // console.log(spname.length);
                // console.log('100');
                var sp_list;
                $.each(spname,function(v,cclist){
                    sp_list=''
                    $.each(cclist,function(k){
                        /* if(ccid[v][k]==null){
                         delete (data['id'])
                         }*/
                        sp_list+='<div class="xt_sp_sprAdd left zcj_sell_spr" data-spid="'+spid[v][k]+'"><span class="m_right_5">步骤<span class="zj_index_num">'+(k+1)+'</span>：</span><span class="xt_sp_sprAddmsg">'+cclist[k]+'<i class="zcj_del_sp_name_sc"></i></span></div>';
                    })
                })
                html+=sp_list;
            }
            //console.log(ry_length);
            if(sell_list['checkerName']!='') {

                if (sell_list['director'] == 1 && sell_list['superior'] == 1) {

                    html += '<div class="xt_sp_sprAdd left zcj_sell_bmzg" data-director="' + sell_list['director'] + '"><span class="m_right_5">步骤<span class="zj_index_num">' + (parseInt(spname[0].length) + 1) + '</span>：</span><span class="xt_sp_sprAddmsg">部门主管<i class="zcj_del_sp_name_sc"></i></span></div>';
                    html += '<div class="xt_sp_sprAdd left zcj_sell_sxup" data-superior="' + sell_list['superior'] + '"><span class="m_right_5">步骤<span class="zj_index_num">' + (parseInt(spname[0].length) + 2) + '</span>：</span><span class="xt_sp_sprAddmsg">所属上级<i class="zcj_del_sp_name_sc"></i></span></div>';
                } else if (sell_list['director'] == 1) {

                    html += '<div class="xt_sp_sprAdd left zcj_sell_bmzg" data-director="' + sell_list['director'] + '"><span class="m_right_5">步骤<span class="zj_index_num">' + (parseInt(spname[0].length) + 1) + '</span>：</span><span class="xt_sp_sprAddmsg">部门主管<i class="zcj_del_sp_name_sc"></i></span></div>';
                } else if (sell_list['superior'] == 1) {
                    html += '<div class="xt_sp_sprAdd left zcj_sell_sxup" data-superior="' + sell_list['superior'] + '"><span class="m_right_5">步骤<span class="zj_index_num">' + (parseInt(spname[0].length) + 1) + '</span>：</span><span class="xt_sp_sprAddmsg">所属上级<i class="zcj_del_sp_name_sc"></i></span></div>';
                }
            }else{
                if (sell_list['director'] == 1 && sell_list['superior'] == 1) {

                    html += '<div class="xt_sp_sprAdd left zcj_sell_bmzg" data-director="' + sell_list['director'] + '"><span class="m_right_5">步骤<span class="zj_index_num">1</span>：</span><span class="xt_sp_sprAddmsg">部门主管<i class="zcj_del_sp_name_sc"></i></span></div>';
                    html += '<div class="xt_sp_sprAdd left zcj_sell_sxup" data-superior="' + sell_list['superior'] + '"><span class="m_right_5">步骤<span class="zj_index_num">2</span>：</span><span class="xt_sp_sprAddmsg">所属上级<i class="zcj_del_sp_name_sc"></i></span></div>';
                } else if (sell_list['director'] == 1) {

                    html += '<div class="xt_sp_sprAdd left zcj_sell_bmzg" data-director="' + sell_list['director'] + '"><span class="m_right_5">步骤<span class="zj_index_num">1</span>：</span><span class="xt_sp_sprAddmsg">部门主管<i class="zcj_del_sp_name_sc"></i></span></div>';
                } else if (sell_list['superior'] == 1) {
                    html += '<div class="xt_sp_sprAdd left zcj_sell_sxup" data-superior="' + sell_list['superior'] + '"><span class="m_right_5">步骤<span class="zj_index_num">1</span>：</span><span class="xt_sp_sprAddmsg">所属上级<i class="zcj_del_sp_name_sc"></i></span></div>';
                }
            }
            html+='</div><div class="xt_sp_sprAdd left">';
            html+='<span class="m_right_5">步骤：</span><button class="but_icon sys_sp_addsprBtn val_dialogTop zcj_add_spbm_spr_btn" data-index="'+index+'" name="xt_sp_xzspr"><i></i>添加</button>';
            html+='</div>';
            if(index==0){

                if(sell_list['is_auto']==1){
                    html+='<label class="sys_sp_spfwOpen zcj_kq_auto_tg_gn"><input type="checkbox" checked="true" data-id="1" value=""/>开启自动通过</label>';
                }else{
                    html+='<label class="sys_sp_spfwOpen zcj_kq_auto_tg_gn"><input type="checkbox" data-id="2" value=""/>开启自动通过</label>';
                }
            }


            html+='</div>';

        })

        $(vclass).html(html);
    }
    /*销售报价单编辑*/
    $(".zcj_sell_xsbjd_edit_btn").die().live("click",function(){
            var category=$(this).data('category');
            edit_sell_data_fn(category);
        /*删除id*/
        // var ed_id;
        // $(".tanceng .zcj_del_sp_name_sc").die().live("click",function(){
        //     var str_id=$(this).parents('.zcj_sell_spbm_ry_show').data('xs_id');
        //
        //      ed_id=str_id.split(',')
        //     console.log(ed_id);
        //     var sid=$(this).parents('.zcj_sell_spr').data('spid');
        //    /* $(this).parents('.zcj_sell_spbm_ry_show').find('.zcj_sell_spr').each(function(){
        //         xs.push($(this).data('spid'));
        //
        //     })*/
        //     console.log(ed_id);
        //     ed_id.splice(jQuery.inArray(sid,ed_id),1);
        //
        //     console.log(ed_id);
        //     $(this).parents('.zcj_sell_spr').remove();
        //
        //
        //      $(this).parents('.zcj_sell_spbm_ry_show').data('xs_id',ed_id.toString())
        //
        // })
            /*add添加审批人*/
            $(".tanceng .zcj_add_spbm_spr_btn").die().live("click",function(){

                    var idx=$(this).data('index')
                   //alert(idx);
                    /*$(".zcj_xzspr_person_list_end_btn").data('index',idx)*/
                    var _this=this;
                    $.ajax({
                        type: 'get',
                        url: SERVER_URL + "/dept/deptlist",
                        data:{
                            token:token

                        },
                        dataType: "json",
                        success: function (data) {
                            if(data.code==0){
                                var head='<li class="left_all"><span class="icon_open change_ba"></span><span class="icon_file"></span><span class="list_msg">所有分类</span></li>'
                                var deep=0;
                                $(".zcj_xz_spr_tc_tree_list").html(head+tree_list_bmfzr(data,deep));
                            }else{
                                alert(data.msg);
                            }

                        },
                        error:function(data){
                            alert(data);
                        }
                    });
                    /*获取name*/
                    $(".zcj_xz_spr_tc_tree_list .person_left_nav").die().live("click",function(){

                        var iv=$(this).children(".list_msg").html();
                        /* alert(iv);*/
                        /*确定选择负责人*/
                        $(".tanceng .zcj_select_spr_person_end_btn").die().live("click",function(){
                            /*var name=$(".zcj_show_man").val(iv);*/
                            var id=$(".zcj_xz_spr_tc_tree_list .person_left_nav.on").attr("aid");

                            var sp_length=$(".tanceng .zcj_show_dept_id_name").find('.zcj_add_spbm_spr_btn').eq(idx).parent().prev().find('.zcj_sell_spr').length;
                            var z_length=$(".tanceng .zcj_show_dept_id_name").find('.zcj_add_spbm_spr_btn').eq(idx).parent().prev().find('.xt_sp_sprAdd ').length;
                            var bm_zg=$(".tanceng .zcj_show_dept_id_name").find('.zcj_add_spbm_spr_btn').eq(idx).parent().prev().find('.zcj_sell_bmzg').length;
                            var ss_sj=$(".tanceng .zcj_show_dept_id_name").find('.zcj_add_spbm_spr_btn').eq(idx).parent().prev().find('.zcj_sell_sxup').length;

                            var xz_spr='<div class="xt_sp_sprAdd left zcj_sell_spr" data-spid="'+id+'"><span class="m_right_5">步骤<span class="zj_index_num">'+(sp_length+1)+'</span>：</span><span class="xt_sp_sprAddmsg">'+iv+'<i class="zcj_del_sp_name_sc"></i></span></div>'
                            var x_if=[];

                            $(".tanceng .zcj_show_dept_id_name").find('.zcj_add_spbm_spr_btn').eq(idx).parent().prev().find('.zcj_sell_spr').each(function(){
                                var sp_id=$(this).data('spid')
                                if(sp_id==id){
                                    x_if.push(sp_id)
                                    alert('审批人不可以重复');
                                    return false;
                                }
                            });
                            if(x_if.length>0){
                                return false;
                            }else if(sp_length>=4 || z_length>=4){
                                alert('审批人不可以超过4个');
                                return false;
                            }else if(bm_zg>0){
                                alert('你已选部门主管，不可再选员工');
                                return false;
                            }else if(ss_sj>0){
                                alert('你已选所属上级，不可再选其他员工');
                                return false;
                            }else {
                                //$(".tanceng .zcj_sell_spbm_ry_show").eq(idx).find('.zcj_sell_spr').remove();
                                $(".tanceng .zcj_show_dept_id_name").find('.zcj_sell_spbm_ry_show').eq(idx).append(xz_spr);
                            }

                            var xsp_str=[]
                            $(".tanceng .zcj_show_dept_id_name .zcj_sell_spbm_ry_show").eq(idx).find('.zcj_sell_spr').each(function(){
                                xsp_str.push($(this).data('spid'));
                            })
                            $(".tanceng .zcj_show_dept_id_name").find('.zcj_sell_spbm_ry_show').eq(idx).data('xs_id',xsp_str.toString())

                            $(this).next().click();
                            $(".tanceng .dialog_content_delete").find(".dialog_close").click();

                        });
                        /*取消选择负责人*/

                    });
                    /*部门主管*/
                    $(".tanceng .zcj_bmzg_xzspr_is_true").die().live("click",function(){
                        if($(this).is(":checked")){
                            $(this).data("bmzg",1);
                            // $(this).parent().prev('.but_icon').removeClass('val_dialogTop');
                        }else{
                            $(this).data("bmzg",2);
                            /*console.log($(this).data('bmzg'));*/
                            // $(this).parent().prev('.but_icon').addClass('val_dialogTop');
                        }
                    });

                    /*所属上级*/
                    $(".tanceng .zcj_ssup_xzspr_is_true").die().live("click",function(){
                        if($(this).is(":checked")){
                            $(this).data("uq",1);
                            // $(this).parent().prev().children('.zcj_bmzg_xzspr_is_true').attr('disabled',true).attr('checked',false);
                            // $(this).parent().prev().prev('.but_icon').removeClass('val_dialogTop');

                        }else{
                            $(this).data("uq",2);
                            // $(this).parent().prev().children('.zcj_bmzg_xzspr_is_true').attr('disabled',false)
                            // $(this).parent().prev().prev('.but_icon').addClass('val_dialogTop');
                        }
                    });
                    /*添加审批人确定btn*/
                    $(".tanceng .zcj_xzspr_person_list_end_btn").die().live("click",function(){
                        if($(".tanceng .zcj_bmzg_xzspr_is_true").is(":checked")){
                            var bm_zg= $(this).parent().prev().find('.zcj_bmzg_xzspr_is_true').data('bmzg');
                        }
                         if($(".tanceng .zcj_ssup_xzspr_is_true").is(":checked")){
                             var ss_up= $(this).parent().prev().find('.zcj_ssup_xzspr_is_true').data('uq');
                         }

                        var bm_name=$(this).parent().prev().find('.zcj_bmzg_xzspr_is_true').val();
                        var up_name=$(this).parent().prev().find('.zcj_ssup_xzspr_is_true').val();

                        var sp_length=$(".tanceng .zcj_show_dept_id_name").find('.zcj_add_spbm_spr_btn').eq(idx).parent().prev().find('.zcj_sell_spr').length;
                        var z_length=$(".tanceng .zcj_show_dept_id_name").find('.zcj_add_spbm_spr_btn').eq(idx).parent().prev().find('.xt_sp_sprAdd ').length;
                        var xbm_zg=$(".tanceng .zcj_show_dept_id_name").find('.zcj_add_spbm_spr_btn').eq(idx).parent().prev().find('.zcj_sell_bmzg').length;
                        var xss_sj=$(".tanceng .zcj_show_dept_id_name").find('.zcj_add_spbm_spr_btn').eq(idx).parent().prev().find('.zcj_sell_sxup').length;
                        if(bm_zg==1){
                            var xz_zg='<div class="xt_sp_sprAdd left zcj_sell_bmzg" data-director="1"><span class="m_right_5">步骤<span class="zj_index_num">'+(sp_length+1)+'</span>：</span><span class="xt_sp_sprAddmsg">'+bm_name+'<i class="zcj_del_sp_name_sc"></i></span></div>'
                            // $(".tanceng .zcj_sell_spbm_ry_show").eq(idx).find('.zcj_sell_bmzg').data('director','1');
                            // $(".tanceng .zcj_sell_spbm_ry_show").eq(idx).find('.zcj_sell_bmzg').empty();
                            if(xbm_zg>0){
                                alert("您已添加部门主管");
                            }else if(xss_sj>0){
                                alert("您已添加所属上级,不用再添加主管");
                            }else if(z_length>=4){
                                alert("审批人不能多于4人");
                            }else {
                                $(".tanceng .zcj_show_dept_id_name").eq(idx).find('.zcj_sell_spbm_ry_show').append(xz_zg);
                            }
                        }
                        if(ss_up==1){
                            var xz_up='<div class="xt_sp_sprAdd left zcj_sell_sxup" data-superior="1"><span class="m_right_5">步骤<span class="zj_index_num">'+(z_length+1)+'</span>：</span><span class="xt_sp_sprAddmsg">'+up_name+'<i class="zcj_del_sp_name_sc"></i></span></div>'
                            // $(".tanceng .zcj_sell_spbm_ry_show").eq(idx).find('.zcj_sell_sxup').data('superior','1');
                            // $(".tanceng .zcj_sell_spbm_ry_show").eq(idx).find('.zcj_sell_sxup').empty();
                            if(xss_sj>0){
                                alert("您已添加所属上级");
                            }else if(z_length>=4){
                                alert("审批人不能多于4人");
                            }else {
                                $(".tanceng .zcj_show_dept_id_name").eq(idx).find('.zcj_sell_spbm_ry_show').append(xz_up);
                            }
                        }
                        $(_this).data('zgid',bm_zg);
                        $(_this).data('upid',ss_up);
                        $(this).next().click();
                        $(this).parents('.dialog_content_delete').find('.dialog_close').click();
                      /*  console.log($(_this).data('zgid',bm_zg));
                        console.log($(_this).data('upid',ss_up));
                        console.log(bm_zg);
                        console.log(ss_up);*/
                    });

            });
            /*add添加适用部门*/
            // var arr_id=[];
            // var cs_name=[];
            // $(".tanceng .zcj_selest_bm_list_show_xs_btn").die().live("click",function(){
            //     /*选择适用部门*/
            //
            //         $.ajax({
            //             type: 'get',
            //             url: SERVER_URL + "/dept/deptlist",
            //             data:{
            //                 token:token
            //             },
            //             dataType: "json",
            //             success: function (data) {
            //                 console.log('102');
            //                 console.log(data);
            //                 console.log('102');
            //                 if(data.code==0){
            //                     var head='<li class="left_all"><span class="icon_open change_ba"></span><span class="icon_file"></span><span class="list_msg">所有分类(4)</span></li>'
            //                     /* $(".zcj_chao_sr_tree_list").html(head+tree_list_more_person(data.rows));*/
            //                     var deep=0;
            //                     $(".zcj_xz_bm_tree_dx_list").html(head+tree_list_choose_dept(data.rows, deep));
            //                 }else{
            //                     alert(data.msg);
            //                 }
            //
            //             },
            //             error:function(data){
            //                 alert(data);
            //             }
            //         });
            //         //选择部门左侧选择
            //
            //         $(".tanceng .zcj_xz_bm_tree_dx_list .left_1").die().live("click",function(){
            //             /* debugger;*/
            //             var id=$(this).attr("deptid");
            //             var name=$(this).children(".list_msg").text();
            //             $(this).toggle(function(){
            //                 $('.tanceng .zcj_shoose_right_list').append('<li rid="'+$(this).attr('deptid')+'"><span>'+$(this).children('.list_msg').text()+'</span><i class="list_choose_delete"></i></li>')
            //                 $(this).find('span.list_check em').addClass('on');
            //                 arr_id.unshift(id);
            //                 cs_name.unshift(name)
            //                 console.log(arr_id);
            //                 console.log(cs_name);
            //
            //             },function(){
            //                 $('.tanceng .zcj_shoose_right_list').find('li[rid='+$(this).attr('deptid')+']').remove()
            //                 $(this).find('span.list_check em').removeClass('on');
            //                 arr_id.splice(jQuery.inArray(id,arr_id),1);
            //                 cs_name.splice(jQuery.inArray(id,cs_name),1);
            //                 console.log(arr_id);
            //                 console.log(cs_name);
            //
            //             })
            //             $(this).trigger('click')
            //
            //             /*部门确认按钮*/
            //             $(".tanceng .zcj_sybm_yxlist_end_btn").die().live("click",function(){
            //                 var cs_per="";
            //                 $.each($(".tanceng .zcj_shoose_right_list li"),function (i,v) {
            //
            //                     cs_per+='<li class="zcj_sybm_val" data-id="'+arr_id[i]+'">'+cs_name[i]+'<i class="zcj_del_sybm_name_d"></i></li>'
            //                 });
            //
            //                 $(".zcj_selest_bm_list_show_xs_btn").parent().before(cs_per);
            //                 /*delbtn(this);*/
            //                 $(".zcj_shoose_right_list").empty();
            //                 $(this).parents('.dialog_content_addBox1').find('.dialog_close').click();
            //             });
            //         });
            //
            //         /*删除选择的部门*/
            //         $(".tanceng .zcj_shoose_right_list .list_choose_delete").die().live("click",function(){
            //             var cs_id=$(this).parent().attr("rid");
            //             var name=$(this).prev().text();
            //
            //             $(this).parent().remove();
            //             arr_id.splice(jQuery.inArray(cs_id,arr_id),1);
            //             cs_name.splice(jQuery.inArray(name,cs_name),1);
            //             console.log(arr_id);
            //             console.log(cs_name);
            //         });
            //
            //         /*部门取消按钮*/
            //         $(".zcj_bmqx_canael_btn").live("click",function(){
            //             arr_id.length = 0;
            //             cs_name.length = 0;
            //             $(".zcj_shoose_right_list").empty();
            //         });
            //         /*直接关闭*/
            //         $(".zj_bmgb_close_bt").live("click",function(){
            //             arr_id.length = 0;
            //             cs_name.length = 0;
            //             $(".zcj_shoose_right_list").empty();
            //             /*console.log(cs_name);
            //              console.log(arr_id);*/
            //         });
            //         /*删除添加后的抄送人*/
            //         /*$(".zcj_csr_info_content_icon .del_img_1").die().live("click",function(){
            //          var dq_id= $(this).parent().attr("arrid");
            //          var dq_name=$(this).parent().children(".box_adderName").text();
            //          $(this).parent().remove();
            //          arr_id.splice($.inArray(dq_id,arr_id),1);
            //          cs_name.splice($.inArray(dq_name,cs_name),1);
            //          console.log(cs_name);
            //          console.log(arr_id);
            //          });*/
            // });
            /*是否开启跨级审批*/
        /*是否开启跨级*/
        //var is_open;
        setTimeout(function(){
            var is_open=$(".tanceng .zcj_show_dept_id_name").eq(0).data('is_across');
            console.log('456');
            console.log(is_open);

            console.log('456');

            if(is_open==1){
                $('.tanceng .zcj_show_is_open_kjsp').children("i").css("right",0);
                $('.tanceng .zcj_show_is_open_kjsp').css("background","#3bafda")
                $('.tanceng .zcj_show_is_open_kjsp').data('id',1);
            }else{
                $('.tanceng .zcj_show_is_open_kjsp').children("i").css("right","10px");
                $('.tanceng .zcj_show_is_open_kjsp').css("background","#e6e6e6");
                $('.tanceng .zcj_show_is_open_kjsp').data('id',2);
            }
        },200);

        /*开启自动通过*/
        $(".tanceng .zcj_sell_price_list_display .zcj_kq_auto_tg_gn input").die().live("click",function(){
            if($(this).is(":checked")){
                $(this).data('id',1)
            }else{
                $(this).data('id',2)
            }

        });
        /******************************编辑确认按钮********************************/
        $(".tanceng .zcj_sell_edit_add_xgbtn").die().live("click",function(){
            var _this=this;

            /*适用部门*/
            // var sybm=[];
            // $(".tanceng .zcj_selest_list_display_bm_name .zcj_sybm_val").each(function(){
            //     if($(this).data('id')!=undefined){
            //         sybm.push($(this).data('id'));
            //     }
            // })
            /*抄送人数据*/
           /* var csrid=[];
            $(".tanceng .box_adderCon2 .zcj_csr_val").each(function(){

                csrid.push($(this).data('id'));


            })*/
            //$(".tanceng .zcj_show_dept_id_name .zcj_sell_spbm_ry_show").eq(i).data('xs_id'),
            var edit_info=[];
            $(".tanceng .zcj_sell_price_list_display .zcj_show_dept_id_name").each(function (i) {
                var check=[];
                $(".tanceng .zcj_sell_price_list_display .zcj_show_dept_id_name").eq(i).find('.zcj_sell_spr').each(function(){
                    check.push($(this).data('spid'))
                });

                edit_info.push({
                    'type_id':$(".tanceng .zcj_sell_type_lx_id").eq(i).data('type_id'),
                    'checker':check.toString(),
                    'is_auto':$(".tanceng .zcj_kq_auto_tg_gn input").eq(i).data('id'),
                    'director':$(".tanceng .zcj_sell_spbm_ry_show .zcj_sell_bmzg").eq(i).data('director'),
                    'superior':$(".tanceng .zcj_sell_spbm_ry_show .zcj_sell_sxup").eq(i).data('superior'),
                    'id': $(".tanceng .zcj_show_dept_id_name").eq(i).data('id')
                });
            })

            var e_info=JSON.stringify(edit_info);
/*
           console.log('20000000000000000000000000');
            console.log(edit_info);
            console.log('100000000000000000000003');*/
            var is_n=$(".tanceng .zcj_show_is_open_kjsp").data('id');
            $.ajax({
                type: 'post',
                url: SERVER_URL + "/system-sale/add",
                data:{
                    token:token,
                    category:category,
                    dept:0,
                    is_across:is_n,
                    info:e_info
                },
                dataType: "json",
                success: function (data) {
                    console.log("333");
                    console.log(data);
                    console.log("333");
                    if(data.code==0){
                        sell_list_fn();
                        $(_this).parents('.dialog_content_3').find('.dialog_close').click();
                    }else{
                        alert(data.msg);
                    }

                },
                error:function(data){
                    alert("刷新失败");
                }
            });
        });

    });



});
/*************************合同管理************************/
var data_htgl={
    token:token,
    category:1
   /* type_id:'1,2,3,4'*/
}
function contract_manage_list(){
    $.ajax({
        type: "get",
        url: SERVER_URL + "/system-set/list",
        data:data_htgl,
        dataType: 'json',
        success: function (data) {
            console.log('000');
            console.log(data);
            console.log('000');
            var html=''
            $.each(data['dataList'],function(index,manage_list){
                html+='<div class="system_work_mbdh"><div class="crk_rkgl_addRKD">';
                html+='<div class="box_open_head relative">';
                if(index==1){
                    html+='<span class="systerm_sp_title">销售合同</span><button class="but_mix but_blue val_dialog zcj_xsht_edit_btn_tc" data-type_id="1" name="xt_sp_newxsht">编辑</button>';
                    html+='<span class="box_open_btn c_9" style="right:20px;">收起 <i class="right icon_hide"></i></span>';
                }else if(index==2){
                    html+='<span class="systerm_sp_title">采购合同</span><button class="but_mix but_blue val_dialog zcj_xsht_edit_btn_tc" data-type_id="2" name="xt_sp_newxsht">编辑</button>';
                    html+='<span class="box_open_btn c_9" style="right:20px;">收起 <i class="right icon_hide"></i></span>';
                }else if(index==3){
                    html+='<span class="systerm_sp_title">员工合同</span><button class="but_mix but_blue val_dialog zcj_xsht_edit_btn_tc" data-type_id="3" name="xt_sp_newxsht">编辑</button>';
                    html+='<span class="box_open_btn c_9" style="right:20px;">收起 <i class="right icon_hide"></i></span>';
                }else if(index==4){
                    html+='<span class="systerm_sp_title">其他合同</span><button class="but_mix but_blue val_dialog zcj_xsht_edit_btn_tc" data-type_id="4" name="xt_sp_newxsht">编辑</button>';
                    html+='<span class="box_open_btn c_9" style="right:20px;">收起 <i class="right icon_hide"></i></span>';
                }
                html+='</div>';
                html+='<div class="systerm_sp_con"><div class="div_1 container"><div class="div_1 table-container">';
                html+='<table class="systerm_sp_con_table">';
                html+='<thead>';
                html+='<tr> <th style="width:11%;">条件名称</th> <th style="width:69%;">审批条件</th> <th style="width:20%;">抄送人</th> </tr>';
                html+='</thead>';
                html+='<tbody>';
                $.each(manage_list,function(index,sell_con){
                    html+='<tr>';

                    if(sell_con['type_id']==1){
                        html+='<td>销售合同</td>';
                    }else if(sell_con['type_id']==2){
                        html+='<td>采购合同</td>';
                    }else if(sell_con['type_id']==3){
                        html+='<td>员工合同</td>';
                    }else if(sell_con['type_id']==4){
                        html+='<td>其他合同</td>';
                    } else{
                        html+='<td>-</td>';
                    }
                    //console.log(sell_con['checkerName']);
                    if(sell_con['checkerName']){
                        var ht_id=[];
                        var ht_name=[];
                        var step_id=sell_con['checker'];
                        var htname=sell_con['checkerName'];
                        if(step_id!=null){
                            ht_id.push(step_id.split(','));
                        }
                        /*  if(content['director']==1){
                         spbz.push('1')
                         cs_name.push("部门主管")
                         }*/
                        // console.log('10001');
                        // console.log(ht_name);
                        // console.log(step_id);
                        // console.log("10001");
                        if(htname!=null){
                            ht_name.push(htname.split(','));
                        }

                        sell_con['checkerName']=ht_name;
                        var bz_ht;
                        $.each(sell_con['checkerName'],function(v,bzlist){
                            bz_ht='';
                            $.each(bzlist,function(i){

                                bz_ht+='<span data-id="'+ht_id[v][i]+'">步骤'+(i+1)+'：<em>'+bzlist[i]+'<i></i></em></span>'

                            })
                        })
                    }
                        html+='<td>'
                        html+='<div class="inline_block xt_sp_stepCon c_9">';

                        //if(index==0){
                    if(sell_con['checkerName']!=''){
                        html+=bz_ht;

                        if(sell_con['director']==1 && sell_con['superior']==1){
                            html+='<span data-id="1">步骤'+(parseInt(ht_name[0].length)+1)+'：<em>部门主管<i></i></em></span><span data-id="1">步骤'+(parseInt(ht_name[0].length)+2)+'：<em>所属上级<i></i></em></span>'
                            /*cs_name.push("部门主管")*/
                        }else if(sell_con['director']==1){
                            html+='<span data-id="1">步骤'+(parseInt(ht_name[0].length)+1)+'：<em>部门主管<i></i></em></span>'
                        }else if(sell_con['superior']==1){
                            html+='<span data-id="1">步骤'+(parseInt(ht_name[0].length)+1)+'：<em>所属上级<i></i></em></span>'
                        }
                    }else{
                        html+='';

                        if(sell_con['director']==1 && sell_con['superior']==1){
                            html+='<span data-id="1">步骤1：<em>部门主管<i></i></em></span><span data-id="1">步骤2：<em>所属上级<i></i></em></span>'
                            /*cs_name.push("部门主管")*/
                        }else if(sell_con['director']==1){
                            html+='<span data-id="1">步骤1：<em>部门主管<i></i></em></span>'
                        }else if(sell_con['superior']==1){
                            html+='<span data-id="1">步骤1：<em>所属上级<i></i></em></span>'
                        }
                    }

                            html+='</div>'
                            html+='</td>'
                            /* html+='<td>'+bz_ht+'</td>';*/
                        // }else{
                        //     if(sell_con['director']==1 && sell_con['superior']==1){
                        //         html+='<td>'+bz_ht+'<span data-id="1">步骤3：<em>部门主管<i></i></em></span><span data-id="1">步骤4：<em>所属上级<i></i></em></span></td>'
                        //         /*cs_name.push("部门主管")*/
                        //     }else if(sell_con['director']==1){
                        //         html+='<td>'+bz_ht+'<span data-id="1">步骤3：<em>部门主管<i></i></em></span></td>'
                        //     }else if(sell_con['superior']==1){
                        //         html+='<td>'+bz_ht+'<span data-id="1">步骤4：<em>所属上级<i></i></em></span></td>'
                        //     }else{
                        //         html+='<td>'+bz_ht+'</td>';
                        //     }
                        // }



                   /* html+='<td>'+likNullData(sell_con['deptName'])+'</td>';*/
                    html+='<td>'+likNullData(sell_con['ccName'])+'</td>';
                    html+='</tr>';
                })
                html+='</tbody>';
                html+='</table>';
                html+='</div></div></div></div></div>';
            })
            $(".zcj_manage_content_list_show").html(html);
        },
        error:function(data){
            alert('更新失败');
        }
    })
}
/*合同管理*/
$("#zcj_manage_list_left_bar").die().live("click",function(){
    contract_manage_list();
    /************合同管理编辑**************/

    $(".zcj_xsht_edit_btn_tc").die().live("click",function(){
        var type_id=$(this).data('type_id');
        /*alert(type_id);*/
        ht_edit_list_fn(type_id);
        if(type_id==1){
        $(".zcj_xs_ht_head_title_show").html('销售合同')
        }else if(type_id==2){
            $(".zcj_xs_ht_head_title_show").html('采购合同')
        } else if(type_id==3){
            $(".zcj_xs_ht_head_title_show").html('员工合同')
        }else if(type_id==4){
            $(".zcj_xs_ht_head_title_show").html('其他合同')
        }

        /*添加审核人*/
        /*add添加审批人*/
        $(".tanceng .zcj_add_shr_tc_select_btn").die().live("click",function(){

            var idx=$(this).data('index')
            /* alert(idx);*/
            /*$(".zcj_xzspr_person_list_end_btn").data('index',idx)*/
            var _this=this;
            $.ajax({
                type: 'get',
                url: SERVER_URL + "/dept/deptlist",
                data:{
                    token:token

                },
                dataType: "json",
                success: function (data) {
                    if(data.code==0){
                        var head='<li class="left_all"><span class="icon_open change_ba"></span><span class="icon_file"></span><span class="list_msg">所有分类</span></li>'
                        var deep=0;
                        $(".zcj_xz_spr_tc_tree_list").html(head+tree_list_bmfzr(data,deep));
                    }else{
                        alert(data.msg);
                    }

                },
                error:function(data){
                    alert(data);
                }
            });
            /*获取name*/
            $(".zcj_xz_spr_tc_tree_list .person_left_nav").die().live("click",function(){

                var iv=$(this).children(".list_msg").html();
                /* alert(iv);*/
                /*确定选择负责人*/
                $(".tanceng .zcj_select_spr_person_end_btn").die().live("click",function(){
                    /*var name=$(".zcj_show_man").val(iv);*/
                    var id=$(".zcj_xz_spr_tc_tree_list .person_left_nav.on").attr("aid");

                    //var id=$(".zcj_xz_spr_tc_tree_list .person_left_nav.on").attr("aid");

                    var hsp_length=$(".tanceng .zcj_ht_list_show_xq_data").find('.zcj_htgli_spr_list').eq(idx).find('.zcj_sell_spr').length;
                    var hz_length=$(".tanceng .zcj_ht_list_show_xq_data").find('.zcj_htgli_spr_list').eq(idx).find('.xt_sp_sprAdd ').length;
                    var hbm_zg=$(".tanceng .zcj_ht_list_show_xq_data").find('.zcj_htgli_spr_list').eq(idx).find('.zcj_ht_bmzg ').length;
                    var hss_sj=$(".tanceng .zcj_ht_list_show_xq_data").find('.zcj_htgli_spr_list').eq(idx).find('.zcj_ht_scsj ').length;

                    var xz_spr='<div class="xt_sp_sprAdd left zcj_sell_spr" data-id="'+id+'"><span class="m_right_5">步骤<span class="zj_index_num">'+(hsp_length+1)+'</span>：</span><span class="xt_sp_sprAddmsg">'+iv+'<i class="zcj_del_sp_name_sc"></i></span></div>'

                    var hf_if=[];

                    $(".tanceng .zcj_ht_list_show_xq_data").find('.zcj_htgli_spr_list').eq(idx).find('.zcj_sell_spr').each(function(){
                        var sp_id=$(this).data('id')
                        if(sp_id==id){
                            hf_if.push(sp_id)
                            alert('审批人不可以重复');
                            return false;
                        }
                    });
                    if(hf_if.length>0){
                        return false;
                    }else if(hsp_length>=4 || hz_length>=4){
                        alert('审批人不可以超过4个');
                        return false;
                    }else if(hbm_zg>0){
                        alert('你已选部门主管，不可再选员工');
                        return false;
                    }else if(hss_sj>0){
                        alert('你已选所属上级，不可再选其他员工');
                        return false;
                    }else{
                        $(".tanceng .zcj_ht_list_show_xq_data").find('.zcj_htgli_spr_list').eq(idx).append(xz_spr);
                    }
                   /* var sp_str=[]
                    $(".tanceng .zcj_ht_list_show_xq_data").eq(idx).find('.zcj_htgli_spr_list').find('.zcj_sell_spr').each(function(){
                        sp_str.push($(this).data('id'));
                    })
                    $(".tanceng .zcj_ht_list_show_xq_data").eq(idx).find('.zcj_htgli_spr_list').data('s_id',sp_str.toString())*/
                    $(this).next().click();
                    $(".tanceng .dialog_content_delete").find(".dialog_close").click();

                    // var xz_spr='<div class="xt_sp_sprAdd left zcj_sell_spr" data-id="'+id+'"><span class="m_right_5">步骤1：</span><span class="xt_sp_sprAddmsg">'+iv+'<i class="zcj_del_sp_name_sc"></i></span></div>'
                    //
                    //  $(".tanceng .zcj_htgli_spr_list").eq(idx).find('.zcj_sell_spr').remove();
                    // $(".tanceng .zcj_htgli_spr_list").eq(idx).append(xz_spr);
                    //
                    // $(this).next().click();

                });
                /*取消选择负责人*/

            });
            /*部门主管*/
            $(".tanceng .zcj_bmzg_xzspr_is_true").die().live("click",function(){
                if($(this).is(":checked")){
                    $(this).data("bmzg",1);
                    // $(this).parent().prev('.but_icon').removeClass('val_dialogTop');
                }else{
                    $(this).data("bmzg",2);
                    /*console.log($(this).data('bmzg'));*/
                    // $(this).parent().prev('.but_icon').addClass('val_dialogTop');
                }
            });
            /*删除id*/
            // var ht=[]
            // $(".tanceng .zcj_del_sp_name_sc").die().live("click",function(){
            //         $(this).parents('.zcj_htgli_spr_list').find('.zcj_sell_spr').each(function(){
            //             ht.push($(this).data('id'));
            //         })
            //     $(this).parents('.zcj_htgli_spr_list').data('s_id',ht.toString())
            // })
            /*所属上级*/
            $(".tanceng .zcj_ssup_xzspr_is_true").die().live("click",function(){
                if($(this).is(":checked")){
                    $(this).data("uq",1);

                    // $(this).parent().prev().find('.zcj_bmzg_xzspr_is_true').attr('disabled',true).attr('checked',false);
                    //
                    // $(this).parent().prev().prev('.but_icon').removeClass('val_dialogTop');
                }else{
                    $(this).data("uq",2);
                    // $(this).parent().prev().find('.zcj_bmzg_xzspr_is_true').attr('disabled',false);
                    //
                    // $(this).parent().prev().prev('.but_icon').addClass('val_dialogTop');
                }
            });
            /*添加审批人确定btn*/
            $(".tanceng .zcj_xzspr_person_list_end_btn").die().live("click",function(){
                if($(".tanceng .zcj_bmzg_xzspr_is_true").is(":checked")){

                    var bm_zg= $(this).parent().prev().find('.zcj_bmzg_xzspr_is_true').data('bmzg');
                }
                if($(".tanceng .zcj_ssup_xzspr_is_true").is(":checked")){
                    var ss_up= $(this).parent().prev().find('.zcj_ssup_xzspr_is_true').data('uq');
                }


                var bm_name=$(this).parent().prev().find('.zcj_bmzg_xzspr_is_true').val();
                var up_name=$(this).parent().prev().find('.zcj_ssup_xzspr_is_true').val();

                var hsp_length=$(".tanceng .zcj_ht_list_show_xq_data").find('.zcj_htgli_spr_list').eq(idx).find('.zcj_sell_spr').length;
                var hz_length=$(".tanceng .zcj_ht_list_show_xq_data").find('.zcj_htgli_spr_list').eq(idx).find('.xt_sp_sprAdd ').length;
                var hbm_zg=$(".tanceng .zcj_ht_list_show_xq_data").find('.zcj_htgli_spr_list').eq(idx).find('.zcj_ht_bmzg ').length;
                var hss_sj=$(".tanceng .zcj_ht_list_show_xq_data").find('.zcj_htgli_spr_list').eq(idx).find('.zcj_ht_scsj ').length;

                if(bm_zg==1){

                    var xz_zg='<div class="xt_sp_sprAdd left zcj_ht_bmzg" data-director="1"><span class="m_right_5">步骤<span class="zj_index_num">'+(hsp_length+1)+'</span>：</span><span class="xt_sp_sprAddmsg">'+bm_name+'<i class="zcj_del_sp_name_sc"></i></span></div>'
                    if(hbm_zg>0){
                        alert("您已添加部门主管");
                    }else if(hss_sj>0){
                        alert("您已添加所属上级,不用再添加主管");
                    }else if(hz_length>=4){
                        alert("审批人不能多于4人");
                    }else {
                        $(".tanceng .zcj_ht_list_show_xq_data").eq(idx).find('.zcj_htgli_spr_list').append(xz_zg);
                        // $(".tanceng .zcj_ht_list_show_xq_data").eq(idx).find('.zcj_ht_bmzg').data('director','1');
                        // $(".tanceng .zcj_ht_list_show_xq_data").eq(idx).find('.zcj_ht_bmzg').empty();
                    }
                }
                if(ss_up==1){

                    var xz_up='<div class="xt_sp_sprAdd left zcj_ht_scsj" data-superior="1"><span class="m_right_5">步骤<span class="zj_index_num">'+(hz_length+1)+'</span>：</span><span class="xt_sp_sprAddmsg">'+up_name+'<i class="zcj_del_sp_name_sc"></i></span></div>'
                    if(hss_sj>0){
                        alert("您已添加所属上级");
                    }else if(hz_length>=4){
                        alert("审批人不能多于4人");
                    }else {
                        // $(".tanceng .zcj_ht_list_show_xq_data").eq(idx).find('.zcj_ht_scsj').data('superior','1');
                        // $(".tanceng .zcj_ht_list_show_xq_data").eq(idx).find('.zcj_ht_scsj').empty();
                        $(".tanceng .zcj_ht_list_show_xq_data").eq(idx).find('.zcj_htgli_spr_list').append(xz_up);
                    }
                }
                $(_this).data('zgid',bm_zg);
                $(_this).data('upid',ss_up);
                $(this).next().click();
                $(this).parents('.dialog_content_delete').find('.dialog_close').click();
                /*  console.log($(_this).data('zgid',bm_zg));
                 console.log($(_this).data('upid',ss_up));
                 console.log(bm_zg);
                 console.log(ss_up);*/
            });

        });
        /*添加适用部门*/

        /*选择适用部门*/
        // var arr_id=[];
        // var cs_name=[];
        // $(".tanceng .zcj_select_ht_sybm_tc_btn").die().live("click",function(){
        //
        //     $.ajax({
        //         type: 'get',
        //         url: SERVER_URL + "/dept/deptlist",
        //         data:{
        //             token:token
        //         },
        //         dataType: "json",
        //         success: function (data) {
        //             console.log('102');
        //             console.log(data);
        //             console.log('102');
        //             if(data.code==0){
        //                 var head='<li class="left_all"><span class="icon_open change_ba"></span><span class="icon_file"></span><span class="list_msg">所有分类(4)</span></li>'
        //                 /* $(".zcj_chao_sr_tree_list").html(head+tree_list_more_person(data.rows));*/
        //                 var deep=0;
        //                  $(".tanceng .zcj_xz_bm_tree_dx_list").html(head+tree_list_choose_dept(data.rows, deep));
        //             }else{
        //                 alert(data.msg);
        //             }
        //
        //         },
        //         error:function(data){
        //             alert(data);
        //         }
        //     });
        //     //选择部门左侧选择
        //
        //     $(".tanceng .zcj_xz_bm_tree_dx_list .left_1").die().live("click",function(){
        //         /* debugger;*/
        //         var id=$(this).attr("deptid");
        //         var name=$(this).children(".list_msg").text();
        //         $(this).toggle(function(){
        //             $('.tanceng .zcj_shoose_right_list').append('<li rid="'+$(this).attr('deptid')+'"><span>'+$(this).children('.list_msg').text()+'</span><i class="list_choose_delete"></i></li>')
        //             $(this).find('span.list_check em').addClass('on');
        //             arr_id.unshift(id);
        //             cs_name.unshift(name)
        //             console.log(arr_id);
        //             console.log(cs_name);
        //
        //         },function(){
        //             $('.tanceng .zcj_shoose_right_list').find('li[rid='+$(this).attr('deptid')+']').remove()
        //             $(this).find('span.list_check em').removeClass('on');
        //             arr_id.splice(jQuery.inArray(id,arr_id),1);
        //             cs_name.splice(jQuery.inArray(id,cs_name),1);
        //             console.log(arr_id);
        //             console.log(cs_name);
        //
        //         })
        //         $(this).trigger('click');
        //
        //         /*部门确认按钮*/
        //         $(".tanceng .zcj_sybm_yxlist_end_btn").die().live("click",function(){
        //             var cs_per="";
        //             $.each($(".tanceng .zcj_shoose_right_list li"),function (i,v) {
        //
        //                 cs_per+='<li class="zcj_sybm_val" data-id="'+arr_id[i]+'">'+cs_name[i]+'<i class="zcj_del_sybm_name_d"></i></li>'
        //             });
        //
        //             $(".tanceng .zcj_select_ht_sybm_tc_btn").parent().before(cs_per);
        //             /*delbtn(this);*/
        //             $(".zcj_shoose_right_list").empty();
        //             $(this).parents('.dialog_content_addBox1').find('.dialog_close').click();
        //         });
        //     });
        //
        //     /*删除选择的部门*/
        //     $(".tanceng .zcj_shoose_right_list .list_choose_delete").die().live("click",function(){
        //         var cs_id=$(this).parent().attr("rid");
        //         var name=$(this).prev().text();
        //
        //         $(this).parent().remove();
        //         arr_id.splice(jQuery.inArray(cs_id,arr_id),1);
        //         cs_name.splice(jQuery.inArray(name,cs_name),1);
        //         console.log(arr_id);
        //         console.log(cs_name);
        //     });
        //
        //     /*部门取消按钮*/
        //     $(".zcj_bmqx_canael_btn").live("click",function(){
        //         arr_id.length = 0;
        //         cs_name.length = 0;
        //         $(".zcj_shoose_right_list").empty();
        //     });
        //     /*直接关闭*/
        //     $(".zj_bmgb_close_bt").live("click",function(){
        //         arr_id.length = 0;
        //         cs_name.length = 0;
        //         $(".zcj_shoose_right_list").empty();
        //         /*console.log(cs_name);
        //          console.log(arr_id);*/
        //     });
        //     /*删除添加后的抄送人*/
        //     /*$(".zcj_csr_info_content_icon .del_img_1").die().live("click",function(){
        //      var dq_id= $(this).parent().attr("arrid");
        //      var dq_name=$(this).parent().children(".box_adderName").text();
        //      $(this).parent().remove();
        //      arr_id.splice($.inArray(dq_id,arr_id),1);
        //      cs_name.splice($.inArray(dq_name,cs_name),1);
        //      console.log(cs_name);
        //      console.log(arr_id);
        //      });*/
        // });

        /**************抄送人弹框按钮********************/

        var  csrarr_id=[];/*抄送人id*/
        var csrarr_name=[];/*抄送人名字*/
        $(".tanceng .zcj_ht_xzcsr_tc_btn").die().live("click",function(){
            $.ajax({
                type: 'get',
                url: SERVER_URL + "/dept/deptlist",
                data:{
                    token:token
                },
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    if(data.code==0){
                        var head='<li class="left_all"><span class="icon_open change_ba"></span><span class="icon_file"></span><span class="list_msg">所有分类(4)</span></li>'
                        /* $(".zcj_chao_sr_tree_list").html(head+tree_list_more_person(data.rows));*/
                        var deep=0;
                        $(".zcj_dx_csr_tc_tree_list_show").html(head+tree_list_choose_dept_person(data.rows, deep));
                    }else{
                        alert(data.msg);
                    }

                },
                error:function(data){
                    alert(data);
                }
            });
            /*选择的抄送人*/

//选择部门左侧选择

            $(".tanceng .zcj_dx_csr_tc_tree_list_show .person_left_nav").die().live("click",function(){
                /* debugger;*/
                var id=$(this).attr("userinfoid");
                var name=$(this).children(".list_msg").text();
                $(this).toggle(function(){
                    $('.tanceng .zcj_shoose_right_csr_list').append('<li rid="'+$(this).attr('userinfoid')+'"><span>'+$(this).children('.list_msg').text()+'</span><i class="list_choose_delete"></i></li>')
                    $(this).find('span.list_check em').addClass('on')
                    $(this).append('<span class="list_check"><em class="on"></em></span>')
                    csrarr_id.unshift(id);
                    csrarr_name.unshift(name)
                    console.log(csrarr_id);
                    console.log(csrarr_name);

                },function(){
                    $('.tanceng .zcj_shoose_right_csr_list').find('li[rid='+$(this).attr('userinfoid')+']').remove()
                    $(this).find('span.list_check em').removeClass('on')
                    $(this).find('span.list_check').remove();
                    csrarr_id.splice(jQuery.inArray(id,csrarr_id),1);
                    csrarr_name.splice(jQuery.inArray(id,csrarr_name),1);
                    console.log(csrarr_id);
                    console.log(csrarr_name);

                })
                $(this).trigger('click')

                /*抄送人确认按钮*/
                $(".tanceng .zcj_select_bmcsr_list_end_btn").die().live("click",function(){
                    var cs_per="";
                    $.each($(".tanceng .zcj_shoose_right_csr_list li"),function (i,v) {
                        cs_per+='<li data-id="'+csrarr_id[i]+'" class="zcj_csr_val"><i class="del_img_1">-</i><em class="icon_personBtn icon_personBtn_msg"><i class="icon_personNext"></i></em> <em class="icon_adderBtn"></em> <p class="box_adderName">'+csrarr_name[i]+'</p></li>'
                    });
                    $(".tanceng .zcj_ht_xzcsr_tc_btn").parent().before(cs_per);
                    /* delbtn(this);*/
                    $(".zcj_shoose_right_csr_list").empty();
                    $(this).parents('.dialog_content_addBox1').find('.dialog_close').click();
                });
            });

            /*删除选择的抄送人*/
            $(".tanceng .zcj_shoose_right_csr_list .list_choose_delete").die().live("click",function(){
                var cs_id=$(this).parent().attr("rid");
                var name=$(this).prev().text();

                $(this).parent().remove();
                csrarr_id.splice(jQuery.inArray(cs_id,csrarr_id),1);
                csrarr_name.splice(jQuery.inArray(name,csrarr_name),1);
                //console.log(arr_id);
                console.log(csrarr_name);
            });

            /*抄送人取消按钮*/
            $(".zcj_qx_canael_btn").live("click",function(){
                csrarr_id.length = 0;
                csrarr_name.length = 0;
                $(".zcj_shoose_right_list").empty();
            });
            /*直接关闭*/
            $(".zj_gb_close_bt").live("click",function(){
                csrarr_id.length = 0;
                csrarr_name.length = 0;
                $(".zcj_shoose_right_list").empty();
                /*console.log(cs_name);
                 console.log(arr_id);*/
            });
            /*删除添加后的抄送人*/
            $(".zcj_csr_info_content_icon .del_img_1").die().live("click",function(){
                var dq_id= $(this).parent().attr("arrid");
                var dq_name=$(this).parent().children(".box_adderName").text();
                $(this).parent().remove();
                csrarr_id.splice($.inArray(dq_id,csrarr_id),1);
                csrarr_name.splice($.inArray(dq_name,csrarr_name),1);
                console.log(csrarr_name);
                console.log(csrarr_id);
            });
        });
        /*是否开启跨级*/

        setTimeout(function() {
            var is_open = $(".tanceng .zcj_ht_list_show_xq_data").eq(0).data('is_across');

            // $(".zcj_is_kq_kjsp_show_open").die().live("click", function () {
            //     if (is_open == 2) {
            //         is_open = 1;
            //     } else {
            //         is_open = 2;
            //     }
            // });
            if(is_open==1){
                $('.tanceng .zcj_is_kq_kjsp_show_open').children("i").css("right",0);
                $('.tanceng .zcj_is_kq_kjsp_show_open').css("background","#3bafda")
                $('.tanceng .zcj_is_kq_kjsp_show_open').data('id',1);
            }else{
                $('.tanceng .zcj_is_kq_kjsp_show_open').children("i").css("right","10px");
                $('.tanceng .zcj_is_kq_kjsp_show_open').css("background","#e6e6e6");
                $('.tanceng .zcj_is_kq_kjsp_show_open').data('id',2);
            }
        },200);
        /******************************编辑确认按钮********************************/
        $(".tanceng .zcj_ht_edit_end_snb_btm").die().live("click",function(){
            var _this=this;

            /*适用部门*/
            // var sybm=[];
            // $(".tanceng .zcj_ht_sybm_list_data_zs .zcj_sybm_val").each(function(){
            //     if($(this).data('id')!=undefined){
            //         sybm.push($(this).data('id'));
            //     }
            // })
            /*抄送人数据*/
            var csr=[];
            $(".tanceng .zcj_ht_csrlist_show .zcj_csr_val").each(function(){
                if($(this).data('id')!=undefined){
                    csr.push($(this).data('id'));
                }
            })
            var ht_info=[];
            $(".tanceng .zcj_ht_list_show_xq_data").each(function (i) {
               var ht_sp=[];
                $(".tanceng .zcj_ht_list_show_xq_data").eq(i).find('.zcj_sell_spr').each(function(){
                    ht_sp.push($(this).data('id'));
                });

                ht_info.push({
                    'checker':ht_sp.toString(),
                    'is_auto':'2',
                    'director':$(".tanceng .zcj_ht_list_show_xq_data .zcj_ht_bmzg").eq(i).data('director')==undefined ? '2': $(".tanceng .zcj_ht_list_show_xq_data .zcj_ht_bmzg").eq(i).data('director'),
                    'superior':$(".tanceng .zcj_ht_list_show_xq_data .zcj_ht_scsj").eq(i).data('superior')==undefined ? '2' : $(".tanceng .zcj_ht_list_show_xq_data .zcj_ht_scsj").eq(i).data('superior'),
                    'id': $(".tanceng .zcj_ht_list_show_xq_data").eq(i).data('id')
                });
            })

            var e_info=JSON.stringify(ht_info);
            // console.log('100000000000000000000003');
            // //console.log(sybm);
            //
            // console.log(ht_info);
            // console.log('100000000000000000000003');
            var is_o=$('.tanceng .zcj_is_kq_kjsp_show_open').data('id')
            $.ajax({
                type: 'post',
                url: SERVER_URL + "/system-set/add",
                data:{
                    token:token,
                    category:1,
                    type_id:type_id,
                    dept:0,
                    cc:csr.toString(),
                    is_across:is_o,
                    info:e_info
                },
                dataType: "json",
                success: function (data) {
                    console.log("333");
                    console.log(data);
                    console.log("333");
                    if(data.code==0){
                        contract_manage_list();
                        $(_this).parents('.dialog_content_3').find('.dialog_close').click();
                    }else{
                        alert(data.msg);
                    }

                },
                error:function(data){
                    alert("刷新失败");
                }
            });
        });
    });
});
/*合同管理编辑列表数据*/
    /*编辑列表方法*/
    function ht_edit_list_fn(cate_id){
        $.ajax({
            type: "get",
            url: SERVER_URL + "/system-set/list",
            data: {
                token: token,
                category:1,
                type_id:cate_id
            },
            dataType: 'json',
            success: function (data) {
                console.log('999000999');
                console.log(data);
                ht_edit_qj_list_show(data['dataList'],".zcj_market_contract_list_show");

                // var bm_id=$(".tanceng .zcj_ht_list_show_xq_data").eq(0).data('dept');
                // var bm_name=$(".tanceng .zcj_ht_list_show_xq_data").eq(0).data('deptname');
                // var cc_id=$(".tanceng .zcj_ht_list_show_xq_data").eq(0).data('cc');
                // var cc_name=$(".tanceng .zcj_ht_list_show_xq_data").eq(0).data('ccname');
                /*部门*/

               //  var bmname=[];
               //  var bmid=[];
               //  /* var bm_name=v['deptName'];*/
               //
               //  console.log('20000033333');
               //  console.log(bm_id);
               // /* console.log(bm_name);*/
               //  console.log('20000033333');
               //
               //  if(bm_name!=null && bm_name!=undefined){
               //      bmname.push(bm_name.split('、'));
               //  }
               //  if(bm_id!=null && bm_id!=undefined){
               //      var bid=bm_id.toString();
               //      bmid.push(bid.split(','));
               //  }
               //  /* bmid.push(bm_id.split(','));*/
               //  var bm_list;
               //  $.each(bmname,function(i,bmlist){
               //      bm_list=''
               //      $.each(bmlist,function(j){
               //          bm_list+='<li class="zcj_sybm_val" data-id="'+bmid[i][j]+'">'+bmlist[j]+'<i class="zcj_del_sybm_name_d"></i></li>';
               //      })
               //  })
               //  $(".zcj_ht_sybm_list_data_zs .zcj_sybm_val").remove();
               //  $(".zcj_select_ht_sybm_tc_btn").parent().before(bm_list);
                /*抄送人*/
                // var ccname=[];
                // var ccid=[];
                // /* var bm_name=v['deptName'];*/
                // console.log(cc_id);
                // console.log(ccname.length);
                // if(cc_name!="" && cc_name!=undefined){
                //
                //     var c_name=cc_name.toString();
                //     ccname.push(c_name.split(','));
                // }
                //
                // if(cc_id!="" && cc_id!=undefined){
                //     var c_id=cc_id.toString();
                //     ccid.push(c_id.split(','));
                //
                // }
                //     var cc_list;
                //     $.each(ccname,function(v,cclist){
                //         cc_list=''
                //         $.each(cclist,function(k){
                //             /* if(ccid[v][k]==null){
                //              delete (data['id'])
                //              }*/
                //             cc_list+='<li data-id="'+ccid[v][k]+'" data-name="'+cclist[k]+'" class="zcj_csr_val"><i class="del_img_1">-</i><em class="icon_personBtn icon_personBtn_msg"><i class="icon_personNext"></i></em> <em class="icon_adderBtn"></em> <p class="box_adderName">'+cclist[k]+'</p></li>';
                //         })
                //     })
                //     $(".tanceng .zcj_ht_csrlist_show .zcj_csr_val").remove();
                //     $(".tanceng .zcj_ht_xzcsr_tc_btn").parent().before(cc_list);


            },
            error:function(){
                alert("更新失败");
            }
        })
    }
    /*合同编辑列表*/
    function ht_edit_qj_list_show(datalist,vclass){
        var html='';

        $.each(datalist,function(index,editlist){
            html+='<div class="sys_sp_sptjBox clearfix zcj_ht_list_show_xq_data" data-is_across="'+(editlist['is_across']==undefined ? '' : editlist['is_across'])+'" data-id="'+(editlist['id']==undefined?'':editlist['id'])+'" data-cc="'+(editlist['cc']==undefined?'':editlist['cc'])+'" data-ccname="'+(editlist['ccName']==undefined?'':editlist['ccName'])+'" data-dept="'+(editlist['dept']==undefined?'':editlist['dept'])+'" data-deptname="'+(editlist['deptName']==undefined?'':editlist['deptName'])+'" style="margin-top: 20px;">';
           /* html+='<i class="sys_sp_close"></i>';*/
            html+='<div class="left c_3">';
            html+='审批条件<span>'+(index+1)+'</span>';
            html+='</div>';
            html+='<div class="sys_sp_spfw relative">';
            // if(index==0){
            //     html+='<p class="c_3">有条款修改（根据模板条款）</p>';
            // }else{
            //     html+='<p class="c_3">无条款修改（根据模板条款）</p>';
            // }

            html+='<p class="c_3">审批人</p>';
            html+='<div class="sys_sp_spfwCon c_9 zcj_htgli_spr_list" data-s_id="'+(editlist['checker']==undefined?'':editlist['checker'])+'">';

            if(editlist['checkerName']){

                var sprname=[];
                var sprid=[];
                var spr_id=editlist['checker'];
                if(spr_id!=null && spr_id!=undefined){
                    sprid.push(spr_id.split(','));
                }
                var spr_name=editlist['checkerName'];
                if(spr_name!=null && spr_name!=undefined){
                    sprname.push(spr_name.split(','));
                }

                editlist['checkerName']=sprname;
                var aname;
                $.each(editlist['checkerName'],function(arr,con){
                    aname='';
                    $.each(con,function (i) {
                        aname+='<div class="xt_sp_sprAdd left zcj_sell_spr" data-id="'+sprid[arr][i]+'"><span class="m_right_5">步骤<span class="zj_index_num">'+(i+1)+'</span>：</span><span class="xt_sp_sprAddmsg">'+con[i]+'<i class="zcj_del_sp_name_sc"></i></span></div>'
                    })
                })
            }
            if(editlist['checkerName']!=''){
                html+=aname;
                if(editlist['director']==1 && editlist['superior']==1){

                    html+='<div class="xt_sp_sprAdd left zcj_ht_bmzg" data-director="'+editlist['director']+'"><span class="m_right_5">步骤<span class="zj_index_num">'+(parseInt(sprname[0].length)+1)+'</span>：</span><span class="xt_sp_sprAddmsg">部门主管<i class="zcj_del_sp_name_sc"></i></span></div><div class="xt_sp_sprAdd left zcj_ht_scsj" data-superior="'+editlist['superior']+'"><span class="m_right_5">步骤<span class="zj_index_num">'+(parseInt(sprname[0].length)+2)+'</span>：</span><span class="xt_sp_sprAddmsg">所属上级<i class="zcj_del_sp_name_sc"></i></span></div>';

                    /*cs_name.push("部门主管")*/
                }else if(editlist['director']==1){

                    html+='<div class="xt_sp_sprAdd left zcj_ht_bmzg" data-director="'+editlist['director']+'"><span class="m_right_5">步骤<span class="zj_index_num">'+(parseInt(sprname[0].length)+1)+'</span>：</span><span class="xt_sp_sprAddmsg">部门主管<i class="zcj_del_sp_name_sc"></i></span></div><div class="xt_sp_sprAdd left zcj_ht_scsj" data-superior="'+editlist['superior']+'"></div></div>';

                }else if(editlist['superior']==1){

                    html+='</div><div class="xt_sp_sprAdd left zcj_ht_scsj" data-director="'+editlist['superior']+'"></div><div class="xt_sp_sprAdd left zcj_ht_scsj" data-superior="'+editlist['superior']+'"><span class="m_right_5">步骤<span class="zj_index_num">'+(parseInt(sprname[0].length)+1)+'</span>：</span><span class="xt_sp_sprAddmsg">所属上级<i class="zcj_del_sp_name_sc"></i></span></div></div>';

                }
            }else {
                html+='';
                if(editlist['director']==1 && editlist['superior']==1){

                    html+='<div class="xt_sp_sprAdd left zcj_ht_bmzg" data-director="'+editlist['director']+'"><span class="m_right_5">步骤<span class="zj_index_num">1</span>：</span><span class="xt_sp_sprAddmsg">部门主管<i class="zcj_del_sp_name_sc"></i></span></div><div class="xt_sp_sprAdd left zcj_ht_scsj" data-superior="'+editlist['superior']+'"><span class="m_right_5">步骤<span class="zj_index_num">2</span>：</span><span class="xt_sp_sprAddmsg">所属上级<i class="zcj_del_sp_name_sc"></i></span></div>';

                    /*cs_name.push("部门主管")*/
                }else if(editlist['director']==1){

                    html+='<div class="xt_sp_sprAdd left zcj_ht_bmzg" data-director="'+editlist['director']+'"><span class="m_right_5">步骤<span class="zj_index_num">1</span>：</span><span class="xt_sp_sprAddmsg">部门主管<i class="zcj_del_sp_name_sc"></i></span></div><div class="xt_sp_sprAdd left zcj_ht_scsj" data-superior="'+editlist['superior']+'"></div></div>';

                }else if(editlist['superior']==1){

                    html+='</div><div class="xt_sp_sprAdd left zcj_ht_scsj" data-director="'+editlist['superior']+'"></div><div class="xt_sp_sprAdd left zcj_ht_scsj" data-superior="'+editlist['superior']+'"><span class="m_right_5">步骤<span class="zj_index_num">1</span>：</span><span class="xt_sp_sprAddmsg">所属上级<i class="zcj_del_sp_name_sc"></i></span></div></div>';

                }
            }



            html+='</div><div class="xt_sp_sprAdd left"><span class="m_right_5">步骤：</span> <button data-index="'+index+'" class="but_icon sys_sp_addsprBtn val_dialogTop zcj_add_shr_tc_select_btn" name="xt_sp_xzspr"><i></i>添加</button>  </div>';
            //
            // if(editlist['is_auto']==1){
            //     html+='<label class="sys_sp_spfwOpen zcj_kq_auto_tg_ht" style="right:30%;"><input type="checkbox" checked="true" value="1"/>开启自动通过</label>';
            // }else{
            //     html+='<label class="sys_sp_spfwOpen zcj_kq_auto_tg_ht" style="right:30%;"><input type="checkbox" value="1"/>开启自动通过</label>';
            // }
            html+='</div></div>';


        })
        $(vclass).html(html);
    }

/***************************采购*******************************/
var data_cg={
    token:token,
    category:2
    /* type_id:'1,2,3,4'*/
}
function purchase_list_fn(){
    $.ajax({
        type: "get",
        url: SERVER_URL + "/system-set/list",
        data:data_cg,
        dataType: 'json',
        success: function (data) {
            console.log('000');
            console.log(data);
            console.log('000');
            var html=''
            $.each(data['dataList'],function(index,sell_list){
                html+='<div class="system_work_mbdh"><div class="crk_rkgl_addRKD">';
                html+='<div class="box_open_head relative">';
                if(index==5){
                    html+='<span class="systerm_sp_title">采购报价单</span><button class="but_mix but_blue val_dialog zcj_edit_cgbjd_show_list_sj" data-type_id="5" name="xt_sp_newcgbjd">编辑</button>';
                    html+='<span class="box_open_btn c_9" style="right:20px;">收起 <i class="right icon_hide"></i></span>';
                }else if(index==6){
                    html+='<span class="systerm_sp_title">采购退换货</span><button class="but_mix but_blue val_dialog zcj_edit_cgbjd_show_list_sj" data-type_id="6" name="xt_sp_newcgbjd">编辑</button>';
                    html+='<span class="box_open_btn c_9" style="right:20px;">收起 <i class="right icon_hide"></i></span>';
                }
                html+='</div>';
                html+='<div class="systerm_sp_con"><div class="div_1 container"><div class="div_1 table-container">';
                html+='<table class="systerm_sp_con_table">';
                html+='<thead>';
                html+='<tr> <th style="width:11%;">条件名称</th> <th style="width:89%;">审批条件</th></tr>';
                html+='</thead>';
                html+='<tbody>';
                $.each(sell_list,function(index,sell_con){
                    html+='<tr>';
                    if(sell_con['type_id']==5){
                        html+='<td>采购报价单</td>';
                    }else if(sell_con['type_id']==6){
                        html+='<td>采购退换货</td>';
                    } else{
                        html+='<td>-</td>';
                    }
                    if(sell_con['checkerName']){
                        var cg_id=[];
                        var cg_name=[];
                        var step_id=sell_con['checker'];
                        var htname=sell_con['checkerName'];
                        if(step_id!=null){
                            cg_id.push(step_id.split(','));
                        }
                        /*  if(content['director']==1){
                         spbz.push('1')
                         cs_name.push("部门主管")
                         }*/
                        // console.log('10001');
                        // console.log(cg_name);
                        // console.log(step_id);
                        // console.log("10001");
                        if(htname!=null){
                            cg_name.push(htname.split(','));
                        }

                        sell_con['checkerName']=cg_name;
                        var bz_cg;
                        $.each(sell_con['checkerName'],function(v,bzlist){
                            bz_cg='';
                            $.each(bzlist,function(i){

                                bz_cg+='<span data-id="'+cg_id[v][i]+'">步骤'+(i+1)+'：<em>'+bzlist[i]+'<i></i></em></span>'

                            })
                        })
                    }
                            html+='<td>'
                        html+='<div class="inline_block xt_sp_stepCon c_9">';
                            if(sell_con['checkerName']!=''){
                                html+=bz_cg;
                                if(sell_con['director']==1 && sell_con['superior']==1){
                                    html+='<span data-id="1">步骤'+(parseInt(cg_name[0].length)+1)+'：<em>部门主管<i></i></em></span><span data-id="1">步骤'+(parseInt(cg_name[0].length)+2)+'：<em>所属上级<i></i></em></span>'
                                    /*cs_name.push("部门主管")*/
                                }else if(sell_con['director']==1){
                                    html+='<span data-id="1">步骤'+(parseInt(cg_name[0].length)+1)+'：<em>部门主管<i></i></em></span>'
                                }else if(sell_con['superior']==1){
                                    html+='<span data-id="1">步骤'+(parseInt(cg_name[0].length)+1)+'：<em>所属上级<i></i></em></span>'
                                }
                            }else{
                                html+='';
                                if(sell_con['director']==1 && sell_con['superior']==1){
                                    html+='<span data-id="1">步骤1：<em>部门主管<i></i></em></span><span data-id="1">步骤2：<em>所属上级<i></i></em></span>'
                                    /*cs_name.push("部门主管")*/
                                }else if(sell_con['director']==1){
                                    html+='<span data-id="1">步骤1：<em>部门主管<i></i></em></span>'
                                }else if(sell_con['superior']==1){
                                    html+='<span data-id="1">步骤1：<em>所属上级<i></i></em></span>'
                                }
                            }


                        html+='</div>';
                        html+='</td>';

                    //html+='<td>'+likNullData(sell_con['checkerName'])+'</td>';
                    // html+='<td>'+likNullData(sell_con['deptName'])+'</td>';
                    html+='</tr>';
                })
                html+='</tbody>';
                html+='</table>';
                html+='</div></div></div></div></div>';
            })
            $(".zcj_cg_content_list_show").html(html);
        },
        error:function(data){

        }
    })
}
/*采购*/
$("#zcj_purchase_list_left_bar").die().live("click",function(){
    purchase_list_fn();
    /************采购编辑**************/

    $(".zcj_edit_cgbjd_show_list_sj").die().live("click",function(){
        var type_id=$(this).data('type_id');
        /*alert(type_id);*/
       /* cg_edit_list_fn(type_id);*/
        cg_edit_list_fn(2,type_id);
        if(type_id==5){
            $(".zcj_new_cgbjd_head_show").html('新建采购报价单')
        }else if(type_id==6){
            $(".zcj_new_cgbjd_head_show").html('新建采购退换货')
        }
        var cg_info=[];
        /*添加审核人*/
        /*add添加审批人*/
        $(".tanceng .zcj_add_shr_tc_select_btn").die().live("click",function(){

            var idx=$(this).data('index')
            /* alert(idx);*/
            /*$(".zcj_xzspr_person_list_end_btn").data('index',idx)*/
            var _this=this;
            $.ajax({
                type: 'get',
                url: SERVER_URL + "/dept/deptlist",
                data:{
                    token:token

                },
                dataType: "json",
                success: function (data) {
                    if(data.code==0){
                        var head='<li class="left_all"><span class="icon_open change_ba"></span><span class="icon_file"></span><span class="list_msg">所有分类</span></li>'
                        var deep=0;
                        $(".zcj_xz_spr_tc_tree_list").html(head+tree_list_bmfzr(data,deep));
                    }else{
                        alert(data.msg);
                    }

                },
                error:function(data){
                    alert(data);
                }
            });
            /*获取name*/
            $(".zcj_xz_spr_tc_tree_list .person_left_nav").die().live("click",function(){

                var iv=$(this).children(".list_msg").html();
                /* alert(iv);*/
                /*确定选择负责人*/
                $(".tanceng .zcj_select_spr_person_end_btn").die().live("click",function(){
                    /*var name=$(".zcj_show_man").val(iv);*/
                    var id=$(".zcj_xz_spr_tc_tree_list .person_left_nav.on").attr("aid");

                    var csp_length=$(".tanceng .zcj_cgbjd_show_data_list .zcj_cgbjd_list_show_xq_data").find('.zcj_cgbjd_spr_list_show').eq(idx).find('.zcj_xz_ht_spr_name_show').length;
                    var cz_length=$(".tanceng .zcj_cgbjd_show_data_list .zcj_cgbjd_list_show_xq_data").find('.zcj_cgbjd_spr_list_show').eq(idx).find('.xt_sp_sprAdd ').length;
                    var cbm_zg=$(".tanceng .zcj_cgbjd_show_data_list .zcj_cgbjd_list_show_xq_data").find('.zcj_cgbjd_spr_list_show').eq(idx).find('.zcj_ht_bmzg ').length;
                    var css_sj=$(".tanceng .zcj_cgbjd_show_data_list .zcj_cgbjd_list_show_xq_data").find('.zcj_cgbjd_spr_list_show').eq(idx).find('.zcj_ht_scsj ').length;

                    var xz_spr='<div class="xt_sp_sprAdd left zcj_xz_ht_spr_name_show" data-id="'+id+'"><span class="m_right_5">步骤<span class="zj_index_num">'+(parseInt(csp_length)+1)+'</span>：</span><span class="xt_sp_sprAddmsg">'+iv+'<i class="zcj_del_sp_name_sc"></i></span></div>'
                    var cf_if=[];

                    $(".tanceng .zcj_cgbjd_show_data_list .zcj_cgbjd_list_show_xq_data").find('.zcj_cgbjd_spr_list_show').eq(idx).find('.zcj_xz_ht_spr_name_show').each(function(){
                        var csp_id=$(this).data('id')
                        if(csp_id==id){
                            cf_if.push(csp_id)
                            alert('审批人不可以重复');
                            return false;
                        }
                    });
                    if(cf_if.length>0){
                        return false;
                    }else if(csp_length>=4 || cz_length>=4){
                        alert('审批人不可以超过4个');
                        return false;
                    }else if(cbm_zg>0){
                        alert('你已选部门主管，不可再选员工');
                        return false;
                    }else if(css_sj>0){
                        alert('你已选所属上级，不可再选其他员工');
                        return false;
                    }else {

                        $(".tanceng .zcj_cgbjd_spr_list_show").eq(idx).append(xz_spr);
                    }
                   /* var csp_str=[]
                    $(".tanceng .zcj_cgbjd_list_show_xq_data").find('.zcj_cgbjd_spr_list_show').eq(idx).find('.zcj_xz_ht_spr_name_show').each(function(){
                        csp_str.push($(this).data('id'));
                    })
                    $(".tanceng .zcj_cgbjd_list_show_xq_data").eq(idx).find('.zcj_cgbjd_spr_list_show').data('cg_id',csp_str.toString())*/
                    $(this).next().click();
                    $(".tanceng .dialog_content_delete").find(".dialog_close").click();
                });
                /*取消选择负责人*/

            });
            /*部门主管*/
            $(".tanceng .zcj_bmzg_xzspr_is_true").die().live("click",function(){
                if($(this).is(":checked")){
                    $(this).data("bmzg",1);
                    // $(this).parent().prev('.but_icon').removeClass('val_dialogTop');
                }else{
                    $(this).data("bmzg",2);
                    /*console.log($(this).data('bmzg'));*/
                    // $(this).parent().prev('.but_icon').addClass('val_dialogTop');
                }
            });
            /*所属上级*/
            $(".tanceng .zcj_ssup_xzspr_is_true").die().live("click",function(){
                if($(this).is(":checked")){
                    $(this).data("uq",1);
                    // $(this).parent().prev().find('.zcj_bmzg_xzspr_is_true').attr('disabled',true).attr('checked',false);
                    //
                    // $(this).parent().prev().prev('.but_icon').removeClass('val_dialogTop');
                }else{
                    $(this).data("uq",2);
                    // $(this).parent().prev().find('.zcj_bmzg_xzspr_is_true').attr('disabled',false)
                    // $(this).parent().prev().prev('.but_icon').addClass('val_dialogTop');
                }
            });
            /*添加审批人确定btn*/
            $(".tanceng .zcj_xzspr_person_list_end_btn").die().live("click",function(){
                if($(".tanceng .zcj_bmzg_xzspr_is_true").is(":checked")){
                    var bm_zg= $(this).parent().prev().find('.zcj_bmzg_xzspr_is_true').data('bmzg');
                }
                 if($(".tanceng .zcj_ssup_xzspr_is_true").is(":checked")){
                     var ss_up= $(this).parent().prev().find('.zcj_ssup_xzspr_is_true').data('uq');
                 }

                var bm_name=$(this).parent().prev().find('.zcj_bmzg_xzspr_is_true').val();
                var up_name=$(this).parent().prev().find('.zcj_ssup_xzspr_is_true').val();

                var csp_length=$(".tanceng .zcj_cgbjd_show_data_list .zcj_cgbjd_list_show_xq_data").find('.zcj_cgbjd_spr_list_show').eq(idx).find('.zcj_xz_ht_spr_name_show').length;
                var cz_length=$(".tanceng .zcj_cgbjd_show_data_list .zcj_cgbjd_list_show_xq_data").find('.zcj_cgbjd_spr_list_show').eq(idx).find('.xt_sp_sprAdd ').length;
                var cbm_zg=$(".tanceng .zcj_cgbjd_show_data_list .zcj_cgbjd_list_show_xq_data").find('.zcj_cgbjd_spr_list_show').eq(idx).find('.zcj_ht_bmzg ').length;
                var css_sj=$(".tanceng .zcj_cgbjd_show_data_list .zcj_cgbjd_list_show_xq_data").find('.zcj_cgbjd_spr_list_show').eq(idx).find('.zcj_ht_scsj ').length;

                if(bm_zg==1){
                    var xz_zg='<div class="xt_sp_sprAdd left zcj_ht_bmzg" data-director="1"><span class="m_right_5">步骤<span class="zj_index_num">'+(csp_length+1)+'</span>：</span><span class="xt_sp_sprAddmsg">'+bm_name+'<i class="zcj_del_sp_name_sc"></i></span></div>'

                    if(cbm_zg>0){
                        alert("您已添加部门主管");
                    }else if(css_sj>0){
                        alert("您已添加所属上级,不用再添加主管");
                    }else if(cz_length>=4){
                        alert("审批人不能多于4人");
                    }else {
                        $(".tanceng .zcj_cgbjd_list_show_xq_data").eq(idx).find('.zcj_cgbjd_spr_list_show').append(xz_zg);
                    }
                    // $(".tanceng .zcj_cgbjd_list_show_xq_data").eq(idx).find('.zcj_ht_bmzg').data('director','1');
                    // $(".tanceng .zcj_cgbjd_list_show_xq_data").eq(idx).find('.zcj_ht_bmzg').empty();

                }
                if(ss_up==1){
                    var xz_up='<div class="xt_sp_sprAdd left zcj_ht_scsj" data-director="1"><span class="m_right_5">步骤<span class="zj_index_num">'+(cz_length+1)+'</span>：</span><span class="xt_sp_sprAddmsg">'+up_name+'<i class="zcj_del_sp_name_sc"></i></span></div>'

                    if(css_sj>0){
                        alert("您已添加所属上级");
                    }else if(cz_length>=4){
                        alert("审批人不能多于4人");
                    }else {

                        $(".tanceng .zcj_cgbjd_show_data_list .zcj_cgbjd_list_show_xq_data").eq(idx).find('.zcj_cgbjd_spr_list_show').append(xz_up);
                    }
                    // $(".tanceng .zcj_cgbjd_list_show_xq_data").eq(idx).find('.zcj_ht_scsj').data('superior','1');
                    // $(".tanceng .zcj_cgbjd_list_show_xq_data").eq(idx).find('.zcj_ht_scsj').empty();
                }
                $(_this).data('zgid',bm_zg);
                $(_this).data('upid',ss_up);
                $(this).next().click();
                //$(this).parents('.dialog_content_delete').find('.dialog_close').click();

                /*  console.log($(_this).data('zgid',bm_zg));
                 console.log($(_this).data('upid',ss_up));
                 console.log(bm_zg);
                 console.log(ss_up);*/
            });

        });
        /*添加适用部门*/

        /*选择适用部门*/
        // var arr_id=[];
        // var cs_name=[];
        // $(".tanceng .zcj_select_sybm_cgbjd_tc_btn").die().live("click",function(){
        //
        //     $.ajax({
        //         type: 'get',
        //         url: SERVER_URL + "/dept/deptlist",
        //         data:{
        //             token:token
        //         },
        //         dataType: "json",
        //         success: function (data) {
        //             console.log('102');
        //             console.log(data);
        //             console.log('102');
        //             if(data.code==0){
        //                 var head='<li class="left_all"><span class="icon_open change_ba"></span><span class="icon_file"></span><span class="list_msg">所有分类(4)</span></li>'
        //                 /* $(".zcj_chao_sr_tree_list").html(head+tree_list_more_person(data.rows));*/
        //                 var deep=0;
        //                 $(".tanceng .zcj_xz_bm_tree_dx_list").html(head+tree_list_choose_dept(data.rows, deep));
        //             }else{
        //                 alert(data.msg);
        //             }
        //
        //         },
        //         error:function(data){
        //             alert(data);
        //         }
        //     });
        //     //选择部门左侧选择
        //
        //     $(".tanceng .zcj_xz_bm_tree_dx_list .left_1").die().live("click",function(){
        //         /* debugger;*/
        //         var id=$(this).attr("deptid");
        //         var name=$(this).children(".list_msg").text();
        //         $(this).toggle(function(){
        //             $('.tanceng .zcj_shoose_right_list').append('<li rid="'+$(this).attr('deptid')+'"><span>'+$(this).children('.list_msg').text()+'</span><i class="list_choose_delete"></i></li>')
        //             $(this).find('span.list_check em').addClass('on');
        //             arr_id.unshift(id);
        //             cs_name.unshift(name)
        //             console.log(arr_id);
        //             console.log(cs_name);
        //
        //         },function(){
        //             $('.tanceng .zcj_shoose_right_list').find('li[rid='+$(this).attr('deptid')+']').remove()
        //             $(this).find('span.list_check em').removeClass('on');
        //             arr_id.splice(jQuery.inArray(id,arr_id),1);
        //             cs_name.splice(jQuery.inArray(id,cs_name),1);
        //             console.log(arr_id);
        //             console.log(cs_name);
        //
        //         })
        //         $(this).trigger('click');
        //
        //         /*部门确认按钮*/
        //         $(".tanceng .zcj_sybm_yxlist_end_btn").die().live("click",function(){
        //             var cs_per="";
        //             $.each($(".tanceng .zcj_shoose_right_list li"),function (i,v) {
        //
        //                 cs_per+='<li class="zcj_sybm_val" data-id="'+arr_id[i]+'">'+cs_name[i]+'<i class="zcj_del_sybm_name_d"></i></li>'
        //             });
        //
        //             $(".tanceng .zcj_select_sybm_cgbjd_tc_btn").parent().before(cs_per);
        //             /*delbtn(this);*/
        //             $(".zcj_shoose_right_list").empty();
        //             $(this).parents('.dialog_content_addBox1').find('.dialog_close').click();
        //         });
        //     });
        //
        //     /*删除选择的部门*/
        //     $(".tanceng .zcj_shoose_right_list .list_choose_delete").die().live("click",function(){
        //         var cs_id=$(this).parent().attr("rid");
        //         var name=$(this).prev().text();
        //
        //         $(this).parent().remove();
        //         arr_id.splice(jQuery.inArray(cs_id,arr_id),1);
        //         cs_name.splice(jQuery.inArray(name,cs_name),1);
        //         console.log(arr_id);
        //         console.log(cs_name);
        //     });
        //
        //     /*部门取消按钮*/
        //     $(".zcj_bmqx_canael_btn").live("click",function(){
        //         arr_id.length = 0;
        //         cs_name.length = 0;
        //         $(".zcj_shoose_right_list").empty();
        //     });
        //     /*直接关闭*/
        //     $(".zj_bmgb_close_bt").live("click",function(){
        //         arr_id.length = 0;
        //         cs_name.length = 0;
        //         $(".zcj_shoose_right_list").empty();
        //         /*console.log(cs_name);
        //          console.log(arr_id);*/
        //     });
        //     /*删除添加后的抄送人*/
        //     /*$(".zcj_csr_info_content_icon .del_img_1").die().live("click",function(){
        //      var dq_id= $(this).parent().attr("arrid");
        //      var dq_name=$(this).parent().children(".box_adderName").text();
        //      $(this).parent().remove();
        //      arr_id.splice($.inArray(dq_id,arr_id),1);
        //      cs_name.splice($.inArray(dq_name,cs_name),1);
        //      console.log(cs_name);
        //      console.log(arr_id);
        //      });*/
        // });


        /*是否开启跨级*/
        //var is_open;
        setTimeout(function() {
            var is_open = $(".tanceng .zcj_cgbjd_list_show_xq_data").eq(0).data('is_across');


            if(is_open==1){
                $('.tanceng .zcj_is_kq_cgbjd_kjsp').children("i").css("right",0);
                $('.tanceng .zcj_is_kq_cgbjd_kjsp').css("background","#3bafda")
                $('.tanceng .zcj_is_kq_cgbjd_kjsp').data('id',1);
            }else{
                $('.tanceng .zcj_is_kq_cgbjd_kjsp').children("i").css("right","10px");
                $('.tanceng .zcj_is_kq_cgbjd_kjsp').css("background","#e6e6e6");
                $('.tanceng .zcj_is_kq_cgbjd_kjsp').data('id',2);
            }
        },200);
        /******************************编辑确认按钮********************************/
        $(".tanceng .zcj_cgbjd_edit_end_btn").die().live("click",function(){
            var _this=this;

            /*适用部门*/
            var sybm=[];
            $(".tanceng .zcj_cgbjd_xzsybm_list .zcj_sybm_val").each(function(){
                if($(this).data('id')!=undefined){
                    sybm.push($(this).data('id'));
                }
            })
            /*抄送人数据*/
           /* var csr=[];
            $(".tanceng .zcj_ht_csrlist_show .zcj_csr_val").each(function(){
                if($(this).data('id')!=undefined){
                    csr.push($(this).data('id'));
                }
            })*/

            $(".tanceng .zcj_cgbjd_show_data_list .zcj_cgbjd_list_show_xq_data").each(function (i) {
                var cg_sp=[];
                $(".tanceng .zcj_cgbjd_show_data_list .zcj_cgbjd_list_show_xq_data").eq(i).find('.zcj_xz_ht_spr_name_show').each(function () {
                    cg_sp.push($(this).data('id'));
                });

                cg_info.push({
                    'checker':cg_sp.toString(),
                    'is_auto':'2',
                    'director':$(".tanceng .zcj_cgbjd_spr_list_show .zcj_ht_bmzg").eq(i).data('director'),
                    'superior':$(".tanceng .zcj_cgbjd_spr_list_show .zcj_ht_scsj").eq(i).data('superior'),
                    'id': $(".tanceng .zcj_cgbjd_list_show_xq_data").eq(i).data('id')
                });
            })

            var e_info=JSON.stringify(cg_info);
            // console.log('100000000000000000000003');
            // console.log(sybm);
            // console.log(cg_info);
            // console.log('100000000000000000000003');
            var is_p=$('.tanceng .zcj_is_kq_cgbjd_kjsp').data('id');
            $.ajax({
                type: 'post',
                url: SERVER_URL + "/system-set/add",
                data:{
                    token:token,
                    category:2,
                    type_id:type_id,
                    dept:0,
                    is_across:is_p,
                    info:e_info
                },
                dataType: "json",
                success: function (data) {
                    console.log("333");
                    console.log(data);
                    console.log("333");
                    if(data.code==0){
                        purchase_list_fn();
                        $(_this).parents('.dialog_content_3').find('.dialog_close').click();
                    }else{
                        alert(data.msg);
                    }

                },
                error:function(data){
                    alert("刷新失败");
                }
            });
        });
    });
});
    /*采购报价单编辑列表方法*/
    function cg_edit_list_fn(cate_id,type_id){
        $.ajax({
            type: "get",
            url: SERVER_URL + "/system-set/list",
            data: {
                token: token,
                category:cate_id,
                type_id:type_id
            },
            dataType: 'json',
            success: function (data) {
                // console.log('999000999');
                // console.log(data);
                cg_edit_qj_list_show(data['dataList'],".zcj_cgbjd_show_data_list");

                // var bm_id=$(".tanceng .zcj_cgbjd_list_show_xq_data").eq(0).data('dept');
                // var bm_name=$(".tanceng .zcj_cgbjd_list_show_xq_data").eq(0).data('deptname');
                // var cc_id=$(".tanceng .zcj_cgbjd_list_show_xq_data").eq(0).data('cc');
                // var cc_name=$(".tanceng .zcj_cgbjd_list_show_xq_data").eq(0).data('ccname');
                /*部门*/

                // var bmname=[];
                // var bmid=[];
                // /* var bm_name=v['deptName'];*/
                //
                // console.log('20000033333');
                // console.log(bm_id);
                // /* console.log(bm_name);*/
                // console.log('20000033333');
                //
                // if(bm_name!=null && bm_name!=undefined){
                //     bmname.push(bm_name.split('、'));
                // }
                // if(bm_id!=null && bm_id!=undefined){
                //     var bid=bm_id.toString();
                //     bmid.push(bid.split(','));
                // }
                // /* bmid.push(bm_id.split(','));*/
                // var bm_list;
                // $.each(bmname,function(i,bmlist){
                //     bm_list=''
                //     $.each(bmlist,function(j){
                //         bm_list+='<li class="zcj_sybm_val" data-id="'+bmid[i][j]+'">'+bmlist[j]+'<i class="zcj_del_sybm_name_d"></i></li>';
                //     })
                // })
                // $(".tanceng .zcj_cgbjd_xzsybm_list .zcj_sybm_val").remove();
                // $(".tanceng .zcj_select_sybm_cgbjd_tc_btn").parent().before(bm_list);
                /*抄送人*/
                // var ccname=[];
                // var ccid=[];
                // /* var bm_name=v['deptName'];*/
                // console.log(cc_id);
                // console.log(ccname.length);
                // if(cc_name!="" && cc_name!=undefined){
                //
                //     var c_name=cc_name.toString();
                //     ccname.push(c_name.split(','));
                // }
                //
                // if(cc_id!="" && cc_id!=undefined){
                //     var c_id=cc_id.toString();
                //     ccid.push(c_id.split(','));
                //
                // }
                // var cc_list;
                // $.each(ccname,function(v,cclist){
                //     cc_list=''
                //     $.each(cclist,function(k){
                //         /* if(ccid[v][k]==null){
                //          delete (data['id'])
                //          }*/
                //         cc_list+='<li data-id="'+ccid[v][k]+'" data-name="'+cclist[k]+'" class="zcj_csr_val"><i class="del_img_1">-</i><em class="icon_personBtn icon_personBtn_msg"><i class="icon_personNext"></i></em> <em class="icon_adderBtn"></em> <p class="box_adderName">'+cclist[k]+'</p></li>';
                //     })
                // })
                // $(".tanceng .zcj_ht_csrlist_show .zcj_csr_val").remove();
                // $(".tanceng .zcj_ht_xzcsr_tc_btn").parent().before(cc_list);


            },
            error:function(){
                alert("更新失败");
            }
        })
    }
    /*采购编辑列表*/
    function cg_edit_qj_list_show(datalist,vclass){
        var html='';

        $.each(datalist,function(index,editlist){
            html+='<div class="sys_sp_sptjBox clearfix zcj_cgbjd_list_show_xq_data" data-is_across="'+(editlist['is_across']==undefined?'':editlist['is_across'])+'" data-id="'+(editlist['id']==undefined?'':editlist['id'])+'" data-cc="'+(editlist['cc']==undefined?'':editlist['cc'])+'" data-ccname="'+(editlist['ccName']==undefined?'':editlist['ccName'])+'" data-dept="'+(editlist['dept']==undefined?'':editlist['dept'])+'" data-deptname="'+(editlist['deptName']==undefined?'':editlist['deptName'])+'" style="margin-top: 20px;">';
          /*  html+='<i class="sys_sp_close"></i>';*/
            html+='<div class="left c_3">';
            html+='审批条件<span>'+(index+1)+'</span>';
            html+='</div>';
            html+='<div class="sys_sp_spfw">';

            html+='<p class="c_3">审批人</p>';
            html+='<div class="c_9 clearfix zcj_cgbjd_spr_list_show" data-cg_id="'+(editlist['checker']==undefined ? '' : editlist['checker'])+'">';
            if(editlist['checkerName']){
                var sprname=[];
                var sprid=[];
                var spr_id=editlist['checker'];
                if(spr_id!=null && spr_id!=undefined){
                    sprid.push(spr_id.split(','));
                }
                var spr_name=editlist['checkerName'];
                if(spr_name!=null && spr_name!=undefined){
                    sprname.push(spr_name.split(','));
                }

                editlist['checkerName']=sprname;
                var aname;
                $.each(editlist['checkerName'],function(arr,con){
                    aname='';
                    $.each(con,function (i) {
                        aname+='<div class="xt_sp_sprAdd left zcj_xz_ht_spr_name_show" data-id="'+sprid[arr][i]+'"><span class="m_right_5">步骤<span class="zj_index_num">'+(i+1)+'</span>：</span><span class="xt_sp_sprAddmsg">'+con[i]+'<i class="zcj_del_sp_name_sc"></i></span></div>'
                    })
                })
                html+=aname;
            }else{
                html+='';
            }
            if(editlist['checkerName']!=''){
                if(editlist['director']==1 && editlist['superior']==1){
                    html+='<div class="xt_sp_sprAdd left zcj_ht_bmzg" data-director="'+editlist['director']+'"><span class="m_right_5">步骤<span class="zj_index_num">'+(parseInt(sprname[0].length)+1)+'</span>：</span><span class="xt_sp_sprAddmsg">部门主管<i class="zcj_del_sp_name_sc"></i></span></div><div class="xt_sp_sprAdd left zcj_ht_scsj" data-superior="'+editlist['superior']+'"><span class="m_right_5">步骤<span class="zj_index_num">'+(parseInt(sprname[0].length)+2)+'</span>：</span><span class="xt_sp_sprAddmsg">所属上级<i class="zcj_del_sp_name_sc"></i></span></div>';

                    /*cs_name.push("部门主管")*/
                }else if(editlist['director']==1){
                    html+='<div class="xt_sp_sprAdd left zcj_ht_bmzg" data-director="'+editlist['director']+'"><span class="m_right_5">步骤<span class="zj_index_num">'+(parseInt(sprname[0].length)+1)+'</span>：</span><span class="xt_sp_sprAddmsg">部门主管<i class="zcj_del_sp_name_sc"></i></span></div></div>';

                }else if(editlist['superior']==1){
                    html+='</div> <div class="xt_sp_sprAdd left zcj_ht_scsj" data-superior="'+editlist['superior']+'"><span class="m_right_5">步骤<span class="zj_index_num">'+(parseInt(sprname[0].length)+1)+'</span>：</span><span class="xt_sp_sprAddmsg">所属上级<i class="zcj_del_sp_name_sc"></i></span></div></div>';

                }
            }else{
                if(editlist['director']==1 && editlist['superior']==1){
                    html+='<div class="xt_sp_sprAdd left zcj_ht_bmzg" data-director="'+editlist['director']+'"><span class="m_right_5">步骤<span class="zj_index_num">1</span>：</span><span class="xt_sp_sprAddmsg">部门主管<i class="zcj_del_sp_name_sc"></i></span></div><div class="xt_sp_sprAdd left zcj_ht_scsj" data-superior="'+editlist['superior']+'"><span class="m_right_5">步骤<span class="zj_index_num">2</span>：</span><span class="xt_sp_sprAddmsg">所属上级<i class="zcj_del_sp_name_sc"></i></span></div>';

                    /*cs_name.push("部门主管")*/
                }else if(editlist['director']==1){
                    html+='<div class="xt_sp_sprAdd left zcj_ht_bmzg" data-director="'+editlist['director']+'"><span class="m_right_5">步骤<span class="zj_index_num">1</span>：</span><span class="xt_sp_sprAddmsg">部门主管<i class="zcj_del_sp_name_sc"></i></span></div></div>';

                }else if(editlist['superior']==1){
                    html+='</div> <div class="xt_sp_sprAdd left zcj_ht_scsj" data-superior="'+editlist['superior']+'"><span class="m_right_5">步骤<span class="zj_index_num">1</span>：</span><span class="xt_sp_sprAddmsg">所属上级<i class="zcj_del_sp_name_sc"></i></span></div></div>';

                }
            }

            html+='</div><div class="xt_sp_sprAdd left"><span class="m_right_5">步骤：</span> <button data-index="'+index+'" class="but_icon sys_sp_addsprBtn val_dialogTop zcj_add_shr_tc_select_btn" name="xt_sp_xzspr"><i></i>添加</button></div></div>';

           /* if(editlist['is_auto']==1){
                html+='<label class="sys_sp_spfwOpen zcj_kq_auto_tg_ht" style="right:30%;"><input type="checkbox" checked="true" value="1"/>开启自动通过</label>';
            }else{
                html+='<label class="sys_sp_spfwOpen zcj_kq_auto_tg_ht" style="right:30%;"><input type="checkbox" value="1"/>开启自动通过</label>';
            }*/
            html+='</div></div>';


        })
        $(vclass).html(html);
    }
/****************************借入借出***********************************/

    var data_jrjc={
        token:token,
        category:3
        /* type_id:'1,2,3,4'*/
    }
    function jrjc_list_show_fn(){
        $.ajax({
            type: "get",
            url: SERVER_URL + "/system-set/list",
            data:data_jrjc,
            dataType: 'json',
            success: function (data) {
                console.log('000');
                console.log(data);
                console.log('000');
                var html=''
                if(data.code==0){

                    $.each(data['dataList'],function(index,jrjc_list){
                        if(index!=9){
                            html+='<div class="system_work_mbdh"><div class="crk_rkgl_addRKD">';
                            html+='<div class="box_open_head relative">';
                            if(index==7){
                                html+='<span class="systerm_sp_title">借入单</span><button class="but_mix but_blue val_dialog zcj_jrjc_edit_list_data_show" data-type_id="7" name="xt_sp_newjin">编辑</button>';
                                html+='<span class="box_open_btn c_9" style="right:20px;">收起 <i class="right icon_hide"></i></span>';
                            }else if(index==8){
                                html+='<span class="systerm_sp_title">借出单</span><button class="but_mix but_blue val_dialog zcj_jrjc_edit_list_data_show" data-type_id="8" name="xt_sp_newjin">编辑</button>';
                                html+='<span class="box_open_btn c_9" style="right:20px;">收起 <i class="right icon_hide"></i></span>';
                            }else if(index==9){
                                return true;
                                /* html+='<span class="systerm_sp_title">归还单</span><button class="but_mix but_blue val_dialog zcj_jrjc_edit_list_data_show" data-type_id="9" name="xt_sp_newjback">编辑</button>';
                                 html+='<span class="box_open_btn c_9" style="right:20px;">收起 <i class="right icon_hide"></i></span>';*/
                            }/*else if(index==10){
                             html+='<span class="systerm_sp_title">借入归还</span><button class="but_mix but_blue val_dialog zcj_jrjc_edit_list_data_show" data-type_id="9" name="xt_sp_newjin">编辑</button>';
                             html+='<span class="box_open_btn c_9" style="right:20px;">收起 <i class="right icon_hide"></i></span>';
                             }else if(index==11){
                             html+='<span class="systerm_sp_title">借出归还</span><button class="but_mix but_blue val_dialog zcj_jrjc_edit_list_data_show" data-type_id="9" name="xt_sp_newjback">编辑</button>';
                             html+='<span class="box_open_btn c_9" style="right:20px;">收起 <i class="right icon_hide"></i></span>';
                             }*/
                            html+='</div>';
                            html+='<div class="systerm_sp_con"><div class="div_1 container"><div class="div_1 table-container">';
                            html+='<table class="systerm_sp_con_table">';
                            html+='<thead>';
                            if(index!=9){
                                html+='<tr> <th style="width:11%;">条件名称</th> <th style="width:89%;">审批条件</th>';
                            }

                            /* if(index==9){
                             html+='<th>抄送人</th>';
                             }*/
                            html+='</tr>';
                            html+='</thead>';
                            html+='<tbody>';
                            $.each(jrjc_list,function(index,sell_con){
                                html+='<tr>';

                                if(sell_con['type_id']==7){
                                    html+='<td>借入单</td>';
                                    // html+='<td>'+likNullData(sell_con['checkerName'])+'</td>';
                                    //html+='<td>'+likNullData(sell_con['deptName'])+'</td>';
                                }else if(sell_con['type_id']==8){
                                    html+='<td>借出单</td>';
                                    //html+='<td>'+likNullData(sell_con['checkerName'])+'</td>';
                                    //html+='<td>'+likNullData(sell_con['deptName'])+'</td>';
                                }
                                if(sell_con['checkerName']){
                                    var cg_id=[];
                                    var cg_name=[];
                                    var step_id=sell_con['checker'];
                                    var htname=sell_con['checkerName'];
                                    if(step_id!=''){
                                        cg_id.push(step_id.split(','));
                                    }
                                    /*  if(content['director']==1){
                                     spbz.push('1')
                                     cs_name.push("部门主管")
                                     }*/
                                    // console.log('10001');
                                    // console.log(cg_name);
                                    // console.log(step_id);
                                    // console.log("10001");
                                    if(htname!=''){
                                        cg_name.push(htname.split(','));
                                    }

                                    sell_con['checkerName']=cg_name;
                                    var bz_cg;
                                    $.each(sell_con['checkerName'],function(v,bzlist){
                                        bz_cg='';
                                        $.each(bzlist,function(i){

                                            bz_cg+='<span data-id="'+cg_id[v][i]+'">步骤'+(i+1)+'：<em>'+bzlist[i]+'<i></i></em></span>'

                                        })
                                    })
                                }
                                    html+='<td>'
                                    html+='<div class="inline_block xt_sp_stepCon c_9">';
                                if(sell_con['checkerName']!=''){
                                    html+=bz_cg
                                    if(sell_con['director']==1 && sell_con['superior']==1){
                                        html+='<span data-id="1">步骤'+(parseInt(cg_name[0].length)+1)+'：<em>部门主管<i></i></em></span><span data-id="1">步骤'+(parseInt(cg_name[0].length)+2)+'：<em>所属上级<i></i></em></span>'
                                        /*cs_name.push("部门主管")*/
                                    }else if(sell_con['director']==1){
                                        html+='<span data-id="1">步骤'+(parseInt(cg_name[0].length)+1)+'：<em>部门主管<i></i></em></span>'
                                    }else if(sell_con['superior']==1){
                                        html+='<span data-id="1">步骤'+(parseInt(cg_name[0].length)+1)+'：<em>所属上级<i></i></em></span>'
                                    }
                                }else{
                                    html+='';
                                    if(sell_con['director']==1 && sell_con['superior']==1){
                                        html+='<span data-id="1">步骤1：<em>部门主管<i></i></em></span><span data-id="1">步骤2：<em>所属上级<i></i></em></span>'
                                        /*cs_name.push("部门主管")*/
                                    }else if(sell_con['director']==1){
                                        html+='<span data-id="1">步骤1：<em>部门主管<i></i></em></span>'
                                    }else if(sell_con['superior']==1){
                                        html+='<span data-id="1">步骤1：<em>所属上级<i></i></em></span>'
                                    }
                                }


                                    html+='</div>'
                                    html+='</td>'



                                /*else if(sell_con['type_id']==9){
                                 html+='<td>归还单</td>';
                                 html+='<td>'+likNullData(sell_con['checkerName'])+'</td>';
                                 // html+='<td>'+likNullData(sell_con['deptName'])+'</td>';
                                 // html+='<td>'+likNullData(sell_con['ccName'])+'</td>';
                                 }else if(sell_con['type_id']==10){
                                 html+='<td>借入归还</td>';
                                 html+='<td>'+likNullData(sell_con['checkerName'])+'</td>';
                                 // html+='<td>'+likNullData(sell_con['deptName'])+'</td>';
                                 // html+='<td>'+likNullData(sell_con['ccName'])+'</td>';
                                 }else if(sell_con['type_id']==11){
                                 html+='<td>借出归还</td>';
                                 html+='<td>'+likNullData(sell_con['checkerName'])+'</td>';
                                 // html+='<td>'+likNullData(sell_con['deptName'])+'</td>';
                                 html+='<td>'+likNullData(sell_con['ccName'])+'</td>';
                                 }*/

                                html+='</tr>';
                            })
                            html+='</tbody>';
                            html+='</table>';
                            html+='</div></div></div></div></div>';
                        }

                    })
                    $(".zcj_jrjc_content_list_show").html(html);
                }else{
                    alert(data.msg);
                }


            },
            error:function(data){

            }
        })
    }
$("#zcj_borrow_list_left_bar").die().live("click",function(){
    jrjc_list_show_fn();
    /************借入借出编辑**************/

    $(".zcj_jrjc_edit_list_data_show").die().live("click",function(){
        var type_id=$(this).data('type_id');
        /*alert(type_id);*/
        /* cg_edit_list_fn(type_id);*/
        jrjc_edit_list_fn(3,type_id);
        if(type_id==7){
            $(".zcj_new_jrd_name_show").html('新建借入单')
        }else if(type_id==8){
            $(".zcj_new_jrd_name_show").html('新建借出单')
        }
        var cg_info=[];
        /*添加审核人*/
        /*add添加审批人*/
        $(".tanceng .zcj_add_shr_tc_select_btn").die().live("click",function(){

            var idx=$(this).data('index')
            /* alert(idx);*/
            /*$(".zcj_xzspr_person_list_end_btn").data('index',idx)*/
            var _this=this;
            $.ajax({
                type: 'get',
                url: SERVER_URL + "/dept/deptlist",
                data:{
                    token:token

                },
                dataType: "json",
                success: function (data) {
                    if(data.code==0){
                        var head='<li class="left_all"><span class="icon_open change_ba"></span><span class="icon_file"></span><span class="list_msg">所有分类</span></li>';
                        var deep=0;
                        $(".zcj_xz_spr_tc_tree_list").html(head+tree_list_bmfzr(data,deep));
                    }else{
                        alert(data.msg);
                    }

                },
                error:function(data){
                    alert(data);
                }
            });
            /*获取name*/
            $(".zcj_xz_spr_tc_tree_list .person_left_nav").die().live("click",function(){

                var iv=$(this).children(".list_msg").html();
                /* alert(iv);*/
                /*确定选择负责人*/
                $(".tanceng .zcj_select_spr_person_end_btn").die().live("click",function(){
                    /*var name=$(".zcj_show_man").val(iv);*/
                    var id=$(".zcj_xz_spr_tc_tree_list .person_left_nav.on").attr("aid");

                    var jsp_length=$(".tanceng .zcj_jrd_sprlist_show_data .zcj_cgbjd_list_show_xq_data").find('.zcj_cgbjd_spr_list_show').eq(idx).find('.zcj_xz_ht_spr_name_show').length;
                    var jz_length=$(".tanceng .zcj_jrd_sprlist_show_data .zcj_cgbjd_list_show_xq_data").find('.zcj_cgbjd_spr_list_show').eq(idx).find('.xt_sp_sprAdd ').length;
                    var jbm_zg=$(".tanceng .zcj_jrd_sprlist_show_data .zcj_cgbjd_list_show_xq_data").find('.zcj_cgbjd_spr_list_show').eq(idx).find('.zcj_ht_bmzg ').length;
                    var jss_sj=$(".tanceng .zcj_jrd_sprlist_show_data .zcj_cgbjd_list_show_xq_data").find('.zcj_cgbjd_spr_list_show').eq(idx).find('.zcj_ht_scsj ').length;

                    var xz_spr='<div class="xt_sp_sprAdd left zcj_xz_ht_spr_name_show" data-id="'+id+'"><span class="m_right_5">步骤<span class="zj_index_num">'+(jsp_length+1)+'</span>：</span><span class="xt_sp_sprAddmsg">'+iv+'<i class="zcj_del_sp_name_sc"></i></span></div>'
                    var jf_if=[];

                    $(".tanceng .zcj_jrd_sprlist_show_data .zcj_cgbjd_list_show_xq_data").find('.zcj_cgbjd_spr_list_show').eq(idx).find('.zcj_xz_ht_spr_name_show').each(function(){
                        var csp_id=$(this).data('id');
                        if(csp_id==id){
                            jf_if.push(csp_id)
                            alert('审批人不可以重复');
                            return false;
                        }
                    });
                    if(jf_if.length>0){
                        return false;
                    }else if(jsp_length>=4 || jz_length>=4){
                        alert('审批人不可以超过4个');
                        return false;
                    }else if(jbm_zg>0){
                        alert('你已选部门主管，不可再选员工');
                        return false;
                    }else if(jss_sj>0){
                        alert('你已选所属上级，不可再选其他员工');
                        return false;
                    }else {
                        $(".tanceng .zcj_jrd_sprlist_show_data .zcj_cgbjd_spr_list_show").eq(idx).append(xz_spr);
                    }
                    //$(".tanceng .zcj_cgbjd_spr_list_show").eq(idx).find('.zcj_sell_spr').remove();
                  /*  var jsp_str=[]
                    $(".tanceng .zcj_cgbjd_list_show_xq_data").find('.zcj_cgbjd_spr_list_show').eq(idx).find('.zcj_xz_ht_spr_name_show').each(function(){
                        jsp_str.push($(this).data('id'));
                    })
                    $(".tanceng .zcj_cgbjd_list_show_xq_data").eq(idx).find('.zcj_cgbjd_spr_list_show').data('cg_id',jsp_str.toString())
*/
                    $(this).next().click();
                    $(".tanceng .dialog_content_delete").find(".dialog_close").click();
                });
                /*取消选择负责人*/

            });
            /*部门主管*/
            $(".tanceng .zcj_bmzg_xzspr_is_true").die().live("click",function(){
                if($(this).is(":checked")){
                    $(this).data("bmzg",1);

                    // $(this).parent().prev('.but_icon').removeClass('val_dialogTop');
                }else{
                    $(this).data("bmzg",2);
                    /*console.log($(this).data('bmzg'));*/
                    // $(this).parent().prev('.but_icon').addClass('val_dialogTop');
                }
            });
            /*所属上级*/
            $(".tanceng .zcj_ssup_xzspr_is_true").die().live("click",function(){
                if($(this).is(":checked")){
                    $(this).data("uq",1);

                    // $(this).parent().prev().find('.zcj_bmzg_xzspr_is_true').attr('disabled',true).attr('checked',false);
                    //
                    // $(this).parent().prev().prev('.but_icon').removeClass('val_dialogTop');
                }else{
                    $(this).data("uq",2);
                    // $(this).parent().prev().find('.zcj_bmzg_xzspr_is_true').attr('disabled',true);
                    //
                    // $(this).parent().prev().prev('.but_icon').addClass('val_dialogTop');
                }
            });
            /*添加审批人确定btn*/
            $(".tanceng .zcj_xzspr_person_list_end_btn").die().live("click",function(){
                if($(".tanceng .zcj_bmzg_xzspr_is_true").is(":checked")){
                    var bm_zg= $(this).parent().prev().find('.zcj_bmzg_xzspr_is_true').data('bmzg');
                }
                if($(".tanceng .zcj_ssup_xzspr_is_true").is(":checked")){
                    var ss_up= $(this).parent().prev().find('.zcj_ssup_xzspr_is_true').data('uq');
                }


                var bm_name=$(this).parent().prev().find('.zcj_bmzg_xzspr_is_true').val();
                var up_name=$(this).parent().prev().find('.zcj_ssup_xzspr_is_true').val();

                var jsp_length=$(".tanceng .zcj_jrd_sprlist_show_data .zcj_cgbjd_list_show_xq_data").find('.zcj_cgbjd_spr_list_show').eq(idx).find('.zcj_xz_ht_spr_name_show').length;
                var jz_length=$(".tanceng .zcj_jrd_sprlist_show_data .zcj_cgbjd_list_show_xq_data").find('.zcj_cgbjd_spr_list_show').eq(idx).find('.xt_sp_sprAdd ').length;
                var jbm_zg=$(".tanceng .zcj_jrd_sprlist_show_data .zcj_cgbjd_list_show_xq_data").find('.zcj_cgbjd_spr_list_show').eq(idx).find('.zcj_ht_bmzg ').length;
                var jss_sj=$(".tanceng .zcj_jrd_sprlist_show_data .zcj_cgbjd_list_show_xq_data").find('.zcj_cgbjd_spr_list_show').eq(idx).find('.zcj_ht_scsj ').length;

                if(bm_zg==1){
                    var xz_zg='<div class="xt_sp_sprAdd left zcj_ht_bmzg" data-director="1"><span class="m_right_5">步骤<span class="zj_index_num">'+(jsp_length+1)+'</span>：</span><span class="xt_sp_sprAddmsg">'+bm_name+'<i class="zcj_del_sp_name_sc"></i></span></div>'
                    if(jbm_zg>0){
                        alert("您已添加部门主管");
                    }else if(jss_sj>0){
                        alert("您已添加所属上级,不用再添加主管");
                    }else if(jz_length>=4){
                        alert("审批人不能多于4人");
                    }else {
                        $(".tanceng .zcj_jrd_sprlist_show_data .zcj_cgbjd_list_show_xq_data").eq(idx).find('.zcj_cgbjd_spr_list_show').append(xz_zg);
                    }
                    // $(".tanceng .zcj_cgbjd_list_show_xq_data").eq(idx).find('.zcj_ht_bmzg').data('director','1');
                    // $(".tanceng .zcj_cgbjd_list_show_xq_data").eq(idx).find('.zcj_ht_bmzg').empty();

                }
                if(ss_up==1){
                    var xz_up='<div class="xt_sp_sprAdd left zcj_ht_scsj" data-superior="1"><span class="m_right_5">步骤<span class="zj_index_num">'+(jz_length+1)+'</span>：</span><span class="xt_sp_sprAddmsg">'+up_name+'<i class="zcj_del_sp_name_sc"></i></span></div>'
                    if(jss_sj>0){
                        alert("您已添加所属上级");
                    }else if(jz_length>=4){
                        alert("审批人不能多于4人");
                    }else {
                        $(".tanceng .zcj_jrd_sprlist_show_data .zcj_cgbjd_list_show_xq_data").eq(idx).find('.zcj_cgbjd_spr_list_show').append(xz_up);
                    }
                    // $(".tanceng .zcj_cgbjd_list_show_xq_data").eq(idx).find('.zcj_ht_scsj').data('superior','1');
                    // $(".tanceng .zcj_cgbjd_list_show_xq_data").eq(idx).find('.zcj_ht_scsj').empty();

                }
                $(_this).data('zgid',bm_zg);
                $(_this).data('upid',ss_up);
                $(this).next().click();
                //$('.dialog_content_delete').find('.dialog_close').click();
                /*  console.log($(_this).data('zgid',bm_zg));
                 console.log($(_this).data('upid',ss_up));
                 console.log(bm_zg);
                 console.log(ss_up);*/
            });

        });
        /*添加适用部门*/

        /*选择适用部门*/
        // var arr_id=[];
        // var cs_name=[];
        // $(".tanceng .zcj_jrjc_xzsybm_tc_btn").die().live("click",function(){
        //
        //     $.ajax({
        //         type: 'get',
        //         url: SERVER_URL + "/dept/deptlist",
        //         data:{
        //             token:token
        //         },
        //         dataType: "json",
        //         success: function (data) {
        //             console.log('102');
        //             console.log(data);
        //             console.log('102');
        //             if(data.code==0){
        //                 var head='<li class="left_all"><span class="icon_open change_ba"></span><span class="icon_file"></span><span class="list_msg">所有分类(4)</span></li>'
        //                 /* $(".zcj_chao_sr_tree_list").html(head+tree_list_more_person(data.rows));*/
        //                 var deep=0;
        //                 $(".tanceng .zcj_xz_bm_tree_dx_list").html(head+tree_list_choose_dept(data.rows, deep));
        //             }else{
        //                 alert(data.msg);
        //             }
        //
        //         },
        //         error:function(data){
        //             alert(data);
        //         }
        //     });
        //     //选择部门左侧选择
        //
        //     $(".tanceng .zcj_xz_bm_tree_dx_list .left_1").die().live("click",function(){
        //         /* debugger;*/
        //         var id=$(this).attr("deptid");
        //         var name=$(this).children(".list_msg").text();
        //         $(this).toggle(function(){
        //             $('.tanceng .zcj_shoose_right_list').append('<li rid="'+$(this).attr('deptid')+'"><span>'+$(this).children('.list_msg').text()+'</span><i class="list_choose_delete"></i></li>')
        //             $(this).find('span.list_check em').addClass('on');
        //             arr_id.unshift(id);
        //             cs_name.unshift(name)
        //             console.log(arr_id);
        //             console.log(cs_name);
        //
        //         },function(){
        //             $('.tanceng .zcj_shoose_right_list').find('li[rid='+$(this).attr('deptid')+']').remove()
        //             $(this).find('span.list_check em').removeClass('on');
        //             arr_id.splice(jQuery.inArray(id,arr_id),1);
        //             cs_name.splice(jQuery.inArray(id,cs_name),1);
        //             console.log(arr_id);
        //             console.log(cs_name);
        //
        //         })
        //         $(this).trigger('click');
        //
        //         /*部门确认按钮*/
        //         $(".tanceng .zcj_sybm_yxlist_end_btn").die().live("click",function(){
        //             var cs_per="";
        //             $.each($(".tanceng .zcj_shoose_right_list li"),function (i,v) {
        //
        //                 cs_per+='<li class="zcj_sybm_val" data-id="'+arr_id[i]+'">'+cs_name[i]+'<i class="zcj_del_sybm_name_d"></i></li>'
        //             });
        //
        //             $(".tanceng .zcj_jrjc_xzsybm_tc_btn").parent().before(cs_per);
        //             /*delbtn(this);*/
        //             $(".zcj_shoose_right_list").empty();
        //             $(this).parents('.dialog_content_addBox1').find('.dialog_close').click();
        //         });
        //     });
        //
        //     /*删除选择的部门*/
        //     $(".tanceng .zcj_shoose_right_list .list_choose_delete").die().live("click",function(){
        //         var cs_id=$(this).parent().attr("rid");
        //         var name=$(this).prev().text();
        //
        //         $(this).parent().remove();
        //         arr_id.splice(jQuery.inArray(cs_id,arr_id),1);
        //         cs_name.splice(jQuery.inArray(name,cs_name),1);
        //         console.log(arr_id);
        //         console.log(cs_name);
        //     });
        //
        //     /*部门取消按钮*/
        //     $(".zcj_bmqx_canael_btn").live("click",function(){
        //         arr_id.length = 0;
        //         cs_name.length = 0;
        //         $(".zcj_shoose_right_list").empty();
        //     });
        //     /*直接关闭*/
        //     $(".zj_bmgb_close_bt").live("click",function(){
        //         arr_id.length = 0;
        //         cs_name.length = 0;
        //         $(".zcj_shoose_right_list").empty();
        //         /*console.log(cs_name);
        //          console.log(arr_id);*/
        //     });
        //     /*删除添加后的抄送人*/
        //     /*$(".zcj_csr_info_content_icon .del_img_1").die().live("click",function(){
        //      var dq_id= $(this).parent().attr("arrid");
        //      var dq_name=$(this).parent().children(".box_adderName").text();
        //      $(this).parent().remove();
        //      arr_id.splice($.inArray(dq_id,arr_id),1);
        //      cs_name.splice($.inArray(dq_name,cs_name),1);
        //      console.log(cs_name);
        //      console.log(arr_id);
        //      });*/
        // });
        var  jcsrarr_id=[];/*抄送人id*/
        var jcsrarr_name=[];/*抄送人名字*/
        $(".tanceng .zcj_add_csr_jrgh_tj").die().live("click",function(){


            $.ajax({
                type: 'get',
                url: SERVER_URL + "/dept/deptlist",
                data:{
                    token:token
                },
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    if(data.code==0){
                        var head='<li class="left_all"><span class="icon_open change_ba"></span><span class="icon_file"></span><span class="list_msg">所有分类(4)</span></li>'
                        /* $(".zcj_chao_sr_tree_list").html(head+tree_list_more_person(data.rows));*/
                        var deep=0;
                        $(".zcj_dx_csr_tc_tree_list_show").html(head+tree_list_choose_dept_person(data.rows, deep));
                    }else{
                        alert(data.msg);
                    }

                },
                error:function(data){
                    alert(data);
                }
            });
            /*选择的抄送人*/
            $(".tanceng .list_box_level .person_left_nav").live("click",function(){
                var _this=this;
                $(".tanceng .list_box_level").find('li.person_left_nav').removeClass('on');
                $(".tanceng .list_box_level").find('span.list_check').remove();

                    $(this).addClass("on").append('<span class="list_check"><em class="on"></em></span>');


            });

//选择部门左侧选择

            $(".tanceng .zcj_dx_csr_tc_tree_list_show .person_left_nav").die().live("click",function(){

                /* debugger;*/
                var id=$(this).attr("userinfoid");
                var name=$(this).children(".list_msg").text();
                $(this).toggle(function(){
                    $('.tanceng .zcj_shoose_right_csr_list').append('<li rid="'+$(this).attr('userinfoid')+'"><span>'+$(this).children('.list_msg').text()+'</span><i class="list_choose_delete"></i></li>')
                    $(this).find('span.list_check em').addClass('on')
                    jcsrarr_id.unshift(id);
                    jcsrarr_name.unshift(name)
                    console.log(jcsrarr_id);
                    console.log(jcsrarr_name);

                },function(){
                    $('.tanceng .zcj_shoose_right_csr_list').find('li[rid='+$(this).attr('userinfoid')+']').remove()
                    $(this).find('span.list_check em').removeClass('on')
                    jcsrarr_id.splice(jQuery.inArray(id,jcsrarr_id),1);
                    jcsrarr_name.splice(jQuery.inArray(id,jcsrarr_name),1);
                    console.log(jcsrarr_id);
                    console.log(jcsrarr_name);

                })
                $(this).trigger('click')

                /*抄送人确认按钮*/
                $(".tanceng .zcj_select_bmcsr_list_end_btn").die().live("click",function(){
                    var cs_per="";
                    $.each($(".tanceng .zcj_shoose_right_csr_list li"),function (i,v) {
                        cs_per+='<li data-id="'+jcsrarr_id[i]+'" class="zcj_csr_val"><i class="del_img_1">-</i><em class="icon_personBtn icon_personBtn_msg"><i class="icon_personNext"></i></em> <em class="icon_adderBtn"></em> <p class="box_adderName">'+jcsrarr_name[i]+'</p></li>'
                    });
                    $(".tanceng .zcj_add_csr_jrgh_tj").parent().before(cs_per);
                    /* delbtn(this);*/
                    $(".zcj_shoose_right_csr_list").empty();
                    $(this).parents('.dialog_content_addBox1').find('.dialog_close').click();
                });
            });

            /*删除选择的抄送人*/
            $(".tanceng .zcj_shoose_right_csr_list .list_choose_delete").die().live("click",function(){
                var cs_id=$(this).parent().attr("rid");
                var name=$(this).prev().text();

                $(this).parent().remove();
                jcsrarr_id.splice(jQuery.inArray(cs_id,jcsrarr_id),1);
                jcsrarr_name.splice(jQuery.inArray(name,jcsrarr_name),1);
                //console.log(arr_id);
                console.log(jcsrarr_name);
            });

            /*抄送人取消按钮*/
            $(".zcj_qx_canael_btn").live("click",function(){
                jcsrarr_id.length = 0;
                jcsrarr_name.length = 0;
                $(".zcj_shoose_right_list").empty();
            });
            /*直接关闭*/
            $(".zj_gb_close_bt").live("click",function(){
                jcsrarr_id.length = 0;
                jcsrarr_name.length = 0;
                $(".zcj_shoose_right_list").empty();
                /*console.log(cs_name);
                 console.log(arr_id);*/
            });
            /*删除添加后的抄送人*/
            $(".zcj_csr_info_content_icon .del_img_1").die().live("click",function(){
                var dq_id= $(this).parent().attr("arrid");
                var dq_name=$(this).parent().children(".box_adderName").text();
                $(this).parent().remove();
                jcsrarr_id.splice($.inArray(dq_id,jcsrarr_id),1);
                jcsrarr_name.splice($.inArray(dq_name,jcsrarr_name),1);
                console.log(jcsrarr_name);
                console.log(jcsrarr_id);
            });

        });

        /*是否开启跨级*/
        //var is_open;
        setTimeout(function() {
            var is_open = $(".tanceng .zcj_cgbjd_list_show_xq_data").eq(0).data('is_across');
            console.log('456');
            console.log(is_open);
            console.log('456');
            // $(".zcj_jrjc_is_kq_kjsp").die().live("click", function () {
            //     if (is_open == 2) {
            //         is_open = 1;
            //     } else {
            //         is_open = 2;
            //     }
            // });
            if(is_open==1){
                $('.tanceng .zcj_jrjc_is_kq_kjsp').children("i").css("right",0);
                $('.tanceng .zcj_jrjc_is_kq_kjsp').css("background","#3bafda")
                $('.tanceng .zcj_jrjc_is_kq_kjsp').data('id',1);
            }else{
                $('.tanceng .zcj_jrjc_is_kq_kjsp').children("i").css("right","10px");
                $('.tanceng .zcj_jrjc_is_kq_kjsp').css("background","#e6e6e6");
                $('.tanceng .zcj_jrjc_is_kq_kjsp').data('id',2);
            }
        },200);
        /******************************编辑确认按钮********************************/
        $(".tanceng .zcj_jrd_edit_end_btn").die().live("click",function(){
            var _this=this;

            /*适用部门*/
            // var sybm=[];
            // $(".tanceng .zcj_jrd_show_sybm_list .zcj_sybm_val").each(function(){
            //     if($(this).data('id')!=undefined){
            //         sybm.push($(this).data('id'));
            //     }
            // })
            /*抄送人数据*/
            /* var csr=[];
             $(".tanceng .zcj_ht_csrlist_show .zcj_csr_val").each(function(){
             if($(this).data('id')!=undefined){
             csr.push($(this).data('id'));
             }
             })*/
            var jr_info=[];
            $(".tanceng .zcj_jrd_sprlist_show_data .zcj_cgbjd_list_show_xq_data").each(function (i) {
                var jr_sp=[];
                $(".tanceng .zcj_jrd_sprlist_show_data .zcj_cgbjd_list_show_xq_data .zcj_cgbjd_spr_list_show").eq(i).find('.zcj_xz_ht_spr_name_show').each(function () {
                    jr_sp.push($(this).data('id'));
                })

                jr_info.push({
                    'checker':jr_sp.toString(),
                    'is_auto':'2',
                    'director':$(".tanceng .zcj_cgbjd_spr_list_show .zcj_ht_bmzg").eq(i).data('director'),
                    'superior':$(".tanceng .zcj_cgbjd_spr_list_show .zcj_ht_scsj").eq(i).data('superior'),
                    'id': $(".tanceng .zcj_cgbjd_list_show_xq_data").eq(i).data('id')
                });
            })

            var j_info=JSON.stringify(jr_info);
            console.log('100000000000000000000003');


            console.log(jr_info);
            console.log('100000000000000000000003');
            var is_b=$('.tanceng .zcj_jrjc_is_kq_kjsp').data('id');
            $.ajax({
                type: 'post',
                url: SERVER_URL + "/system-set/add",
                data:{
                    token:token,
                    category:3,
                    type_id:type_id,
                    dept:0,
                    is_across:is_b,
                    info:j_info
                },
                dataType: "json",
                success: function (data) {
                    console.log("333");
                    console.log(data);
                    console.log("333");
                    if(data.code==0){
                        jrjc_list_show_fn();
                        $(_this).parents('.dialog_content_3').find('.dialog_close').click();
                    }else{
                        alert(data.msg);
                    }

                },
                error:function(data){
                    alert("刷新失败");
                }
            });
        });
    });
});
    /*借入借出编辑列表方法*/
    function jrjc_edit_list_fn(cate_id,type_id){
        $.ajax({
            type: "get",
            url: SERVER_URL + "/system-set/list",
            data: {
                token: token,
                category:cate_id,
                type_id:type_id
            },
            dataType: 'json',
            success: function (data) {
                console.log('999000999');
                console.log(data);

                cg_edit_qj_list_show(data['dataList'],".zcj_jrd_sprlist_show_data");

                // var bm_id=$(".tanceng .zcj_cgbjd_list_show_xq_data").eq(0).data('dept');
                // var bm_name=$(".tanceng .zcj_cgbjd_list_show_xq_data").eq(0).data('deptname');
                // var cc_id=$(".tanceng .zcj_cgbjd_list_show_xq_data").eq(0).data('cc');
                // var cc_name=$(".tanceng .zcj_cgbjd_list_show_xq_data").eq(0).data('ccname');
                /*部门*/

                // var bmname=[];
                // var bmid=[];
                // /* var bm_name=v['deptName'];*/
                //
                // console.log('20000033333');
                // console.log(bm_id);
                // /* console.log(bm_name);*/
                // console.log('20000033333');
                //
                // if(bm_name!=null && bm_name!=undefined){
                //     bmname.push(bm_name.split('、'));
                // }
                // if(bm_id!=null && bm_id!=undefined){
                //     var bid=bm_id.toString();
                //     bmid.push(bid.split(','));
                // }
                // /* bmid.push(bm_id.split(','));*/
                // var bm_list;
                // $.each(bmname,function(i,bmlist){
                //     bm_list=''
                //     $.each(bmlist,function(j){
                //         bm_list+='<li class="zcj_sybm_val" data-id="'+bmid[i][j]+'">'+bmlist[j]+'<i class="zcj_del_sybm_name_d"></i></li>';
                //     })
                // })
                // $(".zcj_jrd_show_sybm_list .zcj_sybm_val").remove();
                // $(".zcj_jrjc_xzsybm_tc_btn").parent().before(bm_list);


            },
            error:function(){
                alert("更新失败");
            }
        })
    }
/*借入归还列表*/
    // function gh_list(){
    //     var html='';
    //
    //    $.each(datalist,function (index,back_list) {
    //        html+='<div class="sys_sp_spghdanBox clearfix" style="margin-top: 20px;background: #fff;">'
    //        html+='<div class="c_3 sys_sp_spghdcon">借入归还 </div>'
    //        html+='<label class="inp_box clearfix">'
    //        html+='<p class="inp_lP left"> <i class="v_hidden">*</i> <em>抄送人</em> </p>'
    //        html+='<ul class="box_adderCon clearfix box_adderCon2">'
    //        html+='<li> <i class="del_img_1">-</i> <em class="icon_personBtn icon_personBtn_msg"><i class="icon_personNext"></i></em> <em class="icon_adderBtn"></em> <p class="box_adderName">张三</p> </li>'
    //        html+='<li> <em class="icon_personBtn icon_personBtn_add val_dialogTop" name="xt_sp_xzryMore"></em> </li>'
    //        html+='</ul> </label> </div>'
    //    })
    //     $(".zcj_jrgh_back_table_info").html(html)
    //   }
/*借入归还*/



});
