
//var SERVER_URL="http://192.168.0.167:9091";
//var SERVER_URL="http://192.168.0.167:9091";
/*2016121416190312079*/
 var token=Admin.get_token();
//var token='2017051308443559139-1-4';

var usercompany_id=localStorage.getItem("usercompany_id");
console.log('123');
console.log(usercompany_id);
console.log('123');
//	补零函数
function repair(x) {
    return x < 10 ? '0' + x : x
}
/*权限模板*/
$(function(){
/*权限设置列表*/
var set_list={
    token:token,
    page:1,
    num:10
}

/*列表方法*/
function mb_set_list_fn(){

    $.ajax({
        type: "get",
        url: SERVER_URL + "/role/list",
        data: set_list,
        dataType: 'json',
        success: function (data) {
            console.log('000');
            console.log(data);
            console.log('000');
            if(data['dataList'].length>0){
                $(".zcj_no_data_show_qxmb").hide();
                $(".zcj_qxmb_fy_page").show();
            }else{
                $(".zcj_no_data_show_qxmb").show();
                $(".zcj_qxmb_fy_page").hide();
            }
            var sort=''
            var html='';
            $(".zcj_search_mb_data_show").text(data['totalcount']);
            $.each(data['dataList'],function(index,template){
                sort=repair(index+1)

                if(template['status']==2){
                html+='<tr class="grey">';
                html+='<td><span class="voidIcon">作废</span></td>';
                }else{
                    html+='<tr>';
                    html+='<td>'+sort+'</td>';
                }
                html+='<td>'+template['role_name']+'</td>';
                html+='<td> <span>'+template['remark']+'</span> </td>';
               /* html+='<td>'+template['create_time']+'</td>';*/
               if(template['status']==2){
                   html+='<td> <button class="but_mix1 but_grey1" data-id="'+template['id']+'" name="">编辑</button><button class="but_mix1 but_grey1" data-id="'+template['id']+'" name="">分配权限</button><button class="but_mix1 but_grey1">作废</button> </td>';
                   html+='</tr>';
               }else {
                   html += '<td> <button class="but_mix but_exit val_dialog zcj_edit_mb_btn" data-id="' + template['id'] + '" name="system_qxmb_bj">编辑</button><button class="but_mix val_dialog zcj_qxmb_fpqx_btn" data-id="' + template['id'] + '" name="system_qxmb_xsfpqx">分配权限</button><button class="but_mix but_void but_r zcj_set_qxmb_zf_btn" data-id="' + template['id'] + '">作废</button> </td>';
                   html += '</tr>';
               }
            })
           $(".zcj_qxmb_set_list_data_show").html(html);
            var cur=data.dataList.length;
            var znum=data.totalcount;
            list_table_render_pagination(".zcj_qxmb_fy_page",set_list,mb_set_list_fn,znum,cur);
        },
        error:function(data){
            alert('更新失败');

        }
    })
}

    mb_set_list_fn();

    /*******************分配权限目录**************/
function limit_fp_info(){

    //获取权限模板
    $.ajax({
        url: SERVER_URL + '/system-work/get-all-menu',
        type: 'POST',
        data: {
            token: token
        },
        dataType: 'json',
        success: function (oE) {
            console.log('100');
            console.log(oE);
            //console.log(JSON.stringify(oE));
            var likFirstList = oE.dataList;
            var likTr = '';
            $.each(likFirstList, function (i, v) {
                var likOnOff = true;
                var likSecondList = v['children'];
                if (v['name'] == '财务') {
                    //两层、三层都有
                    var likThirdNumTotal = 0;
                    $.each(likSecondList, function (i2, v2) {
                        if (v2['children'].length > 0) {
                            likThirdNumTotal += parseFloat(v2['children'].length);
                        } else {
                            likThirdNumTotal += 1;
                        }
                    });
                    console.log(likThirdNumTotal);
                    $.each(likSecondList, function (i2, v2) {
                        var likPower = '';
                        if (v2['children'].length == 0) {
                            //循环权限
                            $.each(v2['powers'], function (i3, v3) {
                                likPower += '<span>\
                                        <input type="checkbox" class="zcj_power_id" funcid="' + v3['id'] + '"/>' + v3['func_name'] + '</span>'

                            })
                            if (likOnOff) {
                                likTr += '<tr>\
                                    <td rowspan="' + likThirdNumTotal + '"><span><input type="checkbox" name="hr_'+i+'" class="zcj_menu_id" pid="'+v['pid']+'" data-id="' + v['id'] + '"/>' + v['name'] + '</span></td>\
                                    <td rowspan="1"></td>\
                                    <td><span><input type="checkbox" name="two_'+i2+'" class="zcj_menu_id" pid="'+v2['pid']+'" data-id="' + v2['id'] + '" />' + v2['name'] + '</span></td>\
                                    <td>' + likPower + '</td>\
                                  </tr>';
                                likOnOff = false;
                            }else{
                                likTr += '<tr>\
                                    <td rowspan="1"></td>\
                                    <td><span><input type="checkbox" name="two_'+i2+'" class="zcj_menu_id" pid="'+v2['pid']+'" data-id="' + v2['id'] + '" />' + v2['name'] + '</span></td>\
                                    <td>' + likPower + '</td>\
                                  </tr>';
                            }
                        }else{
                            var likThirdList = v2['children'];
                            $.each(likThirdList, function (i3, v3) {
                                //循环权限
                                var likPower = ''
                                $.each(v3['powers'], function (i4, v4) {
                                    likPower += '<span>\
                                        <input type="checkbox" class="zcj_power_id" funcid="' + v4['id'] + '">' + v4['func_name'] + '</span>'
                                })
                                //有三层
                                if (likOnOff) {
                                    console.log(likThirdNumTotal);
                                    likTr += '<tr>\
                                    <td rowspan="' + likThirdNumTotal + '"><span><input type="checkbox" name="hr_'+i+'" class="zcj_menu_id" pid="'+v['pid']+'" data-id="' + v['id'] + '">' + v['name'] + '</span></td>\
                                    <td rowspan="1"></td>\
                                    <td><span><input type="checkbox" name="two_'+i2+'" class="zcj_menu_id" pid="'+v2['pid']+'" data-id="' + v2['id'] + '">' + v2['name'] + '</span></td>\
                                    <td>' + likPower + '</td>\
                                  </tr>';
                                    likOnOff = false;
                                } else if (i2 != 0 && i3 == 0) {
                                    likTr += '<tr>\
                                        <td rowspan="' + v2['children'].length + '"><span><input type="checkbox" name="two_'+i2+'" pid="'+v2['pid']+'" class="zcj_menu_id" data-id="' + v2['id'] + '">' + v2['name'] + '</span></td>\
                                        <td><span><input type="checkbox" name="three_'+i3+'" class="zcj_menu_id" pid="'+v3['pid']+'" data-id="' + v3['id'] + '">' + v3['name'] + '</span></td>\
                                        <td>' + likPower + '</td>\
                                      </tr>';
                                } else {
                                    likTr += '<tr>\
                                        <td><span><input type="checkbox" name="three_'+i3+'" class="zcj_menu_id" pid="'+v3['pid']+'" data-id="' + v3['id'] + '">' + v3['name'] + '</span></td>\
                                        <td>' + likPower + '</td>\
                                      </tr>';
                                }
                            });
                        }
                    });
                } else if (v['name'] == '系统设置') {
                    //两层、三层都有
                    var likThirdNumTotal = 0;
                    $.each(likSecondList, function (i2, v2) {
                        if (v2['children'].length > 0) {
                            likThirdNumTotal += parseFloat(v2['children'].length);
                        } else {
                            likThirdNumTotal += 1;
                        }
                    });
                    console.log(likThirdNumTotal);
                    $.each(likSecondList, function (i2, v2) {
                        var likPower = '';
                        if (v2['children'].length == 0) {
                            //循环权限
                            $.each(v2['powers'], function (i3, v3) {
                                likPower += '<span>\
                                        <input type="checkbox" class="zcj_power_id" funcid="' + v3['id'] + '"/>' + v3['func_name'] + '</span>'

                            })
                            if (likOnOff) {
                                likTr += '<tr>\
                                    <td rowspan="' + likThirdNumTotal + '"><span><input type="checkbox" name="hr_'+i+'" class="zcj_menu_id" pid="'+v['pid']+'" data-id="' + v['id'] + '"/>' + v['name'] + '</span></td>\
                                    <td rowspan="1"></td>\
                                    <td><span><input type="checkbox" name="two_'+i2+'" class="zcj_menu_id" pid="'+v2['pid']+'" data-id="' + v2['id'] + '" />' + v2['name'] + '</span></td>\
                                    <td>' + likPower + '</td>\
                                  </tr>';
                                likOnOff = false;
                            }else{
                                likTr += '<tr>\
                                    <td rowspan="1"></td>\
                                    <td><span><input type="checkbox" name="two_'+i2+'" class="zcj_menu_id" pid="'+v2['pid']+'" data-id="' + v2['id'] + '" />' + v2['name'] + '</span></td>\
                                    <td>' + likPower + '</td>\
                                  </tr>';
                            }
                        }else{
                            var likThirdList = v2['children'];
                            $.each(likThirdList, function (i3, v3) {
                                //循环权限
                                var likPower = ''
                                $.each(v3['powers'], function (i4, v4) {
                                    likPower += '<span>\
                                        <input type="checkbox" class="zcj_power_id" funcid="' + v4['id'] + '">' + v4['func_name'] + '</span>'
                                })
                                //有三层
                                if (likOnOff) {
                                    console.log(likThirdNumTotal);
                                    likTr += '<tr>\
                                    <td rowspan="' + likThirdNumTotal + '"><span><input type="checkbox" name="hr_'+i+'" class="zcj_menu_id" pid="'+v['pid']+'" data-id="' + v['id'] + '">' + v['name'] + '</span></td>\
                                    <td rowspan="1"></td>\
                                    <td><span><input type="checkbox" name="two_'+i2+'" class="zcj_menu_id" pid="'+v2['pid']+'" data-id="' + v2['id'] + '">' + v2['name'] + '</span></td>\
                                    <td>' + likPower + '</td>\
                                  </tr>';
                                    likOnOff = false;
                                } else if (i2 != 0 && i3 == 0) {
                                    likTr += '<tr>\
                                        <td rowspan="' + v2['children'].length + '"><span><input type="checkbox" name="two_'+i2+'" pid="'+v2['pid']+'" class="zcj_menu_id" data-id="' + v2['id'] + '">' + v2['name'] + '</span></td>\
                                        <td><span><input type="checkbox" name="three_'+i3+'" class="zcj_menu_id" pid="'+v3['pid']+'" data-id="' + v3['id'] + '">' + v3['name'] + '</span></td>\
                                        <td>' + likPower + '</td>\
                                      </tr>';
                                } else {
                                    likTr += '<tr>\
                                        <td><span><input type="checkbox" name="three_'+i3+'" class="zcj_menu_id" pid="'+v3['pid']+'" data-id="' + v3['id'] + '">' + v3['name'] + '</span></td>\
                                        <td>' + likPower + '</td>\
                                      </tr>';
                                }
                            });
                        }
                    });
                } else {
                    //只有单独的两层、三层
                    var likThirdNumTotal = 0;
                    $.each(likSecondList, function (i2, v2) {
                        likThirdNumTotal += parseFloat(v2['children'].length);
                    })
                    $.each(likSecondList, function (i2, v2) {
                        var likPower = '';
                        if (v2['children'].length == 0) {
                            //循环权限
                            $.each(v2['powers'], function (i3, v3) {
                                likPower += '<span>\
                                        <input type="checkbox" class="zcj_power_id" funcid="' + v3['id'] + '">' + v3['func_name'] + '</span>'
                            })
                            //有两层
                            if (i2 == 0) {
                                likTr += '<tr>\
                                        <td rowspan="' + v['children'].length + '"><span><input type="checkbox" name="hr_'+i+'" class="zcj_menu_id" pid="'+v['pid']+'" data-id="' + v['id'] + '">' + v['name'] + '</span></td>\
                                        <td rowspan="' + v['children'].length + '"></td>\
                                        <td><span><input type="checkbox" name="two_'+i2+'" class="zcj_menu_id" pid="'+v2['pid']+'" data-id="' + v2['id'] + '">' + v2['name'] + '</span></td>\
                                        <td>' + likPower + '</td>\
                                      </tr>';
                            } else {
                                likTr += '<tr>\
                                        <td><span><input type="checkbox" name="two_'+i2+'" class="zcj_menu_id" pid="'+v2['pid']+'" data-id="' + v2['id'] + '">' + v2['name'] + '</span></td>\
                                        <td>' + likPower + '</td>\
                                      </tr>';
                            }
                        } else {
                            var likThirdList = v2['children'];
                            $.each(likThirdList, function (i3, v3) {
                                //循环权限
                                var likPower = ''
                                $.each(v3['powers'], function (i4, v4) {
                                    likPower += '<span>\
                                        <input type="checkbox" class="zcj_power_id" funcid="' + v4['id'] + '">' + v4['func_name'] + '</span>'
                                })
                                //有三层
                                if (i2 == 0 && i3 == 0) {
                                    likTr += '<tr>\
                                        <td rowspan="' + likThirdNumTotal + '"><span><input type="checkbox" name="hr_'+i+'" class="zcj_menu_id" pid="'+v['pid']+'" data-id="' + v['id'] + '">' + v['name'] + '</span></td>\
                                        <td rowspan="' + v2['children'].length + '"><span><input type="checkbox" name="two_'+i2+'" class="zcj_menu_id" pid="'+v2['pid']+'" data-id="' + v2['id'] + '">' + v2['name'] + '</span></td>\
                                        <td><span><input type="checkbox" name="three_'+i3+'" class="zcj_menu_id" pid="'+v3['pid']+'" data-id="' + v3['id'] + '">' + v3['name'] + '</span></td>\
                                        <td>' + likPower + '</td>\
                                      </tr>';
                                } else if (i2 != 0 && i3 == 0) {
                                    likTr += '<tr>\
                                        <td rowspan="' + v2['children'].length + '"><span><input type="checkbox" name="two_'+i2+'" class="zcj_menu_id" pid="'+v2['pid']+'" data-id="' + v2['id'] + '">' + v2['name'] + '</span></td>\
                                        <td><span><input type="checkbox" name="three_'+i3+'" class="zcj_menu_id" pid="'+v3['pid']+'" data-id="' + v3['id'] + '">' + v3['name'] + '</span></td>\
                                        <td>' + likPower + '</td>\
                                      </tr>';
                                } else {
                                    likTr += '<tr>\
                                        <td><span><input type="checkbox" name="three_'+i3+'" class="zcj_menu_id" pid="'+v3['pid']+'" data-id="' + v3['id'] + '">' + v3['name'] + '</span></td>\
                                        <td>' + likPower + '</td>\
                                      </tr>';
                                }
                            });
                        }
                    });
                }
            });
            $('.zcj_gs_info_table').html(likTr);

        }
    });
}


/*分配权限详情*/
function fpqx_xq_fn(mid){
    $.ajax({
        type: "post",
        url: SERVER_URL + "/system-work/edit-power",
        data: {
            token: token,
            id: mid
        },
        dataType: 'json',
        success: function (data) {
            console.log('000');
            console.log(data);
            console.log('000');
             $(".zcj_role_name_show_head").text(data['role']['role_name']);
             $(".zcj_qxms_content_show").text(data['role']['remark']);
            var likFirstList = data.data;
            var likTr = '';
            $.each(likFirstList, function (i, v) {
                var likOnOff = true;
                var likSecondList = v['children'];
                if (v['name'] == '财务') {
                    //两层、三层都有
                    var likThirdNumTotal = 0;
                    $.each(likSecondList, function (i2, v2) {
                        if (v2['children'].length > 0) {
                            likThirdNumTotal += parseFloat(v2['children'].length);
                        } else {
                            likThirdNumTotal += 1;
                        }
                    });
                    $.each(likSecondList, function (i2, v2) {
                        var likPower = '';
                        if (v2['children'].length == 0) {
                            //循环权限
                            $.each(v2['powers'], function (i3, v3) {
                                likPower += '<span>\
                                        <input type="checkbox" class="zcj_power_id" funcid="' + v3['id'] + '" ' + (v3['xuanzhong'] == 1 ? 'checked="checked"' : '') + ' />' + v3['func_name'] + '</span>'
                            })
                            if (likOnOff) {
                                likTr += '<tr>\
                                    <td rowspan="' + likThirdNumTotal + '"><span><input type="checkbox" pid="'+v['pid']+'" name="hr_'+i+'" class="zcj_menu_id" data-id="' + v['id'] + '" ' + (v['xuanzhong'] == 1 ? 'checked="checked"' : '') + '/>' + v['name'] + '</span></td>\
                                    <td rowspan="1"></td>\
                                    <td><span><input type="checkbox" class="zcj_menu_id" pid="'+v2['pid']+'" name="two_'+i2+'" data-id="' + v2['id'] + '" ' + (v2['xuanzhong'] == 1 ? 'checked="checked"' : '') + '/>' + v2['name'] + '</span></td>\
                                    <td>' + likPower + '</td>\
                                  </tr>';
                                likOnOff = false;
                            }else{
                                likTr += '<tr>\
                                    <td rowspan="1"></td>\
                                    <td><span><input type="checkbox" class="zcj_menu_id" pid="'+v2['pid']+'" name="two_'+i2+'" data-id="' + v2['id'] + '" ' + (v2['xuanzhong'] == 1 ? 'checked="checked"' : '') + '/>' + v2['name'] + '</span></td>\
                                    <td>' + likPower + '</td>\
                                  </tr>';
                            }
                        }else{
                            var likThirdList = v2['children'];
                            $.each(likThirdList, function (i3, v3) {
                                //循环权限
                                var likPower = ''
                                $.each(v3['powers'], function (i4, v4) {
                                    likPower += '<span>\
                                        <input type="checkbox" class="zcj_power_id" funcid="' + v4['id'] + '" ' + (v4['xuanzhong'] == 1 ? 'checked="checked"' : '') + '>' + v4['func_name'] + '</span>'
                                })
                                //有三层
                                if (likOnOff) {
                                    likTr += '<tr>\
                                    <td rowspan="' + likThirdNumTotal + '"><span><input type="checkbox" pid="'+v['pid']+'" name="hr_'+i+'" class="zcj_menu_id" data-id="' + v['id'] + '" ' + (v['xuanzhong'] == 1 ? 'checked="checked"' : '') + '>' + v['name'] + '</span></td>\
                                    <td rowspan="' + v2['children'].length + '"></td>\
                                    <td><span><input type="checkbox" class="zcj_menu_id" pid="'+v2['pid']+'" name="two_'+i2+'" data-id="' + v2['id'] + '" ' + (v2['xuanzhong'] == 1 ? 'checked="checked"' : '') + '>' + v2['name'] + '</span></td>\
                                    <td>' + likPower + '</td>\
                                  </tr>';
                                    likOnOff = false;
                                } else if (i2 != 0 && i3 == 0) {
                                    likTr += '<tr>\
                                        <td rowspan="' + v2['children'].length + '"><span><input type="checkbox" pid="'+v2['pid']+'" name="two_'+i2+'" class="zcj_menu_id" data-id="' + v2['id'] + '" ' + (v2['xuanzhong'] == 1 ? 'checked="checked"' : '') + '>' + v2['name'] + '</span></td>\
                                        <td><span><input type="checkbox" class="zcj_menu_id" pid="'+v3['pid']+'" data-id="' + v3['id'] + '" ' + (v3['xuanzhong'] == 1 ? 'checked="checked"' : '') + '>' + v3['name'] + '</span></td>\
                                        <td>' + likPower + '</td>\
                                      </tr>';
                                } else {
                                    likTr += '<tr>\
                                        <td><span><input type="checkbox" class="zcj_menu_id" pid="'+v3['pid']+'" data-id="' + v3['id'] + '" ' + (v3['xuanzhong'] == 1 ? 'checked="checked"' : '') + '>' + v3['name'] + '</span></td>\
                                        <td>' + likPower + '</td>\
                                      </tr>';
                                }
                            });
                        }
                    });
                } else if (v['name'] == '系统设置') {
//两层、三层都有
                    var likThirdNumTotal = 0;
                    $.each(likSecondList, function (i2, v2) {
                        if (v2['children'].length > 0) {
                            likThirdNumTotal += parseFloat(v2['children'].length);
                        } else {
                            likThirdNumTotal += 1;
                        }
                    });
                    $.each(likSecondList, function (i2, v2) {
                        var likPower = '';
                        if (v2['children'].length == 0) {
                            //循环权限
                            $.each(v2['powers'], function (i3, v3) {
                                likPower += '<span>\
                                        <input type="checkbox" class="zcj_power_id" funcid="' + v3['id'] + '" ' + (v3['xuanzhong'] == 1 ? 'checked="checked"' : '') + ' />' + v3['func_name'] + '</span>'
                            })
                            if (likOnOff) {
                                likTr += '<tr>\
                                    <td rowspan="' + likThirdNumTotal + '"><span><input type="checkbox" pid="'+v['pid']+'" name="hr_'+i+'" class="zcj_menu_id" data-id="' + v['id'] + '" ' + (v['xuanzhong'] == 1 ? 'checked="checked"' : '') + '/>' + v['name'] + '</span></td>\
                                    <td rowspan="1"></td>\
                                    <td><span><input type="checkbox" class="zcj_menu_id" pid="'+v2['pid']+'" name="two_'+i2+'" data-id="' + v2['id'] + '" ' + (v2['xuanzhong'] == 1 ? 'checked="checked"' : '') + '/>' + v2['name'] + '</span></td>\
                                    <td>' + likPower + '</td>\
                                  </tr>';
                                likOnOff = false;
                            }else{
                                likTr += '<tr>\
                                    <td rowspan="1"></td>\
                                    <td><span><input type="checkbox" class="zcj_menu_id" pid="'+v2['pid']+'" name="two_'+i2+'" data-id="' + v2['id'] + '" ' + (v2['xuanzhong'] == 1 ? 'checked="checked"' : '') + '/>' + v2['name'] + '</span></td>\
                                    <td>' + likPower + '</td>\
                                  </tr>';
                            }
                        }else{
                            var likThirdList = v2['children'];
                            $.each(likThirdList, function (i3, v3) {
                                //循环权限
                                var likPower = ''
                                $.each(v3['powers'], function (i4, v4) {
                                    likPower += '<span>\
                                        <input type="checkbox" class="zcj_power_id" funcid="' + v4['id'] + '" ' + (v4['xuanzhong'] == 1 ? 'checked="checked"' : '') + '>' + v4['func_name'] + '</span>'
                                })
                                //有三层
                                if (likOnOff) {
                                    likTr += '<tr>\
                                    <td rowspan="' + likThirdNumTotal + '"><span><input type="checkbox" pid="'+v['pid']+'" name="hr_'+i+'" class="zcj_menu_id" data-id="' + v['id'] + '" ' + (v['xuanzhong'] == 1 ? 'checked="checked"' : '') + '>' + v['name'] + '</span></td>\
                                    <td rowspan="' + v2['children'].length + '"></td>\
                                    <td><span><input type="checkbox" class="zcj_menu_id" pid="'+v2['pid']+'" name="two_'+i2+'" data-id="' + v2['id'] + '" ' + (v2['xuanzhong'] == 1 ? 'checked="checked"' : '') + '>' + v2['name'] + '</span></td>\
                                    <td>' + likPower + '</td>\
                                  </tr>';
                                    likOnOff = false;
                                } else if (i2 != 0 && i3 == 0) {
                                    likTr += '<tr>\
                                        <td rowspan="' + v2['children'].length + '"><span><input type="checkbox" pid="'+v2['pid']+'" name="two_'+i2+'" class="zcj_menu_id" data-id="' + v2['id'] + '" ' + (v2['xuanzhong'] == 1 ? 'checked="checked"' : '') + '>' + v2['name'] + '</span></td>\
                                        <td><span><input type="checkbox" class="zcj_menu_id" pid="'+v3['pid']+'" data-id="' + v3['id'] + '" ' + (v3['xuanzhong'] == 1 ? 'checked="checked"' : '') + '>' + v3['name'] + '</span></td>\
                                        <td>' + likPower + '</td>\
                                      </tr>';
                                } else {
                                    likTr += '<tr>\
                                        <td><span><input type="checkbox" class="zcj_menu_id" pid="'+v3['pid']+'" data-id="' + v3['id'] + '" ' + (v3['xuanzhong'] == 1 ? 'checked="checked"' : '') + '>' + v3['name'] + '</span></td>\
                                        <td>' + likPower + '</td>\
                                      </tr>';
                                }
                            });
                        }
                    });
                } else {
                    //只有单独的两层、三层
                    var likThirdNumTotal = 0;
                    $.each(likSecondList, function (i2, v2) {
                        likThirdNumTotal += parseFloat(v2['children'].length);
                    })
                    $.each(likSecondList, function (i2, v2) {
                        var likPower = '';
                        if (v2['children'].length == 0) {
                            //循环权限
                            $.each(v2['powers'], function (i3, v3) {
                                likPower += '<span>\
                                        <input type="checkbox" class="zcj_power_id" funcid="' + v3['id'] + '" ' + (v3['xuanzhong'] == 1 ? 'checked="checked"' : '') + '>' + v3['func_name'] + '</span>'
                            })
                            //有两层
                            if (i2 == 0) {
                                likTr += '<tr>\
                                        <td rowspan="' + v['children'].length + '"><span><input type="checkbox" pid="'+v['pid']+'" name="hr_'+i+'" class="zcj_menu_id" data-id="' + v['id'] + '" ' + (v['xuanzhong'] == 1 ? 'checked="checked"' : '') + '>' + v['name'] + '</span></td>\
                                        <td rowspan="' + v['children'].length + '"></td>\
                                        <td><span><input type="checkbox" class="zcj_menu_id" pid="'+v2['pid']+'" name="two_'+i2+'" data-id="' + v2['id'] + '" ' + (v2['xuanzhong'] == 1 ? 'checked="checked"' : '') + '>' + v2['name'] + '</span></td>\
                                        <td>' + likPower + '</td>\
                                      </tr>';
                            } else {
                                likTr += '<tr>\
                                        <td><span><input type="checkbox" class="zcj_menu_id" pid="'+v2['pid']+'" name="two_'+i2+'" data-id="' + v2['id'] + '" ' + (v2['xuanzhong'] == 1 ? 'checked="checked"' : '') + '>' + v2['name'] + '</span></td>\
                                        <td>' + likPower + '</td>\
                                      </tr>';
                            }
                        } else {
                            var likThirdList = v2['children'];
                            $.each(likThirdList, function (i3, v3) {
                                //循环权限
                                var likPower = ''
                                $.each(v3['powers'], function (i4, v4) {
                                    likPower += '<span>\
                                        <input type="checkbox" class="zcj_power_id" funcid="' + v4['id'] + '" ' + (v4['xuanzhong'] == 1 ? 'checked="checked"' : '') + '>' + v4['func_name'] + '</span>'
                                })
                                //有三层
                                if (i2 == 0 && i3 == 0) {
                                    likTr += '<tr>\
                                        <td rowspan="' + likThirdNumTotal + '"><span><input type="checkbox" pid="'+v['pid']+'" name="hr_'+i+'" class="zcj_menu_id" data-id="' + v['id'] + '" ' + (v['xuanzhong'] == 1 ? 'checked="checked"' : '') + '>' + v['name'] + '</span></td>\
                                        <td rowspan="' + v2['children'].length + '"><span><input type="checkbox" pid="'+v2['pid']+'" name="two_'+i2+'" class="zcj_menu_id" data-id="' + v2['id'] + '" ' + (v2['xuanzhong'] == 1 ? 'checked="checked"' : '') + '>' + v2['name'] + '</span></td>\
                                        <td><span><input type="checkbox" class="zcj_menu_id" pid="'+v3['pid']+'" data-id="' + v3['id'] + '" ' + (v3['xuanzhong'] == 1 ? 'checked="checked"' : '') + '>' + v3['name'] + '</span></td>\
                                        <td>' + likPower + '</td>\
                                      </tr>';
                                } else if (i2 != 0 && i3 == 0) {
                                    likTr += '<tr>\
                                        <td rowspan="' + v2['children'].length + '"><span><input type="checkbox" pid="'+v2['pid']+'" name="two_'+i2+'" class="zcj_menu_id" data-id="' + v2['id'] + '" ' + (v2['xuanzhong'] == 1 ? 'checked="checked"' : '') + '>' + v2['name'] + '</span></td>\
                                        <td><span><input type="checkbox" class="zcj_menu_id" pid="'+v3['pid']+'" data-id="' + v3['id'] + '" ' + (v3['xuanzhong'] == 1 ? 'checked="checked"' : '') + '>' + v3['name'] + '</span></td>\
                                        <td>' + likPower + '</td>\
                                      </tr>';
                                } else {
                                    likTr += '<tr>\
                                        <td><span><input type="checkbox" class="zcj_menu_id" pid="'+v3['pid']+'" data-id="' + v3['id'] + '" ' + (v3['xuanzhong'] == 1 ? 'checked="checked"' : '') + '>' + v3['name'] + '</span></td>\
                                        <td>' + likPower + '</td>\
                                      </tr>';
                                }
                            });
                        }
                    });
                }
            });
            $('.zcj_gs_info_table').html(likTr);

        }
    })
}

    //有多层，但只要两层
    /*$.each(likSecondList, function (i2, v2) {
        if (i2 == 0) {
            likTr += '<tr>\
                                        <td rowspan="' + v['children'].length + '"><span><input type="checkbox" pid="'+v['pid']+'" name="hr_'+i+'" class="zcj_menu_id" data-id="' + v['id'] + '" ' + (v['xuanzhong'] == 1 ? 'checked="checked"' : '') + '>' + v['name'] + '</span></td>\
                                        <td rowspan="' + v['children'].length + '"></td>\
                                        <td><span><input type="checkbox" class="zcj_menu_id" pid="'+v2['pid']+'" name="two_'+i2+'" data-id="' + v2['id'] + '" ' + (v2['xuanzhong'] == 1 ? 'checked="checked"' : '') + '>' + v2['name'] + '</span></td>\
                                        <td></td>\
                                      </tr>';
        } else {
            likTr += '<tr>\
                                        <td><span><input type="checkbox" class="zcj_menu_id" pid="'+v2['pid']+'" name="two_'+i2+'" data-id="' + v2['id'] + '" ' + (v2['xuanzhong'] == 1 ? 'checked="checked"' : '') + '>' + v2['name'] + '</span></td>\
                                        <td></td>\
                                      </tr>';
        }
    });*/

    /*******************分配权限btn*****************************/

$(".zcj_qxmb_fpqx_btn").die().live("click",function () {
    var id=$(this).data('id');
    fpqx_xq_fn(id);

    /*点击头部*/
    $(".tanceng .zcj_gs_info_table input[name^='hr_']").die().live("click",function(){
        var id=$(this).data('id');
        if($(this).is(":checked")){
            $(".tanceng .zcj_gs_info_table tr").find('.zcj_menu_id').each(function(){
                var tid=$(this).data('id');

                if($(this).attr('pid')==id){
                    $(this).attr('checked',true);
                    $(this).parents('td').siblings().find('input').attr('checked',true);
                    $(".tanceng .zcj_gs_info_table tr").find('.zcj_menu_id').each(function(){
                        if($(this).attr('pid')==tid){
                            $(this).attr('checked',true);
                            $(this).parents('td').siblings().find('input').attr('checked',true);
                        }

                    })

                    //$(this).parents('td').siblings().find('input').attr('checked',true);
                }else{

                }
            })
        }else{
            $(".tanceng .zcj_gs_info_table tr").find('.zcj_menu_id').each(function(){
                var tid=$(this).data('id');
                if($(this).attr('pid')==id){
                    $(this).attr('checked',false);
                    $(this).parents('td').siblings().find('input').attr('checked',false);
                    $(".tanceng .zcj_gs_info_table tr").find('.zcj_menu_id').each(function(){
                        if($(this).attr('pid')==tid){
                            $(this).attr('checked',false);
                            $(this).parents('td').siblings().find('input').attr('checked',false);
                        }

                    })
                    //$(this).parents('td').siblings().find('input').attr('checked',true);
                }else{

                }
            })
        }

    });


    /*点击子模块*/
    $(".tanceng .zcj_gs_info_table .zcj_menu_id").die().live("click",function(){
        var pid=$(this).attr('pid');
        var id=$(this).data('id');
        if($(this).is(":checked")){
            $(".tanceng .zcj_gs_info_table tr").find('.zcj_menu_id').each(function(){

                var p1=$(this).attr('pid')
                if($(this).data('id')==pid){
                    $(this).attr('checked',true);
                    //$(this).parents('td').siblings().find('input').attr('checked',true);
                    $(".tanceng .zcj_gs_info_table tr").find('.zcj_menu_id').each(function() {
                        if ($(this).data('id') == p1) {

                            $(this).attr('checked', true);
                            //$(this).parents('td').siblings().find('input').attr('checked',true);
                        }
                       // $(this).parents('td').siblings().find('input').attr('checked',true);
                    })

                }
                if(id==p1){
                    $(this).attr('checked', true);
                    $(this).parents('td').siblings().find('input').attr('checked',true);
                }
            })
             $(this).parents('td').siblings().find('input').attr('checked',true);
            // $(".tanceng .zcj_gs_info_table input[name^='two_']").each(function(){
            //
            // })
        }else{
            $(".tanceng .zcj_gs_info_table tr").find('.zcj_menu_id').each(function(){
                var p1=$(this).attr('pid');
                 if(id==p1){
                    $(this).attr('checked', false);
                    $(this).parents('td').siblings().find('.zcj_power_id').attr('checked',false);
                }
            })
            $(this).parents('td').siblings().find('.zcj_power_id').attr('checked',false);
        }
    });
    /*点击小模块*/
    $(".tanceng .zcj_gs_info_table .zcj_power_id").die().live("click",function(){
        if($(this).is(':checked')){
            //var p3=$(this).attr('pid');
             $(this).parents('td').siblings().find('input').attr('checked',true);
            var pid=$(this).parents('td').prev('td').find('input').attr('pid');
            // var pid2=$(this).parents('td').prev().prev().find('input').attr('pid');
            // var pd=$(this).parents('tr').children('td:first-child').find('input').attr('pid');
            $(".tanceng .zcj_gs_info_table tr .zcj_menu_id").each(function(){
                var p2=$(this).attr('pid')
                if($(this).data('id')==pid){
                    $(this).attr('checked', true);
                    $(".tanceng .zcj_gs_info_table tr").find('.zcj_menu_id').each(function() {
                        if ($(this).data('id') == p2) {
                            $(this).attr('checked', true);
                        }
                    })

                }
            })
        }

    })
    //fp_qx_fn(id);
    $(".tanceng .zcj_tc_edit_content_btn").die().live("click",function(){
        var me=this;
        var role_name=$(".tanceng .zcj_role_name_show_head").text();
        var remark=$(".tanceng .zcj_qxms_content_show").text();
        /* var status=$(".zcj_jsname_edit_role").data('status');*/
        var config_id=[];
        $(".tanceng .zcj_gs_info_table .zcj_power_id").each(function(){
            if($(this).is(':checked')){
                if($(this).attr('funcid')!=''){
                    config_id.push($(this).attr('funcid'));
                }

            }
        })
        var menu_id=[];
        $(".tanceng .zcj_gs_info_table .zcj_menu_id").each(function(){
            if($(this).is(':checked')){
                if($(this).data('id')!=''){
                    menu_id.push($(this).data('id'));
                }

            }
        })
        console.log('000123');
        console.log(config_id);
        console.log('000123');
        var editdata = {};
        editdata['token']=token;
        editdata['id'] = id;
        editdata['role_name']=role_name;
        editdata['remark']=remark;
        editdata['status']=1;
        editdata['edit']=2;
        editdata['company_id']=usercompany_id;
        editdata['power_id']=config_id.toString();
        editdata['menu_id']=menu_id.toString();
        /* if (editdata['id'] == '') {
         delete editdata['id'];
         }*/
        // if(role_name==''){
        //     alert("请输入角色名称");
        // }else if(remark==''){
        //     alert("请输入权限描述");
        // }else {
            $.ajax({
                type: "post",
                url: SERVER_URL + "/role/add",
                data:editdata,
                dataType: 'json',
                success: function (data) {

                    console.log(data);

                    if(data.code==0){
                        mb_set_list_fn()
                        $(me).parents('.zcj_juris_mobm_table').find('.dialog_close').click();
                        //$(".zcj_new_xj_qx_table").find('.dialog_close').click();
                    }else{
                        alert(data.msg)
                    }

                },
                error:function(data){
                    alert('更新失败');

                }
            })
        // }

    });

});



    /*新建btn*/
    $(".zcj_new_create_mb_end_btn").die().live("click",function(){
        var name=$(".zcj_jsname_new_create").val();
            if(name=='请输入角色名称' || name==''){
                $(".tanceng .zcj_new_xj_next_qx_btn").removeClass('val_dialogTop');
            }else{
                $(".tanceng .zcj_new_xj_next_qx_btn").addClass('val_dialogTop');
            }

        $(".zcj_jsname_new_create").die().live("blur",function(){
            if($(this).val()=='请输入角色名称' || $(this).val()==''){
                $(".tanceng .zcj_new_xj_next_qx_btn").removeClass('val_dialogTop');
            }else{
                $(".tanceng .zcj_new_xj_next_qx_btn").addClass('val_dialogTop');
            }
        });
    });
/*新建权限模板zcj_new_create_mb_end_btn 下一步*/
$(".tanceng .zcj_new_xj_next_qx_btn").die().live("click",function () {
    var name=$(".zcj_jsname_new_create").val();
    var content=$(".zcj_js_qx_bz_content").val();
     $(".zcj_role_name_show_head").text(name)
    $(".zcj_qxms_content_show").text(content);
    if(name=='请输入角色名称' || name==''){
        alert("请输入角色名称")
        return false;
    }

    limit_fp_info();


    /*点击头部*/
    $(".tanceng .zcj_gs_info_table input[name^='hr_']").die().live("click",function(){
        var id=$(this).data('id');
        if($(this).is(":checked")){
            $(".tanceng .zcj_gs_info_table tr").find('.zcj_menu_id').each(function(){
                var tid=$(this).data('id');

                if($(this).attr('pid')==id){
                    $(this).attr('checked',true);
                    $(this).parents('td').siblings().find('input').attr('checked',true);
                    $(".tanceng .zcj_gs_info_table tr").find('.zcj_menu_id').each(function(){
                        if($(this).attr('pid')==tid){
                            $(this).attr('checked',true);
                            $(this).parents('td').siblings().find('input').attr('checked',true);
                        }

                    })

                    //$(this).parents('td').siblings().find('input').attr('checked',true);
                }else{

                }
            })
        }else{
            $(".tanceng .zcj_gs_info_table tr").find('.zcj_menu_id').each(function(){
                var tid=$(this).data('id');
                if($(this).attr('pid')==id){
                    $(this).attr('checked',false);
                    $(this).parents('td').siblings().find('input').attr('checked',false);
                    $(".tanceng .zcj_gs_info_table tr").find('.zcj_menu_id').each(function(){
                        if($(this).attr('pid')==tid){
                            $(this).attr('checked',false);
                            $(this).parents('td').siblings().find('input').attr('checked',false);
                        }

                    })
                    //$(this).parents('td').siblings().find('input').attr('checked',true);
                }else{

                }
            })
        }

    });
    /*点击子模块*/
    $(".tanceng .zcj_gs_info_table .zcj_menu_id").die().live("click",function(){
        var pid=$(this).attr('pid');
        var id=$(this).data('id');
        //alert(pid);
        if($(this).is(":checked")){
            $(".tanceng .zcj_gs_info_table tr").find('.zcj_menu_id').each(function(){

                var p1=$(this).attr('pid')
                if($(this).data('id')==pid){
                    $(this).attr('checked',true);
                    $(".tanceng .zcj_gs_info_table tr").find('.zcj_menu_id').each(function() {
                        if ($(this).data('id') == p1) {
                            $(this).attr('checked', true);
                        }
                    })
                    //$(this).parents('td').siblings().find('input').attr('checked',true);
                }else{

                }
                if(id==p1){
                    $(this).attr('checked', true);
                    $(this).parents('td').siblings().find('input').attr('checked',true);
                }

            })

            $(this).parents('td').siblings().find('input').attr('checked',true);
        }else{
            $(".tanceng .zcj_gs_info_table tr").find('.zcj_menu_id').each(function(){
                var p1=$(this).attr('pid');
                if(id==p1){
                    $(this).attr('checked', false);
                    $(this).parents('td').siblings().find('.zcj_power_id').attr('checked',false);
                }

            })
            $(this).parents('td').siblings().find('.zcj_power_id').attr('checked',false);
            //$(this).parents('td').siblings().find('input').attr('checked',false);
        }
    });
    /*点击小模块*/
    $(".tanceng .zcj_gs_info_table .zcj_power_id").die().live("click",function(){
        if($(this).is(':checked')){
            $(this).parents('td').siblings().find('input').attr('checked',true);
            var pid=$(this).parents('td').prev('td').find('input').attr('pid');

            $(".tanceng .zcj_gs_info_table tr .zcj_menu_id").each(function(){
                var p2=$(this).attr('pid')
                if($(this).data('id')==pid){
                    $(this).attr('checked', true);
                    $(".tanceng .zcj_gs_info_table tr").find('.zcj_menu_id').each(function() {
                        if ($(this).data('id') == p2) {
                            $(this).attr('checked', true);
                        }
                    })

                }
            })
        }

    })

    /*新建确认按钮*/
    $(".tanceng .zcj_tc_edit_content_btn").die().live("click",function(){
        var _this=this;
        //var qx_id=$(".zcj_qxmb_fpqx_btn").data('id');
        var role_name;
        var remark;
        if($(".tanceng .zcj_role_name_show_head").text()=='请输入角色名称'){
            role_name='';
        }else{
            role_name=$(".tanceng .zcj_role_name_show_head").text();
        }
        if($(".tanceng .zcj_qxms_content_show").text()=="请输入权限描述"){
            remark==''
        }else{
            remark=$(".tanceng .zcj_qxms_content_show").text();
        }
       /* var status=$(".zcj_jsname_edit_role").data('status');*/
        var config_id=[];
        $(".tanceng .zcj_gs_info_table .zcj_power_id").each(function(){
            if($(this).is(':checked')){
                if($(this).attr('funcid')!=''){
                    config_id.push($(this).attr('funcid'));
                }

            }
        })
        var menu_id=[];
        $(".tanceng .zcj_gs_info_table .zcj_menu_id").each(function(){
            if($(this).is(':checked')){
                if($(this).data('id')!=''){
                    menu_id.push($(this).data('id'));
                }
            }
        })
        console.log('000123');
        console.log(config_id);
        console.log(menu_id);
        console.log('000123');
        var editdata = {};
        editdata['token']=token;
       /* editdata['id'] = id;*/

        editdata['role_name']=role_name;
        editdata['remark']=remark;
        //editdata['id']=qx_id;
        editdata['status']=1;
        editdata['company_id']=usercompany_id;
        editdata['power_id']=config_id.toString();
        editdata['menu_id']=menu_id.toString();
        // if (editdata['id'] == '') {
        //     delete editdata['id'];
        // }
        if(role_name==''){
            alert("请输入角色名称");
        }else{
            $.ajax({
                type: "post",
                url: SERVER_URL + "/role/add",
                data: editdata,
                dataType: 'json',
                success: function (data) {

                    console.log(data);

                    if (data.code == 0) {
                        mb_set_list_fn()
                        $(_this).parents('.zcj_juris_mobm_table').find('.dialog_close').click();
                        $(".tanceng .zcj_new_xj_qx_table").find('.dialog_close').click();
                    } else {
                        alert(data.msg)
                    }

                },
                error: function (data) {
                    alert('更新失败');

                }
            })
        }
    });

});
/*取消*/
$(".tanceng .zcj_new_create_mb_qx_btn").die().live("click",function(){
    $(this).parents('.dialog_content').find('.dialog_close').click();
});

    /*编辑制度*/
    $(".zcj_edit_mb_btn").die().live("click",function () {
        var id=$(this).data('id')
        $.ajax({
            type: "post",
            url: SERVER_URL + "/role/info",
            data:{
                token:token,
                id:id
            },
            dataType: 'json',
            success: function (data) {
                console.log('000');
                console.log(data);
                console.log('000');
                var sort=''
                var html='';
                $(".zcj_jsname_edit_role").val(data['data']['role_name']);
                $(".zcj_jsname_edit_role").data('status',data['data']['status']);
                $(".zcj_jsname_edit_content_show").val(data['data']['remark']);
                var power_num=[];
                if(data['data']['power']!=null){
                    $.each(data['data']['power'],function (v,num) {

                        power_num.push(num)
                    })
                }

                console.log(power_num);

                // $.each(data['data']['powerList'],function(index,temlist){
                //
                //     html+='<tr>'
                //     var info=''
                //     $.each(temlist,function(i,vlist){
                //              html+='<td><span><input type="checkbox" value=""/>'+i+'</span></td>'
                //         $.each(vlist,function(v,info_list){
                //             if(power_num.indexOf(info_list['id'])!=-1){
                //                 info+='<span> <input type="checkbox" data-id="'+info_list['id']+'" checked="checked" value=""/>'+info_list['power_name']+'</span>'
                //             }else{
                //                 info+='<span> <input type="checkbox" data-id="'+info_list['id']+'" value=""/>'+info_list['power_name']+'</span>'
                //             }
                //
                //         })
                //         html+='<td>'+info+'</td>'
                //     })
                //
                //     html+='</tr>'
                //
                //   })
                //
                // $(".zcj_gs_info_table").html(html);

                // $(".zcj_gs_info_table tr").each(function(i){
                //     if($(this).find('input:checked').length>0){
                //         $(this).find('td').eq(0).find('input').attr('checked','checked');
                //     }
                // })
                // $(".tanceng .zcj_gs_info_table tr td input").die().live("click",function(){
                //     if($(this).parent().parent().find('input:checked').length>0){
                //
                //         $(this).parent().parent().prev().find('input').attr('checked','checked')
                //     }else{
                //
                //         $(this).parent().parent().prev().find('input').attr('checked',false)
                //     }
                //
                // });
            },
            error:function(data){
                alert('更新失败');

            }
        })
        /*点击下一步*/
        /* $(".zcj_edit_next_step_btn").die().live("click",function(){

        }); */
        /*编辑确定按钮*/
        $(".tanceng .zcj_edit_next_step_btn").die().live("click",function(){
            var _this=this;
            var status=$(".tanceng .zcj_jsname_edit_role").data('status');
            // var config_id=[];
            // $(".tanceng .zcj_gs_info_table input").each(function(){
            //     if($(this).is(':checked')){
            //
            //             config_id.push($(this).data('id'));
            //
            //     }
            // })
            var role_name=$('.tanceng .zcj_jsname_edit_role').val();
            var remark=$('.tanceng .zcj_jsname_edit_content_show').val();
            var editdata = {};
            editdata['token']=token;
            editdata['id'] = id;
            editdata['role_name']= role_name;
            editdata['remark']=remark;
            editdata['up']=1;
            //editdata['company_id']=usercompany_id;
            //editdata['edit']=1;
            // editdata['power']=config_id.toString();
            // if (editdata['id'] == '') {
            //     delete editdata['id'];
            // }
            $.ajax({
                type: "post",
                url: SERVER_URL + "/role/info",
                data:editdata,
                dataType: 'json',
                success: function (data) {

                    console.log(data);

                    if(data.code==0){
                        mb_set_list_fn()
                        $(_this).parents('.dialog_content').find('.dialog_close').click();
                    }else{
                        alert(data.msg)
                    }

                },
                error:function(data){
                    alert('更新失败');

                }
            })
        });


    });

/*作废*/
$(".zcj_set_qxmb_zf_btn").die().live("click",function(){
    /*set_list['status']=2;*/
    var id=$(this).data('id');
    $.ajax({
        type: "get",
        url: SERVER_URL + "/role/stop",
        data:{
            token:token,
            id:id,
            status:2
        },
        dataType: 'json',
        success: function (data) {

            console.log(data);

            if(data.code==0){
                mb_set_list_fn()

            }else{
                alert(data.msg)
            }

        },
        error:function(data){
            alert('更新失败');

        }
    })

});
/*刷新*/
$(".zcj_ref_sx_dj_btn").die().live("click",function(){
    set_list['page']='';
    set_list['num']='';

    mb_set_list_fn();
});



})
