var token, page, num,uid,username;
token = Admin.get_token();
uid = Admin.get_uid();
username = localStorage.getItem('username');
company_admin = localStorage.getItem('company_admin');
//SERVER_URL="http://192.168.0.167:9091/";
//SERVER_URL = 'http://192.168.0.167:9010/';
//token = '2017052516045457073-1-1';
var loginUserInfo = JSON.parse(localStorage.getItem('user_info'));
//var fprk='stock-in/add',blrk='stock-in/in';
//if(loginUserInfo['company_admin'] != 1){
//	if(loginUserInfo.powerUrls.length==0){
//		
//	}else{
//		var arr = loginUserInfo.powerUrls;//
//		if($.inArray(blrk, arr)!=-1){
//			
//		}else{
//			
//		}
//	}
//}

//console.log(company_admin)
//token = "2017051317050663733-1-1";
page = 1;
num = 10;
//uid = 1;
//username = '邢啸亮';
//SERVER_URL = 'http://192.168.0.167:9091/';
//待分配入库列表
var rkgl_dfprk_data = {
		token: token,
		page: page,
		num: num,
		key: '',
		input_type: '', // 1销售退货 2借入入库 3借出归还 4销售换货 5采购入库 6采购换货
		input_name: '', //入库人
		document_marker: '', //下单人
		distribution_name: '', //分配人
		warehouse_id: '', //库房ID
		order_by: 'input_time', //排序字段
		order_sort: '1', //排序顺序 0 顺序 1 倒序
		input_time:'',//入库日期
		status:''//1 未分配 2 部分分配 3 完成分配 （“不显示完成分配” 值为：1,2）
	}
//入库单列表
if(company_admin==1){
	var dfprk_rkd_listdata = {
		token: token,
		page: page,
		num: num,
		key: '',
		input_type: '', //入库类型 1销售退货 2采购入库 3调拨 4借入 5借出归还 6换货入库
		input_name: '', //入库人
		input_status: '', //入库状态 1.待入库 2.部分入库 3.完成入库
		warehouse_id: '', //库房ID
		order_by: 'create_time', //排序字段
		order_sort: '1', //排序顺序 0 顺序 1倒序
		related_receipts_no: '',//关联单据编号
		uid:'0'
	}
}else{
	var dfprk_rkd_listdata = {
		token: token,
		page: page,
		num: num,
		key: '',
		input_type: '', //入库类型 1销售退货 2采购入库 3调拨 4借入 5借出归还 6换货入库
		input_name: '', //入库人
		input_status: '', //入库状态 1.待入库 2.部分入库 3.完成入库
		warehouse_id: '', //库房ID
		order_by: 'create_time', //排序字段
		order_sort: '1', //排序顺序 0 顺序 1倒序
		related_receipts_no: '',//关联单据编号
		uid:uid
	}
}

if ($('#left_button_69').attr('fromnotice') == 1) { // 当前是从消息过来的
    var curId = $('#left_button_69').attr('detailid');
    var secondName = $('#left_button_69').attr('secondmenu'); 
    if(secondName=='待分配入库'){
    	$.each($('.tabtitle li'), function (i, v) {
        if (secondName == $.trim($('.tabtitle li').eq(i).text())) {
            //$('.tabtitle li').removeClass('tabhover').eq(i).addClass('tabhover');
            rkgl_dfprk_data = {		// 初始化参数
                token: token,
				page: page,
				num: num,
				key: '',
				input_type: '', // 1销售退货 2借入入库 3借出归还 4销售换货 5采购入库 6采购换货
				input_name: '', //入库人
				document_marker: '', //下单人
				distribution_name: '', //分配人
				warehouse_id: '', //库房ID
				order_by: 'input_time', //排序字段
				order_sort: '1', //排序顺序 0 顺序 1 倒序
				input_time:'',//入库日期
				status:'',//1 未分配 2 部分分配 3 完成分配 （“不显示完成分配” 值为：1,2）
                ids:curId
            };
            setTimeout(function(){
                $('.tabtitle li').eq(i).trigger('click'); //触发相应子模块事件
                $('#left_button_69').attr({	 // 清空按钮的属性
                    'fromnotice': '',
                    'detailid': '',
                    'secondmenu': '',
                    'totable': ''
                });
            },100);
        }
    });
    }else{
    	 $.each($('.tabtitle li'), function (i, v) {
        if (secondName == $.trim($('.tabtitle li').eq(i).text())) {
            //$('.tabtitle li').removeClass('tabhover').eq(i).addClass('tabhover');
            dfprk_rkd_listdata = {		// 初始化参数
              token: token,
				page: page,
				num: num,
				key: '',
				input_type: '', //入库类型 1销售退货 2采购入库 3调拨 4借入 5借出归还 6换货入库
				input_name: '', //入库人
				input_status: '', //入库状态 1.待入库 2.部分入库 3.完成入库
				warehouse_id: '', //库房ID
				order_by: 'create_time', //排序字段
				order_sort: '1', //排序顺序 0 顺序 1倒序
				related_receipts_no: '',//关联单据编号
				uid:uid,
                ids:curId
            };
            setTimeout(function(){
                $('.tabtitle li').eq(i).trigger('click'); // 触发相应子模块事件
                $('#left_button_69').attr({	 // 清空按钮的属性
                    'fromnotice': '',
                    'detailid': '',
                    'secondmenu': '',
                    'totable': ''
                });
            },100);
        }
    });
    }
    
} else { // 当前不是从消息过来的，正常调取整个列表
    rkgl_dfprk_ajax();
}
	//切换状态升降序
	var rkgldfprk_riqi=0;
$('.rkgl_dfprk_sortriqi_xxl').die().live('click',function(){
	rkgldfprk_riqi++;
	if(rkgldfprk_riqi%2==0){
		rkgl_dfprk_data.order_sort = '0';
	}else{
		rkgl_dfprk_data.order_sort = '1';
	}
	rkgl_dfprk_data.order_by = 'input_time';
	rkgl_dfprk_ajax()
})
//$('.rkgl_dfprk_sortriqi_xxl').toggle(function() {
//		$(this).children(".price_icon").removeClass("down").addClass("up");
//		rkgl_dfprk_data.order_by = 'input_time';
//		rkgl_dfprk_data.order_sort = '0';
//		rkgl_dfprk_ajax()
//	}, function() {
//		$(this).children(".price_icon").removeClass("up").addClass("down");
//		rkgl_dfprk_data.order_by = 'input_time';
//		rkgl_dfprk_data.order_sort = '1';
//		rkgl_dfprk_ajax()
//	})
	// 定义查看项
var rkgl_dfprk_dyckx_lists = [{
	'index': null,
	'field': '商品入库数量'
}, {
	'index': null,
	'field': '商品分配数量'
}, {
	'index': null,
	'field': '整机入库数量'
}, {
	'index': null,
	'field': '整机分配数量'
}, {
	'index': null,
	'field': '下单人'
}, {
	'index': null,
	'field': '分配人'
}, {
	'index': null,
	'field': '备注'
}];

function rkgl_dfprk_ajax() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "stocking-in/list",
		data: rkgl_dfprk_data,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data)
				$('.rkgl_dfprk_listhtml_xxl').html('');
				$('.rkgl_dfprk_errhtml_xxl').css('display','block');
				$('.rkgl_fenye_listhtml_xxl').css('display', 'none');
			} else {
				console.log(data)
				$('.rkgl_dfprk_listnums_xxl').html(data.totalcount);
				var dfprk_list = data['dataList'],
					dfprk_html = '';
				if(dfprk_list.length == 0) {
					$('.rkgl_dfprk_listhtml_xxl').html('');
					$('.rkgl_dfprk_errhtml_xxl').css('display', 'block');
					$('.rkgl_fenye_listhtml_xxl').css('display', 'none');
				} else {
					$('.rkgl_dfprk_errhtml_xxl').css('display', 'none');
					$('.rkgl_fenye_listhtml_xxl').css('display', 'block');
					$.each(dfprk_list, function(i, v) {
						if(v.is_cancel == 1) {
							dfprk_html += '<tr class="c_c">';
							dfprk_html += '<td><span class="voidIcon">作废</span></td>';
							dfprk_html += '<td>' + likNullData(v.input_time) + '</td>';
							dfprk_html += '<td>' + likNullData(v.related_receipts_no) + '</td>';
							if(v.input_type == 1) {
								dfprk_html += '<td>销售退货</td>';
							} else if(v.input_type == 2) {
								dfprk_html += '<td>借入入库 </td>';
							} else if(v.input_type == 3) {
								dfprk_html += '<td>借出归还 </td>';
							} else if(v.input_type == 4) {
								dfprk_html += '<td>销售换货 </td>';
							} else if(v.input_type == 5){
								dfprk_html += '<td>采购入库</td>';
							} else{
								dfprk_html += '<td>采购换货</td>';
							}
							dfprk_html += '<td>' + likNullData(v.related_business_name) + '</td>';
							if(v.warehouse_name == null || v.warehouse_name == undefined) {
								dfprk_html += '<td><span class="c_c">未分配</span></td>';
							} else {
								dfprk_html += '<td>' + likNullData(v.warehouse_name) + '</td>';
							}
							if(v.input_name == null || v.input_name == undefined) {
								dfprk_html += '<td><span class="c_c">未分配</span></td>';
							} else {
								dfprk_html += '<td>' + likNullData(v.input_name) + '</td>';
							}
							dfprk_html += '<td>' + likNullData(v.input_num) + '</td>';
							dfprk_html += '<td>' + likNullData(v.distribution_num) + '</td>';
							dfprk_html += '<td>' + likNullData(v.set_num) + '</td>';
							dfprk_html += '<td>' + likNullData(v.set_distribution_num) + '</td>';
							if(v.status==1){
								dfprk_html += '<td>未分配</td>';
							}else if(v.status==2){
								dfprk_html += '<td>部分分配</td>';
							}else{
								dfprk_html += '<td>完成分配</td>';
							}
							
							dfprk_html += '<td>' + likNullData(v.document_marker) + '</td>';
							dfprk_html += '<td>' + likNullData(v.distribution_name) + '</td>';
							dfprk_html += '<td>' + likNullData(v.remark) + '</td>';
							dfprk_html += '<td><button class="but_mix but_look val_dialog rkgl_dfprk_chakan_btnxxl" name="crk_rkgl_fprkLookxq" uid="' + v.id + '">查看</button></td></tr>';
						} else {
							dfprk_html += '<tr><td>' + Appendzero(i + 1) + '</td>';
							dfprk_html += '<td>' + likNullData(v.input_time) + '</td>';
							dfprk_html += '<td>' + likNullData(v.related_receipts_no) + '</td>';
							if(v.input_type == 1) {
								dfprk_html += '<td>销售退货</td>';
							} else if(v.input_type == 2) {
								dfprk_html += '<td>借入入库</td>';
							} else if(v.input_type == 3) {
								dfprk_html += '<td>借出归还 </td>';
							} else if(v.input_type == 4) {
								dfprk_html += '<td>销售换货</td>';
							} else if(v.input_type == 5){
								dfprk_html += '<td>采购入库</td>';
							}else{
								dfprk_html += '<td>采购换货</td>';
							}
							dfprk_html += '<td><p class="xiangmu_p1">' + likNullData(v.related_business_name) + '</p></td>';
							if(v.warehouse_name == null || v.warehouse_name == undefined) {
								dfprk_html += '<td><span class="c_c">未分配</span></td>';
							} else {
								dfprk_html += '<td><p class="xiangmu_p1">' + likNullData(v.warehouse_name) + '</p></td>';
							}
							if(v.input_name == null || v.input_name == undefined) {
								dfprk_html += '<td><span class="c_c">未分配</span></td>';
							} else {
								dfprk_html += '<td>' + likNullData(v.input_name) + '</td>';
							}
								dfprk_html += '<td>' + likNullData(v.input_num) + '</td>';
								dfprk_html += '<td>' + likNullData(v.distribution_num) + '</td>';
								dfprk_html += '<td>' + likNullData(v.set_num) + '</td>';
								dfprk_html += '<td>' + likNullData(v.set_distribution_num) + '</td>';
								if(v.status==1){
								dfprk_html += '<td class="c_r">未分配</td>';
							}else if(v.status==2){
								dfprk_html += '<td class="c_y">部分分配</td>';
							}else{
								dfprk_html += '<td class="c_g">完成分配</td>';
							}
							dfprk_html += '<td>' + likNullData(v.document_marker) + '</td>';
							dfprk_html += '<td>' + likNullData(v.distribution_name) + '</td>';
							dfprk_html += '<td>' + likNullData(v.remark) + '</td>';
							if(v.status==3){
								var fprk='stock-in/add',blrk='stock-in/in';
								if(loginUserInfo['company_admin'] != 1){
									if(loginUserInfo.powerUrls.length==0){
										dfprk_html += '<td><button class="but_mix but_look val_dialog rkgl_dfprk_chakan_btnxxl" name="crk_rkgl_fprkLookxq" uid="' + v.id + '" cjrq="' + v.input_time + '" gldjbh="' + v.related_receipts_no + '" rklx="' + v.input_type + '" sprksl="' + v.input_num + '" spfpsl="' + v.distribution_num + '" pzdpspyfpsl="' + v.set_distribution_num + '" zjrksl="'+v.set_num+'">查看</button></td></tr>';
									}else{
										var arr = loginUserInfo.powerUrls;//
										if($.inArray(fprk, arr)!=-1){
											dfprk_html += '<td><button class="but_mix but_look val_dialog rkgl_dfprk_chakan_btnxxl" name="crk_rkgl_fprkLookxq" uid="' + v.id + '" cjrq="' + v.input_time + '" gldjbh="' + v.related_receipts_no + '" rklx="' + v.input_type + '" sprksl="' + v.input_num + '" spfpsl="' + v.distribution_num + '" pzdpspyfpsl="' + v.set_distribution_num + '" zjrksl="'+v.set_num+'">查看</button><button class="but_mix but_grey1">分配</button></td></tr>';
											//$('.rkgl_dfprk_fenpei_btnxxl').show();
										}else{
											dfprk_html += '<td><button class="but_mix but_look val_dialog rkgl_dfprk_chakan_btnxxl" name="crk_rkgl_fprkLookxq" uid="' + v.id + '" cjrq="' + v.input_time + '" gldjbh="' + v.related_receipts_no + '" rklx="' + v.input_type + '" sprksl="' + v.input_num + '" spfpsl="' + v.distribution_num + '" pzdpspyfpsl="' + v.set_distribution_num + '" zjrksl="'+v.set_num+'">查看</button></td></tr>';
											//$('.rkgl_dfprk_fenpei_btnxxl').hide();
										}
									}
								}else if(loginUserInfo['company_admin'] == 1){
									dfprk_html += '<td><button class="but_mix but_look val_dialog rkgl_dfprk_chakan_btnxxl" name="crk_rkgl_fprkLookxq" uid="' + v.id + '" cjrq="' + v.input_time + '" gldjbh="' + v.related_receipts_no + '" rklx="' + v.input_type + '" sprksl="' + v.input_num + '" spfpsl="' + v.distribution_num + '" pzdpspyfpsl="' + v.set_distribution_num + '" zjrksl="'+v.set_num+'">查看</button><button class="but_mix but_grey1">分配</button></td></tr>';
								}
								
								
							}else{
								var fprk='stock-in/add',blrk='stock-in/in';
								if(loginUserInfo['company_admin'] != 1){
									if(loginUserInfo.powerUrls.length==0){
										dfprk_html += '<td><button class="but_mix but_look val_dialog rkgl_dfprk_chakan_btnxxl" name="crk_rkgl_fprkLookxq" typeid="' + v.input_type + '"  uid="' + v.id + '" cjrq="' + v.input_time + '" gldjbh="' + v.related_receipts_no + '" rklx="' + v.input_type + '" sprksl="' + v.input_num + '" spfpsl="' + v.distribution_num + '" pzdpspyfpsl="' + v.set_distribution_num + '" zjrksl="'+v.set_num+'">查看</button></td></tr>';
									}else{
										var arr = loginUserInfo.powerUrls;//
										if($.inArray(fprk, arr)!=-1){
											dfprk_html += '<td><button class="but_mix but_look val_dialog rkgl_dfprk_chakan_btnxxl" name="crk_rkgl_fprkLookxq" typeid="' + v.input_type + '"  uid="' + v.id + '" cjrq="' + v.input_time + '" gldjbh="' + v.related_receipts_no + '" rklx="' + v.input_type + '" sprksl="' + v.input_num + '" spfpsl="' + v.distribution_num + '" pzdpspyfpsl="' + v.set_distribution_num + '" zjrksl="'+v.set_num+'">查看</button><button class="but_mix but_look val_dialog rkgl_dfprk_fenpei_btnxxl" name="crk_rkgl_fprk_pj" uid="' + v.id + '" cjrq="' + v.input_time + '" gldjbh="' + v.related_receipts_no + '" rklx="' + v.input_type + '" sprksl="' + v.input_num + '" spfpsl="' + v.distribution_num + '" pzdpspyfpsl="' + v.set_distribution_num + '" zjrksl="'+v.set_num+'">分配</button></td></tr>';
										}else{
											dfprk_html += '<td><button class="but_mix but_look val_dialog rkgl_dfprk_chakan_btnxxl" name="crk_rkgl_fprkLookxq" typeid="' + v.input_type + '"  uid="' + v.id + '" cjrq="' + v.input_time + '" gldjbh="' + v.related_receipts_no + '" rklx="' + v.input_type + '" sprksl="' + v.input_num + '" spfpsl="' + v.distribution_num + '" pzdpspyfpsl="' + v.set_distribution_num + '" zjrksl="'+v.set_num+'">查看</button></td></tr>';
										}
									}
								}else if(loginUserInfo['company_admin'] == 1){
									dfprk_html += '<td><button class="but_mix but_look val_dialog rkgl_dfprk_chakan_btnxxl" name="crk_rkgl_fprkLookxq" typeid="' + v.input_type + '"  uid="' + v.id + '" cjrq="' + v.input_time + '" gldjbh="' + v.related_receipts_no + '" rklx="' + v.input_type + '" sprksl="' + v.input_num + '" spfpsl="' + v.distribution_num + '" pzdpspyfpsl="' + v.set_distribution_num + '" zjrksl="'+v.set_num+'">查看</button><button class="but_mix but_look val_dialog rkgl_dfprk_fenpei_btnxxl" name="crk_rkgl_fprk_pj" uid="' + v.id + '" cjrq="' + v.input_time + '" gldjbh="' + v.related_receipts_no + '" rklx="' + v.input_type + '" sprksl="' + v.input_num + '" spfpsl="' + v.distribution_num + '" pzdpspyfpsl="' + v.set_distribution_num + '" zjrksl="'+v.set_num+'">分配</button></td></tr>';
								}
								
								
								//dfprk_html += '<td><button class="but_mix but_look val_dialog rkgl_dfprk_chakan_btnxxl" name="crk_rkgl_fprkLookxq" typeid="' + v.input_type + '"  uid="' + v.id + '" cjrq="' + v.input_time + '" gldjbh="' + v.related_receipts_no + '" rklx="' + v.input_type + '" sprksl="' + v.input_num + '" spfpsl="' + v.distribution_num + '" pzdpspyfpsl="' + v.set_distribution_num + '" zjrksl="'+v.set_num+'">查看</button><button class="but_mix but_look val_dialog rkgl_dfprk_fenpei_btnxxl" name="crk_rkgl_fprk_pj" uid="' + v.id + '" cjrq="' + v.input_time + '" gldjbh="' + v.related_receipts_no + '" rklx="' + v.input_type + '" sprksl="' + v.input_num + '" spfpsl="' + v.distribution_num + '" pzdpspyfpsl="' + v.set_distribution_num + '" zjrksl="'+v.set_num+'">分配</button></td></tr>';
							}
//							if(v.input_type == 1 || v.input_type == 6) {
//								if(v.input_num == v.distribution_num && v.set_num == v.set_distribution_num) {
//									dfprk_html += '<td><button class="but_mix but_look r_sidebar_btn rkgl_dfprk_chakan_btnxxl" name="storage_rfgl_dfp" xsid="1" uid="' + v.id + '">查看</button></td></tr>';
//								} else {
//									dfprk_html += '<td><button class="but_mix but_look r_sidebar_btn rkgl_dfprk_chakan_btnxxl" name="storage_rfgl_dfp" typeid="' + v.input_type + '" lbid="' + v.category + '" xsid="2" uid="' + v.id + '">查看</button><button class="but_mix but_look val_dialog rkgl_dfprk_fenpei_btnxxl" name="crk_rkgl_fprk_pj" uid="' + v.id + '" cjrq="' + v.create_time + '" gldjbh="' + v.related_receipts_no + '" rklx="' + v.input_type + '" sprksl="' + v.input_num + '" spfpsl="' + v.distribution_num + '" pzdpspyfpsl="' + v.set_distribution_num + '">分配</button></td></tr>';
//								}
//
//							} else if(v.category == 1 || v.category == 2) {
//								if(v.distribution_num == v.input_num) {
//									dfprk_html += '<td><button class="but_mix but_look r_sidebar_btn rkgl_dfprk_chakan_btnxxl" name="storage_rfgl_dfp" lbid="' + v.category + '" xsid="1" uid="' + v.id + '">查看</button></td></tr>';
//								} else {
//									dfprk_html += '<td><button class="but_mix but_look r_sidebar_btn rkgl_dfprk_chakan_btnxxl" typeid="' + v.input_type + '" lbid="' + v.category + '" name="storage_rfgl_dfp" xsid="2" uid="' + v.id + '">查看</button><button class="but_mix but_look val_dialog rkgl_dfprk_fenpei_btnxxl" name="crk_rkgl_fprk_pj" uid="' + v.id + '" cjrq="' + v.create_time + '" gldjbh="' + v.related_receipts_no + '" rklx="' + v.input_type + '" sprksl="' + v.input_num + '" spfpsl="' + v.distribution_num + '" pzdpspyfpsl="' + v.set_distribution_num + '">分配</button></td></tr>';
//								}
//
//							} 

						}
					});
					$('.rkgl_dfprk_listhtml_xxl').html(dfprk_html);
					list_table_render_pagination(".rkgl_fenye_listhtml_xxl", rkgl_dfprk_data, rkgl_dfprk_ajax, data.totalcount, dfprk_list.length);
					likShow('#rkgl_dfprk_xzckx_tablelist_xxl', rkgl_dfprk_dyckx_lists, '#rkgl_dfprk_xzckx_ullist_xxl', '#rkgl_dfprk_xzckx_baocun_btnxxl', '#rkgl_dfprk_xzckx_huifmoren_btnxxl');
				}
			}
		},
		error: function(e) {
			console.log(e);
			$('.rkgl_dfprk_listhtml_xxl').html('');
			$('.rkgl_dfprk_errhtml_xxl').css('display', 'block');
			$('.rkgl_fenye_listhtml_xxl').css('display', 'none');
		}
	});
}
rkgl_dfprk_ajax()
	//补零
function Appendzero(obj) {
	if(obj < 10) return "0" + obj;
	else return obj;
}
//点击刷新
$('.rkgl_djsx_btnxxl').die().live('click', function() {
		add_Rload_index(69, 8) //参数页面值，父级值
	})
		////不显示完成入库
$('.rkgl_dfprk_noshow_btnxxl').die().live('click', function() {
		if($(this).prop("checked")) {
			rkgl_dfprk_data.status = '1,2';
			rkgl_dfprk_ajax()
		} else {
			rkgl_dfprk_data.status = '';
			rkgl_dfprk_ajax()
		}
	})
	//搜索
//function rkgl_dfprk_sousuo_now(val) {
//	rkgl_dfprk_data.key = val;
//	rkgl_dfprk_ajax();
//}
$('.rkgl_dfprk_ssbtn_xxl').die().live('click', function() {
	//console.log($(this).prev().val())
	
		if($(this).prev().val() == '搜索关联单据编号/相关往来名称') {
			rkgl_dfprk_data.key='';
			//return false;
		}else{
			rkgl_dfprk_data.key = $(this).prev().val();
			
		}
		rkgl_dfprk_ajax()
	})
	//待分配入库-高级搜索
