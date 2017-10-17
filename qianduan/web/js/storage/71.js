var token, page, num;
token = Admin.get_token();
companyid = window.localStorage.getItem('usercompany_id');
//SERVER_URL="http://192.168.0.167:9091/";
page = 1;
num = 10;
//token = "2017051317050663733-1-1";
//SERVER_URL = 'http://192.168.0.167:9010/';
var loginUserInfo = JSON.parse(localStorage.getItem('user_info'));
//console.log(loginUserInfo)
var fpck='stock-out/add',blck='stock-out/out',fahuo='stock-out/shipments',zjzz='pz-package/list',zjzzsjkz='pz-package/package';
if(loginUserInfo['company_admin'] != 1){
	if(loginUserInfo.powerUrls.length==0){
		$('.ckgl_lsibqiehuan_mainul_xxl li[typeid="3"]').hide()
	}else{
		var arr = loginUserInfo.powerUrls;//
		if($.inArray(zjzz, arr)!=-1){
			$('.ckgl_lsibqiehuan_mainul_xxl li[typeid="3"]').show()
		}else{
			$('.ckgl_lsibqiehuan_mainul_xxl li[typeid="3"]').hide()
		}
	}
}

//点击刷新
$('.ckgl_dianjshuaxin_btnxxl').die('click').live('click', function() {
		add_Rload_index(71, 8) //参数页面值，父级值
	})
	//切换页面
$('.ckgl_lsibqiehuan_mainul_xxl li').die('click').live('click', function() {
	$(".zkgjss_cont[name='storage_ckgl_zkgjss']").css('display','none');
	$('button[name="storage_ckgl_zkgjss"]').html('展开高级搜索').css({"background": "","color": "","border-color": ""});
	if($(this).attr('typeid') == 1) {
		$('.ckgl_dfpckssvalue_xxl').val('搜索关联单据编号/相关往来名称').css('color','rgb(204, 204, 204)');
		ckgl_dfpck_listdata.key='';
		ckgl_dfpck_listajax()
	} else if($(this).attr('typeid') == 2) {
		$('.ckgl_ckd_ssvalues_xxl').val('搜索关联单据编号').css('color','rgb(204, 204, 204)');
		ckgl_ckd_listdata.key='';
		ckgl_ckdlist_ajax();
	} else {
		$('.ckgl_pzspzjssvalue_xxl').val('搜索出库编号/关联单据编号/组装商品/配置商品编号').css('color','rgb(204, 204, 204)');;
		ckgl_pzspzj_data.key='';
		ckgl_pzspzj_ajax();
	}
})
var ckgl_dfpck_listdata = {
		token: token,
		page: page,
		num: num,
		key: '',
		output_type: '', //出库类型 1销售出库 2采购退货 3调拨 4借出 5借入归还 6换货出库
		output_name: '', //出库人
		logistics_way: '', //物流方式 1.快递 2.陆运 3.空运 4.平邮 5.海运
		document_marker: '', //下单人
		distribution_name: '', //分配人
		warehouse_id: '', //库房ID
		order_by: 'output_time', //排序字段 时间排序：create_time
		order_sort: '1', //排序次序 0 顺序 1 倒序
		begin_time: '', //开始时间 如：2017-01-01
		end_time: '',//结束时间 如：2017-01-01
		is_package_freight:'',//是否包运费 1 是 2 否
		status:''//分配状态 1 未分配 2 部分分配 3 完成分配 （不显示完成分配 值为‘1,2’）
	}
var ckgl_ckd_listdata = {
		token: token,
		page: page,
		num: num,
		key: '',
		output_type: '', //出库类型 1销售出库 2采购退货 3调拨 4借出 5借入归还 6换货出库
		output_name: '', //出库人
		logistics_way: '', //物流方式 1.快递 2.陆运 3.空运 4.平邮 5.海运
		output_status: '', //出库状态 1.待出库 2.部分出库 3.完成出库
		shipment_status: '', //发货状态 1.待发货 2.部分发货 3.完成发货
		warehouse_id: '', //库房ID
		related_receipts_no: '', //关联单据编号
		order_by: 'create_time', //排序字段
		order_sort: '1',//排序次序 0 顺序 1 倒序
		is_package_freight:''//是否包运费 1 是 2 否
	}
if ($('#left_button_71').attr('fromnotice') == 1) { // 当前是从消息过来的
    var curId = $('#left_button_71').attr('detailid');
    var secondName = $('#left_button_71').attr('secondmenu'); 
    if(secondName=='待分配出库'){
    	$.each($('.tabtitle li'), function (i, v) {
        if (secondName == $.trim($('.tabtitle li').eq(i).text())) {
            //$('.tabtitle li').removeClass('tabhover').eq(i).addClass('tabhover');
            ckgl_dfpck_listdata = {		// 初始化参数
                token: token,
               	page: page,
				num: num,
				key: '',
				output_type: '', //出库类型 1销售出库 2采购退货 3调拨 4借出 5借入归还 6换货出库
				output_name: '', //出库人
				logistics_way: '', //物流方式 1.快递 2.陆运 3.空运 4.平邮 5.海运
				document_marker: '', //下单人
				distribution_name: '', //分配人
				warehouse_id: '', //库房ID
				order_by: 'output_time', //排序字段 时间排序：create_time
				order_sort: '1', //排序次序 0 顺序 1 倒序
				begin_time: '', //开始时间 如：2017-01-01
				end_time: '',//结束时间 如：2017-01-01
				is_package_freight:'',//是否包运费 1 是 2 否
				status:'',//分配状态 1 未分配 2 部分分配 3 完成分配 （不显示完成分配 值为‘1,2’）人id,//创建日期：1升序2降序
                ids:curId
            };
            setTimeout(function(){
                $('.tabtitle li').eq(i).trigger('click'); //触发相应子模块事件
                $('#left_button_71').attr({	 // 清空按钮的属性
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
            ckgl_ckd_listdata = {		// 初始化参数
                token: token,
              page: page,
			num: num,
			key: '',
			output_type: '', //出库类型 1销售出库 2采购退货 3调拨 4借出 5借入归还 6换货出库
			output_name: '', //出库人
			logistics_way: '', //物流方式 1.快递 2.陆运 3.空运 4.平邮 5.海运
			output_status: '', //出库状态 1.待出库 2.部分出库 3.完成出库
			shipment_status: '', //发货状态 1.待发货 2.部分发货 3.完成发货
			warehouse_id: '', //库房ID
			related_receipts_no: '', //关联单据编号
			order_by: 'create_time', //排序字段
			order_sort: '1',//排序次序 0 顺序 1 倒序
			is_package_freight:'',//是否包运费 1 是 2 否
             ids:curId
            };
            setTimeout(function(){
                $('.tabtitle li').eq(i).trigger('click'); // 触发相应子模块事件
                $('#left_button_71').attr({	 // 清空按钮的属性
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
    ckgl_dfpck_listajax();
}
	//切换状态升降序
	var ckgldfpckcjrq=0;
$('.ckgl_dfpckgjss_cjrqpx_xxl').die().live('click',function(){
	ckgldfpckcjrq++;
	if(ckgldfpckcjrq%2==0){
		ckgl_dfpck_listdata.order_sort = '0';
	}else{
		ckgl_dfpck_listdata.order_sort = '1';
	}
	ckgl_dfpck_listdata.order_by = 'output_time';
	ckgl_dfpck_listajax()
})
//$('.ckgl_dfpckgjss_cjrqpx_xxl').toggle(function() {
//		$(this).children(".price_icon").removeClass("down").addClass("up");
//		ckgl_dfpck_listdata.order_by = 'output_time';
//		ckgl_dfpck_listdata.order_sort = '0';
//		ckgl_dfpck_listajax()
//	}, function() {
//		$(this).children(".price_icon").removeClass("up").addClass("down");
//		ckgl_dfpck_listdata.order_by = 'output_time';
//		ckgl_dfpck_listdata.order_sort = '1';
//		ckgl_dfpck_listajax()
//	})
	// 定义待分配出库查看项
var ckgl_dfpck_dyckxlist = [{
	'index': null,
	'field': '物流方式'
}, {
	'index': null,
	'field': '商品分配数量'
}, {
	'index': null,
	'field': '整机分配数量'
}, {
	'index': null,
	'field': '分配状态'
}, {
	'index': null,
	'field': '下单人'
}, {
	'index': null,
	'field': '分配人'
}];

function ckgl_dfpck_listajax() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "stocking-out/list",
		data: ckgl_dfpck_listdata,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data);
				$('.ckgl_dfpck_listtbody_htmlxxl').html('');
				$('.ckgl_fenyelist_dfpck_xxl').css('display', 'none');
				$('.ckgl_dfpcklist_errhtmlxxl').css('display', 'block');
			} else {
				console.log(data);
				var ckdfp_list = data['dataList'],
					ckdfp_html = '';
				$('.ckgl_dfpckssnums_mainxxl').html(data.totalcount);
				if(ckdfp_list.length == 0) {
					$('.ckgl_dfpck_listtbody_htmlxxl').html('');
					$('.ckgl_fenyelist_dfpck_xxl').css('display', 'none');
					$('.ckgl_dfpcklist_errhtmlxxl').css('display', 'block');
				} else {
					$('.ckgl_fenyelist_dfpck_xxl').css('display', 'block');
					$('.ckgl_dfpcklist_errhtmlxxl').css('display', 'none');
					$.each(ckdfp_list, function(i, v) {
						if(v.is_cancel == 1) {
							ckdfp_html += '<tr class="grey"><td><span class="voidIcon">作废</span></td>';
							ckdfp_html += '<td>' + likNullData(v.output_time.substr(0,10)) + '</td>';
							ckdfp_html += '<td>' + likNullData(v.related_receipts_no) + '</td>';
							if(v.output_type == 1) {
								ckdfp_html += '<td>销售出库</td>';
							} else if(v.output_type == 2) {
								ckdfp_html += '<td>采购退货</td>';
							} else if(v.output_type == 3) {
								ckdfp_html += '<td>借出出库</td>';
							} else if(v.output_type == 4) {
								ckdfp_html += '<td>借入归还</td>';
							} else if(v.output_type == 5){
								ckdfp_html += '<td>销售换货</td>';
							}else {
								ckdfp_html += '<td>采购换货</td>';
							}
							ckdfp_html += '<td>' + likNullData(v.related_business_name) + '</td>';
							if(v.logistics_way == 1) {
								ckdfp_html += '<td>快递</td>';
							} else if(v.logistics_way == 2) {
								ckdfp_html += '<td>陆运</td>';
							} else if(v.logistics_way == 3) {
								ckdfp_html += '<td>空运</td>';
							} else if(v.logistics_way == 4) {
								ckdfp_html += '<td>平邮</td>';
							} else {
								ckdfp_html += '<td>海运</td>';
							}
							if(v.is_package_freight==1){
								ckdfp_html += '<td>包运费</td>';
							}else{
								ckdfp_html += '<td>不包运费</td>';
							}
							if(v.warehouse_name == null || v.warehouse_name == undefined) {
								ckdfp_html += '<td><span class="c_c">未分配</span></td>';
							} else {
								ckdfp_html += '<td>' + likNullData(v.warehouse_name) + '</td>';
							}
							if(v.output_name == null || v.output_name == undefined) {
								ckdfp_html += '<td><span class="c_c">未分配</span></td>';
							} else {
								ckdfp_html += '<td>' + likNullData(v.output_name) + '</td>';
							}

							ckdfp_html += '<td>' + likNullData(v.output_num) + '</td>';
							ckdfp_html += '<td>' + likNullData(v.distribution_num) + '</td>';
							ckdfp_html += '<td>' + likNullData(v.set_num) + '</td>';
							ckdfp_html += '<td>' + likNullData(v.combo_set_num) + '</td>';
							if(v.status==1){
								ckdfp_html +='<td><span class="c_c">未分配</span></td>';
							}else if(v.status==2){
								ckdfp_html +='<td><span class="c_y">部分分配</span></td>';
							}else{
								ckdfp_html +='<td class="c_g">完成分配</td>';
							}
							ckdfp_html += '<td>' + likNullData(v.document_marker) + '</td>';
							ckdfp_html += '<td>' + likNullData(v.distribution_name) + '</td>';
							ckdfp_html += '<td>' + likNullData(v.remark) + '</td><td>';
							ckdfp_html += '<button class="but_mix but_look r_sidebar_btn" uid="' + v.id + '" name="storage_cfgl_dfp">查看</button><button class="but_mix but_grey1">分配</button>';
							ckdfp_html += '</td></tr>';
						} else {
							ckdfp_html += '<tr><td>' + Appendzero(i + 1) + '</td>';
							ckdfp_html += '<td>' + likNullData(v.output_time.substr(0,10)) + '</td>';
							ckdfp_html += '<td>' + likNullData(v.related_receipts_no) + '</td>';
							if(v.output_type == 1) {
								ckdfp_html += '<td>销售出库</td>';
							} else if(v.output_type == 2) {
								ckdfp_html += '<td>采购退货</td>';
							} else if(v.output_type == 3) {
								ckdfp_html += '<td>借出出库</td>';
							} else if(v.output_type == 4) {
								ckdfp_html += '<td>借入归还 </td>';
							} else if(v.output_type == 5){
								ckdfp_html += '<td>销售换货</td>';
							}else {
								ckdfp_html += '<td>采购换货</td>';
							}
							ckdfp_html += '<td>' + likNullData(v.related_business_name) + '</td>';
							if(v.logistics_way == 1) {
								ckdfp_html += '<td>快递</td>';
							} else if(v.logistics_way == 2) {
								ckdfp_html += '<td>陆运</td>';
							} else if(v.logistics_way == 3) {
								ckdfp_html += '<td>空运</td>';
							} else if(v.logistics_way == 4) {
								ckdfp_html += '<td>平邮</td>';
							} else {
								ckdfp_html += '<td>海运</td>';
							}
							if(v.is_package_freight==1){
								ckdfp_html += '<td>包运费</td>';
							}else{
								ckdfp_html += '<td>不包运费</td>';
							}
							if(v.warehouse_name == null || v.warehouse_name == undefined) {
								ckdfp_html += '<td><span class="c_c">未分配</span></td>';
							} else {
								ckdfp_html += '<td>' + likNullData(v.warehouse_name) + '</td>';
							}
							if(v.output_name == null || v.output_name == undefined) {
								ckdfp_html += '<td><span class="c_c">未分配</span></td>';
							} else {
								ckdfp_html += '<td>' + likNullData(v.output_name) + '</td>';
							}

							ckdfp_html += '<td>' + likNullData(v.output_num) + '</td>';
							ckdfp_html += '<td>' + likNullData(v.distribution_num) + '</td>';
							if(v.set_num == 0) {
								ckdfp_html += '<td>-</td>';
								ckdfp_html += '<td>-</td>';
							} else {
								ckdfp_html += '<td>' + likNullData(v.set_num) + '</td>';
								ckdfp_html += '<td>' + likNullData(v.combo_set_num) + '</td>';
							}
							if(v.status==1){
								ckdfp_html +='<td><span class="c_c">未分配</span></td>';
							}else if(v.status==2){
								ckdfp_html +='<td><span class="c_y">部分分配</span></td>';
							}else{
								ckdfp_html +='<td class="c_g">完成分配</td>';
							}
							ckdfp_html += '<td>' + likNullData(v.document_marker) + '</td>';
							ckdfp_html += '<td>' + likNullData(v.distribution_name) + '</td>';
							ckdfp_html += '<td>' + likNullData(v.remark) + '</td><td>';
							if(v.status==3) {
								ckdfp_html += '<button class="but_mix but_look val_dialog ckgl_dfpckckbtn_xxl" uid="' + v.id + '" fpid="1" name="crk_cgl_fpckLookxqsp">查看</button><button class="but_mix but_grey1">分配</button>';
							} else {
								var fpck='stock-out/add',blck='stock-out/out',fahuo='stock-out/shipments',zjzz='pz-package/list',zjzzsjkz='pz-package/package';
								if(loginUserInfo['company_admin'] != 1){
									if(loginUserInfo.powerUrls.length==0){
										ckdfp_html += '<button class="but_mix but_look val_dialog ckgl_dfpckckbtn_xxl" uid="' + v.id + '" fpid="2" name="crk_cgl_fpckLookxqsp">查看</button>';
									}else{
										var arr = loginUserInfo.powerUrls;//
										if($.inArray(fpck, arr)!=-1){
											ckdfp_html += '<button class="but_mix but_look val_dialog ckgl_dfpckckbtn_xxl" uid="' + v.id + '" fpid="2" name="crk_cgl_fpckLookxqsp">查看</button><button class="but_mix but_look val_dialog ckgl_dfpckfenpbtn_xxl" zjcksl="'+v.set_num+'" uid="' + v.id + '" cjrq="' + v.create_time + '" gldjbh="' + v.related_receipts_no + '" name="crk_ckgl_fpck" spcksl="' + v.output_num + '" spyfpnum="' + v.distribution_num + '" wlid="' + v.logistics_way + '">分配</button>';
										}else{
											ckdfp_html += '<button class="but_mix but_look val_dialog ckgl_dfpckckbtn_xxl" uid="' + v.id + '" fpid="2" name="crk_cgl_fpckLookxqsp">查看</button>';
										}
									}
								}else if(loginUserInfo['company_admin'] == 1){
									ckdfp_html += '<button class="but_mix but_look val_dialog ckgl_dfpckckbtn_xxl" uid="' + v.id + '" fpid="2" name="crk_cgl_fpckLookxqsp">查看</button><button class="but_mix but_look val_dialog ckgl_dfpckfenpbtn_xxl" zjcksl="'+v.set_num+'" uid="' + v.id + '" cjrq="' + v.create_time + '" gldjbh="' + v.related_receipts_no + '" name="crk_ckgl_fpck" spcksl="' + v.output_num + '" spyfpnum="' + v.distribution_num + '" wlid="' + v.logistics_way + '">分配</button>';
								}
								
								//ckdfp_html += '<button class="but_mix but_look val_dialog ckgl_dfpckckbtn_xxl" uid="' + v.id + '" fpid="2" name="crk_cgl_fpckLookxqsp">查看</button><button class="but_mix but_look val_dialog ckgl_dfpckfenpbtn_xxl" uid="' + v.id + '" cjrq="' + v.create_time + '" gldjbh="' + v.related_receipts_no + '" name="crk_ckgl_fpck" spcksl="' + v.output_num + '" spyfpnum="' + v.distribution_num + '" wlid="' + v.logistics_way + '">分配</button>';
							}

							ckdfp_html += '</td></tr>';
						}
					});
					$('.ckgl_dfpck_listtbody_htmlxxl').html(ckdfp_html);
					
				}
				list_table_render_pagination(".ckgl_fenyelist_dfpck_xxl", ckgl_dfpck_listdata, ckgl_dfpck_listajax, data.totalcount, ckdfp_list.length);
					likShow('#ckgl_dfpxzckx_tablebox_xxl', ckgl_dfpck_dyckxlist, '#ckgl_dfpck_ckxul_xxl', '#ckgl_dfpck_ckxbaocun_btnxxl', '#ckgl_dfpck_hfmoren_btnxxl');
			}
		},
		error: function(e) {
			console.log(e);
			$('.ckgl_dfpck_listtbody_htmlxxl').html('');
			$('.ckgl_fenyelist_dfpck_xxl').css('display', 'none');
			$('.ckgl_dfpcklist_errhtmlxxl').css('display', 'block');
		}
	});
}
//ckgl_dfpck_listajax();
//补零
function Appendzero(obj) {
	if(obj < 10) return "0" + obj;
	else return obj;
}
//待分配出库搜索
//function ckgl_dfpckssnow_showxxl(val) {
//	ckgl_dfpck_listdata.key = val;
//	ckgl_dfpck_listajax();
//}
$('.ckgl_dfpckssbtn_xxl').die('click').live('click', function() {
		if($(this).prev().val() == '' || $(this).prev().val() == '搜索关联单据编号/相关往来名称') {
			ckgl_dfpck_listdata.key='';
		} else {
			ckgl_dfpck_listdata.key = $(this).prev().val();
			
		}
		ckgl_dfpck_listajax()
	})
	//待分配出库高级搜索
$('.ckgl_dfpckgjss_ckleix_xxl li').die('click').live('click', function() {
	//console.log($(this).attr('typeid'));
	ckgl_dfpck_listdata.output_type = $(this).attr('typeid');
	ckgl_dfpck_listajax()
})
$('.ckgl_dfprkgjss_wlfs_ulxxl li').die('click').live('click', function() {
	//console.log($(this).attr('typeid'));
	ckgl_dfpck_listdata.logistics_way = $(this).attr('typeid');
	ckgl_dfpck_listajax()
})
$('.ckgl_dfpckkflist_htmlxxl li').die('click').live('click', function() {
	ckgl_dfpck_listdata.warehouse_id = $(this).attr('uid');
	ckgl_dfpck_listajax()
})
$('.ckgl_dfpck_ckrlisthtmlxxl li').die('click').live('click', function() {
	ckgl_dfpck_listdata.output_name = $(this).attr('uid');
	ckgl_dfpck_listajax()
})
$('.ckgl_dfpck_fuzeren_listhtml_xxl li').die('click').live('click', function() {
	ckgl_dfpck_listdata.document_marker = $(this).attr('uid');
	ckgl_dfpck_listajax()
})
$('.ckgl_dfpckxiadan_rlisthtml_xxl li').die('click').live('click', function() {
	ckgl_dfpck_listdata.distribution_name = $(this).attr('uid');
	ckgl_dfpck_listajax()
})
$('.ckgl_dfpck_ztxxl li').die('click').live('click', function() {
	//console.log($(this).attr('typeid'));
	ckgl_dfpck_listdata.status = $(this).attr('typeid');
	ckgl_dfpck_listajax()
})

//员工高级搜索人员列表
var ygong_listckgl_data = {
	token: token
	
}

function ygong_listckgl_ajax() {
	$.ajax({
		type: "post",
		url: SERVER_URL + "stocking-out/alluser",
		data: ygong_listckgl_data,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data)
			} else {
				console.log(data)
				var yg_list = data['data'],
					yg_html = '',fzrhtml='',xdrhtml='';
				$.each(yg_list.outputNameList, function(i, v) {
					yg_html += '<li uid="' + v.id + '">' + v.name + '</li>';
				});
				$.each(yg_list.documentMarkerList, function(i, v) {
					xdrhtml += '<li uid="' + v.id + '">' + v.name + '</li>';
				});
				$.each(yg_list.disNameList, function(i, v) {
					fzrhtml += '<li uid="' + v.id + '">' + v.name + '</li>';
				});
				$('.ckgl_dfpck_ckrlisthtmlxxl').html(yg_html);
				$('.ckgl_dfpck_fuzeren_listhtml_xxl').html(fzrhtml);
				$('.ckgl_dfpckxiadan_rlisthtml_xxl').html(xdrhtml);
				//$('.ckgl_ckd_ckrul_gjssxxl').html(yg_html);
				//$('.ckgl_pzspzjgjss_zuzren_listxxl').html(yg_html);
			}
		},
		error: function(e) {
			console.log(e)
		}
	});

}
$('.ckd_gjsschukuren_valuexxl,.ckd_gjsschukuren_valuexxl+i').die().live('click',function(){
	$.ajax({
		type:"get",
		url:SERVER_URL+"stock-out/alluser",
		dataType:'json',
		data:{token:token},
		success:function(data){
			if(data.code!=0){
				console.log(data)
			}else{
				console.log(data);
				var rkrdata=data['data'],rkrhtml='';
				$.each(rkrdata.outputNameList, function(i,v) {
					rkrhtml +='<li uid="'+v.id+'">'+v.name+'</li>'
				});
				$('.ckgl_ckd_ckrul_gjssxxl').html(rkrhtml)
			}
		},
		error:function(e){
			console.log(e)
		}
	});
})
$('.zuzhuang_gjss_zuzren_xxl,.zuzhuang_gjss_zuzren_xxl+i').die().live('click',function(){
	$.ajax({
		type:"get",
		url:SERVER_URL+"pz-package/alluser",
		dataType:'json',
		data:{token:token},
		success:function(data){
			if(data.code!=0){
				console.log(data)
			}else{
				console.log(data);
				var rkrdata=data['data'],rkrhtml='';
				$.each(rkrdata.packageNameList, function(i,v) {
					rkrhtml +='<li uid="'+v.id+'">'+v.name+'</li>'
				});
				$('.ckgl_pzspzjgjss_zuzren_listxxl').html(rkrhtml)
			}
		},
		error:function(e){
			console.log(e)
		}
	});
})
$('button[name="storage_ckgl_zkgjss"]').die().live('click',function(){
	if($(this).text()=='隐藏高级搜索'){
		ygong_listckgl_ajax();
		//$('.ckgl_dfpcklist_errhtmlxxl').css('width','155%')
		//$('.ckgl_ckd_listerrhtml_xxl').css('width','155%')
		//$('.ckgl_pzspzjerrhtml_xxl').css('width','120%')
	}else{
		//$('.ckgl_dfpcklist_errhtmlxxl').css('width','100%')
		//$('.ckgl_ckd_listerrhtml_xxl').css('width','100%')
		//$('.ckgl_pzspzjerrhtml_xxl').css('width','100%')
	}
})
//ygong_listckgl_ajax()
	//库房列表
var kufang_listckgl_data = {
	token: token,
	key: '',
	page: '',
	num: ''
}

function kufang_listckgl_ajax() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "warehouse/list",
		data: kufang_listckgl_data,
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
				$('.ckgl_dfpckkflist_htmlxxl').html(kf_html);
				$('.ckgl_ckd_ckkful_xxl').html(kf_html);
				$('.ckgl_pzspzjgjss_kflistxxl').html(kf_html);
				$('.ckgl_tianjiackd_kflist_xxl').html(kf_html);
			}
		},
		error: function(e) {

		}
	});
}
$('.ckgl_fpkf_listbtnxxl,.ckgl_fpkf_listbtnxxl+i').die().live('click',function(){
	kufang_listckgl_ajax()
})
//kufang_listckgl_ajax()
$('.ckgl_tianjiackd_kflist_xxl li').die('click').live('click', function() {
		$('.ckgl_addckd_xzckkf_xxl').attr('uid', $(this).attr('uid'))
	})
	//待分配出库查看详情
var ckgl_dfpckckxq_data = {
	token: token,
	id: '',
	detail: '0' //是否显示商品明细 0 否 1 是
}
$('.ckgl_dfpckckbtn_xxl').die('click').live('click', function() {
//	if($(this).attr('fpid') == 1) {
//		$('.ckgl_dfpckck_fenpeibtn_xxl').attr('disabled', 'disabled').text('已分配完成');
//	} else {
//		$('.ckgl_dfpckck_fenpeibtn_xxl').removeAttr('disabled').text('分配');
//	}
//	ckgl_dfpckckxq_data.id = $(this).attr('uid');
//	ckgl_dfpckckxq_data.detail = '0';
//	ckgl_dfpckckxq_ajax();
ckgl_dfpckckxq_ckdata.id = $(this).attr('uid');
	ckgl_dfpckckxq_ckajax();
})
	//待分配出库列表分配按钮
$('.ckgl_dfpckfenpbtn_xxl').die('click').live('click', function() {
	$('.tanceng .ckgl_dfpck_newsp_listhtml_xxl').html('');
//		$('.ckgl_dfpckspqdck_btnsxxl').attr({
//			'uid': $(this).attr('uid'),
//			'wlid': $(this).attr('wlid')
//		});
//		$('.ckgl_dfpck_newsp_listhtml_xxl').html('');
//		$('.ckgl_dfpckaddckdbtn_xxl').css('display', 'block');
//		$('.tanceng .ckgl_dfpckaddckdbtn_xxl').attr('uid', $(this).attr('uid'));
//		var _this = $(this),
//			pzrksl_nums = _this.parent().prevAll().eq(4).html(),
//			rkleixing = _this.parent().prevAll().eq(11).html(),
//			wuliu = _this.parent().prevAll().eq(9).html(),
//			pzyfp_nums = _this.parent().prevAll().eq(3).html();
//		$('.tanceng .ckgl_dfpckfpck_cjrqs_xxl').html($(this).attr('cjrq'));
//		$('.tanceng .ckgl_dfpckfpck_gldjbhs_xxl').html($(this).attr('gldjbh'));
//		$('.tanceng .ckgl_dfpckfpck_cklxs_xxl').html(rkleixing);
//		$('.tanceng .ckgl_dfpckfpck_wlfss_xxl').html(wuliu);
//		$('.tanceng .ckgl_dfpckfpck_spcksls_xxl').html($(this).attr('spcksl'));
//		$('.tanceng .ckgl_dfpckfpck_spyfpnums_xxl').html($(this).attr('spyfpnum'));
//		$('.tanceng .ckgl_dfpckfpck_pzcksls_xxl').html(pzrksl_nums);
//		$('.tanceng .ckgl_dfpckfpck_pzdpspyfpsls_xxl').html(pzyfp_nums);
//		$('.tanceng .ckgl_dfpckfpck_cjrqs_xxl').parent().children('span').css('marginRight', '30px')
	$('.tanceng .ckgldfpck_tjckdbtn_xxl').attr('uid',$(this).attr('uid'))
	$('.tanceng .ckgl_dfpck_xcckdqueding_btnxxl').attr('uid',$(this).attr('uid'))
	ckgl_dfpckckxq_data.id = $(this).attr('uid');
	ckgl_dfpckckxq_ajax();
	})
$('.tanceng .ckgldfpck_tjckdbtn_xxl').die().live('click',function(){
	if(parseInt($(this).attr('spcksl'))==0){
		$('.tanceng li[spck="spck"]').hide().next('li').hide();
		$('.tanceng .dialog_content_3').width(480)
	}else if(parseInt($(this).attr('zjcksl'))==0){
		$('.tanceng li[zjck="zjck"]').hide().nextAll('li').hide();
		$('.tanceng li[spck="spck"]').next('li').hide();
		$('.tanceng .dialog_content_3').width(240)
	}
	$('.tanceng .ckgl_dfpck_fpckxzmainli_xxl>li.xs_bjd_li').attr('uid',$(this).attr('uid'));
})

