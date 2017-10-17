var token, tokenid,username;
token = Admin.get_token();
tokenid = Admin.get_uid();
username = window.localStorage.getItem('username');
//tokenid = 2;//对比自己的id审批意见-我
//username = '邢啸亮';
//SERVER_URL = 'http://192.168.0.167:9091/';
//SERVER_URL = 'http://192.168.0.167:9010/';
//token = '2017052516045457073-1-1';
var loginUserInfo = JSON.parse(localStorage.getItem('user_info'));
department_id = loginUserInfo['department_id'];
department_name=loginUserInfo['department_name'];
var zuofei='employee-contract/invalid',shanchu='employee-contract/del',yghtdaochu='/yuangong/daochu';
//if(loginUserInfo['company_admin'] != 1){
//	if(loginUserInfo.powerUrls.length==0){
//		$('.yght_zfs_btn').hide();
//		
//	}else{
//		var arr = loginUserInfo.powerUrls;//
//		if($.inArray(zuofei, arr)!=-1){
//			$('.yght_zfs_btn').show();
//		}else{
//			$('.yght_zfs_btn').hide();
//		}
//		
//		
//	}
//}
if(loginUserInfo['company_admin'] != 1){
						if(loginUserInfo.powerUrls.length==0){
							$('.daochu_yg').hide();
							
						}else{
							var arr = loginUserInfo.powerUrls;//
							if($.inArray(yghtdaochu, arr)!=-1){
								$('.daochu_yg').show();
							}else{
								$('.daochu_yg').hide();
							}
							
							
						}
					}


var yght_data_xxl = {
		token: token,
		thetype: '1', //1我发起的 2待我审批 3抄送我的
		keywords: '', //关键词（合同编号、销售报价单编号、客户名称、合同名称）
		page: '1',
		num: '10',
		status: '', //1审批中2未通过3已通过
		flow: '', //审核人
		uid: '', //创建人
		is_invalid: '', //是否作废：0正常1作废
		created_at: ''//创建日期：1升序2降序
	}

if ($('#left_button_61').attr('fromnotice') == 1) { // 当前是从消息过来的
    var curId = $('#left_button_61').attr('detailid');
    var secondName = $('#left_button_61').attr('secondmenu'); 
    $.each($('.tabtitle li'), function (i, v) {
        if (secondName == $.trim($('.tabtitle li').eq(i).text())) {
            //$('.tabtitle li').removeClass('tabhover').eq(i).addClass('tabhover');
            yght_data_xxl = {		// 初始化参数
                token: token,
                thetype: 2,
               keywords: '', //关键词（合同编号、销售报价单编号、客户名称、合同名称）
				page: '1',
				num: '10',
				status: '', //1审批中2未通过3已通过
				flow: '', //审核人
				uid: '', //创建人
				is_invalid: '', //是否作废：0正常1作废
				created_at: '',//创建日期：1升序2降序
                ids:curId
            };
            setTimeout(function(){
                $('.tabtitle li').eq(i).trigger('click'); // 触发相应子模块事件
                $('#left_button_61').attr({	 // 清空按钮的属性
                    'fromnotice': '',
                    'detailid': '',
                    'secondmenu': '',
                    'totable': ''
                });
            },100);
        }
    });
} else { // 当前不是从消息过来的，正常调取整个列表
    yght_list_ajax_xxl();
}

	// 定义查看项
var yght_xuanzckx = [{
		'index': null,
		'field': '审批状态'
	}, {
		'index': null,
		'field': '审核人'
	}, {
		'index': null,
		'field': '创建日期'
	}, {
		'index': null,
		'field': '创建人'
	}
];
	//补零
function Appendzero(obj) {
	if(obj < 10) return "0" + obj;
	else return obj;
}
function yght_list_ajax_xxl() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "employee-contract/list",
		data: yght_data_xxl,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg)
			} else {
				console.log(data)
				var yg_list = data['datalist'];
				$('.yght_list_nums_xxl').html(data.totalcount)
				if(yg_list.length == 0) {
					$('.yght_list_htmls_xxl').html('')
					var yght_err = '';
					yght_err += '<div class="no_data_box" ><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
					$('.yg_htlist_html_xxl').html(yght_err);
					$('.yght_fenye_list_xxl').css('display', 'none')
				} else {
					$('.yg_htlist_html_xxl').html('');
					$('.yght_fenye_list_xxl').css('display', 'block')
					var yg_listhtml = '';
					if(data.thetype == 1) {
						$.each(yg_list, function(i, v) {
							if(v.is_invalid == 1) {
								yg_listhtml += '<tr class="grey"><td><span class="voidIcon">作废</span></td>';
								yg_listhtml += '<td>' + likNullData(v.employee_sn) + '</td>';
								yg_listhtml += '<td>' + likNullData(v.name) + '</td>';
								yg_listhtml += '<td>' + likNullData(v.job_name) + '</td>';
								yg_listhtml += '<td>' + likNullData(v.unit_start_time)+'-'+likNullData(v.unit_end_time) + '</td>';
								yg_listhtml += '<td><span>' + likNullData(v.status_name) + '</span></td>';
								yg_listhtml += '<td>' + likNullData(v.flow_name) + '</td>';
								yg_listhtml += '<td>' + likNullData(v.created_at) + '</td>';
								yg_listhtml += '<td>' + likNullData(v.uname) + '</td>';
								yg_listhtml += '<td><button class="but_mix but_look r_sidebar_btn yght_chakan_btn" name="ht_yght_right" uid="' + v.id + '">查看</button><button class="but_mix1 but_grey1">编辑</button></td></tr>';
							} else {
								if(v.status == 1) {
									yg_listhtml += '<tr><td>' + Appendzero(i + 1) + '</td>';
									yg_listhtml += '<td>' + likNullData(v.employee_sn) + '</td>';
									yg_listhtml += '<td>' + likNullData(v.name) + '</td>';
									yg_listhtml += '<td>' + likNullData(v.job_name) + '</td>';
									yg_listhtml += '<td>' + likNullData(v.unit_start_time)+'-'+likNullData(v.unit_end_time) + '</td>';
									yg_listhtml += '<td><span class="c_y">' + likNullData(v.status_name) + '</span></td>';
									yg_listhtml += '<td>' + likNullData(v.flow_name) + '</td>';
									yg_listhtml += '<td>' + likNullData(v.created_at) + '</td>';
									yg_listhtml += '<td>' + likNullData(v.uname) + '</td>';
									yg_listhtml += '<td><button class="but_mix but_look r_sidebar_btn yght_chakan_btn" name="ht_yght_right" uid="' + v.id + '">查看</button><button class="but_mix but_r but_void yght_zfs_btn" uid="' + v.id + '">作废</button></td></tr>';
								} else if(v.status == 2) {
									yg_listhtml += '<tr><td>' + Appendzero(i + 1) + '</td>';
									yg_listhtml += '<td>' + likNullData(v.employee_sn) + '</td>';
									yg_listhtml += '<td>' + likNullData(v.name) + '</td>';
									yg_listhtml += '<td>' + likNullData(v.job_name) + '</td>';
									yg_listhtml += '<td>' + likNullData(v.unit_start_time)+'-'+likNullData(v.unit_end_time) + '</td>';
									yg_listhtml += '<td><span class="c_r">' + likNullData(v.status_name) + '</span></td>';
									yg_listhtml += '<td>' + likNullData(v.flow_name) + '</td>';
									yg_listhtml += '<td>' + likNullData(v.created_at) + '</td>';
									yg_listhtml += '<td>' + likNullData(v.uname) + '</td>';
									yg_listhtml += '<td><button class="but_mix but_look r_sidebar_btn yght_chakan_btn" name="ht_yght_right" uid="' + v.id + '">查看</button><button class="but_mix but_exit val_dialog yght_bj_btn" name="contact_member_exit" uid="' + v.id + '">编辑</button><button class="but_mix but_r but_void yght_zfs_btn" uid="' + v.id + '">作废</button></td></tr>';
								} else {
									yg_listhtml += '<tr><td>' + Appendzero(i + 1) + '</td>';
									yg_listhtml += '<td>' + likNullData(v.employee_sn) + '</td>';
									yg_listhtml += '<td>' + likNullData(v.name) + '</td>';
									yg_listhtml += '<td>' + likNullData(v.job_name) + '</td>';
									yg_listhtml += '<td>' + likNullData(v.unit_start_time)+'-'+likNullData(v.unit_end_time) + '</td>';
									yg_listhtml += '<td><span class="c_g">' + likNullData(v.status_name) + '</span></td>';
									yg_listhtml += '<td>' + likNullData(v.flow_name) + '</td>';
									yg_listhtml += '<td>' + likNullData(v.created_at) + '</td>';
									yg_listhtml += '<td>' + likNullData(v.uname) + '</td>';
									yg_listhtml += '<td><button class="but_mix but_look r_sidebar_btn yght_chakan_btn" name="ht_yght_right" uid="' + v.id + '">查看</button></td></tr>';
								}
							}

						});
					} else if(data.thetype == 2) {
						$.each(yg_list, function(i, v) {
							if(v.is_invalid == 1) {
								yg_listhtml += '<tr class="grey"><td><span class="voidIcon">作废</span></td>';
								yg_listhtml += '<td>' + likNullData(v.employee_sn) + '</td>';
								yg_listhtml += '<td>' + likNullData(v.name) + '</td>';
								yg_listhtml += '<td>' + likNullData(v.job_name) + '</td>';
								yg_listhtml += '<td>' + likNullData(v.unit_start_time)+'-'+likNullData(v.unit_end_time) + '</td>';
								yg_listhtml += '<td><span>' + likNullData(v.status_name) + '</span></td>';
								yg_listhtml += '<td>' + likNullData(v.flow_name) + '</td>';
								yg_listhtml += '<td>' + likNullData(v.created_at) + '</td>';
								yg_listhtml += '<td>' + likNullData(v.uname) + '</td>';
								yg_listhtml += '<td><button class="but_mix but_look r_sidebar_btn dwsp_yg_ckbtn_xxl" name="ht_yght_sqright" uid="' + v.id + '">查看</button><button class="but_mix but_grey1 r_sidebar_btn dwsp_yg_sp_btn_xxl" uid="' + v.id + '">审批</button></td></tr>';
							} else {
								if(v.status == 1) {
									yg_listhtml += '<tr><td>' + Appendzero(i + 1) + '</td>';
									yg_listhtml += '<td>' + likNullData(v.employee_sn) + '</td>';
									yg_listhtml += '<td>' + likNullData(v.name) + '</td>';
									yg_listhtml += '<td>' + likNullData(v.job_name) + '</td>';
									yg_listhtml += '<td>' + likNullData(v.unit_start_time)+'-'+likNullData(v.unit_end_time) + '</td>';
									yg_listhtml += '<td><span class="c_y">' + likNullData(v.status_name) + '</span></td>';
									yg_listhtml += '<td>' + likNullData(v.flow_name) + '</td>';
									yg_listhtml += '<td>' + likNullData(v.created_at) + '</td>';
									yg_listhtml += '<td>' + likNullData(v.uname) + '</td>';
									yg_listhtml += '<td><button class="but_mix but_look r_sidebar_btn dwsp_yg_ckbtn_xxl" name="ht_yght_sqright" uid="' + v.id + '">查看</button><button class="but_mix but_look val_dialog dwsp_yg_sp_btn_xxl" name="ht_yght_prevSP" uid="' + v.id + '">审批</button></td></tr>';
								} else if(v.status == 2) {
									yg_listhtml += '<tr><td>' + Appendzero(i + 1) + '</td>';
									yg_listhtml += '<td>' + likNullData(v.employee_sn) + '</td>';
									yg_listhtml += '<td>' + likNullData(v.name) + '</td>';
									yg_listhtml += '<td>' + likNullData(v.job_name) + '</td>';
									yg_listhtml += '<td>' + likNullData(v.unit_start_time)+'-'+likNullData(v.unit_end_time) + '</td>';
									yg_listhtml += '<td><span class="c_r">'+likNullData(v.status_name)+'</span></td>';
									yg_listhtml += '<td>' + likNullData(v.flow_name) + '</td>';
									yg_listhtml += '<td>' + likNullData(v.created_at) + '</td>';
									yg_listhtml += '<td>' + likNullData(v.uname) + '</td>';
									yg_listhtml += '<td><button class="but_mix but_look r_sidebar_btn dwsp_yg_ckbtn_xxl" name="ht_yght_sqright" uid="' + v.id + '">查看</button><button class="but_mix but_grey1 dwsp_yg_sp_btn_xxl" uid="' + v.id + '">审批</button></td></tr>';
								} else {
									yg_listhtml += '<tr><td>' + Appendzero(i + 1) + '</td>';
									yg_listhtml += '<td>' + likNullData(v.employee_sn) + '</td>';
									yg_listhtml += '<td>' + likNullData(v.name) + '</td>';
									yg_listhtml += '<td>' + likNullData(v.job_name) + '</td>';
									yg_listhtml += '<td>' + likNullData(v.unit_start_time)+'-'+likNullData(v.unit_end_time) + '</td>';
									yg_listhtml += '<td><span class="c_g">' + likNullData(v.status_name) + '</span></td>';
									yg_listhtml += '<td>' + likNullData(v.flow_name) + '</td>';
									yg_listhtml += '<td>' + likNullData(v.created_at) + '</td>';
									yg_listhtml += '<td>' + likNullData(v.uname) + '</td>';
									yg_listhtml += '<td><button class="but_mix but_look r_sidebar_btn dwsp_yg_ckbtn_xxl" name="ht_yght_sqright" uid="' + v.id + '">查看</button><button class="but_mix but_grey1 dwsp_yg_sp_btn_xxl" uid="' + v.id + '">审批</button></td></tr>';
								}
							}

						});
					} else {
						$.each(yg_list, function(i, v) {
							if(v.is_invalid == 1) {
								yg_listhtml += '<tr class="grey"><td><span class="voidIcon">作废</span></td>';
								yg_listhtml += '<td>' + likNullData(v.employee_sn) + '</td>';
								yg_listhtml += '<td>' + likNullData(v.name) + '</td>';
								yg_listhtml += '<td>' + likNullData(v.job_name) + '</td>';
								yg_listhtml += '<td>' + likNullData(v.unit_start_time)+'-'+likNullData(v.unit_end_time) + '</td>';
								yg_listhtml += '<td><span>' + likNullData(v.status_name) + '</span></td>';
								yg_listhtml += '<td>' + likNullData(v.flow_name) + '</td>';
								yg_listhtml += '<td>' + likNullData(v.created_at) + '</td>';
								yg_listhtml += '<td>' + likNullData(v.uname) + '</td>';
								yg_listhtml += '<td><button class="but_mix but_look r_sidebar_btn cswd_yg_ckbtn_xxl" name="ht_yght_csright" uid="' + v.id + '">查看</button></td></tr>';
							} else {
								if(v.status == 1) {
									yg_listhtml += '<tr><td>' + Appendzero(i + 1) + '</td>';
									yg_listhtml += '<td>' + likNullData(v.employee_sn) + '</td>';
									yg_listhtml += '<td>' + likNullData(v.name) + '</td>';
									yg_listhtml += '<td>' + likNullData(v.job_name) + '</td>';
									yg_listhtml += '<td>' + likNullData(v.unit_start_time)+'-'+likNullData(v.unit_end_time) + '</td>';
									yg_listhtml += '<td><span class="c_y">' + likNullData(v.status_name) + '</span></td>';
									yg_listhtml += '<td>' + likNullData(v.flow_name) + '</td>';
									yg_listhtml += '<td>' + likNullData(v.created_at) + '</td>';
									yg_listhtml += '<td>' + likNullData(v.uname) + '</td>';
									yg_listhtml += '<td><button class="but_mix but_look r_sidebar_btn cswd_yg_ckbtn_xxl" name="ht_yght_csright" uid="' + v.id + '">查看</button></td></tr>';
								} else if(v.status == 2) {
									yg_listhtml += '<tr><td>' + Appendzero(i + 1) + '</td>';
									yg_listhtml += '<td>' + likNullData(v.employee_sn) + '</td>';
									yg_listhtml += '<td>' + likNullData(v.name) + '</td>';
									yg_listhtml += '<td>' + likNullData(v.job_name) + '</td>';
									yg_listhtml += '<td>' + likNullData(v.unit_start_time)+'-'+likNullData(v.unit_end_time) +'</td>';
									yg_listhtml += '<td><span class="c_r">已拒绝</span></td>';
									yg_listhtml += '<td>' + likNullData(v.flow_name) + '</td>';
									yg_listhtml += '<td>' + likNullData(v.created_at) + '</td>';
									yg_listhtml += '<td>' + likNullData(v.uname) + '</td>';
									yg_listhtml += '<td><button class="but_mix but_look r_sidebar_btn cswd_yg_ckbtn_xxl" name="ht_yght_csright" uid="' + v.id + '">查看</button></td></tr>';
								} else {
									yg_listhtml += '<tr><td>' + Appendzero(i + 1) + '</td>';
									yg_listhtml += '<td>' + likNullData(v.employee_sn) + '</td>';
									yg_listhtml += '<td>' + likNullData(v.name) + '</td>';
									yg_listhtml += '<td>' + likNullData(v.job_name) + '</td>';
									yg_listhtml += '<td>' + likNullData(v.unit_start_time)+'-'+likNullData(v.unit_end_time) +'</td>';
									yg_listhtml += '<td><span class="c_g">' + likNullData(v.status_name) + '</span></td>';
									yg_listhtml += '<td>' + likNullData(v.flow_name) + '</td>';
									yg_listhtml += '<td>' + likNullData(v.created_at) + '</td>';
									yg_listhtml += '<td>' + likNullData(v.uname) + '</td>';
									yg_listhtml += '<td><button class="but_mix but_look r_sidebar_btn cswd_yg_ckbtn_xxl" name="ht_yght_csright" uid="' + v.id + '">查看</button></td></tr>';
								}
							}

						});
					}
					$('.yght_list_htmls_xxl').html(yg_listhtml)
					if(loginUserInfo['company_admin'] != 1){
						if(loginUserInfo.powerUrls.length==0){
							$('.yght_zfs_btn').hide();
							
						}else{
							var arr = loginUserInfo.powerUrls;//
							if($.inArray(zuofei, arr)!=-1){
								$('.yght_zfs_btn').show();
							}else{
								$('.yght_zfs_btn').hide();
							}
							
							
						}
					}
					
				}
				list_table_render_pagination(".yght_fenye_list_xxl", yght_data_xxl, yght_list_ajax_xxl, data["totalcount"], yg_list.length)
					likShow('#yg_tables_list_xxl', yght_xuanzckx, '#yght_xzlist_status_xxl', '#yg_xzckx_baocun_btn_xxl', '#yg_xzckx_huifmrs_btn_xxl');
			}
		},
		error: function(data) {
			console.log(data)
			var yght_err = '';
			yght_err += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
			$('.yg_htlist_html_xxl').html(yght_err);
			$('.yght_fenye_list_xxl').css('display', 'none')
		}
	});
}
yght_list_ajax_xxl()
	//不显示已作废
