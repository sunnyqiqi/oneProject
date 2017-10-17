var token, tokenid,xianshi;
token = Admin.get_token();
tokenid = Admin.get_uid();
username = window.localStorage.getItem('username');
//tokenid = 2; //对比自己的id审批意见-我
//username = '邢啸亮';
//SERVER_URL = 'http://192.168.0.167:9091/';
//SERVER_URL = 'http://192.168.0.167:9010/';
//token = '2017052516045457073-1-1';
var loginUserInfo = JSON.parse(localStorage.getItem('user_info'));
department_id = loginUserInfo['department_id'];
department_name=loginUserInfo['department_name'];
var zuofei='other-contract/invalid',shanchu='other-contract/del',qthtdaochu='/qita/daochu';
if(loginUserInfo['company_admin'] != 1){
	if(loginUserInfo.powerUrls.length==0){
		$('.daochu_qt').hide();
		xianshi = 'none';
	}else{
		var arr = loginUserInfo.powerUrls;//
		if($.inArray(zuofei, arr)!=-1){
			xianshi = '';
			//$('.qt_zfs_btn').show();
		}else{
			xianshi = 'none';
			//$('.qt_zfs_btn').hide();
		}
		if($.inArray(qthtdaochu, arr)!=-1){
			$('.daochu_qt').show();
		}else{
			$('.daochu_qt').hide();
		}
		
		
	}
}

var qtht_data_xxl = {
		token: token,
		thetype: '1', //1我发起的 2待我审批 3抄送我的
		keywords: '', //关键词（合同编号、销售报价单编号、客户名称、合同名称）
		page: '1',
		num: '10',
		status: '', //1审批中2未通过3已通过
		flow: '', //审核人
		uid: '', //创建人
		is_invalid: '', //是否作废：0正常1作废
		created_at: '', //创建日期：1升序2降序
		dept_id: '', //负责部门id
		owner_id: '' //负责人id
	}
if ($('#left_button_62').attr('fromnotice') == 1) { // 当前是从消息过来的
    var curId = $('#left_button_62').attr('detailid');
    var secondName = $('#left_button_62').attr('secondmenu'); 
    $.each($('.tabtitle li'), function (i, v) {
        if (secondName == $.trim($('.tabtitle li').eq(i).text())) {
            //$('.tabtitle li').removeClass('tabhover').eq(i).addClass('tabhover');
            qtht_data_xxl = {		// 初始化参数
                token: token,
                thetype: 2,
               keywords: '', //关键词（合同编号、销售报价单编号、客户名称、合同名称）
				page: '1',
				num: '10',
				status: '', //1审批中2未通过3已通过
				flow: '', //审核人
				uid: '', //创建人
				is_invalid: '', //是否作废：0正常1作废
				created_at: '', //创建日期：1升序2降序
				dept_id: '', //负责部门id
				owner_id: '', //负责人id,//创建日期：1升序2降序
                ids:curId
            };
            setTimeout(function(){
                $('.tabtitle li').eq(i).trigger('click'); // 触发相应子模块事件
                $('#left_button_62').attr({	 // 清空按钮的属性
                    'fromnotice': '',
                    'detailid': '',
                    'secondmenu': '',
                    'totable': ''
                });
            },100);
        }
    });
} else { // 当前不是从消息过来的，正常调取整个列表
    qtht_list_ajax_xxl();
}


	// 定义查看项
var qtht_xuanzckx = [{
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
}, {
	'index': null,
	'field': '负责部门'
}, {
	'index': null,
	'field': '负责人'
}];
	//补零