function ckgl_dfpckckxq_ajax() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "stocking-out/infobyid",
		data: ckgl_dfpckckxq_data,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data)
			} else {
				console.log(data);
				var dfpxq_list = data['data'];
				if(dfpxq_list.output_type == 1) {
					$('.tanceng .ckgl_dfpckfpck_cklxs_xxl').html('销售出库')
				} else if(dfpxq_list.output_type == 2) {
					$('.tanceng .ckgl_dfpckfpck_cklxs_xxl').html('采购退货')
				} else if(dfpxq_list.output_type == 3) {
					$('.tanceng .ckgl_dfpckfpck_cklxs_xxl').html('借出出库')
				} else if(dfpxq_list.output_type == 4) {
					$('.tanceng .ckgl_dfpckfpck_cklxs_xxl').html('借入归还')
				} else if(dfpxq_list.output_type == 5) {
					$('.tanceng .ckgl_dfpckfpck_cklxs_xxl').html('销售换货 ')
				} else {
					$('.tanceng .ckgl_dfpckfpck_cklxs_xxl').html('采购换货')
				}
				$('.tanceng .ckgl_fpck_tit_ckrq_xxl').html(dfpxq_list.output_time);
				$('.tanceng .ckgl_dfpckfpck_gldjbhs_xxl').html(dfpxq_list.related_receipts_no);
				if(dfpxq_list.is_package_freight==1){
					$('.tanceng .ckgldfpck_fenpeicdyf_xxl').html('包运费');
				}else{
					$('.tanceng .ckgldfpck_fenpeicdyf_xxl').html('不包运费');
				}
				$('.tanceng .ckgl_dfpckfpck_spcksls_xxl').html(dfpxq_list.output_num);
				$('.tanceng .ckgl_dfpckfpck_spyfpnums_xxl').html(dfpxq_list.distribution_num);
				$('.tanceng .ckgl_dfpckfpck_zjcksl_xxl').html(dfpxq_list.set_num);
				$('.tanceng .ckgl_dfpck_fpck_tit_zjfpsl_xxl').html(dfpxq_list.combo_set_num);
				$('.tanceng .ckgldfpck_tjckdbtn_xxl').attr({'spcksl':dfpxq_list.output_num,'zjcksl':dfpxq_list.set_num})
				if(dfpxq_list.logistics_way == 1) {
					$('.tanceng .ckgldfpck_fenpeitit_wlfsxxl').html('快递');
				} else if(dfpxq_list.logistics_way == 2) {
					$('.tanceng .ckgldfpck_fenpeitit_wlfsxxl').html('陆运');
				} else if(dfpxq_list.logistics_way == 3) {
					$('.tanceng .ckgldfpck_fenpeitit_wlfsxxl').html('空运');
				} else if(dfpxq_list.logistics_way == 4) {
					$('.tanceng .ckgldfpck_fenpeitit_wlfsxxl').html('平邮');
				} else {
					$('.tanceng .ckgldfpck_fenpeitit_wlfsxxl').html('海运');
				}
				$('.tanceng .ckgldfpck_fenpeitit_shrxxl').html(dfpxq_list.consignee);
				$('.tanceng .ckgldfpck_fenpeitit_shrdhxxl').html(dfpxq_list.consignee_tel);
				$('.tanceng .ckgldfpck_fenpeitit_shdzxxl').html(dfpxq_list.consignee_addr);
//				if(dfpxq_list.warehouse_name == null || dfpxq_list.warehouse_name == undefined) {
//					$('.ckgl_dfpckckxq_fpkfxxl').html('未分配')
//				} else {
//					$('.ckgl_dfpckckxq_fpkfxxl').html(dfpxq_list.warehouse_name);
//				}
//				if(dfpxq_list.output_name == null || dfpxq_list.output_name == undefined) {
//					$('.ckgl_dfpckckxq_ckrxxl').html('未分配')
//				} else {
//					$('.ckgl_dfpckckxq_ckrxxl').html(dfpxq_list.output_name)
//				}
//				$('.ckgl_dfpckckxq_spcksl_xxl').html(dfpxq_list.output_num)
//				$('.ckgl_dfpckckxq_spyfpnum_xxl').html(dfpxq_list.distribution_num);
//				$('.ckgl_dfpckckxq_chakanbtn_xxl').attr({
//					'uid': dfpxq_list.id,
//					'cjrq': dfpxq_list.create_time,
//					'gldjbh': dfpxq_list.related_receipts_no,
//					'cklx': $('.ckgl_dfpckckxq_cklexxl').html(),
//					'wlfs': $('.ckgl_dfpckckxq_wlfs_xxl').html(),
//					'spcksl': dfpxq_list.output_num,
//					'spyfpsl': dfpxq_list.distribution_num,
//					'pzcksl': dfpxq_list.set_num,
//					'pzyfpnum': dfpxq_list.combo_set_num
//				});
//				if(dfpxq_list.set_num == 0) {
//					$('.ckgl_dfpckpzcksl_xxl').html('-');
//					$('.ckgl_dfpckckxq_pzdpspyfpnum_xxl').html('-');
//				} else {
//					$('.ckgl_dfpckpzcksl_xxl').html('配件' + dfpxq_list.set_num);
//					$('.ckgl_dfpckckxq_pzdpspyfpnum_xxl').html('配件' + dfpxq_list.combo_set_num);
//				}
//				$('.ckgl_dfpckckxq_fzren_xxl').html(dfpxq_list.business_owner);
//				$('.ckgl_dfpckckxq_xiadr_xxl').html(dfpxq_list.document_marker);
//				$('.ckgl_dfpckckxq_beizhu_xxl').html(dfpxq_list.remark);
//				//				if(dfpxq_list.output_num==dfpxq_list.distribution_num&&dfpxq_list.set_num==dfpxq_list.combo_set_num){
//				//					$('.ckgl_dfpckck_fenpeibtn_xxl').attr('disabled','disabled')
//				//				}
//				$('.ckgl_dfpckck_fenpeibtn_xxl').attr({
//					'uid': dfpxq_list.id,
//					'wlid': dfpxq_list.logistics_way,
//					'cjrq': dfpxq_list.create_time,
//					'gldjbh': dfpxq_list.related_receipts_no,
//					'cklx': $('.ckgl_dfpckckxq_cklexxl').html(),
//					'wlfs': $('.ckgl_dfpckckxq_wlfs_xxl').html(),
//					'spcksl': dfpxq_list.output_num,
//					'spyfpsl': dfpxq_list.distribution_num,
//					'pzcksl': dfpxq_list.set_num,
//					'pzyfpnum': dfpxq_list.combo_set_num
//				});

			}
		},
		error: function(e) {
			console.log(e)
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
		html += '<li class="left_1" cussortid = "' + data["id"] + '" bmmc="'+data['name']+'">' + html_i_list_before + '<span class="icon_open"></span><span class="icon_file"></span><span class="list_msg">' + data['name'] + '('+data.user_info.length+')</span></li>';
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

function xzrenyuan_listxxl() {
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
				var datalists = data.rows,rlit=data.list,rhtml=''; //jiaojierenyuan
				var deep = 0;
				$.each(rlit, function(i,v) {
					rhtml +='<li class="left_2 person_left_nav" userinfoid="' + v.id+ '"><i class="list_before_span"></i><span class="list_msg" bmmc="'+v.name+'">' +v.name+ ' </span></li>'
				});
				$('.ckgl_renyuan_listmainxxl').html('(' + data.sum_num + ')')
				$('.ckgl_xzrenyuan_listhtml_xxl').html(tree_list_person(datalists, deep)+rhtml);
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
//xzrenyuan_listxxl();
$('.val_dialogTop[name="crk_ckgl_dxPerson"]').die().live('click',function(){
	xzrenyuan_listxxl();
})
//选择chu库人
$('.tanceng .ckglpzspzz_dgzz_xzryxxl').die().live('click', function() {
	$('.tanceng .ckgl_xzckrnyuan_qdbtnxxl').attr('typeid', '1')
})
$('.tanceng .ckglpzspzj_zpreyuan_xzbtnxxl').die().live('click', function() {
	$('.tanceng .ckgl_xzckrnyuan_qdbtnxxl').attr('typeid', '2')
})
//设置分配出库人
$('.tanceng .ckgl_shezhifpckr_btnxxl').die().live('click', function() {
	$('.tanceng .ckgl_xzckrnyuan_qdbtnxxl').attr('typeid', '3');
	$('.tanceng .ckgl_shezhickrlihtml_xxl').html('');
	$('.tanceng .ckgl_shezhifpckr_btnxxl').parent('li').show();
})
$('.tanceng .ckgl_szfpckr_shanchubtn_xxl').die().live('click',function(){
	$(this).parents('li').removeAttr('uid');
	$(this).parent('i').remove();
	$('.tanceng .ckgl_shezhifpckr_btnxxl').parent('li').show();
})
$('.tanceng .ckgl_xzckrnyuan_qdbtnxxl').die('click').live('click', function() {
	var rkd_rkrid = $('.tanceng .ckgl_xzrenyuan_listhtml_xxl').find('li.on').attr('userinfoid'),
		rkd_rkrmc = $('.tanceng .ckgl_xzrenyuan_listhtml_xxl').find('li.on').children('span.list_msg').text(),
		bumenmc = $('.tanceng .ckgl_xzrenyuan_listhtml_xxl').find('li.on').parents('ul').prev('.left_1').attr('bmmc'),
		bumenid = $('.tanceng .ckgl_xzrenyuan_listhtml_xxl').find('li.on').parents('ul').prev('.left_1').attr('cussortid');
		
	//$('.tanceng .ckgl_addckd_xzckrval_xxl').val(rkd_rkrmc).attr('uid', rkd_rkrid).css('color', '#333');
	if($(this).attr('typeid') == '1') {
		$('.tanceng .ckgldgzz_renyuan_showxxl').html('<i><i class="del_img_1 ckgldgzz_rydelete_xxl">-</i><em class="icon_personBtn icon_personBtn_msg"></em><em class="icon_adderBtn"></em><p class="box_adderName" uid="' + rkd_rkrid + '">' + rkd_rkrmc + '</p></i>').attr('uid', rkd_rkrid);
		$('.tanceng .ckgldgzz_renyuan_showxxl').next().css('display', 'none');
	} else if($(this).attr('typeid') == '2'){
		$('.tanceng .ckglzhengpi_zzren_showli_xxl').html('<i><i class="del_img_1 ckglzhengpzz_reydelete_xxl">-</i><em class="icon_personBtn icon_personBtn_msg"></em><em class="icon_adderBtn"></em><p class="box_adderName" uid="' + rkd_rkrid + '">' + rkd_rkrmc + '</p></i>').attr('uid', rkd_rkrid);
		$('.tanceng .ckglzhengpi_zzren_showli_xxl').next().css('display', 'none');
	}else if($(this).attr('typeid') == '3'){
		$('.tanceng .ckgl_shezhickrlihtml_xxl').html('<i><i class="del_img_1 ckgl_szfpckr_shanchubtn_xxl">-</i><em class="icon_personBtn icon_personBtn_msg"></em><em class="icon_adderBtn"></em><p class="box_adderName">'+likNullData(rkd_rkrmc)+'</p></i>').attr('uid',rkd_rkrid);
		$('.tanceng .ckgl_shezhifpckr_btnxxl').parent('li').hide();
	}else if($(this).attr('typeid') == '4'){
		$('.tanceng .ckd_xjwl_fzrvalxxl').val(rkd_rkrmc).attr('uid', rkd_rkrid);
		$('.tanceng .ckd_xjwl_fuzebumen_xxl').val(bumenmc).attr('uid',bumenid);
	}else{
		$('.tanceng .ckgl_addckd_xzckrval_xxl').val(rkd_rkrmc).attr('uid', rkd_rkrid).css('color', '#333');
	}
	$(this).parent().parent().parent().remove();
	var num = $('.tanceng').children(".dialog_box").length;
	if(num < 1) {
		$(".tanceng").hide();
	}
})
$('.tanceng .ckgldgzz_rydelete_xxl').die().live('click', function() {
	$('.ckglpzspzz_dgzz_xzryxxl').parent().css('display', 'block');
	$('.tanceng .ckgldgzz_renyuan_showxxl').html('').removeAttr('uid');
})
$('.tanceng .ckglzhengpzz_reydelete_xxl').die().live('click', function() {
		$('.ckglpzspzj_zpreyuan_xzbtnxxl').parent().css('display', 'block');
		$('.tanceng .ckglzhengpi_zzren_showli_xxl').html('').removeAttr('uid');
	})
	//待分配出库查看下的查看列表
$('.ckgl_dfpckckxq_chakanbtn_xxl').die().live('click', function() {
	$('.tanceng .ckgl_dfpckcktwo_cjrqxxl').html($(this).attr('cjrq'));
	$('.tanceng .ckgl_dfpckcktwo_gldjbhxxl').html($(this).attr('gldjbh'));
	$('.tanceng .ckgl_dfpckcktwo_cklxxl').html($(this).attr('cklx'));
	$('.tanceng .ckgl_dfpckcktwo_wlfsxxl').html($(this).attr('wlfs'));
	$('.tanceng .ckgl_dfpckcktwo_spckslxxl').html($(this).attr('spcksl'));
	$('.tanceng .ckgl_dfpckcktwo_spyfpnumxxl').html($(this).attr('spyfpsl'));
	$('.tanceng .ckgl_dfpckcktwo_pzckslxxl').html($(this).attr('pzcksl'));
	$('.tanceng .ckgl_dfpckcktwo_pzdpspyfpnumxxl').html($(this).attr('pzyfpnum'));
	ckgl_dfpckckxq_ckdata.id = $(this).attr('uid');
	ckgl_dfpckckxq_ckajax();
})
var ckgl_dfpckckxq_ckdata = {
	token: token,
	id: ''
}

function ckgl_dfpckckxq_ckajax() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "stocking-out/disinfo",
		data: ckgl_dfpckckxq_ckdata,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data);
				$('.tanceng .ckgl_dfpckcktwo_tablelisthtml_xxl').html('');
				$('.tanceng .ckgl_dfpckcktwo_listerrhtml_xxl').css('display', 'block');
			} else {
				console.log(data);
				var cktwo_list = data['dataList'],
					cktwo_html = '';
					$('.tanceng .ckgl_dfpckcktwo_cjrqxxl').html(likNullData(cktwo_list.output_time));
					$('.tanceng .ckgl_dfpckcktwo_gldjbhxxl').html(likNullData(cktwo_list.related_receipts_no));
					if(cktwo_list.output_type==1){
						$('.tanceng .ckgl_dfpckcktwo_cklxxl').html('销售出库');
					}else if(cktwo_list.output_type==2){
						$('.tanceng .ckgl_dfpckcktwo_cklxxl').html('采购退货');
					}else if(cktwo_list.output_type==3){
						$('.tanceng .ckgl_dfpckcktwo_cklxxl').html('借出出库');
					}else if(cktwo_list.output_type==4){
						$('.tanceng .ckgl_dfpckcktwo_cklxxl').html('借入归还');
					}else if(cktwo_list.output_type==5){
						$('.tanceng .ckgl_dfpckcktwo_cklxxl').html('销售换货');
					}else{
						$('.tanceng .ckgl_dfpckcktwo_cklxxl').html('采购换货');
					}
					if(cktwo_list.is_package_freight==1){
						$('.tanceng .ckgl_dfpck_ck_cdyfxxl').html('包运费');
					}else{
						$('.tanceng .ckgl_dfpck_ck_cdyfxxl').html('不包运费');
					}
					$('.tanceng .ckgl_dfpckcktwo_spckslxxl').html(likNullData(cktwo_list.output_num));
					$('.tanceng .ckgl_dfpckcktwo_spyfpnumxxl').html(likNullData(cktwo_list.distribution_num));
					$('.tanceng .ckgl_dfpckcktwo_zjckslxxl').html(likNullData(cktwo_list.set_num));
					$('.tanceng .ckgl_dfpckcktwo_zjdpspyfpnumxxl').html(likNullData(cktwo_list.combo_set_num));
					if(cktwo_list.logistics_way==1){
						$('.tanceng .ckgl_dfpckcktwo_wlfsxxl').html('快递');
					}else if(cktwo_list.logistics_way==2){
						$('.tanceng .ckgl_dfpckcktwo_wlfsxxl').html('陆运');
					}else if(cktwo_list.logistics_way==3){
						$('.tanceng .ckgl_dfpckcktwo_wlfsxxl').html('空运');
					}else if(cktwo_list.logistics_way==4){
						$('.tanceng .ckgl_dfpckcktwo_wlfsxxl').html('平邮');
					}else{
						$('.tanceng .ckgl_dfpckcktwo_wlfsxxl').html('海运');
					}
					$('.tanceng .ckgl_dfpck_shr_xxl').html(likNullData(cktwo_list.consignee));
					$('.tanceng .ckgl_dfpck_ck_shrdh_xxl').html(likNullData(cktwo_list.consignee_tel));
					$('.tanceng .ckgl_dfpck_cl_shdz_xxl').html(likNullData(cktwo_list.consignee_addr));
					
					
				if(cktwo_list.stockOutList.length == 0) {
					$('.tanceng .ckgl_dfpckcktwo_tablelisthtml_xxl').html('');
					$('.tanceng .ckgl_dfpckcktwo_listerrhtml_xxl').css('display', 'block');
				} else {
					$('.tanceng .ckgl_dfpckcktwo_listerrhtml_xxl').css('display', 'none');
					$.each(cktwo_list.stockOutList, function(i, v) {
						cktwo_html += '<div class="crk_rkgl_addRKD"><div class="unhead_box noprint"><p>';
						cktwo_html += '出库单编号：<span>' + likNullData(v.number) + '</span>';
						cktwo_html += '出库人：<span>' + likNullData(v.output_name) + '</span>';
						cktwo_html += '分配日期：<span>' + likNullData(v.create_time) + '</span></p></div><div class="div_1">';
						cktwo_html += '<div class="div_1 table-container" style="margin:0;"><table><thead>';
						var pro_list = v.productList,
							pro_html = '',
							pro_err = '',
							numsl = [];
						if(v.output_way==1||v.output_way==0){
							
							cktwo_html += '<tr><th>序号</th><th>商品类型</th><th>库房及分配数量</th><th>商品编号</th><th>商品名称</th><th>基本单位</th><th>属性</th></tr></thead>';
						if(pro_list.length == 0) {
							pro_err += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
							cktwo_html += '<tbody></tbody></table>' + pro_err + '</div></div></div>';
						} else {
							$.each(pro_list, function(j, m) {
								pro_html += '<tr><td>' + Appendzero(j + 1) + '</td>';
								if(m.product_type == 1) {
									pro_html += '<td>商品</td>';
								} else if(m.product_type == 2) {
									pro_html += '<td>套餐商品</td>';
								} else {
									pro_html += '<td>整机商品</td>';
								}
								if(m.warehouseList.length==0){
									pro_html += '<td>-</td>';
								}else{
									var kflist = '';
									$.each(m.warehouseList, function(i,v) {
										kflist +='<p>'+v.warehouse_name+':'+v.output_num+'</p>';
										numsl.push(v.output_num)
									});
									pro_html +='<td>'+kflist+'</td>';
								}
								pro_html += '<td>' + likNullData(m.code_sn) + '</td>';
								pro_html += '<td>' + likNullData(m.product_name) + '</td>';
								pro_html += '<td>' + likNullData(m.unit_name) + '</td>';
								pro_html += '<td><p class="xiangmu_p2">' + likNullData(m.attr_name) + '</p></td>';
							});
							var sum = 0;
							for(var i = 0; i < numsl.length; i++) {
								sum += parseInt(numsl[i]);
							}
							cktwo_html += '<tbody class="">' + pro_html + '<tr class="table_total noprint"><td>合计</td><td></td><td>' + sum +'</td><td></td><td></td><td></td><td></td></tr></tbody></table></div></div></div>';
						}
						
						}else if(v.output_way==2){
							cktwo_html += '<tr><th>序号</th><th>商品类型</th><th>出库方式</th><th>库房及分配数量</th><th>商品编号</th><th>商品名称</th><th>基本单位</th><th>属性</th></tr></thead>';
						if(pro_list.length == 0) {
							pro_err += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
							cktwo_html += '<tbody></tbody></table>' + pro_err + '</div></div></div>';
						} else {
							$.each(pro_list, function(j, m) {
								pro_html += '<tr><td>' + Appendzero(j + 1) + '</td>';
								if(m.product_type == 1) {
									pro_html += '<td>商品</td>';
								} else if(m.product_type == 2) {
									pro_html += '<td>套餐商品</td>';
								} else {
									pro_html += '<td>整机商品</td>';
								}
								if(m.output_way==1){
									pro_html += '<td>商品出库</td>';
								}else if(m.output_way==2){
									pro_html += '<td>整体出库</td>';
								}else{
									pro_html += '<td>组装出库</td>';
								}
								if(m.warehouseList.length==0){
									pro_html += '<td>-</td>';
								}else{
									var kflist = '';
									$.each(m.warehouseList, function(i,v) {
										kflist +='<p>'+v.warehouse_name+':'+v.output_num+'</p>';
										numsl.push(v.output_num)
									});
									pro_html +='<td class="noprint">'+kflist+'</td>';
								}
								pro_html += '<td class="noprint">' + likNullData(m.code_sn) + '</td>';
								pro_html += '<td>' + likNullData(m.product_name) + '</td>';
								pro_html += '<td class="noprint">' + likNullData(m.unit_name) + '</td>';
								pro_html += '<td><p class="xiangmu_p2">' + likNullData(m.attr_name) + '</p></td>';
							});
							var sum = 0;
							for(var i = 0; i < numsl.length; i++) {
								sum += parseInt(numsl[i]);
							}
							cktwo_html += '<tbody>' + pro_html + '<tr class="table_total"><td>合计</td><td></td><td>' + sum +'</td><td></td><td></td><td></td><td></td><td></td></tr></tbody></table></div></div></div>';
						}
							
						}else{
							cktwo_html += '<tr><th>序号</th><th>商品类型</th><th>出库方式</th><th>商品编号</th><th>商品名称</th><th>基本单位</th><th>属性</th><th>查看配件</th></tr></thead>';
						if(pro_list.length == 0) {
							pro_err += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
							cktwo_html += '<tbody></tbody></table>' + pro_err + '</div></div></div>';
						} else {
							$.each(pro_list, function(j, m) {
								pro_html += '<tr><td>' + Appendzero(j + 1) + '</td>';
								if(m.product_type == 1) {
									pro_html += '<td>商品</td>';
								} else if(m.product_type == 2) {
									pro_html += '<td>套餐商品</td>';
								} else {
									pro_html += '<td>整机商品</td>';
								}
								if(m.output_way==1){
									pro_html += '<td>商品出库</td>';
								}else if(m.output_way==2){
									pro_html += '<td>整体出库</td>';
								}else{
									pro_html += '<td>组装出库</td>';
								}
//								if(m.warehouseList.length==0){
//									pro_html += '<td>-</td>';
//								}else{
//									var kflist = '';
//									$.each(m.warehouseList, function(i,v) {
//										kflist +='<p>'+v.warehouse_name+':'+v.output_num+'</p>';
//										numsl.push(v.output_num)
//									});
//									pro_html +='<td>'+kflist+'</td>';
//								}
								pro_html += '<td>' + likNullData(m.code_sn) + '</td>';
								pro_html += '<td><span class="storage_single_circle but_yellow">组</span>' + likNullData(m.product_name) + '</td>';
								pro_html += '<td>' + likNullData(m.unit_name) + '</td>';
								//pro_html += '<td>' + likNullData(m.format) + '</td>';
								pro_html += '<td><p class="xiangmu_p2">' + likNullData(m.attr_name) + '</p></td>';
								pro_html += '<td><button class="but_mix but_look val_dialogTop ckgl_dfpckck_ckpeijian_btnxxl" name="crk_ckgl_lookPJ" uid="'+m.id+'" spbh="'+m.code_sn+'" spmc="'+m.product_name+'/'+m.attr_name+'" fpsl="'+m.output_num+'">查看</button></td>';
							});
//							var sum = 0;
//							for(var i = 0; i < numsl.length; i++) {
//								sum += parseInt(numsl[i]);
//							}
							cktwo_html += '<tbody>' + pro_html + '<tr class="table_total noprint"><td>合计</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr></tbody></table></div></div></div>';
						}
						}
						
						
					});
					$('.tanceng .ckgl_dfpckcktwo_tablelisthtml_xxl').html(cktwo_html);
				}
			}
		},
		error: function(e) {
			console.log(e);
			$('.tanceng .ckgl_dfpckcktwo_tablelisthtml_xxl').html('');
			$('.tanceng .ckgl_dfpckcktwo_listerrhtml_xxl').css('display', 'block');
		}
	});
}
//待分配出库查看下的查看配件
$('.tanceng .ckgl_dfpckck_ckpeijian_btnxxl').die().live('click',function(){
	$('.tanceng .ckgl_ckpeijian_zjspbh_xxl').html($(this).attr('spbh'))
	$('.tanceng .ckgl_ckpeijian_zjsp_xxl').html($(this).attr('spmc'))
	$('.tanceng .ckgl_ckpeijian_fenpsl_xxl').html($(this).attr('fpsl'))
	ckgl_ckpj_data.id = $(this).attr('uid');
	ckgl_ckpj_ajax();
})
//查看配件
var ckgl_ckpj_data = {
	token:token,
	id:''
}
function ckgl_ckpj_ajax(){
	$.ajax({
		type:"get",
		url:SERVER_URL+"stock-out/piecedetail",
		data:ckgl_ckpj_data,
		dataType:'json',
		success:function(data){
			if(data.code!=0){
				console.log(data);
				$('.tanceng .ckgl_dfpck_chakanpeijian_listhtml_xxl').html('');
				$('.tanceng .ckgl_dfpckchakanpj_errhtml_xxl').css('display','block')
			}else{
				console.log(data);
				var pjlist = data.data.productList,pjhtml='',pjnum=[],pjhj='';
				if(pjlist.length==0){
					$('.tanceng .ckgl_dfpck_chakanpeijian_listhtml_xxl').html('');
					$('.tanceng .ckgl_dfpckchakanpj_errhtml_xxl').css('display','block')
				}else{
					$('.tanceng .ckgl_dfpckchakanpj_errhtml_xxl').css('display','none');
					$.each(pjlist, function(i,v) {
						pjhtml +='<tr>';
						if(v.warehouseList.length==0){
							 pjhtml +='<td>-</td>';
						}else{
							var kflista = '';
							$.each(v.warehouseList, function(j,m) {
								kflista +='<p>'+likNullData(m.warehouse_name)+':'+likNullData(m.output_num)+'</p>';
								pjnum.push(m.output_num)
							});
							 pjhtml +='<td>'+kflista+'</td>';  
						}
                                    
                        pjhtml +='<td>'+likNullData(v.code_sn)+'</td>';                    
                        pjhtml +='<td>'+likNullData(v.product_name)+'</td>';                   
                        pjhtml +='<td>'+likNullData(v.unit_name)+'</td>';                
                        pjhtml +='<td><p class="xiangmu_p2">'+likNullData(v.attr_name)+'</p></td>';
                        pjhtml +='</tr>';               
					});
							var pjsum = 0;
							for(var i = 0; i < pjnum.length; i++) {
								pjsum += parseInt(pjnum[i]);
							}
					pjhj +='<tr class="table_total"><td>合计:'+pjsum+'</td><td></td><td></td><td></td><td></td></tr>';
                                    
					$('.tanceng .ckgl_dfpck_chakanpeijian_listhtml_xxl').html(pjhtml+pjhj);
				}
			}
		},
		error:function(e){
			console.log(e);
			$('.tanceng .ckgl_dfpck_chakanpeijian_listhtml_xxl').html('');
			$('.tanceng .ckgl_dfpckchakanpj_errhtml_xxl').css('display','block')
		}
	});
}
//待分配出库查看下的分配按钮
$('.ckgl_dfpckck_fenpeibtn_xxl').live('click', function() {
		$('.ckgl_dfpckspqdck_btnsxxl').attr({
			'uid': $(this).attr('uid'),
			'wlid': $(this).attr('wlid')
		});
		$('.ckgl_dfpck_newsp_listhtml_xxl').html('');
		$('.ckgl_dfpckaddckdbtn_xxl').css('display', 'block');
		$('.tanceng .ckgl_dfpckaddckdbtn_xxl').attr('uid', $(this).attr('uid'));
		$('.tanceng .ckgl_dfpckfpck_cjrqs_xxl').html($(this).attr('cjrq'));
		$('.tanceng .ckgl_dfpckfpck_gldjbhs_xxl').html($(this).attr('gldjbh'));
		$('.tanceng .ckgl_dfpckfpck_cklxs_xxl').html($(this).attr('cklx'));
		$('.tanceng .ckgl_dfpckfpck_wlfss_xxl').html($(this).attr('wlfs'));
		$('.tanceng .ckgl_dfpckfpck_spcksls_xxl').html($(this).attr('spcksl'));
		$('.tanceng .ckgl_dfpckfpck_spyfpnums_xxl').html($(this).attr('spyfpsl'));
		$('.tanceng .ckgl_dfpckfpck_pzcksls_xxl').html($(this).attr('pzcksl'));
		$('.tanceng .ckgl_dfpckfpck_pzdpspyfpsls_xxl').html($(this).attr('pzyfpnum'));
		$('.tanceng .ckgl_dfpckfpck_cjrqs_xxl').parent().children('span').css('marginRight', '30px')
	})

	//获取出库单编号
function ckgl_hqckdbh_ajax() {
	$.ajax({
		type: "post",
		url: SERVER_URL + "stock-out/createnumber",
		data: {
			token: token
		},
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data)
			} else {
				console.log(data);
				$('.tanceng .ckgldfpck_hqckd_xxl').val(data.data);
			}
		},
		error: function(e) {
			console.log(e)
		}
	});
}
//添加出库单商品明细列表
var ckgl_dfpck_addckdspmxdata = {
	token: token,
	output_id: '',
	product_type:'',//商品类型 1 商品 2套餐商品 3配置商品
	set_detail:''//获取整机配件 0 否 1 是 (当商品类型为3 才有配件列表)
}
$('.tanceng .ckgl_dfpckaddckdbtn_xxl').die().live('click', function() {
	//$('.ckgl_dfpcksp_sclistqueding_btnxxl').attr('uid',$(this).attr('uid'));
	ckgl_dfpck_addckdspmxdata.output_id = $(this).attr('uid');
	ckgl_dfpck_addckdspmxajax();
	ckgl_hqckdbh_ajax();
	xzrenyuan_listxxl();
	ckglspckboxzs = [];
})
//修改后 获取商品明细列表
$('.tanceng .ckgl_dfpck_fpckxzmainli_xxl>li[name="crk_ckgl_addckd"]').die().live('click',function(){
	//console.log($(this).attr('typeid'))
	if($(this).attr('typeid')==1){
		$('.tanceng .ckgldfpck_xzspscliebiao_quedingbtnxxl').attr({'typeid':'1','uid':$(this).attr('uid')})
	}else{
		$('.tanceng .ckgldfpck_xzspscliebiao_quedingbtnxxl').attr({'typeid':'2','uid':$(this).attr('uid')})
	}
	ckgl_dfpck_addckdspmxdata.output_id = $(this).attr('uid');
	ckgl_dfpck_addckdspmxdata.product_type = $(this).attr('typeid');
	ckgl_dfpck_addckdspmxdata.set_detail = '0';
	ckgl_dfpck_addckdspmxajax();
	ckgl_hqckdbh_ajax();
	$(this).parents('.dialog_box').remove();
        	var num = $('.tanceng').children(".dialog_box").length;
        	if (num < 1) {
           		 $(".tanceng").hide();
        	}
})
function ckgl_dfpck_addckdspmxajax() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "stocking-out/productdetail",
		data: ckgl_dfpck_addckdspmxdata,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data);
				$('.tanceng .ckgl_dfpckaddckdsplist_htmlxxl').html('');
				var err_csp = '';
				err_csp += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
				$('.ckgl_dfpckaddck_splieberrhtml_xxl').html(err_csp);
			} else {
				console.log(data);
				var csp_list = data['dataList'],
					csp_html = '',pjnum=[];
				if(csp_list.length == 0) {
					$('.tanceng .ckgl_dfpckaddckdsplist_htmlxxl').html('');
					var err_csp = '';
					err_csp += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
					$('.ckgl_dfpckaddck_splieberrhtml_xxl').html(err_csp);
				} else {
					$('.ckgl_dfpckaddck_splieberrhtml_xxl').html('');
					pjnum= [];
					$.each(csp_list, function(i, v) {
//						csp_html += '<tr><td><input type="checkbox" uid="' + v.id + '" spid="' + v.id + '" cjrq="' + v.create_time + '" name="crk_ckgl_xzckspInp1" class="ckglspckbox_spboxxxl" indexid="' + i + '"></td>';
//						csp_html += '<td><div class="num_input inline_block num_input_new"><button class="but_blue but_opa_small inp_plus ckgldfpcksp_addjiabtn_xxl" indexid="' + i + '">+</button><input type="text" value="0" /><button class="but_blue but_opa_small radius_left_0 inp_reduce ckgldfpck_spjianjian_btnxxl" indexid="' + i + '">-</button></div></td>';//
						if(v.product_type==2){
							v.product_type=1
						}
						csp_html +='<tr><td><button class="but_mix but_look val_dialogTop" kfxx="fpsl_'+i+'" uid="'+v.product_id+'" ckid="'+v.id+'" typeid="'+v.product_type+'" num="'+(parseInt(v.output_num)-parseInt(v.distribution_num))+'" spid="'+v.product_id+'"  name="rk_fpck_spckkf">出库库房</button></td>'
						csp_html += '<td>-</td>';
						csp_html += '<td>'+(parseInt(v.output_num)-parseInt(v.distribution_num))+'</td>';
						if(v.product_type == 1) {
							csp_html += '<td>商品</td>';
						} else if(v.product_type == 2) {
							csp_html += '<td>套餐商品</td>';
						} else {
							csp_html += '<td>整机商品</td>';
						}
						csp_html += '<td>' + likNullData(v.code_sn) + '</td>';
						csp_html += '<td>' + likNullData(v.product_name) + '</td>';
						csp_html += '<td>' + likNullData(v.unit_name) + '</td>';
						csp_html += '<td><p class="xiangmu_p2">' + likNullData(v.attr_name) + '</p></td></tr>';
						pjnum.push((parseInt(v.output_num)-parseInt(v.distribution_num)))
					});
							var pjsum = 0;
							for(var i = 0; i < pjnum.length; i++) {
								pjsum += parseInt(pjnum[i]);
							}
					var lastck_tr = '';
					lastck_tr += '<tr class="table_total"><td>合计</td><td class="ckgl_dfpckspmainnums_xxl">0</td><td>'+pjsum+'</td><td></td><td></td><td></td><td></td><td></td></tr>';
					$('.tanceng .ckgl_dfpckaddckdsplist_htmlxxl').html(csp_html + lastck_tr);
				}
			}
		},
		error: function(e) {
			console.log(e);
			$('.tanceng .ckgl_dfpckaddckdsplist_htmlxxl').html('');
			var err_csp = '';
			err_csp += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
			$('.ckgl_dfpckaddck_splieberrhtml_xxl').html(err_csp);
		}
	});
}
//出库库房 修改
$('.tanceng button[name="rk_fpck_spckkf"]').die().live('click',function(){
	//console.log($(this).attr('uid'))
	$('.tanceng .ckgl_dfpckkf_spcksl_xxl').html($(this).attr('num'))
	$('.tanceng .ckgldfpck_spsl_quedingbtnxxl').attr('kfxx',$(this).attr('kfxx'));
	if($(this).attr('typeid')==1){
		spkffb_datanum_xxl.id = $(this).attr('uid');
		spkffb_ajaxnum_xxl();
		$('.tanceng .ckgldfpck_spsl_quedingbtnxxl').attr('typeid','1')
	}else if($(this).attr('typeid')==3){
		spkffb_zjpjdatanum_xxl.id = $(this).attr('uid');
		spkffb_zjpjajaxnum_xxl();
		$('.tanceng .ckgldfpck_spsl_quedingbtnxxl').attr('typeid','1')
	}else if($(this).attr('typeid')==2){
		spkffb_datanum_xxl.id = $(this).attr('spid');
		spkffb_ajaxnum_xxl();
		$('.tanceng .ckgldfpck_spsl_quedingbtnxxl').attr({'typeid':'0','mainbox':$(this).parents('.crk_rkpjsp_newCon').attr('name')})
		//$('.tanceng .ckgldfpck_spsl_quedingbtnxxl').attr('mainbox':$(this).parents('.crk_rkpjsp_newCon').attr('name'))
	}
	
})
//合计商品数量checkbox
var ckglspckboxzs = [];
$('.tanceng .ckglspckbox_spboxxxl').die().live('click', function() {
		var indexid = $(this).attr('indexid');
		if($(this).is(':checked')) {
			ckglspckboxzs.push(parseInt($(this).parent().next().children().children('input').val()))
		} else {
			ckglspckboxzs.splice(indexid, 1)
		}
		var spcheckboxcknum = 0;
		$.each(ckglspckboxzs, function(i, v) {
			spcheckboxcknum += parseInt(v);
		});
		$('.tanceng .ckgl_dfpckspmainnums_xxl').html(spcheckboxcknum)

	})
	//控制选择商品数量按钮
$('.ckgldfpcksp_addjiabtn_xxl').die().live('click', function() {
	//var index = $(this).attr('indexid');
	var default_num = parseInt($(this).next('input').val());
	var nums_xxl = parseInt($(this).attr('maxnum'));
	if(default_num > nums_xxl) {
		$(this).next('input').val(nums_xxl);
	} else {
		$(this).next('input').val(default_num);
	}
//	if($(this).parent().parent().prev().children('.ckglspckbox_spboxxxl').is(':checked')) {
//		ckglspckboxzs.splice(index, 1, parseInt(default_num))
//	}
	var jianums = 0;
	$(this).parents('tr').children().each(function(i,v){
		jianums += parseInt($(this).children().children('input').val());
	})
	if(jianums>=parseInt($('.tanceng .ckgl_dfpckkf_spcksl_xxl').html())){
		//alert('最多只能出库'+$('.tanceng .ckgl_dfpckkf_spcksl_xxl').html()+'！！！');
		//$(this).next('input').val(default_num);
		$('.tanceng .dfpckckkf_spfpsl_xxl').html($('.tanceng .ckgl_dfpckkf_spcksl_xxl').html());
		$('.tanceng .ckgldfpcksp_addjiabtn_xxl').attr('disabled','disabled');
		$(this).parents('tr').children().each(function(i,v){
			$(this).children('.num_input_new').children('button.ckgldfpcksp_addjiabtn_xxl').css('background','#CCCCCC')
		});
		//$('.tanceng .ckgldfpck_fpsplisttr_xxl').children().children('.num_input_new').css('background','#CCCCCC')
		//return false;
	}else{
		$('.tanceng .ckgldfpcksp_addjiabtn_xxl').removeAttr('disabled');
		$('.tanceng .dfpckckkf_spfpsl_xxl').html(jianums);
	}
	
})
$('.ckgldfpck_spjianjian_btnxxl').die().live('click', function() {
	var jianums = 0;
	$(this).parents('tr').children().each(function(i,v){
		jianums += parseInt($(this).children().children('input').val());
		$(this).children('.num_input_new').children('button.ckgldfpcksp_addjiabtn_xxl').css('background','')
	})
	if(jianums>=parseInt($('.tanceng .ckgl_dfpckkf_spcksl_xxl').html())){
		$('.tanceng .ckgldfpcksp_addjiabtn_xxl').attr('disabled','disabled')
	}else{
		$('.tanceng .ckgldfpcksp_addjiabtn_xxl').removeAttr('disabled');
		$('.tanceng .dfpckckkf_spfpsl_xxl').html(jianums)
	}
	
})
$('.tanceng .ckgldfpck_xzspslvalsr_changexxl').die().live('change',function(){
	//console.log($(this).val())
	if(parseInt($(this).val())>parseInt($(this).attr('maxnum'))||parseInt($(this).val())>parseInt($('.tanceng .ckgl_dfpckkf_spcksl_xxl').html())){
		alert('不得大于库房数量和出库数量')
		$(this).val('0');
		//return false;
	}else{
		if($(this).val()==''){
			$(this).val('0')
		}
		var jianums = 0;
	$(this).parents('tr').children().each(function(i,v){
		jianums += parseInt($(this).children().children('input').val());
	})
	if(jianums>parseInt($('.tanceng .ckgl_dfpckkf_spcksl_xxl').html())){
			alert('不得大于库房数量和出库数量');
			$(this).val('0');
			return false;
	}
	$('.tanceng .dfpckckkf_spfpsl_xxl').html(jianums)
	
	}
	
})
//修改后 选择出库商品数量
$('.tanceng .ckgldfpck_spsl_quedingbtnxxl').die('click').live('click',function(){
	var that = $(this),kfhtml='',warehouse_info=[];
	//that.attr('num',$('.tanceng .dfpckckkf_spfpsl_xxl').html())
	if($('.tanceng .dfpckckkf_spfpsl_xxl').html()==0||$('.tanceng .dfpckckkf_spfpsl_xxl').html()==''){
				alert('请选择库房数量');
				return false;
			}else{
				warehouse_info=[];
				$('.tanceng .ckgldfpck_fpsplisttr_xxl').children().each(function(i,v){
		if(parseInt($(this).children().children('input.ckgldfpck_xzspslvalsr_changexxl').val())==0||$(this).children().children('input.ckgldfpck_xzspslvalsr_changexxl').val()==''){
			//console.log(66)
			
		}else{
				kfhtml +='<p kfid="'+$(this).children().children('input.ckgldfpck_xzspslvalsr_changexxl').attr('kfid')+'" num="'+$(this).children().children('input.ckgldfpck_xzspslvalsr_changexxl').val()+'">'+$(this).children().children('input.ckgldfpck_xzspslvalsr_changexxl').attr('kfmc')+':'+$(this).children().children('input.ckgldfpck_xzspslvalsr_changexxl').val()+'</p>';
			warehouse_info.push({'warehouse_id':$(this).children().children('input.ckgldfpck_xzspslvalsr_changexxl').attr('kfid'),'num':$(this).children().children('input.ckgldfpck_xzspslvalsr_changexxl').val()});
		}
	})
	//console.log(warehouse_info)
	if($(this).attr('typeid')==1){
		$('.tanceng button[kfxx="'+that.attr('kfxx')+'"]').attr({'spsl':$('.tanceng .dfpckckkf_spfpsl_xxl').html(),'kfmx':warehouse_info}).parent().next().html(kfhtml);
	var spslzj = 0;
	$('.tanceng .ckgl_dfpckaddckdsplist_htmlxxl').children().each(function(i,v){
		if(typeof($(this).children().children('button[name="rk_fpck_spckkf"]').attr('spsl'))=="undefined"){
			
		}else{
			spslzj+=parseInt($(this).children().children('button[name="rk_fpck_spckkf"]').attr('spsl'))
		}
	})
	//console.log(spslzj)
	$('.tanceng .ckgl_dfpckspmainnums_xxl').html(spslzj);
	$('.tanceng .ckgldfpck_xzspscliebiao_quedingbtnxxl').removeAttr('disabled').addClass('but_blue');
	}else{
		$('.tanceng .crk_rkpjsp_newCon[name="'+that.attr('mainbox')+'"]').children().find('button[kfxx="'+that.attr('kfxx')+'"]').attr({'spsl':$('.tanceng .dfpckckkf_spfpsl_xxl').html(),'kfmx':warehouse_info}).parent().next().html(kfhtml);
		var zuzhuangnums = 0;
		$('.tanceng .crk_rkpjsp_newCon[name="'+that.attr('mainbox')+'"]').children().children('div:last-child').find('tbody').children().not('tr:last-child').each(function(i,v){
			//console.log(v)
			if(typeof($(this).children().children('button[name="rk_fpck_spckkf"]').attr('spsl'))=="undefined"){
			
		}else{
			zuzhuangnums +=parseInt($(this).children().children('button[name="rk_fpck_spckkf"]').attr('spsl'))
		}
		})
		$('.tanceng .crk_rkpjsp_newCon[name="'+that.attr('mainbox')+'"]').children().children('div:last-child').find('tbody').children('tr:last-child').children().eq(1).html(zuzhuangnums)
	}
	
		$(this).parent().parent().parent().remove();
        	var num = $('.tanceng').children(".dialog_box").length;
        	if (num < 1) {
           		 $(".tanceng").hide();
        	}
				
				
			}
	
})
//修改后 选择出库商品生成列表
//选择chu库商品生成列表
var cksp_newarr = {
		ckdbh: '',
		ckr: '',
		ckrid: '',
		main: '',
		listxxl: []
	},
	cksp_newhtml = '',
	cksp_newmain = '',
	kfmx=[];
