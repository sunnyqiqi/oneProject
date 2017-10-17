var token, page, num;
token = Admin.get_token();
uid = Admin.get_uid();
username = localStorage.getItem('username');
//SERVER_URL="http://192.168.0.167:9091/";
page = 1;
num = 10;
//username = '邢啸亮';
//token = "2017051317050663733-1-1";
//SERVER_URL = 'http://192.168.0.167:9010/';
var loginUserInfo = JSON.parse(localStorage.getItem('user_info'));
var xjdiaobo='allot/add',zuofei='allot/cancel';
if(loginUserInfo['company_admin'] != 1){
	if(loginUserInfo.powerUrls.length==0){
		$('.val_dialogTop[name="crk_tbsp_new"]').hide();
	}else{
		var arr = loginUserInfo.powerUrls;//
		if($.inArray(xjdiaobo, arr)!=-1){
			$('.val_dialogTop[name="crk_tbsp_new"]').show()
		}else{
			$('.val_dialogTop[name="crk_tbsp_new"]').hide()
		}
		
		
	}
}
var tbsp_list_data = {
		token: token,
		page: page,
		num: num,
		key: '',
		output_warehouse: '', //调出库房
		product_type: '', //1 商品 3配置商品
		input_warehouse: '', //调入库房
		principal: '', //调拨人
		creater: '', //创建人
		order_by: 'create_time', //排序字段: create_time（调拨日期）, num(数量)
		order_sort: '1', //排序序号： 0 正序 1 倒序
		is_cancel: '' //0.正常 1.作废
	}
	// 定义查看项
var dbsp_xackx_list_xxl = [{
	'index': null,
	'field': '调拨人'
}, {
	'index': null,
	'field': '创建人'
}, {
	'index': null,
	'field': '备注'
}];

function tbsp_list_ajax() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "allot/list",
		data: tbsp_list_data,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data)
				$('.dbsp_list_html_xxl').html('');
				$('.tbsp_fenye_list_xxl').css('display', 'none');
				$('.dbsp_errhtml_xxl').css('display', 'block');
			} else {
				console.log(data)
				var dbsp_list = data['dataList'],
					dbsp_html = '';
				$('.dbsp_list_mainnums_xxl').html(data.totalcount);
				if(dbsp_list.length == 0) {
					$('.dbsp_list_html_xxl').html('');
					$('.tbsp_fenye_list_xxl').css('display', 'none');
					$('.dbsp_errhtml_xxl').css('display', 'block');
				} else {
					$('.tbsp_fenye_list_xxl').css('display', 'block');
					$('.dbsp_errhtml_xxl').css('display', 'none');
					$.each(dbsp_list, function(i, v) {
						if(v.is_cancel == 1) {
							dbsp_html += '<tr class="grey">';
							dbsp_html += '<td><span class="voidIcon">作废</span></td>';
							dbsp_html += '<td>' + likNullData(v.number) + '</td>';
							if(v.product_type == 1) {
								dbsp_html += '<td>商品</td>';
							} else {
								dbsp_html += '<td>整机商品</td>';
							}
							dbsp_html += '<td>' + likNullData(v.num) + '</td>';
							dbsp_html += '<td>' + likNullData(v.output_warehouse) + '</td>';
							dbsp_html += '<td>' + likNullData(v.input_warehouse) + '</td>';
							dbsp_html += '<td>' + likNullData(v.principal) + '</td>';
							dbsp_html += '<td>' + likNullData(v.create_time) + '</td>';
							dbsp_html += '<td>' + likNullData(v.creater) + '</td>';
							dbsp_html += '<td><p class="xiangmu_p2">' + likNullData(v.remark) + '</p></td>';
							dbsp_html += '<td><button class="but_mix but_look r_sidebar_btn dbsp_ckbtn_xxl" name="crk_tbsp_lookBox" uid="' + v.id + '">查看</button></td></tr>';
						} else {
							dbsp_html += '<tr>';
							dbsp_html += '<td>' + Appendzero(i + 1) + '</td>';
							dbsp_html += '<td>' + likNullData(v.number) + '</td>';
							if(v.product_type == 1) {
								dbsp_html += '<td>商品</td>';
							} else {
								dbsp_html += '<td>整机商品</td>';
							}
							dbsp_html += '<td>' + likNullData(v.num) + '</td>';
							dbsp_html += '<td>' + likNullData(v.output_warehouse) + '</td>';
							dbsp_html += '<td>' + likNullData(v.input_warehouse) + '</td>';
							dbsp_html += '<td>' + likNullData(v.principal) + '</td>';
							dbsp_html += '<td>' + likNullData(v.create_time) + '</td>';
							dbsp_html += '<td>' + likNullData(v.creater) + '</td>';
							dbsp_html += '<td><p class="xiangmu_p2">' + likNullData(v.remark) + '</p></td>';
							var xjdiaobo='allot/add',zuofei='allot/cancel';
							if(loginUserInfo['company_admin'] != 1){
								if(loginUserInfo.powerUrls.length==0){
									dbsp_html += '<td><button class="but_mix but_look r_sidebar_btn dbsp_ckbtn_xxl" name="crk_tbsp_lookBox" uid="' + v.id + '">查看</button></td></tr>';
								}else{
									var arr = loginUserInfo.powerUrls;//
									if($.inArray(zuofei, arr)!=-1){
										dbsp_html += '<td><button class="but_mix but_look r_sidebar_btn dbsp_ckbtn_xxl" name="crk_tbsp_lookBox" uid="' + v.id + '">查看</button><button class="but_mix but_void but_r dbsp_zuofei_btn_xxl" uid="' + v.id + '">作废</button></td></tr>';
									}else{
										dbsp_html += '<td><button class="but_mix but_look r_sidebar_btn dbsp_ckbtn_xxl" name="crk_tbsp_lookBox" uid="' + v.id + '">查看</button></td></tr>';
									}
									
									
								}
							}else if(loginUserInfo['company_admin'] == 1){
								dbsp_html += '<td><button class="but_mix but_look r_sidebar_btn dbsp_ckbtn_xxl" name="crk_tbsp_lookBox" uid="' + v.id + '">查看</button><button class="but_mix but_void but_r dbsp_zuofei_btn_xxl" uid="' + v.id + '">作废</button></td></tr>';
							}
							//dbsp_html += '<td><button class="but_mix but_look r_sidebar_btn dbsp_ckbtn_xxl" name="crk_tbsp_lookBox" uid="' + v.id + '">查看</button><button class="but_mix but_void but_r dbsp_zuofei_btn_xxl" uid="' + v.id + '">作废</button></td></tr>';
						}
					});
					$('.dbsp_list_html_xxl').html(dbsp_html);
					
				}
				list_table_render_pagination(".tbsp_fenye_list_xxl", tbsp_list_data, tbsp_list_ajax, data["totalcount"], dbsp_list.length);
					likShow('#dbsp_xzckx_table_xxl', dbsp_xackx_list_xxl, '#dbsp_xzckx_ul_xxl', '#dbsp_xzckx_baocun_btnxxl', '#dbsp_xzckx_huifumoren_btn_xxl');
			}
		},
		error: function(e) {
			console.log(e)
			$('.dbsp_list_html_xxl').html('');
			$('.tbsp_fenye_list_xxl').css('display', 'none');
			$('.dbsp_errhtml_xxl').css('display', 'block');
		}
	});
}
tbsp_list_ajax()
//切换状态升降序
var dbspdbnum=0;
$('.dbsp_dbnums_sjsxpl_xxl').die().live('click',function(){
	dbspdbnum++;
	if(dbspdbnum%2==0){
		tbsp_list_data.order_sort = '0';
	}else{
		tbsp_list_data.order_sort = '1';
	}
	tbsp_list_data.order_by = 'num';
	tbsp_list_ajax();
})
//$('.dbsp_dbnums_sjsxpl_xxl').toggle(function() {
//		$(this).children(".price_icon").removeClass("down").addClass("up");
//		tbsp_list_data.order_by = 'num';
//		tbsp_list_data.order_sort = '0';
//		tbsp_list_ajax()
//	}, function() {
//		$(this).children(".price_icon").removeClass("up").addClass("down");
//		tbsp_list_data.order_by = 'num';
//		tbsp_list_data.order_sort = '1';
//		tbsp_list_ajax()
//	})
var dbspcjrq=0;
$('.dbsp_cjrq_sortpx_xxl').die().live('click',function(){
	dbspcjrq++;
	if(dbspcjrq%2==0){
		tbsp_list_data.order_sort = '0';
	}else{
		tbsp_list_data.order_sort = '1';
	}
	tbsp_list_data.order_by = 'create_time';
	tbsp_list_ajax();
})
//$('.dbsp_cjrq_sortpx_xxl').toggle(function() {
//		$(this).children(".price_icon").removeClass("down").addClass("up");
//		tbsp_list_data.order_by = 'create_time';
//		tbsp_list_data.order_sort = '0';
//		tbsp_list_ajax()
//	}, function() {
//		$(this).children(".price_icon").removeClass("up").addClass("down");
//		tbsp_list_data.order_by = 'create_time';
//		tbsp_list_data.order_sort = '1';
//		tbsp_list_ajax()
//	})
	//点击刷新