$('.rkgl_dfprk_gjss_typelx_xxl li').die().live('click', function() {
	//console.log($(this).attr('typeid'));
	rkgl_dfprk_data.input_type = $(this).attr('typeid');
	rkgl_dfprk_ajax()
})
$('.rkgl_dfprkgjss_fpztstatus_xxl li').die().live('click', function() {
	//console.log($(this).attr('typeid'));
	rkgl_dfprk_data.status = $(this).attr('typeid');
	rkgl_dfprk_ajax()
})
$('.rkgl_dfprk_gjss_fpkf_listxxl li').die().live('click', function() {
	$('.rkgl_fpkf_ajaxbtn_xxl').val($(this).text()).addClass('c_3');
	rkgl_dfprk_data.warehouse_id = $(this).attr('uid');
	rkgl_dfprk_ajax()
})
$('.rkgl_dfprk_gjss_rkr_listxxl li').die().live('click', function() {
	rkgl_dfprk_data.input_name = $(this).attr('uid');
	rkgl_dfprk_ajax()
})
$('.rkgl_dfprk_gjss_xdr_listxxl li').die().live('click', function() {
	rkgl_dfprk_data.document_marker = $(this).attr('uid');
	rkgl_dfprk_ajax()
})
$('.rkgl_dfprk_gjss_fprlist_xxl li').die().live('click', function() {
		rkgl_dfprk_data.distribution_name = $(this).attr('uid');
		rkgl_dfprk_ajax()
	})
	//员工高级搜索人员列表
var ygong_list_data = {
	token: token
}

function ygong_list_ajax() {
	$.ajax({
		type: "post",
		url: SERVER_URL + "stocking-in/alluser",//admin/employeelist
		data: ygong_list_data,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data)
			} else {
				console.log(data)
				var yg_list = data['data'],
					yg_html = '',xdr='',fpr='';
				$.each(yg_list.inputNameList, function(i, v) {
					yg_html += '<li uid="' + v.id + '">' + v.name + '</li>';
				});
				$.each(yg_list.documentMarkerList, function(i,v) {
					xdr += '<li uid="' + v.id + '">' + v.name + '</li>';
				});
				$.each(yg_list.disNameList, function(i,v) {
					fpr += '<li uid="' + v.id + '">' + v.name + '</li>';
				});
				$('.rkgl_dfprk_gjss_rkr_listxxl').html(yg_html);
				$('.rkgl_dfprk_gjss_xdr_listxxl').html(xdr);
				$('.rkgl_dfprk_gjss_fprlist_xxl').html(fpr);
				//$('.rkgl_rkd_gjss_rkrlist_xxl').html(yg_html)
			}
		},
		error: function(e) {
			console.log(e)
		}
	});

}
$('button[name="storage_rkgl_zkgjss"]').die().live('click',function(){
	if($(this).text()=='隐藏高级搜索'){
		ygong_list_ajax();
		//$('.rkgl_dfprk_errhtml_xxl').css('width','138%');
		//$('.rkgl_rkdlist_errhtml_xxl').css('width','138%');
	}else{
		//$('.rkgl_dfprk_errhtml_xxl').css('width','100%');
		//$('.rkgl_rkdlist_errhtml_xxl').css('width','100%');
	}
})
$('.rkgl_fpkf_ajaxbtn_xxl,.rkgl_fpkf_ajaxbtn_xxl+i').die().live('click',function(){
	kufang_list_ajax();
})

	//库房列表
var kufang_list_data = {
	token: token,
	key: '',
	page: '',
	num: ''
}

function kufang_list_ajax() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "warehouse/list",
		data: kufang_list_data,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data)
			} else {
				console.log(data);
				var kf_list = data['datalist'],
					kf_html = '';
				$.each(kf_list, function(i, v) {
					kf_html += '<li uid="' + v.id + '">' + v.name + '</li>';
				});
				$('.rkgl_dfprk_gjss_fpkf_listxxl').html(kf_html);
				$('.rkgl_rkd_gjss_kflist_xxl').html(kf_html);
				$('.dfprk_addsp_xzrkkkf_listxxl').html(kf_html)
			}
		},
		error: function(e) {

		}
	});
}
$('.rkglrukud_gjss_rkkfxxl,.rkglrukud_gjss_rkkfxxl+i').die().live('click',function(){
	kufang_list_ajax()
})
$('.dfprk_addsp_xzrkkkf_listxxl li').die().live('click', function() {
		$('.dfprk_xzrksp_xzrkkf_valuexxl').attr('uid', $(this).attr('uid'))
	})
	//待分配入库查看
var dfprk_chakan_data = {
	token: token,
	id: ''
}
$('.rkgl_dfprk_chakan_btnxxl').die().live('click', function() {
	if($(this).attr('rklx') == 1) {
					$('.dfprk_ckson_titrklx_xxl').html('销售退货 ');
				} else if($(this).attr('rklx') == 2) {
					$('.dfprk_ckson_titrklx_xxl').html('采购入库 ');
				} else if($(this).attr('rklx') == 3) {
					$('.dfprk_ckson_titrklx_xxl').html('调拨 ');
				} else if($(this).attr('rklx') == 4) {
					$('.dfprk_ckson_titrklx_xxl').html('借入 ');
				} else if($(this).attr('rklx') == 5) {
					$('.dfprk_ckson_titrklx_xxl').html('借出归还 ');
				} else if($(this).attr('rklx') == 6) {
					$('.dfprk_ckson_titrklx_xxl').html('换货入库 ');
				}
	$('.dfprk_ckson_titcjrq_xxl').html($(this).attr('cjrq'));
				$('.dfprk_ckson_titgldjbh_xxl').html($(this).attr('gldjbh'));
				
				$('.dfprk_ckson_titsorksl_xxl').html($(this).attr('sprksl'));
				$('.dfprk_ckson_titspyfpsl_xxl').html($(this).attr('spfpsl'));
				$('.dfprk_ckson_titpzrksl_xxl').html($(this).attr('zjrksl'));
				$('.dfprk_ckson_pzdpspyfpsl_xxl').html($(this).attr('pzdpspyfpsl'));			
	dfprk_chakan_data.id = $(this).attr('uid');
	dfprk_chakan_ajax();
})

function dfprk_chakan_ajax() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "stocking-in/disinfo",
		data: dfprk_chakan_data,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data);
				$('.dfprk_ckson_cklisthtml_xxl').html('');
				$('.dfprk_ckson_listerrhtml_xxl').css('display', 'block');
			} else {
				console.log(data)
				var ck_list = data['dataList'],
					ck_html = '',
					trlist = '',
					numarr = [];
				//console.log(ck_list.length)
				if(ck_list.length == 0) {
					$('.dfprk_ckson_cklisthtml_xxl').html('');
					$('.dfprk_ckson_listerrhtml_xxl').css('display', 'block');
				} else {
					$('.dfprk_ckson_listerrhtml_xxl').css('display', 'none');
					$.each(ck_list, function(i, v) {
						ck_html += '<div class="crk_rkgl_addRKD"><div class="unhead_box"><p>';
						ck_html += '入库单编号：<span style="margin-right: 20px;">' + likNullData(v.number) + '</span>';
						ck_html += '入库库房：<span style="margin-right: 20px;">' + likNullData(v.warehouse_name) + '</span>';
						ck_html += '入库人：<span style="margin-right: 20px;">' + likNullData(v.input_name) + '</span>';
						ck_html += '分配日期：<span style="margin-right: 20px;">' + likNullData(v.create_time) + '</span></p></div>';
						ck_html += '<div class="div_1"><div class="div_1 table-container" style="margin:0;">';
						ck_html += '<table><thead class='+(i == 0?"":"noprint")+'><tr>';
						ck_html += '<th width="32">序号</th><th width="100">商品类型</th><th width="150">商品编号</th><th width="120">商品名称</th><th width="60">基本单位</th><th width="430">属性</th><th width="60">入库数量</th></tr></thead>';
						if(v.productList.length == 0) {
							ck_html += '<tbody class="dfprk_ckson_ziliebiao_xxl"><tr class="table_total"><td>合计</td><td></td><td></td><td></td><td></td><td></td><td>0</td></tr></tbody></table></div></div></div>';
							
						} else {
							trlist = '';
							numarr =[];
							//$('.dfprk_ckson_ziliebiao_errhtml_xxl').css('display', 'none');
							$.each(v.productList, function(j, m) {
								
								trlist += '<tr><td>' + Appendzero(j + 1) + '</td>';
								if(m.product_type == 1) {
									trlist += '<td>商品</td>';
								} else if(m.product_type == 2) {
									trlist += '<td>套餐商品</td>';
								} else {
									trlist += '<td>整机商品</td>';
								}
								trlist += '<td>' + likNullData(m.code_sn) + '</td>';
								trlist += '<td>' + likNullData(m.product_name) + '</td>';
								trlist += '<td>' + likNullData(m.unit_name) + '</td>';
								//trlist += '<td>' + likNullData(m.format) + '</td>';
								trlist += '<td>' + likNullData(m.attr_name) + '</td>';
								trlist += '<td>' + likNullData(m.input_num) + '</td></tr>';
								numarr.push(m.input_num);
							});
							//console.log(numarr)
							var sum = 0;
							for(var i = 0; i < numarr.length; i++) {
								sum += parseInt(numarr[i]);
							}
							ck_html += '<tbody class="dfprk_ckson_ziliebiao_xxl cru_print_tbody">' + trlist + '<tr class="table_total noprint"><td>合计</td><td></td><td></td><td></td><td></td><td></td><td>' + sum + '</td></tr></tbody></table></div><div class="unhead_box crk_print_unhead_box none">入库单编号：<span style="margin-right: 10px;">' + likNullData(v.number) + '</span>入库库房：<span style="margin-right: 10px;">' + likNullData(v.warehouse_name) + '</span>入库人：<span style="margin-right: 10px;">' + likNullData(v.input_name) + '</span>分配日期：<span style="margin-right: 10px;">' + likNullData(v.create_time) + '</span></div></div></div>';
						}
					});

					$('.dfprk_ckson_cklisthtml_xxl').html(ck_html);
				}
//				if(d_ck_list.input_type == 1) {
//					$('.dfprk_ckson_titrklx_xxl').html('销售退货 ');
//					$('.dfprk_ck_rklx_xxl').html('销售退货');
//				} else if(d_ck_list.input_type == 2) {
//					$('.dfprk_ckson_titrklx_xxl').html('采购入库 ');
//					$('.dfprk_ck_rklx_xxl').html('采购入库');
//				} else if(d_ck_list.input_type == 3) {
//					$('.dfprk_ckson_titrklx_xxl').html('调拨 ');
//					$('.dfprk_ck_rklx_xxl').html('调拨');
//				} else if(d_ck_list.input_type == 4) {
//					$('.dfprk_ckson_titrklx_xxl').html('借入 ');
//					$('.dfprk_ck_rklx_xxl').html('借入 ');
//				} else if(d_ck_list.input_type == 5) {
//					$('.dfprk_ckson_titrklx_xxl').html('借出归还 ');
//					$('.dfprk_ck_rklx_xxl').html('借出归还');
//				} else if(d_ck_list.input_type == 6) {
//					$('.dfprk_ckson_titrklx_xxl').html('换货入库 ');
//					$('.dfprk_ck_rklx_xxl').html('换货入库');
//				}
//				$('.dfprk_ckson_titcjrq_xxl').html(d_ck_list.input_time);
//				$('.dfprk_ckson_titgldjbh_xxl').html(d_ck_list.related_receipts_no);
//				
//				$('.dfprk_ckson_titsorksl_xxl').html(d_ck_list.input_num);
//				$('.dfprk_ckson_titspyfpsl_xxl').html(d_ck_list.distribution_num);
//				$('.dfprk_ckson_titpzrksl_xxl').html(d_ck_list.set_num);
//				$('.dfprk_ckson_pzdpspyfpsl_xxl').html(d_ck_list.set_distribution_num);
				
//				$('.dfprk_ck_ckbtn_xxl').attr({
//					'uid': d_ck_list.id,
//					'cjrq': d_ck_list.create_time,
//					'gldjbh': d_ck_list.related_receipts_no,
//					'rklx': $('.dfprk_ck_rklx_xxl').html(),
//					'sprksl': d_ck_list.input_num,
//					'spfpsl': d_ck_list.distribution_num,
//					'pzrksl': $('.dfprk_ck_pzrknums_xxl').html(),
//					'pzdpspyfpsl': d_ck_list.set_distribution_num
//				});
//				$('.dfprk_ck_xdr_xxl').html(d_ck_list.document_marker);
//				$('.dfprk_ck_fpr_xxl').html(d_ck_list.distribution_name);
//				$('.dfprk_ck_beizhu_xxl').html(d_ck_list.remark);
//				$('.dfprk_ck_fpbtn_xxl').attr({
//					'uid': d_ck_list.id,
//					'cjrq': d_ck_list.create_time,
//					'gldjbh': d_ck_list.related_receipts_no,
//					'rklx': $('.dfprk_ck_rklx_xxl').html(),
//					'sprksl': d_ck_list.input_num,
//					'spfpsl': d_ck_list.distribution_num,
//					'pzrksl': $('.dfprk_ck_pzrknums_xxl').html(),
//					'pzdpspyfpsl': d_ck_list.set_distribution_num
//				})
			}
		},
		error: function(e) {
			console.log(e);
			$('.dfprk_ckson_cklisthtml_xxl').html('');
			$('.dfprk_ckson_listerrhtml_xxl').css('display', 'block');
		}
	});
}
//待分配入库查看下的查看按钮
var yifpslmx_data = {
	token: token,
	id: ''
}

function yifpslmx_ajax() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "stocking-in/disinfo",
		data: yifpslmx_data,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data)
				$('.dfprk_ckson_cklisthtml_xxl').html('');
				$('.dfprk_ckson_listerrhtml_xxl').css('display', 'block');
			} else {
				console.log(data)
				var ck_list = data['dataList'],
					ck_html = '',
					trlist = '',
					numarr = [];
				//console.log(ck_list.length)
				if(ck_list.length == 0) {
					$('.dfprk_ckson_cklisthtml_xxl').html('');
					$('.dfprk_ckson_listerrhtml_xxl').css('display', 'block');
				} else {
					$('.dfprk_ckson_listerrhtml_xxl').css('display', 'none');
					$.each(ck_list, function(i, v) {
						ck_html += '<div class="crk_rkgl_addRKD"><div class="unhead_box">';
						ck_html += '入库单编号：<span style="margin-right: 10px;">' + likNullData(v.number) + '</span>';
						ck_html += '入库库房：<span style="margin-right: 10px;">' + likNullData(v.warehouse_name) + '</span>';
						ck_html += '入库人：<span style="margin-right: 10px;">' + likNullData(v.input_name) + '</span>';
						ck_html += '分配日期：<span style="margin-right: 10px;">' + likNullData(v.create_time) + '</span></div>';
						ck_html += '<div class="div_1"><div class="div_1 table-container" style="margin:0;">';
						ck_html += '<table><thead class='+(i == 0?"":"noprint")+'><tr >';
						ck_html += '<th width="32">序号</th><th width="100">商品类型</th><th width="150">商品编号</th><th width="120">商品名称</th><th width="60">基本单位</th><th width="430">属性</th><th width="60">入库数量</th></tr></thead>';
						if(v.productList.length == 0) {
							ck_html += '<tbody class="dfprk_ckson_ziliebiao_xxl"><tr class="table_total"><td>合计</td><td></td><td></td><td></td><td></td><td></td><td></td><td>0</td></tr></tbody></table></div></div></div>';
							
						} else {
							$('.dfprk_ckson_ziliebiao_errhtml_xxl').css('display', 'none');
							trlist = '';
							numarr = '';
							$.each(v.productList, function(j, m) {
								
								trlist += '<tr><td>' + Appendzero(j + 1) + '</td>';
								if(m.product_type == 1) {
									trlist += '<td>商品</td>';
								} else if(m.product_type == 2) {
									trlist += '<td>套餐商品</td>';
								} else {
									trlist += '<td>配置商品</td>';
								}
								trlist += '<td>' + likNullData(m.code_sn) + '</td>';
								trlist += '<td>' + likNullData(m.product_name) + '</td>';
								trlist += '<td>' + likNullData(m.unit_name) + '</td>';
								trlist += '<td>' + likNullData(m.format) + '</td>';
								trlist += '<td>' + likNullData(m.attr_name) + '</td>';
								trlist += '<td>' + likNullData(m.distribution_num) + '</td></tr>';
								numarr.push(m.distribution_num);
							});
							//console.log(numarr)
							var sum = 0;
							for(var i = 0; i < numarr.length; i++) {
								sum += parseInt(numarr[i]);
							}
							ck_html += '<tbody class="dfprk_ckson_ziliebiao_xxl">' + trlist + '<tr class="table_total"><td>合计</td><td></td><td></td><td></td><td></td><td></td><td></td><td>' + sum + '</td></tr></tbody></table></div></div></div>';
						}
					});

					$('.dfprk_ckson_cklisthtml_xxl').html(ck_html);
				}
				
				
			}
		},
		error: function(e) {
			console.log(e)
			$('.dfprk_ckson_cklisthtml_xxl').html('');
			$('.dfprk_ckson_listerrhtml_xxl').css('display', 'block');
		}
	});
}

$('.dfprk_ck_ckbtn_xxl').die().live('click', function() {
		var _this = $(this);
		$('.dfprk_ckson_titcjrq_xxl').html(_this.attr('cjrq'));
		$('.dfprk_ckson_titgldjbh_xxl').html(_this.attr('gldjbh'));
		$('.dfprk_ckson_titrklx_xxl').html(_this.attr('rklx'));
		$('.dfprk_ckson_titsorksl_xxl').html(_this.attr('sprksl'));
		$('.dfprk_ckson_titspyfpsl_xxl').html(_this.attr('spfpsl'));
		$('.dfprk_ckson_titpzrksl_xxl').html(_this.attr('pzrksl'));
		$('.dfprk_ckson_pzdpspyfpsl_xxl').html(_this.attr('pzdpspyfpsl'));
		yifpslmx_data.id = $(this).attr('uid');
		yifpslmx_ajax();
	})
	//待分配入库查看下分配按钮点击
$('.dfprk_ck_fpbtn_xxl').die().live('click', function() {
	$('.dfprk_xzrksp_sclisthtml_boxxxl').html('');
	$('.dfprk_addrkd_btnxxl').css('display', 'block');
	var _this = $(this);
	$('.dfprk_queding_fprkbtn_xxl').attr('uid', _this.attr('uid'))
	$('.tanceng .dfprk_addrkd_btnxxl').attr('uid', _this.attr('uid'));
	$('.rkgl_ckfp_peijian_cjrqxxl').html(_this.attr('cjrq'));
	$('.rkgl_ckfp_peijian_gldjbhxxl').html(_this.attr('gldjbh'));
	$('.rkgl_ckfp_peijian_rklxxxl').html(_this.attr('rklx'));
	$('.rkgl_ckfp_peijian_sprksl_xxl').html(_this.attr('sprksl'));
	$('.dfprk_peijian_spyfpsl_xxl').html(_this.attr('spfpsl'));
	$('.dfprk_peijian_pzrkslxxl').html(_this.attr('pzrksl'));
	$('.dfprk_peijian_pzdpspyfpsl_xxl').html(_this.attr('pzdpspyfpsl'));
})
$('.rkgl_dfprk_fenpei_btnxxl').die().live('click', function() {
	$('.dfprk_xzrksp_sclisthtml_boxxxl').html('');
	$('.dfprk_addrkd_btnxxl').css('display', 'block');
		var _this = $(this);
			//pzrksl_nums = _this.parent().prevAll().eq(4).html();
		var rkleixing = _this.parent().prevAll().eq(11).html();
		$('.tanceng .dfprk_addrkd_btnxxl').attr('uid', _this.attr('uid'));
		$('.dfprk_queding_fprkbtn_xxl').attr('uid', _this.attr('uid'));
		$('.rkgl_ckfp_peijian_cjrqxxl').html(_this.attr('cjrq'));
		$('.rkgl_ckfp_peijian_gldjbhxxl').html(_this.attr('gldjbh'));
		$('.rkgl_ckfp_peijian_rklxxxl').html(rkleixing);
		$('.rkgl_ckfp_peijian_sprksl_xxl').html(_this.attr('sprksl'));
		$('.dfprk_peijian_spyfpsl_xxl').html(_this.attr('spfpsl'));
		$('.dfprk_peijian_pzrkslxxl').html(_this.attr('zjrksl'));
		$('.dfprk_peijian_pzdpspyfpsl_xxl').html(_this.attr('pzdpspyfpsl'));
	})
	//创建入库单编号
function cjrkdbh() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "stock-in/createnumber",
		data: {
			token: token
		},
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data)
			} else {
				console.log(data)
				var val = data.data;
				$('.dfprk_spcjrkdbh_addsp').val(val)
			}
		},
		error: function(e) {

		}
	});
}

//选择入库人
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
function xzrkr_rkgl_ajax(){
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
			$('.rkgl_dfprk_reylisthtml_xxl').html(tree_list_person(datalists, deep));
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
$('.rkgl_rylist_quedbtn_xxl').die('click').live('click', function() {
		var rkd_rkrid = $('.tanceng .rkgl_dfprk_reylisthtml_xxl li.on').attr('userinfoid'),
			rkd_rkrmc = $('.tanceng .rkgl_dfprk_reylisthtml_xxl li.on').children('span.list_msg').html();
		$('.tanceng .rkgl_addsprkd_xzrkr_xxl').val(rkd_rkrmc).attr('uid', rkd_rkrid).css('color', '#333');
		//$('.tanceng .dbsp_xj_peizhisp_dbr_xxl').val(rkd_rkrmc).attr('uid', rkd_rkrid)
		$(this).parent().parent().parent().remove();
		var num = $('.tanceng').children(".dialog_box").length;
		if(num < 1) {
			$(".tanceng").hide();
		}
	})
	//添加入库单按钮-待分配
$('.dfprk_addrkd_btnxxl').die().live('click', function() {
	cjrkdbh();
	spcheckbox = [];
	dfpspmx_data_xxl.input_id = $(this).attr('uid');
	dfpspmx_ajax_xxl();
	kufang_list_ajax();
	//
})
$('.val_dialogTop[name="crk_rkgl_dxPerson"]').die().live('click',function(){
	xzrkr_rkgl_ajax();
})

//待待分配入库商品明细
var dfpspmx_data_xxl = {
	token: token,
	input_id: ''
}

function dfpspmx_ajax_xxl() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "stocking-in/productdetail",
		data: dfpspmx_data_xxl,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data)
				$('.dfprk_xzrksp_listhtml_xxl').html('');
				var rksp_err = '';
				rksp_err += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
				$('.dfprk_xzrksp_errhtml_xxl').html(rksp_err);
			} else {
				console.log(data);
				var rksp_list = data['dataList'],
					rksp_html = '';
				if(rksp_list.length == 0) {
					$('.dfprk_xzrksp_listhtml_xxl').html('');
					var rksp_err = '';
					rksp_err += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
					$('.dfprk_xzrksp_errhtml_xxl').html(rksp_err);
				} else {
					$('.dfprk_xzrksp_errhtml_xxl').html('');
					$.each(rksp_list, function(i, v) {
						rksp_html += '<tr><td><input type="checkbox" name="crk_rkgl_xzrkspInppj" indexid="' + i + '" spid="' + v.id + '" class="dfprk_xzrksp_checkbox_btnxxl"></td>';
						rksp_html += '<td class="crk_rkd_bsmrk"><div class="num_input inline_block num_input_new"><button class="but_blue but_opa_small inp_plus dfprk_xzrkspsl_addnums_btnxxl" indexid="' + i + '" disabled="disabled">+</button><input type="text" value="" maxnum="'+(parseInt(v.input_num)-parseInt(v.distribution_num))+'" indexid="' + i + '" onkeyup="checkInt(this);" onpaste="checkInt(this);" oncut="checkInt(this);" ondrop="checkInt(this);" onchange="checkInt(this);" class="rkgl_dfprufp_xzslsrxxl lik_input_number"/><button class="but_blue but_opa_small radius_left_0 inp_reduce dfprk_xzsprk_jianjiannum_xxl" disabled="disabled" indexid="' + i + '">-</button></div></td>';
						rksp_html += '<td>'+likNullData(parseInt(v.input_num)-parseInt(v.distribution_num))+'</td>'; //
						if(v.product_type == 1) {
							rksp_html += '<td>商品</td>';
							rksp_html += '<td>' + likNullData(v.code_sn) + '</td>';
							rksp_html += '<td><span>' + likNullData(v.product_name) + '</span></td>';
						} else if(v.product_type == 2) {
							rksp_html += '<td>套餐商品</td>';
							rksp_html += '<td>' + likNullData(v.code_sn) + '</td>';
							if(v.product_type_tag == '配件') {
								rksp_html += '<td>' + likNullData(v.product_name) + '<span class="storage_single_circle but_blue">配件</span></td>';
							} else if(v.product_type_tag == '整入') {
								rksp_html += '<td>' + likNullData(v.product_name) + '<span class="storage_single_circle but_yellow">整入</span></td>';
							} else {
								rksp_html += '<td>' + likNullData(v.product_name) + '</td>';
							}

						} else {
							rksp_html += '<td>整机商品</td>';
							rksp_html += '<td>' + likNullData(v.product_type_no) + '</td>';
							if(v.product_type_tag == '配件') {
								rksp_html += '<td>' + likNullData(v.product_type_name) + '<span class="storage_single_circle but_blue">配件</span></td>';
							} else if(v.product_type_tag == '整入') {
								rksp_html += '<td>' + likNullData(v.product_type_name) + '<span class="storage_single_circle but_yellow">整入</span></td>';
							} else {
								rksp_html += '<td>' + likNullData(v.product_type_name) + '</td>';
							}
						}
						rksp_html += '<td>' + likNullData(v.unit_name) + '</td>';
						//rksp_html += '<td>' + likNullData(v.format) + '</td>';
						rksp_html += '<td><p class="xiangmu_p1">' + likNullData(v.attr_name) + '</p></td>';
//						if(v.product_type == 3) {
//							rksp_html += '<td>-</td>';
//							rksp_html += '<td>-</td>';
//						} else {
//							rksp_html += '<td>' + likNullData(v.product_type_no) + '</td>';
//							rksp_html += '<td>' + likNullData(v.product_type_name) + '/' + likNullData(v.set_format) + '</td>';
//						}
						if(v.product_type == 3){
							rksp_html += '<td><button class="but_mix but_look val_dialogTop rkgldfprk_chakanzhengji_kucunxxl" uid="' + v.product_id + '" name="crk_rkgl_kfclLook">查看</button></td></tr>';
						}else{
							rksp_html += '<td><button class="but_mix but_look val_dialogTop dfprk_ckkcsl_btnxxl" uid="' + v.product_id + '" name="crk_rkgl_kfclLook">查看</button></td></tr>';
						}
						
					});
					var last_tr = '';
					last_tr += '<tr class="table_total"><td>合计</td><td class="dfprk_xzrksp_mainnums_xxl">0</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>';
					$('.dfprk_xzrksp_listhtml_xxl').html(rksp_html + last_tr);
				}
			}
		},
		error: function(e) {
			console.log(e)
			$('.dfprk_xzrksp_listhtml_xxl').html('');
			var rksp_err = '';
			rksp_err += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
			$('.dfprk_xzrksp_errhtml_xxl').html(rksp_err);
		}
	});
}
//function fnnum(val){
//	console.log(val)
//}
//判断输入框只能输入数字
function checkInt(o) {
				theV = isNaN(parseInt(o.value)) ? '' : parseInt(o.value);
				if(theV != o.value) {
					o.value = theV;
				}else if(o.value <=0){
					o.value = '';
				}
			}

