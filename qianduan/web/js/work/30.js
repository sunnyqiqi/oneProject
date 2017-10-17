
//SERVER_URL="http://192.168.0.167:9091";
var token, page, limit, company_id, department_id;
token = Admin.get_token();
 //token='2017052516045457073-1-1';
var uid = localStorage.getItem("uid");
 department_id = localStorage.getItem("department_id");
 company_id = localStorage.getItem("usercompany_id");
page = 1;
limit = 10;

var powerUrls=localStorage.getItem("user_info_url");
var company_admin=localStorage.getItem("company_admin");

var power=JSON.parse(powerUrls);
var add_ts="work-sign/send-sign";//推送核对
var hd_kq="/work-sign/month-sign"
  console.log(power);
// company_id = 1;
// department_id = 1;
//点击刷新
$('.wk_tjkq_djsx_btn_xxl').live('click', function() {
		add_Rload_index(30, 3) //参数页面值，父级值
	})
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
var tjkq_list_data = {
    token: token,
    company_id: '',
    department_id: '',
    yearmonth: '',
    page: page,
    limit: limit,
    start_time:'',
    end_time:''
}
	//创建考勤部门列表
function tjkq_bumen_list() {
	$.ajax({
		type: "post",
		url: SERVER_URL + "/work-sign/sign-department",
		data: {
			token: token,
			company_id: company_id
		},
		dataType: 'json',
		success: function(data) {

			if(data.code != 0) {
                //tikq_list_ajax();
				console.log('10')
                alert('0')
			} else {
				console.log('20')
                alert('1')
				var kqbm_list = data['data'],
					kqbm_html = '',
					ckkq_bmerr = '';
				if(kqbm_list.length == 0) {
					ckkq_bmerr += '<li class="Sideslip_list_on" name="work_kq_ul" title="还没有部门哦"><span>哦呦,还没有部门哦</span></li>';
					$('.tjkq_bmlist_xxl').html(ckkq_bmerr);
				} else {
					$.each(kqbm_list, function(i, v) {
						kqbm_html += '<li class="" name="work_kq_ul" title="' + v['department_name'] + '" bmid="' + v.department_id + '" gsid="' + v.company_id + '" stime="' + v['department_goto'] + '" xtime="' + v['department_leave'] + '"><span>' + v['department_name'] + '</span></li>';

					});
					$('.tjkq_bmlist_xxl').html(kqbm_html);
					$('.tjkq_bmlist_xxl li:first-child').addClass('Sideslip_list_on');
					tjkq_list_data.department_id = $('.tjkq_bmlist_xxl li:first-child').attr('bmid');
					tjkq_list_data.company_id = $('.tjkq_bmlist_xxl li:first-child').attr('gsid');
                    if(company_admin!=1) {
                        if ($.inArray(hd_kq,power) > -1) {
                           // alert('1')
                            $("#zcj_kqtj_hdkq_list_data_show").show();

                            $("#zcj_kqtj_hdkq_list_data_show").trigger('click');
                            //tikq_list_ajax();
                            // $(".zcj_ts_hd_push").show();
                            // $(".zj_yts_btn").show();

                        } else {
                            //alert('2')
                            $("#zcj_kqtj_hdkq_list_data_show").hide();
                            $("#zcj_kqtj_mykq_list_data_show").trigger('click');
                            // $(".zcj_ts_hd_push").hide();
                            // $(".zj_yts_btn").hide();
                        }
                    }
                    tikq_list_ajax();

				}

			}
		},
		error: function(e) {
            alert("更新失败");
		}
	});
}
//tjkq_bumen_list();

/*核对考勤列表*/
function tikq_list_ajax() {
    $.ajax({
        type: "post",
        url: SERVER_URL + "/work-sign/month-sign",
        data: tjkq_list_data,
        dataType: 'json',
        success: function(data) {
            console.log(data)
            var tjkq_list = data['data'],

                tjkq_html = '';
            if(data.code != 0) {

                $('.zj_hdkq_no_data_show_div').show();
                $(".zcj_fy_tjkq_page_show").hide();

            } else {

                if(tjkq_list.length == 0) {

                    $(".zj_hdkq_no_data_show_div").show();
                    $(".zcj_fy_tjkq_page_show").hide();

                } else {

                    $(".zj_hdkq_no_data_show_div").hide();
                    $(".zcj_fy_tjkq_page_show").show();
                    $.each(tjkq_list, function(i,v) {
                       /* tjkq_html +='<tr><td><input type="checkbox" name="work_kq_check"></td>';*/
                        tjkq_html +='<td>'+likNullData(v['yearmonth'])+'</td>';
                        tjkq_html +='<td>'+likNullData(v['name'])+'</td>';
                        tjkq_html +='<td>'+likNullData(v['department'])+'</td>';
                        tjkq_html +='<td>'+likNullData(v['arriveCount'])+'</td>';
                        if(v['amLateCount']==0){
                            tjkq_html +='<td>0</td>';
                        }else{
                            tjkq_html +='<td class="c_r">'+likNullData(v['amLateCount'])+'</td>';
                        }
                        if(v['pmLateCount']==0){
                            tjkq_html +='<td>0</td>';
                        }else{
                            tjkq_html +='<td class="c_r">'+likNullData(v['pmLateCount'])+'</td>';
                        }
                        if(v['amNoSignCount']==0){
                            tjkq_html +='<td>0</td>';
                        }else{
                            tjkq_html +='<td class="c_r">'+likNullData(v['amNoSignCount'])+'</td>';
                        }
                        if(v['pmNoSignCount']==0){
                            tjkq_html +='<td>0</td>';
                        }else{
                            tjkq_html +='<td class="c_r">'+likNullData(v['pmNoSignCount'])+'</td>';
                        }
                        tjkq_html +='<td>'+likNullData(v['overCount'])+'</td>';
                        tjkq_html +='<td >'+likNullData(v['jiabanCount'])+'</td>';
                        tjkq_html +='<td>'+likNullData(v['leaveCount'])+'</td>';
                        if(v['status']==0){
                            tjkq_html +='<td>未确定考勤</td>';
                            tjkq_html +='<td>'
                            if(v['appeal']==1){
                                tjkq_html +='<button class="but_mix val_dialog but_look zcj_check_kq_xq_btn" data-company_id="'+v['company_id']+'" data-department_id="'+v['department_id']+'" data-uid="'+v['uid']+'" data-yearmonth="'+v['yearmonth']+'" name="work_kqtj_ck">查看</button>';
                                 if(v['if_push']==1){
                                /*<button class="but_mix but_look but_grey1 zj_yts_btn" data-total_id="'+v['total_id']+'" name="hr_addcyad_bj">已推送</button>*/
                                    tjkq_html+='<button class="but_mix but_yellow val_dialog zcj_tjkq_dispose_appeal_btn" data-company_id="'+v['company_id']+'" data-department_id="'+v['department_id']+'" data-yearmonth="'+v['yearmonth']+'" data-total_id="'+v['total_id']+'" data-uid="'+v['uid']+'" data-appeal="'+v['appeal']+'" name="work_kqgl_clsp">处理申诉</button> '
                                }else{
                                    tjkq_html+='<button class="but_mix but_look zcj_ts_hd_push" data-total_id="'+v['total_id']+'" name="hr_addcyad_bj">推送核对</button>'
                                }
                            }else{
                                tjkq_html +='<button class="but_mix val_dialog but_look zcj_check_kq_xq_btn" data-company_id="'+v['company_id']+'" data-department_id="'+v['department_id']+'" data-uid="'+v['uid']+'" data-yearmonth="'+v['yearmonth']+'" name="work_kqtj_ck">查看</button>';
                               /* if(v['if_push']==0){
                                    tjkq_html+='<button class="but_mix but_look zcj_ts_hd_push" data-total_id="'+v['total_id']+'" name="hr_addcyad_bj">推送核对</button>'
                                }else if(v['if_push']==1){
                                    tjkq_html+='<button class="but_mix but_look but_grey1 zj_yts_btn" data-total_id="'+v['total_id']+'" name="hr_addcyad_bj">已推送</button></td>'
                                }*/

                            }


                            tjkq_html +='</td>'
                        }else if(v['status']==1){
                            tjkq_html +='<td class="f_color">确认考勤</td>';
                            tjkq_html +='<td>'
                            tjkq_html +='<button class="but_mix but_look val_dialog zcj_check_kq_xq_btn" data-company_id="'+v['company_id']+'" data-department_id="'+v['department_id']+'" data-uid="'+v['uid']+'" data-yearmonth="'+v['yearmonth']+'" name="work_kqtj_ck">查看</button><!--<button class="but_mix1 but_grey1 zj_yts_btn">已推送</button>--></td>';
                            tjkq_html +='</td>'
                        }else{
                            tjkq_html +='<td>-</td>';
                            tjkq_html +='<td>'
                            tjkq_html +='<button class="but_mix val_dialog but_look zcj_check_kq_xq_btn" data-company_id="'+v['company_id']+'" data-department_id="'+v['department_id']+'" data-uid="'+v['uid']+'" data-yearmonth="'+v['yearmonth']+'" name="work_kqtj_ck">查看</button>';
                          /*  if(v['if_push']==0){
                                tjkq_html+='<button class="but_mix but_look zcj_ts_hd_push" data-total_id="'+v['total_id']+'" name="hr_addcyad_bj">推送核对</button>'
                            }else if(v['if_push']==1){
                                tjkq_html+='<button class="but_mix but_look but_grey1 zj_yts_btn" data-total_id="'+v['total_id']+'" name="hr_addcyad_bj">已推送</button>'
                            }*/
                            tjkq_html +='</td>'
                        }
                        tjkq_html+='</tr>'
                    });

                    /*分页*/
                    var znum=data.number;
                    var zpage=data.data.length;
                    /*$(".zcj_jrd_seach_syjg").text(znum);*/
                    list_table_render_pagination(".zcj_fy_tjkq_page_show",tjkq_list_data,tikq_list_ajax,znum,zpage);

                    // if(company_admin!=1) {
                    //     if ($.inArray(add_ts, power) > -1) {
                    //         $(".zcj_ts_hd_push").show();
                    //         $(".zj_yts_btn").show();
                    //
                    //     } else {
                    //         $(".zcj_ts_hd_push").hide();
                    //         $(".zj_yts_btn").hide();
                    //     }
                    // }
                }
            }
            $('.zj_hdkq_tbody_info_list_content').html(tjkq_html);
        },
        error: function(e) {
            //console.log(e)
            alert('服务器更新失败，请稍后再试');
            $('.zj_hdkq_no_data_show_div').show();
            $(".zcj_fy_tjkq_page_show").hide();
        }
    });
}

