var token, tokenid,username;
token = Admin.get_token();
tokenid = Admin.get_uid();
username = window.localStorage.getItem('username');
//SERVER_URL = 'http://192.168.0.167:9091/';
//tokenid = 2;//对比自己的id审批意见-我
//username = '邢啸亮';
//SERVER_URL = 'http://192.168.0.167:9010/';
//token = '2017052516045457073-1-1';
var loginUserInfo = JSON.parse(localStorage.getItem('user_info'));
department_id = loginUserInfo['department_id'];
department_name=loginUserInfo['department_name'];
var zuofei='purchase-contract/invalid',shanchu='purchase-contract/del',cghtdaochu='/caigou/daochu';
//if(loginUserInfo['company_admin'] != 1){
//	if(loginUserInfo.powerUrls.length==0){
//		$('.cght_zf_btn').hide();
//		
//	}else{
//		var arr = loginUserInfo.powerUrls;//
//		if($.inArray(zuofei, arr)!=-1){
//			$('.cght_zf_btn').show();
//		}else{
//			$('.cght_zf_btn').hide();
//		}
//		
//		
//	}
//}
if(loginUserInfo['company_admin'] != 1){
						if(loginUserInfo.powerUrls.length==0){
							$('.daochu_cg').hide();
							
						}else{
							var arr = loginUserInfo.powerUrls;//
							if($.inArray(cghtdaochu, arr)!=-1){
								$('.daochu_cg').show();
							}else{
								$('.daochu_cg').hide();
							}
							
							
						}
					}

var cght_data_xxl = {
		token: token,
		thetype: '1', //1我发起的 2待我审批 3抄送我的
		keywords: '', //关键词（合同编号、销售报价单编号、客户名称、合同名称）
		page: '1',
		num: '10',
		status: '', //1审批中2未通过3已通过
		flow: '', //审核人
		uid: '', //创建人
		dept_id: '', //负责部门
		owner_id: '', //负责人
		is_invalid: '', //是否作废：0正常1作废
		created_at: '', //创建日期：1升序2降序
		order_status: '', //1升序2降序
		start_time:'',
		end_time:'',
		is_draft:'0'
	}
if ($('#left_button_60').attr('fromnotice') == 1) { // 当前是从消息过来的
    var curId = $('#left_button_60').attr('detailid');
    var secondName = $('#left_button_60').attr('secondmenu'); 
    $.each($('.tabtitle li'), function (i, v) {
        if (secondName == $.trim($('.tabtitle li').eq(i).text())) {
            //$('.tabtitle li').removeClass('tabhover').eq(i).addClass('tabhover');
            cght_data_xxl = {		// 初始化参数
                token: token,
                thetype: 2,
                keywords: '', //关键词（合同编号、销售报价单编号、客户名称、合同名称）
				page: '1',
				num: '10',
				status: '', //1审批中2未通过3已通过
				flow: '', //审核人
				uid: '', //创建人
				dept_id: '', //负责部门
				owner_id: '', //负责人
				is_invalid: '', //是否作废：0正常1作废
				created_at: '', 
                ids:curId
            };
            setTimeout(function(){
                $('.tabtitle li').eq(i).trigger('click'); // 触发相应子模块事件
                $('#left_button_60').attr({	 // 清空按钮的属性
                    'fromnotice': '',
                    'detailid': '',
                    'secondmenu': '',
                    'totable': ''
                });
            },100);
        }
    });
} else { // 当前不是从消息过来的，正常调取整个列表
    cght_list_ajax_xxl();
}

	// 定义查看项
var cght_xuanzckx = [{
		'index': null,
		'field': '审批人'
	}, {
		'index': null,
		'field': '采购报价单编号'
	},{
		'index': null,
		'field': '采购订单编号'
	},{
		'index': null,
		'field': '创建日期'
	}
];
	//切换列表
$.each($('.tabtitle li.cg_qiehuan_list'), function(i, v) {
	$(this).die().live('click', function() {
		if($(this).attr('thetype')=='1'){
			cght_xuanzckx = [{
		'index': null,
		'field': '审批人'
	}, {
		'index': null,
		'field': '采购报价单编号'
	},{
		'index': null,
		'field': '采购订单编号'
	},{
		'index': null,
		'field': '创建日期'
	}
];
			$('.cght_th_tabbjdxxl').html('采购报价单编号');
			$('.cght_th_tabddxxl').html('采购订单编号<i class="price_icon"></i>')
			$('.cg_cjr_val_xxl').attr('readonly','readonly').val('').nextAll().hide().parent().css('background','#f5f5f5')
			$('.cght_gjss_fuzbnulxxl').hide();
			$('.cght_gjss_furenulxxl ').hide();
		}else{
			$('.cght_gjss_fuzbnulxxl').show();
			$('.cght_gjss_furenulxxl ').show();
			cght_xuanzckx = [{
		'index': null,
		'field': '审批人'
	}, {
		'index': null,
		'field': '负责部门'
	},{
		'index': null,
		'field': '负责人'
	},{
		'index': null,
		'field': '创建日期'
	}
];
			$('.cght_th_tabbjdxxl').html('负责部门');
			$('.cght_th_tabddxxl').html('负责人');
			$('.cg_cjr_val_xxl').removeAttr('readonly').val('创建人').nextAll().show().parent().css('background','')
		}
		$('.cghts_list_html').attr('thetype',$(this).attr('thetype'));
		$('.cght_cleargjss_btnxxl').attr('thetype',$(this).attr('thetype'));
		$('.cght_riqichaxun_btnxxl').attr('thetype',$(this).attr('thetype'));
		//$('.cght_cjrqsjbtn_xxl').attr('thetype',$(this).attr('thetype'));
		cght_data_xxl.thetype = $(this).attr('thetype')
		$('.cght_ssinput_value').val('搜索合同编号/采购报价单编号/供应商名称/合同名称').css('color','rgb(204, 204, 204)');
		cght_data_xxl.keywords='';
		cght_data_xxl.status='';
		cght_data_xxl.dept_id='';
		cght_data_xxl.owner_id='';
		cght_data_xxl.start_time='';
		cght_data_xxl.end_time='';
		cght_list_ajax_xxl()
		$('.price_icon').attr('typeid',$(this).attr('thetype'))
		$('button[name="ht_cght_zkgjss"]').attr('thetype', $(this).attr('thetype'))
	})

});
$('.cght_cleargjss_btnxxl').die().live('click',function(){
	$('.cght_spzt_val_xxl').val('');
	$('.cg_fzbm_val_xxl').val('');
	$('.cg_fzr_val_xxl').val('');
		cght_data_xxl.keywords='';
		cght_data_xxl.start_time='';
		cght_data_xxl.end_time='';
		cght_data_xxl.status='';
		cght_data_xxl.dept_id='';
		cght_data_xxl.owner_id='';
		cght_list_ajax_xxl()
})
//日期搜索
$('.cght_riqichaxun_btnxxl').die().live('click',function(){
	$('.tanceng .cght_riqissqueding_btnxxl').attr('thetype',$(this).attr('thetype'));
})
$('.tanceng .cght_riqissqueding_btnxxl').die().live('click',function(){
	cght_data_xxl.start_time = $('.tanceng .cght_starttime_valxxl').val();
	cght_data_xxl.end_time = $('.tanceng .cght_endtime_valxxl').val();
	cght_data_xxl.thetype = $(this).attr('thetype');
	cght_list_ajax_xxl();
	$('.tanceng').empty().hide();
})
	//补零
function Appendzero(obj) {
	if(obj < 10) return "0" + obj;
	else return obj;
}
function cght_list_ajax_xxl() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "purchase-contract/list",
		data: cght_data_xxl,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg)
			} else {
				console.log(data)
				var cglist = data['datalist'];
				$('.cght_listnum_xxl').html(data.totalcount);
				$('.cght_caogaoxnums_xxl').html(data.count_bak);
				if(cglist.length == 0) {
					$('.cghts_list_html').html('')
					var cght_err = '';
					cght_err += '<div class="no_data_box" ><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
					$('.cghts_errhtml_xxl').html(cght_err);
					$('.cght_fenye_xxl').css('display', 'none')
				} else {
					$('.cghts_errhtml_xxl').html('');
					$('.cght_fenye_xxl').css('display', 'block')
					var cght_listhtmls = '';
					if(data.thetype == 1) {
						$('.cght_th_tabbjdxxl').html('采购报价单编号');
						$('.cght_th_tabddxxl').html('采购订单编号<i class="price_icon" thetype="order_status"></i>')
						$.each(cglist, function(i, v) {
							if(v.is_invalid == 1) {
								cght_listhtmls += '<tr class="grey"><td><span class="voidIcon">作废</span></td>';
								cght_listhtmls += '<td>' + likNullData(v.purchase_sn) + '</td>';
								cght_listhtmls += '<td>' + likNullData(v.supplier_name) + '</td>';
								cght_listhtmls += '<td><span>' + likNullData(v.status_name) + '</span></td>';
								cght_listhtmls += '<td>' + likNullData(v.flow_name) + '</td>';
								if(v.purchase_quote_sn==''||v.purchase_quote_sn==null){
									cght_listhtmls += '<td>-</td>';
								}else{
									cght_listhtmls += '<td class="f_color finance_pay_rent_list r_sidebar_btn cght_cgbjdxq_btnxxl" uid="'+v.quote_id+'" name="bargin_cgbjd_look">' + likNullData(v.purchase_quote_sn) + '</td>';
								}
								
								if(v.purchase_order_sn==''||v.purchase_order_sn==null){
									cght_listhtmls += '<td>-</td>';
								}else{
									cght_listhtmls += '<td class="f_color finance_pay_rent_list r_sidebar_btn cght_cgddxq_btnxxl" name="bargin_cgdd_look" uid="'+v.id+'">' + likNullData(v.purchase_order_sn) + '</td>';
								}
								
								cght_listhtmls += '<td>' + likNullData(v.created_at) + '</td>';
//								cght_listhtmls += '<td>' + likNullData(v.name) + '</td>';
//								if(v.purchase_order_status!=0){
//									cght_listhtmls += '<td>生成采购订单</td>';
//								}else{
//									cght_listhtmls += '<td>-</td>';
//								}
								
//								
//								cght_listhtmls += '<td>' + likNullData(v.uname) + '</td>';
//								cght_listhtmls += '<td>' + likNullData(v.dept_name) + '</td>';
//								cght_listhtmls += '<td>' + likNullData(v.owner_name) + '</td>';
								cght_listhtmls += '<td><button class="but_mix but_look r_sidebar_btn cght_chakan_btn" name="ht_buy_right" uid="' + v.id + '">查看</button></td></tr>';
							} else {
								if(v.status == 1) {
									cght_listhtmls += '<tr><td>' + Appendzero(i + 1) + '</td>';
									cght_listhtmls += '<td>' + likNullData(v.purchase_sn) + '</td>';
									cght_listhtmls += '<td>' + likNullData(v.supplier_name) + '</td>';
									cght_listhtmls += '<td><span class="c_y">' + likNullData(v.status_name) + '</span></td>';
									cght_listhtmls += '<td>' + likNullData(v.flow_name) + '</td>';
//									cght_listhtmls += '<td class="f_color finance_pay_rent_list r_sidebar_btn cght_cgbjdxq_btnxxl" name="bargin_cgbjd_look" uid="'+v.quote_id+'">' + likNullData(v.purchase_quote_sn) + '</td>';
//									cght_listhtmls += '<td class="f_color finance_pay_rent_list r_sidebar_btn cght_cgddxq_btnxxl" name="bargin_cgdd_look" uid="'+v.id+'">' + likNullData(v.purchase_order_sn) + '</td>';
									if(v.purchase_quote_sn==''||v.purchase_quote_sn==null){
									cght_listhtmls += '<td>-</td>';
								}else{
									cght_listhtmls += '<td class="f_color finance_pay_rent_list r_sidebar_btn cght_cgbjdxq_btnxxl" uid="'+v.quote_id+'" name="bargin_cgbjd_look">' + likNullData(v.purchase_quote_sn) + '</td>';
								}
								
								if(v.purchase_order_sn==''||v.purchase_order_sn==null){
									cght_listhtmls += '<td>-</td>';
								}else{
									cght_listhtmls += '<td class="f_color finance_pay_rent_list r_sidebar_btn cght_cgddxq_btnxxl" name="bargin_cgdd_look" uid="'+v.id+'">' + likNullData(v.purchase_order_sn) + '</td>';
								}
									cght_listhtmls += '<td>' + likNullData(v.created_at) + '</td>';
									
//									cght_listhtmls += '<td>' + likNullData(v.name) + '</td>';
//									if(v.purchase_order_status!=0){
//									cght_listhtmls += '<td>生成采购订单</td>';
//								}else{
//									cght_listhtmls += '<td>-</td>';
//								}
//									cght_listhtmls += '<td>' + likNullData(v.uname) + '</td>';
//									cght_listhtmls += '<td>' + likNullData(v.dept_name) + '</td>';
//									cght_listhtmls += '<td>' + likNullData(v.owner_name) + '</td>';
									cght_listhtmls += '<td><button class="but_mix but_look r_sidebar_btn cght_chakan_btn" name="ht_buy_right" uid="' + v.id + '">查看</button><button class="but_mix but_r but_void cght_zf_btn" uid="' + v.id + '">作废</button></td></tr>';
								} else if(v.status == 2) {
									cght_listhtmls += '<tr><td>' + Appendzero(i + 1) + '</td>';
									cght_listhtmls += '<td>' + likNullData(v.purchase_sn) + '</td>';
									cght_listhtmls += '<td>' + likNullData(v.supplier_name) + '</td>';
									cght_listhtmls += '<td><span class="c_r">' + likNullData(v.status_name) + '</span></td>';
									cght_listhtmls += '<td>' + likNullData(v.flow_name) + '</td>';
//									cght_listhtmls += '<td class="f_color finance_pay_rent_list r_sidebar_btn cght_cgbjdxq_btnxxl" name="bargin_cgbjd_look" uid="'+v.quote_id+'">' + likNullData(v.purchase_quote_sn) + '</td>';
//									cght_listhtmls += '<td class="f_color finance_pay_rent_list r_sidebar_btn cght_cgddxq_btnxxl" name="bargin_cgdd_look" uid="'+v.id+'">' + likNullData(v.purchase_order_sn) + '</td>';
									if(v.purchase_quote_sn==''||v.purchase_quote_sn==null){
									cght_listhtmls += '<td>-</td>';
								}else{
									cght_listhtmls += '<td class="f_color finance_pay_rent_list r_sidebar_btn cght_cgbjdxq_btnxxl" uid="'+v.quote_id+'" name="bargin_cgbjd_look">' + likNullData(v.purchase_quote_sn) + '</td>';
								}
								
								if(v.purchase_order_sn==''||v.purchase_order_sn==null){
									cght_listhtmls += '<td>-</td>';
								}else{
									cght_listhtmls += '<td class="f_color finance_pay_rent_list r_sidebar_btn cght_cgddxq_btnxxl" name="bargin_cgdd_look" uid="'+v.id+'">' + likNullData(v.purchase_order_sn) + '</td>';
								}
									cght_listhtmls += '<td>' + likNullData(v.created_at) + '</td>';
									
//									cght_listhtmls += '<td>' + likNullData(v.name) + '</td>';
//									if(v.purchase_order_status!=0){
//									cght_listhtmls += '<td>生成采购订单</td>';
//								}else{
//									cght_listhtmls += '<td>-</td>';
//								}
//									cght_listhtmls += '<td>' + likNullData(v.uname) + '</td>';
//									cght_listhtmls += '<td>' + likNullData(v.dept_name) + '</td>';
//									cght_listhtmls += '<td>' + likNullData(v.owner_name) + '</td>';
									cght_listhtmls += '<td><button class="but_mix but_look r_sidebar_btn cght_chakan_btn" name="ht_buy_right" uid="' + v.id + '">查看</button><button class="but_mix but_exit val_dialog cght_bj_btn" name="contact_buy_exit" uid="' + v.id + '">编辑</button><button class="but_mix but_r but_void cght_zf_btn" uid="' + v.id + '">作废</button></td></tr>';
								} else {
									cght_listhtmls += '<tr><td>' + Appendzero(i + 1) + '</td>';
									cght_listhtmls += '<td>' + likNullData(v.purchase_sn) + '</td>';
									cght_listhtmls += '<td>' + likNullData(v.supplier_name) + '</td>';
									cght_listhtmls += '<td><span class="c_g">' + likNullData(v.status_name) + '</span></td>';
									cght_listhtmls += '<td>' + likNullData(v.flow_name) + '</td>';
//									cght_listhtmls += '<td class="f_color finance_pay_rent_list r_sidebar_btn cght_cgbjdxq_btnxxl" name="bargin_cgbjd_look" uid="'+v.quote_id+'">' + likNullData(v.purchase_quote_sn) + '</td>';
//									cght_listhtmls += '<td class="f_color finance_pay_rent_list r_sidebar_btn cght_cgddxq_btnxxl" name="bargin_cgdd_look" uid="'+v.id+'">' + likNullData(v.purchase_order_sn) + '</td>';
									if(v.purchase_quote_sn==''||v.purchase_quote_sn==null){
									cght_listhtmls += '<td>-</td>';
								}else{
									cght_listhtmls += '<td class="f_color finance_pay_rent_list r_sidebar_btn cght_cgbjdxq_btnxxl" uid="'+v.quote_id+'" name="bargin_cgbjd_look">' + likNullData(v.purchase_quote_sn) + '</td>';
								}
								
								if(v.purchase_order_sn==''||v.purchase_order_sn==null){
									cght_listhtmls += '<td>-</td>';
								}else{
									cght_listhtmls += '<td class="f_color finance_pay_rent_list r_sidebar_btn cght_cgddxq_btnxxl" name="bargin_cgdd_look" uid="'+v.id+'">' + likNullData(v.purchase_order_sn) + '</td>';
								}
									cght_listhtmls += '<td>' + likNullData(v.created_at) + '</td>';
									
//									cght_listhtmls += '<td>' + likNullData(v.name) + '</td>';
//									if(v.purchase_order_status!=0){
//									cght_listhtmls += '<td>生成采购订单</td>';
//								}else{
//									cght_listhtmls += '<td>-</td>';
//								}
//									cght_listhtmls += '<td>' + likNullData(v.uname) + '</td>';
//									cght_listhtmls += '<td>' + likNullData(v.dept_name) + '</td>';
//									cght_listhtmls += '<td>' + likNullData(v.owner_name) + '</td>';
									cght_listhtmls += '<td><button class="but_mix but_look r_sidebar_btn cght_chakan_btn" name="ht_buy_right" uid="' + v.id + '">查看</button></td></tr>';
								}
							}

						});
					} else if(data.thetype == 2) {
						$('.cght_th_tabbjdxxl').html('负责部门');
						$('.cght_th_tabddxxl').html('负责人');
						$.each(cglist, function(i, v) {
							if(v.is_invalid == 1) {
								cght_listhtmls += '<tr class="grey"><td><span class="voidIcon">作废</span></td>';
								cght_listhtmls += '<td>' + likNullData(v.purchase_sn) + '</td>';
								cght_listhtmls += '<td>' + likNullData(v.supplier_name) + '</td>';
								cght_listhtmls += '<td><span>' + likNullData(v.status_name) + '</span></td>';
								cght_listhtmls += '<td>' + likNullData(v.flow_name) + '</td>';
								
//								cght_listhtmls += '<td>' + likNullData(v.purchase_order_sn) + '</td>';
//								cght_listhtmls += '<td>' + likNullData(v.purchase_quote_sn) + '</td>';
//								cght_listhtmls += '<td>' + likNullData(v.name) + '</td>';
//								if(v.purchase_order_status!=0){
//									cght_listhtmls += '<td>生成采购订单</td>';
//								}else{
//									cght_listhtmls += '<td>-</td>';
//								}
								cght_listhtmls += '<td>' + likNullData(v.dept_name) + '</td>';
								cght_listhtmls += '<td>' + likNullData(v.owner_name) + '</td>';
								cght_listhtmls += '<td>' + likNullData(v.created_at) + '</td>';
								//cght_listhtmls += '<td>' + likNullData(v.uname) + '</td>';
								
								cght_listhtmls += '<td><button class="but_mix but_look r_sidebar_btn dwsp_cg_ckbtn_xxl" name="ht_buy_sqright" uid="' + v.id + '">查看</button><button class="but_mix but_grey1 r_sidebar_btn dwsp_cg_sp_btn_xxl" uid="' + v.id + '">审批</button></td></tr>';
							} else {
								if(v.status == 1) {
									cght_listhtmls += '<tr><td>' + Appendzero(i + 1) + '</td>';
									cght_listhtmls += '<td>' + likNullData(v.purchase_sn) + '</td>';
									cght_listhtmls += '<td>' + likNullData(v.supplier_name) + '</td>';
									cght_listhtmls += '<td><span class="c_y">' + likNullData(v.status_name) + '</span></td>';
									cght_listhtmls += '<td>' + likNullData(v.flow_name) + '</td>';
//									cght_listhtmls += '<td>' + likNullData(v.purchase_order_sn) + '</td>';
//									cght_listhtmls += '<td>' + likNullData(v.purchase_quote_sn) + '</td>';
//									cght_listhtmls += '<td>' + likNullData(v.name) + '</td>';
//									if(v.purchase_order_status!=0){
//									cght_listhtmls += '<td>生成采购订单</td>';
//								}else{
//									cght_listhtmls += '<td>-</td>';
//								}
									cght_listhtmls += '<td>' + likNullData(v.dept_name) + '</td>';
									cght_listhtmls += '<td>' + likNullData(v.owner_name) + '</td>';
									cght_listhtmls += '<td>' + likNullData(v.created_at) + '</td>';
									//cght_listhtmls += '<td>' + likNullData(v.uname) + '</td>';
									
									cght_listhtmls += '<td><button class="but_mix but_look r_sidebar_btn dwsp_cg_ckbtn_xxl" name="ht_buy_sqright" uid="' + v.id + '">查看</button><button class="but_mix but_look val_dialog dwsp_cg_sp_btn_xxl" name="ht_buy_prevSP" uid="' + v.id + '">审批</button></td></tr>';
								} else if(v.status == 2) {
									cght_listhtmls += '<tr><td>' + Appendzero(i + 1) + '</td>';
									cght_listhtmls += '<td>' + likNullData(v.purchase_sn) + '</td>';
									cght_listhtmls += '<td>' + likNullData(v.supplier_name) + '</td>';
									cght_listhtmls += '<td><span class="c_r">已拒绝</span></td>';
									cght_listhtmls += '<td>' + likNullData(v.flow_name) + '</td>';
//									cght_listhtmls += '<td>' + likNullData(v.purchase_order_sn) + '</td>';
//									cght_listhtmls += '<td>' + likNullData(v.purchase_quote_sn) + '</td>';
//									cght_listhtmls += '<td>' + likNullData(v.name) + '</td>';
//									if(v.purchase_order_status!=0){
//									cght_listhtmls += '<td>生成采购订单</td>';
//								}else{
//									cght_listhtmls += '<td>-</td>';
//								}
									cght_listhtmls += '<td>' + likNullData(v.dept_name) + '</td>';
									cght_listhtmls += '<td>' + likNullData(v.owner_name) + '</td>';
									cght_listhtmls += '<td>' + likNullData(v.created_at) + '</td>';
									//cght_listhtmls += '<td>' + likNullData(v.uname) + '</td>';
									
									cght_listhtmls += '<td><button class="but_mix but_look r_sidebar_btn dwsp_cg_ckbtn_xxl" name="ht_buy_sqright" uid="' + v.id + '">查看</button><button class="but_mix but_grey1 dwsp_cg_sp_btn_xxl" uid="' + v.id + '">审批</button></td></tr>';
								} else {
									cght_listhtmls += '<tr><td>' + Appendzero(i + 1) + '</td>';
									cght_listhtmls += '<td>' + likNullData(v.purchase_sn) + '</td>';
									cght_listhtmls += '<td>' + likNullData(v.supplier_name) + '</td>';
									cght_listhtmls += '<td><span class="c_g">' + likNullData(v.status_name) + '</span></td>';
									cght_listhtmls += '<td>' + likNullData(v.flow_name) + '</td>';
//									cght_listhtmls += '<td>' + likNullData(v.purchase_order_sn) + '</td>';
//									cght_listhtmls += '<td>' + likNullData(v.purchase_quote_sn) + '</td>';
//									cght_listhtmls += '<td>' + likNullData(v.name) + '</td>';
//									if(v.purchase_order_status!=0){
//									cght_listhtmls += '<td>生成采购订单</td>';
//								}else{
//									cght_listhtmls += '<td>-</td>';
//								}
									cght_listhtmls += '<td>' + likNullData(v.dept_name) + '</td>';
									cght_listhtmls += '<td>' + likNullData(v.owner_name) + '</td>';
									cght_listhtmls += '<td>' + likNullData(v.created_at) + '</td>';
									//cght_listhtmls += '<td>' + likNullData(v.uname) + '</td>';
									
									cght_listhtmls += '<td><button class="but_mix but_look r_sidebar_btn dwsp_cg_ckbtn_xxl" name="ht_buy_sqright" uid="' + v.id + '">查看</button><button class="but_mix but_grey1 dwsp_cg_sp_btn_xxl" uid="' + v.id + '">审批</button></td></tr>';
								}
							}

						});
					} else {
						$('.cght_th_tabbjdxxl').html('负责部门');
						$('.cght_th_tabddxxl').html('负责人');
						$.each(cglist, function(i, v) {
							if(v.is_invalid == 1) {
								cght_listhtmls += '<tr class="grey"><td><span class="voidIcon">作废</span></td>';
								cght_listhtmls += '<td>' + likNullData(v.purchase_sn) + '</td>';
								cght_listhtmls += '<td>' + likNullData(v.supplier_name) + '</td>';
								cght_listhtmls += '<td><span>' + likNullData(v.status_name) + '</span></td>';
								cght_listhtmls += '<td>' + likNullData(v.flow_name) + '</td>';
//								cght_listhtmls += '<td>' + likNullData(v.purchase_order_sn) + '</td>';
//								cght_listhtmls += '<td>' + likNullData(v.purchase_quote_sn) + '</td>';
//								cght_listhtmls += '<td>' + likNullData(v.name) + '</td>';
//								if(v.purchase_order_status!=0){
//									cght_listhtmls += '<td>生成采购订单</td>';
//								}else{
//									cght_listhtmls += '<td>-</td>';
//								}
								cght_listhtmls += '<td>' + likNullData(v.dept_name) + '</td>';
								cght_listhtmls += '<td>' + likNullData(v.owner_name) + '</td>';
								cght_listhtmls += '<td>' + likNullData(v.created_at) + '</td>';
								//cght_listhtmls += '<td>' + likNullData(v.uname) + '</td>';
								
								cght_listhtmls += '<td><button class="but_mix but_look r_sidebar_btn cswd_cg_ckbtn_xxl" name="ht_buy_csright" uid="' + v.id + '">查看</button></td></tr>';
							} else {
								if(v.status == 1) {
									cght_listhtmls += '<tr><td>' + Appendzero(i + 1) + '</td>';
									cght_listhtmls += '<td>' + likNullData(v.purchase_sn) + '</td>';
									cght_listhtmls += '<td>' + likNullData(v.supplier_name) + '</td>';
									cght_listhtmls += '<td><span class="c_y">' + likNullData(v.status_name) + '</span></td>';
									cght_listhtmls += '<td>' + likNullData(v.flow_name) + '</td>';
//									cght_listhtmls += '<td>' + likNullData(v.purchase_order_sn) + '</td>';
//									cght_listhtmls += '<td>' + likNullData(v.purchase_quote_sn) + '</td>';
//									cght_listhtmls += '<td>' + likNullData(v.name) + '</td>';
//									if(v.purchase_order_status!=0){
//									cght_listhtmls += '<td>生成采购订单</td>';
//								}else{
//									cght_listhtmls += '<td>-</td>';
//								}
									cght_listhtmls += '<td>' + likNullData(v.dept_name) + '</td>';
									cght_listhtmls += '<td>' + likNullData(v.owner_name) + '</td>';
									cght_listhtmls += '<td>' + likNullData(v.created_at) + '</td>';
									//cght_listhtmls += '<td>' + likNullData(v.uname) + '</td>';
									
									cght_listhtmls += '<td><button class="but_mix but_look r_sidebar_btn cswd_cg_ckbtn_xxl" name="ht_buy_csright" uid="' + v.id + '">查看</button></td></tr>';
								} else if(v.status == 2) {
									cght_listhtmls += '<tr><td>' + Appendzero(i + 1) + '</td>';
									cght_listhtmls += '<td>' + likNullData(v.purchase_sn) + '</td>';
									cght_listhtmls += '<td>' + likNullData(v.supplier_name) + '</td>';
									cght_listhtmls += '<td><span class="c_r">已拒绝</span></td>';
									cght_listhtmls += '<td>' + likNullData(v.flow_name) + '</td>';
//									cght_listhtmls += '<td>' + likNullData(v.purchase_order_sn) + '</td>';
//									cght_listhtmls += '<td>' + likNullData(v.purchase_quote_sn) + '</td>';
//									cght_listhtmls += '<td>' + likNullData(v.name) + '</td>';
//									if(v.purchase_order_status!=0){
//									cght_listhtmls += '<td>生成采购订单</td>';
//								}else{
//									cght_listhtmls += '<td>-</td>';
//								}
									cght_listhtmls += '<td>' + likNullData(v.dept_name) + '</td>';
									cght_listhtmls += '<td>' + likNullData(v.owner_name) + '</td>';
									cght_listhtmls += '<td>' + likNullData(v.created_at) + '</td>';
									//cght_listhtmls += '<td>' + likNullData(v.uname) + '</td>';
									
									cght_listhtmls += '<td><button class="but_mix but_look r_sidebar_btn cswd_cg_ckbtn_xxl" name="ht_buy_csright" uid="' + v.id + '">查看</button></td></tr>';
								} else {
									cght_listhtmls += '<tr><td>' + Appendzero(i + 1) + '</td>';
									cght_listhtmls += '<td>' + likNullData(v.purchase_sn) + '</td>';
									cght_listhtmls += '<td>' + likNullData(v.supplier_name) + '</td>';
									cght_listhtmls += '<td><span class="c_g">' + likNullData(v.status_name) + '</span></td>';
									cght_listhtmls += '<td>' + likNullData(v.flow_name) + '</td>';
//									cght_listhtmls += '<td>' + likNullData(v.purchase_order_sn) + '</td>';
//									cght_listhtmls += '<td>' + likNullData(v.purchase_quote_sn) + '</td>';
//									cght_listhtmls += '<td>' + likNullData(v.name) + '</td>';
//									if(v.purchase_order_status!=0){
//									cght_listhtmls += '<td>生成采购订单</td>';
//								}else{
//									cght_listhtmls += '<td>-</td>';
//								}
									cght_listhtmls += '<td>' + likNullData(v.dept_name) + '</td>';
									cght_listhtmls += '<td>' + likNullData(v.owner_name) + '</td>';
									cght_listhtmls += '<td>' + likNullData(v.created_at) + '</td>';
									//cght_listhtmls += '<td>' + likNullData(v.uname) + '</td>';
									
									cght_listhtmls += '<td><button class="but_mix but_look r_sidebar_btn cswd_cg_ckbtn_xxl" name="ht_buy_csright" uid="' + v.id + '">查看</button></td></tr>';
								}
							}

						});
					}
					$('.cghts_list_html').html(cght_listhtmls)
					if(loginUserInfo['company_admin'] != 1){
						if(loginUserInfo.powerUrls.length==0){
							$('.cght_zf_btn').hide();
							
						}else{
							var arr = loginUserInfo.powerUrls;//
							if($.inArray(zuofei, arr)!=-1){
								$('.cght_zf_btn').show();
							}else{
								$('.cght_zf_btn').hide();
							}
							
							
						}
					}
					
				}
				list_table_render_pagination(".cght_fenye_xxl", cght_data_xxl, cght_list_ajax_xxl, data["totalcount"], cglist.length)
					likShow('#cg_tables_list_xxl', cght_xuanzckx, '#cg_xzlist_status_xxl', '#cg_baocun_xzckx_btnxxl', '#cg_hfmr_xzckx_btnxxl');
			}
		},
		error: function(data) {
			console.log(data)
			var cght_err = '';
			cght_err += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
			$('.cghts_errhtml_xxl').html(cght_err);
			$('.cght_fenye_xxl').css('display', 'none')
		}
	});
}
//cght_list_ajax_xxl()
//草稿箱列表
$('.cght_cgxtancbox_btnxxl[name="xsht_caigoux_boxxxl1"]').die().live('click',function(){
	cght_data_xxl.is_draft = '1';
	cght_cgxlist_ajax();
})
function cght_cgxlist_ajax(){
	$.ajax({
		type:"get",
		url:SERVER_URL + "purchase-contract/list",
		data:cght_data_xxl,
		dataType:'json',
		success:function(data){
			if(data.code!=0){
				$('.tanceng .cght_caogaolist_htmlxxl').html('');
				$('.tanceng .cght_caogaolist_errorhtml_xxl').css('display', 'block');
				$('.tanceng .cght_caogafenye_xxl').css('display', 'none');
			}else{
				console.log(data);
				var xslist = data['datalist'];
				if(xslist.length==0){
					$('.tanceng .cght_caogaolist_htmlxxl').html('');
					$('.tanceng .cght_caogaolist_errorhtml_xxl').css('display', 'block');
					$('.tanceng .cght_caogafenye_xxl').css('display', 'none');
				}else{
					$('.tanceng .cght_caogaolist_errorhtml_xxl').css('display', 'none');
					$('.tanceng .cght_caogafenye_xxl').css('display', 'block');
					var listhtml='';
					$.each(xslist, function(i,v) {
						listhtml +='<tr><td>'+Appendzero(i+1)+'</td>';
                        listhtml +='<td>'+likNullData(v.purchase_sn)+'</td>';        
                        listhtml +='<td>'+likNullData(v.supplier_name)+'</td>';        
                        listhtml +='<td>'+likNullData(v.created_at)+'</td>';        
                        listhtml +='<td>';        
                        listhtml +='<button class="but_mix but_exit val_dialogTop cght_caogaoxbiaji_btnxxl" name="contact_buy_exit" uid="'+v.id+'">编辑</button><button class="but_mix but_detele but_r val_dialogTop cght_cgsc_tancbtnxxl" name="cght_caogao_delete" uid="'+v.id+'">删除</button>';        
                        listhtml +='</td></tr>';            
					});
					$('.tanceng .cght_caogaolist_htmlxxl').html(listhtml);
					list_table_render_pagination(".cght_caogafenye_xxl", cght_data_xxl, cght_cgxlist_ajax, data["totalcount"], xslist.length)
				}
			}
		},
		error:function(){
			var xsht_err = '';
			$('.tanceng .cght_caogaolist_htmlxxl').html('');
			$('.tanceng .cght_caogaolist_errorhtml_xxl').css('display', 'block');
			$('.tanceng .cght_caogafenye_xxl').css('display', 'none');
		}
	});
}
$('.tanceng .cght_caogaoxbiaji_btnxxl').die().live('click', function() {
	xsht_huoquspr_ajax();
	cg_wfqd_ckxq_data.id = $(this).attr('uid')
	cg_wfqd_ckxq_ajax()
})

