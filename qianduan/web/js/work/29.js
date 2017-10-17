//$(function(){
	

var token, page, limit, company_id, department_id;
token = Admin.get_token();
page = 1;
limit = 10;
company_id = window.localStorage.getItem('usercompany_id');
department_id = window.localStorage.getItem('department_id');
//SERVER_URL="http://192.168.0.167:9091/";
//console.log(loginUserInfo)
//uid = loginUserInfo.uid;
//token = loginUserInfo.token;
//company_id = loginUserInfo.usercompany_id;
//department_id = loginUserInfo.department_id;
//company_id = 1;
//department_id = 1;
//SERVER_URL = 'http://192.168.0.167:9010/';
//console.log(company_id+':::'+department_id)
//点击刷新
$('.wk_ckkq_djsx_xxl').die().live('click', function() {
	add_Rload_index(29, 3) //参数页面值，父级值
})
var wk_ckkq_data = {
	token: token,
	company_id: company_id,
	department_id: department_id,
	start_time: '',
	end_time: '',
	page: page,
	limit:limit
}

function wk_ckkq_ajax() {
	$.ajax({
		type: "post",
		url: SERVER_URL + "work-sign/department-sign",
		data: wk_ckkq_data,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg)
				$('.wk_ckkq_list_html_xxl').html('')
				$('.wk_ckkq_fenye_list_xxl').css('display', 'none');
				var kqerr_html = '';
				kqerr_html += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
				$('.wk_ckkq_errhtml_xxl').html(kqerr_html)
			} else {
				console.log(data)
				var kq_list = data['data'],
					kq_html = '';
				if(kq_list.length == 0) {
					$('.wk_ckkq_list_html_xxl').html('')
					$('.wk_ckkq_fenye_list_xxl').css('display', 'none');
					var kqerr_html = '';
					kqerr_html += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
					$('.wk_ckkq_errhtml_xxl').html(kqerr_html)
				} else {
					$('.wk_ckkq_errhtml_xxl').html('');
					$('.wk_ckkq_fenye_list_xxl').css('display', 'block');
					$.each(kq_list, function(i, v) {
						kq_html += '<tr>';
						kq_html += '<td>' + likNullData(v.work_day) + '</td>';
						kq_html += '<td>' + likNullData(v.week) + '</td>';
						if(v.amOnTimeCount == 0) {
							kq_html += '<td class="r_sidebar_btn">' + likNullData(v.amOnTimeCount) + '</td>';
						} else {
							kq_html += '<td class="f_color r_sidebar_btn wk_ckkq_swzs_xxl" name="work_ckkq_zs" tid="' + v.work_day + '">' + likNullData(v.amOnTimeCount) + '</td>';
						}
						if(v.amLateCount == 0) {
							kq_html += '<td class="r_sidebar_btn">' + likNullData(v.amLateCount) + '</td>';
						} else {
							kq_html += '<td class="f_color r_sidebar_btn wk_kqsbcd_xxl" name="work_ckkq_cd" tid="' + v.work_day + '">' + likNullData(v.amLateCount) + '</td>';
						}
						if(v.amOverCount == 0) {
							kq_html += '<td class="r_sidebar_btn">' + likNullData(v.amOverCount) + '</td>';
						} else {
							kq_html += '<td class="f_color r_sidebar_btn wk_sbfww_xxl" name="work_ckkq_fww" tid="' + v.work_day + '">' + likNullData(v.amOverCount) + '</td>';
						}
						if(v.amNoSignCount == 0) {
							kq_html += '<td class="r_sidebar_btn">' + likNullData(v.amNoSignCount) + '</td>';
						} else {
							kq_html += '<td class="f_color r_sidebar_btn wk_kqsbwqd_xxl" name="work_ckkq_wqd" tid="' + v.work_day + '">' + likNullData(v.amNoSignCount) + '</td>';
						}
						if(v.pmOnTimeCount == 0) {
							kq_html += '<td class="r_sidebar_btn">' + likNullData(v.pmOnTimeCount) + '</td>';
						} else {
							kq_html += '<td class="f_color r_sidebar_btn wk_kq_xb_zstimss_xxl" name="work_ckkq_zs_xb" tid="' + v.work_day + '">' + likNullData(v.pmOnTimeCount) + '</td>';
						}
						if(v.pmLateCount == 0) {
							kq_html += '<td class="r_sidebar_btn" >' + likNullData(v.pmLateCount) + '</td>';
						} else {
							kq_html += '<td class="f_color r_sidebar_btn wkkq_xb_zaotuis_xxl" name="work_ckkq_zaot_xb" tid="' + v.work_day + '">' + likNullData(v.pmLateCount) + '</td>';
						}
						if(v.pmOverCount == 0) {
							kq_html += '<td class="r_sidebar_btn">' + likNullData(v.pmOverCount) + '</td>';
						} else {
							kq_html += '<td class="f_color r_sidebar_btn wkkq_xb_fwws_xxl" name="work_ckkq_fww_xb" tid="' + v.work_day + '">' + likNullData(v.pmOverCount) + '</td>';
						}
						if(v.pmNoSignCount == 0) {
							kq_html += '<td class="r_sidebar_btn">' + likNullData(v.pmNoSignCount) + '</td>';
						} else {
							kq_html += '<td class="f_color r_sidebar_btn wkkq_xb_wqtui_xxl" name="work_ckkq_wqt_xb" tid="' + v.work_day + '">' + likNullData(v.pmNoSignCount) + '</td>';
						}
						if(v.jiabanCount == 0) {
							kq_html += '<td class="r_sidebar_btn">' + likNullData(v.jiabanCount) + '</td>';
						} else {
							kq_html += '<td class="f_color r_sidebar_btn wkkq_jiaban_xxl" name="work_ckkq_jb" tid="' + v.work_day + '">' + likNullData(v.jiabanCount) + '</td>';
						}
						if(v.leaveCount == 0) {
							kq_html += '<td class="r_sidebar_btn">' + likNullData(v.leaveCount) + '</td>';
						} else {
							kq_html += '<td class="f_color r_sidebar_btn wkkq_qingjia_xxl" name="work_ckkq_qj" tid="' + v.work_day + '">' + likNullData(v.leaveCount) + '</td>';
						}

						kq_html += '</tr>';
					});
					$('.wk_ckkq_list_html_xxl').html(kq_html)
					list_table_render_pagination(".wk_ckkq_fenye_list_xxl", wk_ckkq_data, wk_ckkq_ajax, data["totalcount"], kq_list.length)
				}
			}
		},
		error: function(e) {
			//wk_ckkq_ajax()
			console.log(e)
			$('.wk_ckkq_list_html_xxl').html('')
			$('.wk_ckkq_fenye_list_xxl').css('display', 'none');
			var kqerr_html = '';
			kqerr_html += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
			$('.wk_ckkq_errhtml_xxl').html(kqerr_html)
		}
	});
}
wk_ckkq_ajax()
	//查看上班准时详情