$('.yght_bxszf_btn_xxl').die().live('click', function() {
		if($(this).prop("checked")) {
			yght_data_xxl.is_invalid = 0;
			yght_list_ajax_xxl()
		} else {
			yght_data_xxl.is_invalid = '';
			yght_list_ajax_xxl()
		}
	})
	//切换列表
$.each($('.tabtitle li.yg_qieh_list_xxl'), function(i, v) {
	$(this).die().live('click', function() {
		$('.yght_list_htmls_xxl').attr('thetype',$(this).attr('thetype'));
		yght_data_xxl.thetype = $(this).attr('thetype')
		$('.yght_ssval_xxl').val('搜索合同编号/成员名称').css('color','rgb(204, 204, 204)');
		yght_data_xxl.keywords='';
		yght_list_ajax_xxl()
		if($(this).attr('thetype')=='1'){
			$('.yg_gjss_cjr_val_xxl').attr('readonly','readonly').val('').nextAll().hide().parent().css('background','#f5f5f5')
		}else{
			$('.yg_gjss_cjr_val_xxl').removeAttr('readonly').val('创建人').nextAll().show().parent().css('background','')
		}
		$('button[name="ht_yght_zkgjss"]').attr('thetype', $(this).attr('thetype'))
	})

});
$('button[name="ht_yght_zkgjss"]').die().live('click',function(){
	if($(this).text()=='隐藏高级搜索'){
		if($(this).attr('thetype')=='1'){
			$('.yg_gjss_cjr_val_xxl').attr('readonly','readonly').val('').nextAll().hide().parent().css('background','#f5f5f5')
		}else{
			$('.yg_gjss_cjr_val_xxl').removeAttr('readonly').val('创建人').nextAll().show().parent().css('background','')
		}
	}
})

//切换日期升降序
var yghtcjrq=0;
$('.yg_cjrq_sjpx_btn_xxl').die().live('click',function(){
	yghtcjrq++;
	if(yghtcjrq%2==0){
		yght_data_xxl.created_at = 1;
	}else{
		yght_data_xxl.created_at = 2;
	}
	yght_data_xxl.thetype = $('.yght_list_htmls_xxl').attr('thetype');
	yght_list_ajax_xxl()
})
//$('.yg_cjrq_sjpx_btn_xxl').toggle(function(){
//	$(this).children(".price_icon").removeClass("down").addClass("up");
//	yght_data_xxl.thetype = $(this).attr('thetype')
//	yght_data_xxl.created_at = 1;
//	yght_list_ajax_xxl()
//},function(){
//	$(this).children(".price_icon").removeClass("up").addClass("down");
//	yght_data_xxl.thetype = $(this).attr('thetype')
//	yght_data_xxl.created_at = 2;
//	yght_list_ajax_xxl()
//})
//作废
var yght_zf_data = {
	token: token,
	id: ''
}

function yght_zf_ajax_xxl() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "employee-contract/onstatus",
		data: yght_zf_data,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg)
			} else {
				//console.log(data)
				yght_list_ajax_xxl()
			}
		},
		error: function(e) {
			console.log(e)
		}
	});
}
$('.yght_zfs_btn').die().live('click', function() {
		yght_zf_data.id = $(this).attr('uid');
		//console.log(xsht_zf_data.id)
		yght_zf_ajax_xxl()
	})
$('.yg_ckzf_btn_xxl').die().live('click',function(){
	yght_zf_data.id = $(this).attr('uid');
	yght_zf_ajax_xxl()
	$('.yg_ck_genduo_btn_xxl').css('display', 'none')
})
	//刷新
$('.yg_djshuxin_btn_xxl').die().live('click', function() {
//		yght_data_xxl = {
//		token: token,
//		thetype: '1', //1我发起的 2待我审批 3抄送我的
//		keywords: '', //关键词（合同编号、销售报价单编号、客户名称、合同名称）
//		page: '1',
//		num: '10',
//		status: '', //1审批中2未通过3已通过
//		flow: '', //审核人
//		uid: '', //创建人
//		is_invalid: '', //是否作废：0正常1作废
//		created_at: ''//创建日期：1升序2降序
//	}
//		yght_list_ajax_xxl()
//		$('.yght_qhlist_menu_xxl li:first').addClass(' tabhover').siblings('li').removeClass('tabhover');
//		$('.select_p input.yg_gjss_shzt_val_xxl').val('审核状态').attr('style', '');
//		$('.select_p input.yg_gjss_shr_val_xxl').val('审核人').attr('style', '');
//		$('.select_p input.yg_gjss_cjr_val_xxl').val('创建人').attr('style', '');
	add_Rload_index(61,5)//参数页面值，父级值	
	})
	//搜索
//function yg_ht_ssnow(val) {
//	yght_data_xxl.keywords = val;
//	yght_list_ajax_xxl()
//}
$('.yght_ssbtn_xxxl').die().live('click', function() {
	if($('.yght_ssval_xxl').val() == '' || $('.yght_ssval_xxl').val() == '搜索合同编号/成员名称') {
		yght_data_xxl.keywords='';
	} else {
		yght_data_xxl.keywords = $('.yght_ssval_xxl').val();
		
	}
	yght_list_ajax_xxl();
})
//高级搜索
var yght_gjss_data = {
	token: token,
	big_type:'4',
	small_type:''// flow 审批人搜索 uid创建人搜索 
}

function yght_gjss_ajax() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "common/search",
		data: yght_gjss_data,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg)
			} else {
				var yglists = data['data'];
				var yght_shr = '',
					yght_cjr = '';
					//yght_shzt = '',
					
				$.each(yglists, function(i, v) {
					yght_shr += '<li flowid="' + v.id + '">' + v.name + '</li>';
					yght_cjr += '<li uid="' + v.id + '">' + v.name + '</li>';
					//yght_shzt += '<li status="' + v.status + '">' + v.status_name + '</li>';
					
				});
				$('.yght_shrlist_xxl').html(yght_shr)
				$('.yg_ht_cjrlist_xxl').html(yght_cjr)
				$(".select_list li").each(function() {
					var maxwidth = 6;
					if($(this).text().length > maxwidth) {
						$(this).text($(this).text().substring(0, maxwidth));
						$(this).html($(this).html() + '...');
					}
				});
			}
		},
		error: function(e) {

		}
	});
}
$('.yg_gjss_shr_val_xxl,.yg_gjss_shr_val_xxl+i').die().live('click',function(){
	yght_gjss_data.small_type='flow';
	yght_gjss_ajax()
})
$('.yg_gjss_cjr_val_xxl,.yg_gjss_cjr_val_xxl+i').die().live('click',function(){
	yght_gjss_data.small_type='uid';
	yght_gjss_ajax()
})

	//高级搜索

$('.yght_gjss_spztlist_xxl li').die().live('click', function() { //审批状态
		//console.log($(this).attr('statusid'))
		$('.yg_gjss_shzt_val_xxl').val($(this).text()).addClass('c_3')
		yght_data_xxl.status = $(this).attr('status');
		yght_list_ajax_xxl()
	})
	//审核人
$('.yght_shrlist_xxl li').die().live('click', function() {
	$('.yg_gjss_shr_val_xxl').val($(this).text()).addClass('c_3')
		yght_data_xxl.flow = $(this).attr('flowid');
		yght_list_ajax_xxl()
	})
	//创建人
$('.yg_ht_cjrlist_xxl li').die().live('click', function() {
	$('.yg_gjss_cjr_val_xxl').val($(this).text()).addClass('c_3')
		yght_data_xxl.uid = $(this).attr('uid');
		yght_list_ajax_xxl()
	})
	//查看我发起的
var yg_wfqd_ckxq_data = {
	token: token,
	id: ''
}

