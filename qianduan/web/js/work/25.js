//工作 
// 默认测试账号 15900000001	tekon:2016121416190312079
//审批 ID：25
//SERVER_URL = 'http://192.168.0.167:9091/';
var token, uid, page, limit;
token = Admin.get_token();
uid = Admin.get_uid();
//token='2017021311542463002';
//SERVER_URL = 'http://192.168.0.167:9010/';

//uid = 1;
page = 1;
limit = 10;
var dwsp_data_list = {
	token: token,
	uid: uid,
	page: '1',
	limit: '10',
	title:'',//搜索-审批名称
	type_id:''//分类id(1请假,2出差,3外出,4报销,5借款,6付款,7,招聘,8离职,9转正,10,调薪,11,办公采购,12物品领用,13公章,14合同,15普通审批)
}
var xs_dwsp_data = {
	token:token,
	ids:'',
	type:'1',
	page: '1',
	limit: '10'
}
if ($('#left_button_25').attr('fromnotice') == 1) { // 当前是从消息过来的
    var curId = $('#left_button_25').attr('detailid');
    xs_dwsp_data.ids=curId;
  xx_dwspajax(); 
  setTimeout(function(){
                //$('.tabtitle li').eq(i).trigger('click'); // 触发相应子模块事件
                $('#left_button_25').attr({	 // 清空按钮的属性
                    'fromnotice': '',
                    'detailid': '',
                    'secondmenu': '',
                    'totable': ''
                });
            },100);

} else { // 当前不是从消息过来的，正常调取整个列表
    dwsp_ajax_xxl()
}
function xx_dwspajax() {
	$.ajax({
		type: "post",
		url: SERVER_URL + "work/get-message",
		dataType: 'json',
		data: xs_dwsp_data,
		success: function(data) {
			if(data.code != 0) {
				console.log(data);
				var dwsp_err = '';
				dwsp_err += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
				$('.dwsp_err_html').html(dwsp_err);
				$('.dwsp_fenye_xxl').css('display', 'none');
				$('.dwsp_html_xxl').html('');
			} else {
				console.log(data)
				var mlists = data.data;
				//console.log(mlists)
				if(mlists.length == 0) {
					$('.dwsp_html_xxl').html('');
					var dwsp_err = '';
					dwsp_err += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
					$('.dwsp_err_html').html(dwsp_err);
					$('.dwsp_fenye_xxl').css('display', 'none');
				} else {
					$('.dwsp_err_html').html('');
					$('.dwsp_fenye_xxl').css('display', 'block');
					var xxlfo = '',
						reg = /&lt;br&gt;/g;
					$.each(mlists, function(i, v) {
						xxlfo += '<tr><td>' + likNullData(v.title) + '</td>';
						xxlfo += '<td>' + likNullData((v.content).replace(reg, '<br/>')) + '</td>';
						xxlfo += '<td>' + likNullData(v.leixing) + '</td>';
						xxlfo += '<td>' + likNullData(v.faqiren) + '</td>';
						xxlfo += '<td>' + likNullData(v.start_time) + '</td>';
						xxlfo += '<td>' + likNullData(v.end_time) + '</td>';
						if(v.approval_status == 1) {
							xxlfo += '<td><span class="c_y">审批中</span></td>';
						} else if(v.approval_status == 2) {
							xxlfo += '<td><span class="c_g">已完成</span></td>';
						} else if(v.approval_status == 3){
							xxlfo += '<td><span class="c_r">已拒绝</span></td>';
						}else{
							xxlfo += '<td><span class="c_r">已撤回</span></td>';
						}
						xxlfo += '<td><button class="but_mix but_look r_sidebar_btn but_look work_dwsp_ckbtn_xxl" name="work_dwsp_ck" myid="' + v.work_id + '" uid="'+v.uid+'" typeid="'+v.type_id+'">查看</button></td></tr>';
					});

					$('.dwsp_html_xxl').html(xxlfo);
					list_table_render_pagination(".dwsp_fenye_xxl", dwsp_data_list, dwsp_ajax_xxl, data["totalcount"], mlists.length)
				}

			}
		},
		error: function(e) {
			console.log(e)
			var dwsp_err = '';
			dwsp_err += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
			$('.dwsp_err_html').html(dwsp_err);
			$('.dwsp_fenye_xxl').css('display', 'none');
		}

	});
}

