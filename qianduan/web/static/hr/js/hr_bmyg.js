$(document).ready(function(){

    var token=Admin.get_token();

    var powerUrls=localStorage.getItem("user_info_url");
    var company_admin=localStorage.getItem("company_admin");

    $(".zcj_ry_pl_dr_hr").die().live("click",function(){
        $(".zcj_down_url_template").attr('href',SERVER_URL+'/download/person_template.xls')
    });

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
    /*移动到*/

	$('.lik_table_wrap input,.hr_tbody_info input').die().live("click",function(){
		 if($('.hr_tbody_info input').is(':checked')) {
   				  /* alert("选中")*/
   				 $("#zcj_select_true").removeClass().addClass("but_look").addClass("val_dialog");
   				 $("#zcj_select_true").attr("name","hr_movecy");
   				$("#zcj_select_true").css({"border":"","background":""});

   		        }else{

   				 /*alert("未选中")*/
   				 $("#zcj_select_true").removeClass().addClass("but_gray");
   				 $("#zcj_select_true").attr("name"," ");
   				 $("#zcj_select_true").css({"border":"none","background":"#ccc"});
                $(".lik_table_ul .checkAll").attr("checked",false);
  			 }

	});
    /*移动到部门树*/
    $("#zcj_select_true").die().live("click",function() {
        if($('#zcj_table_check_id input').is(':checked')){
            $.ajax({
                url: SERVER_URL + "/dept/list",
                data: {
                    token: token
                },
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    /* $('.zcj_tree_move').html(zcj_tree_list(data.rows));*/
                    var  html='<li class="left_all"><span class="icon_open change_ba"></span><span class="icon_file"></span><span class="list_msg">所有部门</span></li>';
                    var deep=0;
                    var fn_tree=tree_list_dialog(data.rows, deep);
                    $('.zcj_tree_move').html(html+fn_tree);

                },
                error: function (data) {
                    console.log(data);
                }
            })
        }else{
            return true;
        }

    });
    /* $(".hr_tbody input").each(function(){*/

    /* })*/

    /*移动确认*/
    var ryid=[];
    $(".zcj_tree_move li").die().live("click",function(){

        var pid=$(this).attr("aid");
        var bmname=$(this).data('name')
        $(".tanceng .zcj_btn_move_end").die().live("click",function(){
            $('.hr_tbody_info input:checked').each(function(){
                ryid.push($(this).data('id'))
            })

            var _this=this;
            $.ajax({
                type:"get",
                url: SERVER_URL + "/dept/move",
                data: {
                    token: token,
                    ids:ryid.toString(),
                    dept_id:pid,
                    dept_name:bmname
                },
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    if(data.code==0){
                        depart_staff();
                        left_list();
                        ryid.length='';
                        $(_this).next().click();
                        // $("#zcj_select_true").removeClass().addClass("but_gray");
                        // $("#zcj_select_true").attr("name"," ");
                        // $("#zcj_select_true").css({"border":"none","background":"#ccc"});
                    }

                },
                error: function (data) {
                    console.log(data);
                }
            })
        });

    });
	/* */
// 选择查看项
    // 定义查看项
    var venCustomLookAbledField = [
        {'index': null, 'field': '性别'},
        {'index': null, 'field': '邮箱'},
        {'index': null, 'field': '出生日期'},
        {'index': null, 'field': '学历'}

    ];
    likShow('#zcj_table_check_id', venCustomLookAbledField, '.muban_addkey_list', '.zcj_bc_save_btnid', '.zcj_recover_defalult');
    /*有限循环弹出窗树结构*/
    function zcj_tree_list(datalist) {
        var zcj_total_count = 0;
        var html="";
        var html = '<li class="left_all"><span class="icon_open change_ba"></span><span class="icon_file"></span><span class="list_msg">所有分类</span>('+zcj_total_count+')</li>';

        $.each(datalist,function(index,arr){
            html+="<ul class='ul1 zcj_child1'>"
            html+=" <li class='left_1' aid="+arr['id']+" pid="+arr['pid']+"><i class='list_before_span'></i><i class='list_before_span'></i><span class='icon_open'></span><span class='icon_file'></span><span class='list_msg'>"+arr['name']+"</span>("+arr['children'].length+")</li>"
            zcj_total_count += arr['children'].length;
            if(arr['children'].length>0){
                html+="<ul class='ul3' style='display: none;'>"
                $.each(arr['children'],function(index2,arr2){
                    html+="<li class='left_2' aid="+arr2['id']+" pid="+arr['pid']+"><i class='list_before_span'></i><i class='list_before_span'></i><i class='list_before_span'></i><i class='list_before_span'></i><span class='icon_open'></span><span class='icon_file'></span><span class='list_msg'>"+arr2['name']+"</span>("+arr2['children'].length+")</li>"
                    zcj_total_count += arr2['children'].length;
                    if(arr2['children'].length>0){
                        html+="<ul class='ul4' style='display: none;'>"
                        $.each(arr2['children'],function(index3,arr3){
                            html+="<li class='left_2' aid="+arr3['id']+" pid="+arr['pid']+"><i class='list_before_span'></i><i class='list_before_span'></i><i class='list_before_span'></i><i class='list_before_span'></i><i class='list_before_span'></i><i class='list_before_span'></i><span class='icon_open'></span><span class='icon_file'></span><span class='list_msg'>"+arr3['name']+"</span>("+arr3['children'].length+")</li>"
                        });
                        html+="</ul>"
                    }
                })
                html+="</ul>"
            }
            html+="</ul>"

        });
        return html;
    }

    /*左侧 限循环树结构*/
    function tree_list_dept_person(datalist){
        var html = '';
        var bm_count=datalist['rows'].length;
        $.each(datalist['rows'], function(index, data_list){

           if(data_list['children'].length>0 || data_list['user_info'].length>0){
               html += '<ul class="hr_ul1 change"><i class="nav_arrow nav_arrow_active"></i>';
           }else{
               html += '<ul class="change">';
           }
               html += '<li class="hr_left_1" id="'+data_list['id']+'"><span>'+data_list['name'] + '</span>('+data_list['count']+')</li>';

             if(data_list['children'] && data_list['children'].length>0){
                 bm_count+=data_list['children'].length;
                 $.each(data_list['children'],function(v,bmlist){

                     if(bmlist['children'].length>0 || bmlist['user_info'].length>0){
                         html += '<ul class="hr_ul1 change"><i class="nav_arrow nav_arrow_active"></i>';
                     }else{
                         html += '<ul class="change">';
                     }
                     html += '<li class="hr_left_1" id="'+bmlist['id']+'"><span>'+bmlist['name'] + '</span>('+bmlist['count']+')</li>';
                     if(bmlist['children'] && bmlist['children'].length>0){
                         bm_count+=bmlist['children'].length;
                         $.each(bmlist['children'],function(i,last_list){

                             if(last_list['children'].length>0 || last_list['user_info'].length>0){
                                 html += '<ul class="hr_ul1 change"><i class="nav_arrow nav_arrow_active"></i>';
                             }else{
                                 html += '<ul class="change">';
                             }
                             html += '<li class="hr_left_1" id="'+last_list['id']+'"><span>'+last_list['name'] + '</span>('+last_list['count']+')</li>';
                             html += '</ul>'
                         })

                     }
                     html += '<ul>'
                     if(bmlist['user_info'] && bmlist['user_info'].length>0) {
                         $.each(bmlist['user_info'], function (index3, data3) {
                             if(data3['is_director']==1){
                                 html += '<li class="hr_left_bmyg2" manid="' + data3['id'] + '"> <span>' + data3['name'] + '</span>(主管)</li>';
                             }else{
                                 html += '<li class="hr_left_bmyg2" manid="' + data3['id'] + '"> <span>' + data3['name'] + '</span></li>';
                             }

                         })
                     }
                     html += '</ul>'
                     html += '</ul>'
                 })

            }
            html += '<ul>'
            if(data_list['user_info'] && data_list['user_info'].length>0){
                $.each(data_list['user_info'], function (index2, data2) {
                    if(data2['is_director']==1){
                        html += '<li class="hr_left_bmyg2" manid="' + data2['id'] + '"> <span>' + data2['name'] + '</span>(主管)</li>'
                    }else{
                        html += '<li class="hr_left_bmyg2" manid="' + data2['id'] + '"> <span>' + data2['name'] + '</span></li>'
                    }

                })
            }

            html += '</ul>'
            html += '</ul>'

            })
         html+='<ul>'
        $.each(datalist['list'],function(r,vlist){

                html += '<li class="hr_left_bmyg2" manid="' + vlist['id'] + '"> <span>' + vlist['name'] + ' </span></li>'

        })
        html+='</ul>'
        datalist['bm_count']=bm_count;
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
            if(data['children'].length>0){
                html += '<li class="left_1" aid = "' + data["id"] + '" data-pid="' + data["pid"] + '" data-sort="'+data['sort']+'" data-name="' + data["name"] + '">' + html_i_list_before + '<span class="icon_open change_ba"></span><span class="icon_file"></span><span class="list_msg">' + data['name'] + '</span></li>';
            }else{
                html += '<li class="left_1" aid = "' + data["id"] + '" data-pid="' + data["pid"] + '" data-sort="'+data['sort']+'" data-name="' + data["name"] + '">' + html_i_list_before + '<span class="change_ba"></span><span class="icon_file"></span><span class="list_msg">' + data['name'] + '</span></li>';
            }

            if (data['children'] && data['children'].length > 0) {
                html += tree_list_dialog(data['children'], deep + 1);
            }
            html += '</li>';
            html += '</ul>'
        });
        return html
    }
    function tree_list_dialog_fn(datalist){
        var html = '';
        var html_i_list_before = '<i class="list_before_span"></i>';
       /* for (var j = 0; j < deep; j++) {
            html_i_list_before += '<i class="list_before_span"></i>'
        }*/
        var bm_count=datalist['rows'].length;
        $.each(datalist['rows'], function(index, data_list){
            html += '<ul class="ul1">';
            if(data_list['children'].length>0 || data_list['user_info'].length>0){
                html += '<li class="left_1" cussortid = "' + data_list["id"] + '"><i class="list_before_span"></i><span class="icon_open"></span><span class="icon_file"></span><span class="list_msg">';
            }else{
                html += '<li class="left_1" cussortid = "' + data_list["id"] + '"><i class="list_before_span"></i><span class="icon_file"></span><span class="list_msg">';
            }


            if(data_list['children'] && data_list['children'].length>0){
                bm_count+=data_list['children'].length;
                $.each(data_list['children'],function(v,bmlist){
                    html += '<ul class="ul1">';
                    if(bmlist['children'].length>0 || bmlist['user_info'].length>0){

                        html += '<li class="left_1" cussortid = "' + bmlist["id"] + '"><i class="list_before_span"></i><i class="list_before_span"></i><span class="icon_open"></span><span class="icon_file"></span><span class="list_msg">';
                    }else{

                        html += '<li class="left_1" cussortid = "' + bmlist["id"] + '"><i class="list_before_span"></i><i class="list_before_span"></i><span class="icon_file"></span><span class="list_msg">';
                    }



                    if(bmlist['children'] && bmlist['children'].length>0){
                        bm_count+=bmlist['children'].length;
                        $.each(bmlist['children'],function(i,last_list){
                            html += '<ul class="ul1">';
                            if(last_list['children'].length>0 || last_list['user_info'].length>0){

                                html += '<li class="left_1" cussortid = "' + last_list["id"] + '"><i class="list_before_span"></i><i class="list_before_span"></i><i class="list_before_span"></i><span class="icon_open"></span><span class="icon_file"></span><span class="list_msg">';
                            }else{

                                html += '<li class="left_1" cussortid = "' + last_list["id"] + '"><i class="list_before_span"></i><i class="list_before_span"></i><i class="list_before_span"></i><span class="icon_file"></span><span class="list_msg">';
                            }

                            html += '</ul>'
                        })

                    }
                    html += '<ul class="">'
                    if(bmlist['user_info'] && bmlist['user_info'].length>0) {
                        $.each(bmlist['user_info'], function (index3, data3) {

                            html += '<li class="left_2 person_left_nav" userinfoid="' + data3['id'] + '"><i class="list_before_span"></i><i class="list_before_span"></i><span class="list_msg">' + data3['name'] + ' </span></li>';
                        })
                    }
                    html += '</ul>'
                    html += '</ul>'
                })

            }
            html += '<ul class="">'
            if(data_list['user_info'] && data_list['user_info'].length>0){
                $.each(data_list['user_info'], function (index2, data2) {

                    html += '<li class="left_2 person_left_nav" userinfoid="' + data2['id'] + '"> <i class="list_before_span"></i><i class="list_before_span"></i><span class="list_msg">' + data2['name'] + ' </span></li>'
                })
            }

            html += '</ul>'
            html += '</ul>'

        })
        html+='<ul class="ul3">'
        $.each(datalist['list'],function(r,vlist){

            html += '<li class="left_2 person_left_nav" userinfoid="' + vlist['id'] + '"><i class="list_before_span"></i><span class="list_msg">' + vlist['name'] + ' </span></li>'

        })
        html+='</ul>'
        datalist['bm_count']=bm_count;
        return html;
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
                html += '<li class="left_2 person_left_nav" userinfoid="' + data2['id'] + '">' + html_i_list_before + '<span class="list_msg">' + data2['name'] + ' </span></li>'
            })

          /*  html += '</li>';*/
            html += '</ul>';
            html += '</ul>'
        });
        return html;

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
/*邮箱验证*/
    function CheckMail(mail) {
        var filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (filter.test(mail)) {
            return true;
        }
        else {
            alert('您的电子邮件格式不正确');
            return false;
        }
    }
    /*手机号*/
    function checkMobile(str) {
        var re = /^1[3|4|5|7|8][0-9]\d{8}$/;
        if (re.test(str)) {
            return true;
        } else {
            alert("您的手机号输入格式不正确");
        }
    }
    /*电话号*/
    function checkTel(str) {
        var re = /^(\(\d{3,4}\)|\d{3,4}-)?\d{7,8}$/;
        if (re.test(str)) {
            return true;
        } else {
            alert("您的电话号输入格式不正确");
        }
    }
    /*身份证var reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;*/
    function checknumber(str) {
        var reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
        if (reg.test(str)) {
            return true;
        } else {
            alert("您的身份证号输入格式不正确");
        }
    }
    /*密码*/
    function checkPass(str) {
        var re = /^[a-zA-Z0-9]\w{5,15}$/;
        if (re.test(str)) {
            return true;
        } else {
            alert("请输入6到16位数字或字母");
        }
    }
    var power=JSON.parse(powerUrls);
    console.log('1000')
    console.log(power)
    console.log('1000')
    //var url_r="admin/employeelist";//人员列表接口
    var add_r="admin/add";//人员添加 修改
    var check_r="admin/loadadmin";//查看
    var del_r="/admin/deldata";//删除
    var pass_r="admin/updateallpwd";//初始密码设置
    var dept_r="dept/add";//部门添加
    var y_dr="admin/batchimport";//员工导入
    var y_out="admin/employeelist";//员工导出
    var y_move="dept/move";//员工移动
    var bm_del="dept/del";//部门删除
    var bm_px="dept/desc";//部门排序

    /*人员添加*/
    // if($.inArray(add_r,power)>-1){
    //     $(".zcj_hr_bmyg_add_cy_btn").show();
    //     $(".hr_editBtn_").show();
    //
    // }else{
    //     $(".zcj_hr_bmyg_add_cy_btn").hide();
    //     $(".hr_editBtn_").hide();
    //
    // }
    // /*人员查看*/
    // if($.inArray(check_r,power)>-1){
    //     $(".zcj_sidebar__check_btn").show();
    //
    // }else{
    //     $(".zcj_sidebar__check_btn").hide();
    //
    // }
    // /*人员删除*/
    // if($.inArray(del_r,power)>-1){
    //     $(".zcj_hr_del_btn").show();
    //
    // }else{
    //     $(".zcj_hr_del_btn").hide();
    //
    // }

