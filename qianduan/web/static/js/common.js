//dialog 自定义弹窗
$(function () {
    $(".normal_dialog").click(function () {
        $(".tanceng").show();
        $(this).next(".dialog_box").show(0);
        $(this).next(".dialog_box .dialog_screen").show(0);
        $(this).next(".dialog_box .dialog_content").fadeIn(0);
        return false;
    });

    $(".val_dialog").live("click", function () {
        var name_x = $(this).attr("name");
        var html = $(".dialog_box[name='" + name_x + "']").parent().html(); //单页面的弹窗赋值给变量
        $(".tanceng").html(html).show(); //外层框架的div
        $(".tanceng .dialog_box").show(0);
    });
    var dialog_topindex = 1;
    $(".val_dialogTop").live("click", function () {
        var name_x = $(this).attr("name");
        var html = $(".dialog_box[name='" + name_x + "']").parent().html(); //单页面的弹窗赋值给变量
        $(".tanceng").append(html).show(); //外层框架的div
        $(".tanceng .dialog_box").show();
        $(".dialog_box[name='" + name_x + "']").css({
            "z-index": "" + dialog_topindex + "",
            "position": "absolute"
        });
    });

    $(".dialog_screen").live("click", function () { //用live绑定事件
        /*$(this).parent().remove();
         var num = $('.tanceng').children(".dialog_box").length;
         if (num < 1) {
         $(".tanceng").hide();
         }
         ;*/
    });

    $(".dialog_close").live("click", function () {
        document.title = 'SoWork';
        $(this).closest('.dialog_box').remove();
        var num = $('.tanceng').children(".dialog_box").length;
        if (num < 1) {
            $(".tanceng").hide();
        }
        ;
    });
    $(".dialog_close_but").live("click", function () {
        $(this).parent().parent().remove();
        var num = $('.tanceng').children(".dialog_box").length;
        if (num < 1) {
            $(".tanceng").hide();
        }
        ;
    });
    //取消按钮，关闭弹窗（4月5号）
    $(".dialog_submit .but_cancel").live("click", function () {
        document.title = 'SoWork';
        $(this).closest(".dialog_box").remove();
        var num = $('.tanceng').children(".dialog_box").length;
        if (num < 1) {
            $(".tanceng").hide();
        }
        ;
    });

    $('.fz_auto_close').live('click', function () {
        $(this).parent().parent().find('.fz_close').click();
    });
    //lik create
    $('body').die('click').live('click', function (e) {
        if ($.inArray('select_list', e.target.classList) == -1) {
            if ($.inArray('select_list_to_top', e.target.classList) == -1 || $.inArray('select_list_to_bottom', e.target.classList) == -1) {
                $('.select_list_to_top').stop(true, true).animate({
                    'height': '0px',
                    'paddingTop': '0px',
                    'paddingBottom': '0px'
                }, 300);
                $('.select_list_to_bottom').stop(true, true).animate({
                    'height': '0px',
                    'paddingTop': '0px',
                    'paddingBottom': '0px'
                }, 300);
            }
            $('.select_input').nextAll('.select_list').slideUp(300);
            //$('.select_input').nextAll('.select_list').hide();
        } else {
            $('.select_list_to_top').stop().css({
                'height': '0px!important',
                'paddingTop': '0px!important',
                'paddingBottom': '0px!important'
            });
            $('.select_list_to_bottom').stop().css({
                'height': '0px!important',
                'paddingTop': '0px!important',
                'paddingBottom': '0px!important'
            });
        }
        if ($.inArray('slider_head_list', e.target.classList) == -1 && $.inArray('slider_head_More', e.target.classList) == -1) {
            $('.slider_head_list').css('display', 'none');
        }
        if ($.inArray('select_list_lik', e.target.classList) == -1 && $.inArray('select_lik_mormal', e.target.classList) == -1) {
            $('.select_lik_input').nextAll('.select_list_lik').slideUp(300);
        }
        if ($.inArray('xs_goods_select', e.target.classList) == -1 && $.inArray('xs_bjd_inp', e.target.classList) == -1) {
            $('.xs_goods_select').css('display', 'none');
        }
        if ($.inArray('bargin_ul', e.target.classList) == -1 && $.inArray('bargin_bjd_inp', e.target.classList) == -1) {
            $('.bargin_ul').css('display', 'none');
        }
    });
//select 模拟折叠

    function likTableBottomFn(pageId) {
        if ($('#' + pageId + ' .lik_content_max_height_box').height() == 60) {
            likTableBottomNum = $('.py_content_box').height() - $('#' + pageId + ' .vend_title').height() - $('#' + pageId + ' .sp_right_con').height();
        } else {
            likTableBottomNum = $('.py_content_box').height() - $('#' + pageId + ' .vend_title').height() - $('#' + pageId + ' .lik_content_max_height_box').height();
        }
        if (likTableBottomNum >= 200) {
            $('.select_list_to_top').addClass('select_list_to_bottom').removeClass('select_list_to_top');
        } else {
            $('.select_list_to_bottom').removeClass('select_list_to_bottom').addClass('select_list_to_top');
        }
        return likTableBottomNum;
    }

    $('.select_mormal').die('click').live('click', function () {
        var likTableBottomNum = null;
        $('.select_list').not($(this).find('.select_list')).slideUp(300);
        var pageCurrentId = $(this).closest('.py_content').attr('id');
        likTableBottomFn(pageCurrentId);
        if ($(this).find('.select_list').hasClass('select_list_to_top') || $(this).find('.select_list').hasClass('select_list_to_bottom')) {
            if ($(this).find('.select_list_to_bottom').height() == 0) {
                $(this).find('.select_list_to_bottom').stop(true, true).animate({
                    'height': '140px',
                    'paddingTop': '10px',
                    'paddingBottom': '10px'
                });
            } else {
                $(this).find('.select_list_to_bottom').stop(true, true).animate({
                    'height': '0px',
                    'paddingTop': '0px',
                    'paddingBottom': '0px'
                });
            }
            if ($(this).find('.select_list_to_top').height() == 0) {
                $(this).find('.select_list_to_top').stop(true, true).animate({
                    'height': '140px',
                    'paddingTop': '10px',
                    'paddingBottom': '10px'
                });
            } else {
                $(this).find('.select_list_to_top').stop(true, true).animate({
                    'height': '0px',
                    'paddingTop': '0px',
                    'paddingBottom': '0px'
                });
            }
        } else {
            $(this).find('.select_list').slideToggle(300);
        }
        return false;
    });
    //数字输入框
    $('.lik_input_number').live('keydown', function (e) {
        //控制第一个数字不能为0
        if ($(this).val().length > 1 && $(this).val().slice(0, 1) == 0 && $(this).val().slice(1, 2) != '.') {
            $(this).val($(this).val().slice(1, $(this).val().length));
        }
        //控制只能输入数字、小数点、负号
        if ((e.keyCode < 48 || (e.keyCode > 57 && e.keyCode < 96) || (e.keyCode > 105 && e.keyCode < 109) || (e.keyCode > 110 && e.keyCode < 189) || e.keyCode > 190) && e.keyCode != 8) {
            $(this).val($(this).val().replace(/[^0-9\.]/g, ''));
            return false;
        }
    });
    $('.lik_input_number').live('keyup', function (e) {
        //控制第一个数字不能为0
        if ($(this).val().length > 1 && $(this).val().slice(0, 1) == 0 && $(this).val().slice(1, 2) != '.') {
            $(this).val($(this).val().slice(1, $(this).val().length));
        }
        if ($(this).val() == '') {
            $(this).val('0').trigger('keyup');
        }
        //控制只能输入数字、小数点、负号
        if ((e.keyCode < 48 || (e.keyCode > 57 && e.keyCode < 96) || (e.keyCode > 105 && e.keyCode < 109) || (e.keyCode > 110 && e.keyCode < 189) || e.keyCode > 190) && e.keyCode != 8) {
            $(this).val($(this).val().replace(/[^0-9\.]/g, ''));
            return false;
        }
    });
    /*$('.lik_input_number').live('blur', function(){
     if($(this).val() == '0'){
     $(this).val('请输入数量');
     }
     })*/
});