$('.tanceng .cght_cgsc_tancbtnxxl').die().live('click',function(){
	$('.tanceng .cght_caogshanchuqued_btnxxl').attr('uid',$(this).attr('uid'));
})
$('.tanceng .cght_caogshanchuqued_btnxxl').die().live('click',function(){
	cght_caogaoshanchu_data.id = $(this).attr('uid');
	cght_caogaoshanchu_ajax();
})
var cght_caogaoshanchu_data = {
	token:token,
	id:''
}
function cght_caogaoshanchu_ajax(){
	$.ajax({
		type:"get",
		url:SERVER_URL+"purchase-contract/del",
		data:cght_caogaoshanchu_data,
		dataType:'json',
		success:function(data){
			if(data.code!=0){
				alert(data.msg)
			}else{
				alert(data.msg)
				console.log(data);
				cght_cgxlist_ajax();
				cght_list_ajax_xxl();
			}
		},
		error:function(e){
			
		}
	});
}


	//不显示已作废
$('.cg_htxszf_qh_btnxxl').die().live('click', function() {
		if($(this).prop("checked")) {
			cght_data_xxl.is_invalid = 0;
			cght_list_ajax_xxl()
		} else {
			cght_data_xxl.is_invalid = '';
			cght_list_ajax_xxl()
		}
	})

$('button[name="ht_cght_zkgjss"]').die().live('click',function(){
	if($(this).text()=='隐藏高级搜索'){
		if($(this).attr('thetype')=='1'){
			$('.cg_cjr_val_xxl').attr('readonly','readonly').val('').nextAll().hide().parent().css('background','#f5f5f5')
		}else{
			$('.cg_cjr_val_xxl').removeAttr('readonly').val('创建人').nextAll().show().parent().css('background','')
		}
	}
})

//切换状态升降序
var cghtztsj=0;
var cghtcjrq=0;
$('.price_icon').die().live('click',function(){
	if($(this).attr('thetype')=='order_status'){
		cghtztsj++;
	if(cghtztsj%2==0){
		cght_data_xxl.order_status = 1;
	}else{
		cght_data_xxl.order_status = 2;
	}
	cght_data_xxl.thetype = $(this).attr('typeid');
	cght_list_ajax_xxl()
	}else if($(this).attr('thetype')=='created_at'){
		cghtcjrq++;
	if(cghtcjrq%2==0){
		cght_data_xxl.created_at = 1;
	}else{
		cght_data_xxl.created_at = 2;
	}
	cght_data_xxl.order_status='';
	cght_data_xxl.thetype = $(this).attr('typeid');
	cght_list_ajax_xxl()
	}
	
})

$('.cght_cjrqsjbtn_xxl').die().live('click',function(){
	cghtcjrq++;
	if(cghtcjrq%2==0){
		cght_data_xxl.created_at = 1;
	}else{
		cght_data_xxl.created_at = 2;
	}
	cght_data_xxl.order_status='';
	cght_data_xxl.thetype = $('.cghts_list_html').attr('thetype');
	cght_list_ajax_xxl()
})
//$('.cght_ztsjbtn_xxl').toggle(function(){
//	$(this).children(".price_icon").removeClass("down").addClass("up");
//	cght_data_xxl.thetype = $(this).attr('thetype')
//	cght_data_xxl.order_status = 1;
//	cght_list_ajax_xxl()
//},function(){
//	$(this).children(".price_icon").removeClass("up").addClass("down");
//	cght_data_xxl.thetype = $(this).attr('thetype')
//	cght_data_xxl.order_status = 2;
//	cght_list_ajax_xxl()
//})
//切换日期升降序
//$('.cght_cjrqsjbtn_xxl').toggle(function(){
//	$(this).children(".price_icon").removeClass("down").addClass("up");
//	cght_data_xxl.thetype = $(this).attr('thetype')
//	cght_data_xxl.created_at = 1;
//	cght_list_ajax_xxl()
//},function(){
//	$(this).children(".price_icon").removeClass("up").addClass("down");
//	cght_data_xxl.thetype = $(this).attr('thetype')
//	cght_data_xxl.created_at = 2;
//	cght_list_ajax_xxl()
//})
//作废
var cght_zf_data = {
	token: token,
	id: ''
}

function cght_zf_ajax_xxl() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "purchase-contract/onstatus",
		data: cght_zf_data,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg)
			} else {
				//console.log(data)
				cght_list_ajax_xxl()
			}
		},
		error: function(e) {
			console.log(e)
		}
	});
}
$('.cght_zf_btn').die().live('click', function() {
		cght_zf_data.id = $(this).attr('uid');
		//console.log(xsht_zf_data.id)
		cght_zf_ajax_xxl()
	})
$('.cg_zfbtns_xxl').die().live('click',function(){
	cght_zf_data.id = $(this).attr('uid');
	cght_zf_ajax_xxl()
	$('.cg_genduo_btn_xxl').css('display', 'none')
})
	//刷新
$('.cg_djsx_btn_xxl').die().live('click', function() {
	add_Rload_index(60,5)//参数页面值，父级值
//		cght_data_xxl = {
//			token: token,
//			thetype: '1', //1我发起的 2待我审批 3抄送我的
//			keywords: '', //关键词（合同编号、销售报价单编号、客户名称、合同名称）
//			page: '1',
//			num: '10',
//			status: '', //1审批中2未通过3已通过
//			flow: '', //审核人
//			uid: '', //创建人
//			dept_id: '', //负责部门
//			owner_id: '', //负责人
//			is_invalid: '', //是否作废：0正常1作废
//			created_at: '', //创建日期：1升序2降序
//			order_status: '' //1升序2降序
//		}
//		cght_list_ajax_xxl()
//		$('.cght_menu_list_xxl li:first').addClass(' tabhover').siblings('li').removeClass('tabhover');
//		$('.select_p input.cght_spzt_val_xxl').val('审批状态').attr('style', '');
//		$('.select_p input.cg_shr_val_xxl').val('审核人').attr('style', '');
//		$('.select_p input.cg_cjr_val_xxl').val('创建人').attr('style', '');
//		$('.select_p input.cg_fzbm_val_xxl').val('负责部门').attr('style', '');
//		$('.select_p input.cg_fzr_val_xxl').val('负责人').attr('style', '');
	})
	//搜索
//function cght_sousnow(val) {
//	cght_data_xxl.keywords = val;
//	cght_list_ajax_xxl()
//}
$('.cg_sousuobtn_xxl').die().live('click', function() {
	if($('.cght_ssinput_value').val() == '' || $('.cght_ssinput_value').val() == '搜索合同编号/采购报价单编号/供应商名称/合同名称') {
		cght_data_xxl.keywords='';
	} else {
		cght_data_xxl.keywords = $('.cght_ssinput_value').val();
		
	}
	cght_list_ajax_xxl()
})
var cght_gjss_data = {
	token: token,
	big_type:'5',
	small_type:''//dept_id 部门搜索 owner_id 负责人搜索 flow 审批人搜索 uid创建人搜索 
}

