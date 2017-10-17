//工作 
// 默认测试账号 15900000001	
//发起的任务 ID：21

var token, uid,companyid,user_name,ranking,workdate,total_num;
token = Admin.get_token();
uid = Admin.get_uid();
//SERVER_URL="http://192.168.0.167:9091/";
companyid = window.localStorage.getItem('usercompany_id');
departmentid = window.localStorage.getItem('department_id');
//var loginUserInfo = JSON.parse(localStorage.getItem('user_info'));

//console.log(window.localStorage,window.localStorage.getItem('username'))
var loginUserInfo = JSON.parse(localStorage.getItem('user_info'));
    console.log(loginUserInfo);
user_name = loginUserInfo['username'];
ranking = loginUserInfo['ranking'];
workdate = loginUserInfo['workdate'];
total_num = loginUserInfo['total_num'];
//console.log(user_name,ranking,workdate,total_num)
var qingjia = 'work-leave/add',chuchai='work-business-travel/add',waichu='work-go-out/add',baoxiao='work-to-pay/add',lizhi='work-away/add',zhuanzheng='work-regular/add',tiaoxin='work-change-salary/add',bangongcaigou='work-purchase/add',wupinlingyong='work-goods/add',gongzhang='work-seal/add',hetong='work-contract/add',putongshenpi='work-general/add',jiekuan='work-borrow-money/add',zhaopin='work-job/add',fukuan='work-payment/add';
if(loginUserInfo['company_admin'] != 1){
	if(loginUserInfo.powerUrls.length==0){
	$('.val_dialog[name="work_fqsp_qj"]').hide();
	$('.val_dialog[name="work_fqsp_cc"]').hide();
	$('.val_dialog[name="work_fqsp_wc"]').hide();
	$('.val_dialog[name="work_fqsp_bx"]').hide();
	$('.val_dialog[name="work_fqsp_jk"]').hide();
	$('.val_dialog[name="work_fqsp_fk"]').hide();
	$('.val_dialog[name="work_fqsp_zp"]').hide();
	$('.val_dialog[name="work_fqsp_lz"]').hide();
	$('.val_dialog[name="work_fqsp_zz"]').hide();
	$('.val_dialog[name="work_fqsp_tx"]').hide();
	$('.val_dialog[name="work_fqsp_bgcg"]').hide();
	$('.val_dialog[name="work_fqsp_wply"]').hide();
	$('.val_dialog[name="work_fqsp_gz"]').hide();
	$('.val_dialog[name="work_fqsp_ht"]').hide();
	$('.val_dialog[name="work_fqsp_ptsp"]').hide();
}else{
	var arr = loginUserInfo.powerUrls;//
	if($.inArray(fukuan, arr)!=-1){
		$('.val_dialog[name="work_fqsp_fk"]').show();
	}else{
		$('.val_dialog[name="work_fqsp_fk"]').hide();
	}
	if($.inArray(zhaopin, arr)!=-1){
		$('.val_dialog[name="work_fqsp_zp"]').show();
	}else{
		$('.val_dialog[name="work_fqsp_zp"]').hide();
	}
	if($.inArray(qingjia, arr)!=-1){
		$('.val_dialog[name="work_fqsp_qj"]').show();
	}else{
		$('.val_dialog[name="work_fqsp_qj"]').hide();
	}
	if($.inArray(chuchai, arr)!=-1){
		$('.val_dialog[name="work_fqsp_cc"]').show();
	}else{
		$('.val_dialog[name="work_fqsp_cc"]').hide();
	}
	if($.inArray(waichu, arr)!=-1){
		$('.val_dialog[name="work_fqsp_wc"]').show();
	}else{
		$('.val_dialog[name="work_fqsp_wc"]').hide();
	}
	if($.inArray(baoxiao, arr)!=-1){
		$('.val_dialog[name="work_fqsp_bx"]').show();
	}else{
		$('.val_dialog[name="work_fqsp_bx"]').hide();
	}
	if($.inArray(lizhi, arr)!=-1){
		$('.val_dialog[name="work_fqsp_lz"]').show();
	}else{
		$('.val_dialog[name="work_fqsp_lz"]').hide();
	}
	if($.inArray(zhuanzheng, arr)!=-1){
		$('.val_dialog[name="work_fqsp_zz"]').show();
	}else{
		$('.val_dialog[name="work_fqsp_zz"]').hide();
	}
	if($.inArray(tiaoxin, arr)!=-1){
		$('.val_dialog[name="work_fqsp_tx"]').show();
	}else{
		$('.val_dialog[name="work_fqsp_tx"]').hide();
	}
	if($.inArray(bangongcaigou, arr)!=-1){
		$('.val_dialog[name="work_fqsp_bgcg"]').show();
	}else{
		$('.val_dialog[name="work_fqsp_bgcg"]').hide();
	}
	if($.inArray(wupinlingyong, arr)!=-1){
		$('.val_dialog[name="work_fqsp_wply"]').show();
	}else{
		$('.val_dialog[name="work_fqsp_wply"]').hide();
	}
	if($.inArray(gongzhang, arr)!=-1){
		$('.val_dialog[name="work_fqsp_gz"]').show();
	}else{
		$('.val_dialog[name="work_fqsp_gz"]').hide();
	}
	if($.inArray(hetong, arr)!=-1){
		$('.val_dialog[name="work_fqsp_ht"]').show();
	}else{
		$('.val_dialog[name="work_fqsp_ht"]').hide();
	}
	if($.inArray(putongshenpi, arr)!=-1){
		$('.val_dialog[name="work_fqsp_ptsp"]').show();
	}else{
		$('.val_dialog[name="work_fqsp_ptsp"]').hide();
	}
	if($.inArray(jiekuan, arr)!=-1){
		$('.val_dialog[name="work_fqsp_jk"]').show();
	}else{
		$('.val_dialog[name="work_fqsp_jk"]').hide();
	}


}
}
//离职
//	$('.lizhitc_btn_xxl').die().live('click', function() {
//		
//			$('.tanceng .lizhiname_xxl').val(user_name);
//			$('.tanceng .lizhigwmc_xxl').val(ranking);
//			$('.tanceng .ruzhiriqi_xxl').val(workdate);
//		
//		console.log(user_name)
//	})
//SERVER_URL = 'http://192.168.0.167:9091/';
//token='2017021311542463002';
//SERVER_URL = 'http://192.168.0.167:9010/';
//uid = 1;
$(function() {
	var DATE_FORMAT = /^[0-9]{4}-[0-1]?[0-9]{1}-[0-3]?[0-9]{1}$/; //日期
	var regs = /^(\d{16}|\d{19})$/; //卡号
	var moys = /^[0-9]{1,}(?:.[0-9]{0,2})?$/; //金额
	//请假接口

	var flowadd_data = {
		token: token,
		uid:uid,
		company_id: companyid,//公司的id
		department_id:departmentid,//部门id
		leave_start_time: '',//请假开始时间
		leave_end_time: '',//请假结束时间
		leave_type: '',//请假类型，1事假，2病假，3年假，4调休，5婚假，6产假，7陪护假，8其他
		leave_day_num: '',//请假天数
		leave_reason: '',//请假理由
		reaver_id: '',//交接人id
		//approval_id: '',//审批人id
		cc_id:'',//抄送人id
		now_approval_id:''//当前审核人的id
	};
	$('.qingjia_menu_list_xxl li').die().live('click',function(){
		//console.log($(this).attr('typeid'))
		$('.tanceng .qjlx_xxl').val($(this).text()).addClass('c_3');
		$('.tanceng .qjlx_xxl').attr('typeid',$(this).attr('typeid'))
	})
	$('.tanceng .qjbtn_xxl').die('click').live('click', function() {
		//var DATE_FORMAT = /^[0-9]{4}-[0-1]?[0-9]{1}-[0-3]?[0-9]{1}$/;
		
		if($('.tanceng .jjr_add_xxl>li').length < 1) {
			alert('请选择交接人');
			return false;
		}
		var pera = []
		$.each($('.tanceng .jjr_add_xxl>li[userid]'), function(i, v) {
			pera.push($(this).attr('userid'))
		});
		//pera.push($('.tanceng .jjr_add_xxl').children().attr('userid'))
		flowadd_data.reaver_id = pera.join();
		//alert(flowadd_data.connect_person)
//		if($('.tanceng .spr_add_xxl>li').length < 1) {
//			alert('请选择审批人')
//			return false;
//		}
		var flows = [];
		$.each($('.tanceng .spr_add_xxl>li[userid]'), function(i, v) {
			flows.push($(this).attr('userid'))
		});

		//flowadd_data.approval_id = flows.join();
		//flowadd_data.now_approval_id = flows[0];
		var copys = [];
		$.each($('.tanceng .csr_add_xxl>li[userid]'), function(i, v) {
			copys.push($(this).attr('userid'))
		});
		flowadd_data.cc_id = copys.join();
		
		flowadd_data.leave_day_num = $('#qjnum').attr('num');
		if($('.tanceng .qjlx_xxl').val()=='请选择请假类型'){
			alert('请选择请假类型')
			return false;
		}else{
			flowadd_data.leave_type = $('.tanceng .qjlx_xxl').val();
		}
		
		if(DATE_FORMAT.test($('#qjxxl_start').val())) {
			flowadd_data.leave_start_time = $('#qjxxl_start').val();
		} else {
			alert('抱歉，您输入的日期格式有误，开始时间-正确格式应为2012-01-01');
			return false;
		}
		if(DATE_FORMAT.test($('#qjxxl_end').val())) {
			flowadd_data.leave_end_time = $('#qjxxl_end').val();
		} else {
			alert('抱歉，您输入的日期格式有误，结束时间-正确格式应为2012-02-02');
			return false;
		}
		if($('#qj_xxl_explain').val() == '请输入请假事由') {
			alert('请输入请假事由');
			return false;
		} else {
			flowadd_data.leave_reason = $('#qj_xxl_explain').val();
		}
		//console.log(flowadd_data)
		flow_apply_add();
		$(this).parent().parent().parent().remove();
		var num = $('.tanceng').children(".dialog_box").length;
		if(num < 1) {
			$(".tanceng").hide();
		}
	})

	function flow_apply_add() {
		$.ajax({
			type: "post",
			url: SERVER_URL + "work-leave/add",
			dataType: 'json',
			data: flowadd_data,
			success: function(data) {
				if(data.code != 0) {
					console.log(data.msg)
				} else {
					alert(data.msg)
					console.log(data)
					renyuannums = []; //审批人
					csnumss = []; //抄送人
					renyuannum = []; //交接人
					//csnumssa = []//执行人
				}
			},
			error: function(e) {
				console.log(e)
			}
		});
	}
	//审批人员获取权限
	var gz_fqsp_rydata = {
		token:token,
		company_id:companyid,
		department_id:departmentid,
		uid:uid,
		category:''//分类id(1请假,2出差,3外出,4报销,5借款,6付款,7,招聘,8离职,9转正,10,调薪,11,办公采购,12物品领用,13公章,14合同,15普通审批,16考勤)
	}
	$('.work_sp li.val_dialog').die().live('click',function(){
		//console.log($(this).attr('typeid'))
		if($(this).attr('typeid')=='8'){
			$('.tanceng .lizhiname_xxl').val(user_name);
			$('.tanceng .lizhigwmc_xxl').val(ranking);
			$('.tanceng .ruzhiriqi_xxl').val(workdate);
		}else if($(this).attr('typeid')=='9'){
			$('.tanceng .zzname_xxl').val(user_name);
			$('.tanceng .zzgwmc_xxl').val(ranking);
			$('.tanceng .zzrzriqi_xxl').val(workdate);
		}else if($(this).attr('typeid')=='10'){
			$('.tanceng .txname_xxl').val(user_name);
			$('.tanceng .txgwmc_xxl').val(ranking);
			$('.tanceng .txdqxz_xxl').val(total_num);
		}
		
		gz_fqsp_rydata.category = $(this).attr('typeid');
		gz_fqsp_ryqxajax()
	})
	function gz_fqsp_ryqxajax(){
		$.ajax({
			type:"post",
			url:SERVER_URL+"work/get-approval-type",
			data:gz_fqsp_rydata,
			dataType:'json',
			success:function(data){
				if(data.code!=0){
					console.log(data)
				}else{
					console.log(data);
					var rlist = data['data'],rhtml = '';
					if(rlist.length==0){
						$('.tanceng .spr_add_xxl').html('<li><em class="icon_personBtn icon_personBtn_msg"></em><em class="icon_adderBtn"></em><p class="box_adderName">需在系统设置审批人</p> </li>');
					}else{
						$.each(rlist, function(i,v) {
							if(data.kuaji==1){
								if(v.face==null||v.face==''){
								rhtml +='<li userid="' + v.uid + '"><em class="icon_personBtn icon_personBtn_msg"></em><em class="icon_adderBtn"></em><p class="box_adderName">' + likNullData(v.name) + '</p> </li>';
							}else{
								rhtml +='<li userid="' + v.uid + '"><em class="icon_personBtn icon_personBtn_msg" style="background-image:url('+getImgUrl(v.face)+');border-radius:50%;background-size:cover;"></em><em class="icon_adderBtn"></em><p class="box_adderName">' + likNullData(v.name) + '</p> </li>';
							}
							}else{
								if(v.face==null||v.face==''){
								rhtml +='<li userid="' + v.uid + '"><em class="icon_personBtn icon_personBtn_msg"><i class="icon_personNext"></i></em><em class="icon_adderBtn"></em><p class="box_adderName">' + likNullData(v.name) + '</p> </li>';
							}else{
								rhtml +='<li userid="' + v.uid + '"><em class="icon_personBtn icon_personBtn_msg" style="background-image:url('+getImgUrl(v.face)+');border-radius:50%;background-size:cover;"><i class="icon_personNext"></i></em><em class="icon_adderBtn"></em><p class="box_adderName">' + likNullData(v.name) + '</p> </li>';
							}
							}
							
						});
						$('.tanceng .spr_add_xxl').html(rhtml).children('li:last').children('.icon_personBtn_msg').children('i').remove();
					}
				}
				
			},
			error:function(e){
				console.log(e)
			}
		});
	}
	//选择人员
	//	dialog tree list person
	function tree_list_person(datalist, deep) {
		var html = '';
		$.each(datalist, function(index, data) {
			var html_i_list_before = '<i class="list_before_span"></i>';
			html += '<ul class="ul1">';
			for(var j = 0; j < deep; j++) {
				html_i_list_before += '<i class="list_before_span"></i>'
			}
			html += '<li class="left_1" cussortid = "' + data["id"] + '">' + html_i_list_before + '<span class="icon_open"></span><span class="icon_file"></span><span class="list_msg">' + data['name'] + '('+data.user_info.length+')</span></li>';
			html += '<ul class="ul3">';
			if(data['children'] && data['children'].length > 0) {
				html += tree_list_person(data['children'], deep + 1);
			}
			$.each(data['user_info'], function(index2, data2) {
				if(data2.job_status==3){
					var html_i_list_before = '<i class="list_before_span"></i>';
				for(var j = 0; j < deep + 1; j++) {
					html_i_list_before += '<i class="list_before_span"></i>'
				}
				html += '<li class="left_2 person_left_nav" userinfoid="' + data2['id'] + '">' + html_i_list_before + '<span class="list_msg">' + data2['name'] + ' </span></li>'
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
	function jiaojierenyuan_ajax(){
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
				console.log(data)
				var lists = data['list'],list_html='';
				$.each(lists, function(i,v) {
					list_html +='<li class="left_2 person_left_nav" userinfoid="' + v.id + '"><i class="list_before_span"></i><span class="list_msg">' + v.name + ' </span></li>';
				});
				var datalists = data.rows; //jiaojierenyuan
				var deep = 0;
				$('.tanceng .fqsp_jiejrey_numcxxl').html('所有分类('+data.sum_num+')')
				$('.jiaojierenyuan').html(tree_list_person(datalists, deep)+list_html);
				$('.spcy_tree_xxl').html(tree_list_person(datalists, deep)+list_html);
				$.each($('li.left_1'), function(i, v) {
					if($('li.left_1').eq(i).next('ul').children().length == 0) {
						$('li.left_1').eq(i).find('span.icon_open').addClass('personOth')
					}
				})
			}
		},
		error: function(data) {

		}
	});
	}
	jiaojierenyuan_ajax()
	$('.tanceng .val_dialogTop[name="work_fqsp_jjr"]').die().live('click',function(){
		jiaojierenyuan_ajax()
	})
	//交接人员
	var renyuannum = [];
	$('.tanceng .jjry_isok_xxl').die('click').live('click', function() {
		if($('.jiaojierenyuan li.on').attr('userinfoid')==undefined){
			alert('请选择人员')
			return false;
		}
			var trues = $.inArray($('.jiaojierenyuan li.on').attr('userinfoid'), renyuannum);
			
			if(trues != -1) {
				alert('重复了')
			} else {
				if($('.tanceng .jjr_add_xxl').children().length > 3) {
					alert('最多只能添加3位喔！')
				} else {
					$('.tanceng .jjr_add_xxl').prepend('<li userid="' + $('.tanceng .jiaojierenyuan li.on').attr('userinfoid') + '"><i class="del_img_1">-</i><em class="icon_personBtn icon_personBtn_msg"><i class="icon_personNext"></i></em><em class="icon_adderBtn"></em><p class="box_adderName">' + $('.tanceng .jiaojierenyuan li.on').children('span.list_msg').html() + '</p></li>');
					renyuannum.push($('.jiaojierenyuan li.on').attr('userinfoid'));
				}

				$(this).parent().parent().parent().remove();
				var num = $('.tanceng').children(".dialog_box").length;
				if(num < 1) {
					$(".tanceng").hide();
				};
			}

		})
		//删除数组中的一位
	$('.tanceng .del_img_1').die().live('click', function() {
			//$(this).parent().attr('userid')
			renyuannum.splice($.inArray($(this).parent().attr('userid'), renyuannum), 1);
		})
		//审批人员
	var renyuannums = [];
	var buzou = ['步骤一', '步骤二', '步骤三', '步骤四', '步骤五']
	$('.tanceng .sprcy_btn_xxl').die().live('click', function() {
			
			if($('.tanceng .spr_add_xxl').children('li').length < 1) {
				renyuannums = []
			}
			var trues = $.inArray($('.tanceng .spcy_tree_xxl li.on').attr('userinfoid'), renyuannums);
			//alert(renyuannums)
			if(trues != -1) {
				alert('重复了')
			} else {
				if($('.tanceng .spr_add_xxl').children().length > 5) {
					alert('最多只能添加4位喔！')
				} else {
					$('.tanceng .spqian_xxl').before('<li userid="' + $('.spcy_tree_xxl li.on').attr('userinfoid') + '"><i class="del_img_1">-</i><em class="icon_personBtn icon_personBtn_msg"><i class="icon_personNext"></i></em><em class="icon_adderBtn"></em><p class="box_adderName">' + $('.spcy_tree_xxl li.on').children('span.list_msg').html() + '</p> <p class="box_addermsg">步骤一</p></li>');
					//$('.tanceng .chuchai_spr')
					renyuannums.push($('.tanceng .spcy_tree_xxl li.on').attr('userinfoid'));
					$.each($('.tanceng .spr_add_xxl .box_addermsg'), function(i, v) {
						$('.tanceng .spr_add_xxl .box_addermsg').eq(i).html(buzou[i])
					});
				}

				$(this).parent().parent().parent().remove();
				var num = $('.tanceng').children(".dialog_box").length;
				if(num < 1) {
					$(".tanceng").hide();
				};
			}

		})
		//删除数组中的一位
	$('.tanceng .del_img_1').die().live('click', function() {
			//$(this).parent().attr('userid')
			renyuannums.splice($.inArray($(this).parent().attr('userid'), renyuannums), 1);
			$.each($('.spr_add_xxl .box_addermsg'), function(i, v) {
				$('.spr_add_xxl .box_addermsg').eq(i).html(buzou[i])
			});
		})
		//抄送人员列表

	//无限
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
				var html_i_list_before = '<i class="list_before_span"></i>';
				for(var j = 0; j < deep + 1; j++) {
					html_i_list_before += '<i class="list_before_span"></i>'
				}
				html += '<li class="left_2 person_left_nav li_person" userinfoid="' + data2['id'] + '">' + html_i_list_before + '<span class="list_msg">' + data2['name'] + ' </span><span class="list_check"><em></em></span></li>'
			})
			html += '</ul>';
			html += '</ul>';
		});
		return html
	}

	$('.tanceng .val_dialogTop').die().live('click', function() {
		$('.csr_renwulist_xxl').html('')
		$('.zxr_renwulist_xxl').html('')
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
					var touburenyuans = '<li class="left_all"><span class="icon_open change_ba"></span><span class="icon_file"></span><span class="list_msg">所有分类('+data.sum_num+')</span><span class="list_check"><em></em></span></li>';
					var deep = 0;
					$('.csr_list_xxl').html(touburenyuans + tree_list_choose_dept_person(data.rows, deep)+list_html)

				}
			},
			error: function(data) {

			}
		});
	})

	$('.tanceng .csr_list_xxl .person_left_nav').die().live('click', function() {
		var notli = $('.tanceng .csr_list_xxl ul .person_left_nav').not($(this))
		$(this).toggle(function() {
				$('.tanceng .csr_renwulist_xxl').append('<li rid="' + $(this).attr('userinfoid') + '"><span>' + $(this).children('.list_msg').html() + '</span><i class="list_choose_delete"></i></li>')
				$(this).find('span.list_check em').addClass('on')
				$(this).addClass('on')
				notli.removeClass('on')
			}, function() {
				$('.csr_renwulist_xxl').find('li[rid=' + $(this).attr('userinfoid') + ']').remove()
				$(this).find('span.list_check em').removeClass('on')
			})
			//	$(this).trigger('click')
			//console.log($(this).attr('aid'))
			//console.log($(this).children('.list_msg').html())

	})
	$('.tanceng .list_choose_delete').die().live('click', function() {
		$(this).parent().remove();
		$('.tanceng .csr_list_xxl ul .person_left_nav[userinfoid=' + $(this).parent().attr('rid') + ']').removeClass('on').find('span.list_check em').removeClass('on')
	})
	var csnumss = []
	$('.tanceng .csr_btn_queding').die('click').live('click', function() {
			if($('.tanceng .csr_renwulist_xxl li').length < 1) {
				alert('请选择人员')
				return
			} else {
				//alert($('.tanceng .renwulist_xxl li').length)
				//var rens = '',rids = [];
				//alert(csnumss)
				if($('.tanceng .csr_add_xxl').children('li').length < 1) {
					csnumss = []
				}
				var truess = $.inArray($('.csr_renwulist_xxl li').attr('rid'), csnumss);
				if(truess != -1) {
					alert('重复了')
				}else{
					$.each($('.tanceng .csr_renwulist_xxl li'), function(i, v) {
						if($('.csr_renwulist_xxl li').attr('rid')==uid){
							alert('不能抄送给自己哦');
							return false;
						}
							csnumss.push($('.csr_renwulist_xxl li').attr('rid'));
							//if($('.tanceng .csr_add_xxl').children().length > 4) {
								//alert('最多只能添加4位哦')
							//} else {
								$('.tanceng .csr_add_xxl').prepend('<li userid="' + $(this).attr('rid') + '"><i class="del_img_1">-</i><em class="icon_personBtn icon_personBtn_msg"></em><em class="icon_adderBtn"></em><p class="box_adderName">' + $(this).children('span').html() + '</p></li>')
							//}
//<i class="icon_personNext"></i>
						})
					//else if($.inArray('135', csnumss)!=-1){
					//alert('不能抄送给自己哦');
					//return false;
				//}
						//alert(csnumss)
				}
				//alert(csnumss)
			}
			$('.csr_renwulist_xxl').html('')
			$(this).parent().parent().parent().remove();
			var num = $('.tanceng').children(".dialog_box").length;
			if(num < 1) {
				$(".tanceng").hide();
			};
		})
		//删除数组中的一位
	$('.tanceng .del_img_1').die().live('click', function() {
			//$(this).parent().attr('userid')
			//alert(csnumss)
			csnumss.splice($.inArray($(this).parent().attr('userid'), csnumss), 1);
			//alert(csnumss)
		})
		//执行人
	$('.csr_list_xxl ul .person_left_nav').die().live('click', function() {
		$(this).toggle(function() {
			$('.zxr_renwulist_xxl').append('<li rid="' + $(this).attr('userinfoid') + '"><span>' + $(this).children('.list_msg').html() + '</span><i class="list_choose_delete"></i></li>')
			$(this).find('.list_check em').addClass('on')
		}, function() {
			$('.zxr_renwulist_xxl').find('li[rid=' + $(this).attr('userinfoid') + ']').remove()
			$(this).find('.list_check em').removeClass('on')
		})
		$(this).trigger('click')
			//console.log($(this).attr('aid'))
			//console.log($(this).children('.list_msg').html())

	})
	$('.list_choose_delete').die().live('click', function() {
		$(this).parent().remove();
	})
	var csnumssa = []
	$('.tanceng .zxr_btn_queding').die('click').live('click', function() {
			if($('.tanceng .zxr_renwulist_xxl li').length < 1) {
				alert('请选择人员')
				return
			} else {
				//alert($('.tanceng .renwulist_xxl li').length)
				//var rens = '',rids = [];
				//alert(csnumss)
				var truess = $.inArray($('.zxr_renwulist_xxl li').attr('rid'), csnumssa);
				if(truess != -1) {
					alert('重复了')
				} else {
					$.each($('.tanceng .zxr_renwulist_xxl li'), function(i, v) {
							csnumssa.push($('.zxr_renwulist_xxl li').attr('rid'));
							if($('.tanceng .csr_add_xxl').children().length > 4) {
								alert('最多只能添加3位哦')
							} else {
								$('.tanceng .zhixing_add_ren').prepend('<li userid="' + $(this).attr('rid') + '"><i class="del_img_1">-</i><em class="icon_personBtn icon_personBtn_msg"><i class="icon_personNext"></i></em><em class="icon_adderBtn"></em><p class="box_adderName">' + $(this).children('span').html() + '</p></li>')
							}

						})
						//alert(csnumss)
				}

			}
			$('.csr_renwulist_xxl').html('')
			$(this).parent().parent().parent().remove();
			var num = $('.tanceng').children(".dialog_box").length;
			if(num < 1) {
				$(".tanceng").hide();
			};
		})
		//删除数组中的一位
	$('.tanceng .del_img_1').die().live('click', function() {
			//$(this).parent().attr('userid')
			//alert(csnumss)
			csnumssa.splice($.inArray($(this).parent().attr('userid'), csnumssa), 1);
			//alert(csnumss)
		})
		//出差
		//添加日程
	var chuchai_html = '';
	var ccj = 1;
	$('.tanceng .worksp_addccBtn').die().live('click', function() {
		if($('.tanceng .ccaddressone').val()==''||$('.tanceng .ccaddressone').val()=='如：北京、上海、杭州（必填）'&&$('.tanceng .ccstarttimeone').val()==''||$('.tanceng .ccaddressone').val()=='请选择日期'&&$('.tanceng .ccendtimeone').val()==''||$('.tanceng .ccendtimeone').val()=='请选择日期'){
			return false;
		}
		ccj++;
		if(ccj > 5) {
			alert('一次最多只能添加5个哦')
			return
		}
		chuchai_html = '<div class="chuchai_xxl ccnew_box"><div class="work_sp_fqsp_h3"><h3 class="inline_block"><p>行程明细<span class="c_r">(<cite class="addcc_num">2</cite>)</span></p></h3><div class="work_fqsp_gb_img cc_delete_btnxxl"> <img src="static/images/work_sp_gb.png" class="work_sp_gb"></div></div><div class="t_textinput"><div class="t_left"><i class="c_r">*</i>出差地点</div><div class="t_right"><input type="text" class="time_input ccaddress" value="如：北京、上海、杭州（必填）" onfocus="fn_focus(this);" onblur="fn_blur(this);" /></div></div><div class="t_textinput"><div class="t_left"><i class="c_r">*</i>开始时间</div><div class="t_right"><input onfocus="fn_focus(this);" onblur="fn_blura(this);" value="请选择日期" class="laydate-icon time_input ccstarttime" id="ccstarts_'+ccj+'" readonly="readonly" onclick="laydate()" style="cursor: pointer;"></div></div><div class="t_textinput"><div class="t_left"><i class="c_r">*</i>结束时间</div><div class="t_right"><input onfocus="fn_focus(this);" onblur="fn_blura(this);" value="请选择日期" class="laydate-icon time_input ccendtime chuchaixzrq_endtime_xxl" readonly="readonly" onclick="laydate()" style="cursor: pointer;" id="ccends_'+ccj+'"></div></div></div></div>';
		$('#addchuchai').append(chuchai_html);
		
		for(var i = 1; i < $('.chuchai_xxl').length - 1; i++) {
			$('cite.addcc_num').eq(i).html(i + 2)
		}
		//console.log($('.chuchai_xxl').length - 1)
		////删除日程
		$('.work_sp_gb').die().live('click', function() {
			$(this).parent().parent().parent().remove();
			ccj = $('.chuchai_xxl').length - 1;
			if($('.chuchai_xxl').length - 1 == 2) {
				$('cite.addcc_num').html(2)
			}
			var sccc = $('#addchuchai').children();
			console.log(sccc)
			$.each(sccc, function(i,v) {
				sccc.eq(i).children().children('h3').children().children().children('.addcc_num').html(i+2);
			});
//			for(var i = 1; i < $('.chuchai_xxl').length - 1; i++) {
//				$('cite.addcc_num').eq(i).html(i + 2)
//			}
			
		})
	})
	//
	$('.tanceng .chuchaixzrq_endtime_xxl').die().live('blur', function() {
		var s_time = $(this).parents('.t_textinput').prev().children().find('input.ccstarttime').val();
		//console.log(s_time)
		if(s_time==''||s_time=='请选择日期'){
			alert('请先选择开始时间')
			$(this).val('');
			
		}else{
			var arr = [],arrsl=0;
			var _this = $(this);
			setTimeout(function() {
				_this.parents('.ccnew_box').attr('num', diy_time(_this.parents('.t_textinput').prev().children('.t_right').children('input').val(), _this.val()));
			}, 1000);
			setTimeout(function() {
				$('#addchuchai>div.ccnew_box').each(function() {
						//console.log($(this).attr('num'))
						arr.push(parseInt($(this).attr('num')));
					})
					//console.log(arr)
				arrsl = 0;
				$.each(arr, function(i, v) {
					arrsl += parseInt(v);
				});
				var inpnum = parseInt($('.tanceng #cctime_xxl').attr('tians'));
				$('.tanceng #cctime_xxl').val((arrsl+inpnum)+'天');
			}, 2000)
		}
			
		})
