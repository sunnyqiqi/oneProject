var token, tokenid,isshow,department_id,department_name;
token = Admin.get_token();
username = window.localStorage.getItem('username');
tokenid = Admin.get_uid();
//SERVER_URL = 'http://192.168.0.167:9091/';
//tokenid = 2; //对比自己的id审批意见-我
//username = '邢啸亮';
//token = "2017051317050663733-1-1";
//SERVER_URL = 'http://192.168.0.167:9010/';
var loginUserInfo = JSON.parse(localStorage.getItem('user_info'));
console.log(loginUserInfo)
department_id = loginUserInfo['department_id'];
department_name=loginUserInfo['department_name'];
var zuofei='market-contract/invalid',shanchu='market-contract/del',xshtdaochu='/xiaoshou/daochu';
if(loginUserInfo['company_admin'] != 1){
	if(loginUserInfo.powerUrls.length==0){
		//$('.xsht_zf_btn').hide();
		$('.daochu_xs').hide()
	}else{
		var arr = loginUserInfo.powerUrls;//
		if($.inArray(xshtdaochu, arr)!=-1){
			$('.daochu_xs').show()
		}else{
			$('.daochu_xs').hide()
		}
		
		
	}
}

var xsht_data_xxl = {
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
		order_status: '' //1升序2降序
	}
$('.xsht_spr_gjss_ul li').die().live('click',function(){
	$('.xsht_gjssspztai_valxxl').val($(this).text()).addClass('c_3')
	if($(this).attr('statusid')=='4'){
		xsht_data_xxl.status = '';
	}else{
		xsht_data_xxl.status = $(this).attr('statusid')
	}
	xsht_list_ajax_xxl();
})
if ($('#left_button_59').attr('fromnotice') == 1) { // 当前是从消息过来的
    var curId = $('#left_button_59').attr('detailid');
    var secondName = $('#left_button_59').attr('secondmenu'); 
    $.each($('.tabtitle li'), function (i, v) {
        if (secondName == $.trim($('.tabtitle li').eq(i).text())) {
            //$('.tabtitle li').removeClass('tabhover').eq(i).addClass('tabhover');
            xsht_data_xxl = {		// 初始化参数
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
				is_invalid: '0', //是否作废：0正常1作废
				created_at: '', //创建日期：1升序2降序
				order_status: '', //1升序2降序
                ids:curId
            };
            setTimeout(function(){
                $('.tabtitle li').eq(i).trigger('click'); // 触发相应子模块事件
                $('#left_button_59').attr({	 // 清空按钮的属性
                    'fromnotice': '',
                    'detailid': '',
                    'secondmenu': '',
                    'totable': ''
                });
            },100);
        }
    });
} else { // 当前不是从消息过来的，正常调取整个列表
    xsht_list_ajax_xxl();
}

	// 定义查看项
var xshtxuanzckx = [{
		'index': null,
		'field': '审批人'
	},{
		'index': null,
		'field': '销售报价单编号'
	},{
		'index': null,
		'field': '销售订单编号'
	},{
		'index': null,
		'field': '创建日期'
	}
];
	//切换列表
$.each($('.tabtitle li.xsht_qiehuan_xxl'), function(i, v) {
	$(this).die().live('click', function() {
		$('.xsht_list_html').attr('thetype', $(this).attr('thetype'));
		if($(this).attr('thetype')=='1'){
			xshtxuanzckx = [{
		'index': null,
		'field': '审批人'
	},{
		'index': null,
		'field': '销售报价单编号'
	},{
		'index': null,
		'field': '销售订单编号'
	},{
		'index': null,
		'field': '创建日期'
	}
];
			$('.xsht_cjr_input').attr('readonly','readonly').val('').nextAll().hide().parent().css('background','#f5f5f5');
			$('.xsht_fzbm_tdxxl').hide()
			$('.xsht_gjss_fzrtdxxl').hide()
		}else{
			$('.xsht_fzbm_tdxxl').show()
			$('.xsht_gjss_fzrtdxxl').show()
			xshtxuanzckx = [{
		'index': null,
		'field': '审批人'
	},{
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
			$('.xsht_cjr_input').removeAttr('readonly').val('创建人').nextAll().show().parent().css('background','')
		}
		$('.xsht_riqichaxun_btnxxl').attr('thetype',$(this).attr('thetype'));
		$('.xsht_cleargjss_btnxxl').attr('thetype',$(this).attr('thetype'));
		$('button[name="ht_xsht_zkgjss"]').attr('thetype', $(this).attr('thetype'))//.html('展开高级搜索').css({"background": "","color": "","border-color": ""});
		//$('.table_head_box').height('38px')
		//$('.xsht_errhtml_xxl').css('width','100%');
		//$(".zkgjss_cont[name='ht_xsht_zkgjss']").css('display','none'); //相对应的右侧边栏弹出
    	//$(window).trigger('resize');
    	$('.xsht_ssinput_value').val('搜索合同编号/销售报价单编号/客户名称/合同名称').css('color','rgb(204, 204, 204)');
		xsht_data_xxl.thetype = $(this).attr('thetype');
		xsht_data_xxl.start_time = '';
		xsht_data_xxl.dept_id = '';
		xsht_data_xxl.owner_id ='';
		xsht_data_xxl.status ='';
		xsht_data_xxl.end_time = '';
		xsht_data_xxl.keywords='';
		xsht_list_ajax_xxl()
	})

});
$('.xsht_cleargjss_btnxxl').die().live('click',function(){
	$('.xsht_gjssspztai_valxxl').val('');
	$('.xsht_fzbm_input').val('');
	$('.xsht_fzr_input').val('');
		xsht_data_xxl.thetype = $(this).attr('thetype');
		xsht_data_xxl.start_time = '';
		xsht_data_xxl.dept_id = '';
		xsht_data_xxl.owner_id ='';
		xsht_data_xxl.status ='';
		xsht_data_xxl.end_time = '';
		xsht_data_xxl.keywords='';
		xsht_list_ajax_xxl()
})
//日期搜索
$('.xsht_riqichaxun_btnxxl').die().live('click',function(){
	$('.tanceng .xsht_riqissqueding_btnxxl').attr('thetype',$(this).attr('thetype'));
})
$('.tanceng .xsht_riqissqueding_btnxxl').die().live('click',function(){
	xsht_data_xxl.start_time = $('.tanceng .xsht_starttime_valxxl').val();
	xsht_data_xxl.end_time = $('.tanceng .xsht_endtime_valxxl').val();
	xsht_data_xxl.thetype = $(this).attr('thetype');
	xsht_list_ajax_xxl();
	$('.tanceng').empty().hide();
})
function xsht_list_ajax_xxl() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "market-contract/list",
		data: xsht_data_xxl,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg)
			} else {
				console.log(data)
				var xslist = data['datalist'];
				$('.xsht_cgxnums_xxl').html(data.count_bak)
				$('.xsht_ssnums_xxl').html(data.totalcount)
				if(xslist.length == 0) {
					$('.xsht_list_html').html('')
					var xsht_err = '';
					xsht_err += '<div class="no_data_box" ><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
					$('.xsht_errhtml_xxl').html(xsht_err);
					$('.xsht_fenye_xxl').css('display', 'none')
				} else {
					$('.xsht_errhtml_xxl').html('');
					$('.xsht_fenye_xxl').css('display', 'block')
					var xsht_listhtmls = '';
					if($('.xsht_list_html').attr('thetype') =='1') {//data.thetype
						$('.xsht_listth_tabxxl_bjd').html('销售报价单编号')
						$('.xsht_listth_tabxxl_dd').html('销售订单编号')
						$.each(xslist, function(i, v) {
							if(v.is_invalid == 1) {
								xsht_listhtmls += '<tr class="grey"><td><span class="voidIcon">作废</span></td>';
								xsht_listhtmls += '<td>' + likNullData(v.market_sn) + '</td>';

//								xsht_listhtmls += '<td>' + likNullData(v.market_quote_sn) + '</td>';
//								xsht_listhtmls += '<td>' + likNullData(v.name) + '</td>';
								xsht_listhtmls += '<td>' + likNullData(v.customer_name) + '</td>';
								xsht_listhtmls += '<td><span>' + likNullData(v.status_name) + '</span></td>';
								xsht_listhtmls += '<td>' + likNullData(v.flow_name) + '</td>';
								if(v.market_quote_sn==''||v.market_quote_sn==null){
									xsht_listhtmls += '<td uid="'+v.quote_id+'">' + likNullData(v.market_quote_sn) + '</td>';
								}else{
									xsht_listhtmls += '<td class="f_color finance_pay_rent_list r_sidebar_btn xsht_xsbjdxq_xxl" name="bargin_xsbjd_btn" uid="'+v.quote_id+'">' + likNullData(v.market_quote_sn) + '</td>';
								}
								
								if(v.market_order_sn == ''||v.market_order_sn==null) {
									xsht_listhtmls += '<td>-</td>';
								} else {
									xsht_listhtmls += '<td class="f_color finance_pay_rent_list r_sidebar_btn" name="bargin_xsdd_btn" uid="'+v.id+'">' + likNullData(v.market_order_sn) + '</td>';
								}
//								if(v.market_order_status != 0) {
//									xsht_listhtmls += '<td>生成销售订单</td>';
//								} else {
//									xsht_listhtmls += '<td>-</td>';
//								}
								xsht_listhtmls += '<td>' + likNullData(v.created_at) + '</td>';
//								xsht_listhtmls += '<td>' + likNullData(v.uname) + '</td>';
//								xsht_listhtmls += '<td>' + likNullData(v.dept_name) + '</td>';
//								xsht_listhtmls += '<td>' + likNullData(v.owner_name) + '</td>';
								xsht_listhtmls += '<td><button class="but_mix but_look r_sidebar_btn xsht_chakan_btn" name="ht_seal_right" uid="' + v.id + '">查看</button></td></tr>';
							} else {
								
								if(v.status == 1) {
									xsht_listhtmls += '<tr><td>' + Appendzero(i + 1) + '</td>';
									xsht_listhtmls += '<td>' + likNullData(v.market_sn) + '</td>';
									xsht_listhtmls += '<td>' + likNullData(v.customer_name) + '</td>';
									xsht_listhtmls += '<td><span class="c_y">' + likNullData(v.status_name) + '</span></td>';
									xsht_listhtmls += '<td>' + likNullData(v.flow_name) + '</td>';
//									xsht_listhtmls += '<td class="f_color finance_pay_rent_list r_sidebar_btn xsht_xsbjdxq_xxl" name="bargin_xsbjd_btn" uid="'+v.quote_id+'">' + likNullData(v.market_quote_sn) + '</td>';
									if(v.market_quote_sn==''||v.market_quote_sn==null){
									xsht_listhtmls += '<td uid="'+v.quote_id+'">' + likNullData(v.market_quote_sn) + '</td>';
								}else{
									xsht_listhtmls += '<td class="f_color finance_pay_rent_list r_sidebar_btn xsht_xsbjdxq_xxl" name="bargin_xsbjd_btn" uid="'+v.quote_id+'">' + likNullData(v.market_quote_sn) + '</td>';
								}
									if(v.market_order_sn == ''||v.market_order_sn==null) {
										xsht_listhtmls += '<td>-</td>';
									} else {
										xsht_listhtmls += '<td class="f_color finance_pay_rent_list r_sidebar_btn" name="bargin_xsdd_btn" uid="'+v.id+'">' + likNullData(v.market_order_sn) + '</td>';
									}
									
									//xsht_listhtmls += '<td>' + likNullData(v.name) + '</td>';
									
									
//									if(v.market_order_status != 0) {
//										xsht_listhtmls += '<td>生成销售订单</td>';
//									} else {
//										xsht_listhtmls += '<td>-</td>';
//									}
									
									xsht_listhtmls += '<td>' + likNullData(v.created_at) + '</td>';
//									xsht_listhtmls += '<td>' + likNullData(v.uname) + '</td>';
//									xsht_listhtmls += '<td>' + likNullData(v.dept_name) + '</td>';
//									xsht_listhtmls += '<td>' + likNullData(v.owner_name) + '</td>';
									if(v.market_order_sn == ''||v.market_order_sn==null){
										xsht_listhtmls += '<td><button class="but_mix but_look r_sidebar_btn xsht_chakan_btn" name="ht_seal_right" uid="' + v.id + '">查看</button><button class="but_mix but_r but_void xsht_zf_btn val_dialogTop" uid="' + v.id + '" name="zuofei_tanchuang_xsht">作废</button></td></tr>';
									}else{
										xsht_listhtmls += '<td><button class="but_mix but_look r_sidebar_btn xsht_chakan_btn" name="ht_seal_right" uid="' + v.id + '">查看</button></td></tr>';
									}
									
								} else if(v.status == 2) {
									xsht_listhtmls += '<tr><td>' + Appendzero(i + 1) + '</td>';
									xsht_listhtmls += '<td>' + likNullData(v.market_sn) + '</td>';
									xsht_listhtmls += '<td>' + likNullData(v.customer_name) + '</td>';
									xsht_listhtmls += '<td><span class="c_r">' + likNullData(v.status_name) + '</span></td>';
									xsht_listhtmls += '<td>' + likNullData(v.flow_name) + '</td>';
//									xsht_listhtmls += '<td class="f_color finance_pay_rent_list r_sidebar_btn xsht_xsbjdxq_xxl" uid="'+v.quote_id+'" name="bargin_xsbjd_btn">' + likNullData(v.market_quote_sn) + '</td>';
									if(v.market_quote_sn==''||v.market_quote_sn==null){
									xsht_listhtmls += '<td uid="'+v.quote_id+'">' + likNullData(v.market_quote_sn) + '</td>';
								}else{
									xsht_listhtmls += '<td class="f_color finance_pay_rent_list r_sidebar_btn xsht_xsbjdxq_xxl" name="bargin_xsbjd_btn" uid="'+v.quote_id+'">' + likNullData(v.market_quote_sn) + '</td>';
								}
									if(v.market_order_sn == ''||v.market_order_sn==null) {
										xsht_listhtmls += '<td>-</td>';
									} else {
										xsht_listhtmls += '<td class="f_color finance_pay_rent_list r_sidebar_btn" name="bargin_xsdd_btn" uid="'+v.id+'">' + likNullData(v.market_order_sn) + '</td>';
									}
									
									//xsht_listhtmls += '<td>' + likNullData(v.name) + '</td>';
									
									
//									if(v.market_order_status != 0) {
//										xsht_listhtmls += '<td>生成销售订单</td>';
//									} else {
//										xsht_listhtmls += '<td>-</td>';
//									}
									
									xsht_listhtmls += '<td>' + likNullData(v.created_at) + '</td>';
//									xsht_listhtmls += '<td>' + likNullData(v.uname) + '</td>';
//									xsht_listhtmls += '<td>' + likNullData(v.dept_name) + '</td>';
//									xsht_listhtmls += '<td>' + likNullData(v.owner_name) + '</td>';
									if(v.market_order_sn == ''||v.market_order_sn==null){
										xsht_listhtmls += '<td><button class="but_mix but_look r_sidebar_btn xsht_chakan_btn" name="ht_seal_right" uid="' + v.id + '">查看</button><button class="but_mix but_exit val_dialog xsht_bj_btn" name="contact_seal_exit" uid="' + v.id + '">编辑</button><button class="but_mix but_r but_void xsht_zf_btn val_dialogTop" uid="' + v.id + '" name="zuofei_tanchuang_xsht">作废</button></td></tr>';
									}else{
										xsht_listhtmls += '<td><button class="but_mix but_look r_sidebar_btn xsht_chakan_btn" name="ht_seal_right" uid="' + v.id + '">查看</button></td></tr>';
									}
									
								} else {
									xsht_listhtmls += '<tr><td>' + Appendzero(i + 1) + '</td>';
									xsht_listhtmls += '<td>' + likNullData(v.market_sn) + '</td>';
									xsht_listhtmls += '<td>' + likNullData(v.customer_name) + '</td>';
									xsht_listhtmls += '<td><span class="c_g">' + likNullData(v.status_name) + '</span></td>';
									xsht_listhtmls += '<td>' + likNullData(v.flow_name) + '</td>';
//									xsht_listhtmls += '<td class="f_color finance_pay_rent_list r_sidebar_btn xsht_xsbjdxq_xxl" uid="'+v.quote_id+'" name="bargin_xsbjd_btn">' + likNullData(v.market_quote_sn) + '</td>';
									if(v.market_quote_sn==''||v.market_quote_sn==null){
									xsht_listhtmls += '<td uid="'+v.quote_id+'">' + likNullData(v.market_quote_sn) + '</td>';
								}else{
									xsht_listhtmls += '<td class="f_color finance_pay_rent_list r_sidebar_btn xsht_xsbjdxq_xxl" name="bargin_xsbjd_btn" uid="'+v.quote_id+'">' + likNullData(v.market_quote_sn) + '</td>';
								}
									if(v.market_order_sn == ''||v.market_order_sn==null) {
										xsht_listhtmls += '<td>-</td>';
									} else {
										xsht_listhtmls += '<td class="f_color finance_pay_rent_list r_sidebar_btn" name="bargin_xsdd_btn" uid="'+v.id+'">' + likNullData(v.market_order_sn) + '</td>';
									}
									
									//xsht_listhtmls += '<td>' + likNullData(v.name) + '</td>';
									
//									
//									if(v.market_order_status != 0) {
//										xsht_listhtmls += '<td>生成销售订单</td>';
//									} else {
//										xsht_listhtmls += '<td>-</td>';
//									}
									
									xsht_listhtmls += '<td>' + likNullData(v.created_at) + '</td>';
//									xsht_listhtmls += '<td>' + likNullData(v.uname) + '</td>';
//									xsht_listhtmls += '<td>' + likNullData(v.dept_name) + '</td>';
//									xsht_listhtmls += '<td>' + likNullData(v.owner_name) + '</td>';
									xsht_listhtmls += '<td><button class="but_mix but_look r_sidebar_btn xsht_chakan_btn" name="ht_seal_right" uid="' + v.id + '">查看</button></td></tr>';
								}
								
							}

						});
					} else if($('.xsht_list_html').attr('thetype') =='2') {//data.thetype
						$('.xsht_listth_tabxxl_bjd').html('负责部门')
						$('.xsht_listth_tabxxl_dd').html('负责人')
						$.each(xslist, function(i, v) {
							if(v.is_invalid == 1) {
								xsht_listhtmls += '<tr class="grey"><td><span class="voidIcon">作废</span></td>';
								xsht_listhtmls += '<td>' + likNullData(v.market_sn) + '</td>';
								xsht_listhtmls += '<td>' + likNullData(v.customer_name) + '</td>';
								xsht_listhtmls += '<td><span>' + likNullData(v.status_name) + '</span></td>';
								xsht_listhtmls += '<td>' + likNullData(v.flow_name) + '</td>';
//								if(v.market_order_sn == '') {
//									xsht_listhtmls += '<td>-</td>';
//								} else {
//									xsht_listhtmls += '<td>' + v.market_order_sn + '</td>';
//								}
//								xsht_listhtmls += '<td>' + likNullData(v.market_quote_sn) + '</td>';
//								xsht_listhtmls += '<td>' + likNullData(v.name) + '</td>';
//								
//								
//								if(v.market_order_status != 0) {
//									xsht_listhtmls += '<td>生成销售订单</td>';
//								} else {
//									xsht_listhtmls += '<td>-</td>';
//								}
								xsht_listhtmls += '<td>' + likNullData(v.dept_name) + '</td>';
								xsht_listhtmls += '<td>' + likNullData(v.owner_name) + '</td>';
								
								xsht_listhtmls += '<td>' + likNullData(v.created_at) + '</td>';
								//xsht_listhtmls += '<td>' + likNullData(v.uname) + '</td>';
								
								xsht_listhtmls += '<td><button class="but_mix but_look r_sidebar_btn dwsp_ckbtn_xxl" name="ht_seal_sqright" uid="' + v.id + '">查看</button><button class="but_mix but_grey1 r_sidebar_btn dwsp_sp_btn_xxl" uid="' + v.id + '">审批</button></td></tr>';
							} else {
								if(v.status == 1) {
									xsht_listhtmls += '<tr><td>' + Appendzero(i + 1) + '</td>';
									xsht_listhtmls += '<td>' + likNullData(v.market_sn) + '</td>';
									xsht_listhtmls += '<td>' + likNullData(v.customer_name) + '</td>';
//									if(v.market_order_sn == '') {
//										xsht_listhtmls += '<td>-</td>';
//									} else {
//										xsht_listhtmls += '<td>' + v.market_order_sn + '</td>';
//									}
									//xsht_listhtmls += '<td>' + likNullData(v.market_quote_sn) + '</td>';
									//xsht_listhtmls += '<td>' + likNullData(v.name) + '</td>';
									
									xsht_listhtmls += '<td><span class="c_y">' + likNullData(v.status_name) + '</span></td>';
//									if(v.market_order_status != 0) {
//										xsht_listhtmls += '<td>生成销售订单</td>';
//									} else {
//										xsht_listhtmls += '<td>-</td>';
//									}
									xsht_listhtmls += '<td>' + likNullData(v.flow_name) + '</td>';
									xsht_listhtmls += '<td>' + likNullData(v.dept_name) + '</td>';
									xsht_listhtmls += '<td>' + likNullData(v.owner_name) + '</td>';
									xsht_listhtmls += '<td>' + likNullData(v.created_at) + '</td>';
									//xsht_listhtmls += '<td>' + likNullData(v.uname) + '</td>';
									
									xsht_listhtmls += '<td><button class="but_mix but_look r_sidebar_btn dwsp_ckbtn_xxl" name="ht_seal_sqright" uid="' + v.id + '">查看</button><button class="but_mix but_look val_dialog dwsp_sp_btn_xxl" name="ht_seal_prevSP" uid="' + v.id + '">审批</button></td></tr>';
								} else if(v.status == 2) {
									xsht_listhtmls += '<tr><td>' + Appendzero(i + 1) + '</td>';
									xsht_listhtmls += '<td>' + likNullData(v.market_sn) + '</td>';
//									if(v.market_order_sn == '') {
//										xsht_listhtmls += '<td>-</td>';
//									} else {
//										xsht_listhtmls += '<td>' + v.market_order_sn + '</td>';
//									}
									//xsht_listhtmls += '<td>' + likNullData(v.market_quote_sn) + '</td>';
									//xsht_listhtmls += '<td>' + likNullData(v.name) + '</td>';
									xsht_listhtmls += '<td>' + likNullData(v.customer_name) + '</td>';
									xsht_listhtmls += '<td><span class="c_r">已拒绝</span></td>';
//									if(v.market_order_status != 0) {
//										xsht_listhtmls += '<td>生成销售订单</td>';
//									} else {
//										xsht_listhtmls += '<td>-</td>';
//									}
									xsht_listhtmls += '<td>' + likNullData(v.flow_name) + '</td>';
									xsht_listhtmls += '<td>' + likNullData(v.dept_name) + '</td>';
									xsht_listhtmls += '<td>' + likNullData(v.owner_name) + '</td>';
									xsht_listhtmls += '<td>' + likNullData(v.created_at) + '</td>';
									//xsht_listhtmls += '<td>' + likNullData(v.uname) + '</td>';
									
									xsht_listhtmls += '<td><button class="but_mix but_look r_sidebar_btn dwsp_ckbtn_xxl" name="ht_seal_sqright" uid="' + v.id + '">查看</button><button class="but_mix but_grey1 dwsp_sp_btn_xxl" uid="' + v.id + '">审批</button></td></tr>';
								} else {
									xsht_listhtmls += '<tr><td>' + Appendzero(i + 1) + '</td>';
									xsht_listhtmls += '<td>' + likNullData(v.market_sn) + '</td>';
//									if(v.market_order_sn == '') {
//										xsht_listhtmls += '<td>-</td>';
//									} else {
//										xsht_listhtmls += '<td>' + v.market_order_sn + '</td>';
//									}
									//xsht_listhtmls += '<td>' + likNullData(v.market_quote_sn) + '</td>';
									//xsht_listhtmls += '<td>' + likNullData(v.name) + '</td>';
									xsht_listhtmls += '<td>' + likNullData(v.customer_name) + '</td>';
									xsht_listhtmls += '<td><span class="c_g">' + likNullData(v.status_name) + '</span></td>';
//									if(v.market_order_status != 0) {
//										xsht_listhtmls += '<td>生成销售订单</td>';
//									} else {
//										xsht_listhtmls += '<td>-</td>';
//									}
									xsht_listhtmls += '<td>' + likNullData(v.flow_name) + '</td>';
									xsht_listhtmls += '<td>' + likNullData(v.dept_name) + '</td>';
									xsht_listhtmls += '<td>' + likNullData(v.owner_name) + '</td>';
									xsht_listhtmls += '<td>' + likNullData(v.created_at) + '</td>';
									//xsht_listhtmls += '<td>' + likNullData(v.uname) + '</td>';
									
									xsht_listhtmls += '<td><button class="but_mix but_look r_sidebar_btn dwsp_ckbtn_xxl" name="ht_seal_sqright" uid="' + v.id + '">查看</button><button class="but_mix but_grey1 dwsp_sp_btn_xxl" uid="' + v.id + '">审批</button></td></tr>';
								}
							}

						});
					} else {
						$('.xsht_listth_tabxxl_bjd').html('负责部门')
						$('.xsht_listth_tabxxl_dd').html('负责人')
						$.each(xslist, function(i, v) {
							if(v.is_invalid == 1) {
								xsht_listhtmls += '<tr class="grey"><td><span class="voidIcon">作废</span></td>';
								xsht_listhtmls += '<td>' + likNullData(v.market_sn) + '</td>';
//								if(v.market_order_sn == '') {
//									xsht_listhtmls += '<td>-</td>';
//								} else {
//									xsht_listhtmls += '<td>' + v.market_order_sn + '</td>';
//								}
								//xsht_listhtmls += '<td>' + likNullData(v.market_quote_sn) + '</td>';
								//xsht_listhtmls += '<td>' + likNullData(v.name) + '</td>';
								xsht_listhtmls += '<td>' + likNullData(v.customer_name) + '</td>';
								xsht_listhtmls += '<td><span>' + likNullData(v.status_name) + '</span></td>';
//								if(v.market_order_status != 0) {
//									xsht_listhtmls += '<td>生成销售订单</td>';
//								} else {
//									xsht_listhtmls += '<td>-</td>';
//								}
								xsht_listhtmls += '<td>' + likNullData(v.flow_name) + '</td>';
								xsht_listhtmls += '<td>' + likNullData(v.dept_name) + '</td>';
								xsht_listhtmls += '<td>' + likNullData(v.owner_name) + '</td>';
								xsht_listhtmls += '<td>' + likNullData(v.created_at) + '</td>';
								//xsht_listhtmls += '<td>' + likNullData(v.uname) + '</td>';
								
								xsht_listhtmls += '<td><button class="but_mix but_look r_sidebar_btn cswd_ckbtn_xxl" name="ht_seal_ckright" uid="' + v.id + '">查看</button></td></tr>';
							} else {
								if(v.status == 1) {
									xsht_listhtmls += '<tr><td>' + Appendzero(i + 1) + '</td>';
									xsht_listhtmls += '<td>' + likNullData(v.market_sn) + '</td>';
//									if(v.market_order_sn == '') {
//										xsht_listhtmls += '<td>-</td>';
//									} else {
//										xsht_listhtmls += '<td>' + v.market_order_sn + '</td>';
//									}
									//xsht_listhtmls += '<td>' + likNullData(v.market_quote_sn) + '</td>';
									//xsht_listhtmls += '<td>' + likNullData(v.name) + '</td>';
									xsht_listhtmls += '<td>' + likNullData(v.customer_name) + '</td>';
									xsht_listhtmls += '<td><span class="c_y">' + likNullData(v.status_name) + '</span></td>';
//									if(v.market_order_status != 0) {
//										xsht_listhtmls += '<td>生成销售订单</td>';
//									} else {
//										xsht_listhtmls += '<td>-</td>';
//									}
									xsht_listhtmls += '<td>' + likNullData(v.flow_name) + '</td>';
									xsht_listhtmls += '<td>' + likNullData(v.dept_name) + '</td>';
									xsht_listhtmls += '<td>' + likNullData(v.owner_name) + '</td>';
									xsht_listhtmls += '<td>' + likNullData(v.created_at) + '</td>';
									//xsht_listhtmls += '<td>' + likNullData(v.uname) + '</td>';
									
									xsht_listhtmls += '<td><button class="but_mix but_look r_sidebar_btn cswd_ckbtn_xxl" name="ht_seal_ckright" uid="' + v.id + '">查看</button></td></tr>';
								} else if(v.status == 2) {
									xsht_listhtmls += '<tr><td>' + Appendzero(i + 1) + '</td>';
									xsht_listhtmls += '<td>' + likNullData(v.market_sn) + '</td>';
//									if(v.market_order_sn == '') {
//										xsht_listhtmls += '<td>-</td>';
//									} else {
//										xsht_listhtmls += '<td>' + v.market_order_sn + '</td>';
//									}
									//xsht_listhtmls += '<td>' + likNullData(v.market_quote_sn) + '</td>';
									//xsht_listhtmls += '<td>' + likNullData(v.name) + '</td>';
									xsht_listhtmls += '<td>' + likNullData(v.customer_name) + '</td>';
									xsht_listhtmls += '<td><span class="c_r">已拒绝</span></td>';
//									if(v.market_order_status != 0) {
//										xsht_listhtmls += '<td>生成销售订单</td>';
//									} else {
//										xsht_listhtmls += '<td>-</td>';
//									}
									xsht_listhtmls += '<td>' + likNullData(v.flow_name) + '</td>';
									xsht_listhtmls += '<td>' + likNullData(v.dept_name) + '</td>';
									xsht_listhtmls += '<td>' + likNullData(v.owner_name) + '</td>';
									xsht_listhtmls += '<td>' + likNullData(v.created_at) + '</td>';
									//xsht_listhtmls += '<td>' + likNullData(v.uname) + '</td>';
									
									xsht_listhtmls += '<td><button class="but_mix but_look r_sidebar_btn cswd_ckbtn_xxl" name="ht_seal_ckright" uid="' + v.id + '">查看</button></td></tr>';
								} else {
									xsht_listhtmls += '<tr><td>' + Appendzero(i + 1) + '</td>';
									xsht_listhtmls += '<td>' + likNullData(v.market_sn) + '</td>';
//									if(v.market_order_sn == '') {
//										xsht_listhtmls += '<td>-</td>';
//									} else {
//										xsht_listhtmls += '<td>' + v.market_order_sn + '</td>';
//									}
									//xsht_listhtmls += '<td>' + likNullData(v.market_quote_sn) + '</td>';
									//xsht_listhtmls += '<td>' + likNullData(v.name) + '</td>';
									xsht_listhtmls += '<td>' + likNullData(v.customer_name) + '</td>';
									xsht_listhtmls += '<td><span class="c_g">' + likNullData(v.status_name) + '</span></td>';
//									if(v.market_order_status != 0) {
//										xsht_listhtmls += '<td>生成销售订单</td>';
//									} else {
//										xsht_listhtmls += '<td>-</td>';
//									}
									xsht_listhtmls += '<td>' + likNullData(v.flow_name) + '</td>';
									xsht_listhtmls += '<td>' + likNullData(v.dept_name) + '</td>';
									xsht_listhtmls += '<td>' + likNullData(v.owner_name) + '</td>';
									xsht_listhtmls += '<td>' + likNullData(v.created_at) + '</td>';
									//xsht_listhtmls += '<td>' + likNullData(v.uname) + '</td>';
									
									xsht_listhtmls += '<td><button class="but_mix but_look r_sidebar_btn cswd_ckbtn_xxl" name="ht_seal_ckright" uid="' + v.id + '">查看</button></td></tr>';
								}
							}

						});
					}
					$('.xsht_list_html').html(xsht_listhtmls)
					if(loginUserInfo['company_admin'] != 1){
										if(loginUserInfo.powerUrls.length==0){
											$('.xsht_zf_btn').hide();
											
										}else{
											var arr = loginUserInfo.powerUrls;//
											if($.inArray(zuofei, arr)!=-1){
												$('.xsht_zf_btn').show();
											}else{
												$('.xsht_zf_btn').hide();
											}
										}
									}
				}
					list_table_render_pagination(".xsht_fenye_xxl", xsht_data_xxl, xsht_list_ajax_xxl, data["totalcount"], xslist.length)
					likShow('#xsht_table_xxl', xshtxuanzckx, '#xsht_bjpx_xxl', '#xsht_baocun_xxl', '#xsht_hfmr_xxl');
			}
		},
		error: function(data) {
			console.log(data)
			var xsht_err = '';
			xsht_err += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
			$('.xsht_errhtml_xxl').html(xsht_err);
			$('.xsht_fenye_xxl').css('display', 'none')
		}
	});
}
//xsht_list_ajax_xxl()
//草稿箱列表
$('.xsht_caogao_btnxxl[name="xsht_caigoux_boxxxl"]').die().live('click',function(){
	xsht_data_xxl.is_draft = '1';
	xsht_cgxlist_ajax();
})
function xsht_cgxlist_ajax(){
	$.ajax({
		type:"get",
		url:SERVER_URL + "market-contract/list",
		data:xsht_data_xxl,
		dataType:'json',
		success:function(data){
			if(data.code!=0){
				$('.tanceng .xsht_caogaolist_htmlxxl').html('');
				$('.tanceng .xsht_caogaolist_errorhtml_xxl').css('display', 'block');
				$('.tanceng .xsht_caogafenye_xxl').css('display', 'none');
			}else{
				console.log(data);
				var xslist = data['datalist'];
				if(xslist.length==0){
					$('.tanceng .xsht_caogaolist_htmlxxl').html('');
					$('.tanceng .xsht_caogaolist_errorhtml_xxl').css('display', 'block');
					$('.tanceng .xsht_caogafenye_xxl').css('display', 'none');
				}else{
					$('.tanceng .xsht_caogaolist_errorhtml_xxl').css('display', 'none');
					$('.tanceng .xsht_caogafenye_xxl').css('display', 'block');
					var listhtml='';
					$.each(xslist, function(i,v) {
						listhtml +='<tr><td>'+Appendzero(i+1)+'</td>';
                        listhtml +='<td>'+likNullData(v.market_sn)+'</td>';        
                        listhtml +='<td>'+likNullData(v.customer_name)+'</td>';        
                        listhtml +='<td>'+likNullData(v.created_at)+'</td>';        
                        listhtml +='<td>';        
                        listhtml +='<button class="but_mix but_exit val_dialogTop xsht_caogaoxbiaji_btnxxl" name="contact_seal_exit" uid="'+v.id+'">编辑</button><button class="but_mix but_detele but_r val_dialogTop xsht_cgsc_tancbtnxxl" name="xsht_caogao_delete" uid="'+v.id+'">删除</button>';        
                        listhtml +='</td></tr>';            
					});
					$('.tanceng .xsht_caogaolist_htmlxxl').html(listhtml);
					list_table_render_pagination(".xsht_caogafenye_xxl", xsht_data_xxl, xsht_cgxlist_ajax, data["totalcount"], xslist.length)
				}
			}
		},
		error:function(){
			var xsht_err = '';
			$('.tanceng .xsht_caogaolist_htmlxxl').html('');
			$('.tanceng .xsht_caogaolist_errorhtml_xxl').css('display', 'block');
			$('.tanceng .xsht_caogafenye_xxl').css('display', 'none');
		}
	});
}
$('.tanceng .xsht_caogaoxbiaji_btnxxl').die().live('click', function() {
	xsht_huoquspr_ajax();
	wfqd_ckxq_data.id = $(this).attr('uid')
	wfqd_ckxq_ajax()
})
$('.tanceng .xsht_cgsc_tancbtnxxl').die().live('click',function(){
	$('.tanceng .xsht_caogshanchuqued_btnxxl').attr('uid',$(this).attr('uid'));
})
$('.tanceng .xsht_caogshanchuqued_btnxxl').die().live('click',function(){
	xsht_caogaoshanchu_data.id = $(this).attr('uid');
	xsht_caogaoshanchu_ajax();
})
var xsht_caogaoshanchu_data = {
	token:token,
	id:''
}
function xsht_caogaoshanchu_ajax(){
	$.ajax({
		type:"get",
		url:SERVER_URL+"market-contract/del",
		data:xsht_caogaoshanchu_data,
		dataType:'json',
		success:function(data){
			if(data.code!=0){
				alert(data.msg)
			}else{
				alert(data.msg)
				console.log(data);
				xsht_cgxlist_ajax();
				xsht_list_ajax_xxl();
			}
		},
		error:function(e){
			
		}
	});
}
	//补零
