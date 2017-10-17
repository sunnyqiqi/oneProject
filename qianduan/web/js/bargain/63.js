//$(function() {

	var token,qiniu,xianshi;
	token = Admin.get_token();
	//SERVER_URL = 'http://192.168.0.167:9091/';
	qiniu = 'http://om9r2c8k9.bkt.clouddn.com/';
	//SERVER_URL = 'http://192.168.0.167:9010/';
	//token = '2017052516045457073-1-1';
	var loginUserInfo = JSON.parse(localStorage.getItem('user_info'));
var xsht='contract-back/market',cght='contract-back/purchase',yght='contract-back/employee',qtht='contract-back/other',htbansc='/hetong/shangchuan';
if(loginUserInfo['company_admin'] != 1){
	if(loginUserInfo.powerUrls.length==0){
		xianshi = 'none';
		$('.htban_qiehuan_list_menu_xxl li[thetype="1"]').hide()
		$('.htban_qiehuan_list_menu_xxl li[thetype="2"]').hide()
		$('.htban_qiehuan_list_menu_xxl li[thetype="3"]').hide()
		$('.htban_qiehuan_list_menu_xxl li[thetype="4"]').hide()
		$('.htba_list_html_xxl').html('');
					var err_htmls = '';
					err_htmls += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
					$('.htba_err_html_xxl').html(err_htmls)
					$('.htba_fenye_xiaoshouht_xxl').css('display', 'none');
					//return false;
	}else{
		var arr = loginUserInfo.powerUrls;//
		if($.inArray(htbansc, arr)!=-1){
			xianshi = '';
		}else{
			xianshi = 'none';
		}
		if($.inArray(xsht, arr)!=-1){
			$('.htban_qiehuan_list_menu_xxl li[thetype="1"]').show();
			
		}else{
			$('.htban_qiehuan_list_menu_xxl li[thetype="1"]').hide();
		}
		if($.inArray(cght, arr)!=-1){
			$('.htban_qiehuan_list_menu_xxl li[thetype="2"]').show();
		}else{
			$('.htban_qiehuan_list_menu_xxl li[thetype="2"]').hide();
		}
		if($.inArray(yght, arr)!=-1){
			$('.htban_qiehuan_list_menu_xxl li[thetype="3"]').show();
		}else{
			$('.htban_qiehuan_list_menu_xxl li[thetype="3"]').hide();
		}
		if($.inArray(qtht, arr)!=-1){
			$('.htban_qiehuan_list_menu_xxl li[thetype="4"]').show();
		}else{
			$('.htban_qiehuan_list_menu_xxl li[thetype="4"]').hide();
		}
		$('.htban_qiehuan_list_menu_xxl>li').eq(0).trigger('click');//addClass('tabhover').siblings().removeClass('tabhover')
//		htba_data_xxl.thetype = $('.htban_qiehuan_list_menu_xxl>li').eq(0).attr('thetype');
//		htba_ajax_list_xxl()
	}
}

	
	
	var htba_data_xxl = {
		token: token,
		thetype: '1', //1销售合同 2采购合同 3员工合同 4其它合同
		page: '1',
		num: '10',
		dept_id: '', //部门id
		owner_id: '', //负责人id
		upload_uid: '', //上传人id
		is_invalid: '', //0正常1作废
		created_at: '', //创建日期：1升序2降序
		upload_day: '', //上传日期：1升序2降序
		keywords: '' //合同编号 或者 合同名称 搜索
	}
	// 定义查看项
	var htban_xsht_xzckx = [{
		'index': null,
		'field': '上传人'
	}, {
		'index': null,
		'field': '负责部门'
	}, {
		'index': null,
		'field': '负责人'
	}];
	var htban_cght_xzckx = [{
		'index': null,
		'field': '上传人'
	}, {
		'index': null,
		'field': '负责部门'
	}, {
		'index': null,
		'field': '负责人'
	}];
	var htban_yght_xzckx = [{
		'index': null,
		'field': '上传人'
	}];
	var htban_qtht_xzckx = [{
		'index': null,
		'field': '上传人'
	}, {
		'index': null,
		'field': '负责部门'
	}, {
		'index': null,
		'field': '负责人'
	}];

	function htba_ajax_list_xxl() {
		$.ajax({
			type: "get",
			url: SERVER_URL + "contract-back/list",
			data: htba_data_xxl,
			dataType: 'json',
			success: function(data) {
				if(data.code != 0) {
					console.log(data.msg)
					$('.htba_list_html_xxl').html('');
					var err_htmls = '';
					err_htmls += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
					$('.htba_err_html_xxl').html(err_htmls).parents('container').next('handle').css('display', 'none')
					//$('.htba_fenye_list_xxl').css('display', 'none')
				} else {
					console.log(data)
					$('.htban_list_mainnums_xxl').html(data['totalcount'])
					var htba_list = data['datalist'],
						err_html = '',
						listhtml_xxl = '';
					if(data.thetype == 1) {
						if(htba_list.length == 0) {
							$('.htba_list_html_xxl').html('');
							err_html += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
							$('.htba_err_html_xxl').html(err_html)
							$('.htba_fenye_xiaoshouht_xxl').css('display', 'none')
						} else {
							$('.htba_err_html_xxl').html('')
							$('.htba_fenye_xiaoshouht_xxl').css('display', 'block')
							$.each(htba_list, function(i, v) {
								if(v.is_invalid == 1) {
									listhtml_xxl += '<tr class="c_c"><td><span class="voidIcon">作废</span></td>';
									listhtml_xxl += '<td>' + likNullData(v.code_sn) + '</td>';
									listhtml_xxl += '<td>' + likNullData(v.name) + '</td>';
									listhtml_xxl += '<td>' + likNullData(v.thetype_name) + '</td>';
//									if(v.upload_img_path.length == 0) {
//										listhtml_xxl += '<td><span class="cantact_img"><img src="static/images/error_xxl.png" alt="合同图片"></span></td>';
//									} else {
//										imgurls = '';
//										$.each(v.upload_img_path, function(j, m) {
//											if(m.indexOf('qiniu')!=-1){
//												imgurls += '<span class="cantact_img"><img src="' + qiniu + '' + m + '" alt="合同图片"></span>';
//											}else{
//												imgurls += '<span class="cantact_img"><img src="' + SERVER_URL + '' + m + '" alt="合同图片"></span>';
//											}
//											
//										});
//										listhtml_xxl += '<td>' + imgurls + '</td>'
//									}

									listhtml_xxl += '<td>' + likNullData(v.customer_name) + '</td>';
									listhtml_xxl += '<td>' + likNullData(v.created_at) + '</td>';
									listhtml_xxl += '<td>' + likNullData(v.upload_img_day) + '</td>';
									listhtml_xxl += '<td>' + likNullData(v.upload_uname) + '</td>';
									listhtml_xxl += '<td>' + likNullData(v.dept_name) + '</td>';
									listhtml_xxl += '<td>' + likNullData(v.owner_name) + '</td>';
									listhtml_xxl += '<td><button class="but_mix but_grey1">查看</button><button class="but_mix but_grey1">上传</button></td></tr>';
								} else {
									listhtml_xxl += '<tr><td>' + (i + 1) + '</td>';
									listhtml_xxl += '<td>' + likNullData(v.code_sn) + '</td>';
									listhtml_xxl += '<td>' + likNullData(v.name) + '</td>';
									listhtml_xxl += '<td>' + likNullData(v.thetype_name) + '</td>';
//									if(v.upload_img_path.length == 0) {
//										listhtml_xxl += '<td><span class="cantact_img val_dialog htban_xsht_yulantup_xxl" uid="' + v.id + '" name="cantact_other_img"><img src="static/images/error_xxl.png" alt="合同图片"></span></td>';
//									} else {
//										imgurls = '';
//										$.each(v.upload_img_path, function(j, m) {
//											if(m.indexOf('qiniu')!=-1){
//												imgurls += '<span class="cantact_img val_dialog htban_xsht_yulantup_xxl" name="cantact_other_img" uid="' + v.id + '"><img src="' + qiniu + '' + m + '" alt="合同图片"></span>';
//											}else{
//												imgurls += '<span class="cantact_img val_dialog htban_xsht_yulantup_xxl" name="cantact_other_img" uid="' + v.id + '"><img src="' + SERVER_URL + '' + m + '" alt="合同图片"></span>';
//											}
//											
//										});
//										listhtml_xxl += '<td>' + imgurls + '</td>'
//									}
									//								listhtml_xxl += '<td><span class="cantact_img val_dialog htban_xsht_yulantup_xxl" name="cantact_other_img" uid="' + v.id + '"><img src="' + v.upload_img_path + '" alt="合同图片" ></span><span class="cantact_img val_dialog htban_xsht_yulantup_xxl" name="cantact_other_img" uid="' + v.id + '"><img src="' + v.upload_img_path + '" alt="合同图片"></span></td>';
									listhtml_xxl += '<td>' + likNullData(v.customer_name) + '</td>';
									listhtml_xxl += '<td>' + likNullData(v.created_at) + '</td>';
									listhtml_xxl += '<td>' + likNullData(v.upload_img_day) + '</td>';
									listhtml_xxl += '<td>' + likNullData(v.upload_uname) + '</td>';
									listhtml_xxl += '<td>' + likNullData(v.dept_name) + '</td>';
									listhtml_xxl += '<td>' + likNullData(v.owner_name) + '</td>';
									listhtml_xxl += '<td><button class="but_mix but_look val_dialog ht_copy_lookBUT htban_xsht_chakan_btnxxl" uid="' + v.id + '" name="ht_copy_look">查看</button><button class="but_mix but_exit val_dialog htban_xsht_shangc_btnxxl '+xianshi+'" name="contact_copy_upload" uid="' + v.id + '">上传</button></td></tr>';
								}
							});
							$('.htba_list_html_xxl').html(listhtml_xxl);
							$(".htban_xsht_yulantup_xxl>img").error(function(e) { //加入相应的图片类名
								$(this).attr("src", "static/images/error_xxl.png");
							});
							likShow('#htban_xsht_tabxzckx_xxl', htban_xsht_xzckx, '#htban_xsht_xzckx_xzlist_xxl', '#htbann_xzckx_baocun_btn_xxl', '#htban_xzckx_hfmoren_btn_xxl');
							list_table_render_pagination(".htba_fenye_xiaoshouht_xxl", htba_data_xxl, htba_ajax_list_xxl, data["totalcount"], htba_list.length)
						}
					} else if(data.thetype == 2) {
						if(htba_list.length == 0) {
							$('.htba_list_html_xxl').html('');
							err_html += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
							$('.htba_err_html_xxl').html(err_html)
							$('.htba_fenye_caigouhetong_xxl').css('display', 'none')
						} else {
							$('.htba_err_html_xxl').html('')
							$('.htba_fenye_caigouhetong_xxl').css('display', 'block')
							$.each(htba_list, function(i, v) {
								if(v.is_invalid == 1) {
									listhtml_xxl += '<tr class="c_c"><td><span class="voidIcon">作废</span></td>';
									listhtml_xxl += '<td>' + likNullData(v.code_sn) + '</td>';
									listhtml_xxl += '<td>' + likNullData(v.name) + '</td>';
									listhtml_xxl += '<td>' + likNullData(v.thetype_name) + '</td>';
//									if(v.upload_img_path.length == 0) {
//										listhtml_xxl += '<td><span class="cantact_img"><img src="static/images/error_xxl.png" alt="合同图片"></span></td>';
//									} else {
//										imgurls = '';
//										$.each(v.upload_img_path, function(j, m) {
//											if(m.indexOf('qiniu')!=-1){
//												imgurls += '<span class="cantact_img"><img src="' + qiniu + '' + m + '" alt="合同图片"></span>';
//											}else{
//												imgurls += '<span class="cantact_img"><img src="' + SERVER_URL + '' + m + '" alt="合同图片"></span>';
//											}
//										});
//										listhtml_xxl += '<td>' + imgurls + '</td>'
//									}
									listhtml_xxl += '<td>' + likNullData(v.supplier_name) + '</td>';
									listhtml_xxl += '<td>' + likNullData(v.created_at) + '</td>';
									listhtml_xxl += '<td>' + likNullData(v.upload_img_day) + '</td>';
									listhtml_xxl += '<td>' + likNullData(v.upload_uname) + '</td>';
									listhtml_xxl += '<td>' + likNullData(v.dept_name) + '</td>';
									listhtml_xxl += '<td>' + likNullData(v.owner_name) + '</td>';
									listhtml_xxl += '<td><button class="but_mix but_grey1">查看</button><button class="but_mix but_grey1">上传</button></td></tr>';
								} else {
									listhtml_xxl += '<tr><td>' + (i + 1) + '</td>';
									listhtml_xxl += '<td>' + likNullData(v.code_sn) + '</td>';
									listhtml_xxl += '<td>' + likNullData(v.name) + '</td>';
									listhtml_xxl += '<td>' + likNullData(v.thetype_name) + '</td>';
									//								listhtml_xxl += '<td><span class="cantact_img val_dialog htban_cght_yulantup_xxl" uid="' + v.id + '" name="cantact_other_img"><img src="' + v.upload_img_path + '" alt="合同图片"></span><span class="cantact_img val_dialog htban_cght_yulantup_xxl" uid="' + v.id + '" name="cantact_other_img"><img src="' + v.upload_img_path + '" alt="合同图片"></span></td>';
//									if(v.upload_img_path.length == 0) {
//										listhtml_xxl += '<td><span class="cantact_img val_dialog htban_xsht_yulantup_xxl" uid="' + v.id + '" name="cantact_other_img"><img src="static/images/error_xxl.png" alt="合同图片"></span></td>';
//									} else {
//										imgurls = '';
//										$.each(v.upload_img_path, function(j, m) {
//
//											if(m.indexOf('qiniu')!=-1){
//												imgurls += '<span class="cantact_img val_dialog htban_xsht_yulantup_xxl" name="cantact_other_img" uid="' + v.id + '"><img src="' + qiniu + '' + m + '" alt="合同图片"></span>';
//											}else{
//												imgurls += '<span class="cantact_img val_dialog htban_xsht_yulantup_xxl" name="cantact_other_img" uid="' + v.id + '"><img src="' + SERVER_URL + '' + m + '" alt="合同图片"></span>';
//											}
//										});
//										listhtml_xxl += '<td>' + imgurls + '</td>'
//									}
									listhtml_xxl += '<td>' + likNullData(v.customer_name) + '</td>';
									listhtml_xxl += '<td>' + likNullData(v.created_at) + '</td>';
									listhtml_xxl += '<td>' + likNullData(v.upload_img_day) + '</td>';
									listhtml_xxl += '<td>' + likNullData(v.upload_uname) + '</td>';
									listhtml_xxl += '<td>' + likNullData(v.dept_name) + '</td>';
									listhtml_xxl += '<td>' + likNullData(v.owner_name) + '</td>';
									listhtml_xxl += '<td><button class="but_mix but_look val_dialog htban_cght_chakan_btnxxl" uid="' + v.id + '" name="ht_copy_look">查看</button><button class="but_mix but_exit val_dialog htban_xsht_shangc_btnxxl '+xianshi+'" uid="' + v.id + '" name="contact_copy_upload">上传</button></td></tr>';
								}
							});
							$('.htba_list_html_xxl').html(listhtml_xxl);
							$(".htban_cght_yulantup_xxl>img").error(function(e) { //加入相应的图片类名
								$(this).attr("src", "static/images/error_xxl.png");
							});
							likShow('#htban_cght_tabxzckx_xxl', htban_cght_xzckx, '#htban_cght_xzckx_xz_list_xxl', '#htban_cght_xzckx_baocun_btnxxl', '#htban_cght_xzckx_huifmoren_btnxxl');
							list_table_render_pagination(".htba_fenye_caigouhetong_xxl", htba_data_xxl, htba_ajax_list_xxl, data["totalcount"], htba_list.length)
						}
					} else if(data.thetype == 3) {
						if(htba_list.length == 0) {
							$('.htba_list_html_xxl').html('');
							err_html += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
							$('.htba_err_html_xxl').html(err_html)
							$('.htba_fenye_yghtlist_xxl').css('display', 'none')
						} else {
							$('.htba_err_html_xxl').html('')
							$('.htba_fenye_yghtlist_xxl').css('display', 'block')
							$.each(htba_list, function(i, v) {
								if(v.is_invalid == 1) {
									listhtml_xxl += '<tr class="c_c"><td><span class="voidIcon">作废</span></td>';
									listhtml_xxl += '<td>' + likNullData(v.code_sn) + '</td>';
									listhtml_xxl += '<td>' + likNullData(v.name) + '</td>';
									listhtml_xxl += '<td>' + likNullData(v.job_name) + '</td>';
									listhtml_xxl += '<td>' + likNullData(v.thetype_name) + '</td>';
									listhtml_xxl += '<td>' + likNullData(v.unit_start_time) + '-' + likNullData(v.unit_end_time) + '</td>';
//									if(v.upload_img_path.length == 0) {
//										listhtml_xxl += '<td><span class="cantact_img"><img src="static/images/error_xxl.png" alt="合同图片"></span></td>';
//									} else {
//										imgurls = '';
//										$.each(v.upload_img_path, function(j, m) {
//											if(m.indexOf('qiniu')!=-1){
//												imgurls += '<span class="cantact_img"><img src="' + qiniu + '' + m + '" alt="合同图片"></span>';
//											}else{
//												imgurls += '<span class="cantact_img"><img src="' + SERVER_URL + '' + m + '" alt="合同图片"></span>';
//											}
//										});
//										listhtml_xxl += '<td>' + imgurls + '</td>'
//									}
									listhtml_xxl += '<td>' + likNullData(v.created_at) + '</td>';
									listhtml_xxl += '<td>' + likNullData(v.upload_img_day) + '</td>';
									listhtml_xxl += '<td>' + likNullData(v.upload_uname) + '</td>';
									listhtml_xxl += '<td><button class="but_mix but_grey1">查看</button><button class="but_mix but_grey1">上传</button></td></tr>';
								} else {
									listhtml_xxl += '<tr><td>' + (i + 1) + '</td>';
									listhtml_xxl += '<td>' + likNullData(v.code_sn) + '</td>';
									listhtml_xxl += '<td>' + likNullData(v.name) + '</td>';
									listhtml_xxl += '<td>' + likNullData(v.job_name) + '</td>';
									listhtml_xxl += '<td>' + likNullData(v.thetype_name) + '</td>';
									listhtml_xxl += '<td>' + likNullData(v.unit_start_time) + '-' + likNullData(v.unit_end_time) + '</td>';
									//								listhtml_xxl += '<td><span class="cantact_img val_dialog htban_yght_yulantup_xxl" uid="' + v.id + '" name="cantact_other_img"><img src="' + v.upload_img_path + '" alt="合同图片"></span><span class="cantact_img val_dialog htban_yght_yulantup_xxl" uid="' + v.id + '" name="cantact_other_img"><img src="' + v.upload_img_path + '" alt="合同图片"></span></td>';
//									if(v.upload_img_path.length == 0) {
//										listhtml_xxl += '<td><span class="cantact_img val_dialog htban_xsht_yulantup_xxl" uid="' + v.id + '" name="cantact_other_img"><img src="static/images/error_xxl.png" alt="合同图片"></span></td>';
//									} else {
//										imgurls = '';
//										$.each(v.upload_img_path, function(j, m) {
////											imgurls += '<span class="cantact_img val_dialog htban_xsht_yulantup_xxl" name="cantact_other_img" uid="' + v.id + '"><img src="' + SERVER_URL + '' + m + '" alt="合同图片"></span>';
//											if(m.indexOf('qiniu')!=-1){
//												imgurls += '<span class="cantact_img val_dialog htban_xsht_yulantup_xxl" name="cantact_other_img" uid="' + v.id + '"><img src="' + qiniu + '' + m + '" alt="合同图片"></span>';
//											}else{
//												imgurls += '<span class="cantact_img val_dialog htban_xsht_yulantup_xxl" name="cantact_other_img" uid="' + v.id + '"><img src="' + SERVER_URL + '' + m + '" alt="合同图片"></span>';
//											}
//										});
//										listhtml_xxl += '<td>' + imgurls + '</td>'
//									}
									listhtml_xxl += '<td>' + likNullData(v.created_at) + '</td>';
									listhtml_xxl += '<td>' + likNullData(v.upload_img_day) + '</td>';
									listhtml_xxl += '<td>' + likNullData(v.upload_uname) + '</td>';
									listhtml_xxl += '<td><button class="but_mix but_look val_dialog htban_yght_chakan_btnxxl" uid="' + v.id + '" name="ht_copy_look">查看</button><button class="but_mix but_exit val_dialog htban_xsht_shangc_btnxxl '+xianshi+'" uid="' + v.id + '" name="contact_copy_upload">上传</button></td></tr>';
								}
							});
							$('.htba_list_html_xxl').html(listhtml_xxl);
							$(".htban_yght_yulantup_xxl>img").error(function(e) { //加入相应的图片类名
								$(this).attr("src", "static/images/error_xxl.png");
							});
							likShow('#htban_yght_tabxzckx_xxl', htban_yght_xzckx, '#htban_yght_xzckx_xzlist_xxl', '#htban_xzckx_yght_baocun_btnxxl', '#htban_xzckx_yght_hfmoredn_btnxxl');
							list_table_render_pagination(".htba_fenye_yghtlist_xxl", htba_data_xxl, htba_ajax_list_xxl, data["totalcount"], htba_list.length)
						}
					} else {
						if(htba_list.length == 0) {
							$('.htba_list_html_xxl').html('');
							err_html += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
							$('.htba_err_html_xxl').html(err_html)
							$('.htba_fenye_list_xxl').css('display', 'none')
						} else {
							$('.htba_err_html_xxl').html('')
							$('.htba_fenye_list_xxl').css('display', 'block')
							$.each(htba_list, function(i, v) {
								if(v.is_invalid == 1) {
									listhtml_xxl += '<tr class="c_c"><td><span class="voidIcon">作废</span></td>';
									listhtml_xxl += '<td>' + likNullData(v.code_sn) + '</td>';
									listhtml_xxl += '<td>' + likNullData(v.name) + '</td>';
									listhtml_xxl += '<td>' + likNullData(v.thetype_name) + '</td>';
//									if(v.upload_img_path.length == 0) {
//										listhtml_xxl += '<td><span class="cantact_img"><img src="static/images/error_xxl.png" alt="合同图片"></span></td>';
//									} else {
//										imgurls = '';
//										$.each(v.upload_img_path, function(j, m) {
//											if(m.indexOf('qiniu')!=-1){
//												imgurls += '<span class="cantact_img"><img src="' + qiniu + '' + m + '" alt="合同图片"></span>';
//											}else{
//												imgurls += '<span class="cantact_img"><img src="' + SERVER_URL + '' + m + '" alt="合同图片"></span>';
//											}
//										});
//										listhtml_xxl += '<td>' + imgurls + '</td>'
//									}
									listhtml_xxl += '<td>' + likNullData(v.created_at) + '</td>';
									listhtml_xxl += '<td>' + likNullData(v.upload_img_day) + '</td>';
									listhtml_xxl += '<td>' + likNullData(v.upload_uname) + '</td>';
									listhtml_xxl += '<td>' + likNullData(v.dept_name) + '</td>';
									listhtml_xxl += '<td>' + likNullData(v.owner_name) + '</td>';
									listhtml_xxl += '<td><button class="but_mix but_grey1">查看</button><button class="but_mix but_grey1">上传</button></td></tr>';
								} else {
									listhtml_xxl += '<tr><td>' + (i + 1) + '</td>';
									listhtml_xxl += '<td>' + likNullData(v.code_sn) + '</td>';
									listhtml_xxl += '<td>' + likNullData(v.name) + '</td>';
									listhtml_xxl += '<td>' + likNullData(v.thetype_name) + '</td>';
									//								listhtml_xxl += '<td><span class="cantact_img val_dialog htban_qtht_yulantp_xxl" uid="' + v.id + '" name="cantact_other_img"><img src="' + v.upload_img_path + '" alt="合同图片"></span><span class="cantact_img val_dialog htban_qtht_yulantp_xxl" uid="' + v.id + '" name="cantact_other_img"><img src="' + v.upload_img_path + '" alt="合同图片"></span></td>';
//									if(v.upload_img_path.length == 0) {
//										listhtml_xxl += '<td><span class="cantact_img val_dialog htban_xsht_yulantup_xxl" uid="' + v.id + '" name="cantact_other_img"><img src="static/images/error_xxl.png" alt="合同图片"></span></td>';
//									} else {
//										imgurls = '';
//										$.each(v.upload_img_path, function(j, m) {
////											imgurls += '<span class="cantact_img val_dialog htban_xsht_yulantup_xxl" name="cantact_other_img" uid="' + v.id + '"><img src="' + SERVER_URL + '' + m + '" alt="合同图片"></span>';
//											if(m.indexOf('qiniu')!=-1){
//												imgurls += '<span class="cantact_img val_dialog htban_xsht_yulantup_xxl" name="cantact_other_img" uid="' + v.id + '"><img src="' + qiniu + '' + m + '" alt="合同图片"></span>';
//											}else{
//												imgurls += '<span class="cantact_img val_dialog htban_xsht_yulantup_xxl" name="cantact_other_img" uid="' + v.id + '"><img src="' + SERVER_URL + '' + m + '" alt="合同图片"></span>';
//											}
//										});
//										listhtml_xxl += '<td>' + imgurls + '</td>'
//									}
									listhtml_xxl += '<td>' + likNullData(v.created_at) + '</td>';
									listhtml_xxl += '<td>' + likNullData(v.upload_img_day) + '</td>';
									listhtml_xxl += '<td>' + likNullData(v.upload_uname) + '</td>';
									listhtml_xxl += '<td>' + likNullData(v.dept_name) + '</td>';
									listhtml_xxl += '<td>' + likNullData(v.owner_name) + '</td>';
									listhtml_xxl += '<td><button class="but_mix but_look val_dialog htban_qtht_chak_btnxxl" uid="' + v.id + '" name="ht_copy_look">查看</button><button class="but_mix but_exit val_dialog htban_xsht_shangc_btnxxl '+xianshi+'" uid="' + v.id + '" name="contact_copy_upload">上传</button></td></tr>';
								}
							});
							$('.htba_list_html_xxl').html(listhtml_xxl);
							$(".htban_qtht_yulantp_xxl>img").error(function(e) { //加入相应的图片类名
								$(this).attr("src", "static/images/error_xxl.png");
							});
							likShow('#htban_qtht_xzckx_tab_xxl', htban_qtht_xzckx, '#htban_qtht_xzckx_xzlist_xxl', '#htban_qtht_baocun_btn_xxl', '#htban_qtht_hfmoren_btn_xxl');
							list_table_render_pagination(".htba_fenye_list_xxl", htba_data_xxl, htba_ajax_list_xxl, data["totalcount"], htba_list.length)
						}
					}
					

				}
			},
			error: function(e) {
				console.log(e)
				var err_htmls = '';
				err_htmls += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
				//$('.htba_err_html_xxl').html(err_htmls)
				$('.htba_err_html_xxl').html(err_htmls).parents('container').next('handle').css('display', 'none')
				//$('.htba_fenye_list_xxl').css('display', 'none')
			}
		});
	}
	htba_ajax_list_xxl()
	//切换列表
	$('.htban_qiehuan_list_menu_xxl li.taba').die().live('click', function() {
		//console.log($(this).attr('thetype'))
		htba_data_xxl.keywords='';
		htba_data_xxl.thetype = $(this).attr('thetype');
		htba_ajax_list_xxl()
		$('.zkgjss_cont').css('display', 'none')
		$('.htmb_ckxzxBox').children('.zkgjssBtn').html('展开高级搜索').css({
			"background": "",
			"color": "",
			"border-color": ""
		});
		if(htba_data_xxl.thetype == 1) {
			$('.htba_xsht_ssval_xxl').val('搜索合同编号/合同名称/客户名称').css('color','rgb(204, 204, 204)');
			//htban_gjss_data.thetype = 1;
			//htban_gjss_ajax()
			$('#htban_xzckx_hfmoren_btn_xxl').trigger('click')
			$('#htbann_xzckx_baocun_btn_xxl').trigger('click')
		} else if(htba_data_xxl.thetype == 2) {
			//htban_gjss_data.thetype = 2;
			//htban_gjss_ajax()
			$('.htban_cght_ssval_xxl').val('搜索合同编号/合同名称/供应商名称').css('color','rgb(204, 204, 204)');
			$('#htban_cght_xzckx_huifmoren_btnxxl').trigger('click')
			$('#htban_cght_xzckx_baocun_btnxxl').trigger('click')
		} else if(htba_data_xxl.thetype == 3) {
			//htban_gjss_data.thetype = 3;
			$('.htban_yght_ssval_xxl').val('搜索合同编号/成员名称').css('color','rgb(204, 204, 204)');
			//htban_gjss_ajax()
			$('#htban_xzckx_yght_hfmoredn_btnxxl').trigger('click')
			$('#htban_xzckx_yght_baocun_btnxxl').trigger('click')
		} else {
			$('.htban_qtht_val_xxl').val('搜索合同编号/合同名称').css('color','rgb(204, 204, 204)');
			//htban_gjss_data.thetype = 4;
			//htban_gjss_ajax()
			$('#htban_qtht_hfmoren_btn_xxl').trigger('click')
			$('#htban_qtht_baocun_btn_xxl').trigger('click')
		}
	})
	//点击刷新
	$('.htban_dianjisx_btn_xxl').die().live('click', function() {
		add_Rload_index(63, 5) //参数页面值，父级值
		//		htba_data_xxl = {
		//			token: token,
		//			thetype: '1', //1销售合同 2采购合同 3员工合同 4其它合同
		//			page: '1',
		//			num: '10',
		//			dept_id: '', //部门id
		//			owner_id: '', //负责人id
		//			upload_uid: '', //上传人id
		//			is_invalid: '', //0正常1作废
		//			created_at: '', //创建日期：1升序2降序
		//			upload_day: '', //上传日期：1升序2降序
		//			keywords: '' //合同编号 或者 合同名称 搜索
		//		}
		//		htba_ajax_list_xxl()
		//		$('.htmb_ckxzxBox').eq(0).show().siblings(".htmb_ckxzxBox").hide();
		//		$('.htmb_ckxzxBox').children('.zkgjssBtn').html('展开高级搜索').css({
		//			"background": "",
		//			"color": "",
		//			"border-color": ""
		//		});
		//		$('.zkgjss_cont').css('display', 'none')
		//		$('#htban_xzckx_hfmoren_btn_xxl').trigger('click')
		//		$('#htbann_xzckx_baocun_btn_xxl').trigger('click')
		//		$('.htban_qiehuan_list_menu_xxl li:first').addClass(' tabhover').siblings('li').removeClass('tabhover');
		//		$(".tabcontent[name='bargain_ban']").eq(0).fadeIn(100).siblings(".tabcontent[name='bargain_ban']").hide();
		//		$('.select_p input.htban_xsht_scrvalue_xxl').val('上传人').attr('style', '');
		//		$('.select_p input.htban_xsht_fzbmvalue_xxl').val('负责部门').attr('style', '');
		//		$('.select_p input.htban_xsht_fzrvalue_xxl').val('负责人').attr('style', '');
		//		$('.select_p input.htban_cght_scrvalue_xxl').val('上传人').attr('style', '');
		//		$('.select_p input.htban_cght_fzbmvalue_xxl').val('负责部门').attr('style', '');
		//		$('.select_p input.htban_cght_fzrvalue_xxl').val('负责人').attr('style', '');
		//		$('.select_p input.htban_yght_scrvalue_xxl').val('上传人').attr('style', '');
		//		$('.select_p input.htban_qtht_scrvalue_xxl').val('上传人').attr('style', '');
		//		$('.select_p input.htban_qtht_fzbmvalue_xxl').val('负责部门').attr('style', '');
		//		$('.select_p input.htban_qtht_fzrvalue_xxl').val('负责人').attr('style', '');
	})
	//高级搜索内容接口
	var htban_gjss_data = {
		token: token,
		big_type:'8',
		small_type:''
	}

	function htban_gjss_ajax() {
		$.ajax({
			type: "get",
			url: SERVER_URL + "common/search",
			data: htban_gjss_data,
			dataType: 'json',
			success: function(data) {
				if(data.code != 0) {
					console.log(data.msg)
				} else {
					console.log(data)
					var dlist = data['data'],
						scr = '',
						fzbm = '',
						fzr = '';
					
						$.each(dlist, function(i, v) {
							scr += '<li uid="' + v.id + '">' + likNullData(v.name) + '</li>';
							fzbm += '<li uid="' + v.id + '">' + likNullData(v.name) + '</li>';
							fzr += '<li uid="' + v.id + '">' + likNullData(v.name) + '</li>';
						});
						$('.htba_xsht_scrlist_xxl').html(scr);
						$('.htban_xsht_fzbmlist_xxl').html(fzbm);
						$('.htban_xsht_fzrlist_xxl').html(fzr);
						$('.htban_cght_scrlist_xxl').html(scr);
						$('.htban_cght_fzbmlist_xxl').html(fzbm);
						$('.htban_cght_fzrlist_xxl').html(fzr);
						$('.htban_yght_scrlist_xxl').html(scr);
						$('.htban_qtht_scrlist_xxl').html(scr);
						$('.htban_qtht_fzbmlist_xxl').html(fzbm);
						$('.htban_qtht_fzrlist_xxl').html(fzr);
					
				}
			},
			error: function(e) {
				console.log(e)
			}
		});
	}
	$('.htban_xsht_scrvalue_xxl,.htban_xsht_scrvalue_xxl+i').die().live('click',function(){
		htban_gjss_data.small_type='upload_img_uid';
		htban_gjss_ajax()
	})
	$('.htban_xsht_fzbmvalue_xxl,.htban_xsht_fzbmvalue_xxl+i').die().live('click',function(){
		htban_gjss_data.small_type='dept_id';
		htban_gjss_ajax()
	})
	$('.htban_xsht_fzrvalue_xxl,.htban_xsht_fzrvalue_xxl+i').die().live('click',function(){
		htban_gjss_data.small_type='owner_id';
		htban_gjss_ajax()
	})
	$('.htban_cght_scrvalue_xxl,.htban_cght_scrvalue_xxl+i').die().live('click',function(){
		htban_gjss_data.small_type='upload_img_uid';
		htban_gjss_ajax()
	})
	$('.htban_cght_fzbmvalue_xxl,.htban_cght_fzbmvalue_xxl+i').die().live('click',function(){
		htban_gjss_data.small_type='dept_id';
		htban_gjss_ajax()
	})
	$('.htban_cght_fzrvalue_xxl,.htban_cght_fzrvalue_xxl+i').die().live('click',function(){
		htban_gjss_data.small_type='owner_id';
		htban_gjss_ajax()
	})
	$('.htban_yght_scrvalue_xxl,.htban_yght_scrvalue_xxl+i').die().live('click',function(){
		htban_gjss_data.small_type='upload_img_uid';
		htban_gjss_ajax()
	})
	$('.htban_qtht_scrvalue_xxl,.htban_qtht_scrvalue_xxl+i').die().live('click',function(){
		htban_gjss_data.small_type='upload_img_uid';
		htban_gjss_ajax()
	})
	$('.htban_qtht_fzbmvalue_xxl,.htban_qtht_fzbmvalue_xxl+i').die().live('click',function(){
		htban_gjss_data.small_type='dept_id';
		htban_gjss_ajax()
	})
	$('.htban_qtht_fzrvalue_xxl,.htban_qtht_fzrvalue_xxl+i').die().live('click',function(){
		htban_gjss_data.small_type='owner_id';
		htban_gjss_ajax()
	})
	
	
	//销售合同高级搜索
	$('.htba_xsht_scrlist_xxl li').die().live('click', function() {
		//console.log($(this).attr('uid'))
		$('.htban_xsht_scrvalue_xxl').val($(this).text()).addClass('c_3');
		htba_data_xxl.thetype = 1;
		htba_data_xxl.upload_uid = $(this).attr('uid');
		htba_ajax_list_xxl()
	})
	$('.htban_xsht_fzbmlist_xxl li').die().live('click', function() {
		//console.log($(this).attr('uid'))
		$('.htban_xsht_fzbmvalue_xxl').val($(this).text()).addClass('c_3');
		htba_data_xxl.thetype = 1;
		htba_data_xxl.dept_id = $(this).attr('uid');
		htba_ajax_list_xxl()
	})
	$('.htban_xsht_fzrlist_xxl li').die().live('click', function() {
		//console.log($(this).attr('uid'))
		$('.htban_xsht_fzrvalue_xxl').val($(this).text()).addClass('c_3');
		htba_data_xxl.thetype = 1;
		htba_data_xxl.owner_id = $(this).attr('uid');
		htba_ajax_list_xxl()
	})
	//采购合同高级搜索
	$('.htban_cght_scrlist_xxl li').die().live('click', function() {
		//console.log($(this).attr('uid'))
		$('.htban_cght_scrvalue_xxl').val($(this).text()).addClass('c_3');
		htba_data_xxl.thetype = 2;
		htba_data_xxl.upload_uid = $(this).attr('uid');
		htba_ajax_list_xxl()
	})
	$('.htban_cght_fzbmlist_xxl li').die().live('click', function() {
		//console.log($(this).attr('uid'))
		$('.htban_cght_fzbmvalue_xxl').val($(this).text()).addClass('c_3');
		htba_data_xxl.thetype = 2;
		htba_data_xxl.dept_id = $(this).attr('uid');
		htba_ajax_list_xxl()
	})
	$('.htban_cght_fzrlist_xxl li').die().live('click', function() {
		//console.log($(this).attr('uid'))
		$('.htban_cght_fzrvalue_xxl').val($(this).text()).addClass('c_3');
		htba_data_xxl.thetype = 2;
		htba_data_xxl.owner_id = $(this).attr('uid');
		htba_ajax_list_xxl()
	})
	//员工合同高级搜索
	$('.htban_yght_scrlist_xxl li').die().live('click', function() {
		//console.log($(this).attr('uid'))
		$('.htban_yght_scrvalue_xxl').val($(this).text()).addClass('c_3');
		htba_data_xxl.thetype = 3;
		htba_data_xxl.upload_uid = $(this).attr('uid');
		htba_ajax_list_xxl()
	})
	//其他合同高级搜索
	$('.htban_qtht_scrlist_xxl li').die().live('click', function() {
		//console.log($(this).attr('uid'))
		$('.htban_qtht_scrvalue_xxl').val($(this).text()).addClass('c_3');
		htba_data_xxl.thetype = 4;
		htba_data_xxl.upload_uid = $(this).attr('uid');
		htba_ajax_list_xxl()
	})
	$('.htban_qtht_fzbmlist_xxl li').die().live('click', function() {
		//console.log($(this).attr('uid'))
		$('.htban_qtht_fzbmvalue_xxl').val($(this).text()).addClass('c_3');
		htba_data_xxl.thetype = 4;
		htba_data_xxl.dept_id = $(this).attr('uid');
		htba_ajax_list_xxl()
	})
	$('.htban_qtht_fzrlist_xxl li').die().live('click', function() {
		//console.log($(this).attr('uid'))
		$('.htban_qtht_fzrvalue_xxl').val($(this).text()).addClass('c_3');
		htba_data_xxl.thetype = 4;
		htba_data_xxl.owner_id = $(this).attr('uid');
		htba_ajax_list_xxl()
	})
	//搜索
