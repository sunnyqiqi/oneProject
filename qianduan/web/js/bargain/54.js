var token,username;
token = Admin.get_token();
//tokenid = Admin.get_uid();
username = window.localStorage.getItem('username');
//username = '邢啸亮';//window.localStorage.getItem('username');
//SERVER_URL = 'http://192.168.0.167:9091/';
//SERVER_URL = 'http://192.168.0.167:9010/';
//token='2017052516045457073-1-1';
var loginUserInfo = JSON.parse(localStorage.getItem('user_info'));
var addhtmoban='contract-template/add',bianji='contract-template/update',zuofei='contract-template/invalid',shanchu='contract-template/del';
if(loginUserInfo['company_admin'] != 1){
	if(loginUserInfo.powerUrls.length==0){
		$('.xjbtn_xxl').hide();
		$('.htmb_lb_bjbtn_xxl').hide()
		$('.mb_list_delbtn_xxl').hide();
		$('.tingyong_xxl').hide()
	}else{
		var arr = loginUserInfo.powerUrls;//
		if($.inArray(addhtmoban, arr)!=-1){
			$('.xjbtn_xxl').show();
		}else{
			$('.xjbtn_xxl').hide();
		}
		if($.inArray(bianji, arr)!=-1){
			$('.htmb_lb_bjbtn_xxl').show()
		}else{
			$('.htmb_lb_bjbtn_xxl').hide()
		}
		if($.inArray(zuofei, arr)!=-1){
			$('.tingyong_xxl').show()
		}else{
			$('.tingyong_xxl').hide()
		}
		if($.inArray(shanchu, arr)!=-1){
			$('.mb_list_delbtn_xxl').show();
		}else{
			$('.mb_list_delbtn_xxl').hide();
		}
		
	}
}
	//补零
function Appendzero(obj) {
	if(obj < 10) return "0" + obj;
	else return obj;
}
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
//新建模板-创建人
$('.xjbtn_xxl').die().live('click', function() {
	var _this=$(this);
		$('.xjusername_xxl').html(username)
		$('.xjdata_xxl').html(now)
		numa = []
		$('.tanceng .xj_tjhttk_btn_xxlA').attr('thetype',_this.attr('typeid'))
		//$('.tanceng .tabcontent[name="ht_muban_termBox"]').each(function(){
			//if(_this.attr('typeid')=='1'){
				
				$('.tabcontent[name="ht_muban_termBox"]').eq(parseInt(_this.attr('typeid'))-1).show().siblings('.tabcontent[name="ht_muban_termBox"]').hide();
				$('.tanceng .htmb_xj_baocunbtn_xxl').attr('thetype',_this.attr('typeid'))
				$('.tanceng .htmb_xj_yunlan_btn_xxl').attr('thetype',_this.attr('typeid'))
			//}else if(){
				
			//}
			
		//})
	
	})
	//合同模板列表
var moban_data_list = {
	token: token,
	thetype: '1',
	page: '1',
	num: '10',
	dept: '',
	name: '',
	uid: '',
	updated_uid: ''
}
moban_ajax_list()
	//列表展示
function moban_ajax_list() {
	//console.log(moban_data_list)
	$('.mobanhtmls').html('')
	$.ajax({
		type: "get",
		url: SERVER_URL + "contract-template/list",
		data: moban_data_list,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg);
				$('.mobanhtmls').html('')
					var err_html = '';
					err_html += '<div class="no_data_box" style="width:120%;"><div class="no_data"><!--<span class="inline_block"></span>--><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
					$('.moban_err_html').html(err_html);
					$('.moban_fenye_xxl').css('display', 'none')
			} else {
				console.log(data)
				var moban_list = data['datalist'];
				$('.htmb_ssnums_xxl').html(data.totalcount)
				if(moban_list.length == 0) {
					$('.mobanhtmls').html('')
					var err_html = '';
					err_html += '<div class="no_data_box"><div class="no_data"><!--<span class="inline_block"></span>--><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
					$('.moban_err_html').html(err_html);
					$('.moban_fenye_xxl').css('display', 'none')
				} else {
					$('.moban_err_html').html('');
					$('.moban_fenye_xxl').css('display', 'block')
						//console.log(moban_list)
					var moban_htmllist_xxl = '';
					$.each(moban_list, function(i, v) {
						moban_htmllist_xxl += '<tr><td>' + Appendzero(i + 1) + '</td>'
						moban_htmllist_xxl += '<td>' + likNullData(v.name) + '</td>'
						//moban_htmllist_xxl += '<td>' + likNullData(v.type_name) + '</td>'
						//moban_htmllist_xxl += '<td>' + likNullData(v.dept_name) + '</td>'
						if(v.status == 0) {
							moban_htmllist_xxl += '<td class="sp_base_state"><span class="c_g">启用</span></td>'
						} else {
							moban_htmllist_xxl += '<td class="sp_base_state"><span class="c_r">停用</span></td>'
						}
						moban_htmllist_xxl += '<td>' + likNullData(v.created_at) + '</td>'
						moban_htmllist_xxl += '<td>' + likNullData(v.create_name) + '</td>'
						moban_htmllist_xxl += '<td>' + likNullData(v.updated_at) + '</td>'
						moban_htmllist_xxl += '<td>' + likNullData(v.updated_name) + '</td>'
						if(v.status == 0) {
							if(v.thetype == 1) {
								moban_htmllist_xxl += '<td> <button class="but_mix but_look val_dialog chakan" name="muban_pre_xs" uid="' + v.id + '">预览</button><button class="but_mix but_stop but_r tingyong_xxl" uid="' + v.id + '" sid="' + v.status + '">停用</button><button class="but_mix  but_r val_dialogTop zuofei_xxl" name="zuofei_tanchuang" uid="' + v.id + '" sid="' + v.status + '">作废</button></td>';
							} else if(v.thetype == 2) {
								moban_htmllist_xxl += '<td> <button class="but_mix but_look val_dialog chakan" name="muban_pre_cg" uid="' + v.id + '">预览</button><button class="but_mix but_stop but_r tingyong_xxl" uid="' + v.id + '" sid="' + v.status + '">停用</button><button class="but_mix  but_r val_dialogTop zuofei_xxl" name="zuofei_tanchuang" uid="' + v.id + '" sid="' + v.status + '">作废</button></td>';
							} else if(v.thetype == 3) {
								moban_htmllist_xxl += '<td> <button class="but_mix but_look val_dialog chakan" name="muban_pre_yg" uid="' + v.id + '">预览</button><button class="but_mix but_stop but_r tingyong_xxl" uid="' + v.id + '" sid="' + v.status + '">停用</button><button class="but_mix  but_r val_dialogTop zuofei_xxl" name="zuofei_tanchuang" uid="' + v.id + '" sid="' + v.status + '">作废</button></td>';
							} else {
								moban_htmllist_xxl += '<td> <button class="but_mix but_look val_dialog chakan" name="muban_pre_qt" uid="' + v.id + '">预览</button><button class="but_mix but_stop but_r tingyong_xxl" uid="' + v.id + '" sid="' + v.status + '">停用</button><button class="but_mix  but_r val_dialogTop zuofei_xxl" name="zuofei_tanchuang" uid="' + v.id + '" sid="' + v.status + '">作废</button></td>';
							}

						} else {
							if(v.thetype == 1) {
								moban_htmllist_xxl += '<td><button class="but_mix but_look val_dialog chakan" name="muban_pre_xs" uid="' + v.id + '">预览</button><button class="but_mix but_exit val_dialog htmb_lb_bjbtn_xxl" name="ht_muban_exit" uid="' + v.id + '" thetype="' + v.thetype + '">编辑</button><button class="but_mix but_use but_lv qiyong_xxl" uid="' + v.id + '" sid="' + v.status + '">启用</button><button class="but_mix val_dialogTop but_r zuofei_xxl" name="zuofei_tanchuang" uid="' + v.id + '" sid="' + v.status + '">作废</button></td>';
								//<button class="but_mix but_r but_detele val_dialog mb_list_delbtn_xxl" name="ht_muban_delete" uid="' + v.id + '">删除</button>
							} else if(v.thetype == 2) {
								moban_htmllist_xxl += '<td><button class="but_mix but_look val_dialog chakan" name="muban_pre_cg" uid="' + v.id + '">预览</button><button class="but_mix but_exit val_dialog htmb_lb_bjbtn_xxl" name="ht_muban_exit" uid="' + v.id + '" thetype="' + v.thetype + '">编辑</button><button class="but_mix but_use but_lv qiyong_xxl" uid="' + v.id + '" sid="' + v.status + '">启用</button><button class="but_mix val_dialogTop but_r zuofei_xxl" name="zuofei_tanchuang" uid="' + v.id + '" sid="' + v.status + '">作废</button></td>';
								//<button class="but_mix but_r but_detele val_dialog mb_list_delbtn_xxl" name="ht_muban_delete" uid="' + v.id + '">删除</button>
							} else if(v.thetype == 3) {
								moban_htmllist_xxl += '<td><button class="but_mix but_look val_dialog chakan" name="muban_pre_yg" uid="' + v.id + '">预览</button><button class="but_mix but_exit val_dialog htmb_lb_bjbtn_xxl" name="ht_muban_exit" uid="' + v.id + '" thetype="' + v.thetype + '">编辑</button><button class="but_mix but_use but_lv qiyong_xxl" uid="' + v.id + '" sid="' + v.status + '">启用</button><button class="but_mix val_dialogTop but_r zuofei_xxl" name="zuofei_tanchuang" uid="' + v.id + '" sid="' + v.status + '">作废</button></td>';
								//<button class="but_mix but_r but_detele val_dialog mb_list_delbtn_xxl" name="ht_muban_delete" uid="' + v.id + '">删除</button>
							} else {
								moban_htmllist_xxl += '<td><button class="but_mix but_look val_dialog chakan" name="muban_pre_qt" uid="' + v.id + '">预览</button><button class="but_mix but_exit val_dialog htmb_lb_bjbtn_xxl" name="ht_muban_exit" uid="' + v.id + '" thetype="' + v.thetype + '">编辑</button><button class="but_mix but_use but_lv qiyong_xxl" uid="' + v.id + '" sid="' + v.status + '">启用</button><button class="but_mix val_dialogTop but_r zuofei_xxl" name="zuofei_tanchuang" uid="' + v.id + '" sid="' + v.status + '">作废</button></td>';
								//<button class="but_mix but_r but_detele val_dialog mb_list_delbtn_xxl" name="ht_muban_delete" uid="' + v.id + '">删除</button>
							}

						}

						moban_htmllist_xxl += '</tr>';

					});

					$('.mobanhtmls').html(moban_htmllist_xxl)
					

				}
				list_table_render_pagination(".moban_fenye_xxl", moban_data_list, moban_ajax_list, data["totalcount"], moban_list.length)
					likShow('#mb_xzckx_xxl', mobanxuanzckx, '#mobanxzckx_xxl', '#mb_xzckx_baocun_xxl', '#mb_hfmr_xxl');

			}
		},
		error: function(data) {
			$('.mobanhtmls').html('')
			var err_html = '';
			err_html += '<div class="no_data_box"><div class="no_data"><!--<span class="inline_block"></span>--><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
			$('.moban_err_html').html(err_html);
			$('.moban_fenye_xxl').css('display', 'none')
		}
	});
}
//点击刷新
$('.djsx').die().live('click', function() {
	add_Rload_index(54,5)//参数页面值，父级值
//		moban_data_list = {
//			token: token,
//			thetype: '',
//			page: '1',
//			num: '10',
//			dept: '',
//			name: '',
//			uid: '',
//			updated_uid: ''
//		}
//		moban_ajax_list()
//		$('.tabtitle li:first').attr('class', 'taba tabhover').siblings('li').attr('class', 'taba');
//		$('.select_p input.htlx_inp_xxl').val('合同类型').attr('style', '');
//		$('.select_p input.sybm_inp_xxl').val('适用部门').attr('style', '');
//		$('.select_p input.cjr_inp_xxl').val('创建人').attr('style', '');
//		$('.select_p input.gxr_inp_xxl').val('更新人').attr('style', '');
	})
	//切换列表