function dwsp_ajax_xxl() {
	$.ajax({
		type: "post",
		url: SERVER_URL + "work/list",
		dataType: 'json',
		data: dwsp_data_list,
		success: function(data) {
			if(data.code != 0) {
				console.log(data);
				var dwsp_err = '';
				dwsp_err += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
				$('.dwsp_err_html').html(dwsp_err);
				$('.dwsp_fenye_xxl').css('display', 'none');
				$('.dwsp_html_xxl').html('');
			} else {
				console.log(data)
				var mlists = data.data;
				//console.log(mlists)
				if(mlists.length == 0) {
					$('.dwsp_html_xxl').html('');
					var dwsp_err = '';
					dwsp_err += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
					$('.dwsp_err_html').html(dwsp_err);
					$('.dwsp_fenye_xxl').css('display', 'none');
				} else {
					$('.dwsp_err_html').html('');
					$('.dwsp_fenye_xxl').css('display', 'block');
					var xxlfo = '',
						reg = /&lt;br&gt;/g;
					$.each(mlists, function(i, v) {
						xxlfo += '<tr><td>' + likNullData(v.title) + '</td>';
						xxlfo += '<td>' + likNullData((v.content).replace(reg, '<br/>')) + '</td>';
						xxlfo += '<td>' + likNullData(v.leixing) + '</td>';
						xxlfo += '<td>' + likNullData(v.faqiren) + '</td>';
						xxlfo += '<td>' + likNullData(v.start_time) + '</td>';
						xxlfo += '<td>' + likNullData(v.end_time) + '</td>';
						if(v.approval_status == 1) {
							xxlfo += '<td><span class="c_y">审批中</span></td>';
						} else if(v.approval_status == 2) {
							xxlfo += '<td><span class="c_g">已完成</span></td>';
						} else if(v.approval_status == 3){
							xxlfo += '<td><span class="c_r">已拒绝</span></td>';
						}else{
							xxlfo += '<td><span class="c_r">已撤回</span></td>';
						}
						xxlfo += '<td><button class="but_mix but_look r_sidebar_btn but_look work_dwsp_ckbtn_xxl" name="work_dwsp_ck" myid="' + v.work_id + '" uid="'+v.uid+'" typeid="'+v.type_id+'">查看</button></td></tr>';
					});

					$('.dwsp_html_xxl').html(xxlfo);
					list_table_render_pagination(".dwsp_fenye_xxl", dwsp_data_list, dwsp_ajax_xxl, data["totalcount"], mlists.length)
				}

			}
		},
		error: function(e) {
			console.log(e)
			var dwsp_err = '';
			dwsp_err += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
			$('.dwsp_err_html').html(dwsp_err);
			$('.dwsp_fenye_xxl').css('display', 'none');
		}

	});
}

//搜索
//function wk_dwsp_sousuo_nowxxl(val) {
//	//console.log(val)
//	dwsp_data_list.title = val;
//	dwsp_ajax_xxl()
//}
$('.wk_dwsp_ssbtn_xxl').die().live('click',function(){
	if($('.wk_dwsp_ssvalue_xxl').val()==''||$('.wk_dwsp_ssvalue_xxl').val()=='搜索审批名称'){
		dwsp_data_list.title ='';
	}else{
		dwsp_data_list.title = $('.wk_dwsp_ssvalue_xxl').val();
		
	}
	dwsp_ajax_xxl()
})
$('.dwsp_splx li').die().live('click',function(){
	$('.dwsp_splx_valuexxl').val($(this).text()).addClass('c_3');
	//console.log($(this).attr('typeid'))
	dwsp_data_list.type_id = $(this).attr('typeid');
	dwsp_ajax_xxl()
})
	//查看审批详情