//登录用户信息
var Admin = {};
Admin.get_token = function () {
    var token = $.trim($.cookie('sass_token'));
    return token.length == 0 ? localStorage.getItem('token') : token;
};

Admin.set_token = function (token, options) {
    if (!options) {
        options = {}
    }
    $.cookie('sass_token', token, options);
};
Admin.get_name = function (token, options) {
    return '张三';
};

Admin.get_uid = function () {
    var uid = $.trim($.cookie('sass_uid'));
    return uid.length == 0 ? localStorage.getItem('uid') : uid;
};
Admin.set_uid = function (uid, options) {
    if (!options) {
        options = {}
    }
    $.cookie('sass_uid', uid, options);
};

function xxldatakong(data) {
    var newData = '';
    if (data === '' || data == null || data.length == 0 ||data==0) {
        newData = '';
    } else {
        newData = data;
    }
    return newData;
}
//图片路径
function getImgUrl(v) {
    if (v.indexOf('qiniu') != -1) {
        return qiniu + v;
    } else {
        return SERVER_URL + v;
    }
}

//搜索框 回车搜索
$('.search_input').live('keyup', function (e) {
    if (e.keyCode == 13) {
        $(this).siblings('.search_but').trigger('click');
        //return false;
    }
});

// var add_imgi = 1;
// function ajaxSubmit($el) {
//    var SERVER_URL = 'http://192.168.0.167:9091//';
//     var token = Admin.get_token();
//     //var token = '2017052516045457073-1-1';
//     console.log(SERVER_URL, token);
//     $el.upload({
//         url: SERVER_URL + '/task/uploadattch',
//         // 其他表单数据
//         params: {
//             token: token
//         },
//         // 上传完成后, 返回json, text
//         dataType: 'json',
//         onSend: function (obj, str) {
//             //console.log(obj, str);
//             return true;
//         },
//         // 上传之后回调
//         onComplate: function (data) {
//             $el.parent().before('<li><input class="hide_input" type="file" id="upimgFile_' + add_imgi + '"/><img class="img_src" id="imgShow_' + add_imgi + '"/><i class="del_img">-</i></li>');
//             $("#imgShow_" + add_imgi + "").attr("src", SERVER_URL+data.imgurl);
//             add_imgi++;
//             //console.log(data);
//         },
//         onProgress: function (e) {
//             var per = Math.round(e.loaded * 100 / e.total);
//             $('.complete').css('width', per + '%')
//         }
//     });
//     $el.upload("ajaxSubmit");
// }
//lik create end

