/*财务设置*/
$(function(){
    //var SERVER_URL="http://192.168.0.167:9091";
    var token=Admin.get_token();
  var department_id = localStorage.getItem("department_id");
   var company_id = localStorage.getItem("usercompany_id");
    // token = '2017052516045457073-1-1';
    //cmpyid = '1';
   var uid = Admin.get_uid();

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
    /*截取时间*/
    function subTime(time){
        if(time!='' && time!=null && time!=undefined){
            var newtime = time.substr(0,10);
        }

        return newtime;
    }
    /*树形列表*/
    function tree_list_fn() {
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
                    $(".tanceng .zcj_xz_tsr_tc_tree_list").html(head+tree_list_bmfzr(data, deep));
                }else{
                    alert(data.msg);
                }

            },
            error:function(data){
                alert(data);
            }
        });
    }
    /*显示列表方法*/
    function show_tsr_list_fn(){
        $(".zj_sk_sktsr_list_icon_show .zj_set_tsr_li").remove();
        $(".zj_sk_fktsr_list_icon_show .zj_set_tsr_li").remove();
        $(".zj_sk_xfptsr_list_icon_show .zj_set_tsr_li").remove();
        $(".zj_sk_jxfptsr_list_icon_show .zj_set_tsr_li").remove();
        $.ajax({
            url: SERVER_URL + '/system-financial/list',
            type: 'post',
            data: {
                token: token
            },
            success: function (data) {
                var datalist = JSON.parse(data);
                console.log(datalist);
                if(datalist.code==0){
                    if(datalist['data']['shoukuan_name']!=''){
                        var sktsr = '<li class="zj_set_tsr_li" data-id="'+datalist['data']['shoukuan_id']+'"><i class="del_img_1" data-id="' + datalist['data']['id'] + '">-</i><em class="icon_personBtn icon_personBtn_msg val_dialogTop zj_sk_sktsr_add_person_btn" data-id="' + datalist['data']['id'] + '" name="xt_sp_dxry"></em><em class="icon_adderBtn"></em><p class="box_adderName">' + datalist['data']['shoukuan_name'] + '</p></li>'

                        $(".zj_sk_sktsr_list_icon_show").prepend(sktsr);
                        $(".zj_sktsr_list_li_show").hide()
                    }else{
                        $(".zj_sktsr_list_li_show").show()
                    }
                    if(datalist['data']['pay_name']!=''){
                        var fktsr = '<li class="zj_set_tsr_li" data-id="'+datalist['data']['pay_id']+'"><i class="del_img_1" data-id="' + datalist['data']['id'] + '">-</i><em class="icon_personBtn icon_personBtn_msg val_dialogTop zj_sk_fktsr_add_person_btn" name="xt_sp_dxry"></em><em class="icon_adderBtn"></em><p class="box_adderName">' + datalist['data']['pay_name'] + '</p></li>'
                        //$(".zj_sk_fktsr_add_person_btn").attr('data-id', datalist['data']['id'])
                        $(".zj_sk_fktsr_list_icon_show").prepend(fktsr);
                        $(".zj_fktsr_list_li_show").hide()
                    }else{
                        $(".zj_fktsr_list_li_show").show()
                    }
                    if(datalist['data']['xiao_name']!=''){
                        var xfptsr = '<li class="zj_set_tsr_li" data-id="'+datalist['data']['xiao_id']+'"><i class="del_img_1" data-id="' + datalist['data']['id'] + '">-</i><em class="icon_personBtn icon_personBtn_msg val_dialogTop zj_sk_xfptsr_add_person_btn" name="xt_sp_dxry"></em><em class="icon_adderBtn"></em><p class="box_adderName">' + datalist['data']['xiao_name'] + '</p></li>'

                        $(".zj_sk_xfptsr_list_icon_show").prepend(xfptsr);
                        $(".zj_xfptsr_list_li_show").hide()
                    }else{
                        $(".zj_xfptsr_list_li_show").show()
                    }
                    if(datalist['data']['jin_name']!=''){
                        var jxfptsr = '<li class="zj_set_tsr_li" data-id="'+datalist['data']['jin_id']+'"><i class="del_img_1" data-id="' + datalist['data']['id'] + '">-</i><em class="icon_personBtn icon_personBtn_msg val_dialogTop zj_sk_jxfptsr_add_person_btn" name="xt_sp_dxry"></em><em class="icon_adderBtn"></em><p class="box_adderName">' + datalist['data']['jin_name'] + '</p></li>'
                        //$(".zj_sk_jxfptsr_add_person_btn").attr('data-id', datalist['data']['id'])
                        $(".zj_sk_jxfptsr_list_icon_show").prepend(jxfptsr);
                        $(".zj_jxfptsr_list_li_show").hide();
                    }else{
                        $(".zj_jxfptsr_list_li_show").show();
                    }
                    $(".zj_sk_sktsr_add_person_btn").attr('data-id', datalist['data']['id'])
                    $(".zj_sk_fktsr_add_person_btn").attr('data-id', datalist['data']['id'])
                    $(".zj_sk_xfptsr_add_person_btn").attr('data-id', datalist['data']['id'])
                    $(".zj_sk_jxfptsr_add_person_btn").attr('data-id', datalist['data']['id'])
                }else{
                    alert(data.msg)
                }


            }
        })
    }
   /**************************设置推送人***********************/