function cght_gjss_ajax() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "common/search",
		data: cght_gjss_data,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg)
			} else {
				var cglists = data['data'];
				var cght_shr = '',
					cght_cjr = '',
					cght_fzbm = '',
					cght_fzr = '';
				$.each(cglists, function(i, v) {
					cght_shr += '<li flowid="' + v.id + '">' + v.name + '</li>';
					cght_cjr += '<li uid="' + v.id + '">' + v.name + '</li>';
					cght_fzbm += '<li deptid="' + v.id + '">' + v.name + '</li>';
					cght_fzr += '<li ownerid="' + v.id + '">' + v.name + '</li>';
				});
				$('.cg_shr_list_xxl').html(cght_shr)
				$('.cg_cjr_list_xxl').html(cght_cjr)
				$('.cg_fzbm_list_xxl').html(cght_fzbm)
				$('.cg_fzr_list_xxl').html(cght_fzr)
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
$('.cg_shr_val_xxl,.cg_shr_val_xxl+i').die().live('click',function(){
	cght_gjss_data.small_type='flow';
	cght_gjss_ajax()
})
$('.cg_cjr_val_xxl,.cg_cjr_val_xxl+i').die().live('click',function(){
	cght_gjss_data.small_type='uid';
	cght_gjss_ajax()
})
$('.cg_fzbm_val_xxl,.cg_fzbm_val_xxl+i').die().live('click',function(){
	cght_gjss_data.small_type='dept_id';
	cght_gjss_ajax()
})
$('.cg_fzr_val_xxl,.cg_fzr_val_xxl+i').die().live('click',function(){
	cght_gjss_data.small_type='owner_id';
	cght_gjss_ajax()
})

	//高级搜索

$('.cg_spzt_list_xxl li').die().live('click', function() { //审批状态
		//console.log($(this).attr('statusid'))
		$('.cght_spzt_val_xxl').val($(this).text()).addClass('c_3')
		cght_data_xxl.status = $(this).attr('statusid');
		cght_list_ajax_xxl()
	})
	//审核人
$('.cg_shr_list_xxl li').die().live('click', function() {
	$('.cg_shr_val_xxl').val($(this).text()).addClass('c_3')
		cght_data_xxl.flow = $(this).attr('flowid');
		cght_list_ajax_xxl()
	})
	//创建人
$('.cg_cjr_list_xxl li').die().live('click', function() {
	$('.cg_cjr_val_xxl').val($(this).text()).addClass('c_3')
		cght_data_xxl.uid = $(this).attr('uid');
		cght_list_ajax_xxl()
	})
	//负责部门
$('.cg_fzbm_list_xxl li').die().live('click', function() {
	$('.cg_fzbm_val_xxl').val($(this).text()).addClass('c_3')
		cght_data_xxl.dept_id = $(this).attr('deptid');
		cght_list_ajax_xxl()
	})
$('.cg_fzr_list_xxl li').die().live('click', function() {
	$('.cg_fzr_val_xxl').val($(this).text()).addClass('c_3')
		cght_data_xxl.owner_id = $(this).attr('ownerid');
		cght_list_ajax_xxl()
	})
	//查看我发起的
var cg_wfqd_ckxq_data = {
	token: token,
	id: ''
}

function cg_wfqd_ckxq_ajax() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "purchase-contract/info",
		data: cg_wfqd_ckxq_data,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg)
			} else {
				console.log(data)
				if(data.data.is_invalid == 1 || data.data.status == 3 || data.data.status == 1) {
					$('.cg_genduo_btn_xxl').css('display', 'none')
				} else {
					$('.cg_genduo_btn_xxl').css('display', 'block')
				}
				$('.cg_bjbtn_xxl').attr('uid', data.data.id)
				$('.cg_zfbtns_xxl').attr('uid', data.data.id)
				$('.cg_wfqd_lsjl_xxl').children('li').eq(1).attr('uid',data.data.id)
				$('.cg_ck_yulan_btnxxl').attr({'uid':data.data.id,'htbh':data.data.purchase_sn})
				$('.cg_htmc_tit_xxl').html(likNullData(data.data.name));
				$('.cg_cjrq_html_xxl').html(likNullData(data.data.created_at))
				$('.cg_wfqd_cjr_html_xxl').html(likNullData(data.data.uname))
				if(data.data.status == 3) {
					$('.cg_htsp_pass_xxl').css('display', 'block')
				} else {
					$('.cg_htsp_pass_xxl').css('display', 'none')
				}
				if(data.data.status == 2){
					$('.cg_spno_pass_xxl').css('display', 'block')
				}else{
					$('.cg_spno_pass_xxl').css('display', 'none')
				}
				$('.cg_wfqd_htbh_xxl').html(likNullData(data.data.purchase_sn))
				$('.cg_cgddbh_xxl').html(likNullData(data.data.purchase_order_sn))
				$('.cg_cgbjdbh_xxl').html(likNullData(data.data.purchase_quote_sn))
				$('.cg_htmcs_xxl').html(likNullData(data.data.name))
				$('.cg_ghsmc_xxl').html(likNullData(data.data.supplier_name))
				$('.cg_shzts_ck_xxl').html(likNullData(data.data.status_name))
				var flownameA = []
				$.each(data.data.flow_info, function(i, v) {
					flownameA.push(v.name)
				});
				$('.cg_shr_ck_xxl').html(flownameA.join())
				$('.cg_ckxs_fzbm_xxl').html(likNullData(data.data.dept_name))
				$('.cg_ck_fzr_xxl').html(likNullData(data.data.owner_name))
					//alert(data.data.check_log.length)
				if(data.data.check_log.length == 0) {
					$('.cg_spyj_list_html_xxl').html('')
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
                        fbyj_listhtml +='<img class="inline_block tx dwsp_yijlist_imgxxl" src="'+getImgUrl(v.face)+'">';//static/images/touxiang.png  
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
//						cg_fbyj_listhtml += ' <div class="work_spiliu"><div class="work_spiliu_items"><div class="left" style="position: relative;">';
//
//						if(v.uid == tokenid) {
//							cg_fbyj_listhtml += '<img class="inline_block tx" src="' + v.face + '"><cite class="b_h"></cite></div>';
//							cg_fbyj_listhtml += '<div class="right auto_height"><img src="static/images/work_jiantou.png"><div class="sp_cont">';
//							cg_fbyj_listhtml += '<div><h3 class="c_3">我</h3><span class="c_9 m_left_5">' + v.day + '</span></div>';
//						} else {
//							cg_fbyj_listhtml += '<img class="inline_block tx" src="' + v.face + '"><cite class="b_y"></cite></div>';
//							cg_fbyj_listhtml += '<div class="right auto_height" ><img src="static/images/work_jiantou.png"><div class="sp_cont">';
//							cg_fbyj_listhtml += '<div><h3 class="c_3">' + v.name + '</h3><span class="c_9 m_left_5">' + v.day + '</span></div>';
//						}
//						if(i == 0) {
//							cg_fbyj_listhtml += '<h3 class=" f_color">发起审批</h3>';
//						} else {
//							if(v.status == 1) {
//								cg_fbyj_listhtml += '<h3 class="c_b" style="color:#f8ac59;">进行中</h3>';
//							} else if(v.status == 2) {
//								cg_fbyj_listhtml += '<h3 class="c_r" style="color:#ff6c60;">未通过</h3>'
//							} else {
//								cg_fbyj_listhtml += '<h3 class="c_g">通过审批</h3>';
//							}
//
//						}
//						cg_fbyj_listhtml += '<p class="c_3 work_sp_p">' + v.note + '</p></div></div><div style="clear: both;height: 0;font-size: 1px;line-height: 0px;"></div></div></div>'
//					});
					$('.cg_spyj_list_html_xxl').html(fbyj_listhtml)
				}
				$(".dwsp_yijlist_imgxxl").error(function(e) { //加入相应的图片类名
				$(this).attr("src", "static/images/touxiang.png");
			});
			if(data.data.tax_rate!='1'){
			$('.tanceng .cg_ckbj_kjfp_xxl').val('').attr('readonly',true).addClass('inp_noInput');
			$('.tanceng .cg_ckbj_kpmc_xxl').val('').attr('readonly',true).addClass('inp_noInput');
			$('.tanceng .cg_ckbj_kpyh_xxl').val('').attr('readonly',true).addClass('inp_noInput');
			$('.tanceng .cg_ckbj_kpyhzh_xxl').val('').attr('readonly',true).addClass('inp_noInput');
			$('.tanceng .cg_ckbj_kpsh_xxl').val('').attr('readonly',true).addClass('inp_noInput');
		}else{
			$('.tanceng .cg_ckbj_kjfp_xxl').removeAttr('readonly').removeClass('inp_noInput');
			$('.tanceng .cg_ckbj_kpmc_xxl').val('').removeAttr('readonly').removeClass('inp_noInput');
			$('.tanceng .cg_ckbj_kpyh_xxl').val('').removeAttr('readonly').removeClass('inp_noInput');
			$('.tanceng .cg_ckbj_kpyhzh_xxl').val('').removeAttr('readonly').removeClass('inp_noInput');
			$('.tanceng .cg_ckbj_kpsh_xxl').val('').removeAttr('readonly').removeClass('inp_noInput');
		}
				//$('.cg_ckbj_zdr_xxl').html(likNullData(data.data.uname))
				$('.tanceng .cg_ckbj_zdrq_xxl').html(likNullData(data.data.created_at))
				$('.tanceng .cg_ckbj_htbh_xxl').val(data.data.purchase_sn).addClass('c_3');
				$('.tanceng .cg_ckbj_xzhtmb_xxl').val(data.data.template_name).attr('uid', data.data.template_id).addClass('c_3');
					//console.log(data.data.market_sn)
				$('.tanceng .cg_ckbj_htmc_xxl').val(data.data.name).addClass('c_3');
					//$('.xsht_bj_xsdds').val(data.data.market_order_sn)
				$('.tanceng .cg_ckbj_cgbjd_xxl').val(data.data.purchase_quote_sn).attr('uid', data.data.quote_id).addClass('c_3');
				$('.tanceng .cg_ckbj_tjsp_btn_xxl').attr('uid', data.data.id)
				$('.tanceng .cg_ckbj_fzbm_xxl').val(department_name).attr('uid', department_id).addClass('c_3');
				$('.tanceng .cg_ckbj_fzr_xxl').val(username).attr('uid', tokenid).addClass('c_3');
				$('.tanceng .cg_ckbj_qdrq_xxl').val(data.data.sign_time).addClass('c_3');
				$('.tanceng .cg_ckbj_qddd_xxl').val(data.data.sign_address).addClass('c_3');
				$('.tanceng .cg_ckbj_yfmc_xxl').val(data.data.need_name).addClass('c_3');
				$('.tanceng .cg_ckbj_ghrq_xxl').val(data.data.supply_day).addClass('c_3');
				$('.tanceng .cg_ckbj_zddd_xxl').val(data.data.assign_address).addClass('c_3');
				$('.tanceng .cg_ckbj_lxr_xxl').val(data.data.contact).addClass('c_3');
				$('.tanceng .cg_ckbj_lxrdh_xxl').val(data.data.contact_tel).addClass('c_3');
				$('.tanceng .cg_ckbj_xzzh_xxl').val(data.data.account_name).attr('uid', data.data.chance_account).addClass('c_3');
				$('.tanceng .cg_ckbj_shuihao_xxl').val(data.data.tax_num).addClass('c_3');
				$('.tanceng .cg_ckbj_khmc_xxl').val(data.data.open_account).addClass('c_3');
				$('.tanceng .cg_ckbj_khyh_xxl').val(data.data.open_bank).addClass('c_3');
				$('.tanceng .cg_ckbj_hkzh_xxl').val(data.data.remit_account).addClass('c_3');
				$('.tanceng .cg_ckbj_kjfp_xxl').val(data.data.open_ticket).addClass('c_3');
				$('.tanceng .cg_ckbj_kpmc_xxl').val(data.data.open_ticket_name).addClass('c_3');
				$('.tanceng .cg_ckbj_kpyh_xxl').val(data.data.open_ticket_bank).addClass('c_3');
				$('.tanceng .cg_ckbj_kpyhzh_xxl').val(data.data.account).addClass('c_3');
				$('.tanceng .cg_ckbj_kpsh_xxl').val(data.data.tax_point).addClass('c_3');
				$('.tanceng .cg_ckbj_zcdzdh_xxl').val(data.data.reg_address_tel).addClass('c_3');
				$('.tanceng .cght_cgbjdmain_moneyxxl').html(data.data.totals)
				if(data.data.totals==null||data.data.totals==''||data.data.totals==undefined||parseInt(data.data.totals)<=0){
			$('.tanceng .xsht_addhkjduan_xxl').attr('disabled','disabled');
		}else{
			$('.tanceng .xsht_addhkjduan_xxl').removeAttr('disabled');
		}
				var zdylist = '';
		$.each(data.data.terms_list, function(i, v) {
					zdylist += '<li class="ht_mb_term" is_add="'+v.is_add+'" tkmcs="'+v.name+'" contents="'+v.content+'" name="index_'+i+'"><div class="t_textinput">';//<span class="mbbj_tkmcs_xxl">条款<span>'+(5+i)+'</span>:
					zdylist += '<div class="muban_terms">' + v.name + '</span></div>';
					zdylist += ' <span class="t_right_span val_dialogTop xshtmoban_bjtiaokuan_btnxxl" style="color:#f8ac59;right:0px;" suoyin="index_'+i+'" contents="'+v.content+'" tkmcs="'+v.name+'" name="term_add_mobanzdy" lenname = "' + i + '">编辑</span>';
					zdylist += '</div></li>';
				});
				$('.tanceng .xsht_mobantiaokuan_listxxl').html(zdylist)
				if(data.data.steps_list.length!=0){
					var worksp_addbghtml='';
				$.each(data.data.steps_list, function(i,v) {
					if(i==data.data.steps_list.length-1){
						return false;
					}
					 worksp_addbghtml +='<tr class="bargin_tr">\
                <td>\
                <div class="t_textinput">\
                <div class="t_left" style="width: 30%;"><i class="c_r">*</i>阶段<span class=""><cite class="page_59_khlxrNum">1</cite></span></div>\
                <div class="t_right" style="margin-left: 30%;">\
                <div class="inline_block">\
                <input type="text" class="time_input bargin_inp_30 xsht_hklc_addbaifen_xxl" value="'+v.segment+'" onfocus="fn_focus(this);" onblur="fn_blur(this);" style="color: rgb(51, 51, 51);margin-right:5px;">%\
            </div>\
            </div>\
            </div>\
            </td>\
            <td>\
                <div class="t_textinput">\
                    <div class="" style="float: left;margin-right: 25px">合同签订后</div>\
                    <div class="t_right">\
                        <input type="text" class="time_input bargin_inp_30 xsht_hklc_dayxxl" value="'+v.pay_rate+'" onfocus="fn_focus(this);" onblur="fn_blur(this);" style="color: rgb(51, 51, 51);margin-right:5px;">天\
                    </div>\
                </div>\
            </td>\
            <td>\
                <span class="c_r">'+v.money+'</span><i class="bargin_guanbi"></i>\
            </td>\
            </tr>';
            
				});
				$('.tanceng .xsht_hklc_guding_valxxl').val(data.data.steps_list[data.data.steps_list.length-1].segment);
				$('.tanceng .xsht_hklc_maindayxxl').val(data.data.steps_list[data.data.steps_list.length-1].pay_rate)
				$('.tanceng .xsht_hklcmoney_xxl').html(data.data.steps_list[data.data.steps_list.length-1].money)
			$('.tanceng .xsht_addhkjduan_xxl').parent().siblings('.worksp_addbx').find('.bargin_tbody').prepend(worksp_addbghtml);
            $.each($('.tanceng .bargin_tr'),function(i,v){
                $('.tanceng .page_59_khlxrNum').eq(i).html(i + 1);
            })
				}
				
//				var mrsprys = '';
//				$.each(data.data.flow_info, function(i, v) {
//					sp_rynum_cg.push(v.id);
//					mrsprys += '<li userid="' + v.id + '"><i class="del_img_1">-</i><em class="icon_personBtn icon_personBtn_msg" ><i class="icon_personNext"></i></em><em class="icon_adderBtn"></em><p class="box_adderName">' + v.name + '</p> <p class="box_addermsg">步骤一</p></li>';
//
//				});
//				$('.tanceng .cg_spqian_list_xxl').before(mrsprys)
//				$.each($('.tanceng .spr_add_xxl .box_addermsg'), function(i, v) {
//					$('.tanceng .spr_add_xxl .box_addermsg').eq(i).html(buzou[i])
//				});
				var mrcsrnum_cg = '';
				$.each(data.data.copy_info, function(i, v) {
					csnumss_cg.push(v.id)
					//style="background:url(' + v.face + ')"
					if(v.face==''||v.face==null||v.face==undefined){
						mrcsrnum_cg += '<li userid="' + v.id + '"><i class="del_img_1">-</i><em class="icon_personBtn icon_personBtn_msg"></em><em class="icon_adderBtn"></em><p class="box_adderName">' + v.name + '</p></li>';
					}else{
						mrcsrnum_cg += '<li userid="' + v.id + '"><i class="del_img_1">-</i><em class="icon_personBtn icon_personBtn_msg" style="background:url(' + v.face + ');border-radius:50%;"></em><em class="icon_adderBtn"></em><p class="box_adderName">' + v.name + '</p></li>';
					}
					
				});
				$('.tanceng .csr_add_xxl').prepend(mrcsrnum_cg)
			}
		},
		error: function(e) {
			console.log(e)
		}
	});
}
$('.cght_chakan_btn').die().live('click', function() {
		$('.cg_htsp_pass_xxl').css('display', 'none')
		cg_wfqd_ckxq_data.id = $(this).attr('uid');
		cg_wfqd_ckxq_ajax()
		cg_wfqd_lsjl_data.id = $(this).attr('uid');
		cg_wfqd_lsjl_ajax()
	})
//	//查看内的编辑按钮
$('.cg_bjbtn_xxl').die().live('click', function() {
	cg_wfqd_ckxq_ajax()
})
$('.cght_bj_btn').die().live('click', function() {
	xsht_huoquspr_ajax();
	cg_wfqd_ckxq_data.id = $(this).attr('uid')
	cg_wfqd_ckxq_ajax()
})
	//查看-预览按钮
$('.cg_ck_yulan_btnxxl').die().live('click', function() {
	$('.tanceng .daochu_cg').attr('htbh',$(this).attr('htbh'));
	//console.log($(this).attr('uid'))
	$('.tanceng .cg_dwsp_ck_juejbtn_xxl').hide();
	$('.tanceng .cg_dwsp_ck_tongguo_btn_xxl').hide();
	cght_ckyulan_data.id = $(this).attr('uid');
	cght_ckyulan_data.is_open = '1';
	cght_ckyulan_ajax()
})
var cght_ckyulan_data = {
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

function cght_ckyulan_ajax() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "purchase-contract/preview",
		data: cght_ckyulan_data,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg)
			} else {
				console.log(data)
				var yulanlist_cg = data['datalist'],
					a = '';
				$.each(yulanlist_cg, function(i, v) {
					a += likNullData(v);
				});
				$('.tanceng .cg_ck_yunlan_html_xxl').html(a)
				$('.tanceng .cg_sp_yulan_xq_xxl').html(a)
				var yulan_zdy_cg = data['customdatalist'],
					zdylist_cg = '';
				if(yulan_zdy_cg.length == 0) {
					return;
				} else {
					$.each(yulan_zdy_cg, function(i, v) {
						if(v.is_add=='1'){
							zdylist_cg += '<div class="ht_msg"><p class="f_color">' + intToChinese((i + 5)) + '、' + v.name + '</p><p class="f_color">' + v.content.replace(/\s+/g,'<br/>') + '</p></div>';
						}else if(v.is_add=='2'){
							zdylist_cg += '<div class="ht_msg "><p class="c_r">' + intToChinese((i + 5)) + '、' + v.name + '</p><p class="c_r">' + v.content.replace(/\s+/g,'<br/>') + '</p></div>';
						}else{
							zdylist_cg += '<div class="ht_msg"><p>' + intToChinese((i + 5)) + '、' + v.name + '</p><p>' + v.content.replace(/\s+/g,'<br/>') + '</p></div>';
						}
//						zdylist_cg += '<div class="ht_msg"><p>' + intToChinese((i + 5)) + '、' + v.name + '</p><p>' + v.content.replace(/\s+/g,'<br/>') + '</p></div>';
					});
					$('.tanceng .ht_msg_bottom').before(zdylist_cg)
				}
				
				

			}
		},
		error: function(e) {
			console.log(e)
		}
	});
}
//历史记录
var cg_wfqd_lsjl_data = {
	token:token,
	id:''
}
function cg_wfqd_lsjl_ajax(){
	$.ajax({
		type:"get",
		url:SERVER_URL+"purchase-contract/historyinfo",
		data:cg_wfqd_lsjl_data,
		dataType:'json',
		success:function(data){
			if(data.code!=0){
				console.log(data.msg)
			}else{
				console.log(data)
				var lsjl_list = data['datalist'],cg_dwsp_bjjl='';
				$.each(lsjl_list, function(i,v) {
					if(v.thetype==1){
						$('.cg_wfqd_lsjl_tximg_xxl').attr('img',v.face);
						$('.cg_dwsp_lsjl_cjr_xxl').html(v.name);
						$('.cg_dwsp_lsjl_cjrq_xxl').html(v.created_at);
						if(v.from_type==1){
							$('.cg_dwsp_lsjl_ly_xxl').html('来自PC端');
						}else if(v.from_type==2){
							$('.cg_dwsp_lsjl_ly_xxl').html('来自手机IOS端');
						}else{
							$('.cg_dwsp_lsjl_ly_xxl').html('来自手机Android端');
						}
						$('.cg_dwsp_lsjl_htbh_xxl').html(v.purchase_sn);
						$('.cg_dwsp_lsjl_cgddbh_xxl').html()
						$('.cg_dwsp_lsjl_cgbjdbh_xxl').html(v.purchase_quote_sn);
						$('.cg_dwsp_lsjl_htmc_xxl').html(v.name);
						$('.cg_dwsp_lsjl_ghsmc_xxl').html(v.supplier_name);
						$('.cg_dwsp_lsjl_shzt_xxl').html(v.status_name);
						$('.cg_dwsp_lsjl_shr_xxl').html(v.flow_name);
						$('.cg_dwsp_lsjl_fzbm_xxl').html(v.dept_name);
						$('.cg_dwsp_lsjl_fzr_xxl').html(v.owner_name)
						$('.cg_wfqd_lsjl_zdr_xxl').html(v.name)//制单人
					}else if(v.thetype==2){
						cg_dwsp_bjjl +='<div class="d-r-t-h"><div class="d-r-box">';
						cg_dwsp_bjjl +='<img class="l-sl-i" src="'+v.face+'">';
						cg_dwsp_bjjl +='<div class="d-r-r"><p class="u-id-t">'+v.name+'</p>';
						if(v.from_type==1){
							cg_dwsp_bjjl +='<p class="t-s-p">'+v.created_at+'<span class="sala_customer_msgcome">来自PC端</span></p></div></div></div>'; 
						}else if(v.from_type==2){
							cg_dwsp_bjjl +='<p class="t-s-p">'+v.created_at+'<span class="sala_customer_msgcome">来自手机IOS端</span></p></div></div></div>';
						}else{
							cg_dwsp_bjjl +='<p class="t-s-p">'+v.created_at+'<span class="sala_customer_msgcome">来自手机Android端</span></p></div></div></div>';
						}
                          	cg_dwsp_bjjl +='<div class="d-r-t-h"><p class="l-s-x">制单人：<span class="cg_wfqd_lsjl_zdr_xxl">张三</span></p></div>';    
                       
					}
					
				});
				 $('.cg_dwsp_lsjl_listhtml_xxl').html(cg_dwsp_bjjl)
			}
		},
		error:function(e){
			console.log(e)
		}
	});
}
//选择合同模板列表
var cght_mbdata_xxl = {
	token: token,
	thetype: '2',
	page: '1',
	num: '10',
	name: '',
	dept: '',
	uid: '',
	updated_uid: '',
	status:'0'
}

function cght_mbajax_list() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "contract-template/list",
		data: cght_mbdata_xxl,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg)
			} else {
				console.log(data)
				var mblist_cg = data['datalist']
				$('.cght_bj_htmblist_cg_mainnum').html(data['totalcount'])
				if(mblist_cg.length == 0) {
					$('.cght_xzhtmc_list_xxl').html('');
					var mblist_cg_err = ''
					mblist_cg_err += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
					$('.xsht_mblist_cg_errhtml_xxl').html(mblist_cg_err)
					$('.cg_xzhtmb_list_fenye_xxl').css('display', 'none')
				} else {
					$('.xsht_mblist_cg_errhtml_xxl').html('')
					$('.cg_xzhtmb_list_fenye_xxl').css('display', 'block')
					var cg_mb_list_htmls = ''
					$.each(mblist_cg, function(i, v) {
						cg_mb_list_htmls += '<tr><td><input type="radio" name="ht_cght_xzcghtmbinp" uid="' + v.id + '" isname="' + v.is_name + '" value="' + xxldatakong(v.name) + '" address="' + xxldatakong(v.address) + '" ghrqday="' + xxldatakong(v.deliverydays) + '" kjfpday="' + xxldatakong(v.invoicedays) + '"></td>';
						cg_mb_list_htmls += '<td>' + likNullData(v.name) + '</td>';
						cg_mb_list_htmls += '<td>' + likNullData(v.type_name) + '</td>';
						cg_mb_list_htmls += '<td>' + likNullData(v.dept_name) + '</td>';
						cg_mb_list_htmls += '<td>' + likNullData(v.created_at) + '</td>';
						cg_mb_list_htmls += '<td>' + likNullData(v.create_name) + '</td>';
						cg_mb_list_htmls += '<td>' + likNullData(v.updated_at) + '</td>';
						cg_mb_list_htmls += '<td>' + likNullData(v.updated_name) + '</td>';
						cg_mb_list_htmls += '</tr>';
					});
					$('.cght_xzhtmc_list_xxl').html(cg_mb_list_htmls);
					list_table_render_pagination(".cg_xzhtmb_list_fenye_xxl", cght_mbdata_xxl, cght_mbajax_list, data["totalcount"], mblist_cg.length)
				}
			}
		},
		error: function(e) {
			console.log(e)
			var mblist_cg_err = ''
			mblist_cg_err += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
			$('.xsht_mblist_cg_errhtml_xxl').html(mblist_cg_err)
			$('.cg_xzhtmb_list_fenye_xxl').css('display', 'none')
		}
	});
}
$('.tanceng .cg_xzhtmb_btn_xxl').die().live('click', function() {
	cght_mbdata_xxl.name ='';
	cght_mbajax_list()
})

