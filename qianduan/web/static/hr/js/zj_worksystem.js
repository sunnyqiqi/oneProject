
/*公司制度*/
$(function(){

    var token = Admin.get_token();
    var usercompanyadmin=localStorage.getItem("usercompanyadmin");
    var company_admin=localStorage.getItem("company_admin");
    var uid = localStorage.getItem("uid");
    var department_id = localStorage.getItem("department_id");
    var powerUrls=localStorage.getItem("user_info_url");
    // console.log('0000');
    // console.log(usercompanyadmin);
    // console.log(company_admin);
    // console.log(uid);
    // console.log(department_id);
    // console.log(powerUrls);
    // console.log('0000');
    //	弹窗无限循环树结构
    // function tree_list_dialog(datalist, deep) {
    //     var html = '';
    //     $.each(datalist, function (index, data) {
    //         var html_i_list_before = '<i class="list_before_span"></i>';
    //         html += '<ul class="ul1 zcj_child1">';
    //         for (var j = 0; j < deep; j++) {
    //             html_i_list_before += '<i class="list_before_span"></i>'
    //         }
    //         if(data['children'].length > 0){
    //
    //             html += '<li class="left_1" aid = "' + data["id"] + '">' + html_i_list_before + '<span class="icon_open"></span><span class="icon_file"></span><span class="list_msg">' + data['name'] + '</span><span class="list_check"><em></em></span></li>';
    //         }else{
    //             html += '<li class="left_1" aid = "' + data["id"] + '">' + html_i_list_before + '<span class="change_ba"></span><span class="icon_file"></span><span class="list_msg">' + data['name'] + '</span><span class="list_check"><em></em></span></li>';
    //         }
    //         if (data['children'] && data['children'].length > 0) {
    //             html += tree_list_dialog(data['children'], deep + 1);
    //         }
    //         html += '</li>';
    //         html += '</ul>'
    //     });
    //     return html
    // }
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
                html += '<li class="left_1" aid = "' + data["id"] + '" data-name="'+data['name']+'">' + html_i_list_before + '<span class="icon_open change_ba"></span><span class="icon_file"></span><span class="list_msg">' + data['name'] + '</span><span class="list_check"><em></em></span></li>';
            }else{
                html += '<li class="left_1" aid = "' + data["id"] + '" data-name="'+data['name']+'">' + html_i_list_before + '<span class="change_ba"></span><span class="icon_file"></span><span class="list_msg">' + data['name'] + '</span><span class="list_check"><em></em></span></li>';
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
                html += '<li class="left_1" deptchosenid = "' + data["id"] + '">' + html_i_list_before + '<span class="icon_open change_ba"></span><span class="icon_file"></span><span class="list_msg">' + data['name'] + '</span><span class="list_check"><em></em></span></li>';
            }else{
                html += '<li class="left_1" deptchosenid = "' + data["id"] + '">' + html_i_list_before + '<span class="change_ba"></span><span class="icon_file"></span><span class="list_msg">' + data['name'] + '</span><span class="list_check"><em></em></span></li>';
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
                html += '<li class="left_2 person_left_nav li_person" userinfoid="' + data2['id'] + '">' + html_i_list_before + '<span class="list_msg">' + data2['name'] + ' </span><span class="list_check"><em></em></span></li>'
            });
            html += '</ul>';
            html += '</ul>';
        });
        return html
    }
    var system=JSON.parse(powerUrls);
    var zd_add="document/add";//公司制度add
    var zd_check="document/info";//查看
    var zd_del="document/del";//删除


    /*获取公司制度列表*/