var work_dwsp_ck_data = {
	token:token,
	uid:'',
	work_id:'',
	type_id:''
}
$('.work_dwsp_ckbtn_xxl').die().live('click', function() {
	work_dwsp_ck_data.uid = $(this).attr('uid')
	work_dwsp_ck_data.work_id = $(this).attr('myid');
	work_dwsp_ck_data.type_id = $(this).attr('typeid');
	//console.log(work_dwsp_ck_data)
	work_ckshow();
})

function work_ckshow() {
	$.ajax({
		type: "post",
		url: SERVER_URL + "work/get-info",
		dataType: 'json',
		data:work_dwsp_ck_data ,
		success: function(data) {
			if(data.code != 0) {
				console.log(data)
			} else {
				console.log(data)
				var xqlist = data['data'];
				var mx_list2 = '';
				$('.wk_dwsp_tit_xxl').html(xqlist.title);
				$('.wk_dwsp_ck_fqr_xxl').html(xqlist.faqiren);
				$('.wk_dwsp_tongguo_btnxxl').attr({'sid':2,'wid':xqlist.work_id})
				$('.wk_dwsp_jujue_btn_xxl').attr({'sid':3,'wid':xqlist.work_id})
				if(xqlist.approval_status==1){
					$('.wk_ck_spzt_titxxl').html('等待我审批')
				}else if(xqlist.approval_status==2){
					$('.wk_ck_spzt_titxxl').html('审批通过')
				}else{
					$('.wk_ck_spzt_titxxl').html('审批未通过')
				}
				if(xqlist.headpic==''||xqlist.headpic==null){
					$('.wk_ck_fqrtx_xxlimg').attr('src','static/images/touxiang.png')
				}else{
					$('.wk_ck_fqrtx_xxlimg').attr('src',getImgUrl(xqlist.headpic))
				}
				//$('.wk_ck_fqrtx_xxlimg').attr('src',xqlist.headpic)
				$.each(xqlist.allcontent, function(i,v) {
					if(v.detail!=null){
						var mx_list = '';
						$.each(v.detail, function(i,v) {
							mx_list +='<div class="right_sidebar_cont3 work_right_sidebar_cont3"><div class="work_fqrw_zrw_bt"><h3 class="inline_block cont_title ">'+likNullData(xqlist.mingxi)+'<span class="c_r">('+(i+1)+')</span></h3></div></div>';
							mx_list +='<div class="right_sidebar_cont3_1">';
							$.each(v, function(i,v1) {
								//console.log(v1.title+':'+v1.value)
                				mx_list +='<p>'+likNullData(v1.title)+'：<span class="m_left_5" style="color: #000;">'+v1.value+'</span></p>';
							});
							mx_list +='</div>';
						});
						$('.wk_ck_mxlist_html_xxl').html(mx_list)
					}else{
						if(v.title=="图片"){
							mx_list2 +='<p class="work_sp_tp">';
                			if(v.value==null){
                				return false;
                			}
                			var arrimg = v.value.split(','),imghtml='';
                			$.each(arrimg, function(i,v) {
                				imghtml +='<img class="inline_block val_dialog work_inlin_blockimg wk_ck_dwspcontent_xxlimg_err" name="work_dwsp_img" src="'+getImgUrl(v)+'">';
                			});
                			mx_list2 +='<span>'+likNullData(v.title)+':</span><span class="c_3 m_left_5">'+imghtml+'</span></p>';
						}else if(v.title=="附件"){
							if(v.value==null||v.value==undefined||v.value==''){
								mx_list2 +='<span>'+likNullData(v.title)+':</span><span class="c_3 m_left_5">-</span></p>';
							}else{
								mx_list2 +='<span>'+likNullData(v.title)+':</span><span class="c_3 m_left_5"><a href="#" paths="'+SERVER_URL+''+v.value+'" class="dwsp_ckxqfujian_xiazaibtnxxl">'+v.value+'</a></span></p>';
							}
						}else{
							mx_list2 +='<p>'+likNullData(v.title)+'：<span class="m_left_5" style="color: #000;">'+likNullData(v.value)+'</span></p>';
						}
						$('.wk_ck_list_htmltwo_xxl').html(mx_list2)
					}
				});
				
				if(xqlist.approval_people.length == 0) {
					$('.gzfqdrw_ckspyj_listxxl').html('')
				} else {
					var fbyj_listhtml = '';
					fbyj_listhtml +='<div class="sq_look_check_box">';
					fbyj_listhtml +='<div class="xs_sp_result"><h3 class="cont_title" style="margin-left: 36px;">审批结果</h3></div>';
                    fbyj_listhtml +='<div class="work_spiliubox" style="margin-top:0;background: #fff;">';
                    $.each(xqlist.approval_people, function(i,v) {
                    	fbyj_listhtml +='<div class="work_spiliu">';
                        fbyj_listhtml +='<div class="work_spiliu_items" style="overflow: hidden;">';    
                        fbyj_listhtml +='<div class="left" style="position: relative;">';        
                        fbyj_listhtml +='<div class="work_spiliu_div">';            
                        fbyj_listhtml +='<img class="inline_block tx dwsp_yijlist_imgxxl" src="'+getImgUrl(v.headpic)+'">';//static/images/touxiang.png  
                        //if(v.uid == uid){
                        	//fbyj_listhtml +='<h3 class="work_sp_h3">我</h3>'; 
                       // }else{
                        	fbyj_listhtml +='<h3 class="work_sp_h3">'+likNullData(v.username)+'</h3>'; 
                        //}
                        if(xqlist.is_across==1){
                        	
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
                        	if(v.approval_status==1){
                        		fbyj_listhtml +='<cite class="b_y"></cite>';  	
                        	}else if(v.approval_status==3||v.approval_status==4){
                        		fbyj_listhtml +='<cite class="b_r"></cite>';  	
                        	}else if(v.approval_status==2){
                        		fbyj_listhtml +='<cite class="b_g"></cite>';
                        	}else if(v.approval_status==0){
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
                        	fbyj_listhtml +='<p class="c_9">'+likNullData(v.update_time)+'</p>';
                        	fbyj_listhtml +='</div>'; 
                        }else{
                        	if(v.approval_status==1){
                        		fbyj_listhtml +='<h3 class="c_y">审批中</h3>'; 
                        		fbyj_listhtml +='</div>'; 
                        	}else if(v.approval_status==3){
                        		fbyj_listhtml +='<h3 class="c_r">未通过</h3>'; 
                        		fbyj_listhtml +='<p class="c_9">'+likNullData(v.update_time)+'</p>'; 
                        		fbyj_listhtml +='</div>'; 
                        		fbyj_listhtml +='<p class="c_3 work_sp_p">'+likNullData(v.note)+'</p>';
                        	}else if(v.approval_status==2){
                        		fbyj_listhtml +='<h3 class="c_g">通过审批</h3>'; 
                        		fbyj_listhtml +='<p class="c_9">'+likNullData(v.update_time)+'</p>'; 
                        		fbyj_listhtml +='</div>'; 
                        		fbyj_listhtml +='<p class="c_3 work_sp_p">'+likNullData(v.note)+'</p>';
                        	}else if(v.approval_status==0){
                        		fbyj_listhtml +='<h3 class="c_c">待审批</h3>'; 
                        		fbyj_listhtml +='</div>'; 
                        	}else if(v.approval_status==4){
                        		fbyj_listhtml +='<h3 class="c_r">已撤回</h3>'; 
                        		//fbyj_listhtml +='<p class="c_9">'+likNullData(v.update_time.substr(0,10))+'</p>'; 
                        		fbyj_listhtml +='</div>';
                        		//fbyj_listhtml +='<p class="c_3 work_sp_p">'+likNullData(v.note)+'</p>';
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
//					$.each(xqlist.approval_people, function(i, v) {
//						fbyj_listhtmls += ' <div class="work_spiliu"><div class="work_spiliu_items"><div class="left" style="position: relative;">';
//						if(v.update_time==null||v.update_time==''){
//							
//						}else{
//							v.update_time = v.update_time.substr(0,16)
//						}
//						if(v.uid == uid) {
//							fbyj_listhtmls += '<img class="inline_block tx dwsp_yijlist_imgxxl" src="' + v.headpic + '"><cite class="b_h"></cite></div>';
//							fbyj_listhtmls += '<div class="right auto_height"><img src="static/images/work_jiantou.png"><div class="sp_cont">';
//							fbyj_listhtmls += '<div><h3 class="c_3">我</h3><span class="c_9 m_left_5">' + likNullData(v.update_time) + '</span></div>';
//						} else {
//							fbyj_listhtmls += '<img class="inline_block tx dwsp_yijlist_imgxxl" src="' + v.headpic + '"><cite class="b_y"></cite></div>';
//							fbyj_listhtmls += '<div class="right auto_height" ><img src="static/images/work_jiantou.png"><div class="sp_cont">';
//							fbyj_listhtmls += '<div><h3 class="c_3">' + likNullData(v.username) + '</h3><span class="c_9 m_left_5">' + likNullData(v.update_time) + '</span></div>';
//						}
//						if(i == 0) {
//							fbyj_listhtmls += '<h3 class=" f_color">发起审批</h3>';
//						} else {
//							if(v.approval_status == 1) {
//								fbyj_listhtmls += '<h3 class="c_b" style="color:#f8ac59;">进行中</h3>'
//							} else if(v.approval_status == 3) {
//								fbyj_listhtmls += '<h3 class="c_r" style="color:#ff6c60;">未通过</h3>'
//							} else {
//								fbyj_listhtmls += '<h3 class="c_g">通过审批</h3>'
//							}
//
//						}
//						fbyj_listhtmls += '<p class="c_3 work_sp_p">' + likNullData(v.note) + '</p></div></div><div style="clear: both;height: 0;font-size: 1px;line-height: 0px;"></div></div></div>'
//					});
					$('.gzfqdrw_ckspyj_listxxl').html(fbyj_listhtml)
				}
				
			}
			$(".dwsp_yijlist_imgxxl").error(function(e) { //加入相应的图片类名
				$(this).attr("src", "static/images/touxiang.png");
			});
			$(".wk_ck_fqrtx_xxlimg").error(function(e) { //加入相应的图片类名
				$(this).attr("src", "static/images/touxiang.png");
			});
			$(".wk_ck_dwspcontent_xxlimg_err").error(function(e) { //加入相应的图片类名
				$(this).attr("src", "static/images/error_xxl.png");
			});
		},
		error: function(e) {
			console.log(e)
		}
	});
}
$('.wk_ck_dwspcontent_xxlimg_err').die().live('click',function(){
	$('.tanceng .dwsp_bigimg_showxxl').attr('src',$(this).attr('src'))
})
//下载
$('.dwsp_ckxqfujian_xiazaibtnxxl').die().live('click',function(){
	if($(this).attr('paths')==''){
		alert('还没有附件哦')
		return false;
	}else{
		downloadFile($(this).attr('paths'));
	}
	
})
//点击刷新
$('.wk_dwsp_djsx_btn_xxl').die().live('click',function(){
	add_Rload_index(25,3)//参数页面值，父级值
})
//高级搜索
var dwsp_gjssdata_xxl = {
	token: token,
	type:'3',
	uid: uid
}
function dwsp_zkgjss_list() {
	$.ajax({
		type: "post",
		url: SERVER_URL + "work/send-people",
		data: dwsp_gjssdata_xxl,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg)
			} else {
				console.log(data)
				var data_list = data['data'];
				var str3 = '';
				$.each(data_list, function(i, v) {
					//console.log(i,v)
//					str += '<li>' + likNullData(v.title) + '</li>'
//					str1 += '<li>' + likNullData(v.content) + '</li>';
					//str2 += '<li>' + likNullData(v.leixing) + '</li>';
					str3 += '<li uid="'+v.uid+'">' + likNullData(v.username) + '</li>';
				});
//				$('.wk_dwsp_spmc_xxl').html(str);
//				$('.dwsp_spnr').html(str1)
				//$('.dwsp_splx').html(str2)
				$('.dwsp_fqr').html(str3)
					//限制字符个数
					//文字过长截取显示
				$(".select_list li").each(function() {
					var maxwidth = 10;
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

$('.dwsp_faqiren_valuexxl,.dwsp_faqiren_valuexxl+i').die().live('click',function(){
	dwsp_zkgjss_list()
})
$('.dwsp_fqr li').die().live('click',function(){
	$('.dwsp_faqiren_valuexxl').val($(this).text()).addClass('c_3');
	//console.log($(this).attr('typeid'))
	dwsp_data_list.faqiren = $(this).attr('uid');
	dwsp_ajax_xxl()
})
$(".select_list:not(.no_auto) li").die().live("click", function() {
	// 高级搜索输入框宽度自适应
	$(this).parents('div.select_p').css('minWidth', $(this).width() + 32)
});
//通过与拒绝
var wk_dwsp_passdata = {
	token:token,
	uid:uid,
	approval_status:'',
	work_id:'',
	note:''
}
$('.wk_dwsp_tongguo_btnxxl').die().live('click',function(){
	$('.wk_dwsp_spqueding_btn_xxl').attr({'uid':$(this).attr('wid'),'styid':'2'})
//	wk_dwsp_passdata.approval_status = '2';
//	wk_dwsp_passdata.work_id = $(this).attr('wid');
//	wk_dwsp_pass_ajax();
	
})
$('.wk_dwsp_jujue_btn_xxl').die().live('click',function(){
	$('.wk_dwsp_spqueding_btn_xxl').attr({'uid':$(this).attr('wid'),'styid':'3'})
//	$('.tanceng .wk_dwsp_yjhtml_xxl').html('审批拒绝')
//	wk_dwsp_passdata.approval_status = '3';
//	wk_dwsp_passdata.work_id = $(this).attr('wid');
//	wk_dwsp_pass_ajax();
	
})
$('.wk_dwsp_spqueding_btn_xxl').die().live('click',function(){
	if($('.dwsp_spyj_textarea_xxl').val()==''||$('.dwsp_spyj_textarea_xxl').val()=='请输入审批意见'){
		$('.dwsp_spyj_textarea_xxl').val('');
	}
	wk_dwsp_passdata.approval_status = $(this).attr('styid');
	wk_dwsp_passdata.work_id = $(this).attr('uid');
	wk_dwsp_passdata.note = $('.dwsp_spyj_textarea_xxl').val();
	wk_dwsp_pass_ajax();
	$(this).parent().parent().parent().remove();
        var num = $('.tanceng').children(".dialog_box").length;
        if (num < 1) {
            $(".tanceng").hide();
        }
	$('.wk_dwsp_ck_main_box_xxl').css('display','none')
})
function wk_dwsp_pass_ajax(){
	$.ajax({
		type:"post",
		url:SERVER_URL+"work/pass",
		data:wk_dwsp_passdata,
		dataType:'json',
		success:function(data){
			if(data.code!=0){
				console.log(data)
			}else{
				console.log(data)
				dwsp_ajax_xxl()
			}
		},
		error:function(data){
			console.log(data)
		}
	});
}







