var wk_sb_zs_data = {
	token: token,
	company_id: '',
	department_id: '',
	status: '', //1上午，2下午
	yearmonthday: '',
	ontime: ''
}
$('.wk_ckkq_swzs_xxl').die().live('click', function() {
	$('.wkkq_cksbtime_xxl').html($(this).attr('tid'))
	var wkkq_sj = $('.ckkq_sbtime_xxl');
	wk_sb_zs_data.yearmonthday = $(this).attr('tid');
	wk_sb_zs_data.company_id = wkkq_sj.attr('gsid');
	wk_sb_zs_data.department_id = wkkq_sj.attr('bmid');
	wk_sb_zs_data.ontime = wkkq_sj.attr('sbtime');
	wk_sb_zs_data.status = '1';
	//console.log(wk_sb_zs_data)
	wk_sb_zs_ajax()
})

function wk_sb_zs_ajax() {
	$.ajax({
		type: "post",
		url: SERVER_URL + "work-sign/department-on-time",
		data: wk_sb_zs_data,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data)
			} else {
				console.log(data);
				var datalist = data['data'],
					sbzs_html = '';
				$('.wkkq_cksb_zsnums_xxl').html('准时' + data.number + '人');
				if(datalist.length == 0) {
					$('.wkkq_sbzhunshi_listhtml_xxl').html('');
				} else {
					$.each(datalist, function(i, v) {
						sbzs_html += '<tr>';
						sbzs_html += '<td>' + likNullData(v.name) + '</td>';
						sbzs_html += '<td>' + likNullData(v.deptname) + '</td>';
						sbzs_html += '<td>' + likNullData(v.work_time) + '</td>';
						//sbzs_html += '<td>' + likNullData(v.remark) + '</td></tr>';
					});
					$('.wkkq_sbzhunshi_listhtml_xxl').html(sbzs_html);
				}
			}
		},
		error: function(e) {
			console.log(e)
		}
	});
}
//查看下班准时情况
$('.wk_kq_xb_zstimss_xxl').die().live('click', function() {
	$('.wkckkq_xbzhunshi_rqxxl').html($(this).attr('tid'))
	var wkkq_xb = $('.ckkq_xbshijian_xxl');
	wk_sb_zs_data.yearmonthday = $(this).attr('tid');
	wk_sb_zs_data.company_id = wkkq_xb.attr('gsid');
	wk_sb_zs_data.department_id = wkkq_xb.attr('bmid');
	wk_sb_zs_data.ontime = wkkq_xb.attr('xbtimes');
	wk_sb_zs_data.status = '2';
	wkkq_xiaban_zs_ajax()
})

