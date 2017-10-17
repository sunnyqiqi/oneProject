/*出入库设置*/
$(function(){
    var company_id = loginUserInfo.usercompany_id;
    /*左侧 有限循环树结构*/
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
                                html+='<li class="left_2 person_left_nav" userinfoid="' + data3['id'] + '"><i class="list_before_span"></i><i class="list_before_span"></i><i class="list_before_span"></i><span class="list_msg">' + data3['name'] + ' </span>(主管)</li>'
                            }else{
                                //html += '<li class="hr_left_bmyg2" manid="' + data3['id'] + '"> <span>' + data3['name'] + '</span></li>';
                                html+='<li class="left_2 person_left_nav" userinfoid="' + data3['id'] + '"><i class="list_before_span"></i><i class="list_before_span"></i><i class="list_before_span"></i><span class="list_msg">' + data3['name'] + ' </span></li>'
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
                        html+='<li class="left_2 person_left_nav" userinfoid="' + data2['id'] + '"><i class="list_before_span"></i><i class="list_before_span"></i><span class="list_msg">' + data2['name'] + ' </span>(主管)</li>'
                    }else{
                        //html += '<li class="hr_left_bmyg2" manid="' + data2['id'] + '"> <span>' + data2['name'] + '</span></li>'
                        html+='<li class="left_2 person_left_nav" userinfoid="' + data2['id'] + '"><i class="list_before_span"></i><i class="list_before_span"></i><span class="list_msg">' + data2['name'] + ' </span></li>'
                    }

                })
            }

            html += '</ul>'
            html += '</ul>'

        })
        html+='<ul class="ul1">'
        $.each(datalist['list'],function(r,vlist){
            //html += '<li class="hr_left_bmyg2" manid="' + vlist['id'] + '"> <span>' + vlist['name'] + ' </span></li>'
            html+='<li class="left_2 person_left_nav" userinfoid="' + vlist['id'] + '"><i class="list_before_span"></i><span class="list_msg">' + vlist['name'] + ' </span></li>'

        })
        html+='</ul>'
        datalist['bm_count']=bm_count;
        return html;
    }
    /*入库人展示列表方法*/
    function rkr_list() {
        $(".zj_select_csr_icon_show .zj_spr_show_list").remove();
        /*获取*/
        $.ajax({
            type: 'post',
            url: SERVER_URL + "/system-warehouse/people",
            data:{
                token:token,
                id:'',
                company_id:company_id,//公司id
                category:1 //类别(1设置入库人,2设置出库人,3库存预警)

            },
            dataType: "json",
            success: function (data) {
                console.log(data);
                var html='';
              if(data.code==0){
                    if(data['data']['checker_name']!=''){
                        html='<li data-id="'+data['data']['id']+'" class="zj_spr_show_list"><i class="del_img_1" data-id="'+data['data']['id']+'">-</i><em class="icon_personBtn icon_personBtn_msg val_dialogTop zj_kf_set_select_enter_person" name="xt_sp_dxry" data-id="'+data['data']['id']+'" data-name="'+data['data']['checker_name']+'></em><em class="icon_adderBtn val_dialogTop" name="xt_sp_dxry"></em><p class="box_adderName">'+data['data']['checker_name']+' </p></li>'
                        $(".zj_select_csr_icon_show").prepend(html);
                        $(".zj_xz_spr_li_btn").hide();
                    }else{
                        $(".zj_xz_spr_li_btn").show();
                    }
                   $(".zj_kf_set_select_enter_person").attr('data-id',data['data']['id']);

                }else{
                    alert(data.msg);
                }

            },
            error:function(data){
                alert(data);
            }
        });
    }
    /*设置入库人*/
    $("#zcj_finance_rkr_set_remind").die().live("click",function(){

        rkr_list();
        /*删除更新*/
        $(".zj_select_csr_icon_show .del_img_1").die().live('click',function(){
            var id=$(this).data('id');

            $.ajax({
                type: 'post',
                url: SERVER_URL + "/system-warehouse/edit",
                data:{
                    token:token,
                    id:id,
                    company_id:company_id,//公司id
                    category:1,//类别(1设置入库人,2设置出库人,3库存预警)
                    checker:0,//审批人id
                    up:1//1为更新0为获取信息
                },
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    if(data.code==0){

                        rkr_list();
                    }else{
                        alert(data.msg);
                    }

                },
                error:function(data){
                    alert(data);
                }
            });
            $(".zj_xz_spr_li_btn").show();

        });
            /*抄送人弹框按钮*/

            $(".zj_kf_set_select_enter_person").die().live("click",function(){
                var id=$(this).data('id');

                        $.ajax({
                            type: 'get',
                            url: SERVER_URL + "/dept/deptlist",
                            data:{
                                token:Admin.get_token()
                            },
                            dataType: "json",
                            success: function (data) {
                                console.log(data);
                                if(data.code==0){
                                    var head='<li class="left_all"><span class="icon_open change_ba"></span><span class="icon_file"></span><span class="list_msg">所有分类</span></li>'
                                    /* $(".zcj_chao_sr_tree_list").html(head+tree_list_more_person(data.rows));*/
                                    var deep=0;
                                    $(".tanceng .zcj_rkr_spr_tc_tree_list").html(head+tree_list_bmfzr(data, deep));
                                }else{
                                    alert(data.msg);
                                }

                            },
                            error:function(data){
                                alert(data);
                            }
                        });

                $(".zcj_select_rkr_person_end_btn").die().live("click",function () {

                    var _this=this;
                    var sprid=$(".tanceng .zcj_rkr_spr_tc_tree_list li.on").attr('userinfoid');
                    var sprname=$(".tanceng .zcj_rkr_spr_tc_tree_list li.on").children('.list_msg').text();
                    /*var html='<li data-id="'+sprid+'"><i class="del_img_1">-</i><em class="icon_personBtn icon_personBtn_msg" data-id="'+sprid+'" data-name="'+sprname+'></em><em class="icon_adderBtn"></em><p class="box_adderName">'+sprname+'</p></li>'*/
                    $.ajax({
                        type: 'post',
                        url: SERVER_URL + "/system-warehouse/edit",
                        data:{
                            token:token,
                            id:id,
                            company_id:company_id,//公司id
                            category:1,//类别(1设置入库人,2设置出库人,3库存预警)
                            checker:sprid,//审批人id
                            up:1//1为更新0为获取信息
                        },
                        dataType: "json",
                        success: function (data) {
                            console.log(data);
                            if(data.code==0){
                                $(_this).parents('.dialog_content_addBox3').find('.dialog_close').click();
                               /* $(".zj_select_csr_icon_show").prepend(html);*/
                                rkr_list();
                            }else{
                                alert(data.msg);
                            }

                        },
                        error:function(data){
                            alert(data);
                        }
                    });
                });
            });




    });
    $("#zcj_finance_rkr_set_remind").trigger('click');
    /*出库人展示列表方法*/
    function ckr_list() {
        $(".zj_select_ckr_list_show .zj_spr_show_list").remove();
        /*获取*/
        $.ajax({
            type: 'post',
            url: SERVER_URL + "/system-warehouse/people",
            data:{
                token:token,
                company_id:company_id,//公司id
                category:2 //类别(1设置入库人,2设置出库人,3库存预警)

            },
            dataType: "json",
            success: function (data) {
                console.log(data);
                var html='';
                if(data.code==0){
                    if(data['data']['checker_name']!=''){
                        html='<li data-id="'+data['data']['id']+'" class="zj_spr_show_list"><i class="del_img_1" data-id="'+data['data']['id']+'">-</i><em class="icon_personBtn icon_personBtn_msg val_dialogTop zj_kf_set_select_ckr_enter_person" name="xt_sp_dxry" data-id="'+data['data']['id']+'" data-name="'+data['data']['checker_name']+'></em><em class="icon_adderBtn val_dialogTop" name="xt_sp_dxry"></em><p class="box_adderName">'+data['data']['checker_name']+' </p></li>';
                        $(".zj_select_ckr_list_show").prepend(html);
                        $(".zj_xz_ckr_li_btn").hide();
                    }else{
                        $(".zj_xz_ckr_li_btn").show();
                    }
                    $(".zj_kf_set_select_ckr_enter_person").attr('data-id',data['data']['id']);

                }else{
                    alert(data.msg);
                }

            },
            error:function(data){
                alert(data);
            }
        });
    }
    /*设置出库人*/
    $("#zcj_finance_ckr_set_remind").die().live("click",function(){
        ckr_list();
        /*删除更新*/
        $(".zj_select_ckr_list_show .del_img_1").die().live('click',function(){
            var id=$(this).data('id');
            $.ajax({
                type: 'post',
                url: SERVER_URL + "/system-warehouse/edit",
                data:{
                    token:token,
                    id:id,
                    company_id:company_id,//公司id
                    category:2,//类别(1设置入库人,2设置出库人,3库存预警)
                    checker:0,//审批人id
                    up:1//1为更新0为获取信息
                },
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    if(data.code==0){

                        ckr_list();
                    }else{
                        alert(data.msg);
                    }

                },
                error:function(data){
                    alert(data);
                }
            });
            $(".zj_xz_ckr_li_btn").show();
        });
        /*选择人弹窗按钮*/
        $(".zj_kf_set_select_ckr_enter_person").die().live("click",function () {
            var id=$(this).data('id');
            $.ajax({
                type: 'get',
                url: SERVER_URL + "/dept/deptlist",
                data:{
                    token:Admin.get_token()
                },
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    if(data.code==0){
                        var head='<li class="left_all"><span class="icon_open change_ba"></span><span class="icon_file"></span><span class="list_msg">所有分类</span></li>'
                        /* $(".zcj_chao_sr_tree_list").html(head+tree_list_more_person(data.rows));*/
                        var deep=0;
                        $(".tanceng .zcj_rkr_spr_tc_tree_list").html(head+tree_list_bmfzr(data, deep));
                    }else{
                        alert(data.msg);
                    }

                },
                error:function(data){
                    alert(data);
                }
            });
            /*选择人确定*/
            $(".zcj_select_rkr_person_end_btn").die().live("click",function () {

                var _this=this;
                var sprid=$(".tanceng .zcj_rkr_spr_tc_tree_list li.on").attr('userinfoid');
                var sprname=$(".tanceng .zcj_rkr_spr_tc_tree_list li.on").children('.list_msg').text();

                $.ajax({
                    type: 'post',
                    url: SERVER_URL + "/system-warehouse/edit",
                    data:{
                        token:token,
                        id:id,
                        company_id:company_id,//公司id
                        category:2,//类别(1设置入库人,2设置出库人,3库存预警)
                        checker:sprid,//审批人id
                        up:1//1为更新0为获取信息
                    },
                    dataType: "json",
                    success: function (data) {
                        console.log(data);
                        if(data.code==0){
                            $(_this).parents('.dialog_content_addBox3').find('.dialog_close').click();
                            /* $(".zj_select_csr_icon_show").prepend(html);*/
                            ckr_list();
                        }else{
                            alert(data.msg);
                        }

                    },
                    error:function(data){
                        alert(data);
                    }
                });


            });
        });
    });
    /*库存预警展示列表方法*/
    function kcyj_list() {
        $(".zj_select_kcyj_list_show .zj_spr_show_list").remove();
        /*获取*/
        $.ajax({
            type: 'post',
            url: SERVER_URL + "/system-warehouse/people",
            data:{
                token:token,
                company_id:company_id,//公司id
                category:3 //类别(1设置入库人,2设置出库人,3库存预警)

            },
            dataType: "json",
            success: function (data) {
                console.log(data);
                var html='';
                if(data.code==0){
                    if(data['data']['checker_name']!=''){
                        html='<li data-id="'+data['data']['id']+'" class="zj_spr_show_list"><i class="del_img_1" data-id="'+data['data']['id']+'">-</i><em class="icon_personBtn icon_personBtn_msg val_dialogTop zj_kf_set_select_kcyj_enter_person" name="xt_sp_dxry" data-id="'+data['data']['id']+'" data-name="'+data['data']['checker_name']+'></em><em class="icon_adderBtn val_dialogTop" name="xt_sp_dxry"></em><p class="box_adderName">'+data['data']['checker_name']+' </p></li>';
                        $(".zj_select_kcyj_list_show").prepend(html);
                        $(".zj_xz_kcyj_ckr_li_btn").hide();
                    }else{
                        $(".zj_xz_kcyj_ckr_li_btn").show();
                    }
                    $(".zj_kf_set_select_kcyj_enter_person").attr('data-id',data['data']['id']);

                }else{
                    alert(data.msg);
                }

            },
            error:function(data){
                alert(data);
            }
        });
    }
    /*库存预警*/
    $("#zcj_finance_kc_set_alert").die().live("click",function(){
        kcyj_list();
        /*删除更新*/
        $(".zj_select_kcyj_list_show .del_img_1").die().live('click',function(){
            var id=$(this).data('id');
            $.ajax({
                type: 'post',
                url: SERVER_URL + "/system-warehouse/edit",
                data:{
                    token:token,
                    id:id,
                    company_id:company_id,//公司id
                    category:3,//类别(1设置入库人,2设置出库人,3库存预警)
                    checker:0,//审批人id
                    up:1//1为更新0为获取信息
                },
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    if(data.code==0){

                        kcyj_list();
                    }else{
                        alert(data.msg);
                    }

                },
                error:function(data){
                    alert(data);
                }
            });
            $(".zj_xz_kcyj_ckr_li_btn").show();
        });

        /*选择人弹窗按钮*/
        $(".zj_kf_set_select_kcyj_enter_person").die().live("click",function () {
            var id=$(this).data('id');
            $.ajax({
                type: 'get',
                url: SERVER_URL + "/dept/deptlist",
                data:{
                    token:Admin.get_token()
                },
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    if(data.code==0){
                        var head='<li class="left_all"><span class="icon_open change_ba"></span><span class="icon_file"></span><span class="list_msg">所有分类</span></li>'
                        /* $(".zcj_chao_sr_tree_list").html(head+tree_list_more_person(data.rows));*/
                        var deep=0;
                        $(".tanceng .zcj_rkr_spr_tc_tree_list").html(head+tree_list_bmfzr(data, deep));
                    }else{
                        alert(data.msg);
                    }

                },
                error:function(data){
                    alert(data);
                }
            });
            /*选择人确定*/
            $(".zcj_select_rkr_person_end_btn").die().live("click",function () {

                var _this=this;
                var sprid=$(".tanceng .zcj_rkr_spr_tc_tree_list li.on").attr('userinfoid');
                var sprname=$(".tanceng .zcj_rkr_spr_tc_tree_list li.on").children('.list_msg').text();

                $.ajax({
                    type: 'post',
                    url: SERVER_URL + "/system-warehouse/edit",
                    data:{
                        token:token,
                        id:id,
                        company_id:company_id,//公司id
                        category:3,//类别(1设置入库人,2设置出库人,3库存预警)
                        checker:sprid,//审批人id
                        up:1//1为更新0为获取信息
                    },
                    dataType: "json",
                    success: function (data) {
                        console.log(data);
                        if(data.code==0){
                            $(_this).parents('.dialog_content_addBox3').find('.dialog_close').click();
                            /* $(".zj_select_csr_icon_show").prepend(html);*/
                            kcyj_list();
                        }else{
                            alert(data.msg);
                        }

                    },
                    error:function(data){
                        alert(data);
                    }
                });


            });
        });
    });

})