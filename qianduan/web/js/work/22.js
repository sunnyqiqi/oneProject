//工作 
// 默认测试账号 15900000001	tekon:2016122416190312079
//发起的任务 ID：22
//$(function(){
//	console.log(6666)
//})
var token, limit_22, work_id, w_p_n22,uid,bossid;
token = Admin.get_token();
uid = Admin.get_uid();
var loginUserInfo = JSON.parse(localStorage.getItem('user_info'));
bossid = loginUserInfo.company_admin;
//SERVER_URL = 'http://192.168.0.167:9091/';
//console.log(bossid)
//console.log(uid)window.localStorage.getItem('uid');
//token='2017021311542463002';
//SERVER_URL = 'http://192.168.0.167:9010/';
//uid = 1;
work_page_22 = 1;
work_limit_22 = 5;
work_key_22 = "";
var loginUserInfo = JSON.parse(localStorage.getItem('user_info'));
    console.log(loginUserInfo);
var tjzrwA = 'task/save',zjrwA='task/move';
if(loginUserInfo['company_admin'] != 1){
	if(loginUserInfo.powerUrls.length==0){
	$('.rwzj_pid').hide();
	$('.zxrw_tjzrw_xxl').hide()
}else{
	var arr = loginUserInfo.powerUrls;//
	if($.inArray(tjzrwA, arr)!=-1){
		$('.zxrw_tjzrw_xxl').show();
	}else{
		$('.zxrw_tjzrw_xxl').hide();
	}
	if($.inArray(zjrwA, arr)!=-1){
		$('.rwzj_pid').show();
	}else{
		$('.rwzj_pid').hide();
	}

}
}

//SERVER_URL = 'http://192.168.0.167:9091/';
//选择人员列表
//选择任务成员
function tree_list_choose_dept_person(datalist, deep) {
		var html = '';
		$.each(datalist, function(index, data) {
			var html_i_list_before = '<i class="list_before_span"></i>';
			html += '<ul class="ul1">';
			for(var j = 0; j < deep; j++) {
				html_i_list_before += '<i class="list_before_span"></i>'
			}
			html += '<li class="left_1" deptchosenid = "' + data["id"] + '">' + html_i_list_before + '<span class="icon_open change_ba"></span><span class="icon_file"></span><span class="list_msg">' + data['name'] + '('+data.user_info.length+')</span><span class="list_check"><em></em></span></li>';
			if(data['children'] && data['children'].length > 0) {
				html += tree_list_choose_dept_person(data['children'], deep + 1);
			}
			html += '<ul class="ul3" style="display:block;">'
			$.each(data['user_info'], function(index2, data2) {
				if(data2.job_status==3){
					var html_i_list_before = '<i class="list_before_span"></i>';
				for(var j = 0; j < deep + 1; j++) {
					html_i_list_before += '<i class="list_before_span"></i>'
				}
				html += '<li class="left_2 person_left_nav li_person" userinfoid="' + data2['id'] + '">' + html_i_list_before + '<span class="list_msg">' + data2['name'] + ' </span><span class="list_check"><em></em></span></li>'
				}else{
					return false;
				}
				
			})
			html += '</ul>';
			html += '</ul>';
		});
		return html
	}

$('.tanceng .val_dialogTop').die().live('click', function() {
	$('.renwulist_xxl').html('')
	$.ajax({
		type: "get",
		url: SERVER_URL + "dept/deptlist",
		data: {
			token: token
		},
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg)
			} else {
				//console.log(data)
				var lists = data['list'],list_html='',touburenyuan='';
				$.each(lists, function(i,v) {
					list_html +='<ul><li class="left_2 person_left_nav li_person" userinfoid="' + v.id + '"><i class="list_before_span"></i><span class="list_msg">' + v.name + ' </span><span class="list_check"><em></em></span></li></ul>';
				});
				var touburenyuan = '<li class="left_all"><span class="icon_open change_ba"></span><span class="icon_file"></span><span class="list_msg">所有分类(4)</span><span class="list_check"><em></em></span></li>';
				var aaa = tree_list_choose_dept_person(data.rows,0)
				$('.fqrw_list_xxl').html(touburenyuan + aaa+list_html)

			}
		},
		error: function(data) {

		}
	});
})