function xsht_bj_mblist_cg(val) {
	cght_mbdata_xxl.name = val;
	cght_mbajax_list()
}

$('.cght_bjmb_list_btn').die().live('click', function() {
	if($('.cght_bjmb_val_xxl').val() == '' || $('.cght_bjmb_val_xxl').val() == '搜索合同模板名称') {
		return false;
	} else {
		cght_mbdata_xxl.name = $('.cght_bjmb_val_xxl').val();
		cght_mbajax_list()
	}
})
$('.tanceng .cg_ht_bj_qued_btn_xxl').die('click').live('click', function() {
	if($('.tanceng input:radio[name="ht_cght_xzcghtmbinp"]:checked').length==0){
		alert('请选择合同模板')
		return false;
	}
		var radioA_cg = $('.tanceng input:radio[name="ht_cght_xzcghtmbinp"]:checked');
		//if($('input:radio[name="ht_cght_xzcghtmbinp"]').is(':checked')){
			//console.log($(this).attr('uid'))
			$('.tanceng .cg_ckbj_xzhtmb_xxl').attr('uid', radioA_cg.attr('uid'))
			$('.tanceng .cg_ckbj_xzhtmb_xxl').val(radioA_cg.val()).css('color', '#333')
			$('.tanceng .cg_ckbj_htmc_xxl').val(radioA_cg.val());
			$('.tanceng .cg_ht_xj_htmb_xxl').attr('uid', radioA_cg.attr('uid'))
			$('.tanceng .cg_ht_xj_htmb_xxl').val(radioA_cg.val()).css('color', '#333')
			$('.tanceng .cght_xj_htmc_xxl').val(radioA_cg.val());
		xsht_mbxx_data.id = radioA_cg.attr('uid');
		xsht_mobanxiangqing_ajax();
		
		$('.tanceng .cg_ht_xj_qddd_xxl').val(radioA_cg.attr('address')).css('color', '#333')
		$('.tanceng .cg_ht_xj_ghrq_xxl').val(radioA_cg.attr('ghrqday')).css('color', '#333')
		$('.tanceng .cg_ht_xj_kjfprq_xxl').val(radioA_cg.attr('kjfpday')).css('color', '#333')
		$(this).parent().parent().parent().remove();
		var num = $('.tanceng').children(".dialog_box").length;
		if(num < 1) {
			$(".tanceng").hide();
		}
			//}
		//console.log(radioA_cg.attr('uid'))
		
//		if(radioA_cg.attr('isname') == 1) {
//			$('.tanceng .cg_ckbj_xzhtmb_xxl').val(radioA_cg.val()).css('color', '#333')
//			$('.tanceng .cg_ckbj_htmc_xxl').val(radioA_cg.val()).attr({
//				'disabled': 'disabled',
//				'Names': radioA_cg.val()
//			}).css('color', '#333')
//		} else {
			
		//}
		
//		if(radioA_cg.attr('isname') == 1) {
//			$('.tanceng .cg_ht_xj_htmb_xxl').val(radioA_cg.val()).css('color', '#333')
//			$('.tanceng .cght_xj_htmc_xxl').val(radioA_cg.val()).attr({
//				'disabled': 'disabled',
//				'Names': radioA_cg.val()
//			}).css('color', '#333')
//		} else {
			
		//}
	})
	//取消选择模板弹层
$('.tanceng .cg_ht_bj_quxiao_btn_xxl').die().live('click', function() {
		$(this).parent().parent().parent().remove();
		var num = $('.tanceng').children(".dialog_box").length;
		if(num < 1) {
			$(".tanceng").hide();
		}
	})
	//取消编辑弹层
$('.tanceng .bjht_cg_quxiao_btn_xxl').die().live('click', function() {
		$(this).parent().parent().parent().remove();
		var num = $('.tanceng').children(".dialog_box").length;
		if(num < 1) {
			$(".tanceng").hide();
		}
	})
	//选择采购报价单
var cgbjd_data_xxl = {
	token: token,
	page: '1',
	num: '10',
	is_draft:'',
	keywords:'',//采购订单 供应商
	status:'3',//审批状态
	current_uid:'',//审批人
	uid:'',//报价人
	thetype:'1',//1 我发起的 2 待我审批的
	is_quote:'1'
}
$('.tanceng .cg_xzcgbjd_btn_xxl').die('click').live('click', function() {
	cgbjd_ajax_xxl()
})

function cgbjd_ajax_xxl() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "buy-quote/list",
		data: cgbjd_data_xxl,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg)
			} else {
				console.log(data)
				var bjdlist_cg = data['datalist'];

				if(bjdlist_cg.length == 0) {
					$('.cght_bj_cgbjd_list_xxl').html('');
					var bjdlist_cg_err = ''
					bjdlist_cg_err += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
					$('.cg_bjd_err_html_xxl').html(bjdlist_cg_err)
					$('.cg_cgbjd_fenye_xxl').css('display', 'none')
				} else {
					$('.cg_bjd_err_html_xxl').html('')
					$('.cg_cgbjd_fenye_xxl').css('display', 'block')
					var cg_bjd_list_htmls = '',
						oknums_cg = [],lxrlist=[];
					$.each(bjdlist_cg, function(i, v) {
						if(v.is_invalid == 0 && v.status == 3) {
							oknums_cg.push(v);
							//$.each(v.contacts, function(j,m) {
								//lxrlist +='<li tel="'+m.contact_tel+'">'+likNullData(m.contact_person)+'</li>';
								//lxrlist.push({'name':m.contact_person,'tel':m.contact_tel});
							//});
							//lxrdh="" lxr=\''+JSON.stringify(lxrlist)+'\'
							cg_bjd_list_htmls += '<tr><td><input type="radio" name="xs_xsdd_xzxsbjdinp" uid="' + v.id + '" codesn="' + xxldatakong(v.code_sn) + '" gysmc="' + xxldatakong(v.supplier_name) + '" zddd="' + xxldatakong(v.address)+ '" kpmc="'+xxldatakong(v.supplier_account_name)+'" kpyh="'+xxldatakong(v.supplier_account_bank)+'" kpzh="'+xxldatakong(v.supplier_pay_account)+'" kpsh="'+xxldatakong(v.supplier_tax_num)+'" totals="'+v.totals+'" tax_rate="'+v.tax_rate+'"></td>';
							cg_bjd_list_htmls += '<td>' + likNullData(v.code_sn) + '</td>';
							cg_bjd_list_htmls += '<td>'+likNullData(v.buy_order_sn)+'</td><td>' + likNullData(v.borrow_sn) + '</td>';
							cg_bjd_list_htmls += '<td>' + likNullData(v.supplier_name) + '</td>';
							cg_bjd_list_htmls += '<td><span class="c_g">通过</span></td>';
							cg_bjd_list_htmls += '<td>' + likNullData(v.approver_name) + '</td>';
							//cg_bjd_list_htmls += '<td>' + v.goods_money + '</td>';
							//cg_bjd_list_htmls += '<td>'+v.tax_sum+'</td>';
							//cg_bjd_list_htmls += '<td>' + v.total_money + '</td>';
							cg_bjd_list_htmls += '<td>' + likNullData(v.uname) + '</td>';
							cg_bjd_list_htmls += '<td>' + likNullData(v.created_at) + '</td>';
							cg_bjd_list_htmls += '<td>' + likNullData(v.dept_name) + '</td>';
							cg_bjd_list_htmls += '<td>' + likNullData(v.owner_name) + '</td>';
							cg_bjd_list_htmls += '</tr>';
							
						}

					});
					$('.cght_bj_cgbjd_list_xxl').html(cg_bjd_list_htmls);
					$('.cg_ht_cgbjd_nums_xxl').html(oknums_cg.length)
					list_table_render_pagination(".cg_cgbjd_fenye_xxl", cgbjd_data_xxl, cgbjd_ajax_xxl, oknums_cg.length, oknums_cg.length)
				}
			}
		},
		error: function(e) {
			$('.cght_bj_cgbjd_list_xxl').html('');
			var bjdlist_cg_err = ''
			bjdlist_cg_err += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
			$('.cg_bjd_err_html_xxl').html(bjdlist_cg_err)
			$('.cg_cgbjd_fenye_xxl').css('display', 'none')
		}
	});
}
//报价单搜索 后台根据客户名称
function cg_ht_bj_cgbjd_list_sousuo(val) {
	cgbjd_data_xxl.key = val;
	cgbjd_ajax_xxl()
}

$('.cg_ss_btn_xxl').die().live('click', function() {
		if($('.cg_cgbjd_ssval_xxl').val() == '' || $('.cg_cgbjd_ssval_xxl').val() == '搜索报价单编号') {
			return false;
		} else {
			cgbjd_data_xxl.key = $('.cg_cgbjd_ssval_xxl').val();
			cgbjd_ajax_xxl()
		}
	})
	//确定
$('.tanceng .cg_bj_xzcgbjd_qued_btn_xxl').die().live('click', function() {
	if($('.tanceng input:radio[name="xs_xsdd_xzxsbjdinp"]:checked').length==0){
		alert('请选择采购报价单')
		return false;
	}
		var radioB_cg = $('.tanceng input:radio[name="xs_xsdd_xzxsbjdinp"]:checked'),lxrlist='';
		$('.tanceng .cg_ckbj_cgbjd_xxl').val(radioB_cg.attr('codesn')).attr('uid', radioB_cg.attr('uid')).css('color', '#333')
		$('.tanceng .cg_ckbj_yfmc_xxl').val(radioB_cg.attr('gysmc'));
		$('.tanceng .cg_ckbj_zddd_xxl').val(radioB_cg.attr('zddd'));
//		$.each(JSON.parse(radioB_cg.attr('lxr')), function(i,v) {
//			lxrlist +='<li tel="'+v.tel+'">'+v.name+'</li>'
//		});
		//$('.tanceng .cght_xjxzlxr_listxxl').html(lxrlist);
		$('.tanceng .cg_ckbj_lxr_xxl').attr('lxr',radioB_cg.attr('lxr'));
		//$('.tanceng .cg_ckbj_lxrdh_xxl').val(radioB_cg.attr('lxrdh'));
		$('.tanceng .cg_xj_xzcgbjd_xxl').val(radioB_cg.attr('codesn')).attr('uid', radioB_cg.attr('uid')).css('color', '#333')
		$('.tanceng .cg_xj_ghmc_xxl').val(radioB_cg.attr('gysmc'));
		$('.tanceng .cg_xj_zddds_xxl').val(radioB_cg.attr('zddd'));
		//$('.tanceng .cg_xj_lxrs_xxl').attr('lxr',radioB_cg.attr('lxr'));
		//$('.tanceng .cg_xj_lxrdhs_xxl').val(radioB_cg.attr('lxrdh'));
		$('.tanceng .cg_xj_kpmcs_xxl').val(radioB_cg.attr('kpmc'));
		$('.tanceng .cg_xj_kpyhs_xxl').val(radioB_cg.attr('kpyh'));
		$('.tanceng .cg_xj_piaozh_xxl').val(radioB_cg.attr('kpzh'));
		$('.tanceng .cg_xj_sh_xxl').val(radioB_cg.attr('kpsh'));
		$('.tanceng .cg_ckbj_kpmc_xxl').val(radioB_cg.attr('kpmc'));
		$('.tanceng .cg_ckbj_kpyh_xxl').val(radioB_cg.attr('kpyh'));
		$('.tanceng .cg_ckbj_kpyhzh_xxl').val(radioB_cg.attr('kpzh'));
		$('.tanceng .cg_ckbj_kpsh_xxl').val(radioB_cg.attr('kpsh'));
		$('.tanceng .cght_cgbjdmain_moneyxxl').html(radioB_cg.attr('totals'));
		$('.tanceng .xsht_hklcmoney_xxl').html(radioB_cg.attr('totals'));
		if(radioB_cg.attr('totals')==null||radioB_cg.attr('totals')==''||radioB_cg.attr('totals')==undefined||parseInt(radioB_cg.attr('totals'))<=0){
			$('.tanceng .xsht_addhkjduan_xxl').attr('disabled','disabled');
		}else{
			$('.tanceng .xsht_addhkjduan_xxl').removeAttr('disabled');
		}
		if(radioB_cg.attr('tax_rate')!='1'){
			$('.tanceng .cg_ht_xj_kjfprq_xxl').val('').attr('readonly',true).addClass('inp_noInput');
			$('.tanceng .cg_xj_kpmcs_xxl').val('').attr('readonly',true).addClass('inp_noInput');
			$('.tanceng .cg_xj_kpyhs_xxl').val('').attr('readonly',true).addClass('inp_noInput');
			$('.tanceng .cg_xj_piaozh_xxl').val('').attr('readonly',true).addClass('inp_noInput');
			$('.tanceng .cg_xj_sh_xxl').val('').attr('readonly',true).addClass('inp_noInput');
		}else{
			$('.tanceng .cg_ht_xj_kjfprq_xxl').removeAttr('readonly').removeClass('inp_noInput');
			$('.tanceng .cg_xj_kpmcs_xxl').val('').removeAttr('readonly').removeClass('inp_noInput');
			$('.tanceng .cg_xj_kpyhs_xxl').val('').removeAttr('readonly').removeClass('inp_noInput');
			$('.tanceng .cg_xj_piaozh_xxl').val('').removeAttr('readonly').removeClass('inp_noInput');
			$('.tanceng .cg_xj_sh_xxl').val('').removeAttr('readonly').removeClass('inp_noInput');
		}
		$(this).parent().parent().parent().remove();
		var num = $('.tanceng').children(".dialog_box").length;
		if(num < 1) {
			$(".tanceng").hide();
		}
	})
//$('.tanceng .cght_xjxzlxr_listxxl>li').live('click',function(){
//	$('.tanceng .cg_xj_lxrdhs_xxl').val($(this).attr('tel'));
//})
	//取消 选择报价单
$('.tanceng .cg_xzcgbjd_quxiao_btn_xxl').die().live('click', function() {
		$(this).parent().parent().parent().remove();
		var num = $('.tanceng').children(".dialog_box").length;
		if(num < 1) {
			$(".tanceng").hide();
		}
	})

////回款流程效果
$('.tanceng .xsht_hklc_addbaifen_xxl').die().live('keyup',function(){
	var main_my =parseInt($('.tanceng .cght_cgbjdmain_moneyxxl').html()),arr=[],nums_a=0;// 
	
	$('.tanceng .bargin_tbody').children().find('.xsht_hklc_addbaifen_xxl').each(function(i,v){
		//console.log(v)
		arr.push($(this).val())
	})
	
	$.each(arr, function(i,v) {
		nums_a +=parseInt(v)
	});
	
	$('.tanceng .xsht_hklc_guding_valxxl').val(100-nums_a);
	$(this).parents().find('>td:last-child').children('span.c_r').html($(this).val()*main_my/100)
	$('.tanceng .xsht_hklcmoney_xxl').html(main_my*(100-nums_a)/100)
})
// 删除当前新增元素
        $('.bargin_guanbi').die('click').live('click',function(){
            $(this).closest('.bargin_tr').remove();
            $.each($('.tanceng .bargin_tr'), function (i, v) {
                $('.tanceng .page_59_khlxrNum').eq(i).html(i + 1);
            })
            var main_my = parseInt($('.tanceng .cght_cgbjdmain_moneyxxl').html()),arr=[],nums_a=0;//
	
	$('.tanceng .bargin_tbody').children().find('.xsht_hklc_addbaifen_xxl').each(function(i,v){
		//console.log(v)
		arr.push($(this).val())
	})
	
	$.each(arr, function(i,v) {
		nums_a +=parseInt(v)
	});
       $('.tanceng .xsht_hklc_guding_valxxl').val(100-nums_a);
	//$(this).parents().find('>td:last-child').children('span.c_r').html($(this).val()*main_my/100)
	$('.tanceng .xsht_hklcmoney_xxl').html(main_my*(100-nums_a)/100)     
        });
//添加条款
var numa = [];
var strcs = '';
$('.xsht_add_listxxl').die('click').live('click',function(){
	strcs = '';
		if($('.tanceng .xsht_val_tkmc_xxl').val() == '' || $('.tanceng .xsht_val_tkmc_xxl').val() == '请输入条款名称') {
			alert('请输入条款名称')
			return false;
		} else if($('.tanceng .xsht_val_tknr_xxl').val() == '' || $('.tanceng .xsht_val_tknr_xxl').val() == '请输入条款内容') {
			alert('请输入条款内容')
			return false;
		}
		strcs = $('.tanceng .xsht_val_tknr_xxl').val();
		numa.push({
				'name': $('.tanceng .xsht_val_tkmc_xxl').val(),
				'content': strcs.replace(/\s+/g,'<br/>'),//strcs.replace(/\s+/g,'<br/>')
				'is_custom': '2',
				'fieldname': 'custom_field'
			})
		var zdylist = '';
		$.each(numa, function(i, v) {
					zdylist += '<li class="ht_mb_term" is_add="1" tkmcs="'+numa[i].name+'" contents="'+numa[i].content+'"><div class="t_textinput">';//<span class="mbbj_tkmcs_xxl">条款<span>'+(5+i)+'</span>:
					zdylist += '<div class="muban_terms">' + numa[i].name + '</span></div>';
					zdylist += ' <span class="t_right_span val_dialogTop xsht_xj_tiaokuan_bj_btnxxl" style="color:#f8ac59;right:40px;" name="term_add_zdyxsht" lenname = "' + i + '">编辑</span>';
					zdylist += '<span class="t_right_span xsht_xj_tiaokuan_scbtn_xxl" style="color:#ff6c60;" lenname = "' + i + '">删除</span></div></li>'
				});
//          var worksp_addbghtml1='<div class="t_textinput">\
//              <div class="t_left"><i class="c_r v_hidden">*</i>条款<span class=""><cite class="page_59_barginNum">1</cite></span></div>\
//              <div class="t_right" style="position: relative;"><input type="text" class="time_input c_3" value=""><span class="c_y bargin_exit">编辑</span></div><i class="bargin_guanbi1" style=""></i>\
//              </div>';
            $('.tanceng .xsht_xinjtiaokuan_listxxl').html(zdylist)//.parent().siblings('.worksp_addbx').children('.bargin_t_textinput').after(zdylist);
            $.each($('.tanceng .t_textinput'),function(i,v){
                $('.tanceng .page_59_barginNum').eq(i).html(i + 1);
            })
//          if($('.tanceng .t_textinput').length>1){
////                alert('必须有一个');
//              $('.bargin_guanbi1').show();
//          }
$(this).parent().parent().parent().remove();
		var num = $('.tanceng').children(".dialog_box").length;
		if(num < 1) {
			$(".tanceng").hide();
		}
        });
        	//合同条款编辑