$.each($('.tabtitle li.qiehuan'), function(i, v) {
	$(this).die().live('click', function() {
		$('.xjbtn_xxl').attr('typeid',$(this).attr('typeid'))
		moban_data_list.thetype = $(this).attr('typeid')
			//console.log(moban_data_list.thetype)
		moban_ajax_list()
	})

});
//作废
var zuofei_data = {
	token:token,
	id:'',
	status:'1'
}
$('.zuofei_xxl').live('click',function(){
	$('.tanceng .htmb_zuofeibtn_xxl').attr('uid',$(this).attr('uid'));
})
$('.tanceng .htmb_zuofeibtn_xxl').die().live('click',function(){
	zuofei_data.id = $(this).attr('uid'); 
	zuofei_ajax_xxl();
	$('.tanceng').empty().hide();
})
function zuofei_ajax_xxl(){
	$.ajax({
		type:"get",
		url:SERVER_URL+"contract-template/invalid",
		data:zuofei_data,
		dataType:'json',
		success:function(data){
			if(data.code!=0){
				alert(data.msg)
			}else{
				console.log(data)
				moban_ajax_list();
			}
		},
		error:function(data){
			
		}
	});
}
//搜索
$('.sousuo_xxl').die().live('click', function() {
	if($('.sousuomc_xxl').val() == '搜索合同模板名称' || $('.sousuomc_xxl').val() == '') {
		moban_data_list.name=''
	} else {
		moban_data_list.name = $('.sousuomc_xxl').val()
	}
	moban_ajax_list()
})

//function sousnow(val) {
//	moban_data_list.name = val;
//	console.log(moban_data_list.name)
//	moban_ajax_list()
//
//}
//高级搜索
var mbgjss_data_list = {
	token: token,
	big_type:'1',//1合同模板 2其他合同3销售合同4员工合同5采购合同
	small_type:''
}

function mbgjss_ajax_xxl() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "common/search",
		data: mbgjss_data_list,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg)
			} else {
				var moban_lists = data['data'];
				var sybm = '',
					cjr = '',
					gxr = '';
				$.each(moban_lists, function(i, v) {
					sybm += '<li deptid="' + v.id + '">' + v.name + '</li>';
					cjr += '<li uid="' + v.id + '">' + v.name + '</li>';
					gxr += '<li upid="' + v.id + '">' + v.name + '</li>'
				});
				$('.shiyongbumen_xxl').html(sybm)
				$('.cjr_xxl').html(cjr);
				$('.gxr_xxl').html(gxr);
			}
		},
		error: function(e) {

		}
	});
}
$('.sybm_inp_xxl,.sybm_inp_xxl+i').die().live('click',function(){
	mbgjss_data_list.small_type='dept';
	mbgjss_ajax_xxl()
})
$('.cjr_inp_xxl,.cjr_inp_xxl+i').die().live('click',function(){
	mbgjss_data_list.small_type='uid';
	mbgjss_ajax_xxl()
})
$('.gxr_inp_xxl,.gxr_inp_xxl+i').die().live('click',function(){
	mbgjss_data_list.small_type='updated_uid';
	mbgjss_ajax_xxl()
})
//
$('.gjss_htlx_xxl li').die().live('click', function() {
	$('.htlx_inp_xxl').val($(this).text()).addClass('c_3')
	//console.log($(this).attr('thytype'))
	moban_data_list.thetype = $(this).attr('thytype');
	moban_ajax_list()
})
$(".select_list:not(.no_auto) li").die().live("click", function() {
	// 高级搜索输入框宽度自适应
	$(this).parents('div.select_p').css('minWidth', $(this).width() + 32)
});
$('.shiyongbumen_xxl li').die().live('click', function() {
	$('.sybm_inp_xxl').val($(this).text()).addClass('c_3')
	moban_data_list.dept = $(this).attr('deptid')
		//console.log(moban_data_list.dept)
	moban_ajax_list()
})
$('.cjr_xxl li').die().live('click', function() {
	$('.cjr_inp_xxl').val($(this).text()).addClass('c_3')
	moban_data_list.uid = $(this).attr('uid');
	//console.log(moban_data_list.uid)
	moban_ajax_list()
})
$('.gxr_xxl li').die().live('click', function() {
	$('.gxr_inp_xxl').val($(this).text()).addClass('c_3')
		moban_data_list.updated_uid = $(this).attr('upid');
		moban_ajax_list()
	})
	// 定义查看项
var mobanxuanzckx = [{
		'index': null,
		'field': '创建日期'
	}, {
		'index': null,
		'field': '创建人'
	}, {
		'index': null,
		'field': '更新日期'
	}, {
		'index': null,
		'field': '更新人'
	}

];
//改变启用状态
var gaibian_data_xxl = {
	token: token,
	id: '',
	status: ''
}
$('.tingyong_xxl').die().live('click', function() {
	gaibian_data_xxl.id = $(this).attr('uid');
	gaibian_data_xxl.status = 1;
	gaibian_ajax_xxl()
		//console.log(gaibian_data_xxl.id,gaibian_data_xxl.status)
})
$('.qiyong_xxl').die().live('click', function() {
	gaibian_data_xxl.id = $(this).attr('uid');
	gaibian_data_xxl.status = 0;
	gaibian_ajax_xxl()
		//console.log(gaibian_data_xxl.id,gaibian_data_xxl.status)
})

function gaibian_ajax_xxl() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "contract-template/onstatus",
		data: gaibian_data_xxl,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg)
			} else {
				console.log(data)
				moban_ajax_list()
			}
		},
		error: function(data) {
			console.log(data)
		}
	});
}
//删除
var mb_del_data_xxl = {
	token:token,
	id:''
}
$('.mb_list_delbtn_xxl').die().live('click',function(){
	//console.log($(this).attr('uid'))
	$('.tanceng .mb_scqueding_btn_xxl').attr('uid',$(this).attr('uid'))
})
$('.tanceng .mb_scqueding_btn_xxl').die().live('click',function(){
	mb_del_data_xxl.id = $(this).attr('uid');
	mb_dels_ajax_xxl()
})
function mb_dels_ajax_xxl(){
	$.ajax({
		type:"get",
		url:SERVER_URL+"contract-template/del",
		data:mb_del_data_xxl,
		dataType:'json',
		success:function(data){
			if(data.code!=0){
				console.log(data.msg)
			}else{
				console.log(data)
				moban_ajax_list()
			}
		},
		error:function(e){
			console.log(e)
		}
	});
}
//查看详情-预览
var ckxq_data_xxl = {
	token: token,
	id: ''
}
$('.chakan').die().live('click', function() {
	ckxq_data_xxl.id = $(this).attr('uid');
	ckxq_ajax_xxl()
})

function ckxq_ajax_xxl() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "contract-template/info",
		data: ckxq_data_xxl,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg)
			} else {
				console.log(data)
				var data_list = data['customdatalist'],
					yl_list_html = '',
					mrlist=data['datalist'],nums=0;
				nums = mrlist.length-1;
				if(data_list.length == 0) {
					return;
				} else {
					$.each(data_list, function(i, v) {
						yl_list_html += '<div class="ht_msg"><p>' + intToChinese((i + nums)) + '、' + v.name + '</p><p>' + v.content + '</p></div>';
					});
					$('.tanceng .ht_msg_bottom').before(yl_list_html)
				}

			}
		},
		error: function(data) {

		}
	});
}
//编辑
var bj_ckxq_data = {
	token: token,
	id: ''
}
$('.htmb_lb_bjbtn_xxl').die().live('click', function() {
	numB = []
	bj_ckxq_data.id = $(this).attr('uid')
	bj_ckxq_ajax_xxl()
		//console.log(numB)
})
var numB = [];

