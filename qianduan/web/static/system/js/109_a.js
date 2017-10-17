//SERVER_URL = 'http://192.168.0.167:9091';
$(function () {

    var token, page, num, keywords, type;
    token = Admin.get_token();
    token = '2017072609582366999-1-135';
    uid = Admin.get_uid();
    uname = '管理员';
    //获取权限模板
    $.ajax({
        url: SERVER_URL + '/system-work/get-all-menu',
        type: 'POST',
        data: {
            token: token
        },
        dataType: 'json',
        success: function (oE) {
            console.log(JSON.stringify(oE));
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
                    $.each(likSecondList, function (i2, v2) {
                        var likPower = '';
                        if (v2['children'].length == 0) {
                            //循环权限
                            $.each(v2['powers'], function (i3, v3) {
                                likPower += '<span>\
                                        <input type="checkbox" funcid="' + v3['id'] + '">' + v3['func_name'] + '</span>\
                                        <span>'
                            })
                            if (likOnOff) {
                                likTr += '<tr>\
                                    <td rowspan="' + likThirdNumTotal + '"><span><input type="checkbox">' + v['name'] + '</span></td>\
                                    <td rowspan="' + v2['children'].length + '"></td>\
                                    <td><span><input type="checkbox">' + v2['name'] + '</span></td>\
                                    <td>' + likPower + '</td>\
                                  </tr>';
                                likOnOff = false;
                            }else{
                                likTr += '<tr>\
                                    <td rowspan="' + v2['children'].length + '"></td>\
                                    <td><span><input type="checkbox">' + v2['name'] + '</span></td>\
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
                                        <input type="checkbox" funcid="' + v4['id'] + '">' + v4['func_name'] + '</span>\
                                        <span>'
                                })
                                //有三层
                                if (likOnOff) {
                                    likTr += '<tr>\
                                    <td rowspan="' + likThirdNumTotal + '"><span><input type="checkbox">' + v['name'] + '</span></td>\
                                    <td rowspan="' + v2['children'].length + '"></td>\
                                    <td><span><input type="checkbox">' + v2['name'] + '</span></td>\
                                    <td>' + likPower + '</td>\
                                  </tr>';
                                    likOnOff = false;
                                } else if (i2 != 0 && i3 == 0) {
                                    likTr += '<tr>\
                                        <td rowspan="' + v2['children'].length + '"><span><input type="checkbox">' + v2['name'] + '</span></td>\
                                        <td><span><input type="checkbox">' + v3['name'] + '</span></td>\
                                        <td>' + likPower + '</td>\
                                      </tr>';
                                } else {
                                    likTr += '<tr>\
                                        <td><span><input type="checkbox">' + v3['name'] + '</span></td>\
                                        <td>' + likPower + '</td>\
                                      </tr>';
                                }
                            });
                        }
                    });
                } else if (v['name'] == '系统设置') {
                    //有多层，但只要两层
                    $.each(likSecondList, function (i2, v2) {
                        if (i2 == 0) {
                            likTr += '<tr>\
                                        <td rowspan="' + v['children'].length + '"><span><input type="checkbox">' + v['name'] + '</span></td>\
                                        <td rowspan="' + v['children'].length + '"></td>\
                                        <td><span><input type="checkbox">' + v2['name'] + '</span></td>\
                                        <td></td>\
                                      </tr>';
                        } else {
                            likTr += '<tr>\
                                        <td><span><input type="checkbox">' + v2['name'] + '</span></td>\
                                        <td></td>\
                                      </tr>';
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
                                        <input type="checkbox" funcid="' + v3['id'] + '">' + v3['func_name'] + '</span>\
                                        <span>'
                            })
                            //有两层
                            if (i2 == 0) {
                                likTr += '<tr>\
                                        <td rowspan="' + v['children'].length + '"><span><input type="checkbox">' + v['name'] + '</span></td>\
                                        <td rowspan="' + v['children'].length + '"></td>\
                                        <td><span><input type="checkbox">' + v2['name'] + '</span></td>\
                                        <td>' + likPower + '</td>\
                                      </tr>';
                            } else {
                                likTr += '<tr>\
                                        <td><span><input type="checkbox">' + v2['name'] + '</span></td>\
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
                                        <input type="checkbox" funcid="' + v4['id'] + '">' + v4['func_name'] + '</span>\
                                        <span>'
                                })
                                //有三层
                                if (i2 == 0 && i3 == 0) {
                                    likTr += '<tr>\
                                        <td rowspan="' + likThirdNumTotal + '"><span><input type="checkbox">' + v['name'] + '</span></td>\
                                        <td rowspan="' + v2['children'].length + '"><span><input type="checkbox">' + v2['name'] + '</span></td>\
                                        <td><span><input type="checkbox">' + v3['name'] + '</span></td>\
                                        <td>' + likPower + '</td>\
                                      </tr>';
                                } else if (i2 != 0 && i3 == 0) {
                                    likTr += '<tr>\
                                        <td rowspan="' + v2['children'].length + '"><span><input type="checkbox">' + v2['name'] + '</span></td>\
                                        <td><span><input type="checkbox">' + v3['name'] + '</span></td>\
                                        <td>' + likPower + '</td>\
                                      </tr>';
                                } else {
                                    likTr += '<tr>\
                                        <td><span><input type="checkbox">' + v3['name'] + '</span></td>\
                                        <td>' + likPower + '</td>\
                                      </tr>';
                                }
                            });
                        }
                    });
                }
            });
            $('.lik_tbody').html(likTr);
        }
    });


});
