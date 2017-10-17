//$(function(){
	

var token, page, num;
token = Admin.get_token();
page = 1;
num = 10;
//SERVER_URL="http://192.168.0.167:9091/";
//SERVER_URL = 'http://192.168.0.167:9010/';
//token = '2017052516045457073-1-1';
var loginUserInfo = JSON.parse(localStorage.getItem('user_info'));
var xinjiankf='warehouse/add';
if(loginUserInfo['company_admin'] != 1){
	if(loginUserInfo.powerUrls.length==0){
		$('button.val_dialog[name="storage_ckgl_xj"]').hide();
		//$('.kfgl_list_html_xxl button.kfgl_bj_btn_xxl').hide()
		$('.kfgl_ck_bjbtn_xxl[name="storage_ckgl_bj"]').hide();
	}else{
		var arr = loginUserInfo.powerUrls;//
		if($.inArray(xinjiankf, arr)!=-1){
			$('button.val_dialog[name="storage_ckgl_xj"]').show();
			//$('button.kfgl_bj_btn_xxl[name="storage_ckgl_bj"]').show();
			$('.kfgl_ck_bjbtn_xxl[name="storage_ckgl_bj"]').show();
		}else{
			$('button.val_dialog[name="storage_ckgl_xj"]').hide();
			//$('button.kfgl_bj_btn_xxl[name="storage_ckgl_bj"]').hide();
			$('.kfgl_ck_bjbtn_xxl[name="storage_ckgl_bj"]').hide();
		}
		
		
	}
}


//库房列表
var kuf_list_data_xxl = {
	token: token,
	page: page,
	num: num,
	key: ''
}

function kuf_list_ajax() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "warehouse/list",
		data: kuf_list_data_xxl,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg)
				$('.kfgl_list_html_xxl').html('');
				$('.kfgl_errhtml_xxl').removeClass('none');
				$('.kfgl_fenye_xxl').css('display', 'none');
			} else {
				console.log(data)
				var kfgl_list = data['datalist'],
					kfgl_html = '';
				$('.kfgl_listnums_xxl').html(data.totalcount)
				if(kfgl_list.length == 0) {
					$('.kfgl_list_html_xxl').html('');
					$('.kfgl_errhtml_xxl').removeClass('none');
					$('.kfgl_fenye_xxl').css('display', 'none');
				} else {
					$('.kfgl_errhtml_xxl').addClass('none');
					$('.kfgl_fenye_xxl').css('display', 'block');
					$.each(kfgl_list, function(i, v) {
						if(v.status == 1) {
							kfgl_html += '<tr><td>' + Appendzero(i + 1) + '</td>'
							kfgl_html += '<td>' + likNullData(v.name) + '</td>';
							//kfgl_html += '<td>' + likNullData(v.owner_name) + '</td>';
							//kfgl_html += '<td>' + likNullData(v.tel) + '</td>';
							kfgl_html += '<td>' + likNullData(v.address) + '</td>';
							kfgl_html += '<td>' + likNullData(v.remark) + '</td>';
							kfgl_html += '<td><button class="but_mix but_look r_sidebar_btn but_look kfgl_ck_btn_xxl" name="storage_kfgl_ck" uid="' + v.id + '">查看</button>';
							kfgl_html += '<button class="but_mix but_r but_stop kfgl_tingy_btn_xxl" uid="' + v.id + '">停用</button></td></tr>';
						} else{
							kfgl_html += '<tr class="c_c"><td><span class="voidIcon">已停用</span></td>'
							kfgl_html += '<td>' + likNullData(v.name) + '</td>';
							//kfgl_html += '<td>' + likNullData(v.owner_name) + '</td>';
							//kfgl_html += '<td>' + likNullData(v.tel) + '</td>';
							kfgl_html += '<td>' + likNullData(v.address) + '</td>';
							kfgl_html += '<td>' + likNullData(v.remark) + '</td>';
							kfgl_html += '<td><button class="but_mix but_look r_sidebar_btn but_look kfgl_ck_btn_xxl" name="storage_kfgl_ck" uid="' + v.id + '">查看</button>';				
							if(loginUserInfo['company_admin'] != 1){
								if(loginUserInfo.powerUrls.length==0){
									//kfgl_html += '<button class="but_mix but_exit val_dialog kfgl_bj_btn_xxl" name="storage_ckgl_bj" uid="' + v.id + '">编辑</button>';
								}else{
									var arr = loginUserInfo.powerUrls;
									if($.inArray(xinjiankf, arr)!=-1){
										kfgl_html += '<button class="but_mix but_exit val_dialog kfgl_bj_btn_xxl" name="storage_ckgl_bj" uid="' + v.id + '">编辑</button>';
									}else{
										
									}
								}
							}else if(loginUserInfo['company_admin'] == 1){
								kfgl_html += '<button class="but_mix but_exit val_dialog kfgl_bj_btn_xxl" name="storage_ckgl_bj" uid="' + v.id + '">编辑</button>';
							}
							
							kfgl_html += '<button class="but_mix but_r but_use kfgl_qiyong_btn_xxl" uid="' + v.id + '">启用</button><button class="but_mix but_r val_dialog kfgl_sc_btn_xxl" name="crk_kfgl_delete" uid="' + v.id + '">删除</button></td></tr>';
						}
					});
					$('.kfgl_list_html_xxl').html(kfgl_html);
					list_table_render_pagination(".kfgl_fenye_xxl", kuf_list_data_xxl, kuf_list_ajax, data["totalcount"], kfgl_list.length)
				}
			}
		},
		error: function(e) {
			console.log(e)
			$('.kfgl_list_html_xxl').html('');
			$('.kfgl_errhtml_xxl').removeClass('none');
			$('.kfgl_fenye_xxl').css('display', 'none');
		}
	});
}
kuf_list_ajax()


	//补零