//	function htba_xsht_ssnow(val) {
//		htba_data_xxl.thetype = 1;
//		htba_data_xxl.keywords = val;
//		htba_ajax_list_xxl()
//	}
	$('.htba_xsht_ssbtn_xxl').die().live('click', function() {
		if($(this).prev().val() == '' || $(this).prev().val() == '搜索合同编号/合同名称/客户名称') {
			htba_data_xxl.thetype = 1;
			htba_data_xxl.keywords ='';
		} else {
			
			htba_data_xxl.thetype = 1;
			htba_data_xxl.keywords = $(this).prev().val();
			
		}
		htba_ajax_list_xxl()
	})

//	function htba_cght_ssnow(val) {
//		htba_data_xxl.thetype = 2;
//		htba_data_xxl.keywords = val;
//		htba_ajax_list_xxl()
//	}
	$('.htban_cght_ssbtn_xxl').die().live('click', function() {
		if($(this).prev().val() == '' || $(this).prev().val() == '搜索合同编号/合同名称/供应商名称') {
			htba_data_xxl.thetype = 2;
			htba_data_xxl.keywords = '';
		} else {
			htba_data_xxl.thetype = 2;
			htba_data_xxl.keywords = $(this).prev().val();
			
		}
		htba_ajax_list_xxl()
	})