function bj_ckxq_ajax_xxl() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "contract-template/info",
		data: bj_ckxq_data,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg)
			} else {
				console.log(data)
				var dataXQ = data['info'],
					dataZDY = data['customdatalist'];
				$('.tanceng .bj_listbaoc_btns_xxl').attr('uid', dataXQ.id);
				$('.tanceng .bj_cjrs_htmb_xxl').html(dataXQ.create_name)
				$('.tanceng .bj_cjriqidata_htmb_xxl').html(now)
				$('.tanceng .htmb_bj_genxinren').html('更新人:')
				$('.tanceng .bj_yunlan_btns_xxl').attr('thetype',dataXQ.thetype)
				$('.tanceng .bj_listbaoc_btns_xxl').attr('thetype',dataXQ.thetype)
//				if(dataXQ.is_name == 1) {
//					$('.tanceng .bj_isname_htmb_xxl').attr('checked', 'checked')
//					$('.tanceng .bj_mbmcss_xxl').val(dataXQ.name).attr({
//						'disabled': 'disabled',
//						'isname': 1
//					}).css('color', '#333')
//				} else {
					//$('.tanceng .bj_isname_htmb_xxl').attr('checked', false) .attr('isname', 0).removeAttr('disabled')
					$('.tanceng .bj_mbmcss_xxl').val(dataXQ.name).css('color', '#333')
				//}
				if(dataXQ.thetype == 1) {
					$('.tanceng .bj_htlxmcs_xxl').val('销售合同').attr('thetype', 1)
					$(".tabcontent[name='ht_muban_termBox']").eq(0).fadeIn(100).siblings(".tabcontent[name='ht_muban_termBox']").hide();
					$('.tanceng .bj_yunlan_btns_xxl').attr('name', 'muban_pre_xs');
					$('.tanceng .bj_xs_qddd_xxl').val(dataXQ.address).addClass('c_3');
					$('.tanceng .bj_xs_gurq_xxl').val(dataXQ.deliverydays).addClass('c_3');
					$('.tanceng .bj_xs_kjfp_xxl').val(dataXQ.invoicedays).addClass('c_3');
				} else if(dataXQ.thetype == 2) {
					$('.tanceng .bj_htlxmcs_xxl').val('采购合同').attr('thetype', 2)
					$(".tabcontent[name='ht_muban_termBox']").eq(1).fadeIn(100).siblings(".tabcontent[name='ht_muban_termBox']").hide();
					$('.tanceng .bj_yunlan_btns_xxl').attr('name', 'muban_pre_cg');
					$('.tanceng .bj_cg_qddd_xxl').val(dataXQ.address).addClass('c_3');
					$('.tanceng .bj_cg_ghrq_xxl').val(dataXQ.deliverydays).addClass('c_3');
					$('.tanceng .bj_cg_kjfp_xxl').val(dataXQ.invoicedays).addClass('c_3');
				} else if(dataXQ.thetype == 3) {
					$('.tanceng .bj_htlxmcs_xxl').val('员工合同').attr('thetype', 3)
					$(".tabcontent[name='ht_muban_termBox']").eq(2).fadeIn(100).siblings(".tabcontent[name='ht_muban_termBox']").hide();
					$('.tanceng .bj_yunlan_btns_xxl').attr('name', 'muban_pre_yg');
					$('.tanceng .bj_yg_qddds_xxl').val(dataXQ.address).addClass('c_3');
				} else if(dataXQ.thetype == 4) {
					$('.tanceng .bj_htlxmcs_xxl').val('其他合同').attr('thetype', 4)
					$(".tabcontent[name='ht_muban_termBox']").eq(3).fadeIn(100).siblings(".tabcontent[name='ht_muban_termBox']").hide();
					$('.tanceng .bj_yunlan_btns_xxl').attr('name', 'muban_pre_qt');
					$('.tanceng .bj_qt_qddds_xxl').val(dataXQ.address).addClass('c_3');
				}
				if(dataZDY.length == 0) {
					numB = [];
				} else {
					numB = []
					$.each(dataZDY, function(i, v) {
						numB.push({
							'name': v.name,
							'content': v.content,
							'is_custom': '2',
							'fieldname': 'custom_field'
						})

					});
					var Aatypes = dataXQ.thetype;
					var zdylistss = '';
					if(Aatypes == 1 || Aatypes == 2) {
						$.each(numB, function(i, v) {
							zdylistss += '<li class="ht_mb_term"><div class="t_textinput">';
							zdylistss += '<div class="muban_terms">条款' + (5 + i) + '：<span class="mbbj_tkmcs_xxl">' + numB[i].name + '</span></div><span class="t_right_span val_dialogTop bj_zdy_yulan_btn_xxl" style="right:80px;color:#23a2f3;" name="term_add_zdyyl" lenname = "' + i + '">预览</span>';
							zdylistss += ' <span class="t_right_span val_dialogTop bj_zdy_bj_btnxxl" style="right:40px;color:#f8ac59 ;" name="term_add_zdy" lenname = "' + i + '">编辑</span>';
							zdylistss += '<span class="t_right_span bj_zdy_del_xxlbtn" style="color:#ff6c60;" lenname = "' + i + '">删除</span></div></li>'
						});
					} else if(Aatypes == 3) {
						$.each(numB, function(i, v) {
							zdylistss += '<li class="ht_mb_term"><div class="t_textinput">';
							zdylistss += '<div class="muban_terms">条款' + (3 + i) + '：<span class="mbbj_tkmcs_xxl">' + numB[i].name + '</span></div><span class="t_right_span val_dialogTop bj_zdy_yulan_btn_xxl" style="right:80px;color:#23a2f3;" name="term_add_zdyyl" lenname = "' + i + '">预览</span>';
							zdylistss += ' <span class="t_right_span val_dialogTop bj_zdy_bj_btnxxl" style="right:40px;color:#f8ac59 ;" name="term_add_zdy" lenname = "' + i + '">编辑</span>';
							zdylistss += '<span class="t_right_span but_red bj_zdy_del_xxlbtn" style="color:#ff6c60 ;" lenname = "' + i + '">删除</span></div></li>'
						});
					} else if(Aatypes == 4) {
						$.each(numB, function(i, v) {
							zdylistss += '<li class="ht_mb_term"><div class="t_textinput">';
							zdylistss += '<div class="muban_terms">条款' + (1 + i) + '：<span class="mbbj_tkmcs_xxl">' + numB[i].name + '</span></div><span class="t_right_span val_dialogTop but_blue bj_zdy_yulan_btn_xxl" style="right:80px;color:#23a2f3;" name="term_add_zdyyl" lenname = "' + i + '">预览</span>';
							zdylistss += ' <span class="t_right_span val_dialogTop bj_zdy_bj_btnxxl" style="right:40px;color:#f8ac59 ;" name="term_add_zdy" lenname = "' + i + '">编辑</span>';
							zdylistss += '<span class="t_right_span but_red bj_zdy_del_xxlbtn" style="color:#ff6c60 ;" lenname = "' + i + '">删除</span></div></li>'
						});
					}

					$('.tanceng .bj_zdylists_htmls_xxl').html(zdylistss)
				}

				var Ds = dataXQ.dept.split(','),
					Dm = dataXQ.dept_name.split('、');
				for(var i in Ds) {
					//alert(Ds[i])
					duoxuanBm.push(Ds[i])
					$('.tanceng .mbxj_xzbmlist_xxl li').attr('uid', Ds[i]) //.html('<li uid="' + Ds[i] + '">' ++ '<i></i></li>)
				}
				for(var i in Dm) {
					//alert(Dm[i])
					$('.tanceng .mbxj_xzbmlist_xxl').append('<li>' + Dm[i] + '<i></i></li>')
				}
				//console.log(duoxuanBm)

			}
		},
		error: function(data) {

		}
	});
}
//编辑-预览全部
$('.tanceng .bj_yunlan_btns_xxl').die().live('click', function() {
		var Aatypes = $(this).attr('thetype');
		if(numB.length == 0) {
			return;
		} else {
			var bj_zlshtml = '';
			if(Aatypes == 1) {
				$.each(numB, function(i, v) {
					bj_zlshtml += '<div class="ht_msg"><p>' + intToChinese((i + 5)) + '、' + v.name + '</p><p>' + v.content + '</p></div>';
				});
			} else if(Aatypes == 2) {
				$.each(numB, function(i, v) {
					bj_zlshtml += '<div class="ht_msg"><p>' + intToChinese((i + 5)) + '、' + v.name + '</p><p>' + v.content + '</p></div>';
				});
			} else if(Aatypes == 3) {
				$.each(numB, function(i, v) {
					bj_zlshtml += '<div class="ht_msg"><p>' + intToChinese((i + 3)) + '、' + v.name + '</p><p>' + v.content + '</p></div>';
				});
			} else if(Aatypes == 4) {
				$.each(numB, function(i, v) {
					bj_zlshtml += '<div class="ht_msg"><p>' + intToChinese((i + 1)) + '、' + v.name + '</p><p>' + v.content + '</p></div>';
				});
			}
			$('.tanceng .ht_msg_bottom').before(bj_zlshtml)
		}
	})
	//编辑-自定义添加
	//$('.tanceng .htmb_add_listxxl').live('click', function() {
	//		if($('.tanceng .htmb_val_tkmc_xxl').val() == '' || $('.tanceng .htmb_val_tkmc_xxl').val() == '请输入条款名称') {
	//			alert('请输入条款名称')
	//			return false;
	//		} else if($('.tanceng .htmb_val_tknr_xxl').val() == '' || $('.tanceng .htmb_val_tknr_xxl').val() == '请输入条款内容') {
	//			alert('请输入条款内容')
	//			return false;
	//		}
	//		
	//			//console.log(numa)
	//		$(this).parent().parent().parent().remove();
	//		var num = $('.tanceng').children(".dialog_box").length;
	//		if(num < 1) {
	//			$(".tanceng").hide();
	//		}
	//	})
	//编辑-自定义删除
$('.tanceng .bj_zdy_del_xxlbtn').die().live('click', function() {
		var _index = $(this).attr('lenname')
		numB.splice(_index, 1);
		var zdylist = '';
		var Aatypes = $('.tanceng .bj_htlxmcs_xxl').attr('thetype');
		if(Aatypes == 1 || Aatypes == 2) {
			$.each(numB, function(i, v) {
				zdylist += '<li class="ht_mb_term"><div class="t_textinput">';
				zdylist += '<div class="muban_terms" style="width: 70%;">条款' + (5 + i) + '：<span class="mbbj_tkmcs_xxl">' + numB[i].name + '</span></div><span class="t_right_span val_dialogTop but_blue bj_zdy_yulan_btn_xxl" style="right:120px;" name="term_add_zdyyl" lenname = "' + i + '">预览</span>';
				zdylist += ' <span class="t_right_span val_dialogTop but_yellow bj_zdy_bj_btnxxl" style="right:60px;border-radius: 3px;" name="term_add_zdy" lenname = "' + i + '">编辑</span>';
				zdylist += '<span class="t_right_span but_red bj_zdy_del_xxlbtn" style="border-radius: 3px;" lenname = "' + i + '">删除</span></div></li>'
			});
		} else if(Aatypes == 3) {
			$.each(numB, function(i, v) {
				zdylist += '<li class="ht_mb_term"><div class="t_textinput">';
				zdylist += '<div class="muban_terms" style="width: 70%;">条款' + (3 + i) + '：<span class="mbbj_tkmcs_xxl">' + numB[i].name + '</span></div><span class="t_right_span val_dialogTop but_blue bj_zdy_yulan_btn_xxl" style="right:120px;" name="term_add_zdyyl" lenname = "' + i + '">预览</span>';
				zdylist += ' <span class="t_right_span val_dialogTop but_yellow bj_zdy_bj_btnxxl" style="right:60px;border-radius: 3px;" name="term_add_zdy" lenname = "' + i + '">编辑</span>';
				zdylist += '<span class="t_right_span but_red bj_zdy_del_xxlbtn" style="border-radius: 3px;" lenname = "' + i + '">删除</span></div></li>'
			});
		} else if(Aatypes == 4) {
			$.each(numB, function(i, v) {
				zdylist += '<li class="ht_mb_term"><div class="t_textinput">';
				zdylist += '<div class="muban_terms" style="width: 70%;">条款' + (1 + i) + '：<span class="mbbj_tkmcs_xxl">' + numB[i].name + '</span></div><span class="t_right_span val_dialogTop but_blue bj_zdy_yulan_btn_xxl" style="right:120px;" name="term_add_zdyyl" lenname = "' + i + '">预览</span>';
				zdylist += ' <span class="t_right_span val_dialogTop but_yellow bj_zdy_bj_btnxxl" style="right:60px;border-radius: 3px;" name="term_add_zdy" lenname = "' + i + '">编辑</span>';
				zdylist += '<span class="t_right_span but_red bj_zdy_del_xxlbtn" style="border-radius: 3px;" lenname = "' + i + '">删除</span></div></li>'
			});
		}
		$('.tanceng .bj_zdylists_htmls_xxl').html(zdylist)
			//console.log(numa)
		$(this).parent().parent().remove();

	})
	//编辑 -自定义条款编辑
