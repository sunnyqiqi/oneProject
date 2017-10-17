//工作 
// 默认测试账号 15900000001	tekon:2016121416190312079
//审批 ID：27
var token, uid, page, limit,username;
token = Admin.get_token();
uid = Admin.get_uid();
username = localStorage.getItem('username');
//token='2017021311542463002';
//SERVER_URL = 'http://192.168.0.167:9010/';
//uid = '1',
	page = 1;
limit = 10;
//username = '邢啸亮';
var wfqd_spdata_list_xxl = {
	token: token,
	page: page,
	limit: limit,
	uid: uid,
	status: '0',//1为审批中,2成功,3撤回,0为所有
	type_id:'',
	title:''
}

function wfqd_spajax_xxl() {
	$.ajax({
		type: "post",
		url: SERVER_URL + "work/my-send",
		data: wfqd_spdata_list_xxl,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg)
				var wfqd_err = '';
					wfqd_err += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
					$('.wfqd_errhtml_xxl').html(wfqd_err);
					$('.wfqd_fylist_xxl').css('display', 'none');
					$('#wfqd_html_list_xxl').html('');
			} else {
				console.log(data)
				var wfqdsplist = data.data;
				if(wfqdsplist.length == 0) {
					var wfqd_err = '';
					wfqd_err += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
					$('.wfqd_errhtml_xxl').html(wfqd_err);
					$('.wfqd_fylist_xxl').css('display', 'none');
					$('#wfqd_html_list_xxl').html('');
				} else {
					$('.wfqd_errhtml_xxl').html('');
					$('.wfqd_fylist_xxl').css('display', 'block');
					var wfqdhtml = '',reg = /&lt;br&gt;/g;
					$.each(wfqdsplist, function(i,v) {
						wfqdhtml +='<tr><td>' + likNullData(v.title) + '</td>';
						wfqdhtml +='<td>'+likNullData((v.content).replace(reg, '<br/>'))+'</td>';
						wfqdhtml += '<td>' + likNullData(v.leixing) + '</td>';
						wfqdhtml += '<td>' + likNullData(v.faqiren) + '</td>';
						wfqdhtml += '<td>' + likNullData(v.start_time) + '</td>';
						//wfqdhtml += '<td>' + likNullData(v.end_time) + '</td>';
						if(v.approval_status == 1) {
							wfqdhtml += '<td><span class="c_y">审批中</span></td>';
						} else if(v.approval_status == 2) {
							wfqdhtml += '<td><span class="c_g">已完成</span></td>';
						} else if(v.approval_status==3){
							wfqdhtml += '<td><span class="c_r">已拒绝</span></td>';
						}else{
							wfqdhtml += '<td><span class="c_c">已撤回</span></td>';
						}
						wfqdhtml += '<td><button class="but_mix but_look r_sidebar_btn but_look work_wfqds_ckbtn_xxl" name="work_wfqd_ck" myid="' + v.work_id + '" uid="'+v.uid+'" typeid="'+v.type_id+'">查看</button></td></tr>';
					});
					
					$('#wfqd_html_list_xxl').html(wfqdhtml);
					list_table_render_pagination(".wfqd_fylist_xxl", wfqd_spdata_list_xxl, wfqd_spajax_xxl, data["totalcount"], wfqdsplist.length)
				}
			}
		},
		error: function() {
			var wfqds_err = '';
			wfqds_err += '<div class="no_data_box"><div class="no_data"><p class="c_9">抱歉，没有找到相关内容！</p></div><div class="no_data_bottom"></div></div>';
			$('.wfqd_errhtml_xxl').html(wfqds_err);
			$('.wfqd_fylist_xxl').css('display', 'none');
		}

	})
}
wfqd_spajax_xxl()
//点击刷新
$('.wk_wfqd_djsx_btnxxl').die().live('click',function(){
	add_Rload_index(27,3)//参数页面值，父级值
})
	//列表切换
