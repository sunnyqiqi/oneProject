
/*借入单*/
//$(function(){
    //var SERVER_URL="http://192.168.0.167:9091";
    var token=Admin.get_token();
//var token='2017051308443559139-1-4';
    ///	弹窗无限循环树结构 左侧
    function tree_list_dialog_right(datalist) {

        var html = '';
        $.each(datalist, function (index, data) {
            /* html += '<ul class="hr_ul1">';*/
            if(data['children'].length>0){
                html += '<ul class="hr_ul1">';
            }else{
                html += '<ul class="">';
            }
            html += '<li class="hr_left_1 "  data-id="' + data['id'] + '" data-pid="' + data['pid'] + '"><span>' + data['name'] +'</span>(' + data['children'].length + ')</li>';

            if (data['children'] && data['children'].length > 0) {
                html += tree_list_dialog_right(data['children']);
            }

            html += '</li>';
            html += '</ul>'
        });
        return html;

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
    //	dialog tree list choose dept_person 部门和人无限
    function tree_list_choose_dept_person(datalist, deep) {
        var html = '';
        $.each(datalist, function (index, data) {
            var html_i_list_before = '<i class="list_before_span"></i>';
            html += '<ul class="ul1">';
            for (var j = 0; j < deep; j++) {
                html_i_list_before += '<i class="list_before_span"></i>'
            }
            if(data['children'].length > 0 || data['user_info'].length>0){
                html += '<li class="left_1" deptchosenid = "' + data["id"] + '">' + html_i_list_before + '<span class="icon_open change_ba"></span><span class="icon_file"></span><span class="list_msg">' + data['name'] + '</span></li>';
            }else{
                html += '<li class="left_1" deptchosenid = "' + data["id"] + '">' + html_i_list_before + '<span class="change_ba"></span><span class="icon_file"></span><span class="list_msg">' + data['name'] + '</span></li>';
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
                html += '<li class="left_2 person_left_nav li_person" userinfoid="' + data2['id'] + '">' + html_i_list_before + '<span class="list_msg">' + data2['name'] + ' </span></li>'
            });
            html += '</ul>';
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
    /*8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888*/

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

    // 选择查看项
    // 定义查看项
    var venCustomLookAbledField = [
        {'index': null, 'field': '入库状态'},
        {'index': null, 'field': '创建日期'},
        {'index': null, 'field': '下单人'},
        {'index': null, 'field': '备注'}
       /* {'index': null, 'field': '商品名称规格属性'},
        {'index': null, 'field': '供应商'},
        {'index': null, 'field': '预计归还日期'},
        {'index': null, 'field': '入库库房'},
        {'index': null, 'field': '当前状态'},
        {'index': null, 'field': '入库状态'},
        {'index': null, 'field': '负责人'},
        {'index': null, 'field': '制单人'},
        {'index': null, 'field': '审批状态'},
        {'index': null, 'field': '备注'},
        {'index': null, 'field': '操作'}*/
    ];
    //likShow('.zcj_jrd_table_head_content_show', venCustomLookAbledField, '.zcj_xz_check_x_head_content', '.zcj_jrd_check_save_btn', '.zcj_jrd_check_cancal_btn');
    //	补零函数
    function repair(x) {
        return x < 10 ? '0' + x : x
    }
    //	补零函数
    function l_dbl(x) {
        return x < 10 ? '0' + x : x
    }
    //金额保留两位小数
    function moneyToFixed(money) {
        return money.toFixed(2);
    }
    //获取当前系统时间  年-月-日  时: 分: 秒
    function getCurrentDate() {
        var oDate = new Date();
        var sTime = '';
        sTime = oDate.getFullYear() + '-' + l_dbl(oDate.getMonth() + 1) + '-' + l_dbl(oDate.getDate()) + ' ' + l_dbl(oDate.getHours()) + ':' + l_dbl(oDate.getMinutes()) + ':' + l_dbl(oDate.getSeconds());
        return sTime
    }

    //获取当前系统时间  年-月-日
    function getCurrentDateDay() {
        var oDate = new Date();
        var sTime = '';
        sTime = oDate.getFullYear() + '-' + l_dbl(oDate.getMonth() + 1) + '-' + l_dbl(oDate.getDate());
        return sTime
    }
    /*截取时间*/
    function subTime(time){
       var newtime = time.substr(0,10);
       return newtime;
    }
    // json数组去重
    function getJsonArr(arr) {
        //定义需要的空数组
        var newArr = [];
        //定义转换字符串后的数组
        var newStringArr = [];
        $.each(arr, function (i, v) {
            var sArr = JSON.stringify(v);
            if ($.inArray(sArr, newStringArr) == -1 && sArr.indexOf('null') == -1) {
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
        return o.toString();
    }

    var department_id=localStorage.getItem("department_id");
    var company_id=localStorage.getItem("usercompany_id");
    var uid=localStorage.getItem("uid");
    var username=localStorage.getItem("username");

    var powerUrls=localStorage.getItem("user_info_url");
    var company_admin=localStorage.getItem("company_admin");
    var power=JSON.parse(powerUrls);
    /*console.log(power);*/
    var add_jrd="borrow/add";//新建
    var zf_jrd="borrow/invalid";//作废
    if(company_admin!=1) {
        if ($.inArray(add_jrd, power) > -1) {
            $(".zj_new_create_jrd_btn").show();

        } else {
            $(".zj_new_create_jrd_btn").hide();
            $(".contenthead .right").css('width','60px')
        }

    }
    /********借入单获取编号方法***************/
    function new_number(classname,number){
        $.ajax({
            type: 'get',
            url: SERVER_URL + "/admin/autoload",
            data:{
                token:token,
                args:number
            },
            dataType: "json",
            success: function (data) {
                console.log(data);
                if(data.code==0){
                    $(classname).val(data.data);
                }else{
                    alert(data.msg);
                }

            },
            error:function(data){
                alert(data);
            }
        });
    }
    var borrow_jrd_data={
        token: token,
        uid:uid,
        company_id:company_id,
        is_invalid:1,
        page: 1,
        num: 10
    }
/**************************我发起的************************/
    /*接入单列表方法*/
    function borrow_list() {

        $.ajax({
            type: 'post',
            url: SERVER_URL + "/borrow/list",
            data: borrow_jrd_data,
            dataType: "json",
            success: function (data) {
                console.log('1000');
                console.log(data);
                console.log('1000');

                if(data.code==0){

                    if(data['data'].length>0){
                        $(".zcj_jrdfy_head_page_div").show();
                        $(".zcj_jrd_no_data_show").hide();
                    }else{
                        $(".zcj_jrdfy_head_page_div").hide();
                        $(".zcj_jrd_no_data_show").show();
                    }
                }else{
                    $(".zcj_jrdfy_head_page_div").hide();
                    $(".zcj_jrd_no_data_show").show();
                }


                var html='';
                var P_sort=" ";
                if(data.code==0){
                    $(".zj_jrd_show_info_zsum").text(data.total_num)
                    $.each(data.data,function(index,content){
                        var sort=repair(index+1)
                        if(content['is_invalid']==1){
                            html+='<tr class="grey"> <td><span class="voidIcon">作废</span></td>'

                        }else{
                            html+='<tr> <td>'+sort+'</td>'
                        }
                        html+='<td>'+likNullData(content['code_sn'])+'</td> <td>'+likNullData(content['supplier_name'])+'</td> <td>'+likNullData(content['expect_return_time'])+'</td>'
                        if(content['approval_status']==0){
                            html+='<td class="c_y">未审批</td> '
                        }else if(content['approval_status']==1){
                            html+='<td class="c_y">审批中</td> '
                        }else if(content['approval_status']==2){
                            html+='<td class="c_g">审批通过</td> '
                        }if(content['approval_status']==3){
                            html+='<td class="c_r">驳回</td> '
                        }

                        html+='<td>'+likNullData(content['approval_name_str'])+'</td> <td>'+likNullData(content['library_time'])+'</td>'
                        if(content['library_status']==1){
                            html+='<td class="c_r">待入库</td>';
                        }else if(content['library_status']==2){
                            html+='<td class="c_y">部分入库</td>';
                        }else if(content['library_status']==3){
                            html+='<td class="c_g">已入库</td>';
                        }else{
                            html+='<td>-</td>';
                        }

                        html+='<td>'+likNullData(content['create_time'])+'</td> <td>'+likNullData(content['name'])+'</td> <td>'+likNullData(content['all_money'])+'</td>';
                        if(content['thetype']==0){
                            html+='<td class="">-</td>'

                        }else if(content['thetype']==1){
                            html+='<td class="c_r">未归还</td>'


                        }else if(content['thetype']==2){
                            html+='<td class="c_y">部分归还</td>'


                        }else if(content['thetype']==3){
                            html+='<td class="c_g">已归还</td>'


                        } else{
                            html+='<td class="c_r">-</td>'
                        }

                        if(content['approval_status']==0){
                            if(content['is_invalid']==1){
                                html+='<td>'+likNullData(content['note'])+'</td> <td> <button class="but_mix r_sidebar_btn zj_check_jrd_info_btn" data-supplier_name="'+content['supplier_name']+'" data-id="'+content['id']+'" data-code_sn="'+content['code_sn']+'" name="takenote_jrd_ck">查看</button><button class="but_mix val_dialog but_r zj_jrd_gh_del_btn" data-id="'+content['id']+'" name="takenote_jrd_cgxsc">删除</button> <button class="but_mix1 but_grey1">作废</button> </td></tr>'
                            }else {
                                html+='<td>'+likNullData(content['note'])+'</td> <td> <button class="but_mix r_sidebar_btn zj_check_jrd_info_btn" data-supplier_name="'+content['supplier_name']+'" data-id="'+content['id']+'" data-code_sn="'+content['code_sn']+'" name="takenote_jrd_ck">查看</button><button class="but_mix val_dialog but_r zj_jrd_gh_del_btn" data-id="'+content['id']+'" name="takenote_jrd_cgxsc">删除</button> <button class="but_mix but_r but_void zj_jrd_zf_btn" data-id="'+content['id']+'">作废</button> </td></tr>'
                            }


                        }else if(content['approval_status']==1){
                            if(content['is_invalid']==1){
                                html+='<td>'+likNullData(content['note'])+'</td> <td> <button class="but_mix r_sidebar_btn zj_check_jrd_info_btn" data-supplier_name="'+content['supplier_name']+'" data-id="'+content['id']+'" data-code_sn="'+content['code_sn']+'" name="takenote_jrd_ck">查看</button><button class="but_mix val_dialog but_r zj_jrd_gh_del_btn" data-id="'+content['id']+'" name="takenote_jrd_cgxsc">删除</button> <button class="but_mix1 but_grey1">作废</button> </td></tr>'
                            }else {
                                html+='<td>'+likNullData(content['note'])+'</td> <td> <button class="but_mix r_sidebar_btn zj_check_jrd_info_btn" data-supplier_name="'+content['supplier_name']+'" data-id="'+content['id']+'" data-code_sn="'+content['code_sn']+'" name="takenote_jrd_ck">查看</button><button class="but_mix val_dialog but_r zj_jrd_gh_del_btn" data-id="'+content['id']+'" name="takenote_jrd_cgxsc">删除</button> <button class="but_mix but_r but_void zj_jrd_zf_btn" data-id="'+content['id']+'">作废</button> </td></tr>'
                            }
                        }else if(content['approval_status']==2){
                            if(content['is_invalid']==1){
                                html+='<td>'+likNullData(content['note'])+'</td> <td> <button class="but_mix r_sidebar_btn zj_check_jrd_info_btn" data-id="'+content['id']+'" data-code_sn="'+content['code_sn']+'" data-supplier_name="'+content['supplier_name']+'" name="takenote_jrd_ck">查看</button> <button class="but_mix1 but_grey1" data-id="'+content['id']+'" data-supplier_id="'+content['supplier_id']+'" data-code_sn="'+content['code_sn']+'" data-supplier_name="'+content['supplier_name']+'" data-create_time="'+content['create_time']+'" data-name="'+content['name']+'" name="">借入归还</button> </td></tr>'

                            }else{
                                if(content['thetype']==3) {
                                    html += '<td>' + likNullData(content['note']) + '</td> <td> <button class="but_mix r_sidebar_btn zj_check_jrd_info_btn" data-id="' + content['id'] + '" data-code_sn="' + content['code_sn'] + '" data-supplier_name="' + content['supplier_name'] + '" name="takenote_jrd_ck">查看</button> <button class="but_mix1 but_grey1" data-id="' + content['id'] + '" data-supplier_id="' + content['supplier_id'] + '" data-code_sn="' + content['code_sn'] + '" data-supplier_name="' + content['supplier_name'] + '" data-create_time="' + content['create_time'] + '" data-name="' + content['name'] + '" name="">借入归还</button> </td></tr>'
                                }else{
                                    html += '<td>' + likNullData(content['note']) + '</td> <td> <button class="but_mix r_sidebar_btn zj_check_jrd_info_btn" data-id="' + content['id'] + '" data-code_sn="' + content['code_sn'] + '" data-supplier_name="' + content['supplier_name'] + '" name="takenote_jrd_ck">查看</button> <button class="but_mix val_dialog zj_jrd_jrgh_back_btn" data-id="' + content['id'] + '" data-supplier_id="' + content['supplier_id'] + '" data-code_sn="' + content['code_sn'] + '" data-supplier_name="' + content['supplier_name'] + '" data-create_time="' + content['create_time'] + '" data-name="' + content['name'] + '" name="takenote_jrd_jrgh_xj">借入归还</button> </td></tr>'
                                }
                            }


                        }if(content['approval_status']==3){
                            if(content['is_invalid']==1){
                                html+='<td>'+likNullData(content['note'])+'</td> <td> <button class="but_mix r_sidebar_btn zj_check_jrd_info_btn" data-supplier_name="'+content['supplier_name']+'" data-id="'+content['id']+'" data-code_sn="'+content['code_sn']+'" name="takenote_jrd_ck">查看</button><button class="but_mix val_dialog but_r zj_jrd_gh_del_btn" data-id="'+content['id']+'" name="takenote_jrd_cgxsc">删除</button> <button class="but_mix1 but_grey1">作废</button> </td></tr>'
                            }else {
                                html+='<td>'+likNullData(content['note'])+'</td> <td> <button class="but_mix r_sidebar_btn zj_check_jrd_info_btn" data-supplier_name="'+content['supplier_name']+'" data-id="'+content['id']+'" data-code_sn="'+content['code_sn']+'" name="takenote_jrd_ck">查看</button><button class="but_mix val_dialog but_r zj_jrd_gh_del_btn" data-id="'+content['id']+'" name="takenote_jrd_cgxsc">删除</button> <button class="but_mix but_r but_void zj_jrd_zf_btn" data-id="'+content['id']+'">作废</button> </td></tr>'
                            }
                        }
                    })
                    if(company_admin!=1) {

                        /*作废*/

                        if ($.inArray(zf_jrd, power) > -1) {
                            $(".zj_jrd_zf_btn").show();

                        } else {
                            $(".zj_jrd_zf_btn").hide();

                        }
                    }

                }else{
                    alert(data.msg);
                }
                $(".zj_my_fq_jrd_body_content_data_list").html(html);
                /*分页*/

                // var znum=data.totalcount;
                // var zpage=data.data.length;
                $(".zcj_jrd_seach_syjg").text(data.total_num);
                list_table_render_pagination(".zcj_jrdfy_head_page_div",borrow_jrd_data,borrow_list,data.total_num,data.data.length);
                $(".zcj_jrd_check_save_btn").trigger('click');
            }

        })
    }
    /*接入单列表展示数据*/
//console.time('time');
$("#zj_jrd_my_fq_table").die().live("click",function(){
    $(".zj_jrd_wfqd_content_info").addClass('lik_table_wrap');
    $(".zj_jrd_dwsp_content_info").removeClass('lik_table_wrap');
    $(".zj_jrd_cswd_content_info .lik_table_ul").removeClass('lik_table_wrap');
    // $(".zj_jrd_wfqd_content_info").show();
    // $(".zj_jrd_dwsp_content_info").hide();
    // $(".zj_jrd_cswd_content_info").hide();
    likShow('.zcj_jrd_table_head_content_show', venCustomLookAbledField, '.zcj_xz_check_x_head_content', '.zcj_jrd_check_save_btn', '.zcj_jrd_check_cancal_btn');
    $(".goods_wfqd_attr_search_table").show();
    $(".goods_dwsp_attr_search_table").hide();
    $(".goods_cswd_attr_search_table").hide();
    borrow_list();
    /*高级搜索*/
    /*审批状态*/
    $(".zj_jrd_sp_state li").die().live("click",function(){
        var state=$(this).data('id')
        borrow_jrd_data.approval_status=state;
        borrow_jrd_data.page=1;
        borrow_list();
    });
    /*入库状态*/
    $(".zj_jrd_rk_state li").die().live("click",function(){
        var library_status=$(this).data('id');
        borrow_jrd_data.library_status=library_status;
        borrow_jrd_data.page=1;
        borrow_list();
    });
    /*归还状态*/
    $(".zj_jrd_gh_state li").die().live("click",function(){
        var thetype=$(this).data('id')
        borrow_jrd_data.thetype=thetype;
        borrow_jrd_data.page=1;
        borrow_list();
    });

});
    $("#zj_jrd_my_fq_table").trigger('click');
//console.timeEnd('time');
    /*搜索*/
$(".zj_jrd_search_btn").die().live("click",function(){
    var sear_s=$('.zj_input_sear_name_val').val();
    if($(".zj_jrd_header_tab_li .tabhover").text()=='我发起的'){
        if($('.zj_input_sear_name_val').val()=='搜索借入编号/供应商名称'){
            borrow_jrd_data.key_search=''
        }else{
            borrow_jrd_data.key_search=sear_s;

        }
        borrow_jrd_data.page=1;
        borrow_list();
    }else if($(".zj_jrd_header_tab_li .tabhover").text()=='待我审批'){
        if($('.zj_input_sear_name_val').val()=='搜索借入编号/供应商名称'){
            sp_data.key_search=''
        }else{
            sp_data.key_search=sear_s;

        }
        sp_data.page=1;
        jrd_dwsp_mine_fn();
    } else if($(".zj_jrd_header_tab_li .tabhover").text()=='抄送我的'){
        if($('.zj_input_sear_name_val').val()=='搜索借入编号/供应商名称'){
            cs_data.key_search=''
        }else{
            cs_data.key_search=sear_s;

        }
        cs_data.page=1;
        jrd_copy_mine_fn();
    }

});

/*查看*/
$(".zj_check_jrd_info_btn").die().live("click",function(){
    var _this=this;
    $(".zj_jrgh_list_sum_num").text('')
    $(".zj_cgbjd_list_sum_num").text('');
    var supplier_name=$(this).data('supplier_name');
    $('.zj_jcd_supplier_gys_name').text(supplier_name);
    var check_id=$(this).data('id');
    $(".zj_check_jrd_xq_info_content_btn").text('查看借入单');
    $(".zj_my_fq_zcgbj_div").show();
    $(".zj_dwsp_sp_div").hide();
    $(".zj_my_cswd_zcgbj_div").hide();
    var code=$(this).data('code_sn');
    /*基本信息*/
    $("#zj_jb_info_table_name").die().live("click",function(){
        /*基本信息*/
        $.ajax({
            type: 'post',
            url: SERVER_URL + "/borrow/basic",
            data: {
                token: token,
                //company_id: company_id, //公司id
                id: check_id// 用户id

            },
            dataType: "json",
            success: function (data) {
                console.log('2000');
                console.log(data);
                console.log('2000');
                $(".zj_jrgh_list_sum_num").html(data['totalcount'])
            //     var str=data['data']['create_time']
            // var time=str.substr(0,10)
                //var info_show=$(".zj_jrd_goods_jb_info_check_show ")
                $(".zj_xdr_myname_show").text(data['data']['name']);
                $(".zj_mycreat_day_time").text(subTime(data['data']['create_time']));
                $(".zj_jrd_goods_jb_info_check_show .zj_jb_info_content_show p span").eq(0).text(data['data']['code_sn']);
                $(".zj_jrd_goods_jb_info_check_show .zj_jb_info_content_show p span").eq(1).text(data['data']['supplier_name']);
                $(".zj_jrd_goods_jb_info_check_show .zj_jb_info_content_show p span").eq(2).text(subTime(data['data']['expect_return_time']));
                if(data['data']['tax_rate']==1){
                    $(".zj_jrd_goods_jb_info_check_show .zj_jb_info_content_show p span").eq(3).text('17%');
                }else{
                    $(".zj_jrd_goods_jb_info_check_show .zj_jb_info_content_show p span").eq(3).text('无税');
                }

                $(".zj_jrd_goods_jb_info_check_show .zj_jb_info_content_show p span").eq(4).text(data['data']['note']);
                var c_name='';
                $.each(data['cc'],function (i,csr_name) {
                    c_name+=''+csr_name['name']+','
                })
                c_name = c_name.slice(0, c_name.length - 1);
                $(".zj_jrd_goods_jb_info_check_show .zj_jb_info_content_show p span").eq(5).text(c_name);

                if(data['data']['thetype']==0){
                    $(".zj_jrd_goods_jb_info_check_show .zj_jb_info_content_show p span").eq(6).text("-");
                    $(".zj_check_jrgh_jrd_li_btn").hide();
                    $(".zj_check_jrd_zf_li_btn").show();
                    $(".zj_check_jrd_del_li_btn").show();
                }else if(data['data']['thetype']==1){
                    $(".zj_jrd_goods_jb_info_check_show .zj_jb_info_content_show p span").eq(6).text("未归还");
                    $(".zj_check_jrgh_jrd_li_btn").show();
                    $(".zj_check_jrd_zf_li_btn").hide();
                    $(".zj_check_jrd_del_li_btn").hide();
                }else if(data['data']['thetype']==2){
                    $(".zj_jrd_goods_jb_info_check_show .zj_jb_info_content_show p span").eq(6).text("部分归还");
                    $(".zj_check_jrgh_jrd_li_btn").show();
                    $(".zj_check_jrd_zf_li_btn").hide();
                    $(".zj_check_jrd_del_li_btn").hide();
                }else if(data['data']['thetype']==3){
                    $(".zj_jrd_goods_jb_info_check_show .zj_jb_info_content_show p span").eq(6).text("已归还");
                    $(".zj_check_jrd_zf_li_btn").hide();
                    $(".zj_check_jrgh_jrd_li_btn").hide();
                    $(".zj_check_jrd_del_li_btn").hide();

                    /*不可采购报价单*/
                    $(".zj_my_fq_zcgbj_div").hide();
                    $(".zj_dwsp_sp_div").hide();
                    $(".zj_my_cswd_zcgbj_div").show();
                }else{
                    // $(".zj_check_jrgh_jrd_li_btn").show();//借入归还
                    // $(".zj_check_jrd_zf_li_btn").show();//作废
                    // $(".zj_check_jrd_del_li_btn").show();//删除
                }
                $(".zj_jrd_goods_jb_info_check_show .zj_rk_info").text(subTime(data['data']['library_time']))
            }
        })

        /*查看审批结果*/
        $.ajax({
            type: 'post',
            url: SERVER_URL + "/borrow/approval-result",
            data: {
                token: token,
                //company_id: company_id, //公司id
                id: check_id,//id
                uid:uid

            },
            dataType: "json",
            success: function (data) {
                console.log('审批结果');
                console.log(data);
                console.log('审批结果');
                // if(data['is_across']==1){
                //     $(".zj_bz_is_hid").addClass('none1')
                // }else if(data['is_across']==2){
                //     $(".zj_bz_is_hid").removeClass('none1')
                // }
                var html='';
                $.each(data['data'],function(i,vinfo){

                    html+='<div class="work_spiliu">'
                    html+='<div class="work_spiliu_items" style="overflow: hidden;">'
                    html+='<div class="left" style="position: relative;">'
                    html+='<div class="work_spiliu_div">'
                    if(vinfo['headpic']=="" || vinfo['headpic']==null){
                        html+='<img class="inline_block tx" src="static/images/touxiang.png">'
                    }else{
                        html+='<img class="inline_block tx" src="'+getImgUrl(vinfo['headpic'])+'">'
                    }

                    html+='<h3 class="work_sp_h3">'+likNullData(vinfo['username'])+'</h3>'
                    if(vinfo['approval_status']!=9){
                        html+='<span class="c_9 m_left_5 zj_bz_is_hid">步骤'+i+'</span>'
                    }else{
                        html+='<span class="c_9 m_left_5 zj_bz_is_hid"></span>'
                    }

                    html+='</div>'
                    if(vinfo['approval_status']==0){
                        html+='<cite class="b_h"></cite>'
                    }else if(vinfo['approval_status']==1){
                        html+='<cite class="b_y"></cite>'
                    }else if(vinfo['approval_status']==2){
                        html+='<cite class="b_g"></cite>'
                    }else if(vinfo['approval_status']==3){
                        html+='<cite class="b_r"></cite>'
                    }else if(vinfo['approval_status']==4){
                        html+='<cite class="b_b"></cite>'
                    }else if(vinfo['approval_status']==9){
                        html+='<cite class="b_b"></cite>'
                    }
                    html+='</div>'
                    html+='<div class="auto_height">'

                    html+='<img src="static/images/work_jiantou.png">'

                    html+='<div class="sp_cont">'
                    html+='<div class="sp_cont_a">'
                    if(vinfo['approval_status']==0){
                        html+='<h3 class="b_h">待审批</h3>'
                    }else if(vinfo['approval_status']==1){
                        html+='<h3 class="c_y">审批中</h3>'
                    }else if(vinfo['approval_status']==2){
                        html+='<h3 class="c_g">审批通过</h3>'
                    }else if(vinfo['approval_status']==3){
                        html+='<h3 class="c_r">拒绝</h3>'
                    }else if(vinfo['approval_status']==4){
                        html+='<h3 class="f_color bold">撤回</h3>'
                    }else if(vinfo['approval_status']==9){
                        html+='<h3 class="f_color bold">发起审批</h3>'

                    }

                    if(vinfo['update_time']==null || vinfo['update_time']==''){
                        html+='<p class="c_9"></p>'
                    }else{
                        html+='<p class="c_9">'+likNullData(vinfo['update_time'])+'</p>'
                    }
                    //html+='<p class="c_9">'+likNullData(vinfo['update_time'])+'</p>'
                    html+='</div>'
                    if(vinfo['approval_status']==9){
                        html+='<p class="c_3 work_sp_p none1">'+likNullData(vinfo['note'])+'</p>'
                    }else{
                        html+='<p class="c_3 work_sp_p">'+likNullData(vinfo['note'])+'</p>'
                    }

                    html+='</div>'
                    html+='</div>'
                    html+='<div style="clear: both;height: 0;font-size: 1px;line-height: 0px;"></div>'
                    html+='</div>'
                    html+='</div>'
                })
                $(".zj_sp_jg_result_content_show").html(html);
                if(data['is_across']==1){
                    $(".zj_bz_is_hid").hide();
                }else{
                    $(".zj_bz_is_hid").show();
                }
            }
        })



        /*查看借入单btn*/
        $(".zj_check_jrd_xq_info_content_btn").die().live("click",function(){
            $.ajax({
                type: 'POST',
                url: SERVER_URL + "/borrow/look-borrow",
                data: {
                    token: token,
                    //company_id: company_id, //公司id
                    id: check_id// 用户id
                },
                dataType: "json",
                success: function (data) {
                    console.log('我发起的');
                    console.log(data);
                    console.log('20001110000000000000000');
                    if(data.code==0){
                        if(data['data'].length==0){
                            return true;
                         //alert('没数据')
                         }

                            $(".zj_jrd_zcgbjd_end_btn").data('id',data['data']['id']).data('code_sn',data['data']['code_sn']).data('supplier_name',data['data']['supplier_name']).data('supplier_id',data['data']['id']);//id
                        $(".zj_jrd_xq_header_name").text(likNullData(data['data']['supplier_name']));
                            $(".zj_xdr_name_show").text(data['data']['xiadan_name']);
                            $(".zj_create_day_time_show").text(subTime(data['data']['create_time']));
                            $(".tanceng .zj_jrd_info_num_header_show .zj_jrd_bh_show_num").text(data['data']['code_sn']);
                            $(".tanceng .zj_jrd_info_num_header_show .zj_supplier_name_show").text(data['data']['supplier_name']);
                            $(".tanceng .zj_jrd_info_num_header_show .zj_yjgh_time_show").text(subTime(data['data']['expect_return_time']));
                            $(".tanceng .zj_jrd_info_num_header_show .zj_rk_day_show").text(subTime(data['data']['library_time']));
                            $(".tanceng .zj_jrd_info_num_header_show .zj_note_info_show").text(data['data']['note']);
                            if(data['data']['goods']['sum_total']){
                                $(".tanceng .zj_goods_zprice .zj_goods_hj_znum").text(data['data']['goods']['sum_total']);
                            }
                            // if(data['data']['setting']['sum_total']){
                            //     $(".xs_bjd_table_3 .zj_hj_zj_money").text(data['data']['setting']['sum_total']);
                            // }


                            /*ff*/
                            $(".zj_dj_hj_price_num").text(data['data']['unit_price_total']);
                            $(".zj_hs_hj_zprice_number").text(data['data']['tax_total']);
                            $(".zj_other_price_num").text(data['data']['other_costs']);
                            $(".zj_znum_zj_m_price").text(data['data']['all_money']);

                            $(".tanceng")
                            var html='';
                            $.each(data['data']['goods'],function(i,v){
                                $.each(v,function(i2,v2){
                                    var pair=repair(i2+1);
                                    html+='<tr>\
                            <td>'+pair+'</td>\
                            <td>'+likNullData(v2['good_sn'])+'</td>\
                            <td>'+likNullData(v2['good_name'])+'</td>\
                            <td>'+likNullData(v2['good_attr'])+'</td>\
                            <td>'+likNullData(v2['good_num'])+'</td>\
                            <td>'+likNullData(v2['good_price'])+'</td>\
                            <td>'+likNullData(v2['good_rate_price'])+'</td>\
                            <td>'+likNullData(v2['good_total'])+'</td>\
                            <td></td>\
                            </tr>'
                                })

                            })
                            $(".zj_goods_table_content_info").html(html);
                            /*整机商品*/

                            var complete='';
                            $.each(data['data']['setting'],function(i,arr){
                                var p=repair(i+1)
                                var setting='';
                                if(arr['good_list']){
                                    $.each(arr['good_list'],function(i2,v2){
                                        var setting_goods=''
                                        if(v2['attr_list']){
                                            $.each(v2['attr_list'],function(i3,v3){
                                                setting_goods+='<tr>\
                                                <td>'+likNullData(v3['good_sn'])+'</td>\
                                                <td>'+likNullData(v3['good_attr'])+'</td>\
                                                <td>'+likNullData(v3['sing_num'])+'</td>\
                                                <td>'+likNullData(v3['good_price'])+'</td>\
                                                <td>'+likNullData(v3['good_rate_price'])+'</td>\
                                                <td>'+likNullData(v3['good_total'])+'</td>\
                                                <td></td>\
                                                </tr>'
                                            })
                                        }

                                        setting+='<table class="xs_bjd_table_1">\
                                <thead>\
                                <tr style="background: #fff;">\
                                <th class="c_3" style="font-weight: 100;">'+likNullData(v2['title'])+'</th>\
                                <th></th>\
                                <th></th>\
                                </tr>\
                                <tr>\
                                <th width="90">编号</th>\
                                <th width="560">属性</th>\
                                <th width="50">数量</th>\
                                <th width="150">单价</th>\
                                <th width="90">含税价</th>\
                                <th width="90">总价</th>\
                                <th width="60"></th>\
                                </tr>\
                                </thead>\
                                <tbody>'+setting_goods+'\
                                </tbody>\
                            </table>'
                                    })
                                }

                                complete+='<div class="xs_div_2" style="margin-top: 20px;">\
                            <table class="xs_bjd_table">\
                            <thead>\
                            <tr>\
                            <th width="30">序号</th>\
                            <th width="90">编号</th>\
                            <th width="150">名称</th>\
                            <th width="340">属性</th>\
                            <th width="50">数量</th>\
                            <th width="150">单价</th>\
                            <th width="90">含税价</th>\
                            <th width="90">总价</th>\
                            <th width="60">配件</th>\
                            </tr>\
                            </thead>\
                            <tbody>\
                                <tr class="c_3 c_3 xs_bjd_bold">\
                                    <td>'+p+'</td>\
                                    <td>'+likNullData(arr['good_sn'])+'</td>\
                                    <td>'+likNullData(arr['good_name'])+'</td>\
                                    <td>'+likNullData(arr['good_attr'])+'</td>\
                                    <td>'+likNullData(arr['num'])+''+arr['good_unit']+'</td>\
                                    <td>'+likNullData(arr['price'])+'</td>\
                                    <td>'+likNullData(arr['containing_money'])+'</td>\
                                    <td class="zj_pz_sum_price">'+likNullData(arr['total_money'])+'</td>\
                                    <td><button class="but_mix box_open_btn_1 but_blue_1">展开</button></td>\
                                </tr>\
                            </tbody>\
                            </table>\
                            </div>\
                            <div class="xs_tc_goods_box goods_tc_toggle" style="display: none;">'+setting+'</div>'

                            })


                            $(".tanceng .zj_zj_goods_dv_content").html(complete);
                            var sum_price=0;
                            $(".tanceng .zj_zj_goods_dv_content .zj_pz_sum_price").each(function(){
                                sum_price+=parseFloat($(this).text());
                            })
                            $(".tanceng .zj_hj_zj_money").text(sum_price)


                    }else{
                        alert(data.msg);
                    }

                }
            })

        });
        /*转采购报价单*/
        $(".tanceng .zj_jrd_zcgbjd_end_btn").die().live("click",function(){
            $(".tanceng .xs_xsbjd_bjd_box .xs_xsbjd_box_ul ul li").eq(0).css({'background':'#32a0f6','border-color':'#32a0f6','color':'#fff'})
            var z_cg=this;
            new_number('.zj_z_cgbjd_num','CBJ')
            var id=$(this).data('id');
            var code=$(this).data('code_sn');//借入单编号
            var supplier_name=$(this).data('supplier_name');//供应商id
            var supplier_id=$(this).data('supplier_id');//供应商名字
            $(".zj_z_cgbjd_gl_jrd").val(code);
            $(".zj_z_cgbjd_gl_gys").val(supplier_name);
            if($(".tanceng .zj_zcgbjd_tex_val").val()=='含税17%'){

                $(".tanceng .zj_tax_sl_show").text('含税17%');
            }else{
                $(".tanceng .zj_tax_sl_show").text('无税');
            }
            $(".select_mormal .select_list li").die().live("click",function(){
                var dj=$(".tanceng .zj_zcg_quote_create_product_cost_total").val();


                if($(".tanceng .zj_zcgbjd_tex_val").val()=='含税17%'){
                    var sl=parseFloat(dj)*0.17
                    $(".tanceng .zj_tax_sl_show").text('含税17%');

                    $(".zj_zcg_quote_create_tax_total").val(sl.toFixed(2));
                    var zprice=$(".tanceng .zj_zcgbjd_create_cost_tax_total").text();
                    var z_price=parseFloat(zprice)+sl
                    $(".zj_zcgbjd_create_cost_tax_total").text(z_price.toFixed(2));
                }else{
                    var ws=$(".zj_zcg_quote_create_tax_total").val();
                    $(".tanceng .zj_tax_sl_show").text('无税');
                    var zj=$(".tanceng .zj_zcgbjd_create_cost_tax_total").text();
                    var z_sum=parseFloat(zj)-ws
                    $(".zj_zcgbjd_create_cost_tax_total").text(z_sum.toFixed(2));
                    $(".zj_zcg_quote_create_tax_total").val('0')
                }
            });
            var cgbjd_data={
                token: token,
                code_sn:'',
                borrow_id:'',
                supplier_id:'',
                tax_rate:'',
                flow:'',
                goods:'',
                setting:'',
                supplier_name:''


            }
            /*审批人获取*/
            $.ajax({
                type: 'POST',
                url: SERVER_URL + "/borrow/get-approval-type",
                data: {
                    token: token,
                    company_id: company_id, //公司id
                    uid: uid, // 用户id
                    category: 2,// 分类id 1合同管理,2采购,3借入借出
                    type_id: 5, // 类型(1销售合同,2采购合同,3员工合同,4其他合同,5采购报价单,6采购退换货,7借入单,8借出单,9归还单,10,归还单(借入归还),11(借出归还)
                    department_id:department_id
                },
                dataType: "json",
                success: function (data) {
                    console.log('10001');
                    console.log(data);
                    console.log('10001');

                    var html='';
                    var P_sort=" ";
                    if(data.code==0){
                        if(data['kuaji']==1) {
                            $.each(data['data'], function (i, v) {

                                if (v['face'] != '') {
                                    html += '<li data-id="' + v['uid'] + '" class="zj_spr_num"><em class="icon_personBtn"><img src="' + getImgUrl(v['face']) + '" style="width: 34px;height: 34px;border-radius:50px;"/></em> <em class="icon_adderBtn"></em> <p class="box_adderName">' + v['name'] + '</p> </li>'
                                } else {
                                    html += '<li data-id="' + v['uid'] + '" class="zj_spr_num"> <em class="icon_personBtn icon_personBtn_msg"></em> <em class="icon_adderBtn"></em> <p class="box_adderName">' + v['name'] + '</p></li>'
                                }


                            })
                        }else{
                            $.each(data['data'], function (i, v) {

                                if (v['face'] != '') {
                                    html += '<li data-id="' + v['uid'] + '" class="zj_spr_num"><em class="icon_personBtn"><img src="' + getImgUrl(v['face']) + '" style="width: 34px;height: 34px;border-radius:50px;"/><i class="icon_personNext"></i></em> <em class="icon_adderBtn"></em> <p class="box_adderName">' + v['name'] + '</p> <p class="box_addermsg">步骤' + (i + 1) + '</p> </li>'
                                } else {
                                    html += '<li data-id="' + v['uid'] + '" class="zj_spr_num"> <em class="icon_personBtn icon_personBtn_msg"><i class="icon_personNext"></i></em> <em class="icon_adderBtn"></em> <p class="box_adderName">' + v['name'] + '</p> <p class="box_addermsg">步骤' + (i + 1) + '</p> </li>'
                                }

                            })
                        }


                        $(".zj_zcgbjd_spr_show").html(html);
                        $(".zj_zcgbjd_spr_show li:last-child").find('i').hide();
                    }else{
                        alert(data.msg);
                    }

                }
            });
            /*选择联系人*/
            $(".zj_jrd_gys_add_ul li").die().live("click",function(){
                var tel=$(this).data('contact_tel');
                $(".tanceng .zcj_jrd_gys_person_mobile").val(tel);
            });
            /*查看借入商品*/
            $.ajax({
                type: 'POST',
                url: SERVER_URL + "/borrow/look-borrow",
                data: {
                    token: token,
                    //company_id: company_id, //公司id
                    id: id  // id

                },
                dataType: "json",
                success: function (data) {
                    console.log('2000111222');
                    console.log(data);
                    console.log('2000111222');
                    if(data.code==0){
                        if(data['data'].length==0){
                            return true;
                        }
                        $(".zj_zcg_create_day_time").text(data['data']['create_time']);
                        $(".zj_zcg_bjr_uname_show").text(data['data']['xiadan_name']);
                        // $(".zj_zcg_quote_create_product_cost_total").val(data.data['unit_price_total']);
                        // $(".zj_zcg_quote_create_tax_total").val(data.data['tax_total']);
                        // $(".zj_zcgbjd_quote_create_other_fee").val(data.data['other_costs']);
                        // $(".zj_zcgbjd_create_cost_tax_total").text(data.data['all_money']);
                        $(".zj_jrd_show_reark_info").val(data.data['note']);//备注
                        if(data['data']['goods']){
                            var goods='';
                            $.each(data['data']['goods'],function(i,v){
                                $.each(v,function(i2,v2){
                                    goods+='<tr>\
                            <td><input type="checkbox" data-id="'+v2['id']+'" data-good_id="'+v2['good_id']+'" data-good_unit="'+v2['good_unit']+'" data-good_num="'+v2['good_num']+'" data-good_rate="'+v2['good_rate']+'"></td>\
                            <td>'+likNullData(v2['good_sn'])+'</td>\
                            <td>'+likNullData(v2['good_name'])+'</td>\
                            <td>'+likNullData(v2['good_attr'])+'</td>\
                            <td>'+likNullData(v2['good_num'])+''+v2['good_unit']+'</td>\
                            <td>'+likNullData(v2['good_price'])+'</td>\
                            <td>'+likNullData(v2['good_rate_price'])+'</td>\
                            <td>'+likNullData(v2['good_total'])+'</td>\
                            </tr>'
                                })

                            })
                            $(".tanceng .zj_select_cgbjd_goods_content_tbody").html(goods);
                            var complete='';
                            if(data['data']['setting']){
                                $.each(data['data']['setting'],function(i,arr){
                                    var setting='';
                                    if(arr['good_list']){
                                        $.each(arr['good_list'],function(i2,v2){
                                            var setting_goods=''
                                            if(v2['attr_list']){
                                                $.each(v2['attr_list'],function(i3,v3){
                                                    setting_goods+='<tr>\
                                                <td><input type="checkbox" disabled="disabled" data-id="'+v3['id']+'" data-sing_num="'+v3['sing_num']+'" data-return_num="'+v3['return_num']+'" data-good_id="'+v3['good_id']+'" data-good_rate="'+v3['good_rate']+'" data-good_unit="'+v3['good_unit']+'"></td>\
                                                <td>'+likNullData(v3['good_sn'])+'</td>\
                                                <td>'+likNullData(v3['good_attr'])+'</td>\
                                                <td>'+likNullData(v3['sing_num'])+''+v3['good_unit']+'</td>\
                                                <td>'+likNullData(v3['good_price'])+' </td>\
                                                <td>'+likNullData(v3['good_rate_price'])+' </td>\
                                                <td>'+likNullData(v3['good_total'])+' </td>\
                                                </tr>'
                                                })
                                            }

                                            setting+='<table class="xs_bjd_table_1">\
                                <thead>\
                                <tr style="background: #fff;">\
                                <th class="c_3" style="font-weight: 100;" data-sum_num="'+v2['sum_num']+'">'+likNullData(v2['title'])+'</th>\
                                <th></th>\
                                <th></th>\
                                </tr>\
                                <tr>\
                                    <th width="32">选择</th>\
                                    <th width="140">编号</th>\
                                    <th width="435">属性</th>\
                                    <th width="88">数量</th>\
                                    <th width="88">单价</th>\
                                    <th width="88">含税价</th>\
                                    <th width="88">总价</th>\
                                </tr>\
                                </thead>\
                                <tbody>'+setting_goods+'\
                                </tbody>\
                            </table>'
                                        })
                                    }

                                    complete+='<div class="xs_div_2" style="border-bottom: 1px solid #e6e6e6;">\
                           <div class="div_1 container">\
                            <table class="xs_bjd_table">\
                            <thead>\
                            <tr>\
                            <th width="32">选择</th>\
                            <th width="140">编号</th>\
                            <th width="100">名称</th>\
                            <th width="375">属性</th>\
                            <th width="65">数量</th>\
                            <th width="88">单价</th>\
                            <th width="88">含税价</th>\
                            <th width="88">总价</th>\
                            <th width="60">操作</th>\
                            </tr>\
                            </thead>\
                            <tbody>\
                                <tr class="c_3 c_3 xs_bjd_bold">\
                                    <td><input type="checkbox" data-id="'+arr['id']+'" data-goods_id="'+arr['goods_id']+'" data-num="'+arr['num']+'" data-good_unit="'+arr['good_unit']+'" data-containing_rate="'+arr['containing_rate']+'"></td>\
                                    <td>'+likNullData(arr['good_sn'])+'</td>\
                                    <td>'+likNullData(arr['good_name'])+'</td>\
                                    <td>'+likNullData(arr['good_attr'])+'</td>\
                                    <td>'+likNullData(arr['num'])+''+arr['good_unit']+'</td>\
                                    <td>'+likNullData(arr['price'])+'</td>\
                                    <td>'+likNullData(arr['containing_money'])+'</td>\
                                    <td>'+likNullData(arr['total_money'])+'</td>\
                                    <td><button class="but_mix box_open_btn_3 but_blue_1">展开</button></td>\
                                </tr>\
                            </tbody>\
                            </table>\
                            </div>\
                            </div>\
                            <div class="xs_xsbjd_table_t2 none" style="padding: 10px;border-bottom: 2px solid #e6e6e6;">\
                            <div class="box_open_list goods_tc_toggle">'+setting+'</div>\
                            </div>'

                                })
                            }

                            $(".tanceng .zj_cgbjd_zj_goods_content_show").html(complete);
                        }
                    }

                }
            });
            /*勾选普通商品*/
            // var z_price=0;
            // var zj_price=0
            $(".tanceng .zj_select_cgbjd_goods_content_tbody input").die().live("click",function(){
                //var goods_price=0

                if($(this).is(':checked')){
                    /*单价*/
                    var z_price=parseFloat($(this).parents('tr').find('td').eq(5).text());
                    var p_down=parseFloat($(".tanceng .zj_zcg_quote_create_product_cost_total").val());
                    var goods_price=parseFloat(p_down+z_price);
                    $(".tanceng .zj_zcg_quote_create_product_cost_total").val(goods_price);
                    /*税率*/
                    if($(".tanceng .zj_zcgbjd_tex_val").val()=='含税17%'){
                        var tax_x=parseFloat(goods_price*0.17)
                                $(".tanceng .zj_zcg_quote_create_tax_total").val(tax_x.toFixed(2));
                    }else{
                        $(".zj_zcg_quote_create_tax_total").val(0);
                    }
                    /*总额*/
                    var tax_ze=$(".tanceng .zj_zcg_quote_create_tax_total").val();//税额
                    var qt_znump=$(".tanceng .zj_zcgbjd_quote_create_other_fee").val();//其他
                    var zsum_price=goods_price+parseFloat(tax_ze)+parseFloat(qt_znump);
                    $(".zj_zcgbjd_create_cost_tax_total").text(zsum_price.toFixed(2));

                }else{
                    /*单价*/
                    var d_num=parseFloat($(".tanceng .zj_zcg_quote_create_product_cost_total").val());
                    var p_num=parseFloat($(this).parents('tr').find('td').eq(5).text());
                    var znum_price=parseFloat(d_num-p_num)
                    $(".tanceng .zj_zcg_quote_create_product_cost_total").val(znum_price);
                    /*税率*/
                    if($(".tanceng .zj_zcgbjd_tex_val").val()=='含税17%'){
                        var tax=parseFloat(znum_price*0.17)
                        $(".zj_zcg_quote_create_tax_total").val(tax.toFixed(2));
                    }else{
                        $(".zj_zcg_quote_create_tax_total").val(0);
                    }
                    /*总额*/
                    var tax_ze1=$(".tanceng .zj_zcg_quote_create_tax_total").val();//税额
                    var qt_znum=$(".tanceng .zj_zcgbjd_quote_create_other_fee").val();//其他
                    var zsum_price1=znum_price+parseFloat(tax_ze1)+parseFloat(qt_znum);
                    $(".tanceng .zj_zcgbjd_create_cost_tax_total").text(zsum_price1.toFixed(2));
                }

            });
       //整机商品父级勾选

            $('.tanceng .zj_cgbjd_zj_goods_content_show .xs_div_2 input').die('click').live('click', function () {

                if ($(this).is(':checked')) {
                    /*单价*/
                   var zj_price=parseFloat($(this).parents('tr').find('td').eq(5).text());
                   var d_price=parseFloat($(".tanceng .zj_zcg_quote_create_product_cost_total").val());
                    var goods_price=parseFloat(d_price+zj_price);
                    $(".tanceng .zj_zcg_quote_create_product_cost_total").val(goods_price);
                    /*税率*/
                    if($(".tanceng .zj_zcgbjd_tex_val").val()=='含税17%'){
                        var tax=parseFloat(goods_price*0.17)
                        $(".zj_zcg_quote_create_tax_total").val(tax.toFixed(2));
                    }else{
                        $(".zj_zcg_quote_create_tax_total").val(0);
                    }

                    /*总额*/
                    var tax_ze1=$(".tanceng .zj_zcg_quote_create_tax_total").val();//税额
                    var qt_znumz=$(".tanceng .zj_zcgbjd_quote_create_other_fee").val();//其他
                    var zsum_price=goods_price+parseFloat(tax_ze1)+parseFloat(qt_znumz);
                    $(".tanceng .zj_zcgbjd_create_cost_tax_total").text(zsum_price.toFixed(2));
                    $(this).parents('.xs_div_2').next('.xs_xsbjd_table_t2').find('input').attr('checked', true);
                } else {
                    $(this).parents('.xs_div_2').next('.xs_xsbjd_table_t2').find('input').attr('checked', false);
                    //$(this).closest('.takenote_setting_list_one').find('input').val(0);
                    var num1=parseFloat($(".tanceng .zj_zcg_quote_create_product_cost_total").val());
                    var d_num1=parseFloat($(this).parents('tr').find('td').eq(5).text());
                    var set_price=parseFloat(num1-d_num1);
                    $(".tanceng .zj_zcg_quote_create_product_cost_total").val(set_price.toFixed(2));
                    /*税率*/
                    if($(".tanceng .zj_zcgbjd_tex_val").val()=='含税17%'){
                        var tax1=parseFloat(set_price*0.17)
                        $(".tanceng .zj_zcg_quote_create_tax_total").val(tax1.toFixed(2));
                    }else{
                        $(".tanceng .zj_zcg_quote_create_tax_total").val(0);
                    }
                    /*总额*/
                    var tax_z=$(".tanceng .zj_zcg_quote_create_tax_total").val();//税额
                    var qt_znumc=$(".tanceng .zj_zcgbjd_quote_create_other_fee").val();//其他
                    var zsum_p=set_price+parseFloat(tax_z)+parseFloat(qt_znumc);
                    $(".tanceng .zj_zcgbjd_create_cost_tax_total").text(zsum_p.toFixed(2));
                }
            });
            /*其他事件*/
            $(".tanceng .zj_zcgbjd_quote_create_other_fee").die().live("keyup",function(){
                /*总额*/
                var dj_ze=$(".zj_zcg_quote_create_product_cost_total").val();
                var dj_se=$(".zj_zcg_quote_create_tax_total").val();//税额
                var qt_znumc=$(this).val();//其他
                var zsum_price=parseFloat(dj_ze)+parseFloat(dj_se)+parseFloat(qt_znumc);
                $(".tanceng .zj_zcgbjd_create_cost_tax_total").text(zsum_price.toFixed(2));
            });
            /*转采购报价单提交*/
            $(".tanceng .zj_zcgbjd_quote_create_submit").die().live("click",function () {
                var _this=this;
                cgbjd_data.code_sn=$('.zj_z_cgbjd_num').val();
                cgbjd_data.borrow_id=id;
                cgbjd_data.borrow_code_sn=$(".zj_z_cgbjd_gl_jrd").val();
                cgbjd_data.supplier_id=supplier_id;
                cgbjd_data.supplier_name=supplier_name;
                if($(".tanceng .zj_zcgbjd_tex_val").val()=='含税17%'){
                    cgbjd_data.tax_rate=1;
                }else{
                    cgbjd_data.tax_rate=0;
                }

                /*审批人*/
                var copy_flow=[];
                $(".tanceng .zj_zcgbjd_spr_show .zj_spr_num").each(function(){
                    copy_flow.push($(this).data('id'));
                })
                cgbjd_data.flow=copy_flow.toString();
                cgbjd_data.note=$(".tanceng .zj_jrd_show_reark_info").val();
                // var state=2;
                // $(".zj_jrd_is_check_state input").each(function () {
                //     if($(this).is(':checked')){
                //         state=$(this).data('id');
                //     }
                // })
                cgbjd_data.quote_id=0;
                // cgbjd_data.is_freight= state;
                // cgbjd_data.contactor=$('.zj_jrd_gys_person_info_val').val();
                // cgbjd_data.tel=$(".zcj_jrd_gys_person_mobile").val();
                // cgbjd_data.address=$(".zj_jrd_gys_address_info").val();
                // cgbjd_data.shipments_time=$(".zj_jrd_gys_fh_day").val();
                cgbjd_data.money_sum=$(".tanceng .zj_zcg_quote_create_product_cost_total").val();
                 cgbjd_data.tax_money_sum=$(".tanceng .zj_zcg_quote_create_tax_total").val();
                cgbjd_data.other_free=$(".tanceng .zj_zcgbjd_quote_create_other_fee ").val();
                cgbjd_data.totals=$(".tanceng .zj_zcgbjd_create_cost_tax_total").text();
                //$("")
                /*商品*/
                var jrgh_goods=[];
                var goods_info={};
                $(".tanceng .zj_select_cgbjd_goods_content_tbody tr input").each(function(i){
                    if($(this).is(':checked')){
                        jrgh_goods.push({
                            good_id:$(this).data('id'),
                            good_name:$(this).parents('tr').find('td').eq(2).text(),
                            good_sn:$(this).parents('tr').find('td').eq(1).text(),
                            good_attr: $(this).parents('tr').find('td').eq(3).text(),
                            good_unit:$(this).data('good_unit'),
                            good_num:$(this).data('good_num'),
                            good_price:$(this).parents('tr').find('td').eq(5).text(),
                            good_rate_price:$(this).parents('tr').find('td').eq(6).text(),
                            good_total:$(this).parents('tr').find('td').eq(7).text()
                        })
                    }
                })
                goods_info.goods=jrgh_goods;
                //goods_info.sum_total=$(".zj_goods_hj_znum").text();
                goods_info.sum_total = $('.tanceng .zj_goods_hj_znum').html();// 普通商品总价额
                var jrgh_goods_info=JSON.stringify(goods_info);
                cgbjd_data.goods=jrgh_goods_info;

                /*整机商品*/
                var zj_goods=[];
                var Setting_goods={};
                $(".tanceng .zj_cgbjd_zj_goods_content_show .xs_div_2 tbody input:checkbox").each(function (i) {
                    var match_goods=[];
                    if($(this).is(':checked')){
                    $(".tanceng .zj_cgbjd_zj_goods_content_show .xs_xsbjd_table_t2").eq(i).find('thead').each(function(i2){
                        var pz_goods=[];
                        $(".tanceng .zj_cgbjd_zj_goods_content_show .xs_xsbjd_table_t2 table tbody").eq(i2).find('input:checkbox').each(function (i3) {

                                pz_goods.push({
                                    good_id: $(this).data('id'),
                                    good_sn: $(this).parents('tr').find('td').eq(1).text(),
                                    good_attr: $(this).parents('tr').find('td').eq(2).text(),
                                    sing_num: $(this).data('sing_num'),
                                    total_num: $(this).data('return_num'),
                                    good_price: $(this).parents('tr').find('td').eq(4).text(),
                                    good_rate: $(this).data('good_rate'),
                                    good_rate_price: $(this).parents('tr').find('td').eq(5).text(),
                                    good_total: $(this).parents('tr').find('td').eq(6).text()
                                })

                        })

                            match_goods.push({
                                title:$(this).find('th').eq(0).text(),
                                attr_list:pz_goods
                            })



                    })

                        zj_goods.push({
                            setting_id:$(this).data('id'),
                            setting_name:$(this).parents('tr').find('td').eq(2).text(),
                            setting_sn:$(this).parents('tr').find('td').eq(1).text(),
                            setting_unit:$(this).data('good_unit'),
                            setting_attr:$(this).parents('tr').find('td').eq(3).text(),
                            setting_num:$(this).data('num'),
                            setting_price:$(this).parents('tr').find('td').eq(5).text(),
                            setting_rate:$(this).data('containing_rate'),
                            setting_rate_price:$(this).parents('tr').find('td').eq(6).text(),
                            setting_total:$(this).parents('tr').find('td').eq(7).text(),
                            good_list:match_goods
                        })
                    }
                })


                // cgbjd_data.goods=jrgh_goods_info;
                // cgbjd_data.setting=jrgh_goods_zj;
                Setting_goods.setting=zj_goods;
                Setting_goods.sum_total=$(".tanceng .zj_hj_zj_money").text();
                var jrgh_goods_zj=JSON.stringify(Setting_goods);
                cgbjd_data.setting=jrgh_goods_zj;
                /*转商品数量*/
                var goods_sum=0;
                $(".tanceng .zj_select_cgbjd_goods_content_tbody input").each(function(){
                    if($(this).is(":checked")){
                        goods_sum+=parseFloat($(this).data('good_num'));
                    }

                })
                /*转整机数量*/
                var zj_sum=0;
                $(".tanceng .zj_cgbjd_zj_goods_content_show .xs_div_2 tbody input").each(function(){
                    if($(this).is(":checked")){
                        zj_sum+=parseFloat($(this).data('num'));
                    }

                })
                $.ajax({
                    type: 'post',
                    url: SERVER_URL + "/buy-quote/add",
                    data: cgbjd_data,
                    dataType: "json",
                    success: function (data) {
                        console.log('300');
                        console.log(data);
                        console.log('300');
                        if(data.code==0){
                            $(_this).parents('.dialog_content_middle5').find('.dialog_close').click();
                            $.ajax({
                                type: 'post',
                                url: SERVER_URL + "/borrow/to-purchase",
                                data: {
                                    token: token,
                                    id:id,
                                    good_lend_num:goods_sum,
                                    computer_lend_num:zj_sum
                                },
                                dataType: "json",
                                success: function (data) {
                                    console.log('300');
                                    console.log(data);
                                    console.log('300');
                                    if(data.code==0){
                                         $(z_cg).parents('.dialog_content_middle5').find('.dialog_close').click();
                                    }
                                }
                            })
                        }
                    }
                })
            });

        });
    });

    $("#zj_jb_info_table_name").trigger('click');


    /*借入归还单详情*/
    $("#zj_jrgh_info_table_name").die().live('click',function(){
        $.ajax({
            type: 'GET',
            url: SERVER_URL + "/borrow-out/list",
            data: {
                token: token,
                //company_id: company_id, //公司id
                borrow_id: check_id// 用户id

            },
            dataType: "json",
            success: function (data) {
                console.log('借入归还');
                console.log(data);
                console.log('借入归还');
                $(".zj_jrgh_list_sum_num").html('('+data['totalcount']+')');
                var html=''
                $.each(data['dataList'],function(index,gh_list){
                    var logistics='';
                    if(gh_list['logistics_way']==1){
                        logistics='快递';
                    }else if(gh_list['logistics_way']==2){
                        logistics='陆运';
                    }else if(gh_list['logistics_way']==3){
                        logistics='空运';
                    }else if(gh_list['logistics_way']==4){
                        logistics='平邮';
                    }else if(gh_list['logistics_way']==5){
                        logistics='海运';
                    }
                    html+='<div class="takenote_jrd_jcgh">\
                        <div class="d-r-t-h sbar">\
                        <h3 class="cont_title">基本信息</h3>\
                        <p class="l-s-x">借入归还单编号：<span>'+gh_list['code_sn']+'</span></p>\
                        <p class="l-s-x">借入单编号：<span>'+gh_list['borrow_code_sn']+'</span></p>\
                        <p class="l-s-x">供应商：<span>'+gh_list['supplier_name']+'</span></p>\
                        </div>\
                        <div class="d-r-t-h sbar">\
                            <h3 class="cont_title">出库信息</h3>\
                            <p class="l-s-x">发货时间：<span>'+gh_list['shipments_time']+'</span></p>\
                        <p class="l-s-x">物流方式：<span>'+logistics+'</span></p>\
                        <p class="l-s-x">承担运费：<span>'+(gh_list['is_freight']==1 ? '不包' : '包运费')+'</span></p>\
                        <p class="l-s-x">供应商联系人：<span>'+gh_list['contactor']+'</span></p>\
                        <p class="l-s-x">联系电话：<span class="">'+gh_list['tel']+'</span></p>\
                        <p class="l-s-x">收货地址：<span class="">'+gh_list['address']+'</span></p>\
                        </div>\
                        <div class="d-r-t-h sbar">\
                        <h3 class="cont_title">借入归还商品</h3>\
                        <p class="l-s-x"><span style="margin-left: -5px;"><button class="but_blue but_small val_dialog zj_jrd_check_jrgh_btn" data-id="'+gh_list['id']+'" name="takenote_jrd_jrgh_jbxxxq">查看借入归还单</button></span></p>\
                        </div>\
                        </div>';
                })
                $(".zj_jrd_jrghd_info_show_content").html(html);

            }
        })

    });
    /*查看借入归还单btn*/
    $(".zj_jrd_check_jrgh_btn").die().live("click",function () {
        var jrghd_id=$(this).data('id');
        if(jrghd_id>0){
            $.ajax({
                type: 'GET',
                url: SERVER_URL + "/borrow-out/infobyid",
                data: {
                    token: token,
                    //company_id: company_id, //公司id
                    id: jrghd_id,
                    detail:1// 用户id
                },
                dataType: "json",
                success: function (data) {
                    console.log('我发起查看归还单');
                    console.log(data);
                    console.log('20001110000000000000000');
                    $(".zj_check_jrgh_gs_name_show").text(likNullData(data['data']['supplier_name']));
                    $(".zj_jrgh_quote_look_create_at").text(likNullData(subTime(data['data']['create_time'])))
                    $(".zj_jrgh_quote_look_uname").text(likNullData(data['data']['user_name']))
                    $(".zj_jrgh_check_info_xq_box .zj_jrgh_con").eq(0).text(data['data']['code_sn']);
                    $(".zj_jrgh_check_info_xq_box .zj_jrgh_con").eq(1).text(data['data']['borrow_code_sn']);
                    $(".zj_jrgh_check_info_xq_box .zj_jrgh_con").eq(2).text(data['data']['supplier_name']);
                    $(".zj_jrgh_check_info_xq_box .zj_jrgh_con").eq(3).text(data['data']['shipments_time']);

                    if(data['data']['logistics_way']==1){
                        $(".zj_jrgh_check_info_xq_box .zj_jrgh_con").eq(4).text('快递');

                    }else if(data['data']['logistics_way']==2){
                        $(".zj_jrgh_check_info_xq_box .zj_jrgh_con").eq(4).text('陆运');

                    }else if(data['data']['logistics_way']==3){
                        $(".zj_jrgh_check_info_xq_box .zj_jrgh_con").eq(4).text('空运');

                    }else if(data['data']['logistics_way']==4){
                        $(".zj_jrgh_check_info_xq_box .zj_jrgh_con").eq(4).text('平邮');

                    }else if(data['data']['logistics_way']==5){
                        $(".zj_jrgh_check_info_xq_box .zj_jrgh_con").eq(4).text('海运');

                    }
                    //$(".zj_jrgh_check_info_xq_box .zj_jrgh_con").eq(5).text(data['data']['is_freight']);
                    if(data['data']['is_freight']==1){
                        $(".zj_jrgh_check_info_xq_box .zj_jrgh_con").eq(5).text('不包');
                    }else if(data['data']['logistics_way']==2){
                        $(".zj_jrgh_check_info_xq_box .zj_jrgh_con").eq(5).text('包运费');
                    }
                    $(".zj_jrgh_check_info_xq_box .zj_jrgh_con").eq(6).text(data['data']['contactor']);
                    $(".zj_jrgh_check_info_xq_box .zj_jrgh_con").eq(7).text(data['data']['tel']);
                    $(".zj_jrgh_check_info_xq_box .zj_jrgh_con").eq(8).text(data['data']['address']);
                    //$(".zj_jrd_cgbjd_jb_info_check p span").eq(8).text(data['data']['code_sn'])
                    // $(".zj_cgbjd_check_bjd_xq").data('id',data['data']['id']);
                    /* if(data['data']['goods']['sum_total']){
                     $(".tanceng .zj_goods_zprice .zj_goods_hj_znum").text(data['data']['goods']['sum_total']);
                     }
                     if(data['data']['setting']['sum_total']){
                     $(".xs_bjd_table_3 .zj_hj_zj_money").text(data['data']['setting']['sum_total']);
                     }*/


                    /*ff*/
                    // $(".zj_dj_hj_price_num").text(data['data']['unit_price_total']);
                    // $(".zj_hs_hj_zprice_number").text(data['data']['tax_total']);
                    // $(".zj_other_price_num").text(data['data']['other_costs']);
                    // $(".zj_znum_zj_m_price").text(data['data']['all_money']);


                    var html='';
                    $.each(data['data']['goods'],function(i,v){

                        html+='<tr>\
                            <td>'+likNullData(v['code_sn'])+'</td>\
                            <td>'+likNullData(v['product_name'])+'</td>\
                            <td>'+likNullData(v['attr_name'])+'</td>\
                            <td>'+likNullData(v['num'])+'</td>\
                            <td>'+likNullData(v['return_num'])+'</td>\
                            <td></td>\
                            </tr>'

                    })
                    $(".zj_jrgh_check_content_goods").html(html);
                    /*整机商品*/

                    var complete='';
                    $.each(data['data']['setting'],function(i,arr){
                        var setting='';
                        if(arr['pieceList']){
                            $.each(arr['pieceList'],function(i2,v2){
                                var setting_goods=''
                                if(v2['list']){
                                    $.each(v2['list'],function(i3,v3){
                                        setting_goods+='<tr>\
                                                <td>'+likNullData(v3['code_sn'])+'</td>\
                                                <td>'+likNullData(v3['attr_name'])+'</td>\
                                                <td>'+likNullData(v3['num'])+'</td>\
                                                <td>'+likNullData(v3['return_num'])+'</td>\
                                                <td></td>\
                                                </tr>'
                                    })
                                }

                                setting+='<table class="xs_bjd_table_1">\
                                <thead>\
                                <tr style="background: #fff;">\
                                <th class="c_3" style="font-weight: 100;">'+likNullData(v2['cate_name'])+'</th>\
                                <th></th>\
                                <th></th>\
                                </tr>\
                                <tr>\
                                <th width="140">编号</th>\
                                <th width="360">属性</th>\
                                <th width="70">借入数量</th>\
                                <th width="70">归还数量</th>\
                                <th width="60"></th>\
                                </tr>\
                                </thead>\
                                <tbody>'+setting_goods+'\
                                </tbody>\
                            </table>'
                            })
                        }

                        complete+='<div class="xs_div_2" style="margin-top: 20px;">\
                            <table class="xs_bjd_table">\
                            <thead>\
                            <tr>\
                            <th width="140">编号</th>\
                            <th width="120">名称</th>\
                            <th width="240">属性</th>\
                            <th width="70">借入数量</th>\
                            <th width="70">归还数量</th>\
                            <th width="60">配件</th>\
                            </tr>\
                            </thead>\
                            <tbody>\
                                <tr class="c_3 c_3 xs_bjd_bold">\
                                    <td>'+likNullData(arr['code_sn'])+'</td>\
                                    <td>'+likNullData(arr['product_name'])+'</td>\
                                    <td>'+likNullData(arr['attr_name'])+'</td>\
                                    <td>'+likNullData(arr['num'])+''+arr['unit_name']+'</td>\
                                    <td>'+likNullData(arr['return_num'])+'</td>\
                                    <td><button class="but_mix box_open_btn_1 but_blue_1">展开</button></td>\
                                </tr>\
                            </tbody>\
                            </table>\
                            </div>\
                            <div class="xs_tc_goods_box goods_tc_toggle" style="display: none;">'+setting+'</div>'

                    })


                    $(".tanceng .zj_complate_goods_content_show_info").html(complete);
                    // var sum_price=0;
                    // $(".tanceng .zj_complate_goods_content_show_info .zj_pz_sum_price").each(function(){
                    //     sum_price+=parseFloat($(this).text());
                    // })
                    // $(".tanceng .zj_hj_zj_money").text(sum_price)
                }
            })
        }

    });


    /*采购报价单*/
    $("#zj_cgbjd_info_table_name").die().live("click",function(){

        $.ajax({
            type: 'post',
            url: SERVER_URL + "/borrow/purchase",
            data: {
                token: token,
                //company_id: company_id, //公司id
                id: check_id// 用户id
            },
            dataType: "json",
            success: function (data) {
                console.log('采购报价单');
                console.log(data);
                console.log('采购报价单');
                $(".zj_cgbjd_list_sum_num").html('('+data['data'].length+')')
                var cg_list='';
                $.each(data['data'],function(i,vlist){
                    var rete=''
                    if(vlist['tax_rate']==1){
                        rete='17%';
                    }else{
                        rete='无税'
                    }
                    var goods_lx=''
                    if(vlist['goods_type']==1){
                        goods_lx='普通商品'
                    }else if(vlist['goods_type']==2){
                        goods_lx='套餐商品'
                    }else if(vlist['goods_type']==3){
                        goods_lx='配置商品'
                    }
                    cg_list+='<div class="takenote_jrd_jcgh">\
                        <div class="d-r-t-h sbar">\
                        <h3 class="cont_title">基本信息</h3>\
                        <p class="l-s-x">报价单编号：<span>'+vlist['code_sn']+'</span></p>\
                        <p class="l-s-x">关联合同：<span>'+vlist['purchase_sn']+'</span></p>\
                        <p class="l-s-x">关联采购订单：<span>'+vlist['order_sn']+'</span></p>\
                        <p class="l-s-x">关联借入单：<span>'+vlist['borrow_sn']+'</span></p>\
                        <p class="l-s-x">供应商名称：<span>'+vlist['supplier_name']+'</span></p>\
                        <p class="l-s-x">采购商品类型：<span>'+vlist['goods_type']+'</span></p>\
                        <p class="l-s-x">税率：<span>'+rete+'</span></p>\
                        <p class="l-s-x">总金额（元）：<span>'+vlist['totals']+'</span></p>\
                        <p class="l-s-x" style="margin-bottom: 30px;"><span style="margin-left: -5px;"><button data-id="'+vlist['id']+'" class="but_blue but_small val_dialog zj_cgbjd_check_bjd_xq" name="cg_cgthh_xq_hh">查看报价单</button></span></p>\
                        </div>\
                        </div>';
                })
                $(".zj_jrd_cgbjd_info_content").html(cg_list)

            }
        })
        $(".zj_cgbjd_check_bjd_xq").die().live("click",function () {
            var cgid=$(this).data('id');
            $.ajax({
                type: 'get',
                url: SERVER_URL + "/buy-quote/detail",
                data: {
                    token: token,
                    //company_id: company_id, //公司id
                    buy_quote_id: cgid // 用户id
                },
                dataType: "json",
                success: function (data) {
                    console.log('查看报价单1');
                    console.log(data);
                    console.log('查看报价单1');
                    if(data.code==0){
                        if(data['data'].length==0){
                            return true;
                        }
                        $(".zj_check_gs_name_show").text(likNullData(data['data']['supplier_name']))
                        $(".zj_sell_quote_look_create_at").text(likNullData(data['data']['created_at']));
                        $(".zj_sell_quote_look_uname").text(likNullData(data['data']['current_name']));
                        $(".zj_bjd_header_info_dv_show .zj_head").eq(0).text(likNullData(data['data']['code_sn']));
                        $(".zj_bjd_header_info_dv_show .zj_head").eq(1).text(likNullData(data['data']['supplier_name']));
                        // $(".zj_bjd_header_info_dv_show .zj_head").eq(2).text(likNullData(data['data']['dept_name']));
                        // $(".zj_bjd_header_info_dv_show .zj_head").eq(3).text(likNullData(data['data']['owner_name']));



                        /*ff*/
                        $(".zj_cgbjd_hj_price_num").text(likNullData(data['data']['money_sum']));
                        $(".zj_cgbjd_hj_zprice_number").text(likNullData(data['data']['tax_money_sum']));
                        $(".zj_cgbjd_other_price_num").text(likNullData(data['data']['other_free']));
                        $(".zj_cgbjd_znum_zj_m_price").text(likNullData(data['data']['totals']));

                        /*普通商品*/
                        if(data['data']['product_json']['goods']){
                            $(".zj_pt_goods_znum_sl").text(data['data']['product_json']['goods']['sum_total']);
                        }

                        /*整机商品总价*/
                        if(data['data']['product_json']['setting']){
                            $(".zj_check_info_hj_price").text(data['data']['product_json']['setting']['sum_total']);
                        }

                        var html='';
                        if(data['data']['product_json']['goods']){
                            if(data['data']['product_json']['goods'].length=='undefined'){
                                return true;

                            }
                            $.each(data['data']['product_json']['goods']['goods'],function(i,v){

                                html+='<tr>\
                            <td>'+repair(i+1)+'</td>\
                            <td>'+likNullData(v['good_sn'])+'</td>\
                            <td>'+likNullData(v['good_name'])+'</td>\
                            <td>'+likNullData(v['good_attr'])+'</td>\
                            <td>'+likNullData(v['good_num'])+''+v['good_unit']+'</td>\
                            <td>'+likNullData(v['good_price'])+'</td>\
                            <td>'+likNullData(v['good_rate_price'])+'</td>\
                            <td>'+likNullData(v['good_total'])+'</td>\
                            </tr>'

                            })
                            $(".zj_cgbjd_xq_goods_info").html(html);
                        }


                        /*整机商品*/

                        var complete='';
                        if(data['data']['product_json']['setting']){
                            if(data['data']['product_json']['setting'].length=='undefined'){
                                return true;
                            }
                            $.each(data['data']['product_json']['setting']['setting'],function(i,arr){
                                var setting='';
                                if(arr['good_list']){
                                    $.each(arr['good_list'],function(i2,v2){
                                        var setting_goods=''
                                        if(v2['attr_list']){
                                            $.each(v2['attr_list'],function(i3,v3){
                                                setting_goods+='<tr>\
                                                <td>'+likNullData(v3['good_sn'])+'</td>\
                                                <td>'+likNullData(v3['good_attr'])+'</td>\
                                                <td>'+likNullData(v3['total_num'])+''+v3['good_unit']+'</td>\
                                                <td>'+likNullData(v3['good_price'])+'</td>\
                                                <td>'+likNullData(v3['good_rate_price'])+'</td>\
                                                <td>'+likNullData(v3['good_total'])+'</td>\
                                                <td></td>\
                                                </tr>'
                                            })
                                        }

                                        setting+='<table class="xs_bjd_table_1">\
                                <thead>\
                                <tr style="background: #fff;">\
                                <th class="c_3" style="font-weight: 100;">'+likNullData(v2['title'])+'</th>\
                                <th></th>\
                                <th></th>\
                                </tr>\
                                <tr>\
                                <th width="90">编号</th>\
                                <th width="560">属性</th>\
                                <th width="50">数量</th>\
                                <th width="150">单价</th>\
                                <th width="90">含税价</th>\
                                <th width="90">总价</th>\
                                <th width="60"></th>\
                                </tr>\
                                </thead>\
                                <tbody>'+setting_goods+'\
                                </tbody>\
                            </table>'
                                    })
                                }

                                complete+='<div class="xs_div_2" style="margin-top: 20px;">\
                            <table class="xs_bjd_table">\
                            <thead>\
                            <tr>\
                            <th width="30">序号</th>\
                            <th width="90">编号</th>\
                            <th width="150">名称</th>\
                            <th width="325">属性</th>\
                            <th width="50">数量</th>\
                            <th width="150">单价</th>\
                            <th width="90">含税价</th>\
                            <th width="90">总价</th>\
                            <th width="60">配件</th>\
                            </tr>\
                            </thead>\
                            <tbody>\
                                <tr class="c_3 c_3 xs_bjd_bold">\
                                    <td>'+repair(i+1)+'</td>\
                                    <td>'+likNullData(arr['setting_sn'])+'</td>\
                                    <td>'+likNullData(arr['setting_name'])+'</td>\
                                    <td>'+likNullData(arr['setting_attr'])+'</td>\
                                    <td>'+likNullData(arr['setting_num'])+''+arr['setting_unit']+'</td>\
                                    <td>'+likNullData(arr['setting_price'])+'</td>\
                                    <td>'+likNullData(arr['setting_rate_price'])+'</td>\
                                    <td>'+likNullData(arr['setting_total'])+'</td>\
                                    <td><button class="but_mix box_open_btn_1 but_blue_1">展开</button></td>\
                                </tr>\
                            </tbody>\
                            </table>\
                            </div>\
                            <div class="xs_tc_goods_box goods_tc_toggle" style="display: none;">'+setting+'</div>'

                            })
                        }



                        $(".tanceng .zj_zj_goods_complete_info_div_nr").html(complete);
                    }


                }
            })
        });

    });
    /*报价单详情btn*/
    // $(".zj_cgbjd_check_bjd_xq").die().live("click",function(){
    //     var b_id=$(this).data('id');
    //     if(b_id>0){
    //         $.ajax({
    //             type: 'GET',
    //             url: SERVER_URL + "/borrow/buy-info",
    //             data: {
    //                 token: token,
    //                 //company_id: company_id, //公司id
    //                 id: b_id// 用户id
    //
    //             },
    //             dataType: "json",
    //             success: function (data) {
    //                 console.log('报价单详情');
    //                 console.log(data);
    //                 console.log('报价单详情');
    //                 $(".zj_cgbjd_xq_goods_info .zj_head").eq(0).text(data['data']['code_sn']);
    //                 $(".zj_cgbjd_xq_goods_info .zj_head").eq(1).text(data['data']['borrow_code_sn']);
    //                 $(".zj_cgbjd_xq_goods_info .zj_head").eq(2).text(data['data']['supplier_name']);
    //                 $(".zj_cgbjd_xq_goods_info .zj_head").eq(3).text(data['data']['shipments_time']);
    //
    //
    //                 //$(".zj_jrd_cgbjd_jb_info_check p span").eq(8).text(data['data']['code_sn'])
    //                 // $(".zj_cgbjd_check_bjd_xq").data('id',data['data']['id']);
    //                 /* if(data['data']['goods']['sum_total']){
    //                  $(".tanceng .zj_goods_zprice .zj_goods_hj_znum").text(data['data']['goods']['sum_total']);
    //                  }
    //                  if(data['data']['setting']['sum_total']){
    //                  $(".xs_bjd_table_3 .zj_hj_zj_money").text(data['data']['setting']['sum_total']);
    //                  }*/
    //
    //
    //                 /*ff*/
    //                 // $(".zj_dj_hj_price_num").text(data['data']['unit_price_total']);
    //                 // $(".zj_hs_hj_zprice_number").text(data['data']['tax_total']);
    //                 // $(".zj_other_price_num").text(data['data']['other_costs']);
    //                 // $(".zj_znum_zj_m_price").text(data['data']['all_money']);
    //
    //
    //                 var html='';
    //                 $.each(data['data']['goods'],function(i,v){
    //
    //                     html+='<tr>\
    //                         <td>'+likNullData(v['code_sn'])+'</td>\
    //                         <td>'+likNullData(v['product_name'])+'</td>\
    //                         <td>'+likNullData(v['attr_name'])+'</td>\
    //                         <td>'+likNullData(v['num'])+'</td>\
    //                         <td>'+likNullData(v['return_num'])+'</td>\
    //                         <td></td>\
    //                         </tr>'
    //
    //                 })
    //                 $(".zj_cgbjd_xq_goods_info").html(html);
    //                 /*整机商品*/
    //
    //                 var complete='';
    //                 $.each(data['data']['product_json'],function(i,arr){
    //                     var setting='';
    //                     if(arr['pieceList']){
    //                         $.each(arr['pieceList'],function(i2,v2){
    //                             var setting_goods=''
    //                             if(v2['list']){
    //                                 $.each(v2['list'],function(i3,v3){
    //                                     setting_goods+='<tr>\
    //                                             <td>'+likNullData(v3['code_sn'])+'</td>\
    //                                             <td>'+likNullData(v3['attr_name'])+'</td>\
    //                                             <td>'+likNullData(v3['num'])+'</td>\
    //                                             <td>'+likNullData(v3['return_num'])+'</td>\
    //                                             <td></td>\
    //                                             </tr>'
    //                                 })
    //                             }
    //
    //                             setting+='<table class="xs_bjd_table_1">\
    //                             <thead>\
    //                             <tr style="background: #fff;">\
    //                             <th class="c_3" style="font-weight: 100;">'+likNullData(v2['cate_name'])+'</th>\
    //                             <th></th>\
    //                             <th></th>\
    //                             </tr>\
    //                             <tr>\
    //                             <th width="140">编号</th>\
    //                             <th width="360">属性</th>\
    //                             <th width="70">借入数量</th>\
    //                             <th width="70">归还数量</th>\
    //                             <th width="60"></th>\
    //                             </tr>\
    //                             </thead>\
    //                             <tbody>'+setting_goods+'\
    //                             </tbody>\
    //                         </table>'
    //                         })
    //                     }
    //
    //                     complete+='<div class="xs_div_2" style="margin-top: 20px;">\
    //                         <table class="xs_bjd_table">\
    //                         <thead>\
    //                         <tr>\
    //                         <th width="140">编号</th>\
    //                         <th width="120">名称</th>\
    //                         <th width="240">属性</th>\
    //                         <th width="70">借入数量</th>\
    //                         <th width="70">归还数量</th>\
    //                         <th width="60">配件</th>\
    //                         </tr>\
    //                         </thead>\
    //                         <tbody>\
    //                             <tr class="c_3 c_3 xs_bjd_bold">\
    //                                 <td>'+likNullData(arr['code_sn'])+'</td>\
    //                                 <td>'+likNullData(arr['product_name'])+'</td>\
    //                                 <td>'+likNullData(arr['attr_name'])+'</td>\
    //                                 <td>'+likNullData(arr['num'])+''+likNullData(arr['unit_name'])+'</td>\
    //                                 <td>'+likNullData(arr['return_num'])+'</td>\
    //                                 <td><button class="but_mix box_open_btn_1 but_blue_1">展开</button></td>\
    //                             </tr>\
    //                         </tbody>\
    //                         </table>\
    //                         </div>\
    //                         <div class="xs_tc_goods_box goods_tc_toggle" style="display: none;">'+setting+'</div>'
    //
    //                 })
    //
    //
    //                 $(".tanceng .zj_zj_goods_complete_info_div_nr").html(complete);
    //
    //             },
    //             error:function(data){
    //                 alert("服务器错误，请稍后再试");
    //             }
    //         })
    //     }
    //
    // });
    /*入库单*/
    $("#zj_rkd_info_table_name").die().live("click",function(){
        $.ajax({
            type: 'GET',
            url: SERVER_URL + "/lend-out/stockininfo",
            data: {
                token: token,
                //company_id: company_id, //公司id
                related_receipts_no: code// 用户id

            },
            dataType: "json",
            success: function (data) {
                console.log('报价单详情');
                console.log(data);
                console.log('报价单详情');
                if(data['data']['input_status']==1){
                    $(".zj_rkd_bfrk_state").text('待入库');
                }else if(data['data']['input_status']==2){
                    $(".zj_rkd_bfrk_state").text('部分入库');
                }else if(data['data']['input_status']==3){
                    $(".zj_rkd_bfrk_state").text('完成入库');
                }
                if(data['data']['stockingInList']['input_num']){
                    $('.zj_sell_order_look_skjl_tbody_nodata_box').hide();
                    var rk_info='<tr class="table_total ven_sell_order_look_skjl_tbody_table_total">\
                    <td>'+data['data']['stockingInList']['input_num']+'</td>\
                    <td>'+data['data']['stockingInList']['distribution_num']+'</td>\
                    <td>'+data['data']['stockingInList']['set_num']+'</td>\
                    <td>'+data['data']['stockingInList']['set_distribution_num']+'</td>\
                    <td>'+data['data']['stockingInList']['document_marker']+'</td>\
                    <td>'+data['data']['stockingInList']['distribution_name']+'</td>\
                    </tr>'
                    $(".zj_goods_num_order_look_skjl_tbody").html(rk_info);
                }else {
                    $(".zj_goods_num_order_look_skjl_tbody").empty();
                    $('.zj_sell_order_look_skjl_tbody_nodata_box').show();
                }

                var kf_goods=''
                if(data['data']['stockInList'].length>0) {
                    $(".zj_no_order_look_skjl_tbody_nodata_box").hide();
                    $.each(data['data']['stockInList'], function (i, goods_info) {
                        kf_goods += '<tr class="table_total ven_sell_order_look_skjl_tbody_table_total">\
                    <td>' + repair(i + 1) + '</td>\
                    <td>' + goods_info['warehouse_name'] + '</td>\
                    <td>' + goods_info['input_num'] + '</td>\
                    <td>' + goods_info['distribution_num'] + '</td>\
                    <td>' + goods_info['set_distribution_num'] + '</td>\
                    <td>' + goods_info['set_num'] + '</td>\
                    <td>' + goods_info['break_num'] + '</td>\
                    <td>' + goods_info['input_status'] + '</td>\
                    <td>' + goods_info['input_name'] + '</td>\
                    </tr>'
                    })
                    $(".zj_jcd_order_look_skjl_tbody").html(kf_goods);
                }else{
                    $(".zj_jcd_order_look_skjl_tbody").empty();
                    $(".zj_no_order_look_skjl_tbody_nodata_box").show();
                }
                // var wl_list='';
                // $.each(data['data']['logisticsList'],function(){
                //     wl_list+=''
                // })
            },
            error:function(data){
                alert("服务器错误，请稍后再试");
            }
        })
    });

    /*更多*/
    /*借入归还*/
    $(".zj_check_jrgh_jrd_li_btn").die().live("click",function(){

         $(_this).parents('tr').find('.zj_jrd_jrgh_back_btn').click();
        borrow_list();
        //$(".zj_jrd_zcgbjd_end_btn").click();
    });
    /*作废*/
    $(".zj_check_jrd_zf_li_btn").die().live('click',function(){
        $(_this).parents('tr').find('.zj_jrd_zf_btn').click();
        borrow_list()
    });
    /*删除*/
    $(".zj_check_jrd_del_li_btn").die().live("click",function () {
        $(_this).parents('tr').find('.zj_jrd_gh_del_btn').click();
        borrow_list()
    });
});
/*删除*/
$(".zj_jrd_gh_del_btn").die().live("click",function(){
    var del_id=$(this).data('id');
  $(".zj_jrd_tc_end_del_btn").die().live("click",function(){
      var _this=this;
      $.ajax({
          type: 'POST',
          url: SERVER_URL + "/borrow/del",
          data: {
              token: token,
              //company_id: company_id, //公司id
              id: del_id  // 用户id

          },
          dataType: "json",
          success: function (data) {
              console.log('2000111');
              console.log(data);
              console.log('2000111');
              if(data.code==0){
                  $(_this).closest('.dialog_box').remove();
                  borrow_list();
              }else{
                  alert(data.msg);
              }

          },
          error: function (data) {

                alert('服务器错误，请稍后再试');
           }
      })
  });

});
/*作废*/
$(".zj_jrd_zf_btn").die().live("click",function(){
    var zf_id=$(this).data('id');
    $.ajax({
        type: 'POST',
        url: SERVER_URL + "/borrow/invalid",
        data: {
            token: token,
            //company_id: company_id, //公司id
            id: zf_id  // 用户id

        },
        dataType: "json",
        success: function (data) {
            console.log('2000111');
            console.log(data);
            console.log('2000111');
            if(data.code==0){
                //alert('已作废');
                borrow_list();
            }else{
                alert(data.msg);
            }


        }
    })
});
/*不显示已作废*/
$(".zj_jrd_no_zf_show_state").die().live("click",function(){
    if($(this).is(':checked')){
        borrow_jrd_data.is_invalid=1;
        borrow_jrd_data.page=1;
        borrow_list();
    }else{
        borrow_jrd_data.is_invalid=0;
        borrow_jrd_data.page=1;
        borrow_list();
    }
});
/*借入归还*/
$(".zj_jrd_jrgh_back_btn").die().live("click",function(){
    $('.tanceng .xs_shd_box_ul .headlist li').eq(0).css({'background':'#32a0f6','border-color':'#32a0f6','color':'#fff'});
    //定义推送出库信息参数
    var takenoteToOutStockData = {
        token: token,
        related_receipts_no: '', // 关联单据编号
        output_type: 4, // 出库类型 1销售 2采购退货/采购换货 3借出出库 4借入归还 5销售换货
        related_business_name: '', // 相关往来名称
        logistics_way: '', // 物流方式 1.快递 2.陆运 3.空运 4.平邮 5.海运
        document_marker: uid, // 制单人
        remark: '', // 备注
        product_info: '', // 商品明细
        is_package_freight: '', // 是否包运费 1 是 2 否
        consignee: '', // 收货人
        consignee_tel: '', // 收货人电话
        consignee_addr: '', // 收货人地址
        output_time: '', // 出库日期
        principal: uid // 负责人
    };
    /*借入归还参数*/
    var jrgh_list_data={
        token: token,
        code_sn:'', //借入归还单编号
        borrow_id:'',//借入单id
        borrow_code_sn:'',//借入单编号
        supplier_id:'',//供应商id
        logistics_way:'',//物流方式 1.快递 2.陆运 3.空运 4.平邮 5.海运
        copy_flow:'',//抄送人 格式：4,21,22
        remark:'',//备注
        is_freight:'',//是否包运费 1不包 2包运费
        contactor:'',//供应商联系人
        tel:'',//联系电话
        address:'',//收货地址
        shipments_time:'',//发货日期
        product_info:'',//商品明细
        supplier_name:''
    }
    var create_time=$(this).data('create_time');
    var name=$(this).data('name');
    $(".zj_jrgh_creat_time_show").text(create_time);
    $(".zj_jrgh_xdr_name_show").text(name);
    /*借入归还编号*/
    new_number('.zj_jrd_jrgh_bh_num_val','JRGH')
    var id=$(this).data('id');
        var code=$(this).data('code_sn');//借入单编号
        var supplier_name=$(this).data('supplier_name');//供应商id
        var supplier_id=$(this).data('supplier_id');//供应商名字
         $(".zj_select_jrd_num_bh_val").val(code);
        $(".zj_jrd_select_gys_name").val(supplier_name);
    $.ajax({
        type: 'GET',
        url: SERVER_URL + "/supplier/info",
        data: {
            token: token,
            //company_id: company_id, //公司id
            supplier_id: supplier_id  // 供应商id

        },
        dataType: "json",
        success: function (data) {
            console.log('20001');
            console.log(data);
            console.log('20001');
            if(data.code==0){
                //alert(data['data']['address']);
                // if(data['area_name']==null){
                //     return true;
                // }
                var info='';
                if(data['data']['contacts'].length>0){
                    $.each(data['data']['contacts'],function(i,v){
                        info+='<li data-contact_tel="'+v['contact_tel']+'" data-contact_person="'+v['contact_person']+'">'+v['contact_person']+'</li>'
                    })
                    $(".zj_jrd_gys_add_ul").html(info);
                    //$(".zj_jrd_gys_person_info_val").val(data['data']['contact_person'])

                }
                $(".zj_jrd_gys_address_info").val(data['data']['address']);
                var v_tel=$(".zj_jrd_gys_add_ul li").eq(0).data('contact_tel');
                var v_name=$(".zj_jrd_gys_add_ul li").eq(0).data('contact_person');
                $(".zj_jrd_gys_person_info_val").val(v_name);
                $(".zcj_jrd_gys_person_mobile").val(v_tel);
            }


        }
    })
    /*选择联系人*/
    $(".zj_jrd_gys_add_ul li").die().live("click",function(){
        var tel=$(this).data('contact_tel');
        $(".zcj_jrd_gys_person_mobile").val(tel);
    });
    /*查看借入商品*/
    $.ajax({
        type: 'POST',
        url: SERVER_URL + "/borrow/look-borrow",
        data: {
            token: token,
            //company_id: company_id, //公司id
            id: id  // id

        },
        dataType: "json",
        success: function (data) {
            console.log('2000111222');
            console.log(data);
            console.log('2000111222');
            if(data.code==0){
                if(data['data'].length==0){
                    return true;
                }
                if(data['data']['goods']){
                    var goods='';
                    $.each(data['data']['goods'],function(i,v){
                        $.each(v,function(i2,v2){
                            goods+='<tr>\
                            <td><input type="checkbox" data-id="'+v2['id']+'" data-good_id="'+v2['good_id']+'"></td>\
                            <td>'+likNullData(v2['good_sn'])+'</td>\
                            <td>'+likNullData(v2['good_name'])+'</td>\
                            <td>'+likNullData(v2['good_attr'])+'</td>\
                            <td data-good_num="'+v2['good_num']+'">'+likNullData(v2['good_num'])+''+v2['good_unit']+'</td>\
                            <td><div class="xs_num_input num_input inline_block num_input_new"><button class="but_grey_a but_opa_small inp_plus zj_sell_quote_productnum_change">+</button><input type="text" class="productnum" maxnum="' + (parseFloat(v2['good_num']) - parseFloat(v2['return_num'])) + '" value="' + (parseFloat(v2['good_num']) - parseFloat(v2['return_num'])) + '"><button class="but_grey_a but_opa_small radius_left_0 inp_reduce zj_sell_quote_productnum_change">-</button></div></td>\
                            </tr>'
                        })

                    })
                    $(".zj_select_jrgh_goods_content_tbody").html(goods);
                    var complete='';
                    if(data['data']['setting']){
                        $.each(data['data']['setting'],function(i,arr){
                            var setting='';
                            if(arr['good_list']){
                                $.each(arr['good_list'],function(i2,v2){
                                    var setting_goods=''
                                    if(v2['attr_list']){
                                        $.each(v2['attr_list'],function(i3,v3){
                                            setting_goods+='<tr>\
                                                <td><input type="checkbox" disabled="disabled" data-id="'+v3['id']+'" data-good_id="'+v3['good_id']+'"></td>\
                                                <td>'+likNullData(v3['good_sn'])+'</td>\
                                                <td>'+likNullData(v3['good_attr'])+'</td>\
                                                <td>'+likNullData(v3['sing_num'])+''+v3['good_unit']+'</td>\
                                                <td><div class="xs_num_input num_input inline_block num_input_new"><button class="but_grey_a but_opa_small inp_plus zj_sell_quote_productnum_change">+</button><input type="text" class="productnum" maxnum="' + (parseFloat(v3['sing_num']) - parseFloat(v3['return_num'])) + '" value="' + (parseFloat(v3['sing_num']) - parseFloat(v3['return_num'])) + '"><button class="but_grey_a but_opa_small radius_left_0 inp_plus zj_sell_quote_productnum_change">-</button></div></td>\
                                                <td></td>\
                                                </tr>'
                                        })
                                    }

                                    setting+='<table class="xs_bjd_table_1">\
                                <thead>\
                                <tr style="background: #fff;">\
                                <th class="c_3" style="font-weight: 100;">'+likNullData(v2['title'])+'</th>\
                                <th></th>\
                                <th></th>\
                                </tr>\
                                <tr>\
                                    <th width="32">选择</th>\
                                    <th width="140">编号</th>\
                                    <th width="480">属性</th>\
                                    <th width="65">借入数量</th>\
                                    <th width="88">归还数量</th>\
                                    <th width=""></th>\
                                </tr>\
                                </thead>\
                                <tbody>'+setting_goods+'\
                                </tbody>\
                            </table>'
                                })
                            }

                            complete+='<div class="xs_div_2" style="border-bottom: 1px solid #e6e6e6;">\
                           <div class="div_1 container">\
                            <table class="xs_bjd_table">\
                            <thead>\
                            <tr>\
                            <th width="32">选择</th>\
                            <th width="140">编号</th>\
                            <th width="100">名称</th>\
                            <th width="375">属性</th>\
                            <th width="65">借出数量</th>\
                            <th width="88">归还数量</th>\
                            <th width="60">操作</th>\
                            </tr>\
                            </thead>\
                            <tbody>\
                                <tr class="c_3 c_3 xs_bjd_bold">\
                                    <td><input type="checkbox" data-id="'+arr['id']+'" data-goods_id="'+arr['goods_id']+'" data-num="'+arr['num']+'"></td>\
                                    <td>'+likNullData(arr['good_sn'])+'</td>\
                                    <td>'+likNullData(arr['good_name'])+'</td>\
                                    <td>'+likNullData(arr['good_attr'])+'</td>\
                                    <td>'+likNullData(arr['num'])+''+arr['good_unit']+'</td>\
                                    <td><div class="xs_num_input num_input inline_block num_input_new"><button class="but_blue but_opa_small inp_plus zj_sell_quote_create_package_num_change">+</button><input type="text" value="' + (parseFloat(arr['num']) - parseFloat(arr['return_num'])) + '" class="sell_quote_create_package_num" maxnum="' + (parseFloat(arr['num']) - parseFloat(arr['return_num'])) + '" style="border:1px solid #23a2f3;"><button class="but_blue but_opa_small radius_left_0 inp_reduce zj_sell_quote_create_package_num_change">-</button></div></td>\
                                    <td><button class="but_mix box_open_btn_3 but_blue_1">展开</button></td>\
                                </tr>\
                            </tbody>\
                            </table>\
                            </div>\
                            </div>\
                            <div class="xs_xsbjd_table_t2 none" style="padding: 10px;border-bottom: 2px solid #e6e6e6;">\
                            <div class="box_open_list goods_tc_toggle">'+setting+'</div>\
                            </div>'

                        })
                    }

                    $(".tanceng .zj_jrgh_zj_goods_content_show").html(complete);
                }
            }

        }
    });
    //选择基本商品的checkbox
    // $('.tanceng .zj_select_jrgh_goods_content_tbody tr input:checkbox').die('click').live('click', function () {
    //     if ($(this).is(':checked')) {
    //         $(this).closest('tr').find('input, button').attr('disabled', false);
    //
    //     } else {
    //
    //         $(this).closest('tr').find('input:not(":checkbox"), button').attr('disabled', true);
    //         $(this).closest('tr').find('input').val(0);
    //     }
    // });
    $('.tanceng .zj_sell_quote_productnum_change').die('click').live('click', function () {
        if (parseFloat($(this).siblings('input').val()) > parseFloat($(this).siblings('input').attr('maxnum'))) {
            $(this).siblings('input').val($(this).siblings('input').attr('maxnum'));
            alert('超过可归还的最大数量');
        }
    });
    $('.tanceng .productnum').live('keyup', function () {
        if (parseFloat($(this).val()) > parseFloat($(this).attr('maxnum'))) {
            alert('超过可归还的最大数量');
            $(this).val($(this).attr('maxnum'));
        }
    });
    //整机商品父级勾选
    $('.tanceng .zj_jrgh_zj_goods_content_show .xs_div_2 input').die('click').live('click', function () {
        if ($(this).is(':checked')) {
            $(this).parents('.xs_div_2').next('.xs_xsbjd_table_t2').find('input').attr('checked', true);
        } else {
            $(this).parents('.xs_div_2').next('.xs_xsbjd_table_t2').find('input').attr('checked', false);
            //$(this).closest('.takenote_setting_list_one').find('input').val(0);
        }
    });
    /*改变整机数量*/
    $('.tanceng .zj_sell_quote_create_package_num_change').die('click').live('click', function () {
        if (parseFloat($(this).siblings('input').val()) > parseFloat($(this).siblings('input').attr('maxnum'))) {
            $(this).siblings('input').val($(this).siblings('input').attr('maxnum'));
            alert('超过可归还的最大数量');
        }
    });
    $('.tanceng .zj_jrgh_zj_goods_content_show .sell_quote_create_package_num').live('keyup', function () {
        if (parseFloat($(this).val()) > parseFloat($(this).attr('maxnum'))) {
            alert('超过可归还的最大数量');
            $(this).val($(this).attr('maxnum'));
        }
    });
    /*抄送人弹框按钮*/
    var  arr_id=[];/*抄送人id*/
    var cs_name=[];/*抄送人名字*/
    $(".tanceng .zj_jrd_xz_csr_tc_btn").die().live("click",function(){
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
                    var head='<li class="left_all"><span class="icon_open change_ba"></span><span class="icon_file"></span><span class="list_msg">所有分类(4)</span></li>'
                    /* $(".zcj_chao_sr_tree_list").html(head+tree_list_more_person(data.rows));*/
                    var deep=0;
                    $(".tanceng .zcj_jrgh_chao_sr_tree_list").html(head+tree_list_bmfzr(data, deep));
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

        $(".tanceng .zcj_jrgh_chao_sr_tree_list .person_left_nav").die().live("click",function(){
            /* debugger;*/
            var id=$(this).attr("userinfoid");
            var name=$(this).find("span.list_msg").text();
            $(this).toggle(function(){
                $('.tanceng .zcj_jrgh_select_shoose_right_list').append('<li rid="'+$(this).attr('userinfoid')+'"><span>'+$(this).children('.list_msg').text()+'</span><i class="list_choose_delete"></i></li>')
                $(this).append('<span class="list_check"><em class="on"></em></span>');
                //$(this).find('span.list_check em').addClass('on')
                arr_id.unshift(id);
                cs_name.unshift(name)
                console.log(arr_id);
                console.log(cs_name);

            },function(){
                $('.tanceng .zcj_jrgh_select_shoose_right_list').find('li[rid='+$(this).attr('userinfoid')+']').remove()
                //$(this).remove('<span class="list_check"><em class="on"></em></span>');
                $(this).find('span.list_check').remove()
                arr_id.splice(jQuery.inArray(id,arr_id),1);
                cs_name.splice(jQuery.inArray(id,cs_name),1);
                console.log(arr_id);
                console.log(cs_name);

            })
            $(this).trigger('click')

            /*抄送人确认按钮*/
            $(".tanceng .zcj_jrgh_select_csr_end_but").die().live("click",function(){
                //cs_name=getJsonArr(cs_name);
                var cs_per="";

                $.each($(".tanceng .zcj_jrgh_select_shoose_right_list li"),function (i,v) {
                    cs_per+='<li rid="'+arr_id[i]+'" class="zj_csr_num"><i class="del_img_1">-</i><em class="icon_personBtn icon_personBtn_msg"><i class="icon_personNext"></i></em> <em class="icon_adderBtn"></em> <p class="box_adderName">'+cs_name[i]+'</p></li>'
                });

                $(".zj_jrd_xz_csr_tc_btn").parent().before(cs_per);
                $(this).closest('.dialog_box').remove();
                //$(".zcj_shoose_right_list").empty();

            });
        });

        /*删除选择的抄送人*/
        $(".tanceng .zcj_jrgh_select_shoose_right_list .list_choose_delete").die().live("click",function(){
            var cs_id=$(this).parent().attr("rid");
            var name=$(this).prev().text();

            $(this).parent().remove();
            arr_id.splice(jQuery.inArray(cs_id,arr_id),1);
            cs_name.splice(jQuery.inArray(name,cs_name),1);
            console.log(arr_id);
            console.log(cs_name);
            $(".zcj_jrgh_chao_sr_tree_list .person_left_nav").each(function(){
                if($(this).attr('userinfoid')==cs_id){
                    $(this).click();
                    $(this).children('span.list_check').remove();
                }
            })
        });

        /*删除添加后的抄送人*/
        $(".zj_add_jrdh_csr_icon .del_img_1").die().live("click",function(){
            var dq_id= $(this).parent().attr("arrid");
            var dq_name=$(this).parent().children(".box_adderName").text();
            $(this).parent().remove();
            arr_id.splice($.inArray(dq_id,arr_id),1);
            cs_name.splice($.inArray(dq_name,cs_name),1);
            console.log(cs_name);
            console.log(arr_id);
        });
    });
    /*借入归还提交*/
    $(".zj_jrd_jrgh_finish_tj_btn").die().live("click",function () {
        jrgh_list_data.code_sn=$('.zj_jrd_jrgh_bh_num_val').val();
        jrgh_list_data.borrow_id=id;
        jrgh_list_data.borrow_code_sn=$(".zj_select_jrd_num_bh_val").val();
        jrgh_list_data.supplier_id=supplier_id;
        jrgh_list_data.supplier_name=supplier_name;
        if($('.zj_jrd_wlfs_name').val()=='快递'){
            jrgh_list_data.logistics_way=1;
        }else if($('.zj_jrd_wlfs_name').val()=='陆运'){
            jrgh_list_data.logistics_way=2;
        }else if($('.zj_jrd_wlfs_name').val()=='空运'){
            jrgh_list_data.logistics_way=3;
        }else if($('.zj_jrd_wlfs_name').val()=='平邮'){
            jrgh_list_data.logistics_way=4;
        }else if($('.zj_jrd_wlfs_name').val()=='海运'){
            jrgh_list_data.logistics_way=5;
        }
        /*抄送人*/
        var copy_flow=[];
        $(".tanceng .zj_add_jrdh_csr_icon .zj_csr_num").each(function(){
            copy_flow.push($(this).attr('rid'))
        })
        jrgh_list_data.copy_flow=copy_flow.toString();
        jrgh_list_data.remark=$(".zj_jrd_show_reark_info").val();
        var state=2;
        $(".tanceng .zj_jrd_is_check_state input").each(function () {
            if($(this).is(':checked')){
                state=$(this).data('id');
            }
        })
        jrgh_list_data.is_freight= state;
        jrgh_list_data.contactor=$('.zj_jrd_gys_person_info_val').val();
        jrgh_list_data.tel=$(".zcj_jrd_gys_person_mobile").val();
        jrgh_list_data.address=$(".zj_jrd_gys_address_info").val();
        if($(".zj_jrd_gys_fh_day").val()=='请选择日期'){
            jrgh_list_data.shipments_time=''
        }else{
            jrgh_list_data.shipments_time=$(".zj_jrd_gys_fh_day").val();
        }

        /*商品*/
        var jrgh_goods=[];
        /*推送*/
        var goods_info=[]
        $(".tanceng .zj_select_jrgh_goods_content_tbody tr input").each(function(i){
            if($(this).is(':checked')){
                jrgh_goods.push({
                    id:$(this).data('id'),
                    goods_id:$(this).data('good_id'),
                    goods_category:1,
                    num: $(this).parents('tr').find('.productnum').val(),
                    total_num:$(this).parents('tr').find('td').eq(4).data('good_num')
                })
                goods_info.push({
                    product_id:$(this).data('good_id'),
                    product_type:1,
                    output_num:$(this).parents('tr').find('.productnum').val()
                })
            }
        })
        /*整机商品*/
        $(".tanceng .zj_jrgh_zj_goods_content_show .xs_div_2 tbody input:checkbox").each(function (i) {

            var match_goods=[];
            /*配件推送*/
            var product_info=[];
            if($(this).is(':checked')){
            $(".tanceng .zj_jrgh_zj_goods_content_show .xs_div_2 tbody input:checkbox").parents('.zj_jrgh_zj_goods_content_show').find('.xs_xsbjd_table_t2').eq(i).find('input:checkbox').each(function(i2){

                    match_goods.push({
                        id:$(this).data('id'),
                        goods_id:$(this).data('good_id'),
                        num:$(this).parents('tr').find('.productnum').val()
                    })
                    product_info.push({
                        product_id:$(this).data('good_id'),
                        num:$(this).parents('tr').find('.productnum').val()
                    })


            })

                jrgh_goods.push({
                    id:$(this).data('id'),
                    goods_id:$(this).data('goods_id'),
                    goods_name:$(this).parents('tr').find('td').eq(2).text(),
                    goods_code_sn:$(this).parents('tr').find('td').eq(1).text(),
                    goods_category:2,
                    num:$(this).parents('tr').find('.sell_quote_create_package_num').val(),
                    total_num:$(this).data('num'),
                    piece:match_goods
                })
                goods_info.push({
                    product_id:$(this).data('goods_id'),
                    product_type_no:$(this).parents('tr').find('td').eq(1).text(),
                    product_type:3,
                    output_num:$(this).parents('tr').find('.sell_quote_create_package_num').val(),
                    product_type_name:$(this).parents('tr').find('td').eq(2).text(),
                    set_detail:product_info
                })
            }
        })
        var jrgh_goods_info=JSON.stringify(jrgh_goods);

        jrgh_list_data.product_info=jrgh_goods_info;
        /*推送*/
        var ts_goods_info=JSON.stringify(goods_info);
        takenoteToOutStockData.product_info=ts_goods_info;
        //推送出库信息
        takenoteToOutStockData.related_receipts_no = jrgh_list_data.code_sn;
        takenoteToOutStockData.related_business_name = jrgh_list_data.supplier_name;
        takenoteToOutStockData.logistics_way = jrgh_list_data.logistics_way;
        takenoteToOutStockData.remark = jrgh_list_data.remark;
        takenoteToOutStockData.is_package_freight = jrgh_list_data.is_freight;
        takenoteToOutStockData.consignee = jrgh_list_data.contactor;
        takenoteToOutStockData.consignee_tel = jrgh_list_data.tel;
        takenoteToOutStockData.consignee_addr = jrgh_list_data.address;
        takenoteToOutStockData.output_time = jrgh_list_data.shipments_time;
        if(jrgh_list_data.shipments_time==''){
            alert('请选择日期');
        }else{
            $.ajax({
                type: 'post',
                url: SERVER_URL + "/borrow-out/add",
                data: jrgh_list_data,
                dataType: "json",
                success: function (data) {
                    console.log('300');
                    console.log(data);
                    console.log('300');
                    if(data.code==0){
                        $('.tanceng .dialog_box').not('[name="takenote_jrgh_jrghtj"]').remove();
                        $('.tanceng .takenote_jrgh_jrghtj').attr('name', 'takenote_jrgh_jrghtj');
                        $('.tanceng').append($('.dialog_box[name="takenote_jrgh_jrghtj"]').css('display', 'block'));
                        $('.tanceng .zj_jrghd_entire_num').html(jrgh_list_data.code_sn);
                        takenoteToOutStockFn();
                        borrow_list();
                    }else{
                        alert(data.msg);
                    }
                }
            })
        }
        /*单号确定*/
        $(".zj_jrgh_dh_sc_end_btn").die().live("click",function(){
              $(this).parents('.dialog_content_delete').find('.dialog_close').click();
        });
    });

    //推送出库函数
    function takenoteToOutStockFn() {
        $.ajax({
            url: SERVER_URL + '/stocking-out/add',
            type: 'POST',
            data: takenoteToOutStockData,
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                borrow_list();
            },
            error: function (e) {
                alert(e.msg);
                console.log(e);

            }
        });
    }

});


/***************************************新建借入单********************************/
/*新建btn*/
$(".zj_new_create_jrd_btn").die().live("click",function () {
    new_number('.zj_jrd_random_num_val','JRD');
    $(".zj_new_creat_data_time").text(getCurrentDateDay());
    $(".zj_xdr_name_show").text(username);
    /*选择税率*/
    $(".zj_jrg_select_tax_list_li li").die().live("click",function(){
        var name=$(this).text();
        $(".zj_jrd_h_tax_text_show").text(name);
    });
    /*审批人获取*/
    $.ajax({
        type: 'POST',
        url: SERVER_URL + "/borrow/get-approval-type",
        data: {
            token: token,
            company_id: company_id, //公司id
            uid: uid, // 用户id
            category: 3,// 分类id 1合同管理,2采购,3借入借出
            type_id: 7, // 类型(1销售合同,2采购合同,3员工合同,4其他合同,5采购报价单,6采购退换货,7借入单,8借出单,9归还单,10,归还单(借入归还),11(借出归还)
            department_id:department_id
        },
        dataType: "json",
        success: function (data) {
            console.log('10001');
            console.log(data);
            console.log('10001');
            $(".zj_jrd_add_spr_ul_content").data('kuaji',data['kuaji'])
            var html='';
            var P_sort=" ";
            if(data.code==0){
                if(data['kuaji']==1) {
                    $.each(data['data'], function (i, v) {

                        if (v['face'] != '') {
                            html += '<li data-id="' + v['uid'] + '" class="zj_spr_num"><em class="icon_personBtn"><img src="' + getImgUrl(v['face']) + '" style="width: 34px;height: 34px;border-radius:50px;"/></em> <em class="icon_adderBtn"></em> <p class="box_adderName">' + v['name'] + '</p> </li>'
                        } else {
                            html += '<li data-id="' + v['uid'] + '" class="zj_spr_num"> <em class="icon_personBtn icon_personBtn_msg"></em> <em class="icon_adderBtn"></em> <p class="box_adderName">' + v['name'] + '</p></li>'
                        }


                    })
                }else{
                    $.each(data['data'], function (i, v) {

                        if (v['face'] != '') {
                            html += '<li data-id="' + v['uid'] + '" class="zj_spr_num"><em class="icon_personBtn"><img src="' + getImgUrl(v['face']) + '" style="width: 34px;height: 34px;border-radius:50px;"/><i class="icon_personNext"></i></em> <em class="icon_adderBtn"></em> <p class="box_adderName">' + v['name'] + '</p> <p class="box_addermsg">步骤' + (i + 1) + '</p> </li>'
                        } else {
                            html += '<li data-id="' + v['uid'] + '" class="zj_spr_num"> <em class="icon_personBtn icon_personBtn_msg"><i class="icon_personNext"></i></em> <em class="icon_adderBtn"></em> <p class="box_adderName">' + v['name'] + '</p> <p class="box_addermsg">步骤' + (i + 1) + '</p> </li>'
                        }

                    })
                }


            $(".zj_jrd_add_spr_ul_content").html(html);
                $(".zj_jrd_add_spr_ul_content li:last-child").find('i').hide();

            }else{
                alert(data.msg);
            }

        }
    })

    /*抄送人弹框按钮*/
    var  arr_id=[];/*抄送人id*/
    var cs_name=[];/*抄送人名字*/
    $(".tanceng .zcj_select_cs_add_btn").die().live("click",function(){
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
                    $(".tanceng .zcj_chao_sr_tree_list").html(head+tree_list_bmfzr(data, deep));
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

        $(".tanceng .zcj_chao_sr_tree_list .person_left_nav").die().live("click",function(){
            /* debugger;*/
            var id=$(this).attr("userinfoid");
            var name=$(this).find("span.list_msg").text();
            $(this).toggle(function(){
                $('.tanceng .zcj_select_shoose_right_list').append('<li rid="'+$(this).attr('userinfoid')+'"><span>'+$(this).children('.list_msg').text()+'</span><i class="list_choose_delete"></i></li>')
                $(this).append('<span class="list_check"><em class="on"></em></span>');
                //$(this).find('span.list_check em').addClass('on')
                arr_id.unshift(id);
                cs_name.unshift(name)
                console.log(arr_id);
                console.log(cs_name);

            },function(){
                $('.tanceng .zcj_select_shoose_right_list').find('li[rid='+$(this).attr('userinfoid')+']').remove()
                //$(this).remove('<span class="list_check"><em class="on"></em></span>');
                $(this).find('span.list_check').remove()
                arr_id.splice(jQuery.inArray(id,arr_id),1);
                cs_name.splice(jQuery.inArray(id,cs_name),1);
                console.log(arr_id);
                console.log(cs_name);

            })
            $(this).trigger('click')

            /*抄送人确认按钮*/
            $(".tanceng .zcj_select_csr_end_but").die().live("click",function(){
                //cs_name=getJsonArr(cs_name);
                var cs_per="";

                $.each($(".tanceng .zcj_select_shoose_right_list li"),function (i,v) {
                    cs_per+='<li rid="'+arr_id[i]+'" class="zj_csr_num"><i class="del_img_1">-</i><em class="icon_personBtn icon_personBtn_msg"><i class="icon_personNext"></i></em> <em class="icon_adderBtn"></em> <p class="box_adderName">'+cs_name[i]+'</p></li>'
                });
                // $(".tanceng .zj_select_csr_list_data_rnum .zj_csr_num").each(function(){
                //     //$(this).attr('rid');
                //     if($.inArray($(this).attr('rid'),cs_name)>-1){
                //         alert('1')
                //         alert("抄送人重复");
                //         return false;
                //     }else{
                //         alert('2')
                //
                //     }
                // })
                $(".zcj_select_cs_add_btn").parent().before(cs_per);
                $(this).closest('.dialog_box').remove();
                //$(".zcj_shoose_right_list").empty();

            });
        });

        /*删除选择的抄送人*/
        $(".tanceng .zcj_select_shoose_right_list .list_choose_delete").die().live("click",function(){
            var cs_id=$(this).parent().attr("rid");
            var name=$(this).prev().text();

            $(this).parent().remove();
            arr_id.splice(jQuery.inArray(cs_id,arr_id),1);
            cs_name.splice(jQuery.inArray(name,cs_name),1);
            console.log(arr_id);
            console.log(cs_name);
            $(".zcj_chao_sr_tree_list .person_left_nav").each(function(){
                if($(this).attr('userinfoid')==cs_id){
                    $(this).click();
                    $(this).children('span.list_check').remove();
                }
            })
        });

        /*删除添加后的抄送人*/
        $(".zcj_csr_info_content_icon .del_img_1").die().live("click",function(){
            var dq_id= $(this).parent().attr("arrid");
            var dq_name=$(this).parent().children(".box_adderName").text();
            $(this).parent().remove();
            arr_id.splice($.inArray(dq_id,arr_id),1);
            cs_name.splice($.inArray(dq_name,cs_name),1);
            console.log(cs_name);
            console.log(arr_id);
        });
    });

});
/*添加供应商btn*/
$(".tanceng .zj_jrd_select_gys_tc_btn").die().live("click",function(){
    // 定义供应商列表参数
    var purSupData = {
        token: token,
        page: 1, //页面
        num: 10, //每页条数
        is_invalid: 0, // 0正常  1作废
        keywords: '',//关键字
        big_id: '',
        small_id: '',
        province: '', // 省id
        city: '' // 市id
    };

//商品分类
    var goodsData = {
        token: token,
        category: 1, //类型 1.商品 2.整机商品
        name: '', // 分类名称
        detail: 1, // 是否获取各类型的数量总数 0 否 1 是
        supply:1  //是否获取各类型的供应商数量总数 0 否 1 是
    };
    getProCategoryGoodsListFn();
    //获取商品分类列表函数
    function getProCategoryGoodsListFn() {
        goodsData.category = 1;
        $.ajax({
            url: SERVER_URL + '/product-category/list',
            type: 'GET',
            data: goodsData,
            async: false,
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                var datalist = oE.dataList;
                var goodsCateListHtml = '';
                var numGoods = 0;
                $.each(datalist, function (i, v) {
                    goodsCateListHtml += '<li data-id="' + v['id'] + '" data-big_id="1" class="' + (i == 0 ? 'Sideslip_list_on' : '') + '" goodsnum="' + v['num'] + '" goodssort="' + v['sort'] + '"><span>' + v['name'] + '</span>('+v['num']+')</li>';
                    numGoods+=parseFloat(v['num'])
                });
                $(".zj_goods_znum_number_show").text(numGoods)
                $('.zj_pro_category_goods_list_ul').html(goodsCateListHtml);
                purSupData.big_id = $('.pur_sup_goods_cate_list_ul li.Sideslip_list_on').data('big_id');
                purSupData.small_id = $('.pur_sup_goods_cate_list_ul li.Sideslip_list_on').data('id');
                supplier_list_show_fn();
            },
            error: function (e) {
                console.log(e);
            }
        });

    }
    //获取整机商品分类列表函数
    function getProCategorySettingListFn() {
        goodsData.category = 2;
        $.ajax({
            url: SERVER_URL + '/product-category/list',
            type: 'GET',
            data: goodsData,
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                var datalist = oE.dataList;
                var goodsCateListHtml = '';
                var numTotal = 0;
                $.each(datalist, function (i, v) {
                    goodsCateListHtml += '<li data-id="' + v['id'] + '" data-big_id="2" class="' + (i == 0 ? 'Sideslip_list_on' : '') + '" goodsnum="' + v['num'] + '" goodssort="' + v['sort'] + '"><span>' + v['name'] + '</span>('+v['num']+')</li>';
                    numTotal += parseFloat(v['num']);
                });
                $(".tanceng .zj_whole_ji_goods_number").text(numTotal)
                $('.zj_pro_category_setting_list_ul').html(goodsCateListHtml);
                purSupData.big_id = $('.pur_sup_goods_cate_list_ul li.Sideslip_list_on').data('big_id');
                purSupData.small_id = $('.pur_sup_goods_cate_list_ul li.Sideslip_list_on').data('id');
                supplier_list_show_fn();
            },
            error: function (e) {
                console.log(e);
            }
        });
    }

    /*商品list*/
    $("#zj_goods_gys_header_list").die().live("click",function(){
        getProCategoryGoodsListFn();
    });
   /* 整机商品切换*/
    $("#zj_all_goods_header_list").die().live("click",function(){
        getProCategorySettingListFn();
    });
    /*******************供应商列表******************/
     function supplier_list_show_fn() {
        // 获取供应商列表
        $.ajax({
            url: SERVER_URL + '/supplier/list',
            type: 'GET',
            data: purSupData,
            dataType: 'json',
            success: function (data) {
                console.log(data);
                var datalist = data.datalist;
                if (data.code == 0) {
                    //搜索总条数
                   $('.zj_supplier_search_num').html(data.totalcount);
                    // //获取datalist

                    if (datalist.length > 0) {
                        $('.zj_create_choose_setting_nodata_box').hide();
                        $('.zcj_gys_fl_sp_good_page').show();

                    } else {
                        $('.zj_create_choose_setting_nodata_box').show();
                        $('.zcj_gys_fl_sp_good_page').hide();
                    }

                    //字符串拼接
                    var supplierHtml = '';
                    $.each(datalist, function (i, v) {

                        //循环列表
                        supplierHtml+='<tr> <td><input type="radio" data-id="'+v['id']+'" data-name="'+v['name']+'" class="zj_select_gys_name_put" name="222" checked="checked"/></td><td>'+likNullData(v['code_sn'])+'</td> <td>'+likNullData(v['name'])+'</td> <td>'+likNullData(v['tel'])+'</td> <td>'+likNullData(v['address'])+'</td> <td>'+likNullData(v['comefrom_name'])+'</td> <td>'+likNullData(v['contact_person'])+'</td><td>'+likNullData(v['note'])+'</td> </tr>'


                    });
                    $(".zj_select_supplier_list_data_table").html(supplierHtml);

                }
                //分页
                list_table_render_pagination('.zcj_gys_fl_sp_good_page', purSupData, supplier_list_show_fn, data.totalcount, datalist.length);
                //$('#pur_supplier_look_save').trigger('click');
            }
        });
    }
   /* supplier_list_show_fn();*/
    /*选择的供应商*/
    var g_id=null;
    var g_name=null;
    $(".tanceng .zj_select_supplier_list_data_table .zj_select_gys_name_put").die().live("click",function(){
              g_id=$(this).data('id');
              g_name=$(this).data('name');
    });
    /*选择供应商确定btn*/
    $(".tanceng .zj_select_gys_wc_end_btn").die().live("click",function(){
        if(g_id!=null && g_name!=null){
            $(".zj_jrd_select_gys_name_show_val").data('id',g_id).val(g_name).addClass('c_3')
            $(this).parents('.dialog_content_middle2').find('.dialog_close').click();
        }else{
            alert("请选择供应商");
            return false;
        }

    });
    /*分类搜索供应商*/
    $(".zj_pro_category_goods_list_ul li").die().live("click",function(){
        purSupData.big_id = $(this).data('big_id');
        purSupData.small_id = $(this).data('id');
        supplier_list_show_fn();
    });
    /*整机分类搜索供应商*/
    $(".zj_pro_category_setting_list_ul li").die().live("click",function(){
        purSupData.big_id = $(this).data('big_id');
        purSupData.small_id = $(this).data('id');
        supplier_list_show_fn();
    });
    //搜索关键字
    $('.zj_list_table_search').die().live('click', function () {
        if ($('.zj_list_table_search_inp').val() == '搜索供应商编号/供应商名称') {
            alert('请输入搜索关键字');
            purSupData.keywords = '';
        } else {
            purSupData.keywords = $('.zj_list_table_search_inp').val();
        }
        supplier_list_show_fn();
    });

    //地区搜索供应商

    //选择省
    $('.zj_search_province_list_btn').die().live('click', function () {
        $.ajax({
            url: SERVER_URL + '/industry/provincelist',
            type: 'GET',
            data: {
                token: token
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var datalist = oE.datalist;
                    var areaListProvince = '';
                    $.each(datalist, function (i, v) {
                        areaListProvince += '<li data-id="' + v['provinceID'] + '">' + v['province'] + '</li>'
                    });
                    $('.zj_search_province_ul').html(areaListProvince);
                }
            }
        })
    });
    /*选择省列表*/
    $('.zj_search_province_ul li').live('click', function () {
        purSupData.province = $(this).data('id');
        supplier_list_show_fn();
        $.ajax({
            url: SERVER_URL + '/industry/citylist',
            type: 'GET',
            data: {
                token: token,
                province_id: purSupData.province
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var datalist = oE.datalist;
                    var areaListCity = '';
                    $.each(datalist, function (i, v) {
                        areaListCity += '<li cityid="' + v['cityID'] + '">' + v['city'] + '</li>'
                    });
                    $('.zj_sup_search_city_ul').html(areaListCity);
                }
            }
        });
    });
    //选择市
    $('.zj_sup_search_city_ul li').live('click', function () {
        purSupData.city = $(this).attr('cityid');
        supplier_list_show_fn();
    });
});
/***************************新建接入单*************************/
    /*新建接入单参数*/
   var newCreateData = {
        token: token,
        uid:uid,
        company_id:company_id,
        code_sn: '', // 借入单编号
        //borrow_id: '', // 借入单id
        supplier_id: '', // 供应商id
        expect_return_time: '', // 预计归还日期
        tax_rate: '', // 税率
        library_time: '',//入库日期
        note: '', // 备注
        unit_price_total: '', // 单价合计
        tax_total: '', // 合计税额
        other_costs: '', // 其它费用
        all_money: '', // 总费用
        approval_id: '', // 审批人
        now_approval_id: '', // 当前审批人
        cc_id: '', // 抄送人
        kuaji: '', // 跨级审批,1是,2否
        good_borrow_num:'',//商品借入总数
        computer_borrow_num:'',//z整机借入总数
        borrow_json:''//借入JSON[{"goods_category":1,"goods_id":1,"num":20,"price":"10.5","containing_rate":17,"containing_money":"17.7","total_money":"1700.56"}]
    };
/*选择商品*/
//商品分类参数
    var selectGoodsData = {
        token: token,
        category: 1, //类型 1.商品 2.整机商品
        name: '', // 分类名称
        detail: 1 // 是否获取各类型的数量总数 0 否 1 是
    };
//商品分类
    function  CreateChooseGoods_list() {
        $.ajax({
            url: SERVER_URL + '/product-category/list',
            type: 'GET',
            data: selectGoodsData,
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                var datalist = oE.dataList;
                var goodsCateListHtml = '';
                $.each(datalist, function (i, v) {
                    goodsCateListHtml += '<li data-id="' + v['id'] + '" data-name="' + v['name'] + '" class="' + (i == 0 ? 'Sideslip_list_on' : '') + '"><span>' + v['name'] + '</span></li>';
                });
                $('.tanceng .zj_select_goods_left_list_ul').html(goodsCateListHtml);
                getGoodsListByCateFn($('.tanceng .zj_select_goods_left_list_ul li:first-child').data('id'));
            },
            error: function (e) {
                alert(e.msg);
                console.log(e);
            }
        });
    }

  /*选择商品按钮*/
    $(".tanceng .zj_sell_quote_create_choose_goods_btn").die().live("click",function(){
        CreateChooseGoods_list();

    });
    //商品分类搜索功能
    $('.tanceng .zj_quote_create_choose_goods_cate_search_btn').die('click').live('click', function () {
        if ($('.zj_quote_create_choose_goods_cate_search_inp').val() == '') {
            return false;
        }
        $('.tanceng .zj_quote_create_choose_goods_inp_add_list').html('<li style="margin-top: 1px;">' + $('.zj_quote_create_choose_goods_cate_search_inp').val() + ' <i></i></li>');
        selectGoodsData.name = $('.zj_quote_create_choose_goods_cate_search_inp').val();
        CreateChooseGoods_list();
        $('.zj_quote_create_choose_goods_cate_search_inp').val('').attr('readonly', true);
    });

    //商品分类 - 删除搜索项
    $('.tanceng .zj_quote_create_choose_goods_inp_add_list li i').die('click').live('click', function () {
        $(this).closest('li').remove();
        selectGoodsData.name = '';
        CreateChooseGoods_list();
        $('.zj_quote_create_choose_goods_cate_search_inp').val('').attr('readonly', false);
    });


    //获取基本商品列表参数
    var getGoodsDataList = {
        token: token,
        key: '', //关键字
        page: 1, //页码
        num: 10, //每页数量
        status: 0, //是否启用状态 0正常 1停用
        unit_id: '', // 基本单位id
        cate_id: '', //分类id
        brand_id: '', //品牌ID
        attr: '' //属性
    };

    //获取基本商品列表
    function purQuoteCreateChooseGoodsFn() {
        $.ajax({
            url: SERVER_URL + '/product/list',
            type: 'GET',
            data: getGoodsDataList,
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                //搜索结果
                $('.tanceng .zj_quote_create_choose_goods_totals_num').html(oE['totalcount']);
                var datalist = oE.dataList;
                if (datalist.length > 0) {
                    $('.zj_quote_create_choose_goods_handle_page').removeClass('none');
                    $('.zj_create_choose_goods_nodata_box_no_data').addClass('none');
                } else {
                    $('.zj_quote_create_choose_goods_handle_page').addClass('none');
                    $('.zj_create_choose_goods_nodata_box_no_data').removeClass('none');
                }
                var goodsListHtml = '';
                //属性名
                var goodsAttrName = '';
                $.each(datalist, function (i, v) {
                    //属性值
                    var goodsAttrValue = '';
                    var goodsAttrValueText = '';
                    //属性名
                    goodsAttrName = '';
                    $.each(v['attributes'], function (i2, v2) {
                        goodsAttrName += '<th>' + v2['name'] + '</th>';
                        goodsAttrValue += '<td>' + v2['value'] + '</td>';
                        goodsAttrValueText += v2['value'] + '/';
                    });
                    goodsAttrValueText = goodsAttrValueText.slice(0, goodsAttrValueText.length - 1);

                    //列表内容

                    goodsListHtml +='<tr data-id="' + v['id'] + '" goodstaxtype="' + v['taxtype'] + '" goodsattr="' + goodsAttrValueText + '" goodsretailprice="' + v['retail_price'] + '" goodslowerprice="' + v['lower_price'] + '" goodscostprice="' + v['cost_price'] + '">\
                        <td><input type="checkbox" name="goods_tc_checked"></td>\
                        <td class="goodscodesn" data-code_sn="' + v['code_sn'] + '">' + v['code_sn'] + '</td>\
                        <td class="goodsname" data-name="' + v['name'] + '">' + v['name'] + '</td>\
                        <td class="goodsunitname" data-unit_name="' + v['unit_name'] + '">' + v['unit_name'] + '</td>' + goodsAttrValue + '\
                        <td>' + v['remark'] + '</td>\
                        </tr>'
                });
                //表头
             $('.tanceng .zj_quote_create_choose_goods_list_thead').html('<tr><th>选择</th><th>商品编号</th><th>名称</th><th>基本单位</th>' + goodsAttrName + '<th>备注</th></tr>');
                //表格主体
                $('.tanceng .zj_select_goods_content_body').html(goodsListHtml);
                //分页
                list_table_render_pagination('.zj_quote_create_choose_goods_pagination', getGoodsDataList, purQuoteCreateChooseGoodsFn, oE['totalcount'], datalist.length);
            },
            error: function (e) {
                alert(e.msg);
                console.log(e);
            }
        });
    }
    //选择商品分类切换商品列表
    $('.zj_select_goods_left_list_ul li').die('click').live('click', function () {
        $('.zj_quote_create_choose_goods_search_inp').val('搜索商品编号/商品名称').css('#ccc');
        getGoodsDataList.key = '';
        getGoodsListByCateFn($(this).data('id'));
    });
    //切换分类调取不同列表 函数
    function getGoodsListByCateFn(cateid) {
        if (cateid == undefined) {
            $('.zj_select_goods_content_body').addClass('none');
            $('.zj_quote_create_choose_goods_handle_page').addClass('none');
            $('.zj_create_choose_goods_nodata_box_no_data').removeClass('none');
            return false;
        } else {
            getGoodsDataList.cate_id = cateid;
            $('.zj_select_goods_content_body').removeClass('none');
            $('.pur_quote_create_choose_goods_handle').removeClass('none');
            $('.zj_create_choose_goods_nodata_box_no_data').addClass('none');
        }
        purQuoteCreateChooseGoodsFn();
    }
    //搜索关键字
    $('.tanceng .zj_quote_create_choose_goods_search_btn').die('click').live('click', function () {
        if ($('.tanceng .zj_quote_create_choose_goods_search_inp').val() == '搜索商品编号/商品名称') {
            getGoodsDataList.key = '';
        } else {
            getGoodsDataList.key = $('.tanceng .zj_quote_create_choose_goods_search_inp').val();
        }
        purQuoteCreateChooseGoodsFn();
    });
    //清空数组
    var aPurQuoteCreateGoodsChosen = [];//商品
    var purQuoteSettingGoodsListArr = [];//整机商品
    var purQuoteSettingGoodsListValArr = [];
    var aPurQuoteCreateSettingChosen = [];//id
    /*点击商品、整机商品*/
    $('.tanceng .zj_quote_choose_products_ul li').die('click').live('click', function () {
        if ($(this).index() == 0) {
            aPurQuoteCreateGoodsChosen = [];
        } else if ($(this).index() == 2) {
            purQuoteSettingGoodsListArr = [];
            purQuoteSettingGoodsListValArr = [];
            aPurQuoteCreateSettingChosen = [];
        }
    });
    //选择商品 - 保存
    $('.tanceng .zj_select_create_choose_goods_save_btn').die('click').live('click', function () {
        $.each($('.tanceng .zj_select_goods_content_body tr'), function (i, v) {
            if ($('.tanceng .zj_select_goods_content_body tr').eq(i).find('input:checkbox').is(':checked')) {
                aPurQuoteCreateGoodsChosen.push({
                    'goodsid': $('.tanceng .zj_select_goods_content_body tr').eq(i).data('id'),
                    'goodstaxtype': $('.tanceng .zj_select_goods_content_body tr').eq(i).attr('goodstaxtype'),
                    'goodsname': $('.tanceng .zj_select_goods_left_list_ul li.Sideslip_list_on').data('name'),
                    'goodscodesn': $('.tanceng .zj_select_goods_content_body tr').eq(i).find('td.goodscodesn').data('code_sn'),
                    'goodsattr': $('.tanceng .zj_select_goods_content_body tr').eq(i).attr('goodsattr'),
                    'goodsunitname': $('.tanceng .zj_select_goods_content_body tr').eq(i).find('td.goodsunitname').data('unit_name')
                });
            }
            //$('.tanceng .pur_quote_create_choose_goods_list tr').eq(i).find('input.goodsnum').val();
        });
        var purQuoteCreateGoodsList = '';
        aPurQuoteCreateGoodsChosen = getJsonArr(aPurQuoteCreateGoodsChosen);
        if (aPurQuoteCreateGoodsChosen.length != 0) {
            $('.tanceng .zj_quote_create_chosen_goods_add_btn_tr').addClass('none');
        } else {
            $('.tanceng .zj_quote_create_chosen_goods_add_btn_tr').removeClass('none');
        }
        console.log(aPurQuoteCreateGoodsChosen);
        $.each(aPurQuoteCreateGoodsChosen, function (i, v) {

            //上次报价
            var priceLastTime = 0;
            $.ajax({
                url: SERVER_URL + '/quote/goodhislist',
                type: 'GET',
                data: {
                    token: token,
                    good_id: v['goodsid'],
                    thetype: 2
                },
                async: false,
                dataType: 'json',
                success: function (oE) {
                    console.log(oE);
                    if (oE.code == 0) {
                        priceLastTime = oE.data.price ? oE.data.price : 0;
                    }
                },
                error: function (e) {
                    alert(e.msg);
                    console.log(e);
                }
            });

            var taxNum = 0;
            if ($('.tanceng .zj_contain_tax_val_ratio').val() == '含税17%') {
                taxNum = 17;
            } else if ($('.tanceng .zj_contain_tax_val_ratio').val() == '无税') {
                taxNum = 0;
            }
            purQuoteCreateGoodsList += '<tr goodsid="' + v['goodsid'] + '" lik_up_down_type="0">\
                                            <td class="pur_quote_create_choose_goods_order">' + l_dbl(i + 1) + '</td>\
                                            <td class="xs_f_color sell_quote_create_choose_goods_name">' + v['goodsname'] + '</td>\
                                                <td>' + v['goodscodesn'] + '</td>\
                                                <td>' + v['goodsattr'] + '</td>\
                                                <td>' + v['goodsunitname'] + '</td>\
                                                <td>\
                                                <div class="xs_num_input num_input inline_block num_input_new"><button class="but_grey_a but_opa_small inp_plus pur_quote_productnum_change">+</button><input type="text" class="productnum" value="1"/><button class="but_grey_a but_opa_small radius_left_0 inp_reduce pur_quote_productnum_change">-</button></div>\
                                                    </td>\
                                                    <td class="xs_goods_box" style="position: relative;">\
                                                    <div class="xs_goods_big_box"><div class="inline_block select_100"><input type="text" class="lik_input_number c_3 time_input xs_bjd_inp xs_xsbjd_inp_60 product_reference_price pur_quote_goods_cost_one" lastprice = "' + priceLastTime + '" value="0" style="color: rgb(153, 153, 153);margin-right: 10px;"></div><i class="ven_warning_arrow xs_goods_down_img" style="margin: 0;position: absolute;top: 21px;right: 6px;display:none;"></i><ul class="xs_goods_select select_list ' + (priceLastTime == 0 ? 'none' : '') + '" style="padding-bottom:5px;"><div class="xs_goods_li_box"><p class="p1">上次报价：</p><p class="p2">' + priceLastTime + '</p><i class="ven_warning_arrow xs_goods_down_img xs_goods_down_img1"></i><p></p></div></ul></div><div class="work_vent_client_contMsgBox"><i class="work_vent_client_torr"></i><div class="work_vent_client_contMsgBoxDet fnc_output_ticket_total_remain_ticket_num_list"><span class="lik_up_down_text"></span>于 ' + priceLastTime + '(上次报价)</div></div>\
                                                </td>\
                                                    <td><span class="pur_quote_goods_tax_one c_y">' + taxNum + '</span></td>\
                                                    <td><span class="pur_quote_goods_tax_total">0</span></td>\
                                                    <td><span class="pur_quote_goods_one_cost_total">0</span></td>\
                                                <td><button class="but_blue but_opa_small but_green val_dialogTop zj_sell_quote_create_choose_goods_btn" name="takenote_jrd_xzsp">+</button><button class="but_opa_small but_red pur_quote_create_goods_del_btn">-</button></td>\
                                            </tr>'
        });
        $('.tanceng .zj_quote_create_chosen_goods_tbody_content').html(purQuoteCreateGoodsList);
        //productnumChangeFn();
        //goodTaxTotalsFn();
        //goodCostTotalsFn();
        $(this).closest('.dialog_box').remove();
        purQuoteCreateProductnumChangeFn();
    });

    //商品数量控制
    function purQuoteCreateProductnumChangeFn() {
        var goodsNumTotal = 0;
        $.each($('.tanceng .zj_quote_create_chosen_goods_tbody_content .productnum'), function (i, v) {
            goodsNumTotal += parseFloat($('.tanceng .zj_quote_create_chosen_goods_tbody_content .productnum').eq(i).val());
        });
        $('.tanceng .zj_quote_create_goods_num_total').html(goodsNumTotal);
    }

    //商品数量增加减少
    $('.tanceng .zj_quote_create_chosen_goods_tbody_content .pur_quote_productnum_change').die('click').live('click', function () {
        var index = $(this).closest('tr').index();
        purQuoteCreateProductnumChangeFn();
        purQuoteCreateGoodCostCalcFn(index);
        purQuoteCreateGoodCostTotalsFn();
        //purQuoteCreateGoodTaxTotalsFn();
    });

    //商品单条金额计算
    function purQuoteCreateGoodCostCalcFn(index) {
        //单条商品税额
        $('.tanceng .zj_quote_create_chosen_goods_tbody_content .pur_quote_goods_tax_total').eq(index).html(moneyToFixed($('.tanceng .zj_quote_create_chosen_goods_tbody_content .pur_quote_goods_cost_one').eq(index).val() * (100 + parseFloat($('.tanceng .zj_quote_create_chosen_goods_tbody_content .pur_quote_goods_tax_one').eq(index).html())) / 100));
        //单条商品价格
        $('.tanceng .zj_quote_create_chosen_goods_tbody_content .pur_quote_goods_one_cost_total').eq(index).html(moneyToFixed($('.tanceng .zj_quote_create_chosen_goods_tbody_content .productnum').eq(index).val() * $('.tanceng .zj_quote_create_chosen_goods_tbody_content .pur_quote_goods_tax_total').eq(index).text()));
    }

    //商品单价调整
    $('.tanceng .zj_quote_create_chosen_goods_tbody_content .pur_quote_goods_cost_one').live('keyup', function () {
        var index = $(this).closest('tr').index();
        purQuoteCreateGoodCostCalcFn(index);
        purQuoteCreateGoodCostTotalsFn();
        //purQuoteCreateGoodTaxTotalsFn();
        //与上次报价相比
        if (parseFloat($(this).val()) > parseFloat($(this).attr('lastprice'))) {
            $(this).parent().next().addClass('ven_warning_arrow_up').css('display', '');
            $(this).closest('td').find('.lik_up_down_text').text('高');
            $(this).closest('tr').attr('lik_up_down_type', '1');
            $(this).parent().siblings('ul').find('.xs_goods_li_box i').css({
                'display': '',
                'margin': '-3px 8px'
            }).removeClass('ven_warning_arrow').addClass('ven_warning_arrow_up');
        } else if (parseFloat($(this).val()) < parseFloat($(this).attr('lastprice'))) {
            $(this).parent().next().removeClass('ven_warning_arrow_up').css('display', '');
            $(this).closest('td').find('.lik_up_down_text').text('低');
            $(this).closest('tr').attr('lik_up_down_type', '2');
            $(this).parent().siblings('ul').find('.xs_goods_li_box i').css({
                'display': '',
                'margin': '-3px 8px'
            }).removeClass('ven_warning_arrow_up').addClass('ven_warning_arrow');
        } else {
            $(this).parent().next().css('display', 'none');
            $(this).closest('tr').attr('lik_up_down_type', '0');
            $(this).parent().siblings('ul').find('.xs_goods_li_box i').css('display', 'none');
        }
    });
    //商品总价
    function purQuoteCreateGoodCostTotalsFn() {
        var goodsCostTotals = 0;
        $.each($('.tanceng .zj_quote_create_chosen_goods_tbody_content .pur_quote_goods_one_cost_total'), function (i, v) {
            goodsCostTotals += parseFloat($('.tanceng .zj_quote_create_chosen_goods_tbody_content .pur_quote_goods_one_cost_total').eq(i).html());
        });
        $('.tanceng .zj_quote_goods_cost_total').html(moneyToFixed(goodsCostTotals));
        purQuoteCreateProductCostTotalFn();
    }

    //税额总价
    function purQuoteCreateGoodTaxTotalsFn() {
        var goodsTaxTotals = 0;
        $.each($('.tanceng .zj_quote_create_chosen_goods_tbody_content .pur_quote_goods_tax_total'), function (i, v) {
            goodsTaxTotals += parseFloat($('.tanceng .zj_quote_create_chosen_goods_tbody_content .pur_quote_goods_tax_total').eq(i).html());
        });
        $('.tanceng .zj_quote_create_goods_tax_total').html(moneyToFixed(goodsTaxTotals));
        //purQuoteCreateProductCostTotalFn();
    }

    //删除单条商品
    $('.tanceng .zj_quote_create_chosen_goods_tbody_content .pur_quote_create_goods_del_btn').die('click').live('click', function () {
        var index = $(this).closest('tr').index();
        aPurQuoteCreateGoodsChosen.splice(index, 1);
        if (aPurQuoteCreateGoodsChosen.length != 0) {
            $('.tanceng .zj_quote_create_chosen_goods_add_btn_tr').addClass('none');
        } else {
            $('.tanceng .zj_quote_create_chosen_goods_add_btn_tr').removeClass('none');
        }
        $(this).closest('tr').remove();
        purQuoteCreateProductnumChangeFn();
        purQuoteCreateGoodCostTotalsFn();
        // purQuoteCreateGoodTaxTotalsFn();//税额总价
         purQuoteCreateProductCostTotalFn();//总金额计算
        purQuoteCreateGoodsArrOrderFn('zj_quote_create_chosen_goods_tbody_content');

    });
    //选择商品 - 序号
    function purQuoteCreateGoodsArrOrderFn(parentClass) {
        $.each($('.tanceng .' + parentClass + ' .pur_quote_create_choose_goods_order'), function (i, v) {
            $('.tanceng .' + parentClass + ' .pur_quote_create_choose_goods_order').eq(i).html(l_dbl(i + 1));
        })
    }

    /************************新建整机商品借入单 选择整机商品******************************/


    $('.tanceng .zj_quote_create_choose_setting_btn').die('click').live('click', function () {
        CreateChooseSettingSortFn();
        purQuoteSettingGoodsListArr = [];
        $.each($('.tanceng .zj_quote_create_choose_setting_box_list .pur_quote_create_choose_setting_kxp_list'), function (i, v) {
            purQuoteSettingGoodsListArr.push($('.tanceng .pur_quote_create_choose_setting_box_list .pur_quote_create_choose_setting_kxp_list').eq(i).html());
        });
        purQuoteSettingGoodsListValArr = [];
        $.each($('.tanceng .zj_quote_create_choose_setting_box_list .sell_quote_create_setting_cost_one_change'), function (i, v) {
            purQuoteSettingGoodsListValArr.push($('.tanceng .pur_quote_create_choose_setting_box_list .sell_quote_create_setting_cost_one_change').eq(i).val());
        });
    });

    //整机商品分类参数
    var SettingSortData = {
        token: token,
        category: 2, // 类型 1.商品 2.整机商品
        name: '', // 分类名称
        detail: 1 // 是否获取各类型的数量总数 0 否 1 是
    };
//整机商品分类
    function CreateChooseSettingSortFn() {
        $.ajax({
            url: SERVER_URL + '/product-category/list',
            type: 'GET',
            data: SettingSortData,
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                var datalist = oE.dataList;
                if(oE.code==0){
                    var completeCateListHtml = '';
                    $.each(datalist, function (i, v) {
                        completeCateListHtml += '<li data-id="' + v['id'] + '" class="' + (i == 0 ? 'Sideslip_list_on' : '') + '"><span>' + v['name'] + '</span></li>';
                    });
                    $('.zj_quote_create_choose_setting_sort_list').html(completeCateListHtml);
                    getPurQuoteChooseCompleteGoodsListByCateFn($('.zj_quote_create_choose_setting_sort_list li:first-child').data('id'));
                }else{
                    alert(oE.msg);
                }

            },
            error: function (e) {
                alert(e.msg);
                console.log(e);
            }
        });
    }
    //获取整机商品列表参数
    var getCompleteGoodsListData = {
        token: token,
        key: '', //关键字
        page: 1, //页码
        num: 10, //每页数量
        status: 0, //是否启用状态 0正常 1停用
        cate_id: '', //分类id
        is_optional: '' //是否可选配 1 是 2 否
    };
    //选择整机商品分类切换整机商品列表
    $('.tanceng .zj_quote_create_choose_setting_sort_list li').die('click').live('click', function () {
        $('.tanceng .zj_quote_create_choose_setting_search_inp').val('搜索商品编号/商品名称').css('#ccc');
        getCompleteGoodsListData.key = '';
        getCompleteGoodsListData.page = 1;
       getPurQuoteChooseCompleteGoodsListByCateFn($(this).data('id'));
    });
    //获取整机商品列表
    function getPurQuoteChooseCompleteGoodsListFn() {
        $.ajax({
            url: SERVER_URL + '/product-setting/list',
            type: 'GET',
            data: getCompleteGoodsListData,
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                //搜索结果
                $('.tanceng .zj_sell_quote_create_choose_setting_totals').html(oE.totalcount);
                var datalist = oE.datalist;
                if (datalist.length == 0) {
                    $('.tanceng .zj_quote_create_choose_setting_nodata_box').removeClass('none');
                    $('.tanceng .zj_quote_create_choose_setting_handle').addClass('none');
                } else {
                    $('.tanceng .zj_quote_create_choose_setting_nodata_box').addClass('none');
                    $('.tanceng .zj_quote_create_choose_setting_handle').removeClass('none');
                }
                var completeListHtml = '';
                //整机类型
                var completeOptionalName = '';
                $.each(datalist, function (i, v) {
                    //整机类型
                    if (v['is_optional'] == 1) {
                        completeOptionalName = '可选配';
                    } else if (v['is_optional'] == 2) {
                        completeOptionalName = '不可选配';
                    }
                    //列表内容
                    completeListHtml += '<tr completeid="' + v['id'] + '">\
                                        <td><input type="checkbox"></td>\
                                        <td>' + likNullData(v['code_sn']) + '</td>\
                                        <td>' + likNullData(v['name']) + '</td>\
                                        <td>' + completeOptionalName + '</td>\
                                        <td>' + likNullData(v['attr_name']) + '</td>\
                                        <td>' + likNullData(v['remark']) + '</td>\
                                        </tr>'
                });
                //表格主体
                $('.tanceng .zj_quote_create_choose_setting_list').html(completeListHtml);
                //分页
                list_table_render_pagination('.tanceng .zj_quote_create_choose_setting_pagination_page', getCompleteGoodsListData, getPurQuoteChooseCompleteGoodsListFn, oE.totalcount, datalist.length);
            },
            error: function (e) {
                alert(e.msg);
                console.log(e);
            }
        });
    }

    //切换分类调取不同列表 函数
    function getPurQuoteChooseCompleteGoodsListByCateFn(cateid) {
        if (cateid == undefined) {
            $('.zj_quote_create_choose_setting_list').addClass('none');
            $('.pur_quote_create_choose_setting_handle').addClass('none');
            $('.pur_quote_create_choose_setting_nodata_box').removeClass('none');
            return false;
        } else {
            getCompleteGoodsListData.cate_id = cateid;
            $('.zj_quote_create_choose_setting_list').removeClass('none');
            $('.pur_quote_create_choose_setting_handle').removeClass('none');
            $('.pur_quote_create_choose_setting_nodata_box').addClass('none');
        }
        getPurQuoteChooseCompleteGoodsListFn();
    }

//整机商品分类搜索功能
    $('.zj_quote_create_choose_setting_cate_search_btn').die('click').live('click', function () {
        if ($('.tanceng .zj_quote_create_choose_setting_cate_search_inp').val() == '') {
            return false;
        }
        $('.zj_quote_create_choose_setting_inp_add_list').html('<li style="margin-top: 1px;">' + $('.tanceng .zj_quote_create_choose_setting_cate_search_inp').val() + ' <i></i></li>');
        SettingSortData.name = $('.tanceng .zj_quote_create_choose_setting_cate_search_inp').val();
        CreateChooseSettingSortFn();
        $('.tanceng .zj_quote_create_choose_setting_cate_search_inp').val('').attr('readonly', true);
    });
    //整机商品分类搜索 - 删除关键字
    $('.zj_quote_create_choose_setting_inp_add_list li i').die('click').live('click', function () {
        $(this).closest('li').remove();
        $('.tanceng .zj_quote_create_choose_setting_cate_search_inp').val('').attr('readonly', false);
        SettingSortData.name = '';
        CreateChooseSettingSortFn();
    });

    //整机商品 - 搜索关键字
    $('.tanceng .zj_quote_create_choose_setting_search_btn').die('click').live('click', function () {
        if ($('.tanceng .zj_quote_create_choose_setting_search_inp').val() == '搜索商品编号/商品名称') {
            alert('请输入搜索关键字');
            getCompleteGoodsListData.key = '';
        } else {
            getCompleteGoodsListData.key = $('.tanceng .zj_quote_create_choose_setting_search_inp').val();
        }
        getPurQuoteChooseCompleteGoodsListFn();
    });
    //整机商品 - 搜索整机类型
    $('.tanceng .zj_quote_create_choose_optional_list li').die('click').live('click', function () {
        getCompleteGoodsListData.is_optional = $(this).data('id');
        getPurQuoteChooseCompleteGoodsListFn();
    });
/********************选择整机商品 - 保存******************************/
    $('.tanceng .zj_quote_create_choose_setting_save').die('click').live('click', function () {
        $.each($('.tanceng .zj_quote_create_choose_setting_list tr'), function (i, v) {
            if ($('.tanceng .zj_quote_create_choose_setting_list tr').eq(i).find('input:checkbox').is(':checked')) {
                aPurQuoteCreateSettingChosen.push($('.tanceng .zj_quote_create_choose_setting_list tr').eq(i).attr('completeid'));
            }
        });
        aPurQuoteCreateSettingChosen = getJsonArr(aPurQuoteCreateSettingChosen);
        if (aPurQuoteCreateSettingChosen.length != 0) {
            $('.tanceng .zj_quote_create_chosen_setting_add_btn_tr').addClass('none');
        } else {
            $('.tanceng .zj_quote_create_chosen_setting_add_btn_tr').removeClass('none');
        }

        $(this).closest('.dialog_box').remove();
        //整机商品选择后展示列表
        var aPurQuoteCreateSettingChosenHtml = '';
        if (aPurQuoteCreateSettingChosen.length > 0) {
            $('.tanceng .zj_quote_choose_setting_hj_head').addClass('none');
            $.each(aPurQuoteCreateSettingChosen, function (i, v) {

                //税率
                var taxNum = 0;
                if ($('.tanceng .zj_contain_tax_val_ratio').val() == '含税17%') {
                    taxNum = 17;
                } else if ($('.tanceng .zj_contain_tax_val_ratio').val() == '无税') {
                    taxNum = 0;
                }
                //配件商品信息
                var sellQuoteCreateSettingGoodsList = '';
                $.ajax({
                    url: SERVER_URL + '/product-setting/loadsetting',
                    type: 'GET',
                    data: {
                        token: token,
                        id: v,
                        detail: 1
                    },
                    async: false,
                    dataType: 'json',
                    success: function (oE) {
                        if (oE.code == 0) {
                            var data = oE.data;
                            console.log('000000');
                            console.log(data);
                            console.log('000000');
                            if (data.is_optional == 1) {
                                //可选配

                                //可选配详情
                                var purQuoteSettingInfo = '';
                                $.each(data['setting_info'], function (i2, v2) {
                                    if(v2['cate_name']==null){
                                        return true;
                                    }
                                    var purQuoteSettingChild = '';
                                    $.each(v2['list'], function (i3, v3) {

                                        //商品属性
                                        var purQuoteSettingChildAttr = '';
                                        $.each(v3['attributes'], function (i4, v4) {

                                            purQuoteSettingChildAttr += v4['value'] + '/';
                                        });

                                        purQuoteSettingChildAttr = purQuoteSettingChildAttr.substr(0, purQuoteSettingChildAttr.length - 1);

                                        purQuoteSettingChild += '<tr>\
                                                <td>' + v3['code_sn'] + '</td>\
                                                <td>' + purQuoteSettingChildAttr + '</td>\
                                                <td>\
                                                <div class="num_input inline_block num_input_new"><button class="but_grey_a but_opa_small inp_plus pur_quote_create_setting_child_num_change_btn">+</button><input class="pur_quote_create_setting_child_num" type="text" value="1" style="width: 32px;"><button class="but_grey_a but_opa_small radius_left_0 inp_reduce pur_quote_create_setting_child_num_change_btn">-</button></div>\
                                                </td>\
                                                <td class="pur_quote_create_setting_child_one_num_total">1</td>\
                                                <td><input type="text" class="lik_input_number time_input xs_xsbjd_inp_60 pur_quote_create_setting_child_one_cost" value="0" onfocus="fn_focus(this);" onblur="fn_blur(this);" style="color: rgb(204, 204, 204);">\
                                                </td>\
                                                <td class="pur_quote_create_setting_child_one_tax">' + taxNum + '</td>\
                                                <td class="pur_quote_create_setting_child_one_cost_hsj">0</td>\
                                                <td class="pur_quote_create_setting_child_one_cost_total">0</td>\
                                                <td>\
                                                <button class="but_opa_small c_r">-</button>\
                                                </td>\
                                                </tr>'
                                    });
                                    /*console.log(purQuoteSettingChild);*/
                                    purQuoteSettingInfo += '<div class="box_open_list">\
                                        <p class="box_open_head" style="background: rgb(255, 255, 255); border-radius: 3px;">\
                                        <span>' + v2['cate_name'] + '</span>\
                                        </p>\
                                        <div class="div_1 container">\
                                        <div class="div_1 table-container">\
                                        <table>\
                                        <thead>\
                                        <tr>\
                                        <th width="140">商品编号</th>\
                                        <th width="299">属性</th>\
                                        <th width="90">单个整机数量</th>\
                                        <th width="45">总数</th>\
                                        <th width="120">单价(元)</th>\
                                        <th width="63">税率(%)</th>\
                                        <th width="85">含税价(元)</th>\
                                        <th width="85">总价(元)</th>\
                                        <th width="">操作</th>\
                                        </tr>\
                                        </thead>\
                                        <tbody> ' + purQuoteSettingChild + '\
                                        <tr class="table_total">\
                                        <td>合计</td>\
                                        <td></td>\
                                        <td></td>\
                                        <td class="c_r pur_quote_create_setting_child_num_total">0</td>\
                                        <td></td>\
                                        <td></td>\
                                        <td></td>\
                                        <td class="pur_quote_create_setting_child_cost_hj_total">0</td>\
                                        <td></td>\
                                        </tr>\
                                        </tbody>\
                                        </table>\
                                        </div>\
                                        </div>\
                                        </div>'
                                });

                                aPurQuoteCreateSettingChosenHtml += '<div class="pur_quote_create_choose_setting_one_box_list" settingsign="settingkxp_' + data['id'] + '" style="margin-bottom:15px;">\
                                    <div class="div_1 container">\
                                    <div class="div_1 table-container">\
                                    <table>\
                                    <thead>\
                                    <tr>\
                                    <th width="32">序号</th>\
                                    <th width="110">整机商品名称</th>\
                                    <th width="120">整机商品编号</th>\
                                    <th width="55">基本单位</th>\
                                    <th width="215">属性</th>\
                                    <th width="85">数量</th>\
                                    <th width="120">单价</th>\
                                    <th width="63">税率(%)</th>\
                                <th width="85">含税价(元)</th>\
                                    <th width="85">总价(元)</th>\
                                    <th width="70">操作</th>\
                                    </tr>\
                                    </thead>\
                                    <tbody>\
                                    <tr settingid="' + data['id'] + '">\
                                    <td>' + l_dbl(i + 1) + '</td>\
                                    <td class="xs_f_color val_dialogTop" name="cg_cgbjd_xzsp">' + data['cate_name'] + '</td>\
                                    <td>' + data['code_sn'] + '</td>\
                                    <td>' + data['unit_name'] + '</td>\
                                    <td>' + data['attr_name'] + '</td>\
                                    <td>\
                                    <div class="xs_num_input num_input inline_block num_input_new">\
                                    <button class="but_blue but_opa_small inp_plus pur_quote_create_setting_parent_num_change_btn">+</button><input type="text" value="1" class="pur_quote_create_setting_parent_num" style="border:1px solid #23a2f3;"><button class="but_blue but_opa_small radius_left_0 inp_reduce pur_quote_create_setting_parent_num_change_btn">-</button>\
                                    </div>\
                                    </td>\
                                    <td class="xs_goods_box" style="position: relative;">\
                                    <div class="xs_goods_big_box">\
                                    <div class="inline_block select_100">\
                                    <input type="text" class="c_3 lik_input_number time_input xs_bjd_inp xs_xsbjd_inp_60 pur_quote_create_setting_cost_one_change" value="0" style="color: rgb(153, 153, 153);margin-right: 10px;">\
                                    </div>\
                                    </div>\
                                    </td>\
                                    <td><span class="">' + taxNum + '</span></td>\
                                    <td><span class="pur_quote_create_setting_parent_one_cost_hsj">0</span></td>\
                                    <td><span class="pur_quote_create_setting_parent_one_cost_total">0</span></td>\
                                    <td>\
                                    <button class="but_blue but_opa_small but_green val_dialogTop zj_quote_create_choose_setting_btn" name="takenote_jrd_xzzjsp">+</button><button class="but_opa_small but_red pur_quote_create_goods_del_btn">-</button>\
                                    </td>\
                                    </tr>\
                                    </tbody>\
                                    </table>\
                                    </div>\
                                    </div>\
                                    <div class="xs_xsbjd_table_t2">\
                                    <div class="table_t2" style="position: relative;">\
                                    <span class="cont_title" style="border-left: 4px;padding-left: 10px;margin-left: 0;border-left: 5px solid #23a2f3;">配件内容</span><span class="c_9">(您必须把配件价格标明，配件合计必须等于整机单价)</span>\
                                    <button class="but_icon_plus_white but_small but_blue val_dialogTop zj_quote_create_choose_setting_goods_btn" name="takenote_bjd_xzpzsp" settingsign="settingkxp_' + data['id'] + '" settingid="' + data['id'] + '" style="position:absolute;right:80px;top:12px;"><i></i>选择配件</button>\
                                    <span class="box_open_btn" style="right: 13px;">收起 <i class="right icon_show"></i></span>\
                                    </div>\
                                    <div class="goods_tc_toggle">\
                                    <div style="overflow: hidden;margin: 10px;">\
                                    <div class="cg_bjd_pjnr1"><span class="c_3">整机单价：<span class="pur_quote_create_setting_price_one">0</span>元</span>\
                                </div>\
                                <div class="cg_bjd_pjnr1"><span class="c_g">已标记：<span class="pur_quote_create_setting_price_one_yes">0</span>元</span>\
                                </div>\
                                <div class="cg_bjd_pjnr1"><span class="c_r">未标记：<span class="pur_quote_create_setting_price_one_no">0</span>元</span>\
                                </div>\
                                </div><div class="pur_quote_create_setting_kxp_child_list settingkxp_' + data['id'] + '"></div></div>\
                                    </div>\
                                    </div>';
                            } else if (data.is_optional == 2) {
                                //不可选配

                                //不可选配详情
                                var purQuoteSettingInfo = '';
                                $.each(data['setting_info'], function (i2, v2) {
                                    if(v2['cate_name']==null){
                                        return true;
                                    }
                                    var purQuoteSettingChild = '';
                                    $.each(v2['list'], function (i3, v3) {
                                        var lastPrice = getPurLastPrice(v3['id']);
                                        //商品属性
                                        var purQuoteSettingChildAttr = '';
                                        $.each(v3['attributes'], function (i4, v4) {
                                            purQuoteSettingChildAttr += v4['value'] + '/';
                                        });
                                        purQuoteSettingChildAttr = purQuoteSettingChildAttr.substr(0, purQuoteSettingChildAttr.length - 1);
                                        purQuoteSettingChild += '<tr settinggoodsid="' + v3['id'] + '">\
                                                <td>' + v3['code_sn'] + '</td>\
                                                <td>' + purQuoteSettingChildAttr + '</td>\
                                                <td>\
                                                <div class="num_input inline_block num_input_new"><button class="but_grey_a but_opa_small inp_plus pur_quote_create_setting_child_num_change_btn">+</button><input class="pur_quote_create_setting_child_num" type="text" value="1" style="width: 32px;"><button class="but_grey_a but_opa_small radius_left_0 inp_reduce pur_quote_create_setting_child_num_change_btn">-</button></div>\
                                                </td>\
                                                <td class="pur_quote_create_setting_child_one_num_total">1</td>\
                                                <td class="xs_goods_box" style="position: relative;">                                    <div class="xs_goods_big_box">                                    <div class="inline_block select_100">    <input type="text" class="lik_input_number time_input xs_xsbjd_inp_60 pur_quote_create_setting_child_one_cost" lastprice="' + lastPrice + '" value="0" onfocus="fn_focus(this);" onblur="fn_blur(this);" style="color: rgb(204, 204, 204);"></div>                       <i class="ven_warning_arrow xs_goods_down_img ven_warning_arrow_up" style="margin: 0px; position: absolute; top: 21px; right: 12px;display:none;"></i>             </div>        \
                                                <div class="work_vent_client_contMsgBox" style="display: none; left:124px;"><i class="work_vent_client_torr"></i><div class="work_vent_client_contMsgBoxDet fnc_output_ticket_total_remain_ticket_num_list"><span class="lik_up_down_text"></span>于 ' + lastPrice + '(上次报价)</div></div>\
                                                </td>\
                                                <td class="pur_quote_create_setting_child_one_tax">' + taxNum + '</td>\
                                                <td class="pur_quote_create_setting_child_one_cost_hsj">0</td>\
                                                <td class="pur_quote_create_setting_child_one_cost_total">0</td>\
                                                </tr>'
                                    });
                                    purQuoteSettingInfo += '<div class="box_open_list">\
                                        <p class="box_open_head" style="background: rgb(255, 255, 255); border-radius: 3px;">\
                                        <span>' + v2['cate_name'] + '</span>\
                                        </p>\
                                        <div class="div_1 container">\
                                        <div class="div_1 table-container">\
                                        <table>\
                                        <thead>\
                                        <tr>\
                                        <th width="140">商品编号</th>\
                                        <th width="299">属性</th>\
                                        <th width="90">单个整机数量</th>\
                                        <th width="45">总数</th>\
                                        <th width="120">单价(元)</th>\
                                        <th width="63">税率(%)</th>\
                                        <th width="85">含税价(元)</th>\
                                        <th width="85">总价(元)</th>\
                                        </tr>\
                                        </thead>\
                                        <tbody> ' + purQuoteSettingChild + '\
                                        <tr class="table_total">\
                                        <td>合计</td>\
                                        <td></td>\
                                        <td></td>\
                                        <td class="c_r pur_quote_create_setting_child_num_total">0</td>\
                                        <td></td>\
                                        <td></td>\
                                        <td></td>\
                                        <td class="pur_quote_create_setting_child_cost_hj_total">0</td>\
                                        </tr>\
                                        </tbody>\
                                        </table>\
                                        </div>\
                                        </div>\
                                        </div>'
                                });

                                aPurQuoteCreateSettingChosenHtml += '<div class="pur_quote_create_choose_setting_one_box_list" style="margin-bottom:15px;">\
                                    <div class="div_1 container">\
                                    <div class="div_1 table-container">\
                                    <table>\
                                    <thead>\
                                    <tr>\
                                    <th width="32">序号</th>\
                                    <th width="110">整机商品名称</th>\
                                    <th width="120">整机商品编号</th>\
                                    <th width="55">基本单位</th>\
                                    <th width="215">属性</th>\
                                    <th width="85">数量</th>\
                                    <th width="120">单价</th>\
                                    <th width="63">税率(%)</th>\
                                <th width="85">含税价(元)</th>\
                                    <th width="85">总价(元)</th>\
                                    <th width="70">操作</th>\
                                    </tr>\
                                    </thead>\
                                    <tbody>\
                                    <tr settingid="' + data['id'] + '">\
                                    <td>' + l_dbl(i + 1) + '</td>\
                                    <td class="xs_f_color val_dialogTop" name="cg_cgbjd_xzsp">' + data['cate_name'] + '</td>\
                                    <td>' + data['code_sn'] + '</td>\
                                    <td>' + data['unit_name'] + '</td>\
                                    <td>' + data['attr_name'] + '</td>\
                                    <td>\
                                    <div class="xs_num_input num_input inline_block num_input_new">\
                                    <button class="but_blue but_opa_small inp_plus pur_quote_create_setting_parent_num_change_btn">+</button><input type="text" value="1" class="pur_quote_create_setting_parent_num" style="border:1px solid #23a2f3;"><button class="but_blue but_opa_small radius_left_0 inp_reduce pur_quote_create_setting_parent_num_change_btn">-</button>\
                                    </div>\
                                    </td>\
                                    <td class="xs_goods_box" style="position: relative;">\
                                    <div class="xs_goods_big_box">\
                                    <div class="inline_block select_100">\
                                    <input type="text" class="c_3 lik_input_number time_input xs_bjd_inp xs_xsbjd_inp_60 pur_quote_create_setting_cost_one_change" value="0" style="color: rgb(153, 153, 153);margin-right: 10px;">\
                                    </div>\
                                    </div>\
                                    </td>\
                                    <td><span class="">' + taxNum + '</span></td>\
                                    <td><span class="pur_quote_create_setting_parent_one_cost_hsj">0</span></td>\
                                    <td><span class="pur_quote_create_setting_parent_one_cost_total">0</span></td>\
                                    <td>\
                                    <button class="but_blue but_opa_small but_green val_dialogTop zj_quote_create_choose_setting_btn" name="takenote_jrd_xzzjsp">+</button><button class="but_opa_small but_red pur_quote_create_goods_del_btn">-</button>\
                                    </td>\
                                    </tr>\
                                    </tbody>\
                                    </table>\
                                    </div>\
                                    </div>\
                                    <div class="xs_xsbjd_table_t2">\
                                    <div class="table_t2" style="position: relative;">\
                                    <span class="cont_title" style="border-left: 4px;padding-left: 10px;margin-left: 0;border-left: 5px solid #23a2f3;">配件内容</span><span class="c_9">(您必须把配件价格标明，配件合计必须等于整机单价)</span>\
                                    <span class="box_open_btn" style="right: 13px;">收起 <i class="right icon_show"></i></span>\
                                    </div>\
                                    <div class="goods_tc_toggle">\
                                    <div style="overflow: hidden;margin: 10px;">\
                                    <div class="cg_bjd_pjnr1"><span class="c_3">整机单价：<span class="pur_quote_create_setting_price_one">0</span>元</span>\
                                </div>\
                                <div class="cg_bjd_pjnr1"><span class="c_g">已标记：<span class="pur_quote_create_setting_price_one_yes">0</span>元</span>\
                                </div>\
                                <div class="cg_bjd_pjnr1"><span class="c_r">未标记：<span class="pur_quote_create_setting_price_one_no">0</span>元</span>\
                                </div>\
                                </div>' + purQuoteSettingInfo + '</div>\
                                    </div>\
                                    </div>';
                            }
                        }
                    },
                    error: function (e) {
                        console.log(e);
                        alert(e.msg);
                    }
                });
            });
        } else {
            $('.tanceng .zj_quote_choose_setting_hj_head').removeClass('none');
        }
        $('.tanceng .zj_quote_create_choose_setting_box_list').html(aPurQuoteCreateSettingChosenHtml);
        //原有配件商品
        $.each($('.tanceng .zj_quote_create_choose_setting_box_list .pur_quote_create_choose_setting_kxp_list'), function (i, v) {
            $('.tanceng .zj_quote_create_choose_setting_box_list .pur_quote_create_choose_setting_kxp_list').eq(i).html(purQuoteSettingGoodsListArr[i]);
        });
        //原有配件商品的value值
        $.each($('.tanceng .zj_quote_create_choose_setting_box_list .sell_quote_create_setting_cost_one_change'), function (i, v) {
            $('.tanceng .zj_quote_create_choose_setting_box_list .sell_quote_create_setting_cost_one_change').eq(i).val(purQuoteSettingGoodsListValArr[i]);
            if ($('.tanceng .zj_quote_create_choose_setting_box_list .sell_quote_create_setting_cost_one_change').eq(i).val() == '') {
                $('.tanceng .zj_quote_create_choose_setting_box_list .sell_quote_create_setting_cost_one_change').eq(i).val(0);
            }
        });
        purQuoteCreateSettingNumFn();
    });
//获取上次报价函数
    function getPurLastPrice(goodsId) {
        var lastPrice = 0;
        $.ajax({
            url: SERVER_URL + '/quote/goodhislist',
            type: 'GET',
            data: {
                token: token,
                good_id: goodsId, // 商品id
                thetype: 2 // 1销售普通商品 2 采购普通商品
            },
            async: false,
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                if (oE.code == 0) {
                    lastPrice = oE.data.price
                }
            },
            error: function (e) {
                alert('服务器错误，请稍后再试');
                console.log(e);
            }
        });
        return lastPrice ? lastPrice : 0;
    }
    //整机商品数量价格控制函数
    function purQuoteCreateSettingNumFn() {
        //子商品单条数量
        var $_settingChildOneNum = $('.tanceng .zj_quote_create_choose_setting_box_list .pur_quote_create_setting_child_one_num_total');
        $.each($_settingChildOneNum, function (i, v) {
            $_settingChildOneNum.eq(i).html(parseFloat($_settingChildOneNum.eq(i).closest('.pur_quote_create_choose_setting_one_box_list').find('.pur_quote_create_setting_parent_num').val()) * parseFloat($_settingChildOneNum.eq(i).closest('tr').find('.pur_quote_create_setting_child_num').val()))
        });
        //子商品数量总和
        var $_settingChildNumTotal = $('.tanceng .zj_quote_create_choose_setting_box_list .pur_quote_create_setting_child_num_total');
        $.each($_settingChildNumTotal, function (i, v) {
            var settingChildNumTotal = 0;
            $.each($_settingChildNumTotal.eq(i).closest('tbody').find('.pur_quote_create_setting_child_one_num_total'), function (i2, v2) {
                settingChildNumTotal += parseFloat($_settingChildNumTotal.eq(i).closest('tbody').find('.pur_quote_create_setting_child_one_num_total').eq(i2).text());
            });
            $_settingChildNumTotal.eq(i).html(settingChildNumTotal);
        });
        //整机商品含税价
        var $_settingParentCostHsj = $('.tanceng .zj_quote_create_choose_setting_box_list .pur_quote_create_setting_parent_one_cost_hsj');
        $.each($_settingParentCostHsj, function (i, v) {
            $_settingParentCostHsj.eq(i).html(moneyToFixed((parseFloat($_settingParentCostHsj.eq(i).closest('td').prev().text()) + 100) * parseFloat($_settingParentCostHsj.eq(i).closest('td').prev().prev().find('input').val()) / 100));
        });
        //整机商品单条总价
        var $_settingParentOneCostTotal = $('.tanceng .zj_quote_create_choose_setting_box_list .pur_quote_create_setting_parent_one_cost_total');
        $.each($_settingParentOneCostTotal, function (i, v) {
            $_settingParentOneCostTotal.eq(i).html(moneyToFixed(parseFloat($_settingParentOneCostTotal.eq(i).closest('td').prev().text()) * parseFloat($_settingParentOneCostTotal.eq(i).closest('tr').find('input.pur_quote_create_setting_parent_num').val())));
        });
        //整机商品包含商品单条含税价
        var $_settingChildCostHsj = $('.tanceng .zj_quote_create_choose_setting_box_list .pur_quote_create_setting_child_one_cost_hsj');
        $.each($_settingChildCostHsj, function (i, v) {
            $_settingChildCostHsj.eq(i).html(moneyToFixed((parseFloat($_settingChildCostHsj.eq(i).closest('td').prev().text()) + 100) * parseFloat($_settingChildCostHsj.eq(i).closest('td').prev().prev().find('input').val()) / 100));
        });
        //整机商品包含商品单条总价
        var $_settingChildOneCostTotal = $('.tanceng .zj_quote_create_choose_setting_box_list .pur_quote_create_setting_child_one_cost_total');
        $.each($_settingChildOneCostTotal, function (i, v) {
            $_settingChildOneCostTotal.eq(i).html(moneyToFixed(parseFloat($_settingChildOneCostTotal.eq(i).closest('td').prev().text()) * parseFloat($_settingChildOneCostTotal.eq(i).closest('tr').find('.pur_quote_create_setting_child_one_num_total').text())));
        });
        //整机商品包含商品总价
        var $_settingChildCostHjTotal = $('.tanceng .zj_quote_create_choose_setting_box_list .pur_quote_create_setting_child_cost_hj_total');
        $.each($_settingChildCostHjTotal, function (i, v) {
            var settingChildCostTotal = 0;
            $.each($_settingChildCostHjTotal.eq(i).closest('tbody').find('.pur_quote_create_setting_child_one_num_total'), function (i2, v2) {
                settingChildCostTotal += parseFloat($_settingChildCostHjTotal.eq(i).closest('tbody').find('.pur_quote_create_setting_child_one_cost_total').eq(i2).text());
            });
            $_settingChildCostHjTotal.eq(i).html(moneyToFixed(settingChildCostTotal));
        });

        //已标记总和
        var $_settingYbj = $('.tanceng .zj_quote_create_choose_setting_box_list .pur_quote_create_setting_price_one_yes');
        $.each($_settingYbj, function (i, v) {
            var costYbj = 0;
            var $_costYbj = $_settingYbj.eq(i).closest('.pur_quote_create_choose_setting_one_box_list').find('.pur_quote_create_setting_child_one_cost');
            $.each($_costYbj, function (i2, v2) {
                costYbj += parseFloat($_costYbj.eq(i2).val()) * parseFloat($_costYbj.eq(i2).closest('tr').find('.pur_quote_create_setting_child_num').val());
            });
            $_settingYbj.eq(i).html(costYbj);
        });
        //未标记总和
        var $_settingWbj = $('.tanceng .zj_quote_create_choose_setting_box_list .pur_quote_create_setting_price_one_no');
        $.each($_settingWbj, function (i, v) {
            $_settingWbj.eq(i).html($_settingWbj.eq(i).closest('.goods_tc_toggle').find('.pur_quote_create_setting_price_one').text() - $_settingYbj.eq(i).text())
        });

        //整机总合计信息
        var settingNumTotalHj = 0;
        var settingCostTotalHj = 0;
        $.each($('.tanceng .zj_quote_create_choose_setting_box_list .pur_quote_create_choose_setting_one_box_list'), function (i, v) {
            settingNumTotalHj += parseFloat($('.tanceng .zj_quote_create_choose_setting_box_list .pur_quote_create_choose_setting_one_box_list').eq(i).find('.pur_quote_create_setting_parent_num').val());
            settingCostTotalHj += parseFloat($('.tanceng .zj_quote_create_choose_setting_box_list .pur_quote_create_choose_setting_one_box_list').eq(i).find('.pur_quote_create_setting_parent_one_cost_total').text());
        });
        $('.tanceng .zj_quote_create_setting_num_total_hj').text(settingNumTotalHj);
        $('.tanceng .zj_quote_create_setting_cost_total_hj').text(moneyToFixed(settingCostTotalHj));

        purQuoteCreateProductCostTotalFn();

    }
    //整机商品修改整机数量zj_quote_create_choose_setting_box_list
    $('.tanceng .zj_quote_create_choose_setting_box_list .pur_quote_create_setting_parent_num_change_btn').die('click').live('click', function () {
        purQuoteCreateSettingNumFn();
    });
   /******************整机商品修改整机单价*************/
    $('.tanceng .zj_quote_create_choose_setting_box_list .pur_quote_create_setting_cost_one_change').die('keyup').live('keyup', function () {
        $('.tanceng .zj_quote_create_choose_setting_box_list .pur_quote_create_setting_price_one').each(function (i, v) {
            $('.tanceng .zj_quote_create_choose_setting_box_list .pur_quote_create_setting_price_one').eq(i).html($('.tanceng .zj_quote_create_choose_setting_box_list .pur_quote_create_setting_price_one').eq(i).closest('.pur_quote_create_choose_setting_one_box_list').find('.pur_quote_create_setting_cost_one_change').val());
        });
        purQuoteCreateSettingNumFn();
    });
    //整机商品修改包含商品单价
    $('.tanceng .zj_quote_create_choose_setting_box_list .pur_quote_create_setting_child_one_cost').die('keyup').live('keyup', function () {
        purQuoteCreateSettingNumFn();
        //与上次报价相比
        if (parseFloat($(this).val()) > parseFloat($(this).attr('lastprice'))) {
            $(this).parent().next().addClass('ven_warning_arrow_up').css('display', '');
            $(this).closest('td').find('.lik_up_down_text').text('高');
            $(this).closest('tr').attr('lik_up_down_type', '1');
            $(this).parent().siblings('ul').find('.xs_goods_li_box i').css({
                'display': '',
                'margin': '-3px 8px'
            }).removeClass('ven_warning_arrow').addClass('ven_warning_arrow_up');
        } else if (parseFloat($(this).val()) < parseFloat($(this).attr('lastprice'))) {
            $(this).parent().next().removeClass('ven_warning_arrow_up').css('display', '');
            $(this).closest('td').find('.lik_up_down_text').text('低');
            $(this).closest('tr').attr('lik_up_down_type', '2');
            $(this).parent().siblings('ul').find('.xs_goods_li_box i').css({
                'display': '',
                'margin': '-3px 8px'
            }).removeClass('ven_warning_arrow_up').addClass('ven_warning_arrow');
        } else {
            $(this).parent().next().css('display', 'none');
            $(this).closest('tr').attr('lik_up_down_type', '0');
            $(this).parent().siblings('ul').find('.xs_goods_li_box i').css('display', 'none');
        }
        /*$('.tanceng .pur_quote_create_choose_setting_box_list .pur_quote_create_setting_price_one').each(function (i, v) {
         $('.tanceng .pur_quote_create_choose_setting_box_list .pur_quote_create_setting_price_one').eq(i).html($('.tanceng .pur_quote_create_choose_setting_box_list .pur_quote_create_setting_price_one').eq(i).closest('.pur_quote_create_choose_setting_one_box_list').find('.pur_quote_create_setting_cost_one_change').val());
         });*/
    });
    //整机商品修改包含商品数量
    $('.tanceng .zj_quote_create_choose_setting_box_list .pur_quote_create_setting_child_num_change_btn').die('click').live('click', function () {
        purQuoteCreateSettingNumFn();
    });

    //选择搭配商品
    $('.tanceng .zj_quote_create_choose_setting_goods_btn').die('click').live('click', function () {
        var settingId = $(this).attr('settingid');
        var settingSignCurrent = $(this).attr('settingsign');
        $('.tanceng .zj_quote_create_choose_setting_child_save_btn').data('settingsign', settingSignCurrent);
        $.ajax({
            url: SERVER_URL + '/product-setting/loadsetting',
            type: 'GET',
            data: {
                token: token,
                id: settingId,
                detail: 1
            },
            async: false,
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var data = oE.data;

                    console.log('00');
                    console.log(data);
                    console.log('00');
                    //整机商品编号
                    $('.tanceng .zj_quote_create_choose_setting_code_sn').html(data['code_sn']);
                    //整机商品名称
                    $('.tanceng .zj_quote_create_choose_setting_goods_parent_name').html(data['name']);
                    //整机类型
                    if (data['is_optional'] == 1) {
                        $('.tanceng .zj_quote_create_choose_setting_is_optional').html('可选配');
                    } else if (data['is_optional'] == 2) {
                        $('.tanceng .zj_quote_create_choose_setting_is_optional').html('不可选配');
                    }
                    //备注
                    $('.tanceng .zj_quote_create_choose_setting_remark').html(data['remark']);
                    //选配说明
                    $('.tanceng .zj_quote_create_choose_setting_introductions').html(data['introductions']);
                    var settingInfo = data['setting_info'];
                    var settingHtmlLeft = '';
                    var settingHtmlRight = '';
                    $.each(settingInfo, function (i, v) {
                        if(v['cate_name']==null){

                            return true;
                        }
                        var settingGoodsHtml = '';
                        $.each(v['list'], function (i2, v2) {

                            var settingGoodsAttr = '';
                            $.each(v2['attributes'], function (i3, v3) {
                                settingGoodsAttr += v3['value'] + '/';
                            });
                            settingGoodsAttr = settingGoodsAttr.slice(0, settingGoodsAttr.length - 1);
                            settingGoodsHtml += '<tr settinggoodsid="' + v2['id'] + '">\
                                                <td><input class="pur_quote_create_setting_list_checkbox" type="checkbox"></td>\
                                                <td>' + v2['code_sn'] + '</td>\
                                                <td><p class="xiangmu_p4">' + settingGoodsAttr + '</p></td>\
                                                </tr>'
                        });
                        settingHtmlLeft += '<div class="box_Open" style="width:100%;border-left:1px solid #e7eaec;border-right:1px solid #e7eaec;margin-bottom:10px;">\
                                                <p class="box_open_head" style="padding-left:8px;">' + likNullData(v['cate_name']) + '<span class="box_open_btn" style="right: 10px;">收起 <i class="right icon_show"></i></span>\
                                                </p>\
                                                <div class="box_open_list">\
                                                <table class="xs_bjd_choose_bhsp">\
                                                <thead>\
                                                <th width="32">选择</th>\
                                                <th width="120">商品编号</th>\
                                                <th width="370">属性</th>\
                                                </thead>\
                                                <tbody settingsign="set' + (i + 1) + '" class="set' + (i + 1) + '">' + settingGoodsHtml + '</tbody>\
                                                </table>\
                                                </div>\
                                            </div>';
                        settingHtmlRight += '<div class="box_Open" style="width:100%;border-left:1px solid #e7eaec;border-right:1px solid #e7eaec;margin-bottom:10px;">\
                                                <p class="box_open_head" style="padding-left:8px;">' + likNullData(v['cate_name']) + '<span class="box_open_btn" style="right: 10px;">收起 <i class="right icon_show"></i></span>\
                                                </p>\
                                                <div class="box_open_list">\
                                                <table class="xs_bjd_choose_bhsp">\
                                                <thead>\
                                                <th width="32">选择</th>\
                                                <th width="120">商品编号</th>\
                                                <th width="371">属性</th>\
                                                <th width="100">数量</th>\
                                                <th width="30">操作</th>\
                                                </thead>\
                                                <tbody settingsign="set' + (i + 1) + '" class="set' + (i + 1) + '" catename="' + v['cate_name'] + '"></tbody>\
                                                </table>\
                                                </div>\
                                            </div>';
                    });
                    $('.tanceng .zj_quote_create_setting_list_left').html(settingHtmlLeft);
                    $('.tanceng .zj_quote_create_setting_list_right').html(settingHtmlRight);
                }
            },
            error: function (e) {
                console.log(e);
                alert(e.msg);
            }
        });
    });
    $('.tanceng .zj_quote_create_setting_list_left .pur_quote_create_setting_list_checkbox').die('click').live('click', function () {
        var currentTbodyClass = $(this).closest('tbody').attr('settingsign');
        var $_this = $(this);
        var settingGoodsChosen = '';
        $.each($_this.closest('tbody').find('tr'), function (i, v) {
            if ($_this.closest('tbody').find('tr').eq(i).find('input:checkbox').is(':checked')) {
                settingGoodsChosen += '<tr index="' + i + '" settinggoodsid="' + $_this.closest('tbody').find('tr').eq(i).attr('settinggoodsid') + '">\
                                        <td>' + l_dbl(i + 1) + '</td>\
                                        <td>' + $_this.closest('tbody').find('tr').eq(i).find('td').eq(1).html() + '</td>\
                                        <td>' + $_this.closest('tbody').find('tr').eq(i).find('td').eq(2).html() + '</td>\
                                        <td style=""><div class="xs_num_input num_input inline_block num_input_new"><button class="but_grey_a but_opa_small inp_plus">+</button><input style="border-color: #ccc;" type="text" value="1"><button class="but_grey_a but_opa_small radius_left_0 inp_reduce">-</button></div></td>\
                                        <td style="padding: 0 1em;"><button class="but_opa_small but_red_a pur_quote_create_setting_list_right_del_btn">-</button></td>\
                                        </tr>'
            }
        });
        $('.tanceng .zj_quote_create_setting_list_right').find('.' + currentTbodyClass).html(settingGoodsChosen);
        tbodyTrSortFn();
    });
    //tbody中tr序号
    function tbodyTrSortFn() {
        $.each($('.tanceng .zj_quote_create_setting_list_right tbody tr'), function (i, v) {
            $('.tanceng .zj_quote_create_setting_list_right tbody tr').eq(i).find('td').eq(0).html(l_dbl($('.tanceng .zj_quote_create_setting_list_right tbody tr').eq(i).index() + 1))
        });
    }

    //删除配件商品
    $('.tanceng .zj_quote_create_setting_list_right .pur_quote_create_setting_list_right_del_btn').die('click').live('click', function () {
        var index = $(this).closest('tr').attr('index');
        var curTbodySign = $(this).closest('tbody').attr('settingsign');
        $('.tanceng .zj_quote_create_setting_list_left .' + curTbodySign).find('input:checkbox').eq(index).attr('checked', false);
        $(this).closest('tr').remove();
        tbodyTrSortFn();
    });

    //选择搭配商品保存
    $('.tanceng .zj_quote_create_choose_setting_child_save_btn').die('click').live('click', function () {
        var settingChildKxpGoodsArr = [];
        var taxNum = 0;
        if ($('.tanceng .zj_contain_tax_val_ratio').val() == '含税17%') {
            taxNum = 17;
        } else if ($('.tanceng .zj_contain_tax_val_ratio').val() == '无税') {
            taxNum = 0;
        }
        var setParentSign = $(this).data('settingsign');
        $.each($('.tanceng .zj_quote_create_setting_list_right tbody'), function (i, v) {
            if ($('.tanceng .zj_quote_create_setting_list_right tbody').eq(i).find('tr').length != 0) {
                var goodsChildArr = [];
                $.each($('.tanceng .zj_quote_create_setting_list_right tbody').eq(i).find('tr'), function (i2, v2) {
                    goodsChildArr.push({
                        goodsid: $('.tanceng .zj_quote_create_setting_list_right tbody').eq(i).find('tr').eq(i2).attr('settinggoodsid'),
                        goodscodesn: $('.tanceng .zj_quote_create_setting_list_right tbody').eq(i).find('tr').eq(i2).find('td').eq(1).html(),
                        goodsattr: $('.tanceng .zj_quote_create_setting_list_right tbody').eq(i).find('tr').eq(i2).find('td').eq(2).html(),
                        goodsnum: $('.tanceng .zj_quote_create_setting_list_right tbody').eq(i).find('tr').eq(i2).find('td').eq(3).find('input:text').val()
                    })
                });
                settingChildKxpGoodsArr.push({
                    catename: $('.tanceng .zj_quote_create_setting_list_right tbody').eq(i).attr('catename'),
                    goodschildren: goodsChildArr
                });
            }
        });
        settingChildKxpGoodsArr = getJsonArr(settingChildKxpGoodsArr);
        var settingChildChosenHtml = '';

        $.each(settingChildKxpGoodsArr, function (i, v) {
            var settingChildGoodsHtml = '';
            var settingNumTotal = 0;
            $.each(v['goodschildren'], function (i2, v2) {
                var lastPrice = getPurLastPrice(v2['goodsid']);
                settingChildGoodsHtml += '<tr settinggoodsid="' + v2['goodsid'] + '" lik_up_down_type="0">\
                                    <td>' + v2['goodscodesn'] + '</td>\
                                    <td>' + v2['goodsattr'] + '</td>\
                                    <td><div class="num_input inline_block num_input_new"><button class="but_grey_a but_opa_small inp_plus pur_quote_create_setting_child_num_change_btn">+</button><input class="pur_quote_create_setting_child_num" type="text" value="' + v2['goodsnum'] + '"><button class="but_grey_a but_opa_small radius_left_0 inp_reduce pur_quote_create_setting_child_num_change_btn">-</button></div></td>\
                                    <td class="pur_quote_create_setting_child_one_num_total">' + (parseFloat(v2['goodsnum']) * parseFloat($('.tanceng .pur_quote_create_choose_setting_one_box_list[settingsign="' + setParentSign + '"] .pur_quote_create_setting_parent_num').val())) + '</td>\
                                    <td class="xs_goods_box" style="position: relative;">                                    <div class="xs_goods_big_box">                                    <div class="inline_block select_100"><input type="text" class="lik_input_number time_input xs_xsbjd_inp_60 pur_quote_create_setting_child_one_cost" lastprice="' + lastPrice + '" value="0" onfocus="fn_focus(this);" onblur="fn_blur(this);" style="color: rgb(204, 204, 204);"></div>                       <i class="ven_warning_arrow xs_goods_down_img ven_warning_arrow_up" style="margin: 0px; position: absolute; top: 21px; right: 16px;display:none;"></i>             </div>                                                        <div class="work_vent_client_contMsgBox" style="left: 126px; display: none;"><i class="work_vent_client_torr"></i><div class="work_vent_client_contMsgBoxDet fnc_output_ticket_total_remain_ticket_num_list"><span class="lik_up_down_text"></span>于 ' + lastPrice + ' (上次报价)</div></div></td>\
                                    <td class="c_y pur_quote_create_setting_child_one_tax">' + taxNum + '</td>\
                                    <td class="pur_quote_create_setting_child_one_cost_hsj">0</td>\
                                    <td class="pur_quote_create_setting_child_one_cost_total">0</td>\
                                    <td><button class="but_opa_small c_r pur_quote_create_setting_goods_del_btn">-</button></td>\
                                    </tr>';
                settingNumTotal += parseFloat(parseFloat(v2['goodsnum']) * parseFloat($('.tanceng .pur_quote_create_choose_setting_one_box_list[settingsign="' + setParentSign + '"] .pur_quote_create_setting_parent_num').val()));
            });
            settingChildChosenHtml += '<div class="box_open_list goods_tc_toggle">\
                                    <div class="pur_quote_create_setting_goods_list" optionaltype="1">\
                                    <p class="box_open_head" style="background: rgb(255, 255, 255); border-radius: 3px;">\
                                    <span>' + v['catename'] + '</span>\
                                    </p>\
                                    <div class="div_1 container">\
                                    <div class="div_1 table-container">\
                                    <table>\
                                    <thead>\
                                    <tr>\
                                    <th width="110">商品编号</th>\
                                    <th width="200">属性</th>\
                                    <th width="110">单个整机数量</th>\
                                    <th width="70">总数</th>\
                                    <th width="80" style="width: 130px;">单价(元)</th>\
                                    <th width="70">税率(%)</th>\
                                    <th width="100">含税价(元)</th>\
                                    <th width="70">总价(元)</th>\
                                    <th width="70">操作</th>\
                                    </tr>\
                                    </thead>\
                                    <tbody>' + settingChildGoodsHtml + '<tr class="table_total">\
                                    <td>合计</td>\
                                    <td></td>\
                                    <td></td>\
                                    <td class="pur_quote_create_setting_child_num_total">' + settingNumTotal + '</td>\
                                    <td></td>\
                                    <td></td>\
                                    <td></td>\
                                    <td class="pur_quote_create_setting_child_cost_hj_total">0</td>\
                                    <td></td>\
                                    </tr>\
                                    </tbody>\
                                    </table>\
                                    </div>\
                                    </div>\
                                    </div></div>';
        });
        $('.tanceng .pur_quote_create_choose_setting_one_box_list .' + setParentSign).html(settingChildChosenHtml);
        $(this).closest('.dialog_box').remove();
        purQuoteCreateSettingNumFn();
    });

    //提交页面删除配件商品
    $('.tanceng .pur_quote_create_setting_goods_del_btn').live('click', function () {
        if ($(this).closest('tbody').find('tr').length == 2) {
            $(this).closest('.box_open_list').remove();
        } else {
            $(this).closest('tr').remove();
        }
        purQuoteCreateSettingNumFn();
    });

//修改其他费用
    $('.tanceng .zj_quote_create_other_fee').live('keyup', function () {
        purQuoteCreateProductCostTotalFn();
    });

   /* ***********************总金额计算**************************/
    function purQuoteCreateProductCostTotalFn() {
        //税率
        var taxNum = 0;
        if ($('.tanceng .zj_contain_tax_val_ratio').val() == '含税17%') {
            taxNum = 17;
        } else {
            taxNum = 0;
        }
        //单价合计zj_quote_create_product_cost_total
        $('.tanceng .zj_quote_create_product_cost_total').val(moneyToFixed((parseFloat($('.tanceng .zj_quote_goods_cost_total').text()) + parseFloat($('.tanceng .zj_quote_create_setting_cost_total_hj').text())) * 100 / (100 + taxNum)));
        //合计税额
        $('.tanceng .zj_quote_create_tax_total').val(moneyToFixed(parseFloat($('.tanceng .zj_quote_create_product_cost_total').val()) * (taxNum / 100)));
        //总计金额
        if($('.tanceng .zj_quote_create_other_fee').val()>0){
            $('.tanceng .zj_sell_quote_create_cost_tax_total').html(moneyToFixed(parseFloat($('.tanceng .zj_quote_create_product_cost_total').val()) + parseFloat($('.tanceng .zj_quote_create_tax_total').val()) + parseFloat($('.tanceng .zj_quote_create_other_fee').val())));
        }else{
            $('.tanceng .zj_sell_quote_create_cost_tax_total').html(moneyToFixed(parseFloat($('.tanceng .zj_quote_create_product_cost_total').val()) + parseFloat($('.tanceng .zj_quote_create_tax_total').val())));
        }

    }

    //删除商品zj_sell_quote_create_cost_tax_total
    //  var purQuoteCreateProductDelIndex = -1;
    // $('.tanceng .pur_quote_create_goods_list_del_btn').die('click').live('click', function () {
    //     purQuoteCreateProductDelIndex = 0;
    // });
    // $('.tanceng .pur_quote_create_setting_list_del_btn').die('click').live('click', function () {
    //     purQuoteCreateProductDelIndex = 1;
    // });
    // $('.tanceng .pur_quote_create_product_del_submit').die('click').live('click', function () {
    //     if (purQuoteCreateProductDelIndex == 0) {
    //         aPurQuoteCreateGoodsChosen = [];
    //         $('.tanceng .pur_quote_create_chosen_goods_tbody').html('');
    //         $('.tanceng .pur_quote_create_goods_num_total').html('0');
    //         $('.tanceng .pur_quote_create_goods_cost_total').html('0');
    //         $('.tanceng .pur_quote_create_goods_tax_total').html('0');
    //         purQuoteCreateProductCostTotalFn();
    //         purQuoteCreateProductDelIndex = -1;
    //     }
    //     if (purQuoteCreateProductDelIndex == 1) {
    //         aPurQuoteCreateSettingChosen = [];
    //         purQuoteCreateSettingChildIdArr = [];
    //         $('.tanceng .pur_quote_create_chosen_setting_tbody').html('');
    //         $('.tanceng .pur_quote_create_setting_child_chosen_list').html('');
    //         $('.tanceng .lik_remember_num').html('0');
    //         $('.tanceng .pur_quote_create_setting_child_num_total').html('0');
    //         $('.tanceng .pur_quote_create_setting_child_cost_total').html('0');
    //         $('.tanceng .pur_quote_create_setting_child_tax_total').html('0');
    //         purQuoteCreateProductCostTotalFn();
    //         purQuoteCreateProductDelIndex = -1;
    //
    //         $('.pur_quote_create_setting_list').html('<div class="box_open_list">\
    //                                             <div class="table_t1">\
    //                                             <h3 class="cont_title inline_block">整机商品01采购报价</h3>\
    //                                             </div>\
    //                                             <div class="pur_quote_create_setting_add_box">\
    //                                             <div class="container">\
    //                                             <div class="table-container">\
    //                                             <table>\
    //                                             <thead>\
    //                                             <tr>\
    //                                             <th>商品名称/规格</th>\
    //                                             <th>商品编号</th>\
    //                                             <th>属性</th>\
    //                                             <th>计算单位</th>\
    //                                             <th>数量</th>\
    //                                             <th>采购价格(元)</th>\
    //                                             <th>合计总价(元)</th>\
    //                                             <th>含税率</th>\
    //                                             <th>含税额(元)</th>\
    //                                             <th>操作</th>\
    //                                             </tr>\
    //                                             </thead>\
    //                                             <tbody class="pur_quote_create_chosen_setting_tbody"></tbody>\
    //                                             <tbody>\
    //                                             <tr class="table_total">\
    //                                             <td>合计</td>\
    //                                             <td></td>\
    //                                             <td></td>\
    //                                             <td></td>\
    //                                             <td class="pur_quote_setting_parent_one_num">0</td>\
    //                                             <td></td>\
    //                                             <td class="pur_quote_setting_parent_one_cgcost_total">0</td>\
    //                                             <td></td>\
    //                                             <td class="pur_quote_setting_parent_one_tax_total">0</td>\
    //                                             <td></td>\
    //                                             </tr>\
    //                                             </tbody>\
    //                                             </table>\
    //                                             </div>\
    //                                             </div>\
    //                                             <div class="table_t2">搭配商品内容</div>\
    //                                             <div class="container">\
    //                                             <div class="table-container">\
    //                                             <table>\
    //                                             <thead>\
    //                                             <tr>\
    //                                             <th>序号</th>\
    //                                             <th>商品名称/规格</th>\
    //                                             <th>商品编号</th>\
    //                                             <th>属性</th>\
    //                                             <th>计算单位</th>\
    //                                             <th>单个配置搭配商品数量</th>\
    //                                             <th>单个搭配采购价格(元)</th>\
    //                                             <th>总数量</th>\
    //                                             <th>总价(元)</th>\
    //                                             <th>含税率(%)</th>\
    //                                             <th>含税额(元)</th>\
    //                                             <th>合计税额(元)</th>\
    //                                             <th>操作</th>\
    //                                             </tr>\
    //                                             </thead>\
    //                                             <tbody class="pur_quote_create_setting_child_chosen_list"></tbody>\
    //                                             <tbody>\
    //                                             <tr class="table_total">\
    //                                             <td>合计</td>\
    //                                             <td>\
    //                                             <button class="but_small but_green val_dialogTop zj_quote_create_choose_setting_btn" name="cg_cgbjd_xzpzspa">选择整机商品</button>\
    //                                             </td>\
    //                                             <td></td>\
    //                                             <td></td>\
    //                                             <td></td>\
    //                                             <td></td>\
    //                                             <td></td>\
    //                                             <td class="pur_quote_create_setting_child_num_total">0</td>\
    //                                             <td><span class="pur_quote_create_setting_child_cost_total">0</span>(<span class="pur_quote_create_setting_child_cost_total_max">0</span>)</td>\
    //                                         <td></td>\
    //                                         <td></td>\
    //                                         <td><span class="pur_quote_create_setting_child_tax_total">0</span>(<span class="pur_quote_create_setting_child_tax_total_max">0</span>)</td>\
    //                                         <td></td>\
    //                                         </tr>\
    //                                         </tbody>\
    //                                         </table>\
    //                                         </div>\
    //                                         </div>\
    //                                         </div>\
    //                                         </div>')
    //
    //     }
    // });
/*删除整机商品*/
$(".tanceng .pur_quote_create_choose_setting_one_box_list .pur_quote_create_goods_del_btn").die().live("click",function(){

    if($(".tanceng .zj_quote_create_choose_setting_box_list .pur_quote_create_choose_setting_one_box_list").length>1){
        $(this).parents('.pur_quote_create_choose_setting_one_box_list').remove();
    }else{
        alert('只剩一件整机了');
        return true;
    }

});


    //新建借入单 - 提交审批
    $('.tanceng .zj_pur_quote_create_submit_btn').die('click').live('click', function () {

        // newCreateData.quote_id = 0;
        // newCreateData.is_draft = 0;
        new_purQuoteCreateSubmitFn();
    });
    //新建采购报价单 - 保存草稿
   /* $('.tanceng .zj_pur_quote_create_submit_draft_btn').die('click').live('click', function () {
        purQuoteCreateData.buy_quote_id = 0;
        purQuoteCreateData.is_draft = 1;
        purQuoteCreateSubmitFn();
    });*/

    //新建借入单 - 提交函数
    function new_purQuoteCreateSubmitFn() {
        //借入单编号
        newCreateData.code_sn = $('.tanceng .zj_jrd_random_num_val').val();
        newCreateData.kuaji=$(".zj_jrd_add_spr_ul_content").data('kuaji');

         /*供应商id*/
        newCreateData.supplier_id = $('.tanceng .zj_jrd_select_gys_name_show_val').data('id');

        newCreateData.supplier_name = $('.tanceng .zj_jrd_select_gys_name_show_val').val();
            /*预计归还日期*/

        if($('.tanceng .zj_jrd_select_time_day_val').val()=='请选择日期'){
            alert("请选择日期");
            return false;
        }else{
            newCreateData.expect_return_time=$('.zj_jrd_select_time_day_val').val();
        }
        //税率
        if ($('.tanceng .zj_contain_tax_val_ratio').val() == '含税17%') {
            newCreateData.tax_rate = 1;
        } else {
            newCreateData.tax_rate = 0;
        }
        /*入库日期*/
        if($('.tanceng .zj_jrd_enter_ku_day_val').val()=='请选择日期'){
            alert("请选择日期");
            return false;
        }else{
            newCreateData.library_time=$('.tanceng .zj_jrd_enter_ku_day_val').val();
        }
        /*审批人*/
        var xz_sprid=[];
        $(".tanceng .zj_jrd_add_spr_ul_content .zj_spr_num").each(function(i,v){
            xz_sprid.push($(this).data('id'));
        })
        newCreateData.approval_id = xz_sprid.toString();
        newCreateData.now_approval_id = xz_sprid[0];
        if(newCreateData.approval_id==''){
            alert('审批人不能为空');
            return false;
        }
        /*抄送人*/
        //newCreateData.cc_id=$('.tanceng .zj_jrd_enter_ku_day_val').val();
        var xzcsr_id=[];
        $(".tanceng .zj_select_csr_list_data_rnum .zj_csr_num").each(function(i,v){
            xzcsr_id.push($(this).attr('rid'))
        })
        newCreateData.cc_id = xzcsr_id.toString();
        /*备注*/
        //newCreateData.note=$('.tanceng .ven_sell_quote_create_note_textarea').val();
        //普通商品信息
        var pCreateGoodsArr = [];
        //var purQuoteCreateGoodsJson = {};
        $.each($('.tanceng .zj_quote_create_chosen_goods_tbody_content tr'), function (i, v) {
            pCreateGoodsArr.push({
                goods_category:1,
                goods_id: $('.tanceng .zj_quote_create_chosen_goods_tbody_content tr').eq(i).attr('goodsid'),
                num: $('.tanceng .zj_quote_create_chosen_goods_tbody_content tr').eq(i).find(".productnum").val(),
                price: $('.tanceng .zj_quote_create_chosen_goods_tbody_content tr').eq(i).find('.pur_quote_goods_cost_one').val(),
                containing_rate: $('.tanceng .zj_quote_create_chosen_goods_tbody_content tr').eq(i).find('.pur_quote_goods_tax_one ').text(),
                containing_money: $('.tanceng .zj_quote_create_chosen_goods_tbody_content tr').eq(i).find('.pur_quote_goods_tax_total').text(),
                total_money: $('.tanceng .zj_quote_create_chosen_goods_tbody_content tr').eq(i).find('.pur_quote_goods_one_cost_total').text()

            });
        });
        // purQuoteCreateGoodsJson.goods = purQuoteCreateGoodsArr;
        newCreateData.good_borrow_num = $('.tanceng .zj_quote_create_goods_num_total').text(); // 普通商品总数
        if($(".tanceng .ven_sell_quote_create_note_textarea").val()=='请输入备注'){
            newCreateData.note=''
        }else{
            newCreateData.note = $(".tanceng .ven_sell_quote_create_note_textarea").val();//备注
        }
        // purQuoteCreateGoodsJson.sum_total = $('.tanceng .pur_quote_goods_cost_total').html();// 普通商品总价额
        newCreateData.unit_price_total = $('.tanceng .zj_quote_create_product_cost_total').val();//单价合计：
        newCreateData.tax_total=$('.tanceng .zj_quote_create_tax_total').val();//合计税额
        newCreateData.other_costs = $('.tanceng .zj_quote_create_other_fee').val();//其他费用（元）
        newCreateData.all_money = $('.tanceng .zj_sell_quote_create_cost_tax_total').text();//总计金额（元）


        var likOnOff = false;
        $.each($('.tanceng .pur_quote_create_choose_setting_one_box_list .pur_quote_create_setting_price_one_no'), function (i, v) {
            if ($('.tanceng .pur_quote_create_choose_setting_one_box_list .pur_quote_create_setting_price_one_no').eq(i).text() != 0) {
                likOnOff = true;
                return false
            }
            likOnOff = false;
        });
        if (likOnOff) {
            alert('请完善整机商品配件内容');
            return false;
        }

         //整机商品信息
        var purQuoteCreateSettingArr = [];
        var purQuoteCreateSettingJson = {};
        var $_settingParentList = $('.tanceng .zj_quote_create_choose_setting_box_list .pur_quote_create_choose_setting_one_box_list');
        $.each($_settingParentList, function (i, v) {
            //整机配件信息
            //var settingGoodsArr = [];

           /*$.each($_settingParentList.eq(i).find('.box_open_list'), function (i2, v2) {*/
                var settingGoodsInfoArr = [];
            var $_settingGoodsInfoTr = $_settingParentList.eq(i).find('.box_open_list').find('tbody tr:not(".table_total")');
                $.each($_settingGoodsInfoTr, function (i3, v3) {

                    settingGoodsInfoArr.push({
                        "goods_category":1,
                        "goods_id": $_settingGoodsInfoTr.eq(i3).attr('settinggoodsid'),
                        "num": $_settingGoodsInfoTr.eq(i3).find('.pur_quote_create_setting_child_num').val(),
                        "price": $_settingGoodsInfoTr.eq(i3).find('.pur_quote_create_setting_child_one_cost').val(),
                        "containing_rate": $_settingGoodsInfoTr.eq(i3).find('.pur_quote_create_setting_child_one_tax').text(),
                        "containing_money": $_settingGoodsInfoTr.eq(i3).find('.pur_quote_create_setting_child_one_cost_hsj').text(),
                        "total_money": $_settingGoodsInfoTr.eq(i3).find('.pur_quote_create_setting_child_one_cost_total').text()

                    });
                });

            // 整机商品信息
            var curTr = $_settingParentList.eq(i).find('tbody').find('tr');
            pCreateGoodsArr.push({
                "goods_category":2,
                "goods_id": curTr.attr('settingid'),
                "num": curTr.find('input.pur_quote_create_setting_parent_num').val(),
                "price": curTr.find('input.pur_quote_create_setting_cost_one_change').val(),
                "containing_rate": curTr.find('td').eq(7).text(),
                "containing_money": curTr.find('.pur_quote_create_setting_parent_one_cost_hsj').text(),
                "total_money": curTr.find('.pur_quote_create_setting_parent_one_cost_total').text(),
                "children": settingGoodsInfoArr
            });
        });
        newCreateData.computer_borrow_num=$(".tanceng .zj_quote_create_setting_num_total_hj").text();
        if (pCreateGoodsArr.length == 0) {
            newCreateData.borrow_json = '';
        } else {
            newCreateData.borrow_json = arrayToJson(pCreateGoodsArr);
        }

        // purQuoteCreateSettingJson.setting = purQuoteCreateSettingArr;
        // purQuoteCreateSettingJson.sum_num = $('.tanceng .pur_quote_create_setting_num_total_hj').text();
        // purQuoteCreateSettingJson.sum_total = $('.tanceng .pur_quote_create_setting_cost_total_hj').text();
        // if (purQuoteCreateSettingArr.length == 0) {
        //     newCreateData.setting = '';
        // } else {
        //     newCreateData.setting = arrayToJson(purQuoteCreateSettingJson);
        // }


        //是否包运费
        // if ($('.tanceng .pur_quote_create_freight_checkbox').is(':checked')) {
        //     newCreateData.is_freight = 1;
        // } else {
        //     newCreateData.is_freight = 0;
        // }
        // //备注
        // if ($('.tanceng .pur_quote_create_note_textarea').val() == '请输入备注') {
        //     newCreateData.note = '';
        // } else {
        //     newCreateData.note = $('.tanceng .pur_quote_create_note_textarea').val();
        // }
        // //商品合计
        // newCreateData.money_sum = $('.tanceng .pur_quote_create_product_cost_total').val();
        // //合计税额
        // newCreateData.tax_money_sum = $('.tanceng .pur_quote_create_tax_total').val();
        // //其他费用
        // newCreateData.other_free = $('.tanceng .pur_quote_create_other_fee').val();
        // //总计金额
        // newCreateData.totals = $('.tanceng .pur_quote_create_cost_tax_total').html();

        //审批人
        // newCreateData.flow = purQuoteCreateFlowChosenArr.join(',');
        // if ($('.tanceng .pur_quote_create_flow_list li').length == 1) {
        //     alert('请选择审批人');
        //     return false;
        // }
        //
        // if (purQuoteCreateData.goods == '' && purQuoteCreateData.setting == '') {
        //     alert('请选择商品');
        //     return false;
        // }
        //
        console.log('100');
         console.log(newCreateData);
        console.log('100');
// if(newCreateData){
//
// }
            if(pCreateGoodsArr.length>0){

                $.ajax({
                    url: SERVER_URL + "/borrow/add",
                    type: 'POST',
                    data: newCreateData,
                    dataType: 'json',
                    success: function (e) {
                        console.log(e);
                        if (e.code == 0) {

                            $('.tanceng .dialog_box').remove();
                            $('.tanceng').css('display', 'none');
                            borrow_list();
                            //getBuyQuoteDraftNum();
                            $('.tanceng .dialog_box').not('[name="takenote_jcd_tj"]').remove();
                            $('.tanceng .zj_pur_quote_create_submit_btn').attr('name', 'takenote_jcd_tj');
                            $('.tanceng').append($('.dialog_box[name="takenote_jcd_tj"]').css('display', 'block'));
                            $('.tanceng .jcd_create_success_code').html(newCreateData.code_sn);
                        }
                    },
                    error: function (data) {
                        alert(data);
                    }
                });
            }else{
                alert('请添加借入单');
            }

    }
    /***************************待我审批**************************/
    var sp_data={
        token: token,
        uid:uid,
        company_id:company_id,
        page: 1,
        num: 10
    }
    function jrd_dwsp_mine_fn() {
        $.ajax({
            url: SERVER_URL + "/borrow/my-approval",
            type: 'POST',
            data: sp_data,
            dataType: 'json',
            success: function (data) {
                $(".zj_jrd_show_info_zsum").text(data.total_num);
                console.log(data);
                if(data.code==0){
                    if(data['data'].length>0){
                        $(".zcj_dwsp_jrdfy_head_page_div").show();
                        $(".zj_cs_dwsp_no_data_show_dv").hide();
                    }else{
                        $(".zcj_dwsp_jrdfy_head_page_div").hide();
                        $(".zj_cs_dwsp_no_data_show_dv").show();
                    }
                }else{
                    $(".zcj_dwsp_jrdfy_head_page_div").hide();
                    $(".zj_cs_dwsp_no_data_show_dv").show();
                }
                 var html=''
                 if (data.code == 0) {

                     $.each(data['data'],function(i,dw_data){
                         var sort=repair(i+1)
                         html+='<tr> <td>'+sort+'</td> <td>'+likNullData(dw_data['code_sn'])+'</td> <td>'+likNullData(dw_data['supplier_name'])+'</td><td>'+likNullData(dw_data['expect_return_time'])+'</td>'
                         if(dw_data['approval_status']==1){
                             html+='<td class="c_y">审批中</td> '
                         }else if(dw_data['approval_status']==2){
                             html+='<td class="c_g">审批通过</td> '
                         }if(dw_data['approval_status']==3){
                             html+='<td class="c_r">驳回</td> '
                         }
                         html+='<td>'+likNullData(dw_data['approval_name_str'])+'</td> <td>'+likNullData(dw_data['library_time'])+'</td>'
                         if(dw_data['library_status']==1){
                             html+='<td class="c_r">待入库</td>';
                         }else if(dw_data['library_status']==2){
                             html+='<td class="c_y">部分入库</td>';
                         }else if(dw_data['library_status']==3){
                             html+='<td class="c_g">已入库</td>';
                         }else{
                             html+='<td>-</td>';
                         }
                         if(dw_data['approval_status']==1){
                             html+='<td>'+likNullData(dw_data['create_time'])+'</td> <td>'+likNullData(dw_data['name'])+'</td> <td>'+likNullData(dw_data['all_money'])+'</td>&ndash;&gt; <td>'+likNullData(dw_data['note'])+'</td> <td> <button data-id="'+dw_data['id']+'" data-code_sn="'+dw_data['code_sn']+'" class="but_mix r_sidebar_btn zj_dwsp_check_info_btn" name="takenote_jrd_ck">查看</button><button class="but_mix val_dialog but_look zj_dwsp_sp_btn_info" data-id="'+dw_data['id']+'" name="takenote_jrd_look_xq">审批</button> </td></tr>'
                         }else if(dw_data['approval_status']==2){
                             html+='<td>'+likNullData(dw_data['create_time'])+'</td> <td>'+likNullData(dw_data['name'])+'</td> <td>'+likNullData(dw_data['all_money'])+'</td>&ndash;&gt; <td>'+likNullData(dw_data['note'])+'</td> <td> <button data-id="'+dw_data['id']+'" data-code_sn="'+dw_data['code_sn']+'" class="but_mix r_sidebar_btn zj_dwsp_check_info_btn" name="takenote_jrd_ck">查看</button><button class="but_mix1 but_grey1" data-id="'+dw_data['id']+'" name="">审批</button> </td></tr>'
                         }if(dw_data['approval_status']==3){
                             html+='<td>'+likNullData(dw_data['create_time'])+'</td> <td>'+likNullData(dw_data['name'])+'</td> <td>'+likNullData(dw_data['all_money'])+'</td>&ndash;&gt; <td>'+likNullData(dw_data['note'])+'</td> <td> <button data-id="'+dw_data['id']+'" data-code_sn="'+dw_data['code_sn']+'" class="but_mix r_sidebar_btn zj_dwsp_check_info_btn" name="takenote_jrd_ck">查看</button><button class="but_mix1 but_grey1" data-id="'+dw_data['id']+'" name="">审批</button> </td></tr>'
                         }

                     })
                     $(".zj_cs_my_mine_table_body_content").html(html);
                     list_table_render_pagination(".zcj_dwsp_jrdfy_head_page_div",sp_data,jrd_dwsp_mine_fn,data.total_num,data.data.length);
                     $(".zcj_jrd_check_save_btn").trigger('click');
                 }
            },
            error: function (data) {
                alert('服务器错误');
            }
        });
    }
    $("#zj_jrd_dwsp_fq_table").die().live("click",function(){
        $(".zj_jrd_wfqd_content_info").removeClass('lik_table_wrap');
        $(".zj_jrd_dwsp_content_info").addClass('lik_table_wrap');
        $(".zj_jrd_cswd_content_info").removeClass('lik_table_wrap');
        // $(".zj_jrd_wfqd_content_info").hide();
        // $(".zj_jrd_dwsp_content_info").show();
        // $(".zj_jrd_cswd_content_info").hide();
        likShow('.zcj_jrd_dwsp_table_head_content_show', venCustomLookAbledField, '.zcj_xz_check_x_head_content', '.zcj_jrd_check_save_btn', '.zcj_jrd_check_cancal_btn');
        $(".goods_wfqd_attr_search_table").hide();
        $(".goods_dwsp_attr_search_table").show();
        $(".goods_cswd_attr_search_table").hide();
        jrd_dwsp_mine_fn();

        /*高级搜索*/
        /*审批状态*/
        $(".zj_dwsp_sp_state_list li").die().live("click",function(){

            var state=$(this).data('id')
            sp_data.approval_status=state;
            sp_data.page=1;
            jrd_dwsp_mine_fn();
        });
        /*入库状态*/
        $(".zj_dwsp_rk_state_list li").die().live("click",function(){
            var library_status=$(this).data('id')
            sp_data.library_status=library_status;
            sp_data.page=1;
            jrd_dwsp_mine_fn();
        });

    });

    /*归还状态*/
    // $(".zj_jrd_gh_state li").die().live("click",function(){
    //     var thetype=$(this).data('id')
    //     borrow_jrd_data.thetype=thetype;
    //     borrow_list();
    // });
   /*待我审批查看*/
   $(".zj_dwsp_check_info_btn").die().live("click",function(){
       $(".zj_jrgh_list_sum_num").text('')
       $(".zj_cgbjd_list_sum_num").text('');
           $(".slider_head_More").hide();

        var sp_id=$(this).data('id');
       var c_code=$(this).data('code_sn');
       $(".zj_check_jrd_xq_info_content_btn").text('查看借入单');
       // $(".zj_check_jrd_xq_info_content_btn").text('审批借入单');
       $(".zj_dwsp_sp_div").show();
        $(".zj_my_fq_zcgbj_div").hide();

       $(".zj_my_cswd_zcgbj_div").hide();

       /*基本信息*/
       $.ajax({
           type: 'post',
           url: SERVER_URL + "/borrow/basic",
           data: {
               token: token,
               //company_id: company_id, //公司id
               id: sp_id// 用户id

           },
           dataType: "json",
           success: function (data) {
               console.log('2000');
               console.log(data);
               console.log('2000');

               //var info_show=$(".zj_jrd_goods_jb_info_check_show ")
               $(".zj_jcd_supplier_gys_name").text(data['data']['supplier_name'])
               $(".zj_xdr_myname_show").text(likNullData(data['data']['name']));
               $(".zj_mycreat_day_time").text(likNullData(data['data']['create_time']));
               $(".zj_jrd_goods_jb_info_check_show .zj_jb_info_content_show p span").eq(0).text(likNullData(data['data']['code_sn']));
               $(".zj_jrd_goods_jb_info_check_show .zj_jb_info_content_show p span").eq(1).text(likNullData(data['data']['supplier_name']));
               $(".zj_jrd_goods_jb_info_check_show .zj_jb_info_content_show p span").eq(2).text(likNullData(data['data']['expect_return_time']));
               if(data['data']['tax_rate']==1){
                   $(".zj_jrd_goods_jb_info_check_show .zj_jb_info_content_show p span").eq(3).text('17%');
               }else{
                   $(".zj_jrd_goods_jb_info_check_show .zj_jb_info_content_show p span").eq(3).text('无税');
               }

               $(".zj_jrd_goods_jb_info_check_show .zj_jb_info_content_show p span").eq(4).text(likNullData(data['data']['note']));
               var c_name='';
               $.each(data['cc'],function (i,csr_name) {
                   c_name+=''+csr_name['name']+','
               })
               c_name = c_name.slice(0, c_name.length - 1);
               $(".zj_jrd_goods_jb_info_check_show .zj_jb_info_content_show p span").eq(5).text(c_name);

               if(data['data']['thetype']==0){
                   $(".zj_jrd_goods_jb_info_check_show .zj_jb_info_content_show p span").eq(6).text("-");
               }else if(data['data']['thetype']==1){
                   $(".zj_jrd_goods_jb_info_check_show .zj_jb_info_content_show p span").eq(6).text("未归还");
               }else if(data['data']['thetype']==2){
                   $(".zj_jrd_goods_jb_info_check_show .zj_jb_info_content_show p span").eq(6).text("部分归还");
               }else if(data['data']['thetype']==3){
                   $(".zj_jrd_goods_jb_info_check_show .zj_jb_info_content_show p span").eq(6).text("已归还");
               }
               $(".zj_jrd_goods_jb_info_check_show .zj_rk_info").text(likNullData(data['data']['library_time']))
               if(data['data']['approval_status']==2){
                $(".zj_check_jrd_xq_info_content_btn").text('查看报价单')
                   $(".zj_dwsp_sp_div").hide();
                   $(".zj_my_fq_zcgbj_div").hide();

                   $(".zj_my_cswd_zcgbj_div").show();
               }
           }
       })

       /*查看审批结果*/
       $.ajax({
           type: 'post',
           url: SERVER_URL + "/borrow/approval-result",
           data: {
               token: token,
               //company_id: company_id, //公司id
               id: sp_id,//id
               uid:uid

           },
           dataType: "json",
           success: function (data) {
               console.log('审批结果');
               console.log(data);
               console.log('审批结果');

               var html='';
               $.each(data['data'],function(i,vinfo){

                   html+='<div class="work_spiliu">'
                   html+='<div class="work_spiliu_items" style="overflow: hidden;">'
                   html+='<div class="left" style="position: relative;">'
                   html+='<div class="work_spiliu_div">'
                   if(vinfo['headpic']=='' || vinfo['headpic']==null){
                       html+='<img class="inline_block tx" src="static/images/touxiang.png">'
                   }else{
                       html+='<img class="inline_block tx" src="'+getImgUrl(vinfo['headpic'])+'">'
                   }

                   html+='<h3 class="work_sp_h3">'+vinfo['username']+'</h3>'
                   if(vinfo['approval_status']!=9){
                       html+='<span class="c_9 m_left_5 zj_bz_is_hid">步骤'+i+'</span>'
                   }else {
                       html+='<span class="c_9 m_left_5 zj_bz_is_hid"></span>'
                   }

                   html+='</div>'
                   if(vinfo['approval_status']==0){
                       html+='<cite class="b_h"></cite>'
                   }else if(vinfo['approval_status']==1){
                       html+='<cite class="b_y"></cite>'
                   }else if(vinfo['approval_status']==2){
                       html+='<cite class="b_g"></cite>'
                   }else if(vinfo['approval_status']==3){
                       html+='<cite class="b_r"></cite>'
                   }else if(vinfo['approval_status']==4){
                       html+='<cite class="b_b"></cite>'
                   }else if(vinfo['approval_status']==9){
                       html+='<cite class="b_b"></cite>'
                   }
                   html+='</div>'
                   html+='<div class="auto_height">'
                   html+='<img src="static/images/work_jiantou.png">'
                   html+='<div class="sp_cont">'
                   html+='<div class="sp_cont_a">'
                   if(vinfo['approval_status']==0){
                       html+='<h3 class="b_h">待审批</h3>'
                   }else if(vinfo['approval_status']==1){
                       html+='<h3 class="c_y">审批中</h3>'
                   }else if(vinfo['approval_status']==2){
                       html+='<h3 class="c_g">审批通过</h3>'
                   }else if(vinfo['approval_status']==3){
                       html+='<h3 class="c_r">拒绝</h3>'
                   }else if(vinfo['approval_status']==4){
                       html+='<h3 class="f_color bold">撤回</h3>'
                   }else if(vinfo['approval_status']==9){
                       html+='<h3 class="f_color bold">发起审批</h3>'

                   }

                   if(vinfo['update_time']==null || vinfo['update_time']==''){
                       html+='<p class="c_9"></p>'
                   }else{
                       html+='<p class="c_9">'+likNullData(vinfo['update_time'])+'</p>'
                   }
                   //html+='<p class="c_9">'+likNullData(vinfo['update_time'])+'</p>'
                   html+='</div>'
                   if(vinfo['approval_status']==9){
                       html+='<p class="c_3 work_sp_p none1">'+likNullData(vinfo['note'])+'</p>'
                   }else{
                       html+='<p class="c_3 work_sp_p">'+likNullData(vinfo['note'])+'</p>'
                   }

                   html+='</div>'
                   html+='</div>'
                   html+='<div style="clear: both;height: 0;font-size: 1px;line-height: 0px;"></div>'
                   html+='</div>'
                   html+='</div>'
               })
               $(".zj_sp_jg_result_content_show").html(html);
               if(data['is_across']==1){
                   $(".zj_bz_is_hid").hide();
               }else{
                   $(".zj_bz_is_hid").show();
               }

           }
       })

       /*查看借入单btn*/
       $(".zj_check_jrd_xq_info_content_btn").die().live("click",function(){
           $.ajax({
               type: 'POST',
               url: SERVER_URL + "/borrow/look-borrow",
               data: {
                   token: token,
                   //company_id: company_id, //公司id
                   id: sp_id// 用户id
               },
               dataType: "json",
               success: function (data) {
                   console.log('待我审批查看借入单');
                   console.log(data);
                   console.log('20001110000000000000000');
                   if(data.code==0){
                       if(data['data'].length==0){
                           return true;

                       }
                       $(".zj_jrd_zcgbjd_end_btn").data('id',data['data']['id']).data('code_sn',data['data']['code_sn']).data('supplier_name',data['data']['supplier_name']).data('supplier_id',data['data']['id']);//id
                       $(".zj_jrd_xq_header_name").text(likNullData(data['data']['supplier_name']));
                       $(".zj_xdr_name_show").text(data['data']['xiadan_name']);
                       $(".zj_create_day_time_show").text(subTime(data['data']['create_time']));
                       $(".tanceng .zj_jrd_info_num_header_show .zj_jrd_bh_show_num").text(data['data']['code_sn']);
                       $(".tanceng .zj_jrd_info_num_header_show .zj_supplier_name_show").text(data['data']['supplier_name']);
                       $(".tanceng .zj_jrd_info_num_header_show .zj_yjgh_time_show").text(subTime(data['data']['expect_return_time']));
                       $(".tanceng .zj_jrd_info_num_header_show .zj_rk_day_show").text(subTime(data['data']['library_time']));
                       $(".tanceng .zj_jrd_info_num_header_show .zj_note_info_show").text(data['data']['note']);
                       if(data['data']['goods']['sum_total']){
                           $(".tanceng .zj_goods_zprice .zj_goods_hj_znum").text(data['data']['goods']['sum_total']);
                       }
                       // if(data['data']['setting']['sum_total']){
                       //     $(".xs_bjd_table_3 .zj_hj_zj_money").text(data['data']['setting']['sum_total']);
                       // }


                       /*ff*/
                       $(".zj_dj_hj_price_num").text(data['data']['unit_price_total']);
                       $(".zj_hs_hj_zprice_number").text(data['data']['tax_total']);
                       $(".zj_other_price_num").text(data['data']['other_costs']);
                       $(".zj_znum_zj_m_price").text(data['data']['all_money']);

                       $(".tanceng")
                       var html='';
                       $.each(data['data']['goods'],function(i,v){
                           $.each(v,function(i2,v2){
                               var pair=repair(i2+1);
                               html+='<tr>\
                            <td>'+pair+'</td>\
                            <td>'+likNullData(v2['good_sn'])+'</td>\
                            <td>'+likNullData(v2['good_name'])+'</td>\
                            <td>'+likNullData(v2['good_attr'])+'</td>\
                            <td>'+likNullData(v2['good_num'])+'</td>\
                            <td>'+likNullData(v2['good_price'])+'</td>\
                            <td>'+likNullData(v2['good_rate_price'])+'</td>\
                            <td>'+likNullData(v2['good_total'])+'</td>\
                            <td></td>\
                            </tr>'
                           })

                       })
                       $(".zj_goods_table_content_info").html(html);
                       /*整机商品*/

                       var complete='';
                       $.each(data['data']['setting'],function(i,arr){
                           var p=repair(i+1)
                           var setting='';
                           if(arr['good_list']){
                               $.each(arr['good_list'],function(i2,v2){
                                   var setting_goods=''
                                   if(v2['attr_list']){
                                       $.each(v2['attr_list'],function(i3,v3){
                                           setting_goods+='<tr>\
                                                <td>'+likNullData(v3['good_sn'])+'</td>\
                                                <td>'+likNullData(v3['good_attr'])+'</td>\
                                                <td>'+likNullData(v3['sing_num'])+'</td>\
                                                <td>'+likNullData(v3['good_price'])+'</td>\
                                                <td>'+likNullData(v3['good_rate_price'])+'</td>\
                                                <td>'+likNullData(v3['good_total'])+'</td>\
                                                <td></td>\
                                                </tr>'
                                       })
                                   }

                                   setting+='<table class="xs_bjd_table_1">\
                                <thead>\
                                <tr style="background: #fff;">\
                                <th class="c_3" style="font-weight: 100;">'+likNullData(v2['title'])+'</th>\
                                <th></th>\
                                <th></th>\
                                </tr>\
                                <tr>\
                                <th width="90">编号</th>\
                                <th width="560">属性</th>\
                                <th width="50">数量</th>\
                                <th width="150">单价</th>\
                                <th width="90">含税价</th>\
                                <th width="90">总价</th>\
                                <th width="60"></th>\
                                </tr>\
                                </thead>\
                                <tbody>'+setting_goods+'\
                                </tbody>\
                            </table>'
                               })
                           }

                           complete+='<div class="xs_div_2" style="margin-top: 20px;">\
                            <table class="xs_bjd_table">\
                            <thead>\
                            <tr>\
                            <th width="30">序号</th>\
                            <th width="90">编号</th>\
                            <th width="150">名称</th>\
                            <th width="340">属性</th>\
                            <th width="50">数量</th>\
                            <th width="150">单价</th>\
                            <th width="90">含税价</th>\
                            <th width="90">总价</th>\
                            <th width="60">配件</th>\
                            </tr>\
                            </thead>\
                            <tbody>\
                                <tr class="c_3 c_3 xs_bjd_bold">\
                                    <td>'+p+'</td>\
                                    <td>'+likNullData(arr['good_sn'])+'</td>\
                                    <td>'+likNullData(arr['good_name'])+'</td>\
                                    <td>'+likNullData(arr['good_attr'])+'</td>\
                                    <td>'+likNullData(arr['num'])+''+arr['good_unit']+'</td>\
                                    <td>'+likNullData(arr['price'])+'</td>\
                                    <td>'+likNullData(arr['containing_money'])+'</td>\
                                    <td class="zj_pz_sum_price">'+likNullData(arr['total_money'])+'</td>\
                                    <td><button class="but_mix box_open_btn_1 but_blue_1">展开</button></td>\
                                </tr>\
                            </tbody>\
                            </table>\
                            </div>\
                            <div class="xs_tc_goods_box goods_tc_toggle" style="display: none;">'+setting+'</div>'

                       })


                       $(".tanceng .zj_zj_goods_dv_content").html(complete);
                       var sum_price=0;
                       $(".tanceng .zj_zj_goods_dv_content .zj_pz_sum_price").each(function(){
                           sum_price+=parseFloat($(this).text());
                       })
                       $(".tanceng .zj_hj_zj_money").text(sum_price)
                   }

               }
           })

       });

       /*转采购报价单*/
      /* $(".tanceng .zj_jrd_zcgbjd_end_btn").die().live("click",function(){
           new_number('.zj_z_cgbjd_num','CBJ')
           var id=$(this).data('id');
           var code=$(this).data('code_sn');//借入单编号
           var supplier_name=$(this).data('supplier_name');//供应商id
           var supplier_id=$(this).data('supplier_id');//供应商名字
           $(".zj_z_cgbjd_gl_jrd").val(code);
           $(".zj_z_cgbjd_gl_gys").val(supplier_name);
           var cgbjd_data={
               token: token,
               code_sn:'',
               borrow_id:'',
               supplier_id:'',
               tax_rate:'',
               flow:'',
               goods:'',
               setting:'',
               supplier_name:''


           }
           /!*审批人获取*!/
           $.ajax({
               type: 'POST',
               url: SERVER_URL + "/borrow/get-approval-type",
               data: {
                   token: token,
                   company_id: company_id, //公司id
                   uid: uid, // 用户id
                   category: 2,// 分类id 1合同管理,2采购,3借入借出
                   type_id: 5 // 类型(1销售合同,2采购合同,3员工合同,4其他合同,5采购报价单,6采购退换货,7借入单,8借出单,9归还单,10,归还单(借入归还),11(借出归还)
               },
               dataType: "json",
               success: function (data) {
                   console.log('10001');
                   console.log(data);
                   console.log('10001');

                   var html='';
                   var P_sort=" ";
                   if(data.code==0){
                       $.each(data['data'],function(i,v){
                           if(v['face']!=''){
                               html+='<li data-id="'+v['uid']+'" class="zj_spr_num"><em class="icon_personBtn"><img src="'+v['face']+'"/><i class="icon_personNext"></i></em> <em class="icon_adderBtn"></em> <p class="box_adderName">'+v['name']+'</p> <p class="box_addermsg">步骤'+(i+1)+'</p> </li>'
                           }else {
                               html+='<li data-id="'+v['uid']+'" class="zj_spr_num"> <em class="icon_personBtn icon_personBtn_msg"><i class="icon_personNext"></i></em> <em class="icon_adderBtn"></em> <p class="box_adderName">'+v['name']+'</p> <p class="box_addermsg">步骤'+(i+1)+'</p> </li>'
                           }
                       })


                       $(".zj_zcgbjd_spr_show").html(html);

                   }else{
                       alert(data.msg);
                   }

               }
           })
           /!*选择联系人*!/
           $(".zj_jrd_gys_add_ul li").die().live("click",function(){
               var tel=$(this).data('contact_tel');
               $(".zcj_jrd_gys_person_mobile").val(tel);
           });
           /!*查看借入商品*!/
           $.ajax({
               type: 'POST',
               url: SERVER_URL + "/borrow/look-borrow",
               data: {
                   token: token,
                   //company_id: company_id, //公司id
                   id: id  // id

               },
               dataType: "json",
               success: function (data) {
                   console.log('2000111222');
                   console.log(data);
                   console.log('2000111222');
                   if(data.code==0){
                       if(data['data']['goods']){
                           var goods='';
                           $.each(data['data']['goods'],function(i,v){
                               $.each(v,function(i2,v2){
                                   goods+='<tr>\
                            <td><input type="checkbox" data-id="'+v2['id']+'" data-good_id="'+v2['good_id']+'" data-good_unit="'+v2['good_unit']+'" data-good_num="'+v2['good_num']+'" data-good_rate="'+v2['good_rate']+'"></td>\
                            <td>'+likNullData(v2['good_sn'])+'</td>\
                            <td>'+likNullData(v2['good_name'])+'</td>\
                            <td>'+likNullData(v2['good_attr'])+'</td>\
                            <td>'+likNullData(v2['good_num'])+''+likNullData(v2['good_unit'])+'</td>\
                            <td>'+likNullData(v2['good_price'])+'</td>\
                            <td>'+likNullData(v2['good_rate_price'])+'</td>\
                            <td>'+likNullData(v2['good_total'])+'</td>\
                            </tr>'
                               })

                           })
                           $(".zj_select_cgbjd_goods_content_tbody").html(goods);
                           var complete='';
                           if(data['data']['setting']){
                               $.each(data['data']['setting'],function(i,arr){
                                   var setting='';
                                   if(arr['good_list']){
                                       $.each(arr['good_list'],function(i2,v2){
                                           var setting_goods=''
                                           if(v2['attr_list']){
                                               $.each(v2['attr_list'],function(i3,v3){
                                                   setting_goods+='<tr>\
                                                <td><input type="checkbox" data-id="'+v3['id']+'" data-sing_num="'+v3['sing_num']+'" data-return_num="'+v3['return_num']+'" data-good_id="'+v3['good_id']+'" data-good_rate="'+v3['good_rate']+'" data-good_unit="'+v3['good_unit']+'"></td>\
                                                <td>'+likNullData(v3['good_sn'])+'</td>\
                                                <td>'+likNullData(v3['good_attr'])+'</td>\
                                                <td>'+likNullData(v3['sing_num'])+''+likNullData(v3['good_unit'])+'</td>\
                                                <td>'+likNullData(v3['good_price'])+' </td>\
                                                <td>'+likNullData(v3['good_rate_price'])+' </td>\
                                                <td>'+likNullData(v3['good_total'])+' </td>\
                                                </tr>'
                                               })
                                           }

                                           setting+='<table class="xs_bjd_table_1">\
                                <thead>\
                                <tr style="background: #fff;">\
                                <th class="c_3" style="font-weight: 100;">'+likNullData(v2['title'])+'</th>\
                                <th></th>\
                                <th></th>\
                                </tr>\
                                <tr>\
                                    <th width="32">选择</th>\
                                    <th width="140">编号</th>\
                                    <th width="435">属性</th>\
                                    <th width="88">数量</th>\
                                    <th width="88">单价</th>\
                                    <th width="88">含税价</th>\
                                    <th width="88">总价</th>\
                                </tr>\
                                </thead>\
                                <tbody>'+setting_goods+'\
                                </tbody>\
                            </table>'
                                       })
                                   }

                                   complete+='<div class="xs_div_2" style="border-bottom: 1px solid #e6e6e6;">\
                           <div class="div_1 container">\
                            <table class="xs_bjd_table">\
                            <thead>\
                            <tr>\
                            <th width="32">选择</th>\
                            <th width="140">编号</th>\
                            <th width="100">名称</th>\
                            <th width="375">属性</th>\
                            <th width="65">数量</th>\
                            <th width="88">单价</th>\
                            <th width="88">含税价</th>\
                            <th width="88">总价</th>\
                            <th width="60">操作</th>\
                            </tr>\
                            </thead>\
                            <tbody>\
                                <tr class="c_3 c_3 xs_bjd_bold">\
                                    <td><input type="checkbox" data-id="'+arr['id']+'" data-goods_id="'+arr['goods_id']+'" data-num="'+arr['num']+'" data-good_unit="'+arr['good_unit']+'" data-containing_rate="'+arr['containing_rate']+'"></td>\
                                    <td>'+likNullData(arr['good_sn'])+'</td>\
                                    <td>'+likNullData(arr['good_name'])+'</td>\
                                    <td>'+likNullData(arr['good_attr'])+'</td>\
                                    <td>'+likNullData(arr['num'])+''+likNullData(arr['good_unit'])+'</td>\
                                    <td>'+likNullData(arr['price'])+'</td>\
                                    <td>'+likNullData(arr['containing_money'])+'</td>\
                                    <td>'+likNullData(arr['total_money'])+'</td>\
                                    <td><button class="but_mix box_open_btn_3 but_blue_1">展开</button></td>\
                                </tr>\
                            </tbody>\
                            </table>\
                            </div>\
                            </div>\
                            <div class="xs_xsbjd_table_t2 none" style="padding: 10px;border-bottom: 2px solid #e6e6e6;">\
                            <div class="box_open_list goods_tc_toggle">'+setting+'</div>\
                            </div>'

                               })
                           }

                           $(".tanceng .zj_cgbjd_zj_goods_content_show").html(complete);
                       }
                   }

               }
           });

           /!*转采购报价单提交*!/
           $(".tanceng .zj_zcgbjd_quote_create_submit").die().live("click",function () {
               cgbjd_data.code_sn=$('.zj_z_cgbjd_num').val();
               cgbjd_data.borrow_id=id;
               cgbjd_data.borrow_code_sn=$(".zj_z_cgbjd_gl_jrd").val();
               cgbjd_data.supplier_id=supplier_id;
               cgbjd_data.supplier_name=supplier_name;
               if($(".zj_zcgbjd_tex_val").val()=='含税17%'){
                   cgbjd_data.tax_rate=1;
               }else{
                   cgbjd_data.tax_rate=0;
               }


               /!*审批人*!/
               var copy_flow=[];
               $(".tanceng .zj_zcgbjd_spr_show .zj_spr_num").each(function(){
                   copy_flow.push($(this).data('id'));
               })
               cgbjd_data.flow=copy_flow.toString();
               cgbjd_data.remark=$(".zj_jrd_show_reark_info").val();
               var state=2;
               $(".zj_jrd_is_check_state input").each(function () {
                   if($(this).is(':checked')){
                       state=$(this).data('id');
                   }
               })
               cgbjd_data.is_freight= state;
               cgbjd_data.contactor=$('.zj_jrd_gys_person_info_val').val();
               cgbjd_data.tel=$(".zcj_jrd_gys_person_mobile").val();
               cgbjd_data.address=$(".zj_jrd_gys_address_info").val();
               cgbjd_data.shipments_time=$(".zj_jrd_gys_fh_day").val();
               /!*商品*!/
               var jrgh_goods=[];
               var pt_goods={};
               $(".tanceng .zj_select_cgbjd_goods_content_tbody tr input").each(function(i){
                   if($(this).is(':checked')){
                       jrgh_goods.push({
                           good_id:$(this).data('id'),
                           good_name:$(this).parents('tr').find('td').eq(2).text(),
                           good_sn:$(this).parents('tr').find('td').eq(1).text(),
                           good_attr: $(this).parents('tr').find('td').eq(3).text(),
                           good_unit:$(this).data('good_unit'),
                           good_num:$(this).data('good_num'),
                           good_price:$(this).parents('tr').find('td').eq(5).text(),
                           good_rate_price:$(this).parents('tr').find('td').eq(6).text(),
                           good_total:$(this).parents('tr').find('td').eq(7).text()
                       })
                   }
               })
               pt_goods.goods=jrgh_goods;
               cgbjd_data.goods=pt_goods;
               /!*整机商品*!/
               var zj_goods=[];
               var SettingJson={};
               $(".tanceng .zj_cgbjd_zj_goods_content_show .xs_div_2 tbody input").each(function (i) {
                   var match_goods=[];
                   if($(this).is(':checked')){
                   $(".tanceng .zj_cgbjd_zj_goods_content_show .xs_xsbjd_table_t2 table thead tr:first-child").eq(i).each(function(i2){
                       var pz_goods=[];
                       $(".tanceng .zj_cgbjd_zj_goods_content_show .xs_xsbjd_table_t2 table tbody input").eq(i2).each(function (i3) {

                               pz_goods.push({
                                   good_id: $(this).data('id'),
                                   good_sn: $(this).parents('tr').find('td').eq(1).text(),
                                   good_attr: $(this).parents('tr').find('td').eq(2).text(),
                                   sing_num: $(this).data('sing_num'),
                                   total_num: $(this).data('return_num'),
                                   good_price: $(this).parents('tr').find('td').eq(4).text(),
                                   good_rate: $(this).parents('tr').find('td').eq(5).text(),
                                   good_rate_price: $(this).parents('tr').find('td').eq(6).text(),
                                   good_total: $(this).parents('tr').find('td').eq(7).text()
                               })

                       })

                       match_goods.push({
                           title:$(this).find('th').text(),
                           attr_list:pz_goods
                       })

                   })

                       zj_goods.push({
                           setting_id:$(this).data('id'),
                           setting_name:$(this).parents('tr').find('td').eq(2).text(),
                           setting_sn:$(this).parents('tr').find('td').eq(1).text(),
                           setting_unit:$(this).data('good_unit'),
                           setting_attr:$(this).parents('tr').find('td').eq(3).text(),
                           setting_num:$(this).data('num'),
                           setting_price:$(this).parents('tr').find('td').eq(5).text(),
                           setting_rate:$(this).data('containing_rate'),
                           setting_rate_price:$(this).parents('tr').find('td').eq(6).text(),
                           setting_total:$(this).parents('tr').find('td').eq(1).text(),
                           good_list:match_goods
                       })
                   }
               })

               var jrgh_goods_info=JSON.stringify(jrgh_goods);
               var jrgh_goods_zj=JSON.stringify(zj_goods);
               // cgbjd_data.goods=jrgh_goods_info;
               // cgbjd_data.setting=jrgh_goods_zj;
               SettingJson.setting=zj_goods
               console.log('000');
               console.log(SettingJson);
               console.log('000');
               cgbjd_data.setting=SettingJson
               $.ajax({
                   type: 'post',
                   url: SERVER_URL + "/buy-quote/add",
                   data: cgbjd_data,
                   dataType: "json",
                   success: function (data) {
                       console.log('300');
                       console.log(data);
                       console.log('300');
                       if(data.code==0){
                           $(this).parents('.page65_newxsbjd').find('.dialog_close').click();
                       }
                   }
               })
           });

       });*/

       /*借入归还单详情*/
       $("#zj_jrgh_info_table_name").die().live('click',function(){
           $.ajax({
               type: 'GET',
               url: SERVER_URL + "/borrow-out/list",
               data: {
                   token: token,
                   //company_id: company_id, //公司id
                   borrow_id: sp_id// 用户id

               },
               dataType: "json",
               success: function (data) {
                   console.log('借入归还');
                   console.log(data);
                   console.log('借入归还');
                    $(".zj_jrgh_list_sum_num").html('('+data['totalcount']+')')
                   var html=''
                   $.each(data['dataList'],function(index,gh_list){
                       var logistics='';
                       if(gh_list['logistics_way']==1){
                           logistics='快递';
                       }else if(gh_list['logistics_way']==2){
                           logistics='陆运';
                       }else if(gh_list['logistics_way']==3){
                           logistics='空运';
                       }else if(gh_list['logistics_way']==4){
                           logistics='平邮';
                       }else if(gh_list['logistics_way']==5){
                           logistics='海运';
                       }
                       html+='<div class="takenote_jrd_jcgh">\
                        <div class="d-r-t-h sbar">\
                        <h3 class="cont_title">基本信息</h3>\
                        <p class="l-s-x">借入归还单编号：<span>'+gh_list['code_sn']+'</span></p>\
                        <p class="l-s-x">借入单编号：<span>'+gh_list['borrow_code_sn']+'</span></p>\
                        <p class="l-s-x">供应商：<span>'+gh_list['supplier_name']+'</span></p>\
                        </div>\
                        <div class="d-r-t-h sbar">\
                            <h3 class="cont_title">出库信息</h3>\
                            <p class="l-s-x">发货时间：<span>'+gh_list['shipments_time']+'</span></p>\
                        <p class="l-s-x">物流方式：<span>'+logistics+'</span></p>\
                        <p class="l-s-x">承担运费：<span>'+(gh_list['is_freight']==1 ? '不包' : '包运费')+'</span></p>\
                        <p class="l-s-x">供应商联系人：<span>'+gh_list['contactor']+'</span></p>\
                        <p class="l-s-x">联系电话：<span class="">'+gh_list['tel']+'</span></p>\
                        <p class="l-s-x">收货地址：<span class="">'+gh_list['address']+'</span></p>\
                        </div>\
                        <div class="d-r-t-h sbar">\
                        <h3 class="cont_title">借入归还商品</h3>\
                        <p class="l-s-x"><span style="margin-left: -5px;"><button class="but_blue but_small val_dialog zj_jrd_check_jrgh_btn" data-id="'+gh_list['id']+'" name="takenote_jrd_jrgh_jbxxxq">查看借入归还单</button></span></p>\
                        </div>\
                        </div>';
                   })
                   $(".zj_jrd_jrghd_info_show_content").html(html);

               }
           })

       });
       /*查看借入归还单btn*/
       $(".zj_jrd_check_jrgh_btn").die().live("click",function () {
           var jrghd_id=$(this).data('id');
           if(jrghd_id>0){
               $.ajax({
                   type: 'GET',
                   url: SERVER_URL + "/borrow-out/infobyid",
                   data: {
                       token: token,
                       //company_id: company_id, //公司id
                       id: jrghd_id,
                       detail:1// 用户id
                   },
                   dataType: "json",
                   success: function (data) {
                       console.log('归还单');
                       console.log(data);
                       console.log('20001110000000000000000');

                       $(".zj_check_jrgh_gs_name_show").text(likNullData(data['data']['supplier_name']));
                       $(".zj_jrgh_quote_look_create_at").text(likNullData(subTime(data['data']['create_time'])))
                       $(".zj_jrgh_quote_look_uname").text(likNullData(data['data']['user_name']))
                       $(".zj_jrgh_check_info_xq_box .zj_jrgh_con").eq(0).text(data['data']['code_sn']);
                       $(".zj_jrgh_check_info_xq_box .zj_jrgh_con").eq(1).text(data['data']['borrow_code_sn']);
                       $(".zj_jrgh_check_info_xq_box .zj_jrgh_con").eq(2).text(data['data']['supplier_name']);
                       $(".zj_jrgh_check_info_xq_box .zj_jrgh_con").eq(3).text(data['data']['shipments_time']);

                       if(data['data']['logistics_way']==1){
                           $(".zj_jrgh_check_info_xq_box .zj_jrgh_con").eq(4).text('快递');

                       }else if(data['data']['logistics_way']==2){
                           $(".zj_jrgh_check_info_xq_box .zj_jrgh_con").eq(4).text('陆运');

                       }else if(data['data']['logistics_way']==3){
                           $(".zj_jrgh_check_info_xq_box .zj_jrgh_con").eq(4).text('空运');

                       }else if(data['data']['logistics_way']==4){
                           $(".zj_jrgh_check_info_xq_box .zj_jrgh_con").eq(4).text('平邮');

                       }else if(data['data']['logistics_way']==5){
                           $(".zj_jrgh_check_info_xq_box .zj_jrgh_con").eq(4).text('海运');

                       }
                       //$(".zj_jrgh_check_info_xq_box .zj_jrgh_con").eq(5).text(data['data']['is_freight']);
                       if(data['data']['is_freight']==1){
                           $(".zj_jrgh_check_info_xq_box .zj_jrgh_con").eq(5).text('不包');
                       }else if(data['data']['logistics_way']==2){
                           $(".zj_jrgh_check_info_xq_box .zj_jrgh_con").eq(5).text('包运费');
                       }
                       $(".zj_jrgh_check_info_xq_box .zj_jrgh_con").eq(6).text(data['data']['contactor']);
                       $(".zj_jrgh_check_info_xq_box .zj_jrgh_con").eq(7).text(data['data']['tel']);
                       $(".zj_jrgh_check_info_xq_box .zj_jrgh_con").eq(8).text(data['data']['address']);
                       //$(".zj_jrd_cgbjd_jb_info_check p span").eq(8).text(data['data']['code_sn'])
                       // $(".zj_cgbjd_check_bjd_xq").data('id',data['data']['id']);
                       /* if(data['data']['goods']['sum_total']){
                        $(".tanceng .zj_goods_zprice .zj_goods_hj_znum").text(data['data']['goods']['sum_total']);
                        }
                        if(data['data']['setting']['sum_total']){
                        $(".xs_bjd_table_3 .zj_hj_zj_money").text(data['data']['setting']['sum_total']);
                        }*/


                       /*ff*/
                       // $(".zj_dj_hj_price_num").text(data['data']['unit_price_total']);
                       // $(".zj_hs_hj_zprice_number").text(data['data']['tax_total']);
                       // $(".zj_other_price_num").text(data['data']['other_costs']);
                       // $(".zj_znum_zj_m_price").text(data['data']['all_money']);


                       var html='';
                       $.each(data['data']['goods'],function(i,v){

                           html+='<tr>\
                            <td>'+likNullData(v['code_sn'])+'</td>\
                            <td>'+likNullData(v['product_name'])+'</td>\
                            <td>'+likNullData(v['attr_name'])+'</td>\
                            <td>'+likNullData(v['num'])+'</td>\
                            <td>'+likNullData(v['return_num'])+'</td>\
                            <td></td>\
                            </tr>'

                       })
                       $(".zj_jrgh_check_content_goods").html(html);
                       /*整机商品*/

                       var complete='';
                       $.each(data['data']['setting'],function(i,arr){
                           var setting='';
                           if(arr['pieceList']){
                               $.each(arr['pieceList'],function(i2,v2){
                                   var setting_goods=''
                                   if(v2['list']){
                                       $.each(v2['list'],function(i3,v3){
                                           setting_goods+='<tr>\
                                                <td>'+likNullData(v3['code_sn'])+'</td>\
                                                <td>'+likNullData(v3['attr_name'])+'</td>\
                                                <td>'+likNullData(v3['num'])+'</td>\
                                                <td>'+likNullData(v3['return_num'])+'</td>\
                                                <td></td>\
                                                </tr>'
                                       })
                                   }

                                   setting+='<table class="xs_bjd_table_1">\
                                <thead>\
                                <tr style="background: #fff;">\
                                <th class="c_3" style="font-weight: 100;">'+likNullData(v2['cate_name'])+'</th>\
                                <th></th>\
                                <th></th>\
                                </tr>\
                                <tr>\
                                <th width="140">编号</th>\
                                <th width="380">属性</th>\
                                <th width="70">借入数量</th>\
                                <th width="70">归还数量</th>\
                                <th width="60"></th>\
                                </tr>\
                                </thead>\
                                <tbody>'+setting_goods+'\
                                </tbody>\
                            </table>'
                               })
                           }

                           complete+='<div class="xs_div_2" style="margin-top: 20px;">\
                            <table class="xs_bjd_table">\
                            <thead>\
                            <tr>\
                            <th width="140">编号</th>\
                            <th width="120">名称</th>\
                            <th width="240">属性</th>\
                            <th width="70">借入数量</th>\
                            <th width="70">归还数量</th>\
                            <th width="60">配件</th>\
                            </tr>\
                            </thead>\
                            <tbody>\
                                <tr class="c_3 c_3 xs_bjd_bold">\
                                    <td>'+likNullData(arr['code_sn'])+'</td>\
                                    <td>'+likNullData(arr['product_name'])+'</td>\
                                    <td>'+likNullData(arr['attr_name'])+'</td>\
                                    <td>'+likNullData(arr['num'])+''+arr['unit_name']+'</td>\
                                    <td>'+likNullData(arr['return_num'])+'</td>\
                                    <td><button class="but_mix box_open_btn_1 but_blue_1">展开</button></td>\
                                </tr>\
                            </tbody>\
                            </table>\
                            </div>\
                            <div class="xs_tc_goods_box goods_tc_toggle" style="display: none;">'+setting+'</div>'

                       })


                       $(".tanceng .zj_complate_goods_content_show_info").html(complete);
                   }
               })
           }

       });

       /*查看 通过审批*/
       $(".zj_sp_pass_jrd_tg_btn").die().live("click",function(){
           var sp_this=this;
           var t_id=$(this).data('id');
           /*审批通过确定*/
           $(".zcj_sp_bz_end_tg_pass_btn").die().live("click",function () {

                    var _this=this;
                   var note;
               if($(".zj_sp_yj_text_area_val").val()=='请输入审批意见'){
                   note=''
               }else{
                   note=$(".zj_sp_yj_text_area_val").val();
               }
               if(note==''){
                   alert('请输入审批意见');
               }else {
                   $.ajax({
                       type: 'post',
                       url: SERVER_URL + "/borrow/pass",
                       data: {
                           token: token,
                           uid: uid,
                           id: sp_id,
                           approval_status: t_id,
                           note: note
                       },
                       dataType: "json",
                       success: function (data) {
                           console.log('200');
                           console.log(data);
                           console.log('200');
                           jrd_dwsp_mine_fn();
                           $(_this).parents('.dialog_content_sp').find('.dialog_close').click();
                           $(sp_this).parents('.dialog_content_middle5').find('.dialog_close').click();
                       }
                   })
               }

           });

       });
       /*审批拒绝确定*/
       $(".zj_jrd_turn_btn").die().live("click",function () {
           var sp_this=this;
           var jq_id=$(this).data('id')
           $(".zcj_sp_bz_end_tg_pass_btn").die().live("click",function(){
               var _this=this;
               var note;
               if($(".zj_sp_yj_text_area_val").val()=='请输入审批意见'){
                   note=''
               }else{
                   note=$(".zj_sp_yj_text_area_val").val();
               }
               if(note==''){
                   alert('请输入审批意见');
               }else{
                   $.ajax({
                       type: 'post',
                       url: SERVER_URL + "/borrow/pass",
                       data: {
                           token: token,
                           uid:uid,
                           id:sp_id,
                           approval_status:jq_id,
                           note:note
                       },
                       dataType: "json",
                       success: function (data) {
                           console.log('200');
                           console.log(data);
                           console.log('200');
                           jrd_dwsp_mine_fn();
                           $(_this).parents('.dialog_content_sp').find('.dialog_close').click();
                           $(sp_this).parents('.dialog_content_middle5').find('.dialog_close').click();
                       }
                   })
               }

           });
       });

       /*采购报价单*/
       $("#zj_cgbjd_info_table_name").die().live("click",function(){

           $.ajax({
               type: 'post',
               url: SERVER_URL + "/borrow/purchase",
               data: {
                   token: token,
                   //company_id: company_id, //公司id
                   id: sp_id// 用户id
               },
               dataType: "json",
               success: function (data) {
                   console.log('采购报价单');
                   console.log(data);
                   console.log('采购报价单');
                   $(".zj_cgbjd_list_sum_num").html('('+data['data'].length+')')
                   var cg_list='';
                   $.each(data['data'],function(i,vlist){
                       var rete=''
                       if(vlist['tax_rate']==1){
                           rete='17%';
                       }else{
                           rete='无税'
                       }
                       var goods_lx=''
                       if(vlist['goods_type']==1){
                           goods_lx='普通商品'
                       }else if(vlist['goods_type']==2){
                           goods_lx='套餐商品'
                       }else if(vlist['goods_type']==3){
                           goods_lx='配置商品'
                       }
                       cg_list+='<div class="takenote_jrd_jcgh">\
                        <div class="d-r-t-h sbar">\
                        <h3 class="cont_title">基本信息</h3>\
                        <p class="l-s-x">报价单编号：<span>'+vlist['code_sn']+'</span></p>\
                        <p class="l-s-x">关联合同：<span>'+vlist['purchase_sn']+'</span></p>\
                        <p class="l-s-x">关联采购订单：<span>'+vlist['order_sn']+'</span></p>\
                        <p class="l-s-x">关联借入单：<span>'+vlist['borrow_sn']+'</span></p>\
                        <p class="l-s-x">供应商名称：<span>'+vlist['supplier_name']+'</span></p>\
                        <p class="l-s-x">采购商品类型：<span>'+vlist['goods_type']+'</span></p>\
                        <p class="l-s-x">税率：<span>'+rete+'</span></p>\
                        <p class="l-s-x">总金额（元）：<span>'+vlist['totals']+'</span></p>\
                        <p class="l-s-x" style="margin-bottom: 30px;"><span style="margin-left: -5px;"><button data-id="'+vlist['id']+'" class="but_blue but_small val_dialog zj_cgbjd_check_bjd_xq" name="cg_cgthh_xq_hh">查看报价单</button></span></p>\
                        </div>\
                        </div>';
                   })
                   $(".zj_jrd_cgbjd_info_content").html(cg_list)

               }
           })
           $(".zj_cgbjd_check_bjd_xq").die().live("click",function () {
               var cgid=$(this).data('id');
               $.ajax({
                   type: 'get',
                   url: SERVER_URL + "/buy-quote/detail",
                   data: {
                       token: token,
                       //company_id: company_id, //公司id
                       buy_quote_id: cgid // 用户id
                   },
                   dataType: "json",
                   success: function (data) {
                       console.log('查看报价单1');
                       console.log(data);
                       console.log('查看报价单1');
                       if(data.code==0){
                           if(data['data'].length==0){
                               return true;
                           }
                           $(".zj_check_gs_name_show").text(likNullData(data['data']['supplier_name']))
                           $(".zj_sell_quote_look_create_at").text(likNullData(data['data']['created_at']));
                           $(".zj_sell_quote_look_uname").text(likNullData(data['data']['current_name']));
                           $(".zj_bjd_header_info_dv_show .zj_head").eq(0).text(likNullData(data['data']['code_sn']));
                           $(".zj_bjd_header_info_dv_show .zj_head").eq(1).text(likNullData(data['data']['supplier_name']));
                           $(".zj_bjd_header_info_dv_show .zj_head").eq(2).text(likNullData(data['data']['dept_name']));
                           $(".zj_bjd_header_info_dv_show .zj_head").eq(3).text(likNullData(data['data']['owner_name']));



                           /*ff*/
                           $(".zj_cgbjd_hj_price_num").text(likNullData(data['data']['money_sum']));
                           $(".zj_cgbjd_hj_zprice_number").text(likNullData(data['data']['tax_money_sum']));
                           $(".zj_cgbjd_other_price_num").text(likNullData(data['data']['other_free']));
                           $(".zj_cgbjd_znum_zj_m_price").text(likNullData(data['data']['totals']));

                           /*普通商品*/
                           if(data['data']['product_json']['goods']['sum_total']){
                               $(".zj_pt_goods_znum_sl").text(data['data']['product_json']['goods']['sum_total']);
                           }

                           /*整机商品总价*/
                           if(data['data']['product_json']['setting']['sum_total']){
                               $(".zj_check_info_hj_price").text(data['data']['product_json']['setting']['sum_total']);
                           }

                           var html='';
                           if(data['data']['product_json']['goods']){
                               if(data['data']['product_json']['goods'].length==0){
                                   return true;
                               }
                               $.each(data['data']['product_json']['goods']['goods'],function(i,v){

                                   html+='<tr>\
                                        <td>'+repair(i+1)+'</td>\
                                        <td>'+likNullData(v['good_sn'])+'</td>\
                                        <td>'+likNullData(v['good_name'])+'</td>\
                                        <td>'+likNullData(v['good_attr'])+'</td>\
                                        <td>'+likNullData(v['good_num'])+''+v['good_unit']+'</td>\
                                        <td>'+likNullData(v['good_price'])+'</td>\
                                        <td>'+likNullData(v['good_rate_price'])+'</td>\
                                        <td>'+likNullData(v['good_total'])+'</td>\
                                        </tr>'

                               })
                               $(".zj_cgbjd_xq_goods_info").html(html);
                           }


                           /*整机商品*/

                           var complete='';
                           if(data['data']['product_json']['setting']){
                               if(data['data']['product_json']['setting'].length==0){
                                   return true;
                               }
                               $.each(data['data']['product_json']['setting']['setting'],function(i,arr){
                                   var setting='';
                                   if(arr['good_list']){
                                       $.each(arr['good_list'],function(i2,v2){
                                           var setting_goods=''
                                           if(v2['attr_list']){
                                               $.each(v2['attr_list'],function(i3,v3){
                                                   setting_goods+='<tr>\
                                                <td>'+likNullData(v3['good_sn'])+'</td>\
                                                <td>'+likNullData(v3['good_attr'])+'</td>\
                                                <td>'+likNullData(v3['total_num'])+''+v3['good_unit']+'</td>\
                                                <td>'+likNullData(v3['good_price'])+'</td>\
                                                <td>'+likNullData(v3['good_rate_price'])+'</td>\
                                                <td>'+likNullData(v3['good_total'])+'</td>\
                                                <td></td>\
                                                </tr>'
                                               })
                                           }

                                           setting+='<table class="xs_bjd_table_1">\
                                <thead>\
                                <tr style="background: #fff;">\
                                <th class="c_3" style="font-weight: 100;">'+likNullData(v2['title'])+'</th>\
                                <th></th>\
                                <th></th>\
                                </tr>\
                                <tr>\
                                <th width="90">编号</th>\
                                <th width="560">属性</th>\
                                <th width="50">数量</th>\
                                <th width="150">单价</th>\
                                <th width="90">含税价</th>\
                                <th width="90">总价</th>\
                                <th width="60"></th>\
                                </tr>\
                                </thead>\
                                <tbody>'+setting_goods+'\
                                </tbody>\
                            </table>'
                                       })
                                   }

                                   complete+='<div class="xs_div_2" style="margin-top: 20px;">\
                            <table class="xs_bjd_table">\
                            <thead>\
                            <tr>\
                            <th width="30">序号</th>\
                            <th width="90">编号</th>\
                            <th width="150">名称</th>\
                            <th width="325">属性</th>\
                            <th width="50">数量</th>\
                            <th width="150">单价</th>\
                            <th width="90">含税价</th>\
                            <th width="90">总价</th>\
                            <th width="60">配件</th>\
                            </tr>\
                            </thead>\
                            <tbody>\
                                <tr class="c_3 c_3 xs_bjd_bold">\
                                    <td>'+repair(i+1)+'</td>\
                                    <td>'+likNullData(arr['setting_sn'])+'</td>\
                                    <td>'+likNullData(arr['setting_name'])+'</td>\
                                    <td>'+likNullData(arr['setting_attr'])+'</td>\
                                    <td>'+likNullData(arr['setting_num'])+''+arr['setting_unit']+'</td>\
                                    <td>'+likNullData(arr['setting_price'])+'</td>\
                                    <td>'+likNullData(arr['setting_rate_price'])+'</td>\
                                    <td>'+likNullData(arr['setting_total'])+'</td>\
                                    <td><button class="but_mix box_open_btn_1 but_blue_1">展开</button></td>\
                                </tr>\
                            </tbody>\
                            </table>\
                            </div>\
                            <div class="xs_tc_goods_box goods_tc_toggle" style="display: none;">'+setting+'</div>'

                               })
                           }



                           $(".tanceng .zj_zj_goods_complete_info_div_nr").html(complete);
                       }


                   }
               })
           });

       });

       /*入库单*/
       $("#zj_rkd_info_table_name").die().live("click",function(){
           $.ajax({
               type: 'GET',
               url: SERVER_URL + "/lend-out/stockininfo",
               data: {
                   token: token,
                   //company_id: company_id, //公司id
                   related_receipts_no: c_code// 用户id

               },
               dataType: "json",
               success: function (data) {
                   console.log('报价单详情');
                   console.log(data);
                   console.log('报价单详情');
                   if(data['data']['input_status']==1){
                       $(".zj_rkd_bfrk_state").text('待入库');
                   }else if(data['data']['input_status']==2){
                       $(".zj_rkd_bfrk_state").text('部分入库');
                   }else if(data['data']['input_status']==3){
                       $(".zj_rkd_bfrk_state").text('完成入库');
                   }
                   if(data['data']['stockingInList']['input_num']){
                       $('.zj_sell_order_look_skjl_tbody_nodata_box').hide();
                       var rk_info='<tr class="table_total ven_sell_order_look_skjl_tbody_table_total">\
                    <td>'+data['data']['stockingInList']['input_num']+'</td>\
                    <td>'+data['data']['stockingInList']['distribution_num']+'</td>\
                    <td>'+data['data']['stockingInList']['set_num']+'</td>\
                    <td>'+data['data']['stockingInList']['set_distribution_num']+'</td>\
                    <td>'+data['data']['stockingInList']['document_marker']+'</td>\
                    <td>'+data['data']['stockingInList']['distribution_name']+'</td>\
                    </tr>'
                       $(".zj_goods_num_order_look_skjl_tbody").html(rk_info);
                   }else {
                       $(".zj_goods_num_order_look_skjl_tbody").empty();
                       $('.zj_sell_order_look_skjl_tbody_nodata_box').show();
                   }

                   var kf_goods=''
                   if(data['data']['stockInList'].length>0) {
                       $(".zj_no_order_look_skjl_tbody_nodata_box").hide();
                       $.each(data['data']['stockInList'], function (i, goods_info) {
                           kf_goods += '<tr class="table_total ven_sell_order_look_skjl_tbody_table_total">\
                    <td>' + repair(i + 1) + '</td>\
                    <td>' + goods_info['warehouse_name'] + '</td>\
                    <td>' + goods_info['input_num'] + '</td>\
                    <td>' + goods_info['distribution_num'] + '</td>\
                    <td>' + goods_info['set_distribution_num'] + '</td>\
                    <td>' + goods_info['set_num'] + '</td>\
                    <td>' + goods_info['break_num'] + '</td>\
                    <td>' + goods_info['input_status'] + '</td>\
                    <td>' + goods_info['input_name'] + '</td>\
                    </tr>'
                       })
                       $(".zj_jcd_order_look_skjl_tbody").html(kf_goods);
                   }else{
                       $(".zj_jcd_order_look_skjl_tbody").empty();
                       $(".zj_no_order_look_skjl_tbody_nodata_box").show();
                   }
                   // var wl_list='';
                   // $.each(data['data']['logisticsList'],function(){
                   //     wl_list+=''
                   // })
               },
               error:function(data){
                   alert("服务器错误，请稍后再试");
               }
           })
       });

   });

/*待我审批btn*/
    $(".zj_dwsp_sp_btn_info").die().live("click",function () {
        $(".zj_dwsp_sp_div").show();
        $(".zj_my_fq_zcgbj_div").hide();

        $(".zj_my_cswd_zcgbj_div").hide();
        var sp_id=$(this).data('id');
        $.ajax({
            type: 'POST',
            url: SERVER_URL + "/borrow/look-borrow",
            data: {
                token: token,
                //company_id: company_id, //公司id
                id: sp_id  // 用户id
            },
            dataType: "json",
            success: function (data) {
                console.log('待我审批查看借入单');
                console.log(data);
                console.log('20001110000000000000000');
                if(data.code==0){
                    if(data['data'].length==0){
                        return true;

                    }
                    $(".zj_jrd_zcgbjd_end_btn").data('id',data['data']['id']).data('code_sn',data['data']['code_sn']).data('supplier_name',data['data']['supplier_name']).data('supplier_id',data['data']['id']);//id
                    $(".zj_jrd_xq_header_name").text(data['data']['supplier_name']);
                    $(".zj_xdr_name_show").text(data['data']['xiadan_name']);
                    $(".zj_create_day_time_show").text(subTime(data['data']['create_time']));
                    $(".tanceng .zj_jrd_info_num_header_show .zj_jrd_bh_show_num").text(data['data']['code_sn']);
                    $(".tanceng .zj_jrd_info_num_header_show .zj_supplier_name_show").text(data['data']['supplier_name']);
                    $(".tanceng .zj_jrd_info_num_header_show .zj_yjgh_time_show").text(subTime(data['data']['expect_return_time']));
                    $(".tanceng .zj_jrd_info_num_header_show .zj_rk_day_show").text(subTime(data['data']['library_time']));
                    $(".tanceng .zj_jrd_info_num_header_show .zj_note_info_show").text(data['data']['note']);
                    if(data['data']['goods']['sum_total']){
                        $(".tanceng .zj_goods_zprice .zj_goods_hj_znum").text(data['data']['goods']['sum_total']);
                    }
                    // if(data['data']['setting']['sum_total']){
                    //     $(".xs_bjd_table_3 .zj_hj_zj_money").text(data['data']['setting']['sum_total']);
                    // }


                    /*ff*/
                    $(".zj_dj_hj_price_num").text(data['data']['unit_price_total']);
                    $(".zj_hs_hj_zprice_number").text(data['data']['tax_total']);
                    $(".zj_other_price_num").text(data['data']['other_costs']);
                    $(".zj_znum_zj_m_price").text(data['data']['all_money']);

                    $(".tanceng")
                    var html='';
                    $.each(data['data']['goods'],function(i,v){
                        $.each(v,function(i2,v2){
                            var pair=repair(i2+1);
                            html+='<tr>\
                            <td>'+pair+'</td>\
                            <td>'+likNullData(v2['good_sn'])+'</td>\
                            <td>'+likNullData(v2['good_name'])+'</td>\
                            <td>'+likNullData(v2['good_attr'])+'</td>\
                            <td>'+likNullData(v2['good_num'])+'</td>\
                            <td>'+likNullData(v2['good_price'])+'</td>\
                            <td>'+likNullData(v2['good_rate_price'])+'</td>\
                            <td>'+likNullData(v2['good_total'])+'</td>\
                            <td></td>\
                            </tr>'
                        })

                    })
                    $(".zj_goods_table_content_info").html(html);
                    /*整机商品*/

                    var complete='';
                    $.each(data['data']['setting'],function(i,arr){
                        var p=repair(i+1)
                        var setting='';
                        if(arr['good_list']){
                            $.each(arr['good_list'],function(i2,v2){
                                var setting_goods=''
                                if(v2['attr_list']){
                                    $.each(v2['attr_list'],function(i3,v3){
                                        setting_goods+='<tr>\
                                                <td>'+likNullData(v3['good_sn'])+'</td>\
                                                <td>'+likNullData(v3['good_attr'])+'</td>\
                                                <td>'+likNullData(v3['sing_num'])+'</td>\
                                                <td>'+likNullData(v3['good_price'])+'</td>\
                                                <td>'+likNullData(v3['good_rate_price'])+'</td>\
                                                <td>'+likNullData(v3['good_total'])+'</td>\
                                                <td></td>\
                                                </tr>'
                                    })
                                }

                                setting+='<table class="xs_bjd_table_1">\
                                <thead>\
                                <tr style="background: #fff;">\
                                <th class="c_3" style="font-weight: 100;">'+likNullData(v2['title'])+'</th>\
                                <th></th>\
                                <th></th>\
                                </tr>\
                                <tr>\
                                <th width="90">编号</th>\
                                <th width="560">属性</th>\
                                <th width="50">数量</th>\
                                <th width="150">单价</th>\
                                <th width="90">含税价</th>\
                                <th width="90">总价</th>\
                                <th width="60"></th>\
                                </tr>\
                                </thead>\
                                <tbody>'+setting_goods+'\
                                </tbody>\
                            </table>'
                            })
                        }

                        complete+='<div class="xs_div_2" style="margin-top: 20px;">\
                            <table class="xs_bjd_table">\
                            <thead>\
                            <tr>\
                            <th width="30">序号</th>\
                            <th width="90">编号</th>\
                            <th width="150">名称</th>\
                            <th width="340">属性</th>\
                            <th width="50">数量</th>\
                            <th width="150">单价</th>\
                            <th width="90">含税价</th>\
                            <th width="90">总价</th>\
                            <th width="60">配件</th>\
                            </tr>\
                            </thead>\
                            <tbody>\
                                <tr class="c_3 c_3 xs_bjd_bold">\
                                    <td>'+p+'</td>\
                                    <td>'+likNullData(arr['good_sn'])+'</td>\
                                    <td>'+likNullData(arr['good_name'])+'</td>\
                                    <td>'+likNullData(arr['good_attr'])+'</td>\
                                    <td>'+likNullData(arr['num'])+''+arr['good_unit']+'</td>\
                                    <td>'+likNullData(arr['price'])+'</td>\
                                    <td>'+likNullData(arr['containing_money'])+'</td>\
                                    <td class="zj_pz_sum_price">'+likNullData(arr['total_money'])+'</td>\
                                    <td><button class="but_mix box_open_btn_1 but_blue_1">展开</button></td>\
                                </tr>\
                            </tbody>\
                            </table>\
                            </div>\
                            <div class="xs_tc_goods_box goods_tc_toggle" style="display: none;">'+setting+'</div>'

                    })


                    $(".tanceng .zj_zj_goods_dv_content").html(complete);
                    var sum_price=0;
                    $(".tanceng .zj_zj_goods_dv_content .zj_pz_sum_price").each(function(){
                        sum_price+=parseFloat($(this).text());
                    })
                    $(".tanceng .zj_hj_zj_money").text(sum_price)
                }

            }
        })

        /* 通过审批*/
        $(".zj_sp_pass_jrd_tg_btn").die().live("click",function(){
            var sp_this=this;
            var t_id=$(this).data('id');
            /*审批通过确定*/
            $(".zcj_sp_bz_end_tg_pass_btn").die().live("click",function () {

                var _this=this;
                var note;
                if($(".zj_sp_yj_text_area_val").val()=='请输入审批意见'){
                    note=''
                }else{
                    note=$(".zj_sp_yj_text_area_val").val();
                }
                if(note==''){
                    alert('请输入审批意见');
                }else {
                    $.ajax({
                        type: 'post',
                        url: SERVER_URL + "/borrow/pass",
                        data: {
                            token: token,
                            uid: uid,
                            id: sp_id,
                            approval_status: t_id,
                            note: note
                        },
                        dataType: "json",
                        success: function (data) {
                            console.log('200');
                            console.log(data);
                            console.log('200');
                            jrd_dwsp_mine_fn();
                            $(_this).parents('.dialog_content_sp').find('.dialog_close').click();
                            $(sp_this).parents('.dialog_content_middle5').find('.dialog_close').click();
                        }
                    })
                }

            });

        });
        /*审批拒绝确定*/
        $(".zj_jrd_turn_btn").die().live("click",function () {
            var sp_this=this;
            var t_id=$(this).data('id')
            $(".zcj_sp_bz_end_tg_pass_btn").die().live("click",function(){
                var _this=this;
                var note;
                if($(".zj_sp_yj_text_area_val").val()=='请输入审批意见'){
                    note=''
                }else{
                    note=$(".zj_sp_yj_text_area_val").val();
                }
                if(note==''){
                    alert('请输入审批意见');
                }else{
                    $.ajax({
                        type: 'post',
                        url: SERVER_URL + "/borrow/pass",
                        data: {
                            token: token,
                            uid:uid,
                            id:sp_id,
                            approval_status:t_id,
                            note:note
                        },
                        dataType: "json",
                        success: function (data) {
                            console.log('200');
                            console.log(data);
                            console.log('200');
                            jrd_dwsp_mine_fn();
                            $(_this).parents('.dialog_content_sp').find('.dialog_close').click();
                            $(sp_this).parents('.dialog_content_6').find('.dialog_close').click();
                        }
                    })
                }

            });
        });
    });





    /*审批通过*/
    // $(".zcj_sp_bz_end_tg_pass_btn").die().live("click",function () {
    //
    // });

    /**************************抄送我的************************/
    var cs_data={
        token: token,
        uid:uid,
        company_id:company_id,
        page: 1,
        num: 10
    }
    function jrd_copy_mine_fn() {
        $.ajax({
            url: SERVER_URL + "/borrow/cc",
            type: 'POST',
            data: cs_data,
            dataType: 'json',
            success: function (data) {
                console.log(data);
                $(".zj_jrd_show_info_zsum").text(data.total_num);
                if(data.code==0){
                    if(data['data'].length>0){
                        $(".zcj_cswd_jrdfy_head_page_div").show();
                        $(".zj_cs_cswd_no_data_show_dv").hide();
                    }else{
                        $(".zcj_cswd_jrdfy_head_page_div").hide();
                        $(".zj_cs_cswd_no_data_show_dv").show();
                    }
                }else{
                    $(".zcj_cswd_jrdfy_head_page_div").hide();
                    $(".zj_cs_cswd_no_data_show_dv").show();
                }
                var html=''
                if (data.code == 0) {
                    $.each(data['data'],function(i,cs_data){
                        var sort=repair(i+1);
                        html+='<tr> <td>'+sort+'</td> <td>'+likNullData(cs_data['code_sn'])+'</td> <td>'+likNullData(cs_data['supplier_name'])+'</td> <td>'+likNullData(cs_data['expect_return_time'])+'</td>'
                        if(cs_data['approval_status']==1){
                            html+='<td class="c_y">审批中</td> '
                        }else if(cs_data['approval_status']==2){
                            html+='<td class="c_g">审批通过</td> '
                        }else if(cs_data['approval_status']==3){
                            html+='<td class="c_r">驳回</td> '
                        }else{
                            html+='<td class="">-</td>';
                        }
                        html+='<td>'+likNullData(cs_data['approval_name_str'])+'</td> <td>'+likNullData(cs_data['library_time'])+'</td>'
                        if(cs_data['library_status']==1){
                            html+='<td class="c_r">待入库</td>';
                        }else if(cs_data['library_status']==2){
                            html+='<td class="c_y">部分入库</td>';
                        }else if(cs_data['library_status']==3){
                            html+='<td class="c_g">已入库</td>';
                        }else{
                            html+='<td>-</td>';
                        }
                        html+='<td>'+likNullData(cs_data['create_time'])+'</td> <td>'+likNullData(cs_data['name'])+'</td> <td>'+likNullData(cs_data['all_money'])+'</td>';
                        if(cs_data['thetype']==0){
                            html+='<td class="">-</td>';
                        }else if(cs_data['thetype']==1){
                            html+='<td class="c_r">未归还</td>';
                        }else if(cs_data['thetype']==2){
                            html+='<td class="c_y">部分归还</td>';
                        }else if(cs_data['thetype']==3){
                            html+='<td class="c_g">已归还</td>';
                        }else {
                            html+='<td class="">-</td>';
                        }

                        html+='&ndash;&gt; <td>'+likNullData(cs_data['note'])+'</td> <td> <button data-id="'+cs_data['id']+'" data-code_sn="'+cs_data['code_sn']+'" class="but_mix r_sidebar_btn zj_jcd_check_xq_btn" name="takenote_jrd_ck">查看</button></td></tr>';
                    })

                }
    $(".zj_jrd_cs_mine_tbody_content").html(html);
                list_table_render_pagination(".zcj_cswd_jrdfy_head_page_div",cs_data,jrd_copy_mine_fn,data.total_num,data.data.length);
                $(".zcj_jrd_check_save_btn").trigger('click');
            },
            error: function (data) {
                alert('服务器错误');
            }
        });
    }
    $("#zj_jrd_csw_fq_table").die().live("click",function(){
        $(".zj_jrd_wfqd_content_info").removeClass('lik_table_wrap');
        $(".zj_jrd_dwsp_content_info").removeClass('lik_table_wrap');
        $(".zj_jrd_cswd_content_info").addClass('lik_table_wrap');
        // $(".zj_jrd_wfqd_content_info").hide();
        // $(".zj_jrd_dwsp_content_info").hide();
        // $(".zj_jrd_cswd_content_info").show();
        likShow('.zcj_jrd_cswd_table_head_content_show', venCustomLookAbledField, '.zcj_xz_check_x_head_content', '.zcj_jrd_check_save_btn', '.zcj_jrd_check_cancal_btn');
        $(".goods_wfqd_attr_search_table").hide();
        $(".goods_dwsp_attr_search_table").hide();
        $(".goods_cswd_attr_search_table").show();
        jrd_copy_mine_fn();
        /*审批状态*/
        $(".zj_cswd_sp_state_list li").die().live("click",function(){

            var state=$(this).data('id')
            cs_data.approval_status=state;
            cs_data.page=1;
            jrd_copy_mine_fn();
        });
        /*入库状态*/
        $(".zj_cswd_enter_state_list li").die().live("click",function(){
            var library_status=$(this).data('id')
            cs_data.library_status=library_status;
            cs_data.page=1;
            jrd_copy_mine_fn();
        });
        /*归还状态*/
        $(".zj_cswd_gh_state_list li").die().live("click",function(){
            var thetype=$(this).data('id')
            cs_data.thetype=thetype;
            cs_data.page=1;
            jrd_copy_mine_fn();
        });

    });
    /*查看*/
    $(".zj_jcd_check_xq_btn").die().live("click",function(){
        $(".zj_jrgh_list_sum_num").text('')
        $(".zj_cgbjd_list_sum_num").text('');
        $(".slider_head_More").hide();
        $(".zj_check_jrd_xq_info_content_btn").text('查看借入单');
         $(".zj_my_fq_zcgbj_div").hide();
        $(".zj_dwsp_sp_div").hide();
        $(".zj_my_cswd_zcgbj_div").show();
        var cs_id=$(this).data('id');
        var s_code=$(this).data('code_sn')
        /*基本信息*/
        $.ajax({
            type: 'post',
            url: SERVER_URL + "/borrow/basic",
            data: {
                token: token,
                //company_id: company_id, //公司id
                id: cs_id// 用户id

            },
            dataType: "json",
            success: function (data) {
                console.log('2000');
                console.log(data);
                console.log('2000');
                //var info_show=$(".zj_jrd_goods_jb_info_check_show ")
                $(".zj_jcd_supplier_gys_name").text(data['data']['supplier_name']);
                $(".zj_xdr_myname_show").text(data['data']['name']);
                $(".zj_mycreat_day_time").text(data['data']['create_time']);
                $(".zj_jrd_goods_jb_info_check_show .zj_jb_info_content_show p span").eq(0).text(data['data']['code_sn']);
                $(".zj_jrd_goods_jb_info_check_show .zj_jb_info_content_show p span").eq(1).text(data['data']['supplier_name']);
                $(".zj_jrd_goods_jb_info_check_show .zj_jb_info_content_show p span").eq(2).text(data['data']['expect_return_time']);
                if(data['data']['tax_rate']==1){
                    $(".zj_jrd_goods_jb_info_check_show .zj_jb_info_content_show p span").eq(3).text('17%');
                }else{
                    $(".zj_jrd_goods_jb_info_check_show .zj_jb_info_content_show p span").eq(3).text('无税');
                }

                $(".zj_jrd_goods_jb_info_check_show .zj_jb_info_content_show p span").eq(4).text(data['data']['note']);
                var c_name='';
                $.each(data['cc'],function (i,csr_name) {
                    c_name+=''+csr_name['name']+','
                })
                c_name = c_name.slice(0, c_name.length - 1);
                $(".zj_jrd_goods_jb_info_check_show .zj_jb_info_content_show p span").eq(5).text(c_name);

                if(data['data']['thetype']==0){
                    $(".zj_jrd_goods_jb_info_check_show .zj_jb_info_content_show p span").eq(6).text("-");
                }else if(data['data']['thetype']==1){
                    $(".zj_jrd_goods_jb_info_check_show .zj_jb_info_content_show p span").eq(6).text("未归还");
                }else if(data['data']['thetype']==2){
                    $(".zj_jrd_goods_jb_info_check_show .zj_jb_info_content_show p span").eq(6).text("部分归还");
                }else if(data['data']['thetype']==3){
                    $(".zj_jrd_goods_jb_info_check_show .zj_jb_info_content_show p span").eq(6).text("已归还");
                }
                $(".zj_jrd_goods_jb_info_check_show .zj_rk_info").text(data['data']['library_time'])
            }
        })

        /*查看审批结果*/
        $.ajax({
            type: 'post',
            url: SERVER_URL + "/borrow/approval-result",
            data: {
                token: token,
                //company_id: company_id, //公司id
                id: cs_id,//id
                uid:uid

            },
            dataType: "json",
            success: function (data) {
                console.log('审批结果');
                console.log(data);
                console.log('审批结果');
                var html='';
                $.each(data['data'],function(i,vinfo){

                    html+='<div class="work_spiliu">'
                    html+='<div class="work_spiliu_items" style="overflow: hidden;">'
                    html+='<div class="left" style="position: relative;">'
                    html+='<div class="work_spiliu_div">'
                    if(vinfo['headpic']=='' || vinfo['headpic']==null){
                        html+='<img class="inline_block tx" src="static/images/touxiang.png">'
                    }else{
                        html+='<img class="inline_block tx" src="'+getImgUrl(vinfo['headpic'])+'">'
                    }
                    //html+='<img class="inline_block tx" src="static/images/touxiang.png">'
                    html+='<h3 class="work_sp_h3">'+likNullData(vinfo['username'])+'</h3>'
                    if(vinfo['approval_status']!=9){
                        html+='<span class="c_9 m_left_5 zj_bz_is_hid">步骤'+i+'</span>'
                    }else{
                        html+='<span class="c_9 m_left_5 zj_bz_is_hid"></span>'
                    }
                    html+='</div>'
                    if(vinfo['approval_status']==0){
                        html+='<cite class="b_h"></cite>'
                    }else if(vinfo['approval_status']==1){
                        html+='<cite class="b_y"></cite>'
                    }else if(vinfo['approval_status']==2){
                        html+='<cite class="b_g"></cite>'
                    }else if(vinfo['approval_status']==3){
                        html+='<cite class="b_r"></cite>'
                    }else if(vinfo['approval_status']==4){
                        html+='<cite class="b_b"></cite>'
                    }else if(vinfo['approval_status']==9){
                        html+='<cite class="b_b"></cite>'
                    }
                    html+='</div>'
                    html+='<div class="auto_height">'

                        html+='<img src="static/images/work_jiantou.png">'

                    html+='<div class="sp_cont">'
                    html+='<div class="sp_cont_a">'
                    if(vinfo['approval_status']==0){
                        html+='<h3 class="b_h">待审批</h3>'
                    }else if(vinfo['approval_status']==1){
                        html+='<h3 class="c_y">审批中</h3>'
                    }else if(vinfo['approval_status']==2){
                        html+='<h3 class="c_g">审批通过</h3>'
                    }else if(vinfo['approval_status']==3){
                        html+='<h3 class="c_r">拒绝</h3>'
                    }else if(vinfo['approval_status']==4){
                        html+='<h3 class="f_color bold">撤回</h3>'
                    }else if(vinfo['approval_status']==9){
                        html+='<h3 class="f_color bold">发起审批</h3>'

                    }

                    if(vinfo['update_time']==null || vinfo['update_time']==''){
                        html+='<p class="c_9"></p>'
                    }else{
                        html+='<p class="c_9">'+likNullData(vinfo['update_time'])+'</p>'
                    }


                    html+='</div>'
                    if(vinfo['approval_status']==9){
                        html+='<p class="c_3 work_sp_p none1"></p>'
                    }else{
                        html+='<p class="c_3 work_sp_p">'+likNullData(vinfo['note'])+'</p>'
                    }

                    html+='</div>'
                    html+='</div>'
                    html+='<div style="clear: both;height: 0;font-size: 1px;line-height: 0px;"></div>'
                    html+='</div>'
                    html+='</div>'
                })
                $(".zj_sp_jg_result_content_show").html(html);
                if(data['is_across']==1){
                    $(".zj_bz_is_hid").hide();
                }else{
                    $(".zj_bz_is_hid").show();
                }

            }
        })

        /*查看借入单btn*/
        $(".zj_check_jrd_xq_info_content_btn").die().live("click",function(){
            $.ajax({
                type: 'POST',
                url: SERVER_URL + "/borrow/look-borrow",
                data: {
                    token: token,
                    //company_id: company_id, //公司id
                    id: cs_id// 用户id
                },
                dataType: "json",
                success: function (data) {
                    console.log('抄送查看借入单');
                    console.log(data);
                    console.log('20001110000000000000000');
                    if(data.code==0){
                        if(data['data'].length==0){
                            return true;
                        }
                        $(".zj_jrd_zcgbjd_end_btn").data('id',data['data']['id']).data('code_sn',data['data']['code_sn']).data('supplier_name',data['data']['supplier_name']).data('supplier_id',data['data']['id']);//id
                        $(".zj_jrd_xq_header_name").text(likNullData(data['data']['supplier_name']));
                        $(".zj_xdr_name_show").text(data['data']['xiadan_name']);
                        $(".zj_create_day_time_show").text(subTime(data['data']['create_time']));
                        $(".tanceng .zj_jrd_info_num_header_show .zj_jrd_bh_show_num").text(data['data']['code_sn']);
                        $(".tanceng .zj_jrd_info_num_header_show .zj_supplier_name_show").text(data['data']['supplier_name']);
                        $(".tanceng .zj_jrd_info_num_header_show .zj_yjgh_time_show").text(subTime(data['data']['expect_return_time']));
                        $(".tanceng .zj_jrd_info_num_header_show .zj_rk_day_show").text(subTime(data['data']['library_time']));
                        $(".tanceng .zj_jrd_info_num_header_show .zj_note_info_show").text(data['data']['note']);
                        if(data['data']['goods']['sum_total']){
                            $(".tanceng .zj_goods_zprice .zj_goods_hj_znum").text(data['data']['goods']['sum_total']);
                        }
                        // if(data['data']['setting']['sum_total']){
                        //     $(".xs_bjd_table_3 .zj_hj_zj_money").text(data['data']['setting']['sum_total']);
                        // }


                        /*ff*/
                        $(".zj_dj_hj_price_num").text(data['data']['unit_price_total']);
                        $(".zj_hs_hj_zprice_number").text(data['data']['tax_total']);
                        $(".zj_other_price_num").text(data['data']['other_costs']);
                        $(".zj_znum_zj_m_price").text(data['data']['all_money']);

                        $(".tanceng")
                        var html='';
                        $.each(data['data']['goods'],function(i,v){
                            $.each(v,function(i2,v2){
                                var pair=repair(i2+1);
                                html+='<tr>\
                            <td>'+pair+'</td>\
                            <td>'+likNullData(v2['good_sn'])+'</td>\
                            <td>'+likNullData(v2['good_name'])+'</td>\
                            <td>'+likNullData(v2['good_attr'])+'</td>\
                            <td>'+likNullData(v2['good_num'])+'</td>\
                            <td>'+likNullData(v2['good_price'])+'</td>\
                            <td>'+likNullData(v2['good_rate_price'])+'</td>\
                            <td>'+likNullData(v2['good_total'])+'</td>\
                            <td></td>\
                            </tr>'
                            })

                        })
                        $(".zj_goods_table_content_info").html(html);
                        /*整机商品*/

                        var complete='';
                        $.each(data['data']['setting'],function(i,arr){
                            var p=repair(i+1)
                            var setting='';
                            if(arr['good_list']){
                                $.each(arr['good_list'],function(i2,v2){
                                    var setting_goods=''
                                    if(v2['attr_list']){
                                        $.each(v2['attr_list'],function(i3,v3){
                                            setting_goods+='<tr>\
                                                <td>'+likNullData(v3['good_sn'])+'</td>\
                                                <td>'+likNullData(v3['good_attr'])+'</td>\
                                                <td>'+likNullData(v3['sing_num'])+'</td>\
                                                <td>'+likNullData(v3['good_price'])+'</td>\
                                                <td>'+likNullData(v3['good_rate_price'])+'</td>\
                                                <td>'+likNullData(v3['good_total'])+'</td>\
                                                <td></td>\
                                                </tr>'
                                        })
                                    }

                                    setting+='<table class="xs_bjd_table_1">\
                                <thead>\
                                <tr style="background: #fff;">\
                                <th class="c_3" style="font-weight: 100;">'+likNullData(v2['title'])+'</th>\
                                <th></th>\
                                <th></th>\
                                </tr>\
                                <tr>\
                                <th width="90">编号</th>\
                                <th width="560">属性</th>\
                                <th width="50">数量</th>\
                                <th width="150">单价</th>\
                                <th width="90">含税价</th>\
                                <th width="90">总价</th>\
                                <th width="60"></th>\
                                </tr>\
                                </thead>\
                                <tbody>'+setting_goods+'\
                                </tbody>\
                            </table>'
                                })
                            }

                            complete+='<div class="xs_div_2" style="margin-top: 20px;">\
                            <table class="xs_bjd_table">\
                            <thead>\
                            <tr>\
                            <th width="30">序号</th>\
                            <th width="90">编号</th>\
                            <th width="150">名称</th>\
                            <th width="340">属性</th>\
                            <th width="50">数量</th>\
                            <th width="150">单价</th>\
                            <th width="90">含税价</th>\
                            <th width="90">总价</th>\
                            <th width="60">配件</th>\
                            </tr>\
                            </thead>\
                            <tbody>\
                                <tr class="c_3 c_3 xs_bjd_bold">\
                                    <td>'+p+'</td>\
                                    <td>'+likNullData(arr['good_sn'])+'</td>\
                                    <td>'+likNullData(arr['good_name'])+'</td>\
                                    <td>'+likNullData(arr['good_attr'])+'</td>\
                                    <td>'+likNullData(arr['num'])+''+arr['good_unit']+'</td>\
                                    <td>'+likNullData(arr['price'])+'</td>\
                                    <td>'+likNullData(arr['containing_money'])+'</td>\
                                    <td class="zj_pz_sum_price">'+likNullData(arr['total_money'])+'</td>\
                                    <td><button class="but_mix box_open_btn_1 but_blue_1">展开</button></td>\
                                </tr>\
                            </tbody>\
                            </table>\
                            </div>\
                            <div class="xs_tc_goods_box goods_tc_toggle" style="display: none;">'+setting+'</div>'

                        })


                        $(".tanceng .zj_zj_goods_dv_content").html(complete);
                        var sum_price=0;
                        $(".tanceng .zj_zj_goods_dv_content .zj_pz_sum_price").each(function(){
                            sum_price+=parseFloat($(this).text());
                        })
                        $(".tanceng .zj_hj_zj_money").text(sum_price)
                    }


                }
            })

        });

        /*转采购报价单*/
       /* $(".tanceng .zj_jrd_zcgbjd_end_btn").die().live("click",function(){
            new_number('.zj_z_cgbjd_num','CBJ')
            var id=$(this).data('id');
            var code=$(this).data('code_sn');//借入单编号
            var supplier_name=$(this).data('supplier_name');//供应商id
            var supplier_id=$(this).data('supplier_id');//供应商名字
            $(".zj_z_cgbjd_gl_jrd").val(code);
            $(".zj_z_cgbjd_gl_gys").val(supplier_name);
            var cgbjd_data={
                token: token,
                code_sn:'',
                borrow_id:'',
                supplier_id:'',
                tax_rate:'',
                flow:'',
                goods:'',
                setting:'',
                supplier_name:''


            }
            /!*审批人获取*!/
            $.ajax({
                type: 'POST',
                url: SERVER_URL + "/borrow/get-approval-type",
                data: {
                    token: token,
                    company_id: company_id, //公司id
                    uid: uid, // 用户id
                    category: 2,// 分类id 1合同管理,2采购,3借入借出
                    type_id: 5 // 类型(1销售合同,2采购合同,3员工合同,4其他合同,5采购报价单,6采购退换货,7借入单,8借出单,9归还单,10,归还单(借入归还),11(借出归还)
                },
                dataType: "json",
                success: function (data) {
                    console.log('10001');
                    console.log(data);
                    console.log('10001');

                    var html='';
                    var P_sort=" ";
                    if(data.code==0){
                        $.each(data['data'],function(i,v){
                            if(v['face']!=''){
                                html+='<li data-id="'+v['uid']+'" class="zj_spr_num"><em class="icon_personBtn"><img src="'+v['face']+'"/><i class="icon_personNext"></i></em> <em class="icon_adderBtn"></em> <p class="box_adderName">'+v['name']+'</p> <p class="box_addermsg">步骤'+(i+1)+'</p> </li>'
                            }else {
                                html+='<li data-id="'+v['uid']+'" class="zj_spr_num"> <em class="icon_personBtn icon_personBtn_msg"><i class="icon_personNext"></i></em> <em class="icon_adderBtn"></em> <p class="box_adderName">'+v['name']+'</p> <p class="box_addermsg">步骤'+(i+1)+'</p> </li>'
                            }
                        })


                        $(".zj_zcgbjd_spr_show").html(html);

                    }else{
                        alert(data.msg);
                    }

                }
            })
            /!*选择联系人*!/
            $(".zj_jrd_gys_add_ul li").die().live("click",function(){
                var tel=$(this).data('contact_tel');
                $(".zcj_jrd_gys_person_mobile").val(tel);
            });
            /!*查看借入商品*!/
            $.ajax({
                type: 'POST',
                url: SERVER_URL + "/borrow/look-borrow",
                data: {
                    token: token,
                    //company_id: company_id, //公司id
                    id: id  // id

                },
                dataType: "json",
                success: function (data) {
                    console.log('2000111222');
                    console.log(data);
                    console.log('2000111222');
                    if(data.code==0){
                        if(data['data']['goods']){
                            var goods='';
                            $.each(data['data']['goods'],function(i,v){
                                $.each(v,function(i2,v2){
                                    goods+='<tr>\
                            <td><input type="checkbox" data-id="'+v2['id']+'" data-good_id="'+v2['good_id']+'" data-good_unit="'+v2['good_unit']+'" data-good_num="'+v2['good_num']+'" data-good_rate="'+v2['good_rate']+'"></td>\
                            <td>'+likNullData(v2['good_sn'])+'</td>\
                            <td>'+likNullData(v2['good_name'])+'</td>\
                            <td>'+likNullData(v2['good_attr'])+'</td>\
                            <td>'+likNullData(v2['good_num'])+''+likNullData(v2['good_unit'])+'</td>\
                            <td>'+likNullData(v2['good_price'])+'</td>\
                            <td>'+likNullData(v2['good_rate_price'])+'</td>\
                            <td>'+likNullData(v2['good_total'])+'</td>\
                            </tr>'
                                })

                            })
                            $(".zj_select_cgbjd_goods_content_tbody").html(goods);
                            var complete='';
                            if(data['data']['setting']){
                                $.each(data['data']['setting'],function(i,arr){
                                    var setting='';
                                    if(arr['good_list']){
                                        $.each(arr['good_list'],function(i2,v2){
                                            var setting_goods=''
                                            if(v2['attr_list']){
                                                $.each(v2['attr_list'],function(i3,v3){
                                                    setting_goods+='<tr>\
                                                <td><input type="checkbox" data-id="'+v3['id']+'" data-sing_num="'+v3['sing_num']+'" data-return_num="'+v3['return_num']+'" data-good_id="'+v3['good_id']+'" data-good_rate="'+v3['good_rate']+'" data-good_unit="'+v3['good_unit']+'"></td>\
                                                <td>'+likNullData(v3['good_sn'])+'</td>\
                                                <td>'+likNullData(v3['good_attr'])+'</td>\
                                                <td>'+likNullData(v3['sing_num'])+''+likNullData(v3['good_unit'])+'</td>\
                                                <td>'+likNullData(v3['good_price'])+' </td>\
                                                <td>'+likNullData(v3['good_rate_price'])+' </td>\
                                                <td>'+likNullData(v3['good_total'])+' </td>\
                                                </tr>'
                                                })
                                            }

                                            setting+='<table class="xs_bjd_table_1">\
                                <thead>\
                                <tr style="background: #fff;">\
                                <th class="c_3" style="font-weight: 100;">'+likNullData(v2['title'])+'</th>\
                                <th></th>\
                                <th></th>\
                                </tr>\
                                <tr>\
                                    <th width="32">选择</th>\
                                    <th width="140">编号</th>\
                                    <th width="435">属性</th>\
                                    <th width="88">数量</th>\
                                    <th width="88">单价</th>\
                                    <th width="88">含税价</th>\
                                    <th width="88">总价</th>\
                                </tr>\
                                </thead>\
                                <tbody>'+setting_goods+'\
                                </tbody>\
                            </table>'
                                        })
                                    }

                                    complete+='<div class="xs_div_2" style="border-bottom: 1px solid #e6e6e6;">\
                           <div class="div_1 container">\
                            <table class="xs_bjd_table">\
                            <thead>\
                            <tr>\
                            <th width="32">选择</th>\
                            <th width="140">编号</th>\
                            <th width="100">名称</th>\
                            <th width="375">属性</th>\
                            <th width="65">数量</th>\
                            <th width="88">单价</th>\
                            <th width="88">含税价</th>\
                            <th width="88">总价</th>\
                            <th width="60">操作</th>\
                            </tr>\
                            </thead>\
                            <tbody>\
                                <tr class="c_3 c_3 xs_bjd_bold">\
                                    <td><input type="checkbox" data-id="'+arr['id']+'" data-goods_id="'+arr['goods_id']+'" data-num="'+arr['num']+'" data-good_unit="'+arr['good_unit']+'" data-containing_rate="'+arr['containing_rate']+'"></td>\
                                    <td>'+likNullData(arr['good_sn'])+'</td>\
                                    <td>'+likNullData(arr['good_name'])+'</td>\
                                    <td>'+likNullData(arr['good_attr'])+'</td>\
                                    <td>'+likNullData(arr['num'])+''+likNullData(arr['good_unit'])+'</td>\
                                    <td>'+likNullData(arr['price'])+'</td>\
                                    <td>'+likNullData(arr['containing_money'])+'</td>\
                                    <td>'+likNullData(arr['total_money'])+'</td>\
                                    <td><button class="but_mix box_open_btn_3 but_blue_1">展开</button></td>\
                                </tr>\
                            </tbody>\
                            </table>\
                            </div>\
                            </div>\
                            <div class="xs_xsbjd_table_t2 none" style="padding: 10px;border-bottom: 2px solid #e6e6e6;">\
                            <div class="box_open_list goods_tc_toggle">'+setting+'</div>\
                            </div>'

                                })
                            }

                            $(".tanceng .zj_cgbjd_zj_goods_content_show").html(complete);
                        }
                    }

                }
            });

            /!*转采购报价单*!/
            $(".zj_zcgbjd_quote_create_submit").die().live("click",function () {
                cgbjd_data.code_sn=$('.zj_z_cgbjd_num').val();
                cgbjd_data.borrow_id=id;
                cgbjd_data.borrow_code_sn=$(".zj_z_cgbjd_gl_jrd").val();
                cgbjd_data.supplier_id=supplier_id;
                cgbjd_data.supplier_name=supplier_name;
                if($(".zj_zcgbjd_tex_val").val()=='含税17%'){
                    cgbjd_data.tax_rate=1;
                }else{
                    cgbjd_data.tax_rate=0;
                }


                /!*审批人*!/
                var copy_flow=[];
                $(".tanceng .zj_zcgbjd_spr_show .zj_spr_num").each(function(){
                    copy_flow.push($(this).data('id'));
                })
                cgbjd_data.flow=copy_flow.toString();
                cgbjd_data.remark=$(".zj_jrd_show_reark_info").val();
                var state=2;
                $(".zj_jrd_is_check_state input").each(function () {
                    if($(this).is(':checked')){
                        state=$(this).data('id');
                    }
                })
                cgbjd_data.is_freight= state;
                cgbjd_data.contactor=$('.zj_jrd_gys_person_info_val').val();
                cgbjd_data.tel=$(".zcj_jrd_gys_person_mobile").val();
                cgbjd_data.address=$(".zj_jrd_gys_address_info").val();
                cgbjd_data.shipments_time=$(".zj_jrd_gys_fh_day").val();
                /!*商品*!/
                var jrgh_goods=[];
                $(".tanceng .zj_select_cgbjd_goods_content_tbody tr input").each(function(i){
                    if($(this).is(':checked')){
                        jrgh_goods.push({
                            good_id:$(this).data('id'),
                            good_name:$(this).parents('tr').find('td').eq(2).text(),
                            good_sn:$(this).parents('tr').find('td').eq(1).text(),
                            good_attr: $(this).parents('tr').find('td').eq(3).text(),
                            good_unit:$(this).data('good_unit'),
                            good_num:$(this).data('good_num'),
                            good_price:$(this).parents('tr').find('td').eq(5).text(),
                            good_rate_price:$(this).parents('tr').find('td').eq(6).text(),
                            good_total:$(this).parents('tr').find('td').eq(7).text()
                        })
                    }
                })
                /!*整机商品*!/
                var zj_goods=[];

                $(".tanceng .zj_cgbjd_zj_goods_content_show .xs_div_2 tbody input").each(function (i) {
                    var match_goods=[];

                    $(".tanceng .zj_cgbjd_zj_goods_content_show .xs_xsbjd_table_t2 table thead tr:first-child").eq(i).each(function(i2){
                        var pz_goods=[];
                        $(".tanceng .zj_cgbjd_zj_goods_content_show .xs_xsbjd_table_t2 table tbody input").eq(i2).each(function (i3) {

                                pz_goods.push({
                                    good_id: $(this).data('id'),
                                    good_sn: $(this).parents('tr').find('td').eq(1).text(),
                                    good_attr: $(this).parents('tr').find('td').eq(2).text(),
                                    sing_num: $(this).data('sing_num'),
                                    total_num: $(this).data('return_num'),
                                    good_price: $(this).parents('tr').find('td').eq(4).text(),
                                    good_rate: $(this).parents('tr').find('td').eq(5).text(),
                                    good_rate_price: $(this).parents('tr').find('td').eq(6).text(),
                                    good_total: $(this).parents('tr').find('td').eq(7).text()
                                })

                        })

                            match_goods.push({
                                title:$(this).parents('tbody').prev().find('tr').eq(0).find('td').text(),
                                attr_list:pz_goods
                            })



                    })
                    if($(this).is(':checked')){
                        zj_goods.push({
                            setting_id:$(this).data('id'),
                            setting_name:$(this).parents('tr').find('td').eq(2).text(),
                            setting_sn:$(this).parents('tr').find('td').eq(1).text(),
                            setting_unit:$(this).data('good_unit'),
                            setting_attr:$(this).parents('tr').find('td').eq(3).text(),
                            setting_num:$(this).data('num'),
                            setting_price:$(this).parents('tr').find('td').eq(5).text(),
                            setting_rate:$(this).data('containing_rate'),
                            setting_rate_price:$(this).parents('tr').find('td').eq(6).text(),
                            setting_total:$(this).parents('tr').find('td').eq(1).text(),
                            good_list:match_goods
                        })
                    }
                })
                var jrgh_goods_info=JSON.stringify(jrgh_goods);
                var jrgh_goods_zj=JSON.stringify(zj_goods);
                cgbjd_data.goods=jrgh_goods_info;
                cgbjd_data.setting=jrgh_goods_zj;
                $.ajax({
                    type: 'post',
                    url: SERVER_URL + "/buy-quote/add",
                    data: cgbjd_data,
                    dataType: "json",
                    success: function (data) {
                        console.log('300');
                        console.log(data);
                        console.log('300');
                        if(data.code==0){
                            $(this).parents('.page65_newxsbjd').find('.dialog_close').click();
                        }
                    }
                })
            });

        });*/

        /*借入归还单详情*/
        $("#zj_jrgh_info_table_name").die().live('click',function(){
            $.ajax({
                type: 'GET',
                url: SERVER_URL + "/borrow-out/list",
                data: {
                    token: token,
                    //company_id: company_id, //公司id
                    borrow_id: cs_id// 用户id

                },
                dataType: "json",
                success: function (data) {
                    console.log('借入归还');
                    console.log(data);
                    console.log('借入归还');
                    $(".zj_jrgh_list_sum_num").html('('+data['totalcount']+')')
                    var html=''
                    $.each(data['dataList'],function(index,gh_list){
                        var logistics='';
                        if(gh_list['logistics_way']==1){
                            logistics='快递';
                        }else if(gh_list['logistics_way']==2){
                            logistics='陆运';
                        }else if(gh_list['logistics_way']==3){
                            logistics='空运';
                        }else if(gh_list['logistics_way']==4){
                            logistics='平邮';
                        }else if(gh_list['logistics_way']==5){
                            logistics='海运';
                        }
                        html+='<div class="takenote_jrd_jcgh">\
                        <div class="d-r-t-h sbar">\
                        <h3 class="cont_title">基本信息</h3>\
                        <p class="l-s-x">借入归还单编号：<span>'+gh_list['code_sn']+'</span></p>\
                        <p class="l-s-x">借入单编号：<span>'+gh_list['borrow_code_sn']+'</span></p>\
                        <p class="l-s-x">供应商：<span>'+gh_list['supplier_name']+'</span></p>\
                        </div>\
                        <div class="d-r-t-h sbar">\
                            <h3 class="cont_title">出库信息</h3>\
                            <p class="l-s-x">发货时间：<span>'+gh_list['shipments_time']+'</span></p>\
                        <p class="l-s-x">物流方式：<span>'+logistics+'</span></p>\
                        <p class="l-s-x">承担运费：<span>'+(gh_list['is_freight']==1 ? '不包' : '包运费')+'</span></p>\
                        <p class="l-s-x">供应商联系人：<span>'+gh_list['contactor']+'</span></p>\
                        <p class="l-s-x">联系电话：<span class="">'+gh_list['tel']+'</span></p>\
                        <p class="l-s-x">收货地址：<span class="">'+gh_list['address']+'</span></p>\
                        </div>\
                        <div class="d-r-t-h sbar">\
                        <h3 class="cont_title">借入归还商品</h3>\
                        <p class="l-s-x"><span style="margin-left: -5px;"><button class="but_blue but_small val_dialog zj_jrd_check_jrgh_btn" data-id="'+gh_list['id']+'" name="takenote_jrd_jrgh_jbxxxq">查看借入归还单</button></span></p>\
                        </div>\
                        </div>';
                    })
                    $(".zj_jrd_jrghd_info_show_content").html(html);

                }
            })

        });
        /*查看借入归还单btn*/
        $(".zj_jrd_check_jrgh_btn").die().live("click",function () {
            var jrghd_id=$(this).data('id');
            if(jrghd_id>0){
                $.ajax({
                    type: 'GET',
                    url: SERVER_URL + "/borrow-out/infobyid",
                    data: {
                        token: token,
                        //company_id: company_id, //公司id
                        id: jrghd_id,
                        detail:1// 用户id
                    },
                    dataType: "json",
                    success: function (data) {
                        console.log('抄送归还单');
                        console.log(data);
                        console.log('20001110000000000000000');
                        $(".zj_check_jrgh_gs_name_show").text(likNullData(data['data']['supplier_name']));
                        $(".zj_jrgh_quote_look_create_at").text(likNullData(subTime(data['data']['create_time'])))
                        $(".zj_jrgh_quote_look_uname").text(likNullData(data['data']['user_name']))
                        $(".zj_jrgh_check_info_xq_box .zj_jrgh_con").eq(0).text(likNullData(data['data']['code_sn']));
                        $(".zj_jrgh_check_info_xq_box .zj_jrgh_con").eq(1).text(likNullData(data['data']['borrow_code_sn']));
                        $(".zj_jrgh_check_info_xq_box .zj_jrgh_con").eq(2).text(likNullData(data['data']['supplier_name']));
                        $(".zj_jrgh_check_info_xq_box .zj_jrgh_con").eq(3).text(likNullData(data['data']['shipments_time']));

                        if(data['data']['logistics_way']==1){
                            $(".zj_jrgh_check_info_xq_box .zj_jrgh_con").eq(4).text('快递');

                        }else if(data['data']['logistics_way']==2){
                            $(".zj_jrgh_check_info_xq_box .zj_jrgh_con").eq(4).text('陆运');

                        }else if(data['data']['logistics_way']==3){
                            $(".zj_jrgh_check_info_xq_box .zj_jrgh_con").eq(4).text('空运');

                        }else if(data['data']['logistics_way']==4){
                            $(".zj_jrgh_check_info_xq_box .zj_jrgh_con").eq(4).text('平邮');

                        }else if(data['data']['logistics_way']==5){
                            $(".zj_jrgh_check_info_xq_box .zj_jrgh_con").eq(4).text('海运');

                        }
                        //$(".zj_jrgh_check_info_xq_box .zj_jrgh_con").eq(5).text(data['data']['is_freight']);
                        if(data['data']['is_freight']==1){
                            $(".zj_jrgh_check_info_xq_box .zj_jrgh_con").eq(5).text('不包');
                        }else if(data['data']['logistics_way']==2){
                            $(".zj_jrgh_check_info_xq_box .zj_jrgh_con").eq(5).text('包运费');
                        }
                        $(".zj_jrgh_check_info_xq_box .zj_jrgh_con").eq(6).text(data['data']['contactor']);
                        $(".zj_jrgh_check_info_xq_box .zj_jrgh_con").eq(7).text(data['data']['tel']);
                        $(".zj_jrgh_check_info_xq_box .zj_jrgh_con").eq(8).text(data['data']['address']);
                        //$(".zj_jrd_cgbjd_jb_info_check p span").eq(8).text(data['data']['code_sn'])
                        // $(".zj_cgbjd_check_bjd_xq").data('id',data['data']['id']);
                        /* if(data['data']['goods']['sum_total']){
                         $(".tanceng .zj_goods_zprice .zj_goods_hj_znum").text(data['data']['goods']['sum_total']);
                         }
                         if(data['data']['setting']['sum_total']){
                         $(".xs_bjd_table_3 .zj_hj_zj_money").text(data['data']['setting']['sum_total']);
                         }*/


                        /*ff*/
                        // $(".zj_dj_hj_price_num").text(data['data']['unit_price_total']);
                        // $(".zj_hs_hj_zprice_number").text(data['data']['tax_total']);
                        // $(".zj_other_price_num").text(data['data']['other_costs']);
                        // $(".zj_znum_zj_m_price").text(data['data']['all_money']);


                        var html='';
                        $.each(data['data']['goods'],function(i,v){

                            html+='<tr>\
                            <td>'+likNullData(v['code_sn'])+'</td>\
                            <td>'+likNullData(v['product_name'])+'</td>\
                            <td>'+likNullData(v['attr_name'])+'</td>\
                            <td>'+likNullData(v['num'])+'</td>\
                            <td>'+likNullData(v['return_num'])+'</td>\
                            <td></td>\
                            </tr>'

                        })
                        $(".zj_jrgh_check_content_goods").html(html);
                        /*整机商品*/

                        var complete='';
                        $.each(data['data']['setting'],function(i,arr){
                            var setting='';
                            if(arr['pieceList']){
                                $.each(arr['pieceList'],function(i2,v2){
                                    var setting_goods=''
                                    if(v2['list']){
                                        $.each(v2['list'],function(i3,v3){
                                            setting_goods+='<tr>\
                                                <td>'+likNullData(v3['code_sn'])+'</td>\
                                                <td>'+likNullData(v3['attr_name'])+'</td>\
                                                <td>'+likNullData(v3['num'])+'</td>\
                                                <td>'+likNullData(v3['return_num'])+'</td>\
                                                <td></td>\
                                                </tr>'
                                        })
                                    }

                                    setting+='<table class="xs_bjd_table_1">\
                                <thead>\
                                <tr style="background: #fff;">\
                                <th class="c_3" style="font-weight: 100;">'+likNullData(v2['cate_name'])+'</th>\
                                <th></th>\
                                <th></th>\
                                </tr>\
                                <tr>\
                                <th width="140">编号</th>\
                                <th width="380">属性</th>\
                                <th width="70">借入数量</th>\
                                <th width="70">归还数量</th>\
                                <th width="60"></th>\
                                </tr>\
                                </thead>\
                                <tbody>'+setting_goods+'\
                                </tbody>\
                            </table>'
                                })
                            }

                            complete+='<div class="xs_div_2" style="margin-top: 20px;">\
                            <table class="xs_bjd_table">\
                            <thead>\
                            <tr>\
                            <th width="140">编号</th>\
                            <th width="120">名称</th>\
                            <th width="240">属性</th>\
                            <th width="70">借入数量</th>\
                            <th width="70">归还数量</th>\
                            <th width="60">配件</th>\
                            </tr>\
                            </thead>\
                            <tbody>\
                                <tr class="c_3 c_3 xs_bjd_bold">\
                                    <td>'+likNullData(arr['code_sn'])+'</td>\
                                    <td>'+likNullData(arr['product_name'])+'</td>\
                                    <td>'+likNullData(arr['attr_name'])+'</td>\
                                    <td>'+likNullData(arr['num'])+''+arr['unit_name']+'</td>\
                                    <td>'+likNullData(arr['return_num'])+'</td>\
                                    <td><button class="but_mix box_open_btn_1 but_blue_1">展开</button></td>\
                                </tr>\
                            </tbody>\
                            </table>\
                            </div>\
                            <div class="xs_tc_goods_box goods_tc_toggle" style="display: none;">'+setting+'</div>'

                        })


                        $(".tanceng .zj_complate_goods_content_show_info").html(complete);
                    }
                })
            }

        });

        /*采购报价单*/
        $("#zj_cgbjd_info_table_name").die().live("click",function(){

            $.ajax({
                type: 'post',
                url: SERVER_URL + "/borrow/purchase",
                data: {
                    token: token,
                    //company_id: company_id, //公司id
                    id: cs_id// 用户id
                },
                dataType: "json",
                success: function (data) {
                    console.log('采购报价单');
                    console.log(data);
                    console.log('采购报价单');
                    $(".zj_cgbjd_list_sum_num").html('('+data['data'].length+')');
                    var cg_list='';
                    $.each(data['data'],function(i,vlist){
                        var rete=''
                        if(vlist['tax_rate']==1){
                            rete='17%';
                        }else{
                            rete='无税'
                        }
                        var goods_lx=''
                        if(vlist['goods_type']==1){
                            goods_lx='普通商品'
                        }else if(vlist['goods_type']==2){
                            goods_lx='套餐商品'
                        }else if(vlist['goods_type']==3){
                            goods_lx='配置商品'
                        }
                        cg_list+='<div class="takenote_jrd_jcgh">\
                        <div class="d-r-t-h sbar">\
                        <h3 class="cont_title">基本信息</h3>\
                        <p class="l-s-x">报价单编号：<span>'+vlist['code_sn']+'</span></p>\
                        <p class="l-s-x">关联合同：<span>'+vlist['purchase_sn']+'</span></p>\
                        <p class="l-s-x">关联采购订单：<span>'+vlist['order_sn']+'</span></p>\
                        <p class="l-s-x">关联借入单：<span>'+vlist['borrow_sn']+'</span></p>\
                        <p class="l-s-x">供应商名称：<span>'+vlist['supplier_name']+'</span></p>\
                        <p class="l-s-x">采购商品类型：<span>'+vlist['goods_type']+'</span></p>\
                        <p class="l-s-x">税率：<span>'+rete+'</span></p>\
                        <p class="l-s-x">总金额（元）：<span>'+vlist['totals']+'</span></p>\
                        <p class="l-s-x" style="margin-bottom: 30px;"><span style="margin-left: -5px;"><button data-id="'+vlist['id']+'" class="but_blue but_small val_dialog zj_cgbjd_check_bjd_xq" name="cg_cgthh_xq_hh">查看报价单</button></span></p>\
                        </div>\
                        </div>';
                    })
                    $(".zj_jrd_cgbjd_info_content").html(cg_list)

                }
            })
            $(".zj_cgbjd_check_bjd_xq").die().live("click",function () {
                var cgid=$(this).data('id');
                $.ajax({
                    type: 'get',
                    url: SERVER_URL + "/buy-quote/detail",
                    data: {
                        token: token,
                        //company_id: company_id, //公司id
                        buy_quote_id: cgid // 用户id
                    },
                    dataType: "json",
                    success: function (data) {
                        console.log('查看报价单1');
                        console.log(data);
                        console.log('查看报价单1');
                        if(data.code==0){
                            if(data['data'].length==0){
                                return true;
                            }

                            $(".zj_check_gs_name_show").text(likNullData(data['data']['supplier_name']))
                            $(".zj_sell_quote_look_create_at").text(likNullData(data['data']['created_at']));
                            $(".zj_sell_quote_look_uname").text(likNullData(data['data']['current_name']));
                            $(".zj_bjd_header_info_dv_show .zj_head").eq(0).text(likNullData(data['data']['code_sn']));
                            $(".zj_bjd_header_info_dv_show .zj_head").eq(1).text(likNullData(data['data']['supplier_name']));
                            $(".zj_bjd_header_info_dv_show .zj_head").eq(2).text(likNullData(data['data']['dept_name']));
                            $(".zj_bjd_header_info_dv_show .zj_head").eq(3).text(likNullData(data['data']['owner_name']));



                            /*ff*/
                            $(".zj_cgbjd_hj_price_num").text(likNullData(data['data']['money_sum']));
                            $(".zj_cgbjd_hj_zprice_number").text(likNullData(data['data']['tax_money_sum']));
                            $(".zj_cgbjd_other_price_num").text(likNullData(data['data']['other_free']));
                            $(".zj_cgbjd_znum_zj_m_price").text(likNullData(data['data']['totals']));

                            /*普通商品*/
                            if(data['data']['product_json']['goods']){
                                $(".zj_pt_goods_znum_sl").text(data['data']['product_json']['goods']['sum_total']);
                            }

                            /*整机商品总价*/
                            if(data['data']['product_json']['setting']){
                                $(".zj_check_info_hj_price").text(data['data']['product_json']['setting']['sum_total']);
                            }

                            var html='';
                            if(data['data']['product_json']['goods']['goods']){
                                $.each(data['data']['product_json']['goods']['goods'],function(i,v){

                                    html+='<tr>\
                            <td>'+repair(i+1)+'</td>\
                            <td>'+likNullData(v['good_sn'])+'</td>\
                            <td>'+likNullData(v['good_name'])+'</td>\
                            <td>'+likNullData(v['good_attr'])+'</td>\
                            <td>'+likNullData(v['good_num'])+''+v['good_unit']+'</td>\
                            <td>'+likNullData(v['good_price'])+'</td>\
                            <td>'+likNullData(v['good_rate_price'])+'</td>\
                            <td>'+likNullData(v['good_total'])+'</td>\
                            </tr>'

                                })
                                $(".zj_cgbjd_xq_goods_info").html(html);
                            }


                            /*整机商品*/

                            var complete='';
                            if(data['data']['product_json']['setting']){

                                $.each(data['data']['product_json']['setting']['setting'],function(i,arr){
                                    var setting='';
                                    if(arr['good_list']){
                                        $.each(arr['good_list'],function(i2,v2){
                                            var setting_goods=''
                                            if(v2['attr_list']){
                                                $.each(v2['attr_list'],function(i3,v3){
                                                    setting_goods+='<tr>\
                                                <td>'+likNullData(v3['good_sn'])+'</td>\
                                                <td>'+likNullData(v3['good_attr'])+'</td>\
                                                <td>'+likNullData(v3['total_num'])+''+v3['good_unit']+'</td>\
                                                <td>'+likNullData(v3['good_price'])+'</td>\
                                                <td>'+likNullData(v3['good_rate_price'])+'</td>\
                                                <td>'+likNullData(v3['good_total'])+'</td>\
                                                <td></td>\
                                                </tr>'
                                                })
                                            }

                                            setting+='<table class="xs_bjd_table_1">\
                                <thead>\
                                <tr style="background: #fff;">\
                                <th class="c_3" style="font-weight: 100;">'+likNullData(v2['title'])+'</th>\
                                <th></th>\
                                <th></th>\
                                </tr>\
                                <tr>\
                                <th width="90">编号</th>\
                                <th width="560">属性</th>\
                                <th width="50">数量</th>\
                                <th width="150">单价</th>\
                                <th width="90">含税价</th>\
                                <th width="90">总价</th>\
                                <th width="60"></th>\
                                </tr>\
                                </thead>\
                                <tbody>'+setting_goods+'\
                                </tbody>\
                            </table>'
                                        })
                                    }

                                    complete+='<div class="xs_div_2" style="margin-top: 20px;">\
                            <table class="xs_bjd_table">\
                            <thead>\
                            <tr>\
                            <th width="30">序号</th>\
                            <th width="90">编号</th>\
                            <th width="150">名称</th>\
                            <th width="325">属性</th>\
                            <th width="50">数量</th>\
                            <th width="150">单价</th>\
                            <th width="90">含税价</th>\
                            <th width="90">总价</th>\
                            <th width="60">配件</th>\
                            </tr>\
                            </thead>\
                            <tbody>\
                                <tr class="c_3 c_3 xs_bjd_bold">\
                                    <td>'+repair(i+1)+'</td>\
                                    <td>'+likNullData(arr['setting_sn'])+'</td>\
                                    <td>'+likNullData(arr['setting_name'])+'</td>\
                                    <td>'+likNullData(arr['setting_attr'])+'</td>\
                                    <td>'+likNullData(arr['setting_num'])+''+arr['setting_unit']+'</td>\
                                    <td>'+likNullData(arr['setting_price'])+'</td>\
                                    <td>'+likNullData(arr['setting_rate_price'])+'</td>\
                                    <td>'+likNullData(arr['setting_total'])+'</td>\
                                    <td><button class="but_mix box_open_btn_1 but_blue_1">展开</button></td>\
                                </tr>\
                            </tbody>\
                            </table>\
                            </div>\
                            <div class="xs_tc_goods_box goods_tc_toggle" style="display: none;">'+setting+'</div>'

                                })
                            }



                            $(".tanceng .zj_zj_goods_complete_info_div_nr").html(complete);
                        }


                    }
                })
            });

        });

        /*入库单*/
        $("#zj_rkd_info_table_name").die().live("click",function(){
            $.ajax({
                type: 'GET',
                url: SERVER_URL + "/lend-out/stockininfo",
                data: {
                    token: token,
                    //company_id: company_id, //公司id
                    related_receipts_no: s_code// 用户id

                },
                dataType: "json",
                success: function (data) {
                    console.log('报价单详情');
                    console.log(data);
                    console.log('报价单详情');
                    if(data['data']['input_status']==1){
                        $(".zj_rkd_bfrk_state").text('待入库');
                    }else if(data['data']['input_status']==2){
                        $(".zj_rkd_bfrk_state").text('部分入库');
                    }else if(data['data']['input_status']==3){
                        $(".zj_rkd_bfrk_state").text('完成入库');
                    }
                    if(data['data']['stockingInList']['input_num']){
                        $('.zj_sell_order_look_skjl_tbody_nodata_box').hide();
                        var rk_info='<tr class="table_total ven_sell_order_look_skjl_tbody_table_total">\
                    <td>'+data['data']['stockingInList']['input_num']+'</td>\
                    <td>'+data['data']['stockingInList']['distribution_num']+'</td>\
                    <td>'+data['data']['stockingInList']['set_num']+'</td>\
                    <td>'+data['data']['stockingInList']['set_distribution_num']+'</td>\
                    <td>'+data['data']['stockingInList']['document_marker']+'</td>\
                    <td>'+data['data']['stockingInList']['distribution_name']+'</td>\
                    </tr>'
                        $(".zj_goods_num_order_look_skjl_tbody").html(rk_info);
                    }else {
                        $(".zj_goods_num_order_look_skjl_tbody").empty();
                        $('.zj_sell_order_look_skjl_tbody_nodata_box').show();
                    }

                    var kf_goods=''
                    if(data['data']['stockInList'].length>0) {
                        $(".zj_no_order_look_skjl_tbody_nodata_box").hide();
                        $.each(data['data']['stockInList'], function (i, goods_info) {
                            kf_goods += '<tr class="table_total ven_sell_order_look_skjl_tbody_table_total">\
                    <td>' + repair(i + 1) + '</td>\
                    <td>' + goods_info['warehouse_name'] + '</td>\
                    <td>' + goods_info['input_num'] + '</td>\
                    <td>' + goods_info['distribution_num'] + '</td>\
                    <td>' + goods_info['set_distribution_num'] + '</td>\
                    <td>' + goods_info['set_num'] + '</td>\
                    <td>' + goods_info['break_num'] + '</td>\
                    <td>' + goods_info['input_status'] + '</td>\
                    <td>' + goods_info['input_name'] + '</td>\
                    </tr>'
                        })
                        $(".zj_jcd_order_look_skjl_tbody").html(kf_goods);
                    }else{
                        $(".zj_jcd_order_look_skjl_tbody").empty();
                        $(".zj_no_order_look_skjl_tbody_nodata_box").show();
                    }
                    // var wl_list='';
                    // $.each(data['data']['logisticsList'],function(){
                    //     wl_list+=''
                    // })
                },
                error:function(data){
                    alert("服务器错误，请稍后再试");
                }
            })
        });
    });
    /*刷新*/
    $(".zj_jrd_refish_sx_btn").die().live("click",function(){
            if($(".zj_jrd_header_tab_li .tabhover").text()=='我发起的'){
                // var borrow_jrd_data={
                //     token: token,
                //     uid:uid,
                //     company_id:company_id,
                //     is_invalid:1,
                //     page: 1,
                //     num: ''
                // }
                borrow_jrd_data.is_invalid=1;
                //borrow_jrd_data.page=1;
                borrow_jrd_data.num='';
                borrow_jrd_data.key_search='';
                borrow_jrd_data.approval_status='';
                borrow_jrd_data.library_status='';
                borrow_jrd_data.thetype='';
                $(".goods_wfqd_attr_search_table input").val('待选择').css('color','#ccc');

                borrow_list();
            }else if($(".zj_jrd_header_tab_li .tabhover").text()=='待我审批'){
                // var sp_data={
                //     token: token,
                //     uid:uid,
                //     company_id:company_id,
                //     is_invalid:1,
                //     page: 1,
                //     num: ''
                // }
                sp_data.is_invalid=1;
                //sp_data.page=1;
                sp_data.num='';
                sp_data.key_search=''
                sp_data.approval_status='';
                sp_data.library_status='';
                sp_data.thetype='';
                $(".goods_dwsp_attr_search_table input").val('待选择').css('color','#ccc');
                jrd_dwsp_mine_fn();
            }else if($(".zj_jrd_header_tab_li .tabhover").text()=='抄送我的'){
                // var cs_data={
                //     token: token,
                //     uid:uid,
                //     company_id:company_id,
                //     is_invalid:1,
                //     page: 1,
                //     num: ''
                // }
                $(".goods_cswd_attr_search_table input").val('待选择').css('color','#ccc');
                cs_data.is_invalid=1;
                //cs_data.page=1;
                cs_data.num='';
                cs_data.key_search=''
                cs_data.approval_status='';
                cs_data.library_status='';
                cs_data.thetype='';
                jrd_copy_mine_fn();
            }
    });
//});