$('.tanceng .bj_zdy_bj_btnxxl').die().live('click', function() {

		var index = $(this).attr('lenname'),
			html = '',
			nums_bj = '';
		nums_bj = numB[index];
		$('.tanceng .htmb_xjbj_tk_quedbtnxxl').attr({
			'status': 1,
			'lents': index
		})
		html += '<div class="dialog_title"><i class="dialog_close">关闭</i><h3 class="dialog_h3">编辑合同条款</h3></div><div class="dialog_text" style="padding:20px 40px;"><div class="t_textinput"><div class="t_left"><i class="c_r">*</i>条款名称</div>';
		html += '<div class="t_right "><input type="text" class="time_input c_3 mb_xjbjtk_valtit_xxl" value="' + nums_bj.name + '" ></div></div><div class="t_textinput t_textarea"><div class="t_left"><i class="c_r ">*</i>条款内容</div>';
		html += '<div class="t_right ht_mb_right" style="height: 112px;"><textarea class="txt_normal c_3 mb_xjbjtkcont_xxl" >' + nums_bj.content + '</textarea></div></div></div>';
		$('.tanceng .htnb_tjtk_bj_htmlxxl').html(html)
	})
	//$('.tanceng .htmb_xjbj_tk_quedbtnxxl').live('click', function() {
	//		var ins = $(this).attr('lents')
	//			//console.log(ins+':'+$('.tanceng .mb_xjbjtk_valtit_xxl').val())
	//			//console.log($('.tanceng .mb_xjbjtk_valtit_xxl').val()+':'+$('.tanceng .mb_xjbjtkcont_xxl').val())
	//		if($('.tanceng .mb_xjbjtk_valtit_xxl').val() == '') {
	//			alert('请输入条款名称')
	//			return false;
	//		} else if($('.tanceng .mb_xjbjtkcont_xxl').val() == '') {
	//			alert('请输入条款内容')
	//			return false;
	//		}
	//		
	//		$(this).parent().parent().parent().remove();
	//		var num = $('.tanceng').children(".dialog_box").length;
	//		if(num < 1) {
	//			$(".tanceng").hide();
	//		}
	//	})
	//编辑-自定义预览
$('.tanceng .bj_zdy_yulan_btn_xxl').die().live('click', function() {
		//console.log(numa)
		var index = $(this).attr('lenname')
		var html = '';
		var nums_xxl = numB[index]
		var Aatypes = $('.tanceng .bj_listbaoc_btns_xxl').attr('thetype');
		html += '<div class="dialog_screen"></div><div class="dialog_content dialog_content_3" style="height: 340px;"><div class="dialog_title"><i class="dialog_close">关闭</i><h3 class="dialog_h3">预览合同条款</h3></div><div class="dialog_text muban_pre_con" style="padding:20px 40px;">';
		if(Aatypes == 1 || Aatypes == 2) {
			html += '<h2 class="muban_pre_h2">' + intToChinese(parseInt(index) + 5) + '、' + nums_xxl.name + '</h2><div class="ht_msg"><ul class="ht_msg_list">';
		} else if(Aatypes == 3) {
			html += '<h2 class="muban_pre_h2">' + intToChinese(parseInt(index) + 3) + '、' + nums_xxl.name + '</h2><div class="ht_msg"><ul class="ht_msg_list">';
		} else if(Aatypes == 4) {
			html += '<h2 class="muban_pre_h2">' + intToChinese(parseInt(index) + 1) + '、' + nums_xxl.name + '</h2><div class="ht_msg"><ul class="ht_msg_list">';
		}

		html += '<li>' + nums_xxl.content + '</li></ul></div><div class="dialog_submit"><button class="but_small normal_dialog but_blue but_cancel">确定</button><button class="but_small but_cancel">取消</button></div></div></div>';

		$('.tanceng .htmb_zdy_yulan_wu_xxl').html(html)
	})
	//编辑-是否启用合同名称
$('.tanceng .bj_isname_htmb_xxl').die().live('click', function() {
		if($(this).is(':checked') == true) {
			$('.tanceng .bj_mbmcss_xxl').val($('.tanceng .bj_htlxmcs_xxl').val()).attr({
				'disabled': 'disabled',
				'isname': '1'
			}).css('color', '#333')
		} else {
			$('.tanceng .bj_mbmcss_xxl').val($('.tanceng .bj_htlxmcs_xxl').val()).removeAttr('disabled').attr('isname', '0').css('color', '#333')
		}
	})
	//编辑-选择合同类型
$('.tanceng .bj_xzlxs_btns_xxl li').die().live('click', function() {
		$('.tanceng .bj_htlxmcs_xxl').attr('thetype', $(this).attr('thetype'))
		$('.tanceng .bj_mbmcss_xxl').val($(this).html())
		var Aatypes = $('.tanceng .bj_htlxmcs_xxl').attr('thetype');
		if(Aatypes == 1) {
			$('.tanceng .bj_yunlan_btns_xxl').attr('name', 'muban_pre_xs')
		} else if(Aatypes == 2) {
			$('.tanceng .bj_yunlan_btns_xxl').attr('name', 'muban_pre_cg')
		} else if(Aatypes == 3) {
			$('.tanceng .bj_yunlan_btns_xxl').attr('name', 'muban_pre_yg')
		} else if(Aatypes == 4) {
			$('.tanceng .bj_yunlan_btns_xxl').attr('name', 'muban_pre_qt')
		}
		//numa = []
		//console.log(numa)
		var zdylist = '';
		if(Aatypes == 1 || Aatypes == 2) {
			$.each(numB, function(i, v) {
				zdylist += '<li class="ht_mb_term"><div class="t_textinput">';
				zdylist += '<div class="muban_terms" style="width: 70%;">条款' + (5 + i) + '：<span class="mbbj_tkmcs_xxl">' + numB[i].name + '</span></div><span class="t_right_span val_dialogTop but_blue bj_zdy_yulan_btn_xxl" style="right:120px;" name="term_add_zdyyl" lenname = "' + i + '">预览</span>';
				zdylist += ' <span class="t_right_span val_dialogTop but_yellow bj_zdy_bj_btnxxl" style="right:60px;border-radius: 3px;" name="term_add_zdy" lenname = "' + i + '">编辑</span>';
				zdylist += '<span class="t_right_span but_red bj_zdy_del_xxlbtn" style="border-radius: 3px;" lenname = "' + i + '">删除</span></div></li>'
			});
		} else if(Aatypes == 3) {
			$.each(numB, function(i, v) {
				zdylist += '<li class="ht_mb_term"><div class="t_textinput">';
				zdylist += '<div class="muban_terms" style="width: 70%;">条款' + (3 + i) + '：<span class="mbbj_tkmcs_xxl">' + numB[i].name + '</span></div><span class="t_right_span val_dialogTop but_blue bj_zdy_yulan_btn_xxl" style="right:120px;" name="term_add_zdyyl" lenname = "' + i + '">预览</span>';
				zdylist += ' <span class="t_right_span val_dialogTop but_yellow bj_zdy_bj_btnxxl" style="right:60px;border-radius: 3px;" name="term_add_zdy" lenname = "' + i + '">编辑</span>';
				zdylist += '<span class="t_right_span but_red bj_zdy_del_xxlbtn" style="border-radius: 3px;" lenname = "' + i + '">删除</span></div></li>'
			});
		} else if(Aatypes == 4) {
			$.each(numB, function(i, v) {
				zdylist += '<li class="ht_mb_term"><div class="t_textinput">';
				zdylist += '<div class="muban_terms" style="width: 70%;">条款' + (1 + i) + '：<span class="mbbj_tkmcs_xxl">' + numB[i].name + '</span></div><span class="t_right_span val_dialogTop but_blue bj_zdy_yulan_btn_xxl" style="right:120px;" name="term_add_zdyyl" lenname = "' + i + '">预览</span>';
				zdylist += ' <span class="t_right_span val_dialogTop but_yellow bj_zdy_bj_btnxxl" style="right:60px;border-radius: 3px;" name="term_add_zdy" lenname = "' + i + '">编辑</span>';
				zdylist += '<span class="t_right_span but_red bj_zdy_del_xxlbtn" style="border-radius: 3px;" lenname = "' + i + '">删除</span></div></li>'
			});
		}

		$('.tanceng .bj_zdylists_htmls_xxl').html(zdylist)
	})
	//编辑-保存