function Appendzero(obj) {
	if(obj < 10) return "0" + obj;
	else return obj;
}
	//不显示已作废
$('.xsht_bxsyzf_checkbox').die().live('click', function() {
		if($(this).prop("checked")) {
			xsht_data_xxl.is_invalid = 0;
			xsht_list_ajax_xxl()
		} else {
			xsht_data_xxl.is_invalid = '';
			xsht_list_ajax_xxl()
		}
	})

$('button[name="ht_xsht_zkgjss"]').die().live('click',function(){
	if($(this).text()=='隐藏高级搜索'){
		if($(this).attr('thetype')=='1'){
			$('.xsht_cjr_input').attr('readonly','readonly').val('').nextAll().hide().parent().css('background','#f5f5f5')
		}else{
			$('.xsht_cjr_input').removeAttr('readonly').val('创建人').nextAll().show().parent().css('background','')
		}
	}
})
//切换状态升降序
var xshtztsj=0;
$('.xsht_ztsjbtn_xxl').die().live('click',function(){
	xshtztsj++;
	if(xshtztsj%2==0){
		xsht_data_xxl.order_status = 1;
	}else{
		xsht_data_xxl.order_status = 2;
	}
	xsht_data_xxl.thetype = $('.xsht_list_html').attr('thetype');
	xsht_list_ajax_xxl()
})
//$('.xsht_ztsjbtn_xxl').toggle(function() {
//		$(this).children(".price_icon").removeClass("down").addClass("up");
//		xsht_data_xxl.thetype = $('xsht_list_html').attr('thetype')
//		xsht_data_xxl.order_status = 1;
//		xsht_list_ajax_xxl()
//	}, function() {
//		$(this).children(".price_icon").removeClass("up").addClass("down");
//		xsht_data_xxl.thetype = $('xsht_list_html').attr('thetype')
//		xsht_data_xxl.order_status = 2;
//		xsht_list_ajax_xxl()
//	})
	//切换日期升降序
var xshtcjrq=0;
$('.xsht_cjrqsjbtn_xxl').die().live('click',function(){
	xshtcjrq++;
	if(xshtcjrq%2==0){
		xsht_data_xxl.created_at = 1;
	}else{
		xsht_data_xxl.created_at = 2;
	}
	xsht_data_xxl.order_status='';
	xsht_data_xxl.thetype = $('.xsht_list_html').attr('thetype');
	xsht_list_ajax_xxl();
})
//$('.xsht_cjrqsjbtn_xxl').toggle(function() {
//		$(this).children(".price_icon").removeClass("down").addClass("up");
//		xsht_data_xxl.thetype = $(this).attr('thetype')
//		xsht_data_xxl.created_at = 1;
//		xsht_list_ajax_xxl()
//	}, function() {
//		$(this).children(".price_icon").removeClass("up").addClass("down");
//		xsht_data_xxl.thetype = $(this).attr('thetype')
//		xsht_data_xxl.created_at = 2;
//		xsht_list_ajax_xxl()
//	})
	//作废
var xsht_zf_data = {
	token: token,
	id: ''
}

function xsht_zf_ajax_xxl() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "market-contract/onstatus",
		data: xsht_zf_data,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg)
			} else {
				//console.log(data)
				xsht_list_ajax_xxl()
			}
		},
		error: function(e) {
			console.log(e)
		}
	});
}
$('.xsht_zfbtn_ck').die().live('click', function() {
	$('.tanceng .xsht_zuofeibtn_xxl').attr('uid',$(this).attr('uid'))
	//xsht_zf_data.id = $(this).attr('uid');
	//xsht_zf_ajax_xxl()
	
})
$('.xsht_zf_btn').die().live('click', function() {
	$('.tanceng .xsht_zuofeibtn_xxl').attr('uid',$(this).attr('uid'))
		//xsht_zf_data.id = $(this).attr('uid');
		//console.log(xsht_zf_data.id)
		//xsht_zf_ajax_xxl()
	})
$('.tanceng .xsht_zuofeibtn_xxl').die().live('click',function(){
	xsht_zf_data.id = $(this).attr('uid');
	xsht_zf_ajax_xxl()
	$('.slider_head_close').trigger('click')
	$('.tanceng').empty().hide();
})
	//刷新
$('.xsht_sxbtn_xxl').die().live('click', function() {
	add_Rload_index(59,5)//参数页面值，父级值
//		xsht_data_xxl = {
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
//		xsht_list_ajax_xxl()
//		$('.xsht_menu_li li:first').addClass(' tabhover').siblings('li').removeClass('tabhover');
//		$('.select_p input.xsht_spzt_input').val('审批状态').attr('style', '');
//		$('.select_p input.xsht_shr_input').val('审核人').attr('style', '');
//		$('.select_p input.xsht_cjr_input').val('创建人').attr('style', '');
//		$('.select_p input.xsht_fzbm_input').val('负责部门').attr('style', '');
//		$('.select_p input.xsht_fzr_input').val('负责人').attr('style', '');
	})
	//搜索
//function xsht_sousnow(val) {
//	xsht_data_xxl.keywords = val;
//	xsht_list_ajax_xxl()
//}
$('.xsht_sousuobtn_xxl').die().live('click', function() {
	if($('.xsht_ssinput_value').val() == '' || $('.xsht_ssinput_value').val() == '搜索合同编号/销售报价单编号/客户名称/合同名称') {
		xsht_data_xxl.keywords='';
	} else {
		xsht_data_xxl.keywords = $('.xsht_ssinput_value').val();
		
	}
	xsht_list_ajax_xxl()
})
var xsht_gjss_data = {
	token: token,
	big_type:'3',
	small_type:''//dept_id 部门搜索 owner_id 负责人搜索 flow 审批人搜索 uid创建人搜索
}

function xsht_gjss_ajax() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "common/search",
		data: xsht_gjss_data,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg)
			} else {
				var xslists = data['data'];
				var xsht_shr = '',
					xsht_cjr = '',
					xsht_fzbm = '',
					xsht_fzr = '';
				$.each(xslists, function(i, v) {
					xsht_shr += '<li flowid="' + v.id + '">' + v.name + '</li>';
					xsht_cjr += '<li uid="' + v.id + '">' + v.name + '</li>';
					xsht_fzbm += '<li deptid="' + v.id + '">' + v.name + '</li>';
					xsht_fzr += '<li ownerid="' + v.id + '">' + v.name + '</li>';
				});
				$('.xsht_shr_list').html(xsht_shr)
				$('.xsht_cjr_list').html(xsht_cjr)
				$('.xsht_fzbm_gjss_ul').html(xsht_fzbm)
				$('.xsht_fzr_gjss_ul').html(xsht_fzr)
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

//xsht_gjss_ajax()
$('.xsht_shr_input,.xsht_shr_input+i').die().live('click',function(){
	xsht_gjss_data.small_type='flow';
	xsht_gjss_ajax()
})
$('.xsht_cjr_input,.xsht_cjr_input+i').die().live('click',function(){
	xsht_gjss_data.small_type='uid';
	xsht_gjss_ajax()
})
$('.xsht_fzbm_input,.xsht_fzbm_input+i').die().live('click',function(){
	xsht_gjss_data.small_type='dept_id';
	xsht_gjss_ajax()
})
$('.xsht_fzr_input,.xsht_fzr_input+i').die().live('click',function(){
	xsht_gjss_data.small_type='owner_id';
	xsht_gjss_ajax()
})
	//高级搜索
$('.xsht_spzt_xxl li').die().live('click', function() { //审批状态
	$('.xsht_spzt_input').val($(this).text()).addClass('c_3')
		//console.log($(this).attr('statusid'))
		xsht_data_xxl.status = $(this).attr('statusid');
		xsht_list_ajax_xxl()
	})
	//审核人
$('.xsht_shr_list li').die().live('click', function() {
	$('.xsht_shr_input').val($(this).text()).addClass('c_3')
		xsht_data_xxl.flow = $(this).attr('flowid');
		xsht_list_ajax_xxl()
	})
	//创建人
$('.xsht_cjr_list li').die().live('click', function() {
	$('.xsht_cjr_input').val($(this).text()).addClass('c_3')
		xsht_data_xxl.uid = $(this).attr('uid');
		xsht_list_ajax_xxl()
	})
	//负责部门
$('.xsht_fzbm_gjss_ul li').die().live('click', function() {
	$('.xsht_fzbm_input').val($(this).text()).addClass('c_3')
	xsht_data_xxl.dept_id = $(this).attr('deptid');
	xsht_list_ajax_xxl()
})
$('.xsht_fzr_gjss_ul li').die().live('click', function() {
	$('.xsht_fzr_input').val($(this).text()).addClass('c_3')
		xsht_data_xxl.owner_id = $(this).attr('ownerid');
		
		xsht_list_ajax_xxl()
	})
	//查看我发起的
var wfqd_ckxq_data = {
	token: token,
	id: ''
}

function wfqd_ckxq_ajax() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "market-contract/info",
		data: wfqd_ckxq_data,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg)
			} else {
				console.log(data)
				if(data.data.is_invalid == 1 || data.data.status == 3||data.data.market_order_sn!='') {
					$('.xsht_ck_gdbtn_xxl').css('display', 'none')
				} else {
					$('.xsht_ck_gdbtn_xxl').css('display', 'block')
				}
				if(data.data.status == 2){
					$('.xsht_bjbtn_ck').show()
				}else{
					$('.xsht_bjbtn_ck').hide()
				}
				
				$('.xsht_bjbtn_ck').attr('uid', data.data.id)
				$('.xsht_zfbtn_ck').attr('uid', data.data.id)
				$('.xsht_ck_yulan_btn').attr({'uid':data.data.id,'htbh':data.data.market_sn})
				$('.wfqd_htmc_xxl').html(likNullData(data.data.customer_name+'-'+data.data.name));
				$('.wfqd_cjrq_xxl').html(likNullData(data.data.created_at))
				//$('.wfqd_cjr_xxl').html(likNullData(data.data.uname))
				if(data.data.status == 3) {
					$('.xs_htsp_pass_xxl').css('display', 'block')
				} else {
					$('.xs_htsp_pass_xxl').css('display', 'none')
				}
				if(data.data.status == 2){
					$('.xs_spno_pass_xxl').css('display', 'block')
				}else{
					$('.xs_spno_pass_xxl').css('display', 'none')
				}
				$('.wfqd_htbh_xxl').html(likNullData(data.data.market_sn))
				$('.wfqd_xsdbh_xxl').html(likNullData(data.data.market_order_sn))
				$('.wfqd_xsbaojiadbh_xxl').html(likNullData(data.data.market_quote_sn))
				$('.wfqd_htmcs_xxl').html(likNullData(data.data.name))
				$('.wfqd_khmc_xxl').html(likNullData(data.data.customer_name))
				//$('.wfqd_shzt_xxl').html(likNullData(data.data.status_name))
//				var flowname = []
//				$.each(data.data.flow_info, function(i, v) {
//					flowname.push(v.name)
//				});
//				$('.wfqd_shr_xxl').html(flowname.join())
				//$('.wfqd_zdrq_xxl').html(likNullData(data.data.created_at))
				//$('.wfqd_zdr_xxl').html(likNullData(data.data.uname));
				$('.wfqd_fzbm_xxl').html(likNullData(data.data.dept_name))
				$('.wfqd_fzr_xxl').html(likNullData(data.data.owner_name))
					//alert(data.data.check_log.length)
				if(data.data.check_log.length == 0) {
					$('.wfqd_fbyj_list').html('')
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
                       // if(v.id == tokenid){
                        	//fbyj_listhtml +='<h3 class="work_sp_h3">我</h3>'; 
                        //}else{
                        	fbyj_listhtml +='<h3 class="work_sp_h3">'+likNullData(v.name)+'</h3>'; 
                       // }
                        if(data.data.current_check==1){
                        	
                        }else{
                        	if(i==0){
                        		//fbyj_listhtml +=' <span class="c_9 m_left_5"></span>';
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
					//$.each(data.data.check_log, function(i, v) {
//						fbyj_listhtml += ' <div class="work_spiliu"><div class="work_spiliu_items"><div class="left" style="position: relative;">';
//
//						if(v.uid == tokenid) {
//							fbyj_listhtml += '<img class="inline_block tx" src="' + v.face + '"><cite class="b_h"></cite></div>';
//							fbyj_listhtml += '<div class="right auto_height"><img src="static/images/work_jiantou.png"><div class="sp_cont">';
//							fbyj_listhtml += '<div><h3 class="c_3">我</h3><span class="c_9 m_left_5">' + likNullData(v.day) + '</span></div>';
//						} else {
//							fbyj_listhtml += '<img class="inline_block tx" src="' + v.face + '"><cite class="b_y"></cite></div>';
//							fbyj_listhtml += '<div class="right auto_height" ><img src="static/images/work_jiantou.png"><div class="sp_cont">';
//							fbyj_listhtml += '<div><h3 class="c_3">' + likNullData(v.name) + '</h3><span class="c_9 m_left_5">' + likNullData(v.day) + '</span></div>';
//						}
//						if(i == 0) {
//							fbyj_listhtml += '<h3 class=" f_color">发起审批</h3>';
//						} else {
//							if(v.status == 1) {
//								fbyj_listhtml += '<h3 class="c_b" style="color:#f8ac59;">进行中</h3>'
//							} else if(v.status == 2) {
//								fbyj_listhtml += '<h3 class="c_r" style="color:#ff6c60;">未通过</h3>'
//							} else {
//								fbyj_listhtml += '<h3 class="c_g">通过审批</h3>'
//							}
//
//						}
//						fbyj_listhtml += '<p class="c_3 work_sp_p">' + v.note + '</p></div></div><div style="clear: both;height: 0;font-size: 1px;line-height: 0px;"></div></div></div>';
						
					//});
					$('.wfqd_fbyj_list').html(fbyj_listhtml)
				}
				if(data.data.tax_rate!='1'){
			$('.tanceng .xsht_bj_kjfprq').val('').attr('readonly',true).addClass('inp_noInput');
			$('.tanceng .xsht_bj_kpmc').val('').attr('readonly',true).addClass('inp_noInput');
			$('.tanceng .xsht_bj_kpyhs').val('').attr('readonly',true).addClass('inp_noInput');
			$('.tanceng .xsht_bj_kpyhzh').val('').attr('readonly',true).addClass('inp_noInput');
			$('.tanceng .xsht_bj_shuihao').val('').attr('readonly',true).addClass('inp_noInput');
		}else{
			$('.tanceng .xsht_bj_kjfprq').removeAttr('readonly').removeClass('inp_noInput');
			$('.tanceng .xsht_bj_kpmc').val('').removeAttr('readonly').removeClass('inp_noInput');
			$('.tanceng .xsht_bj_kpyhs').val('').removeAttr('readonly').removeClass('inp_noInput');
			$('.tanceng .xsht_bj_kpyhzh').val('').removeAttr('readonly').removeClass('inp_noInput');
			$('.tanceng .xsht_bj_shuihao').val('').removeAttr('readonly').removeClass('inp_noInput');
		}
				$('.tanceng .bj_xsht_zdr_xxl').html(data.data.uname)
				$('.tanceng .xsht_bj_zdrq').html(data.data.created_at)
				$('.tanceng .xsht_bj_htbh').val(data.data.market_sn).addClass('c_3');
				$('.tanceng .xsht_bj_xzhtmb').val(data.data.template_name).attr('uid', data.data.template_id).addClass('c_3');
					//console.log(data.data.market_sn)
				$('.tanceng .xsht_bj_htmc').val(data.data.name).addClass('c_3');
					//$('.xsht_bj_xsdds').val(data.data.market_order_sn)
				$('.tanceng .xsht_bj_xsbjd').val(data.data.market_quote_sn).attr('uid', data.data.quote_id).addClass('c_3');
					//$('.xsht_bj_xzxsjh').val(data.data.)
					//$('.bjht_yulan_btn_xxl').attr('uid',data.data.id)
				$('.tanceng .bjht_tjsp_btn_xxl').attr('uid', data.data.id)
				$('.tanceng .xsht_bianjibaocun_btnxxl').attr('uid', data.data.id)
				$('.tanceng .xsht_bj_xzhklc').val(data.data.back_pay_name).attr('uid', data.data.back_pay_id).addClass('c_3');
				$('.tanceng .xsht_bj_qdrq').val(data.data.sign_time).addClass('c_3');
				$('.tanceng .xsht_bj_qddd').val(data.data.sign_address).addClass('c_3');
				$('.tanceng .xsht_bj_jfmc').val(data.data.need_name).addClass('c_3');
				$('.tanceng .xsht_bj_ghrq').val(data.data.supply_day).addClass('c_3');
				$('.tanceng .xsht_bj_zddd').val(data.data.assign_address).addClass('c_3');
				$('.tanceng .xsht_bj_lxr').val(data.data.contact).addClass('c_3');
				$('.tanceng .xsht_bj_lxrdh').val(data.data.contact_tel).addClass('c_3');
				$('.tanceng .xsht_bj_xzzh').val(data.data.open_account).attr('uid', data.data.chance_account).addClass('c_3');;
				$('.tanceng .xsht_bj_khmc').val(data.data.open_account).addClass('c_3');
				$('.tanceng .xsht_bj_khyh').val(data.data.open_bank).addClass('c_3');
				$('.tanceng .xsht_bj_hkzh').val(data.data.remit_account).addClass('c_3');
				$('.tanceng .xsht_bj_kjfprq').val(data.data.open_ticket).addClass('c_3');
				$('.tanceng .xsht_bj_kpmc').val(data.data.open_ticket_name).addClass('c_3');
				$('.tanceng .xsht_bj_kpyhs').val(data.data.open_ticket_bank).addClass('c_3');
				$('.tanceng .xsht_bj_kpyhzh').val(data.data.account).addClass('c_3');
				$('.tanceng .xsht_bj_shuihao').val(data.data.tax_point).addClass('c_3');
				$('.tanceng .xsht_bj_zcdzdh').val(data.data.reg_address_tel).addClass('c_3');
				$('.tanceng .xsht_bj_xzfzbm').val(department_name).attr('uid', department_id).addClass('c_3');
				$('.tanceng .xsht_bj_fzr').val(username).attr('uid', tokenid).addClass('c_3');
				$('.tanceng .xshtxj_xsbjdmainums_xxl').html(data.data.totals)
				if(data.data.totals==null||data.data.totals==''||data.data.totals==undefined||parseInt(data.data.totals)<=0){
			$('.tanceng .xsht_addhkjduan_xxl[name="term_add"]').attr('disabled','disabled');
		}else{
			$('.tanceng .xsht_addhkjduan_xxl[name="term_add"]').removeAttr('disabled');
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
				
            
			
				var mrcsrnum = '';
				$.each(data.data.copy_info, function(i, v) {
					csnumss.push(v.id)
					if(v.face==''||v.face==null||v.face==undefined){
						mrcsrnum += '<li userid="' + v.id + '"><i class="del_img_1">-</i><em class="icon_personBtn icon_personBtn_msg"></em><em class="icon_adderBtn"></em><p class="box_adderName">' + v.name + '</p></li>';
					}else{
						mrcsrnum += '<li userid="' + v.id + '"><i class="del_img_1">-</i><em class="icon_personBtn icon_personBtn_msg" style="background:url(' + v.face + ');border-radius:50%;"></em><em class="icon_adderBtn"></em><p class="box_adderName">' + v.name + '</p></li>';
					}
					
				});
				$('.tanceng .csr_add_xxl').prepend(mrcsrnum)
			}
		},
		error: function(e) {
			console.log(e)
		}
	});
}
$('.xsht_chakan_btn').die().live('click', function() {
		$('.xs_htsp_pass_xxl').css('display', 'none')
		wfqd_ckxq_data.id = $(this).attr('uid');
		wfqd_ckxq_ajax()
	})
	//查看-预览按钮
