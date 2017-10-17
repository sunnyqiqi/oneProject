//$(function(){
	

var token, page, num;
token = Admin.get_token();
//token = "2017051317050663733-1-1";
//SERVER_URL = 'http://192.168.0.167:9091/';
page = 1;
num = 10;
//商品分类
var kccx_spfl_data = {
	token: token,
	pid: '',
	category: '1' //1.商品 2.配置商品
}
kccx_spfl_ajax()
function kccx_spfl_ajax() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "product-category/list",
		data: kccx_spfl_data,
		dataType: 'json',
		success: function(data) {
			console.log(data)
			var d_nums = data['dataList'].length,datalist = data['dataList'],datahtml='';
			//console.log(d_nums)
			$.each(datalist, function(i,v) {
				datahtml +='<li class="hr_left_1" cusSortId="' + v.id + '"><span>' +v.name+ '&nbsp;<em class="list_num_null"></em></span></li>';
			});
			$('.crkkccx_spflmainlength_xxl').html('('+d_nums+')');
			$('.kccx_spfl_listhtml_xxl').html(datahtml);
			$('.kccx_peizhisp_listhtml_xxl').html(datahtml);
		},
		error: function(e) {
			console.log(e)
		}
	});
}

$('.kccx_splist_tab_xxl li').die().live('click', function() {
		console.log($(this).attr('typeid'))
		if($(this).attr('typeid')==1){
			kccx_spfl_data.category = $(this).attr('typeid')
			$('.kccx_status_show_btnxxl').attr('typeid',$(this).attr('typeid')).removeAttr('checked');
			$('.kccx_ssvalue_xxl').val('商品编号/商品名称').css('color','rgb(204, 204, 204)');
			kccx_spfl_ajax();
			kccx_sp_data.key='';
			kccx_sp_ajax()
		}else{
			kccx_spfl_data.category = $(this).attr('typeid');
			$('.kccx_status_show_btnxxl').attr('typeid',$(this).attr('typeid')).removeAttr('checked');
			$('.kccx_ssvalue_xxl').val('商品编号/商品名称').css('color','rgb(204, 204, 204)');
			kccx_spfl_ajax();
			kccx_peizhisp_list_data.key = '';
			kccx_peizhisp_list_ajax()
		}
	})
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
//正比例缩放图片
function setImg(img, width, height) {
			var scale_w = img.width / width;
			var scale_h = img.height / height;
			var scale = scale_w > scale_h ? scale_w : scale_h;
			img.width = img.width / scale;
			return false;
		}
//库存商品列表
var kccx_sp_data = {
	token: token,
	page: page,
	num: num,
	status: '', //是否启用状态 0正常 1停用
	category_id: '', //商品分类ID
	order_by: '', //排序字段 （top_limit 库存上限，lower_limit 库存下限）
	order_sort: '', //排序顺序 0 正序 1 倒序
	key: '' //关键字
}
$('.kccx_spfl_listhtml_xxl li.hr_left_1').die().live('click',function(){
	//console.log($(this).attr('cussortid'))
	kccx_sp_data.category_id = $(this).attr('cusSortId');
	kccx_sp_ajax()
})
$('.kccx_peizhisp_listhtml_xxl li.hr_left_1').die().live('click',function(){
	//console.log($(this).attr('cussortid'))
	kccx_peizhisp_list_data.cate_id = $(this).attr('cusSortId');
	kccx_peizhisp_list_ajax()
})
//点击刷新
$('.kccx_dianjiasx_btn_xxl').die().live('click', function() {
		add_Rload_index(73, 8) //参数页面值，父级值
	})
//切换状态升降序
var kccxkcsx=0;
$('.kccx_kcsx_sortpx_xxl').die().live('click',function(){
	kccxkcsx++;
	if(kccxkcsx%2==0){
		kccx_sp_data.order_sort = '0';
	}else{
		kccx_sp_data.order_sort = '1';
	}
	kccx_sp_data.order_by = 'top_limit';
	kccx_sp_ajax()
})
//$('.kccx_kcsx_sortpx_xxl').toggle(function() {
//		$(this).children(".price_icon").removeClass("down").addClass("up");
//		kccx_sp_data.order_by = 'top_limit';
//		kccx_sp_data.order_sort = '0';
//		kccx_sp_ajax()
//	}, function() {
//		$(this).children(".price_icon").removeClass("up").addClass("down");
//		kccx_sp_data.order_by = 'top_limit';
//		kccx_sp_data.order_sort = '1';
//		kccx_sp_ajax()
//	})
var kcxxnum=0;
$('.kccx_kcxx_sortpx_xxl').die().live('click',function(){
	kcxxnum++;
	if(kcxxnum%2==0){
		kccx_sp_data.order_sort = '0';
	}else{
		kccx_sp_data.order_sort = '1';
	}
	kccx_sp_data.order_by = 'lower_limit';
	kccx_sp_ajax()
})
//$('.kccx_kcxx_sortpx_xxl').toggle(function() {
//		$(this).children(".price_icon").removeClass("down").addClass("up");
//		kccx_sp_data.order_by = 'lower_limit';
//		kccx_sp_data.order_sort = '0';
//		kccx_sp_ajax()
//	}, function() {
//		$(this).children(".price_icon").removeClass("up").addClass("down");
//		kccx_sp_data.order_by = 'lower_limit';
//		kccx_sp_data.order_sort = '1';
//		kccx_sp_ajax()
//	})

