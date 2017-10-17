//工作 
// 默认测试账号 15900000001	tekon:2016121416190312079
//发起的任务 ID：21
$(function(){
	
console.log(loginUserInfo)
var token, pid, key, page, limit, work_id,uid;
var DATE_FORMAT = /^[0-9]{4}-[0-1]?[0-9]{1}-[0-3]?[0-9]{1}$/; //日期
token = Admin.get_token();
uid = Admin.get_uid();
var loginUserInfo = JSON.parse(localStorage.getItem('user_info'));
bossid = loginUserInfo.company_admin;
//console.log(uid)
//token='2017052516045457073-1-1';
//SERVER_URL = 'http://192.168.0.167:9010/';
//uid=1;

//SERVER_URL = 'http://192.168.0.167:9091/';
//console.log(token)
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
//function reyuan_ajax(){
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
				console.log(data);
				var lists = data['list'],list_html='',touburenyuan='';
				$.each(lists, function(i,v) {
					list_html +='<ul><li class="left_2 person_left_nav li_person" userinfoid="' + v.id + '"><i class="list_before_span"></i><span class="list_msg">' + v.name + ' </span><span class="list_check"><em></em></span></li></ul>';
				});
				//console.log(list_html)
				var touburenyuan = '<li class="left_all"><span class="icon_open change_ba"></span><span class="icon_file"></span><span class="list_msg">所有分类('+data.sum_num+')</span><span class="list_check"><em></em></span></li>';
				var aaa = tree_list_choose_dept_person(data.rows, 0)
				$('.tanceng .fqrw_list_xxl').html(touburenyuan +aaa+ list_html)

			}
		},
		error: function(data) {

		}
	});
//}
//reyuan_ajax()
//正比例缩放图片
function setImg(img, width, height) {
			var scale_w = img.width / width;
			var scale_h = img.height / height;
			var scale = scale_w > scale_h ? scale_w : scale_h;
			img.width = img.width / scale;
			return false;
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
				console.log(data);
				var lists = data['list'],list_html='',touburenyuan='';
				$.each(lists, function(i,v) {
					list_html +='<ul><li class="left_2 person_left_nav li_person" userinfoid="' + v.id + '"><i class="list_before_span"></i><span class="list_msg">' + v.name + ' </span><span class="list_check"><em></em></span></li></ul>';
				});
				var touburenyuan = '<li class="left_all"><span class="icon_open change_ba"></span><span class="icon_file"></span><span class="list_msg">所有分类('+data.sum_num+')</span><span class="list_check"><em></em></span></li>';
				var aaa = tree_list_choose_dept_person(data.rows,0)
				$('.fqrw_list_xxl').html(touburenyuan +aaa +list_html)

			}
		},
		error: function(data) {
			$('.fqrw_list_xxl').html('对不起,网络原因:请重新获取')
		}
	});
})

$('.fqrw_list_xxl .person_left_nav').die().live('click', function() {
	$(this).toggle(function() {
		$('.renwulist_xxl').append('<li rid="' + $(this).attr('userinfoid') + '"><span>' + $(this).children('.list_msg').html() + '</span><i class="list_choose_delete"></i></li>')
		$(this).find('.list_check em').addClass('on')
	}, function() {
		$('.renwulist_xxl').find('li[rid=' + $(this).attr('userinfoid') + ']').remove();
		$(this).find('.list_check em').removeClass('on')
	})
	$(this).trigger('click')
		//console.log($(this).attr('aid'))
		//console.log($(this).children('.list_msg').html())

})
$('.list_choose_delete').die().live('click', function() {
	$(this).parent().remove();
	$('.tanceng .fqrw_list_xxl').children().find('.person_left_nav[userinfoid="'+$(this).parent('li').attr('rid')+'"]').children('.list_check').children('em').removeClass('on');
})
$('.tanceng .fbrw_qued').die('click').live('click', function() {
		if($('.tanceng .renwulist_xxl').html()=='') {
			alert('请选择人员')
			return
		} else {
			//alert($('.tanceng .renwulist_xxl li').length)
			var rens = '',renlist='',
				rids = [];
			$.each($('.tanceng .renwulist_xxl li'), function(i, v) {
				//console.log($(this).children('span').html())
				rens +=$(this).children('span').html()+'';
				renlist +=' <li uid="'+$(this).attr('rid')+'"><span>'+$(this).children('span').html()+'</span><i class="list_choose_select"></i></li>';
				rids.push($(this).attr('rid'));
			})
			$('.fqidrw_rwcylist_xxl').html(renlist)//<li><span>张三</span><i class="list_choose_select"> </i></li>
			$('.tanceng .save_memsss').val(rens)
			$('.tanceng .save_memsss').attr('rid', rids)
			$('.tanceng .w_s_mems').val(rens)
			$('.tanceng .w_s_mems').attr('rid', rids) //
			$('.tanceng .sunfzr').val(rens)
			$('.tanceng .sunfzr').attr('rid', rids) //sunfzr
			$('.tanceng .fbrw_xzfzr_btnxxl').addClass('val_dialogTop').attr('typeid',1);
		}
		$('.renwulist_xxl').html('')
		$(this).parent().parent().parent().remove();
		var num = $('.tanceng').children(".dialog_box").length;
		if(num < 1) {
			$(".tanceng").hide();
		};
	})
	//	$('.w_s_mems')
	$('.tanceng .fbrw_xzfzr_btnxxl').die().live('click',function(){
		if($(this).attr('typeid')==0){
			$('.tanceng .fbrenwu_qunding_fzr_btnxxl').attr('typeid','1')
			var arr = JSON.parse($(this).attr('rylist')),s_html='';
		$.each(arr, function(i,v) {
					s_html +='<li uid="'+v.uid+'"><span>'+v.name+'</span><i class="list_choose_select"> </i></li>';
				});
		$('.tanceng .fqidrw_rwcylist_xxl').html(s_html)
		}else{
			$('.tanceng .fbrenwu_qunding_fzr_btnxxl').attr('typeid','1')
		}
		$('.tanceng .fbrenwu_qunding_fzr_btnxxl').attr('typeid','1')
		
		
	})
	//列表