$('.xsht_ck_yulan_btn').die().live('click', function() {
	$('.tanceng .daochu_xs').attr('htbh',$(this).attr('htbh'));
	//console.log($(this).attr('uid'))
//	if(loginUserInfo['company_admin'] != 1){
//										if(loginUserInfo.powerUrls.length==0){
//											$('.tanceng .daochu_xs').hide();
//											
//										}else{
//											var arr = loginUserInfo.powerUrls;//
//											if($.inArray(xshtdaochu, arr)!=-1){
//												$('.tanceng .daochu_xs').show();
//											}else{
//												$('.tanceng .daochu_xs').hide();
//											}
//										}
//									}
	$('.tanceng .xs_dwsp_ck_juejbtn_xxl').hide()
	$('.tanceng .xs_dwsp_ck_tongguo_btn_xxl').hide()
	xsht_ckyulan_data.id = $(this).attr('uid');
	xsht_ckyulan_ajax.is_open=1;
	xsht_ckyulan_ajax()
})
var xsht_ckyulan_data = {
		token: token,
		id: '',
		is_open:'1'
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

function xsht_ckyulan_ajax() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "market-contract/preview",
		data: xsht_ckyulan_data,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg)
			} else {
				console.log(data)
				var yulanlist = data['datalist'],
					a = '';
				$.each(yulanlist, function(i, v) {
					a += likNullData(v);
				});
				$('.tanceng .xsht_ckyulan_html_xxl').html(a)//+zdylist
				$('.tanceng .dwsp_spbtnyl_html_xxl').html(a)//+zdylist
				var yulan_zdy = data['customdatalist'],
					zdylist = '';
				if(yulan_zdy.length == 0) {
					return;
				} else {
						//strcs.replace(/\s+/g,'<br/>')
					$.each(yulan_zdy, function(i, v) {
						if(v.is_add=='1'){
							zdylist += '<div class="ht_msg"><p class="f_color">' + intToChinese((i + 5)) + '、' + v.name + '</p><p class="f_color">' + v.content.replace(/\s+/g,'<br/>') + '</p></div>';
						}else if(v.is_add=='2'){
							zdylist += '<div class="ht_msg "><p class="c_r">' + intToChinese((i + 5)) + '、' + v.name + '</p><p class="c_r">' + v.content.replace(/\s+/g,'<br/>') + '</p></div>';
						}else{
							zdylist += '<div class="ht_msg"><p>' + intToChinese((i + 5)) + '、' + v.name + '</p><p>' + v.content.replace(/\s+/g,'<br/>') + '</p></div>';
						}
						
					});
					$('.tanceng .ht_msg_bottom').before(zdylist)
				}
				
				

			}
		},
		error: function(e) {
			console.log(e)
		}
	});
}
//选择合同模板列表
//$('.tanceng .xsht_xj_xzhtmb_xxl').live('click',function(){
//	xsht_mbajax_list()
//})
var xsht_mbdata_xxl = {
	token: token,
	thetype: '1',
	page: '1',
	num: '10',
	name: '',
	dept: '',
	uid: '',
	updated_uid: '',
	status:'0'
}

function xsht_mbajax_list() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "contract-template/list",
		data: xsht_mbdata_xxl,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg);
				$('.tanceng .xsht_bj_htmblist_mainnum').html('0')
				$('.tanceng .xsht_xzhtmc_list_xxl').html('');
					var mblist_err = ''
					mblist_err += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
					$('.tanceng .xsht_mblist_errhtml_xxl').html(mblist_err)
					$('.tanceng .xsht_xzhtmb_list_fenye_xxl').css('display', 'none')
			} else {
				console.log(data)
				var mblist = data['datalist']
				$('.tanceng .xsht_bj_htmblist_mainnum').html(data['totalcount'])
				if(mblist.length == 0) {
					$('.tanceng .xsht_xzhtmc_list_xxl').html('');
					$('.tanceng .xsht_bj_htmblist_mainnum').html(data['totalcount'])
					var mblist_err = ''
					mblist_err += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
					$('.tanceng .xsht_mblist_errhtml_xxl').html(mblist_err)
					$('.tanceng .xsht_xzhtmb_list_fenye_xxl').css('display', 'none')
				} else {
					$('.tanceng .xsht_mblist_errhtml_xxl').html('')
					$('.tanceng .xsht_xzhtmb_list_fenye_xxl').css('display', 'block')
					var mb_list_htmls = ''
					$.each(mblist, function(i, v) {//isname="' + v.is_name + '"
						mb_list_htmls += '<tr><td><input type="radio" name="ht_cght_xzcghtmbinp" uid="' + v.id + '" value="' + xxldatakong(v.name) + '" address="' + xxldatakong(v.address) + '" ghrqday="' + xxldatakong(v.deliverydays) + '" kjfpday="' + xxldatakong(v.invoicedays) + '"></td>';
						mb_list_htmls += '<td>' + likNullData(v.name) + '</td>';
						mb_list_htmls += '<td>' + likNullData(v.type_name) + '</td>';
						mb_list_htmls += '<td>' + likNullData(v.dept_name) + '</td>';
						mb_list_htmls += '<td>' + likNullData(v.created_at) + '</td>';
						mb_list_htmls += '<td>' + likNullData(v.create_name) + '</td>';
						mb_list_htmls += '<td>' + likNullData(v.updated_at) + '</td>';
						mb_list_htmls += '<td>' + likNullData(v.updated_name) + '</td>';
						mb_list_htmls += '</tr>';
					});
					$('.tanceng .xsht_xzhtmc_list_xxl').html(mb_list_htmls);
					list_table_render_pagination(".xsht_xzhtmb_list_fenye_xxl", xsht_mbdata_xxl, xsht_mbajax_list, data["totalcount"], mblist.length)
				}
			}
		},
		error: function(e) {
			console.log(e)
			var mblist_err = ''
			mblist_err += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
			$('.tanceng .xsht_mblist_errhtml_xxl').html(mblist_err)
			$('.tanceng .xsht_xzhtmb_list_fenye_xxl').css('display', 'none');
			$('.tanceng .xsht_bj_htmblist_mainnum').html('0')
		}
	});
}
$('.tanceng .xsht_xzhtmb_btn_xxl').die().live('click', function() {
	xsht_mbajax_list()
})
function xsht_bj_mblist(val) {
	xsht_mbdata_xxl.name = val;
	xsht_mbajax_list()
}

$('.xsht_bjmb_list_btn').die().live('click', function() {
	if($('.xsht_bjmb_val_xxl').val() == '' || $('.xsht_bjmb_val_xxl').val() == '搜索合同模板名称') {
		return false;
	} else {
		xsht_mbdata_xxl.name = $('.xsht_bjmb_val_xxl').val();
		xsht_mbajax_list()
	}
})
$('.tanceng .xsht_bj_qued_btn_xxl').die('click').live('click', function() {
	if($('.tanceng input:radio[name="ht_cght_xzcghtmbinp"]:checked').length==0){
		alert('请选择模板')
		return false;
	}
		var radioA = $('.tanceng input:radio[name="ht_cght_xzcghtmbinp"]:checked');
		//console.log(radioA.attr('uid'))
		$('.tanceng .xsht_bj_xzhtmb').attr('uid', radioA.attr('uid'))
		xsht_mbxx_data.id = radioA.attr('uid');
		xsht_mobanxiangqing_ajax();
//		if(radioA.attr('isname') == 1) {
//			$('.tanceng .xsht_bj_xzhtmb').val(radioA.val()).css('color', '#333')
//			$('.tanceng .xsht_bj_htmc').val(radioA.val()).attr({
//				'disabled': 'disabled',
//				'Names': radioA.val()
//			}).css('color', '#333')
//		} else {.removeAttr('disabled')
			$('.tanceng .xsht_bj_xzhtmb').val(radioA.val()).css('color', '#333')
			$('.tanceng .xsht_bj_htmc').val(radioA.val());
		//}
		$('.tanceng .xsht_xj_htmb_xxl').attr('uid', radioA.attr('uid'))
//		if(radioA.attr('isname') == 1) {
//			$('.tanceng .xsht_xj_htmb_xxl').val(radioA.val()).css('color', '#333')
//			$('.tanceng .xsht_xj_xshtmc_xxl').val(radioA.val()).attr({
//				'disabled': 'disabled',
//				'Names': radioA.val()
//			}).css('color', '#333') .removeAttr('disabled')
//		} else {
			$('.tanceng .xsht_xj_htmb_xxl').val(radioA.val()).css('color', '#333')
			$('.tanceng .xsht_xj_xshtmc_xxl').val(radioA.val());
		//}
		$('.tanceng .xsht_xj_qddd_xxl').val(radioA.attr('address')).css('color', '#333')
		$('.tanceng .xsht_xj_ghrq_xxl').val(radioA.attr('ghrqday')).css('color', '#333')
		$('.tanceng .xsht_xj_kjfprq_xxl').val(radioA.attr('kjfpday')).css('color', '#333')
		$(this).parent().parent().parent().remove();
		var num = $('.tanceng').children(".dialog_box").length;
		if(num < 1) {
			$(".tanceng").hide();
		}
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
//$('.tanceng .xshtmoban_bjtiaokuan_btnxxl').die().live('click',function(){
//	$('.tanceng .xsht_mobantk_quedbtnxxl').attr('lents',)//'tkmcs':$(this).attr('tkmcs'),'contents':$(this).attr('contents')
//})
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
	//取消选择模板弹层
$('.tanceng .xsht_bj_quxiao_btn_xxl').live('click', function() {
		$(this).parent().parent().parent().remove();
		var num = $('.tanceng').children(".dialog_box").length;
		if(num < 1) {
			$(".tanceng").hide();
		}
	})
	//取消编辑弹层
$('.tanceng .bjht_yulan_quxiao_btn_xxl').live('click', function() {
		$(this).parent().parent().parent().remove();
		var num = $('.tanceng').children(".dialog_box").length;
		if(num < 1) {
			$(".tanceng").hide();
		}
	})
	//选择销售报价单
var xsbjd_data_xxl = {
	token: token,
	page: '1',
	num: '10',
	keywords: '',//客户名称 编号搜索
	is_quote:'1',
	thetype:'1',
	is_draft:'',
	status:'3',
	flow:'',
	is_quote:'1'
}
$('.tanceng .xsht_bj_xzxsbjd_btn').die().live('click', function() {
	xsbjd_ajax_xxl()
})

function xsbjd_ajax_xxl() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "quote/list",
		data: xsbjd_data_xxl,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg);
				$('.tanceng .xsht_bj_xsbjd_list_xxl').html('');
					$('.tanceng .xsht_xsbjd_nums_xxl').html('0');
					var bjdlist_err = ''
					bjdlist_err += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
					$('.tanceng .xsbjd_err_html_xxl').html(bjdlist_err)
					$('.tanceng .xsht_bj_xsbjdlist_fenye').css('display', 'none')
			} else {
				console.log(data)
				var bjdlist = data['datalist'];

				if(bjdlist.length == 0) {
					$('.tanceng .xsht_bj_xsbjd_list_xxl').html('');
					$('.tanceng .xsht_xsbjd_nums_xxl').html(data.totalcount);
					var bjdlist_err = ''
					bjdlist_err += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
					$('.tanceng .xsbjd_err_html_xxl').html(bjdlist_err)
					$('.tanceng .xsht_bj_xsbjdlist_fenye').css('display', 'none')
				} else {
					$('.tanceng .xsbjd_err_html_xxl').html('')
					$('.tanceng .xsht_bj_xsbjdlist_fenye').css('display', 'block')
					var bjd_list_htmls = '';
						//oknums = [];
					$.each(bjdlist, function(i, v) {
						//if(v.is_invalid == 0 && v.status == 3) {
							//oknums.push(v)
							bjd_list_htmls += '<tr><td><input type="radio" name="xs_xsdd_xzxsbjdinp" khid="'+v.customer_id+'" uid="' + v.id + '" codesn="' + xxldatakong(v.code_sn) + '" jfmc="' + xxldatakong(v.customer_name) + '" zddd="' + xxldatakong(v.customer_address) + '" lxrdh="' + xxldatakong(v.customer_tel) + '" lxr="' + xxldatakong(v.customer_contacts) + '" kpmc="'+xxldatakong(v.customer_account_name)+'" kpyh="'+xxldatakong(v.customer_account_bank)+'" zh="'+xxldatakong(v.customer_pay_account)+'" sh="'+xxldatakong(v.customer_tax_num)+'" totals="'+xxldatakong(v.totals)+'" tax_rate="'+xxldatakong(v.tax_rate)+'"></td>';
							bjd_list_htmls += '<td>' + likNullData(v.code_sn) + '</td>';
							bjd_list_htmls += '<td>' + likNullData(v.lend_code_sn) + '</td><td>' + likNullData(v.customer_name) + '</td>';
							bjd_list_htmls += '<td><span class="c_g">通过</span></td>';
							bjd_list_htmls += '<td>' + likNullData(v.current_name) + '</td>';
							bjd_list_htmls += '<td>' + likNullData(v.money_sum) + '</td>';
							bjd_list_htmls += '<td>'+likNullData(v.tax_money_sum)+'</td>';
							bjd_list_htmls += '<td>' + likNullData(v.totals) + '</td>';
							bjd_list_htmls += '<td>' + likNullData(v.uname) + '</td>';
							bjd_list_htmls += '<td>' + likNullData(v.created_at) + '</td>';
							//bjd_list_htmls += '<td>' + likNullData(v.dept_name) + '</td>';
							//bjd_list_htmls += '<td>' + likNullData(v.owner_name) + '</td>';
							bjd_list_htmls += '</tr>';
						//}

					});
					$('.tanceng .xsht_bj_xsbjd_list_xxl').html(bjd_list_htmls);
					$('.tanceng .xsht_xsbjd_nums_xxl').html(data.totalcount)
					list_table_render_pagination(".xsht_bj_xsbjdlist_fenye", xsbjd_data_xxl, xsbjd_ajax_xxl, data.totalcount, bjdlist.length)
				}
			}
		},
		error: function(e) {
			$('.tanceng .xsht_bj_xsbjd_list_xxl').html('');
			var bjdlist_err = ''
			bjdlist_err += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
			$('.tanceng .xsbjd_err_html_xxl').html(bjdlist_err)
			$('.tanceng .xsht_bj_xsbjdlist_fenye').css('display', 'none')
		}
	});
}
//报价单搜索 后台根据客户名称
function xsht_bj_xsbjd_list_sousuo(val) {
	xsbjd_data_xxl.keywords = val;
	xsbjd_ajax_xxl()
}

$('.xs_bj_sousuo_btn').die().live('click', function() {
		if($('.xs_bj_ss_value_xxl').val() == '' || $('.xs_bj_ss_value_xxl').val() == '搜索报价单编号/客户名称') {
			return false;
		} else {
			xsbjd_data_xxl.keywords = $('.xs_bj_ss_value_xxl').val();
			xsbjd_ajax_xxl()
		}
	})
	//确定
$('.tanceng .xs_bj_xzbjd_qued_btn_xxl').die().live('click', function() {
	if($('.tanceng input:radio[name="xs_xsdd_xzxsbjdinp"]:checked').length==0){
		alert('请选择销售报价单');
		return false;
	}
	
		var radioB = $('.tanceng input:radio[name="xs_xsdd_xzxsbjdinp"]:checked')
		if(radioB.attr('tax_rate')!='1'){
			$('.tanceng .xsht_xj_kjfprq_xxl').val('').attr('readonly',true).addClass('inp_noInput');
			$('.tanceng .xsht_xj_kpmc_xxl').val('').attr('readonly',true).addClass('inp_noInput');
			$('.tanceng .xsht_xj_kpyh_xxl').val('').attr('readonly',true).addClass('inp_noInput');
			$('.tanceng .xsht_xj_zh_xxl').val('').attr('readonly',true).addClass('inp_noInput');
			$('.tanceng .xsht_xj_sh_xxl').val('').attr('readonly',true).addClass('inp_noInput');
		}else{
			$('.tanceng .xsht_xj_kjfprq_xxl').removeAttr('readonly').removeClass('inp_noInput');
			$('.tanceng .xsht_xj_kpmc_xxl').val('').removeAttr('readonly').removeClass('inp_noInput');
			$('.tanceng .xsht_xj_kpyh_xxl').val('').removeAttr('readonly').removeClass('inp_noInput');
			$('.tanceng .xsht_xj_zh_xxl').val('').removeAttr('readonly').removeClass('inp_noInput');
			$('.tanceng .xsht_xj_sh_xxl').val('').removeAttr('readonly').removeClass('inp_noInput');
		}
		$('.tanceng .xsht_bj_xsbjd').val(radioB.attr('codesn')).attr('uid', radioB.attr('uid')).css('color', '#333')
		$('.tanceng .xsht_bj_jfmc').val(radioB.attr('jfmc'));
		$('.tanceng .xsht_bj_zddd').val(radioB.attr('zddd'));
		$('.tanceng .xsht_bj_lxr').val(radioB.attr('lxr')).attr('khid',radioB.attr('khid'));
		$('.tanceng .xsht_bj_lxrdh').val(radioB.attr('lxrdh'));
		$('.tanceng .xsht_xj_xsbjd_xxl').val(radioB.attr('codesn')).attr('uid', radioB.attr('uid')).css('color', '#333')
		$('.tanceng .xsht_xj_jfmc_xxl').val(radioB.attr('jfmc'));
		$('.tanceng .xsht_xj_zddd_xxl').val(radioB.attr('zddd'));
		$('.tanceng .xsht_xj_lxr_xxl').attr('khid',radioB.attr('khid'));
		$('.tanceng .xsht_glbjd_lxrxalxxl').val(radioB.attr('lxr')).attr('khid',radioB.attr('khid'));
		$('.tanceng .xsht_xj_lxrdh_xxl').val(radioB.attr('lxrdh'));
		$('.tanceng .xsht_xj_kpmc_xxl').val(radioB.attr('kpmc'));
		$('.tanceng .xsht_xj_kpyh_xxl').val(radioB.attr('kpyh'));
		$('.tanceng .xsht_xj_zh_xxl').val(radioB.attr('zh'));
		$('.tanceng .xsht_xj_sh_xxl').val(radioB.attr('sh'));
		$('.tanceng .xshtxj_xsbjdmainums_xxl').html(radioB.attr('totals'));
		if(radioB.attr('totals')==null||radioB.attr('totals')==''||radioB.attr('totals')==undefined||parseInt(radioB.attr('totals'))<=0){
			$('.tanceng .xsht_addhkjduan_xxl[name="term_add"]').attr('disabled','disabled');
		}else{
			$('.tanceng .xsht_addhkjduan_xxl[name="term_add"]').removeAttr('disabled');
		}
		$('.tanceng .xsht_hklcmoney_xxl').html(radioB.attr('totals'));
		
		$(this).parent().parent().parent().remove();
		var num = $('.tanceng').children(".dialog_box").length;
		if(num < 1) {
			$(".tanceng").hide();
		}
	})
//选择联系人
var huoqu_kehuxq_data = {
	token:token,
	customer_id:''
}
function huoqu_kehuxq_ajax(){
	$.ajax({
		type:"get",
		url:SERVER_URL+"customer/contact",
		data:huoqu_kehuxq_data,
		dataType:'json',
		success:function(data){
			if(data.code!=0){
				console.log(data)
			}else{
				console.log(data);
				var khlist = data['data'],khtml='';
				$.each(khlist, function(i,v) {
					khtml +='<li tel="'+v.tel+'">'+likNullData(v.name)+'</li>'
				});
				$('.tanceng .xsht_xj_xzlianxiren_xxl').html(khtml);
			}
		},
		error:function(e){
			console.log(e)
		}
	});
}
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
$('.tanceng .xsht_xj_xzlianxiren_xxl>li').die().live('click',function(){
	$('.tanceng .xsht_xj_lxrdh_xxl').val($(this).attr('tel'));
})
$('.tanceng .xsht_xj_lxr_xxl').die().live('click',function(){
	huoqu_kehuxq_data.customer_id = $(this).attr('khid');
	huoqu_kehuxq_ajax();
})
	//取消 选择报价单
$('.tanceng .xsht_bj_xzxsbjd_qx_btn').live('click', function() {
		$(this).parent().parent().parent().remove();
		var num = $('.tanceng').children(".dialog_box").length;
		if(num < 1) {
			$(".tanceng").hide();
		}
	})
	//选择回款流程
var xs_bj_hklcdata_xxl = {
	token: token,
	page: '1',
	num: '10',
	key: '', //客户流程
	dept: '',
	creater_id: '',
	owner_id: '',
	created_at: '',
	updated_at: '',
	status: '0'
}
$('.tanceng .xsht_bj_xzhklc_btn_xxl').die().live('click', function() {
	xs_bj_hklcajax_xxl()
})

function xs_bj_hklcajax_xxl() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "customer-pay-flow/list",
		data: xs_bj_hklcdata_xxl,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg);
				$('.tanceng .xs_bj_hklclist_mainnum_xxl').html('0')
					$('.tanceng .xsht_bj_hklclist_html_xxl').html('');
					var hklclist_err = ''
					hklclist_err += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
					$('.tanceng .xs_bj_hklc_errhtmllist_xxl').html(hklclist_err)
					$('.tanceng .xsht_bj_hklc_fenye_xxl').css('display', 'none')
			} else {
				console.log(data)
				var hklclist = data['datalist'];

				if(hklclist.length == 0) {
					$('.tanceng .xs_bj_hklclist_mainnum_xxl').html(data["totalcount"])
					$('.tanceng .xsht_bj_hklclist_html_xxl').html('');
					var hklclist_err = ''
					hklclist_err += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
					$('.tanceng .xs_bj_hklc_errhtmllist_xxl').html(hklclist_err)
					$('.tanceng .xsht_bj_hklc_fenye_xxl').css('display', 'none')
				} else {
					$('.tanceng .xs_bj_hklc_errhtmllist_xxl').html('')
					$('.tanceng .xsht_bj_hklc_fenye_xxl').css('display', 'block')
					var hklc_list_htmls = '';
					$.each(hklclist, function(i, v) {
						hklc_list_htmls += '<tr><td><input type="radio" name="ht_seal_xzxsjhinp" uid="' + v.id + '" names="' + v.name + '"></td>';
						hklc_list_htmls += '<td>' + v.name + '</td>';
						hklc_list_htmls += '<td>' + v.dept_name + '</td>';
						hklc_list_htmls += '<td>' + v.uname + '</td>';
						hklc_list_htmls += '<td>' + v.created_at + '</td>';
						hklc_list_htmls += '<td>' + v.updated_name + '</td>';
						hklc_list_htmls += '<td>' + v.updated_at + '</td>';
						hklc_list_htmls += '</tr>';
					});
					$('.tanceng .xsht_bj_hklclist_html_xxl').html(hklc_list_htmls);
					$('.tanceng .xs_bj_hklclist_mainnum_xxl').html(data["totalcount"])
					list_table_render_pagination(".xsht_bj_hklc_fenye_xxl", xs_bj_hklcdata_xxl, xs_bj_hklcajax_xxl, data["totalcount"], hklclist.length)
				}
			}
		},
		error: function(e) {
			console.log(e)
			$('.tanceng .xsht_bj_hklclist_html_xxl').html('');
			$('.tanceng .xs_bj_hklclist_mainnum_xxl').html('0')
			var hklclist_err = ''
			hklclist_err += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
			$('.tanceng .xs_bj_hklc_errhtmllist_xxl').html(hklclist_err)
			$('.tanceng .xsht_bj_hklc_fenye_xxl').css('display', 'none')
		}
	});
}
//回款流程搜索 后台根据客户名称
function xsht_bj_hklc_list_ss(val) {
	xs_bj_hklcdata_xxl.key = val;
	xs_bj_hklcajax_xxl()
}

$('.xsbj_hklc_ss_btn').die().live('click', function() {
		if($('.xsbj_hklc_value_ss_xxl').val() == '' || $('.xsbj_hklc_value_ss_xxl').val() == '搜索回款流程名称') {
			return false;
		} else {
			xs_bj_hklcdata_xxl.key = $('.xsbj_hklc_value_ss_xxl').val();
			xs_bj_hklcajax_xxl()
		}
	})
	//确定