//	function htba_yght_ssnow(val) {
//		htba_data_xxl.thetype = 3;
//		htba_data_xxl.keywords = val;
//		htba_ajax_list_xxl()
//	}
	$('.htban_yght_ssbtn_xxl').die().live('click', function() {
		if($(this).prev().val() == '' || $(this).prev().val() == '搜索合同编号/成员名称') {
			htba_data_xxl.thetype = 3;
			htba_data_xxl.keywords = '';
		} else {
			htba_data_xxl.thetype = 3;
			htba_data_xxl.keywords = $(this).prev().val();
			
		}
		htba_ajax_list_xxl()
	})

//	function htba_qtht_ssnow(val) {
//		htba_data_xxl.thetype = 4;
//		htba_data_xxl.keywords = val;
//		htba_ajax_list_xxl()
//	}
	$('.htban_qtht_ssbtn_xxl').die().live('click', function() {
		if($(this).prev().val() == '' || $(this).prev().val() == '搜索合同编号/合同名称') {
			htba_data_xxl.thetype = 4;
			htba_data_xxl.keywords = '';
		} else {
			htba_data_xxl.thetype = 4;
			htba_data_xxl.keywords = $(this).prev().val();
			
		}
		htba_ajax_list_xxl()
	})
	//不显示已作废
	$('.htban_xsht_noshow_btn_xxl').die().live('click', function() {
		if($(this).prop("checked")) {
			//console.log($(this).attr('thetype'))
			htba_data_xxl.thetype = $(this).attr('thetype')
			htba_data_xxl.is_invalid = 0;
			htba_ajax_list_xxl()
		} else {
			//console.log($(this).attr('thetype'))
			htba_data_xxl.thetype = $(this).attr('thetype')
			htba_data_xxl.is_invalid = '';
			htba_ajax_list_xxl()
		}
	})
	//切换日期升降序
	//创建日期
	var xshtcjrq=0;
	$('.htban_xshtcjrq_paixu').die().live('click',function(){
		xshtcjrq++;
		if(xshtcjrq%2==0){
			htba_data_xxl.created_at = 1;
		}else{
			htba_data_xxl.created_at = 2;
		}
		htba_data_xxl.thetype = 1;
		htba_ajax_list_xxl();
	})