//input提示文字样式，textarea通用
function fn_focus(ele) {
    if (ele.value == ele.defaultValue) {
        ele.style = "color:#333";
        ele.value = '';
    } else {
        ele.style = "color:#333";
    }
    ;
};

function fn_blur(ele) {
    var reg = /^[s]*$/;
    if (reg.test(ele.value) || ele.value == ele.defaultValue) {
        ele.style = "color:#ccc";
        ele.value = ele.defaultValue;
    } else {
        ele.style = "color:#333";
    }
};
// 日期插件相关
function fn_blura(ele) {
    ele.style = "color:#333";
};

$(".select_list:not(.no_auto) li").die('click').live("click", function () {
    $(this).parent().parent().children(".select_input").val($(this).text());
    //添加id，by fz
    if ($(this).data('id')) {
        $(this).parent().parent().children(".select_input").data('id', $(this).data('id'));
    }
    $(this).parent().prev().prev().css("color", "#333");
});
$("input.select_input").live("click", function () {
    if ($(this).closest('div').find("ul").hasClass('select_list_to_bottom') || $(this).closest('div').find("ul").hasClass('select_list_to_top')) {
    } else {
        $("input.select_input").parent("div").children("ul").slideUp();
        if ($(this).closest('div').find("ul").css('display') == 'none') {
            $(this).closest('div').find("ul").slideDown();
        } else {
            $(this).closest('div').find("ul").slideUp();
        }
        return false;
    }
});
//添加下拉框中input不能输入
$(".select_input").attr("disabled", false);
//添加图片,图片上传控件
$(".hide_input").live("change", function () {
    var _file = $(this).val();
    var arr = _file.split('\\'); //注split可以用字符或字符串分割
    var my = arr[arr.length - 1]; //这就是要取得的图片名称
    //alert(my);
});

//$(".addimg").live("change", function () {
// ajaxSubmit($(this));
//});

$(".del_img").live("click", function () {
    $(this).parent("li").remove();
});

/*xx人头像删除*/
$(".del_img_1").live("click", function () {
    $(this).parent("li").remove();
});