$('.tanceng .xs_bj_hklc_queding_btn_xxl').die('click').live('click', function() {
	if($('.tanceng input:radio[name="ht_seal_xzxsjhinp"]:checked').length==0){
		alert('请选择回款流程');
		return false;
	}
	var radioC = $('.tanceng input:radio[name="ht_seal_xzxsjhinp"]:checked')
	$('.tanceng .xsht_bj_xzhklc').val(radioC.attr('names')).attr('uid', radioC.attr('uid')).css('color', '#333');
	$('.tanceng .xsht_xj_hklc_xxl').val(radioC.attr('names')).attr('uid', radioC.attr('uid')).css('color', '#333')
	$(this).parent().parent().parent().remove();
	var num = $('.tanceng').children(".dialog_box").length;
	if(num < 1) {
		$(".tanceng").hide();
	}
})
$('.tanceng .xs_bj_hklc_quxiao_btnxxl').live('click', function() {
		$(this).parent().parent().parent().remove();
		var num = $('.tanceng').children(".dialog_box").length;
		if(num < 1) {
			$(".tanceng").hide();
		}
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
function xsbjbm_ajax(){
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
			$('.xs_bj_bmtree_list').html(tree_list_dialog(datalists, deep));
		}
	},
	error: function(e) {

	}
});
}

$('.tanceng .xsbj_xzbm_btn_xxl').die().live('click', function() {
		//console.log($('.tanceng .xs_bj_bmtree_list li.on').attr('cussortid'),$('.tanceng .xs_bj_bmtree_list li.on').children('span.list_msg').html())
		var bmuid = $('.tanceng .xs_bj_bmtree_list li.on').attr('cussortid'),
			bmmcs = $('.tanceng .xs_bj_bmtree_list li.on').children('span.list_msg').html();
		$('.tanceng .xsht_bj_xzfzbm').val(bmmcs).attr('uid', bmuid).css('color', '#333');
		$('.tanceng .xsht_xj_fzbm_xxl').val(bmmcs).attr('uid', bmuid).css('color', '#333');
		$(this).parent().parent().parent().remove();
		var num = $('.tanceng').children(".dialog_box").length;
		if(num < 1) {
			$(".tanceng").hide();
		}
	})
	//选择负责人
$('.tanceng .xsht_bj_xzfzr_btn_xxl').die('click').live('click', function() {
		//console.log($('.tanceng .spcy_tree_xxl li.on').attr('userinfoid'),$('.tanceng .spcy_tree_xxl li.on').children('span.list_msg').html())
		var xshtbj_fzrid = $('.tanceng .spcy_tree_xxl li.on').attr('userinfoid'),
			xshtbj_fzrmc = $('.tanceng .spcy_tree_xxl li.on').children('span.list_msg').html(),
			bmmc = $('.tanceng .spcy_tree_xxl li.on').parents('ul').prev('li').children('.list_msg').html(),
			bmid = $('.tanceng .spcy_tree_xxl li.on').parents('ul').prev('li').attr('cussortid');
		$('.tanceng .xsht_bj_fzr').val(xshtbj_fzrmc).attr('uid', xshtbj_fzrid).css('color', '#333');
		$('.tanceng .xsht_bj_xzfzbm').val(bmmc.substring(-1,3)).attr('uid',bmid).css('color', '#333');
		$('.tanceng .xsht_xj_fzr_xxl').val(xshtbj_fzrmc).attr('uid', xshtbj_fzrid).css('color', '#333');
		$('.tanceng .xsht_xj_fzbm_xxl').val(bmmc.substring(-1,3)).attr('uid',bmid).css('color', '#333');
		$(this).parent().parent().parent().remove();
		var num = $('.tanceng').children(".dialog_box").length;
		if(num < 1) {
			$(".tanceng").hide();
		}
	})
	//新建销售合同
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
	category:'1',//
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
$('.xsht_xinjian_bh_btn_xxl').die('click').live('click', function() {
	numa = []
	xsht_huoquspr_ajax()
	$('.tanceng .xsht_xj_qdrq_xxl').val(nowss)
	$('.tanceng .xsht_xj_zdrq_xxl').html(now)
	$('.tanceng .xsht_xj_fzr_xxl').val(username).attr('uid',tokenid);//department_id
	$('.tanceng .xsht_xj_fzbm_xxl').val(department_name).attr('uid',department_id);
	$.ajax({
		type: "get",
		url: SERVER_URL + "admin/autoload",
		data: {
			token: token,
			args: 'XHT'
		},
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg)
			} else {
				console.log(data)
				$('.tanceng .xsht_xj_xshtbh_xxl').val(data.data)
				$('.tanceng .xsht_xj_zdrname_xxl').html(username)
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
				var zhhtml = '';
				$.each(data.data.dataList, function(i, v) {
					zhhtml += '<li uid="' + v.id + '" gsid="' + likNullData(v.company_id) + '" khmc="' + likNullData(v.company_account_name) + '" khyh="' + likNullData(v.account_bank) + '" hkzh="' + likNullData(v.account_num) + '">' + likNullData(v.company_account_name) + '</li>';
				});
				$('.tanceng .xsht_xj_xzzh_xxl').html(zhhtml)
			}
		},
		error: function(e) {

		}
	});
})
function xsht_bj_xzzh(){
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
				var zhhtml = '';
				$.each(data.data.dataList, function(i, v) {
					zhhtml += '<li uid="' + v.id + '" gsid="' + likNullData(v.company_id) + '" khmc="' + likNullData(v.company_account_name) + '" khyh="' + likNullData(v.account_bank) + '" hkzh="' + likNullData(v.account_num) + '">' + likNullData(v.company_account_name) + '</li>';
				});
				$('.tanceng .xsht_bj_xzzh_xxl').html(zhhtml)
			}
		},
		error: function(e) {

		}
	});
}
$('.tanceng .xsht_xj_xzzh_xxl li').die().live('click', function() {
	$('.tanceng .xsht_xj_zhs_xxl').attr('uid', $(this).attr('uid')).val($(this).attr('khmc')).addClass('c_3');
	$('.tanceng .xsht_xj_khmc_xxl').val($(this).attr('khmc'));
	$('.tanceng .xsht_xj_khyh_xxl').val($(this).attr('khyh'));
	$('.tanceng .xsht_xj_hkzhs_xxl').val($(this).attr('hkzh'));
})
$('.tanceng .xsht_bj_xzzh_xxl li').die().live('click', function() {
	$('.tanceng .xsht_bj_xzzh').attr('uid', $(this).attr('uid')).val($(this).attr('khmc')).addClass('c_3');
	$('.tanceng .xsht_bj_khmc').val($(this).attr('khmc'));
	$('.tanceng .xsht_bj_khyh').val($(this).attr('khyh'));
	$('.tanceng .xsht_bj_hkzh').val($(this).attr('hkzh'));
})
$('.tanceng .xsht_xj_xzhtmb_xxl').die().live('click', function() {
	xsht_mbdata_xxl.name = '';
	xsht_mbajax_list()
})
$('.tanceng .xsht_xj_xzxsbjd_xxl').die('click').live('click', function() {
	xsbjd_ajax_xxl()
})
$('.tanceng .xsht_xj_hklc_btn_xxl').die().live('click', function() {
	xs_bj_hklcajax_xxl()
})
//回款流程效果
$('.tanceng .xsht_hklc_addbaifen_xxl').die().live('keyup',function(){
	var main_my = parseInt($('.tanceng .xshtxj_xsbjdmainums_xxl').html()),arr=[],nums_a=0;//
	
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
            var main_my = parseInt($('.tanceng .xshtxj_xsbjdmainums_xxl').html()),arr=[],nums_a=0;//
	
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
	//编辑销售合同
var bjxsht_data_list_xxl = {
		token: token,
		id: '',
		market_sn: '', //销售合同编号
		name: '', //销售合同名称
		template_id: '', //合同模板id
		quote_id: '', //销售报价单id
		back_pay_id: '', //回款流程id
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
		dept_name:'',
		owner_name:'',
		steps:'',
		terms:'',
		is_draft:'0'
	}
//新建保存
$('.tanceng .xsht_xjbaocun_btnxxl').die('click').live('click', function() {
		bjxsht_data_list_xxl.id = '';
		bjxsht_data_list_xxl.is_draft='1';
		bjxsht_data_list_xxl.is_open = '1';
		bjxsht_data_list_xxl.market_sn = $('.tanceng .xsht_xj_xshtbh_xxl').val();
//		if(typeof($('.tanceng .xsht_xj_htmb_xxl').attr('uid')) == "undefined") {
//			alert('请选择合同模板')
//			return false;
//		}
//		if($('.tanceng .xsht_xj_xshtmc_xxl').val() == '' || $('.tanceng .xsht_xj_xshtmc_xxl').val() == '销售合同名称') {
//			alert('请输入销售合同名称或不能为空');
//			return false;
//		}
		bjxsht_data_list_xxl.template_id = $('.tanceng .xsht_xj_htmb_xxl').attr('uid');
		bjxsht_data_list_xxl.name = $('.tanceng .xsht_xj_xshtmc_xxl').val();
//		if(typeof($('.tanceng .xsht_xj_xsbjd_xxl').attr('uid')) == "undefined") {
//			alert('请选择销售报价单')
//			return false;
//		}
		bjxsht_data_list_xxl.quote_id = $('.tanceng .xsht_xj_xsbjd_xxl').attr('uid');
//		if(typeof($('.tanceng .xsht_xj_hklc_xxl').attr('uid')) == "undefined") {
//			alert('请选择回款流程')
//			return false;
//		}
//		bjxsht_data_list_xxl.back_pay_id = $('.tanceng .xsht_xj_hklc_xxl').attr('uid');
//		if(typeof($('.tanceng .xsht_xj_fzbm_xxl').attr('uid')) == "undefined"||$('.tanceng .xsht_xj_fzbm_xxl').val()==''||$('.tanceng .xsht_xj_fzbm_xxl').attr('uid')=='0') {
//			alert('没有负责部门不能提交合同')
//			return false;
//		}
		bjxsht_data_list_xxl.dept_name = $('.tanceng .xsht_xj_fzbm_xxl').val();
		bjxsht_data_list_xxl.dept_id = $('.tanceng .xsht_xj_fzbm_xxl').attr('uid');
//		if(typeof($('.tanceng .xsht_xj_fzr_xxl').attr('uid')) == "undefined") {
//			alert('请选择负责人')
//			return false;
//		}
		bjxsht_data_list_xxl.owner_name = $('.tanceng .xsht_xj_fzr_xxl').val();
		bjxsht_data_list_xxl.owner_id = $('.tanceng .xsht_xj_fzr_xxl').attr('uid');
		bjxsht_data_list_xxl.sign_time = $('.tanceng .xsht_xj_qdrq_xxl').val();
		bjxsht_data_list_xxl.sign_address = $('.tanceng .xsht_xj_qddd_xxl').val();
		bjxsht_data_list_xxl.need_name = $('.tanceng .xsht_xj_jfmc_xxl').val();
//		if($('.tanceng .xsht_xj_ghrq_xxl').val() == '') {
//			alert('请输入供货日期-以数字表示')
//			return false;
//		} else if(!isNaN($('.tanceng .xsht_xj_ghrq_xxl').val()) && $('.tanceng .xsht_xj_ghrq_xxl').val() > 0) {
//			bjxsht_data_list_xxl.supply_day = $('.tanceng .xsht_xj_ghrq_xxl').val();
//		}
		bjxsht_data_list_xxl.supply_day = $('.tanceng .xsht_xj_ghrq_xxl').val();
//		if($('.tanceng .xsht_xj_zddd_xxl').val() == '') {
//			alert('请输入指定地点')
//			return false;
//		}
		bjxsht_data_list_xxl.assign_address = $('.tanceng .xsht_xj_zddd_xxl').val();
//		if($('.tanceng .xsht_glbjd_lxrxalxxl').val() == '') {
//			alert('请输入联系人')
//			return false;
//		}
		bjxsht_data_list_xxl.contact = $('.tanceng .xsht_glbjd_lxrxalxxl').val();
//		if($('.tanceng .xsht_xj_lxrdh_xxl').val() == '' || !isPhone.test($('.tanceng .xsht_xj_lxrdh_xxl').val())&&!isMobile.test($('.tanceng .xsht_xj_lxrdh_xxl').val())) {
//			alert('请输入正确的联系人电话')
//			return false;
//		}
		bjxsht_data_list_xxl.contact_tel = $('.tanceng .xsht_xj_lxrdh_xxl').val();
//		if(typeof($('.tanceng .xsht_xj_zhs_xxl').attr('uid')) == "undefined") {
//			alert('请选择账户')
//			return false;
//		}
		bjxsht_data_list_xxl.chance_account = $('.tanceng .xsht_xj_zhs_xxl').attr('uid');
		bjxsht_data_list_xxl.open_account = $('.tanceng .xsht_xj_khmc_xxl').val();
		bjxsht_data_list_xxl.open_bank = $('.tanceng .xsht_xj_khyh_xxl').val();
		bjxsht_data_list_xxl.remit_account = $('.tanceng .xsht_xj_hkzhs_xxl').val();
//		if(typeof($('.tanceng .xsht_xj_kjfprq_xxl').attr('readonly'))=='undefined'){
//			if($('.tanceng .xsht_xj_kjfprq_xxl').val() == '') {
//			alert('请输入开具发票日期-以数字表示')
//			return false;
//		} else if(!isNaN($('.tanceng .xsht_xj_kjfprq_xxl').val()) && $('.tanceng .xsht_xj_kjfprq_xxl').val() > 0) {
//			bjxsht_data_list_xxl.open_ticket = $('.tanceng .xsht_xj_kjfprq_xxl').val();
//		} else {
//			alert('请输入开具发票日期-以正整数表示')
//			return false;
//		}
//		}else{
//			
//		}
		bjxsht_data_list_xxl.open_ticket = $('.tanceng .xsht_xj_kjfprq_xxl').val();
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
			bjxsht_data_list_xxl.steps = '';	
		}else{
			var hklc_arr = [];
			$('.tanceng .bargin_tbody').children('tr').each(function(i,v){
			hklc_arr.push({
				'pay_rate':$(this).children().eq(0).children().children('.t_right').children().children('input').val(),
				'segment':$(this).children().eq(1).children().children('.t_right').find('input').val(),
				'money':$(this).children().eq(2).children('.c_r').html()
			})
		})
		bjxsht_data_list_xxl.steps = JSON.stringify(hklc_arr);
		}
		
//		var hklc_arr = [];
//		$('.tanceng .bargin_tbody').children('tr').each(function(i,v){
//			hklc_arr.push({
//				'segment':$(this).children().eq(0).children().children('.t_right').children().children('input').val(),
//				'pay_rate':$(this).children().eq(1).children().children('.t_right').find('input').val(),
//				'money':$(this).children().eq(2).children('.c_r').html()
//			})
//		})
//		//console.log(hklc_arr)
//		bjxsht_data_list_xxl.steps = JSON.stringify(hklc_arr);
		var xsht_tklist=[]
//		$('.tanceng .xsht_mobantiaokuan_listxxl').children().each(function(i,v){
//			xsht_tklist.push({
//				'name':$(this).attr('tkmcs'),
//				'content':$(this).attr('contents'),
//				'is_add':$(this).attr('is_add')
//			})
//		})
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
		bjxsht_data_list_xxl.terms=JSON.stringify(xsht_tklist);
		bjxsht_data_list_xxl.open_ticket_name = $('.tanceng .xsht_xj_kpmc_xxl').val();
		bjxsht_data_list_xxl.open_ticket_bank = $('.tanceng .xsht_xj_kpyh_xxl').val();
		bjxsht_data_list_xxl.account = $('.tanceng .xsht_xj_zh_xxl').val();
		bjxsht_data_list_xxl.tax_point = $('.tanceng .xsht_xj_sh_xxl').val();
		bjxsht_data_list_xxl.reg_address_tel = $('.tanceng .xsht_xj_zcdzdh_xxl').val();
		var flowhtxj = [];
		$.each($('.tanceng .spr_add_xxl>li[userid]'), function(i, v) {
			flowhtxj.push($(this).attr('userid'))
		});
//		if(flowhtxj.length==0){
//			alert('请选择审批人员');
//			return false;
//		}
		var copyxsxj = [];
		$.each($('.tanceng .csr_add_xxl>li[userid]'), function(i, v) {
			copyxsxj.push($(this).attr('userid'))
		});
		bjxsht_data_list_xxl.flow = flowhtxj.join();
		bjxsht_data_list_xxl.copy_list = copyxsxj.join();
		//console.log(bjxsht_data_list_xxl.flow+':::'+bjxsht_data_list_xxl.copy_list)
		xsht_bjajax_xxl()
		$(this).parent().parent().parent().remove();
		var num = $('.tanceng').children(".dialog_box").length;
		if(num < 1) {
			$(".tanceng").hide();
		}
	})
//新建
$('.tanceng .xsht_xj_tjsp_btn').die('click').live('click', function() {
		bjxsht_data_list_xxl.id = '';
		bjxsht_data_list_xxl.is_open = '1';
		bjxsht_data_list_xxl.market_sn = $('.tanceng .xsht_xj_xshtbh_xxl').val();
		if(typeof($('.tanceng .xsht_xj_htmb_xxl').attr('uid')) == "undefined") {
			alert('请选择合同模板')
			return false;
		}
		if($('.tanceng .xsht_xj_xshtmc_xxl').val() == '' || $('.tanceng .xsht_xj_xshtmc_xxl').val() == '销售合同名称') {
			alert('请输入销售合同名称或不能为空');
			return false;
		}
		bjxsht_data_list_xxl.template_id = $('.tanceng .xsht_xj_htmb_xxl').attr('uid');
		bjxsht_data_list_xxl.name = $('.tanceng .xsht_xj_xshtmc_xxl').val();
		if(typeof($('.tanceng .xsht_xj_xsbjd_xxl').attr('uid')) == "undefined") {
			alert('请选择销售报价单')
			return false;
		}
		bjxsht_data_list_xxl.quote_id = $('.tanceng .xsht_xj_xsbjd_xxl').attr('uid');
//		if(typeof($('.tanceng .xsht_xj_hklc_xxl').attr('uid')) == "undefined") {
//			alert('请选择回款流程')
//			return false;
//		}
//		bjxsht_data_list_xxl.back_pay_id = $('.tanceng .xsht_xj_hklc_xxl').attr('uid');
		if(typeof($('.tanceng .xsht_xj_fzbm_xxl').attr('uid')) == "undefined"||$('.tanceng .xsht_xj_fzbm_xxl').val()==''||$('.tanceng .xsht_xj_fzbm_xxl').attr('uid')=='0') {
			alert('没有负责部门不能提交合同')
			return false;
		}
		bjxsht_data_list_xxl.dept_name = $('.tanceng .xsht_xj_fzbm_xxl').val();
		bjxsht_data_list_xxl.dept_id = $('.tanceng .xsht_xj_fzbm_xxl').attr('uid');
//		if(typeof($('.tanceng .xsht_xj_fzr_xxl').attr('uid')) == "undefined") {
//			alert('请选择负责人')
//			return false;
//		}
		bjxsht_data_list_xxl.owner_name = $('.tanceng .xsht_xj_fzr_xxl').val();
		bjxsht_data_list_xxl.owner_id = $('.tanceng .xsht_xj_fzr_xxl').attr('uid');
		bjxsht_data_list_xxl.sign_time = $('.tanceng .xsht_xj_qdrq_xxl').val();
		bjxsht_data_list_xxl.sign_address = $('.tanceng .xsht_xj_qddd_xxl').val();
		bjxsht_data_list_xxl.need_name = $('.tanceng .xsht_xj_jfmc_xxl').val();
		if($('.tanceng .xsht_xj_ghrq_xxl').val() == '') {
			alert('请输入供货日期-以数字表示')
			return false;
		} else if(!isNaN($('.tanceng .xsht_xj_ghrq_xxl').val()) && $('.tanceng .xsht_xj_ghrq_xxl').val() > 0) {
			bjxsht_data_list_xxl.supply_day = $('.tanceng .xsht_xj_ghrq_xxl').val();
		}

		if($('.tanceng .xsht_xj_zddd_xxl').val() == '') {
			alert('请输入指定地点')
			return false;
		}
		bjxsht_data_list_xxl.assign_address = $('.tanceng .xsht_xj_zddd_xxl').val();
//		if($('.tanceng .xsht_glbjd_lxrxalxxl').val() == '') {
//			alert('请输入联系人')
//			return false;
//		}
		bjxsht_data_list_xxl.contact = $('.tanceng .xsht_glbjd_lxrxalxxl').val();
//		if($('.tanceng .xsht_xj_lxrdh_xxl').val() == '' || !isPhone.test($('.tanceng .xsht_xj_lxrdh_xxl').val())&&!isMobile.test($('.tanceng .xsht_xj_lxrdh_xxl').val())) {
//			alert('请输入正确的联系人电话')
//			return false;
//		}
		bjxsht_data_list_xxl.contact_tel = $('.tanceng .xsht_xj_lxrdh_xxl').val();
		if(typeof($('.tanceng .xsht_xj_zhs_xxl').attr('uid')) == "undefined") {
			alert('请选择账户')
			return false;
		}
		bjxsht_data_list_xxl.chance_account = $('.tanceng .xsht_xj_zhs_xxl').attr('uid');
		bjxsht_data_list_xxl.open_account = $('.tanceng .xsht_xj_khmc_xxl').val();
		bjxsht_data_list_xxl.open_bank = $('.tanceng .xsht_xj_khyh_xxl').val();
		bjxsht_data_list_xxl.remit_account = $('.tanceng .xsht_xj_hkzhs_xxl').val();
		if(typeof($('.tanceng .xsht_xj_kjfprq_xxl').attr('readonly'))=='undefined'){
			if($('.tanceng .xsht_xj_kjfprq_xxl').val() == '') {
			alert('请输入开具发票日期-以数字表示')
			return false;
		} else if(!isNaN($('.tanceng .xsht_xj_kjfprq_xxl').val()) && $('.tanceng .xsht_xj_kjfprq_xxl').val() > 0) {
			bjxsht_data_list_xxl.open_ticket = $('.tanceng .xsht_xj_kjfprq_xxl').val();
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
		//console.log(hklc_arr)
		bjxsht_data_list_xxl.steps = JSON.stringify(hklc_arr);
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
		bjxsht_data_list_xxl.terms=JSON.stringify(xsht_tklist);
		bjxsht_data_list_xxl.open_ticket_name = $('.tanceng .xsht_xj_kpmc_xxl').val();
		bjxsht_data_list_xxl.open_ticket_bank = $('.tanceng .xsht_xj_kpyh_xxl').val();
		bjxsht_data_list_xxl.account = $('.tanceng .xsht_xj_zh_xxl').val();
		bjxsht_data_list_xxl.tax_point = $('.tanceng .xsht_xj_sh_xxl').val();
		bjxsht_data_list_xxl.reg_address_tel = $('.tanceng .xsht_xj_zcdzdh_xxl').val();
		var flowhtxj = [];
		$.each($('.tanceng .spr_add_xxl>li[userid]'), function(i, v) {
			flowhtxj.push($(this).attr('userid'))
		});
		if(flowhtxj.length==0){
			alert('请选择审批人员');
			return false;
		}
		var copyxsxj = [];
		$.each($('.tanceng .csr_add_xxl>li[userid]'), function(i, v) {
			copyxsxj.push($(this).attr('userid'))
		});
		bjxsht_data_list_xxl.flow = flowhtxj.join();
		bjxsht_data_list_xxl.copy_list = copyxsxj.join();
		//console.log(bjxsht_data_list_xxl.flow+':::'+bjxsht_data_list_xxl.copy_list)
		xsht_bjajax_xxl()
		$(this).parent().parent().parent().remove();
		var num = $('.tanceng').children(".dialog_box").length;
		if(num < 1) {
			$(".tanceng").hide();
		}
	})
	//$('.tanceng .xsht_bj_qued_btn_xxl').die().live('click',function(){
	//	var radioA = $('input:radio[name="ht_cght_xzcghtmbinp"]:checked')
	//	if(radioA.attr('isname')==1){
	//		$('.tanceng .xsht_xj_htmb_xxl').val(radioA.val()).attr('uid',radioA.attr('uid')).css('color','#333')
	//		$('.tanceng .xsht_xj_xshtmc_xxl').val(radioA.val()).attr({'disabled':'disabled','Names':radioA.val()}).css('color','#333')
	//	}else{
	//		$('.tanceng .xsht_xj_htmb_xxl').val(radioA.val()).css('color','#333')
	//		$('.tanceng .xsht_xj_xshtmc_xxl').val(radioA.val()).removeAttr('disabled')
	//	}
	//	$('.tanceng .xsht_xj_qddd_xxl').val(radioA.attr('address')).css('color','#333')
	//		$('.tanceng .xsht_xj_ghrq_xxl').val(radioA.attr('ghrqday')).css('color','#333')
	//		$('.tanceng .xsht_xj_kjfprq_xxl').val(radioA.attr('kjfpday')).css('color','#333');
	//		$(this).parent().parent().parent().remove();
	//		var num = $('.tanceng').children(".dialog_box").length;
	//		if(num < 1) {
	//			$(".tanceng").hide();
	//		}
	//})

	//查看内的编辑按钮
$('.xsht_bjbtn_ck').die().live('click', function() {
	//console.log($(this).attr('uid'))
	wfqd_ckxq_ajax()
	
})
$('.xsht_bj_btn').die().live('click', function() {
	xsht_huoquspr_ajax();
	wfqd_ckxq_data.id = $(this).attr('uid')
	wfqd_ckxq_ajax()
	xsht_bj_xzzh()
})

function xsht_bjajax_xxl() {
	$.ajax({
		type: "post",
		url: SERVER_URL + "market-contract/add",
		data: bjxsht_data_list_xxl,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg)
			} else {
				console.log(data)
				if(data.is_open!=0){
					xsht_list_ajax_xxl()
					xsht_ckyulan_data.is_open=1;
				}else{
					//$('.tanceng .xsht_xinjianyulan_btnxxl').addClass('val_dialogTop').attr('name','ht_seal_preview').trigger('click');
					$('.tanceng').append($(".dialog_box[name='ht_seal_preview']").parent().html()).show();
					$(".tanceng .dialog_box").show();
			        $(".dialog_box[name='ht_seal_preview']").css({
			            "z-index": "1",
			            "position": "absolute"
			        });
			        $('.tanceng .xs_dwsp_ck_juejbtn_xxl').hide();
			         $('.tanceng .xs_dwsp_ck_tongguo_btn_xxl').hide();
					xsht_ckyulan_data.id = data.id;
					xsht_ckyulan_data.is_open = 0;
					xsht_ckyulan_ajax()
				}
				
			}
		},
		error: function(e) {
			console.log(e)
		}
	});
}
//新建销售合同预览效果
$('.tanceng .xsht_xinjianyulan_btnxxl').die().live('click',function(){
	bjxsht_data_list_xxl.id = '';
	bjxsht_data_list_xxl.is_open = '0';
	bjxsht_data_list_xxl.market_sn = $('.tanceng .xsht_xj_xshtbh_xxl').val();
		if(typeof($('.tanceng .xsht_xj_htmb_xxl').attr('uid')) == "undefined") {
			alert('请选择合同模板')
			return false;
		}
		if($('.tanceng .xsht_xj_xshtmc_xxl').val() == '' || $('.tanceng .xsht_xj_xshtmc_xxl').val() == '销售合同名称') {
			alert('请输入销售合同名称或不能为空');
			return false;
		}
		bjxsht_data_list_xxl.template_id = $('.tanceng .xsht_xj_htmb_xxl').attr('uid');
		bjxsht_data_list_xxl.name = $('.tanceng .xsht_xj_xshtmc_xxl').val();
		if(typeof($('.tanceng .xsht_xj_xsbjd_xxl').attr('uid')) == "undefined") {
			alert('请选择销售报价单')
			return false;
		}
		bjxsht_data_list_xxl.quote_id = $('.tanceng .xsht_xj_xsbjd_xxl').attr('uid');
//		if(typeof($('.tanceng .xsht_xj_hklc_xxl').attr('uid')) == "undefined") {
//			alert('请选择回款流程')
//			return false;
//		}
//		bjxsht_data_list_xxl.back_pay_id = $('.tanceng .xsht_xj_hklc_xxl').attr('uid');
		if(typeof($('.tanceng .xsht_xj_fzbm_xxl').attr('uid')) == "undefined"||$('.tanceng .xsht_xj_fzbm_xxl').attr('uid')=='0') {
			alert('没有负责部门不能提交')
			return false;
		}
		bjxsht_data_list_xxl.dept_name = $('.tanceng .xsht_xj_fzbm_xxl').val();
		bjxsht_data_list_xxl.dept_id = $('.tanceng .xsht_xj_fzbm_xxl').attr('uid');
//		if(typeof($('.tanceng .xsht_xj_fzr_xxl').attr('uid')) == "undefined") {
//			alert('请选择负责人')
//			return false;
//		}
		bjxsht_data_list_xxl.owner_name = $('.tanceng .xsht_xj_fzr_xxl').val();
		bjxsht_data_list_xxl.owner_id = $('.tanceng .xsht_xj_fzr_xxl').attr('uid');
		bjxsht_data_list_xxl.sign_time = $('.tanceng .xsht_xj_qdrq_xxl').val();
		bjxsht_data_list_xxl.sign_address = $('.tanceng .xsht_xj_qddd_xxl').val();
		bjxsht_data_list_xxl.need_name = $('.tanceng .xsht_xj_jfmc_xxl').val();
		if($('.tanceng .xsht_xj_ghrq_xxl').val() == '') {
			alert('请输入供货日期-以数字表示')
			return false;
		} else if(!isNaN($('.tanceng .xsht_xj_ghrq_xxl').val()) && $('.tanceng .xsht_xj_ghrq_xxl').val() > 0) {
			bjxsht_data_list_xxl.supply_day = $('.tanceng .xsht_xj_ghrq_xxl').val();
		} else {
			alert('请输入供货日期-以正整数表示')
			return false;
		}

		if($('.tanceng .xsht_xj_zddd_xxl').val() == '') {
			alert('请输入指定地点')
			return false;
		}
		bjxsht_data_list_xxl.assign_address = $('.tanceng .xsht_xj_zddd_xxl').val();
//		if($('.tanceng .xsht_glbjd_lxrxalxxl').val() == '') {
//			alert('请输入联系人')
//			return false;
//		}
		bjxsht_data_list_xxl.contact = $('.tanceng .xsht_glbjd_lxrxalxxl').val();
//		if($('.tanceng .xsht_xj_lxrdh_xxl').val() == '' || !isPhone.test($('.tanceng .xsht_xj_lxrdh_xxl').val())&&!isMobile.test($('.tanceng .xsht_xj_lxrdh_xxl').val())) {
//			alert('请输入正确的联系人电话')
//			return false;
//		}
		bjxsht_data_list_xxl.contact_tel = $('.tanceng .xsht_xj_lxrdh_xxl').val();
		if(typeof($('.tanceng .xsht_xj_zhs_xxl').attr('uid')) == "undefined") {
			alert('请选择账户')
			return false;
		}
		bjxsht_data_list_xxl.chance_account = $('.tanceng .xsht_xj_zhs_xxl').attr('uid');
		bjxsht_data_list_xxl.open_account = $('.tanceng .xsht_xj_khmc_xxl').val();
		bjxsht_data_list_xxl.open_bank = $('.tanceng .xsht_xj_khyh_xxl').val();
		bjxsht_data_list_xxl.remit_account = $('.tanceng .xsht_xj_hkzhs_xxl').val();
//		if($('.tanceng .xsht_xj_kjfprq_xxl').val() == '') {
//			alert('请输入开具发票日期-以数字表示')
//			return false;
//		} else if(!isNaN($('.tanceng .xsht_xj_kjfprq_xxl').val()) && $('.tanceng .xsht_xj_kjfprq_xxl').val() > 0) {
//			bjxsht_data_list_xxl.open_ticket = $('.tanceng .xsht_xj_kjfprq_xxl').val();
//		} else {
//			alert('请输入开具发票日期-以正整数表示')
//			return false;
//		}
		if(typeof($('.tanceng .xsht_xj_kjfprq_xxl').attr('readonly'))=='undefined'){
			if($('.tanceng .xsht_xj_kjfprq_xxl').val() == '') {
			alert('请输入开具发票日期-以数字表示')
			return false;
		} else if(!isNaN($('.tanceng .xsht_xj_kjfprq_xxl').val()) && $('.tanceng .xsht_xj_kjfprq_xxl').val() > 0) {
			bjxsht_data_list_xxl.open_ticket = $('.tanceng .xsht_xj_kjfprq_xxl').val();
		} else {
			alert('请输入开具发票日期-以正整数表示')
			return false;
		}
		}else{
			
		}
		bjxsht_data_list_xxl.open_ticket_name = $('.tanceng .xsht_xj_kpmc_xxl').val();
		bjxsht_data_list_xxl.open_ticket_bank = $('.tanceng .xsht_xj_kpyh_xxl').val();
		bjxsht_data_list_xxl.account = $('.tanceng .xsht_xj_zh_xxl').val();
		bjxsht_data_list_xxl.tax_point = $('.tanceng .xsht_xj_sh_xxl').val();
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
		//console.log(hklc_arr)
		bjxsht_data_list_xxl.steps = JSON.stringify(hklc_arr);
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
		bjxsht_data_list_xxl.terms=JSON.stringify(xsht_tklist);
		//bjxsht_data_list_xxl.reg_address_tel = $('.tanceng .xsht_xj_zcdzdh_xxl').val();
		var flowhtxj = [];
		$.each($('.tanceng .spr_add_xxl>li[userid]'), function(i, v) {
			flowhtxj.push($(this).attr('userid'))
		});
		if(flowhtxj.length==0){
			alert('请选择审批人员');
			return false;
		}
		var copyxsxj = [];
		$.each($('.tanceng .csr_add_xxl>li[userid]'), function(i, v) {
			copyxsxj.push($(this).attr('userid'))
		});
		bjxsht_data_list_xxl.flow = flowhtxj.join();
		bjxsht_data_list_xxl.copy_list = copyxsxj.join();
		//console.log(bjxsht_data_list_xxl.flow+':::'+bjxsht_data_list_xxl.copy_list)
		
		xsht_bjajax_xxl()
})
//编辑保存
$('.tanceng .xsht_bianjibaocun_btnxxl').die().live('click', function() {
		bjxsht_data_list_xxl.id = $(this).attr('uid');
		bjxsht_data_list_xxl.is_draft='1';
		bjxsht_data_list_xxl.is_open = '1';
		bjxsht_data_list_xxl.market_sn = $('.tanceng .xsht_bj_htbh').val()
//		if($('.tanceng .xsht_bj_htmc').val() == '') {
//			alert('合同名称不能为空！')
//			return false;
//		}
		bjxsht_data_list_xxl.name = $('.tanceng .xsht_bj_htmc').val()
		bjxsht_data_list_xxl.template_id = $('.tanceng .xsht_bj_xzhtmb').attr('uid');
		bjxsht_data_list_xxl.quote_id = $('.tanceng .xsht_bj_xsbjd').attr('uid');
		bjxsht_data_list_xxl.back_pay_id = $('.tanceng .xsht_bj_xzhklc').attr('uid');
		bjxsht_data_list_xxl.dept_id = $('.tanceng .xsht_bj_xzfzbm').attr('uid');
		bjxsht_data_list_xxl.owner_id = $('.tanceng .xsht_bj_fzr').attr('uid');
		bjxsht_data_list_xxl.dept_name = $('.tanceng .xsht_bj_xzfzbm').val();
		bjxsht_data_list_xxl.owner_name = $('.tanceng .xsht_bj_fzr').val();
		bjxsht_data_list_xxl.sign_time = $('.tanceng .xsht_bj_qdrq').val();
		bjxsht_data_list_xxl.sign_address = $('.tanceng .xsht_bj_qddd').val();
//		if($('.tanceng .xsht_bj_jfmc').val() == '') {
//			alert('请输入甲方的名称')
//			return false;
//		}
		bjxsht_data_list_xxl.need_name = $('.tanceng .xsht_bj_jfmc').val();
//		if($('.tanceng .xsht_bj_ghrq').val() == '') {
//			alert('请输入供货日期')
//			return false;
//		}
		bjxsht_data_list_xxl.supply_day = $('.tanceng .xsht_bj_ghrq').val();
//		if($('.tanceng .xsht_bj_zddd').val() == '') {
//			alert('请输入指定地点')
//			return false;
//		}
		bjxsht_data_list_xxl.assign_address = $('.tanceng .xsht_bj_zddd').val();
		bjxsht_data_list_xxl.contact = $('.tanceng .xsht_bj_lxr').val();
		bjxsht_data_list_xxl.contact_tel = $('.tanceng .xsht_bj_lxrdh').val();
		bjxsht_data_list_xxl.chance_account = $('.tanceng .xsht_bj_xzzh').attr('uid');
		bjxsht_data_list_xxl.open_account = $('.tanceng .xsht_bj_khmc').val();
		bjxsht_data_list_xxl.open_bank = $('.tanceng .xsht_bj_khyh').val();
		bjxsht_data_list_xxl.remit_account = $('.tanceng .xsht_bj_hkzh').val();
		bjxsht_data_list_xxl.open_ticket = $('.tanceng .xsht_bj_kjfprq').val();
//		if(typeof($('.tanceng .xsht_bj_kjfprq').attr('readonly'))=='undefined'){
//			if($('.tanceng .xsht_bj_kjfprq').val() == '') {
//			alert('请输入开具发票日期-以数字表示')
//			return false;
//		} else if(!isNaN($('.tanceng .xsht_bj_kjfprq').val()) && $('.tanceng .xsht_bj_kjfprq').val() > 0) {
//			bjxsht_data_list_xxl.open_ticket = $('.tanceng .xsht_bj_kjfprq').val();
//		} else {
//			alert('请输入开具发票日期-以正整数表示')
//			return false;
//		}
//		}else{
//			
//		}
//		if($('.tanceng .xsht_bj_kjfprq').val() == '') {
//			alert('请输入开具发票')
//			return false;
//		}
//		bjxsht_data_list_xxl.open_ticket = $('.tanceng .xsht_bj_kjfprq').val();
		bjxsht_data_list_xxl.open_ticket_name = $('.tanceng .xsht_bj_kpmc').val();
		bjxsht_data_list_xxl.open_ticket_bank = $('.tanceng .xsht_bj_kpyhs').val();
		bjxsht_data_list_xxl.account = $('.tanceng .xsht_bj_kpyhzh').val();
		bjxsht_data_list_xxl.tax_point = $('.tanceng .xsht_bj_shuihao').val();
		//bjxsht_data_list_xxl.reg_address_tel = $('.tanceng .xsht_bj_zcdzdh').val();
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
//		var hklc_arr = [];
//		$('.tanceng .bargin_tbody').children('tr').each(function(i,v){
//			hklc_arr.push({
//				'segment':$(this).children().eq(0).children().children('.t_right').children().children('input').val(),
//				'pay_rate':$(this).children().eq(1).children().children('.t_right').find('input').val(),
//				'money':$(this).children().eq(2).children('.c_r').html()
//			})
//		})
//		//console.log(hklc_arr)
//		bjxsht_data_list_xxl.steps = JSON.stringify(hklc_arr);
		if($('.tanceng .bargin_tbody').children('tr').length==1){
			bjxsht_data_list_xxl.steps = '';	
		}else{
			var hklc_arr = [];
			$('.tanceng .bargin_tbody').children('tr').each(function(i,v){
			hklc_arr.push({
				'pay_rate':$(this).children().eq(0).children().children('.t_right').children().children('input').val(),
				'segment':$(this).children().eq(1).children().children('.t_right').find('input').val(),
				'money':$(this).children().eq(2).children('.c_r').html()
			})
		})
		bjxsht_data_list_xxl.steps = JSON.stringify(hklc_arr);
		}

		var xsht_tklist=[]
//		$('.tanceng .xsht_mobantiaokuan_listxxl').children().each(function(i,v){
//			xsht_tklist.push({
//				'name':$(this).attr('tkmcs'),
//				'content':$(this).attr('contents'),
//				'is_add':$(this).attr('is_add')
//			})
//		})
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
		bjxsht_data_list_xxl.terms=JSON.stringify(xsht_tklist);
		var flowhtbj = [];
		
		$.each($('.tanceng .spr_add_xxl>li[userid]'), function(i, v) {
			flowhtbj.push($(this).attr('userid'))
		});
//		if(flowhtbj.length==0){
//			alert('请选择审批人员');
//			return false;
//		}
		bjxsht_data_list_xxl.flow = flowhtbj.join();
		var copyxsbj = [];
		$.each($('.tanceng .csr_add_xxl>li[userid]'), function(i, v) {
			copyxsbj.push($(this).attr('userid'))
		});
		bjxsht_data_list_xxl.copy_list = copyxsbj.join();
		//console.log(bjxsht_data_list_xxl.flow+'::::'+bjxsht_data_list_xxl.copy_list)
		xsht_bjajax_xxl()
		$(this).parent().parent().parent().remove();
		var num = $('.tanceng').children(".dialog_box").length;
		if(num < 1) {
			$(".tanceng").hide();
		}
	})