function Appendzero(obj) {
	if(obj < 10) return "0" + obj;
	else return obj;
}
function qtht_list_ajax_xxl() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "other-contract/list",
		data: qtht_data_xxl,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg)
			} else {
				console.log(data)
				var qt_list = data['datalist'];
				$('.qt_list_nums_xxl').html(data.totalcount)
				if(qt_list.length == 0) {
					$('.qt_list_html_xxl').html('')
					var qt_err = '';
					qt_err += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
					$('.qt_listerr_html').html(qt_err);
					$('.qt_fenye_list_xxl').css('display', 'none')
				} else {
					$('.qt_listerr_html').html('');
					$('.qt_fenye_list_xxl').css('display', 'block')
					var qt_listhtml = '';
					if(data.thetype == 1) {
						$.each(qt_list, function(i, v) {
							if(v.is_invalid == 1) {
								qt_listhtml += '<tr class="grey"><td><span class="voidIcon">作废</span></td>';
								qt_listhtml += '<td>' + likNullData(v.other_sn) + '</td>';
								qt_listhtml += '<td>' + likNullData(v.name) + '</td>';
								qt_listhtml += '<td><span>' + likNullData(v.status_name) + '</span></td>';
								qt_listhtml += '<td>' + likNullData(v.flow_name) + '</td>';
								qt_listhtml += '<td>' + likNullData(v.created_at) + '</td>';
								qt_listhtml += '<td>' + likNullData(v.uname) + '</td>';
								qt_listhtml += '<td>' + likNullData(v.dept_name) + '</td>';
								qt_listhtml += '<td>' + likNullData(v.owner_name) + '</td>';
								qt_listhtml += '<td><button class="but_mix but_cancal r_sidebar_btn qt_chakan_btn" name="ht_other_right" uid="' + v.id + '">查看</button><button class="but_mix1 but_grey1">编辑</button></td></tr>';
							} else {
								if(v.status == 1) {
									qt_listhtml += '<tr><td>' + Appendzero(i + 1) + '</td>';
									qt_listhtml += '<td>' + likNullData(v.other_sn) + '</td>';
									qt_listhtml += '<td>' + likNullData(v.name) + '</td>';
									qt_listhtml += '<td><span class="c_y">' + likNullData(v.status_name) + '</span></td>';
									qt_listhtml += '<td>' + likNullData(v.flow_name) + '</td>';
									qt_listhtml += '<td>' + likNullData(v.created_at) + '</td>';
									qt_listhtml += '<td>' + likNullData(v.uname) + '</td>';
									qt_listhtml += '<td>' + likNullData(v.dept_name) + '</td>';
									qt_listhtml += '<td>' + likNullData(v.owner_name) + '</td>';
									qt_listhtml += '<td><button class="but_mix but_look r_sidebar_btn qt_chakan_btn" name="ht_other_right" uid="' + v.id + '">查看</button><button class="but_mix but_r but_void qt_zfs_btn '+xianshi+'" uid="' + v.id + '">作废</button></td></tr>';
								} else if(v.status == 2) {
									qt_listhtml += '<tr><td>' + Appendzero(i + 1) + '</td>';
									qt_listhtml += '<td>' + likNullData(v.other_sn) + '</td>';
									qt_listhtml += '<td>' + likNullData(v.name) + '</td>';
									qt_listhtml += '<td><span class="c_r">' + likNullData(v.status_name) + '</span></td>';
									qt_listhtml += '<td>' + likNullData(v.flow_name) + '</td>';
									qt_listhtml += '<td>' + likNullData(v.created_at) + '</td>';
									qt_listhtml += '<td>' + likNullData(v.uname) + '</td>';
									qt_listhtml += '<td>' + likNullData(v.dept_name) + '</td>';
									qt_listhtml += '<td>' + likNullData(v.owner_name) + '</td>';
									qt_listhtml += '<td><button class="but_mix but_look r_sidebar_btn qt_chakan_btn" name="ht_other_right" uid="' + v.id + '">查看</button><button class="but_mix but_exit val_dialog qt_bj_btn" name="contact_other_exit" uid="' + v.id + '">编辑</button><button class="but_mix but_r but_void qt_zfs_btn '+xianshi+'" uid="' + v.id + '">作废</button></td></tr>';
								} else {
									qt_listhtml += '<tr><td>' + Appendzero(i + 1) + '</td>';
									qt_listhtml += '<td>' + likNullData(v.other_sn) + '</td>';
									qt_listhtml += '<td>' + likNullData(v.name) + '</td>';
									qt_listhtml += '<td><span class="c_g">' + likNullData(v.status_name) + '</span></td>';
									qt_listhtml += '<td>' + likNullData(v.flow_name) + '</td>';
									qt_listhtml += '<td>' + likNullData(v.created_at) + '</td>';
									qt_listhtml += '<td>' + likNullData(v.uname) + '</td>';
									qt_listhtml += '<td>' + likNullData(v.dept_name) + '</td>';
									qt_listhtml += '<td>' + likNullData(v.owner_name) + '</td>';
									qt_listhtml += '<td><button class="but_mix but_look r_sidebar_btn qt_chakan_btn" name="ht_other_right" uid="' + v.id + '">查看</button></td></tr>';
								}
							}

						});
					} else if(data.thetype == 2) {
						$.each(qt_list, function(i, v) {
							if(v.is_invalid == 1) {
								qt_listhtml += '<tr class="grey"><td><span class="voidIcon">作废</span></td>';
								qt_listhtml += '<td>' + likNullData(v.other_sn) + '</td>';
								qt_listhtml += '<td>' + likNullData(v.name) + '</td>';
								qt_listhtml += '<td><span>' + likNullData(v.status_name) + '</span></td>';
								qt_listhtml += '<td>' + likNullData(v.flow_name) + '</td>';
								qt_listhtml += '<td>' + likNullData(v.created_at) + '</td>';
								qt_listhtml += '<td>' + likNullData(v.uname) + '</td>';
								qt_listhtml += '<td>' + likNullData(v.dept_name) + '</td>';
								qt_listhtml += '<td>' + likNullData(v.owner_name) + '</td>';
								qt_listhtml += '<td><button class="but_mix but_look r_sidebar_btn dwsp_qt_ckbtn_xxl" iszuofei="1" name="ht_other_spright" uid="' + v.id + '">查看</button><button class="but_mix but_grey1 r_sidebar_btn" uid="' + v.id + '">审批</button></td></tr>';
							} else {
								if(v.status == 1) {
									qt_listhtml += '<tr><td>' + Appendzero(i + 1) + '</td>';
									qt_listhtml += '<td>' + likNullData(v.other_sn) + '</td>';
									qt_listhtml += '<td>' + likNullData(v.name) + '</td>';
									qt_listhtml += '<td><span class="c_y">' + likNullData(v.status_name) + '</span></td>';
									qt_listhtml += '<td>' + likNullData(v.flow_name) + '</td>';
									qt_listhtml += '<td>' + likNullData(v.created_at) + '</td>';
									qt_listhtml += '<td>' + likNullData(v.uname) + '</td>';
									qt_listhtml += '<td>' + likNullData(v.dept_name) + '</td>';
									qt_listhtml += '<td>' + likNullData(v.owner_name) + '</td>';
									qt_listhtml += '<td><button class="but_mix but_look r_sidebar_btn dwsp_qt_ckbtn_xxl" name="ht_other_spright" iszuofei="0" uid="' + v.id + '">查看</button><button class="but_mix but_look val_dialog dwsp_qt_sp_btn_xxl" name="ht_other_preSP" uid="' + v.id + '">审批</button></td></tr>';
								} else if(v.status == 2) {
									qt_listhtml += '<tr><td>' + Appendzero(i + 1) + '</td>';
									qt_listhtml += '<td>' + likNullData(v.other_sn) + '</td>';
									qt_listhtml += '<td>' + likNullData(v.name) + '</td>';
									qt_listhtml += '<td><span class="c_r">' + likNullData(v.status_name) + '</span></td>';
									qt_listhtml += '<td>' + likNullData(v.flow_name) + '</td>';
									qt_listhtml += '<td>' + likNullData(v.created_at) + '</td>';
									qt_listhtml += '<td>' + likNullData(v.uname) + '</td>';
									qt_listhtml += '<td>' + likNullData(v.dept_name) + '</td>';
									qt_listhtml += '<td>' + likNullData(v.owner_name) + '</td>';
									qt_listhtml += '<td><button class="but_mix but_look r_sidebar_btn dwsp_qt_ckbtn_xxl" iszuofei="0" name="ht_other_spright" uid="' + v.id + '">查看</button><button class="but_mix but_grey1 dwsp_qt_sp_btn_xxl" uid="' + v.id + '">审批</button></td></tr>';
								} else {
									qt_listhtml += '<tr><td>' + Appendzero(i + 1) + '</td>';
									qt_listhtml += '<td>' + likNullData(v.other_sn) + '</td>';
									qt_listhtml += '<td>' + likNullData(v.name) + '</td>';
									qt_listhtml += '<td><span class="c_g">' + likNullData(v.status_name) + '</span></td>';
									qt_listhtml += '<td>' + likNullData(v.flow_name) + '</td>';
									qt_listhtml += '<td>' + likNullData(v.created_at) + '</td>';
									qt_listhtml += '<td>' + likNullData(v.uname) + '</td>';
									qt_listhtml += '<td>' + likNullData(v.dept_name) + '</td>';
									qt_listhtml += '<td>' + likNullData(v.owner_name) + '</td>';
									qt_listhtml += '<td><button class="but_mix but_look r_sidebar_btn dwsp_qt_ckbtn_xxl" iszuofei="0" name="ht_other_spright" uid="' + v.id + '">查看</button><button class="but_mix but_grey1 dwsp_qt_sp_btn_xxl" uid="' + v.id + '">审批</button></td></tr>';
								}
							}

						});
					} else {
						$.each(qt_list, function(i, v) {
							if(v.is_invalid == 1) {
								qt_listhtml += '<tr class="grey"><td><span class="voidIcon">作废</span></td>';
								qt_listhtml += '<td>' + likNullData(v.other_sn) + '</td>';
								qt_listhtml += '<td>' + likNullData(v.name) + '</td>';
								qt_listhtml += '<td><span>' + likNullData(v.status_name) + '</span></td>';
								qt_listhtml += '<td>' + likNullData(v.flow_name) + '</td>';
								qt_listhtml += '<td>' + likNullData(v.created_at) + '</td>';
								qt_listhtml += '<td>' + likNullData(v.uname) + '</td>';
								qt_listhtml += '<td>' + likNullData(v.dept_name) + '</td>';
								qt_listhtml += '<td>' + likNullData(v.owner_name) + '</td>';
								qt_listhtml += '<td><button class="but_mix but_look r_sidebar_btn cswd_qt_ckbtn_xxl" name="ht_other_csright" uid="' + v.id + '">查看</button></td></tr>';
							} else {
								if(v.status == 1) {
									qt_listhtml += '<tr><td>' + Appendzero(i + 1) + '</td>';
									qt_listhtml += '<td>' + likNullData(v.other_sn) + '</td>';
									qt_listhtml += '<td>' + likNullData(v.name) + '</td>';
									qt_listhtml += '<td><span class="c_y">' + likNullData(v.status_name) + '</span></td>';
									qt_listhtml += '<td>' + likNullData(v.flow_name) + '</td>';
									qt_listhtml += '<td>' + likNullData(v.created_at) + '</td>';
									qt_listhtml += '<td>' + likNullData(v.uname) + '</td>';
									qt_listhtml += '<td>' + likNullData(v.dept_name) + '</td>';
									qt_listhtml += '<td>' + likNullData(v.owner_name) + '</td>';
									qt_listhtml += '<td><button class="but_mix but_look r_sidebar_btn cswd_qt_ckbtn_xxl" name="ht_other_csright" uid="' + v.id + '">查看</button></td></tr>';
								} else if(v.status == 2) {
									qt_listhtml += '<tr><td>' + Appendzero(i + 1) + '</td>';
									qt_listhtml += '<td>' + likNullData(v.other_sn) + '</td>';
									qt_listhtml += '<td>' + likNullData(v.name) + '</td>';
									qt_listhtml += '<td><span class="c_r">已拒绝</span></td>';
									qt_listhtml += '<td>' + likNullData(v.flow_name) + '</td>';
									qt_listhtml += '<td>' + likNullData(v.created_at) + '</td>';
									qt_listhtml += '<td>' + likNullData(v.uname) + '</td>';
									qt_listhtml += '<td>' + likNullData(v.dept_name) + '</td>';
									qt_listhtml += '<td>' + likNullData(v.owner_name) + '</td>';
									qt_listhtml += '<td><button class="but_mix but_look r_sidebar_btn cswd_qt_ckbtn_xxl" name="ht_other_csright" uid="' + v.id + '">查看</button></td></tr>';
								} else {
									qt_listhtml += '<tr><td>' + Appendzero(i + 1) + '</td>';
									qt_listhtml += '<td>' + likNullData(v.other_sn) + '</td>';
									qt_listhtml += '<td>' + likNullData(v.name) + '</td>';
									qt_listhtml += '<td><span class="c_g">' + likNullData(v.status_name) + '</span></td>';
									qt_listhtml += '<td>' + likNullData(v.flow_name) + '</td>';
									qt_listhtml += '<td>' + likNullData(v.created_at) + '</td>';
									qt_listhtml += '<td>' + likNullData(v.uname) + '</td>';
									qt_listhtml += '<td>' + likNullData(v.dept_name) + '</td>';
									qt_listhtml += '<td>' + likNullData(v.owner_name) + '</td>';
									qt_listhtml += '<td><button class="but_mix but_look r_sidebar_btn cswd_qt_ckbtn_xxl" name="ht_other_csright" uid="' + v.id + '">查看</button></td></tr>';
								}
							}

						});
					}
					$('.qt_list_html_xxl').html(qt_listhtml)
					
				}
				list_table_render_pagination(".qt_fenye_list_xxl", qtht_data_xxl, qtht_list_ajax_xxl, data["totalcount"], qt_list.length)
					likShow('#qt_xzckx_list_tanle_xxl', qtht_xuanzckx, '#qt_xzckx_list_xz_xxl', '#qt_xzckx_baocun_btn_xxl', '#qt_xzckx_hfmr_btn_xxl');
			}
		},
		error: function(data) {
			console.log(data)
			var qt_err = '';
			qt_err += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
			$('.qt_listerr_html').html(qt_err);
			$('.qt_fenye_list_xxl').css('display', 'none')
		}
	});
}
//window.onload=qtht_list_ajax_xxl;
qtht_list_ajax_xxl()
	//不显示已作废
$('.qt_noshow_btn_xxl').die('click').live('click', function() {
		if($(this).prop("checked")) {
			qtht_data_xxl.is_invalid = 0;
			qtht_list_ajax_xxl()
		} else {
			qtht_data_xxl.is_invalid = '';
			qtht_list_ajax_xxl()
		}
	})
	//切换列表
$.each($('.tabtitle li.qt_qiehuan_xxl'), function(i, v) {
	$(this).die().live('click', function() {
		$('.qt_list_html_xxl').attr('thetype', $(this).attr('thetype'));
		qtht_data_xxl.thetype = $(this).attr('thetype');
		$('.qt_ss_val_xxl').val('搜索合同编号/合同名称').css('color','rgb(204, 204, 204)');
		qtht_data_xxl.keywords='';
		qtht_list_ajax_xxl()
		if($(this).attr('thetype')=='1'){
			$('.qt_gjss_val_cjr_xxl').attr('readonly','readonly').val('').nextAll().hide().parent().css('background','#f5f5f5')
		}else{
			$('.qt_gjss_val_cjr_xxl').removeAttr('readonly').val('创建人').nextAll().show().parent().css('background','')
		}
		$('button[name="ht_qtht_zkgjss"]').attr('thetype', $(this).attr('thetype'))
	})

});
$('button[name="ht_qtht_zkgjss"]').die().live('click',function(){
	if($(this).text()=='隐藏高级搜索'){
		if($(this).attr('thetype')=='1'){
			$('.qt_gjss_val_cjr_xxl').attr('readonly','readonly').val('').nextAll().hide().parent().css('background','#f5f5f5')
		}else{
			$('.qt_gjss_val_cjr_xxl').removeAttr('readonly').val('创建人').nextAll().show().parent().css('background','')
		}
	}
})

//切换日期升降序
var qthecjrq=0;
$('.qt_cjrq_paixu_btn_xxl').die().live('click',function(){
	qthecjrq++;
	if(qthecjrq%2==0){
		qtht_data_xxl.created_at = 1;
	}else{
		qtht_data_xxl.created_at = 2;
	}
	qtht_data_xxl.thetype = $('.qt_list_html_xxl').attr('thetype');
	qtht_list_ajax_xxl()
})
//$('.qt_cjrq_paixu_btn_xxl').toggle(function() {
//		$(this).children(".price_icon").removeClass("down").addClass("up");
//		qtht_data_xxl.thetype = $(this).attr('thetype')
//		qtht_data_xxl.created_at = 1;
//		qtht_list_ajax_xxl()
//	}, function() {
//		$(this).children(".price_icon").removeClass("up").addClass("down");
//		qtht_data_xxl.thetype = $(this).attr('thetype')
//		qtht_data_xxl.created_at = 2;
//		qtht_list_ajax_xxl()
//	})
	//作废