$('.wk_wfqd_main_listqiehuan_xxl li').die().live('click', function() {
		//console.log($(this).attr('statuid'))
		wfqd_spdata_list_xxl.title='';
		$('.wk_wfqd_ssvalue_xxl').val('搜索审批名称').css('color','rgb(204, 204, 204)');
		wfqd_spdata_list_xxl.status = $(this).attr('statuid'); 
		wfqd_spajax_xxl()
})
//搜索
//function wk_wfqd_sousuo_nowxxl(val) {
//	//console.log(val)
//	wfqd_spdata_list_xxl.title = val;
//	wfqd_spajax_xxl()
//}
$('.wk_wfqd_ssbtn_xxl').die().live('click',function(){
	if($('.wk_wfqd_ssvalue_xxl').val()==''||$('.wk_wfqd_ssvalue_xxl').val()=='搜索审批名称'){
		wfqd_spdata_list_xxl.title='';
	}else{
		wfqd_spdata_list_xxl.title = $('.wk_wfqd_ssvalue_xxl').val();
		
	}
	wfqd_spajax_xxl()
})
$('.wfqd_splx li').die().live('click',function(){
	$('.wfqd_splxvalue_xxl').val($(this).text()).addClass('c_3');
	//console.log($(this).attr('typeid'))
	wfqd_spdata_list_xxl.type_id = $(this).attr('typeid');
	wfqd_spajax_xxl()
})
//查看
var wfqd_ckdata_xxl = {
	token:token,
	uid:'',
	work_id:'',
	type_id:''
}
$('.work_wfqds_ckbtn_xxl').die().live('click',function(){
	wfqd_ckdata_xxl.uid = $(this).attr('uid');
	wfqd_ckdata_xxl.work_id = $(this).attr('myid');
	wfqd_ckdata_xxl.type_id = $(this).attr('typeid');
	wk_wfqds_ck_ajax()
})
function wk_wfqds_ck_ajax() {
	$.ajax({
		type: "post",
		url: SERVER_URL + "work/get-info",
		dataType: 'json',
		data:wfqd_ckdata_xxl ,
		success: function(data) {
			if(data.code != 0) {
				console.log(data)
			} else {
				console.log(data)
				var xqlist = data['data'];
				//$('.wk_wfqd_ck_chbtn_xxl').attr('wid',xqlist.work_id)
				var mx_list2 = '';
				$('.wk_wfqd_tit_xxl').html(xqlist.title);
				$('.wk_wfqd_fqrname_xxl').html(xqlist.faqiren)
				if(xqlist.approval_status==1){
					$('.wk_wfqd_ztimg_xxl').css('display','none')
					$('.wk_wfqd_ck_chbtn_xxl').removeAttr('disabled').attr('wid',xqlist.work_id)
				}else if(xqlist.approval_status==2){
					$('.wk_wfqd_ztimg_xxl').css('display','block').attr('src','static/images/work_sp_yes.png')
					$('.wk_wfqd_ck_chbtn_xxl').attr('disabled','disabled')
				}else if(xqlist.approval_status==3){
					$('.wk_wfqd_ztimg_xxl').css('display','block').attr('src','static/images/work_sp_no.png');
					$('.wk_wfqd_ck_chbtn_xxl').attr('disabled','disabled')
				}
				if(xqlist.headpic==''||xqlist.headpic==null){
					$('.wk_wfqd_fqrtx_imgxxl').attr('src','static/images/touxiang.png')
				}else{
					$('.wk_wfqd_fqrtx_imgxxl').attr('src',getImgUrl(xqlist.headpic)).css('border-radius','50%')
				}
				
				$.each(xqlist.allcontent, function(i,v) {
					if(v.detail!=null){
						var mx_list = '';
						$.each(v.detail, function(i,v) {
							mx_list +='<div class="right_sidebar_cont3 work_right_sidebar_cont3"><div class="work_fqrw_zrw_bt"><h3 class="inline_block cont_title ">'+likNullData(xqlist.mingxi)+'<span class="c_r">('+(i+1)+')</span></h3></div></div>';
							mx_list +='<div class="right_sidebar_cont3_1">';
							$.each(v, function(i,v1) {
								//console.log(v1.title+':'+v1.value)
                				mx_list +='<p>'+likNullData(v1.title)+'：<span class="m_left_5" style="color: #000;">'+likNullData(v1.value)+'</span></p>';
							});
							mx_list +='</div>';
						});
						$('.wk_wfqd_mclist_htmlxxl').html(mx_list)
					}else{
						if(v.title=="图片"){
							mx_list2 +='<p class="work_sp_tp">';
                			if(v.value==null){
                				return false;
                			}
                			var arrimg = v.value.split(','),imghtml='';
                			$.each(arrimg, function(i,v) {
                				imghtml +='<img class="inline_block val_dialog work_inlin_blockimg wk_ck_fqrtx_wfqd_err" name="work_wfqd_img" src="'+getImgUrl(v)+'">';
                			});
                			mx_list2 +='<span>'+likNullData(v.title)+':</span><span class="c_3 m_left_5">'+imghtml+'</span></p>';
						}else if(v.title=="附件"){
							if(v.value==null||v.value==undefined||v.value==''){
								mx_list2 +='<span>'+likNullData(v.title)+':</span><span class="c_3 m_left_5">-</span></p>';
							}else{
								mx_list2 +='<span>'+likNullData(v.title)+':</span><span class="c_3 m_left_5"><a href="#" paths="'+SERVER_URL+''+v.value+'" class="wfqd_ckxqfujian_xiazaibtnxxl">'+v.value+'</a></span></p>';
							}
						}else{
							mx_list2 +='<p>'+likNullData(v.title)+'：<span class="m_left_5" style="color: #000;">'+likNullData(v.value)+'</span></p>';
						}
						$('.wk_wfqd_mxtwo_html_xxl').html(mx_list2)
					}
				});
				if(xqlist.approval_people.length == 0) {
					$('.wfqd_spyj_listxxl').html('')
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
                        fbyj_listhtml +='<img class="inline_block tx wfqd_yijlist_imgxxl" src="'+getImgUrl(v.headpic)+'">';//static/images/touxiang.png  
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
//							fbyj_listhtmls += '<img class="inline_block tx wfqd_yijlist_imgxxl" src="'+SERVER_URL+'' + v.headpic + '"><cite class="b_h"></cite></div>';
//							fbyj_listhtmls += '<div class="right auto_height"><img src="static/images/work_jiantou.png"><div class="sp_cont">';
//							fbyj_listhtmls += '<div><h3 class="c_3">我</h3><span class="c_9 m_left_5">' + likNullData(v.update_time) + '</span></div>';
//						} else {
//							fbyj_listhtmls += '<img class="inline_block tx wfqd_yijlist_imgxxl" src="'+SERVER_URL+'' + v.headpic + '"><cite class="b_y"></cite></div>';
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
//							} else if(v.approval_status == 0){
//								fbyj_listhtmls += '<h3 class="c_y">未审批</h3>'
//							}else{
//								fbyj_listhtmls += '<h3 class="c_g">通过审批</h3>'
//							}
//
//						}
//						fbyj_listhtmls += '<p class="c_3 work_sp_p">' + likNullData(v.note) + '</p></div></div><div style="clear: both;height: 0;font-size: 1px;line-height: 0px;"></div></div></div>'
//					});
					$('.wfqd_spyj_listxxl').html(fbyj_listhtml)
				}
				
			}
			$(".wfqd_yijlist_imgxxl").error(function(e) { //加入相应的图片类名
				$(this).attr("src", "static/images/touxiang.png");
			});
			$(".wk_ck_fqrtx_wfqd_err").error(function(e) { //加入相应的图片类名
				$(this).attr("src", "static/images/error_xxl.png");
			});
			$(".wk_wfqd_fqrtx_imgxxl").error(function(e) { //加入相应的图片类名
				$(this).attr("src", "static/images/touxiang.png");
			});
		},
		error: function(e) {
			console.log(e)
		}
	});
}
//下载
$('.wfqd_ckxqfujian_xiazaibtnxxl').die().live('click',function(){
	if($(this).attr('paths')==''){
		alert('还没有附件哦')
		return false;
	}else{
		downloadFile($(this).attr('paths'));
	}
	
})
$('.wk_ck_fqrtx_wfqd_err').die().live('click',function(){
	$('.tanceng .wfqd_bigimg_showxxl').attr('src',$(this).attr('src'))
})
//撤回
$('.wk_wfqd_ck_chbtn_xxl').die().live('click',function(){
	//console.log($(this).attr('wid'))
	$('.wk_wfqd_ch_queding_btnxxl').attr('w_id',$(this).attr('wid'))
})
var wk_dwsp_chdata = {
	token:token,
	uid:uid,
	work_id:''
}
$('.wk_wfqd_ch_queding_btnxxl').die().live('click',function(){
	wk_dwsp_chdata.work_id = $(this).attr('w_id');
	wk_dwsp_ch_ajax();
	$(this).parent().parent().parent().remove();
        var num = $('.tanceng').children(".dialog_box").length;
        if (num < 1) {
            $(".tanceng").hide();
        }
})
function wk_dwsp_ch_ajax(){
	$.ajax({
		type:"post",
		url:SERVER_URL+"work/my-return",
		data:wk_dwsp_chdata,
		dataType:'json',
		success:function(data){
			if(data.code!=0){
				console.log(data)
			}else{
				console.log(data)
				add_Rload_index(27,3)//参数页面值，父级值
			}
		},
		error:function(e){
			console.log(e)
		}
	});
}
	//高级搜索