$('.tanceng .xsht_xj_tiaokuan_bj_btnxxl').die().live('click', function() {

	var index = $(this).attr('lenname'),
		html = '',
		nums_bj = '';
	nums_bj = numa[index];
	$('.tanceng .xsht_xjbj_tk_quedbtnxxl').attr('lents',index)
	html += '<div class="dialog_title"><i class="dialog_close">关闭</i><h3 class="dialog_h3">编辑合同条款</h3></div><div class="dialog_text" style="padding:20px 40px;"><div class="t_textinput"><div class="t_left"><i class="c_r">*</i>条款名称</div>';
	html += '<div class="t_right "><input type="text" class="time_input c_3 xsht_xjbjtk_valtit_xxl" value="' + nums_bj.name + '" ></div></div><div class="t_textinput t_textarea"><div class="t_left"><i class="c_r ">*</i>条款内容</div>';
	html += '<div class="t_right ht_mb_right" style="height: 112px;"><textarea class="txt_normal c_3 xsht_xjbjtkcont_xxl" >' + nums_bj.content + '</textarea></div></div></div>';
	$('.tanceng .xsht_tjtk_bj_htmlxxl').html(html)
})
$('.tanceng .xsht_xjbj_tk_quedbtnxxl').die().live('click', function(){
	var ins = $(this).attr('lents')
	if($('.tanceng .xsht_xjbjtk_valtit_xxl').val() == '') {
			alert('请输入条款名称')
			return false;
		} else if($('.tanceng .xsht_xjbjtkcont_xxl').val() == '') {
			alert('请输入条款内容')
			return false;
		}
		numa[ins].name = $('.tanceng .xsht_xjbjtk_valtit_xxl').val();
			numa[ins].content = $('.tanceng .xsht_xjbjtkcont_xxl').val()
			var Aatype = $('.tanceng .xj_tjhttk_btn_xxlA').attr('thetype');
			var zdylist = '';
			$.each(numa, function(i, v) {
					zdylist += '<li class="ht_mb_term" is_add="1" tkmcs="'+numa[i].name+'" contents="'+numa[i].content+'"><div class="t_textinput">';//<span class="mbbj_tkmcs_xxl">条款<span>'+(5+i)+'</span>:
					zdylist += '<div class="muban_terms">' + numa[i].name + '</span></div>';
					zdylist += ' <span class="t_right_span val_dialogTop xsht_xj_tiaokuan_bj_btnxxl" style="right:40px;color:#f8ac59 ;" name="term_add_zdyxsht" lenname = "' + i + '">编辑</span>';
					zdylist += '<span class="t_right_span xsht_xj_tiaokuan_scbtn_xxl" style="color:#ff6c60 ;" lenname = "' + i + '">删除</span></div></li>'
				});
				 $('.tanceng .xsht_xinjtiaokuan_listxxl').html(zdylist)
				$(this).parent().parent().parent().remove();
		var num = $('.tanceng').children(".dialog_box").length;
		if(num < 1) {
			$(".tanceng").hide();
		}
		
});
$('.tanceng .xsht_xj_tiaokuan_scbtn_xxl').die().live('click',function(){
	var _index = $(this).attr('lenname')
	numa.splice(_index, 1);
	var zdylist = '';
	$.each(numa, function(i, v) {
			zdylist += '<li class="ht_mb_term" is_add="1" tkmcs="'+numa[i].name+'" contents="'+numa[i].content+'"><div class="t_textinput">';
			zdylist += '<div class="muban_terms"><span class="mbbj_tkmcs_xxl">' + numa[i].name + '</span></div>';
			zdylist += ' <span class="t_right_span val_dialogTop xsht_xj_tiaokuan_bj_btnxxl" style="right:40px;color:#f8ac59 ;" name="term_add_zdyxsht" lenname = "' + i + '">编辑</span>';
			zdylist += '<span class="t_right_span xsht_xj_tiaokuan_scbtn_xxl" style="color:#ff6c60 ;" lenname = "' + i + '">删除</span></div></li>'
		});
		$('.tanceng .xsht_xinjtiaokuan_listxxl').html(zdylist)
})
//调用合同模板详情
var xsht_mbxx_data = {
	token:token,
	id:''
}
function xsht_mobanxiangqing_ajax(){
	$.ajax({
		type:"get",
		url:SERVER_URL+"contract-template/info",
		data:xsht_mbxx_data,
		dataType:'json',
		success:function(data){
			if(data.code!=0){
				console.log(data.msg)
			}else{
				console.log(data)
				var zdylist = '';
		$.each(data.customdatalist, function(i, v) {
					zdylist += '<li class="ht_mb_term" is_add="0" tkmcs="'+v.name+'" contents="'+v.content+'" name="index_'+i+'"><div class="t_textinput">';//<span class="mbbj_tkmcs_xxl">条款<span>'+(5+i)+'</span>:
					zdylist += '<div class="muban_terms">' + v.name + '</span></div>';
					zdylist += ' <span class="t_right_span val_dialogTop xshtmoban_bjtiaokuan_btnxxl" style="color:#f8ac59;right:0px;" suoyin="index_'+i+'" contents="'+v.content+'" tkmcs="'+v.name+'" name="term_add_mobanzdy" lenname = "' + i + '">编辑</span>';
					zdylist += '</div></li>';
				});
				$('.tanceng .xsht_mobantiaokuan_listxxl').html(zdylist)
			}
		},
		error:function(e){
			
		}
	});
}
$('.tanceng .xshtmoban_bjtiaokuan_btnxxl').die().live('click', function() {

	var html = '';
	
	$('.tanceng .xsht_mobantk_quedbtnxxl').attr('lents',$(this).attr('suoyin'))
	html += '<div class="dialog_title"><i class="dialog_close">关闭</i><h3 class="dialog_h3">编辑合同条款</h3></div><div class="dialog_text" style="padding:20px 40px;"><div class="t_textinput"><div class="t_left"><i class="c_r">*</i>条款名称</div>';
	html += '<div class="t_right "><input type="text" class="time_input c_3 xsht_xjbjmobantk_valtit_xxl" value="' + $(this).parents('li').attr('tkmcs') + '" ></div></div><div class="t_textinput t_textarea"><div class="t_left"><i class="c_r ">*</i>条款内容</div>';
	html += '<div class="t_right ht_mb_right" style="height: 112px;"><textarea class="txt_normal c_3 xsht_xjbjmobantkcont_xxl" >' + $(this).parents('li').attr('contents') + '</textarea></div></div></div>';
	$('.tanceng .xsht_tjtk_bj_htmlxxl').html(html)
})
$('.tanceng .xsht_mobantk_quedbtnxxl').die().live('click', function(){
	var ins = $(this).attr('lents')
	if($('.tanceng .xsht_xjbjmobantk_valtit_xxl').val() == '') {
			alert('请输入条款名称')
			return false;
		} else if($('.tanceng .xsht_xjbjmobantkcont_xxl').val() == '') {
			alert('请输入条款内容')
			return false;
		}
		
			var name = $('.tanceng .xsht_xjbjmobantk_valtit_xxl').val();
			var content = $('.tanceng .xsht_xjbjmobantkcont_xxl').val();
			$('.tanceng .xsht_mobantiaokuan_listxxl').find('li[name="'+ins+'"]').attr({'tkmcs':name,'contents':content,'is_add':2}).children().children('.muban_terms').html(name);
			//var Aatype = $('.tanceng .xj_tjhttk_btn_xxlA').attr('thetype');
			//var zdylist = '';
			//$.each(numa, function(i, v) {
//					zdylist += '<li class="ht_mb_term"><div class="t_textinput">';//<span class="mbbj_tkmcs_xxl">条款<span>'+(5+i)+'</span>:
//					zdylist += '<div class="muban_terms">' + $(this).attr('name') + '</span></div>';
//					zdylist += ' <span class="t_right_span val_dialogTop xsht_xj_tiaokuan_bj_btnxxl" style="right:40px;color:#f8ac59 ;" name="term_add_zdyxsht" lenname = "' + i + '">编辑</span>';
//					zdylist += '<span class="t_right_span xsht_xj_tiaokuan_scbtn_xxl" style="color:#ff6c60 ;" lenname = "' + i + '">删除</span></div></li>'
				//});
				 //$('.tanceng .xsht_xinjtiaokuan_listxxl').html(zdylist)
				$(this).parent().parent().parent().remove();
		var num = $('.tanceng').children(".dialog_box").length;
		if(num < 1) {
			$(".tanceng").hide();
		}
		
});



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
function cght_xzcy_listajax(){
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
$('.val_dialogTop[name="ht_buy_people"]').die().live('click',function(){
	cght_xzcy_listajax()
})

//审批人员操作
var sp_rynum_cg = [];
var buzou = ['步骤一', '步骤二', '步骤三', '步骤四', '步骤五']
$('.tanceng .cg_sprcy_btn_xxl').die().live('click', function() {

		if($('.tanceng .spr_add_xxl').children('li').length < 4) {
			sp_rynum_cg = []
		}
		var trues = $.inArray($('.tanceng .spcy_tree_xxl li.on').attr('userinfoid'), sp_rynum_cg);
		//alert(sp_rynum_cg)
		if(trues != -1) {
			alert('重复了')
		} else {
			if($('.tanceng .spr_add_xxl').children().length > 5) {
				alert('最多只能添加3位喔！')
			} else {
				$('.tanceng .cg_spqian_list_xxl').before('<li userid="' + $('.spcy_tree_xxl li.on').attr('userinfoid') + '"><i class="del_img_1">-</i><em class="icon_personBtn icon_personBtn_msg"><i class="icon_personNext"></i></em><em class="icon_adderBtn"></em><p class="box_adderName">' + $('.spcy_tree_xxl li.on').children('span.list_msg').html() + '</p> <p class="box_addermsg">步骤一</p></li>');
				//$('.tanceng .chuchai_spr')
				sp_rynum_cg.push($('.tanceng .spcy_tree_xxl li.on').attr('userinfoid'));
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
		sp_rynum_cg.splice($.inArray($(this).parent().attr('userid'), sp_rynum_cg), 1);
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
$('.tanceng .val_dialogTop[name="ht_muban_copyR"]').die().live('click', function() {
	$('.csr_renwulist_xxl_cg').html('')
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
			$('.tanceng .csr_renwulist_xxl_cg').append('<li rid="' + $(this).attr('userinfoid') + '"><span>' + $(this).children('.list_msg').html() + '</span><i class="list_choose_delete"></i></li>')
			$(this).find('span.list_check em').addClass('on')
			$(this).addClass('on')
			notli.removeClass('on')
		}, function() {
			$('.csr_renwulist_xxl_cg').find('li[rid=' + $(this).attr('userinfoid') + ']').remove()
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
var csnumss_cg = []
$('.tanceng .csr_queding_btn_cg').die().live('click', function() {
		if($('.tanceng .csr_renwulist_xxl_cg li').length < 1) {
			alert('请选择人员')
			return
		} else {

			if($('.tanceng .csr_add_xxl').children('li').length < 3) {
				csnumss_cg = []
			}
			var truess = $.inArray($('.csr_renwulist_xxl_cg li').attr('rid'), csnumss_cg);
			if(truess != -1) {
				alert('重复了')
			} else {
				$.each($('.tanceng .csr_renwulist_xxl_cg li'), function(i, v) {
						csnumss_cg.push($(this).attr('rid'));
						if($('.tanceng .csr_add_xxl').children().length > 4) {
							alert('最多只能添加3位哦')
						} else {
							$('.tanceng .csr_add_xxl').prepend('<li userid="' + $(this).attr('rid') + '"><i class="del_img_1">-</i><em class="icon_personBtn icon_personBtn_msg"></em><em class="icon_adderBtn"></em><p class="box_adderName">' + $(this).children('span').html() + '</p></li>')
						}

					})
					//alert(csnumss_cg)
			}
			//alert(csnumss_cg)
		}
		$('.csr_renwulist_xxl_cg').html('')
		$(this).parent().parent().parent().remove();
		var num = $('.tanceng').children(".dialog_box").length;
		if(num < 1) {
			$(".tanceng").hide();
		};
	})
	//删除数组中的一位
$('.tanceng .del_img_1').die().live('click', function() {
	csnumss_cg.splice($.inArray($(this).parent().attr('userid'), csnumss_cg), 1);
})

//选择负责部门
	//	dialog tree list  弹窗
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
function cg_fzbm_listajax(){
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
			$('.cg_xzbm_trees_list_xxl').html(tree_list_dialog(datalists, deep));
		}
	},
	error: function(e) {

	}
});
}

$('.tanceng .cg_xzbm_qdbtn_xxl').die().live('click', function() {
		
		var bmuid_cg = $('.tanceng .cg_xzbm_trees_list_xxl li.on').attr('cussortid'),
			bmmcs_cg = $('.tanceng .cg_xzbm_trees_list_xxl li.on').children('span.list_msg').html();
		$('.tanceng .cg_ckbj_fzbm_xxl').val(bmmcs_cg).attr('uid', bmuid_cg).css('color', '#333');
		$('.tanceng .cg_xj_xzfzbms_xxl').val(bmmcs_cg).attr('uid', bmuid_cg).css('color', '#333');
		$(this).parent().parent().parent().remove();
		var num = $('.tanceng').children(".dialog_box").length;
		if(num < 1) {
			$(".tanceng").hide();
		}
	})
	//选择负责人
$('.tanceng .cg_xzfzrs_qued_btn_xxl').die('click').live('click', function() {
		//console.log($('.tanceng .spcy_tree_xxl li.on').attr('userinfoid'),$('.tanceng .spcy_tree_xxl li.on').children('span.list_msg').html())
		var xshtbj_fzrid_cg = $('.tanceng .spcy_tree_xxl li.on').attr('userinfoid'),
			xshtbj_fzrmc_cg = $('.tanceng .spcy_tree_xxl li.on').children('span.list_msg').html(),
			bmmc = $('.tanceng .spcy_tree_xxl li.on').parents('ul').prev('li').children('.list_msg').html(),
			bmid = $('.tanceng .spcy_tree_xxl li.on').parents('ul').prev('li').attr('cussortid');
		$('.tanceng .cg_ckbj_fzr_xxl').val(xshtbj_fzrmc_cg).attr('uid', xshtbj_fzrid_cg).css('color', '#333');
		$('.tanceng .cg_ckbj_fzbm_xxl').val(bmmc).attr('uid',bmid).css('color', '#333');
		$('.tanceng .cg_xj_xzfzrs_xxl').val(xshtbj_fzrmc_cg).attr('uid', xshtbj_fzrid_cg).css('color', '#333');
		$('.tanceng .cg_xj_xzfzbms_xxl').val(bmmc).attr('uid',bmid).css('color', '#333');
		$(this).parent().parent().parent().remove();
		var num = $('.tanceng').children(".dialog_box").length;
		if(num < 1) {
			$(".tanceng").hide();
		}
	})

	//新建采购合同
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
var isPhone=/^((0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/;
var isMobile=/^(?:13\d|15\d)\d{5}(\d{3}|\*{3})$/;
var xsht_huoquspr_data = {
	token:token,
	category:'2',//类别(1销售合同,2采购合同,3员工合同,4其他合同,5采购报价单,6采购退换货）
	thetype:'2'//2
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
				//console.log(splist.checkerList)
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
							sphtml +='<li userid="' +v.id+ '"><em class="icon_personBtn icon_personBtn_msg"><i class="icon_personNext"></i></em><em class="icon_adderBtn"></em><p class="box_adderName">'+v.name+'</p></li>';
						}else{
							sphtml +='<li userid="' +v.id+ '"><em class="icon_personBtn icon_personBtn_msg" style="background-image:url('+getImgUrl(v.face)+');border-radius:50%;"><i class="icon_personNext"></i></em><em class="icon_adderBtn"></em><p class="box_adderName">'+v.name+'</p></li>';
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
$('.cg_xinjian_btns_xxl').die('click').live('click', function() {
	$('.tanceng .cg_xj_xzfzrs_xxl').val(username).attr('uid',tokenid);
	$('.tanceng .cg_xj_xzfzbms_xxl').val(department_name).attr('uid',department_id);
	xsht_huoquspr_ajax();
	$('.tanceng .cg_xj_qdrqs_xxl').val(nowss)
	$('.tanceng .cg_xj_zdrqs_xxl').html(now)
	$.ajax({
		type: "get",
		url: SERVER_URL + "admin/autoload",
		data: {
			token: token,
			args: 'CHT'
		},
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg)
			} else {
				console.log(data)
				$('.tanceng .cg_xj_htbhs_xxl').val(data.data)
				$('.tanceng .cg_xinjs_zdr_xxl').html(username)
			}
		},
		error: function(e) {
			console.log(e)
		}
	});
	//公司账户列表
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
				var zhhtml_cg = '';
				$.each(data.data.dataList, function(i, v) {
					zhhtml_cg += '<li uid="' + v.id + '" shuihao="'+v.tax_no+'" gsid="' + v.company_id + '" khmc="' + v.company_account_name + '" khyh="' + v.account_bank + '" hkzh="' + v.account_num + '">' + v.company_account_name + '</li>';
				});
				$('.tanceng .cg_xzzhs_list_xxl').html(zhhtml_cg)
			}
		},
		error: function(e) {

		}
	});
})
$('.tanceng .cg_xzzhs_list_xxl li').die().live('click', function() {
	$('.tanceng .cg_xzzh_zhxs_xxl').attr('uid', $(this).attr('uid')).val($(this).attr('khmc')).addClass('c_3');
	$('.tanceng .cg_xinj_khmcs_xxl').val($(this).attr('khmc'));
	$('.tanceng .cg_xinj_khyhs_xxl').val($(this).attr('khyh'));
	$('.tanceng .cg_xinj_hkzhs_xxl').val($(this).attr('hkzh'));
	$('.tanceng .cg_xinj_shuihao_xxl').val($(this).attr('shuihao'));
})
//编辑
function gongsizhanghu_list_ajax(){
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
				var zhhtml_cg = '';
				$.each(data.data.dataList, function(i, v) {
					zhhtml_cg += '<li uid="' + v.id + '" shuihao="'+v.tax_no+'" gsid="' + v.company_id + '" khmc="' + v.company_account_name + '" khyh="' + v.account_bank + '" hkzh="' + v.account_num + '">' + v.company_account_name + '</li>';
				});
				$('.tanceng .cg_bjxzgszh_listxxl').html(zhhtml_cg)
			}
		},
		error: function(e) {

		}
	});
}
$('.tanceng .cg_ckbj_xzzh_xxl,.tanceng .cg_ckbj_xzzh_xxl+i').die('click').live('click',function(){
	gongsizhanghu_list_ajax()
})
$('.tanceng .cg_bjxzgszh_listxxl li').die().live('click', function() {
	$('.tanceng .cg_ckbj_xzzh_xxl').attr('uid', $(this).attr('uid'));
	$('.tanceng .cg_ckbj_khmc_xxl').val($(this).attr('khmc'));
	$('.tanceng .cg_ckbj_khyh_xxl').val($(this).attr('khyh'));
	$('.tanceng .cg_ckbj_hkzh_xxl').val($(this).attr('hkzh'));
	$('.tanceng .cg_ckbj_shuihao_xxl').val($(this).attr('shuihao'));
})
$('.tanceng .cg_xj_xzhtmb_btn_xxl').die().live('click', function() {
	cght_mbdata_xxl.name = '';
	cght_mbajax_list()
})
$('.tanceng .cg_xj_xzcgbjds_xxl').die().live('click', function() {
	cgbjd_ajax_xxl()
})
//新建保存
$('.tanceng .cght_xjbaocun_btnxxl').die('click').live('click', function() {
		cg_add_datas_xxl.id = '';
		cg_add_datas_xxl.is_draft = '1';
		cg_add_datas_xxl.is_open = '1';
		cg_add_datas_xxl.purchase_sn = $('.tanceng .cg_xj_htbhs_xxl').val();
//		if(typeof($('.tanceng .cg_ht_xj_htmb_xxl').attr('uid')) == "undefined") {
//			alert('请选择合同模板')
//			return false;
//		}
//		if($('.tanceng .cght_xj_htmc_xxl').val() == '' || $('.tanceng .cght_xj_htmc_xxl').val() == '销售合同名称') {
//			alert('请输入销售合同名称或不能为空');
//			return false;
//		}
		cg_add_datas_xxl.template_id = $('.tanceng .cg_ht_xj_htmb_xxl').attr('uid');
		cg_add_datas_xxl.name = $('.tanceng .cght_xj_htmc_xxl').val();
//		if(typeof($('.tanceng .cg_xj_xzcgbjd_xxl').attr('uid')) == "undefined") {
//			alert('选择采购报价单')
//			return false;
//		}
		cg_add_datas_xxl.quote_id = $('.tanceng .cg_xj_xzcgbjd_xxl').attr('uid');
		
//		if(typeof($('.tanceng .cg_xj_xzfzbms_xxl').attr('uid')) == "undefined"||$('.tanceng .cg_xj_xzfzbms_xxl').attr('uid')=='0'||$('.tanceng .cg_xj_xzfzbms_xxl').val()=='') {
//			alert('没有负责部门不能提交合同')
//			return false;
//		}
		cg_add_datas_xxl.dept_id = $('.tanceng .cg_xj_xzfzbms_xxl').attr('uid');
//		if(typeof($('.tanceng .cg_xj_xzfzrs_xxl').attr('uid')) == "undefined") {
//			alert('请选择负责人')
//			return false;
//		}
		cg_add_datas_xxl.owner_id = $('.tanceng .cg_xj_xzfzrs_xxl').attr('uid');
		cg_add_datas_xxl.sign_time = $('.tanceng .cg_xj_qdrqs_xxl').val();
//		if($('.tanceng .cg_ht_xj_qddd_xxl').val()=='-'){
//			$('.tanceng .cg_ht_xj_qddd_xxl').val('')
//		}
		cg_add_datas_xxl.sign_address = $('.tanceng .cg_ht_xj_qddd_xxl').val();
		cg_add_datas_xxl.need_name = $('.tanceng .cg_xj_ghmc_xxl').val();
//		if($('.tanceng .cg_ht_xj_ghrq_xxl').val() == '') {
//			alert('请输入供货日期-以数字表示')
//			return false;
//		} else if(!isNaN($('.tanceng .cg_ht_xj_ghrq_xxl').val()) && $('.tanceng .cg_ht_xj_ghrq_xxl').val() > 0) {
//			cg_add_datas_xxl.supply_day = $('.tanceng .cg_ht_xj_ghrq_xxl').val();
//		} else {
//			alert('请输入供货日期-以正整数表示')
//			return false;
//		}
		cg_add_datas_xxl.supply_day = $('.tanceng .cg_ht_xj_ghrq_xxl').val();
//		if($('.tanceng .cg_xj_zddds_xxl').val() == '') {
//			alert('请输入指定地点')
//			return false;
//		}
		cg_add_datas_xxl.assign_address = $('.tanceng .cg_xj_zddds_xxl').val();
//		if($('.tanceng .cg_xj_lxrs_xxl').val() == '') {
//			alert('请输入联系人')
//			return false;
//		}
		cg_add_datas_xxl.contact = $('.tanceng .cg_xj_lxrs_xxl').val();
//		if($('.tanceng .cg_xj_lxrdhs_xxl').val() == '' || !isPhone.test($('.tanceng .cg_xj_lxrdhs_xxl').val())&&!isMobile.test($('.tanceng .cg_xj_lxrdhs_xxl').val())) {
//			alert('请输入正确的联系人电话')
//			return false;
//		}
		cg_add_datas_xxl.contact_tel = $('.tanceng .cg_xj_lxrdhs_xxl').val();
//		if(typeof($('.tanceng .cg_xzzh_zhxs_xxl').attr('uid')) == "undefined") {
//			alert('请选择账户')
//			return false;
//		}
		cg_add_datas_xxl.chance_account = $('.tanceng .cg_xzzh_zhxs_xxl').attr('uid');
		cg_add_datas_xxl.open_account = $('.tanceng .cg_xinj_khmcs_xxl').val();
		cg_add_datas_xxl.open_bank = $('.tanceng .cg_xinj_khyhs_xxl').val();
		cg_add_datas_xxl.remit_account = $('.tanceng .cg_xinj_hkzhs_xxl').val();
//		if(typeof($('.tanceng .cg_ht_xj_kjfprq_xxl').attr('readonly'))=='undefined'){
//			if($('.tanceng .cg_ht_xj_kjfprq_xxl').val() == '') {
//			alert('请输入开具发票日期-以数字表示')
//			return false;
//		} else if(!isNaN($('.tanceng .cg_ht_xj_kjfprq_xxl').val()) && $('.tanceng .cg_ht_xj_kjfprq_xxl').val() > 0) {
//			cg_add_datas_xxl.open_ticket = $('.tanceng .cg_ht_xj_kjfprq_xxl').val();
//		} else {
//			alert('请输入开具发票日期-以正整数表示')
//			return false;
//		}
//		}else{
//			
//		}
		cg_add_datas_xxl.open_ticket = $('.tanceng .cg_ht_xj_kjfprq_xxl').val();
//		var bflg = false;
//		$('.tanceng .bargin_tbody').children().find('input').each(function(i,v){
//			console.log($(this))
//			if($(this).val()==''){
//				//alert('回款流程内容不能为空')
//				bflg = false;
//				return false;
//			}else{
//				bflg = true;
//			}
//		})
//		if(bflg){
//			
//		}else{
//			alert('回款流程内容不能为空')
//			return false;
//		}
		
		if($('.tanceng .bargin_tbody').children('tr').length==1){
			cg_add_datas_xxl.steps = '';	
		}else{
			var hklc_arr = [];
			$('.tanceng .bargin_tbody').children('tr').each(function(i,v){
			hklc_arr.push({
				'pay_rate':$(this).children().eq(0).children().children('.t_right').children().children('input').val(),
				'segment':$(this).children().eq(1).children().children('.t_right').find('input').val(),
				'money':$(this).children().eq(2).children('.c_r').html()
			})
		})
		cg_add_datas_xxl.steps = JSON.stringify(hklc_arr);
		}
		
		var xsht_tklist=[]
		if($('.tanceng .xsht_mobantiaokuan_listxxl').html()==''){
			
		}else{
			$('.tanceng .xsht_mobantiaokuan_listxxl').children().each(function(i,v){
			xsht_tklist.push({
				'name':$(this).attr('tkmcs'),
				'content':$(this).attr('contents'),
				'is_add':$(this).attr('is_add')
			})
		})
		}
		if($('.tanceng .xsht_xinjtiaokuan_listxxl').html()==''){
			
		}else{
			$('.tanceng .xsht_xinjtiaokuan_listxxl').children().each(function(i,v){
			xsht_tklist.push({
				'name':$(this).attr('tkmcs'),
				'content':$(this).attr('contents'),
				'is_add':$(this).attr('is_add')
			})
		})
		}
		//console.log(xsht_tklist)
		cg_add_datas_xxl.terms=JSON.stringify(xsht_tklist);
		cg_add_datas_xxl.tax_num = $('.tanceng .cg_xinj_shuihao_xxl').val();
		cg_add_datas_xxl.open_ticket_name = $('.tanceng .cg_xj_kpmcs_xxl').val();
		cg_add_datas_xxl.open_ticket_bank = $('.tanceng .cg_xj_kpyhs_xxl').val();
		cg_add_datas_xxl.account = $('.tanceng .cg_xj_piaozh_xxl').val();
		cg_add_datas_xxl.tax_point = $('.tanceng .cg_xj_sh_xxl').val();
		//cg_add_datas_xxl.reg_address_tel = $('.tanceng .cg_xj_zcdzdhs_xxl').val();
		var flowhtxj_cg = [];
		$.each($('.tanceng .spr_add_xxl>li[userid]'), function(i, v) {
			flowhtxj_cg.push($(this).attr('userid'))
		});
//		if(flowhtxj_cg.length==0){
//			alert('请选择审批人员')
//			return false;
//		}
		var copyxsxj_cg = [];
		$.each($('.tanceng .csr_add_xxl>li[userid]'), function(i, v) {
			copyxsxj_cg.push($(this).attr('userid'))
		});
		cg_add_datas_xxl.flow = flowhtxj_cg.join();
		cg_add_datas_xxl.copy_list = copyxsxj_cg.join();
		console.log(cg_add_datas_xxl)
		cg_add_ajaxs_xxl()
		$(this).parent().parent().parent().remove();
		var num = $('.tanceng').children(".dialog_box").length;
		if(num < 1) {
			$(".tanceng").hide();
		}
	})