$('.tanceng .bj_listbaoc_btns_xxl').die().live('click', function() {
		//console.log($('.tanceng .muban_radio input:radio[name="aa"]:checked').attr('status'))
		//console.log($(this).attr('uid'))	
		xinjian_mb_xxl_data.id = $(this).attr('uid');
		xinjian_mb_xxl_data.thetype = $(this).attr('thetype');
		xinjian_mb_xxl_data.name = $('.tanceng .bj_mbmcss_xxl').val();
		xinjian_mb_xxl_data.status = $('.tanceng .muban_radio input:radio[name="aa"]:checked').attr('status');
		//xinjian_mb_xxl_data.is_name = $('.tanceng .bj_mbmcss_xxl').attr('isname');
		var Aatypes = $(this).attr('thetype');
		if(Aatypes == 1) {
			if($('.tanceng .bj_xs_qddd_xxl').val() == '请输入签订地点') {
				$('.tanceng .bj_xs_qddd_xxl').val('')
			}
			if($('.tanceng .bj_xs_gurq_xxl').val() == '') {
				$('.tanceng .bj_xs_gurq_xxl').val('0')
			}
			if($('.tanceng .bj_xs_kjfp_xxl').val() == '') {
				$('.tanceng .bj_xs_kjfp_xxl').val('0')
			}
			xinjian_mb_xxl_data.address = $('.tanceng .bj_xs_qddd_xxl').val()
			xinjian_mb_xxl_data.deliverydays = $('.tanceng .bj_xs_gurq_xxl').val()
			xinjian_mb_xxl_data.invoicedays = $('.tanceng .bj_xs_kjfp_xxl').val()
			xinjian_mb_xxl_data.custom = numB;
		} else if(Aatypes == 2) {
			if($('.tanceng .bj_cg_qddd_xxl').val() == '请输入签订地点') {
				$('.tanceng .bj_cg_qddd_xxl').val('')
			}
			if($('.tanceng .bj_cg_ghrq_xxl').val() == '') {
				$('.tanceng .bj_cg_ghrq_xxl').val('0')
			}
			if($('.tanceng .bj_cg_kjfp_xxl').val() == '') {
				$('.tanceng .bj_cg_kjfp_xxl').val('0')
			}
			xinjian_mb_xxl_data.address = $('.tanceng .bj_cg_qddd_xxl').val()
			xinjian_mb_xxl_data.deliverydays = $('.tanceng .bj_cg_ghrq_xxl').val()
			xinjian_mb_xxl_data.invoicedays = $('.tanceng .bj_cg_kjfp_xxl').val()
			xinjian_mb_xxl_data.custom = numB;
		} else if(Aatypes == 3) {
			if($('.tanceng .bj_yg_qddds_xxl').val() == '' || $('.tanceng .bj_yg_qddds_xxl').val() == '请输入签订地点') {
				$('.tanceng .bj_yg_qddds_xxl').val('')
			}
			xinjian_mb_xxl_data.address = $('.tanceng .bj_yg_qddds_xxl').val()
			xinjian_mb_xxl_data.custom = numB;
		} else if(Aatypes == 4) {
			if($('.tanceng .bj_qt_qddds_xxl').val() == '' || $('.tanceng .bj_qt_qddds_xxl').val() == '请输入签订地点') {
				$('.tanceng .bj_qt_qddds_xxl').val('')
			}
			xinjian_mb_xxl_data.address = $('.tanceng .bj_qt_qddds_xxl').val()
			xinjian_mb_xxl_data.custom = numB;
		}
		if($('.tanceng .mbxj_xzbmlist_xxl').children('li').length == 0) {
			alert('请选择部门')
			return false;
		} else {
			var bmss = [];
			$.each($('.tanceng .mbxj_xzbmlist_xxl li[uid]'), function(i, v) {
				bmss.push($(this).attr('uid'))
			});
		}
		xinjian_mb_xxl_data.dept = bmss.join();
		//console.log(xinjian_mb_xxl_data)
		baocun_xjmb_ajax()
		$(this).parent().parent().parent().parent().parent().parent().remove();
		var num = $('.tanceng').children(".dialog_box").length;
		if(num < 1) {
			$(".tanceng").hide();
		};

	})
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
//新建模板合同
var xinjian_mb_xxl_data = {
	token: token,
	id: '0', //0添加大于0为修改
	thetype: '', //合同类型 1销售合同2采购合同3员工合同4其他合同
	name: '', //模板名称
	status: '', //是否启用模板0启用1停用
	address: '', //签订地点
	deliverydays: '0', //供货日期多少天
	invoicedays: '0', //开发票多少天
	dept: '', //部门多个 英文逗号隔开
	custom: [] //自定义条款 可以多个
}
//is_name: '', //是否启用合同名称0不启用1启用
$('.tanceng .htmb_lxlist_xxl_xj li').die().live('click', function() {
	$('.tanceng .htmb_xj_htlx_xxl').attr('thetype', $(this).attr('thetype')).val($(this).html()).addClass('c_3')
	$('.tanceng .htmb_mbmc_xxl').val($(this).html()).addClass('c_3')
	var Aatype = $('.tanceng .htmb_xj_htlx_xxl').attr('thetype');
	if(Aatype == 1) {
		$('.tanceng .htmb_xj_yunlan_btn_xxl').attr('name', 'muban_pre_xs')
	} else if(Aatype == 2) {
		$('.tanceng .htmb_xj_yunlan_btn_xxl').attr('name', 'muban_pre_cg')
	} else if(Aatype == 3) {
		$('.tanceng .htmb_xj_yunlan_btn_xxl').attr('name', 'muban_pre_yg')
	} else if(Aatype == 4) {
		$('.tanceng .htmb_xj_yunlan_btn_xxl').attr('name', 'muban_pre_qt')
	}
	numa = []
		//console.log(numa)
	var zdylist = '';
	if(Aatype == 1 || Aatype == 2) {
		$.each(numa, function(i, v) {
			zdylist += '<li class="ht_mb_term"><div class="t_textinput">';
			zdylist += '<div class="muban_terms" style="width: 70%;">条款' + (5 + i) + '：<span class="mbbj_tkmcs_xxl">' + numa[i].name + '</span></div><span class="t_right_span val_dialogTop but_blue htmb_zdybtn_xxl" style="right:120px;" name="term_add_zdyyl" lenname = "' + i + '">预览</span>';
			zdylist += ' <span class="t_right_span val_dialogTop but_yellow htmb_xj_tiaokuan_bj_btnxxl" style="right:60px;border-radius: 3px;" name="term_add_zdy" lenname = "' + i + '">编辑</span>';
			zdylist += '<span class="t_right_span but_red htmb_xj_tiaokuan_scbtn_xxl" style="border-radius: 3px;" lenname = "' + i + '">删除</span></div></li>'
		});
	} else if(Aatype == 3) {
		$.each(numa, function(i, v) {
			zdylist += '<li class="ht_mb_term"><div class="t_textinput">';
			zdylist += '<div class="muban_terms" style="width: 70%;">条款' + (3 + i) + '：<span class="mbbj_tkmcs_xxl">' + numa[i].name + '</span></div><span class="t_right_span val_dialogTop but_blue htmb_zdybtn_xxl" style="right:120px;" name="term_add_zdyyl" lenname = "' + i + '">预览</span>';
			zdylist += ' <span class="t_right_span val_dialogTop but_yellow htmb_xj_tiaokuan_bj_btnxxl" style="right:60px;border-radius: 3px;" name="term_add_zdy" lenname = "' + i + '">编辑</span>';
			zdylist += '<span class="t_right_span but_red htmb_xj_tiaokuan_scbtn_xxl" style="border-radius: 3px;" lenname = "' + i + '">删除</span></div></li>'
		});
	} else if(Aatype == 4) {
		$.each(numa, function(i, v) {
			zdylist += '<li class="ht_mb_term"><div class="t_textinput">';
			zdylist += '<div class="muban_terms" style="width: 70%;">条款' + (1 + i) + '：<span class="mbbj_tkmcs_xxl">' + numa[i].name + '</span></div><span class="t_right_span val_dialogTop but_blue htmb_zdybtn_xxl" style="right:120px;" name="term_add_zdyyl" lenname = "' + i + '">预览</span>';
			zdylist += ' <span class="t_right_span val_dialogTop but_yellow htmb_xj_tiaokuan_bj_btnxxl" style="right:60px;border-radius: 3px;" name="term_add_zdy" lenname = "' + i + '">编辑</span>';
			zdylist += '<span class="t_right_span but_red htmb_xj_tiaokuan_scbtn_xxl" style="border-radius: 3px;" lenname = "' + i + '">删除</span></div></li>'
		});
	}

	$('.tanceng .htmb_zdy_list_html_xxl').html(zdylist)
})

$('.tanceng .htmb_status_xxl').die().live('click', function() {
		if($(this).is(':checked') == true) {
			$('.tanceng .htmb_mbmc_xxl').val($('.htmb_xj_htlx_xxl').val()).attr({
				'disabled': 'disabled',
				'isname': '1'
			}).css('color', '#333')
		} else {
			$('.tanceng .htmb_mbmc_xxl').val($('.htmb_xj_htlx_xxl').val()).removeAttr('disabled').attr('isname', '0').css('color', '#333')
		}
	})
	//销售合同条款添加
$('.tanceng .xj_tjhttk_btn_xxlB').die().live('click', function() {
	$('.tanceng .htmb_add_listxxl').attr('status', 1)
})
$('.tanceng .xj_tjhttk_btn_xxlA').die().live('click', function() {
	$('.tanceng .htmb_add_listxxl').attr('status', 0)
})
var numa = [];
var strcs = '';
$('.tanceng .htmb_add_listxxl').die().live('click', function() {
		strcs = '';
		if($('.tanceng .htmb_val_tkmc_xxl').val() == '' || $('.tanceng .htmb_val_tkmc_xxl').val() == '请输入条款名称') {
			alert('请输入条款名称')
			return false;
		} else if($('.tanceng .htmb_val_tknr_xxl').val() == '' || $('.tanceng .htmb_val_tknr_xxl').val() == '请输入条款内容') {
			alert('请输入条款内容')
			return false;
		}
		//console.log($('.tanceng .htmb_val_tkmc_xxl').val(),$('.tanceng .htmb_val_tknr_xxl').val())
		strcs = $('.tanceng .htmb_val_tknr_xxl').val();
		//strcs.replace(/\s+/g,'<br/>');
		if($(this).attr('status') == 0) {
			numa.push({
				'name': $('.tanceng .htmb_val_tkmc_xxl').val(),
				'content': strcs.replace(/\s+/g,'<br/>'),//strcs.replace(/\s+/g,'<br/>')
				'is_custom': '2',
				'fieldname': 'custom_field'
			})
			var Aatype = $('.tanceng .xj_tjhttk_btn_xxlA').attr('thetype');
			var zdylist = '';
			if(Aatype == 1 || Aatype == 2) {
				$.each(numa, function(i, v) {
					zdylist += '<li class="ht_mb_term"><div class="t_textinput">';
					zdylist += '<div class="muban_terms"><span class="mbbj_tkmcs_xxl">条款<span>'+(5+i)+'</span>:' + numa[i].name + '</span></div><span class="t_right_span val_dialogTop htmb_zdybtn_xxl" style="color:#23a2f3;right:80px;" name="term_add_zdyyl" lenname = "' + i + '">预览</span>';
					zdylist += ' <span class="t_right_span val_dialogTop htmb_xj_tiaokuan_bj_btnxxl" style="color:#f8ac59;right:40px;" name="term_add_zdy" lenname = "' + i + '">编辑</span>';
					zdylist += '<span class="t_right_span htmb_xj_tiaokuan_scbtn_xxl" style="color:#ff6c60;" lenname = "' + i + '">删除</span></div></li>'
				});
			} else if(Aatype == 3) {
				$.each(numa, function(i, v) {
					zdylist += '<li class="ht_mb_term"><div class="t_textinput">';
					zdylist += '<div class="muban_terms"><span class="mbbj_tkmcs_xxl">条款<span>'+(3+i)+'</span>:' + numa[i].name + '</span></div><span class="t_right_span val_dialogTop htmb_zdybtn_xxl" style="right:80px;color:#23a2f3;" name="term_add_zdyyl" lenname = "' + i + '">预览</span>';
					zdylist += ' <span class="t_right_span val_dialogTop htmb_xj_tiaokuan_bj_btnxxl" style="right:40px;color:#f8ac59;" name="term_add_zdy" lenname = "' + i + '">编辑</span>';
					zdylist += '<span class="t_right_span htmb_xj_tiaokuan_scbtn_xxl" style="color:#ff6c60;" lenname = "' + i + '">删除</span></div></li>'
				});
			} else if(Aatype == 4) {
				$.each(numa, function(i, v) {
					zdylist += '<li class="ht_mb_term"><div class="t_textinput">';
					zdylist += '<div class="muban_terms" ><span class="mbbj_tkmcs_xxl">条款<span>'+(1+i)+'</span>:' + numa[i].name + '</span></div><span class="t_right_span val_dialogTop htmb_zdybtn_xxl" style="right:80px;color:#23a2f3;" name="term_add_zdyyl" lenname = "' + i + '">预览</span>';
					zdylist += ' <span class="t_right_span val_dialogTop htmb_xj_tiaokuan_bj_btnxxl" style="right:40px;color: #f8ac59;" name="term_add_zdy" lenname = "' + i + '">编辑</span>';
					zdylist += '<span class="t_right_span htmb_xj_tiaokuan_scbtn_xxl" style="color:#ff6c60;" lenname = "' + i + '">删除</span></div></li>'
				});
			}

			$('.tanceng .htmb_zdy_list_html_xxl').html(zdylist)
		} else {
			numB.push({
				'name': $('.tanceng .htmb_val_tkmc_xxl').val(),
				'content': strcs.replace(/\s+/g,'<br/>'),
				'is_custom': '2',
				'fieldname': 'custom_field'
			})
			var Aatypes = $('.tanceng .bj_listbaoc_btns_xxl').attr('thetype');
			var zdylist = '';
			if(Aatypes == 1 || Aatypes == 2) {
				$.each(numB, function(i, v) {
					zdylist += '<li class="ht_mb_term"><div class="t_textinput">';
					zdylist += '<div class="muban_terms"><span class="mbbj_tkmcs_xxl">条款<span>'+(5+i)+'</span>:' + numB[i].name + '</span></div><span class="t_right_span val_dialogTop bj_zdy_yulan_btn_xxl" style="right:80px;color:#23a2f3;" name="term_add_zdyyl" lenname = "' + i + '">预览</span>';
					zdylist += ' <span class="t_right_span val_dialogTop bj_zdy_bj_btnxxl" style="right:40px;color:#f8ac59;" name="term_add_zdy" lenname = "' + i + '">编辑</span>';
					zdylist += '<span class="t_right_span bj_zdy_del_xxlbtn" style="color:#ff6c60;" lenname = "' + i + '">删除</span></div></li>'
				});
			} else if(Aatypes == 3) {
				$.each(numB, function(i, v) {
					zdylist += '<li class="ht_mb_term"><div class="t_textinput">';
					zdylist += '<div class="muban_terms"><span class="mbbj_tkmcs_xxl">条款<span>'+(3+i)+'</span>:' + numB[i].name + '</span></div><span class="t_right_span val_dialogTop bj_zdy_yulan_btn_xxl" style="right:80px;color:#23a2f3;" name="term_add_zdyyl" lenname = "' + i + '">预览</span>';
					zdylist += ' <span class="t_right_span val_dialogTop bj_zdy_bj_btnxxl" style="right:40px;color:#f8ac59;" name="term_add_zdy" lenname = "' + i + '">编辑</span>';
					zdylist += '<span class="t_right_span bj_zdy_del_xxlbtn" style="color:#ff6c60 ;" lenname = "' + i + '">删除</span></div></li>'
				});
			} else if(Aatypes == 4) {
				$.each(numB, function(i, v) {
					zdylist += '<li class="ht_mb_term"><div class="t_textinput">';
					zdylist += '<div class="muban_terms"><span class="mbbj_tkmcs_xxl">条款<span>'+(1+i)+'</span>:' + numB[i].name + '</span></div><span class="t_right_span val_dialogTop bj_zdy_yulan_btn_xxl" style="right:80px;color:#23a2f3;" name="term_add_zdyyl" lenname = "' + i + '">预览</span>';
					zdylist += ' <span class="t_right_span val_dialogTop bj_zdy_bj_btnxxl" style="right:40px;color:#f8ac59;" name="term_add_zdy" lenname = "' + i + '">编辑</span>';
					zdylist += '<span class="t_right_span bj_zdy_del_xxlbtn" style="color:#ff6c60;" lenname = "' + i + '">删除</span></div></li>'
				});
			}

			$('.tanceng .bj_zdylists_htmls_xxl').html(zdylist)
		}

		//console.log(numa)
		$(this).parent().parent().parent().remove();
		var num = $('.tanceng').children(".dialog_box").length;
		if(num < 1) {
			$(".tanceng").hide();
		}
		
		
	})
	//合同条款预览