//文件上传
$(".add_input").live("change", function () {
    var objUrl = getObjectURL(this.files[0]);
    var _file = $(this).val();
    var arr = _file.split('\\'); //split字符串分割
    var file_name = arr[arr.length - 1]; //文件名称
    console.log("objUrl = " + objUrl);
    if (objUrl) {
        $(this).next('.warp_name').html('<span class="file_warp">' + file_name + '</span>');
    }
    ;
    //获取文件的url
    function getObjectURL(file) {
        var url = null;
        if (window.createObjectURL != undefined) { // basic
            url = window.createObjectURL(file);
        } else if (window.URL != undefined) { // mozilla(firefox)
            url = window.URL.createObjectURL(file);
        } else if (window.webkitURL != undefined) { // webkit or chrome
            url = window.webkitURL.createObjectURL(file);
        }
        return url;
    };

});

//添加附件前置
$(".add_inputbegin").live("change", function () {
    var objUrl = getObjectURL(this.files[0]);
    var _file = $(this).val();
    var arr = _file.split('\\'); //split字符串分割
    var file_name = arr[arr.length - 1]; //文件名称
    console.log("objUrl = " + objUrl);
    if (objUrl) {
        $(this).parent().children('.warp_namebegin').html(file_name);
    }
    ;
    //获取文件的url
    function getObjectURL(file) {
        var url = null;
        if (window.createObjectURL != undefined) { // basic
            url = window.createObjectURL(file);
        } else if (window.URL != undefined) { // mozilla(firefox)
            url = window.URL.createObjectURL(file);
        } else if (window.webkitURL != undefined) { // webkit or chrome
            url = window.webkitURL.createObjectURL(file);
        }
        return url;
    };

});

//上传头像
$(".add_txBtn").live("change", function () {
    var _file = $(this).val();
    var arr = _file.split('\\');//注split可以用字符或字符串分割
    var my = arr[arr.length - 1];//这就是要取得的图片名称
});
$(".add_txBtn").live("change", function () {
    var objUrl = getObjectURL(this.files[0]);
    var _file = $(this).val();
    //alert(_file);
    var arr = _file.split('\\'); //split字符串分割
    var img_name = arr[arr.length - 1]; //图片名称
    //alert(img_name);
    console.log("objUrl = " + objUrl);
    if (objUrl) {
        $(this).parent().children(".add_tximgsrc").attr("src", objUrl);
    }
    ;
    //获取图片的url
    function getObjectURL(file) {
        var url = null;
        if (window.createObjectURL != undefined) { // basic
            url = window.createObjectURL(file);
        } else if (window.URL != undefined) { // mozilla(firefox)
            url = window.URL.createObjectURL(file);
        } else if (window.webkitURL != undefined) { // webkit or chrome
            url = window.webkitURL.createObjectURL(file);
        }
        return url;
    };

});

//弹出层树形菜单
$(".tree_box dt").live("click", function () {
    $(this).nextAll().slideToggle(100);
    $(this).children(".tree_icon").toggleClass("tree_icon_hover");
});
$(".tree_box .cite").live("click", function () {
    $(".tree_box dd").css("background", "#fff");
    $(this).css("background", "#efefef");
    var _text = $(this).text();
    //alert($(this).val(_text));
});
// 激活效果暂时写改变背景色，最后可以用改变背景图来做绝对定位到合适的地方

//内容左侧树形菜单
/*$('.hr_left_all,.hr_left_1,.hr_left_2,.hr_left_3').live("click", function () {
 //判断点击元素下有没有ul子节点，有的话展开树结构
 var next_p = $(this).next('ul');
 if (next_p.length > 0) {
 $(this).parent('ul').toggleClass("change");
 $(this).nextAll('ul').toggle();
 }
 ;
 $(this).parents(".hr_left_nav").find("cite").remove();
 $(this).append("<cite></cite>");
 });*/
//左侧列表展开收起
$('.nav_arrow').live("click", function () {
    $(this).toggleClass("nav_arrow_active");
    $(this).parents(".hr_left_nav").find("cite").remove();
    $(this).next('li').append("<cite></cite>");
    var next_p = $(this).nextAll('ul');
    var next_i = $(this).nextAll('i');
    if (next_p.length > 0) {
        $(this).nextAll('ul').toggle();
    } else if (next_i.length > 0) {
        $(this).nextAll('i').toggle();
    }
});
$('.hr_left_all,.hr_left_1,.hr_left_2,.hr_left_3').live("click", function () {
    //判断点击元素下有没有ul子节点，有的话展开树结构
    $(this).parents(".hr_left_nav").find("cite").remove();
    $(this).append("<cite></cite>");
});