function kccx_sp_ajax() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "warehouse/prolist",
		data: kccx_sp_data,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg)
				$('.kccx_fenye_list_xxl').css('display', 'none');
				$('.kccx_sp_listhtml_xxl').html('');
				$('.kccx_sperr_html_xxl').css('display', 'block')
			} else {
				console.log(data)
				$('.kccx_listmain_nums_xxl').html(data.data.totalcount)
				var sp_list = data.data.dataList,
					sp_html = '';
				if(sp_list.length == 0) {
					$('.kccx_fenye_list_xxl').css('display', 'none');
					$('.kccx_sp_listhtml_xxl').html('');
					$('.kccx_sperr_html_xxl').css('display', 'block')
				} else {
					$('.kccx_fenye_list_xxl').css('display', 'block');
					$('.kccx_sperr_html_xxl').css('display', 'none');
					$.each(sp_list, function(i, v) {
						if(v.status == 1) {
							sp_html += '<tr class="grey">';
							sp_html += '<td><span class="voidIcon">已停用</span></td>';
							sp_html += '<td>' + likNullData(v.code_sn) + '</td>';
							sp_html += '<td>' + likNullData(v.name) + '</td>';
							//sp_html += '<td>' + likNullData(v.format) + '</td>';
							if(v.attributes.length == 0) {
								sp_html += '<td>-</td>';
							} else {
								var sx_html = '';
								$.each(v.attributes, function(j, m) {
									sx_html += '<span>' + likNullData(m.value) + '</span>';
								});
								sp_html += '<td><p class="cru_kccx_p">' + sx_html + '</p></td>';
							}
							sp_html += '<td>' + likNullData(v.unit_name) + '</td>';
							sp_html += '<td>' + likNullData(v.top_limit) + '</td>';
							sp_html += '<td>' + likNullData(v.lower_limit) + '</td>';
							sp_html += '<td>' + likNullData(v.currentNum) + '</td>';
							//sp_html += '<td>' + likNullData(v.usableNum) + '</td>';
							sp_html += '<td>' + likNullData(v.stockingOutNum) + '</td>';
							sp_html += '<td>' + likNullData(v.stockingInNum) + '</td>';
							sp_html += '<td></td></tr>';
						} else {
							sp_html += '<tr><td>' + Appendzero(i + 1) + '</td>';
							sp_html += '<td>' + likNullData(v.code_sn) + '</td>';
							sp_html += '<td>' + likNullData(v.name) + '</td>';
							//sp_html += '<td>' + likNullData(v.format) + '</td>';
							if(v.attributes.length == 0) {
								sp_html += '<td>-</td>';
							} else {
								var sx_html = '';
								$.each(v.attributes, function(j, m) {
									sx_html += '<span>' + likNullData(m.value) + '</span>';
								});
								sp_html += '<td><p class="cru_kccx_p">' + sx_html + '</p></td>';
							}
							sp_html += '<td>' + likNullData(v.unit_name) + '</td>';
							if(v.top_limit==0){
								sp_html += '<td>-</td>';
							}else{
								sp_html += '<td>' + likNullData(v.top_limit) + '</td>';
							}
							if(v.lower_limit==0){
								sp_html += '<td>-</td>';
							}else{
								sp_html += '<td>' + likNullData(v.lower_limit) + '</td>';
							}
							
							if(v.currentNum > v.top_limit) {
								if(v.top_limit==0){
									sp_html += '<td class="relative crk_kccx_dqku">' + likNullData(v.currentNum) + '</td>';
								//sp_html += '<div class="cg_ghs_contMsgBox" style="display: none;left: 20px;width: 150px;">';
								//sp_html += '<i class="cg_ghs_torr"></i><div class="cg_ghs_contMsgBoxDet" style="margin-top: 6px;">';
									//sp_html += '<ul><li class="c_3">库存高于预警：<span class="c_r">' + parseInt(v.currentNum - v.top_limit) + '块</span></li></ul></div></div></td>';
								}else{
									sp_html += '<td class="relative crk_kccx_dqku">' + likNullData(v.currentNum) + '<span class="storage_single_circle but_red m_left_10">高</span>';
								sp_html += '<div class="cg_ghs_contMsgBox" style="display: none;left: 20px;width: 150px;">';
								sp_html += '<i class="cg_ghs_torr"></i><div class="cg_ghs_contMsgBoxDet" style="margin-top: 6px;">';
									sp_html += '<ul><li class="c_3">库存高于预警：<span class="c_r">' + parseInt(v.currentNum - v.top_limit) + '块</span></li><li>(库存最高预警：<span>' + likNullData(v.top_limit) + '块</span>)</li></ul></div></div></td>';
								}
								
							} else if(v.currentNum < v.lower_limit) {
								
								if(v.lower_limit==0){
									sp_html += '<td class="relative crk_kccx_dqku">' + likNullData(v.currentNum) + '</td>';
								//sp_html += '<i class="cg_ghs_torr"></i><div class="cg_ghs_contMsgBoxDet" style="margin-top: 6px;">';
									//sp_html += '<ul><li>库存低于预警：<span class="c_y">' + parseInt(v.lower_limit - v.currentNum) + '块</span></li></ul></div></div></td>';
								}else{
									sp_html += '<td class="relative crk_kccx_dqku">' + likNullData(v.currentNum) + '<span class="storage_single_circle but_yellow m_left_10">低</span><div class="cg_ghs_contMsgBox" style="display: none;left: 20px;width: 150px;">';
								sp_html += '<i class="cg_ghs_torr"></i><div class="cg_ghs_contMsgBoxDet" style="margin-top: 6px;">';
									sp_html += '<ul><li>库存低于预警：<span class="c_y">' + parseInt(v.lower_limit - v.currentNum) + '块</span></li><li>(库存最低预警：<span>' + likNullData(v.lower_limit) + '块</span>)</li></ul></div></div></td>';
								}
								
							} else {
								sp_html += '<td>' + likNullData(v.currentNum) + '</td>';
							}
							//sp_html += '<td>' + likNullData(v.usableNum) + '</td>';
							sp_html += '<td>' + likNullData(v.stockingOutNum) + '</td>';
							sp_html += '<td>' + likNullData(v.stockingInNum) + '</td>';
							sp_html += '<td><button class="but_mix but_look val_dialog kccx_chakan_btn_xxl" name="crk_kfcl_kfclxq" uid="' + v.id + '">查看</button><button class="but_mix but_exit val_dialog kccx_kffb_btn_xxl" name="crk_kfcl_kfclLook" uid="' + v.id + '">库房分布</button></td></tr>';
						}
					});
					$('.kccx_sp_listhtml_xxl').html(sp_html);
					list_table_render_pagination(".kccx_fenye_list_xxl", kccx_sp_data, kccx_sp_ajax, data.data.totalcount, sp_list.length);
				}
			}
		},
		error: function(e) {
			console.log(e)
			$('.kccx_fenye_list_xxl').css('display', 'none');
			$('.kccx_sp_listhtml_xxl').html('');
			$('.kccx_sperr_html_xxl').css('display', 'block');
			kccx_sp_ajax();
		}
	});
}
kccx_sp_ajax()
	//补零