function yg_wfqd_ckxq_ajax() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "employee-contract/info",
		data: yg_wfqd_ckxq_data,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg)
			} else {
				console.log(data)
				if(data.data.is_invalid == 1 || data.data.status == 3 || data.data.status == 1) {
					$('.yg_ck_genduo_btn_xxl').css('display', 'none')
				} else {
					$('.yg_ck_genduo_btn_xxl').css('display', 'block')
				}
				$('.yg_ck_bjbtns_xxl').attr('uid', data.data.id)
				$('.yg_ckzf_btn_xxl').attr('uid', data.data.id)
				
				$('.yg_ckyulan_btn_xxl').attr({'uid':data.data.id,'htbh':data.data.employee_sn})
				$('.yg_tits_xxl').html(data.data.name);
				$('.yg_ck_cjrq_xxl').html(data.data.created_at)
				$('.yg_ck_cjr_xxl').html(data.data.uname)
				if(data.data.status == 3) {
					$('.yg_sp_pass_xxl').css('display', 'block')
				} else {
					$('.yg_sp_pass_xxl').css('display', 'none')
				}
				if(data.data.status == 2){
					$('.yg_sp_nopass_xxl').css('display', 'block')
				}else{
					$('.yg_sp_nopass_xxl').css('display', 'none')
				}
				$('.yg_wfqd_htbhs_xxl').html(likNullData(data.data.employee_sn))
				$('.yg_wfqd_htmcs_xxl').html(likNullData(data.data.name))
				$('.yght_wfqd_cyxm_xxl').html(likNullData(data.data.job_name))
				$('.yg_wfqd_htqx_xxl').html(likNullData(data.data.unit_start_time)+'-'+likNullData(data.data.unit_end_time))
				$('.yg_wfqds_shzt_xxl').html(likNullData(data.data.status_name))
				var flown_yg = []
				$.each(data.data.flow_info, function(i, v) {
					flown_yg.push(v.name)
				});
				$('.yg_wfqds_shr_xxl').html(flown_yg.join())
				
				if(data.data.check_log.length == 0) {
					$('.yg_wfqd_spyjlist_xxl_html').html('')
				} else {
					var fbyj_listhtml = '';
					fbyj_listhtml +='<div class="sq_look_check_box">';
					fbyj_listhtml +='<div class="xs_sp_result"><h3 class="cont_title" style="margin-left: 36px;">审批结果</h3></div>';
                    fbyj_listhtml +='<div class="work_spiliubox" style="margin-top:0;background: #fff;">';
                    $.each(data.data.check_log, function(i,v) {
                    	fbyj_listhtml +='<div class="work_spiliu">';
                        fbyj_listhtml +='<div class="work_spiliu_items" style="overflow: hidden;">';    
                        fbyj_listhtml +='<div class="left" style="position: relative;">';        
                        fbyj_listhtml +='<div class="work_spiliu_div">';            
                        fbyj_listhtml +='<img class="inline_block tx" src="'+getImgUrl(v.face)+'">';//static/images/touxiang.png  
                        //if(v.id == tokenid){
                        	//fbyj_listhtml +='<h3 class="work_sp_h3">我</h3>'; 
                        //}else{
                        	fbyj_listhtml +='<h3 class="work_sp_h3">'+likNullData(v.name)+'</h3>'; 
                        //}
                        if(data.data.current_check==1){
                        	
                        }else{
                        	if(i==0){
                        		
                        	}else{
                        		fbyj_listhtml +=' <span class="c_9 m_left_5">步骤'+(i)+'</span>';
                        	}
                        	  
                        }
                                     
                        fbyj_listhtml +='</div>';  
                        if(i==0){
                        	fbyj_listhtml +='<cite class="b_b"></cite>';  
                        }else{
                        	if(v.status==1){
                        		fbyj_listhtml +='<cite class="b_y"></cite>';  	
                        	}else if(v.status==2){
                        		fbyj_listhtml +='<cite class="b_r"></cite>';  	
                        	}else if(v.status==3){
                        		fbyj_listhtml +='<cite class="b_g"></cite>';
                        	}else if(v.status==0){
                        		fbyj_listhtml +='<cite class="b_h"></cite>';  	
                        	}
                        }
                                  
                        fbyj_listhtml +='</div>';        
                        fbyj_listhtml +='<div class="auto_height">';        
                        fbyj_listhtml +='<img src="static/images/work_jiantou.png">';            
                        fbyj_listhtml +='<div class="sp_cont">';            
                        fbyj_listhtml +='<div class="sp_cont_a">';
                        if(i==0){
                        	fbyj_listhtml +='<h3 class="f_color bold">发起审批</h3>'; 
                        	fbyj_listhtml +='<p class="c_9">'+likNullData(v.day)+'</p>';
                        	fbyj_listhtml +='</div>'; 
                        }else{
                        	if(v.status==1){
                        		fbyj_listhtml +='<h3 class="c_y">审批中</h3>'; 
                        		fbyj_listhtml +='</div>'; 
                        	}else if(v.status==2){
                        		fbyj_listhtml +='<h3 class="c_r">未通过</h3>'; 
                        		fbyj_listhtml +='<p class="c_9">'+likNullData(v.day)+'</p>'; 
                        		fbyj_listhtml +='</div>'; 
                        		fbyj_listhtml +='<p class="c_3 work_sp_p">'+likNullData(v.note)+'</p>';
                        	}else if(v.status==3){
                        		fbyj_listhtml +='<h3 class="c_g">通过审批</h3>'; 
                        		fbyj_listhtml +='<p class="c_9">'+likNullData(v.day)+'</p>'; 
                        		fbyj_listhtml +='</div>'; 
                        		fbyj_listhtml +='<p class="c_3 work_sp_p">'+likNullData(v.note)+'</p>';
                        	}else if(v.status==0){
                        		fbyj_listhtml +='<h3 class="c_c">待审批</h3>'; 
                        		fbyj_listhtml +='</div>'; 
                        	}
                        }
                        fbyj_listhtml +='</div>';            
                        fbyj_listhtml +='</div>';        
                        fbyj_listhtml +='<div style="clear: both;height: 0;font-size: 1px;line-height: 0px;"></div>';        
                        fbyj_listhtml +='</div>';    
                        fbyj_listhtml +='</div>';
                    });
                    fbyj_listhtml +='</div>';
                    fbyj_listhtml +='<div class="work_spiliubox" style="margin-top:0;background: #fff;">';
                    fbyj_listhtml +='<div class="work_spiliu work_spiliu_last">';
                    fbyj_listhtml +='<div class="work_spiliu_items" style="min-height: 19px!important;">';
                    fbyj_listhtml +='<div class="left" style="position: relative;height: 37px;">';        
                    fbyj_listhtml +='<cite class="b_h"></cite>';            
                    fbyj_listhtml +='</div>';        
                    fbyj_listhtml +='<div class="auto_height" style="min-height: 39px!important;"></div>';        
                    fbyj_listhtml +='<div style="clear: both;height: 0;font-size: 1px;line-height: 0px;"></div>';        
                    fbyj_listhtml +='</div></div></div>';    
					fbyj_listhtml +='</div>';
//					$.each(data.data.check_log, function(i, v) {
//						
//						yg_fbyj_listhtml += ' <div class="work_spiliu"><div class="work_spiliu_items"><div class="left" style="position: relative;">';
//
//						if(v.uid == tokenid) {
//							yg_fbyj_listhtml += '<img class="inline_block tx" src="' + v.face + '"><cite class="b_h"></cite></div>';
//							yg_fbyj_listhtml += '<div class="right auto_height"><img src="static/images/work_jiantou.png"><div class="sp_cont">';
//							yg_fbyj_listhtml += '<div><h3 class="c_3">我</h3><span class="c_9 m_left_5">' + likNullData(v.day) + '</span></div>';
//						} else {
//							yg_fbyj_listhtml += '<img class="inline_block tx" src="' + v.face + '"><cite class="b_y"></cite></div>';
//							yg_fbyj_listhtml += '<div class="right auto_height" ><img src="static/images/work_jiantou.png"><div class="sp_cont">';
//							yg_fbyj_listhtml += '<div><h3 class="c_3">' + likNullData(v.name) + '</h3><span class="c_9 m_left_5">' + likNullData(v.day) + '</span></div>';
//						}
//						if(i == 0) {
//							yg_fbyj_listhtml += '<h3 class=" f_color">发起审批</h3>';
//						} else {
//							if(v.status == 1) {
//								yg_fbyj_listhtml += '<h3 class="c_b" style="color:#f8ac59;">进行中</h3>';
//							} else if(v.status == 2) {
//								yg_fbyj_listhtml += '<h3 class="c_r" style="color:#ff6c60;">未通过</h3>'
//							} else {
//								yg_fbyj_listhtml += '<h3 class="c_g">通过审批</h3>';
//							}
//
//						}
//						yg_fbyj_listhtml += '<p class="c_3 work_sp_p">' + v.note + '</p></div></div><div style="clear: both;height: 0;font-size: 1px;line-height: 0px;"></div></div></div>'
//					});
					$('.yg_wfqd_spyjlist_xxl_html').html(fbyj_listhtml)
				}
				$(".tx").error(function(e) { //加入相应的图片类名
					$(this).attr("src", "static/images/touxiang.png");
				});

				$('.yg_ckbj_cjr_xxl').html(data.data.uname)
				$('.yg_ckbj_cjrqs_xxl').html(data.data.created_at)
				$('.yg_ckbjs_yghtbh_xxl').val(data.data.employee_sn).addClass('c_3');
				$('.yg_ckbj_xzhtmb_val_xxl').val(data.data.template_name).attr('uid', data.data.template_id).addClass('c_3');
				$('.yg_ckbj_yghtmc_xxl').val(data.data.name).addClass('c_3');
				$('.yg_ckbj_xzcy_val_xxl').val(data.data.job_name).attr('uid',data.data.job_id).addClass('c_3');
				$('.yg_ckbjs_tjsp_btn_xxl').attr('uid', data.data.id)
				
				$('.yg_ckbjs_qdsj_xxl').val(data.data.sign_time).addClass('c_3');
				$('.yg_ckbj_qddds_xxl').val(data.data.sign_address).addClass('c_3');
				$('.yg_ckbj_yrdw_xxl').val(data.data.people_unit).addClass('c_3');
				$('.yg_ckbj_htqx_stars_xxl').val(data.data.unit_start_time).addClass('c_3');
				$('.yg_ckbj_htqx_ends_xxl').val(data.data.unit_end_time).addClass('c_3');
				$('.yg_ckbj_syq_xxl').val(data.data.probation).addClass('c_3');
				$('.yg_ckbj_jbgzs_xxl').val(data.data.base_wage).addClass('c_3');
				$('.yg_ckbj_jxgz_xxl').val(data.data.perf_wage).addClass('c_3');
				$('.yg_ckbj_hjgz_xxl').val(data.data.sum_wage).addClass('c_3');
				
//				var cg_myspr = '';
//				$.each(data.data.flow_info, function(i, v) {
//					sp_rynum_yg.push(v.id);
//					cg_myspr += '<li userid="' + v.id + '"><i class="del_img_1">-</i><em class="icon_personBtn icon_personBtn_msg" style="background:url(' + v.face + ') no-repeat;"><i class="icon_personNext"></i></em><em class="icon_adderBtn"></em><p class="box_adderName">' + v.name + '</p> <p class="box_addermsg">步骤一</p></li>'
//				});
//				$('.tanceng .yg_spqian_list_xxl').before(cg_myspr)
//				$.each($('.tanceng .spr_add_xxl .box_addermsg'), function(i, v) {
//					$('.tanceng .spr_add_xxl .box_addermsg').eq(i).html(buzou[i])
//				});
				var mrcsrnum_yg = '';
				$.each(data.data.copy_info, function(i, v) {
					csnumss_yg.push(v.id)
					if(v.face==''||v.face==null||v.face==undefined){
						mrcsrnum_yg += '<li userid="' + v.id + '"><i class="del_img_1">-</i><em class="icon_personBtn icon_personBtn_msg"></em><em class="icon_adderBtn"></em><p class="box_adderName">' + v.name + '</p></li>';
					}else{
						mrcsrnum_yg += '<li userid="' + v.id + '"><i class="del_img_1">-</i><em class="icon_personBtn icon_personBtn_msg" style="background:url(' + v.face + ');border-radius:50%;"></em><em class="icon_adderBtn"></em><p class="box_adderName">' + v.name + '</p></li>';
					}
					
				});
				$('.tanceng .csr_add_xxl').prepend(mrcsrnum_yg)
			}
		},
		error: function(e) {
			console.log(e)
		}
	});
}
$('.yght_chakan_btn').die().live('click', function() {
		$('.yg_sp_pass_xxl').css('display', 'none')
		yg_wfqd_ckxq_data.id = $(this).attr('uid');
		yg_wfqd_ckxq_ajax()
		yg_wfqd_lsjl_data.id = $(this).attr('uid');
		yg_wfqd_lsjl_ajax()
	})
//	//查看内的编辑按钮
$('.yg_ck_bjbtns_xxl').die().live('click', function() {
	yg_wfqd_ckxq_ajax()
})
$('.yght_bj_btn').die().live('click', function() {
	xsht_huoquspr_ajax()
	yg_wfqd_ckxq_data.id = $(this).attr('uid')
	yg_wfqd_ckxq_ajax()
})
	//查看-预览按钮