//合计商品数量checkbox
var spcheckbox = [];
$('.tanceng .rkgl_dfprufp_xzslsrxxl').die().live('change',function(){
	//console.log($(this).val())
	var newnum = parseInt($(this).val());
	var maxsl = parseInt($(this).attr('maxnum'));
	if(newnum>maxsl){
		alert('不得大于入库数量');
		$(this).val(maxsl)
	}
	var spcheckboxnum = 0;
	$('.tanceng input[name="crk_rkgl_xzrkspInppj"]:checked').each(function(i,v){
			//console.log(v)
		spcheckboxnum +=parseInt($(this).parent().next().children().children('input').val());	
	})
	$('.tanceng .dfprk_xzrksp_mainnums_xxl').html(spcheckboxnum)
//	var indexid = $(this).attr('indexid');
//	if($(this).parents('td').prev().children('input').is(':checked')){
//		//console.log($(this).val())
//		spcheckbox[indexid]=parseInt($(this).val());
//		var spcheckboxnum = 0;
//		$.each(spcheckbox, function(i, v) {
//		spcheckboxnum += parseInt(v);
//	});
//	console.log(spcheckbox)
//	$('.tanceng .dfprk_xzrksp_mainnums_xxl').html(spcheckboxnum)
//	}else{
//		console.log(000)
//	}
})
$('.tanceng .dfprk_xzrksp_checkbox_btnxxl').die().live('click', function() {
	//spcheckbox = [];
	var indexid = $(this).attr('indexid');
	
	if($(this).is(':checked')) {
		$(this).parent().next().removeClass('crk_rkd_bsmrk').children().find('input').val('1')
		$(this).parent().next().children().find('button').removeAttr('disabled');
		//$('.tanceng .dfprk_xzrksp_queding_btnxxls').removeAttr('disabled','disabled').addClass('but_blue')
//		if($(this).parent().next().children().children('input').val()==''||$(this).parent().next().children().children('input').val()=='0'){
//			alert('入库数量不能为零');
//			$(this).attr('checked',false)
//		}else{
			var spcheckboxnum = 0;
	$('.tanceng input[name="crk_rkgl_xzrkspInppj"]:checked').each(function(i,v){
			
		spcheckboxnum +=parseInt($(this).parent().next().children().children('input').val());	
	})
	$('.tanceng .dfprk_xzrksp_mainnums_xxl').html(spcheckboxnum)
//		}
		//spcheckbox[indexid]=parseInt($(this).parent().next().children().children('input').val());
	} else {
		//spcheckbox.splice(indexid, 1)
		$(this).parent().next().addClass('crk_rkd_bsmrk').children().find('input').val('')
		
		$(this).parent().next().children().find('button').attr('disabled','disabled');
		//$('.tanceng .dfprk_xzrksp_queding_btnxxls').attr('disabled','disabled').removeClass('but_blue')
		var spcheckboxnum = 0;
	$('.tanceng input[name="crk_rkgl_xzrkspInppj"]:checked').each(function(i,v){
			//console.log(v)
		spcheckboxnum +=parseInt($(this).parent().next().children().children('input').val());	
	})
	$('.tanceng .dfprk_xzrksp_mainnums_xxl').html(spcheckboxnum)
	}
//	var spcheckboxnum = 0;
//	$.each(spcheckbox, function(i, v) {
//		spcheckboxnum += parseInt(v);
//	});
//	console.log(spcheckbox)
//	$('.tanceng .dfprk_xzrksp_mainnums_xxl').html(spcheckboxnum)
		//	for(var i=0;i<spcheckbox.length;i++){
		//		spcheckboxnum +=parseInt(spcheckbox[i]);
		//	}
		//console.log(spcheckbox);
})

//控制选择商品数量按钮
$('.tanceng .dfprk_xzrkspsl_addnums_btnxxl').die().live('click', function() {
	var index = $(this).attr('indexid');
	var default_num = parseInt($(this).next('input').val());
	var nums_xxl = parseInt($(this).parent().parent().next().text());
	if(default_num > nums_xxl) {
		$(this).next('input').val(nums_xxl);
	} else {
		$(this).next('input').val(default_num);
	}
	var spcheckboxnum = 0;
	$('.tanceng input[name="crk_rkgl_xzrkspInppj"]:checked').each(function(i,v){
			//console.log(v)
		spcheckboxnum +=parseInt($(this).parent().next().children().children('input').val());	
	})
	$('.tanceng .dfprk_xzrksp_mainnums_xxl').html(spcheckboxnum)
//	if($(this).parent().parent().prev().children('.dfprk_xzrksp_checkbox_btnxxl').is(':checked')) {
//		spcheckbox.splice(index, 1, parseInt(default_num))
//	}
//	console.log(spcheckbox)
//	var jianums = 0;
//	$.each(spcheckbox, function(i, v) {
//		jianums += parseInt(v);
//	});
//	$('.tanceng .dfprk_xzrksp_mainnums_xxl').html(jianums)
})
$('.dfprk_xzsprk_jianjiannum_xxl').die().live('click', function() {
	if($(this).prev().val()<=1){
		$(this).prev().val('1')
	}
	var spcheckboxnum = 0;
	$('.tanceng input[name="crk_rkgl_xzrkspInppj"]:checked').each(function(i,v){
			//console.log(v)
		spcheckboxnum +=parseInt($(this).parent().next().children().children('input').val());	
	})
	$('.tanceng .dfprk_xzrksp_mainnums_xxl').html(spcheckboxnum)
//		var index = $(this).attr('indexid');
//		var default_nums = $(this).prev('input').val();
//		if($(this).parent().parent().prev().children('.dfprk_xzrksp_checkbox_btnxxl').is(':checked')) {
//			spcheckbox.splice(index, 1, parseInt(default_nums))
//		}
//		console.log(spcheckbox)
//		var jianums = 0;
//		$.each(spcheckbox, function(i, v) {
//			jianums += parseInt(v);
//		});
//		$('.tanceng .dfprk_xzrksp_mainnums_xxl').html(jianums)
	})
//获取整机商品库房
var zhengjisp_kuffb_data = {
	token:token,
	id:'',
	warehouse_id:''
}
function zhengjisp_kuffb_ajax(){
	$.ajax({
		type:"get",
		url:SERVER_URL+"warehouse/numbysetproid",
		dataType:'json',
		data:zhengjisp_kuffb_data,
		success:function(data){
			if(data.code!=0){
				console.log(data);
				$('.dfprk_kfcl_tablelisthtml_xxl').html('')
				$('.dfprk_kfcl_table_errhtml_xxl').html('<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>')
			}else{
				console.log(data)
				$('.dfprk_kfcl_table_errhtml_xxl').html('')
				var kffb_list = data['data'],
					kffb_html = '';
				kffb_html += '<thead>';
				kffb_html += '<tr><th>商品编号</th><th>商品名称</th><th>基本单位</th><th>属性</th>';//<th>规格</th>
				$.each(kffb_list.warehouseList, function(i, v) {
					kffb_html += '<th>' + v.name + '</th>';
				});
				kffb_html += '</tr></thead><tbody><tr>';
				kffb_html += '<td>' + likNullData(kffb_list.code_sn) + '</td>';
				kffb_html += '<td>' + likNullData(kffb_list.product_name) + '</td>';
				kffb_html += '<td>' + likNullData(kffb_list.unit_name) + '</td>';
				//kffb_html += '<td>' + likNullData(kffb_list.format) + '</td>';
				kffb_html += '<td><p class="xiangmu_p2">' + likNullData(kffb_list.attr_name) + '</p></td>';
				//kffb_html +='<td>'+likNullData(v.num)+'</td></tr></tbody>'; 
				$.each(kffb_list.warehouseList, function(i, v) {
					kffb_html += '<td>' + likNullData(v.num) + '</td>';
				});
				kffb_html += '</tr></tbody>';
				$('.dfprk_kfcl_tablelisthtml_xxl').html(kffb_html)
			}
		},
		error:function(e){
			$('.dfprk_kfcl_tablelisthtml_xxl').html('')
			$('.dfprk_kfcl_table_errhtml_xxl').html('<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>')
		}
		
	});
}
$('.tanceng .rkgldfprk_chakanzhengji_kucunxxl').die().live('click',function(){
	zhengjisp_kuffb_data.id = $(this).attr('uid');
	zhengjisp_kuffb_ajax()
})
	//获取商品库房分布
var spkffb_datanum_xxl = {
	token: token,
	id: '',
	warehouse_id: ''
}

function spkffb_ajaxnum_xxl() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "warehouse/numbyproid",
		data: spkffb_datanum_xxl,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data);
				$('.dfprk_kfcl_tablelisthtml_xxl').html('')
				$('.dfprk_kfcl_table_errhtml_xxl').html('<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>')
			} else {
				console.log(data);
				$('.dfprk_kfcl_table_errhtml_xxl').html('')
				var kffb_list = data['data'],
					kffb_html = '';
				kffb_html += '<thead>';
				kffb_html += '<tr><th>商品编号</th><th>商品名称</th><th>基本单位</th><th>属性</th>';//<th>规格</th>
				$.each(kffb_list.warehouseList, function(i, v) {
					kffb_html += '<th>' + v.name + '</th>';
				});
				kffb_html += '</tr></thead><tbody><tr>';
				kffb_html += '<td>' + likNullData(kffb_list.code_sn) + '</td>';
				kffb_html += '<td>' + likNullData(kffb_list.product_name) + '</td>';
				kffb_html += '<td>' + likNullData(kffb_list.unit_name) + '</td>';
				//kffb_html += '<td>' + likNullData(kffb_list.format) + '</td>';
				kffb_html += '<td><p class="xiangmu_p2">' + likNullData(kffb_list.attr_name) + '</p></td>';
				//kffb_html +='<td>'+likNullData(v.num)+'</td></tr></tbody>'; 
				$.each(kffb_list.warehouseList, function(i, v) {
					kffb_html += '<td>' + likNullData(v.num) + '</td>';
				});
				kffb_html += '</tr></tbody>';
				$('.dfprk_kfcl_tablelisthtml_xxl').html(kffb_html)
			}
		},
		error: function(e) {
			$('.dfprk_kfcl_tablelisthtml_xxl').html('')
			$('.dfprk_kfcl_table_errhtml_xxl').html('<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>')
		}
	});
}
$('.tanceng .dfprk_ckkcsl_btnxxl').die().live('click', function() {
		spkffb_datanum_xxl.id = $(this).attr('uid');
		spkffb_ajaxnum_xxl();
	})
	//选择入库商品生成列表
var dfpsp_newarr = {
		rkdbh: '',
		rkkf: '',
		rkkfid: '',
		rkr: '',
		rkrid: '',
		main: '',
		listxxl: []
	},
	dfpsp_newhtml = '',
	dfpsp_newmain = '';
$('.dfprk_xzrksp_queding_btnxxls').die('click').live('click', function() {
		$('.dfprk_xzrksp_sclisthtml_boxxxl').html('');
		dfpsp_newmain = '';
		dfpsp_newhtml = '';
		dfpsp_newarr = {
			rkdbh: '',
			rkkf: '',
			rkkfid: '',
			rkr: '',
			rkrid: '',
			main: '',
			listxxl: []
		};
		if($('.dfprk_spcjrkdbh_addsp').val() == '') {
			alert('入库单编号生成失败，请重新选择')
			return false;
		}
		if($('.tanceng .dfprk_xzrksp_xzrkkf_valuexxl').val()== "选择入库库房") {
			alert('选择入库库房')
			return false;
		}
		if($('.tanceng .rkgl_addsprkd_xzrkr_xxl').val() == ""||$('.tanceng .rkgl_addsprkd_xzrkr_xxl').val()=='选择入库人') {
			alert('选择入库人')
			return false;
		}
		if($('.tanceng .dfprk_xzrksp_mainnums_xxl').html()=='0'){
			alert('请选择入库数量')
			return false;
		}
//		$('.tanceng .dfprk_xzrksp_checkbox_btnxxl:checked').each(function(i,v){
//			if($(this).parent().next().children().children('input').val() == 0){
//				alert('请选择入库数量');
//				return false;
//			}
//		})
		
//		if($('.dfprk_xzrksp_checkbox_btnxxl:checked').parent().next().children().children('input').val() == 0) {
//			alert('请选择入库数量');
//			return false;
//		}
		dfpsp_newarr.rkdbh = $('.dfprk_spcjrkdbh_addsp').val();
		dfpsp_newarr.rkkf = $('.tanceng .dfprk_xzrksp_xzrkkf_valuexxl').val();
		dfpsp_newarr.rkkfid = $('.tanceng .dfprk_xzrksp_xzrkkf_valuexxl').attr('uid');
		dfpsp_newarr.rkrid = $('.tanceng .rkgl_addsprkd_xzrkr_xxl').attr('uid');
		dfpsp_newarr.rkr = $('.tanceng .rkgl_addsprkd_xzrkr_xxl').val();
		dfpsp_newarr.main = $('.tanceng .dfprk_xzrksp_mainnums_xxl').html();
		$('.tanceng .dfprk_xzrksp_listhtml_xxl input:checked').each(function() {
			dfpsp_newarr['listxxl'].push({
				'spid': $(this).attr('spid'),
				'splx': $(this).parent().nextAll().eq(2).html(),
				'spbh': $(this).parent().nextAll().eq(3).html(),
				'spmc': $(this).parent().nextAll().eq(4).html(),
				'jbdw': $(this).parent().nextAll().eq(5).html(),
				//'gg': $(this).parent().nextAll().eq(6).html(),
				'shuxi': $(this).parent().nextAll().eq(6).html(),
				//'pzspbh': $(this).parent().nextAll().eq(8).html(),
				//'pzspmcgg': $(this).parent().nextAll().eq(9).html(),
				'nums': $(this).parent().next().children().children('input').val(),
			})
		})
		$('.dfprk_queding_fprkbtn_xxl').attr({
			'kfid': dfpsp_newarr.rkkfid,
			'rkrid': dfpsp_newarr.rkrid,
			'rkdbh': dfpsp_newarr.rkdbh
		})
		dfpsp_newmain += '<div class="crk_rkgl_addRKD"><div class="unhead_box">';
		dfpsp_newmain += '入库单编号：<span style="margin-right: 10px;" >' + dfpsp_newarr.rkdbh + '</span>';
		dfpsp_newmain += '入库库房：<span style="margin-right: 10px;" uid="' + dfpsp_newarr.rkkfid + '">' + dfpsp_newarr.rkkf + '</span>';
		dfpsp_newmain += '入库人：<span style="margin-right: 10px;" uid="' + dfpsp_newarr.rkrid + '">' + dfpsp_newarr.rkr + '</span>';
		dfpsp_newmain += '<div class="right"><button class="but_exit but_mix val_dialogTop dfprk_bjlist_xxl" name="crk_rkgl_addrkd_pj">编辑</button><button class="but_r but_mix val_dialogTop" name="crk_rkgl_delete">删除</button></div></div>';
		dfpsp_newmain += '<div class="div_1"><div class="div_1 table-container" style="margin:0;">';
		dfpsp_newmain += '<table><thead><tr><th>序号</th><th>商品类型</th><th>商品编号</th><th>商品名称</th><th>基本单位</th><th>属性</th><th>入库数量</th></tr></thead>';
		$.each(dfpsp_newarr.listxxl, function(i, v) {
			dfpsp_newhtml += '<tr uid="' + v.spid + '" spnum="' + v.nums + '"><td>' + Appendzero(i + 1) + '</td>';
			dfpsp_newhtml += '<td>' + v.splx + '</td>';
			dfpsp_newhtml += '<td>' + v.spbh + '</td>';
			dfpsp_newhtml += '<td>' + v.spmc + '</td>';
			dfpsp_newhtml += '<td>' + v.jbdw + '</td>';
			//dfpsp_newhtml += '<td>' + v.gg + '</td>';
			dfpsp_newhtml += '<td><p class="xiangmu_p2">' + v.shuxi + '</p></td>';
			dfpsp_newhtml += '<td>' + v.nums + '</td>';
			dfpsp_newhtml += '</tr>';
		});
		dfpsp_newmain += '<tbody class="dfpsp_sctbody_newlist_xxl">' + dfpsp_newhtml + '</tbody><tbody><tr class="table_total"><td>合计</td><td></td><td></td><td></td><td></td><td></td>';//<td></td>
		dfpsp_newmain += '<td>' + dfpsp_newarr.main + '</td></tr></tbody></table></div></div></div>';
		$('.dfprk_xzrksp_sclisthtml_boxxxl').html(dfpsp_newmain);
		$('.dfprk_addrkd_btnxxl').css('display', 'none');
		$(this).parent().parent().parent().remove();
		var num = $('.tanceng').children(".dialog_box").length;
		if(num < 1) {
			$(".tanceng").hide();
		}

	})
	//待分配入库编辑
$('.dfprk_bjlist_xxl').die().live('click', function() {
		cjrkdbh();
		spcheckbox = [];
		$('.dfprk_xzrksp_xzrkkf_valuexxl').removeAttr('uid');
	})
	//待分配入库——生成入库单删除
$('.tanceng .dfprk_shanchu_btnxxl').die().live('click', function() {
		$('.dfprk_xzrksp_sclisthtml_boxxxl').html('');
		dfpsp_newmain = '';
		dfpsp_newhtml = '';
		dfpsp_newarr = {
			rkdbh: '',
			rkkf: '',
			rkkfid: '',
			rkr: '',
			rkrid: '',
			main: '',
			listxxl: []
		};
		spcheckbox = [];
		$('.dfprk_addrkd_btnxxl').css('display', 'block');
		$('.dfprk_xzrksp_xzrkkf_valuexxl').removeAttr('uid');
	})
	//待分配确定分配
var dfprk_qdrk_dataxxl = {
	token: token,
	inputing_id: '',
	number: '',
	input_name: '',
	warehouse_id: '',
	remark: '',
	product_info: ''
}

function dfprk_qdrk_ajax_xxl() {
	$.ajax({
		type: "post",
		url: SERVER_URL + "stock-in/add",
		data: dfprk_qdrk_dataxxl,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data)
			} else {
				console.log(data)
				rkgl_dfprk_ajax();
				//$('.dfprk_xzrksp_sclisthtml_boxxxl').html('');
			}
		},
		error: function(e) {
			console.log(e)
		}
	});
}
$('.dfprk_queding_fprkbtn_xxl').die('click').live('click', function() {
		var zjson = [];
		if($('.dfprk_xzrksp_sclisthtml_boxxxl').html() == '') {
			alert('请添加入库单');
			return false;
		} else {
			dfprk_qdrk_dataxxl.inputing_id = $(this).attr('uid');
			dfprk_qdrk_dataxxl.number = $(this).attr('rkdbh');
			dfprk_qdrk_dataxxl.input_name = $(this).attr('rkrid');
			dfprk_qdrk_dataxxl.warehouse_id = $(this).attr('kfid');
			$('.tanceng .dfpsp_sctbody_newlist_xxl tr').each(function() {
				zjson.push({
					'id': $(this).attr('uid'),
					'input_num': $(this).attr('spnum')
				})
			})
			dfprk_qdrk_dataxxl.product_info = JSON.stringify(zjson)

			dfprk_qdrk_ajax_xxl()
			$(this).parent().parent().parent().remove();
			var num = $('.tanceng').children(".dialog_box").length;
			if(num < 1) {
				$(".tanceng").hide();
			}
		}
	})
	//入库单 定义查看项
var rkgl_rkd_xzckx_listxxl = [{
	'index': null,
	'field': '入库状态'
}, {
	'index': null,
	'field': '入库人'
}];


	//切换状态升降序
	var dianjiqiehuan=0;
	$('.rkgl_rkd_qiehuancjrq_sjxxl').die().live('click',function(){
		dianjiqiehuan++;
		if(dianjiqiehuan%2==0){
			//console.log(1)
			dfprk_rkd_listdata.order_by = 'input_time';
			dfprk_rkd_listdata.order_sort = '0';
			//$(this).children(".price_icon").removeClass("down").addClass("up");
		}else{
			//console.log(0)
			//$(this).children(".price_icon").removeClass("up").addClass("down");
			dfprk_rkd_listdata.order_by = 'input_time';
			dfprk_rkd_listdata.order_sort = '1';
		}
//		var _this = $(this)
//		$(this).toggle(function(i) {
	//_this.children(".price_icon").removeClass("down").addClass("up");
//	dfprk_rkd_listdata.order_by = 'input_time';
//	dfprk_rkd_listdata.order_sort = '0';
//console.log(1)
//}, function(i) {
	//_this.children(".price_icon").removeClass("up").addClass("down");
//	dfprk_rkd_listdata.order_by = 'input_time';
//	dfprk_rkd_listdata.order_sort = '1';
//	dfprk_rkd_listajax()
//console.log(0)
//})
	dfprk_rkd_listajax()
//		$(this).trigger('click');
	})

var rkdfenpeiriqi=0;
$('.rkgl_rkd_paixufenpeiriqi_xxl').die().live('click',function(){
	rkdfenpeiriqi++;
	if(rkdfenpeiriqi%2==0){
		dfprk_rkd_listdata.order_sort = '0';
	}else{
		dfprk_rkd_listdata.order_sort = '1';
	}
	dfprk_rkd_listdata.order_by = 'create_time';
	dfprk_rkd_listajax()
})
//$('.rkgl_rkd_paixufenpeiriqi_xxl').toggle(function() {
//	$(this).children(".price_icon").removeClass("down").addClass("up");
//	dfprk_rkd_listdata.order_by = 'create_time';
//	dfprk_rkd_listdata.order_sort = '0';
//	dfprk_rkd_listajax()
//}, function() {
//	$(this).children(".price_icon").removeClass("up").addClass("down");
//	dfprk_rkd_listdata.order_by = 'create_time';
//	dfprk_rkd_listdata.order_sort = '1';
//	dfprk_rkd_listajax()
//})

