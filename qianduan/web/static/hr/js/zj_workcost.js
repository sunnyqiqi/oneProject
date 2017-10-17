/*办公费用*/
$(function(){
   var  company_id = localStorage.getItem("usercompany_id");
      var token=Admin.get_token();
    // var bgdata={
    //     token:token,
    //     start_time:'',
    //     end_time:'',
    //     page: 1,
    //     limit: 10
    // };
    // function worklist(){
    //
    //     $.ajax({
    //         type: 'get',
    //         url: SERVER_URL + "/flowtable-purchase/list",
    //         data:bgdata,
    //         dataType: "json",
    //         success: function (data) {
    //
    //             console.log(data);
    //             if(data['datalist'].length>0){
    //                 $(".zcj_no_data_show_company_fy").hide();
    //                 $(".zcj_bgfy_page").show();
    //                 /* $(".hr_yidong").show();*/
    //             }else{
    //                 $(".zcj_no_data_show_company_fy").show();
    //                 $(".zcj_bgfy_page").hide();
    //                 /*$(".hr_yidong").hide();*/
    //             }
    //             var html="";
    //             for(var i=0;i<data.datalist.length;i++){
    //                 html+="<tr> <td><span class='ahover'>"+data.datalist[i].name+"</span></td> <td>"+data.datalist[i].type_name+"</td> <td>"+data.datalist[i].day+"</td> <td>"+data.datalist[i].num+"</td><td>"+data.datalist[i].total+"</td><td>"+data.datalist[i].job_name+"</td></tr>";
    //             }
    //             $(".zcj_bgfy_list").empty().append(html);
    //             var znum=data.totalCount;
    //             var cur=data.datalist.length;
    //             list_table_render_pagination(".zcj_bgfy_page", bgdata, worklist,znum,cur);
    //
    //         }
    //     });
    // }
    // worklist();
    var bgdata_data={
        token:token,
        company_id:company_id,
        start_time:'',
        end_time:'',
        page: 1,
        limit: 10
    };
    function worklist_list(){

        $.ajax({
            type: 'post',
            url: SERVER_URL + "/work-purchase/get-list",
            data:bgdata_data,
            dataType: "json",
            success: function (data) {

                console.log(data);
                if(data.code==0){
                    if(data['data'].length>0){
                        $(".zcj_no_data_show_company_fy").hide();
                        $(".zcj_bgfy_page").show();
                        /* $(".hr_yidong").show();*/
                    }else{
                        $(".zcj_no_data_show_company_fy").show();
                        $(".zcj_bgfy_page").hide();
                        /*$(".hr_yidong").hide();*/
                    }
                    var html="";
                    for(var i=0;i<data.data.length;i++){
                        html+="<tr> <td><span class='ahover'>"+likNullData(data.data[i].title)+"</span></td> <td>"+likNullData(data.data[i].purchase_type)+"</td> <td>"+likNullData(data.data[i].creat_time)+"</td><td>"+likNullData(data.data[i].total_price)+"</td><td>"+likNullData(data.data[i].username)+"</td></tr>";
                    }
                    $(".zcj_bgfy_list").html(html);
                    var znum=data.total_count;
                    var cur=data.data.length;
                    list_table_render_pagination(".zcj_bgfy_page", bgdata_data, worklist_list,znum,cur);
                }


            }
        });
    }
    worklist_list();
    /*选择时间*/
    $(".zcj_select_bgfy_time_end_btn").die().live("click",function(){
        var start=$("#hr_gszd_start").val();
        var end=$("#hr_gszd_end").val();
        bgdata_data.start_time=start;
        bgdata_data.end_time=end;
        bgdata_data.page=1;
        worklist_list();
        console.log(start);
        console.log(end);
        $(this).next().click();
    });
    /*选择全部时间*/
    $(".zcj_bgfy_zdy_time_list li:first-child").die().live("click",function(){
        bgdata_data.start_time='';
        bgdata_data.end_time='';
        bgdata_data.page=1;
        worklist_list();

    });
    /*刷新*/
    $(".zj_gsbg_zd_refish_res").die().live("click",function(){
        bgdata_data.start_time='';
        bgdata_data.end_time='';
        bgdata_data.page=1;
        worklist_list();
    });

});