function Appendzero(obj) {
	if(obj < 10) return "0" + obj;
	else return obj;
}
//点击刷新
$('.kfgl_djsx_btn_xxl').die().live('click', function() {
		add_Rload_index(68, 8) //参数页面值，父级值
	})
	//搜索
//function kfgl_sousuo_now(val) {
//	//console.log(val)
//	kuf_list_data_xxl.key = val;
//	kuf_list_ajax()
//}
$('.kfgl_ss_btn_xxl').die().live('click', function() {
		if($('.kfgl_ss_value_xxl').val() == '' || $('.kfgl_ss_value_xxl').val() == '搜索库房名称') {
			kuf_list_data_xxl.key='';
		} else {
			kuf_list_data_xxl.key = $('.kfgl_ss_value_xxl').val();
			
		}
		kuf_list_ajax()
	})
	//查看
var kf_ck_data = {
	token: token,
	warehouse_id: ''
}
$('.kfgl_ck_btn_xxl').die().live('click', function() {
	kf_ck_data.warehouse_id = $(this).attr('uid');
	kfgl_chakan_ajax();
	$('.Sideslip_list ul li').eq(0).trigger('click')
})

function kfgl_chakan_ajax() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "warehouse/info",
		data: kf_ck_data,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg)
			} else {
				console.log(data)
				var kf_data = data['data'];
				if(kf_data.status == 1) {
					$('.kfgl_ck_genduo_xxl').css('display', 'block');
					$('.tanceng .kfgl_bj_status_yesxxl').attr('checked', 'checked');
				} else {
					$('.kfgl_ck_genduo_xxl').css('display', 'none');
					$('.tanceng .kfgl_bj_status_noxxl').attr('checked', 'checked');
				}
				$('.kfgl_ck_tit_xxl').html(likNullData(kf_data.name));
				$('.kfgl_ck_cjrq_xxl').html(likNullData(kf_data.created_at))
				$('.kfgl_ck_ckbtn_xxl').attr({'uid': kf_data.id,'kfname':kf_data.name});
				$('.kfgl_ck_ckmc_xxl').html(likNullData(kf_data.name));
				//$('.kfgl_ck_fzr_xxl').html(likNullData(kf_data.owner_name));
				//$('.kfgl_ck_lxdh_xxl').html(likNullData(kf_data.tel));
				$('.kfgl_ck_ckdz_xxl').html(likNullData(kf_data.address));
				$('.kfgl_ck_bz_xxl').html(likNullData(kf_data.remark))
				$('#ckd_list_xxl').attr('uid', kf_data.id)
				$('#rkd_list_xxl').attr('uid', kf_data.id)
				$.each($('.kf_ckgdlist_main_xxl li'), function(i, v) {
					$(this).attr('uid', kf_data.id)
				});
				$('.tanceng .kfgl_bj_qued_btnxxl').attr('uid', kf_data.id)
				$('.tanceng .kfgl_bj_mc_xxl').val(kf_data.name).addClass('c_3');
				$('.tanceng .kfgl_bj_fzr_xxl').val(kf_data.owner_name).attr('uid', kf_data.owner).addClass('c_3');
				$('.tanceng .kfgl_bj_fzrdh_xxl').val(kf_data.tel).addClass('c_3');
				$('.tanceng .kfgl_bj_s_xxl').val(kf_data.province_name).addClass('c_3');
				$('.tanceng .kfgl_bj_city_valxxl').val(kf_data.city_name).addClass('c_3');
				$('.tanceng .kfgl_bj_quyu_valxxl').val(kf_data.area_name).addClass('c_3');
				$('.tanceng .kfgl_bj_jtdz_xxl').val(kf_data.address).addClass('c_3');
				$('.tanceng .kfgl_bj_bz_xxl').val(kf_data.remark).addClass('c_3');
				if(kf_data.is_default == 1) {
					$('.tanceng .kfgl_bj_moren_xxl').removeAttr("checked");
				} else {
					$(".tanceng .kfgl_bj_moren_xxl").attr("checked", "checked");
				}

			}
		},
		error: function(e) {
			console.log(e)
		}
	});
}
//编辑-按钮点击 
$('.kfgl_bj_btn_xxl').die().live('click', function() {
	kf_ck_data.warehouse_id = $(this).attr('uid');
	kfgl_chakan_ajax();
})
$('.kfgl_ck_bjbtn_xxl').die().live('click', function() {
		kf_ck_data.warehouse_id = $(this).attr('uid');
		kfgl_chakan_ajax();
	})
	//当前库存