var database={
        token: token,
        page:1,
        limit:10,
        dept:department_id,
    company_admin:company_admin
    };

    function systemlist(){
            $.ajax({
                type: 'post',
                url: SERVER_URL + "/document/list",
                data: database,
                async: false,
                dataType: "json",
                success: function (data) {
                    console.log('123');
                    console.log(data);
                    console.log('123');
                    if(data.code==0){
                        if(data.rows.length>0){
                            $(".zcj_no_data_show_company_zd").hide();
                            $(".zcj_gszd_page").show();
                            /* $(".hr_yidong").show();*/
                        }else{
                            $(".zcj_no_data_show_company_zd").show();
                            $(".zcj_gszd_page").hide();
                            /*$(".hr_yidong").hide();*/
                        }
                    }else{
                        $(".zcj_no_data_show_company_zd").show();
                        $(".zcj_gszd_page").hide();
                    }
                    console.log(data);
                    if(data.code==0){

                        $(".zj_company tr:first-child").siblings().empty();
                        var html="";
                        for (var index in data.rows) {

                            html+=" <tr><td><span>"+data.rows[index].title+"</span></td> <td>"+data.rows[index].created_at+"</td> <td>"+data.rows[index].dept_name+"</td> <td> <button class='but_look but_mix val_dialogTop zcj_preview' name='hr_gszd_ygscyl' temid="+data.rows[index].id+">预览</button> <button class='but_exit but_mix val_dialogTop zcj_editor' name='hr_gszd_zxbj' data-id="+data.rows[index].id+">编辑</button> <!--<button class='but_mix but_lv val_dialog zcj_out' name='hr_gszd_dc'>导出</button>--> <button class='but_mix but_r val_dialog but_del zcj_zd_del' name='hr_gszd_delete' data-id="+data.rows[index].id+">删除</button> </td> </td> </tr>";


                        }
                        $(".zj_company").append(html);
                        var cur=data.rows.length;
                        var znum=data.totalCount;
                        list_table_render_pagination(".zcj_gszd_page",database,systemlist,znum,cur);
                    }else{
                        alert(data.msg);
                    }
                    if(company_admin!=1){
                        /*公司制度add*/
                        if($.inArray(zd_add,system)>-1){
                            $(".zcj_add_zd_system_gs").show();
                            $(".zcj_editor").show();

                        }else{
                            $(".zcj_add_zd_system_gs").hide();
                            $(".zcj_editor").hide();
                            $(".contenthead .right").css('width','60px');
                        }
                        /*删除制度*/
                        if($.inArray(zd_del,system)>-1){
                            $(".zcj_zd_del").show();


                        }else{
                            $(".zcj_zd_del").hide();

                        }
                    }

                }
            });
    }
    systemlist();
    /*预览*/
    //	补零函数
    function repair(x) {
        return x < 10 ? '0' + x : x
    }
    /*预览btn*/
    $(".zcj_preview").die().live("click",function(){
            var sts=$(this).attr("temid");
       /* $(".zcj_content_details h3").siblings().html(" ");*/
           zj_view(sts);
    });
    function zj_view(strid){
        $.ajax({
            type: 'get',
            url: SERVER_URL + "/document/info",
            data: {
                token: token,
                id:strid
            },

            dataType: "json",
            success: function (data) {
                console.log(data);
               /* $(".zcj_content_details h4").siblings().empty();*/
                var info='<h3>'+data['data']['title']+'</h3><hr style="width: 654px;margin-left: -10px;border-top: 2px solid #e6e6e6;"><hr style="width: 654px;margin-left: -10px;"><div style="padding:10px 0;">'+data['data']['content']+'</div>';

                $(".zcj_content_details").html(info);
            }
        })
    }
    /*搜索*/
     $(".zcj_add_sear").click(function(){

        var ser=$(".zcj_search_title").val();

        if(ser!='搜索标题'){
            database['key']=ser;
        }else{
            database['key']='';
        }

         systemlist();

    });
    /*导出*/
    $(".zcj_out").click(function(){
        var stsid=$(this).prev().prev().attr("temid");
       /* alert(stsid);*/
        $.ajax({
            type: 'post',
            url: SERVER_URL + "/document/export",
            data: {
                token: token,
                id:stsid
            },

            dataType: "json",
            success: function (data) {
                console.log(data);
                if(data.code==0){
                    $(".zcj_succeed .exportFlie").remove();
                    $(".zcj_succeed").append("<p class='exportFlie f_color'><a href="+data['url']+">文档下载.doc</a></p>");
                }else{
                    alert(data.msg);
                }

            }
        })
    });
    /*删除*/
    $(".zcj_zd_del").die().live("click",function(){
        var stsid=$(this).data('id');
        $(".zcj_gszd_del_scbtn").die().live("click",function(){
            var _this=this;
            $.ajax({
                type: 'get',
                url: SERVER_URL + "/document/del",
                data: {
                    token: token,
                    id:stsid
                },

                dataType: "json",
                success: function (data) {
                    console.log(data);
                    if(data.code==0){
                        alert('删除成功');
                        systemlist();
                    }else{
                        alert(data.msg);
                    }
                    delbtn(_this)

                },
                error:function(){
                    alert('更新失败，请稍后再试');
                }
            })
        });

    });
    /*作废*/
   /* $(".zcj_trash").click(function(){
        var stsid=$(this).prev().prev().prev().prev().attr("temid");

        $.ajax({
            type: 'get',
            url: SERVER_URL + "/document/setstatus",
            data: {
                token: token,
                id:stsid,
               status_flag:"disable"
            },

            dataType: "json",
            success: function (data) {
                console.log(data);
                if(confirm("确定要作废吗")){

                }else{

                }

            }
        })
    });*/

    /*删除按钮方法*/
    function delbtn(odv){
        $(odv).parent().parent().parent().remove();
        var num = $('.tanceng').children(".dialog_box").length;
        if(num < 1 ){
            $(".tanceng").hide();
        }
    }
    /*部门展示*/
    var bm_rid=[];
    var bm_name=[];
    function left_list(){
        $.ajax({
            type: 'get',
            url: SERVER_URL + "/dept/list",
            data: {
                token: token,
                pid:0
            },

            dataType: "json",
            success: function (data) {
                console.log("123");
                console.log(data);
                /*  $(".zcj_gszd_bmlist").empty();*/

                var deep=0;

                var html='<li class="left_all"><span class="icon_open change_ba"></span><span class="icon_file"></span><span class="list_msg">所有分类</span><span class="list_check"><em></em></span></li>';
                $(".tanceng .zcj_gszd_bmlist").html(html+tree_list_choose_dept(data['rows'],deep));
                /* $(".zcj_tow").append(info);
                 $(".zcj_three").append(end);*/

            }
        })
    }
    $(".zcj_select_section").die().live("click",function(){
        /*$(".zcj_list_content").html(" ");*/
       /* var secid=*/
        left_list()
        //选择部门左侧选择
        $('.tanceng .zcj_gszd_bmlist ul .left_1').die('click').live('click', function () {
            if ($(this).find('em').hasClass('on')) {

                if($(this).parent('ul').children('ul').length==0){
                    $('.tanceng .zcj_right_add_zhidu_bm').find('li[rid=' + $(this).attr('aid') + ']').remove();
                    $(this).find('span.list_check em').removeClass('on');
                }else{
                    var arr = [];
                    $('.tanceng .zcj_right_add_zhidu_bm').find('li[rid=' + $(this).attr('aid') + ']').remove();
                    $(this).find('span.list_check em').removeClass('on');
                    $(this).parent('ul').children('ul').each(function(i,v){
                        arr.push($(this).children('li.left_1').attr('aid'))
                        $(this).find('span.list_check em').removeClass('on');
                    })
                    $('.tanceng .zcj_right_add_zhidu_bm').children().each(function(i,v){
                        if($.inArray($(this).attr('rid'), arr)!=-1){
                            $(this).remove();
                        }
                    })
                }

            } else {

                if($(this).parent('ul').children('ul').length==0){
                    $('.tanceng .zcj_right_add_zhidu_bm').append('<li rid="' + $(this).attr('aid') + '"><span>' + $(this).children('.list_msg').html() + '</span><i class="list_choose_delete"></i></li>');
                    $(this).find('span.list_check em').addClass('on');
                }else{
                    var listhtml = '',zjlist='',arrb=[];
                    zjlist +='<li rid="' + $(this).attr('aid') + '"><span>' + $(this).children('.list_msg').html() + '</span><i class="list_choose_delete"></i></li>';
                    $(this).find('span.list_check em').addClass('on');
                    $('.tanceng .zcj_right_add_zhidu_bm').children().each(function(i,v){
                        arrb.push($(this).attr('uid'))
                    })
                    //console.log(arrb)
                    $(this).parent('ul').children('ul').each(function(i,v){
                        if($.inArray($(this).children('li.left_1').attr('aid'), arrb)!=-1){
                            //$(this).remove();
                            return
                        }else{
                            listhtml +='<li rid="' + $(this).children('li.left_1').attr('aid') + '"><span>' + $(this).children('li.left_1').children('.list_msg').html() + '</span><i class="list_choose_delete"></i></li>';
                            $(this).children('li.left_1').find('span.list_check em').addClass('on');
                        }

                    })
                    $('.tanceng .zcj_right_add_zhidu_bm').append(zjlist+listhtml)
                }

            }
            $('.tanceng .zcj_gszd_bmlist ul li').removeClass('on');
            $(this).closest('li').addClass('on');
        });
/*全选*/
        $('.tanceng .zcj_gszd_bmlist .left_all').live('click',function(){
            $(this).toggle(function(){

                $(this).find('em').addClass('on');
                var listhtmlall = '';
                $('.tanceng .zcj_gszd_bmlist').find('li.left_1').each(function(i,v){
                    listhtmlall +='<li rid="' + $(this).attr('aid') + '"><span>' + $(this).children('.list_msg').html() + '</span><i class="list_choose_delete"></i></li>';
                    $(this).find('span.list_check em').addClass('on');
                })
                $('.tanceng .zcj_right_add_zhidu_bm').html(listhtmlall)
                //$('.tanceng .zcj_gszd_bmlist').css('display','none')
                $(this).siblings('ul').hide();
            },function(){

                $(this).find('em').removeClass('on');
                $('.tanceng .zcj_right_add_zhidu_bm').empty();
                $(this).siblings('ul').show();
                //$('.tanceng .zcj_gszd_bmlist').css('display','block')
                $('.tanceng .zcj_gszd_bmlist').find('li.left_1').each(function(i,v){
                    $(this).find('span.list_check em').removeClass('on');
                })
            })
            $(this).trigger('click');
        })

        /*$('.tanceng .zcj_gszd_bmlist .left_all').die().live('click',function(){
            $(this).toggle(function(){
                $(this).find('em').addClass('on');
                var listhtmlall = '';
                $('.tanceng .mb_xj_dxbm_list_xxl').find('li.deptChild').each(function(i,v){
                    listhtmlall +='<li uid="' + $(this).attr('deptchosenid') + '"><span>' + $(this).children('.list_msg').html() + '</span><i class="list_choose_delete"></i></li>';
                    $(this).find('span.list_check em').addClass('on');
                })
                $('.tanceng .mbxj_duoxuan_bm_xxllist').html(listhtmlall)
                //$('.tanceng .mb_xj_dxbm_list_xxl').css('display','none')
            },function(){
                $(this).find('em').removeClass('on');
                $('.tanceng .mbxj_duoxuan_bm_xxllist').html('')
                //$('.tanceng .mb_xj_dxbm_list_xxl').css('display','block')
                $('.tanceng .mb_xj_dxbm_list_xxl').find('li.deptChild').each(function(i,v){
                    $(this).find('span.list_check em').removeClass('on');
                })
            })
            $(this).trigger('click');
        })*/

        /*选择右侧框*/
        /*$(".tanceng .zcj_gszd_bmlist li").find('span.list_check').die().live("click",function(){

            var id=$(this).parent('li').attr('aid');
            var name=$(this).parent('li').data('name');
            // if($(this).find('on')){
            //      $(this).parent('li').siblings('ul').find('em').addClass('on');
            // }
            // var f=$(this).parent('li').siblings('ul').find('.on');
            $(this).toggle(function(){
                // $(this).siblings('.ul1').hide();
                $('.tanceng .zcj_right_add_zhidu_bm').append('<li rid="'+$(this).parent('li').attr('aid')+'"><span>'+$(this).prev('.list_msg').text()+'</span><i class="list_choose_delete"></i></li>');

                 $(this).children('em').addClass('on');
                bm_rid.push(id);
                bm_name.push(name)
                console.log(bm_rid);
                console.log(bm_name);
                var len=$(this).parent('ul').children('.ul1').length;
                // if(len.length>0){
                //     $(this).parent('ul').children('.ul1').find('span.list_check em').addClass('on');
                // }


            },function(){
                $('.tanceng .zcj_right_add_zhidu_bm').find('li[rid='+$(this).parents('li').attr('aid')+']').remove()
                 $(this).children('em').removeClass('on')

                // $(this).siblings('.ul1').show();
                bm_rid.splice(jQuery.inArray(id,bm_rid),1);
                bm_name.splice(jQuery.inArray(id,bm_name),1);
                console.log(bm_rid);
                console.log(bm_name);

            })
            $(this).trigger('click')
            // $('.tanceng .zcj_right_add_zhidu_bm').append('<li rid="'+$(this).parents('li').attr('aid')+'"><span>'+$(this).parent().prev('.list_msg').text()+'</span><i class="list_choose_delete"></i></li>');
        });*/

        /*搜索按钮*/
        // $('.zj_bm_list_search').die().live('click', function() {
        //     var zj_bm_input_search_val = $("#hr_search").val();
        //
        //     /* alert(hr_search_val);*/
        //     if(zj_bm_input_search_val=="搜索成员姓名/部门"){
        //
        //         params.key='';
        //     }else{
        //         params.key=zj_search_val;
        //     }
        //
        //     //传值到后台进行筛选
        //     depart_staff();
        //
        //     //传值完成
        // });

        /*删除选择的抄送人*/
        $(".tanceng .zcj_right_add_zhidu_bm .list_choose_delete").die().live("click",function(){
            $('.tanceng .zcj_gszd_bmlist .left_all em').removeClass('on');
            $('.tanceng .zcj_gszd_bmlist .left_all').siblings('ul').show();
            var cs_id=$(this).parent().attr("rid");
            var name=$(this).prev().text();

            $(this).parent().remove();
            bm_rid.splice(jQuery.inArray(cs_id,bm_rid),1);
            bm_name.splice(jQuery.inArray(name,bm_name),1);
             $(".tanceng .zcj_gszd_bmlist").find('li').each(function(){
                 if($(this).attr('aid')==cs_id){
                     $(this).find('span.list_check').click();
                    $(this).find('em').removeClass('on')
                 }
             })
                //$(".tanceng .zcj_gszd_bmlist").find('li').children('.list_check').children('en').removeClass('on');

            console.log(bm_rid);
            console.log(bm_name);
        });
        // var a=[1,2,3,4,5]
        // var b=[1,2,3]
        function tab(arr1,arr2){
            var arr = arr1.concat(arr2);
            var lastArr = [];
            for(var i = 0;i<arr.length;i++)
            {
                if(! unique(arr[i],lastArr))
                {
                    lastArr.push(arr[i]);
                }
            }
            return lastArr;
        }
        function unique(n,arr)
        {
            for(var i=0;i<arr.length;i++)
            {
                if(n==arr[i]){
                    return true;
                }
            }
            return false;
        }
//alert(tab(a,b))
        /*选择部门确认按钮*/
        $(".tanceng .zcj_end_btn").die().live("click",function(){
            // var x_id=[];
            // var x_name=[];
            // $(".zcj_select_bm_name_list li").each(function(){
            //     x_id.push($(this).data('id'));
            //     x_name.push($(this).text());
            // })
            var cs_per=[];
            var zdbm_id=[];
            $(".tanceng .zcj_right_add_zhidu_bm li").each(function(){
                cs_per.push($(this).children("span").text());
                zdbm_id.push($(this).attr("rid"));
            })
            //console.log(cs_per);
            // var xz_bmid=tab(x_id,zdbm_id);
            // var xz_name=tab(x_name,cs_per)

            // console.log('102');
            // console.log(xz_bmid);
            // console.log(xz_name);
            // console.log('102');
            var html=''
            for(var i=0;i<cs_per.length;i++){
                html+='<li style="margin-top: 1px;" data-id="'+zdbm_id[i]+'">'+cs_per[i]+'<i></i></li>';
            }

            $('.zcj_select_bm_name_list').html(html);
            var ul_heigth=$(".zcj_select_bm_name_list").height()
            var put=ul_heigth+7;
            if(put<30){
                put=30;
            }
            $(".zcj_input_val").css({'height':put})
            delbtn(this);

            //$(this).parents('.dialog_content').find('.dialog_close').click();
        });
    })
    /*删除选择的部门*/
    $(".tanceng .zcj_select_bm_name_list li i").die().live("click",function(){
        $(this).parent('li').remove();
        var ul_heigth=$(".zcj_select_bm_name_list").height();
        var put=ul_heigth+7;
        if(put<30){
            put=30;
        }
        $(".zcj_input_val").css({'height':put});
    });
    /*取消选择的部门*/
    $(".tanceng .zcj_qx_select_xzbm_btn").die().live("click",function(){
        $(".zcj_select_bm_name_list").empty();
    });
    /*关闭*/
   /* $(".tanceng .zcj_bm_gb_btn").die().live("click",function(){
        $(".zcj_select_bm_name_list").empty();
    }); */
    /*确认选择适用部门*/
    $(".tanceng .zcj_sybm_end").die().live("click",function(){

        var deptid=[];
        $(".tanceng .zcj_select_bm_name_list li").each(function(){
            deptid.push($(this).data('id'));
        })

/******************添加公司制度***************************/
/*保存*/
       $(".zcj_save_cg_btn").die().live("click",function(){
           var _this=this;
           var head;
            if($(".zcj_system_title_nr").val()=='标题'){
                head='';
            }else{
                head=$(".zcj_system_title_nr").val();
            }
          var con=getContent();

       console.log(deptid)
            if(head==''){
              alert("标题不能为空")
            }else{
                $.ajax({
                    type: 'post',
                    url: SERVER_URL + "/document/add",
                    data:{
                        token: token,
                        title:head,   //'标题',
                        content:con,   //'正文',
                        dept: deptid.toString(),     //’1,3’,部门id，多个用逗号分割
                        fileurl:'',//附件二进制流
                        is_draft:0//是否草稿，0不是，1是
                    },
                    dataType: "json",
                    success: function (data) {
                        console.log("1230000");
                        console.log(data);
                        if(data.code==0){
                            $(_this).parents('.dialog_content').find('.dialog_close').click();
                            systemlist();
                            $(".zcj_select_bm_name_list").empty();
                        }else{
                            alert(data.msg);
                        }

                    }
                })
            }

       });

       /*保存草稿*/
       $(".zcj_save_bc_cg_btn").die().live("click",function(){
           var _this=this;
         /*  var bmzdid=$("#hid_bm_id").val();*/

           var head;
           if($(".zcj_system_title_nr").val()=='标题'){
               head='';
           }else{
               head=$(".zcj_system_title_nr").val();
           }
           var content=getContent();
           if(head==''){
               alert("标题不能为空")
           }else {
               $.ajax({
                   type: 'post',
                   url: SERVER_URL + "/document/add",
                   data: {
                       token: token,
                       /* id:'', */   //id,如果有值为修改
                       title: head,   //'标题',
                       content: content,   //'正文',
                       dept: deptid.toString(),     //’1,3’,部门id，多个用逗号分割
                       fileurl: '',//附件二进制流
                       is_draft: 1//是否草稿，0不是，1是
                   },

                   dataType: "json",
                   success: function (data) {
                       console.log("1230000");
                       console.log(data);
                       if(data.code==0){
                           $(this).parents('.dialog_content').find('.dialog_close').click();
                           systemlist();
                           $(".zcj_select_bm_name_list").empty();
                       }else{
                           alert(data.msg);
                       }
                   }
               })
           }
       });
        $(this).parents('.dialog_content').find('.dialog_close').click();
    });

    /*编辑*/