//新建
$('.tanceng .cg_xinjian_tjsps_xxl').die('click').live('click', function() {
		cg_add_datas_xxl.id = '';
		cg_add_datas_xxl.is_open = '1';
		cg_add_datas_xxl.purchase_sn = $('.tanceng .cg_xj_htbhs_xxl').val();
		if(typeof($('.tanceng .cg_ht_xj_htmb_xxl').attr('uid')) == "undefined") {
			alert('请选择合同模板')
			return false;
		}
		if($('.tanceng .cght_xj_htmc_xxl').val() == '' || $('.tanceng .cght_xj_htmc_xxl').val() == '销售合同名称') {
			alert('请输入销售合同名称或不能为空');
			return false;
		}
		cg_add_datas_xxl.template_id = $('.tanceng .cg_ht_xj_htmb_xxl').attr('uid');
		cg_add_datas_xxl.name = $('.tanceng .cght_xj_htmc_xxl').val();
		if(typeof($('.tanceng .cg_xj_xzcgbjd_xxl').attr('uid')) == "undefined") {
			alert('选择采购报价单')
			return false;
		}
		cg_add_datas_xxl.quote_id = $('.tanceng .cg_xj_xzcgbjd_xxl').attr('uid');
		
		if(typeof($('.tanceng .cg_xj_xzfzbms_xxl').attr('uid')) == "undefined"||$('.tanceng .cg_xj_xzfzbms_xxl').attr('uid')=='0'||$('.tanceng .cg_xj_xzfzbms_xxl').val()=='') {
			alert('没有负责部门不能提交合同')
			return false;
		}
		cg_add_datas_xxl.dept_id = $('.tanceng .cg_xj_xzfzbms_xxl').attr('uid');
//		if(typeof($('.tanceng .cg_xj_xzfzrs_xxl').attr('uid')) == "undefined") {
//			alert('请选择负责人')
//			return false;
//		}
		cg_add_datas_xxl.owner_id = $('.tanceng .cg_xj_xzfzrs_xxl').attr('uid');
		cg_add_datas_xxl.sign_time = $('.tanceng .cg_xj_qdrqs_xxl').val();
//		if($('.tanceng .cg_ht_xj_qddd_xxl').val()=='-'){
//			$('.tanceng .cg_ht_xj_qddd_xxl').val('')
//		}
		cg_add_datas_xxl.sign_address = $('.tanceng .cg_ht_xj_qddd_xxl').val();
		cg_add_datas_xxl.need_name = $('.tanceng .cg_xj_ghmc_xxl').val();
		if($('.tanceng .cg_ht_xj_ghrq_xxl').val() == '') {
			alert('请输入供货日期-以数字表示')
			return false;
		} else if(!isNaN($('.tanceng .cg_ht_xj_ghrq_xxl').val()) && $('.tanceng .cg_ht_xj_ghrq_xxl').val() > 0) {
			cg_add_datas_xxl.supply_day = $('.tanceng .cg_ht_xj_ghrq_xxl').val();
		} else {
			alert('请输入供货日期-以正整数表示')
			return false;
		}

		if($('.tanceng .cg_xj_zddds_xxl').val() == '') {
			alert('请输入指定地点')
			return false;
		}
		cg_add_datas_xxl.assign_address = $('.tanceng .cg_xj_zddds_xxl').val();
//		if($('.tanceng .cg_xj_lxrs_xxl').val() == '') {
//			alert('请输入联系人')
//			return false;
//		}
		cg_add_datas_xxl.contact = $('.tanceng .cg_xj_lxrs_xxl').val();
//		if($('.tanceng .cg_xj_lxrdhs_xxl').val() == '' || !isPhone.test($('.tanceng .cg_xj_lxrdhs_xxl').val())&&!isMobile.test($('.tanceng .cg_xj_lxrdhs_xxl').val())) {
//			alert('请输入正确的联系人电话')
//			return false;
//		}
		cg_add_datas_xxl.contact_tel = $('.tanceng .cg_xj_lxrdhs_xxl').val();
		if(typeof($('.tanceng .cg_xzzh_zhxs_xxl').attr('uid')) == "undefined") {
			alert('请选择账户')
			return false;
		}
		cg_add_datas_xxl.chance_account = $('.tanceng .cg_xzzh_zhxs_xxl').attr('uid');
		cg_add_datas_xxl.open_account = $('.tanceng .cg_xinj_khmcs_xxl').val();
		cg_add_datas_xxl.open_bank = $('.tanceng .cg_xinj_khyhs_xxl').val();
		cg_add_datas_xxl.remit_account = $('.tanceng .cg_xinj_hkzhs_xxl').val();
		if(typeof($('.tanceng .cg_ht_xj_kjfprq_xxl').attr('readonly'))=='undefined'){
			if($('.tanceng .cg_ht_xj_kjfprq_xxl').val() == '') {
			alert('请输入开具发票日期-以数字表示')
			return false;
		} else if(!isNaN($('.tanceng .cg_ht_xj_kjfprq_xxl').val()) && $('.tanceng .cg_ht_xj_kjfprq_xxl').val() > 0) {
			cg_add_datas_xxl.open_ticket = $('.tanceng .cg_ht_xj_kjfprq_xxl').val();
		} else {
			alert('请输入开具发票日期-以正整数表示')
			return false;
		}
		}else{
			
		}
		var bflg = false;
		$('.tanceng .bargin_tbody').children().find('input').each(function(i,v){
			console.log($(this))
			if($(this).val()==''){
				//alert('回款流程内容不能为空')
				bflg = false;
				return false;
			}else{
				bflg = true;
			}
		})
		if(bflg){
			
		}else{
			alert('回款流程内容不能为空')
			return false;
		}
		var hklc_arr = [];
		$('.tanceng .bargin_tbody').children('tr').each(function(i,v){
			hklc_arr.push({
				'pay_rate':$(this).children().eq(0).children().children('.t_right').children().children('input').val(),
				'segment':$(this).children().eq(1).children().children('.t_right').find('input').val(),
				'money':$(this).children().eq(2).children('.c_r').html()
			})
		})
		cg_add_datas_xxl.steps = JSON.stringify(hklc_arr);
		var xsht_tklist=[]
		$('.tanceng .xsht_mobantiaokuan_listxxl').children().each(function(i,v){
			xsht_tklist.push({
				'name':$(this).attr('tkmcs'),
				'content':$(this).attr('contents'),
				'is_add':$(this).attr('is_add')
			})
		})
		if($('.tanceng .xsht_xinjtiaokuan_listxxl').html()==''){
			
		}else{
			$('.tanceng .xsht_xinjtiaokuan_listxxl').children().each(function(i,v){
			xsht_tklist.push({
				'name':$(this).attr('tkmcs'),
				'content':$(this).attr('contents'),
				'is_add':$(this).attr('is_add')
			})
		})
		}
		console.log(xsht_tklist)
		cg_add_datas_xxl.terms=JSON.stringify(xsht_tklist);
		cg_add_datas_xxl.tax_num = $('.tanceng .cg_xinj_shuihao_xxl').val();
		cg_add_datas_xxl.open_ticket_name = $('.tanceng .cg_xj_kpmcs_xxl').val();
		cg_add_datas_xxl.open_ticket_bank = $('.tanceng .cg_xj_kpyhs_xxl').val();
		cg_add_datas_xxl.account = $('.tanceng .cg_xj_piaozh_xxl').val();
		cg_add_datas_xxl.tax_point = $('.tanceng .cg_xj_sh_xxl').val();
		//cg_add_datas_xxl.reg_address_tel = $('.tanceng .cg_xj_zcdzdhs_xxl').val();
		var flowhtxj_cg = [];
		$.each($('.tanceng .spr_add_xxl>li[userid]'), function(i, v) {
			flowhtxj_cg.push($(this).attr('userid'))
		});
		if(flowhtxj_cg.length==0){
			alert('请选择审批人员')
			return false;
		}
		var copyxsxj_cg = [];
		$.each($('.tanceng .csr_add_xxl>li[userid]'), function(i, v) {
			copyxsxj_cg.push($(this).attr('userid'))
		});
		cg_add_datas_xxl.flow = flowhtxj_cg.join();
		cg_add_datas_xxl.copy_list = copyxsxj_cg.join();
		console.log(cg_add_datas_xxl)
		cg_add_ajaxs_xxl()
		$(this).parent().parent().parent().remove();
		var num = $('.tanceng').children(".dialog_box").length;
		if(num < 1) {
			$(".tanceng").hide();
		}
	})
	//新建采购合同
var cg_add_datas_xxl = {
		token: token,
		id: '',
		purchase_sn: '', //采购合同编号
		template_id: '', //选择合同模板id
		name: '', //采购合同名称
		quote_id: '', //采购报价单id
		dept_id: '', //负责部门id
		owner_id: '', //负责人id
		sign_time: '', //签订日期
		sign_address: '', //签订地点
		need_name: '', //供货单位(甲方
		supply_day: '', //供货日期:合同签订
		assign_address: '', //指定地点
		contact: '', //联系人
		contact_tel: '', //联系人电话
		chance_account: '', //选择账号id
		open_account: '', //开户名称
		open_bank: '', //开户银行
		remit_account: '', //汇款账号
		open_ticket: '', //开具发票
		open_ticket_name: '', //开票名称
		open_ticket_bank: '', //开票银行
		account: '', //开具发票账号
		tax_point: '', //税点
		reg_address_tel: '', //注册地址电话
		flow: '', //审批人
		copy_list: '',
		is_open:'',//0预览 1提交
		steps:'',
		terms:'',
		tax_num:'',  //结算账户-税号
		is_draft:'0'
	}

function cg_add_ajaxs_xxl() {
	$.ajax({
		type: "post",
		url: SERVER_URL + "purchase-contract/add",
		data: cg_add_datas_xxl,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg)
			} else {
				console.log(data)
				if(data.is_open!=0){
					cght_list_ajax_xxl()
					cght_ckyulan_data.is_open = '1';
				}else{
					$('.tanceng').append($(".dialog_box[name='ht_buy_preview']").parent().html()).show();
					$(".tanceng .dialog_box").show();
			        $(".dialog_box[name='ht_buy_preview']").css({
			            "z-index": "1",
			            "position": "absolute"
			        });
			        $('.tanceng .cg_dwsp_ck_juejbtn_xxl').hide();
			         $('.tanceng .cg_dwsp_ck_tongguo_btn_xxl').hide();
					cght_ckyulan_data.id = data.id;
					cght_ckyulan_data.is_open = '0';
					cght_ckyulan_ajax()
				}
				
			}
		},
		error: function(e) {
			console.log(e)
		}
	});
}
//新建预览按钮
$('.tanceng .cght_xinjianyulan_btnxxl').die().live('click',function(){
	cg_add_datas_xxl.id = '';
		cg_add_datas_xxl.is_open = '0';
		cg_add_datas_xxl.purchase_sn = $('.tanceng .cg_xj_htbhs_xxl').val();
		if(typeof($('.tanceng .cg_ht_xj_htmb_xxl').attr('uid')) == "undefined") {
			alert('请选择合同模板')
			return false;
		}
		if($('.tanceng .cght_xj_htmc_xxl').val() == '' || $('.tanceng .cght_xj_htmc_xxl').val() == '销售合同名称') {
			alert('请输入销售合同名称或不能为空');
			return false;
		}
		cg_add_datas_xxl.template_id = $('.tanceng .cg_ht_xj_htmb_xxl').attr('uid');
		cg_add_datas_xxl.name = $('.tanceng .cght_xj_htmc_xxl').val();
		if(typeof($('.tanceng .cg_xj_xzcgbjd_xxl').attr('uid')) == "undefined") {
			alert('选择采购报价单')
			return false;
		}
		cg_add_datas_xxl.quote_id = $('.tanceng .cg_xj_xzcgbjd_xxl').attr('uid');//
		
		if(typeof($('.tanceng .cg_xj_xzfzbms_xxl').attr('uid')) == "undefined"||$('.tanceng .cg_xj_xzfzbms_xxl').attr('uid')=='0') {
			alert('没有负责部门不能提交')
			return false;
		}
		cg_add_datas_xxl.dept_id = $('.tanceng .cg_xj_xzfzbms_xxl').attr('uid');
//		if(typeof($('.tanceng .cg_xj_xzfzrs_xxl').attr('uid')) == "undefined") {
//			alert('请选择负责人')
//			return false;
//		}
		cg_add_datas_xxl.owner_id = $('.tanceng .cg_xj_xzfzrs_xxl').attr('uid');
		cg_add_datas_xxl.sign_time = $('.tanceng .cg_xj_qdrqs_xxl').val();
		cg_add_datas_xxl.sign_address = $('.tanceng .cg_ht_xj_qddd_xxl').val();
		cg_add_datas_xxl.tax_num = $('.tanceng .cg_xinj_shuihao_xxl').val();
		cg_add_datas_xxl.need_name = $('.tanceng .cg_xj_ghmc_xxl').val();
		if($('.tanceng .cg_ht_xj_ghrq_xxl').val() == '') {
			alert('请输入供货日期-以数字表示')
			return false;
		} else if(!isNaN($('.tanceng .cg_ht_xj_ghrq_xxl').val()) && $('.tanceng .cg_ht_xj_ghrq_xxl').val() > 0) {
			cg_add_datas_xxl.supply_day = $('.tanceng .cg_ht_xj_ghrq_xxl').val();
		} else {
			alert('请输入供货日期-以正整数表示')
			return false;
		}

		if($('.tanceng .cg_xj_zddds_xxl').val() == '') {
			alert('请输入指定地点')
			return false;
		}
		cg_add_datas_xxl.assign_address = $('.tanceng .cg_xj_zddds_xxl').val();
//		if($('.tanceng .cg_xj_lxrs_xxl').val() == '') {
//			alert('请输入联系人')
//			return false;
//		}
		cg_add_datas_xxl.contact = $('.tanceng .cg_xj_lxrs_xxl').val();
//		if($('.tanceng .cg_xj_lxrdhs_xxl').val() == '' || !isPhone.test($('.tanceng .cg_xj_lxrdhs_xxl').val())&&!isMobile.test($('.tanceng .cg_xj_lxrdhs_xxl').val())) {
//			alert('请输入正确的联系人电话')
//			return false;
//		}
		cg_add_datas_xxl.contact_tel = $('.tanceng .cg_xj_lxrdhs_xxl').val();
		if(typeof($('.tanceng .cg_xzzh_zhxs_xxl').attr('uid')) == "undefined") {
			alert('请选择账户')
			return false;
		}
		cg_add_datas_xxl.chance_account = $('.tanceng .cg_xzzh_zhxs_xxl').attr('uid');
		cg_add_datas_xxl.open_account = $('.tanceng .cg_xinj_khmcs_xxl').val();
		cg_add_datas_xxl.open_bank = $('.tanceng .cg_xinj_khyhs_xxl').val();
		cg_add_datas_xxl.remit_account = $('.tanceng .cg_xinj_hkzhs_xxl').val();
//		if($('.tanceng .cg_ht_xj_kjfprq_xxl').val() == '') {
//			alert('请输入开具发票日期-以数字表示')
//			return false;
//		} else if(!isNaN($('.tanceng .cg_ht_xj_kjfprq_xxl').val()) && $('.tanceng .cg_ht_xj_kjfprq_xxl').val() > 0) {
//			cg_add_datas_xxl.open_ticket = $('.tanceng .cg_ht_xj_kjfprq_xxl').val();
//		} else {
//			alert('请输入开具发票日期-以正整数表示')
//			return false;
//		}
		if(typeof($('.tanceng .cg_ht_xj_kjfprq_xxl').attr('readonly'))=='undefined'){
			if($('.tanceng .cg_ht_xj_kjfprq_xxl').val() == '') {
			alert('请输入开具发票日期-以数字表示')
			return false;
		} else if(!isNaN($('.tanceng .cg_ht_xj_kjfprq_xxl').val()) && $('.tanceng .cg_ht_xj_kjfprq_xxl').val() > 0) {
			cg_add_datas_xxl.open_ticket = $('.tanceng .cg_ht_xj_kjfprq_xxl').val();
		} else {
			alert('请输入开具发票日期-以正整数表示')
			return false;
		}
		}else{
			
		}
		var bflg = false;
		$('.tanceng .bargin_tbody').children().find('input').each(function(i,v){
			console.log($(this))
			if($(this).val()==''){
				//alert('回款流程内容不能为空')
				bflg = false;
				return false;
			}else{
				bflg = true;
			}
		})
		if(bflg){
			
		}else{
			alert('回款流程内容不能为空')
			return false;
		}
		var hklc_arr = [];
		$('.tanceng .bargin_tbody').children('tr').each(function(i,v){
			hklc_arr.push({
				'pay_rate':$(this).children().eq(0).children().children('.t_right').children().children('input').val(),
				'segment':$(this).children().eq(1).children().children('.t_right').find('input').val(),
				'money':$(this).children().eq(2).children('.c_r').html()
			})
		})
		cg_add_datas_xxl.steps = JSON.stringify(hklc_arr);
		var xsht_tklist=[]
		$('.tanceng .xsht_mobantiaokuan_listxxl').children().each(function(i,v){
			xsht_tklist.push({
				'name':$(this).attr('tkmcs'),
				'content':$(this).attr('contents'),
				'is_add':$(this).attr('is_add')
			})
		})
		if($('.tanceng .xsht_xinjtiaokuan_listxxl').html()==''){
			
		}else{
			$('.tanceng .xsht_xinjtiaokuan_listxxl').children().each(function(i,v){
			xsht_tklist.push({
				'name':$(this).attr('tkmcs'),
				'content':$(this).attr('contents'),
				'is_add':$(this).attr('is_add')
			})
		})
		}
		//console.log(xsht_tklist)
		cg_add_datas_xxl.terms=JSON.stringify(xsht_tklist);
		cg_add_datas_xxl.open_ticket_name = $('.tanceng .cg_xj_kpmcs_xxl').val();
		cg_add_datas_xxl.open_ticket_bank = $('.tanceng .cg_xj_kpyhs_xxl').val();
		cg_add_datas_xxl.account = $('.tanceng .cg_xj_piaozh_xxl').val();
		cg_add_datas_xxl.tax_point = $('.tanceng .cg_xj_sh_xxl').val();
		//cg_add_datas_xxl.reg_address_tel = $('.tanceng .cg_xj_zcdzdhs_xxl').val();
		var flowhtxj_cg = [];
		$.each($('.tanceng .spr_add_xxl>li[userid]'), function(i, v) {
			flowhtxj_cg.push($(this).attr('userid'))
		});
		if(flowhtxj_cg.length==0){
			alert('请选择审批人员')
			return false;
		}
		var copyxsxj_cg = [];
		$.each($('.tanceng .csr_add_xxl>li[userid]'), function(i, v) {
			copyxsxj_cg.push($(this).attr('userid'))
		});
		cg_add_datas_xxl.flow = flowhtxj_cg.join();
		cg_add_datas_xxl.copy_list = copyxsxj_cg.join();
		//console.log(cg_add_datas_xxl)
		cg_add_ajaxs_xxl()
//		$(this).parent().parent().parent().remove();
//		var num = $('.tanceng').children(".dialog_box").length;
//		if(num < 1) {
//			$(".tanceng").hide();
//		}
})
//编辑合同-提交审批
$('.tanceng .cg_ckbj_tjsp_btn_xxl').die().live('click', function() {
		cg_add_datas_xxl.id = $(this).attr('uid');
		cg_add_datas_xxl.is_open = '1';
		cg_add_datas_xxl.purchase_sn = $('.tanceng .cg_ckbj_htbh_xxl').val()
		if($('.tanceng .cg_ckbj_htmc_xxl').val() == '') {
			alert('合同名称不能为空！')
			return false;
		}
		cg_add_datas_xxl.name = $('.tanceng .cg_ckbj_htmc_xxl').val()
		cg_add_datas_xxl.template_id = $('.tanceng .cg_ckbj_xzhtmb_xxl').attr('uid');
		cg_add_datas_xxl.quote_id = $('.tanceng .cg_ckbj_cgbjd_xxl').attr('uid');
		cg_add_datas_xxl.dept_id = $('.tanceng .cg_ckbj_fzbm_xxl').attr('uid');
		cg_add_datas_xxl.owner_id = $('.tanceng .cg_ckbj_fzr_xxl').attr('uid');
		cg_add_datas_xxl.sign_time = $('.tanceng .cg_ckbj_qdrq_xxl').val();
		cg_add_datas_xxl.sign_address = $('.tanceng .cg_ckbj_qddd_xxl').val();
		if($('.tanceng .cg_ckbj_yfmc_xxl').val() == '') {
			alert('供货名称(乙方)')
			return false;
		}
		cg_add_datas_xxl.need_name = $('.tanceng .cg_ckbj_yfmc_xxl').val();
		if($('.tanceng .cg_ckbj_ghrq_xxl').val() == '') {
			alert('请输入供货日期')
			return false;
		}
		cg_add_datas_xxl.supply_day = $('.tanceng .cg_ckbj_ghrq_xxl').val();
		if($('.tanceng .cg_ckbj_zddd_xxl').val() == '') {
			alert('请输入指定地点')
			return false;
		}
		cg_add_datas_xxl.assign_address = $('.tanceng .cg_ckbj_zddd_xxl').val();
		cg_add_datas_xxl.contact = $('.tanceng .cg_ckbj_lxr_xxl').val();
		cg_add_datas_xxl.contact_tel = $('.tanceng .cg_ckbj_lxrdh_xxl').val();
		cg_add_datas_xxl.chance_account = $('.tanceng .cg_ckbj_xzzh_xxl').attr('uid');
		cg_add_datas_xxl.open_account = $('.tanceng .cg_ckbj_khmc_xxl').val();
		cg_add_datas_xxl.open_bank = $('.tanceng .cg_ckbj_khyh_xxl').val();
		cg_add_datas_xxl.tax_num = $('.tanceng .cg_ckbj_shuihao_xxl').val();
		cg_add_datas_xxl.remit_account = $('.tanceng .cg_ckbj_hkzh_xxl').val();
//		if($('.tanceng .cg_ckbj_kjfp_xxl').val() == '') {
//			alert('请输入开具发票')
//			return false;
//		}
//		cg_add_datas_xxl.open_ticket = $('.tanceng .cg_ckbj_kjfp_xxl').val();
		if(typeof($('.tanceng .cg_ckbj_kjfp_xxl').attr('readonly'))=='undefined'){
			if($('.tanceng .cg_ckbj_kjfp_xxl').val() == '') {
			alert('请输入开具发票日期-以数字表示')
			return false;
		} else if(!isNaN($('.tanceng .cg_ckbj_kjfp_xxl').val()) && $('.tanceng .cg_ckbj_kjfp_xxl').val() > 0) {
			cg_add_datas_xxl.open_ticket = $('.tanceng .cg_ckbj_kjfp_xxl').val();
		} else {
			alert('请输入开具发票日期-以正整数表示')
			return false;
		}
		}else{
			
		}
		var bflg = false;
		$('.tanceng .bargin_tbody').children().find('input').each(function(i,v){
			console.log($(this))
			if($(this).val()==''){
				//alert('回款流程内容不能为空')
				bflg = false;
				return false;
			}else{
				bflg = true;
			}
		})
		if(bflg){
			
		}else{
			alert('回款流程内容不能为空')
			return false;
		}
		var hklc_arr = [];
		$('.tanceng .bargin_tbody').children('tr').each(function(i,v){
			hklc_arr.push({
				'pay_rate':$(this).children().eq(0).children().children('.t_right').children().children('input').val(),
				'segment':$(this).children().eq(1).children().children('.t_right').find('input').val(),
				'money':$(this).children().eq(2).children('.c_r').html()
			})
		})
		cg_add_datas_xxl.steps = JSON.stringify(hklc_arr);
		var xsht_tklist=[]
		$('.tanceng .xsht_mobantiaokuan_listxxl').children().each(function(i,v){
			xsht_tklist.push({
				'name':$(this).attr('tkmcs'),
				'content':$(this).attr('contents'),
				'is_add':$(this).attr('is_add')
			})
		})
		if($('.tanceng .xsht_xinjtiaokuan_listxxl').html()==''){
			
		}else{
			$('.tanceng .xsht_xinjtiaokuan_listxxl').children().each(function(i,v){
			xsht_tklist.push({
				'name':$(this).attr('tkmcs'),
				'content':$(this).attr('contents'),
				'is_add':$(this).attr('is_add')
			})
		})
		}
		//console.log(xsht_tklist)
		cg_add_datas_xxl.terms=JSON.stringify(xsht_tklist);
		cg_add_datas_xxl.open_ticket_name = $('.tanceng .cg_ckbj_kpmc_xxl').val();
		cg_add_datas_xxl.open_ticket_bank = $('.tanceng .cg_ckbj_kpyh_xxl').val();
		cg_add_datas_xxl.account = $('.tanceng .cg_ckbj_kpyhzh_xxl').val();
		cg_add_datas_xxl.tax_point = $('.tanceng .cg_ckbj_kpsh_xxl').val();
		//cg_add_datas_xxl.reg_address_tel = $('.tanceng .cg_ckbj_zcdzdh_xxl').val();
		var flowhtbj_cg = [];
		$.each($('.tanceng .spr_add_xxl>li[userid]'), function(i, v) {
			flowhtbj_cg.push($(this).attr('userid'))
		});
		if(flowhtbj_cg.length==0){
			alert('请选择审批人员')
			return false;
		}
		cg_add_datas_xxl.flow = flowhtbj_cg.join();
		var copyxsbj_cg = [];
		$.each($('.tanceng .csr_add_xxl>li[userid]'), function(i, v) {
			copyxsbj_cg.push($(this).attr('userid'))
		});
		cg_add_datas_xxl.copy_list = copyxsbj_cg.join();
		//console.log(cg_add_datas_xxl.flow+'::::'+cg_add_datas_xxl.copy_list)
		cg_add_ajaxs_xxl()
		$(this).parent().parent().parent().remove();
		var num = $('.tanceng').children(".dialog_box").length;
		if(num < 1) {
			$(".tanceng").hide();
		}
	})