var dqkc_data_xxl = {
	token: token,
	id: ''
}
$('.kfgl_ck_ckbtn_xxl').die().live('click', function() {
	$('.tanceng .kufangguanli_chakan_h3_kfnamexxl').html($(this).attr('kfname')+'-商品数量')
	dqkc_data_xxl.id = $(this).attr('uid');
	dqkc_ajax_xxl();
})

function dqkc_ajax_xxl() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "warehouse/current",
		data: dqkc_data_xxl,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg)
				$('.kfgl_dqkc_table_xxl').html('').next('tbody').hide();
					//$('.kfgl_dqkc_fenye_listxxl').css('display', 'none')
				$('.kfgl_dqkc_errhtml_xxl').css('display', 'block');
			} else {
				console.log(data)
				var dqkc_list = data.data['dataList'],
					dqkc_html = '';
				//console.log(data.data.total)
				if(dqkc_list.length == 0) {
					$('.kfgl_dqkc_table_xxl').html('').next('tbody').hide();
					$('.kfgl_dqkc_sjnums_xxl').html('0');
					//$('.kfgl_dqkc_nums_xxl').html('0');
					$('.kfgl_dqkc_errhtml_xxl').css('display', 'block');
				} else {
					//console.log(dqkc_list.length)
					$('.kfgl_dqkc_sjnums_xxl').html(dqkc_list.length)
					$('.kfgl_dqkc_fenye_listxxl').css('display', 'block')
					$('.kfgl_dqkc_errhtml_xxl').css('display', 'none');
                    $('.kfgl_dqkc_table_xxl').next('tbody').show();
					$.each(dqkc_list, function(i, v) {
						dqkc_html += '<tr><td>' + likNullData(v.code_sn) + '</td>';
						if(v.product_type == 1) {
							dqkc_html += '<td>商品</td>';
						} else {
							dqkc_html += '<td>整机商品</td>';
						}
						dqkc_html += '<td>' + likNullData(v.product_name) + '</td>';
						dqkc_html += '<td>' + likNullData(v.unit_name) + '</td>';
						//dqkc_html += '<td>' + likNullData(v.format) + '</td>';
						dqkc_html += '<td>' + likNullData(v.attr_name) + '</td>';
						dqkc_html += '<td>' + likNullData(v.num) + '</td></tr>';
					});
					$('.kfgl_dqkc_table_xxl').html(dqkc_html);
					//$('.kfgl_dqkc_nums_xxl').html(data.data.total)
						//console.log($('.kfgl_dqkc_table_xxl tr').children().eq(0).html())
						//console.log($('.kfgl_dqkc_table_xxl tr').children().eq(2).html())
				}

			}
		},
		error: function(e) {
			console.log(e)
			$('.kfgl_dqkc_table_xxl').html('').next('tbody').hide();
				//$('.kfgl_dqkc_fenye_listxxl').css('display', 'none')
			$('.kfgl_dqkc_errhtml_xxl').css('display', 'block');
		}
	});
}
//sousuo
//$(".tanceng .kfgl_dqkc_ssvalue").keyup(function() {
//					$("table tbody tr").filter(":contains('" + ($(this).val()) + "')").show().siblings().hide(); //filter和contains共同来实现了这个功能。
//				}).keyup();
$('.tanceng .kfgl_ck_dqkc_ss').die().live('click',function(){
	var kc_tit = $('.kfgl_dqkc_ssvalue').val();
	if(kc_tit == '' || kc_tit == '搜索商品编号/商品名称') {
		$('.kfgl_dqkc_table_xxl tr').show();
		dqkc_ajax_xxl()
	} else {
		$(".tanceng .kfgl_dqkc_table_xxl tr").hide().filter(":contains('" + (kc_tit) + "')").show().addClass('shownow');//.siblings()
		if($('.tanceng .kfgl_dqkc_table_xxl tr.shownow').length==0){
			//$('.kfgl_dqkc_nums_xxl').html('0');
			$('.kfgl_dqkc_sjnums_xxl').html('0');
		}else{
			var arrnums = [],
					kc_ssnums = 0;
			$('.tanceng .kfgl_dqkc_table_xxl tr').each(function(i,v) {
				if($('.tanceng .kfgl_dqkc_table_xxl tr').eq(i).is('.shownow')){
					//arrnums = []
					arrnums.push($(this).children('td:last-child').html())
				}else{
					
				}
				
			})
			//console.log(arrnums)
			$.each(arrnums, function(i,v) {
				kc_ssnums +=parseInt(v);
			});
					
			//$('.kfgl_dqkc_nums_xxl').html(kc_ssnums);
			$('.kfgl_dqkc_sjnums_xxl').html($('.tanceng .kfgl_dqkc_table_xxl tr.shownow').length)
		}
		
		
		

	}
})
//function kfgl_ck_dqkc_ss(val) {
//	
//}
//出库单
var kfgl_ckd_data = {
	token: token,
	id: ''
}
$('#ckd_list_xxl').die().live('click', function() {
	kfgl_ckd_data.id = $(this).attr('uid');
	kfgl_chd_ajax();
})