$("#zcj_finance_tsr_tx_remind").die().live("click",function(){

    show_tsr_list_fn();
            /*删除更新*/
            var del_data={
                token:token,
                id:'',
                company_id:company_id,//公司id
                shoukuan_id:'',
                pay_id:'',
                xiao_id:'',
                jin_id:'',
                up:1//1为更新0为获取信息
            }
            function del_data_list_fn() {
                $.ajax({
                    type: 'post',
                    url: SERVER_URL + "/system-financial/edit",
                    data:del_data,
                    dataType: "json",
                    success: function (data) {
                        console.log(data);
                        if(data.code==0){
                            //$(".zj_xz_kcyj_ckr_li_btn").show();
                            show_tsr_list_fn()
                        }else{
                            alert(data.msg);
                        }

                    },
                    error:function(data){
                        alert(data);
                    }
                });
            }
            /*收款*/
            $(".zj_sk_sktsr_list_icon_show .del_img_1").die().live("click",function(){
                var sk_id=$(this).data('id');

                del_data.shoukuan_id=0;
                del_data.pay_id=$(".zj_sk_fktsr_list_icon_show .zj_set_tsr_li").data('id');
                del_data.xiao_id=$(".zj_sk_xfptsr_list_icon_show .zj_set_tsr_li").data('id');
                del_data.jin_id=$(".zj_sk_jxfptsr_list_icon_show .zj_set_tsr_li").data('id');
                del_data.id=sk_id;
                del_data_list_fn();
            });
            /*付款*/
            $(".zj_sk_fktsr_list_icon_show .del_img_1").die().live("click",function(){
                var fk_id=$(this).data('id');
                del_data.pay_id=0;
                del_data.shoukuan_id=$(".zj_sk_sktsr_list_icon_show .zj_set_tsr_li").data('id');
                del_data.xiao_id=$(".zj_sk_xfptsr_list_icon_show .zj_set_tsr_li").data('id');
                del_data.jin_id=$(".zj_sk_jxfptsr_list_icon_show .zj_set_tsr_li").data('id');
                del_data.id=fk_id;
                del_data_list_fn();
            });
            /*销项发票*/
            $(".zj_sk_xfptsr_list_icon_show .del_img_1").die().live("click",function(){
                var xx_id=$(this).data('id');
                del_data.xiao_id=0;
                del_data.shoukuan_id=$(".zj_sk_sktsr_list_icon_show .zj_set_tsr_li").data('id');
                del_data.pay_id=$(".zj_sk_fktsr_list_icon_show .zj_set_tsr_li").data('id');
                del_data.jin_id=$(".zj_sk_jxfptsr_list_icon_show .zj_set_tsr_li").data('id');
                del_data.id=xx_id;
                del_data_list_fn();
            });
            /*进项发票*/
            $(".zj_sk_jxfptsr_list_icon_show .del_img_1").die().live("click",function(){
                var jx_id=$(this).data('id');
                del_data.jin_id=0;
                del_data.shoukuan_id=$(".zj_sk_sktsr_list_icon_show .zj_set_tsr_li").data('id');
                del_data.xiao_id=$(".zj_sk_xfptsr_list_icon_show .zj_set_tsr_li").data('id');
                del_data.pay_id=$(".zj_sk_fktsr_list_icon_show .zj_set_tsr_li").data('id');
                del_data.id=jx_id;
                del_data_list_fn();
            });
            /*编辑方法*/
            var add_edit_data={
                token:token,
                id:'',
                company_id:company_id,//公司id
                shoukuan_id:'',
                pay_id:'',
                xiao_id:'',
                jin_id:'',
                up:1//1为更新0为获取信息
            }
            function add_edit_fn(){
                $.ajax({
                    type: 'post',
                    url: SERVER_URL + "/system-financial/edit",
                    data:add_edit_data,
                    dataType: "json",
                    success: function (data) {
                        console.log(data);
                        if(data.code==0){
                            $('.tanceng .zj_tc_content_addry_box').find('.dialog_close').click();
                            /* $(".zj_select_csr_icon_show").prepend(html);*/
                            show_tsr_list_fn();
                        }else{
                            alert(data.msg);
                        }

                    },
                    error:function(data){
                        alert(data);
                    }
                });
            }
            /*add添加*/
            $(".zj_sk_sktsr_add_person_btn").die().live("click",function () {
                var tid=$(this).data('id');

                tree_list_fn();
                /*收款*/
                $(".tanceng .zcj_select_spr_person_end_btn").die().live("click",function(){

                    var tsrid=$(".tanceng .zcj_xz_tsr_tc_tree_list li.on").attr('userinfoid');

                    var sprname=$(".tanceng .zcj_xz_tsr_tc_tree_list li.on").children('.list_msg').text();
                    if(tid=='undefined'){
                        add_edit_data.id='';
                    }else{
                        add_edit_data.id=tid;
                    }
                    add_edit_data.jin_id=$(".zj_sk_jxfptsr_list_icon_show .zj_set_tsr_li").data('id');
                    add_edit_data.xiao_id=$(".zj_sk_xfptsr_list_icon_show .zj_set_tsr_li").data('id');
                    add_edit_data.pay_id=$(".zj_sk_fktsr_list_icon_show .zj_set_tsr_li").data('id');
                    add_edit_data.shoukuan_id=tsrid;
                    add_edit_fn();
                });

            });
            /*付款*/
            /*add添加*/
            $(".zj_sk_fktsr_add_person_btn").die().live("click",function () {
                var fid=$(this).data('id');

                //del_data.pay_id=$(".zj_sk_fktsr_list_icon_show .zj_set_tsr_li").data('id');
                tree_list_fn();
                /*收款*/
                $(".tanceng .zcj_select_spr_person_end_btn").die().live("click",function(){

                    var tsrid=$(".tanceng .zcj_xz_tsr_tc_tree_list li.on").attr('userinfoid');

                    var sprname=$(".tanceng .zcj_xz_tsr_tc_tree_list li.on").children('.list_msg').text();
                    if(fid=='undefined'){
                        add_edit_data.id='';
                    }else{
                        add_edit_data.id=fid;
                    }
                    add_edit_data.jin_id=$(".zj_sk_jxfptsr_list_icon_show .zj_set_tsr_li").data('id');
                    add_edit_data.shoukuan_id=$(".zj_sk_sktsr_list_icon_show .zj_set_tsr_li").data('id');
                    add_edit_data.xiao_id=$(".zj_sk_xfptsr_list_icon_show .zj_set_tsr_li").data('id');
                    add_edit_data.pay_id=tsrid;
                    add_edit_fn();
                });

            });

            /*销项发票*/
            /*add添加*/
            $(".zj_sk_xfptsr_add_person_btn").die().live("click",function () {
                var xid=$(this).data('id');

                tree_list_fn();
                /*收款*/
                $(".tanceng .zcj_select_spr_person_end_btn").die().live("click",function(){

                    var tsrid=$(".tanceng .zcj_xz_tsr_tc_tree_list li.on").attr('userinfoid');

                    var sprname=$(".tanceng .zcj_xz_tsr_tc_tree_list li.on").children('.list_msg').text();
                    if(xid=='undefined'){
                        add_edit_data.id='';
                    }else{
                        add_edit_data.id=xid;
                    }
                    add_edit_data.jin_id=$(".zj_sk_jxfptsr_list_icon_show .zj_set_tsr_li").data('id');
                    add_edit_data.shoukuan_id=$(".zj_sk_sktsr_list_icon_show .zj_set_tsr_li").data('id');
                    add_edit_data.pay_id=$(".zj_sk_fktsr_list_icon_show .zj_set_tsr_li").data('id');
                    add_edit_data.xiao_id=tsrid;
                    add_edit_fn();
                });

            });
            /*进项发票*/
            /*add添加*/
            $(".zj_sk_jxfptsr_add_person_btn").die().live("click",function () {
                var jid=$(this).data('id');
                //del_data.jin_id=$(".zj_sk_jxfptsr_list_icon_show .zj_set_tsr_li").data('id');

                tree_list_fn();
                /*收款*/
                $(".tanceng .zcj_select_spr_person_end_btn").die().live("click",function(){

                    var tsrid=$(".tanceng .zcj_xz_tsr_tc_tree_list li.on").attr('userinfoid');

                    var sprname=$(".tanceng .zcj_xz_tsr_tc_tree_list li.on").children('.list_msg').text();
                    if(jid=='undefined'){
                        add_edit_data.id='';
                    }else{
                        add_edit_data.id=jid;
                    }
                    add_edit_data.shoukuan_id=$(".zj_sk_sktsr_list_icon_show .zj_set_tsr_li").data('id');
                    add_edit_data.xiao_id=$(".zj_sk_xfptsr_list_icon_show .zj_set_tsr_li").data('id');
                    add_edit_data.pay_id=$(".zj_sk_fktsr_list_icon_show .zj_set_tsr_li").data('id');
                    add_edit_data.jin_id=tsrid;
                    add_edit_fn();
                });

            });



});

    $("#zcj_finance_tsr_tx_remind").trigger('click')