$('.tanceng .ckgldfpck_xzspscliebiao_quedingbtnxxl').die('click').live('click',function(){
	if($('.tanceng .ckgldfpck_hqckd_xxl').val() == '') {
			alert('出库单编号生成失败，请重新选择')
			return false;
		}
	if($('.tanceng .ckgl_addckd_xzckrval_xxl').val() == ''||$('.tanceng .ckgl_addckd_xzckrval_xxl').val()=='选择出库人') {
			alert('选择出库人')
			return false;
	}
	if($('.tanceng .ckgl_dfpckspmainnums_xxl').html()<=0){
		alert('请选择出库商品数量')
		$(this).attr('disabled','disabled').removeClass('but_blue');
		return false;
	}else{
		$('.ckgl_dfpck_newsp_listhtml_xxl').html('');
		cksp_newmain = '';
		cksp_newhtml = '';
		kfmx=[];
		cksp_newarr = {
			ckdbh: '',
			ckr: '',
			ckrid: '',
			main: '',
			fpdata:'',
			listxxl: []
		};
		function p(s) {
    		return s < 10 ? '0' + s: s;
		}
		var myDate = new Date();
		//获取当前年
		var year=myDate.getFullYear();
		//获取当前月
		var month=myDate.getMonth()+1;
		//获取当前日
		var date=myDate.getDate(); 
		var h=myDate.getHours();       //获取当前小时数(0-23)
		var m=myDate.getMinutes();     //获取当前分钟数(0-59)
		var s=myDate.getSeconds();  
		var now=year+'-'+p(month)+"-"+p(date)+" "+p(h)+':'+p(m)+":"+p(s);
		cksp_newarr.ckdbh = $('.tanceng .ckgldfpck_hqckd_xxl').val();
		cksp_newarr.ckr = $('.tanceng .ckgl_addckd_xzckrval_xxl').val();
		cksp_newarr.ckrid = $('.tanceng .ckgl_addckd_xzckrval_xxl').attr('uid');
		cksp_newarr.main = $('.tanceng .ckgl_dfpckspmainnums_xxl').html();
		cksp_newarr.fpdata = now;
		//var spslzj = 0;
		$('.tanceng .ckgl_dfpckaddckdsplist_htmlxxl').children().each(function(i,v){
		if(typeof($(this).children().children('button[name="rk_fpck_spckkf"]').attr('spsl'))=="undefined"){
			
		}else{
			//spslzj+=parseInt($(this).children().children('button[name="rk_fpck_spckkf"]').attr('spsl'));
			$(this).children().eq(1).children().each(function(i,v){
				//console.log($(this).attr('kfid'))
				kfmx.push({'warehouse_id':$(this).attr('kfid'),'num':$(this).attr('num')})
			})
			cksp_newarr['listxxl'].push({
				'spid':$(this).children().children('button[name="rk_fpck_spckkf"]').attr('uid'),
				'ckid':$(this).children().children('button[name="rk_fpck_spckkf"]').attr('ckid'),
				'kfmx':kfmx,
				'splx': $(this).children().eq(3).html(),
				'spbh': $(this).children().eq(4).html(),
				'spmc': $(this).children().eq(5).html(),
				'jbdw': $(this).children().eq(6).html(),
				'shuxi': $(this).children().eq(7).html(),
				'nums': $(this).children().eq(1).html(),
				'spsls':$(this).children().children('button[name="rk_fpck_spckkf"]').attr('spsl')
			})
		}
	})
		
	//console.log(cksp_newarr)
	if($(this).attr('typeid')==1){
		cksp_newmain += '<div class="crk_rkgl_addRKD"><div class="unhead_box">';
		cksp_newmain += '出库单编号：<span>' + cksp_newarr.ckdbh + '</span>';
		cksp_newmain += '出库人：<span uid="' + cksp_newarr.ckrid + '">' + cksp_newarr.ckr + '</span>';
		cksp_newmain += '分配日期：<span>'+cksp_newarr.fpdata+'</span>';
		cksp_newmain += '<div class="right"><button class="but_look but_mix val_dialogTop ckgldfpck_spbjbtn_xxl" name="crk_ckgl_addckd" typeid="1" uid="'+$(this).attr('uid')+'">修改</button><button class="but_r but_mix val_dialogTop ckgldfpck_scshanchu_btnxxl" name="crk_ckgl_delete">删除</button></div></div>';
		cksp_newmain += '<div class="div_1"><div class="div_1 table-container" style="margin:0;">';
		cksp_newmain += '<table><thead><tr><th>序号</th><th>商品类型</th><th>库房及分配数量</th><th>商品编号</th><th>商品名称</th><th>基本单位</th><th>属性</th></tr></thead>';
		$.each(cksp_newarr.listxxl, function(i, v) {
			cksp_newhtml += '<tr uid="' + v.spid + '" ckid="'+v.ckid+'" spsl="'+v.spsls+'"><td>' + Appendzero(i + 1) + '</td>';
			cksp_newhtml += '<td>' + likNullData(v.splx) + '</td>';
			cksp_newhtml += '<td>' + likNullData(v.nums) + '</td>';
			cksp_newhtml += '<td>' + likNullData(v.spbh) + '</td>';
			cksp_newhtml += '<td>' + likNullData(v.spmc) + '</td>';
			cksp_newhtml += '<td>' + likNullData(v.jbdw) + '</td>';
			cksp_newhtml += '<td>' + likNullData(v.shuxi) + '</td>';
			cksp_newhtml += '</tr>';
		});
		cksp_newmain += '<tbody class="dfpsp_sctbody_newlist_xxl">' + cksp_newhtml + '</tbody><tbody><tr class="table_total"><td>合计</td><td></td><td>' + cksp_newarr.main + '</td><td></td><td></td><td></td>';
		cksp_newmain += '<td></td></tr></tbody></table></div></div></div>';
	}else{
		cksp_newmain += '<div class="crk_rkgl_addRKD"><div class="unhead_box">';
		cksp_newmain += '出库单编号：<span>' + cksp_newarr.ckdbh + '</span>';
		cksp_newmain += '出库人：<span uid="' + cksp_newarr.ckrid + '">' + cksp_newarr.ckr + '</span>';
		cksp_newmain += '分配日期：<span>'+cksp_newarr.fpdata+'</span>';
		cksp_newmain += '<div class="right"><button class="but_look but_mix val_dialogTop ckgldfpck_spbjbtn_xxl" name="crk_ckgl_addckd" typeid="2" uid="'+$(this).attr('uid')+'">修改</button><button class="but_r but_mix val_dialogTop ckgldfpck_scshanchu_btnxxl" name="crk_ckgl_delete">删除</button></div></div>';
		cksp_newmain += '<div class="div_1"><div class="div_1 table-container" style="margin:0;">';
		cksp_newmain += '<table><thead><tr><th>序号</th><th>商品类型</th><th>出库方式</th><th>库房及分配数量</th><th>商品编号</th><th>商品名称</th><th>基本单位</th><th>属性</th></tr></thead>';
		$.each(cksp_newarr.listxxl, function(i, v) {
			cksp_newhtml += '<tr uid="' + v.spid + '" ckid="'+v.ckid+'" spsl="'+v.spsls+'"><td>' + Appendzero(i + 1) + '</td>';
			cksp_newhtml += '<td>' + v.splx + '</td>';
			cksp_newhtml += '<td>整机出库</td>';
			cksp_newhtml += '<td>' + likNullData(v.nums) + '</td>';
			cksp_newhtml += '<td>' + likNullData(v.spbh) + '</td>';
			cksp_newhtml += '<td>' + likNullData(v.spmc) + '</td>';
			cksp_newhtml += '<td>' + likNullData(v.jbdw) + '</td>';
			cksp_newhtml += '<td>' + likNullData(v.shuxi) + '</td>';
			cksp_newhtml += '</tr>';
		});
		cksp_newmain += '<tbody class="dfpsp_sctbody_newlist_xxl">' + cksp_newhtml + '</tbody><tbody><tr class="table_total"><td>合计</td><td></td><td></td><td>' + cksp_newarr.main + '</td><td></td><td></td><td></td>';
		cksp_newmain += '<td></td></tr></tbody></table></div></div></div>';
	}
		
		$('.ckgl_dfpck_newsp_listhtml_xxl').html(cksp_newmain);
		$('.tanceng .ckgldfpck_tjckdbtn_xxl').css('display', 'none');
		$('.tanceng .ckgl_dfpck_xcckdqueding_btnxxl').addClass('but_blue').removeAttr('disabled').attr({'typeid':$(this).attr('typeid'),'ckdbh':$('.tanceng .ckgldfpck_hqckd_xxl').val(),'ckrid':$('.tanceng .ckgl_addckd_xzckrval_xxl').attr('uid')});
	$(this).parent().parent().parent().remove();
		var num = $('.tanceng').children(".dialog_box").length;
		if(num < 1) {
			$(".tanceng").hide();
		}
	}
})
//组装确定生成列表
//var zuzhnew = {
//	ckdbh:'',
//	ckr:'',
//	ckrid:'',
//	fpdata:'',
//	
//}
$('.tanceng .ckgldfpck_zuzhuangqueding_btnxxl').die('click').live('click',function(){
    var setlist = [],sonspid='',spsls='',spkfmx='';
    function p(s) {
        return s < 10 ? '0' + s: s;
    }
    var myDate = new Date();
    //获取当前年
    var year=myDate.getFullYear();
    //获取当前月
    var month=myDate.getMonth()+1;
    //获取当前日
    var date=myDate.getDate();
    var h=myDate.getHours();       //获取当前小时数(0-23)
    var m=myDate.getMinutes();     //获取当前分钟数(0-59)
    var s=myDate.getSeconds();
    var now=year+'-'+p(month)+"-"+p(date)+" "+p(h)+':'+p(m)+":"+p(s);
    if($('.tanceng .ckgldfpck_hqckd_xxl').val()==''){
        alert('生成出库单编号失败,请重新获取');
        return false;
    }
    if(typeof($('.tanceng .ckgl_addckd_xzckrval_xxl').attr('uid')) == "undefined") {
        alert('选择出库人')
        return false;
    }
    $('.ckgl_dfpck_newsp_listhtml_xxl').html('');
    cksp_newmain = '';
    cksp_newhtml = '';
    kfmx=[];
    cksp_newarr = {
        ckdbh: '',
        ckr: '',
        ckrid: '',
        main: '',
        fpdata:'',
        listxxl: []
    };
    setlist = [];
    if($(".tanceng input[name='crk_fpck_xzsp']:checked").length==0){
        alert('请选择商品出库');
        return false;
    }
    if($('.tanceng input[name="crk_fpck_xzsp"]:checked').parent().next().children().find('.ckgldfpck_zuzhuang_slvalxxl').val()==0){
        alert('请选择商品分配数量');
        return false;
    }
    if($('.tanceng input[name="crk_fpck_xzsp"]:checked').parents('.box_open_list').children('div:last-child').children().find('.table_total').children().eq(1).html()==0){
        alert('请选择库房数量');
        return false;
    }
    if(parseInt($('.tanceng input[name="crk_fpck_xzsp"]:checked').parents('.box_open_list').children('div:last-child').children().find('.table_total').children().eq(1).html())!=parseInt($('.tanceng input[name="crk_fpck_xzsp"]:checked').parents('.box_open_list').children('div:last-child').children().find('.table_total').children().eq(2).html())){
        alert('配件商品数量必须符合出库数量');
        return false;
    }
    //})
    cksp_newarr.ckdbh = $('.tanceng .ckgldfpck_hqckd_xxl').val();
    cksp_newarr.ckr = $('.tanceng .ckgl_addckd_xzckrval_xxl').val();
    cksp_newarr.ckrid = $('.tanceng .ckgl_addckd_xzckrval_xxl').attr('uid');
    cksp_newarr.fpdata = now;
    $('.tanceng input[name="crk_fpck_xzsp"]').each(function(i,v){
        setlist = [];
        if($(this).is(':checked')){
//			if($(this).parent().next().children().find('.ckgldfpck_zuzhuang_slvalxxl').val()==0){
//				alert('请选择商品分配数量');
//				return false;
//			}
//			if($(this).parents('.box_open_list').children('div:last-child').children().find('.table_total').children().eq(1).html()==0){
//				alert('请选择库房数量');
//				return false;
//			}

            $(this).parents('.box_open_list').children('div:last-child').children().find('tbody').children().not('tr:last-child').each(function(i,v){
                //console.log(v)
                if(typeof($(this).children().children('button[name="rk_fpck_spckkf"]').attr('spsl'))=="undefined"){

                }else{
                    kfmx = []
                    $(this).children().eq(1).children().each(function(i,v){
                        kfmx.push({'warehouse_id':$(this).attr('kfid'),'num':$(this).attr('num')})
                    })
                    setlist.push({
                        'spid':$(this).children().children('button[name="rk_fpck_spckkf"]').attr('spid'),
                        'kfmx':kfmx,
                        'splx': $(this).children().eq(3).html(),
                        'spbh': $(this).children().eq(4).html(),
                        'spmc': $(this).children().eq(5).html(),
                        'jbdw': $(this).children().eq(6).html(),
                        'shuxi': $(this).children().eq(7).html(),
                        'nums':$(this).children().eq(1).html(),
                        'spsls':$(this).children().children('button[name="rk_fpck_spckkf"]').attr('spsl')
                    })
                }
            })
            cksp_newarr.listxxl.push({
                'spid':$(this).attr('uid'),
                'splx': $(this).parents('tr').children().eq(3).html(),
                'spbh': $(this).parents('tr').children().eq(4).html(),
                'spmc': $(this).parents('tr').children().eq(5).html(),
                'jbdw': $(this).parents('tr').children().eq(6).html(),
                'shuxi': $(this).parents('tr').children().eq(7).children('p').html(),
                'nums': $(this).parents('tr').children().eq(1).children().children('input').val(),
                'mainnum':$(this).parents('.box_open_list').children('div:last-child').children().find('tbody').children('tr:last-child').children().eq(1).html(),
                'son':setlist
            });




        }else{
            return false;
        }
    })

    cksp_newmain += '<div class="crk_rkgl_addRKD"><div class="unhead_box">';
    cksp_newmain += '出库单编号：<span>' + cksp_newarr.ckdbh + '</span>';
    cksp_newmain += '出库人：<span uid="' + cksp_newarr.ckrid + '">' + cksp_newarr.ckr + '</span>';
    cksp_newmain += '分配日期：<span>'+cksp_newarr.fpdata+'</span>';
    cksp_newmain += '<div class="right"><button class="but_look but_mix val_dialogTop ckgldfpck_spbjbtn_xxl" name="crk_ckgl_addckd_zjANDpj" typeid="3" uid="'+$(this).attr('uid')+'">修改</button><button class="but_r but_mix val_dialogTop ckgldfpck_scshanchu_btnxxl" name="crk_ckgl_delete">删除</button></div></div>';
    cksp_newmain += '<div class="div_1"><div class="div_1 table-container" style="margin:0;">';
    cksp_newmain += '<table><thead><tr><th>序号</th><th>商品类型</th><th>出库方式</th><th>分配数量</th><th>商品编号</th><th>商品名称</th><th>基本单位</th><th>属性</th><th>查看配件</th></tr></thead>';
    $.each(cksp_newarr.listxxl, function(i, v) {
        cksp_newhtml += '<tr uid="' + v.spid + '" spsl="'+v.nums+'"><td>' + Appendzero(i + 1) + '</td>';
        cksp_newhtml += '<td>' + v.splx + '</td>';
        cksp_newhtml += '<td>组装出库</td>';
        cksp_newhtml += '<td>' + likNullData(v.nums) + '</td>';
        cksp_newhtml += '<td>' + likNullData(v.spbh) + '</td>';
        cksp_newhtml += '<td><span class="storage_single_circle but_yellow">组</span>' + likNullData(v.spmc) + '</td>';
        cksp_newhtml += '<td>' + likNullData(v.jbdw) + '</td>';
        cksp_newhtml += '<td>' + likNullData(v.shuxi) + '</td>';
        sonspid='';spsls='';spkfmx='';
        $.each(v.son, function(j,m) {
            sonspid +=m.spid;
            spsls +=m.spsls;
            spkfmx +=m.kfmx;
        });
        cksp_newhtml += '<td><button class="but_mix but_look val_dialogTop ckglzuzhuang_ckpjbtn_xxl" zjfpsl="'+likNullData(v.nums)+'" zjspbh="'+likNullData(v.spbh)+'" zjsp=\''+likNullData(v.spmc)+'/'+likNullData(v.shuxi)+'\' uid="'+(v.spid)+'" fpsl="'+v.nums+'" spkf=\''+(JSON.stringify(spkfmx))+'\' spsls="'+spsls+'" sid="'+sonspid+'" arrson=\''+(JSON.stringify(v.son))+'\' name="crk_ckgl_lookPJ">查看</button></td></tr>';
    });
    cksp_newmain += '<tbody class="dfpsp_sctbody_newlist_xxl">' + cksp_newhtml + '</tbody><tbody><tr class="table_total"><td>合计</td><td></td><td></td><td></td><td></td><td></td><td></td>';
    cksp_newmain += '<td></td><td></td></tr></tbody></table></div></div></div>';
    $('.ckgl_dfpck_newsp_listhtml_xxl').html(cksp_newmain);
    $('.tanceng .ckgldfpck_tjckdbtn_xxl').css('display', 'none');
    $('.tanceng .ckgl_dfpck_xcckdqueding_btnxxl').addClass('but_blue').removeAttr('disabled').attr({'typeid':$(this).attr('typeid'),'ckdbh':$('.tanceng .ckgldfpck_hqckd_xxl').val(),'ckrid':$('.tanceng .ckgl_addckd_xzckrval_xxl').attr('uid')});
    $('.tanceng .ckgl_dfpck_xcckdqueding_btnxxl').attr('typeid','3');
    $(this).parents('.dialog_box').remove();
    var num = $('.tanceng').children(".dialog_box").length;
    if(num < 1) {
        $(".tanceng").hide();
    }

    //console.log(cksp_newarr.listxxl)
    //console.log(setlist)


})
$('.tanceng .ckglzuzhuang_ckpjbtn_xxl').die().live('click',function(){
	//console.log(JSON.parse($(this).attr('arrson')));
	$('.tanceng .ckgl_ckpeijian_zjspbh_xxl').html($(this).attr('zjspbh'))
	$('.tanceng .ckgl_ckpeijian_zjsp_xxl').html($(this).attr('zjsp'));//.children('p').css('display','inline-block')
	$('.tanceng .ckgl_ckpeijian_fenpsl_xxl').html($(this).attr('zjfpsl'));
	var snlist = JSON.parse($(this).attr('arrson')),snhtml='';
	$.each(snlist, function(i,v) {
		snhtml +='<tr><td>'+likNullData(v.nums)+'</td>';
        snhtml +='<td>'+likNullData(v.spbh)+'</td>';                                
        snhtml +='<td>'+likNullData(v.spmc)+'</td>';                                
        snhtml +='<td>'+likNullData(v.jbdw)+'</td>';                               
        snhtml +='<td>'+likNullData(v.shuxi)+'</td>';                                
        snhtml +='</tr>';                           
	});
	$('.tanceng .ckgl_dfpck_chakanpeijian_listhtml_xxl').html(snhtml)
})
//$('.ckgl_dfpcksp_sclistqueding_btnxxl').live('click', function() {
//		$('.ckgl_dfpck_newsp_listhtml_xxl').html('');
//		cksp_newmain = '';
//		cksp_newhtml = '';
//		cksp_newarr = {
//			rkdbh: '',
//			rkkf: '',
//			rkkfid: '',
//			rkr: '',
//			rkrid: '',
//			main: '',
//			listxxl: []
//		};
//		if($('.ckgl_dfpckzdscckdbh_valxxl').val() == '') {
//			alert('出库单编号生成失败，请重新选择')
//			return false;
//		}
//		if(typeof($('.tanceng .ckgl_addckd_xzckkf_xxl').attr('uid')) == "undefined") {
//			alert('选择出库库房')
//			return false;
//		}
//		if(typeof($('.tanceng .ckgl_addckd_xzckrval_xxl').attr('uid')) == "undefined") {
//			alert('选择出库人')
//			return false;
//		}
//		if($('.ckglspckbox_spboxxxl:checked').parent().next().children().children('input').val() == 0) {
//			alert('请选择出库数量');
//			return false;
//		}
//		cksp_newarr.rkdbh = $('.tanceng .ckgl_dfpckzdscckdbh_valxxl').val();
//		cksp_newarr.rkkf = $('.tanceng .ckgl_addckd_xzckkf_xxl').val();
//		cksp_newarr.rkkfid = $('.tanceng .ckgl_addckd_xzckkf_xxl').attr('uid');
//		cksp_newarr.rkrid = $('.tanceng .ckgl_addckd_xzckrval_xxl').attr('uid');
//		cksp_newarr.rkr = $('.tanceng .ckgl_addckd_xzckrval_xxl').val();
//		cksp_newarr.main = $('.tanceng .ckgl_dfpckspmainnums_xxl').html();
//		
//		$('.tanceng .ckgl_dfpckaddckdsplist_htmlxxl input:checked').each(function() {
//			cksp_newarr['listxxl'].push({
//				'spid': $(this).attr('spid'),
//				'splx': $(this).parent().nextAll().eq(2).html(),
//				'spbh': $(this).parent().nextAll().eq(3).html(),
//				'spmc': $(this).parent().nextAll().eq(4).html(),
//				'jbdw': $(this).parent().nextAll().eq(5).html(),
//				'gg': $(this).parent().nextAll().eq(6).html(),
//				'shuxi': $(this).parent().nextAll().eq(7).html(),
//				'pzspbh': '',
//				'pzspmcgg': '',
//				'nums': $(this).parent().next().children().children('input').val(),
//			})
//		})
//		$('.ckgl_dfpckspqdck_btnsxxl').attr({
//			'kfid': cksp_newarr.rkkfid,
//			'rkrid': cksp_newarr.rkrid,
//			'rkdbh': cksp_newarr.rkdbh
//		})
//		cksp_newmain += '<div class="crk_rkgl_addRKD"><div class="unhead_box">';
//		cksp_newmain += '出库单编号：<span>' + cksp_newarr.rkdbh + '</span>';
//		cksp_newmain += '出库人：<span uid="' + cksp_newarr.rkkfid + '">' + cksp_newarr.rkkf + '</span>';
//		cksp_newmain += '分配日期：<span>666</span>';
//		cksp_newmain += '<div class="right"><button class="but_look but_mix val_dialogTop ckgldfpck_spbjbtn_xxl" name="crk_ckgl_addckd">修改</button><button class="but_r but_mix val_dialogTop ckgldfpck_scshanchu_btnxxl" name="crk_ckgl_delete">删除</button></div></div>';
//		cksp_newmain += '<div class="div_1"><div class="div_1 table-container" style="margin:0;">';
//		cksp_newmain += '<table><thead><tr><th>序号</th><th>商品类型</th><th>库房及分配数量</th><th>商品编号</th><th>商品名称</th><th>基本单位</th><th>属性</th></tr></thead>';
//		$.each(cksp_newarr.listxxl, function(i, v) {
//			cksp_newhtml += '<tr uid="' + v.spid + '" spnum="' + v.nums + '"><td>' + Appendzero(i + 1) + '</td>';
//			cksp_newhtml += '<td>' + v.splx + '</td>';
//			cksp_newhtml += '<td>' + v.spbh + '</td>';
//			cksp_newhtml += '<td>' + v.spmc + '</td>';
//			cksp_newhtml += '<td>' + v.jbdw + '</td>';
//			cksp_newhtml += '<td>' + v.shuxi + '</td>';
//			cksp_newhtml += '<td>' + v.nums + '</td>';
//			cksp_newhtml += '</tr>';
//		});
//		cksp_newmain += '<tbody class="dfpsp_sctbody_newlist_xxl">' + cksp_newhtml + '</tbody><tbody><tr class="table_total"><td>合计</td><td></td><td></td><td></td><td></td><td></td><td>';
//		cksp_newmain += '<td>' + cksp_newarr.main + '</td></tr></tbody></table></div></div></div>';
//		$('.ckgl_dfpck_newsp_listhtml_xxl').html(cksp_newmain);
//		$('.ckgl_dfpckaddckdbtn_xxl').css('display', 'none');
//		$(this).parent().parent().parent().remove();
//		var num = $('.tanceng').children(".dialog_box").length;
//		if(num < 1) {
//			$(".tanceng").hide();
//		}
//
//	})
	//待分配chu库编辑
$('.tanceng .ckgldfpck_spbjbtn_xxl').die().live('click', function() {
	if($(this).attr('typeid')==1){
		$('.tanceng .ckgldfpck_xzspscliebiao_quedingbtnxxl').attr('typeid','1')
	}else if($(this).attr('typeid')==2){
		$('.tanceng .ckgldfpck_xzspscliebiao_quedingbtnxxl').attr('typeid','2')
	}else{
		ckgl_dfpck_addckdspmxdata.output_id = $(this).attr('uid');
	ckgl_dfpck_addckdspmxdata.product_type = '3';
	ckgl_dfpck_addckdspmxdata.set_detail = '1';
	ckgl_zuzhuang_ajax();
	ckgl_hqckdbh_ajax();
		
	}
	ckgl_dfpck_addckdspmxdata.output_id = $(this).attr('uid');
	ckgl_dfpck_addckdspmxdata.product_type = $(this).attr('typeid');
	ckgl_dfpck_addckdspmxdata.set_detail = '0';
	ckgl_dfpck_addckdspmxajax();
	ckgl_hqckdbh_ajax();
	})
$('.tanceng .ckgldfpck_scshanchu_btnxxl').die().live('click',function(){
	$('.tanceng .ckgl_dfpckshanchu_btnxxl').attr('typeid','0');
})
	//待分配chu库——生成chu库单删除
$('.tanceng .ckgl_dfpckshanchu_btnxxl').die().live('click', function() {//ckgl_dfpckshanchu_btnxxl
	if($(this).attr('typeid')==0){
		$('.ckgl_dfpck_newsp_listhtml_xxl').html('');
		cksp_newarr = {
		ckdbh: '',
		ckr: '',
		ckrid: '',
		main: '',
		listxxl: []
	},
	cksp_newhtml = '',
	cksp_newmain = '',
	kfmx=[];
		$('.tanceng .ckgldfpck_tjckdbtn_xxl').css('display', 'block');
		//$('.ckgl_addckd_xzckkf_xxl').removeAttr('uid');
	}else{
		ckgl_zzlist_shanchudata.id = $(this).attr('uid');
		ckgl_zzlist_shanchuajax();
	}
		
	})
//待分配出库分配出库-组装出库
$('.tanceng .ckgl_dfpck_fpckxzmainli_xxl>li[name="crk_ckgl_addckd_zjANDpj"]').die().live('click',function(){
	$('.tanceng .ckgldfpck_zuzhuangqueding_btnxxl').attr({'typeid':'3','uid':$(this).attr('uid')})
	ckgl_dfpck_addckdspmxdata.output_id = $(this).attr('uid');
	ckgl_dfpck_addckdspmxdata.product_type = '3';
	ckgl_dfpck_addckdspmxdata.set_detail = '1';
	ckgl_zuzhuang_ajax();
	ckgl_hqckdbh_ajax();
	$(this).parents('.dialog_box').remove();
        	var num = $('.tanceng').children(".dialog_box").length;
        	if (num < 1) {
           		 $(".tanceng").hide();
        	}
})
function ckgl_zuzhuang_ajax(){
	$.ajax({
		type:"get",
		url:SERVER_URL+"stocking-out/productdetail",
		data:ckgl_dfpck_addckdspmxdata,
		dataType:'json',
		success:function(data){
			if(data.code!=0){
				console.log(data);
				$('.tanceng .ckgldfpck_zuzhuang_splisthtml_xxl').html('');
					var err_csp = '';
					err_csp += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
					$('.tanceng .ckgldfpck_zuzhuang_errhtml_xxl').html(err_csp);
			}else{
				console.log(data);
				var list_zz = data['dataList'],zz_html = '',sp_html='';
				if(list_zz.length==0){
					$('.tanceng .ckgldfpck_zuzhuang_splisthtml_xxl').html('');
					var err_csp = '';
					err_csp += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
					$('.tanceng .ckgldfpck_zuzhuang_errhtml_xxl').html(err_csp);
				}else{
					zz_html='';
					$('.tanceng .ckgldfpck_zuzhuang_errhtml_xxl').html('');
					$.each(list_zz, function(i,v) {
						zz_html +='<div class="box_open cg_cgbjd_newCon crk_rkpjsp_newCon" name="zuzhuang_'+i+'">';
                    	zz_html +='<div class="box_open_list" style="padding: 0;">';
                        zz_html +='<div class="table_t1">';
                        zz_html +='<h3 class="cont_title inline_block">选择整机</h3></div>';
                        zz_html +='<div class="div_1"><div class="div_1 table-container" style="margin:0;">'
                        zz_html +='<table><thead><tr>';
                        zz_html +='<th>选择</th><th>分配数量</th><th>出库数量</th><th>商品类型</th><th>商品编号</th><th>商品名称</th><th>基本单位</th><th>属性</th>';    
                        zz_html +='</tr></thead><tbody><tr>';               
                        zz_html +=' <td><input type="checkbox" name="crk_fpck_xzsp" uid="'+v.id+'"></td><td>';                
                        zz_html +='<div class="num_input inline_block num_input_new"><button class="but_blue but_opa_small inp_plus ckgldfpcksp_zuzhuangaddjiabtn_xxl" maxnum="'+(parseInt(v.output_num)-parseInt(v.distribution_num))+'">+</button><input type="text" class="ckgldfpck_zuzhuang_slvalxxl lik_input_number"  value="0" maxnum="'+(parseInt(v.output_num)-parseInt(v.distribution_num))+'"><button class="but_blue but_opa_small radius_left_0 inp_reduce ckgldfpck_zuzhuangjianjian_btnxxl" indexid="5">-</button></div>'            
                        zz_html +='</td><td>'+(parseInt(v.output_num)-parseInt(v.distribution_num))+'</td>';             
                        zz_html +='<td>整机商品</td>';               
                        zz_html +='<td>'+likNullData(v.code_sn)+'</td>';               
                        zz_html +='<td>'+likNullData(v.product_name)+'</td>';                
                        zz_html +='<td>'+likNullData(v.unit_name)+'</td>';               
                        zz_html +='<td><p class="xiangmu_p1">'+likNullData(v.attr_name)+'</p></td>'
                        zz_html +='</tr></tbody></table></div></div>';                
                        zz_html +='<div class="table_t2 relative">选择配件<span class="box_open_btn" style="right:10px;line-height: 40px;">收起<i class="right icon_show"></i></span></div>';
                        zz_html +='<div class="div_1"><div class="div_1 table-container" style="margin:0;">';
                        zz_html +='<table><thead><tr>';
                        zz_html +='<th>选择出库库房</th><th>分配数量</th><th>出库数量</th><th>商品类型</th><th>商品编号</th><th>商品名称</th><th>基本单位</th><th>属性</th>';            
                        if(v.pieceList.length==0){
                        	zz_html +='</tr></thead><tbody></tbody>';            
                        	zz_html +='</table><div><div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div></div></div></div></div></div>';  
                        }else{
                        	sp_html = '',spnums=0;
                        	$.each(v.pieceList, function(j,m) {
                        		sp_html +='<tr><td><button class="but_mix but_look val_dialogTop" name="rk_fpck_spckkf" kfxx="fpsl_'+j+'" typeid="2" uid="'+m.id+'" spid="'+m.product_id+'" num="'+m.num+'">出库库房</button></td>';
                        		sp_html +='<td>-</td>';
                        		sp_html +='<td num="'+m.num+'">'+likNullData(m.num)+'</td>';
                        		sp_html +='<td>商品</td>';
                        		sp_html +='<td>'+likNullData(m.code_sn)+'</td>';
                        		sp_html +='<td>'+likNullData(m.product_name)+'</td>';
                        		sp_html +='<td>'+likNullData(m.unit_name)+'</td>';
                        		sp_html +='<td><p class="xiangmu_p2">'+likNullData(m.attr_name)+'</p></td></tr>';
                        		spnums +=parseInt(m.num)
                        	});
                        	zz_html +='</tr></thead><tbody>'+sp_html+'<tr class="table_total"><td>合计</td><td>0</td><td>'+spnums+'</td><td></td><td></td><td></td><td></td><td></td></tr>';            
                        	zz_html +='</tbody></table></div></div></div></div>';  
                        }
					});
					$('.tanceng .ckgldfpck_zuzhuang_splisthtml_xxl').html(zz_html);
				}
				
			}
		},
		error:function(e){
			console.log(e);
			$('.tanceng .ckgldfpck_zuzhuang_splisthtml_xxl').html('');
					var err_csp = '';
					err_csp += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
					$('.tanceng .ckgldfpck_zuzhuang_errhtml_xxl').html(err_csp);
		}
	});
}
//组装分配数量加加效果按钮
$('.tanceng .ckgldfpcksp_zuzhuangaddjiabtn_xxl').die().live('click',function(){
	var default_num = parseInt($(this).next('input').val());
	var nums_xxl = parseInt($(this).attr('maxnum'));
	if(default_num >= nums_xxl) {
		$(this).next('input').val(nums_xxl);
		default_num ==nums_xxl;
		$(this).attr('disabled','disabled')
	} else {
		$(this).removeAttr('disabled').next('input').val(default_num);
		
	}
	var hejinum = 0;
	$(this).parents('.box_open_list').children('div:last').children().children().children('tbody').children().not('tr:last-child').each(function(i,v){
			//console.log(v)
			$(this).children().eq(2).html(parseInt($(this).children().eq(2).attr('num'))*default_num);
			hejinum += parseInt($(this).children().eq(2).html());
			$(this).children().eq(0).children('button').attr('num',$(this).children().eq(2).html())
	})
	$(this).parents('.box_open_list').children('div:last').children().children().children('tbody').children('tr:last-child').children().eq(2).html(hejinum);
	
})
//jianjian
$('.tanceng .ckgldfpck_zuzhuangjianjian_btnxxl').die().live('click',function(){
	$(this).prev().prev('button').removeAttr('disabled');
	var default_num = parseInt($(this).prev('input').val());
	var hejinum = 0;
	$(this).parents('.box_open_list').children('div:last').children().children().children('tbody').children().not('tr:last-child').each(function(i,v){
			//console.log(v)
			if(default_num==0){
				default_num=1;
			}
			$(this).children().eq(2).html(parseInt($(this).children().eq(2).attr('num'))*default_num);
			hejinum += parseInt($(this).children().eq(2).html());
			$(this).children().eq(0).children('button').attr('num',$(this).children().eq(2).html())
	})
	$(this).parents('.box_open_list').children('div:last').children().children().children('tbody').children('tr:last-child').children().eq(2).html(hejinum);
	
})
$('.tanceng .ckgldfpck_zuzhuang_slvalxxl').die().live('change',function(){
	//console.log($(this).val())
	var default_num = parseInt($(this).val());
	if(default_num>=parseInt($(this).attr('maxnum'))){
		alert('不得大于库房数量和出库数量')
		$(this).val('0');
		default_num=0
		var hejinum = 0;
	$(this).parents('.box_open_list').children('div:last').children().children().children('tbody').children().not('tr:last-child').each(function(i,v){
			//console.log(v)
			if(default_num==0){
				default_num=1;
			}
			$(this).children().eq(2).html(parseInt($(this).children().eq(2).attr('num'))*default_num);
			hejinum += parseInt($(this).children().eq(2).html());
			$(this).children().eq(0).children('button').attr('num',$(this).children().eq(2).html())
	})
	$(this).parents('.box_open_list').children('div:last').children().children().children('tbody').children('tr:last-child').children().eq(2).html(hejinum);
		return false;
	}else{
		if($(this).val()==''){
			$(this).val('0')
		}
	}
	var hejinum = 0;
	$(this).parents('.box_open_list').children('div:last').children().children().children('tbody').children().not('tr:last-child').each(function(i,v){
			//console.log(v)
			if(default_num==0){
				default_num=1;
			}
			$(this).children().eq(2).html(parseInt($(this).children().eq(2).attr('num'))*default_num);
			hejinum += parseInt($(this).children().eq(2).html());
			$(this).children().eq(0).children('button').attr('num',$(this).children().eq(2).html())
	})
	$(this).parents('.box_open_list').children('div:last').children().children().children('tbody').children('tr:last-child').children().eq(2).html(hejinum);
	
})

	//查看库房存量
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
				$('.ckgl_ckkfcunliang_tbodyxxl').html('')
				$('.ckgl_ckkfcunl_errhtml_xxl').html('<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>')
			} else {
				console.log(data);
				$('.ckgl_ckkfcunl_errhtml_xxl').html('')
				var kffb_list = data['data'],
					kffb_html = '',kfsl='',kfcz='';
				$('.tanceng .ckgldfpck_ckkfspbh_xxl').html(likNullData(kffb_list.code_sn));	
				$('.tanceng .ckgldfpck_fp_ckkf_spxxl').html(likNullData(kffb_list.product_name)+'/'+likNullData(kffb_list.unit_name));	
				if(kffb_list.warehouseList.length==0){
					//console.log(666)
					$('.ckgl_ckkfcunliang_tbodyxxl').html('')
					$('.ckgl_ckkfcunl_errhtml_xxl').html('<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>')
				}else{
					kffb_html += '<thead>';
				kffb_html += '<tr>';
				$.each(kffb_list.warehouseList, function(i, v) {
					kffb_html += '<th>' + likNullData(v.name) + '数量</th>';
					kfsl +='<td>'+v.num+'</td>';//kfid="'+v.warehouse_id+'"
					kfcz +='<td><div class="num_input inline_block num_input_new"><button class="but_blue but_opa_small inp_plus ckgldfpcksp_addjiabtn_xxl" maxnum="'+v.num+'">+</button><input type="text" value="0" onkeyup="checkInt(this);" onpaste="checkInt(this);" oncut="checkInt(this);" ondrop="checkInt(this);" onchange="checkInt(this);" maxnum="'+v.num+'" kfmc="'+v.name+'" kfid="'+v.id+'" class="ckgldfpck_xzspslvalsr_changexxl lik_input_number" ><button class="but_blue but_opa_small radius_left_0 inp_reduce ckgldfpck_spjianjian_btnxxl">-</button></div></td>';
				});
				kffb_html += '</tr></thead><tbody><tr>'+kfsl+'</tr>';
				kffb_html += '<tr class="ckgldfpck_fpsplisttr_xxl">'+kfcz+'</tr></tbody>';
				$('.ckgl_ckkfcunliang_tbodyxxl').html(kffb_html);
				}
				
				
			}
		},
		error: function(e) {
			$('.ckgl_ckkfcunliang_tbodyxxl').html('')
			$('.ckgl_ckkfcunl_errhtml_xxl').html('<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>')
		}
	});
}
	//查看整机配件库房存量