//编辑合同-提交审批
$('.tanceng .bjht_tjsp_btn_xxl').die().live('click', function() {
		bjxsht_data_list_xxl.id = $(this).attr('uid');
		bjxsht_data_list_xxl.is_open = '1';
		bjxsht_data_list_xxl.market_sn = $('.tanceng .xsht_bj_htbh').val()
		if($('.tanceng .xsht_bj_htmc').val() == '') {
			alert('合同名称不能为空！')
			return false;
		}
		bjxsht_data_list_xxl.name = $('.tanceng .xsht_bj_htmc').val()
		bjxsht_data_list_xxl.template_id = $('.tanceng .xsht_bj_xzhtmb').attr('uid');
		bjxsht_data_list_xxl.quote_id = $('.tanceng .xsht_bj_xsbjd').attr('uid');
		bjxsht_data_list_xxl.back_pay_id = $('.tanceng .xsht_bj_xzhklc').attr('uid');
		bjxsht_data_list_xxl.dept_id = $('.tanceng .xsht_bj_xzfzbm').attr('uid');
		bjxsht_data_list_xxl.owner_id = $('.tanceng .xsht_bj_fzr').attr('uid');
		bjxsht_data_list_xxl.dept_name = $('.tanceng .xsht_bj_xzfzbm').val();
		bjxsht_data_list_xxl.owner_name = $('.tanceng .xsht_bj_fzr').val();
		bjxsht_data_list_xxl.sign_time = $('.tanceng .xsht_bj_qdrq').val();
		bjxsht_data_list_xxl.sign_address = $('.tanceng .xsht_bj_qddd').val();
		if($('.tanceng .xsht_bj_jfmc').val() == '') {
			alert('请输入甲方的名称')
			return false;
		}
		bjxsht_data_list_xxl.need_name = $('.tanceng .xsht_bj_jfmc').val();
		if($('.tanceng .xsht_bj_ghrq').val() == '') {
			alert('请输入供货日期')
			return false;
		}
		bjxsht_data_list_xxl.supply_day = $('.tanceng .xsht_bj_ghrq').val();
		if($('.tanceng .xsht_bj_zddd').val() == '') {
			alert('请输入指定地点')
			return false;
		}
		bjxsht_data_list_xxl.assign_address = $('.tanceng .xsht_bj_zddd').val();
		bjxsht_data_list_xxl.contact = $('.tanceng .xsht_bj_lxr').val();
		bjxsht_data_list_xxl.contact_tel = $('.tanceng .xsht_bj_lxrdh').val();
		bjxsht_data_list_xxl.chance_account = $('.tanceng .xsht_bj_xzzh').attr('uid');
		bjxsht_data_list_xxl.open_account = $('.tanceng .xsht_bj_khmc').val();
		bjxsht_data_list_xxl.open_bank = $('.tanceng .xsht_bj_khyh').val();
		bjxsht_data_list_xxl.remit_account = $('.tanceng .xsht_bj_hkzh').val();
		if(typeof($('.tanceng .xsht_bj_kjfprq').attr('readonly'))=='undefined'){
			if($('.tanceng .xsht_bj_kjfprq').val() == '') {
			alert('请输入开具发票日期-以数字表示')
			return false;
		} else if(!isNaN($('.tanceng .xsht_bj_kjfprq').val()) && $('.tanceng .xsht_bj_kjfprq').val() > 0) {
			bjxsht_data_list_xxl.open_ticket = $('.tanceng .xsht_bj_kjfprq').val();
		} else {
			alert('请输入开具发票日期-以正整数表示')
			return false;
		}
		}else{
			
		}
//		if($('.tanceng .xsht_bj_kjfprq').val() == '') {
//			alert('请输入开具发票')
//			return false;
//		}
//		bjxsht_data_list_xxl.open_ticket = $('.tanceng .xsht_bj_kjfprq').val();
		bjxsht_data_list_xxl.open_ticket_name = $('.tanceng .xsht_bj_kpmc').val();
		bjxsht_data_list_xxl.open_ticket_bank = $('.tanceng .xsht_bj_kpyhs').val();
		bjxsht_data_list_xxl.account = $('.tanceng .xsht_bj_kpyhzh').val();
		bjxsht_data_list_xxl.tax_point = $('.tanceng .xsht_bj_shuihao').val();
		//bjxsht_data_list_xxl.reg_address_tel = $('.tanceng .xsht_bj_zcdzdh').val();
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
		//console.log(hklc_arr)
		bjxsht_data_list_xxl.steps = JSON.stringify(hklc_arr);
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
		bjxsht_data_list_xxl.terms=JSON.stringify(xsht_tklist);
		var flowhtbj = [];
		
		$.each($('.tanceng .spr_add_xxl>li[userid]'), function(i, v) {
			flowhtbj.push($(this).attr('userid'))
		});
		if(flowhtbj.length==0){
			alert('请选择审批人员');
			return false;
		}
		bjxsht_data_list_xxl.flow = flowhtbj.join();
		var copyxsbj = [];
		$.each($('.tanceng .csr_add_xxl>li[userid]'), function(i, v) {
			copyxsbj.push($(this).attr('userid'))
		});
		bjxsht_data_list_xxl.copy_list = copyxsbj.join();
		//console.log(bjxsht_data_list_xxl.flow+'::::'+bjxsht_data_list_xxl.copy_list)
		xsht_bjajax_xxl()
		$(this).parent().parent().parent().remove();
		var num = $('.tanceng').children(".dialog_box").length;
		if(num < 1) {
			$(".tanceng").hide();
		}
	})
$('.tanceng .xsht_bianjiyulan_btnxxl').die().live('click',function(){
	bjxsht_data_list_xxl.id = $(this).attr('uid');
		bjxsht_data_list_xxl.is_open = '0';
		bjxsht_data_list_xxl.market_sn = $('.tanceng .xsht_bj_htbh').val()
		if($('.tanceng .xsht_bj_htmc').val() == '') {
			alert('合同名称不能为空！')
			return false;
		}
		bjxsht_data_list_xxl.name = $('.tanceng .xsht_bj_htmc').val()
		bjxsht_data_list_xxl.template_id = $('.tanceng .xsht_bj_xzhtmb').attr('uid');
		bjxsht_data_list_xxl.quote_id = $('.tanceng .xsht_bj_xsbjd').attr('uid');
		bjxsht_data_list_xxl.back_pay_id = $('.tanceng .xsht_bj_xzhklc').attr('uid');
		bjxsht_data_list_xxl.dept_id = $('.tanceng .xsht_bj_xzfzbm').attr('uid');
		bjxsht_data_list_xxl.owner_id = $('.tanceng .xsht_bj_fzr').attr('uid');
		bjxsht_data_list_xxl.dept_name = $('.tanceng .xsht_bj_xzfzbm').val();
		bjxsht_data_list_xxl.owner_name = $('.tanceng .xsht_bj_fzr').val();
		bjxsht_data_list_xxl.sign_time = $('.tanceng .xsht_bj_qdrq').val();
		bjxsht_data_list_xxl.sign_address = $('.tanceng .xsht_bj_qddd').val();
		if($('.tanceng .xsht_bj_jfmc').val() == '') {
			alert('请输入甲方的名称')
			return false;
		}
		bjxsht_data_list_xxl.need_name = $('.tanceng .xsht_bj_jfmc').val();
		if($('.tanceng .xsht_bj_ghrq').val() == '') {
			alert('请输入供货日期')
			return false;
		}
		bjxsht_data_list_xxl.supply_day = $('.tanceng .xsht_bj_ghrq').val();
		if($('.tanceng .xsht_bj_zddd').val() == '') {
			alert('请输入指定地点')
			return false;
		}
		bjxsht_data_list_xxl.assign_address = $('.tanceng .xsht_bj_zddd').val();
		bjxsht_data_list_xxl.contact = $('.tanceng .xsht_bj_lxr').val();
		bjxsht_data_list_xxl.contact_tel = $('.tanceng .xsht_bj_lxrdh').val();
		bjxsht_data_list_xxl.chance_account = $('.tanceng .xsht_bj_xzzh').attr('uid');
		bjxsht_data_list_xxl.open_account = $('.tanceng .xsht_bj_khmc').val();
		bjxsht_data_list_xxl.open_bank = $('.tanceng .xsht_bj_khyh').val();
		bjxsht_data_list_xxl.remit_account = $('.tanceng .xsht_bj_hkzh').val();
		if(typeof($('.tanceng .xsht_bj_kjfprq').attr('readonly'))=='undefined'){
			if($('.tanceng .xsht_bj_kjfprq').val() == '') {
			alert('请输入开具发票日期-以数字表示')
			return false;
		} else if(!isNaN($('.tanceng .xsht_bj_kjfprq').val()) && $('.tanceng .xsht_bj_kjfprq').val() > 0) {
			bjxsht_data_list_xxl.open_ticket = $('.tanceng .xsht_bj_kjfprq').val();
		} else {
			alert('请输入开具发票日期-以正整数表示')
			return false;
		}
		}else{
			
		}
//		if($('.tanceng .xsht_bj_kjfprq').val() == '') {
//			alert('请输入开具发票')
//			return false;
//		}
//		bjxsht_data_list_xxl.open_ticket = $('.tanceng .xsht_bj_kjfprq').val();
		bjxsht_data_list_xxl.open_ticket_name = $('.tanceng .xsht_bj_kpmc').val();
		bjxsht_data_list_xxl.open_ticket_bank = $('.tanceng .xsht_bj_kpyhs').val();
		bjxsht_data_list_xxl.account = $('.tanceng .xsht_bj_kpyhzh').val();
		bjxsht_data_list_xxl.tax_point = $('.tanceng .xsht_bj_shuihao').val();
		//bjxsht_data_list_xxl.reg_address_tel = $('.tanceng .xsht_bj_zcdzdh').val();
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
		//console.log(hklc_arr)
		bjxsht_data_list_xxl.steps = JSON.stringify(hklc_arr);
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
		bjxsht_data_list_xxl.terms=JSON.stringify(xsht_tklist);
		var flowhtbj = [];
		
		$.each($('.tanceng .spr_add_xxl>li[userid]'), function(i, v) {
			flowhtbj.push($(this).attr('userid'))
		});
		if(flowhtbj.length==0){
			alert('请选择审批人员');
			return false;
		}
		bjxsht_data_list_xxl.flow = flowhtbj.join();
		var copyxsbj = [];
		$.each($('.tanceng .csr_add_xxl>li[userid]'), function(i, v) {
			copyxsbj.push($(this).attr('userid'))
		});
		bjxsht_data_list_xxl.copy_list = copyxsbj.join();
		//console.log(bjxsht_data_list_xxl.flow+'::::'+bjxsht_data_list_xxl.copy_list)
		xsht_bjajax_xxl()
//		$(this).parent().parent().parent().remove();
//		var num = $('.tanceng').children(".dialog_box").length;
//		if(num < 1) {
//			$(".tanceng").hide();
//		}
});
	//审批人员
	//选择人员
	//	dialog tree list person