/*核对考勤*/
$("#zcj_kqtj_hdkq_list_data_show").die('click').live("click",function(){
    tjkq_bumen_list()
    //切换部门考勤
    $('.tjkq_bmlist_xxl li').die().live('click', function() {
        var department_id=$(this).attr('bmid');
        var company_id=$(this).attr('gsid');
        tjkq_list_data['department_id']=department_id;
        tjkq_list_data['company_id']=company_id;
        tikq_list_ajax();
    })
    /*选择时间*/
    $(".ven_after_order_look_record_zdysj_save").die().live("click",function(){
        var start_time=$(".zcj_select_start_time_val").val();
        var end_time=$(".zcj_select_end_time_val").val();

        tjkq_list_data['start_time']=start_time;
        tjkq_list_data['end_time']=end_time;
        tikq_list_ajax();
        //tjkq_bumen_list()
        $(this).parents('.dialog_content_2').find('.dialog_close').click();

    });
    /*全部时间*/
    $(".zcj_all_time_data_day_show li:first-child").die().live("click",function(){
        tjkq_list_data['start_time']='';
        tjkq_list_data['end_time']='';
        tikq_list_ajax();
    });
    /*查看详情*/
    $(".zcj_check_kq_xq_btn").die('click').live("click",function () {

        var company_id=$(this).data('company_id');
        var department_id=$(this).data('department_id');
        var uid=$(this).data('uid');
        var yearmonth=$(this).data('yearmonth');
        var data_info={
            token:token,
            company_id:company_id,
            department_id:department_id,
            uid:uid,
            yearmonth:yearmonth
        }
        check_infor_fn(data_info,".zcj_kq_xq_show_list_data_display");
        $(".tanceng .zcj_ckcq_end_xq_hdkq_btn").die().live("click",function(){
            $(this).parents('.zcj_kq_xq_show_list_data_display').find('.dialog_close').click();
        });
    });
    /***********推送核对***************/
    $(".zcj_ts_hd_push").die().live("click",function(){
        var total_id=$(this).data('total_id');
        $.ajax({
            type: "post",
            url: SERVER_URL + "/work-sign/send-sign",
            data:{
                token:token,
                total_id:total_id
            },
            dataType: 'json',
            success: function (data) {
                console.log('220000333666');
                console.log(data);
                console.log('2200003336666');
                if (data.code == 0) {
                    tikq_list_ajax();
                }
            }
        })
    });
});

$("#zcj_kqtj_hdkq_list_data_show").trigger('click');
//$("#zcj_kqtj_hdkq_list_data_show").trigger('click');
/*查看详情信息*/
function check_infor_fn(data_info,vclass){
    $.ajax({
        type: "post",
        url: SERVER_URL + "/work-sign/personal-sign",
        data: data_info ,
        dataType: 'json',
        success: function(data) {
            console.log('0000');
            console.log(data);
            console.log('0000');
            var html='';
            html+='<div class="dialog_title work_staicAtt_dlog_detHead zcj_head_yc_display" style="z-index: 1;"> <i class="dialog_close">关闭</i> <h3 class="dialog_h3">'+likNullData(data['name'])+'考勤详情</h3></div>'
            html+='<div class="saLook_dialog_text clearfix work_staicAtt_spc_dialog">'
            html+='<div class="work_staicAttdce_tableBoxDiv left">'+likNullData(data['name'])+'</div>'
            html+='<div class="work_staicAttdce_tableBoxDiv left">'+likNullData(data['deptname'])+'</div>'
            html+='<div class="work_kqgl_table_3"><table>'
            html+='<tr class="table_total"> <td>日期</td> </tr>'
            html+='<tr class="table_total"> <td>星期</td> </tr>'
            html+='<tr class="table_total"> <td>上班</td> </tr>'
            html+='<tr class="table_total"> <td>下班</td> </tr>'
            html+='<tr class="table_total"> <td>加班上班</td> </tr>'
            html+='<tr class="table_total"> <td>加班下班</td> </tr>'
            html+='<tr class="table_total"> <td style="height:20px;">请假</td> </tr>'
            html+='</table></div>'
            html+='<div class="div_1 table-container work_staicAttdce_tableBox"><div class="div_1 container ">'
            html+='<table class="work_staicAttdce_dialog_look_table ">'
            html+='<thead>'
            html+='<tr class="table_total">'
            $.each(data.data,function(index,kqlist){
                html+='<th>'+likNullData(kqlist['yearmonthday'])+'</th>'
            })
            html+='</tr>'
            html+='<tr class="table_total">'
            $.each(data.data,function(index,kqlist){
                html+='<th>'+likNullData(kqlist['week'])+'</th>'
            })
            html+='</tr>'
            html+='</thead>'
            html+='<tbody>'
            html+='<tr>'
            $.each(data.data,function(index,kqlist){
                if(kqlist['amNoSignCount']==1){
                    html+='<td class="c_c">未签到</td>'
                }else if(kqlist['amOverCount']==1){
                    html+='<td class="f_color">范围外</td>'
                }else if(kqlist['amLate']==1){
                    html+='<td class="f_color_red">迟'+ kqlist['gowork']+'</td>'
                }else{
                    html+='<td>'+likNullData(kqlist['gowork'])+'</td>'
                }

            })
            html+='</tr>'
            html+='<tr>'
            $.each(data.data,function(index,kqlist){
                if(kqlist['pmNoSignCount']==1){
                    html+='<td class="c_c">未签退</td>'
                }else if(kqlist['pmOverCount']==1){
                    html+='<td class="f_color">范围外</td>'
                }else if(kqlist['pmLate']==1){
                    html+='<td class="f_color_red">早退'+kqlist['leavework']+'</td>'
                }else{
                    html+='<td>'+likNullData(kqlist['leavework'])+'</td>'
                }

            })
            html+='</tr>'
            html+='<tr>'
            $.each(data.data,function(index,kqlist){
                html+='<td>'+likNullData(kqlist['addwork'])+'</td>'
            })
            html+='</tr>'
            html+='<tr>'
            $.each(data.data,function(index,kqlist){
                html+='<td>'+likNullData(kqlist['leaveaddwork'])+'</td>'
            })
            html+='</tr>'
            html+='<tr>'
            $.each(data.data,function(index,kqlist){
                if(kqlist['leave']==1){
                    html+='<td class="f_color_red">请假</td>'
                }else{
                    html+='<td>'+likNullData(kqlist['leave'])+'</td>'
                }

            })
            html+='</tr>'
            html+='</tbody>'
            html+='</table>'
            html+='</div></div></div>'
            html+='<div class="dialog_submit"><button class="but_blue but_small zcj_ckcq_end_xq_hdkq_btn">确定</button><button class="but_small but_cancel">取消</button></div>'
            $(vclass).html(html);
        },
        error: function(e) {
            alert("更新失败");
        }
    })
}