$('.yg_ckyulan_btn_xxl').die().live('click', function() {
	$('.tanceng .daochu_yg').attr('htbh',$(this).attr('htbh'));
	$('.tanceng .yg_dwsp_ck_juejbtn_xxl').hide();
	$('.tanceng .yg_dwsp_ck_tongguo_btn_xxl').hide();
	//console.log($(this).attr('uid'))
	yght_ckyulan_data.id = $(this).attr('uid');
	yght_ckyulan_data.is_open = '1';
	yght_ckyulan_ajax()
})
var yght_ckyulan_data = {
		token: token,
		id: '',
		is_open:''//0 预览 1 提交预览
	}
	//数字转换大写
function intToChinese(str) {
	str = str + '';
	var len = str.length - 1;
	var idxs = ['', '十', '百', '千', '万', '十', '百', '千', '亿', '十', '百', '千', '万', '十', '百', '千', '亿'];
	var num = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
	return str.replace(/([1-9]|0+)/g, function($, $1, idx, full) {
		var pos = 0;
		if($1[0] != '0') {
			pos = len - idx;
			if(idx == 0 && $1[0] == 1 && idxs[len - idx] == '十') {
				return idxs[len - idx];
			}
			return num[$1[0]] + idxs[len - idx];
		} else {
			var left = len - idx;
			var right = len - idx + $1.length;
			if(Math.floor(right / 4) - Math.floor(left / 4) > 0) {
				pos = left - left % 4;
			}
			if(pos) {
				return idxs[pos] + num[$1[0]];
			} else if(idx + $1.length >= len) {
				return '';
			} else {
				return num[$1[0]]
			}
		}
	});
}

function yght_ckyulan_ajax() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "employee-contract/preview",
		data: yght_ckyulan_data,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg)
			} else {
				console.log(data)
				var yulanlist_yg = data['datalist'],
					a = '';
				$.each(yulanlist_yg, function(i, v) {
					a += likNullData(v);
				});
				$('.tanceng .yg_yulan_htmls_xxl').html(a)
				$('.tanceng .yg_sp_yulanhtml_xxl').html(a)
				var yulan_zdy_yg = data['customdatalist'],
					zdylist_yg = '';
				if(yulan_zdy_yg.length == 0) {
					return;
				} else {

					$.each(yulan_zdy_yg, function(i, v) {
						if(v.is_add=='1'){
							zdylist_yg += '<div class="ht_msg"><p class="f_color">' + intToChinese((i + 3)) + '、' + v.name + '</p><p class="f_color">' + v.content.replace(/\s+/g,'<br/>') + '</p></div>';
						}else if(v.is_add=='2'){
							zdylist_yg += '<div class="ht_msg "><p class="c_r">' + intToChinese((i + 3)) + '、' + v.name + '</p><p class="c_r">' + v.content.replace(/\s+/g,'<br/>') + '</p></div>';
						}else{
							zdylist_yg += '<div class="ht_msg"><p>' + intToChinese((i + 3)) + '、' + v.name + '</p><p>' + v.content.replace(/\s+/g,'<br/>') + '</p></div>';
						}
						//zdylist_yg += '<div class="ht_msg"><p>' + intToChinese((i + 3)) + '、' + v.name + '</p><p>' + v.content.replace(/\s+/g,'<br/>') + '</p></div>';
					});
					$('.tanceng .ht_msg_bottom').before(zdylist_yg)
				}
				
				

			}
		},
		error: function(e) {
			console.log(e)
		}
	});
}
//选择合同模板列表
var yght_mbdata_xxl = {
	token: token,
	thetype: '3',
	page: '1',
	num: '10',
	name: '',
	dept: '',
	uid: '',
	updated_uid: '',
	status:'0'
}

function yght_mbajax_list() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "contract-template/list",
		data: yght_mbdata_xxl,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg)
			} else {
				console.log(data)
				var mblist_yg = data['datalist']
				$('.yg_htmbnums_xxl').html(data['totalcount'])
				if(mblist_yg.length == 0) {
					$('.yg_htmn_listhtml_xxl').html('');
					var mblist_yg_err = ''
					mblist_yg_err += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
					$('.yg_htmb_errhtml_xxl').html(mblist_yg_err)
					$('.yg_htmb_fenye_htmlxxl').css('display', 'none')
				} else {
					$('.yg_htmb_errhtml_xxl').html('')
					$('.yg_htmb_fenye_htmlxxl').css('display', 'block')
					var yg_mb_list_htmls = ''
					$.each(mblist_yg, function(i, v) {
						yg_mb_list_htmls += '<tr><td><input type="radio" name="ht_cght_xzcghtmbinp" uid="' + v.id + '" isname="' + v.is_name + '" value="' + xxldatakong(v.name) + '" address="' + xxldatakong(v.address) + '" ></td>';
						yg_mb_list_htmls += '<td>' + likNullData(v.name) + '</td>';
						yg_mb_list_htmls += '<td>' + likNullData(v.type_name) + '</td>';
						yg_mb_list_htmls += '<td>' + likNullData(v.dept_name) + '</td>';
						yg_mb_list_htmls += '<td>' + likNullData(v.created_at) + '</td>';
						yg_mb_list_htmls += '<td>' + likNullData(v.create_name) + '</td>';
						yg_mb_list_htmls += '<td>' + likNullData(v.updated_at) + '</td>';
						yg_mb_list_htmls += '<td>' + likNullData(v.updated_name) + '</td>';
						yg_mb_list_htmls += '</tr>';
					});
					$('.yg_htmn_listhtml_xxl').html(yg_mb_list_htmls);
					list_table_render_pagination(".yg_htmb_fenye_htmlxxl", yght_mbdata_xxl, yght_mbajax_list, data["totalcount"], mblist_yg.length)
				}
			}
		},
		error: function(e) {
			console.log(e)
			var mblist_yg_err = ''
			mblist_yg_err += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
			$('.yg_htmb_errhtml_xxl').html(mblist_yg_err)
			$('.yg_htmb_fenye_htmlxxl').css('display', 'none')
		}
	});
}
$('.tanceng .yg_ckbj_xzhtmb_btn_xxl').die().live('click', function() {
	yght_mbajax_list()
})

function yg_xzmb_ssnow_xxl(val) {
	yght_mbdata_xxl.name = val;
	yght_mbajax_list()
}

$('.yg_mbss_btn_xxl').die().live('click', function() {
	if($('.yg_sshtmb_val_xxl').val() == '' || $('.yg_sshtmb_val_xxl').val() == '搜索合同模板名称') {
		return false;
	} else {
		yght_mbdata_xxl.name = $('.yg_sshtmb_val_xxl').val();
		yght_mbajax_list()
	}
})
$('.tanceng .yg_xzhtmb_qued_btn_xxl').die('click').live('click', function() {
	if($('.tanceng input:radio[name="ht_cght_xzcghtmbinp"]:checked').length==0){
		alert('请选择合同模板');
		return false;
	}
		var radioA_yg = $('.tanceng input:radio[name="ht_cght_xzcghtmbinp"]:checked');
		//console.log(radioA_yg.attr('uid'))
		$('.tanceng .yg_ckbj_xzhtmb_val_xxl').attr('uid', radioA_yg.attr('uid'))
		if(radioA_yg.attr('isname') == 1) {
			$('.tanceng .yg_ckbj_xzhtmb_val_xxl').val(radioA_yg.val()).css('color', '#333')
			$('.tanceng .yg_ckbj_yghtmc_xxl').val(radioA_yg.val()).attr({
				'disabled': 'disabled',
				'Names': radioA_yg.val()
			}).css('color', '#333')
		} else {
			$('.tanceng .yg_ckbj_xzhtmb_val_xxl').val(radioA_yg.val()).css('color', '#333')
			$('.tanceng .yg_ckbj_yghtmc_xxl').val(radioA_yg.val()).removeAttr('disabled')
		}
		$('.tanceng .yg_xj_xzhtmb_valxxl').attr('uid', radioA_yg.attr('uid'))
		if(radioA_yg.attr('isname') == 1) {
			$('.tanceng .yg_xj_xzhtmb_valxxl').val(radioA_yg.val()).css('color', '#333')
			$('.tanceng .yg_xj_htmcs_xxl').val(radioA_yg.val()).attr({
				'disabled': 'disabled',
				'Names': radioA_yg.val()
			}).css('color', '#333')
		} else {
			$('.tanceng .yg_xj_xzhtmb_valxxl').val(radioA_yg.val()).css('color', '#333')
			$('.tanceng .yg_xj_htmcs_xxl').val(radioA_yg.val()).removeAttr('disabled')
		}
		$('.tanceng .yg_xj_qddd_xxl').val(radioA_yg.attr('address')).css('color', '#333')
		$(this).parent().parent().parent().remove();
		var num = $('.tanceng').children(".dialog_box").length;
		if(num < 1) {
			$(".tanceng").hide();
		}
	})
	//取消选择模板弹层
$('.tanceng .yg_bj_quxiao_btn_xxl').live('click', function() {
		$(this).parent().parent().parent().remove();
		var num = $('.tanceng').children(".dialog_box").length;
		if(num < 1) {
			$(".tanceng").hide();
		}
	})
	//取消编辑弹层
$('.tanceng .bjht_yg_quxiao_btn_xxl').live('click', function() {
		$(this).parent().parent().parent().remove();
		var num = $('.tanceng').children(".dialog_box").length;
		if(num < 1) {
			$(".tanceng").hide();
		}
	})

	//新建员工合同
	//获取当前时间
function p(s) {
	return s < 10 ? '0' + s : s;
}

var myDate = new Date();
//获取当前年
var year = myDate.getFullYear();
//获取当前月
var month = myDate.getMonth() + 1;
//获取当前日
var date = myDate.getDate();
var h = myDate.getHours(); //获取当前小时数(0-23)
var m = myDate.getMinutes(); //获取当前分钟数(0-59)
var s = myDate.getSeconds();
var now = year + '-' + p(month) + "-" + p(date) + " " + p(h) + ':' + p(m) + ":" + p(s);
var nowss = year + '-' + p(month) + "-" + p(date);
// 验证手机号 
function isPhoneNo(phone) {
	var pattern = /^1[34578]\d{9}$/;
	return pattern.test(phone);
}
var xsht_huoquspr_data = {
	token:token,
	category:'3',//类别(1合同管理,2采购,3借入借出)
	thetype:'2'//2(1销售合同,2采购合同,3员工合同,4其他合同,5采购报价单,6采购退换货）
}
function xsht_huoquspr_ajax(){
	$.ajax({
		type:"get",
		url:SERVER_URL+"approval/person",
		dataType:'json',
		data:xsht_huoquspr_data,
		success:function(data){
			if(data.code!=0){
				console.log(data)
			}else{
				console.log(data);
				var splist = data['data'],sphtml='';
				//console.log(splist)
				if(data.is_across==1){
					if(splist.length==0){
						//return false;
						sphtml +='<li>没有设置审批人</li>';
					}else{
						$.each(splist, function(i,v) {
						if(v.face==''||v.face==null){
							sphtml +='<li userid="' +v.id+ '"><em class="icon_personBtn icon_personBtn_msg"></em><em class="icon_adderBtn"></em><p class="box_adderName">'+v.name+'</p></li>';
						}else{
							sphtml +='<li userid="' +v.id+ '"><em class="icon_personBtn icon_personBtn_msg" style="background-image:url('+getImgUrl(v.face)+');border-radius:50%;"></em><em class="icon_adderBtn"></em><p class="box_adderName">'+v.name+'</p></li>';
						}
						
					});
					}
					
				}else{
					if(splist.length==0){
						//return false;
						sphtml +='<li>没有设置审批人</li>';
					}else{
						$.each(splist, function(i,v) {
						if(v.face==''||v.face==null){
							sphtml +='<li userid="' +v.uid+ '"><em class="icon_personBtn icon_personBtn_msg"><i class="icon_personNext"></i></em><em class="icon_adderBtn"></em><p class="box_adderName">'+v.name+'</p></li>';
						}else{
							sphtml +='<li userid="' +v.uid+ '"><em class="icon_personBtn icon_personBtn_msg" style="background-image:url('+getImgUrl(v.face)+');border-radius:50%;"><i class="icon_personNext"></i></em><em class="icon_adderBtn"></em><p class="box_adderName">'+v.name+'</p></li>';
						}
						
					});
					}
					
				}
				$('.tanceng .spr_add_xxl').html(sphtml).children('li:last').children('.icon_personBtn_msg').children('i').remove();
			}
		},
		error:function(data){
			console.log(data)
		}
	});
}

