$(function () {
    //图片上传
    var add_imgi = 1;

    function ajaxSubmit($el) {
        var token = Admin.get_token();
        $el.upload({
            url: SERVER_URL + '/task/uploadattch',
            // 其他表单数据
            params: {
                token: token
            },
            // 上传完成后, 返回json, text
            dataType: 'json',
            onSend: function (obj, str) {
                return true;
            },
            // 上传之后回调
            onComplate: function (data) {
                $el.parent().before('<li><input class="hide_input" type="file" id="upimgFile_' + add_imgi + '"/><img class="img_src" imgurl="' + data.imgurl + '" id="imgShow_' + add_imgi + '" src="' + SERVER_URL + data.imgurl + '"/><i class="del_img">-</i></li>');
                add_imgi++;
            },
            onProgress: function (e) {
                var per = Math.round(e.loaded * 100 / e.total);
                $('.complete').css('width', per + '%')
            }
        });
        $el.upload("ajaxSubmit");
    }

    $('.tanceng .ven_sell_chance_look_gjfk_create_upload_img_btn').die('change').live('change', function () {
        ajaxSubmit($(this));
    });
    //	tree list
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

    //	dialog tree list
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

    //	dialog tree list choose dept
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

    //	tree list
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

    //选择人员
    //	dialog tree list person
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

//js实现数组转换成json
    function arrayToJson(o) {
        var r = [];
        if (typeof o == "string") return "\"" + o.replace(/([\'\"\\])/g, "\\$1").replace(/(\n)/g, "\\n").replace(/(\r)/g, "\\r").replace(/(\t)/g, "\\t") + "\"";
        if (typeof o == "object") {
            if (!o.sort) {
                for (var i in o)
                    r.push("\"" + i + "\"" + ":" + arrayToJson(o[i]));
                if (!!document.all && !/^\n?function\s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/.test(o.toString)) {
                    r.push("toString:" + o.toString.toString());
                }
                r = "{" + r.join() + "}";
            } else {
                for (var i = 0; i < o.length; i++) {
                    r.push(arrayToJson(o[i]));
                }
                r = "[" + r.join() + "]";
            }
            return r;
        }
        return o.toString();
    }

    //	dialog tree list choose dept_person
    function tree_list_choose_dept_person(datalist, deep) {
        var html = '';
        $.each(datalist, function (index, data) {
            var html_i_list_before = '<i class="list_before_span"></i>';
            html += '<ul class="ul1">';
            for (var j = 0; j < deep; j++) {
                html_i_list_before += '<i class="list_before_span"></i>'
            }
            html += '<li class="left_1" deptchosenid = "' + data["id"] + '">' + html_i_list_before + '<span class="icon_open change_ba"></span><span class="icon_file"></span><span class="list_msg">' + data['name'] + '</span><span class="list_check none"><em></em></span></li>';
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

    // 部门id和名字关联
    function getDataArr(key, val) {
        // 定义空json数组
        var newArr = [];
        // 切割字符串
        var keyArr = key.split(',');
        var valArr = val.split('、');
        // 循环
        $.each(keyArr, function (index, value) {
            newArr.push({'title': keyArr[index], 'val': valArr[index]});
        });
        // 返回json数组
        return newArr
    }

    // 跟进人、跟进人id、部门id关联
    function getDataArrArg(ownername, ownerid, deptid) {
        // 定义空json数组
        var newArr = [];
        // 切割字符串
        var ownername = ownername.split('、');
        var ownerid = ownerid.split(',');
        var deptid = deptid.split(',');
        // 循环
        $.each(ownername, function (index, value) {
            newArr.push({'ownername': ownername[index], 'ownerid': ownerid[index], 'deptid': deptid[index]});
        });
        // 返回json数组
        return newArr
    }

    // json数组去重
    function getJsonArr(arr) {
        //定义需要的空数组
        var newArr = [];
        //定义转换字符串后的数组
        var newStringArr = [];
        $.each(arr, function (i, v) {
            var sArr = JSON.stringify(v);
            if ($.inArray(sArr, newStringArr) == -1) {
                // 根据字符串数组push对象
                newStringArr.push(sArr);
                newArr.push(v)
            }
        });
        return newArr;
    }

    //字符串转数组去重
    function getStringArr(str) {
        if (str == null) {
            return;
        } else {
            var arr = str.split('、');
            var newArr = [];
            $.each(arr, function (i, v) {
                if ($.inArray(v, newArr) == -1) {
                    newArr.push(v);
                }
            });
            var newStr = newArr.join('、');
            return newStr;
        }

    }

    var token, uid, uname, pid, key, page, limit, word_titl, goods_id, goods_pid, goods_member, goods_enddate, goods_fileurl, goods_imgurl, w_p_n;
    token = Admin.get_token();
    //token = '2017052516045457073-1-1';
    uid = Admin.get_uid();
    uname = loginUserInfo.username;
    var deptid = loginUserInfo.department_id;
    //	补零函数
    function l_dbl(x) {
        return x < 10 ? '0' + x : x
    }

    //获取当前系统时间
    function getCurrentDate() {
        var oDate = new Date();
        var sTime = '';
        sTime = oDate.getFullYear() + '-' + l_dbl(oDate.getMonth() + 1) + '-' + l_dbl(oDate.getDate()) + '&nbsp;&nbsp;&nbsp;' + l_dbl(oDate.getHours()) + ':' + l_dbl(oDate.getMinutes()) + ':' + l_dbl(oDate.getSeconds());
        return sTime
    }

    //权限部分
    if (loginUserInfo['company_admin'] != 1) {
        var venSellChancePowerList = loginUserInfo['powerUrls'];
        //查看团队机会
        var venSellChanceTeam = 'customer-chance/team';
        var venSellChanceAllList = 'customer-chance/list';

        if ($.inArray(venSellChanceTeam, venSellChancePowerList) == -1 && $.inArray(venSellChanceAllList, venSellChancePowerList) == -1) {
            $('#ven_sell_chance_tab').html('<li name="table_xs_xsjh" class="taba" id="ven_sell_chance_getminelist" needurl="/customer-chance/mylist">我的销售机会</li>\
                <li name="table_xs_xsjh" class="taba" id="ven_sell_chance_getcopylist" needurl="/customer-chance/copylist">汇报我的</li>');
        } else if ($.inArray(venSellChanceTeam, venSellChancePowerList) == -1 && $.inArray(venSellChanceAllList, venSellChancePowerList) != -1) {
            $('#ven_sell_chance_tab').html('<li name="table_xs_xsjh" class="taba tabhover" id="ven_sell_chance_getall" needurl="/customer-chance/list">全部</li>\
                <li name="table_xs_xsjh" class="taba" id="ven_sell_chance_getminelist" needurl="/customer-chance/mylist">我的销售机会</li>\
                <li name="table_xs_xsjh" class="taba" id="ven_sell_chance_getcopylist" needurl="/customer-chance/copylist">抄送我的</li>');
        } else if ($.inArray(venSellChanceTeam, venSellChancePowerList) != -1 && $.inArray(venSellChanceAllList, venSellChancePowerList) == -1) {
            $('#ven_sell_chance_tab').html('<li name="table_xs_xsjh" class="taba" id="ven_sell_chance_getteamlist" needurl="/customer-chance/teamlist">团队销售机会</li>\
                <li name="table_xs_xsjh" class="taba" id="ven_sell_chance_getminelist" needurl="/customer-chance/mylist">我的销售机会</li>\
                <li name="table_xs_xsjh" class="taba" id="ven_sell_chance_getcopylist" needurl="/customer-chance/copylist">抄送我的</li>');
        } else if ($.inArray(venSellChanceTeam, venSellChancePowerList) != -1 && $.inArray(venSellChanceAllList, venSellChancePowerList) != -1) {
            $('#ven_sell_chance_tab').html('<li name="table_xs_xsjh" class="taba tabhover" id="ven_sell_chance_getall" needurl="/customer-chance/list">全部</li>\
                <li name="table_xs_xsjh" class="taba" id="ven_sell_chance_getteamlist" needurl="/customer-chance/teamlist">团队销售机会</li>\
                <li name="table_xs_xsjh" class="taba" id="ven_sell_chance_getminelist" needurl="/customer-chance/mylist">我的销售机会</li>\
                <li name="table_xs_xsjh" class="taba" id="ven_sell_chance_getcopylist" needurl="/customer-chance/copylist">抄送我的</li>');
        }

    }

    // 选择查看项
    //定义查看项
    var venSellChandeLookAbledField = [
        {'index': null, 'field': '预计成交日期'},
        {'index': null, 'field': '预计金额(元)'},
        {'index': null, 'field': '跟进次数'},
        {'index': null, 'field': '最后跟进时间'},
        {'index': null, 'field': '负责部门'},
        {'index': null, 'field': '跟进人'},
        {'index': null, 'field': '创建人'},
        {'index': null, 'field': '创建时间'}
    ];
    likShow('#ven_sell_chance_table', venSellChandeLookAbledField, '#ven_sell_chance_look_ul', '#ven_sell_chance_look_save', '#ven_sell_chance_look_reset');

    // 定义销售机会参数
    var sellChanceData = {
        token: token,
        page: 1, // 页面
        num: 10, // 每页条数
        key: '', // 关键字
        status: '', // 销售状态 0进行中1成交2未成交
        dept: '', // 负责部门
        uid: uid, // 创建人
        owner: '', // 跟进人
        is_invalid: 0 // 0 正常 1作废 空是所有
    };
    //全部销售机会
    $('#ven_sell_chance_getall').die('click').live('click', function () {
        sellChanceData.page = 1;
        getSellChanceList('/customer-chance/list');
    });
    //团队销售机会
    $('#ven_sell_chance_getteamlist').die('click').live('click', function () {
        sellChanceData.page = 1;
        getSellChanceList('/customer-chance/teamlist');
    });
    //我的销售机会
    $('#ven_sell_chance_getminelist').die('click').live('click', function () {
        sellChanceData.page = 1;
        getSellChanceList('/customer-chance/mylist');
    });
    //抄送我的销售机会
    $('#ven_sell_chance_getcopylist').die('click').live('click', function () {
        sellChanceData.page = 1;
        getSellChanceList('/customer-chance/copylist');
    });
    $('#ven_sell_chance_tab li:nth-of-type(1)').trigger('click');
    // 获取销售机会列表
    function getSellChanceList(url) {
        $.ajax({
            url: SERVER_URL + url,
            type: 'GET',
            data: sellChanceData,
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    //获取datalist
                    var datalist = oE.datalist;
                    console.log(datalist);
                    //搜索总条数
                    $('#ven_sell_chance_search_total').html(oE.totalcount);
                    if (datalist.length == 0) {
                        $('.ven_sell_chance_nodata_box').removeClass('none');
                        $('.ven_sell_chance_handle').addClass('none')
                    } else {
                        $('.ven_sell_chance_nodata_box').addClass('none');
                        $('.ven_sell_chance_handle').removeClass('none')
                    }
                    if (url == '/customer-chance/copylist') {
                        var copyInvalidBtn = 'none';
                        var lookCopy = 'copy';
                    } else {
                        var copyInvalidBtn = '';
                        var lookCopy = 'my';
                    }
                    //字符串拼接
                    var sellChanceHtml = '';
                    var sellChanceSort = '';
                    var sellChanceSortClass = '';
                    var statusClass = '';
                    var statusName = '';
                    var sellChanceOperateBtn = '';
                    $.each(datalist, function (i, v) {
                        //对不同值进行判断
                        //作废状态判断
                        if (v['is_invalid'] == 1) {
                            sellChanceSortClass = 'grey';
                            sellChanceSort = '<span class="voidIcon">作废</span>';
                            sellChanceOperateBtn = '';
                            //成交状态
                            statusClass = 'grey';
                            statusName = '已作废';
                        } else {
                            sellChanceSortClass = '';
                            sellChanceSort = l_dbl(i + 1);
                            sellChanceOperateBtn = '<button class="but_cancel but_mix val_dialogTop but_exit ven_sell_chance_edit none" name="vendition_xsjh_exit">编辑</button><button class="but_mix but_void but_r ' + copyInvalidBtn + ' ven_sell_chance_invalid_btn">作废</button>';
                            //判断成交状态
                            if (v['status'] == 0) {
                                statusClass = 'c_y';
                                statusName = '进行中';
                            } else if (v['status'] == 1) {
                                statusClass = 'c_g';
                                statusName = '成交';
                            } else if (v['status'] == 2) {
                                statusClass = 'c_r';
                                statusName = '未成交';
                            } else if (v['status'] == 3) {
                                statusClass = 'c_c';
                                statusName = '无效';
                            }
                        }
                        sellChanceHtml += '<tr sellchanceuid="' + v['uid'] + '" sellchanceid="' + v['id'] + '" class="' + sellChanceSortClass + '">\
                            <td>' + sellChanceSort + '</td>\
                            <td>' + (v['name']) + '</td>\
                            <td>' + (v['expected_at'].split(' ')[0]) + '</td>\
                            <td>' + (v['expected_money']) + '</td>\
                            <td><span class="' + statusClass + '">' + statusName + '</span></td>\
                            <td>' + (v['step_name']) + '</td>\
                            <td>' + (v['track_num']) + '</td>\
                            <td>' + (v['track_date'].split(' ')[0]) + '</td>\
                            <td>' + getStringArr(v['dept_name']) + '</td>\
                            <td>' + (v['owner_name']) + '</td>\
                            <td>' + (v['copy_name']) + '</td>\
                            <td>' + (v['created_at'].split(' ')[0]) + '</td>\
                            <td><button class="but_cancel but_mix r_sidebar_btn but_look ven_sell_chance_look" name="vendition_xsjh_rights" lookcopy="' + lookCopy + '">查看</button>' + sellChanceOperateBtn + '</td>\
                        </tr>';
                    });
                    //销售机会数据渲染
                    $('#ven_sell_chance_list').html(sellChanceHtml);

                }
                //分页
                list_table_render_pagination('.ven_sell_chance_all_page', sellChanceData, getSellChanceList, oE.totalcount, datalist.length, url);
                $('#ven_sell_chance_look_save').trigger('click')
            }
        });
    }

    //刷新列表
    $('#ven_sell_chance_refresh').die('click').live('click', function () {
        sellChanceData = {
            token: token,
            page: 1, // 页面
            num: 10, // 每页条数
            keywords: '', // 关键字
            status: '', // 销售状态 0进行中1成交2未成交
            dept: '', // 负责部门
            uid: uid, // 创建人
            owner: '', // 跟进人
            is_invalid: 0 // 0 正常 1作废 空是所有
        };
        sellChanceData.page = 1;
        sellChanceData.keywords = '';
        sellChanceData.is_invalid = 0;
        $('#ven_sell_chance_noShow').find('input:checkbox').attr('checked', 'checked');
        $('#ven_sell_chance_searKey').val('搜索销售机会').css('color', '#CCCCCC');
        $('#ven_sell_chance_search_dept_inp').val('负责部门').css('color', '#CCCCCC');
        $('#ven_sell_chance_search_uname_inp').val('汇报人').css('color', '#CCCCCC');
        $('#ven_sell_chance_search_updataname_inp').val('跟进人').css('color', '#CCCCCC');
        $('#ven_sell_chance_search_status_inp').val('状态').css('color', '#CCCCCC');
        $('.ven_sell_chance_all_page .select_input').val('10');
        getSellChanceList($('#ven_sell_chance_tab .tabhover').attr('needurl'));
    });

    //搜索关键字
    $('#ven_sell_chance_searKey_btn').die('click').live('click', function () {
        if ($('#ven_sell_chance_searKey').val() == '搜索销售机会') {
            sellChanceData.keywords = '';
        } else {
            sellChanceData.keywords = $('#ven_sell_chance_searKey').val();
        }
        getSellChanceList($('#ven_sell_chance_tab .tabhover').attr('needurl'));
    });

    //高级搜索
    $('.ven_sell_chance_zkgjss').die('click').live('click', function () {
        if ($(this).text() != '展开高级搜索') {
            //部门
            $.ajax({
                url: SERVER_URL + '/common/search',
                type: 'GET',
                data: {
                    token: token,
                    big_type: 6,
                    small_type: 'dept'
                },
                dataType: 'json',
                success: function (oE) {
                    if (oE.code == 0) {
                        console.log(oE);
                        var datalist = oE.data;
                        var searchList = '';
                        $.each(datalist, function (i, v) {
                            searchList += '<li searchid="' + v['id'] + '">' + v['name'] + '</li>';
                        });
                        $('#ven_sell_chance_search_dept_ul').html(searchList);
                    }
                }
            });
            //跟进人
            $.ajax({
                url: SERVER_URL + '/common/search',
                type: 'GET',
                data: {
                    token: token,
                    big_type: 6,
                    small_type: 'owner'
                },
                dataType: 'json',
                success: function (oE) {
                    if (oE.code == 0) {
                        console.log(oE);
                        var datalist = oE.data;
                        var searchList = '';
                        $.each(datalist, function (i, v) {
                            searchList += '<li searchid="' + v['id'] + '">' + v['name'] + '</li>';
                        });
                        $('#ven_sell_chance_search_owner_ul').html(searchList);
                    }
                }
            });
            //汇报人
            $.ajax({
                url: SERVER_URL + '/common/search',
                type: 'GET',
                data: {
                    token: token,
                    big_type: 6,
                    small_type: 'copy_list'
                },
                dataType: 'json',
                success: function (oE) {
                    if (oE.code == 0) {
                        console.log(oE);
                        var datalist = oE.data;
                        var searchList = '';
                        $.each(datalist, function (i, v) {
                            searchList += '<li searchid="' + v['id'] + '">' + v['name'] + '</li>';
                        });
                        $('#ven_sell_chance_search_copy_list_ul').html(searchList);
                    }
                }
            });
        }

    });

    // 搜索应用部门
    $('#ven_sell_chance_search_dept_ul li').die('click').live('click', function () {
        sellChanceData.dept = $(this).attr('searchid');
        getSellChanceList($('#ven_sell_chance_tab .tabhover').attr('needurl'));
    });
    //搜索跟进人
    $('#ven_sell_chance_search_owner_ul li').die('click').live('click', function () {
        sellChanceData.owner = $(this).attr('searchid');
        getSellChanceList($('#ven_sell_chance_tab .tabhover').attr('needurl'));
    });
    //搜索汇报人
    $('#ven_sell_chance_search_copy_list_ul li').die('click').live('click', function () {
        sellChanceData.copy_list = $(this).attr('searchid');
        getSellChanceList($('#ven_sell_chance_tab .tabhover').attr('needurl'));
    });
    //搜索 状态
    $('#ven_sell_chance_search_status_ul li').die('click').live('click', function () {
        sellChanceData.status = $(this).index();
        getSellChanceList($('#ven_sell_chance_tab .tabhover').attr('needurl'));
    });
    //不显示作废状态
    $('#ven_sell_chance_noShow').live('click', function () {
        if ($(this).attr('checked') == 'checked') {
            sellChanceData.is_invalid = 0;
            //$('#ven_sell_chance_search_status_inp').val('状态').css('color', '#CCCCCC');
        } else {
            sellChanceData.is_invalid = '';
        }
        getSellChanceList($('#ven_sell_chance_tab .tabhover').attr('needurl'));
    });

    //作废操作
    $('.ven_sell_chance_invalid_btn').die('click').live('click', function () {
        sellChanceId = $(this).closest('tr').attr('sellchanceid');
        $.ajax({
            url: SERVER_URL + '/customer-chance/setstatus',
            type: 'POST',
            data: {
                token: token,
                chance_id: sellChanceId,//  销售机会id
                status_flag: 1
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    getSellChanceList($('#ven_sell_chance_tab .tabhover').attr('needurl'));
                    $('.ven_sell_chance_invalid_btn').closest('.dialog_box').remove();
                    $('.tanceng').css('display', 'none')
                } else {
                    alert('操作失败')
                }
            }
        });
    });

    //删除操作
    var sellChanceId = '';
    var sellChanceUid = '';
    $('.lik_sell_chance_btn_del').die('click').live('click', function () {
        sellChanceId = $(this).closest('tr').attr('sellchanceid');
        $('#ven_sell_chance_del_inp').val(sellChanceId);
    });
    $('.ven_sell_chance_del_btn_submit').die('click').live('click', function () {
        $.ajax({
            url: SERVER_URL + '/customer-chance/del',
            type: 'POST',
            data: {
                token: token,
                chance_id: $('#ven_sell_chance_del_inp').val()//  销售机会id
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    getSellChanceList($('.tabhover').attr('needurl'));
                    $('.ven_sell_chance_del_btn_submit').closest('.dislog').remove();
                    $('.tanceng').css('display', 'none')
                } else {
                    alert('操作失败')
                }
            }
        })
    });

    //查看操作
    $('.ven_sell_chance_look').die('click').live('click', function () {
        //默认显示基本信息
        $('.Sideslip_list ul li:first-of-type').trigger('click');
        sellChanceId = $(this).closest('tr').attr('sellchanceid');
        sellChanceUid = $(this).closest('tr').attr('sellchanceuid');
        //我的和抄送我的切换
        var onOff = true;
        if ($(this).attr('lookcopy') == 'my') {
            onOff = true;
        } else if ($(this).attr('lookcopy') == 'copy') {
            onOff = false;
        }
        $.ajax({
            url: SERVER_URL + '/customer-chance/info',
            type: 'GET',
            data: {
                token: token,
                uid: uid,
                chance_id: sellChanceId//  销售机会id
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var data = oE.data;
                    //部门去掉首尾，
                    if (data.dept.charAt(0) == ',') {
                        data.dept = data.dept.slice(1);
                    }
                    if (data.dept.charAt(data.dept.length - 1) == ',') {
                        data.dept = data.dept.slice(0, venSellChanceCreateData.dept.length - 1);
                    }
                    //更多操作列表
                    $('#ven_sell_chance_look_more').css('display', 'none');
                    if (onOff) {
                        if (data['is_invalid'] == 0) {
                            $('#ven_sell_chance_more_btn').css('display', 'block');
                            //当前销售状态
                            if (data['status'] != 0) {
                                $('.ven_sell_chance_look_gjfk_list').css('display', 'none');
                                $('.ht_base_msgCon').css('bottom', '0');
                            } else {
                                $('.ven_sell_chance_look_gjfk_list').css('display', 'block');
                                $('.ht_base_msgCon').css('bottom', '60px');
                            }
                        } else if (data['is_invalid'] == 1) {
                            $('#ven_sell_chance_more_btn').css('display', 'none');
                            $('.ven_sell_chance_look_gjfk_list').css('display', 'none');
                            $('.ht_base_msgCon').css('bottom', '0');
                        }
                    } else {
                        $('#ven_sell_chance_more_btn').css('display', 'none');
                        $('.ven_sell_chance_look_gjfk_list').css('display', 'none');
                        $('.ht_base_msgCon').css('bottom', '0');
                    }

                    //客户名称
                    $('.ven_sell_chance_look_name').html(data['name']);
                    //预计成交日期
                    $('#ven_sell_chance_look_expected_at').html(data['expected_at'].split(' ')[0]);
                    //预计金额
                    $('#ven_sell_chance_look_expected_money').html(data['expected_money']);
                    //销售状态
                    $('.ven_sell_chance_look_flow_status_name').html(data['flow_status_name']);
                    //销售阶段
                    $('#ven_sell_chance_look_step_name').html(data['step_name']);
                    //跟进次数
                    $('#ven_sell_chance_look_track_num').html(data['track_num']);
                    //最后跟进时间
                    $('#ven_sell_chance_look_track_date').html(data['track_date'].split(' ')[0]);
                    //负责部门
                    $('#ven_sell_chance_look_dept_name').html(data['dept_name']);
                    //跟进人
                    $('#ven_sell_chance_look_owner_name').html(data['owner_name']);
                    //创建人
                    $('#ven_sell_chance_look_uname').html(data['uname']);
                    //创建人
                    $('#ven_sell_chance_look_created_at').html(data['created_at'].split(' ')[0]);
                    //抄送人
                    $('#ven_sell_chance_look_copy_name').html(data['copy_name']);
                    //跟进客户内信息
                    //部门
                    $('#ven_sell_chance_look_dept').html(data['dept_name']);
                    //跟进人
                    $('#ven_sell_chance_look_owner').html(data['owner_name']);
                    // 自定义字段
                    if (data.customfields != '') {
                        var venSellChanceFieldHtml = '';
                        $.each(data.customfields, function (i, v) {
                            venSellChanceFieldHtml += '<p class="l-s-x" style="margin-top: 10px;">' + v['title'] + '：<span>' + v['val'] + '</span></p>'
                        });
                        $('.ven_sell_chance_look_field_box').html(venSellChanceFieldHtml);
                    }

                } else {
                    alert('操作失败')
                }
            }
        })
    });

    //跟进客户
    $('#ven_sell_chance_look_track').die('click').live('click', function () {
        sellChanceLookTrack(sellChanceUid, sellChanceId);
    });
    // 跟进客户函数
    function sellChanceLookTrack(sellChanceUid, sellChanceId) {
        $.ajax({
            url: SERVER_URL + '/customer-chance/trackinfo',
            type: 'GET',
            data: {
                token: token,
                uid: sellChanceUid,
                chance_id: sellChanceId//  销售机会id
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var data = oE.flow_steps;
                    var aStep = [];
                    var curStep = 0;
                    $.each(data, function (i, v) {
                        aStep.push(v['id']);
                    });
                    curStep = $.inArray(oE['current_step'].toString(), aStep);
                    //根据当前所在阶段判断按钮显示隐藏
                    if (curStep < data.length - 1) {
                        $('.ven_sell_chance_look_track_gjfk_btn').css('display', 'inline-block');
                        $('.ven_sell_chance_look_track_jrxyjd_btn').css('display', 'inline-block');
                        $('.ven_sell_chance_look_track_wcgj_btn').css('display', 'none');
                    } else if (curStep == data.length - 1) {
                        $('.ven_sell_chance_look_track_gjfk_btn').css('display', 'none');
                        $('.ven_sell_chance_look_track_jrxyjd_btn').css('display', 'none');
                        $('.ven_sell_chance_look_track_wcgj_btn').css('display', 'inline-block');
                    }
                    var venSellChanceLookFlow = '';
                    var venSellChanceLookTrackFlowDivs = '';
                    var currentStepClass = '';
                    $.each(data, function (i, v) {
                        currentStepClass = '';
                        if (i < curStep) {
                            currentStepClass = 'xs_khbf_grey';
                        } else if (i == curStep) {
                            currentStepClass = 'sale_saleflow_circle_On';
                        }
                        venSellChanceLookFlow += '<li>\
                                                        <span class="sale_saleflow_circle ' + currentStepClass + '" name="xs_xsjh_gjstep' + (i + 1) + '">' + (i + 1) + '</span>\
                                                        <hr class="sale_saleflow_circleLine" style="display: ' + (i == (data.length - 1) ? 'none' : 'block') + ';">\
                                                        <div class="xs_xsjh_num" style="display: ' + (i == (curStep) ? 'block' : 'none') + ';">' + v['track'].length + '次跟进<i></i></div>\
                                                    </li>';
                        //跟进反馈  已有评论
                        var venSellChanceLookTrackDivs = '';
                        $.each(v['track'], function (i2, v2) {
                            var venSellChanceLookTrackCommits = '';
                            $.each(v2['commit_log'], function (i3, v3) {
                                venSellChanceLookTrackCommits += '<div class="work_rsp_text rsp_text">' +
                                    '<img class="tx" src="' + getImgUrl(v3['face']) + '" style="margin-top: 4px;">' +
                                    '<div class="work_wfqd_pl">' +
                                    '<p><span class="c_3 m_right_10">' + v3['uname'] + '</span>' + v3['created_at'] + '</p>' +
                                    '<h3 class="inline_block m_right_20" style="margin-top: 6px;">' + v3['content'] + '</h3>' +
                                    '</div>' +
                                    '<button class="but_normal right c_r work_but_sc" style="margin-top: 27px;" name="vendition_khbf_sc">删除</button>' +
                                    '</div><div class="vendtion_hr" style="display: ' + (i3 == (v2['commit_log'].length - 1) ? 'none' : 'block') + ';"></div>'
                            });
                            //图片
                            var imgUrl = '';
                            $.each(v2['imgurl'], function (i3, v3) {
                                imgUrl += '<img src="' + getImgUrl(v3) + '" alt="图片" class="val_dialog ' + (v2['imgurl'].length > 0 ? '' : 'none') + '" name="vendition_khbf_imglist" style="border-radius: 3px; width:100%;">';
                            });
                            venSellChanceLookTrackDivs += '<div trackid="' + v2['id'] + '" class="work_report_exitBox work_report_date vendition_bfjl ven_sell_chance_look_track_box" name="report_all" style="margin-bottom:20px;">\
                            <div class="work_report_head">\
                            <div class="work_report_detHead clearfix inline_block" style="padding:0;">\
                            <span class="left m_top_5 m_left_5" style="background: url(' + getImgUrl(v2['face']) + ') no-repeat;background-size:100% 100%;"></span>\
                            <div class="work_report_personMsg left">\
                            <p>' + v2['uname'] + '</p>\
                            <p>' + v2['thedate'].split(' ')[0] + '</p>\
                        </div>\
                        </div>\
                        </div>\
                            <div class="work_report_det vendition_khbf1">\
                            <div class="work_report_detCon">\
                            <p>' + v2['content'] + '</p>\
                        </div>\
                        <div class="work_report_upload vendition_khbf2" style="width:96%;">' + imgUrl + '</div>\
                            </div>\
                            </div>';
                        });
                        /*  编辑和删除
                         <div class="work_report_headBtn">\
                         <button class="but_small val_dialog but_exit" name="xs_xsjh_gjfk">编辑</button><button class="but_small but_r val_dialog ven_sell_chance_look_track_del" name="vendition_xsjh_scgjjl">删除</button>\
                         </div>\
                         */

                        /*  评论
                         <div class="work_report_comment">\
                         <div class="work_report_commentBtn">\
                         <button class="but_small but_look right work_report_Comment" name="xs_xsjh_Comment">评论 <i>(' + v2['commit_log'].length + ')</i></button>\
                         <!--<button class="but_small but_look right work_report_Comment" name="xs_xsjh_Comment">评论 <i>(1)</i></button><button class="but_small but_exit right work_report_Visitor" name="xs_xsjh_Comment">谁看过 <i>(1)</i></button>-->\
                         </div>\
                         <div style="margin-right:7px;">\
                         <!--评论-->\
                         <div class="work_report_commentCon" name="xs_xsjh_Comment" style="display: none;padding-right:14px;">\
                         <em class="work_report_comment_icon" style="right:27px;"></em>\
                         <label class="inp_box clearfix" style="margin-top:0;">\
                         <input type="text" class="left xs_glbf_plInp" value="写评论" onfocus="fn_focus(this);" onblur="fn_blur(this);" >\
                         <button class="work_report_commentBut but_blue sell_chance_look_track_commit_add_submit" style="margin-left:12px;">发送</button>\
                         </label>\
                         <div class="v_rsp_item rsp_item">' + venSellChanceLookTrackCommits + '\
                         </div>\
                         </div>\
                         </div>\
                         </div>\*/

                        venSellChanceLookTrackFlowDivs += '<div class="xs_xsjh_step" name="xs_xsjh_gjstep' + (i + 1) + '" style="display: ' + (i == 0 ? 'block' : 'none') + ';">\
                                                                <p class="l-s-x"><h4 style="display: inline-block; font-size: 14px;">阶段' + (i + 1) + '：<span>' + v['name'] + '</span></h4>\
                                                            <hr class="xs_xslc_hrLine"/><span class="f_color">赢率：' + v['win_rate'] + '%</span></p>\
                                                            <h4 class="">阶段要求</h4>\
                                                                <p>' + v['content'] + '</p>\
                                                                <h4 class="">提醒</h4>\
                                                                <p>停留' + v['days'] + '天</p>\
                                                            <div style="margin-top:20px;">\
                            <h3 class="cont_title">跟进反馈</h3>\
                            <div class="ven_sell_chance_track_history">' + venSellChanceLookTrackDivs + '</div>\
                            </div></div>'
                    });
                    $('#ven_sell_chance_look_track_flow_ul').html(venSellChanceLookFlow);
                    $('#ven_sell_chance_look_track_flow_divs').html(venSellChanceLookTrackFlowDivs);

                    //跟进反馈、进入下一阶段、完成跟进  按钮
                    $('#ven_sell_chance_look_track_flow_ul li .sale_saleflow_circle').die('click').live('click', function () {
                        if ($(this).hasClass('xs_khbf_grey')) {
                            $('.ven_sell_chance_look_track_gjfk_btn').css('display', 'none');
                            $('.ven_sell_chance_look_track_jrxyjd_btn').css('display', 'none');
                            $('.ven_sell_chance_look_track_wcgj_btn').css('display', 'none');
                        } else if ((!$(this).hasClass('xs_khbf_grey')) && ($(this).closest('li').index() != data.length - 1)) {
                            $('.ven_sell_chance_look_track_gjfk_btn').css('display', 'inline-block');
                            $('.ven_sell_chance_look_track_jrxyjd_btn').css('display', 'inline-block');
                            $('.ven_sell_chance_look_track_wcgj_btn').css('display', 'none');
                        } else if ((!$(this).hasClass('xs_khbf_grey')) && ($(this).closest('li').index() == data.length - 1)) {
                            $('.ven_sell_chance_look_track_gjfk_btn').css('display', 'none');
                            $('.ven_sell_chance_look_track_jrxyjd_btn').css('display', 'none');
                            $('.ven_sell_chance_look_track_wcgj_btn').css('display', 'inline-block');
                        }
                    });
                    $('.sale_saleflow_circle_On').trigger('click');

                    //添加跟进反馈
                    $('.tanceng .ven_sell_chance_addtrack_submit').die('click').live('click', function () {
                        if ($('.tanceng .ven_sell_chance_addtrack_content').val() == '请输入反馈内容') {
                            alert('请输入反馈内容');
                            return false;
                        } else {
                            var trackContent = $('.tanceng .ven_sell_chance_addtrack_content').val();
                        }
                        var venSellChanceAddtractTime = '';
                        if ($('.tanceng .ven_sell_chance_addtrack_time').val() == '选择日期') {
                            alert('请选择日期')
                            return false;
                        } else {
                            venSellChanceAddtractTime = $('.tanceng .ven_sell_chance_addtrack_time').val();
                        }
                        //图片
                        var venSellChanceAddTractImg = '';
                        $.each($('.tanceng .img_warp>li'), function (i, v) {
                            venSellChanceAddTractImg += $('.tanceng .img_warp>li').eq(i).find('img').attr('imgurl') + ',';
                        });
                        venSellChanceAddTractImg = venSellChanceAddTractImg.substr(0, venSellChanceAddTractImg.length - 1);
                        $.ajax({
                            url: SERVER_URL + '/customer-chance/addtrack',
                            type: 'POST',
                            data: {
                                token: token,
                                track_id: 0,
                                chance_id: sellChanceId,
                                steps_id: oE['current_step'],
                                uid: uid,
                                thedate: venSellChanceAddtractTime,
                                content: trackContent,
                                imgurl: venSellChanceAddTractImg
                            },
                            dataType: 'json',
                            success: function (oE) {
                                if (oE.code == 0) {
                                    $('#ven_sell_chance_look_track').trigger('click');
                                    $('.tanceng').css('display', 'none').children('.dialog_box').remove();
                                } else {
                                    alert(oE.msg);
                                }
                            }
                        });
                    });
                } else {
                    alert('操作失败')
                }
                //进入下一阶段
                $('.ven_sell_chance_look_track_jrxyjd_save_btn').die('click').live('click', function () {
                    $.ajax({
                        url: SERVER_URL + '/customer-chance/changestep',
                        type: 'POST',
                        data: {
                            token: token,
                            chance_id: sellChanceId,
                            uid: uid,
                            step: oE['current_step']
                        },
                        dataType: 'json',
                        success: function (oE) {
                            if (oE.code == 0) {
                                $('#ven_sell_chance_look_track').trigger('click');
                                getSellChanceList('/customer-chance/mylist');
                            } else {
                                alert(oE.msg);
                            }
                        }
                    });
                    $(this).closest('.dialog_box').remove();
                    $('.tanceng').css('display', 'none');
                })
                //完成跟进
                //商机状态选择
                var sellChanceFinishStatus = '';
                var sellChanceFailReason = '';
                $('.tanceng .ven_sell_chance_sjzt .t_textinput').die('click').live('click', function () {
                    if ($(this).index() == 0) {
                        if (oE['is_order'] == 1) {
                            alert('友情提示，必须新建销售订单方可成交！')
                        }
                    }
                    sellChanceFinishStatus = $(this).index() + 1;
                });
                // 输单原因选择
                $('.tanceng .ven_sell_chance_fail_reason_save_btn').die('click').live('click', function () {
                    sellChanceFailReason = $(this).parent().prev().find('input:checked').parent().find('span').html();
                    $(this).closest('.dialog_box').remove();
                });
                $('.tanceng .ven_sell_chance_sjzt_submit').die('click').live('click', function () {
                    if (sellChanceFinishStatus == 2) {
                        sellChanceFailReason = sellChanceFailReason;
                    } else {
                        sellChanceFailReason = '';
                    }
                    $.ajax({
                        url: SERVER_URL + '/customer-chance/finished',
                        type: 'POST',
                        data: {
                            token: token,
                            chance_id: sellChanceId,
                            uid: uid,
                            status: sellChanceFinishStatus,
                            note: sellChanceFailReason
                        },
                        dataType: 'json',
                        success: function (oE) {
                            if (oE.code == 0) {
                                $('.tanceng').css('display', 'none').children('.dialog_box').remove();
                                $('.slider_head_close').trigger('click');
                                getSellChanceList($('#ven_sell_chance_tab .tabhover').attr('needurl'));
                            } else {
                                alert(oE.msg);
                            }
                        }
                    });
                })

            }
        });
    }

    // 删除跟进记录
    var venSellChanceLookTrackId = '';
    $('.ven_sell_chance_look_track_del').die('click').live('click', function () {
        venSellChanceLookTrackId = $(this).closest('.ven_sell_chance_look_track_box').attr('trackid');
    });
    $('.tanceng .btn_scgjjl_submit').die('click').live('click', function () {
        $.ajax({
            url: SERVER_URL + '/customer-chance/deltrack',
            type: 'POST',
            data: {
                token: token,
                uid: sellChanceUid,
                track_id: venSellChanceLookTrackId
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    sellChanceLookTrack(sellChanceUid, sellChanceId)
                } else {
                    alert(oE.msg)
                }
            }
        });
        $(this).closest('.dialog_box').remove();
        $('.tanceng').css('display', 'none')
    });
    //添加评论
    $('.sell_chance_look_track_commit_add_submit').die('click').live('click', function () {
        venSellChanceLookTrackId = $(this).closest('.ven_sell_chance_look_track_box').attr('trackid');
        if ($(this).prev().val() == '写评论') {
            alert('请填写评论')
        } else {
            $.ajax({
                url: SERVER_URL + '/customer-chance/trackcommit',
                type: 'POST',
                data: {
                    token: token,
                    chance_id: sellChanceId,
                    track_id: venSellChanceLookTrackId,
                    content: $(this).prev().val()
                },
                dataType: 'json',
                success: function (oE) {
                    if (oE.code == 0) {
                        alert('评论成功');
                        sellChanceLookTrack(sellChanceUid, sellChanceId)
                    } else {
                        alert(oE.msg)
                    }
                }
            });
        }
    })

    //定义新建销售机会参数
    var venSellChanceCreateData = {
        token: token,
        chance_id: 0, // 销售机会id
        customer_id: '', // 客户id
        customer_name: '', // 客户名称
        uid: uid, // 创建人id
        flow_id: '', // 销售流程id
        expected_at: '', // 预计成交日期
        expected_money: '', // 预计金额(分)
        dept: '', // 负责部门
        owner: '', // 跟进人
        copy_list: '', // 抄送人
        note: '', //备注
        customfields: []
    };
    //新建销售机会
    $('#ven_sell_chance_create_btn').die('click').live('click', function () {
        venSellChanceCreateData = {
            token: token,
            chance_id: 0, // 销售机会id
            customer_id: '', // 客户id
            uid: uid, // 创建人id
            flow_id: '', // 销售流程id
            expected_at: '', // 预计成交日期
            expected_money: '', // 预计金额(分)
            dept: '', // 负责部门
            owner: '', // 跟进人
            copy_list: '', // 抄送人
            note: '', //备注
            customfields: []
        };
        $.ajax({
            url: SERVER_URL + '/customer/settinglist',
            type: 'GET',
            data: {
                token: token,
                thetype: 3
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var datalist = oE.datalist;
                    var venSellChanceFieldHtml = '';
                    $.each(datalist, function (i, v) {
                        venSellChanceFieldHtml += '<div class="t_textinput">\
                            <div class="t_left">' + v['title'] + '</div>\
                            <div class="t_right clearfix">\
                            <input type="text" class="time_input" value="" style="background: #fff;border:1px solid #e6e6e6;"" onfocus="fn_focus(this);" onblur="fn_blur(this);">\
                            </div>\
                            </div>'
                    });
                    $('.tanceng .ven_sell_chance_create_field_oldlist').html(venSellChanceFieldHtml);
                } else {
                    alert(oE.msg);
                }
            }
        });
        $('.tanceng .ven_sell_chance_login_userinfo_name').html(uname).attr('userinfoid', uid);
        $('.tanceng .ven_sell_chance_create_createtime').html(getCurrentDate());
        $('.tanceng .ven_sell_chance_add_owner_list').html('');
    });
    //选择客户
    $('.tanceng .ven_sell_chance_choose_customer').die('click').live('click', function () {
        getCusListSort();
        getCusList();
        //xs_kh_gjss_xlk();
    });
    // 客户>分类列表展示
    function getCusListSort() {
        $.ajax({
            url: SERVER_URL + '/customer/arealist',
            type: 'GET',
            data: {
                token: token
            },
            dataType: 'json',
            success: function (oE) {
                $('i.ven_sell_chance_create_choose_customer_sort_total').html(oE.count);
                var datalist = oE.datalist;
                var deep = 0;
                $('.tanceng .ven_sell_chance_create_choose_cus_area_sort_list').html(tree_list_close(datalist, deep));
                // 下级分类图标样式控制
                for (var i = 0; i < $('i.ven_sell_chance_create_choose_cus_area_sort_list li').length; i++) {
                    if ($('i.ven_sell_chance_create_choose_cus_area_sort_list li').eq(i).next('ul').children().length == 0) {
                        $('i.ven_sell_chance_create_choose_cus_area_sort_list li').eq(i).prev('i').remove();
                        //$('i.ven_sell_chance_create_choose_cus_area_sort_list li').eq(i).parent('ul').addClass('oth')
                    }
                }
            },
            error: function (e) {
                console.log(e);
            }
        })
    }

    // 初始化获取列表参数
    var getCusListData = {
        token: token,
        page: 1, //当前页
        num: 10, // 每页显示条数
        key: '', // 关键字
        industry_big_id: '', // 行业大类id
        category_id: '', // 分类id
        comefrom: '', // 来源类型id
        grade: '', // 级别id
        credit: '', // 信用额度
        owner: uid, // 负责人id
        created_at: '',
        statusflag: '' // 作废状态  0 有效客户 1 作废客户  不传 是全部
    };
    // 客户>客户列表
    function getCusList() {
        $.ajax({
            url: SERVER_URL + '/customer/list',
            type: 'GET',
            data: getCusListData,
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    $('.tanceng .xs_kh_ssjg').html(oE.totalcount);
                    var cuslist = oE.datalist;
                    if (cuslist.length == 0) {
                        $('.tanceng .ven_custom_nodata_box').removeClass('none')
                        $('.tanceng .ven_custom_handle').addClass('none')
                    } else {
                        $('.tanceng .ven_custom_nodata_box').addClass('none')
                        $('.tanceng .ven_custom_handle').removeClass('none')
                    }
                    // 客户列表
                    var oCuslist = '';
                    // 客户作废状态
                    var cusSta = '';
                    for (var i = 0; i < cuslist.length; i++) {
                        if (cuslist[i].contacts) {
                            // 客户联系人名字
                            var con1 = '';
                            // 客户联系人详细信息
                            var con2 = '';
                            for (var j = 0; j < cuslist[i].contacts.length; j++) {
                                con1 += cuslist[i].contacts[j].name + '、';
                                con2 += '<div class="vent_client_contMsgBoxDet"><h3 class="cont_title">' + cuslist[i].contacts[j].name + '</h3><ul><li>职务：' + cuslist[i].contacts[j].job + '</li><li>电话：' + cuslist[i].contacts[j].tel + '</li><li>邮箱：' + cuslist[i].contacts[j].email + '</li></ul></div>'
                            }
                        }
                        con1 = con1.substring(0, con1.length - 1);
                        var cusSort = '',
                            cusBtnClass = '',
                            cusContactClass = '';
                        oCuslist += '<tr class="' + cusSta + '" cusId="' + cuslist[i].id + '"><td><input type="radio" name="222" ' + (i == 0 ? 'checked' : '') + '></td><td>' + l_dbl(i + 1) + '</td><td>' + likNullData(cuslist[i].code_sn) + '</td><td>' + likNullData(cuslist[i].name) + '</td><td>' + likNullData(cuslist[i].tel) + '</td><td><div class="text_line" style="width: 9em;"><span class="ellipsis">' + likNullData(cuslist[i].address) + '</span></div></td><td>' + likNullData(cuslist[i].industry_big_name) + '</td><td>' + likNullData(cuslist[i].grade_name) + '</td><td class="f_color ' + cusContactClass + '">' + con1 + '<div class="vent_client_contMsgBox" style="display: none;z-index:99;"><i class="vent_client_torr"></i>' + con2 + '</div></td><td>' + likNullData(cuslist[i].introducer_name) + '</td><td>' + likNullData(cuslist[i].note) + '</td></tr>';
                    }
                    $('.tanceng .ven_sell_chance_cus_list').html(oCuslist);
                    list_table_render_pagination('.tanceng .page_ven31_cuslist', getCusListData, getCusList, oE.totalcount, cuslist.length)
                }
            }
        })
    }

    //选择分类获取客户
    $('.tanceng .ven_sell_chance_create_choose_customer_sort li').die('click').live('click', function () {
        getCusListData.id = $(this).attr('cussortid');
        getCusList();
    });
    // 搜索关键字
    $('.tanceng .ven_sell_chance_choose_customer_search_btn').die('click').live('click', function () {
        if ($('.tanceng .ven_sell_chance_choose_customer_search_inp').val() == '搜索客户编号/客户名称') {
            getCusListData.key = ''
        } else {
            getCusListData.key = $('.tanceng .ven_sell_chance_choose_customer_search_inp').val()
        }
        getCusList()
    });
    //搜索行业
    $('.tanceng .ven_sell_chance_create_choose_customer_industry_list li').die('click').live('click', function () {
        getCusListData.industry_big_id = $(this).attr('industryid');
        getCusList()
    });
    //搜索客户级别
    $('.tanceng .ven_sell_chance_create_choose_customer_grade_list li').die('click').live('click', function () {
        getCusListData.grade = $(this).index();
        getCusList()
    })


    //选择客户
    $('.tanceng .ven_sell_chance_create_choose_customer_submit').die('click').live('click', function () {
        var sellChanceCusChosen = null;
        $.each($('.tanceng .ven_sell_chance_cus_list tr'), function (i, v) {
            if ($('.tanceng .ven_sell_chance_cus_list tr').eq(i).find('input:radio').attr('checked') == 'checked') {
                sellChanceCusChosen = {
                    'title': $('.tanceng .ven_sell_chance_cus_list tr').eq(i).attr('cusid'),
                    'val': $('.tanceng .ven_sell_chance_cus_list tr').eq(i).find('td').eq(3).text()
                }
            }
        });
        //新建销售机会用
        $('.tanceng .sell_chance_create_customer_chosen').val(sellChanceCusChosen['val']).addClass('c_3');
        venSellChanceCreateData.customer_id = sellChanceCusChosen['title'];
        venSellChanceCreateData.customer_name = sellChanceCusChosen['val'];
        //编辑销售机会用
        $('.tanceng .ven_sell_chance_edit_customer').val(sellChanceCusChosen['val']);
        venSellChanceEditData.customer_id = sellChanceCusChosen['title'];
        venSellChanceEditData.customer_name = sellChanceCusChosen['val'];
        $(this).closest('.dialog_box').remove();
    });

    // 选择销售阶段
    $('.tanceng .ven_sell_chance_create_choose_flow_btn').die('click').live('click', function () {
        getSellFlowList();
        venSellFlowSearch();
    });
    // 定义销售流程参数
    var sellFlowData = {
        token: token,
        page: 1, // 页面
        num: 10, // 每页条数
        key: '', // 关键字
        dept: deptid, // 部门id
        creater_id: '', // 创建人id
        update_id: '', // 最后修改人id
        created_at: '', // 创建日期
        updated_at: '', // 修改日期
        status: 0 // 状态。空是所有，0是使用中 1停用
    };

    // 获取销售流程列表
    function getSellFlowList() {
        $.ajax({
            url: SERVER_URL + '/customer-flow/list',
            type: 'GET',
            data: sellFlowData,
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    //获取datalist
                    var datalist = oE.datalist;
                    if (datalist.length == 0) {
                        $('.ven_sell_chance_create_choose_flow_nodata_box').removeClass('none');
                        $('.ven_sell_chance_create_choose_flow_handle').addClass('none');
                    } else {
                        $('.ven_sell_chance_create_choose_flow_nodata_box').addClass('none');
                        $('.ven_sell_chance_create_choose_flow_handle').removeClass('none');
                    }
                    //字符串拼接
                    var sellFlowHtml = '';
                    var statusClass = '';
                    $.each(datalist, function (i, v) {
                        //对不同值进行判断
                        //使用中 停用判断
                        var sBtn = '';
                        if (datalist[i]['status'] == 0) {
                            statusClass = 'c_g';
                            sBtn = '<button class="but_mix but_exit val_dialogTop ven_sell_flow_edit none" name="vendition_addxslc_exit">编辑</button><button class="but_cancel but_mix but_r lik_sell_flow_btn_ty">停用</button>'
                        } else {
                            statusClass = 'c_r';
                            sBtn = '<button class="but_cancel but_mix but_lv lik_sell_flow_btn_qy">启用</button><button class="but_mix but_r val_dialog lik_sell_flow_btn_del" name="xs_xslc_delete">删除</button>'
                        }
                        sellFlowHtml += '<tr sellflowuid="' + v['uid'] + '" sellflowid="' + v['id'] + '">\
                            <td><input type="radio" name="111" ' + (i == 0 ? 'checked' : '') + '/></td>\
                            <td>' + l_dbl(i + 1) + '</td>\
                            <td>' + (datalist[i]['name']) + '</td>\
                            <td>' + (datalist[i]['dept_name']) + '</td>\
                            <td>' + (datalist[i]['uname']) + '</td>\
                            <td>' + (datalist[i]['created_at'].split(' ')[0]) + '</td>\
                            <td>' + (datalist[i]['updated_name']) + '</td>\
                            <td>' + (datalist[i]['updated_at'].split(' ')[0]) + '</td>\
                            <td><span class="' + statusClass + '">' + (datalist[i]['status_name']) + '</span></td>\
                        </tr>';
                    });
                    //销售流程数据渲染
                    $('.tanceng .ven_sell_chance_create_choose_flow_list').html(sellFlowHtml);
                    //分页
                    list_table_render_pagination('.tanceng .ven_sell_chance_create_choose_flow_list_page', sellFlowData, getSellFlowList, oE.totalcount, datalist.length)
                }

            }
        });
        //搜索结果条数
        venSellFlowSearchNum();
    }

    //搜索结果条数
    function venSellFlowSearchNum() {
        $.ajax({
            url: SERVER_URL + '/customer-flow/list',
            type: 'GET',
            data: {
                token: token,
                key: sellFlowData.key, // 关键字
                dept: sellFlowData.dept, // 部门id
                creater_id: sellFlowData.creater_id, // 创建人id
                update_id: sellFlowData.update_id, // 最后修改人id
                created_at: '', // 创建日期
                updated_at: '', // 修改日期
                status: sellFlowData.status // 状态。空是所有，0是使用中 1停用
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    //搜索总条数
                    $('.tanceng .ven_sell_chance_create_choose_flow_search_total').html(oE.totalcount);
                }
            }
        })
    }

    //搜索关键字
    $('.tanceng .ven_sell_chance_create_choose_flow_searKey_btn').die('click').live('click', function () {
        if ($('.tanceng .ven_sell_chance_create_choose_flow_searKey').val() == '搜索销售流程名称') {
            alert('请输入搜索关键字');
        } else {
            sellFlowData.key = $('.tanceng .ven_sell_chance_create_choose_flow_searKey').val();
            getSellFlowList();
        }
    });
    //搜索状态
    $('.tanceng .ven_sell_chance_create_choose_flow_search_status_ul li').die('click').live('click', function () {
        if ($(this).index() == 0) {
            sellFlowData.status = '';
        } else if ($(this).index() == 1) {
            sellFlowData.status = 0;
        } else {
            sellFlowData.status = 1;
        }
        getSellFlowList();
    });
    //高级搜索 销售流程 控制下拉框
    function venSellFlowSearch() {
        $.ajax({
            url: SERVER_URL + '/customer-flow/list',
            type: 'GET',
            data: {token: token},
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    //获取datalist
                    var datalist = oE.datalist;
                    console.log(datalist);
                    //定义高级搜索字段
                    //高级搜索 部门id
                    var sSearchDeptId = '';
                    var sSearchDeptName = '';
                    var searchDeptUl = '';
                    // 定义高级搜索数组
                    //高级搜索遍历
                    $.each(datalist, function (i, v) {
                        sSearchDeptId += v['dept_list'] + ',';
                        sSearchDeptName += v['dept_name'] + '、';
                    });
                    // 应用部门id和name放在一个数组里
                    var aSearchDept = getJsonArr(getDataArr(sSearchDeptId.substr(0, sSearchDeptId.length - 1), sSearchDeptName.substr(0, sSearchDeptName.length - 1)));
                    console.log(aSearchDept);
                    $.each(aSearchDept, function (i, v) {
                        searchDeptUl += '<li searchdeptid="' + v['title'] + '">' + v['val'] + '</li>'
                    });
                    //高级搜索 应用部门
                    $('.tanceng .ven_sell_chance_create_choose_flow_search_dept_ul').html(searchDeptUl);
                }
            }
        });
        /* $.ajax({
         url: SERVER_URL + '/customer-flow/list',
         type: 'GET',
         data: {token: token},
         success: function (e) {
         // 将返回值转换为json对象
         var oE = eval("(" + e + ")");
         if (oE.code == 0) {
         //获取datalist
         var datalist = oE.datalist;
         //定义高级搜索字段
         //高级搜索 部门id
         var sSearchDeptId = '';
         var sSearchDeptName = '';
         var searchDeptUl = '';
         $.each(datalist, function (i, v) {
         if (v['dept_list'].slice(v['dept_list'].length - 1) == ',') {
         v['dept_list'] = v['dept_list'].slice(0, v['dept_list'].length - 1)
         }
         sSearchDeptId += v['dept_list'] + ',';
         sSearchDeptName += v['dept_name'] + '、';

         });
         // 应用部门id和name放在一个数组里
         var aSearchDept = getJsonArr(getDataArr(sSearchDeptId.substr(0, sSearchDeptId.length - 1), sSearchDeptName.substr(0, sSearchDeptName.length - 1)));
         $.each(aSearchDept, function (i, v) {
         searchDeptUl += '<li searchdeptid="' + v['title'] + '">' + v['val'] + '</li>'
         });
         //高级搜索 应用部门
         $('.tanceng .ven_sell_chance_create_choose_flow_search_dept_ul').html(searchDeptUl);
         }
         }
         })*/
    }

    //搜索部门
    $('.tanceng .ven_sell_chance_create_choose_flow_search_dept_ul li').die('click').live('click', function () {
        sellFlowData.dept = $(this).attr('searchdeptid');
        getSellFlowList();
    });
    //选择流程确认
    $('.tanceng .ven_sell_chance_create_choose_flow_submit').die('click').live('click', function () {
        var venSellChanceCreateChooseFlow = null;
        $.each($('.tanceng .ven_sell_chance_create_choose_flow_list tr'), function (i, v) {
            if ($('.tanceng .ven_sell_chance_create_choose_flow_list tr').eq(i).find('input:radio').attr('checked') == 'checked') {
                venSellChanceCreateChooseFlow = {
                    'title': $(this).closest('tr').attr('sellflowid'),
                    'val': $(this).closest('tr').children().eq(2).text()
                }
            }
        });
        //新建用
        $('.tanceng .ven_sell_chance_create_choose_flow_inp').val(venSellChanceCreateChooseFlow['val']).addClass('c_3');
        venSellChanceCreateData.flow_id = venSellChanceCreateChooseFlow['title'];
        //编辑用
        $('.tanceng .ven_sell_chance_edit_flow').val(venSellChanceCreateChooseFlow['val']);
        venSellChanceEditData.flow_id = venSellChanceCreateChooseFlow['title'];
        $(this).closest('.dialog_box').remove()
    });

    /* // 选择负责部门
     $('.tanceng .ven_sell_chance_create_choose_dept_btn').die('click').die('click).live('click', function () {
     $('.tanceng .ven_sell_chance_create_choose_dept_list').html('');
     $('.tanceng .ven_sell_chance_create_dept_chosen_list').html('');
     venPayFlowChooseDept()
     });

     //负责部门
     function venPayFlowChooseDept() {
     $.ajax({
     url: SERVER_URL + '/dept/list',
     type: 'GET',
     data: {
     token: token,
     pid: 0
     },
     success: function (e) {
     // 将返回值转换为json对象
     var oE = eval("(" + e + ")");
     var deep = 0;
     $('.tanceng .ven_sell_chance_create_choose_dept_list').html(tree_list_choose_dept(oE.rows, deep));
     // 所有分类图标样式控制
     if ($('i.ven_sell_chance_create_choose_dept_list').children().length == 0) {
     $('li.left_all span.icon_open').addClass('personOth')
     }
     // 下级部门样式控制
     for (var i = 0, liLeft1 = $('.tanceng .ven_sell_chance_create_choose_dept_list li.left_1').length; i < liLeft1; i++) {
     if ($('.tanceng .ven_sell_chance_create_choose_dept_list li.left_1').eq(i).next('ul').length == 0) {
     $('.tanceng .ven_sell_chance_create_choose_dept_list li.left_1').eq(i).find('span.icon_open').addClass('personOth');
     $('.tanceng .ven_sell_chance_create_choose_dept_list li.left_1').eq(i).find('span.personOth').closest('li').addClass('deptChild')
     }
     }
     //选择部门左侧选择
     $('.tanceng .ven_sell_chance_create_choose_dept_list ul .deptChild').die('click').die('click).live('click', function () {
     if ($(this).find('em').hasClass('on')) {
     $('.tanceng .ven_sell_chance_create_dept_chosen_list').find('li[rid=' + $(this).attr('deptchosenid') + ']').remove()
     $(this).find('span.list_check em').removeClass('on')
     } else {
     $('.tanceng .ven_sell_chance_create_dept_chosen_list').append('<li rid="' + $(this).attr('deptchosenid') + '"><span>' + $(this).children('.list_msg').html() + '</span><i class="list_choose_delete"></i></li>');
     $(this).find('span.list_check em').addClass('on')
     }
     });
     //选择部门右侧删除
     $('i.list_choose_delete').die('click).live('click', function () {
     $(this).closest('li').remove();
     $('.tanceng .ven_sell_chance_create_choose_dept_list ul .deptChild[deptchosenid = "' + $(this).closest('li').attr('rid') + '"]').find('em').removeClass('on');
     });
     //新建>选择部门确认
     $('.tanceng .ven_sell_chance_create_choose_dept_save').die('click').die('click).live('click', function () {
     venSellChanceCreateData.dept = '';  // 声明对象要区分开
     //venPayFlowEditData.dept_list = '';
     venSellChanceEditData.dept = '';  // 声明对象要区分开
     //venPayFlowEditData.dept_list = '';
     var deptChosen = '';
     $.each($('.tanceng .ven_sell_chance_create_dept_chosen_list').find('li'), function (i, v) {
     deptChosen += '<li deptchosenid="' + $('.tanceng .ven_sell_chance_create_dept_chosen_list').find('li').eq(i).attr('rid') + '">' + $('.tanceng .ven_sell_chance_create_dept_chosen_list').find('li').eq(i).text() + ' <i></i></li>'
     /!*venSellChanceCreateData.dept += $('.tanceng .ven_sell_chance_create_dept_chosen_list').find('li').eq(i).attr('rid') + ','
     venSellChanceEditData.dept += $('.tanceng .ven_sell_chance_create_dept_chosen_list').find('li').eq(i).attr('rid') + ','*!/
     });
     $('.tanceng .ven_sell_chance_create_add_dept_list').html(deptChosen);
     $('.tanceng .ven_sell_chance_edit_dept_list').html(deptChosen);
     $(this).closest('.dialog_box').remove()
     })
     }
     })
     }*/

    //选择跟进人
    $('.tanceng .ven_sell_chance_create_choose_owner').die('click').live('click', function () {
        venSellChanceChooseOwner()
    });

    //选择跟进人
    function venSellChanceChooseOwner() {
        $.ajax({
            type: "get",
            url: SERVER_URL + "/dept/deptlist",
            data: {token: token},
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var deep = 0;
                    $('.tanceng .ven_sell_chance_create_choose_owner_list').html(tree_list_choose_dept_person(oE.rows, deep));
                    // 所有分类图标样式控制
                    if ($('i.ven_sell_chance_create_choose_owner_list').children().length == 0) {
                        $('li.left_all span.icon_open').addClass('personOth')
                    }
                    // 下级部门样式控制
                    for (var i = 0, liLeft1 = $('.tanceng .ven_sell_chance_create_choose_owner_list li.left_1').length; i < liLeft1; i++) {
                        if ($('.tanceng .ven_sell_chance_create_choose_owner_list li.left_1').eq(i).next('ul').length == 0) {
                            $('.tanceng .ven_sell_chance_create_choose_owner_list li.left_1').eq(i).find('span.icon_open').addClass('personOth');
                            $('.tanceng .ven_sell_chance_create_choose_owner_list li.left_1').eq(i).find('span.personOth').closest('li').addClass('deptChild')
                        }
                    }
                    //选择人员左侧选择
                    $('.tanceng .ven_sell_chance_create_choose_owner_list ul .li_person').die('click').live('click', function () {
                        if ($(this).find('em').hasClass('on')) {
                            $('.tanceng .ven_sell_chance_create_owner_chosen_list').find('li[userinfoid=' + $(this).attr('userinfoid') + ']').remove()
                            $(this).find('span.list_check em').removeClass('on')
                        } else {
                            $('.tanceng .ven_sell_chance_create_owner_chosen_list').append('<li userinfoid="' + $(this).attr('userinfoid') + '"><span>' + $(this).children('.list_msg').html() + '</span><i class="list_choose_delete"></i></li>');
                            $(this).find('span.list_check em').addClass('on')
                        }
                    });
                    //选择人员右侧删除
                    $('i.list_choose_delete').die('click').live('click', function () {
                        $(this).closest('li').remove();
                        $('.tanceng .ven_sell_chance_create_choose_owner_list ul .li_person[userinfoid = "' + $(this).closest('li').attr('userinfoid') + '"]').find('em').removeClass('on');
                    });
                    //选择人员保存
                    $('.tanceng .ven_sell_chance_choose_owner_save').die('click').live('click', function () {
                        venSellChanceCreateData.owner = '';  // 声明对象要区分开
                        venSellChanceCreateData.dept = '';
                        var ownerChosen = '';
                        $.each($('.tanceng .ven_sell_chance_create_owner_chosen_list li'), function (i, v) {
                            ownerChosen += '<li userdeptid="' + $('.tanceng .ven_sell_chance_create_choose_owner_list ul .li_person em.on').eq(i).closest('ul').siblings('li.left_1').attr('deptchosenid') + '" userinfoid="' + $('.tanceng .ven_sell_chance_create_owner_chosen_list').find('li').eq(i).attr('userinfoid') + '">' + $('.tanceng .ven_sell_chance_create_owner_chosen_list').find('li').eq(i).text() + ' <i></i></li>';
                            console.log($('.tanceng .ven_sell_chance_create_choose_owner_list ul .li_person em.on').eq(i).closest('ul').prevUntil('li.left_1').attr('deptchosenid'))
                        });
                        $('.tanceng .ven_sell_chance_add_owner_list').html(ownerChosen);
                        $('.tanceng .ven_sell_chance_edit_owner_list').html(ownerChosen);
                        $(this).closest('.dialog_box').remove()
                    })
                }
            },
            error: function (data) {

            }
        });
    }


    //添加抄送人
    $('.tanceng .ven_sell_chance_create_choose_copy_btn').die('click').live('click', function () {
        venSellChanceChooseCopy()
    });
    //选择抄送人
    function venSellChanceChooseCopy() {
        $.ajax({
            type: "get",
            url: SERVER_URL + "/dept/deptlist",
            data: {token: token},
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var deep = 0;
                    $('.tanceng .ven_sell_chance_create_choose_copy_list').html(tree_list_choose_dept_person(oE.rows, deep));
                    // 所有分类图标样式控制
                    if ($('i.ven_sell_chance_create_choose_copy_list').children().length == 0) {
                        $('li.left_all span.icon_open').addClass('personOth')
                    }
                    // 下级部门样式控制
                    for (var i = 0, liLeft1 = $('.tanceng .ven_sell_chance_create_choose_copy_list li.left_1').length; i < liLeft1; i++) {
                        if ($('.tanceng .ven_sell_chance_create_choose_copy_list li.left_1').eq(i).next('ul').length == 0) {
                            $('.tanceng .ven_sell_chance_create_choose_copy_list li.left_1').eq(i).find('span.icon_open').addClass('personOth');
                            $('.tanceng .ven_sell_chance_create_choose_copy_list li.left_1').eq(i).find('span.personOth').closest('li').addClass('deptChild')
                        }
                    }
                    //选择人员左侧选择
                    $('.tanceng .ven_sell_chance_create_choose_copy_list ul .li_person').die('click').live('click', function () {
                        if ($(this).find('em').hasClass('on')) {
                            $('.tanceng .ven_sell_chance_create_copy_chosen_list').find('li[userinfoid=' + $(this).attr('userinfoid') + ']').remove()
                            $(this).find('span.list_check em').removeClass('on')
                        } else {
                            $('.tanceng .ven_sell_chance_create_copy_chosen_list').append('<li userinfoid="' + $(this).attr('userinfoid') + '"><span>' + $(this).children('.list_msg').html() + '</span><i class="list_choose_delete"></i></li>');
                            $(this).find('span.list_check em').addClass('on')
                        }
                    });
                    //选择人员右侧删除
                    $('i.list_choose_delete').die('click').live('click', function () {
                        $(this).closest('li').remove();
                        $('.tanceng .ven_sell_chance_create_choose_copy_list ul .li_person[userinfoid = "' + $(this).closest('li').attr('userinfoid') + '"]').find('em').removeClass('on');
                    });
                    //选择人员保存
                    $('.tanceng .ven_sell_chance_choose_copy_save').die('click').live('click', function () {
                        venSellChanceCreateData.copy = '';  // 声明对象要区分开
                        //venPayFlowEditData.dept_list = '';
                        var copyChosen = '';
                        $.each($('.tanceng .ven_sell_chance_create_copy_chosen_list li'), function (i, v) {
                            copyChosen += '<li userinfoid="' + $('.tanceng .ven_sell_chance_create_copy_chosen_list').find('li').eq(i).attr('userinfoid') + '">\
                                <i class="del_img_1">-</i><em class="icon_personBtn icon_personBtn_msg"><i class="icon_personNext"></i></em>\
                                <em class="icon_adderBtn"></em>\
                                <p class="box_adderName">' + $('.tanceng .ven_sell_chance_create_copy_chosen_list').find('li').eq(i).text() + '</p>\
                                </li>';
                            /*venSellChanceCreateData.copy_list += $('.tanceng .ven_sell_chance_create_copy_chosen_list').find('li').eq(i).attr('userinfoid') + ',';
                             venSellChanceEditData.copy_list += $('.tanceng .ven_sell_chance_create_copy_chosen_list').find('li').eq(i).attr('userinfoid') + ',';*/
                        });
                        $('.tanceng .ven_sell_chance_create_add_copy_list').html('<li> <em class="icon_personBtn icon_personBtn_add val_dialogTop ven_sell_chance_create_choose_copy_btn" name="xs_xsjh_csg"></em> </li>').prepend(copyChosen);
                        $('.tanceng .ven_sell_chance_edit_copy_list').html('<li> <em class="icon_personBtn icon_personBtn_add val_dialogTop ven_sell_chance_create_choose_copy_btn" name="xs_xsjh_csg"></em> </li>').prepend(copyChosen);
                        $(this).closest('.dialog_box').remove()
                    })
                }
            },
            error: function (data) {

            }
        });
    }

    $('.tanceng .ven_sell_chance_create_expected_at').live('click', function () {
        $(this).addClass('c_3');
    });

    //新建提交
    $('.tanceng .ven_sell_chance_create_submit').die('click').live('click', function () {
        if ($('.tanceng .sell_chance_create_customer_chosen').val() == '请选择客户') {
            alert('请选择客户');
            return false;
        } else if ($('.tanceng .ven_sell_chance_create_choose_flow_inp').val() == '请选择销售阶段模板') {
            alert('请选择销售阶段模板');
            return false;
        } else if ($('.tanceng .ven_sell_chance_create_expected_at').val() == '请输入日期') {
            alert('请输入日期');
            return false;
        } else if ($('.tanceng .ven_sell_chance_create_expected_money').val() == '') {
            alert('请输入金额');
            return false;
        } else if ($('.tanceng .ven_sell_chance_add_owner_list').children().length == 0) {
            alert('请选择跟进人');
            return false;
        }/* else if ($('.tanceng .ven_sell_chance_create_add_copy_list').first().find('i.del_img_1').length == 0) {
         alert('请选择抄送人');
         return false;
         }*/ else {
            venSellChanceCreateData.expected_at = $('.tanceng .ven_sell_chance_create_expected_at').val();
            venSellChanceCreateData.expected_money = $('.tanceng .ven_sell_chance_create_expected_money').val();
            //跟进人
            venSellChanceCreateData.owner = '';
            venSellChanceCreateData.dept = '';
            $.each($('.tanceng .ven_sell_chance_add_owner_list li'), function (i, v) {
                venSellChanceCreateData.owner += $('.tanceng .ven_sell_chance_add_owner_list li').eq(i).attr('userinfoid') + ',';
                venSellChanceCreateData.dept += $('.tanceng .ven_sell_chance_add_owner_list li').eq(i).attr('userdeptid') + ',';
            });
            if (venSellChanceCreateData.owner.slice(venSellChanceCreateData.owner.length - 1) == ',') {
                venSellChanceCreateData.owner = venSellChanceCreateData.owner.slice(0, venSellChanceCreateData.owner.length - 1);
            }
            if (venSellChanceCreateData.dept.slice(venSellChanceCreateData.dept.length - 1) == ',') {
                venSellChanceCreateData.dept = venSellChanceCreateData.dept.slice(0, venSellChanceCreateData.dept.length - 1);
            }
            //venSellChanceCreateData.dept = getJsonArr(venSellChanceCreateData.dept.split(',')).join(',');
            //抄送人
            venSellChanceCreateData.copy_list = '';
            $.each($('.tanceng .ven_sell_chance_create_add_copy_list li'), function (i, v) {
                if ($('.tanceng .ven_sell_chance_create_add_copy_list li').eq(i).attr('userinfoid')) {
                    venSellChanceCreateData.copy_list += $('.tanceng .ven_sell_chance_create_add_copy_list li').eq(i).attr('userinfoid') + ',';
                }
            });
            //venSellChanceCreateData.copy_list += uid;
            if (venSellChanceCreateData.copy_list.slice(venSellChanceCreateData.copy_list.length - 1) == ',') {
                venSellChanceCreateData.copy_list = venSellChanceCreateData.copy_list.slice(0, venSellChanceCreateData.copy_list.length - 1);
            }
            if (venSellChanceCreateData.copy_list.length == 0) {
                alert('请选择汇报人');
                return false;
            }
            //自定义字段
            var venSellChanceField = [];
            $.each($('.tanceng .ven_sell_chance_create_field_oldlist .t_textinput'), function (i, v) {
                if ($('.tanceng .ven_sell_chance_create_field_oldlist .t_textinput').eq(i).find('.t_right input').val() != '') {
                    venSellChanceField.push({
                        title: $('.tanceng .ven_sell_chance_create_field_oldlist .t_textinput').eq(i).find('.t_left').html(),
                        val: $('.tanceng .ven_sell_chance_create_field_oldlist .t_textinput').eq(i).find('.t_right input').val()
                    });
                }
            });
            venSellChanceCreateData.customfields = venSellChanceField;
            console.log(venSellChanceCreateData);
            $.ajax({
                url: SERVER_URL + '/customer-chance/add',
                type: 'POST',
                data: venSellChanceCreateData,
                dataType: 'json',
                success: function (oE) {
                    if (oE.code == 0) {
                        alert('添加成功');
                        $('.tanceng .ven_sell_chance_create_submit').closest('.dialog_box').remove();
                        $('.tanceng').css('display', 'none');
                        getSellChanceList($('#ven_sell_chance_tab .tabhover').attr('needurl'));
                    } else {
                        alert(oE.msg)
                    }
                }
            })
        }
    });

    //定义编辑销售机会参数
    var venSellChanceEditData = {
        token: token,
        chance_id: sellChanceId, // 销售机会id
        customer_id: '', // 客户id
        uid: uid, // 创建人id
        flow_id: '', // 销售流程id
        expected_at: '', // 预计成交日期
        expected_money: '', // 预计金额(分)
        dept: '', // 负责部门
        owner: '', // 跟进人
        copy_list: '', // 抄送人
        note: '', //备注
        customfields: []
    };
    //编辑销售机会
    $('.ven_sell_chance_edit').die('click').live('click', function () {
        sellChanceId = $(this).closest('tr').attr('sellchanceid');
        getSellChanceInfo(sellChanceId);
        venSellChanceEditData = {
            token: token,
            chance_id: sellChanceId, // 销售机会id
            customer_id: '', // 客户id
            uid: uid, // 创建人id
            flow_id: '', // 销售流程id
            expected_at: '', // 预计成交日期
            expected_money: '', // 预计金额(分)
            dept: '', // 负责部门
            owner: '', // 跟进人
            copy_list: '', // 抄送人
            note: '', //备注
            customfields: []
        };
    });
    //数据遍历
    function getSellChanceInfo(sellChanceId) {
        $.ajax({
            url: SERVER_URL + '/customer-chance/info',
            type: 'GET',
            data: {
                token: token,
                uid: uid,
                chance_id: sellChanceId
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var data = oE.data;
                    console.log(oE);
                    //新建日期
                    $('.tanceng .ven_sell_chance_edit_create_at').html(data['created_at']);
                    //选择客户
                    $('.tanceng .ven_sell_chance_edit_customer').val(data['name']);
                    venSellChanceEditData.customer_id = data['customer_id'];
                    // 销售阶段
                    $('.tanceng .ven_sell_chance_edit_flow').val(data['flow_name']);
                    venSellChanceEditData.flow_id = data['flow_id'];
                    // 预计成交日期
                    $('.tanceng .ven_sell_chance_edit_expected_at').val(data['expected_at'].split(' ')[0]);
                    venSellChanceEditData.expected_at = data['expected_at'].split(' ')[0];
                    // 预计金额
                    $('.tanceng .ven_sell_chance_edit_expected_money').val(data['expected_money']);
                    venSellChanceEditData.expected_money = data['expected_money'];

                    //部门去','
                    if (data.dept.charAt(0) == ',') {
                        data.dept = data.dept.slice(1);
                    }
                    if (data.dept.charAt(data.dept.length - 1) == ',') {
                        data.dept = data.dept.slice(0, venSellChanceCreateData.dept.length - 1);
                    }
                    //跟进人
                    if (data['owner'] && data['owner_name'] && data['dept']) {
                        var editOwner = getDataArrArg(data['owner_name'], data['owner'], data['dept']);
                        var sEditOwner = '';
                        $.each(editOwner, function (i, v) {
                            sEditOwner += '<li userdeptid="' + v['deptid'] + '" userinfoid="' + v['ownerid'] + '">' + v['ownername'] + ' <i></i></li>';
                        });
                        $('.tanceng .ven_sell_chance_edit_owner_list').html(sEditOwner);
                    }
                    //抄送人
                    if (data['copy_list'] && data['copy_name']) {
                        var sEditCopy = '';
                        $.each(data['copy_list'], function (i, v) {
                            sEditCopy += '<li userinfoid="' + v['id'] + '">\
                                <i class="del_img_1">-</i><em class="icon_personBtn icon_personBtn_msg"><i class="icon_personNext"></i></em>\
                                <em class="icon_adderBtn"></em>\
                                <p class="box_adderName">' + v['name'] + '</p>\
                                </li>'
                        });
                        $('.tanceng .ven_sell_chance_edit_copy_list').html('<li> <em class="icon_personBtn icon_personBtn_add val_dialogTop ven_sell_chance_create_choose_copy_btn" name="xs_xsjh_csg"></em> </li>').prepend(sEditCopy);
                    }
                    // 自定义字段
                    if (data.customfields != '') {
                        var venSellChanceFieldHtml = '';
                        $.each(data.customfields, function (i, v) {
                            venSellChanceFieldHtml += '<div class="t_textinput"><div class="t_left">' + v['title'] + '</div><div class="t_right clearfix"><input type="text" class="c_3 time_input" value="' + v['val'] + '" style="background: #fff;border:1px solid #e6e6e6;"></div></div>'
                        });
                        $('.tanceng .ven_sell_chance_edit_field_oldlist').html(venSellChanceFieldHtml);
                    }
                } else {
                    alert(oE.msg);
                }
            }
        })
    }

    //编辑销售机会 选择客户
    $('.tanceng .ven_sell_chance_edit_choose_customer').die('click').live('click', function () {
        getCusListSort();
        getCusList();
        //xs_kh_gjss_xlk();
    });
    //选择销售流程
    $('.tanceng .ven_sell_chance_edit_choose_flow').die('click').live('click', function () {
        getSellFlowList();
        venSellFlowSearch();
    });
    //选择负责部门
    $('.tanceng .ven_sell_chance_edit_choose_dept_btn').die('click').live('click', function () {
        venPayFlowChooseDept();
    });
    //选择跟进人
    $('.tanceng .ven_sell_chance_edit_choose_owner').die('click').live('click', function () {
        venSellChanceChooseOwner();
    });
    //选择抄送人
    $('.tanceng .ven_sell_chance_edit_choose_copy').die('click').live('click', function () {
        venSellChanceChooseCopy()
    });
    //编辑销售机会提交
    $('.tanceng .ven_sell_chance_edit_submit').die('click').live('click', function () {
        venSellChanceEditData.expected_at = $('.tanceng .ven_sell_chance_edit_expected_at').val();
        venSellChanceEditData.expected_money = $('.tanceng .ven_sell_chance_edit_expected_money').val();
        //部门
        $.each($('.tanceng .ven_sell_chance_edit_owner_list li'), function (i, v) {
            venSellChanceEditData.owner += $('.tanceng .ven_sell_chance_edit_owner_list li').eq(i).attr('userinfoid') + ',';
            venSellChanceEditData.dept += $('.tanceng .ven_sell_chance_edit_owner_list li').eq(i).attr('userdeptid') + ',';
        });
        if (venSellChanceEditData.owner.slice(venSellChanceEditData.owner.length - 1) == ',') {
            venSellChanceEditData.owner = venSellChanceEditData.owner.slice(0, venSellChanceEditData.owner.length - 1);
        }
        if (venSellChanceEditData.dept.slice(venSellChanceEditData.dept.length - 1) == ',') {
            venSellChanceEditData.dept = venSellChanceEditData.dept.slice(0, venSellChanceEditData.dept.length - 1);
        }
        venSellChanceEditData.dept = getJsonArr(venSellChanceEditData.dept.split(',')).join(',');
        //抄送人
        $.each($('.tanceng .ven_sell_chance_edit_copy_list li'), function (i, v) {
            if ($('.tanceng .ven_sell_chance_edit_copy_list li').eq(i).attr('userinfoid')) {
                venSellChanceEditData.copy_list += $('.tanceng .ven_sell_chance_edit_copy_list li').eq(i).attr('userinfoid') + ',';
            }
        });
        venSellChanceEditData.copy_list += uid;
        if (venSellChanceEditData.copy_list.slice(venSellChanceEditData.copy_list.length - 1) == ',') {
            venSellChanceEditData.copy_list = venSellChanceEditData.copy_list.slice(0, venSellChanceEditData.copy_list.length - 1);
        }
        //去重
        var newCopyList = [];
        venSellChanceEditData.copy_list = venSellChanceEditData.copy_list.split(',');
        $.each(venSellChanceEditData.copy_list, function (i, v) {
            if ($.inArray(v, newCopyList) == -1) {
                newCopyList.push(v);
            }
        });
        venSellChanceEditData.copy_list = newCopyList.join(',');
        //自定义字段
        var venSellChanceField = [];
        $.each($('.tanceng .ven_sell_chance_edit_field_oldlist .t_textinput'), function (i, v) {
            if ($('.tanceng .ven_sell_chance_edit_field_oldlist .t_textinput').eq(i).find('.t_right input').val() != '') {
                venSellChanceField.push({
                    title: $('.tanceng .ven_sell_chance_edit_field_oldlist .t_textinput').eq(i).find('.t_left').html(),
                    val: $('.tanceng .ven_sell_chance_edit_field_oldlist .t_textinput').eq(i).find('.t_right input').val()
                });
            }
        });
        venSellChanceEditData.customfields = venSellChanceField;
        console.log(venSellChanceEditData);
        $.ajax({
            url: SERVER_URL + '/customer-chance/add',
            type: 'POST',
            data: venSellChanceEditData,
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    alert('修改成功');
                    $('.tanceng .dialog_box').remove();
                    $('.tanceng').css('display', 'none');
                    getSellChanceList($('#ven_sell_chance_tab .tabhover').attr('needurl'));
                } else {
                    alert(oE.msg)
                }
            }
        })
    });
    //查看  编辑
    $('.ven_sell_chance_look_edit_btn').die('click').live('click', function () {
        getSellChanceInfo(sellChanceId);
        /*venSellChanceEditData = {
         token: token,
         chance_id: sellChanceId, // 销售机会id
         customer_id: '', // 客户id
         uid: uid, // 创建人id
         flow_id: '', // 销售流程id
         expected_at: '', // 预计成交日期
         expected_money: '', // 预计金额(分)
         dept: '', // 负责部门
         owner: '', // 跟进人
         copy_list: '', // 抄送人
         note: '' //备注
         };*/
    })
    //查看  作废
    $('.ven_sell_chance_look_invalid_btn').die('click').live('click', function () {
        $.ajax({
            url: SERVER_URL + '/customer-chance/setstatus',
            type: 'POST',
            data: {
                token: token,
                chance_id: sellChanceId,//  销售机会id
                status_flag: 1
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    $('.slider_head_close').trigger('click');
                    getSellChanceList($('#ven_sell_chance_tab .tabhover').attr('needurl'));
                } else {
                    alert('操作失败')
                }
            }
        });
    });
    //查看  删除
    $('#ven_sell_chance_look_del_btn').die('click').live('click', function () {
        $('#ven_sell_chance_del_inp').val(sellChanceId);
    });
    // 查看  更多
    $('#ven_sell_chance_look_more').find('li').die('click').live('click', function () {
        $('.slider_head_More').trigger('click');
        $('.slider_head_close').trigger('click');
    })
    // 查看  更改跟进人
    $('#ven_sell_chance_look_change_owner_btn').die('click').live('click', function () {
        venSellChanceChooseOwner();
        $('.tanceng .ven_sell_chance_look_change_owner_save').die('click').live('click', function () {
            var changeOwnerList = '';
            $.each($('.tanceng .ven_sell_chance_create_owner_chosen_list li'), function (i, v) {
                changeOwnerList += $(this).attr('userinfoid') + ',';
            });
            changeOwnerList = changeOwnerList.slice(0, changeOwnerList.length - 1)
            $.ajax({
                url: SERVER_URL + '/customer-chance/changeowner',
                type: 'POST',
                data: {
                    token: token,
                    uid: uid,
                    chance_id: sellChanceId,//  销售机会id
                    owner: changeOwnerList
                },
                dataType: 'json',
                success: function (oE) {
                    if (oE.code == 0) {
                        alert('修改成功');
                        $('.tanceng .dialog_box').remove();
                        $('.tanceng').css('display', 'none');
                        getSellChanceList($('#ven_sell_chance_tab .tabhover').attr('needurl'));
                    } else {
                        alert(oE.msg)
                    }
                }
            });
        })
    })

    //设置自定义字段
    $('#ven_sell_chance_setting_btn').die('click').live('click', function () {
        $.ajax({
            url: SERVER_URL + '/customer/settinglist',
            type: 'GET',
            data: {
                token: token,
                thetype: 3
            },
            async: false,
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    var datalist = oE.datalist;
                    var venSellChanceFieldHtml = '';
                    $.each(datalist, function (i, v) {
                        venSellChanceFieldHtml += '<div class="m_bottom_10" style="clear:both">\
                            <div class="t_textinput left" style="width: 75%;">\
                            <div class="t_left"><i class="c_r v_hidden">*</i>自定义</div>\
                            <div class="t_right clearfix">\
                            <div class="inline_block select_mormal select_100 left">\
                            <input type="text" class="select_input ven_custom_setting_info_field_new c_3" value="' + v['title'] + '">\
                            </div>\
                            </div>\
                            </div>\
                            <div class="cg_ghs_setul">\
                            <button class="but_green page34_khsxAdd">+</button>\
                            <button class="but_red page34_khsxDelete">-</button>\
                            </div>\
                            </div>'
                    });
                    $('.tanceng .ven_sell_chance_setting_oldlist').html(venSellChanceFieldHtml);
                } else {
                    alert(oE.msg);
                }
            }
        });
        $.ajax({
            url: SERVER_URL + '/customer/settinglist',
            type: 'GET',
            data: {
                token: token,
                thetype: 6
            },
            async: false,
            dataType: 'json',
            success: function (oE) {
                console.log(oE);
                if (oE.code == 0) {
                    var datalist = oE.datalist;
                    var venSellChanceFieldHtml = '';
                    $.each(datalist, function (i, v) {
                        venSellChanceFieldHtml += '<div class="m_bottom_10">\
                            <div class="t_textinput left" style="width: 75%;margin-bottom:10px;">\
                            <div class="t_left"><i class="c_r v_hidden">*</i>自定义</div>\
                            <div class="t_right clearfix">\
                            <div class="inline_block select_mormal select_100 left">\
                            <input type="text" class="select_input ven_sell_chance_setting_fail_reason_inp c_3" value="' + v['title'] + '">\
                        </div>\
                        </div>\
                        </div>\
                        <div class="cg_ghs_setul">\
                            <button class="but_green page34_failReasonAdd">+</button>\
                            <button class="but_red page34_failReasonDelete">-</button>\
                            </div>\
                            </div>'
                    });
                    $('.tanceng .ven_sell_chance_setting_wcjyy_field_old_list').html(venSellChanceFieldHtml);
                } else {
                    alert(oE.msg);
                }
            }
        });
        dialogBoxAutoHeight('.ven_sell_chance_setting_dialog', $('.tanceng .ven_sell_chance_setting_dialog div.m_bottom_10').length - 2);
        $('.tanceng .ven_sell_chance_setting_fail_reason_btn').die('click').live('click', function () {
            if ($(this).is(':checked')) {
                $('.tanceng .ven_sell_chance_setting_fail_reason_inp').attr('disabled', null);
            } else {
                $('.tanceng .ven_sell_chance_setting_fail_reason_inp').attr('disabled', 'disabled');
            }
        })
    });
    //设置自定义字段 - 保存
    $('.tanceng .ven_sell_chance_setting_submit').die('click').live('click', function () {
        var venSellChanceField = [];
        $.each($('.tanceng .ven_sell_chance_setting_oldlist>.m_bottom_10'), function (i, v) {
            venSellChanceField.push($('.tanceng .ven_sell_chance_setting_oldlist .t_textinput').eq(i).find('.ven_custom_setting_info_field_new').val());
        });
        $.each($('.tanceng .ven_custom_setting_info_field_new_list .ven_custom_setting_info_field_new'), function (i, v) {
            if ($('.tanceng .ven_custom_setting_info_field_new_list .ven_custom_setting_info_field_new').eq(i).val() != '') {
                venSellChanceField.push($('.tanceng .ven_custom_setting_info_field_new_list .ven_custom_setting_info_field_new').eq(i).val());
            }
        });
        var venSellChanceFaildField = [];
        $.each($('.tanceng .ven_sell_chance_setting_wcjyy_field_old_list>.m_bottom_10'), function (i, v) {
            venSellChanceFaildField.push($('.tanceng .ven_sell_chance_setting_wcjyy_field_old_list>.m_bottom_10').eq(i).find('.ven_sell_chance_setting_fail_reason_inp').val());
        });
        $.each($('.tanceng .ven_sell_chance_setting_wcjyy_field_new_list .ven_sell_chance_setting_fail_reason_inp'), function (i, v) {
            if ($('.tanceng .ven_sell_chance_setting_wcjyy_field_new_list .ven_sell_chance_setting_fail_reason_inp').eq(i).val() != '') {
                venSellChanceFaildField.push($('.tanceng .ven_sell_chance_setting_wcjyy_field_new_list .ven_sell_chance_setting_fail_reason_inp').eq(i).val());
            }
        });
        console.log(venSellChanceField);
        $.ajax({
            url: SERVER_URL + '/customer/setting',
            type: 'POST',
            data: {
                token: token,
                thetype: 3,
                customer: venSellChanceField
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    /*$(this).closest('.dialog_box').remove();
                     $('.tanceng').css('display', 'none');*/
                } else {
                    alert(oE.msg);
                }
            }
        });
        $.ajax({
            url: SERVER_URL + '/customer/setting',
            type: 'POST',
            data: {
                token: token,
                thetype: 6,
                customer: venSellChanceFaildField
            },
            dataType: 'json',
            success: function (oE) {
                if (oE.code == 0) {
                    $(this).closest('.dialog_box').remove();
                    $('.tanceng').css('display', 'none');
                } else {
                    alert(oE.msg);
                }
            }
        });
    });
    //未成交反馈原因

});
