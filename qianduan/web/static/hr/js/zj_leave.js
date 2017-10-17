
$(function () {

   var token=Admin.get_token();

    var company_admin=localStorage.getItem("company_admin");
    var uid = localStorage.getItem("uid");

    // 选择查看项
    // 定义查看项
    /*var venCustomLookAbledField = [
        {'index': null, 'field': '姓名'},
        {'index': null, 'field': '部门'},
        {'index': null, 'field': '岗位名称'},
        {'index': null, 'field': '职责'},
        {'index': null, 'field': '身份证'},
        {'index': null, 'field': '性别'},
        {'index': null, 'field': '出生日期'},
        {'index': null, 'field': '住址'},
        {'index': null, 'field': '学历'},
        {'index': null, 'field': '操作'}

    ];
    likShow('.zj_leave_table_id',venCustomLookAbledField,'.zj_ul_check_id','.zj_bc_check_id','.zj_hf_mr_id');*/
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

           /* html += '</li>';*/
            html += '</ul>';
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
   /* var str1 = '2010年9月16日 14:38:20';
    var str2 = '2010/9/10 18:25:18';*/
    //用字符串分割, 精确到日
    function Days(day1, day2){

        var y1, y2, m1, m2, d1, d2;//year, month, day;
        y1 = parseInt(day1.split('-')[0]);
        y2 = parseInt(day2.split('-')[0]);

        m1 = parseInt(day1.split('-')[1]);
        m2 = parseInt(day2.split('-')[1]);

        d1 = parseInt(day1.split('-')[2]);
        d2 = parseInt(day2.split('-')[2]);

        var date1 = new Date(y1, m1, d1);
        var date2 = new Date(y2, m2, d2);

        //用距标准时间差来获取相距时间
        var minsec = Date.parse(date2) - Date.parse(date1);
        var days = minsec / 1000 / 60 / 60 / 24; //factor: second / minute / hour / day

        return days;
    }


    var powerUrls=localStorage.getItem("user_info_url");
    var power=JSON.parse(powerUrls);

    //var add_r="admin/add";//人员添加 修改
    //var check_rz="admin/loadadmin";//查看
    var lz_b="admin/ruzhisave";//办理离职
    //var bj_rz="admin/ruzhisave";//编辑



    /*所有入职人员*/
    var perlzdata={
        token: token,
        page: 1,
        limit: 10,
        order_by:'jobnumber',
        order_sort:0,
         dept: "",
        jobstatus: '3'
        /*  down: "1",
         data_type: "1"*/
    };
  function shownum(){

    $.ajax({
        type: "post",
        url: SERVER_URL + "/admin/employeelist",
        data:perlzdata,
        async: false,
        dataType: "json",
        success: function (data) {
            if(data.rows.length>0){
                $(".zcj_no_data_show_company_leave").hide();
                $(".zcj_lzall_page").show();

            }else{
                $(".zcj_no_data_show_company_leave").show();
                $(".zcj_lzall_page").hide();

            }
            // $(".zcj_leave_info tr:first-child").siblings().empty();
            console.log(data);
            $(".zcj_bllz_wbl_gs_num").text(data.totalCount);
            $(".zcj_bllz_zg_num").text(data.totalCount)
            var html = "";
            var info = "";
            $.each(data['rows'],function (index,yg_info) {

                info += "<tr><td>" + likNullData(yg_info.name) + "</td><td>" + likNullData(yg_info.jobnumber) + "</td><td>" + likNullData(yg_info.deptname) + "</td> <td>" + likNullData(yg_info.ranking) + "</td> <td>" + (likNullData(yg_info.workdate)=='0000-00-00' ? '-' : likNullData(yg_info.workdate)) + "</td> <td>" + (likNullData(yg_info.leavedate)=='0000-00-00' ? '-' : likNullData(yg_info.leavedate)) + "</td>";
                if(likNullData(Days(yg_info.workdate,yg_info.leavedate))!=NaN && likNullData(Days(yg_info.workdate,yg_info.leavedate))>0){
                    info+="<td>" + likNullData(Days(yg_info.workdate,yg_info.leavedate)) + "</td>"
                }else{
                    info+="<td>-</td>"
                }

                info+=" <td>" + likNullData(yg_info.handoverperson) + "</td> <td>" + (likNullData(yg_info.socialsecurity_quittime)=='0000-00-00' ? '-' : likNullData(yg_info.socialsecurity_quittime)) + "</td>"
                if(yg_info.company_admin==1){
                    info+="<td><button class='but_mix1 but_grey1 val_dialog zcj_bl_leave_info' disabled='true' name='hr_bllz_Msg' arrid=" + yg_info.id + ">办理离职</button></td> </tr>"
                }else{
                    info+="<td><button class='but_cancal but_mix but_red val_dialog zcj_bl_leave_info' name='hr_bllz_Msg' arrid=" + yg_info.id + ">办理离职</button></td> </tr>"
                }


            })

            $(".zcj_leave_info").html(info);

            var znum=data.totalCount;
            var cur=data.rows.length;
            list_table_render_pagination(".zcj_lzall_page", perlzdata, shownum, znum, cur);
            /* $(".zj_bc_check_id").trigger('click');*/
            if(company_admin!=1){
                /*办理离职*/
                if($.inArray(lz_b,power)>-1){
                    $(".zcj_bl_leave_info").show();

                }else{
                    $(".zcj_bl_leave_info").hide();

                }

            }

        },
        error:function(){
            alert('更新失败，请稍后再试');
        }
    });
}
/*离职员工列表*/
var lz_data={
    token: token,
    page: 1,
    limit: 10,
    /*  dept: "0",*/
    jobstatus: '4'
    }
function lz_left_ry_fn() {
    $.ajax({
        type: "get",
        url: SERVER_URL + "/dept/peoplecount",
        data:lz_data,
        async: false,
        dataType: "json",
        success: function (data) {
            console.log('10000');
            console.log(data);
            console.log('10000');
            if(data.rows.length>0){
                $(".zcj_no_data_show_company_leave").hide();
                $(".zcj_lzall_page").show();

            }else{
                $(".zcj_no_data_show_company_leave").show();
                $(".zcj_lzall_page").hide();

            }
            $(".zcj_allylz_num").text("("+data['totalCount']+")")
            if(data.code==0){
                var lz_html='';
                var lz_info='';
                $.each(data['rows'],function (index,lz_list) {

                    lz_html += "<li class='hr_left_2 hr_left_bmyg2' arr=" + lz_list.id + "><span>" +  lz_list.name + "</span></li>";
                        lz_info += "<tr><td>" + likNullData(lz_list.name) + "</td><td>" + likNullData(lz_list.jobnumber) + "</td><td>" + likNullData(lz_list.deptname) + "</td> <td>" + lz_list.ranking + "</td> <td>" + lz_list.workdate + "</td> <td>" + lz_list.leavedate + "</td> <td>" + Days(lz_list.workdate,lz_list.leavedate) + "</td> <td>" + lz_list.handoverperson + "</td> <td>" +likNullData(lz_list.socialsecurity_quittime) + "</td><td><button class='but_mix but_look r_sidebar_btn zcj_check' numid="+lz_list.id+" name='hr_bllz_look'>查看</button><button class='but_mix but_r but_del val_dialog zcj_del_leave_but' name='hr_yglz_delete' delid="+lz_list.id+">删除</button></td></tr>";

                })
                $(".zcj_leave_info").html(lz_info);
                $(".zcj_leave_licon").html(lz_html);
                var znum=data.totalCount;
                var cur=data.rows.length;
                list_table_render_pagination(".zcj_lzall_page", perlzdata, lz_left_ry_fn, znum, cur);

            }else{
                alert(data.msg);
            }

        },
        error:function(){
            alert('更新失败，请稍后再试');
        }
    })
}
     lz_left_ry_fn();
    /*已入职人员方法*/
    function entry_ry_fn() {
        $.ajax({
            type: 'get',
            url: SERVER_URL + "/dept/peoplecount",
            data: {
                token: token,
                /*   name:depname, */
                jobstatus: '3'
            },

            dataType: "json",
            success: function (data) {
                console.log('lz000');
                console.log(data);
                console.log('lz000');
                var rz_html='';
                $('.zcj_allrz_num').text('('+data['totalCount']+')');
                $.each(data['rows'],function (index,rz_list) {


                    rz_html += "<li class='hr_left_2 hr_left_bmyg2' arr=" + rz_list.id + "><span>" + rz_list.name + "</span></li>";

                })
                $(".zcj_enter_licon").html(rz_html);


            },
            error:function(){
                alert('更新失败，请稍后再试100');
            }
        });
    }


    /*已入职人员显示*/
    $(".z_entrybtn").die().live("click",function(){
        entry_ry_fn();

        perlzdata.jobstatus=3;
        perlzdata.page=1;
        perlzdata.id='';
        shownum();
    });
    $(".z_entrybtn").trigger('click');
    /*已离职人员显示*/
    $(".z_lizhibtn").die().live("click",function(){
        lz_data.jobstatus=4;
        perlzdata.page=1;
        lz_data.id='';
        lz_left_ry_fn();

    })

    /*入职*/
    $(".zcj_enter_licon .hr_left_bmyg2").die().live("click",function () {
        var rz_id=$(this).attr('arr');
        perlzdata.id=rz_id;
        perlzdata.page=1;
        shownum();
        /*lz_left_ry_fn();*/
    });
    /*离职*/
    $(".zcj_leave_licon .hr_left_bmyg2").die().live("click",function () {
        var lz_id=$(this).attr('arr');
        lz_data.id=lz_id;
        perlzdata.page=1;
        lz_left_ry_fn();
       /* lz_left_ry_fn();*/
    });
    /*查看办理离职员工信息*/
    $(".zcj_bl_leave_info").die().live("click",function () {
                var lzid = $(this).attr("arrid");

                /*选择交接人树结构*/
                $(".zcj_hr_bllz_select_jjr_tc_btn").die().live("click",function(){
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
                            var head='<li class="left_all"><span class="icon_open change_ba"></span><span class="icon_file"></span><span class="list_msg">所有分类(4)</span></li>';
                            $(".zcj_hr_yg_bllz_tree_list_show").html(head+tree_list_bmfzr(data,deep));

                            /*寻找离职人*/
                            setTimeout(function(){
                                $(".tanceng .zcj_hr_yg_bllz_tree_list_show li").each(function(){
                                    if($(this).attr('userinfoid')==lzid){
                                        // alert($(this).find('.list_msg').html())
                                        $(this).hide();
                                    }
                                })
                            },100)
                        },
                        error:function(){
                            alert('更新失败，请稍后再试');
                        }
                    });

                    $(".zcj_hr_yg_bllz_tree_list_show .person_left_nav").die().live("click",function(){
                        var manid=$(this).attr("userinfoid");
                        var manname=$(this).children(".list_msg").text();
                        $(".zcj_hr_bllz_select_man_end_btn").die().live("click",function(){
                            $("#zj_hid_hr_man_id").val(manid);
                            $(".zj_jao_info").val(manname).addClass('c_3');
                            $(this).next().click();
                        });
                    });


                });
               /* alert($id);*/
                $.ajax({
                    type: "get",
                    url: SERVER_URL + "/admin/loadadmin",
                    data: {
                        token: token,
                        id: lzid,
                        data_type: "1"
                    },
                    dataType: "json",
                    success: function (num) {
                         console.log("12300");
                        console.log(num);
                        console.log("12300");
                        if(num.data.face==''){
                            $(".zj_leave_ry_icon_info").attr('src','static/hr/images/touxiang.png')
                        }else{
                            $(".zj_leave_ry_icon_info").attr('src',getImgUrl(num.data.face));
                        }

                        $(".zcj_out_dimission").data("name",num.data.name).data('admin',num.data.company_admin)
                        /*姓名*/
                         $(".zj_name1_info").attr("value", num.data.name);
                        /*工号*/
                        $(".zj_num1_info").attr("value", num.data.jobnumber);
                        /*性别*/
                        $(".zj_sex1_info").attr("value", num.data.sex);
                        /*手机*/
                        $(".zj_mobile_info").attr("value", num.data.mobile);
                        /*部门*/
                        $(".z_door_info").attr("value", num.data.deptname);
                        /*职位*/
                        $(".zj_zhy_info").attr("value", num.data.ranking);
                        /*邮箱*/
                        $(".zj_mal_info").attr("value", num.data.email);
                        /*入职日期*/
                        if(num.data.workdate=='0000-00-00' || num.data.workdate=='0000-00-00 00:00:00'){
                            $(".zj_data1_info").val(" ");
                        }else{
                            $(".zj_data1_info").attr("value", num.data.workdate);
                        }

                        /*离职日期*/
                        if(num.data.leavedate=='0000-00-00' || num.data.leavedate=='0000-00-00 00:00:00'){
                            $(".zj_riq_info").attr("value", '请选择离职日期');
                        }else{
                            $(".zj_riq_info").attr("value", num.data.leavedate);
                        }

                        /*工作交接人*/

                            $(".zj_hid_hr_man_id").val(num.data['handoverperson_id'])
                        if(num.data.handoverperson==''){
                            $(".zj_jao_info").attr("value", '请选择工作交接人');
                        }else {
                            $(".zj_jao_info").attr("value", num.data.handoverperson);
                        }



                        /*离职原因*/
                        if(num.data.leavecouse==''){
                            $(".zj_leave_reason_info").attr("value", '请输入离职原因');
                        }else{
                            $(".zj_leave_reason_info").attr("value", num.data.leavecouse);
                        }

                        /*迁出时间*/
                        if(num.data.socialsecurity_quittime=='0000-00-00' || num.data.leavedate=='0000-00-00 00:00:00'){
                            $(".zj_qchu_data_info").attr("value", "请选择社保迁出时间");
                        }else{
                            $(".zj_qchu_data_info").attr("value", num.data.socialsecurity_quittime);
                        }



                    },
                    error:function(){
                        alert('更新失败，请稍后再试');
                    }
                });
        // function Days(day1){
        //     var year,month,day;
        //
        //     year = parseInt(day1.split('-')[0]);
        //
        //
        //     month = parseInt(day1.split('-')[1]);
        //
        //
        //     day = parseInt(day1.split('-')[2]);
        //
        //
        //     var date1 = new Date(year, month, day);
        //
        //     //用距标准时间差来获取相距时间
        //     var minsec = Date.parse(date1);
        //     var days = minsec / 1000 / 60 / 60 / 24; //factor: second / minute / hour / day
        //
        //     return days;
        // }
                /*确认离职*/
                $(".zcj_out_dimission").die().live("click",function(){
                    var _this=this;
                    var ad=$(this).data('admin');

                    $(this).attr('name','').removeClass('.val_dialogTop');
                    /*离职日期*/
                    var z_lz;
                    if($(".zj_riq_info").val()=='0000-00-00' || $(".zj_riq_info").val()=='请选择离职日期'){
                        z_lz='';
                    }else{
                        z_lz=$(".zj_riq_info").val();
                    }
                    // var zl_time=Days(z_lz);
                    /*交接人*/
                    var z_receive = $(".zj_jao_info").val();
                    /* 离职原因*/
                    var leave;
                    if($(".zj_leave_reason_info").val()=='请输入离职原因'){
                        leave='';
                    }else{
                        leave=$(".zj_leave_reason_info").val();
                    }
                    /*迁出社保时间*/
                    var quit;
                    if($(".zj_qchu_data_info").val()=='0000-00-00' || $(".zj_qchu_data_info").val()=='请选择社保迁出时间'){
                        quit=''
                    }else{
                        quit= $(".zj_qchu_data_info").val();
                    }
                    var lz_name=$(".zcj_out_dimission").data('name');
                    $(this).attr('name','').removeClass('val_dialogTop');
                    if(uid==lzid){
                        alert('不可以离职自己');
                        return false;
                    }else if(ad>0){
                        alert('对方是超级管理员不可以离职');
                        return false;
                    }else if(leave==''){
                        alert('请输入离职原因');
                        return false;
                        //$(_this).attr('name','hr_yglz_leave_del').addClass('val_dialogTop');
                    }else if(z_lz<=0 || z_lz==''){

                        alert('请输入离职时间');
                        return false;

                    }else{
                        $(_this).attr('name','hr_yglz_leave_del').addClass('val_dialogTop');
                        if (confirm("你确定要离职吗？")) {

                            /* alert("点击了确定");*/
                            $.ajax({
                                type: "post",
                                url: SERVER_URL + "/admin/lizhisave",
                                data: {
                                    token: token,
                                    id: lzid,
                                    leavedate: z_lz,
                                    handoverperson: z_receive,
                                    leavecouse: leave,
                                    socialsecurity_quittime: quit
                                },
                                dataType: "json",
                                success: function (data) {
                                    console.log(data);
                                    if(data.code==0){
                                        shownum();
                                        lz_left_ry_fn();
                                        entry_ry_fn();
                                        $(_this).parents('.dialog_content_6').find('.dialog_close').click();
                                        $(".zcj_yglz_name_show").html(lz_name)
                                    }else{
                                        alert(data.msg);
                                    }

                                },
                                error:function (data) {
                                    alert("更新失败，请稍后再试");
                                }
                            });
                        }else {
                            alert("点击了取消");
                        }

                    }

                });
            });


    /*查看已离职员工信息*/
    $(".zcj_check").die().live("click",function(){
        var num = $(this).attr("numid");
        $.ajax({
            type: "get",
            url: SERVER_URL + "/admin/loadadmin",
            data: {
                token: token,
                id: num
                /* data_type: "1"*/
            },
            /* async: false,*/
            dataType: "json",
            success: function(result){

                console.log(result);
                /*   var ff=$(".zcj_skill").attr("value");
                 alert(ff);*/
               var zcj_emploeelist=$(".zcj_hr_ylz_bl_info_head p");
                zcj_emploeelist.eq(0).html(result.data['name']+'（'+result.data['sex']+')');
                zcj_emploeelist.eq(1).html(result.data['deptname']+'-'+result.data['ranking']);

                var zcj_yg_ylz_info=$(".zcj_hr_yg_ylz_jbxx_check p span");
                zcj_yg_ylz_info.eq(0).text(result.data['name']); /*姓名*/
                zcj_yg_ylz_info.eq(1).text(result.data['jobnumber']); /* 工号*/
                zcj_yg_ylz_info.eq(2).text(result.data['sex']); /*  性别*/
                zcj_yg_ylz_info.eq(3).text(result.data['mobile']); /*  电话*/
                zcj_yg_ylz_info.eq(4).text(result.data['deptname']); /*  部门*/
                zcj_yg_ylz_info.eq(5).text(result.data['ranking']); /*  岗位名称*/
                zcj_yg_ylz_info.eq(6).text(result.data['email']); /*  邮箱*/
                zcj_yg_ylz_info.eq(7).text(result.data['workdate']);/*入职日期*/

                zcj_yg_ylz_info.eq(8).text(result.data['leavedate']);/*离职日期*/
                zcj_yg_ylz_info.eq(9).text(result.data['handoverperson']); /*工作交接人*/
                zcj_yg_ylz_info.eq(10).text(result.data['leavecouse']); /*离职原因*/

            },
            error:function(){
                alert('更新失败，请稍后再试');
            }
        });
    });


    /*搜索功能*/
    $(".zcj_btnsear").die().live("click",function(){

        if($(".zcj_searckval").val()=='搜索成员姓名'){
            perlzdata.key=''
        }else{
            perlzdata.page=1;
            perlzdata.key = $(".zcj_searckval").val();

        }

        shownum();

    });
    function tree_bm_list_fn(datalist) {

        var html = '';
        $.each(datalist, function (index, data) {
            /* html += '<ul class="hr_ul1">';*/

            html += '<li bid="'+data.id+'" data-pid="' + data['pid'] + '"><span>' + data['name'] +'</span></li>';

            if (data['children'] && data['children'].length > 0) {
                html += tree_bm_list_fn(data['children']);
            }

            html += '</li>';
            html += '</ul>'
        });
        return html;

    }
    /*高级搜索*/