var spkffb_zjpjdatanum_xxl = {
	token: token,
	id: '',
	warehouse_id: ''
}

function spkffb_zjpjajaxnum_xxl() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "warehouse/numbysetproid",
		data: spkffb_zjpjdatanum_xxl,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data);
				$('.ckgl_ckkfcunliang_tbodyxxl').html('')
				$('.ckgl_ckkfcunl_errhtml_xxl').html('<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>')
			} else {
				console.log(data);
				$('.ckgl_ckkfcunl_errhtml_xxl').html('')
				var kffb_list = data['data'],
					kffb_html = '',kfsl='',kfcz='';
				$('.tanceng .ckgldfpck_ckkfspbh_xxl').html(likNullData(kffb_list.code_sn));	
				$('.tanceng .ckgldfpck_fp_ckkf_spxxl').html(likNullData(kffb_list.product_name)+'/'+likNullData(kffb_list.unit_name));	
				if(kffb_list.warehouseList.length==0){
					//console.log(666)
					$('.ckgl_ckkfcunliang_tbodyxxl').html('')
					$('.ckgl_ckkfcunl_errhtml_xxl').html('<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>')
				}else{
					kffb_html += '<thead>';
				kffb_html += '<tr>';
				$.each(kffb_list.warehouseList, function(i, v) {
					kffb_html += '<th>' + likNullData(v.name) + '数量</th>';
					kfsl +='<td>'+v.num+'</td>';
					kfcz +='<td><div class="num_input inline_block num_input_new"><button class="but_blue but_opa_small inp_plus ckgldfpcksp_addjiabtn_xxl" maxnum="'+v.num+'">+</button><input type="text" value="0" onkeyup="checkInt(this);" onpaste="checkInt(this);" oncut="checkInt(this);" ondrop="checkInt(this);" onchange="checkInt(this);" maxnum="'+v.num+'" kfmc="'+v.name+'" kfid="'+v.id+'" class="ckgldfpck_xzspslvalsr_changexxl lik_input_number" ><button class="but_blue but_opa_small radius_left_0 inp_reduce ckgldfpck_spjianjian_btnxxl">-</button></div></td>';
				});
				kffb_html += '</tr></thead><tbody><tr>'+kfsl+'</tr>';
				kffb_html += '<tr class="ckgldfpck_fpsplisttr_xxl">'+kfcz+'</tr></tbody>';
				$('.ckgl_ckkfcunliang_tbodyxxl').html(kffb_html);
				}
			}
		},
		error: function(e) {
			$('.ckgl_ckkfcunliang_tbodyxxl').html('')
			$('.ckgl_ckkfcunl_errhtml_xxl').html('<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>')
		}
	});
}
//判断输入框只能输入数字
function checkInt(o) {
				theV = isNaN(parseInt(o.value)) ? '' : parseInt(o.value);
				if(theV != o.value) {
					o.value = theV;
				}else if(o.value <=0){
					o.value = '';
				}
			}
$('.tanceng .ckgldfpcksplist_chakan_btnxxl').die().live('click', function() {
		spkffb_datanum_xxl.id = $(this).attr('uid');
		spkffb_ajaxnum_xxl();
	})
	//确定分配出库
var ckgl_qdfpcks_data = {
	token: token,
	outputing_id: '', //待分配出库ID
	number: '', //出库单编号
	output_name: '', //出库人
	output_way: '', //出库方式 1 商品 2 整机 3 组装
	product_info: ''
}
$('.tanceng .ckgl_dfpck_xcckdqueding_btnxxl').die().live('click',function(){
	 
	 var datasj = [],zzarr=[],kfmx = [];
	if($('.tanceng .ckgl_dfpck_newsp_listhtml_xxl').html()==''){
		alert('请添加出库单');
		$(this).removeClass('but_blue').attr('disabled','disabled');
	}else{
		if($(this).attr('typeid')==1){
			ckgl_qdfpcks_data.output_way = 1;
			datasj = [];
			kfmx = [];
			$('.tanceng .dfpsp_sctbody_newlist_xxl').children().each(function(i,v){
				kfmx = [];
				//datasj = [];
			$(this).children().eq(2).children().each(function(i,v){
				//kfmx = [];
				//console.log($(this).attr('kfid'))
				
				kfmx.push({'warehouse_id':$(this).attr('kfid'),'num':$(this).attr('num')})
			})
			datasj.push({
				'id':$(this).attr('ckid'),
				'output_num':$(this).attr('spsl'),
				'warehouse_info':kfmx
			})
		})
		ckgl_qdfpcks_data.product_info = JSON.stringify(datasj)
		}else if($(this).attr('typeid')==2){
			ckgl_qdfpcks_data.output_way = 2;
			datasj = [];
			 kfmx = [];
			$('.tanceng .dfpsp_sctbody_newlist_xxl').children().each(function(i,v){
				kfmx = [];
				//datasj = [];
			$(this).children().eq(3).children().each(function(i,v){
				
				//console.log($(this).attr('kfid'))
				kfmx.push({'warehouse_id':$(this).attr('kfid'),'num':$(this).attr('num')})
			})
			datasj.push({
				'id':$(this).attr('ckid'),
				'output_num':$(this).attr('spsl'),
				'warehouse_info':kfmx
			})
		})
		ckgl_qdfpcks_data.product_info = JSON.stringify(datasj)
		}else if($(this).attr('typeid')==3){
			ckgl_qdfpcks_data.output_way = 3;
			zzarr =[]
			datasj = []
			$('.tanceng .dfpsp_sctbody_newlist_xxl').children().each(function(i,v){
				zzarr =[]
				//datasj = []
				kfmx = [];
			var datason = $(this).children('td:last-child').children('button');
			var snlist = JSON.parse(datason.attr('arrson'));
			//console.log(snlist)
			$.each(snlist, function(i,v) {
				var kfmx = [];
				$.each(v.kfmx, function(j,m) {
					//kfmx = [];
					kfmx.push({'warehouse_id':m.warehouse_id,'num':m.num})
				});
				
				zzarr.push({
					'product_id':v.spid,
					'num':v.spsls,
					'warehouse_info':kfmx
				})
			});
			datasj.push({
				'id':datason.attr('uid'),
				'output_num':datason.attr('fpsl'),
				'set_detail':zzarr
			})
			
		})
			//console.log(zzarr)
			//console.log(datasj)
			//console.log(kfmx)
		ckgl_qdfpcks_data.product_info = JSON.stringify(datasj)
		}
		ckgl_qdfpcks_data.outputing_id = $(this).attr('uid');
		ckgl_qdfpcks_data.number = $(this).attr('ckdbh');
		ckgl_qdfpcks_data.output_name = $(this).attr('ckrid');
		
		//console.log(ckgl_qdfpcks_data)
		ckgl_qdfpchuku_ajaxxxl();
		$(this).parent().parent().parent().remove();
		var num = $('.tanceng').children(".dialog_box").length;
		if(num < 1) {
			$(".tanceng").hide();
		}
	}
})
function ckgl_qdfpchuku_ajaxxxl() {
	$.ajax({
		type: "post",
		url: SERVER_URL + "stock-out/add",
		data: ckgl_qdfpcks_data,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data);
				alert('添加出库单失败,请重新添加');
			} else {
				console.log(data);
				ckgl_dfpck_listajax();
			}
		},
		error: function(e) {
			console.log(e)
		}
	});
}
//$('.tanceng .ckgl_dfpckspqdck_btnsxxl').live('click', function() {
//	var ckjson = [];
//	if($('.tanceng .ckgl_dfpck_newsp_listhtml_xxl').html() == '') {
//		alert('请添加出库单');
//		return false;
//	} else {
//		ckgl_qdfpcks_data.outputing_id = $(this).attr('uid');
//		ckgl_qdfpcks_data.number = $(this).attr('rkdbh');
//		ckgl_qdfpcks_data.output_name = $(this).attr('rkrid');
//		ckgl_qdfpcks_data.warehouse_id = $(this).attr('kfid');
//		ckgl_qdfpcks_data.logistics_way = $(this).attr('wlid');
//		ckgl_qdfpcks_data.remark = '';
//		$('.tanceng .dfpsp_sctbody_newlist_xxl tr').each(function() {
//			ckjson.push({
//				'id': $(this).attr('uid'),
//				'output_num': $(this).attr('spnum')
//			})
//		})
//		ckgl_qdfpcks_data.product_info = JSON.stringify(ckjson);
//		ckgl_qdfpchuku_ajaxxxl()
//		$(this).parent().parent().parent().remove();
//		var num = $('.tanceng').children(".dialog_box").length;
//		if(num < 1) {
//			$(".tanceng").hide();
//		}
//	}
//
//})

//出库单列表
// 定义出库dan查看项
var ckgl_ckdan_ckxlist = [{
	'index': null,
	'field': '物流方式'
}, {
	'index': null,
	'field': '出库状态'
}, {
	'index': null,
	'field': '发货状态'
}, {
	'index': null,
	'field': '出库人'
}];

//if ($('#left_button_71').attr('fromnotice') == 1) { // 当前是从消息过来的
//  var curId = $('#left_button_71').attr('detailid');
//  var secondName = $('#left_button_71').attr('secondmenu'); 
//  $.each($('.tabtitle li'), function (i, v) {
//      if (secondName == $.trim($('.tabtitle li').eq(i).text())) {
//          //$('.tabtitle li').removeClass('tabhover').eq(i).addClass('tabhover');
//          ckgl_ckd_listdata = {		// 初始化参数
//              token: token,
//            page: page,
//			num: num,
//			key: '',
//			output_type: '', //出库类型 1销售出库 2采购退货 3调拨 4借出 5借入归还 6换货出库
//			output_name: '', //出库人
//			logistics_way: '', //物流方式 1.快递 2.陆运 3.空运 4.平邮 5.海运
//			output_status: '', //出库状态 1.待出库 2.部分出库 3.完成出库
//			shipment_status: '', //发货状态 1.待发货 2.部分发货 3.完成发货
//			warehouse_id: '', //库房ID
//			related_receipts_no: '', //关联单据编号
//			order_by: 'create_time', //排序字段
//			order_sort: '1',//排序次序 0 顺序 1 倒序
//			is_package_freight:'',//是否包运费 1 是 2 否
//              ids:curId
//          };
//          setTimeout(function(){
//              $('.tabtitle li').eq(i).trigger('click'); // 触发相应子模块事件
//              $('#left_button_71').attr({	 // 清空按钮的属性
//                  'fromnotice': '',
//                  'detailid': '',
//                  'secondmenu': '',
//                  'totable': ''
//              });
//          },100);
//      }
//  });
//} else { // 当前不是从消息过来的，正常调取整个列表
//  ckgl_ckdlist_ajax();
//}
	//切换状态升降序
var ckglckdfprq=0;
$('.ckgl_ckd_rqsortpx_xxl').die().live('click',function(){
	ckglckdfprq++;
	if(ckglckdfprq%2==0){
		ckgl_ckd_listdata.order_sort = '0';
	}else{
		ckgl_ckd_listdata.order_sort = '1';
	}
	ckgl_ckd_listdata.order_by = 'create_time';
	ckgl_ckdlist_ajax()
})
//$('.ckgl_ckd_rqsortpx_xxl').toggle(function() {
//	$(this).children(".price_icon").removeClass("down").addClass("up");
//	ckgl_ckd_listdata.order_by = 'create_time';
//	ckgl_ckd_listdata.order_sort = '0';
//	ckgl_ckdlist_ajax()
//}, function() {
//	$(this).children(".price_icon").removeClass("up").addClass("down");
//	ckgl_ckd_listdata.order_by = 'create_time';
//	ckgl_ckd_listdata.order_sort = '1';
//	ckgl_ckdlist_ajax()
//})
var ckglckdckrq=0;
$('.ckgl_ckdpaixu_ckrq_xxl').die().live('click',function(){
	ckglckdckrq++;
	if(ckglckdckrq%2==0){
		ckgl_ckd_listdata.order_sort = '0';
	}else{
		ckgl_ckd_listdata.order_sort = '1';
	}
	ckgl_ckd_listdata.order_by = 'output_time';
	ckgl_ckdlist_ajax()
})
//$('.ckgl_ckdpaixu_ckrq_xxl').toggle(function() {
//	$(this).children(".price_icon").removeClass("down").addClass("up");
//	ckgl_ckd_listdata.order_by = 'output_time';
//	ckgl_ckd_listdata.order_sort = '0';
//	ckgl_ckdlist_ajax()
//}, function() {
//	$(this).children(".price_icon").removeClass("up").addClass("down");
//	ckgl_ckd_listdata.order_by = 'output_time';
//	ckgl_ckd_listdata.order_sort = '1';
//	ckgl_ckdlist_ajax()
//})

function ckgl_ckdlist_ajax() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "stock-out/list",
		data: ckgl_ckd_listdata,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data);
				$('.ckgl_ckd_listtbody_htmlxxl').html('');
				$('.ckgl_fenyelist_chukudan_xxl').css('display', 'none');
				$('.ckgl_ckd_listerrhtml_xxl').css('display', 'block');
			} else {
				console.log(data);
				var ckd_list = data['dataList'],
					ckd_html = '';
				$('.ckgl_ckd_lsitmain_numsxxl').html(data.totalcount);
				if(ckd_list.length == 0) {
					$('.ckgl_ckd_listtbody_htmlxxl').html('');
					$('.ckgl_fenyelist_chukudan_xxl').css('display', 'none');
					$('.ckgl_ckd_listerrhtml_xxl').css('display', 'block');
				} else {
					$('.ckgl_fenyelist_chukudan_xxl').css('display', 'block');
					$('.ckgl_ckd_listerrhtml_xxl').css('display', 'none');
					$.each(ckd_list, function(i, v) {
						if(v.is_cancel == 1) {
							ckd_html += '<tr class="grey"><td><span class="voidIcon">作废</span></td>';
							ckd_html += '<td>' + likNullData(v.output_time) + '</td>';
							ckd_html += '<td>' + likNullData(v.create_time) + '</td>';
							ckd_html += '<td>' + likNullData(v.number) + '</td>';
							ckd_html += '<td>' + likNullData(v.related_receipts_no) + '</td>';
							if(v.output_type == 1) {
								ckd_html += '<td>销售出库</td>';
							} else if(v.output_type == 2) {
								ckd_html += '<td>采购退货</td>';
							} else if(v.output_type == 3) {
								ckd_html += '<td>借出出库</td>';
							} else if(v.output_type == 4) {
								ckd_html += '<td>借入归还 </td>';
							} else if(v.output_type == 5) {
								ckd_html += '<td>销售换货</td>';
							} else {
								ckd_html += '<td>采购换货</td>';
							}
							if(v.output_way==1){
								ckd_html += '<td>-</td>';
							}else if(v.output_way==2){
								ckd_html += '<td>整机出库</td>';
							}else{
								ckd_html += '<td>组装出库</td>';
							}
							if(v.logistics_way == 1) {
								ckd_html += '<td>快递</td>';
							} else if(v.logistics_way == 2) {
								ckd_html += '<td>陆运</td>';
							} else if(v.logistics_way == 3) {
								ckd_html += '<td>空运</td>';
							} else if(v.logistics_way == 4) {
								ckd_html += '<td>平邮</td>';
							} else {
								ckd_html += '<td>海运</td>';
							}
							if(v.is_package_freight==1){
								ckd_html += '<td>包运费</td>';
							}else{
								ckd_html += '<td>不包运费</td>';
							}
							ckd_html += '<td>' + likNullData(v.warehouse_name) + '</td>';
							ckd_html += '<td>' + likNullData(v.output_num) + '</td>';
							if(v.output_way==3){
								ckd_html += '<td>-</td>';
							}else{
								ckd_html += '<td>' + likNullData(v.distribution_num) + '</td>';
							}
							
							
							if(v.output_status == 1) {
								ckd_html += '<td><span class="c_r">待出库</span></td>';
							} else if(v.output_status == 2) {
								ckd_html += '<td><span class="c_y">部分出库</span></td>';
							} else {
								ckd_html += '<td><span class="c_g">完成出库</span></td>';
							}
							if(v.output_way==3){
								ckd_html += '<td>' + likNullData(v.package_num) + '</td>';
							}else{
								ckd_html += '<td>-</td>';
							}
							
							ckd_html += '<td>' + likNullData(v.shipments_num) + '</td>';
							if(v.shipments_status == 1) {
								ckd_html += '<td><span class="c_r">待发货</span></td>';
							} else if(v.shipments_status == 2) {
								ckd_html += '<td><span class="c_y">部分发货</span></td>';
							} else {
								ckd_html += '<td><span class="c_g">完成发货</span></td>';
							}

							ckd_html += '<td>' + likNullData(v.output_name) + '</td>';
							//ckd_html += '<td>' + likNullData(v.remark) + '</td>';
							ckd_html += '<td><button class="but_mix but_look r_sidebar_btn but_look but_grey1" uid="' + v.id + '" >查看</button></td></tr>';
						} else {
							ckd_html += '<tr><td>' + Appendzero(i + 1) + '</td>';
							ckd_html += '<td>' + likNullData(v.output_time) + '</td>';
							ckd_html += '<td>' + likNullData(v.create_time) + '</td>';
							ckd_html += '<td>' + likNullData(v.number) + '</td>';
							ckd_html += '<td>' + likNullData(v.related_receipts_no) + '</td>';
							if(v.output_type == 1) {
								ckd_html += '<td>销售出库</td>';
							} else if(v.output_type == 2) {
								ckd_html += '<td>采购退货</td>';
							} else if(v.output_type == 3) {
								ckd_html += '<td>借出出库</td>';
							} else if(v.output_type == 4) {
								ckd_html += '<td>借入归还</td>';
							} else if(v.output_type == 5) {
								ckd_html += '<td>销售换货</td>';
							} else {
								ckd_html += '<td>采购换货</td>';
							}
							if(v.output_way==1){
								ckd_html += '<td>-</td>';
							}else if(v.output_way==2){
								ckd_html += '<td>整机出库</td>';
							}else{
								ckd_html += '<td>组装出库</td>';
							}
							if(v.logistics_way == 1) {
								ckd_html += '<td>快递</td>';
							} else if(v.logistics_way == 2) {
								ckd_html += '<td>陆运</td>';
							} else if(v.logistics_way == 3) {
								ckd_html += '<td>空运</td>';
							} else if(v.logistics_way == 4) {
								ckd_html += '<td>平邮</td>';
							} else {
								ckd_html += '<td>海运</td>';
							}
							
							if(v.is_package_freight==1){
								ckd_html += '<td>包运费</td>';
							}else{
								ckd_html += '<td>不包运费</td>';
							}
							
							ckd_html += '<td>' + likNullData(v.warehouse_name) + '</td>';
							ckd_html += '<td>' + likNullData(v.output_num) + '</td>';
							if(v.output_way==3){
								ckd_html += '<td>-</td>';
							}else{
								ckd_html += '<td>' + likNullData(v.distribution_num) + '</td>';
							}
							//ckd_html += '<td>' + likNullData(v.distribution_num) + '</td>';
							//ckd_html += '<td>' + likNullData(v.shipments_num) + '</td>';
							if(v.output_way==3){
								ckd_html += '<td>-</td>';
							}else{
								if(v.output_status == 1) {
								ckd_html += '<td><span class="c_r">待出库</span></td>';
							} else if(v.output_status == 2) {
								ckd_html += '<td><span class="c_y">部分出库</span></td>';
							} else {
								ckd_html += '<td><span class="c_g">完成出库</span></td>';
							}
							}
							
							//ckd_html += '<td>' + likNullData(v.package_num) + '</td>';
							if(v.output_way==3){
								ckd_html += '<td>' + likNullData(v.package_num) + '</td>';
							}else{
								ckd_html += '<td>-</td>';
							}
							ckd_html += '<td>' + likNullData(v.shipments_num) + '</td>';
							if(v.shipments_status == 1) {
								ckd_html += '<td><span class="c_r">待发货</span></td>';
							} else if(v.shipments_status == 2) {
								ckd_html += '<td><span class="c_y">部分发货</span></td>';
							} else {
								ckd_html += '<td><span class="c_g">完成发货</span></td>';
							}

							ckd_html += '<td>' + likNullData(v.output_name) + '</td>';
							//ckd_html += '<td>' + likNullData(v.remark) + '</td>';
							if(v.output_status == 3) {
								if(v.output_way==1){
									ckd_html += '<td><button class="but_mix but_look val_dialog but_look ckgl_ckd_chakanbtn_xxl" ckdbh="'+v.number+'" typeid="1" wldbh="'+v.related_receipts_no+'" uid="' + v.id + '" name="storage_cfgl_ckdfpckxq_zj" cklxid="'+v.output_type+'">查看</button></td>';
								}else if(v.output_way==2){
									ckd_html += '<td><button class="but_mix but_look val_dialog but_look ckgl_ckd_chakanbtn_xxl" ckdbh="'+v.number+'" typeid="2" wldbh="'+v.related_receipts_no+'" uid="' + v.id + '" name="storage_cfgl_ckdfpckxq_zj" cklxid="'+v.output_type+'">查看</button></td>';
								}else{
									ckd_html += '<td><button class="but_mix but_look val_dialog but_look ckgl_ckd_chakanbtn_xxl" ckdbh="'+v.number+'" typeid="3" wldbh="'+v.related_receipts_no+'" uid="' + v.id + '" name="storage_cfgl_ckdfpckxq_zj" cklxid="'+v.output_type+'">查看</button></td>';
								}
								
							} else {
								var fpck='stock-out/add',blck='stock-out/out',fahuo='stock-out/shipments',zjzz='pz-package/list',zjzzsjkz='pz-package/package';
								if(loginUserInfo['company_admin'] != 1){
									if(loginUserInfo.powerUrls.length==0){
										ckd_html +='<td></td>';
									}else{
										var arr = loginUserInfo.powerUrls;//
										if($.inArray(blck, arr)!=-1){
											if(v.output_way==1){
									ckd_html += '<td><button class="but_mix but_look val_dialog ckgl_ckd_blckbtn_xxl" typeid="1" ckdbh="'+v.number+'" wldbh="'+v.related_receipts_no+'" uid="' + v.id + '" name="storage_cfgl_ckdfpckxq_zj" cklxid="'+v.output_type+'">办理出库</button></td>';
								}else if(v.output_way==2){
									ckd_html += '<td><button class="but_mix but_look val_dialog ckgl_ckd_blckbtn_xxl" typeid="2" ckdbh="'+v.number+'" wldbh="'+v.related_receipts_no+'" uid="' + v.id + '" name="storage_cfgl_ckdfpckxq_zj" cklxid="'+v.output_type+'">办理出库</button></td>';
								}else{
									ckd_html += '<td><button class="but_mix but_look val_dialog ckgl_ckd_blckbtn_xxl" typeid="3" ckdbh="'+v.number+'" wldbh="'+v.related_receipts_no+'" uid="' + v.id + '" name="storage_cfgl_ckdfpckxq_zj" cklxid="'+v.output_type+'">办理出库</button></td>';
								}
										}else{
											ckd_html +='<td></td>';	
										}
									}
								}else if(loginUserInfo['company_admin'] == 1){
									if(v.output_way==1){
									ckd_html += '<td><button class="but_mix but_look val_dialog ckgl_ckd_blckbtn_xxl" typeid="1" ckdbh="'+v.number+'" wldbh="'+v.related_receipts_no+'" uid="' + v.id + '" name="storage_cfgl_ckdfpckxq_zj" cklxid="'+v.output_type+'">办理出库</button></td>';
								}else if(v.output_way==2){
									ckd_html += '<td><button class="but_mix but_look val_dialog ckgl_ckd_blckbtn_xxl" typeid="2" ckdbh="'+v.number+'" wldbh="'+v.related_receipts_no+'" uid="' + v.id + '" name="storage_cfgl_ckdfpckxq_zj" cklxid="'+v.output_type+'">办理出库</button></td>';
								}else{
									ckd_html += '<td><button class="but_mix but_look val_dialog ckgl_ckd_blckbtn_xxl" typeid="3" ckdbh="'+v.number+'" wldbh="'+v.related_receipts_no+'" uid="' + v.id + '" name="storage_cfgl_ckdfpckxq_zj" cklxid="'+v.output_type+'">办理出库</button></td>';
								}
								}
								
//								if(v.output_way==1){
//									ckd_html += '<td><button class="but_mix but_look val_dialog ckgl_ckd_blckbtn_xxl" typeid="1" ckdbh="'+v.number+'" wldbh="'+v.related_receipts_no+'" uid="' + v.id + '" name="storage_cfgl_ckdfpckxq_zj" cklxid="'+v.output_type+'">办理出库</button></td>';
//								}else if(v.output_way==2){
//									ckd_html += '<td><button class="but_mix but_look val_dialog ckgl_ckd_blckbtn_xxl" typeid="2" ckdbh="'+v.number+'" wldbh="'+v.related_receipts_no+'" uid="' + v.id + '" name="storage_cfgl_ckdfpckxq_zj" cklxid="'+v.output_type+'">办理出库</button></td>';
//								}else{
//									ckd_html += '<td><button class="but_mix but_look val_dialog ckgl_ckd_blckbtn_xxl" typeid="3" ckdbh="'+v.number+'" wldbh="'+v.related_receipts_no+'" uid="' + v.id + '" name="storage_cfgl_ckdfpckxq_zj" cklxid="'+v.output_type+'">办理出库</button></td>';
//								}
								
							}
							ckd_html += '</tr>';
						}
					});
					$('.ckgl_ckd_listtbody_htmlxxl').html(ckd_html);
					list_table_render_pagination(".ckgl_fenyelist_chukudan_xxl", ckgl_ckd_listdata, ckgl_ckdlist_ajax, data.totalcount, ckd_list.length);
					likShow('#ckgl_ckd_czckxtable_listxxl', ckgl_ckdan_ckxlist, '#ckgl_ckd_xzckxulbox_xxl', '#ckgl_ckd_xzckxbaocun_btnxxl', '#ckgl_ckd_xzckxhfmor_btnxxl');

				}
			}
		},
		error: function(e) {
			console.log(e);
			$('.ckgl_ckd_listtbody_htmlxxl').html('');
			$('.ckgl_fenyelist_chukudan_xxl').css('display', 'none');
			$('.ckgl_ckd_listerrhtml_xxl').css('display', 'block');
		}
	});
}
//ckgl_ckdlist_ajax();
//出库dan搜索
//function ckgl_ckd_ssnowshow_listxxl(val) {
//	ckgl_ckd_listdata.key = val;
//	ckgl_ckdlist_ajax();
//}
$('.ckgl_ckd_sousuo_btnxxl').die().live('click', function() {
		if($(this).prev().val() == '' || $(this).prev().val() == '搜索关联单据编号') {
			ckgl_ckd_listdata.key='';
		} else {
			ckgl_ckd_listdata.key = $(this).prev().val();
			
		}
		ckgl_ckdlist_ajax()
	})
	//出库dan高级搜索 
	$('.ckgl_ckd_sfbaoyunfei_xxl li').die().live('click', function() {
	ckgl_ckd_listdata.is_package_freight = $(this).attr('typeid');
	ckgl_ckdlist_ajax()
})
$('.ckgl_ckd_gjss_cklxul_xxl li').die().live('click', function() {
	ckgl_ckd_listdata.output_type = $(this).attr('typeid');
	ckgl_ckdlist_ajax()
})
//出库方式
$('.ckgl_ckd_gjss_chukufangshiul_xxl li').die().live('click', function() {
	ckgl_ckd_listdata.output_way = $(this).attr('typeid');
	ckgl_ckdlist_ajax()
})
$('.ckgl_ckd_gjsswlfsul_xxl li').die().live('click', function() {
	ckgl_ckd_listdata.logistics_way = $(this).attr('typeid');
	ckgl_ckdlist_ajax()
})
$('.ckgl_ckd_ckkful_xxl li').die().live('click', function() {
	ckgl_ckd_listdata.warehouse_id = $(this).attr('uid');
	ckgl_ckdlist_ajax()
})
$('.ckgl_ckd_chukztul_xxl li').die().live('click', function() {
	ckgl_ckd_listdata.output_status = $(this).attr('typeid');
	ckgl_ckdlist_ajax()
})
$('.ckgl_ckd_gjssfhzt_ulxxl li').die().live('click', function() {
	ckgl_ckd_listdata.shipment_status = $(this).attr('typeid');
	ckgl_ckdlist_ajax()
})
$('.ckgl_ckd_ckrul_gjssxxl li').die().live('click', function() {
		ckgl_ckd_listdata.output_name = $(this).attr('uid');
		ckgl_ckdlist_ajax()
	})
	//不显示已完成出库
$('.ckgl_ckd_noshow_ywcckbtn_xxl').die().live('click', function() {
		if($(this).prop("checked")) {
			ckgl_ckd_listdata.output_status = '1,2';
			ckgl_ckdlist_ajax()
		} else {
			ckgl_ckd_listdata.output_status = '';
			ckgl_ckdlist_ajax()
		}
	})