$('.tanceng .htmb_zdybtn_xxl').die().live('click', function() {
		//console.log(numa)
		var index = $(this).attr('lenname')
		var html = '';
		var nums_xxl = numa[index];
		var Aatype = $('.tanceng .xj_tjhttk_btn_xxlA').attr('thetype');
		html += '<div class="dialog_screen"></div><div class="dialog_content dialog_content_3" style="height: 340px;"><div class="dialog_title"><i class="dialog_close">关闭</i><h3 class="dialog_h3">预览合同条款</h3></div><div class="dialog_text muban_pre_con" style="padding:20px 40px;">';
		if(Aatype == 1 || Aatype == 2) {
			html += '<h2 class="muban_pre_h2">' + intToChinese(parseInt(index) + 5) + '、' + nums_xxl.name + '</h2><div class="ht_msg" style="margin-bottom:100px"><ul class="ht_msg_list">';
		} else if(Aatype == 3) {
			html += '<h2 class="muban_pre_h2">' + intToChinese(parseInt(index) + 3) + '、' + nums_xxl.name + '</h2><div class="ht_msg" style="margin-bottom:100px"><ul class="ht_msg_list">';
		} else if(Aatype == 4) {
			html += '<h2 class="muban_pre_h2">' + intToChinese(parseInt(index) + 1) + '、' + nums_xxl.name + '</h2><div class="ht_msg" style="margin-bottom:100px"><ul class="ht_msg_list">';
		}
		//strcs.replace(/\s+/g,'<br/>')
		//console.log(nums_xxl.content.replace(/\s+/g,'<br/>'))
		html += '<li>' + nums_xxl.content.replace(/\s+/g,'<br/>') + '</li></ul></div></div><div class="dialog_submit"><button class="but_small normal_dialog but_blue but_cancel">确定</button><button class="but_small but_cancel">取消</button></div></div>';

		$('.tanceng .htmb_zdy_yulan_wu_xxl').html(html)
	})
	//合同条款编辑
$('.tanceng .htmb_xj_tiaokuan_bj_btnxxl').die().live('click', function() {

	var index = $(this).attr('lenname'),
		html = '',
		nums_bj = '';
	nums_bj = numa[index];
	$('.tanceng .htmb_xjbj_tk_quedbtnxxl').attr({
		'status': 0,
		'lents': index
	})
	html += '<div class="dialog_title"><i class="dialog_close">关闭</i><h3 class="dialog_h3">编辑合同条款</h3></div><div class="dialog_text" style="padding:20px 40px;"><div class="t_textinput"><div class="t_left"><i class="c_r">*</i>条款名称</div>';
	html += '<div class="t_right "><input type="text" class="time_input c_3 mb_xjbjtk_valtit_xxl" value="' + nums_bj.name + '" ></div></div><div class="t_textinput t_textarea"><div class="t_left"><i class="c_r ">*</i>条款内容</div>';
	html += '<div class="t_right ht_mb_right" style="height: 112px;"><textarea class="txt_normal c_3 mb_xjbjtkcont_xxl" >' + nums_bj.content + '</textarea></div></div></div>';
	$('.tanceng .htnb_tjtk_bj_htmlxxl').html(html)
})
$('.tanceng .htmb_xjbj_tk_quedbtnxxl').die().live('click', function() {
		var ins = $(this).attr('lents')
			//console.log(ins+':'+$('.tanceng .mb_xjbjtk_valtit_xxl').val())
			//console.log($('.tanceng .mb_xjbjtk_valtit_xxl').val()+':'+$('.tanceng .mb_xjbjtkcont_xxl').val())
		if($('.tanceng .mb_xjbjtk_valtit_xxl').val() == '') {
			alert('请输入条款名称')
			return false;
		} else if($('.tanceng .mb_xjbjtkcont_xxl').val() == '') {
			alert('请输入条款内容')
			return false;
		}
		if($(this).attr('status') == 0) {
			numa[ins].name = $('.tanceng .mb_xjbjtk_valtit_xxl').val();
			numa[ins].content = $('.tanceng .mb_xjbjtkcont_xxl').val()
			var Aatype = $('.tanceng .xj_tjhttk_btn_xxlA').attr('thetype');
			var zdylist = '';
			if(Aatype == 1 || Aatype == 2) {
				$.each(numa, function(i, v) {
					zdylist += '<li class="ht_mb_term"><div class="t_textinput">';
					zdylist += '<div class="muban_terms"><span class="mbbj_tkmcs_xxl">条款<span>'+(5+i)+'</span>:' + numa[i].name + '</span></div><span class="t_right_span val_dialogTop htmb_zdybtn_xxl" style="right:80px;color:#23a2f3;" name="term_add_zdyyl" lenname = "' + i + '">预览</span>';
					zdylist += ' <span class="t_right_span val_dialogTop htmb_xj_tiaokuan_bj_btnxxl" style="right:40px;color:#f8ac59 ;" name="term_add_zdy" lenname = "' + i + '">编辑</span>';
					zdylist += '<span class="t_right_span htmb_xj_tiaokuan_scbtn_xxl" style="color:#ff6c60 ;" lenname = "' + i + '">删除</span></div></li>'
				});
			} else if(Aatype == 3) {
				$.each(numa, function(i, v) {
					zdylist += '<li class="ht_mb_term"><div class="t_textinput">';
					zdylist += '<div class="muban_terms"><span class="mbbj_tkmcs_xxl">条款<span>'+(3+i)+'</span>:' + numa[i].name + '</span></div><span class="t_right_span val_dialogTop htmb_zdybtn_xxl" style="right:80px;color:#23a2f3;" name="term_add_zdyyl" lenname = "' + i + '">预览</span>';
					zdylist += ' <span class="t_right_span val_dialogTop htmb_xj_tiaokuan_bj_btnxxl" style="right:40px;color: #f8ac59;" name="term_add_zdy" lenname = "' + i + '">编辑</span>';
					zdylist += '<span class="t_right_span htmb_xj_tiaokuan_scbtn_xxl" style="color:#ff6c60 ;" lenname = "' + i + '">删除</span></div></li>'
				});
			} else if(Aatype == 4) {
				$.each(numa, function(i, v) {
					zdylist += '<li class="ht_mb_term"><div class="t_textinput">';
					zdylist += '<div class="muban_terms"><span class="mbbj_tkmcs_xxl">条款<span>'+(1+i)+'</span>:' + numa[i].name + '</span></div><span class="t_right_span val_dialogTop htmb_zdybtn_xxl" style="right:80px;color:#23a2f3;" name="term_add_zdyyl" lenname = "' + i + '">预览</span>';
					zdylist += ' <span class="t_right_span val_dialogTop htmb_xj_tiaokuan_bj_btnxxl" style="right:40px;color: #f8ac59;" name="term_add_zdy" lenname = "' + i + '">编辑</span>';
					zdylist += '<span class="t_right_span htmb_xj_tiaokuan_scbtn_xxl" style="color:#ff6c60 ;" lenname = "' + i + '">删除</span></div></li>'
				});
			}
			$('.tanceng .htmb_zdy_list_html_xxl').html(zdylist)
		} else {
			numB[ins].name = $('.tanceng .mb_xjbjtk_valtit_xxl').val();
			numB[ins].content =$('.tanceng .mb_xjbjtkcont_xxl').val();
			var Aatypes = $('.tanceng .bj_listbaoc_btns_xxl').attr('thetype');
			var zdylist = '';
			if(Aatypes == 1 || Aatypes == 2) {
				$.each(numB, function(i, v) {
					zdylist += '<li class="ht_mb_term"><div class="t_textinput">';
					zdylist += '<div class="muban_terms">条款' + (5 + i) + '：<span class="mbbj_tkmcs_xxl">' + numB[i].name + '</span></div><span class="t_right_span val_dialogTop bj_zdy_yulan_btn_xxl" style="right:80px;color:#23a2f3;" name="term_add_zdyyl" lenname = "' + i + '">预览</span>';
					zdylist += ' <span class="t_right_span val_dialogTop bj_zdy_bj_btnxxl" style="right:40px;color:#f8ac59 ;" name="term_add_zdy" lenname = "' + i + '">编辑</span>';
					zdylist += '<span class="t_right_span bj_zdy_del_xxlbtn" style="color:#ff6c60 ;" lenname = "' + i + '">删除</span></div></li>'
				});
			} else if(Aatypes == 3) {
				$.each(numB, function(i, v) {
					zdylist += '<li class="ht_mb_term"><div class="t_textinput">';
					zdylist += '<div class="muban_terms">条款' + (3 + i) + '：<span class="mbbj_tkmcs_xxl">' + numB[i].name + '</span></div><span class="t_right_span val_dialogTop bj_zdy_yulan_btn_xxl" style="right:80px;color:#23a2f3;" name="term_add_zdyyl" lenname = "' + i + '">预览</span>';
					zdylist += ' <span class="t_right_span val_dialogTop bj_zdy_bj_btnxxl" style="right:40px;color:#f8ac59 ;" name="term_add_zdy" lenname = "' + i + '">编辑</span>';
					zdylist += '<span class="t_right_span bj_zdy_del_xxlbtn" style="color:#ff6c60 ;" lenname = "' + i + '">删除</span></div></li>'
				});
			} else if(Aatypes == 4) {
				$.each(numB, function(i, v) {
					zdylist += '<li class="ht_mb_term"><div class="t_textinput">';
					zdylist += '<div class="muban_terms">条款' + (1 + i) + '：<span class="mbbj_tkmcs_xxl">' + numB[i].name + '</span></div><span class="t_right_span val_dialogTop but_blue bj_zdy_yulan_btn_xxl" style="right:80px;color:#23a2f3;" name="term_add_zdyyl" lenname = "' + i + '">预览</span>';
					zdylist += ' <span class="t_right_span val_dialogTop bj_zdy_bj_btnxxl" style="right:40px;color:#f8ac59 ;" name="term_add_zdy" lenname = "' + i + '">编辑</span>';
					zdylist += '<span class="t_right_span but_red bj_zdy_del_xxlbtn" style="color:#ff6c60 ;" lenname = "' + i + '">删除</span></div></li>'
				});
			}
			$('.tanceng .bj_zdylists_htmls_xxl').html(zdylist)
		}

		$(this).parent().parent().parent().remove();
		var num = $('.tanceng').children(".dialog_box").length;
		if(num < 1) {
			$(".tanceng").hide();
		}
	})
	//合同条款删除