function kfgl_chd_ajax() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "warehouse/out",
		data: kfgl_ckd_data,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.code)
			} else {
				console.log(data)
				var ckd_list = data['dataList'],
					ckd_html = '';
				if(ckd_list.length == 0) {
					$('.kfgl_ckd_list_html_xxl').html('')
				} else {
					$.each(ckd_list, function(i, v) {
						ckd_html += '<div class="d-r-t-h">';
						ckd_html += '<p class="l-s-x">创建日期：<span>' + likNullData(v.create_time) + '</span></p>';
						ckd_html += '<p class="l-s-x">出库编号：<span>' + likNullData(v.number) + '</span></p>';
						ckd_html += '<p class="l-s-x">关联单据订单：<span>' + likNullData(v.related_receipts_no) + '</span></p>';
						if(v.output_type == 1) {
							ckd_html += '<p class="l-s-x">出库类型：<span>销售退货</span></p>';
						} else if(v.output_type == 2) {
							ckd_html += '<p class="l-s-x">出库类型：<span>采购入库</span></p>';
						} else if(v.output_type == 3) {
							ckd_html += '<p class="l-s-x">出库类型：<span>调拨</span></p>';
						} else if(v.output_type == 4) {
							ckd_html += '<p class="l-s-x">出库类型：<span>借入 </span></p>';
						} else if(v.output_type == 5) {
							ckd_html += '<p class="l-s-x">出库类型：<span>借出归还 </span></p>';
						} else {
							ckd_html += '<p class="l-s-x">出库类型：<span>换货入库 </span></p>';
						}
						if(v.logistics_way == 1) {
							ckd_html += '<p class="l-s-x">物流方式：<span>快递 </span></p>';
						} else if(v.logistics_way == 2) {
							ckd_html += '<p class="l-s-x">物流方式：<span>陆运  </span></p>';
						} else if(v.logistics_way == 3) {
							ckd_html += '<p class="l-s-x">物流方式：<span>空运   </span></p>';
						} else if(v.logistics_way == 4) {
							ckd_html += '<p class="l-s-x">物流方式：<span>平邮   </span></p>';
						} else {
							ckd_html += '<p class="l-s-x">物流方式：<span>海运   </span></p>';
						}
						ckd_html += '<p class="l-s-x">出库库房：<span>' + likNullData(v.warehouse_name) + '</span></p>';
						ckd_html += '<p class="l-s-x">出库数量：<span>' + likNullData(v.output_num) + '</span></p>';
						ckd_html += '<p class="l-s-x">已出库数量：<span>' + likNullData(v.distribution_num) + '</span></p>';
						if(v.output_status == 1) {
							ckd_html += '<p class="l-s-x">出库状态：<span>待出库</span></p>';
						} else if(v.output_status == 2) {
							ckd_html += '<p class="l-s-x">出库状态：<span>部分出库</span></p>';
						} else {
							ckd_html += '<p class="l-s-x">出库状态：<span>完成出库</span></p>';
						}
						if(v.shipments_status == 1) {
							ckd_html += '<p class="l-s-x">发货状态：<span>待发货</span></p>';
						} else if(v.shipments_status == 2) {
							ckd_html += '<p class="l-s-x">发货状态：<span>部分发货</span></p>';
						} else {
							ckd_html += '<p class="l-s-x">发货状态：<span>完成发货</span></p>';
						}
						ckd_html += '<p class="l-s-x">出库人：<span>' + likNullData(v.output_name) + '</span></p>';
						ckd_html += '<p class="l-s-x">备注：<span>' + likNullData(v.remark) + '</span></p>';
						ckd_html += '</div>';
					});
					$('.kfgl_ckd_list_html_xxl').html(ckd_html)
				}
			}
		},
		error: function(e) {
			console.log(e)
		}
	});
}
//入库单
var rkd_data_ck = {
	token: token,
	id: ''
}
$('#rkd_list_xxl').die().live('click', function() {
	rkd_data_ck.id = $(this).attr('uid');
	rkd_ajax_ck();
})

