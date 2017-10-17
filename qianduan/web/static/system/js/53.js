

/*薪资设置*/
$(function(){
    //var SERVER_URL="http://192.168.0.167:9091";
    //var token='2017051308443559139-1-4';
   var token=Admin.get_token();
    //	补零函数
    function repair(x) {
        return x < 10 ? '0' + x : x
    }
    /*奖金数据显示列表方法*/
    var j_data={
        token:token,
        category:1
    }
    function bonus_list_fn(){
        $.ajax({
            type: "get",
            url: SERVER_URL + "/system-wage/list",
            data:j_data,
            dataType: 'json',
            success: function (data) {
                console.log('000');
                console.log(data);
                console.log('000');
                if(data.code==0){
                    wage_jj_list_fn(data['dataList'])
                    /*alert('奖金设置成功');*/
                }else{
                   alert(data.msg);
                }

            },
            error:function(data){
                alert('更新失败,请稍后再试');

            }
        })
    }
    /*奖金列表方法*/
    function wage_jj_list_fn(datalist){
        var html='';
        $.each(datalist,function(index,temlist){
            $(".zcj_jjxz_setjj_end_btn").data('id',temlist['id']);
            $(".zcj_cancel_setjj_end_btn").data('id',temlist['id']);
            if(temlist['is_open']==1){
                $(".zcj_is_open_jj_set").attr("checked",true);
                $(".zcj_jj_price_num_put").attr('disabled',false);
            }else{
                $(".zcj_is_open_jj_set").attr("checked",false);
                $(".zcj_jj_price_num_put").attr('disabled',true);
            }
            $(".zcj_jj_price_num_put").val(temlist['money']);
            if(temlist['all_work']==2){
                $(".zcj_is_qq_set").attr("checked",true);
            }else{
                $(".zcj_is_qq_set").attr("checked",false);
            }
            if(temlist['all_task']==2){
                $(".zcj_is_wc_syrw_set").attr("checked",true);
            }else{
                $(".zcj_is_wc_syrw_set").attr("checked",false);
            }
            // html+='<div class="t_textarea xt_xzset_choose">'
            // html+='<label class="c_3"><input type="checkbox" data-id="'+temlist['id']+'" class="zcj_is_open_jj_set" '+(temlist['is_open']=='1'?' checked="checked"':'')+' value=""/>开启奖金</label>'
            // html+='</div>'
            // html+='<div class="t_textinput xt_xzset_con left" style="">'
            // html+='<div class="t_left"><i class="c_r">*</i>奖金</div>'
            // html+='<div class="t_right">'
            // html+='<input type="text" class="time_input inp_96 zcj_jj_price_num_put" value="'+temlist['money']+'" onfocus="fn_focus(this);" onblur="fn_blur(this);">'
            // html+='<i class="unit">元</i>'
            // html+='<span class="xt_xzset_mune">金额</span>'
            // html+='<p class="grey_input">工资组成不能超过总工资数额，若不存在的工资选项请输入0元</p>'
            // html+='</div></div>'
            // html+='<div class="t_textinput xt_xzset_tijian left" style="">'
            // html+='<div class="t_right">'
            // html+='<i class="xt_xzset_mune">金额</i>'
            // html+='<label><input type="checkbox" class="zcj_is_qq_set" '+(temlist['all_work']=='2'?' checked="checked"':'')+' value=""/>全勤</label>'
            // html+='<label style="margin-left: 30px;"><input type="checkbox" class="zcj_is_wc_syrw_set" '+(temlist['all_task']=='2'?' checked="checked"':'')+' value=""/>完成所有任务</label>'
            // html+='</div> </div>'
        })
       /* $(vclass).html(html);*/
    }
    bonus_list_fn();
    $(".zcj_is_open_jj_set").die().live("click",function(){
        if($(this).is(':checked')){
            $(".zcj_jj_price_num_put").attr('disabled',false);
        }else{
            $(".zcj_jj_price_num_put").attr('disabled',true);
        }
    });
    /*奖金编辑*/
     $(".zcj_jjxz_setjj_end_btn").die().live("click",function(){
        var id=$(this).data('id');
        var is_open=$(".zcj_is_open_jj_set").prop("checked") ? "1" : "2";
        var money=$(".zcj_jj_price_num_put").val();
        var all_work=$(".zcj_is_qq_set").prop("checked") ? "2" : "1";
        var all_task=$(".zcj_is_wc_syrw_set").prop("checked") ? "2" : "1";
        $.ajax({
            type: "post",
            url: SERVER_URL + "/system-wage/add",
            data: {
                token:token,
                category:1,
                id:id,
                is_open:is_open,
                money:money,
                all_work:all_work,
                all_task:all_task
            },
            dataType: 'json',
            success: function (data) {
                console.log(data);
                if(data.code==0){
                    bonus_list_fn();
                    alert('奖金设置成功');
                }else{
                    alert(data.msg);
                }
            },
            error:function(data){
                alert('更新失败,请稍后再试');

            }
        })
    });
     /*取消*/
    $(".zcj_cancel_setjj_end_btn").die().live("click",function(){
        var id=$(this).data('id');
        var is_open=0;
        var money=0;
        var all_work=0;
        var all_task=0;
        $.ajax({
            type: "post",
            url: SERVER_URL + "/system-wage/add",
            data: {
                token:token,
                category:1,
                id:id,
                is_open:is_open,
                money:money,
                all_work:all_work,
                all_task:all_task
            },
            dataType: 'json',
            success: function (data) {
                console.log(data);
                if(data.code==0){
                    bonus_list_fn();
                    alert('奖金已取消');
                }else{
                    alert(data.msg);
                }
            },
            error:function(data){
                alert('更新失败,请稍后再试');

            }
        })
    });
    /*删除*/
    //  $(".zcj_jjxz_set_end_btn").die().live("click",function(){
    //     var id=$(".zcj_is_open_jj_set").data('id');
    //
    //     $.ajax({
    //         type: "get",
    //         url: SERVER_URL + "/system-wage/del",
    //         data: {
    //             token:token,
    //
    //             id:id
    //
    //         },
    //         dataType: 'json',
    //         success: function (data) {
    //             console.log(data);
    //             if(data.code==0){
    //                 bonus_list_fn();
    //             }else{
    //                 alert(data.msg);
    //             }
    //         },
    //         error:function(data){
    //             alert('更新失败,请稍后再试');
    //
    //         }
    //     })
    // });
    /*奖金薪资设定*/
    $("#zcj_wage_jjxz_set_tab").die().live("click",function(){
        bonus_list_fn();
    });
    /****************************提成薪资设置列表数据********************************/
    var tcdata={
        token:token,
        category:1,
        page:1,
        num:10
        /* time_type:1,
         task_type:1*/
    }
    function td_tc_fn(){
        $.ajax({
            type: "get",
            url: SERVER_URL + "/system-wage-tc/list",
            data: tcdata,
            dataType: 'json',
            success: function (data) {
                console.log('1002');
                console.log(data);
                console.log('1002');
                if(data.code==0){
                    if(data['dataList'].length>0){
                        $(".zj_xzset_no_data_show_div").hide();
                        $(".zj_header_td_page_show").show();
                    }else{
                        $(".zj_xzset_no_data_show_div").show();
                        $(".zj_header_td_page_show").hide();
                    }
                    xzset_list_fn(data['dataList'],".zcj_tc_wage_set_price_list_display");

                    var cur=data['dataList'].length;
                    var znum=data['totalcount'];
                    list_table_render_pagination(".zj_td_tc_fy_page_show",tcdata,td_tc_fn,znum,cur);
                }else {
                    $(".zj_xzset_no_data_show_div").show();
                    $(".zj_header_td_page_show").hide();
                }

            },
            error:function(data){
                alert('更新失败,请稍后再试');

            }
        })
    }
/*薪资设置列表*/
function xzset_list_fn(datalist,vclass) {
    var html='';
    $.each(datalist,function(index,tclist) {
        /* if(index>0){
         $(".zcj_tc_xz_set_data_list_dis_show .sys_sp_close").show();
         }else{
         $(".zcj_tc_xz_set_data_list_dis_show .sys_sp_close").hide();
         }*/
        var rost=repair(index+1)
        html+='<tr>\
            <td>'+rost+'</td>\
            <td>'+tclist['name']+'</td>';
            if(tclist['time_type']==1){
                html+='<td>按年度</td>';
            }else if(tclist['time_type']==2){
                html+='<td>按季度</td>';
            }else if(tclist['time_type']==3){
                html+='<td>按月度</td>';
            }else{
                html+='<td>-</td>';
            }
             if(tclist['task_type']==1){
                 html+='<td>按流水</td>';
             }else if(tclist['task_type']==2){
                 html+='<td>按利润</td>';
             }else{
                 html+='<td>-</td>';
             }
                if(tclist['ticheng_type']==1){
                    html+='<td>按年度</td>';
                }else if(tclist['ticheng_type']==2){
                    html+='<td>按季度</td>';
                }else if(tclist['ticheng_type']==3){
                    html+='<td> 按月度</td>';
                }else{
                    html+='<td>-</td>';
                }
        html+='<td>'+tclist['tc1_begin_value']+'%-'+tclist['tc1_end_value']+'%<br><span style="color: #000;">提成'+tclist['tc1_percent']+'%</span></td>\
            <td>'+tclist['tc2_begin_value']+'%-'+tclist['tc2_end_value']+'%<br><span style="color: #000;">提成'+tclist['tc2_percent']+'%</span></td>\
            <td>'+tclist['tc3_begin_value']+'%-'+tclist['tc3_end_value']+'%<br><span style="color: #000;">提成'+tclist['tc3_percent']+'%</span></td>\
            <td>'+tclist['over_begin_value']+'%-'+tclist['over_end_value']+'%<br><span style="color: #000;">提成'+tclist['over_percent']+'%</span></td>\
            <td><button class="but_mix but_exit val_dialog zcj_ct_xz_edit_btn" data-id="'+tclist['id']+'" name="system_set_grtc">编辑</button><button class="but_mix but_r zcj_tc_xzset_del_btn" data-id="'+tclist['id']+'">删除</button></td>\
            </tr>';
    })
    $(vclass).html(html);


}
    // $(".tanceng .zj_is_wc_bl_state").die().live("click",function(){
    //
    //     if($(this).is(':checked')){
    //         $(".tanceng .check_sygz_yes").attr('disabled',false);
    //     }else{
    //         $(".tanceng .check_sygz_yes").attr('disabled','disabled');
    //     }
    // });
/*编辑提成薪资添加修改方法*/
    function tc_edit_add_fn(edit_id,tc_num){

        var time_type=0;//任务周期
        $(".tanceng .zj_ct_lx_checked_state input").each(function(){
            if($(this).is(":checked")){
                time_type= $(this).data('id')
            }
        })
        var task_type=0;//任务核算方式
        $(".tanceng .zj_rw_ks_fs_state input").each(function(){
            if($(this).is(":checked")){
                task_type= $(this).data('id')
            }
        })
        var ticheng_type=0;//提成结算
        $(".tanceng .zj_rw_tc_js_state input").each(function(){
            if($(this).is(":checked")){
                ticheng_type= $(this).data('id')
            }
        })
       var over_type=0;
        $(".tanceng .zj_is_wc_bl_state").die().live('click',function(){
            if($(this).is(':checked')){
                over_type=1;
                //$(".check_sygz_yes").attr('readonly',false);
            }else{
                over_type=0;
                //$(".check_sygz_yes").attr('readonly','readonly');
            }
        });
        var name;
        if($(".zcj_tc_name_show_val").val()=='请输入提成名称') {
              name = '';
        }else{
              name=$(".zcj_tc_name_show_val").val();
        }
        var tc1_begin_value=$(".zcj_edit_tc1_startxz_set_val").val();

        var tc1_end_value=$(".zcj_edit_tc1_endxz_set_val").val();

        var tc1_percent=$(".zcj_edit_tc1_tcpercent_set_val").val();

        var tc2_begin_value=$(".zcj_edit_tc2_startxz_set_val").val();

        var tc2_end_value=$(".zcj_edit_tc2_endxz_set_val").val();

        var tc2_percent=$(".zcj_edit_tc2_tcpercent_set_val").val();

        var tc3_begin_value=$(".zcj_edit_tc3_startxz_set_val").val();

        var tc3_end_value=$(".zcj_edit_tc3_endxz_set_val").val();

        var tc3_percent=$(".zcj_edit_tc3_tcpercent_set_val").val();

        var over_begin_value=$(".zcj_edit_wcrw_startxz_set_val").val();

        var over_end_value=$(".zcj_edit_wcrw_endxz_set_val").val();

        var over_percent=$(".zcj_edit_tcbfb_tcpercent_set_val").val();
        /* var returned_money=$(".zcj_wage_jj_price_show").val();*/
        if(name==''){
            alert('请输入提成名称');
            return false;
        }else{
            $.ajax({
                type: "post",
                url: SERVER_URL + "/system-wage-tc/add",
                data: {
                    token: token,
                    category: tc_num,
                    id:edit_id,
                    name:name,
                    time_type:time_type,
                    task_type:task_type,
                    tc1_begin_value:tc1_begin_value,
                    tc1_end_value:tc1_end_value,
                    tc1_percent:tc1_percent,
                    tc2_begin_value:tc2_begin_value,
                    tc2_end_value:tc2_end_value,
                    tc2_percent:tc2_percent,
                    tc3_begin_value:tc3_begin_value,
                    tc3_end_value:tc3_end_value,
                    tc3_percent:tc3_percent,
                    ticheng_type:ticheng_type,
                    over_type:over_type,
                    over_begin_value:over_begin_value,
                    over_end_value:over_end_value,
                    over_percent:over_percent
                    /*  returned_money:returned_money*/
                },
                dataType: 'json',
                success: function (data) {
                    console.log('12300')
                    console.log(data)
                    console.log('12300')
                    if(data.code==0){
                        td_tc_fn();
                        //tdtc_list_fn();
                        $('.tanceng .zcj_edit_xz_set_tc_table').find('.dialog_close').click();
                    }else{
                        alert(data.msg);
                    }

                }
            })
        }

    }
    $("#zcj_wage_tc_set_tab").die().live("click",function(){
        $(".tanceng .zj_is_wc_bl_state").die().live("click",function(){

            if($(this).is(':checked')){
                $(".tanceng .check_sygz_yes").attr('disabled',false).val(0);
            }else{
                $(".tanceng .check_sygz_yes").attr('disabled',true).val('');
            }
        });
        /*提成薪资设定列表*/
        td_tc_fn();
        /*提成编辑*/
        $(".zcj_ct_xz_edit_btn").die().live("click",function () {
            var edit_id=$(this).data('id');

            /*查看信息*/
            $.ajax({
                type: "get",
                url: SERVER_URL + "/system-wage-tc/infobyid",
                data: {
                    token:token,
                    id:edit_id
                    /* time_type:1,
                     task_type:1*/
                },
                dataType: 'json',
                success: function (data) {
                    console.log('000123456');
                    console.log(data);
                    console.log('000123456');
                    $(".zcj_tc_name_show_val").val(data['data']['name']);
                    if(data['data']['time_type']==1){
                        $(".zj_ct_lx_checked_state input").eq(0).attr("checked",true);
                    }else if(data['data']['time_type']==2){
                        $(".zj_ct_lx_checked_state input").eq(1).attr("checked",true);
                    }else if(data['data']['time_type']==3){
                        $(".zj_ct_lx_checked_state input").eq(2).attr("checked",true);
                    }
                    if(data['data']['task_type']==2){
                        $(".zj_rw_ks_fs_state input").eq(0).attr("checked",true);
                    }else if(data['data']['task_type']==1){
                        $(".zj_rw_ks_fs_state input").eq(1).attr("checked",true);
                    }
                    if(data['data']['ticheng_type']==1){
                        $(".zj_rw_tc_js_state input").eq(0).attr("checked",true);
                    }else if(data['data']['ticheng_type']==2){
                        $(".zj_rw_tc_js_state input").eq(1).attr("checked",true);
                    }else if(data['data']['ticheng_type']==3){
                        $(".zj_rw_tc_js_state input").eq(2).attr("checked",true);
                    }
                    $(".zcj_edit_tc1_startxz_set_val").val(data['data']['tc1_begin_value']);
                    $(".zcj_edit_tc1_endxz_set_val").val(data['data']['tc1_end_value']);
                    $(".zcj_edit_tc1_tcpercent_set_val").val(data['data']['tc1_percent']);
                    $(".zcj_edit_tc2_startxz_set_val").val(data['data']['tc2_begin_value']);
                    $(".zcj_edit_tc2_endxz_set_val").val(data['data']['tc2_end_value']);
                    $(".zcj_edit_tc2_tcpercent_set_val").val(data['data']['tc2_percent']);
                    $(".zcj_edit_tc3_startxz_set_val").val(data['data']['tc3_begin_value']);
                    $(".zcj_edit_tc3_endxz_set_val").val(data['data']['tc3_end_value']);
                    $(".zcj_edit_tc3_tcpercent_set_val").val(data['data']['tc3_percent']);
                    $(".zcj_edit_wcrw_startxz_set_val").val(data['data']['over_begin_value']);
                    $(".zcj_edit_wcrw_endxz_set_val").val(data['data']['over_end_value']);
                    $(".zcj_edit_tcbfb_tcpercent_set_val").val(data['data']['over_percent']);
                    // xzset_list_fn(data['dataList'],".zcj_td_tcxz_set_list_team_show");

                    /*if(data['data']['over_type']==0){
                        $(".tanceng .zj_is_wc_bl_state").attr('checked',false)
                        $(".check_sygz_yes").attr('disabled',true);
                    }else{
                        $(".tanceng .zj_is_wc_bl_state").attr('checked',true)
                        $(".check_sygz_yes").attr('disabled',false);
                    }*/



                },
                error:function(data){
                    alert('更新失败,请稍后再试');

                }
            })

        /*提成编辑确认*/
            $(".tanceng .zcj_tc_set_success_end_btn").die().live("click",function(){

                tc_edit_add_fn(edit_id,1);
                //td_tc_fn();
                if($(".zcj_tc_name_show_val").val()=='' || $(".zcj_tc_name_show_val").val()=='请输入提成名称'){
                    return false;
                }else{
                    $(this).parents('.zcj_edit_xz_set_tc_table').find('.dialog_close').click();
                }
            });
        });
        /*提成删除方法*/
        function tc_del_fn(tc_del_id) {
            $.ajax({
                type: "get",
                url: SERVER_URL + "/system-wage-tc/del",
                data: {
                    token: token,
                    id: tc_del_id
                    /* time_type:1,
                     task_type:1*/
                },
                dataType: 'json',
                success: function (data) {
                    console.log('000123456');
                    console.log(data);
                    console.log('000123456');
                    if(data.code==0){
                        alert(data.msg);

                    }else {
                        alert(data.msg);
                    }
                }
            })
        }
        /*删除*/
        $(".zcj_tc_xzset_del_btn").die().live("click",function(){
            var tc_del_id=$(this).data('id');
            tc_del_fn(tc_del_id);
            tcdata['category']=1;
            td_tc_fn();
        });
        /*提成添加*/
        $(".zj_new_create").die().live("click",function () {

            // tc_edit_add_fn('',1);
            // tcdata['category']=1;
            /*提成add确认*/
             $(".tanceng .zcj_tc_set_success_end_btn").die().live("click",function(){
                 tcdata['category']=1;
                tc_edit_add_fn('',1);
                if($(".zcj_tc_name_show_val").val()=='' || $(".zcj_tc_name_show_val").val()=='请输入提成名称'){
                    return false;
                }else{
                    $(this).parents('.zcj_edit_xz_set_tc_table').find('.dialog_close').click();
                }

                //td_tc_fn();
            });
        });
        /***********提成薪资设置列表***************/
        $("#zcj_tc_set_list_tab").die().live("click",function(){
            tcdata['category']=1;
            td_tc_fn();
        });
        /***********************************团队提成列表************************/
        var td_data={
            token:token,
            category:2,
            page:1,
            num:10
        }
        function tdtc_list_fn(){
            $.ajax({
                type: "get",
                url: SERVER_URL + "/system-wage-tc/list",
                data:td_data,
                dataType: 'json',
                success: function (data) {
                    console.log(data);
                    if(data.code==0){
                        if(data['dataList'].length>0){
                            $(".zj_tdtcset_no_data_show_div").hide();
                            $(".zj_table_header_no").show();
                        }else{
                            $(".zj_tdtcset_no_data_show_div").show();
                            $(".zj_table_header_no").hide();
                        }
                        xzset_list_fn(data['dataList'],".zcj_td_tcxz_set_list_team_show");
                        var cur=data['dataList'].length;
                        var znum=data.totalcount;
                        list_table_render_pagination(".zj_xzset_td_tc_page",td_data,tdtc_list_fn,znum,cur);
                    }else{
                        alert(data.msg);
                    }


                },
                error:function(data){
                    alert('更新失败,请稍后再试');

                }
            })
        }
        /******************团队提成设定******************/
        $("#zcj_td_tc_set_list_tab").die().live("click",function () {
            $(".tanceng .zj_is_wc_bl_state").die().live("click",function(){

                if($(this).is(':checked')){
                    $(".tanceng .check_sygz_yes").attr('disabled',false).val(0);
                }else{
                    $(".tanceng .check_sygz_yes").attr('disabled',true).val('');
                }
            });

            td_data['category']=2;
            tdtc_list_fn();

            /*td提成编辑*/
            $(".zcj_ct_xz_edit_btn").die().live("click",function(){

                var tc_edit=$(this).data('id');

                /*查看信息*/
                $.ajax({
                    type: "get",
                    url: SERVER_URL + "/system-wage-tc/infobyid",
                    data: {
                        token:token,
                        id:tc_edit
                        /* time_type:1,
                         task_type:1*/
                    },
                    dataType: 'json',
                    success: function (data) {
                        console.log('000123456');
                        console.log(data);
                        console.log('000123456');
                        $(".zcj_tc_name_show_val").val(data['data']['name']);

                        if(data['data']['time_type']==1){
                            $(".tanceng .zj_ct_lx_checked_state input").eq(0).attr("checked",true);
                        }else if(data['data']['time_type']==2){
                            $(".tanceng .zj_ct_lx_checked_state input").eq(1).attr("checked",true);
                        }else if(data['data']['time_type']==3){
                            $(".tanceng .zj_ct_lx_checked_state input").eq(2).attr("checked",true);
                        }
                        if(data['data']['task_type']==2){
                            $(".tanceng .zj_rw_ks_fs_state input").eq(0).attr("checked",true);
                        }else if(data['data']['task_type']==1){
                            $(".tanceng .zj_rw_ks_fs_state input").eq(1).attr("checked",true);
                        }
                        if(data['data']['ticheng_type']==1){
                            $(".tanceng .zj_rw_tc_js_state input").eq(0).attr("checked",true);
                        }else if(data['data']['ticheng_type']==2){
                            $(".tanceng .zj_rw_tc_js_state input").eq(1).attr("checked",true);
                        }else if(data['data']['ticheng_type']==3){
                            $(".tanceng .zj_rw_tc_js_state input").eq(2).attr("checked",true);
                        }
                        $(".zcj_edit_tc1_startxz_set_val").val(data['data']['tc1_begin_value']);
                        $(".zcj_edit_tc1_endxz_set_val").val(data['data']['tc1_end_value']);
                        $(".zcj_edit_tc1_tcpercent_set_val").val(data['data']['tc1_percent']);
                        $(".zcj_edit_tc2_startxz_set_val").val(data['data']['tc2_begin_value']);
                        $(".zcj_edit_tc2_endxz_set_val").val(data['data']['tc2_end_value']);
                        $(".zcj_edit_tc2_tcpercent_set_val").val(data['data']['tc2_percent']);
                        $(".zcj_edit_tc3_startxz_set_val").val(data['data']['tc3_begin_value']);
                        $(".zcj_edit_tc3_endxz_set_val").val(data['data']['tc3_end_value']);
                        $(".zcj_edit_tc3_tcpercent_set_val").val(data['data']['tc3_percent']);
                        $(".zcj_edit_wcrw_startxz_set_val").val(data['data']['over_begin_value']);
                        $(".zcj_edit_wcrw_endxz_set_val").val(data['data']['over_end_value']);
                        $(".zcj_edit_tcbfb_tcpercent_set_val").val(data['data']['over_percent']);
                        // xzset_list_fn(data['dataList'],".zcj_td_tcxz_set_list_team_show");
                        /*if(data['data']['over_type']==0){
                            $(".tanceng .zj_is_wc_bl_state").attr('checked',false)
                            $(".check_sygz_yes").attr('disabled','disabled');
                        }else{
                            $(".tanceng .zj_is_wc_bl_state").attr('checked',true)
                            $(".check_sygz_yes").attr('disabled',false);
                        }*/
                    },
                    error:function(data){
                        alert('更新失败,请稍后再试');

                    }
                })
                /*团队编辑确认*/
                $(".tanceng .zcj_tc_set_success_end_btn").die().live("click",function(){
                    tc_edit_add_fn(tc_edit,2);


                    tcdata['category']=2;
                    if($(".zcj_tc_name_show_val").val()=='' || $(".zcj_tc_name_show_val").val()=='请输入提成名称'){
                        return false;
                    }else{
                        $(this).parents('.zcj_edit_xz_set_tc_table').find('.dialog_close').click();
                        setTimeout(function(){
                            tdtc_list_fn();
                        },200)
                    }


                   // $("#zcj_td_tc_set_list_tab").click();
                });
            });
            /*团队提成删除*/
            $(".zcj_tc_xzset_del_btn").die().live("click",function(){
                var del_id=$(this).data('id')
                tc_del_fn(del_id);
                tcdata['category']=2;
                tdtc_list_fn();
            });
            /*团队提成add*/
            $(".zcj_tdtc_xz_set_wc_end_btn").die().live("click",function(){
                    $(".tanceng .zcj_tc_set_success_end_btn").die().live("click",function(){
                        tc_edit_add_fn('',2);
                        tcdata['category']=2;

                        if($(".zcj_tc_name_show_val").val()=='' || $(".zcj_tc_name_show_val").val()=='请输入提成名称'){
                            return false;
                        }else{
                            $(this).parents('.zcj_edit_xz_set_tc_table').find('.dialog_close').click();
                            setTimeout(function(){
                                tdtc_list_fn();
                            },200)
                        }


                    });
            });

        });

    });
    /*计件薪资设定列表方法*/
    function jjxz_set_list_fn(){
        $.ajax({
            type: "get",
            url: SERVER_URL + "/system-wage/list",
            data:{
                token:token,
                category:2
            },
            dataType: 'json',
            success: function (data) {
                console.log('000');
                console.log(data);
                console.log('000');

                var html='';
                $.each(data['dataList'],function(index,temlist){
                    html+='<div style="overflow: hidden;"> <div class="left" style="width: 75%;">'
                    html+='<div class="t_textarea xt_xzset_choose relative" style="display: none">'
                    html+='<label class="c_3"><input type="checkbox" class="zcj_is_open_wage_jj_set" '+(temlist['is_open']=='1' ? 'checked="checked"' : '')+' value=""/>计件设定</label>'
                    html+='<p class="grey_input" style="font-size: 12px;">开启后针对配置商品备货时间计件</p>'
                    html+='</div>'
                    html+='<div class="xt_xzset_jijian relative">'
                    html+='<i class="sys_sp_close none"></i>'
                    html+='<div class="t_textinput xt_xzset_con">'
                    html+='<div class="t_left t_left_conrow"><i class="c_r">*</i>计件<span class="page_53_tcNum">'+(index+1)+'</span>名称</div>'
                    html+='<div class="t_right">'
                    html+='<input type="text" class="time_input zcj_wage_jj_name_show" disabled="disabled" value="'+temlist['name']+'" onfocus="fn_focus(this);" onblur="fn_blur(this);">'
                    html+='</div> </div>'
                    html+='<div class="t_textinput xt_xzset_con">'
                    html+='<div class="t_left"><i class="c_r">*</i>计件金额</div>'
                    html+='<div class="t_right">'
                    html+='<input type="text" class="time_input inp_96 zcj_wage_jj_price_show" disabled="disabled" value="'+temlist['money']+'" onfocus="fn_focus(this);" onblur="fn_blur(this);">'
                    html+='<i class="unit" style="right:-4px;">元</i>'
                    html+='</div></div></div></div><div class="right" style="width: 25%;"> <button class="but_mix but_exit val_dialog zcj_jjxz_edit_btn" data-id="'+temlist['id']+'" name="system_exit_tjjjsd">编辑</button> <button data-id="'+temlist['id']+'" class="but_mix but_r zcj_jjxz_del_btn">删除</button> '
                    html+='</div></div>'
                    html+='<hr style="margin:30px 0;">'
                    html+='</div>'
                    /* html+='<div class="t_textinput xt_xzset_conTC" style="margin-left: 26px;">'
                     html+='<button class="but_icon xtSet_xzsetjj_addbut"><i></i>添加计件设定</button> </div>'*/
                })
                $(".zcj_jj_wage_set_list_display").html(html);
                var setjj='';
                var open=$(".zcj_jj_wage_set_list_display .zcj_is_open_wage_jj_set").eq(0).prop("checked");
                if(open){
                    $(".zcj_jjxz_div .zcj_xz_is_open_jj_set").attr("checked",true);

                }else{
                    $(".zcj_jjxz_div .zcj_xz_is_open_jj_set").attr("checked",false);

                }

                $(".zcj_jjsd_set_is_open").html(setjj);
            },
            error:function(data){
                alert('更新失败,请稍后再试');

            }
        })
    }
    /*计件薪资编辑 添加方法*/
    function jj_edit_add_fn(jj_id,jj_num) {
        var is_open=$(".zcj_jjxz_div .zcj_xz_is_open_jj_set").prop("checked") ? "1" : "2";
        // alert(is_open);
        var name='';
        if($(".zcj_input_jj_name").val()=='请输入计件名称'){
            name='';
        }else{
            name=$(".zcj_input_jj_name").val();

        }
        var money='';
        if($(".zcj_input_jj_price_num").val()=='请输入计件名称'){
            money='';
        }else{
            money=$(".zcj_input_jj_price_num").val()
        }
        $.ajax({
            type: "post",
            url: SERVER_URL + "/system-wage/add",
            data: {
                token: token,
                id:jj_id,
                category: jj_num,
                is_open:is_open,
                name:name,
                money:money
            },
            dataType: 'json',
            success: function (data) {

                console.log(data);

                if(data.code==0){
                    jjxz_set_list_fn();
                    $(".tanceng .zcj_jjtc_add_table_info").find('.dialog_close').click();
                }else{
                    alert(data.msg);
                }

            }
        })
    }
    /*计件薪资设定*/

    $("#zcj_wage_jj_set_tab").die().live("click",function(){
        /*设定列表*/
         jjxz_set_list_fn();
         /*设定编辑*/
         $(".zcj_jjxz_edit_btn").die().live("click",function(){
             var jj_id=$(this).data('id');

             /*计件查看*/
             $.ajax({
                 type: "get",
                 url: SERVER_URL + "/system-wage/infobyid",
                 data: {
                     token: token,
                     id:jj_id
                 },
                 dataType: 'json',
                 success: function (data) {
                     console.log('500');
                     console.log(data);
                     console.log('500');
                     if(data.code==0){
                         if(data['data']['is_open']==1){
                            $(".tanceng .zcj_is_jj_set_open").attr('checked',true);
                         }else{
                             $(".tanceng .zcj_is_jj_set_open").attr('checked',false);
                         }
                          $(".zcj_input_jj_name").val(data['data']['name']);
                         $(".zcj_input_jj_price_num").val(data['data']['money']);
                     }else{
                         alert(data.msg);
                     }

                 }
             })
             /*编辑确定*/
             $(".tanceng .zcj_jjxz_set_edit_btn").die().live("click",function(){
                 jj_edit_add_fn(jj_id,2)
             });

         });
        /*删除*/
        $(".zcj_jjxz_del_btn").die().live("click",function () {
            var jj_del=$(this).data('id');
            $.ajax({
                type: "get",
                url: SERVER_URL + "/system-wage/del",
                data: {
                    token: token,
                    id:jj_del
                },
                dataType: 'json',
                success: function (data) {

                    console.log(data);

                    if(data.code==0){
                        alert(data.msg);
                        jjxz_set_list_fn();

                    }else{
                        alert(data.msg);
                    }

                }
            })
        });
        /*薪资设定确认*/
        $(".zcj_jjxz_set_tj_end_btn").die().live("click",function(){
             $(".tanceng .zcj_jjxz_set_edit_btn").die().live("click",function(){
                 jj_edit_add_fn('',2)
             });

        });
    });
    /*任务薪资设定列表方法*/
    function rwxz_set_list_fn(){
        $.ajax({
            type: "get",
            url: SERVER_URL + "/system-wage/list",
            data:{
                token:token,
                category:3
            },
            dataType: 'json',
            success: function (data) {
                console.log('000');
                console.log(data);
                console.log('000');

                var html='';
                $.each(data['dataList'],function(index,temlist){
                    html+='<div style="overflow: hidden;"> <div class="left" style="width: 75%;">'
                    html+='<div class="t_textarea xt_xzset_choose relative" style="display: none">'
                    html+='<label class="c_3"><input type="checkbox" class="zcj_is_for_kqgz_true" '+(temlist['is_open']=='1' ? 'checked="checked"' : '')+' value=""/>是否开启任务工资</label> <p class="grey_input" style="font-size: 12px;margin-left:20px;"><i class="c_r">*</i>开启后接到任务未按时完成的情况下会扣除绩效工资</p>'
                    html+='</div>'
                    /*html+='<div class="zcj_rwxz_set_list_dis_show">'*/
                    html+='<div class="xt_xzset_jijian relative">'
                    html+='<i class="sys_sp_close none"></i>'
                    html+='<div class="t_textinput xt_xzset_con xt_xzset_conTC">'
                    html+='<div class="t_left t_left_conrow"><i class="c_r">*</i>任务薪资<span class="page_53_tcNum">'+(index+1)+'</span>名称</div>'
                    html+='<div class="t_right">'
                    html+='<input type="text" class="time_input zcj_rwxz_name_put_show" disabled="disabled" value="'+temlist['name']+'" onfocus="fn_focus(this);" onblur="fn_blur(this);">'
                    html+='</div></div>'
                    html+='<div class="t_textinput xt_xzset_con xt_xzset_conxw">'
                    html+='<div class="t_left t_left_conrow"><i class="c_r v_hidden">*</i>未完成扣除金额</div>'
                    html+='<div class="t_right clearfix">'
                    html+='<div class="t_textinput inline_block left" style="width: 49%">'
                    html+='<div class="t_right" style="">'
                    html+='<input type="text" class="time_input c_3 inp_96 zcj_rwzc_num_put_show" disabled="disabled" value="'+temlist['times']+'"> <i class="unit" style="right: -10px;">次</i>'
                    html+='</div> </div>';
                    html+='<div class="t_textinput inline_block right" style="width: 49%">';
                    html+='<div class="t_right">';
                    html+='<input type="text" class="time_input c_3 inp_96 zcj_rwzc_price_put_show" disabled="disabled" value="'+temlist['times_money']+'"> <i class="unit" style="right: -10px;">元</i>';
                    html+='</div> </div> </div> </div></div> </div>';
                    html+='<div class="right" style="width: 25%;"> <button class="but_exit but_mix val_dialog zcj_rwxz_bj_edit_btn" data-id="'+temlist['id']+'" name="system_exit_tjrwsd">编辑</button> <button class="but_r but_mix zcj_rwxz_bj_del_btn" data-id="'+temlist['id']+'">删除</button> </div>'
                    html+='</div>'
                    html+='<hr style="margin:30px 0;">';
                    html+='</div>';
                })
                $(".zcj_rwxz_set_list_dis_show").html(html);
                var setrw='';
                var open=$(".zcj_rwxz_set_list_dis_show .zcj_is_for_kqgz_true").eq(0).prop("checked");
                if(open){
                    $(".zcj_rwxz_div .zcj_xzset_is_kqrw_gz").attr('checked',true);

                }else{
                    $(".zcj_rwxz_div .zcj_xzset_is_kqrw_gz").attr('checked',false);

                }

                $(".zcj_xzset_is_kqrw_gz").html(setrw);
            },
            error:function(data){
                alert('更新失败,请稍后再试');

            }
        })
    }
    /*任务薪资编辑 添加方法*/
    function rw_edit_add_fn(jj_id,jj_num) {
        var is_open=$(".zcj_rwxz_div .zcj_xzset_is_kqrw_gz").prop("checked") ? "1" : "2";
        // alert(is_open);

        var name=$(".zcj_rwxz_name_show_put").val();
        var times=$(".zcj_rwxz_cs_num_show_put").val();
        var times_money=$(".zcj_rwxz_cs_price_show_put").val();
        $.ajax({
            type: "post",
            url: SERVER_URL + "/system-wage/add",
            data: {
                token: token,
                id:jj_id,
                category: jj_num,
                is_open:is_open,
                name:name,
                times:times,
                times_money:times_money
            },
            dataType: 'json',
            success: function (data) {

                console.log(data);

                if(data.code==0){
                    rwxz_set_list_fn();
                    $(".tanceng .zcj_rwxz_set_table_info").find('.dialog_close').click();
                }else{
                    alert(data.msg);
                }

            }
        })
    }
    /*任务薪资设定*/
    $("#zcj_wage_rw_set_tab").die().live("click",function(){
        /*任务薪资列表*/
        rwxz_set_list_fn()
        /*任务薪资编辑*/
       $(".zcj_rwxz_bj_edit_btn").die().live("click",function(){
           var rw_bj=$(this).data('id');
           /*任务查看*/
           $.ajax({
               type: "get",
               url: SERVER_URL + "/system-wage/infobyid",
               data: {
                   token: token,
                   id:rw_bj
               },
               dataType: 'json',
               success: function (data) {
                   console.log('50000');
                   console.log(data);
                   console.log('50000');
                   if(data.code==0){
                       if(data['data']['is_open']==1){
                           $(".tanceng .zcj_rw_is_open_gz_set").attr('checked',true);
                       }else{
                           $(".tanceng .zcj_rw_is_open_gz_set").attr('checked',false);
                       }
                       $(".zcj_rwxz_name_show_put").val(data['data']['name']);
                       $(".zcj_rwxz_cs_num_show_put").val(data['data']['times']);
                       $(".zcj_rwxz_cs_price_show_put").val(data['data']['times_money']);
                   }else{
                       alert(data.msg);
                   }

               }
           })
           /*编辑确认*/
           $(".zcj_rwxz_set_end").die().live("click",function () {
               rw_edit_add_fn(rw_bj,3);
           });

       });
       /*删除*/
       $(".zcj_rwxz_bj_del_btn").die().live("click",function () {
           var rw_del=$(this).data('id');
           $.ajax({
               type: "get",
               url: SERVER_URL + "/system-wage/del",
               data: {
                   token: token,
                   id:rw_del
               },
               dataType: 'json',
               success: function (data) {

                   console.log(data);

                   if(data.code==0){
                       alert(data.msg);
                       rwxz_set_list_fn();

                   }else{
                       alert(data.msg);
                   }

               }
           })
       });
        /*任务薪资设定确认*/
        $(".zcj_tianjia_rw_wc_end_btn").die().live("click",function () {
                $(".tanceng .zcj_rwxz_set_end").die().live("click",function(){
                    rw_edit_add_fn('',3);
                });
        });
    });




});