$('.tanceng .htmb_xj_tiaokuan_scbtn_xxl').die().live('click', function() {
	var _index = $(this).attr('lenname')
	numa.splice(_index, 1);
	var zdylist = '';
	var Aatype = $('.tanceng .xj_tjhttk_btn_xxlA').attr('thetype');
	if(Aatype == 1 || Aatype == 2) {
		$.each(numa, function(i, v) {
			zdylist += '<li class="ht_mb_term"><div class="t_textinput">';
			zdylist += '<div class="muban_terms">条款' + (5 + i) + '：<span class="mbbj_tkmcs_xxl">' + numa[i].name + '</span></div><span class="t_right_span val_dialogTop htmb_zdybtn_xxl" style="right:80px;color:#23a2f3;" name="term_add_zdyyl" lenname = "' + i + '">预览</span>';
			zdylist += ' <span class="t_right_span val_dialogTop htmb_xj_tiaokuan_bj_btnxxl" style="right:40px;color:#f8ac59 ;" name="term_add_zdy" lenname = "' + i + '">编辑</span>';
			zdylist += '<span class="t_right_span htmb_xj_tiaokuan_scbtn_xxl" style="color:#ff6c60;" lenname = "' + i + '">删除</span></div></li>'
		});
	} else if(Aatype == 3) {
		$.each(numa, function(i, v) {
			zdylist += '<li class="ht_mb_term"><div class="t_textinput">';
			zdylist += '<div class="muban_terms">条款' + (3 + i) + '：<span class="mbbj_tkmcs_xxl">' + numa[i].name + '</span></div><span class="t_right_span val_dialogTop htmb_zdybtn_xxl" style="right:80px;color:#23a2f3;" name="term_add_zdyyl" lenname = "' + i + '">预览</span>';
			zdylist += ' <span class="t_right_span val_dialogTop but_yellow htmb_xj_tiaokuan_bj_btnxxl" style="right:40px;color:#f8ac59 ;" name="term_add_zdy" lenname = "' + i + '">编辑</span>';
			zdylist += '<span class="t_right_span but_red htmb_xj_tiaokuan_scbtn_xxl" style="color: #ff6c60;" lenname = "' + i + '">删除</span></div></li>'
		});
	} else if(Aatype == 4) {
		$.each(numa, function(i, v) {
			zdylist += '<li class="ht_mb_term"><div class="t_textinput">';
			zdylist += '<div class="muban_terms">条款' + (1 + i) + '：<span class="mbbj_tkmcs_xxl">' + numa[i].name + '</span></div><span class="t_right_span val_dialogTop htmb_zdybtn_xxl" style="right:80px;color:#23a2f3;" name="term_add_zdyyl" lenname = "' + i + '">预览</span>';
			zdylist += ' <span class="t_right_span val_dialogTop htmb_xj_tiaokuan_bj_btnxxl" style="right:40px;color:#f8ac59 ;" name="term_add_zdy" lenname = "' + i + '">编辑</span>';
			zdylist += '<span class="t_right_span htmb_xj_tiaokuan_scbtn_xxl" style="color:#ff6c60 ;" lenname = "' + i + '">删除</span></div></li>'
		});
	}
	$('.tanceng .htmb_zdy_list_html_xxl').html(zdylist)
		//console.log(numa)
	$(this).parent().parent().remove();

})

function baocun_xjmb_ajax() {
	$.ajax({
		type: "post",
		url: SERVER_URL + "contract-template/add",
		data: xinjian_mb_xxl_data,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg)
			} else {
				console.log(data)
				numa = []
				duoxuanBm = []
				moban_ajax_list()
				//console.log(numB)
			}
		},
		error: function(data) {
			console.log(data)
		}
	});
}
//多选部门
//	dialog tree list choose dept  选择部门  多选
function tree_list_choose_dept(datalist, deep) {
	var html = '';
	$.each(datalist, function(index, data) {
		var html_i_list_before = '<i class="list_before_span"></i>';
		html += '<ul class="ul1">';
		for(var j = 0; j < deep; j++) {
			html_i_list_before += '<i class="list_before_span"></i>'
		}
		html += '<li class="left_1" deptchosenid = "' + data["id"] + '">' + html_i_list_before + '<span class="icon_open change_ba"></span><span class="icon_file"></span><span class="list_msg">' + data['name'] + '</span><span class="list_check"><em></em></span></li>';
		if(data['children'] && data['children'].length > 0) {
			html += tree_list_choose_dept(data['children'], deep + 1);
		}
		html += '</ul>';
	});
	return html
}
function bumen_list_ajax(){
	$.ajax({
	type: "get",
	url: SERVER_URL + "/dept/list",
	data: {
		token: token
	},
	dataType: 'json',
	success: function(data) {
		if(data.code != 0) {
			console.log(data.msg)
		} else {
			console.log(data)
			var deep = 0;
			$('.mb_xj_dxbm_list_xxl').html(tree_list_choose_dept(data.rows, deep));
			 // 所有分类图标样式控制
                if ($('.mb_xj_dxbm_list_xxl').children().length == 0) {
                    $('li.left_all span.icon_open').addClass('personOth')
                }
                // 下级部门样式控制
                for (var i = 0, liLeft1 = $('.tanceng .mb_xj_dxbm_list_xxl li.left_1').length; i < liLeft1; i++) {
                    if ($('.tanceng .mb_xj_dxbm_list_xxl li.left_1').eq(i).next('ul').length == 0) {
                        $('.tanceng .mb_xj_dxbm_list_xxl li.left_1').eq(i).find('span.icon_open').addClass('personOth');
                        $('.tanceng .mb_xj_dxbm_list_xxl li.left_1').eq(i).find('span.personOth').closest('li').addClass('deptChild')
                    }else{
                    	$('.tanceng .mb_xj_dxbm_list_xxl li.left_1').eq(i).addClass('deptChild')
                    }
                }
                 //选择部门左侧选择
                 $('.tanceng .left_all').die().live('click',function(){
                 	$(this).toggle(function(){
                 		$(this).find('em').addClass('on');
                 		var listhtmlall = '';
                 		$('.tanceng .mb_xj_dxbm_list_xxl').find('li.deptChild').each(function(i,v){
                 			listhtmlall +='<li uid="' + $(this).attr('deptchosenid') + '"><span>' + $(this).children('.list_msg').html() + '</span><i class="list_choose_delete"></i></li>';
                 			$(this).find('span.list_check em').addClass('on');
                 		})
                 		$('.tanceng .mbxj_duoxuan_bm_xxllist').html(listhtmlall)
                 		$('.tanceng .mb_xj_dxbm_list_xxl').css('display','none')
                 },function(){
                 	$(this).find('em').removeClass('on');
                 	$('.tanceng .mbxj_duoxuan_bm_xxllist').html('')
                 	$('.tanceng .mb_xj_dxbm_list_xxl').css('display','block')
                 	$('.tanceng .mb_xj_dxbm_list_xxl').find('li.deptChild').each(function(i,v){
                 		$(this).find('span.list_check em').removeClass('on');
                 	})
                 })
                 	$(this).trigger('click');
                 })
                 
                $('.tanceng .mb_xj_dxbm_list_xxl ul .deptChild').die('click').live('click', function () {
                    if ($(this).find('em').hasClass('on')) {
                    	if($(this).parent('ul').children('ul').length==0){
                    		$('.tanceng .mbxj_duoxuan_bm_xxllist').find('li[uid=' + $(this).attr('deptchosenid') + ']').remove();
                        	$(this).find('span.list_check em').removeClass('on');
                    	}else{
                    		var arr = [];
                    		$('.tanceng .mbxj_duoxuan_bm_xxllist').find('li[uid=' + $(this).attr('deptchosenid') + ']').remove();
                    		$(this).find('span.list_check em').removeClass('on');
                    		$(this).parent('ul').children('ul').each(function(i,v){
                    			arr.push($(this).children('li.deptChild').attr('deptchosenid'))	
                    			$(this).find('span.list_check em').removeClass('on');
                    		})
                    		$('.tanceng .mbxj_duoxuan_bm_xxllist').children().each(function(i,v){
                    			if($.inArray($(this).attr('uid'), arr)!=-1){
                    				$(this).remove();
                    			}
                    		})
                    	}
                        
                    } else {
                    	if($(this).parent('ul').children('ul').length==0){
                    		$('.tanceng .mbxj_duoxuan_bm_xxllist').append('<li uid="' + $(this).attr('deptchosenid') + '"><span>' + $(this).children('.list_msg').html() + '</span><i class="list_choose_delete"></i></li>');
                        $(this).find('span.list_check em').addClass('on');
                    	}else{
                    		var listhtml = '',zjlist='',arrb=[];
                    		zjlist +='<li uid="' + $(this).attr('deptchosenid') + '"><span>' + $(this).children('.list_msg').html() + '</span><i class="list_choose_delete"></i></li>';
                    		 $(this).find('span.list_check em').addClass('on');
                    		 $('.tanceng .mbxj_duoxuan_bm_xxllist').children().each(function(i,v){
                    		 	arrb.push($(this).attr('uid'))
                    		 })
                    		 //console.log(arrb)
                    		$(this).parent('ul').children('ul').each(function(i,v){
                    			if($.inArray($(this).children('li.deptChild').attr('deptchosenid'), arrb)!=-1){
                    				//$(this).remove();
                    				return
                    			}else{
                    				listhtml +='<li uid="' + $(this).children('li.deptChild').attr('deptchosenid') + '"><span>' + $(this).children('li.deptChild').children('.list_msg').html() + '</span><i class="list_choose_delete"></i></li>';
                    			$(this).children('li.deptChild').find('span.list_check em').addClass('on');
                    			}
                    				
                    		})
                    		$('.tanceng .mbxj_duoxuan_bm_xxllist').append(zjlist+listhtml)
                    	}
                        
                    }
                    $('.tanceng .mb_xj_dxbm_list_xxl ul li').removeClass('on');
                    $(this).closest('li').addClass('on');
                });
                 //选择部门右侧删除
                $('i.list_choose_delete').live('click', function () {
                    $(this).closest('li').remove();
                    $('.tanceng .mb_xj_dxbm_list_xxl ul .deptChild[deptchosenid = "' + $(this).closest('li').attr('uid') + '"]').find('em').removeClass('on');
                    if($('.tanceng .left_all').find('em').hasClass('on')){
                    	$('.tanceng .left_all').find('em').removeClass('on');
                    	$('.tanceng .mb_xj_dxbm_list_xxl').css('display','block')
                    }
                });
                
                
		}
	},
	error: function(e) {

	}
});
}
$('.tanceng span[name="ht_people"]').die().live('click',function(){
	bumen_list_ajax();
})
//bumen_list_ajax();