$('.fqrw_list_xxl .person_left_nav').die().live('click', function() {
	$(this).toggle(function() {
		$('.renwulist_xxl').append('<li rid="' + $(this).attr('userinfoid') + '"><span>' + $(this).children('.list_msg').html() + '</span><i class="list_choose_delete"></i></li>')
		$(this).find('.list_check em').addClass('on')
	}, function() {
		$('.renwulist_xxl').find('li[rid=' + $(this).attr('userinfoid') + ']').remove()
		$(this).find('.list_check em').removeClass('on')
	})
	$(this).trigger('click')
		//console.log($(this).attr('aid'))
		//console.log($(this).children('.list_msg').html())

})
$('.list_choose_delete').die().live('click', function() {
	$(this).parent().remove();
})
$('.tanceng .xzryqd_xxl').die().live('click', function() {
	if($('.tanceng .renwulist_xxl li').length < 1) {
		alert('请选择人员')
		return
	} else {
		//alert($('.tanceng .renwulist_xxl li').length)
		var rens = '',
			rids = [];
		$.each($('.tanceng .renwulist_xxl li'), function(i, v) {
			//console.log($(this).children('span').html())
			rens += $(this).children('span').html() + ' ';
			rids.push($(this).attr('rid'));
		})
//		$('.tanceng .save_memsss').val(rens)
//		$('.tanceng .save_memsss').attr('rid', rids)
//		$('.tanceng .w_s_mems').val(rens)
//		$('.tanceng .w_s_mems').attr('rid', rids) //
		$('.tanceng .addfzr').val(rens)
		$('.tanceng .addfzr').attr('rid', rids) //sunfzr
	}
	$('.renwulist_xxl').html('')
	$(this).parent().parent().parent().remove();
	var num = $('.tanceng').children(".dialog_box").length;
	if(num < 1) {
		$(".tanceng").hide();
	};
})
//选择人员
    //	dialog tree list person
    function tree_list_person(datalist, deep) {
        var html = '';
        $.each(datalist, function (index, data) {
            var html_i_list_before = '<i class="list_before_span"></i>';
            html += '<ul class="ul1">';
            for (var j = 0; j < deep; j++) {
                html_i_list_before += '<i class="list_before_span"></i>'
            }
            html += '<li class="left_1" cussortid = "' + data["id"] + '">' + html_i_list_before + '<span class="icon_open"></span><span class="icon_file"></span><span class="list_msg">' + data['name'] + '('+data.user_info.length+')</span></li>';
            html += '<ul class="ul3">';
            if (data['children'] && data['children'].length > 0) {
                html += tree_list_person(data['children'], deep + 1);
            }
            $.each(data['user_info'], function(index2, data2){
            	if(data2.job_status==3){
            		var html_i_list_before = '<i class="list_before_span"></i>';
	            for (var j = 0; j < deep+1; j++) {
	                html_i_list_before += '<i class="list_before_span"></i>'
	            }
            	html+= '<li class="left_2 person_left_nav" userinfoid="'+data2['id']+'">' + html_i_list_before + '<span class="list_msg">'+data2['name']+' </span></li>'
            	}else{
            		return false;
            	}
	            
            })
            
            html += '</li>';
            html += '</ul>';
            html += '</ul>'
        }); 
        return html
    }
    function zxrw_rey_ajax(){
    	$.ajax({
		type:"get",
		url:SERVER_URL+"dept/deptlist",
		data:{token:token},
		dataType:'json',
		success:function(data){
			if(data.code!=0){
				console.log(data.msg)
			}else{
				console.log(data)
				var datalists = data.rows;//jiaojierenyuan
				var lists = data['list'],list_html='';
				$.each(lists, function(i,v) {
					list_html +='<li class="left_2 person_left_nav" userinfoid="' + v.id + '"><i class="list_before_span"></i><span class="list_msg">' + v.name + ' </span></li>';
				});
				var deep = 0;
				$('.tanceng .zxdrw_renyuan_syfl_numxxl').html('所有分类('+data.sum_num+')')
				$('.rwzj_tree_xxl').html(tree_list_person(datalists, deep)+list_html);
				$.each($('li.left_1'), function(i,v){
					if($('li.left_1').eq(i).next('ul').children().length ==0){
						$('li.left_1').eq(i).find('span.icon_open').addClass('personOth')
					}
				})
			}
		},
		error:function(data){
			
		}
	});
    }
	
//列表
var work_22_lisk_data = {
	token: token,
	page: 1,
	limit: 10,
	time:'adddt',
	uid:uid
}

