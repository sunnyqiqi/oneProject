/*修改个人信息*/

var token = localStorage.getItem("token");
var uid = localStorage.getItem("uid");
var userface = localStorage.getItem("userface");
var username = localStorage.getItem("username");
var ranking = localStorage.getItem("ranking");
var deptname = localStorage.getItem("deptname");
var deptid = localStorage.getItem("department_id");
var company_admin = localStorage.getItem("company_admin");
var cmpyid = loginUserInfo['usercompany_id'];
/*token = JSON.parse(token); */

/*系统头部*/
$('#top_header_box .Personal_img').css({
    'background': 'url(' + userface + ') no-repeat',
    'border-radius': '50%',
    'background-size': '100% 100%'
});
$('#top_header_box .zcj_user_name_show').text(username)
var user_info = ".zcj_user_register_info_show "
var html = '<span class="user_picture left"></span>\
    <div class="user_name_con left">\
    <p class="userName c_3 zcj_person_name">' + username + '<span class="right c_9"><i ></i><span class="zcj_person_post">' + ranking + '</span></span></p>\
    <p class="user_depat zcj_person_depat" data-deptid="' + deptid + '">' + deptname + '</p>\
    </div>\
    <div class="user_change right">\
    <button class="but_small but_icon val_dialog zcj_amend_my_info_btn" data-uid="' + uid + '" name="user_change_msg">修改个人信息</button>\
    <br>\
    <button class="but_small but_icon val_dialog zcj_edit_amend_password" data-uid="' + uid + '" name="user_change_psd">修改密码</button>\
    </div>'
$(user_info + ".user_msg_box").html(html);

/*$(user_info + '.zcj_person_name').text(username);
 $(user_info + '.zcj_person_post').text(username);
 $(user_info + '.zcj_person_depat').text(username);*/
$(user_info + '.user_msg_box .user_picture').css({
    'background': 'url(' + userface + ') no-repeat',
    'background-size': '100% 100%'
});


function ajaxSubmit($el) {
    console.log(SERVER_URL, token);
    $el.upload({
        url: SERVER_URL + '/task/uploadattch',
        // 其他表单数据
        params: {
            token: token
        },
        // 上传完成后, 返回json, text
        dataType: 'json',
        onSend: function (obj, str) {
            //console.log(obj, str);
            return true;
        },
        // 上传之后回调
        onComplate: function (data) {
            // $el.parent().before('<li><input class="hide_input" type="file" id="upimgFile_' + add_imgi + '"/><img class="img_src" id="imgShow_' + add_imgi + '"/><i class="del_img">-</i></li>');
            $(".zcj_look_icon").attr("src", SERVER_URL + '/' + data.imgurl);
            // add_imgi++;
            console.log(data.imgurl);
            $(".zcj_look_icon").data("url", data.imgurl)
        },
        onProgress: function (e) {
            var per = Math.round(e.loaded * 80 / e.total);
            $('.zcj_look_icon').css('width', per + '%')
        }
    });
    $el.upload("ajaxSubmit");
}
$(".tanceng .zcj_edit_xgtp_up_btn").live("change", function () {

    ajaxSubmit($(this));

});