//出库单查看按钮-办理出库按钮样式区分
var ckd_ckblck_data = {
	token:token,
	id:'',
	detail:'1',//是否显示商品明细 0 否 1是
	shipments:'1',//是否显示发货明细 0 否 1 是
	clickType:''//点击行为 0 办理出库 1 查看 （默认值为0）
}
$('.ckgl_ckd_chakanbtn_xxl').die('click').live('click',function(){
	var fpck='stock-out/add',blck='stock-out/out',fahuo='stock-out/shipments',zjzz='pz-package/list',zjzzsjkz='pz-package/package';
if(loginUserInfo['company_admin'] != 1){
	if(loginUserInfo.powerUrls.length==0){
		$('.tanceng .ckd_fahuoanniu_btnxxl').hide()
	}else{
		var arr = loginUserInfo.powerUrls;//
		if($.inArray(fahuo, arr)!=-1){
			$('.tanceng .ckd_fahuoanniu_btnxxl').show()
			ckd_ckblck_data.id = $(this).attr('uid');
	ckd_ckblck_data.clickType = '1';
	$('.tanceng .ckd_fahuoanniu_btnxxl').attr({'uid':$(this).attr('uid'),'wldbh':$(this).attr('wldbh'),'typeid':$(this).attr('typeid'),'ckdbh':$(this).attr('ckdbh'),'cklxid':$(this).attr('cklxid')});
	ckd_ckblck_ajax();
		}else{
			$('.tanceng .ckd_fahuoanniu_btnxxl').hide()
		}
	}
}else if(loginUserInfo['company_admin'] == 1){
	$('.tanceng .ckd_fahuoanniu_btnxxl').show()
	ckd_ckblck_data.id = $(this).attr('uid');
	ckd_ckblck_data.clickType = '1';
	$('.tanceng .ckd_fahuoanniu_btnxxl').attr({'uid':$(this).attr('uid'),'wldbh':$(this).attr('wldbh'),'typeid':$(this).attr('typeid'),'ckdbh':$(this).attr('ckdbh'),'cklxid':$(this).attr('cklxid')});
	ckd_ckblck_ajax();
}
	
	
	ckd_ckblck_data.id = $(this).attr('uid');
	ckd_ckblck_data.clickType = '1';
	$('.tanceng .ckd_fahuoanniu_btnxxl').attr({'uid':$(this).attr('uid'),'wldbh':$(this).attr('wldbh'),'typeid':$(this).attr('typeid'),'ckdbh':$(this).attr('ckdbh'),'cklxid':$(this).attr('cklxid')});
	//ckd_ckblck_ajax();
})
$('.ckgl_ckd_blckbtn_xxl').die('click').live('click',function(){
	var fpck='stock-out/add',blck='stock-out/out',fahuo='stock-out/shipments',zjzz='pz-package/list',zjzzsjkz='pz-package/package';
if(loginUserInfo['company_admin'] != 1){
	if(loginUserInfo.powerUrls.length==0){
		$('.tanceng .ckd_fahuoanniu_btnxxl').hide()
	}else{
		var arr = loginUserInfo.powerUrls;//
		if($.inArray(fahuo, arr)!=-1){
			$('.tanceng .ckd_fahuoanniu_btnxxl').show()
			$('.tanceng .ckd_fahuoanniu_btnxxl').attr({'uid':$(this).attr('uid'),'wldbh':$(this).attr('wldbh'),'typeid':$(this).attr('typeid'),'ckdbh':$(this).attr('ckdbh'),'cklxid':$(this).attr('cklxid')});
	ckd_ckblck_data.id = $(this).attr('uid');
	ckd_ckblck_data.clickType = '0';
	ckd_ckblck_ajax();
		}else{
			$('.tanceng .ckd_fahuoanniu_btnxxl').hide()
		}
	}
}else if(loginUserInfo['company_admin'] == 1){
	$('.tanceng .ckd_fahuoanniu_btnxxl').show()
	$('.tanceng .ckd_fahuoanniu_btnxxl').attr({'uid':$(this).attr('uid'),'wldbh':$(this).attr('wldbh'),'typeid':$(this).attr('typeid'),'ckdbh':$(this).attr('ckdbh'),'cklxid':$(this).attr('cklxid')});
	ckd_ckblck_data.id = $(this).attr('uid');
	ckd_ckblck_data.clickType = '0';
	ckd_ckblck_ajax();
}
	
	
	$('.tanceng .ckd_fahuoanniu_btnxxl').attr({'uid':$(this).attr('uid'),'wldbh':$(this).attr('wldbh'),'typeid':$(this).attr('typeid'),'ckdbh':$(this).attr('ckdbh'),'cklxid':$(this).attr('cklxid')});
//	ckd_ckblck_data.id = $(this).attr('uid');
//	ckd_ckblck_data.clickType = '0';
//	ckd_ckblck_ajax();
})
function ckd_ckblck_ajax(){
	$.ajax({
		type:"get",
		url:SERVER_URL+"stock-out/infobyid",
		data:ckd_ckblck_data,
		dataType:'json',
		success:function(data){
			if(data.code!=0){
				console.log(data);
				var err = '';
				err +='<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
				$('.tanceng .ckd_chakanblchuku_errhtml_xxl').html(err);
			}else{
				console.log(data);
				var cklist = data['data'],ckhtml='',wldhtml='',kfmx='',lasttr='',numsl=[],ycyzsl=[],yfhsl=[],pjlisthtml='';
				 $('.tanceng .ckd_fenpeiriqi_xxl').html(likNullData(cklist.create_time));
				 $('.tanceng .ckd_fenpeiren_xxl').html(likNullData(cklist.distribution_name));
				 $('.tanceng .ckd_gldjbh_xxl').html(likNullData(cklist.related_receipts_no));
				 $('.tanceng .ckd_chukudanbianhao_xxl').html(likNullData(cklist.number));
				 $('.tanceng .ckd_chukuren_xxl').html(likNullData(cklist.output_name));
				 if(cklist.output_way==3){
				 	$('.tanceng .ckd_zzztsp_tabth_xxl').html('已组装数量');
				 	$('.tanceng .ckd_zhuangtai_showhide_xxl').hide();
				 }else{
				 	$('.tanceng .ckd_zzztsp_tabth_xxl').html('已出库数量');
				 	$('.tanceng .ckd_zhuangtai_showhide_xxl').show();
				 }
				 if(cklist.output_type==1){
				 	$('.tanceng .ckd_chukuleixing_xxl').html('出库单-销售出库');
				 }else if(cklist.output_type==2){
				 	$('.tanceng .ckd_chukuleixing_xxl').html('出库单-采购退货');
				 }else if(cklist.output_type==3){
				 	$('.tanceng .ckd_chukuleixing_xxl').html('出库单-借出出库');
				 }else if(cklist.output_type==4){
				 	$('.tanceng .ckd_chukuleixing_xxl').html('出库单-借入归还');
				 }else if(cklist.output_type==5){
				 	$('.tanceng .ckd_chukuleixing_xxl').html('出库单-销售换货');
				 }else{
				 	$('.tanceng .ckd_chukuleixing_xxl').html('出库单-采购换货');
				 }
				 
				 if(cklist.logistics_way==1){
				 	$('.tanceng .ckd_wuliufangshi_xxl').html('快递');
				 }else if(cklist.logistics_way==2){
				 	$('.tanceng .ckd_wuliufangshi_xxl').html('陆运');
				 }else if(cklist.logistics_way==3){
				 	$('.tanceng .ckd_wuliufangshi_xxl').html('空运');
				 }else if(cklist.logistics_way==4){
				 	$('.tanceng .ckd_wuliufangshi_xxl').html('平邮');
				 }else{
				 	$('.tanceng .ckd_wuliufangshi_xxl').html('海运');
				 }
				 $('.tanceng .ckd_shouhuoren_xxl').html(likNullData(cklist.consignee));
				 $('.tanceng .ckd_shouhuorendianhua_xxl').html(likNullData(cklist.consignee_tel));
				 $('.tanceng .ckd_shouhuorendizhi_xxl').html(likNullData(cklist.consignee_addr));
				 if(cklist.is_package_freight==1){
				 	$('.tanceng .ckd_chengdanyunfei_xxl').html('包运费');
				 }else{
				 	$('.tanceng .ckd_chengdanyunfei_xxl').html('不包运费');
				 }
				 if(cklist.logisticsList.length==0){
				 	$('.tanceng .ckd_glwuliudan_divxxl').html('暂无关联物流单');
				 }else{
				 	wldhtml = '';
				 	$.each(cklist.logisticsList, function(i,v) {
				 		wldhtml +='<div class="t_textinput inline_block c_9" style="margin:0;margin-right:12px;">'+Appendzero(i+1)+'物流编号: <span>'+likNullData(v.logisticsNumber)+'</span>';
                        wldhtml +='<button class="but_blue but_small val_dialogTop" uid="'+v.logisticsNumber+'" ckid="'+cklist.id+'" name="crk_ckgl_dealCK_xkfhsp">查看发货商品</button></div>';    
				 	});
				 	$('.tanceng .ckd_glwuliudan_divxxl').html(wldhtml);
				 }
				 if(cklist.productList.length==0){
				 	$('.tanceng .ckd_chkanblchuku_tbodylist_xxl').html('');
				 	var err = '';
				 	err +='<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
				 	$('.tanceng .ckd_chakanblchuku_errhtml_xxl').html(err);
				 }else{
				 	$('.tanceng .ckd_chakanblchuku_errhtml_xxl').html('');
				 	if(cklist.clickType==1){
				 		numsl=[],ycyzsl=[],yfhsl=[];
				 		$.each(cklist.productList, function(i,v) {
				 			ckhtml +='<tr class="cru_print_ckd_zy"><td class="noprint">'+Appendzero(i+1)+'</td>';
				 			if(v.product_type==1){
				 				ckhtml +='<td class="noprint">商品</td>';
				 			}else if(v.product_type==2){
				 				ckhtml +='<td class="noprint">套餐商品</td>';
				 			}else{
				 				ckhtml +='<td class="noprint">整机商品</td>';
				 			}
				 			if(v.output_way==1){
				 				ckhtml +='<td class="noprint">商品出库</td>';
				 			}else if(v.output_way==2){
				 				ckhtml +='<td class="noprint">整机出库</td>';
				 			}else{
				 				ckhtml +='<td class="noprint">组装出库</td>';
				 			}
                                         
                            ckhtml +='<td>'+likNullData(v.code_sn)+'</td>';  
                            if(v.output_way==3){
                            	ckhtml +='<td><span class="storage_single_circle but_yellow">组</span>'+likNullData(v.product_name)+'</td>'; 
                            }else{
                            	 ckhtml +='<td>'+likNullData(v.product_name)+'</td>';  
                            }
                            ckhtml +='<td class="noprint">'+likNullData(v.unit_name)+'</td>';
                            ckhtml +='<td><p class="xiangmu_p1">'+likNullData(v.attr_name)+'</p></td>';
                            if(v.output_way==3){
                            	ckhtml +='<td class="cru_print_goodstotal">'+v.output_num+'</td>';
                            	numsl.push(v.output_num);
                            }else{
                            	if(v.warehouseList.length==0){
                            		ckhtml +='<td class="cru_print_goodstotal">-</td>';
                            	}else{
                            		kfmx=''
                            		$.each(v.warehouseList, function(j,m) {
                            			kfmx +='<p>'+likNullData(m.warehouse_name)+' : '+likNullData(m.output_num)+'</p>';
                            			numsl.push(m.output_num);
                            		});
                            		ckhtml +='<td class="cru_print_goodstotal">'+kfmx+'</td>';
                            	}
                            }
                            if(v.output_way==3){
                            	ckhtml +='<td class="noprint">'+likNullData(v.package_num)+'</td>';
                            	ycyzsl.push(v.package_num);
                            }else{
                            	ckhtml +='<td class="noprint">'+likNullData(v.distribution_num)+'</td>';
                            	ycyzsl.push(v.distribution_num);
                            }
                                          
                            ckhtml +='<td class="noprint">'+likNullData(v.shipments_num)+'</td>';
                            yfhsl.push(v.shipments_num);
                            
                             if(v.output_way==3){
                             	ckhtml +='<td class="noprint"><button class="but_mix but_mix val_dialogTop ckd_chakanpeijian_btnxxl" typeid="1" uid="'+v.id+'" name="crk_ckgl_ckxqa_zzpj">查看配件</button></td>';
                             }else{
                             	if(v.status==1){
                            	ckhtml +='<td class="noprint"><span class="c_r">未出库</span></td>';
                            }else if(v.status==2){
                            	ckhtml +='<td class="noprint"><span class="c_y">部分出库</span></td>';
                            }else{
                            	ckhtml +='<td class="noprint"><span class="c_g">完全出库</span></td>';
                            }
                             	if(v.output_way==2){
                             		ckhtml +='<td class="noprint"><button class="but_mix but_mix val_dialogTop" uid="'+v.id+'" typeid="2" name="crk_ckgl_ckxqa">查看</button></td>';
                             	}else{
                             		ckhtml +='<td class="noprint"><button class="but_mix but_mix val_dialogTop" uid="'+v.id+'" typeid="1" name="crk_ckgl_ckxqa">查看</button></td>';
                             	}

                             }
                                    
                            ckhtml +='</tr>';                
				 		});
				 			var sum = 0,suma=0,sumb=0;
							for(var i = 0; i < numsl.length; i++) {
								sum += parseInt(numsl[i]);
							}
							$.each(ycyzsl, function(i,v) {
								suma +=parseInt(v);
							});
							$.each(yfhsl, function(i,v) {
								sumb +=parseInt(v);
							});
						if(cklist.output_way==3){
							lasttr ='<tr class="table_total cru_print_table_total"><td class="noprint">合计</td><td class="noprint"></td><td class="noprint"></td><td class="noprint"></td><td></td><td class="noprint"></td><td></td><td>'+sum+'</td><td class="noprint">'+suma+'</td><td class="noprint">'+sumb+'</td><td class="noprint"></td></tr>';
						}else{
							lasttr ='<tr class="table_total cru_print_table_total"><td>合计</td><td class="noprint"></td><td class="noprint"></td><td></td><td></td><td class="noprint"></td><td></td><td>'+sum+'</td><td class="noprint">'+suma+'</td><td class="noprint">'+sumb+'</td><td class="noprint"></td><td class="noprint"></td></tr>';
						}
				 		
				 		$('.tanceng .ckd_chkanblchuku_tbodylist_xxl').html(ckhtml+lasttr);
				 		if(suma==0||suma==sumb){
				 			$('.tanceng .ckd_fahuoanniu_btnxxl').attr('disabled','disabled').removeClass('but_blue')
				 		}else{
				 			$('.tanceng .ckd_fahuoanniu_btnxxl').removeAttr('disabled').addClass('but_blue');
				 		}
				 	}else{
				 		numsl=[],ycyzsl=[],yfhsl=[];
				 		$.each(cklist.productList, function(i,v) {
				 			if(v.output_way==3){
				 				ckhtml +='<tbody><tr class="cru_print_ckd_zy"><td class="noprint">'+Appendzero(i+1)+'</td>';
				 			}else{
				 				ckhtml +='<tr><td class="noprint">'+Appendzero(i+1)+'</td>';
				 			}
				 			
				 			if(v.product_type==1){
				 				ckhtml +='<td class="noprint">商品</td>';
				 			}else if(v.product_type==2){
				 				ckhtml +='<td class="noprint">套餐商品</td>';
				 			}else{
				 				ckhtml +='<td class="noprint">整机商品</td>';
				 			}
				 			if(v.output_way==1){
				 				ckhtml +='<td class="noprint">商品出库</td>';
				 			}else if(v.output_way==2){
				 				ckhtml +='<td class="noprint">整机出库</td>';
				 			}else{
				 				ckhtml +='<td class="noprint">组装出库</td>';
				 			}
                                         
                            ckhtml +='<td>'+likNullData(v.code_sn)+'</td>';  
                            if(v.output_way==3){
                            	ckhtml +='<td><span class="storage_single_circle but_yellow">组</span>'+likNullData(v.product_name)+'<span class="storage_single_circle but_blue box_open_btn_1 noprint">展开</span></td>';
                            }else{
                            	 ckhtml +='<td>'+likNullData(v.product_name)+'</td>';  
                            }
                            ckhtml +='<td class="noprint">'+likNullData(v.unit_name)+'</td>';
                            ckhtml +='<td><p class="xiangmu_p1">'+likNullData(v.attr_name)+'</p></td>';
                            if(v.output_way==3){
                            	ckhtml +='<td class="cru_print_goodstotal">'+v.output_num+'</td>';
                            	numsl.push(v.output_num)
                            }else{
                            	if(v.warehouseList.length==0){
                            		ckhtml +='<td class="cru_print_goodstotal">-</td>';
                            	}else{
                            		kfmx=''
                            		$.each(v.warehouseList, function(j,m) {
                            			kfmx +='<p kfid="'+m.warehouse_id+'" kfmc="'+m.warehouse_name+'" cksl="'+m.output_num+'" ycsl="'+m.distribution_num+'">'+likNullData(m.warehouse_name)+' : '+likNullData(m.output_num)+'</p>';
                            			numsl.push(m.output_num);
                            		});
                            		ckhtml +='<td class="cru_print_goodstotal">'+kfmx+'</td>';
                            	}
                            }
                            if(v.output_way==3){
                            	ckhtml +='<td class="noprint">'+likNullData(v.package_num)+'</td>';
                            	ycyzsl.push(v.package_num);
                            }else{
                            	ckhtml +='<td class="noprint">'+likNullData(v.distribution_num)+'</td>';
                            	ycyzsl.push(v.distribution_num);
                            }
                                          
                            ckhtml +='<td class="noprint">'+likNullData(v.shipments_num)+'</td>';
                            yfhsl.push(v.shipments_num)
                            
                             if(v.output_way==3){
                             	ckhtml +='<td class="noprint"><button class="but_mix but_mix val_dialogTop ckd_chakanpeijian_btnxxl" typeid="0" uid="'+v.id+'" name="crk_ckgl_ckxqa_zzpj">查看配件</button></td>';
                             }else{
                             	if(v.status==1){
                            	ckhtml +='<td class="noprint"><span class="c_r">未出库</span></td>';
                            }else if(v.status==2){
                            	ckhtml +='<td class="noprint"><span class="c_y">部分出库</span></td>';
                            }else{
                            	ckhtml +='<td class="noprint"><span class="c_g">完全出库</span></td>';
                            }
                             	if(v.status==3){
                             		if(v.output_way==2){
                             			ckhtml +='<td class="noprint"><button class="but_mix but_mix val_dialogTop" uid="'+v.id+'" typeid="2" name="crk_ckgl_ckxqa">查看</button><button class="but_mix but_grey1">出库</button></td>';
                             		}else{
                             			ckhtml +='<td class="noprint"><button class="but_mix but_mix val_dialogTop" uid="'+v.id+'" typeid="1" name="crk_ckgl_ckxqa">查看</button><button class="but_mix but_grey1">出库</button></td>';
                             		}
                             		
                             	}else{
                             		if(v.output_way==2){
                             			 ckhtml +='<td class="noprint"><button class="but_mix but_mix val_dialogTop" uid="'+v.id+'" typeid="2" name="crk_ckgl_ckxqa">查看</button><button class="but_mix but_look val_dialogTop" typeid="2" name="crk_ckgl_dealCK_ck_zj" ckxs="3" uid="'+v.id+'">出库</button></td>';
                             		}else{
                             			 ckhtml +='<td class="noprint"><button class="but_mix but_mix val_dialogTop" uid="'+v.id+'" typeid="1" name="crk_ckgl_ckxqa">查看</button><button class="but_mix but_look val_dialogTop" typeid="1" name="crk_ckgl_dealCK_ck_zj" ckxs="1" uid="'+v.id+'">出库</button></td>';
                             		}
                             		
                             	}
                             	      
                             }
                            if(v.output_way==3){
                            	if(v.pieceList.length==0){
                            		
                            	}else{
                            		//console.log(v.pieceList)
                            			var pjlisthtml='',pjtbody='';
                            			pjtbody +='<tbody style="display: none;background: #f7f7f7;" class="cru_zhankai_aaa cru_print_pj_tbody">';
                                        pjtbody +='<tr>';
                                        pjtbody +='<td colspan="11" class="noprint" style="background: #f2f2f2;"><span style="border-left:4px solid #23a2f3;padding-left: 10px;display: inline-block;">配件内容</span></td></tr>';
                                       $.each(v.pieceList, function(j,m) {     
                                          pjlisthtml +='<tr class="cru_print_ckd_pj_tr">';
                                          pjlisthtml +='<td colspan="2" class="noprint">'+likNullData(m.product_type_name)+'</td>';
                                          pjlisthtml +='<td colspan="5" class="noprint"><p class="xiangmu_p3">'+likNullData(m.attr_name)+'</p></td>';
                                          pjlisthtml +='<td colspan="2" class="noprint">'+likNullData(parseInt(m.output_num)/parseInt(v.output_num))+'</td>';
                                          pjlisthtml +='<td colspan="2" class="noprint">'+likNullData(m.output_num)+'</td>';
										  pjlisthtml +='<td class="none">'+likNullData(m.product_type_name)+'</td>';
										   pjlisthtml +='<td class="none">'+likNullData(parseInt(m.output_num)/parseInt(v.output_num))+'</td>';
										   pjlisthtml +='<td class="none" colspan=""><p class="xiangmu_p3">'+likNullData(m.attr_name)+'</p></td>';
										   pjlisthtml +='<td class="none cru_print_pj_sl"  colspan="">'+likNullData(m.output_num)+'</td></tr>';
                            		});
                            		pjtbody +='<tr class="cru_print_pj_tr"><td colspan="2" class="noprint">名称</td><td colspan="5" class="noprint">属性</td><td colspan="2" class="noprint">单个整机数量</td><td colspan="2" class="noprint">出库数量</td><td class="cru_print_pj_name none">名称</td><td class="cru_print_pj_name none">单个整机数量</td><td class="cru_print_pj_sx none" colspan="">属性</td><td class="cru_print_pj_sl none" colspan="">出库数量</td></tr>'+pjlisthtml+'</tbody>';
                            	ckhtml +='</tr></tbody>'+pjtbody+'';	
                            	}
                            	
                            	//console.log(ckhtml)
                            }else{
                            	ckhtml +='</tr>';
                            }
				 		});
				 		var sum = 0,suma=0,sumb=0;
							for(var i = 0; i < numsl.length; i++) {
								sum += parseInt(numsl[i]);
							}
							$.each(ycyzsl, function(i,v) {
								suma +=parseInt(v);
							});
							$.each(yfhsl, function(i,v) {
								sumb +=parseInt(v);
							});
							if(cklist.output_way==3){
								lasttr ='<tbody><tr class="table_total cru_print_table_total"><td class="cru_print_ckfs">合计</td><td class="noprint"></td><td class="noprint"></td><td class="noprint"></td><td class="cru_print_goodsname"></td><td class="noprint"></td><td class="cru_print_goodssx"></td><td class="cru_print_goodstotal">'+sum+'</td><td class="noprint">'+suma+'</td><td class="noprint">'+sumb+'</td><td class="noprint"></td></tr></tbody>';
								$('.tanceng .ckd_chkanblchuku_tbodylist_xxl').after(ckhtml+lasttr);
							}else{
								lasttr ='<tr class="table_total cru_print_table_total"><td class="cru_print_ckfs">合计</td><td class="noprint"></td><td class="noprint"></td><td  class="noprint"></td><td class="cru_print_goodsname"></td><td class="noprint"></td><td class="cru_print_goodssx"></td><td class="cru_print_goodstotal">'+sum+'</td><td class="noprint">'+suma+'</td><td class="noprint">'+sumb+'</td><td class="noprint"></td><td class="noprint"></td></tr>';
								$('.tanceng .ckd_chkanblchuku_tbodylist_xxl').html(ckhtml+lasttr);
							}
				 		//console.log(suma+'::::'+sumb)
				 		
				 		
				 		if(suma==0||suma==sumb){
				 			$('.tanceng .ckd_fahuoanniu_btnxxl').attr('disabled','disabled').removeClass('but_blue')
				 		}else{
				 			$('.tanceng .ckd_fahuoanniu_btnxxl').removeAttr('disabled').addClass('but_blue');
				 		}
				 	}
				 	
				 }
				 
				
			}
		},
		error:function(e){
			console.log(e);
			$('.tanceng .ckd_chkanblchuku_tbodylist_xxl').html('');
			var err = '';
			err +='<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
			$('.tanceng .ckd_chakanblchuku_errhtml_xxl').html(err);
		}
	});
}
//收起
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
//根据物流编号获取发货商品明细
var wlbh_fhmx_data = {
	token:token,
	logistics_number:'',
	id:''
}
$('.tanceng button[name="crk_ckgl_dealCK_xkfhsp"]').die().live('click',function(){
	$('.tanceng .ckd_ckfhsp_glwldxxl').html($(this).attr('uid'));
	wlbh_fhmx_data.logistics_number = $(this).attr('uid');
	wlbh_fhmx_data.id = $(this).attr('ckid');
	wlbh_fhmx_ajax();
})
function wlbh_fhmx_ajax(){
	$.ajax({
		type:"get",
		url:SERVER_URL+"stock-out/shipmentsdetail",
		data:wlbh_fhmx_data,
		dataType:'json',
		success:function(data){
			if(data.code!=0){
				console.log(data);
				$('.tanceng .ckd_chakanfahuosp_tbodyhtml_xxl').html('');
					var err = '';
					err +='<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
					$('.tanceng .ckd_chakanfahsp_errhtml_xxl').html(err);
			}else{
				console.log(data);
				var wllist = data['data'],wlhtml='',trlast='',trnum=[];
				$('.tanceng .ckd_ckfhsp_fhsjxxl').html(likNullData(wllist.productList[0].create_time));
				$('.tanceng .ckd_ckfhsp_fhrxxl').html(likNullData(wllist.shipments_name));
				if(wllist.logistics_way==1){
					$('.tanceng .ckd_ckfhsp_wlfsxxl').html('快递');
				}else if(wllist.logistics_way==2){
					$('.tanceng .ckd_ckfhsp_wlfsxxl').html('陆运');
				}else if(wllist.logistics_way==3){
					$('.tanceng .ckd_ckfhsp_wlfsxxl').html('空运');
				}else if(wllist.logistics_way==4){
					$('.tanceng .ckd_ckfhsp_wlfsxxl').html('平邮');
				}else{
					$('.tanceng .ckd_ckfhsp_wlfsxxl').html('海运');
				}
				$('.tanceng .ckd_ckfhsp_shrxxl').html(likNullData(wllist.consignee));
				$('.tanceng .ckd_ckfhsp_shrdianhuaxxl').html(likNullData(wllist.consignee_tel));
				$('.tanceng .ckd_ckfhsp_shouhuodizhixxl').html(likNullData(wllist.consignee_addr));
				$('.tanceng .ckd_ckfhsp_wldanhao_xxl').html(likNullData(wllist.logistics_sn));
				$('.tanceng .ckd_ckfhsp_wlgongsi_xxl').html(likNullData(wllist.logistics_name));
				if(wllist.is_package_freight==1){
					$('.tanceng .ckd_ckfhsp_chenhdanyunfei_xxl').html('包运费');
				}else{
					$('.tanceng .ckd_ckfhsp_chenhdanyunfei_xxl').html('不包运费');
				}
				if(wllist.productList.length==0){
					$('.tanceng .ckd_chakanfahuosp_tbodyhtml_xxl').html('');
					var err = '';
					err +='<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
					$('.tanceng .ckd_chakanfahsp_errhtml_xxl').html(err);
				}else{
					$('.tanceng .ckd_chakanfahsp_errhtml_xxl').html('');
					$.each(wllist.productList, function(i,v) {
						wlhtml +='<tr><td class="noprint">'+Appendzero(i+1)+'</td>';
						if(v.product_type==1){
							wlhtml +='<td>商品</td>';  
						}else if(v.product_type==3){
							wlhtml +='<td>整机商品</td>';
						}else{
							wlhtml +='<td>套餐商品</td>';
						}
                        wlhtml +='<td class="noprint">'+likNullData(v.code_sn)+'</td>';
                        wlhtml +='<td>'+likNullData(v.product_name)+'</td>';                    
                        wlhtml +='<td class="noprint">'+likNullData(v.unit_name)+'</td>';
                        wlhtml +='<td>'+likNullData(v.attr_name)+'</td>';                    
                        wlhtml +='<td>'+likNullData(v.shipments_num)+'</td></tr>';                      
                         trnum.push(v.shipments_num)               
					});
					var hjsl = 0;
					$.each(trnum, function(i,v) {
						hjsl +=parseInt(v);
					});
					trlast ='<tr class="table_total noprint"><td>合计</td><td></td><td></td><td></td><td></td><td></td><td>'+hjsl+'</td></tr>';
					$('.tanceng .ckd_chakanfahuosp_tbodyhtml_xxl').html(wlhtml+trlast);
				}
				
			}
		},
		error:function(e){
			console.log(e);
			$('.tanceng .ckd_chakanfahuosp_tbodyhtml_xxl').html('');
					var err = '';
					err +='<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
					$('.tanceng .ckd_chakanfahsp_errhtml_xxl').html(err);
		}
	});
}
//查看配件详情
var ckd_ckpeijian_data = {
	token:token,
	id:'',
	clickType:''
}
$('.tanceng .ckd_chakanpeijian_btnxxl').die().live('click',function(){
	ckd_ckpeijian_data.id = $(this).attr('uid');
	ckd_ckpeijian_data.clickType = $(this).attr('typeid');
	ckd_ckpeijian_ajax();
})
function ckd_ckpeijian_ajax(){
	$.ajax({
		type:"get",
		url:SERVER_URL+"stock-out/piecedetail",
		data:ckd_ckpeijian_data,
		dataType:'json',
		success:function(data){
			if(data.code!=0){
				console.log(data);
				$('.tanceng .ckd_ckpeijian_tbodylist_xxl').html('');
					var err = '';
					err +='<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
					$('.tanceng .ckd_ckpeijian_tbodyerrhtml_xxl').html(err);
			}else{
				console.log(data);
				var plist = data['data'],plhtml='',kfxx='',trnum=[];
				$('.tanceng .ckd_chakanpeijian_zjspbh_xxl').html(likNullData(plist.detail.code_sn));
				$('.tanceng .ckd_ckpeijian_zjsp_xxl').html(likNullData(plist.detail.product_name)+':'+likNullData(plist.detail.attr_name));
				$('.tanceng .ckd_ckpeijian_fpsl_xxl').html(likNullData(plist.detail.distribution_num));
				if(plist.detail.output_type==1){
					$('.tanceng .ckd_ckpeijian_ckxxtit_xxl').html('销售出库');
				}else if(plist.detail.output_type==2){
					$('.tanceng .ckd_ckpeijian_ckxxtit_xxl').html('采购退货');
				}else if(plist.detail.output_type==3){
					$('.tanceng .ckd_ckpeijian_ckxxtit_xxl').html('借出出库');
				}else if(plist.detail.output_type==4){
					$('.tanceng .ckd_ckpeijian_ckxxtit_xxl').html('借入归还');
				}else if(plist.detail.output_type==5){
					$('.tanceng .ckd_ckpeijian_ckxxtit_xxl').html('销售换货');
				}else{
					$('.tanceng .ckd_ckpeijian_ckxxtit_xxl').html('采购换货');
				}
				if(plist.productList.length==0){
					$('.tanceng .ckd_ckpeijian_tbodylist_xxl').html('');
					var err = '';
					err +='<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
					$('.tanceng .ckd_ckpeijian_tbodyerrhtml_xxl').html(err);
				}else{
					$('.tanceng .ckd_ckpeijian_tbodyerrhtml_xxl').html('');
					trnum=[];
					$.each(plist.productList, function(i,v) {
						plhtml +='<tr><td>'+Appendzero(i+1)+'</td>';
						if(v.product_type==1){
							 plhtml +='<td>商品</td>';   
						}else if(v.product_type==2){
							plhtml +='<td>套餐商品</td>'; 
						}else{
							plhtml +='<td>整机商品</td>';
						}
                        plhtml +='<td>'+likNullData(v.code_sn)+'</td>';                    
                        plhtml +='<td>'+likNullData(v.product_name)+'</td>';                   
                        plhtml +='<td>'+likNullData(v.unit_name)+'</td>';                    
                        plhtml +='<td><p class="xiangmu_p4">'+likNullData(v.attr_name)+'</p></td>';
                        if(v.warehouseList.length==0){
                        	plhtml +='<td>-</td>';  
                        }else{
                        	kfxx='';
                        	$.each(v.warehouseList, function(j,m) {
                        		kfxx +='<p>'+likNullData(m.warehouse_name)+':'+likNullData(m.output_num)+'</p>'
                        	});
                        	plhtml +='<td>'+kfxx+'</td>';  
                        }
                         trnum.push(v.distribution_num);                     
                        plhtml +='<td>'+likNullData(v.distribution_num)+'</td>';  
                        if(v.status==1){
                        	 plhtml +='<td><span class="c_r">待出库</span></td>'; 
                        }else if(v.status==2){
                        	plhtml +='<td><span class="c_y">部分出库</span></td>'; 
                        }else{
                        	plhtml +='<td><span class="c_g">完成出库</span></td>'; 
                        }
                         if(plist.clickType==0){
                         	if(v.status==3){
                         		plhtml +='<td><button class="but_mix but_mix val_dialogTop" typeid="1" uid="'+v.id+'" name="crk_ckgl_ckxqa">查看</button><button class="but_mix but_grey1 "  uid="'+v.id+'" typeid="1" ckxs="2">出库</button></td>'; 
                         	}else{
                         		plhtml +='<td><button class="but_mix but_mix val_dialogTop" typeid="1" uid="'+v.id+'" name="crk_ckgl_ckxqa">查看</button><button class="but_mix but_mix val_dialogTop" name="crk_ckgl_dealCK_ck_zj" uid="'+v.id+'" typeid="1" ckxs="2">出库</button></td>';        
                         	}
                         	 
                         }else{
                         	plhtml +='<td><button class="but_mix but_mix val_dialogTop" typeid="1" uid="'+v.id+'" name="crk_ckgl_ckxqa">查看</button></td>';         
                         }
                                   
                        plhtml +='</tr>';
					});
					var hjsl = 0;
					$.each(trnum, function(i,v) {
						hjsl +=parseInt(v);
					});
					trlast ='<tr class="table_total"><td>合计</td><td></td><td></td><td></td><td></td><td></td><td></td><td>'+hjsl+'</td><td></td><td></td></tr>';
					$('.tanceng .ckd_ckpeijian_tbodylist_xxl').html(plhtml+trlast);
				}
				
			}
		},
		error:function(e){
			console.log(e);
			$('.tanceng .ckd_ckpeijian_tbodylist_xxl').html('');
					var err = '';
					err +='<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
					$('.tanceng .ckd_ckpeijian_tbodyerrhtml_xxl').html(err);
		}
	});
}
//出库单查看出库详情
var ckd_ckxiangqing_data = {
	token:token,
	id:''
}
$('.tanceng button[name="crk_ckgl_ckxqa"]').die().live('click',function(){
	if($(this).attr('typeid')==2){
		$('.tanceng .ckd_ckckxq_spzdtabxxl').html('整机商品编号:');
		$('.tanceng .ckd_ckckxq_spmczdtabxxl').html('整机商品:');
		$('.tanceng .ckd_chakanckxq_thtabxxl').html('SN码');
	}else{
		$('.tanceng .ckd_ckckxq_spzdtabxxl').html('商品编号:');
		$('.tanceng .ckd_ckckxq_spmczdtabxxl').html('商品:');
		$('.tanceng .ckd_chakanckxq_thtabxxl').html('序列号');
	}
	ckd_ckxiangqing_data.id = $(this).attr('uid');
	ckd_ckchukuxiangqing_ajax();
})
function ckd_ckchukuxiangqing_ajax(){
	$.ajax({
		type:"get",
		url:SERVER_URL+"stock-out/detail",
		data:ckd_ckxiangqing_data,
		dataType:'json',
		success:function(data){
			if(data.code!=0){
				console.log(data)
			}else{
				console.log(data);
				var xqlist = data['data'],xqhtml='',kfxx='',trlast='',slck='';
				$('.tanceng .ckdckckxq_spbh_xxl').html(likNullData(xqlist.code_sn));
				$('.tanceng .ckdckckxq_sp_xxl').html(likNullData(xqlist.product_name)+'/'+likNullData(xqlist.attr_name));
				if(xqlist.warehouseList.length==0){
					$('.tanceng .ckdckckxq_kufanghtml_xxl').html('-');
				}else{
					$.each(xqlist.warehouseList, function(i,v) {
						kfxx +='<i>'+likNullData(v.warehouse_name)+'出库数量：<span>'+likNullData(v.output_num)+'</span><hr></i>';
                        kfxx +='<i>已出库数量：<span class="c_r">'+likNullData(v.distribution_num)+'</span></i>';
					});
					$('.tanceng .ckdckckxq_kufanghtml_xxl').html(kfxx);
				}
				if(xqlist.productDetailList.length==0){
					$('.tanceng .ckd_ckckxq_tbodylist_xxl').html('');
					var err = '';
					err +='<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
					$('.tanceng .ckd_ckckxq_errhtml_xxl').html(err);
				}else{
					$('.tanceng .ckd_ckckxq_errhtml_xxl').html('');
					$.each(xqlist.productDetailList, function(i,v) {
						xqhtml +='<tr><td>'+Appendzero(i+1)+'</td>';
                        xqhtml +='<td>'+likNullData(v.serial_number)+'</td>';                
                        xqhtml +='<td>'+likNullData(v.warehouse_name)+'</td>';               
                        xqhtml +='<td>'+likNullData(v.output_name)+'</td>';                
                        xqhtml +='<td>'+likNullData(v.create_time)+'</td>';                
                        xqhtml +='</tr>'; 
					});
					trlast ='<tr class="table_total"><td>合计</td><td>'+xqlist.productDetailList.length+'</td><td></td><td></td><td></td></tr>';
					$('.tanceng .ckd_ckckxq_tbodylist_xxl').html(xqhtml+trlast);
				}
				if(xqlist.outputNameList.length==0){
					$('.tanceng .ckd_ckxq_slchukutbody_xxl').html('');
					var err = '';
					err +='<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
					$('.tanceng .ckd_ckxq_slchuku_errhtmlxxl').html(err);
				}else{
					$('.tanceng .ckd_ckxq_slchuku_errhtmlxxl').html('');
					$.each(xqlist.outputNameList, function(i,v) {
						slck +='<tr>';
                        slck +='<td>出库'+likNullData(v.output_num)+'条</td>';                
                        slck +='<td>'+likNullData(v.warehouse_name)+'</td>';                
                        slck +='<td>'+likNullData(v.output_name)+'</td>';                
                        slck +='<td>'+likNullData(v.create_time)+'</td>';                
                        slck +='</tr>';
					});
					$('.tanceng .ckd_ckxq_slchukutbody_xxl').html(slck);
				}
				
			}
		},
		error:function(e){
			console.log(e)
		}
	});
}
//出库按钮点击
var ckd_chukulist_data = {
	token:token,
	id:''
}
function ckd_chukulist_ajax(){
	$.ajax({
		type:"get",
		url:SERVER_URL+"stock-out/productdetail",
		data:ckd_chukulist_data,
		dataType:'json',
		success:function(data){
			if(data.code!=0){
				console.log(data)
			}else{
				console.log(data);
				var cklist = data['dataList'],ckhtml='',kfbtn='';
				$('.tanceng .ckd_chukuyemian_spbh_xxl').html(likNullData(cklist.code_sn));
				$('.tanceng .ckd_chukuyemian_sp_xxl').html(likNullData(cklist.product_name)+'/'+likNullData(cklist.attr_name));
				if(cklist.warehouseList.length==0){
					$('.tanceng .ckd_chukuyemian_kfxx_xxl').html('-');
				}else{
					$.each(cklist.warehouseList, function(i,v) {
						ckhtml +='<i>'+likNullData(v.warehouse_name)+'出库数量：<span>'+likNullData(v.output_num)+'</span><hr></i>';
                        ckhtml +='<i>已出库数量：<span class="c_r">'+likNullData(v.distribution_num)+'</span></i>';
                        kfbtn +='<button class="but_look" uid="'+v.warehouse_id+'" cksl="'+(parseInt(v.output_num)-parseInt(v.distribution_num))+'">'+likNullData(v.warehouse_name)+'</button>';
					});
					$('.tanceng .ckd_chukuyemian_kfxx_xxl').html(ckhtml);
					$('.tanceng .ckd_chuku_kfanniu_xxl').html(kfbtn)
				}
				$('.tanceng .ckd_chukusaoma_input_xxl').attr({'maxnum':$('.tanceng .ckd_chuku_kfanniu_xxl').children().eq(0).attr('cksl'),'kfmc':$('.tanceng .ckd_chuku_kfanniu_xxl').children().eq(0).html()});
				$('.tanceng .ckd_bsmrk_ckslxxl').attr('maxnum',$('.tanceng .ckd_chuku_kfanniu_xxl').children().eq(0).attr('cksl'));
				$('.tanceng .ckd_quedingchuku_btnxxl').attr('kfid',$('.tanceng .ckd_chuku_kfanniu_xxl').children().eq(0).attr('uid'));
				$('.tanceng .ckd_chuku_kfanniu_xxl').children().eq(0).addClass('but_blue').removeClass('but_look');
				$('.tanceng .ckd_chukukfmc_tabxxl').html($('.tanceng .ckd_chuku_kfanniu_xxl').children().eq(0).html());
				$('.tanceng .ckd_chukusaoma_listxxl').html('');
				$('.tanceng .ckd_chukusaoma_input_xxl').focus();
				//$('.tanceng .ckd_chukusaoma_hejitrxxl').css('display','none');
//				$('.tanceng .chukudan_saomaerrhtml_xxl').html('<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>');
			}
		},
		error:function(e){
			console.log(e)
		}
	});
}
$('.tanceng button[name="crk_ckgl_dealCK_ck_zj"]').die().live('click',function(){
	//console.log($(this).attr('typeid'));
	if($(this).attr('typeid')==2){
		$('.tanceng .ckd_chuku_thtab_xxl').html('SN码');
		$('.tanceng .ckd_chuku_spbhtab_xxl').html('整机商品编号');
		$('.tanceng .ckd_chuku_spmctab_xxl').html('整机商品');
	}else{
		$('.tanceng .ckd_chuku_thtab_xxl').html('序列号');
		$('.tanceng .ckd_chuku_spbhtab_xxl').html('商品编号');
		$('.tanceng .ckd_chuku_spmctab_xxl').html('商品');
	}
	 $('.tanceng .ckd_quedingchuku_btnxxl').attr({'uid':$(this).attr('uid'),'ckxs':$(this).attr('ckxs')});
	ckd_chukulist_data.id = $(this).attr('uid');
	ckd_chukulist_ajax();
})
 //        库房切换