var work_list_21_data = {
	token: token,
	page: 1,
	limit: 10,
	key: '',
	time:'adddt'
}

function work_list_21() {
	$.ajax({
		type: 'post',
		url: SERVER_URL + "task/mylist",
		data: work_list_21_data,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg);
				$("#21_list").html("");
					var errhtml = '';
					errhtml += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
					$('#fqdrw_errhtml').html(errhtml);
					$('.xxl_fenyea').css('display', 'none')
			} else {
				console.log(data)
				var work_list = data["rows"];
				if(work_list.length == 0) {
					$("#21_list").html("");
					var errhtml = '';
					errhtml += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
					$('#fqdrw_errhtml').html(errhtml);
					$('.xxl_fenyea').css('display', 'none')
				} else {
					$('#fqdrw_errhtml').html('');
					$('.xxl_fenyea').css('display', 'block')
					var xxl_info = '';//
					//var sysDate = new Date();//获取系统时间  
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
					//console.log(today)
					for(var i in work_list) {
						//var end=new Date(work_list[i]["enddate"].replace("-", "/").replace("-", "/")); 
						//console.log(end)
						//var timeadd= new Date(end.getTime() + 1*24*60*60*1000)
						xxl_info += '<tr><input type="hidden" class="21_idlist" value="' + likNullData(work_list[i]["id"]) + '"><td>';
						xxl_info += '<span>' + likNullData(work_list[i]["title"]) + '</span></td>';
						if(work_list[i]["enddate"]<today){
							xxl_info += '<td class="faqirw_jiezhitime_red c_r">' + likNullData(work_list[i]["enddate"]) + '</td>';
						}
						else if(work_list[i]["enddate"]==today){
							xxl_info += '<td class="faqirw_jiezhitime_red c_y">' + likNullData(work_list[i]["enddate"]) + '</td>';
						}else{
							xxl_info += '<td class="faqirw_jiezhitime_red">' + likNullData(work_list[i]["enddate"]) + '</td>';
						}
						
						xxl_info += '<td>' + likNullData(work_list[i]["uname"]) + '</td>';
						xxl_info += '<td>' + likNullData(work_list[i]["liable_person"]) + '</td><td>';
						xxl_info += '<span class="word_21_liststate">' + likNullData(work_list[i]["status_name"]) + '</span></td><td><button class="but_mix but_look r_sidebar_btn but_look fqdrw_chakan_btnxxl" name="workfqrw_table" index="' + work_list[i]["id"] + '">查看</button><button class="but_mix but_r but_del val_dialog" name="work_fqdrw_sc" index="' + work_list[i]["id"] + '">删除</button></td></tr>';
						
					
					};
					 
					$("#21_list").html(xxl_info);
					//console.log(data.totalCount, work_list.length)
					list_table_render_pagination('.xxl_fenyea', work_list_21_data, work_list_21, data.totalCount, work_list.length);
//					$('.r_sidebar_btn').live('click', function() {
//						work_id = $(this).attr('index');
//						work_task_show(work_id)
//					})

					for(var i in work_list) {
						var status_name = work_list[i]["status_name"];
						if(status_name == "进行中") {
							$("#21_list tr").eq(i).find('span.word_21_liststate').addClass("c_y");
						} else {
							if(status_name == "未完成") {
								$("#21_list tr").eq(i).find('span.word_21_liststate').addClass("c_r");
							} else {
								$("#21_list tr").eq(i).find('span.word_21_liststate').addClass("c_g");
							}
						}
					};
				}

			}
		},
		error: function(e) {
			console.log(e);
			$("#21_list").html('');
			var errhtml = '';
			errhtml += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
			$('#fqdrw_errhtml').html(errhtml);
			$('.xxl_fenyea').css('display', 'none')
		}
	});
}
work_list_21()
	//$("#work_21_page").click(function() {
	//	$("#work_details_21").hide(500);
	//});
//点击刷新
$('.wk_fqdrw_djsx_btnxxl').die().live('click',function(){
	add_Rload_index(21,3)//参数页面值，父级值
})

//选择任务成员
function tree_list_dialog(datalist, deep) {
	var html = '';
	$.each(datalist, function(index, data) {
		var html_i_list_before = '<i class="list_before_span"></i>';
		html += '<ul class="ul1">';
		for(var j = 0; j < deep; j++) {
			html_i_list_before += '<i class="list_before_span"></i>'
		}
		html += '<li class="left_1" cusSortId = "' + data["id"] + '">' + html_i_list_before + '<span class="icon_open change_ba"></span><span class="icon_file"></span><span class="list_msg">' + data['name'] + '</span></li>';
		if(data['children'] && data['children'].length > 0) {
			html += tree_list_dialog(data['children'], deep + 1);
		}
		html += '</li>';
		html += '</ul>'
	});
	return html
}