$(".zcj_bllz_ser_gjss_btn").die().live("click",function(){
     /*部门列表展示*/
    if($(this).text()=='展开高级搜索'){
        return true;
    }
    /*部门列表*/
    $.ajax({
        type: 'post',
        url: SERVER_URL +"/dept/list",
        data:{
            dept:0,
            token:token
        },
        dataType : "json",
        success : function(data) {
            console.log('23123');
            console.log(data);
            console.log('23123');
            if(data.code==0){
                $(".zcj_bllz_bm_list_display").html(tree_bm_list_fn(data.rows));
            }else{
                alert(data.msg);
            }

            /*$(".zcj_gjss_bm_list").empty().append(bmlist);*/

        },
        error: function(data){
            alert("提交失败");
        }
    })

    /*岗位名称*/
    $.ajax({
        type: 'GET',
        url: SERVER_URL +"/admin/ranking",
        data:{
            token:token
        },
        dataType : "json",
        success : function(data) {
            console.log('23123000111');
            console.log(data);
            console.log('23123000111');
            var bmlist='';
            var gwname=''
            $.each(data['data'],function (i,con) {
                /* bmlist+='<li bid="'+con.id+'">'+con.name+'</li>';*/
                //console.log(con);

                gwname+='<li>'+con+'</li>';


            });
            /* $(".zcj_gjss_bm_list").empty().append(bmlist);*/
            $(".zcj_bllz_gwmc_list_display").html(gwname);
        },
        error: function(data){
            alert("提交失败");
        }
    })
    /*部门*/
    $(".zcj_bllz_bm_list_display li").die().live("click",function(){
        var bm_id=$(this).attr("bid");
        perlzdata.dept=bm_id;
        perlzdata.page=1;
        shownum();
    })
    /*岗位名称*/
    $(".zcj_bllz_gwmc_list_display li").die().live("click",function(){
        var gw_name=$(this).text();
        perlzdata.ranking=gw_name;
        perlzdata.page=1;
        shownum();
    })

});

/*失焦时事件*/
/*$(".zcj_searckval").blur(function(){

    perlzdata.jobstatus='3,4';
    shownum();
});*/
    /*删除离职人员*/
    $(".zcj_del_leave_but").die().live("click",function(){
        var del_id=$(this).attr('delid');
        $(".zcj_del_ylz_yg_info_btn").die().live("click",function(){
            var deldata={
                token: token,
                id: del_id
            }
            $.ajax({
                type: "get",
                url: SERVER_URL + "/admin/deldata",
                data:deldata,
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    if(data.code==0){
                        alert(data.msg);
                        // perlzdata.jobstatus=4;
                        lz_left_ry_fn();
                    }else{
                        alert(data.msg);
                    }
                },
                error:function(){
                    alert('更新失败，请稍后再试');
                }

            })
        });

    })
    /*刷新*/
    $(".zcj_yg_lz_dj_sx_btn").die().live("click",function(){
        /*add_Rload_index(19,2)*/
                perlzdata.page=1;
                perlzdata.dept='';
                perlzdata.ranking='';
                perlzdata.key='';
                perlzdata.id='';
                perlzdata.jobstatus='';
            // limit=10
            shownum();
        // $(".zj_allbtn").trigger('click');
    });

});