//右侧详情折叠效果
$(".r_sidebar_btn").live("click", function () {
    var name_x = $(this).attr("name");
    $(".right_sidebar[name='" + name_x + "']").show(); //相对应的右侧边栏弹出
    $(".right_sidebar[name='" + name_x + "']").prev().show(); //相对应的右侧边栏遮罩层弹出
});

$(".right_sidebar_h").live("click", function () {
    $(this).hide();
    $(this).next().hide(); //隐藏DIV
});

//右侧详情弹窗tab切换，选项卡
$(".ht_slid_list ul li").live("click", function () {
    var index = $(this).index();
    $(this).attr('class', "Sideslip_list_on").siblings().attr('class', '');
    var name_x = $(this).attr("name");
    $(".ht_base_msg[name='" + name_x + "']").eq(index).fadeIn(100).siblings(".ht_base_msg[name='" + name_x + "']").hide();
});
//tab
$('.tabtitle li').live("click", function () {
    var index = $(this).index();
    $(this).attr('class', "taba tabhover xsht_qiehuan_xxl").siblings('li').attr('class', 'taba xsht_qiehuan_xxl');
    var name_x = $(this).attr("name");
    $(".tabcontent[name='" + name_x + "']").eq(index).fadeIn(100).siblings(".tabcontent[name='" + name_x + "']").hide();
});

//非ul li 的tab
$('.tab_btn').live("click", function () {
    var index = $(this).index();
    $(this).addClass('tabhover2').siblings('.tab_btn').removeClass('tabhover2');
    var name_x = $(this).attr("name");
    $(".tabcontent[name='" + name_x + "']").eq(index).fadeIn(100).siblings(".tabcontent[name='" + name_x + "']").hide();
});

//tab自动播放
/*
 var t = 0;
 var timer = setInterval(function(){
 if( t == $('.tabtitle li').length ) t = 0;
 $('.tabtitle li:eq('+t+')').click();
 t++;
 }, 700)
 });
 */
$('#test').live("click", function () {
    $(".test[flag][value='']").css({
        "border": "1px solid red",
        "background": "rgb(249, 205, 209)"
    });
});

//展开高级搜索
$(".zkgjssBtn").die('click').live("click", function () {
    var name_x = $(this).attr("name");
    $.trim($(this).html()) == "展开高级搜索" ? $(this).html("隐藏高级搜索").css({
        "background": "#22a3f3",
        "color": "#fff",
        "border-color": "#3aa2f3"
    }) : $(this).html("展开高级搜索").css({
        "background": "",
        "color": "",
        "border-color": ""
    });
    $(this).html() == "展开高级搜索" ? $('.table_head_box').height('38px') : $('.table_head_box').height('88px');
    $(".zkgjss_cont[name='" + name_x + "']").toggle(); //相对应的右侧边栏弹出
    $(window).trigger('resize');
    //$('table').css('width','100%');
});

/*$(".tanceng .zkgjssBtn").die('click').live("click", function () {
 var name_x = $(this).attr("name");
 $(this).text() == "展开高级搜索" ? $(this).text("隐藏高级搜索").css({
 "background": "#22a3f3",
 "color": "#fff",
 "border-color": "#3aa2f3"
 }) : $(this).text("展开高级搜索").css({
 "background": "",
 "color": "",
 "border-color": ""
 });
 $(this).text() == "展开高级搜索" ? $('.tanceng .table_head_box').height('38px') : $('.tanceng .table_head_box').height('88px');
 $(".tanceng .zkgjss_cont[name='" + name_x + "']").toggle(); //相对应的右侧边栏弹出
 });*/
//查看选择项
//select模拟
$(".select_specialInput").live("click", function () {
    $(this).next(".select_special_list").toggle();
})
$(".select_special_list").live("mouseleave", function () {
    $(this).hide();
});
$(".select_special_list li").live("click", function () {
    var _html = $(this).children("cite").html();
    $(this).parent().prev(".select_specialInput").children("cite").html(_html); //将点击的选项赋值到模拟input中
    $(this).parent().children().children("input[type='checkbox']").attr("checked", false); //设置其他同类元素为不选中
    $(this).children("input[type='checkbox']").attr("checked", true); //设置本身点击元素为选中
});

//选择查看项 select模拟
$('input:checkbox').live('click', function (e) {
    e.stopPropagation();
});