function rkd_ajax_ck() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "warehouse/in",
		data: rkd_data_ck,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg)
			} else {
				console.log(data)
				var rkd_list = data['dataList'],
					rkd_html = '';
				if(rkd_list.length == 0) {
					$('.kfgl_ck_rkd_listhtml_xxl').html('')
				} else {
					$.each(rkd_list, function(i, v) {
						rkd_html += '<div class="d-r-t-h">';
						rkd_html += '<p class="l-s-x">创建日期：<span>' + likNullData(v.create_time) + '</span></p>';
						rkd_html += '<p class="l-s-x">入库编号：<span>' + likNullData(v.number) + '</span></p>';
						rkd_html += '<p class="l-s-x">关联单据编号：<span>' + likNullData(v.related_receipts_no) + '</span></p>';
						if(v.input_type == 1) {
							rkd_html += '<p class="l-s-x">入库类型：<span>销售退货</span></p>';
						} else if(v.input_type == 2) {
							rkd_html += '<p class="l-s-x">入库类型：<span>采购入库</span></p>';
						} else if(v.input_type == 3) {
							rkd_html += '<p class="l-s-x">入库类型：<span>调拨</span></p>';
						} else if(v.input_type == 4) {
							rkd_html += '<p class="l-s-x">入库类型：<span>借入 </span></p>';
						} else if(v.input_type == 5) {
							rkd_html += '<p class="l-s-x">入库类型：<span>借出归还 </span></p>';
						} else {
							rkd_html += '<p class="l-s-x">入库类型：<span>换货入库 </span></p>';
						}
						rkd_html += '<p class="l-s-x">入库库房：<span>' + likNullData(v.inputing_name) + '</span></p>';
						rkd_html += '<p class="l-s-x">入库数量：<span>' + likNullData(v.input_num) + '</span></p>';
						rkd_html += '<p class="l-s-x">已入库数量：<span>' + likNullData(v.distribution_num) + '</span></p>';
						if(v.input_status == 1) {
							rkd_html += '<p class="l-s-x">入库状态：<span>待入库</span></p>';
						} else if(v.input_status == 2) {
							rkd_html += '<p class="l-s-x">入库状态：<span>部分入库</span></p>';
						} else {
							rkd_html += '<p class="l-s-x">入库状态：<span>完成入库</span></p>';
						}
						rkd_html += '<p class="l-s-x">入库人：<span>' + likNullData(v.input_name) + '</span></p>';
						rkd_html += '</div>';
						
					});
					$('.kfgl_ck_rkd_listhtml_xxl').html(rkd_html)
				}
			}
		},
		error: function(e) {
			console.log(e)
		}
	});
}
//删除
$('.kfgl_sc_btn_xxl').die().live('click', function() {
	$('.kfgl_shanchu_btn_queding_xxl').attr('uid', $(this).attr('uid'))
})
$('.kfgl_ck_scbtn_xxl').die().live('click', function() {
	//console.log($(this).attr('uid'))
	$('.kfgl_shanchu_btn_queding_xxl').attr('uid', $(this).attr('uid'))
})
var kfgl_del_data = {
	token: token,
	warehouse_id: ''
}
$('.kfgl_shanchu_btn_queding_xxl').die().live('click', function() {
	kfgl_del_data.warehouse_id = $(this).attr('uid');
	kfgl_del_ajax();
})

function kfgl_del_ajax() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "warehouse/del",
		data: kfgl_del_data,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg)
			} else {
				console.log(data)
				add_Rload_index(68, 8) //参数页面值，父级值
			}
		},
		error: function(e) {
			console.log(e)
		}
	});
}
//停用 启用
var kfgl_ting_qi_data = {
	token: token,
	warehouse_id: '',
	status_flag: '' //1启用 2停用
}
$('.kfgl_ck_tingy_btnxxl').die().live('click', function() {
	kfgl_ting_qi_data.warehouse_id = $(this).attr('uid');
	kfgl_ting_qi_data.status_flag = 2;
	kfgl_ting_qi_ajax();
})
$('.kfgl_tingy_btn_xxl').die().live('click', function() {
	kfgl_ting_qi_data.warehouse_id = $(this).attr('uid');
	kfgl_ting_qi_data.status_flag = 2;
	kfgl_ting_qi_ajax();
})
$('.kfgl_qiyong_btn_xxl').die().live('click', function() {
	kfgl_ting_qi_data.status_flag = 1;
	kfgl_ting_qi_data.warehouse_id = $(this).attr('uid');
	kfgl_ting_qi_ajax();
})