$('.tanceng .cght_bianjiyulan_btnxxl').die().live('click', function() {
		cg_add_datas_xxl.id = $(this).attr('uid');
		cg_add_datas_xxl.is_open = '0';
		cg_add_datas_xxl.purchase_sn = $('.tanceng .cg_ckbj_htbh_xxl').val()
		if($('.tanceng .cg_ckbj_htmc_xxl').val() == '') {
			alert('合同名称不能为空！')
			return false;
		}
		cg_add_datas_xxl.name = $('.tanceng .cg_ckbj_htmc_xxl').val()
		cg_add_datas_xxl.template_id = $('.tanceng .cg_ckbj_xzhtmb_xxl').attr('uid');
		cg_add_datas_xxl.quote_id = $('.tanceng .cg_ckbj_cgbjd_xxl').attr('uid');
		cg_add_datas_xxl.dept_id = $('.tanceng .cg_ckbj_fzbm_xxl').attr('uid');
		cg_add_datas_xxl.owner_id = $('.tanceng .cg_ckbj_fzr_xxl').attr('uid');
		cg_add_datas_xxl.sign_time = $('.tanceng .cg_ckbj_qdrq_xxl').val();
		cg_add_datas_xxl.sign_address = $('.tanceng .cg_ckbj_qddd_xxl').val();
		if($('.tanceng .cg_ckbj_yfmc_xxl').val() == '') {
			alert('供货名称(乙方)')
			return false;
		}
		cg_add_datas_xxl.need_name = $('.tanceng .cg_ckbj_yfmc_xxl').val();
		if($('.tanceng .cg_ckbj_ghrq_xxl').val() == '') {
			alert('请输入供货日期')
			return false;
		}
		cg_add_datas_xxl.supply_day = $('.tanceng .cg_ckbj_ghrq_xxl').val();
		if($('.tanceng .cg_ckbj_zddd_xxl').val() == '') {
			alert('请输入指定地点')
			return false;
		}
		cg_add_datas_xxl.assign_address = $('.tanceng .cg_ckbj_zddd_xxl').val();
		cg_add_datas_xxl.contact = $('.tanceng .cg_ckbj_lxr_xxl').val();
		cg_add_datas_xxl.contact_tel = $('.tanceng .cg_ckbj_lxrdh_xxl').val();
		cg_add_datas_xxl.chance_account = $('.tanceng .cg_ckbj_xzzh_xxl').attr('uid');
		cg_add_datas_xxl.open_account = $('.tanceng .cg_ckbj_khmc_xxl').val();
		cg_add_datas_xxl.open_bank = $('.tanceng .cg_ckbj_khyh_xxl').val();
		cg_add_datas_xxl.remit_account = $('.tanceng .cg_ckbj_hkzh_xxl').val();
		cg_add_datas_xxl.tax_num = $('.tanceng .cg_ckbj_shuihao_xxl').val();
//		if($('.tanceng .cg_ckbj_kjfp_xxl').val() == '') {
//			alert('请输入开具发票')
//			return false;
//		}
//		cg_add_datas_xxl.open_ticket = $('.tanceng .cg_ckbj_kjfp_xxl').val();
		if(typeof($('.tanceng .cg_ckbj_kjfp_xxl').attr('readonly'))=='undefined'){
			if($('.tanceng .cg_ckbj_kjfp_xxl').val() == '') {
			alert('请输入开具发票日期-以数字表示')
			return false;
		} else if(!isNaN($('.tanceng .cg_ckbj_kjfp_xxl').val()) && $('.tanceng .cg_ckbj_kjfp_xxl').val() > 0) {
			cg_add_datas_xxl.open_ticket = $('.tanceng .cg_ckbj_kjfp_xxl').val();
		} else {
			alert('请输入开具发票日期-以正整数表示')
			return false;
		}
		}else{
			
		}
		var bflg = false;
		$('.tanceng .bargin_tbody').children().find('input').each(function(i,v){
			console.log($(this))
			if($(this).val()==''){
				//alert('回款流程内容不能为空')
				bflg = false;
				return false;
			}else{
				bflg = true;
			}
		})
		if(bflg){
			
		}else{
			alert('回款流程内容不能为空')
			return false;
		}
		var hklc_arr = [];
		$('.tanceng .bargin_tbody').children('tr').each(function(i,v){
			hklc_arr.push({
				'pay_rate':$(this).children().eq(0).children().children('.t_right').children().children('input').val(),
				'segment':$(this).children().eq(1).children().children('.t_right').find('input').val(),
				'money':$(this).children().eq(2).children('.c_r').html()
			})
		})
		cg_add_datas_xxl.steps = JSON.stringify(hklc_arr);
		var xsht_tklist=[]
		$('.tanceng .xsht_mobantiaokuan_listxxl').children().each(function(i,v){
			xsht_tklist.push({
				'name':$(this).attr('tkmcs'),
				'content':$(this).attr('contents'),
				'is_add':$(this).attr('is_add')
			})
		})
		if($('.tanceng .xsht_xinjtiaokuan_listxxl').html()==''){
			
		}else{
			$('.tanceng .xsht_xinjtiaokuan_listxxl').children().each(function(i,v){
			xsht_tklist.push({
				'name':$(this).attr('tkmcs'),
				'content':$(this).attr('contents'),
				'is_add':$(this).attr('is_add')
			})
		})
		}
		//console.log(xsht_tklist)
		cg_add_datas_xxl.terms=JSON.stringify(xsht_tklist);
		cg_add_datas_xxl.open_ticket_name = $('.tanceng .cg_ckbj_kpmc_xxl').val();
		cg_add_datas_xxl.open_ticket_bank = $('.tanceng .cg_ckbj_kpyh_xxl').val();
		cg_add_datas_xxl.account = $('.tanceng .cg_ckbj_kpyhzh_xxl').val();
		cg_add_datas_xxl.tax_point = $('.tanceng .cg_ckbj_kpsh_xxl').val();
		//cg_add_datas_xxl.reg_address_tel = $('.tanceng .cg_ckbj_zcdzdh_xxl').val();
		var flowhtbj_cg = [];
		$.each($('.tanceng .spr_add_xxl>li[userid]'), function(i, v) {
			flowhtbj_cg.push($(this).attr('userid'))
		});
		if(flowhtbj_cg.length==0){
			alert('请选择审批人员')
			return false;
		}
		cg_add_datas_xxl.flow = flowhtbj_cg.join();
		var copyxsbj_cg = [];
		$.each($('.tanceng .csr_add_xxl>li[userid]'), function(i, v) {
			copyxsbj_cg.push($(this).attr('userid'))
		});
		cg_add_datas_xxl.copy_list = copyxsbj_cg.join();
		//console.log(cg_add_datas_xxl.flow+'::::'+cg_add_datas_xxl.copy_list)
		cg_add_ajaxs_xxl()
//		$(this).parent().parent().parent().remove();
//		var num = $('.tanceng').children(".dialog_box").length;
//		if(num < 1) {
//			$(".tanceng").hide();
//		}
	})


//待我审批
var cg_dwsp_data_ck_xxl = {
	token: token,
	id: ''
}

function cg_dwsp_ck_ajax_xxl() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "purchase-contract/info",
		data: cg_dwsp_data_ck_xxl,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg)
			} else {
				console.log(data)
				var dwsplist_cg = data['data'];
				$('.cg_dwsp_ck_tit').html(likNullData(dwsplist_cg.name));
				$('.cg_dwsp_ck_cjr_xxl').html(likNullData(dwsplist_cg.created_at));
				$('.cg_dwsp_ck_cjr_xxl').html(likNullData(dwsplist_cg.uname))
				$('.cg_dwsp_ck_htbhs_xxl').html(likNullData(dwsplist_cg.purchase_sn));
				$('.cg_dwsp_ck_cgddbh_xxl').html(likNullData(dwsplist_cg.purchase_order_sn));
				$('.cg_dwsp_ck_cgbjdbh_xxl').html(likNullData(dwsplist_cg.purchase_quote_sn));
				$('.cg_dwsp_htmcs_xxl').html(likNullData(dwsplist_cg.name));
				$('.cg_dwsp_ck_juejbtn_xxl').attr('uid',dwsplist_cg.id)
				$('.cg_dwsp_ck_tongguo_btn_xxl').attr('uid',dwsplist_cg.id)
				if(data.data.status == 3) {
					$('.cg_dwsp_status_xxl').css('display', 'block')
					$('.cg_dwsp_status_no_xxl').css('display', 'none')
					$('.cg_dwsp_ck_juejbtn_xxl').attr('disabled','disabled')
					$('.cg_dwsp_ck_tongguo_btn_xxl').attr('disabled','disabled')
				} else if(data.data.status == 2){
					$('.cg_dwsp_status_xxl').css('display', 'none')
					$('.cg_dwsp_status_no_xxl').css('display', 'block')
					$('.cg_dwsp_ck_juejbtn_xxl').attr('disabled','disabled')
					$('.cg_dwsp_ck_tongguo_btn_xxl').attr('disabled','disabled')
				}else{
					$('.cg_dwsp_status_xxl').css('display', 'none')
					$('.cg_dwsp_status_no_xxl').css('display', 'none')
					$('.cg_dwsp_ck_juejbtn_xxl').removeAttr('disabled')
				$('.cg_dwsp_ck_tongguo_btn_xxl').removeAttr('disabled')
				}
				$('.cg_dwsp_ck_yulan_btnxxl').attr({'uid': dwsplist_cg.id,'status':data.data.status,'iszuofei':dwsplist_cg.is_invalid,'htbh':dwsplist_cg.purchase_sn});
				$('.cg_dwsp_ck_ghsmc_xxl').html(likNullData(dwsplist_cg.supplier_name));
				$('.cg_dwsp_ck_shzt_xxl').html(likNullData(dwsplist_cg.status_name));
				var flownamess_cgs = []
				$.each(data.data.flow_info, function(i, v) {
					flownamess_cgs.push(v.name)
				});
				$('.cg_dwsp_ck_shr_xxl').html(flownamess_cgs.join());
				
				$('.cg_dwsp_ck_fzbms_xxl').html(likNullData(dwsplist_cg.dept_name))
				$('.cg_dwsp_ck_fzr_xxl').html(likNullData(dwsplist_cg.owner_name));
				if(dwsplist_cg.check_log.length == 0) {
					$('.cg_dwsp_yjlists_xxl').html('')
				} else {
					var fbyj_listhtml = '';
					fbyj_listhtml +='<div class="sq_look_check_box">';
					fbyj_listhtml +='<div class="xs_sp_result"><h3 class="cont_title" style="margin-left: 36px;">审批结果</h3></div>';
                    fbyj_listhtml +='<div class="work_spiliubox" style="margin-top:0;background: #fff;">';
                    $.each(dwsplist_cg.check_log, function(i,v) {
                    	fbyj_listhtml +='<div class="work_spiliu">';
                        fbyj_listhtml +='<div class="work_spiliu_items" style="overflow: hidden;">';    
                        fbyj_listhtml +='<div class="left" style="position: relative;">';        
                        fbyj_listhtml +='<div class="work_spiliu_div">';            
                        fbyj_listhtml +='<img class="inline_block tx" src="'+getImgUrl(v.face)+'">';//static/images/touxiang.png  
                        //if(v.id == tokenid){
                        	//fbyj_listhtml +='<h3 class="work_sp_h3">我</h3>'; 
                        //}else{
                        	fbyj_listhtml +='<h3 class="work_sp_h3">'+likNullData(v.name)+'</h3>'; 
                       // }
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
//					$.each(dwsplist_cg.check_log, function(i, v) {
//						fbyj_listhtmls_cg += ' <div class="work_spiliu"><div class="work_spiliu_items"><div class="left" style="position: relative;">';
//
//						if(v.uid == tokenid) {
//							fbyj_listhtmls_cg += '<img class="inline_block tx" src="' + v.face + '"><cite class="b_h"></cite></div>';
//							fbyj_listhtmls_cg += '<div class="right auto_height"><img src="static/images/work_jiantou.png"><div class="sp_cont">';
//							fbyj_listhtmls_cg += '<div><h3 class="c_3">我</h3><span class="c_9 m_left_5">' + v.day + '</span></div>';
//						} else {
//							fbyj_listhtmls_cg += '<img class="inline_block tx" src="' + v.face + '"><cite class="b_y"></cite></div>';
//							fbyj_listhtmls_cg += '<div class="right auto_height" ><img src="static/images/work_jiantou.png"><div class="sp_cont">';
//							fbyj_listhtmls_cg += '<div><h3 class="c_3">' + v.name + '</h3><span class="c_9 m_left_5">' + v.day + '</span></div>';
//						}
//						if(i == 0) {
//							fbyj_listhtmls_cg += '<h3 class=" f_color">发起审批</h3>';
//						} else {
//							if(v.status == 1) {
//								fbyj_listhtmls_cg += '<h3 class="c_b" style="color:#f8ac59;">进行中</h3>'
//							} else if(v.status == 2) {
//								fbyj_listhtmls_cg += '<h3 class="c_r" style="color:#ff6c60;">未通过</h3>'
//							} else {
//								fbyj_listhtmls_cg += '<h3 class="c_g">通过审批</h3>'
//							}
//
//						}
//						fbyj_listhtmls_cg += '<p class="c_3 work_sp_p">' + v.note + '</p></div></div><div style="clear: both;height: 0;font-size: 1px;line-height: 0px;"></div></div></div>'
//					});
					$('.cg_dwsp_yjlists_xxl').html(fbyj_listhtml)
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
$('.dwsp_cg_ckbtn_xxl').die().live('click', function() {
		cg_dwsp_data_ck_xxl.id = $(this).attr('uid')
		cg_dwsp_ck_ajax_xxl()
	})
	//预览 待我审批查看
$('.cg_dwsp_ck_yulan_btnxxl').die().live('click', function() {
	$('.tanceng .daochu_cg').attr('htbh',$(this).attr('htbh'));
	if($(this).attr('status')==1&&$(this).attr('iszuofei')!=1){
		$('.tanceng .cg_dwsp_ck_juejbtn_xxl').attr('uid',$(this).attr('uid')).removeAttr('disabled').show();
		$('.tanceng .cg_dwsp_ck_tongguo_btn_xxl').attr('uid',$(this).attr('uid')).removeAttr('disabled').show();
	}else{
		$('.tanceng .cg_dwsp_ck_juejbtn_xxl').attr('disabled','disabled').hide();
		$('.tanceng .cg_dwsp_ck_tongguo_btn_xxl').attr('disabled','disabled').hide();	
	}
	
		cght_ckyulan_data.id = $(this).attr('uid');
		cght_ckyulan_data.is_open = '1';
		cght_ckyulan_ajax()
	})
	//审批-Btn
$('.dwsp_cg_sp_btn_xxl').die().live('click', function() {
		$('.tanceng .cg_dwsp_jujuetgs_btn_xxl').attr('uid', $(this).attr('uid')).removeAttr('disabled').addClass('but_red').removeClass('but_grey1');
		$('.tanceng .cg_dwsp_tgsps_btn_xxl').attr('uid', $(this).attr('uid')).removeAttr('disabled').addClass('but_blue').removeClass('but_grey1');
		//$('.tanceng .cg_dwsp_jujuetgs_btn_xxl').addClass('but_grey1').removeClass('but_red').attr('disabled','disabled');
		//$('.tanceng .cg_dwsp_tgsps_btn_xxl').addClass('but_grey1').removeClass('but_blue').attr('disabled','disabled');
		cght_ckyulan_data.id = $(this).attr('uid');
		cght_ckyulan_data.is_open = '1';
		cght_ckyulan_ajax()
	})
	//通过审批
$('.tanceng .cg_dwsp_jujuetgs_btn_xxl').die().live('click', function() {
	$('.tanceng .cg_dwsp_spyj_qds_btnxxl').attr({
		'ztid': 2,
		'uid': $(this).attr('uid')
	})
})
$('.tanceng .cg_dwsp_tgsps_btn_xxl').die().live('click', function() {
	$('.tanceng .cg_dwsp_spyj_qds_btnxxl').attr({
		'ztid': 1,
		'uid': $(this).attr('uid')
	})
})
//查看里的拒绝 通过按钮
$('.cg_dwsp_ck_juejbtn_xxl').die().live('click',function(){
	$('.tanceng .cg_dwsp_spyj_qds_btnxxl').attr({
		'ztid': 2,
		'uid': $(this).attr('uid')
	})
})
$('.cg_dwsp_ck_tongguo_btn_xxl').die().live('click',function(){
	$('.tanceng .cg_dwsp_spyj_qds_btnxxl').attr({
		'ztid': 1,
		'uid': $(this).attr('uid')
	})
})
var cg_dwsp_spyj_datas_xxl = {
	token: token,
	check_type: '', //1通过2拒绝
	id: '',
	note: ''
}

function cg_dwsp_spyj_ajax_xxl() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "purchase-contract/check",
		data: cg_dwsp_spyj_datas_xxl,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg)
			} else {
				console.log(data)
				$('.tanceng .cg_dwsp_jujuetgs_btn_xxl').addClass('but_grey1').removeClass('but_red').attr('disabled','disabled');
				$('.tanceng .cg_dwsp_tgsps_btn_xxl').addClass('but_grey1').removeClass('but_blue').attr('disabled','disabled');
				cght_data_xxl.thetype = 2;
				cght_list_ajax_xxl()
				$('.tanceng').css('display', 'none')
			}
		},
		error: function(e) {
			console.log(e)

		}
	});
}
$('.tanceng .cg_dwsp_spyj_qds_btnxxl').die().live('click', function() {
	cg_dwsp_spyj_datas_xxl.check_type = $(this).attr('ztid');
	cg_dwsp_spyj_datas_xxl.id = $(this).attr('uid');
	if($('.tanceng .cg_dwsp_spyj_vals_xxl').val() == '' || $('.tanceng .cg_dwsp_spyj_vals_xxl').val() == '请输入审批意见') {
//		alert('审批意见不能为空喔!!!')
//		return false;
		$('.tanceng .cg_dwsp_spyj_vals_xxl').val('');
	}
	cg_dwsp_spyj_datas_xxl.note = $('.tanceng .cg_dwsp_spyj_vals_xxl').val();
	cg_dwsp_spyj_ajax_xxl()
	$('.cg_dwsp_youce_chakan_boxxxl').css('display', 'none')
	$('.tanceng').empty().hide();
//	$(this).parent().parent().parent().remove();
//	var num = $('.tanceng').children(".dialog_box").length;
//	if(num < 1) {
//		$(".tanceng").hide();
//	};
})