//选择查看项按钮
$(".ckx_btn").live("click", function () {
    var name_x = $(this).attr("name");
    $(".ckx_cont[name='" + name_x + "']").toggle();
    $(".closeckx_cont").css({'width': $('body').width(), 'height': $('body').height()}).show();
    $(this).addClass("but_blue");
    $(this).children().css("background-image", "url(static/images/eye_blue.png)");
    $(this).css("border-color", "#23a2fa");
});
$(".closeckx_cont").live("click", function () {
    $(".ckx_cont").hide();
    $(".closeckx_cont").hide();
    $(".ckx_btn").removeClass("but_blue");
    $(".ckx_btn").children().css("background-image", "");
    $(".ckx_btn").css("border-color", "");
});
$(".right_list_box").live("click", function () {
    $(".closeckx_cont").trigger('click');
});
$("#top_header_box").live("click", function () {
    $(".closeckx_cont").trigger('click');
});

//计数按钮通用js
$(".inp_plus").live("click", function () {
    var default_num = $(this).next('input').val();
    ++default_num;
    $(this).next('input').val(default_num);
});
$(".inp_reduce").live("click", function () {
    var default_num = $(this).prev('input').val();
    if (default_num != 0) {
        --default_num;
        $(this).prev('input').val(default_num);
        return;
    }
    ;
});
/*div展开隐藏 wh-0517*/
$(".box_open_btn").live("click", function () {
    $(this).toggle(function () {
        $(this).html("展开 <i class='right icon_hide'></i>");
        $(this).parent().next().slideUp(100);
    }, function () {
        $(this).html("收起 <i class='right icon_show'></i>");
        $(this).parent().next().slideDown(100);
    });
    $(this).trigger('click');
});
//作废
$(".but_void").live("click", function () {
    $(this).parent().parent().addClass("grey");
    $(this).parent().parent().children("td:first").html('<span  class="voidIcon">作废</span>');
});
//停用
$(".but_stop").live("click", function () {
    $(this).parent().parent().css("color", "#cccccc");
    $(this).parent().siblings(".sp_base_state").children("span").removeClass("c_g").addClass("c_r").text("停用");
    $(this).text("启用").removeClass("but_stop but_r").addClass("but_use but_lv");
});
//启用
$(".but_use").live("click", function () {
    // alert(111);
    $(this).parent().parent().css("color", "#666");
    $(this).parent().parent().children("td:first-child").text("停用").css("color", "#666");
    $(this).parent().siblings(".sp_base_state").children("span").removeClass("c_r").addClass("c_g").text("启用");
    $(this).text("停用").removeClass("but_use but_lv").addClass("but_stop but_r");
});
$(".but_delete:not(.no_auto_delete)").live("click", function () {
    $(this).parent().parent().remove();
});