function Appendzero(obj) {
	if(obj < 10) return "0" + obj;
	else return obj;
}
//不显示已停用
$('.kccx_status_show_btnxxl').die().live('click', function() {
	if($(this).attr('typeid')==1){
		if($(this).prop("checked")) {
			kccx_sp_data.status = '0';
			kccx_sp_ajax()
		} else {
			kccx_sp_data.status = '';
			kccx_sp_ajax()
		}
	}else{
		if($(this).prop("checked")) {
			kccx_peizhisp_list_data.status = '0';
			kccx_peizhisp_list_ajax()
		} else {
			kccx_peizhisp_list_data.status = '';
			kccx_peizhisp_list_ajax()
		}
	}
		
	})
	//搜索
//function kccx_sousuo_now(val) {
//	kccx_peizhisp_list_data.key = val;
//	kccx_peizhisp_list_ajax();
//	kccx_sp_data.key = val;
//	kccx_sp_ajax()
//}
$('.kccx_ssbtn_xxl').die().live('click', function() {
		if($('.kccx_ssvalue_xxl').val() == '' || $('.kccx_ssvalue_xxl').val() == '商品编号/商品名称') {
			kccx_sp_data.key='';
			kccx_peizhisp_list_data.key = '';
		} else {
			kccx_sp_data.key = $('.kccx_ssvalue_xxl').val();
			kccx_peizhisp_list_data.key = $('.kccx_ssvalue_xxl').val();
		}
		kccx_sp_ajax();
		kccx_peizhisp_list_ajax();
	})
	//商品查看
$('.kccx_chakan_btn_xxl').die().live('click', function() {
	sp_chakan_data.id = $(this).attr('uid');
	sp_chakan_ajax()
})
var sp_chakan_data = {
	token: token,
	id: '',
	detail: '1' //是否显示出入库列表 0 否 1是
}

