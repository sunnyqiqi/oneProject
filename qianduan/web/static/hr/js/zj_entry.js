

$(function() {

    var token=Admin.get_token();

    var company_admin=localStorage.getItem("company_admin");
    /*var venCustomLookAbledField = [
        {'index': null, 'field': '名字'},
        {'index': null, 'field': '状态'},
        {'index': null, 'field': '入职时间'},
        {'index': null, 'field': '入职培训'},
        {'index': null, 'field': '技能培训'},
        {'index': null, 'field': '设定工资'},
        {'index': null, 'field': '社保'},
        {'index': null, 'field': '公司福利'},
        {'index': null, 'field': '操作'}

    ];
    likShow('.zj_table_end_info', venCustomLookAbledField,'.zj_check_zd_info','.zcj_save_info_btn','.zcj_hf_btn');*/

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
    //选择人员
//	dialog tree list person  选择人员  单选
    function tree_list_person(datalist, deep) {
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
                html += tree_list_person(data['children'], deep + 1);
            }
            $.each(data['user_info'], function (index2, data2) {
                var html_i_list_before = '<i class="list_before_span"></i>';
                for (var j = 0; j < deep + 1; j++) {
                    html_i_list_before += '<i class="list_before_span"></i>'
                }
                html += '<li class="left_2 person_left_nav" userinfoid="' + data2['id'] + '">' + html_i_list_before + '<span class="list_msg">' + data2['name'] + ' </span></li>'
            })

            html += '</li>';
            html += '</ul>';
            html += '</ul>'
        });
        return html
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
            if(data['children'].length>0){
                html += '<li class="left_1" data-id = "' + data["id"] + '" data-pid="' + data["pid"] + '" data-sort="'+data['sort']+'" data-name="' + data["name"] + '">' + html_i_list_before + '<span class="icon_open change_ba"></span><span class="icon_file"></span><span class="list_msg">' + data['name'] + '</span></li>';
            }else{
                html += '<li class="left_1" data-id = "' + data["id"] + '" data-pid="' + data["pid"] + '" data-sort="'+data['sort']+'" data-name="' + data["name"] + '">' + html_i_list_before + '<span class="change_ba"></span><span class="icon_file"></span><span class="list_msg">' + data['name'] + '</span></li>';
            }

            if (data['children'] && data['children'].length > 0) {
                html += tree_list_dialog(data['children'], deep + 1);
            }
            html += '</li>';
            html += '</ul>'
        });
        return html
    }
//点击刷新
//     $('.zcj_rzhibl_dl_sx_btn').live('click', function() {
//         add_Rload_index(18, 2) //参数页面值，父级值
//     })
    var powerUrls=localStorage.getItem("user_info_url");
    var power=JSON.parse(powerUrls);
    /*查看*/
    //var add_r="admin/add";//人员添加 修改
    var check_rz="admin/loadadmin";//查看
    var rz_b="admin/ruzhisave";//办理入职
    var bj_rz="admin/ruzhisave";//编辑




    /*删除按钮方法*/
    function delbtn(odv){
        $(odv).parent().parent().parent().remove();
        var num = $('.tanceng').children(".dialog_box").length;
        if(num < 1 ){
            $(".tanceng").hide();
        }
    }

    /*分页*/
    var perdata={
        token: token,
        page: 1,
        limit: 10,
        /* dept: "2",*/
        jobstatus: "1,2,3"
        /* down: "1",*/
        /*  data_type: "0"*/
    }
/*所有人员信息列表*/
    function  depart_staff_list(){
        $.ajax({
            type: 'post',
            url: SERVER_URL + "/admin/employeelist",
            data:perdata,
            dataType: "json",
            success: function (data) {
                $(".zcj_blrz_wbl_num").text(data.unBanliNum);
                // var w=parseInt(data.unBanliNum);
                // var y=parseInt(data.banliNum);
                // var z=w+y
                $(".zcj_blrz_zgbl_znum").text(data.totalCount);
                /*已办理数*/
                // $(".zj_bl_lz_count").text(data.banliNum);
                // /*未办理*/
                // $(".zj_bl_rz_count").text(data.unBanliNum);
                if(data['rows'].length>0){
                    $(".zcj_no_data_show_company_enter").hide();
                    $(".zcj_box_btn").show();
                    /* $(".hr_yidong").show();*/
                }else{
                    $(".zcj_no_data_show_company_enter").show();
                    $(".zcj_box_btn").hide();
                    /*$(".hr_yidong").hide();*/
                }
               console.log(data);
                // $(".z_blrz tr:first-child").siblings().empty();
               /* var html = "";*/

                var info = "";
                var html='';
                // var gz_set=''
                // var gzset_name=[];
                if(data.code==0){
                    for (var arr in data.rows) {
                        //去空

                        /*  html += "<li class='hr_left_2'><span>" + data.rows[arr].name + "</span></li>";*/
                        if (data.rows[arr].job_status == 1) {
                             // html += "<li class='hr_left_bmyg2 hr_left_2' wid="+ data.rows[arr].id +"><span>" + likNullData(data.rows[arr].name) + "</span></li>";
                            info += "<tr><td>" + likNullData(data.rows[arr].name) + "</td><td><span class='c_r'>未办理</span></td><td>" + (likNullData(data.rows[arr].workdate)=='0000-00-00' ? '-' : likNullData(data.rows[arr].workdate)) + "</td><td>" + likNullData(data.rows[arr]['entrytraining_name']) + "</td>"
                            var gz_set=''
                            var gzset_name=[];
                            gz_set=data.rows[arr]['wage'];

                            if(gz_set.indexOf(1)>-1){
                                gzset_name.push("基本工资");
                            }
                            if(gz_set.indexOf(2)>-1){
                                gzset_name.push("绩效");
                            }
                            if(gz_set.indexOf(3)>-1){
                                gzset_name.push("提成");
                            }
                            if(gz_set.indexOf(4)>-1){
                                gzset_name.push("团队提成");
                            }
                            if(gz_set.indexOf(5)>-1){
                                gzset_name.push("奖金");
                            }
                            if(gz_set.indexOf(6)>-1){
                                gzset_name.push("计件");
                            }
                            if(gz_set.indexOf(7)>-1){
                                gzset_name.push("任务绩效");
                            }
                            info+="<td>" + likNullData(gzset_name.toString()) + "</td>"
                            if(data.rows[arr].social_security_money>0 && data.rows[arr].fund_money<=0){
                                info+="<td>社保</td>"
                            }else
                            if(data.rows[arr].social_security_money<=0 && data.rows[arr].fund_money>0){
                                info+="<td>公积金</td>"
                            }else
                            if(data.rows[arr].social_security_money>0 && data.rows[arr].fund_money>0){
                                info+="<td>社保,公积金</td>"
                            }else{
                                info+="<td>-</td>"
                            }

                            info+="<td>" + likNullData(data.rows[arr].welfare) + "</td><td><button class='but_mix but_cancel but_green val_dialog zcj_entrybl' data-uid="+data.rows[arr].uid+" name='hr_blrz_ygrz' arr=" + data.rows[arr].id + ">办理入职</button></td></tr>"
                            /* $(".zcj_wrzhi_ry").empty().append(html)*/
                        } else if (data.rows[arr].job_status == 2) {
                              // html += "<li class='hr_left_bmyg2 hr_left_2' wid="+ data.rows[arr].id +"><span>" + likNullData(data.rows[arr].name) + "</span></li>";
                            info += "<tr><td>" + likNullData(data.rows[arr].name) + "</td>"
                            info+="<td><span class='c_y'>办理中</span></td><td>" + (likNullData(data.rows[arr].workdate)=='0000-00-00' ? '-' : likNullData(data.rows[arr].workdate)) + "</td>";
                            info+="<td>" + likNullData(data.rows[arr]['entrytraining_name']) + "</td>";
                            var gz_set=''
                            var gzset_name=[];
                            gz_set=data.rows[arr]['wage'];

                            if(gz_set.indexOf(1)>-1){
                                gzset_name.push("基本工资");
                            }
                            if(gz_set.indexOf(2)>-1){
                                gzset_name.push("绩效");
                            }
                            if(gz_set.indexOf(3)>-1){
                                gzset_name.push("提成");
                            }
                            if(gz_set.indexOf(4)>-1){
                                gzset_name.push("团队提成");
                            }
                            if(gz_set.indexOf(5)>-1){
                                gzset_name.push("奖金");
                            }
                            if(gz_set.indexOf(6)>-1){
                                gzset_name.push("计件");
                            }
                            if(gz_set.indexOf(7)>-1){
                                gzset_name.push("任务绩效");
                            }
                            info+="<td>" + likNullData(gzset_name.toString()) + "</td>"
                            if(data.rows[arr].social_security_money>0 && data.rows[arr].fund_money<=0){
                                info+="<td>社保</td>"
                            }else
                            if(data.rows[arr].social_security_money<=0 && data.rows[arr].fund_money>0){
                                info+="<td>公积金</td>"
                            }else
                            if(data.rows[arr].social_security_money>0 && data.rows[arr].fund_money>0){
                                info+="<td>社保,公积金</td>"
                            }else{
                                info+="<td>-</td>"
                            }
                            info+="<td>" + likNullData(data.rows[arr].welfare) + "</td> <td><button class='but_mix but_cancel but_green val_dialog zcj_entrybl' data-uid="+data.rows[arr].uid+" name='hr_blrz_ygrz' arr=" + data.rows[arr].id + ">办理入职</button></td></tr>"
                            /* $(".zcj_wrzhi_ry").empty().append(html)*/
                        } else if (data.rows[arr].job_status == 3) {
                            /* html += "<li class='hr_left_bmyg2 hr_left_2' yid="+ data.rows[arr].id +"><span>" + likNullData(data.rows[arr].name) + "</span></li>";*/
                            info += "<tr><td>" + likNullData(data.rows[arr].name) + "</td><td><span class='c_g'>已办理</span></td><td>" + (likNullData(data.rows[arr].workdate)=='0000-00-00' ? '-' : likNullData(data.rows[arr].workdate)) + "</td><td>" + likNullData(data.rows[arr]['entrytraining_name']) + "</td>"
                            var gz_set=''
                            var gzset_name=[];
                            gz_set=data.rows[arr]['wage'];

                            if(gz_set.indexOf(1)>-1){
                                gzset_name.push("基本工资");
                            }
                            if(gz_set.indexOf(2)>-1){
                                gzset_name.push("绩效");
                            }
                            if(gz_set.indexOf(3)>-1){
                                gzset_name.push("提成");
                            }
                            if(gz_set.indexOf(4)>-1){
                                gzset_name.push("团队提成");
                            }
                            if(gz_set.indexOf(5)>-1){
                                gzset_name.push("奖金");
                            }
                            if(gz_set.indexOf(6)>-1){
                                gzset_name.push("计件");
                            }
                            if(gz_set.indexOf(7)>-1){
                                gzset_name.push("任务绩效");
                            }
                            info+="<td>" + likNullData(gzset_name.toString()) + "</td>"
                            if(data.rows[arr].social_security_money>0 && data.rows[arr].fund_money<=0){
                                info+="<td>社保</td>"
                            }else
                            if(data.rows[arr].social_security_money<=0 && data.rows[arr].fund_money>0){
                                info+="<td>公积金</td>"
                            }else
                            if(data.rows[arr].social_security_money>0 && data.rows[arr].fund_money>0){
                                info+="<td>社保,公积金</td>"
                            }else{
                                info+="<td>-</td>"
                            }
                            info+="<td>" + likNullData(data.rows[arr].welfare) + "</td> <td><button class='but_mix but_cancel r_sidebar_btn zcj_hr_end_btn' checkid=" + data.rows[arr].id + " name='hr_blrz_ck'>查看</button><button class='but_mix but_cancel val_dialogTop zcj_yg_blrz_edit_info' name='hr_blrz_ygrz_bj' bjid=" + data.rows[arr].id + ">编辑</button></td></tr>"
                            /* $(".zcj_yrzhi_ry").empty().append(html)*/
                        }


                    }


                    $(".zcj_bl_rz_ry_data").html(info);
                    // $(".zcj_wrzhi_ry").html(html);
                    var znum=data.totalCount;
                    var cur=data.rows.length;

                    list_table_render_pagination(".zcj_box_btn", perdata, depart_staff_list, znum, cur);
                    $(".zcj_save_info_btn").trigger('click');
                    if(perdata.jobstatus=='1,2,3'){

                        /*总数*/
                        //$(".zcj_sear_count").html(data.totalCount);
                        /*未办理*/
                        $(".zcj_blrz_wbl_num").text(data.unBanliNum);
                        /*总共数*/
                        $(".zcj_blrz_zgbl_znum").html(data.totalCount);
                    }else if(perdata.jobstatus=='1,2'){
                        /*未办理*/
                        $(".zj_bl_rz_count").text(data.totalCount);

                    }else if(perdata.jobstatus=='3'){

                        /*已办理数*/
                        $(".zj_bl_lz_count").text(data.totalCount);

                    }
                    if(company_admin!=1){
                        /*查看*/
                        if($.inArray(check_rz,power)>-1){
                            $(".zcj_hr_end_btn").show();

                        }else{
                            $(".zcj_hr_end_btn").hide();

                        }
                        /*办理入职*/
                        if($.inArray(rz_b,power)>-1){
                            $(".zcj_entrybl").show();

                        }else{
                            $(".zcj_entrybl").hide();

                        }
                        /*编辑*/
                        if($.inArray(bj_rz,power)>-1){
                            $(".zcj_yg_blrz_edit_info").show();
                            $(".hr_Sideslip .but_exit").show();

                        }else{
                            $(".zcj_yg_blrz_edit_info").hide();
                            $(".hr_Sideslip .but_exit").hide();
                        }
                    }

                }else {
                    alert(data.msg);
                }


            }

        })
    }
    /*展示列表*/
    var left_fn={
        token: token,
        jobstatus: 3
    }
    /*已办理*/