var qtht_zf_data = {
	token: token,
	id: ''
}

function qtht_zf_ajax_xxl() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "other-contract/onstatus",
		data: qtht_zf_data,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg)
			} else {
				//console.log(data)
				qtht_list_ajax_xxl()
			}
		},
		error: function(e) {
			console.log(e)
		}
	});
}
$('.qt_zfs_btn').die().live('click', function() {
	qtht_zf_data.id = $(this).attr('uid');
	//console.log(xsht_zf_data.id)
	qtht_zf_ajax_xxl()
})
$('.qt_ckzf_btns_xxl').die().live('click', function() {
		qtht_zf_data.id = $(this).attr('uid');
		qtht_zf_ajax_xxl()
		$('.qt_ckgenduo_box_xxl').css('display', 'none')
	})
	//刷新
$('.qt_dianji_sxbtn_xxl').die().live('click', function() {
	add_Rload_index(62,5)//参数页面值，父级值
//		qtht_data_xxl = {
//			token: token,
//			thetype: '1', //1我发起的 2待我审批 3抄送我的
//			keywords: '', //关键词（合同编号、销售报价单编号、客户名称、合同名称）
//			page: '1',
//			num: '10',
//			status: '', //1审批中2未通过3已通过
//			flow: '', //审核人
//			uid: '', //创建人
//			is_invalid: '', //是否作废：0正常1作废
//			created_at: '', //创建日期：1升序2降序
//			dept_id: '', //负责部门id
//			owner_id: '' //负责人id
//		}
//		qtht_list_ajax_xxl()
//		$('.qt_qieh_main_ul_xxl li:first').addClass(' tabhover').siblings('li').removeClass('tabhover');
//		$('.select_p input.qt_gjss_val_shzt_xxl').val('审核状态').attr('style', '');
//		$('.select_p input.qt_gjss_val_spr_xxl').val('审核人').attr('style', '');
//		$('.select_p input.qt_gjss_val_cjr_xxl').val('创建人').attr('style', '');
//		$('.select_p input.qt_gjss_val_fzbm_xxl').val('负责部门').attr('style', '');
//		$('.select_p input.qt_gjss_val_fzr_xxl').val('负责人').attr('style', '');

	})
	//搜索
//function qt_ht_ssnow(val) {
//	qtht_data_xxl.keywords = val;
//	qtht_list_ajax_xxl()
//}
$('.qt_ss_btn_xxl').die().live('click', function() {
		if($('.qt_ss_val_xxl').val() == '' || $('.qt_ss_val_xxl').val() == '搜索合同编号/合同名称') {
			qtht_data_xxl.keywords='';
		} else {
			qtht_data_xxl.keywords = $('.qt_ss_val_xxl').val();
			
		}
		qtht_list_ajax_xxl()
	})
	//高级搜索
var qtht_gjss_data = {
	token: token,
	big_type:'2',
	small_type:''//dept_id 部门搜索 owner_id 负责人搜索 flow 审批人搜索 uid创建人搜索 
}

function qtht_gjss_ajax() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "common/search",
		data: qtht_gjss_data,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg)
			} else {
				var qtlists = data['data'];
				var qtht_shr = '',
					qtht_cjr = '',
					qtht_fzbm = '',
					qtht_fzr = '';

				$.each(qtlists, function(i, v) {
					qtht_shr += '<li flowid="' + v.id + '">' + likNullData(v.name) + '</li>';
					qtht_cjr += '<li uid="' + v.id + '">' + likNullData(v.name) + '</li>';
					qtht_fzbm += '<li deptid="' + v.id + '">' + likNullData(v.name) + '</li>';
					qtht_fzr += '<li owenid="' + v.id + '">' + likNullData(v.name) + '</li>';
				});
				$('.qt_gjss_shrlist_xxl').html(qtht_shr)
				$('.qt_gjss_cjrlist_xxl').html(qtht_cjr)
				$('.qt_gjss_fzbmlist_xxl').html(qtht_fzbm)
				$('.qt_gjss_fzrlist_xxl').html(qtht_fzr)
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
$('.qt_gjss_val_spr_xxl,.qt_gjss_val_spr_xxl+i').die().live('click',function(){
	qtht_gjss_data.small_type='flow';
	qtht_gjss_ajax()
})
$('.qt_gjss_val_cjr_xxl,.qt_gjss_val_cjr_xxl+i').die().live('click',function(){
	qtht_gjss_data.small_type='uid';
	qtht_gjss_ajax()
})
$('.qt_gjss_val_fzbm_xxl,.qt_gjss_val_fzbm_xxl+i').die().live('click',function(){
	qtht_gjss_data.small_type='dept_id';
	qtht_gjss_ajax()
})
$('.qt_gjss_val_fzr_xxl,.qt_gjss_val_fzr_xxl+i').die().live('click',function(){
	qtht_gjss_data.small_type='owner_id';
	qtht_gjss_ajax()
})

$('.qt_gjss_spztlist_xxl li').die().live('click', function() { //审批状态
		//console.log($(this).attr('statusid'))
		$('.qt_gjss_val_shzt_xxl').val($(this).text()).addClass('c_3')
		qtht_data_xxl.status = $(this).attr('status');
		qtht_list_ajax_xxl()
	})
	//审核人
$('.qt_gjss_shrlist_xxl li').die().live('click', function() {
	$('.qt_gjss_val_spr_xxl').val($(this).text()).addClass('c_3')
		qtht_data_xxl.flow = $(this).attr('flowid');
		qtht_list_ajax_xxl()
	})
	//创建人
$('.qt_gjss_cjrlist_xxl li').die().live('click', function() {
	$('.qt_gjss_val_cjr_xxl').val($(this).text()).addClass('c_3')
		qtht_data_xxl.uid = $(this).attr('uid');
		qtht_list_ajax_xxl()
	})
	//负责部门
$('.qt_gjss_fzbmlist_xxl li').die().live('click', function() {
	$('.qt_gjss_val_fzbm_xxl').val($(this).text()).addClass('c_3')
		qtht_data_xxl.dept_id = $(this).attr('deptid');
		qtht_list_ajax_xxl()
	})
	//负责人
$('.qt_gjss_fzrlist_xxl li').die().live('click', function() {
	$('.qt_gjss_val_fzr_xxl').val($(this).text()).addClass('c_3')
		qtht_data_xxl.owner_id = $(this).attr('owenid');
		qtht_list_ajax_xxl()
	})
	//查看我发起的
var qt_wfqd_ckxq_data = {
	token: token,
	id: ''
}

function qt_wfqd_ckxq_ajax() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "other-contract/info",
		data: qt_wfqd_ckxq_data,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg)
			} else {
				console.log(data)
				if(data.data.is_invalid == 1 || data.data.status == 3 || data.data.status == 1) {
					$('.qt_ckgenduo_box_xxl').css('display', 'none')
				} else {
					$('.qt_ckgenduo_box_xxl').css('display', 'block')
				}
				$('.qt_ck_bjbtn_xxl').attr('uid', data.data.id)
				$('.qt_ckzf_btns_xxl').attr('uid', data.data.id)

				$('.qt_ck_yulan_btnxxl').attr({'uid':data.data.id,'htbh':data.data.other_sn})
				$('.qt_ck_tit_xxl').html(likNullData(data.data.name));
				$('.qt_ck_cjrq_xxl').html(likNullData(data.data.created_at))
				$('.qt_ck_cjr_xxl').html(likNullData(data.data.uname))
				if(data.data.status == 3) {
					$('.qt_sp_img_xxl').css('display', 'block')
				} else {
					$('.qt_sp_img_xxl').css('display', 'none')
				}
				if(data.data.status == 2) {
					$('.qt_sp_imgno_xxl').css('display', 'block')
				} else {
					$('.qt_sp_imgno_xxl').css('display', 'none')
				}
				$('.qt_ck_htbh_xxl').html(likNullData(data.data.other_sn))
				$('.qt_ck_htmc_xxl').html(likNullData(data.data.name))
				$('.qt_ck_shzt_xxl').html(likNullData(data.data.status_name))
				var flown_qt = []
				$.each(data.data.flow_info, function(i, v) {
					flown_qt.push(v.name)
				});
				$('.qt_ck_shr_xxl').html(flown_qt.join())
				$('.qt_ck_fzbms_xxl').html(likNullData(data.data.dept_name));
				$('.qt_ck_fzr_xxl').html(likNullData(data.data.owner_name))
				if(data.data.check_log.length == 0) {
					$('.qt_ck_spyjlist_html_xxl').html('')
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
//						qt_fbyj_listhtml += ' <div class="work_spiliu"><div class="work_spiliu_items"><div class="left" style="position: relative;">';
//
//						if(v.uid == tokenid) {
//							qt_fbyj_listhtml += '<img class="inline_block tx" src="' + v.face + '"><cite class="b_h"></cite></div>';
//							qt_fbyj_listhtml += '<div class="right auto_height"><img src="static/images/work_jiantou.png"><div class="sp_cont">';
//							qt_fbyj_listhtml += '<div><h3 class="c_3">我</h3><span class="c_9 m_left_5">' + likNullData(v.day) + '</span></div>';
//						} else {
//							qt_fbyj_listhtml += '<img class="inline_block tx" src="' + v.face + '"><cite class="b_y"></cite></div>';
//							qt_fbyj_listhtml += '<div class="right auto_height" ><img src="static/images/work_jiantou.png"><div class="sp_cont">';
//							qt_fbyj_listhtml += '<div><h3 class="c_3">' + likNullData(v.name) + '</h3><span class="c_9 m_left_5">' + likNullData(v.day) + '</span></div>';
//						}
//						if(i == 0) {
//							qt_fbyj_listhtml += '<h3 class=" f_color">发起审批</h3>';
//						} else {
//							if(v.status == 1) {
//								qt_fbyj_listhtml += '<h3 class="c_b" style="color:#f8ac59;">进行中</h3>';
//							} else if(v.status == 2) {
//								qt_fbyj_listhtml += '<h3 class="c_r" style="color:#ff6c60;">未通过</h3>'
//							} else {
//								qt_fbyj_listhtml += '<h3 class="c_g">通过审批</h3>';
//							}
//
//						}
//						qt_fbyj_listhtml += '<p class="c_3 work_sp_p">' + likNullData(v.note) + '</p></div></div><div style="clear: both;height: 0;font-size: 1px;line-height: 0px;"></div></div></div>'
//					});
					$('.qt_ck_spyjlist_html_xxl').html(fbyj_listhtml)
				}
				$(".tx").error(function(e) { //加入相应的图片类名
					$(this).attr("src", "static/images/touxiang.png");
				});
				$('.qt_ckbj_cjr_xxl').html(data.data.uname)
				$('.qt_ckbj_cjrq_xxl').html(data.data.created_at)
				$('.qt_ckbj_htbh_xxl').val(data.data.other_sn).addClass('c_3');
				$('.qt_ckbj_xzhtmb_xxl').val(data.data.template_name).attr('uid', data.data.template_id).addClass('c_3');
				$('.qt_ckbj_htmc_xxl').val(data.data.name).addClass('c_3');
				$('.qt_ckbj_tjsp_btnxxl').attr('uid', data.data.id)
				$('.qt_ckbj_fzbm_xxl').val(department_name).attr('uid', department_id).addClass('c_3');
				$('.qt_ckbj_fzr_xxl').val(username).attr('uid', tokenid).addClass('c_3');
//				var qt_myspr = '';
//				$.each(data.data.flow_info, function(i, v) {
//					sp_rynum_qt.push(v.id);
//					qt_myspr += '<li userid="' + v.id + '"><i class="del_img_1">-</i><em class="icon_personBtn icon_personBtn_msg" style="background:url(' + v.face + ') no-repeat;"><i class="icon_personNext"></i></em><em class="icon_adderBtn"></em><p class="box_adderName">' + v.name + '</p> <p class="box_addermsg">步骤一</p></li>'
//				});
//				$('.tanceng .qt_spqian_list_xxl').before(qt_myspr)
//				$.each($('.tanceng .spr_add_xxl .box_addermsg'), function(i, v) {
//					$('.tanceng .spr_add_xxl .box_addermsg').eq(i).html(buzou[i])
//				});
				var mrcsrnum_qt = '';
				$.each(data.data.copy_info, function(i, v) {
					csnumss_qt.push(v.id)
					if(v.face==''||v.face==null||v.face==undefined){
						mrcsrnum_qt += '<li userid="' + v.id + '"><i class="del_img_1">-</i><em class="icon_personBtn icon_personBtn_msg"></em><em class="icon_adderBtn"></em><p class="box_adderName">' + v.name + '</p></li>';
					}else{
						mrcsrnum_qt += '<li userid="' + v.id + '"><i class="del_img_1">-</i><em class="icon_personBtn icon_personBtn_msg" style="background:url(' + v.face + ');border-radius:50%;"></em><em class="icon_adderBtn"></em><p class="box_adderName">' + v.name + '</p></li>';
					}
					
				});
				$('.tanceng .csr_add_xxl').prepend(mrcsrnum_qt)
			}
		},
		error: function(e) {
			console.log(e)
		}
	});
}
$('.qt_chakan_btn').die().live('click', function() {
		$('.qt_sp_img_xxl').css('display', 'none')
		qt_wfqd_ckxq_data.id = $(this).attr('uid');
		qt_wfqd_ckxq_ajax()
		qt_wfqd_lsjl_data.id = $(this).attr('uid');
		qt_wfqd_lsjl_ajax()
	})
	//	//查看内的编辑按钮