$(".zcj_editor").die().live("click",function(){
    var id=$(this).data('id');
    $.ajax({
        type: 'get',
        url: SERVER_URL + "/document/info",
        data: {
            token: token,
            id:id
        },

        dataType: "json",
        success: function (data) {
            console.log(data);
            if(data.code==0){
                $(".zcj_system_title_nr").val(data['data']['title']).data('bmid',data['data']['dept']);
                if(data['data']['content']){
                    UE.getEditor('editor').setContent(data['data']['content']);
                }
            }else{
                alert(data.msg);
            }

            // setContent();
            // function setContent(isAppendTo) {
            //     var arr = [];
            //     /* arr.push("使用editor.setContent('欢迎使用ueditor')方法可以设置编辑器的内容");*/
            //     UE.getEditor('editor').setContent(data['data']['content'], isAppendTo);
            //    /* return arr.join("\n");*/
            // }
        }
    })
    /*编辑确认*/
    $(".zcj_save_cg_btn").die().live("click",function(){
        var _this=this;
        var deptid=$(".zcj_system_title_nr").data('bmid');

        var head=$(".zcj_system_title_nr").val();

        var con=getContent();
        /* alert(con)*/
        $.ajax({
            type: 'post',
            url: SERVER_URL + "/document/add",
            data:{
                token: token,
                id:id,    //id,如果有值为修改
                title:head,   //'标题',
                content:con,   //'正文',
                dept: deptid,     //’1,3’,部门id，多个用逗号分割
                fileurl:'',//附件二进制流
                is_draft:0//是否草稿，0不是，1是
            },

            dataType: "json",
            success: function (data) {
                console.log("1230000");
                console.log(data);
                delbtn(_this);

                systemlist();
            }
        })
    });
    });
/**********************************上传制度************************/
$(".hr_compSystem_uploadCon").die().live("click",function(){
        $(".zcj_sczd_xz_bm_btn").die().live();
});

/*刷新*/
$(".zcj_add_zd_sys_res_btn").die().live("click",function(){

    /* $(".hr_base_search .zcj_add_sear").click();*/
    database['page']=1;
   /* database['limit']=10;*/
    database['dept']=department_id;
    database['company_admin']=company_admin;
    database['key']='';
    systemlist();
});

});