//shanchu
//	$('.tanceng .cc_delete_btnxxl').live('click',function(){
//		var sccc = $(this).parents('#addchuchai').children('.chuchai_xxl');
//		$(this).parent().parent().remove();
//		$.each(sccc, function(i,v) {
//			sccc.eq(i).children().children('h3').children().children().children('.addcc_num').html(i+2);
//			});
//	})
	
	var flowadd_chuchai_data = {
		uid:uid,
		token: token,
		company_id: companyid,//公司的id
		department_id:departmentid,//部门id
		travel_area: '',//出差地点
		travel_start_time: '',//出差开始时间
		travel_end_time: '',//出差结束时间
		travel_day_num: '',//出差天数
		travel_reason: '',//出差事由
		travel_pic_url: '',//图片路径
		travel_file_url:'',//附件路径
		approval_id:'',//审批人id
		cc_id:'',//抄送人id
		now_approval_id:'',//当前审核人的id
		travel_arr:''//出差地点，开始时间，结束时间的JSON
	};
	
	$('.tanceng .ccbtn_xxl').die('click').live('click', function() {
		var ccnum = [];
		var ccjson = []
		//var DATE_FORMAT = /^[0-9]{4}-[0-1]?[0-9]{1}-[0-3]?[0-9]{1}$/;
		if($('.tanceng .ccaddressone').val()==''||$('.tanceng .ccaddressone').val()=='如：北京、上海、杭州（必填）'){
			alert('请输入出差地点 如：北京、上海、杭州（必填）')
		    return false;
		}
		flowadd_chuchai_data.travel_area = $('.tanceng .ccaddressone').val();
		if(!DATE_FORMAT.test($('.tanceng .ccstarttimeone').val())){
			alert('请选择正确的开始日期')
			return false;
		}
		flowadd_chuchai_data.travel_start_time = $('.tanceng .ccstarttimeone').val();
		if(!DATE_FORMAT.test($('.tanceng .ccendtimeone').val())){
			alert('请选择正确的结束日期')
				return false;
		}
		flowadd_chuchai_data.travel_end_time = $('.tanceng .ccendtimeone').val(); 
		ccnum.push(diy_time(flowadd_chuchai_data.travel_start_time,flowadd_chuchai_data.travel_end_time))
		//flowadd_chuchai_data.travel_arr = []
		for(var i = 0; i < $('.tanceng .chuchai_xxl').length; i++) {
			if($('.tanceng .ccaddress').eq(i).val() == '' || $('.tanceng .ccaddress').eq(i).val() == '如：北京、上海、杭州（必填）') {
				alert('请输入出差地点')
				return false;
			} else if(!DATE_FORMAT.test($('.tanceng .ccstarttime').eq(i).val())) {
				alert('请选择正确的开始日期')
				return false;
			} else if(!DATE_FORMAT.test($('.tanceng .ccendtime').eq(i).val())) {
				alert('请选择正确的结束日期')
				return false;
			} else {
				ccjson.push({
					'travel_area': $('.tanceng .ccaddress').eq(i).val(),
					'travel_start_time': $('.tanceng .ccstarttime').eq(i).val(),
					'travel_end_time': $('.tanceng .ccendtime').eq(i).val()
				})
				
				ccnum.push(diy_time(ccjson[i].travel_end_time, ccjson[i].travel_start_time))
				flowadd_chuchai_data.travel_arr=JSON.stringify(ccjson)
			}
			//console.log(ccnum)
		}
		//console.log(ccjson)
		//console.log(flowadd_chuchai_data.travel_arr)
		var total = 0;
		for(var i = 0; i < ccnum.length; i++) {
			total += parseInt(ccnum[i])
		}
		flowadd_chuchai_data.travel_day_num = total;
		//alert(flowadd_chuchai_data.day_num)
		//$('#cctime_xxl').val(flowadd_chuchai_data.travel_day_num + '天');
		if($('#cc_content').val()==''||$('#cc_content').val()=='请输入出差事由描述'){
			$('#cc_content').val('')
		}
		flowadd_chuchai_data.travel_reason = $('#cc_content').val();
		var img_ccs = [];
		if($('.tanceng .img_warp').children('li').length==0){
			flowadd_chuchai_data.travel_pic_url = ''
		}else{
			$.each($('.tanceng .img_warp').children('li'), function(i,v) {
				//console.log($(this).children('img').attr('src'))
				img_ccs.push($(this).children('img').attr('imgurl'))
			});
		}
		flowadd_chuchai_data.travel_pic_url = img_ccs.join();
//		if($('#work_fb_field_cc').val()==''||$('#work_fb_field_cc').val()=='输入附件名称'){
//			$('#work_fb_field_cc').val('')
//		}
		flowadd_chuchai_data.travel_file_url = '';

//		if($('.tanceng .chuchai_spr>li').length < 1) {
//			alert('请选择审批人')
//			return false;
//		}
		var flowa = [];
		$.each($('.tanceng .chuchai_spr>li[userid]'), function(i, v) {
			flowa.push($(this).attr('userid'))
		});

		//		if($('.tanceng .csr_add_xxl>li').length<3){
		//			alert('请选择抄送人')
		//			return false;
		//		}
		var copya = [];
		$.each($('.tanceng .csr_add_xxl>li[userid]'), function(i, v) {
			copya.push($(this).attr('userid'))
		});

		//flowadd_chuchai_data.approval_id = flowa.join();
		//flowadd_chuchai_data.now_approval_id = flowa[0]
		flowadd_chuchai_data.cc_id = copya.join();
		//console.log(flowadd_chuchai_data)
		flow_add_chuchai();
		$(this).parent().parent().parent().remove();
		var num = $('.tanceng').children(".dialog_box").length;
		if(num < 1) {
			$(".tanceng").hide();
		}
	})

	function flow_add_chuchai() {
		$.ajax({
			type: "post",
			url: SERVER_URL + "work-business-travel/add",
			dataType: 'json',
			data: flowadd_chuchai_data,
			success: function(data) {
				if(data.code != 0) {
					console.log(data.msg)
				} else {
					alert(data.msg)
					console.log(data)
					renyuannums = []; //审批人
					csnumss = []; //抄送人

				}
			},
			error: function(e) {
				console.log(e)
			}
		});
	}

	//外出
	var wc_data_xxl = {
		token: token,
		uid:uid,//用户的id
		company_id: companyid,//公司的id
		department_id:departmentid,//部门id
		out_start_time: '',//外出开始时间
		out_end_time: '',//请假结束时间
		out_day_num: '',//外出时间天数
		out_reason: '',//外出事由
		approval_id: '',//审批人
		cc_id: '',//抄送人
		now_approval_id:'',//当前审核人的id
		out_pic_url:''//图片
	}
	$('.tanceng .wc_btn_xxl').die('click').live('click', function() {
		if($('.wcstarttime').val()=='') {
			alert('请选择正确的开始日期')
			return false;
		} else if($('.wcendtime').val()=='') {
			alert('请选择正确的结束日期')
			return false;
		} else if($('#wccontent').val() == '' || $('#wccontent').val() == '请输入外出事由') {
			alert('请输入外出事由')
			return false;
		}
		wc_data_xxl.out_start_time = $('.wcstarttime').val();
		wc_data_xxl.out_end_time = $('.wcendtime').val();
		wc_data_xxl.out_day_num = $('#wcnum').attr('num');
		wc_data_xxl.out_reason = $('#wccontent').val();
		var img_paths = [];
		if($('.tanceng .img_warp').children('li').length==0){
			wc_data_xxl.out_pic_url = ''
		}else{
			$.each($('.tanceng .img_warp').children('li'), function(i,v) {
				//console.log($(this).children('img').attr('src'))
				img_paths.push($(this).children('img').attr('imgurl'))
			});
		}
		wc_data_xxl.out_pic_url = img_paths.join()
//		if($('.tanceng .waichu_spr_xxl>li').length < 1) {
//			alert('请选择审批人')
//			return false;
//		}
		var flowb = [];
		$.each($('.tanceng .waichu_spr_xxl>li[userid]'), function(i, v) {
			flowb.push($(this).attr('userid'))
		});

		//		if($('.tanceng .csr_add_xxl>li').length<3){
		//			alert('请选择抄送人')
		//			return false;
		//		}
		var copyb = [];
		$.each($('.tanceng .csr_add_xxl>li[userid]'), function(i, v) {
			copyb.push($(this).attr('userid'))
		});
		//wc_data_xxl.approval_id = flowb.join();
		wc_data_xxl.cc_id = copyb.join();
		//wc_data_xxl.now_approval_id = flowb[0];
		//console.log(wc_data_xxl)
		//alert(wc_data_xxl.out_time)
		wc_list_xxl()
		$(this).parent().parent().parent().remove();
		var num = $('.tanceng').children(".dialog_box").length;
		if(num < 1) {
			$(".tanceng").hide();
		}
	})

	function wc_list_xxl() {
		$.ajax({
			type: "post",
			url: SERVER_URL + "work-go-out/add",
			dataType: 'json',
			data: wc_data_xxl,
			success: function(data) {
				if(data.code != 0) {
					console.log(data.msg)
				} else {
					alert(data.msg)
					console.log(data)
					renyuannums = []; //审批人
					csnumss = []; //抄送人

				}
			},
			error: function(e) {
				console.log(e)
			}
		});
	}
	//报销
	var baoxiao_data_xxl = {
		token: token,
		uid:uid,
		company_id: companyid,//公司的id
		department_id:departmentid,//部门id
		pay_money: '',//报销金额
		pay_type: '',//报销类别
		pay_info: '',//报销明细
		pay_pic_url: '',//图片
		pay_file_url:'',
		approval_id:'',//审批人id 1
		cc_id:'',//抄送人
		now_approval_id:'',//当前审核人的id
		pay_arr:''//报销金额,报销类别,报销明细组成的json
	}
	var baoxiao_html = '';
	var bx = 1;
	$('.biaoxiaobtn').die().live('click', function() {
		bx++;
		if(bx > 5) {
			alert('一次最多只能添加5个哦')
			return
		}
		baoxiao_html = '<div class="biaoxiaohtml bxnewbox"><div class="work_sp_fqsp_h3"> <h3 class="inline_block"><p>报销明细<span class="c_r">(<cite class="bxnum">2</cite>)</span></p></h3> <div class="work_fqsp_gb_img"> <img src="static/images/work_sp_gb.png" class="work_sp_gb"> </div> </div> <div class="t_textinput"> <div class="t_left"><i class="c_r">*</i>报销金额</div> <div class="t_right"><input type="text" class="time_input inp_96 bx_je_xxl lik_input_number" value="请输入报销金额" onfocus="fn_focus(this);" onblur="fn_blur(this);"/><i class="unit" style="right: 4px;">元</i></div> </div> <div class="t_textinput"> <div class="t_left"><i class="c_r">*</i>报销类别</div> <div class="t_right"><input type="text" class="time_input bx_lb_xxl" value="请输入报销类别" onfocus="fn_focus(this);" onblur="fn_blur(this);" /></div> </div> <div class="t_textinput t_textarea"> <div class="t_left"><i class="c_r v_hidden">*</i>费用明细</div> <div class="t_right"><textarea class="txt_normal bx_fymx_xxl" onfocus="fn_focus(this);" onblur="fn_blur(this);">请输入费用明细描述</textarea></div> </div>';
		$('#bx_html').append(baoxiao_html);
		for(var i = 1; i < $('.biaoxiaohtml').length - 1; i++) {
			$('cite.bxnum').eq(i).html(i + 2)
		}
		//console.log($('.biaoxiaohtml').length-1)
		////删除日程
		$('.work_sp_gb').die().live('click', function() {

			$(this).parent().parent().parent().remove();
			//console.log($('.chuchai_xxl').length)
			bx = $('.biaoxiaohtml').length - 1;
			if($('.biaoxiaohtml').length - 1 == 2) {
				$('cite.bxnum').html(2)
			}
			var sccc = $('#bx_html').children();
			$.each(sccc, function(i,v) {
				sccc.eq(i).children().children('h3').children().children().children('cite').html(i+2);
			});
//			for(var i = 1; i < $('.biaoxiaohtml').length - 1; i++) {
//				$('cite.bxnum').eq(i).html(i + 2)
//			}

		})
	})
	$('.tanceng .bxbtn_xxl').die('click').live('click', function() {
		if($('.tanceng .bx_je_xxlone').val()==''||$('.tanceng .bx_je_xxlone').val()=='请输入报销金额'){
			alert('请输入报销金额')
			return false;
		}else if(!moys.test($('.tanceng .bx_je_xxlone').val())){
			alert('只能输入数字，小数点后只能保留两位')
				return false;
		}
		baoxiao_data_xxl.pay_money = $('.tanceng .bx_je_xxlone').val();
		if($('.tanceng .bx_lb_xxlone').val()==''||$('.tanceng .bx_lb_xxlone').val()=='请输入报销金额'){
			alert('请输入报销类别')
			return false;
		}
		baoxiao_data_xxl.pay_type = $('.tanceng .bx_lb_xxlone').val();
		if($('.tanceng .bx_fymx_xxlone').val()==''||$('.tanceng .bx_fymx_xxlone').val()=='请输入报销金额'){
			alert('请输入费用明细描述')
			return false;
		}
		baoxiao_data_xxl.pay_info = $('.tanceng .bx_fymx_xxlone').val();
			var bx_repay = [];
		for(var i = 0; i < $('.tanceng .biaoxiaohtml').length; i++) {
			if($('.tanceng .bx_je_xxl').eq(i).val() == '' || $('.tanceng .bx_je_xxl').eq(i).val() == '请输入报销金额') {
				alert('请输入报销金额');
				return false;
			} else if(!moys.test($('.tanceng .bx_je_xxl').eq(i).val())) {
				alert('只能输入数字，小数点后只能保留两位')
				return false;
			}
			if($('.tanceng .bx_fymx_xxl').eq(i).val() == '' || $('.tanceng .bx_fymx_xxl').eq(i).val() == '请输入费用明细描述') {
				$('.tanceng .bx_fymx_xxl').eq(i).val('')
			}
			if($('.tanceng .bx_lb_xxl').eq(i).val() == '' || $('.tanceng .bx_lb_xxl').eq(i).val() == '请输入报销类别') {
				alert('请输入报销类别');
				return false;
			} else {
				bx_repay.push({
					'pay_money': $('.tanceng .bx_je_xxl').eq(i).val(),
					'pay_type': $('.tanceng .bx_lb_xxl').eq(i).val(),
					'pay_info': $('.tanceng .bx_fymx_xxl').eq(i).val()
				})
			}
		}
		baoxiao_data_xxl.pay_arr = JSON.stringify(bx_repay)
		//console.log(baoxiao_data_xxl.pay_arr)
//		if($('#work_fb_field_bx').val() == '请添加附件') {
//			$('#work_fb_field_bx').val('');
//		}
		if($('.tanceng .bxtjiafujian_box_xxl').html()==''){
			baoxiao_data_xxl.pay_file_url = '';
		}else{
			var addfile = $('.tanceng .bxtjiafujian_box_xxl').children().find('.attachfield_filename').html();
			baoxiao_data_xxl.pay_file_url = addfile;
		}
		//console.log(baoxiao_data_xxl.pay_file_url)
			
		var img_paths_bx = [];
		if($('.tanceng .img_warp').children('li').length==0){
			baoxiao_data_xxl.pay_pic_url = ''
		}else{
			$.each($('.tanceng .img_warp').children('li'), function(i,v) {
				//console.log($(this).children('img').attr('src'))
				img_paths_bx.push($(this).children('img').attr('imgurl'))
			});
		}
		baoxiao_data_xxl.pay_pic_url = img_paths_bx.join();
		
//		if($('.tanceng .baoxiao_spr_xxl>li').length < 1) {
//			alert('请选择审批人')
//			return false;
//		}
		var flowc = [];
		$.each($('.tanceng .baoxiao_spr_xxl >li[userid]'), function(i, v) {
			flowc.push($(this).attr('userid'))
		});
		var copyc = [];
		$.each($('.tanceng .csr_add_xxl>li[userid]'), function(i, v) {
			copyc.push($(this).attr('userid'))
		});
		//baoxiao_data_xxl.now_approval_id = flowc[0]
		//baoxiao_data_xxl.approval_id = flowc.join();
		baoxiao_data_xxl.cc_id = copyc.join();
		//console.log(baoxiao_data_xxl)
		baoxiao_ajax_xxl()
		$(this).parent().parent().parent().remove();
		var num = $('.tanceng').children(".dialog_box").length;
		if(num < 1) {
			$(".tanceng").hide();
		}
	})

	function baoxiao_ajax_xxl() {
		$.ajax({
			type: "post",
			url: SERVER_URL + "work-to-pay/add",
			dataType: 'json',
			data: baoxiao_data_xxl,
			success: function(data) {
				if(data.code != 0) {
					console.log(data.msg)
				} else {
					alert(data.msg)
					renyuannums = []; //审批人
					csnumss = []; //抄送人
					console.log(data)
				}
			},
			error: function(e) {
				console.log(e)
			}
		});
	}
	//借款
	var jiekuan_data_xxl = {
		token: token,
		uid:uid,
		company_id: companyid,//公司的id
		department_id:departmentid,//部门id
		payment_time: '',//支付日期
		repayment_time: '',//还款日期
		borrow_reason: '',//借款原因
		borrow_type: '',//借款类型:1现金，2支票，3电汇，4贷记，5汇票，6银行卡，7其他
		borrow_money: '',//借款金额
		approval_id: '',//审批人id 1,2,3
		cc_id:'',//抄送人id 1,2,3
		now_approval_id:''//当前审核人的id
	}
	$('.tanceng .jiekuan_list_menu_xxl li').die().live('click',function(){
		//console.log($(this).attr('jkid'))
		$('.tanceng .jkfs_xxl').attr('jkid',$(this).attr('jkid')).val($(this).text())
	})
	$('.tanceng .jiekuan_btn').die('click').live('click', function() {
		if($('.jksy_xxl').val() == '' || $('.jksy_xxl').val() == '请输入借款事由') {
			alert('请输入借款事由')
			return false;
		} else if($('.jkje_xxl').val() == '' || $('.jkje_xxl').val() == '请输入金额') {
			alert('请输入金额');
			return false;
		} else if(!moys.test($('.jkje_xxl').val())) {
			alert('只能输入数字，小数点后只能保留两位')
			return false;
		} else if(!DATE_FORMAT.test($('.jkstart_tm').val())) {
			alert('请输入正确的:支付日期')
			return false;
		} else if(!DATE_FORMAT.test($('.jkend_tm').val())) {
			alert('请输入正确的:还款日期')
			return false;
		} else if($('.jkfs_xxl').val()=='请选择借款方式'){
			alert('请选择借款方式')
			return false;
		}else{
			jiekuan_data_xxl.borrow_reason = $('.jksy_xxl').val();
			jiekuan_data_xxl.borrow_money = $('.jkje_xxl').val();
			jiekuan_data_xxl.borrow_type = $('.jkfs_xxl').val();
			jiekuan_data_xxl.payment_time = $('.jkstart_tm').val();
			jiekuan_data_xxl.repayment_time = $('.jkend_tm').val();

//			if($('.tanceng .jiekuan_spr>li').length < 1) {
//				alert('请选择审批人')
//				return false;
//			}
			var flowdd = [];
			$.each($('.tanceng .jiekuan_spr>li[userid]'), function(i, v) {
				flowdd.push($(this).attr('userid'))
			});
			var copyd = [];
			$.each($('.tanceng .csr_add_xxl>li[userid]'), function(i, v) {
				copyd.push($(this).attr('userid'))
			});
			//jiekuan_data_xxl.approval_id = flowdd.join();
			//jiekuan_data_xxl.now_approval_id = flowdd[0]
			jiekuan_data_xxl.cc_id = copyd.join();
		}
		//console.log(jiekuan_data_xxl)	
		jiekuan_ajax_xxl()
		$(this).parent().parent().parent().remove();
		var num = $('.tanceng').children(".dialog_box").length;
		if(num < 1) {
			$(".tanceng").hide();
		}
	})

	function jiekuan_ajax_xxl() {
		$.ajax({
			type: "post",
			url: SERVER_URL + "work-borrow-money/add",
			dataType: 'json',
			data: jiekuan_data_xxl,
			success: function(data) {
				if(data.code != 0) {
					console.log(data)
				} else {
					alert(data.msg)
					renyuannums = []; //审批人
					csnumss = []; //抄送人
					console.log(data)
				}
			},
			error: function(e) {
				console.log(e)
			}
		});
	}

	//付款
	var fukuan_data_xxl = {
		token: token,
		uid:uid,
		company_id: companyid,//公司的id
		department_id:departmentid,//部门id
		payment_reason: '',//付款事由
		payment_money: '',//付款总额
		payment_type: '',//付款方式，1现金，2支票，3打卡，默认1
		payment_time: '',//支付日期
		payment_name: '',//支付名称
		bank: '',//银行
		bank_account: '',//银行账号
		approval_id: '',//审批人id
		cc_id:'',//抄送人id
		now_approval_id:''//当前审核人的id
	}
	$('.fk_fkfstype_xxl li').die().live('click',function(){
		$('.tanceng .fk_type').attr('typeid',$(this).attr('typeid')).val($(this).text());
	})
	$('.tanceng .fukuan_btn').die('click').live('click', function() {
		var yhzhnum = $('.fk_yhzh').val()
		if($('.fukuan_content').val() == '' || $('.fukuan_content').val() == '请输入付款事由') {
			alert('请输入付款事由');
			return false;
		} else if($('.fk_money').val() == '' || $('.fk_money').val() == '请输入总额人民币（元）') {
			alert('请输入总额人民币（元）')
			return false;
		} else if(!moys.test($('.fk_money').val())) {
			alert('只能输入数字，小数点后只能保留两位')
			return false;
		} else if(!DATE_FORMAT.test($('.fkzf_tm').val())) {
			alert('请选择支付日期');
			return false;
		} else if($('.fkzf_name').val() == '' || $('.fkzf_name').val() == '请输入支付名称') {
			alert('请输入支付名称')
			return false;
		} else if($('.fk_kaihu').val() == '' || $('.fk_kaihu').val() == '请输入开户行') {
			alert('请输入开户行');
			return false;
		} else if($('.fk_yhzh').val() == '' || $('.fk_yhzh').val() == '请输入银行账户') {
			alert('请输入银行账户');
			return false;
		} else if(!regs.test(yhzhnum)) {
			alert('请输入银行账户:数字16-19位');
			//console.log(yhzhnum)
			return false;
		} else {
			fukuan_data_xxl.payment_reason = $('.fukuan_content').val();
			fukuan_data_xxl.payment_money = $('.fk_money').val();
			fukuan_data_xxl.payment_type = $('.tanceng .fk_type').val();
			fukuan_data_xxl.payment_time = $('.fkzf_tm').val();
			fukuan_data_xxl.payment_name = $('.fkzf_name').val();
			fukuan_data_xxl.bank = $('.fk_kaihu').val();
			fukuan_data_xxl.bank_account = $('.fk_yhzh').val();
//			if($('.tanceng .spr_add_xxl>li').length < 1) {
//				alert('请选择审批人')
//				return false;
//			}
			var flowe = [];
			$.each($('.tanceng .spr_add_xxl>li[userid]'), function(i, v) {
				flowe.push($(this).attr('userid'))
			});
			var copye = [];
			$.each($('.tanceng .csr_add_xxl>li[userid]'), function(i, v) {
				copye.push($(this).attr('userid'))
			});
			//fukuan_data_xxl.approval_id = flowe.join();
			//fukuan_data_xxl.now_approval_id = flowe[0]
			fukuan_data_xxl.cc_id = copye.join();
		}
		//console.log(fukuan_data_xxl)
		fukuan_ajax_xxl();
		$(this).parent().parent().parent().remove();
		var num = $('.tanceng').children(".dialog_box").length;
		if(num < 1) {
			$(".tanceng").hide();
		}
	})

	function fukuan_ajax_xxl() {
		$.ajax({
			type: "post",
			url: SERVER_URL + "work-payment/add",
			dataType: 'json',
			data: fukuan_data_xxl,
			success: function(data) {
				if(data.code != 0) {
					console.log(data.msg)
				} else {
					alert(data.msg)
					renyuannums = []; //审批人
					csnumss = []; //抄送人
					console.log(data)
				}
			},
			error: function(e) {
				console.log(e)
			}
		});
	}
	//招聘
	var zhaopin_data_xxl = {
		token: token,
		uid:uid,
		company_id: companyid,//公司的id
		department_id:departmentid,//部门id
		job_name: '',//岗位名称
		job_need: '',//岗位要求
		entry_time: '',//入职时间
		job_des:'',//岗位描述
		job_file_url:'',//附件
		approval_id:'',//审批人id
		cc_id:'',//
		now_approval_id:'',//
		job_arr:'',
		job_num:'',
		todo_id:''
	}
	var zhaopin_html = '';
	var zps = 1;
	$('.zhaopinbtn').die().live('click', function() {
		zps++;
		if(zps > 5) {
			alert('一次最多只能添加5个哦')
			return
		}
		zhaopin_html = '<div class="zhaopinhtml zp_new_box"><div class="work_sp_fqsp_h3"> <h3 class="inline_block"><p>招聘需求<span class="c_r">(<cite class="zpnum">2</cite>)</span></p></h3><div class="work_fqsp_gb_img"> <img src="static/images/work_sp_gb.png" class="work_sp_gb"> </div></div><div class="t_textinput"> <div class="t_left"><i class="c_r">*</i>岗位名称</div> <div class="t_right"><input type="text" class="time_input zpgwmc_xxl" value="请输入岗位名称" onfocus="fn_focus(this);" onblur="fn_blur(this);"/></div> </div> <div class="t_textinput"> <div class="t_left"><i class="c_r">*</i>岗位要求</div> <div class="t_right"><input type="text" class="time_input zpgwyq_xxl" value="请输入岗位要求" onfocus="fn_focus(this);" onblur="fn_blur(this);" /></div> </div> <div class="t_textinput"> <div class="t_left"><i class="c_r">*</i>招聘人数</div> <div class="t_right"><input type="text" class="time_input zprs_xxl" value="请输入招聘人数" onfocus="fn_focus(this);" onblur="fn_blur(this);" onkeyup="checkInt(this);" onpaste="checkInt(this);" oncut="checkInt(this);" ondrop="checkInt(this);" onchange="checkInt(this);"/></div> </div> <div class="t_textinput"> <div class="t_left"><i class="c_r">*</i>到岗时间</div> <div class="t_right"><input class="time_input laydate-icon zpdgsj_xxl" value="选择日期" onfocus="fn_focus(this);" onblur="fn_blura(this);" style="cursor: pointer;" readonly="readonly" onclick="laydate({min: laydate.now()})"><i class="inp_time"/></div> </div> <div class="t_textinput t_textarea"> <div class="t_left"><i class="c_r v_hidden">*</i>岗位描述</div> <div class="t_right"><textarea class="txt_normal zpgwms_xxl" onfocus="fn_focus(this);" onblur="fn_blur(this);">请输入岗位或职责描述</textarea></div> </div><div class="t_textinput" style="height:auto;"><div class="t_left"><i class="c_r">*</i>添加附件</div><div class="t_right rightinput_box"><div class="attachfield_file_upload bxtjiafujian_box_xxl"></div><div class="attachfield_file_upload"><div class="attach_file_upload_btn"><div class="webuploader_container"><div class="text_ininput" style="position:relative;"><button class="filea but_icon"><i></i>添加附件<input type="file" class="bx_shangchuan_wenjianxxl" name="fileurl"/></button></div></div></div></div></div></div> <hr class="work_sp_hr"> </div>';
		
		$('#zp_html_xxl').append(zhaopin_html);
		for(var i = 1; i < $('.zhaopinhtml').length - 1; i++) {
			$('cite.zpnum').eq(i).html(i + 2)
		}

		$('.work_sp_gb').die().live('click', function() {

			$(this).parent().parent().parent().remove();
			//console.log($('.chuchai_xxl').length)
			zps = $('.zhaopinhtml').length - 1;
			if($('.zhaopinhtml').length - 1 == 2) {
				$('cite.zpnum').html(2)
			}
			var sccc = $('#zp_html_xxl').children();
			$.each(sccc, function(i,v) {
				sccc.eq(i).children().children('h3').children().children().children('cite').html(i+2);
			});
//			for(var i = 1; i < $('.zhaopinhtml').length - 1; i++) {
//				$('cite.zpnum').eq(i).html(i + 2)
//			}

		})
	})
	$('.tanceng .zhaopinbtn_xxl').die('click').live('click', function() {
		if($('.tanceng .zpgwmc_xxl_one').val()==''||$('.tanceng .zpgwmc_xxl_one').val()=='请输入岗位名称'){
			alert('请输入岗位名称');
			return false;
		}
		zhaopin_data_xxl.job_name = $('.tanceng .zpgwmc_xxl_one').val();
		if($('.tanceng .zpgwyq_xxl_one').val()==''||$('.tanceng .zpgwyq_xxl_one').val()=='请输入岗位要求'){
			alert('请输入岗位要求');
			return false;
		}
		zhaopin_data_xxl.job_need = $('.tanceng .zpgwyq_xxl_one').val();
		if($('.tanceng .zprs_xxl_one').val()==''||$('.tanceng .zprs_xxl_one').val()=='请输入招聘人数' ||isNaN($('.tanceng .zprs_xxl_one').val()) || $('.tanceng .zprs_xxl_one').val() <= 0){
			alert('请输入招聘人数');
			return false;
		}
		zhaopin_data_xxl.job_num = $('.tanceng .zprs_xxl_one').val();
		if(!DATE_FORMAT.test($('.tanceng .zpdgsj_xxl_one').val())){
			alert('请选择正确的到岗时间');
			return false;
		}
		zhaopin_data_xxl.entry_time = $('.tanceng .zpdgsj_xxl_one').val();
		if($('.tanceng .zpgwms_xxl_one').val()==''||$('.tanceng .zpgwms_xxl_one').val()=='请输入岗位或职责描述'){
			alert('请输入岗位或职责描述');
			return false;
		}
		zhaopin_data_xxl.job_des = $('.tanceng .zpgwms_xxl_one').val();
		if($('.tanceng .zpfj_xxl_one').val()==''||$('.tanceng .zpfj_xxl_one').val()=='请添加附件'){
			$('.tanceng .zpfj_xxl_one').val('')
		}
		zhaopin_data_xxl.job_file_url = $('.tanceng .zpfj_xxl_one').val();
		
		var zp_lists = [];
		//console.log($('.zhaopinhtml').length)
		var addfile = '';
		for(var i = 0; i < $('.tanceng .zhaopinhtml').length; i++) {
			addfile = '';
			if($('.tanceng .zpgwmc_xxl').eq(i).val() == '' || $('.tanceng .zpgwmc_xxl').eq(i).val() == '请输入岗位名称') {
				alert('请输入岗位名称');
				return false;
			} else if($('.tanceng .zpgwyq_xxl').eq(i).val() == '' || $('.tanceng .zpgwyq_xxl').eq(i).val() == '请输入岗位要求') {
				alert('请输入岗位要求')
				return false;
			} else if($('.tanceng .zprs_xxl').eq(i).val() == '' || $('.tanceng .zprs_xxl').eq(i).val() == '请输入招聘人数' || isNaN($('.tanceng .zprs_xxl').eq(i).val()) || $('.tanceng .zprs_xxl').eq(i).val() <= 0) {
				alert('请输入招聘人数:以正整数表达');
				return false;
			} else if(!DATE_FORMAT.test($('.tanceng .zpdgsj_xxl').eq(i).val())) {
				alert('请选择正确的到岗时间');
				return false;
			}
			if($('.tanceng .bxtjiafujian_box_xxl').eq(i).html() == '') {
				addfile = '';
			}else{
				 addfile = $('.tanceng .bxtjiafujian_box_xxl').eq(i).children().find('.attachfield_filename').html();
			}
			if($('.tanceng .zpgwms_xxl').eq(i).val() == '' || $('.tanceng .zpgwms_xxl').eq(i).val() == '请输入岗位或职责描述') {
				$('.tanceng .zpgwms_xxl').eq(i).val('')
			}
			zp_lists.push({
				'job_name': $('.tanceng .zpgwmc_xxl').eq(i).val(),
				'job_need': $('.tanceng .zpgwyq_xxl').eq(i).val(),
				'job_num': $('.tanceng .zprs_xxl').eq(i).val(),
				'entry_time': $('.tanceng .zpdgsj_xxl').eq(i).val(),
				'job_des': $('.tanceng .zpgwms_xxl').eq(i).val(),
				'job_file_url': addfile
			})
		}
		zhaopin_data_xxl.job_arr = JSON.stringify(zp_lists)
		//console.log(zp_lists)
//		if($('.tanceng .spr_add_xxl>li').length < 1) {
//			alert('请选择审批人')
//			return false;
//		}
		var flowf = [];
		$.each($('.tanceng .spr_add_xxl>li[userid]'), function(i, v) {
			flowf.push($(this).attr('userid'))
		});
		var copyf = [];
		$.each($('.tanceng .csr_add_xxl>li[userid]'), function(i, v) {
			copyf.push($(this).attr('userid'))
		});
		if($('.tanceng .zhixing_add_ren>li').length<1){
			alert('请选择执行人')
			return false;
		}
		var exea = [];
		$.each($('.tanceng .zhixing_add_ren>li[userid]'), function(i, v) {
			exea.push($(this).attr('userid'))
		});
		zhaopin_data_xxl.todo_id = exea.join();
		zhaopin_data_xxl.cc_id = copyf.join();
		//console.log(zhaopin_data_xxl)
		zhaopin_ajax_xxl()
		$(this).parent().parent().parent().remove();
		var num = $('.tanceng').children(".dialog_box").length;
		if(num < 1) {
			$(".tanceng").hide();
		}
	})

	function zhaopin_ajax_xxl() {
		$.ajax({
			type: "post",
			url: SERVER_URL + "work-job/add",
			dataType: 'json',
			data: zhaopin_data_xxl,
			success: function(data) {
				if(data.code != 0) {
					console.log(data.msg)
				} else {
					alert(data.msg)
					renyuannums = []; //审批人
					csnumss = []; //抄送人
					csnumssa = [] //执行人	
					console.log(data)
				}
			},
			error: function(e) {
				console.log(e)
			}
		});
	}
	
	var lizhi_data_xxl = {
		token: token,
		uid:uid,
		company_id: companyid,//公司的id
		department_id:departmentid,//部门id
		name: '',//姓名
		job_name: '',//岗位名字
		go_job_time: '',//入职日期
		away_reason: '',//离职原因
		away_job_time: '',//申请离职日期
		approval_id: '',
		cc_id:'',
		now_approval_id:''
	}
	$('.tanceng .lizhibtn_xxl').die('click').live('click', function() {
		lizhi_data_xxl.name = $('.lizhiname_xxl').val();
		lizhi_data_xxl.job_name = $('.lizhigwmc_xxl').val();
		lizhi_data_xxl.go_job_time = $('.ruzhiriqi_xxl').val();
		if(!DATE_FORMAT.test($('.lizhiriqi_xxl').val())) {
			alert('请选择离职日期')
			return false;
		}
		if($('.lizhiyy_xxl').val() == '' || $('.lizhiyy_xxl').val() == '请输入离职原因描述') {
			alert('请输入离职原因描述');
			return false;
		}
		lizhi_data_xxl.away_job_time = $('.lizhiriqi_xxl').val();
		lizhi_data_xxl.away_reason = $('.lizhiyy_xxl').val();
//		if($('.tanceng .spr_add_xxl>li').length < 1) {
//			alert('请选择审批人')
//			return false;
//		}
		var flowg = [];
		$.each($('.tanceng .spr_add_xxl>li[userid]'), function(i, v) {
			flowg.push($(this).attr('userid'))
		});
		var copyg = [];
		$.each($('.tanceng .csr_add_xxl>li[userid]'), function(i, v) {
			copyg.push($(this).attr('userid'))
		});
		//lizhi_data_xxl.approval_id = flowg.join();
		//lizhi_data_xxl.now_approval_id =flowg[0] 
		lizhi_data_xxl.cc_id = copyg.join();
		//console.log(lizhi_data_xxl)
		lizhi_ajax_xxl()
		$(this).parent().parent().parent().remove();
		var num = $('.tanceng').children(".dialog_box").length;
		if(num < 1) {
			$(".tanceng").hide();
		}
	})

	function lizhi_ajax_xxl() {
		$.ajax({
			type: "post",
			url: SERVER_URL + "work-away/add",
			dataType: 'json',
			data: lizhi_data_xxl,
			success: function(data) {
				if(data.code != 0) {
					console.log(data.msg)
				} else {
					alert(data.msg)
					renyuannums = []; //审批人
					csnumss = []; //抄送人
					console.log(data)
				}
			},
			error: function(e) {
				console.log(e)
			}
		});
	}
	//转正
	//$('.zztc_btn_xxl').die().live('click', function() {