$('.tanceng .mb_xj_dxbm_list_xxl .list_check').live('click', function() {
	//$(this).children('em').addClass('on');
//	var notli = $('.tanceng .mb_xj_dxbm_list_xxl .left_1 .list_check').not($(this))
//	if($(this).children('em').is('.on')) {
//		$('.tanceng .mbxj_duoxuan_bm_xxllist').append('<li uid="' + $(this).parent().attr('deptchosenid') + '"><span>' + $(this).siblings('.list_msg').html() + '</span><i class="list_choose_delete mbxj_duoxuan_del_btn_xxl"> </i></li>');
//		$(this).parent().addClass('on');
//		notli.parent().removeClass('on')
//	} else {
//		$('.tanceng .mbxj_duoxuan_bm_xxllist').find('li[uid=' + $(this).parent().attr('deptchosenid') + ']').remove();
//	}
	
})
$('.tanceng .mbxj_duoxuan_del_btn_xxl').die().live('click', function() {
	$('.tanceng .mb_xj_dxbm_list_xxl li[deptchosenid=' + $(this).parent().attr('uid') + ']').children().children('em').removeClass('on')
	$(this).parent().remove()
})
var duoxuanBm = [];
$('.tanceng .mbxj_duoxuan_quedbtn_xxl').die('click').live('click', function() {
	if($('.tanceng .mbxj_xzbmlist_xxl').children('li').length == 0) {
		duoxuanBm = []
	}
	if($('.tanceng .mbxj_duoxuan_bm_xxllist').html()=='' ) {
		alert('请选择部门')
		return false;
	} else {
		var Bm = $.inArray($('.tanceng .mbxj_duoxuan_bm_xxllist li').attr('uid'), duoxuanBm);
		if(Bm != -1) {
			alert('对不起，重复了喔')
		} else {
			$.each($('.tanceng .mbxj_duoxuan_bm_xxllist li'), function(i, v) {
					duoxuanBm.push($(this).attr('uid'));
					//if($('.tanceng .mbxj_xzbmlist_xxl').children().length > 2) {
						//alert('最多只能添加3位哦')
					//} else {
						$('.tanceng .mbxj_xzbmlist_xxl').append('<li uid="' + $(this).attr('uid') + '">' + $(this).children('span').html() + '<i></i></li>');
					//}

				});
			var ul_heigth=$(".zcj_select_bm_name_list").height();
            if(ul_heigth<21){
                ul_heigth=21;
            }
            $(".zcj_input_val").css({'height':ul_heigth});
				//console.log(duoxuanBm)
		}
		$(this).parent().parent().parent().remove();
		var num = $('.tanceng').children(".dialog_box").length;
		if(num < 1) {
			$(".tanceng").hide();
		};
	}

})
$('.tanceng .mbxj_xzbmlist_xxl li i').die().live('click', function() {
		duoxuanBm.splice($.inArray($(this).parent().attr('uid'), duoxuanBm), 1)
		$(this).parent().remove();
	var ul_heigth=$(".zcj_select_bm_name_list").height();
            if(ul_heigth<21){
                ul_heigth=21;
            }
            $(".zcj_input_val").css({'height':ul_heigth});
		//console.log(duoxuanBm)
	})
	//是否启用
$('.tanceng .htmb_xj_baocunbtn_xxl').die('click').live('click', function() {
		//console.log($('.muban_radio input:radio[name="aa"]:checked').attr('status'))
		xinjian_mb_xxl_data.thetype = $(this).attr('thetype');
		if($('.tanceng .htmb_mbmc_xxl').val() == '') {
			alert('请输入模板名称');
			return false;
		}
		xinjian_mb_xxl_data.name = $('.tanceng .htmb_mbmc_xxl').val();
		xinjian_mb_xxl_data.status = $('.muban_radio input:radio[name="aa"]:checked').attr('status');
		//console.log(xinjian_mb_xxl_data.status)
		//xinjian_mb_xxl_data.is_name = $('.tanceng .htmb_mbmc_xxl').attr('isname');
		var Aatype = $(this).attr('thetype');
		if(Aatype == 1) {
			if($('.tanceng .htmb_qddd_xj_xxl').val() == '请输入签订地点') {
				$('.tanceng .htmb_qddd_xj_xxl').val('')
			}
			if($('.tanceng .htmb_ghrq_xj_xxl').val() == '') {
				$('.tanceng .htmb_ghrq_xj_xxl').val('')
			}
			if($('.tanceng .htmb_kjfp_xj_xxl').val() == '') {
				$('.tanceng .htmb_kjfp_xj_xxl').val('')
			}
			xinjian_mb_xxl_data.address = $('.tanceng .htmb_qddd_xj_xxl').val()
			xinjian_mb_xxl_data.deliverydays = $('.tanceng .htmb_ghrq_xj_xxl').val()
			xinjian_mb_xxl_data.invoicedays = $('.tanceng .htmb_kjfp_xj_xxl').val()
			xinjian_mb_xxl_data.custom = numa;
		} else if(Aatype == 2) {
			if($('.tanceng .htmb_xj_cgqddd_xxl').val() == '请输入签订地点') {
				$('.tanceng .htmb_xj_cgqddd_xxl').val('')
			}
			if($('.tanceng .htmb_xj_cgghrq_xxl').val() == '') {
				$('.tanceng .htmb_xj_cgghrq_xxl').val('')
			}
			if($('.tanceng .htmb_xj_cgkjfp_xxl').val() == '') {
				$('.tanceng .htmb_xj_cgkjfp_xxl').val('')
			}
			xinjian_mb_xxl_data.address = $('.tanceng .htmb_xj_cgqddd_xxl').val()
			xinjian_mb_xxl_data.deliverydays = $('.tanceng .htmb_xj_cgghrq_xxl').val()
			xinjian_mb_xxl_data.invoicedays = $('.tanceng .htmb_xj_cgkjfp_xxl').val()
			xinjian_mb_xxl_data.custom = numa;
		} else if(Aatype == 3) {
			if($('.tanceng .htmb_xj_ygqddd_xxl').val() == '' || $('.tanceng .htmb_xj_ygqddd_xxl').val() == '请输入签订地点') {
				$('.tanceng .htmb_xj_ygqddd_xxl').val('')
			}
			xinjian_mb_xxl_data.address = $('.tanceng .htmb_xj_ygqddd_xxl').val()
			xinjian_mb_xxl_data.custom = numa;
		} else if(Aatype == 4) {
			if($('.tanceng .htmb_xj_qthtqddd_xxl').val() == '' || $('.tanceng .htmb_xj_qthtqddd_xxl').val() == '请输入签订地点') {
				$('.tanceng .htmb_xj_qthtqddd_xxl').val('')
			}
			xinjian_mb_xxl_data.address = $('.tanceng .htmb_xj_qthtqddd_xxl').val()
			xinjian_mb_xxl_data.custom = numa;
		}
		if($('.tanceng .mbxj_xzbmlist_xxl').children('li').length == 0) {
			alert('请选择部门')
			return false;
		} else {
			var bms = [];
			$.each($('.tanceng .mbxj_xzbmlist_xxl li[uid]'), function(i, v) {
				bms.push($(this).attr('uid'))
			});
		}
		xinjian_mb_xxl_data.dept = bms.join();
		//console.log(xinjian_mb_xxl_data)
		baocun_xjmb_ajax()
		$(this).parent().parent().parent().parent().parent().parent().remove();
		var num = $('.tanceng').children(".dialog_box").length;
		if(num < 1) {
			$(".tanceng").hide();
		};
	})
	//取消
$('.tanceng .htmb_xj_quxibtn_xxl').die().live('click', function() {
		duoxuanBm = [];
		numa = []
		$(this).parent().parent().parent().parent().parent().parent().remove();
		var num = $('.tanceng').children(".dialog_box").length;
		if(num < 1) {
			$(".tanceng").hide();
		};
	})
	//预览
$('.tanceng .htmb_xj_yunlan_btn_xxl').die().live('click', function() {
	var Aatype = $(this).attr('thetype');
	if(numa.length == 0) {
		return;
	} else {
		var yulan_html_xxl = '';
		if(Aatype == 1) {
			$.each(numa, function(i, v) {
				yulan_html_xxl += '<div class="ht_msg"><p>' + intToChinese((i + 5)) + '、' + v.name + '</p><p>' + v.content + '</p></div>';
			});
		} else if(Aatype == 2) {
			$.each(numa, function(i, v) {
				yulan_html_xxl += '<div class="ht_msg"><p>' + intToChinese((i + 5)) + '、' + v.name + '</p><p>' + v.content + '</p></div>';
			});
		} else if(Aatype == 3) {
			$.each(numa, function(i, v) {
				yulan_html_xxl += '<div class="ht_msg"><p>' + intToChinese((i + 3)) + '、' + v.name + '</p><p>' + v.content + '</p></div>';
			});
		} else if(Aatype == 4) {
			$.each(numa, function(i, v) {
				yulan_html_xxl += '<div class="ht_msg"><p>' + intToChinese((i + 1)) + '、' + v.name + '</p><p>' + v.content + '</p></div>';
			});
		}
		$('.tanceng .ht_msg_bottom').before(yulan_html_xxl)
	}

})
























