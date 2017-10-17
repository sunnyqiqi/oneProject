

/*物流*/
$(function(){
    var token=Admin.get_token();
    var username = localStorage.getItem("username");
    var powerUrls=localStorage.getItem("user_info_url");
    var company_admin=localStorage.getItem("company_admin");
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
                html += '<li class="left_1" deptid = "' + data["id"] + '">' + html_i_list_before + '<span class="icon_open change_ba"></span><span class="icon_file"></span><span class="list_msg">' + data['name'] + '</span></li>';
            }else{
                html += '<li class="left_1" deptid = "' + data["id"] + '">' + html_i_list_before + '<span class="change_ba"></span><span class="icon_file"></span><span class="list_msg">' + data['name'] + '</span></li>';
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
                html += '<li class="left_1" deptchosenid = "' + data["id"] + '" data-name="' + data["name"] + '">' + html_i_list_before + '<span class="icon_open change_ba"></span><span class="icon_file"></span><span class="list_msg">' + data['name'] + '</span></li>';
            }else{
                html += '<li class="left_1" deptchosenid = "' + data["id"] + '" data-name="' + data["name"] + '">' + html_i_list_before + '<span class="change_ba"></span><span class="icon_file"></span><span class="list_msg">' + data['name'] + '</span></li>';
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
                html += '<li class="left_2 person_left_nav li_person" userinfoid="' + data2['id'] + '" data-name="' + data2["name"] + '">' + html_i_list_before + '<span class="list_msg">' + data2['name'] + ' </span> </li>'
            });
            html += '</ul>';
            html += '</ul>';
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
                html+='<li class="left_1" deptchosenid = "' + data_list["id"] + '" data-name="' + data_list["name"] + '"><i class="list_before_span"></i><span class="icon_open"></span><span class="icon_file"></span><span class="list_msg">' + data_list['name'] + '</span></li>'
            }else{
                html+='<li class="left_1" deptchosenid = "' + data_list["id"] + '" data-name="' + data_list["name"] + '"><i class="list_before_span"></i><span class="icon_file"></span><span class="list_msg">' + data_list['name'] + '</span></li>'
            }

            if(data_list['children'] && data_list['children'].length>0){
                bm_count+=data_list['children'].length;
                $.each(data_list['children'],function(v,bmlist){
                    html += '<ul class="ul2">';
                    if(bmlist['children'].length>0 || bmlist['user_info'].length>0){
                        html+='<li class="left_1" deptchosenid = "' + bmlist["id"] + '" data-name="' + data_list["name"] + '"><i class="list_before_span"></i><i class="list_before_span"></i><span class="icon_open"></span><span class="icon_file"></span><span class="list_msg">' + bmlist['name'] + '</span></li>'
                    }else{
                        html+='<li class="left_1" deptchosenid = "' + bmlist["id"] + '" data-name="' + data_list["name"] + '"><i class="list_before_span"></i><i class="list_before_span"></i><span class="icon_file"></span><span class="list_msg">' + bmlist['name'] + '</span></li>'
                    }

                    if(bmlist['children'] && bmlist['children'].length>0){
                        bm_count+=bmlist['children'].length;
                        $.each(bmlist['children'],function(i,last_list){

                            html += '<ul class="ul1">';
                            if(last_list['children'].length>0 || last_list['user_info'].length>0){
                                html+='<li class="left_1" deptchosenid = "' + last_list["id"] + '" data-name="' + data_list["name"] + '"><i class="list_before_span"></i><i class="list_before_span"></i><i class="list_before_span"></i><span class="icon_open"></span><span class="icon_file"></span><span class="list_msg">' + last_list['name'] + '</span></li>'
                            }else{
                                html+='<li class="left_1" deptchosenid = "' + last_list["id"] + '" data-name="' + data_list["name"] + '"><i class="list_before_span"></i><i class="list_before_span"></i><i class="list_before_span"></i> <span class="icon_file"></span><span class="list_msg">' + last_list['name'] + '</span></li>'
                            }

                            html += '</ul>'
                        })

                    }
                    html += '<ul class="ul3">'
                    if(bmlist['user_info'] && bmlist['user_info'].length>0) {
                        $.each(bmlist['user_info'], function (index3, data3) {
                            if(data3['is_director']==1){
                                //html += '<li class="hr_left_bmyg2" manid="' + data3['id'] + '"> <span>' + data3['name'] + '</span>(主管)</li>';
                                html+='<li class="left_2 person_left_nav" userinfoid="' + data3['id'] + '" data-name="' + data3["name"] + '"><i class="list_before_span"></i><i class="list_before_span"></i><i class="list_before_span"></i><span class="list_msg">' + data3['name'] + ' </span>(主管)</li>'
                            }else{
                                //html += '<li class="hr_left_bmyg2" manid="' + data3['id'] + '"> <span>' + data3['name'] + '</span></li>';
                                html+='<li class="left_2 person_left_nav" userinfoid="' + data3['id'] + '" data-name="' + data3["name"] + '"><i class="list_before_span"></i><i class="list_before_span"></i><i class="list_before_span"></i><span class="list_msg">' + data3['name'] + ' </span></li>'
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
                        html+='<li class="left_2 person_left_nav" userinfoid="' + data2['id'] + '" data-name="' + data2["name"] + '"><i class="list_before_span"></i><i class="list_before_span"></i><span class="list_msg">' + data2['name'] + ' </span>(主管)</li>'
                    }else{
                        //html += '<li class="hr_left_bmyg2" manid="' + data2['id'] + '"> <span>' + data2['name'] + '</span></li>'
                        html+='<li class="left_2 person_left_nav" userinfoid="' + data2['id'] + '" data-name="' + data2["name"] + '"><i class="list_before_span"></i><i class="list_before_span"></i><span class="list_msg">' + data2['name'] + ' </span></li>'
                    }

                })
            }

            html += '</ul>'
            html += '</ul>'

        })
        html+='<ul class="ul1">'
        $.each(datalist['list'],function(r,vlist){
            //html += '<li class="hr_left_bmyg2" manid="' + vlist['id'] + '"> <span>' + vlist['name'] + ' </span></li>'
            html+='<li class="left_2 person_left_nav" userinfoid="' + vlist['id'] + '" data-name="' + vlist["name"] + '"><i class="list_before_span"></i><span class="list_msg">' + vlist['name'] + ' </span></li>'

        })
        html+='</ul>'
        datalist['bm_count']=bm_count;
        return html;
    }
    // 选择查看项
    // 定义查看项
    var venCustomLookAbledField = [
        // {'index': null, 'field': '序号'},
        // {'index': null, 'field': '物流编号'},
        // {'index': null, 'field': '物流单号'},
        // {'index': null, 'field': '物流公司'},
        // {'index': null, 'field': '相关关联出库单'},
        // {'index': null, 'field': '物流方式'},
        // {'index': null, 'field': '状态'},
        // {'index': null, 'field': '物流金额(元)'},
        {'index': null, 'field': '发货时间'},
        {'index': null, 'field': '预计到货时间'},
        {'index': null, 'field': '创建人'},
        {'index': null, 'field': '创建日期'},
        {'index': null, 'field': '负责人'},
        {'index': null, 'field': '备注'},
        {'index': null, 'field': '操作'}
    ];
    likShow('.zcj_wl_table_content_info', venCustomLookAbledField, '.zcj_select_wl_check_head', '.zcj_wl_bc_head_save_btn', '.zcj_hfmr_head_wl_btn');
    //	补零函数
    function repair(x) {
        return x < 10 ? '0' + x : x
    }
    /*删除按钮方法*/
    function delbtn(odv){
        $(odv).parent().parent().parent().remove();
        var num = $('.tanceng').children(".dialog_box").length;
        if(num < 1 ){
            $(".tanceng").hide();
        };
    }
    /*刷新*/
   /* $(".zcj_wl_refresh_ym").die().live("click",function () {
        add_Rload_index(101,9);
    });*/

    /*手机号*/
    function checkMobile(str) {
        var re = /^1[3|4|5|7|8][0-9]\d{8}$/;
        if (re.test(str)) {
            return true;
        } else {
            alert("您的手机号输入格式不正确");
        }
    }
    /*数字字母*/
    function checkNumber(str){
        var num=/^[0-9a-zA-Z]*$/g;
        if (num.test(str)) {
            return true;
        } else {
            alert("请输入数字或字母");
        }
    }
            /*钱数*/
        function checkprice(str) {
            var re = /^d*(?:.d{0,2})?$/;
            if (re.test(str)) {
                return true;
            } else {
                alert("请输入正确的钱数");
            }
        }

    var power=JSON.parse(powerUrls);
        console.log(power);
    var check_btn='logistics/infobyid';
    //onkeyup="value=value.replace(/[^\d]/g,'')"只能输入数字
    /*8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888*/
    /*物流列表*/
    var log_data={
        token:token,
        page:1,              //页数 （可选）
        num:10,             //每页条数（可选）
        status: '',             //1未到货2已到货（可选）
        key:'',                 //关键字（物流编号）（可选）
        document_marker: '',          //1 制单人（创建人）（可选）
        principal:   '',              //3 负责人（可选）
        way:   '',                 //1 物流方式 1.快递 2.陆运 3.空运 4.平邮 5.海运
        order_by: '',     //（可选）排序字段
        order_sort:  '',           //0 排序标识 （默认为0）0 顺序 1 倒序
        delivery_time:'',              //1发货时间（可选）
        predict_delivery_time:  '' ,        // 1预计到货时间（可选）
        logistics_company_id:  '',       //1物流公司（可选）
        create_time:     '',               //1 创建时间（可选）
        delivery_type:  ''                 //1发货类型（可选）1、销售单 2、采购退换3、调拨单据 4、借出单5、借入归还
    }
    function logistics_list() {
        $.ajax({
            type: 'get',
            url: SERVER_URL + "/logistics/list",
            data:log_data,
            dataType: "json",
            success:function(data){
                console.log('200');
                console.log(data);
                console.log('200');
                if(data['dataList'].length>0){
                    $('.zcj_wl_no_data_show').hide();
                    $(".zcj_wl_content_check_fy_page").show();
                    $(".zcj_wl_tj_je_num").show();
                }else{
                    $('.zcj_wl_no_data_show').show();
                    $(".zcj_wl_content_check_fy_page").hide();
                    $(".zcj_wl_tj_je_num").hide();
                }

                // $(".zcj_wl_list_content_show .table_total").siblings().empty();
                if(data.code==0){
                   var html=" ";
                   var p_sort="";
                $.each(data.dataList,function (index,datainfo) {
                    p_sort = repair(index + 1);
                    html += '<tr>';
                    html += '<td>'+p_sort+'</td>';
                    html += '<td>'+likNullData(datainfo.number)+'</td>';
                    html += '<td>'+likNullData(datainfo.sn)+'</td>';
                    html += '<td>'+likNullData(datainfo.logistics_company_id)+'</td>';
                    html += '<td>'+likNullData(datainfo['relevant_documents'])+'</td>';
                    html += '<td>'+likNullData(datainfo['stock_out_number'])+'</td>';
                    html += '<td>'+likNullData(datainfo['related_business_name'])+'</td>';
                    if(datainfo.way==1){
                        html += '<td>快递</td>';
                    }else if(datainfo.way==2){
                        html += '<td>陆运</td>';
                    }else if(datainfo.way==3){
                        html += '<td>空运</td>';
                    }else if(datainfo.way==4){
                        html += '<td>平邮</td>';
                    }else if(datainfo.way==5){
                        html += '<td>海运</td>';
                    }
                    // if(datainfo.status==1){
                    //     html += '<td class="c_r">未到货</td>';
                    // }else{
                    //     html += '<td class="c_g">已到货</td>';
                    // }

                    html += '<td class="zj_price_num_val">'+likNullData(datainfo.money)+'</td>';
                    html += '<td>'+likNullData(datainfo.delivery_time)+'</td>';
                    html += '<td>'+likNullData(datainfo.predict_delivery_time)+'</td>';
                    html += '<td>'+likNullData(datainfo.document_marker)+'</td>';
                    html += '<td>'+likNullData(datainfo.create_time)+'</td>';
                    html += '<td>'+likNullData(datainfo.principal)+'</td>';
                    html += '<td>'+likNullData(datainfo.description)+'</td>';
                    if(datainfo['stock_out_number']!='' || datainfo['related_business_name']!=''){

                        html += '<td> <button class="but_mix but_look r_sidebar_btn zcj_wl_xq_check_btn" name="logistics_ck" checkid="'+datainfo.id+'">查看</button> <button data-id="'+datainfo.id+'" class="but_mix but_grey1">编辑</button> <button class="but_mix but_grey1" delid="'+datainfo.id+'">删除</button> </td>';
                    }else{

                        html += '<td> <button class="but_mix but_look r_sidebar_btn zcj_wl_xq_check_btn" name="logistics_ck" checkid="'+datainfo.id+'">查看</button> <button class="but_mix but_exit val_dialog zcj_wl_xq_editor_but" data-id="'+datainfo.id+'" name="logistics_exit">编辑</button> <button class="but_mix but_r val_dialog zcj_wl_del_cz" name="wl_wl_delete" delid="'+datainfo.id+'">删除</button> </td>';
                    }

                    html += '</tr>';

                });

                    $(".zcj_wl_list_content_show").html(html);

                    var znum=data.totalcount;
                    var zpage=data.dataList.length;
                    $(".zcj_wl_search_num").text(znum)
                    list_table_render_pagination(".zcj_wl_content_check_fy_page",log_data,logistics_list,znum,zpage);
                    $(".zcj_wl_bc_head_save_btn").trigger('click');

                    /*合计多少钱*/
                    var price=0;

                    $(".zcj_wl_list_content_show .zj_price_num_val").each(function () {
                        price+=parseFloat($(this).text());
                    });

                    var z_price=price.toFixed(2)
                    $(".table_total .zj_wl_hj_znumber_num").text(parseFloat(z_price));
                    $(".zj_wl_head_zje_num").text(z_price);

                    // if(company_admin!=1){
                    //
                    //     /*人员查看*/
                    //     if($.inArray(check_btn,power)>-1){
                    //         $(".zcj_wl_xq_check_btn").show();
                    //
                    //     }else{
                    //         $(".zcj_wl_xq_check_btn").hide();
                    //
                    //     }
                    //
                    // }
                }else{
                    alert(data.msg);
                }
            },
            error:function(data){
                alert("服务器错误");
            }
        });
    }

    logistics_list();
    /*部门人员*/
    function bm_ry_list_fn() {
        $.ajax({
            type: 'get',
            url: SERVER_URL + "/dept/peoplecount",
            data: {
                token:token,
                jobstatus: '3' //0父id
            },
            dataType: "json",
            success: function (data) {
                console.log('12323');
                console.log(data);
                console.log('12323');
                if(data.code==0){
                    var html='';
                    $.each(data['rows'],function(index,ry_list){
                        html+='<li data-id="'+ry_list['id']+'">'+ry_list['name']+'</li>'
                    })
                    $(".zcj_create_person_list").html(html);
                    $(".zcj_fzr_person_list").html(html);
                }else{
                    alert(data.msg)
                }

            },
            error:function(data){
                alert('更新失败，请稍后再试');
            }
        });
    }
    bm_ry_list_fn();
    /*搜索功能*/
