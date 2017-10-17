//工作 
	// 默认测试账号 15900000001	tekon:2016121416190312079
	//审批 ID：40
	 var token,report_thetype,report_starttime,report_endtime;
	 token = Admin.get_token();
	report_thetype = 0;
	/*report_starttime = '';
	report_endtime = '';*/
//我的工作汇报
	myreport(datalist);
	var datalist={
					thetype:0,
					/*starttime:report_starttime,
					endtime:report_endtime,*/
					token:Admin.get_token()
				}
	function myreport(datalist){
		$.ajax({
			type:"get",
			url:SERVER_URL+"report/mylist",
			data:datalist,
			dataType:'json',
			success:function(data){
                console.log("0000");
				console.log(data);
                console.log("0000");
				if(data.code!=0){
					alert(data.msg);
				}else{
                    $(".zcj_all_paper_list").empty();

					var report_list = data.rows;
                    var ribao = '';
                   /* var weekly = '';
                    var monthly = '';
                    var performance = '';*/
					$.each(report_list,function(i,v){
						console.log(v)
						if(v.type_name =="日报"){
							ribao += '<div class="work_report_exitBox work_report_date work_wdgzhb_title select tabcontent"><div><div class="work_report_head"><h3> <i class="left but_yellow"></i>'+v.type_name+'<span>'+v.starttime+'</span></h3><div class="work_report_headBtn"><button class="but_small val_dialog but_exit" name="work_wdgzhb_date" zid="'+v.id+'">编辑</button><button class="but_small but_r work_delete" zid="'+v.id+'">删除</button></div></div>';
							ribao +='<div class="work_report_det"><div class="work_report_detHead clearfix"><span class="left" style="background: url('+v.face+')"></span><div class="work_report_personMsg left"><p>'+v.uname+'</p><p>'+v.created_at+'</p></div></div>';
							ribao +='<div class="work_report_detCon work_report_detCon_p"><h3 class="cont_title">今日工作总结</h3><p>'+v.summary+'</p><h3 class="cont_title">明日工作总结</h3><p>'+v.plan+'</p></div>';
							ribao +='<div class="work_report_upload" style="margin:0 20px;"><img src='+v.imgurl+' alt="工作计划" class="val_dialog" name="work_wdgzhb_prv" style="border-radius: 3px;"><div class="right_sidebar_cont3" style="border-radius: 3px;margin: 14px 0 0 0 ;"><div><img src="static/images/work_fujian.png" style="margin-top: -5px;padding-right: 10px;"><span style="color: #000;">附件:'+v.fileurl+' <span style="color: #CCCCCC;margin-left: 5px;">('+v.fujian_num+')</span></span><span style="float: right;"><a href="'+v.fileurl+'" class="m_right_20">下载</a><a href="#" name="work_wdgzhb_imglist" class="val_dialog">预览</a></span></div></div>';
							ribao +='</div><div class="work_report_comment" style="margin:0 20px;"><div class="work_report_commentBtn" ><button class="but_small but_cancel right work_report_Comment" name="work_wdgzhb_report_Comment1">评论 <i>('+v.commit_num+')</i></button><button class="but_small but_cancel right work_report_Visitor but_exit" name="work_wdgzhb_report_Comment1">谁看过 <i>('+v.read_num+')</i></button></div>';
							ribao +='<div class="work_report_commentConBox"><!--评论--><div class="work_report_commentCon" name="work_wdgzhb_report_Comment1" style="display: none;"><em class="work_report_comment_icon"></em><label class="inp_box clearfix"><input type="text" class="work_report_commentInp left" value="写评论" onfocus="fn_focus(this);" onblur="fn_blur(this);"><button class="work_report_commentBut but_blue">发送</button></label>';
							ribao +='<ul class="work_report_comment_listBox"><li><div class="work_report_detHead clearfix"><span class="left"></span><div class="work_report_ComtpersonMsg left"><p><em>木易</em><em class="time">2016-10-11 17:00</em></p></div></div><ul class="work_report_comment_list"><li>好的，知道了<em>删除</em></li></ul></li></ul></div>';
							ribao +='<!--谁看过--><div class="work_report_commentCon" name="work_wdgzhb_report_Comment1" style="display: none"><em class="work_report_comment_icon work_report_comment_icon2"></em><ul class="box_adderCon clearfix"><li><em class="icon_personBtn icon_personBtn_msg"></em><p class="box_adderName">张三</p></li><li><em class="icon_personBtn icon_personBtn_msg"></em><em class="icon_adderBtn"></em><p class="box_adderName">李四</p></li></ul></div></div></div></div></div></div>';
						}else if(v.type_name =="周报"){
                            ribao += '<div class="work_report_exitBox work_report_week work_wdgzhb_title select tabcontent"><div><div class="work_report_head"><h3> <i class="left but_yellow"></i>'+v.type_name+'<span><i>'+v.starttime+'</i>--<i>'+v.endtime+'</i></span></h3><div class="work_report_headBtn"><button class="but_small val_dialog but_exit" name="work_wdgzhb_date" zid="'+v.id+'">编辑</button><button class="but_small but_r work_delete" zid="'+v.id+'">删除</button></div></div>';
                            ribao +='<div class="work_report_det"><div class="work_report_detHead clearfix"><span class="left" style="background: url('+v.face+')"></span><div class="work_report_personMsg left"><p>'+v.uname+'</p><p>'+v.created_at+'</p></div></div>';
                            ribao +='<div class="work_report_upload" style="margin:0 20px;"><p class="work_gz_p">'+v.summary+'</p> <img src='+v.imgurl+' alt="工作计划" class="val_dialog" name="work_wdgzhb_prv" style="border-radius: 3px;"><div class="right_sidebar_cont3" style="border-radius: 3px;margin: 14px 0 0 0 ;"> <div> <img src="static/images/work_fujian.png" style="margin-top: -5px;padding-right: 10px;"> <span style="color: #000;">附件:'+v.fileurl+'<span style="color: #CCCCCC;margin-left: 5px;">(2.30M)</span></span> <span style="float: right;"> <a href="#" class="m_right_20">下载</a> <a href="#" name="work_wdgzhb_imglist" class="val_dialog">预览</a> </span> </div> </div> </div>';
                            ribao +='</div><div class="work_report_comment" style="margin:0 20px;"><div class="work_report_commentBtn" ><button class="but_small but_cancel right work_report_Comment" name="work_wdgzhb_report_Comment1">评论 <i>('+v.commit_num+')</i></button><button class="but_small but_cancel right work_report_Visitor but_exit" name="work_wdgzhb_report_Comment1">谁看过 <i>('+v.read_num+')</i></button></div>';
                            ribao +='<div class="work_report_commentConBox"><!--评论--><div class="work_report_commentCon" name="work_wdgzhb_report_Comment1" style="display: none;"><em class="work_report_comment_icon"></em><label class="inp_box clearfix"><input type="text" class="work_report_commentInp left" value="写评论" onfocus="fn_focus(this);" onblur="fn_blur(this);"><button class="work_report_commentBut but_blue">发送</button></label>';
                            ribao +='<ul class="work_report_comment_listBox"><li><div class="work_report_detHead clearfix"><span class="left"></span><div class="work_report_ComtpersonMsg left"><p><em>木易</em><em class="time">2016-10-11 17:00</em></p></div></div><ul class="work_report_comment_list"><li>好的，知道了<em>删除</em></li></ul></li></ul></div>';
                            ribao +='<!--谁看过--><div class="work_report_commentCon" name="work_wdgzhb_report_Comment1" style="display: none"><em class="work_report_comment_icon work_report_comment_icon2"></em><ul class="box_adderCon clearfix"><li><em class="icon_personBtn icon_personBtn_msg"></em><p class="box_adderName">张三</p></li><li><em class="icon_personBtn icon_personBtn_msg"></em><em class="icon_adderBtn"></em><p class="box_adderName">李四</p></li></ul></div></div></div></div></div></div>';

                        }else if(v.type_name =="月报"){
                            ribao += '<div class="work_report_exitBox work_report_month work_wdgzhb_title select tabcontent"><div><div class="work_report_head"><h3> <i class="left but_yellow"></i>'+v.type_name+'<span>'+v.starttime+'</span></h3><div class="work_report_headBtn"><button class="but_small val_dialog but_exit" name="work_wdgzhb_date" zid="'+v.id+'">编辑</button><button class="but_small but_r work_delete" zid="'+v.id+'">删除</button></div></div>';
                            ribao +='<div class="work_report_det"><div class="work_report_detHead clearfix"><span class="left" style="background: url('+v.face+')"></span><div class="work_report_personMsg left"><p>'+v.uname+'</p><p>'+v.created_at+'</p></div></div>';
                            ribao +='<div class="work_report_upload" style="margin:0 20px;"><p class="work_gz_p">'+v.summary+'</p> <img src='+v.imgurl+' alt="工作计划" class="val_dialog" name="work_wdgzhb_prv" style="border-radius: 3px;"><div class="right_sidebar_cont3" style="border-radius: 3px;margin: 14px 0 0 0 ;"> <div> <img src="static/images/work_fujian.png" style="margin-top: -5px;padding-right: 10px;"> <span style="color: #000;">附件:'+v.fileurl+'<span style="color: #CCCCCC;margin-left: 5px;">(2.30M)</span></span> <span style="float: right;"> <a href="#" class="m_right_20">下载</a> <a href="#" name="work_wdgzhb_imglist" class="val_dialog">预览</a> </span> </div> </div> </div>';
                            ribao +='</div><div class="work_report_comment" style="margin:0 20px;"><div class="work_report_commentBtn" ><button class="but_small but_cancel right work_report_Comment" name="work_wdgzhb_report_Comment1">评论 <i>('+v.commit_num+')</i></button><button class="but_small but_cancel right work_report_Visitor but_exit" name="work_wdgzhb_report_Comment1">谁看过 <i>('+v.read_num+')</i></button></div>';
                            ribao +='<div class="work_report_commentConBox"><!--评论--><div class="work_report_commentCon" name="work_wdgzhb_report_Comment1" style="display: none;"><em class="work_report_comment_icon"></em><label class="inp_box clearfix"><input type="text" class="work_report_commentInp left" value="写评论" onfocus="fn_focus(this);" onblur="fn_blur(this);"><button class="work_report_commentBut but_blue">发送</button></label>';
                            ribao +='<ul class="work_report_comment_listBox"><li><div class="work_report_detHead clearfix"><span class="left"></span><div class="work_report_ComtpersonMsg left"><p><em>木易</em><em class="time">2016-10-11 17:00</em></p></div></div><ul class="work_report_comment_list"><li>好的，知道了<em>删除</em></li></ul></li></ul></div>';
                            ribao +='<!--谁看过--><div class="work_report_commentCon" name="work_wdgzhb_report_Comment1" style="display: none"><em class="work_report_comment_icon work_report_comment_icon2"></em><ul class="box_adderCon clearfix"><li><em class="icon_personBtn icon_personBtn_msg"></em><p class="box_adderName">张三</p></li><li><em class="icon_personBtn icon_personBtn_msg"></em><em class="icon_adderBtn"></em><p class="box_adderName">李四</p></li></ul></div></div></div></div></div></div>';

						}else if(v.type_name =="业绩"){
                            ribao+='<div class="work_report_exitBox work_report_results select tabcontent work_wdgzhb_title"> <div><div class="work_report_head"><h3><i class="left but_red"></i>'+v.type_name+'<span><i>'+v.starttime+'</i>--<i>'+v.endtime+'</i></span></h3> <div class="work_report_headBtn"> <button class="but_small val_dialog but_exit" name="work_wdgzhb_yeji">编辑</button> <button class="but_small but_r work_delete">删除</button> </div> </div>';
                            ribao+='<div class="work_report_det"> <div class="work_report_detHead clearfix"> <span class="left"></span> <div class="work_report_personMsg left"> <p>'+v.uname+'</p> <p>'+v.created_at+'</p> </div> </div> <div class="work_report_detCon work_report_detCon_p">';
                            ribao+='<h3 class="cont_title">今日营业额</h3> <p class="f_red">'+v.money+'元 </p> <h3 class="cont_title">今日客户数</h3> <p class="f_color">'+v.customer+'人</p> <h3 class="cont_title">业绩总结</h3> <p>'+v.summary+' </p> </div> </div></div> </div>';
                        }
					})
                $(".zcj_all_paper_list").append(ribao);

				}
			},
			error:function(e){
				console.log(e)
			}
		});
	}
	/*show日报*/
	$(".zj_ribao_btn").bind("click",function(){

		var daily={
            thetype:1,
            token:Admin.get_token()
		}
        myreport(daily);
	});