$('.tbsp_djsx_btn_xxl').die().live('click', function() {
		add_Rload_index(75, 8) //参数页面值，父级值
	})
	//补零
function Appendzero(obj) {
	if(obj < 10) return "0" + obj;
	else return obj;
}
//搜索
//function dbsp_sousuo_now(val) {
//	tbsp_list_data.key = val;
//	tbsp_list_ajax()
//}
$('.dbsp_ss_btn_xxl').die().live('click', function() {
		if($('.dbsp_ss_value_xxl').val() == '' || $('.dbsp_ss_value_xxl').val() == '商品编号/商品名称') {
			tbsp_list_data.key='';
		} else {
			tbsp_list_data.key = $('.dbsp_ss_value_xxl').val();
			
		}
		tbsp_list_ajax()
	})
	//不显示已作废
$('.dbsp_noshow_btn_xxl').die().live('click', function() {
		if($(this).prop("checked")) {
			tbsp_list_data.is_cancel = '1';
			tbsp_list_ajax()
		} else {
			tbsp_list_data.is_cancel = '0';
			tbsp_list_ajax()
		}
	})
	//高级搜索
var dbsp_gjss_data = {
	token: token
}

function dbsp_gjss_ajax() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "allot/alluser",
		data: dbsp_gjss_data,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data)
			} else {
				console.log(data)
				var dbsp_gjss = data['data'],
					dckf_list = '';
					
				$.each(dbsp_gjss.allotNameList, function(i, v) {
					dckf_list += '<li uid="' + v.id + '">' + v.name + '</li>';
					
				});
				
				$('.dbsp_dbr_mainlist_xxl').html(dckf_list);
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
			console.log(e)
		}
	});
}
$('.diaoboren_gjss_valuexxl,.diaoboren_gjss_valuexxl+i').die().live('click',function(){
	dbsp_gjss_ajax();
})
$('.zkgjssBtn[name="storage_tbsp_zkgjss"]').die().live('click',function(){
	if($(this).html()=='隐藏高级搜索'){
		
		kuf_list_ajax()
	}
		
})

	//调出库房
$('.dbsp_tckf_mainlist_xxl li').die().live('click', function() {
		tbsp_list_data.output_warehouse = $(this).attr('uid');
		tbsp_list_ajax()
	})
	//调入库房
$('.dbsp_drkf_mainlist_xxl li').die().live('click', function() {
		tbsp_list_data.input_warehouse = $(this).attr('uid');
		tbsp_list_ajax()
	})
	//调拨人
$('.dbsp_dbr_mainlist_xxl li').die().live('click', function() {
		tbsp_list_data.principal = $(this).attr('uid');
		tbsp_list_ajax()
	})
	//商品类型
$('.dbsp_typelist_xxl li').die().live('click', function() {
		tbsp_list_data.product_type = $(this).attr('typeid');
		tbsp_list_ajax()
	})
	//查看
var dbsp_ck_data = {
	token: token,
	id: '',
	detail: ''
}
$('.dbsp_ckbtn_xxl').die().live('click', function() {
	dbsp_ck_data.id = $(this).attr('uid');
	dbsp_ck_data.detail = 0;
	dbsp_ck_ajax()
})