$('.yg_xinjian_btn_xxl').die().live('click', function() {
	
	xsht_huoquspr_ajax()
	$('.tanceng .yg_xj_qdrq_xxl').val(nowss)
	$('.tanceng .yg_xj_cjrq_xxl').html(now)
	$.ajax({
		type: "get",
		url: SERVER_URL + "admin/autoload",
		data: {
			token: token,
			args: 'YHT'
		},
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg)
			} else {
				console.log(data)
				$('.tanceng .yg_xj_htbhs_xxl').val(data.data)
				$('.tanceng .yg_xj_cjr_xxl').html(username)
			}
		},
		error: function(e) {
			console.log(e)
		}
	});
	//公司信息列表
	$.ajax({
		type: "get",
		url: SERVER_URL + "company/list",
		data: {
			token: token
		},
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg)
			} else {
				console.log(data)
				var dwlist = data.data.dataList,dwhtml='';
				if(dwlist.length==0){
					var errhtml = '<li>对不起,没有公司信息呢</li>';
					$('.tanceng .yght_xzyongrendanwei_listxxl').html(errhtml)
				}else{
					$.each(dwlist, function(i,v) {
						dwhtml +='<li uid="'+v.company_id+'">'+likNullData(v.name)+'</li>'
					});
					$('.tanceng .yght_xzyongrendanwei_listxxl').html(dwhtml)
				}
				//$('.tanceng .yg_xj_yrdw_xxl').val(data.data.name)
				//$('.tanceng .yght_xzyongrendanwei_listxxl').html()
			}
		},
		error: function(e) {
			alert('获取公司信息失败')
		}
	});
})
$('.tanceng .yght_xzyongrendanwei_listxxl>li').die().live('click',function(){
	$('.tanceng .yg_xj_yrdw_xxl').val($(this).text()).attr('uid',$(this).attr('uid')).addClass('c_3');
})
$('.tanceng .yg_xj_xzhtmb_btn_xxl').die().live('click', function() {
	yght_mbajax_list()
})
var DATE_FORMAT = /^[0-9]{4}-[0-1]?[0-9]{1}-[0-3]?[0-9]{1}$/; //日期

$('.tanceng .yg_xinjian_tjspbtn_xxl').die('click').live('click', function() {
		yg_add_datas_xxl.id = '';
		yg_add_datas_xxl.is_open = '1';
		yg_add_datas_xxl.employee_sn = $('.tanceng .yg_xj_htbhs_xxl').val();
		if(typeof($('.tanceng .yg_xj_xzhtmb_valxxl').attr('uid')) == "undefined") {
			alert('请选择合同模板')
			return false;
		}
		if($('.tanceng .yg_xj_yrdw_xxl').val()==''){
			alert('用人单位不能为空');
			return false;
		}
		if($('.tanceng .yg_xj_htmcs_xxl').val() == '') {
			alert('请输入合同名称或不能为空');
			return false;
		}
		yg_add_datas_xxl.template_id = $('.tanceng .yg_xj_xzhtmb_valxxl').attr('uid');
		yg_add_datas_xxl.name = $('.tanceng .yg_xj_htmcs_xxl').val();
		
		if(typeof($('.tanceng .yg_xj_xzcy_xxl').attr('uid')) == "undefined") {
			alert('请选择成员')
			return false;
		}
		yg_add_datas_xxl.job_id = $('.tanceng .yg_xj_xzcy_xxl').attr('uid');
		yg_add_datas_xxl.sign_time = $('.tanceng .yg_xj_qdrq_xxl').val();
		yg_add_datas_xxl.sign_address = $('.tanceng .yg_xj_qddd_xxl').val();
		yg_add_datas_xxl.people_unit = $('.tanceng .yg_xj_yrdw_xxl').val();
		if(DATE_FORMAT.test($('.tanceng .yg_xj_kssj_xxl').val())) {
			yg_add_datas_xxl.unit_start_time = $('.tanceng .yg_xj_kssj_xxl').val();
		} else {
			alert('抱歉，您输入的开始日期格式有误，开始时间-正确格式应为2012-01-01');
			return false;
		}
		if(DATE_FORMAT.test($('.tanceng .yg_xj_jzrq_xxl').val())) {
			yg_add_datas_xxl.unit_end_time = $('.tanceng .yg_xj_jzrq_xxl').val();
		} else {
			alert('抱歉，您输入的截至日期格式有误，开始时间-正确格式应为2012-01-01');
			return false;
		}
		if($('.tanceng .yg_xj_syq_xxl').val() == '') {
			alert('请输入试用日期-以数字表示')
			return false;
		} else if(!isNaN($('.tanceng .yg_xj_syq_xxl').val()) && $('.tanceng .yg_xj_syq_xxl').val() > 0) {
			yg_add_datas_xxl.probation = $('.tanceng .yg_xj_syq_xxl').val();
		} else {
			alert('请输入试用日期-以正整数表示')
			return false;
		}
		if($('.tanceng .yg_xj_jbgz_xxl').val()==''){
			alert('请输入基本工资')
			return false;
		}else if($('.tanceng .yg_xj_jxgz_xxl').val()==''){
			alert('请输入绩效工资')
			return false;
		}
		yg_add_datas_xxl.base_wage = $('.tanceng .yg_xj_jbgz_xxl').val();
		yg_add_datas_xxl.perf_wage = $('.tanceng .yg_xj_jxgz_xxl').val();
		yg_add_datas_xxl.sum_wage = $('.tanceng .yg_xj_hjgz_xxl').val();
		var flowhtxj_yg = [];
		$.each($('.tanceng .spr_add_xxl>li[userid]'), function(i, v) {
			flowhtxj_yg.push($(this).attr('userid'))
		});
		if(flowhtxj_yg.length==0){
			alert('没有审批人员')
			return false;
		}
		var copyxsxj_yg = [];
		$.each($('.tanceng .csr_add_xxl>li[userid]'), function(i, v) {
			copyxsxj_yg.push($(this).attr('userid'))
		});
		yg_add_datas_xxl.flow = flowhtxj_yg.join();//
		yg_add_datas_xxl.copy_list = copyxsxj_yg.join();
		console.log(yg_add_datas_xxl)
		yg_add_ajaxs_xxl()
		$(this).parent().parent().parent().remove();
		var num = $('.tanceng').children(".dialog_box").length;
		if(num < 1) {
			$(".tanceng").hide();
		}
	})
	//新建合同
var yg_add_datas_xxl = {
		token: token,
		id: '',
		employee_sn: '', //采购合同编号
		template_id: '', //选择合同模板id
		name: '', //采购合同名称
		sign_time: '', //签订日期
		sign_address: '', //签订地点
		job_id: '', //入职成员id
		people_unit: '', //用人单位
		unit_start_time: '', //合同开始日期
		unit_end_time: '', //合同结束日期
		probation: '', //试用期
		base_wage: '', //基本工资
		perf_wage: '', //绩效工资
		sum_wage: '', //合计工资
		flow: '', //审批人
		copy_list: '',
		job_name:'',//成员姓名
		is_open:''
	}

function yg_add_ajaxs_xxl() {
	$.ajax({
		type: "post",
		url: SERVER_URL + "employee-contract/add",
		data: yg_add_datas_xxl,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg)
			} else {
				console.log(data)
				if(data.is_open!=0){
					yght_list_ajax_xxl()
					yght_ckyulan_data.is_open = '1';
				}else{
					$('.tanceng').append($(".dialog_box[name='ht_member_pre']").parent().html()).show();
					$(".tanceng .dialog_box").show();
			        $(".dialog_box[name='ht_member_pre']").css({
			            "z-index": "1",
			            "position": "absolute"
			        });
			        $('.tanceng .yg_dwsp_ck_juejbtn_xxl').hide();
			         $('.tanceng .yg_dwsp_ck_tongguo_btn_xxl').hide();
					yght_ckyulan_data.id = data.id;
					yght_ckyulan_data.is_open = '0';
					yght_ckyulan_ajax()
				}
				
			}
		},
		error: function(e) {
			console.log(e)
		}
	});
}
//员工合同新建预览按钮
$('.tanceng .yght_xjyunlan_btnxxl').die().live('click',function(){
	yg_add_datas_xxl.id = '';
		yg_add_datas_xxl.is_open = '0';
		yg_add_datas_xxl.employee_sn = $('.tanceng .yg_xj_htbhs_xxl').val();
		if(typeof($('.tanceng .yg_xj_xzhtmb_valxxl').attr('uid')) == "undefined") {
			alert('请选择合同模板')
			return false;
		}
		if($('.tanceng .yg_xj_htmcs_xxl').val() == '') {
			alert('请输入合同名称或不能为空');
			return false;
		}
		yg_add_datas_xxl.template_id = $('.tanceng .yg_xj_xzhtmb_valxxl').attr('uid');
		yg_add_datas_xxl.name = $('.tanceng .yg_xj_htmcs_xxl').val();
		
		if(typeof($('.tanceng .yg_xj_xzcy_xxl').attr('uid')) == "undefined") {
			alert('请选择成员')
			return false;
		}
		yg_add_datas_xxl.job_id = $('.tanceng .yg_xj_xzcy_xxl').attr('uid');
		yg_add_datas_xxl.sign_time = $('.tanceng .yg_xj_qdrq_xxl').val();
		yg_add_datas_xxl.sign_address = $('.tanceng .yg_xj_qddd_xxl').val();
		yg_add_datas_xxl.people_unit = $('.tanceng .yg_xj_yrdw_xxl').val();
		if(DATE_FORMAT.test($('.tanceng .yg_xj_kssj_xxl').val())) {
			yg_add_datas_xxl.unit_start_time = $('.tanceng .yg_xj_kssj_xxl').val();
		} else {
			alert('抱歉，您输入的开始日期格式有误，开始时间-正确格式应为2012-01-01');
			return false;
		}
		if(DATE_FORMAT.test($('.tanceng .yg_xj_jzrq_xxl').val())) {
			yg_add_datas_xxl.unit_end_time = $('.tanceng .yg_xj_jzrq_xxl').val();
		} else {
			alert('抱歉，您输入的截至日期格式有误，开始时间-正确格式应为2012-01-01');
			return false;
		}
		if($('.tanceng .yg_xj_syq_xxl').val() == '') {
			alert('请输入试用日期-以数字表示')
			return false;
		} else if(!isNaN($('.tanceng .yg_xj_syq_xxl').val()) && $('.tanceng .yg_xj_syq_xxl').val() > 0) {
			yg_add_datas_xxl.probation = $('.tanceng .yg_xj_syq_xxl').val();
		} else {
			alert('请输入试用日期-以正整数表示')
			return false;
		}
		if($('.tanceng .yg_xj_jbgz_xxl').val()==''){
			alert('请输入基本工资')
			return false;
		}else if($('.tanceng .yg_xj_jxgz_xxl').val()==''){
			alert('请输入绩效工资')
			return false;
		}
		yg_add_datas_xxl.base_wage = $('.tanceng .yg_xj_jbgz_xxl').val();
		yg_add_datas_xxl.perf_wage = $('.tanceng .yg_xj_jxgz_xxl').val();
		yg_add_datas_xxl.sum_wage = $('.tanceng .yg_xj_hjgz_xxl').val();
		var flowhtxj_yg = [];
		$.each($('.tanceng .spr_add_xxl>li[userid]'), function(i, v) {
			flowhtxj_yg.push($(this).attr('userid'))
		});
		if(flowhtxj_yg.length==0){
			alert('没有审批人员')
			return false;
		}
		var copyxsxj_yg = [];
		$.each($('.tanceng .csr_add_xxl>li[userid]'), function(i, v) {
			copyxsxj_yg.push($(this).attr('userid'))
		});
		yg_add_datas_xxl.flow =flowhtxj_yg.join();//
		yg_add_datas_xxl.copy_list = copyxsxj_yg.join();
		//console.log(yg_add_datas_xxl)
		yg_add_ajaxs_xxl()
//		$(this).parent().parent().parent().remove();
//		var num = $('.tanceng').children(".dialog_box").length;
//		if(num < 1) {
//			$(".tanceng").hide();
//		}
})
//编辑合同-提交审批
$('.tanceng .yg_ckbjs_tjsp_btn_xxl').die().live('click', function() {
		yg_add_datas_xxl.id = $(this).attr('uid');
		yg_add_datas_xxl.is_open = '1';
		yg_add_datas_xxl.employee_sn = $('.tanceng .yg_ckbjs_yghtbh_xxl').val();
		if(typeof($('.tanceng .yg_ckbj_xzhtmb_val_xxl').attr('uid')) == "undefined") {
			alert('请选择合同模板')
			return false;
		}
		if($('.tanceng .yg_ckbj_yghtmc_xxl').val() == '') {
			alert('请输入合同名称或不能为空');
			return false;
		}
		yg_add_datas_xxl.template_id = $('.tanceng .yg_ckbj_xzhtmb_val_xxl').attr('uid');
		yg_add_datas_xxl.name = $('.tanceng .yg_ckbj_yghtmc_xxl').val();
		
		if(typeof($('.tanceng .yg_ckbj_xzcy_val_xxl').attr('uid')) == "undefined") {
			alert('请选择成员')
			return false;
		}
		yg_add_datas_xxl.job_id = $('.tanceng .yg_ckbj_xzcy_val_xxl').attr('uid');
		yg_add_datas_xxl.sign_time = $('.tanceng .yg_ckbjs_qdsj_xxl').val();
		yg_add_datas_xxl.sign_address = $('.tanceng .yg_ckbj_qddds_xxl').val();
		yg_add_datas_xxl.people_unit = $('.tanceng .yg_ckbj_yrdw_xxl').val();
		if(DATE_FORMAT.test($('.tanceng .yg_ckbj_htqx_stars_xxl').val())) {
			yg_add_datas_xxl.unit_start_time = $('.tanceng .yg_ckbj_htqx_stars_xxl').val();
		} else {
			alert('抱歉，您输入的开始日期格式有误，开始时间-正确格式应为2012-01-01');
			return false;
		}
		if(DATE_FORMAT.test($('.tanceng .yg_ckbj_htqx_ends_xxl').val())) {
			yg_add_datas_xxl.unit_end_time = $('.tanceng .yg_ckbj_htqx_ends_xxl').val();
		} else {
			alert('抱歉，您输入的截至日期格式有误，开始时间-正确格式应为2012-01-01');
			return false;
		}
		if($('.tanceng .yg_ckbj_syq_xxl').val() == '') {
			alert('请输入试用日期-以数字表示')
			return false;
		} else if(!isNaN($('.tanceng .yg_ckbj_syq_xxl').val()) && $('.tanceng .yg_ckbj_syq_xxl').val() > 0) {
			yg_add_datas_xxl.probation = $('.tanceng .yg_ckbj_syq_xxl').val();
		} else {
			alert('请输入试用日期-以正整数表示')
			return false;
		}
		if($('.tanceng .yg_ckbj_jbgzs_xxl').val()==''){
			alert('请输入基本工资')
			return false;
		}else if($('.tanceng .yg_ckbj_jxgz_xxl').val()==''){
			alert('请输入绩效工资')
			return false;
		}
		yg_add_datas_xxl.base_wage = $('.tanceng .yg_ckbj_jbgzs_xxl').val();
		yg_add_datas_xxl.perf_wage = $('.tanceng .yg_ckbj_jxgz_xxl').val();
		yg_add_datas_xxl.sum_wage = $('.tanceng .yg_ckbj_hjgz_xxl').val();
		var flowhtbj_yg = [];
		$.each($('.tanceng .spr_add_xxl>li[userid]'), function(i, v) {
			flowhtbj_yg.push($(this).attr('userid'))
		});
		if(flowhtbj_yg.length==0){
			alert('请选择审批人员')
			return false;
		}
		var copybj_yg = [];
		$.each($('.tanceng .csr_add_xxl>li[userid]'), function(i, v) {
			copybj_yg.push($(this).attr('userid'))
		});
		yg_add_datas_xxl.flow = flowhtbj_yg.join();;
		yg_add_datas_xxl.copy_list = copybj_yg.join();
		console.log(yg_add_datas_xxl)
		yg_add_ajaxs_xxl()
		$(this).parent().parent().parent().remove();
		var num = $('.tanceng').children(".dialog_box").length;
		if(num < 1) {
			$(".tanceng").hide();
		}
	})