$('.qt_ck_bjbtn_xxl').die().live('click', function() {
	qt_wfqd_ckxq_ajax()
})
$('.qt_bj_btn').die().live('click', function() {
	xsht_huoquspr_ajax()
		qt_wfqd_ckxq_data.id = $(this).attr('uid')
		qt_wfqd_ckxq_ajax()
	})
	//查看-预览按钮
$('.qt_ck_yulan_btnxxl').die().live('click', function() {
	$('.tanceng .daochu_qt').attr('htbh',$(this).attr('htbh'));
	$('.tanceng .qt_dwspck_jujuebtn_xxl').hide();
	$('.tanceng .qt_dwspck_tongguo_btnxxl').hide();
	//console.log($(this).attr('uid'))
	qtht_ckyulan_data.id = $(this).attr('uid');
	qtht_ckyulan_data.is_open='1';
	qtht_ckyulan_ajax()
})
var qtht_ckyulan_data = {
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

function qtht_ckyulan_ajax() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "other-contract/preview",
		data: qtht_ckyulan_data,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg)
			} else {
				console.log(data)
				var yulanlist_qt = data['datalist'],
					a = '';
				$.each(yulanlist_qt, function(i, v) {
					a += likNullData(v);
				});
				$('.tanceng .qt_ylht_html_xxl').html(a)
				$('.tanceng .qt_spxq_ylhtml_xxl').html(a)
				var yulan_zdy_qt = data['customdatalist'],
					zdylist_qt = '';
				if(yulan_zdy_qt.length == 0) {
					return;
				} else {

					$.each(yulan_zdy_qt, function(i, v) {
						if(v.is_add=='1'){
							zdylist_qt += '<div class="ht_msg"><p class="f_color">' + intToChinese((i + 1)) + '、' + v.name + '</p><p class="f_color">' + v.content.replace(/\s+/g,'<br/>') + '</p></div>';
						}else if(v.is_add=='2'){
							zdylist_qt += '<div class="ht_msg "><p class="c_r">' + intToChinese((i + 1)) + '、' + v.name + '</p><p class="c_r">' + v.content.replace(/\s+/g,'<br/>') + '</p></div>';
						}else{
							zdylist_qt += '<div class="ht_msg"><p>' + intToChinese((i + 1)) + '、' + v.name + '</p><p>' + v.content.replace(/\s+/g,'<br/>') + '</p></div>';
						}
						//zdylist_qt += '<div class="ht_msg"><p>' + intToChinese((i + 1)) + '、' + v.name + '</p><p>' + v.content.replace(/\s+/g,'<br/>') + '</p></div>';
					});
					$('.tanceng .ht_msg_bottom').before(zdylist_qt)
				}
				
				

			}
		},
		error: function(e) {
			console.log(e)
		}
	});
}
//选择合同模板列表
var qtht_mbdata_xxl = {
	token: token,
	thetype: '4',
	page: '1',
	num: '10',
	name: '',
	dept: '',
	uid: '',
	updated_uid: '',
	status: '0'
}

function qtht_mbajax_list() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "contract-template/list",
		data: qtht_mbdata_xxl,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg)
			} else {
				console.log(data)
				var mblist_qt = data['datalist']
				$('.qt_htmbbox_nums_xxl').html(data['totalcount'])
				if(mblist_qt.length == 0) {
					$('.qt_htmb_list_htmlxxl').html('');
					var mblist_qt_err = ''
					mblist_qt_err += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
					$('.qt_htmblist_errhtml_xxl').html(mblist_qt_err)
					$('.qt_xzhtmb_fenye_html_xxl').css('display', 'none')
				} else {
					$('.qt_htmblist_errhtml_xxl').html('')
					$('.qt_xzhtmb_fenye_html_xxl').css('display', 'block')
					var qt_mb_list_htmls = ''
					$.each(mblist_qt, function(i, v) {
						qt_mb_list_htmls += '<tr><td><input type="radio" name="ht_cght_xzcghtmbinp" uid="' + v.id + '" isname="' + v.is_name + '" value="' + v.name + '" ></td>';
						qt_mb_list_htmls += '<td>' + likNullData(v.name) + '</td>';
						qt_mb_list_htmls += '<td>' + likNullData(v.type_name) + '</td>';
						qt_mb_list_htmls += '<td>' + likNullData(v.dept_name) + '</td>';
						qt_mb_list_htmls += '<td>' + likNullData(v.created_at) + '</td>';
						qt_mb_list_htmls += '<td>' + likNullData(v.create_name) + '</td>';
						qt_mb_list_htmls += '<td>' + likNullData(v.updated_at) + '</td>';
						qt_mb_list_htmls += '<td>' + likNullData(v.updated_name) + '</td>';
						qt_mb_list_htmls += '</tr>';
					});
					$('.qt_htmb_list_htmlxxl').html(qt_mb_list_htmls);
					list_table_render_pagination(".qt_xzhtmb_fenye_html_xxl", qtht_mbdata_xxl, qtht_mbajax_list, data["totalcount"], mblist_qt.length)
				}
			}
		},
		error: function(e) {
			console.log(e)
			var mblist_qt_err = ''
			mblist_qt_err += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
			$('.qt_htmblist_errhtml_xxl').html(mblist_qt_err)
			$('.qt_xzhtmb_fenye_html_xxl').css('display', 'none')
		}
	});
}
$('.tanceng .qt_bj_xzhtmbbtn_xxl').die().live('click', function() {
	qtht_mbajax_list()
})

function qt_xzmb_ssnow_xxl(val) {
	qtht_mbdata_xxl.name = val;
	qtht_mbajax_list()
}