function dbsp_ck_ajax() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "allot/infobyid",
		data: dbsp_ck_data,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data)
			} else {
				console.log(data)
				var dbsp_ckxq = data['data'],
					pro_xq = '';
				if(dbsp_ckxq.productList == undefined) {
					if(dbsp_ckxq.is_cancel == 1) {
						$('.dbsp_ck_genduo_btnxxl').css('display', 'none');
					} else {
						$('.dbsp_ck_genduo_btnxxl').css('display', 'block');
						$('.dbsp_ck_zuofei_btn_xxl').attr('uid', dbsp_ckxq.id)
					}
					$('.dbsp_ck_cjrq_xxl').html(likNullData(dbsp_ckxq.create_time));
					$('.dbsp_ck_ckbtn_xxl').attr('uid', dbsp_ckxq.id);
					$('.dbsp_ck_dbbh_xxl').html(likNullData(dbsp_ckxq.number));
					$('.dbsp_ck_dbnums_xxl').html(likNullData(dbsp_ckxq.num));
					$('.dbsp_ck_dckf_xxl').html(likNullData(dbsp_ckxq.output_warehouse));
					$('.dbsp_ck_drkf_xxl').html(likNullData(dbsp_ckxq.input_warehouse));
					$('.dbsp_ck_dbr_xxl').html(likNullData(dbsp_ckxq.principal));
					$('.dbsp_ck_beiz_xxl').html(likNullData(dbsp_ckxq.remark));
				} else {
					$('.dbsp_xq_cjrss_xxl').html(likNullData(dbsp_ckxq.creater));
					$('.dbsp_xq_cjrqss_xxl').html(likNullData(dbsp_ckxq.create_time));
					$('.dbsp_xq_dbbhss_xxl').html(likNullData(dbsp_ckxq.number));
					$('.dbsp_xq_ckkfss_xxl').html(likNullData(dbsp_ckxq.output_warehouse));
					$('.dbsp_xq_rukkfss_xxl').html(likNullData(dbsp_ckxq.input_warehouse));
					$('.dbsp_xq_dbrss_xxl').html(likNullData(dbsp_ckxq.principal));
					//console.log(dbsp_ckxq.productList.length)
					if(dbsp_ckxq.productList.length == 0) {
						var pro_err = '';
						pro_err += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
						$('.dbsp_xq_proerr_html_xxl').html(pro_err);
						$('.dbsp_xq_prolist_html_xxl').html('');
					} else {
						$('.dbsp_xq_proerr_html_xxl').html('');
						$.each(dbsp_ckxq.productList, function(i, v) {
							pro_xq += '<tr>';
							pro_xq += '<td>' + Appendzero(i + 1) + '</td>';
							pro_xq += '<td>' + likNullData(v.product_name) + '</td>';
							pro_xq += '<td>' + likNullData(v.code_sn) + '</td>';
							//pro_xq += '<td>' + likNullData(v.format) + '</td>';
							pro_xq += '<td>品牌：<span>' + likNullData(v.attr_name) + '</span></td>';
							pro_xq += '<td>' + likNullData(v.unit_name) + '</td>';
							pro_xq += '<td>' + likNullData(v.num) + '</td></tr>';
						});
						$('.dbsp_xq_prolist_html_xxl').html(pro_xq);
					}

				}

			}
		},
		error: function(e) {
			console.log(e)
		}
	});
}
$('.dbsp_ck_ckbtn_xxl').die().live('click', function() {
		dbsp_ck_data.id = $(this).attr('uid');
		dbsp_ck_data.detail = 1;
		dbsp_ck_ajax()
	})
	//作废
var dbsp_zf_data = {
	token: token,
	id: ''
}
$('.dbsp_zuofei_btn_xxl').die().live('click', function() {
	dbsp_zf_data.id = $(this).attr('uid');
	dbsp_zf_ajax()
})

function dbsp_zf_ajax() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "allot/cancel",
		data: dbsp_zf_data,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg)
			} else {
				console.log(data)
				tbsp_list_ajax()
			}
		},
		error: function(e) {
			console.log(e)
		}
	});
}
//新建调拨单号
$('.dbsp_xj_xzdbdh_btn_xxl').die().live('click', function() {
	$.ajax({
		type: "post",
		url: SERVER_URL + "allot/createnumber",
		data: {
			token: token
		},
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg)
			} else {
				console.log(data)
				$('.tanceng .dbsp_xj_sp_dbr_xxl').val(username).attr('uid',uid);
				$('.tanceng .dbsp_xj_sp_dbbhs_xxl').val(data.data)
				$('.tanceng .dbsp_xj_sp_cjr_xxl').html(username);
				$('.tanceng .dbsp_xj_sp_cjrq_xxl').html(now)
				kuf_list_ajax()
				if($('.tanceng .dbsp_xjsp_val_xxl').val() == '' || $('.tanceng .dbsp_xjsp_val_xxl').val() == '选择库房') {
					$('.tanceng .dbsp_xj_xzsp_btn_xxl').attr('disabled', 'disabled').text('请选择库房')
				}

			}
		},
		error: function(e) {
			console.log(e)
		}
	});
	$(this).parent().parent().parent().remove();
	var num = $('.tanceng').children(".dialog_box").length;
	if(num < 1) {
		$(".tanceng").hide();
	}
})
$('.tanceng .dbsp_xj_sp_kflist_xxl li').die().live('click', function() {
	$('.tanceng .dbsp_xjsp_val_xxl').attr('uid', $(this).attr('uid'));
	$('.tanceng .dbsp_xj_xzsp_btn_xxl').removeAttr("disabled").text('选择商品').attr({
		'uid': $(this).attr('uid'),
		'mc': $(this).attr('mcs')
	});
})
$('.tanceng .dbsp_xj_rkkflist_html_xxl li').die().live('click', function() {
	$('.tanceng .dbsp_xjsp_rkkf_val_xxl').attr('uid', $(this).attr('uid'));

})
$('.tanceng .dbsp_xjpeizhi_ckkf_listhtml li').die().live('click', function() {
	$('.tanceng .xj_peizhi_sp_ckkf_xxl').attr('uid', $(this).attr('uid'));
	$('.tanceng .xj_peizhi_xzsp_btnxxl').removeAttr("disabled").text('选择商品').attr({
		'uid': $(this).attr('uid'),
		'mc': $(this).attr('mcs')
	});
})
$('.tanceng .dbsp_xjpeizhi_rkkf_htmlxxl li').die().live('click', function() {
		$('.tanceng .xj_peizhi_sp_rkhouse_xxl').attr('uid', $(this).attr('uid'));

	})
	//新建配置商品调拨单号
$('.dbsp_xj_peizhidbdh_btn_xxl').die().live('click', function() {
		$.ajax({
			type: "post",
			url: SERVER_URL + "allot/createnumber",
			data: {
				token: token
			},
			dataType: 'json',
			success: function(data) {
				if(data.code != 0) {
					console.log(data.msg)
				} else {
					console.log(data)
					$('.tanceng .dbsp_xj_peizhisp_dbr_xxl').val(username).attr('uid',uid)
					$('.tanceng .dbsp_xj_peizhisp_dbdh_xxl').val(data.data);
					$('.tanceng .dbsp_xj_pzsp_cjr_xxl').html(username);
					$('.tanceng .dbsp_xj_pzsp_cjrqs_xxl').html(now);
					kuf_list_ajax()
					if($('.tanceng .xj_peizhi_sp_ckkf_xxl').val() == '' || $('.tanceng .xj_peizhi_sp_ckkf_xxl').val() == '选择库房') {
						$('.tanceng .xj_peizhi_xzsp_btnxxl').attr('disabled', 'disabled').text('请选择库房')
					}
				}
			},
			error: function(e) {
				console.log(e)
			}
		});
		$(this).parent().parent().parent().remove();
		var num = $('.tanceng').children(".dialog_box").length;
		if(num < 1) {
			$(".tanceng").hide();
		}
	})
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
//新建调拨商品
var dbsp_xjdbsp_data = {
	token: token,
	number: '', //调拨编号
	principal: '', //调拨人
	product_type: '', //商品类型 1商品调拨 2配置商品调拨
	output_warehouse: '', //output_warehouse
	input_warehouse: '', //调入库房
	remark: '', //备注
	product_info:'' //product_id 商品ID product_type 商品类型 1 商品 3 配置商品 product_name 商品名称 num 数量
}