$(".zcj_wl_search_content_btn").die().live("click",function(){

    var search_name=$(".zcj_wl_input_val_search").val();
    if(search_name=='搜索物流编号/物流单号/相关关联出库单/物流公司'){
        log_data.key='';
    }else {
        log_data.key=search_name;
    }
   /* alert(search_name);*/

    log_data.page=1;
    logistics_list();
});
/*高级搜索功能*/
    /*$('.zcj_wl_sel_ul_li_val').bind(' input propertychange ',function(){
        $('#res').val(200);
    } );*/
    $('.zcj_wl_sel_ul_li_val ul li').die().live("click",function(){
        var fhid=$(this).attr("val");
        log_data.way=fhid;
        log_data.page=1;
        logistics_list();
    } );
    $(".zcj_wl_fs_zt_ss ul li").die().live("click",function(){
        var wlfsid=$(this).attr("val");
        log_data.status=wlfsid;
        log_data.page=1;
        logistics_list();
    });
    $('.zcj_create_person_list li').live('click',function(){
        var create=$(this).data('id');
        log_data.document_marker=create;
        log_data.page=1;
        logistics_list();
    } );
    $('.zcj_fzr_person_list li').live('click',function(){
        var fzr=$(this).data('id');
        log_data.principal=fzr;
        log_data.page=1;
        logistics_list();
    } );