function list_ry_show_fn(){
    $.ajax({
        type: 'get',
        url: SERVER_URL + "/dept/peoplecount",
        data: left_fn,
        dataType: "json",
        success: function (data) {
            console.log('1000002');
            console.log(data);
            console.log('1000002');
            /*已办理数*/
            $(".zj_bl_lz_count").text(data.banliNum);
             /*未办理*/
            $(".zj_bl_rz_count").text(data.unBanliNum);
             var whtml='';
            var yhtml='';
            $.each(data['rows'],function (index,ry_list) {

                /*if(ry_list['job_status']==1){
                    whtml += "<li class='hr_left_bmyg2 hr_left_2' wid="+ ry_list.id +"><span>" + likNullData(ry_list.name) + "</span></li>";

                }else if(ry_list['job_status']==2){
                    whtml += "<li class='hr_left_bmyg2 hr_left_2' wid="+ ry_list.id +"><span>" + likNullData(ry_list.name) + "</span></li>";

                }else if(ry_list['job_status']==3){*/

                    yhtml += "<li class='hr_left_bmyg2 hr_left_2' yid="+ ry_list.id +"><span>" + likNullData(ry_list.name) + "</span></li>";

                //}

            })

          /*  $(".zcj_wrzhi_ry").html(whtml);*/
            $(".zcj_yrzhi_ry").html(yhtml);
        }
    })
}

    list_ry_show_fn();
    depart_staff_list();
    var right_fn={
        token: token,
        jobstatus: '1,2'
    }
    /*未办理*/
    function list_wb_show_fn(){
        $.ajax({
            type: 'get',
            url: SERVER_URL + "/dept/peoplecount",
            data: right_fn,
            dataType: "json",
            success: function (data) {
                console.log('1000002');
                console.log(data);
                console.log('1000002');
                /*已办理数*/
                $(".zj_bl_lz_count").text(data.banliNum);
                /*未办理*/
                $(".zj_bl_rz_count").text(data.unBanliNum);
                var whtml='';
                var yhtml='';
                $.each(data['rows'],function (index,ry_list) {

                    if(ry_list['job_status']==1){
                        whtml += "<li class='hr_left_bmyg2 hr_left_2' wid="+ ry_list.id +"><span>" + likNullData(ry_list.name) + "</span></li>";

                    }else if(ry_list['job_status']==2) {
                        whtml += "<li class='hr_left_bmyg2 hr_left_2' wid=" + ry_list.id + "><span>" + likNullData(ry_list.name) + "</span></li>";
                    }
                    // }else if(ry_list['job_status']==3){
                    //
                    //     yhtml += "<li class='hr_left_bmyg2 hr_left_2' yid="+ ry_list.id +"><span>" + likNullData(ry_list.name) + "</span></li>";
                    //
                    // }

                })

                $(".zcj_wrzhi_ry").html(whtml);
                //$(".zcj_yrzhi_ry").html(yhtml);
            }
        })
    }
    list_wb_show_fn();
   //  /*所有员工*/
   //  $(".zj_all_end").die().live("click",function(){
   //
   //      perdata.jobstatus='1,2,3';
   //      perdata.wage='';
   //      perdata.social_security_money='';
   //      perdata.fund_money='';
   //      perdata.welfare='';
   //      perdata.id='';
   //      depart_staff_list();
   //      list_ry_show_fn();
   //  });
   // $(".zj_all_end").trigger('click');

    //	补零函数
    function repair(x) {
        return x < 10 ? '0' + x : x
    }
   /*培训下拉列表*/
   function px_list(vclass,datalist){
       var list="";
       var sort=0;
       $.each(datalist,function(index,editlist){
           sort=repair(index+1)
           list+='<li rzpx_id="'+editlist.id+'"><input type="checkbox"/><cite>入职培训'+sort+'<span>负责人：'+editlist.executor+'</span></cite><button class="but_mix but_look val_dialogTop right" name="hr_blrz_rzpxPre" style="margin-top: 3px;">预览</button></li>';

       });
       $(vclass).empty().append(list);
   }
   /*公司福利列表*/
   function gsfl_list(vclass,datalist){
       var list="";

       $.each(datalist,function(index,editlist){

           list+='<li><input type="checkbox" class="zcj_ygrz_bl_gsfl_xz" data-name="'+editlist['name']+'" value="" flid="'+editlist['id']+'"/><span>'+editlist['name']+'</span>&nbsp;&nbsp;'+editlist['money']+'元</li></li>';

       });
       $(vclass).empty().append(list);
   }
   /*公司福利数据展示*/
   function  data_list() {
       $.ajax({
           type: 'get',
           url: SERVER_URL + "/welfare/list",
           data:{
               token: token
           },
           dataType: "json",
           success: function (data) {
               console.log("000001");
               console.log(data);
               console.log("000001");
               if(data.code==0){
                   gsfl_list(".zcj_blrz_yg_fl_list_zs",data.datalist)
               }else{
                   alert(data.msg);
               }

           }
       })
   }
   /*入职培训列表数据显示方法*/
   function  px_list_show_fn(vclass){
       $.ajax({
           type: 'post',
           url: SERVER_URL + "/train/list",
           data:{
               token: token
           },
           dataType: "json",
           success: function (data) {
               console.log("000001");
               console.log(data);
               console.log("000001");
                if(data.code==0){
                    px_list(vclass,data.datalist)
                }else{
                    alert(data.msg);
                }


           }
       })
   }
   /*入职培训编辑列表*/
   function edit_list_show(vclass,datalist){
       var html="";

       $.each(datalist,function(index,editlist){

           html+='<tr><td><input type="checkbox" data-id="'+editlist.id+'" data-name="'+editlist.name+'" name="hr_blru_rzpxExit"/></td><td>'+editlist.name+'</td> <td>'+editlist.executor+'</td> <td> <button class="but_mix but_exit val_dialogTop zcj_rzpx_bj_btn_gn" name="hr_blrz_bjbjrzpx" pxbj_id="'+editlist.id+'">编辑</button><button class="but_mix val_dialogTop but_look zcj_blrz_bj_ylzs_btn" name="hr_blrz_rzpxPre">预览</button><button class="but_mix but_r zcj_blrz_del_sc_btn">删除</button> </td> </tr>';
       });

       $(vclass).empty().append(html);
   }
   /*入职办理培训编辑列表数据显示*/
   function edit_list_data(vclass){
       $.ajax({
           type: 'post',
           url: SERVER_URL + "/train/list",
           data:{
               token: token
           },
           dataType: "json",
           success: function (data) {
               console.log(data);
               edit_list_show(vclass,data.datalist)
           },
           error:function(){
               alert('服务器错误，请稍后再试');
           }
       })
   }
    /*添加编辑福利数据列表*/
    function  bjfl_list_show_fn(){
        $.ajax({
            type: 'get',
            url: SERVER_URL + "/welfare/list",
            data:{
                token: token
            },
            dataType: "json",
            success: function (data) {
                console.log("000001111");
                console.log(data);
                console.log("000001");
                if(data.code==0){
                    edit_fl_list_fn(".zcj_yg_rzbl_fl_dy_list",data.datalist)
                }else{
                    alert(data.msg);
                }


            },
            error:function(){
                alert('服务器错误，请稍后再试');
            }
        })
    }
    /*编辑福利列表方法*/
    function edit_fl_list_fn(vclass,datalist){
        var html="";

        $.each(datalist,function(index,editlist){

            html+='<tr>';
            html+='<td>'+editlist['name']+'</td>';
            html+='<td>'+editlist['money']+'</td>';
            html+='<td><button class="but_mix val_dialogTop but_exit zcj_gsfl_edit_btn" name="hr_blrz_cbgzbzExit" editid="'+editlist['id']+'">编辑</button><button class="but_mix but_r but_delete zcj_ygrz_bjfl_del_btn">删除</button></td>';
            html+='</tr>';
        });

        $(vclass).empty().append(html);
    }
    /*员工权限列表*/
   function yg_limit_list_fn(){
       $.ajax({
           type: 'get',
           url: SERVER_URL + "/role/list",
           data:{
               token: token,
               num:1000,
               status:1
           },
           dataType: "json",
           success: function (data) {

               console.log(data);
            if(data.code==0){
                var html=''
                $.each(data['dataList'],function(index,staff_list){

                    html+='<li data-id="'+staff_list['id']+'"><cite><span>'+staff_list['role_name']+'</span></cite></li>'

                })
                $(".zcj_ygrz_staff_qx_list").html(html);
            }else{
                alert(data.msg);
            }


           },
           error:function(){
               alert('服务器错误，请稍后再试');
           }
       })
    }

    /*****************办理入职信息*******************/
    $(".zcj_entrybl").die().live("click",function(){
        var numid = $(this).attr("arr");
        setTimeout(function(){
            /*入职培训图片*/
            if($(".tanceng .zcj_select_rzpx_name_show").text()!=''){
                $(".zcj_blrzhi_px_img").show();
            }else{
                $(".zcj_blrzhi_px_img").hide();
            }
            /*设定工资图片*/
            if($(".tanceng .zcj_set_gz_name").text()!=''){
                $(".zcj_blrzhi_set_gz_img").show();
            }else{
                $(".zcj_blrzhi_set_gz_img").hide();
            }
        },200);
        /*员工信息*/
        $.ajax({
            type: 'get',
            url: SERVER_URL + "/admin/infobyid",
            data:{
                token: token,
                id:numid
            },
            dataType: "json",
            success: function (data) {
                console.log("000001000333333");
                console.log(data);
                console.log("000001033333333");
                /* $(".zcj_ygrz_end_rz_time").val(data.data.workdate);//入职时间*/
                if(data.code==0){
                    $(".zcj_name_info").text(data.data.name);
                }else{
                    alert(data.msg)
                }

                /*$(".zcj_set_gz_yg_zhize").val(data.data.ranking);
                $(".zcj_set_gz_yg_bm").val(data.data.deptname);*/
            },
            error:function(){
                alert('服务器错误，请稍后再试');
            }
        })
        /*权限列表*/
        yg_limit_list_fn();
        /*选择角色*/
        $(".zcj_ygrz_staff_qx_list li").die().live("click",function () {
            var roleid=$(this).data('id');

            $(".zcj_select_role_name_id").data('id',roleid)
        });

        /*入职培训列表*/
        px_list_show_fn(".zcj_rzbj_list_show");
        /*公司福利列表*/
        data_list();
        /*选择入职培训*/
        $(".zcj_rzbj_list_show li").die().live("click",function(){
           var px_id=$(this).attr("rzpx_id")
            $(".zcj_entry_px_name").val(px_id);
        });
        /*选择公司福利*/
        // var gsfl_id=[];
        // var gsfl_name=[];
        // $(".zcj_blrz_yg_fl_list_zs .zcj_ygrz_bl_gsfl_xz").die().live("click",function(){
        //     if($(this).is(":checked")){
        //         gsfl_id.push($(this).attr("flid"));
        //         gsfl_name.push($(this).next().text());
        //     }else{
        //         gsfl_id.splice($.inArray($(this).attr("flid"),gsfl_id),1);
        //         gsfl_name.splice($.inArray($(this).next().text(),gsfl_name),1);
        //
        //     }
        //
        //     console.log(gsfl_id);
        //     console.log(gsfl_name);
        // });

        /*办理入职编辑*/
        $(".zcj_blrz_edit_btn").die().live("click",function () {
            /*入职编辑数据展示*/
            edit_list_data(".zcj_bmpx_edit_list_show");


            /***************培训编辑按钮***************/
            $(".zcj_rzpx_bj_btn_gn").die().live("click",function(){
                var add_bj=$(this).attr("pxbj_id");
                $.ajax({
                    type: 'get',
                    url: SERVER_URL + "/train/loadtrain",
                    data:{
                        token: token,
                        id:add_bj
                    },
                    dataType: "json",
                    success: function (data) {
                        console.log("000001222");
                        console.log(data);
                        console.log("000001222");
                        if(data.code==0){
                            $(".zcj_bj_xg_bm_name").val(data.data.name);
                            $(".zcj_blrz_fzr_val_show").val(data.data.executor);
                            $("#zcj_blrzhi_fzr_id").val(data.data.id);
                            $(".zcj_px_nr_show_wb").val(data.data.content)

                        }else{
                            alert(data.msg);
                        }

                    },
                    error:function(){
                        alert('服务器错误，请稍后再试');
                    }
                })

                /*选择编辑负责人*/
                $(".zcj_add_person").live("click",function () {

                    /*入职培训列表*/
                    $.ajax({
                        type: 'get',
                        url: SERVER_URL + "/dept/deptlist",
                        data: {
                            token: token
                            /*   name:depname, */

                        },

                        dataType: "json",
                        success: function (data) {
                            console.log(data);
                            if(data.code==0){
                                var deep=0;
                                var head='<li class="left_all"><span class="icon_open change_ba"></span><span class="icon_file"></span><span class="list_msg">所有分类</span></li>';
                                $(".zcj_list_people").empty().html(head+tree_list_bmfzr(data));
                            }else{
                                alert(data.msg);
                            }

                        },
                        error:function(){
                            alert('服务器错误，请稍后再试');
                        }
                    });
                    /*负责人id*/
                    $(".zcj_list_people .person_left_nav").die().live("click",function(){
                        var pid=$(this).attr("userinfoid");
                        var name=$(this).find(".list_msg").text();
                        $(".zcj_blrz_xz_qr_btn").die().live("click",function () {
                            $("#zcj_blrzhi_fzr_id").val(pid);
                            $(".zcj_blrz_fzr_val_show").val(name).addClass('c_3');
                            delbtn(this);
                        });

                    });

                });
                var bjid=$(this).attr("pxbj_id");
                /*确认编辑*/
                $(".zcj_blrz_bj_end_qr_btn").die().live("click",function(){

                    var _this=this;
                    var name=$(".zcj_bj_xg_bm_name").val();
                    var executor=$("#zcj_blrzhi_fzr_id").val();
                    var content=$(".t_right .zcj_px_nr_show_wb").val();
                    $.ajax({
                        type: 'post',
                        url: SERVER_URL + "/train/add",
                        data: {
                            token: token,
                            id:bjid,
                            name:name,
                            executor:executor,
                            content:content
                        },

                        dataType: "json",
                        success: function (data) {
                            console.log(data);
                            if(data.code==0){
                                alert(data.msg);
                                edit_list_data(".zcj_bmpx_edit_list_show");
                                delbtn(_this)
                            }else{
                                alert(data.msg);
                            }

                        },
                        error:function(){
                            alert('服务器错误，请稍后再试');
                        }
                    });
                });
            });
            /*********************添加入职培训按钮******************/
            $(".zcj_rzpx_add_btn").die().live("click",function(){
                /*选择添加负责人*/
                $(".zcj_rzpx_xz_fzr_add").die().live("click",function(){
                    /*入职培训列表*/
                    $.ajax({
                        type: 'get',
                        url: SERVER_URL + "/dept/deptlist",
                        data: {
                            token: token
                            /*   name:depname, */

                        },

                        dataType: "json",
                        success: function (data) {
                            console.log('00000000000000000');
                            console.log(data);
                            console.log('00000000000000000');
                            //var deep=0;
                            var head='<li class="left_all"><span class="icon_open change_ba"></span><span class="icon_file"></span><span class="list_msg">所有分类</span></li>';
                            $(".zcj_list_people").html(head+tree_list_bmfzr(data));

                        },
                        error:function(){
                            alert('服务器错误，请稍后再试');
                        }
                    });
                    /*负责人id*/
                    $(".zcj_list_people .person_left_nav").die().live("click",function(){
                        var pid=$(this).attr("userinfoid");
                        var name=$(this).find(".list_msg").text();
                        $(".zcj_blrz_xz_qr_btn").die().live("click",function () {
                            $("#zcj_add_xz_hid_fzr_id").val(pid);
                            $(".zcj_rzpx_xzfzr_val_name").val(name).addClass('c_3');
                            delbtn(this);
                        });

                    });
                });
                /*添加入职培训*/
                $(".zcj_rzpx_add_px_end_btn").die().live("click",function(){
                    var _this=this;
                    var bm_name=$(".zcj_rzpx_add_tjrzpx_name").val();
                    var fzr_id=$("#zcj_add_xz_hid_fzr_id").val();
                    var content=$("#zcj_add_px_nr_text").val();
                    $.ajax({
                        type: 'post',
                        url: SERVER_URL + "/train/add",
                        data:{
                            token: token,
                            name:bm_name,//名称
                            executor:fzr_id,//负责人id
                            content:content,//内容
                            thetype:1//培训类型：1入职培训，2技能培训
                        },
                        dataType: "json",
                        success: function (data) {

                            console.log(data);
                            if(data.code==0){
                                alert(data.msg);
                                edit_list_data(".zcj_bmpx_edit_list_show");
                                delbtn(_this)
                            }else{
                                alert(data.msg);
                            }
                        },
                        error:function(){
                            alert('服务器错误，请稍后再试');
                        }
                    })
                });

            })
            /************************预览******************/
            $(".zcj_blrz_bj_ylzs_btn").die().live("click",function(){

               var yl_id=$(this).prev().attr("pxbj_id");
                    var _this=this;

                    $.ajax({
                        type: 'get',
                        url: SERVER_URL + "/train/loadtrain",
                        data:{
                            token: token,
                            id:yl_id

                        },
                        dataType: "json",
                        success: function (data) {

                            console.log(data);
                            if(data.code==0){

                               $(".zcj_blrz_mc_show_name").text(data.data.name);
                                $(".zcj_rzhi_px_fzr_tb").text(data.data.executor);
                                $(".zcj_rzpxnr_content_show").text(data.data.content);
                            }
                        },
                        error:function(){
                            alert('服务器错误，请稍后再试');
                        }

                    })

            })
            /************************删除********************/
            $(".zcj_blrz_del_sc_btn").die().live("click",function(){
                var d_this=this;
                var delid=$(this).prev().prev().attr("pxbj_id");
                $.ajax({
                    type: 'get',
                    url: SERVER_URL + "/train/deldata",
                    data:{
                        token: token,
                        id:delid
                    },
                    dataType: "json",
                    success: function (data) {

                        console.log(data);
                        if(data.code==0){
                            alert(data.msg);
                            bjfl_list_show_fn();
                            $(d_this).parent().parent().remove();
                        }else{
                            alert(data.msg);
                        }
                    },
                    error:function(){
                        alert('服务器错误，请稍后再试');
                    }

                })
            });
            /*确认入职培训编辑确认*/
            $(".tanceng .zcj_rzpx_end_but").die().live("click",function () {
                var px_name=[];
                var px_id=[];
                $(".tanceng .zcj_bmpx_edit_list_show input:checked").each(function(){
                    px_id.push($(this).data('id'));
                    px_name.push($(this).data('name'));
                })
                $(".zcj_select_rzpx_name_show").text(px_name.toString());
                $(".zcj_entry_px_name").val(px_id.toString())
                /*px_list_show_fn(".zcj_rzbj_list_show");*/
                $(this).parents('.dialog_content').find('.dialog_close').click();
            });
        });
         /******************办理入职设定工资按钮****************************/
         var gz_id=[];
         var gz_name=[];
         $(".zcj_set_end_rz_gz_btn").die().live("click",function(){
            /* var i_g=$(".zcj_yg_set_gz_fs input").eq(0).attr("art");*/
            // var uid=$(this).data('id',numid);
             console.log(numid);
             $.ajax({
                 type: 'get',
                 url: SERVER_URL + "/wage/infobyuid",
                 data:{
                     token: token,
                     uid:numid
                 },
                 dataType: "json",
                 success: function (data) {
                     console.log("办理入职设定工资");
                     console.log(data);
                     console.log("办理入职设定工资");
                     if(data.code==0){
                        /* if(data['data'].length>0){*/
                             $(".zcj_blrz_sdgz_end_btn").data('id',data.data.id)

                             $(".zcj_blrz_zgzi_ze_znum_val").val(data.data['total_num']);
                             $(".zcj_blrz_jbzi_znum_show").val(data.data['basic_num']);
                             $(".zcj_blrz_jxzi_se_show").val(data.data['kpi_num']);
                              $(".zcj_sygz_shu_e").text(data.data['test_num']);
                             $(".zcj_syq_start_time").val(data.data['test_begin_time']);
                             $(".zcj_syq_end_time").val(data.data['test_end_time']);
                            if(data.data['tcInfo']){
                                $(".zcj_ygrz_xztc_name_show").data('id',data.data['tcInfo']['id']).val(data.data['tcInfo']['name']); //提成id
                                $(".zcj_ygrz_tc_srze_num").val(data.data['tc_total_money']) //提成总额
                                $(".zcj_tc1_start_data_num").val(data.data['tcInfo']['tc1_begin_value']);
                                $(".zcj__tc1_end_data_num").val(data.data['tcInfo']['tc1_end_value']);
                                $(".zcj_tc1_tcbfb_data_num").val(data.data['tcInfo']['tc1_percent']);
                                $(".zcj_tc2_start_data_num").val(data.data['tcInfo']['tc2_begin_value']);
                                $(".zcj__tc2_end_data_num").val(data.data['tcInfo']['tc2_end_value']);
                                $(".zcj_tc2_tcbfb_data_num").val(data.data['tcInfo']['tc2_percent']);
                                $(".zcj_tc3_start_data_num").val(data.data['tcInfo']['tc3_begin_value']);
                                $(".zcj__tc3_end_data_num").val(data.data['tcInfo']['tc3_end_value']);
                                $(".zcj_tc3_tcbfb_data_num").val(data.data['tcInfo']['tc3_percent']);
                                $(".zcj_grtc4_start_data_num").val(data.data['tdtcInfo']['over_begin_value']);
                                $(".zcj_grtc4_end_data_num").val(data.data['tdtcInfo']['over_end_value']);
                                $(".zcj_grtc4_tcbfb_data_num").val(data.data['tdtcInfo']['over_percent']);
                                if(data.data['tdtcInfo']['time_type']==1){
                                    $(".zj_gr_an_year").text('按年度')
                                }else if(data.data['tdtcInfo']['time_type']==2){
                                    $(".zj_gr_an_year").text('按季度')
                                }else if(data.data['tdtcInfo']['time_type']==3){
                                    $(".zj_gr_an_year").text('按月度')
                                }
                                if(data.data['tdtcInfo']['task_type']==1){
                                    $(".zj_gr_an_profit").text('按流水')
                                }else if(data.data['tdtcInfo']['task_type']==2){
                                    $(".zj_gr_an_profit").text('按利润')
                                }
                                if(data.data['tdtcInfo']['ticheng_type']==1){
                                    $(".zj_gr_an_quarter").text('按年度')
                                }else if(data.data['tdtcInfo']['ticheng_type']==2){
                                    $(".zj_gr_an_quarter").text('按季度')
                                }else if(data.data['tdtcInfo']['ticheng_type']==3){
                                    $(".zj_gr_an_quarter").text('按月度')
                                }
                            }

                                if(data.data['tdtcInfo']){
                                    $(".zcj_ygrz_tdtc_name_show").data('id',data.data['tdtcInfo']['id']).val(data.data['tdtcInfo']['name']) //团队提成id
                                    $(".zcj_blrz_tdtc_rw_znum").val(data.data['tdtc_total_money']) //团队提成name
                                    $(".zcj_tdtc1_begin_num_val").val(data.data['tdtcInfo']['tc1_begin_value'])
                                    $(".zcj_tdtc1_end_num_val").val(data.data['tdtcInfo']['tc1_end_value'])
                                    $(".zcj_tdtc1_percent_num_val").val(data.data['tdtcInfo']['tc1_percent'])
                                    $(".zcj_tdtc2_begin_num_val").val(data.data['tdtcInfo']['tc2_begin_value'])
                                    $(".zcj_tdtc2_end_num_val").val(data.data['tdtcInfo']['tc2_end_value'])
                                    $(".zcj_tdtc2_percent_num_val").val(data.data['tdtcInfo']['tc2_percent'])
                                    $(".zcj_tdtc3_begin_num_val").val(data.data['tdtcInfo']['tc3_begin_value'])
                                    $(".zcj_tdtc3_end_num_val").val(data.data['tdtcInfo']['tc3_end_value'])
                                    $(".zcj_tdtc3_percent_num_val").val(data.data['tdtcInfo']['tc3_percent'])
                                    $(".zcj_tdtc4_start_data_num").val(data.data['tdtcInfo']['over_begin_value']);
                                    $(".zcj_tdtc4_end_data_num").val(data.data['tdtcInfo']['over_end_value']);
                                    $(".zcj_tdtc4_tcbfb_data_num").val(data.data['tdtcInfo']['over_percent']);
                                    if(data.data['tdtcInfo']['time_type']==1){
                                        $(".zj_an_year").text('按年度')
                                    }else if(data.data['tdtcInfo']['time_type']==2){
                                        $(".zj_an_year").text('按季度')
                                    }else if(data.data['tdtcInfo']['time_type']==3){
                                        $(".zj_an_year").text('按月度')
                                    }
                                    if(data.data['tdtcInfo']['task_type']==1){
                                        $(".zj_an_profit").text('按流水')
                                    }else if(data.data['tdtcInfo']['task_type']==2){
                                        $(".zj_an_profit").text('按利润')
                                    }
                                    if(data.data['tdtcInfo']['ticheng_type']==1){
                                        $(".zj_an_quarter").text('按年度')
                                    }else if(data.data['tdtcInfo']['ticheng_type']==2){
                                        $(".zj_an_quarter").text('按季度')
                                    }else if(data.data['tdtcInfo']['ticheng_type']==3){
                                        $(".zj_an_quarter").text('按月度')
                                    }

                                }

                                if(data.data['bonusInfo']){
                                    $(".zcj_jj_price_num_show").data('id',data.data['bonusInfo']['id']).val(data.data['bonusInfo']['money']) //奖金id
                                }

                             if(data.data['pieceInfo']){
                                 $(".zcj_blrz_jj_xz_jq_val").data('id',data.data['pieceInfo']['id']).val(data.data['pieceInfo']['name']) //计件id
                             }

                             if(data.data['pieceInfo']){
                                 $(".zcj_jj_price_number_show").val(data.data['pieceInfo']['money'])
                             }
                              if(data.data['taskInfo']){
                                  $(".zcj_blrz_rwjx_xz_jq_val").data('id',data.data['taskInfo']['id']).val(data.data['taskInfo']['name']) //任务id
                              }
                             if(data.data['taskInfo']){
                                 $(".zcj_rwjx_no_wc_num").val(data.data['taskInfo']['times']);
                             }
                              if(data.data['taskInfo']){
                                  $(".zcj_rwjx_no_wc_price").val(data.data['taskInfo']['times_money'])
                              }

                             if(data.data['test_num']>0){
                                 $(".zcj_is_for_kq_sygz").attr("checked",true);
                                 $(".zcj_jbgz_bl_val_sr").attr('disabled',false);
                                 var zgz=parseInt(data.data['total_num']);
                                 var syqz=parseInt(data.data['test_num'])
                                 var gzbl=syqz/zgz*100;

                                 $(".zcj_jbgz_bl_val_sr").val(gzbl);
                             }else{
                                 $(".zcj_is_for_kq_sygz").attr("checked",false);
                                 $(".zcj_jbgz_bl_val_sr").attr('disabled',true);
                                 $(".zcj_jbgz_bl_val_sr").val('');
                             }
                        /* }*/

                     }else{
                         alert(data.msg);
                     }

                 },
                 error:function(){
                     alert('服务器错误，请稍后再试');
                 }
             })
             /*总工资*/
             $(".tanceng .zcj_blrz_zgzi_ze_znum_val").live('keyup',function(){
                 var j_gz=Number($(".zcj_blrz_jbzi_znum_show").val());
                 var t_gz=Number($(this).val());
                 if(j_gz>0){
                     if(t_gz>j_gz){
                         $(".zcj_blrz_jxzi_se_show").val(t_gz-j_gz)
                     }else{
                         $(".zcj_blrz_jbzi_znum_show").val('');
                         $(".zcj_blrz_jxzi_se_show").val('');
                         alert("基本工资不能大于总工资");
                         return false;
                     }

                 }
             });
             /*基本工资*/
             $(".tanceng .zcj_blrz_jbzi_znum_show").live('keyup',function(){

                 var z_gz=Number($(".zcj_blrz_zgzi_ze_znum_val").val());
                 var d_gz=Number($(this).val());
                 var jx_gz=Number($('zcj_blrz_jxzi_se_show').val());
                 if(z_gz>0){
                     if( d_gz>z_gz){
                         alert('基本工资不能大于总工资数额');
                         $(this).val('')

                     }else{
                         $('.zcj_blrz_jxzi_se_show').val(z_gz-d_gz);
                     }
                 }else{
                     $(this).val('')
                     //$(".zcj_blrz_zgzi_ze_znum_val").val('0')
                     alert('请输入总工资数额');
                 }

             });
             /*求百分比*/
             $(".tanceng .zcj_jbgz_bl_val_sr").die().live("keyup",function(e) {

                 var z_gz = Number($(".zcj_blrz_zgzi_ze_znum_val").val());
                 var z_bl = Number($(this).val());
                 if(z_gz && z_bl){
                     if(z_bl <= 100 && z_gz >= 0){
                         $(".zcj_sygz_shu_e").html(z_gz*z_bl/100)
                     }else{
                         alert('请输入小于100的数');
                         $(this).val('');
                     }
                 }
             });

             /*是否开启试用期工资*/
            if($(".zcj_is_for_kq_sygz").is(':checked')){
                $(".zcj_jbgz_bl_val_sr").attr('disabled',false).val('请输入基本工资比例');
                $(".zcj_syq_time").attr('disabled',false).val('请输入试用期时间');
            }else{
                $(".zcj_jbgz_bl_val_sr").attr('disabled','disabled').val('');
                $(".zcj_syq_time").attr('disabled','disabled').val('');
            }
            $(".tanceng .zcj_is_for_kq_sygz").die().live("click",function(){

                if(Number($(".zcj_blrz_zgzi_ze_znum_val").val())>=0){
                    if($(this).is(':checked')){
                        $(".zcj_jbgz_bl_val_sr").attr('disabled',false).val('请输入基本工资比例');
                        $(".zcj_syq_time").attr('disabled',false).val('请输入试用期时间');
                    }else{
                        $(".zcj_jbgz_bl_val_sr").attr('disabled','disabled').val('');
                        $(".zcj_syq_time").attr('disabled','disabled').val('');
                    }
                }else{
                    alert('请输入总工资数额');
                    return false;
                }

            });
             var n_g=$(".zcj_yg_set_gz_fs label").eq(0).text();
             gz_id.push(1,2);
             gz_name.push(n_g);

             /*员工信息*/
             $.ajax({
                 type: 'get',
                 url: SERVER_URL + "/admin/infobyid",
                 data:{
                     token: token,
                     id:numid
                 },
                 dataType: "json",
                 success: function (data) {
                     console.log("000001000333333");
                     console.log(data);
                     console.log("000001033333333");
                    /* $(".zcj_ygrz_end_rz_time").val(data.data.workdate);//入职时间*/
                    if(data.code==0){
                        $(".zcj_set_gz_yg_name").text(data.data.name);
                        $(".zcj_set_gz_yg_zhize").text(data.data.ranking);
                        $(".zcj_set_gz_yg_bm").text(data.data.deptname);



                        var gz_wage=data.data.wage;


                        var wage_id=gz_wage.split(',')

                        setTimeout(function(){

                            $(".tanceng .zcj_yg_set_gz_fs .zcj_input_xzset").each(function(i){
                                /*fl_list.push($(this).attr('flid'))*/
                                if(wage_id.indexOf($(this).val())>-1){
                                    $(this).attr('checked',true)
                                    $(".zcj_set_pay_content_show .zcj_set_pay_fs").eq($(this).attr("art")-1).show();
                                }else{
                                    $(".zcj_set_pay_content_show .zcj_set_pay_fs").eq($(this).attr("art")-1).hide();
                                }

                            })
                        },100)
                    }else{
                        alert(data.msg);
                    }



                 },
                 error:function(){
                     alert('服务器错误，请稍后再试');
                 }
             })


                /*选择工资方式*/
                $(".zcj_yg_set_gz_fs input").die().live("click",function(){
                            var gzid=parseInt($(this).attr("art"));
                        if($(this).is(":checked")){
                            gz_id.push(gzid+1);
                            gz_name.push($(this).parent().text());
                        $(".zcj_set_pay_content_show .zcj_set_pay_fs").eq($(this).attr("art")-1).show();
                           /* $(this).val(1);*/

                        }else{

                            gz_id.splice($.inArray(gzid+1,gz_id),1);
                            gz_name.splice($.inArray($(this).parent().text(),gz_name),1);
                            $(".zcj_set_pay_content_show .zcj_set_pay_fs").eq($(this).attr("art")-1).hide();
                           /* $(this).val(0);*/
                        }
                    console.log(gz_id);
                    console.log(gz_name);
                });
           /*选择部门列表*/
             // $.ajax({
             //     type: 'get',
             //     url: SERVER_URL+'/dept/list',
             //     data:{
             //
             //         pid: 0,
             //
             //         token:token
             //     },
             //     dataType : "json",
             //     success : function(data) {
             //
             //         //提示添加成功
             //         /* console.log(data);*/
             //         var  html='<li class="left_all" data-id="0"><span class="icon_open change_ba"></span><span class="icon_file"></span><span class="list_msg">所有分类</span></li>';
             //         var deep=0;
             //         $('.zcj_xzset_select_bm_list_tree').html(html+tree_list_dialog(data.rows,deep))
             //
             //     },
             //     error: function(data) {
             //         //提示添加失败
             //         alert("添加失败");
             //     }
             // });
             // /*获取父id*/
             // $(".zcj_xzset_select_bm_list_tree li").die().live("click",function(){
             //
             //         var parentid=$(this).data("id");
             //         var ival=$(this).children(".list_msg").html();
             //
             //     /* alert(ival);*/
             //     /*确定部门名字*/
             //     $(".zcj_xz_set_select_end_btn").die().live("click",function(){
             //         $(".zcj_ygrz_xztc_name_show").val(ival).data('id',parentid);
             //        /* $("#hiddenid").val(parentid);*/
             //         $(this).next().click();
             //     });
             //     /*取消部门名字*/
             //
             // });

             /*提成列表*/
             $.ajax({
                 type: 'get',
                 url: SERVER_URL + "/system-wage-tc/list",
                 data:{
                     token: token,
                     category:1
                 },
                 dataType: "json",
                 success: function (data) {
                     console.log("提成");
                     console.log(data);
                     console.log("提成");
                     if(data.code==0){
                         var html='';

                         $.each(data.dataList,function(index,tclist){
                             html+='<li data-id="'+tclist['id']+'">'+tclist['name']+'</li>'

                         })

                         $(".tanceng .zcj_select_tc_list_sj").html(html)
                     }else{
                         alert(data.msg);
                     }

                 },
                 error:function(){
                     alert('服务器错误，请稍后再试');
                 }
             })
             $(".tanceng .zcj_select_tc_list_sj li").die().live("click",function(){
                 var tcid=$(this).data('id');

                 $(".zcj_ygrz_xztc_name_show").data('id',tcid);
                 $.ajax({
                     type: 'get',
                     url: SERVER_URL + "/system-wage-tc/infobyid",
                     data: {
                         token: token,
                         id: tcid
                     },
                     dataType: "json",
                     success: function (data) {
                         console.log("000001000333");
                         console.log(data);
                         console.log("0000010333");
                         if(data.code==0){
                             $(".zcj_tc1_start_data_num").val(data['data']['tc1_begin_value']);
                             $(".zcj__tc1_end_data_num").val(data['data']['tc1_end_value']);
                             $(".zcj_tc1_tcbfb_data_num").val(data['data']['tc1_percent']);
                             $(".zcj_tc2_start_data_num").val(data['data']['tc2_begin_value']);
                             $(".zcj__tc2_end_data_num").val(data['data']['tc2_end_value']);
                             $(".zcj_tc2_tcbfb_data_num").val(data['data']['tc2_percent']);
                             $(".zcj_tc3_start_data_num").val(data['data']['tc3_begin_value']);
                             $(".zcj__tc3_end_data_num").val(data['data']['tc3_end_value']);
                             $(".zcj_tc3_tcbfb_data_num").val(data['data']['tc3_percent']);
                             $(".zcj_grtc4_start_data_num").val(data.data['over_begin_value']);
                             $(".zcj_grtc4_end_data_num").val(data.data['over_end_value']);
                             $(".zcj_grtc4_tcbfb_data_num").val(data.data['over_percent']);
                             if(data.data['time_type']==1){
                                 $(".zj_gr_an_year").text('按年度')
                             }else if(data.data['time_type']==2){
                                 $(".zj_gr_an_year").text('按季度')
                             }else if(data.data['time_type']==3){
                                 $(".zj_gr_an_year").text('按月度')
                             }
                             if(data.data['task_type']==1){
                                 $(".zj_gr_an_profit").text('按流水')
                             }else if(data.data['task_type']==2){
                                 $(".zj_gr_an_profit").text('按利润')
                             }
                             if(data.data['ticheng_type']==1){
                                 $(".zj_gr_an_quarter").text('按年度')
                             }else if(data.data['ticheng_type']==2){
                                 $(".zj_gr_an_quarter").text('按季度')
                             }else if(data.data['ticheng_type']==3){
                                 $(".zj_gr_an_quarter").text('按月度')
                             }
                         }else {
                             alert(data.msg);
                         }

                     },
                     error:function(){
                         alert('服务器错误，请稍后再试');
                     }
                 })
             });
            /*团队提成*/
             $.ajax({
                 type: 'get',
                 url: SERVER_URL + "/system-wage-tc/list",
                 data:{
                     token: token,
                     category:2
                 },
                 dataType: "json",
                 success: function (data) {
                     console.log("团队提成");
                     console.log(data);
                     console.log("团队提成");
                     if(data.code==0){
                         var html='';

                         $.each(data.dataList,function(index,tclist){
                             html+='<li data-id="'+tclist['id']+'">'+tclist['name']+'</li>';
                         })

                         $(".tanceng .zcj_tdtc_list_select_data").html(html)
                     }else{
                         alert(data.msg);
                     }

                 }
             })
             $(".tanceng .zcj_tdtc_list_select_data li").die().live("click",function(){
                 var tdtcid=$(this).data('id');
                 $(".zcj_ygrz_tdtc_name_show").data('id',tdtcid);
                 $.ajax({
                     type: 'get',
                     url: SERVER_URL + "/system-wage-tc/infobyid",
                     data: {
                         token: token,
                         id: tdtcid
                     },
                     dataType: "json",
                     success: function (data) {
                         console.log("0000010003335555555555555555555");
                         console.log(data);
                         console.log("0000010333555555555555555555555555");
                        if(data.code==0){
                            $(".zcj_tdtc1_begin_num_val").val(data['data']['tc1_begin_value']);
                            $(".zcj_tdtc1_end_num_val").val(data['data']['tc1_end_value']);
                            $(".zcj_tdtc1_percent_num_val").val(data['data']['tc1_percent']);
                            $(".zcj_tdtc2_begin_num_val").val(data['data']['tc2_begin_value']);
                            $(".zcj_tdtc2_end_num_val").val(data['data']['tc2_end_value']);
                            $(".zcj_tdtc2_percent_num_val").val(data['data']['tc2_percent']);
                            $(".zcj_tdtc3_begin_num_val").val(data['data']['tc3_begin_value']);
                            $(".zcj_tdtc3_end_num_val").val(data['data']['tc3_end_value']);
                            $(".zcj_tdtc3_percent_num_val").val(data['data']['tc3_percent']);
                            $(".zcj_tdtc4_start_data_num").val(data.data['over_begin_value']);
                            $(".zcj_tdtc4_end_data_num").val(data.data['over_end_value']);
                            $(".zcj_tdtc4_tcbfb_data_num").val(data.data['over_percent']);

                            if(data.data['time_type']==1){
                                $(".zj_an_year").text('按年度')
                            }else if(data.data['time_type']==2){
                                $(".zj_an_year").text('按季度')
                            }else if(data.data['time_type']==3){
                                $(".zj_an_year").text('按月度')
                            }
                            if(data.data['task_type']==1){
                                $(".zj_an_profit").text('按流水')
                            }else if(data.data['task_type']==2){
                                $(".zj_an_profit").text('按利润')
                            }
                            if(data.data['ticheng_type']==1){
                                $(".zj_an_quarter").text('按年度')
                            }else if(data.data['ticheng_type']==2){
                                $(".zj_an_quarter").text('按季度')
                            }else if(data.data['ticheng_type']==3){
                                $(".zj_an_quarter").text('按月度')
                            }

                        }else{
                            alert(data.msg);
                        }


                     },
                     error:function(){
                         alert('服务器错误，请稍后再试');
                     }
                 })
             });
             /*奖金*/
             $.ajax({
                 type: 'get',
                 url: SERVER_URL + "/system-wage/list",
                 data: {
                     token: token,
                     category: 1
                 },
                 dataType: "json",
                 success: function (data) {
                     console.log("奖金");
                     console.log(data);
                     console.log("奖金");
                     $.each(data['dataList'],function(index,list){
                         $(".zcj_jj_price_num_show").val(list['money']).data('id',list['id']);
                         if(list['all_work']==2){
                            $(".zcj_jj_is_all_qq").attr("checked",true)
                         }else{
                             $(".zcj_jj_is_all_qq").attr("checked",false)
                         }
                         if(list['all_task']==2){
                             $(".zcj_accom_all_task").attr("checked",true)
                         }else{
                             $(".zcj_accom_all_task").attr("checked",false)
                         }
                     })


                 },
                 error:function(){
                     alert('服务器错误，请稍后再试');
                 }
             })
             /*计件*/
             $.ajax({
                 type: 'get',
                 url: SERVER_URL + "/system-wage/list",
                 data: {
                     token: token,
                     category: 2
                 },
                 dataType: "json",
                 success: function (data) {
                     console.log("计件");
                     console.log(data);
                     console.log("计件");
                     var html=''

                     $.each(data['dataList'],function(index,jjlist){
                         html+='<li data-id="'+jjlist['id']+'">'+jjlist['name']+'</li>'

                     })
                     $(".tanceng .zcj_jj_data_list_name_show").html(html)
                 },
                 error:function(){
                     alert('服务器错误，请稍后再试');
                 }
             })
             $(".tanceng .zcj_jj_data_list_name_show li").die().live("click",function(){
                 var jj_id=$(this).data('id');
                 $(".zcj_blrz_jj_xz_jq_val").data('id',jj_id)
                 $.ajax({
                     type: 'get',
                     url: SERVER_URL + "/system-wage/infobyid",
                     data: {
                         token: token,
                         id: jj_id
                     },
                     dataType: "json",
                     success: function (data) {
                         console.log("000001000555");
                         console.log(data);
                         console.log("0000010555");
                        $(".zcj_jj_price_number_show").val(data['data']['money'])

                     },
                     error:function(){
                         alert('服务器错误，请稍后再试');
                     }
                 })
             });
             /*任务绩效*/
             $.ajax({
                 type: 'get',
                 url: SERVER_URL + "/system-wage/list",
                 data: {
                     token: token,
                     category: 3
                 },
                 dataType: "json",
                 success: function (data) {
                     console.log("任务绩效");
                     console.log(data);
                     console.log("任务绩效");
                     var html=''

                     $.each(data['dataList'],function(index,rwlist){
                        html+='<li data-id="'+rwlist['id']+'">'+rwlist['name']+'</li>'

                     })
                     $(".tanceng .zcj_rwjx_list_data_show").html(html)
                 },
                 error:function(){
                     alert('服务器错误，请稍后再试');
                 }
             })
             $(".tanceng .zcj_rwjx_list_data_show li").die().live("click",function(){
                 var rwjx_id=$(this).data('id');
                 $(".zcj_blrz_rwjx_xz_jq_val").data('id',rwjx_id)
                 $.ajax({
                     type: 'get',
                     url: SERVER_URL + "/system-wage/infobyid",
                     data: {
                         token: token,
                         id: rwjx_id
                     },
                     dataType: "json",
                     success: function (data) {
                         console.log("000001000555");
                         console.log(data);
                         console.log("0000010555");
                         $(".zcj_rwjx_no_wc_num").val(data['data']['times']);
                         $(".zcj_rwjx_no_wc_price").val(data['data']['times_money'])

                     },
                     error:function(){
                         alert('服务器错误，请稍后再试');
                     }
                 })

             });
             /*办理入职设定工资确认*/
            $(".tanceng .zcj_blrz_sdgz_end_btn").die().live("click",function(){
                var setid;
                if($(this).data('id')>0){
                    setid=$(this).data('id');
                }else{
                    setid=''
                }

                var set_wage=[];
                var set_name=[];
                $(".tanceng .zcj_yg_set_gz_fs input").each(function(){
                    if($(this).is(':checked')){
                        set_wage.push($(this).val());
                        set_name.push($(this).parent().text());
                       /* set_name+=$(this).parent().text()+'+'*/
                    }

                })

               /* $(".zcj_set_gz_fs_id").attr("value","");*/
                var _this=this;
                var total_num=$(".zcj_blrz_zgzi_ze_znum_val").val();//总工资数额：10000
                if($(".zcj_blrz_zgzi_ze_znum_val").val()!='请输入工资总额'){
                    total_num=$(".zcj_blrz_zgzi_ze_znum_val").val();//试用期工资
                }else{
                    total_num=''
                }
                var basic_num;//基本工资
                if($(".zcj_blrz_jbzi_znum_show").val()!='请输入基本工资'){
                    basic_num=$(".zcj_blrz_jbzi_znum_show").val();//基本工资
                }else{
                    basic_num=''
                }
                var kpi_num;//绩效工资
                if($(".zcj_blrz_jxzi_se_show").val()!='请输入绩效工资'){
                    kpi_num=$(".zcj_blrz_jxzi_se_show").val();//绩效工资
                }else{
                    kpi_num=''
                }
                var test_num;
                var test_begin_time;//开始时间
                var test_end_time;//结束时间
                if($(".tanceng .zcj_is_for_kq_sygz").is(":checked")){
                    if($(".tanceng .zcj_jbgz_bl_val_sr").val()>0){
                          test_num=$(".tanceng .zcj_sygz_shu_e").text();//试用期工资
                    }else{
                        test_num=0;
                    }
                    if($(".zcj_syq_start_time").val()=='请选择日期'){
                        test_begin_time=''
                    }else{
                        test_begin_time=$(".zcj_syq_start_time").val();
                    }
                    if($(".zcj_syq_end_time").val()=='请选择日期'){
                        test_end_time=''
                    }else{
                        test_end_time=$(".zcj_syq_end_time").val();
                    }
                }else{
                    test_num=0;
                    test_begin_time='';
                    test_end_time='';
                }

                var tc_num;//提成总额

                var tc_id;//提成
                if($(".zcj_yg_set_gz_fs .zcj_blrz_tc_val_number").is(":checked")){
                    tc_id=$(".zcj_ygrz_xztc_name_show").data('id');
                    if($(".zcj_ygrz_tc_srze_num").val()=='请输入工资总额(元为单位)'){
                        tc_num=0;
                    }else{
                        tc_num=$(".zcj_ygrz_tc_srze_num").val();
                    }
                }else{
                    tc_id='';
                    tc_num=0;
                }

               /* var test_begin_time;//开始时间
                if($(".zcj_syq_start_time").val()=='请选择日期'){
                    test_begin_time=''
                }else{
                    test_begin_time=$(".zcj_syq_start_time").val();
                }
                var test_end_time;//结束时间
                if($(".zcj_syq_end_time").val()=='请选择日期'){
                    test_end_time=''
                }else{
                    test_end_time=$(".zcj_syq_end_time").val();
                }*/
                var tdtc_num;//团队提成总额
                var tdtc_id;//团队提成id
                if($(".zcj_yg_set_gz_fs .zcj_blrz_tdtc_val_number").is(":checked")){
                    tdtc_id=$(".zcj_ygrz_tdtc_name_show").data('id');
                    if($(".zcj_blrz_tdtc_rw_znum").val()=='请输入工资总额(元为单位)'){
                        tdtc_num=0;
                    }else{
                        tdtc_num=$(".zcj_blrz_tdtc_rw_znum").val();
                    }
                }else{
                    tdtc_id='';
                    tdtc_num=0;
                }
                /*var tdtc_id=$(".zcj_ygrz_tdtc_name_show").data('id');*/

                var bonus_id;//奖金
                if($(".zcj_yg_set_gz_fs .zcj_blrz_jjtc_val_number").is(":checked")){
                    bonus_id=$(".zcj_jj_price_num_show").data('id')
                }else{
                    bonus_id='';
                }
                var piece_id;//计件
                if($(".zcj_yg_set_gz_fs .zcj_blrz_jiantc_val_number").is(":checked")){
                    piece_id=$(".zcj_blrz_jj_xz_jq_val").data('id')
                }else{
                    piece_id='';
                }
                var task_id;//任务绩效
                if($(".zcj_yg_set_gz_fs .zcj_blrz_rwjxtc_val_number").is(":checked")){
                    task_id=$(".zcj_blrz_rwjx_xz_jq_val").data('id');
                }else{
                    task_id='';
                }

                if(total_num<=0){
                    alert("请输入工资总额");
                }else if(basic_num<=0){
                    alert("请输入基本工资")
                }else{
                    $.ajax({
                        type: 'post',
                        url: SERVER_URL + "/wage/add",
                        data:{
                            token: token,
                            id:setid,
                            uid:numid,
                            total_num:total_num,//总工资数额
                            basic_num:basic_num,//基本工资
                            kpi_num:kpi_num,//绩效工资
                            test_num:test_num,//试用期工资
                            tc:tc_id,//提成ID编号
                            tdtc:tdtc_id,//团队提成提成ID编号
                            bonus:bonus_id,//奖金提成ID编号
                            piece:piece_id,//计件提成ID编号
                            task:task_id,//任务绩效提成ID编号
                            tdtc_total_money:tdtc_num, //团队提成总额
                            tc_total_money:tc_num, //提成总额
                            test_begin_time:test_begin_time,
                            test_end_time:test_end_time
                        },
                        dataType: "json",
                        success: function (data) {
                            console.log("000001000");
                            console.log(data);
                            console.log("0000010");
                            if(data.code==0){

                                $(".zcj_set_gz_fs_id").val(set_wage.toString())

                                var gzset_data = set_name.join('+');
                                $(".zcj_set_gz_name").html(gzset_data);

                                delbtn(_this)

                                /*入职培训图片*/
                                if($(".tanceng .zcj_select_rzpx_name_show").text()!=''){
                                    $(".zcj_blrzhi_px_img").show();
                                }else{
                                    $(".zcj_blrzhi_px_img").hide();
                                }
                                /*设定工资图片*/
                                if($(".tanceng .zcj_set_gz_name").text()!=''){
                                    $(".zcj_blrzhi_set_gz_img").show();
                                }else{
                                    $(".zcj_blrzhi_set_gz_img").hide();
                                }
                            }else{
                                alert(data.msg);
                            }

                        },
                        error:function(){
                            alert('服务器错误，请稍后再试');
                        }
                    })
                }


            });

         });
        /*福利编辑*/
        $(".zcj_yg_blrz_bj_gsfl_btn").die().live("click",function(){
            /*福利列表*/
            bjfl_list_show_fn();

            /*添加公司福利*/
                /*确定添加*/
                $(".zcj_blrz_add_gs_fl_end_btn").die().live("click",function(){
                    var _this=this;
                    var fl_lb='';
                    if($(".zcj_blrz_add_gsfl_lb_val").val()=='请输入福利类别'){
                        fl_lb='';
                    }else{
                        fl_lb=$(".zcj_blrz_add_gsfl_lb_val").val()
                    }
                        var fl_je='';
                    if($(".zcj_blrz_add_gsfl_je_price").val()=='请输入金额'){
                        fl_je=''
                    }else{
                        fl_je=$(".zcj_blrz_add_gsfl_je_price").val();
                    }
                    $.ajax({
                        type: 'post',
                        url: SERVER_URL + "/welfare/add",
                        data:{
                            token:token,
                            name:fl_lb,
                            money:fl_je

                        },
                        dataType: "json",
                        success: function (data) {

                            if(data.code==0){
                                bjfl_list_show_fn();
                                delbtn(_this);
                            }else{
                                alert(data.msg);
                            }


                        },
                        error:function(){
                            alert('服务器错误，请稍后再试');
                        }
                    })
                 });
                /*编辑公司福利*/
                $(".zcj_gsfl_edit_btn").die().live("click",function(){
                    var bjid=$(this).attr("editid");
                    var price=$(this).parent().prev().text();
                    var flname=$(this).parent().prev().prev().text();
                    $(".zcj_blrz_bj_jezs_val").val(price);
                    $(".zcj_blrz_bj_cb_val").val(flname);
                    $(".zcj_blrz_bj_qd_end_btn").die().live("click",function(){
                        var _this=this;

                        // var fl_lb=$(".zcj_blrz_bj_cb_val").val()
                        // var fl_je=$(".zcj_blrz_bj_jezs_val").val();
                        var fl_lb='';
                        if($(".zcj_blrz_bj_cb_val").val()=='请输入福利类别'){
                            fl_lb='';
                        }else{
                            fl_lb=$(".zcj_blrz_add_gsfl_lb_val").val()
                        }
                        var fl_je='';
                        if($(".zcj_blrz_bj_jezs_val").val()=='请输入金额'){
                            fl_je=''
                        }else{
                            fl_je=$(".zcj_blrz_add_gsfl_je_price").val();
                        }
                        $.ajax({
                            type: 'post',
                            url: SERVER_URL + "/welfare/add",
                            data:{
                                token:token,
                                id:bjid,
                                name:fl_lb,
                                money:fl_je

                            },
                            dataType: "json",
                            success: function (data) {
                                console.log("000001111");
                                console.log(data);
                                console.log("000001");
                                if(data.code==0){
                                    bjfl_list_show_fn();
                                    delbtn(_this);
                                }


                            },
                            error:function(){
                                alert('服务器错误，请稍后再试');
                            }
                        })
                    });
                });

                /*删除*/
                $(".zcj_ygrz_bjfl_del_btn").die().live("click",function(){
                    var delid=$(this).prev().attr("editid");
                    $.ajax({
                        type: 'get',
                        url: SERVER_URL + "/welfare/deldata",
                        data:{
                            token: token,
                            id:delid
                        },
                        dataType: "json",
                        success: function (data) {

                            console.log(data);
                            if(data.code==0){
                                alert(data.msg);
                                edit_list_data(".zcj_bmpx_edit_list_show");
                            }
                        },
                        error:function(){
                            alert('服务器错误，请稍后再试');
                        }

                    })
                });
                /*福利编辑确认*/
                $(".zcj_blrzyg_bjfl_enter_btn").die().live("click",function(){
                    data_list();
                    delbtn(this)
                });

        });
        /*社保基数展示*/
        // $(".tanceng .zcj_insurance").die().live("click",function(){
        //     var sb=$(this).val()
        //     $.ajax({
        //         type: 'post',
        //         url: SERVER_URL + "/work/safe",
        //         data:{
        //             token: token,
        //             social_security_money:sb
        //         },
        //         dataType: "json",
        //         success: function (data) {
        //
        //             console.log(data);
        //             if(data.code==0){
        //
        //                 $(".tanceng .zcj_sb_js_znum_val").val(data.data);
        //             }
        //         },
        //         error:function(){
        //             alert('服务器错误，请稍后再试');
        //         }
        //
        //     })
        // });

        /***************确认入职**************************/
        $(".zcj_yg_end_enter_rz_btn").die().live("click",function(){
            var _this=this;
            /*入职时间*/
            var work;
            if($(".zcj_ygrz_end_rz_time").val() =='请选择日期' || $(".zcj_ygrz_end_rz_time").val() =='0000-00-00'){
                work='';
            }else{
                work=$(".zcj_ygrz_end_rz_time").val();
            }

            /*  入职培训*/
            var entrytraining_type= $(".zcj_entry_px_name").val();

            /*   var skill= $(".zcj_skill").html();*/
            /* 公积金数额*/
            var salary;
            if($(".zcj_welfare_money").is(':checked')){
                salary=$(".zcj_blrz_gjjse_znum_val").val();
            }else{
                salary='';
            }

            /*社保金额*/
            var provide;
            if($(".zcj_insurance").is(':checked')){
                provide=$(".zcj_blrz_sbjs_znum_val").val();
            }else{
                provide='';
            }

            /*设定工资*/
            var wage=$(".zcj_set_gz_fs_id").val();
            /*福利*/
            var add_gsfl=[];
            var add_gsfl_name=[]
            $(".tanceng .zcj_blrz_yg_fl_list_zs .zcj_ygrz_bl_gsfl_xz").each(function(){
                if($(this).is(':checked')){
                    add_gsfl.push($(this).attr('flid'))
                    add_gsfl_name.push($(this).data('name'))
                }

            })

            /*角色id*/
            var role_id=$('.zcj_select_role_name_id').data('id');

            if(role_id==''){
                alert("请选择角色")
            }else if(work==''){
                alert("请输入入职时间");
            }else if(wage==''){
                alert("请先设定工资");
            }else if(role_id>0){
                $.ajax({
                    url: SERVER_URL + "/admin/ruzhisave",
                    type: "post",
                    data:{
                        token: token,
                        id: numid,//用户ID：1
                        entrytraining_type:entrytraining_type,//入职培训id：1
                        workdate:work,//入职时间
                        wage:wage,//工资构成：1,2,3 工资 1基本工资 2绩效 3提成 3团队提成 5奖金 6计件 7任务绩效
                        fund_money:salary,//公积金数额
                        social_security_money:provide,//社保金额：
                        welfare_type:add_gsfl.toString(),//福利ID：1,2,3
                        welfare:add_gsfl_name.toString(),//福利名称：车补,饭补
                        job_status:3,  //状态：2办理中 3确认入职 当点击“保存”则job_status值为2 反之值为3
                        role_id:role_id
                    },

                    dataType: "json",
                    success: function(result){

                        console.log(result);
                        if(result.code==0){
                            alert("恭喜你办理入职成功");
                            depart_staff_list();
                            delbtn(_this);
                        }else{
                            alert(result.msg);
                        }
                    },
                    error: function (data) {
                        alert('服务器错误，请稍后再试');
                    }
                });
            }else{
                alert('请选择角色')
            }

        });
        /*保存信息*/
        $(".zcj_yg_blrz_info_save_btn").die().live("click",function(){
            var _this=this;
            /*入职时间*/
            var work;
            if($(".zcj_ygrz_end_rz_time").val() =='请选择日期'){
                work='';
            }else{
                work=$(".zcj_ygrz_end_rz_time").val();
            }

            /*  入职培训*/
            var entrytraining_type= $(".zcj_entry_px_name").val();

            /*   var skill= $(".zcj_skill").html();*/
            /* 公积金数额*/
            var salary;
            if($(".zcj_welfare_money").is(':checked')){
                salary=$(".zcj_blrz_gjjse_znum_val").val();
            }else{
                salary='';
            }
            /*福利*/
            var add_gsfl=[];
            var add_gsfl_name=[]
            $(".tanceng .zcj_blrz_yg_fl_list_zs .zcj_ygrz_bl_gsfl_xz").each(function(){
                if($(this).is(':checked')){
                    add_gsfl.push($(this).attr('flid'))
                    add_gsfl_name.push($(this).data('name'))
                }

            })
            /*社保金额*/
            var provide;
            if($(".zcj_insurance").is(':checked')){
                provide=$(".zcj_blrz_sbjs_znum_val").val();
            }else{
                provide='';
            }

            /*工资*/
            var wage=$(".zcj_set_gz_fs_id").val();
            /*福利*/
            /*角色id*/
            var role_id=$('.zcj_select_role_name_id').data('id');
            $.ajax({
                url: SERVER_URL + "/admin/ruzhisave",
                type: "post",
                data:{
                    token: token,
                    id: numid,//用户ID：1
                    entrytraining_type:entrytraining_type,//入职培训id：1
                    workdate:work,//入职时间
                    wage:wage,//工资构成：1,2,3 工资 1基本工资 2绩效 3提成 3团队提成 5奖金 6计件 7任务绩效
                    fund_money:salary,//公积金数额
                    social_security_money:provide,//社保金额：
                    welfare_type:add_gsfl.toString(),//福利ID：1,2,3
                    welfare:add_gsfl_name.toString(),//福利名称：车补,饭补
                    job_status:2,  //状态：2办理中 3确认入职 当点击“保存”则job_status值为2 反之值为3
                    role_id:role_id
                },

                dataType: "json",
                success: function(result){

                    console.log(result);
                    if(result.code==0){
                        alert("信息已保存");
                        depart_staff_list();
                        delbtn(_this);
                    }
                },
                error: function (data) {
                    alert('服务器错误，请稍后再试');
                }
            });
        });
    });
    /************************编辑   员工入职信息编辑******************************************/
    /*编辑 公司福利数据展示*/
    function  data_list_edit() {
        $.ajax({
            type: 'get',
            url: SERVER_URL + "/welfare/list",
            data:{
                token: token
            },
            dataType: "json",
            success: function (data) {
                console.log("000001");
                console.log(data);
                console.log("000001");
                if(data.code==0){
                    gsfl_list(".zcj_yg_rz_gs_fl_list_show",data.datalist)
                }else{
                    alert(data.msg);
                }

            }
        })
    }
    $(".zcj_yg_blrz_edit_info").die().live("click",function(){
        var editid=$(this).attr("bjid");

        /*权限列表*/
        yg_limit_list_fn();
        /*选择角色*/
        $(".zcj_ygrz_staff_qx_list li").die().live("click",function () {
            var roleid=$(this).data('id');

            $(".zcj_select_role_name_id").data('id',roleid)
        });
        /*培训列表*/
        px_list_show_fn(".zcj_hr_ygrz_px_list");
        /*选择入职培训*/
        $(".zcj_hr_ygrz_px_list li").die().live("click",function(){
            var px_id=$(this).attr("rzpx_id");
            $(".zcj_yg_edit_rzpx_id_yc").val(px_id);
        });
        /*设定工资显示*/
        var gz_lb='';
        var gz_name=[];
        var gz_fl='';
        var gzfl_id='';
        $.ajax({
            type: 'get',
            url: SERVER_URL + "/admin/infobyid",
            data:{
                token: token,
                id:editid

            },
            dataType: "json",
            success: function (data) {
                console.log("0000022220000");
                console.log(data);
                console.log("0000022220000");
                if(data.code==0){
                    $(".zcj_select_role_name_id").val(data['data']['role_name']).data('id',data['data']['role_id']);
                    $(".hr_ygrzxx_name").text(data.data.name);
                    $(".zcj_yg_edit_show_time").val(data.data.workdate);
                    $(".zcj_bjyg_rzpx_name_show").text(data.data['entrytraining_name']);
                    $(".zcj_yg_edit_rzpx_id_yc").val(data.data['entrytraining_type'])
                    $(".zcj_yg_info_edit_set_gz_btn").data('id',data.data['id'])
                    //$(".zcj_edit_yg_gz_yc_id").data('id')
                    gz_lb=data.data.wage;

                       if(gz_lb.indexOf(1)>-1){
                           gz_name.push("基本工资");
                       }
                       if(gz_lb.indexOf(2)>-1){
                           gz_name.push("绩效");
                       }
                       if(gz_lb.indexOf(3)>-1){
                           gz_name.push("提成");
                       }
                       if(gz_lb.indexOf(4)>-1){
                           gz_name.push("团队提成");
                       }
                       if(gz_lb.indexOf(5)>-1){
                           gz_name.push("奖金");
                       }
                       if(gz_lb.indexOf(6)>-1){
                           gz_name.push("计件");
                       }
                       if(gz_lb.indexOf(7)>-1){
                           gz_name.push("任务绩效");
                       }
                    var gz_data = gz_name.join('+');

                    $(".zcj_ygbj_set_show_gz_name").text(gz_data);
                    $(".zcj_edit_yg_gz_yc_id").val(data.data['wage']);
                    if(data.data.social_security_money>0){
                        $(".zcj_ygblrz_jlsb_qr").attr("checked","checked");
                        $(".zcj_yg_blrz_shebao_js_num").show();
                        $(".zcj_ygrzhi_bj_sbnum_srk").hide();
                        $(".zcj_yg_blrz_shebao_js_num").val(data.data.social_security_money);
                    }else{
                        $(".zcj_ygblrz_jlsb_qr").attr("checked",false);
                        $(".zcj_ygrzhi_bj_sbnum_srk").show();
                        $(".zcj_yg_blrz_shebao_js_num").hide();
                        $(".zcj_yg_blrz_shebao_js_num").val();
                    }
                    /*公积金*/
                    if(data.data.fund_money>0){
                        $(".zcj_ygblrz_jlgjj_qr").attr("checked","checked");
                        $(".zcj_yg_blrz_gjj_se_num").show();
                        $(".zcj_ygrzhi_bj_gjjnum_srk").hide();
                        $(".zcj_yg_blrz_gjj_se_num").val(data.data.fund_money);
                    }else{
                        $(".zcj_ygblrz_jlgjj_qr").attr("checked",false);
                        $(".zcj_yg_blrz_gjj_se_num").hide();
                        $(".zcj_ygrzhi_bj_gjjnum_srk").show();
                        $(".zcj_yg_blrz_gjj_se_num").val();
                    }

                    gzfl_id=data['data']['welfare_type'];
                    gz_fl=data.data.welfare;
                  /*  var array= gz_fl.split(",");*/
                    var fl_id=gzfl_id.split(",")

                    var fl_list=[];
                    setTimeout(function(){
                        $(".tanceng .zcj_yg_rz_gs_fl_list_show .zcj_ygrz_bl_gsfl_xz").each(function(){
                            fl_list.push($(this).attr('flid'))
                            if(fl_id.indexOf($(this).attr('flid'))>-1){
                                $(this).attr('checked',true)
                            }
                        })
                    },100)


                }


            }
        })


        /*社保*/
        $(".zcj_ygblrz_jlsb_qr").die().live("click",function(){
            if($(this).is(":checked")){
                $(".zcj_yg_blrz_shebao_js_num").show();
                $(".zcj_ygrzhi_bj_sbnum_srk").hide();
               /* $(".zcj_yg_blrz_shebao_js_num").val(data.data.social_security_money);*/
            }else{
                /*$(".zcj_ygblrz_jlsb_qr").attr("checked",false);*/
                $(".zcj_ygrzhi_bj_sbnum_srk").show();
                $(".zcj_yg_blrz_shebao_js_num").hide();
               /* $(".zcj_yg_blrz_shebao_js_num").val();*/
            }
        });
        /*公积金*/
        $(".zcj_ygblrz_jlgjj_qr").die().live("click",function(){
            if($(this).is(":checked")){

                $(".zcj_yg_blrz_gjj_se_num").show();
                $(".zcj_ygrzhi_bj_gjjnum_srk").hide();

            }else{

                $(".zcj_yg_blrz_gjj_se_num").hide();
                $(".zcj_ygrzhi_bj_gjjnum_srk").show();

            }
        });
        /*公司福利获取*/
        $.ajax({
            type: 'get',
            url: SERVER_URL + "/welfare/list",
            data:{
                token: token
            },
            dataType: "json",
            success: function (data) {
                console.log("000001");
                console.log(data);
                console.log("000001");

                gsfl_list(".zcj_yg_rz_gs_fl_list_show",data.datalist)
            },
            error:function(){
                alert('服务器错误，请稍后再试');
            }
        })
        /*选择公司福利*/
        // var gsbj_fl=[];
        // var gsflbj_name=[];
        // $(".tanceng .zcj_yg_rz_gs_fl_list_show .zcj_ygrz_bl_gsfl_xz").die().live("click",function(){
        //     if($(this).is(":checked")){
        //         gsbj_fl.push($(this).attr("flid"));
        //         gsflbj_name.push($(this).next().text());
        //     }else{
        //         gsbj_fl.splice($.inArray($(this).attr("flid"),gsbj_fl),1);
        //         gsflbj_name.splice($.inArray($(this).next().text(),gsflbj_name),1);
        //
        //     }
        //
        //     console.log(gsbj_fl);
        //     console.log(gsflbj_name);
        // });
        /*入职培训*/
        $(".tanceng .zcj_ygrz_info_bj_pxbj_btn").die().live("click",function(){
            /*培训编辑列表展示*/
            edit_list_data(".zcj_bmpx_edit_list_show");
            /*add添加入职培训*/
            $(".tanceng .zcj_rzpx_add_btn").die().live("click",function(){
                /*选择负责人树*/
                /*入职培训列表*/
                $.ajax({
                    type: 'get',
                    url: SERVER_URL + "/dept/deptlist",
                    data: {
                        token: token
                        /*   name:depname, */

                    },

                    dataType: "json",
                    success: function (data) {
                        console.log(data);
                        var deep=0;
                        var head='<li class="left_all"><span class="icon_open change_ba"></span><span class="icon_file"></span><span class="list_msg">所有分类</span></li>';
                        $(".zcj_list_people").html(head+tree_list_bmfzr(data));

                    }
                });
                /*负责人id*/
                $(".zcj_list_people .person_left_nav").die().live("click",function(){
                    var pid=$(this).attr("userinfoid");
                    var name=$(this).find(".list_msg").text();
                    $(".zcj_blrz_xz_qr_btn").die().live("click",function () {
                        $("#zcj_add_xz_hid_fzr_id").val(pid);
                        $(".zcj_rzpx_xzfzr_val_name").val(name).addClass("c_3");
                        delbtn(this);
                    });
                });
                /*入职培训确定*/
                $(".zcj_rzpx_add_px_end_btn").die().live("click",function(){
                    var _this=this;
                    var bm_name=$(".zcj_rzpx_add_tjrzpx_name").val();
                    var fzr_id=$("#zcj_add_xz_hid_fzr_id").val();
                    var content=$("#zcj_add_px_nr_text").val();
                    $.ajax({
                        type: 'post',
                        url: SERVER_URL + "/train/add",
                        data:{
                            token: token,
                            name:bm_name,//名称
                            executor:fzr_id,//负责人id
                            content:content,//内容
                            thetype:1//培训类型：1入职培训，2技能培训
                        },
                        dataType: "json",
                        success: function (data) {

                            console.log(data);
                            if(data.code==0){
                                alert(data.msg);
                                edit_list_data(".zcj_bmpx_edit_list_show");
                                delbtn(_this)
                            }
                        }
                    })

                });
            });
            /*编辑入职培训*/
            $(".tanceng .zcj_rzpx_bj_btn_gn").die().live("click",function(){

                var bjrzid=$(this).attr("pxbj_id");
                $.ajax({
                    type: 'get',
                    url: SERVER_URL + "/train/loadtrain",
                    data:{
                        token: token,
                        id:bjrzid
                    },
                    dataType: "json",
                    success: function (data) {
                        console.log("000001222444");
                        console.log(data);
                        console.log("000001222444");
                        $(".tanceng .zcj_bj_xg_bm_name").val(data.data.name);
                        $(".tanceng .zcj_blrz_fzr_val_show").val(data.data.executor);
                        $(".tanceng #zcj_blrzhi_fzr_id").val(data.data.id);
                        $(".tanceng .zcj_px_nr_show_wb").val(data.data.content)

                    }
                })
                /*选择编辑负责人*/
                $(".tanceng .zcj_add_person").live("click",function () {

                    /*入职培训列表*/
                    $.ajax({
                        type: 'get',
                        url: SERVER_URL + "/dept/deptlist",
                        data: {
                            token: token
                            /*   name:depname, */

                        },

                        dataType: "json",
                        success: function (data) {
                            console.log(data);
                            var deep=0;
                            var head='<li class="left_all"><span class="icon_open change_ba"></span><span class="icon_file"></span><span class="list_msg">所有分类</span></li>';
                            $(".zcj_list_people").empty().html(head+tree_list_bmfzr(data));

                        }
                    });
                    /*负责人id*/
                    $(".zcj_list_people .person_left_nav").die().live("click",function(){
                        var pid=$(this).attr("userinfoid");
                        var name=$(this).find(".list_msg").text();
                        $(".zcj_blrz_xz_qr_btn").die().live("click",function () {
                            $("#zcj_blrzhi_fzr_id").val(pid);
                            $(".zcj_blrz_fzr_val_show").val(name);
                            delbtn(this);
                        });

                    });

                });

                /*确认编辑*/
                $(".zcj_blrz_bj_end_qr_btn").die().live("click",function(){

                    var _this=this;
                    var name=$(".zcj_bj_xg_bm_name").val();
                    var executor=$("#zcj_blrzhi_fzr_id").val();
                    var content=$(".t_right .zcj_px_nr_show_wb").val();
                    $.ajax({
                        type: 'post',
                        url: SERVER_URL + "/train/add",
                        data: {
                            token: token,
                            id:bjrzid,
                            name:name,
                            executor:executor,
                            content:content
                        },

                        dataType: "json",
                        success: function (data) {
                            console.log(data);
                            if(data.code==0){
                                alert(data.msg);
                                edit_list_data(".zcj_bmpx_edit_list_show");
                                delbtn(_this)
                            }

                        }
                    });
                });
            });
            /************************预览******************/
            $(".tanceng .zcj_blrz_bj_ylzs_btn").die().live("click",function(){

                var yl_id=$(this).prev().attr("pxbj_id");
                var _this=this;

                $.ajax({
                    type: 'get',
                    url: SERVER_URL + "/train/loadtrain",
                    data:{
                        token: token,
                        id:yl_id

                    },
                    dataType: "json",
                    success: function (data) {

                        console.log(data);
                        if(data.code==0){

                            $(".tanceng .zcj_blrz_mc_show_name").text(data.data.name);
                            $(".tanceng .zcj_rzhi_px_fzr_tb").text(data.data.executor);
                            $(".tanceng .zcj_rzpxnr_content_show").text(data.data.content);
                        }
                    }

                })

            })
            /************************删除********************/
            $(".zcj_blrz_del_sc_btn").die().live("click",function(){
                var dthis=this;
                var delid=$(this).prev().prev().attr("pxbj_id");
                $.ajax({
                    type: 'get',
                    url: SERVER_URL + "/train/deldata",
                    data:{
                        token: token,
                        id:delid
                    },
                    dataType: "json",
                    success: function (data) {

                        console.log(data);
                        if(data.code==0){
                            alert(data.msg);
                           /* bjfl_list_show_fn();*/
                            edit_list_data(".zcj_bmpx_edit_list_show");
                            $(dthis).parent().parent().remove()
                        }else{
                            alert(data.msg);
                        }
                    }

                })
            });
            /*确认入职培训编辑确认*/
            $(".tanceng .zcj_rzpx_end_but").die().live("click",function () {
                var pxbj_name=[];
                var pxbj_id=[];
                $(".tanceng .zcj_bmpx_edit_list_show input:checked").each(function(){
                    pxbj_id.push($(this).data('id'));
                    pxbj_name.push($(this).data('name'));
                })
                $(".zcj_bjyg_rzpx_name_show").text(pxbj_name.toString());
                $(".zcj_yg_edit_rzpx_id_yc").val(pxbj_id.toString())
                /*px_list_show_fn(".zcj_rzbj_list_show");*/
                $(this).parents('.dialog_content').find('.dialog_close').click();
               /* px_list_show_fn(".zcj_rzbj_list_show");
                $(this).parents('.dialog_content').find('.dialog_close').click();*/
                if($(".zcj_bjyg_rzpx_name_show").text()!=''){
                    $(".zcj_v_hidden_img").show();
                }else{
                    $(".zcj_v_hidden_img").hide();
                }
            });
        });

        /*****员工编辑信息设置工资部分*************/
        var bjgz_id=[];
        var bjgz_name=[];
        $(".tanceng .zcj_yg_info_edit_set_gz_btn").die().live("click",function(){
            var ed_id=$(this).data('id');

           //  alert(ed_id)

            var n_g=$(".zcj_yg_set_gz_fs label").eq(0).text();
            bjgz_id.push(1,2);
            bjgz_name.push(n_g);
            /*员工信息*/
            $.ajax({
                type: 'get',
                url: SERVER_URL + "/admin/infobyid",
                data:{
                    token: token,
                    id:editid
                },
                dataType: "json",
                success: function (data) {
                    console.log("000001000");
                    console.log(data);
                    console.log("0000010222222222222");
                    /* $(".zcj_ygrz_end_rz_time").val(data.data.workdate);//入职时间*/
                    $(".zcj_set_gz_yg_name").text(data.data.name);
                    $(".zcj_set_gz_yg_zhize").text(data.data.ranking);
                    $(".zcj_set_gz_yg_bm").text(data.data.deptname);

                    var gzset=[]

                    var gz_wage=data.data.wage;


                        var wage_id=gz_wage.split(',')
                    console.log('0000000000000000000000000000000');
                    console.log(wage_id);
                    console.log('0000000000000000000000000000000');
                    setTimeout(function(){

                        $(".tanceng .zcj_yg_set_gz_fs .zcj_input_xzset").each(function(i){
                            /*fl_list.push($(this).attr('flid'))*/
                            if(wage_id.indexOf($(this).val())>-1){
                                $(this).attr('checked',true)
                                $(".zcj_set_pay_content_show .zcj_set_pay_fs").eq($(this).attr("art")-1).show();
                            }else{
                                $(".zcj_set_pay_content_show .zcj_set_pay_fs").eq($(this).attr("art")-1).hide();
                            }

                        })
                    },100)
                },
                error:function(){
                    alert('服务器错误，请稍后再试');
                }
            })

            /*总工资*/
            $(".tanceng .zcj_blrz_zgzi_ze_znum_val").live('keyup',function(){
                var j_gz=Number($(".zcj_blrz_jbzi_znum_show").val());
                var t_gz=Number($(this).val());
                if(j_gz>0){
                    if(t_gz>j_gz){
                        $(".zcj_blrz_jxzi_se_show").val(t_gz-j_gz)
                    }else{
                        $(".zcj_blrz_jbzi_znum_show").val('');
                        $(".zcj_blrz_jxzi_se_show").val('');
                        alert("基本工资不能大于总工资");
                        return false;
                    }

                }
            });
            /*基本工资*/
            $(".tanceng .zcj_blrz_jbzi_znum_show").live('keyup',function(){

                var z_gz=Number($(".zcj_blrz_zgzi_ze_znum_val").val());
                var d_gz=Number($(this).val());
                var jx_gz=Number($('zcj_blrz_jxzi_se_show').val());
                if(z_gz>0){
                    if( d_gz>z_gz){
                        alert('基本工资不能大于总工资数额');
                        $(this).val('')

                    }else{
                        $('.zcj_blrz_jxzi_se_show').val(z_gz-d_gz);
                    }
                }else{
                    $(this).val('')
                    //$(".zcj_blrz_zgzi_ze_znum_val").val('0')
                    alert('请输入总工资数额');
                }

            });
            /*求百分比*/
            $(".tanceng .zcj_jbgz_bl_val_sr").die().live("keyup",function(e) {

                var z_gz = Number($(".zcj_blrz_zgzi_ze_znum_val").val());
                var z_bl = Number($(this).val());
                if(z_gz && z_bl){
                    if(z_bl <= 100 && z_gz >= 0){
                        $(".zcj_sygz_shu_e").html(z_gz*z_bl/100)
                    }else{
                        alert('请输入小于100的数');
                        $(this).val('');
                    }
                }
            });
            /*选择工资方式*/
            $(".zcj_yg_set_gz_fs input").die().live("click",function(){
                var gzid=parseInt($(this).attr("art"));
                if($(this).is(":checked")){
                    bjgz_id.push(gzid+1);
                    bjgz_name.push($(this).parent().text());
                    $(".zcj_set_pay_content_show .zcj_set_pay_fs").eq($(this).attr("art")-1).show();
                   /* $(this).val(1);*/

                }else{

                    bjgz_id.splice($.inArray(gzid+1,bjgz_id),1);
                    bjgz_name.splice($.inArray($(this).parent().text(),bjgz_name),1);
                    $(".zcj_set_pay_content_show .zcj_set_pay_fs").eq($(this).attr("art")-1).hide();
                   /* $(this).val(0);*/
                }
                console.log(bjgz_id);
                console.log(bjgz_name);
            });
            /*是否开启试用期工资*/
            if($(".zcj_is_for_kq_sygz").is(':checked')){
                $(".zcj_jbgz_bl_val_sr").attr('disabled',false).val('请输入基本工资比例');
                $(".zcj_syq_time").attr('disabled',false).val('请输入试用期时间');
            }else{
                $(".zcj_jbgz_bl_val_sr").attr('disabled','disabled').val('');
                $(".zcj_syq_time").attr('disabled','disabled').val('');
            }
            $(".zcj_is_for_kq_sygz").die().live("click",function(){
                if(Number($(".zcj_blrz_zgzi_ze_znum_val").val())>=0){
                    if($(this).is(':checked')){
                        $(".zcj_jbgz_bl_val_sr").attr('disabled',false).val('请输入基本工资比例');
                        $(".zcj_syq_time").attr('disabled',false).val('请输入试用期时间');
                    }else{
                        $(".zcj_jbgz_bl_val_sr").attr('disabled','disabled').val('');
                        $(".zcj_syq_time").attr('disabled','disabled').val('');
                    }
                }else{
                    alert('请输入总工资数额');
                    return false;
                }

            });
            /**********************基本工资加绩效列表数据展示********************************/
            $.ajax({
                type: 'get',
                url: SERVER_URL + "/wage/infobyuid",
                data:{
                    token: token,
                    uid:ed_id
                },
                dataType: "json",
                success: function (data) {
                    console.log("基本工资加绩效123");
                    console.log(data);
                    console.log("基本工资加绩效123");
                    if(data.code==0){
                       /* if(data.data.length>0){*/
                            $(".zcj_blrz_sdgz_end_btn").data('id',data.data['id'])
                            $(".tanceng .zcj_blrz_zgzi_ze_znum_val").val(data.data['total_num']);
                            $(".zcj_blrz_jbzi_znum_show").val(data.data['basic_num']);
                            $(".zcj_blrz_jxzi_se_show").val(data.data['kpi_num']);
                            $(".zcj_sygz_shu_e").text(data.data['test_num']);
                            $(".zcj_syq_start_time").val(data.data['test_begin_time']);
                            $(".zcj_syq_end_time").val(data.data['test_end_time']);
                            if(data.data['tcInfo']){
                                $(".zcj_ygrz_xztc_name_show").data('id',data.data['tcInfo']['id']).val(data.data['tcInfo']['name']); //提成id
                                $(".zcj_ygrz_tc_srze_num").val(data.data['tc_total_money']); //提成总额
                                $(".zcj_tc1_start_data_num").val(data.data['tcInfo']['tc1_begin_value']);
                                $(".zcj__tc1_end_data_num").val(data.data['tcInfo']['tc1_end_value']);
                                $(".zcj_tc1_tcbfb_data_num").val(data.data['tcInfo']['tc1_percent']);
                                $(".zcj_tc2_start_data_num").val(data.data['tcInfo']['tc2_begin_value']);
                                $(".zcj__tc2_end_data_num").val(data.data['tcInfo']['tc2_end_value']);
                                $(".zcj_tc2_tcbfb_data_num").val(data.data['tcInfo']['tc2_percent']);
                                $(".zcj_tc3_start_data_num").val(data.data['tcInfo']['tc3_begin_value']);
                                $(".zcj__tc3_end_data_num").val(data.data['tcInfo']['tc3_end_value']);
                                $(".zcj_tc3_tcbfb_data_num").val(data.data['tcInfo']['tc3_percent']);
                                $(".zcj_grtc4_start_data_num").val(data.data['tcInfo']['over_begin_value']);
                                $(".zcj_grtc4_end_data_num").val(data.data['tcInfo']['over_end_value']);
                                $(".zcj_grtc4_tcbfb_data_num").val(data.data['tcInfo']['over_percent']);
                                // $(".zcj_tc3_tcbfb_data_num").val(data.data['tcInfo']['tc3_percent']);
                                if(data.data['tdtcInfo']['time_type']==1){
                                    $(".zj_gr_an_year").text('按年度')
                                }else if(data.data['tdtcInfo']['time_type']==2){
                                    $(".zj_gr_an_year").text('按季度')
                                }else if(data.data['tdtcInfo']['time_type']==3){
                                    $(".zj_gr_an_year").text('按月度')
                                }
                                if(data.data['tdtcInfo']['task_type']==1){
                                    $(".zj_gr_an_profit").text('按流水')
                                }else if(data.data['tdtcInfo']['task_type']==2){
                                    $(".zj_gr_an_profit").text('按利润')
                                }
                                if(data.data['tdtcInfo']['ticheng_type']==1){
                                    $(".zj_gr_an_quarter").text('按年度')
                                }else if(data.data['tdtcInfo']['ticheng_type']==2){
                                    $(".zj_gr_an_quarter").text('按季度')
                                }else if(data.data['tdtcInfo']['ticheng_type']==3){
                                    $(".zj_gr_an_quarter").text('按月度')
                                }
                            }
                            if(data.data['tdtcInfo']){
                                $(".zcj_ygrz_tdtc_name_show").data('id',data.data['tdtcInfo']['id']).val(data.data['tdtcInfo']['name']); //团队提成id
                                $(".zcj_blrz_tdtc_rw_znum").val(data.data['tdtc_total_money']);//团队提成name
                                $(".zcj_tdtc1_begin_num_val").val(data.data['tdtcInfo']['tc1_begin_value']);
                                $(".zcj_tdtc1_end_num_val").val(data.data['tdtcInfo']['tc1_end_value']);
                                $(".zcj_tdtc1_percent_num_val").val(data.data['tdtcInfo']['tc1_percent']);
                                $(".zcj_tdtc2_begin_num_val").val(data.data['tdtcInfo']['tc2_begin_value']);
                                $(".zcj_tdtc2_end_num_val").val(data.data['tdtcInfo']['tc2_end_value']);
                                $(".zcj_tdtc2_percent_num_val").val(data.data['tdtcInfo']['tc2_percent']);
                                $(".zcj_tdtc3_begin_num_val").val(data.data['tdtcInfo']['tc3_begin_value']);
                                $(".zcj_tdtc3_end_num_val").val(data.data['tdtcInfo']['tc3_end_value']);
                                $(".zcj_tdtc3_percent_num_val").val(data.data['tdtcInfo']['tc3_percent']);
                                $(".zcj_tdtc4_start_data_num").val(data.data['tdtcInfo']['over_begin_value']);
                                $(".zcj_tdtc4_end_data_num").val(data.data['tdtcInfo']['over_end_value']);
                                $(".zcj_tdtc4_tcbfb_data_num").val(data.data['tdtcInfo']['over_percent']);
                                //$(".zcj_tdtc3_percent_num_val").val(data.data['tdtcInfo']['tc3_percent']);
                                if(data.data['tdtcInfo']['time_type']==1){
                                    $(".zj_an_year").text('按年度')
                                }else if(data.data['tdtcInfo']['time_type']==2){
                                    $(".zj_an_year").text('按季度')
                                }else if(data.data['tdtcInfo']['time_type']==3){
                                    $(".zj_an_year").text('按月度')
                                }
                                if(data.data['tdtcInfo']['task_type']==1){
                                    $(".zj_an_profit").text('按流水')
                                }else if(data.data['tdtcInfo']['task_type']==2){
                                    $(".zj_an_profit").text('按利润')
                                }
                                if(data.data['tdtcInfo']['ticheng_type']==1){
                                    $(".zj_an_quarter").text('按年度')
                                }else if(data.data['tdtcInfo']['ticheng_type']==2){
                                    $(".zj_an_quarter").text('按季度')
                                }else if(data.data['tdtcInfo']['ticheng_type']==3){
                                    $(".zj_an_quarter").text('按月度')
                                }
                            }

                            if(data.data['bonusInfo']){
                                $(".zcj_jj_price_num_show").data('id',data.data['bonusInfo']['id']).val(data.data['bonusInfo']['money']); //奖金id
                            }
                            if(data.data['pieceInfo']){
                                $(".zcj_blrz_jj_xz_jq_val").data('id',data.data['pieceInfo']['id']).val(data.data['pieceInfo']['name']); //计件id
                            }

                            if(data.data['pieceInfo']){
                                $(".zcj_jj_price_number_show").val(data.data['pieceInfo']['money']);
                            }

                            if(data.data['taskInfo']){
                                $(".zcj_blrz_rwjx_xz_jq_val").data('id',data.data['taskInfo']['id']).val(data.data['taskInfo']['name']); //任务id
                            }
                            if(data.data['taskInfo']){
                                $(".zcj_rwjx_no_wc_num").val(data.data['taskInfo']['times']);
                            }
                             if(data.data['taskInfo']){
                                 $(".zcj_rwjx_no_wc_price").val(data.data['taskInfo']['times_money']);
                             }

                            if(data.data['test_num']>0){
                                $(".zcj_is_for_kq_sygz").attr("checked",true);
                                $(".zcj_jbgz_bl_val_sr").attr('disabled',false);
                                var zgz=parseInt(data.data['total_num']);
                                var syqz=parseInt(data.data['test_num'])
                                var gzbl=syqz/zgz*100;
                                $(".zcj_jbgz_bl_val_sr").val(gzbl);
                            }else{
                                $(".zcj_is_for_kq_sygz").attr("checked",false);
                                $(".zcj_jbgz_bl_val_sr").attr('disabled',true);
                                $(".zcj_jbgz_bl_val_sr").val('');
                            }
                       /* }*/

                    }else{
                        alert(data.msg);
                    }

                },
                error:function(){
                    alert('服务器错误，请稍后再试');
                }
            })

            /*提成列表*/
            $.ajax({
                type: 'get',
                url: SERVER_URL + "/system-wage-tc/list",
                data:{
                    token: token,
                    category:1
                },
                dataType: "json",
                success: function (data) {
                    console.log("000001000333");
                    console.log(data);
                    console.log("0000010333");
                    if(data.code==0){
                        var html='';
                        /* html='<h2 class="cont_title">提成</h2>';*/
                        $.each(data.dataList,function(index,tclist){
                            html+='<li data-id="'+tclist['id']+'">'+tclist['name']+'</li>'

                        })

                        $(".tanceng .zcj_select_tc_list_sj").html(html)
                    }else{
                        alert(data.msg);
                    }

                },
                error:function(){
                    alert('服务器错误，请稍后再试');
                }
            })
            $(".tanceng .zcj_select_tc_list_sj li").die().live("click",function(){
                var tcid=$(this).data('id');

                $(".zcj_ygrz_xztc_name_show").data('id',tcid);
                $.ajax({
                    type: 'get',
                    url: SERVER_URL + "/system-wage-tc/infobyid",
                    data: {
                        token: token,
                        id: tcid
                    },
                    dataType: "json",
                    success: function (data) {
                        console.log("000001000333");
                        console.log(data);
                        console.log("0000010333");
                        if(data.code==0){
                            $(".zcj_tc1_start_data_num").val(data['data']['tc1_begin_value']);
                            $(".zcj__tc1_end_data_num").val(data['data']['tc1_end_value']);
                            $(".zcj_tc1_tcbfb_data_num").val(data['data']['tc1_percent']);
                            $(".zcj_tc2_start_data_num").val(data['data']['tc2_begin_value']);
                            $(".zcj__tc2_end_data_num").val(data['data']['tc2_end_value']);
                            $(".zcj_tc2_tcbfb_data_num").val(data['data']['tc2_percent']);
                            $(".zcj_tc3_start_data_num").val(data['data']['tc3_begin_value']);
                            $(".zcj__tc3_end_data_num").val(data['data']['tc3_end_value']);
                            $(".zcj_tc3_tcbfb_data_num").val(data['data']['tc3_percent']);
                            $(".zcj_grtc4_start_data_num").val(data['data']['over_begin_value']);
                            $(".zcj_grtc4_end_data_num").val(data['data']['over_end_value']);
                            $(".zcj_grtc4_tcbfb_data_num").val(data['data']['over_percent']);
                            if(data.data['time_type']==1){
                                $(".zj_gr_an_year").text('按年度')
                            }else if(data.data['time_type']==2){
                                $(".zj_gr_an_year").text('按季度')
                            }else if(data.data['time_type']==3){
                                $(".zj_gr_an_year").text('按月度')
                            }
                            if(data.data['task_type']==1){
                                $(".zj_gr_an_profit").text('按流水')
                            }else if(data.data['task_type']==2){
                                $(".zj_gr_an_profit").text('按利润')
                            }
                            if(data.data['ticheng_type']==1){
                                $(".zj_gr_an_quarter").text('按年度')
                            }else if(data.data['ticheng_type']==2){
                                $(".zj_gr_an_quarter").text('按季度')
                            }else if(data.data['ticheng_type']==3){
                                $(".zj_gr_an_quarter").text('按月度')
                            }
                        }else{
                            alert(data.msg);
                        }


                    }
                })
            });
            /*团队提成*/
            $.ajax({
                type: 'get',
                url: SERVER_URL + "/system-wage-tc/list",
                data:{
                    token: token,
                    category:2
                },
                dataType: "json",
                success: function (data) {
                    console.log("000001000444");
                    console.log(data);
                    console.log("0000010444");
                    var html='';
                    if(data.code==0){

                        $.each(data['dataList'],function(index,tclist){
                            html+='<li data-id="'+tclist['id']+'">'+tclist['name']+'</li>';
                        })

                        $(".tanceng .zcj_tdtc_list_select_data").html(html);
                    }else{
                        alert(data.msg);
                    }

                },
                error:function(){
                    alert('服务器错误，请稍后再试');
                }
            })
            $(".tanceng .zcj_tdtc_list_select_data li").die().live("click",function(){
                var tdtcid=$(this).data('id');
                $(".zcj_ygrz_tdtc_name_show").data('id',tdtcid);
                $.ajax({
                    type: 'get',
                    url: SERVER_URL + "/system-wage-tc/infobyid",
                    data: {
                        token: token,
                        id: tdtcid
                    },
                    dataType: "json",
                    success: function (data) {
                        console.log("000001000333");
                        console.log(data);
                        console.log("0000010333");
                        if(data.code==0){
                            $(".zcj_tdtc1_begin_num_val").val(data['data']['tc1_begin_value']);
                            $(".zcj_tdtc1_end_num_val").val(data['data']['tc1_end_value']);
                            $(".zcj_tdtc1_percent_num_val").val(data['data']['tc1_percent']);
                            $(".zcj_tdtc2_begin_num_val").val(data['data']['tc2_begin_value']);
                            $(".zcj_tdtc2_end_num_val").val(data['data']['tc2_end_value']);
                            $(".zcj_tdtc2_percent_num_val").val(data['data']['tc2_percent']);
                            $(".zcj_tdtc3_begin_num_val").val(data['data']['tc3_begin_value']);
                            $(".zcj_tdtc3_end_num_val").val(data['data']['tc3_end_value']);
                            $(".zcj_tdtc3_percent_num_val").val(data['data']['tc3_percent']);
                            $(".zcj_tdtc4_start_data_num").val(data['data']['over_begin_value']);
                            $(".zcj_tdtc4_end_data_num").val(data['data']['over_end_value']);
                            $(".zcj_tdtc4_tcbfb_data_num").val(data['data']['over_percent']);
                            if(data.data['time_type']==1){
                                $(".zj_an_year").text('按年度')
                            }else if(data.data['time_type']==2){
                                $(".zj_an_year").text('按季度')
                            }else if(data.data['time_type']==3){
                                $(".zj_an_year").text('按月度')
                            }
                            if(data.data['task_type']==1){
                                $(".zj_an_profit").text('按流水')
                            }else if(data.data['task_type']==2){
                                $(".zj_an_profit").text('按利润')
                            }
                            if(data.data['ticheng_type']==1){
                                $(".zj_an_quarter").text('按年度')
                            }else if(data.data['ticheng_type']==2){
                                $(".zj_an_quarter").text('按季度')
                            }else if(data.data['ticheng_type']==3){
                                $(".zj_an_quarter").text('按月度')
                            }
                        }else{
                            alert(data.msg);
                        }


                    },
                    error:function(){
                        alert('服务器错误，请稍后再试');
                    }
                })
            });
            /*奖金*/
            $.ajax({
                type: 'get',
                url: SERVER_URL + "/system-wage/list",
                data: {
                    token: token,
                    category: 1
                },
                dataType: "json",
                success: function (data) {
                    console.log("00033333333333333333333355500");
                    console.log(data);
                    console.log("00033333333333333333333355500");
                    if(data.code==0){
                        $(".zcj_jj_price_num_show").val(data['dataList']['money']).data('id',data['dataList']['id'])
                    }else{
                        alert(data.msg);
                    }


                },
                error:function(){
                    alert('服务器错误，请稍后再试');
                }
            })
            /*计件*/
            $.ajax({
                type: 'get',
                url: SERVER_URL + "/system-wage/list",
                data: {
                    token: token,
                    category: 2
                },
                dataType: "json",
                success: function (data) {
                    console.log("000001000555");
                    console.log(data);
                    console.log("0000010555");
                    if(data.code==0){
                        var html=''

                        $.each(data['dataList'],function(index,jjlist){
                            html+='<li data-id="'+jjlist['id']+'">'+jjlist['name']+'</li>'

                        })
                        $(".tanceng .zcj_jj_data_list_name_show").html(html)
                    }else{
                        alert(data.msg);
                    }

                },
                error:function(){
                    alert('服务器错误，请稍后再试');
                }
            })
            $(".tanceng .zcj_jj_data_list_name_show li").die().live("click",function(){
                var jj_id=$(this).data('id');
                $(".zcj_blrz_jj_xz_jq_val").data('id',jj_id)
                $.ajax({
                    type: 'get',
                    url: SERVER_URL + "/system-wage/infobyid",
                    data: {
                        token: token,
                        id: jj_id
                    },
                    dataType: "json",
                    success: function (data) {
                        console.log("000001000555");
                        console.log(data);
                        console.log("0000010555");
                        if(data.code==0){
                            $(".zcj_jj_price_number_show").val(data['data']['money'])
                        }else{
                            alert(data.msg);
                        }


                    },
                    error:function(){
                        alert('服务器错误，请稍后再试');
                    }
                })
            });
            /*任务绩效*/
            $.ajax({
                type: 'get',
                url: SERVER_URL + "/system-wage/list",
                data: {
                    token: token,
                    category: 3
                },
                dataType: "json",
                success: function (data) {
                    console.log("000001000555");
                    console.log(data);
                    console.log("0000010555");
                    if(data.code==0){
                        var html=''

                        $.each(data['dataList'],function(index,rwlist){
                            html+='<li data-id="'+rwlist['id']+'">'+rwlist['name']+'</li>'

                        })
                        $(".tanceng .zcj_rwjx_list_data_show").html(html)
                    }else{
                        alert(data.msg);
                    }

                },
                error:function(){
                    alert('服务器错误，请稍后再试');
                }
            })
            $(".tanceng .zcj_rwjx_list_data_show li").die().live("click",function() {
                var rwjx_id = $(this).data('id');
                $(".zcj_blrz_rwjx_xz_jq_val").data('id', rwjx_id)
                $.ajax({
                    type: 'get',
                    url: SERVER_URL + "/system-wage/infobyid",
                    data: {
                        token: token,
                        id: rwjx_id
                    },
                    dataType: "json",
                    success: function (data) {
                        console.log("000001000555");
                        console.log(data);
                        console.log("0000010555");
                        if(data.code==0){
                            $(".zcj_rwjx_no_wc_num").val(data['data']['times']);
                            $(".zcj_rwjx_no_wc_price").val(data['data']['times_money'])
                        }else{
                            alert(data.msg);
                        }


                    },
                    error:function(){
                        alert('服务器错误，请稍后再试');
                    }
                })
            })
            /**************编辑设定工资确认*********************/
            $(".zcj_blrz_sdgz_end_btn").die().live("click",function(){
                var _this=this;
                var xg_id=$(this).data('id');

                var set_wage=[];
                var set_name=[];
                $(".tanceng .zcj_yg_set_gz_fs input").each(function(){
                    if($(this).is(':checked')){
                        set_wage.push($(this).val());
                        set_name.push($(this).parent().text());
                        /* set_name+=$(this).parent().text()+'+'*/
                    }

                })

                /* $(".zcj_set_gz_fs_id").attr("value","");*/
                var _this=this;
                var total_num;//总工资数额：10000
                if($(".zcj_blrz_zgzi_ze_znum_val").val()!='请输入工资总额'){
                    total_num=$(".zcj_blrz_zgzi_ze_znum_val").val();//试用期工资
                }else{
                    total_num=''
                }
                var basic_num;//基本工资
                if($(".zcj_blrz_jbzi_znum_show").val()!='请输入基本工资'){
                    basic_num=$(".zcj_blrz_jbzi_znum_show").val();//试用期工资
                }else{
                    basic_num=''
                }
                var kpi_num;//绩效工资
                if($(".zcj_blrz_jxzi_se_show").val()!='请输入绩效工资'){
                    kpi_num=$(".zcj_blrz_jxzi_se_show").val();//试用期工资
                }else{
                    kpi_num=''
                }
                // var test_num;
                // if($(".zcj_is_for_kq_sygz").is(":checked")){
                //     if($(".zcj_is_for_kq_sygz").val()!='请输入基本工资比例'){
                //         test_num=$(".zcj_jbgz_bl_val_sr").val();//试用期工资
                //     }else{
                //         test_num=0;
                //     }
                // }else{
                //     test_num=0;
                // }


                var tc_num;//提成总额

                var tc_id;//提成
                if($(".zcj_yg_set_gz_fs .zcj_blrz_tc_val_number").is(":checked")){
                    tc_id=$(".zcj_ygrz_xztc_name_show").data('id');
                    if($(".zcj_ygrz_tc_srze_num").val()=='请输入工资总额(元为单位)'){
                        tc_num=0;
                    }else{
                        tc_num=$(".zcj_ygrz_tc_srze_num").val();
                    }
                }else{
                    tc_id='';
                    tc_num=0;
                }
                var test_num; //试用期工资
                var test_begin_time;//开始时间
                var test_end_time;//结束时间
                if($(".tanceng .zcj_is_for_kq_sygz").is(":checked")){
                    if($(".tanceng .zcj_jbgz_bl_val_sr").val()>0){
                        test_num=$(".tanceng .zcj_sygz_shu_e").text();//试用期工资
                    }else{
                        test_num=0;
                    }
                    if($(".zcj_syq_start_time").val()=='请选择日期' || $(".zcj_syq_start_time").val()=='0000-00-00'){
                        test_begin_time=''
                    }else{
                        test_begin_time=$(".zcj_syq_start_time").val();
                    }
                    if($(".zcj_syq_end_time").val()=='请选择日期' || $(".zcj_syq_end_time").val()=='0000-00-00'){
                        test_end_time=''
                    }else{
                        test_end_time=$(".zcj_syq_end_time").val();
                    }
                }else{
                    test_num=0;
                    test_begin_time='';
                    test_end_time='';
                }

                var tdtc_num;//团队提成总额
                var tdtc_id;//团队提成id
                if($(".zcj_yg_set_gz_fs .zcj_blrz_tdtc_val_number").is(":checked")){
                    tdtc_id=$(".zcj_ygrz_tdtc_name_show").data('id');
                    if($(".zcj_blrz_tdtc_rw_znum").val()=='请输入工资总额(元为单位)'){
                        tdtc_num=0;
                    }else{
                        tdtc_num=$(".zcj_blrz_tdtc_rw_znum").val();
                    }
                }else{
                    tdtc_id='';
                    tdtc_num=0;
                }
                // var bonus_id=$(".zcj_jj_price_num_show").data('id');//奖金提成id
                // var piece_id=$(".zcj_blrz_jj_xz_jq_val").data('id');//计件id
                // var task_id=$(".zcj_blrz_rwjx_xz_jq_val").data('id');//任务绩效
                var bonus_id;//奖金
                if($(".zcj_yg_set_gz_fs .zcj_blrz_jjtc_val_number").is(":checked")){
                    bonus_id=$(".zcj_jj_price_num_show").data('id')
                }else{
                    bonus_id='';
                }
                var piece_id;//计件
                if($(".zcj_yg_set_gz_fs .zcj_blrz_jiantc_val_number").is(":checked")){
                    piece_id=$(".zcj_blrz_jj_xz_jq_val").data('id')
                }else{
                    piece_id='';
                }
                var task_id;//任务绩效
                if($(".zcj_yg_set_gz_fs .zcj_blrz_rwjxtc_val_number").is(":checked")){
                    task_id=$(".zcj_blrz_rwjx_xz_jq_val").data('id');
                }else{
                    task_id='';
                }
                if(total_num<=0){
                    alert("请输入工资总额");
                }else if(basic_num<=0){
                    alert("请输入基本工资")
                }else{
                    $.ajax({
                        type: 'post',
                        url: SERVER_URL + "/wage/add",
                        data:{
                            token: token,
                            id:xg_id,
                            uid:editid,
                            total_num:total_num,
                            basic_num:basic_num,
                            kpi_num:kpi_num,
                            test_num:test_num,
                            tc:tc_id,
                            tdtc:tdtc_id,
                            bonus:bonus_id,
                            piece:piece_id,
                            task:task_id,
                            tdtc_total_money:tdtc_num,
                            tc_total_money:tc_num,
                            test_begin_time:test_begin_time,
                            test_end_time:test_end_time
                        },
                        dataType: "json",
                        success: function (data) {
                            console.log("000001000");
                            console.log(data);
                            console.log("0000010");
                            if(data.code==0){
                                /*  $(".zcj_edit_yg_gz_yc_id").val('');*/
                                $(".zcj_edit_yg_gz_yc_id").val(set_wage.toString());
                                var bjgz_data = set_name.join('+');
                                $(".zcj_ygbj_set_show_gz_name").text(bjgz_data);
                                delbtn(_this)
                                if($(".zcj_ygbj_set_show_gz_name").text()!=''){
                                    $(".zcj_set_gz_v_hidden_img").show();
                                }else{
                                    $(".zcj_set_gz_v_hidden_img").hide();
                                }
                            }
                        },
                        error:function(){
                            alert('服务器错误，请稍后再试');
                        }
                    })
                }

            });
        });
        /*员工编辑信息福利编辑*/
        $(".zcj_yg_yzblrz_info_edit_gsfl_btn").die().live("click",function(){
            bjfl_list_show_fn();
            /*确定添加*/
            $(".zcj_blrz_add_gs_fl_end_btn").die().live("click",function(){
                var _this=this;
                var fl_lb=$(".zcj_blrz_add_gsfl_lb_val").val()
                var fl_je=$(".zcj_blrz_add_gsfl_je_price").val();
                $.ajax({
                    type: 'post',
                    url: SERVER_URL + "/welfare/add",
                    data:{
                        token:token,
                        name:fl_lb,
                        money:fl_je

                    },
                    dataType: "json",
                    success: function (data) {
                        console.log("000001111");
                        console.log(data);
                        console.log("000001");
                        if(data.code==0){
                            bjfl_list_show_fn();
                            delbtn(_this);
                        }else{
                            alert(data.msg);
                        }


                    },
                    error:function(){
                        alert('服务器错误，请稍后再试');
                    }
                })
            });
            /*编辑公司福利*/
            $(".zcj_gsfl_edit_btn").die().live("click",function(){
                var bjid=$(this).attr("editid");
                var price=$(this).parent().prev().text();
                var flname=$(this).parent().prev().prev().text();
                $(".zcj_blrz_bj_jezs_val").val(price);
                $(".zcj_blrz_bj_cb_val").val(flname);
                $(".zcj_blrz_bj_qd_end_btn").die().live("click",function(){
                    var _this=this;

                    var fl_lb=$(".zcj_blrz_bj_cb_val").val()
                    var fl_je=$(".zcj_blrz_bj_jezs_val").val();
                    $.ajax({
                        type: 'post',
                        url: SERVER_URL + "/welfare/add",
                        data:{
                            token:token,
                            id:bjid,
                            name:fl_lb,
                            money:fl_je

                        },
                        dataType: "json",
                        success: function (data) {
                            console.log("000001111");
                            console.log(data);
                            console.log("000001");
                            if(data.code==0){
                                bjfl_list_show_fn();
                                delbtn(_this);
                            }else{
                                alert(data.msg);
                            }


                        },
                        error:function(){
                            alert('服务器错误，请稍后再试');
                        }
                    })
                });
            });

            /*删除*/
            $(".zcj_ygrz_bjfl_del_btn").die().live("click",function(){
                var delid=$(this).prev().attr("editid");
                $.ajax({
                    type: 'get',
                    url: SERVER_URL + "/welfare/deldata",
                    data:{
                        token: token,
                        id:delid
                    },
                    dataType: "json",
                    success: function (data) {

                        console.log(data);
                        if(data.code==0){
                            //alert(data.msg);
                            edit_list_data(".zcj_bmpx_edit_list_show");
                        }else{
                            alert(data.msg);
                        }
                    },
                    error:function(){
                        alert('服务器错误，请稍后再试');
                    }

                })
            });
            /*福利编辑确认*/
            $(".zcj_blrzyg_bjfl_enter_btn").die().live("click",function(){
                data_list_edit();
                delbtn(this)
            });
        });

        /***************确认编辑保存**************************/
        $(".tanceng .zcj_bc_info").die().live("click",function(){
            var _this=this;

            /*入职时间*/
            var work;
            if($(".zcj_yg_edit_show_time").val() =='请选择日期' || $(".zcj_yg_edit_show_time").val() =='0000-00-00'){
                work='';
            }else{
                work=$(".zcj_yg_edit_show_time").val();
            }

            /*  入职培训*/
            var entrytraining_type= $(".zcj_yg_edit_rzpx_id_yc").val();

            /*   var skill= $(".zcj_skill").html();*/
            /* 公积金数额*/
            var salary;
            if($(".zcj_ygblrz_jlgjj_qr").is(':checked')){
                salary=$(".zcj_yg_blrz_gjj_se_num").val();
            }else{
                salary='';
            }

            /*社保金额*/
            var provide;
            if($(".zcj_ygblrz_jlsb_qr").is(':checked')){
                provide=$(".zcj_yg_blrz_shebao_js_num").val();
            }else{
                provide='';
            }
            /*福利*/
            var edit_gsfl=[];
            var edit_name=[]
            $(".tanceng .zcj_yg_rz_gs_fl_list_show .zcj_ygrz_bl_gsfl_xz").each(function(){
                if($(this).is(':checked')){
                    edit_gsfl.push($(this).attr('flid'))
                    edit_name.push($(this).data('name'))
                }

            })

            /*工资*/
            var wage=$(".zcj_edit_yg_gz_yc_id").val();
            /*福利*/
            /*角色id*/
            var role_id=$('.zcj_select_role_name_id').data('id');
            if(role_id==''){
                alert("请选择角色")
            }else if(work==''){
                alert("请输入入职时间");
            }else if(wage==''){
                alert("请先设定工资");
            }else{
                $.ajax({
                    url: SERVER_URL + "/admin/ruzhisave",
                    type: "post",
                    data:{
                        token: token,
                        id: editid,//用户ID：1
                        entrytraining_type:entrytraining_type,//入职培训id：1
                        workdate:work,//入职时间
                        wage:wage,//工资构成：1,2,3 工资 1基本工资 2绩效 3提成 3团队提成 5奖金 6计件 7任务绩效
                        fund_money:salary,//公积金数额
                        social_security_money:provide,//社保金额：
                        welfare_type:edit_gsfl.toString(),//福利ID：1,2,3
                        welfare:edit_name.toString(),//福利名称：车补,饭补
                        job_status:3,  //状态：2办理中 3确认入职 当点击“保存”则job_status值为2 反之值为3
                        role_id:role_id
                    },

                    dataType: "json",
                    success: function(result){

                        console.log(result);
                        if(result.code==0) {
                            alert("编辑成功");
                            depart_staff_list();
                            //delbtn(_this);
                            $(_this).parents('.dialog_content').find('.dialog_close').click();
                        }
                    },
                    error: function (data) {
                        alert('服务器错误，请稍后再试');
                    }
                });
            }


        });

        setTimeout(function(){
            /*入职培训图片*/
            if($(".tanceng .zcj_bjyg_rzpx_name_show").text()!=''){
                $(".zcj_v_hidden_img").show();
            }else{
                $(".zcj_v_hidden_img").hide();
            }
            /*设定工资图片*/
            if($(".tanceng .zcj_ygbj_set_show_gz_name").text()!=''){
                $(".zcj_set_gz_v_hidden_img").show();
            }else{
                $(".zcj_set_gz_v_hidden_img").hide();
            }
        },200);

    });
    // /*未办理入职方法*/
    // function no_bl_rz_fn() {
    //     $.ajax({
    //         type: 'get',
    //         url: SERVER_URL + "/dept/peoplecount",
    //         data: {
    //             token: token,
    //             /*   name:depname, */
    //             jobstatus: '1'
    //         },
    //
    //         dataType: "json",
    //         success: function (data) {
    //             console.log('lz000');
    //             console.log(data);
    //             console.log('lz000');
    //             var rz_html='';
    //             $('.zcj_allrz_num').text('('+data['totalCount']+')');
    //             $.each(data['list'],function (index,rz_list) {
    //
    //
    //                 rz_html += "<li class='hr_left_2 hr_left_bmyg2' arr=" + rz_list.id + "><span>" + rz_list.name + "</span></li>";
    //
    //             })
    //             $(".zcj_enter_licon").html(rz_html);
    //
    //
    //         },
    //         error:function(){
    //             alert('服务器错误，请稍后再试');
    //         }
    //     });
    // }
    // /*办理中方法*/
    // function conter_bl_rz_fn() {
    //     $.ajax({
    //         type: 'get',
    //         url: SERVER_URL + "/dept/peoplecount",
    //         data: {
    //             token: token,
    //             /*   name:depname, */
    //             jobstatus: '2'
    //         },
    //
    //         dataType: "json",
    //         success: function (data) {
    //             console.log('lz000');
    //             console.log(data);
    //             console.log('lz000');
    //             var rz_html='';
    //             $('.zcj_allrz_num').text('('+data['totalCount']+')');
    //             $.each(data['list'],function (index,rz_list) {
    //
    //
    //                 rz_html += "<li class='hr_left_2 hr_left_bmyg2' arr=" + rz_list.id + "><span>" + rz_list.name + "</span></li>";
    //
    //             })
    //             $(".zcj_enter_licon").html(rz_html);
    //
    //
    //         },
    //         error:function(){
    //             alert('服务器错误，请稍后再试');
    //         }
    //     });
    // }
    // /*已办理入职方法*/
    // function end_bl_rz_fn() {
    //     $.ajax({
    //         type: 'get',
    //         url: SERVER_URL + "/dept/peoplecount",
    //         data: {
    //             token: token,
    //             /*   name:depname, */
    //             jobstatus: '3'
    //         },
    //
    //         dataType: "json",
    //         success: function (data) {
    //             console.log('lz000');
    //             console.log(data);
    //             console.log('lz000');
    //             var rz_html='';
    //             $('.zcj_allrz_num').text('('+data['totalCount']+')');
    //             $.each(data['list'],function (index,rz_list) {
    //
    //
    //                 rz_html += "<li class='hr_left_2 hr_left_bmyg2' arr=" + rz_list.id + "><span>" + rz_list.name + "</span></li>";
    //
    //             })
    //             $(".zcj_enter_licon").html(rz_html);
    //
    //
    //         },
    //         error:function(){
    //             alert('服务器错误，请稍后再试');
    //         }
    //     });
    // }
    /*未办理入职*/

    $(".zcj_not_bl").die().live("click",function () {


            perdata.id='';
            perdata.jobstatus='1,2';
            perdata.page=1;
            depart_staff_list();

            // left_fn.jobstatus='1';
            // perdata.page=1;
            // list_wb_show_fn();


        /*$(this).append('<cite></cite>');*/
       //list_ry_show_fn();
       /* $(".zj_bl_rz_count").text('('+data.totalCount+')');*/
    });
    $(".zcj_not_bl").trigger('click');
    $(".zcj_wrzhi_ry .hr_left_bmyg2").die().live("click",function () {
        var wbl_id=$(this).attr("wid");
        perdata.page=1;
        perdata.id=wbl_id;
        depart_staff_list()
        /* $(".zj_bl_rz_count").text('('+data.totalCount+')');*/
    });
    /*已办理入职*/

    $(".zcj_endenter_bl").die().live("click",function () {


            perdata.id='';
            perdata.page=1
            /*已办理入职员工*/
            perdata.jobstatus='3';
            depart_staff_list();
            // left_fn.jobstatus='3';
            // list_ry_show_fn();


       /* $(".zj_bl_rz_count").text('('+data.totalCount+')');*/

    });
    $(".zcj_yrzhi_ry .hr_left_bmyg2").die().live("click",function () {
        var ybl_id=$(this).attr("yid");
        perdata.page=1;
        perdata.id=ybl_id;
        depart_staff_list()
        /* $(".zj_bl_rz_count").text('('+data.totalCount+')');*/
    });


    /*搜索功能*/

        $('.zcj_searchbtn').die().live("click",function(){
           /* var allpage = $(".zcj_select_num").val();*/
            var search = $("#hr_search").val();
            if(search!='搜索成员姓名'){
                perdata.key=search;
            }else{
                perdata.key='';
            }
           /* console.log(search);*/
            perdata.page=1;
            depart_staff_list();

        });
        // $("#hr_search").blur(function () {
        //     perdata.key='';
        //     depart_staff_list();
        // });
        /*高级搜索功能*/
    var ssdata={
        token: token,
        page: 1,
        limit: 100,
        /* dept: "2",*/
        jobstatus: "1,2,3"
        /* down: "1",*/
        /*  data_type: "0"*/
    }
        $(".zcj_yg_blrz_gjss_btn").die().live("click",function(){
            if($(this).text()=='展开高级搜索'){
                return true;
            }
            $.ajax({
                type: 'post',
                url: SERVER_URL + "/admin/employeelist",
                data:ssdata,
                dataType: "json",
                success: function (data) {
                    var sslist="";

                    $.each(data.rows,function(index,editlist){
                            if(editlist['welfare']!=''){
                                sslist+='<li fid="'+editlist['id']+'">'+editlist['welfare']+'</li>';
                            }

                    });

                    $(".zcj_gs_fl_ygrz_list_show").html(sslist);
                }
            });
            /*状态搜索*/
            $(".zcj_yg_blrz_zt_list_zs li").die().live("click",function(){
                var str=$(this).attr("val");
                perdata.jobstatus=str;
                perdata.page=1;
                depart_staff_list();
            })
            /*设定工资*/
            $(".zcj_yg_rz_gz_set_list li").die().live("click",function(){
                var gz_id=$(this).attr("gz");
                perdata.wage=gz_id;
                perdata.page=1;
                depart_staff_list();
            })
            /*社保*/
            $(".zcj_shebao_show_list li").die().live("click",function(){
                var sb=$(this).attr("as");
                perdata.social_security_money=sb;
                perdata.fund_money=sb;
                perdata.page=1;
                depart_staff_list();
            })
            /*公司福利*/
            $(".zcj_gs_fl_ygrz_list_show li").die().live("click",function(){
                var fl=$(this).text();
                perdata.welfare=fl;
                perdata.page=1;

                depart_staff_list();
            })
        });

 /*已办理人员信息*/
    $(".zcj_hr_end_btn").die('click').live("click",function(){
        var _this=this;
        var info=$(this).attr("checkid");
        /*alert(info);*/
        $.ajax({
            type: 'get',
            url: SERVER_URL + "/admin/loadadmin",
            data: {
                token: token,
                id:info
             },

            dataType: "json",
            success: function (data) {
                console.log(data);
            var gz_lb='';
            if(data.code==0){
                var gz_name=[];
                /* alert(data.data.name);*/
                if(data.data.face==''){
                    $(".hr_emploeelist_Sideslip-head .sides-img img").attr('src','static/images/hr_touxiang.png');

                }else{
                    $(".hr_emploeelist_Sideslip-head .sides-img img").attr('src',getImgUrl(data.data.face));
                }

                $(".zj_yg_rzhi_name").html(data.data.name+'('+data.data.sex+')');
                var ybl_ry=$(".zcj_yg_rz_bl_info_show p span");
                ybl_ry.eq(0).text(data.data.workdate);
                ybl_ry.eq(1).text(data.data['entrytraining_name']);
                /* ybl_ry.eq(2).text(data.data.skilltraining_name);*/

                gz_lb=data.data.wage;

                if(gz_lb.indexOf(1)>-1){
                    gz_name.push("基本工资");
                }
                if(gz_lb.indexOf(2)>-1){
                    gz_name.push("绩效");
                }
                if(gz_lb.indexOf(3)>-1){
                    gz_name.push("提成");
                }
                if(gz_lb.indexOf(4)>-1){
                    gz_name.push("团队提成");
                }
                if(gz_lb.indexOf(5)>-1){
                    gz_name.push("奖金");
                }
                if(gz_lb.indexOf(6)>-1){
                    gz_name.push("计件");
                }
                if(gz_lb.indexOf(7)>-1){
                    gz_name.push("任务绩效");
                }
                var gz_data = gz_name.join('+');
                ybl_ry.eq(2).text(gz_data);

                /*ybl_ry.eq(4).text(data.data.socialsecurity);*/
                if(data.data.social_security_money>0 && data.data.fund_money<=0){

                    ybl_ry.eq(3).text("社保");
                }else
                if(data.data.social_security_money<=0 && data.data.fund_money>0){

                    ybl_ry.eq(3).text("公积金");
                }else
                if(data.data.social_security_money>0 && data.data.fund_money>0){

                    ybl_ry.eq(3).text("社保,公积金");
                }else{
                    ybl_ry.eq(3).text("");
                }

                ybl_ry.eq(4).text(data.data.welfare);
            }else{
                alert(data.msg);
            }

              /*  $(".zcj_time_val").html(data.data.workdate);
                $(".zcj_end_val").html(data.data.entrytraining_name);
                $(".zcj_skill_val").html(data.data.skilltraining_name);
                $(".zcj_salary_val").html(data.data.wage_type);
                $(".zcj_set_val").html(data.data.socialsecurity);
                $(".zcj_weal_val").html(data.data.welfare);
                $(".zcj_work_val").html(data.data.welfarestr);*/


            }
        });
        /*查看 编辑*/
        $(".zj_check_edit_info_btn").die().live("click",function(){
            $(_this).parents('tr').find('.zcj_yg_blrz_edit_info').click();
            $(this).parents('.hr_Sideslip').find('.hr_slider_close').click();
        });

    });

/*刷新*/
$(".zcj_rzhibl_dl_sx_btn").die().live("click",function(){

    $(".zj_all_end").trigger('click');
    perdata.page=1;
   /* perdata.limit=10,*/
    perdata.key='';
    perdata.jobstatus='';
    perdata.wage='';
    perdata.social_security_money='';
    perdata.fund_money='';
    perdata.welfare='';
    depart_staff_list();
});


});