function wkkq_xiaban_zs_ajax() {
	$.ajax({
		type: "post",
		url: SERVER_URL + "work-sign/department-on-time",
		data: wk_sb_zs_data,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data)
			} else {
				console.log(data);
				var datalist = data['data'],
					xbzs_html = '';
				$('.wkkq_xiaban_zsnums_xxl').html('准时' + data.number + '人');
				if(datalist.length == 0) {
					$('.wkkq_xiaban_listhtml_xxl').html('');
				} else {
					$.each(datalist, function(i, v) {
						xbzs_html += '<tr>';
						xbzs_html += '<td>' + likNullData(v.name) + '</td>';
						xbzs_html += '<td>' + likNullData(v.deptname) + '</td>';
						xbzs_html += '<td>' + likNullData(v.work_time) + '</td>';
						//xbzs_html += '<td>' + likNullData(v.remark) + '</td></tr>';
					});
					$('.wkkq_xiaban_listhtml_xxl').html(xbzs_html);
				}
			}
		},
		error: function(e) {
			console.log(e)
		}
	});
}
//查看上班迟到详情
var wkkq_chidao_data = {
	token: token,
	company_id: '',
	department_id: '',
	status: '', //1上午，2下午
	yearmonthday: '',
	ontime: ''
}
$('.wk_kqsbcd_xxl').die().live('click', function() {
	$('.wkkq_sbcd_today_xxl').html($(this).attr('tid'));
	var wkkq_sj = $('.ckkq_sbtime_xxl');
	wkkq_chidao_data.yearmonthday = $(this).attr('tid');
	wkkq_chidao_data.company_id = wkkq_sj.attr('gsid');
	wkkq_chidao_data.department_id = wkkq_sj.attr('bmid');
	wkkq_chidao_data.ontime = wkkq_sj.attr('sbtime');
	wkkq_chidao_data.status = '1';
	wkkq_chidao_ajax();
})
$('.wkkq_xb_zaotuis_xxl').die().live('click', function() {
	$('.wkkq_xbzaotui_today_xxl').html($(this).attr('tid'));
	var wkkq_zt = $('.ckkq_xbshijian_xxl');
	wkkq_chidao_data.yearmonthday = $(this).attr('tid');
	wkkq_chidao_data.company_id = wkkq_zt.attr('gsid');
	wkkq_chidao_data.department_id = wkkq_zt.attr('bmid');
	wkkq_chidao_data.ontime = wkkq_zt.attr('xbtimes');
	wkkq_chidao_data.status = '2';
	wkkq_zaotui_ajax();
})

