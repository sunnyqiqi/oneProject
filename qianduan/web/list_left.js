function change_null(a) {
    a = a.replace(/ /, "null");
    return a;
}
$(function () {
    if (localStorage.getItem("token") == null || localStorage.getItem("token") == '') {
        alert('请重新登录');
        location.href = 'login.html';
        return false;
    } else {
        var token = localStorage.getItem("token");
    }
    var usercompanyadmin = localStorage.getItem("usercompanyadmin");
    $.ajax({
        type: 'post',
        url: SERVER_URL + "/system-work/menu",
        data: {
            token: token,
            usercompany_admin: usercompanyadmin,
            role_id: loginUserInfo.role_id,
            uid: loginUserInfo.uid
        },
        dataType: 'json',
        success: function (data) {
            //业务流程
            $("#left_list").append("<div class='first_title title_126' style='display: none;'><h3 class='left_list_button'>业务流程<input class='first_title_id' type='hidden' value='126'/></h3><ul><li><p class='left_button' id='left_button_125'><em class='em_a'></em>业务流程<input class='button_id_index' type='hidden' value='125'/><input class='button_href' type='hidden' value=''><input class='button_name' type='hidden' value='业务流程'></p></li></ul></div>");
            //	var key_arr =[];
            for (var i_1_index in data.dataList) {
                $("#left_list").append("<div class='first_title title_" + data.dataList[i_1_index].id + " '><h3 class='left_list_button'><i style='background-image:url(static/images/title_icon_" + data.dataList[i_1_index].id + ".png)'></i>" + data.dataList[i_1_index].name + "<input class='first_title_id' type='hidden' value='" + data.dataList[i_1_index].id + "'/></h3><ul></ul></div>");
                // 隐藏公司信息
                if (data.dataList[i_1_index].id == 118) {
                    $(".title_118").hide();
                }
                //隐藏新手引导
                if (data.dataList[i_1_index].id == 126) {
                    $(".title_126").hide();
                }
                //二级菜单
                var second_list_index = data.dataList[i_1_index].children;
                for (var i_2_index in second_list_index) {
                    $("#left_list div:last-child ul:last-child").append("<li><p class='left_button' id='left_button_" + second_list_index[i_2_index].id + "'><em class='em_a'></em>" + second_list_index[i_2_index].name + "<input class='button_id_index' type='hidden' value='" + second_list_index[i_2_index].id + "'/><input class='button_href' type='hidden' value='" + second_list_index[i_2_index].url + "'><input class='button_name' type='hidden' value='" + second_list_index[i_2_index].name + "'></p></li>");

                    if (second_list_index[i_2_index].children && second_list_index[i_2_index].children.length != 0) {
                        $("#left_list div:last-child ul:last-child li:last-child p").removeClass("left_button").addClass("left_list_button");

                    } else {
                        $("#left_list div:last-child ul:last-child li:last-child p em").remove();
                    }
                    //三级菜单

                    var third_list_index = second_list_index[i_2_index].children;
                    for (var i_3_index in third_list_index) {

                        //	for (var key in third_list_index[i_3_index]){
                        //	var aa = key_arr.indexOf(key);

                        //	if( aa == "-1") {
                        //		key_arr.push(key);
                        //	}else{
                        //	}


                        //}
                        //隐藏管理考勤
                        if (third_list_index[i_3_index].id == 127) {
                            $(".title_127").hide();
                            continue;
                        }
                        // //隐藏出入库设置
                        // if (third_list_index[i_3_index].id == 114) {
                        //     $(".title_114").hide();
                        //     continue;
                        // }

                        $("#left_list div:last-child ul:last-child li:last-child").append("<span class='left_button' id='left_button_" + third_list_index[i_3_index].id + "'>" + third_list_index[i_3_index].name + "<input class='button_id_index' type='hidden' value='" + third_list_index[i_3_index].id + "'><input class='button_href' type='hidden' value='" + third_list_index[i_3_index].url + "'><input class='button_name' type='hidden' value='" + third_list_index[i_3_index].name + "'></span>");

                    }

                } //二级菜单end

            }
            //一级菜单end

            $(".left_button").click(function () {
                //清空内容
                if ($('.headlist>li:last-of-type').length > 0) {
                    if ($('.headlist>li:last-of-type').offset().left > ($('.headlist').width() - 100)) {
                        $('.headlist>li:nth-of-type(1)').remove();
                    }
                }
                $('.py_content_box>div').remove();

                button_id_index = $(this).children(".button_id_index").val();
                button_href_index = $(this).children(".button_href").val();
                button_name_index = $(this).children(".button_name").val();
                button_parent_id = $(this).parents(".first_title").children("h3").children(".first_title_id").val();
                add_Rload_index(button_id_index, button_parent_id);
                add_Rtitle_index(button_id_index, button_name_index);
                //$(".title_" + button_id_index + "").trigger("click");//点击左侧列表时同时激活选项卡click事件
                var length_a_index = Rtitle_Zindx_index();
                chick_title_index(button_id_index, length_a_index);
                $(".left_button").css('color', '#8f8f8f');
                $(this).css('color', '#7ec5fc');


                /*   $(this).css({"background":"url('../images/arr4.png')"});*/
                /* $(this).pre().css('background',' background: url("../images/arr4.png") no-repeat;');*/

                /*$.ajaxSetup({
                    beforeSend: function () {
                        ShowDiv()
                    },
                    complete: function () {
                        // setTimeout(function () {
                            HiddenDiv();
                        // }, 200);
                    },
                    success: function () {
                        // setTimeout(function () {
                            HiddenDiv();
                        // }, 200);
                    },
                    /!*error: function () {
                        alert('服务器响应失败,请稍后重试');
                        setTimeout(function () {
                            HiddenDiv();
                        }, 200);
                    },*!/
                    statusCode: {
                        404: function () {
                            alert('数据获取/输入失败，没有此服务。请刷新后重试');
                            HiddenDiv();
                        },
                        504: function () {
                            alert('数据获取/输入失败，服务器没有响应。请刷新后重试');
                            HiddenDiv();
                        },
                        500: function () {
                            alert('服务器有误。请刷新后重试');
                            HiddenDiv();
                        }
                    }
                });*/
                //显示加载数据
                function ShowDiv() {
                    if ($('.tanceng>.ajax_submit_loading_dialog_box').length == 0) {
                        $('.tanceng').css('display', 'block').append($('.ajax_submit_loading_dialog_box').clone().css('display', 'block'));
                    }

                    //适配屏幕宽度
                    if ($(window).width() < 1366) {
                        $('.lik_cont_title').after($('.lik_content_head').addClass('contenthead_lik'));
                        $('.lik_cont_position').css('top', '111px');
                        $('#left_list_box').css('width', '150px');
                        $('.second-level').css('width', '218px');
                        $('.rightcontent').css('left', '222px');
                        $('.second-level .cont_search').css('width', '185px');
                        $('.second-level .cont_search input').css('width', '144px');
                    }
                    //适配屏幕宽度
                }

                //隐藏加载数据
                function HiddenDiv() {
                    $(".tanceng .ajax_submit_loading_dialog_box").remove();
                    if ($('.tanceng>div').length == 0) {
                        $('.tanceng').hide();
                    }
                }
            });
            //left菜单折叠
            $("h3.left_list_button").click(function () {
                $("h3.left_list_button").nextAll().slideUp(300);
                $("h3.left_list_button").css('background', 'url("static/images/arr1.png") no-repeat 84% 20px');
                //$("#left_list .left_list_button").css('background','url("static/images/arr1.png") no-repeat 84% 20px');
                if ($(this).nextAll().is(':hidden')) {
                    $(this).css('background', 'url("static/images/arr4.png") no-repeat 84% 20px');

                    $(this).nextAll().slideDown('300');
                } else {
                    $(this).nextAll().slideUp('300');
                    $(this).css('background', 'url("static/images/arr1.png") no-repeat 84% 20px');

                };
                //$(this).nextAll().slideToggle(300);
            });
            $("p.left_list_button").die('click').live('click',function () {
                $("p.left_list_button").nextAll().slideUp(300);
                 $("p.left_list_button").children("em").addClass('em_a').removeClass('em_b');
                if ($(this).nextAll().is(':hidden')) {
                    $(this).children("em").addClass('em_b').removeClass('em_a');
                    $(this).nextAll().slideDown('300');
                } else {
                    $(this).nextAll().slideUp('300');
                    $(this).children("em").addClass('em_a').removeClass('em_b');
                };

                ////$(this).css('background-image', 'url("static/images/arr3.png") no-repeat;');
                //$(this).nextAll().slideToggle(300);
            });
            //业务流程
            $("#left_button_125").trigger('click');
        }
    });
});