/*修改按钮*/
$(".zcj_amend_my_info_btn").die().live("click", function () {

    var uid = $(this).data('uid');
    var my_info = '.zcj_check_look_my_info_xq '

    $.ajax({
        type: 'get',
        url: SERVER_URL + '/admin/loadadmin',
        data: {
            'token': token,
            'id': uid
        },
        dataType: "json",
        success: function (data) {

            console.log(data);

            if (data.code == 0) {
                if (data['data']['face'] != '') {
                    $(my_info + ".zcj_look_icon").attr('src', data['data']['face']);
                }

                $(my_info + ".zcj_input_user_name").val(data['data']['name']);
                $(my_info + ".zcj_input_user_job").val(data['data']['jobnumber']);
                $(my_info + ".zcj_input_user_sex").val(data['data']['sex']);
                $(my_info + ".zcj_input_user_mobile").val(data['data']['mobile']);
                $(my_info + ".zcj_input_user_depet").val(data['data']['deptname']);
                $(my_info + ".zcj_input_user_depet").data('depetid', deptid)
                $(my_info + ".zcj_input_user_post").val(data['data']['ranking']);
                $(my_info + ".zcj_input_user_mail").val(data['data']['email']);
                // $(my_info + ".zcj_input_user_by_time").val(data['data']['graduationtime']);
                // $(my_info + ".zcj_input_user_entry_time").val(data['data']['workdate']);
                $(my_info + ".zcj_edit_input_education").val(data['data']['education']);
                $(my_info + ".zcj_input_user_nation").val(data['data']['nation']);
                $(my_info + ".zcj_input_user_birthplace").val(data['data']['birthplace']);
                $(my_info + ".zcj_input_user_card").val(data['data']['idnumber']);
                $(my_info + ".zcj_input_user_birthday").val(data['data']['birthday']);
                if (data['data']['marital_status'] == 0) {
                    $(my_info + ".zcj_input_user_marry").val('未婚');//婚姻状况
                } else if (data['data']['marital_status'] == 1) {
                    $(my_info + ".zcj_input_user_marry").val('已婚');//婚姻状况
                }

                $(my_info + ".zcj_input_user_address").val(data['data']['address']);
                $(my_info + ".zcj_input_user_urgency_man").val(data['data']['contact']);
                $(my_info + ".zcj_input_user_urgency_phone").val(data['data']['contact_lx']);
            }
        },
        error: function (data) {
            alert("刷新失败，请稍后再试");
        }
    });
    /*编辑保存*/
    $(my_info + ".zcj_input_user_save").die().live("click", function () {
        var _this = this;
        var face = $(my_info + ".zcj_look_icon").data('url');
        var name = $(my_info + ".zcj_input_user_name").val();
        var jobnumber = $(my_info + ".zcj_input_user_job").val();
        var sex = $(my_info + ".zcj_input_user_sex").val();
        var mobile = $(my_info + ".zcj_input_user_mobile").val();
        var deptname = $(my_info + ".zcj_input_user_depet").val();
        var deptid = $(my_info + ".zcj_input_user_depet").data('depetid');
        var ranking = $(my_info + ".zcj_input_user_post").val();
        var email = $(my_info + ".zcj_input_user_mail").val();
        // var graduationtime=$(my_info + ".zcj_input_user_by_time").val();
        // var workdate=$(my_info + ".zcj_input_user_entry_time").val();
        var education = $(my_info + ".zcj_edit_input_education").val();//学历
        var nation = $(my_info + ".zcj_input_user_nation").val();
        var birthplace = $(my_info + ".zcj_input_user_birthplace").val();
        var idnumber = $(my_info + ".zcj_input_user_card").val();
        var birthday = $(my_info + ".zcj_input_user_birthday").val();
        var marital_status;//婚姻状况
        if ($(my_info + ".zcj_input_user_marry").val() == '已婚') {
            marital_status = 1;
        } else {
            marital_status = 0;
        }
        var address = $(my_info + ".zcj_input_user_address").val();//家庭住址
        var contact = $(my_info + ".zcj_input_user_urgency_man").val();//紧急联系人
        var contact_lx = $(my_info + ".zcj_input_user_urgency_phone").val();//紧急联系人电话
        $.ajax({
            type: 'post',
            url: SERVER_URL + '/admin/add',
            data: {
                'token': token,
                'id': uid,
                'face': face,
                'name': name,
                'jobnumber': jobnumber,
                'sex': sex,
                'mobile': mobile,
                'deptname': deptname,
                'deptid': deptid,
                'ranking': ranking,
                'email': email,
                'hr_radioa': 1,
                // 'graduationtime':graduationtime,
                // 'workdate':workdate,
                'education': education,
                'nation': nation,
                'birthplace': birthplace,
                'idnumber': idnumber,
                'birthday': birthday,
                'marital_status': marital_status,
                'address': address,
                'contact': contact,
                'contact_lx': contact_lx

            },
            dataType: "json",
            success: function (data) {

                console.log(data);

                if (data.code == 0) {
                    alert(data.msg);
                    $(_this).parents('.zcj_check_look_my_info_xq').find('.dialog_close').click();
                    //$(_this).next().click();
                } else {
                    alert(data.msg);
                }
            },
            error: function (data) {
                alert("刷新失败，请稍后再试");
            }
        })
    });

});