/*不显示已到货功能*/
$(".zcj_wl_no_show_dh").die().live("click",function () {
    if($(this).is(":checked")){
        log_data.status=1;
        log_data.page=1;
        logistics_list();
    }else{
        log_data.status=0;
        log_data.page=1;
        logistics_list();
    }

});
/*选择部门*/
// $('.zcj_new_create_wl_content_info .zcj_select_bm_bt').die().live("click",function () {
//
//     $.ajax({
//         type: 'get',
//         url: SERVER_URL + "/dept/list",
//         data: {
//             token:token,
//             pid: 0 //0父id
//         },
//         dataType: "json",
//         success: function (data) {
//             if(data.code==0){
//
//                 var head='<li class="left_all"><span class="icon_open change_ba"></span><span class="icon_file"></span><span class="list_msg">所有分类(4)</span></li>';
//                 var deep=0;
//                 $(".zcj_wl_bn_sel_list_info").html(head+tree_list_choose_dept(data.rows, deep));
//
//             }else{
//                 alert(data.msg)
//             }
//
//         },
//         error:function(data){
//             alert('更新失败，请稍后再试');
//         }
//     });
//     $(".zcj_wl_bn_sel_list_info ul li").die().live("click",function () {
//          var bm_id=$(this).attr("deptid");
//          var wl_bm_name=$(this).find('.list_msg').text();
//          $(".zcj_wl_bm_end_but").die().live("click",function(){
//              $("#hid_wl_bm_id").val(bm_id);
//              $(".zcj_new_create_wl_content_info .zcj_wl_bm_name").val(wl_bm_name).css("color","#333");
//              $(this).next().click();
//          });
//
//     });
// });
    /*选择部门人*/
    $('.zcj_new_create_wl_content_info .zcj_select_fzr_bt').die().live("click",function () {

        $.ajax({
            type: 'get',
            url: SERVER_URL + "/dept/deptlist",
            data:{
                token:token

            },
            dataType: "json",
            success: function (data) {
                console.log('000')
                console.log(data)
                console.log('000')
                if(data.code==0){
                    var head='<li class="left_all"><span class="icon_open change_ba"></span><span class="icon_file"></span><span class="list_msg">所有分类</span></li>'
                    var deep=0;
                    $(".zcj_wl_bm_person_sel").html(head+tree_list_bmfzr(data));
                }else{
                    alert(data.msg);
                }

            },
            error:function(data){
                alert('更新失败，请稍后再试');
            }
        });
        /*选择负责人显示*/
        $(".tanceng .zcj_wl_bm_person_sel .person_left_nav").die().live("click",function(){
            var wlfzr_id=$(this).attr("userinfoid");            //负责人id
            var wlfzr_name=$(this).data('name');//负责人名字
            var wlbm_id=$(this).parent().prev('li').attr('deptchosenid');
            var wlbm_name=$(this).parent().prev('li').data('name');
            $(".zcj_wl_preson_end_but").die().live("click",function(){
                $("#hid_wl_fzr_id").val(wlfzr_id);
                $(".zcj_wl_fzr_name").val(wlfzr_name).css("color","#333");

                $("#hid_wl_bm_id").val(wlbm_id);
                $(".zcj_wl_bm_name").val(wlbm_name).css("color","#333");
                $(this).next().click();
            });
        });
    });

    $(".zcj_wl_create_man_name").text(username)
    /*收件人手机号*/
    $(".tanceng .zcj_wl_sjr_iphone").die().live("blur",function(){
        var ipone=$(this).val();
        checkMobile(ipone);
    });
    /*寄件人手机号*/
    $(".tanceng .zcj_wl_jj_moblie").die().live("blur",function(){
        var ipone=$(this).val();
        checkMobile(ipone);
    });
    /*快递单号*/
    $(".zcj_wl_kddh_val").die().live("blur",function(){
        var num=$(this).val()
        checkNumber(num)
    });
    /*钱数*/
    // $(".tanceng .zcj_wl_price").die().live("blur",function(){
    //     var pr=$(this).val();
    //     checkprice(pr);
    // });
    /*编辑*/
    /*收件人手机号*/
    $(".tanceng .zcj_wl_bj_sjr_moblie").die().live("blur",function(){
        var ipone=$(this).val();
        checkMobile(ipone);
    });
    /*寄件人手机号*/
    $(".tanceng .zcj_wl_bj_jjr_phone").die().live("blur",function(){
        var ipone=$(this).val();
        checkMobile(ipone);
    });
    /*快递单号*/
    $(".zcj_wl_bj_kddh").die().live("blur",function(){
        var num=$(this).val()
        checkNumber(num)
    });
    /*钱数*/
    // $(".tanceng .zcj_wl_bj_je").die().live("blur",function(){
    //     var pr=$(this).val();
    //     checkprice(pr);
    // });
    /*新建*/
    $(".zcj_newcrent_wl").die().live("click",function(){
        /*物流编号*/
        $.ajax({
            type: 'get',
            url: SERVER_URL + "/logistics/createnumber",
            data: {
                token: token
            },
            dataType: "json",
            success: function (data) {
                if (data.code == 0) {
                    console.log("0202026666666666666")
                    console.log(data)
                    $(".zcj_new_create_wl_content_info .zcj_wl_bh_num").val(data.data)

                }else {

                }
            }
        })
        /*物流公司名称*/
        $.ajax({
            type: 'get',
            url: SERVER_URL + "/logistics/getexpress",
            data: {
                token: token
            },
            dataType: "json",
            success: function (data) {
                if (data.code == 0) {
                    console.log("0202026666666666666")
                    console.log(data)
                    console.log("0202026666666666666")
                    var html=''
                    $.each(data['data'],function(index,wl_list){
                        html+='<li>'+wl_list['express']+'</li>'
                    })
                $(".tanceng .zcj_wl_kd_list_show_name").html(html)
                }else {

                }
            }
        })
    });
    /*新建物流 确认*/