function sp_chakan_ajax() {
	$.ajax({
		type: "get",
		url: SERVER_URL + "warehouse/infobyproductid",
		data: sp_chakan_data,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data)
			} else {
				console.log(data)
				var dlist = data.dataList.productInfo,
					sx_list = '',
					datanums = data['dataList'],
					crkd_html = '',
					crkd_list = data.dataList.list;
					$('.kccx_sp_ckxq_mc_xxl').html(dlist.name);
				$('.kccx_kfxq_spbh_xxl').html(dlist.code_sn);
				$('.kccx_spkfxq_snbtn_xxl').attr('uid', dlist.id);
				//$('.kccx_kfxq_gg_xxl').html(dlist.format);
				$.each(dlist.attributes, function(i, v) {
					sx_list += '' + likNullData(v.name) + ':<span>' + likNullData(v.value) + '</span>';
				});
				$('.kccx_kfxq_sx_xxl').html(sx_list);
				$('.kccx_kfxq_bz_xxl').val('备注：' + dlist.remark);
				var Height = $('.tanceng .pro_look_img_btn[name="cru_sp_ck_img_look"]').height();
				var Width = $('.tanceng .pro_look_img_btn[name="cru_sp_ck_img_look"]').width();
				if(dlist.image_url==''||dlist.image_url==null||dlist.image_url==undefined){
					$('.tanceng .pro_look_img_btn').removeClass('val_dialogTop');
					$('.tanceng .kccx_kfxq_cpimg_xxl').attr('src','static/images/error_xxl.png');
					//console.log(Height+':::'+Width)
					setImg($('.tanceng .kccx_kfxq_cpimg_xxl'), Height, Width);
					 $('.tanceng .pro_goods_list_detail_img_num_total').html('0');
				}else{
					//console.log(Height+':::'+Width)
					$('.tanceng .image_box_content_img').attr('src','');
					$('.tanceng .pro_look_img_btn').addClass('val_dialogTop');
					var imgarr = dlist.image_url.split(',');
					$('.tanceng .kccx_kfxq_cpimg_xxl').attr('src', getImgUrl(imgarr[0]));
					setImg($('.tanceng .kccx_kfxq_cpimg_xxl'), Height, Width);
					if (imgarr) {
       $('.tanceng .pro_goods_list_detail_img_num_total').html(imgarr.length);
     $('.pro_look_img_btn').live('click', function () {
     	$('.tanceng .image_box_content_img').attr('src', '');
            var goods_arr = imgarr;
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
         });
     };
//					$.each(imgarr, function(i,v) {
//						
//					});
				}
				
				
				$('.kccx_kfxq_kcss_xxl').html(datanums.qichuNum + '+' + datanums.stockInNum + '-' + datanums.stockOutNum);
				$('.kccx_spkfxq_dqkc_nums').html(parseInt(datanums.qichuNum + datanums.stockInNum - datanums.stockOutNum));
				$('.kccx_spkfxq_drksl_xxl').html(datanums.stockingInNum);
				$('.kccx_spkfxq_dcknum_xxl').html(datanums.stockingOutNum);
				var kynums = parseInt(parseInt(datanums.qichuNum + datanums.stockInNum - datanums.stockOutNum) + parseInt(datanums.stockingInNum) - parseInt(datanums.stockingOutNum));
				$('.kccx_kfxq_sp_kykc_numsxxl').html(kynums);
				if(crkd_list.length == 0) {
					$('.kccx_kfxq_crkdlist_html_xxl').html('');
					var crkd_err = '';
					crkd_err += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
					$('.crkd_list_errhtml_xxl').html(crkd_err);
				} else {
					$('.crkd_list_errhtml_xxl').html('');
					$.each(crkd_list, function(i, v) {
						crkd_html += '<tr>';
						crkd_html += '<td>' + Appendzero(i + 1) + '</td>';
						crkd_html += '<td>' + likNullData(v.create_time.substr(0,10)) + '</td>';
						crkd_html += '<td>' + likNullData(v.number) + '</td>';
						crkd_html += '<td>' + likNullData(v.warehouse_name) + '</td>';
						if(v.cate == 1) {
							if(v.input_type == 1) {
								crkd_html += '<td>销售退货</td>';
							} else if(v.input_type == 2) {
								crkd_html += '<td>采购入库</td>';
							} else if(v.input_type == 3) {
								crkd_html += '<td>调拨</td>';
							} else if(v.input_type == 4) {
								crkd_html += '<td>借入</td>';
							} else if(v.input_type == 5) {
								crkd_html += '<td>借出归还</td>';
							} else {
								crkd_html += '<td>换货入库</td>';
							}
						} else {
							if(v.input_type == 1) {
								crkd_html += '<td>销售出库</td>';
							} else if(v.input_type == 2) {
								crkd_html += '<td>采购退货</td>';
							} else if(v.input_type == 3) {
								crkd_html += '<td>调拨</td>';
							} else if(v.input_type == 4) {
								crkd_html += '<td>借出</td>';
							} else if(v.input_type == 5) {
								crkd_html += '<td>借入归还</td>';
							} else {
								crkd_html += '<td>换货出库</td>';
							}
						}
						crkd_html += '<td>' + likNullData(v.related_receipts_no) + '</td>';
						crkd_html += '<td>'+likNullData(v.related_business_name)+'</td>';
						if(v.cate == 1) {
							crkd_html += '<td>-</td>';
							crkd_html += '<td>' + likNullData(v.distribution_num) + '</td></tr>';
						} else {
							crkd_html += '<td>' + likNullData(v.distribution_num) + '</td>';
							crkd_html += '<td>-</td></tr>';
						}

					});
					if(crkd_list.length>=6){
						// alert(111);
						$('.tanceng .crk_kfcl_kfclxq_a').css('height','90%');
					}
					$('.kccx_kfxq_crkdlist_html_xxl').html(crkd_html);
					$(".tanceng .kccx_kfxq_cpimg_xxl").error(function(e) { //加入相应的图片类名
					$(this).attr("src", "static/images/error_xxl.png");
				});
				}

			}
		},
		error: function(e) {
			console.log(e)
		}
	});
}
//ss
function kccx_spcrkdss_now(val){
	var kc_tit = $('.kccx_spcrd_value_xxl').val();
	if(kc_tit == '' || kc_tit == '出入库单号/关联业务单号') {
		$('.kccx_kfxq_crkdlist_html_xxl tr').show();
		//$('.crkd_list_errhtml_xxl').html('');
		sp_chakan_ajax()
	} else {
		$(".tanceng .kccx_kfxq_crkdlist_html_xxl tr").hide().filter(":contains('" + (val) + "')").show().addClass('shownow');//.siblings()
		if($('.tanceng .kccx_kfxq_crkdlist_html_xxl tr.shownow').length==0){
			$('.kccx_kfxq_crkdlist_html_xxl').html('');
			$('.tanceng .crkd_list_errhtml_xxl').html('<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>');
		}else{
			$('.tanceng .crkd_list_errhtml_xxl').html('');
			
		}
//		$('.tanceng .kccx_kfxq_crkdlist_html_xxl tr').not('tr:last-child').each(function() {
//				var arrnums = [],
//					kc_ssnums = 0;
//				arrnums.push($(this).children('td:last-child').html())
//				$('.kfgl_dqkc_sjnums_xxl').html($(this).length)
//				if(arrnums.length == 0) {
//					$('.kfgl_dqkc_nums_xxl').html('0');
//				} else {
//					for(var i = 0; i < arrnums.length; i++) {
//						kc_ssnums += parseInt(arrnums[i]);
//					}
//					
//					$('.kfgl_dqkc_nums_xxl').html(kc_ssnums);
//				}
//			
//		})

		
//		$('.kccx_kfxq_crkdlist_html_xxl tr').each(function() {
//			var spbh_kc = $(this).children().eq(2).html();
//			var mc_kc = $(this).children().eq(5).html();
//			if(spbh_kc.indexOf(kc_tit) != -1 || mc_kc.indexOf(kc_tit) != -1) {
//				$('.crkd_list_errhtml_xxl').html('');
//				$(this).show()
//			} else {
//				$(this).hide()
//				$('.kccx_kfxq_crkdlist_html_xxl tr').hide();
//				$('.crkd_list_errhtml_xxl').html('<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>');
//			}
//		})

	}
}
$('.kccx_spcrd_btnss_xxl').die().live('click',function(){
	var kc_tit = $('.kccx_spcrd_value_xxl').val();
	if($('.kccx_spcrd_value_xxl').val()==''||$('.kccx_spcrd_value_xxl').val()=='出入库单号/关联业务单号'){
		return false;
	}else{
		$('.kccx_kfxq_crkdlist_html_xxl tr').hide().filter(':contains('+kc_tit+')').show();
//		$('.kccx_kfxq_crkdlist_html_xxl tr').each(function() {
//			var spbh_kc = $(this).children().eq(2).html();
//			var mc_kc = $(this).children().eq(5).html();
//			if(spbh_kc.indexOf(kc_tit) != -1 || mc_kc.indexOf(kc_tit) != -1) {
//				$('.crkd_list_errhtml_xxl').html('');
//				$(this).show()
//			} else {
//				$(this).hide()
//				$('.kccx_kfxq_crkdlist_html_xxl tr').hide();
//				$('.crkd_list_errhtml_xxl').html('<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>');
//			}
//		})
	}
})
//商品序列号
var kccx_xlh_data = {
	token:token,
	id:'',
	category:'',//类别 1（默认）商品 2配置商品
	type:''//商品类别 0（默认） 商品 1 配置商品
}
function kccx_xlh_ajax(){
	$.ajax({
		type:"get",
		url:SERVER_URL+"warehouse/sn",
		data:kccx_xlh_data,
		dataType:'json',
		success:function(data){
			if(data.code!=0){
				console.log(data)
				$('.kccx_xlh_splist_zaikuhtml_xxl').html('');
					zk_err +='<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
					$('.kccx_xlh_zaiku_errhtml_xxl').html(zk_err);
					$('.kccx_xlh_splist_chukuhtml_xxl').html('');
					ck_errs +='<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
					$('.kccx_xlh_chuku_errhtml_xxl').html(ck_errs)
					$('.kccx_pzsp_ckxlh_listhtml_xxl').html('');
					pzsp_zkerr +='<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
					$('.kccx_pzsp_ckxlh_errhtml_xxl').html(pzsp_zkerr)
			}else{
				console.log(data)
				var zk_list = data.dataList.stockInSnList,zk_html='',ck_list = data.dataList.stockOutSnList,ck_html = '',zk_err='',ck_errs='',pzsp_zklist=data.dataList.stockInSnList,pzsp_zkhtml='',pzsp_zkerr='';
				$('.kccx_spxlh_qhnums_xxl li').die().live('click',function(){
					if($(this).attr('typeid')==0){
						$('.kccx_xlh_nums_xxl').html(zk_list.length)
					}else{
						$('.kccx_xlh_nums_xxl').html(ck_list.length)
					}
				})
				if(pzsp_zklist.length==0){
					$('.kccx_pzsp_ckxlh_listhtml_xxl').html('');
					pzsp_zkerr +='<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
					$('.kccx_pzsp_ckxlh_errhtml_xxl').html(pzsp_zkerr)
					$('.kccx_pzsp_ckxlh_nums_xxl').html('0')
				}else{
					$('.kccx_pzsp_ckxlh_errhtml_xxl').html('');
					$('.kccx_pzsp_ckxlh_nums_xxl').html(pzsp_zklist.length)
					$.each(pzsp_zklist, function(i,v) {
						pzsp_zkhtml +='<tr>';
                        pzsp_zkhtml +='<td>'+likNullData(v.sn)+'</td>';               
                        pzsp_zkhtml +='<td>'+likNullData(v.input_name)+'</td>';               
                        pzsp_zkhtml +='<td>'+likNullData(v.create_time)+'</td></tr>';               
					});
					$('.kccx_pzsp_ckxlh_listhtml_xxl').html(pzsp_zkhtml);
				}
				if(zk_list.length==0){
					$('.kccx_xlh_splist_zaikuhtml_xxl').html('');
					zk_err +='<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
					$('.kccx_xlh_zaiku_errhtml_xxl').html(zk_err)
				}else{
					$('.kccx_xlh_zaiku_errhtml_xxl').html('');
					$('.kccx_xlh_nums_xxl').html(zk_list.length)
					$.each(zk_list, function(i,v) {
						zk_html +='<tr>';
                        zk_html +='<td>'+likNullData(v.sn)+'</td>';               
                        zk_html +='<td>'+likNullData(v.serial_number)+'</td>';                
                        zk_html +='<td>'+likNullData(v.input_name)+'</td>';               
                        zk_html +='<td>'+likNullData(v.create_time)+'</td></tr>';               
					});
					$('.kccx_xlh_splist_zaikuhtml_xxl').html(zk_html);
				}
				if(ck_list.length==0){
					$('.kccx_xlh_splist_chukuhtml_xxl').html('');
					ck_errs +='<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
					$('.kccx_xlh_chuku_errhtml_xxl').html(ck_errs)
				}else{
					$('.kccx_xlh_chuku_errhtml_xxl').html('');
					//$('.kccx_xlh_nums_xxl').html(ck_list.length)
					$.each(ck_list, function(i,v) {
						ck_html +='<tr>';
                        ck_html +='<td>'+likNullData(v.sn)+'</td>';               
                        ck_html +='<td>'+likNullData(v.serial_number)+'</td>';                
                        ck_html +='<td>'+likNullData(v.output_name)+'</td>';               
                        ck_html +='<td>'+likNullData(v.create_time)+'</td></tr>';               
					});
					$('.kccx_xlh_splist_chukuhtml_xxl').html(ck_html);
				}
				if(ck_list.length>=6 ||zk_list.length>=6 ||pzsp_zklist.length>=6){
					$('.tanceng .dialog_content_b').css('height','90%');
				}
			}
		},
		error:function(e){
			$('.kccx_xlh_splist_zaikuhtml_xxl').html('');
					zk_err +='<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
					$('.kccx_xlh_zaiku_errhtml_xxl').html(zk_err);
					$('.kccx_xlh_splist_chukuhtml_xxl').html('');
					ck_errs +='<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
					$('.kccx_xlh_chuku_errhtml_xxl').html(ck_errs)
					$('.kccx_pzsp_ckxlh_listhtml_xxl').html('');
					pzsp_zkerr +='<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
					$('.kccx_pzsp_ckxlh_errhtml_xxl').html(pzsp_zkerr)
		}
	});
}
$('.kccx_spkfxq_snbtn_xxl').die().live('click',function(){
	kccx_xlh_data.id = $(this).attr('uid');//
	kccx_xlh_data.category = '1';
	kccx_xlh_data.type = '0';
	kccx_xlh_ajax();
})
$('.kccx_pzsp_xlh_btnxxl').die().live('click',function(){
	kccx_xlh_data.id = $(this).attr('uid');
	kccx_xlh_data.category = '2';
	kccx_xlh_data.type = '1';
	kccx_xlh_ajax();
})