$('.qt_mbss_btn_xxl').die().live('click', function() {
	if($('.qt_sousuo_htmbmc_xxl_val').val() == '' || $('.qt_sousuo_htmbmc_xxl_val').val() == '搜索合同模板名称') {
		return false;
	} else {
		qtht_mbdata_xxl.name = $('.qt_sousuo_htmbmc_xxl_val').val();
		qtht_mbajax_list()
	}
})
$('.tanceng .qt_xzhtmbhtml_queding_btn_xxl').die('click').live('click', function() {
	if($('.tanceng input:radio[name="ht_cght_xzcghtmbinp"]:checked').length==0){
		alert('请选择合同模板')
		return false;
	}
		var radioA_qt = $('.tanceng input:radio[name="ht_cght_xzcghtmbinp"]:checked');
		//console.log(radioA_qt.attr('uid'))
		$('.tanceng .qt_ckbj_xzhtmb_xxl').attr('uid', radioA_qt.attr('uid'))
		if(radioA_qt.attr('isname') == 1) {
			$('.tanceng .qt_ckbj_xzhtmb_xxl').val(radioA_qt.val()).css('color', '#333')
			$('.tanceng .qt_ckbj_htmc_xxl').val(radioA_qt.val()).attr({
				'disabled': 'disabled',
				'Names': radioA_qt.val()
			}).css('color', '#333')
		} else {
			$('.tanceng .qt_ckbj_xzhtmb_xxl').val(radioA_qt.val()).css('color', '#333')
			$('.tanceng .qt_ckbj_htmc_xxl').val(radioA_qt.val()).removeAttr('disabled')
		}
		$('.tanceng .qt_xj_xzhtmb_val_xxl').attr('uid', radioA_qt.attr('uid'))
		if(radioA_qt.attr('isname') == 1) {
			$('.tanceng .qt_xj_xzhtmb_val_xxl').val(radioA_qt.val()).css('color', '#333')
			$('.tanceng .qt_xj_htmc_val_xxl').val(radioA_qt.val()).attr({
				'disabled': 'disabled',
				'Names': radioA_qt.val()
			}).css('color', '#333')
		} else {
			$('.tanceng .qt_xj_xzhtmb_val_xxl').val(radioA_qt.val()).css('color', '#333')
			$('.tanceng .qt_xj_htmc_val_xxl').val(radioA_qt.val()).removeAttr('disabled')
		}
		//		$('.tanceng .yg_xj_qddd_xxl').val(radioA_qt.attr('address')).css('color', '#333')
		$(this).parent().parent().parent().remove();
		var num = $('.tanceng').children(".dialog_box").length;
		if(num < 1) {
			$(".tanceng").hide();
		}
	})
	//取消选择模板弹层
$('.tanceng .qt_xjht_quexiao_btnxxl').die().live('click', function() {
		$(this).parent().parent().parent().remove();
		var num = $('.tanceng').children(".dialog_box").length;
		if(num < 1) {
			$(".tanceng").hide();
		}
	})
	//取消编辑弹层
$('.tanceng .qt_bjht_quexiao_btnxxl').die().live('click', function() {
		$(this).parent().parent().parent().remove();
		var num = $('.tanceng').children(".dialog_box").length;
		if(num < 1) {
			$(".tanceng").hide();
		}
	})
	//新建其他合同
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
//// 验证手机号 
//function isPhoneNo(phone) {
//	var pattern = /^1[34578]\d{9}$/;
//	return pattern.test(phone);
//}
var xsht_huoquspr_data = {
	token:token,
	category:'4',//类别(1合同管理,2采购,3借入借出)
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
						sphtml +='<li>没有设置审批人</li>';
						//return false;
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
						sphtml +='<li>没有设置审批人</li>';
						//return false;
					}else{
						$.each(splist, function(i,v) {
						if(v.face==''||v.face==null){
							sphtml +='<li userid="' +v.id+ '"><em class="icon_personBtn icon_personBtn_msg"><i class="icon_personNext"></i></em><em class="icon_adderBtn"></em><p class="box_adderName">'+v.name+'</p></li>';
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

$('.qtht_xinjian_btns_xxl').die().live('click', function() {
	$('.tanceng .qt_xj_fzr_valxxl').val(username).attr('uid',tokenid);
	$('.tanceng .qt_xj_xzbm_valxxl').val(department_name).attr('uid',department_id);
	xsht_huoquspr_ajax()
	$.ajax({
		type: "get",
		url: SERVER_URL + "admin/autoload",
		data: {
			token: token,
			args: 'QHT'
		},
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg)
			} else {
				console.log(data)
				$('.tanceng .qt_xjht_htbhs_xxl').val(data.data)
				$('.tanceng .qt_xj_cjr_xxls').html(username);
				$('.tanceng .qitahetong_tit_cjriqi_xxl').html(nowss)
			}
		},
		error: function(e) {
			console.log(e)
		}
	});

})

$('.tanceng .qt_xjxzhtmb_btn_xxl').die().live('click', function() {
		qtht_mbajax_list()
	})
	//var DATE_FORMAT = /^[0-9]{4}-[0-1]?[0-9]{1}-[0-3]?[0-9]{1}$/; //日期

$('.tanceng .qt_xj_tjspbtn_xxl').die('click').live('click', function() {
		qt_add_datas_xxl.id = '';
		qt_add_datas_xxl.is_open='1';
		qt_add_datas_xxl.other_sn = $('.tanceng .qt_xjht_htbhs_xxl').val();
		if(typeof($('.tanceng .qt_xj_xzhtmb_val_xxl').attr('uid')) == "undefined") {
			alert('请选择合同模板')
			return false;
		}
		if($('.tanceng .qt_xj_htmc_val_xxl').val() == '' || $('.tanceng .qt_xj_htmc_val_xxl').val() == '员工合同') {
			alert('请输入合同名称或不能为空');
			return false;
		}
		qt_add_datas_xxl.template_id = $('.tanceng .qt_xj_xzhtmb_val_xxl').attr('uid');
		qt_add_datas_xxl.name = $('.tanceng .qt_xj_htmc_val_xxl').val();
		if(typeof($('.tanceng .qt_xj_xzbm_valxxl').attr('uid')) == "undefined"||$('.tanceng .qt_xj_xzbm_valxxl').val()==''||$('.tanceng .qt_xj_xzbm_valxxl').attr('uid')=='0') {
			alert('负责部门没有不能提交')
			return false;
		}
		qt_add_datas_xxl.dept_id = $('.tanceng .qt_xj_xzbm_valxxl').attr('uid');
//		if(typeof($('.tanceng .qt_xj_fzr_valxxl').attr('uid')) == "undefined") {
//			alert('请选择负责人')
//			return false;
//		}
		qt_add_datas_xxl.owner_id = $('.tanceng .qt_xj_fzr_valxxl').attr('uid');
		var flowhtxj_qt = [];
		$.each($('.tanceng .spr_add_xxl>li[userid]'), function(i, v) {
			flowhtxj_qt.push($(this).attr('userid'))
		});
		if(flowhtxj_qt.length == 0) {
			alert('请选择审批人员')
			return false;
		}
		var copyxsxj_qt = [];
		$.each($('.tanceng .csr_add_xxl>li[userid]'), function(i, v) {
			copyxsxj_qt.push($(this).attr('userid'))
		});
//		if(copyxsxj_qt.length == 0) {
//			alert('请选择抄送人员')
//			return false;
//		}
		qt_add_datas_xxl.flow = flowhtxj_qt.join();//
		qt_add_datas_xxl.copy_list = copyxsxj_qt.join();
		//console.log(qt_add_datas_xxl)
		qt_add_ajaxs_xxl()
		$(this).parent().parent().parent().remove();
		var num = $('.tanceng').children(".dialog_box").length;
		if(num < 1) {
			$(".tanceng").hide();
		}
	})
	//新建合同
var qt_add_datas_xxl = {
	token: token,
	id: '',
	other_sn: '', //其它合同编号
	template_id: '', //选择合同模板id
	name: '', //合同名称
	dept_id: '', //负责部门id
	owner_id: '', //负责人id
	flow: '', //审批人
	copy_list: '',
	is_open:''//0预览 1提交

}

function qt_add_ajaxs_xxl() {
	$.ajax({
		type: "post",
		url: SERVER_URL + "other-contract/add",
		data: qt_add_datas_xxl,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg)
			} else {
				console.log(data)
				if(data.is_open!=0){
					qtht_list_ajax_xxl()
					qtht_ckyulan_data.is_open='1';
				}else{
					$('.tanceng').append($(".dialog_box[name='ht_other_pre']").parent().html()).show();
					$(".tanceng .dialog_box").show();
			        $(".dialog_box[name='ht_other_pre']").css({
			            "z-index": "1",
			            "position": "absolute"
			        });
			        $('.tanceng .qt_spxq_jujue_btnxxl').hide();
			         $('.tanceng .qt_spxq_tongguo_btnxxl').hide();
					qtht_ckyulan_data.id = data.id;
					qtht_ckyulan_data.is_open='0';
					qtht_ckyulan_ajax()
				}
				
			}
		},
		error: function(e) {
			console.log(e)
		}
	});
}
//新建其他合同预览按钮
$('.tanceng .qtht_xinjianyulan_btnxxl').die().live('click',function(){
	qt_add_datas_xxl.id = '';
		qt_add_datas_xxl.is_open='0';
		qt_add_datas_xxl.other_sn = $('.tanceng .qt_xjht_htbhs_xxl').val();
		if(typeof($('.tanceng .qt_xj_xzhtmb_val_xxl').attr('uid')) == "undefined") {
			alert('请选择合同模板')
			return false;
		}
		if($('.tanceng .qt_xj_htmc_val_xxl').val() == '' || $('.tanceng .qt_xj_htmc_val_xxl').val() == '员工合同') {
			alert('请输入合同名称或不能为空');
			return false;
		}
		qt_add_datas_xxl.template_id = $('.tanceng .qt_xj_xzhtmb_val_xxl').attr('uid');
		qt_add_datas_xxl.name = $('.tanceng .qt_xj_htmc_val_xxl').val();
		if(typeof($('.tanceng .qt_xj_xzbm_valxxl').attr('uid')) == "undefined"||$('.tanceng .qt_xj_xzbm_valxxl').attr('uid')=='0'||$('.tanceng .qt_xj_xzbm_valxxl').val()=='') {
			alert('没有负责部门不能提交')
			return false;
		}
		qt_add_datas_xxl.dept_id = $('.tanceng .qt_xj_xzbm_valxxl').attr('uid');
//		if(typeof($('.tanceng .qt_xj_fzr_valxxl').attr('uid')) == "undefined") {
//			alert('请选择负责人')
//			return false;
//		}
		qt_add_datas_xxl.owner_id = $('.tanceng .qt_xj_fzr_valxxl').attr('uid');
		var flowhtxj_qt = [];
		$.each($('.tanceng .spr_add_xxl>li[userid]'), function(i, v) {
			flowhtxj_qt.push($(this).attr('userid'))
		});
		if(flowhtxj_qt.length == 0) {
			alert('请选择审批人员')
			return false;
		}
		var copyxsxj_qt = [];
		$.each($('.tanceng .csr_add_xxl>li[userid]'), function(i, v) {
			copyxsxj_qt.push($(this).attr('userid'))
		});
//		if(copyxsxj_qt.length == 0) {
//			alert('请选择抄送人员')
//			return false;
//		}
		qt_add_datas_xxl.flow = flowhtxj_qt.join();//
		qt_add_datas_xxl.copy_list = copyxsxj_qt.join();
		//console.log(qt_add_datas_xxl)
		qt_add_ajaxs_xxl()
})
//编辑合同-提交审批
$('.tanceng .qt_ckbj_tjsp_btnxxl').die().live('click', function() {
	qt_add_datas_xxl.id = $(this).attr('uid');
	qt_add_datas_xxl.is_open='1';
	qt_add_datas_xxl.other_sn = $('.tanceng .qt_ckbj_htbh_xxl').val();
	if(typeof($('.tanceng .qt_ckbj_xzhtmb_xxl').attr('uid')) == "undefined") {
		alert('请选择合同模板')
		return false;
	}
	if($('.tanceng .qt_ckbj_htmc_xxl').val() == '' || $('.tanceng .qt_ckbj_htmc_xxl').val() == '员工合同') {
		alert('请输入合同名称或不能为空');
		return false;
	}
	qt_add_datas_xxl.template_id = $('.tanceng .qt_ckbj_xzhtmb_xxl').attr('uid');
	qt_add_datas_xxl.name = $('.tanceng .qt_ckbj_htmc_xxl').val();
	if(typeof($('.tanceng .qt_ckbj_fzbm_xxl').attr('uid')) == "undefined"||$('.tanceng .qt_ckbj_fzbm_xxl').attr('uid')=='0'||$('.tanceng .qt_ckbj_fzbm_xxl').val()=='') {
		alert('负责部门没有不能提交')
		return false;
	}
	qt_add_datas_xxl.dept_id = $('.tanceng .qt_ckbj_fzbm_xxl').attr('uid');
//	if(typeof($('.tanceng .qt_ckbj_fzr_xxl').attr('uid')) == "undefined") {
//		alert('请选择负责人')
//		return false;
//	}
	qt_add_datas_xxl.owner_id = $('.tanceng .qt_ckbj_fzr_xxl').attr('uid');
	var flowbj_qt = [];
	$.each($('.tanceng .spr_add_xxl>li[userid]'), function(i, v) {
		flowbj_qt.push($(this).attr('userid'))
	});
	if(flowbj_qt.length == 0) {
		alert('请选择审批人员')
		return false;
	}
	var copybj_qt = [];
	$.each($('.tanceng .csr_add_xxl>li[userid]'), function(i, v) {
		copybj_qt.push($(this).attr('userid'))
	});
//	if(copybj_qt.length == 0) {
//		alert('请选择抄送人员')
//		return false;
//	}
	qt_add_datas_xxl.flow = flowbj_qt.join();
	qt_add_datas_xxl.copy_list = copybj_qt.join();
	//console.log(qt_add_datas_xxl)
	qt_add_ajaxs_xxl()
	$(this).parent().parent().parent().remove();
	var num = $('.tanceng').children(".dialog_box").length;
	if(num < 1) {
		$(".tanceng").hide();
	}
})