$(".zcj_wl_new_create_btn").die().live("click",function () {
    var _this=this;
     var number=$(".zcj_new_create_wl_content_info .zcj_wl_bh_num").val();

    var sn;//快递单号
    if($(".zcj_new_create_wl_content_info .zcj_wl_kddh_val").val()=='请输入快递单号'){
        sn='';
    }else{
        sn=$(".zcj_new_create_wl_content_info .zcj_wl_kddh_val").val();
    }
   /* var relevant_documents=$(".zcj_new_create_wl_content_info .zcj_wl_bh_num").val();//物流单号*/
   var relevant_documents;//关联业务编号
    if($(".zcj_new_create_wl_content_info .zcj_wl_glyw_bh_num").val()=='请输入关联业务编号'){
        relevant_documents=''
    }else{
        relevant_documents =$(".zcj_new_create_wl_content_info .zcj_wl_glyw_bh_num").val();
    }
    var company=$(".zcj_new_create_wl_content_info .zcj_wl_gs_name").val();//物流公司

    var way=$(".zcj_new_create_wl_content_info .zcj_wl_fs_way").val();//物流方式 1.快递 2.陆运 3.空运 4.平邮 5.海运
        if(way=="快递"){
            way=1;
        }else if(way=="陆运"){
            way=2;
        }else if(way=="空运"){
            way=3;
        }else if(way=="平邮"){
            way=4;
        }else if(way=="海运"){
            way=5;
        }
    var money;//物流金额
        if($(".zcj_new_create_wl_content_info .zcj_wl_price").val()=='请输入物流金额'){
            money='';
        }else{
            money=$(".zcj_new_create_wl_content_info .zcj_wl_price").val();
        }
    var delivery_time;//发货时间
    if($(".zcj_new_create_wl_content_info .zcj_wl_time_val").val()=='请选择日期'){
        delivery_time='';
    }else{
        delivery_time=$(".zcj_new_create_wl_content_info .zcj_wl_time_val").val();
    }
    var predict_delivery_time;//预计到货时间
    if($(".zcj_new_create_wl_content_info .zcj_wl_dh_time").val()=='请选择日期'){
        predict_delivery_time='';
    }else{
        predict_delivery_time=$(".zcj_new_create_wl_content_info .zcj_wl_dh_time").val();
    }
    var document_marker=$(".tanceng .zcj_new_create_wl_content_info .zcj_wl_create_man_name").text();//制单人
   /* var department=$(".zcj_new_create_wl_content_info .zcj_wl_bm_name").val();//负责人部门
    var principal= $(".zcj_new_create_wl_content_info .zcj_wl_fzr_name").val();//负责人*/
    var department=$("#hid_wl_bm_id").val();//负责人部门
    var principal= $("#hid_wl_fzr_id").val();//负责人

    var description;//备注
    if($(".zcj_new_create_wl_content_info .zcj_wl_bz_sr").val()=='请输入备注'){
        description=''
    }else{
        description=$(".zcj_new_create_wl_content_info .zcj_wl_bz_sr").val();
    }

    var receiver;//收件人
    if($(".zcj_new_create_wl_content_info .zcj_wl_sjr_name").val()=='收件人姓名'){
        receiver='';
    }else{
        receiver=$(".zcj_new_create_wl_content_info .zcj_wl_sjr_name").val();
    }
    var receiver_phone;//收件人电话
    if($(".zcj_new_create_wl_content_info .zcj_wl_sjr_iphone").val()=='收件人电话'){
        receiver_phone='';
    }else{
        receiver_phone=$(".zcj_new_create_wl_content_info .zcj_wl_sjr_iphone").val();
    }
    var receiver_addr;//收件人地址
    if($(".zcj_new_create_wl_content_info .zcj_wl_sj_address").val()=='收件地址'){
        receiver_addr='';
    }else{
        receiver_addr=$(".zcj_new_create_wl_content_info .zcj_wl_sj_address").val()
    }

    var sender;//寄件人
    if($(".zcj_new_create_wl_content_info .zcj_wl_jj_man_name").val()=='请输入寄件人姓名'){
        sender='';
    }else{
        sender=$(".zcj_new_create_wl_content_info .zcj_wl_jj_man_name").val();
    }
    var sender_phone;//寄件人电话
    if($(".zcj_new_create_wl_content_info .zcj_wl_jj_moblie").val()=='请输入寄件人电话'){
        sender_phone=''
    }else{
        sender_phone=$(".zcj_new_create_wl_content_info .zcj_wl_jj_moblie").val();
    }
    var sender_addr;//寄件人地址
    if($(".zcj_new_create_wl_content_info .zcj_wl_jj_addre").val()=='请输入计件地址'){
        sender_addr='';
    }else{
        sender_addr=$(".zcj_new_create_wl_content_info .zcj_wl_jj_addre").val()
    }
    if(way==''){
    alert("请选择物流方式");
    }else if(delivery_time==''){
        alert("请输入发货时间");
    }else if(money==''){
        alert("请输入物流金额");
    }else if(department<=0 || department==''){
        alert("请选择负责部门");
    }else if(principal<=0 || principal==''){
        alert("请选择负责人");
    }else if(company==''){
        alert("请输入物流公司名称");
    }else if(sn==''){
        alert("请输入快递单号");
    }else if(receiver==''){
        alert("请输入收件人姓名");
    }else if(receiver_phone==''){
        alert("请输入收件人电话");
    }else if(receiver_addr==''){
        alert("请输入收件人地址");
    }else if(sender==''){
        alert("请输入寄件人姓名");
    }else if(sender_addr==''){
        alert("请输入寄件地址");
    }else{
        $.ajax({
            type: 'post',
            url: SERVER_URL + "/logistics/add",
            data:{
                token:token,
                sn:   sn,               //快递单号
                way: way,                    //物流方式 1.快递 2.陆运 3.空运 4.平邮 5.海运
                money: money,                    //物流金额
                number:number,                  //物流编号
                relevant_documents:relevant_documents,//关联业务编号
                delivery_time:  delivery_time,               //发货时间
                predict_delivery_time: predict_delivery_time,          //预计到货时间
                document_marker: document_marker,                //制单人*/
                department:   department,                 //负责人部门
                principal:   principal,                       //负责人
                logistics_company_id:company,
                receiver: receiver,                        //收件人
                receiver_phone: receiver_phone,              //收件人电话
                receiver_addr:  receiver_addr,                   //收件人地址
                sender:   sender,                         //寄件人
                sender_phone: sender_phone,                      //寄件人电话
                sender_addr:  sender_addr,                   //寄件人地址
                description:description,                   //备注
                delivery_type:0                         //发货类型

            },
            dataType: "json",
            success:function(data){

                console.log(data);

                if(data.code==0){
                    logistics_list();
                    delbtn(_this);
                }else{
                    alert(data.msg);
                }

            },
            error:function(data){
                alert('更新失败，请稍后再试');
            }
        });
    }

});
/*物流详情*/
$(".zcj_wl_xq_check_btn").die().live("click",function () {
    var check_this=this;
    var id=$(this).attr("checkid");
    $.ajax({
        type: 'get',
        url: SERVER_URL + "/logistics/infobyid",
        data:{
            token:token,
            id:id
        },
        dataType: "json",
        success: function (data) {
            if(data.code==0){
                console.log("020202")
                console.log(data)
                console.log("020202")
                if(data.data['related_business_name']=='' || data.data['stock_out_number']==''){
                    $(".zcj_check_edit_wl_info_btn").hide();
                }else{
                    $(".zcj_check_edit_wl_info_btn").show();
                }
                $(".zcj_wl_glyw_name_show").text(likNullData(data.data['related_business_name']));//相关联业务名称
                $(".zcj_wk_xq_cjr_name").text(likNullData(data.data['document_marker']));//创建人
                $(".wl_xq_cjrq_time").text(likNullData(data.data['create_time']));//创建日期
                $(".zcj_wl_info_check_xq_show p span:eq(0)").text(likNullData(data.data['number']));

                if(data.data['way']==1){
                    $(".zcj_wl_info_check_xq_show p span:eq(1)").text('快递')
                }else if(data.data['way']==2){
                    $(".zcj_wl_info_check_xq_show p span:eq(1)").text('陆运')
                }else if(data.data['way']==3){
                    $(".zcj_wl_info_check_xq_show p span:eq(1)").text('空运')
                }else if(data.data['way']==4){
                    $(".zcj_wl_info_check_xq_show p span:eq(1)").text('平邮')
                }else if(data.data['way']==5){
                    $(".zcj_wl_info_check_xq_show p span:eq(1)").text('海运')
                }
                $(".zcj_wl_info_check_xq_show p span:eq(2)").text(likNullData(data.data['relevant_documents']));
                $(".zcj_wl_info_check_xq_show p span:eq(3)").text(likNullData(data.data['delivery_time']));
                $(".zcj_wl_info_check_xq_show p span:eq(4)").text(likNullData(data.data['predict_delivery_time']));
                $(".zcj_wl_info_check_xq_show p span:eq(5)").text(likNullData(data.data['money']));
                $(".zcj_wl_info_check_xq_show p span:eq(6)").text(likNullData(data.data['principal']));
                $(".zcj_wl_info_check_xq_show p span:eq(7)").text(likNullData(data.data['department']));
                $(".zcj_wl_info_check_xq_show p span:eq(8)").text(likNullData(data.data['logistics_company_id']));
                $(".zcj_wl_info_check_xq_show p span:eq(9)").text(likNullData(data.data['sn']));
                $(".zcj_wl_info_check_xq_show p span:eq(10)").text(likNullData(data.data['receiver']));
                $(".zcj_wl_info_check_xq_show p span:eq(11)").text(likNullData(data.data['receiver_phone']));
                $(".zcj_wl_info_check_xq_show p span:eq(12)").text(likNullData(data.data['receiver_addr']));
                $(".zcj_wl_info_check_xq_show p span:eq(13)").text(likNullData(data.data['sender']));
                $(".zcj_wl_info_check_xq_show p span:eq(14)").text(likNullData(data.data['sender_phone']));
                $(".zcj_wl_info_check_xq_show p span:eq(15)").text(likNullData(data.data['sender_addr']));
                $(".zcj_wl_info_check_xq_show p span:eq(16)").text(likNullData(data.data['description']));

            }else{
                alert(data.msg);
            }

        },
        error:function(data){
            alert(data);
        }
        /*查看编辑*/

    });

    $(".zcj_check_edit_wl_info_btn").die().live("click",function(){
        // $(".zcj_wl_table_content_info .zcj_wl_list_content_show tr").find('.zcj_wl_xq_editor_but').data('id').click();


        $(check_this).parent('td').find('.zcj_wl_xq_editor_but').click();
    });
});