//审批人员
function tree_list_person(datalist, deep) {
	var html = '';
	$.each(datalist, function(index, data) {
		var html_i_list_before = '<i class="list_before_span"></i>';
		html += '<ul class="ul1">';
		for(var j = 0; j < deep; j++) {
			html_i_list_before += '<i class="list_before_span"></i>'
		}
		html += '<li class="left_1" cussortid = "' + data["id"] + '">' + html_i_list_before + '<span class="icon_open"></span><span class="icon_file"></span><span class="list_msg">' + data['name'] + '</span></li>';
		html += '<ul class="ul3">';
		if(data['children'] && data['children'].length > 0) {
			html += tree_list_person(data['children'], deep + 1);
		}
		$.each(data['user_info'], function(index2, data2) {
			var html_i_list_before = '<i class="list_before_span"></i>';
			for(var j = 0; j < deep + 1; j++) {
				html_i_list_before += '<i class="list_before_span"></i>'
			}
			if(data2.is_sign_contact=='2'){
				return;
			}else{
				html += '<li class="left_2 person_left_nav" userinfoid="' + data2['id'] + '">' + html_i_list_before + '<span class="list_msg">' + data2['name'] + ' </span></li>';
			}
			
		})

		html += '</li>';
		html += '</ul>';
		html += '</ul>'
	});
	return html
}
function yght_xzry_listajax(){
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
			datalists = data.rows; //jiaojierenyuan
			var deep = 0;
			//				$('.jiaojierenyuan').html(tree_list_person(datalists, deep));
			$('.spcy_tree_xxl').html(tree_list_person(datalists, deep));
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
$('.val_dialogTop[name="ht_yght_people_cy"]').die().live('click',function(){
	yght_xzry_listajax()
})

//审批人员操作
var sp_rynum_yg = [];
var buzou = ['步骤一', '步骤二', '步骤三', '步骤四', '步骤五']
$('.tanceng .yg_spry_qued_btn_xxl').die().live('click', function() {

		if($('.tanceng .spr_add_xxl').children('li').length < 4) {
			sp_rynum_yg = []
		}
		var trues = $.inArray($('.tanceng .spcy_tree_xxl li.on').attr('userinfoid'), sp_rynum_yg);
		//alert(sp_rynum_yg)
		if(trues != -1) {
			alert('重复了')
		} else {
			if($('.tanceng .spr_add_xxl').children().length > 5) {
				alert('最多只能添加3位喔！')
			} else {
				$('.tanceng .yg_spqian_list_xxl').before('<li userid="' + $('.spcy_tree_xxl li.on').attr('userinfoid') + '"><i class="del_img_1">-</i><em class="icon_personBtn icon_personBtn_msg"><i class="icon_personNext"></i></em><em class="icon_adderBtn"></em><p class="box_adderName">' + $('.spcy_tree_xxl li.on').children('span.list_msg').html() + '</p> <p class="box_addermsg">步骤一</p></li>');
				//$('.tanceng .chuchai_spr')
				sp_rynum_yg.push($('.tanceng .spcy_tree_xxl li.on').attr('userinfoid'));
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
		sp_rynum_yg.splice($.inArray($(this).parent().attr('userid'), sp_rynum_yg), 1);
		$.each($('.spr_add_xxl .box_addermsg'), function(i, v) {
			$('.spr_add_xxl .box_addermsg').eq(i).html(buzou[i])
		});
	})
	//抄送人员
function tree_list_choose_dept_person(datalist, deep) {
	var html = '';
	$.each(datalist, function(index, data) {
		var html_i_list_before = '<i class="list_before_span"></i>';
		html += '<ul class="ul1">';
		for(var j = 0; j < deep; j++) {
			html_i_list_before += '<i class="list_before_span"></i>'
		}
		html += '<li class="left_1" deptchosenid = "' + data["id"] + '">' + html_i_list_before + '<span class="icon_open change_ba"></span><span class="icon_file"></span><span class="list_msg">' + data['name'] + '</span><span class="list_check"><em></em></span></li>';
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
$('.tanceng .val_dialogTop[name="ht_yght_peoples"]').die().live('click', function() {
	$('.csr_renwulist_xxl_yg').html('')
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
				var touburenyuans = '<li class="left_all"><span class="icon_open change_ba"></span><span class="icon_file"></span><span class="list_msg">所有分类(4)</span><span class="list_check"><em></em></span></li>';
				var deep = 0;
				$('.csr_list_xxl').html(touburenyuans + tree_list_choose_dept_person(data.rows, deep))

			}
		},
		error: function(data) {

		}
	});
})
$('.tanceng .csr_list_xxl ul .person_left_nav').die().live('click', function() {
	var notli = $('.tanceng .csr_list_xxl ul .person_left_nav').not($(this))
	$(this).toggle(function() {
			$('.tanceng .csr_renwulist_xxl_yg').append('<li rid="' + $(this).attr('userinfoid') + '"><span>' + $(this).children('.list_msg').html() + '</span><i class="list_choose_delete"></i></li>')
			$(this).find('span.list_check em').addClass('on')
			$(this).addClass('on')
			notli.removeClass('on')
		}, function() {
			$('.csr_renwulist_xxl_yg').find('li[rid=' + $(this).attr('userinfoid') + ']').remove()
			$(this).find('span.list_check em').removeClass('on')
		})
		//	$(this).trigger('click')
		//console.log($(this).attr('aid'))
		//console.log($(this).children('.list_msg').html())

})
$('.list_choose_delete').die().live('click', function() {
	$(this).parent().remove();
	$('.tanceng .csr_list_xxl ul .person_left_nav[userinfoid=' + $(this).parent().attr('rid') + ']').removeClass('on').find('span.list_check em').removeClass('on')
})
var csnumss_yg = []
$('.tanceng .yg_csr_qud_btn_xxl').die('click').live('click', function() {
		if($('.tanceng .csr_renwulist_xxl_yg li').length < 1) {
			alert('请选择人员')
			return
		} else {

			if($('.tanceng .csr_add_xxl').children('li').length < 3) {
				csnumss_yg = []
			}
			var truess = $.inArray($('.csr_renwulist_xxl_yg li').attr('rid'), csnumss_yg);
			if(truess != -1) {
				alert('重复了')
			} else {
				$.each($('.tanceng .csr_renwulist_xxl_yg li'), function(i, v) {
						csnumss_yg.push($(this).attr('rid'));
						if($('.tanceng .csr_add_xxl').children().length > 4) {
							alert('最多只能添加3位哦')
						} else {
							$('.tanceng .csr_add_xxl').prepend('<li userid="' + $(this).attr('rid') + '"><i class="del_img_1">-</i><em class="icon_personBtn icon_personBtn_msg"></em><em class="icon_adderBtn"></em><p class="box_adderName">' + $(this).children('span').html() + '</p></li>')
						}

					})
					//alert(csnumss_yg)
			}
			//alert(csnumss_yg)
		}
		$('.csr_renwulist_xxl_yg').html('')
		$(this).parent().parent().parent().remove();
		var num = $('.tanceng').children(".dialog_box").length;
		if(num < 1) {
			$(".tanceng").hide();
		};
	})
	//删除数组中的一位
$('.tanceng .del_img_1').die().live('click', function() {
	csnumss_yg.splice($.inArray($(this).parent().attr('userid'), csnumss_yg), 1);
})

//选择成员
$('.tanceng .yg_xzcy_btnqd_xxl').die('click').live('click', function() {
		//console.log($('.tanceng .spcy_tree_xxl li.on').attr('userinfoid'),$('.tanceng .spcy_tree_xxl li.on').children('span.list_msg').html())
		var yg_cyuid = $('.tanceng .spcy_tree_xxl li.on').attr('userinfoid'),
			yg_cymc = $('.tanceng .spcy_tree_xxl li.on').children('span.list_msg').html();
		$('.tanceng .yg_ckbj_xzcy_val_xxl').val(yg_cymc).attr('uid', yg_cyuid).css('color', '#333');
		$('.tanceng .yg_xj_xzcy_xxl').val(yg_cymc).attr('uid', yg_cyuid).css('color', '#333');
		$(this).parent().parent().parent().remove();
		var num = $('.tanceng').children(".dialog_box").length;
		if(num < 1) {
			$(".tanceng").hide();
		}
	})


//待我审批
var yg_dwsp_data_ck_xxl = {
	token: token,
	id: ''
}

function yg_dwsp_ck_ajax_xxl() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "employee-contract/info",
		data: yg_dwsp_data_ck_xxl,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg)
			} else {
				console.log(data)
				var dwsplist_yg = data['data'];
				$('.yg_dwsp_cktit_xxl').html(likNullData(dwsplist_yg.name));
				$('.yg_dwsp_ckcjrq_xxl').html(likNullData(dwsplist_yg.created_at));
				$('.yg_dwsp_cjrs_xxl').html(likNullData(dwsplist_yg.uname))
				$('.yg_dwsp_htbh_xxl').html(likNullData(dwsplist_yg.employee_sn));
				$('.yg_dwsp_ckhtmc_xxl').html(likNullData(dwsplist_yg.name));
				$('.yg_dwsp_ck_juejbtn_xxl').attr('uid',dwsplist_yg.id)
				$('.yg_dwsp_ck_tongguo_btn_xxl').attr('uid',dwsplist_yg.id)
				if(data.data.status == 3) {
					$('.yg_dwsp_status_xxl').css('display', 'block')
					$('.yg_dwsp_status_no_xxl').css('display', 'none')
					$('.yg_dwsp_ck_juejbtn_xxl').attr('disabled','disabled').hide();
					$('.yg_dwsp_ck_tongguo_btn_xxl').attr('disabled','disabled').hide();
				} else if(data.data.status == 2){
					$('.yg_dwsp_status_xxl').css('display', 'none')
					$('.yg_dwsp_status_no_xxl').css('display', 'block')
					$('.yg_dwsp_ck_juejbtn_xxl').attr('disabled','disabled').hide();
					$('.yg_dwsp_ck_tongguo_btn_xxl').attr('disabled','disabled').hide();
				}else{
					$('.yg_dwsp_status_xxl').css('display', 'none')
					$('.yg_dwsp_status_no_xxl').css('display', 'none')
					$('.yg_dwsp_ck_juejbtn_xxl').removeAttr('disabled').show();
					$('.yg_dwsp_ck_tongguo_btn_xxl').removeAttr('disabled').show();
				}
				
				$('.yg_dwsp_cyxm_xxl').html(likNullData(dwsplist_yg.job_name));
				$('.yg_dwsp_yulanbtn_xxl').attr({'uid':dwsplist_yg.id,'status':data.data.status,'iszuofei':dwsplist_yg.is_invalid,'htbh':dwsplist_yg.employee_sn});
				$('.yg_dwsp_htqxs_xxl').html(likNullData(dwsplist_yg.unit_start_time)+':'+likNullData(dwsplist_yg.unit_end_time));
				$('.yg_dwsp_shzts_xxl').html(likNullData(dwsplist_yg.status_name));
				var flownamess_ygs = []
				$.each(data.data.flow_info, function(i, v) {
					flownamess_ygs.push(v.name)
				});
				$('.yg_dwsp_shr_xxls').html(flownamess_ygs.join());
				
				
				if(dwsplist_yg.check_log.length == 0) {
					$('.yg_dwsp_spyjlist_xxl').html('')
				} else {
					var fbyj_listhtml = '';
					fbyj_listhtml +='<div class="sq_look_check_box">';
					fbyj_listhtml +='<div class="xs_sp_result"><h3 class="cont_title" style="margin-left: 36px;">审批结果</h3></div>';
                    fbyj_listhtml +='<div class="work_spiliubox" style="margin-top:0;background: #fff;">';
                    $.each(dwsplist_yg.check_log, function(i,v) {
                    	fbyj_listhtml +='<div class="work_spiliu">';
                        fbyj_listhtml +='<div class="work_spiliu_items" style="overflow: hidden;">';    
                        fbyj_listhtml +='<div class="left" style="position: relative;">';        
                        fbyj_listhtml +='<div class="work_spiliu_div">';            
                        fbyj_listhtml +='<img class="inline_block tx" src="'+getImgUrl(v.face)+'">';//static/images/touxiang.png  
                       // if(v.id == tokenid){
                        	//fbyj_listhtml +='<h3 class="work_sp_h3">我</h3>'; 
                        //}else{
                        	fbyj_listhtml +='<h3 class="work_sp_h3">'+likNullData(v.name)+'</h3>'; 
                        //}
                        if(data.data.current_check==1){
                        	
                        }else{
                        	if(i==0){
                        		
                        	}else{
                        		fbyj_listhtml +=' <span class="c_9 m_left_5">步骤'+(i)+'</span>';
                        	}
                        	  
                        }
                                     
                        fbyj_listhtml +='</div>';  
                        if(i==0){
                        	fbyj_listhtml +='<cite class="b_b"></cite>';  
                        }else{
                        	if(v.status==1){
                        		fbyj_listhtml +='<cite class="b_y"></cite>';  	
                        	}else if(v.status==2){
                        		fbyj_listhtml +='<cite class="b_r"></cite>';  	
                        	}else if(v.status==3){
                        		fbyj_listhtml +='<cite class="b_g"></cite>';
                        	}else if(v.status==0){
                        		fbyj_listhtml +='<cite class="b_h"></cite>'; 
                        	}
                        }
                                  
                        fbyj_listhtml +='</div>';        
                        fbyj_listhtml +='<div class="auto_height">';        
                        fbyj_listhtml +='<img src="static/images/work_jiantou.png">';            
                        fbyj_listhtml +='<div class="sp_cont">';            
                        fbyj_listhtml +='<div class="sp_cont_a">';
                        if(i==0){
                        	fbyj_listhtml +='<h3 class="f_color bold">发起审批</h3>'; 
                        	fbyj_listhtml +='<p class="c_9">'+likNullData(v.day)+'</p>';
                        	fbyj_listhtml +='</div>'; 
                        }else{
                        	if(v.status==1){
                        		fbyj_listhtml +='<h3 class="c_y">审批中</h3>'; 
                        		fbyj_listhtml +='</div>'; 
                        	}else if(v.status==2){
                        		fbyj_listhtml +='<h3 class="c_r">未通过</h3>'; 
                        		fbyj_listhtml +='<p class="c_9">'+likNullData(v.day)+'</p>'; 
                        		fbyj_listhtml +='</div>'; 
                        		fbyj_listhtml +='<p class="c_3 work_sp_p">'+likNullData(v.note)+'</p>';
                        	}else if(v.status==3){
                        		fbyj_listhtml +='<h3 class="c_g">通过审批</h3>'; 
                        		fbyj_listhtml +='<p class="c_9">'+likNullData(v.day)+'</p>'; 
                        		fbyj_listhtml +='</div>'; 
                        		fbyj_listhtml +='<p class="c_3 work_sp_p">'+likNullData(v.note)+'</p>';
                        	}else if(v.status==0){
                        		fbyj_listhtml +='<h3 class="c_c">待审批</h3>'; 
                        		fbyj_listhtml +='</div>'; 
                        	}
                        }
                        fbyj_listhtml +='</div>';            
                        fbyj_listhtml +='</div>';        
                        fbyj_listhtml +='<div style="clear: both;height: 0;font-size: 1px;line-height: 0px;"></div>';        
                        fbyj_listhtml +='</div>';    
                        fbyj_listhtml +='</div>';
                    });
                    fbyj_listhtml +='</div>';
                    fbyj_listhtml +='<div class="work_spiliubox" style="margin-top:0;background: #fff;">';
                    fbyj_listhtml +='<div class="work_spiliu work_spiliu_last">';
                    fbyj_listhtml +='<div class="work_spiliu_items" style="min-height: 19px!important;">';
                    fbyj_listhtml +='<div class="left" style="position: relative;height: 37px;">';        
                    fbyj_listhtml +='<cite class="b_h"></cite>';            
                    fbyj_listhtml +='</div>';        
                    fbyj_listhtml +='<div class="auto_height" style="min-height: 39px!important;"></div>';        
                    fbyj_listhtml +='<div style="clear: both;height: 0;font-size: 1px;line-height: 0px;"></div>';        
                    fbyj_listhtml +='</div></div></div>';    
					fbyj_listhtml +='</div>';
//					$.each(dwsplist_yg.check_log, function(i, v) {
//						fbyj_listhtmls_yg += ' <div class="work_spiliu"><div class="work_spiliu_items"><div class="left" style="position: relative;">';
//
//						if(v.uid == tokenid) {
//							fbyj_listhtmls_yg += '<img class="inline_block tx" src="' + v.face + '"><cite class="b_h"></cite></div>';
//							fbyj_listhtmls_yg += '<div class="right auto_height"><img src="static/images/work_jiantou.png"><div class="sp_cont">';
//							fbyj_listhtmls_yg += '<div><h3 class="c_3">我</h3><span class="c_9 m_left_5">' + v.day + '</span></div>';
//						} else {
//							fbyj_listhtmls_yg += '<img class="inline_block tx" src="' + v.face + '"><cite class="b_y"></cite></div>';
//							fbyj_listhtmls_yg += '<div class="right auto_height" ><img src="static/images/work_jiantou.png"><div class="sp_cont">';
//							fbyj_listhtmls_yg += '<div><h3 class="c_3">' + v.name + '</h3><span class="c_9 m_left_5">' + v.day + '</span></div>';
//						}
//						if(i == 0) {
//							fbyj_listhtmls_yg += '<h3 class=" f_color">发起审批</h3>';
//						} else {
//							if(v.status == 1) {
//								fbyj_listhtmls_yg += '<h3 class="c_b" style="color:#f8ac59;">进行中</h3>'
//							} else if(v.status == 2) {
//								fbyj_listhtmls_yg += '<h3 class="c_r" style="color:#ff6c60;">未通过</h3>'
//							} else {
//								fbyj_listhtmls_yg += '<h3 class="c_g">通过审批</h3>'
//							}
//
//						}
//						fbyj_listhtmls_yg += '<p class="c_3 work_sp_p">' + v.note + '</p></div></div><div style="clear: both;height: 0;font-size: 1px;line-height: 0px;"></div></div></div>'
//					});
					$('.yg_dwsp_spyjlist_xxl').html(fbyj_listhtml)
				}
				$(".tx").error(function(e) { //加入相应的图片类名
					$(this).attr("src", "static/images/touxiang.png");
				});
			}
		},
		error: function(e) {

		}
	});
}
$('.dwsp_yg_ckbtn_xxl').die().live('click', function() {
		yg_dwsp_data_ck_xxl.id = $(this).attr('uid')
		yg_dwsp_ck_ajax_xxl()
		yg_wfqd_lsjl_data.id = $(this).attr('uid');
		yg_wfqd_lsjl_ajax()
	})
	//预览 待我审批查看
