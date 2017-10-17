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

//返回值为空字符串或为空则用“ - ”代替函数
function likNullData(data) {
    var newData = '';
    if (data === '' || data == null || data.length == 0) {
        newData = ' - ';
    } else {
        newData = data;
    }
    return newData;
}

// 分页函数
function list_table_render_pagination(pag_block_class, params_data, get_list_fun, total_count, item_count, param_url) {
    likTableHeadFixed(pag_block_class);
    $(window).resize(function () {
        likTableHeadFixed(pag_block_class);
        $(pag_block_class).closest('.lik_table_wrap').find('.table-container').trigger('scroll');
    });
    // config
    var pagination_block_class = pag_block_class + ' ';
    var top_class = pagination_block_class;
    var _params = params_data;
    var _get_list = get_list_fun;

    $(pag_block_class).html('<span>每页显示</span>\
        <div class="inline_block select_mormal">\
        <input type="text" class="select_input" value="10">\
        <ul class="select_list select_list_to_top">\
        <li>5</li>\
        <li>10</li>\
        <li>15</li>\
        <li>20</li>\
        </ul>\
        <i></i>\
        </div>\
        <span>条</span>\
        <div class="fenye_btn first_page_valid"><span></span></div>\
        <div class="fenye_btn prev_page_valid"><span></span></div>\
        <span class="page_box on">1</span>\
        <span class="page_box">2</span>\
        <span class="page_box">3</span>\
        <span class="page_box">4</span>\
        <div class="fenye_btn next_page_valid"><span></span></div>\
        <div class="fenye_btn last_page_valid"><span></span></div>\
        <span>当前页共<cite class="f_color mLR_5">0</cite>条</span>\
        <span class="m_left_10">共<cite class="f_color mLR_5">0</cite>页</span>')
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
        $(top_class + '.fenye_btn').eq(0).removeClass('first_page_valid').addClass('first_page_invalid');
        $(top_class + '.fenye_btn').eq(1).removeClass('prev_page_valid').addClass('prev_page_invalid');
        $(top_class + '.fenye_btn').eq(2).removeClass('next_page_valid').addClass('next_page_invalid');
        $(top_class + '.fenye_btn').eq(3).removeClass('last_page_valid').addClass('last_page_invalid');
    } else if (page == 1) {
        $(top_class + '.fenye_btn').eq(0).removeClass('first_page_valid').addClass('first_page_invalid');
        $(top_class + '.fenye_btn').eq(1).removeClass('prev_page_valid').addClass('prev_page_invalid');
        $(top_class + '.fenye_btn').eq(2).removeClass('next_page_invalid').addClass('next_page_valid');
        $(top_class + '.fenye_btn').eq(3).removeClass('last_page_invalid').addClass('last_page_valid');
    } else if (page == total_page_count) {
        $(top_class + '.fenye_btn').eq(0).removeClass('first_page_invalid').addClass('first_page_valid');
        $(top_class + '.fenye_btn').eq(1).removeClass('prev_page_invalid').addClass('prev_page_valid');
        $(top_class + '.fenye_btn').eq(2).removeClass('next_page_valid').addClass('next_page_invalid');
        $(top_class + '.fenye_btn').eq(3).removeClass('last_page_valid').addClass('last_page_invalid');
    } else {
        $(top_class + '.fenye_btn').eq(0).removeClass('first_page_invalid').addClass('first_page_valid');
        $(top_class + '.fenye_btn').eq(1).removeClass('prev_page_invalid').addClass('prev_page_valid');
        $(top_class + '.fenye_btn').eq(2).removeClass('next_page_invalid').addClass('next_page_valid');
        $(top_class + '.fenye_btn').eq(3).removeClass('last_page_invalid').addClass('last_page_valid');
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
    $(top_class + '.fenye_btn').eq(0).unbind('click').bind('click', function () {
        if($(this).hasClass('first_page_invalid')) return false;
        _params['page'] = 1;
        _get_list(param_url);
    });
    $(top_class + '.fenye_btn').eq(1).unbind('click').bind('click', function () {
        if($(this).hasClass('prev_page_invalid')) return false;
        _params['page'] = page == 1 ? 1 : page - 1;
        _get_list(param_url);
    });
    $(top_class + '.fenye_btn').eq(2).unbind('click').bind('click', function () {
        if($(this).hasClass('next_page_invalid')) return false;
        _params['page'] = page == total_page_count ? total_page_count : page + 1;
        _get_list(param_url);
    });
    $(top_class + '.fenye_btn').eq(3).unbind('click').bind('click', function () {
        if($(this).hasClass('last_page_invalid')) return false;
        _params['page'] = total_page_count;
        _get_list(param_url);
    });

    //表头固定需要用到
    $(window).trigger('resize');

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

//固定表头
function likTableHeadFixed(wrapClass) {
    $(wrapClass).closest('.lik_table_wrap').find('ul.lik_table_ul').remove();
    $(wrapClass).closest('.lik_table_wrap').closest('div').css('position', 'relative');
    var $_curTable = $(wrapClass).closest('.lik_table_wrap').find('table');
    var likHtml = '';
    var likC = '';
    var likClassNone = '';
    $.each($(wrapClass).closest('.lik_table_wrap').find('table thead th'), function (i, v) {
        if ($_curTable.find('thead th').eq(i).attr('class')) {
            likC = $_curTable.find('thead th').eq(i).attr('class');
        } else {
            likC = '';
        }
        //火狐th宽度有小数
        $(wrapClass).closest('.lik_table_wrap').find('table thead th').eq(i).width(parseFloat($(wrapClass).closest('.lik_table_wrap').find('table thead th').eq(i).width()));
        likHtml += '<li class="' + likC + '">' + ($_curTable.find('thead th').eq(i).html()) + '</li>';
    });
    $('<ul/>').addClass('lik_table_ul').html(likHtml).width($_curTable.width()).prependTo($_curTable.closest('.lik_table_wrap'));
    for (var i = 0, leng = $(wrapClass).closest('.lik_table_wrap').find('table thead th').length; i < leng; i++) {
        $(wrapClass).closest('.lik_table_wrap').find('ul.lik_table_ul li').eq(i).width($(wrapClass).closest('.lik_table_wrap').find('table thead th').eq(i).width());
        if ($(wrapClass).closest('.lik_table_wrap').find('ul.lik_table_ul li').eq(i).width() == 0) {
            $(wrapClass).closest('.lik_table_wrap').find('ul.lik_table_ul li').eq(i).remove();
            i--;
        }
    }
    $(wrapClass).closest('.lik_table_wrap').find('ul.lik_table_ul li').eq(i).width($(wrapClass).closest('.lik_table_wrap').find('ul.lik_table_ul li').eq(i).width() - 2);
    $(wrapClass).closest('.lik_table_wrap').find('.table-container').scroll(function () {
        $(wrapClass).closest('.lik_table_wrap').find('ul.lik_table_ul').css('left', -$(this).scrollLeft());
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
        if (v["index"] == -1) return true;
        html += '<li class="l-li-b drag" lookindex="' + v["index"] + '"><input type="checkbox" checked><p class="z-d-l">' + v["field"] + '</p></li>'
    });
    $(lookAbledUlId).html(html);
    likDragSort(lookAbledUlId);
    $(".l-li-b").unbind('click').bind("click", function (e) {
        if ($(this).find("input").attr("checked") == 'checked') {
            $(this).find("input").attr("checked", null);
        } else {
            $(this).find("input").attr("checked", "checked");
        }
    });
    $(lookAbledSaveId).unbind('click').bind('click', function () {
        for (var i = 0; i < $(lookAbledUlId).find('input[type="checkbox"]').length; i++) {
            if ($(lookAbledUlId).find('input[type="checkbox"]').eq(i).prop('checked') == false) {
                var index = parseInt($(lookAbledUlId).find('input[type="checkbox"]').eq(i).parents('li').attr('lookindex'));
                for (var j = 0; j < $(tableId).find('tr').length; j++) {
                    $(tableId).find('tr').eq(j).children().eq(index).addClass('none');
                    $(tableId).closest('.lik_table_wrap').find('ul.lik_table_ul li').eq(index).addClass('none');
                }
            } else {
                var index = parseInt($(lookAbledUlId).find('input[type="checkbox"]').eq(i).parents('li').attr('lookindex'));
                for (var j = 0; j < $(tableId).find('tr').length; j++) {
                    $(tableId).find('tr').eq(j).children().eq(index).removeClass('none');
                    $(tableId).closest('.lik_table_wrap').find('ul.lik_table_ul li').eq(index).removeClass('none');
                }
            }
        }
        $(".ckx_btn").trigger("click");
        $(".closeckx_cont").trigger("click");
        //表格重新循环
        $.each($(tableId).find('thead tr th'), function (i, v) {
            $(tableId).closest('.lik_table_wrap').find('ul.lik_table_ul li').eq(i).width($(tableId).find('thead tr th').eq(i).width());
        });
        $(window).trigger('resize');
    });
    $(lookAbledResetId).unbind('click').bind('click', function () {
        for (var i = 0; i < $(lookAbledUlId).find('input[type="checkbox"]').length; i++) {
            $(lookAbledUlId).find('input[type="checkbox"]').eq(i).prop('checked', true)
        }
    })
}

//拖拽
function likDragSort(ulId){
    $(ulId).DDSort({
        target: 'li',		// 示例而用，默认即 li，
        delay: 100,         // 延时处理，默认为 50 ms，防止手抖点击 A 链接无效
        floatStyle: {
            'border': '1px solid #ccc',
            'background-color': '#fff'
        }
    });
}