/*人员导入*/
    if(company_admin!=1){
        if($.inArray(y_dr,power)>-1){
            $(".zcj_ry_pl_dr_hr").show();

        }else{
            $(".zcj_ry_pl_dr_hr").hide();

        }
        /*人员导出*/
        if($.inArray(y_out,power)>-1){
            $(".zcj_ry_dc_out_hr").show();

        }else{
            $(".zcj_ry_dc_out_hr").hide();

        }
        /*部门添加*/
        if($.inArray(dept_r,power)>-1){
            $(".zcj_bm_add_dept_hr").show();
            $(".zcj_bm_edit_dept_hr").show();

        }else{
            $(".zcj_bm_add_dept_hr").hide();
            $(".zcj_bm_edit_dept_hr").hide();
            $(".hr_left_bjbm .hr_left_nav").css('top','20px');
        }
        /*初始密码设置*/
        if($.inArray(pass_r,power)>-1){
            $(".zcj_set_start_pass_hr").show();

        }else{
            $(".zcj_set_start_pass_hr").hide();
            // var p_btn=$(".zcj_set_start_pass_hr").width();
            // var d_v=$(".zj_bm_yg_header_show_div").width();
            // var x_w=d_v-p_btn
            // $(".zj_bm_yg_header_show_div").css('width',x_w)

        }
    }


    /*部门人员列表展示方法*/

    var params={
        token:token,
        id:'',
        dept: '',
        page: 1,
        limit: 10,
        order_by:'jobnumber',
        order_sort:0,
        jobstatus:'1,2,3'
    }

    //url(images/icondown.png) no-repeat !important;
    //background: url(../../images/iconright.png);
    function  depart_staff() {

        $.ajax({
            type:'post',
            url:SERVER_URL+"/admin/employeelist",
            data:params,
            dataType : "json",
            success : function(data){
                console.log(data);

                /* var znumber=data.totalCount;*/

                $(".zcj_all_number").html('('+data.totalCount+')');
                /*  $('.hr_tbody tr').siblings().empty(); */  //清空主题容器
                if(data.code==0){
                    if(data.rows.length>0){
                        $(".zcj_no_data_show_div").hide();
                        $(".hr_bmyg_page").show();
                        $(".hr_yidong").show();
                    }else{
                        $(".zcj_no_data_show_div").show();
                        $(".hr_bmyg_page").hide();
                        $(".hr_yidong").hide();
                    }
                }else{
                    $(".zcj_no_data_show_div").show();
                    $(".hr_bmyg_page").hide();
                    $(".hr_yidong").hide();
                }

                if(data.code==0){
                    var hr_table_tr="";
                    //循环后台传过来的Json数组
                    for(var i = 0; i < data.rows.length; i++) {
                        var datas = data.rows[i];
                        //去空


                        hr_table_tr+="<tr><td class='ht_checkbox'><input type='checkbox' data-id="+datas.id+" name='hr_ygbm_checkbox'/></td>";
                        if(datas['is_director']==1){
                            hr_table_tr+="<td>"+likNullData(datas.name)+"<span>(主管)</span></td>"
                        }else{
                            hr_table_tr+="<td>"+likNullData(datas.name)+"</td>"
                        }
                        hr_table_tr+="<td>"+likNullData(datas.jobnumber)+"</td>"
                        if(datas['job_status']==1){
                            hr_table_tr+="<td class='c_r'>未办理</td>"
                        }else if(datas['job_status']==2){
                            hr_table_tr+="<td class='c_y'>办理中</td>"
                        }else if(datas['job_status']==3){
                            hr_table_tr+="<td class='c_g'>已办理</td>"
                        }else{
                            $(".zcj_bl_info").text('-');
                        }

                        hr_table_tr += "<td>"+likNullData(datas.deptname)+"</td><td>"+likNullData(datas.ranking)+"</td><td>"+likNullData(datas.mobile)+"</td><td>"+likNullData(datas.email)+"</td><td>"+likNullData(datas.sex)+"</td><td>"+likNullData(datas.birthday) +"</td><td>"+likNullData(datas.education)+"</td>";
                        if(datas['job_status']==3){
                            hr_table_tr+="<td><button class='but_mix but_look r_sidebar_btn zcj_sidebar__check_btn' name='hr_ckxx' checkid="+datas.id+">查看</button><button class='but_mix but_exit val_dialog hr_editBtn_' editid="+datas.id+" name='hr_addcyad_bj'>编辑</button></td></tr>"
                        }else{
                            hr_table_tr+="<td><button class='but_mix but_look r_sidebar_btn zcj_sidebar__check_btn' name='hr_ckxx' checkid="+datas.id+">查看</button><button class='but_mix but_exit val_dialog hr_editBtn_' editid="+datas.id+" name='hr_addcyad_bj'>编辑</button><button class='but_mix but_r but_del val_dialog zcj_hr_del_btn' delid="+datas.id+" name='hr_bmyg_delete'>删除</button></td></tr>"
                        }

                    }
                    //$('.hr_tbody tr:first-child').siblings().empty();
                    $('.table-bordered .hr_tbody_info').html(hr_table_tr);
                    var cur=data.rows.length;
                    var znum=data.totalCount;
                    list_table_render_pagination(".hr_bmyg_page",params,depart_staff,znum,cur);

                    $('.zcj_bc_save_btnid').trigger('click');
                    /*计数*/
                    $(".zcj_all_number").html('('+data.totalCount+')');


                    if($('.hr_tbody_info input').is(':checked')) {
                        /* alert("选中")*/
                        $("#zcj_select_true").removeClass().addClass("but_look").addClass("val_dialog");
                        $("#zcj_select_true").attr("name","hr_movecy");
                        $("#zcj_select_true").css({"border":"","background":""});

                    }else{
                        /*alert("未选中")*/
                        $("#zcj_select_true").removeClass().addClass("but_gray");
                        $("#zcj_select_true").attr("name"," ");
                        $("#zcj_select_true").css({"border":"none","background":"#ccc"});
                        $(".lik_table_ul .checkAll").attr("checked",false);
                    }
                }else{
                    alert(data.msg);
                }

                /* $(".zcj_hr_dept_count").text(data.deptChildNum);*/
                /* $(".zcj_hr_dept_man_num").text(data.totalCount);*/
                if(company_admin!=1){
                    /*人员添加 编辑*/
                    if($.inArray(add_r,power)>-1){
                        $(".zcj_hr_bmyg_add_cy_btn").show();//add
                        $(".hr_editBtn_").show();//编辑
                        $(".zcj_chack_bj_btn").show();
                    }else{
                        $(".zcj_hr_bmyg_add_cy_btn").hide();
                        $(".hr_editBtn_").hide();
                        $(".zcj_chack_bj_btn").hide();
                    }
                    /*人员查看*/
                    if($.inArray(check_r,power)>-1){
                        $(".zcj_sidebar__check_btn").show();

                    }else{
                        $(".zcj_sidebar__check_btn").hide();

                    }
                    /*人员删除*/
                    if($.inArray(del_r,power)>-1){
                        $(".zcj_hr_del_btn").show();

                    }else{
                        $(".zcj_hr_del_btn").hide();

                    }
                }

            },
            error: function(data) {
                //提示添加失败
                alert("服务器错误，请稍后再试");
            }
        });

    }

    /*depart_staff();*/

    //页面加载时获取左侧菜单
    function left_list(){
        $.ajax({
            url:SERVER_URL+"/dept/deptlist",
            data:{
                token:token
            },
            dataType : "json",
            success : function(data) {
                console.log(data);
                if(data.code==0){
                    var  html='<i class="nav_arrow nav_arrow_active"></i><li class="hr_left_all" id="0"><span>所有成员('+data['sum_num']+')</span></li>';
                    $('.zcj_left_tree_list').html(html+tree_list_dept_person(data));
                    $(".zcj_hr_dept_count").text(data.bm_count);
                }else{
                    alert(data.msg);
                }

                //菜单取值结束
                //默认执行所有部门的展示

            },
            error: function(data) {
                //提示添加失败
                alert("服务器错误，请稍后再试");
            }
        });
    }
    left_list();
    depart_staff();

    // $(".change").die().live("click",function(){
    //     $(".zcj_left_tree_list .hr_left_1").click();
    // });
    /*部门所有人员列表*/

    $(".zcj_left_tree_list .hr_left_all").die().live("click",function(){
        /*$(".zcj_hr_dept_count").text(data.bm_count);*/
        //向添加部门功能输入默认所属上级名和id
        params.page=1
        params.dept=0;
        params.id='';
        depart_staff();
        /*left_list();*/
    });
     /* $(".zcj_left_tree_list .hr_left_all").trigger("click"); */ //首次打开页面就执行所有部门人员列表

    /*查找部门人列表*/
        var dept_name=''
        $(".zcj_left_tree_list .hr_left_1").die().live("click",function(){
            var company_id = $(this).attr('id'); //获取点击列表部门的当前id
            var dept=$(this).children('span').text()
           /* $(".zcj_hr_dept_count").text();*/
            //左侧树形结构点击事件绑定筛选数据功能
            //获取员工列表,按成员部门来筛选

            if(dept==dept_name){
                return true;
            }else{
                dept_name=dept;
                params.page=1
                params.dept=company_id;
                params.id='';
                /*eventchild();*/
                depart_staff();
            }

        });
        /*选择人列表*/
    $('.zcj_left_tree_list .hr_left_bmyg2').die().live("click",function(){
        $(this).parents(".hr_left_nav").find("cite").remove();
        $(this).append("<cite></cite>");
        //左侧树形结构点击事件绑定筛选数据功能
        //获取员工列表,按成员部门来筛选
        var r_p=$(this).attr("manid");
        params.id=r_p;
        params.page=1
        params.dept='';
        depart_staff();

    });

    //左侧树形结构点击事件绑定筛选数据功能结束
    //页面加载时获取左侧菜单结束
    /*人员添加*/


        /*搜索按钮*/
        $('.zcj_hr_search_btn').die().live('click', function() {
            var zj_search_val = $("#hr_search").val();

            /* alert(hr_search_val);*/
            if(zj_search_val=="搜索成员姓名/部门"){

                params.key='';
            }else{
                params.page=1;
                params.key=zj_search_val;
            }

            //传值到后台进行筛选
            depart_staff();

            //传值完成
        });
        /*失焦*/
        // $("#hr_search").die().live("blur",function () {
        //     params.key='';
        //     depart_staff();
        // });
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
        /*展开高级搜索*/
        $(".zcj_hr_zkgjss_btn").die().live("click",function(){
            var gj_sear=$(this).text();
            if(gj_sear=='隐藏高级搜索'){
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
                            $(".zcj_gjss_bm_list").html(tree_bm_list_fn(data.rows));
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
                        $(".zcj_hr_gwmc_name_list").html(gwname);
                    },
                    error: function(data){
                        alert("提交失败");
                    }
                })
            }else{

            }


            /*部门列表搜索*/
            $(".zcj_gjss_bm_list li").die().live("click",function(){
                var dmid=$(this).attr("bid");
                params.dept=dmid;
                params.page=1;
                depart_staff();
            });
            /*岗位名称*/
            $(".zcj_hr_gwmc_name_list li").die().live("click",function(){
                var gwid=$(this).text();
                params.ranking=gwid;
                params.page=1;
                depart_staff();
            });
            /*性别*/
            $(".zcj_hr_sex_list li").die().live("click",function(){
                var sex=$(this).text();
                params.sex=sex;
                 params.page=1;
                depart_staff();
            });
            /*学历*/
            $(".zcj_xl_list_show li").die().live("click",function(){
                var xueli=$(this).text();
                params.education=xueli;
                params.page=1;
                depart_staff();
            });
            /*入职状态*/
            $(".zcj_hr_rz_status_list li").die().live("click",function(){
                var status=$(this).data('id');
                params.jobstatus=status;
                params.page=1;
                depart_staff();
            });
        });

    // });
    //搜索框动态搜索结束

    $(function(){
    	/*添加部门》选择部门*/
    	$(".zcj_select_bm_tree").die().live("click",function(){

    		 $.ajax({
                    type: 'get',
                    url: SERVER_URL+'/dept/list',
                    data:{

                        pid: 0,

                        token:token
                    },
                    dataType : "json",
                    success : function(data) {

                    	 //提示添加成功
                       /* console.log(data);*/
                        var  html='<li class="left_all" aid="0"><span class="icon_open change_ba"></span><span class="icon_file"></span><span class="list_msg">所有分类</span></li>';
                        var deep=0;
                        $('.zcj_select_content_tree').html(html+tree_list_dialog(data.rows,deep))

                    },
                    error: function(data) {
                    //提示添加失败
                    alert("添加失败");
                }
            });
            /*获取父id*/
            $(".zcj_select_content_tree li").die('click').live("click",function(){
                if($(this).parents('ul').length>2){
                    alert("部门最多只有两级，不可再加");
                    return;
                }else{
                    var parentid=$(this).attr("aid");
                    var ival=$(this).children(".list_msg").html();
                }

                /* alert(ival);*/
                /*确定部门名字*/
                $(".zcj_end_depart_btn").die().live("click",function(){
                    $(".zcj_sel_show_val").val(ival);
                    $("#hiddenid").val(parentid);
                    $(this).next().click();
                });
                /*取消部门名字*/

            });

    	});

    	/*添加部门》选择成员*/
    	$(".zcj_select_man_list").die().live("click",function(){
    		  $.ajax({
                    type: 'get',
                    url: SERVER_URL+'/dept/deptlist',
                    data:{

                        token:token
                    },
                    dataType : "json",
                    success : function(data) {
                    	$(".zcj_person_list_tree ul").empty();
                    	 //提示添加成功

                        var  html='<li class="left_all"><span class="icon_open change_ba"></span><span class="icon_file"></span><span class="list_msg">所有部门</span></li>';
                        var deep=0;
                        $(".zcj_person_list_tree").html(html+tree_list_bmfzr(data));

                    },
                    error: function(data) {
                    //提示添加失败
                    alert("添加失败");
                }
            });
            /*获取name*/
            $(".tanceng .zcj_person_list_tree .person_left_nav").die().live("click",function(){
                var iv=$(this).children(".list_msg").html();

                var zgid=$(this).attr('userinfoid');


                /* alert(iv);*/
                /*确定选择负责人*/
                $(".tanceng .zcj_person_btn").die().live("click",function(){
                    $(".zcj_show_man").val(iv).data('id',zgid);
                    $(".zcj_show_man").data('id',zgid);
                    // var fzrid=[]
                    // $(".tanceng .zcj_select_cy_xs_nr_show li").each(function(){
                    //     fzrid.push($(this).data('id'));
                    //
                    // })
                    // $.inArray(zgid, fzrid)
                   /* setTimeout(function(){
                        // fzrid.indexOf(zgid);
                        if(fzrid.indexOf(zgid)<-1){
                            alert('负责人重复');
                        }else{
                            $(".zcj_select_cy_xs_nr_show").append('<li style="margin-top: 1px;" data-id="'+zgid+'">'+iv+'<i></i></li>');
                        }
                    },200)*/

                   //  var idv=$(".tanceng .zcj_select_cy_xs_nr_show").find('li').data('id');
                   // if(idv==zgid){
                   //     alert('负责人重复');
                   // }else{
                   //     $(".zcj_select_cy_xs_nr_show").append('<li style="margin-top: 1px;" data-id="'+zgid+'">'+iv+'<i></i></li>');
                   // }

                    // console.log('000000');
                    // console.log(fzrid);
                    // console.log(zgid);
                    // console.log('000000');
                    // if($.inArray(zgid,fzrid)<-1){
                    //     alert('负责人重复');
                    // }else{
                    //
                    //
                    // }

                   // $(".zcj_select_bm_zg_charge").append('<li style="margin-top: 1px;" data-id="'+zgid+'">'+iv+'</li>');
                    $(this).next().click();
                });
                /*取消选择负责人*/

            });
    	});
        $(".zcj_select_cy_xs_nr_show li i").die().live("click",function(){
            $(this).parent('li').remove();
        });
        /*选择部门主管*/
        $(".tanceng .zcj_select_bm_zg_charge li").die().live("click",function(){
            var zgid=$(this).data('id');
            $(".zcj_show_man").data('id',zgid)
        });

    	 //保存添加部门
        $(".hr_addbm_save").die().live("click",function(){
            var _this=this;

            var bm_name;
            if($("#hr_addbm_name").val()!='请输入部门名称'){
                bm_name = $("#hr_addbm_name").val()
            }else{
                bm_name='';
            }
            var sj_id = $("#hiddenid").val();//所属上级id
            var bmzg_id=$(".zcj_show_man").data('id');

            var bmzg_name=$(".zcj_show_man").val();
            var dept_people=[];
            $('.tanceng .zcj_select_cy_xs_nr_show li').each(function(){
                dept_people.push($(this).data('id'));
            })

            $.ajax({
                type: 'get',
                url: SERVER_URL + '/dept/uniquedeptname',
                data: {
                    name: bm_name,
                    token: token
                },

                dataType: "json",
                success: function (data) {

                    console.log(data);
                    if(data.code!=0){
                        alert(data.msg);
                    }else{
                        // alert(data.msg);
                        $.ajax({
                            type: 'post',
                            url: SERVER_URL+'/dept/add',
                            data:{
                                name: bm_name,
                                pid: sj_id,
                                headman: bmzg_name,
                                headid:bmzg_id,
                               /* dept_people:dept_people.toString(),*/
                                token:token
                            },

                            dataType : "json",
                            success : function(data) {

                                console.log(data);
                                if(data.code==0){
                                    alert(data.msg);
                                    delbtn(_this);
                                    left_list();
                                }else{
                                    alert(data.msg);
                                }
                                //提示添加成功

                            },
                            error: function(data) {
                                //提示添加失败
                                alert("添加失败,请稍后再试");
                            }
                        });

                    }
                }
            })

            return false;
        });
    });

    function bm_tree(){
        //编辑部门弹窗打开立即加载部门列表
        $.ajax({
            type:"get",
            url:SERVER_URL+"/dept/list",
            data:{
                token:token
            },
            dataType : "json",
            success : function(data) {
               /* console.log(data);*/
                $(".exitdepCon ul").empty();
                /*  $('.exitdepCon').html(zcj_tree_list(data.rows));*/
                var  html='<li class="left_all" aid="0"><span class="icon_open change_ba"></span><span class="icon_file"></span><span class="list_msg">所有部门</span></li>';
                var deep=0;
                var fn_tree=tree_list_dialog(data.rows, deep);
                $('.exitdepCon').html(html+fn_tree);
            }
        });
        //编辑部门列表结束
    }
    /*删除按钮方法*/
    function delbtn(odv){
        $(odv).parent().parent().parent().remove();
        var num = $('.tanceng').children(".dialog_box").length;
        if(num < 1 ){
            $(".tanceng").hide();
        }
    }
    //编辑部门

    $(function(){

        /*部门列表*/
        $('.hr_employeelist_title').die().live("click",function(){

            bm_tree();
            /*新建分类按钮*/
            $(".tanceng .zcj_new_fl").die().live("click",function(){
                $("#hid_val").val(0);
                /* $(".zcj_up_fl_val").val(childval);*/
                /*选择上级分类弹框树*/
                $(".tanceng .zcj_superior_fl").die().live("click",function(){

                    fltree();
                    /*获取上级分类id 名字*/
                    $(".tanceng .zcj_up_tree li").die().live("click",function(){
                        if($(this).parents('ul').length>2){
                            alert("部门最多只有两级，不可再加");
                            return;
                        }else {
                            var index = $(this).attr("aid");

                            var val = $(this).children(".list_msg").html();
                        }
                        console.log(val);
                        console.log(index);
                        /*上级分类确认btn*/
                        $(".tanceng .zcj_end_sel_btn").die().live("click",function(){

                                $(".zcj_up_fl_val").val(val);
                                $("#hid_val").val(index);
                                $(this).next().click();


                        });


                    });
                });
                /*保存新建功能*/
                $(".tanceng .zcj_bc_new_btn").die().live("click",function(){
                    var _this=this;
                    var fid=$("#hid_val").val();
                    var valname;
                    if($(".tanceng .zj_fl_name_val").val()=="请填写分类名称"){
                        valname='';
                    }else{
                        valname=$(".tanceng .zj_fl_name_val").val();
                    }
                    /*console.log(valname);
                     console.log(bmid);*/
                    $.ajax({
                        type: 'get',
                        url: SERVER_URL + '/dept/uniquedeptname',
                        data: {
                            name: valname,
                            token: token
                        },

                        dataType: "json",
                        success: function (data) {

                            console.log(data);
                            if (data.code != 0) {
                                alert(data.msg);
                            } else {
                                $.ajax({
                                    type: 'post',
                                    url:SERVER_URL+"/dept/add",
                                    data:{
                                        token:token,
                                        name:valname,
                                        pid:fid
                                    },
                                    dataType : "json",
                                    success : function(data) {
                                        /* console.log(data);*/
                                        if(data.code==0){
                                            alert(data.msg);
                                            bm_tree();
                                            $(_this).next().click();
                                        }else{
                                            alert(data.msg);
                                        }

                                    },
                                    error:function(){
                                        alert("更新失败，请稍后再试")
                                    }
                                });
                            }
                        },
                        error:function(){
                            alert("更新失败，请稍后再试")
                        }
                    })


                });
            });

            return false;
        });

        /*选择上级分类弹框树方法*/
        function fltree(){
            $.ajax({
                type:"get",
                url:SERVER_URL+"/dept/list",
                data:{
                    token:token
                },
                dataType : "json",
                success : function(data) {
                    console.log(data);
                    $(".zcj_up_tree ul").empty();

                    var  html='<li class="left_all" aid="0"><span class="icon_open change_ba"></span><span class="icon_file"></span><span class="list_msg">所有分类</span>(4)</li>';
                    var deep=0;
                    var fn_tree=tree_list_dialog(data.rows, deep);
                    $('.tanceng .zcj_up_tree').html(html+fn_tree);

                }
            });
        }




        /*获取编辑部门id*/
       $(".tanceng .exitdepCon ul li").die().live("click",function(){
            var bmid=$(".tanceng .exitdepCon li.on").attr('aid');
            var fjid=$(".tanceng .exitdepCon li.on").data('pid');

            var bmname=$(".tanceng .exitdepCon li.on").data('name');


            /*编辑部门弹窗*/

            $(".tanceng .zcj_eat_bj_bt").die().live("click",function(){

                    $("#hidden_fl_edit_id").val(bmid);
                    $("#hidden_fjid_edit_name").val(fjid);
                    $(".zcj_fl_name_value").val(bmname);
                /* 编辑上级分类*/
                $(".tanceng .zcj_bj_select_up").die().live("click",function(){

                    fltree();
                    $(".tanceng .zcj_up_tree li").die().live("click",function(){
                        if($(this).parents('ul').length>2){
                            alert("部门最多只有两级，不可再加");
                            return;
                        }else {
                            var index = $(this).attr("aid");

                            var val = $(this).children(".list_msg").html();
                        }
                        /*选择分类确认*/
                        $(".tanceng .zcj_editor_sj_fl").die().live("click",function(){
                            $(".zcj_editor_fl_val").val(val);
                            $("#hidden_fjid_edit_name").val(index);
                            $(this).next().click();
                        });

                    });

                });
                /*编辑保存按钮*/
                $(".tanceng .zj_save_editor_btn").die().live("click",function(){

                    var _this=this;
                    if($(".zcj_fl_name_value").val()!='请填写分类名称'){
                        var name=$(".zcj_fl_name_value").val();
                    }
                    var id=$("#hidden_fl_edit_id").val();
                    var pid=$("#hidden_fjid_edit_name").val();


                    $.ajax({
                        type: 'post',
                        url:SERVER_URL+"/dept/add",
                        data:{
                            token:token,
                            name:name,
                            id:id,
                            pid:pid
                        },
                        dataType : "json",
                        success : function(data) {
                            console.log(data);
                            if(data.code==0){
                                /* alert(data.msg);*/
                                bm_tree();
                                $(_this).next().click();
                                left_list();
                            }else{
                                alert(data.msg);
                            }

                        },
                        error: function(data) {
                            //提示添加失败
                            alert('更新失败，请稍后再试');
                        }
                    });
                });
            });


            /*上移*/
            $(".zcj_up_move").die().live("click",function(){
                var _this=this;
              /*  var bmid=$("#hid_val").val();*/
                var s_pid=$(".tanceng .exitdepCon li.on").data('pid')
                var s_sort=$(".tanceng .exitdepCon li.on").data('sort')
                $.ajax({
                    type: 'get',
                    url:SERVER_URL+"/dept/desc",
                    data:{
                        token:token,
                        sort:s_sort,
                        pid:s_pid,
                        action:'up'
                    },
                    dataType : "json",
                    success : function(data) {
                        /* console.log(data);*/
                        if(data.code==0){
                            /* alert(data.msg);*/
                            bm_tree();

                        }else{
                            alert(data.msg);
                        }

                    },
                    error: function(data) {
                        //提示添加失败
                        alert('更新失败，请稍后再试');
                    }
                });

            });
           /* 下移*/
            $(".zcj_down_move").die().live("click",function(){
                var s_pid=$(".tanceng .exitdepCon li.on").data('pid')
                var s_sort=$(".tanceng .exitdepCon li.on").data('sort')
              /*  var bmid=$("#hid_val").val();*/
                $.ajax({
                    type: 'get',
                    url:SERVER_URL+"/dept/desc",
                    data:{
                        token:token,
                        sort:s_sort,
                        pid:s_pid,
                        action:"down"
                    },
                    dataType : "json",
                    success : function(data) {
                        console.log(data);
                        if(data.code==0){
                            /* alert(data.msg);*/
                            bm_tree();

                        }else{
                            alert(data.msg);
                        }

                    },
                    error: function(data) {
                        //提示添加失败
                        alert('更新失败，请稍后再试');
                    }
                });
                console.log('00123000');
                console.log(s_pid);
                console.log(s_sort);
                console.log('00123000');
            });

        });


        /*删除分类*/
        $(".zcj_del_fl_btn").die().live("click",function(){

            var z_id = 0;
            if ($('.tanceng .exitdepCon li.on').length > 0) {
                z_id = $('.tanceng .exitdepCon li.on').attr('aid')
            }
            if($('.tanceng .exitdepCon li.on').siblings('ul').length>0){

                $(".tanceng .hr_content_delete").html('<p class="p1">删除分类后，分类部门将全部放入上一层级部门中。</p>')
            }else{
                $(".tanceng .hr_content_delete").html('<p class="p1">确定后将彻底删除，是否确定删除？</p><p class="p2">删除后将无法恢复，请慎重操作！</p>')
            }

            $(".tanceng .zcj_hr_bmyg_edit_del_bm_btn").die().live("click",function(){
                $.ajax({
                    type: 'get',
                    url:SERVER_URL+"/dept/del",
                    data:{
                        token:token,
                        deptid:z_id
                    },
                    dataType : "json",
                    success : function(data) {
                        console.log(data);
                        if(data.code==0){
                            bm_tree();

                        }else{
                            alert(data.msg);
                        }

                    },
                    error: function(data) {
                        //提示添加失败
                        alert('更新失败，请稍后再试');
                    }
                });
            });

        });

    });
    /*编辑部确认按钮*/
    $(".zcj_hr_bjbm_tc_end_btn").die().live("click",function(){
        left_list();
        delbtn(this);
    });
    $(".dialog_content_addBox2 .dialog_close").die().live("click",function(){
        left_list();
    });

    /*选择部门列表*/
    function selectbm(){
        $.ajax({
            type: 'get',
            url: SERVER_URL + '/dept/list',
            data:{

                pid: 0,

                token:token
            },
            dataType : "json",
            success : function(data) {
                //$(".zcj_select_content_tree ul").empty();

                /* $('.zcj_select_content_tree').html(zcj_tree_list(data.rows));*/
                var  html='<li class="left_all"><span class="icon_open change_ba"></span><span class="icon_file"></span><span class="list_msg">所有部门</span></li>';
                var deep=0;
                var fn_tree=tree_list_dialog(data.rows, deep);
                $('.zcj_select_content_tree').html(html+fn_tree);
                //提示添加成功
                console.log(data);

            },
            error: function(data) {
                //提示添加失败
                alert("添加失败");
            }
        });
    }
    //添加成员工号
    function hr_jobnum(vclass){
        $.ajax({
            type: 'get',
            url: SERVER_URL + '/admin/jobnumber',
            data:{

                token:token
            },
            dataType : "json",
            success : function(data) {
                console.log(data);
                $(vclass).val(data.data);
            },
            error: function(data) {
                //提示添加失败
                alert("添加失败");
            }
        });
    }
    /******************************添加成员*******************/
    $(function(){
        /*邮箱*/
        // $(".tanceng .hr_15_employee_add_email").die().live("blur",function(){
        //     var email_val=$(this).val();
        //     CheckMail(email_val);
        //
        // });
       /* 手机号*/
       $('.tanceng .hr_15_employee_add_mobile').die().live("blur",function(){
           var mobil=$(this).val();
           checkMobile(mobil);
       });
        /*身份证*/
        $('.tanceng .hr_15_employee_add_idnumber').die().live("blur",function(){
            var number=$(this).val();
            checknumber(number)
        });
        /*添加成员按钮*/
        $(".zcj_hr_bmyg_add_cy_btn").die().live("click",function(){
            $(".zcj_is_set_bmzg").css('margin-top',0)
            hr_jobnum(".hr_15_employee_add_jobnumber");
            /*添加主管*/
            $(".tanceng .zcj_is_set_bmzg").die().live("click",function(){
                var yg_bmid=$(".tanceng #zcj_depid").val();
                $.ajax({
                    type: 'get',
                    url: SERVER_URL + '/dept/infobyid',
                    data: {
                        id: yg_bmid,
                        token: token
                    },
                    dataType: "json",
                    success: function (data) {
                        console.log('000000001');
                        console.log(data);

                        console.log('000000001');
                        var name_zg=$(".hr_15_employee_add_name").val();
                        if(data['data']['headid']>0){

                            if(confirm("该部门已有主管，是否更换（"+name_zg+"）为部门主管")){
                                $(".zcj_is_set_bmzg").attr("checked",true)
                            }else{
                                $(".zcj_is_set_bmzg").attr("checked",false)
                            }
                        }
                    }
                })
            });
        });
        // var add_imgi = 1;
        function ajaxSubmit($el) {
            // SERVER_URL = 'http://192.168.0.167:9091/';
            //  var token = token;
            //var token = '2017052516045457073-1-1';
            console.log(SERVER_URL, token);
            $el.upload({
                url: SERVER_URL + '/task/uploadattch',
                // 其他表单数据
                params: {
                    token: token
                },
                // 上传完成后, 返回json, text
                dataType: 'json',
                onSend: function (obj, str) {
                    //console.log(obj, str);
                    return true;
                },
                // 上传之后回调
                onComplate: function (data) {
                    // $el.parent().before('<li><input class="hide_input" type="file" id="upimgFile_' + add_imgi + '"/><img class="img_src" id="imgShow_' + add_imgi + '"/><i class="del_img">-</i></li>');
                    $(".hr_15_employee_add_face").attr("src", getImgUrl(data.imgurl));
                    // add_imgi++;
                     //console.log(data.imgurl);
                     //$(".hr_15_employee_add_face").data("url",data.imgurl)
                },
                onProgress: function (e) {
                    var per = Math.round(e.loaded * 80 / e.total);
                    $('.hr_15_employee_add_face').css('width', per + '%')
                }
            });
            $el.upload("ajaxSubmit");
        }
      $(".hr_15_employee_add_face_upload").live("change",function(){
            ajaxSubmit($(this));

       });
        /*选择部门弹窗*/
        $(".zcj_select_bm_btn").die().live("click",function(){
           /* alert("123");*/

            selectbm();
            $(".zcj_select_content_tree li").die('click').live("click",function(){
                /*console.log(this.html());*/
                var dep=$(this).attr("aid");
               var con=$(this).children(".list_msg").html();


                /*确认选择*/
                $(".zcj_end_depart_btn").die().live("click",function(){
                    $("#zcj_depid").val(dep);
                    $(".hr_15_employee_add_deptname").val(con);
                   /* delbtn(this);*/
                    $(this).next().click();
                    if($("#zcj_depid").val()>0 && $(".hr_15_employee_add_deptname").val()!=''){
                        $(".zcj_is_set_bmzg").attr('disabled',false).css("margin-top",0);
                    }else{
                        $(".zcj_is_set_bmzg").attr('disabled',true).css("margin-top",8);
                    }
                 });
            });
            /*确认选择*/

            /*取消选择*/
            $(".zcj_cancel_btn").live("click",function(){
                $(this).next().click();

            });
        });
        /*已婚、未婚*/
        $('.zcj_marry_status_list li').die().live("click",function(){
                var yh_id=$(this).data('id');

                $('.hr_15_employee_add_marital_status').data('id',yh_id)
        });

        //保存添加成员数据
        $(".hr_15_employee_add_save").die().live("click",function(){
            var _this=this;

            var hr_radioa=1;
            /*选择密码状态*/
            $(".zcj_select_pass_status input").each(function(){
                if($(this).is(":checked")){
                    hr_radioa=$(this).val();
                }
            })
            var hr_addMember_name;/*输入姓名*/
           /* var bmid=$("#zcj_depid").val();*/
           if($(".hr_15_employee_add_name").val()=='请输入姓名'){
                 hr_addMember_name='';
           }else{
                hr_addMember_name = $(".hr_15_employee_add_name").val();/*输入姓名*/
           }


            var hr_addMember_jobnumber = $(".hr_15_employee_add_jobnumber").val(); /*输入工号*/
            var hr_addMember_sex;/*性别*/
            if($(".hr_15_employee_add_sex").val()=='请选择'){
                hr_addMember_sex='';
            }else{
                hr_addMember_sex = $(".hr_15_employee_add_sex").val();/*请选择*/
            }

            var hr_addMember_mobile;/*输入手机号*/
            if($(".hr_15_employee_add_mobile").val()!='请输入手机号'){
                hr_addMember_mobile=$(".hr_15_employee_add_mobile").val();

            }else{
                hr_addMember_mobile='';
            }
                if(checkMobile(hr_addMember_mobile)==false){
                return false;
                }

            var hr_addMember_deptname = $(".hr_15_employee_add_deptname").val();/*部门*/
           var hr_deptid=$("#zcj_depid").val();/*部门id*/

            var hr_addMember_ranking;/*职位*/
            if($(".hr_15_employee_add_deptallname").val()=='请输入岗位'){
                hr_addMember_ranking='';
            }else{
                hr_addMember_ranking = $(".hr_15_employee_add_deptallname").val();/*职位*/
            }
            var hr_addMember_email;/*邮箱*/
            if($(".hr_15_employee_add_email").val()=='请输入邮箱'){
                hr_addMember_email='';
            }else{
                hr_addMember_email = $(".hr_15_employee_add_email").val();/*邮箱*/
            }
            if(hr_addMember_email!=''){
                if(CheckMail(hr_addMember_email)==false){
                    return false;
                }
            }

            var hr_addMember_education;/*学历*/
            if($(".hr_addMember_education").val()=='请输入学历'){
                hr_addMember_education='';
            }else{
                hr_addMember_education = $(".hr_addMember_education").val();/*学历*/
            }


            var hr_addMember_nation;/*民族*/
            if($(".hr_15_employee_add_nation").val()=='请输入民族'){
                hr_addMember_nation='';
            }else{
                hr_addMember_nation = $(".hr_15_employee_add_nation").val();/*民族*/
            }

            var hr_addMember_birthplace;/*籍贯*/
            if($(".hr_15_employee_add_birthplace").val()=='请输入籍贯'){
                hr_addMember_birthplace='';
            }else{
                hr_addMember_birthplace = $(".hr_15_employee_add_birthplace").val();/*籍贯*/
            }

            var hr_addMember_idnumber;
            if($(".hr_15_employee_add_idnumber").val()=='请输入身份证'){
                hr_addMember_idnumber='';
            }else{
                hr_addMember_idnumber = $(".hr_15_employee_add_idnumber").val();/*身份证*/
            }
            if(hr_addMember_idnumber!=''){
                if(checknumber(hr_addMember_idnumber)==false){
                    return false;
                }
            }
           /* inum_verify(hr_addMember_idnumber);*/
           /* 360481198906224157*/
            var hr_addMember_birthday;/*生日*/
            if($(".hr_15_employee_add_birthday").val()!='请选择日期'){
                hr_addMember_birthday=$(".hr_15_employee_add_birthday").val();
            }else{
                hr_addMember_birthday='';
            }

            var hr_addMember_marital_status;/*婚*/
            if($(".hr_15_employee_add_marital_status").val()=='请选择'){
                hr_addMember_marital_status=0;
            }else{
                hr_addMember_marital_status= $(".hr_15_employee_add_marital_status").data('id')
            }
            var hr_addMember_address;/*家庭住址*/
            if($(".hr_15_employee_add_address").val()=='请输入家庭住址'){
                hr_addMember_address='';
            }else{
                hr_addMember_address = $(".hr_15_employee_add_address").val();/*家庭住址*/
            }
            var hr_addMember_contact;/*紧急联系人*/
            if($(".hr_15_employee_add_contact").val()=='请输入紧急联系人'){
                hr_addMember_contact='';
            }else{
                hr_addMember_contact = $(".hr_15_employee_add_contact").val();/*紧急联系人*/
            }
            var hr_addMember_contact_lx;/*紧急联系电话*/
            if($(".hr_15_employee_add_contact_lx").val()=='请输入紧急人联系电话'){
                hr_addMember_contact_lx='';
            }else{
                hr_addMember_contact_lx = $(".hr_15_employee_add_contact_lx").val();/*紧急联系电话*/
            }

            var pass;
            var confirm_pass;
           if(hr_radioa==1){
                 pass='';
                 confirm_pass='';
           }else{
               if($(".zcj_login_pass_put").val()!='请输入密码'){
                   pass=$(".zcj_login_pass_put").val();
               }
                if($(".zcj__end_login_pass_put").val()!='请再次输入密码'){
                    confirm_pass=$(".zcj__end_login_pass_put").val();
                }

           }
           var dept_zg;
           if($(".zcj_is_set_bmzg").is(":checked")){
               dept_zg=1;
           }else{
               dept_zg=0;
           }

            var url=$(".hr_15_employee_add_face").data("url");

           // if($(".hr_15_employee_add_email").val()!=''){
           //          if(CheckMail($(".hr_15_employee_add_email").val())==false){
           //              return false;
           //          }
           // }
            if(hr_addMember_name==''){
                alert('姓名不能为空');
            }else if(hr_addMember_mobile==''){
                alert('手机号不能为空');
            }else if(hr_addMember_jobnumber==''){
                alert('工号不能为空');
            }else{
                $.ajax({
                    type: 'get',
                    url: SERVER_URL + '/admin/isidnumber',
                    data: {

                        token: token,
                        idnumber: hr_addMember_idnumber
                    },
                    dataType: "json",
                    success: function (data) {
                        console.log('2000');
                        console.log(data);
                        console.log('2000');
                        if (data.msg=='身份证已存在') {
                            alert(data.msg);
                        }else{
                            $.ajax({
                                type: "post",
                                url:SERVER_URL +"/admin/add",
                                data:{
                                    'token':token,
                                    'face':url,
                                    'name': hr_addMember_name,
                                    'mobile': hr_addMember_mobile,
                                    'sex': hr_addMember_sex,
                                    'deptname': hr_addMember_deptname,/*部门*/
                                    'deptid': hr_deptid,
                                    'ranking': hr_addMember_ranking,/*职务*/
                                    'is_director':dept_zg,
                                    /*   superman: hr_addMember_superman,/!*主管*!/*/
                                    /*'workdate': hr_addMember_workdate,*//*入职时间*/
                                    'email': hr_addMember_email,/*邮箱*/
                                    /* tel: '',*/
                                    'jobnumber': hr_addMember_jobnumber,/*工号*/
                                    'education': hr_addMember_education,/*学历*/
                                    'nation': hr_addMember_nation,/*民族*/
                                    /*  job_status: hr_addMember_job_status,/!*工作状态*!/*/
                                    'birthplace': hr_addMember_birthplace,
                                    'idnumber': hr_addMember_idnumber,/*身份证*/
                                    'birthday': hr_addMember_birthday,/*生日*/
                                    'marital_status': hr_addMember_marital_status,/*已婚 未婚*/
                                    'address': hr_addMember_address,
                                    'contact': hr_addMember_contact,
                                    'contact_lx': hr_addMember_contact_lx,
                                    'pass':pass,           //密码
                                    'confirm_pass':confirm_pass,   //确认密码
                                    /* education: hr_addMember_education*/
                                    'hr_radioa':hr_radioa

                                },
                                async: false,
                                success: function(data){
                                    var person=JSON.parse(data);

                                    if(person.code==0){
                                        params.dept=hr_deptid;
                                        depart_staff();
                                        left_list();
                                        $(_this).next().click();
                                        //delbtn(_this)
                                        /* };*/
                                    }else{
                                        alert(person.msg);
                                    }

                                },
                                error: function(data){
                                    alert("提交失败");
                                }
                            });
                        }

                    },
                    error: function (data) {
                        //提示添加失败
                        alert("更新失败，请稍后再试");
                    }
                })
            }



        });

        /*关闭按钮*/
        $(".zcj_add_cy_gb_close").die().live("click",function(){
            $(".hr_15_employee_add_face").attr("src",'static/images/touxiang.png');
        });
        /*取消*/
        $(".zcj_hr_add_qx_out_btn").die().live("click",function(){
            $(".hr_15_employee_add_face").attr("src",'static/images/touxiang.png');
        });
    });
    /*导出成员列表*/
    $(function(){
        function ajaxSubmit(el, uploadUrl, uploadParams){
            $(el).upload({
                url: uploadUrl,
                // 其他表单数据
                params: uploadParams,
                // 上传完成后, 返回json, text
                dataType: 'json',
                onSend: function (obj, str) {
                    console.log(obj, str);
                    // var extStart=str.lastIndexOf(".");
                    // var ext=str.substring(extStart,str.length).toUpperCase();
                    // console.log(ext)
                    // if(ext!=".BMP"&&ext!=".PNG"&&ext!=".GIF"&&ext!=".JPG"&&ext!=".JPEG"&&ext!=".xls"){
                    //     alert("图片限于bmp,png,gif,jpeg,jpg格式");
                    //     return false;
                    // }else{
                    //     return true;
                    // }

                    return true;
                },
                // 上传之后回调
                onComplate: function (data) {
                    console.log(data);
                    if(data.code==0){
                        $('.complete').html('上传成功')

                    }else{
                        alert(data.msg);
                    }

                },
                onProgress: function (e) {
                    console.log(e);
                    var per = Math.round(e.loaded * 60 / e.total);
                    $('.complete').css('width', per + '%')
                }
            });
            $(el).upload("ajaxSubmit");
        }
        $('.tanceng .zj_add_inputbegin').live('change', function(){
            ajaxSubmit(this, SERVER_URL+'/admin/batchimport', {token: token})

        })
        $(".tanceng .zcj_save_member_btn").die().live("click",function(){
            depart_staff();
            /*$('.add_inputbegin').upload("ajaxSubmit");*/

            $(this).parents('.dialog_content_3').find('.dialog_close').click();
        });
    });

        /*批量导入成员*/
    // $(".zcj_save_member_btn").die().live("click",function(){
    //     var putval=$(".add_inputbegin").val();
    //
    //     alert(putval);
    //     $.ajax({
    //         type: 'post',
    //         url: SERVER_URL +"/admin/batchimport",
    //         data:{
    //             fileurl:putval,
    //             token:token
    //         },
    //         dataType : "json",
    //         success : function(data) {
    //             console.log(data);
    //         },
    //         error: function(data){
    //             alert("提交失败");
    //         }
    //     })
    // });

    /*导出成员部门列表*/
   $(".zcj_export_member").die().live("click",function(){
       $.ajax({
           type: 'get',
           url: SERVER_URL +"/dept/deptlist",
           data:{
              /* pid:0,*/
               token:token
           },
           dataType : "json",
           success : function(data) {
              /* console.log("1222");
               console.log(data);*/

                var  html='<li class="left_all"><span class="icon_open change_ba"></span><span class="icon_file"></span><span class="list_msg">所有部门(4)</span></li>';

               $('.zcj_fl_list_member').html(html+tree_list_dialog(data.rows));


           },
           error: function(data){
               alert("提交失败");
           }

       })
       /*导出成员*/
       $(".zcj_fl_list_member ul li").die().live("click",function(){
           /*获取部门id*/
           var bm_id=$(this).attr("aid");
        /*   alert(bm_id)*/
           /*导出人员确认*/
           $(".zcj_export_out_btn").live("click",function(){
              /* var findon=$(".zcj_fl_list_member .list_check>em.on");*/
               $.ajax({
                   type: 'post',
                   url: SERVER_URL +"/admin/employeelist",
                   data:{
                       dept:bm_id,
                       token:token
                   },
                   dataType : "json",
                   success : function(data) {
                       console.log(data);
                   },
                   error: function(data){
                       alert("提交失败");
                   }
               })
           });
       });

    });
   /* hr_checktBtn();*/
    //查看员工详情
   function hr_checktBtn(hr_yg_id){
		$.ajax({
               type: 'get',
               url: SERVER_URL+'/admin/loadadmin',
               data:{
                    id: hr_yg_id,
                    data_type:"0",
                    token:token
                    },
                dataType : "json",
                success : function(data) {
                    console.log(data);

                    /*基本资料*/
                    if(data['data']['face']!=''){
                        $(".sides-img .zcj_hr_yg_info_check").attr('src',getImgUrl(data['data']['face']));
                    }else{
                        $(".sides-img .zcj_hr_yg_info_check").attr('src','static/images/hr_touxiang.png');
                    }

                    $(".zcj_user_name").html(likNullData(data.data.name));
                    $(".zcj_sex_show").html(likNullData(data.data.sex));
                    //$(".zcj_bl_info").text(likNullData(data.data['job_status']));
                    if(data.data['job_status']==1){
                        $(".zcj_bl_info").text('未办理');
                    }else if(data.data['job_status']==2){
                        $(".zcj_bl_info").text('办理中');
                    }else if(data.data['job_status']==3){
                        $(".zcj_bl_info").text('已办理');
                    }else if(data.data['job_status']==4){
                        $(".zcj_bl_info").text('已离职');
                    }else{
                        $(".zcj_bl_info").text('-');
                    }
                    $(".fz-employee-name").html(likNullData(data.data.name));
                    $(".fz-employee-jobnumber").html(likNullData(data.data.jobnumber));
                    $(".fz-employee-sex").html(likNullData(data.data.sex));
                    $(".fz-employee-mobile").html(likNullData(data.data.mobile));
                    $(".fz-employee-deptname").html(likNullData(data.data.deptname));
                    $(".fz-employee-ranking").html(likNullData(data.data.ranking));
                    $(".fz-employee-email").html(likNullData(data.data.email));
                    /*详细资料*/
                    $(".fz-employee-education").html(likNullData(data.data.education));
                    // $(".fz-employee-graduationtime").html(likNullData(data.data.graduationtime));
                    // $(".fz-employee-workdate").html(likNullData(data.data.workdate));
                    $(".fz-employee-nation").html(likNullData(data.data.nation));
                    $(".fz-employee-birthplace").html(likNullData(data.data.birthplace));
                    $(".fz-employee-idnumber").html(likNullData(data.data.idnumber));
                    $(".fz-employee-birthday").html(likNullData(data.data.birthday));
                   /* var marry=data.marital_st*/
                    // $(".fz-employee-marital_status").html(likNullData(data.data['marital_status_name']));/*判断*/
                    if(data.data['marital_status']==1){
                        $(".fz-employee-marital_status").html('已婚');/*判断*/
                    }else if(data.data['marital_status']==2){
                        $(".fz-employee-marital_status").html('未婚');/*判断*/
                    }else {
                        $(".fz-employee-marital_status").html('-');/*判断*/
                    }
                    $(".fz-employee-address").html(likNullData(data.data.address));
                    $(".fz-employee-contact").html(likNullData(data.data.contact));
                    $(".fz-employee-pione").html(likNullData(data.data.contact_lx));//紧急人联系电话
                },
                error: function(data){
                    alert("更新失败，请稍后再试");
                }
            });

    }
    /********************查看详情*****************/
      $(".zcj_sidebar__check_btn").die().live("click",function(){
          var _this=this;
            var hr_yg_id = $(this).attr('checkid');

          $("#zcj_del_editor_hidden").val(hr_yg_id);

              hr_checktBtn(hr_yg_id);

          /*查看编辑*/
          $(".zcj_chack_bj_btn").die().live("click",function(){
              $(_this).parents('tr').find('.hr_editBtn_').click();

          });
            return false;
        });
    /*编辑信息show*/
    function zj_editshow(hr_yg_id){
        $.ajax({
            type: 'get',
            url: SERVER_URL+'/admin/loadadmin',
            data:{
                id: hr_yg_id,
                data_type:"0",
                token:token
            },
            dataType : "json",
            success : function(data) {
                    console.log(data);
                $(".zcj_yg_amend_pass_btn").data('id',data.data.id);
                /*基本资料*/
                if(data.data.face!=''){
                    $(".zcj_edit_icon_mr_show").attr("src",data.data.face)
                }else{
                    $(".zcj_edit_icon_mr_show").attr('src','static/images/hr_touxiang.png');
                }

                $(".zcj_edit_name").val(data.data.name);/*姓名*/
                $(".zcj_edit_inum").val(data.data.jobnumber);/*工号*/
                $(".zcj_edit_sex").val(data.data.sex);/*性别*/
                $(".zcj_edit_mobile").val(data.data.mobile);/*手机号*/
                $(".zcj_edit_section").val(data.data.deptname);/*部门*/
                $("#bjz_add_bm_id").val(data.data.deptid);/*部门id*/
                $(".zcj_edit_post").val(data.data.ranking);/*职位*/
                $(".zcj_edit_mail").val(data.data.email);/*邮箱*/
               /* $(".zcj_edit_idata").val(data.data.graduationtime);/!*毕业日期*!/
                $(".zcj_edit_select_end").val(data.data.workdate);/!*入职日期*!/*/
                $(".zcj_edit_marry").val(data.data.education);
                $(".hr_edit_Member_education").val(data.data.education);
                $(".zcj_edit_nation").val(data.data.nation);/*民族*/
                $(".zcj_edit_inative").val(data.data.birthplace);/*籍贯*/
                $(".zcj_identity_inum").val(data.data.idnumber);/*身份证号*/
                $(".zcj_identity_selectdata").val(data.data.birthday);/*生日日期*/
                // $(".zcj_edit_marry").val(data.data['marital_status_name']);/*婚姻状况*/
                var bmid=$("#bjz_add_bm_id").val();
                if(bmid>0){
                    $(".zcj_edit_is_set_bmzg").attr('disabled',false).css("margin-top",0);
                }else{
                    $(".zcj_edit_is_set_bmzg").attr('disabled',true).css("margin-top",8);
                }
                if(data.data.is_director==1){
                    $(".zcj_edit_is_set_bmzg").attr('checked',true);
                }else{
                    $(".zcj_edit_is_set_bmzg").attr('checked',false);
                }

                if(data.data['marital_status']==1){
                    $("zcj_edit_marry").val('已婚');/*判断*/
                }else if(data.data['marital_status']==0){
                    $(".zcj_edit_marry").val('未婚');/*判断*/
                }else {
                    $(".zcj_edit_marry").data('id',0);/*判断*/
                    $(".zcj_edit_marry").val('');
                }
                $(".zcj_edit_address").val(data.data.address);/*家庭住址*/
                $(".zcj_edit_urgency").val(data.data.contact);/*紧急联系人*/
                $(".zcj_edit_urgency_ipone").val(data.data.contact_lx);/*紧急联系人电话*/
                // var dlpass=$(".zcj_edit_password").val(data.data.pass);/*原密码*/
                 /*$(".zcj_edit_new_password").val(data.data.pass);/!*登陆密码*!/
                 $(".zcj_edit_again_password").val();/!*新密码*!/ */

            },
            error: function(data){
                alert("更新失败，请稍后再试");
            }
        });

    }
    //编辑
    $(function(){

        function ajaxSubmit($el) {
            // SERVER_URL = 'http://192.168.0.167:9091/';
            //  var token = token;
            //var token = '2017052516045457073-1-1 2017072120540946854-1-231';
            console.log('1000');
            console.log(SERVER_URL, token);
            console.log('1000');

            $el.upload({
                url: SERVER_URL + '/task/uploadattch',
                // 其他表单数据
                params: {
                    token: token
                },
                // 上传完成后, 返回json, text
                dataType: 'json',
                onSend: function (obj, str) {
                    //console.log(obj, str);
                    return true;
                },
                // 上传之后回调
                onComplate: function (data) {
                    console.log('1002');
                    console.log(data);
                    console.log('1002');
                    // $el.parent().before('<li><input class="hide_input" type="file" id="upimgFile_' + add_imgi + '"/><img class="img_src" id="imgShow_' + add_imgi + '"/><i class="del_img">-</i></li>');
                    $(".zcj_edit_icon_mr_show").attr("src", getImgUrl(data.imgurl));
                    // add_imgi++;
                    console.log(data.imgurl);
                    //$(".zcj_edit_icon_mr_show").data("url",data.imgurl);
                },
                onProgress: function (e) {
                    var per = Math.round(e.loaded * 80 / e.total);
                    $('.zcj_edit_icon_mr_show').css('width', per + '%')
                }
            });
           $el.upload("ajaxSubmit");
        }
         /*  $('.hr_importVIP').fadeIn(200);*/
         /*编辑按钮*/
           $(".hr_editBtn_").die().live("click",function(){
               var _this=this;
               /*编辑id*/
               var hr_yg_id = $(this).attr('editid');
               /*编辑查看*/
               zj_editshow(hr_yg_id);
               /*修改图片*/
               $(".zj_edit_hr_cy_icon").die().live("change",function(){
                   ajaxSubmit($(this))
               });
               /*编辑查看部门按钮*/
               $(".tanceng .zcj_edit_sel_bm_xg").die('click').live("click",function(){

                   selectbm();

                   $(".zcj_select_content_tree li").die('click').live("click",function(){
                       /*console.log(this.html());*/
                       var dep=$(this).attr("aid");
                       var con=$(this).children(".list_msg").html();

                       /*  $("#zcj_depid").val(dep);*/
                       /*确认选择*/
                       $(".tanceng .zcj_end_depart_btn").die().live("click",function(){
                           $("#bjz_add_bm_id").val(dep)
                           $(".zcj_edit_section").val(con);
                           /* delbtn(this);*/
                           $(this).next().click();
                           /*$(".tanceng .zcj_end_depart_btn").die().live("click",function(){*/
                           if($("#bjz_add_bm_id").val()>0 && $(".zcj_edit_section").val()!=''){
                               $(".zcj_edit_is_set_bmzg").attr('disabled',false).css("margin-top",0);
                           }else{
                               $(".zcj_edit_is_set_bmzg").attr('disabled',true).css("margin-top",8);
                           }
                           /* });*/
                       });
                   });
               });
               /*部门id*/

                $(".tanceng .zcj_edit_is_set_bmzg").die().live("click",function(){
                    var yg_bmid=$(".tanceng #bjz_add_bm_id").val();
                    $.ajax({
                        type: 'get',
                        url: SERVER_URL + '/dept/infobyid',
                        data: {
                            id: yg_bmid,
                            token: token
                        },
                        dataType: "json",
                        success: function (data) {
                            console.log('000000001');
                            console.log(data);
                            console.log(data['data']['headid']);
                            console.log('000000001');
                            var name_zg=$(".zcj_edit_name").val();
                            if(data['data']['headid']>0){

                                 if(confirm("该部门已有主管，是否更换（"+name_zg+"）为部门主管")){
                                     $(".zcj_edit_is_set_bmzg").attr("checked",true)
                                 }else{
                                     $(".zcj_edit_is_set_bmzg").attr("checked",false)
                                 }
                            }
                        }
                    })
                });

               /*邮箱*/
               // $(".tanceng .zcj_edit_mail").die().live("blur",function(){
               //     var email_val=$(this).val();
               //     CheckMail(email_val);
               // });

               /* 手机号*/
               $('.tanceng .zcj_edit_mobile').die().live("blur",function(){
                   var mobil=$(this).val();
                   checkMobile(mobil);
               });
               /*身份证*/
               $('.tanceng .zcj_identity_inum').die().live("blur",function(){
                   var number=$(this).val();
                   checknumber(number)
               });


               $(".zcj_list_marry li").die().live("click",function(){
                   var sexid=$(this).attr("value");
                   /*alert(sexid);*/
               });

               /*编辑保存*/
           $(".zcj_edit_save_btn").die().live("click",function(){
               	var _this=this;

                   var name;/*姓名*/
                   if($(".zcj_edit_name").val()!="请输入姓名"){
                       name=$(".zcj_edit_name").val();
                   }else{
                       name='';
                   }
                   var number=$(".zcj_edit_inum").val();/*工号*/
                   var sex=$(".zcj_edit_sex").val();/*性别*/
                   var mobile;/*手机号*/
                   if($(".zcj_edit_mobile").val()!="请输入手机号"){
                       mobile=$(".zcj_edit_mobile").val();
                   }else{
                       mobile='';
                   }
               if(checkMobile(mobile)==false){
                   return false;
               }

               var bmname=$(".zcj_edit_section").val();/*//部门*/
                   var deptid=$("#bjz_add_bm_id").val();/*部门id*/
                   var rank;/*职位*/
                   if($(".zcj_edit_post").val()!="请输入岗位"){
                       rank=$(".zcj_edit_post").val();
                   }else{
                       rank='';
                   }
                   var mail;/*邮箱*/
                   if($(".zcj_edit_mail").val()!="请输入邮箱"){
                       mail=$(".zcj_edit_mail").val();
                   }else{
                       mail='';
                   }
               if(mail!=''){
                   if(CheckMail(mail)==false){
                       return false;
                   }
               }
                   var education;
                   if($(".hr_edit_Member_education").val()!="请输入学历"){
                       education=$(".hr_edit_Member_education").val();
                   }else{
                       education='';
                   }
                   // var idata=$(".zcj_edit_idata").val();/*毕业日期*/
                   // var end=$(".zcj_edit_select_end").val();/*入职日期*/
                   var nation=$(".zcj_edit_nation").val();/*民族*/
                   if($(".zcj_edit_nation").val()!="请输入民族"){
                       nation=$(".zcj_edit_nation").val();
                   }else{
                       nation='';
                   }
                   var inative;/*籍贯*/
                   if($(".zcj_edit_inative").val()!="请输入籍贯"){
                       inative=$(".zcj_edit_inative").val();
                   }else{
                       inative='';
                   }
                   var inum;/*身份证号*/
                   if($(".zcj_identity_inum").val()!="请输入身份证号"){
                       inum=$(".zcj_identity_inum").val();
                   }else{
                       inum='';
                   }
               if(inum!=''){
                   if(checknumber(inum)==false){
                       return false;
                   }
               }
                   var selectdata;/*生日日期*/
                   if($(".zcj_identity_selectdata").val()!="请选择日期"){
                       selectdata=$(".zcj_identity_selectdata").val();
                   }else{
                       selectdata='';
                   }

                   var marry=$(".zcj_edit_marry").val();/*婚姻状况*/
                   if(marry=="已婚"){
                       marry=1;
                       $(".zcj_edit_marry").data('id',1);
                   }else if(marry=="未婚"){
                       marry=2;
                       $(".zcj_edit_marry").data('id',2);
                   }else{
                       marry=0;
                       $(".zcj_edit_marry").data('id',0);
                   }

                   var address;/*家庭住址*/
                   if($(".zcj_edit_address").val()!="请输入家庭住址"){
                       address=$(".zcj_edit_address").val();
                   }else{
                       address='';
                   }
                   var urgency;/*紧急联系人*/
                   if($(".zcj_edit_urgency").val()!="请输入紧急联系人"){
                       urgency=$(".zcj_edit_urgency").val();
                   }else{
                       urgency='';
                   }
                   var ipone;/*紧急联系人电话*/
                   if($(".zcj_edit_urgency_ipone").val()!="请输入紧急人联系电话"){
                       ipone=$(".zcj_edit_urgency_ipone").val();
                   }else{
                       ipone='';
                   }
                   var password=$(".zcj_edit_password").val();/*原密码*/

                var edit_zg;//部门主管
                if($(".tanceng .zcj_edit_is_set_bmzg").is(':checked')){
                    edit_zg=1;
                }else{
                    edit_zg=0;
                }

                var icon_url=$(".zcj_edit_icon_mr_show").data('url');
                 //alert(icon_url);
               //调用员工详情数据
               if(name==''){
                alert('姓名不能为空');
               }else if(mobile==''){
                   alert('手机号不能为空');
               }else if(number==''){
                   alert('工号不能为空');
               }else {
                   $.ajax({
                       type: 'post',
                       url:SERVER_URL + "/admin/add",
                       data:{
                           'token': token,
                           'id': hr_yg_id,
                           'face':icon_url,
                           'name':name ,
                           'mobile':mobile,
                           'sex':sex,
                           'deptname':bmname,//部门id
                           'deptid':deptid,  //部门id
                           'ranking':rank, //职务
                           'is_director':edit_zg,
                           /* 'superman':'', //主管
                            'superid':0, //主管id*/
                           // 'workdate':end, //入职时间
                           /*  'status':1, //状态
                            'type':0, //类型*/
                           'email':mail, //邮箱
                           /*  'tel':'', //电话*/
                           /* 'sort':0, //排序*/
                           'hr_radioa':1,
                           'jobnumber':number,//工号
                           // 'graduationtime':idata,//毕业时间
                           'nation':nation,//民族
                           /* 'job_status':1,//工作状态：1是临时员工2正式员工3离职员工*/
                           'birthplace':inative,//籍贯
                           'idnumber':inum,//身份证号
                           'birthday':selectdata,//生日
                           'marital_status':marry,//婚姻状况:2未婚1已婚
                           'address':address, //家庭住址
                           'contact':urgency, //紧急联系人
                           'contact_lx':ipone, //紧急联系人电话
                           // 'pass':newpassword,//dl密码
                           // 'confirm_pass':againpass,//新密码
                           'education':education //学历*/

                       },
                       dataType : "json",
                       success : function(data) {
                           console.log(data);
                           /* $(".zcj_gb_btn").hide();*/
                           if(data.code==0){
                               delbtn(_this);
                               left_list();
                               params.dept=deptid;
                               depart_staff();
                               $(".hr_slider_close").click();
                           }else{
                               alert(data.msg);
                           }

                       },
                       error: function(data){
                           alert("更新失败，请稍后再试");
                       }
                   })
               }

           return false;
         });
           /*修改*/
           $(".zcj_yg_amend_pass_btn").die().live("click",function(){
               var uid=$(this).data('id');
               /*修改密码确认*/
                $(".zcj_end_amend_cg_pass").die().live("click",function () {
                    var vdel=this;
                    var oldpassword;/*登陆密码*/
                    if($(".zcj_edit_new_password").val()=='请输入密码'){
                        oldpassword=''
                    }else{
                        oldpassword=$(".zcj_edit_new_password").val();
                    }
                    var againpass;/*新密码*/

                    if($(".zcj_edit_again_password").val()=='请再次输入密码'){
                        againpass=''
                    }else{
                        againpass=$(".zcj_edit_again_password").val();
                    }
                    if(oldpassword!=againpass){
                        alert('密码输入不一致');

                    }else if(oldpassword.length>16 || oldpassword.length<6){
                        alert('请输入大于6且小于十六位数或字母');
                    }else if(againpass.length>16 || againpass.length<6){
                        alert('请输入大于6且小于十六位数或字母');
                    }else if(oldpassword==''){
                        alert('请输入登陆密码');
                    }else if(againpass==''){
                        alert('请再次输入确认密码');
                    }else{
                        $.ajax({
                            type: 'post',
                            url: SERVER_URL + "/admin/modifypwd",
                            data:{
                                token:token,
                                uid: hr_yg_id,
                                pwd:againpass

                            },
                            dataType : "json",
                            success : function(data) {
                                /* console.log(data);*/
                                if(data.code==0){
                                    alert(data.msg);
                                    $(vdel).parents('.dialog_content').find('.dialog_close').click();
                                    depart_staff();
                                    left_list();
                                }else{
                                    alert(data.msg);
                                }
                            },
                            error: function(data){
                                alert("更新失败，请稍后再试");
                            }
                        })
                    }

                });

           });
       });
    });


    $(function(){
        //删除
        function delfn(vdel,hr_del_id){
            $.ajax({
                type: 'get',
                url: SERVER_URL + "/admin/deldata",
                data:{
                    token:token,
                    id: hr_del_id

                },
                dataType : "json",
                success : function(data) {
                   /* console.log(data);*/
                    if(data.code==0){
                        $(vdel).parent().parent().remove();
                        depart_staff();
                        left_list();
                    }else{
                        alert(data.msg);
                    }
                },
                error: function(data){
                    alert("更新失败，请稍后再试");
                }
            })
        }
        /*删除按钮*/
       $('.zcj_hr_del_btn').die().live("click",function(){
         /*  $('.hr_importVIP').fadeIn(200);*/
          var hr_del_id= $(this).attr("delid");
          var _this=this;
          /* alert(hr_del_id);*/
            $(".zcj_bm_ry_del_btn").die().live("click",function(){
                delfn(_this,hr_del_id);

            });

           return false;

       });

        /*查看删除*/
        $(".tanceng .zcj_check_del").die().live("click",function(){
            var check_del=this;
            var zcj_del_id=$("#zcj_del_editor_hidden").val();
            $(".zcj_bm_ry_del_btn").die().live("click",function(){
                delfn("",zcj_del_id);
                depart_staff();
                left_list();
                $(check_del).parents('.hr_Sideslip').find('.hr_slider_close').click();
            });
           /* delfn(zcj_del_id);
            depart_staff();*/

           /* return false;*/
        });
    });


	/*初始密码设置*/
	$(".zcj_pass_btn").die().live("click",function(){
		var me = this;
		/* $(me).next().click()*/
        var re = /^[a-zA-Z0-9]\w{5,15}$/;

		var star=$(".zcj_star_pass").val();
		var end=$(".zcj_end_pass").val();
            if(star==end){

                $.ajax({
                    type: 'post',
                    url: SERVER_URL +"/admin/updateallpwd",
                    data:{
                        token:token,
                        uid:Admin.get_uid(),
                        pwd:star,
                        newpwd:end
                    },
                    dataType : "json",
                    success : function(data) {
                        console.log(data);
                        if(data.code==0){
                            /*delbtn(".zcj_pass_btn");*/
                            $(me).next().click()
                            alert(data.msg);
                        }else{
                            alert(data.msg);
                        }
                    },
                    error: function(data){
                        alert("更新失败，请稍后再试");
                    }
                })
            }

	});
	/*刷新*/
	$(".zcj_dj_ref_btn").die().live("click",function(){

        //点击按钮调用的方法
                refresh();

        function refresh(){
            /*window.location.reload();*///刷新当前页面.
           /* left_list();*/
           /* params.dept=0;
            depart_staff();*/
            params['page']=1;
            // params['limit']='';
            params['key']='';
            params['dept']='';
            params['ranking']='';
            params['sex']='';
            params['education']='';
            params['jobstatus']='';
            $(".hr_left_all").trigger("click");
            depart_staff();
            left_list();
            //或者下方刷新方法
            //parent.location.reload()刷新父亲对象（用于框架）--需在iframe框架内使用
            // opener.location.reload()刷新父窗口对象（用于单开窗口
            //top.location.reload()刷新最顶端对象（用于多开窗口）
        }
    });



});