//		$.ajax({
//			type: "post",
//			url: SERVER_URL + "/flow-apply/applyinfo",
//			dataType: 'json',
//			data: {
//				token: token
//			},
//			success: function(data) {
//				if(data.code != 0) {
//					console.log(data.msg)
//				} else {
//					console.log(data)
					
//				}
//			},
//			error: function(e) {
//				console.log(e)
//			}
//		});
	//})
	var zhuanzheng_data_xxl = {
		token: token,
		uid:uid,
		company_id: companyid,//公司的id
		department_id:departmentid,//部门id
		name: '',//名字
		job_name: '',//岗位名字
		go_job_time: '',//入职日期
		regular_reason: '',//申请转正描述
		regular_job_time: '',//申请转正日期
		approval_id: '',//审批人id
		cc_id:'',//抄送人id 
		now_approval_id:''
	}
	$('.tanceng .zztj_btn_xxl').die('click').live('click', function() {
		zhuanzheng_data_xxl.name = $('.zzname_xxl').val();
		zhuanzheng_data_xxl.job_name = $('.zzgwmc_xxl').val();
		zhuanzheng_data_xxl.go_job_time = $('.zzrzriqi_xxl').val();
		if($('.sqzzriqi_xxl').val()==''||$('.sqzzriqi_xxl').val()=='选择日期') {
			alert('请选择申请转正日期')
			return false;
		}
		if($('.zzsqly_xxl').val() == '' || $('.zzsqly_xxl').val() == '请输入转正申请描述') {
			alert('请输入转正申请描述');
			return false;
		}
		zhuanzheng_data_xxl.regular_job_time = $('.sqzzriqi_xxl').val();
		zhuanzheng_data_xxl.regular_reason = $('.zzsqly_xxl').val();
//		if($('.tanceng .spr_add_xxl>li').length < 1) {
//			alert('请选择审批人')
//			return false;
//		}
		var flowh = [];
		$.each($('.tanceng .spr_add_xxl>li[userid]'), function(i, v) {
			flowh.push($(this).attr('userid'))
		});
		var copyh = [];
		$.each($('.tanceng .csr_add_xxl>li[userid]'), function(i, v) {
			copyh.push($(this).attr('userid'))
		});
		//zhuanzheng_data_xxl.approval_id = flowh.join();
		//zhuanzheng_data_xxl.now_approval_id = flowh[0];
		zhuanzheng_data_xxl.cc_id = copyh.join();
		//console.log(zhuanzheng_data_xxl)
		zhuanzheng_ajax_xxl()
		$(this).parent().parent().parent().remove();
		var num = $('.tanceng').children(".dialog_box").length;
		if(num < 1) {
			$(".tanceng").hide();
		}
	})

	function zhuanzheng_ajax_xxl() {
		$.ajax({
			type: "post",
			url: SERVER_URL + "work-regular/add",
			dataType: 'json',
			data: zhuanzheng_data_xxl,
			success: function(data) {
				if(data.code != 0) {
					console.log(data.msg)
				} else {
					alert(data.msg)
					renyuannums = []; //审批人
					csnumss = []; //抄送人
					console.log(data)
				}
			},
			error: function(e) {
				console.log(e)
			}
		});
	}
	//调薪
	//$('.txtc_btn_xxl').die().live('click', function() {
