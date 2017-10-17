//	tree list  客户分类
function tree_list(datalist) {
    var html = '';
    $.each(datalist, function (index, data) {
        html += '<ul class="hr_ul1 change">';
        //			html += '<li class="hr_left_1" cusSortId="' + data["id"] + '"><span>' + data['name'] + '&nbsp;<em class="list_num_null">(<i>'+data['children'].length+'</i>)</em></span></li>';
        html += '<li class="hr_left_1" cussortid="' + data["id"] + '"><span>' + data['name'] + '&nbsp;<em class="list_num_null">(<i></i>)</em></span></li>';
        if (data['children'] && data['children'].length > 0) {
            html += tree_list(data['children'])
        }
        html += '</li>';
        html += '</ul>'
    });
    return html
}

// 左侧列表终极版
function tree_list_close(datalist, deep) {
    var html = '';
    deep++;
    $.each(datalist, function (index, data) {
        html += '<ul class="hr_ul1 ' + (data['count'] == 0 ? 'none oth' : '') + '" ' + (deep == 1 ? '' : 'style="display: none;"') + '>' + (data['count'] == 0 ? '' : '<i class="nav_arrow"></i>') + '';
//			html += '<li class="hr_left_1" cusSortId="' + data["id"] + '"><span>' + data['name'] + '&nbsp;<em class="list_num_null">(<i>'+data['children'].length+'</i>)</em></span></li>';
        html += '<li class="hr_left_1 ' + (data['count'] == 0 ? 'none' : '') + '" cusSortId="' + data["id"] + '"><span>' + data['name'] + '&nbsp;<em class="' + (data['count'] == 0 ? 'none' : '') + '">(<i>' + data['count'] + '</i>)</em></span></li>';
        if (data['children'] && data['children'].length > 0) {
            html += tree_list_close(data['children'], deep)
        }
        html += '</li>';
        html += '</ul>'
    });
    return html
}

//	dialog tree list  弹窗
function tree_list_dialog(datalist, deep) {
    var html = '';
    $.each(datalist, function (index, data) {
        var html_i_list_before = '<i class="list_before_span"></i>';
        html += '<ul class="ul1">';
        for (var j = 0; j < deep; j++) {
            html_i_list_before += '<i class="list_before_span"></i>'
        }
        html += '<li class="left_1" cussortid = "' + data["id"] + '">' + html_i_list_before + '<span class="icon_open change_ba"></span><span class="icon_file"></span><span class="list_msg">' + data['name'] + '</span></li>';
        if (data['children'] && data['children'].length > 0) {
            html += tree_list_dialog(data['children'], deep + 1);
        }
        html += '</li>';
        html += '</ul>'
    });
    return html
}

//	dialog tree list choose dept  选择部门  多选
function tree_list_choose_dept(datalist, deep) {
    var html = '';
    $.each(datalist, function (index, data) {
        var html_i_list_before = '<i class="list_before_span"></i>';
        html += '<ul class="ul1">';
        for (var j = 0; j < deep; j++) {
            html_i_list_before += '<i class="list_before_span"></i>'
        }
        html += '<li class="left_1" deptchosenid = "' + data["id"] + '">' + html_i_list_before + '<span class="icon_open change_ba"></span><span class="icon_file"></span><span class="list_msg">' + data['name'] + '</span><span class="list_check"><em></em></span></li>';
        if (data['children'] && data['children'].length > 0) {
            html += tree_list_choose_dept(data['children'], deep + 1);
        }
        html += '</ul>';
    });
    return html
}