function dbsp_xjdbsp_ajax() {
	$.ajax({
		type: "post",
		url: SERVER_URL + "allot/add",
		data: dbsp_xjdbsp_data,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg)
			} else {
				console.log(data)
//				$('.dbsp_scdbd_mainhtml_xxl').attr('name', 'crk_tbsp_sctbp')
//				$('.tanceng').append($('.dialog_box[name="crk_tbsp_sctbp"]').css('display', 'block'));
//				$('.tanceng .dbsp_scover_xxl').html(dbsp_xjdbsp_data.number);
				tbsp_list_ajax()
			}
		},
		error: function(e) {
			console.log(data)
		}
	});
}
$('.tanceng .dbsp_xj_spab_tjbtn_xxl').die('click').live('click', function() {
	var prarr=[];
	//$('.dbsp_scover_xxl').html($('.tanceng .dbsp_xj_sp_dbbhs_xxl').val());
	dbsp_xjdbsp_data.product_type = '1';
	dbsp_xjdbsp_data.number = $('.tanceng .dbsp_xj_sp_dbbhs_xxl').val();
	if(typeof($('.tanceng .dbsp_xjsp_val_xxl').attr('uid')) == "undefined") {
		alert('请选择出库库房')
		return false;
	}
	dbsp_xjdbsp_data.output_warehouse = $('.tanceng .dbsp_xjsp_val_xxl').attr('uid');
	if(typeof($('.tanceng .dbsp_xjsp_rkkf_val_xxl').attr('uid')) == "undefined") {
		alert('请选择入库库房')
		return false;
	}
	dbsp_xjdbsp_data.input_warehouse = $('.tanceng .dbsp_xjsp_rkkf_val_xxl').attr('uid');
//	if(typeof($('.tanceng .dbsp_xj_sp_dbr_xxl').attr('uid')) == "undefined") {
//		alert('请选择调拨人')
//		return false;
//	}
	if($('.tanceng .dbsp_xjsplist_a_html_xxl').html()==''){
		alert('请选择商品');
		return false;
	}
	dbsp_xjdbsp_data.principal = $('.tanceng .dbsp_xj_sp_dbr_xxl').attr('uid');
	dbsp_xjdbsp_data.remark = $('.tanceng .dbsp_xjsp_beizhu_val_xxl').val();
	$.each($('.tanceng .dbsp_xjsplist_a_html_xxl tr'), function(i, v) {
		prarr.push({
			'product_id': $(this).attr('uid'),
			'product_type': '1',
			'product_name': $(this).attr('spmc'),
			'num': $(this).children().children().children('input').val()
		})
	});
	//console.log(dbsp_xjdbsp_data)
	dbsp_xjdbsp_data.product_info = JSON.stringify(prarr);
	dbsp_xjdbsp_ajax();
	$(this).parent().parent().parent().remove();
		var num = $('.tanceng').children(".dialog_box").length;
		if(num < 1) {
			$(".tanceng").hide();
		}
})
$('.tanceng .dbsp_tc_quedbtn_xxl').live('click', function() {
		$(this).parent().parent().parent().remove();
		var num = $('.tanceng').children(".dialog_box").length;
		if(num < 1) {
			$(".tanceng").hide();
		}

	})
	//库房列表
function kuf_list_ajax() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "warehouse/list",
		data: {
			token: token,
			key: '',
			page: page,
			num: num
		},
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg)
			} else {
				console.log(data)
				var kf_list = data['datalist'],
					kf_html = '';
				$.each(kf_list, function(i, v) {
					kf_html += '<li uid="' + v.id + '" mcs="' + v.name + '">' + v.name + '</li>';
				});
				$('.dbsp_tckf_mainlist_xxl').html(kf_html);
				$('.dbsp_drkf_mainlist_xxl').html(kf_html);
				$('.tanceng .dbsp_xj_sp_kflist_xxl').html(kf_html);
				$('.tanceng .dbsp_xj_rkkflist_html_xxl').html(kf_html);
				$('.tanceng .dbsp_xjpeizhi_ckkf_listhtml').html(kf_html);
				$('.tanceng .dbsp_xjpeizhi_rkkf_htmlxxl').html(kf_html);
			}
		},
		error: function(e) {
			console.log(e)
		}
	});
}

//选择调拨人
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
function dbsp_renyuan_listajax(){
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
			$('.dbsp_xzry_list_xxl').html(tree_list_person(datalists, deep));
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

//选择调拨人-确定
$('.dbsp_xzry_queding_btnxxl').die().live('click', function() {
		var dbsp_dbrid = $('.tanceng .dbsp_xzry_list_xxl li.on').attr('userinfoid'),
			dbsp_dbsmc = $('.tanceng .dbsp_xzry_list_xxl li.on').children('span.list_msg').html();
		$('.tanceng .dbsp_xj_sp_dbr_xxl').val(dbsp_dbsmc).attr('uid', dbsp_dbrid)
		$('.tanceng .dbsp_xj_peizhisp_dbr_xxl').val(dbsp_dbsmc).attr('uid', dbsp_dbrid)
		$(this).parent().parent().parent().remove();
		var num = $('.tanceng').children(".dialog_box").length;
		if(num < 1) {
			$(".tanceng").hide();
		}
	})
	//选择商品
$('.tanceng .dbsp_xj_xzsp_btn_xxl').die().live('click', function() {
		var mcss = $(this).attr('mc'),
			kfid = $(this).attr('uid');
		$('.dbsp_splist_kfmc_xxl').html(mcss).attr('uid', kfid);
		$('.tanceng .dbsp_xjsplist_spqueding_btnxxl').attr('typeid', '0');
		spfl_data.category='1';
		dbsp_spfl();
		dbsp_splist_data.warehouse_id = kfid;
		dbsp_splist_ajax();
	})
	//商品分类
var spfl_data = {
	token:token,
	pid:'',
	category:''//类别 1.商品 2.配置商品
}
function dbsp_spfl() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "product-category/list",
		data:spfl_data ,
		dataType: 'json',
		success: function(data) {
			
			console.log(data)
			var splist = data['dataList'],sphtml='';
			if(splist.length==0){
				
			}else{
				$.each(splist, function(i,v) {
					sphtml +='<li class="hr_left_2" cusSortId="' + v.id + '"><span>'+v.name+'</span></li>';
				});
				$('.tanceng .dbsp_xj_sp_splist_xxl').html(sphtml);
			}
			
			//$('.dbsp_xj_peizhisp_fenlei_xxl').html(tree_list(data.datalist));
			
		},
		error: function(e) {
			console.log(e)
		}
	});
}
function dbsp_peizhispfl() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "product-category/list",
		data:spfl_data ,
		dataType: 'json',
		success: function(data) {
			
			console.log(data)
			var splist = data['dataList'],sphtml='';
			if(splist.length==0){
				
			}else{
				$.each(splist, function(i,v) {
					sphtml +='<li class="hr_left_2" cusSortId="' + v.id + '"><span>'+v.name+'</span></li>';
				});
				$('.tanceng .dbsp_xj_peizhisp_splist_xxl').html(sphtml);
			}
			
			//$('.dbsp_xj_peizhisp_fenlei_xxl').html(tree_list(data.datalist));
			
		},
		error: function(e) {
			console.log(e)
		}
	});
}
//	tree list
function tree_list(datalist) {
	var html = '';
	$.each(datalist, function(index, data) {
		html += '<ul class="hr_ul1 change">';
		//			html += '<li class="hr_left_1" cusSortId="' + data["id"] + '"><span>' + data['name'] + '&nbsp;<em class="list_num_null">(<i>'+data['children'].length+'</i>)</em></span></li>';
		html += '<li class="hr_left_1" cusSortId="' + data["id"] + '"><span>' + data['name'] + '&nbsp;<em class="list_num_null">(<i>' + data['children'].length + '</i>)</em></span></li>';
		if(data['children'] && data['children'].length > 0) {
			html += tree_list(data['children'])
		}
		html += '</li>';
		html += '</ul>'
	});
	return html
}
//商品列表
var dbsp_splist_data = {
	token: token,
	key: '',
	page: '1',
	num: '10',
	cate_id: '', // 分类id
	status: '0',
	unit_id:'',//基本单位id
	brand_id:'',//品牌ID
	attr:'',
	warehouse_id:''
}