////箭头切换
//$('p.left_list_button').live('click',function(){
//
//});


var button_id_index, button_href_index, button_name_index;
//点击切换
function chick_title_index(title_id_index, list_length_index) {
    list_length_index = list_length_index + 1;
    //添加当但标识
    $("#right_title ul.headlist.headlist li").removeClass("unshow_title_index").addClass("unshow_title_index").removeClass("show_title_index");
    $("#right_title ul.headlist.headlist").children(".title_" + title_id_index + "").removeClass("unshow_title_index").addClass("show_title_index");
    $(".py_content").removeClass("unshow_title_index").addClass("unshow_title_index");
    $("#py_content_" + title_id_index + "").removeClass("unshow_title_index");
    //添加当但标识end
    $("#right_title ul.headlist.headlist").children(".title_" + title_id_index + "").css("zIndex", list_length_index);
    $("#py_content_" + title_id_index + "").css("zIndex", list_length_index);
}
//删除标签
function delete_title_index(delete_Idtitle_index) {
    $(".title_" + delete_Idtitle_index + "").remove();
    $("#py_content_" + delete_Idtitle_index + "").remove();
    if ($('.headlist>li').length > 0)$('.headlist>li:first-of-type').trigger('click');
}
function Rtitle_Zindx_index() {
    //获取title_list长度
    var length_b_index;
    var titleul_length_index = $("#right_title ul.headlist.headlist li").length;
    for (length_b_index = 1; length_b_index <= titleul_length_index; length_b_index++) {
        $("#right_title ul.headlist.headlist li:nth-child(" + length_b_index + ")").css("zIndex", length_b_index);
        $(".py_content_box div:nth-child(" + length_b_index + ")").css("zIndex", length_b_index);
    }
    return length_b_index;
}
function add_Rtitle_index(title_id_index, title_name) {
    //判断title存在

    if ($("#right_title ul.headlist.headlist li").hasClass("title_" + title_id_index + "")) {
        //若存在打开所选对应的title
        var titleul_length_index = $("#right_title ul.headlist.headlist li").length;
        //for遍历title_list的li并递增添加z-index
        var length_a_index = Rtitle_Zindx_index();
        //alert(length_a_index);
        length_a_index = length_a_index++;
        //给所选title添加最大zindex
        $("#right_title ul.headlist.headlist").children(".title_" + title_id_index + "").css("zIndex", length_a_index);
        $(".py_content_box ").children("#py_content_" + title_id_index + "").css("zIndex", length_a_index);
        $("#right_title ul.headlist.headlist").children(".title_" + title_id_index + "").addClass("OnTitle_index");
    } else {
        //若不存在添加新的li
        $("#right_title ul.headlist.headlist").append("<li class='title_" + title_id_index + " unlock_delete_index'><input type='hidden' class='title_id_index' value='" + title_id_index + "'><input type='hidden' class='title_name_index' value='" + title_name + "'><span class='delete_lock_index lock'></span><i class='delete_button_index'></i>" + title_name + " </li>");
        //添加当前标识
        $("#right_title ul.headlist.headlist li").removeClass("unshow_title_index").addClass("unshow_title_index").removeClass("show_title_index");
        $("#right_title ul.headlist.headlist li:last-child").removeClass("unshow_title_index").addClass("show_title_index");
        //添加当前标识end
        $("#right_title ul.headlist.headlist li").unbind();
        $("#right_title ul.headlist.headlist li").click(function () {
            /*var click_id = $(this).children(".title_id_index").val();
             var length_a_index = Rtitle_Zindx_index();
             chick_title_index(click_id, length_a_index);*/
            var click_id = $(this).children(".title_id_index").val();
            $.each($('.button_id_index'), function (i, v) {
                if ($('.button_id_index').eq(i).val() == click_id) {
                    $('.button_id_index').eq(i).closest('.left_button').trigger('click');
                }
            })
        })
        //单独删除事件
        $("#right_title ul.headlist.headlist li i.delete_button_index").unbind();
        $("#right_title ul.headlist.headlist li i.delete_button_index").click(function () {

            if ($(this).parent("li").hasClass("unlock_delete_index")) {
                var deleteID_index = $(this).siblings(".title_id_index").val();
                delete_title_index(deleteID_index);
            }
        });
        //全部删除
        $("#Alldelete_title_index").unbind();
        $("#Alldelete_title_index").click(function () {
            $(".unlock_delete_index").remove();

        })
        //关闭其他
        $("#oTdelete_title_index").unbind();
        $("#oTdelete_title_index").click(function () {
            //alert(1) ;
            $(".unshow_title_index.unlock_delete_index").remove();
        })
        //锁定标签
        $(".delete_lock_index").unbind();
        $(".delete_lock_index").click(function () {
            var lockid_index = $(this).siblings(".title_id_index").val();
            if ($(this).parent("li").hasClass("unlock_delete_index")) {
                $(this).siblings(".delete_button_index").hide();
                $(".title_" + lockid_index + "").removeClass("unlock_delete_index");
                $("#py_content_" + lockid_index + "").removeClass("unlock_delete_index");
            } else {
                $(this).siblings(".delete_button_index").show();
                $(".title_" + lockid_index + "").addClass("unlock_delete_index");
                $("#py_content_" + lockid_index + "").addClass("unlock_delete_index");

            }
        });

    }


}

function total_menu(a) {
    var total_menu_list = {
        id_1: "system",
        id_2: "hr",
        id_3: "work",
        id_4: "vendition",
        id_5: "bargain",
        id_6: "goods",
        id_7: "purchase",
        id_8: "storage",
        id_9: "takenote",
        id_10: "finance",
        id_11: "logistics",
        id_118: "company",
        id_126: "guide"
    };
    var b = total_menu_list["id_" + a];
    return b;
}
function add_Rload_index(button_id_index, button_parent_id) {

    if ($('#py_content_' + button_id_index).length === 0) {
        $('.py_content_box').append("<div class='py_content unlock_delete_index' id='py_content_" + button_id_index + "'></div>");
    }
    ;
    var button_parent_address = total_menu(button_parent_id);
    var loaddiv = $("#py_content_" + button_id_index);
    $(loaddiv).load('static/' + button_parent_address + '/' + button_id_index + '.html');

    //添加当前标识
    $(".py_content").removeClass("unshow_title_index").addClass("unshow_title_index");
    $(".py_content_box div.py_content:last-child").removeClass("unshow_title_index");
    //添加当前标识end
}