/*物流编辑*/
$(".zcj_wl_xq_editor_but").die().live("click",function () {
    /*选择部门*/
    // $('.zcj_wl_bj_edit_content .zcj_wlbj_select_bm').die().live("click",function () {
    //
    //     $.ajax({
    //         type: 'get',
    //         url: SERVER_URL + "/dept/list",
    //         data: {
    //             token:token,
    //             pid: 0 //0父id
    //         },
    //         dataType: "json",
    //         success: function (data) {
    //             if(data.code==0){
    //
    //                 var head='<li class="left_all"><span class="icon_open change_ba"></span><span class="icon_file"></span><span class="list_msg">所有分类(4)</span></li>';
    //                 var deep=0;
    //                 $(".zcj_wl_bn_sel_list_info").html(head+tree_list_choose_dept(data.rows, deep));
    //
    //             }else{
    //                 alert(data.msg)
    //             }
    //
    //         },
    //         error:function(data){
    //             alert(data);
    //         }
    //     });
    //     $(".zcj_wl_bn_sel_list_info ul li").die().live("click",function () {
    //         var bm_id=$(this).attr("deptid");
    //         var wl_bm_name=$(this).find('.list_msg').text();
    //         $(".zcj_wl_bm_end_but").die().live("click",function(){
    //             $("#hid_wl_edit_bm_id").val(bm_id);
    //             $(".zcj_wl_bj_edit_content .zcj_wl_bj_fzbm").val(wl_bm_name).css("color","#333");
    //             $(this).next().click();
    //         });
    //
    //     });
    // });
    /*选择部门人*/
    $('.zcj_wl_bj_edit_content .zcj_wlbj_select_fzr').die().live("click",function () {

        $.ajax({
            type: 'get',
            url: SERVER_URL + "/dept/deptlist",
            data:{
                token:token

            },
            dataType: "json",
            success: function (data) {
                if(data.code==0){
                    var head='<li class="left_all"><span class="icon_open change_ba"></span><span class="icon_file"></span><span class="list_msg">所有分类(4)</span></li>'
                    var deep=0;
                    $(".zcj_wl_bm_person_sel").html(head+tree_list_bmfzr(data));
                }else{
                    alert(data.msg);
                }

            },
            error:function(data){
                alert(data);
            }
        });
        /*选择负责人显示*/
        $(".zcj_wl_bm_person_sel .person_left_nav").die().live("click",function(){
            var wlfzr_id=$(this).attr("userinfoid"); //负责人
            var wlfzr_name=$(this).children(".list_msg").text();

            var wlbm_id=$(this).parent().prev('li').attr('deptchosenid');//部门
            var wlbm_name=$(this).parent().prev('li').data('name');
            $(".zcj_wl_preson_end_but").die().live("click",function(){
                $("#hid_wl_edit_fzr_id").val(wlfzr_id);
                $(".zcj_wl_bj_edit_content .zcj_wl_bj_fzr").val(wlfzr_name).css("color","#333");

                $("#hid_wl_edit_bm_id").val(wlbm_id);
                $(".zcj_wl_bj_fzbm").val(wlbm_name).css("color","#333");
                $(this).next().click();
            });
        });
    });
    var id=$(this).data("id");
    $.ajax({
        type: 'get',
        url: SERVER_URL + "/logistics/infobyid",
        data:{
            token:token,
            id:id
        },
        dataType: "json",
        success: function (data) {
            if(data.code==0){
                console.log("020202")
                console.log(data)
                console.log("020202")
                $(".zcj_wl_bj_cjr_name").text(data.data.document_marker);//创建人
                $(".zcj_wl_bj_cjrq_data").text(data.data.create_time);//创建日期
                $(".zcj_wl_bj_edit_content .zcj_wl_bj_wlbh").val(data.data.number);//物流编号
                $(".zcj_wl_bj_edit_content .zcj_wl_glyw_bj_num").val(data.data['relevant_documents']);                                                              //关联业务编号
                if(data.data.way==1){
                    $(".zcj_wl_bj_edit_content .zcj_wl_bj_wlfs").val("快递");//物流方式
                }else if(data.data.way==2){
                    $(".zcj_wl_bj_edit_content .zcj_wl_bj_wlfs").val("陆运");//物流方式
                }else if(data.data.way==3){
                    $(".zcj_wl_bj_edit_content .zcj_wl_bj_wlfs").val("空运");//物流方式
                }else if(data.data.way==4){
                    $(".zcj_wl_bj_edit_content .zcj_wl_bj_wlfs").val("平邮");//物流方式
                }else if(data.data.way==5){
                    $(".zcj_wl_bj_edit_content .zcj_wl_bj_wlfs").val("海运");//物流方式
                }
                $(".zcj_wl_bj_edit_content .zcj_wl_bj_fh_time").val(data.data.delivery_time);//发货时间
                $(".zcj_wl_bj_edit_content .zcj_wl_bj_yjdh_time").val(data.data.predict_delivery_time);//预计到货时间
                $(".zcj_wl_bj_edit_content .zcj_wl_bj_je").val(data.data.money);//物流金额(元)
                $(".zcj_wl_bj_edit_content .zcj_wl_bj_fzbm").val(data.data.department);//负责部门
                $("#hid_wl_edit_bm_id").val(data.data.department_id);//部门id
                $(".zcj_wl_bj_edit_content .zcj_wl_bj_fzr").val(data.data.principal);//负责人
                $("#hid_wl_edit_fzr_id").val(data.data.principal_id);//负责人id
                $(".zcj_wl_bj_edit_content .zcj_wl_bj_wlgs").val(data.data.logistics_company_id);//物流公司
                $(".zcj_wl_bj_edit_content .zcj_wl_bj_kddh").val(data.data.sn);//快递单号
                $(".zcj_wl_bj_edit_content .zcj_wl_bj_sjr_name").val(data.data.receiver);//收件人
                $(".zcj_wl_bj_edit_content .zcj_wl_bj_sjr_moblie").val(data.data.receiver_phone);//收件人电话
                $(".zcj_wl_bj_edit_content .zcj_wl_bj_sjdz").val(data.data.receiver_addr);//收件人地址
                $(".zcj_wl_bj_edit_content .zcj_wl_bj_jjr_name").val(data.data.sender);//寄件人
                $(".zcj_wl_bj_edit_content .zcj_wl_bj_jjr_phone").val(data.data.sender_phone);//寄件人电话
                $(".zcj_wl_bj_edit_content .zcj_wl_bj_jjdz_addre").val(data.data.sender_addr);//寄件人地址
                $(".zcj_wl_bj_edit_content .zcj_wl_bj_beizhu").html(data.data.description);//备注

            }else{
                alert(data.msg);
            }

        },
        error:function(data){
            alert(data);

        }
    });
    /*确认编辑*/
    $(".zcj_wl_bj_lr_end").die().live("click",function () {
            var _this=this;
         var number=$(".zcj_wl_bj_edit_content .zcj_wl_bj_wlbh").val();//物流编号*/
        var way=$(".zcj_wl_bj_edit_content .zcj_wl_bj_wlfs").val();//物流方式

        var relevant_documents;//关联业务编号
        if($(".zcj_new_create_wl_content_info .zcj_wl_glyw_bj_num").val()=='请输入关联业务编号'){
            relevant_documents=''
        }else{
            relevant_documents =$(".zcj_new_create_wl_content_info .zcj_wl_glyw_bj_num").val();
        }
        if(way=="快递"){
            way=1;
        }else if(way=="陆运"){
            way=2;
        }else if(way=="空运"){
            way=3;
        }else if(way=="平邮"){
            way=4;
        }else if(way=="海运"){
            way=5;
        }

        var company=$(".zcj_wl_bj_edit_content .zcj_wl_bj_wlgs").val();//物流公司
        var sn=$(".zcj_wl_bj_edit_content .zcj_wl_bj_kddh").val();//快递单号

        var money;//物流金额
        if($(".zcj_wl_bj_edit_content .zcj_wl_bj_je").val()=='请输入物流金额'){
            money='';
        }else{
            money=$(".zcj_wl_bj_edit_content .zcj_wl_bj_je").val();
        }
        var delivery_time;//发货时间
        if($(".zcj_wl_bj_edit_content .zcj_wl_bj_fh_time").val()=='请选择日期'){
            delivery_time='';
        }else{
            delivery_time=$(".zcj_wl_bj_edit_content .zcj_wl_bj_fh_time").val();
        }
        var predict_delivery_time;//预计到货时间
        if($(".zcj_wl_bj_edit_content .zcj_wl_bj_yjdh_time").val()=='请选择日期'){
            predict_delivery_time='';
        }else{
            predict_delivery_time=$(".zcj_wl_bj_edit_content .zcj_wl_bj_yjdh_time").val();
        }
        //var document_marker=$(".zcj_new_create_wl_content_info .zcj_wl_create_man_name").val();//制单人
        /* var department=$(".zcj_new_create_wl_content_info .zcj_wl_bm_name").val();//负责人部门
         var principal= $(".zcj_new_create_wl_content_info .zcj_wl_fzr_name").val();//负责人*/
        var department=$("#hid_wl_edit_bm_id").val();//负责部门
        var principal=$("#hid_wl_edit_fzr_id").val();//负责人

        var description=$(".zcj_wl_bj_edit_content .zcj_wl_bj_beizhu").val();//备注

        var receiver;//收件人
        if($(".zcj_wl_bj_edit_content .zcj_wl_bj_sjr_name").val()=='收件人姓名'){
            receiver='';
        }else{
            receiver=$(".zcj_wl_bj_edit_content .zcj_wl_bj_sjr_name").val();
        }
        var receiver_phone;//收件人电话
        if($(".zcj_wl_bj_edit_content .zcj_wl_bj_sjr_moblie").val()=='收件人电话'){
            receiver_phone='';
        }else{
            receiver_phone=$(".zcj_wl_bj_edit_content .zcj_wl_bj_sjr_moblie").val();
        }
        var receiver_addr;//收件人地址
        if($(".zcj_wl_bj_edit_content .zcj_wl_bj_sjdz").val()=='收件地址'){
            receiver_addr='';
        }else{
            receiver_addr=$(".zcj_wl_bj_edit_content .zcj_wl_bj_sjdz").val();
        }

        var sender;//寄件人
        if($(".zcj_wl_bj_edit_content .zcj_wl_bj_jjr_name").val()=='请输入寄件人姓名'){
            sender='';
        }else{
            sender=$(".zcj_wl_bj_edit_content .zcj_wl_bj_jjr_name").val();
        }
        var sender_phone;//寄件人电话
        if($(".zcj_wl_bj_edit_content .zcj_wl_bj_jjr_phone").val()=='请输入寄件人电话'){
            sender_phone=''
        }else{
            sender_phone=$(".zcj_wl_bj_edit_content .zcj_wl_bj_jjr_phone").val();
        }
        var sender_addr;//寄件人地址
        if($(".zcj_wl_bj_edit_content .zcj_wl_bj_jjdz_addre").val()=='请输入计件地址'){
            sender_addr='';
        }else{
            sender_addr=$(".zcj_wl_bj_edit_content .zcj_wl_bj_jjdz_addre").val();
        }
        if(way==''){
            alert("请选择物流方式");
        }else if(delivery_time==''){
            alert("请输入发货时间");
        }else if(money==''){
            alert("请输入物流金额");
        }else if(department<=0 || department==''){
            alert("请选择负责部门");
        }else if(principal<=0 || principal==''){
            alert("请选择负责人");
        }else if(company==''){
            alert("请输入物流公司名称");
        }else if(sn==''){
            alert("请输入快递单号");
        }else if(receiver==''){
            alert("请输入收件人姓名");
        }else if(receiver_phone==''){
            alert("请输入收件人电话");
        }else if(receiver_addr==''){
            alert("请输入收件人地址");
        }else if(sender==''){
            alert("请输入寄件人姓名");
        }else if(sender_addr==''){
            alert("请输入寄件地址");
        }else{
            $.ajax({
                type: 'post',
                url: SERVER_URL + "/logistics/add",
                data:{
                    token:token,
                    id:id,             //（修改时需要传送）
                    sn: sn,                //快递单号
                    number:number,
                    relevant_documents:relevant_documents,//关联业务编号
                    logistics_company_id:company,  //物流公司
                    way: way,                         //物流方式 1.快递 2.陆运 3.空运 4.平邮 5.海运
                    money:money,                 //物流金额
                    delivery_time: delivery_time,          //发货时间
                    predict_delivery_time:predict_delivery_time,   //预计到货时间
                    department: department,                     //负责人部门
                    principal: principal,                    //负责人
                    description: description,                       //备注*/
                    receiver: receiver,                   //收件人
                    receiver_phone: receiver_phone,              //收件人电话
                    receiver_addr:receiver_addr,               //收件人地址
                    sender: sender,                     //寄件人
                    sender_phone: sender_phone,                //寄件人电话
                    sender_addr:sender_addr,               //寄件人地址

                    delivery_type:0

                },
                dataType: "json",
                success: function (data) {
                    console.log("1002")
                    console.log(data)
                    console.log("1002")
                   if(data.code==0){
                       logistics_list();
                       delbtn(_this);
                    }else{
                        alert(data.msg);
                    }

                },
                error:function(data){
                    alert('更新失败，请稍后再试');
                }
            });
        }

    });
});
/*删除*/
$(".zcj_wl_del_cz").die().live("click",function(){
   var delid=$(this).attr("delid");
   $('.zcj_delete_anniu_del').die().live("click",function () {
       $.ajax({
        type: 'get',
        url: SERVER_URL + "/logistics/del",
        data:{
        token:token,
        id:delid
        },
        dataType: "json",
        success: function (data) {
        console.log(data);
            if(data.code==0){
                logistics_list();
            alert("删除成功");
            }else{
            alert(data.msg);
            }

        },
        error:function(data){
            alert('更新失败，请稍后再试');
        }
        });
   });

});
/*点击刷新*/
$(".zcj_wl_refresh_ym").die().live("click",function () {
    add_Rload_index(101,11);
   /* logistics_list();*/
});
/*物流编号*/

});