//待我审批
var qt_dwsp_data_ck_xxl = {
	token: token,
	id: ''
}

function qt_dwsp_ck_ajax_xxl() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "other-contract/info",
		data: qt_dwsp_data_ck_xxl,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg)
			} else {
				console.log(data)
				var dwsplist_qt = data['data'];
				$('.qt_dwsp_tit_xxl').html(likNullData(dwsplist_qt.name));
				$('.qt_dwsp_cjrqs_xxl').html(likNullData(dwsplist_qt.created_at));
				$('.qt_dwsp_cjrs_xxl').html(likNullData(dwsplist_qt.uname))
				$('.qt_dwsp_htbhs_xxl').html(likNullData(dwsplist_qt.other_sn));
				$('.qt_dwsp_htmcs_xxl').html(likNullData(dwsplist_qt.name));
				$('.qt_dwspck_jujuebtn_xxl').attr('uid', dwsplist_qt.id)
				$('.qt_dwspck_tongguo_btnxxl').attr('uid', dwsplist_qt.id)
				if(data.data.status == 3) {
					$('.qt_dwsp_img_xxl').css('display', 'block')
					$('.qt_dwsp_imgno_xxl').css('display', 'none')
					$('.qt_dwspck_jujuebtn_xxl').attr('disabled', 'disabled')
					$('.qt_dwspck_tongguo_btnxxl').attr('disabled', 'disabled')
				} else if(data.data.status == 2) {
					$('.qt_dwsp_img_xxl').css('display', 'none')
					$('.qt_dwsp_imgno_xxl').css('display', 'block')
					$('.qt_dwspck_jujuebtn_xxl').attr('disabled', 'disabled')
					$('.qt_dwspck_tongguo_btnxxl').attr('disabled', 'disabled')
				} else {
					$('.qt_dwsp_img_xxl').css('display', 'none')
					$('.qt_dwsp_imgno_xxl').css('display', 'none')
					$('.qt_dwspck_jujuebtn_xxl').removeAttr('disabled')
					$('.qt_dwspck_tongguo_btnxxl').removeAttr('disabled')
				}
				$('.qt_dwsp_yulan_btnxxl').attr({'uid':dwsplist_qt.id,'status':data.data.status,'iszuofei':dwsplist_qt.is_invalid,'htbh':dwsplist_qt.other_sn});
				$('.qt_dwsp_shzts_xxl').html(dwsplist_qt.status_name);
				var flownamess_qts = []
				$.each(data.data.flow_info, function(i, v) {
					flownamess_qts.push(v.name)
				});
				$('.qt_dwsp_shrs_xxl').html(flownamess_qts.join());
				$('.qt_dwsp_fzbms_xxl').html(likNullData(dwsplist_qt.dept_name))
				$('.qt_dwsp_fzrs_xxl').html(likNullData(dwsplist_qt.owner_name))
				if(dwsplist_qt.check_log.length == 0) {
					$('.qt_dwsp_spyjlist_html_xxl').html('')
				} else {
					var fbyj_listhtml = '';
					fbyj_listhtml +='<div class="sq_look_check_box">';
					fbyj_listhtml +='<div class="xs_sp_result"><h3 class="cont_title" style="margin-left: 36px;">审批结果</h3></div>';
                    fbyj_listhtml +='<div class="work_spiliubox" style="margin-top:0;background: #fff;">';
                    $.each(dwsplist_qt.check_log, function(i,v) {
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
//					$.each(dwsplist_qt.check_log, function(i, v) {
//						fbyj_html_qt_dwsp += ' <div class="work_spiliu"><div class="work_spiliu_items"><div class="left" style="position: relative;">';
//
//						if(v.uid == tokenid) {
//							fbyj_html_qt_dwsp += '<img class="inline_block tx" src="' + v.face + '"><cite class="b_h"></cite></div>';
//							fbyj_html_qt_dwsp += '<div class="right auto_height"><img src="static/images/work_jiantou.png"><div class="sp_cont">';
//							fbyj_html_qt_dwsp += '<div><h3 class="c_3">我</h3><span class="c_9 m_left_5">' + v.day + '</span></div>';
//						} else {
//							fbyj_html_qt_dwsp += '<img class="inline_block tx" src="' + v.face + '"><cite class="b_y"></cite></div>';
//							fbyj_html_qt_dwsp += '<div class="right auto_height" ><img src="static/images/work_jiantou.png"><div class="sp_cont">';
//							fbyj_html_qt_dwsp += '<div><h3 class="c_3">' + v.name + '</h3><span class="c_9 m_left_5">' + v.day + '</span></div>';
//						}
//						if(i == 0) {
//							fbyj_html_qt_dwsp += '<h3 class=" f_color">发起审批</h3>';
//						} else {
//							if(v.status == 1) {
//								fbyj_html_qt_dwsp += '<h3 class="c_b" style="color:#f8ac59;">进行中</h3>'
//							} else if(v.status == 2) {
//								fbyj_html_qt_dwsp += '<h3 class="c_r" style="color:#ff6c60;">未通过</h3>'
//							} else {
//								fbyj_html_qt_dwsp += '<h3 class="c_g">通过审批</h3>'
//							}
//
//						}
//						fbyj_html_qt_dwsp += '<p class="c_3 work_sp_p">' + v.note + '</p></div></div><div style="clear: both;height: 0;font-size: 1px;line-height: 0px;"></div></div></div>'
//					});
					$('.qt_dwsp_spyjlist_html_xxl').html(fbyj_listhtml)
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
$('.dwsp_qt_ckbtn_xxl').die().live('click', function() {
		qt_dwsp_data_ck_xxl.id = $(this).attr('uid')
		qt_dwsp_ck_ajax_xxl()
	})
	//预览 待我审批查看
$('.qt_dwsp_yulan_btnxxl').die().live('click', function() {
	$('.tanceng .daochu_qt').attr('htbh',$(this).attr('htbh'));
	if($(this).attr('status')==1&&$(this).attr('iszuofei')!=1){
		$('.tanceng .qt_dwspck_jujuebtn_xxl').attr('uid',$(this).attr('uid')).removeAttr('disabled').show();
		$('.tanceng .qt_dwspck_tongguo_btnxxl').attr('uid',$(this).attr('uid')).removeAttr('disabled').show();
	}else{
		$('.tanceng .qt_dwspck_jujuebtn_xxl').attr('disabled', 'disabled').hide();
		$('.tanceng .qt_dwspck_tongguo_btnxxl').attr('disabled', 'disabled').hide();
	}
		qtht_ckyulan_data.id = $(this).attr('uid');
		qtht_ckyulan_data.is_open='1';
		qtht_ckyulan_ajax()
	})
	//审批-Btn
$('.dwsp_qt_sp_btn_xxl').die().live('click', function() {
		$('.tanceng .qt_spxq_jujue_btnxxl').attr('uid', $(this).attr('uid')).removeAttr('disabled').addClass('but_red').removeClass('but_grey1');
		$('.tanceng .qt_spxq_tongguo_btnxxl').attr('uid', $(this).attr('uid')).removeAttr('disabled').addClass('but_blue').removeClass('but_grey1');
		qtht_ckyulan_data.id = $(this).attr('uid');
		qtht_ckyulan_data.is_open='1';
		qtht_ckyulan_ajax()
	})
	//通过审批
$('.tanceng .qt_spxq_jujue_btnxxl').die().live('click', function() {
	$('.tanceng .qt_spyj_queding_btnxxl').attr({
		'ztid': 2,
		'uid': $(this).attr('uid')
	})
})
$('.tanceng .qt_spxq_tongguo_btnxxl').die().live('click', function() {
	$('.tanceng .qt_spyj_queding_btnxxl').attr({
		'ztid': 1,
		'uid': $(this).attr('uid')
	})
})
var qt_dwsp_spyj_datas_xxl = {
	token: token,
	check_type: '', //1通过2拒绝
	id: '',
	note: ''
}

function qt_dwsp_spyj_ajax_xxl() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "other-contract/check",
		data: qt_dwsp_spyj_datas_xxl,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg)
			} else {
				//console.log(data)
				$('.tanceng .qt_spxq_jujue_btnxxl').addClass('but_grey1').removeClass('but_red').attr('disabled','disabled');
				$('.tanceng .qt_spxq_tongguo_btnxxl').addClass('but_grey1').removeClass('but_blue').attr('disabled','disabled');
				qtht_data_xxl.thetype = 2;
				qtht_list_ajax_xxl()
				qt_dwsp_ck_ajax_xxl()
				$('.tanceng').css('display', 'none')

			}
		},
		error: function(e) {
			console.log(e)

		}
	});
}
$('.tanceng .qt_spyj_queding_btnxxl').die().live('click', function() {
		qt_dwsp_spyj_datas_xxl.check_type = $(this).attr('ztid');
		qt_dwsp_spyj_datas_xxl.id = $(this).attr('uid');
		if($('.tanceng .qt_spyj_val_xxl').val() == '' || $('.tanceng .qt_spyj_val_xxl').val() == '请输入审批意见') {
			//alert('审批意见不能为空喔!!!')
			//return false;
			$('.tanceng .qt_spyj_val_xxl').val('');
		}
		qt_dwsp_spyj_datas_xxl.note = $('.tanceng .qt_spyj_val_xxl').val();
		qt_dwsp_spyj_ajax_xxl()
		$('.qt_dwsp_ckhtml_box_xxl').css('display', 'none')
		$('.tanceng').empty().hide();
//		$(this).parent().parent().parent().remove();
//		var num = $('.tanceng').children(".dialog_box").length;
//		if(num < 1) {
//			$(".tanceng").hide();
//		};
	})
	//查看里的拒绝 通过按钮