function dfprk_rkd_listajax() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "stock-in/list",
		data: dfprk_rkd_listdata,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data)
				$('.rkgl_rkd_listtbody_xxl').html('');
				$('.rkgl_rkdlist_errhtml_xxl').css('display', 'block');
				$('.rkgl_fenye_rukudan_xxl').css('display', 'none');
			} else {
				console.log(data);
				$('.rkgl_rkd_mainlistnums_xxl').html(data.totalcount);
				var rkd_list = data['dataList'],
					rkd_html = '';
				if(rkd_list.length == 0) {
					$('.rkgl_rkd_listtbody_xxl').html('');
					$('.rkgl_rkdlist_errhtml_xxl').css('display', 'block');
					$('.rkgl_fenye_rukudan_xxl').css('display', 'none');
				} else {
					$('.rkgl_rkdlist_errhtml_xxl').css('display', 'none');
					$('.rkgl_fenye_rukudan_xxl').css('display', 'block');
					$.each(rkd_list, function(i, v) {
						if(v.is_cancel == 1) {
							rkd_html += '<tr class="c_c"><td><span class="voidIcon">作废</span></td>';
							rkd_html += '<td>' + likNullData(v.input_time) + '</td>';
							rkd_html += '<td>' + likNullData(v.create_time) + '</td>';
							rkd_html += '<td>' + likNullData(v.number) + '</td>';
							rkd_html += '<td>' + likNullData(v.related_receipts_no) + '</td>';
							if(v.input_type == 1) {
								rkd_html += '<td>销售退货</td>';
							} else if(v.input_type == 2) {
								rkd_html += '<td>借入入库</td>';
							} else if(v.input_type == 3) {
								rkd_html += '<td>借出归还</td>';
							} else if(v.input_type == 4) {
								rkd_html += '<td>销售换货</td>';
							} else if(v.input_type == 5){
								rkd_html += '<td>采购入库</td>';//
							}else {
								rkd_html += '<td>采购换货</td>';
							}

							rkd_html += '<td>' + likNullData(v.warehouse_name) + '</td>';
							rkd_html += '<td>' + likNullData(v.input_num) + '</td>';
							rkd_html += '<td>' + likNullData(v.distribution_num) + '</td>';
							rkd_html += '<td>' + likNullData(v.set_num) + '</td>';
							rkd_html += '<td>' + likNullData(v.set_distribution_num) + '</td>';
							rkd_html += '<td>' + likNullData(v.break_num) + '</td>';
							if(v.input_status == 1) {
								rkd_html += '<td><span class="c_r">未入库</span></td>';
							} else if(v.input_status == 2) {
								rkd_html += '<td><span class="c_y">部分入库</span></td>';
							} else {
								rkd_html += '<td><span class="c_g">完成入库</span></td>';
							}
							rkd_html += '<td>' + likNullData(v.distribution_name) + '</td>';
							rkd_html += '<td>' + likNullData(v.input_name) + '</td>';
							rkd_html += '<td><button class="but_mix but_look val_dialog but_look rkgl_rkd_chakanbtn_xxl" name="storage_rfgl_rkdfprkxq" uid="' + v.id + '">查看</button></td></tr>';
						} else {
							rkd_html += '<tr><td>' + Appendzero(i + 1) + '</td>';
							rkd_html += '<td>' + likNullData(v.input_time) + '</td>';
							rkd_html += '<td>' + likNullData(v.create_time) + '</td>';
							rkd_html += '<td>' + likNullData(v.number) + '</td>';
							rkd_html += '<td>' + likNullData(v.related_receipts_no) + '</td>';
							if(v.input_type == 1) {
								rkd_html += '<td>销售退货</td>';
							} else if(v.input_type == 2) {
								rkd_html += '<td>借入入库</td>';
							} else if(v.input_type == 3) {
								rkd_html += '<td>借出归还</td>';
							} else if(v.input_type == 4) {
								rkd_html += '<td>销售换货</td>';
							} else if(v.input_type == 5){
								rkd_html += '<td>采购入库</td>';
							}else {
								rkd_html += '<td>采购换货</td>';
							}
							rkd_html += '<td>' + likNullData(v.warehouse_name) + '</td>';
							rkd_html += '<td>' + likNullData(v.input_num) + '</td>';
							rkd_html += '<td>' + likNullData(v.distribution_num) + '</td>';
							rkd_html += '<td>' + likNullData(v.set_num) + '</td>';
							rkd_html += '<td>' + likNullData(v.set_distribution_num) + '</td>';
							rkd_html += '<td>' + likNullData(v.break_num) + '</td>';
							if(v.input_status == 1) {
								rkd_html += '<td><span class="c_r">未入库</span></td>';
							} else if(v.input_status == 2) {
								rkd_html += '<td><span class="c_y">部分入库</span></td>';
							} else {
								rkd_html += '<td><span class="c_g">完成入库</span></td>';
							}
							rkd_html += '<td>' + likNullData(v.distribution_name) + '</td>';
							rkd_html += '<td>' + likNullData(v.input_name) + '</td>';
							if(v.input_status == 3) {
								rkd_html += '<td><button class="but_mix but_look val_dialog but_look rkgl_rkd_chakanbtn_xxl" name="storage_rfgl_rkdfprkxq" uid="' + v.id + '">查看</button></td>';
							} else {
								var fprk='stock-in/add',blrk='stock-in/in';
								if(loginUserInfo['company_admin'] != 1){
									if(loginUserInfo.powerUrls.length==0){
										rkd_html += '<td></td></tr>';
									}else{
										var arr = loginUserInfo.powerUrls;//
										if($.inArray(blrk, arr)!=-1){
											rkd_html += '<td><button class="but_mix but_look val_dialog rkgl_rkd_banlirk_btnxxl" name="crk_rkgl_dealRK_cg" uid="' + v.id + '">办理入库</button></td></tr>';
										}else{
											rkd_html += '<td></td></tr>';
										}
									}
								}else if(loginUserInfo['company_admin'] == 1){
									rkd_html += '<td><button class="but_mix but_look val_dialog rkgl_rkd_banlirk_btnxxl" name="crk_rkgl_dealRK_cg" uid="' + v.id + '">办理入库</button></td></tr>';
								}
								
								//rkd_html += '<td><button class="but_mix but_look val_dialog rkgl_rkd_banlirk_btnxxl" name="crk_rkgl_dealRK_cg" uid="' + v.id + '">办理入库</button></td></tr>';

							}

						}
					});
					$('.rkgl_rkd_listtbody_xxl').html(rkd_html);
					list_table_render_pagination(".rkgl_fenye_rukudan_xxl", dfprk_rkd_listdata, dfprk_rkd_listajax, data.totalcount, rkd_list.length);
					likShow('#rkgl_rkd_xzckx_tablexxl', rkgl_rkd_xzckx_listxxl, '#rkgl_rkd_xzckxullist_xxl', '#rkgl_rkd_xzckx_bcbtnxxl', '#rkgl_rkd_xzckx_hfmrbtnxxl');
				}
			}
		},
		error: function(e) {
			console.log(e)
			$('.rkgl_rkd_listtbody_xxl').html('');
			$('.rkgl_rkdlist_errhtml_xxl').css('display', 'block');
			$('.rkgl_fenye_rukudan_xxl').css('display', 'none');
		}
	});
}
//列表切换
$('.rkgl_mainlist_qiehuan_btnxxl li').die().live('click', function() {
		//console.log($(this).attr('typeid'))
		if($(this).attr('typeid') == 1) {
			$('.rkgl_dfprk_ssvalue_xxl').attr('value','搜索关联单据编号/相关往来名称').css('color','rgb(204, 204, 204)');
			rkgl_dfprk_data.key='';
			rkgl_dfprk_ajax()
		} else {
			$('.rkgl_rkd_ssvaluexxl').attr('value','搜索关联单据编号').css('color','rgb(204, 204, 204)');
			dfprk_rkd_listdata.key='';
			dfprk_rkd_listajax();
		}
	})
	//搜索
//function rkgl_rkd_ssnows(val) {
//	dfprk_rkd_listdata.key = val;
//	dfprk_rkd_listajax();
//}
$('.rkgl_rkd_ssbtnxxl').die().live('click', function() {
		if($(this).prev().val() == '' || $(this).prev().val() == '搜索关联单据编号') {
			dfprk_rkd_listdata.key='';
		} else {
			dfprk_rkd_listdata.key = $(this).prev().val();
			
		}
		dfprk_rkd_listajax()
	})
	////不显示完成入库
$('.rkgl_rkd_bxswcrk_showxxl').die().live('click', function() {
		if($(this).prop("checked")) {
			dfprk_rkd_listdata.input_status = '1,2';
			dfprk_rkd_listajax()
		} else {
			dfprk_rkd_listdata.input_status = '';
			dfprk_rkd_listajax()
		}
	})
	//入库单-高级搜索
$('.rkflrkd_rukuren_xxlvalue,.rkflrkd_rukuren_xxlvalue+i').die().live('click',function(){
	$.ajax({
		type:"get",
		url:SERVER_URL+"stock-in/alluser",
		dataType:'json',
		data:{token:token},
		success:function(data){
			if(data.code!=0){
				console.log(data)
			}else{
				console.log(data);
				var rkrdata=data['data'],rkrhtml='';
				$.each(rkrdata.inputNameList, function(i,v) {
					rkrhtml +='<li uid="'+v.id+'">'+v.name+'</li>'
				});
				$('.rkgl_rkd_gjss_rkrlist_xxl').html(rkrhtml)
			}
		},
		error:function(e){
			console.log(e)
		}
	});
})
$('.rkgl_rkd_gjssrklx_xxl li').die().live('click', function() {
	dfprk_rkd_listdata.input_type = $(this).attr('typeid');
	dfprk_rkd_listajax()
})
$('.rkgl_rkd_gjssrkzt_xxl li').die().live('click', function() {
	dfprk_rkd_listdata.input_status = $(this).attr('typeid');
	dfprk_rkd_listajax()
})
$('.rkgl_rkd_gjss_kflist_xxl li').die().live('click', function() {
	dfprk_rkd_listdata.warehouse_id = $(this).attr('uid');
	dfprk_rkd_listajax()
})
$('.rkgl_rkd_gjss_rkrlist_xxl li').die().live('click', function() {
		dfprk_rkd_listdata.input_name = $(this).attr('uid');
		dfprk_rkd_listajax()
	})
	//入库单查看按钮
var rkd_chakxq_dataxxl = {
	token: token,
	id: '',
	detail: '1',
	clickType:'1'
}

function rkd_chakanxq_ajax() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "stock-in/infobyid",
		data: rkd_chakxq_dataxxl,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data)
			} else {
				console.log(data)
				var rkdtwo = data['data'];
				$('.tanceng .rkgl_rkdcktwo_fprq_xxl').html(likNullData(rkdtwo.create_time));
				$('.tanceng .rkgl_rkdckt_fpr_xxl').html(likNullData(rkdtwo.distribution_name));
				$('.tanceng .rkgl_rkdt_gldjbhsxxl').html(likNullData(rkdtwo.related_receipts_no));
				$('.tanceng .rkgl_rkdt_rkdbhxxl').html(likNullData(rkdtwo.number));
				$('.tanceng .rkgl_rkdt_rkkfxxl').html(likNullData(rkdtwo.warehouse_name));
				$('.tanceng .rkgl_rkdt_rkrxxl').html(likNullData(rkdtwo.input_name));
				$('.tanceng .rkgl_rkdt_rkdatasxxl').html(likNullData(rkdtwo.input_time));
				if(rkdtwo.input_type == 1) {
					$('.tanceng .rkgl_rkdt_twock_rklxxxl').html('入库单-销售退货');
				} else if(rkdtwo.input_type == 2) {
					$('.tanceng .rkgl_rkdt_twock_rklxxxl').html('入库单-借入入库');
				} else if(rkdtwo.input_type == 3) {
					$('.tanceng .rkgl_rkdt_twock_rklxxxl').html('入库单-借出归还');
				} else if(rkdtwo.input_type == 4) {
					$('.tanceng .rkgl_rkdt_twock_rklxxxl').html('入库单-销售换货');
				} else if(rkdtwo.input_type == 5) {
					$('.tanceng .rkgl_rkdt_twock_rklxxxl').html('入库单-采购入库');
				} else if(rkdtwo.input_type == 6) {
					$('.tanceng .rkgl_rkdt_twock_rklxxxl').html('入库单-采购换货');
				}
				var rt_plist = rkdtwo.productList,
					rt_phtml = '',
					hjrknum = [],
					hjyrksl = [];
				if(rt_plist.length == 0) {
					$('.tanceng .rkgl_rkdtwo_listhtmlxxl').html('');
					$('.tanceng .rkgl_rkdchakakn_errhtml_xxl').html('<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>');
				} else {
					$('.tanceng .rkgl_rkdchakakn_errhtml_xxl').html('');
					$.each(rt_plist, function(i, v) {
						rt_phtml += '<tr><td>' + Appendzero(i + 1) + '</td>';
						if(v.product_type == 1) {
							rt_phtml += '<td>' + likNullData(v.code_sn) + '</td>';
							rt_phtml += '<td>' + likNullData(v.product_name) + '/' + likNullData(v.format) + '</td>';
						} else {
							rt_phtml += '<td>' + likNullData(v.product_type_no) + '</td>';
							rt_phtml += '<td>' + likNullData(v.product_type_name) + '/' + likNullData(v.set_format) + '' + likNullData(v.product_type_tag) + '</td>';
						}
						rt_phtml += '<td><p class="xiangmu_p1">' + likNullData(v.attr_name) + '</p></td>';
						rt_phtml += '<td>' + likNullData(v.unit_name) + '</td>';
						if(v.product_type==3){
							rt_phtml += '<td>-</td>';
							rt_phtml += '<td>-</td>';
							rt_phtml += '<td>' + likNullData(v.input_num) + '</td>';
							rt_phtml += '<td>' + likNullData(v.distribution_num) + '</td>';
							rt_phtml += '<td>' + likNullData(v.break_num) + '</td>';
						}else{
							rt_phtml += '<td>' + likNullData(v.input_num) + '</td>';
							rt_phtml += '<td>' + likNullData(v.distribution_num) + '</td>';
							rt_phtml += '<td>-</td>';
							rt_phtml += '<td>-</td>';
							rt_phtml += '<td>-</td>';
						}
						
						if(v.status == 1) {
							rt_phtml += '<td><span class="c_r">待入库</span></td>';
						} else if(v.status == 2) {
							rt_phtml += '<td><span class="c_y">入库中</span></td>';
						} else {
							rt_phtml += '<td><span class="c_g">完成入库</span></td>';
						}
						//rt_phtml +='<td><span class="f_color val_dialogTop" uid="'+v.id+'" name="crk_rkgl_ckxlhSN" style="cursor: pointer;">查看</span></td>';
						if(v.product_type==3){
							if(parseInt(v.break_num) < parseInt(v.distribution_num)){
									//console.log(v.break_num+'::'+v.distribution_num)
									rt_phtml += '<td><button class="but_mix val_dialogTop rkdbanlirk_rkxqzhengjibtn_xxl" uid="' + v.id + '" name="crk_rkgl_rkxqa_zj">查看</button><button class="but_mix val_dialogTop rkdan_rupeijian_btnxxl" name="crk_rkgl_dealRK_zhengji_and_pejian" uid="'+v.id+'" spbh="' + likNullData(v.product_type_no) + '" sp="' + likNullData(v.product_type_name) + ' 属性：' + likNullData(v.format) + '" rksl="' + likNullData(v.input_num) + '" yrknum="' + likNullData(v.distribution_num) + '">入配件</button></td>';
								}else{
									rt_phtml += '<td><button class="but_mix val_dialogTop rkdbanlirk_rkxqzhengjibtn_xxl" uid="' + v.id + '" name="crk_rkgl_rkxqa_zj">查看</button></td>';
								}
								//rt_phtml += '<td><button class="but_mix val_dialogTop rkdbanlirk_rkxqzhengjibtn_xxl" uid="' + v.id + '" name="crk_rkgl_rkxqa_zj">查看</button></td>';
							}else{
								rt_phtml += '<td><button class="but_mix val_dialogTop rkdbanlirk_rkxqbtn_xxl" uid="' + v.id + '" name="crk_rkgl_rkxqa">查看</button></td>';
							}
						hjrknum.push(v.input_num)
						hjyrksl.push(v.distribution_num);
					});
					$('.rkgl_rkdtwo_listhtmlxxl').html(rt_phtml);
					var rknum = 0,
						yrksl = 0;
					$.each(hjrknum, function(i, v) {
						rknum += parseInt(v);
					});
					$.each(hjyrksl, function(i, v) {
						yrksl += parseInt(v);
					});
					$('.tanceng .rkgl_rkdtwo_rkslmainnums_xxl').html(rknum)
					$('.tanceng .rkgl_rkdtwo_yrkslmainnumsxxl').html(yrksl)
				}

			}
			//
//			if(data.code != 0) {
//				console.log(data)
//			} else {
//				console.log(data);
//				var rkdlist = data['data'];
//				if(rkdlist.input_type == 1) {
//					$('.kfgl_rkd_cktitxxl').html('入库管理-销售退货');
//					$('.rkgl_rkd_ckxq_rklxxxl').html('销售退货')
//				} else if(rkdlist.input_type == 2) {
//					$('.kfgl_rkd_cktitxxl').html('入库管理-采购入库');
//					$('.rkgl_rkd_ckxq_rklxxxl').html('采购入库')
//				} else if(rkdlist.input_type == 3) {
//					$('.kfgl_rkd_cktitxxl').html('入库管理-调拨');
//					$('.rkgl_rkd_ckxq_rklxxxl').html('调拨')
//				} else if(rkdlist.input_type == 4) {
//					$('.kfgl_rkd_cktitxxl').html('入库管理-借入');
//					$('.rkgl_rkd_ckxq_rklxxxl').html('借入')
//				} else if(rkdlist.input_type == 5) {
//					$('.kfgl_rkd_cktitxxl').html('入库管理-借出归还');
//					$('.rkgl_rkd_ckxq_rklxxxl').html('借出归还')
//				} else {
//					$('.kfgl_rkd_cktitxxl').html('入库管理-换货入库');
//					$('.rkgl_rkd_ckxq_rklxxxl').html('换货入库')
//				}
//				$('.rkgl_rkd_ckxqcjrq_xxl').html(rkdlist.create_time);
//				$('.rkgl_rkd_ckxqchakanbtn_xxl').attr('uid', rkdlist.id);
//				$('.rkgl_rkd_ckxq_cjdaysxxl').html(rkdlist.create_time);
//				$('.rkgl_rkd_ckxq_rkbhxxl').html(rkdlist.number);
//				$('.rkgl_rkd_ckxq_gldjbhxxl').html(rkdlist.related_receipts_no);
//				$('.rkgl_rkd_ckxqrkkf_xxl').html(rkdlist.warehouse_name);
//				$('.rkgl_rkd_ckxqrksl_xxl').html(rkdlist.input_num);
//				$('.rkgl_rkd_ckxq_yrkslxxl').html(rkdlist.distribution_num);
//				if(rkdlist.input_status == 1) {
//					$('.rkgl_rkd_ckxqrkzt_statusxxl').html('待入库');
//				} else if(rkdlist.input_status == 2) {
//					$('.rkgl_rkd_ckxqrkzt_statusxxl').html('部分入库');
//				} else {
//					$('.rkgl_rkd_ckxqrkzt_statusxxl').html('完成入库');
//				}
//				$('.rkgl_rkd_ckxqrkr_namexxl').html(rkdlist.input_name);
//				$('.rkgl_rkd_ckxqbeizhu_xxl').html(rkdlist.remark);
//
//			}
		},
		error: function(e) {
			console.log(e)
		}
	});
}
$('.rkgl_rkd_chakanbtn_xxl').die('click').live('click', function() {
		rkd_chakxq_dataxxl.id = $(this).attr('uid');
		rkd_chakanxq_ajax();
	})
	//入库单查看里的查看详情
var rkdck_ckxq_dataxxl = {
	token: token,
	id: '',
	detail: '1'
}

function rkdck_ckxq_ajaxxxl() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "stock-in/infobyid",
		data: rkdck_ckxq_dataxxl,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data)
			} else {
				console.log(data)
				var rkdtwo = data['data'];
				$('.tanceng .rkgl_rkdcktwo_fprq_xxl').html(likNullData(rkdtwo.distribution_time));
				$('.tanceng .rkgl_rkdckt_fpr_xxl').html(likNullData(rkdtwo.distribution_name));
				$('.tanceng .rkgl_rkdt_gldjbhsxxl').html(likNullData(rkdtwo.related_receipts_no));
				$('.tanceng .rkgl_rkdt_rkdbhxxl').html(likNullData(rkdtwo.number));
				$('.tanceng .rkgl_rkdt_rkkfxxl').html(likNullData(rkdtwo.warehouse_name));
				$('.tanceng .rkgl_rkdt_rkrxxl').html(likNullData(rkdtwo.input_name));
				$('.tanceng .rkgl_rkdt_rkdatasxxl').html(likNullData(rkdtwo.create_time));
				if(rkdtwo.input_type == 1) {
					$('.tanceng .rkgl_rkdt_twock_rklxxxl').html('入库单-销售退货');
				} else if(rkdtwo.input_type == 2) {
					$('.tanceng .rkgl_rkdt_twock_rklxxxl').html('入库单-借入入库');
				} else if(rkdtwo.input_type == 3) {
					$('.tanceng .rkgl_rkdt_twock_rklxxxl').html('入库单-借出归还');
				} else if(rkdtwo.input_type == 4) {
					$('.tanceng .rkgl_rkdt_twock_rklxxxl').html('入库单-销售换货');
				} else if(rkdtwo.input_type == 5) {
					$('.tanceng .rkgl_rkdt_twock_rklxxxl').html('入库单-采购入库');
				} else if(rkdtwo.input_type == 6) {
					$('.tanceng .rkgl_rkdt_twock_rklxxxl').html('入库单-采购换货');
				}
				var rt_plist = rkdtwo.productList,
					rt_phtml = '',
					hjrknum = [],
					hjyrksl = [];
				if(rt_plist.length == 0) {
					$('.rkgl_rkdtwo_listhtmlxxl').html('');
				} else {
					$.each(rt_plist, function(i, v) {
						rt_phtml += '<tr><td>' + Appendzero(i + 1) + '</td>';
						if(v.product_type == 1) {
							rt_phtml += '<td>' + likNullData(v.code_sn) + '</td>';
							rt_phtml += '<td>' + likNullData(v.product_name) + '/' + likNullData(v.format) + '</td>';
						} else {
							rt_phtml += '<td>' + likNullData(v.product_type_no) + '</td>';
							rt_phtml += '<td>' + likNullData(v.product_type_name) + '/' + likNullData(v.set_format) + '' + likNullData(v.product_type_tag) + '</td>';
						}
						rt_phtml += '<td>' + likNullData(v.attr_name) + '</td>';
						rt_phtml += '<td>' + likNullData(v.unit_name) + '</td>';
						rt_phtml += '<td>' + likNullData(v.input_num) + '</td>';
						rt_phtml += '<td>' + likNullData(v.distribution_num) + '</td>';
						if(v.status == 1) {
							rt_phtml += '<td><span class="c_r">待入库</span></td>';
						} else if(v.status == 2) {
							rt_phtml += '<td><span class="c_y">入库中</span></td>';
						} else {
							rt_phtml += '<td><span class="c_g">完成入库</span></td>';
						}
						rt_phtml += '<td><span class="f_color val_dialogTop rkgl_rkdckxlhao_ckbtnxxl" name="crk_rkgl_ckxlhSNpz" style="cursor: pointer;" uid="' + v.id + '">查看</span></td></tr>';
						hjrknum.push(v.input_num)
						hjyrksl.push(v.distribution_num);
					});
					$('.rkgl_rkdtwo_listhtmlxxl').html(rt_phtml);
					var rknum = 0,
						yrksl = 0;
					$.each(hjrknum, function(i, v) {
						rknum += parseInt(v);
					});
					$.each(hjyrksl, function(i, v) {
						yrksl += parseInt(v);
					});
					$('.tanceng .rkgl_rkdtwo_rkslmainnums_xxl').html(rknum)
					$('.tanceng .rkgl_rkdtwo_yrkslmainnumsxxl').html(yrksl)
				}

			}
		},
		error: function(e) {
			console.log(e)
		}
	});
}
$('.rkgl_rkd_ckxqchakanbtn_xxl').die('click').live('click', function() {
		rkdck_ckxq_dataxxl.id = $(this).attr('uid');
		rkdck_ckxq_ajaxxxl();
	})
	//查看序列号
