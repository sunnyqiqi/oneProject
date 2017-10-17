/*借入归还*/
$(function () {
    var token = Admin.get_token();
///	弹窗无限循环树结构 左侧
    function tree_list_dialog_right(datalist) {

        var html = '';
        $.each(datalist, function (index, data) {
            /* html += '<ul class="hr_ul1">';*/
            if (data['children'].length > 0) {
                html += '<ul class="hr_ul1">';
            } else {
                html += '<ul class="">';
            }
            html += '<li class="hr_left_1 "  data-id="' + data['id'] + '" data-pid="' + data['pid'] + '"><span>' + data['name'] + '</span>(' + data['children'].length + ')</li>';

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
            if (data['children'].length > 0) {
                html += '<li class="left_1" deptid = "' + data["id"] + '">' + html_i_list_before + '<span class="icon_open change_ba"></span><span class="icon_file"></span><span class="list_msg">' + data['name'] + '</span><span class="list_check"><em></em></span></li>';
            } else {
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
            html += '<li class="left_1" deptchosenid = "' + data["id"] + '">' + html_i_list_before + '<span class="icon_open change_ba"></span><span class="icon_file"></span><span class="list_msg">' + data['name'] + '</span><span class="list_check none"><em></em></span></li>';
            if (data['children'] && data['children'].length > 0) {
                html += tree_list_choose_dept_person(data['children'], deep + 1);
            }
            html += '<ul class="ul3" style="display:block;">';
            $.each(data['user_info'], function (index2, data2) {
                var html_i_list_before = '<i class="list_before_span"></i>';
                for (var j = 0; j < deep + 1; j++) {
                    html_i_list_before += '<i class="list_before_span"></i>'
                }
                html += '<li class="left_2 person_left_nav li_person" userinfoid="' + data2['id'] + '">' + html_i_list_before + '<span class="list_msg">' + data2['name'] + ' </span><span class="list_check"><em></em></span></li>'
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
            if (data['children'].length > 0 || data['user_info'].length > 0) {
                html += '<li class="left_1" cussortid = "' + data["id"] + '">' + html_i_list_before + '<span class="icon_open"></span><span class="icon_file"></span><span class="list_msg">' + data['name'] + '</span></li>';
            } else {
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

    /*8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888*/
    //	弹窗无限循环树结构
    function tree_list_dialog(datalist, deep) {
        var html = '';
        $.each(datalist, function (index, data) {
            var html_i_list_before = '<i class="list_before_span"></i>';
            html += '<ul class="ul1 zcj_child1">';
            for (var j = 0; j < deep; j++) {
                html_i_list_before += '<i class="list_before_span"></i>'
            }
            if (data['children'].length > 0) {
                html += '<li class="left_1" aid = "' + data["id"] + '">' + html_i_list_before + '<span class="icon_open change_ba"></span><span class="icon_file"></span><span class="list_msg">' + data['name'] + '</span></li>';
            } else {
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
    /*左侧 有限循环树结构*/
    function tree_list_bmfzr(datalist){
        var html = '';
        var bm_count=datalist['rows'].length;
        $.each(datalist['rows'], function(index, data_list){


            html += '<ul class="ul1">';
            if(data_list['children'].length>0 || data_list['user_info'].length>0){
                html+='<li class="left_1" deptchosenid = "' + data_list["id"] + '"><i class="list_before_span"></i><span class="icon_open"></span><span class="icon_file"></span><span class="list_msg">' + data_list['name'] + '</span></li>'
            }else{
                html+='<li class="left_1" deptchosenid = "' + data_list["id"] + '"><i class="list_before_span"></i><span class="icon_file"></span><span class="list_msg">' + data_list['name'] + '</span></li>'
            }

            if(data_list['children'] && data_list['children'].length>0){
                bm_count+=data_list['children'].length;
                $.each(data_list['children'],function(v,bmlist){
                    html += '<ul class="ul2">';
                    if(bmlist['children'].length>0 || bmlist['user_info'].length>0){
                        html+='<li class="left_1" deptchosenid = "' + bmlist["id"] + '"><i class="list_before_span"></i><i class="list_before_span"></i><span class="icon_open"></span><span class="icon_file"></span><span class="list_msg">' + bmlist['name'] + '</span></li>'
                    }else{
                        html+='<li class="left_1" deptchosenid = "' + bmlist["id"] + '"><i class="list_before_span"></i><i class="list_before_span"></i><span class="icon_file"></span><span class="list_msg">' + bmlist['name'] + '</span></li>'
                    }

                    if(bmlist['children'] && bmlist['children'].length>0){
                        bm_count+=bmlist['children'].length;
                        $.each(bmlist['children'],function(i,last_list){

                            html += '<ul class="ul1">';
                            if(last_list['children'].length>0 || last_list['user_info'].length>0){
                                html+='<li class="left_1" deptchosenid = "' + last_list["id"] + '"><i class="list_before_span"></i><i class="list_before_span"></i><i class="list_before_span"></i><span class="icon_open"></span><span class="icon_file"></span><span class="list_msg">' + last_list['name'] + '</span></li>'
                            }else{
                                html+='<li class="left_1" deptchosenid = "' + last_list["id"] + '"><i class="list_before_span"></i><i class="list_before_span"></i><i class="list_before_span"></i> <span class="icon_file"></span><span class="list_msg">' + last_list['name'] + '</span></li>'
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
    var takenoteLookAbledField = [
        {'index': null, 'field': '发货状态'},
        {'index': null, 'field': '创建日期'},
        {'index': null, 'field': '下单人'},
        {'index': null, 'field': '备注'}
    ];
    //	补零函数
    function repair(x) {
        return x < 10 ? '0' + x : x
    }

    //	补零函数
    function l_dbl(x) {
        return x < 10 ? '0' + x : x
    }
    /*截取时间*/
    function subTime(time){
        var newtime = time.substr(0,10);
        return newtime;
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
    //金额保留两位小数
    function moneyToFixed(money) {
        return money.toFixed(2);
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

    var company_id = loginUserInfo.usercompany_id;
    var uid = loginUserInfo.uid;
    var uname = loginUserInfo.username;

    var powerUrls=localStorage.getItem("user_info_url");
    var company_admin=localStorage.getItem("company_admin");
    var power=JSON.parse(powerUrls);

    var add_jrgh="borrow-out/add";//新建
    //var zf_jrd="borrow/invalid";//作废
    if(company_admin!=1) {
        if ($.inArray(add_jrgh, power) > -1) {
            $(".takenote_brw_out_create_btn").show();

        } else {
            $(".takenote_brw_out_create_btn").hide();
            $(".contenthead .right").css('width','60px')
        }

    }

    /********借入单获取编号方法***************/
    function new_number(classname, number) {
        $.ajax({
            type: 'get',
            url: SERVER_URL + "/admin/autoload",
            data: {
                token: token,
                args: number
            },
            dataType: "json",
            success: function (data) {
                if (data.code == 0) {
                    $(classname).val(data.data);
                } else {
                    alert(data.msg);
                }

            },
            error: function (data) {
                alert(data);
            }
        });
    }

    var jrgh_list_data = {
        token: token,
        key: '', // 关键字
        page: 1, // 当前页
        num: 10, // 每页条数
        uid: '', // 下单人
        borrow_id: '', // 借入单ID
        borrow_code_sn: '', // 借入单编号
        code_sn: '', // 借入归还编号
        copy_flow: '', // 抄送人
        order_by:'create_time',
        order_sort:1,
        is_invalid:1
    }

    function jrgh_list_show_fn(num) {
        $.ajax({
            type: 'get',
            url: SERVER_URL + "/borrow-out/list",
            data: jrgh_list_data,
            dataType: "json",
            success: function (data) {
                if (data.code == 0) {
                    console.log(data);
                    if (data['dataList'].length > 0) {
                        $(".zj_jrgh_page_header_show").show();
                        $(".zj_jrgh_data_no_show").hide();
                    } else {
                        $(".zj_jrgh_page_header_show").hide();
                        $(".zj_jrgh_data_no_show").show();
                    }
                } else {
                    $(".zj_jrgh_page_header_show").hide();
                    $(".zj_jrgh_data_no_show").show();
                }

                var html = '';
                //var P_sort=" ";
                if (data.code == 0) {

                    $.each(data['dataList'], function (index, content) {
                        var sort = repair(index + 1);
                        if (content['is_invalid'] == 1) {
                            html += '<tr takenoteid="' + content['id'] + '"> <td>' + sort + '</td>'
                        } else {
                            html += '<tr class="grey"> <td><span class="voidIcon">作废</span></td>'

                        }

                        html += '<td>' + likNullData(content['code_sn']) + '</td>'
                        html += '<td>' + likNullData(content['borrow_code_sn']) + '</td>'
                        html += '<td>' + likNullData(content['supplier_name']) + '</td>'

                        html += '<td>' + likNullData(content['shipments_time']) + '</td>'
                        if (content['shipments_status'] == 1) {
                            html += '<td class="c_r">待发货</td>'
                        } else if (content['shipments_status'] == 2) {
                            html += '<td class="c_y">部分发货</td>'
                        } else if (content['shipments_status'] == 3) {
                            html += '<td class="c_g">完成发货</td>'
                        }

                        html += '<td>' + likNullData(content['create_time']) + '</td>'
                        html += '<td>' + likNullData(content['user_name']) + '</td>'
                        html += '<td>' + likNullData(content['remark']) + '</td>'
                        html += '<td>'
                        if(num==1){
                            html += '<button class="but_mix r_sidebar_btn zj_jrgh_check_xq_btn" data-id="' + content['id'] + '" name="takenote_ghd_jrgh_ck">查看</button> '
                        }else{
                            if(content['is_invalid']==1){
                                html += '<button class="but_mix r_sidebar_btn zj_jrgh_check_xq_btn" data-id="' + content['id'] + '" name="takenote_ghd_jrgh_ck">查看</button><button data-id="' + content['id'] + '" class="but_mix but_r takenote_invalid_btn">作废</button>'
                            }else{
                                html += '<button class="but_mix r_sidebar_btn zj_jrgh_check_xq_btn" data-id="' + content['id'] + '" name="takenote_ghd_jrgh_ck">查看</button><button data-id="' + content['id'] + '" class="but_mix1 but_grey1">作废</button>'
                            }

                        }

                        html += '</td>'
                        html += '</tr>';

                    })

                } else {
                    alert(data.msg);
                }
                $(".zj_jrgh_list_data_show_body").html(html);
                /*分页*/

                // var znum=data.totalcount;
                // var zpage=data.data.length;
                $(".zj_sear_num_jrgh").text(data.totalcount);
                list_table_render_pagination('.takenote_page_list', jrgh_list_data, jrgh_list_show_fn, data.totalcount, data['dataList'].length);
                likShow('#tekenote_list_table', takenoteLookAbledField, '#takenote_look_ul', '#tekenote_look_save_btn', '#tekenote_look_reset_btn');
                $('#tekenote_look_save_btn').trigger("click");
            }
        })
    }

    jrgh_list_show_fn();

    //搜索关键字
    $('.takenote_list_search_btn').die('click').live('click', function () {
        if ($('.takenote_list_search_inp').val() == '借入归还单编号/借入编号/供应商名称') {
            jrgh_list_data.key = '';
        } else {
            jrgh_list_data.key = $('.takenote_list_search_inp').val();
        }
        jrgh_list_data.page = 1;
        jrgh_list_show_fn();
    });

    //我发起的
    $('#takenote_list_nav_ul li:nth-of-type(1)').die('click').live('click', function () {
        jrgh_list_data.copy_flow = '';
        jrgh_list_show_fn();
    });
    //抄送我的
    $('#takenote_list_nav_ul li:nth-of-type(2)').die('click').live('click', function () {
        jrgh_list_data.copy_flow = uid;

        jrgh_list_show_fn(1);

    });
//刷新
    $('.zj_jrgh_takenote_jcgh_res').die('click').live('click',function(){
        jrgh_list_data ={
            token: token,
            key: '', // 关键字
            page: 1, // 当前页
            num: 10, // 每页条数
            uid: '', // 下单人
            borrow_id: '', // 借入单ID
            borrow_code_sn: '', // 借入单编号
            code_sn: '', // 借入归还编号
            copy_flow: '', // 抄送人
            order_by:'create_time',
            order_sort:1,
            is_invalid:1
        };
        $('.takenote_list_search_inp').val('借入归还单编号/借入编号/供应商名称').css('color','#CCCCCC');
        // $('.takenote_jcgh_search_num').val('10');
        // $('.takenote_jcgh_list_no_show').attr('checked', 'checked');
        if($("#takenote_list_nav_ul .tabhover").text()=='我发起的'){
            jrgh_list_data.copy_flow = '';
            jrgh_list_show_fn();
        }else{
            jrgh_list_data.copy_flow = uid;
            jrgh_list_show_fn(1);
        }

    });
    var curTakenoteBorrowOutId = null;

    /*查看按钮*/
    $(".zj_jrgh_check_xq_btn").die('click').live("click", function () {
        var checkid = $(this).data('id');
        $.ajax({
            type: 'get',
            url: SERVER_URL + "/borrow-out/infobyid",
            data: {
                token: token,
                id: checkid,
                detail: 0   //是否显示商品明细 0 否 1 是
            },
            dataType: "json",
            success: function (data) {
                if(data.code == 0) {

                }
                console.log(data);
                //供应商
                $('.takenote_jrgh_supplier_name').text(data['data']['supplier_name']);
                //下单人
                $('.takenote_jrgh_user_name').text(data['data']['user_name']);
                //创建日期
                $('.takenote_jrgh_create_time').text(subTime(data['data']['create_time']));
                //借入归还单编号
                $(".zj_jrgh_check_con_info_show p span").eq(0).text(data['data']['code_sn']);
                //借入单编号
                $(".zj_jrgh_check_con_info_show p span").eq(1).text(data['data']['borrow_code_sn']);
                //供应商名称

                $(".zj_jrgh_check_con_info_show p span").eq(2).text(data['data']['supplier_name']);
                //发货日期
                $(".zj_jrgh_check_con_info_show p span").eq(3).text(subTime(data['data']['shipments_time']));
                //物流方式
                if (data['data']['logistics_way'] == 1) {
                    $(".zj_jrgh_check_con_info_show p span").eq(4).text('快递');
                } else if (data['data']['logistics_way'] == 2) {
                    $(".zj_jrgh_check_con_info_show p span").eq(4).text('陆运');
                } else if (data['data']['logistics_way'] == 3) {
                    $(".zj_jrgh_check_con_info_show p span").eq(4).text('空运');
                } else if (data['data']['logistics_way'] == 4) {
                    $(".zj_jrgh_check_con_info_show p span").eq(4).text('平邮');
                } else if (data['data']['logistics_way'] == 5) {
                    $(".zj_jrgh_check_con_info_show p span").eq(4).text('海运');
                }
                //包运费
                if (data['data']['is_freight'] == 1) {
                    $(".zj_jrgh_check_con_info_show p span").eq(5).text('不包');
                } else {
                    $(".zj_jrgh_check_con_info_show p span").eq(5).text('包运费');
                }
                //供应商联系人
                $(".zj_jrgh_check_con_info_show p span").eq(6).text(data['data']['contactor']);
                //联系人电话
                $(".zj_jrgh_check_con_info_show p span").eq(7).text(data['data']['tel']);
                //地址
                $(".zj_jrgh_check_con_info_show p span").eq(8).text(data['data']['address']);
                //备注
                $(".zj_jrgh_check_con_info_show p span").eq(9).text(data['data']['remark']);
                //抄送人

                var cs_name = '';
                $.each(data['data']['copy_flow'], function (i, v) {
                    cs_name += likNullData(v['name']) + ',';
                });
                cs_name = cs_name.slice(0, cs_name.length - 1);
                $(".zj_jrgh_check_con_info_show p span").eq(10).text(cs_name);
                //借入单
                $('.ht_slid_list ul li:nth-of-type(2)').die('click').live('click', function () {
                    takenoteJrdId = data.data.borrow_id;
                    $.ajax({
                        url: SERVER_URL + '/borrow/basic',
                        type: 'POST',
                        data: {
                            token: token,
                            id: takenoteJrdId
                        },
                        dataType: 'json',
                        success: function (oE) {
                            console.log(oE);
                            if (oE.code == 0) {
                                var cc = oE.cc;
                                var data = oE.data;
                                console.log(oE);
                                // 借入单编号
                                $('.takenote_jrgh_borrow_code_sn').html(data['code_sn']);
                                // 供应商名称
                                $('.takenote_jrgh_borrow_supplier_name').html(data['supplier_name']);
                                //预计归还日期
                                $('.takenote_jrgh_borrow_expect_return_time').html(data['expect_return_time']);
                                //税率
                                if (data['tax_rate'] == 0) {
                                    $('.takenote_jrgh_borrow_tax_rate').html('含税17%');
                                } else if (data['tax_rate'] == 1) {
                                    $('.takenote_jrgh_borrow_tax_rate').html('不含税');
                                }
                                //备注
                                $('.takenote_jrgh_borrow_note').html(data['note']);
                                //抄送人
                                var csrHtml = '';
                                $.each(cc, function (i, v) {
                                    csrHtml += likNullData(v['name']) + ',';
                                });
                                csrHtml = csrHtml.slice(0, csrHtml.length - 1);
                                console.log(csrHtml);
                                $('.takenote_jrgh_borrow_cc_name').html(csrHtml);
                                //归还状态
                                if (data['thetype'] == 0) {
                                    $('.takenote_jrgh_borrow_thetype').html('-');
                                } else if (data['thetype'] == 1) {
                                    $('.takenote_jrgh_borrow_thetype').html('未归还');
                                } else if (data['thetype'] == 2) {
                                    $('.takenote_jrgh_borrow_thetype').html('部分归还');
                                } else if (data['thetype'] == 3) {
                                    $('.takenote_jrgh_borrow_thetype').html('已归还');
                                }
                                //  入库信息
                                $('.takenote_jrgh_borrow_library_time').html(data['library_time']);

                            }

                        },
                        error: function (oE) {
                            console.log(oE);
                        }
                    });
                    /*查看借入单*/
                    $(".zj_check_jrd_xq_info_content_btn").die().live("click", function () {
                        $.ajax({
                            type: 'POST',
                            url: SERVER_URL + "/borrow/look-borrow",
                            data: {
                                token: token,
                                //company_id: company_id, //公司id
                                id: 14// 用户id
                            },
                            dataType: "json",
                            success: function (data) {
                                console.log(data);
                                if(data.code==0){
                                    $(".zj_check_jrd_gys_name").text(data['data']['supplier_name']);
                                    $(".zj_xdr_name_show").text(data['data']['xiadan_name']);
                                    $(".zj_create_day_time_show").text(data['data']['create_time']);
                                    $(".tanceng .zj_jrd_info_num_header_show .zj_jrd_bh_show_num").text(data['data']['code_sn']);
                                    $(".tanceng .zj_jrd_info_num_header_show .zj_supplier_name_show").text(data['data']['supplier_name']);
                                    $(".tanceng .zj_jrd_info_num_header_show .zj_yjgh_time_show").text(data['data']['expect_return_time']);
                                    $(".tanceng .zj_jrd_info_num_header_show .zj_rk_day_show").text(data['data']['library_time']);
                                    $(".tanceng .zj_jrd_info_num_header_show .zj_note_info_show").text(data['data']['note']);
                                    if (data['data']['goods'] && data['data']['goods']['sum_total']) {
                                        $(".tanceng .zj_goods_zprice .zj_goods_hj_znum").text(data['data']['goods']['sum_total']);
                                    }
                                    if (data['data']['setting'] && data['data']['setting']['total_money']) {
                                        $(".xs_bjd_table_3 .zj_hj_zj_money").text(data['data']['setting']['total_money']);
                                    }


                                    /*ff*/
                                    $(".zj_dj_hj_price_num").text(data['data']['unit_price_total']);
                                    $(".zj_hs_hj_zprice_number").text(data['data']['tax_total']);
                                    $(".zj_other_price_num").text(data['data']['other_costs']);
                                    $(".zj_znum_zj_m_price").text(data['data']['all_money']);
                                    var html = '';
                                    if (data['data']['goods']) {
                                        $.each(data['data']['goods'], function (i, v) {
                                            $.each(v, function (i2, v2) {
                                                html += '<tr>\
                                            <td>' + (i2 + 1) + '</td>\
                                            <td>' + likNullData(v2['good_sn']) + '</td>\
                                            <td>' + likNullData(v2['good_name']) + '</td>\
                                            <td>' + likNullData(v2['good_attr']) + '</td>\
                                            <td>' + likNullData(v2['good_num']) + '</td>\
                                            <td>' + likNullData(v2['good_price']) + '</td>\
                                            <td>' + likNullData(v2['good_rate_price']) + '</td>\
                                            <td>' + likNullData(v2['good_total']) + '</td>\
                                            <td></td>\
                                            </tr>'
                                            })

                                        })
                                    }

                                    $(".zj_goods_table_content_info").html(html);
                                    /*整机商品*/

                                    var complete = '';
                                    if (data['data']['setting']) {
                                        $.each(data['data']['setting'], function (i, arr) {
                                            var setting = '';
                                            if (arr['good_list']) {
                                                $.each(arr['good_list'], function (i2, v2) {
                                                    var setting_goods = ''
                                                    if (v2['attr_list']) {
                                                        $.each(v2['attr_list'], function (i3, v3) {
                                                            setting_goods += '<tr>\
                                                <td>' + likNullData(v3['good_sn']) + '</td>\
                                                <td>' + likNullData(v3['good_attr']) + '</td>\
                                                <td>' + likNullData(v3['sing_num']) + '</td>\
                                                <td>' + likNullData(v3['good_price']) + '</td>\
                                                <td>' + likNullData(v3['good_rate_price']) + '</td>\
                                                <td>' + likNullData(v3['good_total']) + '</td>\
                                                <td></td>\
                                                </tr>'
                                                        })
                                                    }

                                                    setting += '<table class="xs_bjd_table_1">\
                                <thead>\
                                <tr style="background: #fff;">\
                                <th class="c_3" style="font-weight: 100;">' + likNullData(v2['title']) + '</th>\
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
                                <tbody>' + setting_goods + '\
                                </tbody>\
                            </table>'
                                                })
                                            }

                                            complete += '<div class="xs_div_2" style="margin-top: 20px;">\
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
                                    <td>01</td>\
                                    <td>' + likNullData(arr['good_sn']) + '</td>\
                                    <td>' + likNullData(arr['good_name']) + '</td>\
                                    <td>' + likNullData(arr['good_attr']) + '</td>\
                                    <td>' + likNullData(arr['num']) + '' + likNullData(arr['good_unit']) + '</td>\
                                    <td>' + likNullData(arr['price']) + '</td>\
                                    <td>' + likNullData(arr['containing_money']) + '</td>\
                                    <td class="zj_pz_sum_price">' + likNullData(arr['total_money']) + '</td>\
                                    <td><button class="but_mix box_open_btn_2 but_blue_1">展开</button></td>\
                                </tr>\
                            </tbody>\
                            </table>\
                            </div>\
                            <div class="xs_tc_goods_box goods_tc_toggle" style="display: none;">' + setting + '</div>'

                                        })

                                    }


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
                });
                //出库单
                $('.ht_slid_list ul li:nth-of-type(3)').die('click').live('click', function () {
                    var takenoteJrchNo = data.data.code_sn;
                    console.log(takenoteJrchNo);
                    $.ajax({
                        url: SERVER_URL + '/borrow-out/stockoutinfo',
                        type: 'GET',
                        data: {
                            token: token,
                            related_receipts_no: takenoteJrchNo
                        },
                        dataType: 'json',
                        success: function (data) {
                            console.log(data);
                            if (data.code == 0) {
                               /* var data = oE.data;
                                console.log(data);*/
                                //出库状态
                                if (data['data']['output_status'] == 1) {
                                    $('.takenote_jrgh_output_status').html('待出库');
                                } else if (data['data']['output_status'] == 2) {
                                    $('.takenote_jrgh_output_status').html('部分出库');
                                } else if (data['data']['output_status'] = 3) {
                                    $('.takenote_jrgh_output_status').html('完成出库');
                                }
                                //发货状态
                                if (data['data']['shipments_status'] == 1) {
                                    $('.takenote_jrgh_shipments_status').html('待发货');
                                } else if (data['data']['shipments_status'] == 2) {
                                    $('.takenote_jrgh_shipments_status').html('部分发货');
                                } else if (data['data']['shipments_status'] = 3) {
                                    $('.takenote_jrgh_shipments_status').html('完成发货');
                                }

                                /*出库信息*/
                                if(data['data']['stockingOutList']['output_num']) {
                                    $(".ven_sell_order_look_skjl_tbody_nodata_box").hide();
                                    var ck_info = '<tr class="">\
                                    <td>' + data['data']['stockingOutList']['output_num'] + '</td>\
                                    <td>' + data['data']['stockingOutList']['distribution_num'] + '</td>\
                                    <td>' + data['data']['stockingOutList']['set_num'] + '</td>\
                                    <td>' + data['data']['stockingOutList']['combo_set_num'] + '</td>\
                                    <td>' + data['data']['stockingOutList']['is_package_freight'] + '</td>\
                                    <td>' + data['data']['stockingOutList']['distribution_name'] + '</td>\
                                    </tr>'
                                    $(".ven_sell_order_look_skjl_tbody").html(ck_info);
                                }else{
                                    $(".ven_sell_order_look_skjl_tbody").empty();
                                    $(".ven_sell_order_look_skjl_tbody_nodata_box").show();
                                }

                                var kf_goods=''
                                if(data['data']['stockOutList'].length>0){
                                    $(".zj_jcd_order_look_skjl_tbody_nodata_box").hide();
                                    $.each(data['data']['stockOutList'],function(i,goods_info){
                                        var ck_fs='';
                                        if(goods_info['output_way']==1){
                                            ck_fs='商品';
                                        }else if(goods_info['output_way']==2){
                                            ck_fs='整机';
                                        }else if(goods_info['output_way']==3){
                                            ck_fs='组装';
                                        }
                                        var out_state='';
                                        if(goods_info['output_status']==1){
                                            out_state='待出库';
                                        }else if(goods_info['output_status']==2){
                                            out_state='部分出库';
                                        }else if(goods_info['output_status']==3){
                                            out_state='完成出库';
                                        }
                                        var fh_state=''
                                        if(goods_info['shipments_status']==1){
                                            fh_state='待发货';
                                        }else if(goods_info['shipments_status']==2){
                                            fh_state='部分发货';
                                        }else if(goods_info['shipments_status']==3){
                                            fh_state='完成发货';
                                        }
                                        kf_goods+='<tr class="ven_sell_order_look_skjl_tbody_table_total">\
                                        <td>'+repair(i+1)+'</td>\
                                        <td>'+ck_fs+'</td>\
                                        <td>'+goods_info['warehouse_name']+'</td>\
                                        <td>'+goods_info['output_num']+'</td>\
                                        <td>'+goods_info['distribution_num']+'</td>\
                                        <td>'+goods_info['package_num']+'</td>\
                                        <td>'+goods_info['shipments_num']+'</td>\
                                        <td>'+out_state+'</td>\
                                        <td>'+fh_state+'</td>\
                                        <td>'+goods_info['output_name']+'</td>\
                                        </tr>'
                                    })
                                    $(".zj_goods_jrgh_order_look_skjl_tbody").html(kf_goods);
                                }else{
                                    $(".zj_goods_jrgh_order_look_skjl_tbody").empty();
                                    $(".zj_jcd_order_look_skjl_tbody_nodata_box").show();
                                }
                                //
                                var takenoteCkHtml = '';
                                $.each(data['data']['logisticsList'],function(i,v){
                                    //console.log(data.logisticsList);
                                    takenoteCkHtml +='<div class="takenote_jrgh_look_div">\
                                        <div class="left">\
                                        <p class="l-s-x c_3">物流公司：<span>' + likNullData(v['logistics_name']) + '</span></p>\
                                    <p class="l-s-x c_3">物流单号：<span>' + likNullData(v['logistics_sn']) + '</span></p>\
                                    </div>\
                                    <div class="right"><button class="but_small but_blue val_dialog takenote_look_fhgoods_btn" data-logistics_name="'+v['logistics_name']+'" data-logistics_sn="'+v['logistics_sn']+'" name="takenote_look_fh_goods" lookgoods="'+takenoteJrchNo+'">查看发货商品</button></div>\
                                        </div>';

                                });
                                $('.takenote_jrgh_look_a').html(takenoteCkHtml);


                            }
                        },
                        error: function (oE) {
                            console.log(oE);
                        }
                    });
                });
            }
        });
        $('.ht_slid_list ul li:nth-of-type(1)').trigger('click');

        /*查看借入归还单*/
        $(".zj_ck_jrgh_info_xq_btn").die().live("click", function () {
            $.ajax({
                type: 'get',
                url: SERVER_URL + "/borrow-out/infobyid",
                data: {
                    token: token,
                    id: checkid,
                    detail: 1   //是否显示商品明细 0 否 1 是
                },
                dataType: "json",
                success: function (data) {
                    $(".zj_jrgh_gys_name_show").text(data['data']['supplier_name']);
                    $(".zj_jrgh_creat_day").text(subTime(data['data']['create_time']));
                    $(".zj_jrgh_xdr_name").text(data['data']['user_name']);
                    $(".zj_jrgh_xq_info_head .zj_info").eq(0).text(data['data']['code_sn']);
                    $(".zj_jrgh_xq_info_head .zj_info").eq(1).text(data['data']['borrow_code_sn']);
                    $(".zj_jrgh_xq_info_head .zj_info").eq(2).text(data['data']['supplier_name']);
                    $(".zj_jrgh_xq_info_head .zj_info").eq(3).text(subTime(data['data']['shipments_time']));
                    if (data['data']['logistics_way'] == 1) {
                        $(".zj_jrgh_xq_info_head .zj_info").eq(4).text('快递');
                    } else if (data['data']['logistics_way'] == 2) {
                        $(".zj_jrgh_xq_info_head .zj_info").eq(4).text('陆运');
                    } else if (data['data']['logistics_way'] == 3) {
                        $(".zj_jrgh_xq_info_head .zj_info").eq(4).text('空运');
                    } else if (data['data']['logistics_way'] == 4) {
                        $(".zj_jrgh_xq_info_head .zj_info").eq(4).text('平邮');
                    } else if (data['data']['logistics_way'] == 5) {
                        $(".zj_jrgh_xq_info_head .zj_info").eq(4).text('海运');
                    }
                    //$(".zj_jrgh_xq_info_head .zj_info").eq(4).text(data['data']['logistics_way']);
                    //$(".zj_jrgh_xq_info_head .zj_info").eq(5).text(data['data']['is_freight']);
                    if (data['data']['is_freight'] == 1) {
                        $(".zj_jrgh_xq_info_head .zj_info").eq(5).text('不包');
                    } else {
                        $(".zj_jrgh_xq_info_head .zj_info").eq(5).text('包运费');
                    }
                    $(".zj_jrgh_xq_info_head .zj_info").eq(6).text(data['data']['contactor']);
                    $(".zj_jrgh_xq_info_head .zj_info").eq(7).text(data['data']['tel']);
                    $(".zj_jrgh_xq_info_head .zj_info").eq(8).text(data['data']['address']);
                    /*商品*/
                    var html = '';
                    if(data['data']['goods']){
                        $.each(data['data']['goods'], function (i, v) {
                            var sort = repair(i + 1);
                            html += '<tr>\
                            <td>' + likNullData(v['code_sn']) + '</td>\
                            <td>' + likNullData(v['product_name']) + '</td>\
                            <td>' + likNullData(v['attr_name']) + '</td>\
                            <td>' + likNullData(v['num']) + '</td>\
                            <td>' + likNullData(v['return_num']) + '</td>\
                            <td></td>\
                            </tr>'
                            $(".zj_goods_content_show_list").html(html);

                        })
                    }

                    /*配置商品*/
                    var setting_g = '';
                    if(data['data']['setting']){

                        $.each(data['data']['setting'], function (i, arr) {
                            var setting = '';

                            $.each(arr['pieceList'], function (i2, v2) {
                                var setting_goods = ''
                                if (v2['list']) {
                                    $.each(v2['list'], function (i3, v3) {
                                        setting_goods += '<tr>\
                                                <td>' + likNullData(v3['code_sn']) + '</td>\
                                                <td>' + likNullData(v3['attr_name']) + '</td>\
                                                <td>' + likNullData(v3['num']) + '' + likNullData(arr['unit_name']) + '</td>\
                                                <td>' + likNullData(v3['return_num']) + '' + likNullData(arr['unit_name']) + '</td>\
                                                <td></td>\
                                                </tr>'
                                    })
                                }

                                setting += '<table class="xs_bjd_table_1">\
                                <thead>\
                                <tr style="background: #fff;">\
                                <th class="c_3" style="font-weight: 100;">' + likNullData(v2['cate_name']) + '</th>\
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
                                <tbody>' + setting_goods + '\
                                </tbody>\
                            </table>'
                            })


                            setting_g += '<div class="xs_div_2" style="margin-top: 20px;">\
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
                                    <td>' + likNullData(arr['code_sn']) + '</td>\
                                    <td>' + likNullData(arr['product_name']) + '</td>\
                                    <td>' + likNullData(arr['attr_name']) + '</td>\
                                    <td>' + likNullData(arr['num']) + '' + likNullData(arr['unit_name']) + '</td>\
                                    <td>' + likNullData(arr['return_num']) + '' + likNullData(arr['unit_name']) + '</td>\
                                    <td><button class="but_mix box_open_btn_1 but_blue_1">展开</button></td>\
                                </tr>\
                            </tbody>\
                            </table>\
                            </div>\
                            <div class="xs_xsbjd_table_t2 xs_tc_goods_box goods_tc_toggle" style="display: none;">' + setting + '</div>'

                        })
                    }
                    $(".zj_jrgh_zj_goods_info_dv").html(setting_g);
                }
            })
        });
        //查看发货商品
        $('.takenote_look_fhgoods_btn').die('click').live('click',function(){
            //var takenoteJrchNo1 =$(this).attr('lookgoods');
            var logistics_sn=$(this).data('logistics_sn')
            var logistics_name=$(this).data('logistics_name')

            //console.log(takenoteJrchNo1);
            $.ajax({
                url: SERVER_URL + '/stock-out/shipmentsdetail',
                type: 'GET',
                data: {
                    token: token,
                    logistics_sn: logistics_sn
                },
                dataType: 'json',
                success:function(oE){
                    console.log(oE);

                    var goods_info='';
                    if(oE.code == 0){
                        $(".takenote_look_output_time").text(oE['data']['create_time']);
                        $(".takenote_look_output_name").text(oE['data']['shipments_name']);
                        $(".zj_look_goods_num").text(oE['data']['related_receipts_no']);
                        $(".takenote_look_logistics_name").text(logistics_name);
                        $(".takenote_look_logistics_sn").text(oE['data']['number']);
                        if(oE.data['productList'].length > 0) {
                            $.each(oE['data']['productList'],function(i,goods){
                                goods_info+='<tr class="c_3">\
                            <td>'+repair(i+1)+'</td>\
                            <td>'+goods['code_sn']+'</td>\
                            <td>'+goods['product_name']+'</td>\
                            <td>'+goods['attr_name']+'</td>\
                            <td>'+goods['shipments_num']+'</td>\
                            </tr>';
                            })
                            $(".zj_goods_info_nr_show_body").html(goods_info);

                        } else {
                            alert('数据为空');
                        }

                    } else {
                        alert(oE.msg);
                    }
                }
            })
        });
    });




    //作废
    $('.takenote_invalid_btn').die('click').live('click', function () {
        curTakenoteBorrowOutId = $(this).data('id');
        console.log(curTakenoteBorrowOutId);
        $.ajax({
            url: SERVER_URL + '/borrow-out/invalid',
            type: 'GET',
            data: {
                token: token,
                id: curTakenoteBorrowOutId
            },
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                if (oE.code == 0) {
                    jrgh_list_show_fn();
                }else{
                    alert(oE.msg);
                }
            },
            error: function (e) {
                alert('服务器更新失败，请稍后再试');
                console.log(e);
            }
        });
    });
    /*不显示已作废*/
    $(".zj_jrgh_no_show_zf_state").die().live("click",function () {
        if($(this).is(':checked')){
            jrgh_list_data.is_invalid = 1;
            jrgh_list_show_fn();
        }else{
            jrgh_list_data.is_invalid = '';
            jrgh_list_show_fn();
        }
    });


    /*/!*抄送我的*!/
    $("#zj_jcd_cswd_fqd_head").die().die('click').live('click', function () {
        var cswd_list_data = {
            token: token,
            uid: uid,
            company_id: company_id,
            page: 1,
            num: 10
        }

        function cswd_list_show_fn() {
            $.ajax({
                type: 'post',
                url: SERVER_URL + "/lend/cc",
                data: cswd_list_data,
                dataType: "json",
                success: function (data) {
                    if (data.code == 0) {
                        if (data['data'].length > 0) {
                            $(".zj_jcd_header_fy_show_page").show();
                            $(".zj_jcd_data_list_no_show").hide();
                        } else {
                            $(".zj_jcd_header_fy_show_page").hide();
                            $(".zj_jcd_data_list_no_show").show();
                        }
                    } else {
                        $(".zj_jcd_header_fy_show_page").hide();
                        $(".zj_jcd_data_list_no_show").show();
                    }

                    var html = '';
                    //var P_sort=" ";
                    if (data.code == 0) {

                        $.each(data.data, function (index, content) {
                            var sort = repair(index + 1)
                            if (content['is_invalid'] == 1) {
                                html += '<tr class="grey"> <td><span class="voidIcon">作废</span></td>'
                            } else {
                                html += '<tr> <td>' + sort + '</td>'
                            }

                            html += '<td>' + likNullData(content['code_sn']) + '</td>'
                            html += '<td>' + likNullData(content['']) + '</td>'
                            html += '<td>' + likNullData(content['expect_return_time']) + '</td>'
                            if (content['approval_status_name'] == '') {

                            }
                            html += '<td class="c_g">' + likNullData(content['approval_status_name']) + '</td>';
                            html += '<td>' + likNullData(content['']) + '</td>';
                            html += '<td>' + likNullData(content['']) + '</td>';
                            html += '<td>' + likNullData(content['']) + '</td>';
                            html += '<td>' + likNullData(content['']) + '</td>';
                            html += '<td>' + likNullData(content['']) + '</td>';
                            html += '<td>' + likNullData(content['']) + '</td>';
                            html += '<td class="c_y">' + likNullData(content['guihuan']) + '</td>';
                            html += '<td>' + likNullData(content['note']) + '</td>';
                            html += '<td>';
                            html += '<button class="but_mix r_sidebar_btn zj_jcd_check_xq_btn" data-id="' + content['id'] + '" name="takenote_jcd_ck">查看</button><button class="but_mix1 but_grey1" name="">审批</button>'
                            html += '</td>';
                            html += '</tr>';

                        })

                    } else {
                        alert(data.msg);
                    }
                    $(".zj_jcd_cswd_body_content_list").append(html);
                    /!*分页*!/

                    // var znum=data.totalcount;
                    // var zpage=data.data.length;
                    $(".zcj_jrd_seach_syjg").text(data.total_num);
                    list_table_render_pagination(".zcj_jrdfy_head_page_div", cswd_list_data, cswd_list_show_fn, data.total_num, data.data.length);
                    //$(".zcj_jrd_check_save_btn").trigger('click');
                }

            })

        }

        cswd_list_show_fn();
    });*/

    //新建借入归还

    var takenoteBorrowOutCreateData = {
        token: token,
        code_sn: '', //借入归还单编号
        borrow_id: '', //借入单id
        borrow_code_sn: '', //借入单编号
        supplier_id: '', //供应商id
        supplier_name: '', // 供应商名称
        logistics_way: '', //物流方式 1.快递 2.陆运 3.空运 4.平邮 5.海运
        copy_flow: '', //抄送人 格式：4,21,22
        remark: '', //备注
        is_freight: '', //是否包运费 1不包 2包运费
        contactor: '', //供应商联系人
        tel: '', //联系电话
        address: '', //收货地址
        shipments_time: '', //发货日期
        product_info: ''
    };
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
    $('.takenote_brw_out_create_btn').die('click').live('click', function () {

        // takenoteBorrowOutCreateData = {
        //     token: token,
        //     code_sn: '', //借入归还单编号
        //     borrow_id: '', //借入单id
        //     borrow_code_sn: '', //借入单编号
        //     supplier_id: '', //供应商id
        //     supplier_name: '', // 供应商名称
        //     logistics_way: '', //物流方式 1.快递 2.陆运 3.空运 4.平邮 5.海运
        //     copy_flow: '', //抄送人 格式：4,21,22
        //     remark: '', //备注
        //     is_freight: '', //是否包运费 1不包 2包运费
        //     contactor: '', //供应商联系人
        //     tel: '', //联系电话
        //     address: '', //收货地址
        //     shipments_time: '', //发货日期
        //     product_info: ''
        // };
        //创建日期
        $('.tanceng .takenote_brw_out_create_time').html(getCurrentDateDay());
        //下单人
        $('.tanceng .takenote_brw_out_create_uname').html(uname);
        //编号
        //$('.tanceng .takenote_brw_out_create_code_sn').val(likGetCodeFn('JRGH'));
        new_number('.tanceng .takenote_brw_out_create_code_sn', 'JRGH')
    });

    //选择借入单
    $('.tanceng .takenote_brw_out_create_choose_brw_btn').die('click').live('click', function () {
        getBrwListFn();
    });
    var getBrwData = {
        token: token,
        uid: uid, // 用户id
        company_id: company_id, // 公司id
        page: 1, // 页数
        num: 10, // 条数
        is_invalid: 1,
        approval_status: 2,
        key_search: '',
        guihuan: 2 // 1是全部,2是不显示已归还
    };

    function getBrwListFn() {
        $.ajax({
            url: SERVER_URL + '/borrow/list',
            type: 'POST',
            data: getBrwData,
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                if (oE.code == 0) {
                    $('.tanceng .takenote_create_choose_lend_total').html(oE.total_num);
                    var datalist = oE.data;
                    if (datalist.length == 0) {
                        $('.tanceng .takenote_brw_out_create_choose_lend_nodata_box').removeClass('none');
                        $('.tanceng .takenote_brw_out_create_choose_lend_handle').addClass('none');
                    } else {
                        $('.tanceng .takenote_brw_out_create_choose_lend_nodata_box').addClass('none');
                        $('.tanceng .takenote_brw_out_create_choose_lend_handle').removeClass('none');
                    }
                    var brwList = '';
                    var approvalStatus = '';
                    $.each(datalist, function (i, v) {
                        brwList += '<tr brwid="' + v['id'] + '" supid="' + v['supplier_id'] + '">\
                            <td><input type="radio" ' + (i == 0 ? 'checked' : '') + ' name="xs_bjd_xzxsdd"></td>\
                            <td>' + likNullData(v['code_sn']) + '</td>\
                            <td>' + likNullData(v['supplier_name']) + '</td>\
                            <td>' + likNullData(v['expect_return_time']) + '</td>\
                            <td>' + likNullData(v['approval_status_name']) + '</td>\
                            <td>' + likNullData(v['create_time']) + '</td>\
                            <td>' + likNullData(v['all_money']) + '</td>\
                            <td>' + likNullData(v['note']) + '</td>\
                            </tr>';
                    });
                    $('.tanceng .takenote_brw_out_choose_brw_tbody').html(brwList)
                    //分页
                    list_table_render_pagination('.takenote_brw_out_create_choose_lend_pagination', getBrwData, getBrwListFn, oE.total_num, datalist.length);
                }
            },
            error: function (e) {
                alert(e.msg);
                console.log(e);
            }
        });
    }

    //选择借入单 - 搜索关键字
    $('.tanceng .takenote_create_choose_lend_search_btn').die('click').live('click', function () {
        if ($('.tanceng .takenote_create_choose_lend_search_inp').val() == '搜索借入单编号') {
            getBrwData.key_search = '';
        } else {
            getBrwData.key_search = $('.tanceng .takenote_create_choose_lend_search_inp').val();
        }
        getBrwListFn();
    });

    //选择借入单保存
    $('.tanceng .takenote_brw_out_create_choose_brw_save').die('click').live('click', function () {


        var chosenBrwId = null;
        var chosenSupId = null;
        $.each($('.tanceng .takenote_brw_out_choose_brw_tbody tr'), function (i, v) {
            if ($('.tanceng .takenote_brw_out_choose_brw_tbody tr').eq(i).find('input:radio').attr('checked') == 'checked') {
                chosenBrwId = $('.tanceng .takenote_brw_out_choose_brw_tbody tr').eq(i).attr('brwid');
                takenoteBorrowOutCreateData.borrow_id = chosenBrwId;
                chosenSupId = $('.tanceng .takenote_brw_out_choose_brw_tbody tr').eq(i).attr('supid');
                takenoteBorrowOutCreateData.supplier_id = chosenSupId;
                getBrwDetailFn(chosenBrwId);
                getSupDetailFn(chosenSupId);
            }
        });
        $(this).closest('.dialog_box').remove();
    });
    //获取借入单详情
    function getBrwDetailFn(brwId) {
        $.ajax({
            url: SERVER_URL + '/borrow/look-borrow',
            type: 'POST',
            data: {
                token: token,
                id: brwId
            },
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                if (oE.code == 0) {
                    var data = oE.data;
                    $('.tanceng .takenote_brw_out_create_brw_sn').val(data['code_sn']);
                    var brwOutProductData = [];
                    //基本商品
                    var brwGoodsList = '';
                    if (data['goods']) {
                        if (data['goods']['goods'].length > 0) {
                            $.each(data['goods']['goods'], function (i, v) {
                                brwGoodsList += '<tr bigid="' + v['id'] + '" goodsid="' + v['good_id'] + '">\
                                            <td><input type="checkbox"></td>\
                                            <td>' + v['good_sn'] + '</td>\
                                            <td>' + v['good_name'] + '</td>\
                                            <td>' + v['good_attr'] + '</td>\
                                            <td>' + v['good_num'] + '</td>\
                                            <td><div class="xs_num_input num_input inline_block num_input_new"><button class="but_grey_a but_opa_small inp_plus takenote_create_goods_num_change_btn" disabled>+</button><input type="text" class="lik_input_number productnum takenote_create_goods_num_inp" maxnum="' + (parseFloat(v['good_num']) - parseFloat(v['return_num'])) + '" value="0" disabled><button class = "but_grey_a but_opa_small radius_left_0 inp_reduce takenote_create_goods_num_change_btn" disabled> - </button> </div> </td>\
                                            </tr> ';
                            });
                            $('.tanceng .takenote_create_goods_tbody').html(brwGoodsList);
                        } else {
                            $('.tanceng .tekenote_goods_nav_ul li:nth-of-type(1)').css('display', 'none');
                        }
                    } else {
                        $('.tanceng .tekenote_goods_nav_ul li:nth-of-type(1)').css('display', 'none');
                        //$('.tanceng .tekenote_goods_list_nav>div:nth-of-type(1)').css('display', 'none');
                    }
                    //整机商品
                    var brwSettingList = '';
                    console.log(data['setting']);
                    if (data['setting']) {
                        if (data['setting'].length > 0) {
                            $.each(data['setting'], function (i, v) {
                                var goodsList = '';
                                var settingNum = parseFloat(v['num']) - parseFloat(v['return_num']);
                                if (v['good_list']) {
                                    $.each(v['good_list'], function (i2, v2) {
                                        var attrList = '';
                                        if (v2['attr_list']) {
                                            $.each(v2['attr_list'], function (i3, v3) {
                                                attrList += '<tr bigid="' + v3['id'] + '" goodsid="' + v3['good_id'] + '">\
                                                    <td><input class="takenote_create_setting_child_checkbox" type="checkbox" disabled></td>\
                                                    <td>' + v3['good_sn'] + '</td>\
                                                    <td>' + v3['good_attr'] + '</td>\
                                                    <td class="takenote_create_setting_goods_singnum">' + v3['sing_num'] + '</td>\
                                                    <td><div class="xs_num_input num_input inline_block num_input_new"><button class="but_grey_a but_opa_small inp_plus takenote_create_goods_num_change_btn" disabled>+</button><input type="text" class="lik_input_number productnum takenote_create_setting_goods_num" maxnum="' + (settingNum * v3['sing_num']) + '" value="0" disabled><button class="but_grey_a but_opa_small radius_left_0 inp_reduce takenote_create_goods_num_change_btn" disabled>-</button></div></td>\
                                                    </tr>';
                                            });
                                        } else {
                                            return true;
                                        }
                                        goodsList += '<div class="box_open_list goods_tc_toggle">\
                                        <p class="box_open_head" style="background: rgb(255, 255, 255); border-radius: 3px;"><span class="cont_title"style="padding-left: 0;margin-left: 0;">' + v2['title'] + '</span></p>\
                                        <div class="div_1 container">\
                                        <table>\
                                        <thead>\
                                        <tr>\
                                        <th width="32">选择</th>\
                                        <th width="140">编号</th>\
                                        <th width="435">属性</th>\
                                        <th width="65">借入数量</th>\
                                        <th width="88">归还数量</th>\
                                        </tr>\
                                        </thead>\
                                        <tbody>' + attrList + '</tbody>\
                                        </table>\
                                        </div>\
                                        </div>';
                                    });
                                    brwSettingList += '<div class="takenote_setting_list_one">\
                                    <div class="xs_div_2" style="border-bottom: 1px solid #e6e6e6;">\
                                    <div class="div_1 container">\
                                    <table>\
                                    <thead>\
                                    <tr>\
                                    <th width="32">选择</th>\
                                    <th width="140">编号</th>\
                                    <th width="100">名称</th>\
                                    <th width="375">属性</th>\
                                    <th width="65">借入数量</th>\
                                    <th width="88">归还数量</th>\
                                    <th width="60">操作</th>\
                                    </tr>\
                                    </thead>\
                                    <tbody>\
                                    <tr bigid="' + v['id'] + '" settingid="' + v['goods_id'] + '">\
                                    <td><input type="checkbox" class="takenote_create_setting_parent_checkbox" name="xs_shd_check"></td>\
                                    <td>' + v['good_sn'] + '</td>\
                                    <td>' + v['good_name'] + '</td>\
                                    <td>' + v['good_attr'] + '</td>\
                                    <td>' + v['num'] + '</td>\
                                <td><div class="xs_num_input num_input inline_block num_input_new"><button class="but_blue but_opa_small inp_plus takenote_create_goods_num_change_btn takenote_create_setting_num_change_btn">+</button><input type="text" class="lik_input_number productnum takenote_creata_setting_num" maxnum="' + v['num'] + '" value="0" style="border:1px solid #23a2f3;"><button class="but_blue but_opa_small radius_left_0 inp_reduce takenote_create_goods_num_change_btn takenote_create_setting_num_change_btn">-</button></div></td>\
                                    <td><button class="but_mix box_open_btn_1 but_blue_1">展开</button></td>\
                                    </tr>\
                                    </tbody>\
                                    </table>\
                                    </div>\
                                    </div>\
                                    <div class="xs_xsbjd_table_t2 none" style="padding: 10px;border-bottom: 2px solid #e6e6e6;">' + goodsList + '</div>\
                                    </div>';
                                }

                            });
                        }
                        $('.tanceng .takenote_setting_list').html(brwSettingList);
                    }
                }
            },
            error: function (e) {
                alert(e.msg);
                console.log(e);
            }
        });
    }

    //获取供应商详情
    function getSupDetailFn(supId) {
        $.ajax({
            url: SERVER_URL + '/supplier/info',
            type: 'GET',
            data: {
                token: token,
                supplier_id: supId
            },
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                if (oE.code == 0) {
                    var data = oE.data;
                    //供应商名称

                    takenoteBorrowOutCreateData.supplier_name = data['name'];
                    //供应商联系人
                    var supCont = '';
                    $.each(data['contacts'], function (i, v) {
                        supCont += '<li conttel="' + v['contact_tel'] + '">' + v['contact_person'] + '</li>'
                    });
                    $('.tanceng .takenote_create_sup_cont_ul').html(supCont);
                    //收货地址
                    $('.tanceng .takenote_create_sup_address').val(data['address']);
                    var ali=$(".takenote_create_sup_cont_ul li").eq(0).text();
                    var tel=$(".takenote_create_sup_cont_ul li").eq(0).attr('conttel')
                    $('.tanceng .tekenote_create_choose_cont_inp').val(ali);//名字
                    $(".tanceng .takenote_create_sup_cont_tel").val(tel);//电话
                    $('.tanceng .takenote_create_sup_inp').val(data['name']);
                }
            },
            error: function (e) {
                alert(e.msg);
                console.log(e);
            }
        });
    }

    //选择供应商联系人
    $('.tanceng .takenote_create_sup_cont_ul li').die('click').live('click', function () {
        $('.tanceng .takenote_create_sup_cont_tel').val($(this).attr('conttel'));
    });

    //选择基本商品的checkbox
    $('.tanceng .takenote_create_goods_tbody tr input:checkbox').die('click').live('click', function () {
        if ($(this).is(':checked')) {
            $(this).closest('tr').find('input, button').attr('disabled', false);
        } else {
            $(this).closest('tr').find('input:not(":checkbox"), button').attr('disabled', true);
            $(this).closest('tr').find('input').val(0);
        }
    });
    $('.tanceng .takenote_create_goods_num_change_btn').die('click').live('click', function () {
        if (parseFloat($(this).siblings('input').val()) > parseFloat($(this).siblings('input').attr('maxnum'))) {
            $(this).siblings('input').val($(this).siblings('input').attr('maxnum'));
            alert('超过可归还最大数量');
        }
    });
    $('.tanceng .productnum').live('keyup', function () {
        if (parseFloat($(this).val()) > parseFloat($(this).attr('maxnum'))) {
            alert('超过可归还最大数量');
            $(this).val($(this).attr('maxnum'));
        }
    });
    //整机商品父级勾选
    $('.tanceng .takenote_setting_list input.takenote_create_setting_parent_checkbox').die('click').live('click', function () {
        if ($(this).is(':checked')) {
            $(this).closest('.takenote_setting_list_one').find('.takenote_create_setting_child_checkbox').attr('checked', true);
        } else {
            $(this).closest('.takenote_setting_list_one').find('.takenote_create_setting_child_checkbox').attr('checked', false);
            $(this).closest('.takenote_setting_list_one').find('input').val(0);
        }
    });

    //改变整机数量
    $('.tanceng .takenote_create_setting_num_change_btn').die('click').live('click', function () {
        if (parseFloat($(this).siblings('input').val()) > parseFloat($(this).siblings('input').attr('maxnum'))) {
            $(this).siblings('input').val($(this).siblings('input').attr('maxnum'));
            alert('超过可归还最大数量');
        }
        settingParentNumChange();
    });
    $('.tanceng .takenote_creata_setting_num').live('keyup', function () {
        settingParentNumChange();
    });
    function settingParentNumChange() {
        $.each($('.tanceng .takenote_setting_list .takenote_create_setting_parent_checkbox'), function (i, v) {
            if ($('.tanceng .takenote_setting_list .takenote_create_setting_parent_checkbox').eq(i).is(':checked')) {
                $.each($('.tanceng .takenote_setting_list .takenote_create_setting_parent_checkbox').eq(i).closest('.takenote_setting_list_one').find('.takenote_create_setting_goods_num'), function (i2, v2) {
                    $('.tanceng .takenote_setting_list .takenote_create_setting_parent_checkbox').eq(i).closest('.takenote_setting_list_one').find('.takenote_create_setting_goods_num').eq(i2).val(parseFloat($('.tanceng .takenote_setting_list .takenote_setting_list_one').eq(i).find('.takenote_creata_setting_num').val()) * parseFloat($('.tanceng .takenote_setting_list .takenote_create_setting_parent_checkbox').eq(i).closest('.takenote_setting_list_one').find('.takenote_create_setting_goods_singnum').eq(i2).text()));
                });
            }
        });
    }

    //选择物流方式
    $('.tanceng .takenote_create_choose_logistics_ul li').die('click').live('click', function () {
        takenoteBorrowOutCreateData.logistics_way = $(this).index() + 1;
    });

    //添加抄送人
    $('.tanceng .takenote_create_choose_copy_btn').die('click').live('click', function () {
        takenoteCreateChooseCopy()
    });
    //选择抄送人
    function takenoteCreateChooseCopy() {
        $.ajax({
            type: "get",
            url: SERVER_URL + "/dept/deptlist",
            data: {token: token},
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var deep = 0;
                    $('.tanceng .takenote_create_choose_copy_list').html(tree_list_bmfzr(oE));
                    //选择部门左侧选择
                    var arr_id=[];
                    var cs_name=[];
                    $(".tanceng .takenote_create_choose_copy_list .person_left_nav").die().live("click",function(){
                        /* debugger;*/
                        var id=$(this).attr("userinfoid");
                        var name=$(this).find("span.list_msg").text();
                        $(this).toggle(function(){
                            $('.tanceng .takenote_create_copy_chosen_list').append('<li rid="'+$(this).attr('userinfoid')+'"><span>'+$(this).children('.list_msg').text()+'</span><i class="list_choose_delete"></i></li>')
                            $(this).append('<span class="list_check"><em class="on"></em></span>');
                            //$(this).find('span.list_check em').addClass('on')
                            arr_id.unshift(id);
                            cs_name.unshift(name)
                            console.log(arr_id);
                            console.log(cs_name);

                        },function(){
                            $('.tanceng .takenote_create_copy_chosen_list').find('li[rid='+$(this).attr('userinfoid')+']').remove()
                            //$(this).remove('<span class="list_check"><em class="on"></em></span>');
                            $(this).find('span.list_check').remove()
                            arr_id.splice(jQuery.inArray(id,arr_id),1);
                            cs_name.splice(jQuery.inArray(id,cs_name),1);
                            console.log(arr_id);
                            console.log(cs_name);

                        })
                        $(this).trigger('click')

                        /*抄送人确认按钮*/
                        $(".tanceng .takenote_choose_copy_save").die().live("click",function(){
                            //cs_name=getJsonArr(cs_name);
                            var cs_per="";

                            $.each($(".tanceng .takenote_create_copy_chosen_list li"),function (i,v) {
                                cs_per+='<li rid="'+arr_id[i]+'" class="zj_csr_num"><i class="del_img_1">-</i><em class="icon_personBtn icon_personBtn_msg"><i class="icon_personNext"></i></em> <em class="icon_adderBtn"></em> <p class="box_adderName">'+cs_name[i]+'</p></li>'
                            });

                            $(".takenote_create_choose_copy_btn").parent().before(cs_per);
                            $(this).closest('.dialog_box').remove();
                            //$(".zcj_shoose_right_list").empty();

                        });
                    });

                    /*删除选择的抄送人*/
                    $(".tanceng .takenote_create_copy_chosen_list .list_choose_delete").die().live("click",function(){
                        var cs_id=$(this).parent().attr("rid");
                        var name=$(this).prev().text();

                        $(this).parent().remove();
                        arr_id.splice(jQuery.inArray(cs_id,arr_id),1);
                        cs_name.splice(jQuery.inArray(name,cs_name),1);
                        console.log(arr_id);
                        console.log(cs_name);
                        $(".takenote_create_choose_copy_list .person_left_nav").each(function(){
                            if($(this).attr('userinfoid')==cs_id){
                                $(this).click();
                                $(this).children('span.list_check').remove();
                            }
                        })
                    });

                    /*删除添加后的抄送人*/
                    $(".takenote_create_add_copy_list .del_img_1").die().live("click",function(){
                        var dq_id= $(this).parent().attr("arrid");
                        var dq_name=$(this).parent().children(".box_adderName").text();
                        $(this).parent().remove();
                        arr_id.splice($.inArray(dq_id,arr_id),1);
                        cs_name.splice($.inArray(dq_name,cs_name),1);
                        console.log(cs_name);
                        console.log(arr_id);
                    });
                    // 所有分类图标样式控制
                    // if ($('i.takenote_create_choose_copy_list').children().length == 0) {
                    //     $('li.left_all span.icon_open').addClass('personOth')
                    // }
                    // // 下级部门样式控制
                    // for (var i = 0, liLeft1 = $('.tanceng .takenote_create_choose_copy_list li.left_1').length; i < liLeft1; i++) {
                    //     if ($('.tanceng .takenote_create_choose_copy_list li.left_1').eq(i).next('ul').length == 0) {
                    //         $('.tanceng .takenote_create_choose_copy_list li.left_1').eq(i).find('span.icon_open').addClass('personOth');
                    //         $('.tanceng .takenote_create_choose_copy_list li.left_1').eq(i).find('span.personOth').closest('li').addClass('deptChild')
                    //     }
                    // }
                    // //选择人员左侧选择
                    // $('.tanceng .takenote_create_choose_copy_list ul .li_person').die('click').live('click', function () {
                    //     if ($(this).find('em').hasClass('on')) {
                    //         $('.tanceng .takenote_create_copy_chosen_list').find('li[userinfoid=' + $(this).attr('userinfoid') + ']').remove()
                    //         $(this).find('span.list_check em').removeClass('on')
                    //     } else {
                    //         $('.tanceng .takenote_create_copy_chosen_list').append('<li userinfoid="' + $(this).attr('userinfoid') + '"><span>' + $(this).children('.list_msg').html() + '</span><i class="list_choose_delete"></i></li>');
                    //         $(this).find('span.list_check em').addClass('on')
                    //     }
                    // });
                    // //选择人员右侧删除
                    // $('i.list_choose_delete').die('click').live('click', function () {
                    //     $(this).closest('li').remove();
                    //     $('.tanceng .takenote_create_choose_copy_list ul .li_person[userinfoid = "' + $(this).closest('li').attr('userinfoid') + '"]').find('em').removeClass('on');
                    // });
                    // //选择人员保存
                    // $('.tanceng .takenote_choose_copy_save').die('click').live('click', function () {
                    //     var copyChosen = '';
                    //     $.each($('.tanceng .takenote_create_copy_chosen_list li'), function (i, v) {
                    //         copyChosen += '<li userinfoid="' + $('.tanceng .takenote_create_copy_chosen_list').find('li').eq(i).attr('userinfoid') + '">\
                    //             <i class="del_img_1">-</i><em class="icon_personBtn icon_personBtn_msg"><i class="icon_personNext"></i></em>\
                    //             <em class="icon_adderBtn"></em>\
                    //             <p class="box_adderName">' + $('.tanceng .takenote_create_copy_chosen_list').find('li').eq(i).text() + '</p>\
                    //             </li>';
                    //         /*venSellChanceCreateData.copy_list += $('.tanceng .takenote_create_copy_chosen_list').find('li').eq(i).attr('userinfoid') + ',';
                    //          venSellChanceEditData.copy_list += $('.tanceng .takenote_create_copy_chosen_list').find('li').eq(i).attr('userinfoid') + ',';*/
                    //     });
                    //     $('.tanceng .takenote_create_add_copy_list').html('<li> <em class="icon_personBtn icon_personBtn_add val_dialogTop takenote_create_choose_copy_btn" name="takenote_ghd_csr"></em> </li>').prepend(copyChosen);
                    //     $(this).closest('.dialog_box').remove()
                    // })
                }
            },
            error: function (data) {

            }
        });
    }

    //新建提交
    $('.tanceng .takenote_create_submit_btn').die('click').live('click', function () {
        takenoteBorrowOutCreateData.code_sn = $('.tanceng .takenote_brw_out_create_code_sn').val();
        if ($('.tanceng .takenote_brw_out_create_brw_sn').val() == '请选择借入单') {
            alert('请选择借入单');
            return false;
        } else {
            takenoteBorrowOutCreateData.borrow_code_sn = $('.tanceng .takenote_brw_out_create_brw_sn').val();
        }
        //发货日期
        if ($('.tanceng .takenote_create_shipments_time').val() == '请选择日期' || $.trim($('.tanceng .takenote_create_shipments_time').val()) == '') {
            alert('请选择发货日期');
            return false;
        } else {
            takenoteBorrowOutCreateData.shipments_time = $('.tanceng .takenote_create_shipments_time').val();
        }
        //物流方式
        if ($('.tanceng .takenote_create_wlfs').val() == '请选择物流方式') {
            alert('请选择物流方式');
            return false;
        } else {
            if($(".takenote_create_wlfs").val()=='快递'){
                takenoteBorrowOutCreateData.logistics_way=1
            }else if($(".takenote_create_wlfs").val()=='陆运'){
                takenoteBorrowOutCreateData.logistics_way=2
            }else if($(".takenote_create_wlfs").val()=='空运'){
                takenoteBorrowOutCreateData.logistics_way=3
            }else if($(".takenote_create_wlfs").val()=='平邮'){
                takenoteBorrowOutCreateData.logistics_way=4
            }else if($(".takenote_create_wlfs").val()=='海运'){
                takenoteBorrowOutCreateData.logistics_way=5
            }
            //takenoteBorrowOutCreateData.logistics_way = $('.tanceng .takenote_create_shipments_time').val();
        }
        //是否包运费
        if ($('.tanceng .takenote_create_is_freight').is(':checked')) {
            takenoteBorrowOutCreateData.is_freight = 2;
        } else {
            takenoteBorrowOutCreateData.is_freight = 1;
        }
        //供应商联系人
        if ($('.tanceng .tekenote_create_choose_cont_inp').val() == '请选择联系人') {
            alert('请选择联系人');
            return false;
        } else {
            takenoteBorrowOutCreateData.contactor = $('.tanceng .tekenote_create_choose_cont_inp').val();
        }
        //供应商联系电话
        if ($('.tanceng .takenote_create_sup_cont_tel').val() == '请输入联系电话') {
            alert('请输入联系电话');
            return false;
        } else {
            takenoteBorrowOutCreateData.tel = $('.tanceng .takenote_create_sup_cont_tel').val();
        }
        //供应商收货地址
        if ($('.tanceng .takenote_create_sup_address').val() == '请输入收货地址' || $.trim($('.tanceng .takenote_create_sup_address').val()) == '') {
            alert('请输入收货地址');
            return false;
        } else {
            takenoteBorrowOutCreateData.address = $('.tanceng .takenote_create_sup_address').val();
        }
        //备注
        if ($('.tanceng .takenote_create_remark_textarea').val() == '请输入备注') {
            takenoteBorrowOutCreateData.remark = '';
        } else {
            takenoteBorrowOutCreateData.remark = $('.tanceng .takenote_create_remark_textarea').val();
        }
        //商品信息
        var productArr = [];

        //推送出库
        var takenoteToOutStockProduct = [];

        //基本商品
        if ($('.tanceng .tekenote_goods_list_nav tbody tr').length > 0) {
            $.each($('.tanceng .tekenote_goods_list_nav tbody tr'), function (i, v) {
                if ($('.tanceng .tekenote_goods_list_nav tbody tr').eq(i).find('input:checkbox').is(':checked')) {
                    productArr.push({
                        id: $('.tanceng .tekenote_goods_list_nav tbody tr').eq(i).attr('bigid'),
                        goods_id: $('.tanceng .tekenote_goods_list_nav tbody tr').eq(i).attr('goodsid'),
                        goods_category: 1,
                        num: $('.tanceng .tekenote_goods_list_nav tbody tr').eq(i).find('input.takenote_create_goods_num_inp').val(),
                        total_num: $('.tanceng .tekenote_goods_list_nav tbody tr').eq(i).find('td').eq(4).text()
                    });
                    takenoteToOutStockProduct.push({
                        product_id: $('.tanceng .tekenote_goods_list_nav tbody tr').eq(i).attr('goodsid'),
                        product_type: 1,
                        output_num: $('.tanceng .tekenote_goods_list_nav tbody tr').eq(i).find('input.takenote_create_goods_num_inp').val()
                    });
                }
            });
        }
        //整机商品
        if ($('.tanceng .takenote_setting_list>.takenote_setting_list_one').length > 0) {
            $.each($('.tanceng .takenote_setting_list>.takenote_setting_list_one'), function (i, v) {
                var onOff = false;
                if ($('.tanceng .takenote_setting_list>.takenote_setting_list_one').eq(i).find('.xs_div_2 tbody tr input:checkbox').attr('checked') != 'checked' && $('.tanceng .takenote_setting_list>.takenote_setting_list_one').eq(i).find('.xs_xsbjd_table_t2 tbody tr input:checked').length == 0) {
                    return true;
                }
                var settingGoodsArr = [];
                var takenoteToOutStock = [];
                $.each($('.tanceng .takenote_setting_list>.takenote_setting_list_one').eq(i).find('.xs_xsbjd_table_t2 tbody tr'), function (i2, v2) {
                    if ($('.tanceng .takenote_setting_list>.takenote_setting_list_one').eq(i).find('.xs_xsbjd_table_t2 tbody tr').eq(i2).find('input:checkbox').is(':checked')) {
                        settingGoodsArr.push({
                            id: $('.tanceng .takenote_setting_list>.takenote_setting_list_one').eq(i).find('.xs_xsbjd_table_t2 tbody tr').eq(i2).attr('bigid'),
                            goods_id: $('.tanceng .takenote_setting_list>.takenote_setting_list_one').eq(i).find('.xs_xsbjd_table_t2 tbody tr').eq(i2).attr('goodsid'),
                            num: $('.tanceng .takenote_setting_list>.takenote_setting_list_one').eq(i).find('.xs_xsbjd_table_t2 tbody tr').eq(i2).find('input.takenote_create_setting_goods_num').val()
                        });
                        takenoteToOutStock.push({
                            product_id: $('.tanceng .takenote_setting_list>.takenote_setting_list_one').eq(i).find('.xs_xsbjd_table_t2 tbody tr').eq(i2).attr('goodsid'),
                            num: $('.tanceng .takenote_setting_list>.takenote_setting_list_one').eq(i).find('.xs_xsbjd_table_t2 tbody tr').eq(i2).find('input.takenote_create_setting_goods_num').val()
                        });
                    }
                });
                productArr.push({
                    id: $('.tanceng .takenote_setting_list>.takenote_setting_list_one').eq(i).find('.xs_div_2 tbody tr').attr('bigid'),
                    goods_id: $('.tanceng .takenote_setting_list>.takenote_setting_list_one').eq(i).find('.xs_div_2 tbody tr').attr('settingid'),
                    goods_category: 2,
                    num: $('.tanceng .takenote_setting_list>.takenote_setting_list_one').eq(i).find('.xs_div_2 tbody tr').find('input.takenote_creata_setting_num').val(),
                    total_num: $('.tanceng .takenote_setting_list>.takenote_setting_list_one').eq(i).find('.xs_div_2 tbody tr').find('td').eq(4).text(),
                    piece: settingGoodsArr
                });
                takenoteToOutStockProduct.push({
                    product_id: $('.tanceng .takenote_setting_list>.takenote_setting_list_one').eq(i).find('.xs_div_2 tbody tr').attr('settingid'),
                    product_type_no: $('.tanceng .takenote_setting_list>.takenote_setting_list_one').eq(i).find('.xs_div_2 tbody tr').find('td').eq(1).text(),
                    product_type: 3,
                    output_num: $('.tanceng .takenote_setting_list>.takenote_setting_list_one').eq(i).find('.xs_div_2 tbody tr').find('input.takenote_creata_setting_num').val(),
                    product_type_name: $('.tanceng .takenote_setting_list>.takenote_setting_list_one').eq(i).find('.xs_div_2 tbody tr').find('td').eq(2).text(),
                    set_detail: takenoteToOutStock
                });
            });
        }
        if (productArr.length == 0) {
            alert('请选择商品');
            return false;
        }
        takenoteBorrowOutCreateData.product_info = arrayToJson(productArr);
        takenoteToOutStockData.product_info = arrayToJson(takenoteToOutStockProduct);
        //抄送人
        var copyList = '';
        if ($('.tanceng .takenote_create_add_copy_list li').length > 1) {
            $.each($('.tanceng .takenote_create_add_copy_list li:not(:last-of-type)'), function (i, v) {
                copyList += $('.tanceng .takenote_create_add_copy_list li').eq(i).attr('rid') + ',';
            });
            copyList = copyList.slice(0, copyList.length - 1);
        }
        takenoteBorrowOutCreateData.copy_flow = copyList;

        //推送出库信息
        takenoteToOutStockData.related_receipts_no = takenoteBorrowOutCreateData.code_sn;
        takenoteToOutStockData.related_business_name = $('.tanceng .takenote_create_sup_inp').val();
        takenoteToOutStockData.logistics_way = takenoteBorrowOutCreateData.logistics_way;
        takenoteToOutStockData.remark = takenoteBorrowOutCreateData.remark;
        takenoteToOutStockData.is_package_freight = takenoteBorrowOutCreateData.is_freight;
        takenoteToOutStockData.consignee = takenoteBorrowOutCreateData.contactor;
        takenoteToOutStockData.consignee_tel = takenoteBorrowOutCreateData.tel;
        takenoteToOutStockData.consignee_addr = takenoteBorrowOutCreateData.address;
        takenoteToOutStockData.output_time = takenoteBorrowOutCreateData.shipments_time;

        console.log(takenoteBorrowOutCreateData);
        console.log(takenoteToOutStockData);

        $.ajax({
            url: SERVER_URL + '/borrow-out/add',
            type: 'POST',
            data: takenoteBorrowOutCreateData,
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                if (oE.code == 0) {
                    takenoteToOutStockFn();
                    $('.tanceng .dialog_box').not('[name="takenote_jrgh_jrghtj"]').remove();
                    $('.tanceng .takenote_create_submit_btn').attr('name', 'takenote_jrgh_jrghtj');
                    $('.tanceng').append($('.dialog_box[name="takenote_jrgh_jrghtj"]').css('display', 'block'));
                    $('.tanceng .takenote_create_success_code').html(takenoteBorrowOutCreateData.code_sn);
                    jrgh_list_show_fn();
                }
            },
            error: function (e) {
                alert(e.msg);
                console.log(e);
            }
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
            },
            error: function (e) {
                alert(e.msg);
                console.log(e);
            }
        });
    }


});