//	$('.htban_xshtcjrq_paixu').toggle(function() {
//		$(this).children(".price_icon").removeClass("down").addClass("up");
//		htba_data_xxl.thetype = 1;
//		htba_data_xxl.created_at = 1;
//		htba_ajax_list_xxl()
//	}, function() {
//		$(this).children(".price_icon").removeClass("up").addClass("down");
//		htba_data_xxl.thetype = 1;
//		htba_data_xxl.created_at = 2;
//		htba_ajax_list_xxl()
//	})
	var xshtscrq=0;
	$('.htban_xshtscrq_paixu').die().live('click',function(){
		xshtscrq++;
		if(xshtscrq%2==0){
			htba_data_xxl.upload_day = 1;
		}else{
			htba_data_xxl.upload_day = 2;
		}
		htba_data_xxl.thetype = 1;
		htba_ajax_list_xxl();
	})
//	$('.htban_xshtscrq_paixu').toggle(function() {
//		$(this).children(".price_icon").removeClass("down").addClass("up");
//		htba_data_xxl.thetype = 1;
//		htba_data_xxl.upload_day = 1;
//		htba_ajax_list_xxl()
//	}, function() {
//		$(this).children(".price_icon").removeClass("up").addClass("down");
//		htba_data_xxl.thetype = 1;
//		htba_data_xxl.upload_day = 2;
//		htba_ajax_list_xxl()
//	})
	var cghtcjrq=0;
	$('.htban_cght_cjrqpaixu_xxl').die().live('click',function(){
		xshtcjrq++;
		if(cghtcjrq%2==0){
			htba_data_xxl.created_at = 1;
		}else{
			htba_data_xxl.created_at = 2;
		}
		htba_data_xxl.thetype = 2;
		htba_ajax_list_xxl();
	})
	var cghtscrq=0;
	$('.htban_cght_scrqpaixu_xxl').die().live('click',function(){
		cghtscrq++;
		if(cghtscrq%2==0){
			htba_data_xxl.upload_day = 1;
		}else{
			htba_data_xxl.upload_day = 2;
		}
		htba_data_xxl.thetype = 2;
		htba_ajax_list_xxl();
	})