//添加任务
var fqrw_addrw_data = {
	token:token,
	title:'',
	enddate:'',
	filepath:'',
	filename:'',
	member:'',
	person:''

}
function fqrw_addrw_ajax(){
	$.ajax({
			type: "post",
			url: SERVER_URL + "task/save",
			data:fqrw_addrw_data,
			dataType: 'json',
			success: function(data) {
				console.log(data);
				work_list_21();
			},
			error: function(msg) {
				console.log(msg + '失败')
			}
		});
}
$('.tanceng .fqidrw_rwcylist_xxl>li').die().live('click',function(){
	$('.tanceng .fbrenwu_qunding_fzr_btnxxl').attr({'uid':$(this).attr('uid'),'name':$(this).children('span').html()});
	//console.log($(this).attr('uid'),$(this).children('span').html())
})
$('.tanceng .fbrenwu_qunding_fzr_btnxxl').die().live('click',function(){
	if($(this).attr('typeid')==1){
		$('.tanceng .fbrw_xzfzr_valxxl').val($(this).attr('name')).attr('uid',$(this).attr('uid'));
		$('.tanceng .fbrw_xzfzr_bjxxl').val($(this).attr('name')).attr('uid',$(this).attr('uid'));
	}else{
		$('.tanceng .sunfzr').val($(this).attr('name')).attr('uid',$(this).attr('uid'));
	}
	
})
$('#but_bluea').die('click').live('click', function() {
//		if($('#work_fb_field').val() == '' || $('#work_fb_field').val() == '请添加附件') {
//			$('#work_fb_field').val('')
//		}
		if($('#save_tit').val() == '' || $('#save_tit').val() == '请输入任务内容') {
			alert('请输入任务内容')
			return false;
		} 
		if($('#time_input1').val() == '' || $('#time_input1').val() == '请选择日期...') {
			alert('请选择日期...')
			return false;
		}
		if($('#save_mems').val() == '') {
			alert('请选择任务成员');
			$('.tanceng .fbrw_xzfzr_btnxxl').removeClass('val_dialogTop');
			return false;
		}else{
			$('.tanceng .fbrw_xzfzr_btnxxl').addClass('val_dialogTop');
		}
		if(typeof($('.tanceng .fbrw_xzfzr_valxxl').attr('uid')) == "undefined"){
			alert('请选择负责人');
			return false;
		}
		if($('.tanceng .attachfield_upload_area').html()==''){
			fqrw_addrw_data.filepath = '';
		}else{
			fqrw_addrw_data.filepath = $('.tanceng .attachfield_upload_area').children().children('.attachfield_filename').html();
		}
		//console.log(fqrw_addrw_data.filepath,$('.tanceng .attachfield_upload_area').children().children('.attachfield_filename').html())
		//var arr = [];
		if($('.tanceng .img_warp').children('li').length==0){
			fqrw_addrw_data.filename = '';
		}else{
			var arr = '';
			$.each($('.tanceng .img_warp').children('li'), function(i,v) {
				console.log($(this).children('img').attr('src'))
				arr +=$(this).children('img').attr('imgurl')+',';
			});
			arr = arr.slice(0, arr.length-1);
			fqrw_addrw_data.filename =arr;
		}

		fqrw_addrw_data.title = $('#save_tit').val();
		
		fqrw_addrw_data.enddate = $('#time_input1').val();
		fqrw_addrw_data.member = $('.save_memsss').attr('rid')
		
		fqrw_addrw_data.person = $('.tanceng .fbrw_xzfzr_valxxl').attr('uid');
		//console.log(save_tit + ':' + save_imgurl + ':data' + save_enddate + 'member:' + save_member + ':' + save_fileurl)
		fqrw_addrw_ajax()
		$(this).parent().parent().parent().remove();
		var num = $('.tanceng').children(".dialog_box").length;
		if(num < 1) {
			$(".tanceng").hide();
		};
	})
	//添加子任务负责人
 
//添加子任务
$('.tanceng .subwork').die().live('click', function() {

		if($('.tanceng .suntit').val() == '' || $('.tanceng .suntit').val() == '请输入备注') {
			alert('请输入内容')
			return false;
		} else if($('.tanceng .suntime').val() == '') {
			alert('请选择日期')
			return false;
		}
		if($('.tanceng .sunfzr').val() == ""){
		alert('请选择负责人');
		return false;
		}
		var id = $('#mainwc').attr('mid');
		var title = $('.tanceng .suntit').val();
		var person = $('.tanceng .sunfzr').attr('uid');
		var suntime = $('.tanceng .suntime').val();
		//console.log(title)
		$.ajax({
			type: "post",
			url: SERVER_URL + "task/save",
			data: {
				token: token,
				pid: id,
				title: title,
				person: person,
				enddate: suntime
			},
			dataType: 'json',
			success: function(data) {
				console.log(data)
				if(data.code != 0) {
					console.log(data.msg)
				} else {
					//$('#subwork').parent().parent().parent().parent().remove();

					work_task_show();

				}
			},
			error: function(e) {

			}
		});
		$(this).parent().parent().parent().remove();
		var num = $('.tanceng').children(".dialog_box").length;
		if(num < 1) {
			$(".tanceng").hide();
		};
	})
	//添加评论
	var fqrw_addpinlun_data = {
		token:token,
		content:'',
		id:''
	}
$('#pinlun').die().live('click', function() {
	fqrw_addpinlun_data.id = $('#mainwc').attr('mid');
	if($('.fqrw_pinlun_valxxl').val()==''||$('.fqrw_pinlun_valxxl').val()=='写评论'){
		return false;
	}
	fqrw_addpinlun_data.content = $('.fqrw_pinlun_valxxl').val();
	fqrw_addpinlun_ajax()
	//console.log(id, content)
	
})
function fqrw_addpinlun_ajax(){
	$.ajax({
		type: 'post',
		url: SERVER_URL + "task/commit",
		data:fqrw_addpinlun_data,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg)
			} else {
				console.log(data)
				work_task_show()
				$('.inp_96').val('')
			}
		},
		error:function(data){
			console.log(data)
		}
	});
}