function work_list_22a() {
	$.ajax({
		type: 'post',
		url: SERVER_URL + "task/execute",
		data: work_22_lisk_data,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg);
				$("#22_list").html("");
					var erra = '';
					erra += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
					$('#errhtmla').html(erra)
					$('.work_xxlb').css('display', 'none')
			} else {
				console.log(data)
				var work_list_22 = data["rows"];
				if(work_list_22.length==0) {
					$("#22_list").html("");
					var erra = '';
					erra += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
					$('#errhtmla').html(erra)
					$('.work_xxlb').css('display', 'none')
				} else {
					$('#errhtmla').html('');
					$('.work_xxlb').css('display', 'block')
					//          $("#22_page_number").val(work_page_22);
					//          $("#22_listlength").html(data["totalCount"]);
					w_p_n22 = Math.ceil(data["totalCount"] / work_limit_22);
					var xxl_22 = '';
					var today=new Date();//获取当前时间(没有格式化)  
					var year=today.getFullYear();//获取年份,四位数  
					var month=today.getMonth()+1;//获取月份,0-11  
					var day=today.getDate();//获取几号  
					if(month<=9){//格式化  
					    month="0"+month;  
					}  
					if(day<=9){  
					    day="0"+day;  
					}  
					today=year+"-"+month+"-"+day;
					for(var i in work_list_22) {
						//var end=new Date(work_list_22[i]["enddate"].replace("-", "/").replace("-", "/")); 
						xxl_22 += '<tr><td><span>' + likNullData(work_list_22[i].title) + '</span></td>';
						if(work_list_22[i]["enddate"]<today){
							xxl_22 +='<td class="c_r">' + likNullData(work_list_22[i].enddate) + '</td>';
						}else if(work_list_22[i]["enddate"]==today){
							xxl_22 +='<td class="c_y">' + likNullData(work_list_22[i].enddate) + '</td>';
						}else{
							xxl_22 +='<td>' + likNullData(work_list_22[i].enddate) + '</td>';
						}
						
						xxl_22 +='<td>' + likNullData(work_list_22[i].uname) + '</td><td>' + likNullData(work_list_22[i].member_name) + '</td><td><span class="zhuangtai">' + likNullData(work_list_22[i].status_name) + '</span></td><td><button class="but_mix but_look r_sidebar_btn but_look zxderw_ckbtn_xxl" name="work_zxrw_table" zid="' + work_list_22[i].id + '">查看</button></td></tr>';
					};
					$('#22_list').html(xxl_22)
					list_table_render_pagination(".work_xxlb", work_22_lisk_data, work_list_22a, data["totalCount"], work_list_22.length)
					for(var i in work_list_22) {
						var status_name = work_list_22[i]["status_name"];
						if(status_name == "进行中") {
							$("#22_list tr").eq(i).find("span.zhuangtai").addClass("c_y");
						} else {
							if(status_name == "未完成") {
								$("#22_list tr").eq(i).find("span.zhuangtai").addClass("c_r");
							} else {
								$("#22_list tr").eq(i).find("span.zhuangtai").addClass("c_g");
							}
						}
					}
					$('.but_look').die().live('click', function() {
						var work_id = $(this).attr('zid');
						//console.log(work_id)
						//work_details_22(work_id) //调用查看详情函数
					})

				}
			}

		},
		error: function(e) {
			//console.log(e);
			var erra = '';
			erra += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
			$('#errhtmla').html(erra)
			$('.work_xxlb').css('display', 'none')
		}
	});
}
//我发起的任务
work_list_22a();
//点击刷新
$('.wk_zxdrw_djsx_btnxxl').die().live('click',function(){
	add_Rload_index(22,3)//参数页面值，父级值
})
//$("#work_22_page").click(function() {
//  $("#work_details_22").hide(500);
//});
////添加任务
//function add_pworksubmit_22() {
//  word_titl_22 = $("#add_22_work").val();
//
//  work_pid_22 = 0;
//  work_id = 0;
//  work_enddate_22 = $("#add_wdate_22").val();
//  work_fileurl_22 = "12";
//  work_imgurl_22 = "32"
//  work_member_22 = $("#addwork_22_arryid").val();
//  if (word_titl_22 == "输入部门名称") {
//      word_titl_22 = "";
//  }
//  add_pwork_22(word_titl_22, work_id, work_pid_22, work_member_22, work_enddate_22, work_fileurl_22, work_imgurl_22);
//};
//
//function change_pworksubmit_22() {
//  word_titl_22 = $("#change_22_work").val();
//  work_pid_22 = 0;
//  work_id = $("#add_workid_22").val();
//  work_enddate_22 = $("#changewdate_22").val();
//  work_fileurl_22 = "12";
//  work_imgurl_22 = "32"
//  work_member_22 = $("#changework_22_arryid").val();
//  if (word_titl_22 == "输入部门名称") {
//      word_titl_22 = "";
//
//  }
//  add_pwork_22(word_titl_22, work_id, work_pid_22, work_member_22, work_enddate_22, work_fileurl_22, work_imgurl_22);
//};
//添加子任务
$('.zxrw_tjzrw_xxl').die().live('click',function(){
	$('.tanceng .tjzru1').attr('uid',$(this).attr('uid'));
	$('.tanceng .addtimes').attr('max',$(this).attr('enddate'));
	$('.tanceng .zxrw_xzfzr_btnxxl').attr('uid',$(this).attr('uid'));
})
$('.tanceng .zxrw_xzfzr_btnxxl').die().live('click',function(){
	var id = $(this).attr('uid');
	$.ajax({
		type:"post",
		url:SERVER_URL+"task/get-task-member",
		data:{id:id,token:token},
		dataType:'json',
		success:function(data){
			if(data.code!=0){
				console.log(data)
			}else{
				console.log(data);
				var s_list = data['data'],s_html = '';
				$.each(s_list, function(i,v) {
					s_html +='<li uid="'+v.uid+'"><span>'+v.name+'</span><i class="list_choose_select"> </i></li>';
				});
				$('.fqidrw_rwcylist_xxl').html(s_html)
			}
		},
		error:function(e){
			console.log(e)
		}
	});
})
$('.tanceng .fqidrw_rwcylist_xxl>li').die().live('click',function(){
	$('.tanceng .fbrenwu_qunding_fzr_btnxxl').attr({'uid':$(this).attr('uid'),'name':$(this).children('span').html()});
	
})
$('.tanceng .fbrenwu_qunding_fzr_btnxxl').die().live('click',function(){
	$('.tanceng .addfzr').val($(this).attr('name')).attr('uid',$(this).attr('uid'))
})
var tj_zrw_data = {
	token:token,
	title:'',
	pid:'',
	person:'',
	enddate:''
}
$('.tanceng .tjzru1').die().live('click', function() {
	if($('.tanceng .txt_normal').val()==''||$('.tanceng .txt_normal').val()=='请输入备注'){
		alert('请输入备注')
		return false;
	} 
	if($('.tanceng .addtimes').val()==''||$('.tanceng .addtimes').val()=='请选择日期...'){
		alert('请选择日期...')
		return false;
	}
	if(typeof($('.tanceng .addfzr').attr('uid')) == "undefined"){
		alert('请选择负责人');
		return false;
	}
	tj_zrw_data.title = $('.tanceng .txt_normal').val();
	tj_zrw_data.pid = $(this).attr('uid');
	tj_zrw_data.person = $('.tanceng .addfzr').attr('uid');
	tj_zrw_data.enddate = $('.tanceng .addtimes').val();
	add_pwork_22()
	$(this).parent().parent().parent().remove();
				var num = $('.tanceng').children(".dialog_box").length;
				if(num < 1) {
					$(".tanceng").hide();
				};
})