$(".tanceng .ckd_chuku_kfanniu_xxl button").die().live('click',function () {
    $(this).addClass("but_blue").removeClass('but_look').siblings('button').removeClass('but_blue').addClass('but_look');
    $('.tanceng .ckd_chukukfmc_tabxxl').html($(this).html());
    $('.tanceng .ckd_chukusaoma_input_xxl').attr({'maxnum':$(this).attr('cksl'),'kfmc':$(this).html()});
    $('.tanceng .crk_rkgl_srms').children().eq(0).children('input[name="crk_blck_mean"]').trigger('click')
    $('.tanceng .ckd_bsmrk_ckslxxl').attr('maxnum',$(this).attr('cksl')).val('');
    $('.tanceng .ckd_quedingchuku_btnxxl').attr('kfid',$(this).attr('uid'));
    $('.tanceng .ckd_chukusaoma_input_xxl').removeAttr('disabled').focus();
    $('.tanceng .ckd_chukusaoma_listxxl').html('');
    $('.tanceng .ckd_sanmaosl_lengthxxl').html('0');
});
//控制出库数量
$('.tanceng .ckd_cksljiajia_btnxxl').die().live('click',function(){
	var default_num = parseInt($(this).next('input').val());
	var nums_xxl = parseInt($(this).next('input').attr('maxnum'));
	if(default_num > nums_xxl) {
		$(this).next('input').val(nums_xxl);
	} else {
		$(this).next('input').val(default_num);
	}
})
 $('.tanceng .ckd_bsmrk_ckslxxl').die().live('change',function(){
 	var valnum = parseInt($(this).val()),maxnum = parseInt($(this).attr('maxnum'));
 	if(valnum>maxnum){
 		alert('不得大于出库数量');
 		$(this).val(maxnum)
 	}else{
 		$(this).val(valnum)
 	}
 })
//扫码
$('.tanceng .ckd_chukusaoma_input_xxl').die().live('keydown', function(e) {
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
		if($('.tanceng .ckd_chukusaoma_input_xxl').val()==''){
			return false;
		}else{
			e.preventDefault();
		if(parseInt($(this).attr('maxnum'))<=parseInt($('.tanceng .ckd_chukusaoma_listxxl tr').length)){
			$(this).attr('disabled','disabled').val('');
			return false;
		}else{
			e.preventDefault();
			$(this).removeAttr('disabled');
			$('.ckd_chukusaoma_listxxl').append('<tr><td class="rkdrkbtn_rkhaoma_index_xxl">01</td><td>' + $('.tanceng .ckd_chukusaoma_input_xxl').val() + '</td><td>'+likNullData($(this).attr('kfmc'))+'</td><td>' + username + '</td><td>' + now + '</td><td><button class="but_mix but_r rkddkbtn_trlist_scbtnxxl" name="">删除</button></td></tr>')
		$('.tanceng .ckd_chukusaoma_input_xxl').val('');
		$.each($('.tanceng .ckd_chukusaoma_listxxl tr'), function(i, v) {
		$(this).attr('indexid', i)
		$(this).children('td.rkdrkbtn_rkhaoma_index_xxl').html(Appendzero(i + 1))
	});
	$('.tanceng .ckd_sanmaosl_lengthxxl').html($('.tanceng .ckd_chukusaoma_listxxl tr').length);
		}
		
		return false;
		}
		
	}
});
//删除
$('.tanceng .rkddkbtn_trlist_scbtnxxl').die().live('click',function(){
	$(this).parents('tr').remove();
	$('.tanceng .ckd_chukusaoma_input_xxl').removeAttr('disabled').focus();
	$.each($('.tanceng .ckd_chukusaoma_listxxl tr'), function(i, v) {
		$(this).attr('indexid', i)
		$(this).children('td.rkdrkbtn_rkhaoma_index_xxl').html(Appendzero(i + 1))
	});
	$('.tanceng .ckd_sanmaosl_lengthxxl').html($('.tanceng .ckd_chukusaoma_listxxl tr').length);
})
//确定出库
var ckd_quedingchuku_data = {
	token:token,
	id:'',//出库单商品ID
	remark:'',//备注
	product_info:'',//出库商品明细
	category:'',//出库形式 1 商品 2 配件 3 整机
	output_num:'',//出库数量
	warehouse_id:'',//库房ID
	output_way:''
}
$('.tanceng .ckd_quedingchuku_btnxxl').die().live('click',function(){
	if($('.tanceng .ckd_chukusaoma_listxxl').html()==''&&$('.tanceng .ckd_bsmrk_ckslxxl').val()=='0'){
		alert('请选择出库数量或者扫码出库');
		return false;
	}
	if($('.tanceng .ckd_ckbeizhu_valxxl').val()==''||$('.tanceng .ckd_ckbeizhu_valxxl').val()=='请输入备注'){
		$('.tanceng .ckd_ckbeizhu_valxxl').val('');
	}
	ckd_quedingchuku_data.id = $(this).attr('uid');
	ckd_quedingchuku_data.remark = $('.tanceng .ckd_ckbeizhu_valxxl').val();
	ckd_quedingchuku_data.warehouse_id = $(this).attr('kfid');
	ckd_quedingchuku_data.category = $(this).attr('ckxs');
	ckd_quedingchuku_data.output_way = $(this).attr('ckfs');
	if($(this).attr('ckfs')==1){
		ckd_quedingchuku_data.output_num = '';
		if($('.tanceng .ckd_chukusaoma_listxxl').html()==''){
			alert('请扫码出库');
			return false;
		}else{
			var arrtr = [];
			$.each($('.tanceng .ckd_chukusaoma_listxxl tr'), function(i,v) {
				arrtr.push($(this).children().eq(1).text())
			});
		}
		ckd_quedingchuku_data.product_info = JSON.stringify(arrtr);
	}else{
		ckd_quedingchuku_data.product_info = '';
		if($('.tanceng .ckd_bsmrk_ckslxxl').val()==''||$('.tanceng .ckd_bsmrk_ckslxxl').val()=='0'){
			alert('请输入出库数量');
			return false;
		}else{
			ckd_quedingchuku_data.output_num = $('.tanceng .ckd_bsmrk_ckslxxl').val();
		}
	}
	//console.log(ckd_quedingchuku_data);
	ckd_quedingchuku_ajax();
	$('.tanceng').empty().hide();
//	$(this).parent().parent().parent().remove();
//		var num = $('.tanceng').children(".dialog_box").length;
//		if(num < 1) {
//			$(".tanceng").hide();
//		}
//	
})
function ckd_quedingchuku_ajax(){
	$.ajax({
		type:"post",
		url:SERVER_URL+"stock-out/out",
		data:ckd_quedingchuku_data,
		dataType:'json',
		success:function(data){
			if(data.code!=0){
				console.log(data);
			}else{
				console.log(data);
				ckd_ckpeijian_ajax();
				//ckd_ckblck_ajax();
				ckgl_ckdlist_ajax();
			}
		},
		error:function(e){
			console.log(e)
		}
	});
}
//发货
var ckd_fahuo_data = {
	token:token,
	id:'',
	detail:'1'
}
$('.tanceng .ckd_fahuoanniu_btnxxl').die().live('click',function(){
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
	var now = year + '-' + p(month) + "-" + p(date) + " " + p(h) + ':' + p(m);
	$('.tanceng .ckd_fahuo_fhsj_xxl').html(now);
	$('.tanceng .ckd_fahuo_fhr_xxl').html(username);
	$('.tanceng .ckd_fahuoxzwldan_btnxxl').attr({'wldbh':$(this).attr('wldbh'),'cklxid':$(this).attr('cklxid')});
	$('.tanceng .ckd_quedingfahuo_btnxxl').attr({'uid':$(this).attr('uid'),'ckdbh':$(this).attr('ckdbh')});
	if($(this).attr('typeid')==3){
		$('.tanceng .ckd_fahuoyemian_thtab_xxl').html('已组装数量');
	}else{
		$('.tanceng .ckd_fahuoyemian_thtab_xxl').html('已出库数量');
	}
	ckd_fahuo_data.id = $(this).attr('uid');
	ckd_fahuo_ajax();
})
function ckd_fahuo_ajax(){
	$.ajax({
		type:"get",
		url:SERVER_URL+"stock-out/infobyid",
		data:ckd_fahuo_data,
		dataType:'json',
		success:function(data){
			if(data.code!=0){
				console.log(data);
				$('.tanceng .ckd_fahuo_tbody_listxxl').html('');
					var err = '';
					err +='<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
					$('.tanceng .ckd_fahuo_errhtml_xxl').html(err);
			}else{
				console.log(data);
				var fhlist = data['data'],fhhtml='',ywclist='';
				if(fhlist.logistics_way==1){
					$('.tanceng .ckd_fahuo_wlfs_xl').html('快递');
				}else if(fhlist.logistics_way==2){
					$('.tanceng .ckd_fahuo_wlfs_xl').html('陆运');
				}else if(fhlist.logistics_way==3){
					$('.tanceng .ckd_fahuo_wlfs_xl').html('空运');
				}else if(fhlist.logistics_way==4){
					$('.tanceng .ckd_fahuo_wlfs_xl').html('平邮');
				}else{
					$('.tanceng .ckd_fahuo_wlfs_xl').html('海运');
				}
				$('.tanceng .ckd_fahuo_shouhuoren_xxl').html(likNullData(fhlist.consignee));
				$('.tanceng .ckd_fahuo_shrdianhua_xxl').html(likNullData(fhlist.consignee_tel));
				$('.tanceng .ckd_fahuo_shrdizhi_xxl').html(likNullData(fhlist.consignee_addr));
				$('.tanceng .ckd_fahuoxzwldan_btnxxl').attr({'shr':fhlist.consignee,'shrdh':fhlist.consignee_tel,'shrdz':fhlist.consignee_addr});
				if(fhlist.is_package_freight==1){
					$('.tanceng .ckd_fahuo_cdanyunfei_xxl').html('包运费');
				}else{
					$('.tanceng .ckd_fahuo_cdanyunfei_xxl').html('不包运费');
				}
				if(fhlist.output_type==1){
					$('.tanceng .ckd_fahuo_tabletitle_xxl').html('出库单-销售出库');
				}else if(fhlist.output_type==2){
					$('.tanceng .ckd_fahuo_tabletitle_xxl').html('出库单-采购退货');
				}else if(fhlist.output_type==3){
					$('.tanceng .ckd_fahuo_tabletitle_xxl').html('出库单-借出出库');
				}else if(fhlist.output_type==4){
					$('.tanceng .ckd_fahuo_tabletitle_xxl').html('出库单-借入归还');
				}else if(fhlist.output_type==5){
					$('.tanceng .ckd_fahuo_tabletitle_xxl').html('出库单-销售换货');
				}else{
					$('.tanceng .ckd_fahuo_tabletitle_xxl').html('出库单-采购换货');
				}
				if(fhlist.productList.length==0){
					$('.tanceng .ckd_fahuo_tbody_listxxl').html('');
					var err = '';
					err +='<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
					$('.tanceng .ckd_fahuo_errhtml_xxl').html(err);
				}else{
					$('.tanceng .ckd_fahuo_errhtml_xxl').html('');
					$.each(fhlist.productList, function(i,v) {
						if(v.output_way==3){
							if((parseInt(v.package_num)-parseInt(v.shipments_num))==0){
								return false;
							}
						}else{
							if((parseInt(v.distribution_num)-parseInt(v.shipments_num))==0){
								return false;
							}
						}
				 			fhhtml +='<tr uid="'+v.id+'" spid="'+v.product_id+'" splx="'+v.product_type+'"><td>'+Appendzero(i+1)+'</td>';
				 			if(v.product_type==1){
				 				fhhtml +='<td>商品</td>';
				 			}else if(v.product_type==2){
				 				fhhtml +='<td>套餐商品</td>';
				 			}else{
				 				fhhtml +='<td>整机商品</td>';
				 			}
				 			if(v.output_way==1){
				 				fhhtml +='<td>商品出库</td>';   
				 			}else if(v.output_way==2){
				 				fhhtml +='<td>整机出库</td>'; 
				 			}else{
				 				fhhtml +='<td>组装出库</td>'; 
				 			}
                                         
                            fhhtml +='<td>'+likNullData(v.code_sn)+'</td>';  
                            if(v.output_way==3){
                            	fhhtml +='<td><span class="storage_single_circle but_yellow">组</span>'+likNullData(v.product_name)+'</td>'; 
                            }else{
                            	 fhhtml +='<td>'+likNullData(v.product_name)+'</td>';  
                            }
                            fhhtml +='<td>'+likNullData(v.unit_name)+'</td>';                
                            fhhtml +='<td>'+likNullData(v.attr_name)+'</td>';

                            if(v.output_way==3){
                            	fhhtml +='<td>'+likNullData(v.package_num)+'</td>'; 
                            }else{
                            	fhhtml +='<td>'+likNullData(v.distribution_num)+'</td>'; 
                            }
                            fhhtml +='<td>'+likNullData(v.shipments_num)+'</td>'; 
                            if(v.output_way==3){
                            	fhhtml +='<td><div class="num_input inline_block num_input_new"><button class="but_blue but_opa_small inp_plus ckd_fahuosljiajia_btnxxl" maxnum="'+(parseInt(v.package_num)-parseInt(v.shipments_num))+'">+</button><input type="text" class="lik_input_number ckd_fahuosl_valchangs_xxl" value="0" maxnum="'+(parseInt(v.package_num)-parseInt(v.shipments_num))+'"/><button class="but_blue but_opa_small radius_left_0 inp_reduce ckd_fahuosl_jianjian_btnxxl">-</button></div></td>';
                            }else{
                            	fhhtml +='<td><div class="num_input inline_block num_input_new"><button class="but_blue but_opa_small inp_plus ckd_fahuosljiajia_btnxxl" maxnum="'+(parseInt(v.distribution_num)-parseInt(v.shipments_num))+'">+</button><input type="text" class="lik_input_number ckd_fahuosl_valchangs_xxl" value="0" maxnum="'+(parseInt(v.distribution_num)-parseInt(v.shipments_num))+'"/><button class="but_blue but_opa_small radius_left_0 inp_reduce ckd_fahuosl_jianjian_btnxxl">-</button></div></td>';   
                            }
							                                
                            fhhtml +='</tr>';                
				 		});
//				 		var sum = 0,suma=0,sumb=0;
//							for(var i = 0; i < numsl.length; i++) {
//								sum += parseInt(numsl[i]);
//							}
//							$.each(ycyzsl, function(i,v) {
//								suma +=parseInt(v);
//							});
//							$.each(yfhsl, function(i,v) {
//								sumb +=parseInt(v);
//							});
				 		//lasttr ='';
				 		$('.tanceng .ckd_fahuo_tbody_listxxl').html(fhhtml);
					
				}
				
				
			}
		},
		error:function(e){
			console.log(e);
			$('.tanceng .ckd_fahuo_tbody_listxxl').html('');
					var err = '';
					err +='<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
					$('.tanceng .ckd_fahuo_errhtml_xxl').html(err);
		}
	});
}
//选择发货数量控制
$('.tanceng .ckd_fahuosljiajia_btnxxl').die().live('click',function(){
	var default_num = parseInt($(this).next('input').val());
	var nums_xxl = parseInt($(this).attr('maxnum'));
	if(default_num > nums_xxl) {
		alert('不得大于剩余发货数量');
		$(this).next('input').val(nums_xxl);
	} else {
		$(this).next('input').val(default_num);
	}
	var nums= 0;
	$('.tanceng .ckd_fahuo_tbody_listxxl>tr').each(function(i,v){
		//console.log(v)
		nums +=parseInt($(this).children('td:last-child').children().children('input').val());
	})
	$('.tanceng .ckd_fahuoslheji_numxxl').html(nums);
})
$('.tanceng .ckd_fahuosl_valchangs_xxl').die().live('change',function(){
 	var valnum = parseInt($(this).val()),maxnum = parseInt($(this).attr('maxnum'));
   	if(valnum>maxnum){
   		alert('不得大于出库数量');
   		$(this).val(maxnum)
   	}else{
   		$(this).val(valnum)
   	}
 	var nums= 0;
	$('.tanceng .ckd_fahuo_tbody_listxxl>tr').each(function(i,v){
		//console.log(v)
		nums +=parseInt($(this).children('td:last-child').children().children('input').val());
	})
	$('.tanceng .ckd_fahuoslheji_numxxl').html(nums);
 })
$('.tanceng .ckd_fahuosl_jianjian_btnxxl').die().live('click',function(){
	var nums= 0;
	$('.tanceng .ckd_fahuo_tbody_listxxl>tr').each(function(i,v){
		//console.log(v)
		nums +=parseInt($(this).children('td:last-child').children().children('input').val());
	})
	$('.tanceng .ckd_fahuoslheji_numxxl').html(nums);
})
//选择物流单
var ckd_wuliudan_data  ={
	token:token,
	relevant_documents:''//关联业务编号
}
$('.tanceng .ckd_fahuoxzwldan_btnxxl[name="crk_ckgl_dealCK_xzwld"]').die().live('click',function(){
	//console.log($(this).attr('wldbh'));
	$('.tanceng .ckd_xinjianwld_btnxxl').attr({'wldbh':$(this).attr('wldbh'),'shr':$(this).attr('shr'),'shrdh':$(this).attr('shrdh'),'shrdz':$(this).attr('shrdz'),'cklxid':$(this).attr('cklxid')});
	
	ckd_wuliudan_data.relevant_documents = $(this).attr('wldbh');
	ckd_wuliudan_ajax();
})

function ckd_wuliudan_ajax(){
	$.ajax({
		type:"get",
		url:SERVER_URL+"logistics/infobydj",
		data:ckd_wuliudan_data,
		dataType:'json',
		success:function(data){
			if(data.code!=0){
				console.log(data);
				$('.tanceng .ckd_wuliudan_tbodylist_xxl').html('');
				var err = '';
				err +='<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
				$('.tanceng .ckd_wuliudanlist_errhtml_xxl').html(err);
			}else{
				console.log(data);
				var wulist = data['data'],wuhtml='';
				if(wulist.length==0){
					$('.tanceng .ckd_wuliudan_tbodylist_xxl').html('');
					var err = '';
					err +='<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
					$('.tanceng .ckd_wuliudanlist_errhtml_xxl').html(err);
				}else{
					$('.tanceng .ckd_wuliudanlist_errhtml_xxl').html('');
					$.each(wulist, function(i,v) {
						wuhtml +='<tr>';
                        wuhtml +='<td><input type="radio" name="crk_ckgl_xzwldInp"/></td>';                    
                        wuhtml +='<td>'+Appendzero(i+1)+'</td>';                    
                        wuhtml +='<td>'+likNullData(v.number)+'</td>';                   
                        wuhtml +='<td>'+likNullData(v.sn)+'</td>';                   
                        wuhtml +='<td>'+likNullData(v.logistics_company_id)+'</td>'; 
                        if(v.way==1){
                        	wuhtml +='<td>快递</td>';   
                        }else if(v.way==2){
                        	wuhtml +='<td>陆运</td>'; 
                        }else if(v.way==3){
                        	wuhtml +='<td>空运</td>'; 
                        }else if(v.way==4){
                        	wuhtml +='<td>平邮</td>'; 
                        }else{
                        	wuhtml +='<td>海运</td>'; 
                        }
                                       
                        wuhtml +='<td>'+likNullData(v.money)+'</td>';                    
                        wuhtml +='<td>'+likNullData(v.delivery_time)+'</td>';                    
                        wuhtml +='<td>'+likNullData(v.predict_delivery_time)+'</td>';                   
                        wuhtml +='<td>'+likNullData(v.document_marker)+'</td>';                   
                        wuhtml +='<td>'+likNullData(v.create_time)+'</td>';                    
                        wuhtml +='<td>'+likNullData(v.principal)+'</td>';                   
                        wuhtml +='<td>'+likNullData(v.description)+'</td>';                   
                        wuhtml +='</tr>';
					});
					$('.tanceng .ckd_wuliudan_tbodylist_xxl').html(wuhtml);
				}
			}
		},
		error:function(e){
			console.log(e);
			$('.tanceng .ckd_wuliudan_tbodylist_xxl').html('');
			var err = '';
			err +='<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
			$('.tanceng .ckd_wuliudanlist_errhtml_xxl').html(err);
		}
	});
}
//生成物流编号
function addwuliubianhao_ajax(){
	$.ajax({
		type:"post",
		url:SERVER_URL+"logistics/createnumber",
		data:{token:token},
		dataType:'json',
		success:function(data){
			if(data.code!=0){
				console.log(data)
			}else{
				console.log(data);
				$('.tanceng .ckd_shemhcwld_valxxl').val(data.data);
			}
		},
		error:function(e){
			console.log(e);
		}
	});
}
//获取物流公司列表
function ckd_hqwlgslist_ajax(){
	$.ajax({
		type:"get",
		url:SERVER_URL+"logistics/getexpress",
		data:{token:token},
		dataType:'json',
		success:function(data){
			if(data.code!=0){
				alert('获取物流公司信息失败,请重新获取');
			}else{
				console.log(data);
				var wlgs = data['data'],wlxxhtml='';
				$.each(wlgs, function(i,v) {
					wlxxhtml +='<li>'+v.express+'</li>';
				});
				$('.tanceng .ckd_wuligs_listul_xxl').html(wlxxhtml);
			}
		},
		error:function(e){
			console.log(e)
		}
	});
}
$('.tanceng .ckd_hqwlgs_btnxxl,.ckd_xjwld_xzwlgs_valxxl').die().live('click',function(){
	ckd_hqwlgslist_ajax();
})
$('.tanceng input[name="crk_ckgl_xzwldInp"]').die().live('click',function(){
	//console.log($(this).parents('tr').children().eq(2).text());
	$('.tanceng .ckd_wuliudan_queding_btnxxl').attr({'wlbh':$(this).parents('tr').children().eq(2).text(),'wldanh':$(this).parents('tr').children().eq(3).text(),'wlgs':$(this).parents('tr').children().eq(4).text()})
})
//选择物流单确定
$('.tanceng .ckd_wuliudan_queding_btnxxl').die().live('click',function(){
	if($('.tanceng input[name="crk_ckgl_xzwldInp"]:checked').length==0){
		alert('请选择物流单');
		return false;
	}
	$('.tanceng .ckd_fahuo_xzwld_valxxl').val($(this).attr('wlbh'));
	$('.tanceng .ckd_fahuo_wuliudanhao_xxl').val($(this).attr('wldanh'));
	$('.tanceng .ckd_fahuo_wuliugs_xxl').val($(this).attr('wlgs'));
	$(this).parent().parent().parent().remove();
		var num = $('.tanceng').children(".dialog_box").length;
		if(num < 1) {
			$(".tanceng").hide();
		}
})
//新建物流单
$('.tanceng .ckd_xinjianwld_btnxxl').die().live('click',function(){
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
	var now = year + '-' + p(month) + "-" + p(date) + " " + p(h) + ':' + p(m);
	$('.tanceng .ckd_xinjianwld_glywdh_xxl').val($(this).attr('wldbh'));
	$('.tanceng .ckd_xjwld_shoujiamren').val($(this).attr('shr'));
	$('.tanceng .ckd_xjwl_shoujianredianhua_xxl').val($(this).attr('shrdh'));
	$('.tanceng .ckd_xjwld_sjrdizhi_xxl').val($(this).attr('shrdz'));
	$('.tanceng .ckd_xinjianwld_queding_btnxxl').attr('cklxid',$(this).attr('cklxid'));
	$('.tanceng .ckd_xijwld_cjr_xxl').html(username);
	$('.tanceng .ckd_xjwld_cjrq_xxl').html(now);
	addwuliubianhao_ajax();
})
$('.tanceng .ckd_xjwld_xzwlfs_xxl>li').die().live('click',function(){
	$('.tanceng .ckd_xjwld_xzwlfs_valxxl').attr('uid',$(this).attr('dataid'));
})
$('.tanceng .ckd_xjwl_xzfzrbtnxxl').die().live('click',function(){
	$('.tanceng .ckgl_xzckrnyuan_qdbtnxxl').attr('typeid','4')
})
var xinjian_wuliudan_data = {
	token:token,
	sn:'',//快递单号
	logistics_company_id:'',//物流公司
	relevant_documents:'',//关联业务编号
	number:'',//物流编号
	way:'',//物流方式 1.快递 2.陆运 3.空运 4.平邮 5.海运
	money:'',//物流金额
	delivery_time:'',//发货时间
	predict_delivery_time:'',//预计到货时间
	principal:'',//负责人
	department:'',//负责人部门
	description:'',//备注
	receiver:'',//收件人
	receiver_phone:'',//收件人电话
	receiver_addr:'',//收件人地址
	sender:'',//寄件人
	sender_phone:'',//寄件人电话
	sender_addr:'',//寄件人地址
	delivery_type:''
}
$('.tanceng .ckd_xinjianwld_queding_btnxxl').die().live('click',function(){
	if($('.tanceng .ckd_shemhcwld_valxxl').val()==''||$('.tanceng .ckd_shemhcwld_valxxl').val()=='物流编号'){
		alert('生成物流编号失败,请从新进入');
		return false;
	}
	if($('.tanceng .ckd_xjwld_xzwlfs_valxxl').val()=='请选择物流方式'){
		alert('请选择物流方式');
		return false;
	}
	if($('#fahuo_shijian').val()==''||$('#fahuo_shijian').val()=='选择日期'){
		alert('请选择发货日期');
		return false;
	}
	if($('#daohuo_shijian').val()==''||$('#daohuo_shijian').val()=='选择日期'){
		alert('请选择到货日期');
		return false;
	}
	if($('.tanceng .ckd_xjwld_wuliujiner_xxl').val()==''||$('.tanceng .ckd_xjwld_wuliujiner_xxl').val()=='请输入物流金额'){
		alert('请输入物流金额');
		return false;
	}
	if($('.tanceng .ckd_xjwl_fzrvalxxl').val()==''){
		alert('请选择负责人');
		return false;
	}
	if($('.tanceng .ckd_xjwld_xzwlgs_valxxl').val()==''||$('.tanceng .ckd_xjwld_xzwlgs_valxxl').val()=='请选择物流公司'){
		alert('请选择物流公司');
		return false;
	}
	if($('.tanceng .ckd_xjwld_wuliudanhao_xxl').val()==''||$('.tanceng .ckd_xjwld_wuliudanhao_xxl').val()=='请填写物流单号'){
		alert('请填写物流单号');
		return false;
	}
	if($('.tanceng .ckd_xjwl_jijianred_xxl').val()==''||$('.tanceng .ckd_xjwl_jijianred_xxl').val()=='请输入寄件人'){
		alert('请输入寄件人');
		return false;
	}
	if($('.tanceng .ckd_xjwl_jijianrdianhua_xxl').val()==''||$('.tanceng .ckd_xjwl_jijianrdianhua_xxl').val()=='寄件人电话'){
		alert('请输入寄件人电话');
		return false;
	}
	if($('.tanceng .ckd_xjwl_jjrdizhi_xxl').val()==''||$('.tanceng .ckd_xjwl_jjrdizhi_xxl').val()=='寄件人地址'){
		alert('请输入寄件人地址');
		return false;
	}
	if($('.tanceng .ckd_xjwl_beizhu_xxl').val()==''||$('.tanceng .ckd_xjwl_beizhu_xxl').val()=='请输入备注'){
		$('.tanceng .ckd_xjwl_beizhu_xxl').val('');
	}
	xinjian_wuliudan_data.sn = $('.tanceng .ckd_xjwld_wuliudanhao_xxl').val();
	xinjian_wuliudan_data.logistics_company_id = $('.tanceng .ckd_xjwld_xzwlgs_valxxl').val();
	xinjian_wuliudan_data.relevant_documents = $('.tanceng .ckd_xinjianwld_glywdh_xxl').val();
	xinjian_wuliudan_data.number = $('.tanceng .ckd_shemhcwld_valxxl').val();
	xinjian_wuliudan_data.way = $('.tanceng .ckd_xjwld_xzwlfs_valxxl').attr('uid');
	xinjian_wuliudan_data.money = $('.tanceng .ckd_xjwld_wuliujiner_xxl').val();
	xinjian_wuliudan_data.delivery_time = $('#fahuo_shijian').val();
	xinjian_wuliudan_data.predict_delivery_time = $('#daohuo_shijian').val();
	xinjian_wuliudan_data.principal = $('.tanceng .ckd_xjwl_fzrvalxxl').attr('uid');
	xinjian_wuliudan_data.department = $('.tanceng .ckd_xjwl_fuzebumen_xxl').attr('uid');
	xinjian_wuliudan_data.description = $('.tanceng .ckd_xjwl_beizhu_xxl').val();
	xinjian_wuliudan_data.receiver = $('.tanceng .ckd_xjwld_shoujiamren').val();
	xinjian_wuliudan_data.receiver_phone = $('.tanceng .ckd_xjwl_shoujianredianhua_xxl').val();
	xinjian_wuliudan_data.receiver_addr = $('.tanceng .ckd_xjwld_sjrdizhi_xxl').val();
	xinjian_wuliudan_data.sender = $('.tanceng .ckd_xjwl_jijianred_xxl').val();
	xinjian_wuliudan_data.sender_phone = $('.tanceng .ckd_xjwl_jijianrdianhua_xxl').val();
	xinjian_wuliudan_data.sender_addr = $('.tanceng .ckd_xjwl_jjrdizhi_xxl').val();
	xinjian_wuliudan_data.delivery_type = $(this).attr('cklxid');
	ckd_xinjianwuliudan_ajax();
	$(this).parent().parent().parent().remove();
		var num = $('.tanceng').children(".dialog_box").length;
		if(num < 1) {
			$(".tanceng").hide();
		}
})
function ckd_xinjianwuliudan_ajax(){
	$.ajax({
		type:"post",
		url:SERVER_URL+"logistics/add",
		data:xinjian_wuliudan_data,
		dataType:'json',
		success:function(data){
			if(data.code!=0){
				alert('对不起,新建失败,请重新操作');
				console.log(data)
			}else{
				console.log(data);
				ckd_wuliudan_ajax();
			}
		},
		error:function(e){
			console.log(e);
			alert('对不起,新建失败,请重新操作');
		}
	});
}
//确定发货
var ckd_fahuoqueding_data = {
	token:token,
	output_id:'',//出库单ID
	output_number:'',//出库单编号
	logistics_number:'',//物流编号
	logistics_sn:'',//物流单号
	shipments_name:'',//发货人
	product_info:''
}
$('.tanceng .ckd_quedingfahuo_btnxxl').die().live('click',function(){
	var arrsj = [];
	if($('.tanceng .ckd_fahuo_xzwld_valxxl').val()==''){
		alert('请选择物流单');
		return false;
	}
	ckd_fahuoqueding_data.output_id = $(this).attr('uid');
	ckd_fahuoqueding_data.output_number = $(this).attr('ckdbh');
	ckd_fahuoqueding_data.logistics_number = $('.tanceng .ckd_fahuo_xzwld_valxxl').val();
	ckd_fahuoqueding_data.logistics_sn = $('.tanceng .ckd_fahuo_wuliudanhao_xxl').val();
	ckd_fahuoqueding_data.shipments_name = username;
	if($('.tanceng .ckd_fahuo_tbody_listxxl').html()==''){
		alert('对不起,没有可以发货的商品');
		return false;
	}else{
		arrsj = []
		$('.tanceng .ckd_fahuo_tbody_listxxl>tr').each(function(i,v){
		
			if(parseInt($(this).children('td:last-child').children().children('input').val())<1){
				alert('请选择发货数量');
				return false;
			}else{
				arrsj.push({
				'id':$(this).attr('uid'),
				'product_id':$(this).attr('spid'),
				'product_type':$(this).attr('splx'),
				'shipments_num':$(this).children('td:last-child').children().children('input').val()
				})
				ckd_fahuoqueding_data.product_info = JSON.stringify(arrsj);
			
			}
			
		})
		ckd_fahuoqueding_ajax();
	}
		
		
	
	
	//console.log(ckd_fahuoqueding_data)
			
		
	
	
})
function ckd_fahuoqueding_ajax(){
	$.ajax({
		type:"post",
		url:SERVER_URL+"stock-out/shipments",
		data:ckd_fahuoqueding_data,
		dataType:'json',
		success:function(data){
			if(data.code!=0){
				console.log(data);
			}else{
				console.log(data);
				$('.tanceng').empty().hide();
//				$('.tanceng .ckd_quedingfahuo_btnxxl').parent().parent().parent().remove();
//				$('.tanceng .ckd_fahuoanniu_btnxxl').parents('.dialog_box').remove();
//				var num = $('.tanceng').children(".dialog_box").length;
//					if(num < 1) {
//						$(".tanceng").hide();
//					}
				//ckd_ckblck_ajax();
				ckgl_ckdlist_ajax();
			}
		},
		error:function(e){
			console.log(e)
		}
	});
}

	// 定义配置商品装机查看项