function kfgl_ting_qi_ajax() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "warehouse/setstatus",
		data: kfgl_ting_qi_data,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg)
			} else {
				console.log(data)
				kuf_list_ajax()
				//add_Rload_index(68, 8) //参数页面值，父级值
			}
		},
		error: function(e) {
			console.log(e)
		}
	});
}
//城市接口
$('.tanceng .kfgl_shenglist_xxl,.tanceng .kfgl_xj_s_xxl,.tanceng .kfgl_bj_s_xxl').die().live('click', function() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "industry/provincelist",
		data: {
			big_area_id: '0',
			token: token
		},
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg)
			} else {
				console.log(data)
				var cs_list = data['datalist'],
					cs_html = '';
				$.each(cs_list, function(i, v) {
					cs_html += '<li uid="' + v.provinceID + '">' + v.province + '</li>';
				});
				$('.tanceng .kfgl_xj_sheng_list_xxl').html(cs_html);
				$('.tanceng .kfgl_bj_s_html_xxl').html(cs_html)
			}
		},
		error: function(e) {
			console.log(e)
		}
	});
})
$('.tanceng .kfgl_xj_sheng_list_xxl li').die().live('click', function() {
	$('.tanceng .kfgl_xj_s_xxl').attr('uid', $(this).attr('uid')).val($(this).text()).addClass('c_3');
	$('.tanceng .kfgl_xj_chengshi_list_xxl').attr('uid', $(this).attr('uid'));
	$('.tanceng .kfgl_cj_city_value_xxl').attr('uid', $(this).attr('uid'));
	
})
$('.tanceng .kfgl_bj_s_html_xxl li').die().live('click', function() {
	$('.tanceng .kfgl_bj_s_xxl').attr('uid', $(this).attr('uid')).val($(this).text()).addClass('c_3');
	$('.tanceng .kfgl_xj_chengshi_list_xxl').attr('uid', $(this).attr('uid'));
	$('.tanceng .kfgl_bj_city_valxxl').attr('uid', $(this).attr('uid'));
})
$('.tanceng .kfgl_xj_chengshi_list_xxl,.tanceng .kfgl_cj_city_value_xxl,.tanceng .kfgl_bj_city_valxxl').die().live('click', function() {
	var s_id = $(this).attr('uid');
	$.ajax({
		type: "get",
		url: SERVER_URL + "industry/citylist",
		data: {
			token: token,
			province_id: s_id
		},
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg)
			} else {
				console.log(data)
				var city_list = data['datalist'],
					city_html = '';
				$.each(city_list, function(i, v) {
					city_html += '<li uid="' + v.cityID + '">' + v.city + '</li>';
				});
				$('.tanceng .kfgl_xj_city_listhtml_xxl').html(city_html);
				$('.tanceng .kfgl_bj_city_html_xxl').html(city_html);
			}
		},
		error: function(e) {
			console.log(e)
		}
	});
})
$('.tanceng .kfgl_xj_city_listhtml_xxl li').die().live('click', function() {
	$('.tanceng .kfgl_cj_city_value_xxl').attr('uid', $(this).attr('uid')).val($(this).text()).addClass('c_3');
	$('.tanceng .kfgl_xj_quyu_btn_xxl').attr('uid', $(this).attr('uid'));
	$('.tanceng .kfgl_xj_quyu_val_xxl').attr('uid', $(this).attr('uid'));
})
$('.tanceng .kfgl_bj_city_html_xxl li').die().live('click', function() {
	$('.tanceng .kfgl_bj_city_valxxl').attr('uid', $(this).attr('uid')).val($(this).text()).addClass('c_3');
	$('.tanceng .kfgl_xj_quyu_btn_xxl').attr('uid', $(this).attr('uid'));
	$('.tanceng .kfgl_bj_quyu_valxxl').attr('uid', $(this).attr('uid'));
})
$('.tanceng .kfgl_xj_quyu_btn_xxl,.tanceng .kfgl_xj_quyu_val_xxl,.tanceng .kfgl_bj_quyu_valxxl').die().live('click', function() {
	var qy_id = $(this).attr('uid');
	$.ajax({
		type: "get",
		url: SERVER_URL + "industry/arealist",
		data: {
			token: token,
			city_id: qy_id
		},
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg)
			} else {
				console.log(data)
				var qy_list = data['datalist'],
					qy_html = '';
				$.each(qy_list, function(i, v) {
					qy_html += '<li uid="' + v.areaID + '">' + v.area + '</li>';
				});
				$('.tanceng .kfgl_xj_quyuhtml_xxl').html(qy_html);
				$('.tanceng .kfgl_bj_quyu_html_xxl').html(qy_html)
			}
		},
		error: function(e) {
			console.log(e)
		}
	});
})
$('.tanceng .kfgl_xj_quyuhtml_xxl li').die().live('click', function() {
	$('.tanceng .kfgl_xj_quyu_val_xxl').attr('uid', $(this).attr('uid')).val($(this).text()).addClass('c_3');
})
$('.tanceng .kfgl_bj_quyu_html_xxl li').die().live('click', function() {
		$('.tanceng .kfgl_bj_quyu_valxxl').attr('uid', $(this).attr('uid')).val($(this).text()).addClass('c_3');
	})
	//新建