//		$.ajax({
//			type: "post",
//			url: SERVER_URL + "flow-apply/applyinfo",
//			dataType: 'json',
//			data: {
//				token: token
//			},
//			success: function(data) {
//				if(data.code != 0) {
//					console.log(data.msg)
//				} else {
//					console.log(data)
					
//				}
//			},
//			error: function(e) {
//				console.log(e)
//			}
//		});
	//})
	var tiaoxin_data_xxl = {
		token: token,
		uid:uid,
		company_id: companyid,//公司的id
		department_id:departmentid,//部门id
		name: '',
		job_name: '',
		now_salary: '',//当前薪资
		to_salary: '',//调薪薪资
		to_salary_time: '',//调薪生效日期
		salary_reason: '',//调薪理由
		approval_id: '',
		cc_id: '',
		now_approval_id:''
	}
	$('.tanceng .txsq_btn_xxl').die('click').live('click', function() {
		tiaoxin_data_xxl.name = $('.txname_xxl').val();
		tiaoxin_data_xxl.job_name = $('.txgwmc_xxl').val();
		tiaoxin_data_xxl.now_salary = $('.txdqxz_xxl').val();
		if($('.txqwxz_xxl').val() == '' || $('.txqwxz_xxl').val() == '请输入调薪薪资') {
			alert('请输入调薪薪资')
			return false;
		}
		if(!DATE_FORMAT.test($('.txsxriqi_xxl').val())) {
			alert('请选择调薪日期')
			return false;
		}
		if($('.txsqly_xxl').val() == '' || $('.txsqly_xxl').val() == '请输入调薪理由') {
			alert('请输入调薪理由');
			return false;
		}
		tiaoxin_data_xxl.to_salary = $('.txqwxz_xxl').val();
		tiaoxin_data_xxl.to_salary_time = $('.txsxriqi_xxl').val();
		tiaoxin_data_xxl.salary_reason = $('.txsqly_xxl').val();
//		if($('.tanceng .spr_add_xxl>li').length < 1) {
//			alert('请选择审批人')
//			return false;
//		}
		var flowi = [];
		$.each($('.tanceng .spr_add_xxl>li[userid]'), function(i, v) {
			flowi.push($(this).attr('userid'))
		});
		var copyi = [];
		$.each($('.tanceng .csr_add_xxl>li[userid]'), function(i, v) {
			copyi.push($(this).attr('userid'))
		});
		//tiaoxin_data_xxl.approval_id = flowi.join();
		//tiaoxin_data_xxl.now_approval_id = flowi[0];
		tiaoxin_data_xxl.cc_id = copyi.join();
		//console.log(tiaoxin_data_xxl)
		tiaoxin_ajax_xxl()
		$(this).parent().parent().parent().remove();
		var num = $('.tanceng').children(".dialog_box").length;
		if(num < 1) {
			$(".tanceng").hide();
		}
	})

	function tiaoxin_ajax_xxl() {
		$.ajax({
			type: "post",
			url: SERVER_URL + "work-change-salary/add",
			dataType: 'json',
			data: tiaoxin_data_xxl,
			success: function(data) {
				if(data.code != 0) {
					console.log(data.msg)
				} else {
					alert(data.msg)
					renyuannums = []; //审批人
					csnumss = []; //抄送人
					console.log(data)
				}
			},
			error: function(e) {
				console.log(e)
			}
		});
	}
	$('.tanceng .cglx_main_list_xxl li').die().live('click',function(){
		$('.tanceng .cglx_xxl').attr('typeid',$(this).attr('typeid')).val($(this).text());
	})
	$('.tanceng .cg_zffs_list_xxl li').die().live('click',function(){
		$('.tanceng .cgmx_zffs_xxl').attr('typeid',$(this).attr('typeid'))
	})
	//办公采购
	var bangcg_data_xxl = {
		token: token,
		uid:uid,
		company_id: companyid,//公司的id
		department_id:departmentid,//部门id
		purchase_reason:'',//申请事由
		purchase_type: '',//采购类型（1,物品，2，办公，3，其他）
		buy_time: '',//期望交付日期
		name: '',//名称
		standard: '',//规格
		num: '',//数量
		price: '',//单价
		small_price: '',//小计总价
		total_price:'',//总价
		pay_type:'',//支付方式（1,汇款，2，现金，3，其他）
		remark:'',
		pic_url:'',
		approval_id: '',
		cc_id: '',
		now_approval_id:'',
		purchase_arr:''
	}

	var bgcg_html = '';
	var cj = 1;
	$('.cgmczjbtn_xxl').die().live('click', function() {
		cj++;
		if(cj > 5) {
			alert('一次最多只能添加5个哦')
			return
		}
		bgcg_html = '<div class="cgmx_html_xxl"><div class="work_sp_fqsp_h3"><h3 class="inline_block"><p>采购明细<span class="c_r">(<cite class="cjmx">2</cite>)</span></p></h3><div class="work_fqsp_gb_img"> <img src="static/images/work_sp_gb.png" class="work_sp_gb"> </div></div><div class="t_textinput"><div class="t_left"><i class="c_r">*</i>名称</div><div class="t_right"><input type="text" class="time_input cgmxmc_xxl" value="请输入名称" onfocus="fn_focus(this);" onblur="fn_blur(this);" /></div></div><div class="t_textinput"><div class="t_left"><i class="c_r">*</i>规格</div><div class="t_right"><input type="text" class="time_input cgmxgg_xxl" value="请输入规格" onfocus="fn_focus(this);" onblur="fn_blur(this);" /></div></div><div class="t_textinput"><div class="t_left"><i class="c_r">*</i>数量</div><div class="t_right"><input type="text" class="time_input cgmxsl_xxl" value="请输入数量" onfocus="fn_focus(this);" onblur="fn_blur(this);" onkeyup="checkInt(this);" onpaste="checkInt(this);" oncut="checkInt(this);" ondrop="checkInt(this);" onchange="checkInt(this);"/></div></div><div class="t_textinput"><div class="t_left"><i class="c_r">*</i>单价</div><div class="t_right"><input type="text" class="time_input cgmxdj_xxl" value="请输入单价" onfocus="fn_focus(this);" onblur="fn_blur(this);" onkeyup="checkP(this);" onpaste="checkP(this);" oncut="checkP(this);" ondrop="checkP(this);" onchange="checkP(this);"/></div></div><div class="t_textinput" style="height:50px;"><div class="t_left"><i class="c_r v_hidden">*</i>小计总价</div><div class="t_right"><input type="text" class="time_input cgmcxmoy_xxl" value="自动计算出价钱" readonly="true" /></div><p class="t_bottom c_9">如需采购多种产品，请点击“增加明细”</p></div></div>';
		$('#bgcg_html_add').append(bgcg_html);
		for(var i = 1; i < $('.cgmx_html_xxl').length - 1; i++) {
			$('cite.cjmx').eq(i).html(i + 2)
		}

		$('.work_sp_gb').die().live('click', function() {

			$(this).parent().parent().parent().remove();
			//console.log($('.chuchai_xxl').length)
			cj = $('.cgmx_html_xxl').length - 1;
			if($('.cgmx_html_xxl').length - 1 == 2) {
				$('cite.cjmx').html(2)
			}
			
			var sccc = $('#bgcg_html_add').children();
			$.each(sccc, function(i,v) {
				sccc.eq(i).children().children('h3').children().children().children('cite').html(i+2);
			});
//			for(var i = 1; i < $('.cgmx_html_xxl').length - 1; i++) {
//				$('cite.cjmx').eq(i).html(i + 2)
//			}

		})
	})

	$('.tanceng .bangcgbtn_xxl').die('click').live('click', function() {
		var purchase_arr = [];
		if($('.bgcg_sqsy_xxl').val() == '' || $('.bgcg_sqsy_xxl').val() == '请输入申请事由') {
			alert('请输入申请事由');
			return false;
		}
		if($('.cglx_xxl').val() == '请选择采购类型') {
			alert('请选择采购类型');
			return false;
		}
		if(!DATE_FORMAT.test($('.cgjfrq_xxl').val())) {
			alert('选择期望交付日期');
			return false;
		}
		for(var i = 0; i < $('.tanceng .cgmx_html_xxl').length; i++) {
			if($('.tanceng .cgmxmc_xxl').eq(i).val() == '' || $('.tanceng .cgmxmc_xxl').eq(i).val() == '请输入名称') {
				alert('请输入名称');
				return false;
			} else if($('.tanceng .cgmxgg_xxl').eq(i).val() == '' || $('.tanceng .cgmxgg_xxl').eq(i).val() == '请输入规格') {
				alert('请输入规格');
				return false;
			} else if($('.tanceng .cgmxsl_xxl').eq(i).val() == '' || $('.tanceng .cgmxsl_xxl').eq(i).val() == '请输入数量' || isNaN($('.tanceng .cgmxsl_xxl').eq(i).val()) || $('.tanceng .cgmxsl_xxl').eq(i).val() <= 0) {
				alert('请输入数量:必须是正整数');
				return false;
			} else if(!moys.test($('.tanceng .cgmxdj_xxl').eq(i).val())) {
				alert('请输入单价:只能输入数字，小数点后只能保留两位')
				return false;
			}
			purchase_arr.push({
				'name': $('.tanceng .cgmxmc_xxl').eq(i).val(),
				'standard': $('.tanceng .cgmxgg_xxl').eq(i).val(),
				'num': $('.tanceng .cgmxsl_xxl').eq(i).val(),
				'price': $('.tanceng .cgmxdj_xxl').eq(i).val(),
				'small_price': $('.tanceng .cgmcxmoy_xxl').eq(i).val()
			})
		}
		bangcg_data_xxl.name = purchase_arr[0].name;
		bangcg_data_xxl.standard = purchase_arr[0].standard;
		bangcg_data_xxl.num = purchase_arr[0].num;
		bangcg_data_xxl.price = purchase_arr[0].price;
		bangcg_data_xxl.small_price = purchase_arr[0].small_price;
		bangcg_data_xxl.purchase_arr = JSON.stringify(purchase_arr);
		//console.log(bangcg_data_xxl.purchase_arr)
		if($('.tanceng .cgmx_bz_xxl').val() == '' || $('.tanceng .cgmx_bz_xxl').val() == '请输入备注内容') {
			$('.tanceng .cgmx_bz_xxl').val('');
		}
//		if($('.img_src').attr('src') == '') {
//			$('.img_src').attr('src', '')
//		}
		bangcg_data_xxl.purchase_reason = $('.bgcg_sqsy_xxl').val();
		bangcg_data_xxl.purchase_type = $('.tanceng .cglx_xxl').attr('typeid');
		bangcg_data_xxl.buy_time = $('.cgjfrq_xxl').val();
		bangcg_data_xxl.total_price = $('.cgmx_max_num').val();
		bangcg_data_xxl.pay_type = $('.cgmx_zffs_xxl').val();
		bangcg_data_xxl.remark = $('.tanceng .cgmx_bz_xxl').val();
		var img_paths_cg = [];
		if($('.tanceng .img_warp').children('li').length==0){
			bangcg_data_xxl.pic_url = ''
		}else{
			$.each($('.tanceng .img_warp').children('li'), function(i,v) {
				//console.log($(this).children('img').attr('src'))
				img_paths_cg.push($(this).children('img').attr('imgurl'))
			});
		}
		bangcg_data_xxl.pic_url = img_paths_cg.join();
//		if($('.tanceng .spr_add_xxl>li').length < 1) {
//			alert('请选择审批人')
//			return false;
//		}
		var flowj = [];
		$.each($('.tanceng .spr_add_xxl>li[userid]'), function(i, v) {
			flowj.push($(this).attr('userid'))
		});
		var copyj = [];
		$.each($('.tanceng .csr_add_xxl>li[userid]'), function(i, v) {
			copyj.push($(this).attr('userid'))
		});
		///bangcg_data_xxl.approval_id = flowj.join();
		//bangcg_data_xxl.now_approval_id = flowj[0]
		bangcg_data_xxl.cc_id = copyj.join();
		//console.log(bangcg_data_xxl)
		bangcg_ajax_xxl()
		$(this).parent().parent().parent().remove();
		var num = $('.tanceng').children(".dialog_box").length;
		if(num < 1) {
			$(".tanceng").hide();
		}
	})

	function bangcg_ajax_xxl() {
		$.ajax({
			type: "post",
			url: SERVER_URL + "work-purchase/add",
			dataType: 'json',
			data: bangcg_data_xxl,
			success: function(data) {
				if(data.code != 0) {
					console.log(data.msg)
				} else {
					alert(data.msg)
					renyuannums = []; //审批人
					csnumss = []; //抄送人
					console.log(data)
				}
			},
			error: function(e) {
				console.log(e)
			}
		});
	}
	//物品领用
	var wupinly_data_xxl = {
		token: token,
		uid:uid,
		company_id: companyid,//公司的id
		department_id:departmentid,//部门id
		goods_name: '',//物品名称
		goods_use: '',//物品用途
		num: '',//数量
		goods_info: '',//领取详情
		pic_url: '',//
		file_url:'',//
		goods_arr:'',//物品名称,物品用途,数量JSON组
		approval_id:'',
		cc_id:'',
		now_approval_id:''
	}
	var wply_html = '';
	var wp = 1;
	$('.wupinadd_btn_xxl').die().live('click', function() {
		wp++;
		if(wp > 5) {
			alert('一次最多只能添加5个哦')
			return
		}
		wply_html = '<div class="wupinmx_html"><div class="work_sp_fqsp_h3"> <h3 class="inline_block"><p>物品明细<span class="c_r">(<cite class="wpjs">2</cite>)</span></p></h3> <div class="work_fqsp_gb_img"> <img src="static/images/work_sp_gb.png" class="work_sp_gb"> </div> </div> <div class="t_textinput"> <div class="t_left"><i class="c_r">*</i>物品名称</div> <div class="t_right"><input type="text" class="time_input wpmc_name_xxl" value="请输入物品名称" onfocus="fn_focus(this);" onblur="fn_blur(this);" /></div> </div><div class="t_textinput"> <div class="t_left"><i class="c_r">*</i>物品用途</div> <div class="t_right"><input type="text" class="time_input wpyt_yong_xxl" value="请输入物品用途" onfocus="fn_focus(this);" onblur="fn_blur(this);" /></div> </div> <div class="t_textinput"> <div class="t_left"><i class="c_r">*</i>物品数量</div> <div class="t_right"><input type="text" class="time_input wpsl_num_xxl" value="请输入物品数量" onfocus="fn_focus(this);" onblur="fn_blur(this);" onkeyup="checkInt(this);" onpaste="checkInt(this);" oncut="checkInt(this);" ondrop="checkInt(this);" onchange="checkInt(this);"/></div> </div>';
		$('#wplyhtml_add_xxl').append(wply_html);
		for(var i = 1; i < $('.wupinmx_html').length - 1; i++) {
			$('cite.wpjs').eq(i).html(i + 2)
		}

		$('.work_sp_gb').die().live('click', function() {

			$(this).parent().parent().parent().remove();
			//console.log($('.chuchai_xxl').length)
			wp = $('.wupinmx_html').length - 1;
			if($('.wupinmx_html').length - 1 == 2) {
				$('cite.wpjs').html(2)
			}
			
			var sccc = $('#wplyhtml_add_xxl').children();
			$.each(sccc, function(i,v) {
				sccc.eq(i).children().children('h3').children().children().children('cite').html(i+2);
			});
//			for(var i = 1; i < $('.wupinmx_html').length - 1; i++) {
//				$('cite.wpjs').eq(i).html(i + 2)
//			}

		})
	})
	$('.tanceng .wupinly_btn_xxl').die('click').live('click', function() {
		var wp_use = [];
		for(var i = 0; i < $('.tanceng .wupinmx_html').length; i++) {
			if($('.tanceng .wpmc_name_xxl').eq(i).val() == '' || $('.tanceng .wpmc_name_xxl').eq(i).val() == '请输入物品名称') {
				alert('请输入物品名称');
				return false;
			} else if($('.tanceng .wpyt_yong_xxl').eq(i).val() == '' || $('.tanceng .wpyt_yong_xxl').eq(i).val() == '请输入物品用途') {
				alert('请输入物品用途');
				return false;
			} else if($('.tanceng .wpsl_num_xxl').eq(i).val() == '' || $('.tanceng .wpsl_num_xxl').eq(i).val() == '请输入物品数量' || isNaN($('.tanceng .wpsl_num_xxl').eq(i).val()) || $('.tanceng .wpsl_num_xxl').eq(i).val() <= 0) {
				alert('请输入物品数量:必须是正整数喔！')
				return false;
			}
			wp_use.push({
				'goods_name': $('.tanceng .wpmc_name_xxl').eq(i).val(),
				'goods_use': $('.tanceng .wpyt_yong_xxl').eq(i).val(),
				'num': $('.tanceng .wpsl_num_xxl').eq(i).val()
			})
		}
		wupinly_data_xxl.goods_name = wp_use[0].goods_name;
		wupinly_data_xxl.goods_use = wp_use[0].goods_use;
		wupinly_data_xxl.num = wp_use[0].num;
		wupinly_data_xxl.goods_arr = JSON.stringify(wp_use);
		if($('.wplqxq_xxl').val() == '' || $('.wplqxq_xxl').val() == '请输入详情') {
			alert('请输入详情');
			return false;
		}
		wupinly_data_xxl.goods_info = $('.wplqxq_xxl').val();
//		if($('#work_fb_field').val() == '' || $('#work_fb_field').val() == '请添加附件') {
//			$('#work_fb_field').val('')
//		}
		if($('.tanceng .bxtjiafujian_box_xxl').html()==''){
			wupinly_data_xxl.file_url = '';
		}else{
			wupinly_data_xxl.file_url =$('.tanceng .bxtjiafujian_box_xxl').children().find('.attachfield_filename').html();
		}
		
		var img_paths_wps = [];
		if($('.tanceng .img_warp').children('li').length==0){
			wupinly_data_xxl.pic_url = ''
		}else{
			$.each($('.tanceng .img_warp').children('li'), function(i,v) {
				//console.log($(this).children('img').attr('src'))
				img_paths_wps.push($(this).children('img').attr('imgurl'))
			});
		}
		wupinly_data_xxl.pic_url = img_paths_wps.join();
//		if($('.tanceng .spr_add_xxl>li').length < 1) {
//			alert('请选择审批人')
//			return false;
//		}
		var flowk = [];
		$.each($('.tanceng .spr_add_xxl>li[userid]'), function(i, v) {
			flowk.push($(this).attr('userid'))
		});
		var copyk = [];
		$.each($('.tanceng .csr_add_xxl>li[userid]'), function(i, v) {
			copyk.push($(this).attr('userid'))
		});
		//wupinly_data_xxl.approval_id = flowk.join();
		//wupinly_data_xxl.now_approval_id = flowk[0]
		wupinly_data_xxl.cc_id = copyk.join();
		//console.log(wupinly_data_xxl)
		wupin_ajax_xxl()
		$(this).parent().parent().parent().remove();
		var num = $('.tanceng').children(".dialog_box").length;
		if(num < 1) {
			$(".tanceng").hide();
		}
	})

	function wupin_ajax_xxl() {
		$.ajax({
			type: "post",
			url: SERVER_URL + "work-goods/add",
			dataType: 'json',
			data: wupinly_data_xxl,
			success: function(data) {
				if(data.code != 0) {
					console.log(data.msg)
				} else {
					alert(data.msg)
					renyuannums = []; //审批人
					csnumss = []; //抄送人
					console.log(data)
				}
			},
			error: function(e) {
				console.log(e)
			}
		});
	}
	//公章
	var gongzhang_data_xxl = {
		token: token,
		uid:uid,
		company_id: companyid,//公司的id
		department_id:departmentid,//部门id
		seal_reason: '',//借公章事由
		seal_type: '',//公章类型，1公章，2合同章，3法人章,4财务章,5其他
		use_seal_time: '',//用章日期
		return_seal_time: '',//归还用章日期
		file_name: '',//文件名称
		file_num: '',//文件份数
		approval_id: '',//审批人id
		cc_id:'',
		now_approval_id:''
	}
	$('.tanceng .gzlx_mainlist_xxl li').die().live('click',function(){
		$('.tanceng .gzlx_xxl').attr('typeid',$(this).attr('typeid')).val($(this).text());
	})
	$('.tanceng .gongzhang_btn_xxl').die('click').live('click', function() {
		if($('.jgzsy_xxl').val() == '' || $('.jgzsy_xxl').val() == '请输入借公章事由') {
			alert('请输入借公章事由');
			return false;
		} else if($('.gzlx_xxl').val() == '' || $('.gzlx_xxl').val() == '公章') {
			alert('请输入公章类型');
			return false;
		} else if(!DATE_FORMAT.test($('.zongz_start_time').val())) {
			alert('请选择用章日期');
			return false;
		} else if(!DATE_FORMAT.test($('.yongz_end_time').val())) {
			alert('请选择归还日期');
			return false;
		} else if($('.gz_wjmc_xxl').val() == '' || $('.gz_wjmc_xxl').val() == '请输入所用公章文件名') {
			alert('请输入所用公章文件名')
			return false;
		} else if($('.gz_wjnum_xxl').val() == '' || $('.gz_wjnum_xxl').val() == '请输入所用公章份数' || isNaN($('.gz_wjnum_xxl').val()) || $('.gz_wjnum_xxl').val() <= 0) {
			alert('请输入所用公章份数:必须是正整数格式喔');
			return false;
		}
		gongzhang_data_xxl.seal_reason = $('.jgzsy_xxl').val();
		gongzhang_data_xxl.seal_type = $('.gzlx_xxl').attr('typeid');
		gongzhang_data_xxl.use_seal_time = $('.zongz_start_time').val();
		gongzhang_data_xxl.return_seal_time = $('.yongz_end_time').val();
		gongzhang_data_xxl.file_name = $('.gz_wjmc_xxl').val();
		gongzhang_data_xxl.file_num = $('.gz_wjnum_xxl').val();
//		if($('.tanceng .spr_add_xxl>li').length < 1) {
//			alert('请选择审批人')
//			return false;
//		}
		var flowl = [];
		$.each($('.tanceng .spr_add_xxl>li[userid]'), function(i, v) {
			flowl.push($(this).attr('userid'))
		});
		var copyl = [];
		$.each($('.tanceng .csr_add_xxl>li[userid]'), function(i, v) {
			copyl.push($(this).attr('userid'))
		});
		//gongzhang_data_xxl.approval_id = flowl.join();
		//gongzhang_data_xxl.now_approval_id = flowl[0]
		gongzhang_data_xxl.cc_id = copyl.join();
		//console.log(gongzhang_data_xxl)
		gongzhang_ajax_xxl()
		$(this).parent().parent().parent().remove();
		var num = $('.tanceng').children(".dialog_box").length;
		if(num < 1) {
			$(".tanceng").hide();
		}
	})

	function gongzhang_ajax_xxl() {
		$.ajax({
			type: "post",
			url: SERVER_URL + "work-seal/add",
			dataType: 'json',
			data: gongzhang_data_xxl,
			success: function(data) {
				if(data.code != 0) {
					console.log(data.msg)
				} else {
					alert(data.msg)
					renyuannums = []; //审批人
					csnumss = []; //抄送人
					console.log(data)
				}
			},
			error: function(e) {
				console.log(e)
			}
		});
	}
	//合同
	var hetong_data_xxl = {
		token: token,
		uid:uid,
		company_id: companyid,//公司的id
		department_id:departmentid,//部门id
		contract_number: '',//合同编号
		name: '',//合同名称
		start_time: '',//签约日期
		jia_company: '',//甲方单位名称
		jia_charge: '',//甲方负责人
		yi_company: '',//乙方单位名称
		yi_charge: '',//乙方负责人
		content: '',//内容
		pic_url: '',
		file_url: '',
		//approval_id: '',
		cc_id: '',
		contract_arr:''//内容的json集合
		//now_approval_id:''
	}

	var ht_html_xxl = '';
	var ht = 1;
	$('.tanceng .hetong_btn_xxl').die().live('click', function() {
		ht++;
		if(ht > 5) {
			alert('一次最多只能添加5个哦')
			return
		}
		if($('.htneirong_xxl').val() == '' || $('.htneirong_xxl').val() == '请输入合同内容') {
			$('.hetong_btn_xxl').attr('disabled', 'true')
			return false;
		}

		ht_html_xxl = '<div class="hetonghtml"><div class="work_sp_fqsp_h3"> <h3 class="inline_block"><p>合同内容<span class="c_r">(<cite class="htnum">2</cite>)</span></p></h3> <div class="work_fqsp_gb_img"> <img src="static/images/work_sp_gb.png" class="work_sp_gb"> </div> </div> <div class="t_textinput t_textarea"> <div class="t_left"><i class="c_r v_hidden">*</i>内容</div> <div class="t_right"><textarea class="txt_normal htneirong_xxl" onfocus="fn_focus(this);" onblur="fnkong(this);">请输入合同内容</textarea></div> </div>';
		$('#hetong_add_xxl').append(ht_html_xxl);
		for(var i = 1; i < $('.hetonghtml').length - 1; i++) {
			$('cite.htnum').eq(i).html(i + 2);
			if($('.htneirong_xxl').eq(i).val() == '' || $('.htneirong_xxl').eq(i).val() == '请输入合同内容') {
				$('.hetong_btn_xxl').attr('disabled', 'true')
				//return false;
			}
		}

		$('.work_sp_gb').die().live('click', function() {
			//alert(666)
			$(this).parent().parent().parent().remove();
			//console.log($('.chuchai_xxl').length)
			ht = $('.hetonghtml').length - 1;
			if($('.hetonghtml').length - 1 == 2) {
				$('cite.htnum').html(2)
			}
			var sccc = $('#hetong_add_xxl').children();
			$.each(sccc, function(i,v) {
				sccc.eq(i).children().children('h3').children().children().children('cite').html(i+2);
			});
//			for(var i = 1; i < $('.hetonghtml').length - 1; i++) {
//				$('cite.htnum').eq(i).html(i + 2)
//			}

		})
	})
	$('.tanceng .httijiao_btn_xxl').die('click').live('click', function() {
		if($('.htbh_xxl').val() == '' || $('.htbh_xxl').val() == '请输入合同编号') {
			alert('请输入合同编号');
			return false;
		} else if($('.htmc_xxl').val() == '' || $('.htmc_xxl').val() == '请输入合同名称') {
			alert('请输入合同名称')
			return false;
		} else if(!DATE_FORMAT.test($('.htqyriqi_xxl').val())) {
			alert('请选择签约日期')
			return false;
		} else if($('.ht_jfdwmc_xxl').val() == '' || $('.ht_jfdwmc_xxl').val() == '请输入甲方单位名称') {
			alert('请输入甲方单位名称')
			return false;
		} else if($('.ht_yfdwmc_xxl').val() == '' || $('.ht_yfdwmc_xxl').val() == '请输入乙方单位名称') {
			alert('请输入乙方单位名称');
			return false;
		}
		if($('.htjffzr_xxl').val() == '' || $('.htjffzr_xxl').val() == '请输入甲方负责人') {
			$('.htjffzr_xxl').val('')
		}
		if($('.htyffzr_xxl').val() == '' || $('.htyffzr_xxl').val() == '请输入乙方负责人') {
			$('.htyffzr_xxl').val('')
		}
		var ht_content = [];
		for(var i = 0; i < $('.tanceng .hetonghtml').length; i++) {
			if($('.htneirong_xxl').eq(i).val() == '' || $('.htneirong_xxl').eq(i).val() == '请输入合同内容') {
				ht_content.push({"content":''})
			} else {
				ht_content.push({"content":$('.htneirong_xxl').eq(i).val()})
			}
		}
		//console.log(ht_content)
		hetong_data_xxl.content = ht_content[0].content;
		hetong_data_xxl.contract_arr = JSON.stringify(ht_content);//ht_content.splice(1,ht_content.length)
		var img_paths_hts = [];
		if($('.tanceng .img_warp').children('li').length==0){
			hetong_data_xxl.pic_url = ''
		}else{
			$.each($('.tanceng .img_warp').children('li'), function(i,v) {
				//console.log($(this).children('img').attr('src'))
				img_paths_hts.push($(this).children('img').attr('imgurl'))
			});
		}
		hetong_data_xxl.pic_url = img_paths_hts.join();
//		if($('.htfj_xxl').val() == '' || $('.htfj_xxl').val() == '请添加附件') {
//			$('.htfj_xxl').val('')
//		}
		if($('.tanceng .bxtjiafujian_box_xxl').html()==''){
			hetong_data_xxl.file_url = '';
		}else{
			hetong_data_xxl.file_url =$('.tanceng .bxtjiafujian_box_xxl').children().find('.attachfield_filename').html();
		}
		hetong_data_xxl.contract_number = $('.htbh_xxl').val();
		hetong_data_xxl.name = $('.htmc_xxl').val();
		hetong_data_xxl.start_time = $('.htqyriqi_xxl').val();
		hetong_data_xxl.jia_company = $('.ht_jfdwmc_xxl').val();
		hetong_data_xxl.jia_charge = $('.htjffzr_xxl').val();
		hetong_data_xxl.yi_company = $('.ht_yfdwmc_xxl').val();
		hetong_data_xxl.yi_charge = $('.htyffzr_xxl').val();
		
//		if($('.tanceng .spr_add_xxl>li').length < 1) {
//			alert('请选择审批人')
//			return false;
//		}
		var flowm = [];
		$.each($('.tanceng .spr_add_xxl>li[userid]'), function(i, v) {
			flowm.push($(this).attr('userid'))
		});
		var copym = [];
		$.each($('.tanceng .csr_add_xxl>li[userid]'), function(i, v) {
			copym.push($(this).attr('userid'))
		});
		//hetong_data_xxl.flow = flowm.join();
		hetong_data_xxl.cc_id = copym.join();
		//console.log(hetong_data_xxl)
		hetong_ajax_xxl()
		$(this).parent().parent().parent().remove();
		var num = $('.tanceng').children(".dialog_box").length;
		if(num < 1) {
			$(".tanceng").hide();
		}
	})

	function hetong_ajax_xxl() {
		$.ajax({
			type: "post",
			url: SERVER_URL + "work-contract/add",
			dataType: 'json',
			data: hetong_data_xxl,
			success: function(data) {
				if(data.code != 0) {
					console.log(data.msg)
				} else {
					alert(data.msg)
					renyuannums = []; //审批人
					csnumss = []; //抄送人
					console.log(data)
				}
			},
			error: function(e) {
				console.log(e)
			}
		});
	}
	//普通审批
	var ptsp_data_xxl = {
		token: token,
		uid:uid,
		company_id: companyid,//公司的id
		department_id:departmentid,//部门id
		content: '',//申请内容
		info: '',//申请详情
		pic_url: '',
		file_url: '',
		approval_id:'',
		cc_id:'',
		now_approval_id:''
	}
	$('.tanceng .ptsp_btn_xxl').die('click').live('click', function() {
		if($('.tanceng .ptsp_sqnr_xxl').val() == '' || $('.tanceng .ptsp_sqnr_xxl').val() == '请输入申请内容') {
			alert('请输入申请内容');
			return false;
		} else if($('.tanceng .ptsp_sqxq_xxl').val() == '' || $('.tanceng .ptsp_sqxq_xxl').val() == '请输入申请详情') {
			alert('请输入申请详情');
			return false;
		}
		var img_paths_ptsps = [];
		if($('.tanceng .img_warp').children('li').length==0){
			ptsp_data_xxl.pic_url = ''
		}else{
			$.each($('.tanceng .img_warp').children('li'), function(i,v) {
				//console.log($(this).children('img').attr('src'))
				img_paths_ptsps.push($(this).children('img').attr('imgurl'))
			});
		}
		ptsp_data_xxl.pic_url = img_paths_ptsps.join();
//		if($('.ptsq_tjfj_xxl').val() == '' || $('.ptsq_tjfj_xxl').val() == '请添加附件') {
//			$('.ptsq_tjfj_xxl').val('')
//		}
		if($('.tanceng .bxtjiafujian_box_xxl').html()==''){
			ptsp_data_xxl.file_url = '';
		}else{
			ptsp_data_xxl.file_url =$('.tanceng .bxtjiafujian_box_xxl').children().find('.attachfield_filename').html();
		}
		ptsp_data_xxl.content = $('.tanceng .ptsp_sqnr_xxl').val();
		ptsp_data_xxl.info = $('.tanceng .ptsp_sqxq_xxl').val();
		
//		if($('.tanceng .spr_add_xxl>li').length < 1) {
//			alert('请选择审批人')
//			return false;
//		}
		var flown = [];
		$.each($('.tanceng .spr_add_xxl>li[userid]'), function(i, v) {
			flown.push($(this).attr('userid'))
		});
		var copyn = [];
		$.each($('.tanceng .csr_add_xxl>li[userid]'), function(i, v) {
			copyn.push($(this).attr('userid'))
		});
		//ptsp_data_xxl.approval_id = flown.join();
		ptsp_data_xxl.cc_id = copyn.join();
		//ptsp_data_xxl.now_approval_id = flown[0]
		//console.log(ptsp_data_xxl)
		ptsp_ajax_xxl();
		$(this).parent().parent().parent().remove();
		var num = $('.tanceng').children(".dialog_box").length;
		if(num < 1) {
			$(".tanceng").hide();
		}
	})

	function ptsp_ajax_xxl() {
		$.ajax({
			type: "post",
			url: SERVER_URL + "work-general/add",
			dataType: 'json',
			data: ptsp_data_xxl,
			success: function(data) {
				if(data.code != 0) {
					console.log(data.msg)
				} else {
					alert(data.msg)
					renyuannums = []; //审批人
					csnumss = []; //抄送人
					console.log(data)
				}
			},
			error: function(e) {
				console.log(e)
			}
		});
	}
	
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
//              console.log(data);
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
                return true;
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
$(".tanceng .bx_shangchuan_wenjianxxl").die().live("change", function () {
    ajaxSubmita($(this));
});

	

});