function wkkq_zaotui_ajax() {
	$.ajax({
		type: "post",
		url: SERVER_URL + "work-sign/department-leave",
		data: wkkq_chidao_data,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg)
			} else {
				console.log(data)
				var datalist = data['data'],
					zt_html = '';
				$('.wkkq_xbzaotui_nums_xxl').html('早退' + data.number + '人');
				if(datalist.length == 0) {
					$('.wkkq_ckzaotui_listhtml_xxl').html('');
				} else {
					$.each(datalist, function(i, v) {
						zt_html += '<tr>';
						zt_html += '<td>' + likNullData(v.name) + '</td>';
						zt_html += '<td>' + likNullData(v.deptname) + '</td>';
						zt_html += '<td>' + likNullData(v.work_time) + '</td>';
						zt_html += '<td>' + likNullData(v.remark) + '</td></tr>';
					});
					$('.wkkq_ckzaotui_listhtml_xxl').html(zt_html);
				}
			}
		},
		error: function(e) {
			console.log(e)
		}
	});
}

function wkkq_chidao_ajax() {
	$.ajax({
		type: "post",
		url: SERVER_URL + "work-sign/department-leave",
		data: wkkq_chidao_data,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg)
			} else {
				console.log(data)
				var datalist = data['data'],
					cd_html = '';
				$('.wkkq_sncdnums_xxl').html('迟到' + data.number + '人');
				if(datalist.length == 0) {
					$('.wkkq_sbcd_listhtml_xxl').html('');
				} else {
					$.each(datalist, function(i, v) {
						cd_html += '<tr>';
						cd_html += '<td>' + likNullData(v.name) + '</td>';
						cd_html += '<td>' + likNullData(v.deptname) + '</td>';
						cd_html += '<td>' + likNullData(v.work_time) + '</td>';
						cd_html += '<td>' + likNullData(v.remark) + '</td></tr>';
					});
					$('.wkkq_sbcd_listhtml_xxl').html(cd_html);
				}
			}
		},
		error: function(e) {
			console.log(e)
		}
	});
}
//查看范围外的
var wkkq_ckkq_fwwdata = {
	token: token,
	company_id: '',
	department_id: '',
	status: '', //1上午，2下午
	yearmonthday: ''
}
$('.wk_sbfww_xxl').die().live('click', function() {
	$('.wkkq_ckkq_sbfww_today_xxl').html($(this).attr('tid'));
	var wkkq_sbfww = $('.ckkq_sbtime_xxl');
	wkkq_ckkq_fwwdata.company_id = wkkq_sbfww.attr('gsid');
	wkkq_ckkq_fwwdata.department_id = wkkq_sbfww.attr('bmid');
	wkkq_ckkq_fwwdata.status = '1';
	wkkq_ckkq_fwwdata.yearmonthday = $(this).attr('tid');
	wkkq_ckkq_fwwajax();
})
$('.wkkq_xb_fwws_xxl').die().live('click', function() {
	$('.wkkq_ckkq_xbfww_today_xxl').html($(this).attr('tid'));
	var wkkq_xbfww = $('.ckkq_xbshijian_xxl');
	wkkq_ckkq_fwwdata.company_id = wkkq_xbfww.attr('gsid');
	wkkq_ckkq_fwwdata.department_id = wkkq_xbfww.attr('bmid');
	wkkq_ckkq_fwwdata.status = '2';
	wkkq_ckkq_fwwdata.yearmonthday = $(this).attr('tid');
	wkkq_ckkq_xbfwwajax();
})
function wkkq_ckkq_xbfwwajax() {
	$.ajax({
		type: "post",
		url: SERVER_URL + "work-sign/department-over",
		data: wkkq_ckkq_fwwdata,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data)
			} else {
				console.log(data)
				var fww_list = data['data'],
					fww_html = '';
				$('.wkkq_kq_xbfww_nums_xxl').html('范围外' + data.number + '人');
				if(fww_list.length == 0) {
					$('.wkkq_ckkq_xiaban_fwwhtml_xxl').html('');
				} else {
					$.each(fww_list, function(i, v) {
						fww_html += '<tr><td>' + likNullData(v.name) + '</td>';
						fww_html += '<td>' + likNullData(v.deptname) + '</td>';
						fww_html += '<td>' + likNullData(v.work_time) + '</td>';
						fww_html += '<td class="work_address work_vend_client_contact">';
						fww_html += '<div class="text_line" style="width:56px;"><span class="ellipsis">' + likNullData(v.work_area) + '</span></div>';
						fww_html += '<div class="work_vent_client_contMsgBox" style="display:none;">';
						fww_html += '<i class="work_vent_client_torr"></i>';
						fww_html += '<div class="work_vent_client_contMsgBoxDet"><p>' + likNullData(v.work_area) + '</p></div></div></td>';
						fww_html += '<td class="work_address work_vend_client_contact">';
						fww_html += '<div class="text_line" style="width:56px;"><span class="ellipsis"><i class="w_checkattd_slider_reason f_color">外勤</i>' + likNullData(v.reason) + '</span></div>';
						fww_html += '<div class="work_vent_client_contMsgBox" style="display: none;">';
						fww_html += '<i class="work_vent_client_torr"></i>';
						fww_html += '<div class="work_vent_client_contMsgBoxDet">';
						fww_html += '<p><i class="w_checkattd_slider_reason f_color">外勤</i>' + likNullData(v.reason) + '</p>';
						fww_html += '</div></div></td></tr>';
					});
					$('.wkkq_ckkq_xiaban_fwwhtml_xxl').html(fww_html);
					$('.work_vend_client_contact').hover(function(){
						$(this).children('.work_vent_client_contMsgBox').css('display', 'block');
					},function(){
						$(this).children('.work_vent_client_contMsgBox').css('display', 'none');
					})

				}

			}
		},
		error: function(e) {
			console.log(e)
		}
	});
}
function wkkq_ckkq_fwwajax() {
	$.ajax({
		type: "post",
		url: SERVER_URL + "work-sign/department-over",
		data: wkkq_ckkq_fwwdata,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data)
			} else {
				console.log(data)
				var fww_list = data['data'],
					fww_html = '';
				$('.wkkq_ckkq_snfwwnums_xxl').html('范围外' + data.number + '人');
				if(fww_list.length == 0) {
					$('.wkkq_ckkq_sbfww_html_xxl').html('');
				} else {
					$.each(fww_list, function(i, v) {
						fww_html += '<tr><td>' + likNullData(v.name) + '</td>';
						fww_html += '<td>' + likNullData(v.deptname) + '</td>';
						fww_html += '<td>' + likNullData(v.work_time) + '</td>';
						fww_html += '<td class="work_address work_vend_client_contact">';
						fww_html += '<div class="text_line" style="width:56px;"><span class="ellipsis">' + likNullData(v.work_area) + '</span></div>';
						fww_html += '<div class="work_vent_client_contMsgBox" style="display:none;">';
						fww_html += '<i class="work_vent_client_torr"></i>';
						fww_html += '<div class="work_vent_client_contMsgBoxDet"><p>' + likNullData(v.work_area) + '</p></div></div></td>';
						fww_html += '<td class="work_address work_vend_client_contact">';
						fww_html += '<div class="text_line" style="width:56px;"><span class="ellipsis"><i class="w_checkattd_slider_reason f_color">外勤</i>' + likNullData(v.reason) + '</span></div>';
						fww_html += '<div class="work_vent_client_contMsgBox" style="display: none;">';
						fww_html += '<i class="work_vent_client_torr"></i>';
						fww_html += '<div class="work_vent_client_contMsgBoxDet">';
						fww_html += '<p><i class="w_checkattd_slider_reason f_color">外勤</i>' + likNullData(v.reason) + '</p>';
						fww_html += '</div></div></td></tr>';
					});
					$('.wkkq_ckkq_sbfww_html_xxl').html(fww_html);
					$('.work_vend_client_contact').hover(function(){
						$(this).children('.work_vent_client_contMsgBox').css('display', 'block');
					},function(){
						$(this).children('.work_vent_client_contMsgBox').css('display', 'none');
					})
//					$(".work_vend_client_contact").live("mouseover", function() {
//						$(this).children('.work_vent_client_contMsgBox').css('display', 'block');
//					}).live("mouseout", function() {
//						$(this).children('.work_vent_client_contMsgBox').css('display', 'none');;
//					});

				}

			}
		},
		error: function(e) {
			console.log(e)
		}
	});
}
//查看未签到-未签退
var wkkq_weiqd_qt_data = {
	token:token,
	company_id:'',
	department_id:'',
	status:'',//1上午，2下午
	yearmonthday:''
}
function wkkq_snwqd_ajax(){
	$.ajax({
		type:"post",
		url:SERVER_URL+"work-sign/department-no-sign",
		data:wkkq_weiqd_qt_data,
		dataType:'json',
		success:function(data){
			if(data.code!=0){
				console.log(data)
			}else{
				console.log(data)
				var sbwqd_list = data['data'],sbwqd_html='';
				$('.wkkq_sbwqd_nums_xxl').html('未签到' + data.number + '人');
				if(sbwqd_list.length==0){
					$('.wkkq_sbwqd_listhtml_xxl').html('');
				}else{
					$.each(sbwqd_list, function(i,v) {
						sbwqd_html +='<tr>';
						sbwqd_html +='<td>'+likNullData(v.name)+'</td>'	;
						sbwqd_html +='<td>'+likNullData(v.deptname)+'</td>';	
						//sbwqd_html +='<td>'+likNullData(v.remark)+'</td></tr>';	
					});
					$('.wkkq_sbwqd_listhtml_xxl').html(sbwqd_html);
				}
			}
		},
		error:function(e){
			console.log(e)
		}
	});
}
function wkkq_xbwqtui_ajax(){
	$.ajax({
		type:"post",
		url:SERVER_URL+"work-sign/department-no-sign",
		data:wkkq_weiqd_qt_data,
		dataType:'json',
		success:function(data){
			if(data.code!=0){
				console.log(data)
			}else{
				console.log(data)
				var xbwqt_list = data['data'],xbwqt_html='';
				$('.wkkq_ckkq_xbwqtnums_xxl').html('未签退' + data.number + '人');
				if(xbwqt_list.length==0){
					$('.wkkq_ckkq_qiabanwqt_listhtml_xxl').html('');
				}else{
					$.each(xbwqt_list, function(i,v) {
						xbwqt_html +='<tr>';
						xbwqt_html +='<td>'+likNullData(v.name)+'</td>'	;
						xbwqt_html +='<td>'+likNullData(v.deptname)+'</td>';	
						//xbwqt_html +='<td>'+likNullData(v.remark)+'</td></tr>';	
					});
					$('.wkkq_ckkq_qiabanwqt_listhtml_xxl').html(xbwqt_html);
				}
			}
		},
		error:function(e){
			console.log(e)
		}
	});
}
$('.wk_kqsbwqd_xxl').die().live('click',function(){
	$('.wkkq_sbwqd_today_xxl').html($(this).attr('tid'));
	var wkkq_sbwqd = $('.ckkq_sbtime_xxl');
	wkkq_weiqd_qt_data.company_id = wkkq_sbwqd.attr('gsid');
	wkkq_weiqd_qt_data.department_id = wkkq_sbwqd.attr('bmid');
	wkkq_weiqd_qt_data.status = '1';
	wkkq_weiqd_qt_data.yearmonthday = $(this).attr('tid');
	wkkq_snwqd_ajax();
})
$('.wkkq_xb_wqtui_xxl').die().live('click',function(){
	$('.wkkq_xiab_wqt_today_xxl').html($(this).attr('tid'));
	var wkkq_xbwqt = $('.ckkq_xbshijian_xxl');
	wkkq_weiqd_qt_data.company_id = wkkq_xbwqt.attr('gsid');
	wkkq_weiqd_qt_data.department_id = wkkq_xbwqt.attr('bmid');
	wkkq_weiqd_qt_data.status = '2';
	wkkq_weiqd_qt_data.yearmonthday = $(this).attr('tid');
	wkkq_xbwqtui_ajax();
})
//创建考勤部门列表
function kq_bumen_list() {
	$.ajax({
		type: "post",
		url: SERVER_URL + "work-sign/sign-department",
		data: {
			token: token,
			company_id: company_id
		},
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data)
			} else {
				console.log(data)
				var kqbm_list = data['data'],
					kqbm_html = '',
					ckkq_bmerr = '';
				if(kqbm_list.length == 0) {
					//ckkq_bmerr += '<li class="Sideslip_list_on" name="work_kq_ul" title="还没有部门哦"><span>哦呦,还没有部门哦</span></li>';
					$('.ckkq_bmlist_html_xxl').html('');
				} else {
					$.each(kqbm_list, function(i, v) {
						kqbm_html += '<li class="" name="work_kq_ul" title="' + v.department_name + '" bmid="' + v.department_id + '" gsid="' + v.company_id + '" stime="' + v.department_goto + '" xtime="' + v.department_leave + '"><span>' + likNullData(v.department_name) + '</span></li>';
					});
					$('.ckkq_bmlist_html_xxl').html(kqbm_html);
					$('.ckkq_bmlist_html_xxl li:first-child').addClass('Sideslip_list_on');
					wk_ckkq_data.department_id = $('.ckkq_bmlist_html_xxl li:first-child').attr('bmid');
					$('.ckkq_sbtime_xxl').attr({
						'sbtime': $('.ckkq_bmlist_html_xxl li:first-child').attr('stime'),
						'gsid': $('.ckkq_bmlist_html_xxl li:first-child').attr('gsid'),
						'bmid': $('.ckkq_bmlist_html_xxl li:first-child').attr('bmid')
					});
					$('.ckkq_xbshijian_xxl').attr({
						'xbtimes': $('.ckkq_bmlist_html_xxl li:first-child').attr('xtime'),
						'gsid': $('.ckkq_bmlist_html_xxl li:first-child').attr('gsid'),
						'bmid': $('.ckkq_bmlist_html_xxl li:first-child').attr('bmid')
					});
					wk_ckkq_ajax()
				}

			}
		},
		error: function(e) {
			console.log(e)
			//kq_bumen_list()
		}
	});
}
kq_bumen_list()
	//切换部门考勤