var kfgl_xj_data = {
	token: token,
	name: '', //名称
	owner: '', //负责人id
	tel: '', //联系人电话
	country: '0', //国家
	province: '', //省
	city: '', //市
	area: '', //区
	address: '', //地址
	remark: '', //备注
	status: '', //是否启用	1启用 2停用
	is_default: '', //是否默认库房	1否 2是
	id: '' //空新建
}
$('.tanceng .kfgl_xj_queding_btn_xxl').die('click').live('click', function() {
	if($('.tanceng .kfgl_xj_mc_xxl').val() == '' || $('.kfgl_xj_mc_xxl').val() == '请输入名称') {
		alert('请输入名称')
		return false;
	}
	kfgl_xj_data.name = $('.kfgl_xj_mc_xxl').val();
	if(typeof($('.tanceng .kfgl_xj_fzr_xxl').attr('uid')) == "undefined") {
//		alert('请选择负责人')
//		return false;
		kfgl_xj_data.owner = '';
	}else{
		kfgl_xj_data.owner = $('.tanceng .kfgl_xj_fzr_xxl').attr('uid');
	}
	
//	if($('.kfgl_xj_fzrdh_xxl').val() == '' || $('.kfgl_xj_fzrdh_xxl').val() == '请输入负责人电话') {
//		$('.kfgl_xj_fzrdh_xxl').val('')
//	}
//	kfgl_xj_data.tel = $('.kfgl_xj_fzrdh_xxl').val();
	if(typeof($('.tanceng .kfgl_xj_s_xxl').attr('uid')) == "undefined") {
		$('.tanceng .kfgl_xj_s_xxl').attr('uid', '')
	}
	kfgl_xj_data.province = $('.tanceng .kfgl_xj_s_xxl').attr('uid')
	if(typeof($('.tanceng .kfgl_cj_city_value_xxl').attr('uid')) == "undefined") {
		$('.tanceng .kfgl_cj_city_value_xxl').attr('uid', '')
	}
	kfgl_xj_data.city = $('.tanceng .kfgl_cj_city_value_xxl').attr('uid')
	if(typeof($('.tanceng .kfgl_xj_quyu_val_xxl').attr('uid')) == "undefined") {
		$('.tanceng .kfgl_xj_quyu_val_xxl').attr('uid', '')
	}
	kfgl_xj_data.area = $('.tanceng .kfgl_xj_quyu_val_xxl').attr('uid')
	if($('.kfgl_xj_jutidizhi_xxl').val() == '' || $('.kfgl_xj_jutidizhi_xxl').val() == '请输入具体地址') {
		$('.kfgl_xj_jutidizhi_xxl').val('');
	}
	kfgl_xj_data.address = $('.kfgl_xj_jutidizhi_xxl').val();
	if($('.kfgl_xj_beizhu_xxl').val() == '' || $('.kfgl_xj_beizhu_xxl').val() == '请输入备注') {
		$('.kfgl_xj_beizhu_xxl').val('')
	}
	kfgl_xj_data.remark = $('.kfgl_xj_beizhu_xxl').val();
	kfgl_xj_data.status = $("input[name='crk_kfgl_kfqy']:checked").attr('uid');
	//console.log($("input[name='crk_kfgl_kfqy']:checked").attr('uid')); 
//	if($('.kfgl_xj_moren_xxl').attr('checked')) {
//		kfgl_xj_data.is_default = 2;
//	} else {
//		kfgl_xj_data.is_default = 1;
//	}
	//console.log(kfgl_xj_data)
	kfgl_xj_ajax();
	$(this).parent().parent().parent().remove();
	var num = $('.tanceng').children(".dialog_box").length;
	if(num < 1) {
		$(".tanceng").hide();
	}

})