function tree_list_person(datalist, deep) {
	var html = '';
	$.each(datalist, function(index, data) {
		var html_i_list_before = '<i class="list_before_span"></i>';
		html += '<ul class="ul1">';
		for(var j = 0; j < deep; j++) {
			html_i_list_before += '<i class="list_before_span"></i>'
		}
		html += '<li class="left_1" cussortid = "' + data["id"] + '">' + html_i_list_before + '<span class="icon_open"></span><span class="icon_file"></span><span class="list_msg">' + data['name'] + '('+data.user_info.length+')</span></li>';
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
function xsht_xzcy_listajax(){
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
			console.log(data);
			var lists = data['list'],list_html='';
				$.each(lists, function(i,v) {
					list_html +='<li class="left_2 person_left_nav" userinfoid="' + v.id + '"><i class="list_before_span"></i><span class="list_msg">' + v.name + ' </span></li>';
				});
			datalists = data.rows; //jiaojierenyuan
			var deep = 0;
			//				$('.jiaojierenyuan').html(tree_list_person(datalists, deep));
			var ttxsht = '<li class="left_all"><span class="icon_open change_ba"></span><span class="icon_file"></span><span class="list_msg xsht_xzfzr_syflxxl">所有分类('+data.sum_num+')</span></li>';
			//$('.tanceng .xsht_xzfzr_syflxxl').html('所有分类('+data.sum_num+')')
			$('.spcy_tree_xxl').html(tree_list_person(datalists, deep)+list_html).before(ttxsht);
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
$('.tanceng .val_dialogTop[name="ht_seal_people"]').die().live('click',function(){
	xsht_xzcy_listajax()
})

//审批人员操作
var sp_rynum = [];
var buzou = ['步骤一', '步骤二', '步骤三', '步骤四', '步骤五']
$('.tanceng .sprcy_btn_xxl').die().live('click', function() {

		if($('.tanceng .spr_add_xxl').children('li').length < 4) {
			sp_rynum = []
		}
		var trues = $.inArray($('.tanceng .spcy_tree_xxl li.on').attr('userinfoid'), sp_rynum);
		//alert(sp_rynum)
		if(trues != -1) {
			alert('重复了')
		} else {
			if($('.tanceng .spr_add_xxl').children().length > 5) {
				alert('最多只能添加3位喔！')
			} else {
				$('.tanceng .spqian_xxl').before('<li userid="' + $('.spcy_tree_xxl li.on').attr('userinfoid') + '"><i class="del_img_1">-</i><em class="icon_personBtn icon_personBtn_msg"><i class="icon_personNext"></i></em><em class="icon_adderBtn"></em><p class="box_adderName">' + $('.spcy_tree_xxl li.on').children('span.list_msg').html() + '</p> <p class="box_addermsg">步骤一</p></li>');
				//$('.tanceng .chuchai_spr')
				sp_rynum.push($('.tanceng .spcy_tree_xxl li.on').attr('userinfoid'));
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
		sp_rynum.splice($.inArray($(this).parent().attr('userid'), sp_rynum), 1);
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
		html += '<li class="left_1" deptchosenid = "' + data["id"] + '">' + html_i_list_before + '<span class="icon_open change_ba"></span><span class="icon_file"></span><span class="list_msg">' + data['name'] + '('+data.user_info.length+')</span><span class="list_check"><em></em></span></li>';
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
$('.tanceng .val_dialogTop[name="ht_muban_copyR"]').die('click').live('click', function() {
	$('.csr_renwulist_xxl').html('')
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
				var lists = data['list'],list_html='',touburenyuan='';
				$.each(lists, function(i,v) {
					list_html +='<ul><li class="left_2 person_left_nav li_person" userinfoid="' + v.id + '"><i class="list_before_span"></i><span class="list_msg">' + v.name + ' </span><span class="list_check"><em></em></span></li></ul>';
				});
				var touburenyuans = '<li class="left_all"><span class="icon_open change_ba"></span><span class="icon_file"></span><span class="list_msg">所有分类('+data.sum_num+')</span><span class="list_check"><em></em></span></li>';
				var deep = 0;
				$('.csr_list_xxl').html(touburenyuans + tree_list_choose_dept_person(data.rows, deep)+list_html)

			}
		},
		error: function(data) {

		}
	});
})
$('.tanceng .csr_list_xxl .person_left_nav').die().live('click', function() {
	var notli = $('.tanceng .csr_list_xxl ul .person_left_nav').not($(this))
	$(this).toggle(function() {
			$('.tanceng .csr_renwulist_xxl').append('<li rid="' + $(this).attr('userinfoid') + '"><span>' + $(this).children('.list_msg').html() + '</span><i class="list_choose_delete"></i></li>')
			$(this).find('span.list_check em').addClass('on')
			$(this).addClass('on')
			notli.removeClass('on')
		}, function() {
			$('.csr_renwulist_xxl').find('li[rid=' + $(this).attr('userinfoid') + ']').remove()
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
var csnumss = []
$('.tanceng .csr_btn_queding').die().live('click', function() {
		if($('.tanceng .csr_renwulist_xxl li').length < 1) {
			alert('请选择人员')
			return
		} else {

			if($('.tanceng .csr_add_xxl').children('li').length < 3) {
				csnumss = []
			}
			var truess = $.inArray($('.csr_renwulist_xxl li').attr('rid'), csnumss);
			if(truess != -1) {
				alert('重复了')
			} else {
				$.each($('.tanceng .csr_renwulist_xxl li'), function(i, v) {
						csnumss.push($(this).attr('rid'));
						if($('.tanceng .csr_add_xxl').children().length > 4) {
							alert('最多只能添加3位哦')
						} else {
							$('.tanceng .csr_add_xxl').prepend('<li userid="' + $(this).attr('rid') + '"><i class="del_img_1">-</i><em class="icon_personBtn icon_personBtn_msg"></em><em class="icon_adderBtn"></em><p class="box_adderName">' + $(this).children('span').html() + '</p></li>')
						}

					})
					//alert(csnumss)
			}
			//alert(csnumss)
		}
		$('.csr_renwulist_xxl').html('')
		$(this).parent().parent().parent().remove();
		var num = $('.tanceng').children(".dialog_box").length;
		if(num < 1) {
			$(".tanceng").hide();
		};
	})
	//删除数组中的一位
$('.tanceng .del_img_1').die().live('click', function() {
	csnumss.splice($.inArray($(this).parent().attr('userid'), csnumss), 1);
})

//待我审批
var dwsp_data_ck_xxl = {
	token: token,
	id: ''
}

function dwsp_ck_ajax_xxl() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "market-contract/info",
		data: dwsp_data_ck_xxl,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg)
			} else {
				console.log(data)
				var dwsplist = data['data'];
				$('.dwsp_tit_xxl').html(likNullData(dwsplist.customer_name)+'-'+likNullData(dwsplist.name));
				$('.dwsp_ck_cjrq_xxl').html(likNullData(dwsplist.created_at));
				$('.dwsp_ck_cjr_xxl').html(likNullData(dwsplist.uname))
				$('.dwsp_ck_htbh_xxl').html(likNullData(dwsplist.market_sn));
				$('.dwsp_ck_xsdbh_xxl').html(likNullData(dwsplist.market_order_sn));
				$('.dwsp_ck_htmc_xxl').html(likNullData(dwsplist.name));
				$('.xs_dwsp_ck_juejbtn_xxl').attr('uid',dwsplist.id)
				$('.xs_dwsp_ck_tongguo_btn_xxl').attr('uid',dwsplist.id)
				if(data.data.status == 3) {
					$('.xs_dwsp_status_xxl').css('display', 'block')
					$('.xs_dwsp_status_no_xxl').css('display', 'none')
					$('.xs_dwsp_ck_juejbtn_xxl').attr('disabled','disabled')
					$('.xs_dwsp_ck_tongguo_btn_xxl').attr('disabled','disabled')
				} else if(data.data.status == 2){
					$('.xs_dwsp_status_xxl').css('display', 'none')
					$('.xs_dwsp_status_no_xxl').css('display', 'block')
					$('.xs_dwsp_ck_juejbtn_xxl').attr('disabled','disabled')
					$('.xs_dwsp_ck_tongguo_btn_xxl').attr('disabled','disabled')
				}else{
					$('.xs_dwsp_status_xxl').css('display', 'none')
					$('.xs_dwsp_status_no_xxl').css('display', 'none')
					$('.xs_dwsp_ck_juejbtn_xxl').removeAttr('disabled')
				$('.xs_dwsp_ck_tongguo_btn_xxl').removeAttr('disabled')
				}
				$('.dwsp_ck_yulan_xxl').attr({'uid':dwsplist.id,'status':data.data.status,'iszuofei':dwsplist.is_invalid,'htbh':dwsplist.market_sn})
				$('.dwsp_ck_khmc_xxl').html(dwsplist.customer_name);
				//$('.dwsp_ck_shzt_xxl').html(dwsplist.status_name);
				var flownamess = []
				$.each(data.data.flow_info, function(i, v) {
					flownamess.push(v.name)
				});
				//$('.dwsp_ck_shr_xxl').html(flownamess.join());
				//$('.dwsp_ck_xsbjdbh_xxl').html(likNullData(dwsplist.market_quote_sn));
				//$('.dwsp_ck_zdrq_xxl').html(likNullData(dwsplist.created_at));
				//$('.dwsp_ck_zdr_xxl').html(likNullData(dwsplist.uname));
				$('.dwsp_ck_fzbm_xxl').html(likNullData(dwsplist.dept_name))
				$('.dwsp_ck_fzr_xxl').html(likNullData(dwsplist.owner_name));
				if(dwsplist.check_log.length == 0) {
					$('.dwsp_spyjlist_html_xxl').html('')
				} else {
					var fbyj_listhtml = '';
					fbyj_listhtml +='<div class="sq_look_check_box">';
					fbyj_listhtml +='<div class="xs_sp_result"><h3 class="cont_title" style="margin-left: 36px;">审批结果</h3></div>';
                    fbyj_listhtml +='<div class="work_spiliubox" style="margin-top:0;background: #fff;">';
                    $.each(dwsplist.check_log, function(i,v) {
                    	fbyj_listhtml +='<div class="work_spiliu">';
                        fbyj_listhtml +='<div class="work_spiliu_items" style="overflow: hidden;">';    
                        fbyj_listhtml +='<div class="left" style="position: relative;">';        
                        fbyj_listhtml +='<div class="work_spiliu_div">';            
                        fbyj_listhtml +='<img class="inline_block tx" src="'+getImgUrl(v.face)+'">';//static/images/touxiang.png  
                        ///if(v.id == tokenid){
                        	//fbyj_listhtml +='<h3 class="work_sp_h3">我</h3>'; 
                       // }else{
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
//					$.each(dwsplist.check_log, function(i, v) {
//						fbyj_listhtmls += ' <div class="work_spiliu"><div class="work_spiliu_items"><div class="left" style="position: relative;">';
//
//						if(v.uid == tokenid) {
//							fbyj_listhtmls += '<img class="inline_block tx" src="' + v.face + '"><cite class="b_h"></cite></div>';
//							fbyj_listhtmls += '<div class="right auto_height"><img src="static/images/work_jiantou.png"><div class="sp_cont">';
//							fbyj_listhtmls += '<div><h3 class="c_3">我</h3><span class="c_9 m_left_5">' + v.day + '</span></div>';
//						} else {
//							fbyj_listhtmls += '<img class="inline_block tx" src="' + v.face + '"><cite class="b_y"></cite></div>';
//							fbyj_listhtmls += '<div class="right auto_height" ><img src="static/images/work_jiantou.png"><div class="sp_cont">';
//							fbyj_listhtmls += '<div><h3 class="c_3">' + v.name + '</h3><span class="c_9 m_left_5">' + v.day + '</span></div>';
//						}
//						if(i == 0) {
//							fbyj_listhtmls += '<h3 class=" f_color">发起审批</h3>';
//						} else {
//							if(v.status == 1) {
//								fbyj_listhtmls += '<h3 class="c_b" style="color:#f8ac59;">进行中</h3>'
//							} else if(v.status == 2) {
//								fbyj_listhtmls += '<h3 class="c_r" style="color:#ff6c60;">未通过</h3>'
//							} else {
//								fbyj_listhtmls += '<h3 class="c_g">通过审批</h3>'
//							}
//
//						}
//						fbyj_listhtmls += '<p class="c_3 work_sp_p">' + v.note + '</p></div></div><div style="clear: both;height: 0;font-size: 1px;line-height: 0px;"></div></div></div>'
//					});
					$('.dwsp_spyjlist_html_xxl').html(fbyj_listhtml)
				}

			}
		},
		error: function(e) {

		}
	});
}
$('.dwsp_ckbtn_xxl').die().live('click', function() {
		dwsp_data_ck_xxl.id = $(this).attr('uid')
		dwsp_ck_ajax_xxl()
	})
	//预览 待我审批查看
$('.dwsp_ck_yulan_xxl').die().live('click', function() {
	$('.tanceng .daochu_xs').attr('htbh',$(this).attr('htbh'));
	if($(this).attr('status')==1&&$(this).attr('iszuofei')!=1){
		$('.tanceng .xs_dwsp_ck_juejbtn_xxl').attr('uid',$(this).attr('uid')).removeAttr('disabled').show();
		$('.tanceng .xs_dwsp_ck_tongguo_btn_xxl').attr('uid',$(this).attr('uid')).removeAttr('disabled').show();
	}else{
		$('.tanceng .xs_dwsp_ck_juejbtn_xxl').attr('disabled','disabled').hide();
		$('.tanceng .xs_dwsp_ck_tongguo_btn_xxl').attr('disabled','disabled').hide();
	}
	
		xsht_ckyulan_data.id = $(this).attr('uid');
		xsht_ckyulan_ajax.is_open=1;
		xsht_ckyulan_ajax()
	})
	//审批-Btn
$('.dwsp_sp_btn_xxl').die().live('click', function() {
		$('.tanceng .dwsp_juejuetg_btn_xxl').attr('uid', $(this).attr('uid')).removeAttr('disabled').addClass('but_red').removeClass('but_grey1');
		$('.tanceng .dwsp_tgsp_btn_xxl').attr('uid', $(this).attr('uid')).removeAttr('disabled').addClass('but_blue').removeClass('but_grey1');
		//$('.tanceng .dwsp_juejuetg_btn_xxl').addClass('but_grey1').removeClass('but_red').attr('disabled','disabled');
		//$('.tanceng .dwsp_tgsp_btn_xxl').addClass('but_grey1').removeClass('but_blue').attr('disabled','disabled');
		xsht_ckyulan_data.id = $(this).attr('uid');
		xsht_ckyulan_ajax.is_open=1;
		xsht_ckyulan_ajax()
	})
	//通过审批
$('.tanceng .dwsp_juejuetg_btn_xxl').die().live('click', function() {
	$('.tanceng .dwsp_spyj_quedbtn_xxl').attr({
		'ztid': 2,
		'uid': $(this).attr('uid')
	})
})
$('.tanceng .dwsp_tgsp_btn_xxl').die().live('click', function() {
	$('.tanceng .dwsp_spyj_quedbtn_xxl').attr({
		'ztid': 1,
		'uid': $(this).attr('uid')
	})
})
//查看里的拒绝 通过按钮
$('.xs_dwsp_ck_juejbtn_xxl').die().live('click',function(){
	$('.tanceng .dwsp_spyj_quedbtn_xxl').attr({
		'ztid': 2,
		'uid': $(this).attr('uid')
	})
})
$('.xs_dwsp_ck_tongguo_btn_xxl').die().live('click',function(){
	$('.tanceng .dwsp_spyj_quedbtn_xxl').attr({
		'ztid': 1,
		'uid': $(this).attr('uid')
	})
})
var dwsp_spyj_datas_xxl = {
	token: token,
	check_type: '', //1通过2拒绝
	id: '',
	note: ''
}

function dwsp_spyj_ajax_xxl() {
	$.ajax({
		type: "post",
		url: SERVER_URL + "market-contract/check",
		data: dwsp_spyj_datas_xxl,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg)
				$('.tanceng').css('display', 'none')
			} else {
				console.log(data);
				$('.tanceng .dwsp_juejuetg_btn_xxl').addClass('but_grey1').removeClass('but_red').attr('disabled','disabled');
				$('.tanceng .dwsp_tgsp_btn_xxl').addClass('but_grey1').removeClass('but_blue').attr('disabled','disabled');
				xsht_data_xxl.thetype = 2;
				xsht_list_ajax_xxl()
				xsht_ckyulan_ajax()
			}
		},
		error: function(e) {
			console.log(e)

		}
	});
}
$('.tanceng .dwsp_spyj_quedbtn_xxl').die().live('click', function() {
	dwsp_spyj_datas_xxl.check_type = $(this).attr('ztid');
	dwsp_spyj_datas_xxl.id = $(this).attr('uid');
	if($('.tanceng .dwsp_spcontent_val_xxl').val() == '' || $('.tanceng .dwsp_spcontent_val_xxl').val() == '请输入审批意见') {
//		alert('审批意见不能为空喔!!!')
//		return false;
		$('.tanceng .dwsp_spcontent_val_xxl').val('')
	}
	dwsp_spyj_datas_xxl.note = $('.tanceng .dwsp_spcontent_val_xxl').val();
	dwsp_spyj_ajax_xxl()
	$('.xs_sp_right_ckhtml_xxl').css('display', 'none');
	$('.tanceng').empty().hide();
//	$(this).parent().parent().parent().remove();
//	var num = $('.tanceng').children(".dialog_box").length;
//	if(num < 1) {
//		$(".tanceng").hide();
//	};
})

//抄送我的 -查看
var cswd_ck_btn_xxl = {
	token: token,
	id: ''
}

function cswd_ck_ajax_xxl() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "market-contract/info",
		data: cswd_ck_btn_xxl,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg)
			} else {
				console.log(data)
				var cswdlist = data['data'];
				$('.cswd_htck_tit_xxl').html(likNullData(cswdlist.name)+'-'+likNullData(cswdlist.customer_name));
				$('.cswd_cjrq_xxl').html(likNullData(cswdlist.created_at));
				//$('.cswd_cjr_xxl').html(likNullData(cswdlist.uname))
				$('.cswd_htbh_xxl').html(likNullData(cswdlist.market_sn));
				//$('.cswd_xsddbh_xxl').html(likNullData(cswdlist.market_order_sn));
				$('.cswd_htmc_xxl').html(likNullData(cswdlist.name));
				$('.cswd_htyulan_btn_xxl').attr({'uid':cswdlist.id,'htbh':cswdlist.market_sn})
				$('.cswd_khmc_xxl').html(likNullData(cswdlist.customer_name));
				//$('.cswd_shzt_xxl').html(likNullData(cswdlist.status_name));
				var flow_cswd = []
				$.each(data.data.flow_info, function(i, v) {
					flow_cswd.push(v.name)
				});
				//$('.cswd_shr_xxl').html(flow_cswd.join());
				//$('.cswd_xsbjdbh_xxl').html(likNullData(cswdlist.market_quote_sn));
				$('.cswd_fzbm_xxl').html(likNullData(cswdlist.dept_name))
				$('.cswd_fzr_xxl').html(likNullData(cswdlist.owner_name));
				if(cswdlist.check_log.length == 0) {
					$('.cswd_spyj_list_html_xxl').html('')
				} else {
					var fbyj_listhtml = '';
					fbyj_listhtml +='<div class="sq_look_check_box">';
					fbyj_listhtml +='<div class="xs_sp_result"><h3 class="cont_title" style="margin-left: 36px;">审批结果</h3></div>';
                    fbyj_listhtml +='<div class="work_spiliubox" style="margin-top:0;background: #fff;">';
                    $.each(cswdlist.check_log, function(i,v) {
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
//					$.each(cswdlist.check_log, function(i, v) {
//						cswdyj_listhtmls += ' <div class="work_spiliu"><div class="work_spiliu_items"><div class="left" style="position: relative;">';
//
//						if(v.uid == tokenid) {
//							cswdyj_listhtmls += '<img class="inline_block tx" src="' + v.face + '"><cite class="b_h"></cite></div>';
//							cswdyj_listhtmls += '<div class="right auto_height"><img src="static/images/work_jiantou.png"><div class="sp_cont">';
//							cswdyj_listhtmls += '<div><h3 class="c_3">我</h3><span class="c_9 m_left_5">' + v.day + '</span></div>';
//						} else {
//							cswdyj_listhtmls += '<img class="inline_block tx" src="' + v.face + '"><cite class="b_y"></cite></div>';
//							cswdyj_listhtmls += '<div class="right auto_height" ><img src="static/images/work_jiantou.png"><div class="sp_cont">';
//							cswdyj_listhtmls += '<div><h3 class="c_3">' + v.name + '</h3><span class="c_9 m_left_5">' + v.day + '</span></div>';
//						}
//						if(i == 0) {
//							cswdyj_listhtmls += '<h3 class=" f_color">发起审批</h3>';
//						} else {
//							if(v.status == 1) {
//								cswdyj_listhtmls += '<h3 class="c_b" style="color:#f8ac59;">进行中</h3>'
//							} else if(v.status == 2) {
//								cswdyj_listhtmls += '<h3 class="c_r" style="color:#ff6c60;">未通过</h3>'
//							} else {
//								cswdyj_listhtmls += '<h3 class="c_g">通过审批</h3>'
//							}
//
//						}
//						cswdyj_listhtmls += '<p class="c_3 work_sp_p">' + v.note + '</p></div></div><div style="clear: both;height: 0;font-size: 1px;line-height: 0px;"></div></div></div>'
//					});
					$('.cswd_spyj_list_html_xxl').html(fbyj_listhtml)
				}

			}
		},
		error: function(e) {

		}
	});
}
$('.cswd_ckbtn_xxl').die().live('click', function() {
		//console.log($(this).attr('uid'))
		cswd_ck_btn_xxl.id = $(this).attr('uid');
		cswd_ck_ajax_xxl()
	})
	//抄送我的 预览
$('.cswd_htyulan_btn_xxl').die().live('click', function() {
	$('.tanceng .daochu_xs').attr('htbh',$(this).attr('htbh'));
	$('.tanceng .xs_dwsp_ck_juejbtn_xxl').hide();
	$('.tanceng .xs_dwsp_ck_tongguo_btn_xxl').hide();
	xsht_ckyulan_data.id = $(this).attr('uid');
	xsht_ckyulan_ajax.is_open=1;
	xsht_ckyulan_ajax()
})