function dbsp_splist_ajax() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "product/list",
		data: dbsp_splist_data,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg);
				$('.tanceng .dbsp_xj_splist_htmlxxl').html('');
				$('.tanceng .dbsp_xj_splist_fenyelist_xxl').css('display', 'none');
				var sp_err = '';
				sp_err += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
				$('.tanceng .dbsp_xj_splist_errhtml_xxl').html(sp_err);
			} else {
				console.log(data)
				$('.tanceng .dbsp_xjsplist_main_nums_xxl').html(data["totalcount"])
				var xjsp_list = data['dataList'],
					xjsp_html = '';
				if(xjsp_list.length == 0) {
					$('.tanceng .dbsp_xj_splist_htmlxxl').html('');
					$('.tanceng .dbsp_xj_splist_fenyelist_xxl').css('display', 'none');
					var sp_err = '';
					sp_err += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
					$('.tanceng .dbsp_xj_splist_errhtml_xxl').html(sp_err);
				} else {
					$('.tanceng .dbsp_xj_splist_fenyelist_xxl').css('display', 'block');
					$('.tanceng .dbsp_xj_splist_errhtml_xxl').html('');
					$.each(xjsp_list, function(i, v) {
						xjsp_html += '<tr><td><input type="checkbox" name="crk_tbsp_xzspAll" class="dbsp_xjsp_checkbox_btnxxl" uid="' + v.id + '" minc="' + v.name + '" spbh="' + v.code_sn + '" spjsdw="' + v.unit_name + '" kufangsl="'+v.warehouseNum+'"></td>';
						xjsp_html += '<td class="crk_rkd_bsmrk"><div class="num_input inline_block num_input_new" style="z-index: 1;"><button class="but_blue but_opa_small inp_plus dbsp_xjspnums_jiajia_xxl" disabled="disabled">+</button><input type="text" value="" class="dbsp_xjsplist_spnums_xxl"><button class="but_blue but_opa_small radius_left_0 inp_reduce dbsp_xjspjianjiannum_btnxxl" disabled="disabled">-</button></div></td>';
						xjsp_html += '<td>'+likNullData(v.warehouseNum)+'</td>';//<span class="f_color dbsp_xjsp_ckkucun_xxl" style="cursor:pointer">查看</span>
						xjsp_html += '<td>' + likNullData(v.name) + '</td>';
						xjsp_html += '<td>' + likNullData(v.code_sn) + '</td>';
						xjsp_html += '<td>' + likNullData(v.unit_name) + '</td>';
						
						var sx_list = '';
						$.each(v.attributes, function(i, v1) {
							sx_list += '' + likNullData(v1.pid_name) + '/<span>' + likNullData(v1.name);
						});
						xjsp_html += '<td class="sp_shuxing_html">' + sx_list + '</td>';
						xjsp_html += '<td>' + likNullData(v.remark) + '</td>';
						xjsp_html += '</tr>';

					});
					$('.tanceng .dbsp_xj_splist_htmlxxl').html(xjsp_html);
					list_table_render_pagination(".dbsp_xj_splist_fenyelist_xxl", dbsp_splist_data, dbsp_splist_ajax, data["totalcount"], xjsp_list.length)
				}
			}
		},
		error: function(e) {
			dbsp_splist_ajax()
			console.log(e)
			$('.tanceng .dbsp_xj_splist_htmlxxl').html('');
			$('.tanceng .dbsp_xj_splist_fenyelist_xxl').css('display', 'none');
			var sp_err = '';
			sp_err += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
			$('.tanceng .dbsp_xj_splist_errhtml_xxl').html(sp_err);
		}
	});
}
//搜索
function dbsp_splist_sousuo_now(val) {
	//console.log(val)
	dbsp_splist_data.key = val;
	dbsp_splist_ajax()
}
$('.tanceng .dbsp_splist_ssbtn_xxl').die().live('click', function() {
	if($('.tanceng .dbsp_splist_value_xxl').val() == '' || $('.tanceng .dbsp_splist_value_xxl').val() == '搜索库房名称') {
		return false;
	} else {
		dbsp_splist_data.key = $('.tanceng .dbsp_splist_value_xxl').val();
		dbsp_splist_ajax()
	}
})
$('.tanceng .dbsp_xj_sp_splist_xxl li.hr_left_2').die().live('click', function() {
	//console.log($(this).attr('cussortid'))
	dbsp_splist_data.cate_id = $(this).attr('cussortid');
	dbsp_splist_ajax();
})
$('.tanceng .dbsp_xjsp_checkbox_btnxxl').die().live('click', function() {
	if($(this).is(':checked')){
		if(parseInt($(this).attr('kufangsl'))==0){
			alert('库房数量为零不能选择商品');
			$(this).attr('checked',false);
			$(this).parent().next().addClass('crk_rkd_bsmrk').children().find('input').val('')
			$(this).parent().next().children().find('button').attr('disabled','disabled');
		}else{
			$(this).parent().next().removeClass('crk_rkd_bsmrk').children().find('input').val('1');
			$(this).parent().next().children().find('button').removeAttr('disabled');
		}
		
	}else{
		$(this).parent().next().addClass('crk_rkd_bsmrk').children().find('input').val('')
		$(this).parent().next().children().find('button').attr('disabled','disabled');
	}
	//console.log($(this).parent().next().next().children().text())
//	var text_xxl = $(this).parent().next().next().children().text();
//	if(text_xxl == '查看') {
//		alert('请点击查看获取库存')
//		$(this).removeAttr("checked");
//	} else {
//		$(this).attr("checked", 'checked');
//	}
})
$('.tanceng .dbsp_xjspnums_jiajia_xxl').die().live('click', function() {
		var default_num = parseInt($(this).next('input').val());
		var nums_xxl = parseInt($(this).parent().parent().next().text());
		//console.log(default_num,nums_xxl)
		if(default_num > nums_xxl) {
			$(this).next('input').val(nums_xxl);
		} else {
			$(this).next('input').val(default_num);
		}
	})