//        全选
$(".checkAll").live("click", function () {
    var name_inp = $(this).attr("name");
    var n = $("input[name='" + name_inp + "']");
    var isChecked = $(this).context.checked;
    for (var i = 0; i < n.length; i++) {
        var x = n[i];
        if (x.disabled == true) {
            continue;
        } else {
            if (isChecked) {
                x.checked = true;
            } else {
                x.checked = false;
            }
        }
    }
});
// 右侧查看关闭
$(".slider_close").live("click", function () {
    $(this).parent().parent().hide();
    $(".right_sidebar_h").hide();
});
// 右侧查看关闭-新样式
$(".slider_head_close").live("click", function () {
    $(this).parent().parent().hide();
    $(".right_sidebar_h").hide();
});
// 分页点击效果变色
$(".page_box:not(.no_auto_render)").live("click", function () {
    $(this).siblings(".page_box").removeClass("on");
    $(this).addClass("on");
});
//手动显示弹出框
function invoke_tanceng(me, callback) {
    if ($(me).hasClass('.val_dialog')) {
        var name_x = $(me).attr("name");
        var html = $(".dialog_box[name='" + name_x + "']").parent().html(); //单页面的弹窗赋值给变量
        $(".tanceng").html(html).show(); //外层框架的div
        $(".tanceng .dialog_box").show(0);
    } else if ($(me).hasClass('.val_dialogTop')) {
        var dialog_topindex = 1;
        $(".val_dialogTop").live("click", function () {
            var name_x = $(me).attr("name");
            var html = $(".dialog_box[name='" + name_x + "']").parent().html(); //单页面的弹窗赋值给变量
            $(".tanceng").append(html).show(); //外层框架的div
            $(".tanceng .dialog_box").show();
            $(".dialog_box[name='" + name_x + "']").css({
                "z-index": "" + dialog_topindex + "",
                "position": "absolute"
            });
        });
    }
    if (callback) {
        setTimeout(function () {
            callback();
        }, 100);
    }
}
//添加鼠标按下时，按钮样式改变
$(".but_blue").live("mousedown", function () {
    $(this).addClass("on");
});
$(".but_blue").live("mouseup", function () {
    $(this).removeClass("on");
});
$(".but_yellow").live("mousedown", function () {
    $(this).addClass("on");
});
$(".but_yellow").live("mouseup", function () {
    $(this).removeClass("on");
});
$(".but_green").live("mousedown", function () {
    $(this).addClass("on");
});
$(".but_green").live("mouseup", function () {
    $(this).removeClass("on");
});
$(".but_look").live("mousedown", function () {
    $(this).addClass("on");
});
$(".but_look").live("mouseup", function () {
    $(this).removeClass("on");
});
$(".but_exit").live("mousedown", function () {
    $(this).addClass("on");
});
$(".but_exit").live("mouseup", function () {
    $(this).removeClass("on");
});
$(".but_r").live("mousedown", function () {
    $(this).addClass("on");
});
$(".but_r").live("mouseup", function () {
    $(this).removeClass("on");
});
$(".but_cancel").live("mousedown", function () {
    $(this).addClass("on");
});
$(".but_cancel").live("mouseup", function () {
    $(this).removeClass("on");
});
$(".but_small").live("mousedown", function () {
    $(this).addClass("on");
});
$(".but_small").live("mouseup", function () {
    $(this).removeClass("on");
});
$(".but_mix").live("mousedown", function () {
    $(this).addClass("on");
});
$(".but_mix").live("mouseup", function () {
    $(this).removeClass("on");
});
$(".fenye_box .page_box.on:not(.no_auto_render)").live("mousedown", function () {
    $(this).addClass("active");
});
$(".fenye_box .page_box.on:not(.no_auto_render)").live("mouseup", function () {
    $(this).removeClass("active");
});
$(".btn_chooseItem").live("mousedown", function () {
    $(this).addClass("active");
});
$(".btn_chooseItem").live("mouseup", function () {
    $(this).removeClass("active");
});
// table中图片样式
$(".order").toggle(function () {
    $(this).children(".price_icon").removeClass("down").addClass("up");
}, function () {
    $(this).children(".price_icon").removeClass("up").addClass("down");
});
//选择部门和成员的效果
/*$('.left_all,.left_1,.left_2,.left_3').live("click",function(){
 //判断点击元素下有没有ul子节点，有的话展开树结构
 var next_p = $(this).next('ul');
 if(next_p.length > 0){
 $(this).find(".icon_open").toggleClass("change_ba");
 $(this).nextAll('ul').toggle();
 };
 });*/
// lik tree open close
$('.left_all,.left_1,.left_2,.left_3').live("click", function () {
    //判断点击元素下有没有ul子节点，有的话展开树结构
    if ($(this).next('i').length > 0) {
        var next_p = $(this).next('i');
        if (next_p.length > 0) {
            $(this).find(".icon_open").toggleClass("change_ba");
            $(this).find(".oth").removeClass("change_ba");
            $(this).nextAll('i').toggle();
        }
        ;
    } else {
        var next_p = $(this).next('ul');
        if (next_p.length > 0) {
            $(this).find(".icon_open").toggleClass("change_ba");
            $(this).find(".oth").removeClass("change_ba");
            $(this).nextAll('ul').toggle();
        }
        ;
    }
});
// 人员或者部门选择
//编辑
$(".list_box_ulexit li").live("click", function (event) {
    if (!$(this).hasClass("left_all")) {
        var next_ul = $(this).next('ul');
        $(".list_box_ulexit").find("li").removeClass("on");
        $(".list_box_ulexit").find(".list_check").remove();
        $(this).addClass("on").append('<span class="list_check"><em class="on"></em></span>');
    }
    event.stopPropagation();
});
//选择上级
$(".list_box_ulexitAll li").live("click", function (event) {
    var next_ul = $(this).next('ul');
    $(".list_box_ulexitAll").find("li").removeClass("on");
    $(".list_box_ulexitAll").find(".list_check").remove();
    $(this).addClass("on").append('<span class="list_check"><em class="on"></em></span>');
    event.stopPropagation();
});