//选择人员
//	dialog tree list person  选择人员  单选
function tree_list_person(datalist, deep) {
    var html = '';
    $.each(datalist, function (index, data) {
        var html_i_list_before = '<i class="list_before_span"></i>';
        html += '<ul class="ul1">';
        for (var j = 0; j < deep; j++) {
            html_i_list_before += '<i class="list_before_span"></i>'
        }
        html += '<li class="left_1" cussortid = "' + data["id"] + '">' + html_i_list_before + '<span class="icon_open"></span><span class="icon_file"></span><span class="list_msg">' + data['name'] + '</span></li>';
        html += '<ul class="ul3">';
        if (data['children'] && data['children'].length > 0) {
            html += tree_list_person(data['children'], deep + 1);
        }
        $.each(data['user_info'], function (index2, data2) {
            var html_i_list_before = '<i class="list_before_span"></i>';
            for (var j = 0; j < deep + 1; j++) {
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

/*左侧有限循环树结构 - 包含部门和成员 - 终极版*/
function tree_list_dept_person(datalist) {
    var html = '';
    var bm_count = datalist['rows'].length;
    $.each(datalist['rows'], function (index, data_list) {

        if (data_list['children'].length > 0 || data_list['user_info'].length > 0) {
            html += '<ul class="hr_ul1 change"><i class="nav_arrow nav_arrow_active"></i>';
        } else {
            html += '<ul class="change"><i class="nav_arrow nav_arrow_active"></i>';
        }
        html += '<li class="hr_left_1" deepid="top_1" id="' + data_list['id'] + '"><span>' + data_list['name'] + '</span></li>';

        if (data_list['children'] && data_list['children'].length > 0) {
            bm_count += data_list['children'].length;
            $.each(data_list['children'], function (v, bmlist) {

                if (bmlist['children'].length > 0 || bmlist['user_info'].length > 0) {
                    html += '<ul class="hr_ul1 change"><i class="nav_arrow nav_arrow_active"></i>';
                } else {
                    html += '<ul class="change"><i class="nav_arrow nav_arrow_active"></i>';
                }

                html += '<li class="hr_left_1" deepid="top_2" id="' + bmlist['id'] + '"><span>' + bmlist['name'] + '</span></li>';

                if (bmlist['children'] && bmlist['children'].length > 0) {
                    bm_count += bmlist['children'].length;
                    $.each(bmlist['children'], function (i, last_list) {

                        if (last_list['children'].length > 0 || last_list['user_info'].length > 0) {
                            html += '<ul class="hr_ul1 change"><i class="nav_arrow nav_arrow_active"></i>';
                        } else {
                            html += '<ul class="change"><i class="nav_arrow nav_arrow_active"></i>';
                        }
                        html += '<li class="hr_left_1" id="' + last_list['id'] + '"><span>' + last_list['name'] + '</span></li>';
                        html += '</ul>'
                    })

                }
                html += '<ul>'
                if (bmlist['user_info'] && bmlist['user_info'].length > 0) {
                    $.each(bmlist['user_info'], function (index3, data3) {

                        html += '<li class="hr_left_bmyg2" manid="' + data3['id'] + '"> <span>' + data3['name'] + ' </span></li>';
                    })
                }
                html += '</ul>'
                html += '</ul>'
            })

        }
        html += '<ul>'
        if (data_list['user_info'] && data_list['user_info'].length > 0) {
            $.each(data_list['user_info'], function (index2, data2) {

                html += '<li class="hr_left_bmyg2" deepid="top_2" manid="' + data2['id'] + '"> <span>' + data2['name'] + ' </span></li>'
            })
        }

        html += '</ul>'
        html += '</ul>'

    })
    html += '<ul>'
    $.each(datalist['list'], function (r, vlist) {

        html += '<li class="hr_left_bmyg2" deepid="top_1" manid="' + vlist['id'] + '"> <span>' + vlist['name'] + ' </span></li>'

    })
    html += '</ul>'
    datalist['bm_count'] = bm_count;
    return html;
}


//	dialog tree list choose dept_person  选择部门下人员  多选
function tree_list_choose_dept_person(datalist, deep) {
    var html = '';
    $.each(datalist, function (index, data) {
        var html_i_list_before = '<i class="list_before_span"></i>';
        html += '<ul class="ul1">';
        for (var j = 0; j < deep; j++) {
            html_i_list_before += '<i class="list_before_span"></i>'
        }
        html += '<li class="left_1" deptchosenid = "' + data["id"] + '">' + html_i_list_before + '<span class="icon_open change_ba"></span><span class="icon_file"></span><span class="list_msg">' + data['name'] + '</span><span class="list_check"><em></em></span></li>';
        if (data['children'] && data['children'].length > 0) {
            html += tree_list_choose_dept_person(data['children'], deep + 1);
        }
        html += '<ul class="ul3" style="display:block;">';
        $.each(data['user_info'], function (index2, data2) {
            var html_i_list_before = '<i class="list_before_span"></i>';
            for (var j = 0; j < deep + 1; j++) {
                html_i_list_before += '<i class="list_before_span"></i>'
            }
            html += '<li class="left_2 person_left_nav li_person" userinfoid="' + data2['id'] + '">' + html_i_list_before + '<span class="list_msg">' + data2['name'] + ' </span><span class="list_check"><em></em></span></li>'
        });
        html += '</ul>';
        html += '</ul>';
    });
    return html
}


// 分页函数
function list_table_render_pagination(pag_block_class, params_data, get_list_fun, total_count, item_count, param_url) {
    // config
    var pagination_block_class = pag_block_class + ' ';
    var top_class = pagination_block_class;
    var _params = params_data;
    var _get_list = get_list_fun;

    // end config
    total_count = parseInt(total_count);
    var page = parseInt(_params['page']);
    var numOld = (_params['num']) ? (_params['num']) : (_params['limit']);
    var num = parseInt(numOld);

    var total_page_count = Math.ceil(total_count / num);
    $(top_class + '.select_list li').unbind('click').bind('click', function () {
        $(this).parent().parent().children(".select_input").val($(this).text());
        _params['num'] = $(this).text();
        _params['limit'] = $(this).text();
        _params['page'] = 1;
        _get_list(param_url);
    });
    //如果第一页则disable首页和上一页
    if (page == 1 && total_page_count == 1) {
        $(top_class + '.fenye_btn.nopage').removeClass('active');
        $(top_class + '.fenye_btn.page').eq(0).removeClass('active');
        $(top_class + '.fenye_btn.page').eq(1).removeClass('active');
        $(top_class + '.fenye_btn.page').eq(2).removeClass('active');
    } else if (page == 1) {
        $(top_class + '.fenye_btn.nopage').removeClass('active');
        $(top_class + '.fenye_btn.page').eq(0).removeClass('active');
        $(top_class + '.fenye_btn.page').eq(1).addClass('active');
        $(top_class + '.fenye_btn.page').eq(2).addClass('active');
    } else if (page == total_page_count) {
        $(top_class + '.fenye_btn.nopage').addClass('active');
        $(top_class + '.fenye_btn.page').eq(0).addClass('active');
        $(top_class + '.fenye_btn.page').eq(1).removeClass('active');
        $(top_class + '.fenye_btn.page').eq(2).removeClass('active');
    } else {
        $(top_class + '.fenye_btn.nopage').addClass('active');
        $(top_class + '.fenye_btn.page').eq(0).addClass('active');
        $(top_class + '.fenye_btn.page').eq(1).addClass('active');
        $(top_class + '.fenye_btn.page').eq(2).addClass('active');
    }

    if (total_page_count >= 4 && page >= 3) {
        if (total_page_count - page >= 2) {
            $(top_class + '.page_box').eq(0).text(page - 1).css('display', 'inline-block').removeClass('on');
            $(top_class + '.page_box').eq(1).text(page).css('display', 'inline-block').addClass('on');
            $(top_class + '.page_box').eq(2).text(page + 1).css('display', 'inline-block').removeClass('on');
            $(top_class + '.page_box').eq(3).text(page + 2).css('display', 'inline-block').removeClass('on');
        } else if (total_page_count - page == 1) {
            $(top_class + '.page_box').eq(0).text(page - 2).css('display', 'inline-block').removeClass('on');
            $(top_class + '.page_box').eq(1).text(page - 1).css('display', 'inline-block').removeClass('on');
            $(top_class + '.page_box').eq(2).text(page).css('display', 'inline-block').addClass('on');
            $(top_class + '.page_box').eq(3).text(page + 1).css('display', 'inline-block').removeClass('on');

        } else if (total_page_count - page == 0) {
            $(top_class + '.page_box').eq(0).text(page - 3).css('display', 'inline-block').removeClass('on');
            $(top_class + '.page_box').eq(1).text(page - 2).css('display', 'inline-block').removeClass('on');
            $(top_class + '.page_box').eq(2).text(page - 1).css('display', 'inline-block').removeClass('on');
            $(top_class + '.page_box').eq(3).text(page).css('display', 'inline-block').addClass('on');

        }
    } else {
        for (var i = 1; i <= total_page_count; i++) {
            $(top_class + '.page_box').eq(i - 1).text(i).css('display', 'inline-block').removeClass('on');
        }
        for (; i <= 4; i++) {
            $(top_class + '.page_box').eq(i - 1).css('display', 'none').removeClass('on');
        }
        $(top_class + '.page_box').eq(page - 1).addClass('on');
    }
    $(top_class + '.f_color.mLR_5:eq(0)').text(item_count);
    $(top_class + '.f_color.mLR_5:eq(1)').text(total_page_count);
    $(top_class + '.fenye_btn.nopage').unbind('click').bind('click', function () {
        _params['page'] = 1;
        _get_list(param_url);
    });
    $(top_class + '.fenye_btn.page:eq(0)').unbind('click').bind('click', function () {
        _params['page'] = page == 1 ? 1 : page - 1;
        _get_list(param_url);
    });
    $(top_class + '.fenye_btn.page:eq(1)').unbind('click').bind('click', function () {
        _params['page'] = page == total_page_count ? total_page_count : page + 1;
        _get_list(param_url);
    });
    $(top_class + '.fenye_btn.page:eq(2)').unbind('click').bind('click', function () {
        _params['page'] = total_page_count;
        _get_list(param_url);
    });
    $(top_class + '.page_box').unbind('click').bind('click', function () {
        var page = $(this).text();
        if (page == '...') {
            return;
        }
        _params['page'] = page;
        _get_list(param_url);
        return false;
    });
}

//选择查看项函数
function likShow(tableId, lookAbledField, lookAbledUlId, lookAbledSaveId, lookAbledResetId) {
    var aTh = $(tableId).find('thead th');
    var aThText = [];

    $.each(aTh, function (i, v) {
        aThText.push(v.innerText)
    });
    $.each(lookAbledField, function (i, v) {
        v.index = $.inArray(v['field'], aThText)
    });
    var html = '';
    $.each(lookAbledField, function (i, v) {
        html += '<li class="l-li-b" lookindex="' + v["index"] + '"><input type="checkbox" checked><p class="z-d-l">' + v["field"] + '</p> </li>'
    });
    $(lookAbledUlId).html(html);
    $(lookAbledSaveId).unbind('click').bind('click', function () {
        for (var i = 0; i < $(lookAbledUlId).find('input[type="checkbox"]').length; i++) {
            if ($(lookAbledUlId).find('input[type="checkbox"]').eq(i).prop('checked') == false) {
                var index = parseInt($(lookAbledUlId).find('input[type="checkbox"]').eq(i).parent().attr('lookindex'));
                for (var j = 0; j < $(tableId).find('tr').length; j++) {
                    $(tableId).find('tr').eq(j).children().eq(index).css('display', 'none')
                }
            } else {
                var index = parseInt($(lookAbledUlId).find('input[type="checkbox"]').eq(i).parent().attr('lookindex'));
                for (var j = 0; j < $(tableId).find('tr').length; j++) {
                    $(tableId).find('tr').eq(j).children().eq(index).css('display', '')
                }
            }
        }
        $(".ckx_btn").trigger("click");
        $(".closeckx_cont").trigger("click");
    });
    $(lookAbledResetId).unbind('click').bind('click', function () {
        for (var i = 0; i < $(lookAbledUlId).find('input[type="checkbox"]').length; i++) {
            $(lookAbledUlId).find('input[type="checkbox"]').eq(i).prop('checked', true)
        }
    })
}