//	$('.htban_cght_cjrqpaixu_xxl').toggle(function() {
//		$(this).children(".price_icon").removeClass("down").addClass("up");
//		htba_data_xxl.thetype = 2;
//		htba_data_xxl.created_at = 1;
//		htba_ajax_list_xxl()
//	}, function() {
//		$(this).children(".price_icon").removeClass("up").addClass("down");
//		htba_data_xxl.thetype = 2;
//		htba_data_xxl.created_at = 2;
//		htba_ajax_list_xxl()
//	})
//	$('.htban_cght_scrqpaixu_xxl').toggle(function() {
//		$(this).children(".price_icon").removeClass("down").addClass("up");
//		htba_data_xxl.thetype = 2;
//		htba_data_xxl.upload_day = 1;
//		htba_ajax_list_xxl()
//	}, function() {
//		$(this).children(".price_icon").removeClass("up").addClass("down");
//		htba_data_xxl.thetype = 2;
//		htba_data_xxl.upload_day = 2;
//		htba_ajax_list_xxl()
//	})
	var yghtcjrq=0;
	$('.htban_yght_cjrqpaixu_xxl').die().live('click',function(){
		yghtcjrq++;
		if(yghtcjrq%2==0){
			htba_data_xxl.created_at = 1;
		}else{
			htba_data_xxl.created_at = 2;
		}
		htba_data_xxl.thetype = 3;
		htba_ajax_list_xxl();
	})
	var yghtscrq=0;
	$('.htban_yght_scrqpaixu_xxl').die().live('click',function(){
		yghtscrq++;
		if(yghtscrq%2==0){
			htba_data_xxl.upload_day = 1;
		}else{
			htba_data_xxl.upload_day = 2;
		}
		htba_data_xxl.thetype = 3;
		htba_ajax_list_xxl();
	})