/*********************收款提醒************************/
$("#zcj_finance_sk_tx_remind").die().live("click",function(){

    $.ajax({
        url: SERVER_URL + '/receipt/getwarning',
        type: 'GET',
        data: {
            token: token,
            thetype:1
        },
        success: function (e) {
            // 将返回值转换为json对象
            var oE = eval("(" + e + ")");
            console.log('123');
            console.log(oE);
            console.log('123');
            if(oE['datalist']!=null){
                if(oE['datalist']['is_open']==2){
                    $(".zcj_is_open_kq_tx").attr("checked",true)
                    $(".zcj_tq_day_num").attr('disabled',false)
                }else{
                    $(".zcj_is_open_kq_tx").attr("checked",false)
                    $(".zcj_tq_day_num").attr('disabled',true)
                }
                $(".zcj_tq_day_num").val(oE['datalist']['day']);
            }
        }
    });
    $(".zcj_is_open_kq_tx").die().live("click",function(){
        if($(this).is(':checked')){
            $(".zcj_tq_day_num").attr('disabled',false)
        }else{
            $(".zcj_tq_day_num").attr('disabled',true)
        }
    });
});

/*收款提醒设置*/
$(".zcj_sk_tx_set_end_btn").die().live("click",function(){
    var is_open;
    if($(".zcj_is_open_kq_tx").is(':checked')){
        is_open=2;
    }else{
        is_open=1;
    }
var day=$(".zcj_tq_day_num").val();

    $.ajax({
        url: SERVER_URL + '/receipt/setwarning',
        type: 'post',
        data: {
            token: token,
            is_open:is_open,
            day:day,
            thetype:1
        },
        success: function (e) {
            // 将返回值转换为json对象
            var oE = eval("(" + e + ")");
            console.log('123');
            console.log(oE);
            console.log('123');
            if(oE.code==0){
                alert(oE.msg)
            }else{
                alert(oE.msg)
            }
        }
    });
});
/***************付款提醒****************/
$("#zcj_finance_fk_remind").die().live("click",function(){

    $.ajax({
        url: SERVER_URL + '/receipt/getwarning',
        type: 'GET',
        data: {
            token: token,
            thetype:2
        },
        success: function (e) {
            // 将返回值转换为json对象
            var oE = eval("(" + e + ")");
            console.log('123');
            console.log(oE);
            console.log('123');
            if(oE.code==0){
                if(oE['datalist']!=null){
                    if(oE['datalist']['is_open']==2){
                        $(".zcj_fk_tx_if_open").attr("checked",true);
                        $(".zcj_fktx_day_num").attr("disabled",false);
                    }else{
                        $(".zcj_fk_tx_if_open").attr("checked",false)
                        $(".zcj_fktx_day_num").attr("disabled",true);
                    }
                    $(".zcj_fktx_day_num").val(oE['datalist']['day']);
                }else{
                    $(".zcj_fk_tx_if_open").attr("checked",false)
                    $(".zcj_fktx_day_num").attr("disabled",true);
                }
            }else{
                alert(data.msg);
            }

        }
    });
    $(".zcj_fk_tx_if_open").die().live("click",function(){
        if($(this).is(':checked')){
            $(".zcj_fktx_day_num").attr('disabled',false)
        }else{
            $(".zcj_fktx_day_num").attr('disabled',true)
        }
    });
});
    /***************付款提醒设置****************/
    $(".zcj_fktx_end_btn").die().live("click",function(){
        var is_open;
        if($(".zcj_fk_tx_if_open").is(':checked')){
            is_open=2;
        }else{
            is_open=1;
        }
        var day=$(".zcj_fktx_day_num").val();

        $.ajax({
            url: SERVER_URL + '/receipt/setwarning',
            type: 'post',
            data: {
                token: token,
                is_open:is_open,
                day:day,
                thetype:2
            },
            success: function (e) {
                // 将返回值转换为json对象
                var oE = eval("(" + e + ")");
                console.log('123');
                console.log(oE);
                console.log('123');
                if(oE.code==0){
                    alert(oE.msg)
                }else{
                    alert(oE.msg)
                }
            }
        });
    });
    /********************付票设置********************/
    $("#zcj_finance_fp_set").die().live("click",function(){
        $.ajax({
            url: SERVER_URL + '/receipt/getpayticket',
            type: 'GET',
            data: {
                token: token,
                thetype:1
            },
            success: function (e) {
                // 将返回值转换为json对象
                var oE = eval("(" + e + ")");
                console.log('123');
                console.log(oE);
                console.log('123');
                if(oE['datalist']!=null){
                    if(oE['datalist']['is_open']==2){
                        $(".zcj_fp_set_is_open").attr("checked",true);

                    }else{
                        $(".zcj_fp_set_is_open").attr("checked",false)

                    }
                    $(".zcj_fpset_day_statr").val(subTime(oE['datalist']['start_time']));
                    $(".zcj_fpset_day_end_time").val(subTime(oE['datalist']['end_time']));
                }
            }
        });

        $.ajax({
            url: SERVER_URL + '/receipt/getwarning',
            type: 'GET',
            data: {
                token: token,
                thetype:3
            },
            success: function (e) {
                // 将返回值转换为json对象
                var oE = eval("(" + e + ")");
                console.log('123');
                console.log(oE);
                console.log('123');
                if(oE['datalist']!=null){
                    if(oE['datalist']['is_open']==2){
                        $(".zcj_fp_tx_set_isopen").attr("checked",true)
                        $(".zcj_fp_ts_num_day_val").attr('disabled',false)
                    }else{
                        $(".zcj_fp_tx_set_isopen").attr("checked",false)
                        $(".zcj_fp_ts_num_day_val").attr('disabled',true)
                    }
                    $(".zcj_fp_ts_num_day_val").val(oE['datalist']['day']);

                }
            }
        });
        $(".zcj_fp_tx_set_isopen").die().live("click",function(){
            if($(this).is(":checked")){
                $(".zcj_fp_ts_num_day_val").attr('disabled',false)
            }else{
                $(".zcj_fp_ts_num_day_val").attr('disabled',true)
                alert('1');
            }
        });
    });
    /*付票设置确认*/
    $(".zcj_fp_wcset_end_btn").die().live("click",function(){
        if($(".zcj_fp_set_is_open").is(':checked')){
            // var is_open;
            // if($(".zcj_fp_set_is_open").is(':checked')){
            //     is_open=2;
            // }else{
            //     is_open=1;
            // }
            var start_time=$(".zcj_fpset_day_statr").val();
            var end_time=$(".zcj_fpset_day_end_time").val();

            /*付票限制*/
            $.ajax({
                url: SERVER_URL + '/receipt/setpayticket',
                type: 'POST',
                data: {
                    token: token,
                    is_open:2,
                    start_time:start_time,
                    end_time:end_time,
                    thetype:1
                },
                success: function (e) {
                    // 将返回值转换为json对象
                    var oE = eval("(" + e + ")");
                    console.log('123');
                    console.log(oE);
                    console.log('123');

                }
            });
        }else{
            alert("请打开付票限制");
        }

        /*付票提醒*/
        if($(".zcj_fp_tx_set_isopen").is(':checked')){
            // var open;
            // if($(".zcj_fp_tx_set_isopen").is(':checked')){
            //     open=2;
            // }else{
            //     open=1;
            // }
            var day_num=$(".zcj_fp_ts_num_day_val").val();
            $.ajax({
                url: SERVER_URL + '/receipt/setwarning',
                type: 'POST',
                data: {
                    token: token,
                    is_open:2,
                    day:day_num,
                    thetype:3
                },
                success: function (e) {
                    // 将返回值转换为json对象
                    var oE = eval("(" + e + ")");
                    console.log('123');
                    console.log(oE);
                    console.log('123');

                }
            });
        }else{
            alert("请打开付票提醒");
        }

    });
    //发薪设置 - 参数
    var fncSalaryFxszData = {
        token: token,
        uid: uid,
        company_id: company_id,
        zhanghu: '',
        zhangmu: '',
        zhifu_type: ''
    };
    //发薪设置 - 选择账户
    $('.fnc_salary_fxsz_choose_account_company_btn').die().live('click', function () {

        $.ajax({
            url: SERVER_URL + '/company/list',
            type: 'GET',
            data: {token: token},
            success: function (e) {
                // 将返回值转换为json对象
                var oE = eval("(" + e + ")");
                console.log(oE);
                if (oE.code == 0) {
                    var datalist = oE.data.dataList;
                    var accountListHtml = '';
                    $.each(datalist, function (i, v) {
                        accountListHtml += '<li accountid="' + v['id'] + '">' + v['company_account_name'] + '</li>'
                    });
                    $('.fnc_salary_fxsz_choose_account_company_list_ul').html(accountListHtml);
                }
            }
        });
    });
    $('.fnc_salary_fxsz_choose_account_company_list_ul li').die().live('click', function () {
        fncSalaryFxszData.zhanghu = $(this).attr('accountid');
        $.ajax({
            url: SERVER_URL + '/accounts/list',
            type: 'GET',
            data: {
                token: token,
                company_account_id: fncSalaryFxszData.zhanghu
            },
            success: function (e) {
                // 将返回值转换为json对象
                var oE = eval("(" + e + ")");
                console.log(oE);
                if (oE.code == 0) {
                    var datalist = oE.datalist;
                    var accountListHtml = '';
                    $.each(datalist, function (i, v) {
                        accountListHtml += '<li accountid="' + v['id'] + '">' + v['name'] + '</li>'
                    });
                    $('.fnc_salary_fxsz_choose_account_list_ul').html(accountListHtml);
                }
            }
        });
    });
    //发薪设置 - 选择账目
    $('.fnc_salary_fxsz_choose_account_list_ul li').die().live('click', function () {
        fncSalaryFxszData.zhangmu = $(this).attr('accountid');
    });
    //发薪设置 - 选择支付方式
    $('.fnc_salary_fxsz_choose_zhifu_way_ul li').die().live('click', function () {

        fncSalaryFxszData.zhifu_type = $(this).index() + 1;
    });
$(".zcj_fx_set_accomplish_end_btn").die().live("click",function(){
    //账户必填
    if ($('.tanceng .fnc_salary_fxsz_choose_account_company_btn').val() == '请选择账户') {
        alert('请选择账户');
        return false;
    }
    //账目必填
    if ($('.tanceng .fnc_salary_fxsz_choose_account_btn').val() == '请选择账目') {
        alert('请选择账目');
        return false;
    }
    //账目必填
    if ($('.tanceng .fnc_salary_fxsz_choose_zhifu_way_inp').val() == '请选择支付方式') {
        alert('请选择支付方式');
        return false;
    }
    $.ajax({
        url: SERVER_URL + '/financial-salary/salary-set',
        type: 'POST',
        data: fncSalaryFxszData,
        success: function (e) {
            // 将返回值转换为json对象
            var oE = eval("(" + e + ")");
            console.log(oE);
            if (oE.code == 0) {
                alert('设置成功');
                $(this).closest('.dialog_box').remove();
               // $('.tanceng').css('display', 'none');
            }
        }
    });
});



})