//库房分布
var sp_kffb_data = {
	token:token,
	id:'',
	warehouse_id:''//库房ID
}
function sp_kffb_ajax(){
	$.ajax({
		type:"get",
		url:SERVER_URL+"warehouse/numbyproid",
		data:sp_kffb_data,
		dataType:'json',
		success:function(data){
			if(data.code!=0){
				console.log(data)
				$('.kccx_sp_kffb_listhtml_xxl').html('') 
				$('.kccx_sp_kgcl_errhtml_xxl').html('<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>') 
			}else{
				console.log(data)
				$('.kccx_sp_kgcl_errhtml_xxl').html('')
				var kffb_list = data['data'],kffb_html='';
				kffb_html +='<thead>';
                kffb_html +='<tr><th>商品编号</th><th>商品名称</th><th>基本单位</th><th>属性</th>';
                $.each(kffb_list.warehouseList, function(i,v) {
                	 kffb_html +='<th>'+v.name+'</th>';
                });
               	  kffb_html +='</tr></thead><tbody><tr>';          
                kffb_html +='<td>'+likNullData(kffb_list.code_sn)+'</td>';               
                kffb_html +='<td>'+likNullData(kffb_list.product_name)+'</td>';                
                kffb_html +='<td>'+likNullData(kffb_list.unit_name)+'</td>';                
                //kffb_html +='<td>'+likNullData(kffb_list.format)+'</td>';               
                kffb_html +='<td>'+likNullData(kffb_list.attr_name)+'</td>';
                //kffb_html +='<td>'+likNullData(v.num)+'</td></tr></tbody>'; 
                $.each(kffb_list.warehouseList, function(i,v) {
                	kffb_html +='<td>'+likNullData(v.num)+'</td>';  
                });
                kffb_html +='</tr></tbody>';
                $('.kccx_sp_kffb_listhtml_xxl').html(kffb_html)              
			}
		},
		error:function(e){
			console.log(e)
			$('.kccx_sp_kffb_listhtml_xxl').html('') 
			$('.kccx_sp_kgcl_errhtml_xxl').html('<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>') 
		}
	});
}
$('.kccx_kffb_btn_xxl').die().live('click',function(){
	sp_kffb_data.id = $(this).attr('uid');
	sp_kffb_ajax()
})
//配置商品
var kccx_peizhisp_list_data = {
	token:token,
	page:page,
	num:num,
	key:'',
	cate_id:'',//分类ID
	status:''//启用状态 0正常 1关闭
}
function kccx_peizhisp_list_ajax(){
	$.ajax({
		type:"get",
		url:SERVER_URL+"warehouse/setprolist",
		data:kccx_peizhisp_list_data,
		dataType:'json',
		success:function(data){
			if(data.code!=0){
				console.log(data)
				$('.kccx_pzsp_table_xxl').html('');
					$('.kccx_fenye_peizhitwo_xxl').css('display','none');
					$('.kccx_pzsp_taberrhtml_xxl').css('display','block');
			}else{
				console.log(data)
				$('.kccx_listmain_nums_xxl').html(data.data.totalcount)
				var pzlist = data.data.datalist,pz_html='';
				if(pzlist.length==0){
					$('.kccx_pzsp_table_xxl').html('');
					$('.kccx_fenye_peizhitwo_xxl').css('display','none');
					$('.kccx_pzsp_taberrhtml_xxl').css('display','block');
					
				}else{
					$('.kccx_fenye_peizhitwo_xxl').css('display','block');
					$('.kccx_pzsp_taberrhtml_xxl').css('display','none');
					$.each(pzlist, function(i,v) {
						if(v.status==1){
							pz_html +='<tr class="grey">';
                            pz_html +='<td><span class="voidIcon">已停用</span></td>';   
                            pz_html +='<td>'+likNullData(v.code_sn)+'</td>';    
                            pz_html +='<td>'+likNullData(v.name)+'</td>';    
                            //pz_html +='<td>'+likNullData(v.format)+'</td>';    
                            pz_html +='<td>'+likNullData(v.attr_name)+'</td>';    
                            pz_html +='<td>'+likNullData(v.unit_name)+'</td>';    
                            pz_html +='<td>'+likNullData(v.stockingInNum)+'</td><td></td></tr>';    
						}else{
							pz_html +='<tr><td>'+Appendzero(i+1)+'</td>';
                            pz_html +='<td>'+likNullData(v.code_sn)+'</td>';    
                            pz_html +='<td>'+likNullData(v.name)+'</td>';    
                            //pz_html +='<td>'+likNullData(v.format)+'</td>';    
                            pz_html +='<td>'+likNullData(v.attr_name)+'</td>';    
                            pz_html +='<td>'+likNullData(v.unit_name)+'</td>';   
                            pz_html +='<td>'+likNullData(v.stockingInNum)+'</td>';   
                            pz_html +='<td><button class="but_mix but_look val_dialog kccx_pzsp_ckbtn_xxl" name="crk_kfcl_kfclxq_pz" uid="'+v.id+'">查看</button><button class="but_mix but_look val_dialog kccx_pzsp_kffb_btnxxl" name="crk_kfcl_kfclLook_pz" uid="'+v.id+'">库房分布</button></td></tr>';    
						}
					});
					$('.kccx_pzsp_table_xxl').html(pz_html);
					list_table_render_pagination(".kccx_fenye_peizhitwo_xxl", kccx_peizhisp_list_data, kccx_peizhisp_list_ajax, data.data.totalcount, pzlist.length);
				}
			}
		},
		error:function(e){
			$('.kccx_pzsp_table_xxl').html('');
					$('.kccx_fenye_peizhitwo_xxl').css('display','none');
					$('.kccx_pzsp_taberrhtml_xxl').css('display','block');
		}
	});
}