$('.yg_dwsp_yulanbtn_xxl').die().live('click', function() {
	$('.tanceng .daochu_yg').attr('htbh',$(this).attr('htbh'));
	if($(this).attr('status')==1&&$(this).attr('iszuofei')!=1){
		$('.tanceng .yg_dwsp_ck_juejbtn_xxl').attr('uid',$(this).attr('uid')).removeAttr('disabled').show();
		$('.tanceng .yg_dwsp_ck_tongguo_btn_xxl').attr('uid',$(this).attr('uid')).removeAttr('disabled').show();
	}else{
		$('.tanceng .yg_dwsp_ck_juejbtn_xxl').attr('disabled','disabled').hide();
		$('.tanceng .yg_dwsp_ck_tongguo_btn_xxl').attr('disabled','disabled').hide();
	}
		yght_ckyulan_data.id = $(this).attr('uid');
		yght_ckyulan_data.is_open = '1';
		yght_ckyulan_ajax()
	})
	//审批-Btn
$('.dwsp_yg_sp_btn_xxl').die().live('click', function() {
		$('.tanceng .yg_dwsp_jjbtn_xxl').attr('uid', $(this).attr('uid')).removeAttr('disabled').addClass('but_red').removeClass('but_grey1');
		$('.tanceng .yg_dwsp_tguosp_btn_xxl').attr('uid', $(this).attr('uid')).removeAttr('disabled').addClass('but_blue').removeClass('but_grey1');
		yght_ckyulan_data.id = $(this).attr('uid');
		yght_ckyulan_data.is_open = '1';
		yght_ckyulan_ajax()
	})
	//通过审批
$('.tanceng .yg_dwsp_jjbtn_xxl').die().live('click', function() {
	$('.tanceng .yg_dwsp_quedbtn_xxl').attr({
		'ztid': 2,
		'uid': $(this).attr('uid')
	})
})
$('.tanceng .yg_dwsp_tguosp_btn_xxl').die().live('click', function() {
	$('.tanceng .yg_dwsp_quedbtn_xxl').attr({
		'ztid': 1,
		'uid': $(this).attr('uid')
	})
})
var yg_dwsp_spyj_datas_xxl = {
	token: token,
	check_type: '', //1通过2拒绝
	id: '',
	note: ''
}

function yg_dwsp_spyj_ajax_xxl() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "employee-contract/check",
		data: yg_dwsp_spyj_datas_xxl,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg)
			} else {
				//console.log(data)
				$('.tanceng .yg_dwsp_jjbtn_xxl').addClass('but_grey1').removeClass('but_red').attr('disabled','disabled');
				$('.tanceng .yg_dwsp_tguosp_btn_xxl').addClass('but_grey1').removeClass('but_blue').attr('disabled','disabled');
				yght_data_xxl.thetype = 2;
				yght_list_ajax_xxl()
				yg_dwsp_ck_ajax_xxl()
				$('.tanceng').css('display', 'none')
				
			}
		},
		error: function(e) {
			console.log(e)

		}
	});
}
$('.tanceng .yg_dwsp_quedbtn_xxl').die().live('click', function() {
	yg_dwsp_spyj_datas_xxl.check_type = $(this).attr('ztid');
	yg_dwsp_spyj_datas_xxl.id = $(this).attr('uid');
	if($('.tanceng .yg_dwsp_yjval_xxl').val() == '' || $('.tanceng .yg_dwsp_yjval_xxl').val() == '请输入审批意见') {
//		alert('审批意见不能为空喔!!!')
//		return false;	
		$('.tanceng .yg_dwsp_yjval_xxl').val('');
	}
	yg_dwsp_spyj_datas_xxl.note = $('.tanceng .yg_dwsp_yjval_xxl').val();
	yg_dwsp_spyj_ajax_xxl()
	$('.yg_dwsp_youce_chakan_boxxxl').css('display', 'none')
	$('.tanceng').empty().hide();
//	$(this).parent().parent().parent().remove();
//	var num = $('.tanceng').children(".dialog_box").length;
//	if(num < 1) {
//		$(".tanceng").hide();
//	};
})
//查看里的拒绝 通过按钮
$('.yg_dwsp_ck_juejbtn_xxl').die().live('click',function(){
	$('.tanceng .yg_dwsp_quedbtn_xxl').attr({
		'ztid': 2,
		'uid': $(this).attr('uid')
	})
})
$('.yg_dwsp_ck_tongguo_btn_xxl').die().live('click',function(){
	$('.tanceng .yg_dwsp_quedbtn_xxl').attr({
		'ztid': 1,
		'uid': $(this).attr('uid')
	})
})

//抄送我的 -查看
var yg_cswd_ck_btn_xxl = {
	token: token,
	id: ''
}