$('.tanceng .dbsp_xjspjianjiannum_btnxxl').die().live('click',function(){
	if($(this).prev().val()<=1){
		$(this).prev().val('1')
	}
})
	//获取库存
$('.tanceng .dbsp_xjsp_ckkucun_xxl').die().live('click', function() {
		var kf_id = $('.tanceng .dbsp_splist_kfmc_xxl').attr('uid');
		//console.log($(this).parent().prev().prev().children('input').attr('uid'))
		var sp_id = $(this).parent().prev().prev().children('input').attr('uid');
		var this_num = $(this);
		$.ajax({
			type: "get",
			url: SERVER_URL + "warehouse/numbyproid",
			data: {
				token: token,
				id: sp_id,
				warehouse_id: kf_id
			},
			dataType: 'json',
			success: function(data) {
				if(data.code != 0) {
					console.log(data)
				} else {
					console.log(data)
					var numlist = data['data'];
					this_num.html(numlist.warehouseNum)
				}
			},
			error: function(e) {
				console.log(e)
			}
		});
	})
	//选择商品-生成列表
var sp_shuju = [],
	splist_html = '';
$('.tanceng .dbsp_xjsplist_spqueding_btnxxl').die('click').live('click', function() {
	splist_html = '';
	$('.tanceng .dbsp_xjsplist_a_html_xxl').html('');
	var type_id = $(this).attr('typeid'),
		xiugai_sp = {},
		index_id = $(this).attr('sp_index');
	if(type_id == 0) {
		$(".tanceng input[name='crk_tbsp_xzspAll']:checked").each(function() {
			//console.log($(this).attr('uid'))
			sp_shuju.push({
				'name': $(this).attr('minc'),
				'spbh': $(this).attr('spbh'),
				'spgg': $(this).attr('spgg'),
				'spsx': $(this).parent().nextAll('.sp_shuxing_html').html(),
				'jsdw': $(this).attr('spjsdw'),
				'nums': $(this).parent().next().children().children('.dbsp_xjsplist_spnums_xxl').val(),
				'id': $(this).attr('uid'),
				'maxnum': $(this).parent().next().next().text()
			})
		})

	} else {
		$(".tanceng input[name='crk_tbsp_xzspAll']:checked").each(function() {
				//console.log($(this).attr('uid'))
				xiugai_sp = {
					'name': $(this).attr('minc'),
					'spbh': $(this).attr('spbh'),
					'spgg': $(this).attr('spgg'),
					'spsx': $(this).parent().nextAll('.sp_shuxing_html').html(),
					'jsdw': $(this).attr('spjsdw'),
					'nums': $(this).parent().next().children().children('.dbsp_xjsplist_spnums_xxl').val(),
					'id': $(this).attr('uid'),
					'maxnum': $(this).parent().next().next().text()
				};
			})
			//console.log(xiugai_sp)
		sp_shuju.splice(index_id, 1, xiugai_sp);
	}
	console.log(sp_shuju)
	$.each(sp_shuju, function(i, v) {
		splist_html += '<tr spmc="' + v.name + '" uid="' + v.id + '"><td>' + Appendzero(i + 1) + '</td>';
		splist_html += '<td>' + v.name + '/1t<button class="but_small but_yellow val_dialogTop dbsp_xj_xiugai_btnxxl" sp_index="' + i + '" name="crk_tbsp_xzsp">修改商品</button></td>';
		splist_html += '<td>' + v.spbh + '</td>';
		//splist_html += '<td>' + v.spgg + '</td>';
		splist_html += '<td>' + v.spsx + '</td>';
		splist_html += '<td>' + v.jsdw + '</td>';
		splist_html += '<td><div class="num_input inline_block num_input_new"><button class="but_blue but_opa_small inp_plus dbsp_spmaxnums_xxl">+</button><input type="text" value="' + v.nums + '" maxnum="' + v.maxnum + '"><button class="but_blue but_opa_small radius_left_0 inp_reduce">-</button></div></td>';
		splist_html += '<td><button class="but_blue but_opa_small but_red dbsp_splist_trdelete_btnxxl" sp_index="' + i + '">-</button></td></tr>';
	});
	$('.tanceng .dbsp_xjsplist_a_html_xxl').html(splist_html);
	//console.log(sp_shuju)

	$(this).parent().parent().parent().remove();
	var num = $('.tanceng').children(".dialog_box").length;
	if(num < 1) {
		$(".tanceng").hide();
	}
})
$('.tanceng .dbsp_spmaxnums_xxl').die().live('click', function() {
		var max_num = parseInt($(this).next('input').attr('maxnum'));
		var sp_shus = parseInt($(this).next('input').val());
		if(sp_shus > max_num) {
			alert('不能超出库存数量');
			$(this).next('input').val(max_num);
		}
	})
	//修改商品
$('.tanceng .dbsp_xj_xiugai_btnxxl').die().live('click', function() {
		$('.tanceng .dbsp_xjsplist_spqueding_btnxxl').attr({
				'typeid': '1',
				'sp_index': $(this).attr('sp_index')
			}) //sp_index
		dbsp_spfl();
		dbsp_splist_ajax();
	})
	//删除商品列表
$('.tanceng .dbsp_splist_trdelete_btnxxl').die().live('click', function() {
		$(this).parents('tr').remove()
		sp_shuju.splice($(this).attr('sp_index'), 1)
	})
	//新建配置商品
