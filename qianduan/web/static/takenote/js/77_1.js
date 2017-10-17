/*借出单*/
 //$(function(){
     var token=Admin.get_token();
     var uid=localStorage.getItem("uid");
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

     function tree_list_close(datalist, deep) {
         var html = '';
         deep++;
         $.each(datalist, function (index, data) {
             html += '<ul class="hr_ul1 ' + (data['count'] == 0 ? 'none oth' : '') + '" ' + (deep == 1 ? '' : 'style="display: none;"') + '>';
//			html += '<li class="hr_left_1" cusSortId="' + data["id"] + '"><span>' + data['name'] + '&nbsp;<em class="list_num_null">(<i>'+data['children'].length+'</i>)</em></span></li>';
             html += '<li class="hr_left_1 ' + (data['count'] == 0 ? 'none' : '') + '" cusSortId="' + data["id"] + '"><span>' + data['name'] + '&nbsp;<em class="' + (data['count'] == 0 ? 'none' : '') + '">(<i>' + data['count'] + '</i>)</em></span></li>';
             if (data['children'] && data['children'].length > 0) {
                 html += tree_list_close(data['children'], deep)
             }
             html += '</li>';
             html += '</ul>'
         });
         return html
     }
     // 选择查看项
     // 定义查看项
     var venCustomLookAbledField = [
         {'index': null, 'field': '出库状态'},
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
     // if($(".zj_jcd_tab_header_info .tabhover").text()=='我发起的'){
     //     likShow('.zcj_jcgh_table_head_content_show', venCustomLookAbledField, '.zcj_jcgh_check_x_head_content', '.zcj_jcgh_check_save_btn', '.zcj_jcgh_check_cancal_btn');
     // }else if($(".zj_jcd_tab_header_info .tabhover").text()=='待我审批'){
     //     likShow('.zcj_dwsp_table_head_content_show', venCustomLookAbledField, '.zcj_jcgh_check_x_head_content', '.zcj_jcgh_check_save_btn', '.zcj_jcgh_check_cancal_btn');
     // }else{
     //     likShow('.zcj_cswd_table_head_content_show', venCustomLookAbledField, '.zcj_jcgh_check_x_head_content', '.zcj_jcgh_check_save_btn', '.zcj_jcgh_check_cancal_btn');
     // }

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
         if(time!=''){
             var newtime = time.substr(0,10);
         }

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
     var department_id=localStorage.getItem("department_id");
     var company_id=localStorage.getItem("usercompany_id");
     var uid=localStorage.getItem("uid");
     var username=localStorage.getItem("username");

     var powerUrls=localStorage.getItem("user_info_url");
     var company_admin=localStorage.getItem("company_admin");
     var power=JSON.parse(powerUrls);
     console.log(power);
     var add_jcd="lend/add";//新建
     var zf_jcd="lend/invalid";//作废
     if(company_admin!=1) {
         if ($.inArray(add_jcd, power) > -1) {
             $(".zj_new_create_jcd_btn_tc").show();

         } else {
             $(".zj_new_create_jcd_btn_tc").hide();
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
     /*我发起的列表参数*/
     var out_list_data={
         token: token,
         uid:uid,
         company_id:company_id,
         is_invalid:1,
         page: 1,
         num: 10
     }

     function out_list_show_fn(){
         $.ajax({
             type: 'post',
             url: SERVER_URL + "/lend/list",
             data: out_list_data,
             dataType: "json",
             success: function (data) {
                 console.log('100033333');
                 console.log(data);
                 console.log('100033333');
                 if(data.code==0){
                     if(data['data'].length>0){
                         $(".zcj_jrdfy_head_page_div").show();
                         $(".zj_jcd_data_list_no_show").hide();
                     }else{
                         $(".zcj_jrdfy_head_page_div").hide();
                         $(".zj_jcd_data_list_no_show").show();
                     }
                 }else{
                     $(".zcj_jrdfy_head_page_div").hide();
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
                         html+='<td>'+likNullData(content['supplier_name'])+'</td>'
                         html+='<td>'+likNullData(content['expect_return_time'])+'</td>'
                         if(content['approval_status']==1){
                             html+='<td class="c_y">审批中</td>'
                         }else if(content['approval_status']==2){
                             html+='<td class="c_g">审批通过</td>'
                         }else if(content['approval_status']==3){
                             html+='<td class="c_r">驳回</td>'
                         }else {
                             html+='<td class="">-</td>'
                         }

                         html+='<td>'+likNullData(content['approval_name_str'])+'</td>'
                         html+='<td>'+likNullData(content['send_time'])+'</td>'
                         if(content['library_status']==1){
                             html+='<td class="c_r">待出货</td>'
                         }else if(content['library_status']==2){
                             html+='<td class="c_y">部分发货</td>'
                         }else if(content['library_status']==3){
                             html+='<td class="c_g">已出货</td>'
                         }else{
                             html+='<td class="">-</td>'
                         }

                         html+='<td>'+likNullData(content['create_time'])+'</td>'
                         html+='<td>'+likNullData(content['name'])+'</td>'
                         html+='<td>'+likNullData(content['all_money'])+'</td>'
                         if(content['thetype']==1){
                             html+='<td class="c_r">未归还</td>'
                         }else if(content['thetype']==2){
                             html+='<td class="c_y">部分归还</td>'
                         }else if(content['thetype']==3){
                             html+='<td class="c_g">已归还</td>'
                         }else{
                             html+='<td class="">-</td>'
                         }


                         html+='<td>'+likNullData(content['note'])+'</td>'
                         html+='<td>'
                         if(content['approval_status']==0){
                             if(content['is_invalid']==1){
                                 html+='<button class="but_mix r_sidebar_btn zj_jcd_check_xq_btn" data-id="'+content['id']+'" data-code_sn="'+content['code_sn']+'" name="takenote_jcd_ck">查看</button><button data-id="'+content['id']+'" class="but_mix1 but_grey1">作废</button><button class="but_mix val_dialog but_r zj_jcd_del_info_btn" name="takenote_jcd_cgxsc">删除</button>'
                             }else{
                                 html+='<button class="but_mix r_sidebar_btn zj_jcd_check_xq_btn" data-id="'+content['id']+'" data-code_sn="'+content['code_sn']+'" name="takenote_jcd_ck">查看</button><button data-id="'+content['id']+'" class="but_mix but_r but_void zj_jcd_zf_btn_state">作废</button><button class="but_mix val_dialog but_r zj_jcd_del_info_btn" data-id="' + content['id'] + '" name="takenote_jcd_cgxsc">删除</button>'
                             }
                         }else if(content['approval_status']==1){
                             if(content['is_invalid']==1){
                                 html+='<button class="but_mix r_sidebar_btn zj_jcd_check_xq_btn" data-id="'+content['id']+'" data-code_sn="'+content['code_sn']+'" name="takenote_jcd_ck">查看</button><button data-id="'+content['id']+'" class="but_mix1 but_grey1">作废</button><button class="but_mix val_dialog but_r" name="takenote_jcd_cgxsc">删除</button>'
                             }else{
                                 html+='<button class="but_mix r_sidebar_btn zj_jcd_check_xq_btn" data-id="'+content['id']+'" data-code_sn="'+content['code_sn']+'" name="takenote_jcd_ck">查看</button><button data-id="'+content['id']+'" class="but_mix but_r but_void zj_jcd_zf_btn_state">作废</button><button class="but_mix val_dialog but_r zj_jcd_del_info_btn" data-id="' + content['id'] + '" name="takenote_jcd_cgxsc">删除</button>'
                             }


                         }else if(content['approval_status']==2){

                             if(content['is_invalid']==1) {
                                 html+='<button class="but_mix r_sidebar_btn zj_jcd_check_xq_btn" data-id="'+content['id']+'" data-code_sn="'+content['code_sn']+'" name="takenote_jcd_ck">查看</button><button class="but_mix1 but_grey1" data-id="'+content['id']+'" data-code_sn="'+content['code_sn']+'" data-supplier_name="'+content['supplier_name']+'" data-supplier_id="'+content['supplier_id']+'" data-send_time="'+content['send_time']+'" data-name="'+content['name']+'" name="">借出归还</button>'
                             }else{
                                 if(content['thetype']==3) {
                                     html+='<button class="but_mix r_sidebar_btn zj_jcd_check_xq_btn" data-id="'+content['id']+'" data-code_sn="'+content['code_sn']+'" name="takenote_jcd_ck">查看</button><button class="but_mix1 but_grey1" data-id="'+content['id']+'" data-code_sn="'+content['code_sn']+'" data-supplier_name="'+content['supplier_name']+'" data-supplier_id="'+content['supplier_id']+'" data-send_time="'+content['send_time']+'" data-name="'+content['name']+'" name="">借出归还</button>'
                                 }else{
                                     html += '<button class="but_mix r_sidebar_btn zj_jcd_check_xq_btn" data-id="' + content['id'] + '" data-code_sn="' + content['code_sn'] + '" name="takenote_jcd_ck">查看</button><button class="but_mix val_dialog zj_jcd_jcgh_btn_check" data-id="' + content['id'] + '" data-code_sn="' + content['code_sn'] + '" data-supplier_name="' + content['supplier_name'] + '" data-supplier_id="' + content['supplier_id'] + '" data-uid="' + content['uid'] + '" data-send_time="' + content['send_time'] + '" data-name="' + content['name'] + '" name="takenote_jcd_jcgh_xj">借出归还</button>'
                                 }
                             }

                         }else if(content['approval_status']==3){
                             if(content['is_invalid']==1) {
                                 html += '<button class="but_mix r_sidebar_btn zj_jcd_check_xq_btn" data-id="' + content['id'] + '" data-code_sn="' + content['code_sn'] + '" name="takenote_jcd_ck">查看</button><button data-id="' + content['id'] + '" class="but_mix1 but_grey1">作废</button><button class="but_mix val_dialog but_r" data-id="' + content['id'] + '" name="takenote_jcd_cgxsc">删除</button>'
                             }else{
                                 html += '<button class="but_mix r_sidebar_btn zj_jcd_check_xq_btn" data-id="' + content['id'] + '" data-code_sn="' + content['code_sn'] + '" name="takenote_jcd_ck">查看</button><button data-id="' + content['id'] + '" class="but_mix but_r but_void zj_jcd_zf_btn_state">作废</button><button class="but_mix val_dialog but_r zj_jcd_del_info_btn" data-id="' + content['id'] + '" name="takenote_jcd_cgxsc">删除</button>'
                             }
                         }

                         html+='</td>'
                         html+='</tr>';

                     })
                     if(company_admin!=1) {

                         /*作废*/

                         if ($.inArray(zf_jcd, power) > -1) {
                             $(".zj_jcd_zf_btn_state").show();

                         } else {
                             $(".zj_jcd_zf_btn_state").hide();

                         }
                     }
                 }else{
                     alert(data.msg);
                 }
                 $(".zj_jcd_content_body_show").html(html);
                 /*分页*/

                 // var znum=data.totalcount;
                 // var zpage=data.data.length;
                 $(".zcj_jrd_seach_syjg").text(data.total_num);
                 list_table_render_pagination(".zcj_jrdfy_head_page_div",out_list_data,out_list_show_fn,data.total_num,data.data.length);
                 $(".zcj_jcgh_check_save_btn").trigger('click');
             }

         })

     }
/*我发起的*/
     $("#zj_jcd_my_fqd_head").die().live("click",function(){
         $(".zj_jcd_wfqd_content_info_show .container").addClass('lik_table_wrap');
         $(".zj_jcd_dwsp_content_info_show .container").removeClass('lik_table_wrap');
         $(".zj_jcd_cswd_content_info_show .container").removeClass('lik_table_wrap');
         likShow('.zcj_jcgh_table_head_content_show', venCustomLookAbledField, '.zcj_jcgh_check_x_head_content', '.zcj_jcgh_check_save_btn', '.zcj_jcgh_check_cancal_btn');
         $(".goods_jcd_wfqd_attr_search_table").show();
         $(".goods_jcd_dwsp_attr_search_table").hide();
         $(".goods_jcd_cswd_attr_search_table").hide();
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

         out_list_show_fn();
         /*搜索*/
         $(".zj_jcd_search_bh_num_btn").die().live("click",function(){
             var s_search=$(".zj_jcd_ss_input_val").val();
             if($(".zj_jcd_tab_header_info .tabhover").text()=='我发起的'){
                 if($(".zj_jcd_ss_input_val").val()=='搜索借出编号/客户名称'){
                     out_list_data.key_search='';
                 }else{
                     out_list_data.key_search=s_search;

                 }
                 out_list_data.page=1;
                 out_list_show_fn();
             }

         });
         /*高级搜索*/
         /*审批状态*/
         $(".zj_jcd_sp_state_list li").die().live("click",function(){
             var state=$(this).data('id')
             out_list_data.approval_status=state;
             out_list_data.page=1;
             out_list_show_fn();
         });
         /*出库状态*/
         /* $(".zj_jcd_ck_state_list li").die().live("click",function(){
          var library_status=$(this).data('id')
          out_list_data.library_status=library_status;
          out_list_show_fn();
          });*/
         /*归还状态*/
         $(".zj_jcd_gh_state_list li").die().live("click",function(){
             var thetype=$(this).data('id')
             out_list_data.thetype=thetype;
             out_list_data.page=1;
             out_list_show_fn();
         });
         /*刷新*/
         $(".zj_jcd_refish_btn_new").die().live("click",function(){
             if($(".zj_jcd_tab_header_info .tabhover").text()=='我发起的'){
                 out_list_data.is_invalid=1;
                 out_list_data.page=1;
                 out_list_data.num='';
                 out_list_data.key_search=''
                 out_list_data.approval_status='';
                 out_list_data.library_status='';
                 out_list_data.thetype='';
                 $(".goods_jcd_wfqd_attr_search_table input").val('待选择').css('color','#ccc');
                 out_list_show_fn();
             }
         });
         /*作废*/
         $(".zj_jcd_zf_btn_state").die().live("click",function(){
             var zfid=$(this).data('id')
             $.ajax({
                 type: 'POST',
                 url: SERVER_URL + "/lend/invalid",
                 data: {
                     token: token,
                     id:zfid
                 },
                 dataType: "json",
                 success: function (data) {
                     console.log('100033333444');
                     console.log(data);
                     console.log('100033333444');
                     if(data.code==0){
                         out_list_show_fn();
                     }else{
                         alert(data.msg);
                     }


                 }
             })
         });
         /*不显示已作废*/
         $(".zj_jcd_no_show_yzf_state").die().live("click",function(){

             if($(this).is(':checked')){
                 out_list_data.page=1;
                 out_list_data.is_invalid=1;
                 out_list_show_fn();
             }else{
                 out_list_data.page=1;
                 out_list_data.is_invalid=0;
                 out_list_show_fn();
             }
         });
         /*删除*/
         $(".zj_jcd_del_info_btn").die().live("click",function(){
             var delid=$(this).data('id')
             $(".zj_jcd_end_delete_btn").die().live("click",function(){
                 var _this=this;
                 $.ajax({
                     type: 'POST',
                     url: SERVER_URL + "/lend/del",
                     data: {
                         token: token,
                         id:delid
                     },
                     dataType: "json",
                     success: function (data) {
                         console.log('100033333444');
                         console.log(data);
                         console.log('100033333444');
                            if(data.code==0){
                                out_list_show_fn();
                                $(_this).parents('.dialog_content_delete').find('.dialog_close').click();
                            }

                     }
                 })
             });

         });
         /*查看按钮*/
         $(".zj_jcd_check_xq_btn").die().live("click",function(){

                 $(".zj_jcghd_number_show").text('');
                 $(".zj_xsbjd_number_show").html('')

             $(".slider_head_moreBox").show();
             var _this=this;
                $(".zj_ck_info_check_jcd").text('查看借出单')
             $(".zj_jcd_my_fqd_bjd_div").show();
             $(".zj_jcd_dwsp_bjd_div").hide();
             $(".zj_cswd_jrd_div").hide();
             var checkid=$(this).data('id');

             var code=$(this).data('code_sn')
             /*基本信息*/
             $("#zj_jbinfo_left_head_table").die().live("click",function(){
                 $.ajax({
                     type: 'post',
                     url: SERVER_URL + "/lend/basic",
                     data:{
                         token: token,
                         id:checkid
                     },
                     dataType: "json",
                     success: function (data) {
                         console.log('100033333');
                         console.log(data);
                         console.log('100033333');
                         $(".zj_jcd_kh_name_show_check").text(data['data']['supplier_name']);
                         $(".zj_xdr_name_show").text(data['data']['xiadan_name']);
                         $(".zj_create_time_show").text(subTime(data['data']['create_time']));
                         $(".zj_jcd_jb_info_show_nr p span").eq(0).text(data['data']['code_sn']);
                         $(".zj_jcd_jb_info_show_nr p span").eq(1).text(data['data']['supplier_name']);
                         $(".zj_jcd_jb_info_show_nr p span").eq(2).text(subTime(data['data']['expect_return_time']));
                         if(data['data']['tax_rate']==1){
                             $(".zj_jcd_jb_info_show_nr p span").eq(3).text('17%');
                         }else{
                             $(".zj_jcd_jb_info_show_nr p span").eq(3).text('无税');
                         }

                         $(".zj_jcd_jb_info_show_nr p span").eq(4).text(data['data']['note']);


                         var c_name='';
                         $.each(data['cc'],function (i,csr_name) {
                             c_name+=''+csr_name['name']+','
                         })
                         c_name = c_name.slice(0, c_name.length - 1);
                         $(".zj_jcd_jb_info_show_nr p span").eq(5).text(c_name);
                         if(data['data']['thetype']==0){
                             $(".zj_jcd_jb_info_show_nr p span").eq(6).text("-");
                             $(".zj_jcd_gd_jcgh_li_btn").hide();
                             $(".zj_jcd_gd_zf_li_btn").show()
                             $(".zj_jcd_gd_del_li_btn").show()
                         }else if(data['data']['thetype']==1){
                             $(".zj_jcd_jb_info_show_nr p span").eq(6).text("未归还");
                             $(".zj_jcd_gd_jcgh_li_btn").show();
                             $(".zj_jcd_gd_zf_li_btn").hide()
                             $(".zj_jcd_gd_del_li_btn").hide()
                         }else if(data['data']['thetype']==2){
                             $(".zj_jcd_jb_info_show_nr p span").eq(6).text("部分归还");
                             $(".zj_jcd_gd_jcgh_li_btn").show();
                             $(".zj_jcd_gd_zf_li_btn").hide()
                             $(".zj_jcd_gd_del_li_btn").hide()
                         }else if(data['data']['thetype']==3){
                             $(".zj_jcd_jb_info_show_nr p span").eq(6).text("已归还");
                             $(".zj_jcd_gd_jcgh_li_btn").hide();
                             $(".zj_jcd_gd_zf_li_btn").hide()
                             $(".zj_jcd_gd_del_li_btn").hide()
                            /*不可转销售报价单*/
                             $(".zj_jcd_my_fqd_bjd_div").hide();
                             $(".zj_jcd_dwsp_bjd_div").hide();
                             $(".zj_cswd_jrd_div").show();
                         }else{
                             $(".zj_jcd_gd_jcgh_li_btn").hide();
                             $(".zj_jcd_gd_zf_li_btn").show()
                             $(".zj_jcd_gd_del_li_btn").show()
                         }
                         $(".zj_jcd_jb_info_show_nr p span").eq(7).text(data['data']['send_time']);

                         if(data['data']['logistics_type']==1){
                             $(".zj_jcd_jb_info_show_nr p span").eq(8).text('快递');
                         }else if(data['data']['logistics_type']==2){
                             $(".zj_jcd_jb_info_show_nr p span").eq(8).text('陆运');
                         }else if(data['data']['logistics_type']==3){
                             $(".zj_jcd_jb_info_show_nr p span").eq(8).text('空运');
                         }else if(data['data']['logistics_type']==4){
                             $(".zj_jcd_jb_info_show_nr p span").eq(8).text('海运');
                         }else if(data['data']['logistics_type']==5){
                             $(".zj_jcd_jb_info_show_nr p span").eq(8).text('平邮');
                         }
                         if(data['data']['is_freight']==1){
                             $(".zj_jcd_jb_info_show_nr p span").eq(9).text('包运费');
                         }else{
                             $(".zj_jcd_jb_info_show_nr p span").eq(9).text('不包');
                         }
                         // $(".zj_jcd_jb_info_show_nr p span").eq(9).text(data['data']['is_freight']);
                         $(".zj_jcd_jb_info_show_nr p span").eq(10).text(data['data']['receiver']);
                         $(".zj_jcd_jb_info_show_nr p span").eq(11).text(data['data']['mobile']);
                         $(".zj_jcd_jb_info_show_nr p span").eq(12).text(data['data']['address']);
                         //$(".zj_jcd_jb_info_show_nr p span").eq().text(data['data']['']);
                         // if(data['data']['approval_status']==0){
                         //     $(".zj_jcd_gd_zf_li_btn").show();
                         //     $(".zj_jcd_gd_del_li_btn").show();
                         //     $(".zj_jcd_gd_jcgh_li_btn").hide();
                         // } else if(data['data']['approval_status']==1){
                         //     $(".zj_jcd_gd_zf_li_btn").show();
                         //     $(".zj_jcd_gd_del_li_btn").show();
                         //     $(".zj_jcd_gd_jcgh_li_btn").hide();
                         // }else if(data['data']['approval_status']==2){
                         //     $(".zj_jcd_gd_jcgh_li_btn").show();
                         //     $(".zj_jcd_gd_zf_li_btn").hide();
                         //     $(".zj_jcd_gd_del_li_btn").hide();
                         // }else if(data['data']['approval_status']==3){
                         //     $(".zj_jcd_gd_zf_li_btn").show();
                         //     $(".zj_jcd_gd_del_li_btn").show();
                         //     $(".zj_jcd_gd_jcgh_li_btn").hide();
                         // }


                     }
                 })

                 /*查看审批结果*/
                 $.ajax({
                     type: 'post',
                     url: SERVER_URL + "/lend/approval-result",
                     data: {
                         token: token,
                         //company_id: company_id, //公司id
                         id: checkid,//id
                         uid:uid

                     },
                     dataType: "json",
                     success: function (data) {
                         console.log('审批结果');
                         console.log(data);
                         console.log('审批结果');
                         var html='';
                         if(data.code==0){

                             $.each(data['data'],function(i,vinfo){
                                 html+='<div class="work_spiliu">'
                                 html+='<div class="work_spiliu_items" style="overflow: hidden;">';
                                 html+='<div class="left" style="position: relative;">';
                                 html+='<div class="work_spiliu_div">';
                                 if(vinfo['headpic']=='' || vinfo['headpic']==null){
                                     html+='<img class="inline_block tx" src="static/images/touxiang.png">'
                                 }else{
                                     html+='<img src="'+getImgUrl(vinfo['headpic'])+'">'
                                 }

                                 html+='<h3 class="work_sp_h3">'+likNullData(vinfo['username'])+'</h3>';
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
                                 html+='<div class="auto_height">';

                                 html+='<img src="static/images/work_jiantou.png">';

                                 html+='<div class="sp_cont">';
                                 html+='<div class="sp_cont_a">';
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
                                     html+='<p class="c_3 work_sp_p none1"></p>'
                                 }else{
                                     html+='<p class="c_3 work_sp_p">'+likNullData(vinfo['note'])+'</p>'
                                 }

                                 html+='</div>'
                                 html+='</div>'
                                 html+='<div style="clear: both;height: 0;font-size: 1px;line-height: 0px;"></div>';
                                 html+='</div>';
                                 html+='</div>'
                             })
                             $(".zj_jcd_sp_result_box").html(html);
                             if(data['is_across']==1){
                                 $(".zj_bz_is_hid").hide();
                             }else{
                                 $(".zj_bz_is_hid").show();
                             }
                         }



                     }
                 })

                 /*查看详情*/
                 $(".zj_ck_info_check_jcd").die().live("click",function(){
                     $.ajax({
                         type: 'POST',
                         url: SERVER_URL + "/lend/look-lend",
                         data: {
                             token: token,
                             //company_id: company_id, //公司id
                             id: checkid// 用户id
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
                                 $(".zj_jcd_check_xq_kh_name").text(likNullData(data['data']['supplier_name']));
                                 $(".zj_jcd_quote_look_uname").text(data['data']['xiadan_name']);
                                 $(".zj_jcd_quote_look_create_at").text(data['data']['create_time']);
                                 $(".zj_look_info_header_content .zj_jcd_bh_show_info").eq(0).text(data['data']['code_sn']);
                                 $(".zj_look_info_header_content .zj_jcd_bh_show_info").eq(1).text(data['data']['supplier_name']);
                                 $(".zj_look_info_header_content .zj_jcd_bh_show_info").eq(2).text(data['data']['expect_return_time']);
                                 $(".zj_look_info_header_content .zj_jcd_bh_show_info").eq(3).text(data['data']['send_time']);
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
                                                <td>'+likNullData(v2['good_num'])+''+v2['good_unit']+'</td>\
                                                <td>'+likNullData(v2['good_price'])+'</td>\
                                                <td>'+likNullData(v2['good_rate_price'])+'</td>\
                                                <td>'+likNullData(v2['good_total'])+'</td>\
                                                <td></td>\
                                                </tr>'
                                     })

                                 })
                                 $(".zj_jcd_goods_table_content_info").html(html);
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
                                                <td>'+likNullData(v3['sing_num'])+''+v3['good_unit']+'</td>\
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
                                    <td>'+likNullData(arr['num'])+''+arr['good_unit']+'</td>\
                                    <td>'+likNullData(arr['price'])+'</td>\
                                    <td>'+likNullData(arr['containing_money'])+'</td>\
                                    <td class="zj_pzzj_goods_sum_price">'+likNullData(arr['total_money'])+'</td>\
                                    <td><button class="but_mix box_open_btn_1 but_blue_1">展开</button></td>\
                                </tr>\
                            </tbody>\
                            </table>\
                            </div>\
                            <div class="xs_tc_goods_box goods_tc_toggle" style="display: none;">'+setting+'</div>'

                                 })


                                 $(".tanceng .zj_jcd_complete_goods_dv_content").html(complete);
                                 var z_sum=0;
                                 $(".tanceng .zj_jcd_complete_goods_dv_content .zj_pzzj_goods_sum_price").each(function () {
                                     z_sum+=parseFloat($(this).text());
                                 })
                                 $(".zj_jcd_complete_goods_price_sum").text(z_sum);
                             }

                         }
                     })

                 });
                 /*转销售报价单*/
                 $(".zj_jcd_check_info_zxs_bjd").die().live("click",function(){
                     $(".tanceng .xs_xsbjd_bjd_box .xs_xsbjd_box_ul ul li").eq(0).css({'background':'#32a0f6','border-color':'#32a0f6','color':'#fff'})
                     var zxs_this=this;
                     new_number('.zj_xs_quote_create_code','XBJ')

                     var id=$(this).data('id');
                     var code=$(this).data('code_sn');//借入单编号
                     var supplier_name=$(this).data('supplier_name');//客户name
                     var supplier_id=$(this).data('supplier_id');//客户id

                     $(".zj_xs_quote_create_choose_lend_inp").val(code);
                     $(".zj_xs_quote_create_choose_customer_inp").val(supplier_name);

                     if($(".tanceng .zj_xs_quote_create_tax_num_inp").val()=='含税17%'){

                         $(".tanceng .zj_z_xs_tax_content").text('含税17%');
                     }else{
                         $(".tanceng .zj_z_xs_tax_content").text('无税');
                     }
                     $(".zj_zxs_tax_list_li li").die().live("click",function(){
                         var dj=$(".tanceng .zj_xs_create_product_cost_total").val();


                         if($(".tanceng .zj_xs_quote_create_tax_num_inp").val()=='含税17%'){
                             var sl=parseFloat(dj)*0.17
                             $(".tanceng .zj_z_xs_tax_content").text('含税17%');

                             $(".zj_xs_create_tax_total").val(sl.toFixed(2));
                             var zprice=$(".tanceng .zj_xs_quote_create_cost_tax_total").text();
                             var z_price=parseFloat(zprice)+sl
                             $(".zj_xs_quote_create_cost_tax_total").text(z_price.toFixed(2));
                         }else{
                             $(".tanceng .zj_z_xs_tax_content").text('无税');
                             var ws=$(".zj_xs_create_tax_total").val();

                             var zj=$(".tanceng .zj_xs_quote_create_cost_tax_total").text();
                             var z_sum=parseFloat(zj)-parseFloat(ws)
                             $(".zj_xs_quote_create_cost_tax_total").text(z_sum.toFixed(2));
                             $(".zj_xs_create_tax_total").val('0');
                         }
                     });

                     /*审批人获取*/
                     $.ajax({
                         type: 'POST',
                         url: SERVER_URL + "/borrow/get-approval-type",
                         data: {
                             token: token,
                             company_id: company_id, //公司id
                             uid: uid, // 用户id
                             category: 1,// 分类id 1合同管理,2采购,3借入借出
                             type_id: 2, // 类型(1销售合同,2采购合同,3员工合同,4其他合同,5采购报价单,6采购退换货,7借入单,8借出单,9归还单,10,归还单(借入归还),11(借出归还)
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


                                 $(".zj_xs_quote_create_flow_list").html(html);
                                 $(".zj_xs_quote_create_flow_list li:last-child").find('i').hide();
                             }else{
                                 alert(data.msg);
                             }

                         }
                     })

                     /*查看借出商品*/
                     $.ajax({
                         type: 'POST',
                         url: SERVER_URL + "/lend/look-lend",
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

                                 $(".ven_sell_quote_create_time").text(data['data']['create_time']);
                                 $(".ven_sell_quote_create_uname").text(data['data']['xiadan_name']);
                                 // $(".zj_xs_create_product_cost_total").val(data['data']['unit_price_total']);
                                 // $(".zj_xs_create_tax_total").val(data['data']['tax_total']);
                                 // $(".sell_quote_create_other_fee").val(data['data']['other_costs']);
                                 // $(".zj_xs_quote_create_cost_tax_total").text(data['data']['all_money']);

                                 if(data['data']['goods']){
                                     var goods='';
                                     $.each(data['data']['goods'],function(i,v){
                                         $.each(v,function(i2,v2){
                                             goods+='<tr>\
                                                    <td><input type="checkbox" data-id="'+v2['id']+'" data-good_id="'+v2['good_id']+'" data-good_unit="'+v2['good_unit']+'" data-good_num="'+v2['good_num']+'" data-good_rate="'+v2['good_rate']+'"></td>\
                                                    <td>'+likNullData(v2['good_name'])+'</td>\
                                                    <td>'+likNullData(v2['good_sn'])+'</td>\
                                                    <td>'+likNullData(v2['good_attr'])+'</td>\
                                                    <td>'+likNullData(v2['good_unit'])+'</td>\
                                                    <td>'+likNullData(v2['good_num'])+'</td>\
                                                    <td>'+likNullData(v2['good_price'])+'</td>\
                                                    <td>'+likNullData(v2['good_rate'])+'</td>\
                                                    <td>'+likNullData(v2['good_rate_price'])+'</td>\
                                                    <td>'+likNullData(v2['good_total'])+'</td>\
                                                    </tr>'
                                         })

                                     })
                                     $(".zj_xs_quote_create_chosen_goods_tbody").html(goods);
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
                                                <td><input type="checkbox" disabled="disabled" data-id="'+v3['id']+'" data-good_attr="'+v3['good_attr']+'" data-sing_num="'+v3['sing_num']+'" data-return_num="'+v3['return_num']+'" data-good_id="'+v3['good_id']+'" data-good_rate="'+v3['good_rate']+'" data-good_unit="'+v3['good_unit']+'"></td>\
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
                                                        <td><input type="checkbox" data-id="'+arr['id']+'" data-good_attr="'+arr['good_attr']+'" data-goods_id="'+arr['goods_id']+'" data-num="'+arr['num']+'" data-good_unit="'+arr['good_unit']+'" data-containing_rate="'+arr['containing_rate']+'"></td>\
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

                                     $(".tanceng .zj_xs_quote_create_choose_setting_box_list").html(complete);
                                     /*勾选普通商品*/
                                     // var x_p_price=0;
                                     //var x_z_price=0
                                     $(".tanceng .zj_xs_quote_create_chosen_goods_tbody input").die().live("click",function(){
                                         //var goods_price=0

                                         if($(this).is(':checked')){
                                             var one_price=parseFloat($(this).parents('tr').find('td').eq(6).text());
                                             var down_price=parseFloat($(".zj_xs_create_product_cost_total").val());

                                             var x_p_price=one_price+down_price;
                                             var goods_price=parseFloat(x_p_price);
                                             /*单价*/
                                             $(".zj_xs_create_product_cost_total").val(goods_price);
                                             /*税率*/
                                             if($(".zj_xs_quote_create_tax_num_inp").val()=='含税17%'){
                                                 var tax_x=parseFloat(goods_price*0.17)
                                                 $(".zj_xs_create_tax_total").val(tax_x.toFixed(2));
                                             }else{
                                                 $(".zj_xs_create_tax_total").val(0);
                                             }
                                             /*总额*/
                                             var tax_ze=$(".zj_xs_create_tax_total").val();//税额
                                             var qt_znump=$(".sell_quote_create_other_fee").val();//其他
                                             var zsum_price=goods_price+parseFloat(tax_ze)+parseFloat(qt_znump);
                                             $(".zj_xs_quote_create_cost_tax_total").text(zsum_price.toFixed(2));

                                         }else{
                                             var one_p=parseFloat($(this).parents('tr').find('td').eq(6).text());
                                             var down_p=parseFloat($(".zj_xs_create_product_cost_total").val());

                                             var znum_price=parseFloat(down_p-one_p)
                                             $(".zj_xs_create_product_cost_total").val(znum_price);
                                             /*税率*/
                                             if($(".zj_xs_quote_create_tax_num_inp").val()=='含税17%'){
                                                 var tax=parseFloat(znum_price*0.17)
                                                 $(".zj_xs_create_tax_total").val(tax.toFixed(2));
                                             }else{
                                                 $(".zj_xs_create_tax_total").val(0);
                                             }
                                             /*总额*/
                                             var tax_ze1=$(".zj_xs_create_tax_total").val();//税额
                                             var qt_znum=$(".sell_quote_create_other_fee").val();//其他
                                             var zsum_price1=znum_price+parseFloat(tax_ze1)+parseFloat(qt_znum);
                                             $(".zj_xs_quote_create_cost_tax_total").text(zsum_price1.toFixed(2));
                                         }

                                     });
                                     /*其他事件*/
                                     $(".sell_quote_create_other_fee").die().live("keyup",function(){
                                         /*总额*/
                                         var dj_ze=$(".zj_xs_create_product_cost_total").val();
                                         var dj_se=$(".zj_xs_create_tax_total").val();//税额
                                         var qt_znumc=$(this).val();//其他
                                         var zsum_price=parseFloat(dj_ze)+parseFloat(dj_se)+parseFloat(qt_znumc);
                                         $(".zj_xs_quote_create_cost_tax_total").text(zsum_price.toFixed(2));
                                     });
                                     //整机商品父级勾选
                                     $('.tanceng .zj_xs_quote_create_choose_setting_box_list .xs_div_2 input').die('click').live('click', function () {
                                         if ($(this).is(':checked')) {
                                            var x_z_price=parseFloat($(this).parents('tr').find('td').eq(5).text());
                                             var x_z_down=parseFloat($(".zj_xs_create_product_cost_total").val());
                                             var goods_price=parseFloat(x_z_down+x_z_price);
                                             $(".zj_xs_create_product_cost_total").val(goods_price);
                                             /*税率*/
                                             if($(".zj_xs_quote_create_tax_num_inp").val()=='含税17%'){
                                                 var tax=parseFloat(goods_price*0.17)
                                                 $(".zj_xs_create_tax_total ").val(tax.toFixed(2));
                                             }else{
                                                 $(".zj_xs_create_tax_total ").val(0);
                                             }

                                             /*总额*/
                                             var tax_ze1=$(".zj_xs_create_tax_total").val();//税额
                                             var qt_znumz=$(".sell_quote_create_other_fee").val();//其他
                                             var zsum_price=goods_price+parseFloat(tax_ze1)+parseFloat(qt_znumz);
                                             $(".zj_xs_quote_create_cost_tax_total").text(zsum_price.toFixed(2));
                                             $(this).parents('.xs_div_2').next('.xs_xsbjd_table_t2').find('input').attr('checked', true);
                                         } else {
                                             $(this).parents('.xs_div_2').next('.xs_xsbjd_table_t2').find('input').attr('checked', false);
                                             //$(this).closest('.takenote_setting_list_one').find('input').val(0);

                                             var num1=$(".zj_xs_create_product_cost_total").val();
                                             var d_num1=parseFloat($(this).parents('tr').find('td').eq(5).text());
                                             var set_price=parseFloat(num1-d_num1);
                                             $(".zj_xs_create_product_cost_total").val(set_price.toFixed(2));
                                             /*税率*/
                                             if($(".zj_xs_quote_create_tax_num_inp").val()=='含税17%'){
                                                 var tax1=parseFloat(set_price*0.17)
                                                 $(".zj_xs_create_tax_total").val(tax1.toFixed(2));
                                             }else{
                                                 $(".zj_xs_create_tax_total").val(0);
                                             }
                                             /*总额*/
                                             var tax_z=$(".zj_xs_create_tax_total").val();//税额
                                             var qt_znumc=$(".sell_quote_create_other_fee").val();//其他
                                             var zsum_p=set_price+parseFloat(tax_z)+parseFloat(qt_znumc);
                                             $(".zj_xs_quote_create_cost_tax_total").text(zsum_p.toFixed(2));
                                         }
                                     });

                                 }
                             }

                         }
                     });
                     var xsbjd_data={
                         token: token,
                         code_sn:'',
                         lend_id:'',
                         customer_id:'',
                         tax_rate:'',
                         is_freight:'',
                         logistics_type:'',
                         flow:'',
                         goods:'',
                         setting:'',
                         customer_name:''


                     }
                     /*****************转销售确定but*/
                     $(".tanceng .zj_xs_quote_create_submit").die().live("click",function(){
                         var _this=this;
                         xsbjd_data.code_sn=$(".tanceng .zj_xs_quote_create_code").val();
                         xsbjd_data.lend_id=id;
                         xsbjd_data.customer_id=supplier_id;
                         xsbjd_data.customer_name=supplier_name;
                         if($(".tanceng .zj_xs_quote_create_tax_num_inp").val()=='含税17%'){
                             xsbjd_data.tax_rate=1;
                         }else{
                             xsbjd_data.tax_rate=0;
                         }
                         if($(".tanceng .zj_xs_quote_create_freight_checkbox").is(':checked')){
                             xsbjd_data.is_freight=1;
                         }else{
                             xsbjd_data.is_freight=2;
                         }
                         if($(".tanceng .zj_xs_quote_create_choose_logistics_inp").val()=='快递'){
                             xsbjd_data.logistics_type=1;
                         }else if($(".tanceng .zj_xs_quote_create_choose_logistics_inp").val()=='陆运'){
                             xsbjd_data.logistics_type=2;
                         }else if($(".tanceng .zj_xs_quote_create_choose_logistics_inp").val()=='空运'){
                             xsbjd_data.logistics_type=3;
                         }else if($(".tanceng .zj_xs_quote_create_choose_logistics_inp").val()=='平邮'){
                             xsbjd_data.logistics_type=4;
                         }else if($(".tanceng .zj_xs_quote_create_choose_logistics_inp").val()=='海运'){
                             xsbjd_data.logistics_type=5;
                         }

                         xsbjd_data.money_sum=$(".tanceng .zj_xs_create_product_cost_total").val();
                         xsbjd_data.tax_money_sum=$(".tanceng .zj_xs_create_tax_total").val();
                         xsbjd_data.other_free= $(".tanceng .sell_quote_create_other_fee").val();
                         xsbjd_data.totals=$(".tanceng .zj_xs_quote_create_cost_tax_total").text();
                         if($(".tanceng .zj_xs_quote_create_note_textarea").val()=='请输入备注'){
                             xsbjd_data.note='';
                         }else{
                             xsbjd_data.note=$(".tanceng .zj_xs_quote_create_note_textarea").val();
                         }


                         var xs_spr=[];
                         $(".tanceng .zj_xs_quote_create_flow_list .zj_spr_num").each(function(){
                             xs_spr.push($(this).data('id'));
                         })
                         xsbjd_data.flow=xs_spr.toString();
                         /*商品*/
                         var jrgh_goods=[];
                         var xs_pt_goods={};
                         $(".tanceng .zj_xs_quote_create_chosen_goods_tbody tr input").each(function(i){
                             if($(this).is(':checked')){
                                 jrgh_goods.push({
                                     good_id:$(this).data('id'),
                                     good_name:$(this).parents('tr').find('td').eq(2).text(),
                                     good_sn:$(this).parents('tr').find('td').eq(1).text(),
                                     good_attr: $(this).parents('tr').find('td').eq(3).text(),
                                     good_unit:$(this).data('good_unit'),
                                     good_num:$(this).data('good_num'),
                                     good_price:$(this).parents('tr').find('td').eq(6).text(),
                                     good_rate:$(this).data('good_rate'),
                                     good_rate_price:$(this).parents('tr').find('td').eq(8).text(),
                                     good_total:$(this).parents('tr').find('td').eq(9).text()
                                 })
                             }
                         })
                         xs_pt_goods.goods=jrgh_goods;
                         xs_pt_goods.sum_total = $('.tanceng .zj_jcd_goods_hj_sum').html();// 普通商品总价额
                         var jrgh_goods_info=JSON.stringify(xs_pt_goods);
                         xsbjd_data.goods=jrgh_goods_info;
                         /*整机商品*/
                         var zj_goods=[];
                         var xs_goods_info={};
                         $(".tanceng .zj_xs_quote_create_choose_setting_box_list .xs_div_2 tbody input").each(function (i) {
                             var match_goods=[];
                             if($(this).is(':checked')){
                             $(".tanceng .zj_xs_quote_create_choose_setting_box_list .xs_xsbjd_table_t2").eq(i).find('thead').each(function(i2){
                                 var pz_goods=[];
                                 $(".tanceng .zj_xs_quote_create_choose_setting_box_list .xs_xsbjd_table_t2 table tbody").eq(i2).find('input:checkbox').each(function (i3) {

                                         pz_goods.push({
                                             good_id: $(this).data('id'),
                                             good_sn: $(this).parents('tr').find('td').eq(1).text(),
                                             good_attr: $(this).data('good_attr'),
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
                                     setting_attr:$(this).data('good_attr'),
                                     setting_num:$(this).data('num'),
                                     setting_price:$(this).parents('tr').find('td').eq(5).text(),
                                     setting_rate:$(this).data('containing_rate'),
                                     setting_rate_price:$(this).parents('tr').find('td').eq(6).text(),
                                     setting_total:$(this).parents('tr').find('td').eq(7).text(),
                                     good_list:match_goods
                                 })
                             }
                         })
                         // var jcd_goods_info=JSON.stringify(jrgh_goods);
                         // var jcd_goods_zj=JSON.stringify(zj_goods);
                         // xsbjd_data.goods=jcd_goods_info;
                         // xsbjd_data.setting=jcd_goods_zj;
                         xs_goods_info.setting=zj_goods;
                         xs_goods_info.sum_total=$(".tanceng .zj_jcd_complete_goods_price_sum").text();
                         var jrgh_goods_zj=JSON.stringify(xs_goods_info);
                         xsbjd_data.setting=jrgh_goods_zj;
                         /*转商品数量*/
                         var goods_sum=0;
                         $(".tanceng .zj_xs_quote_create_chosen_goods_tbody input").each(function(){
                             if($(this).is(":checked")){
                                 goods_sum+=parseFloat($(this).data('good_num'));
                             }

                         })
                         /*转整机数量*/
                         var zj_sum=0;
                         $(".tanceng .zj_xs_create_link_lend_setting .xs_div_2 tbody input").each(function(){
                             if($(this).is(":checked")){
                                 zj_sum+=parseFloat($(this).data('num'));
                             }

                         })
                         $.ajax({
                             type: 'post',
                             url: SERVER_URL + "/quote/add",
                             data: xsbjd_data,
                             dataType: "json",
                             success: function (data) {
                                 console.log('300');
                                 console.log(data);
                                 console.log('300');
                                 if(data.code==0){
                                     $(_this).parents('.dialog_content_middle5').find('.dialog_close').click();
                                     $.ajax({
                                         type: 'post',
                                         url: SERVER_URL + "/lend/to-quote",
                                         data: {
                                             token: token,
                                             id:id,
                                             good_lend_num:goods_sum,
                                             computer_lend_num:zj_sum
                                         },
                                         dataType: "json",
                                         success: function (data) {
                                             console.log('3003');
                                             console.log(data);
                                             console.log('3003');
                                             if(data.code==0){
                                                 $(zxs_this).parents('.dialog_content_middle5').find('.dialog_close').click();
                                             }
                                         }
                                     })


                                 }
                             }
                         })
                     });
                 });

             });
             $("#zj_jbinfo_left_head_table").trigger('click');
             /*借出归还单详情*/
             $("#zj_jcghd_left_head_table").die().live("click",function(){
                 $.ajax({
                     type: 'GET',
                     url: SERVER_URL + "/lend-out/list",
                     data: {
                         token: token,
                         lend_id:checkid
                     },
                     dataType: "json",
                     success: function (data) {
                         console.log('100033333444');
                         console.log(data);
                         console.log('100033333444');

                             $(".zj_jcghd_number_show").text('('+data['totalcount']+')');

                         var info=''
                         $.each(data['dataList'],function(i,jcd_info){
                             info+=' <div class="takenote_jrd_jcgh">\
                               <div class="d-r-t-h sbar">\
                               <h3 class="cont_title">基本信息</h3>\
                               <p class="l-s-x">借出归还单编号：<span>'+jcd_info['code_sn']+'</span></p>\
                               <p class="l-s-x">借出单编号：<span>'+jcd_info['lend_code_sn']+'</span></p>\
                               <p class="l-s-x">客户：<span>'+jcd_info['customer_name']+'</span></p>\
                               </div>\
                               <div class="d-r-t-h sbar">\
                                   <h3 class="cont_title">入库信息</h3>\
                                   <p class="l-s-x">入库日期：<span>'+jcd_info['in_time']+'</span></p>\
                               </div>\
                               <div class="d-r-t-h sbar" style="padding-bottom: 40px;">\
                               <h3 class="cont_title">借出归还商品</h3>\
                               <p class="l-s-x" style="margin-bottom: 30px;"><span style="margin-left: -5px;"><button data-id="'+jcd_info['id']+'" class="but_blue but_small val_dialog zj_jcd_check_jcgh_info_btn" name="takenote_jcd_look_jbghd">查看借出归还单</button></span></p>\
                               </div>\
                           </div>'
                         })
                         $(".zj_jcd_jrghd_info_box").html(info);

                     }
                 })
                 /*详情*/

             });
             /*查看详情*/
             $(".zj_jcd_check_jcgh_info_btn").die().live("click",function(){
                 var gh_id=$(this).data('id');
                 $.ajax({
                     type: 'POST',
                     url: SERVER_URL + "/lend/look-lend",
                     data: {
                         token: token,
                         //company_id: company_id, //公司id
                         id: checkid// 用户id
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
                             $(".zj_jcd_jcgh_kh_name_show").text(data['data']['supplier_name']);
                             $(".zj_jcgh_quote_look_create_at").text(data['data']['xiadan_name']);
                             $(".zj_jcgh_quote_look_uname").text(data['data']['create_time']);
                             $(".zj_jcgh_info_header_content .zj_info_show").eq(0).text(data['data']['code_sn']);
                             $(".zj_jcgh_info_header_content .zj_info_show").eq(1).text(data['data']['supplier_name']);
                             $(".zj_jcgh_info_header_content .zj_info_show").eq(2).text(data['data']['expect_return_time']);
                             $(".zj_jcgh_info_header_content .zj_info_show").eq(3).text(data['data']['send_time']);


                             // $(".zj_look_info_header_content .zj_jcd_bh_show_info").eq(6).text(data['data']['receiver']);
                             // $(".zj_look_info_header_content .zj_jcd_bh_show_info").eq(7).text(data['data']['mobile']);
                             // $(".zj_look_info_header_content .zj_jcd_bh_show_info").eq(8).text(data['data']['address']);
                             // $(".zj_look_info_header_content .zj_jcd_bh_show_info").eq(9).text(data['data']['note']);

                             // if(data['data']['goods']['sum_total']){
                             //     $(".tanceng .xs_bjd_bold .zj_jcd_goods_hj_sum").text(data['data']['goods']['sum_total']);
                             // }
                             /*  if(data['data']['setting']['sum_total']){
                              $(".xs_bjd_bold .zj_jcd_complete_goods_price_sum").text(data['data']['setting']['sum_total']);
                              }*/


                             /*ff*/
                             $(".zj_jcd_unit_price_hj").text(data['data']['unit_price_total']);
                             $(".zj_jcd_contain_tax").text(data['data']['tax_total']);
                             $(".zj_jcd_other_cost").text(data['data']['other_costs']);
                             $(".zj_jcd_sum_price_num").text(data['data']['all_money']);


                             var html='';
                             $.each(data['data']['goods'],function(i,v){
                                 $.each(v,function(i2,v2){
                                     html+='<tr>\
                            <td>'+likNullData(v2['good_sn'])+'</td>\
                            <td>'+likNullData(v2['good_name'])+'</td>\
                            <td>'+likNullData(v2['good_attr'])+'</td>\
                            <td>'+likNullData(v2['good_num'])+''+v2['good_unit']+'</td>\
                            <td>'+likNullData(v2['return_num'])+''+v2['good_unit']+'</td>\
                            <td></td>\
                            </tr>'
                                 })

                             })
                             $(".zj_check_jrghd_pt_goods_info").html(html);
                             /*整机商品*/

                             var complete='';
                             $.each(data['data']['setting'],function(i,arr){
                                 var setting='';
                                 if(arr['good_list']){
                                     $.each(arr['good_list'],function(i2,v2){
                                         var setting_goods=''
                                         if(v2['attr_list']){
                                             $.each(v2['attr_list'],function(i3,v3){
                                                 setting_goods+='<tr>\
                                                <td>'+likNullData(v3['good_sn'])+'</td>\
                                                <td>'+likNullData(v3['good_attr'])+'</td>\
                                                <td>'+likNullData(v3['sing_num'])+''+v3['good_unit']+'</td>\
                                                <td>'+likNullData(v3['return_num'])+''+v3['good_unit']+'</td>\
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
                               <th width="120">名称</th>\
                               <th width="240">属性</th>\
                               <th width="70">借出数量</th>\
                               <th width="70">归还数量</th>\
                               <th width="60">配件</th>\
                            </tr>\
                            </thead>\
                            <tbody>\
                                <tr class="c_3 c_3 xs_bjd_bold">\
                                    <td>'+likNullData(arr['good_sn'])+'</td>\
                                    <td>'+likNullData(arr['good_name'])+'</td>\
                                    <td>'+likNullData(arr['good_attr'])+'</td>\
                                    <td>'+likNullData(arr['num'])+''+arr['good_unit']+'</td>\
                                    <td>'+likNullData(arr['return_num'])+''+arr['good_unit']+'</td>\
                                    <td><button class="but_mix box_open_btn_1 but_blue_1">展开</button></td>\
                                </tr>\
                            </tbody>\
                            </table>\
                            </div>\
                            <div class="xs_tc_goods_box goods_tc_toggle" style="display: none;">'+setting+'</div>'

                             })


                             $(".tanceng .zj_check_jrghd_complate_info").html(complete);
                             // var z_sum=0;
                             // $(".tanceng .zj_jcd_complete_goods_dv_content .zj_pzzj_goods_sum_price").each(function () {
                             //     z_sum+=parseFloat($(this).text());
                             // })
                             // $(".zj_jcd_complete_goods_price_sum").text(z_sum);
                         }

                     }
                 })
             });
             /*销售报价单*/
             $("#zj_xsbjd_left_head_table").die().live("click",function(){
                 $.ajax({
                     type: 'post',
                     url: SERVER_URL + "/lend/quote",
                     data:{
                         token: token,
                         id:checkid
                     },
                     dataType: "json",
                     success: function (data) {
                         console.log('606');
                         console.log(data);
                         console.log('606');

                             $(".zj_xsbjd_number_show").html('('+data['data'].length+')')

                         var xs_list='';
                         $.each(data['data'],function(i,vlist){
                             xs_list+='<div class="takenote_jrd_jcgh">\
                                 <div class="d-r-t-h sbar">\
                                 <h3 class="cont_title">基本信息</h3>\
                                 <p class="l-s-x">销售订单编号：<span>'+likNullData(vlist['quote_code_sn']) +'</span></p>\
                                 <p class="l-s-x">客户：<span>'+likNullData(vlist['customer_name'])+'</span></p>\
                                 <p class="l-s-x">销售合同：<span>'+likNullData(vlist['contract_id'])+'</span></p>\
                                 <p class="l-s-x">销售报价单：<span>'+likNullData(vlist['code_sn'])+'</span></p>\
                                 <p class="l-s-x">负责部门：<span>'+likNullData(vlist['dept_name'])+'</span></p>\
                                 <p class="l-s-x">负责人：<span>'+likNullData(vlist['owner_name'])+'</span></p>\
                                 </div>\
                                 </div>'
                         })
                         $(".zj_xsbjd_info_xq_dv_show").html(xs_list);


                     }
                 })
             });
             /**********出库单***************/
             $("#zj_ckd_left_head_table").die().live("click",function () {
                 $.ajax({
                     type: 'get',
                     url: SERVER_URL + "/borrow-out/stockoutinfo",
                     data:{
                         token: token,
                         related_receipts_no:code
                     },
                     dataType: "json",
                     success: function (data) {
                         console.log('60666');
                         console.log(data);
                         console.log('60666');
                         if(data['data']['shipments_status']==1){
                             $(".zj_jcd_fh_state_name").text('待发货');
                         }else if(data['data']['shipments_status']==2){
                             $(".zj_jcd_fh_state_name").text('部分发货');
                         }else if(data['data']['shipments_status']==3){
                             $(".zj_jcd_fh_state_name").text('完成发货');
                         }
                         if(data['data']['stockingOutList']['output_num']){
                             $(".zj_zcd_order_look_skjl_tbody_nodata_box").hide()
                             var rk_info='<tr class="table_total ven_sell_order_look_skjl_tbody_table_total">\
                            <td>'+data['data']['stockingOutList']['output_num']+'</td>\
                            <td>'+data['data']['stockingOutList']['distribution_num']+'</td>\
                            <td>'+data['data']['stockingOutList']['set_num']+'</td>\
                            <td>'+data['data']['stockingOutList']['combo_set_num']+'</td>\
                            <td>'+data['data']['stockingOutList']['is_package_freight']+'</td>\
                            <td>'+data['data']['stockingOutList']['distribution_name']+'</td>\
                            </tr>'
                             $(".zj_goods_ckd_order_look_skjl_tbody").html(rk_info);
                         }else{
                             $(".zj_goods_ckd_order_look_skjl_tbody").empty();
                             $(".zj_zcd_order_look_skjl_tbody_nodata_box").show();
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
                             $(".zj_goods_jcd_order_look_skjl_tbody").html(kf_goods);
                         }else{
                             $(".zj_goods_jcd_order_look_skjl_tbody").empty();
                             $(".zj_jcd_order_look_skjl_tbody_nodata_box").show();
                         }

                         var wl_list='';
                         $.each(data['data']['logisticsList'],function(i,list){
                             wl_list+='<div class="takenote_jrgh_look_div">\
                           <div class="left">\
                           <p class="l-s-x c_3">物流公司：<span>'+list['logistics_name']+'</span></p>\
                           <p class="l-s-x c_3">物流单号：<span>'+list['logistics_sn']+'</span></p>\
                           </div>\
                           <div class="right"><button class="but_small but_blue val_dialog zj_check_fh_goods_info" data-logistics_name="'+list['logistics_name']+'" data-logistics_sn="'+list['logistics_sn']+'" name="takenote_look_jcd_goods">查看发货商品</button></div>\
                           </div>'
                         })
                         $(".zj_jcd_fh_state_show_div").html(wl_list);
                     }
                 })

             });
             /*查看发货商品*/
             $(".zj_check_fh_goods_info").die().live("click",function(){
                 var logistics_sn=$(this).data('logistics_sn');
                 var logistics_name=$(this).data('logistics_name');
                 $.ajax({
                     type: 'get',
                     url: SERVER_URL + "/stock-out/shipmentsdetail",
                     data: {
                         token: token,
                         logistics_sn: logistics_sn
                     },
                     dataType: "json",
                     success: function (data) {
                         console.log('60666');
                         console.log(data);
                         console.log('60666');
                         $(".zj_fh_quote_look_create_at").text(data['data']['create_time']);
                         $(".zj_fh_quote_look_uname").text(data['data']['shipments_name']);
                         $(".zj_gl_wl_danhao").text(data['data']['related_receipts_no']);
                         $(".zj_wl_gs_name").text(logistics_name);
                         $(".zj_wl_d_number").text(data['data']['number']);
                         var complate_goods=''
                         $.each(data['data']['productList'],function(i,goods){
                             complate_goods+='<tr class="c_3">\
                            <td>'+repair(i+1)+'</td>\
                            <td>'+goods['code_sn']+'</td>\
                            <td>'+goods['product_name']+'</td>\
                            <td>'+goods['attr_name']+'</td>\
                            <td>'+goods['shipments_num']+'</td>\
                            </tr>';
                         })
                         $(".zj_check_fh_goods_content").html(complate_goods);
                     }
                 })
             });

             /*更多*/
             /*借出归还*/
             $(".zj_jcd_gd_jcgh_li_btn").die().live("click",function(){
                 $(_this).parents('tr').find('.zj_jcd_jcgh_btn_check').click();
             });
             /*作废*/
            $(".zj_jcd_gd_zf_li_btn").die().live('click',function(){
                $(_this).parents('tr').find('.zj_jcd_zf_btn_state').click();
            });
             /*删除*/
             $(".zj_jcd_gd_del_li_btn").die().live('click',function(){
                 $(_this).parents('tr').find('.zj_jcd_del_info_btn').click();
             });
         });
         /*借出归还*/
         $(".zj_jcd_jcgh_btn_check").die().live("click",function(){
             $('.tanceng .xs_shd_box_ul .headlist li').eq(0).css({'background':'#32a0f6','border-color':'#32a0f6','color':'#fff'});
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
             var send_time1=$(this).data('send_time');
             var name1=$(this).data('name');
             var uid=$(this).data('uid');
             $('.zj_create_time_dat_show').text(send_time1);
             $('.zj_jcd_create_person_name').text(name1);
             /*借入归还编号*/
             new_number('.zj_jcd_jcgh_bh_num_val','JCGH');
             var back_id=$(this).data('id');
             var code=$(this).data('code_sn');//借出单编号
             var supplier_name=$(this).data('supplier_name');//客户
             var supplier_id=$(this).data('supplier_id');//客户id
             $(".zj_jcd_jcbh_num_val").val(code);
             $(".zj_jcd_kh_info_name").val(supplier_name);
             //整机商品父级勾选
             // $('.tanceng .takenote_setting_list input.takenote_create_setting_parent_checkbox').die('click').live('click', function () {
             //     if ($(this).is(':checked')) {
             //         $(this).closest('.takenote_setting_list_one').find('.takenote_create_setting_child_checkbox').attr('checked', true);
             //     } else {
             //         $(this).closest('.takenote_setting_list_one').find('.takenote_create_setting_child_checkbox').attr('checked', false);
             //         $(this).closest('.takenote_setting_list_one').find('input').val(0);
             //     }
             // });
             /*查看借入商品*/
             $.ajax({
                 type: 'POST',
                 url: SERVER_URL + "/lend/look-lend",
                 data: {
                     token: token,
                     //company_id: company_id, //公司id
                     id: back_id  // id

                 },
                 dataType: "json",
                 success: function (data) {
                     console.log('2000111222');
                     console.log(data);
                     console.log('2000111222');
                     var goods='';
                     if(data.code==0){
                         if(data['data'].length==0){
                             return true;
                         }
                         $.each(data['data']['goods'],function(i,v){
                             $.each(v,function(i2,v2){
                                 goods+='<tr>\
                            <td><input type="checkbox" data-id="'+v2['id']+'" data-good_num="'+v2['good_num']+'" data-good_id="'+v2['good_id']+'"></td>\
                            <td>'+likNullData(v2['good_sn'])+'</td>\
                            <td>'+likNullData(v2['good_name'])+'</td>\
                            <td>'+likNullData(v2['good_attr'])+'</td>\
                            <td>'+likNullData(v2['good_num'])+''+v2['good_unit']+'</td>\
                            <td><div class="xs_num_input num_input inline_block num_input_new"><button class="but_grey_a but_opa_small inp_plus ven_sell_quote_productnum_change">+</button><input type="text" class="productnum" maxnum="' + (parseFloat(v2['good_num']) - parseFloat(v2['return_num'])) + '" value="' + (parseFloat(v2['good_num']) - parseFloat(v2['return_num'])) + '"><button class="but_grey_a but_opa_small radius_left_0 inp_reduce ven_sell_quote_productnum_change">-</button></div></td>\
                            </tr>'
                             })

                         })
                         $(".zj_jcd_select_jcgh_goods_content_tbody").html(goods);
                         var complete='';

                         $.each(data['data']['setting'],function(i,arr){
                             var setting='';
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
                                                <td>'+likNullData(v3['sing_num'])+''+v3['good_unit']+'</td>\
                                                <td><div class="xs_num_input num_input inline_block num_input_new"><button class="but_grey_a but_opa_small inp_plus ven_sell_quote_productnum_change">+</button><input type="text" class="productnum" maxnum="' + (parseFloat(v3['sing_num']) - parseFloat(v3['return_num'])) + '" value="' + (parseFloat(v3['sing_num']) - parseFloat(v3['return_num'])) + '"><button class="but_grey_a but_opa_small radius_left_0 inp_reduce ven_sell_quote_productnum_change">-</button></div></td>\
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
                                    <th width="370">属性</th>\
                                    <th width="65">借出数量</th>\
                                    <th width="88">归还数量</th>\
                                    <th></th>\
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
                                    <td><div class="xs_num_input num_input inline_block num_input_new"><button class="but_blue but_opa_small inp_plus sell_quote_create_package_num_change">+</button><input type="text" value="' + (parseFloat(arr['num']) - parseFloat(arr['return_num'])) + '" class="sell_quote_create_package_num" maxnum="' + (parseFloat(arr['num']) - parseFloat(arr['return_num'])) + '" style="border:1px solid #23a2f3;"><button class="but_blue but_opa_small radius_left_0 inp_reduce sell_quote_create_package_num_change">-</button></div></td>\
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


                         $(".tanceng .zj_jcd_jcgh_zj_goods_content_show").html(complete);

                         //选择基本商品的checkbox
                         $('.tanceng .zj_jcd_select_jcgh_goods_content_tbody tr input:checkbox').die('click').live('click', function () {
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
                         $('.tanceng .zj_jcd_select_jcgh_goods_content_tbody .productnum').live('keyup', function () {
                             if (parseFloat($(this).val()) > parseFloat($(this).attr('maxnum'))) {
                                 alert('超过可归还的最大数量');
                                 $(this).val($(this).attr('maxnum'));
                             }
                         });
                         //整机商品父级勾选
                         $('.tanceng .zj_jcd_jcgh_zj_goods_content_show .xs_div_2 input').die('click').live('click', function () {
                             if ($(this).is(':checked')) {
                                 $(this).parents('.xs_div_2').next('.xs_xsbjd_table_t2').find('input').attr('checked', true);
                             } else {
                                 $(this).parents('.xs_div_2').next('.xs_xsbjd_table_t2').find('input').attr('checked', false);
                                 //$(this).closest('.takenote_setting_list_one').find('input').val(0);
                             }
                         });

                         /*改变整机数量*/
                         $('.tanceng .sell_quote_create_package_num_change').die('click').live('click', function () {
                             if (parseFloat($(this).siblings('input').val()) > parseFloat($(this).siblings('input').attr('maxnum'))) {
                                 $(this).siblings('input').val($(this).siblings('input').attr('maxnum'));
                                 alert('超过可归还的最大数量');
                             }
                         });
                         $('.tanceng .zj_jcd_jcgh_zj_goods_content_show .sell_quote_create_package_num').live('keyup', function () {
                             if (parseFloat($(this).val()) > parseFloat($(this).attr('maxnum'))) {
                                 alert('超过可归还的最大数量');
                                 $(this).val($(this).attr('maxnum'));
                             }
                         });
                         /*归还数量*/
                         // var z_num=$(".sell_quote_create_package_num").val();
                         // $(".sell_quote_create_package_num_change").die().live("click",function(){
                         //     var zsum=$(this).parents('tr').find('input').data('num')
                         //
                         //     if(z_num>=zsum){
                         //         $(this).removeClass('inp_plus');
                         //
                         //     }else{
                         //         $(this).addClass('inp_plus');
                         //     }
                         //
                         // });
                     }


                 }
             });

             /*抄送人弹框按钮*/
             var  arr_id=[];/*抄送人id*/
             var cs_name=[];/*抄送人名字*/
             $(".tanceng .zcj_jcd_jcgh_select_cs_add_btn").die().live("click",function(){
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
                             $(".tanceng .zj_jcd_csr_jcgh_left_ul_list").html(head+tree_list_bmfzr(data, deep));
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

                 $(".tanceng .zj_jcd_csr_jcgh_left_ul_list .person_left_nav").die().live("click",function(){
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

                         $(".zcj_jcd_jcgh_select_cs_add_btn").parent().before(cs_per);
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
                     $(".zj_jcd_csr_jcgh_left_ul_list .person_left_nav").each(function(){
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
             /*借出归还提交*/
             $(".zj_jcd_jcgh_end_tj_btn").die().live("click",function () {
                 var _this=this;
                 jcgh_list_data.code_sn=$(".zj_jcd_jcgh_bh_num_val").val();
                 jcgh_list_data.lend_id=back_id;
                 jcgh_list_data.lend_code_sn=code;
                 jcgh_list_data.customer_id=supplier_id;
                 jcgh_list_data.remark=$(".zj_jcd_jcgh_remark_bz").val();
                 jcgh_list_data.customer_name=supplier_name;
                 jcgh_list_data.in_time=$(".zj_jcd_enter_time").val();

                 var jcgh_cs=[];
                 $(".tanceng .zj_jcd_csr_cy_left_ul_list .zj_csr_num").each(function(){
                     jcgh_cs.push($(this).attr('rid'));
                 })
                 jcgh_list_data.copy_flow=jcgh_cs.toString();
                 var jcgh_goods=[];
                 /*推送*/
                 var ts_product_info=[];
                 /*商品*/
                 $(".tanceng .zj_jcd_select_jcgh_goods_content_tbody tr input").each(function(i){
                     if($(this).is(':checked')){
                         jcgh_goods.push({
                             id:$(this).data('id'),
                             goods_id:$(this).data('good_id'),
                             goods_category:1,
                             num: $(this).parents('tr').find('.productnum').val(),
                             total_num:$(this).data('good_num')
                         })
                         ts_product_info.push({
                             product_id:$(this).data('good_id'),
                             product_type:1,
                             input_num:$(this).parents('tr').find('.productnum').val()
                         });
                     }
                 })
                 /*整机商品*/
                 $(".tanceng .zj_jcd_jcgh_zj_goods_content_show .xs_div_2 tbody input").each(function (i) {
                     var match_goods=[];
                     /*推送*/
                     var p_info=[]
                     if($(this).is(':checked')){
                     $(".tanceng .zj_jcd_jcgh_zj_goods_content_show .xs_div_2 tbody input").parents('.zj_jcd_jcgh_zj_goods_content_show').find('.xs_xsbjd_table_t2').eq(i).find('input:checkbox').each(function(i2){

                             match_goods.push({
                                 id:$(this).data('id'),
                                 goods_id:$(this).data('good_id'),
                                 num:$(this).parents('tr').find('.productnum').val()
                             })
                             p_info.push({
                                 product_id:$(this).data('good_id'),
                                 num:$(this).parents('tr').find('.productnum').val()
                             })


                     })

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
                 var setting_goods_info=JSON.stringify(jcgh_goods);
                 jcgh_list_data.product_info=setting_goods_info;
                    /*推送*/
                    var ts_goods=JSON.stringify(ts_product_info);
                 takenoteStockData.related_receipts_no = jcgh_list_data.code_sn;
                 takenoteStockData.related_business_name = jcgh_list_data.customer_name;
                 takenoteStockData.document_marker = uid;
                 takenoteStockData.remark = jcgh_list_data.remark;
                 takenoteStockData.product_info=ts_goods;
                 takenoteStockData.input_time=jcgh_list_data.in_time;
                 // takenoteToOutStockData.logistics_way = takenoteBorrowOutCreateData.logistics_way;
                 // takenoteToOutStockData.is_package_freight = takenoteBorrowOutCreateData.is_freight;
                 // takenoteToOutStockData.consignee = takenoteBorrowOutCreateData.contactor;
                 // takenoteToOutStockData.consignee_tel = takenoteBorrowOutCreateData.tel;
                 // takenoteToOutStockData.consignee_addr = takenoteBorrowOutCreateData.address;
                 // takenoteToOutStockData.output_time = takenoteBorrowOutCreateData.shipments_time;

                 $.ajax({
                     type: 'post',
                     url: SERVER_URL + "/lend-out/add",
                     data: jcgh_list_data,
                     dataType: "json",
                     success: function (data) {
                         console.log('100033333444');
                         console.log(data);
                         console.log('100033333444');
                         $('.tanceng .dialog_box').not('[name="takenote_jcgh_jcghtj"]').remove();
                         $('.tanceng .takenote_jrgh_jrghtj').attr('name', 'takenote_jcgh_jcghtj');
                         $('.tanceng').append($('.dialog_box[name="takenote_jcgh_jcghtj"]').css('display', 'block'));
                         $('.tanceng .zj_jcgh_fish_dh_num').html(jcgh_list_data.code_sn);
                           // $(_this).parents('.takenote_jcgh_new').find('.dialog_close').click();
                         takenoteToOutStockFn();
                         out_list_show_fn();
                     }
                 })
                 /*单号确定*/
                 $(".zj_jcgh_tj_show_num_btn").die().live("click",function(){
                     $(this).parents('.dialog_content_delete').find('.dialog_close').click();
                 });
             });
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

     $("#zj_jcd_my_fqd_head").trigger('click');

    /*待我审批*/
    $("#zj_jcd_dwsp_fqd_head").die().live("click",function(){
        $(".zj_jcd_wfqd_content_info_show .container").removeClass('lik_table_wrap');
        $(".zj_jcd_dwsp_content_info_show .container").addClass('lik_table_wrap');
        $(".zj_jcd_cswd_content_info_show .container").removeClass('lik_table_wrap');
        likShow('.zcj_dwsp_table_head_content_show', venCustomLookAbledField, '.zcj_jcgh_check_x_head_content', '.zcj_jcgh_check_save_btn', '.zcj_jcgh_check_cancal_btn');

        $(".goods_jcd_wfqd_attr_search_table").hide();
        $(".goods_jcd_dwsp_attr_search_table").show();
        $(".goods_jcd_cswd_attr_search_table").hide();
        var dwsp_list_data={
            token: token,
            uid:uid,
            company_id:company_id,
            page: 1,
            num: 10
        }

        function dwsp_list_show_fn(){
            $.ajax({
                type: 'post',
                url: SERVER_URL + "/lend/my-approval",
                data: dwsp_list_data,
                dataType: "json",
                success: function (data) {
                    console.log('100033333444');
                    console.log(data);
                    console.log('100033333444');
                    if(data.code==0){
                        if(data['data'].length>0){
                            $(".zj_jcd_dwsp_header_fy_show_page").show();
                            $(".zj_dwsp_no").hide();
                        }else{
                            $(".zj_jcd_dwsp_header_fy_show_page").hide();
                            $(".zj_dwsp_no").show();
                        }
                    }else{
                        $(".zj_jcd_dwsp_header_fy_show_page").hide();
                        $(".zj_dwsp_no").show();
                    }

                    var html='';
                    //var P_sort=" ";
                    if(data.code==0){

                        $.each(data.data,function(index,content){
                            var sort=repair(index+1)
                          /*  if(content['is_invalid']==1){
                                html+='<tr class="grey"> <td><span class="voidIcon">作废</span></td>'
                            }else{
                                html+='<tr> <td>'+sort+'</td>'
                            }*/
                            html+='<tr> <td>'+sort+'</td>'
                            html+='<td>'+likNullData(content['code_sn'])+'</td>'
                            html+='<td>'+likNullData(content['supplier_name'])+'</td>'
                            html+='<td>'+likNullData(content['expect_return_time'])+'</td>'
                            if(content['approval_status']==1){
                                html+='<td class="c_y">审批中</td>'
                            }else if(content['approval_status']==2){
                                html+='<td class="c_g">审批通过</td>'
                            }else if(content['approval_status']==3){
                                html+='<td class="c_r">驳回</td>'
                            }else{
                                html+='<td class="c_r">-</td>'
                            }


                            html+='<td>'+likNullData(content['approval_name_str'])+'</td>'
                            html+='<td>'+likNullData(content['send_time'])+'</td>'
                            if(content['library_status']==1){
                                html+='<td class="c_r">待出库</td>'
                            }else if(content['library_status']==2){
                                html+='<td class="c_y">部分出库</td>'
                            }else if(content['library_status']==3){
                                html+='<td class="c_g">已出库</td>'
                            }else{
                                html+='<td>-</td>'
                            }

                            html+='<td>'+likNullData(content['create_time'])+'</td>'
                            html+='<td>'+likNullData(content['name'])+'</td>'
                            html+='<td>'+likNullData(content['all_money'])+'</td>'

                            html+='<td>'+likNullData(content['note'])+'</td>'
                            html+='<td>';
                            if(content['approval_status']==1){
                                html+='<button class="but_mix r_sidebar_btn zj_jcd_dwsp_check_xq_btn" data-id="'+content['id']+'" data-code_sn="'+content['code_sn']+'" name="takenote_jcd_ck">查看</button><button data-id="'+content['id']+'" data-uid="'+content['uid']+'" class="but_mix val_dialog but_look zj_dwsp_examine_btn" name="takenote_jcd_jbxxxq_sp">审批</button>'
                            }else if(content['approval_status']==2){
                              /*  html+='<button class="but_mix r_sidebar_btn zj_jcd_check_xq_btn" data-id="'+content['id']+'" name="takenote_jcd_ck">查看</button><button data-id="'+content['id']+'" data-uid="'+content['uid']+'" class="but_mix val_dialog but_look zj_dwsp_examine_btn" name="takenote_jcd_jbxxxq_sp">审批</button>'*/
                                html+='<button class="but_mix r_sidebar_btn zj_jcd_dwsp_check_xq_btn" data-id="'+content['id']+'" data-code_sn="'+content['code_sn']+'" name="takenote_jcd_ck">查看</button><button class="but_mix1 but_grey1" name="">审批</button>'
                            }else if(content['approval_status']==3){
                                html+='<button class="but_mix r_sidebar_btn zj_jcd_dwsp_check_xq_btn" data-id="'+content['id']+'" data-code_sn="'+content['code_sn']+'" name="takenote_jcd_ck">查看</button><button data-id="'+content['id']+'" data-uid="'+content['uid']+'" class="but_mix1 but_grey1" name="">审批</button>'
                            }
                            html+='</td>';
                            html+='</tr>';

                        })

                    }else{
                        alert(data.msg);
                    }
                    $(".zj_dwsp_list_data_content_show").html(html);
                    /*分页*/

                    // var znum=data.totalcount;
                    // var zpage=data.data.length;
                    $(".zcj_jrd_seach_syjg").text(data.total_num);
                    list_table_render_pagination(".zj_jcd_dwsp_header_fy_show_page",dwsp_list_data,dwsp_list_show_fn,data.total_num,data.data.length);
                    $(".zcj_jcgh_check_save_btn").trigger('click');
                }

            })

        }
        dwsp_list_show_fn();
/*审批*/
        $(".zj_dwsp_examine_btn").die().live("click",function(){
            var spid=$(this).data('id');
            //var uid=$(this).data('uid')

            /*查看审批*/
            /*查看详情*/

                $.ajax({
                    type: 'POST',
                    url: SERVER_URL + "/lend/look-lend",
                    data: {
                        token: token,
                        //company_id: company_id, //公司id
                        id: spid// 用户id
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
                            //$(".zj_jcd_jcgh_kh_name_show").text(data['data']['supplier_name']);
                            $(".zj_jcd_quote_look_uname").text(data['data']['xiadan_name']);
                            $(".zj_jcd_quote_look_create_at").text(data['data']['create_time']);
                            $(".zj_look_sp_info_header_content .zj_jcd_bh_show_sp_info").eq(0).text(data['data']['code_sn']);
                            $(".zj_look_sp_info_header_content .zj_jcd_bh_show_sp_info").eq(1).text(data['data']['supplier_name']);
                            $(".zj_look_sp_info_header_content .zj_jcd_bh_show_sp_info").eq(2).text(data['data']['expect_return_time']);
                            $(".zj_look_sp_info_header_content .zj_jcd_bh_show_sp_info").eq(3).text(data['data']['send_time']);
                            if(data['data']['logistics_type']==1){
                                $(".zj_look_sp_info_header_content .zj_jcd_bh_show_sp_info").eq(4).text('快递');
                            }else if(data['data']['logistics_type']==2){
                                $(".zj_look_sp_info_header_content .zj_jcd_bh_show_sp_info").eq(4).text('陆运');
                            }else if(data['data']['logistics_type']==3){
                                $(".zj_look_sp_info_header_content .zj_jcd_bh_show_sp_info").eq(4).text('空运');
                            }else if(data['data']['logistics_type']==4){
                                $(".zj_look_sp_info_header_content .zj_jcd_bh_show_sp_info").eq(4).text('海运');
                            }else if(data['data']['logistics_type']==5){
                                $(".zj_look_sp_info_header_content .zj_jcd_bh_show_sp_info").eq(4).text('平邮');
                            }
                            if(data['data']['is_freight']==1){
                                $(".zj_look_sp_info_header_content .zj_jcd_bh_show_sp_info").eq(5).text('包运费');
                            }else{
                                $(".zj_look_sp_info_header_content .zj_jcd_bh_show_sp_info").eq(5).text('不包');
                            }

                            $(".zj_look_sp_info_header_content .zj_jcd_bh_show_sp_info").eq(6).text(data['data']['receiver']);
                            $(".zj_look_sp_info_header_content .zj_jcd_bh_show_sp_info").eq(7).text(data['data']['mobile']);
                            $(".zj_look_sp_info_header_content .zj_jcd_bh_show_sp_info").eq(8).text(data['data']['address']);
                            $(".zj_look_sp_info_header_content .zj_jcd_bh_show_sp_info").eq(9).text(data['data']['note']);
                            //$(".zj_look_info_header_content .zj_jcd_bh_show_info").eq(10).text(data['data']['code_sn']);
                            // $(".tanceng .zj_jrd_info_num_header_show .zj_jrd_bh_show_num").text(data['data']['code_sn']);
                            // $(".tanceng .zj_jrd_info_num_header_show .zj_supplier_name_show").text(data['data']['supplier_name']);
                            // $(".tanceng .zj_jrd_info_num_header_show .zj_yjgh_time_show").text(data['data']['expect_return_time']);
                            // $(".tanceng .zj_jrd_info_num_header_show .zj_rk_day_show").text(data['data']['library_time']);
                            // $(".tanceng .zj_jrd_info_num_header_show .zj_note_info_show").text(data['data']['note']);
                            if(data['data']['goods']['sum_total']){
                                $(".tanceng .xs_bjd_bold .zj_sp_ptsp_price_num").text(data['data']['goods']['sum_total']);
                            }
                            // if(data['data']['setting']['sum_total']){
                            //     $(".tanceng .xs_bjd_bold .zj_jcd_sp_complate_goods_price_sum").text(data['data']['setting']['sum_total']);
                            // }


                            /*ff*/
                            $(".zj_jcd_sp_unit_price_hj").text(data['data']['unit_price_total']);
                            $(".zj_jcd_sp_contain_tax").text(data['data']['tax_total']);
                            $(".zj_jcd_sp_other_cost").text(data['data']['other_costs']);
                            $(".zj_jcd_sp_sum_price_num").text(data['data']['all_money']);

                            $(".tanceng")
                            var html='';
                            $.each(data['data']['goods'],function(i,v){
                                $.each(v,function(i2,v2){
                                    html+='<tr>\
                            <td>'+(i2+1)+'</td>\
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
                            $(".zj_sp_check_info_goods_body").html(html);
                            /*整机商品*/

                            var complete='';
                            $.each(data['data']['setting'],function(i,arr){
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
                                    <td>01</td>\
                                    <td>'+likNullData(arr['good_sn'])+'</td>\
                                    <td>'+likNullData(arr['good_name'])+'</td>\
                                    <td>'+likNullData(arr['good_attr'])+'</td>\
                                    <td>'+likNullData(arr['num'])+''+arr['good_unit']+'</td>\
                                    <td>'+likNullData(arr['price'])+'</td>\
                                    <td>'+likNullData(arr['containing_money'])+'</td>\
                                    <td class="zj_goods_zsum_dg_price" data-total_money="'+arr['total_money']+'">'+likNullData(arr['total_money'])+'</td>\
                                    <td><button class="but_mix box_open_btn_1 but_blue_1">展开</button></td>\
                                </tr>\
                            </tbody>\
                            </table>\
                            </div>\
                            <div class="xs_tc_goods_box goods_tc_toggle" style="display: none;">'+setting+'</div>'

                            })


                            $(".tanceng .zj_sp_complete_div_goods_nr").html(complete);
                            var z_sum=0;
                            $(".tanceng .zj_sp_complete_div_goods_nr .zj_goods_zsum_dg_price").each(function(){
                                z_sum+=parseFloat($(this).data('total_money'));
                            })
                            $(".tanceng .xs_bjd_bold .zj_jcd_sp_complate_goods_price_sum").text(z_sum);
                        }

                    }
                })
            /*审批通过确定*/
            $(".zj_goods_sptg_pass_end").die().live("click",function () {
                var s_p=this;
                $(".zj_sp_opinion_end_btn").die().live("click",function(){
                    var _this=this;
                    var note;
                    if($(".zj_sp_yj_opinion_text_val").val()=='请输入审批意见'){
                        note=''
                    }else{
                        note=$(".zj_sp_yj_opinion_text_val").val();
                    }
                    $.ajax({
                        type: 'post',
                        url: SERVER_URL + "/lend/pass",
                        data: {
                            token: token,
                            uid:uid,
                            id:spid,
                            approval_status:2,
                            note:note
                        },
                        dataType: "json",
                        success: function (data) {
                            console.log('200');
                            console.log(data);
                            console.log('200');
                            dwsp_list_show_fn();
                            $(_this).parents('.dialog_content_sp').find('.dialog_close').click();
                            $(s_p).parents('.dialog_content_middle5').find('.dialog_close').click();
                        }
                    })
                });
            });
            /*审批拒绝确定*/
            $(".zj_sp_reject_btn").die().live("click",function () {
                var j_sp=this;
                $(".zj_sp_opinion_end_btn").die().live("click",function(){
                    var _this=this;
                    var note;
                    if($(".zj_sp_yj_opinion_text_val").val()=='请输入审批意见'){
                        note=''
                    }else{
                        note=$(".zj_sp_yj_opinion_text_val").val();
                    }
                    $.ajax({
                        type: 'post',
                        url: SERVER_URL + "/lend/pass",
                        data: {
                            token: token,
                            uid:uid,
                            id:spid,
                            approval_status:3,
                            note:note
                        },
                        dataType: "json",
                        success: function (data) {
                            console.log('200');
                            console.log(data);
                            console.log('200');
                            dwsp_list_show_fn();
                            //$(this).parents('.dialog_content_sp').find('.dialog_close').click();
                            $(_this).parents('.dialog_content_sp').find('.dialog_close').click();
                            $(j_sp).parents('.dialog_content_middle5').find('.dialog_close').click();
                        }
                    })
                });
            });


        });
        /*查看*/
        $(".zj_jcd_dwsp_check_xq_btn").die().live("click",function(){

                $(".zj_jcghd_number_show").text('');
                $(".zj_xsbjd_number_show").text('');

            var code=$(this).data('code_sn');
            $(".slider_head_moreBox").hide();
            $(".zj_ck_info_check_jcd").text('审批借出单')
            $(".zj_jcd_my_fqd_bjd_div").hide();
            $(".zj_jcd_dwsp_bjd_div").show();
            $(".zj_cswd_jrd_div").hide();
            var dwsp_id=$(this).data('id');
            $.ajax({
                type: 'post',
                url: SERVER_URL + "/lend/basic",
                data:{
                    token: token,
                    id:dwsp_id
                },
                dataType: "json",
                success: function (data) {
                    console.log('100033333');
                    console.log(data);
                    console.log('100033333');
                    $(".zj_xdr_name_show").text(data['data']['xiadan_name']);
                    $(".zj_create_time_show").text(subTime(data['data']['create_time']));
                    $(".zj_jcd_jb_info_show_nr p span").eq(0).text(data['data']['code_sn']);
                    $(".zj_jcd_jb_info_show_nr p span").eq(1).text(data['data']['supplier_name']);
                    $(".zj_jcd_jb_info_show_nr p span").eq(2).text(subTime(data['data']['expect_return_time']));
                    if(data['data']['tax_rate']==1){
                        $(".zj_jcd_jb_info_show_nr p span").eq(3).text('17%');
                    }else{
                        $(".zj_jcd_jb_info_show_nr p span").eq(3).text('无税');
                    }

                    $(".zj_jcd_jb_info_show_nr p span").eq(4).text(data['data']['note']);
                    var c_name='';
                    $.each(data['cc'],function (i,csr_name) {
                        c_name+=''+csr_name['name']+','
                    })
                    c_name = c_name.slice(0, c_name.length - 1);
                    $(".zj_jcd_jb_info_show_nr p span").eq(5).text(c_name);
                    if(data['data']['thetype']==0){
                        $(".zj_jcd_jb_info_show_nr p span").eq(6).text("-");
                    }else if(data['data']['thetype']==1){
                        $(".zj_jcd_jb_info_show_nr p span").eq(6).text("未归还");
                    }else if(data['data']['thetype']==2){
                        $(".zj_jcd_jb_info_show_nr p span").eq(6).text("部分归还");
                    }else if(data['data']['thetype']==3){
                        $(".zj_jcd_jb_info_show_nr p span").eq(6).text("已归还");
                    }
                    $(".zj_jcd_jb_info_show_nr p span").eq(7).text(subTime(data['data']['send_time']));

                    if(data['data']['logistics_type']==1){
                        $(".zj_jcd_jb_info_show_nr p span").eq(8).text('快递');
                    }else if(data['data']['logistics_type']==2){
                        $(".zj_jcd_jb_info_show_nr p span").eq(8).text('陆运');
                    }else if(data['data']['logistics_type']==3){
                        $(".zj_jcd_jb_info_show_nr p span").eq(8).text('空运');
                    }else if(data['data']['logistics_type']==4){
                        $(".zj_jcd_jb_info_show_nr p span").eq(8).text('海运');
                    }else if(data['data']['logistics_type']==5){
                        $(".zj_jcd_jb_info_show_nr p span").eq(8).text('平邮');
                    }
                    if(data['data']['is_freight']==1){
                        $(".zj_jcd_jb_info_show_nr p span").eq(9).text('包运费');
                    }else{
                        $(".zj_jcd_jb_info_show_nr p span").eq(9).text('不包');
                    }
                    // $(".zj_jcd_jb_info_show_nr p span").eq(9).text(data['data']['is_freight']);
                    $(".zj_jcd_jb_info_show_nr p span").eq(10).text(data['data']['receiver']);
                    $(".zj_jcd_jb_info_show_nr p span").eq(11).text(data['data']['mobile']);
                    $(".zj_jcd_jb_info_show_nr p span").eq(12).text(data['data']['address']);
                    //$(".zj_jcd_jb_info_show_nr p span").eq().text(data['data']['']);

                }
            })

            /*查看审批结果*/
            $.ajax({
                type: 'post',
                url: SERVER_URL + "/lend/approval-result",
                data: {
                    token: token,
                    //company_id: company_id, //公司id
                    id: dwsp_id,//id
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

                        html+='<h3 class="work_sp_h3">'+likNullData(vinfo['username'])+'</h3>'
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

                        }else{
                            html+='<h3 class="f_color bold">-</h3>'
                        }

                        if(vinfo['update_time']==null || vinfo['update_time']==''){
                            html+='<p class="c_9"></p>'
                        }else{
                            html+='<p class="c_9">'+likNullData(vinfo['update_time'])+'</p>'
                        }
                       // html+='<p class="c_9">'+likNullData(vinfo['update_time'])+'</p>'
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
                    $(".zj_jcd_sp_result_box").html(html);
                    if(data['is_across']==1){
                        $(".zj_bz_is_hid").hide();
                    }else{
                        $(".zj_bz_is_hid").show();
                    }
                }
            })

            /*查看详情*/
            $(".zj_ck_info_check_jcd").die().live("click",function(){
                $.ajax({
                    type: 'POST',
                    url: SERVER_URL + "/lend/look-lend",
                    data: {
                        token: token,
                        //company_id: company_id, //公司id
                        id: dwsp_id// 用户id
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
                            $(".zj_jcd_check_xq_kh_name").text(likNullData(data['data']['supplier_name']));
                            $(".zj_jcd_quote_look_uname").text(data['data']['xiadan_name']);
                            $(".zj_jcd_quote_look_create_at").text(data['data']['create_time']);
                            $(".zj_look_info_header_content .zj_jcd_bh_show_info").eq(0).text(data['data']['code_sn']);
                            $(".zj_look_info_header_content .zj_jcd_bh_show_info").eq(1).text(data['data']['supplier_name']);
                            $(".zj_look_info_header_content .zj_jcd_bh_show_info").eq(2).text(data['data']['expect_return_time']);
                            $(".zj_look_info_header_content .zj_jcd_bh_show_info").eq(3).text(data['data']['send_time']);
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
                                var sor=repair(i+1)
                                $.each(v,function(i2,v2){
                                    html+='<tr>\
                            <td>'+sor+'</td>\
                            <td>'+likNullData(v2['good_sn'])+'</td>\
                            <td>'+likNullData(v2['good_name'])+'</td>\
                            <td>'+likNullData(v2['good_attr'])+'</td>\
                            <td>'+likNullData(v2['good_num'])+''+v2['good_unit']+'</td>\
                            <td>'+likNullData(v2['good_price'])+'</td>\
                            <td>'+likNullData(v2['good_rate_price'])+'</td>\
                            <td>'+likNullData(v2['good_total'])+'</td>\
                            <td></td>\
                            </tr>'
                                })

                            })
                            $(".zj_jcd_goods_table_content_info").html(html);
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
                                                <td>'+likNullData(v3['sing_num'])+''+v3['good_unit']+'</td>\
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
                                    <td>'+likNullData(arr['num'])+''+arr['good_unit']+'</td>\
                                    <td>'+likNullData(arr['price'])+'</td>\
                                    <td>'+likNullData(arr['containing_money'])+'</td>\
                                    <td class="zj_pzzj_goods_sum_price">'+likNullData(arr['total_money'])+'</td>\
                                    <td><button class="but_mix box_open_btn_1 but_blue_1">展开</button></td>\
                                </tr>\
                            </tbody>\
                            </table>\
                            </div>\
                            <div class="xs_tc_goods_box goods_tc_toggle" style="display: none;">'+setting+'</div>'

                            })


                            $(".tanceng .zj_jcd_complete_goods_dv_content").html(complete);
                            var z_sum=0;
                            $(".tanceng .zj_jcd_complete_goods_dv_content .zj_pzzj_goods_sum_price").each(function () {
                                z_sum+=parseFloat($(this).text());
                            })
                            $(".zj_jcd_complete_goods_price_sum").text(z_sum);
                        }

                    }
                })

            });
            /*借出归还单详情*/
            $("#zj_jcghd_left_head_table").die().live("click",function(){
                $.ajax({
                    type: 'GET',
                    url: SERVER_URL + "/lend-out/list",
                    data: {
                        token: token,
                        lend_id:dwsp_id
                    },
                    dataType: "json",
                    success: function (data) {
                        console.log('100033333444');
                        console.log(data);
                        console.log('100033333444');

                            $(".zj_jcghd_number_show").text('('+data['totalcount']+')');

                        var info=''
                        $.each(data['dataList'],function(i,jcd_info){
                            info+=' <div class="takenote_jrd_jcgh">\
                               <div class="d-r-t-h sbar">\
                               <h3 class="cont_title">基本信息</h3>\
                               <p class="l-s-x">借出归还单编号：<span>'+jcd_info['code_sn']+'</span></p>\
                               <p class="l-s-x">借出单编号：<span>'+jcd_info['lend_code_sn']+'</span></p>\
                               <p class="l-s-x">客户：<span>'+jcd_info['customer_name']+'</span></p>\
                               </div>\
                               <div class="d-r-t-h sbar">\
                                   <h3 class="cont_title">入库信息</h3>\
                                   <p class="l-s-x">入库日期：<span>'+jcd_info['in_time']+'</span></p>\
                               </div>\
                               <div class="d-r-t-h sbar" style="padding-bottom: 40px;">\
                               <h3 class="cont_title">借出归还商品</h3>\
                               <p class="l-s-x" style="margin-bottom: 30px;"><span style="margin-left: -5px;"><button data-id="'+jcd_info['id']+'" class="but_blue but_small val_dialog zj_jcd_check_jcgh_info_btn" name="takenote_jcd_look_jbghd">查看借出归还单</button></span></p>\
                               </div>\
                           </div>'
                        })
                        $(".zj_jcd_jrghd_info_box").html(info);

                    }
                })
                /*详情*/

            });
            /*查看详情*/
            $(".zj_jcd_check_jcgh_info_btn").die().live("click",function(){
                var gh_id=$(this).data('id');
                $.ajax({
                    type: 'POST',
                    url: SERVER_URL + "/lend/look-lend",
                    data: {
                        token: token,
                        //company_id: company_id, //公司id
                        id: dwsp_id// 用户id
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
                            $(".zj_jcd_jcgh_kh_name_show").text(data['data']['supplier_name']);
                            $(".zj_jcgh_quote_look_create_at").text(data['data']['xiadan_name']);
                            $(".zj_jcgh_quote_look_uname").text(data['data']['create_time']);
                            $(".zj_jcgh_info_header_content .zj_info_show").eq(0).text(data['data']['code_sn']);
                            $(".zj_jcgh_info_header_content .zj_info_show").eq(1).text(data['data']['supplier_name']);
                            $(".zj_jcgh_info_header_content .zj_info_show").eq(2).text(data['data']['expect_return_time']);
                            $(".zj_jcgh_info_header_content .zj_info_show").eq(3).text(data['data']['send_time']);


                            // $(".zj_look_info_header_content .zj_jcd_bh_show_info").eq(6).text(data['data']['receiver']);
                            // $(".zj_look_info_header_content .zj_jcd_bh_show_info").eq(7).text(data['data']['mobile']);
                            // $(".zj_look_info_header_content .zj_jcd_bh_show_info").eq(8).text(data['data']['address']);
                            // $(".zj_look_info_header_content .zj_jcd_bh_show_info").eq(9).text(data['data']['note']);

                            // if(data['data']['goods']['sum_total']){
                            //     $(".tanceng .xs_bjd_bold .zj_jcd_goods_hj_sum").text(data['data']['goods']['sum_total']);
                            // }
                            /*  if(data['data']['setting']['sum_total']){
                             $(".xs_bjd_bold .zj_jcd_complete_goods_price_sum").text(data['data']['setting']['sum_total']);
                             }*/


                            /*ff*/
                            $(".zj_jcd_unit_price_hj").text(data['data']['unit_price_total']);
                            $(".zj_jcd_contain_tax").text(data['data']['tax_total']);
                            $(".zj_jcd_other_cost").text(data['data']['other_costs']);
                            $(".zj_jcd_sum_price_num").text(data['data']['all_money']);


                            var html='';
                            $.each(data['data']['goods'],function(i,v){
                                $.each(v,function(i2,v2){
                                    html+='<tr>\
                            <td>'+likNullData(v2['good_sn'])+'</td>\
                            <td>'+likNullData(v2['good_name'])+'</td>\
                            <td>'+likNullData(v2['good_attr'])+'</td>\
                            <td>'+likNullData(v2['good_num'])+''+v2['good_unit']+'</td>\
                            <td>'+likNullData(v2['return_num'])+''+v2['good_unit']+'</td>\
                            <td></td>\
                            </tr>'
                                })

                            })
                            $(".zj_check_jrghd_pt_goods_info").html(html);
                            /*整机商品*/

                            var complete='';
                            $.each(data['data']['setting'],function(i,arr){
                                var setting='';
                                if(arr['good_list']){
                                    $.each(arr['good_list'],function(i2,v2){
                                        var setting_goods=''
                                        if(v2['attr_list']){
                                            $.each(v2['attr_list'],function(i3,v3){
                                                setting_goods+='<tr>\
                                                <td>'+likNullData(v3['good_sn'])+'</td>\
                                                <td>'+likNullData(v3['good_attr'])+'</td>\
                                                <td>'+likNullData(v3['sing_num'])+''+v3['good_unit']+'</td>\
                                                <td>'+likNullData(v3['return_num'])+''+v3['good_unit']+'</td>\
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
                               <th width="120">名称</th>\
                               <th width="240">属性</th>\
                               <th width="70">借出数量</th>\
                               <th width="70">归还数量</th>\
                               <th width="60">配件</th>\
                            </tr>\
                            </thead>\
                            <tbody>\
                                <tr class="c_3 c_3 xs_bjd_bold">\
                                    <td>'+likNullData(arr['good_sn'])+'</td>\
                                    <td>'+likNullData(arr['good_name'])+'</td>\
                                    <td>'+likNullData(arr['good_attr'])+'</td>\
                                    <td>'+likNullData(arr['num'])+''+arr['good_unit']+'</td>\
                                    <td>'+likNullData(arr['return_num'])+''+arr['good_unit']+'</td>\
                                    <td><button class="but_mix box_open_btn_1 but_blue_1">展开</button></td>\
                                </tr>\
                            </tbody>\
                            </table>\
                            </div>\
                            <div class="xs_tc_goods_box goods_tc_toggle" style="display: none;">'+setting+'</div>'

                            })


                            $(".tanceng .zj_check_jrghd_complate_info").html(complete);
                            // var z_sum=0;
                            // $(".tanceng .zj_jcd_complete_goods_dv_content .zj_pzzj_goods_sum_price").each(function () {
                            //     z_sum+=parseFloat($(this).text());
                            // })
                            // $(".zj_jcd_complete_goods_price_sum").text(z_sum);
                        }

                    }
                })
            });
            /*销售报价单*/
            $("#zj_xsbjd_left_head_table").die().live("click",function(){
                $.ajax({
                    type: 'post',
                    url: SERVER_URL + "/lend/quote",
                    data:{
                        token: token,
                        id:dwsp_id
                    },
                    dataType: "json",
                    success: function (data) {
                        console.log('606');
                        console.log(data);
                        console.log('606');

                            $(".zj_xsbjd_number_show").html('('+data['data'].length+')')

                        var xs_list='';
                        $.each(data['data'],function(i,vlist){
                            xs_list+='<div class="takenote_jrd_jcgh">\
                                 <div class="d-r-t-h sbar">\
                                 <h3 class="cont_title">基本信息</h3>\
                                 <p class="l-s-x">销售订单编号：<span>'+likNullData(vlist['quote_code_sn']) +'</span></p>\
                                 <p class="l-s-x">客户：<span>'+likNullData(vlist['customer_name'])+'</span></p>\
                                 <p class="l-s-x">销售合同：<span>'+likNullData(vlist['contract_id'])+'</span></p>\
                                 <p class="l-s-x">销售报价单：<span>'+likNullData(vlist['code_sn'])+'</span></p>\
                                 <p class="l-s-x">负责部门：<span>'+likNullData(vlist['dept_name'])+'</span></p>\
                                 <p class="l-s-x">负责人：<span>'+likNullData(vlist['owner_name'])+'</span></p>\
                                 </div>\
                                 </div>'
                        })
                        $(".zj_xsbjd_info_xq_dv_show").html(xs_list);


                    }
                })
            });
            /**********出库单***************/
            $("#zj_ckd_left_head_table").die().live("click",function () {
                $.ajax({
                    type: 'get',
                    url: SERVER_URL + "/borrow-out/stockoutinfo",
                    data:{
                        token: token,
                        related_receipts_no:code
                    },
                    dataType: "json",
                    success: function (data) {
                        console.log('60666');
                        console.log(data);
                        console.log('60666');
                        if(data['data']['shipments_status']==1){
                            $(".zj_jcd_fh_state_name").text('待发货');
                        }else if(data['data']['shipments_status']==2){
                            $(".zj_jcd_fh_state_name").text('部分发货');
                        }else if(data['data']['shipments_status']==3){
                            $(".zj_jcd_fh_state_name").text('完成发货');
                        }
                        if(data['data']['stockingOutList']['output_num']){
                            $(".zj_zcd_order_look_skjl_tbody_nodata_box").hide()
                            var rk_info='<tr class="table_total ven_sell_order_look_skjl_tbody_table_total">\
                            <td>'+data['data']['stockingOutList']['output_num']+'</td>\
                            <td>'+data['data']['stockingOutList']['distribution_num']+'</td>\
                            <td>'+data['data']['stockingOutList']['set_num']+'</td>\
                            <td>'+data['data']['stockingOutList']['combo_set_num']+'</td>\
                            <td>'+data['data']['stockingOutList']['is_package_freight']+'</td>\
                            <td>'+data['data']['stockingOutList']['distribution_name']+'</td>\
                            </tr>'
                            $(".zj_goods_ckd_order_look_skjl_tbody").html(rk_info);
                        }else{
                            $(".zj_goods_ckd_order_look_skjl_tbody").empty();
                            $(".zj_zcd_order_look_skjl_tbody_nodata_box").show();
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
                            $(".zj_goods_jcd_order_look_skjl_tbody").html(kf_goods);
                        }else{
                            $(".zj_goods_jcd_order_look_skjl_tbody").empty();
                            $(".zj_jcd_order_look_skjl_tbody_nodata_box").show();
                        }

                        var wl_list='';
                        $.each(data['data']['logisticsList'],function(i,list){
                            wl_list+='<div class="takenote_jrgh_look_div">\
                           <div class="left">\
                           <p class="l-s-x c_3">物流公司：<span>'+list['logistics_name']+'</span></p>\
                           <p class="l-s-x c_3">物流单号：<span>'+list['logistics_sn']+'</span></p>\
                           </div>\
                           <div class="right"><button class="but_small but_blue val_dialog zj_check_fh_goods_info" data-logistics_name="'+list['logistics_name']+'" data-logistics_sn="'+list['logistics_sn']+'" name="takenote_look_jcd_goods">查看发货商品</button></div>\
                           </div>'
                        })
                        $(".zj_jcd_fh_state_show_div").html(wl_list);
                    }
                })

            });
            /*查看发货商品*/
            $(".zj_check_fh_goods_info").die().live("click",function(){
                var logistics_sn=$(this).data('logistics_sn');
                var logistics_name=$(this).data('logistics_name');
                $.ajax({
                    type: 'get',
                    url: SERVER_URL + "/stock-out/shipmentsdetail",
                    data: {
                        token: token,
                        logistics_sn: logistics_sn
                    },
                    dataType: "json",
                    success: function (data) {
                        console.log('60666');
                        console.log(data);
                        console.log('60666');
                        $(".zj_fh_quote_look_create_at").text(data['data']['create_time']);
                        $(".zj_fh_quote_look_uname").text(data['data']['shipments_name']);
                        $(".zj_gl_wl_danhao").text(data['data']['related_receipts_no']);
                        $(".zj_wl_gs_name").text(logistics_name);
                        $(".zj_wl_d_number").text(data['data']['number']);
                        var complate_goods=''
                        $.each(data['data']['productList'],function(i,goods){
                            complate_goods+='<tr class="c_3">\
                            <td>'+repair(i+1)+'</td>\
                            <td>'+goods['code_sn']+'</td>\
                            <td>'+goods['product_name']+'</td>\
                            <td>'+goods['attr_name']+'</td>\
                            <td>'+goods['shipments_num']+'</td>\
                            </tr>';
                        })
                        $(".zj_check_fh_goods_content").html(complate_goods);
                    }
                })
            });
        })
        /*搜索*/
        $(".zj_jcd_search_bh_num_btn").die().live("click",function(){
            var s_search=$(".zj_jcd_ss_input_val").val();
            if($(".zj_jcd_tab_header_info .tabhover").text()=='待我审批'){
                if($(".zj_jcd_ss_input_val").val()=='搜索借出编号/客户名称'){
                    dwsp_list_data.key_search='';

                }else{
                    dwsp_list_data.key_search=s_search;

                }
                dwsp_list_show_fn();
            }

        });
        /*审批状态*/
        $(".zj_jcd_dwsp_zt_list li").die().live("click",function(){
            var state=$(this).data('id')
            dwsp_list_data.approval_status=state;
            dwsp_list_show_fn();
        });
        /*出库状态*/
        /*  $(".zj_jcd_dwsp_fh_zt_list li").die().live("click",function(){
         var library_status=$(this).data('id')
         dwsp_list_data.library_status=library_status;
         dwsp_list_show_fn();
         });*/
        /*归还状态*/
        /*$(".zj_jcd_gh_state_list li").die().live("click",function(){
            var thetype=$(this).data('id')
            out_list_data.thetype=thetype;
         dwsp_list_show_fn();
        });*/
        /*刷新*/
        $(".zj_jcd_refish_btn_new").die().live("click",function(){
             if($(".zj_jcd_tab_header_info .tabhover").text()=='待我审批'){
                dwsp_list_data.is_invalid=1;
                dwsp_list_data.page=1;
                dwsp_list_data.num='';
                dwsp_list_data.key_search=''
                dwsp_list_data.approval_status='';
                dwsp_list_data.library_status='';
                dwsp_list_data.thetype='';
                 $(".goods_jcd_dwsp_attr_search_table input").val('待选择').css('color','#ccc');
                dwsp_list_show_fn();
            }
        });

    });

     /*抄送我的*/
     $("#zj_jcd_cswd_fqd_head").die().live('click',function(){
         $(".zj_jcd_wfqd_content_info_show .container").removeClass('lik_table_wrap');
         $(".zj_jcd_dwsp_content_info_show .container").removeClass('lik_table_wrap');
         $(".zj_jcd_cswd_content_info_show .container").addClass('lik_table_wrap');
         likShow('.zcj_cswd_table_head_content_show', venCustomLookAbledField, '.zcj_jcgh_check_x_head_content', '.zcj_jcgh_check_save_btn', '.zcj_jcgh_check_cancal_btn');
         $(".goods_jcd_wfqd_attr_search_table").hide();
         $(".goods_jcd_dwsp_attr_search_table").hide();
         $(".goods_jcd_cswd_attr_search_table").show();
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
                     console.log('100033333444');
                     console.log(data);
                     console.log('100033333444');
                     if(data.code==0){
                         if(data['data'].length>0){
                             $(".zcj_cswd_jrdfy_head_page_div").show();
                             $(".zj_cswde_no").hide();
                         }else{
                             $(".zcj_cswd_jrdfy_head_page_div").hide();
                             $(".zj_cswde_no").show();
                         }
                     }else{
                         $(".zcj_cswd_jrdfy_head_page_div").hide();
                         $(".zj_cswde_no").show();
                     }

                     var html='';
                     //var P_sort=" ";
                     if(data.code==0){

                         $.each(data.data,function(index,content){
                             var sort=repair(index+1)
                             // if(content['is_invalid']==1){
                             //     html+='<tr class="grey"> <td><span class="voidIcon">作废</span></td>'
                             // }else{
                             //     html+='<tr> <td>'+sort+'</td>'
                             // }
                             html+='<tr> <td>'+sort+'</td>'
                             html+='<td>'+likNullData(content['code_sn'])+'</td>'
                             html+='<td>'+likNullData(content['supplier_name'])+'</td>'
                             html+='<td>'+likNullData(content['expect_return_time'])+'</td>'
                             if(content['approval_status']==1){
                                 html+='<td class="c_y">审批中</td>'
                             }else if(content['approval_status']==2){
                                 html+='<td class="c_g">审批通过</td>'
                             }else if(content['approval_status']==3){
                                 html+='<td class="c_r">驳回</td>'
                             }else{
                                 html+='<td class="c_r">-</td>'
                             }

                             html+='<td>'+likNullData(content['approval_name_str'])+'</td>'
                             html+='<td>'+likNullData(content['send_time'])+'</td>'
                             if(content['library_status']==1){
                                 html+='<td class="c_r">待出库</td>'
                             }else if(content['library_status']==2){
                                 html+='<td class="c_y">部分出库</td>'
                             }else if(content['library_status']==3){
                                 html+='<td class="c_g">已出库</td>'
                             }else {
                                 html+='<td>-</td>'
                             }

                             html+='<td>'+likNullData(content['create_time'])+'</td>'
                             html+='<td>'+likNullData(content['name'])+'</td>'
                             html+='<td>'+likNullData(content['all_money'])+'</td>'
                             if(content['thetype']==1){
                                 html+='<td class="c_r">未归还</td>'
                             }else if(content['thetype']==2){
                                 html+='<td class="c_y">部分归还</td>'
                             }else if(content['thetype']==3){
                                 html+='<td class="c_g">已归还</td>'
                             } else{
                                 html+='<td class="">-</td>'
                             }
                             html+='<td>'+likNullData(content['note'])+'</td>'
                             html+='<td>';

                             html+='<button class="but_mix r_sidebar_btn zj_jcd_cswd_check_xq_btn" data-id="'+content['id']+'" data-code_sn="'+content['code_sn']+'" name="takenote_jcd_ck">查看</button>'


                             html+='</td>';
                             html+='</tr>';

                         })

                     }else{
                         alert(data.msg);
                     }
                     $(".zj_jcd_cswd_body_content_list").html(html);
                     /*分页*/

                     // var znum=data.totalcount;
                     // var zpage=data.data.length;
                     $(".zcj_jrd_seach_syjg").text(data.total_num);
                     list_table_render_pagination(".zcj_cswd_jrdfy_head_page_div",cswd_list_data,cswd_list_show_fn,data.total_num,data.data.length);
                     $(".zcj_jcgh_check_save_btn").trigger('click');
                 }

             })

         }
         cswd_list_show_fn();

         /*搜索*/
         $(".zj_jcd_search_bh_num_btn").die().live("click",function(){
             var s_search=$(".zj_jcd_ss_input_val").val();
             if($(".zj_jcd_tab_header_info .tabhover").text()=='抄送我的'){
                 if($(".zj_jcd_ss_input_val").val()=='搜索借出编号/客户名称'){
                     cswd_list_data.key_search='';
                 }else{
                     cswd_list_data.key_search=s_search;

                 }
                 cswd_list_show_fn();
             }

         });
         /*审批状态*/
         $(".zj_jcd_cswd_sp_list li").die().live("click",function(){
             var state=$(this).data('id')
             cswd_list_data.approval_status=state;
             cswd_list_show_fn();
         });
         /*出库状态*/
          $(".zj_jcd_ckzt_list li").die().live("click",function(){
          var library_status=$(this).data('id')
          cswd_list_data.library_status=library_status;
          cswd_list_show_fn();
          });
         /*归还状态*/
         $(".zj_cswd_gh_zt_list li").die().live("click",function(){
          var thetype=$(this).data('id')
          cswd_list_data.thetype=thetype;
          cswd_list_show_fn();
          });
         /*刷新*/
         $(".zj_jcd_refish_btn_new").die().live("click",function(){
              if($(".zj_jcd_tab_header_info .tabhover").text()=='抄送我的'){
                 cswd_list_data.is_invalid=1;
                 cswd_list_data.page=1;
                 cswd_list_data.num='';
                 cswd_list_data.key_search=''
                 cswd_list_data.approval_status='';
                 cswd_list_data.library_status='';
                 cswd_list_data.thetype='';
                 $(".goods_jcd_cswd_attr_search_table input").val('待选择').css('color','#ccc');
                 cswd_list_show_fn();
             }
         });
         /*查看*/
         $(".zj_jcd_cswd_check_xq_btn").die().live("click",function(){

                 $(".zj_jcghd_number_show").text('');
                 $(".zj_xsbjd_number_show").html('')

             var code=$(this).data('code_sn');
             $(".slider_head_moreBox").hide();
             var cs_id=$(this).data('id');
             $(".zj_ck_info_check_jcd").text('查看借出单');
             $(".zj_jcd_my_fqd_bjd_div").hide();
             $(".zj_jcd_dwsp_bjd_div").hide();
             $(".zj_cswd_jrd_div").show();

             $.ajax({
                 type: 'post',
                 url: SERVER_URL + "/lend/basic",
                 data:{
                     token: token,
                     id:cs_id
                 },
                 dataType: "json",
                 success: function (data) {
                     console.log('100033333');
                     console.log(data);
                     console.log('100033333');
                     $(".zj_xdr_name_show").text(likNullData(data['data']['xiadan_name']));
                     $(".zj_create_time_show").text(likNullData(subTime(data['data']['create_time'])));
                     $(".zj_jcd_jb_info_show_nr p span").eq(0).text(likNullData(data['data']['code_sn']));
                     $(".zj_jcd_jb_info_show_nr p span").eq(1).text(likNullData(data['data']['supplier_name']));
                     $(".zj_jcd_jb_info_show_nr p span").eq(2).text(likNullData(subTime(data['data']['expect_return_time'])));
                     if(data['data']['tax_rate']==1){
                         $(".zj_jcd_jb_info_show_nr p span").eq(3).text('17%');
                     }else{
                         $(".zj_jcd_jb_info_show_nr p span").eq(3).text('无税');
                     }

                     $(".zj_jcd_jb_info_show_nr p span").eq(4).text(likNullData(data['data']['note']));
                     var c_name='';
                     $.each(data['cc'],function (i,csr_name) {
                         c_name+=''+csr_name['name']+','
                     })
                     c_name = c_name.slice(0, c_name.length - 1);
                     $(".zj_jcd_jb_info_show_nr p span").eq(5).text(likNullData(c_name));
                     if(data['data']['thetype']==0){
                         $(".zj_jcd_jb_info_show_nr p span").eq(6).text("-");
                     }else if(data['data']['thetype']==1){
                         $(".zj_jcd_jb_info_show_nr p span").eq(6).text("未归还");
                     }else if(data['data']['thetype']==2){
                         $(".zj_jcd_jb_info_show_nr p span").eq(6).text("部分归还");
                     }else if(data['data']['thetype']==3){
                         $(".zj_jcd_jb_info_show_nr p span").eq(6).text("已归还");
                     }else{
                         $(".zj_jcd_jb_info_show_nr p span").eq(6).text("-");
                     }
                     $(".zj_jcd_jb_info_show_nr p span").eq(7).text(likNullData(subTime(data['data']['send_time'])));

                     if(data['data']['logistics_type']==1){
                         $(".zj_jcd_jb_info_show_nr p span").eq(8).text('快递');
                     }else if(data['data']['logistics_type']==2){
                         $(".zj_jcd_jb_info_show_nr p span").eq(8).text('陆运');
                     }else if(data['data']['logistics_type']==3){
                         $(".zj_jcd_jb_info_show_nr p span").eq(8).text('空运');
                     }else if(data['data']['logistics_type']==4){
                         $(".zj_jcd_jb_info_show_nr p span").eq(8).text('海运');
                     }else if(data['data']['logistics_type']==5){
                         $(".zj_jcd_jb_info_show_nr p span").eq(8).text('平邮');
                     }else {
                         $(".zj_jcd_jb_info_show_nr p span").eq(8).text('-');
                     }
                     if(data['data']['is_freight']==1){
                         $(".zj_jcd_jb_info_show_nr p span").eq(9).text('包运费');
                     }else{
                         $(".zj_jcd_jb_info_show_nr p span").eq(9).text('不包');
                     }
                     // $(".zj_jcd_jb_info_show_nr p span").eq(9).text(data['data']['is_freight']);
                     $(".zj_jcd_jb_info_show_nr p span").eq(10).text(likNullData(data['data']['receiver']));
                     $(".zj_jcd_jb_info_show_nr p span").eq(11).text(likNullData(data['data']['mobile']));
                     $(".zj_jcd_jb_info_show_nr p span").eq(12).text(likNullData(data['data']['address']));
                     //$(".zj_jcd_jb_info_show_nr p span").eq().text(data['data']['']);

                 }
             })

             /*查看审批结果*/
             $.ajax({
                 type: 'post',
                 url: SERVER_URL + "/lend/approval-result",
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
                             html+='<img src="'+getImgUrl(vinfo['headpic'])+'">'
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

                         }else{
                             html+='<h3 class="f_color bold">-</h3>'
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
                     $(".zj_jcd_sp_result_box").html(html);
                     if(data['is_across']==1){
                         $(".zj_bz_is_hid").hide();
                     }else{
                         $(".zj_bz_is_hid").show();
                     }

                 }
             })

             /*查看详情*/
             $(".zj_ck_info_check_jcd").die().live("click",function(){
                 $.ajax({
                     type: 'POST',
                     url: SERVER_URL + "/lend/look-lend",
                     data: {
                         token: token,
                         //company_id: company_id, //公司id
                         id: cs_id// 用户id
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
                             $(".zj_jcd_check_xq_kh_name").text(likNullData(data['data']['supplier_name']))
                             $(".zj_jcd_quote_look_uname").text(data['data']['xiadan_name']);
                             $(".zj_jcd_quote_look_create_at").text(data['data']['create_time']);
                             $(".zj_look_info_header_content .zj_jcd_bh_show_info").eq(0).text(data['data']['code_sn']);
                             $(".zj_look_info_header_content .zj_jcd_bh_show_info").eq(1).text(data['data']['supplier_name']);
                             $(".zj_look_info_header_content .zj_jcd_bh_show_info").eq(2).text(data['data']['expect_return_time']);
                             $(".zj_look_info_header_content .zj_jcd_bh_show_info").eq(3).text(data['data']['send_time']);
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
                             }else{
                                 $(".zj_look_info_header_content .zj_jcd_bh_show_info").eq(4).text('-');
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
                                 var sor=repair(i+1)
                                 $.each(v,function(i2,v2){
                                     html+='<tr>\
                            <td>'+sor+'</td>\
                            <td>'+likNullData(v2['good_sn'])+'</td>\
                            <td>'+likNullData(v2['good_name'])+'</td>\
                            <td>'+likNullData(v2['good_attr'])+'</td>\
                            <td>'+likNullData(v2['good_num'])+''+v2['good_unit']+'</td>\
                            <td>'+likNullData(v2['good_price'])+'</td>\
                            <td>'+likNullData(v2['good_rate_price'])+'</td>\
                            <td>'+likNullData(v2['good_total'])+'</td>\
                            <td></td>\
                            </tr>'
                                 })

                             })
                             $(".zj_jcd_goods_table_content_info").html(html);
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
                                                <td>'+likNullData(v3['sing_num'])+''+v3['good_unit']+'</td>\
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
                                    <td>'+likNullData(arr['num'])+''+arr['good_unit']+'</td>\
                                    <td>'+likNullData(arr['price'])+'</td>\
                                    <td>'+likNullData(arr['containing_money'])+'</td>\
                                    <td class="zj_pzzj_goods_sum_price">'+likNullData(arr['total_money'])+'</td>\
                                    <td><button class="but_mix box_open_btn_1 but_blue_1">展开</button></td>\
                                </tr>\
                            </tbody>\
                            </table>\
                            </div>\
                            <div class="xs_tc_goods_box goods_tc_toggle" style="display: none;">'+setting+'</div>'

                             })


                             $(".tanceng .zj_jcd_complete_goods_dv_content").html(complete);
                             var z_sum=0;
                             $(".tanceng .zj_jcd_complete_goods_dv_content .zj_pzzj_goods_sum_price").each(function () {
                                 z_sum+=parseFloat($(this).text());
                             })
                             $(".zj_jcd_complete_goods_price_sum").text(z_sum);
                         }



                     }
                 })

             });
             /*借出归还单详情*/
             $("#zj_jcghd_left_head_table").die().live("click",function(){
                 $.ajax({
                     type: 'GET',
                     url: SERVER_URL + "/lend-out/list",
                     data: {
                         token: token,
                         lend_id:cs_id
                     },
                     dataType: "json",
                     success: function (data) {
                         console.log('100033333444');
                         console.log(data);
                         console.log('100033333444');

                             $(".zj_jcghd_number_show").text('('+data['totalcount']+')');

                         var info=''
                         $.each(data['dataList'],function(i,jcd_info){
                             info+=' <div class="takenote_jrd_jcgh">\
                               <div class="d-r-t-h sbar">\
                               <h3 class="cont_title">基本信息</h3>\
                               <p class="l-s-x">借出归还单编号：<span>'+jcd_info['code_sn']+'</span></p>\
                               <p class="l-s-x">借出单编号：<span>'+jcd_info['lend_code_sn']+'</span></p>\
                               <p class="l-s-x">客户：<span>'+jcd_info['customer_name']+'</span></p>\
                               </div>\
                               <div class="d-r-t-h sbar">\
                                   <h3 class="cont_title">入库信息</h3>\
                                   <p class="l-s-x">入库日期：<span>'+jcd_info['in_time']+'</span></p>\
                               </div>\
                               <div class="d-r-t-h sbar" style="padding-bottom: 40px;">\
                               <h3 class="cont_title">借出归还商品</h3>\
                               <p class="l-s-x" style="margin-bottom: 30px;"><span style="margin-left: -5px;"><button data-id="'+jcd_info['id']+'" class="but_blue but_small val_dialog zj_jcd_check_jcgh_info_btn" name="takenote_jcd_look_jbghd">查看借出归还单</button></span></p>\
                               </div>\
                           </div>'
                         })
                         $(".zj_jcd_jrghd_info_box").html(info);

                     }
                 })
                 /*详情*/

             });
             /*查看详情*/
             $(".zj_jcd_check_jcgh_info_btn").die().live("click",function(){
                 var gh_id=$(this).data('id');
                 $.ajax({
                     type: 'POST',
                     url: SERVER_URL + "/lend/look-lend",
                     data: {
                         token: token,
                         //company_id: company_id, //公司id
                         id: cs_id// 用户id
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
                             $(".zj_jcd_jcgh_kh_name_show").text(data['data']['supplier_name']);
                             $(".zj_jcgh_quote_look_create_at").text(data['data']['xiadan_name']);
                             $(".zj_jcgh_quote_look_uname").text(data['data']['create_time']);
                             $(".zj_jcgh_info_header_content .zj_info_show").eq(0).text(data['data']['code_sn']);
                             $(".zj_jcgh_info_header_content .zj_info_show").eq(1).text(data['data']['supplier_name']);
                             $(".zj_jcgh_info_header_content .zj_info_show").eq(2).text(data['data']['expect_return_time']);
                             $(".zj_jcgh_info_header_content .zj_info_show").eq(3).text(data['data']['send_time']);


                             // $(".zj_look_info_header_content .zj_jcd_bh_show_info").eq(6).text(data['data']['receiver']);
                             // $(".zj_look_info_header_content .zj_jcd_bh_show_info").eq(7).text(data['data']['mobile']);
                             // $(".zj_look_info_header_content .zj_jcd_bh_show_info").eq(8).text(data['data']['address']);
                             // $(".zj_look_info_header_content .zj_jcd_bh_show_info").eq(9).text(data['data']['note']);

                             // if(data['data']['goods']['sum_total']){
                             //     $(".tanceng .xs_bjd_bold .zj_jcd_goods_hj_sum").text(data['data']['goods']['sum_total']);
                             // }
                             /*  if(data['data']['setting']['sum_total']){
                              $(".xs_bjd_bold .zj_jcd_complete_goods_price_sum").text(data['data']['setting']['sum_total']);
                              }*/


                             /*ff*/
                             $(".zj_jcd_unit_price_hj").text(data['data']['unit_price_total']);
                             $(".zj_jcd_contain_tax").text(data['data']['tax_total']);
                             $(".zj_jcd_other_cost").text(data['data']['other_costs']);
                             $(".zj_jcd_sum_price_num").text(data['data']['all_money']);


                             var html='';
                             $.each(data['data']['goods'],function(i,v){
                                 $.each(v,function(i2,v2){
                                     html+='<tr>\
                            <td>'+likNullData(v2['good_sn'])+'</td>\
                            <td>'+likNullData(v2['good_name'])+'</td>\
                            <td>'+likNullData(v2['good_attr'])+'</td>\
                            <td>'+likNullData(v2['good_num'])+''+v2['good_unit']+'</td>\
                            <td>'+likNullData(v2['return_num'])+''+v2['good_unit']+'</td>\
                            <td></td>\
                            </tr>'
                                 })

                             })
                             $(".zj_check_jrghd_pt_goods_info").html(html);
                             /*整机商品*/

                             var complete='';
                             $.each(data['data']['setting'],function(i,arr){
                                 var setting='';
                                 if(arr['good_list']){
                                     $.each(arr['good_list'],function(i2,v2){
                                         var setting_goods=''
                                         if(v2['attr_list']){
                                             $.each(v2['attr_list'],function(i3,v3){
                                                 setting_goods+='<tr>\
                                                <td>'+likNullData(v3['good_sn'])+'</td>\
                                                <td>'+likNullData(v3['good_attr'])+'</td>\
                                                <td>'+likNullData(v3['sing_num'])+''+v3['good_unit']+'</td>\
                                                <td>'+likNullData(v3['return_num'])+''+v3['good_unit']+'</td>\
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
                               <th width="120">名称</th>\
                               <th width="240">属性</th>\
                               <th width="70">借出数量</th>\
                               <th width="70">归还数量</th>\
                               <th width="60">配件</th>\
                            </tr>\
                            </thead>\
                            <tbody>\
                                <tr class="c_3 c_3 xs_bjd_bold">\
                                    <td>'+likNullData(arr['good_sn'])+'</td>\
                                    <td>'+likNullData(arr['good_name'])+'</td>\
                                    <td>'+likNullData(arr['good_attr'])+'</td>\
                                    <td>'+likNullData(arr['num'])+''+arr['good_unit']+'</td>\
                                    <td>'+likNullData(arr['return_num'])+''+arr['good_unit']+'</td>\
                                    <td><button class="but_mix box_open_btn_1 but_blue_1">展开</button></td>\
                                </tr>\
                            </tbody>\
                            </table>\
                            </div>\
                            <div class="xs_tc_goods_box goods_tc_toggle" style="display: none;">'+setting+'</div>'

                             })


                             $(".tanceng .zj_check_jrghd_complate_info").html(complete);
                             // var z_sum=0;
                             // $(".tanceng .zj_jcd_complete_goods_dv_content .zj_pzzj_goods_sum_price").each(function () {
                             //     z_sum+=parseFloat($(this).text());
                             // })
                             // $(".zj_jcd_complete_goods_price_sum").text(z_sum);
                         }

                     }
                 })
             });
             /*销售报价单*/
             $("#zj_xsbjd_left_head_table").die().live("click",function(){
                 $.ajax({
                     type: 'post',
                     url: SERVER_URL + "/lend/quote",
                     data:{
                         token: token,
                         id:cs_id
                     },
                     dataType: "json",
                     success: function (data) {
                         console.log('606');
                         console.log(data);
                         console.log('606');

                             $(".zj_xsbjd_number_show").html('('+data['data'].length+')')

                         var xs_list='';
                         $.each(data['data'],function(i,vlist){
                             xs_list+='<div class="takenote_jrd_jcgh">\
                                 <div class="d-r-t-h sbar">\
                                 <h3 class="cont_title">基本信息</h3>\
                                 <p class="l-s-x">销售订单编号：<span>'+likNullData(vlist['quote_code_sn']) +'</span></p>\
                                 <p class="l-s-x">客户：<span>'+likNullData(vlist['customer_name'])+'</span></p>\
                                 <p class="l-s-x">销售合同：<span>'+likNullData(vlist['contract_id'])+'</span></p>\
                                 <p class="l-s-x">销售报价单：<span>'+likNullData(vlist['code_sn'])+'</span></p>\
                                 <p class="l-s-x">负责部门：<span>'+likNullData(vlist['dept_name'])+'</span></p>\
                                 <p class="l-s-x">负责人：<span>'+likNullData(vlist['owner_name'])+'</span></p>\
                                 </div>\
                                 </div>'
                         })
                         $(".zj_xsbjd_info_xq_dv_show").html(xs_list);


                     }
                 })
             });
             /**********出库单***************/
             $("#zj_ckd_left_head_table").die().live("click",function () {
                 $.ajax({
                     type: 'get',
                     url: SERVER_URL + "/borrow-out/stockoutinfo",
                     data:{
                         token: token,
                         related_receipts_no:code
                     },
                     dataType: "json",
                     success: function (data) {
                         console.log('60666');
                         console.log(data);
                         console.log('60666');
                         if(data['data']['shipments_status']==1){
                             $(".zj_jcd_fh_state_name").text('待发货');
                         }else if(data['data']['shipments_status']==2){
                             $(".zj_jcd_fh_state_name").text('部分发货');
                         }else if(data['data']['shipments_status']==3){
                             $(".zj_jcd_fh_state_name").text('完成发货');
                         }
                         if(data['data']['stockingOutList']['output_num']){
                             $(".zj_zcd_order_look_skjl_tbody_nodata_box").hide()
                             var rk_info='<tr class="table_total ven_sell_order_look_skjl_tbody_table_total">\
                            <td>'+data['data']['stockingOutList']['output_num']+'</td>\
                            <td>'+data['data']['stockingOutList']['distribution_num']+'</td>\
                            <td>'+data['data']['stockingOutList']['set_num']+'</td>\
                            <td>'+data['data']['stockingOutList']['combo_set_num']+'</td>\
                            <td>'+data['data']['stockingOutList']['is_package_freight']+'</td>\
                            <td>'+data['data']['stockingOutList']['distribution_name']+'</td>\
                            </tr>'
                             $(".zj_goods_ckd_order_look_skjl_tbody").html(rk_info);
                         }else{
                             $(".zj_goods_ckd_order_look_skjl_tbody").empty();
                             $(".zj_zcd_order_look_skjl_tbody_nodata_box").show();
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
                             $(".zj_goods_jcd_order_look_skjl_tbody").html(kf_goods);
                         }else{
                             $(".zj_goods_jcd_order_look_skjl_tbody").empty();
                             $(".zj_jcd_order_look_skjl_tbody_nodata_box").show();
                         }

                         var wl_list='';
                         $.each(data['data']['logisticsList'],function(i,list){
                             wl_list+='<div class="takenote_jrgh_look_div">\
                           <div class="left">\
                           <p class="l-s-x c_3">物流公司：<span>'+list['logistics_name']+'</span></p>\
                           <p class="l-s-x c_3">物流单号：<span>'+list['logistics_sn']+'</span></p>\
                           </div>\
                           <div class="right"><button class="but_small but_blue val_dialog zj_check_fh_goods_info" data-logistics_name="'+list['logistics_name']+'" data-logistics_sn="'+list['logistics_sn']+'" name="takenote_look_jcd_goods">查看发货商品</button></div>\
                           </div>'
                         })
                         $(".zj_jcd_fh_state_show_div").html(wl_list);
                     }
                 })

             });
             /*查看发货商品*/
             $(".zj_check_fh_goods_info").die().live("click",function(){
                 var logistics_sn=$(this).data('logistics_sn');
                 var logistics_name=$(this).data('logistics_name');
                 $.ajax({
                     type: 'get',
                     url: SERVER_URL + "/stock-out/shipmentsdetail",
                     data: {
                         token: token,
                         logistics_sn: logistics_sn
                     },
                     dataType: "json",
                     success: function (data) {
                         console.log('60666');
                         console.log(data);
                         console.log('60666');
                         $(".zj_fh_quote_look_create_at").text(data['data']['create_time']);
                         $(".zj_fh_quote_look_uname").text(data['data']['shipments_name']);
                         $(".zj_gl_wl_danhao").text(data['data']['related_receipts_no']);
                         $(".zj_wl_gs_name").text(logistics_name);
                         $(".zj_wl_d_number").text(data['data']['number']);
                         var complate_goods=''
                         $.each(data['data']['productList'],function(i,goods){
                             complate_goods+='<tr class="c_3">\
                            <td>'+repair(i+1)+'</td>\
                            <td>'+goods['code_sn']+'</td>\
                            <td>'+goods['product_name']+'</td>\
                            <td>'+goods['attr_name']+'</td>\
                            <td>'+goods['shipments_num']+'</td>\
                            </tr>';
                         })
                         $(".zj_check_fh_goods_content").html(complate_goods);
                     }
                 })
             });
         })
     });


     /*新建btn*/
     $(".zj_new_create_jcd_btn_tc").die().live("click",function () {
        $(".zj_new_jcd_create_day_time").text(getCurrentDateDay());
        $(".zj_jcd_xdr_name_display").text(username);
         new_number('.zj_put_jcd_num_bh_val','JCD');
        $(".zj_jcd_select_tax_list li").die().live("click",function(){
            var name=$(this).text();
            $(".zj_jcd_new_conten_tax").text(name);
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
                 type_id: 8, // 类型(1销售合同,2采购合同,3员工合同,4其他合同,5采购报价单,6采购退换货,7借入单,8借出单,9归还单,10,归还单(借入归还),11(借出归还)
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
                     $(".zj_jcd_sprtc_ul_content").data('kuaji',data['kuaji'])
                     if(data['kuaji']==1) {
                         $.each(data['data'], function (i, v) {

                                 if (v['face'] != '') {
                                     html += '<li data-id="' + v['uid'] + '" class="zj_spr_num"><em class="icon_personBtn"><img src="' + getImgUrl(v['face']) + '" style="width: 34px;height: 34px;border-radius:50px;"/></em> <em class="icon_adderBtn"></em> <p class="box_adderName">' + v['name'] + '</p> </li>'
                                 } else {
                                     html += '<li data-id="' + v['uid'] + '" class="left zj_spr_num"> <em class="icon_personBtn icon_personBtn_msg"></em> <em class="icon_adderBtn"></em> <p class="box_adderName">' + v['name'] + '</p></li>'
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

                     $(".zj_jcd_sprtc_ul_content").html(html);
                     $(".zj_jcd_sprtc_ul_content li:last-child").find('i').hide();

                 }else{
                     alert(data.msg);
                 }

             }
         })

         /*抄送人弹框按钮*/
         var  arr_id=[];/*抄送人id*/
         var cs_name=[];/*抄送人名字*/
         $(".tanceng .zj_jcd_select_csr_btn").die().live("click",function(){
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
                         $(".tanceng .zj_jcd_csr_cy_left_ul_list").html(head+tree_list_bmfzr(data, deep));
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

             $(".tanceng .zj_jcd_csr_cy_left_ul_list .person_left_nav").die().live("click",function(){
                 /* debugger;*/
                 var id=$(this).attr("userinfoid");
                 var name=$(this).find("span.list_msg").text();
                 $(this).toggle(function(){
                     $('.tanceng .zj_jcd_select_csr_right_list_ul').append('<li rid="'+$(this).attr('userinfoid')+'"><span>'+$(this).children('.list_msg').text()+'</span><i class="list_choose_delete"></i></li>')
                     $(this).append('<span class="list_check"><em class="on"></em></span>');
                     //$(this).find('span.list_check em').addClass('on')
                     arr_id.unshift(id);
                     cs_name.unshift(name)
                     console.log(arr_id);
                     console.log(cs_name);

                 },function(){
                     $('.tanceng .zj_jcd_select_csr_right_list_ul').find('li[rid='+$(this).attr('userinfoid')+']').remove()
                     //$(this).remove('<span class="list_check"><em class="on"></em></span>');
                     $(this).find('span.list_check').remove()
                     arr_id.splice(jQuery.inArray(id,arr_id),1);
                     cs_name.splice(jQuery.inArray(id,cs_name),1);
                     console.log(arr_id);
                     console.log(cs_name);

                 })
                 $(this).trigger('click')

                 /*抄送人确认按钮*/
                 $(".tanceng .zj_jcd_select_csr_end_btn").die().live("click",function(){
                     //cs_name=getJsonArr(cs_name);
                     var cs_per="";

                     $.each($(".tanceng .zj_jcd_select_csr_right_list_ul li"),function (i,v) {
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
                     $(".zj_jcd_select_csr_btn").parent().before(cs_per);
                     $(this).closest('.dialog_box').remove();
                     //$(".zcj_shoose_right_list").empty();

                 });
             });

             /*删除选择的抄送人*/
             $(".tanceng .zj_jcd_select_csr_right_list_ul .list_choose_delete").die().live("click",function(){
                 var cs_id=$(this).parent().attr("rid");
                 var name=$(this).prev().text();

                 $(this).parent().remove();
                 arr_id.splice(jQuery.inArray(cs_id,arr_id),1);
                 cs_name.splice(jQuery.inArray(name,cs_name),1);
                 console.log(arr_id);
                 console.log(cs_name);
                 $(".tanceng .zj_jcd_csr_cy_left_ul_list .person_left_nav").each(function(){
                     if($(this).attr('userinfoid')==cs_id){
                         $(this).click();
                         $(this).children('span.list_check').remove();
                     }
                 })
             });

             /*抄送人取消按钮*/
             /* $(".zcj_qx_canael_btn").live("click",function(){
              arr_id.length = 0;
              cs_name.length = 0;
              $(".zcj_select_shoose_right_list").empty();
              });
              /!*直接关闭*!/
              $(".zj_gb_close_bt").live("click",function(){
              arr_id.length = 0;
              cs_name.length = 0;
              $(".zcj_select_shoose_right_list").empty();

              });*/
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
         //客户按区域分类参数
         var cusListByAreaData = {
             token: token,
             status: 0
         };
         //所有客户按区域分类
         function getCusListByAreaSort() {
             $.ajax({
                 url: SERVER_URL + '/customer/arealist',
                 type: 'GET',
                 data: cusListByAreaData,
                 dataType: 'json',
                 success: function (oE) {
                     $('i.ven_cus_area_total').html(oE.count);
                     var datalist = oE.datalist;
                     var deep = 0;
                     $('.ven_customer_area_sort_list').html(tree_list_close(datalist, deep));
                     // 下级分类图标样式控制
                     for (var i = 0; i < $('i.ven_customer_area_sort_list li').length; i++) {
                         if ($('i.ven_customer_area_sort_list li').eq(i).next('ul').children().length == 0) {
                             $('i.ven_customer_area_sort_list li').eq(i).find('span').addClass('oth');
                             $('i.ven_customer_area_sort_list li').eq(i).parent('ul').addClass('oth')
                         }
                     }
                     $('.hr_left_all').live("click", function () {
                         //判断点击元素下有没有ul子节点，有的话展开树结构
                         var next_p = $(this).nextAll('i').find('ul');
                         if (next_p.length > 0) {
                             $(this).parents('ul').toggleClass("change");
                             $(this).nextAll('i').toggle();
                         }

                         $(this).parents(".hr_left_nav").find("cite").remove();
                         $(this).append("<cite></cite>");
                     });
                     $('.hr_left_1').die('click').live("click", function () {
                         $(this).nextAll('ul').toggle();
                         //判断点击元素下有没有ul子节点，有的话展开树结构
                         var next_p = $(this).nextAll('ul');
                         if (next_p.length > 0) {
                             $(this).nextAll('ul').toggle();
                         }
                         $(this).parents(".hr_left_nav").find("cite").remove();
                         $(this).append("<cite></cite>");
                     });
                 },
                 error: function (e) {
                     console.log(e);
                 }
             })
         }
         getCusListByAreaSort();
         /*选择客户*/
          $(".zj_select_kehu_add_btn").die().live("click",function(){



             $('#ven_customer_area_sort_list_wrap_ul li').eq(0).trigger('click');
             // function getCusListByOwnerSort() {
             //     $.ajax({
             //         url: SERVER_URL + '/dept/deptlist',
             //         type: 'GET',
             //         data: {
             //             token: token
             //         },
             //         dataType: 'json',
             //         success: function (oE) {
             //             console.log(oE);
             //             if (oE.code == 0) {
             //                 var datalist = oE.rows;
             //                 //负责人列表
             //                 $('.ven_customer_owner_sort_list').html(tree_list_dept_person(oE));
             //                 //判断部门图标样式
             //                 $.each($('.left_1'), function (i, v) {
             //                     if ($('.left_1').eq(i).next('ul').children().length == 0) {
             //                         $('.left_1').eq(i).children('span.icon_open').addClass('other')
             //                     }
             //                 });
             //             }
             //         }
             //     })
             // }
             // getCusListByOwnerSort();
             /*选择人列表*/

             // $('#ven_customer_dept_sort_list_wrap_ul .hr_left_bmyg2').die().live("click", function () {
             //     $(this).parents(".hr_left_nav").find("cite").remove();
             //     $(this).append("<cite></cite>");
             // });
          });
         // 客户>客户列表
// 初始化获取列表参数
         var getCusListData = {
             token: token,
             page: 1, //当前页
             num: 10, // 每页显示条数
             key: '', // 关键字
             industry_big_id: '', // 行业大类id
             category_id: '', // 分类id
             comefrom: '', // 来源类型id
             grade: '', // 级别id
             credit: '', // 信用额度
             dept: '',
             owner: '', // 负责人id
             created_at: '',
             statusflag: 0 // 作废状态  0 有效客户 1 作废客户  不传 是全部
         };
         function getCusList() {
             $.ajax({
                 url: SERVER_URL + '/customer/list',
                 type: 'GET',
                 data: getCusListData,
                 dataType: 'json',
                 success: function (e) {
                     if (e.code == 0) {
                         /* var delOnOff = '';
                          if($.inArray(venCusDel, venCusPowerList) == -1){
                          delOnOff = 'none';
                          }else{
                          delOnOff = '';
                          }*/

                         var cuslist = e.datalist;
                         console.log(cuslist);
                         $('.xs_kh_ssjg').html(e.totalcount);
                         if (cuslist.length == 0) {
                             $('.ven_custom_nodata_box').removeClass('none');
                             $('.zj_ven_custom_handle').addClass('none');
                         } else {
                             $('.ven_custom_nodata_box').addClass('none');
                             $('.zj_ven_custom_handle').removeClass('none');
                         }
                         var hylist=''
                         var jb_list=''
                         var xs_kh_hy_array = [];
                         // 客户列表
                         var oCuslist = '';
                         // 客户作废状态
                         var cusSta = '';
                         for (var i = 0; i < cuslist.length; i++) {
                             // 客户联系人名字
                             var con1 = '';
                             // 客户联系人详细信息
                             var con2 = '';
                             if (cuslist[i].contacts && cuslist[i].contacts.length > 0) {
                                 for (var j = 0; j < cuslist[i].contacts.length; j++) {
                                     if (cuslist[i].contacts[j].name == '') {
                                         //continue;
                                     } else {
                                         con1 += cuslist[i].contacts[j].name + '、';

                                     }
                                 }
                                 con1 = con1.substring(0, con1.length - 1);
                             }
                             /*  var cusSort = '',
                              cusBtnClass = '',
                              cusContactClass = '';
                              if (cuslist[i].status == 1) {
                              cusSta = 'grey';
                              cusSort = '<span class="voidIcon">作废</span>';
                              cusBtnClass = 'btn_dis_none';
                              cusContactClass = ''
                              } else {
                              cusSta = '';
                              cusSort = l_dbl(i + 1);
                              cusBtnClass = '';
                              cusContactClass = 'vend_client_contact'
                              }*/
                             // if(cuslist[i].grade_name!=null || cuslist[i].grade_name!=''){
                             //     jb_list+='<li>'+cuslist[i].grade_name+'</li>'
                             // }

                             if (xs_kh_hy_array.indexOf(cuslist[i].industry_big_name) == -1) {
                                 xs_kh_hy_array.push({
                                     hyid: cuslist[i].industry_big_id,
                                     hymz: cuslist[i].industry_big_name
                                 });
                             }
                             oCuslist += '<tr class="' + cusSta + '" cusid="' + cuslist[i].id + '">' +
                                 '<td><input type="radio" data-id="' + cuslist[i].id + '" data-name="'+cuslist[i].name+'" name="jcd_choose_kh"></td>' +
                                 '<td>' + likNullData(cuslist[i].code_sn) + '</td>' +
                                 '<td>' + likNullData(cuslist[i].name) + '</td>' +
                                 '<td>' + likNullData(cuslist[i].tel) + '</td>' +
                                 '<td>' + likNullData(cuslist[i].grade_name) + '</td>' +
                                 '<td>' + likNullData(cuslist[i].industry_big_name) + '</td>' +
                                 '<td>' + likNullData(cuslist[i].comefrom_name) + '</td>' +
                                 '<td>' + con1 +'</td>' +
                                 /*'<td>' + likNullData(cuslist[i].vol) + '</td>' +
                                  '<td>' + likNullData(cuslist[i].dept_name) + '</td>' +
                                  '<td>' + likNullData(cuslist[i].owner_name) + '</td>' +*/
                                 '<td>' + likNullData(cuslist[i].note) + '</td>'

                         }
                         $('.zj_jcd_kh_lxr_list_info_show').html(oCuslist);

                         //$(".ven_sell_chance_create_choose_customer_grade_list").html(jb_list);
                         // 行业下拉框数据循环
                         xs_kh_hy_array = getJsonArr(xs_kh_hy_array);
                         for (var i = 0; i < xs_kh_hy_array.length; i++) {
                             hylist += '<li hybigid="' + xs_kh_hy_array[i]['hyid'] + '">' + xs_kh_hy_array[i]['hymz'] + '</li>'
                         }
                         $(".ven_sell_chance_create_choose_customer_industry_list").html(hylist);
                         list_table_render_pagination('.zj_page_ven31_cuslist', getCusListData, getCusList, e.totalcount, cuslist.length);

                         // likShow('#ven_custom_table', venCustomLookAbledField, '#xs_kh_xzckx', '#xs_kh_ckx_save', '#xs_kh_ckx_reset');
                         // 获取客户列表时调用一次选择查看项
                         //$('#xs_kh_ckx_save').trigger("click");
                     }

                 }
             });
         }

         getCusList();
         //切换地区搜索客户
         $('#ven_customer_area_sort_list_wrap_ul li').live('click', function () {
             getCusListData.id = $(this).attr('cussortid');
             getCusListData.page = 1;
             getCusListData.p_dept = '';
             getCusListData.dept = '';
             getCusListData.owner = '';
             getCusList();
         });
         // 客户>高级搜索>客户级别
         $('.ven_sell_chance_create_choose_customer_grade_list li').die('click').live('click', function () {
             getCusListData.grade = $('.ven_sell_chance_create_choose_customer_grade_list li').index($(this))
             getCusList()
         })
         /*行业*/
         $('.ven_sell_chance_create_choose_customer_industry_list li').die('click').live('click', function () {
             getCusListData.industry_big_id = $(this).attr('hybigid');
             getCusList()
         })
//切换部门搜索客户
         $('#ven_customer_dept_sort_list_wrap_ul li.hr_left_1').die('click').live('click', function () {
             getCusListData.id = '';
             getCusListData.page = 1;
             if($(this).attr('deepid') == 'top_1'){
                 getCusListData.p_dept = $(this).attr('id');
                 getCusListData.dept = '';
             }else{
                 getCusListData.p_dept = '';
                 getCusListData.dept = $(this).attr('id');
             }
             getCusListData.owner = '';
             getCusList();
             return false;
         });
         $('#ven_customer_dept_sort_list_wrap_ul li.hr_left_bmyg2').die('click').live('click', function () {
             getCusListData.id = '';
             getCusListData.page = 1;
             getCusListData.p_dept = '';
             getCusListData.dept = '';
             getCusListData.owner = $(this).attr('manid');
             getCusList();
             return false;
         });
         // 搜索关键字
         $('.zj_xs_kh_search').die('click').live('click', function () {
             if ($('.zj_xs_kh_search_inp').val() == '搜索客户编号/客户名称') {
                 getCusListData.key = ''
             } else {
                 getCusListData.key = $('.zj_xs_kh_search_inp').val()
             }
             getCusList()
         });
         /*选择确定*/
         $(".tanceng .zj_sell_create_choose_customer_save").die().live('click',function(){
             var khid=null;
             var khname=null;
             $(".zj_jcd_kh_lxr_list_info_show input").each(function(){
                 if($(this).is(':checked')){
                     khid=$(this).data('id');
                     khname=$(this).data('name')
                 }
             })
             if(khid==null){
                 alert('请选择客户');
             }else{
                 $('.zj_sell_quote_create_choose_lend_inp').data('id',khid).val(khname).addClass('c_3');
                 $(this).parents('.dialog_content_middle2').find('.dialog_close').click();
             }
             $.ajax({
                 url: SERVER_URL + '/customer/info',
                 type: 'GET',
                 data: {
                     token: token,
                     customer_id:khid
                 },
                 dataType: 'json',
                 success: function (oE) {
                     console.log(oE);
                     if(oE.code==0){
                         $(".zj_jcd_sh_adrr").val(oE.data['address']);
                         if(oE.data['contacts'].length>0){
                             var html='';
                             $.each(oE.data['contacts'],function (i,v) {
                                 html+='<li data-name="'+v['name']+'" data-tel="'+v['tel']+'">'+v['name']+'</li>';

                             })
                             $(".zj_select_kh_name_list").html(html);

                         }
                     }
                     if($(".zj_select_kh_name_list li").length>0){
                         var c_name=$(".zj_select_kh_name_list li").eq(0).data('name');
                         var c_tel=$(".zj_select_kh_name_list li").eq(0).data('tel');
                         $(".zj_select_shr_name_show").val(c_name);
                         $(".zj_jcd_lx_mobie_show").val(c_tel);
                     }


                 }
             })
             $(".zj_select_kh_name_list li").die().live('click',function () {
                 var tel=$(this).data('tel');
                 $('.zj_jcd_lx_mobie_show').val(tel)
             });

         });
     });
     /*新建借出单参数*/
     var newCreateData = {
         token: token,
         uid:uid,
         company_id:company_id,
         code_sn: '', // 借入单编号
         //borrow_id: '', // 借入单id
         supplier_id: '', // 供应商id
         expect_return_time: '', // 预计归还日期
         tax_rate: '', // 税率
         send_time: '',//发货日期
         note: '', // 备注
         logistics_type:'',//物流方式,1快递,2陆运,3空运,4海运,5平邮
         is_freight:'',//是否包运费 0 不包 1包运费
         receiver:'',//收货人
         mobile:'',//联系电话
         address:'',//地址
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
                 $('.tanceng .zj_jcd_select_goods_left_list_ul').html(goodsCateListHtml);
                 getGoodsListByCateFn($('.tanceng .zj_jcd_select_goods_left_list_ul li:first-child').data('id'));
             },
             error: function (e) {
                 alert(e.msg);
                 console.log(e);
             }
         });
     }

     /*选择商品按钮*/
     $(".tanceng .zj_jcd_quote_create_choose_goods_btn").die().live("click",function(){
         CreateChooseGoods_list();

     });

     //商品分类搜索功能
     $('.tanceng .zj_jcd_quote_create_choose_goods_cate_search_btn').die('click').live('click', function () {
         if ($('.zj_jcd_quote_create_choose_goods_cate_search_inp').val() == '') {
             return false;
         }
         $('.tanceng .zj_jcd_quote_create_choose_goods_inp_add_list').html('<li style="margin-top: 1px;">' + $('.zj_jcd_quote_create_choose_goods_cate_search_inp').val() + ' <i></i></li>');
         selectGoodsData.name = $('.zj_jcd_quote_create_choose_goods_cate_search_inp').val();
         CreateChooseGoods_list();
         $('.zj_jcd_quote_create_choose_goods_cate_search_inp').val('').attr('readonly', true);
     });

     //商品分类 - 删除搜索项
     $('.tanceng .zj_jcd_quote_create_choose_goods_inp_add_list li i').die('click').live('click', function () {
         $(this).closest('li').remove();
         selectGoodsData.name = '';
         CreateChooseGoods_list();
         $('.zj_jcd_quote_create_choose_goods_cate_search_inp').val('').attr('readonly', false);
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
                 $('.tanceng .zj_zcd_quote_create_choose_goods_totals_num').html(oE['totalcount']);
                 var datalist = oE.dataList;
                 if (datalist.length > 0) {
                     $('.zj_jcd_quote_create_choose_goods_handle_page').removeClass('none');
                     $('.zj_jcd_create_choose_goods_nodata_box_no_data').addClass('none');
                 } else {
                     $('.zj_jcd_quote_create_choose_goods_handle_page').addClass('none');
                     $('.zj_jcd_create_choose_goods_nodata_box_no_data').removeClass('none');
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
                 $('.tanceng .zj_jcd_quote_create_choose_goods_list_thead').html('<tr><th>选择</th><th>商品编号</th><th>名称</th><th>基本单位</th>' + goodsAttrName + '<th>备注</th></tr>');
                 //表格主体
                 $('.tanceng .zj_jcd_select_goods_content_body').html(goodsListHtml);
                 //分页
                 list_table_render_pagination('.zj_jcd_quote_create_choose_goods_handle_page', getGoodsDataList, purQuoteCreateChooseGoodsFn, oE['totalcount'], datalist.length);
             },
             error: function (e) {
                 alert(e.msg);
                 console.log(e);
             }
         });
     }
     //选择商品分类切换商品列表
     $('.zj_jcd_select_goods_left_list_ul li').die('click').live('click', function () {
         $('.zj_quote_create_choose_goods_search_inp').val('搜索商品编号/商品名称').css('#ccc');
         getGoodsDataList.key = '';
         getGoodsListByCateFn($(this).data('id'));
     });
     //切换分类调取不同列表 函数
     function getGoodsListByCateFn(cateid) {
         if (cateid == undefined) {
             $('.zj_jcd_select_goods_content_body').addClass('none');
             $('.zj_jcd_quote_create_choose_goods_handle_page').addClass('none');
             $('.zj_jcd_create_choose_goods_nodata_box_no_data').removeClass('none');
             return false;
         } else {
             getGoodsDataList.cate_id = cateid;
             $('.zj_jcd_select_goods_content_body').removeClass('none');
             $('.zj_jcd_quote_create_choose_goods_handle_page').removeClass('none');
             $('.zj_jcd_create_choose_goods_nodata_box_no_data').addClass('none');
         }
         purQuoteCreateChooseGoodsFn();
     }
     //搜索关键字
     $('.tanceng .zj_jcd_quote_create_choose_goods_cate_search_btn').die('click').live('click', function () {
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
     $('.tanceng .zj_jcd_select_create_choose_goods_save_btn').die('click').live('click', function () {
         $.each($('.tanceng .zj_jcd_select_goods_content_body tr'), function (i, v) {
             if ($('.tanceng .zj_jcd_select_goods_content_body tr').eq(i).find('input:checkbox').is(':checked')) {
                 aPurQuoteCreateGoodsChosen.push({
                     'goodsid': $('.tanceng .zj_jcd_select_goods_content_body tr').eq(i).data('id'),
                     'goodstaxtype': $('.tanceng .zj_jcd_select_goods_content_body tr').eq(i).attr('goodstaxtype'),
                     'goodsname': $('.tanceng .zj_jcd_select_goods_left_list_ul li.Sideslip_list_on').data('name'),
                     'goodscodesn': $('.tanceng .zj_jcd_select_goods_content_body tr').eq(i).find('td.goodscodesn').data('code_sn'),
                     'goodsattr': $('.tanceng .zj_jcd_select_goods_content_body tr').eq(i).attr('goodsattr'),
                     'goodsunitname': $('.tanceng .zj_jcd_select_goods_content_body tr').eq(i).find('td.goodsunitname').data('unit_name')
                 });
             }
             //$('.tanceng .pur_quote_create_choose_goods_list tr').eq(i).find('input.goodsnum').val();
         });
         var purQuoteCreateGoodsList = '';
         aPurQuoteCreateGoodsChosen = getJsonArr(aPurQuoteCreateGoodsChosen);
         if (aPurQuoteCreateGoodsChosen.length != 0) {
             $('.tanceng .zj_jcd_quote_create_chosen_goods_add_btn_tr').addClass('none');
         } else {
             $('.tanceng .zj_jcd_quote_create_chosen_goods_add_btn_tr').removeClass('none');
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
             if ($('.tanceng .zj_jcd_contain_tax_val_ratio').val() == '含税17%') {
                 taxNum = 17;
             } else if ($('.tanceng .zj_jcd_contain_tax_val_ratio').val() == '无税') {
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
                                                <td><button class="but_blue but_opa_small but_green val_dialogTop zj_jcd_quote_create_choose_goods_btn" name="takenote_jcd_xzsp">+</button><button class="but_opa_small but_red pur_quote_create_goods_del_btn">-</button></td>\
                                            </tr>'
         });
         $('.tanceng .zj_jcd_quote_create_chosen_goods_tbody_content').html(purQuoteCreateGoodsList);
         //productnumChangeFn();
         //goodTaxTotalsFn();
         //goodCostTotalsFn();
         $(this).closest('.dialog_box').remove();
         purQuoteCreateProductnumChangeFn();
     });

     //商品数量控制
     function purQuoteCreateProductnumChangeFn() {
         var goodsNumTotal = 0;
         $.each($('.tanceng .zj_jcd_quote_create_chosen_goods_tbody_content .productnum'), function (i, v) {
             goodsNumTotal += parseFloat($('.tanceng .zj_jcd_quote_create_chosen_goods_tbody_content .productnum').eq(i).val());
         });
         $('.tanceng .zj_jcd_goods_num_total').html(goodsNumTotal);
     }

     //商品数量增加减少
     $('.tanceng .zj_jcd_quote_create_chosen_goods_tbody_content .pur_quote_productnum_change').die('click').live('click', function () {
         var index = $(this).closest('tr').index();
         purQuoteCreateProductnumChangeFn();
         purQuoteCreateGoodCostCalcFn(index);
         purQuoteCreateGoodCostTotalsFn();
         //purQuoteCreateGoodTaxTotalsFn();
     });
//商品单条金额计算
     function purQuoteCreateGoodCostCalcFn(index) {
         //单条商品税额
         $('.tanceng .zj_jcd_quote_create_chosen_goods_tbody_content .pur_quote_goods_tax_total').eq(index).html(moneyToFixed($('.tanceng .zj_jcd_quote_create_chosen_goods_tbody_content .pur_quote_goods_cost_one').eq(index).val() * (100 + parseFloat($('.tanceng .zj_jcd_quote_create_chosen_goods_tbody_content .pur_quote_goods_tax_one').eq(index).html())) / 100));
         //单条商品价格
         $('.tanceng .zj_jcd_quote_create_chosen_goods_tbody_content .pur_quote_goods_one_cost_total').eq(index).html(moneyToFixed($('.tanceng .zj_jcd_quote_create_chosen_goods_tbody_content .productnum').eq(index).val() * $('.tanceng .zj_jcd_quote_create_chosen_goods_tbody_content .pur_quote_goods_tax_total').eq(index).text()));
     }
//商品单价调整
     $('.tanceng .zj_jcd_quote_create_chosen_goods_tbody_content .pur_quote_goods_cost_one').live('keyup', function () {
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
         $.each($('.tanceng .zj_jcd_quote_create_chosen_goods_tbody_content .pur_quote_goods_one_cost_total'), function (i, v) {
             goodsCostTotals += parseFloat($('.tanceng .zj_jcd_quote_create_chosen_goods_tbody_content .pur_quote_goods_one_cost_total').eq(i).html());
         });
         $('.tanceng .zj_jcd_goods_cost_total').html(moneyToFixed(goodsCostTotals));
         purQuoteCreateProductCostTotalFn();
     }
     //税额总价
     function purQuoteCreateGoodTaxTotalsFn() {
         var goodsTaxTotals = 0;
         $.each($('.tanceng .zj_jcd_quote_create_chosen_goods_tbody_content .pur_quote_goods_tax_total'), function (i, v) {
             goodsTaxTotals += parseFloat($('.tanceng .zj_jcd_quote_create_chosen_goods_tbody_content .pur_quote_goods_tax_total').eq(i).html());
         });
         $('.tanceng .zj_jcd_goods_cost_total').html(moneyToFixed(goodsTaxTotals));
         //purQuoteCreateProductCostTotalFn();
     }

     //删除单条商品
     $('.tanceng .zj_jcd_quote_create_chosen_goods_tbody_content .pur_quote_create_goods_del_btn').die('click').live('click', function () {
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
         purQuoteCreateGoodsArrOrderFn('.zj_jcd_quote_create_chosen_goods_tbody_content');

     });
     //选择商品 - 序号
     function purQuoteCreateGoodsArrOrderFn(parentClass) {
         $.each($('.tanceng .' + parentClass + ' .pur_quote_create_choose_goods_order'), function (i, v) {
             $('.tanceng .' + parentClass + ' .pur_quote_create_choose_goods_order').eq(i).html(l_dbl(i + 1));
         })
     }
     /************************新建整机商品借入单 选择整机商品******************************/


     $('.tanceng .zj_jcd_quote_create_choose_setting_btn').die('click').live('click', function () {
         CreateChooseSettingSortFn();
         purQuoteSettingGoodsListArr = [];
         $.each($('.tanceng .zj_jcd_quote_create_choose_setting_list .pur_quote_create_choose_setting_kxp_list'), function (i, v) {
             purQuoteSettingGoodsListArr.push($('.tanceng .pur_quote_create_choose_setting_box_list .pur_quote_create_choose_setting_kxp_list').eq(i).html());
         });
         purQuoteSettingGoodsListValArr = [];
         $.each($('.tanceng .zj_jcd_quote_create_choose_setting_list .sell_quote_create_setting_cost_one_change'), function (i, v) {
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
                     $('.zj_jcd_quote_create_choose_setting_sort_list').html(completeCateListHtml);
                     getPurQuoteChooseCompleteGoodsListByCateFn($('.zj_jcd_quote_create_choose_setting_sort_list li:first-child').data('id'));
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
     $('.tanceng .zj_jcd_quote_create_choose_setting_sort_list li').die('click').live('click', function () {
         $('.tanceng .zj_jcd_quote_create_choose_setting_search_inp').val('请输入整机商品名称/整机商品编号').css('#ccc');
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
                 $('.tanceng .zj_jcd_sell_quote_create_choose_setting_totals').html(oE.totalcount);
                 var datalist = oE.datalist;
                 if (datalist.length == 0) {
                     $('.tanceng .zj_jcd_quote_create_choose_setting_nodata_box').removeClass('none');
                     $('.tanceng .zj_jcd_quote_create_choose_setting_handle').addClass('none');
                 } else {
                     $('.tanceng .zj_jcd_quote_create_choose_setting_nodata_box').addClass('none');
                     $('.tanceng .zj_jcd_quote_create_choose_setting_handle').removeClass('none');
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
                 $('.tanceng .zj_jcd_select_create_choose_setting_list').html(completeListHtml);
                 //分页
                 list_table_render_pagination('.tanceng .zj_jcd_quote_create_choose_setting_handle', getCompleteGoodsListData, getPurQuoteChooseCompleteGoodsListFn, oE.totalcount, datalist.length);
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
             $('.zj_jcd_select_create_choose_setting_list').addClass('none');
             $('.zj_jcd_quote_create_choose_setting_handle').addClass('none');
             $('.zj_jcd_quote_create_choose_setting_nodata_box').removeClass('none');
             return false;
         } else {
             getCompleteGoodsListData.cate_id = cateid;
             $('.zj_jcd_select_create_choose_setting_list').removeClass('none');
             $('.zj_jcd_quote_create_choose_setting_handle').removeClass('none');
             $('.zj_jcd_quote_create_choose_setting_nodata_box').addClass('none');
         }
         getPurQuoteChooseCompleteGoodsListFn();
     }

     //整机商品分类搜索功能
     $('.zj_jcd_quote_create_choose_setting_cate_search_btn').die('click').live('click', function () {
         if ($('.tanceng .zj_jcd_create_choose_setting_cate_search_inp').val() == '') {
             return false;
         }
         $('.zj_jcd_create_choose_setting_inp_add_list').html('<li style="margin-top: 1px;">' + $('.tanceng .zj_jcd_create_choose_setting_cate_search_inp').val() + ' <i></i></li>');
         SettingSortData.name = $('.tanceng .zj_jcd_create_choose_setting_cate_search_inp').val();
         CreateChooseSettingSortFn();
         $('.tanceng .zj_jcd_create_choose_setting_cate_search_inp').val('').attr('readonly', true);
     });

     //整机商品分类搜索 - 删除关键字
     $('.zj_jcd_create_choose_setting_inp_add_list li i').die('click').live('click', function () {
         $(this).closest('li').remove();
         $('.tanceng .zj_jcd_create_choose_setting_cate_search_inp').val('').attr('readonly', false);
         SettingSortData.name = '';
         CreateChooseSettingSortFn();
     });

     //整机商品 - 搜索关键字
     $('.tanceng .zj_jcd_create_choose_setting_search_btn').die('click').live('click', function () {
         if ($('.tanceng .zj_jcd_quote_create_choose_setting_search_inp').val() == '搜索商品编号/商品名称') {
             alert('请输入搜索关键字');
             getCompleteGoodsListData.key = '';
         } else {
             getCompleteGoodsListData.key = $('.tanceng .zj_jcd_quote_create_choose_setting_search_inp').val();
         }
         getPurQuoteChooseCompleteGoodsListFn();
     });
     //整机商品 - 搜索整机类型
     $('.tanceng .zj_jcd_quote_create_choose_setting_sort_list li').die('click').live('click', function () {
         getCompleteGoodsListData.is_optional = $(this).data('id');
         getPurQuoteChooseCompleteGoodsListFn();
     });
     /********************选择整机商品 - 保存******************************/
     $('.tanceng .zj_jcd_create_choose_setting_save').die('click').live('click', function () {
         $.each($('.tanceng .zj_jcd_select_create_choose_setting_list tr'), function (i, v) {
             if ($('.tanceng .zj_jcd_select_create_choose_setting_list tr').eq(i).find('input:checkbox').is(':checked')) {
                 aPurQuoteCreateSettingChosen.push($('.tanceng .zj_jcd_select_create_choose_setting_list tr').eq(i).attr('completeid'));
             }
         });
         aPurQuoteCreateSettingChosen = getJsonArr(aPurQuoteCreateSettingChosen);

         if (aPurQuoteCreateSettingChosen.length != 0) {
             $('.tanceng .zj_jcd_create_chosen_setting_add_btn_tr').addClass('none');
         } else {
             $('.tanceng .zj_jcd_create_chosen_setting_add_btn_tr').removeClass('none');
         }

         $(this).closest('.dialog_box').remove();
        /* debugger;*/
         //整机商品选择后展示列表
         var aPurQuoteCreateSettingChosenHtml = '';
         //alert(aPurQuoteCreateSettingChosen.length);
         if (aPurQuoteCreateSettingChosen.length > 0) {
             /*console.log('1000');
             console.log(aPurQuoteCreateSettingChosen);
             console.log('1000');*/
             $('.tanceng .zj_jcd_choose_setting_hj_head').addClass('none');
             $.each(aPurQuoteCreateSettingChosen, function (i, v) {
                 /*console.log('10');
                 console.log(v);
                 console.log('10');*/
                 //税率
                 var taxNum = 0;
                 if ($('.tanceng .zj_jcd_contain_tax_val_ratio').val() == '含税17%') {
                     taxNum = 17;
                 } else if ($('.tanceng .zj_jcd_contain_tax_val_ratio').val() == '无税') {
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
                                    <button class="but_blue but_opa_small but_green val_dialogTop zj_jcd_quote_create_choose_setting_btn" name="takenote_jcd_xzzjsp">+</button><button class="but_opa_small but_red pur_quote_create_goods_del_btn">-</button>\
                                    </td>\
                                    </tr>\
                                    </tbody>\
                                    </table>\
                                    </div>\
                                    </div>\
                                    <div class="xs_xsbjd_table_t2">\
                                    <div class="table_t2" style="position: relative;">\
                                    <span class="cont_title" style="border-left: 4px;padding-left: 10px;margin-left: 0;border-left: 5px solid #23a2f3;">配件内容</span><span class="c_9">(您必须把配件价格标明，配件合计必须等于整机单价)</span>\
                                    <button class="but_icon_plus_white but_small but_blue val_dialogTop zj_jcd_create_choose_setting_goods_btn" name="takenote_jcd_xzpzsp" settingsign="settingkxp_' + data['id'] + '" settingid="' + data['id'] + '" style="position:absolute;right:80px;top:12px;"><i></i>选择配件</button>\
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
                                    <button class="but_blue but_opa_small but_green val_dialogTop zj_jcd_quote_create_choose_setting_btn" name="takenote_jcd_xzzjsp">+</button><button class="but_opa_small but_red pur_quote_create_goods_del_btn">-</button>\
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
             $('.tanceng .zj_jcd_choose_setting_hj_head').removeClass('none');
         }
         $('.tanceng .zj_jcd_quote_create_choose_setting_list').html(aPurQuoteCreateSettingChosenHtml);
         //原有配件商品
         $.each($('.tanceng .zj_jcd_quote_create_choose_setting_list .pur_quote_create_choose_setting_kxp_list'), function (i, v) {
             $('.tanceng .zj_jcd_quote_create_choose_setting_list .pur_quote_create_choose_setting_kxp_list').eq(i).html(purQuoteSettingGoodsListArr[i]);
         });
         //原有配件商品的value值
         $.each($('.tanceng .zj_jcd_quote_create_choose_setting_list .sell_quote_create_setting_cost_one_change'), function (i, v) {
             $('.tanceng .zj_jcd_quote_create_choose_setting_list .sell_quote_create_setting_cost_one_change').eq(i).val(purQuoteSettingGoodsListValArr[i]);
             if ($('.tanceng .zj_jcd_quote_create_choose_setting_list .sell_quote_create_setting_cost_one_change').eq(i).val() == '') {
                 $('.tanceng .zj_jcd_quote_create_choose_setting_list .sell_quote_create_setting_cost_one_change').eq(i).val(0);
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
         var $_settingChildOneNum = $('.tanceng .zj_jcd_quote_create_choose_setting_list .pur_quote_create_setting_child_one_num_total');
         $.each($_settingChildOneNum, function (i, v) {
             $_settingChildOneNum.eq(i).html(parseFloat($_settingChildOneNum.eq(i).closest('.pur_quote_create_choose_setting_one_box_list').find('.pur_quote_create_setting_parent_num').val()) * parseFloat($_settingChildOneNum.eq(i).closest('tr').find('.pur_quote_create_setting_child_num').val()))
         });
         //子商品数量总和
         var $_settingChildNumTotal = $('.tanceng .zj_jcd_quote_create_choose_setting_list .pur_quote_create_setting_child_num_total');
         $.each($_settingChildNumTotal, function (i, v) {
             var settingChildNumTotal = 0;
             $.each($_settingChildNumTotal.eq(i).closest('tbody').find('.pur_quote_create_setting_child_one_num_total'), function (i2, v2) {
                 settingChildNumTotal += parseFloat($_settingChildNumTotal.eq(i).closest('tbody').find('.pur_quote_create_setting_child_one_num_total').eq(i2).text());
             });
             $_settingChildNumTotal.eq(i).html(settingChildNumTotal);
         });
         //整机商品含税价
         var $_settingParentCostHsj = $('.tanceng .zj_jcd_quote_create_choose_setting_list .pur_quote_create_setting_parent_one_cost_hsj');
         $.each($_settingParentCostHsj, function (i, v) {
             $_settingParentCostHsj.eq(i).html(moneyToFixed((parseFloat($_settingParentCostHsj.eq(i).closest('td').prev().text()) + 100) * parseFloat($_settingParentCostHsj.eq(i).closest('td').prev().prev().find('input').val()) / 100));
         });
         //整机商品单条总价
         var $_settingParentOneCostTotal = $('.tanceng .zj_jcd_quote_create_choose_setting_list .pur_quote_create_setting_parent_one_cost_total');
         $.each($_settingParentOneCostTotal, function (i, v) {
             $_settingParentOneCostTotal.eq(i).html(moneyToFixed(parseFloat($_settingParentOneCostTotal.eq(i).closest('td').prev().text()) * parseFloat($_settingParentOneCostTotal.eq(i).closest('tr').find('input.pur_quote_create_setting_parent_num').val())));
         });
         //整机商品包含商品单条含税价
         var $_settingChildCostHsj = $('.tanceng .zj_jcd_quote_create_choose_setting_list .pur_quote_create_setting_child_one_cost_hsj');
         $.each($_settingChildCostHsj, function (i, v) {
             $_settingChildCostHsj.eq(i).html(moneyToFixed((parseFloat($_settingChildCostHsj.eq(i).closest('td').prev().text()) + 100) * parseFloat($_settingChildCostHsj.eq(i).closest('td').prev().prev().find('input').val()) / 100));
         });
         //整机商品包含商品单条总价
         var $_settingChildOneCostTotal = $('.tanceng .zj_jcd_quote_create_choose_setting_list .pur_quote_create_setting_child_one_cost_total');
         $.each($_settingChildOneCostTotal, function (i, v) {
             $_settingChildOneCostTotal.eq(i).html(moneyToFixed(parseFloat($_settingChildOneCostTotal.eq(i).closest('td').prev().text()) * parseFloat($_settingChildOneCostTotal.eq(i).closest('tr').find('.pur_quote_create_setting_child_one_num_total').text())));
         });
         //整机商品包含商品总价
         var $_settingChildCostHjTotal = $('.tanceng .zj_jcd_quote_create_choose_setting_list .pur_quote_create_setting_child_cost_hj_total');
         $.each($_settingChildCostHjTotal, function (i, v) {
             var settingChildCostTotal = 0;
             $.each($_settingChildCostHjTotal.eq(i).closest('tbody').find('.pur_quote_create_setting_child_one_num_total'), function (i2, v2) {
                 settingChildCostTotal += parseFloat($_settingChildCostHjTotal.eq(i).closest('tbody').find('.pur_quote_create_setting_child_one_cost_total').eq(i2).text());
             });
             $_settingChildCostHjTotal.eq(i).html(moneyToFixed(settingChildCostTotal));
         });

         //已标记总和
         var $_settingYbj = $('.tanceng .zj_jcd_quote_create_choose_setting_list .pur_quote_create_setting_price_one_yes');
         $.each($_settingYbj, function (i, v) {
             var costYbj = 0;
             var $_costYbj = $_settingYbj.eq(i).closest('.pur_quote_create_choose_setting_one_box_list').find('.pur_quote_create_setting_child_one_cost');
             $.each($_costYbj, function (i2, v2) {
                 costYbj += parseFloat($_costYbj.eq(i2).val()) * parseFloat($_costYbj.eq(i2).closest('tr').find('.pur_quote_create_setting_child_num').val());
             });
             $_settingYbj.eq(i).html(costYbj);
         });
         //未标记总和
         var $_settingWbj = $('.tanceng .zj_jcd_quote_create_choose_setting_list .pur_quote_create_setting_price_one_no');
         $.each($_settingWbj, function (i, v) {
             $_settingWbj.eq(i).html($_settingWbj.eq(i).closest('.goods_tc_toggle').find('.pur_quote_create_setting_price_one').text() - $_settingYbj.eq(i).text())
         });

         //整机总合计信息
         var settingNumTotalHj = 0;
         var settingCostTotalHj = 0;
         $.each($('.tanceng .zj_jcd_quote_create_choose_setting_list .pur_quote_create_choose_setting_one_box_list'), function (i, v) {
             settingNumTotalHj += parseFloat($('.tanceng .zj_jcd_quote_create_choose_setting_list .pur_quote_create_choose_setting_one_box_list').eq(i).find('.pur_quote_create_setting_parent_num').val());
             settingCostTotalHj += parseFloat($('.tanceng .zj_jcd_quote_create_choose_setting_list .pur_quote_create_choose_setting_one_box_list').eq(i).find('.pur_quote_create_setting_parent_one_cost_total').text());
         });
         $('.tanceng .zj_jcd_quote_create_setting_num_total_hj').text(settingNumTotalHj);
         $('.tanceng .zj_jcd_create_setting_cost_total_hj').text(moneyToFixed(settingCostTotalHj));

         purQuoteCreateProductCostTotalFn();

     }
     //整机商品修改整机数量zj_quote_create_choose_setting_box_list
     $('.tanceng .zj_jcd_quote_create_choose_setting_list .pur_quote_create_setting_parent_num_change_btn').die('click').live('click', function () {
         purQuoteCreateSettingNumFn();
     });
     /******************整机商品修改整机单价*************/
     $('.tanceng .zj_jcd_quote_create_choose_setting_list .pur_quote_create_setting_cost_one_change').die('keyup').live('keyup', function () {
         $('.tanceng .zj_jcd_quote_create_choose_setting_list .pur_quote_create_setting_price_one').each(function (i, v) {
             $('.tanceng .zj_jcd_quote_create_choose_setting_list .pur_quote_create_setting_price_one').eq(i).html($('.tanceng .zj_jcd_quote_create_choose_setting_list .pur_quote_create_setting_price_one').eq(i).closest('.pur_quote_create_choose_setting_one_box_list').find('.pur_quote_create_setting_cost_one_change').val());
         });
         purQuoteCreateSettingNumFn();
     });
     //整机商品修改包含商品单价
     $('.tanceng .zj_jcd_quote_create_choose_setting_list .pur_quote_create_setting_child_one_cost').die('keyup').live('keyup', function () {
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
     $('.tanceng .zj_jcd_quote_create_choose_setting_list .pur_quote_create_setting_child_num_change_btn').die('click').live('click', function () {
         purQuoteCreateSettingNumFn();
     });
     //选择搭配商品
     $('.tanceng .zj_jcd_create_choose_setting_goods_btn').die('click').live('click', function () {
         var settingId = $(this).attr('settingid');
         var settingSignCurrent = $(this).attr('settingsign');
         $('.tanceng .zj_jcd_create_choose_setting_child_save_btn').data('settingsign', settingSignCurrent);
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
                     console.log(data);
                     //整机商品编号
                     $('.tanceng .zj_jcd_create_choose_setting_code_sn').html(data['code_sn']);
                     //整机商品名称
                     $('.tanceng .zj_jcd_create_choose_setting_goods_parent_name').html(data['name']);
                     //整机类型
                     if (data['is_optional'] == 1) {
                         $('.tanceng .zj_jcd_create_choose_setting_is_optional').html('可选配');
                     } else if (data['is_optional'] == 2) {
                         $('.tanceng .zj_jcd_create_choose_setting_is_optional').html('不可选配');
                     }
                     //备注
                     $('.tanceng .zj_jcd_create_choose_setting_remark').html(data['remark']);
                     //选配说明
                     $('.tanceng .zj_jcd_create_choose_setting_introductions').html(data['introductions']);
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
                                                <td>' + settingGoodsAttr + '</td>\
                                                </tr>'
                         });
                         settingHtmlLeft += '<div class="box_Open" style="width:100%;border-left:1px solid #e7eaec;border-right:1px solid #e7eaec;margin-bottom:10px;">\
                                                <p class="box_open_head" style="padding-left:8px;">' + v['cate_name'] + '<span class="box_open_btn" style="right: 10px;">收起 <i class="right icon_show"></i></span>\
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
                                                <p class="box_open_head" style="padding-left:8px;">' + v['cate_name'] + '<span class="box_open_btn" style="right: 10px;">收起 <i class="right icon_show"></i></span>\
                                                </p>\
                                                <div class="box_open_list">\
                                                <table class="xs_bjd_choose_bhsp">\
                                                <thead>\
                                                <th width="32">选择</th>\
                                                <th width="120">商品编号</th>\
                                                <th width="338">属性</th>\
                                                <th width="127">数量</th>\
                                                <th width="30">操作</th>\
                                                </thead>\
                                                <tbody settingsign="set' + (i + 1) + '" class="set' + (i + 1) + '" catename="' + v['cate_name'] + '"></tbody>\
                                                </table>\
                                                </div>\
                                            </div>';
                     });
                     $('.tanceng .zj_jcd_create_setting_list_left').html(settingHtmlLeft);
                     $('.tanceng .zj_jcd_create_setting_list_right').html(settingHtmlRight);
                 }
             },
             error: function (e) {
                 console.log(e);
                 alert(e.msg);
             }
         });
     });
     $('.tanceng .zj_jcd_create_setting_list_left .pur_quote_create_setting_list_checkbox').die('click').live('click', function () {
         var currentTbodyClass = $(this).closest('tbody').attr('settingsign');
         var $_this = $(this);
         var settingGoodsChosen = '';
         $.each($_this.closest('tbody').find('tr'), function (i, v) {
             if ($_this.closest('tbody').find('tr').eq(i).find('input:checkbox').is(':checked')) {
                 settingGoodsChosen += '<tr index="' + i + '" settinggoodsid="' + $_this.closest('tbody').find('tr').eq(i).attr('settinggoodsid') + '">\
                                        <td>' + l_dbl(i + 1) + '</td>\
                                        <td>' + $_this.closest('tbody').find('tr').eq(i).find('td').eq(1).html() + '</td>\
                                        <td>' + $_this.closest('tbody').find('tr').eq(i).find('td').eq(2).html() + '</td>\
                                        <td style="padding: 0 1em;"><div class="xs_num_input num_input inline_block num_input_new"><button class="but_grey_a but_opa_small inp_plus">+</button><input style="border-color: #ccc;" type="text" value="1"><button class="but_grey_a but_opa_small radius_left_0 inp_reduce">-</button></div></td>\
                                        <td style="padding: 0 1em;"><button class="but_opa_small but_red_a pur_quote_create_setting_list_right_del_btn">-</button></td>\
                                        </tr>'
             }
         });
         $('.tanceng .zj_jcd_create_setting_list_right').find('.' + currentTbodyClass).html(settingGoodsChosen);
         tbodyTrSortFn();
     });
     //tbody中tr序号
     function tbodyTrSortFn() {
         $.each($('.tanceng .zj_jcd_create_setting_list_right tbody tr'), function (i, v) {
             $('.tanceng .zj_jcd_create_setting_list_right tbody tr').eq(i).find('td').eq(0).html(l_dbl($('.tanceng .zj_jcd_create_setting_list_right tbody tr').eq(i).index() + 1))
         });
     }
//删除配件商品
     $('.tanceng .zj_jcd_create_setting_list_right .pur_quote_create_setting_list_right_del_btn').die('click').live('click', function () {
         var index = $(this).closest('tr').attr('index');
         var curTbodySign = $(this).closest('tbody').attr('settingsign');
         $('.tanceng .zj_jcd_create_setting_list_left .' + curTbodySign).find('input:checkbox').eq(index).attr('checked', false);
         $(this).closest('tr').remove();
         tbodyTrSortFn();
     });

     //选择搭配商品保存
     $('.tanceng .zj_jcd_create_choose_setting_child_save_btn').die('click').live('click', function () {
         var settingChildKxpGoodsArr = [];
         var taxNum = 0;
         if ($('.tanceng .zj_contain_tax_val_ratio').val() == '含税17%') {
             taxNum = 17;
         } else if ($('.tanceng .zj_contain_tax_val_ratio').val() == '无税') {
             taxNum = 0;
         }
         var setParentSign = $(this).data('settingsign');
         $.each($('.tanceng .zj_jcd_create_setting_list_right tbody'), function (i, v) {
             if ($('.tanceng .zj_jcd_create_setting_list_right tbody').eq(i).find('tr').length != 0) {
                 var goodsChildArr = [];
                 $.each($('.tanceng .zj_jcd_create_setting_list_right tbody').eq(i).find('tr'), function (i2, v2) {
                     goodsChildArr.push({
                         goodsid: $('.tanceng .zj_jcd_create_setting_list_right tbody').eq(i).find('tr').eq(i2).attr('settinggoodsid'),
                         goodscodesn: $('.tanceng .zj_jcd_create_setting_list_right tbody').eq(i).find('tr').eq(i2).find('td').eq(1).html(),
                         goodsattr: $('.tanceng .zj_jcd_create_setting_list_right tbody').eq(i).find('tr').eq(i2).find('td').eq(2).html(),
                         goodsnum: $('.tanceng .zj_jcd_create_setting_list_right tbody').eq(i).find('tr').eq(i2).find('td').eq(3).find('input:text').val()
                     })
                 });
                 settingChildKxpGoodsArr.push({
                     catename: $('.tanceng .zj_jcd_create_setting_list_right tbody').eq(i).attr('catename'),
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
     $('.tanceng .zj_jcd_create_other_fee').live('keyup', function () {
         purQuoteCreateProductCostTotalFn();
     });

     /* ***********************总金额计算**************************/
     function purQuoteCreateProductCostTotalFn() {
         //税率
         var taxNum = 0;
         if ($('.tanceng .zj_jcd_contain_tax_val_ratio').val() == '含税17%') {
             taxNum = 17;
         } else {
             taxNum = 0;
         }
         //单价合计zj_quote_create_product_cost_total
         $('.tanceng .zj_jcd_create_product_cost_total').val(moneyToFixed((parseFloat($('.tanceng .zj_jcd_goods_cost_total').text()) + parseFloat($('.tanceng .zj_jcd_create_setting_cost_total_hj').text())) * 100 / (100 + taxNum)));
         //合计税额
         $('.tanceng .zj_jcd_create_tax_total').val(moneyToFixed(parseFloat($('.tanceng .zj_jcd_create_product_cost_total').val()) * (taxNum / 100)));
         //总计金额
         if($('.tanceng .zj_jcd_create_other_fee').val()>0){
             $('.tanceng .zj_jcd_sell_quote_create_cost_tax_total').html(moneyToFixed(parseFloat($('.tanceng .zj_jcd_create_product_cost_total').val()) + parseFloat($('.tanceng .zj_jcd_create_tax_total').val()) + parseFloat($('.tanceng .zj_jcd_create_other_fee').val())));
         }else{
             $('.tanceng .zj_jcd_sell_quote_create_cost_tax_total').html(moneyToFixed(parseFloat($('.tanceng .zj_jcd_create_product_cost_total').val()) + parseFloat($('.tanceng .zj_jcd_create_tax_total').val())));
         }

     }
     /*删除整机商品*/
     $(".tanceng .pur_quote_create_choose_setting_one_box_list .pur_quote_create_goods_del_btn").die().live("click",function(){

         if($(".tanceng .zj_jcd_quote_create_choose_setting_list .pur_quote_create_choose_setting_one_box_list").length>1){
             $(this).parents('.pur_quote_create_choose_setting_one_box_list').remove();
         }else{
             alert('只剩一件整机了');
             return true;
         }

     });
     //新建借入单 - 提交审批
     $('.tanceng .zj_jcd_pur_quote_create_submit_btn').die('click').live('click', function () {
         // newCreateData.quote_id = 0;
         // newCreateData.is_draft = 0;
         $(this).removeClass('val_dialogTop')
         new_purQuoteCreateSubmitFn();
         $(".tanceng .zj_jcd_add_submit_end_btn").die().live("click",function(){

             $(this).parents('.dialog_content_delete').find('.dialog_close').click();
         });
     });


     //新建借入单 - 提交函数
     function new_purQuoteCreateSubmitFn() {
         //借入单编号
         newCreateData.code_sn = $('.tanceng .zj_put_jcd_num_bh_val').val();
         newCreateData.kuaji = $(".zj_jcd_sprtc_ul_content").data('kuaji');
        if($(".zj_sell_quote_create_choose_lend_inp").val()=='请选择客户'){
            alert("请选择客户");
            return false;
        }else{
            /*客户id*/
            newCreateData.supplier_id = $('.tanceng .zj_sell_quote_create_choose_lend_inp').data('id');
            newCreateData.supplier_name = $('.tanceng .zj_sell_quote_create_choose_lend_inp').val();
        }

         /*预计归还日期*/

         if($('.tanceng .zj_jrd_select_time_day_val').val()=='请选择日期' || $('.tanceng .zj_jrd_select_time_day_val').val()==''){
             alert("请选择日期");
             newCreateData.expect_return_time='';
             return false;
         }else{
             newCreateData.expect_return_time=$('.zj_jcd_select_time_day_val').val();
         }
         //税率
         if ($('.tanceng .zj_jcd_contain_tax_val_ratio').val() == '含税17%') {
             newCreateData.tax_rate = 1;
         } else {
             newCreateData.tax_rate = 0;
         }
         /*发货日期*/
         if($('.tanceng .zj_jcd_enter_ku_day_val').val()=='请选择日期' || $('.tanceng .zj_jcd_enter_ku_day_val').val()==''){
             alert("请选择日期");
             newCreateData.send_time='';
             return false;
         }else{
             newCreateData.send_time=$('.tanceng .zj_jcd_enter_ku_day_val').val();
         }
         /*物流方式,1快递,2陆运,3空运,4海运,5平邮*/
         //var logistics_type;
         if($('.zj_jcd_wl_name_show').val()=='快递'){
             newCreateData.logistics_type=1;
         }else if($('.zj_jcd_wl_name_show').val()=='陆运'){
             newCreateData.logistics_type=2;
         }else if($('.zj_jcd_wl_name_show').val()=='空运'){
             newCreateData.logistics_type=3;
         }else if($('.zj_jcd_wl_name_show').val()=='海运'){
             newCreateData.logistics_type=4;
         }else if($('.zj_jcd_wl_name_show').val()=='平邮'){
             newCreateData.logistics_type=5;
         }
        /*包运费*/

        $(".zj_jcd_byf_dv_check input").each(function () {
            if($(this).is(':checked')){
                newCreateData.is_freight=1;
            }else{
                newCreateData.is_freight=0;
            }
        })
           /*收货人*/
           if($(".zj_select_shr_name_show").val()=='请选择收货人'){
               newCreateData.receiver=''
           }else{
               newCreateData.receiver=$(".zj_select_shr_name_show").val();
           }

            /*联系电话*/
            if($(".zj_jcd_lx_mobie_show").val()=='请输入联系电话'){
                newCreateData.mobile=''
            }else{
                newCreateData.mobile=$(".zj_jcd_lx_mobie_show").val();
            }

            /*联系地址*/
            if($(".zj_jcd_sh_adrr").val()=='请输入收货地址'){
                newCreateData.address=''
            }else{
                newCreateData.address=$(".zj_jcd_sh_adrr").val();
            }

         //newCreateData.note=$(".zj_jcd_sell_quote_create_note_textarea").val()
         /*审批人*/
         var xz_sprid=[];
         $(".tanceng .zj_jcd_sprtc_ul_content .zj_spr_num").each(function(i,v){
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
         $(".tanceng .zj_jcd_csr_content_show_ul .zj_csr_num").each(function(i,v){
             xzcsr_id.push($(this).attr('rid'))
         })
         newCreateData.cc_id = xzcsr_id.toString();
         /*备注*/
         //newCreateData.note=$('.tanceng .ven_sell_quote_create_note_textarea').val();
         //普通商品信息
         var pCreateGoodsArr = [];
         //var purQuoteCreateGoodsJson = {};
         $.each($('.tanceng .zj_jcd_quote_create_chosen_goods_tbody_content tr'), function (i, v) {
             pCreateGoodsArr.push({
                 goods_category:1,
                 goods_id: $('.tanceng .zj_jcd_quote_create_chosen_goods_tbody_content tr').eq(i).attr('goodsid'),
                 num: $('.tanceng .zj_jcd_quote_create_chosen_goods_tbody_content tr').eq(i).find(".productnum").val(),
                 price: $('.tanceng .zj_jcd_quote_create_chosen_goods_tbody_content tr').eq(i).find('.pur_quote_goods_cost_one').val(),
                 containing_rate: $('.tanceng .zj_jcd_quote_create_chosen_goods_tbody_content tr').eq(i).find('.pur_quote_goods_tax_one ').text(),
                 containing_money: $('.tanceng .zj_jcd_quote_create_chosen_goods_tbody_content tr').eq(i).find('.pur_quote_goods_tax_total').text(),
                 total_money: $('.tanceng .zj_jcd_quote_create_chosen_goods_tbody_content tr').eq(i).find('.pur_quote_goods_one_cost_total').text()

             });
         });
         // purQuoteCreateGoodsJson.goods = purQuoteCreateGoodsArr;
         newCreateData.good_borrow_num = $('.tanceng .zj_jcd_goods_num_total').text(); // 普通商品总数zj_jcd_quote_create_choose_goods_btn
         if($(".tanceng .zj_jcd_sell_quote_create_note_textarea").val()=='请输入备注'){
             newCreateData.note='';
         }else{
             newCreateData.note=$(".tanceng .zj_jcd_sell_quote_create_note_textarea").val();//备注
         }
         // purQuoteCreateGoodsJson.sum_total = $('.tanceng .pur_quote_goods_cost_total').html();// 普通商品总价额
         newCreateData.unit_price_total = $('.tanceng .zj_jcd_create_product_cost_total').val();//单价合计：
         newCreateData.tax_total=$('.tanceng .zj_jcd_create_tax_total').val();//合计税额
         newCreateData.other_costs = $('.tanceng .zj_jcd_create_other_fee').val();//其他费用（元）
         newCreateData.all_money = $('.tanceng .zj_jcd_sell_quote_create_cost_tax_total').text();//总计金额（元）


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
         var $_settingParentList = $('.tanceng .zj_jcd_quote_create_choose_setting_list .pur_quote_create_choose_setting_one_box_list');
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
         newCreateData.computer_borrow_num=$(".tanceng .zj_jcd_quote_create_setting_num_total_hj").text();
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
         // console.log('100');
         // console.log(newCreateData);
         // console.log('100');

         if(pCreateGoodsArr.length>0){

             $.ajax({
                 url: SERVER_URL + "/lend/add",
                 type: 'POST',
                 data: newCreateData,
                 dataType: 'json',
                 success: function (e) {
                     console.log(e);
                     if (e.code == 0) {

                         $('.tanceng .dialog_box').remove();
                         $('.tanceng').css('display', 'none');
                         $('.tanceng .dialog_box').not('[name="takenote_jcd_tj"]').remove();
                         $('.tanceng .zj_jcd_pur_quote_create_submit_btn').attr('name', 'takenote_jcd_tj');
                         $('.tanceng').append($('.dialog_box[name="takenote_jcd_tj"]').css('display', 'block'));
                         $('.tanceng .jcd_create_success_code').html(newCreateData.code_sn);
                         //getBuyQuoteDraftNum();
                         out_list_show_fn();
                     }else{
                         alert(e.msg);
                     }
                 },
                 error: function (data) {
                     alert('服务器更新失败，请稍后再试');
                 }
             });
         }else{
             alert('请添加借入单');
         }

     }


 //});