function yg_cswd_ck_ajax_xxl() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "employee-contract/info",
		data: yg_cswd_ck_btn_xxl,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg)
			} else {
				console.log(data)
				var cswdlist_yg = data['data'];
				$('.yg_cswd_nametit_xxl').html(likNullData(cswdlist_yg.name));
				$('.yg_cswd_cjrq_xxl').html(likNullData(cswdlist_yg.created_at));
				$('.yg_cswd_cjr_xxl').html(likNullData(cswdlist_yg.uname))
				$('.yght_cswd_htbh_xxl').html(likNullData(cswdlist_yg.employee_sn));
				$('.yg_cswd_htmc_xxl').html(likNullData(cswdlist_yg.name));
				
				if(data.data.status == 3) {
					$('.yg_cswd_sptg_img_xxl').css('display', 'block')
					$('.yg_cswd_spjuej_img_xxl').css('display', 'none')
				} else if(data.data.status == 2){
					$('.yg_cswd_sptg_img_xxl').css('display', 'none')
					$('.yg_cswd_spjuej_img_xxl').css('display', 'block')
				}else{
					$('.yg_cswd_sptg_img_xxl').css('display', 'none')
					$('.yg_cswd_spjuej_img_xxl').css('display', 'none')
				}

				
				$('.yg_cswd_cyxm_xxl').html(likNullData(cswdlist_yg.job_name));
				$('.yg_cswd_yulanbtn_xxl').attr({'uid':cswdlist_yg.id,'htbh':cswdlist_yg.employee_sn});
				$('.yg_cswd_htqx_xxl').html(likNullData(cswdlist_yg.unit_start_time)+':'+likNullData(cswdlist_yg.unit_end_time));
				$('.yg_cswd_shzt_xxl').html(likNullData(cswdlist_yg.status_name));
				var flowcswd_ygs = []
				$.each(data.data.flow_info, function(i, v) {
					flowcswd_ygs.push(v.name)
				});
				$('.yg_cswd_shr_xxl').html(flowcswd_ygs.join());
				
				
				if(cswdlist_yg.check_log.length == 0) {
					$('.yg_cswd_spyjlist_xxl').html('')
				} else {
					var fbyj_listhtml = '';
					fbyj_listhtml +='<div class="sq_look_check_box">';
					fbyj_listhtml +='<div class="xs_sp_result"><h3 class="cont_title" style="margin-left: 36px;">审批结果</h3></div>';
                    fbyj_listhtml +='<div class="work_spiliubox" style="margin-top:0;background: #fff;">';
                    $.each(cswdlist_yg.check_log, function(i,v) {
                    	fbyj_listhtml +='<div class="work_spiliu">';
                        fbyj_listhtml +='<div class="work_spiliu_items" style="overflow: hidden;">';    
                        fbyj_listhtml +='<div class="left" style="position: relative;">';        
                        fbyj_listhtml +='<div class="work_spiliu_div">';            
                        fbyj_listhtml +='<img class="inline_block tx" src="'+getImgUrl(v.face)+'">';//static/images/touxiang.png  
                        //if(v.id == tokenid){
                        	//fbyj_listhtml +='<h3 class="work_sp_h3">我</h3>'; 
                        //}else{
                        	fbyj_listhtml +='<h3 class="work_sp_h3">'+likNullData(v.name)+'</h3>'; 
                        //}
                        if(data.data.current_check==1){
                        	
                        }else{
                        	if(i==0){
                        		
                        	}else{
                        		fbyj_listhtml +=' <span class="c_9 m_left_5">步骤'+(i)+'</span>'; 
                        	}
                        	 
                        }
                                     
                        fbyj_listhtml +='</div>';  
                        if(i==0){
                        	fbyj_listhtml +='<cite class="b_b"></cite>';  
                        }else{
                        	if(v.status==1){
                        		fbyj_listhtml +='<cite class="b_y"></cite>';  	
                        	}else if(v.status==2){
                        		fbyj_listhtml +='<cite class="b_r"></cite>';  	
                        	}else if(v.status==3){
                        		fbyj_listhtml +='<cite class="b_g"></cite>';
                        	}else if(v.status==0){
                        		fbyj_listhtml +='<cite class="b_h"></cite>';
                        	}
                        }
                                  
                        fbyj_listhtml +='</div>';        
                        fbyj_listhtml +='<div class="auto_height">';        
                        fbyj_listhtml +='<img src="static/images/work_jiantou.png">';            
                        fbyj_listhtml +='<div class="sp_cont">';            
                        fbyj_listhtml +='<div class="sp_cont_a">';
                        if(i==0){
                        	fbyj_listhtml +='<h3 class="f_color bold">发起审批</h3>'; 
                        	fbyj_listhtml +='<p class="c_9">'+likNullData(v.day)+'</p>';
                        	fbyj_listhtml +='</div>'; 
                        }else{
                        	if(v.status==1){
                        		fbyj_listhtml +='<h3 class="c_y">审批中</h3>'; 
                        		fbyj_listhtml +='</div>'; 
                        	}else if(v.status==2){
                        		fbyj_listhtml +='<h3 class="c_r">未通过</h3>'; 
                        		fbyj_listhtml +='<p class="c_9">'+likNullData(v.day)+'</p>'; 
                        		fbyj_listhtml +='</div>'; 
                        		fbyj_listhtml +='<p class="c_3 work_sp_p">'+likNullData(v.note)+'</p>';
                        	}else if(v.status==3){
                        		fbyj_listhtml +='<h3 class="c_g">通过审批</h3>'; 
                        		fbyj_listhtml +='<p class="c_9">'+likNullData(v.day)+'</p>'; 
                        		fbyj_listhtml +='</div>'; 
                        		fbyj_listhtml +='<p class="c_3 work_sp_p">'+likNullData(v.note)+'</p>';
                        	}else if(v.status==0){
                        		fbyj_listhtml +='<h3 class="c_c">待审批</h3>'; 
                        		fbyj_listhtml +='</div>'; 
                        	}
                        }
                        fbyj_listhtml +='</div>';            
                        fbyj_listhtml +='</div>';        
                        fbyj_listhtml +='<div style="clear: both;height: 0;font-size: 1px;line-height: 0px;"></div>';        
                        fbyj_listhtml +='</div>';    
                        fbyj_listhtml +='</div>';
                    });
                    fbyj_listhtml +='</div>';
                    fbyj_listhtml +='<div class="work_spiliubox" style="margin-top:0;background: #fff;">';
                    fbyj_listhtml +='<div class="work_spiliu work_spiliu_last">';
                    fbyj_listhtml +='<div class="work_spiliu_items" style="min-height: 19px!important;">';
                    fbyj_listhtml +='<div class="left" style="position: relative;height: 37px;">';        
                    fbyj_listhtml +='<cite class="b_h"></cite>';            
                    fbyj_listhtml +='</div>';        
                    fbyj_listhtml +='<div class="auto_height" style="min-height: 39px!important;"></div>';        
                    fbyj_listhtml +='<div style="clear: both;height: 0;font-size: 1px;line-height: 0px;"></div>';        
                    fbyj_listhtml +='</div></div></div>';    
					fbyj_listhtml +='</div>';
//					$.each(cswdlist_yg.check_log, function(i, v) {
//						fbyj_cswd_yg += ' <div class="work_spiliu"><div class="work_spiliu_items"><div class="left" style="position: relative;">';
//
//						if(v.uid == tokenid) {
//							fbyj_cswd_yg += '<img class="inline_block tx" src="' + v.face + '"><cite class="b_h"></cite></div>';
//							fbyj_cswd_yg += '<div class="right auto_height"><img src="static/images/work_jiantou.png"><div class="sp_cont">';
//							fbyj_cswd_yg += '<div><h3 class="c_3">我</h3><span class="c_9 m_left_5">' + v.day + '</span></div>';
//						} else {
//							fbyj_cswd_yg += '<img class="inline_block tx" src="' + v.face + '"><cite class="b_y"></cite></div>';
//							fbyj_cswd_yg += '<div class="right auto_height" ><img src="static/images/work_jiantou.png"><div class="sp_cont">';
//							fbyj_cswd_yg += '<div><h3 class="c_3">' + v.name + '</h3><span class="c_9 m_left_5">' + v.day + '</span></div>';
//						}
//						if(i == 0) {
//							fbyj_cswd_yg += '<h3 class=" f_color">发起审批</h3>';
//						} else {
//							if(v.status == 1) {
//								fbyj_cswd_yg += '<h3 class="c_b" style="color:#f8ac59;">进行中</h3>'
//							} else if(v.status == 2) {
//								fbyj_cswd_yg += '<h3 class="c_r" style="color:#ff6c60;">未通过</h3>'
//							} else {
//								fbyj_cswd_yg += '<h3 class="c_g">通过审批</h3>'
//							}
//
//						}
//						fbyj_cswd_yg += '<p class="c_3 work_sp_p">' + v.note + '</p></div></div><div style="clear: both;height: 0;font-size: 1px;line-height: 0px;"></div></div></div>'
//					});
					$('.yg_cswd_spyjlist_xxl').html(fbyj_listhtml)
				}
				$(".tx").error(function(e) { //加入相应的图片类名
					$(this).attr("src", "static/images/touxiang.png");
				});
			}
		},
		error: function(e) {

		}
	});
}
$('.cswd_yg_ckbtn_xxl').die().live('click', function() {
		//console.log($(this).attr('uid'))
		yg_cswd_ck_btn_xxl.id = $(this).attr('uid');
		yg_cswd_ck_ajax_xxl()
		yg_wfqd_lsjl_data.id = $(this).attr('uid');
		yg_wfqd_lsjl_ajax()
	})
	//抄送我的 预览
$('.yg_cswd_yulanbtn_xxl').die().live('click', function() {
	$('.tanceng .daochu_yg').attr('htbh',$(this).attr('htbh'));
	$('.tanceng .yg_dwsp_ck_juejbtn_xxl').hide();
	$('.tanceng .yg_dwsp_ck_tongguo_btn_xxl').hide();
	yght_ckyulan_data.id = $(this).attr('uid');
	yght_ckyulan_data.is_open = '1';
	yght_ckyulan_ajax()
})

//历史记录
var yg_wfqd_lsjl_data = {
	token:token,
	id:''
}
function yg_wfqd_lsjl_ajax(){
	$.ajax({
		type:"get",
		url:SERVER_URL+"employee-contract/historyinfo",
		data:yg_wfqd_lsjl_data,
		dataType:'json',
		success:function(data){
			if(data.code!=0){
				console.log(data.msg)
			}else{
				console.log(data)
				var lsjl_list = data['datalist'],yg_wfqd_lsjl='';
				$.each(lsjl_list, function(i,v) {
					if(v.thetype==1){
						$('.yg_wfqd_lsjl_img_xxl').attr('src',v.face);
						$('.yg_wfqd_lsjl_cjr').html(v.uname);
						$('.yg_wfqd_lsjl_cjrq_xxl').html(v.created_at);
						if(v.from_type==1){
							$('.yg_wfqd_lsjl_laiyuan_xxl').html('来自PC端');
						}else if(v.from_type==2){
							$('.yg_wfqd_lsjl_laiyuan_xxl').html('来自手机IOS端');
						}else{
							$('.yg_wfqd_lsjl_laiyuan_xxl').html('来自手机Android端');
						}
						$('.yg_wfqd_lsjl_htbh_xxl').html(v.employee_sn);
						$('.yg_wfqd_lsjl_htmc_xxl').html(v.name)
						$('.yg_wfqd_lsjl_cyxm_xxl').html(v.job_name);
						$('.yg_wfqd_lsjl_htqx_xxl').html(v.unit_start_time+'-'+v.unit_end_time);
						$('.yght_wfqd_lsjl_shzt_xxl').text('审核中')
					}else if(v.thetype==2){
						yg_wfqd_lsjl +='<div class="d-r-t-h"><div class="d-r-box">';
						yg_wfqd_lsjl +='<img class="l-sl-i" src="'+v.face+'">';
						yg_wfqd_lsjl +='<div class="d-r-r"><p class="u-id-t">'+v.name+'</p>';
						if(v.from_type==1){
							yg_wfqd_lsjl +='<p class="t-s-p">'+v.created_at+'<span class="sala_customer_msgcome">来自PC端</span></p></div></div></div>'; 
						}else if(v.from_type==2){
							yg_wfqd_lsjl +='<p class="t-s-p">'+v.created_at+'<span class="sala_customer_msgcome">来自手机IOS端</span></p></div></div></div>';
						}else{
							yg_wfqd_lsjl +='<p class="t-s-p">'+v.created_at+'<span class="sala_customer_msgcome">来自手机Android端</span></p></div></div></div>';
						}
                          	yg_wfqd_lsjl +='<div class="d-r-t-h"><p class="l-s-x">制单人：<span>'+v.uname+'</span></p>';
                          	yg_wfqd_lsjl +='<p class="l-s-x">合同模板名称：<span>'+v.template_name+'</span></p>';
                          	yg_wfqd_lsjl +='<p class="l-s-x">合同名称：<span>'+v.name+'</span></p>';
                          	yg_wfqd_lsjl +='<p class="l-s-x">入职成员：<span>'+v.job_name+'</span></p>';
                          	yg_wfqd_lsjl +='<p class="l-s-x">签订时间：<span>'+v.sign_time+'</span></p>';
                          	yg_wfqd_lsjl +='<p class="l-s-x">签订地点：<span>'+v.sign_address+'</span></p>';
                          	yg_wfqd_lsjl +='<p class="l-s-x">用人单位：<span>'+v.people_unit+'</span></p>';
                          	yg_wfqd_lsjl +='<p class="l-s-x">合同期限：<span>'+v.unit_start_time+'-'+v.unit_end_time+'</span></p>';
                          	yg_wfqd_lsjl +='<p class="l-s-x">试用期：<span>'+v.probation+'</span></p>';
                          	yg_wfqd_lsjl +='<p class="l-s-x">基本工资：<span>'+v.base_wage+'</span></p>';
                          	yg_wfqd_lsjl +='<p class="l-s-x">绩效工资：<span>'+v.perf_wage+'</span></p>';
                          	yg_wfqd_lsjl +='<p class="l-s-x">合计工资：<span>'+v.sum_wage+'</span></p>';
                          	yg_wfqd_lsjl +='<p class="l-s-x">审批人：<span>'+v.flow_name+'</span></p>';
                          	yg_wfqd_lsjl +='<p class="l-s-x">抄送人：<span>'+v.copy_name+'</span></p>';
                          	yg_wfqd_lsjl +='</div>';
                       
					}
					
				});
				 $('.yg_wfqd_lsjl_html_xxl').html(yg_wfqd_lsjl)
			}
		},
		error:function(e){
			console.log(e)
		}
	});
}