function add_pwork_22() {
	$.ajax({
		type: 'post',
		url: SERVER_URL + "task/save",
		data: tj_zrw_data,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg)
			} else {
				console.log(data)
					//$('#tjzru1').parent().parent().parent().parent().remove();
				work_details_22()
				
			}
		},
		error: function(e) {
			console.log(e)
		}
	});
}
//添加评论
$('#fspls').die().live('click', function() {
	if($(".zxrw_plval_xxl").val()==''||$(".zxrw_plval_xxl").val()=='写评论'){
		return false;
	}
	var content = $(".zxrw_plval_xxl").val();
	var work_id = $('.wcrwdid').attr('pid');
	$.ajax({
		type: 'post',
		url: SERVER_URL + "task/commit",
		data: {
			token: token,
			"content": content,
			"id": work_id
		},
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg)
			} else {
				work_details_22(work_id)
			}
		}
	});
	$(this).prev().val('');
})

//删除评论
$('.work_but_sc').die().live('click', function() {
	var id = $(this).attr('cid');
	var work_id = $('.wcrwdid').attr('pid');
	$.ajax({
		type: 'get',
		url: SERVER_URL + "task/del",
		data: {
			token: token,
			"id": id
		},
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg)
			} else {
				console.log(data);
				work_details_22(work_id)
			}
		},
		error: function(e) {
			console.log(e)
		}
	});
})