$('.tanceng .dbsp_xj_peizhisp_tjbtn_xxl').die('click').live('click', function() {
	var pzspsz=[];
	dbsp_xjdbsp_data.product_type = '2';
	dbsp_xjdbsp_data.number = $('.tanceng .dbsp_xj_peizhisp_dbdh_xxl').val();
	if(typeof($('.tanceng .xj_peizhi_sp_ckkf_xxl').attr('uid')) == "undefined") {
		alert('请选择出库库房')
		return false;
	}
	dbsp_xjdbsp_data.output_warehouse = $('.tanceng .xj_peizhi_sp_ckkf_xxl').attr('uid');
	if(typeof($('.tanceng .xj_peizhi_sp_rkhouse_xxl').attr('uid')) == "undefined") {
		alert('请选择入库库房')
		return false;
	}
	dbsp_xjdbsp_data.input_warehouse = $('.tanceng .xj_peizhi_sp_rkhouse_xxl').attr('uid');
//	if(typeof($('.tanceng .dbsp_xj_peizhisp_dbr_xxl').attr('uid')) == "undefined") {
//		alert('请选择调拨人')
//		return false;
//	}
	if($('.tanceng .dbsp_xjpeizhisp_list_html_xxl').html()==''){
		alert('请选择商品')
		return false;
	}
	dbsp_xjdbsp_data.principal = $('.tanceng .dbsp_xj_peizhisp_dbr_xxl').attr('uid');
	dbsp_xjdbsp_data.remark = $('.tanceng .dbsp_xj_peizhisp_bz_xxl').val();
	$.each($('.tanceng .dbsp_xjpeizhisp_list_html_xxl tr'), function(i, v) {
		pzspsz.push({
			'product_id': $(this).attr('uid'),
			'product_type': '3',
			'product_name': $(this).attr('spmc'),
			'num': $(this).children().children().children('input').val()
		})
	});
	//console.log(dbsp_xjdbsp_data)
	dbsp_xjdbsp_data.product_info = JSON.stringify(pzspsz);
	dbsp_xjdbsp_ajax();
	$(this).parent().parent().parent().remove();
	var num = $('.tanceng').children(".dialog_box").length;
		if(num < 1) {
			$(".tanceng").hide();
		}
})
$('.tanceng .xj_peizhi_xzsp_btnxxl').die().live('click', function() {
	var mcss = $(this).attr('mc'),
		kfid = $(this).attr('uid');
	$('.dbsp_peizhisp_kfmc_xxl').html(mcss).attr('uid', kfid);
	$('.tanceng .dbsp_peizhisp_queding_btnxxl').attr('typeid', '0');
	spfl_data.category='2';
	dbsp_peizhispfl();
	zhengji_spdb_data.warehouse_id = kfid;
	dbsp_peizhisp_ajax();
})
var zhengji_spdb_data = {
	token:token,
	page:'1',
	num:'10',
	key:'',
	status:'0',
	cate_id:'',
	is_optional:'',
	warehouse_id:''
}
function dbsp_peizhisp_ajax() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "product-setting/list",
		data: zhengji_spdb_data,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg);
				$('.tanceng .dbsp_xj_peizhisp_htmlxxl').html('');
				$('.tanceng .dbsp_xj_peizhisp_fenyelist_xxl').css('display', 'none');
				var sp_err = '';
				sp_err += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
				$('.tanceng .dbsp_xj_peizhisp_errhtml_xxl').html(sp_err);
			} else {
				console.log(data)
				$('.tanceng .dbsp_peizhisp_main_num_xxl').html(data["totalcount"])
				var xjsp_list = data['datalist'],
					xjsp_html = '';
				if(xjsp_list.length == 0) {
					$('.tanceng .dbsp_xj_peizhisp_htmlxxl').html('');
					$('.tanceng .dbsp_xj_peizhisp_fenyelist_xxl').css('display', 'none');
					var sp_err = '';
					sp_err += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
					$('.tanceng .dbsp_xj_peizhisp_errhtml_xxl').html(sp_err);
				} else {
					$('.tanceng .dbsp_xj_peizhisp_fenyelist_xxl').css('display', 'block');
					$('.tanceng .dbsp_xj_peizhisp_errhtml_xxl').html('');
					$.each(xjsp_list, function(i, v) {
						xjsp_html += '<tr><td><input type="checkbox" name="crk_tbsp_xzspAll1" class="dbsp_peizhisp_checkbox_btnxxl" uid="' + v.id + '" minc="' + v.name + '" spbh="' + v.code_sn + '" spjsdw="' + v.unit_name + '" kufangsl="'+v.warehouseNum+'"></td>';
						xjsp_html += '<td class="crk_rkd_bsmrk"><div class="num_input inline_block num_input_new" style="z-index: 1;"><button class="but_blue but_opa_small inp_plus dbsp_peizhisp_jiajia_xxl" disabled="disabled">+</button><input type="text" value="" class="dbsp_xjpeizhi_spnums_xxl"><button class="but_blue but_opa_small radius_left_0 inp_reduce">-</button></div></td>';
						xjsp_html += '<td>'+likNullData(v.warehouseNum)+'</td>';//<span class="f_color dbsp_peizhisp_ckkucun_xxl" style="cursor:pointer">查看</span>
						xjsp_html += '<td>' + likNullData(v.code_sn) + '</td>';
						xjsp_html += '<td>' + likNullData(v.name) + '</td>';
						xjsp_html += '<td>' + likNullData(v.unit_name) + '</td>';
//						xjsp_html += '<td>' + likNullData(v.format) + '</td>';
//						var sx_list = '';
//						$.each(v.attributes, function(i, v1) {
//							sx_list += '' + likNullData(v1.pid_name) + '：<span>' + likNullData(v1.name);
//						});
						xjsp_html += '<td class="sp_shuxing_html">' + likNullData(v.attr_name) + '</td>';
						
						xjsp_html += '</tr>';

					});
					$('.tanceng .dbsp_xj_peizhisp_htmlxxl').html(xjsp_html);
					list_table_render_pagination(".dbsp_xj_peizhisp_fenyelist_xxl", zhengji_spdb_data, dbsp_peizhisp_ajax, data["totalcount"], xjsp_list.length)
				}
			}
		},
		error: function(e) {
			console.log(e)
			$('.tanceng .dbsp_xj_peizhisp_htmlxxl').html('');
			$('.tanceng .dbsp_xj_peizhisp_fenyelist_xxl').css('display', 'none');
			var sp_err = '';
			sp_err += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
			$('.tanceng .dbsp_xj_peizhisp_errhtml_xxl').html(sp_err);
		}
	});
}
//搜索
function dbsp_peizhisp_sousuo_now(val) {
	//console.log(val)
	zhengji_spdb_data.key = val;
	dbsp_peizhisp_ajax()
}
$('.tanceng .dbsp_peizhisp_ssbtn_xxl').die().live('click', function() {
	if($('.tanceng .dbsp_peizhisp_value_xxl').val() == '' || $('.tanceng .dbsp_peizhisp_value_xxl').val() == '搜索库房名称') {
		return false;
	} else {
		zhengji_spdb_data.key = $('.tanceng .dbsp_peizhisp_value_xxl').val();
		dbsp_peizhisp_ajax()
	}
})
$('.tanceng .dbsp_xj_peizhisp_splist_xxl li.hr_left_2').die().live('click', function() {
	//console.log($(this).attr('cussortid'))
	zhengji_spdb_data.cate_id = $(this).attr('cussortid');
	dbsp_peizhisp_ajax();
})
$('.tanceng .dbsp_peizhisp_checkbox_btnxxl').die().live('click', function() {
	if($(this).is(':checked')){
		if(parseInt($(this).attr('kufangsl'))==0){
			alert('库房数量为零不能选择商品');
			$(this).attr('checked',false)
			$(this).parent().next().addClass('crk_rkd_bsmrk').children().find('input').val('')
			$(this).parent().next().children().find('button').attr('disabled','disabled');
		}else{
			$(this).parent().next().removeClass('crk_rkd_bsmrk').children().find('input').val('1');
			$(this).parent().next().children().find('button').removeAttr('disabled');
		}
		
	}else{
		$(this).parent().next().addClass('crk_rkd_bsmrk').children().find('input').val('')
		$(this).parent().next().children().find('button').attr('disabled','disabled');
	}
	//console.log($(this).parent().next().next().children().text())
//	var text_xxl = $(this).parent().next().next().children().text();
//	if(text_xxl == '查看') {
//		alert('请点击查看获取库存')
//		$(this).removeAttr("checked");
//	} else {
//		$(this).attr("checked", 'checked');
//	}
})
$('.tanceng .dbsp_peizhisp_jiajia_xxl').die().live('click', function() {
		var default_num = parseInt($(this).next('input').val());
		var nums_xxl = parseInt($(this).parent().parent().next().text());
		//console.log(default_num,nums_xxl)
		if(default_num > nums_xxl) {
			$(this).next('input').val(nums_xxl);
		} else {
			$(this).next('input').val(default_num);
		}
	})
	//获取库存