/*修改密码*/
$(".zcj_edit_amend_password").die().live("click", function () {
    var uid = $(this).data('uid');
    $(".zcj_xg_edit_amend_end_btn").die().live("click", function () {

        var vthis = this;

        var oldpassword = $(".zcj_former_pass_word").val();
        /*登陆密码*/
        var againpass = $(".zcj_mew_pass_word").val();
        /*新密码*/
        var endpass = $(".zcj_end_pass_word").val();
        /*确认密码*/

        if (againpass == endpass) {
            var newpass = againpass;
            $.ajax({
                type: 'post',
                url: SERVER_URL + "/admin/changepwd",
                data: {
                    token: token,
                    uid: uid,
                    oldpassword: oldpassword,
                    newpassword: newpass

                },
                dataType: "json",
                success: function (data) {
                    /* console.log(data);*/
                    if (data.code == 0) {
                        alert(data.msg);
                        $(vthis).parents('.dialog_content').find('.dialog_close').click();

                    } else {
                        alert(data.msg);
                    }
                },
                error: function (data) {
                    alert("更新失败，请稍后再试");
                }
            })
        } else {
            alert('密码输入不一致,请重新输入');
        }

    });


});

//消息
/*$('.notice_box').live('click', function () {
    getNoticeFn();
});*/