//配置商品库存明细
var pzsp_ck_data = {
	token:token,
	id:'',
	detail:'1'
}
function pzsp_ck_ajax(){
	$.ajax({
		type:"get",
		url:SERVER_URL+"warehouse/infobysetproid",
		data:pzsp_ck_data,
		dataType:'json',
		success:function(data){
			if(data.code!=0){
				console.log(data)
			}else{
				console.log(data);
				var dlist = data.dataList.productInfo,
					sx_list = '',
					datanums = data['dataList'],
					crkd_html = '',
					crkd_list = data.dataList.list;
					$('.kccx_pzsp_ckxq_mc_xxl').html(dlist.name);
				$('.kccx_pzsp_spbh_xxl').html(dlist.code_sn);
				$('.kccx_pzsp_xlh_btnxxl').attr('uid', dlist.id);
				//$('.kccx_pzsp_ggs_xxl').html(dlist.format);
				$('.kccx_pzsp_sx_xxl').html(dlist.attr_name);
				$('.kccx_pzsp_beizhu_xxl').val('备注：' + dlist.remark);
				var Height = $('.tanceng .pro_look_img_btn[name="cru_sp_ck_img_look1"]').height();
				var Width = $('.tanceng .pro_look_img_btn[name="cru_sp_ck_img_look1"]').width();
				if(dlist.img_url==''||dlist.img_url==null||dlist.img_url==undefined){
					$('.tanceng .pro_goods_list_detail_img_num_total').html('0');
					$('.tanceng .pro_look_img_btn').removeClass('val_dialogTop');
					$('.tanceng .kccx_pzsp_cpimg_xxl').attr('src','static/images/error_xxl.png');
					setImg($('.tanceng .kccx_pzsp_cpimg_xxl'), Height, Width);
				}else{
					$('.tanceng .pro_look_img_btn').addClass('val_dialogTop');
					$('.tanceng .image_box_content_img').attr('src','');
					var imgarr = dlist.img_url.split(',');
					$('.tanceng .kccx_pzsp_cpimg_xxl').attr('src', getImgUrl(imgarr[0]));
					setImg($('.tanceng .kccx_pzsp_cpimg_xxl'), Height, Width);
					if (imgarr) {
       $('.tanceng .pro_goods_list_detail_img_num_total').html(imgarr.length);
     $('.pro_look_img_btn').live('click', function () {
     	$('.tanceng .image_box_content_img').attr('src', '');
            var goods_arr = imgarr;
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
         });
     };
				}
				
				$(".tanceng .kccx_pzsp_cpimg_xxl").error(function(e) { //加入相应的图片类名
					$(this).attr("src", "static/images/error_xxl.png");
				});
				
				$('.tanceng .kccx_pzsp_dqkc_nums_xxl').html(parseInt(datanums.qichuNum + datanums.stockInNum)-datanums.stockOutNum);
				$('.tanceng .kccx_pzsp_zhejdairksl_xxl').html(datanums.stockingInNum);
				$('.tanceng .kccx_pzsp_zhejidaichukusl_xxl').html(datanums.stockingOutNum);
				
				if(crkd_list.length == 0) {
					$('.kccx_pzsp_tablist_htmlxxl').html('');
					var crkd_err = '';
					crkd_err += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
					$('.kccx_pzsp_taberr_htmlxxl').html(crkd_err);
				} else {
					$('.kccx_pzsp_taberr_htmlxxl').html('');
					$.each(crkd_list, function(i, v) {
						crkd_html += '<tr>';
						crkd_html += '<td>' + Appendzero(i + 1) + '</td>';
						crkd_html += '<td>' + likNullData(v.create_time.substr(0,10)) + '</td>';
						crkd_html += '<td>' + likNullData(v.number) + '</td>';
						crkd_html += '<td>' + likNullData(v.warehouse_name) + '</td>';
						if(v.cate == 1) {
							if(v.input_type == 1) {
								crkd_html += '<td>销售退货</td>';
							} else if(v.input_type == 2) {
								crkd_html += '<td>采购入库</td>';
							} else if(v.input_type == 3) {
								crkd_html += '<td>调拨</td>';
							} else if(v.input_type == 4) {
								crkd_html += '<td>借入</td>';
							} else if(v.input_type == 5) {
								crkd_html += '<td>借出归还</td>';
							} else {
								crkd_html += '<td>换货入库</td>';
							}
						} else {
							if(v.input_type == 1) {
								crkd_html += '<td>销售出库</td>';
							} else if(v.input_type == 2) {
								crkd_html += '<td>采购退货</td>';
							} else if(v.input_type == 3) {
								crkd_html += '<td>调拨</td>';
							} else if(v.input_type == 4) {
								crkd_html += '<td>借出</td>';
							} else if(v.input_type == 5) {
								crkd_html += '<td>借入归还</td>';
							} else {
								crkd_html += '<td>换货出库</td>';
							}
						}
						crkd_html += '<td>' + likNullData(v.related_receipts_no) + '</td>';
						crkd_html += '<td>-</td>';
						if(v.cate == 1) {
							crkd_html += '<td>-</td>';
							crkd_html += '<td>' + likNullData(v.distribution_num) + '</td></tr>';
						} else {
							crkd_html += '<td>' + likNullData(v.distribution_num) + '</td>';
							crkd_html += '<td>-</td></tr>';
						}

					});
					$('.kccx_pzsp_tablist_htmlxxl').html(crkd_html);
				}
			}
		},
		error:function(e){
			console.log(e)
		}
	});
}
$('.kccx_pzsp_ckbtn_xxl').die().live('click',function(){
	pzsp_ck_data.id = $(this).attr('uid');
	pzsp_ck_ajax()
})