$('.tanceng .dbsp_peizhisp_ckkucun_xxl').die().live('click', function() {
		var kf_id = $('.tanceng .dbsp_peizhisp_kfmc_xxl').attr('uid');
		//console.log($(this).parent().prev().prev().children('input').attr('uid'))
		var sp_id = $(this).parent().prev().prev().children('input').attr('uid');
		var this_num = $(this);
		$.ajax({
			type: "get",
			url: SERVER_URL + "warehouse/numbysetproid",
			data: {
				token: token,
				id: sp_id,
				warehouse_id: kf_id
			},
			dataType: 'json',
			success: function(data) {
				if(data.code != 0) {
					console.log(data)
				} else {
					console.log(data)
					var numlist = data['data'];
					this_num.html(numlist.warehouseNum)
				}
			},
			error: function(e) {
				console.log(e)
			}
		});
	})
	//选择配置商品-生成列表
var peizhisp_shuju = [],
	peizhisplist_html = '';
$('.tanceng .dbsp_peizhisp_queding_btnxxl').die('click').live('click', function() {
	peizhisplist_html = '';
	$('.tanceng .dbsp_xjpeizhisp_list_html_xxl').html('');
	var type_id = $(this).attr('typeid'),
		xiugai_sp = {},
		index_id = $(this).attr('sp_index');
	if(type_id == 0) {
		$(".tanceng input[name='crk_tbsp_xzspAll1']:checked").each(function() {
			//console.log($(this).attr('uid'))
			peizhisp_shuju.push({
				'name': $(this).attr('minc'),
				'spbh': $(this).attr('spbh'),
				'spgg': $(this).attr('spgg'),
				'spsx': $(this).parent().nextAll('.sp_shuxing_html').html(),
				'jsdw': $(this).attr('spjsdw'),
				'nums': $(this).parent().next().children().children('.dbsp_xjpeizhi_spnums_xxl').val(),
				'id': $(this).attr('uid'),
				'maxnum': $(this).parent().next().next().text()
			})
		})

	} else {
		$(".tanceng input[name='crk_tbsp_xzspAll1']:checked").each(function() {
				//console.log($(this).attr('uid'))
				xiugai_sp = {
					'name': $(this).attr('minc'),
					'spbh': $(this).attr('spbh'),
					'spgg': $(this).attr('spgg'),
					'spsx': $(this).parent().nextAll('.sp_shuxing_html').html(),
					'jsdw': $(this).attr('spjsdw'),
					'nums': $(this).parent().next().children().children('.dbsp_xjpeizhi_spnums_xxl').val(),
					'id': $(this).attr('uid'),
					'maxnum': $(this).parent().next().next().text()
				};
			})
			//console.log(xiugai_sp)
		peizhisp_shuju.splice(index_id, 1, xiugai_sp);
	}
	$.each(peizhisp_shuju, function(i, v) {
		peizhisplist_html += '<tr spmc="' + v.name + '" uid="' + v.id + '"><td>' + Appendzero(i + 1) + '</td>';
		peizhisplist_html += '<td>' + v.name + '/1t<button class="but_small but_yellow val_dialogTop dbsp_xjpeizhisp_xiugai_btnxxl" sp_index="' + i + '" name="crk_tbsp_xzsp_pz">修改商品</button></td>';
		peizhisplist_html += '<td>' + v.spbh + '</td>';
		//peizhisplist_html += '<td>' + v.spgg + '</td>';
		peizhisplist_html += '<td>' + v.spsx + '</td>';
		peizhisplist_html += '<td>' + v.jsdw + '</td>';
		peizhisplist_html += '<td><div class="num_input inline_block num_input_new"><button class="but_blue but_opa_small inp_plus dbsp_peizhisp_maxnums_xxl">+</button><input type="text" value="' + v.nums + '" maxnum="' + v.maxnum + '"><button class="but_blue but_opa_small radius_left_0 inp_reduce">-</button></div></td>';
		peizhisplist_html += '<td><button class="but_blue but_opa_small but_red dbsp_peizhisp_trdelete_btnxxl" sp_index="' + i + '">-</button></td></tr>';
	});
	$('.tanceng .dbsp_xjpeizhisp_list_html_xxl').html(peizhisplist_html);
	//console.log(sp_shuju)

	$(this).parent().parent().parent().remove();
	var num = $('.tanceng').children(".dialog_box").length;
	if(num < 1) {
		$(".tanceng").hide();
	}
})
$('.tanceng .dbsp_peizhisp_maxnums_xxl').die().live('click', function() {
		var max_num = $(this).next('input').attr('maxnum');
		var sp_shus = $(this).next('input').val();
		if(sp_shus > max_num) {
			alert('不能超出库存数量');
			$(this).next('input').val(max_num);
		}
	})
	//修改商品
$('.tanceng .dbsp_xjpeizhisp_xiugai_btnxxl').die().live('click', function() {
		$('.tanceng .dbsp_peizhisp_queding_btnxxl').attr({
				'typeid': '1',
				'sp_index': $(this).attr('sp_index')
			}) //sp_index
		dbsp_peizhispfl();
		dbsp_peizhisp_ajax();
	})
	//删除商品列表
$('.tanceng .dbsp_peizhisp_trdelete_btnxxl').die().live('click', function() {
	$(this).parents('tr').remove()
	peizhisp_shuju.splice($(this).attr('sp_index'), 1)
})