getNoticeNumFn();
$.ajaxSetup({
    beforeSend: function () {
        if (arguments[1]['url'].indexOf('/message/pc-message') == -1) {
            getNoticeNumFn();
        }
    }
});
function getNoticeNumFn() {
    $.ajax({
        url: SERVER_URL + '/message/pc-message',
        type: 'POST',
        data: {
            token: token,
            company_id: cmpyid, // 公司id
            uid: uid // 用户id
        },
        dataType: 'json',
        success: function (oE) {
            if (oE.code == 0) {
                $('.msg_box .msg_num').html(parseFloat(oE['approval']) + parseFloat(oE['task']));
                if ((parseFloat(oE['approval']) + parseFloat(oE['task'])) == 0) {
                    $('.msg_box .left:first-of-type').removeClass('notice_box');
                    $('.msg_box .msg_num').addClass('none');
                } else {
                    $('.msg_box .left:first-of-type').addClass('notice_box');
                    $('.msg_box .msg_num').removeClass('none');
                }
            }
        },
        error: function (e) {
            console.log(e);
        }
    });
}
$('.notice_box').live('click', function () {
    getNoticeFn();
});
function getNoticeFn() {
    $.ajax({
        url: SERVER_URL + '/message/pc-message',
        type: 'POST',
        data: {
            token: token,
            company_id: cmpyid, // 公司id
            uid: uid // 用户id
        },
        dataType: 'json',
        success: function (oE) {
            if (oE.code == 0) {
                $('.msg_box .msg_num').html(parseFloat(oE['approval']) + parseFloat(oE['task']));
                if ((parseFloat(oE['approval']) + parseFloat(oE['task'])) == 0) {
                    $('.msg_box .left:first-of-type').removeClass('notice_box');
                    $('.msg_box .msg_num').addClass('none');
                } else {
                    $('.msg_box .left:first-of-type').addClass('notice_box');
                    $('.msg_box .msg_num').removeClass('none');
                }
                //审批消息列表
                if (oE['approval_info'] && oE['approval_info'].length > 0) {
                    var approvalList = '';
                    $.each(oE['approval_info'], function (i, v) {
                        approvalList += '<li noticeid="' + v['message_id'] + '" menuid="' + v['menu_id'] + '" detailid="' + v['table_id'] + '" secondmenu="' + v['second_menu_name'] + '" totable="' + v['to_table'] + '">' + v['title'] + '</li>';
                    });
                    $('.Notice_con_msg_approval').removeClass('none').find('ul.Notice_con_detail').html(approvalList);
                    $('.Notice_con_msg_approval_total').html(oE['approval']);
                } else {
                    $('.Notice_con_msg_approval').addClass('none')
                }
                //任务通知列表
                if (oE['task_info'] && oE['task_info'].length > 0) {
                    var taskList = '';
                    $.each(oE['task_info'], function (i, v) {
                        taskList += '<li noticeid="' + v['message_id'] + '" menuid="' + v['menu_id'] + '" detailid="' + v['table_id'] + '" secondmenu="' + v['second_menu_name'] + '">' + v['title'] + '</li>';
                    });
                    $('.Notice_con_msg_task').removeClass('none').find('ul.Notice_con_detail').html(taskList);
                    $('.Notice_con_msg_task_total').html(oE['task']);
                } else {
                    $('.Notice_con_msg_task').addClass('none')
                }
                /*
                 //抄送列表
                 if (oE['cc_info'] && oE['cc_info'].length > 0) {
                 var copyList = '';
                 $.each(oE['cc_info'], function (i, v) {
                 copyList += '<li noticeid="' + v['message_id'] + '" menuid="' + v['menu_id'] + '" detailid="' + v['table_id'] + '" secondmenu="' + v['second_menu_name'] + '">' + v['title'] + '</li>';
                 });
                 $('.Notice_con_msg_copy').removeClass('none').find('ul.Notice_con_detail').html(copyList);
                 $('.Notice_con_msg_copy_total').html(oE['cc']);
                 } else {
                 $('.Notice_con_msg_copy').addClass('none')
                 }
                 //系统通知列表
                 if (oE['sys_info'] && oE['sys_info'].length > 0) {
                 var sysList = '';
                 $.each(oE['sys_info'], function (i, v) {
                 sysList += '<li noticeid="' + v['message_id'] + '" menuid="' + v['menu_id'] + '" detailid="' + v['table_id'] + '" secondmenu="' + v['second_menu_name'] + '">' + v['title'] + '</li>';
                 });
                 $('.Notice_con_msg_sys').removeClass('none').find('ul.Notice_con_detail').html(sysList);
                 $('.Notice_con_msg_sys_total').html(oE['sys']);
                 } else {
                 $('.Notice_con_msg_sys').addClass('none')
                 }
                 //预警通知列表
                 if (oE['warning_info'] && oE['warning_info'].length > 0) {
                 var warnList = '';
                 $.each(oE['warning_info'], function (i, v) {
                 warnList += '<li noticeid="' + v['message_id'] + '" menuid="' + v['menu_id'] + '" detailid="' + v['table_id'] + '" secondmenu="' + v['second_menu_name'] + '">' + v['title'] + '</li>';
                 });
                 $('.Notice_con_msg_wran').removeClass('none').find('ul.Notice_con_detail').html(warnList);
                 $('.Notice_con_msg_wran_total').html(oE['warning']);
                 } else {
                 $('.Notice_con_msg_wran').addClass('none')
                 }
                 */

            }
        },
        error: function (e) {
            console.log(e);
        }
    });
}
/*var noticeInteval = setInterval(function () {
 getNoticeFn();
 }, 10000);*/
$('.Notice_con_msg ul li').die('click').live('click', function () {
    $('#left_button_' + $(this).attr('menuid')).attr({
        'fromnotice': '1',
        'detailid': $(this).attr('detailid'),
        'secondmenu': $(this).attr('secondmenu'),
        'totable': $(this).attr('totable')
    });
    $('#left_button_' + $(this).attr('menuid')).trigger('click');
    $(this).closest('.Notice_con').hide();
    $('.Notice_con_screen').css('display', 'none');
    $.ajax({
        url: SERVER_URL + '/message/up-status',
        type: 'POST',
        data: {
            token: token,
            company_id: cmpyid, // 公司id
            uid: uid, // 用户id
            message_id: $(this).attr('noticeid') // 消息表id
        },
        dataType: 'json',
        success: function (oE) {
            getNoticeFn();
            /*noticeInteval = setInterval(function () {
             getNoticeFn();
             }, 10000);*/
        },
        error: function (e) {
            alert(e.msg);
            console.log(e);
        }
    });
});