//查看销售报价单
    $('.xsht_xsbjdxq_xxl').die('click').live('click', function () {
        $('.ht_slid_list ul li:first-of-type').trigger('click');
        sellQuoteCurrentId = $(this).attr('uid');
		$('.ven_sell_quote_look_detail_btn').attr('uid',$(this).attr('uid'))
        //更多列表显示操作
//      var sellQuoteLookMore = '';
//      var curOperate = $(this).closest('tr').attr('operate');
//      if (curOperate == 0) {
//          $('#ven_sell_quote_look_more_btn').css('display', 'none');
//          $('#ven_sell_quote_look_more').css('display', 'none');
//      } else {
//          $('#ven_sell_quote_look_more_btn').css('display', '');
//          $('#ven_sell_quote_look_more').css('display', '');
//          sellQuoteLookMore = '<li class="val_dialogTop" id="ven_sell_quote_look_more_edit_btn" name="xs_bjd_exit">编辑</li><li class="val_dialog" name="xs_xsbjd_delete" id="ven_sell_quote_look_more_del_btn">删除</li>'
//      }
//      $('#ven_sell_quote_look_more').html(sellQuoteLookMore);

        $.ajax({
            url: SERVER_URL + '/quote/info',
            type: 'GET',
            async: false,
            data: {
                token: token,
                quote_id: sellQuoteCurrentId
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var datalist = oE.data;
                    console.log(datalist);
                    //订单id
                    sellOrderCurrentId = datalist['order_id'];
                    //客户名称
                    $('.ven_sell_quote_look_custom_name').html(likNullData(datalist['customer_name']));
                    //创建日期
                    $('.ven_sell_quote_look_create_at').html(likNullData(datalist['created_at']));
                    //创建人
                    $('.ven_sell_quote_look_uname').html(likNullData(datalist['owner']));
                    //报价单编号
                    $('.ven_sell_quote_look_code_sn').html(likNullData(datalist['code_sn']));
                    //关联销售合同
                    $('.ven_sell_quote_look_contract_code_sn').html(likNullData(datalist['contract_code_sn']));
                    //关联销售订单
                    $('.ven_sell_quote_look_order_code_sn').html(likNullData(datalist['order_code_sn']));
                    //关联借出单
                    $('.ven_sell_quote_look_lend_code_sn').html(likNullData(datalist['lend_code_sn']));
                    $('.xsht_baojdxq_baojrenxxl').html(likNullData(datalist['owner']));
                    //审批状态
                    var statusname = '';
                    if (datalist['status'] == 1) {
                        statusname = '审批中';
                        $('.ven_sell_quote_check_btn_box').removeClass('none');
                        $('.ven_sell_quote_look_check_img').css('display', 'none').attr('src', '');
                    } else if (datalist['status'] == 2) {
                        statusname = '未通过';
                        $('.ven_sell_quote_check_btn_box').addClass('none');
                        $('.ven_sell_quote_look_check_img').css('display', 'inline-block').attr('src', 'static/images/refuse.png');
                    } else if (datalist['status'] == 3) {
                        statusname = '已通过';
                        $('.ven_sell_quote_check_btn_box').addClass('none');
                        $('.ven_sell_quote_look_check_img').css('display', 'inline-block').attr('src', 'static/images/pass.png');
                    }
                    $('.ven_sell_quote_look_status_name').html(statusname);
                    //审批人
                    $('.ven_sell_quote_look_current_name').html(likNullData(datalist['current_name']));
                    //销售商品
                    $('.ven_sell_quote_look_product_name').html(likNullData(datalist['product_name']));
                    //商品销售金额
                    $('.ven_sell_quote_look_good_totals').html(datalist['good_totals']);
                    //税率合计
                    $('.ven_sell_quote_look_tax_rate').html(datalist['tax_rate'] == '1' ? '含税17%' : '无税');
                    //总金额
                    $('.ven_sell_quote_look_totals').html(likNullData(datalist['totals']));
                    //制单日期
                    $('.ven_sell_quote_look_create_quote_at').html(likNullData(datalist['created_at'].split(' ')[0]));
                    //负责部门
                    $('.ven_sell_quote_look_dept_name').html(likNullData(datalist['dept_name']));
                    //负责人
                    $('.ven_sell_quote_look_owner_name').html(likNullData(datalist['owner_name']));

                    //承担运费
                    $('.ven_sell_quote_look_freight').html(datalist['is_freight'] == 1 ? '包运费' : '不包运费');
                    //物流方式
                    if (datalist['logistics_type'] == 1) {
                        $('.ven_sell_quote_look_logistics').html('快递');
                    } else if (datalist['logistics_type'] == 2) {
                        $('.ven_sell_quote_look_logistics').html('陆运');
                    } else if (datalist['logistics_type'] == 3) {
                        $('.ven_sell_quote_look_logistics').html('陆运');
                    } else if (datalist['logistics_type'] == 4) {
                        $('.ven_sell_quote_look_logistics').html('平邮');
                    } else if (datalist['logistics_type'] == 5) {
                        $('.ven_sell_quote_look_logistics').html('海运');
                    }

                    //审批流程
                    var sellQuoteLookCheckListHtml = '';
                    var checkStatusClass = "";

                    var flowOrderArr2 = ['', '步骤一', '步骤二', '步骤三', '步骤四', '步骤五', '步骤六', '步骤七'];
                    if (datalist['check_log'].length != 0) {
                        $('.sq_look_check_box').removeClass('none');
                        $.each(datalist['check_log'], function (i, v) {
                            var checkStatusName = '';
                            var checkCiteClass = '';
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
                            /*sellQuoteLookCheckListHtml += '<div class="work_spiliu">\
                             <div class="work_spiliu_items">\
                             <div class="left" style="position: relative;">\
                             <img class="inline_block tx" src="' + v['face'] + '">\
                             <cite class="' + checkCiteClass + '"></cite>\
                             </div>\
                             <div class="right auto_height" style="min-height: 85px;">\
                             <img src="static/images/work_jiantou.png">\
                             <div class="sp_cont">\
                             <div class="sp_cont_a"><h3 class="c_3" ' + (v['status'] == 2 ? 'style="color:#f8ac59;"' : '') + '>' + v['name'] + '</h3><span class="c_9 right ' + ((v['status'] == 0 || v['status'] == 1) ? 'none' : '') + '">' + v['day'] + '</span></div>\
                             <h3 class="' + checkStatusClass + '">' + checkStatusName + '</h3>\
                             <p class="c_3 work_sp_p">' + v['note'] + '</p>\
                             </div>\
                             </div>\
                             <div style="clear: both;height: 0;font-size: 1px;line-height: 0px;"></div>\
                             </div>\
                             </div>';*/
                            //sellQuoteLookCheckListHtml += '<div class="work_spiliu">\
                            //    <div class="work_spiliu_items">\
                            //    <div class="left" style="position: relative;">\
                            //    <div class="work_spiliu_div">\
                            //    <img class="inline_block tx" src="' + v['face'] + '">\
                            //    <h3 class="work_sp_h3">' + v['name'] + '</h3>\
                            //    <span class="c_9 m_left_5 '+(datalist['current_check'] == 1 ? 'none' : '')+'">'+flowOrderArr[i]+'</span>\
                            //    </div>\
                            //    <cite class="' + checkCiteClass + '"></cite>\
                            //    </div>\
                            //    <div class="auto_height">\
                            //    <img src="static/images/work_jiantou.png">\
                            //    <div class="sp_cont">\
                            //    <div class="sp_cont_a">\
                            //    <h3 class="' + checkStatusClass + '">' + checkStatusName + '</h3>\
                            //    <p class="c_9">' + v['day'] + '</p>\
                            //</div>\
                            //<p class="c_3 work_sp_p">' + v['note'] + '</p>\
                            //    </div>\
                            //    </div>\
                            //    <div style="clear: both;height: 0;font-size: 1px;line-height: 0px;"></div>\
                            //    </div>\
                            //    </div>';
                            sellQuoteLookCheckListHtml += '<div class="work_spiliu">\
                                <div class="work_spiliu_items" style="overflow: hidden;">\
                                <div class="left" style="position: relative;">\
                                <div class="work_spiliu_div">\
                                <img class="inline_block tx" src="' + getImgUrl(v['face']) + '">\
                                <h3 class="work_sp_h3">' + v['name'] + '</h3>\
                                <span class="c_9 m_left_5 ' + (datalist['current_check'] == 1 ? 'none1' : '') + '">' + flowOrderArr2[i] + '</span>\
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
                        $('.ven_sell_quote_look_check_list').html(sellQuoteLookCheckListHtml);
                    } else {
                        $('.sq_look_check_box').addClass('none');
                    }


                } else {
                    console.log(e)
                }
            }
        })
    });
    $('.ven_sell_quote_look_detail_btn[name="xs_bjd_xq"]').die().live('click',function(){
    	sellQuoteDetailFn($(this).attr('uid'));
    })
    //报价单详情函数
    function sellQuoteDetailFn(sellQuoteCurrentId) {
        $.ajax({
            url: SERVER_URL + '/quote/detail',
            type: 'GET',
            data: {
                token: token,
                quote_id: sellQuoteCurrentId
            },
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                if (oE.code == 0) {
                    var data = oE.data;
                    console.log(data);
                    //创建日期
                    $('.tanceng .ven_sell_quote_detail_created_at').html(data['created_at'].split(' ')[0]);
                    //创建人
                    $('.tanceng .ven_sell_quote_detail_owner').html(data['owner']);
                    //创建人电话
                    $('.tanceng .ven_sell_quote_detail_owner_tel').html(data['mobile']);
                    //报价单有效期
                    if (data['expiry_day'] == 0 || data['expiry_day'] == '') {
                        $('.tanceng .ven_sell_quote_detail_deadline').html('-');
                    } else {
                        $('.tanceng .ven_sell_quote_detail_deadline').html(data['expiry_day']);
                    }
                    //编号
                    $('.tanceng .ven_sell_quote_detail_code_sn').html(data['code_sn']);
                    //客户
                    $('.tanceng .ven_sell_quote_detail_customer_name').html(data['customer_name']);
                    //承担运费
                    $('.tanceng .ven_sell_quote_detail_is_freight').html(data['is_freight'] == 1 ? '包运费' : '不包运费');
                    //物流方式
                    var logistics = '';
                    if (data['logistics_type'] == 1) {
                        logistics = '快递';
                    } else if (data['logistics_type'] == 2) {
                        logistics = '陆运';
                    } else if (data['logistics_type'] == 3) {
                        logistics = '陆运';
                    } else if (data['logistics_type'] == 4) {
                        logistics = '平邮';
                    } else if (data['logistics_type'] == 5) {
                        logistics = '海运';
                    }
                    $('.tanceng .ven_sell_quote_detail_logistics').html(logistics);
                    //负责部门
                    $('.tanceng .ven_sell_quote_detail_dept').html(data['dept']);

                    if (data['steps'] && data['steps']['product_json']) {
                        //基本商品
                        var goodsHtml = '';
                        if (data['steps']['product_json']['goods']) {
                            $('.tanceng .ven_sell_quote_detail_goods_box').css('display', 'block');
                            var goodsArr = data['steps']['product_json']['goods']['goods'];
                            $.each(goodsArr, function (i, v) {
                                goodsHtml += '<tr>\
                                        <td class="noprint">' + l_dbl(i + 1) + '</td>\
                                        <td class="noprint">' + v['good_sn'] + '</td>\
                                        <td class="xs_print_name">' + v['good_name'] + '</td>\
                                        <td class="xs_print_sx">' + v['good_attr'] + '</td>\
                                        <td class="noprint">' + v['good_num'] + v['good_unit'] + '</td>\
                                        <td class="xs_bjd_td xs_goods_box xs_print_price" style="position: relative;padding:8px 10px;">\
                                            <div>\
                                            <span>￥' + v['good_price'] + '</span><i class="' + (v['up_down'] == 1 ? 'ven_warning_arrow_up' : 'ven_warning_arrow') + ' xs_goods_down_img" ' + (v['up_down'] == 0 ? 'style="display:none;"' : '') + '></i>\
                                            </div>\
                                            <div class="work_vent_client_contMsgBox" style="display: none;top: 4px;left: 94px">\
                                            <i class="work_vent_client_torr"></i>\
                                            <div class="work_vent_client_contMsgBoxDet fnc_output_ticket_total_remain_ticket_num_list">' + (v['up_down'] == 1 ? '高' : '低') + '于 ' + v['good_retail_price'] + '(零售价)</div>\
                                        </div>\
                                        </td>\
                                        <td class="none xs_print_sl">' + v['good_num'] + v['good_unit'] + '</td>\
                                        <td class="noprint">￥' + v['good_rate_price'] + '</td>\
                                        <td class="xs_print_total">￥' + v['good_total'] + '</td>\
                                        <td class="noprint"></td>\
                                        </tr>';
                            });
                        } else {
                            $('.tanceng .ven_sell_quote_detail_goods_box').css('display', 'none');
                        }
                        $('.tanceng .ven_sell_quote_detail_goods_list').html(goodsHtml);

                        //套餐商品
                        var packageHtml = '';
                        if (data['steps']['product_json']['package']) {
                            $('.tanceng .ven_sell_quote_detail_package_box').css('display', 'block');
                            var packageArr = data['steps']['product_json']['package']['package'];
                            $.each(packageArr, function (i, v) {
                                var packageGoods = '';
                                $.each(v['good_list'], function (i2, v2) {
                                    var packageGoodsInfo = '';
                                    $.each(v2['attr_list'], function (i3, v3) {
                                        packageGoodsInfo += '<tr class="xs_print_table">\
                                    <td class="noprint">' + v3['good_sn'] + '</td>\
                                    <td class="none xs_print_name">' + v2['title'] + '</td>\
                                    <td class="xs_print_sx">' + v3['good_attr'] + '</td>\
                                    <td class="xs_print_price none"></td>\
                                    <td class="xs_print_sl xs_print_package">' + v3['total_num'] + '</td>\
                                    <td class="xs_print_total none"></td>\
                                    <td class="noprint"></td>\
                                    </tr>'
                                    });
                                    packageGoods += '<table class="xs_bjd_table_1">\
                                    <thead class="noprint">\
                                    <tr style="background: #fff;">\
                                    <th class="c_3" style="font-weight: 100;">' + v2['title'] + '</th>\
                                    <th></th>\
                                    <th></th>\
                                    </tr>\
                                    <tr class="noprint">\
                                    <th width="127" class="noprint">编号</th>\
                                    <th class="xs_print_name none">名称</th>\
                                    <th width="853" class="xs_print_sx">属性</th>\
                                    <th width="90" class="xs_print_sl">数量</th>\
                                    <th width="60" class="noprint"></th>\
                                    </tr>\
                                    </thead>\
                                    <tbody>' + packageGoodsInfo + '</tbody>\
                                    </table>';
                                });
                                packageHtml += '<div class="xs_div_2"' + (i == 0 ? ' style="margin-top: 20px;"' : '') + '>\
                            <table class="xs_bjd_table xs_print_bjd_goods_table">\
                            <thead class="' + (i == 0 ? '' : 'none') + '">\
                            <tr class="noprint">\
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
                            <tbody class="xs_print_bjd_goods_head">\
                            <tr class="c_3 xs_bjd_bold">\
                            <td width="30" class="noprint">' + l_dbl(i + 1) + '</td>\
                            <td width="140" class="noprint">' + v['package_sn'] + '</td>\
                            <td width="150" class="xs_print_name">' + v['package_name'] + '<span class="c_r none">（88折）</span></td>\
                            <td width="340" class="noprint">-</td>\
                            <td width="50" class="noprint">' + v['package_num'] + '</td>\
                            <td width="150" class="xs_bjd_td xs_goods_box noprint" style="position: relative;">\
                            <span>￥' + v['package_price'] + '</span>\
                            </td>\
                            <td width="90" class="noprint">￥' + v['package_rate_price'] + '</td>\
                            <td width="90" class="xs_print_total"> <span class="xs_bjd_old none">原价￥1230.00</span>\
                                    <br class="none">￥' + v['package_total'] + '</td>\
                            <td width="60" class="noprint">\
                            <button class="but_mix box_open_btn_1 but_blue_1">展开</button>\
                            </td>\
                            </tr>\
                            </tbody>\
                            </table>\
                            </div>\
                            <div class="xs_tc_goods_box goods_tc_toggle" style="display: none;">' + packageGoods + '</div>';
                            });
                            $('.tanceng .ven_sell_quote_detail_package_total').html(data['steps']['product_json']['package']['sum_total']);
                        } else {
                            $('.tanceng .ven_sell_quote_detail_package_box').css('display', 'none');
                        }

                        $('.tanceng .ven_sell_quote_detail_package_list').html(packageHtml);

                        //整机商品
                        var settingHtml = '';
                        if (data['steps']['product_json']['setting']) {
                            $('.tanceng .ven_sell_quote_detail_setting_box').css('display', 'block');
                            var settingArr = data['steps']['product_json']['setting']['setting'];
                            console.log(settingArr);
                            $.each(settingArr, function (i, v) {
                                var settingGoods = '';
                                if (v['optional'] == 1) {
                                    //可选配
                                    $.each(v['good_list'], function (i2, v2) {
                                        var settingGoodsInfo = '';
                                        /*$.each(v2['attr_list'], function (i3, v3) {
                                         settingGoodsInfo += '<tr class="">\
                                         <td width="140" class="noprint ">' + v3['good_sn'] + '</td>\
                                         <td width="150" class="none ">' + v2['title'] + '</td>\
                                         <td width="560" class="">' + v3['good_attr'] + '</td>\
                                         <td width="50" class="noprint ">' + v3['total_num'] + '</td>\
                                         <td width="150" class="">￥' + v3['good_price'] + '</td>\
                                         <td  width="50" class="none ">' + v3['total_num'] + '</td>\
                                         <td width="90" class="noprint ">￥' + v3['good_rate_price'] + '</td>\
                                         <td width="90" class="">￥' + v3['good_total'] + '</td>\
                                         <td width="60" class="noprint "></td>\
                                         </tr>';
                                         });*/

                                        $.each(v2['attr_list'], function (i3, v3) {
                                            settingGoodsInfo += '<tr class="xs_print_complete_a">\
                                        <td width="140" class="noprint">' + v3['good_sn'] + '</td>\
                                        <td width="150" class="none xs_print_name">' + v2['title'] + '</td>\
                                        <td width="560" class="xs_print_sx">' + v3['good_attr'] + '</td>\
                                        <td width="50" class="noprint">' + v3['total_num'] + '</td>\
                                        <td width="150" class="xs_print_price noprint">￥' + v3['good_price'] + '</td>\
                                        <td  width="50" class="none xs_print_sl noprint" style="text-align: right;">' + v3['total_num'] + '</td>\
                                        <td width="90" class="noprint">￥' + v3['good_rate_price'] + '</td>\
                                        <td width="90" class="xs_print_total none"></td>\
                                        <td width="90" class="xs_print_total noprint">￥' + v3['good_total'] + '</td>\
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
                                        <th width="90" class="noprint">含税价</th>\
                                        <th width="90">总价</th>\
                                        <th width="60"></th>\
                                        </tr>\
                                        </thead>\
                                        <tbody>' + settingGoodsInfo + '</tbody>\
                                        </table>'
                                    })
                                } else {
                                    //不可选配
                                    $.each(v['good_list'], function (i2, v2) {
                                        var settingGoodsInfo = '';
                                        $.each(v2['attr_list'], function (i3, v3) {
                                            settingGoodsInfo += '<tr class="xs_print_complete_a">\
                                        <td class="noprint">' + v3['good_sn'] + '</td>\
                                        <td class="none xs_print_name">' + v2['title'] + '</td>\
                                        <td class="xs_print_sx">' + v3['good_attr'] + '</td>\
                                        <td class="none xs_print_price"></td>\
                                        <td class="xs_print_sl noprint">' + v3['total_num'] + '</td>\
                                        <td class="xs_print_total"></td>\
                                        </tr>';
                                        });
                                        settingGoods += '<table class="xs_bjd_table_1">\
                                        <thead>\
                                        <tr style="background: #fff;" class="noprint">\
                                        <th class="c_3" style="font-weight: 100;">' + v2['title'] + '</th>\
                                        <th></th>\
                                        <th></th>\
                                        </tr>\
                                        <tr class="noprint">\
                                        <th width="140">编号</th>\
                                        <th width="560">属性</th>\
                                        <th width="50">数量</th>\
                                        <th width="60"></th>\
                                        </tr>\
                                        </thead>\
                                        <tbody>' + settingGoodsInfo + '</tbody>\
                                        </table>';
                                    })
                                }

                                settingHtml += '<div class="xs_div_2" ' + (i == 0 ? ' style="margin-top: 20px;"' : '') + '>\
                            <table class="xs_bjd_table xs_bjd_table xs_print_bjd_goods_table">\
                            <thead class="noprint">\
                            <tr class="noprint">\
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
                            <td width="150" class="xs_complete_name">' + v['setting_name'] + '' + (v['optional'] == 1 ? '（可选配）' : (v['optional'] == 2 ? '（不可选配）' : '')) + '</td>\
                            <td width="340" class="noprint">' + v['setting_attr'] + '</td>\
                            <td width="50" class="noprint">' + v['setting_num'] + '</td>\
                            <td width="150" class="xs_bjd_td xs_goods_box xs_complete_price" style="position: relative;">\
                            <div>\
                            <span>￥' + v['setting_price'] + '</span><i class="' + (v['up_down'] == 1 ? 'ven_warning_arrow_up' : 'ven_warning_arrow') + ' xs_goods_down_img ' + (v['up_down'] == 0 ? 'none' : '') + '"></i>\
                            </div>\
                            <div class="work_vent_client_contMsgBox" style="display: none;top: 3px;left: 94px">\
                            <i class="work_vent_client_torr"></i>\
                            <div class="work_vent_client_contMsgBoxDet fnc_output_ticket_total_remain_ticket_num_list" style="font-weight: 100;">' + (v['up_down'] == 1 ? '高' : '低') + '于 ' + v['setting_retail_price'] + '(零售价)</div>\
                            </div>\
                            </td>\
                            <td width="50" class="xs_complete_sl none noprint">' + v['setting_num'] + '</td>\
                            <td width="90" class="noprint">￥' + v['setting_rate_price'] + '</td>\
                            <td width="90" class="xs_complete_total noprint">￥' + v['setting_total'] + '</td>\
                            <td width="60" class="noprint">\
                            <button class="but_mix box_open_btn_1 but_blue_1">展开</button>\
                            </td>\
                            </tr>\
                            </tbody>\
                            </table>\
                            </div>\
                            <div class="xs_tc_goods_box goods_tc_toggle" style="display: none;">' + settingGoods + '</div>';
                            });
                            $('.tanceng .ven_sell_quote_detail_setting_total').html(data['steps']['product_json']['setting']['sum_total']);
                        } else {
                            $('.tanceng .ven_sell_quote_detail_setting_box').css('display', 'none');
                        }

                        $('.tanceng .ven_sell_quote_detail_setting_list').html(settingHtml);

                        //单价合计
                        $('.tanceng .ven_sell_quote_detail_money_sum').html(data['steps']['product_json']['money_sum']);

                        //合计税额
                        $('.tanceng .ven_sell_quote_detail_tax_money_sum').html(data['steps']['product_json']['tax_money_sum']);

                        //其他费用
                        $('.tanceng .ven_sell_quote_detail_other_free').html(data['steps']['product_json']['other_free']);

                        //总计金额
                        $('.tanceng .ven_sell_quote_detail_totals').html(data['steps']['product_json']['totals']);

                        //备注
                        $('.tanceng .ven_sell_quote_detail_note').html(data['steps']['product_json']['note']);
                    }
                    //税率
                    if (data['tax_rate'] == 0) {
                        $('.tanceng .ven_sell_quote_tax_rate_print').html('0%');
                    } else if (data['tax_rate'] == 1) {
                        $('.tanceng .ven_sell_quote_tax_rate_print').html('17%');
                    }
                }
            },
            error: function (e) {
                alert(e.msg);
            }
        });
    }
//销售订单

//查看操作
    $('.finance_pay_rent_list[name="bargin_xsdd_btn"]').die('click').live('click', function () {
        sellOrderCurrentId = $(this).attr('uid');
        
        $.ajax({
            url: SERVER_URL + '/order/info',
            type: 'GET',
            data: {
                token: token,
                order_id: sellOrderCurrentId,
                type:'1'
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var data = oE.data;
                    console.log(data);
                    //更多按钮显示隐藏
                    if (data['is_invalid'] == 1) {
                        $('.slider_head_More').css('display', 'none');
                    } else {
                        $('.slider_head_More').css('display', 'block');
                    }

                    //基本信息

                    //客户名称
                    $('.ven_sell_order_look_name').html(data['customer_name']);
                    //创建日期 - 长
                    $('.ven_sell_order_look_create_at_long').html(data['created_at']);
                    //创建日期 - 短
                    $('.ven_sell_order_look_create_at_short').html(data['created_at'].split(' ')[0]);
                    //订单编号
                    $('.ven_sell_order_look_code_sn').html(data['code_sn']);
                    //合同编号
                    $('.ven_sell_order_look_contract_name').html(data['contract_code_sn']);
                    //报价单
                    $('.ven_sell_order_look_quote_code_sn').html(data['quote_code_sn']);
                    //制单人
                    $('.ven_sell_order_look_uname').html(data['uname']);
                    //负责部门
                    $('.ven_sell_order_look_dept_name').html(data['dept_name']);
                    //负责人
                    $('.ven_sell_order_look_owner_name').html(data['owner_name']);

                    //财务信息

                    //结算账户
                    $('.ven_sell_order_look_account_name').html(data['account_name']);
                    //付款方式
                    if (data['way'] == 1) {
                        $('.ven_sell_order_look_way').html('现金');
                    } else if (data['way'] == 2) {
                        $('.ven_sell_order_look_way').html('电汇');
                    } else if (data['way'] == 3) {
                        $('.ven_sell_order_look_way').html('支票');
                    }
                    //税率
                    $('.ven_sell_order_look_tax_rate').html(data['tax_rate']);
                    //总金额
                    $('.ven_sell_order_look_totals').html(data['totals']);
                    //回款阶段
                    var returnMoneyHtml = '';
                    //回款状态
                    var returnStatus = '';
                    //开具发票信息
                    var kjfpInfo = '';
                    $.each(data['return_money_steps'], function (i, v) {
                        if (v['pay_status'] == 3) {
                            returnStatus = 'c_r';
                        } else if (v['pay_status'] == 1) {
                            returnStatus = 'c_g';
                        } else {
                            returnStatus = 'c_y';
                        }
                        var already = v['already_money'] == '' ? 0 : v['already_money'];
                        returnMoneyHtml += '<tr>\
                                            <td>阶段' + (i + 1) + '</td>\
                                            <td>' + v['segmet_day'] + '</td>\
                                            <td>' + v['no_pay_money'] + '</td>\
                                            <td class="' + returnStatus + '" style="font-weight: bold;">' + (already) + '</td>\
                                            </tr>';
                        kjfpInfo += '<tr stepid="' + v['id'] + '">\
                                        <td><input type="checkbox" class="ven_sell_order_kjfp_checkbox" ' + ((v['no_pay_money'] - already) == 0 ? 'disabled' : '') + '></td>\
                                        <td>阶段' + (i + 1) + '</td>\
                                        <td>' + v['segmet_day'] + '</td>\
                                        <td>' + (v['no_pay_money'] - already) + '</td>\
                                        </tr>';
                    });
                    $('.ven_sell_order_return_money_steps_tbody').html(returnMoneyHtml);
                    $('.ven_sell_order_look_kjfp_btn').die('click').live('click', function () {
                        $('.tanceng .ven_sell_order_look_kjfp_dialog_tbody').html(kjfpInfo);
                        var $_kjfpCheckbox = $('.ven_sell_order_look_kjfp_dialog_tbody .ven_sell_order_kjfp_checkbox');
                        $_kjfpCheckbox.die('click').live('click', function () {
                            var ticketTotal = 0;
                            $.each($_kjfpCheckbox, function (i, v) {
                                if ($_kjfpCheckbox.eq(i).attr('checked') == 'checked') {
                                    ticketTotal += parseFloat($_kjfpCheckbox.eq(i).closest('tr').find('td').eq(3).text());
                                }
                            });
                            $('.tanceng .ven_sell_order_look_kjfp_dialog_ticket_total').html(ticketTotal);
                        });
                    });
                    sellOrderKjfpData = {
                        token: token,
                        order_id: '', // 订单id
                        steps: '', // 阶段
                        money: '', // 应付票款
                        pay_day: '' // 确定付票日期
                    };
                    //开具发票提交
                    $('.tanceng .ven_sell_order_look_kjfp_dialog_submit_btn').die('click').live('click', function () {
                        if ($('.tanceng .ven_sell_order_look_kjfp_dialog_tbody tr input:checked').length == 0) {
                            alert('请选择阶段');
                            return false;
                        }
                        if ($('.tanceng .ven_sell_order_look_kjfp_dialog_day_inp').val() == '请选择日期') {
                            alert('请选择确定付票日期');
                            return false;
                        }
                        sellOrderKjfpData.order_id = data['id'];
                        var stepsArr = [];
                        $.each($('.tanceng .ven_sell_order_look_kjfp_dialog_tbody tr'), function (i, v) {
                            if ($('.tanceng .ven_sell_order_look_kjfp_dialog_tbody tr').eq(i).find('input:checkbox').attr('checked') == 'checked') {
                                stepsArr.push({
                                    id: $('.tanceng .ven_sell_order_look_kjfp_dialog_tbody tr').eq(i).attr('stepid'),
                                    day: $('.tanceng .ven_sell_order_look_kjfp_dialog_tbody tr').eq(i).find('td').eq(2).text(),
                                    money: $('.tanceng .ven_sell_order_look_kjfp_dialog_tbody tr').eq(i).find('td').eq(3).text()
                                });
                            }
                        });
                        console.log(stepsArr);
                        sellOrderKjfpData.steps = arrayToJson(stepsArr);
                        sellOrderKjfpData.money = $('.tanceng .ven_sell_order_look_kjfp_dialog_ticket_total').text();
                        sellOrderKjfpData.pay_day = $('.tanceng .ven_sell_order_look_kjfp_dialog_day_inp').val();
                        $.ajax({
                            url: SERVER_URL + '/order/addticketlog',
                            type: 'POST',
                            data: sellOrderKjfpData,
                            dataType: 'json',
                            success: function (oE) {
                                console.log(oE);
                                if (oE.code == 0) {
                                    $('.tanceng').css('display', 'none').find('div').remove();
                                    $('.right_sidebar_h').trigger('click');
                                }
                            },
                            error: function (e) {
                                alert(e.msg);
                                console.log(e);
                            }
                        });
                    });

                    //出库信息

                    //发货时间
                    $('.ven_sell_order_look_delivery_at').html(data['delivery_at']);
                    //物流方式
                    if (data['transport_type'] == 1) {
                        $('.ven_sell_order_look_transport_type').html('快递');
                    } else if (data['transport_type'] == 2) {
                        $('.ven_sell_order_look_transport_type').html('陆运');
                    } else if (data['transport_type'] == 3) {
                        $('.ven_sell_order_look_transport_type').html('空运');
                    } else if (data['transport_type'] == 4) {
                        $('.ven_sell_order_look_transport_type').html('平邮');
                    } else if (data['transport_type'] == 5) {
                        $('.ven_sell_order_look_transport_type').html('海运');
                    }
                    //收货人
                    $('.ven_sell_order_look_receipt_person').html(data['receipt_person']);
                    //收货人电话
                    $('.ven_sell_order_look_receipt_person_tel').html(data['receipt_person_tel']);
                    //收货人地址
                    $('.ven_sell_order_look_receipt_address').html(data['receipt_address']);
                    //出库商品
                    $('.ven_sell_order_look_out_product').die('click').live('click', function () {
                        $.ajax({
                            url: SERVER_URL + '/quote/detail',
                            type: 'GET',
                            data: {
                                token: token,
                                quote_id: data['quote_id']
                            },
                            dataType: 'json',
                            success: function (oE) {
                                console.log(oE);
                                if (oE.code == 0) {
                                    var data = oE.data;
                                    //基本商品
                                    var goodsHtml = '';
                                    if (data['steps']['product_json']['goods']) {
                                        $('.tanceng .sell_order_look_cksp_detail_goods_box').css('display', 'block');
                                        var goodsArr = data['steps']['product_json']['goods']['goods'];
                                        $.each(goodsArr, function (i, v) {
                                            goodsHtml += '<tr>\
                                        <td>' + l_dbl(i + 1) + '</td>\
                                        <td>' + v['good_sn'] + '</td>\
                                        <td>' + v['good_name'] + '</td>\
                                        <td>' + v['good_attr'] + '</td>\
                                        <td>' + v['good_num'] + v['good_unit'] + '</td>\
                                        </tr>';
                                        });
                                    } else {
                                        $('.tanceng .sell_order_look_cksp_detail_goods_box').css('display', 'none');
                                    }
                                    $('.tanceng .sell_order_look_cksp_detail_goods_list').html(goodsHtml);

                                    //套餐商品
                                    var packageHtml = '';
                                    if (data['steps']['product_json']['package']) {
                                        $('.tanceng .sell_order_look_cksp_detail_package_box').css('display', 'block');
                                        var packageArr = data['steps']['product_json']['package']['package'];
                                        $.each(packageArr, function (i, v) {
                                            var packageGoods = '';
                                            $.each(v['good_list'], function (i2, v2) {
                                                var packageGoodsInfo = '';
                                                $.each(v2['attr_list'], function (i3, v3) {
                                                    packageGoodsInfo += '<tr>\
                                    <td>' + v3['good_sn'] + '</td>\
                                    <td>' + v3['good_attr'] + '</td>\
                                    <td>' + v3['total_num'] + '</td>\
                                    <td></td>\
                                    </tr>'
                                                });
                                                packageGoods += '<table class="xs_bjd_table_1">\
                                    <thead>\
                                    <tr style="background: #fff;">\
                                    <th class="c_3" style="font-weight: 100;">' + v2['title'] + '</th>\
                                    <th></th>\
                                    <th></th>\
                                    </tr>\
                                    <tr>\
                                    <th width="200">编号</th>\
                                    <th width="470">属性</th>\
                                    <th width="50">数量</th>\
                                    <th width="60"></th>\
                                    </tr>\
                                    </thead>\
                                    <tbody>' + packageGoodsInfo + '</tbody>\
                                    </table>';
                                            });
                                            packageHtml += '<div class="xs_div_2"' + (i == 0 ? ' style="margin-top: 20px;"' : '') + '>\
                            <table class="xs_bjd_table">\
                            <thead class="' + (i == 0 ? '' : 'none') + '">\
                            <tr>\
                            <th width="40">序号</th>\
                            <th width="140">编号</th>\
                            <th width="150">名称</th>\
                            <th width="285">属性</th>\
                            <th width="50">数量</th>\
                            <th width="55">配件</th>\
                            </tr>\
                            </thead>\
                            <tbody>\
                            <tr class="c_3 xs_bjd_bold">\
                            <td width="40">' + l_dbl(i + 1) + '</td>\
                            <td width="140">' + v['package_sn'] + '</td>\
                            <td width="150">' + v['package_name'] + '</td>\
                            <td width="285">-</td>\
                            <td width="50">' + v['package_num'] + '</td>\
                            <td width="55">\
                            <button class="but_mix box_open_btn_1 but_blue_1 but_look">展开</button>\
                            </td>\
                            </tr>\
                            </tbody>\
                            </table>\
                            </div>\
                            <div class="xs_tc_goods_box goods_tc_toggle" style="display: none;">' + packageGoods + '</div>';
                                        });
                                    } else {
                                        $('.tanceng .sell_order_look_cksp_detail_package_box').css('display', 'none');
                                    }

                                    $('.tanceng .sell_order_look_cksp_detail_package_list').html(packageHtml);

                                    //整机商品
                                    var settingHtml = '';
                                    if (data['steps']['product_json']['setting']) {
                                        $('.tanceng .sell_order_look_cksp_detail_setting_box').css('display', 'block');
                                        var settingArr = data['steps']['product_json']['setting']['setting'];
                                        console.log(settingArr);
                                        $.each(settingArr, function (i, v) {
                                            var settingGoods = '';
                                            if (v['optional'] == 1) {
                                                //可选配
                                                $.each(v['good_list'], function (i2, v2) {
                                                    var settingGoodsInfo = '';
                                                    $.each(v2['attr_list'], function (i3, v3) {
                                                        settingGoodsInfo += '<tr>\
                                        <td>' + v3['good_sn'] + '</td>\
                                        <td>' + v3['good_attr'] + '</td>\
                                        <td>' + v3['total_num'] + '</td>\
                                        <td></td>\
                                        </tr>';
                                                    });
                                                    settingGoods += '<table class="xs_bjd_table_1">\
                                        <thead>\
                                        <tr style="background: #fff;">\
                                        <th class="c_3" style="font-weight: 100;">' + v2['title'] + '</th>\
                                        <th></th>\
                                        <th></th>\
                                        </tr>\
                                        <tr>\
                                        <th width="200">编号</th>\
                                        <th width="470">属性</th>\
                                        <th width="50">数量</th>\
                                        <th width="60"></th>\
                                        </tr>\
                                        </thead>\
                                        <tbody>' + settingGoodsInfo + '</tbody>\
                                        </table>'
                                                })
                                            } else if (v['optional'] == 2) {
                                                //不可选配
                                                $.each(v['good_list'], function (i2, v2) {
                                                    var settingGoodsInfo = '';
                                                    $.each(v2['attr_list'], function (i3, v3) {
                                                        settingGoodsInfo += '<tr>\
                                        <td>' + v3['good_sn'] + '</td>\
                                        <td>' + v3['good_attr'] + '</td>\
                                        <td>' + v3['total_num'] + '</td>\
                                        <td></td>\
                                        </tr>';
                                                    });
                                                    settingGoods += '<table class="xs_bjd_table_1">\
                                        <thead>\
                                        <tr style="background: #fff;">\
                                        <th class="c_3" style="font-weight: 100;">' + v2['title'] + '</th>\
                                        <th></th>\
                                        <th></th>\
                                        </tr>\
                                        <tr>\
                                        <th width="200">编号</th>\
                                        <th width="470">属性</th>\
                                        <th width="50">数量</th>\
                                        <th width="60"></th>\
                                        </tr>\
                                        </thead>\
                                        <tbody>' + settingGoodsInfo + '</tbody>\
                                        </table>';
                                                })
                                            }

                                            settingHtml += '<div class="xs_div_2" ' + (i == 0 ? ' style="margin-top: 20px;"' : '') + '>\
                            <table class="xs_bjd_table">\
                            <thead class="' + (i == 0 ? '' : 'none') + '">\
                            <tr>\
                            <th width="40">序号</th>\
                            <th width="140">编号</th>\
                            <th width="150">名称</th>\
                            <th width="285">属性</th>\
                            <th width="50">数量</th>\
                            <th width="55">配件</th>\
                            </tr>\
                            </thead>\
                            <tbody>\
                            <tr class="c_3 c_3 xs_bjd_bold">\
                            <td width="40">' + l_dbl(i + 1) + '</td>\
                            <td width="140">' + v['setting_sn'] + '</td>\
                            <td width="150">' + v['setting_name'] + '（' + (v['optional'] == 1 ? '可选配' : '不可选配') + '）</td>\
                            <td width="285">' + v['setting_attr'] + '</td>\
                            <td width="50">' + v['setting_num'] + '</td>\
                            <td width="55">\
                            <button class="but_mix box_open_btn_1 but_blue_1">展开</button>\
                            </td>\
                            </tr>\
                            </tbody>\
                            </table>\
                            </div>\
                            <div class="xs_tc_goods_box goods_tc_toggle" style="display: none;">' + settingGoods + '</div>';
                                        });
                                    } else {
                                        $('.tanceng .sell_order_look_cksp_detail_setting_box').css('display', 'none');
                                    }

                                    $('.tanceng .sell_order_look_cksp_detail_setting_list').html(settingHtml);
                                }
                            },
                            error: function (e) {
                                alert(e.msg);
                            }
                        });
                    });

                    //出库状态
                    $('.ven_sell_order_look_out_status_name').html(data['out_status_name']);
                    //商品总金额
                    $('.ven_sell_order_look_totals_product').html(data['totals_product']);
                    //税额合计
                    $('.ven_sell_order_look_rate_sum').html(data['rate_sum']);
                    //订单总金额
                    $('.ven_sell_order_look_totals').html(data['totals']);
                    //已收金额
                    $('.ven_sell_order_look_is_pay').html(data['is_pay']);
                    //已付款金额
                    $('.ven_sell_order_look_is_ticket').html(data['is_ticket']);
                    //备注
                    $('.ven_sell_order_look_note').html(data['note']);
                    //抄送人
                    var copyListHtml = '';
                    $.each(data['copy_list'], function (i, v) {
                        copyListHtml += v['name'] + ','
                    });
                    copyListHtml = copyListHtml.slice(0, copyListHtml.length - 1);
                    $('.ven_sell_order_look_copy_list').html(copyListHtml);

                    //获取当前关联报价单id
                    var sellOrderCurrentLinkQuoteId = data['quote_id'];
                    $('#ven_sell_order_look_quote_btn').die('click').live('click', function () {
                        $.ajax({
                            url: SERVER_URL + '/quote/info',
                            type: 'GET',
                            data: {
                                token: token,
                                quote_id: sellOrderCurrentLinkQuoteId
                            },
                            dataType: 'json',
                            success: function (oE) {
                                if (oE.code == 0 && oE.data) {
                                    var data = oE.data;
                                    //报价单编号
                                    $('#ven_sell_order_link_quote_code_sn').html(data['code_sn']);
                                    //销售订单
                                    $('#ven_sell_order_link_quote_order_code_sn').html(data['order_code_sn']);
                                    //借出单
                                    $('#ven_sell_order_link_quote_lend_code_sn').html(data['lend_code_sn']);
                                    //客户名称
                                    $('#ven_sell_order_link_quote_customer_name').html(data['customer_name']);
                                    //销售商品
                                    $('#ven_sell_order_link_quote_product_name').html(data['product_name']);
                                    //商品销售金额
                                    $('#ven_sell_order_link_quote_good_totals').html(data['good_totals']);
                                    //税率合计
                                    $('#ven_sell_order_link_quote_rate_sum').html(data['tax_rate'] == 1 ? '含税17%' : '无税');
                                    //运费承担
                                    $('#ven_sell_order_link_quote_is_freight').html(data['is_freight'] == 1 ? '包运费' : '不包运费');
                                    //总金额
                                    $('#ven_sell_order_link_quote_totals').html(data['totals']);
                                    //创建人
                                    $('#ven_sell_order_link_quote_uname').html(data['owner']);


                                    //审批流程

                                    var sellQuoteLookCheckListHtml = '';
                                    var checkStatusClass = "";

                                    var flowOrderArr2 = ['', '步骤一', '步骤二', '步骤三', '步骤四', '步骤五', '步骤六', '步骤七'];
                                    if (data['check_log'].length != 0) {
                                        $('.sq_look_check_box').removeClass('none');
                                        $.each(data['check_log'], function (i, v) {
                                            var checkStatusName = '';
                                            var checkCiteClass = '';
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
                                            sellQuoteLookCheckListHtml += '<div class="work_spiliu">\
                                <div class="work_spiliu_items" style="overflow: hidden;">\
                                <div class="left" style="position: relative;">\
                                <div class="work_spiliu_div">\
                                <img class="inline_block tx" src="' + v['face'] + '">\
                                <h3 class="work_sp_h3">' + v['name'] + '</h3>\
                                <span class="c_9 m_left_5 '+(data['current_check'] == 1 ? 'none1' : '')+'">'+flowOrderArr2[i]+'</span>\
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
                                <p class="c_3 work_sp_p '+(v['status'] == 9 ? 'none':'')+'">' + v['note'] + '</p>\
                                </div>\
                                </div>\
                                <div style="clear: both;height: 0;font-size: 1px;line-height: 0px;"></div>\
                                </div>\
                                </div>';
                                        });
                                        $('.ven_sell_order_link_quote_check_list').removeClass('none').html(sellQuoteLookCheckListHtml);
                                    } else {
                                        $('.ven_sell_order_link_quote_check_list').addClass('none');
                                    }
                                }
                            }
                        });
                    });
                    $('.ven_sell_order_link_quote_look_detail_btn').die('click').live('click', function () {
                        sellOrderLookQuoteDetailFn(sellOrderCurrentLinkQuoteId);
                    });

                    //获取当前关联合同id
                    var sellOrderCurrentLinkContractId = data['contract_id'];
                    $('#ven_sell_order_look_contract_btn').die('click').live('click', function () {
                        $.ajax({
                            url: SERVER_URL + '/market-contract/info',
                            type: 'GET',
                            data: {
                                token: token,
                                id: sellOrderCurrentLinkContractId
                            },
                            dataType: 'json',
                            success: function (oE) {
                                if (oE.code == 0) {
                                    var data = oE.data;
                                    console.log(data);
                                    //合同编号
                                    $('#ven_sell_order_link_contract_market_sn').html(data['market_sn']);
                                    //销售订单编号
                                    $('#ven_sell_order_link_contract_market_order_sn').html(data['market_order_sn']);
                                    //销售报价单编号
                                    $('#ven_sell_order_link_contract_market_quote_sn').html(data['market_quote_sn']);
                                    //合同名称
                                    $('#ven_sell_order_link_contract_name').html(data['name']);
                                    //客户名称
                                    $('#ven_sell_order_link_contract_customer_name').html(data['customer_name']);
                                    //审核状态
                                    $('#ven_sell_order_link_contract_statusname').html(data['status_name']);
                                    //审核人
                                    $('#ven_sell_order_link_contract_current_name').html(data['current_name']);
                                    //创建日期
                                    $('#ven_sell_order_link_contract_created_at').html(data['created_at']);
                                    //创建人
                                    $('#ven_sell_order_link_contract_uname').html(data['uname']);
                                    //负责部门
                                    $('#ven_sell_order_link_contract_dept_name').html(data['dept_name']);
                                    //负责人
                                    $('#ven_sell_order_link_contract_owner_name').html(data['owner_name']);

                                    //审批流程
                                    var sellQuoteLookCheckListHtml = '';
                                    $.each(data['check_log'], function (i, v) {
                                        var checkStatusName = '';
                                        var checkCiteClass = '';
                                        if (v['check_status'] == 1) {
                                            checkStatusName = '通过审批';
                                            checkCiteClass = 'b_g';
                                        } else if (v['check_status'] == 2) {
                                            checkStatusName = '进行中';
                                            checkCiteClass = 'b_y';
                                        }
                                        sellQuoteLookCheckListHtml += '<div class="work_spiliu">\
                                                     <div class="work_spiliu_items">\
                                                     <div class="left" style="position: relative;">\
                                                     <img class="inline_block tx" src="' + v['face'] + '">\
                                                     <cite class="' + checkCiteClass + '"></cite>\
                                                     </div>\
                                                     <div class="right auto_height">\
                                                     <img src="static/images/work_jiantou.png">\
                                                     <div class="sp_cont">\
                                                     <div><h3 class="c_3" ' + (v['check_status'] == 2 ? 'style="color:#f8ac59;"' : '') + '>' + v['name'] + '</h3><span class="c_9 m_left_5">' + v['day'] + '</span></div>\
                                                     <h3 class=" f_color">' + checkStatusName + '</h3>\
                                                     <p class="c_3 work_sp_p">' + v['note'] + '</p>\
                                                     </div>\
                                                     </div>\
                                                     <div style="clear: both;height: 0;font-size: 1px;line-height: 0px;"></div>\
                                                     </div>\
                                                     </div>'
                                    });
                                    $('.ven_sell_order_link_contract_check_list').html(sellQuoteLookCheckListHtml);
                                } else {
                                    alert('操作失败')
                                }
                            }
                        })
                    });

                    //关联收款付票
                    $('#ven_sell_order_look_skfp_btn').die('click').live('click', function () {
                        //收款
                        $.ajax({
                            url: SERVER_URL + '/receipt/info',
                            type: 'GET',
                            data: {
                                token: token,
                                thetype: 2,
                                id: data['id']
                            },
                            dataType: 'json',
                            success: function (oE) {
                                console.log(oE);
                                if (oE.code == 0) {
                                    //回款阶段
                                    var datalist = oE.datalist.stepList;
                                    if(datalist.length>0){
                                        $('.ven_sell_order_look_hkjd_tbody_nodata_box').addClass('none');
                                        var sellOrderSkHtml = '';
                                        var skStatusClass = '';
                                        var skStatusName = '';
                                        $.each(datalist, function (i, v) {
                                            if (v['pay_status'] == 3) {
                                                skStatusClass = 'c_r';
                                                skStatusName = '逾期';
                                            } else if (v['pay_status'] == 1) {
                                                skStatusClass = 'c_g';
                                                skStatusName = '正常回款 <i class="xs_xsdd_yes"></i>';
                                            } else {
                                                skStatusClass = 'c_y';
                                                skStatusName = '待收';
                                            }
                                            sellOrderSkHtml += '<tr  style="border-bottom: 1px dashed #cecece;">\
                                                            <td>阶段' + (i + 1) + '</td>\
                                                            <td>' + v['segmet_day'] + '</td>\
                                                            <td>' + v['no_pay_money'] + '</td>\
                                                            <td>' + v['pay_time'] + '</td>\
                                                            <td>' + v['already_money'] + '</td>\
                                                            <td class="' + skStatusClass + '" style="font-weight: bold;position: relative;">' + skStatusName + '</td>\
                                                            </tr>'
                                        });
                                        $('.ven_sell_order_look_hkjd_tbody').html(sellOrderSkHtml);
                                    }else{
                                        $('.ven_sell_order_look_hkjd_tbody_nodata_box').removeClass('none');
                                        $('.ven_sell_order_look_hkjd_tbody').html('');
                                    }
                                    //订单收款记录
                                    if(oE.receiptLogList.length > 0){
                                        $('.ven_sell_order_look_skjl_tbody_nodata_box').addClass('none');
                                        $('.ven_sell_order_look_skjl_tbody_table_total').removeClass('none');
                                        var receiptLogHtml = '';
                                        var receiptLogTotal = 0;
                                        $.each(oE.receiptLogList, function (i, v) {
                                            receiptLogHtml += '<tr>\
                                                            <td>' + l_dbl(i + 1) + '</td>\
                                                            <td>' + v['code_sn'] + '</td>\
                                                            <td>' + v['day'] + '</td>\
                                                            <td>' + v['owner_name'] + '</td>\
                                                            <td>' + v['choice_cuenta'] + '</td>\
                                                            <td>' + v['already_pay_money'] + '</td>\
                                                            <td>' + v['note'] + '</td>\
                                                            </tr>';
                                            receiptLogTotal += parseFloat(v['already_pay_money']);
                                        });
                                        $('.ven_sell_order_look_skjl_tbody').html(receiptLogHtml);
                                        $('.ven_sell_order_look_skjl_total').html(receiptLogTotal);
                                    }else{
                                        $('.ven_sell_order_look_skjl_tbody_nodata_box').removeClass('none');
                                        $('.ven_sell_order_look_skjl_tbody_table_total').addClass('none');
                                        $('.ven_sell_order_look_skjl_tbody').html('');
                                        $('.ven_sell_order_look_skjl_total').html('');
                                    }
                                } else {
                                    alert('操作失败')
                                }
                            }
                        });
                        //付票
                        $.ajax({
                            url: SERVER_URL + '/output-ticket/info',
                            type: 'GET',
                            data: {
                                token: token,
                                thetype: 2,
                                id: data['id']
                            },
                            dataType: 'json',
                            success: function (oE) {
                                console.log(oE);
                                if (oE.code == 0) {
                                    //付票阶段
                                    var stepDatalist = oE.stepList;
                                    if(stepDatalist.length > 0){
                                        $('.sell_order_look_fp_tbody_nodata_box').addClass('none');
                                        var fpjdHtml = '';
                                        $.each(stepDatalist, function (i, v) {
                                            if (v['pay_status'] == 3) {
                                                skStatusClass = 'c_r';
                                                skStatusName = '逾期';
                                            } else if (v['pay_status'] == 1) {
                                                skStatusClass = 'c_g';
                                                skStatusName = '正常付票 <i class="xs_xsdd_yes"></i>';
                                            } else {
                                                skStatusClass = 'c_y';
                                                skStatusName = '待收';
                                            }
                                            fpjdHtml += '<tr  style="border-bottom: 1px dashed #cecece;">\
                                                            <td>阶段' + (i + 1) + '</td>\
                                                            <td>' + v['segmet_day'] + '</td>\
                                                            <td>' + v['no_pay_money'] + '</td>\
                                                            <td>' + v['pay_time'] + '</td>\
                                                            <td>' + v['already_money'] + '</td>\
                                                            <td class="' + skStatusClass + '" style="font-weight: bold;position: relative;">' + skStatusName + '</td>\
                                                            </tr>'
                                        });
                                        $('.sell_order_look_fp_tbody').html(fpjdHtml);
                                    }else{
                                        $('.sell_order_look_fp_tbody_nodata_box').removeClass('none');
                                        $('.sell_order_look_fp_tbody').html('');
                                    }
                                    //订单付票记录
                                    var logDatalist = oE.logList;
                                    if(logDatalist.length > 0){
                                        $('.sell_order_look_ddfpjl_tbody_nodata_box').addClass('none');
                                        $('.sell_order_look_ddfpjl_tbody_table_total').removeClass('none');
                                        var logHtml = '';
                                        $.each(logDatalist, function (i, v) {
                                            logHtml += '';
                                        });
                                    }else{
                                        $('.sell_order_look_ddfpjl_tbody_nodata_box').removeClass('none');
                                        $('.sell_order_look_ddfpjl_tbody_table_total').addClass('none');
                                    }
                                } else {
                                    alert('操作失败')
                                }
                            }
                        });
                    });

                    //关联售后单
                    $('#ven_sell_order_look_afterorder_btn').die('click').live('click', function () {
                        $.ajax({
                            url: SERVER_URL + '/order/afterorder',
                            type: 'GET',
                            data: {
                                token: token,
                                order_id: sellOrderCurrentId
                            },
                            dataType: 'json',
                            success: function (oE) {
                                console.log(oE);
                                if (oE.code == 0) {
                                    var data = oE.data;
                                    //售后单编号
                                    $('#ven_sell_order_link_afterorder_code_sn').html(data['code_sn']);
                                    //销售订单编号
                                    $('#ven_sell_order_link_afterorder_order_code_sn').html(data['order_code_sn']);
                                    //客户
                                    $('#ven_sell_order_link_afterorder_customer_name').html(data['customer_name']);
                                    //售后商品
                                    $('#ven_sell_order_link_afterorder_afterorder_goods_name').html(data['afterorder_goods_name']);
                                    //负责人
                                    $('#ven_sell_order_link_afterorder_owner_name').html(data['owner_name']);
                                    //售后时间
                                    $('#ven_sell_order_link_afterorder_service_at').html(data['service_at']);
                                    //售后类型
                                    var servicetypeName = '';
                                    if (data['service_type'] == 0) {
                                        servicetypeName = '外出售后'
                                    } else if (data['service_type'] == 1) {
                                        servicetypeName = '电话售后'
                                    } else if (data['service_type'] == 2) {
                                        servicetypeName = '网络售后'
                                    }
                                    $('#ven_sell_order_link_afterorder_servicetype').html(servicetypeName);
                                    //创建人
                                    $('#ven_sell_order_link_afterorder_uname').html(data['uname']);
                                    //创建时间
                                    $('#ven_sell_order_link_afterorder_created_at').html(data['created_at']);
                                    //状态
                                    var statusname = '';
                                    if (data['status'] == 0) {
                                        statusname = '待接受';
                                    } else if (data['status'] == 1) {
                                        statusname = '已接受';
                                    } else if (data['status'] == 2) {
                                        statusname = '完成';
                                    } else if (data['status'] == 3) {
                                        statusname = '终止';
                                    }
                                    $('#ven_sell_order_link_afterorder_statusname').html(statusname);
                                    //备注
                                    $('#ven_sell_order_link_afterorder_note').html(data['note']);
                                } else {
                                    alert('操作失败')
                                }
                            }
                        })
                    });

                    //关联退换货
                    $('#ven_sell_order_look_returngoods_btn').die('click').live('click', function () {
                        $.ajax({
                            url: SERVER_URL + '/order/returngoods',
                            type: 'GET',
                            data: {
                                token: token,
                                order_id: sellOrderCurrentId
                            },
                            dataType: 'json',
                            success: function (oE) {
                                if (oE.code == 0) {
                                    var data = oE.data;
                                    console.log(data);
                                    //退换货编号
                                    $('#ven_sell_order_link_reproduct_code_sn').html(data['code_sn']);
                                    //销售订单编号
                                    $('#ven_sell_order_link_reproduct_order_code_sn').html(data['order_code_sn']);
                                    //客户
                                    $('#ven_sell_order_link_reproduct_customer_name').html(data['customer_name']);
                                    //退换商品类型
                                    $('#ven_sell_order_link_reproduct_afterorder_goods_name').html(data['afterorder_goods_name']);
                                    //退换货类型
                                    var thetypename = '';
                                    if (data['thetype'] == 1) {
                                        thetypename = '换货';
                                    } else if (data['thetype'] == 2) {
                                        thetypename = '退货';
                                    }
                                    $('#ven_sell_order_link_reproduct_thetypename').html(thetypename);
                                    //退款总金额(元)
                                    $('#ven_sell_order_link_reproduct_totals').html(data['totals']);
                                    //退换货日期
                                    $('#ven_sell_order_link_reproduct_service_at').html(data['service_at']);
                                    //预计退款日期
                                    $('#ven_sell_order_link_reproduct_returnmoney_at').html(data['returnmoney_at']);
                                    //审批状态
                                    var statusname = '';
                                    if (data['status'] == 1) {
                                        statusname = '审批中'
                                    } else if (data['status'] == 2) {
                                        statusname = '未完成'
                                    } else if (data['status'] == 3) {
                                        statusname = '已完成'
                                    }
                                    $('#ven_sell_order_link_reproduct_statusname').html(statusname);
                                    //审批人
                                    $('#ven_sell_order_link_reproduct_approval_name').html(data['approval_name']);
                                    //负责人
                                    $('#ven_sell_order_link_reproduct_owner_name').html(data['owner_name']);
                                    //创建时间
                                    $('#ven_sell_order_link_reproduct_created_at').html(data['created_at']);
                                    //创建人
                                    $('#ven_sell_order_link_reproduct_uname').html(data['uname']);
                                    //入库状态
                                    var instatusname = '';
                                    if (data['in_status'] == 0) {
                                        instatusname = '未入库';
                                    } else if (data['in_status'] == 1) {
                                        instatusname = '已入库';
                                    }
                                    $('#ven_sell_order_link_reproduct_instatusname').html(instatusname);
                                    //出库状态
                                    var outstatusname = '';
                                    if (data['out_status'] == 0) {
                                        outstatusname = '未入库';
                                    } else if (data['out_status'] == 1) {
                                        outstatusname = '已入库';
                                    }
                                    $('#ven_sell_order_link_reproduct_outstatusname').html(outstatusname);
                                    //备注
                                    $('#ven_sell_order_link_reproduct_note').html(data['note']);
                                } else {
                                    alert('操作失败')
                                }
                            }
                        })
                    });
                } else {
                    alert('操作失败')
                }
            }
        });
        $('.Sideslip_list ul li:first-of-type').trigger('click');
        $('.slider_head_list').css('display', 'none');
    });