//	$('.htban_yght_cjrqpaixu_xxl').toggle(function() {
//		$(this).children(".price_icon").removeClass("down").addClass("up");
//		htba_data_xxl.thetype = 3;
//		htba_data_xxl.created_at = 1;
//		htba_ajax_list_xxl()
//	}, function() {
//		$(this).children(".price_icon").removeClass("up").addClass("down");
//		htba_data_xxl.thetype = 3;
//		htba_data_xxl.created_at = 2;
//		htba_ajax_list_xxl()
//	})
//	$('.htban_yght_scrqpaixu_xxl').toggle(function() {
//		$(this).children(".price_icon").removeClass("down").addClass("up");
//		htba_data_xxl.thetype = 3;
//		htba_data_xxl.upload_day = 1;
//		htba_ajax_list_xxl()
//	}, function() {
//		$(this).children(".price_icon").removeClass("up").addClass("down");
//		htba_data_xxl.thetype = 3;
//		htba_data_xxl.upload_day = 2;
//		htba_ajax_list_xxl()
//	})
	var qthtcjrq=0;
	$('.htban_qtht_cjrqpaixu_xxl').die().live('click',function(){
		qthtcjrq++;
		if(qthtcjrq%2==0){
			htba_data_xxl.created_at = 1;
		}else{
			htba_data_xxl.created_at = 2;
		}
		htba_data_xxl.thetype = 4;
		htba_ajax_list_xxl();
	})
	var qthtscrq=0;
	$('.htban_qtht_scrqpaixu_xxl').die().live('click',function(){
		qthtscrq++;
		if(qthtscrq%2==0){
			htba_data_xxl.upload_day = 1;
		}else{
			htba_data_xxl.upload_day = 2;
		}
		htba_data_xxl.thetype = 4;
		htba_ajax_list_xxl();
	})