function kfgl_xj_ajax() {
	$.ajax({
		type: "post",
		url: SERVER_URL + "warehouse/add",
		data: kfgl_xj_data,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg)
			} else {
				console.log(data)
				kuf_list_ajax()
			}
		},
		error: function(e) {
			console.log(e)
		}
	});
}
$('.tanceng .kfgl_xzfzr_qdbtn_xxl').die().live('click', function() {
		var kfgl_fzrid = $('.tanceng .kfgl_xzry_list_xxl li.on').attr('userinfoid'),
			kfgl_fzrmc = $('.tanceng .kfgl_xzry_list_xxl li.on').children('span.list_msg').html();
		$('.kfgl_xj_fzr_xxl').val(kfgl_fzrmc).attr('uid', kfgl_fzrid)
		$('.tanceng .kfgl_bj_fzr_xxl').val(kfgl_fzrmc).attr('uid', kfgl_fzrid)
		$(this).parent().parent().parent().remove();
		var num = $('.tanceng').children(".dialog_box").length;
		if(num < 1) {
			$(".tanceng").hide();
		}
	})
	//选择负责人
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
function renyuan_kfgl_ajax(){
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
			$('.kfgl_xzry_list_xxl').html(tree_list_person(datalists, deep));
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
$('.val_dialogTop[name="storage_kfgl_xzfzr"]').die().live('click',function(){
	renyuan_kfgl_ajax()
})

//编辑
$('.tanceng .kfgl_bj_qued_btnxxl').die().live('click', function() {
	if($('.tanceng .kfgl_bj_mc_xxl').val() == '' || $('.tanceng .kfgl_bj_mc_xxl').val() == '请输入名称') {
		alert('请输入名称')
		return false;
	}
	kfgl_xj_data.name = $('.tanceng .kfgl_bj_mc_xxl').val();
	if(typeof($('.tanceng .kfgl_bj_fzr_xxl').attr('uid')) == "undefined") {
//		alert('请选择负责人')
//		return false;
		kfgl_xj_data.owner = '';
	}else{
		kfgl_xj_data.owner = $('.tanceng .kfgl_bj_fzr_xxl').attr('uid');
	}
	

//	if($('.tanceng .kfgl_bj_fzrdh_xxl').val() == '' || $('.tanceng .kfgl_bj_fzrdh_xxl').val() == '请输入负责人电话') {
//		$('.tanceng .kfgl_bj_fzrdh_xxl').val('')
//	}
//	kfgl_xj_data.tel = $('.tanceng .kfgl_bj_fzrdh_xxl').val();
	if(typeof($('.tanceng .kfgl_bj_s_xxl').attr('uid')) == "undefined") {
		$('.tanceng .kfgl_bj_s_xxl').attr('uid', '')
	}
	kfgl_xj_data.province = $('.tanceng .kfgl_bj_s_xxl').attr('uid')
	if(typeof($('.tanceng .kfgl_bj_city_valxxl').attr('uid')) == "undefined") {
		$('.tanceng .kfgl_bj_city_valxxl').attr('uid', '')
	}
	kfgl_xj_data.city = $('.tanceng .kfgl_bj_city_valxxl').attr('uid')
	if(typeof($('.tanceng .kfgl_bj_quyu_valxxl').attr('uid')) == "undefined") {
		$('.tanceng .kfgl_bj_quyu_valxxl').attr('uid', '')
	}
	kfgl_xj_data.area = $('.tanceng .kfgl_bj_quyu_valxxl').attr('uid')
	if($('.tanceng .kfgl_bj_jtdz_xxl').val() == '' || $('.tanceng .kfgl_bj_jtdz_xxl').val() == '请输入具体地址') {
		$('.tanceng .kfgl_bj_jtdz_xxl').val('');
	}
	kfgl_xj_data.address = $('.tanceng .kfgl_bj_jtdz_xxl').val();
	if($('.tanceng .kfgl_bj_bz_xxl').val() == '' || $('.tanceng .kfgl_bj_bz_xxl').val() == '请输入备注') {
		$('.tanceng .kfgl_bj_bz_xxl').val('')
	}
	kfgl_xj_data.remark = $('.tanceng .kfgl_bj_bz_xxl').val();
	kfgl_xj_data.status = $("input[name='crk_kfgl_kfqy_bj']:checked").attr('uid');
	//console.log($("input[name='crk_kfgl_kfqy']:checked").attr('uid')); 
	if($('.tanceng .kfgl_bj_moren_xxl').attr('checked')) {
		kfgl_xj_data.is_default = 2;
	} else {
		kfgl_xj_data.is_default = 1;
	}
	kfgl_xj_data.id = $(this).attr('uid');
	console.log(kfgl_xj_data)
	kfgl_xj_ajax();
	$(this).parent().parent().parent().remove();
	var num = $('.tanceng').children(".dialog_box").length;
	if(num < 1) {
		$(".tanceng").hide();
	}
})

//})