var ckgl_pzspzjdyckx_list = [{
	'index': null,
	'field': '计算方式'
}, {
	'index': null,
	'field': '组装时间'
}, {
	'index': null,
	'field': '出库库房'
}, {
	'index': null,
	'field': '按时完成'
}, {
	'index': null,
	'field': '延时完成'
}, {
	'index': null,
	'field': '组装人'
}];
//配置商品装机列表
var ckgl_pzspzj_data = {
		token: token,
		page: page,
		num: num,
		key: '',
		product_name: '', //组装商品
		warehouse_id: '', //库房Id
		category: '', //计算方式 1 单个组装 2整批组装
		package_name: '', //组装人
		order_by: 'create_time', //排序字段
		order_sort: '1' //排序序号 0 顺序 1 倒序
	}
	//配置商品排序搜索
var ckglzjzzckrq=0;
$('.ckglzjzuzhuang_ckrqxxl').die().live('click',function(){
	ckglzjzzckrq++;
	if(ckglzjzzckrq%2==0){
		ckgl_pzspzj_data.order_sort = '0';
	}else{
		ckgl_pzspzj_data.order_sort = '1';
	}
	ckgl_pzspzj_data.order_by = 'output_time';
	ckgl_pzspzj_ajax()
})
//$('.ckglzjzuzhuang_ckrqxxl').toggle(function() {
//	$(this).children(".price_icon").removeClass("down").addClass("up");
//	ckgl_pzspzj_data.order_by = 'output_time';
//	ckgl_pzspzj_data.order_sort = '0';
//	ckgl_pzspzj_ajax()
//}, function() {
//	$(this).children(".price_icon").removeClass("up").addClass("down");
//	ckgl_pzspzj_data.order_by = 'output_time';
//	ckgl_pzspzj_data.order_sort = '1';
//	ckgl_pzspzj_ajax()
//})
var pzspzjcjrq=0;
$('.ckgl_pzspzj_cjrisortpx_xxl').die().live('click',function(){
	pzspzjcjrq++;
	if(pzspzjcjrq%2==0){
		ckgl_pzspzj_data.order_sort = '0';
	}else{
		ckgl_pzspzj_data.order_sort = '1';
	}
	ckgl_pzspzj_data.order_by = 'create_time';
	ckgl_pzspzj_ajax()
})
//$('.ckgl_pzspzj_cjrisortpx_xxl').toggle(function() {
//	$(this).children(".price_icon").removeClass("down").addClass("up");
//	ckgl_pzspzj_data.order_by = 'create_time';
//	ckgl_pzspzj_data.order_sort = '0';
//	ckgl_pzspzj_ajax()
//}, function() {
//	$(this).children(".price_icon").removeClass("up").addClass("down");
//	ckgl_pzspzj_data.order_by = 'create_time';
//	ckgl_pzspzj_data.order_sort = '1';
//	ckgl_pzspzj_ajax()
//})
var pzspzjzzsl=0;
$('.ckgl_pzspzj_zzslpx_xxl').die().live('click',function(){
	pzspzjzzsl++;
	if(pzspzjzzsl%2==0){
		ckgl_pzspzj_data.order_sort = '0';
	}else{
		ckgl_pzspzj_data.order_sort = '1';
	}
	ckgl_pzspzj_data.order_by = 'total_num';
	ckgl_pzspzj_ajax()
})
//$('.ckgl_pzspzj_zzslpx_xxl').toggle(function() {
//	$(this).children(".price_icon").removeClass("down").addClass("up");
//	ckgl_pzspzj_data.order_by = 'total_num';
//	ckgl_pzspzj_data.order_sort = '0';
//	ckgl_pzspzj_ajax()
//}, function() {
//	$(this).children(".price_icon").removeClass("up").addClass("down");
//	ckgl_pzspzj_data.order_by = 'total_num';
//	ckgl_pzspzj_data.order_sort = '1';
//	ckgl_pzspzj_ajax()
//})
var pzspzjyzznum=0;
$('.ckgl_pzspzj_yzznumpx_xxl').die().live('click',function(){
	pzspzjyzznum++;
	if(pzspzjyzznum%2==0){
		ckgl_pzspzj_data.order_sort = '0';
	}else{
		ckgl_pzspzj_data.order_sort = '1';
	}
	ckgl_pzspzj_data.order_by = 'num';
	ckgl_pzspzj_ajax()
})
//$('.ckgl_pzspzj_yzznumpx_xxl').toggle(function() {
//	$(this).children(".price_icon").removeClass("down").addClass("up");
//	ckgl_pzspzj_data.order_by = 'num';
//	ckgl_pzspzj_data.order_sort = '0';
//	ckgl_pzspzj_ajax()
//}, function() {
//	$(this).children(".price_icon").removeClass("up").addClass("down");
//	ckgl_pzspzj_data.order_by = 'num';
//	ckgl_pzspzj_data.order_sort = '1';
//	ckgl_pzspzj_ajax()
//})
var pzspzjanswcpx=0;
$('.ckgl_pzspzj_answcpx_xxl').die().live('click',function(){
	pzspzjanswcpx++;
	if(pzspzjanswcpx%2==0){
		ckgl_pzspzj_data.order_sort = '0';
	}else{
		ckgl_pzspzj_data.order_sort = '1';
	}
	ckgl_pzspzj_data.order_by = 'finished_num';
	ckgl_pzspzj_ajax()
})
//$('.ckgl_pzspzj_answcpx_xxl').toggle(function() {
//	$(this).children(".price_icon").removeClass("down").addClass("up");
//	ckgl_pzspzj_data.order_by = 'finished_num';
//	ckgl_pzspzj_data.order_sort = '0';
//	ckgl_pzspzj_ajax()
//}, function() {
//	$(this).children(".price_icon").removeClass("up").addClass("down");
//	ckgl_pzspzj_data.order_by = 'finished_num';
//	ckgl_pzspzj_data.order_sort = '1';
//	ckgl_pzspzj_ajax()
//})
var pzspzjyanshiwcpx=0;
$('.ckgl_pzspzj_yanshiwcpx_xxl').die().live('click',function(){
	pzspzjyanshiwcpx++;
	if(pzspzjyanshiwcpx%2==0){
		ckgl_pzspzj_data.order_sort = '0';
	}else{
		ckgl_pzspzj_data.order_sort = '1';
	}
	ckgl_pzspzj_data.order_by = 'deplayed_num';
	ckgl_pzspzj_ajax()
})
//$('.ckgl_pzspzj_yanshiwcpx_xxl').toggle(function() {
//	$(this).children(".price_icon").removeClass("down").addClass("up");
//	ckgl_pzspzj_data.order_by = 'deplayed_num';
//	ckgl_pzspzj_data.order_sort = '0';
//	ckgl_pzspzj_ajax()
//}, function() {
//	$(this).children(".price_icon").removeClass("up").addClass("down");
//	ckgl_pzspzj_data.order_by = 'deplayed_num';
//	ckgl_pzspzj_data.order_sort = '1';
//	ckgl_pzspzj_ajax()
//})

function ckgl_pzspzj_ajax() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "pz-package/list",
		data: ckgl_pzspzj_data,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data);
				$('.ckgl_pzspzj_listhtml_xxl').html('');
				$('.ckgl_pzspzjerrhtml_xxl').css('display', 'block');
				$('.ckgl_fenyelist_mainhtml_xxl').css('display', 'none');
			} else {
				console.log(data);
				var zj_list = data['dataList'],
					zj_html = '',zhtime='';
				$('.ckgl_pzspzj_listnums_xxl').html(data.totalcount);
				if(zj_list.length == 0) {
					$('.ckgl_pzspzj_listhtml_xxl').html('');
					$('.ckgl_pzspzjerrhtml_xxl').css('display', 'block');
					$('.ckgl_fenyelist_mainhtml_xxl').css('display', 'none');
				} else {
					$('.ckgl_pzspzjerrhtml_xxl').css('display', 'none');
					$('.ckgl_fenyelist_mainhtml_xxl').css('display', 'block');
					$.each(zj_list, function(i, v) {
						zj_html += '<tr><td>' + Appendzero(i + 1) + '</td>';
						zj_html += '<td>' + likNullData(v.output_time.substr(0,10)) + '</td>';
						zj_html += '<td>' + likNullData(v.create_time) + '</td>';
						zj_html += '<td>' + likNullData(v.output_number) + '</td>';
						zj_html += '<td>' + likNullData(v.related_receipts_no) + '</td>';
						zj_html += '<td>' + likNullData(v.product_name) + '</td>';
						zj_html += '<td>' + likNullData(v.product_number) + '</td>';
						zj_html += '<td>'+likNullData(v.category)+'</td>';
//						if(v.timesList.length==0){
//							zj_html += '<td>未设定</td>';
//						}else{
//							zhtime ='';
//							$.each(v.timesList, function(i,v) {
//								if(v.category==1){
//									zhtime +='<span class="storage_single_circle but_green">单</span>'+likNullData(v.package_time)+'分钟';
//								}else{
//									zhtime +='<span class="storage_single_circle one" style="margin-left:10px;">整</span>'+likNullData(v.package_time)+'分钟'
//								}
//								
//							});
//							zj_html += '<td>'+zhtime+'</td>';
//						}
						zj_html += '<td>' + likNullData(v.total_num) + '</td>';
						zj_html += '<td>' + likNullData(v.num) + '</td>';
						zj_html += '<td>' + likNullData(v.finished_num) + '</td>';
						zj_html += '<td>' + likNullData(v.deplayed_num) + '</td>';
						zj_html += '<td>' + likNullData(v.package_name) + '</td>';
						zj_html += '<td>';
						if(v.total_num == v.num) {
							zj_html += '<button class="but_mix but_look val_dialog ckgl_pzspzjchakan_btnxxl" name="storage_cfgl_pzspzzLook" uid="' + v.id + '">查看</button>';
						} else {
							zj_html += '<button class="but_mix but_look val_dialog ckgl_pzspzj_zuzhuangbtn_xxl" uid="' + v.id + '" name="crk_ckgl_zuz">组装</button>';
						}
						zj_html += '</td></tr>';
					});
					$('.ckgl_pzspzj_listhtml_xxl').html(zj_html);
					list_table_render_pagination(".ckgl_fenyelist_mainhtml_xxl", ckgl_pzspzj_data, ckgl_pzspzj_ajax, data.totalcount, zj_list.length);
					likShow('#ckgl_pzspzj_ckxtable_xxl', ckgl_pzspzjdyckx_list, '#ckgl_pzspzjlistul_xxl', '#ckgl_pzspzjckx_baocbtnxxl', '#ckgl_pzspzjckx_hfmrbtnxxl');

				}
			}
		},
		error: function(e) {
			console.log(e);
			$('.ckgl_pzspzj_listhtml_xxl').html('');
			$('.ckgl_pzspzjerrhtml_xxl').css('display', 'block');
			$('.ckgl_fenyelist_mainhtml_xxl').css('display', 'none');
		}
	});
}
//配置商品搜索
//function ckgl_pzspzjssnow_listshowxxl(val) {
//	ckgl_pzspzj_data.key = val;
//	ckgl_pzspzj_ajax();
//}
$('.ckgl_pzspzjssbtn_xxl').die().live('click', function() {
		if($(this).prev().val() == '' || $(this).prev().val() == '搜索出库编号/关联单据编号/组装商品/配置商品编号') {
			ckgl_pzspzj_data.key='';
		} else {
			ckgl_pzspzj_data.key = $(this).prev().val();
			
		}
		ckgl_pzspzj_ajax()
	})
	//配置商品高级搜索
$('.ckgl_pzspzjgjss_jsfsxxl li').die().live('click', function() {
	ckgl_pzspzj_data.category = $(this).attr('typeid');
	ckgl_pzspzj_ajax()
})
$('.ckgl_pzspzjgjss_kflistxxl li').die().live('click', function() {
	ckgl_pzspzj_data.warehouse_id = $(this).attr('uid');
	ckgl_pzspzj_ajax();
})
$('.ckgl_pzspzjgjss_zuzren_listxxl li').die().live('click', function() {
		ckgl_pzspzj_data.package_name = $(this).attr('uid');
		ckgl_pzspzj_ajax();
	})
	//配置商品装机查看
var ckgl_pzspck_dataxxl = {
	token: token,
	id: ''
}

function ckgl_pzspck_ajax() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "pz-package/infobyid",
		data: ckgl_pzspck_dataxxl,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data)
			} else {
				console.log(data);
				var zz_list = data['data'],
					zz_html = '';
//				$('.tanceng .ckglpzspzj_dangezuzhuang_btnxxl').attr({
//					'syzznum': (parseInt(zz_list.total_num) - parseInt(zz_list.dis_num)),
//					'yfpsl': zz_list.dis_num,
//					'uid': zz_list.id,
//					'zzsl': zz_list.total_num
//				});
//				$('.tanceng .ckglzz_biajitime_listxxl').attr({
//					'syzznum': (parseInt(zz_list.total_num) - parseInt(zz_list.dis_num)),
//					'yfpsl': zz_list.dis_num,
//					'zzsl': zz_list.total_num
//				});
//				$('.tanceng .ckglpzspzj_zhengpizz_szbtnxxl').attr({
//					'syzznum': (parseInt(zz_list.total_num) - parseInt(zz_list.dis_num)),
//					'yfpsl': zz_list.dis_num,
//					'uid': zz_list.id,
//					'zzsl': zz_list.total_num
//				});
				$('.tanceng .ckglzjzz_chakan_titxxl').html(likNullData(zz_list.product_name) + '-组装详情');
				$('.tanceng .ckglzjzz_chakan_cjrq_xxl').html(likNullData(zz_list.create_time));
				$('.tanceng .ckglzjzz_chakna_gldjbh_xxl').html(likNullData(zz_list.related_receipts_no));
				$('.tanceng .ckglzjzz_chakan_ckdbh_xxl').html(likNullData(zz_list.output_number));
				$('.tanceng .ckglzjzz_chakan_ckkf_xxl').html(likNullData(zz_list.warehouse_name));
				$('.tanceng .ckglzjzz_chakan_zzsl_xxl').html(likNullData(zz_list.total_num));
				$('.tanceng .ckglzzsplist_dpqdtitle_xxl').html(likNullData(zz_list.product_name));
				var dpqd_list = zz_list.productList,
					dpqd_html = '';
				if(dpqd_list.length == 0) {
					$('.tanceng .ckglzjzz_chakantbody_xxl').html('');
					var dperr = '';
					dperr += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
					$('.tanceng .ckglzjzz_chakan_errtbody_xxl').html(dperr);
				} else {
					$('.tanceng .ckglzjzz_chakan_errtbody_xxl').html('');
					zz_html += '<tr>';
					zz_html += '<td rowspan="' + parseInt(dpqd_list.length + 1) + '" class="hbtd">' + likNullData(dpqd_list[0].product_no) + '</td>';
					zz_html += '<td rowspan="' + parseInt(dpqd_list.length + 1) + '" class="hbtd">' + likNullData(dpqd_list[0].set_name) + '/' + likNullData(dpqd_list[0].set_format) + '</td>';
					zz_html += '<td rowspan="' + parseInt(dpqd_list.length + 1) + '" class="hbtd" style="border: 1px solid #E6E6E6;">' + likNullData(dpqd_list[0].set_attr_name) + '</td></tr>';
					$.each(dpqd_list, function(i, v) {
						dpqd_html += '<tr><td>' + likNullData(v.product_name) + '</td>';
						dpqd_html += ' <td><p class="xiangmu_p1">' + likNullData(v.attr_name) + '</p></td>';
						dpqd_html += '<td>' + likNullData(v.num) + '</td></tr>';
					});
					zz_html += dpqd_html;
					$('.tanceng .ckglzjzz_chakantbody_xxl').html(zz_html);
				}
			}
		},
		error: function(e) {
			console.log(e)
		}
	});
}
function zjzzchakan_ajax_xxl(){
	$.ajax({
		type: "get",
		url: SERVER_URL + "pz-package/packagedetail",
		data: ckgl_sczzlist_data,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data);
				$('.tanceng .zjzzchakan_dange_tbodyxxl').html('');
				var errliebiao = '';
				errliebiao += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
				$('.tanceng .zjzzchakan_dange_errhtmlxxl').html(errliebiao);
				$('.tanceng .zjzzchakan_zhengpi_tbodyxxl').html('');
				var err_zp = '';
				err_zp += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
				$('.tanceng .zjzzchakan_zhengpi_errhtml_xxl').html(err_zp);
			} else {
				console.log(data);
					var dg_list = data.dataList.single,
						zp_list = data.dataList.batch,
						dg_html = '',
						zp_html = '';
					$('.tanceng .zjzzchakan_dangenums_xxl').html(dg_list.total_num);
					$('.tanceng .zjzzchakan_zhengpinums_xxl').html(zp_list.total_num);
					if(dg_list.list.length == 0) {
						$('.tanceng .zjzzchakan_dange_tbodyxxl').html('');
						var errliebiao = '';
						errliebiao += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
						$('.tanceng .zjzzchakan_dange_errhtmlxxl').html(errliebiao);
					} else {
						$('.tanceng .zjzzchakan_dange_errhtmlxxl').html('');
						$.each(dg_list.list, function(i, v) {
							dg_html += '<tr><td>' + Appendzero(i + 1) + '</td>';
							dg_html += '<td>' + likNullData(formatSeconds(parseInt(v.package_time)*60)) + '</td>';
							dg_html += '<td><span class="c_g">已完成</span></td>';
							dg_html += '<td>' + likNullData(v.begin_time) + '</td>';
							dg_html += '<td>' + likNullData(v.finish_time) + '</td>';
							
							if(v.pause_num == 0) {
								dg_html += '<td><span class="crk_pause f_color">0</span></td>';
								dg_html += '<td>-</td>';
							} else {
								dg_html += '<td class="val_dialogTop ckglzz_zhanting_btnxxl" name="crk_ckgl_timePause" uid="'+v.id+'" style="cursor:pointer;"><span class="crk_pause f_color">' + likNullData(v.pause_num) + '</span></td>';
								dg_html += '<td>' + likNullData(v.pause_time) + '</td>';
							}
							dg_html += '<td>' + likNullData(v.package_name) + '</td>';
							if(parseInt(v.elapsed_time) > parseInt(v.package_time)) {
									dg_html += '<td><span class="c_r">延时完成： <i class="c_9">耗时' + likNullData(v.elapsed_time) + '分钟</i></span></td>';
							} else {
									dg_html += '<td><span class="c_g">按时完成： <i class="c_9">耗时' + likNullData(v.elapsed_time) + '分钟</i></span></td>';
							}
							dg_html += '</tr>';
						});
						$('.tanceng .zjzzchakan_dange_tbodyxxl').html(dg_html);
					}
					if(zp_list.list.length == 0) {
						$('.tanceng .zjzzchakan_zhengpi_tbodyxxl').html('');
						var err_zp = '';
						err_zp += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
						$('.tanceng .zjzzchakan_zhengpi_errhtml_xxl').html(err_zp);
					} else {
						$('.tanceng .zjzzchakan_zhengpi_errhtml_xxl').html('');
						$.each(zp_list.list, function(i, v) {
							zp_html += '<tr><td>' + Appendzero(i + 1) + '</td>';
							zp_html += '<td>' + likNullData(formatSeconds(parseInt(v.package_time)*60)) + '</td>';
							zp_html += '<td>' + likNullData(v.package_num) + '</td>';
							zp_html += '<td><span class="c_g">已完成</span></td>';
							zp_html += '<td>' + likNullData(v.begin_time) + '</td>';
							zp_html += '<td>' + likNullData(v.finish_time) + '</td>';
							if(v.pause_num == 0) {
								zp_html += '<td><span class="crk_pause f_color">0</span></td>';
								zp_html += '<td>-</td>';
							} else {
								zp_html += '<td class="val_dialogTop ckglzz_zhanting_btnxxl" name="crk_ckgl_timePause" uid="'+v.id+'" style="cursor:pointer;"><span class="crk_pause f_color">' + likNullData(v.pause_num) + '</span></td>';
								zp_html += '<td>' + likNullData(v.pause_time) + '</td>';
							}
							zp_html += '<td>' + likNullData(v.package_name) + '</td>';
							
								if(parseInt(v.elapsed_time) > parseInt(v.package_time)) {
									zp_html += '<td><span class="c_r">延时完成： <i class="c_9">耗时' + likNullData(v.elapsed_time) + '分钟</i></span></td>';
								} else {
									zp_html += '<td><span class="c_g">按时完成： <i class="c_9">耗时' + likNullData(v.elapsed_time) + '分钟</i></span></td>';
								}
							zp_html += '</tr>';
						});
						$('.tanceng .zjzzchakan_zhengpi_tbodyxxl').html(zp_html);
					}

			}
		},
		error: function(e) {
			$('.tanceng .zjzzchakan_dange_tbodyxxl').html('');
			var errliebiao = '';
			errliebiao += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
			$('.tanceng .zjzzchakan_dange_errhtmlxxl').html(errliebiao);
			$('.tanceng .zjzzchakan_zhengpi_tbodyxxl').html('');
			var err_zp = '';
			err_zp += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
			$('.tanceng .zjzzchakan_zhengpi_errhtml_xxl').html(err_zp);
		}
	});
}

$('.ckgl_pzspzjchakan_btnxxl').die().live('click', function() {
		ckgl_pzspck_dataxxl.id = $(this).attr('uid');
		ckgl_sczzlist_data.id = $(this).attr('uid');
		ckgl_pzspck_ajax();
		zjzzchakan_ajax_xxl();
	})
	//组装列表
$('.ckglpzspzj_ck_zuzhuang_btnxxl').die().live('click', function() {
	ckgl_pzspck_dataxxl.id = $(this).attr('uid');
	ckglpzspzj_zuzhuang_ajax();
	ckgl_sczzlist_data.id = $(this).attr('uid');
	ckgl_sczzlist_ajax()
	$(".page_71_zzButBox").parents(".dialog_content ").children(".dialog_text_con").css({
		"padding-left": "40px",
		"padding-right": "40px"
	});
})
$('.ckgl_pzspzj_zuzhuangbtn_xxl').die('click').live('click', function() {
	ckgl_pzspck_dataxxl.id = $(this).attr('uid');
	ckglpzspzj_zuzhuang_ajax();
	ckgl_sczzlist_data.id = $(this).attr('uid');
	ckgl_sczzlist_ajax()
	$(".page_71_zzButBox").parents(".dialog_content ").children(".dialog_text_con").css({
		"padding-left": "40px",
		"padding-right": "40px"
	});
})

function ckglpzspzj_zuzhuang_ajax() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "pz-package/infobyid",
		data: ckgl_pzspck_dataxxl,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data)
			} else {
				console.log(data);
				var zz_list = data['data'],
					zz_html = '';
				$('.tanceng .ckglpzspzj_dangezuzhuang_btnxxl').attr({
					'syzznum': (parseInt(zz_list.total_num) - parseInt(zz_list.dis_num)),
					'yfpsl': zz_list.dis_num,
					'uid': zz_list.id,
					'zzsl': zz_list.total_num
				});
				$('.tanceng .ckglzz_biajitime_listxxl').attr({
					'syzznum': (parseInt(zz_list.total_num) - parseInt(zz_list.dis_num)),
					'yfpsl': zz_list.dis_num,
					'zzsl': zz_list.total_num
				});
				$('.tanceng .ckglpzspzj_zhengpizz_szbtnxxl').attr({
					'syzznum': (parseInt(zz_list.total_num) - parseInt(zz_list.dis_num)),
					'yfpsl': zz_list.dis_num,
					'uid': zz_list.id,
					'zzsl': zz_list.total_num
				});
				$('.tanceng .ckglspzz_zzlisttit_xxl').html(zz_list.product_name + '-组装详情');
				$('.tanceng .ckglzzsplist_cjrq_xxl').html(zz_list.create_time);
				$('.tanceng .ckglzzsplist_glajbh_xxl').html(zz_list.related_receipts_no);
				$('.tanceng .ckglzzsp_ckdbh_xxl').html(zz_list.output_number);
				$('.tanceng .ckglzzsp_ckkfs_xxl').html(zz_list.warehouse_name);
				$('.tanceng .ckglzzsp_zzslnums_xxl').html(zz_list.total_num);
				$('.tanceng .ckglzzsplist_dpqdtitle_xxl').html(zz_list.product_name);
//				$('.tanceng .cg_gys_addlxr').attr({
//					'uid': zz_list.id,
//					'zzsl': zz_list.total_num
//				});
				var dpqd_list = zz_list.productList,
					dpqd_html = '';
				if(dpqd_list.length == 0) {
					$('.tanceng .ckglpzspzj_spdpqd_listhtml_xxl').html('');
					var dperr = '';
					dperr += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
					$('.tanceng .ckglpzspzj_spdpqd_errhtml_xxl').html(dperr);
				} else {
					zz_html += '<tr>';
					zz_html += '<td rowspan="' + parseInt(dpqd_list.length + 1) + '" class="hbtd">' + likNullData(dpqd_list[0].product_no) + '</td>';
					zz_html += '<td rowspan="' + parseInt(dpqd_list.length + 1) + '" class="hbtd">' + likNullData(dpqd_list[0].set_name) + '/' + likNullData(dpqd_list[0].set_format) + '</td>';
					zz_html += '<td rowspan="' + parseInt(dpqd_list.length + 1) + '" class="hbtd" style="border: 1px solid #E6E6E6;">' + likNullData(dpqd_list[0].set_attr_name) + '</td></tr>';
					$.each(dpqd_list, function(i, v) {
						dpqd_html += '<tr><td>' + likNullData(v.product_name) + '</td>';
						dpqd_html += '<td>' + likNullData(v.format) + '</td>';
						dpqd_html += ' <td>' + likNullData(v.attr_name) + '</td>';
						dpqd_html += '<td>' + likNullData(v.num) + '</td></tr>';
					});
					zz_html += dpqd_html;
					$('.tanceng .ckglpzspzj_spdpqd_listhtml_xxl').html(zz_html);
				}
				

			}
		},
		error: function(e) {
			console.log(e)
		}
	});
}
//单个组装
$('.tanceng .ckglpzspzj_dangezuzhuang_btnxxl').die('click').live('click', function() {
		$('.tanceng .ckglpzspzj_dangezz_quedingbtn_xxl').attr('typeid','1')
		$('.tanceng .ckgl_dangge_titlezzsl_xxl').html($(this).attr('zzsl'));
		$('.tanceng .dangezzsl_gyifenpeisl_valxxl').html($(this).attr('yfpsl'));
		$('.tanceng .ckglpzspzj_dangezz_quedingbtn_xxl').attr('uid', $(this).attr('uid'));
		$('.tanceng .ckgldgzz_renyuan_showxxl').html('').removeAttr('uid');
		$('.ckglpzspzz_dgzz_xzryxxl').parent().css('display', 'block');
		if(parseInt($(this).attr('yfpsl'))==parseInt($(this).attr('zzsl'))){
			$('.tanceng .ckglpzspzj_dangezz_quedingbtn_xxl').attr('disabled','disabled').html('已分配完毕');
		}else{
			$('.tanceng .ckglpzspzj_dangezz_quedingbtn_xxl').removeAttr('disabled').html('分配');
		}
	})
	//整批组装
$('.tanceng .ckglpzspzj_zhengpizz_szbtnxxl').die('click').live('click', function() {
		$('.tanceng .ckglpzsp_zpizztitle_zzslsxxl').html($(this).attr('zzsl'));
		$('.tanceng .zpzzsl_gyifenpeisl_valxxl').html($(this).attr('yfpsl'));
		$('.tanceng .ckglpzspzj_zhengpizz_queding_btnxxl').attr({'uid': $(this).attr('uid'),'typeid':0});
		$('.tanceng .ckglzhengpi_zzren_showli_xxl').html('').removeAttr('uid');
		$('.ckglpzspzj_zpreyuan_xzbtnxxl').parent().css('display', 'block');
		if(parseInt($(this).attr('yfpsl'))==parseInt($(this).attr('zzsl'))){
			$('.tanceng .ckglpzspzj_zhengpizz_queding_btnxxl').attr('disabled','disabled').html('已分配完毕');
			$('.tanceng .ckglzp_zuzhslzdy_tabxxlvalue').attr({'syzznum':$(this).attr('syzznum'),'bjdqsl':'0'});
		}else{
			$('.tanceng .ckglpzspzj_zhengpizz_queding_btnxxl').removeAttr('disabled').html('分配');
			$('.tanceng .ckglzp_zuzhslzdy_tabxxlvalue').attr({'syzznum':$(this).attr('syzznum'),'bjdqsl':'0'});
		}
	})
	//确定组装
var pzspzj_queding_zzdata = {
	token: token,
	package_id: '',
	category: '', //计算方式 1 单个组装 2整批组装
	package_time: '', //组装时间
	package_name: '', //组装人
	package_num: '' //组装数量
}

function pzspzj_queding_zzajax() {
	$.ajax({
		type: "post",
		url: SERVER_URL + "pz-package/package",
		data: pzspzj_queding_zzdata,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data)
			} else {
				console.log(data);
				ckgl_sczzlist_ajax();
				ckglpzspzj_zuzhuang_ajax();
				//console.log(pzspzj_queding_zzdata.package_id+':::::'+pzspzj_queding_zzdata.category)
				//				if(pzspzj_queding_zzdata.category==1){
				//					ckgl_sczzlist_data.category = '1';
				//					ckgl_sczzlist_data.id = pzspzj_queding_zzdata.package_id;
				//					ckgl_sczzlist_ajax()
				//				}
			}
		},
		error: function(e) {
			console.log(e);
			alert('生成列表失败原因：网络崩溃喽');
		}
	});
}
$('.tanceng .ckglpzspzj_dangezz_quedingbtn_xxl').die('click').live('click', function() {
	
		if($('.tanceng .ckglpzspzj_dangezz_timexxl').val() == '') {
			alert('请输入组装时间');
			return false;
		}
		if(typeof($('.tanceng .ckgldgzz_renyuan_showxxl').attr('uid')) == "undefined") {
			alert('请选择组装人');
			return false;
		}
		if($(this).attr('typeid')==1){
			pzspzj_queding_zzdata.package_time = $('.tanceng .ckglpzspzj_dangezz_timexxl').val();
		pzspzj_queding_zzdata.package_id = $(this).attr('uid');
		pzspzj_queding_zzdata.category = '1';
		pzspzj_queding_zzdata.package_name = $('.tanceng .ckgldgzz_renyuan_showxxl').attr('uid');
		pzspzj_queding_zzdata.package_num = '1';
		pzspzj_queding_zzajax();
	}else{
		zzlist_bianji_data.id = $(this).attr('uid');
		zzlist_bianji_data.package_time = $('.tanceng .ckglpzspzj_dangezz_timexxl').val();
		zzlist_bianji_data.package_name = $('.tanceng .ckgldgzz_renyuan_showxxl').attr('uid');
		zzlist_bianji_data.package_num = '1';
		zzlist_bianji_ajax();
	}
		
		$(this).parent().parent().parent().remove();
		var num = $('.tanceng').children(".dialog_box").length;
		if(num < 1) {
			$(".tanceng").hide();
		}
	})
	//整批组装确定
function ckglzz_zpnums_tanvalue(val) {
	console.log(parseInt($(this).attr('syzznum')))
	if(parseInt(val)>parseInt($('.tanceng .ckglzp_zuzhslzdy_tabxxlvalue').attr('syzznum'))){
		
		$('.tanceng .ckglzp_zuzhslzdy_tabxxlvalue').val('').parent('div').next().show();
	}else{
		
		$('.tanceng .ckglzp_zuzhslzdy_tabxxlvalue').parent('div').next().hide();
		$('.tanceng .zpzzsl_gaibian_valxxl').html(val);
	}
	
}
//编辑组装调取详情换算数量
var zz_bianji_data = {
	token:token,
	id:''
}
function zz_bianji_ajax(){
	$.ajax({
		type:"get",
		url:SERVER_URL+"pz-package/infobydetailid",
		data:zz_bianji_data,
		dataType:'json',
		success:function(data){
			if(data.code!=0){
				console.log(data)
			}else{
				console.log(data);
				var zzlist = data['data'];
				if(zzlist.category==2){
					$('.tanceng .ckglzp_zuzhslzdy_tabxxlvalue').attr('syzznum',(parseInt(zzlist.total_num)-parseInt(zzlist.dis_num)));
					$('.tanceng .zpzzsl_gyifenpeisl_valxxl').html(zzlist.dis_num);
					$('.tanceng .ckglzhengpi_zzren_showli_xxl').attr('uid',zzlist.package_name_id).html('<i><i class="del_img_1 ckglzhengpzz_reydelete_xxl">-</i><em class="icon_personBtn icon_personBtn_msg"></em><em class="icon_adderBtn"></em><p class="box_adderName" uid="'+zzlist.package_name_id+'">'+zzlist.package_name+'</p></i>').next().css('display','none');
					
				}else{
					$('.tanceng .dangezzsl_gyifenpeisl_valxxl').html(zzlist.dis_num);
					$('.tanceng .ckgldgzz_renyuan_showxxl').attr('uid',zzlist.package_name_id).html('<i><i class="del_img_1 ckglzhengpzz_reydelete_xxl">-</i><em class="icon_personBtn icon_personBtn_msg"></em><em class="icon_adderBtn"></em><p class="box_adderName" uid="'+zzlist.package_name_id+'">'+zzlist.package_name+'</p></i>').next().css('display','none');
				}
				
			}
		},
		error:function(e){
			console.log(e)
		}
	});
}
$('.tanceng .ckglzz_biajizpzz_listxxl').die('click').live('click',function(){
	$('.tanceng .ckglpzspzj_zhengpizz_queding_btnxxl').attr({'uid':$(this).attr('uid'),'typeid':1});
	$('.tanceng .ckglzp_zuzhslzdy_tabxxlvalue').attr('bjdqsl',$(this).attr('dqsl'));
	zz_bianji_data.id = $(this).attr('uid');
	zz_bianji_ajax();
})
$('.tanceng .ckglpzspzj_zhengpizz_queding_btnxxl').die('click').live('click', function() {
	var zzsls = parseInt(parseInt($('.tanceng .ckglzp_zuzhslzdy_tabxxlvalue').attr('syzznum'))+parseInt($('.tanceng .ckglzp_zuzhslzdy_tabxxlvalue').attr('bjdqsl')));
		if($('.tanceng .ckglzz_zpzztimehouse_valxxl').val() == '' && $('.tanceng .ckglzz_zhengp_zzfenzvalxxl').val() == '') {
			alert('请输入组装时间——只能为数字');
			return false;
		}else{
			if($('.tanceng .ckglzz_zpzztimehouse_valxxl').val() == ''){
				$('.tanceng .ckglzz_zpzztimehouse_valxxl').val('0')
			}
			if($('.tanceng .ckglzz_zhengp_zzfenzvalxxl').val() == ''){
				$('.tanceng .ckglzz_zhengp_zzfenzvalxxl').val('0')
			}
		}
		if($('.tanceng .ckglzp_zuzhslzdy_tabxxlvalue').val() == '') {
			alert('请输入整批组装数量');
			return false;
		}else if(parseInt($('.tanceng .ckglzp_zuzhslzdy_tabxxlvalue').val())>zzsls){
			alert('不得大于剩余组装数量');
			return false;
		}
		if(typeof($('.tanceng .ckglzhengpi_zzren_showli_xxl').attr('uid')) == "undefined") {
			alert('请选择组装人');
			return false;
		}
		if($(this).attr('typeid')==0){
			pzspzj_queding_zzdata.package_id = $(this).attr('uid');
		pzspzj_queding_zzdata.category = '2';
		pzspzj_queding_zzdata.package_name = $('.tanceng .ckglzhengpi_zzren_showli_xxl').attr('uid');
		pzspzj_queding_zzdata.package_num = $('.tanceng .ckglzp_zuzhslzdy_tabxxlvalue').val();
		pzspzj_queding_zzdata.package_time = parseInt(parseInt($('.tanceng .ckglzz_zpzztimehouse_valxxl').val()) * 60) + parseInt($('.tanceng .ckglzz_zhengp_zzfenzvalxxl').val());
		//console.log(pzspzj_queding_zzdata)
		pzspzj_queding_zzajax();
		$(this).parent().parent().parent().remove();
		var num = $('.tanceng').children(".dialog_box").length;
		if(num < 1) {
			$(".tanceng").hide();
		}
		}else{
			zzlist_bianji_data.id = $(this).attr('uid');
			zzlist_bianji_data.package_time = parseInt(parseInt($('.tanceng .ckglzz_zpzztimehouse_valxxl').val()) * 60) + parseInt($('.tanceng .ckglzz_zhengp_zzfenzvalxxl').val());
			zzlist_bianji_data.package_name = $('.tanceng .ckglzhengpi_zzren_showli_xxl').attr('uid');
			zzlist_bianji_data.package_num = $('.tanceng .ckglzp_zuzhslzdy_tabxxlvalue').val();
			zzlist_bianji_ajax();
			$(this).parent().parent().parent().remove();
		var num = $('.tanceng').children(".dialog_box").length;
		if(num < 1) {
			$(".tanceng").hide();
		}
		}
		

	})
	//生成单个组装列表/整批组装列表