$('.qt_dwspck_jujuebtn_xxl').die().live('click', function() {
	$('.tanceng .qt_spyj_queding_btnxxl').attr({
		'ztid': 2,
		'uid': $(this).attr('uid')
	})
})
$('.qt_dwspck_tongguo_btnxxl').die().live('click', function() {
		$('.tanceng .qt_spyj_queding_btnxxl').attr({
			'ztid': 1,
			'uid': $(this).attr('uid')
		})
	})
	//抄送我的 -查看
var qt_cswd_ck_btn_xxl = {
	token: token,
	id: ''
}

function qt_cswd_ck_ajax_xxl() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "other-contract/info",
		data: qt_cswd_ck_btn_xxl,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg)
			} else {
				console.log(data)
				var cswdlist_qt = data['data'];
				$('.qt_cswd_tit_xxl').html(likNullData(cswdlist_qt.name));
				$('.qt_cswd_cjrq_xxl').html(likNullData(cswdlist_qt.created_at));
				$('.qt_cswd_cjr_xxl').html(likNullData(cswdlist_qt.uname))
				$('.qt_cswd_htbh_xxl').html(likNullData(cswdlist_qt.other_sn));
				$('.qt_cswd_htmc_xxl').html(likNullData(cswdlist_qt.name));

				if(data.data.status == 3) {
					$('.qt_cswd_img_xxl').css('display', 'block')
					$('.qt_cswd_imgno_xxl').css('display', 'none')
				} else if(data.data.status == 2) {
					$('.qt_cswd_img_xxl').css('display', 'none')
					$('.qt_cswd_imgno_xxl').css('display', 'block')
				} else {
					$('.qt_cswd_img_xxl').css('display', 'none')
					$('.qt_cswd_imgno_xxl').css('display', 'none')
				}
				$('.qt_cswd_yulan_btnxxl').attr({'uid':cswdlist_qt.id,'htbh':cswdlist_qt.other_sn})//cswdlist_qt.other_sn
				$('.qt_cswd_shzt_xxl').html(likNullData(cswdlist_qt.status_name));
				var flowcswd_qts = []
				$.each(data.data.flow_info, function(i, v) {
					flowcswd_qts.push(v.name)
				});
				$('.qt_cswd_shr_xxl').html(flowcswd_qts.join());
				$('.qt_cswd_fzbm_xxl').html(likNullData(cswdlist_qt.dept_name));
				$('.qt_cswd_fzr_xxl').html(likNullData(cswdlist_qt.owner_name))
				if(cswdlist_qt.check_log.length == 0) {
					$('.qt_cswd_spyjlist_html_xxl').html('')
				} else {
					var fbyj_listhtml = '';
					fbyj_listhtml +='<div class="sq_look_check_box">';
					fbyj_listhtml +='<div class="xs_sp_result"><h3 class="cont_title" style="margin-left: 36px;">审批结果</h3></div>';
                    fbyj_listhtml +='<div class="work_spiliubox" style="margin-top:0;background: #fff;">';
                    $.each(cswdlist_qt.check_log, function(i,v) {
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
//					$.each(cswdlist_qt.check_log, function(i, v) {
//						fbyj_cswd_qt += ' <div class="work_spiliu"><div class="work_spiliu_items"><div class="left" style="position: relative;">';
//
//						if(v.uid == tokenid) {
//							fbyj_cswd_qt += '<img class="inline_block tx" src="' + v.face + '"><cite class="b_h"></cite></div>';
//							fbyj_cswd_qt += '<div class="right auto_height"><img src="static/images/work_jiantou.png"><div class="sp_cont">';
//							fbyj_cswd_qt += '<div><h3 class="c_3">我</h3><span class="c_9 m_left_5">' + v.day + '</span></div>';
//						} else {
//							fbyj_cswd_qt += '<img class="inline_block tx" src="' + v.face + '"><cite class="b_y"></cite></div>';
//							fbyj_cswd_qt += '<div class="right auto_height" ><img src="static/images/work_jiantou.png"><div class="sp_cont">';
//							fbyj_cswd_qt += '<div><h3 class="c_3">' + v.name + '</h3><span class="c_9 m_left_5">' + v.day + '</span></div>';
//						}
//						if(i == 0) {
//							fbyj_cswd_qt += '<h3 class=" f_color">发起审批</h3>';
//						} else {
//							if(v.status == 1) {
//								fbyj_cswd_qt += '<h3 class="c_b" style="color:#f8ac59;">进行中</h3>'
//							} else if(v.status == 2) {
//								fbyj_cswd_qt += '<h3 class="c_r" style="color:#ff6c60;">未通过</h3>'
//							} else {
//								fbyj_cswd_qt += '<h3 class="c_g">通过审批</h3>'
//							}
//
//						}
//						fbyj_cswd_qt += '<p class="c_3 work_sp_p">' + v.note + '</p></div></div><div style="clear: both;height: 0;font-size: 1px;line-height: 0px;"></div></div></div>'
//					});
					$('.qt_cswd_spyjlist_html_xxl').html(fbyj_listhtml)
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
$('.cswd_qt_ckbtn_xxl').die().live('click', function() {
		//console.log($(this).attr('uid'))
		qt_cswd_ck_btn_xxl.id = $(this).attr('uid');
		qt_cswd_ck_ajax_xxl()
	})
	//抄送我的 预览
$('.qt_cswd_yulan_btnxxl').die().live('click', function() {
	$('.tanceng .daochu_qt').attr('htbh',$(this).attr('htbh'));
		$('.tanceng .qt_dwspck_jujuebtn_xxl').hide();
		$('.tanceng .qt_dwspck_tongguo_btnxxl').hide();
		qtht_ckyulan_data.id = $(this).attr('uid');
		qtht_ckyulan_data.is_open='1';
		qtht_ckyulan_ajax()
	})
	//历史记录
var qt_wfqd_lsjl_data = {
	token: token,
	id: ''
}

function qt_wfqd_lsjl_ajax() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "other-contract/historyinfo",
		data: qt_wfqd_lsjl_data,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg)
			} else {
				console.log(data)
				var qt_lsjl_list = data['datalist'],
					qt_wfqd_lsjl = '';
				$.each(qt_lsjl_list, function(i, v) {
					if(v.thetype == 1) {
						$('.qt_wfqd_lsjl_imgxxl').attr('src', v.face);
						$('.qt_wfqd_lsjl_cjr_xxl').html(v.uname);
						$('.qt_wfqd_lsjl_cjsj_xxl').html(v.created_at);
						if(v.from_type == 1) {
							$('.qt_wfqd_lsjl_ly_xxl').html('来自PC端');
						} else if(v.from_type == 2) {
							$('.qt_wfqd_lsjl_ly_xxl').html('来自手机IOS端');
						} else {
							$('.qt_wfqd_lsjl_ly_xxl').html('来自手机Android端');
						}
						$('.qt_wfqd_lsjl_htbh_xxl').html(v.other_sn);
						$('.qt_wfqd_lsjl_htmc_xxl').html(v.name)
						$('.qt_wfqd_lsjl_shzt_xxl').text('审核中')
						$('.qt_wfqd_lsjl_shr_xxl').html(v.flow_name);
						$('.qt_wfqd_lsjl_fzbm_xxl').html(v.dept_name)
						$('.qt_wfqd_lsjl_fzr_xxl').html(v.owner_name);
					} else if(v.thetype == 2) {
						qt_wfqd_lsjl += '<div class="d-r-t-h"><div class="d-r-box">';
						qt_wfqd_lsjl += '<img class="l-sl-i" src="' + v.face + '">';
						qt_wfqd_lsjl += '<div class="d-r-r"><p class="u-id-t">' + v.name + '</p>';
						if(v.from_type == 1) {
							qt_wfqd_lsjl += '<p class="t-s-p">' + v.created_at + '<span class="sala_customer_msgcome">来自PC端</span></p></div></div></div>';
						} else if(v.from_type == 2) {
							qt_wfqd_lsjl += '<p class="t-s-p">' + v.created_at + '<span class="sala_customer_msgcome">来自手机IOS端</span></p></div></div></div>';
						} else {
							qt_wfqd_lsjl += '<p class="t-s-p">' + v.created_at + '<span class="sala_customer_msgcome">来自手机Android端</span></p></div></div></div>';
						}
						qt_wfqd_lsjl += '<div class="d-r-t-h"><p class="l-s-x">制单人：<span>' + v.uname + '</span></p>';
						qt_wfqd_lsjl += '<p class="l-s-x">合同模板名称：<span>' + v.template_name + '</span></p>';
						qt_wfqd_lsjl += '<p class="l-s-x">合同名称：<span>' + v.name + '</span></p>';
						qt_wfqd_lsjl += '<p class="l-s-x">入职成员：<span>' + v.job_name + '</span></p>';
						qt_wfqd_lsjl += '<p class="l-s-x">签订时间：<span>' + v.sign_time + '</span></p>';
						qt_wfqd_lsjl += '<p class="l-s-x">签订地点：<span>' + v.sign_address + '</span></p>';
						qt_wfqd_lsjl += '<p class="l-s-x">用人单位：<span>' + v.people_unit + '</span></p>';
						qt_wfqd_lsjl += '<p class="l-s-x">合同期限：<span>' + v.unit_start_time + '-' + v.unit_end_time + '</span></p>';
						qt_wfqd_lsjl += '<p class="l-s-x">试用期：<span>' + v.probation + '</span></p>';
						qt_wfqd_lsjl += '<p class="l-s-x">基本工资：<span>' + v.base_wage + '</span></p>';
						qt_wfqd_lsjl += '<p class="l-s-x">绩效工资：<span>' + v.perf_wage + '</span></p>';
						qt_wfqd_lsjl += '<p class="l-s-x">合计工资：<span>' + v.sum_wage + '</span></p>';
						qt_wfqd_lsjl += '<p class="l-s-x">审批人：<span>' + v.flow_name + '</span></p>';
						qt_wfqd_lsjl += '<p class="l-s-x">抄送人：<span>' + v.copy_name + '</span></p>';
						qt_wfqd_lsjl += '</div>';

					}

				});
				$('.qt_wfqd_lsjl_html_xxl').html(qt_wfqd_lsjl)
			}
		},
		error: function(e) {
			console.log(e)
		}
	});
}

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
			html += '<li class="left_2 person_left_nav" userinfoid="' + data2['id'] + '">' + html_i_list_before + '<span class="list_msg">' + data2['name'] + ' </span></li>'
		})

		html += '</li>';
		html += '</ul>';
		html += '</ul>'
	});
	return html
}
function qtht_rytree_ajax(){
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
$('.val_dialogTop[name="ht_other_people"]').die().live('click',function(){
	qtht_rytree_ajax()
})

//审批人员操作
var sp_rynum_qt = [];
var buzou = ['步骤一', '步骤二', '步骤三', '步骤四', '步骤五']
$('.tanceng .qt_sp_qued_btnxxl').die().live('click', function() {

		if($('.tanceng .spr_add_xxl').children('li').length < 4) {
			sp_rynum_qt = []
		}
		var trues = $.inArray($('.tanceng .spcy_tree_xxl li.on').attr('userinfoid'), sp_rynum_qt);
		//alert(sp_rynum_qt)
		if(trues != -1) {
			alert('重复了')
		} else {
			if($('.tanceng .spr_add_xxl').children().length > 5) {
				alert('最多只能添加3位喔！')
			} else {
				$('.tanceng .qt_spqian_list_xxl').before('<li userid="' + $('.spcy_tree_xxl li.on').attr('userinfoid') + '"><i class="del_img_1">-</i><em class="icon_personBtn icon_personBtn_msg"><i class="icon_personNext"></i></em><em class="icon_adderBtn"></em><p class="box_adderName">' + $('.spcy_tree_xxl li.on').children('span.list_msg').html() + '</p> <p class="box_addermsg">步骤一</p></li>');
				//$('.tanceng .chuchai_spr')
				sp_rynum_qt.push($('.tanceng .spcy_tree_xxl li.on').attr('userinfoid'));
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
		sp_rynum_qt.splice($.inArray($(this).parent().attr('userid'), sp_rynum_qt), 1);
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
$('.tanceng .val_dialogTop[name="ht_other_peoples"]').die().live('click', function() {
	$('.qt_csrlist_xxl').html('')
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
		$('.tanceng .qt_csrlist_xxl').append('<li rid="' + $(this).attr('userinfoid') + '"><span>' + $(this).children('.list_msg').html() + '</span><i class="list_choose_delete"></i></li>')
		$(this).find('span.list_check em').addClass('on')
		$(this).addClass('on')
		notli.removeClass('on')
	}, function() {
		$('.qt_csrlist_xxl').find('li[rid=' + $(this).attr('userinfoid') + ']').remove()
		$(this).find('span.list_check em').removeClass('on')
	})

})
$('.list_choose_delete').die().live('click', function() {
	$(this).parent().remove();
	$('.tanceng .csr_list_xxl ul .person_left_nav[userinfoid=' + $(this).parent().attr('rid') + ']').removeClass('on').find('span.list_check em').removeClass('on')
})
var csnumss_qt = []
$('.tanceng .qt_csrlist_qued_btnxxl').die('click').live('click', function() {
		if($('.tanceng .qt_csrlist_xxl li').length < 1) {
			alert('请选择人员')
			return
		} else {

			if($('.tanceng .csr_add_xxl').children('li').length < 3) {
				csnumss_qt = []
			}
			var truess = $.inArray($('.qt_csrlist_xxl li').attr('rid'), csnumss_qt);
			if(truess != -1) {
				alert('重复了')
			} else {
				$.each($('.tanceng .qt_csrlist_xxl li'), function(i, v) {
						csnumss_qt.push($(this).attr('rid'));
						if($('.tanceng .csr_add_xxl').children().length > 4) {
							alert('最多只能添加3位哦')
						} else {
							$('.tanceng .csr_add_xxl').prepend('<li userid="' + $(this).attr('rid') + '"><i class="del_img_1">-</i><em class="icon_personBtn icon_personBtn_msg"></em><em class="icon_adderBtn"></em><p class="box_adderName">' + $(this).children('span').html() + '</p></li>')
						}

					})
					//alert(csnumss_qt)
			}
			//alert(csnumss_qt)
		}
		$('.qt_csrlist_xxl').html('')
		$(this).parent().parent().parent().remove();
		var num = $('.tanceng').children(".dialog_box").length;
		if(num < 1) {
			$(".tanceng").hide();
		};
	})
	//删除数组中的一位
$('.tanceng .del_img_1').die().live('click', function() {
	csnumss_qt.splice($.inArray($(this).parent().attr('userid'), csnumss_qt), 1);
})

//选择负责部门
function tree_list_dialog(datalist, deep) {
	var html = '';
	$.each(datalist, function(index, data) {
		var html_i_list_before = '<i class="list_before_span"></i>';
		html += '<ul class="ul1">';
		for(var j = 0; j < deep; j++) {
			html_i_list_before += '<i class="list_before_span"></i>'
		}
		html += '<li class="left_1" cussortid = "' + data["id"] + '">' + html_i_list_before + '<span class="icon_open change_ba"></span><span class="icon_file"></span><span class="list_msg">' + data['name'] + '</span></li>';
		if(data['children'] && data['children'].length > 0) {
			html += tree_list_dialog(data['children'], deep + 1);
		}
		html += '</li>';
		html += '</ul>'
	});
	return html
}
function qtht_xzbm_listajax(){
	$.ajax({
	type: "get",
	url: SERVER_URL + "dept/list",
	data: {
		token: token
	},
	dataType: 'json',
	success: function(data) {
		if(data.code != 0) {
			console.log(data.msg)
		} else {
			console.log(data)
			var datalists = data['rows'],
				deep = 0;
			$('.qt_xzbm_treelist_xxl').html(tree_list_dialog(datalists, deep));
		}
	},
	error: function(e) {

	}
});
}

$('.tanceng .qt_xzbmtree_qued_btnxxl').die().live('click', function() {

		var bmuid_cg = $('.tanceng .qt_xzbm_treelist_xxl li.on').attr('cussortid'),
			bmmcs_cg = $('.tanceng .qt_xzbm_treelist_xxl li.on').children('span.list_msg').html();
		$('.tanceng .qt_ckbj_fzbm_xxl').val(bmmcs_cg).attr('uid', bmuid_cg).css('color', '#333');
		$('.tanceng .qt_xj_xzbm_valxxl').val(bmmcs_cg).attr('uid', bmuid_cg).css('color', '#333');
		$(this).parent().parent().parent().remove();
		var num = $('.tanceng').children(".dialog_box").length;
		if(num < 1) {
			$(".tanceng").hide();
		}
	})
	//选择负责人
$('.tanceng .qt_xzfzr_btns_xxl').die('click').live('click', function() {
	//console.log($('.tanceng .spcy_tree_xxl li.on').attr('userinfoid'),$('.tanceng .spcy_tree_xxl li.on').children('span.list_msg').html())
	var bj_fzrid_qt = $('.tanceng .spcy_tree_xxl li.on').attr('userinfoid'),
		bj_fzrmc_qt = $('.tanceng .spcy_tree_xxl li.on').children('span.list_msg').html(),
		bmmc = $('.tanceng .spcy_tree_xxl li.on').parents('ul').prev('li').children('.list_msg').html(),
			bmid = $('.tanceng .spcy_tree_xxl li.on').parents('ul').prev('li').attr('cussortid');
	$('.tanceng .qt_ckbj_fzr_xxl').val(bj_fzrmc_qt).attr('uid', bj_fzrid_qt).css('color', '#333');
	$('.tanceng .qt_ckbj_fzbm_xxl').val(bmmc).attr('uid',bmid).css('color', '#333');
	$('.tanceng .qt_xj_fzr_valxxl').val(bj_fzrmc_qt).attr('uid', bj_fzrid_qt).css('color', '#333');
	$('.tanceng .qt_xj_xzbm_valxxl').val(bmmc).attr('uid',bmid).css('color', '#333');
	$(this).parent().parent().parent().remove();
	var num = $('.tanceng').children(".dialog_box").length;
	if(num < 1) {
		$(".tanceng").hide();
	}
})