//删除评论
$('.work_but_sc').die().live('click', function() {
	var id = $(this).attr('cid');
	var work_id = $('#mainwc').attr('mid');
	//console.log(id)
	$.ajax({
		type: 'get',
		url: SERVER_URL + "task/del",
		data: {
			token: token,
			"id": id
		},
		dataType: 'json',
		success: function(data) {
			//alert(data["msg"])
			if(data.code != 0) {
				console.log(data.msg)
			} else {
				console.log(data)
				work_task_show()
			}
		}
	});
})

//完成任务
$('#mainwc').die().live('click', function() {
	id = $(this).attr('mid');
	console.log(id)
	$.ajax({
		type: 'get',
		url: SERVER_URL + "task/finish",
		data: {
			token: token,
			"id": id
		},
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg)
				alert('操作失败,请稍后尝试')
			} else {
				console.log(data)
				alert('完成任务操作成功')
				$('.work_wcrw_img').css('display', 'block');
				work_task_show()
				work_list_21()
			}

		},
		error: function(e) {
			console.log(e)
		}
	});
})

//完成子任务	
$('#wczru').die().live('click', function() {
	sworkid = $('.but_wcrw').attr('subid');
	var work_id = $('#mainwc').attr('mid');
	//console.log(work_id)
	//console.log(work_id)
	//console.log(work_task_show(work_id))
	$.ajax({
		type: 'get',
		url: SERVER_URL + "task/finish",
		data: {
			token: token,
			"id": sworkid
		},
		dataType: 'json',
		success: function(data) {
			//console.log(data["msg"])
			if(data.code != 0) {
				console.log(data["msg"]);

			} else {
				console.log(data)
				work_task_show()
			}
		}
	});
})

//删除子任务
$('#sczru').die().live('click', function() {
	var subid = $('.but_scrw').attr('subid')
	var work_id = $('#mainwc').attr('mid');
	$.ajax({
		type: 'get',
		url: SERVER_URL + "task/deltask",
		data: {
			token: token,
			"id": subid
		},
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg)
			} else {
				console.log(data);
				work_task_show()
			}
		},
		error: function(e) {
			console.log(e)
		}
	});
})

//删除任务
var but_del_id = ''
$('.but_del').die().live('click', function() {
	but_del_id = $(this).attr('index');
})
$('#scdru').die().live('click', function() {
	$.ajax({
		type: 'get',
		url: SERVER_URL + "task/deltask",
		data: {
			token: token,
			"id": but_del_id
		},
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg)
			} else {
				console.log(data);
				work_list_21()
			}

		},
		error: function(e) {
			console.log(e)
		}
	});
})

//	work_id = $("#add_workid_21").val();
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
						$('.work_enddate').addClass('c_r');
						//$('.fqderw_cjzrw_btnxxl').removeClass('val_dialogTop');
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