var ckgl_sczzlist_data = {
	token: token,
	id: '',
	category: ''
}
//获取分钟转换时分秒
function formatSeconds(value) {
				var theTime = parseInt(value); // 秒 
				var theTime1 = 0; // 分 
				var theTime2 = 0; // 小时 
				// alert(theTime); 
				if(theTime > 60) {
					theTime1 = parseInt(theTime / 60);
					theTime = parseInt(theTime % 60);
					// alert(theTime1+"-"+theTime); 
					if(theTime1 > 60) {
						theTime2 = parseInt(theTime1 / 60);
						theTime1 = parseInt(theTime1 % 60);
					}
				}
				var result = "";
				if(theTime1 > 0) {
					result = "" + parseInt(theTime1) + "分钟" + result;
				}
				if(theTime2 > 0) {
					result = "" + parseInt(theTime2) + "小时" + result;
				}
				return result;
			}
function ckgl_sczzlist_ajax() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "pz-package/packagedetail",
		data: ckgl_sczzlist_data,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data);
				$('.tanceng .ckgldgzz_listhtml_liebiaoxxl').html('');
				var errliebiao = '';
				errliebiao += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
				$('.tanceng .ckgldgzz_listliebiao_showerrhtml_xxl').html(errliebiao);
				$('.tanceng .ckglzpzz_zhengpizzlist_htmlxxl').html('');
				var err_zp = '';
				err_zp += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
				$('.tanceng .ckglzpzz_zhengpilist_errhtmlxxl').html(err_zp);
			} else {
				console.log(data);
//				if(data.dataList == null || data.dataList == undefined) {
//					$('.tanceng .ckgldgzz_listhtml_liebiaoxxl').html('');
//					var errliebiao = '';
//					errliebiao += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
//					$('.tanceng .ckgldgzz_listliebiao_showerrhtml_xxl').html(errliebiao);
//					$('.tanceng .ckglzpzz_zhengpizzlist_htmlxxl').html('');
//					var err_zp = '';
//					err_zp += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
//					$('.tanceng .ckglzpzz_zhengpilist_errhtmlxxl').html(err_zp);
//				} else {
					var dg_list = data.dataList.single,
						zp_list = data.dataList.batch,
						dg_html = '',
						zp_html = '';
					$('.tanceng .ckgl_dangezz_numsxxl').html(dg_list.total_num);
					$('.tanceng .ckglzpzz_zhengpizzsl_numsxxl').html(zp_list.total_num);
					if(dg_list.list.length == 0) {
						$('.tanceng .ckgldgzz_listhtml_liebiaoxxl').html('');
						var errliebiao = '';
						errliebiao += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
						$('.tanceng .ckgldgzz_listliebiao_showerrhtml_xxl').html(errliebiao);
					} else {
						$('.tanceng .ckgldgzz_listliebiao_showerrhtml_xxl').html('');
						$.each(dg_list.list, function(i, v) {
							dg_html += '<tr class="dange_'+i+'"><td>' + Appendzero(i + 1) + '</td>';
							dg_html += '<td>' + likNullData(formatSeconds(parseInt(v.package_time)*60)) + '</td>';
							if(v.status == 1) {
								dg_html += '<td><span class="c_c">未开始</span></td>';
							} else if(v.status == 2) {
								dg_html += '<td><span class="c_y">进行中</span></td>';
							} else {
								dg_html += '<td><span class="c_g">已完成</span></td>';
							}

							dg_html += '<td>' + likNullData(v.begin_time) + '</td>';
							if(v.status==3){
								dg_html += '<td>' + likNullData(v.finish_time) + '</td>';
							}else{
								dg_html += '<td>-</td>';
							}
							
							if(v.pause_num == 0) {
								dg_html += '<td><span class="crk_pause f_color">0</span></td>';
								dg_html += '<td>-</td>';
							} else {
								dg_html += '<td class="val_dialogTop ckglzz_zhanting_btnxxl" name="crk_ckgl_timePause" uid="'+v.id+'" style="cursor:pointer;"><span class="crk_pause f_color">' + likNullData(v.pause_num) + '</span></td>';
								dg_html += '<td>' + likNullData(v.pause_time) + '</td>';
							}

							dg_html += '<td>' + likNullData(v.package_name) + '</td>';
							if(v.status == 1) {
								dg_html += '<td>-</td>';
							} else if(v.status == 2) {
								dg_html += '<td> 开始时间：<span class="c_3" style="font-weight: bold;">'+likNullData(v.begin_time.substr(0,16))+'</span><br>结束时间：<span class="c_3" style="font-weight: bold;">'+likNullData(v.end_time.substr(0,16))+'</span></td>';
							} else {
								if(parseInt(v.elapsed_time) > parseInt(v.package_time)) {
									dg_html += '<td><span class="c_r">延时完成： <i class="c_9">耗时' + likNullData(v.elapsed_time) + '分钟</i></span></td>';
								} else {
									dg_html += '<td><span class="c_g">按时完成： <i class="c_9">耗时' + likNullData(v.elapsed_time) + '分钟</i></span></td>';
								}
							}

							if(v.status == 3) {
								dg_html += '<td><button class="but_mix but_grey1">开始</button><button class="but_mix but_grey1">暂停</button><button class="but_mix but_grey1">完成</button></td>';
								dg_html += '<td><button class="but_mix but_grey1">编辑</button><button class="but_mix but_grey1">删除</button></td>';
							} else if(v.status == 1) {
								dg_html += '<td><button class="but_mix but_blue val_dialogTop ckglzzsp_kaishi_btnxxl" uid="'+v.id+'" kssj="'+(parseInt(v.package_time))+'" trname="dange_'+i+'" name="crk_ckgl_start">开始</button><button class="but_mix but_grey1">暂停</button><button class="but_mix but_grey1">完成</button></td>';
								dg_html += '<td><button class="but_mix but_exit val_dialogTop ckglzz_biajitime_listxxl" uid="'+v.id+'" trname="dange_'+i+'" name="crk_ckgl_dgzz">编辑</button><button class="but_mix but_r val_dialogTop ckgl_zzdelete_listxxl" uid="'+v.id+'" trname="dange_'+i+'" name="crk_ckgl_delete">删除</button></td>';
							} else {
								if(v.pause_num>=1){
									dg_html += '<td><button class="but_mix but_blue val_dialogTop ckglzzsp_kaishitwo_btnxxl" uid="'+v.id+'" name="crk_ckgl_start">开始</button><button class="but_mix but_grey1" uid="'+v.id+'" trname="dange_'+i+'">暂停</button><button class="but_mix but_green val_dialogTop zjzz_wancheng_okbtn_xxl" uid="'+v.id+'" trname="dange_'+i+'" name="crk_ckgl_end">完成</button></td>';	
								}else{
									dg_html += '<td><button class="but_mix but_grey1">开始</button><button class="but_mix but_red val_dialogTop ckglzjzz_zhanting_btnxxl" uid="'+v.id+'" trname="dange_'+i+'" name="crk_ckgl_reasonPause">暂停</button><button class="but_mix but_green val_dialogTop zjzz_wancheng_okbtn_xxl" uid="'+v.id+'" trname="dange_'+i+'" name="crk_ckgl_end">完成</button></td>';
								}
								
								dg_html += '<td><button class="but_mix but_grey1">编辑</button><button class="but_mix but_grey1">删除</button></td>';
							}
							dg_html += '</tr>';
						});
						$('.tanceng .ckgldgzz_listhtml_liebiaoxxl').html(dg_html);
					}
					if(zp_list.list.length == 0) {
						$('.tanceng .ckglzpzz_zhengpizzlist_htmlxxl').html('');
						var err_zp = '';
						err_zp += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
						$('.tanceng .ckglzpzz_zhengpilist_errhtmlxxl').html(err_zp);
					} else {
						$('.tanceng .ckglzpzz_zhengpilist_errhtmlxxl').html('');
						$.each(zp_list.list, function(i, v) {
							zp_html += '<tr class="zhengpi_'+i+'"><td>' + Appendzero(i + 1) + '</td>';
							zp_html += '<td>' + likNullData(formatSeconds(parseInt(v.package_time)*60)) + '</td>';
							zp_html += '<td>' + likNullData(v.package_num) + '</td>';
							if(v.status == 1) {
								zp_html += '<td><span class="c_c">未开始</span></td>';
							} else if(v.status == 2) {
								zp_html += '<td><span class="c_y">进行中</span></td>';
							} else {
								zp_html += '<td><span class="c_g">已完成</span></td>';
							}

							zp_html += '<td>' + likNullData(v.begin_time) + '</td>';
							if(v.status==3){
								zp_html += '<td>' + likNullData(v.finish_time) + '</td>';
							}else{
								zp_html += '<td>-</td>';
							}
							
							if(v.pause_num == 0) {
								zp_html += '<td><span class="crk_pause f_color">0</span></td>';
								zp_html += '<td>-</td>';
							} else {
								zp_html += '<td class="val_dialogTop ckglzz_zhanting_btnxxl" name="crk_ckgl_timePause" uid="'+v.id+'" style="cursor:pointer;"><span class="crk_pause f_color">' + likNullData(v.pause_num) + '</span></td>';
								zp_html += '<td>' + likNullData(v.pause_time) + '</td>';
							}

							zp_html += '<td>' + likNullData(v.package_name) + '</td>';
							if(v.status == 1) {
								zp_html += '<td>-</td>';
							} else if(v.status == 2) {
								zp_html += '<td> 开始时间：<span class="c_3" style="font-weight: bold;">'+likNullData(v.begin_time.substr(0,16))+'</span><br>结束时间：<span class="c_3" style="font-weight: bold;">'+likNullData(v.end_time.substr(0,16))+'</span></td>';
							} else {
								if(parseInt(v.elapsed_time) > parseInt(v.package_time)) {
									zp_html += '<td><span class="c_r">延时完成： <i class="c_9">耗时' + likNullData(v.elapsed_time) + '分钟</i></span></td>';
								} else {
									zp_html += '<td><span class="c_g">按时完成： <i class="c_9">耗时' + likNullData(v.elapsed_time) + '分钟</i></span></td>';
								}
							}
							if(v.status == 3) {
								zp_html += '<td><button class="but_mix but_grey1">开始</button><button class="but_mix but_grey1">暂停</button><button class="but_mix but_grey1">完成</button></td>';
								zp_html += '<td><button class="but_mix but_grey1">编辑</button><button class="but_mix but_grey1">删除</button></td>';
							} else if(v.status == 1) {
								zp_html += '<td><button class="but_mix but_blue val_dialogTop ckglzzsp_kaishi_btnxxl" kssj="'+(parseInt(v.package_time))+'" trname="zhengpi_'+i+'" uid="'+v.id+'" name="crk_ckgl_start">开始</button><button class="but_mix but_grey1">暂停</button><button class="but_mix but_grey1">完成</button></td>';
								zp_html += '<td><button class="but_mix but_exit val_dialogTop ckglzz_biajizpzz_listxxl" dqsl="'+v.package_num+'" uid="'+v.id+'" trname="zhengpi_'+i+'" name="crk_ckgl_zpzz">编辑</button><button class="but_mix but_r val_dialogTop ckgl_zzdelete_listxxl" uid="'+v.id+'" trname="zhengpi_'+i+'" name="crk_ckgl_delete">删除</button></td>';
							} else {
								if(v.pause_num>=1){
									zp_html += '<td><button class="but_mix but_blue val_dialogTop ckglzzsp_kaishitwo_btnxxl" uid="'+v.id+'" name="crk_ckgl_start">开始</button><button class="but_mix but_grey1" uid="'+v.id+'" trname="zhengpi_'+i+'">暂停</button><button class="but_mix but_green val_dialogTop zjzz_wancheng_okbtn_xxl" uid="'+v.id+'" trname="zhengpi_'+i+'" name="crk_ckgl_end">完成</button></td>';
								}else{
									zp_html += '<td><button class="but_mix but_grey1">开始</button><button class="but_mix but_red val_dialogTop ckglzjzz_zhanting_btnxxl" uid="'+v.id+'" trname="zhengpi_'+i+'" name="crk_ckgl_reasonPause">暂停</button><button class="but_mix but_green val_dialogTop zjzz_wancheng_okbtn_xxl" uid="'+v.id+'" trname="zhengpi_'+i+'" name="crk_ckgl_end">完成</button></td>';
								}
								
								zp_html += '<td><button class="but_mix but_grey1">编辑</button><button class="but_mix but_grey1">删除</button></td>';
							}
							zp_html += '</tr>';
						});
						$('.tanceng .ckglzpzz_zhengpizzlist_htmlxxl').html(zp_html);
					}

				//}

			}
		},
		error: function(e) {
			$('.tanceng .ckgldgzz_listhtml_liebiaoxxl').html('');
			var errliebiao = '';
			errliebiao += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
			$('.tanceng .ckgldgzz_listliebiao_showerrhtml_xxl').html(errliebiao);
			$('.tanceng .ckglzpzz_zhengpizzlist_htmlxxl').html('');
			var err_zp = '';
			err_zp += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
			$('.tanceng .ckglzpzz_zhengpilist_errhtmlxxl').html(err_zp);
		}
	});
}
//暂停列表展示
$('.tanceng .ckglzz_zhanting_btnxxl').die('click').live('click',function(){
	zz_zhanting_data.id = $(this).attr('uid');
	zz_zhanting_ajax();
})
var zz_zhanting_data = {
	token:token,
	id:''
}
function zz_zhanting_ajax(){
	$.ajax({
		type:"get",
		url:SERVER_URL+"pz-package/pausedetail",
		data:zz_zhanting_data,
		dataType:'json',
		success:function(data){
			if(data.code!=0){
				console.log(data);
				$('.tanceng .zz_zhanting_listhtml_xxl').html('');
					var zt_err = '';
					zt_err +='<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
					$('.tanceng .zz_zhanting_errhtml_xxl').html(zt_err);
			}else{
				console.log(data);
				var zt_list = data['dataList'],zt_html = '';
				if(zt_list.length==0){
					$('.tanceng .zz_zhanting_listhtml_xxl').html('');
					var zt_err = '';
					zt_err +='<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
					$('.tanceng .zz_zhanting_errhtml_xxl').html(zt_err);
				}else{
					$('.tanceng .zz_zhanting_errhtml_xxl').html('');
					$.each(zt_list, function(i,v) {
						zt_html +='<tr><td>'+Appendzero(i+1)+'</td>';
                        zt_html +='<td>'+likNullData(v.pause_time)+'</td>';
                        zt_html +='<td>'+likNullData(v.total_time)+'</td>';
                        zt_html +='<td>'+likNullData(v.reason)+'</td>';
                        zt_html +='</tr>';
					});
					$('.tanceng .zz_zhanting_listhtml_xxl').html(zt_html);
				}
			}
		},
		error:function(e){
			console.log(e);
			$('.tanceng .zz_zhanting_listhtml_xxl').html('');
					var zt_err = '';
					zt_err +='<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
					$('.tanceng .zz_zhanting_errhtml_xxl').html(zt_err);
		}
	});
}
//组装列表编辑
var zzlist_bianji_data = {
	token:token,
	id:'',
	package_time:'',
	package_name:'',
	package_num:''
}
function zzlist_bianji_ajax(){
	$.ajax({
		type:"post",
		url:SERVER_URL+"pz-package/update",
		data:zzlist_bianji_data,
		dataType:'json',
		success:function(data){
			if(data.code!=0){
				console.log(data)
			}else{
				console.log(data);
				ckgl_sczzlist_ajax();
				ckglpzspzj_zuzhuang_ajax();
			}
		},
		error:function(e){
			console.log(e)
		}
	});
}
$('.tanceng .ckglzz_biajitime_listxxl').die('click').live('click',function(){
	$('.tanceng .ckgl_dangge_titlezzsl_xxl').html($(this).attr('zzsl'));
	$('.tanceng .dangezzsl_gyifenpeisl_valxxl').html($(this).attr('yfpsl'));
	$('.tanceng .ckglpzspzj_dangezz_quedingbtn_xxl').attr('uid', $(this).attr('uid'));
	//$('.tanceng .ckgldgzz_renyuan_showxxl').html('').removeAttr('uid');
	$('.tanceng .ckglpzspzj_dangezz_quedingbtn_xxl').attr('typeid','0');
	//$('.tanceng .ckglpzspzj_dangezz_quedingbtn_xxl').removeAttr('disabled').html('分配');
	//$('.ckglpzspzz_dgzz_xzryxxl').parent().css('display', 'block');
	zz_bianji_data.id = $(this).attr('uid');
	zz_bianji_ajax();
})

$('.tanceng .ckgl_zzdelete_listxxl').die('click').live('click',function(){
	$('.tanceng .ckgl_dfpckshanchu_btnxxl').attr({'typeid':'1','uid':$(this).attr('uid')});

})
var ckgl_zzlist_shanchudata = {
	token:token,
	id:''
}
function ckgl_zzlist_shanchuajax(){
	$.ajax({
		type:"get",
		url:SERVER_URL+"pz-package/del",
		data:ckgl_zzlist_shanchudata,
		dataType:'json',
		success:function(data){
			if(data.code!=0){
				console.log(data)
			}else{
				console.log(data);
				ckgl_sczzlist_ajax();
				ckglpzspzj_zuzhuang_ajax();
			}
		},
		error:function(e){
			console.log(e)
		}
	});
}
//组装开始计时按钮
var zz_start_data = {
	token:token,
	id:''
	
}
function zz_start_ajax(){
	$.ajax({
		type:"get",
		url:SERVER_URL+"pz-package/begin",
		data:zz_start_data,
		dataType:'json',
		success:function(data){
			if(data.code!=0){
				console.log(data)
			}else{
				console.log(data);
				ckgl_sczzlist_ajax()
			}
		},
		error:function(e){
			console.log(e)
		}
	});
}
function zz_starttwo_ajax(){
	$.ajax({
		type:"get",
		url:SERVER_URL+"pz-package/begin",
		data:zz_start_data,
		dataType:'json',
		success:function(data){
			if(data.code!=0){
				console.log(data)
			}else{
				console.log(data);
			}
		},
		error:function(e){
			console.log(e)
		}
	});
}

$('.ckglzzsp_kaishi_btnxxl').die('click').live('click',function(){
		$('.zz_startkaishi_quedbtn_xxl').attr({'uid':$(this).attr('uid'),'typeid':'0','trname':$(this).attr('trname')});
})

$('.tanceng .zz_startkaishi_quedbtn_xxl').die('click').live('click',function(){
	if($(this).attr('typeid')==0){
		zz_start_data.id = $(this).attr('uid');
		zz_start_ajax();
	}else{
		zz_start_data.id = $(this).attr('uid');
		zz_starttwo_ajax();
	}
	
	$(this).parent().parent().parent().remove();
		var num = $('.tanceng').children(".dialog_box").length;
		if(num < 1) {
			$(".tanceng").hide();
	}
})
$('.tanceng .ckglzzsp_kaishitwo_btnxxl').die('click').live('click',function(){
	$('.tanceng .zz_startkaishi_quedbtn_xxl').attr({'uid':$(this).attr('uid'),'typeid':'1'});
	$(this).attr('disabled','disabled').removeClass('but_blue val_dialogTop').addClass('but_grey1');
})
//暂停按钮
$('.tanceng .ckglzjzz_zhanting_btnxxl').die('click').live('click',function(){
	$('.tanceng .ckglzjzz_ztqueding_btnxxl').attr('uid',$(this).attr('uid'));
})
var zjzz_zhanting_data = {
	token:token,
	pid:'',
	reason:''
}
function zjzz_zhanting_ajax(){
	$.ajax({
		type:"get",
		url:SERVER_URL+"pz-package/pause",
		data:zjzz_zhanting_data,
		dataType:'json',
		success:function(data){
			if(data.code!=0){
				console.log(data)
			}else{
				console.log(data);
				ckgl_sczzlist_ajax();
			}
		},
		error:function(e){
			console.log(e)
		}
	});
}
$('.tanceng .ckglzjzz_ztqueding_btnxxl').die('click').live('click',function(){
	zjzz_zhanting_data.pid = $(this).attr('uid');
	if($('.tanceng .ckglzjzz_zhanting_yuying_valxxl').val()==''||$('.tanceng .ckglzjzz_zhanting_yuying_valxxl').val()=='请输入暂停原因'){
		alert('请输入暂停原因');
		$('.tanceng .ckglzjzz_zhanting_yuying_valxxl').focus();
		return false;
	}
	zjzz_zhanting_data.reason = $('.tanceng .ckglzjzz_zhanting_yuying_valxxl').val();
	zjzz_zhanting_ajax();
	$(this).parent().parent().parent().remove();
		var num = $('.tanceng').children(".dialog_box").length;
		if(num < 1) {
			$(".tanceng").hide();
	}
})
//完成
$('.tanceng .zjzz_wancheng_okbtn_xxl').die('click').live('click',function(){
	$('.tanceng .ckglzjzz_zzwancheng_queding_btnxxl').attr('uid',$(this).attr('uid'));
})
var zjzz_wancheng_data = {
	token:token,
	id:''
}
function zjzz_wancheng_ajax(){
	$.ajax({
		type:"get",
		url:SERVER_URL+"pz-package/finish",
		data:zjzz_wancheng_data,
		dataType:'json',
		success:function(data){
			if(data.code!=0){
				console.log(data);
				alert('完成失败,请重新点击完成');
			}else{
				console.log(data);
				ckgl_sczzlist_ajax();
				ckgl_pzspzj_ajax();
			}
		},
		error:function(e){
			console.log(e)
		}
	});
}
$('.tanceng .ckglzjzz_zzwancheng_queding_btnxxl').die('click').live('click',function(){
	zjzz_wancheng_data.id = $(this).attr('uid');
	zjzz_wancheng_ajax();
	ckgl_pzspzj_ajax();
	$(this).parent().parent().parent().remove();
		var num = $('.tanceng').children(".dialog_box").length;
		if(num < 1) {
			$(".tanceng").hide();
	}
})

//出库单替换序列号、SN码
$('.ckdan_xuliehaotihuan_btnxxl').die().live('click',function(){
	$('.tanceng .ckdtihuan_saomiaosousuo_valxxl').val('').focus();
	//$('.tanceng .ckd_tihuanboxshow_tabdaxiao_xxl').removeClass('dialog_content_big').removeAttr('style').addClass('dialog_content_normal');
})
var ckd_tihuansn_listdata = {
	token:token,
	code_sn:''
}
var ajax;
function ckd_tihuansn_listajax(){
	ajax = $.ajax({
		type:"get",
		url:SERVER_URL+"stock-out/replacelist",
		dataType:'json',
		data:ckd_tihuansn_listdata,
		success:function(data){
			if(data.code!=0){
				console.log(data);
				$('.tanceng .ckd_tihuangxlhmainbox_xxl').addClass('none');
				$('.tanceng .ckd_tihuanxlhsn_errorhtml_xxl').removeClass('none');
				$('.ckd_tihuanboxshow_tabdaxiao_xxl').addClass('dialog_content_big');
			}else{
				console.log(data)
				var list= data['data'],listhtml='';
				if(list.length==0){
					$('.tanceng .ckd_tihuangxlhmainbox_xxl').addClass('none');
					$('.tanceng .ckd_tihuanxlhsn_errorhtml_xxl').children().children('p').html('抱歉，没有找到相关内容！');
					$('.tanceng .ckd_tihuanxlhsn_errorhtml_xxl').removeClass('none');
					$('.ckd_tihuanboxshow_tabdaxiao_xxl').removeClass('dialog_content_big');
					$('.cru_search_div .t_textinput').css('width','80%');
					$('.cru_search_div .t_textinput .t_left').css('width','22%');
					$('.cru_search_div .t_textinput .t_right').css({'width':'64%','margin-left':'25%'});
				}else{
					$('.tanceng .ckd_tihuangxlhmainbox_xxl').removeClass('none');
					$('.tanceng .ckd_tihuanxlhsn_errorhtml_xxl').addClass('none');
					$('.ckd_tihuanboxshow_tabdaxiao_xxl').addClass('dialog_content_big');
					$('.cru_search_div .t_textinput').css('width','55%');
					$('.cru_search_div .t_textinput .t_left').css('width','15%');
					$('.cru_search_div .t_textinput .t_left .t_right').css({'width':'50%','margin-left':'17%'});
					$.each(list, function(i,v) {
						listhtml +='<tr>';
                        listhtml +='<td>'+Appendzero(i+1)+'</td>';
                        listhtml +='<td>'+likNullData(v.output_time)+'</td>';
                        listhtml +='<td>'+likNullData(v.create_time)+'</td>';               
                        listhtml +='<td>'+likNullData(v.number)+'</td>';                
                        listhtml +='<td>'+likNullData(v.related_receipts_no)+'</td>'; 
                        if(v.output_type==1){
                        	listhtml +='<td>销售出库</td>';  
                        }else if(v.output_type==2){
                        	listhtml +='<td>采购退货</td>';
                        }else if(v.output_type==3){
                        	listhtml +='<td>借出出库</td>';
                        }else if(v.output_type==4){
                        	listhtml +='<td>借入归还</td>';
                        }else if(v.output_type==5){
                        	listhtml +='<td>销售换货</td>';
                        }else{
                        	listhtml +='<td>采购换货</td>';
                        }
                        if(v.output_way==1){
                        	listhtml +='<td>商品出库</td>';
                        }else if(v.output_way==2){
                        	listhtml +='<td>整机出库</td>';
                        }else{
                        	listhtml +='<td>组装出库</td>';
                        }
                        if(v.logistics_way==1){
                        	listhtml +='<td>快递</td>'; 
                        }else if(v.logistics_way==2){
                        	listhtml +='<td>陆运</td>';
                        }else if(v.logistics_way==3){
                        	listhtml +='<td>空运</td>';
                        }else if(v.logistics_way==4){
                        	listhtml +='<td>平邮</td>';
                        }else{
                        	listhtml +='<td>海运</td>';
                        }
                        if(v.is_package_freight==1){
                        	listhtml +='<td>包运费</td>';  
                        }else{
                        	listhtml +='<td>不包运费</td>';  
                        }
                        listhtml +='<td>'+likNullData(v.warehouse_name)+'</td>';              
                        listhtml +='<td>'+likNullData(v.output_num)+'</td>';
                        if(v.output_way==3){
                        	listhtml +='<td>-</td>';                
                        	listhtml +='<td>'+likNullData(v.package_num)+'</td>';    
                        }else{
                        	listhtml +='<td>'+likNullData(v.distribution_num)+'</td>';                
                        	listhtml +='<td>-</td>';  
                        }
                                      
                        listhtml +='<td>'+likNullData(v.shipments_num)+'</td>';                
                        if(v.output_status==1){
                        	listhtml +='<td class="c_r">待出库</td>';  
                        }else if(v.output_status==2){
                        	listhtml +='<td class="c_y">部分出库</td>';  
                        }else{
                        	listhtml +='<td class="c_g">完成出库</td>';  
                        }
                        if(v.shipments_status==1){
                        	listhtml +='<td class="c_r">待发货</td>'; 
                        }else if(v.shipments_status==2){
                        	listhtml +='<td class="c_y">部分发货</td>'; 
                        }else{
                        	listhtml +='<td class="c_g">完成发货</td>'; 
                        }
                                       
                        listhtml +='<td>'+likNullData(v.output_name)+'</td>';               
                        listhtml +='<td><button class="but_look but_mix val_dialogTop ckd_thxlhsn_chakan_btnxxl" name="cru_search_look" uid="'+v.id+'" sn="'+data.code_sn+'">查看</button></td>';                
                        listhtml +='</tr>';            
					});
					$('.tanceng .ckd_tihuanxlhsn_listhtml_xxl').html(listhtml)
				}
			}
		},
		error:function(e){
			console.log(e)
			$('.tanceng .ckd_tihuangxlhmainbox_xxl').addClass('none');
			$('.tanceng .ckd_tihuanxlhsn_errorhtml_xxl').removeClass('none')
			ajax.abort();//丢弃原有ajax  
			ckd_tihuansn_listajax();
		}
	});
}
$('.tanceng .ckdtihuan_saomiaosousuo_valxxl').die().live('keydown',function(e){
	e = e || event;
	var keyCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
	if(keyCode == 13) {
		e.preventDefault();
		if($(this).val()==''){
			return false;
		}else{
			//console.log($(this).val())
			ckd_tihuansn_listdata.code_sn = $(this).val();
			ckd_tihuansn_listajax();
			$(this).val('')
		}
		return false;	
	}
})
var ckdsntihuan_chakna_data = {
	token:token,
	code_sn:'',
	output_id:''
}
function ckdsntihuan_chakan_ajax(){
  ajax =$.ajax({
		type:"get",
		url:SERVER_URL+"stock-out/replacedetail",
		dataType:'json',
		data:ckdsntihuan_chakna_data,
		success:function(data){
			if(data.code!=0){
				console.log(data)
				$('.tanceng .ckd_tihuanchakan_listhtml_xxl').html('')
				$('.tanceng .ckd_tihuanchakan_errorhtml_xxl').html('<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>');
			}else{
				console.log(data);
				
				var plist = data['data'],phtml='';
				
				if(plist.productDetail.product_type==1){
					$('.tanceng .ckd_tihuanchakan_shangpinxinxi_xxl').html('商品编号：<span>'+likNullData(plist.productDetail.code_sn)+'</span>商品：<span>'+likNullData(plist.productDetail.product_name)+'/'+likNullData(plist.productDetail.attr_name)+'</span>');
					$('.tanceng .ckd_chukuleixing_xxl').html('替换序列号');
					$('.tanceng .ckdtihuan_thmingch_showxxl').html('序列号');
				}else{
					$('.tanceng .ckd_chukuleixing_xxl').html('替换SN码');
					$('.tanceng .ckdtihuan_thmingch_showxxl').html('SN码');
					$('.tanceng .ckd_tihuanchakan_shangpinxinxi_xxl').html('整机商品编号：<span>'+likNullData(plist.productDetail.code_sn)+'</span>整机商品：<span>'+likNullData(plist.productDetail.product_name)+'/'+likNullData(plist.productDetail.attr_name)+'</span>');
				}
				if(plist.dataList.length==0){
					$('.tanceng .ckd_tihuanchakan_listhtml_xxl').html('')
					$('.tanceng .ckd_tihuanchakan_errorhtml_xxl').html('<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>');
				}else{
					$('.tanceng .ckd_tihuanchakan_errorhtml_xxl').html('');
					$.each(plist.dataList, function(i,v) {
						phtml +='<tr>';
                        phtml +='<td>'+Appendzero(i+1)+'</td>';                    
                        phtml +='<td>'+likNullData(v.serial_number)+'</td>';                    
                        phtml +='<td>'+likNullData(v.warehouse_name)+'</td>';                    
                        phtml +='<td>'+likNullData(v.output_name)+'</td>';                    
                        phtml +='<td>'+likNullData(v.create_time)+'</td>';                    
                        phtml +='<td><button class="but_look but_mix val_dialogTop ckdtihuansn_tihuan_btnxxl" name="cru_search_look_replace" uid="'+v.id+'">替换</button></td>';                    
                        phtml +='</tr>';               
					});
					$('.tanceng .ckd_tihuanchakan_listhtml_xxl').html(phtml);
				}
			}
		},
		error:function(e){
			console.log(e)
			$('.tanceng .ckd_tihuanchakan_listhtml_xxl').html('')
			$('.tanceng .ckd_tihuanchakan_errorhtml_xxl').html('<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>');
			ajax.abort();//丢弃原有ajax
			ckdsntihuan_chakan_ajax();
		}
	});
}
$('.tanceng .ckd_thxlhsn_chakan_btnxxl').die().live('click',function(){
	ckdsntihuan_chakna_data.code_sn = $(this).attr('sn');
	ckdsntihuan_chakna_data.output_id = $(this).attr('uid');
	ckdsntihuan_chakan_ajax();
})
$('.tanceng .ckdtihuansn_tihuan_btnxxl').die().live('click',function(){
	$('.tanceng .ckd_quedingtihuan_btnxxl').attr('uid',$(this).attr('uid'));
	$('.tanceng .crk_quedingtihuan_inputval_xxl').val('').focus();
})
//$('.tanceng .crk_quedingtihuan_inputval_xxl').die().live('keydown',function(e){
//	e = e || event;
//	var keyCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
//	if(keyCode == 13) {
//		e.preventDefault();
//		if($(this).val()==''){
//			return false;
//		}else{
//			
//		}
//		return false;	
//	}
//})
var ckd_quedingtihuan_data = {
	token:token,
	code_sn:'',
	id:''
}
function ckd_quedingtihuan_ajax(){
	$.ajax({
		type:"get",
		url:SERVER_URL+"stock-out/replace",
		dataType:'json',
		data:ckd_quedingtihuan_data,
		success:function(data){
			if(data.code!=0){
				console.log(data)
				$('.tanceng .crk_quedingtihuan_inputval_xxl').val('').focus();
				alert(data.msg)
			}else{
				console.log(data)
				alert(data.msg)
				ckdsntihuan_chakan_ajax();
				$('.tanceng .ckd_quedingtihuan_btnxxl').parents('.dialog_box[name="cru_search_look_replace"]').remove();
			}
		},
		error:function(e){
			console.log(e)
			$('.tanceng .crk_quedingtihuan_inputval_xxl').val('').focus();
		}
	});
}
$('.tanceng .ckd_quedingtihuan_btnxxl').die().live('click',function(){
	if($('.tanceng .crk_quedingtihuan_inputval_xxl').val()==''||$('.tanceng .crk_quedingtihuan_inputval_xxl').val()=='请扫描搜索SN码/序列号'){
		alert('请扫描搜索SN码/序列号');
		$('.tanceng .crk_quedingtihuan_inputval_xxl').val('').focus();
		return false;
	}else{
		ckd_quedingtihuan_data.id = $(this).attr('uid');
		ckd_quedingtihuan_data.code_sn = $('.tanceng .crk_quedingtihuan_inputval_xxl').val();
		ckd_quedingtihuan_ajax();
	}
	
})
//设置分配出库人companyid
var ckgl_shezhichukufpr_data = {
	token:token,
	company_id:companyid,
	category:'2',
	checker:'',
	up:'1'
}
function ckgl_shezhickfpr_ajax(){
	$.ajax({
		type:"post",
		url:SERVER_URL+"system-warehouse/edit",
		dataType:'json',
		data:ckgl_shezhichukufpr_data,
		success:function(data){
			if(data.code!=0){
				console.log(data)
			}else{
				console.log(data);
				alert(data.msg)
				$('.tanceng .ckgl_shezfpckr_queding_btnxxl').parents('.dialog_box').remove();
			}
		},
		error:function(e){
			console.log(e)
		}
	});
}
$('.tanceng .ckgl_shezfpckr_queding_btnxxl').die().live('click',function(){
	if($('.tanceng li.ckgl_shezhickrlihtml_xxl').html()==''||$('.tanceng li.ckgl_shezhickrlihtml_xxl').attr('uid')==undefined){
		alert('请选择分配出库人');
		return false;
	}
	ckgl_shezhichukufpr_data.checker = $('.tanceng .ckgl_shezhickrlihtml_xxl').attr('uid');
	ckgl_shezhickfpr_ajax();
})