var wfqd_gjssdata_xxl = {
	token: token,
	page: page,
	limit: limit,
	uid: uid,
	status: '0',//1为审批中,2成功,3撤回,0为所有
	type_id:'',
	title:''
}

function wfqd_zkgjss_list() {
	$.ajax({
		type: "post",
		url: SERVER_URL + "work/my-send",
		data: wfqd_gjssdata_xxl,
		dataType: 'json',
		success: function(data) {
			if(data.code != 0) {
				console.log(data.msg)
			} else {
				var data_list = data['data'];
				var str3 = '';
				$.each(data_list, function(i, v) {
					//console.log(i,v)
//					str += '<li>' + likNullData(v.title) + '</li>'
//					str1 +='<li>' + likNullData(v.content) + '</li>';
					//str2 += '<li>' + likNullData(v.leixing) + '</li>';
					str3 += '<li>' + likNullData(v.faqiren) + '</li>';
				});
//				$('.wfqd_spmc').html(str);
//				$('.wfqd_spnr').html(str1)
				//$('.wfqd_splx').html(str2)
				$('.wfqd_fqr').html(str3)
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
//wfqd_zkgjss_list()
$(".select_list:not(.no_auto) li").die().live("click", function() {
	// 高级搜索输入框宽度自适应
	$(this).parents('div.select_p').css('minWidth', $(this).width() + 32)
});