/*申诉通过并修改考勤方法列表*/
function ss_pass_list(datalist,vclass){
    $.ajax({
        type: "post",
        url: SERVER_URL + "/work-sign/personal-sign",
        data:datalist,
        dataType: 'json',
        success: function(data) {
            console.log('0000');
            console.log(data);
            console.log('0000');
            var html='';
            html+='<div class="dialog_title work_staicAtt_dlog_detHead" style="z-index: 1;"> <i class="dialog_close">关闭</i> <h3 class="dialog_h3">'+likNullData(data['name'])+'考勤详情</h3></div>'
            html+='<div class="saLook_dialog_text clearfix work_staicAtt_spc_dialog">'
            html+='<div class="work_staicAttdce_tableBoxDiv left">'+likNullData(data['name'])+'</div>'
            html+='<div class="work_staicAttdce_tableBoxDiv left" data-bmid="">'+likNullData(data['deptname'])+'</div>'
            html+='<div class="work_kqgl_table_3"><table>'
            html+='<tr class="table_total"> <td >日期</td> </tr>'
            html+='<tr class="table_total"> <td>星期</td> </tr>'
            html+='<tr class="table_total"> <td data-goto="'+data['department_goto']+'" class="zcj_sb_qd_time">上班</td> </tr>'
            html+='<tr class="table_total"> <td data-leave="'+data['department_leave']+'" class="zcj_xb_qd_time">下班</td> </tr>'
            html+='<tr class="table_total"> <td>加班上班</td> </tr>'
            html+='<tr class="table_total"> <td>加班下班</td> </tr>'
            html+='<tr class="table_total"> <td style="height:20px;">请假</td> </tr>'
            html+='</table></div>'
            html+='<div class="div_1 table-container work_staicAttdce_tableBox"><div class="div_1 container ">'
            html+='<table class="work_staicAttdce_dialog_look_table ">'
            html+='<thead>'
            html+='<tr class="table_total">'
            $.each(data.data,function(index,kqlist){
                html+='<th>'+likNullData(kqlist['yearmonthday'])+'</th>'
            })
            html+='</tr>'
            html+='<tr class="table_total">'
            $.each(data.data,function(index,kqlist){
                html+='<th>'+likNullData(kqlist['week'])+'</th>'
            })
            html+='</tr>'
            html+='</thead>'
            html+='<tbody>'
            html+='<tr>'
            $.each(data.data,function(index,kqlist){
                if(kqlist['amNoSignCount']==1){
                    html+='<td class="c_c">未签到<button class="but_blue work_kqgl_but zcj_goto_xgxq_amend_btn" data-nianyueri="'+kqlist['nianyueri']+'">修改</button></td>'
                }else if(kqlist['amOverCount']==1){
                    html+='<td class="f_color">范围外<button class="but_blue work_kqgl_but zcj_goto_xgxq_amend_btn" data-nianyueri="'+kqlist['nianyueri']+'">修改</button></td>'
                }else if(kqlist['amLate']==1){
                    html+='<td class="f_color_red">迟'+ kqlist['gowork']+'<button class="but_blue work_kqgl_but zcj_goto_xgxq_amend_btn" data-nianyueri="'+kqlist['nianyueri']+'">修改</button></td>'
                }else{
                    html+='<td>'+likNullData(kqlist['gowork'])+'</td>'
                }

            })
            html+='</tr>'
            html+='<tr>'
            $.each(data.data,function(index,kqlist){
                if(kqlist['pmNoSignCount']==1){
                    html+='<td class="c_c">未签退<button class="but_blue work_kqgl_but zcj_xg_amend_kq" data-nianyueri="'+kqlist['nianyueri']+'">修改</button></td>'
                }else if(kqlist['pmOverCount']==1){
                    html+='<td class="f_color">范围外<button class="but_blue work_kqgl_but zcj_xg_amend_kq" data-nianyueri="'+kqlist['nianyueri']+'">修改</button></td>'
                }else if(kqlist['pmLate']==1){
                    html+='<td class="f_color_red">早退'+kqlist['leavework']+'<button class="but_blue work_kqgl_but zcj_xg_amend_kq" data-nianyueri="'+kqlist['nianyueri']+'">修改</button></td>'
                }else{
                    html+='<td>'+likNullData(kqlist['leavework'])+'</td>'
                }

            })
            html+='</tr>'
            html+='<tr>'
            $.each(data.data,function(index,kqlist){
                if(kqlist['addwork']!=0){
                    html+='<td class="work_kqgl_xgCon relative"><span class="zcj_up_sb_time_show">'+likNullData(kqlist['addwork'])+'</span><button class="but_blue work_kqgl_but work_kqgl_xg zcj_add_jb_sb_xg_btn" data-nianyueri="'+kqlist['nianyueri']+'">修改</button> <div class="cg_ghs_contMsgBox" style="display: none;width: 186px;"> <i class="vent_client_torr"></i> <ul class="cg_ghs_contMsgBoxDet work_kqgl_shijian clearfix"> <!--<ul class="work_kqgl_shijian clearfix">--> <li><input type="text" class="zcj_hq_input_val_hour" value=""></li> <li><input type="text" class="zcj_hq_input_val_minute" value="">:</li> <!--</ul>--> </ul><div class="cg_ghs_contMsgBoxDet"><button class="but_blue zcj_set_jbsb_goto_time_end_btn">确定</button><button>取消</button> </div></div></td>'
                }else{
                    html+='<td><span class="">'+likNullData(kqlist['addwork'])+'</span></td>'
                }
            })
            html+='</tr>'
            html+='<tr>'
            $.each(data.data,function(index,kqlist){
                if(kqlist['leaveaddwork']!=0){
                    html+='<td class="work_kqgl_xgCon relative"><span class="zcj_down_xb_time_show">'+likNullData(kqlist['leaveaddwork'])+'</span><button class="but_blue work_kqgl_but work_kqgl_xg zcj_add_jb_xb_leave_btn" data-nianyueri="'+kqlist['nianyueri']+'">修改</button> <div class="cg_ghs_contMsgBox" style="display: none;width: 186px;"> <i class="vent_client_torr"></i> <ul class="cg_ghs_contMsgBoxDet work_kqgl_shijian clearfix"> <!--<ul class="work_kqgl_shijian clearfix">--> <li><input type="text" value="" class="zcj_hq_xb_input_val_hour"></li> <li><input type="text" value="" class="zcj_hq_xb_input_val_minute">:</li> <!--</ul>--> </ul> <div class="cg_ghs_contMsgBoxDet"> <button class="but_blue zcj_set_jbxb_duty_time_end_btn">确定</button><button>取消</button> </div> </div></td>'
                }else{
                    html+='<td>'+likNullData(kqlist['leaveaddwork'])+'</td>'
                }

            })
            html+='</tr>'
            html+='<tr>'
            $.each(data.data,function(index,kqlist){
                if(kqlist['leave']==1){
                    html+='<td class="f_color_red">请假<button class="but_blue work_kqgl_but zcj_xg_qj_amend_kq_btn" data-nianyueri="'+kqlist['nianyueri']+'">修改</button></td>'
                }else{
                    html+='<td>'+likNullData(kqlist['leave'])+'</td>'
                }

            })
            html+='</tr>'
            html+='</tbody>'
            html+='</table>'
            html+='</div></div></div>'
            html+='<div class="dialog_submit"><button class="but_blue but_small zcj_kqxq_edit_end_btn">确定</button><button class="but_small but_cancel">取消</button></div>'
            $(vclass).html(html);
        },
        error: function(e) {
            alert("更新失败");
        }
    })
}
/*处理申诉*/
$(".zcj_30_kq_list_show_data .zcj_tjkq_dispose_appeal_btn").die().live("click",function(){
    $(".zcj_tjkq_manage_kq_data_show_list").prev().show();
	/*$(this).prev().prev().click();*/
    var company_id=$(this).data('company_id');
    var department_id=$(this).data('department_id');
    //var department_id=$('.tjkq_bmlist_xxl .Sideslip_list_on').attr('bmid')
    var uid=$(this).data('uid');
    var yearmonth=$(this).data('yearmonth');
    $.ajax({
        type: "post",
        url: SERVER_URL + "/work-sign/personal-sign",
        data: {
            token:token,
            company_id:company_id,
            department_id:department_id,
            uid:uid,
            yearmonth:yearmonth
        },
        dataType: 'json',
        success: function(data) {
            console.log('0000');
            console.log(data);
            console.log('0000');
            var html='';
            html+='<div class="work_staicAttdce_tableBoxDiv left">'+likNullData(data['name'])+'</div>'
            html+='<div class="work_staicAttdce_tableBoxDiv left">'+likNullData(data['deptname'])+'</div>'
            html+='<div class="work_kqgl_table_3"><table>'
            html+='<tr class="table_total"> <td>日期</td> </tr>'
            html+='<tr class="table_total"> <td>星期</td> </tr>'
            html+='<tr class="table_total"> <td>上班</td> </tr>'
            html+='<tr class="table_total"> <td>下班</td> </tr>'
            html+='<tr class="table_total"> <td>加班上班</td> </tr>'
            html+='<tr class="table_total"> <td>加班下班</td> </tr>'
            html+='<tr class="table_total"> <td style="height:20px;">请假</td> </tr>'
            html+='</table></div>'
            html+='<div class="div_1 table-container work_staicAttdce_tableBox"><div class="div_1 container ">'
            html+='<table class="work_staicAttdce_dialog_look_table ">'
            html+='<thead>'
            html+='<tr class="table_total">'
            $.each(data.data,function(index,kqlist){
                html+='<th>'+likNullData(kqlist['yearmonthday'])+'</th>'
            })
            html+='</tr>'
            html+='<tr class="table_total">'
            $.each(data.data,function(index,kqlist){
                html+='<th>'+likNullData(kqlist['week'])+'</th>'
            })
            html+='</tr>'
            html+='</thead>'
            html+='<tbody>'
            html+='<tr>'
            /*$.each(data.data,function(index,kqlist){
                html+='<td>'+likNullData(kqlist['gowork'])+'</td>'
            })
            html+='</tr>'
            html+='<tr>'
            $.each(data.data,function(index,kqlist){
                html+='<td>'+likNullData(kqlist['leavework'])+'</td>'
            })
            html+='</tr>'
            html+='<tr>'
            $.each(data.data,function(index,kqlist){
                html+='<td>'+likNullData(kqlist['addwork'])+'</td>'
            })
            html+='</tr>'
            html+='<tr>'
            $.each(data.data,function(index,kqlist){
                html+='<td>'+likNullData(kqlist['leaveaddwork'])+'</td>'
            })
            html+='</tr>'
            html+='<tr>'
            $.each(data.data,function(index,kqlist){
                html+='<td>'+likNullData(kqlist['leave'])+'</td>'
            })*/
            $.each(data.data,function(index,kqlist){
                if(kqlist['amNoSignCount']==1){
                    html+='<td class="c_c">未签到</td>'
                }else if(kqlist['amOverCount']==1){
                    html+='<td class="f_color">范围外</td>'
                }else if(kqlist['amLate']==1){
                    html+='<td class="f_color_red">迟'+ kqlist['gowork']+'</td>'
                }else{
                    html+='<td>'+likNullData(kqlist['gowork'])+'</td>'
                }

            })
            html+='</tr>'
            html+='<tr>'
            $.each(data.data,function(index,kqlist){
                if(kqlist['pmNoSignCount']==1){
                    html+='<td class="c_c">未签退</td>'
                }else if(kqlist['pmOverCount']==1){
                    html+='<td class="f_color">范围外</td>'
                }else if(kqlist['pmLate']==1){
                    html+='<td class="f_color_red">早退'+kqlist['leavework']+'</td>'
                }else{
                    html+='<td>'+likNullData(kqlist['leavework'])+'</td>'
                }

            })
            html+='</tr>'
            html+='<tr>'
            $.each(data.data,function(index,kqlist){
                html+='<td>'+likNullData(kqlist['addwork'])+'</td>'
            })
            html+='</tr>'
            html+='<tr>'
            $.each(data.data,function(index,kqlist){
                html+='<td>'+likNullData(kqlist['leaveaddwork'])+'</td>'
            })
            html+='</tr>'
            html+='<tr>'
            $.each(data.data,function(index,kqlist){
                if(kqlist['leave']==1){
                    html+='<td class="f_color_red">请假</td>'
                }else{
                    html+='<td>'+likNullData(kqlist['leave'])+'</td>'
                }

            })
            html+='</tr>'
            html+='</tbody>'
            html+='</table>'
            html+='</div></div>'
            html+='<div class="wokr_kqgl_ssnr">'
            html+='<h3>申诉内容：</h3>'
            html+='<p>10月5日已经跟经理说明不来的原因了，请修改正常考勤。</p>'
            html+='</div>'

            $(".zcj_tjkq_manage_kq_data_show_list").html(html);
        },
        error: function(e) {
            alert("更新失败");
        }
    })
    var total_id=$(this).data('total_id');
    /*var uid=$(this).data('uid');*/
    /*var appeal=$(this).data('appeal');*/

    /*申诉驳回*/
    $(".zcj_appeal_bh_back_btn").die().live("click",function(){

        $.ajax({
            type: "post",
            url: SERVER_URL + "/work-sign/operation-appeal",
            data:{
                token:token,
                total_id: total_id,
                uid: uid,
                appeal:3
            },
            dataType: 'json',
            success: function (data) {
                console.log('220000');
                console.log(data);
                console.log('220000');
            },
            error: function (e) {
                alert("更新失败");
            }
        })
    });

    /*申诉通过并修改考勤*/
    $(".tanceng .zcj_appeal_pass_change_btn").die().live("click",function(){
        var deptid=$('.tjkq_bmlist_xxl .Sideslip_list_on').attr('bmid');
        //alert(deptid);
        var _this=this;
        /*展示信息*/
        var data_pass={
            token:token,
            company_id:company_id,
            department_id:deptid,
            uid:uid,
            yearmonth:yearmonth
        }
        ss_pass_list(data_pass,".tanceng .zcj_check_amend_pass_xq_list_show")
        /*上班修改按钮*/
        var up_edit=''
        $(".zcj_goto_xgxq_amend_btn").die().live("click",function(){
            var _this=this;
            var yearmonthday=$(this).data('nianyueri')
            up_edit=$(this).parent().html();
            var sb=$(".zcj_check_amend_pass_xq_list_show .zcj_sb_qd_time").data('goto');
           /*var xb=$(".zcj_check_amend_pass_xq_list_show .zcj_xb_qd_time").data('leave');*/
            $.ajax({
                type: "post",
                url: SERVER_URL + "/work-sign/edit-day-sign",
                data:{
                    token:token,
                    work_time: sb,
                    sign_type:1,
                    uid: uid,
                    yearmonthday:yearmonthday,
                    company_id:company_id,
                    department_id:deptid
                } ,
                dataType: 'json',
                success: function (data) {
                    console.log('220000333');
                    console.log(data);
                    console.log('220000333');
                    if(data.code==0){
                        $(_this).parent().html('<span class="c_g">正常</span><!--<button class="but_red work_kqgl_but zcj_xg_edit_back_btn">撤回</button>-->');
                     }else{
                     alert(data.msg)

                     }
                },
                error: function (e) {
                    alert("更新失败");
                }
            })
            $(".zcj_xg_edit_back_btn").die().live("click",function(){
                $(this).parent().html(up_edit);
            });
        })
        /*迟到*/
       /* var sb_late='';
        $(".zcj_goto_xgxq_amend_late_btn").die().live("click",function(){
            sb_late=$(this).parent().html();
            $(this).parent().html('<span class="c_g">正常</span><button class="but_red work_kqgl_but zcj_xg_edit_late_back_btn">撤回</button>')
            $(".zcj_xg_edit_late_back_btn").die().live("click",function(){
                $(this).parent().html(sb_late);
            });
        });*/
        /*点击下班修改按钮*/
        var down_edit=''
        $(".zcj_xg_amend_kq").die().live("click",function(){
            down_edit=$(this).parent().html();
            var _this=this;
            var yearmonthday=$(this).data('nianyueri')
            down_edit=$(this).parent().html();
           /* var sb=$(".zcj_check_amend_pass_xq_list_show .zcj_sb_qd_time").data('goto');*/
            var xb=$(".zcj_check_amend_pass_xq_list_show .zcj_xb_qd_time").data('leave');
            $.ajax({
                type: "post",
                url: SERVER_URL + "/work-sign/edit-day-sign",
                data:{
                    token:token,
                    work_time: xb,
                    sign_type:2,
                    uid: uid,
                    yearmonthday:yearmonthday,
                    company_id:company_id,
                    department_id:deptid
                } ,
                dataType: 'json',
                success: function (data) {
                    console.log('220000333');
                    console.log(data);
                    console.log('220000333');
                    if(data.code==0){
                        $(_this).parent().html('<span class="c_g">正常</span><!--<button class="but_red work_kqgl_but zcj_xb_down_edit_back_btn">撤回</button>-->');
                    }else{
                        /*$(_this).attr('name','work_kqtj_xiugai');*/
                        alert(data.msg)
                    }
                },
                error: function (e) {
                    alert("更新失败");
                }
            })

            $(".zcj_xb_down_edit_back_btn").die().live("click",function(){
                $(this).parent().html(down_edit);
            });
        });
        /*早退*/
      /*  var zt_early='';
        $(".zcj_zt_amend_early_kq").die().live("click",function(){
            zt_early=$(this).parent().html();
            $(this).parent().html('<span class="c_g">正常</span><button class="but_red work_kqgl_but zcj_zt_edit_early_back_btn">撤回</button>')
            $(".zcj_zt_edit_early_back_btn").die().live("click",function(){
                $(this).parent().html(zt_early);
            });
        });*/
      /*******************加班上班***************************/
      $(".tanceng .zcj_add_jb_sb_xg_btn").die().live("click",function () {
          var yearmonthday=$(this).data('nianyueri');

          $(".tanceng .zcj_set_jbsb_goto_time_end_btn").die().live("click",function(){

                var _this=this;
              var hour=$(this).parent().prev().find('.zcj_hq_input_val_hour').val();
             if(hour==''){
                  hour='00';
              }else if(hour<60){
                  hour=$(this).parent().prev().find('.zcj_hq_input_val_hour').val();
              }
              var minute=$(this).parent().prev().find('.zcj_hq_input_val_minute').val();

                if(minute==24){
                    minute=0;
                }
                if(minute>0 && minute<10){
                    minute=0+minute;
                }
                if(minute<24 && hour<60){
                  var work_time=minute+':'+hour;

                    $.ajax({
                        type: "post",
                        url: SERVER_URL + "/work-sign/edit-day-sign",
                        data:{
                            token:token,
                            work_time: work_time,
                            sign_type:3,
                            uid: uid,
                            company_id:company_id,
                            yearmonthday:yearmonthday,
                            department_id:department_id
                        } ,
                        dataType: 'json',
                        success: function (data) {
                            console.log('220000333');
                            console.log(data);
                            console.log('220000333');
                            if(data.code==0){
                             $(_this).parents('td').find('.zcj_up_sb_time_show').text(work_time);

                                /*$(_this).parent().html('<span class="c_g">正常</span><button class="but_red work_kqgl_but zcj_xg_edit_back_btn">撤回</button>');*/
                            }else{
                                alert(data.msg);

                            }
                        },
                        error: function (e) {
                            alert(e.msg);
                        }
                    })
              }else{
                    alert("请输入正确时间");
                }



          });
      });
        /*******************加班下班***************************/
        $(".tanceng .zcj_add_jb_xb_leave_btn").die().live("click",function () {
            var yearmonthday=$(this).data('nianyueri');
            $(".tanceng .zcj_set_jbxb_duty_time_end_btn").die().live("click",function(){
                var _this=this;
                var hour=$(this).parent().prev().find(".zcj_hq_xb_input_val_hour").val();
                 if(hour==''){
                    hour='00';
                }else if(hour<60){
                    hour=$(this).parent().prev().find(".zcj_hq_xb_input_val_hour").val();
                }
                var minute=$(this).parent().prev().find(".zcj_hq_xb_input_val_minute").val();
                if(minute==24){
                    minute=0;
                }
                if(minute>0 && minute<10){
                    minute=0+minute;
                }
                if(minute<24 && hour<60){
                    var work_time=minute+':'+hour;
                    $.ajax({
                        type: "post",
                        url: SERVER_URL + "/work-sign/edit-day-sign",
                        data:{
                            token:token,
                            work_time: work_time,
                            sign_type:4,
                            uid: uid,
                            company_id:company_id,
                            yearmonthday:yearmonthday,
                            department_id:department_id
                        } ,
                        dataType: 'json',
                        success: function (data) {
                            console.log('220000333');
                            console.log(data);
                            console.log('220000333');
                            if(data.code==0){

                                $(_this).parents('td').find('.zcj_down_xb_time_show').text(work_time);

                                /*$(_this).parent().html('<span class="c_g">正常</span><button class="but_red work_kqgl_but zcj_xg_edit_back_btn">撤回</button>');*/
                            }else{
                                alert(data.msg);

                            }
                        },
                        error: function (e) {
                            alert(e.msg);
                        }
                    })
                }else{
                    alert("请输入正确时间");
                }



            });
        });
        /*请假*/
        var qj_leave='';
        $(".zcj_xg_qj_amend_kq_btn").die().live("click",function(){
            qj_leave=$(this).parent().html();
            $(this).parent().html('<span class="c_g">正常</span><button class="but_red work_kqgl_but zcj_qj_down_edit_back_btn">撤回</button>');
            $(".zcj_qj_down_edit_back_btn").die().live("click",function(){
                $(this).parent().html(qj_leave);
            });
        });
        /*当月考勤编辑*/
        $(".tanceng .zcj_kqxq_edit_end_btn").die().live("click",function(){
            var _this=this;
            /*处理申诉*/
           /* $(".zcj_kqxq_edit_end_btn").die().live("click",function(){*/
                $.ajax({
                    type: "post",
                    url: SERVER_URL + "/work-sign/operation-appeal",
                    data:{
                        token:token,
                        total_id: total_id,
                        uid: uid,
                        company_id:company_id,
                        department_id:department_id,
                        appeal:2
                    } ,
                    dataType: 'json',
                    success: function (data) {
                        console.log('220000');
                        console.log(data);
                        console.log('220000');
                        if(data.code==0){
                            tikq_list_ajax();
                            $(_this).parents('.zcj_check_amend_pass_xq_list_show').find('.dialog_close').click();
                        }else{
                            alert(data.msg);

                        }
                    },
                    error: function (e) {
                        alert(e.msg);
                    }
                })
           /* });*/

        });


    });
});
/*申诉处理——我的申诉*/
var my_data= {
    token:token,
    search_time:'',
    uid: uid
}
function my_ss_fn() {
    $.ajax({
        type: "post",
        url: SERVER_URL + "/work-sign/my-send-appeal",
        data:my_data,
        dataType: 'json',
        success: function (data) {
            console.log('220000333');
            console.log(data);
            console.log('220000333');
            if(data.code==0){
                $(".tanceng .zcj_select_data_time_list li:eq(0)").siblings().remove();
                var lists='';
                $.each(data['data'],function(index,list_time){
                    lists+='<li data-yearmonth="'+list_time['yearmonth']+'">'+list_time['yearmonth']+'</li>'
                });
                $(".tanceng .zcj_select_data_time_list").append(lists);
                var html='';
                $.each(data['data'],function(index,list){
                    html+='<tr>';
                    html+='<td>'+likNullData(list['name'])+'</td>'
                    html+='<td><p>'+likNullData(list['content'])+'</p></td>'
                    html+='<td>'+likNullData(list['creat_time'])+'</td>'
                    html+='<td>'+likNullData(list['end_time'])+'</td>'
                    if(list['appeal_status']==1){
                        html+='<td class="c_y">申诉中</td>'
                    }else if(list['appeal_status']==2){
                        html+='<td class="c_g">通过</td>'
                    }else if(list['appeal_status']==3){
                        html+='<td class="c_r">已拒绝</td>'
                    }else{
                        html+='<td class="c_g">-</td>'
                    }
                    html+='<td><button class="but_look but_mix val_dialogTop zcj_my_ss_appeal_check_btn" data-uid="'+list['uid']+'" data-company_id="'+list['company_id']+'" data-yearmonth="'+list['yearmonth']+'" data-department_id="'+list['department_id']+'" name="work_kqwdss_ck">查看</button></td>'
                    html+='</tr>';
                });
                $(".tanceng .zcj_client_contact_list_data_myss").html(html);
            }else{
                alert(data.msg);
            }

        },
        error: function (e) {
            alert("更新失败");
        }
    })
}
$(".zcj_appeal_chuli_list_btn").die().live("click",function(){
    /*我的申诉列表*/
    my_ss_fn();
    /*我的申诉查看*/
    $(".tanceng .zcj_my_ss_appeal_check_btn").die().live("click",function(){
        var company_id=$(this).data('company_id');
        var department_id=$(this).data('department_id');
        var uid=$(this).data('uid');
        var yearmonth=$(this).data('yearmonth');
        var data_info={
            token:token,
            company_id:company_id,
            department_id:department_id,
            uid:uid,
            yearmonth:yearmonth
        }
        check_infor_fn(data_info,".zcj_my_ss_ckkq_tc_check")
    });
});
/*我的申诉*/
$("#zcj_my_ss_wdss_manage").die().live("click",function(){
    my_ss_fn();
});
/*搜索时间*/
$(".tanceng .zcj_select_data_time_list li").die().live("click",function () {
    var time=$(this).data('yearmonth');
    my_data['search_time']=time;
    my_ss_fn();
});
/*申诉处理——我处理的申诉列表*/
var data_ss={
    token:token,
    do_uid:uid
}
function my_clss_fn(){
    $.ajax({
        type: "post",
        url: SERVER_URL + "/work-sign/my-appeal",
        data:data_ss,
        dataType: 'json',
        success: function (data) {
            console.log('220000333');
            console.log(data);
            console.log('220000333');
            if(data.code==0){

                    $(".tanceng .zcj_select_data_time_list li:eq(0)").siblings().remove();
                    var lists='';
                    $.each(data['data'],function(index,list_time){
                        lists+='<li data-yearmonth="'+list_time['yearmonth']+'">'+list_time['yearmonth']+'</li>'
                    });
                    $(".tanceng .zcj_select_data_time_list").append(lists);
                    var html='';
                    $.each(data['data'],function(index,list){
                        html+='<tr>';
                        html+='<td>'+likNullData(list['name'])+'</td>'
                        html+='<td><p>'+likNullData(list['content'])+'</p></td>'
                        html+='<td>'+likNullData(list['creat_time'])+'</td>'
                        html+='<td>'+likNullData(list['end_time'])+'</td>'
                        if(list['appeal_status']==1){
                            html+='<td class="c_y">待处理</td>'

                        }else if(list['appeal_status']==2){
                            html+='<td class="c_g">通过</td>'

                        }else if(list['appeal_status']==3){
                            html+='<td class="c_r">已驳回</td>'

                        }else{
                            html+='<td class="c_r">-</td>'
                        }
                        html+='<td><button class="but_look but_mix val_dialogTop zcj_mycl_ss_check_info_btn" data-uid="'+list['uid']+'" data-company_id="'+list['company_id']+'" data-yearmonth="'+list['yearmonth']+'" data-department_id="'+list['department_id']+'" data-total_id="'+list['total_id']+'" name="work_kqgl_clsp">查看</button></td>'
                        html+='</tr>';
                    });
                    $(".tanceng .zcj_client_contact_list_data_mycl_manage").html(html);


            }else{
                alert(data.msg);
            }

        },
        error: function (e) {
            alert("服务器错误");
        }
    })
}
/*申诉处理——我处理的申诉*/
$("#zcj_my_ss_complain_manage").die().live("click",function(){

    my_clss_fn();
    /*搜索时间*/
    $(".tanceng .zcj_select_data_time_list li").die().live("click",function () {
        var time=$(this).data('yearmonth');
        data_ss['search_time']=time;
        my_clss_fn();
    });
    /*我处理的申诉查看*/
    $(".tanceng .zcj_mycl_ss_check_info_btn").die().live("click",function(){
        var company_id=$(this).data('company_id');
        var department_id=$(this).data('department_id');
        var deptid=$('.tjkq_bmlist_xxl .Sideslip_list_on').attr('bmid');
        var uid=$(this).data('uid');
        var yearmonth=$(this).data('yearmonth');
        var data_info={
            token:token,
            company_id:company_id,
            department_id:deptid,
            uid:uid,
            yearmonth:yearmonth
        }
         $(".zcj_tjkq_manage_kq_data_show_list").prev().hide();
        check_infor_fn(data_info,".zcj_tjkq_manage_kq_data_show_list");
        var total_id=$(this).data('total_id');
        /*申诉驳回*/
        $(".tanceng .zcj_appeal_bh_back_btn").die().live("click",function(){
            var _this=this;
            $.ajax({
                type: "post",
                url: SERVER_URL + "/work-sign/operation-appeal",
                data:{
                    token:token,
                    total_id: total_id,
                    uid: uid,
                    appeal:3
                },
                dataType: 'json',
                success: function (data) {
                    console.log('220000');
                    console.log(data);
                    console.log('220000');
                    if(data.code==0){
                        my_clss_fn();
                    $(_this).parents(".zcj_tjkq_manage_kq_data_show_list").find(".dialog_close").click();

                    }else{
                        alert(data.msg);
                    }
                },
                error: function (e) {
                    alert("服务器错误");
                }
            })
        });
        /*通过并修改考勤*/
        $(".tanceng .zcj_appeal_pass_change_btn").die().live("click",function(){
            var deptid=$('.tjkq_bmlist_xxl .Sideslip_list_on').attr('bmid');
           /* alert(deptid);*/
            var tg_this=this;
            ss_pass_list(data_info,".zcj_check_amend_pass_xq_list_show");

            /*上班修改按钮*/
            var up_edit=''
            $(".zcj_goto_xgxq_amend_btn").die().live("click",function(){
                var _this=this;
                var yearmonthday=$(this).data('nianyueri')
                up_edit=$(this).parent().html();
                var sb=$(".zcj_check_amend_pass_xq_list_show .zcj_sb_qd_time").data('goto');
                /*var xb=$(".zcj_check_amend_pass_xq_list_show .zcj_xb_qd_time").data('leave');*/
                $.ajax({
                    type: "post",
                    url: SERVER_URL + "/work-sign/edit-day-sign",
                    data:{
                        token:token,
                        work_time: sb,
                        sign_type:1,
                        uid: uid,
                        yearmonthday:yearmonthday,
                        company_id:company_id,
                        department_id:deptid
                    } ,
                    dataType: 'json',
                    success: function (data) {
                        console.log('220000333');
                        console.log(data);
                        console.log('220000333');
                        if(data.code==0){
                            $(_this).parent().html('<span class="c_g">正常</span><!--<button class="but_red work_kqgl_but zcj_xg_edit_back_btn">撤回</button>-->');
                        }else{
                            /*$(_this).attr('name','work_kqtj_xiugai');*/

                        }
                    },
                    error: function (e) {
                        alert(e.msg);
                    }
                })
                $(".zcj_xg_edit_back_btn").die().live("click",function(){
                    $(this).parent().html(up_edit);
                });
            })
            /*迟到*/
            /* var sb_late='';
             $(".zcj_goto_xgxq_amend_late_btn").die().live("click",function(){
             sb_late=$(this).parent().html();
             $(this).parent().html('<span class="c_g">正常</span><button class="but_red work_kqgl_but zcj_xg_edit_late_back_btn">撤回</button>')
             $(".zcj_xg_edit_late_back_btn").die().live("click",function(){
             $(this).parent().html(sb_late);
             });
             });*/
            /*点击下班修改按钮*/
            var down_edit=''
            $(".zcj_xg_amend_kq").die().live("click",function(){
                down_edit=$(this).parent().html();
                var _this=this;
                var yearmonthday=$(this).data('nianyueri')
                down_edit=$(this).parent().html();
                /* var sb=$(".zcj_check_amend_pass_xq_list_show .zcj_sb_qd_time").data('goto');*/
                var xb=$(".zcj_check_amend_pass_xq_list_show .zcj_xb_qd_time").data('leave');
                $.ajax({
                    type: "post",
                    url: SERVER_URL + "/work-sign/edit-day-sign",
                    data:{
                        token:token,
                        work_time: xb,
                        sign_type:2,
                        uid: uid,
                        yearmonthday:yearmonthday,
                        company_id:company_id,
                        department_id:deptid
                    } ,
                    dataType: 'json',
                    success: function (data) {
                        console.log('220000333');
                        console.log(data);
                        console.log('220000333');
                        if(data.code==0){
                            $(_this).parent().html('<span class="c_g">正常</span><!--<button class="but_red work_kqgl_but zcj_xb_down_edit_back_btn">撤回</button>-->');
                        }else{
                            /*$(_this).attr('name','work_kqtj_xiugai');*/
                            alert(data.msg);
                        }
                    },
                    error: function (e) {
                        alert("服务器错误");
                    }
                })

                $(".zcj_xb_down_edit_back_btn").die().live("click",function(){
                    $(this).parent().html(down_edit);
                });
            });
            /*早退*/
            /*  var zt_early='';
             $(".zcj_zt_amend_early_kq").die().live("click",function(){
             zt_early=$(this).parent().html();
             $(this).parent().html('<span class="c_g">正常</span><button class="but_red work_kqgl_but zcj_zt_edit_early_back_btn">撤回</button>')
             $(".zcj_zt_edit_early_back_btn").die().live("click",function(){
             $(this).parent().html(zt_early);
             });
             });*/
            /*******************加班上班***************************/
            $(".tanceng .zcj_add_jb_sb_xg_btn").die().live("click",function () {
                var yearmonthday=$(this).data('nianyueri');

                $(".tanceng .zcj_set_jbsb_goto_time_end_btn").die().live("click",function(){

                    var _this=this;
                    var hour=$(this).parent().prev().find('.zcj_hq_input_val_hour').val();
                    if(hour==''){
                        hour='00';
                    }else if(hour<60){
                        hour=$(this).parent().prev().find('.zcj_hq_input_val_hour').val();
                    }
                    var minute=$(this).parent().prev().find('.zcj_hq_input_val_minute').val();

                    if(minute==24){
                        minute=0;
                    }
                    if(minute>0 && minute<10){
                        minute=0+minute;
                    }
                    if(minute<24 && hour<60){
                        var work_time=minute+':'+hour;

                        $.ajax({
                            type: "post",
                            url: SERVER_URL + "/work-sign/edit-day-sign",
                            data:{
                                token:token,
                                work_time: work_time,
                                sign_type:3,
                                uid: uid,
                                company_id:company_id,
                                yearmonthday:yearmonthday,
                                department_id:department_id
                            } ,
                            dataType: 'json',
                            success: function (data) {
                                console.log('220000333');
                                console.log(data);
                                console.log('220000333');
                                if(data.code==0){
                                    $(_this).parents('td').find('.zcj_up_sb_time_show').text(work_time);
                                    alert(work_time);
                                    /*$(_this).parent().html('<span class="c_g">正常</span><button class="but_red work_kqgl_but zcj_xg_edit_back_btn">撤回</button>');*/
                                }else{
                                    alert(data.msg);

                                }
                            },
                            error: function (e) {
                                alert(e.msg);
                            }
                        })
                    }else{
                        alert("请输入正确时间");
                    }



                });
            });
            /*******************加班下班***************************/
            $(".tanceng .zcj_add_jb_xb_leave_btn").die().live("click",function () {
                var yearmonthday=$(this).data('nianyueri');
                $(".tanceng .zcj_set_jbxb_duty_time_end_btn").die().live("click",function(){
                    var _this=this;
                    var hour=$(this).parent().prev().find(".zcj_hq_xb_input_val_hour").val();
                     if(hour==''){
                        hour='00';
                    }else if(hour<60){
                        hour=$(this).parent().prev().find(".zcj_hq_xb_input_val_hour").val();
                    }
                    var minute=$(this).parent().prev().find(".zcj_hq_xb_input_val_minute").val();
                    if(minute==24){
                        minute=0;
                    }
                    if(minute>0 && minute<10){
                        minute=0+minute;
                    }
                    if(minute<24 && hour<60){
                        var work_time=minute+':'+hour;
                        $.ajax({
                            type: "post",
                            url: SERVER_URL + "/work-sign/edit-day-sign",
                            data:{
                                token:token,
                                work_time: work_time,
                                sign_type:4,
                                uid: uid,
                                company_id:company_id,
                                yearmonthday:yearmonthday,
                                department_id:department_id
                            } ,
                            dataType: 'json',
                            success: function (data) {
                                console.log('220000333');
                                console.log(data);
                                console.log('220000333');
                                if(data.code==0){

                                    $(_this).parents('td').find('.zcj_down_xb_time_show').text(work_time);

                                    /*$(_this).parent().html('<span class="c_g">正常</span><button class="but_red work_kqgl_but zcj_xg_edit_back_btn">撤回</button>');*/
                                }else{
                                    alert(data.msg);

                                }
                            },
                            error: function (e) {
                                alert(e.msg);
                            }
                        })
                    }else{
                        alert("请输入正确时间");
                    }



                });
            });
            /*请假*/
            var qj_leave='';
            $(".zcj_xg_qj_amend_kq_btn").die().live("click",function(){
                qj_leave=$(this).parent().html();
                $(this).parent().html('<span class="c_g">正常</span><button class="but_red work_kqgl_but zcj_qj_down_edit_back_btn">撤回</button>');
                $(".zcj_qj_down_edit_back_btn").die().live("click",function(){
                    $(this).parent().html(qj_leave);
                });
            });
            /*当月考勤编辑*/
            $(".tanceng .zcj_kqxq_edit_end_btn").die().live("click",function(){
                var _this=this;

                $.ajax({
                    type: "post",
                    url: SERVER_URL + "/work-sign/operation-appeal",
                    data:{
                        token:token,
                        total_id: total_id,
                        uid: uid,
                        company_id:company_id,
                        department_id:department_id,
                        appeal:2
                    } ,
                    dataType: 'json',
                    success: function (data) {
                        console.log('220000333');
                        console.log(data);
                        console.log('22000033');
                        if(data.code==0){
                            my_clss_fn();
                            $(_this).parents('.zcj_check_amend_pass_xq_list_show').find('.dialog_close').click();
                            $(tg_this).parents('.zcj_tjkq_manage_kq_data_show_list').find('.dialog_close').click();
                        }else{
                            alert(data.msg);

                        }
                    },
                    error: function (e) {
                        alert(e.msg);
                    }
                })
                //tikq_list_ajax();
            });
        });
    });
});
/***************************我的考勤******************************/
$(function () {
    var mykq_data={
        token: token,
        department_id:department_id,
        company_id:company_id,
         page:1,
        limit:10,
        /*yearmonth:'2017-05',*/
        uid:uid
    }
    function mykq_list_fn(){
        $.ajax({
            type: "post",
            url: SERVER_URL + "/work-sign/pc-sign-total",
            data: mykq_data,
            dataType: 'json',
            success: function (data) {
                console.log('220000333');
                console.log(data);
                console.log('220000333');
                $(".zcj_search_data_time_list_select li:eq(0)").siblings().remove();
                if(data['data'].length==0){
                    /*$('.tjkq_listhtml_xxl').empty();*/
                    $('.wk_ckkq_fenye_list_xxl').hide();
                    $('.zcj_no_data_show_ts_dv').show();
                    /* var tjkq_err = '';
                     tjkq_err += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
                     $('.zcj_no_data_show_ts_dv').html(tjkq_err);*/
                }else{
                    $('.zcj_no_data_show_ts_dv').hide();
                    $('.wk_ckkq_fenye_list_xxl').show();
                }
                var time='';
                $.each(data['data'],function (index,list_time) {
                    time += '<li data-yearmonth="'+list_time['yearmonth']+'">'+list_time['yearmonth']+'</li>'
                });

                $(".zcj_search_data_time_list_select").append(time);
                var html='';
                $.each(data['data'],function(index,list){
                    html+='<tr>';
                    html+='<td>'+likNullData(list['yearmonth'])+'</td>';
                    html+='<td>'+likNullData(list['name'])+'</td>';
                    html+='<td>'+likNullData(list['department'])+'</td>';
                    html+='<td>'+likNullData(list['arriveCount'])+'</td>';
                    html+='<td>'+likNullData(list['amLateCount'])+'</td>';
                    html+='<td>'+likNullData(list['pmLateCount'])+'</td>';
                    html+='<td>'+likNullData(list['amNoSignCount'])+'</td>';
                    html+='<td>'+likNullData(list['pmNoSignCount'])+'</td>';
                    html+='<td>'+likNullData(list['overCount'])+'</td>';
                    html+='<td>'+likNullData(list['jiabanCount'])+'</td>';
                    html+='<td>'+likNullData(list['leaveCount'])+'</td>';
                    if(list['appeal']==1){
                        html+='<td class="c_y">申诉中</td>';
                    }else if(list['appeal']==2){
                        html+='<td class="c_g">申诉通过</td>';
                    }else if(list['appeal']==3){
                        html+='<td class="c_r">申诉驳回</td>';
                    }else {
                        html+='<td class="c_r">-</td>';
                    }
                    if(list['status']==0){
                         if(list['appeal']==1){
                             html+='<td><button class="but_mix  val_dialog but_look zcj_my_kq_check_info_xq" data-company_id="'+list['company_id']+'" data-department_id="'+list['department_id']+'" data-uid="'+list['uid']+'" data-yearmonth="'+list['yearmonth']+'" name="work_kq_ck">查看</button><button class="but_mix1 but_grey1" data-total_id="'+list['total_id']+'" data-uid="'+list['uid']+'" name="">确定考勤</button><button class="but_mix1 but_grey1" data-uid="'+list['uid']+'" data-total_id="'+list['total_id']+'" data-company_id="'+list['company_id']+'" name="">申诉</button></td>';
                         }else {
                             html+='<td><button class="but_mix val_dialog but_look zcj_my_kq_check_info_xq" data-company_id="'+list['company_id']+'" data-department_id="'+list['department_id']+'" data-uid="'+list['uid']+'" data-yearmonth="'+list['yearmonth']+'" name="work_kq_ck">查看</button><button class="but_mix but_blue val_dialogTop zcj_kq_end_affirm_btn" name="work_kqgl_qdkq_a">确定考勤</button><button class="but_mix val_dialog zcj_mykq_ss_complain_btn" data-uid="'+list['uid']+'" data-total_id="'+list['total_id']+'" data-company_id="'+list['company_id']+'" name="work_ckgl_ss">申诉</button></td>';
                         }

                    }else if(list['status']==1){
                        html+='<td><button class="but_mix val_dialog but_look zcj_my_kq_check_info_xq" data-company_id="'+list['company_id']+'" data-department_id="'+list['department_id']+'" data-uid="'+list['uid']+'" data-yearmonth="'+list['yearmonth']+'" name="work_kq_ck">查看</button><button class="but_mix1 but_grey1" name="">已确定考勤</button><button class="but_mix1 but_grey1" data-uid="'+list['uid']+'" data-total_id="'+list['total_id']+'" data-company_id="'+list['company_id']+'" name="">申诉</button></td>';

                    }

                })

                $(".zcj_my_kq_list_data_show").html(html);
                /*分页*/
                var znum=data.number;
                var zpage=data.data.length;
                /*$(".zcj_jrd_seach_syjg").text(znum);*/
                list_table_render_pagination(".zcj_my_kq_fy_page_show",mykq_data,mykq_list_fn,znum,zpage);
            },
            error: function (e) {
                alert('服务器错误');
            }
        })
    }
    $(".zcj_search_data_time_list_select li").die().live("click",function(){
        var datatime=$(this).data('yearmonth');
        mykq_data['yearmonth']=datatime;
        mykq_list_fn();
    });
    $("#zcj_kqtj_mykq_list_data_show").die('click').live("click",function(){
        mykq_list_fn();

        /*查看*/
        $(".zcj_my_kq_check_info_xq").die().live("click",function(){
            var company_id=$(this).data('company_id');
            var department_id=$(this).data('department_id');
            var uid=$(this).data('uid');
            var yearmonth=$(this).data('yearmonth');
            var data_par={
                token:token,
                company_id:company_id,
                department_id:department_id,
                uid:uid,
                yearmonth:yearmonth
            }
            check_infor_fn(data_par,".zcj_my_kq_xq_infor_data_show");
            $(".tanceng .zcj_ckcq_end_xq_hdkq_btn").die().live("click",function(){
                $(this).parents('.zcj_my_kq_xq_infor_data_show').find('.dialog_close_zsy').click();
            });
        });
        /*确定当月考勤*/
        $(".zcj_kq_end_affirm_btn").die().live("click",function(){
            var total_id=$(this).data('total_id');
            var uid=$(this).data('uid');
            $(".tanceng .zcj_qr_end_confirm_kq_btn").die().live("click",function(){
                var me=this;
                $.ajax({
                    type: "post",
                    url: SERVER_URL + "/work-sign/make-sure",
                    data: {
                        token:token,
                        total_id: total_id,
                        uid:uid
                    },
                    dataType: 'json',
                    success: function (data) {
                        console.log('220000333');
                        console.log(data);
                        console.log('220000333');
                        if(data.code==0){
                            $(me).parents('.dialog_content_delete').find('.dialog_close').click();
                            mykq_list_fn();
                        }else{
                            alert(data.msg);
                        }
                    },
                    error: function (e) {
                        alert("更新失败");
                    }
                })
            });
        });
        /*申诉*/
        $('.zcj_mykq_ss_complain_btn').die().live('click',function () {
            var total_id=$(this).data('total_id');
            var uid=$(this).data('uid');
            var company_id=$(this).data('company_id')
            /* var do_uid=$(this).data('do_uid');*/
            /*选择处理人*/
            $(".tanceng .zcj_manage_person_tc_btn").die().live("click",function(){
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

                        var  html='<li class="left_all"><span class="icon_open change_ba"></span><span class="icon_file"></span><span class="list_msg">所有分类(4)</span></li>';
                        var deep=0;
                        $(".zcj_xz_select_manage_person_tree").html(html+tree_list_bmfzr(data,deep));

                    },
                    error: function(data) {
                        //提示添加失败
                        alert("添加失败");
                    }
                });
                /*获取name*/
                $(".zcj_xz_select_manage_person_tree .person_left_nav").die().live("click",function(){

                    var iv=$(this).children(".list_msg").html();
                    /* alert(iv);*/
                    /*确定选择负责人*/
                    $(".tanceng .zcj_select_manage_person_end_btn").die().live("click",function(){
                        /*var name=$(".zcj_show_man").val(iv);*/
                        var id=$(".zcj_xz_select_manage_person_tree .person_left_nav.on").attr("userinfoid");
                        var html='<li data-id="'+id+'" class="zcj_person_fig"><i class="del_img_1">-</i><em class="icon_personBtn icon_personBtn_msg"><i class="icon_personNext"></i></em> <em class="icon_adderBtn"></em> <p class="box_adderName" data-id="'+id+'">'+iv+'</p></li>'
                        $(".zcj_select_person_show_list_data .zcj_person_fig").remove();
                        $(".zcj_manage_person_tc_btn").parent().before(html)
                        $(this).next().click();
                    });
                    /*取消选择负责人*/

                });
            });
            /*获取处理人id*/

            /*************确定申诉btn*****************/
            $(".tanceng .zcj_complain_success_end_btn").die().live("click",function () {
                var me=this;
                var content=$('.zcj_complain_yj_client_contact').val();
                var person_id=$('.zcj_select_person_show_list_data .zcj_person_fig').data('id');
                $.ajax({
                    type: "post",
                    url: SERVER_URL + "/work-sign/add-appeal",
                    data: {
                        token:token,
                        total_id: total_id,
                        uid:uid,
                        do_uid:person_id,
                        company_id:company_id,
                        content:content
                    },
                    dataType: 'json',
                    success: function (data) {
                        console.log('220000333');
                        console.log(data);
                        console.log('220000333');
                        if(data.code==0){
                            $(me).parents('.dialog_content').find('.dialog_close').click();
                            mykq_list_fn();
                        }else{
                            alert(data.msg);
                        }
                    },
                    error: function (e) {
                        alert("更新失败");
                    }
                })
            });

        });
    });
    if(company_admin!=1) {
        if ($.inArray(hd_kq,power) > -1) {

            //$("#zcj_kqtj_mykq_list_data_show").trigger('click');
            //tikq_list_ajax();
            // $(".zcj_ts_hd_push").show();
            // $(".zj_yts_btn").show();

        } else {
            // $("#zcj_kqtj_mykq_list_data_show").trigger('click');
            //alert('2')
            //$("#zcj_kqtj_hdkq_list_data_show").hide();
            // $(".zcj_ts_hd_push").hide();
            // $(".zj_yts_btn").hide();
        }
    }
});
