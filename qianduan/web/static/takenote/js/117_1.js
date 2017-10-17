/*借出归还*/
$(function(){
    var token=Admin.get_token();
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
    var company_id=localStorage.getItem("usercompany_id");
    var uid=localStorage.getItem("uid");

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

    /*截取时间*/
    function subTime(time){
        var newtime = time.substr(0,10);
        return newtime;
    }
    // 选择查看项
    // 定义查看项
    var venCustomLookAbledField = [
        {'index': null, 'field': '入库状态'},
        {'index': null, 'field': '创建日期'},
        {'index': null, 'field': '备注'}
    ];
    likShow('.sq_jcgh_table', venCustomLookAbledField, '.sq_jcgh_look_field_ul', '.sq_jcgh_look_field_save', '.sq_jcgh_look_field_reset');
    var uname = loginUserInfo.username;
    var powerUrls=localStorage.getItem("user_info_url");
    var company_admin=localStorage.getItem("company_admin");
    var power=JSON.parse(powerUrls);

    var add_jcgh="lend-out/add";//新建
    //var zf_jrd="borrow/invalid";//作废
    if(company_admin!=1) {
        if ($.inArray(add_jcgh, power) > -1) {
            $(".takenote_jcgh_create_btn").show();

        } else {
            $(".takenote_jcgh_create_btn").hide();
            $(".contenthead .right").css('width','60px')
        }

    }
    //借出归还列表
    //定义借出归还列表
    var takenoteLendOutData ={
        token:token,
        key:'',//借出归还编号/借出编号/客户名称
        page:1,//当前页
        num:10,// 每页条数
        uid:'',//下单人
        copy_flow:'',//抄送人
        lend_id:'',//借出单ID
        lend_code_sn:'',//借出单编号
        code_sn:'',//借入归还编号
        is_invalid:1,
        order_by:'create_time',//排序字段 如：下单人（uid）
        order_sort:1//排序顺序 0 顺序 1 倒序
    };


//********************列表***************************************************************************
    //我发起的借出归还
   // takenoteLendOutListFn();
    //我发起的借出归还
    $('#takenote_jcgh_myList').die('click').live('click',function(){
        //alert(111);
        takenoteLendOutData.copy_flow ='';
        takenoteLendOutListFn();
    });
    $('#takenote_jcgh_myList').trigger('click');
    //抄送我的
    $('#takenote_jcgh_csList').die('click').live('click',function(){
        takenoteLendOutData.copy_flow =uid;
        takenoteLendOutListFn();
    });
    //获取借出归还列表
    function takenoteLendOutListFn(){
        $.ajax({
            url:SERVER_URL +'/lend-out/list',
            type:'GET',
            data:takenoteLendOutData,
            dataType:'json',
            success:function(oE){
                //搜索结果
                $("#takenote_jcgh_totalcount").html(oE.totalcount);
                console.log(oE);
                if(oE.code == 0){
                    var datalist = oE.dataList;
                    if(datalist.length == 0){
                        $('.page_117_nodata').removeClass('none');
                        $('.page_117_nodata_handler').addClass('none');
                    }else{
                        $('.page_117_nodata').addClass('none');
                        $('.page_117_nodata_handler').removeClass('none');
                    }
                    //字符串拼接
                    var LendOutListHtml = '';
                    $.each(datalist,function(i,v){
                        //作废
                        var  voidStatus = '',
                            voidStatusClass = '',
                            voidStatusBtn = '';
                        if(v['is_invalid'] ==1){
                            voidStatus = l_dbl(i + 1);
                            voidStatusClass = '';
                            voidStatusBtn = '<button class="but_mix but_r but_void takenote_jcgh_invalid_btn">作废</button>';
                        }else if(v['is_invalid'] ==2){
                            voidStatus = '<span class="voidIcon">作废</span>';
                            voidStatusClass = 'grey';
                            voidStatusBtn = '';
                        };
                        //入库状态
                        var inputStatus = '';
                        if(v['input_status'] == 1){
                            inputStatus = '待入库';
                            inputStatusClass = 'c_r';
                        }else if(v['input_status'] == 2){
                            inputStatus = '部分入库';
                            inputStatusClass = 'c_y';
                        }else if(v['input_status'] == 3){
                            inputStatus = '完成入库';
                            inputStatusClass = 'c_g';
                        };
                        //按钮
                        var takenoteBtn='';
                        if(takenoteLendOutData.copy_flow ==''){
                            takenoteBtn='<button class="but_mix r_sidebar_btn page_117_look_btn" name="takenote_ghd_jcgh_ck">查看</button>'+voidStatusBtn+'';
                        }else if(takenoteLendOutData.copy_flow ==uid){
                            takenoteBtn='<button class="but_mix r_sidebar_btn page_117_look_btn" name="takenote_ghd_jcgh_ck">查看</button>';
                        }
                        LendOutListHtml +='<tr takejcghid="'+v['id']+'" class="'+voidStatusClass+'">\
                            <td>'+voidStatus+'</td>\
                            <td>' + likNullData(v['code_sn']) + '</td>\
                            <td>' + likNullData(v['lend_code_sn']) + '</td>\
                            <td>' + likNullData(v['customer_name']) + '</td>\
                            <td>' + likNullData(v['in_time'].split(' ')[0]) + '</td>\
                            <td class="'+inputStatusClass+'">' + inputStatus+'</td>\
                            <td>' + likNullData(v['create_time'].split(' ')[0]) + '</td>\
                            <td>' + likNullData(v['user_name']) + '</td>\
                            <td>' + likNullData(v['remark']) + '</td>\
                            <td>'+takenoteBtn+'</td>\
                            </tr>';
                    });
                    $('.takenote_jcgh_tbody').html(LendOutListHtml);
                    //分页
                    list_table_render_pagination('.takenote_jcgh_fenye', takenoteLendOutData, takenoteLendOutListFn, oE.totalcount, datalist.length);
                }
            },
            error:function(oE){
                console.log(oE);
            }
        });

    }

//搜索关键字
    $('.takenote_jcgh_search_btn').die('click').live('click',function(){
        if($('.takenote_jcgh_search_inp').val()=='借出归还编号/借出编号/客户名称'){
            takenoteLendOutData.key ='';
        }else{
            takenoteLendOutData.key =$('.takenote_jcgh_search_inp').val();
        }
        if($(".zj_jcgjh_header_ul_list .tabhover").text()=='我发起的'){
            takenoteLendOutData.copy_flow ='';
            takenoteLendOutData.page =1;
            takenoteLendOutListFn();
        }else{
            takenoteLendOutData.copy_flow =uid;
            takenoteLendOutData.page =1;
            takenoteLendOutListFn();
        }

    });
//刷新
    $('.takenote_jcgh_res').die('click').live('click',function(){
        takenoteLendOutData ={
            token:token,
            key:'',//借出归还编号/借出编号/客户名称
            page:1,//当前页
            num:'',// 每页条数
            uid:'',//下单人
            copy_flow:'',//抄送人
            lend_id:'',//借出单ID
            lend_code_sn:'',//借出单编号
            code_sn:'',//借入归还编号
            order_by:'create_time',//排序字段 如：下单人（uid）
            order_sort:1//排序顺序 0 顺序 1 倒序
        };
        $('.takenote_jcgh_search_inp').val('借出归还编号/借出编号/客户名称').css('color','#CCCCCC');
        $('.takenote_jcgh_search_num').val('10');
        $('.takenote_jcgh_list_no_show').attr('checked', 'checked');
        if($(".zj_jcgjh_header_ul_list .tabhover").text()=='我发起的'){
            takenoteLendOutData.copy_flow ='';
            //takenoteLendOutListFn();
        }else{
            takenoteLendOutData.copy_flow =uid;

        }
        takenoteLendOutListFn();

    });
//作废
    var takenoteJcghId = null;
    $('.takenote_jcgh_invalid_btn').die('click').live('click',function(){
        //alert(111);
        takenoteJcghId=$(this).closest('tr').attr('takejcghid');
        console.log(takenoteJcghId);
        $.ajax({
            url:SERVER_URL + '/lend-out/invalid',
            type:'GET',
            data:{
                token:token,
                id:takenoteJcghId
            },
            dataType:'json',
            success:function(oE){
                console.log(oE);
                if(oE.code == 0){
                    takenoteLendOutListFn();
                }else{
                    alert(oE.msg);
                }
            },
            error:function(oE){
                console.log(oE);
            }
        });
    });
    //不显示作废按钮
    $('.takenote_jcgh_list_no_show').die('click').live('click',function(){
        if($(this).is(':checked')){
            takenoteLendOutData.is_invalid =1;
        }else{
            takenoteLendOutData.is_invalid ='';
        }
        if($(".zj_jcgjh_header_ul_list .tabhover").text()=='我发起的'){
            takenoteLendOutData.copy_flow ='';

        }else{
            takenoteLendOutData.copy_flow =uid;
           // takenoteLendOutListFn();
        }
        takenoteLendOutData.page =1;
        takenoteLendOutListFn();
    });

//查看详情
    $('.page_117_look_btn').die('click').live('click',function(){
        takenoteJcghId=$(this).closest('tr').attr('takejcghid');

        $.ajax({
            url:SERVER_URL+'/lend-out/infobyid',
            type:'GET',
            data:{
                token:token,
                id:takenoteJcghId,
                detail:0
            },
            dataType:'json',
            success:function(oE){
                console.log(oE);
                if(oE.code == 0){
                    var data = oE.data;
                    console.log(data);
                    $(".zj_jcgh_show_kh_name_check").text(data['customer_name'])
                    //下单人
                    $('.takenote_jcgh_user_name').html(data['user_name']);
                    //创建日期
                    $('.takenote_jcgh_create_time').html(subTime(data['create_time']));
                    //借出归还单编号
                    $('.takenote_jcgh_code_sn').html(data['code_sn']);
                    //借出单编号
                    $('.takenote_jcgh_lend_code_sn').html(data['lend_code_sn']);
                    //客户
                    $('.takenote_jcgh_customer_name').html(data['customer_name']);
                    //入库日期
                    $('.takenote_jcgh_in_time').html(subTime(data['in_time']));
                    //备注
                    $('.takenote_jcgh_remark').html(data['remark']);
                    //抄送人

                    var c_name='';
                    $.each(data['copy_flow'],function (i,csr_name) {
                        c_name+=''+csr_name['name']+','
                    })
                    c_name = c_name.slice(0, c_name.length - 1);
                    $('.takenote_jcgh_copy_flow').html(c_name);
                    $('.ht_slid_list ul li:nth-of-type(2)').data('id',data['lend_id']);
                    $('.ht_slid_list ul li:nth-of-type(3)').data('code',data['code_sn'])
                }

            }

        });
        /*查看借出单*/
        $(".zj_jcgh_check_info_btn").die('click').live("click",function(){

            $.ajax({
                type: 'GET',
                url: SERVER_URL + "/lend-out/infobyid",
                data: {
                    token: token,
                    //company_id: company_id, //公司id
                    id: takenoteJcghId,// 用户id
                    detail:1
                },
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    $(".zj_jcgh_check_kh_head_name").text(data['data']['customer_name']);
                    $(".zj_jcgh_quote_look_create_at").text(subTime(data['data']['create_time']));
                    $(".zj_jcgh_quote_look_uname").text(data['data']['user_name']);
                    $(".zj_jrgh_check_zj_info .zj_goods").eq(0).text(data['data']['code_sn']);
                    $(".zj_jrgh_check_zj_info .zj_goods").eq(1).text(data['data']['lend_code_sn']);
                    $(".zj_jrgh_check_zj_info .zj_goods").eq(2).text(data['data']['customer_name']);
                    $(".zj_jrgh_check_zj_info .zj_goods").eq(3).text(subTime(data['data']['in_time']));


                    // if(data['data']['logistics_type']==1){
                    //     $(".zj_look_info_header_content .zj_jcd_bh_show_info").eq(4).text('快递');
                    // }else if(data['data']['logistics_type']==2){
                    //     $(".zj_look_info_header_content .zj_jcd_bh_show_info").eq(4).text('陆运');
                    // }else if(data['data']['logistics_type']==3){
                    //     $(".zj_look_info_header_content .zj_jcd_bh_show_info").eq(4).text('空运');
                    // }else if(data['data']['logistics_type']==4){
                    //     $(".zj_look_info_header_content .zj_jcd_bh_show_info").eq(4).text('海运');
                    // }else if(data['data']['logistics_type']==5){
                    //     $(".zj_look_info_header_content .zj_jcd_bh_show_info").eq(4).text('平邮');
                    // }
                    // if(data['data']['is_freight']==1){
                    //     $(".zj_look_info_header_content .zj_jcd_bh_show_info").eq(5).text('包运费');
                    // }else{
                    //     $(".zj_look_info_header_content .zj_jcd_bh_show_info").eq(5).text('不包');
                    // }
                    //
                    // $(".zj_look_info_header_content .zj_jcd_bh_show_info").eq(6).text(data['data']['receiver']);
                    // $(".zj_look_info_header_content .zj_jcd_bh_show_info").eq(7).text(data['data']['mobile']);
                    // $(".zj_look_info_header_content .zj_jcd_bh_show_info").eq(8).text(data['data']['address']);
                    // $(".zj_look_info_header_content .zj_jcd_bh_show_info").eq(9).text(data['data']['note']);
                    // if(data['data']['goods']&&data['data']['goods']['sum_total']){
                    //     $(".tanceng .xs_bjd_bold .zj_jcd_goods_hj_sum").text(data['data']['goods']['sum_total']);
                    // }
                    // if(data['data']['setting']&&data['data']['setting']['sum_total']){
                    //     $(".xs_bjd_bold .zj_jcd_complete_goods_price_sum").text(data['data']['setting']['sum_total']);
                    // }
                    //
                    //
                    // /*ff*/
                    // $(".zj_jcd_unit_price_hj").text(data['data']['unit_price_total']);
                    // $(".zj_jcd_contain_tax").text(data['data']['tax_total']);
                    // $(".zj_jcd_other_cost").text(data['data']['other_costs']);
                    // $(".zj_jcd_sum_price_num").text(data['data']['all_money']);


                    var html='';
                    if(data['data']['goods']){
                        $.each(data['data']['goods'],function(i,v2){

                                html+='<tr>\
                                        <td>'+likNullData(v2['code_sn'])+'</td>\
                                        <td>'+likNullData(v2['product_name'])+'</td>\
                                        <td>'+likNullData(v2['attr_name'])+'</td>\
                                        <td>'+likNullData(v2['num'])+''+v2['unit_name']+'</td>\
                                        <td>'+likNullData(v2['return_num'])+''+v2['unit_name']+'</td>\
                                        <td></td>\
                                        </tr>'
                            })


                    }

                    $(".zj_jcgh_goods_info_list_con").html(html);
                    /*整机商品*/

                    var complete='';
                    if(data['data']['setting']){
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
                                                            <td>'+likNullData(v3['num'])+''+v3['unit_name']+'</td>\
                                                            <td>'+likNullData(v3['return_num'])+''+v3['unit_name']+'</td>\
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
                                        <th width="70">借出数量</th>\
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
                                <th width="360">属性</th>\
                                <th width="70">借出数量</th>\
                                <th width="70">归还数量</th>\
                                <th width="60"></th>\
                            </tr>\
                            </thead>\
                            <tbody>\
                                <tr class="c_3 c_3 xs_bjd_bold">\
                                    <td>'+likNullData(arr['code_sn'])+'</td>\
                                    <td>'+likNullData(arr['attr_name'])+'</td>\
                                    <td>'+likNullData(arr['num'])+''+arr['unit_name']+'</td>\
                                    <td>'+likNullData(arr['return_num'])+''+arr['unit_name']+'</td>\
                                    <td><button class="but_mix box_open_btn_2 but_blue_1">展开</button></td>\
                                </tr>\
                            </tbody>\
                            </table>\
                            </div>\
                            <div class="xs_tc_goods_box goods_tc_toggle" style="display: none;">'+setting+'</div>'

                        })
                    }



                    $(".tanceng .zj_complate_goods_info_xq_list").html(complete);
                    // var z_sum=0;
                    // $(".tanceng .zj_complate_goods_info_xq_list .zj_pzzj_goods_sum_price").each(function () {
                    //     z_sum+=parseFloat($(this).text());
                    // })
                    // $(".zj_jcd_complete_goods_price_sum").text(z_sum);
                }
            })

        });
        //借出单
        $('.ht_slid_list ul li:nth-of-type(2)').die('click').live('click',function(){
                var l_id=$(this).data('id');

            //takenoteJcdId=data.lend_id;
            $.ajax({
                url:SERVER_URL +'/lend/basic',
                type:'POST',
                data:{
                    token:token,
                    id:l_id
                },
                dataType:'json',
                success:function(oE){
                    console.log(oE);
                    if(oE.code ==0){
                        var cc = oE.cc;
                        var data = oE.data;
                        console.log(data);
                        console.log(cc);
                        // 借出单编号
                        $('.takenote_jcgh_borrow_code_sn').html(data['code_sn']);
                        // 客户名称
                        $('.takenote_jcgh_borrow_supplier_name').html(data['supplier_name']);
                        //预计归还日期
                        $('.takenote_jcgh_borrow_expect_return_time').html(subTime(data['expect_return_time']));
                        //税率
                        if (data['tax_rate'] == 0) {
                            $('.takenote_jcgh_borrow_tax_rate').html('含税17%');
                        } else if (data['tax_rate'] == 1) {
                            $('.takenote_jcgh_borrow_tax_rate').html('不含税');
                        }
                        //备注
                        $('.takenote_jcgh_borrow_note').html(data['note']);
                        //抄送人
                        var csrHtml = '';
                        $.each(cc, function (i, v) {
                            csrHtml += likNullData(v['name']) + ',';
                        });
                        csrHtml = csrHtml.slice(0, csrHtml.length - 1);
                        console.log(csrHtml);
                        $('.takenote_jcgh_borrow_cc_name').html(csrHtml);
                        //归还状态
                        if (data['thetype'] == 0) {
                            $('.takenote_jcgh_borrow_thetype').html('-');
                        } else if (data['thetype'] == 1) {
                            $('.takenote_jcgh_borrow_thetype').html('未归还');
                        } else if (data['thetype'] == 2) {
                            $('.takenote_jcgh_borrow_thetype').html('部分归还');
                        } else if (data['thetype'] == 3) {
                            $('.takenote_jcgh_borrow_thetype').html('已归还');
                        }
                        //出库信息
                        //出库日期
                        $('.takenote_jcgh_borrow_send_time').html(subTime(data['send_time']));
                        //物流方式
                        if (data['logistics_type'] == 1) {
                            $('.takenote_jcgh_borrow_logistics_type').html('快递');
                        } else if (data['logistics_type'] == 2) {
                            $('.takenote_jcgh_borrow_logistics_type').html('陆运');
                        } else if (data['logistics_type'] == 3) {
                            $('.takenote_jcgh_borrow_logistics_type').html('空运');
                        } else if (data['logistics_type'] == 4) {
                            $('.takenote_jcgh_borrow_logistics_type').html('海运');
                        }else if (data['logistics_type'] == 5) {
                            $('.takenote_jcgh_borrow_logistics_type').html('平邮');
                        }
                        //包运费
                        if (data['is_freight'] == 0) {
                            $('.takenote_jcgh_borrow_is_freight').html('不包');
                        } else if (data['logistics_type'] == 2) {
                            $('.takenote_jcgh_borrow_is_freight').html('包运费');
                        }
                        //收货人
                        $('.takenote_jcgh_borrow_receiver').html(data['receiver']);
                        //联系电话
                        $('.takenote_jcgh_borrow_mobile').html(data['mobile']);
                        //收货地址
                        $('.takenote_jcgh_borrow_address').html(data['address']);

                    }

                },
                error:function(oE){
                    console.log(oE);
                }
            });
            /*查看详情*/
            $(".zj_jcgh_check_jcd_info_xq").die().live("click",function(){
                $.ajax({
                    type: 'POST',
                    url: SERVER_URL + "/lend/look-lend",
                    data: {
                        token: token,
                        //company_id: company_id, //公司id
                        id: l_id// 用户id
                    },
                    dataType: "json",
                    success: function (data) {
                        console.log('20001110000000000000000');
                        console.log(data);
                        console.log('20001110000000000000000');
                        if(data.code==0){
                            if(data['data'].length==0){
                                return true;
                            }
                            $(".zj_jcd_check_info_zxs_bjd").data('id',data['data']['id']).data('code_sn',data['data']['code_sn']).data('supplier_id',data['data']['supplier_id']).data('supplier_name',data['data']['supplier_name']);//id
                            $(".zj_ck_jcd_name_kh_show").text(data['data']['supplier_name'])
                            $(".zj_jcd_quote_look_uname").text(data['data']['xiadan_name']);
                            $(".zj_jcd_quote_look_create_at").text(data['data']['create_time']);
                            $(".zj_look_info_header_content .zj_jcd_bh_show_info").eq(0).text(data['data']['code_sn']);
                            $(".zj_look_info_header_content .zj_jcd_bh_show_info").eq(1).text(data['data']['supplier_name']);
                            $(".zj_look_info_header_content .zj_jcd_bh_show_info").eq(2).text(subTime(data['data']['expect_return_time']));
                            $(".zj_look_info_header_content .zj_jcd_bh_show_info").eq(3).text(subTime(data['data']['send_time']));
                            if(data['data']['logistics_type']==1){
                                $(".zj_look_info_header_content .zj_jcd_bh_show_info").eq(4).text('快递');
                            }else if(data['data']['logistics_type']==2){
                                $(".zj_look_info_header_content .zj_jcd_bh_show_info").eq(4).text('陆运');
                            }else if(data['data']['logistics_type']==3){
                                $(".zj_look_info_header_content .zj_jcd_bh_show_info").eq(4).text('空运');
                            }else if(data['data']['logistics_type']==4){
                                $(".zj_look_info_header_content .zj_jcd_bh_show_info").eq(4).text('海运');
                            }else if(data['data']['logistics_type']==5){
                                $(".zj_look_info_header_content .zj_jcd_bh_show_info").eq(4).text('平邮');
                            }
                            if(data['data']['is_freight']==1){
                                $(".zj_look_info_header_content .zj_jcd_bh_show_info").eq(5).text('包运费');
                            }else{
                                $(".zj_look_info_header_content .zj_jcd_bh_show_info").eq(5).text('不包');
                            }

                            $(".zj_look_info_header_content .zj_jcd_bh_show_info").eq(6).text(data['data']['receiver']);
                            $(".zj_look_info_header_content .zj_jcd_bh_show_info").eq(7).text(data['data']['mobile']);
                            $(".zj_look_info_header_content .zj_jcd_bh_show_info").eq(8).text(data['data']['address']);
                            $(".zj_look_info_header_content .zj_jcd_bh_show_info").eq(9).text(data['data']['note']);
                            //$(".zj_look_info_header_content .zj_jcd_bh_show_info").eq(10).text(data['data']['code_sn']);
                            // $(".tanceng .zj_jrd_info_num_header_show .zj_jrd_bh_show_num").text(data['data']['code_sn']);
                            // $(".tanceng .zj_jrd_info_num_header_show .zj_supplier_name_show").text(data['data']['supplier_name']);
                            // $(".tanceng .zj_jrd_info_num_header_show .zj_yjgh_time_show").text(data['data']['expect_return_time']);
                            // $(".tanceng .zj_jrd_info_num_header_show .zj_rk_day_show").text(data['data']['library_time']);
                            // $(".tanceng .zj_jrd_info_num_header_show .zj_note_info_show").text(data['data']['note']);
                            if(data['data']['goods']['sum_total']){
                                $(".tanceng .xs_bjd_bold .zj_jcd_goods_hj_sum").text(data['data']['goods']['sum_total']);
                            }
                            // if(data['data']['setting']['sum_total']){
                            //     $(".xs_bjd_bold .zj_jcd_complete_goods_price_sum").text(data['data']['setting']['sum_total']);
                            // }


                            /*ff*/
                            $(".zj_jcd_unit_price_hj").text(data['data']['unit_price_total']);
                            $(".zj_jcd_contain_tax").text(data['data']['tax_total']);
                            $(".zj_jcd_other_cost").text(data['data']['other_costs']);
                            $(".zj_jcd_sum_price_num").text(data['data']['all_money']);


                            var html='';
                            $.each(data['data']['goods'],function(i,v){

                                $.each(v,function(i2,v2){
                                    var sor=repair(i2+1)
                                    html+='<tr>\
                                                <td>'+sor+'</td>\
                                                <td>'+likNullData(v2['good_sn'])+'</td>\
                                                <td>'+likNullData(v2['good_name'])+'</td>\
                                                <td>'+likNullData(v2['good_attr'])+'</td>\
                                                <td>'+likNullData(v2['good_num'])+''+likNullData(v2['good_unit'])+'</td>\
                                                <td>'+likNullData(v2['good_price'])+'</td>\
                                                <td>'+likNullData(v2['good_rate_price'])+'</td>\
                                                <td>'+likNullData(v2['good_total'])+'</td>\
                                                <td></td>\
                                                </tr>'
                                })

                            })
                            $(".zj_jcgh_jcd_goods_table_content_info").html(html);
                            /*整机商品*/

                            var complete='';
                            $.each(data['data']['setting'],function(i,arr){
                                var px=repair(i+1)
                                var setting='';
                                if(arr['good_list']){
                                    $.each(arr['good_list'],function(i2,v2){
                                        var setting_goods=''
                                        if(v2['attr_list']){
                                            $.each(v2['attr_list'],function(i3,v3){
                                                setting_goods+='<tr>\
                                                <td>'+likNullData(v3['good_sn'])+'</td>\
                                                <td>'+likNullData(v3['good_attr'])+'</td>\
                                                <td>'+likNullData(v3['sing_num'])+''+likNullData(v3['good_unit'])+'</td>\
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
                                    <td>'+px+'</td>\
                                    <td>'+likNullData(arr['good_sn'])+'</td>\
                                    <td>'+likNullData(arr['good_name'])+'</td>\
                                    <td>'+likNullData(arr['good_attr'])+'</td>\
                                    <td>'+likNullData(arr['num'])+''+likNullData(arr['good_unit'])+'</td>\
                                    <td>'+likNullData(arr['price'])+'</td>\
                                    <td>'+likNullData(arr['containing_money'])+'</td>\
                                    <td class="zj_pzzj_goods_sum_price">'+likNullData(arr['total_money'])+'</td>\
                                    <td><button class="but_mix box_open_btn_2 but_blue_1">展开</button></td>\
                                </tr>\
                            </tbody>\
                            </table>\
                            </div>\
                            <div class="xs_tc_goods_box goods_tc_toggle" style="display: none;">'+setting+'</div>'

                            })


                            $(".tanceng .zj_jcgh_jcd_complete_goods_dv_content").html(complete);
                            var z_sum=0;
                            $(".tanceng .zj_jcgh_jcd_complete_goods_dv_content .zj_pzzj_goods_sum_price").each(function () {
                                z_sum+=parseFloat($(this).text());
                            })
                            $(".zj_jcd_complete_goods_price_sum").text(z_sum);
                        }

                    }
                })

            });

        });
        //入库单
        $('.ht_slid_list ul li:nth-of-type(3)').die('click').live('click',function(){
            var code=$(this).data('code')
            //takenoteJcghNo=data.code_sn;
            //console.log(takenoteJcghNo);
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
                    console.log('入库单');
                    console.log(data);
                    console.log('入库单');
                    if(data['data']['input_status']==1){
                        $(".takenote_jcgh_rkstatus").text('待入库');
                    }else if(data['data']['input_status']==2){
                        $(".takenote_jcgh_rkstatus").text('部分入库');
                    }else if(data['data']['input_status']==3){
                        $(".takenote_jcgh_rkstatus").text('完成入库');
                    }
                    if(data['data']['stockingInList']['input_num']){
                        $('.zj_sell_order_look_jcgh_tbody_nodata_box').hide();
                        var rk_info='<tr class="table_total ven_sell_order_look_skjl_tbody_table_total">\
                                                <td>'+data['data']['stockingInList']['input_num']+'</td>\
                                                <td>'+data['data']['stockingInList']['distribution_num']+'</td>\
                                                <td>'+data['data']['stockingInList']['set_num']+'</td>\
                                                <td>'+data['data']['stockingInList']['set_distribution_num']+'</td>\
                                                <td>'+data['data']['stockingInList']['document_marker']+'</td>\
                                                <td>'+data['data']['stockingInList']['distribution_name']+'</td>\
                                                </tr>'
                        $(".zj_goods_jcgh_order_look_skjl_tbody").html(rk_info);
                    }else {
                        $(".zj_goods_jcgh_order_look_skjl_tbody").empty();
                        $('.zj_sell_order_look_jcgh_tbody_nodata_box').show();
                    }

                    var kf_goods=''
                    if(data['data']['stockInList'].length>0) {
                        $(".zj_no_order_look_jcgh_tbody_nodata_box").hide();
                        $.each(data['data']['stockInList'], function (i, goods_info) {
                            kf_goods += '<tr class="ven_sell_order_look_skjl_tbody_table_total">\
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
                        $(".zj_jcgh_order_look_skjl_tbody").html(kf_goods);
                    }else{
                        $(".zj_jcgh_order_look_skjl_tbody").empty();
                        $(".zj_no_order_look_jcgh_tbody_nodata_box").show();
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
            /*$.ajax({
             url:SERVER_URL +'/lend-out/stockininfo',
             type:'GET',
             data:{
             token:token,
             related_receipts_no:takenoteJcghNo
             },
             dataType:'json',
             success:function(oE){
             console.log(oE);
             if(oE.code == 0){
             var data = oE.data;
             console.log(data);
             //出库状态
             if (data['input_status'] == 1) {
             $('.takenote_jcgh_rkstatus').html('待入库');
             } else if (data['input_status'] == 2) {
             $('.takenote_jcgh_rkstatus').html('部分入库');
             } else if (data['input_status'] = 3) {
             $('.takenote_jcgh_rkstatus').html('完成入库');
             }
             }
             },
             error:function(oE){
             console.log(oE);
             }
             });*/

        });
    });







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
    // var out_list_data={
    //     token: token,
    //     uid:uid,
    //     company_id:company_id,
    //     page: 1,
    //     num: 10
    // }
    // function out_list_show_fn(){
    //     $.ajax({
    //         type: 'post',
    //         url: SERVER_URL + "/lend/list",
    //         data: out_list_data,
    //         dataType: "json",
    //         success: function (data) {
    //             if(data.code==0){
    //                 if(data['data'].length>0){
    //                     $(".zj_jcd_header_fy_show_page").show();
    //                     $(".zj_jcd_data_list_no_show").hide();
    //                 }else{
    //                     $(".zj_jcd_header_fy_show_page").hide();
    //                     $(".zj_jcd_data_list_no_show").show();
    //                 }
    //             }else{
    //                 $(".zj_jcd_header_fy_show_page").hide();
    //                 $(".zj_jcd_data_list_no_show").show();
    //             }
    //
    //             var html='';
    //             //var P_sort=" ";
    //             if(data.code==0){
    //
    //                 $.each(data.data,function(index,content){
    //                     var sort=repair(index+1)
    //                     if(content['is_invalid']==1){
    //                         html+='<tr class="grey"> <td><span class="voidIcon">作废</span></td>'
    //                     }else{
    //                         html+='<tr> <td>'+sort+'</td>'
    //                     }
    //
    //                     html+='<td>'+likNullData(content['code_sn'])+'</td>'
    //                     html+='<td>'+likNullData(content[''])+'</td>'
    //                     html+='<td>'+likNullData(content['expect_return_time'])+'</td>'
    //                     if(content['approval_status_name']==''){
    //
    //                     }
    //                     html+='<td class="c_g">'+likNullData(content['approval_status_name'])+'</td>'
    //                     html+='<td>'+likNullData(content[''])+'</td>'
    //                     html+='<td>'+likNullData(content[''])+'</td>'
    //                     html+='<td>'+likNullData(content[''])+'</td>'
    //                     html+='<td>'+likNullData(content[''])+'</td>'
    //                     html+='<td>'+likNullData(content[''])+'</td>'
    //                     html+='<td>'+likNullData(content[''])+'</td>'
    //                     html+='<td class="c_y">'+likNullData(content['guihuan'])+'</td>'
    //                     html+='<td>'+likNullData(content['note'])+'</td>'
    //                     html+='<td>'
    //                     html+='<button class="but_mix r_sidebar_btn zj_jcd_check_xq_btn" data-id="'+content['id']+'" name="takenote_jcd_ck">查看</button><button class="but_mix val_dialog zj_jcd_jcgh_btn_check" data-id="'+content['id']+'" name="takenote_jcd_jcgh_xj">借出归还</button><button data-id="'+content['id']+'" class="but_mix but_r but_void zj_jcd_zf_btn_state">作废</button>'
    //                     html+='</td>'
    //                     html+='</tr>';
    //
    //                 })
    //
    //             }else{
    //                 alert(data.msg);
    //             }
    //             $(".zj_jcd_content_body_show").append(html);
    //             /*分页*/
    //
    //             // var znum=data.totalcount;
    //             // var zpage=data.data.length;
    //             $(".zcj_jrd_seach_syjg").text(data.total_num);
    //             list_table_render_pagination(".zcj_jrdfy_head_page_div",out_list_data,out_list_show_fn,data.total_num,data.data.length);
    //             //$(".zcj_jrd_check_save_btn").trigger('click');
    //         }
    //
    //     })
    //
    // }
    // out_list_show_fn();

    // /*查看按钮*/
    // $(".zj_jcd_check_xq_btn").die().live("click",function(){
    //     var checkid=$(this).data('id')
    //     $.ajax({
    //         type: 'post',
    //         url: SERVER_URL + "/lend/basic",
    //         data:{
    //             token: token,
    //             id:checkid
    //         },
    //         dataType: "json",
    //         success: function (data) {
    //         }
    //     })
    // });
    // /*待我审批*/
    // $("#zj_jcd_dwsp_fqd_head").die().live("click",function(){
    //     var dwsp_list_data={
    //         token: token,
    //         uid:uid,
    //         company_id:company_id,
    //         page: 1,
    //         num: 10
    //     }
    //
    //     function dwsp_list_show_fn(){
    //         $.ajax({
    //             type: 'post',
    //             url: SERVER_URL + "/lend/my-approval",
    //             data: dwsp_list_data,
    //             dataType: "json",
    //             success: function (data) {
    //                 if(data.code==0){
    //                     if(data['data'].length>0){
    //                         $(".zj_jcd_header_fy_show_page").show();
    //                         $(".zj_jcd_data_list_no_show").hide();
    //                     }else{
    //                         $(".zj_jcd_header_fy_show_page").hide();
    //                         $(".zj_jcd_data_list_no_show").show();
    //                     }
    //                 }else{
    //                     $(".zj_jcd_header_fy_show_page").hide();
    //                     $(".zj_jcd_data_list_no_show").show();
    //                 }
    //
    //                 var html='';
    //                 //var P_sort=" ";
    //                 if(data.code==0){
    //
    //                     $.each(data.data,function(index,content){
    //                         var sort=repair(index+1)
    //                         if(content['is_invalid']==1){
    //                             html+='<tr class="grey"> <td><span class="voidIcon">作废</span></td>'
    //                         }else{
    //                             html+='<tr> <td>'+sort+'</td>'
    //                         }
    //
    //                         html+='<td>'+likNullData(content['code_sn'])+'</td>'
    //                         html+='<td>'+likNullData(content[''])+'</td>'
    //                         html+='<td>'+likNullData(content['expect_return_time'])+'</td>'
    //                         if(content['approval_status_name']==''){
    //
    //                         }
    //                         html+='<td class="c_g">'+likNullData(content['approval_status_name'])+'</td>';
    //                         html+='<td>'+likNullData(content[''])+'</td>';
    //                         html+='<td>'+likNullData(content[''])+'</td>';
    //                         html+='<td>'+likNullData(content[''])+'</td>';
    //                         html+='<td>'+likNullData(content[''])+'</td>';
    //                         html+='<td>'+likNullData(content[''])+'</td>';
    //                         html+='<td>'+likNullData(content[''])+'</td>';
    //                         html+='<td class="c_y">'+likNullData(content['guihuan'])+'</td>';
    //                         html+='<td>'+likNullData(content['note'])+'</td>';
    //                         html+='<td>';
    //                         html+='<button class="but_mix r_sidebar_btn zj_jcd_check_xq_btn" data-id="'+content['id']+'" name="takenote_jcd_ck">查看</button><button class="but_mix1 but_grey1" name="">审批</button>'
    //                         html+='</td>';
    //                         html+='</tr>';
    //
    //                     })
    //
    //                 }else{
    //                     alert(data.msg);
    //                 }
    //                 $(".dwsp_list_data").append(html);
    //                 /*分页*/
    //
    //                 // var znum=data.totalcount;
    //                 // var zpage=data.data.length;
    //                 $(".zcj_jrd_seach_syjg").text(data.total_num);
    //                 list_table_render_pagination(".zcj_jrdfy_head_page_div",out_list_data,out_list_show_fn,data.total_num,data.data.length);
    //                 //$(".zcj_jrd_check_save_btn").trigger('click');
    //             }
    //
    //         })
    //
    //     }
    //     dwsp_list_show_fn();
    //
    //
    //
    // });

    /*抄送我的*/
   /* $("#zj_jcd_cswd_fqd_head").die().live('click',function(){
        var cswd_list_data={
            token: token,
            uid:uid,
            company_id:company_id,
            page: 1,
            num: 10
        }

        function cswd_list_show_fn(){
            $.ajax({
                type: 'post',
                url: SERVER_URL + "/lend/cc",
                data: cswd_list_data,
                dataType: "json",
                success: function (data) {
                    if(data.code==0){
                        if(data['data'].length>0){
                            $(".zj_jcd_header_fy_show_page").show();
                            $(".zj_jcd_data_list_no_show").hide();
                        }else{
                            $(".zj_jcd_header_fy_show_page").hide();
                            $(".zj_jcd_data_list_no_show").show();
                        }
                    }else{
                        $(".zj_jcd_header_fy_show_page").hide();
                        $(".zj_jcd_data_list_no_show").show();
                    }

                    var html='';
                    //var P_sort=" ";
                    if(data.code==0){

                        $.each(data.data,function(index,content){
                            var sort=repair(index+1)
                            if(content['is_invalid']==1){
                                html+='<tr class="grey"> <td><span class="voidIcon">作废</span></td>'
                            }else{
                                html+='<tr> <td>'+sort+'</td>'
                            }

                            html+='<td>'+likNullData(content['code_sn'])+'</td>'
                            html+='<td>'+likNullData(content[''])+'</td>'
                            html+='<td>'+likNullData(content['expect_return_time'])+'</td>'
                            if(content['approval_status_name']==''){

                            }
                            html+='<td class="c_g">'+likNullData(content['approval_status_name'])+'</td>';
                            html+='<td>'+likNullData(content[''])+'</td>';
                            html+='<td>'+likNullData(content[''])+'</td>';
                            html+='<td>'+likNullData(content[''])+'</td>';
                            html+='<td>'+likNullData(content[''])+'</td>';
                            html+='<td>'+likNullData(content[''])+'</td>';
                            html+='<td>'+likNullData(content[''])+'</td>';
                            html+='<td class="c_y">'+likNullData(content['guihuan'])+'</td>';
                            html+='<td>'+likNullData(content['note'])+'</td>';
                            html+='<td>';
                            html+='<button class="but_mix r_sidebar_btn zj_jcd_check_xq_btn" data-id="'+content['id']+'" name="takenote_jcd_ck">查看</button><button class="but_mix1 but_grey1" name="">审批</button>'
                            html+='</td>';
                            html+='</tr>';

                        })

                    }else{
                        alert(data.msg);
                    }
                    $(".zj_jcd_cswd_body_content_list").append(html);
                    /!*分页*!/

                    // var znum=data.totalcount;
                    // var zpage=data.data.length;
                    $(".zcj_jrd_seach_syjg").text(data.total_num);
                    list_table_render_pagination(".zcj_jrdfy_head_page_div",cswd_list_data,cswd_list_show_fn,data.total_num,data.data.length);
                    //$(".zcj_jrd_check_save_btn").trigger('click');
                }

            })

        }
        cswd_list_show_fn();
    });*/


/*新建*/
$(".takenote_jcgh_create_btn").die().live("click",function(){
    $(".takenote_jcgh_create_time").text(getCurrentDateDay())
    $(".takenote_jcgh_create_uname").text(uname)
    new_number('.takenote_jcgh_create_code','JCGH');
    /*抄送人弹框按钮*/
    var  arr_id=[];/*抄送人id*/
    var cs_name=[];/*抄送人名字*/
    $(".tanceng .zcj_jcgh_jcgh_select_cs_add_btn").die().live("click",function(){
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
                    $(".tanceng .zj_jcd_csr_jcgh_left_ul_list_tree").html(head+tree_list_bmfzr(data, deep));
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

        $(".tanceng .zj_jcd_csr_jcgh_left_ul_list_tree .person_left_nav").die().live("click",function(){
            /* debugger;*/
            var id=$(this).attr("userinfoid");
            var name=$(this).find("span.list_msg").text();
            $(this).toggle(function(){
                $('.tanceng .zj_jcd_select_jcgh_csr_right_list_ul').append('<li rid="'+$(this).attr('userinfoid')+'"><span>'+$(this).children('.list_msg').text()+'</span><i class="list_choose_delete"></i></li>')
                $(this).append('<span class="list_check"><em class="on"></em></span>');
                //$(this).find('span.list_check em').addClass('on')
                arr_id.unshift(id);
                cs_name.unshift(name)
                console.log(arr_id);
                console.log(cs_name);

            },function(){
                $('.tanceng .zj_jcd_select_jcgh_csr_right_list_ul').find('li[rid='+$(this).attr('userinfoid')+']').remove()
                //$(this).remove('<span class="list_check"><em class="on"></em></span>');
                $(this).find('span.list_check').remove()
                arr_id.splice(jQuery.inArray(id,arr_id),1);
                cs_name.splice(jQuery.inArray(id,cs_name),1);
                console.log(arr_id);
                console.log(cs_name);

            })
            $(this).trigger('click')

            /*抄送人确认按钮*/
            $(".tanceng .zj_jcd_select_jcgh_csr_end_btn").die().live("click",function(){
                //cs_name=getJsonArr(cs_name);
                var cs_per="";

                $.each($(".tanceng .zj_jcd_select_jcgh_csr_right_list_ul li"),function (i,v) {
                    cs_per+='<li rid="'+arr_id[i]+'" class="zj_csr_num"><i class="del_img_1">-</i><em class="icon_personBtn icon_personBtn_msg"><i class="icon_personNext"></i></em> <em class="icon_adderBtn"></em> <p class="box_adderName">'+cs_name[i]+'</p></li>'
                });

                $(".zcj_jcgh_jcgh_select_cs_add_btn").parent().before(cs_per);
                $(this).closest('.dialog_box').remove();
                //$(".zcj_shoose_right_list").empty();

            });
        });

        /*删除选择的抄送人*/
        $(".tanceng .zj_jcd_select_jcgh_csr_right_list_ul .list_choose_delete").die().live("click",function(){
            var cs_id=$(this).parent().attr("rid");
            var name=$(this).prev().text();

            $(this).parent().remove();
            arr_id.splice(jQuery.inArray(cs_id,arr_id),1);
            cs_name.splice(jQuery.inArray(name,cs_name),1);
            console.log(arr_id);
            console.log(cs_name);
            $(".zj_jcd_csr_jcgh_left_ul_list_tree .person_left_nav").each(function(){
                if($(this).attr('userinfoid')==cs_id){
                    $(this).click();
                    $(this).children('span.list_check').remove();
                }
            })
        });

        /*删除添加后的抄送人*/
        $(".zj_jcd_select_jcgh_csr_right_list_ul .del_img_1").die().live("click",function(){
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
$(".takenote_jcgh_create_choose_lend").die().live("click",function(){
    getBrwListFn_jcd();
});
    var jcd_list_data={
        token: token,
        uid:uid,
        company_id:company_id,
        page: 1,
        num: 10,
        is_invalid:1,
        thetype:1,
        approval_status:2
    }
    function getBrwListFn_jcd() {
        $.ajax({
            url: SERVER_URL + '/lend/list',
            type: 'POST',
            data: jcd_list_data,
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                if (oE.code == 0) {
                    $('.tanceng .takenote_create_choose_lend_total').html(oE.total_num);
                    var datalist = oE.data;
                    if (datalist.length == 0) {
                        $('.tanceng .takenote_jcgh_create_choose_lend_nodata_box').removeClass('none');
                        $('.tanceng .takenote_jcgh_create_choose_lend_handle').addClass('none');
                    } else {
                        $('.tanceng .takenote_jcgh_create_choose_lend_nodata_box').addClass('none');
                        $('.tanceng .takenote_jcgh_create_choose_lend_handle').removeClass('none');
                    }
                    var brwList = '';
                    var approvalStatus = '';
                    $.each(datalist, function (i, v) {
                        brwList += '<tr brwid="' + v['id'] + '" supid="' + v['supplier_id'] + '">\
                            <td><input type="radio" data-id="'+v['id']+'" data-code_sn="'+v['code_sn']+'" data-supplier_id="'+v['supplier_id']+'" data-supplier_name="'+v['supplier_name']+'" ' + (i == 0 ? 'checked' : '') + ' name="xs_bjd_xzxsdd"></td>\
                            <td>' + likNullData(v['code_sn']) + '</td>\
                            <td>' + likNullData(v['supplier_name']) + '</td>\
                            <td>' + likNullData(v['expect_return_time']) + '</td>\
                            <td>' + likNullData(v['approval_status_name']) + '</td>\
                            <td>' + likNullData(v['create_time']) + '</td>\
                            <td>' + likNullData(v['all_money']) + '</td>\
                            <td>' + likNullData(v['note']) + '</td>\
                            </tr>';
                    });
                    $('.tanceng .takenote_jcgh_choose_lend_tbody').html(brwList)
                    //分页
                    list_table_render_pagination('.takenote_jcgh_create_choose_lend_pagination', jcd_list_data, getBrwListFn_jcd, oE.total_num, datalist.length);
                }
            },
            error: function (e) {
                alert(e.msg);
                console.log(e);
            }
        });
    }
/*选择借出单保存*/
$(".tanceng .takenote_jcgh_create_choose_lend_save").die().live("click",function(){

        var jcdid=null;
        var jcdcode=null;
         var kh_id=null;
        var kh_name=null;
        $(".takenote_jcgh_choose_lend_tbody input").each(function(){
            if($(this).is(':checked')){
                jcdid=$(this).data('id');
                jcdcode=$(this).data('code_sn');
                kh_id=$(this).data('supplier_id');
                kh_name=$(this).data('supplier_name');
            }
        })
        if(jcdid==null){
            alert('请选择借出单');
        }else{
            $('.takenote_jcgh_create_lend_code').data('id',jcdid).val(jcdcode);
            $('.takenote_jcgh_choose_lend_cus_name').data('id',kh_id).val(kh_name);
            $(this).parents('.dialog_content_2').find('.dialog_close').click();
        }

    /*查看借入商品*/
    $.ajax({
        type: 'POST',
        url: SERVER_URL + "/lend/look-lend",
        data: {
            token: token,
            //company_id: company_id, //公司id
            id: jcdid  // id

        },
        dataType: "json",
        success: function (data) {
            console.log('2000111222');
            console.log(data);
            console.log('2000111222');
            var goods='';
            $.each(data['data']['goods'],function(i,v){
                $.each(v,function(i2,v2){
                    goods+='<tr>\
                            <td><input type="checkbox" data-id="'+v2['id']+'" data-good_id="'+v2['good_id']+'" data-good_num="'+v2['good_num']+'"></td>\
                            <td>'+likNullData(v2['good_sn'])+'</td>\
                            <td>'+likNullData(v2['good_name'])+'</td>\
                            <td>'+likNullData(v2['good_attr'])+'</td>\
                            <td>'+likNullData(v2['good_num'])+''+likNullData(v2['good_unit'])+'</td>\
                            <td><div class="xs_num_input num_input inline_block num_input_new"><button class="but_grey_a but_opa_small inp_plus ven_sell_quote_productnum_change">+</button><input type="text" class="productnum" maxnum="' + (parseFloat(v2['good_num']) - parseFloat(v2['return_num'])) + '" value="' + (parseFloat(v2['good_num']) - parseFloat(v2['return_num'])) + '"><button class="but_grey_a but_opa_small radius_left_0 inp_reduce ven_sell_quote_productnum_change">-</button></div></td>\
                            </tr>'
                })

            })
            $(".zj_pt_good_content_show_info").html(goods);
            var complete='';

            $.each(data['data']['setting'],function(i,arr){
                var setting='';
                var settingNum = parseFloat(arr['num']) - parseFloat(arr['return_num']);
                if(arr['good_list']){
                    $.each(arr['good_list'],function(i2,v2){
                        var setting_goods=''
                        if(v2['attr_list']){
                            $.each(v2['attr_list'],function(i3,v3){
                                setting_goods+='<tr>\
                                                <td><input type="checkbox" disabled="disabled" data-id="'+v3['id']+'" data-good_id="'+v3['good_id']+'"/></td>\
                                                <td>'+likNullData(v3['good_sn'])+'</td>\
                                                <td>'+likNullData(v3['good_name'])+'</td>\
                                                <td>'+likNullData(v3['good_attr'])+'</td>\
                                                <td>'+likNullData(v3['sing_num'])+''+likNullData(v3['good_unit'])+'</td>\
                                                <td><div class="xs_num_input num_input inline_block num_input_new"><button class="but_grey_a but_opa_small inp_plus ven_sell_quote_productnum_change">+</button><input type="text" class="productnum" maxnum="' + (settingNum * v3['sing_num']) + '" data-sing_num="'+v3['sing_num']+'" value="' + (parseFloat(v3['sing_num']) - parseFloat(v3['return_num'])) + '"><button class="but_grey_a but_opa_small radius_left_0 inp_reduce ven_sell_quote_productnum_change">-</button></div></td>\
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
                                    <th width="100">名称</th>\
                                    <th width="435">属性</th>\
                                    <th width="65">借出数量</th>\
                                    <th width="88">归还数量</th>\
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
                                    <td><input type="checkbox" class="zj_setting_parent_checkbox" data-id="'+arr['id']+'" data-goods_id="'+arr['goods_id']+'" data-num="'+arr['num']+'"></td>\
                                    <td>'+likNullData(arr['good_sn'])+'</td>\
                                    <td>'+likNullData(arr['good_name'])+'</td>\
                                    <td>'+likNullData(arr['good_attr'])+'</td>\
                                    <td>'+likNullData(arr['num'])+''+likNullData(arr['good_unit'])+'</td>\
                                    <td><div class="xs_num_input num_input inline_block num_input_new"><button class="but_blue but_opa_small inp_plus sell_quote_create_package_num_change">+</button><input type="text" value="' + (parseFloat(arr['num']) - parseFloat(arr['return_num'])) + '" class="sell_quote_create_package_num" maxnum="' + (parseFloat(arr['num']) - parseFloat(arr['return_num'])) + '" style="border:1px solid #23a2f3;"><button class="but_blue but_opa_small radius_left_0 inp_reduce sell_quote_create_package_num_change">-</button></div></td>\
                                    <td><button class="but_mix box_open_btn_1 but_blue_1">展开</button></td>\
                                </tr>\
                            </tbody>\
                            </table>\
                            </div>\
                            </div>\
                            <div class="xs_xsbjd_table_t2 none" style="padding: 10px;border-bottom: 2px solid #e6e6e6;">\
                            <div class="box_open_list goods_tc_toggle">'+setting+'</div>\
                            </div>'

            })


            $(".tanceng .zj_complate_goods_info_show_list").html(complete);
        }
    });

    //选择基本商品的checkbox
    $('.tanceng .zj_pt_good_content_show_info tr input:checkbox').die('click').live('click', function () {
        if ($(this).is(':checked')) {
            $(this).closest('tr').find('input, button').attr('disabled', false);

        } else {

            $(this).closest('tr').find('input:not(":checkbox"), button').attr('disabled', true);
            $(this).closest('tr').find('input').val(0);
        }
    });
    $('.tanceng .ven_sell_quote_productnum_change').die('click').live('click', function () {
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
    /*选择商品*/
    //整机商品父级勾选
    $('.tanceng .zj_complate_goods_info_show_list .xs_div_2 input').die('click').live('click', function () {
        if ($(this).is(':checked')) {
            $(this).parents('.xs_div_2').next('.xs_xsbjd_table_t2').find('input').attr('checked', true);
        } else {
            $(this).parents('.xs_div_2').next('.xs_xsbjd_table_t2').find('input').attr('checked', false);
            //$(this).closest('.takenote_setting_list_one').find('input').val(0);
        }
    });
    $('.tanceng .sell_quote_create_package_num_change').die('click').live('click', function () {
        if (parseFloat($(this).siblings('input').val()) > parseFloat($(this).siblings('input').attr('maxnum'))) {
            $(this).siblings('input').val($(this).siblings('input').attr('maxnum'));
            alert('超过可归还的最大数量');
        }
    });
    //改变整机数量
    // $('.tanceng .sell_quote_create_package_num_change').die('click').live('click', function () {
    //     settingParentNumChange();
    // });
    // $('.tanceng .sell_quote_create_package_num').live('keyup', function () {
    //     settingParentNumChange();
    // });
    // function settingParentNumChange() {
    //     $.each($('.tanceng .zj_complate_goods_info_show_list .zj_setting_parent_checkbox'), function (i, v) {
    //         if ($('.tanceng .zj_complate_goods_info_show_list .zj_setting_parent_checkbox').eq(i).is(':checked')) {
    //             $.each($('.tanceng .zj_complate_goods_info_show_list .zj_setting_parent_checkbox').eq(i).closest('.zj_complate_goods_info_show_list').find('.productnum'), function (i2, v2) {
    //                 $('.tanceng .zj_complate_goods_info_show_list .zj_setting_parent_checkbox').eq(i).closest('.zj_complate_goods_info_show_list').find('.productnum').eq(i2).val(parseFloat($('.tanceng .zj_complate_goods_info_show_list .xs_div_2').eq(i).find('.productnum').val()) * parseFloat($('.tanceng .zj_complate_goods_info_show_list .zj_setting_parent_checkbox').eq(i).closest('.zj_setting_parent_checkbox').eq(i).closest('.zj_complate_goods_info_show_list').find('.productnum').eq(i2).data('sing_num')));
    //             });
    //         }
    //     });
    // }

});
    //定义推送出库信息参数
    var takenoteStockData = {
        token: token,
        related_receipts_no: '', // 关联单据编号
        input_type: 3, // 出库类型 1销售 2采购退货/采购换货 3借出出库 4借入归还 5销售换货
        related_business_name: '', // 相关往来名称
        document_marker: uid, // 下单人
        remark: '', // 备注
        product_info: '', // 商品明细
        input_time: '' // 入库日期

    };
    /*新建保存参数*/
    var jcgh_list_data={
        token: token,
        code_sn:'',
        lend_id:'',
        lend_code_sn:'',
        customer_id:'',
        remark:'',
        customer_name:'',
        in_time:'',
        copy_flow:'',
        product_info:''
    }
/*新建保存*/
$(".val_dialogToptakenote_jcgh_create_submit_btn").die().live("click",function(){
    var _this=this;
    jcgh_list_data.code_sn=$(".takenote_jcgh_create_code").val();
    if($(".takenote_jcgh_create_lend_code").val()=='请选择借入单'){
        alert('请选择借入单');
      return false;
    }else{
        jcgh_list_data.lend_id=$(".takenote_jcgh_create_lend_code").data('id');
        jcgh_list_data.lend_code_sn=$('.takenote_jcgh_create_lend_code').val();
        jcgh_list_data.customer_id=$(".takenote_jcgh_choose_lend_cus_name").data('supplier_id');
        jcgh_list_data.customer_name=$(".takenote_jcgh_choose_lend_cus_name").val();
    }
     if($(".zj_jrgh_enter_ku_time").val()=='请选择日期' || $(".zj_jrgh_enter_ku_time").val()==''){
         alert('请选择日期');
         return false;
     }else{
         jcgh_list_data.in_time=$(".zj_jrgh_enter_ku_time").val();
     }

    if($(".zj_bz_meark_text_val").val()=='请输入备注'){
        alert('请输入备注');
        return false;
    }else{
        jcgh_list_data.remark=$(".zj_bz_meark_text_val").val();
    }




    var jcgh_cs=[];
    $(".tanceng .zj_select_csr_icon_show .zj_csr_num").each(function(){
        jcgh_cs.push($(this).attr('rid'));
    })
    jcgh_list_data.copy_flow=jcgh_cs.toString();
    var jcgh_goods=[];
    /*推送*/
    var ts_product_info=[];
    /*商品*/
    $(".zj_pt_good_content_show_info tr input").each(function(i){
        if($(this).is(':checked')){
            jcgh_goods.push({
                id:$(this).data('id'),
                goods_id:$(this).data('good_id'),
                goods_category:1,
                num: $(this).parents('tr').find('.productnum').val(),
                total_num:$(this).parents('tr').find('td').eq(4).text()
            })
            ts_product_info.push({
                product_id:$(this).data('good_id'),
                product_type:1,
                input_num:$(this).parents('tr').find('.productnum').val()
            });
        }
    })
    /*整机商品*/
    $(".zj_complate_goods_info_show_list .xs_div_2 tbody input").each(function (i) {
        var match_goods=[];
        /*推送*/
        var p_info=[]
        $(".zj_complate_goods_info_show_list .xs_div_2 tbody input").parents('.zj_complate_goods_info_show_list').find('.xs_xsbjd_table_t2').eq(i).find('input:checkbox').each(function(i2){
            if($(this).is(':checked')){
                match_goods.push({
                    id:$(this).data('id'),
                    goods_id:$(this).data('good_id'),
                    num:$(this).parents('tr').find('.productnum').val()
                })
                p_info.push({
                    product_id:$(this).data('good_id'),
                    num:$(this).parents('tr').find('.productnum').val()
                })
            }

        })
        if($(this).is(':checked')){
            jcgh_goods.push({
                id:$(this).data('id'),
                goods_id:$(this).data('goods_id'),
                goods_name:$(this).parents('tr').find('td').eq(2).text(),
                goods_code_sn:$(this).parents('tr').find('td').eq(1).text(),
                goods_category:2,
                num:$(this).parents('tr').find('.sell_quote_create_package_num').val(),
                total_num:$(this).data('num'),
                piece:match_goods
            })
            ts_product_info.push({
                product_id:$(this).data('goods_id'),
                product_type_no:$(this).parents('tr').find('td').eq(1).text(),
                product_type:3,
                input_num:$(this).parents('tr').find('.sell_quote_create_package_num').val(),
                product_type_name:$(this).parents('tr').find('td').eq(2).text(),
                set_detail:p_info
            });
        }
    })
    var jcgh_goods_info=JSON.stringify(jcgh_goods);
    jcgh_list_data.product_info=jcgh_goods_info;

    /*推送*/
    var ts_goods=JSON.stringify(ts_product_info);
    takenoteStockData.related_receipts_no = jcgh_list_data.code_sn;
    takenoteStockData.related_business_name = jcgh_list_data.customer_name;
    //takenoteStockData.document_marker = $('.tanceng .zj_jcd_create_person_name').val();
    takenoteStockData.remark = jcgh_list_data.remark;
    takenoteStockData.input_time = jcgh_list_data.in_time;

    takenoteStockData.product_info=ts_goods;

    $.ajax({
        type: 'post',
        url: SERVER_URL + "/lend-out/add",
        data: jcgh_list_data,
        dataType: "json",
        success: function (data) {
            console.log('100033333444');
            console.log(data);
            console.log('100033333444');
            takenoteToOutStockFn()
            $(_this).parents('.takenote_jcgh_new').find('.dialog_close').click();
        }
    })
    //推送出库函数
    function takenoteToOutStockFn() {
        $.ajax({
            url: SERVER_URL + '/stocking-in/add',
            type: 'POST',
            data: takenoteStockData,
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












});