//完成任务
var wpid = '';
$('.wcrwdid').die().live('click', function() {
	wpid = $(this).attr('pid');
	$('#wcruwd').attr('uid',$(this).attr('pid'))
})
$('#wcruwd').die().live('click', function() {
	var wpid = $(this).attr('uid');
	$.ajax({
		type: 'get',
		url: SERVER_URL+"task/finish",
		data: {
			token: token,
			"id": wpid
		},
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg);
				alert('操作失败,请稍后重试')
			} else {
				console.log(data)
				alert('操作成功')
				//$('.work_wcrw_img').css('display','block');
				work_details_22();
				work_list_22a();
			}
		},
		error: function(e) {
			alert('操作失败,请稍后重试')
			console.log(e)
		}
	});
})

//完成子任务
var wczruids = '';
$('.but_wcrw').die().live('click', function() {
	wczruids = $(this).attr('subid')
})
$('#wczrus').die().live('click', function() {

		var work_id = $('.wcrwdid').attr('pid');
		//console.log(wczruids)
		$.ajax({
			type: 'get',
			url: SERVER_URL + "task/finish",
			data: {
				token: token,
				"id": wczruids
			},
			dataType: 'json',
			success: function(data) {
				if(data.code != 0) {
					console.log(data.msg)
				} else {
					work_details_22(work_id)
				}
			}
		});
	})
$('.right_sidebar .rwzj_pid').die().live('click',function(){
	$('.tanceng .rwzjs').attr('pid',$(this).attr('pid'));
	zxrw_rey_ajax()
})
	//任务转交
$('.tanceng .rwzjs').die().live('click', function() {
	var work_id = $(this).attr('pid');
	var member = $('.tanceng .rwzj_tree_xxl li.on').attr('userinfoid');
	$.ajax({
		type: 'get',
		url: SERVER_URL + "task/move",
		data: {
			token: token,
			"task_id": work_id,
			'member': member
		},
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg);
				alert('转交任务失败,请稍后操作')
			} else {
				console.log(data);
				alert('转交任务成功');
				work_details_22(work_id)
			}
		}
	});
	$(this).parent().parent().parent().remove();
				var num = $('.tanceng').children(".dialog_box").length;
				if(num < 1) {
					$(".tanceng").hide();
				};
})

//删除子任务
var sczrw_data = {
	token:token,
	id:''
}
$('.but_scrw').die().live('click', function() {
	sczrw_data.id = $(this).attr('subid');

})
$('#sczrus').die().live('click', function() {
		var work_id = $('.wcrwdid').attr('pid');
		$.ajax({
			type: 'get',
			url: SERVER_URL + "task/deltask",
			data:sczrw_data,
			dataType: 'json',
			success: function(data) {
				if(data.code != 0) {
					console.log(data.msg)
				} else {
					console.log(data);
					alert('删除子任务')
					work_details_22(work_id)
				}
			}
		});
	})
	//查看详情
	var zxrw_ck_data = {
		token:token,
		id:'',
		uid:uid
	}
	$('.zxderw_ckbtn_xxl').die().live('click',function(){
		zxrw_ck_data.id = $(this).attr('zid');
		work_details_22();
	})