var rkgl_rkdckxlhao_dataxxl = {
	token: token,
	id: ''
}

function rkgl_rkdckxlhao_ajax() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "stock-in/listsn",
		data: rkgl_rkdckxlhao_dataxxl,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data);
				$('.tanceng .rkglrkd_ckxlhao_listhtml_xxl').html('');
				var xlr_err = '';
				xlr_err += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
				$('.tanceng .rkglrkd_ckxlhao_errhtml_xxl').html(xlr_err);
			} else {
				console.log(data);
				var xlh_list = data['data'];
				$('.tanceng .rkglrkd_ckxlhao_rksl_xxl').html(xlh_list.input_num);
				$('.tanceng .rkglrkd_ckxlhao_yrknums_xxl').html(xlh_list.distribution_num);
				var xlh_td = xlh_list.snList,
					xlh_html = '';
				if(xlh_td.length == 0) {
					$('.tanceng .rkglrkd_ckxlhao_listhtml_xxl').html('');
					var xlr_err = '';
					xlr_err += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
					$('.tanceng .rkglrkd_ckxlhao_errhtml_xxl').html(xlr_err);
				} else {
					$('.tanceng .rkglrkd_ckxlhao_errhtml_xxl').html('');
					$.each(xlh_td, function(i, v) {
						xlh_html += '<tr><td>' + likNullData(v.sn) + '</td>';
						xlh_html += '<td>' + likNullData(v.serial_number) + '</td></tr>';
					});
					$('.tanceng .rkglrkd_ckxlhao_listhtml_xxl').html(xlh_html);
				}
			}
		},
		error: function(e) {
			//console.log(e)
			$('.tanceng .rkglrkd_ckxlhao_listhtml_xxl').html('');
			var xlr_err = '';
			xlr_err += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
			$('.tanceng .rkglrkd_ckxlhao_errhtml_xxl').html(xlr_err);
		}
	});
}
$('.tanceng .rkgl_rkdckxlhao_ckbtnxxl').die('click').live('click', function() {
		rkgl_rkdckxlhao_dataxxl.id = $(this).attr('uid');
		rkgl_rkdckxlhao_ajax()
	})
	//办理入库
var rkd_banlrk_listdata = {
	token: token,
	id: '',
	detail: '1',
	clickType:'0'
}

function rkd_banlrk_listajax() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "stock-in/infobyid",
		data: rkd_banlrk_listdata,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data)
			} else {
				console.log(data);
				var rkdtwo = data['data'];
				$('.tanceng .rkdbanlirk_fprq_xxl').html(likNullData(rkdtwo.create_time));
				$('.tanceng .rkdbanlirk_fpr_xxl').html(likNullData(rkdtwo.distribution_name));
				$('.tanceng .rkdbanlirk_glajbh_xxl').html(likNullData(rkdtwo.related_receipts_no));
				$('.tanceng .rkdbanlirk_rkdbh_xxl').html(likNullData(rkdtwo.number));
				$('.tanceng .rkdbanlirk_rkkf_xxl').html(likNullData(rkdtwo.warehouse_name));
				$('.tanceng .rkdbanlirk_rkr_xxl').html(likNullData(rkdtwo.input_name));

				if(rkdtwo.input_type == 1) {
					$('.tanceng .rkdbanlirk_rkdtit_hxxl').html('入库单-销售退货');
				} else if(rkdtwo.input_type == 2) {
					$('.tanceng .rkdbanlirk_rkdtit_hxxl').html('入库单-借入入库');
				} else if(rkdtwo.input_type == 3) {
					$('.tanceng .rkdbanlirk_rkdtit_hxxl').html('入库单-借出归还');
				} else if(rkdtwo.input_type == 4) {
					$('.tanceng .rkdbanlirk_rkdtit_hxxl').html('入库单-销售换货');
				} else if(rkdtwo.input_type == 5) {
					$('.tanceng .rkdbanlirk_rkdtit_hxxl').html('入库单-采购入库');
				} else if(rkdtwo.input_type == 6) {
					$('.tanceng .rkdbanlirk_rkdtit_hxxl').html('入库单-采购换货');
				}
				var rt_plist = rkdtwo.productList,
					rt_phtml = '',
					hjrknum = [],
					hjyrksl = [],
					zjrksl = [],
					zjyrknum = [],
					zjcxsl = [];
				if(rt_plist.length == 0) {
					$('.rkdbanlirk_tablist_htmlxxl').html('');
				} else {
					rt_phtml = '';
					$.each(rt_plist, function(i, v) {
						rt_phtml += '<tbody><tr><td class="noprint">' + Appendzero(i + 1) + '</td>';
						if(v.product_type!=3) {
							rt_phtml += '<td>' + likNullData(v.code_sn) + '</td>';
							rt_phtml += '<td>' + likNullData(v.product_name) + '</td>';
						} else {
							rt_phtml += '<td>' + likNullData(v.product_type_no) + '</td>';
							//if(v.product_type_tag == '整入') {
								if(v.pieceList.length==0){
									rt_phtml += '<td>' + likNullData(v.product_type_name) + '<span class="storage_single_circle but_blue">无配件</span></td>';	
								}else{
									rt_phtml += '<td>' + likNullData(v.product_type_name) + '<span class="storage_single_circle but_blue box_open_btn_1 noprint">展开</span></td>';
								}
								
//							} else {
//								rt_phtml += '<td>' + likNullData(v.product_type_name) + '/' + likNullData(v.set_format) + '<span class="storage_single_circle but_blue">' + likNullData(v.product_type_tag) + '</span></td>';
//							}
						}
						rt_phtml += '<td><p class="xiangmu_p1">' + likNullData(v.attr_name) + '</p></td>';
						rt_phtml += '<td class="noprint">' + likNullData(v.unit_name) + '</td>';
						if(v.product_type==3){
							rt_phtml += '<td class="cru_print_goodstotal">-</td>';
							rt_phtml += '<td class="cru_print_goodstotal">-</td>';
							rt_phtml += '<td class="cru_print_goodstotal">' + likNullData(v.input_num) + '</td>';
							rt_phtml += '<td class="noprint">' + likNullData(v.distribution_num) + '</td>';
							rt_phtml += '<td class="noprint">' + likNullData(v.break_num) + '</td>';
							zjrksl.push(v.input_num);
							zjyrknum.push(v.distribution_num);
							zjcxsl.push(v.break_num);
						}else{
							rt_phtml += '<td class="cru_print_goodstotal">' + likNullData(v.input_num) + '</td>';
							rt_phtml += '<td class="cru_print_goodstotal">' + likNullData(v.distribution_num) + '</td>';
							rt_phtml += '<td class="cru_print_goodstotal">-</td>';
							rt_phtml += '<td class="noprint">-</td>';
							rt_phtml += '<td class="noprint">-</td>';
							hjrknum.push(v.input_num)
							hjyrksl.push(v.distribution_num);
						}

						
						if(v.status == 1) {
							rt_phtml += '<td class="noprint"><span class="c_r">待入库</span></td>';
						} else if(v.status == 2) {
							rt_phtml += '<td class="noprint"><span class="c_y">入库中</span></td>';
						} else {
							rt_phtml += '<td class="noprint"><span class="c_g">完成入库</span></td>';
						}
//						rt_phtml += '<td><span class="f_color val_dialogTop rkd_banlirkckxlhao_btnxxl" name="crk_rkgl_ckxlhSNpz" style="cursor: pointer;" uid="' + v.id + '">查看</span></td>';
						if(v.status==3){
							if(v.product_type==3){
								if(parseInt(v.break_num) < parseInt(v.distribution_num)){
									//console.log(v.break_num+'::'+v.distribution_num)
									rt_phtml += '<td class="noprint"><button class="but_mix val_dialogTop rkdbanlirk_rkxqzhengjibtn_xxl" uid="' + v.id + '" name="crk_rkgl_rkxqa_zj">查看</button><button class="but_mix val_dialogTop rkdan_rupeijian_btnxxl" name="crk_rkgl_dealRK_zhengji_and_pejian" uid="'+v.id+'" spbh="' + likNullData(v.product_type_no) + '" sp="' + likNullData(v.product_type_name) + ' 属性：' + likNullData(v.format) + '" rksl="' + likNullData(v.input_num) + '" yrknum="' + likNullData(v.distribution_num) + '">入配件</button></td>';
								}else{
									rt_phtml += '<td class="noprint"><button class="but_mix val_dialogTop rkdbanlirk_rkxqzhengjibtn_xxl" uid="' + v.id + '" name="crk_rkgl_rkxqa_zj">查看</button></td>';
								}
								
							}else{
								rt_phtml += '<td class="noprint"><button class="but_mix val_dialogTop rkdbanlirk_rkxqbtn_xxl" uid="' + v.id + '" name="crk_rkgl_rkxqa">查看</button></td>';
							}
							
						}else{
							if(v.product_type==3){
								rt_phtml += '<td class="noprint"><button class="but_mix val_dialogTop rkdbanlirk_rkxqzhengjibtn_xxl" uid="' + v.id + '" name="crk_rkgl_rkxqa_zj">查看</button><button class="but_mix val_dialogTop rkdbanlirk_zhengjirk_btnxxl" uid="' + v.id + '" name="crk_rkgl_dealRK_rkazr" spbh="' + likNullData(v.product_type_no) + '" sp="' + likNullData(v.product_type_name) + ' 属性：' + likNullData(v.format) + '" rksl="' + likNullData(v.input_num) + '" yrknum="' + likNullData(v.distribution_num) + '">入库</button><button class="but_mix val_dialogTop rkdan_rupeijian_btnxxl" name="crk_rkgl_dealRK_zhengji_and_pejian" uid="'+v.id+'" spbh="' + likNullData(v.product_type_no) + '" sp="' + likNullData(v.product_type_name) + ' 属性：' + likNullData(v.format) + '" rksl="' + likNullData(v.input_num) + '" yrknum="' + likNullData(v.distribution_num) + '">入配件</button></td>';
							}else{
								rt_phtml += '<td class="noprint"><button class="but_mix val_dialogTop rkdbanlirk_rkxqbtn_xxl" gldjbh="' + rkdtwo.related_receipts_no + '" uid="' + v.id + '" name="crk_rkgl_rkxqa">查看</button><button class="but_mix val_dialogTop rkdbanlirk_peijianrk_btnxxl" uid="' + v.id + '" name="crk_rkgl_dealRK_rka" spbh="' + likNullData(v.code_sn) + '" sp="' + likNullData(v.product_name) + ' 属性: ' + likNullData(v.attr_name) + '" rksl="' + likNullData(v.input_num) + '" yrknum="' + likNullData(v.distribution_num) + '">入库</button></td>';
							}
//							if(v.product_type_tag == '配件') {
//							rt_phtml += '<td><button class="but_mix val_dialogTop rkdbanlirk_rkxqbtn_xxl" gldjbh="' + rkdtwo.related_receipts_no + '" uid="' + v.id + '" name="crk_rkgl_rkxqa">查看</button><button class="but_mix val_dialogTop rkdbanlirk_peijianrk_btnxxl" uid="' + v.id + '" name="crk_rkgl_dealRK_rkazrPz" spbh="' + v.product_type_no + '" sp="' + v.product_type_name + '/' + v.set_format + '" rksl="' + v.input_num + '" yrknum="' + v.distribution_num + '">入库</button></td>';
//						} else {
//							if(v.product_type_tag == '整入') {
//								rt_phtml += '<td><button class="but_mix val_dialogTop rkdbanlirk_rkxqbtn_xxl" gldjbh="' + rkdtwo.related_receipts_no + '" uid="' + v.id + '" name="crk_rkgl_rkxqa">查看</button><button class="but_mix val_dialogTop rkdbanlrk_spzrrk_btnxxl" uid="' + v.id + '" name="crk_rkgl_dealRK_rkazr" typeid="1" spbh="' + v.product_type_no + '" sp="' + v.product_type_name + '/' + v.set_format + '" rksl="' + v.input_num + '" yrknum="' + v.distribution_num + '">入库</button></td>';
//							} else {
//								rt_phtml += '<td><button class="but_mix val_dialogTop rkdbanlirk_rkxqbtn_xxl" gldjbh="' + rkdtwo.related_receipts_no + '" uid="' + v.id + '" name="crk_rkgl_rkxqa">查看</button><button class="but_mix val_dialogTop rkdbanlrk_spzrrk_btnxxl" uid="' + v.id + '" name="crk_rkgl_dealRK_rkazr" typeid="0" spbh="' + v.code_sn + '" sp="' + v.product_name + '/' + v.format + '" rksl="' + v.input_num + '" yrknum="' + v.distribution_num + '">入库</button></td>';
//							}
//
//						}
						}
						

						
						if(v.product_type==3){
							if(v.pieceList.length==0){
								
							}else{
								var zjtbody='',zjlist='';
								zjtbody +='<tbody style="display: none;background: #f7f7f7;" class="cru_zhankai_aaa cru_print_pj_tbody">';
                                zjtbody +='<tr>';       
                                zjtbody +='<td colspan="12" style="background: #f2f2f2;" class="noprint"><span style="border-left:4px solid #23a2f3;padding-left: 10px;display: inline-block;">配件内容</span></td>';
								$.each(v.pieceList, function(j,m) {
									zjlist +='<tr class="cru_print_ckd_pj_tr">';
                                    zjlist +='<td colspan="2" class="noprint">'+likNullData(m.product_name)+'</td>';
                                    zjlist +='<td colspan="6" class="noprint"><p class="xiangmu_p3">'+likNullData(m.attr_name)+'</p></td>';
                                    zjlist +='<td colspan="2" class="noprint">'+likNullData(m.num)+'</td>';
                                    zjlist +='<td colspan="2" class="noprint">'+likNullData(m.input_num)+'</td>';
									zjlist +='<td class="none">'+likNullData(m.product_name)+'</td>';
									zjlist +='<td class="none">'+likNullData(m.num)+'</td>';
									zjlist +='<td class="none" colspan="3">'+likNullData(m.attr_name)+'</td>';
									zjlist +='<td class="none cru_print_pj_sl">'+likNullData(m.input_num)+'</td>';
                                    zjlist +='</tr>';  
								});
								 zjtbody +='<tr class="cru_print_pj_tr"><td colspan="2" class="noprint">名称</td><td colspan="6" class="noprint">属性</td><td colspan="2" class="noprint">单个整机数量</td><td colspan="2" class="noprint">入库数量</td><td class="cru_print_pj_name none">名称</td><td class="cru_print_pj_name none">单个整机数量</td><td class="cru_print_pj_sx none" colspan="3">属性</td><td class="cru_print_pj_sl none">入库数量</td></tr>'+zjlist+'</tbody>';
							}
							rt_phtml += '</tr></tbody>'+zjtbody+'';
						}else{
							rt_phtml += '</tr></tbody>';
						}
						
					});
					$('.tanceng .rkdbanlirk_tablist_htmlxxl').after(rt_phtml);
					var rknum = 0,
						yrksl = 0,zjrk_num=0,zjyrk_sl=0,zjcx_sl=0;
					$.each(hjrknum, function(i, v) {
						rknum += parseInt(v);
					});
					$.each(hjyrksl, function(i, v) {
						yrksl += parseInt(v);
					});
					$.each(zjrksl, function(i, v) {
						zjrk_num += parseInt(v);
					});
					$.each(zjyrknum, function(i, v) {
						zjyrk_sl += parseInt(v);
					});
					$.each(zjcxsl, function(i, v) {
						zjcx_sl += parseInt(v);
					});
					$('.tanceng .rkdbanlirk_rkslmain_numxxl').html(rknum)
					$('.tanceng .rkdbanlirk_yrkmainnums_xxl').html(yrksl);
					$('.tanceng .rkdbanlirk_zjrkmain_numxxl').html(zjrk_num);
					$('.tanceng .rkdbanlirk_zhengjyrkmainsl_xxl').html(zjyrk_sl);
					$('.tanceng .rkdbanlrk_zjcqsl_mainnmu_xxl').html(zjcx_sl);
				}

			}
		},
		error: function(e) {
			console.log(e)
		}
	});
}
//展开收起
        $(".tanceng .box_open_btn_1").die("click").live("click", function () {
            $(this).toggle(function () {
                $(this).html("收起");
                $(this).parents('.xs_bjd_table').css('border-bottom','none');
                //$(this).css({'border':'1px solid #23a2f3','color':'#fff'});
                $(this).closest('tbody').next('.cru_zhankai_aaa').slideDown(100);
            }, function () {
                $(this).html("展开");
                $(this).parents('.xs_bjd_table').css('border-bottom','2px solid #e6e6e6');
                //$(this).css({'border':'','color':''});
                $(this).closest('tbody').next('.cru_zhankai_aaa').slideUp(100);
            });
            $(this).trigger('click');
        });

$('.rkgl_rkd_banlirk_btnxxl').die('click').live('click', function() {
		rkd_banlrk_listdata.id =$(this).attr('uid') ;//
		rkd_banlrk_listajax();
	})
	//查看序列号
$('.tanceng .rkd_banlirkckxlhao_btnxxl').die('click').live('click', function() {
		rkdbanlrk_ckxlhao_data.id = $(this).attr('uid');
		rkdbanlirk_ckxlhao_ajax();
	})
	//查看序列号
var rkdbanlrk_ckxlhao_data = {
	token: token,
	id: ''
}

function rkdbanlirk_ckxlhao_ajax() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "stock-in/listsn",
		data: rkdbanlrk_ckxlhao_data,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data);
				$('.tanceng .rkdblrk_ckxlhlisthtml_xxl').html('');
				var xlr_err = '';
				xlr_err += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
				$('.tanceng .rkdblrk_ckxlherrhtml_xxl').html(xlr_err);
			} else {
				console.log(data);
				var xlh_list = data['data'];
				$('.tanceng .dkdbanlrk_ckxlhrksl_xxl').html(xlh_list.input_num);
				$('.tanceng .rkdblrk_ckxlhyrknums_xxl').html(xlh_list.distribution_num);
				var xlh_td = xlh_list.snList,
					xlh_html = '';
				if(xlh_td.length == 0) {
					$('.tanceng .rkdblrk_ckxlhlisthtml_xxl').html('');
					var xlr_err = '';
					xlr_err += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
					$('.tanceng .rkdblrk_ckxlherrhtml_xxl').html(xlr_err);
				} else {
					$('.tanceng .rkdblrk_ckxlherrhtml_xxl').html('');
					$.each(xlh_td, function(i, v) {
						xlh_html += '<tr><td>' + likNullData(v.sn) + '</td>';
						xlh_html += '<td>' + likNullData(v.serial_number) + '</td></tr>';
					});
					$('.tanceng .rkdblrk_ckxlhlisthtml_xxl').html(xlh_html);
				}
			}
		},
		error: function(e) {
			//console.log(e)
			$('.tanceng .rkdblrk_ckxlhlisthtml_xxl').html('');
			var xlr_err = '';
			xlr_err += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
			$('.tanceng .rkdblrk_ckxlherrhtml_xxl').html(xlr_err);
		}
	});
}
//入库单办理入库查看详情
$('.tanceng .rkdbanlirk_rkxqbtn_xxl').die('click').live('click', function() {
	$('.tanceng .rkdckrkxq_gldjbh_xxl').html($(this).attr('gldjbh'));
	rkd_rkxq_data.id = $(this).attr('uid'); //$(this).attr('uid');
	rkd_rkxq_ajaxxl();
})
var rkd_rkxq_data = {
	token: token,
	id: ''
}

function rkd_rkxq_ajaxxl() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "stock-in/detail",
		data: rkd_rkxq_data,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data)
			} else {
				console.log(data);
				var xq_list = data['data'];
				$('.tanceng .rkdckrkxq_spbh_xxl').html(likNullData(xq_list.code_sn));
				$('.tanceng .rkdckrkxq_spmclxpp_xxl').html(likNullData(xq_list.product_name) + '/' + likNullData(xq_list.attr_name));
				$('.tanceng .rkdckrkxq_rksl_xxl').html(likNullData(xq_list.input_num));
				$('.tanceng .rkdckrkxq_yrknum_xxl').html(likNullData(xq_list.distribution_num));
				var xq_tl = xq_list.unDoneList,
					xq_tlhtml = '',
					wclist = xq_list.doneList,
					wchtml='',
					inpt_list = xq_list.inputNameList,
					inpt_html = '';
				if(wclist.length == 0) {
					$('.tanceng .rkglrkd_spckwclist_xxl').html('');
					$('.tanceng .rkglrkd_cklistspwcerrhtml_xxl').html('<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>');
				} else {
					$('.tanceng .rkglrkd_cklistspwcerrhtml_xxl').html('');
					$.each(wclist, function(i, v) {
						wchtml +='<tr><td>'+Appendzero(i+1)+'</td>';
                        wchtml +='<td class="c_g">完成</td>';                
                        wchtml +='<td>'+likNullData(v.serial_number)+'</td>';                
                        wchtml +='<td>'+likNullData(v.input_name)+'</td>';               
                        wchtml +='<td>'+likNullData(v.create_time)+'</td>';                
                        wchtml +='</tr>';            
					});
					$('.tanceng .rkglrkd_spckwclist_xxl').html(wchtml);
				}
				if(inpt_list.length==0){
					 $('.tanceng .rkhlck_splist_slrktbodyxxl').html('').parents('.crk_rkqx_con').hide();           
				}else{
					$.each(inpt_list, function(i,v) {
						inpt_html +='<tr>';
                    	inpt_html +='<td>入库'+likNullData(v.input_num)+'条</td>';                   
                    	inpt_html +='<td>'+likNullData(v.input_name)+'</td>';                    
                   		inpt_html +='<td>'+likNullData(v.create_time)+'</td>';                    
                    	inpt_html +='</tr>';    
					});
					 $('.tanceng .rkhlck_splist_slrktbodyxxl').html(inpt_html).parents('.crk_rkqx_con').show();   
				}
				
				

			}
		},
		error: function(e) {
			console.log(e)
		}
	});
}
//入库按钮
$('.tanceng .rkdbanlirk_peijianrk_btnxxl').die('click').live('click', function() {
		$(".tanceng .rkd_saomark_valinput_xxl").focus()
		$('.tanceng .rkgl_rkdsprk_smlisttd_xxl').html('');
		$('.tanceng .rkd_sp_quedingrk_btnxxl').attr('uid',$(this).attr('uid'));
		$('.tanceng .rkgl_rkdsprk_spbhs_xxl').html($(this).attr('spbh'));
		$('.tanceng .rkgl_rkdsprk_spmcggsx_xxl').html($(this).attr('sp'));
		$('.tanceng .rkgl_rkdsprk_rksls_xxl').html($(this).attr('rksl'));
		$('.tanceng .rkgl_rkdsprk_yirknums_xxl').html($(this).attr('yrknum'));
		var nums = parseInt($(this).attr('rksl'))-parseInt($(this).attr('yrknum'));
		$('.tanceng .rkgl_rkdsprk_xzspnumsadd_btnxxl').attr('num',nums);
		$('.tanceng .rkd_saomark_valinput_xxl').attr('maxnum',nums);
		$('.tanceng .rkglrkd_sp_quedrk_btnxxl').attr('uid',$(this).attr('uid'));
//	if($(this).attr('typeid') == 1) {
//		$('.tanceng .rkdblrk_rkanniu_titxxl').html('配置商品编号：<span>' + $(this).attr('spbh') + '</span>配置商品：<span>' + $(this).attr('sp') + '</span>入库数量：<span>' + $(this).attr('rksl') + '台</span><br>已入库数量：<span>' + $(this).attr('yrknum') + '台</span>');
//		$('.tanceng .rkdblrk_rkanniutable_thxxl').html('SN码')
//	} else {
//		$('.tanceng .rkdblrk_rkanniu_titxxl').html('商品编号：<span>' + $(this).attr('spbh') + '</span>商品：<span>' + $(this).attr('sp') + '</span>入库数量：<span>' + $(this).attr('rksl') + '台</span><br>已入库数量：<span>' + $(this).attr('yrknum') + '台</span>');
//		$('.tanceng .rkdblrk_rkanniutable_thxxl').html('序列号')
//	}

})
//$('.tanceng .rkdrkbtn_rksrmoshi_spbtnxxl').live('click', function() {
//	//获取当前时间
//	function p(s) {
//		return s < 10 ? '0' + s : s;
//	}
//
//	var myDate = new Date();
//	//获取当前年
//	var year = myDate.getFullYear();
//	//获取当前月
//	var month = myDate.getMonth() + 1;
//	//获取当前日
//	var date = myDate.getDate();
//	var h = myDate.getHours(); //获取当前小时数(0-23)
//	var m = myDate.getMinutes(); //获取当前分钟数(0-59)
//	var s = myDate.getSeconds();
//	var now = year + '-' + p(month) + "-" + p(date) + " " + p(h) + ':' + p(m) + ":" + p(s);
//	if($(this).is(':checked')) {
//		$('.tanceng .rkdrkbtn_smrkradio_xxl').removeAttr("checked");
//		$('.tanceng .rkdrkbtn_rkhaomalist_htmlxxl').append('<tr><td class="rkdrkbtn_rkhaoma_index_xxl"></td><td><div class="table_input_sn"><input type="text" class="time_input rkgl_rk_srmsCon" onpaste="return false" ondragenter="return false" onkeyup="this.value=check(this.value)" value="" style="background: #fff;ime-mode:disabled"></div></td><td>' + username + '</td><td>' + now + '</td><td><button class="but_mix but_r val_dialogTop rkddkbtn_trlist_scbtnxxl" name="crk_rkgl_deletebb">删除</button></td></tr>');
//		$.each($('.tanceng .rkdrkbtn_rkhaomalist_htmlxxl tr'), function(i, v) {
//			$(this).attr('indexid', i)
//			$(this).children('td.rkdrkbtn_rkhaoma_index_xxl').html(Appendzero(i + 1))
//		});
//		$('.tanceng .rkdrkbtn_listmainnums_trsl_xxl').html($('.tanceng .rkdrkbtn_rkhaomalist_htmlxxl tr').length)
//		$('.tanceng .rkdrkbtn_addhaoma_listbtn_xxl').css('display', 'block')
//	} else {
//		$('.tanceng .rkdrkbtn_smrkradio_xxl').attr("checked", "checked");
//		$(".tanceng .rkd_saomark_valinput_xxl").focus()
//		$('.tanceng .rkdrkbtn_addhaoma_listbtn_xxl').css('display', 'none');
//		return
//	}
//})