$('.ckkq_bmlist_html_xxl li').die().live('click', function() {
	//console.log($(this).attr('bmid'))
	$('.ckkq_sbtime_xxl').attr('sbtime', $(this).attr('stime'));
	$('.ckkq_xbshijian_xxl').attr('xbtimes', $(this).attr('xtime'));
	wk_ckkq_data.department_id = $(this).attr('bmid');
	wk_ckkq_ajax()
})
//加班
var ckkq_jiaban_data = {
	token:token,
	company_id:'',
	department_id:'',
	yearmonthday:''
}
function ckkq_jiaban_ajax(){
	$.ajax({
		type:"post",
		url:SERVER_URL+"work-sign/department-add-work",
		data:ckkq_jiaban_data,
		dataType:'json',
		success:function(data){
			if(data.code!=0){
				console.log(data)
			}else{
				console.log(data)
				var jiab_list = data['data'],jiab_html='';
				$('.wkkq_ckkq_jiabannums_xxl').html(data.number+'人')
				if(jiab_list.length==0){
					$('.wkkq_ckkqjiaban_listhtml_xxl').html('')
				}else{
					$.each(jiab_list, function(i,v) {
						jiab_html +='<tr>';
						jiab_html +='<td>'+likNullData(v.name)+'</td>';
						jiab_html +='<td>'+likNullData(v.deptname)+'</td>';	
						jiab_html +='<td>'+likNullData(v.start_time)+'</td>';	
						jiab_html +='<td>'+likNullData(v.end_time)+'</td>';	
						//jiab_html +='<td>'+likNullData(v.remark)+'</td></tr>';	
					});
					$('.wkkq_ckkqjiaban_listhtml_xxl').html(jiab_html)
				}
			}
		},
		error:function(e){
			console.log(e)
		}
	});
}
$('.wkkq_jiaban_xxl').die().live('click',function(){
	$('.wkkq_ckkq_jiaban_today_xxl').html($(this).attr('tid'));
	var wkkq_jiab = $('.ckkq_sbtime_xxl');
	ckkq_jiaban_data.company_id = wkkq_jiab.attr('gsid');
	ckkq_jiaban_data.department_id = wkkq_jiab.attr('bmid');
	ckkq_jiaban_data.yearmonthday = $(this).attr('tid');
	ckkq_jiaban_ajax();
})
//请假
var wkkq_ckkq_qingjia_data = {
	token:token,
	company_id:'',
	department_id:'',
	yearmonthday:''
}
function wkkq_ckkq_qingjia_ajax(){
	$.ajax({
		type:"post",
		url:SERVER_URL+"work-sign/leave",
		data:wkkq_ckkq_qingjia_data,
		dataType:'json',
		success:function(data){
			if(data.code!=0){
				console.log(data)
			}else{
				console.log(data)
				var qingjia_list = data['data'],qingjia_html = '';
				$('.wkkq_ckkq_qijianums_xxl').html(data.number+'人');
				if(qingjia_list.length==0){
					$('.wkkq_ckkq_qingjia_listhtml_xxl').html('')
				}else{
					$.each(qingjia_list, function(i,v) {
						qingjia_html +='<tr>';
						qingjia_html +='<td>'+likNullData(v.name)+'</td>';	
						qingjia_html +='<td>'+likNullData(v.deptname)+'</td>';
						qingjia_html +='<td class="work_address work_vend_client_contact">';
						qingjia_html +='<div class="text_line" style="width:56px;"><span class="ellipsis">' + likNullData(v.start_time) + '</span></div>';
						qingjia_html +='<div class="work_vent_client_contMsgBox" style="display:none;">';	
						qingjia_html += '<i class="work_vent_client_torr"></i>';
						qingjia_html += '<div class="work_vent_client_contMsgBoxDet"><p>' + likNullData(v.start_time) + '</p></div></div></td>';
						qingjia_html +='<td class="work_address work_vend_client_contact">';
						qingjia_html +='<div class="text_line" style="width:56px;"><span class="ellipsis">' + likNullData(v.end_time) + '</span></div>';
						qingjia_html +='<div class="work_vent_client_contMsgBox" style="display:none;">';	
						qingjia_html += '<i class="work_vent_client_torr"></i>';
						qingjia_html += '<div class="work_vent_client_contMsgBoxDet"><p>' + likNullData(v.end_time) + '</p></div></div></td>';
						qingjia_html +='<td>'+likNullData(v.status)+'</td></tr>';	
					});
					$('.wkkq_ckkq_qingjia_listhtml_xxl').html(qingjia_html)
					$('.work_vend_client_contact').hover(function(){
						$(this).children('.work_vent_client_contMsgBox').css('display', 'block');
					},function(){
						$(this).children('.work_vent_client_contMsgBox').css('display', 'none');
					})
				}
			}
		},
		error:function(e){
			console.log(e)
		}
	});
}
$('.wkkq_qingjia_xxl').die().live('click',function(){
	$('.wkkq_ckkq_qingjia_today_xxl').html($(this).attr('tid'));
	var wkkq_qingjia = $('.ckkq_sbtime_xxl');
	wkkq_ckkq_qingjia_data.company_id = wkkq_qingjia.attr('gsid');
	wkkq_ckkq_qingjia_data.department_id = wkkq_qingjia.attr('bmid');
	wkkq_ckkq_qingjia_data.yearmonthday = $(this).attr('tid');
	wkkq_ckkq_qingjia_ajax();
})





//})






