//ss
function kccx_pzsp_crdss_now(val){
	var kc_tit = $('.kccx_pzsp_crdvalue_xxl').val();
	if(kc_tit == '' || kc_tit == '出入库单号/关联业务单号') {
		$('.kccx_pzsp_tablist_htmlxxl tr').show();
		//$('.kccx_pzsp_taberr_htmlxxl').html('');
		pzsp_ck_ajax();
	} else {
		$(".tanceng .kccx_pzsp_tablist_htmlxxl tr").hide().filter(":contains('" + (val) + "')").show().addClass('shownow');//.siblings()
		if($('.tanceng .kccx_pzsp_tablist_htmlxxl tr.shownow').length==0){
			$('.kccx_pzsp_tablist_htmlxxl').html('');
			$('.tanceng .kccx_pzsp_taberr_htmlxxl').html('<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>');
		}else{
			$('.tanceng .kccx_pzsp_taberr_htmlxxl').html('');
			
		}
//		$('.kccx_pzsp_tablist_htmlxxl tr').each(function() {
//			var spbh_kc = $(this).children().eq(2).html();
//			var mc_kc = $(this).children().eq(5).html();
//			if(spbh_kc.indexOf(kc_tit) != -1 || mc_kc.indexOf(kc_tit) != -1) {
//				$('.kccx_pzsp_taberr_htmlxxl').html('');
//				$(this).show()
//			} else {
//				$(this).hide()
//				$('.kccx_pzsp_tablist_htmlxxl tr').hide();
//				$('.kccx_pzsp_taberr_htmlxxl').html('<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>');
//			}
//		})

	}
}
$('.kccx_pzsp_sscrd_btnxxl').die().live('click',function(){
	if($('.kccx_pzsp_crdvalue_xxl').val()==''||$('.kccx_pzsp_crdvalue_xxl').val()=='出入库单号/关联业务单号'){
		return false;
	}else{
		$('.kccx_pzsp_tablist_htmlxxl tr').each(function() {
			var spbh_kc = $(this).children().eq(2).html();
			var mc_kc = $(this).children().eq(5).html();
			if(spbh_kc.indexOf(kc_tit) != -1 || mc_kc.indexOf(kc_tit) != -1) {
				$('.kccx_pzsp_taberr_htmlxxl').html('');
				$(this).show()
			} else {
				$(this).hide()
				$('.kccx_pzsp_tablist_htmlxxl tr').hide();
				$('.kccx_pzsp_taberr_htmlxxl').html('<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>');
			}
		})
	}
})
//配置商品库房分布
var pzsp_kffb_data = {
	token:token,
	id:'',
	warehouse_id:''
}
function pzsp_kffb_ajax(){
	$.ajax({
		type:"get",
		url:SERVER_URL+"warehouse/numbysetproid",
		data:pzsp_kffb_data,
		dataType:'json',
		success:function(data){
			if(data.code!=0){
				console.log(data)
				 $('.kccx_pzsp_kffbhtml_xxl').html('') 
				$('.kccx_pzsp_kffberr_htmlxxl').html('<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>') 
			}else{
				console.log(data)
				$('.kccx_pzsp_kffberr_htmlxxl').html('')
				var kffb_list = data['data'],kffb_html='';
				kffb_html +='<thead>';
                kffb_html +='<tr><th>商品编号</th><th>商品名称</th><th>基本单位</th><th>属性</th>';
                $.each(kffb_list.warehouseList, function(i,v) {
                	 kffb_html +='<th>'+v.name+'</th>';
                });
               	kffb_html +='</tr></thead><tbody><tr>';          
                kffb_html +='<td>'+likNullData(kffb_list.code_sn)+'</td>';               
                kffb_html +='<td>'+likNullData(kffb_list.product_name)+'</td>';                
                kffb_html +='<td>'+likNullData(kffb_list.unit_name)+'</td>';                
                //kffb_html +='<td>'+likNullData(kffb_list.format)+'</td>';               
                kffb_html +='<td>'+likNullData(kffb_list.attr_name)+'</td>';
                //kffb_html +='<td>'+likNullData(v.num)+'</td></tr></tbody>'; 
                $.each(kffb_list.warehouseList, function(i,v) {
                	kffb_html +='<td>'+likNullData(v.num)+'</td>';  
                });
                kffb_html +='</tr></tbody>';
                $('.kccx_pzsp_kffbhtml_xxl').html(kffb_html) 
			}
		},
		error:function(e){
			console.log(e)
			 $('.kccx_pzsp_kffbhtml_xxl').html('') 
				$('.kccx_pzsp_kffberr_htmlxxl').html('<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>') 
		}
	});
}
$('.kccx_pzsp_kffb_btnxxl').die().live('click',function(){
	pzsp_kffb_data.id = $(this).attr('uid');
	pzsp_kffb_ajax()
})




//});


