$('.tanceng .rkddkbtn_trlist_scbtnxxl').die('click').live('click', function() {
	$(this).parents('tr').remove();
	$('.tanceng .rkd_saomark_valinput_xxl').removeAttr('disabled').focus();
	if($('.tanceng .rkgl_rkdsprk_smlisttd_xxl>tr').length==0){
		$('.tanceng .rkgl_rkdsprk_smlisttd_xxl').html('');
		$('.tanceng .rkgl_rkdsprk_smlitnums_hjxxl').html('0');
	}else{
		$('.tanceng .rkgl_rkdsprk_smlisttd_xxl>tr').each(function(i,v){
			$(this).children('.rkdrkbtn_rkhaoma_index_xxl').html(Appendzero(i + 1))
		})
		$('.tanceng .rkgl_rkdsprk_smlitnums_hjxxl').html($('.tanceng .rkgl_rkdsprk_smlisttd_xxl>tr').length);
	}
	//$('.tanceng .rkdrk_delete_btnxxl').attr('indexid', $(this).parent().parent().attr('indexid'))
})
//删除
//$('.tanceng .rkdrk_delete_btnxxl').live('click', function() {
//	$(".tanceng .rkgl_rkdsprk_smlisttd_xxl tr[indexid='" + $(this).attr('indexid') + "']").remove();
//	$('.tanceng .rkgl_rkdsprk_smlitnums_hjxxl').html($('.tanceng .rkgl_rkdsprk_smlisttd_xxl tr').length)
//})
//$('.tanceng .rkdrkbtn_addhaoma_listbtn_xxl').live('click', function() {
//		//获取当前时间
//		function p(s) {
//			return s < 10 ? '0' + s : s;
//		}
//
//		var myDate = new Date();
//		//获取当前年
//		var year = myDate.getFullYear();
//		//获取当前月
//		var month = myDate.getMonth() + 1;
//		//获取当前日
//		var date = myDate.getDate();
//		var h = myDate.getHours(); //获取当前小时数(0-23)
//		var m = myDate.getMinutes(); //获取当前分钟数(0-59)
//		var s = myDate.getSeconds();
//		var now = year + '-' + p(month) + "-" + p(date) + " " + p(h) + ':' + p(m) + ":" + p(s);
//		$('.tanceng .rkdrkbtn_rkhaomalist_htmlxxl').append('<tr><td class="rkdrkbtn_rkhaoma_index_xxl"></td><td><div class="table_input_sn"><input type="text" class="time_input rkgl_rk_srmsCon" onpaste="return false" ondragenter="return false" onkeyup="this.value=check(this.value)" style="background: #fff;ime-mode:disabled"></div></td><td>' + username + '</td><td>' + now + '</td><td><button class="but_mix but_r val_dialogTop rkddkbtn_trlist_scbtnxxl" name="crk_rkgl_deletebb">删除</button></td></tr>');
//		$.each($('.tanceng .rkdrkbtn_rkhaomalist_htmlxxl tr'), function(i, v) {
//			$(this).attr('indexid', i)
//			$(this).children('td.rkdrkbtn_rkhaoma_index_xxl').html(Appendzero(i + 1))
//		});
//		$('.tanceng .rkdrkbtn_listmainnums_trsl_xxl').html($('.tanceng .rkdrkbtn_rkhaomalist_htmlxxl tr').length);
//
//	})
	//input 禁止输入中文
function check(str) {
	var temp = ""
	for(var i = 0; i < str.length; i++)
		if(str.charCodeAt(i) > 0 && str.charCodeAt(i) < 255)
			temp += str.charAt(i)
	return temp
}
//扫码
$('.tanceng .rkd_saomark_valinput_xxl').die().live('keydown', function(e) {
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
	e = e || event;
	var keyCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
	if(keyCode == 13) {
		if($(this).val()==''){
			return false;
		}
		e.preventDefault();
		if($(this).attr('maxnum')==$('.tanceng .rkgl_rkdsprk_smlisttd_xxl tr').length){
			$(this).attr('disabled','disabled').val('');
			return false;
		}else{
			e.preventDefault();
			$(this).removeAttr('disabled');
			$('.rkgl_rkdsprk_smlisttd_xxl').append('<tr><td class="rkdrkbtn_rkhaoma_index_xxl">01</td><td>' + $('.tanceng .rkd_saomark_valinput_xxl').val() + '</td><td>' + username + '</td><td>' + now + '</td><td><button class="but_mix but_r val_dialogTop rkddkbtn_trlist_scbtnxxl" >删除</button></td></tr>')
		$('.tanceng .rkd_saomark_valinput_xxl').val('');
		$.each($('.tanceng .rkgl_rkdsprk_smlisttd_xxl tr'), function(i, v) {
		$(this).attr('indexid', i)
		$(this).children('td.rkdrkbtn_rkhaoma_index_xxl').html(Appendzero(i + 1))
	});
	$('.tanceng .rkgl_rkdsprk_smlitnums_hjxxl').html($('.tanceng .rkgl_rkdsprk_smlisttd_xxl tr').length);
		}
		
		return false;
	}
});
//控制入库数量
$('.tanceng .rkgl_rkdsprk_xzspnumsadd_btnxxl').die('click').live('click',function(){
	var default_num = parseInt($(this).next('input').val());
	var nums_xxl = parseInt($(this).attr('num'));
	if(default_num > nums_xxl) {
		$(this).next('input').val(nums_xxl);
	} else {
		$(this).next('input').val(default_num);
	}
})
  
//商品确定入库
var rkd_qudrk_spdata = {
	token:token,
	id:'',
	product_info:'',
	remark:'',
	input_way:'',//入库方式 1 扫码入库 2 数量入库
	input_num:'',//数量入库
	category:''//入库形式 0 商品 1 整机 2 整机配件
}
function rkd_qudrk_spajax(){
	$.ajax({
		type:"post",
		url:SERVER_URL+"stock-in/in",
		data:rkd_qudrk_spdata,
		dataType:'json',
		success:function(data){
			if(data.code!=0){
				console.log(data)
			}else{
				console.log(data)
				rkd_banlrk_listajax();
				dfprk_rkd_listajax();
				//zhengji_rkfs_ajax();
			}
		},
		error:function(e){
			console.log(e)
		}
	});
}
$('.tanceng .rkglrkd_sp_quedrk_btnxxl').die('click').live('click',function(){
	if($(this).attr('typeid')==1){
		//console.log(1)
		if($('.tanceng .rkgl_rkdsprk_smlisttd_xxl tr').length==0){
			alert('请输入序列号或者扫码');
			return false;
		}
		var arrtr = [];
		$.each($('.tanceng .rkgl_rkdsprk_smlisttd_xxl tr'), function(i,v) {
			arrtr.push($(this).children().eq(1).text())
		});
		//console.log(arrtr)
		if($('.tanceng .rkglrkd_sprk_beizhu_valxxl').val()==''||$('.tanceng .rkglrkd_sprk_beizhu_valxxl').val()=='请输入备注'){
			$('.tanceng .rkglrkd_sprk_beizhu_valxxl').val('');
		}
		
		rkd_qudrk_spdata.id = $(this).attr('uid');
		rkd_qudrk_spdata.product_info =JSON.stringify(arrtr);// JSON.stringify(arrtr)
		rkd_qudrk_spdata.remark = $('.tanceng .rkglrkd_sprk_beizhu_valxxl').val();
		rkd_qudrk_spdata.input_way = '1';
		rkd_qudrk_spdata.category = '0';
		rkd_qudrk_spdata.input_num = '';
		console.log(rkd_qudrk_spdata)
		rkd_qudrk_spajax();
	}else{
		//console.log(2)
		if($('.tanceng .rkglrkd_sprk_beizhu_valxxl').val()==''||$('.tanceng .rkglrkd_sprk_beizhu_valxxl').val()=='请输入备注'){
			$('.tanceng .rkglrkd_sprk_beizhu_valxxl').val('');
		}
		rkd_qudrk_spdata.id = $(this).attr('uid');
		rkd_qudrk_spdata.product_info = '';
		rkd_qudrk_spdata.remark = $('.tanceng .rkglrkd_sprk_beizhu_valxxl').val();
		rkd_qudrk_spdata.input_way = '2';
		rkd_qudrk_spdata.category = '0';
		if($('.tanceng .rkglrkd_sprkxzsl_numxxl').val()==0||$('.tanceng .rkglrkd_sprkxzsl_numxxl').val()==''){
			alert('请选择数量');
			return false;
		}
		rkd_qudrk_spdata.input_num = $('.tanceng .rkglrkd_sprkxzsl_numxxl').val();
		//console.log(rkd_qudrk_spdata)
		rkd_qudrk_spajax();
	}
//	if($('.tanceng .rkdrkbtn_rkhaomalist_htmlxxl tr').length==0){
//		alert('请输入序列号或者扫码');
//		return false;
//	}
//	var arr = [];
//	rkd_qudrk_spdata.id = $(this).attr('uid');
//	$.each($('.tanceng .rkdrkbtn_rkhaomalist_htmlxxl tr'), function(i,v) {
//		if($(this).children().eq(1).children().children('input').val()==''){
//			alert('不能为空哦');
//			return false;
//		}else{
//			arr.push($(this).children().eq(1).children().children('input').val())
//		}
//	});
//	if($('.tanceng .rkd_sprkbeizhu_xxla').val()==''||$('.tanceng .rkd_sprkbeizhu_xxla').val()=='请输入备注'){
//		$('.tanceng .rkd_sprkbeizhu_xxla').val('');
//	}
//	rkd_qudrk_spdata.remark = $('.tanceng .rkd_sprkbeizhu_xxla').val();
//	rkd_qudrk_spdata.product_info = arr;
//	rkd_qudrk_spajax();
//	$(this).parent().parent().parent().remove();
//		var num = $('.tanceng').children(".dialog_box").length;
//		if(num < 1) {
//			$(".tanceng").hide();
//		}
$('.tanceng div').remove();
$('.tanceng').css('display','none');
})
//整机查看按钮
var zhengj_chakan_data = {
	token:token,
	id:'',
	status:''//1 未完成 2 已完成
}
$('.tanceng .rkdbanlirk_rkxqzhengjibtn_xxl').die().live('click',function(){
	zhengj_chakan_data.id = $(this).attr('uid');
	zhengji_chankan_ajax();
})
function zhengji_chankan_ajax(){
	$.ajax({
		type:"get",
		url:SERVER_URL+"stock-in/detail",
		data:zhengj_chakan_data,
		dataType:'json',
		success:function(data){
			if(data.code!=0){
				console.log(data);
				$('.tanceng .rkgl_rkpjchakan_oklist_tbodyxxl').html('');
					$('.tanceng .rkgl_rkpjchakan_okerrhtml_xxl').html('<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>');
					$('.tanceng .rkgl_pjrkchakan_slrklist_xxl').html('');
					$('.tanceng .rkgl_rkpjchakan_slrkerrhtml_xxl').html('<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>');
					$('.tanceng .rkgl_rkpjweiwanc_listxxl').html('');
					$('.tanceng .rkgl_pjrk_wwc_errhtml_xxl').html('<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>');
			}else{
				console.log(data);
				var zj_data = data['data'];
				$('.tanceng .rkglzjrk_zjspbh_xxl').html(likNullData(zj_data.code_sn));
				$('.tanceng .rkglrkd_zjspname_xxl').html(likNullData(zj_data.product_name)+' 属性 :'+likNullData(zj_data.attr_name));
				$('.tanceng .rkgl_zjrksl_numxxl').html(likNullData(zj_data.input_num));
				$('.tanceng .rkgl_zjrkyrku_numsxxl').html(likNullData(zj_data.distribution_num));
				var wclist = zj_data.doneList,wchtml='',nooklist = zj_data.unDoneList,nookhtml='',sllist = zj_data.inputNameList,slhtml='';
				if(wclist.length==0){
					$('.tanceng .rkgl_rkpjchakan_oklist_tbodyxxl').html('').parents('.crk_rkqx_con').hide();
					//$('.tanceng .rkgl_rkpjchakan_okerrhtml_xxl').html('<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>');
				}else{
					//$('.tanceng .rkgl_rkpjchakan_okerrhtml_xxl').html('');
					$.each(wclist, function(i,v) {
						wchtml +='<tr><td>'+Appendzero(i+1)+'</td>';
                        wchtml +='<td class="c_g">已入配件</td>';               
                        wchtml +='<td>'+likNullData(v.sn)+'</td>';                
                        wchtml +='<td>'+likNullData(v.input_name)+'</td>';                
                        wchtml +='<td>'+likNullData(v.create_time)+'</td>';                
                        wchtml +='<td><button class="but_mix but_look val_dialogTop rkgl_chakan_chakantt_btnxxl" name="crk_rkgl_rkxqa_zjandpj" uid="'+v.sn+'" zjspbh="'+likNullData(zj_data.code_sn)+'" zjspmc="'+likNullData(zj_data.product_name)+'/'+likNullData(zj_data.attr_name)+'/'+likNullData(zj_data.unit_name)+'/'+likNullData(zj_data.format)+'" zjsksl="'+likNullData(zj_data.input_num)+'" zjyrknum="'+likNullData(zj_data.distribution_num)+'" zjsn="'+likNullData(v.sn)+'" zjren="'+likNullData(v.input_name)+'" zjtime="'+likNullData(v.create_time)+'">查看</button></td>';                
                        wchtml +='</tr>';
					});
					var lasttr = '<tr class="table_total"><td>合计</td><td>'+wclist.length+'</td><td></td><td></td><td></td><td></td></tr>';
					$('.tanceng .rkgl_rkpjchakan_oklist_tbodyxxl').html(wchtml+lasttr).parents('.crk_rkqx_con').show();
				}
				if(sllist.length==0){
					$('.tanceng .rkgl_pjrkchakan_slrklist_xxl').html('').parents('.crk_rkqx_con').hide();
					//$('.tanceng .rkgl_rkpjchakan_slrkerrhtml_xxl').html('<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>');
				}else{
					//$('.tanceng .rkgl_rkpjchakan_slrkerrhtml_xxl').html('');
					$.each(sllist, function(i,v) {
						slhtml +='<tr>';
                        slhtml +='<td class="c_g">完成</td>';                
                        slhtml +='<td>入库'+likNullData(v.input_num)+'台</td>';                
                        slhtml +='<td>'+likNullData(v.input_name)+'</td>';               
                        slhtml +='<td>'+likNullData(v.create_time)+'</td>';                
                        slhtml +='</tr>';
					});
					$('.tanceng .rkgl_pjrkchakan_slrklist_xxl').html(slhtml).parents('.crk_rkqx_con').show();
				}
				if(nooklist.length==0){
					$('.tanceng .rkgl_rkpjweiwanc_listxxl').html('').parents('.crk_rkqx_con').hide();
					//$('.tanceng .rkgl_pjrk_wwc_errhtml_xxl').html('<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>');
				}else{
					//$('.tanceng .rkgl_pjrk_wwc_errhtml_xxl').html('');
					$.each(nooklist, function(i,v) {
						nookhtml +='<tr><td>'+Appendzero(i+1)+'</td>';
                        nookhtml +='<td class="c_r">未入配件</td>';                
                        nookhtml +='<td>'+likNullData(v.sn)+'</td>';                
                        nookhtml +='<td>'+likNullData(v.input_name)+'</td>';                
                        nookhtml +='<td>'+likNullData(v.create_time)+'</td>';                
                        //nookhtml +='<td><button class="but_mix but_blue val_dialogTop rkgl_ckpjwwc_rukubtn_xxl" uid="'+v.input_product_id+'" name="crk_rkgl_dealRK_zhengji_and_pejian">入库</button></td>';                
                        nookhtml +='</tr>';            
					});
					var nooktr = '<tr class="table_total"><td>合计</td><td>'+nooklist.length+'</td><td></td><td></td><td></td></tr>';
					$('.tanceng .rkgl_rkpjweiwanc_listxxl').html(nookhtml+nooktr).parents('.crk_rkqx_con').show();
				}
				
				
				//var tlist = zj_data.timeList;
				
//				if(xq_tl.length == 0) {
//					$('.tanceng .rkglrkd_zjrklist_htmlxxl').html('');
//					$('.tanceng .rkgl_zjrkerr_htmlxxl').html('<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>');
//				} else {
//					$('.tanceng .rkgl_zjrkerr_htmlxxl').html('');
//					$.each(xq_tl, function(i, v) {
//						if(v.list.length == 0) {
//							return;
//						} else {
//							var xq_sunhtml = '';
//							$.each(v.list, function(j, m) {
//								xq_sunhtml += '<tr><td>' + Appendzero(j + 1) + '</td>';
//								if(m.status==2){
//									xq_sunhtml += '<td class="c_g">完成</td>';
//								}else{
//									xq_sunhtml += '<td class="c_r">未完成</td>';
//								}
//								xq_sunhtml += '<td>' + likNullData(m.sn) + '</td>';
//								xq_sunhtml += '<td>' + likNullData(m.input_name) + '</td>';
//								xq_sunhtml += '<td>' + likNullData(m.create_time) + '</td>';
//								if(m.status==1){
//									xq_sunhtml += '<td><button class="but_mix but_blue val_dialogTop rkgl_chakan_rukubtn_xxl" uid="'+m.input_product_id+'" name="crk_rkgl_dealRK_zhengji_and_pejian">入库</button></td></tr>';
//								}else{
//									xq_sunhtml += '<td><button class="but_mix but_look val_dialogTop rkgl_chakan_chakantt_btnxxl" uid="'+m.sn+'" zjspbh="'+likNullData(zj_data.code_sn)+'" zjspmc="'+likNullData(zj_data.product_name)+'/'+likNullData(zj_data.attr_name)+'/'+likNullData(zj_data.unit_name)+'/'+likNullData(zj_data.format)+'" zjsksl="'+likNullData(zj_data.input_num)+'" zjyrknum="'+likNullData(zj_data.distribution_num)+'" name="crk_rkgl_rkxqa_zjandpj" zjsn="'+likNullData(m.sn)+'" zjren="'+likNullData(m.input_name)+'" zjtime="'+likNullData(m.create_time)+'">查看</button></td></tr>';
//								}
//								
//							});
//							xq_tlhtml += '<div class="crk_rkqx_con" style="border:none;">';
//							xq_tlhtml += '<div class="div_1"><div class="div_1 table-container" style="margin:0;">';
//							xq_tlhtml += '<table class="page_69_blrk_table"><thead><tr><th>序号</th><th>完成状态</th><th>SN码</th><th>入库人</th><th>入库时间</th><th>配件入库</th></tr></thead>';
//							xq_tlhtml += '<tbody>' + xq_sunhtml + '</tbody>';
//							xq_tlhtml += '</table></div></div><div class="t_textinput t_textarea"><div class="t_left">备注</div>';
//							xq_tlhtml += '<div class="t_right">';
//							xq_tlhtml += '<textarea class="txt_normal inp_noInput c_3" readonly="readonly">' + likNullData(xq_tl[i].list[0].remark) + '</textarea>';
//							xq_tlhtml += '</div></div></div>';
//						}
//					});
//					$('.tanceng .rkglrkd_zjrklist_htmlxxl').html(xq_tlhtml);
//				}
//				if(inpt_list.length == 0) {
//					$('.tanceng .rkglrkd_zjrk_shuliangrk_listhtml_xxl').html('');
//					//$('.tanceng .rkglrkd_zjrkshuliang_rkerrlist_xxl').html('<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>');
//				} else {
//					$('.tanceng .rkglrkd_zjrkshuliang_rkerrlist_xxl').html('');
//					inpt_html += '<div class="crk_rkqx_con">';
//					inpt_html += '<div class="div_1"><div class="div_1 table-container" style="margin:0;">';
//					inpt_html += '<table><thead><tr><th>完成状态</th><th>入库数量</th><th>入库人</th><th>入库时间</th></tr></thead>';
//					var inp_sun = '';
//					$.each(inpt_list, function(i, v) {
//						inp_sun += '<tr>';
//						inp_sun += '<td class="c_g">完成</td>';
//						inp_sun += '<td>入库' + likNullData(v.input_num) + '台</td>';
//						inp_sun += '<td>' + likNullData(v.input_name) + '</td>';
//						inp_sun += '<td>' + likNullData(v.create_time) + '</td></tr>';
//					});
//					inpt_html += '<tbody>' + inp_sun + '</tbody>';
//					inpt_html += '</table></div></div><div class="t_textinput t_textarea"><div class="t_left">备注</div>';
//					inpt_html += '<div class="t_right">';
//					inpt_html += '<textarea class="txt_normal inp_noInput c_3" readonly="readonly"></textarea>';
//					inpt_html += '</div></div></div>';
//
//					$('.tanceng .rkglrkd_zjrk_shuliangrk_listhtml_xxl').html(inpt_html);
//				}
				
				
			}
		},
		error:function(e){
			console.log(e);
			$('.tanceng .rkgl_rkpjchakan_oklist_tbodyxxl').html('');
					$('.tanceng .rkgl_rkpjchakan_okerrhtml_xxl').html('<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>');
					$('.tanceng .rkgl_pjrkchakan_slrklist_xxl').html('');
					$('.tanceng .rkgl_rkpjchakan_slrkerrhtml_xxl').html('<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>');
					$('.tanceng .rkgl_rkpjweiwanc_listxxl').html('');
					$('.tanceng .rkgl_pjrk_wwc_errhtml_xxl').html('<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>');
		}
	});
}
//查看配件未完成入库按钮
$('.tanceng .rkgl_ckpjwwc_rukubtn_xxl').die().live('click',function(){
	zhengji_rkfs_data.category = '2';
	zhengji_rkfs_data.id = $(this).attr('uid');
	zhengji_rkfs_ajax();
	$('.tanceng .rkdzipj_rkqueding_btnxxl').attr('uid',$(this).attr('uid'));
	$('.tanceng .rkdzjpjrk_quedingjixu_btnxxl').attr('uid',$(this).attr('uid'));
	$('.tanceng .rkd_zhengjandpj_saosnma_inputxxl').focus();
	$('.tanceng .rkd_zhengjandpj_rksnma_trxxl').html('');
	$('.rkd_zjpj_snmanoshow_errxxl').html('<div class="no_data_box"><div class="no_data"><p class="c_9">请扫SN码！</p></div><div class="no_data_bottom"></div></div>')
})