//	$('.htban_qtht_cjrqpaixu_xxl').toggle(function() {
//		$(this).children(".price_icon").removeClass("down").addClass("up");
//		htba_data_xxl.thetype = 4;
//		htba_data_xxl.created_at = 1;
//		htba_ajax_list_xxl()
//	}, function() {
//		$(this).children(".price_icon").removeClass("up").addClass("down");
//		htba_data_xxl.thetype = 4;
//		htba_data_xxl.created_at = 2;
//		htba_ajax_list_xxl()
//	})
//	$('.htban_qtht_scrqpaixu_xxl').toggle(function() {
//		$(this).children(".price_icon").removeClass("down").addClass("up");
//		htba_data_xxl.thetype = 4;
//		htba_data_xxl.upload_day = 1;
//		htba_ajax_list_xxl()
//	}, function() {
//		$(this).children(".price_icon").removeClass("up").addClass("down");
//		htba_data_xxl.thetype = 4;
//		htba_data_xxl.upload_day = 2;
//		htba_ajax_list_xxl()
//	})

	//销售合同查看
	var xsht_ck_data = {
		token: token,
		id: '',
		ct: ''
	}

	function xsht_ckxq_ajax() {
		$.ajax({
			type: "get",
			url: SERVER_URL + "contract-back/info",
			data: xsht_ck_data,
			dataType: 'json',
			success: function(data) {
				if(data.code != 0) {
					console.log(data.msg)
				} else {
					console.log(data);
					var imglist = data.data.upload_img_path,
						imghtml = '';
					//console.log(imglist)
					if(imglist.length == 0) {
						$('.tanceng .image_box_content_img').attr('src','static/images/error_xxl.png');
					} else {
						$('.tanceng .image_box_content_img').attr('src', '');
						if (imglist) {
       // var productImgArr = data['image_url'].split(',');
       //$('.pro_goods_list_detail_img_num_total').html(productImgArr.length);
//      $('.pro_look_img_btn').addClass('val_dialog');
//      $('.pro_look_img_btn').live('click', function () {
            var goods_arr = imglist;
            var goods_img = 0;
            $('.tanceng .image_box_content_img').attr('src', getImgUrl(goods_arr[goods_img]));
            $('.tanceng .goods_icon_page').html((goods_img + 1) + '/' + goods_arr.length);
            $('.tanceng .goods_icon_pre').live('click', function () {
                goods_img--;
                if (goods_img == -1) {
                    goods_img = goods_arr.length - 1;
                }
                $('.tanceng .image_box_content_img').attr('src', getImgUrl(goods_arr[goods_img]));
                $('.tanceng .goods_icon_page').html((goods_img + 1) + '/' + goods_arr.length);
            });
            $('.tanceng .goods_icon_nxt').live('click', function () {
                goods_img++;
                if (goods_img == goods_arr.length) {
                    goods_img = 0;
                }
                $('.image_box_content_img').attr('src', getImgUrl(goods_arr[goods_img]));
                $('.goods_icon_page').html((goods_img + 1) + '/' + goods_arr.length);
            });
//          });
     };
  }


//						$.each(imglist, function(i, v) {
//							console.log(tupiantab(v))
//							if(v.indexOf('qiniu')!=-1){
//								imghtml += '<li><img src="' + qiniu + '' + v + '" ></li>';
//							}else{
//								imghtml += '<li><img src="' + SERVER_URL + '' + v + '" ></li>';
//							}
//							
//						});

						//$('.htban_cktupian_html_xxl').html(imghtml);
//						var liw = $('.htban_cktupian_html_xxl').children().eq(0).width();
//						var lisl = parseInt($('.tanceng .htban_cktupian_html_xxl').children().length);
//						//console.log(liw+'::'+lisl)
//						$('.tanceng .htban_cktupian_html_xxl').css('width', (liw * lisl) + 'px');
//						$('.tanceng .htban_imgluobo_mainnumxxl').html(lisl);
//						var htLook_box = $(".tanceng .ht_htbanLOOK"); //
//						var oPrev = $(".tanceng .icon_pre");
//						var oNext = $(".tanceng .icon_nxt");
//						$(htLook_box).live("mouseover", function() {
//							oPrev.css("display", "block");
//							oNext.css("display", "block");
//						});
//						$(htLook_box).live("mouseout", function() {
//							oPrev.css("display", "none");
//							oNext.css("display", "none");
//						});
//
//						var a = 0;
//						oPrev.live('click', function() {
//							a--;
//							a = (a + lisl) % lisl;
//							$('.tanceng .htban_cktupian_html_xxl').animate({
//								marginLeft: -360 * a
//							}, "slow");
//							$('.tanceng .htban_imgluobo_danqiannumxxl').html(a + 1)
//						})
//						oNext.live('click', function() {
//							a++;
//							a = a % lisl;
//							$('.tanceng .htban_cktupian_html_xxl').animate({
//								marginLeft: -360 * a
//							}, "slow");
//							$('.tanceng .htban_imgluobo_danqiannumxxl').html(a + 1)
//						})
//
//					}
//					$(".htban_cktupian_html_xxl li").each(function(i, v) {
//						$(this).children('img').error(function(e) { //加入相应的图片类名
//							$(this).attr("src", "static/images/error_xxl.png");
//						});
//					})
					//				$(".htban_cktupian_html_xxl li>img").error(function(e) { //加入相应的图片类名
					//					$(this).attr("src", "static/images/error_xxl.png");
					//				});	

				}
			},
			error: function(e) {
				console.log(e)
			}
		});
	}
	$('.htban_xsht_chakan_btnxxl').die().live('click', function() {
		//console.log($(this).attr('uid'))
		$('.tanceng .image_box_content_img').attr('src', '');
		xsht_ck_data.id = $(this).attr('uid');
		xsht_ckxq_ajax()
	})
	$('.htban_cght_chakan_btnxxl').die().live('click', function() {
		//console.log($(this).attr('uid'))
		xsht_ck_data.id = $(this).attr('uid');
		xsht_ckxq_ajax()
	})
	$('.htban_yght_chakan_btnxxl').die().live('click', function() {
		//console.log($(this).attr('uid'))
		xsht_ck_data.id = $(this).attr('uid');
		xsht_ckxq_ajax()
	})
	$('.htban_qtht_chak_btnxxl').die().live('click', function() {
		//console.log($(this).attr('uid'))
		xsht_ck_data.id = $(this).attr('uid');
		xsht_ckxq_ajax()
	})
	//预览图片
	$('.htban_xsht_yulantup_xxl').die().live('click', function() {
		$('.htban_yulantupian_show_xxl').attr('src', $(this).children('img').attr('src'))
	})
	$('.htban_cght_yulantup_xxl').die().live('click', function() {
		$('.htban_yulantupian_show_xxl').attr('src', $(this).children('img').attr('src'))
	})
	$('.htban_yght_yulantup_xxl').die().live('click', function() {
		$('.htban_yulantupian_show_xxl').attr('src', $(this).children('img').attr('src'))
	})
	$('.htban_qtht_yulantp_xxl').die().live('click', function() {
		$('.htban_yulantupian_show_xxl').attr('src', $(this).children('img').attr('src'))
	})
	//销售合同上传
	var xsht_sc_data = {
		token: token,
		id: '',
		ct: '',
		imgurl: ''
	}
	$('.htban_xsht_shangc_btnxxl').die().live('click', function() {
		$('.tanceng .htban_sc_queding_btnxxl').attr('uid', $(this).attr('uid'));
		shanchuan_imgxq_data.id = $(this).attr('uid');
		shangchuan_imgxq_ajax();
	})
	//上传按钮调取详情
	var shanchuan_imgxq_data = {
		token:token,
		id:''
	}
	function shangchuan_imgxq_ajax(){
		$.ajax({
			type:"get",
			url:SERVER_URL+"contract-back/info",
			dataType:'json',
			data:shanchuan_imgxq_data,
			success:function(data){
				if(data.code!=0){
					console.log(data)
				}else{
					console.log(data);
					var imglist = data.data.upload_img_path,
						imghtml = '';
					//console.log(imglist)
					if(imglist.length == 0) {
						//$('.htban_cktupian_html_xxl').html('<li><img src="static/images/error_xxl.png" alt=""></li>');
					} else {
						$.each(imglist, function(i, v) {
							if(v.indexOf('qiniu')!=-1){
								//imghtml += '<li><img src="' + qiniu + '' + v + '" ></li>';<li><input class="hide_input" type="file" id="upimgFile_' + add_imgi + '"/><img class="img_src" id="imgShow_' + add_imgi + '"/><i class="del_img">-</i></li>
								imghtml +='<li><input class="hide_input" type="file"/><img class="img_src" src="' + qiniu + '' + v + '" urldizhi="'+v+'"/><i class="del_img">-</i></li>';
							}else{
								//imghtml += '<li><img src="' + SERVER_URL + '' + v + '" ></li>';
								imghtml +='<li><input class="hide_input" type="file"/><img class="img_src" src="' + SERVER_URL + '' + v + '" urldizhi="'+v+'"/><i class="del_img">-</i></li>'
							}
						});
						$('.tanceng .htban_shangchuan_imgshow_xxl').before(imghtml)
					}
				}
			},
			error:function(e){
				console.log(e)
			}
		});
	}
	
	$('.tanceng .htban_sc_queding_btnxxl').die().live('click', function() {
		var img_paths_ptsps = [];
		if($('.tanceng .img_warp').children('li').length == 0) {
			alert('请选择图片');
			return false;
		} else {
			$.each($('.tanceng .img_warp').children('li'), function(i, v) {
				//console.log($(this).children('img').attr('src'))
				img_paths_ptsps.push($(this).children('img').attr('urldizhi'))
			});
		}
		xsht_sc_data.id = $(this).attr('uid');
		xsht_sc_data.imgurl = img_paths_ptsps.join(',');
		//console.log(xsht_sc_data.imgurl)
		xsht_sc_ajax();
		$(this).parent().parent().parent().remove();
		var num = $('.tanceng').children(".dialog_box").length;
		if(num < 1) {
			$(".tanceng").hide();
		}
	})

	function xsht_sc_ajax() {
		$.ajax({
			type: "post",
			url: SERVER_URL + "contract-back/addimg",
			data: xsht_sc_data,
			dataType: 'json',
			success: function(data) {
				if(data.code != 0) {
					console.log(data.msg)
				} else {
					console.log(data);
					htba_ajax_list_xxl();
				}
			},
			error: function(e) {
				console.log(e)
			}
		});
	}

	//图片上传
	var add_imgi = 1;

	function ajaxSubmit($el) {
		//var SERVER_URL = 'http://192.168.0.167:9091/';
		var token = Admin.get_token();
		//var token = '2017052516045457073-1-1';
		console.log(SERVER_URL, token);
		$el.upload({
			url: SERVER_URL + '/task/uploadattch',
			// 其他表单数据
			params: {
				token: token
			},
			// 上传完成后, 返回json, text
			dataType: 'json',
			onSend: function(obj, str) {
				var extStart=str.lastIndexOf(".");
    				var ext=str.substring(extStart,str.length).toUpperCase();
    				console.log(ext)
				if(ext!=".BMP"&&ext!=".PNG"&&ext!=".GIF"&&ext!=".JPG"&&ext!=".JPEG"){
					alert("图片限于bmp,png,gif,jpeg,jpg格式");
					return false;
				}else{
  					return true;
  				}
				//console.log(obj, str);
				//return true;
			},
			// 上传之后回调
			onComplate: function(data) {
				$el.parent().before('<li><input class="hide_input" type="file" id="upimgFile_' + add_imgi + '"/><img class="img_src" id="imgShow_' + add_imgi + '"/><i class="del_img">-</i></li>');
				$("#imgShow_" + add_imgi + "").attr({
					"src": SERVER_URL + data.imgurl,
					"urldizhi": data.imgurl
				});
				add_imgi++;
				console.log(data);
			},
			onProgress: function(e) {
				var per = Math.round(e.loaded * 100 / e.total);
				$('.complete').css('width', per + '%')
			}
		});
		$el.upload("ajaxSubmit");
	}

	$('.tanceng .addimg').die().live('change', function() {
		ajaxSubmit($(this));
	});

//});