//抄送我的 -查看
var cg_cswd_ck_btn_xxl = {
	token: token,
	id: ''
}

function cg_cswd_ck_ajax_xxl() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "purchase-contract/info",
		data: cg_cswd_ck_btn_xxl,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg)
			} else {
				console.log(data)
				var cswdlist_cg = data['data'];
				$('.cg_cswd_tit_xxl').html(likNullData(cswdlist_cg.name));
				$('.cg_cswd_cjrqs_xxl').html(likNullData(cswdlist_cg.created_at));
				$('.cg_cswd_cjrs_xxl').html(likNullData(cswdlist_cg.uname))
				$('.cg_cswd_htbhs_xxl').html(likNullData(cswdlist_cg.purchase_sn));
				$('.cg_cswd_cgddbhs_xxl').html(likNullData(cswdlist_cg.purchase_order_sn));
				$('.cg_cswd_cgbjdbhs_xxl').html(likNullData(cswdlist_cg.purchase_quote_sn));
				$('.cg_cswd_htmcs_xxl').html(likNullData(cswdlist_cg.name));
				$('.cg_cswd_yulan_btn_xxl').attr({'uid':cswdlist_cg.id,'htbh':cswdlist_cg.purchase_sn})
				$('.cg_cswd_ghsmcs_xxl').html(likNullData(cswdlist_cg.supplier_name));
				$('.cg_cswd_shzts_xxl').html(likNullData(cswdlist_cg.status_name));
				var flow_cswd_cgs = []
				$.each(data.data.flow_info, function(i, v) {
					flow_cswd_cgs.push(v.name)
				});
				$('.cg_cswd_shrs_xxl').html(flow_cswd_cgs.join());
				$('.cg_cswd_fzbms_xxl').html(likNullData(cswdlist_cg.dept_name))
				$('.cg_cswd_fzrs_xxl').html(likNullData(cswdlist_cg.owner_name));
				if(cswdlist_cg.check_log.length == 0) {
					$('.cg_cswd_spyj_lists_xxl').html('')
				} else {
					var fbyj_listhtml = '';
					fbyj_listhtml +='<div class="sq_look_check_box">';
					fbyj_listhtml +='<div class="xs_sp_result"><h3 class="cont_title" style="margin-left: 36px;">审批结果</h3></div>';
                    fbyj_listhtml +='<div class="work_spiliubox" style="margin-top:0;background: #fff;">';
                    $.each(cswdlist_cg.check_log, function(i,v) {
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
//					$.each(cswdlist_cg.check_log, function(i, v) {
//						cswdyj_listhtmls_cg += ' <div class="work_spiliu"><div class="work_spiliu_items"><div class="left" style="position: relative;">';
//
//						if(v.uid == tokenid) {
//							cswdyj_listhtmls_cg += '<img class="inline_block tx" src="' + v.face + '"><cite class="b_h"></cite></div>';
//							cswdyj_listhtmls_cg += '<div class="right auto_height"><img src="static/images/work_jiantou.png"><div class="sp_cont">';
//							cswdyj_listhtmls_cg += '<div><h3 class="c_3">我</h3><span class="c_9 m_left_5">' + v.day + '</span></div>';
//						} else {
//							cswdyj_listhtmls_cg += '<img class="inline_block tx" src="' + v.face + '"><cite class="b_y"></cite></div>';
//							cswdyj_listhtmls_cg += '<div class="right auto_height" ><img src="static/images/work_jiantou.png"><div class="sp_cont">';
//							cswdyj_listhtmls_cg += '<div><h3 class="c_3">' + v.name + '</h3><span class="c_9 m_left_5">' + v.day + '</span></div>';
//						}
//						if(i == 0) {
//							cswdyj_listhtmls_cg += '<h3 class=" f_color">发起审批</h3>';
//						} else {
//							if(v.status == 1) {
//								cswdyj_listhtmls_cg += '<h3 class="c_b" style="color:#f8ac59;">进行中</h3>'
//							} else if(v.status == 2) {
//								cswdyj_listhtmls_cg += '<h3 class="c_r" style="color:#ff6c60;">未通过</h3>'
//							} else {
//								cswdyj_listhtmls_cg += '<h3 class="c_g">通过审批</h3>'
//							}
//
//						}
//						cswdyj_listhtmls_cg += '<p class="c_3 work_sp_p">' + v.note + '</p></div></div><div style="clear: both;height: 0;font-size: 1px;line-height: 0px;"></div></div></div>'
//					});
					$('.cg_cswd_spyj_lists_xxl').html(fbyj_listhtml)
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
$('.cswd_cg_ckbtn_xxl').die().live('click', function() {
		//console.log($(this).attr('uid'))
		cg_cswd_ck_btn_xxl.id = $(this).attr('uid');
		cg_cswd_ck_ajax_xxl()
	})
	//抄送我的 预览
$('.cg_cswd_yulan_btn_xxl').die().live('click', function() {
	$('.tanceng .daochu_cg').attr('htbh',$(this).attr('htbh'));
	$('.tanceng .cg_dwsp_ck_juejbtn_xxl').hide();
	$('.tanceng .cg_dwsp_ck_tongguo_btn_xxl').hide();
	cght_ckyulan_data.id = $(this).attr('uid');
	cght_ckyulan_data.is_open = '1';
	cght_ckyulan_ajax()
})

//查看采购报价单
    $('.cght_cgbjdxq_btnxxl').die('click').live('click', function () {
    	$('.pur_quote_look_detail_btn').attr('uid',$(this).attr('uid'))
        $('.ht_slid_list li:first-of-type').trigger('click');
        $('.slider_head_list').css('display', 'none');
        purQuoteCurrentId = $(this).attr('uid');
        $.ajax({
            url: SERVER_URL + '/buy-quote/detail',
            type: 'GET',
            data: {
                token: token,
                buy_quote_id: purQuoteCurrentId
            },
            async: false,
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var data = oE.data;
                    console.log(data);
                    //关联订单id
                    purQuoteLinkOrderId = data['order_id'];
                    //采购报价单名称
                    $('.pur_quote_look_name').html(data['supplier_name']);
                    //采购报价单创建时间
                    $('.pur_quote_look_created_at').html(data['created_at']);
                    //采购报价单编号
                    $('.pur_quote_look_code_sn').html(data['code_sn']);
                    //采购报价单供应商名称
                    $('.pur_quote_look_supplier_name').html(data['supplier_name']);
                    //采购报价单关联采购订单
                    $('.pur_quote_look_buy_order_sn').html(data['buy_order_sn']);
                    //采购报价单关联采购合同
                    $('.pur_quote_look_purchase_code_sn').html(data['purchase_code_sn']);
                    //采购报价单审批状态
                    if (data['status'] == 1) {
                        $('.pur_quote_look_status_name').html('审批中');
                        $('#pur_quote_look_more_btn_list').html('<li class="but_mix but_r val_dialog" name="cg_cgbjd_delete">删除</li>');
                    } else if (data['status'] == 2) {
                        $('.pur_quote_look_status_name').html('未通过');
                        $('#pur_quote_look_more_btn_list').html('<li class="but_mix but_r val_dialog pur_quote_look_edit_btn" name="cg_cgbjd_edit">编辑</li><li class="but_mix but_r val_dialog" name="cg_cgbjd_delete">删除</li>');
                    } else if (data['status'] == 3) {
                        $('.pur_quote_look_status_name').html('已通过');
                        $('#pur_quote_look_more_btn_list').html('<li class="but_mix but_r val_dialog" name="cg_cgbjd_delete">删除</li>');
                    }
                    //采购报价单采购商品
                    $('.pur_quote_look_product_name').html(data['product_name']);
                    //采购报价单税率
                    $('.pur_quote_look_goods_tax_rate').html(data['tax_rate'] == 0 ? '无税' : '含17%税');
                    //采购报价单总金额
                    $('.pur_quote_look_totals').html(data['product_json']['totals']);

                    //审批阶段
                    //审批流程
                    var checkHtml = '';
                    var flowOrderArr2 = ['', '步骤一', '步骤二', '步骤三', '步骤四', '步骤五', '步骤六', '步骤七'];
                    if (data['check_log'].length != 0) {
                        $('.sq_look_check_box').removeClass('none');
                        $.each(data['check_log'], function (i, v) {
                            var checkStatusName = '';
                            var checkCiteClass = '';
                            var checkStatusClass = '';
                            if (v['status'] == 0) {
                                checkStatusName = '未审批';
                                checkCiteClass = 'b_h';
                                checkStatusClass = 'c_9';
                            } else if (v['status'] == 1) {
                                checkStatusName = '审批中';
                                checkCiteClass = 'b_y';
                                checkStatusClass = 'c_y';
                            } else if (v['status'] == 2) {
                                checkStatusName = '未通过';
                                checkCiteClass = 'b_r';
                                checkStatusClass = 'c_r';
                            } else if (v['status'] == 3) {
                                checkStatusName = '通过审批';
                                checkCiteClass = 'b_g';
                                checkStatusClass = 'c_g';
                            } else if (v['status'] == 9) {
                                checkCiteClass = 'b_b';
                                checkStatusClass = 'f_color bold';
                                checkStatusName = '发起审批';
                            }
                            checkHtml += '<div class="work_spiliu">\
                                <div class="work_spiliu_items" style="overflow: hidden;">\
                                <div class="left" style="position: relative;">\
                                <div class="work_spiliu_div">\
                                <img class="inline_block tx" src="' + getImgUrl(v['face']) + '">\
                                <h3 class="work_sp_h3">' + v['name'] + '</h3>\
                                <span class="c_9 m_left_5 ' + (data['current_check'] == 1 ? 'none1' : '') + '">' + flowOrderArr2[i] + '</span>\
                                </div>\
                                <cite class="' + checkCiteClass + '"></cite>\
                                </div>\
                                <div class="auto_height">\
                                <img src="static/images/work_jiantou.png">\
                                <div class="sp_cont">\
                                <div class="sp_cont_a">\
                                <h3 class="' + checkStatusClass + '">' + checkStatusName + '</h3>\
                                <p class="c_9">' + v['day'] + '</p>\
                                </div>\
                                <p class="c_3 work_sp_p ' + (v['status'] == 9 ? 'none' : '') + '">' + v['note'] + '</p>\
                                </div>\
                                </div>\
                                <div style="clear: both;height: 0;font-size: 1px;line-height: 0px;"></div>\
                                </div>\
                                </div>';
                        });
                        $('.pur_quote_look_check_list').html(checkHtml);
                    } else {
                        $('.sq_look_check_box').addClass('none');
                    }
                }
            }
        })
    });
 //采购报价单详情函数
 $('.pur_quote_look_detail_btn').die().live('click',function(){
 	getPurQuoteDetailFn($(this).attr('uid'));
 })
    function getPurQuoteDetailFn(purQuoteCurrentId) {
        $.ajax({
            url: SERVER_URL + '/buy-quote/detail',
            type: 'GET',
            data: {
                token: token,
                buy_quote_id: purQuoteCurrentId
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var data = oE.data;
                    console.log(data);
                    //采购报价单名称
                    $('.tanceng .pur_quote_look_name').html(data['supplier_name']);
                    //采购报价单创建时间
                    $('.tanceng .pur_quote_look_created_at').html(data['created_at'].split(' ')[0]);
                    //采购报价单创建人
                    $('.tanceng .pur_quote_look_uname').html(data['uname']);
                    //采购报价单创建人电话
                    $('.tanceng .pur_quote_look_uname_tel').html(data['mobile']);
                    //采购报价单编号
                    $('.tanceng .pur_quote_look_code_sn').html(data['code_sn']);
                    //采购报价单供应商名称
                    $('.tanceng .pur_quote_look_supplier_name').html(data['supplier_name']);
                    //负责部门
                    $('.tanceng .pur_quote_look_dept_name').html(data['dept_name']);
                    //负责人
                    $('.tanceng .pur_quote_look_owner_name').html(data['owner_name']);
                    //商品信息
                    if (data['product_json']) {
                        var productInfo = data['product_json'];
                        //基本商品信息
                        if (productInfo['goods']) {
                            //基本商品
                            var goodsInfo = productInfo['goods']['goods'];
                            var goodsHtml = '';
                            $('.tanceng .pur_quote_detail_goods_box').css('display', 'block');
                            $.each(goodsInfo, function (i, v) {
                                goodsHtml += '<tr>\
                                        <td class="noprint">' + l_dbl(i + 1) + '</td>\
                                        <td class="noprint">' + v['good_sn'] + '</td>\
                                        <td class="xs_print_name">' + v['good_name'] + '</td>\
                                        <td class="xs_print_sx">' + v['good_attr'] + '</td>\
                                        <td class="noprint">' + v['good_num'] + v['good_unit'] + '</td>\
                                        <td class="xs_bjd_td xs_goods_box xs_print_price" style="position: relative;padding:8px 10px;">\
                                            <div>\
                                            <span>￥' + v['good_price'] + '</span><i class="' + (v['up_down'] == 1 ? 'ven_warning_arrow_up' : 'ven_warning_arrow') + ' xs_goods_down_img" style="' + (v['up_down'] == 0 ? 'display: none;' : '') + '"></i>\
                                            </div>\
                                            <div class="work_vent_client_contMsgBox" style="display: none;top: 4px;left: 94px">\
                                            <i class="work_vent_client_torr"></i>\
                                            <div class="work_vent_client_contMsgBoxDet fnc_output_ticket_total_remain_ticket_num_list">' + (v['up_down'] == 1 ? '高' : '低') + '于 ' + v['good_last_price'] + '(上次报价)</div>\
                                        </div>\
                                        </td>\
                                        <td class="none xs_print_sl">' + v['good_num'] + v['good_unit'] + '</td>\
                                        <td class="noprint">￥' + v['good_rate_price'] + '</td>\
                                        <td class="xs_print_total">￥' + v['good_total'] + '</td>\
                                        <td class="noprint"></td>\
                                        </tr>';
                            });
                            $('.tanceng .pur_quote_detail_goods_list').html(goodsHtml);
                        } else {
                            $('.tanceng .pur_quote_detail_goods_box').css('display', 'none');
                        }
                        //整机商品信息
                        var settingHtml = '';
                        if (productInfo['setting']) {
                            $('.tanceng .pur_quote_detail_setting_box').css('display', 'block');
                            var settingArr = productInfo['setting']['setting'];
                            console.log(settingArr);
                            $.each(settingArr, function (i, v) {
                                var settingGoods = '';
                                //可选配
                                $.each(v['good_list'], function (i2, v2) {
                                    var settingGoodsInfo = '';
                                    $.each(v2['attr_list'], function (i3, v3) {
                                        settingGoodsInfo += '<tr class="xs_print_complete_a">\
                                        <td width="140" class="noprint">' + v3['good_sn'] + '</td>\
                                        <td width="150" class="none xs_print_name">' + v2['title'] + '</td>\
                                        <td width="560" class="xs_print_sx">' + v3['good_attr'] + '</td>\
                                        <td width="50" class="noprint">' + v3['total_num'] + '</td>\
                                        <td width="150" class="xs_bjd_td xs_goods_box xs_print_price" style="position: relative;"><div>￥' + v3['good_price'] + '<i class="' + (v3['up_down'] == 1 ? 'ven_warning_arrow_up' : 'ven_warning_arrow') + ' xs_goods_down_img ' + (v3['up_down'] == 0 ? 'none' : '') + '"></i>\
                            </div>\
                            <div class="work_vent_client_contMsgBox" style="display: none;top: 3px;left: 94px">\
                            <i class="work_vent_client_torr"></i>\
                            <div class="work_vent_client_contMsgBoxDet fnc_output_ticket_total_remain_ticket_num_list" style="font-weight: 100;">' + (v3['up_down'] == 1 ? '高' : '低') + '于 ' + v3['good_last_price'] + '(上次报价)</div>\
                            </div></td>\
                            <td  width="50" class="none xs_print_sl">' + v3['total_num'] + '</td>\
                                        <td width="90" class="noprint">￥' + v3['good_rate_price'] + '</td>\
                                        <td width="90" class="xs_print_total">￥' + v3['good_total'] + '</td>\
                                        <td width="60" class="noprint"></td>\
                                        </tr>';
                                    });
                                    settingGoods += '<table class="xs_bjd_table_1 xs_print_bjd_goods_table">\
                                        <thead class="noprint">\
                                        <tr style="background: #fff;">\
                                        <th class="c_3" style="font-weight: 100;">' + v2['title'] + '</th>\
                                        <th></th>\
                                        <th></th>\
                                        </tr>\
                                        <tr>\
                                        <th width="140">编号</th>\
                                        <th width="560">属性</th>\
                                        <th width="50">数量</th>\
                                        <th width="150">单价</th>\
                                        <th width="90">含税价</th>\
                                        <th width="90">总价</th>\
                                        <th width="60"></th>\
                                        </tr>\
                                        </thead>\
                                        <tbody>' + settingGoodsInfo + '</tbody>\
                                        </table>'
                                });

                                settingHtml += '<div class="xs_div_2" ' + (i == 0 ? ' style="margin-top: 20px;"' : '') + '>\
                            <table class="xs_bjd_table xs_print_bjd_goods_table">\
                            <thead class="' + (i == 0 ? '' : 'none') + ' noprint">\
                            <tr>\
                            <th width="30">序号</th>\
                            <th width="140">编号</th>\
                            <th width="150">名称</th>\
                            <th width="340">属性</th>\
                            <th width="50">数量</th>\
                            <th width="150">单价</th>\
                            <th width="90">含税价</th>\
                            <th width="90">总价</th>\
                            <th width="60">配件</th>\
                            </tr>\
                            </thead>\
                            <tbody>\
                            <tr class="c_3 c_3 xs_bjd_bold xs_print_complete">\
                            <td width="30" class="noprint">' + l_dbl(i + 1) + '</td>\
                            <td width="140" class="noprint">' + v['setting_sn'] + '</td>\
                            <td width="150" class="xs_complete_name">' + v['setting_name'] + '</td>\
                            <td width="340" class="noprint">' + v['setting_attr'] + '</td>\
                            <td width="50" class="noprint">' + v['setting_num'] + '</td>\
                            <td width="150" class="xs_complete_price">\
                            <span>￥' + v['setting_price'] + '</span>\
                            </td>\
                            <td width="50" class="xs_complete_sl none">' + v['setting_num'] + '</td>\
                            <td width="90" class="noprint">￥' + v['setting_rate_price'] + '</td>\
                            <td width="90" class="xs_complete_total">￥' + v['setting_total'] + '</td>\
                            <td width="60" class="noprint">\
                            <button class="but_mix box_open_btn_1 but_blue_1">展开</button>\
                            </td>\
                            </tr>\
                            </tbody>\
                            </table>\
                            </div>\
                            <div class="xs_tc_goods_box goods_tc_toggle" style="display: none;">' + settingGoods + '</div>';
                            });
                            $('.tanceng .pur_quote_detail_setting_total').html(productInfo['setting']['sum_total']);
                        } else {
                            $('.tanceng .pur_quote_detail_setting_box').css('display', 'none');
                        }
                        $('.tanceng .pur_quote_detail_setting_list').html(settingHtml);
                        //单价合计
                        $('.tanceng .pur_quote_detail_money_sum').html(productInfo['money_sum']);
                        //合计税额
                        $('.tanceng .pur_quote_detail_tax_money_sum').html(productInfo['tax_money_sum']);
                        //其他费用
                        $('.tanceng .pur_quote_detail_other_free').html(productInfo['other_free']);
                        //总计金额
                        $('.tanceng .pur_quote_detail_totals').html(productInfo['totals']);
                        //备注
                        $('.tanceng .pur_quote_detail_note').html(productInfo['note']);
                    }

                }
            },
            error: function (e) {
                alert(e.msg);
                console.log(e);
            }
        });
    }

//查看采购订单
    $('.cght_cgddxq_btnxxl').die('click').live('click', function () {
        $('#pur_order_look_nav_ul li:nth-of-type(1)').trigger('click');
        purOrderCurrentId = $(this).attr('uid');
        $.ajax({
            url: SERVER_URL + '/buy-order/info',
            type: 'GET',
            data: {
                token: token,
                buy_order_id: purOrderCurrentId,
                type:'1'
            },
            dataType: 'json',
            success: function (oE) {
                var data = oE.data;
                console.log(data);
                //根据作废状态判断更多的显示隐藏
                if (data['is_invalid'] == 0) {
                    $('.pur_order_look_more').css('display', '');
                } else if (data['is_invalid'] == 1) {
                    $('.pur_order_look_more').css('display', 'none');
                }
                //采购订单创建时间
                $('.pur_order_look_created_at').html(data['created_at']);
                //采购订单创建人
                $('.pur_order_look_uname').html(data['uname']);
                //采购订单编号
                $('.pur_order_look_buy_code_sn').html(data['buy_code_sn']);
                //采购订单供应商名称
                $('.pur_order_look_name').html(likNullData(data['supplier_name']));
                //采购订单采购合同
                $('.pur_order_look_purchase_contract_sn').html(data['purchase_contract_sn']);
                //采购订单采购报价单
                $('.pur_order_look_buy_quote_code_sn').html(data['buy_quote_code_sn']);
                //采购订单负责部门
                $('.pur_order_look_dept_name').html(data['dept_name']);
                //采购订单负责人
                $('.pur_order_look_owner_name').html(data['owner_name']);

                //财务信息

                //结算账户
                $('.pur_order_look_account_name').html(data['account_name']);
                //付款方式
                if (data['pay_type'] == 1) {
                    $('.pur_order_look_pay_type').html('现金');
                } else if (data['pay_type'] == 2) {
                    $('.pur_order_look_pay_type').html('电汇');
                } else if (data['pay_type'] == 3) {
                    $('.pur_order_look_pay_type').html('支票');
                }
                //税率
                if (data['tax_rate'] == 1) {
                    $('.pur_order_look_tax_rate').html('含税17%');
                } else if (data['pay_type'] == 0) {
                    $('.pur_order_look_tax_rate').html('无税');
                }
                //总金额
                $('.pur_order_look_totals').html(data['totals']);

                //入库日期
                $('.pur_order_look_in_libs_day').html(data['in_libs_day']);
                //采购订单 备注
                $('.pur_order_look_note').html(data['note']);
                //采购订单 抄送人
                var copyList = '';
                $.each(data['copy_list'], function (i, v) {
                    copyList += v['name'] + '、';
                });
                copyList = copyList.slice(0, copyList.length - 1);
                $('.pur_order_look_copy_list').html(copyList);

                //关联采购报价单
                purOrderLinkQuoteId = data['buy_quote_id'];
                //关联采购合同
                purOrderLinkContractId = data['purchase_contract'];
            }
        });
    });






