//整机入库查看列表不显示已完成
$('.tanceng .rkglrkd_zjspshowlist_noxswc_btnxxl').die().live('click',function(){
	if($(this).is(":checked")) {
			zhengj_chakan_data.status = '1';
			zhengji_chankan_ajax()
		} else {
			zhengj_chakan_data.status = '';
			zhengji_chankan_ajax()
		}
})
//整机查看里的查看
var zhengji_spxlhchakan_data = {
	token:token,
	sn:''
}
$('.tanceng .rkgl_chakan_chakantt_btnxxl').die().live('click',function(){
	$('.tanceng .rkgl_zjchakan_chakn_zjspbh_xxl').html($(this).attr('zjspbh'));
	$('.tanceng .rkgl_zjchakan_ck_zjsp_xxl').html($(this).attr('zjspmc'));
	$('.tanceng .rkgl_zjchakan_ck_rkslxxl').html($(this).attr('zjsksl'));
	$('.tanceng .rkgl_zjchankan_ck_yrksl_xxl').html($(this).attr('zjyrknum'));
	$('.tanceng .rkglrkd_zjspchakan_ckakan_zjsnma_xxl').html($(this).attr('zjsn'));
	$('.tanceng .rkglrkd_zjspchakan_zjrkrenxxl').html($(this).attr('zjren'));
	$('.tanceng .rkglrkd_zjspchakan_zjrksjxxl').html($(this).attr('zjtime'));
	zhengji_spxlhchakan_data.sn = $(this).attr('uid');
	zhengji_spxlhchakan_ajax();
})
function zhengji_spxlhchakan_ajax(){
	$.ajax({
		type:"get",
		url:SERVER_URL+"stock-in/listbysn",
		data:zhengji_spxlhchakan_data,
		dataType:'json',
		success:function(data){
			if(data.code!=0){
				console.log(data);
				$('.tanceng .rkglrkd_pjrkchakna_pjlist_xxl').html('');
					$('.tanceng .rkgl_zjspchakan_pjlist_errxxl').html('<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>');
			}else{
				console.log(data);
				var pjlist = data['data'],pjhtml='',sphtml='';
				if(pjlist.pieceList.length==0){
					$('.tanceng .rkglrkd_pjrkchakna_pjlist_xxl').html('');
					$('.tanceng .rkgl_zjspchakan_pjlist_errxxl').html('<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>');
				}else{
					$('.tanceng .rkgl_zjspchakan_pjlist_errxxl').html('');
					$.each(pjlist.pieceList, function(i,v) {
						 	pjhtml +='<div class="crd_zj_and_pjCon"><div class="crk_rkd_peijian">';
                        	pjhtml +='<div class="unhead_box crk_unhead_box2" style="border-top: 2px solid #e6e6e6;overflow: hidden;">';
                        	pjhtml +='<div class="crk_unhead_tit left">';
                            pjhtml+='商品编号：<span>'+likNullData(v.detail.code_sn)+'</span>';
                            pjhtml +='商品：<span>'+likNullData(v.detail.product_name)+'/'+likNullData(v.detail.attr_name)+'</span>';
                            pjhtml +='</div><div class="crk_unhead_con right" style="margin-right: 10px;">';
                            pjhtml +='数量：<span style="margin-right:0;">'+likNullData(v.detail.num)+''+likNullData(v.detail.unit_name)+'</span><hr>';
                            //pjhtml +='<i>已入数量：<span class="" style="margin-right: 20px;">6台</span></i>';
                            pjhtml +='</div></div>';
                        	pjhtml +='<div class="dialog_text_con rkd_dialog_text_con">';
                            pjhtml +='<div class="crk_rkqx_con" style="border: none;">';
                            pjhtml +='<div class="div_1">';
                            pjhtml +='<div class="div_1 table-container" style="margin:0;">';
                            pjhtml +='<table class="page_69_blrk_table">';           
                            pjhtml +='<thead>';                
                            pjhtml +='<tr><th>序号</th><th>序列号</th><th>入库人</th><th>入库时间</th></tr>'; 
                            sphtml = '';
                            $.each(v.list, function(j,m) {
                            	sphtml +='<tr><td>'+Appendzero(j+1)+'</td>';
                                sphtml +='<td>'+likNullData(m.serial_number)+'</td>';                
                                sphtml +='<td>'+likNullData(m.input_name)+'</td>';                
                                sphtml +='<td>'+likNullData(m.create_time)+'</td>';                
                                sphtml +='</tr>';            
                            });
                            pjhtml +='</thead><tbody>'+sphtml+'<tr class="table_total"><td>合计</td><td>'+v.list.length+'</td><td></td><td></td>';                
                            pjhtml +='</tr></tbody></table></div></div></div></div></div></div>';
                        
                                  
					});
					$('.tanceng .rkglrkd_pjrkchakna_pjlist_xxl').html(pjhtml);
//					$('.tanceng .rkglzjchakan_pjlist_mainnum_xxl').html(pjlist.length);
					//$('.tanceng .rkglrkd_zhjchakan_peij_beizhu_xxl').val(pjlist[0].remark);
				}
			}
		},
		error:function(e){
			console.log(e);
			$('.tanceng .rkglrkd_pjrkchakna_pjlist_xxl').html('');
					$('.tanceng .rkgl_zjspchakan_pjlist_errxxl').html('<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>');
		}
	});
}
//整机入库--zhengji
$('.tanceng .rkdbanlirk_zhengjirk_btnxxl').die().live('click',function(){
	$('.tanceng .rkglrkd_zhengjirk_dianjbtnxxl').attr({
		'uid':$(this).attr('uid'),
		'spbh':$(this).attr('spbh'),
		'sp':$(this).attr('sp'),
		'rksl':$(this).attr('rksl'),
		'yrknum':$(this).attr('yrknum')
	});
	$('.tanceng .rkglrkd_zhengjiandpeijian_dainjbtnxxl').attr({
		'uid':$(this).attr('uid'),
		'spbh':$(this).attr('spbh'),
		'sp':$(this).attr('sp'),
		'rksl':$(this).attr('rksl'),
		'yrknum':$(this).attr('yrknum')
	});
})
$('.tanceng .rkglrkd_zhengjirk_dianjbtnxxl').die().live('click',function(){
	$('.tanceng .rkgl_rkdzhengji_rkqueding_btnxxl').attr('uid',$(this).attr('uid'));
	$('.tanceng .rkglrkd_zjspzhengru_spbh_xxl').html($(this).attr('spbh'));
	$('.tanceng .rkglrkd_zjspzhengru_sp_xxl').html($(this).attr('sp'));
	$('.tanceng .rkglrkd_zjspzhengru_rkdl_xxl').html($(this).attr('rksl'));
	$('.tanceng .rkglrkd_zjspzhengru_yrknums_xxl').html($(this).attr('yrknum'));
	$('.tanceng .rkgl_spzhengru_smvalue_inputxxl').focus(); 
	var nums = parseInt($(this).attr('rksl'))-parseInt($(this).attr('yrknum'));
	$('.tanceng .rkglrkd_zhengjiruku_kzsl_btnxxl').attr('num',nums);
	$('.tanceng .rkgl_spzhengru_smvalue_inputxxl').focus().attr('maxnum',nums); 
	$('.tanceng .rkglrkd_spzhengru_trlist_xxl').html('');
})
//扫码
$('.tanceng .rkgl_spzhengru_smvalue_inputxxl').die().live('keydown', function(e) {
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
	e = e || event;
	var keyCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
	if(keyCode == 13) {
		if($(this).val()==''){
			return false;
		}else{
			e.preventDefault();
		if($(this).attr('maxnum')==$('.tanceng .rkglrkd_spzhengru_trlist_xxl tr').length){
			$(this).attr('disabled','disabled').val('');
			return false;
		}else{
		e.preventDefault();
		$(this).removeAttr('disabled');
		$('.rkglrkd_spzhengru_trlist_xxl').append('<tr><td class="rkdrkbtn_rkhaoma_indexzhengji_xxl">01</td><td>' + $('.tanceng .rkgl_spzhengru_smvalue_inputxxl').val() + '</td><td>' + username + '</td><td>' + now + '</td><td><button class="but_mix but_r val_dialogTop rkglrkd_zhengjruku_trsc_btnxxl" >删除</button></td></tr>')
			//$(this).val('')
		$('.tanceng .rkgl_spzhengru_smvalue_inputxxl').val('');
		$.each($('.tanceng .rkglrkd_spzhengru_trlist_xxl tr'), function(i, v) {
		$(this).attr('indexid', i)
		$(this).children('td.rkdrkbtn_rkhaoma_indexzhengji_xxl').html(Appendzero(i + 1))
	});
	$('.tanceng .rkglrkd_zhengjirk_trlength_xxl').html($('.tanceng .rkglrkd_spzhengru_trlist_xxl tr').length);
		}
		
		return false;
		}
		
	}
});
//控制入库数量
$('.tanceng .rkglrkd_zhengjiruku_kzsl_btnxxl').die().live('click',function(){
	var default_num = parseInt($(this).next('input').val());
	var nums_xxl = parseInt($(this).attr('num'));
	if(default_num > nums_xxl) {
		$(this).next('input').val(nums_xxl);
	} else {
		$(this).next('input').val(default_num);
	}
})
//删除tr
$('.tanceng .rkglrkd_zhengjruku_trsc_btnxxl').die().live('click', function() {
	$(this).parents('tr').remove();
	$('.tanceng .rkgl_spzhengru_smvalue_inputxxl').removeAttr('disabled').focus();
	if($('.tanceng .rkglrkd_spzhengru_trlist_xxl>tr').length==0){
		$('.tanceng .rkglrkd_spzhengru_trlist_xxl').html('');
		$('.tanceng .rkglrkd_zhengjirk_trlength_xxl').html('0')
	}else{
		$('.tanceng .rkglrkd_spzhengru_trlist_xxl>tr').each(function(i,v){
			$(this).children('.rkdrkbtn_rkhaoma_indexzhengji_xxl').html(Appendzero(i + 1));
		})
		$('.tanceng .rkglrkd_zhengjirk_trlength_xxl').html($('.tanceng .rkglrkd_spzhengru_trlist_xxl>tr').length)
	}
})

//$('.tanceng .rkdrk_delete_btnxxl').live('click', function() {
//	$(".tanceng .rkglrkd_spzhengru_trlist_xxl tr[indexid='" + $(this).attr('zjindexid') + "']").remove();
//	$('.tanceng .rkglrkd_zhengjirk_trlength_xxl').html($('.tanceng .rkglrkd_spzhengru_trlist_xxl tr').length)
//})
//确定整机入库
$('.tanceng .rkgl_rkdzhengji_rkqueding_btnxxl').die().live('click',function(){
	if($(this).attr('typeid')==1){
		//console.log(1)
		if($('.tanceng .rkglrkd_spzhengru_trlist_xxl').html()==''){
			alert('请输入序列号或者扫码');
			$('.tanceng .rkgl_spzhengru_smvalue_inputxxl').focus();
			return false;
		}
		var arrtr = [];
		$.each($('.tanceng .rkglrkd_spzhengru_trlist_xxl tr'), function(i,v) {
			arrtr.push($(this).children().eq(1).text())
		});
		//console.log(arrtr)
		if($('.tanceng .rkd_zhengjzrku_qdbeizhu_xxl').val()==''||$('.tanceng .rkd_zhengjzrku_qdbeizhu_xxl').val()=='请输入备注'){
			$('.tanceng .rkd_zhengjzrku_qdbeizhu_xxl').val('');
		}
		
		rkd_qudrk_spdata.id = $(this).attr('uid');
		rkd_qudrk_spdata.product_info =JSON.stringify(arrtr);// JSON.stringify(arrtr)
		rkd_qudrk_spdata.remark = $('.tanceng .rkd_zhengjzrku_qdbeizhu_xxl').val();
		rkd_qudrk_spdata.input_way = '1';
		rkd_qudrk_spdata.category = '1';
		rkd_qudrk_spdata.input_num = '';
		//console.log(rkd_qudrk_spdata)
		rkd_qudrk_spajax();
	}else{
		//console.log(2)
		if($('.tanceng .rkd_zhengjzrku_qdbeizhu_xxl').val()==''||$('.tanceng .rkd_zhengjzrku_qdbeizhu_xxl').val()=='请输入备注'){
			$('.tanceng .rkd_zhengjzrku_qdbeizhu_xxl').val('');
		}
		rkd_qudrk_spdata.id = $(this).attr('uid');
		rkd_qudrk_spdata.product_info = '';
		rkd_qudrk_spdata.remark = $('.tanceng .rkd_zhengjzrku_qdbeizhu_xxl').val();
		rkd_qudrk_spdata.input_way = '2';
		rkd_qudrk_spdata.category = '1';
		if($('.tanceng .rkglrkd_zhengjruku_nums_xxl').val()==0||$('.tanceng .rkglrkd_zhengjruku_nums_xxl').val()==''){
			alert('请选择数量');
			return false;
		}
		rkd_qudrk_spdata.input_num = $('.tanceng .rkglrkd_zhengjruku_nums_xxl').val();
		//console.log(rkd_qudrk_spdata)
		rkd_qudrk_spajax();
	}
	$('.tanceng div').remove();
				$('.tanceng').css('display','none');
	//$(this).parent().parent().parent().remove();
//		var num = $('.tanceng').children(".dialog_box").length;
//		if(num < 1) {
//			$(".tanceng").hide();
//		}
})
//整机带配件入库--入库方式
var zhengji_rkfs_data = {
	id:'',
	token:token,
	category:''//入库形式 1 整机 2 整机配件
}
$('.tanceng .rkglrkd_zhengjiandpeijian_dainjbtnxxl').die().live('click',function(){
	zhengji_rkfs_data.category = '2';
	zhengji_rkfs_data.id = $(this).attr('uid');
	zhengji_rkfs_ajax();
	$('.tanceng .rkdzipj_rkqueding_btnxxl').attr('uid',$(this).attr('uid'));
	$('.tanceng .rkdzjpjrk_quedingjixu_btnxxl').attr('uid',$(this).attr('uid'));
	$('.tanceng .rkd_zhengjandpj_saosnma_inputxxl').focus().attr('typeid',0);
	$('.tanceng .rkd_zhengjandpj_rksnma_trxxl').html('');
	$('.rkd_zjpj_snmanoshow_errxxl').html('<div class="no_data_box"><div class="no_data"><p class="c_9">请扫SN码！</p></div><div class="no_data_bottom"></div></div>')
})
//入配件按钮
$('.tanceng .rkdan_rupeijian_btnxxl').die().live('click',function(){
	zhengji_rkfs_data.category = '2';
	zhengji_rkfs_data.id = $(this).attr('uid');
	zhengji_rkfs_ajax();
	$('.tanceng .rkdzipj_rkqueding_btnxxl').attr('uid',$(this).attr('uid'));
	$('.tanceng .rkdzjpjrk_quedingjixu_btnxxl').attr('uid',$(this).attr('uid'));
	$('.tanceng .rkd_zhengjandpj_saosnma_inputxxl').focus().attr('typeid',1);
	$('.tanceng .rkd_zhengjandpj_rksnma_trxxl').html('');
	$('.rkd_zjpj_snmanoshow_errxxl').html('<div class="no_data_box"><div class="no_data"><p class="c_9">请扫SN码！</p></div><div class="no_data_bottom"></div></div>')
})