function work_details_22() {
	//console.log(work_id)
	$.ajax({
		type: 'get',
		url: SERVER_URL + "task/show",
		data:zxrw_ck_data,
		dataType: 'json',
		success: function(data) {
			console.log(data)
				// var work_detaile, work_detaile_commitlist, work_detaile_subtask;
			if(data.code != 0) {
				console.log(data.msg)
			} else {
				var work_detaile = data["data"];
				
				
				$('.zxrw_tx_img_xxl').attr('src',getImgUrl(work_detaile.face));
				$('.zxrw_workname_xxl').html(likNullData(work_detaile.uname));
				$('.adtime').html(likNullData(work_detaile.adddt));
				$('.zxrw_tit_xxl').html(likNullData(work_detaile.title));
				if(work_detaile.filename==''||work_detaile.filename==null){
					img_list ='';
				}else{
					var arr_img=work_detaile.filename.split(','),img_list='';
				//console.log(arr_img)
				$.each(arr_img, function(i,v) {
					//console.log(v)
					img_list +='<img class="inline_block val_dialog" name="work_zxrw_imglist" src="'+getImgUrl(v)+'">';
				});
				}
				$('.zxrw_wimg_xxl').html(img_list);
				//$('.wfilemz_xxl').html(likNullData(work_detaile.filepath));
				if(work_detaile.filepath==''||work_detaile.filepath==null){
					$('.zxrw_xiazai_btnxxl').attr('paths','')
					$('.zxrw_yulan_btnxxl').attr('href','#').parents('div.right_sidebar_cont3').hide();
					$('.wfilemz_xxl').html('没有附件');
				}else{
					$('.wfilemz_xxl').html(likNullData(work_detaile.filepath));
					$('.zxrw_xiazai_btnxxl').attr('paths',SERVER_URL+work_detaile.filepath)
					$('.zxrw_yulan_btnxxl').attr({'href':SERVER_URL+work_detaile.filepath,'target':'_blank'}).parents('div.right_sidebar_cont3').show();//{'href':SERVER_URL+work_data.filepath,'target':'_blank'}
				}
				
				$('.filesz_xxl').html(likNullData(work_detaile.filesize));
				$('.zxrw_fzr_xxl').html(likNullData(work_detaile.person_name));
				$('.zxrw_rwcy_xxl').html(likNullData(work_detaile.liable_person))
				$('.zxrw_jzrq_xxl').html(likNullData(work_detaile.enddate));
				$(".zxrw_jzrq_xxl").fnTimeCountDown(work_detaile.enddate);
				$('.wcrwdid').attr('pid', work_detaile.id);
				$('.right_sidebar .rwzj_pid').attr('pid', work_detaile.id);
				
				var work_subtask = data.subtask;
				var suba = '';
				var subb = '';
				$('.xxlywc').html('');
				$('.xxl_wwc').html('')
				for(var i = 0; i < work_subtask.length; i++) {
					if(work_subtask[i].status_name == "已完成") {
						suba += '<div class="rsc4_cont"><div class="work_fqrw_tjzrw"><div class="rsc4_contbox" style="border-bottom: 1px solid #EBEBEB;"><img class="inline_block tx" src="'+ getImgUrl(work_subtask[i].face) + '" style="width: 44px;height: 44px;border-radius:50%"><div class="right_txsm inline_block"><span style="color: #EBEBEB;">' + likNullData(work_subtask[i].uname) + '</span></br><span style="color: #EBEBEB;">于' + likNullData(work_subtask[i].adddt) + '发起子任务</span></div></div><div class="work_but_rw" style="margin-top: -62px;"><button class="but_wcrw but_wcrwhui but_wcrw_wc" disabled="disabled">已完成</button><button class="but_wcrw but_wcrwhui but_wcrw_wc" disabled="disabled">删除任务</button></div><h3 class="block work_h3" style="color: #EBEBEB;">' + likNullData(work_subtask[i].title) + '</h3><div class="rsc4_contbox work_fzr work_fzrhui"><p>负责人：<span class="m_left_5 m_bottom_5">' + likNullData(work_subtask[i].person_name) + '</span></p><p>截止日期：<span class="m_left_5">' + work_subtask[i].enddate + '</span></p></div></div></div>';
						$('.xxlywc').html(suba);
					} else {
						
						subb += '<div class="rsc4_cont" style="border-bottom: 7px solid #F7F7F7;"><div class="work_fqrw_tjzrw"><div class="rsc4_contbox" style="border-bottom: 1px solid #EBEBEB;"><img class="inline_block tx" src="' + getImgUrl(work_subtask[i].face) + '" style="width: 44px;height: 44px;border-radius:50%"><div class="right_txsm inline_block"><span class="c_3">' + likNullData(work_subtask[i].uname) + '</span></br><span style="color: #CCCCCC;">于' + likNullData(work_subtask[i].adddt) + '发起子任务</span></div></div><div class="work_but_rw" style="margin-top: -62px;">';
						if(work_subtask[i].person==uid){
							subb +='<button class="but_lv but_wcrw val_dialogTop zxrw_wczrew_btn_xxl" name="work_zxdrw_wczrw" subid="' + work_subtask[i].id + '">完成子任务</button><button class="but_r but_delete but_scrw val_dialogTop zxrw_sczrw_btnxxl" name="work_zxdrw_sczrw" subid="' + work_subtask[i].id + '" disabled="disabled">删除子任务</button>';
						}else{
							subb +='<button class="but_lv but_wcrw val_dialogTop zxrw_wczrew_btn_xxl" name="work_zxdrw_wczrw" subid="' + work_subtask[i].id + '" disabled="disabled">完成子任务</button><button class="but_r but_delete but_scrw val_dialogTop zxrw_sczrw_btnxxl" name="work_zxdrw_sczrw" subid="' + work_subtask[i].id + '" disabled="disabled">删除子任务</button>';
						}
						
						subb +='</div><h3 class="block work_h3">' + likNullData(work_subtask[i].title) + '</h3><div class="rsc4_contbox work_fzr"><p>负责人：<span class="m_left_5 m_bottom_5">' + likNullData(work_subtask[i].person_name) + '</span></p><p>截止日期：<span class="m_left_5">' + likNullData(work_subtask[i].enddate) + '</span></p></div></div></div>';
						$('.xxl_wwc').html(subb)
					}

				};
				var wdcomlist = data["commitlist"];
				var pins = '';
				for(var i = 0; i < wdcomlist.length; i++) {
					if(uid==wdcomlist[i].uid){
						pins += '<div class="work_rsp_item rsp_item" zid="' + wdcomlist[i].task_id + '"><div class="work_rsp_text rsp_text"><img class="tx zxrw_pl_img_xxl" src="' + getImgUrl(wdcomlist[i].face) + '" style="margin-top: 4px;"><div class="work_wfqd_pl"><p><span class="c_3 m_right_10">' + likNullData(wdcomlist[i].name) + '</span>' + likNullData(wdcomlist[i].date) + '</p><h3 class="inline_block m_right_20" style="margin-top: 6px;">' + likNullData(wdcomlist[i].content) + '</h3></div><button class="but_normal right c_r work_but_sc" style="margin-top: 27px;margin-right: -30px;" cid="' + wdcomlist[i].id + '">删除</button></div><div class="work_hr"></div></div>';
					}else{
						pins += '<div class="work_rsp_item rsp_item" zid="' + wdcomlist[i].task_id + '"><div class="work_rsp_text rsp_text"><img class="tx zxrw_pl_img_xxl" src="' + getImgUrl(wdcomlist[i].face) + '" style="margin-top: 4px;"><div class="work_wfqd_pl"><p><span class="c_3 m_right_10">' + likNullData(wdcomlist[i].name) + '</span>' + likNullData(wdcomlist[i].date) + '</p><h3 class="inline_block m_right_20" style="margin-top: 6px;">' + likNullData(wdcomlist[i].content) + '</h3></div><button class="but_normal right c_c" style="margin-top: 27px;margin-right: -30px;" cid="' + wdcomlist[i].id + '">删除</button></div><div class="work_hr"></div></div>';
					}
					
				}
				$('.work_rsp_cont').html(pins);
				$('.zxderw_pl_mainlength_xxl').html('('+wdcomlist.length+')');
				$(".tx").error(function(e) { //加入相应的图片类名
				$(this).attr("src", "static/images/touxiang.png");
				});
			$(".zxrw_tx_img_xxl").error(function(e) { //加入相应的图片类名
				$(this).attr("src", "static/images/touxiang.png");
			});
			$(".zxrw_wimg_xxl>img").error(function(e) { //加入相应的图片类名
				$(this).attr("src", "static/images/error_xxl.png");
			});
			$(".zxrw_pl_img_xxl").error(function(e) { //加入相应的图片类名
				$(this).attr("src", "static/images/touxiang.png");
			});
			
			if(work_detaile.status==1){
					//console.log(1)
					$('.work_wcrw_img').css('display','block');
					$('.zxrw_tjzrw_xxl').removeClass('val_dialogTop').addClass('c_c');
					$('.wcrwdid[name="work_zxdrw_wcrw"]').attr('disabled','disabled').removeClass('but_lv but_small').css('padding','5px 15px').addClass('but_grey1');
					$('.rwzj_pid').attr('disabled','disabled').removeClass('but_look but_small').css('padding','5px 15px').addClass('but_grey1');
					$('#fspls').attr('disabled','disabled').addClass('but_grey1').removeClass('but_blue').prev('input').attr('disabled','disabled').css('color','#ccc');
				}else{
					$('.work_wcrw_img').css('display','none');
					//$('.zxrw_tjzrw_xxl').addClass('val_dialogTop').attr({'uid':work_detaile.id,'pid':work_detaile.pid});
					//$('.rwzj_pid').removeAttr('disabled');
					//$('.wcrwdid').removeAttr('disabled');
					$('#fspls').removeAttr('disabled').addClass('but_blue').removeClass('but_grey1').prev().removeAttr('disabled');
					if(work_detaile.person==uid||work_detaile.uid==uid){
						if(data.subtask.length==0){
							$('.wcrwdid[name="work_zxdrw_wcrw"]').removeAttr('disabled').removeClass('but_grey1').addClass('but_lv but_small');
						}else{
							$.each(data.subtask, function(i,v) {
								if(v.status==1){
									$('.wcrwdid[name="work_zxdrw_wcrw"]').removeAttr('disabled').removeClass('but_grey1').addClass('but_lv but_small');
								}else{
									$('.wcrwdid[name="work_zxdrw_wcrw"]').attr('disabled','disabled').removeClass('but_lv but_small').css('padding','5px 15px').addClass('but_grey1');
								}
							});
						}
					$('.rwzj_pid').removeAttr('disabled').removeClass('but_grey1').addClass('but_look but_small');
					//$('.wcrwdid').removeAttr('disabled');
					$('.zxrw_sczrw_btnxxl').removeAttr('disabled');
					$('.zxrw_wczrew_btn_xxl').removeAttr('disabled');
				$('.zxrw_tjzrw_xxl').addClass('val_dialogTop').attr({'uid':work_detaile.id,'pid':work_detaile.pid,'enddate':work_detaile.enddate}).removeClass('c_c');
				}else{
					$('.zxrw_tjzrw_xxl').removeClass('val_dialogTop').addClass('c_c');
					$('.wcrwdid').attr('disabled','disabled').removeClass('but_lv but_small').css('padding','5px 15px').addClass('but_grey1');
					$('.rwzj_pid').attr('disabled','disabled').removeClass('but_look but_small').css('padding','5px 15px').addClass('but_grey1');;
					$('.zxrw_sczrw_btnxxl').attr('disabled','disabled');
					$('.zxrw_wczrew_btn_xxl').attr('disabled','disabled');
				}
				}
			
			
			
			}
		},
		error: function(e) {
			console.log(e);
		}
	});
}
$('.zxrw_wimg_xxl>img').die().live('click',function(){
	$('.tanceng .zxrw_imgbig_ckxxl').attr('src',$(this).attr('src'));
})
//下载
$('.zxrw_xiazai_btnxxl').die().live('click',function(){
	if($(this).attr('paths')==''){
		alert('还没有附件哦')
		return false;
	}else{
		downloadFile($(this).attr('paths'));
	}
	
})
//预览
//$('.zxrw_yulan_btnxxl').media({width:800, height:600});
$.extend($.fn, {
	fnTimeCountDown: function(d) {
		this.each(function() {
			var $this = $(this);
			var f = {
				haomiao: function(n) {
					if(n < 10) return "00" + n.toString();
					if(n < 100) return "0" + n.toString();
					return n.toString();
				},
				zero: function(n) {
					var _n = parseInt(n, 10); //解析字符串,返回整数
					if(_n > 0) {
						if(_n <= 9) {
							_n = "0" + _n
						}
						return String(_n);
					} else {
						return "00";
					}
				},
				dv: function() {
					//d = d || Date.UTC(2050, 0, 1); //如果未定义时间，则我们设定倒计时日期是2050年1月1日
					var _d = $this.data("end") || d;
					var now = new Date(),
						endDate = new Date(_d);
					//现在将来秒差值
					//alert(future.getTimezoneOffset());
					var dur = (endDate - now.getTime()) / 1000,
						mss = endDate - now.getTime(),
						pms = {
							hm: "000",
							sec: "00",
							mini: "00",
							hour: "00",
							day: "00",
							month: "00",
							year: "0"
						};
					if(mss > 0) {
						pms.hm = f.haomiao(mss % 1000);
						pms.sec = f.zero(dur % 60);
						pms.mini = Math.floor((dur / 60)) > 0 ? f.zero(Math.floor((dur / 60)) % 60) : "00";
						pms.hour = Math.floor((dur / 3600)) > 0 ? f.zero(Math.floor((dur / 3600)) % 24) : "00";
						pms.day = Math.floor((dur / 86400)) > 0 ? f.zero(Math.floor((dur / 86400)) % 30) : "00";
						//月份，以实际平均每月秒数计算
						pms.month = Math.floor((dur / 2629744)) > 0 ? f.zero(Math.floor((dur / 2629744)) % 12) : "00";
						//年份，按按回归年365天5时48分46秒算
						pms.year = Math.floor((dur / 31556926)) > 0 ? Math.floor((dur / 31556926)) : "0";
					} else {
						pms.year = pms.month = pms.day = pms.hour = pms.mini = pms.sec = "00";
						pms.hm = "000";
						//alert('结束了');
						$('.wfzt').addClass('c_r');
						//$('.zxrw_tjzrw_xxl').removeClass('val_dialogTop');
						return;
					}
					return pms;
				},
				ui: function() {
					f.dv();
					setTimeout(f.ui, 1);
				}
			};
			f.ui();
		});
	}
});