//查看详情
var fqdrw_chakan_data = {
	token:token,
	id:'',
	uid:uid
}
$('.fqdrw_chakan_btnxxl').die().live('click',function(){
	$('.fqrw_pinlun_valxxl').val('')
	fqdrw_chakan_data.id = $(this).attr('index');
	work_task_show();
})
function work_task_show() {
	// console.log(work_id)
	$.ajax({
		type: 'get',
		url: SERVER_URL + "task/show",
		data:fqdrw_chakan_data ,
		dataType: 'json',
		success: function(data) {
			console.log(data)
			
			if(data.code == 0) {
				var work_data = data["data"],img_list='',rulist=[];
				$('.fqdrw_cktximg_xxl').attr('src',getImgUrl(work_data.face));
				//console.log(uid)
				$.each(work_data.face_array, function(i,v) {
					rulist.push({'name':v.name,'uid':v.uid})
				});
				$('#val_dialog_bj').attr('rylist',JSON.stringify(rulist))
				$('.work_uname').html(likNullData(work_data.uname));
				$('.work_addtime').html(likNullData(work_data.adddt));
				$('.work_titlea	').html(likNullData(work_data.title));
				if(work_data.filename==''||work_data.filename=='null'||work_data.filename==null){
					img_list ='';//<img class="inline_block val_dialog" name="work_imglist" src="static/images/error_xxl.png">
				}else{
					var arr_img=work_data.filename.split(','),img_list='';
				//console.log(arr_img)
				$.each(arr_img, function(i,v) {
					//console.log(v)
					img_list +='<img class="inline_block val_dialog" name="work_imglist" src="'+getImgUrl(v)+'">';
					//setImg(v,128,84)
				});
				}
				
				//<img class="inline_block val_dialog" id="val_dialog" name="work_imglist" src="static/images/task.png">
				$('.fqrw_ckimg_xxl').html(img_list);
				$('.work_filepath').html(likNullData(work_data.filepath));
				if(work_data.filepath==''||work_data.filepath==null){
					$('.fqrwck_xiazai_xxl').attr('paths','')
					$('.fqdrw_yulan_btnxxl').attr('href','').parents('div.right_sidebar_cont3').hide();
				}else{
					$('.fqrwck_xiazai_xxl').attr('paths',SERVER_URL+work_data.filepath);
					$('.fqdrw_yulan_btnxxl').attr({'href':SERVER_URL+work_data.filepath,'target':'_blank'}).parents('div.right_sidebar_cont3').show();
				}
				
				$('.work_filesize').html('(' + work_data.filesize + ')');
				$('.work_memnames').html(likNullData(work_data.person_name));
				$('.wk_fqdrw_rwcy_ckxxl').html(likNullData(work_data.liable_person));
				$('.work_enddate').html(likNullData(work_data.enddate));
				var work_subtask = data["subtask"];
				$('.but_small').attr('mid', work_data.id)
					//console.log(work_subtask)
				$(".work_enddate").fnTimeCountDown(work_data.enddate); //"2017/04/06 11:02:00"
				var subnuma = '';
				var subnumb = '';
				$('#subok').html('');
				$('#xxl').html('')
				for(var i = 0; i < work_subtask.length; i++) {
					if(work_subtask[i].face==''||work_subtask[i].face==null){
							work_subtask[i].face = "static/images/touxiang.png";
						}
					if(work_subtask[i].status_name == "已完成") {
						
						subnuma += '<div class="rsc4_cont"><div class="work_fqrw_tjzrw"><div class="rsc4_contbox" style="border-bottom: 1px solid #CCCCCC;"><img class="inline_block tx" src="' + getImgUrl(work_subtask[i].face) + '" style="width: 44px;height: 44px;border-radius:50%"><div class="right_txsm inline_block"><span style="color: #CCCCCC;">' + likNullData(work_subtask[i].uname) + '</span></br><span style="color: #CCCCCC;">于' + likNullData(work_subtask[i].adddt) + '发起子任务</span></div></div><div class="work_but_rw" style="margin-top: -62px;"><button class="but_wcrw but_wcrwhui but_wcrw_wc" disabled="disabled">已完成</button><button class="but_wcrw but_wcrwhui but_wcrw_wc" disabled="disabled">删除任务</button></div><h3 class="block work_h3" style="color: #CCCCCC;">' + likNullData(work_subtask[i].title) + '</h3><div class="rsc4_contbox work_fzr work_fzrhui"><p>负责人：<span class="m_left_5 m_bottom_5">' + likNullData(work_subtask[i].person_name) + '</span></p><p>截止日期：<span class="m_left_5">' + likNullData(work_subtask[i].enddate) + '</span></p></div></div></div>';
						$('#subok').html(subnuma);
					} else {
						subnumb += '<div class="rsc4_cont" style="border-bottom: 7px solid #F7F7F7;"><div class="work_fqrw_tjzrw"><div class="rsc4_contbox" style="border-bottom: 1px solid #EBEBEB;"><img class="inline_block tx" src="' + getImgUrl(work_subtask[i].face) + '" style="width: 44px;height: 44px;border-radius:50%"><div class="right_txsm inline_block"><span class="c_3">' + likNullData(work_subtask[i].uname) + '</span></br><span style="color: #CCCCCC;">于' + likNullData(work_subtask[i].adddt) + '发起子任务</span></div></div><div class="work_but_rw" style="margin-top: -62px;">';
						if(work_subtask[i].person==uid){
							subnumb +='<button class="but_lv but_wcrw val_dialogTop fqrw_wczrw_btnxxl" name="work_fqdrw_wczrw" subid="' + work_subtask[i].id + '">完成子任务</button><button class="but_r but_scrw val_dialogTop fqrw_sczrw_btnxxl" name="work_fqdrw_sczrw" subid="' + work_subtask[i].id + '" disabled="disabled">删除子任务</button>';
						}else{
							subnumb +='<button class="but_lv but_wcrw val_dialogTop fqrw_wczrw_btnxxl" name="work_fqdrw_wczrw" subid="' + work_subtask[i].id + '" disabled="disabled">完成子任务</button><button class="but_r but_scrw val_dialogTop fqrw_sczrw_btnxxl" name="work_fqdrw_sczrw" subid="' + work_subtask[i].id + '" disabled="disabled">删除子任务</button>';
						}
						
						subnumb +='</div><h3 class="block work_h3">' + likNullData(work_subtask[i].title) + '</h3><div class="rsc4_contbox work_fzr"><p>负责人：<span class="m_left_5 m_bottom_5">' + likNullData(work_subtask[i].person_name) + '</span></p><p>截止日期：<span class="m_left_5">' + likNullData(work_subtask[i].enddate) + '</span></p></div></div></div>';
						$('#xxl').html(subnumb)
					}
					
				};
				var work_pin = data.commitlist;
				var pin = '';
				for(var i = 0; i < work_pin.length; i++) {
					if(uid==work_pin[i].uid){
						pin += '<div class="work_rsp_item rsp_item" zid="' + work_pin[i].task_id + '"><div class="work_rsp_text rsp_text"><img class="tx" src="' + getImgUrl(work_pin[i].face) + '" style="margin-top: 4px;"><div class="work_wfqd_pl"><p><span class="c_3 m_right_10">' + likNullData(work_pin[i].name) + '</span>' + likNullData(work_pin[i].date) + '</p><h3 class="inline_block m_right_20" style="margin-top: 6px;">' + likNullData(work_pin[i].content) + '</h3></div><button class="but_normal right c_r work_but_sc" style="margin-top: 27px;margin-right: -30px;" cid="' + work_pin[i].id + '">删除</button></div><div class="work_hr"></div></div>';
					}else{
						pin += '<div class="work_rsp_item rsp_item" zid="' + work_pin[i].task_id + '"><div class="work_rsp_text rsp_text"><img class="tx" src="' + getImgUrl(work_pin[i].face) + '" style="margin-top: 4px;"><div class="work_wfqd_pl"><p><span class="c_3 m_right_10">' + likNullData(work_pin[i].name) + '</span>' + likNullData(work_pin[i].date) + '</p><h3 class="inline_block m_right_20" style="margin-top: 6px;">' + likNullData(work_pin[i].content) + '</h3></div><button class="but_normal right c_c" style="margin-top: 27px;margin-right: -30px;" cid="' + work_pin[i].id + '">删除</button></div><div class="work_hr"></div></div>';
					}
					
				}
				$('.work_rsp_cont').html(pin);
				$('.gz_fqgzpinlun_tiaosl_xxl').html('('+work_pin.length+')');
				
				if(work_data.status == 1) {
					$('.work_wcrw_img').css('display', 'block');
					$('.fqderw_cjzrw_btnxxl').removeClass('val_dialogTop').addClass('c_c');
					//$('.fqderw_cjzrw_btnxxl').attr('disabled','disabled');
					$('#val_dialog_bj').attr('disabled','disabled').addClass('but_grey1').removeClass('but_exit');
					$('#val_dialog_bj').next().attr('disabled','disabled').addClass('but_grey1').removeClass('but_lv');
					$('#pinlun').attr('disabled','disabled').addClass('but_grey1').removeClass('but_blue').prev('input').attr('disabled','disabled').css('color','#ccc');
				} else {
					$('.work_wcrw_img').css('display', 'none');
					$('#pinlun').removeAttr('disabled').addClass('but_blue').removeClass('but_grey1').prev('input').removeAttr('disabled');
					$('#val_dialog_bj').attr({'rymc':work_data.liable_person,'nid':work_data.member,'fzr':work_data.person_name,'fzrid':work_data.person,'content':work_data.title});
					if(work_data.person==uid||work_data.uid==uid||bossid==1){
						//console.log(1)
						$('.fqderw_cjzrw_btnxxl ').attr({'enddate':work_data.enddate,'uid':work_data.id}).addClass(' val_dialogTop').removeClass('c_c');
						//$('.fqderw_cjzrw_btnxxl ').addClass(' val_dialogTop')
						if(data.subtask.length==0){
							$('#val_dialog_bj').next().removeAttr('disabled').removeClass('but_grey1').addClass('but_lv');
						}else{
							$.each(data.subtask, function(i,v) {
								if(v.status==1){
									$('#val_dialog_bj').next().removeAttr('disabled').removeClass('but_grey1').addClass('but_lv');
								}else{
									$('#val_dialog_bj').next().attr('disabled','disabled').addClass('but_grey1').removeClass('but_lv');
								}
							});
						}
					$('#val_dialog_bj').removeAttr('disabled').removeClass('but_grey1').addClass('but_exit');
					$('#val_dialog_bj').attr({'rymc':work_data.liable_person,'nid':work_data.member,'fzr':work_data.person_name,'fzrid':work_data.person});
					$('.fqrw_sczrw_btnxxl').removeAttr('disabled');
					$('.fqrw_wczrw_btnxxl').removeAttr('disabled');
				}else{
					$('#val_dialog_bj').attr('disabled','disabled').addClass('but_grey1').removeClass('but_exit').next().attr('disabled','disabled').removeClass('but_lv').addClass('but_grey1');
					$('.fqrw_sczrw_btnxxl').attr('disabled','disabled');
					$('.fqrw_wczrw_btnxxl').attr('disabled','disabled');
					$('.fqderw_cjzrw_btnxxl').removeClass('val_dialogTop').addClass('c_c');
				}
				}
				
			} else {
				console.log('失败')
			}
			$(".fqrw_ckimg_xxl>img").error(function(e) { //加入相应的图片类名
				$(this).attr("src", "static/images/error_xxl.png");
			});
			$("#val_dialog").error(function(e) { //加入相应的图片类名
				$(this).attr("src", "static/images/error_xxl.png");
			});
			$(".fqdrw_cktximg_xxl,.tx").error(function(e) { //加入相应的图片类名
				$(this).attr("src", "static/images/touxiang.png");
			});
		},
		error: function(e) {
			console.log(e);
		}
	});
}
//tupiantanchuang
$('.fqrw_ckimg_xxl>img').die().live('click',function(){
	$('.tanceng .fqrw_tptc_imgsrc_xxl').attr('src',$(this).attr('src'));
})
$('.fqderw_cjzrw_btnxxl').die().live('click',function(){
	$('.tanceng .xzzrw_fzr_fqrwxxl').attr('uid',$(this).attr('uid'))
})
$('.tanceng .xzzrw_fzr_fqrwxxl').die().live('click',function(){
	$('.tanceng .fbrenwu_qunding_fzr_btnxxl').attr('typeid','2');
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
//下载
$('.fqrwck_xiazai_xxl').die().live('click',function(){
	if($(this).attr('paths')==''){
		alert('还没有附件哦')
		return false;
	}else{
		downloadFile($(this).attr('paths'));
	}
	
})
//预览
//$('a.fqdrw_yulan_btnxxl').media({width:800, height:600});
//图片弹窗
$('#val_dialog').die().live('click',function(){
	$('.tanceng .fqrw_tptc_imgsrc_xxl').attr('src',$(this).attr('src'));
	$(".tanceng .fqrw_tptc_imgsrc_xxl").error(function(e) { //加入相应的图片类名
				$(this).attr("src", "static/images/error_xxl.png");
			});
})
//编辑任务
//$('.tanceng .fbrw_qued').live('click',function(){
//	$('.tanceng .w_s_mems').val()
//})
//token:token,
//	title:'',
//	enddate:'',
//	filepath:'',
//	filename:'',
//	member:'',
//	person:''
$('.tanceng .work_saveb').die().live('click', function() {
	var imgsrc,id,title,enddate,member,filepath,person;
	if($('.work_save_tit').val() == '' || $('.work_save_tit').val() == '请输入任务内容') {
			alert('请输入任务内容')
			return false;
		} 
		title = $('.work_save_tit').val();
		if($('.work_enddatesave').val() == '' || $('.work_enddatesave').val() == '请选择日期...') {
			alert('请选择日期...')
			return false;
		}
		enddate = $('.work_enddatesave').val();
		if($('.w_s_mems').val() == '') {
			alert('请选择任务成员');
			$('.tanceng .fbrw_xzfzr_btnxxl').removeClass('val_dialogTop');
			return false;
		}else{
			$('.tanceng .fbrw_xzfzr_btnxxl').addClass('val_dialogTop');
		}
		member =$('.w_s_mems').attr('rid'); 
		if(typeof($('.tanceng .fbrw_xzfzr_bjxxl').attr('uid')) == "undefined"){
			alert('请选择负责人');
			return false;
		}
		person = $('.tanceng .fbrw_xzfzr_bjxxl').attr('uid');
		if($('.tanceng .attachfield_upload_area').html()==''){
			filepath = '';
		}else{
			filepath = $('.tanceng .attachfield_upload_area').children().children('.attachfield_filename').html();
		}
		//console.log(fqrw_addrw_data.filepath,$('.tanceng .attachfield_upload_area').children().children('.attachfield_filename').html())
		//var arr = [];
		if($('.tanceng .img_warp').children('li').length==0){
			imgsrc = '';
		}else{
			
			var arr = '';
			$.each($('.tanceng .img_warp').children('li'), function(i,v) {
				//console.log($(this).children('img').attr('src'))
				arr +=$(this).children('img').attr('src')+',';
			});
			arr = arr.slice(0, arr.length-1);
			
			 imgsrc =arr;
		}
		id = $(this).attr('mid');
//		fqrw_addrw_data.title = $('#save_tit').val();
//		
//		fqrw_addrw_data.enddate = $('#time_input1').val();
//		fqrw_addrw_data.member = $('.save_memsss').attr('rid')
//		
//		fqrw_addrw_data.person = $('.tanceng .fbrw_xzfzr_valxxl').attr('uid');
	
	
//	var imgsrc = $('.img_src').attr('src');
//	//console.log('imgsrc' + imgsrc)
//	var id = work_id;
//	var title = $('.work_save_tit').val()
//	var enddate = $('.work_enddatesave').val();
//	var member = $('.tanceng .w_s_mems').attr('rid');
//	var filepath = $('#w_s_f').html();
	//console.log(imgsrc)
	$.ajax({
		type: "post",
		url: SERVER_URL + "task/save",
		dataType: 'json',
		data: {
			'id': id,
			'title': title,
			'enddate': enddate,
			'member': member,
			'filename': imgsrc,
			'filepath': filepath,
			'person':person,
			token: token
			
		},
		success: function(data) {
			console.log(data);
			work_task_show();
			work_list_21();
		},
		error: function(msg) {
			console.log(msg + '失败')
		}
	});
	$(this).parent().parent().parent().remove();
	var num = $('.tanceng').children(".dialog_box").length;
	if(num < 1) {
		$(".tanceng").hide();
	};

})
$('.tanceng span[name="work_fqrw_xzrwcy"]').die().live('click',function(){
	if($(this).attr('typeid')==1){
		var arr = JSON.parse($(this).attr('rylist')),ryhtml='';
		$.each(arr, function(i,v) {
			ryhtml +='<li rid="' + v.uid + '"><span>' + v.name + '</span><i class="list_choose_delete"></i></li>'
		});
		$('.tanceng .renwulist_xxl').html(ryhtml)
	}else{
		$('.tanceng .renwulist_xxl').html('')
	}
})
$('#val_dialog_bj').die().live('click', function() {
	//console.log($(this).attr('rylist'))//
	$('.tanceng .work_save_tit').val($(this).attr('content')).addClass('c_3');
	$('.tanceng .fbrw_xzfzr_btnxxl').attr({'rylist':$(this).attr('rylist'),'typeid':0}).addClass('val_dialogTop')
	$('.tanceng span[name="work_fqrw_xzrwcy"]').attr({'rylist':$(this).attr('rylist'),'typeid':1})
	var imgsrc = ' ';
	$.each($('.fqrw_ckimg_xxl>img'), function(i,v) {
		imgsrc +='<li><input class="hide_input" type="file"/><img src="' + $(this).attr('src') + '" class="img_src" /><i class="del_img">-</i></li>';
	});
	//	//console.log('imgsrc' + imgsrc)
	//	var id = work_id;
	
	$('#addImg').html(imgsrc)
	
	$('.work_enddatesave').val($('.work_enddate').html());
	$('.w_s_mems').val($(this).attr('rymc')).attr('rid',$(this).attr('nid'));
	$('.tanceng .fbrw_xzfzr_bjxxl').val($(this).attr('fzr')).attr('uid',$(this).attr('fzrid'));
//	if($('.w_s_mems').val()!=''){
//		
//	}
	//$('#w_s_f').html($('.work_filepath').html());
	if($('.work_filepath').html()==''||$('.work_filepath').html()==' - '){
		return false;
	}else{
		var html_a = '<div class="attachfield_file_upload">\
			<div class="attachfield_upload_area">\
				<div class="attachfield_fieldset">\
					<div class="attachfield_filename">'+$('.work_filepath').html()+'</div>\
					<i class="work_list_delete"> </i>\
				</div>\
			</div>\
		</div>'
        $('.tanceng .attachfield_file_upload').before(html_a);
	}
	
        
})


//$.extend($.fn, {
//	fnTimeCountDown: function(d) {
//		this.each(function() {
//			var $this = $(this);
//			var f = {
//				haomiao: function(n) {
//					if(n < 10) return "00" + n.toString();
//					if(n < 100) return "0" + n.toString();
//					return n.toString();
//				},
//				zero: function(n) {
//					var _n = parseInt(n, 10); //解析字符串,返回整数
//					if(_n > 0) {
//						if(_n <= 9) {
//							_n = "0" + _n
//						}
//						return String(_n);
//					} else {
//						return "00";
//					}
//				},
//				dv: function() {
//					//d = d || Date.UTC(2050, 0, 1); //如果未定义时间，则我们设定倒计时日期是2050年1月1日
//					var _d = $this.data("end") || d;
//					var now = new Date(),
//						endDate = new Date(_d);
//					//现在将来秒差值
//					//alert(future.getTimezoneOffset());
//					var dur = (endDate - now.getTime()) / 1000,
//						mss = endDate - now.getTime(),
//						pms = {
//							hm: "000",
//							sec: "00",
//							mini: "00",
//							hour: "00",
//							day: "00",
//							month: "00",
//							year: "0"
//						};
//					if(mss > 0) {
//						pms.hm = f.haomiao(mss % 1000);
//						pms.sec = f.zero(dur % 60);
//						pms.mini = Math.floor((dur / 60)) > 0 ? f.zero(Math.floor((dur / 60)) % 60) : "00";
//						pms.hour = Math.floor((dur / 3600)) > 0 ? f.zero(Math.floor((dur / 3600)) % 24) : "00";
//						pms.day = Math.floor((dur / 86400)) > 0 ? f.zero(Math.floor((dur / 86400)) % 30) : "00";
//						//月份，以实际平均每月秒数计算
//						pms.month = Math.floor((dur / 2629744)) > 0 ? f.zero(Math.floor((dur / 2629744)) % 12) : "00";
//						//年份，按按回归年365天5时48分46秒算
//						pms.year = Math.floor((dur / 31556926)) > 0 ? Math.floor((dur / 31556926)) : "0";
//					} else {
//						pms.year = pms.month = pms.day = pms.hour = pms.mini = pms.sec = "00";
//						pms.hm = "000";
//						//alert('结束了');
//						
//						$(".faqirw_jiezhitime_red").addClass('c_r');
//						return;
//					}
//					return pms;
//				},
//				ui: function() {
//					f.dv();
//					setTimeout(f.ui, 1);
//				}
//			};
//			f.ui();
//		});
//	}
//});
//SERVER_URL = 'http://192.168.0.167:9010/';
    //var token = Admin.get_token();
  //var token = '2017052516045457073-1-1';
    //console.log(SERVER_URL, token);
//上传文件
function ajaxSubmita($el) {
    
    $el.upload({
        url: SERVER_URL + 'task/uploadattch',
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
//          $el.parent().before('<li><input class="hide_input" type="file" id="upimgFile_' + add_imgi + '"/><img class="img_src" id="imgShow_' + add_imgi + '"/><i class="del_img">-</i></li>');
//          $("#imgShow_" + add_imgi + "").attr("src", SERVER_URL + '/upload/commonImg/'+data.imgurl);
var html_a = '<div class="attachfield_file_upload">\
			<div class="attachfield_upload_area">\
				<div class="attachfield_fieldset">\
					<div class="attachfield_filename">'+data.fileurl+'</div>\
					<i class="work_list_delete"> </i>\
				</div>\
			</div>\
		</div>'
        $el.closest('.attachfield_file_upload').prev().html(html_a);
            console.log(data);
        },
        onProgress: function (e) {
            var per = Math.round(e.loaded * 100 / e.total);
            $('.complete').css('width', per + '%')
        }
    });
    $el.upload("ajaxSubmit");
}
$(".tanceng .attachfield_file_upload_btn").die().live("change", function () {
    ajaxSubmita($(this));
});


	//图片
//图片上传
    var add_imgi = 1;

//  function ajaxSubmit($el) {
//      var token = Admin.get_token();
//      //var token = '2017052516045457073-1-1';
//      console.log(SERVER_URL, token);
//      $el.upload({
//          url: SERVER_URL + '/task/uploadattch',
//          // 其他表单数据
//          params: {
//              token: token
//          },
//          // 上传完成后, 返回json, text
//          dataType: 'json',
//          onSend: function (obj, str) {
//              //console.log(obj, str);
//              return true;
//          },
//          // 上传之后回调
//          onComplate: function (data) {
//              $el.parent().before('<li><input class="hide_input" type="file" id="upimgFile_' + add_imgi + '"/><img class="img_src" id="imgShow_' + add_imgi + '"/><i class="del_img">-</i></li>');
//              $("#imgShow_" + add_imgi + "").attr("src", SERVER_URL + data.imgurl);
//              add_imgi++;
//              //console.log(data);
//          },
//          onProgress: function (e) {
//              var per = Math.round(e.loaded * 100 / e.total);
//              $('.complete').css('width', per + '%')
//          }
//      });
//      $el.upload("ajaxSubmit");
//  }
function ajaxSubmit($el) {
        var token = Admin.get_token();
        $el.upload({
            url: SERVER_URL + '/task/uploadattch',
            // 其他表单数据
            params: {
                token: token
            },
            // 上传完成后, 返回json, text
            dataType: 'json',
            onSend: function (obj, str) {
            	//console.log(obj+':::'+str)
              	 var extStart=str.lastIndexOf(".");
    				var ext=str.substring(extStart,str.length).toUpperCase();
    				console.log(ext)
				if(ext!=".BMP"&&ext!=".PNG"&&ext!=".GIF"&&ext!=".JPG"&&ext!=".JPEG"){
					alert("图片限于bmp,png,gif,jpeg,jpg格式");
					return false;
				}else{
  					return true;
  				}
  				
                
            },
            // 上传之后回调
            onComplate: function (data) {
                $el.parent().before('<li><input class="hide_input" type="file"/><img class="img_src" imgurl="' + data.imgurl + '" src="' + SERVER_URL + data.imgurl + '"/><i class="del_img">-</i></li>');
            },
            onProgress: function (e) {
                var per = Math.round(e.loaded * 100 / e.total);
                $('.complete').css('width', per + '%')
            }
        });
        $el.upload("ajaxSubmit");
    }

    $('.tanceng .addimg').die().live('change', function () {
        ajaxSubmit($(this));
    });

})