function zhengji_rkfs_ajax(){
	$.ajax({
		type:"get",
		url:SERVER_URL+"stock-in/productincategory",
		data:zhengji_rkfs_data,
		dataType:'json',
		success:function(data){
			if(data.code!=0){
				console.log(data)
			}else{
				console.log(data);
				var pjdata = data['dataList'];
				$('.tanceng .rkglzjandpj_rk_spbh_xxl').html(likNullData(pjdata.product_type_no));
				$('.tanceng .rkgl_zjandpj_rk_sp_xxl').html(likNullData(pjdata.product_type_name)+' 属性: '+likNullData(pjdata.attr_name));
				$('.tanceng .rkgl_zjandpj_rk_rksl_xxl').html(likNullData(pjdata.input_num)+'台');
				$('.tanceng .rkgl_zjandpj_yrknum_xxl').html(likNullData(pjdata.distribution_num)+'台');
				var pjsplist = pjdata.productList,spname='',sp_list='';
				if(pjsplist.length==0){
					$('.tanceng .rkd_zjandpj_splist_showxxl').html('');
					$('.tanceng .rkd_zjandpj_spname_listmdxxl').html('');
					$('.tanceng .rkd_zjandps_splist_errhtml_xxl').html('<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>');
				}else{
					$('.tanceng .rkd_zjandps_splist_errhtml_xxl').html('');
					$.each(pjsplist, function(i,v) {
						spname +='<span class="relative"><a href="#md_'+v.cate_id+'_0"><button class="but_mix but_lan">'+v.cate_name+'</button></a></span>';
						$.each(v.pieceList, function(j,m) {
							sp_list +='<div class="crk_rkd_peijian"><div class="unhead_box crk_unhead_box2 clearfix" id="md_'+m.cate_id+'_'+j+'">';
                        sp_list +='<div class="crk_unhead_tit left crk_unhead_tit1">';
                        sp_list +='商品编号：<span style="margin-right: 30px;">'+likNullData(m.code_sn)+'</span>';
                        sp_list +='商品：<span>'+likNullData(m.product_name)+'/</span><span>'+likNullData(m.unit_name)+'/</span><span>属性:'+likNullData(m.attr_name)+'</span><span></span>';
                        sp_list +='</div><div class="crk_unhead_con right">';            
                        sp_list +='<i>数量：<span style="margin-right:0;">'+likNullData(m.num)+'</span><hr></i>';        
                        sp_list +='<i class="c_r">已入数量：<span class="c_r rkdzjoj_smyrsl_xsxxl" style="margin-right: 20px;">0</span></i></div></div>';        
                        sp_list +='<div class="dialog_text_con">';
                        sp_list +='<div class="t_textinput clearfix crk_rkgl_srms crk_rkgl_srms_a"><div class="t_textinput on">';
                        sp_list +='<input type="radio" name="crk_blrk_mean" checked="checked">扫码序列号码';        
                        sp_list +='<div class="inline_block" style="width: 60%;margin-left:8px;"> <input type="text" num="'+likNullData(m.num)+'" class="time_input rkdzjpj_smxlhainput_xxl" value="" onfocus="fn_focus(this);" onblur="fn_blur(this);" onpaste="return false" ondragenter="return false" onkeyup="this.value=check(this.value)" disabled="disabled">';            
                        sp_list +='</div></div>';           
                        sp_list +='<div class="t_textinput crk_rkd_bsmrk"><input type="radio" name="crk_blrk_mean">不扫码入库 ';           
                        sp_list +='<div class="num_input inline_block num_input_new" style="margin-left: 17px;"><button class="but_blue but_opa_small inp_plus rkdzjpjrk_jiajianum_sctrxxl" num="'+likNullData(m.num)+'" maxnum="'+m.num+'" disabled="disabled">+</button><input type="text" value="0" readonly="readonly">';
                        sp_list +='</div></div></div>';       
                        sp_list +='<div class="div_1"><div class="div_1 table-container" style="margin:0;">';            
                        sp_list +='<table><thead><tr><th>序号</th><th>序列号</th><th>入库人</th><th>入库时间</th><th>操作</th></tr></thead>';            
                        sp_list +='<tbody class="rkdzjsp_sxlhaddtr_listxxl_'+i+'" pjid="'+m.product_id+'"></tbody><tbody><tr class="table_total"><td>合计</td><td class="rkdzjpj_sxlh_trlength_xxl">0</td><td></td><td></td><td></td></tr></tbody></table></div></div></div></div>';
						});
						
                         //<button class="but_blue but_opa_small radius_left_0 inp_reduce rkdzjpj_jianjiansl_trdeletexxl">-</button>       
                            
					});
					var spnametit ='<span><span class="relative"><a href="#md_0"><button class="but_mix">全部</button></a></span></span>';//<i class="right_icon"></i><a href="#md_0"></a>
					$('.tanceng .rkd_zjandpj_spname_listmdxxl').html(spnametit+spname);
					$('.tanceng .rkd_zjandpj_splist_showxxl').html(sp_list);
				}
				
			}
		},
		error:function(e){
			console.log(e)
		}
	});
}
//整机带配件SN扫码
$('.tanceng .rkd_zhengjandpj_saosnma_inputxxl').die().live('keydown', function(e) {
	if($(this).attr('typeid')==0){
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
	e = e || event;
	var keyCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
	if(keyCode == 13) {
		if($('.tanceng .rkd_zhengjandpj_saosnma_inputxxl').val()==''){
			return false;
		}
		e.preventDefault();
		$('.tanceng .rkd_zjpj_snmanoshow_errxxl').html('');
		$(this).attr('disabled','disabled');
		$('.rkd_zhengjandpj_rksnma_trxxl').append('<tr><td>' + $('.tanceng .rkd_zhengjandpj_saosnma_inputxxl').val() + '</td><td>' + username + '</td><td>' + now + '</td><td><button class="but_mix but_r val_dialogTop rkdzjandpj_titsmsnma_deletexxl" name="">删除</button></td></tr>')
			//$(this).val('')crk_rkgl_deletebb <td class="rkdrkbtn_rkhaoma_indexzhengji_xxl">01</td>
		$('.tanceng .rkd_zhengjandpj_saosnma_inputxxl').val('');
		$.each($('.tanceng .rkd_zhengjandpj_rksnma_trxxl tr'), function(i, v) {
		$(this).attr('indexid', i)
		//$(this).children('td.rkdrkbtn_rkhaoma_indexzhengji_xxl').html(Appendzero(i + 1))
	});
	//$('.tanceng .rkglrkd_zhengjirk_trlength_xxl').html($('.tanceng .rkd_zhengjandpj_rksnma_trxxl tr').length);
		return false;
	}
	}else{
		e = e || event;
		var keyCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
		if(keyCode == 13) {
			e.preventDefault();
			//console.log($(this).val())
			huoqu_sn_data.sn = $(this).val();
			huoqu_sn_ajax()
		}
	}
});
//获取SN详情
var huoqu_sn_data = {
	token:token,
	sn:''
}
function huoqu_sn_ajax(){
	$.ajax({
		type:"get",
		url:SERVER_URL+"stock-in/infobysn",
		dataType:'json',
		data:huoqu_sn_data,
		success:function(data){
			if(data.code!=0){
				console.log(data)
			}else{
				console.log(data)
				var snlist = data['data'],snhtml='';
				if(snlist.length==0){
					$('.tanceng .rkd_zhengjandpj_rksnma_trxxl').html('');
					$('.tanceng .rkd_zhengjandpj_saosnma_inputxxl').val('').focus();
					$('.tanceng .rkd_zjpj_snmanoshow_errxxl').html('<div class="no_data_box"><div class="no_data"><p class="c_9">请扫SN码！</p></div><div class="no_data_bottom"></div></div>');
					alert('对不起,您扫入的SN码不存在')
				}else{
					$('.tanceng .rkd_zjpj_snmanoshow_errxxl').html('');
					//$.each(snlist, function(i,v) {
						snhtml +='<tr indexid="0"><td>' + snlist.sn + '</td><td>' + snlist.input_name + '</td><td>' + snlist.create_time + '</td><td><button class="but_mix but_r val_dialogTop rkdzjandpj_titsmsnma_deletexxl" name="">删除</button></td></tr>'
					//});crk_rkgl_deletebb <td class="rkdrkbtn_rkhaoma_indexzhengji_xxl"></td>
					$('.tanceng .rkd_zhengjandpj_rksnma_trxxl').html(snhtml);
					$('.tanceng .rkd_zhengjandpj_saosnma_inputxxl').attr('disabled','disabled').val('');
				}
			}
		},
		error:function(e){
			console.log(e)	
		}
	});
}
//删除tr
$('.tanceng .rkdzjandpj_titsmsnma_deletexxl').die().live('click', function() {
//	$('.tanceng .rkdrk_delete_btnxxl').attr({
//		'zjpjsnid':$(this).parent().parent().attr('indexid'),
//		'snid':'1'
//	})
	$(this).parents('tr').remove();
	$('.tanceng .rkd_zjpj_snmanoshow_errxxl').html('<div class="no_data_box"><div class="no_data"><p class="c_9">请扫SN码！</p></div><div class="no_data_bottom"></div></div>');
	$('.tanceng .rkd_zhengjandpj_saosnma_inputxxl').val('').removeAttr('disabled').focus();
	
})
//$('.tanceng .rkdrk_delete_btnxxl').live('click', function() {
//	if($(this).attr('snid')==1){
//		$(".tanceng .rkd_zhengjandpj_rksnma_trxxl tr[indexid='" + $(this).attr('zjpjsnid') + "']").remove();
//	$('.tanceng .rkd_zhengjandpj_saosnma_inputxxl').removeAttr('disabled').focus();
//	$('.rkd_zjpj_snmanoshow_errxxl').html('<div class="no_data_box"><div class="no_data"><p class="c_9">请扫SN码！</p></div><div class="no_data_bottom"></div></div>')
//	}else{
//		return false;
//	}
//	
//})
//整机带配件xuliehao扫码
$('.tanceng .rkdzjpj_smxlhainput_xxl').die().live('keydown', function(e) {
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
	e = e || event;
	var keyCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
	if(keyCode == 13) {
		if($(this).val()==''){
			return false;
		}
		e.preventDefault();
		$(this).parents('.dialog_text_con').children('.div_1').children().children('table').children('tbody').eq(0).append('<tr><td class="rkdrkbtn_rkhaoma_indexzhengji_xxl">01</td><td>' + $(this).val() + '</td><td>' + username + '</td><td>' + now + '</td><td><button class="but_mix but_r val_dialogTop rkdzjpj_sxlhao_shanchu_btnxxl" name="crk_rkgl_deletebb">删除</button></td></tr>')
		$(this).val('');
		if($(this).parents('.dialog_text_con').children('.div_1').children().children('table').children('tbody').eq(0).children().length==$(this).attr('num')){
			$(this).attr('disabled','disabled').val('');
			$(this).parents('.dialog_text_con').prev().children('.crk_unhead_con').children('i').eq(1).removeClass('c_r').children().removeClass('c_r');
			var mdid = $(this).parents('.dialog_text_con').prev().attr('id');
			$('.tanceng .rkd_zjandpj_spname_listmdxxl').children().children('a[href="#'+mdid+'"]').append('<i class="right_icon"></i>');
			var ttd = $('.tanceng .rkd_zjandpj_spname_listmdxxl').children().children('a');
			var ttlength = $('.tanceng .rkd_zjandpj_spname_listmdxxl').children().children('a').length;
			var ttnum = 0;
			$.each(ttd, function(i,v) {
				console.log(v)
				if(ttd.eq(i).children('.right_icon').length>0){
					ttnum++;
					//$('.tanceng .rkd_zjandpj_spname_listmdxxl').children().eq(0).append('<i class="right_icon"></i>');
					//ttd.eq(i).children('.right_icon').remove();
				}else{
					//$('.tanceng .rkd_zjandpj_spname_listmdxxl').children().eq(0).children().remove('.right_icon');
					//ttd.eq(i).append('<i class="right_icon"></i>');
				}
			});
			if(ttnum==ttlength){
				$('.tanceng .rkd_zjandpj_spname_listmdxxl').children().eq(0).children().children().append('<i class="right_icon"></i>');
				ttd.parents('.rkd_zjandpj_spname_listmdxxl').children().eq(0).children().children().children().append('<i class="right_icon"></i>');
				$('.tanceng .rkdzjpjrk_quedingjixu_btnxxl').attr('typeid','1')
				$('.tanceng .rkdzipj_rkqueding_btnxxl').attr('typeid','1')
				//$.each(ttd, function(i,v) {
					//ttd.eq(i).children('.right_icon').remove();
				//});
			}else{
				$('.tanceng .rkd_zjandpj_spname_listmdxxl').children().eq(0).children().children().remove('.right_icon');
				ttd.parents('.rkd_zjandpj_spname_listmdxxl').children().eq(0).children().children().children().remove('.right_icon');
				$('.tanceng .rkdzjpjrk_quedingjixu_btnxxl').attr('typeid','0')
				$('.tanceng .rkdzipj_rkqueding_btnxxl').attr('typeid','0')
//				$.each(ttd, function(i,v) {
//					ttd.eq(i).children('.right_icon').remove();
//				});
			}
//			$('.tanceng .rkd_zjandpj_spname_listmdxxl').children().children('a').each(function(i,v){
//				//console.log(i,v)
//				if($(this).children('.right_icon').length>0){
//					//console.log('ok')
//					$(this).children('.right_icon').remove();
//					$('.tanceng .rkd_zjandpj_spname_listmdxxl').children().eq(0).append('<i class="right_icon"></i>');
//				}else{
//					//console.log('no')
//					$(this).append('<i class="right_icon"></i>');
//					$('.tanceng .rkd_zjandpj_spname_listmdxxl').children().eq(0).children().remove('.right_icon');
//				}
//			})
		}else{
			$(this).removeAttr('disabled');
			$(this).parent().parent().next().children('.num_input_new').children('.rkdzjpjrk_jiajianum_sctrxxl').removeAttr('disabled');
		}
		
		$(this).parents('.dialog_text_con').children('.div_1').children().children('table').children('tbody').eq(0).children().each(function(i,v){
			$(this).attr('indexid', i)
			$(this).children('td.rkdrkbtn_rkhaoma_indexzhengji_xxl').html(Appendzero(i + 1))
		})
	//$(this).parent().parent().next().children('.num_input_new').children('.rkdzjpjrk_jiajianum_sctrxxl').attr('num',parseInt($(this).attr('num'))-parseInt($(this).parents('.crk_dialog_text_con').children('.div_1').children().children('table').children('tbody').eq(0).children().length));
	$(this).parents('.dialog_text_con').children('.div_1').children().children('table').children('tbody').eq(1).children().children('.rkdzjpj_sxlh_trlength_xxl').html($(this).parents('.dialog_text_con').children('.div_1').children().children('table').children('tbody').eq(0).children().length)
	$(this).parents('.dialog_text_con').prev().children('.crk_unhead_con').children().eq(1).children('.rkdzjoj_smyrsl_xsxxl').html($(this).parents('.dialog_text_con').children('.div_1').children().children('table').children('tbody').eq(0).children().length);
		return false;
	}
});
//删除tr
$('.tanceng .rkdzjpj_sxlhao_shanchu_btnxxl').die().live('click', function() {
	$('.tanceng .rkdrk_delete_btnxxl').attr({
		'spscid':$(this).parent().parent().attr('indexid'),
		'fjmc':$(this).parents('tbody').attr('class')
	})
//	$(this).parents('tr').remove();
//	$(this).parents('.div_1').prev().children().find('input.rkdzjpj_smxlhainput_xxl').removeAttr('disabled').focus();
//	if($(this).parents('tbody').children('tr').length==0){
//		$(this).parents('tbody').html('');
//		$(this).parents('tbody').next('tbody').children().find('.rkdzjpj_sxlh_trlength_xxl').html('0');
//	}else{
//		$(this).parents('tbody').children('tr').each(function(i,v){
//			$(this).children('.rkdrkbtn_rkhaoma_indexzhengji_xxl').html(Appendzero(i + 1));
//		})
//		$(this).parents('tbody').next('tbody').children().find('.rkdzjpj_sxlh_trlength_xxl').html($(this).parents('tbody').children('tr').length);
//	}
})
$('.tanceng .rkdrk_delete_btnxxl').die().live('click', function() {
	$('.tanceng .rkdzjpjrk_quedingjixu_btnxxl').attr('typeid','0')
	$('.tanceng .rkdzipj_rkqueding_btnxxl').attr('typeid','0')
	var fjmc = $(this).attr('fjmc').substring(-1,$(this).attr('fjmc').length + 1);
	//console.log($(".tanceng ."+fjmc+" tr[indexid='" + $(this).attr('spscid') + "']"))
	$(".tanceng ."+fjmc+" tr[indexid='" + $(this).attr('spscid') + "']").remove();
	$(".tanceng ."+fjmc+"").parents('.dialog_text_con').prev().children('.crk_unhead_con').children().eq(1).addClass('c_r').children('.rkdzjoj_smyrsl_xsxxl').html($(".tanceng ."+fjmc+" tr").length).addClass('c_r');
	$(".tanceng ."+fjmc+"").next().children().children('.rkdzjpj_sxlh_trlength_xxl').html($(".tanceng ."+fjmc+" tr").length).addClass('c_r');
	$(".tanceng ."+fjmc+"").parents('.dialog_text_con').children('.crk_rkgl_srms').children().eq(1).children('input').removeAttr('checked');
	$(".tanceng ."+fjmc+"").parents('.dialog_text_con').children('.crk_rkgl_srms').children().eq(0).children('input').attr('checked','checked');
	$(".tanceng ."+fjmc+"").parents('.dialog_text_con').children('.crk_rkgl_srms').children().children().children('.rkdzjpj_smxlhainput_xxl').removeAttr('disabled').focus();
	$(".tanceng ."+fjmc+"").parents('.dialog_text_con').children('.crk_rkgl_srms').children('.crk_rkd_bsmrk').css('color','#ccc').children('.num_input').children('button').attr('disabled','disabled').css('background','#ccc').siblings('input').attr('disabled','disabled').css('border-color','#ccc');
	var mdid = $(".tanceng ."+fjmc+"").parents('.dialog_text_con').prev().attr('id');
	//console.log(mdid)
	$('.tanceng .rkd_zjandpj_spname_listmdxxl').children('span.relative').children('a[href="#'+mdid+'"]').children('i.right_icon').remove();
	//var ttd = $('.tanceng .rkd_zjandpj_spname_listmdxxl').children().children('a');
	//$('.tanceng .rkd_zjandpj_spname_listmdxxl').children().eq(0).children().children().remove('.right_icon');
	$('.tanceng .rkd_zjandpj_spname_listmdxxl').children().eq(0).children().children().children('i.right_icon').remove();
	//$(".tanceng ."+fjmc+"").parents('.crk_dialog_text_con').children().eq(0).children().find('button.rkdzjpjrk_jiajianum_sctrxxl').attr('num',parseInt($(".tanceng ."+fjmc+"").parents('.crk_dialog_text_con').children().eq(0).children().find('button.rkdzjpjrk_jiajianum_sctrxxl').attr('maxnum'))-parseInt($(".tanceng ."+fjmc+" tr").length))
	//$('.xidingt_noshow_xxl .rkd_zjandpj_spname_listmdxxl').children().eq(0).children('i.right_icon').remove();
	//$(this).parents('.crd_zj_and_pjbox').prev().children('.rkd_zjandpj_spname_listmdxxl').children().eq(0).children().children().children('i.right_icon').remove();
	$(".tanceng ."+fjmc+"").parents('.dialog_text_con').children().children('.crk_rkd_bsmrk').children('div').children('input').val($(".tanceng ."+fjmc+" tr").length)
	$(".tanceng ."+fjmc+"").parents('.dialog_text_con').children().children().eq(0).children('input').attr('zznum',parseInt($(".tanceng ."+fjmc+"").parents('.dialog_text_con').children().children().eq(0).children('div').children('input').attr('num'))-parseInt($(".tanceng ."+fjmc+" tr").length));
	//rkdzjpj_sxlh_trlength_xxl
	$(".tanceng ."+fjmc+"").parents('.dialog_text_con').children('.div_1').children().children('table').children('tbody').eq(0).children().each(function(i,v){
			$(this).attr('indexid', i)
			$(this).children('td.rkdrkbtn_rkhaoma_indexzhengji_xxl').html(Appendzero(i + 1))
		})
})
//按钮加加tr
$('.tanceng .rkdzjpjrk_jiajianum_sctrxxl').die().live('click',function(){
	if($(this).attr('num')==$(this).parents('.crk_rkgl_srms').next().children().children().children('tbody').eq(0).children().length){
		$(this).next().val($(this).parents('.crk_rkgl_srms').next().children().children().children('tbody').eq(0).children().length)
		return false;
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
	var default_num = parseInt($(this).next('input').val());
	var nums_xxl = parseInt($(this).attr('num'));
	if(default_num > nums_xxl) {
		$(this).next('input').val(nums_xxl);
	} else {
		$(this).next('input').val(default_num);
		$(this).parents('.dialog_text_con').children('.div_1').children().children('table').children('tbody').eq(0).append('<tr><td class="rkdrkbtn_rkhaoma_indexzhengji_xxl">01</td><td>-</td><td>' + username + '</td><td>' + now + '</td><td><button class="but_mix but_r val_dialogTop rkdzjpj_sxlhao_shanchu_btnxxl" name="crk_rkgl_deletebb">删除</button></td></tr>');
		if($(this).parents('.dialog_text_con').children('.div_1').children().children('table').children('tbody').eq(0).children().length==$(this).attr('num')){
			$(this).attr('disabled','disabled');
			$(this).parents('.dialog_text_con').prev().children('.crk_unhead_con').children('i').eq(1).removeClass('c_r').children().removeClass('c_r');
			$(this).parents('.dialog_text_con').children('.div_1').children().children('table').children('tbody').eq(1).children().children('.rkdzjpj_sxlh_trlength_xxl').css('color','#333');
			var mdid = $(this).parents('.dialog_text_con').prev().attr('id');
			$('.tanceng .rkd_zjandpj_spname_listmdxxl').children().children('a[href="#'+mdid+'"]').append('<i class="right_icon"></i>');
			var ttd = $('.tanceng .rkd_zjandpj_spname_listmdxxl').children().children('a');
			var ttlength = $('.tanceng .rkd_zjandpj_spname_listmdxxl').children().children('a').length;
			//console.log(ttlength)
			var ttnum = 0;
			$.each(ttd, function(i,v) {
				//console.log(v)
				if(ttd.eq(i).children('.right_icon').length>0){
					ttnum++;
					//$('.tanceng .rkd_zjandpj_spname_listmdxxl').children().eq(0).append('<i class="right_icon"></i>');
					//ttd.eq(i).children('.right_icon').remove();
				}else{
					//$('.tanceng .rkd_zjandpj_spname_listmdxxl').children().eq(0).children().remove('.right_icon');
					//ttd.eq(i).append('<i class="right_icon"></i>');
				}
			});
			if(ttnum==ttlength){
				$('.tanceng .rkd_zjandpj_spname_listmdxxl').children().eq(0).children().children().append('<i class="right_icon"></i>');
				ttd.parents('.rkd_zjandpj_spname_listmdxxl').children().eq(0).children().children().append('<i class="right_icon"></i>');
				$('.tanceng .rkdzjpjrk_quedingjixu_btnxxl').attr('typeid','1')
				$('.tanceng .rkdzipj_rkqueding_btnxxl').attr('typeid','1')
				//$.each(ttd, function(i,v) {
					//ttd.eq(i).children('.right_icon').remove();
				//});
			}else{
				$('.tanceng .rkd_zjandpj_spname_listmdxxl').children().eq(0).children().children().remove('.right_icon');
				ttd.parents('.rkd_zjandpj_spname_listmdxxl').children().eq(0).children().children().remove('.right_icon');
				$('.tanceng .rkdzjpjrk_quedingjixu_btnxxl').attr('typeid','0')
				$('.tanceng .rkdzipj_rkqueding_btnxxl').attr('typeid','0')
//				$.each(ttd, function(i,v) {
//					ttd.eq(i).children('.right_icon').remove();
//				});
			}
//			$('.tanceng .rkd_zjandpj_spname_listmdxxl').children().children('a').each(function(i,v){
//				//console.log(i,v)
//				if($(this).children('.right_icon').length>0){
//					//console.log('ok')
//					$(this).children('.right_icon').remove();
//					$('.tanceng .rkd_zjandpj_spname_listmdxxl').children().eq(0).append('<i class="right_icon"></i>');
//				}else{
//					//console.log('no')
//					$(this).append('<i class="right_icon"></i>');
//					$('.tanceng .rkd_zjandpj_spname_listmdxxl').children().eq(0).children().remove('.right_icon');
//				}
//			})
		}else{
			$(this).removeAttr('disabled');
		}
		$(this).next().val($(this).parents('.crk_rkgl_srms').next().children().children().children('tbody').eq(0).children().length)
		$(this).parents('.dialog_text_con').children('.div_1').children().children('table').children('tbody').eq(0).children().each(function(i,v){
			$(this).attr('indexid', i)
			$(this).children('td.rkdrkbtn_rkhaoma_indexzhengji_xxl').html(Appendzero(i + 1))
		})
	$(this).parent().parent().prev().children('input').attr('zznum',parseInt($(this).parent().parent().prev().children('div').children('input').attr('num'))-parseInt($(this).parents('.dialog_text_con').children('.div_1').children().children('table').children('tbody').eq(0).children().length));
	$(this).parent().prev().attr('zznum',parseInt($(this).attr('num'))-parseInt($(this).parents('.dialog_text_con').children('.div_1').children().children('table').children('tbody').eq(0).children().length));
	$(this).parents('.dialog_text_con').children('.div_1').children().children('table').children('tbody').eq(1).children().children('.rkdzjpj_sxlh_trlength_xxl').html($(this).parents('.dialog_text_con').children('.div_1').children().children('table').children('tbody').eq(0).children().length)
	$(this).parents('.dialog_text_con').prev().children('.crk_unhead_con').children().eq(1).children('.rkdzjoj_smyrsl_xsxxl').html($(this).parents('.dialog_text_con').children('.div_1').children().children('table').children('tbody').eq(0).children().length);
		
	}
})
$('.tanceng .rkdzjpj_jianjiansl_trdeletexxl').die().live('click',function(){
	$(this).prev().prev('.rkdzjpjrk_jiajianum_sctrxxl').removeAttr('disabled');
	$(this).parents('.dialog_text_con').children('.div_1').children().children('table').children('tbody').eq(0).children('tr:last-child').remove();
	$(this).parents('.dialog_text_con').children('.div_1').children().children('table').children('tbody').eq(1).children().children('.rkdzjpj_sxlh_trlength_xxl').html($(this).parents('.dialog_text_con').children('.div_1').children().children('table').children('tbody').eq(0).children().length).css('color','red');
	$(this).parents('.dialog_text_con').prev().children('.crk_unhead_con').children().eq(1).addClass('c_r').children('.rkdzjoj_smyrsl_xsxxl').html($(this).parents('.dialog_text_con').children('.div_1').children().children('table').children('tbody').eq(0).children().length).addClass('c_r');
	var mdid = $(this).parents('.dialog_text_con').prev().attr('id');
	$('.tanceng .rkd_zjandpj_spname_listmdxxl').children().children('a[href="#'+mdid+'"]').children('.right_icon').remove();
	$('.tanceng .rkd_zjandpj_spname_listmdxxl').children().eq(0).children().children().children('i.right_icon').remove();
	//$('.xidingt_noshow_xxl .rkd_zjandpj_spname_listmdxxl').children().eq(0).children('i.right_icon').remove();
	$(this).parents('.crd_zj_and_pjbox').prev().children('.rkd_zjandpj_spname_listmdxxl').children().eq(0).children().children().children('i.right_icon').remove();
	$(this).parent().parent().prev().children('input').attr('zznum',parseInt($(this).attr('num'))-parseInt($(this).parents('.dialog_text_con').children('.div_1').children().children('table').children('tbody').eq(0).children().length));
	$(this).parent().prev().attr('zznum',parseInt($(this).attr('num'))-parseInt($(this).parents('.dialog_text_con').children('.div_1').children().children('table').children('tbody').eq(0).children().length))
})
//吸顶条效果
function myFunction(){
	//console.log($('.tanceng .rkdzjpj_scroll_mainboxxxl').scrollTop())
	//console.log($('.tanceng .rkd_zhengji_box').height())
	if($('.tanceng .rkdzjpj_scroll_mainboxxxl').scrollTop() > $('.tanceng .rkd_zhengji_box').height()+90){
		$('.tanceng .ximgxiaoliang_xidingtiao_xxl').html($('.tanceng .rkd_zjpjrknav_contentxxl').html()).addClass(' rkd_all_peij_tit rkd_zjpjrknav_contentxxl');
		//$('.tanceng .rkd_zjandpj_splist_showxxl').parent().prev().children('.xidingt_noshow_xxl').removeClass('rkd_zjandpj_spname_listmdxxl');
	}else{
		$('.tanceng .ximgxiaoliang_xidingtiao_xxl').html('').removeClass('rkd_all_peij_tit rkd_zjpjrknav_contentxxl');
		//$('.tanceng .rkd_zjandpj_splist_showxxl').parent().prev().children('.xidingt_noshow_xxl').addClass('rkd_zjandpj_spname_listmdxxl');
	}
}
//确定并继续入库
$('.tanceng .rkdzjpjrk_quedingjixu_btnxxl').die().live('click',function(){
	var zjpj_list = [];
	if($('.tanceng .rkd_zhengjandpj_rksnma_trxxl tr').length==0){
		alert('请扫SN码');
		$('.tanceng .rkd_zhengjandpj_saosnma_inputxxl').focus();
		return false;
	}
	var SNma = $('.tanceng .rkd_zhengjandpj_rksnma_trxxl tr').children().eq(0).html();
	//console.log(SNma)
	if($(this).attr('typeid')==0){
		alert('配件必须全部入库才可以哦！！！');
		return false;
	}
	
	//console.log($('.tanceng .rkd_zjandpj_splist_showxxl').children('.rkd_dialog_text_con').children('.div_1').children().children().children('tbody').eq(0).children('tr').length);
	$.each($('.tanceng .rkd_zjandpj_splist_showxxl').children('.crk_rkd_peijian').children('.dialog_text_con').children('.div_1'), function(i,v) {
		//console.log($(this).children().children().children('tbody').eq(0).children('tr'))
		$.each($(this).children().children().children('tbody').eq(0).children('tr'), function(i,v) {
			//console.log($(this).children().eq(1).html())
			zjpj_list.push({
			'sn':SNma,
			'serial_number':$(this).children().eq(1).html(),
			'piece_id':$(this).parent('tbody').attr('pjid')
		})
		});
		
	});
	//console.log(zjpj_list)
	rkd_qudrk_spdata.id = $(this).attr('uid');
	rkd_qudrk_spdata.remark = '';
	rkd_qudrk_spdata.input_way = '1';
	rkd_qudrk_spdata.category = '2';
	rkd_qudrk_spdata.product_info = JSON.stringify(zjpj_list);
	rkd_qudrk_spajax();
//	zhengji_rkfs_data.category = '2';
//	zhengji_rkfs_data.id = $(this).attr('uid');
	zhengji_rkfs_ajax();
	$('.tanceng .rkd_zhengjandpj_saosnma_inputxxl').removeAttr('disabled').focus();
	$('.tanceng .rkd_zhengjandpj_rksnma_trxxl').html('');
	$('.rkd_zjpj_snmanoshow_errxxl').html('<div class="no_data_box"><div class="no_data"><p class="c_9">请扫SN码！</p></div><div class="no_data_bottom"></div></div>')
	
});
//确定入库
$('.tanceng .rkdzipj_rkqueding_btnxxl').die('click').live('click',function(){
	var zjpj_list = [];
	if($('.tanceng .rkd_zhengjandpj_rksnma_trxxl tr').length==0){
		alert('请扫SN码');
		$('.tanceng .rkd_zhengjandpj_saosnma_inputxxl').focus();
		return false;
	}
	var SNma = $('.tanceng .rkd_zhengjandpj_rksnma_trxxl tr').children().eq(0).html();
	//console.log(SNma)
	if($(this).attr('typeid')==0){
		alert('配件必须全部入库才可以哦！！！');
		return false;
	}
	
	//console.log($('.tanceng .rkd_zjandpj_splist_showxxl').children('.rkd_dialog_text_con').children('.div_1').children().children().children('tbody').eq(0).children('tr').length);
	$.each($('.tanceng .rkd_zjandpj_splist_showxxl').children('.crk_rkd_peijian').children('.dialog_text_con').children('.div_1'), function(i,v) {
		//console.log($(this).children().children().children('tbody').eq(0).children('tr'))
		$.each($(this).children().children().children('tbody').eq(0).children('tr'), function(i,v) {
			//console.log($(this).children().eq(1).html())
			zjpj_list.push({
			'sn':SNma,
			'serial_number':$(this).children().eq(1).html(),
			'piece_id':$(this).parent('tbody').attr('pjid')
		})
		});
		
	});
	console.log(zjpj_list)
	rkd_qudrk_spdata.id = $(this).attr('uid');
	rkd_qudrk_spdata.remark = '';
	rkd_qudrk_spdata.input_way = '1';
	rkd_qudrk_spdata.category = '2';
	rkd_qudrk_spdata.product_info = JSON.stringify(zjpj_list);
	rkd_qudrk_spajax();
	$('.tanceng div').remove();
$('.tanceng').css('display','none');
})