//单选
$(".list_box_uldx li").live("click", function (event) {
    var next_ul = $(this).next('ul');
    if (next_ul.length < 1) {
        $(".list_box_uldx").find("li").removeClass("on");
        $(".list_box_uldx").find(".list_check").remove();
        $(this).addClass("on").append('<span class="list_check"><em class="on"></em></span>');
    }
    event.stopPropagation();
});


////单选择人的时候
$('.list_choose_list li').live('click', function () {
    var a = $('.list_choose_list li');
    for (i = 0; i < a.length; i++) {
        $('.list_choose_list li').eq(i).children('.list_choose_select').css('background', '');
    }
    $(this).addClass('on').children('.list_choose_select').css({
        'background': 'url(static/images/select_people_yes.png)',
        'background-size': '18px'
    });
});

////多选
//$(".list_box_ul li").live("click", function(event) {
//	$(this).parents('.list_box_ul').find("li").removeClass("on");
//	$(this).addClass("on").children(".list_check").children("em").addClass("on");
//	var next_ul = $(this).next('ul');
//	if(next_ul.length > 0) {
//		if($(this).children(".list_check").children("em").hasClass("on")) {
//			$(this).parent('ul').find(".list_check").children("em").addClass("on");
//		}
//	} else {
//		if(!$(this).children(".list_check").children("em").hasClass("on")) {
//			$(this).parent('ul').siblings("li").children("em").removeClass("on");
//		}
//	}
//	event.stopPropagation();
//});
$(".list_check").live("click", function (event) {
    $(this).closest('li').trigger('click');
    event.stopPropagation();
});

//删除按钮的弹窗4.5
$(".delete_anniu").live("click", function () {
    //            alert(1111);
    $(this).parent().parent().parent().remove();
    var num = $('.tanceng').children(".dialog_box").length;
    if (num < 1) {
        $(".tanceng").hide();
    }
    ;
    //$(".but_del").parent().parent().remove();
});
// 判断table中是否有数据
// 右侧弹窗头部,更多按钮下拉
$(".slider_head_More").live("click", function () {
    $(this).next(".slider_head_list").toggle();
});
// 排序
$(".order").live("click", function () {
    $(this).toggle(function () {
        $(this).children(".price_icon").removeClass("down").addClass("up");
    }, function () {
        $(this).children(".price_icon").removeClass("up").addClass("down");
    });
    //  立即执行点击事件
    $(this).trigger('click');
});
// 选择文件上传。删除已选
$(".work_sp_base_delete").live("click", function () {
    $(this).prev("input").val("请选择附件");
});

//lik create
//选择年月js
function l_dbl(v) {
    return v > 9 ? v : '0' + v
}
var oDate = new Date();
var curYear = oDate.getFullYear();
var curMonth = oDate.getMonth() + 1;
$('.select_lik_mormal .select_lik_input').val(curYear + '-' + l_dbl(curMonth));
//select 模拟折叠
$('.select_lik_mormal').die('click').live('click', function () {
    $('.select_list_lik').not($(this).find('.select_list_lik')).slideUp(300);
    $(this).find('.select_list_lik').slideToggle(300);
    return false
});
// 左侧列表点击
$('.select_list_lik_a li').live('click', function () {
    var $_currentInput = $(this).closest('.select_lik_mormal');
    $_currentInput.find('.select_lik_input').val($(this).html() + '-');
    return false;
});
// 右侧列表点击
$('.select_list_lik_b li').live('click', function () {
    var $_currentInput = $(this).closest('.select_lik_mormal');
    if ($_currentInput.find('.select_lik_input').val().slice($_currentInput.find('.select_lik_input').val().length - 1, $_currentInput.find('.select_lik_input').val().length) == '-') {
        $_currentInput.find('.select_lik_input').val($_currentInput.find('.select_lik_input').val() + $(this).html());
    } else {
        $_currentInput.find('.select_lik_input').val($_currentInput.find('.select_lik_input').val().split('-')[0] + '-' + $(this).html());
    }
    $('.select_lik_input').nextAll('.select_list_lik').slideUp(300);
    return false;
});

//关闭图片预览弹层
$('.tanceng .image_box_slider_head>i').live('click', function () {
    $(this).closest('.dialog_box').remove();
    if ($('.tanceng .dialog_box').length == 0) {
        $(".tanceng").css('display', 'none');
    }
});
